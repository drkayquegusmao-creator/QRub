"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    ArrowLeft, Send, Share2, MoreVertical, Loader2, ShieldAlert,
    Flag, BookOpen, ExternalLink, Clock, Check, CheckCheck, X 
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useCommunity } from '@/store/community/use-community'
import { subscribeToMessages } from '@/lib/community/service'
import type { CommunityProfile, Message } from '@/lib/community/service'
import { cn } from '@/lib/utils'
import { QuestionPicker } from './QuestionPicker'
import Link from 'next/link'

interface CommunityChatViewProps {
    conversationId: string
    otherProfile: CommunityProfile
    onBack: () => void
}

export function CommunityChatView({ conversationId, otherProfile, onBack }: CommunityChatViewProps) {
    const { user } = useAuth()
    const { messages, messagesLoading, loadMessages, sendMessage, markRead, shareQuestion, blockUser, reportUser } = useCommunity()
    
    const [text, setText] = useState('')
    const [sending, setSending] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)
    const [showBlockConfirm, setShowBlockConfirm] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)
    const [reportReason, setReportReason] = useState('')
    const [reportDetails, setReportDetails] = useState('')
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        loadMessages(conversationId)
    }, [conversationId])

    // Realtime subscription
    useEffect(() => {
        const unsub = subscribeToMessages(conversationId, (newMsg) => {
            // Only add if not already in list (avoid duplicates from optimistic update)
            useCommunity.setState(state => {
                if (state.messages.find(m => m.id === newMsg.id)) return state
                return { messages: [...state.messages, newMsg] }
            })
        })
        return unsub
    }, [conversationId])

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    // Mark read on open
    useEffect(() => {
        if (messages.length > 0 && user?.id) {
            markRead(conversationId, user.id)
        }
    }, [messages.length, conversationId, user?.id])

    const handleSend = async () => {
        if (!text.trim() || !user?.id || sending) return
        const msgText = text.trim()
        setText('')
        setSending(true)
        try {
            await sendMessage(conversationId, user.id, msgText)
        } finally {
            setSending(false)
            inputRef.current?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleBlock = async () => {
        if (!user?.id) return
        await blockUser(user.id, otherProfile.user_id, 'Blocked from chat')
        setShowBlockConfirm(false)
        onBack()
    }

    const handleReport = async () => {
        if (!user?.id || !reportReason) return
        await reportUser(user.id, otherProfile.user_id, reportReason, reportDetails, conversationId)
        setShowReportModal(false)
        setReportReason('')
        setReportDetails('')
    }

    const formatTime = (date: string) => {
        return new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    const formatDate = (date: string) => {
        const d = new Date(date)
        const today = new Date()
        if (d.toDateString() === today.toDateString()) return 'Hoje'
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        if (d.toDateString() === yesterday.toDateString()) return 'Ontem'
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    }

    // Group messages by date
    const groupedMessages: { date: string; msgs: Message[] }[] = []
    messages.forEach(msg => {
        const dateStr = new Date(msg.created_at).toDateString()
        const last = groupedMessages[groupedMessages.length - 1]
        if (last && new Date(last.msgs[0].created_at).toDateString() === dateStr) {
            last.msgs.push(msg)
        } else {
            groupedMessages.push({ date: msg.created_at, msgs: [msg] })
        }
    })

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0B0F1A]">
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-4 bg-white dark:bg-white/5 border-b border-slate-100 dark:border-white/5 shrink-0">
                <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all">
                    <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-white" />
                </button>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-black text-sm shrink-0">
                    {otherProfile.display_name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-black uppercase tracking-tighter text-slate-800 dark:text-white truncate">{otherProfile.display_name}</h3>
                    <p className="text-[10px] font-bold text-emerald-500 truncate">@{otherProfile.username}</p>
                </div>
                <div className="relative">
                    <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all">
                        <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                    <AnimatePresence>
                        {showMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: -5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute right-0 top-12 w-56 bg-white dark:bg-[#1A1033] border border-slate-100 dark:border-white/10 rounded-2xl shadow-2xl p-2 z-50"
                            >
                                <button
                                    onClick={() => { setShowMenu(false); setShowBlockConfirm(true) }}
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
                                >
                                    <ShieldAlert className="w-4 h-4" /> Bloquear
                                </button>
                                <button
                                    onClick={() => { setShowMenu(false); setShowReportModal(true) }}
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all"
                                >
                                    <Flag className="w-4 h-4" /> Denunciar
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-1">
                {messagesLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                            <Send className="w-7 h-7 text-emerald-500" />
                        </div>
                        <p className="text-sm font-bold text-slate-400">Envie uma mensagem para iniciar a conversa</p>
                    </div>
                ) : (
                    groupedMessages.map((group, gi) => (
                        <div key={gi}>
                            {/* Date separator */}
                            <div className="flex items-center justify-center my-6">
                                <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    {formatDate(group.date)}
                                </span>
                            </div>
                            {group.msgs.map((msg) => {
                                const isMine = msg.sender_user_id === user?.id
                                const isQuestion = msg.message_type === 'question_share'

                                return (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={cn("flex mb-2", isMine ? "justify-end" : "justify-start")}
                                    >
                                        <div className={cn(
                                            "max-w-[75%] md:max-w-[60%] px-5 py-3.5 rounded-[24px] relative group",
                                            isMine
                                                ? "bg-emerald-500 text-white rounded-br-lg"
                                                : "bg-white dark:bg-white/10 text-slate-800 dark:text-white border border-slate-100 dark:border-white/5 rounded-bl-lg"
                                        )}>
                                            {isQuestion && msg.metadata_json ? (
                                                <div className={cn(
                                                    "space-y-2 p-3 rounded-xl border",
                                                    isMine ? "bg-white/10 border-white/20" : "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20"
                                                )}>
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className={cn("w-4 h-4", isMine ? "text-white" : "text-emerald-500")} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Questão Compartilhada</span>
                                                    </div>
                                                    <p className="text-sm font-bold line-clamp-2">{msg.metadata_json.title || 'Questão sem título'}</p>
                                                    {msg.metadata_json.specialty && (
                                                        <span className={cn(
                                                            "inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase",
                                                            isMine ? "bg-white/20" : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                                                        )}>
                                                            {msg.metadata_json.specialty}
                                                        </span>
                                                    )}
                                                    <Link 
                                                        href={`/dashboard/praticar/questoes?id=${msg.metadata_json.question_id}`}
                                                        className={cn(
                                                            "flex items-center gap-1 text-[10px] font-black uppercase tracking-widest mt-1",
                                                            isMine ? "text-white/70 hover:text-white" : "text-emerald-500 hover:text-emerald-600"
                                                        )}
                                                    >
                                                        Abrir questão <ExternalLink className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            ) : (
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content_text}</p>
                                            )}
                                            <div className={cn(
                                                "flex items-center gap-1 mt-1",
                                                isMine ? "justify-end" : "justify-start"
                                            )}>
                                                <span className={cn(
                                                    "text-[9px] font-bold",
                                                    isMine ? "text-white/50" : "text-slate-400"
                                                )}>
                                                    {formatTime(msg.created_at)}
                                                </span>
                                                {isMine && (
                                                    <CheckCheck className="w-3 h-3 text-white/50" />
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <div className="shrink-0 bg-white dark:bg-white/5 border-t border-slate-100 dark:border-white/5 px-4 md:px-8 py-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowShareModal(true)}
                        className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all shrink-0"
                        title="Compartilhar questão"
                    >
                        <Share2 className="w-5 h-5" />
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 px-5 py-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 ring-emerald-500/10 transition-all"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!text.trim() || sending}
                        className="p-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-all disabled:opacity-30 shrink-0"
                    >
                        {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* ─── SHARE QUESTION PICKER ─── */}
            <QuestionPicker 
                isOpen={showShareModal} 
                onClose={() => setShowShareModal(false)}
                onSelect={async (q) => {
                    if (!user?.id) return
                    setShowShareModal(false)
                    await shareQuestion(
                        conversationId, 
                        user.id, 
                        q.id, 
                        q.enunciado.substring(0, 100) + '...', 
                        q.specialty_id
                    )
                }}
            />

            {/* ─── BLOCK CONFIRM ─── */}
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
                            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">Bloquear @{otherProfile.username}?</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                Você não receberá mais mensagens desse usuário e ele não poderá te encontrar.
                            </p>
                            <div className="flex gap-3">
                                <button onClick={() => setShowBlockConfirm(false)} className="flex-1 py-3 border-2 border-slate-200 dark:border-white/10 rounded-2xl text-sm font-black uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Cancelar</button>
                                <button onClick={handleBlock} className="flex-1 py-3 bg-rose-500 text-white rounded-2xl text-sm font-black uppercase tracking-wider hover:bg-rose-600 transition-all">Bloquear</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── REPORT MODAL ─── */}
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
                            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">Denunciar @{otherProfile.username}</h3>
                            <div className="space-y-2">
                                {['Spam', 'Assédio', 'Conteúdo impróprio', 'Comportamento abusivo', 'Outro'].map(r => (
                                    <button
                                        key={r}
                                        onClick={() => setReportReason(r)}
                                        className={cn(
                                            "w-full px-4 py-3 rounded-xl border-2 text-left text-sm font-bold transition-all",
                                            reportReason === r
                                                ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300"
                                                : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-amber-300"
                                        )}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={reportDetails}
                                onChange={e => setReportDetails(e.target.value)}
                                placeholder="Detalhes adicionais (opcional)"
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm resize-none h-20 focus:outline-none focus:border-amber-500"
                            />
                            <div className="flex gap-3">
                                <button onClick={() => setShowReportModal(false)} className="flex-1 py-3 border-2 border-slate-200 dark:border-white/10 rounded-2xl text-sm font-black uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Cancelar</button>
                                <button onClick={handleReport} disabled={!reportReason} className="flex-1 py-3 bg-amber-500 text-white rounded-2xl text-sm font-black uppercase tracking-wider hover:bg-amber-600 transition-all disabled:opacity-30">Enviar</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
