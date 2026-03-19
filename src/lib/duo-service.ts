import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseKey)

// ==========================================
// TYPES
// ==========================================

export type DuoSessionStatus = 'waiting' | 'paired' | 'ready_check' | 'configuring' | 'content_ready' | 'in_progress' | 'paused' | 'finished' | 'cancelled' | 'expired'
export type DuoRole = 'host' | 'guest'

export interface DuoSession {
    id: string
    code: string
    host_user_id: string
    guest_user_id?: string
    status: DuoSessionStatus
    study_mode?: string
    question_source_type?: string
    filters_json?: any
    question_ids_json?: string[]
    current_question_index: number
    total_questions: number
    host_ready: boolean
    guest_ready: boolean
    sync_version: number
    created_at: string
}

export interface DuoParticipant {
    id: string
    session_id: string
    user_id: string
    role: DuoRole
    display_name?: string
    joined_at: string
    is_online: boolean
    is_ready: boolean
}

export interface Question {
    id: string
    enunciado: string
    alternativas: any
    resposta_correta: string
    explicacao?: string
}

export interface DuoAnswer {
    user_id: string
    selected_alternative: string
    is_correct: boolean
    question_index: number
}

// ==========================================
// DB SERVICE
// ==========================================

export function generateDuoCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let suffix = ''
    for (let i = 0; i < 6; i++) {
        suffix += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `QRUB-DPL-${suffix}`
}

export async function createDuoSession(hostUserId: string): Promise<{ session: DuoSession | null, error: any }> {
    const code = generateDuoCode()
    const { data: session, error } = await supabase.from('duo_sessions').insert({
        code, host_user_id: hostUserId, status: 'waiting'
    }).select('*').single()

    if (error) return { session: null, error }

    if (session) {
        await supabase.from('duo_session_participants').insert({
            session_id: session.id, user_id: hostUserId, role: 'host', is_ready: false
        })
    }
    return { session, error: null }
}

export async function joinDuoSession(code: string, guestUserId: string): Promise<{ session: DuoSession | null, error: any }> {
    const formattedCode = code.toUpperCase().trim()
    const { data: session, error: findError } = await supabase.from('duo_sessions').select('*').eq('code', formattedCode).single()

    if (findError || !session) return { session: null, error: findError || new Error('Sessão não encontrada.') }
    if (session.status !== 'waiting') return { session: null, error: new Error('A sala já está pareada ou finalizada.') }
    if (session.host_user_id === guestUserId) return { session: null, error: new Error('Você já é o Host desta sessão.') }

    const { data: updatedSession, error: updateError } = await supabase.from('duo_sessions')
        .update({ guest_user_id: guestUserId, status: 'paired' })
        .eq('id', session.id).select('*').single()

    if (updateError) return { session: null, error: updateError }

    await supabase.from('duo_session_participants').insert({
        session_id: session.id, user_id: guestUserId, role: 'guest', is_ready: false
    })

    return { session: updatedSession, error: null }
}

export async function fetchDuoSession(sessionId: string): Promise<{ session: DuoSession | null, participants: DuoParticipant[], error: any }> {
    const [s, p] = await Promise.all([
        supabase.from('duo_sessions').select('*').eq('id', sessionId).single(),
        supabase.from('duo_session_participants').select('*').eq('session_id', sessionId)
    ])
    return { session: s.data, participants: p.data || [], error: s.error || p.error }
}

export async function markAsReady(sessionId: string, userId: string): Promise<boolean> {
    const { error } = await supabase.from('duo_session_participants')
        .update({ is_ready: true }).eq('session_id', sessionId).eq('user_id', userId)
    return !error
}

export async function advanceSessionStatus(sessionId: string, newStatus: DuoSessionStatus): Promise<boolean> {
    const { error } = await supabase.from('duo_sessions')
        .update({ status: newStatus }).eq('id', sessionId)
    return !error
}

export async function buildSessionContent(sessionId: string): Promise<boolean> {
    // MVP: Pega 10 questões aleatórias do banco
    const limit = 10
    const { data, error } = await supabase.rpc('get_random_questions', { q_limit: limit })
    
    // Fallback if RPC doesn't exist, just select 10 latest
    let ids: string[] = []
    if (error || !data) {
        const fallback = await supabase.from('questao_base').select('id').limit(limit)
        ids = fallback.data?.map(q => q.id) || []
    } else {
        ids = data.map((q: any) => q.id)
    }

    if (ids.length === 0) return false

    const { error: updateErr } = await supabase.from('duo_sessions')
        .update({
            question_ids_json: ids,
            total_questions: ids.length,
            status: 'in_progress',
            current_question_index: 0
        })
        .eq('id', sessionId)

    return !updateErr
}

export async function fetchQuestionsByIds(ids: string[]): Promise<Question[]> {
    if (!ids || ids.length === 0) return []
    const { data, error } = await supabase.from('questao_base')
        .select('id, enunciado, alternativas, resposta_correta, explicacao')
        .in('id', ids)
    
    if (error || !data) return []
    
    // Sort logic to match the order of 'ids'
    const sorted = [...data].sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
    return sorted
}

export async function submitDuoAnswer(
    sessionId: string, questionId: string, index: number, userId: string, 
    selectedAlternative: string, isCorrect: boolean
): Promise<boolean> {
    const { error } = await supabase.from('duo_session_answers').upsert({
        session_id: sessionId,
        question_id: questionId,
        question_index: index,
        user_id: userId,
        selected_alternative: selectedAlternative,
        is_correct: isCorrect
    }, { onConflict: 'session_id, user_id, question_index' })
    return !error
}

export async function getAnswersForCurrentIndex(sessionId: string, index: number): Promise<DuoAnswer[]> {
    const { data, error } = await supabase.from('duo_session_answers')
        .select('user_id, selected_alternative, is_correct, question_index')
        .eq('session_id', sessionId)
        .eq('question_index', index)
    if (error) return []
    return data || []
}

export async function moveToNextQuestion(sessionId: string, nextIndex: number): Promise<boolean> {
    const { error } = await supabase.from('duo_sessions')
        .update({ current_question_index: nextIndex })
        .eq('id', sessionId)
    return !error
}

export async function finalizeSession(sessionId: string): Promise<boolean> {
    const { error } = await supabase.from('duo_sessions')
        .update({ status: 'finished' })
        .eq('id', sessionId)
    return !error
}
