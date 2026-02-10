import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

export interface SupportTicket {
    id: string
    user_id: string
    subject: string
    status: 'open' | 'pending' | 'closed'
    priority: 'low' | 'medium' | 'high'
    last_message_at: string
    created_at: string
    updated_at: string
    user?: {
        name: string
        email: string
    }
}

export interface SupportMessage {
    id: string
    ticket_id: string
    sender_id: string
    text: string
    is_admin: boolean
    created_at: string
}

interface SupportState {
    tickets: SupportTicket[]
    messages: Record<string, SupportMessage[]>
    loading: boolean

    // Actions
    fetchTickets: () => Promise<void>
    fetchMessages: (ticketId: string) => Promise<void>
    createTicket: (subject: string, initialMessage: string, targetUserId?: string) => Promise<string | null>
    sendMessage: (ticketId: string, text: string, isAdmin?: boolean) => Promise<void>
    updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => Promise<void>

    // Real-time hooks
    subscribeToTickets: () => (() => void)
    subscribeToMessages: (ticketId: string) => (() => void)
}

export const useSupport = create<SupportState>((set, get) => ({
    tickets: [],
    messages: {},
    loading: false,

    fetchTickets: async () => {
        set({ loading: true })
        const { data, error } = await supabase
            .from('support_tickets')
            .select(`
                *,
                user:users!user_id(name, email)
            `)
            .order('last_message_at', { ascending: false })

        if (error) {
            console.error('Error fetching tickets:', error)
        } else if (data) {
            set({ tickets: data as SupportTicket[] })
        }
        set({ loading: false })
    },

    fetchMessages: async (ticketId) => {
        const { data, error } = await supabase
            .from('support_messages')
            .select('*')
            .eq('ticket_id', ticketId)
            .order('created_at', { ascending: true })

        if (error) {
            console.error('Error fetching messages:', error)
        } else if (data) {
            set(state => ({
                messages: { ...state.messages, [ticketId]: data }
            }))
        }
    },

    createTicket: async (subject, initialMessage, targetUserId) => {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        const effectiveUserId = targetUserId || authUser?.id

        if (!effectiveUserId) {
            console.error('Cannot create ticket: No user ID available')
            return null
        }

        const { data: ticket, error: ticketError } = await supabase
            .from('support_tickets')
            .insert({
                user_id: effectiveUserId,
                subject,
                status: 'open',
                priority: 'medium'
            })
            .select()
            .single()

        if (ticketError || !ticket) {
            console.error('Error creating ticket:', ticketError)
            return null
        }

        // Se for admin criando para outro, o sender_id é o admin
        const { error: msgError } = await supabase.from('support_messages').insert({
            ticket_id: ticket.id,
            sender_id: authUser?.id || effectiveUserId, // Fallback safe
            text: initialMessage,
            is_admin: !!targetUserId // Se tem targetUserId, é provável que um Admin esteja criando
        })

        if (msgError) {
            console.error('Error sending initial message:', msgError)
        }

        get().fetchTickets()
        return ticket.id
    },

    sendMessage: async (ticketId, text, isAdmin = false) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            console.error('Cannot send message: No user logged in')
            return
        }

        const { error } = await supabase
            .from('support_messages')
            .insert({
                ticket_id: ticketId,
                sender_id: user.id,
                text,
                is_admin: isAdmin
            })

        if (error) {
            console.error('Error sending message:', error)
            return
        }

        // Update last_message_at
        const { error: updateError } = await supabase
            .from('support_tickets')
            .update({ last_message_at: new Date().toISOString() })
            .eq('id', ticketId)

        if (updateError) {
            console.error('Error updating last_message_at:', updateError)
        }

        get().fetchMessages(ticketId)
    },

    updateTicketStatus: async (ticketId, status) => {
        const { error } = await supabase
            .from('support_tickets')
            .update({ status })
            .eq('id', ticketId)

        if (!error) {
            set(state => ({
                tickets: state.tickets.map(t => t.id === ticketId ? { ...t, status } : t)
            }))
        }
    },

    subscribeToTickets: () => {
        const channel = supabase
            .channel('public:support_tickets')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'support_tickets' }, () => {
                get().fetchTickets()
            })
            .subscribe()

        return () => supabase.removeChannel(channel)
    },

    subscribeToMessages: (ticketId) => {
        const channel = supabase
            .channel(`public:support_messages:${ticketId}`)
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'support_messages', filter: `ticket_id=eq.${ticketId}` },
                (payload) => {
                    const newMessage = payload.new as SupportMessage
                    set(state => ({
                        messages: {
                            ...state.messages,
                            [ticketId]: [...(state.messages[ticketId] || []), newMessage]
                        }
                    }))
                }
            )
            .subscribe()

        return () => supabase.removeChannel(channel)
    }
}))
