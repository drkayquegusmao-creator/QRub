"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Clock, 
    ChevronLeft, 
    ChevronRight, 
    X, 
    Flag, 
    Trash2, 
    CheckCircle2, 
    RotateCcw,
    Bookmark,
    Layers,
    Activity,
    AlertTriangle,
    BrainCircuit,
    Zap
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { QrubAudio } from '@/lib/audio-engine'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { finishSimuladoDetailed, saveActiveSession } from '@/lib/simulado-service'

interface Question {
    id: string
    text: string
    alternatives: Record<string, string>
    correct_alternative: string
    discipline: string
    subject: string
    difficulty: string
}

export default function ArenaPage() {
    const router = useRouter()
    const params = useParams()
    const packageId = params?.id as string
    
    // State
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [userAnswers, setUserAnswers] = useState<Record<string, { choice: string, uncertainty: boolean, duration: number }>>({})
    const [timeLeft, setTimeLeft] = useState(7200) // 2h default
    const [isFinished, setIsFinished] = useState(false)
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("Carregando Arena...")
    const [isCebraspe, setIsCebraspe] = useState(false)

    // Load Data
    useEffect(() => {
        async function loadArena() {
            if (!packageId) return
            setLoading(true)
            
            // Check for resumed session
            const { data: activeSession } = await supabase
                .from('concurso_user_simulado_sessions')
                .select('*')
                .eq('id', `arena-${packageId}`)
                .single()

            if (packageId.startsWith('blind-spot')) {
                // Handling Blind Spot (IA generated)
                const fifteenDaysAgo = new Date()
                fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15)
                
                const { data: { user } } = await supabase.auth.getUser()
                const { data: errors } = await supabase
                    .from('concurso_user_respostas')
                    .select('question_id')
                    .eq('user_id', user?.id)
                    .eq('is_correct', false)
                    .gte('timestamp', fifteenDaysAgo.toISOString())
                    .limit(20)

                if (errors && errors.length > 0) {
                    const ids = errors.map(e => e.question_id)
                    const { data: qs } = await supabase
                        .from('concurso_questao_base')
                        .select('*')
                        .in('id', ids)
                    
                    setQuestions(qs || [])
                    setTitle("Simulado: Pontos Cegos")
                    setTimeLeft(activeSession?.time_left_seconds || Math.round((qs?.length || 10) * 120))
                }
            } else {
                // Regular Package
                const { data: pkg } = await supabase
                    .from('concurso_pacotes')
                    .select('title, requested_count')
                    .eq('id', packageId)
                    .single()

                if (pkg) {
                    setTitle(pkg.title)
                    setIsCebraspe(pkg.title.toUpperCase().includes('CEBRASPE'))
                    setTimeLeft(activeSession?.time_left_seconds || Math.round((pkg.requested_count || 50) * 120))
                }

                const { data: qp } = await supabase
                    .from('concurso_pacote_questoes')
                    .select('question_id')
                    .eq('package_id', packageId)
                    .order('order_index')

                if (qp && qp.length > 0) {
                    const ids = qp.map(r => r.question_id)
                    const { data: qs } = await supabase
                        .from('concurso_questao_base')
                        .select('*')
                        .in('id', ids)

                    const orderedQs = ids.map(id => qs?.find(q => q.id === id)).filter(Boolean) as Question[]
                    setQuestions(orderedQs)
                }

                if (activeSession) {
                    setUserAnswers(activeSession.answers)
                    setCurrentIndex(activeSession.current_index)
                }
            }
            setLoading(false)
            QrubAudio.play('swoosh')
        }
        loadArena()
    }, [packageId])

    // Global Timer
    useEffect(() => {
        if (isFinished || loading) return
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer)
                    handleFinish()
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [isFinished, loading])

    // Auto-save Persistence
    useEffect(() => {
        if (isFinished || loading || questions.length === 0) return
        const autoSave = setInterval(() => {
            saveActiveSession(`arena-${packageId}`, {
                packageId,
                tipo: 'completo',
                currentIndex,
                answers: userAnswers,
                questionIds: questions.map(q => q.id),
                timeLeft
            })
        }, 30000) // every 30s
        return () => clearInterval(autoSave)
    }, [currentIndex, userAnswers, timeLeft, questions, isFinished, loading, packageId])

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const handleSelectAnswer = (choice: string) => {
        if (isFinished) return
        setUserAnswers(prev => ({
            ...prev,
            [questions[currentIndex].id]: {
                ...prev[questions[currentIndex].id],
                choice: prev[questions[currentIndex].id]?.choice === choice ? '' : choice, // Toggle to blank if same
                duration: (prev[questions[currentIndex].id]?.duration || 0)
            }
        }))
        QrubAudio.play('click')
    }

    const toggleUncertainty = () => {
        const qId = questions[currentIndex].id
        setUserAnswers(prev => ({
            ...prev,
            [qId]: {
                ...prev[qId],
                choice: prev[qId]?.choice || '',
                uncertainty: !prev[qId]?.uncertainty
            }
        }))
        QrubAudio.play('pulse')
    }

    const handleFinish = async () => {
        if (isFinished) return
        setIsFinished(true)
        
        await finishSimuladoDetailed(`arena-${packageId}`, {
            questions,
            answers: userAnswers as any,
            metadata: { 
                packageId: packageId, 
                title, 
                tipo: packageId.startsWith('blind-spot') ? 'inteligente' : 'completo' 
            }
        })

        router.push('/concursos/simulados?view=results')
    }

    if (loading) return (
        <div className="fixed inset-0 bg-[#0A0518] flex items-center justify-center z-50">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full"
            />
        </div>
    )

    const currentQ = questions[currentIndex]
    const currentAns = userAnswers[currentQ?.id]

    return (
        <div className="fixed inset-0 bg-[#0A0518] text-white z-[100] flex flex-col font-sans overflow-hidden">
            {/* Minimal Header */}
            <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-black/40 backdrop-blur-xl">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => router.back()}
                        className="p-3 hover:bg-white/5 rounded-2xl transition-all"
                    >
                        <X className="w-5 h-5 text-white/40" />
                    </button>
                    <div className="h-8 w-px bg-white/10" />
                    <div>
                        <h2 className="text-sm font-black italic uppercase tracking-tighter text-indigo-400">{title}</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{questions.length} ITENS •</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 animate-pulse flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 rounded-md">
                                <Activity className="w-3 h-3" /> EM EXECUÇÃO
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8 bg-black/60 px-8 py-3 rounded-full border border-white/5">
                    <div className="flex flex-col items-center">
                        <span className="text-[8px] font-black uppercase text-white/30 tracking-widest leading-none mb-1">Carga Horária</span>
                        <div className="flex items-center gap-2 font-black italic text-xl tracking-tighter text-indigo-400">
                            <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                     <button 
                        onClick={() => {
                            if (window.confirm("Deseja realmente finalizar o simulado agora?")) {
                                handleFinish()
                            }
                        }}
                        className="px-8 py-3 bg-white text-[#0A0518] font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl shadow-white/5 hover:scale-105 transition-all active:scale-95"
                    >
                        FINALIZAR PROVA
                    </button>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden">
                {/* Lateral Grid Navigator */}
                <aside className="w-80 border-r border-white/5 bg-black/20 overflow-y-auto p-8 custom-scrollbar">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> MAPA DA PROVA
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                        {questions.map((q, idx) => {
                            const ans = userAnswers[q.id]
                            const isCurrent = idx === currentIndex
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={cn(
                                        "aspect-square rounded-xl flex items-center justify-center text-[10px] font-black transition-all border-2 relative",
                                        isCurrent 
                                            ? "bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg shadow-indigo-600/30" 
                                            : ans?.choice 
                                                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" 
                                                : "bg-white/5 border-transparent text-white/30 hover:border-white/10"
                                    )}
                                >
                                    {ans?.uncertainty ? <Bookmark className="w-3 h-3 absolute fill-rose-500 text-rose-500 -top-1 -right-1" /> : null}
                                    {idx + 1}
                                </button>
                            )
                        })}
                    </div>
                </aside>

                {/* Question Area */}
                <section className="flex-1 overflow-y-auto p-12 md:px-24 md:py-16 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto space-y-12"
                        >
                            {/* Question Header */}
                            <div className="space-y-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/40">
                                    {currentQ.discipline} • {currentQ.subject}
                                </span>
                                <h1 className="text-2xl md:text-3xl font-bold leading-relaxed tracking-tight text-white/90">
                                    {currentQ.text}
                                </h1>
                            </div>

                            {/* Alternatives */}
                            <div className={cn(
                                "grid gap-4",
                                isCebraspe ? "grid-cols-2" : "grid-cols-1"
                            )}>
                                {Object.entries(currentQ.alternatives).map(([key, value]) => {
                                    const isSelected = currentAns?.choice === key
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => handleSelectAnswer(key)}
                                            className={cn(
                                                "w-full p-6 bg-white/5 border-2 rounded-3xl text-left transition-all flex items-start gap-4 group",
                                                isSelected 
                                                    ? "border-indigo-600 bg-indigo-600/5 shadow-2xl shadow-indigo-600/10" 
                                                    : "border-transparent hover:border-white/10 hover:bg-white/[0.07]"
                                            )}
                                        >
                                            {!isCebraspe && (
                                                <div className={cn(
                                                    "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-all shrink-0",
                                                    isSelected ? "bg-indigo-600 text-white" : "bg-white/10 text-white/40 group-hover:text-white"
                                                )}>
                                                    {key}
                                                </div>
                                            )}
                                            {isCebraspe && (
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black transition-all shrink-0",
                                                    isSelected 
                                                        ? (key === 'C' ? "bg-emerald-600 text-white" : "bg-rose-600 text-white")
                                                        : "bg-white/10 text-white/40 group-hover:text-white"
                                                )}>
                                                    {key === 'C' ? 'CERTO' : 'ERRADO'}
                                                </div>
                                            )}
                                            {!isCebraspe && (
                                                <p className={cn(
                                                    "text-lg leading-relaxed",
                                                    isSelected ? "text-white font-medium" : "text-white/60 group-hover:text-white/90"
                                                )}>{value}</p>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Question Footer Tools */}
                            <div className="flex items-center justify-between pt-12 border-t border-white/5 mt-20">
                                <button 
                                    onClick={toggleUncertainty}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                        currentAns?.uncertainty 
                                            ? "bg-rose-600/20 text-rose-500 border border-rose-600/20" 
                                            : "bg-white/5 text-white/40 hover:text-white border border-transparent"
                                    )}
                                >
                                    <Bookmark className={cn("w-4 h-4", currentAns?.uncertainty && "fill-current")} />
                                    MARCAR DÚVIDA
                                </button>

                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                                        disabled={currentIndex === 0}
                                        className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all disabled:opacity-20"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button 
                                        onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                        disabled={currentIndex === questions.length - 1}
                                        className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all disabled:opacity-20"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </section>
            </main>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    )
}
