"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Clock, Target, CheckCircle2, XCircle, Info, Maximize2, Minimize2, Sparkles, BrainCircuit, Crown, ArrowLeft, ArrowRight, Flag, ShieldCheck } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuestions } from '@/store/use-questions'
import { useAuth, DAILY_QUESTION_LIMIT_FREE } from '@/store/use-auth'
import { useQuiz } from '@/store/use-quiz'
import { useAnsweredQuestions } from '@/store/use-answered-questions'
import { useSRS } from '@/store/use-srs'
import { RegistrationModal } from '@/components/registration-modal'
import { PaywallModal } from '@/components/paywall-modal'
import { filterQuestions } from '@/lib/data-mock'
import { ReportModal } from '@/components/report-modal'
import { AlertTriangle } from 'lucide-react'
import { QuizSummaryModal } from '@/components/quiz-summary-modal'


export default function QuizPage() {
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode') || 'TREINO'

    // Ler filtros dos query params
    const courseId = searchParams.get('courseId') || undefined
    const specialtyId = searchParams.get('specialtyId') || undefined
    const subspecialtyId = searchParams.get('subspecialtyId') || undefined
    const subjectId = searchParams.get('subjectId') || undefined
    const maxQuestions = parseInt(searchParams.get('count') || '20') // Quantidade selecionada

    const router = useRouter()
    const { user, visitorCount, incrementVisitorCount, dailyQuestionCount, incrementDailyCount, visitorId } = useAuth()
    const { add_response } = useQuiz()
    const { process_answer } = useSRS()
    const { questions: allQuestions, loadQuestions, loading: questionsLoading, generateQuestions } = useQuestions()
    const { markAsAnswered, hasAnswered, getAnsweredCount, resetAnswered } = useAnsweredQuestions()

    const [currentIdx, setCurrentIdx] = useState(0)
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
    const [struckOutIds, setStruckOutIds] = useState<string[]>([])
    const [isAnswered, setIsAnswered] = useState(false)
    const [hasConfirmed, setHasConfirmed] = useState(false) // Novo: controlar se confirmou a resposta
    const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { correct: boolean, selectedId: string }>>({})
    const [timeLeft, setTimeLeft] = useState(600)
    const [isFocusMode, setIsFocusMode] = useState(false)
    const [showRegModal, setShowRegModal] = useState(false)
    const [showPaywall, setShowPaywall] = useState(false)
    const [aiExplanation, setAiExplanation] = useState<string | null>(null)
    const [isAiLoading, setIsAiLoading] = useState(false)
    const [isZoomOpen, setIsZoomOpen] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)
    const [showSummaryModal, setShowSummaryModal] = useState(false)




    // Load questions from IndexedDB on mount
    useEffect(() => {
        loadQuestions({
            course_id: courseId,
            specialty_id: specialtyId,
            subspecialty_id: subspecialtyId,
            subject_id: subjectId
        })
    }, [courseId, specialtyId, subspecialtyId, subjectId])


    // Filtrar questões baseado nos parâmetros selecionados
    const filteredQuestions = useMemo(() => {
        const filtered = filterQuestions(allQuestions, {
            course_id: courseId,
            specialty_id: specialtyId,
            subspecialty_id: subspecialtyId,
            subject_id: subjectId
        })

        // Limitar à quantidade selecionada
        return filtered.slice(0, maxQuestions)
    }, [allQuestions, courseId, specialtyId, subspecialtyId, subjectId, maxQuestions])

    // Anti-repetition logic: show unanswered questions first, then cycle
    const availableQuestions = useMemo(() => {
        const userId = user?.id || visitorId

        const unanswered = filteredQuestions.filter(q => !hasAnswered(userId, q.id))

        // If all questions answered, reset and start over
        if (unanswered.length === 0 && filteredQuestions.length > 0) {
            resetAnswered(userId)
            return filteredQuestions
        }

        return unanswered.length > 0 ? unanswered : filteredQuestions
    }, [filteredQuestions, user, visitorId, hasAnswered, resetAnswered])

    const handleFinish = () => {
        setShowSummaryModal(true)
    }

    const quizStats = useMemo(() => {
        const answers = Object.values(answeredQuestions)
        const total = availableQuestions.length
        const correct = answers.filter(a => a.correct).length
        const incorrect = answers.length - correct
        const percentage = answers.length > 0 ? (correct / answers.length) * 100 : 0

        return { total, correct, incorrect, percentage }
    }, [answeredQuestions, availableQuestions.length])

    // Timer for SIMULADO mode
    useEffect(() => {
        if (mode === 'SIMULADO' && availableQuestions.length > 0) {
            // Set time based on question count (e.g., 90 seconds per question)
            const totalSeconds = availableQuestions.length * 90
            setTimeLeft(totalSeconds)

            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        handleFinish()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [mode, availableQuestions.length])

    // Auto-generate questions if none exist for the selected filter
    useEffect(() => {
        const generateIfNeeded = async () => {
            if (!questionsLoading && allQuestions.length > 0 && filteredQuestions.length === 0 && (specialtyId || subjectId)) {
                if (isGenerating) return

                console.log("⚠️ No questions found for filter. Auto-generating...")
                setIsGenerating(true)
                try {
                    await generateQuestions({
                        specialty_id: specialtyId || 'geral',
                        subspecialty_id: subspecialtyId,
                        subject_id: subjectId,
                        count: maxQuestions,
                        difficulty: 'Médio'
                    })
                } finally {
                    setIsGenerating(false)
                }
            }
        }
        generateIfNeeded()
    }, [questionsLoading, allQuestions.length, filteredQuestions.length, specialtyId, subjectId])

    const question = availableQuestions[currentIdx]
    const isInsano = user?.plan_level === 'INSANO'
    const isFree = user?.plan_level === 'FREE'

    if (questionsLoading && allQuestions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <p className="text-sm font-black uppercase tracking-widest text-primary">Carregando Questões...</p>
                </div>
            </div>
        )
    }

    if (!question) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <div className="w-full max-w-md bg-card border border-border rounded-[40px] p-10 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto">
                        <Target className="w-10 h-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter">Ops! Sem questões.</h3>
                        <p className="text-muted-foreground font-medium text-sm">Não encontramos questões disponíveis para o tópico selecionado no momento.</p>
                    </div>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="w-full royal-gradient text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Voltar ao Dashboard
                    </button>
                    {user?.role === 'MASTER' && (
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                            Dica: Use o Painel Admin para gerar questões de demonstração.
                        </p>
                    )}
                </div>
            </div>
        )
    }




    const handleSelect = (optionId: string) => {
        if (hasConfirmed) return // Não pode mudar após confirmar
        if (struckOutIds.includes(optionId)) return

        setSelectedOptionId(optionId)
    }

    const handleConfirm = () => {
        if (!selectedOptionId) return
        if (hasConfirmed) return

        // Check visitor limit (not logged in)
        if (!user && visitorCount >= DAILY_QUESTION_LIMIT_FREE) {
            setShowRegModal(true)
            return
        }

        // Check daily limit for Free tier
        if (isFree && dailyQuestionCount >= DAILY_QUESTION_LIMIT_FREE) {
            setShowPaywall(true)
            return
        }

        setHasConfirmed(true)

        if (mode === 'TREINO') {
            const isCorrect = selectedOptionId === question.correct_option_id
            setIsAnswered(true)

            // Registrar a resposta para o quadradinho visual
            setAnsweredQuestions(prev => ({
                ...prev,
                [currentIdx]: { correct: isCorrect, selectedId: selectedOptionId }
            }))

            // Mark question as answered
            const userId = user?.id || visitorId
            markAsAnswered(userId, question.id)

            add_response({
                id: Math.random().toString(36).substr(2, 9),
                user_id: userId,
                question_id: question.id,
                specialty_id: question.specialty_id,
                is_correct: isCorrect,
                timestamp: new Date().toISOString()
            })

            // SRS Update (Only for INSANO)
            const responseObj = {
                id: Math.random().toString(36).substr(2, 9),
                user_id: userId,
                question_id: question.id,
                specialty_id: question.specialty_id,
                is_correct: isCorrect,
                timestamp: new Date().toISOString()
            }
            process_answer(user?.id || null, responseObj, question.subject_id)

            if (!user) {
                incrementVisitorCount()
            } else if (isFree) {
                incrementDailyCount()
            }
        }
    }

    const toggleStrikeOut = (id: string, e: React.MouseEvent) => {
        e.preventDefault()
        if (isAnswered) return
        setStruckOutIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }

    const handleAiExplain = () => {
        if (!isInsano) {
            setShowPaywall(true)
            return
        }
        setIsAiLoading(true)
        setTimeout(() => {
            setAiExplanation(`Dr. QRub: Você escolheu a alternativa ${selectedOptionId?.toUpperCase()}. No entanto, para este caso de ${question.subject_id}, a conduta correta segue os protocolos do SUS de 2024, que priorizam a alternativa ${question.correct_option_id.toUpperCase()} devido ao fator de risco apresentado no enunciado.`)
            setIsAiLoading(false)
        }, 1500)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className={`min-h-[100vh] flex flex-col transition-all duration-500 ${isFocusMode ? 'bg-[#0a0a0a] text-white p-8 md:p-20' : 'bg-background'}`}>
            <RegistrationModal isOpen={showRegModal} onClose={() => setShowRegModal(false)} />
            <PaywallModal
                isOpen={showPaywall}
                onClose={() => setShowPaywall(false)}
                reason={isFree ? 'limit' : 'feature'}
                requiredPlan={isFree ? 'PREMIUM' : 'INSANO'}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-4">
                    {mode === 'SIMULADO' && (
                        <div className="bg-rose-500/10 text-rose-500 px-4 py-2 rounded-xl border border-rose-500/20 font-black flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
                        </div>
                    )}
                    <div className={`${isFocusMode ? 'bg-white/10' : 'bg-primary/10'} px-4 py-2 rounded-xl border border-border font-bold uppercase text-xs tracking-widest`}>
                        Questão {currentIdx + 1}/{availableQuestions.length}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => setIsFocusMode(!isFocusMode)} className="p-2 rounded-xl text-muted-foreground mr-2">
                        {isFocusMode ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                    </button>

                    <button onClick={() => router.back()} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black text-xs uppercase tracking-widest ${isFocusMode ? 'hover:bg-white/10 text-white/60' : 'hover:bg-muted text-muted-foreground border border-border'}`}>
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                    </button>
                </div>
            </div>

            {/* Question Body */}
            <div className={`flex-1 space-y-8 max-w-5xl mx-auto w-full ${isFocusMode ? 'animate-in fade-in zoom-in duration-500' : ''}`}>
                <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                <Target className="w-4 h-4 text-primary" />
                                {question.specialty_id} • {question.subject_id}
                            </div>

                            {question.guideline_id && (
                                <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                    <ShieldCheck className="w-3 h-3" />
                                    Baseado em: {question.guideline_version || 'Diretriz Oficial'}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setShowReportModal(true)}
                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 border border-rose-500/20"
                        >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Reportar Erro
                        </button>
                    </div>

                    {question.image_url && (
                        <div className="relative group cursor-zoom-in" onClick={() => setIsZoomOpen(true)}>
                            <img src={question.image_url} alt="Clinical Image" className="rounded-[40px] w-full max-h-[300px] object-cover border border-border soft-shadow transition-all group-hover:brightness-110" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-[40px]">
                                <Maximize2 className="text-white w-10 h-10" />
                            </div>
                        </div>
                    )}

                    {isZoomOpen && (
                        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setIsZoomOpen(false)}>
                            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={question.image_url} className="max-w-full max-h-full object-contain rounded-2xl" />
                        </div>
                    )}

                    <h2 className={`text-2xl md:text-3xl font-bold leading-relaxed ${isFocusMode ? 'text-white' : 'text-foreground'}`}>
                        {question.enunciado}
                    </h2>
                </div>

                <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 opacity-60">Botão direito para riscar alternativas</p>
                    {question.options.map((opt) => {
                        const isCorrect = opt.id === question.correct_option_id
                        const isSelected = opt.id === selectedOptionId
                        const isStruck = struckOutIds.includes(opt.id)
                        const showFeedback = isAnswered && mode === 'TREINO'

                        let statusClasses = isFocusMode ? 'bg-white/5 border-white/10' : 'bg-card border-border hover:border-primary/50'
                        if (showFeedback) {
                            if (isCorrect) statusClasses = "bg-emerald-500/10 border-emerald-500 text-emerald-500 ring-2 ring-emerald-500/20"
                            else if (isSelected) statusClasses = "bg-rose-500/10 border-rose-500 text-rose-500"
                        } else if (isSelected) statusClasses = isFocusMode ? "bg-primary text-white border-primary" : "bg-primary/10 border-primary text-primary"
                        if (isStruck) statusClasses += " opacity-30 grayscale scale-[0.98]"

                        return (
                            <button
                                key={opt.id}
                                onClick={() => handleSelect(opt.id)}
                                onContextMenu={(e) => toggleStrikeOut(opt.id, e)}
                                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 font-semibold group relative overflow-hidden ${statusClasses}`}
                            >
                                {isStruck && <div className="absolute inset-0 bg-transparent flex items-center px-8 pointer-events-none"><div className="w-full h-[2px] bg-muted-foreground/50 rounded-full" /></div>}
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 ${isSelected ? 'bg-primary text-white' : isFocusMode ? 'bg-white/10 text-white' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                                    {opt.id.toUpperCase()}
                                </span>
                                <span className="flex-1">{opt.text}</span>
                            </button>
                        )
                    })}
                </div>

                {isAnswered && mode === 'TREINO' && (
                    <div className="mt-8 space-y-4">
                        <div className="bg-primary/5 border border-primary/20 rounded-[32px] p-6 md:p-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
                                    <Info className="w-4 h-4" /> Explicação do Especialista
                                </div>
                                {!aiExplanation && (
                                    <button onClick={handleAiExplain} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:scale-105 transition-all shadow-lg shadow-primary/20">
                                        <Sparkles className="w-3 h-3" /> Análise do Dr. QRub
                                    </button>
                                )}
                            </div>
                            <p className="text-muted-foreground leading-relaxed italic text-lg">{question.explanation}</p>
                            {question.references && <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Referência: {question.references}</p>}
                        </div>

                        <AnimatePresence>
                            {(isAiLoading || aiExplanation) && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-orange-500/5 border border-orange-500/20 rounded-[32px] p-6 md:p-10 space-y-6">
                                    <div className="flex items-center gap-2 text-orange-500 font-black uppercase text-xs tracking-widest">
                                        <BrainCircuit className="w-4 h-4" /> Dr. QRub Mentor
                                    </div>
                                    {isAiLoading ? (
                                        <div className="flex items-center gap-3"><div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" /> <span className="font-bold">O Dr. QRub está avaliando sua conduta...</span></div>
                                    ) : (
                                        <div className="space-y-6">
                                            <p className="text-muted-foreground leading-relaxed text-lg">{aiExplanation}</p>
                                            {question.revision_link && (
                                                <div className="pt-4 border-t border-orange-500/10">
                                                    <a href={question.revision_link} target="_blank" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all">
                                                        Revisão Rápida: {question.subject_id} <ChevronLeft className="w-4 h-4 rotate-180" />
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Navegação Visual com Quadradinhos*/}
            <div className="mt-8 p-6 bg-card border border-border rounded-2xl soft-shadow max-w-5xl mx-auto">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Progresso do Quiz</p>
                <div className="flex flex-wrap gap-2">
                    {availableQuestions.map((_, idx) => {
                        const isCurrentQuestion = idx === currentIdx
                        const questionState = answeredQuestions[idx]
                        const isCorrect = questionState?.correct
                        const isAnswered = questionState !== undefined

                        let bgColor = 'bg-muted text-muted-foreground'
                        if (isAnswered) {
                            bgColor = isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                        } else if (isCurrentQuestion) {
                            bgColor = 'bg-primary text-white ring-2 ring-primary/50'
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCurrentIdx(idx)
                                    setSelectedOptionId(null)
                                    setHasConfirmed(false)
                                    setIsAnswered(false)
                                    setStruckOutIds([])
                                    setAiExplanation(null)
                                }}
                                className={`w-12 h-12 rounded-xl font-black text-sm transition-all hover:scale-110 ${bgColor}`}
                            >
                                {idx + 1}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="mt-12 py-8 border-t border-border flex items-center justify-between gap-4 max-w-5xl mx-auto w-full pb-32 md:pb-8">
                <button onClick={() => router.back()} className={`px-8 py-3 rounded-xl border font-bold uppercase text-xs tracking-widest text-center transition-all ${isFocusMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-border text-muted-foreground hover:bg-muted'}`}>Sair da Sessão</button>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] flex items-center gap-4">
                {/* Botão de Finalizar Antecipadamente */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleFinish}
                    className="bg-background/80 backdrop-blur-md border border-border text-muted-foreground hover:text-destructive hover:border-destructive/50 px-6 py-4 md:px-8 md:py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg flex items-center gap-2"
                >
                    <Flag className="w-4 h-4" /> <span className="hidden md:inline">Finalizar Simulado</span>
                </motion.button>

                <AnimatePresence mode="wait">
                    {!hasConfirmed && selectedOptionId && (
                        <motion.button
                            key="confirm"
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            onClick={handleConfirm}
                            className="royal-gradient text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/30 flex items-center gap-3"
                        >
                            Confirmar Resposta <CheckCircle2 className="w-5 h-5" />
                        </motion.button>
                    )}

                    {hasConfirmed && (
                        <motion.button
                            key="next"
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            onClick={() => {
                                if (currentIdx < availableQuestions.length - 1) {
                                    setCurrentIdx(currentIdx + 1);
                                    setIsAnswered(false);
                                    setHasConfirmed(false);
                                    setSelectedOptionId(null);
                                    setStruckOutIds([]);
                                    setAiExplanation(null)
                                } else {
                                    handleFinish()
                                }
                            }}
                            className="royal-gradient text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/30 flex items-center gap-3"
                        >
                            {currentIdx < availableQuestions.length - 1 ? 'Próxima Questão' : 'Concluir Simulado'} <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
            <RegistrationModal isOpen={showRegModal} onClose={() => setShowRegModal(false)} />
            <PaywallModal
                isOpen={showPaywall}
                onClose={() => setShowPaywall(false)}
                reason="feature"
                requiredPlan="INSANO"
            />
            <ReportModal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                questionId={question.id}
            />
            <QuizSummaryModal
                isOpen={showSummaryModal}
                onClose={() => setShowSummaryModal(false)}
                stats={quizStats}
            />
        </div>
    )
}
