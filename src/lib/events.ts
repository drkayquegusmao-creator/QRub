
import { supabase } from './supabase'

export type EventType =
    | 'login'
    | 'logout'
    | 'open_app'
    | 'view_question'
    | 'start_question'
    | 'answer_question'
    | 'comment_create'
    | 'comment_like'
    | 'purchase'
    | 'admin_action'

interface EventOptions {
    meta?: any
    sessionId?: string
    source?: 'client' | 'server'
    dedupeKey?: string
}

export async function trackEvent(
    userId: string,
    eventType: EventType,
    options: EventOptions = {}
) {
    const { meta = {}, sessionId, source = 'client', dedupeKey } = options

    try {
        const { error } = await supabase.from('user_events').insert({
            user_id: userId,
            event_type: eventType,
            meta,
            session_id: sessionId,
            source,
            dedupe_key: dedupeKey
        })

        if (error) {
            // If dedupe fails (unique violation), it's fine, it means it's already logged
            if (error.code === '23505') return { success: true, message: 'Duplicate event ignored' }
            throw error
        }

        return { success: true }
    } catch (err) {
        console.warn('Track Event Error:', err)
        return { success: false, error: err }
    }
}

export async function createSession(userId: string, platform = 'web') {
    try {
        const { data, error } = await supabase.from('user_sessions').insert({
            user_id: userId,
            platform,
            user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Sao_Paulo'
        }).select().single()

        if (error) throw error
        return data.id
    } catch (err) {
        console.warn('Create Session Error:', err)
        return null
    }
}
