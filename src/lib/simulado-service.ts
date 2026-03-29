import { supabase } from './supabase'
import { QrubAudio } from './audio-engine'

export interface Simulado {
  id: string
  title: string
  subtitle: string
  questionsCount: number
  durationMinutes: number
  difficulty: 'facil' | 'media' | 'dificil' | 'mista'
  status: 'LIVRE' | 'PREMIUM'
  bank: string
  bank_id?: string
  tipo: 'banca' | 'personalizado' | 'completo' | 'inteligente'
}

export interface SimuladoResult {
  id: string
  title: string
  date: string
  score: number
  correct: number
  total: number
  errors: number
  blanks: number
  avgTimePerQuestion: number
  uncertaintyRate: number
  disciplineScores: Record<string, { correct: number, total: number }>
  themeScores: Record<string, { correct: number, total: number }>
  strategic?: {
    easyMissed: string[],
    hardHit: string[]
  }
}

/** Fetch available simulated exams from concurso_pacotes */
export async function fetchAvailableSimulados(): Promise<Simulado[]> {
  const { data, error } = await supabase
    .from('concurso_pacotes')
    .select(`
      id, 
      title, 
      difficulty, 
      requested_count, 
      status,
      concurso_bancas (id, name)
    `)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })

  if (error) return []

  return (data as any[] || []).map(p => {
    const banca = Array.isArray(p.concurso_bancas) ? p.concurso_bancas[0] : p.concurso_bancas
    return {
      id: p.id,
      title: p.title,
      subtitle: `${banca?.name || 'Geral'} - Edição Oficial`,
      questionsCount: p.requested_count || 100,
      durationMinutes: p.requested_count ? Math.round(p.requested_count * 2.25) : 120,
      difficulty: p.difficulty as any,
      status: 'LIVRE',
      bank: banca?.name || 'Geral',
      bank_id: banca?.id,
      tipo: 'completo'
    }
  })
}

/** Anti-repetition fetch - Get question IDs to EXCLUDE */
async function getExcludedQuestionIds(userId: string): Promise<string[]> {
  // Exclude questions answered in the last 7 days
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const { data } = await supabase
    .from('concurso_user_respostas')
    .select('question_id')
    .eq('user_id', userId)
    .gte('timestamp', sevenDaysAgo.toISOString())

  return (data || []).map(r => r.question_id)
}

/** Start/Resume Session Persistence */
export async function saveActiveSession(sessionId: string, data: {
  packageId?: string,
  tipo: string,
  currentIndex: number,
  answers: Record<string, any>,
  questionIds: string[],
  timeLeft: number
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('concurso_user_simulado_sessions').upsert({
    id: sessionId,
    user_id: user.id,
    package_id: data.packageId,
    tipo: data.tipo,
    current_index: data.currentIndex,
    answers: data.answers,
    question_ids: data.questionIds,
    time_left_seconds: data.timeLeft,
    last_updated: new Date().toISOString()
  })
}

/** Calculate results with CEBRASPE penalty logic */
export function calculateSimuladoScore(questions: any[], answers: Record<string, any>, isCebraspe: boolean) {
  let correct = 0
  let incorrect = 0
  let blanks = 0
  const disciplineScores: Record<string, { correct: number, total: number }> = {}
  const themeScores: Record<string, { correct: number, total: number }> = {}
  const easyMissed: string[] = []
  const hardHit: string[] = []

  questions.forEach(q => {
    const ans = answers[q.id]
    const disc = q.discipline || 'Geral'
    const theme = q.subject || 'Geral'
    
    if (!disciplineScores[disc]) disciplineScores[disc] = { correct: 0, total: 0 }
    if (!themeScores[theme]) themeScores[theme] = { correct: 0, total: 0 }
    
    disciplineScores[disc].total++
    themeScores[theme].total++

    if (!ans?.choice) {
      blanks++
    } else if (ans.choice === q.correct_alternative) {
      correct++
      disciplineScores[disc].correct++
      themeScores[theme].correct++
      if (q.difficulty === 'dificil' || q.difficulty === 'hardcore') hardHit.push(q.id)
    } else {
      incorrect++
      if (q.difficulty === 'facil') easyMissed.push(q.id)
    }
  })

  // CEBRASPE: 1 Correct - 1 Incorrect = Final Score
  // Others: (Correct / Total) * 100
  let finalScore = 0
  if (isCebraspe) {
    finalScore = (correct - incorrect) / questions.length * 100
    if (finalScore < 0) finalScore = 0
  } else {
    finalScore = (correct / questions.length) * 100
  }

  return {
    score: Math.round(finalScore),
    correct,
    incorrect,
    blanks,
    disciplineScores,
    themeScores,
    strategic: { easyMissed, hardHit }
  }
}

/** Finish Simulado and save HISTORICAL record */
export async function finishSimuladoDetailed(sessionId: string, results: {
    questions: any[],
    answers: Record<string, { choice: string, uncertainty: boolean, duration: number }>,
    metadata: { packageId?: string, title: string, bancaId?: string, tipo: string }
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const isCebraspe = results.metadata.title.toUpperCase().includes('CEBRASPE')
  const stats = calculateSimuladoScore(results.questions, results.answers, isCebraspe)
  
  // 1. Calculate total time
  const totalSeconds = Object.values(results.answers).reduce((acc, a) => acc + (a.duration || 0), 0)

  // 1. Save to History
  await supabase.from('concurso_user_simulado_historico').insert({
    user_id: user.id,
    package_id: results.metadata.packageId,
    title: results.metadata.title,
    banca_id: results.metadata.bancaId,
    tipo: results.metadata.tipo,
    total_questoes: results.questions.length,
    acertos: stats.correct,
    erros: stats.incorrect,
    brancos: stats.blanks,
    nota_final: stats.score,
    tempo_total_segundos: totalSeconds,
    desempenho_disciplinas: stats.disciplineScores,
    desempenho_temas: stats.themeScores,
    analise_estrategica: stats.strategic
  })

  // 2. Clear Active Session
  await supabase.from('concurso_user_simulado_sessions').delete().eq('id', sessionId)

  // 3. Trigger Errors to Caderno & SRS
  // (Existing logic from finishSimuladoWorkflow but refined)
  for (const q of results.questions) {
    const ans = results.answers[q.id]
    if (ans && ans.choice !== q.correct_alternative && ans.choice) {
      await supabase.from('concurso_caderno_erros').upsert({
        user_id: user.id,
        questao_id: q.id,
        status: 'ativo',
        tipo_de_erro: q.difficulty === 'facil' ? 'atencao' : 'conhecimento',
        metadata: { origem: `SIMULADO: ${results.metadata.title}` }
      })
    }
  }

  QrubAudio.play('success')
  return { success: true, score: stats.score }
}

/** Fetch historical results specifically for the UI summary */
export async function fetchUserSimuladoResults(): Promise<SimuladoResult[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('concurso_user_simulado_historico')
    .select('*')
    .eq('user_id', user.id)
    .order('data_conclusao', { ascending: false })

  if (error || !data) return []

  return data.map(r => ({
    id: r.id,
    title: r.title,
    date: new Date(r.data_conclusao).toLocaleDateString(),
    score: Number(r.nota_final),
    correct: r.acertos,
    total: r.total_questoes,
    errors: r.erros,
    blanks: r.brancos,
    avgTimePerQuestion: r.tempo_total_segundos / r.total_questoes || 0,
    uncertaintyRate: 0, // to measure
    disciplineScores: r.desempenho_disciplinas,
    themeScores: r.desempenho_temas,
    strategic: r.analise_estrategica
  }))
}


/** Pontos Cegos (IA) - Simulation of finding gap questions */
export async function generateBlindSpotSimulado() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Find questions errored in the last 15 days
  const fifteenDaysAgo = new Date()
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15)

  const { data: errors } = await supabase
    .from('concurso_user_respostas')
    .select('question_id')
    .eq('user_id', user.id)
    .eq('is_correct', false)
    .gte('timestamp', fifteenDaysAgo.toISOString())
    .limit(50)

  if (!errors || errors.length === 0) return null

  return {
    id: 'blind-spot-' + Date.now(),
    title: 'Simulado de Pontos Cegos (IA)',
    subtitle: 'Baseado em seus erros recentes',
    questionsCount: errors.length,
    durationMinutes: Math.round(errors.length * 2.5),
    difficulty: 'Elite',
    status: 'LIVRE',
    questionIds: errors.map(e => e.question_id)
  }
}
