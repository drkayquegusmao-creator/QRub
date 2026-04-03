"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Search, MessageCircle, Users, Sparkles, ArrowLeft, Loader2,
    ShieldAlert, Flag, X
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useCommunity } from '@/store/community/use-community'
import { CommunityOnboarding } from '@/components/community/onboarding'
import { CommunityChatView } from '@/components/community/chat-view'
import { UserCard, ConversationItem, ProfileView, EmptyConversations, EmptySearch } from '@/components/community/ui'
import type { CommunityProfile } from '@/lib/community/service'
import { cn } from '@/lib/utils'

type CommunityView = 'home' | 'search' | 'profile' | 'chat'

export default function CommunidadePage() {
    const { user } = useAuth()
    const {
        myProfile, profileLoading, profileChecked,
        conversations, conversationsLoading,
        searchResults, searchLoading, searchQuery,
        activeConversationId,
        loadMyProfile, loadConversations,
        openConversation, setActiveConversation,
        searchUsers, clearSearch,
        blockUser, reportUser
    } = useCommunity()

    const [view, setView] = useState<CommunityView>('home')
    const [searchInput, setSearchInput] = useState('')
    const [selectedProfile, setSelectedProfile] = useState<CommunityProfile | null>(null)
    const [chatOtherProfile, setChatOtherProfile] = useState<CommunityProfile | null>(null)
    const [showBlockConfirm, setShowBlockConfirm] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)
    const [reportReason, setReportReason] = useState('')
    const [reportDetails, setReportDetails] = useState('')

    // Load profile on mount
    useEffect(() => {
        if (user?.id) {
            loadMyProfile(user.id)
        }
    }, [user?.id])

    // Load conversations when profile exists
    useEffect(() => {
        if (myProfile && user?.id) {
            loadConversations(user.id)
        }
    }, [myProfile, user?.id])

    // Debounced search
    useEffect(() => {
        if (!searchInput.trim() || !user?.id) {
            clearSearch()
            return
        }
        const timer = setTimeout(() => {
            searchUsers(searchInput, user.id)
        }, 400)
        return () => clearTimeout(timer)
    }, [searchInput, user?.id])

    const handleMessage = async (profile: CommunityProfile) => {
        if (!user?.id) return
        try {
            const convId = await openConversation(user.id, profile.user_id)
            setChatOtherProfile(profile)
            setActiveConversation(convId)
            setView('chat')
        } catch (err) {
            console.error('Error opening conversation:', err)
        }
    }

    const handleViewProfile = (profile: CommunityProfile) => {
        setSelectedProfile(profile)
        setView('profile')
    }

    const handleOpenConversation = (convIndex: number) => {
        const conv = conversations[convIndex]
        if (!conv?.other_profile) return
        setChatOtherProfile(conv.other_profile)
        setActiveConversation(conv.id)
        setView('chat')
    }

    const handleBackToHome = useCallback(() => {
        setView('home')
        setActiveConversation(null)
        setChatOtherProfile(null)
        setSelectedProfile(null)
        if (user?.id) loadConversations(user.id)
    }, [user?.id])

    // ─── LOADING ──────────────────────────────────────────
    if (profileLoading && !profileChecked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B0F1A]">
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
                    />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Carregando comunidade...</p>
                </div>
            </div>
        )
    }

    // ─── ONBOARDING ───────────────────────────────────────
    if (profileChecked && !myProfile) {
        return <CommunityOnboarding onComplete={() => user?.id && loadMyProfile(user.id)} />
    }

    // ─── CHAT VIEW ────────────────────────────────────────
    if (view === 'chat' && activeConversationId && chatOtherProfile) {
        return (
            <div className="h-screen">
                <CommunityChatView
                    conversationId={activeConversationId}
                    otherProfile={chatOtherProfile}
                    onBack={handleBackToHome}
                />
            </div>
        )
    }

    // ─── PROFILE VIEW ─────────────────────────────────────
    if (view === 'profile' && selectedProfile) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A]">
                <ProfileView
                    profile={selectedProfile}
                    onMessage={() => handleMessage(selectedProfile)}
                    onBlock={() => setShowBlockConfirm(true)}
                    onReport={() => setShowReportModal(true)}
                    onBack={handleBackToHome}
                />

                {/* Block Confirm */}
                <AnimatePresence>
                    {showBlockConfirm && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={() => setShowBlockConfirm(false)}
                        >
                            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                                onClick={e => e.stopPropagation()}
                                className="w-full max-w-md bg-white dark:bg-[#1A1033] rounded-[30px] p-8 space-y-6 shadow-2xl text-center"
                            >
                                <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
                                <h3 className="text-xl font-black uppercase tracking-tighter">Bloquear @{selectedProfile.username}?</h3>
                                <p className="text-sm text-slate-500 font-medium">Você não receberá mais mensagens desse usuário.</p>
                                <div className="flex gap-3">
                                    <button onClick={() => setShowBlockConfirm(false)} className="flex-1 py-3 border-2 border-slate-200 dark:border-white/10 rounded-2xl text-sm font-black">Cancelar</button>
                                    <button onClick={async () => {
                                        if (user?.id) await blockUser(user.id, selectedProfile.user_id)
                                        setShowBlockConfirm(false)
                                        handleBackToHome()
                                    }} className="flex-1 py-3 bg-rose-500 text-white rounded-2xl text-sm font-black">Bloquear</button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Report Modal */}
                <AnimatePresence>
                    {showReportModal && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={() => setShowReportModal(false)}
                        >
                            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                                onClick={e => e.stopPropagation()}
                                className="w-full max-w-md bg-white dark:bg-[#1A1033] rounded-[30px] p-8 space-y-6 shadow-2xl"
                            >
                                <h3 className="text-xl font-black uppercase tracking-tighter">Denunciar @{selectedProfile.username}</h3>
                                <div className="space-y-2">
                                    {['Spam', 'Assédio', 'Conteúdo impróprio', 'Comportamento abusivo', 'Outro'].map(r => (
                                        <button key={r} onClick={() => setReportReason(r)}
                                            className={cn("w-full px-4 py-3 rounded-xl border-2 text-left text-sm font-bold transition-all",
                                                reportReason === r ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10" : "border-slate-200 dark:border-white/10"
                                            )}>{r}</button>
                                    ))}
                                </div>
                                <textarea value={reportDetails} onChange={e => setReportDetails(e.target.value)}
                                    placeholder="Detalhes (opcional)"
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border rounded-xl text-sm resize-none h-20 focus:outline-none"
                                />
                                <div className="flex gap-3">
                                    <button onClick={() => setShowReportModal(false)} className="flex-1 py-3 border-2 border-slate-200 dark:border-white/10 rounded-2xl text-sm font-black">Cancelar</button>
                                    <button onClick={async () => {
                                        if (user?.id && reportReason) await reportUser(user.id, selectedProfile.user_id, reportReason, reportDetails)
                                        setShowReportModal(false)
                                        setReportReason('')
                                        setReportDetails('')
                                    }} disabled={!reportReason} className="flex-1 py-3 bg-amber-500 text-white rounded-2xl text-sm font-black disabled:opacity-30">Enviar</button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }

    // ─── HOME VIEW ────────────────────────────────────────
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F1A]">
            <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6 space-y-8">
                
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                            <Users className="w-3 h-3" />
                            Comunidade QRub
                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[8px]">BETA</span>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white leading-none">
                        Comunidade <span className="text-emerald-500">QRub</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                        Encontre colegas, troque mensagens e discuta questões com outros usuários do QRub Saúde.
                    </p>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Busque por @username para encontrar outros estudantes..."
                        className="w-full pl-14 pr-6 py-4 bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 rounded-2xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 ring-emerald-500/10 transition-all"
                    />
                    {searchInput && (
                        <button onClick={() => { setSearchInput(''); clearSearch() }} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full">
                            <X className="w-4 h-4 text-slate-400" />
                        </button>
                    )}
                </div>

                {/* Search Results */}
                {searchInput.trim() && (
                    <div className="space-y-3">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Resultados da busca
                        </h3>
                        {searchLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                            </div>
                        ) : searchResults.length === 0 ? (
                            <EmptySearch />
                        ) : (
                            <div className="space-y-3">
                                {searchResults.map((profile, i) => (
                                    <UserCard
                                        key={profile.id}
                                        profile={profile}
                                        onMessage={handleMessage}
                                        onViewProfile={handleViewProfile}
                                        delay={i}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Conversations */}
                {!searchInput.trim() && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Conversas Recentes
                            </h3>
                            {conversations.length > 0 && (
                                <span className="text-[10px] font-bold text-slate-400">
                                    {conversations.length} {conversations.length === 1 ? 'conversa' : 'conversas'}
                                </span>
                            )}
                        </div>

                        {conversationsLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                            </div>
                        ) : conversations.length === 0 ? (
                            <EmptyConversations />
                        ) : (
                            <div className="space-y-2">
                                {conversations.map((conv, i) => (
                                    <ConversationItem
                                        key={conv.id}
                                        displayName={conv.other_profile?.display_name || 'Usuário'}
                                        username={conv.other_profile?.username || ''}
                                        lastMessage={conv.last_message?.content_text || null}
                                        lastMessageAt={conv.last_message_at || null}
                                        unreadCount={conv.unread_count || 0}
                                        onClick={() => handleOpenConversation(i)}
                                        delay={i}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* My Profile Badge */}
                {myProfile && !searchInput.trim() && (
                    <div className="mt-8 p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-sm font-black shrink-0">
                            {myProfile.display_name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-400">Seu perfil</p>
                            <p className="text-sm font-black text-emerald-500 truncate">@{myProfile.username}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
