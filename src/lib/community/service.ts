/**
 * COMUNIDADE QRUB — SERVICE LAYER (ISOLADO)
 * Todas as queries e mutações da comunidade ficam aqui.
 * Nenhuma dependência de features externas.
 */
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

// ─── TYPES ────────────────────────────────────────────────
export interface CommunityProfile {
    id: string
    user_id: string
    product: string
    username: string
    username_normalized: string
    display_name: string
    avatar_url: string | null
    study_focus: string | null
    study_level: string | null
    status_message: string | null
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Conversation {
    id: string
    type: string
    product: string
    created_by_user_id: string
    created_at: string
    updated_at: string
    last_message_at: string | null
    is_active: boolean
    participants?: ConversationParticipant[]
    other_profile?: CommunityProfile
    last_message?: Message | null
    unread_count?: number
}

export interface ConversationParticipant {
    id: string
    conversation_id: string
    user_id: string
    joined_at: string
    last_read_message_id: string | null
    last_read_at: string | null
    is_active: boolean
}

export interface Message {
    id: string
    conversation_id: string
    sender_user_id: string
    message_type: 'text' | 'question_share' | 'system'
    content_text: string | null
    metadata_json: Record<string, any> | null
    created_at: string
    updated_at: string
    deleted_at: string | null
    is_edited: boolean
    sender_profile?: CommunityProfile
}

export interface QuestionShare {
    id: string
    message_id: string
    conversation_id: string
    sender_user_id: string
    question_id: string
    question_source: string
    product: string
    title_snapshot: string | null
    specialty_snapshot: string | null
    created_at: string
}

// ─── PROFILE ──────────────────────────────────────────────

export async function getMyProfile(userId: string): Promise<CommunityProfile | null> {
    if (!isSupabaseConfigured()) return null
    const { data } = await supabase
        .from('community_profiles')
        .select('*')
        .eq('user_id', userId)
        .eq('product', 'qrub_saude')
        .maybeSingle()
    return data
}

export async function checkUsernameAvailable(username: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return true
    const normalized = username.toLowerCase().trim()
    const { data } = await supabase
        .from('community_profiles')
        .select('id')
        .eq('username_normalized', normalized)
        .maybeSingle()
    return !data
}

export async function createProfile(
    userId: string,
    username: string,
    displayName: string,
    avatarUrl?: string,
    studyFocus?: string,
    studyLevel?: string,
    statusMessage?: string
): Promise<CommunityProfile | null> {
    if (!isSupabaseConfigured()) return null
    const normalized = username.toLowerCase().trim()
    const { data, error } = await supabase
        .from('community_profiles')
        .insert({
            user_id: userId,
            product: 'qrub_saude',
            username,
            username_normalized: normalized,
            display_name: displayName,
            avatar_url: avatarUrl || null,
            study_focus: studyFocus || null,
            study_level: studyLevel || null,
            status_message: statusMessage || null,
        })
        .select()
        .single()
    if (error) throw error
    return data
}

export async function getProfileByUsername(username: string): Promise<CommunityProfile | null> {
    if (!isSupabaseConfigured()) return null
    const normalized = username.toLowerCase().trim()
    const { data } = await supabase
        .from('community_profiles')
        .select('*')
        .eq('username_normalized', normalized)
        .eq('product', 'qrub_saude')
        .maybeSingle()
    return data
}

export async function searchProfiles(query: string, currentUserId: string): Promise<CommunityProfile[]> {
    if (!isSupabaseConfigured()) return []
    const normalizedQuery = query.toLowerCase().replace('@', '').trim()
    if (!normalizedQuery) return []

    // Get blocked user IDs
    const blockedIds = await getBlockedUserIds(currentUserId)

    const { data } = await supabase
        .from('community_profiles')
        .select('*')
        .eq('product', 'qrub_saude')
        .eq('is_active', true)
        .neq('user_id', currentUserId)
        .or(`username_normalized.ilike.%${normalizedQuery}%,display_name.ilike.%${normalizedQuery}%`)
        .limit(20)

    if (!data) return []
    return data.filter(p => !blockedIds.includes(p.user_id))
}

// ─── CONVERSATIONS ────────────────────────────────────────

export async function getOrCreateDirectConversation(
    currentUserId: string,
    otherUserId: string
): Promise<string> {
    if (!isSupabaseConfigured()) return 'mock-conv-id'

    // Find existing 1:1 conversation
    const { data: myConvs } = await supabase
        .from('community_conversation_participants')
        .select('conversation_id')
        .eq('user_id', currentUserId)

    if (myConvs && myConvs.length > 0) {
        const convIds = myConvs.map(c => c.conversation_id)
        const { data: otherParticipation } = await supabase
            .from('community_conversation_participants')
            .select('conversation_id')
            .eq('user_id', otherUserId)
            .in('conversation_id', convIds)

        if (otherParticipation && otherParticipation.length > 0) {
            // Check if it's a direct conversation
            const { data: conv } = await supabase
                .from('community_conversations')
                .select('id')
                .eq('id', otherParticipation[0].conversation_id)
                .eq('type', 'direct')
                .eq('is_active', true)
                .maybeSingle()
            if (conv) return conv.id
        }
    }

    // Create new conversation
    const { data: newConv, error: convError } = await supabase
        .from('community_conversations')
        .insert({
            type: 'direct',
            product: 'qrub_saude',
            created_by_user_id: currentUserId,
        })
        .select()
        .single()

    if (convError || !newConv) throw convError || new Error('Failed to create conversation')

    // Add both participants
    await supabase.from('community_conversation_participants').insert([
        { conversation_id: newConv.id, user_id: currentUserId },
        { conversation_id: newConv.id, user_id: otherUserId },
    ])

    return newConv.id
}

export async function getConversations(userId: string): Promise<Conversation[]> {
    if (!isSupabaseConfigured()) return []

    // Get all conversation IDs for user
    const { data: participations } = await supabase
        .from('community_conversation_participants')
        .select('conversation_id, last_read_message_id, last_read_at')
        .eq('user_id', userId)
        .eq('is_active', true)

    if (!participations || participations.length === 0) return []

    const convIds = participations.map(p => p.conversation_id)

    // Get conversations
    const { data: convs } = await supabase
        .from('community_conversations')
        .select('*')
        .in('id', convIds)
        .eq('is_active', true)
        .order('last_message_at', { ascending: false, nullsFirst: false })

    if (!convs) return []

    // Get blocked IDs
    const blockedIds = await getBlockedUserIds(userId)

    // Enrich each conversation
    const enriched: Conversation[] = []
    for (const conv of convs) {
        // Get other participant
        const { data: participants } = await supabase
            .from('community_conversation_participants')
            .select('user_id')
            .eq('conversation_id', conv.id)
            .neq('user_id', userId)

        if (!participants || participants.length === 0) continue
        const otherUserId = participants[0].user_id

        // Skip blocked users
        if (blockedIds.includes(otherUserId)) continue

        // Get other profile
        const { data: otherProfile } = await supabase
            .from('community_profiles')
            .select('*')
            .eq('user_id', otherUserId)
            .eq('product', 'qrub_saude')
            .maybeSingle()

        // Get last message
        const { data: lastMsg } = await supabase
            .from('community_messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .is('deleted_at', null)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle()

        // Count unread
        const participation = participations.find(p => p.conversation_id === conv.id)
        let unreadCount = 0
        if (participation?.last_read_at) {
            const { count } = await supabase
                .from('community_messages')
                .select('id', { count: 'exact', head: true })
                .eq('conversation_id', conv.id)
                .neq('sender_user_id', userId)
                .gt('created_at', participation.last_read_at)
                .is('deleted_at', null)
            unreadCount = count || 0
        } else {
            const { count } = await supabase
                .from('community_messages')
                .select('id', { count: 'exact', head: true })
                .eq('conversation_id', conv.id)
                .neq('sender_user_id', userId)
                .is('deleted_at', null)
            unreadCount = count || 0
        }

        enriched.push({
            ...conv,
            other_profile: otherProfile || undefined,
            last_message: lastMsg || null,
            unread_count: unreadCount,
        })
    }

    return enriched
}

// ─── MESSAGES ─────────────────────────────────────────────

export async function getMessages(conversationId: string, limit = 50, offset = 0): Promise<Message[]> {
    if (!isSupabaseConfigured()) return []

    const { data: messages } = await supabase
        .from('community_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true })
        .range(offset, offset + limit - 1)

    if (!messages) return []

    // Enrich with sender profiles
    const senderIds = [...new Set(messages.map(m => m.sender_user_id))]
    const { data: profiles } = await supabase
        .from('community_profiles')
        .select('*')
        .in('user_id', senderIds)
        .eq('product', 'qrub_saude')

    const profileMap = new Map((profiles || []).map(p => [p.user_id, p]))

    return messages.map(m => ({
        ...m,
        sender_profile: profileMap.get(m.sender_user_id),
    }))
}

export async function sendMessage(
    conversationId: string,
    senderUserId: string,
    text: string,
    type: 'text' | 'question_share' | 'system' = 'text',
    metadata?: Record<string, any>
): Promise<Message | null> {
    if (!isSupabaseConfigured()) return null

    const { data: msg, error } = await supabase
        .from('community_messages')
        .insert({
            conversation_id: conversationId,
            sender_user_id: senderUserId,
            message_type: type,
            content_text: text,
            metadata_json: metadata || null,
        })
        .select()
        .single()

    if (error) throw error

    // Update conversation last_message_at
    await supabase
        .from('community_conversations')
        .update({ last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq('id', conversationId)

    return msg
}

export async function markConversationRead(conversationId: string, userId: string, lastMessageId: string) {
    if (!isSupabaseConfigured()) return
    await supabase
        .from('community_conversation_participants')
        .update({
            last_read_message_id: lastMessageId,
            last_read_at: new Date().toISOString(),
        })
        .eq('conversation_id', conversationId)
        .eq('user_id', userId)
}

// ─── QUESTION SHARES ──────────────────────────────────────

export async function shareQuestion(
    conversationId: string,
    senderUserId: string,
    questionId: string,
    titleSnapshot: string,
    specialtySnapshot: string
): Promise<Message | null> {
    if (!isSupabaseConfigured()) return null

    const metadata = { question_id: questionId, title: titleSnapshot, specialty: specialtySnapshot }

    const msg = await sendMessage(
        conversationId,
        senderUserId,
        `📋 Questão compartilhada: ${titleSnapshot}`,
        'question_share',
        metadata
    )

    if (msg) {
        await supabase.from('community_question_shares').insert({
            message_id: msg.id,
            conversation_id: conversationId,
            sender_user_id: senderUserId,
            question_id: questionId,
            question_source: 'qrub_saude',
            product: 'qrub_saude',
            title_snapshot: titleSnapshot,
            specialty_snapshot: specialtySnapshot,
        })
    }

    return msg
}

// ─── BLOCKS ───────────────────────────────────────────────

export async function blockUser(blockerUserId: string, blockedUserId: string, reason?: string) {
    if (!isSupabaseConfigured()) return
    await supabase.from('community_blocks').insert({
        blocker_user_id: blockerUserId,
        blocked_user_id: blockedUserId,
        reason: reason || null,
    })
}

export async function unblockUser(blockerUserId: string, blockedUserId: string) {
    if (!isSupabaseConfigured()) return
    await supabase
        .from('community_blocks')
        .delete()
        .eq('blocker_user_id', blockerUserId)
        .eq('blocked_user_id', blockedUserId)
}

export async function getBlockedUserIds(userId: string): Promise<string[]> {
    if (!isSupabaseConfigured()) return []
    const { data: blocks } = await supabase
        .from('community_blocks')
        .select('blocked_user_id')
        .eq('blocker_user_id', userId)

    const { data: blockedBy } = await supabase
        .from('community_blocks')
        .select('blocker_user_id')
        .eq('blocked_user_id', userId)

    const ids = new Set<string>()
    blocks?.forEach(b => ids.add(b.blocked_user_id))
    blockedBy?.forEach(b => ids.add(b.blocker_user_id))
    return [...ids]
}

// ─── REPORTS ──────────────────────────────────────────────

export async function reportUser(
    reporterUserId: string,
    reportedUserId: string,
    reason: string,
    details?: string,
    conversationId?: string,
    messageId?: string
) {
    if (!isSupabaseConfigured()) return
    await supabase.from('community_reports').insert({
        reporter_user_id: reporterUserId,
        reported_user_id: reportedUserId,
        reason,
        details: details || null,
        conversation_id: conversationId || null,
        message_id: messageId || null,
    })
}

// ─── REALTIME SUBSCRIPTION ───────────────────────────────

export function subscribeToMessages(
    conversationId: string,
    callback: (msg: Message) => void
) {
    const channel = supabase
        .channel(`community_messages_${conversationId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'community_messages',
                filter: `conversation_id=eq.${conversationId}`,
            },
            (payload) => {
                callback(payload.new as Message)
            }
        )
        .subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
}
