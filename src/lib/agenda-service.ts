/**
 * Agenda Service — QRub Concursos (Motor Inteligente)
 * Aggregates daily tasks from:
 * 1. SRS (Risco, Atrasadas, Hoje)
 * 2. Caderno de Erros
 * 3. Nivelamentos pendentes
 * 4. Lembretes manuais
 * 5. Notas livres
 */

import { supabase } from './supabase'

export type AgendaTaskType = 'revisao' | 'caderno' | 'questoes' | 'teoria' | 'nivelamento' | 'simulado' | 'lembrete' | 'nota' | 'recuperacao'
export type AgendaTaskStatus = 'pendente' | 'em_execucao' | 'concluido' | 'atrasado'
export type AgendaPriority = 'baixa' | 'media' | 'alta' | 'urgente'
export type AgendaOrigin = 'sistema' | 'usuario'

export interface AgendaTask {
  id: string
  type: AgendaTaskType
  discipline: string
  subject: string
  quantity?: string
  estimatedTime: string
  priority: AgendaPriority
  status: AgendaTaskStatus
  sourceId?: string
  daysLate?: number
  origin: AgendaOrigin
  observacao?: string
  postponeCount?: number
  scheduledDate?: string
  scheduledTime?: string
  questionIds?: string[]
}

export interface AgendaDayStats {
  total: number
  completed: number
  pending: number
  late: number
  totalEstimatedMinutes: number
  percentComplete: number
}

export interface ManualTask {
  type: 'lembrete' | 'nota' | 'nivelamento'
  title: string
  description?: string
  date: string
  time?: string
  discipline?: string
  subject?: string
}

/** Priority sort weight */
const PRIORITY_WEIGHT: Record<AgendaPriority, number> = {
  urgente: 0,
  alta: 1,
  media: 2,
  baixa: 3,
}

const STATUS_WEIGHT: Record<AgendaTaskStatus, number> = {
  atrasado: 0,
  em_execucao: 1,
  pendente: 2,
  concluido: 9,
}

function sortTasks(tasks: AgendaTask[]): AgendaTask[] {
  return tasks.sort((a, b) => {
    const statusDiff = STATUS_WEIGHT[a.status] - STATUS_WEIGHT[b.status]
    if (statusDiff !== 0) return statusDiff
    return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
  })
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

  const { data: userData } = await supabase
    .from('users')
    .select('name, streak')
    .eq('id', user.id)
    .single()

  const userName = userData?.name?.split(' ')[0] ?? 'Candidato'
  const streak = userData?.streak ?? 0

  const tasks: AgendaTask[] = []

  // ─── 1. SRS Engine ─────────────────────────────────────────────
  const now = new Date()
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

  const { data: srsData } = await supabase
    .from('concurso_user_srs')
    .select('id, question_id, disciplina_id, next_review, memory_strength, interval_days, repetitions')
    .eq('user_id', user.id)
    .lte('next_review', todayEnd.toISOString())

  if (!srsData || srsData.length === 0) {
    tasks.push({
      id: 'niv-global',
      type: 'nivelamento',
      discipline: 'Geral',
      subject: 'Nivelamento Obrigatório',
      quantity: '10 questões',
      estimatedTime: '15 min',
      priority: 'urgente',
      status: 'pendente',
      origin: 'sistema',
    })
  } else {
    const yesterday = new Date(now.getTime() - 86400000)

    const riskItems = srsData.filter(t => (t.memory_strength ?? 1) < 0.3)
    const lateItems = srsData.filter(t =>
      (t.memory_strength ?? 1) >= 0.3 && new Date(t.next_review).getTime() < yesterday.getTime()
    )
    const todayItems = srsData.filter(t =>
      (t.memory_strength ?? 1) >= 0.3 && new Date(t.next_review).getTime() >= yesterday.getTime()
    )

    if (riskItems.length > 0) {
      tasks.push({
        id: 'srs-risco',
        type: 'recuperacao',
        discipline: riskItems[0].disciplina_id || 'Múltiplas Disciplinas',
        subject: 'Recuperação de Memória',
        quantity: `${Math.min(10, riskItems.length)} questões`,
        estimatedTime: `${Math.min(10, riskItems.length) * 1.5} min`,
        priority: 'urgente',
        status: 'atrasado',
        origin: 'sistema',
        daysLate: Math.max(1, Math.floor((now.getTime() - new Date(riskItems[0].next_review).getTime()) / 86400000)),
        questionIds: riskItems.slice(0, 10).map(r => r.question_id),
      })
    }

    if (lateItems.length > 0) {
      tasks.push({
        id: 'srs-atrasadas',
        type: 'revisao',
        discipline: lateItems[0].disciplina_id || 'Revisão Acumulada',
        subject: 'Ciclo Espaçado (Atrasadas)',
        quantity: `${Math.min(10, lateItems.length)} questões`,
        estimatedTime: `${Math.min(10, lateItems.length) * 1.5} min`,
        priority: 'alta',
        status: 'atrasado',
        origin: 'sistema',
        daysLate: Math.max(1, Math.floor((now.getTime() - new Date(lateItems[0].next_review).getTime()) / 86400000)),
        questionIds: lateItems.slice(0, 10).map(r => r.question_id),
      })
    }

    if (todayItems.length > 0) {
      tasks.push({
        id: 'srs-hoje',
        type: 'revisao',
        discipline: todayItems[0].disciplina_id || 'Treino do Dia',
        subject: 'Manutenção de Retenção',
        quantity: `${Math.min(10, todayItems.length)} questões`,
        estimatedTime: `${Math.min(10, todayItems.length) * 1.5} min`,
        priority: 'media',
        status: 'pendente',
        origin: 'sistema',
        questionIds: todayItems.slice(0, 10).map(r => r.question_id),
      })
    }
  }

  // ─── 2. Manual Tasks (localStorage for now) ────────────────────
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('qrub-agenda-manual-tasks')
      if (stored) {
        const manual: AgendaTask[] = JSON.parse(stored)
        const today = new Date().toISOString().split('T')[0]
        manual.forEach(t => {
          if (t.scheduledDate === today || t.status === 'atrasado') {
            tasks.push(t)
          }
        })
      }
    } catch { /* noop */ }
  }

  const sorted = sortTasks(tasks)

  const completed = sorted.filter(t => t.status === 'concluido').length
  const late = sorted.filter(t => t.status === 'atrasado').length
  const pending = sorted.filter(t => t.status !== 'concluido').length
  const totalMin = sorted.reduce((acc, t) => acc + parseInt(t.estimatedTime) || 15, 0)

  return {
    tasks: sorted,
    stats: {
      total: sorted.length,
      completed,
      pending,
      late,
      totalEstimatedMinutes: totalMin,
      percentComplete: sorted.length > 0 ? Math.round((completed / sorted.length) * 100) : 0,
    },
    userName,
    streak,
  }
}

/** Save a manual task to localStorage */
export function saveManualTask(task: ManualTask): AgendaTask {
  const newTask: AgendaTask = {
    id: `manual-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type: task.type,
    discipline: task.discipline || '',
    subject: task.title,
    estimatedTime: task.type === 'nota' ? '5 min' : '15 min',
    priority: 'media',
    status: 'pendente',
    origin: 'usuario',
    observacao: task.description,
    scheduledDate: task.date,
    scheduledTime: task.time,
    postponeCount: 0,
  }

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('qrub-agenda-manual-tasks')
      const existing: AgendaTask[] = stored ? JSON.parse(stored) : []
      existing.push(newTask)
      localStorage.setItem('qrub-agenda-manual-tasks', JSON.stringify(existing))
    } catch { /* noop */ }
  }

  return newTask
}

/** Postpone a task (max 3x) */
export function postponeTask(taskId: string): { success: boolean; newCount: number } {
  if (typeof window === 'undefined') return { success: false, newCount: 0 }

  try {
    const stored = localStorage.getItem('qrub-agenda-postponed')
    const map: Record<string, number> = stored ? JSON.parse(stored) : {}
    const current = map[taskId] || 0

    if (current >= 3) return { success: false, newCount: current }

    map[taskId] = current + 1
    localStorage.setItem('qrub-agenda-postponed', JSON.stringify(map))
    return { success: true, newCount: current + 1 }
  } catch {
    return { success: false, newCount: 0 }
  }
}

/** Get postpone count for a task */
export function getPostponeCount(taskId: string): number {
  if (typeof window === 'undefined') return 0
  try {
    const stored = localStorage.getItem('qrub-agenda-postponed')
    const map: Record<string, number> = stored ? JSON.parse(stored) : {}
    return map[taskId] || 0
  } catch { return 0 }
}

/** Get the last 7 days study activity for the weekly heatmap */
export async function fetchWeeklyActivity(): Promise<{ date: string; count: number }[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

  // Try concurso_user_respostas first (more reliable)
  const { data } = await supabase
    .from('concurso_user_respostas')
    .select('timestamp')
    .eq('user_id', user.id)
    .gte('timestamp', sevenDaysAgo.toISOString())

  const countMap: Record<string, number> = {}
  data?.forEach(s => {
    const d = new Date(s.timestamp).toISOString().split('T')[0]
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
