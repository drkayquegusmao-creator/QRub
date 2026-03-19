'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Users, Copy, Check, LogIn, Plus, BookOpen,
    ArrowRight, Loader2, AlertCircle, WifiOff, MessageSquare, CheckCircle2, XCircle, LayoutGrid
} from 'lucide-react'
import { toast } from 'react-hot-toast'

import { 
    supabase, DuoSessionStatus, DuoSession, DuoParticipant, DuoAnswer, Question,
    createDuoSession, joinDuoSession, fetchDuoSession, markAsReady, advanceSessionStatus,
    buildSessionContent, fetchQuestionsByIds, submitDuoAnswer, getAnswersForCurrentIndex,
    moveToNextQuestion, finalizeSession
} from '@/lib/duo-service'
import { DuoRealtimeEngine } from '@/lib/duo-realtime'

type DuoView = 'home' | 'waiting_room' | 'configuring' | 'session_active' | 'results'

// ==========================================
// ERROR BOUNDARY
// ==========================================

class DuoErrorBoundary extends React.Component<{children: React.ReactNode, onReset: () => void}, {hasError: boolean}> {
    constructor(props: any) {
        super(props)
        this.state = { hasError: false }
    }
    static getDerivedStateFromError() { return { hasError: true } }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-red-500/20 rounded-3xl text-center text-white min-h-[50vh]">
                    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Um erro grave ocorreu</h3>
                    <p className="text-slate-400 mb-6 text-sm">O componente falhou. Isso nos protegeu de uma tela branca.</p>
                    <button onClick={() => { this.setState({hasError: false}); this.props.onReset() }} className="px-6 py-3 bg-red-500 hover:bg-red-600 font-bold rounded-xl transition-colors">
                        Recarregar Sessão
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}

// ==========================================
// HOME VIEW
// ==========================================

function DuoModuleHome({ user, onSessionJoined }: { user: any, onSessionJoined: (s: DuoSession, p: DuoParticipant[]) => void }) {
    const [joinCode, setJoinCode] = useState('')
    const [loading, setLoading] = useState<'create' | 'join' | null>(null)

    const handleCreate = async () => {
        if (!user) return toast.error("Autenticação necessária.")
        setLoading('create')
        try {
            const { session, error } = await createDuoSession(user.id)
            if (error || !session) throw error || new Error("Falha ao criar sala.")
            const { participants } = await fetchDuoSession(session.id)
            toast.success("Sala em dupla criada!")
            onSessionJoined(session, participants)
        } catch (err: any) {
            toast.error(err.message || "Não foi possível criar a sessão.")
        } finally {
            setLoading(null)
        }
    }

    const handleJoin = async () => {
        if (joinCode.length < 5) return toast.error("Código inválido.")
        if (!user) return toast.error("Autenticação necessária.")
        setLoading('join')
        try {
            const { session, error } = await joinDuoSession(joinCode, user.id)
            if (error || !session) throw error || new Error("Código expirado ou inválido.")
            const { participants } = await fetchDuoSession(session.id)
            toast.success("Conectado à sala!")
            onSessionJoined(session, participants)
        } catch (err: any) {
            toast.error(err.message || "Erro ao entrar.")
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter flex items-center justify-center gap-3">
                    <Users className="w-10 h-10 text-emerald-500" />
                    <span className="text-white">QRub</span> <span className="text-emerald-500">Dupla</span>
                </h1>
                <p className="text-slate-400 font-medium mt-3">Estudo colaborativo e competitivo. Resolvam juntos.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col justify-between shadow-xl">
                    <div className="mb-8">
                        <div className="w-14 h-14 bg-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center mb-6"><Plus className="w-7 h-7" /></div>
                        <h2 className="text-2xl font-black text-white mb-2">Criar Sala</h2>
                        <p className="text-slate-400 text-sm">Gere um código exclusivo para compartilhar. O Host configura toda a sessão.</p>
                    </div>
                    <button onClick={handleCreate} disabled={loading !== null} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-black uppercase text-sm rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
                        {loading === 'create' ? <Loader2 className="w-5 h-5 animate-spin"/> : "Gerar Código"}
                    </button>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col justify-between shadow-xl">
                    <div>
                        <div className="w-14 h-14 bg-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center mb-6"><LogIn className="w-7 h-7" /></div>
                        <h2 className="text-2xl font-black text-white mb-2">Entrar na Sala</h2>
                        <input type="text" placeholder="Ex: QRUB-DPL-XXX" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 mt-4 text-white font-bold tracking-widest text-center uppercase outline-none focus:border-blue-500" />
                    </div>
                    <button onClick={handleJoin} disabled={loading !== null || !joinCode} className="w-full mt-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-black uppercase text-sm rounded-2xl transition-all flex items-center justify-center gap-2">
                        {loading === 'join' ? <Loader2 className="w-5 h-5 animate-spin"/> : "Entrar Juntos"} <ArrowRight className="w-4 h-4"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

// ==========================================
// WAITING ROOM VIEW
// ==========================================

function DuoWaitingRoom({ user, session, participants, onlineUsers }: { user: any, session: DuoSession, participants: DuoParticipant[], onlineUsers: string[] }) {
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)

    const host = participants.find(p => p.role === 'host')
    const guest = participants.find(p => p.role === 'guest')
    const myParticipant = participants.find(p => p.user_id === user.id)

    const bothPresent = Boolean(host && guest)
    const isReady = myParticipant?.is_ready
    // Using simple approach: wait for another participant to join.

    const handleReady = async () => {
        if (!myParticipant) return
        setLoading(true)
        try {
            await markAsReady(session.id, user.id)
            toast.success("Pronto!")
        } catch (e: any) {
            toast.error("Erro ao aplicar pronto")
        } finally {
            setLoading(false)
        }
    }

    const hostCanAdvance = host?.is_ready && guest?.is_ready && myParticipant?.role === 'host'

    const handleConfigure = async () => {
        setLoading(true)
        await advanceSessionStatus(session.id, 'configuring')
        setLoading(false)
    }

    return (
        <div className="max-w-3xl mx-auto py-8 text-center text-white">
            <h2 className="text-3xl font-black mb-4">Sala de Sincronia</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-12 max-w-sm mx-auto flex flex-col items-center cursor-pointer hover:bg-white/10" onClick={() => { navigator.clipboard.writeText(session.code); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
                <span className="text-[10px] font-black uppercase text-emerald-500 mb-2">Código Secreto</span>
                <div className="flex justify-center items-center gap-4 w-full">
                    <span className="text-3xl font-black tracking-[0.2em]">{session.code}</span>
                    {copied ? <Check className="w-6 h-6 text-emerald-500" /> : <Copy className="w-6 h-6 text-slate-400" />}
                </div>
            </div>

            {/* Avatars */}
            <div className="grid grid-cols-2 gap-6 mb-12">
                {[host, guest].map((p, idx) => {
                    if (!p) return (
                        <div key={`emp-${idx}`} className="bg-white/5 border-dashed border-2 border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center opacity-50 h-40">
                            <Loader2 className="w-8 h-8 animate-spin mb-2 text-slate-500" />
                            <span className="text-sm font-bold">Aguardando Parceiro...</span>
                        </div>
                    )
                    const isMe = p.user_id === user.id
                    const isOnline = onlineUsers.includes(p.user_id)
                    return (
                        <div key={p.id} className="relative bg-[#1A1033] border border-white/10 p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg h-40">
                            <div className="absolute top-4 right-4 flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                <span className="text-[10px] uppercase font-bold text-slate-400">{isOnline ? 'On' : 'Off'}</span>
                            </div>
                            <h3 className="font-black text-xl mb-1">{isMe ? "Você" : (p.role === 'host' ? "Criador" : "Convidado")}</h3>
                            <div className={`mt-2 font-bold text-xs uppercase px-3 py-1 rounded-full ${p.is_ready ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/10 text-slate-400'}`}>
                                {p.is_ready ? "Está Pronto ✓" : "Arrumando mesa..."}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Actions */}
            {bothPresent && !isReady && (
                <button onClick={handleReady} disabled={loading} className="px-12 py-5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-black uppercase text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 mx-auto">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Estou Pronto!"}
                </button>
            )}

            {isReady && !hostCanAdvance && (
                <p className="font-bold text-amber-500 animate-pulse">Aguarde os dois ficarem prontos...</p>
            )}

            {hostCanAdvance && (
                <button onClick={handleConfigure} disabled={loading} className="px-12 py-5 bg-blue-500 hover:bg-blue-600 text-white font-black uppercase text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 mx-auto">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : "Configurar Simulado"} <ArrowRight className="w-5 h-5"/>
                </button>
            )}
        </div>
    )
}

// ==========================================
// CONFIGURING VIEW (Content Selector)
// ==========================================

function DuoConfiguring({ session, user }: { session: DuoSession, user: any }) {
    const isHost = session.host_user_id === user.id
    const [loading, setLoading] = useState(false)

    const startQuizGeneration = async () => {
        setLoading(true)
        try {
            await buildSessionContent(session.id)
            // session changes to in_progress via Realtime DB event.
        } catch (e) {
            toast.error("Erro ao gerar questões.")
            setLoading(false)
        }
    }

    if (!isHost) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <LayoutGrid className="w-16 h-16 text-blue-500 mb-6 animate-pulse" />
                <h2 className="text-2xl font-black text-white mb-2">Aguardando o Criador</h2>
                <p className="text-slate-400">O Host está escolhendo o cardápio de questões da sessão...</p>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto py-12 text-center text-white">
            <h2 className="text-3xl font-black mb-2">Configuração</h2>
            <p className="text-slate-400 mb-8">Defina os parâmetros do simulado. (Exemplo MVP: Buscará 10 questões rápidas).</p>
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                <BookOpen className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <p className="font-bold mb-6">Módulo Estilo Confronto Aleatório (10Q)</p>
                <button onClick={startQuizGeneration} disabled={loading} className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 font-black uppercase rounded-2xl flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Gerar Concurso e Iniciar A Batalha"}
                </button>
            </div>
        </div>
    )
}

// ==========================================
// SESSION ACTIVE (In Progress)
// ==========================================

function DuoSessionActive({ session, user, engine }: { session: DuoSession, user: any, engine: DuoRealtimeEngine | null }) {
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    const [answers, setAnswers] = useState<DuoAnswer[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [myAnswer, setMyAnswer] = useState<string | null>(null)

    const currentIndex = session.current_question_index
    const isHost = session.host_user_id === user.id

    // Load full question objects and sync answers on mount or index change
    useEffect(() => {
        const load = async () => {
             setLoading(true)
             if (session.question_ids_json?.length && questions.length === 0) {
                 const qs = await fetchQuestionsByIds(session.question_ids_json)
                 setQuestions(qs)
             }
             
             // Check if I already answered this index (in case of reconnect)
             const ansList = await getAnswersForCurrentIndex(session.id, currentIndex)
             setAnswers(ansList)
             const mine = ansList.find(a => a.user_id === user.id)
             if (mine) setMyAnswer(mine.selected_alternative)
             else setMyAnswer(null)
             
             setLoading(false)
        }
        load()
    }, [currentIndex, session.question_ids_json])

    // Re-check answers when sync ping arrives
    useEffect(() => {
        if (!engine) return
        engine.onSessionUpdated = async () => {
            const ansList = await getAnswersForCurrentIndex(session.id, currentIndex)
            setAnswers(ansList)
        }
    }, [engine, currentIndex])

    const currentQuestion = questions[currentIndex]
    
    // Derived state
    const iHaveAnswered = myAnswer !== null
    const partnerId = session.host_user_id === user.id ? session.guest_user_id : session.host_user_id
    const partnerAnswered = answers.some(a => a.user_id === partnerId)
    const bothAnswered = iHaveAnswered && partnerAnswered

    const handleAnswerClick = async (altKey: string) => {
        if (iHaveAnswered || !currentQuestion) return
        setSubmitting(true)
        setMyAnswer(altKey) // optimistic
        
        const isCorrect = altKey === currentQuestion.resposta_correta
        try {
            await submitDuoAnswer(session.id, currentQuestion.id, currentIndex, user.id, altKey, isCorrect)
            // Trigger manual update to ensure DB hook broadcasts it or just update directly
            engine?.triggerSyncPing()
        } catch(e) {
            toast.error("Falha ao computar resposta.")
            setMyAnswer(null) // rollback
        } finally {
            setSubmitting(false)
        }
    }

    const handleNext = async () => {
        if (!bothAnswered || submitting) return
        setSubmitting(true)
        if (currentIndex < session.total_questions - 1) {
            await moveToNextQuestion(session.id, currentIndex + 1)
        } else {
            await finalizeSession(session.id)
        }
        setSubmitting(false)
    }

    if (loading) return <div className="p-12 text-center text-white"><Loader2 className="w-10 h-10 animate-spin mx-auto"/> Montando ringue...</div>
    if (!currentQuestion) return <div className="p-12 text-center text-red-500 font-bold">Questão indisponível!</div>

    return (
        <div className="max-w-4xl mx-auto py-8 text-white relative">
            
            {/* Status Header */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 px-6 py-4 rounded-2xl mb-6">
                <span className="font-black text-sm uppercase tracking-widest text-[#f59e0b]">
                    Questão {currentIndex + 1} <span className="text-slate-500">/ {session.total_questions}</span>
                </span>
                
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Você</span>
                        {iHaveAnswered ? <CheckCircle2 className="w-5 h-5 text-emerald-500"/> : <Loader2 className="w-5 h-5 text-amber-500 animate-spin"/>}
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Parceiro</span>
                        {partnerAnswered ? <CheckCircle2 className="w-5 h-5 text-emerald-500"/> : <Loader2 className="w-5 h-5 text-amber-500 animate-spin"/>}
                    </div>
                </div>
            </div>

            {/* Question Body */}
            <div className="bg-[#1A1033] border border-white/5 p-8 rounded-3xl shadow-xl mb-6">
                <p className="text-lg leading-relaxed mb-8">{currentQuestion.enunciado}</p>

                <div className="space-y-3">
                    {Object.entries(currentQuestion.alternativas || {}).map(([key, text]: any) => {
                        const isSelected = myAnswer === key
                        const isCorrectAnswer = bothAnswered && key === currentQuestion.resposta_correta
                        const isWrongSelection = bothAnswered && isSelected && !isCorrectAnswer
                        
                        let bgStyle = 'bg-white/5 hover:bg-white/10 border-white/5'
                        if (isSelected && !bothAnswered) bgStyle = 'bg-blue-500/20 border-blue-500 text-blue-200'
                        if (isCorrectAnswer) bgStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                        if (isWrongSelection) bgStyle = 'bg-red-500/20 border-red-500 text-red-200'
                        
                        return (
                            <button
                                key={key}
                                onClick={() => handleAnswerClick(key)}
                                disabled={iHaveAnswered || submitting}
                                className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 ${bgStyle}`}
                            >
                                <span className="font-black mt-0.5 opacity-50">{key.toUpperCase()}</span>
                                <span className="flex-1 font-medium">{text}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Footer Control */}
            {bothAnswered && (
                 <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white/10 border border-emerald-500/30 p-6 rounded-3xl flex justify-between items-center">
                     <div className="font-bold text-emerald-400">Os dois responderam!</div>
                     {isHost ? (
                         <button onClick={handleNext} disabled={submitting} className="px-8 py-3 bg-emerald-500 text-white font-black rounded-xl">
                            {submitting ? <Loader2 className="animate-spin" /> : "Avançar"}
                         </button>
                     ) : (
                         <p className="font-bold text-slate-400 italic">Aguardando Host avançar...</p>
                     )}
                 </motion.div>
            )}

            {/* Chat Float Placeholder */}
            {/* O chat leve será um componente suspenso, não polui a questão */}
            <div className="fixed bottom-6 left-6 opacity-30 hover:opacity-100 transition-opacity bg-black/60 backdrop-blur border border-white/10 p-3 rounded-2xl cursor-pointer">
                 <MessageSquare className="w-6 h-6 text-white"/>
            </div>

        </div>
    )
}

// ==========================================
// RESULTS VIEW
// ==========================================

function DuoResults({ session, engine }: { session: DuoSession, engine: DuoRealtimeEngine | null }) {
    return (
        <div className="max-w-xl mx-auto py-12 text-center text-white">
            <h2 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" /> Fim de Jogo!
            </h2>
            <p className="text-slate-400 mb-8">Todos os rounds finalizados. Eis os resultados do combate.</p>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-8 space-y-4 shadow-xl">
                <div className="flex justify-between items-center py-4 border-b border-white/10 text-lg">
                    <span className="font-bold text-slate-400">Total Enfrentado</span>
                    <span className="font-black text-2xl">{session.total_questions}</span>
                </div>
            </div>
            
            <button onClick={() => window.location.reload()} className="w-full py-4 bg-white/10 hover:bg-white/20 font-black rounded-2xl transition-all">
                Sair do Modo Dupla
            </button>
        </div>
    )
}

// ==========================================
// MAIN MODULE
// ==========================================

export default function DuplaModule() {
    const [user, setUser] = useState<any>(null)
    const [state, setState] = useState<{
        view: DuoView
        session: DuoSession | null
        participants: DuoParticipant[]
        onlineUsers: string[]
        loading: boolean
    }>({ view: 'home', session: null, participants: [], onlineUsers: [], loading: true })

    const [engine, setEngine] = useState<DuoRealtimeEngine | null>(null)

    // INITIALIZATION
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data?.user || null)
            setState(p => ({ ...p, loading: false }))
        })
    }, [])

    const startRealtime = useCallback((s: DuoSession, usr: any) => {
        if (engine) engine.disconnect()
        const newEngine = new DuoRealtimeEngine(s.id, usr.id)
        
        newEngine.onParticipantPresence = (users) => setState(p => ({ ...p, onlineUsers: users }))
        newEngine.onSessionUpdated = async (updated) => {
            const { participants } = await fetchDuoSession(updated.id)
            setState(p => {
                let currentView = p.view
                if (updated.status === 'content_ready' || updated.status === 'in_progress') currentView = 'session_active'
                else if (updated.status === 'configuring') currentView = 'configuring'
                else if (updated.status === 'finished') currentView = 'results'
                return { ...p, session: updated, participants, view: currentView }
            })
        }

        newEngine.subscribe()
        setEngine(newEngine)
    }, [engine])

    const handleJoin = (s: DuoSession, p: DuoParticipant[]) => {
        setState(prev => ({ ...prev, view: 'waiting_room', session: s, participants: p }))
        startRealtime(s, user)
    }

    const resetState = () => {
        if (engine) engine.disconnect()
        setState({ view: 'home', session: null, participants: [], onlineUsers: [], loading: false })
    }

    if (state.loading) return (
         <div className="flex items-center justify-center min-h-[60vh]">
             <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
         </div>
    )

    return (
        <DuoErrorBoundary onReset={resetState}>
            <div className="font-['Inter'] text-slate-200 bg-[#0B0616] min-h-full p-4 rounded-3xl" style={{ minHeight: 'calc(100vh - 120px)' }}>
                {state.session && state.onlineUsers.length === 0 && !state.loading && (
                    <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center text-sm font-bold flex justify-center gap-2">
                        <WifiOff className="w-4 h-4"/> Sincronizando conexão, aguarde...
                    </div>
                )}
                <AnimatePresence mode="wait">
                    {state.view === 'home' && <motion.div key="home" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><DuoModuleHome user={user} onSessionJoined={handleJoin} /></motion.div>}
                    {state.view === 'waiting_room' && state.session && <motion.div key="waiting" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><DuoWaitingRoom user={user} session={state.session} participants={state.participants} onlineUsers={state.onlineUsers} /></motion.div>}
                    {state.view === 'configuring' && state.session && <motion.div key="config" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><DuoConfiguring session={state.session} user={user} /></motion.div>}
                    {state.view === 'session_active' && state.session && <motion.div key="active" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} exit={{opacity:0}}><DuoSessionActive session={state.session} user={user} engine={engine} /></motion.div>}
                    {state.view === 'results' && state.session && <motion.div key="res" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><DuoResults session={state.session} engine={engine} /></motion.div>}
                </AnimatePresence>
            </div>
        </DuoErrorBoundary>
    )
}
