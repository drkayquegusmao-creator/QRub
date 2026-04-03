"use client"

import { motion } from 'framer-motion'
import { Search, MessageCircle, AtSign, BookOpen, GraduationCap, Loader2 } from 'lucide-react'
import type { CommunityProfile } from '@/lib/community/service'
import { cn } from '@/lib/utils'

interface UserCardProps {
    profile: CommunityProfile
    onMessage: (profile: CommunityProfile) => void
    onViewProfile: (profile: CommunityProfile) => void
    delay?: number
}

export function UserCard({ profile, onMessage, onViewProfile, delay = 0 }: UserCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.05 }}
            className="p-5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[28px] hover:border-emerald-500/30 transition-all group shadow-sm hover:shadow-lg"
        >
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-lg font-black shrink-0">
                    {profile.display_name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black uppercase tracking-tighter text-slate-800 dark:text-white truncate">
                        {profile.display_name}
                    </h4>
                    <p className="text-xs font-bold text-emerald-500">@{profile.username}</p>
                    {profile.study_focus && (
                        <div className="flex items-center gap-1 mt-1">
                            <BookOpen className="w-3 h-3 text-slate-400" />
                            <span className="text-[10px] font-bold text-slate-400 truncate">{profile.study_focus}</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                    <button
                        onClick={() => onMessage(profile)}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all"
                    >
                        Mensagem
                    </button>
                    <button
                        onClick={() => onViewProfile(profile)}
                        className="px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                    >
                        Ver perfil
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

// ─── CONVERSATION LIST ITEM ─────────────────────────────

interface ConversationItemProps {
    displayName: string
    username: string
    lastMessage: string | null
    lastMessageAt: string | null
    unreadCount: number
    onClick: () => void
    delay?: number
}

export function ConversationItem({ displayName, username, lastMessage, lastMessageAt, unreadCount, onClick, delay = 0 }: ConversationItemProps) {
    const formatRelativeTime = (date: string) => {
        const diff = Date.now() - new Date(date).getTime()
        const mins = Math.floor(diff / 60000)
        if (mins < 1) return 'agora'
        if (mins < 60) return `${mins}min`
        const hours = Math.floor(mins / 60)
        if (hours < 24) return `${hours}h`
        const days = Math.floor(hours / 24)
        return `${days}d`
    }

    return (
        <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.05 }}
            onClick={onClick}
            className="w-full flex items-center gap-4 p-4 md:p-5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] hover:border-emerald-500/30 transition-all group text-left"
        >
            <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-sm font-black">
                    {displayName?.charAt(0)?.toUpperCase() || '?'}
                </div>
                {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-lg shadow-emerald-500/30">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                    <h4 className={cn(
                        "text-sm font-bold truncate",
                        unreadCount > 0 ? "text-slate-800 dark:text-white font-black" : "text-slate-600 dark:text-slate-300"
                    )}>
                        {displayName}
                    </h4>
                    {lastMessageAt && (
                        <span className="text-[10px] font-bold text-slate-400 shrink-0">
                            {formatRelativeTime(lastMessageAt)}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold text-emerald-500">@{username}</span>
                    {lastMessage && (
                        <>
                            <span className="text-slate-300 dark:text-slate-600 text-xs">·</span>
                            <p className={cn(
                                "text-xs truncate",
                                unreadCount > 0 ? "text-slate-700 dark:text-slate-200 font-bold" : "text-slate-400 font-medium"
                            )}>
                                {lastMessage}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </motion.button>
    )
}

// ─── PROFILE VIEW ────────────────────────────────────────

interface ProfileViewProps {
    profile: CommunityProfile
    onMessage: () => void
    onBlock: () => void
    onReport: () => void
    onBack: () => void
}

export function ProfileView({ profile, onMessage, onBlock, onReport, onBack }: ProfileViewProps) {
    return (
        <div className="max-w-lg mx-auto space-y-8 py-12 px-6">
            <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-all">
                ← Voltar
            </button>

            <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[40px] p-10 text-center space-y-6 shadow-xl">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-500 text-3xl font-black">
                    {profile.display_name?.charAt(0)?.toUpperCase() || '?'}
                </div>

                {/* Info */}
                <div className="space-y-1">
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">
                        {profile.display_name}
                    </h2>
                    <p className="text-base font-bold text-emerald-500">@{profile.username}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                    {profile.study_focus && (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                            <BookOpen className="w-3 h-3" /> {profile.study_focus}
                        </span>
                    )}
                    {profile.study_level && (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 text-sky-600 dark:text-sky-400 text-[10px] font-bold uppercase tracking-widest">
                            <GraduationCap className="w-3 h-3" /> {profile.study_level}
                        </span>
                    )}
                </div>

                {/* Status */}
                {profile.status_message && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium italic">
                        &ldquo;{profile.status_message}&rdquo;
                    </p>
                )}

                {/* Actions */}
                <button
                    onClick={onMessage}
                    className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                    <MessageCircle className="w-4 h-4" /> Mandar Mensagem
                </button>

                {/* Moderation */}
                <div className="flex justify-center gap-6 pt-4 border-t border-slate-100 dark:border-white/10">
                    <button onClick={onBlock} className="text-[10px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-500 transition-all">
                        Bloquear
                    </button>
                    <button onClick={onReport} className="text-[10px] font-black uppercase tracking-widest text-amber-400 hover:text-amber-500 transition-all">
                        Denunciar
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── EMPTY STATES ────────────────────────────────────────

export function EmptyConversations() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 md:py-32 px-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <MessageCircle className="w-9 h-9 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white mb-3">
                Sua rede de estudo começa aqui
            </h3>
            <p className="text-slate-400 font-medium text-sm max-w-md mb-8">
                Encontre colegas, troque mensagens e discuta questões com outros usuários do QRub Saúde.
            </p>
        </div>
    )
}

export function EmptySearch() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6">
            <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-4" />
            <p className="text-slate-400 font-bold text-sm">Nenhum usuário encontrado para essa busca.</p>
        </div>
    )
}
