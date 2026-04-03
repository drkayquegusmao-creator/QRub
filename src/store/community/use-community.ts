/**
 * COMUNIDADE QRUB — ZUSTAND STORE (ISOLADO)
 * Gerenciamento de estado da comunidade, sem dependências externas.
 */
import { create } from 'zustand'
import * as service from '@/lib/community/service'
import type { CommunityProfile, Conversation, Message } from '@/lib/community/service'

interface CommunityState {
    // Profile
    myProfile: CommunityProfile | null
    profileLoading: boolean
    profileChecked: boolean

    // Conversations
    conversations: Conversation[]
    conversationsLoading: boolean
    activeConversationId: string | null

    // Messages
    messages: Message[]
    messagesLoading: boolean

    // Search
    searchResults: CommunityProfile[]
    searchLoading: boolean
    searchQuery: string

    // Unread
    totalUnread: number

    // Actions — Profile
    loadMyProfile: (userId: string) => Promise<void>
    createProfile: (
        userId: string,
        username: string,
        displayName: string,
        avatarUrl?: string,
        studyFocus?: string,
        studyLevel?: string,
        statusMessage?: string
    ) => Promise<CommunityProfile | null>
    checkUsername: (username: string) => Promise<boolean>

    // Actions — Conversations
    loadConversations: (userId: string) => Promise<void>
    openConversation: (currentUserId: string, otherUserId: string) => Promise<string>
    setActiveConversation: (id: string | null) => void

    // Actions — Messages
    loadMessages: (conversationId: string) => Promise<void>
    sendMessage: (conversationId: string, senderUserId: string, text: string) => Promise<void>
    shareQuestion: (
        conversationId: string,
        senderUserId: string,
        questionId: string,
        title: string,
        specialty: string
    ) => Promise<void>
    markRead: (conversationId: string, userId: string) => Promise<void>

    // Actions — Search
    searchUsers: (query: string, currentUserId: string) => Promise<void>
    clearSearch: () => void

    // Actions — Moderation
    blockUser: (blockerUserId: string, blockedUserId: string, reason?: string) => Promise<void>
    reportUser: (
        reporterUserId: string,
        reportedUserId: string,
        reason: string,
        details?: string,
        conversationId?: string,
        messageId?: string
    ) => Promise<void>
}

export const useCommunity = create<CommunityState>((set, get) => ({
    myProfile: null,
    profileLoading: false,
    profileChecked: false,
    conversations: [],
    conversationsLoading: false,
    activeConversationId: null,
    messages: [],
    messagesLoading: false,
    searchResults: [],
    searchLoading: false,
    searchQuery: '',
    totalUnread: 0,

    loadMyProfile: async (userId) => {
        set({ profileLoading: true })
        try {
            const profile = await service.getMyProfile(userId)
            set({ myProfile: profile, profileChecked: true })
        } catch (err) {
            console.error('[Community] loadMyProfile error:', err)
            set({ profileChecked: true })
        } finally {
            set({ profileLoading: false })
        }
    },

    createProfile: async (userId, username, displayName, avatarUrl, studyFocus, studyLevel, statusMessage) => {
        set({ profileLoading: true })
        try {
            const profile = await service.createProfile(userId, username, displayName, avatarUrl, studyFocus, studyLevel, statusMessage)
            set({ myProfile: profile, profileChecked: true })
            return profile
        } catch (err) {
            console.error('[Community] createProfile error:', err)
            throw err
        } finally {
            set({ profileLoading: false })
        }
    },

    checkUsername: async (username) => {
        return await service.checkUsernameAvailable(username)
    },

    loadConversations: async (userId) => {
        set({ conversationsLoading: true })
        try {
            const convs = await service.getConversations(userId)
            const totalUnread = convs.reduce((sum, c) => sum + (c.unread_count || 0), 0)
            set({ conversations: convs, totalUnread })
        } catch (err) {
            console.error('[Community] loadConversations error:', err)
        } finally {
            set({ conversationsLoading: false })
        }
    },

    openConversation: async (currentUserId, otherUserId) => {
        const convId = await service.getOrCreateDirectConversation(currentUserId, otherUserId)
        set({ activeConversationId: convId })
        return convId
    },

    setActiveConversation: (id) => {
        set({ activeConversationId: id, messages: [] })
    },

    loadMessages: async (conversationId) => {
        set({ messagesLoading: true })
        try {
            const msgs = await service.getMessages(conversationId)
            set({ messages: msgs })
        } catch (err) {
            console.error('[Community] loadMessages error:', err)
        } finally {
            set({ messagesLoading: false })
        }
    },

    sendMessage: async (conversationId, senderUserId, text) => {
        try {
            const msg = await service.sendMessage(conversationId, senderUserId, text)
            if (msg) {
                set(state => ({ messages: [...state.messages, msg] }))
            }
        } catch (err) {
            console.error('[Community] sendMessage error:', err)
        }
    },

    shareQuestion: async (conversationId, senderUserId, questionId, title, specialty) => {
        try {
            const msg = await service.shareQuestion(conversationId, senderUserId, questionId, title, specialty)
            if (msg) {
                set(state => ({ messages: [...state.messages, msg] }))
            }
        } catch (err) {
            console.error('[Community] shareQuestion error:', err)
        }
    },

    markRead: async (conversationId, userId) => {
        const { messages } = get()
        const lastMsg = messages[messages.length - 1]
        if (lastMsg) {
            await service.markConversationRead(conversationId, userId, lastMsg.id)
        }
    },

    searchUsers: async (query, currentUserId) => {
        set({ searchLoading: true, searchQuery: query })
        try {
            const results = await service.searchProfiles(query, currentUserId)
            set({ searchResults: results })
        } catch (err) {
            console.error('[Community] searchUsers error:', err)
        } finally {
            set({ searchLoading: false })
        }
    },

    clearSearch: () => {
        set({ searchResults: [], searchQuery: '' })
    },

    blockUser: async (blockerUserId, blockedUserId, reason) => {
        try {
            await service.blockUser(blockerUserId, blockedUserId, reason)
            // Remove from conversations
            set(state => ({
                conversations: state.conversations.filter(c => c.other_profile?.user_id !== blockedUserId),
                searchResults: state.searchResults.filter(p => p.user_id !== blockedUserId),
            }))
        } catch (err) {
            console.error('[Community] blockUser error:', err)
        }
    },

    reportUser: async (reporterUserId, reportedUserId, reason, details, conversationId, messageId) => {
        try {
            await service.reportUser(reporterUserId, reportedUserId, reason, details, conversationId, messageId)
        } catch (err) {
            console.error('[Community] reportUser error:', err)
        }
    },
}))
