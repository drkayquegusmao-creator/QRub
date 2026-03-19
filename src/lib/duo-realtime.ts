import { RealtimeChannel, createClient } from '@supabase/supabase-js'
import { fetchDuoSession } from './duo-service'

// Assume that the user will implement their own singleton or use an existing one
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Hook logic for Realtime subscriptions on DuoSession
 * It abstracts Presence, DB Changes, and Broadcast events into a single channel per session.
 */
export class DuoRealtimeEngine {
    private channel: RealtimeChannel | null = null
    public sessionId: string
    public userId: string
    
    // Callbacks
    public onSessionUpdated?: (payload: any) => void
    public onParticipantPresence?: (onlineUsers: string[]) => void
    public onParticipantsChanged?: () => void
    public onChatReceived?: (message: {text: string, userId: string}) => void
    public onWebRTCSignal?: (signal: any) => void

    constructor(sessionId: string, userId: string) {
        this.sessionId = sessionId
        this.userId = userId
    }

    /**
     * Connects to Supabase Channel, Presence & DB Changes
     */
    public subscribe(onSubscribed?: () => void) {
        if (this.channel) return // already subscribed

        this.channel = supabase.channel(`duo_session:${this.sessionId}`, {
            config: {
                presence: { key: this.userId }
            }
        })

        // 1. Listen to DB changes on 'duo_sessions'
        this.channel.on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'duo_sessions',
            filter: `id=eq.${this.sessionId}`
        }, (payload) => {
            if (this.onSessionUpdated) this.onSessionUpdated(payload.new)
        })

        // 1.1 Listen to DB changes on 'duo_session_participants' (Insertion and Updates)
        this.channel.on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'duo_session_participants',
            filter: `session_id=eq.${this.sessionId}`
        }, () => {
            if (this.onParticipantsChanged) this.onParticipantsChanged()
        })

        // 2. Listen to Presence Sync (who is online in the room)
        this.channel.on('presence', { event: 'sync' }, () => {
            const state = this.channel!.presenceState()
            const onlineUsers = Object.keys(state)
            if (this.onParticipantPresence) this.onParticipantPresence(onlineUsers)
        })

        // 3. Listen to Chat Broadcast Messages (transient state)
        this.channel.on('broadcast', { event: 'chat' }, (payload) => {
            if (this.onChatReceived) this.onChatReceived({
                text: payload.payload.text,
                userId: payload.payload.userId
            })
        })

        // 4. WebRTC Signaling (OFFER, ANSWER, ICE)
        this.channel.on('broadcast', { event: 'webrtc_signal' }, (payload) => {
            if (this.onWebRTCSignal && payload.payload.to === this.userId) {
                this.onWebRTCSignal(payload.payload)
            }
        })

        // 5. Sync Ping (Fallback for manual refreshing)
        this.channel.on('broadcast', { event: 'sync_ping' }, () => {
             if (this.onParticipantsChanged) this.onParticipantsChanged()
             if (this.onSessionUpdated) fetchDuoSession(this.sessionId).then(res => this.onSessionUpdated!(res.session))
        })

        // Finally Subscribe
        this.channel.subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                // Inform others I am online via Presence State
                await this.channel!.track({
                    online_at: new Date().toISOString(),
                })
                if (onSubscribed) onSubscribed()
            }
        })
    }

    /**
     * Send signaling data to a specific peer
     */
    public sendWebRTCSignal(to: string, type: 'offer' | 'answer' | 'ice', data: any) {
        if (!this.channel) return
        this.channel.send({
            type: 'broadcast',
            event: 'webrtc_signal',
            payload: { to, from: this.userId, type, data }
        })
    }

    /**
     * Send arbitrary broadcast events via Channel (useful for lightweight chat MVP)
     */
    public sendChatMessage(text: string) {
        if (!this.channel) return
        this.channel.send({
            type: 'broadcast',
            event: 'chat',
            payload: { text, userId: this.userId }
        })

        // PS: In a hardened implementation, you'd also save this to 'duo_session_messages'
    }

    /**
     * Sync manual answer checks via Broadcast (Fallback layer)
     */
    public triggerSyncPing() {
         if (!this.channel) return
         this.channel.send({
             type: 'broadcast',
             event: 'sync_ping',
             payload: { ts: Date.now() }
         })
    }

    public disconnect() {
        if (this.channel) {
            this.channel.untrack()
            supabase.removeChannel(this.channel)
            this.channel = null
        }
    }
}
