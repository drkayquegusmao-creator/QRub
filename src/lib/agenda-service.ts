/**
 * Agenda Service — QRub Concursos
 * Aggregates daily tasks from multiple sources:
 * 1. agenda_revisoes (SRS scheduled reviews)
 * 2. caderno_erros (overdue error-notebook items)
 * 3. assunto_progresso (subjects needing practice via questão)
 */

import { supabase } from './supabase'

export type AgendaTaskType = 'revisao' | 'caderno' | 'questoes' | 'teoria'
export type AgendaTaskStatus = 'pendente' | 'em-andamento' | 'concluido' | 'atrasado'
export type AgendaPriority = 'baixa' | 'media' | 'alta' | 'urgente'

export interface AgendaTask {
  id: string
  type: AgendaTaskType
  discipline: string
  subject: string
  quantity?: string
  estimatedTime: string
  priority: AgendaPriority
  status: AgendaTaskStatus
  sourceId?: string // assunto_id, error notebook id, etc.
  daysLate?: number
}

export interface AgendaDayStats {
  total: number
  completed: number
  pending: number
  late: number
  totalEstimatedMinutes: number
  percentComplete: number
}

// Maps memory state / level to priority
function scoreToPriority(daysLate: number, memoryScore?: number | null): AgendaPriority {
  if (daysLate > 3) return 'urgente'
  if (daysLate > 0) return 'alta'
  if (memoryScore !== undefined && memoryScore !== null && memoryScore < 40) return 'alta'
  if (memoryScore !== undefined && memoryScore !== null && memoryScore < 60) return 'media'
  return 'baixa'
}

function estimateTime(type: AgendaTaskType, quantity?: number): string {
  if (type === 'revisao') return quantity ? `${Math.ceil(quantity * 1.2)} min` : '15 min'
  if (type === 'caderno') return quantity ? `${Math.ceil(quantity * 2)} min` : '20 min'
  if (type === 'questoes') return quantity ? `${Math.ceil(quantity * 1.5)} min` : '30 min'
  return '45 min'
}

/** Fetch today's Agenda for the authenticated user */
export async function fetchDailyAgenda(): Promise<{
  tasks: AgendaTask[]
  stats: AgendaDayStats
  userName: string
  streak: number
}> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { tasks: [], stats: emptyStats(), userName: 'Candidato', streak: 0 }
  }

  const today = new Date().toISOString().split('T')[0]

  // Parallel fetching
  const [revisoesRes, cadernoRes, userRes, progressoRes] = await Promise.all([
    // 1. SRS scheduled reviews due today or overdue (status PENDENTE = uppercase in DB)
    supabase
      .from('agenda_revisoes')
      .select('id, assunto_id, data_programada, status')
      .eq('user_id', user.id)
      .lte('data_programada', today)
      .neq('status', 'CONCLUIDO')
      .order('data_programada', { ascending: true })
      .limit(15),

    // 2. Error notebook items due for review (status 'ativo' = lowercase in DB)
    supabase
      .from('caderno_erros')
      .select('id, assunto_id, nivel_de_gravidade, contador_de_repeticao, proxima_revisao, status, tema')
      .eq('user_id', user.id)
      .eq('status', 'ativo')
      .or('proxima_revisao.is.null,proxima_revisao.lte.' + new Date().toISOString())
      .order('proxima_revisao', { ascending: true })
      .limit(10),

    // 3. User profile for name + streak
    supabase
      .from('users')
      .select('name, streak')
      .eq('id', user.id)
      .single(),

    // 4. Subjects with progress (to find low memory scores → questões)
    supabase
      .from('assunto_progresso')
      .select('assunto_id, memory_score, data_proxima_revisao, percentual_acerto, revisoes_atrasadas')
      .eq('user_id', user.id)
      .lt('memory_score', 50)
      .order('memory_score', { ascending: true })
      .limit(5),
  ])

  // Fetch assunto names for both revisoes and progresso
  const assuntoIds = [
    ...(revisoesRes.data?.map(r => r.assunto_id) ?? []),
    ...(progressoRes.data?.map(p => p.assunto_id) ?? []),
    ...(cadernoRes.data?.filter(c => c.assunto_id).map(c => c.assunto_id) ?? []),
  ].filter(Boolean)

  const uniqueIds = [...new Set(assuntoIds)]
  let assuntoMap: Record<string, string> = {}

  if (uniqueIds.length > 0) {
    const { data: assuntos } = await supabase
      .from('assuntos')
      .select('id, nome, specialty_id')
      .in('id', uniqueIds)

    assuntos?.forEach(a => {
      assuntoMap[a.id] = a.nome
    })
  }

  const tasks: AgendaTask[] = []

  // --- Build tasks from agenda_revisoes ---
  for (const rev of revisoesRes.data ?? []) {
    const scheduledDate = new Date(rev.data_programada)
    const todayDate = new Date(today)
    const daysLate = Math.max(0, Math.floor((todayDate.getTime() - scheduledDate.getTime()) / 86400000))
    const assuntoNome = assuntoMap[rev.assunto_id] ?? rev.assunto_id

    tasks.push({
      id: `rev-${rev.id}`,
      type: 'revisao',
      discipline: 'Revisão Espaçada',
      subject: assuntoNome,
      quantity: '10–15 cards',
      estimatedTime: '15 min',
      priority: scoreToPriority(daysLate),
      status: daysLate > 0 ? 'atrasado' : 'pendente',
      sourceId: rev.assunto_id,
      daysLate,
    })
  }

  // --- Build tasks from caderno_erros ---
  for (const err of cadernoRes.data ?? []) {
    const dueDate = err.proxima_revisao ? new Date(err.proxima_revisao) : new Date()
    const daysLate = Math.max(0, Math.floor((Date.now() - dueDate.getTime()) / 86400000))
    const qty = err.contador_de_repeticao ?? 1
    const label = err.tema ?? (err.assunto_id ? assuntoMap[err.assunto_id] : undefined) ?? 'Item do Caderno'

    tasks.push({
      id: `err-${err.id}`,
      type: 'caderno',
      discipline: 'Caderno de Erros',
      subject: label,
      quantity: `${qty} erro${qty !== 1 ? 's' : ''}`,
      estimatedTime: estimateTime('caderno', qty),
      priority: err.nivel_de_gravidade === 'critico' ? 'urgente' : scoreToPriority(daysLate),
      status: daysLate > 0 ? 'atrasado' : 'pendente',
      sourceId: err.id,
      daysLate,
    })
  }

  // --- Build tasks from low-memory subjects → questões ---
  for (const prog of progressoRes.data ?? []) {
    const assuntoNome = assuntoMap[prog.assunto_id] ?? prog.assunto_id
    const memScore = prog.memory_score ?? 0
    const qty = 20

    tasks.push({
      id: `q-${prog.assunto_id}`,
      type: 'questoes',
      discipline: 'Ciclo de Questões',
      subject: assuntoNome,
      quantity: `${qty} questões`,
      estimatedTime: estimateTime('questoes', qty),
      priority: scoreToPriority(0, memScore),
      status: 'pendente',
      sourceId: prog.assunto_id,
    })
  }

  // Sort: atrasado > urgente > alta > media > baixa
  const priorityOrder: Record<AgendaPriority, number> = { urgente: 0, alta: 1, media: 2, baixa: 3 }
  const statusOrder: Record<AgendaTaskStatus, number> = { atrasado: 0, 'em-andamento': 1, pendente: 2, concluido: 3 }

  tasks.sort((a, b) => {
    const statusDiff = statusOrder[a.status] - statusOrder[b.status]
    if (statusDiff !== 0) return statusDiff
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  // Stats
  const completed = tasks.filter(t => t.status === 'concluido').length
  const late = tasks.filter(t => t.status === 'atrasado').length
  const pending = tasks.filter(t => t.status !== 'concluido').length
  const totalMin = tasks.reduce((acc, t) => {
    const mins = parseInt(t.estimatedTime) || 20
    return acc + mins
  }, 0)

  return {
    tasks,
    stats: {
      total: tasks.length,
      completed,
      pending,
      late,
      totalEstimatedMinutes: totalMin,
      percentComplete: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0,
    },
    userName: userRes.data?.name?.split(' ')[0] ?? 'Candidato',
    streak: userRes.data?.streak ?? 0,
  }
}

/** Get the last 7 days study activity for the weekly heatmap */
export async function fetchWeeklyActivity(): Promise<{ date: string; count: number }[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

  const { data } = await supabase
    .from('sessoes')
    .select('finalized_at')
    .eq('user_id', user.id)
    .gte('finalized_at', sevenDaysAgo.toISOString())
    .not('finalized_at', 'is', null)

  const countMap: Record<string, number> = {}
  data?.forEach(s => {
    const d = new Date(s.finalized_at!).toISOString().split('T')[0]
    countMap[d] = (countMap[d] ?? 0) + 1
  })

  const days: { date: string; count: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    days.push({ date: key, count: countMap[key] ?? 0 })
  }
  return days
}

function emptyStats(): AgendaDayStats {
  return { total: 0, completed: 0, pending: 0, late: 0, totalEstimatedMinutes: 0, percentComplete: 0 }
}
