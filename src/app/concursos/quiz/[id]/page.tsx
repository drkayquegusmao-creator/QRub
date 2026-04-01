"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { QrubAudio } from '@/lib/audio-engine'
import { 
    ChevronLeft, Clock, Target, CheckCircle2, XCircle, Info, 
    Maximize2, Minimize2, Sparkles, BrainCircuit, Crown, 
    ArrowLeft, ArrowRight, Flag, ShieldCheck, History as HistoryIcon, 
    Activity, Microscope, Loader2, AlertTriangle, MessageSquare,
    Trophy, GraduationCap, Zap, Brain, Star, ThumbsDown, ThumbsUp
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useConcursoQuestions } from '@/store/concursos/use-questions'
import { useConcursoQuiz } from '@/store/concursos/use-quiz'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

const uuidv4_local = () => crypto.randomUUID()

type SRSFeedback = 'ERREI' | 'DIFICIL' | 'FACIL' | 'DOMINEI'

const SRS_INTERVALS: Record<SRSFeedback, number> = {
    ERREI: 1,
    DIFICIL: 3,
    FACIL: 7,
    DOMINEI: 21,
}

async function upsertSRS(userId: string, questionId: string, disciplinaId: string, feedback: SRSFeedback, isCorrect: boolean) {
    const interval = SRS_INTERVALS[feedback]
    const nextReview = new Date(Date.now() + interval * 86400000).toISOString()
    const memoryStrength = feedback === 'ERREI' ? 0.1 : feedback === 'DIFICIL' ? 0.4 : feedback === 'FACIL' ? 0.7 : 0.95

    try {
        const { data: existing } = await supabase
            .from('concurso_user_srs')
            .select('id, repetitions, ease_factor')
            .eq('user_id', userId)
            .eq('question_id', questionId)
            .maybeSingle()

        if (existing) {
            const newReps = isCorrect ? (existing.repetitions || 0) + 1 : 0
            const easeDelta = feedback === 'ERREI' ? -0.2 : feedback === 'DIFICIL' ? -0.05 : feedback === 'FACIL' ? 0.05 : 0.1
            const newEase = Math.max(1.3, (existing.ease_factor || 2.5) + easeDelta)

            await supabase
                .from('concurso_user_srs')
                .update({
                    next_review: nextReview,
                    interval_days: interval,
                    repetitions: newReps,
                    ease_factor: newEase,
                    memory_strength: memoryStrength,
                    last_reviewed: new Date().toISOString(),
                })
                .eq('id', existing.id)
        } else {
            await supabase
                .from('concurso_user_srs')
                .insert({
                    user_id: userId,
                    question_id: questionId,
                    disciplina_id: disciplinaId,
                    next_review: nextReview,
                    interval_days: interval,
                    repetitions: isCorrect ? 1 : 0,
                    ease_factor: 2.5,
                    memory_strength: memoryStrength,
                    last_reviewed: new Date().toISOString(),
                })
        }
    } catch (err) {
        console.warn('SRS upsert error (non-fatal):', err)
    }
}

export default function ConcursoQuizPage({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode') || 'TREINO'
    const router = useRouter()
    
    const { user } = useAuth()
    const { questions, loadQuestions, loading: questionsLoading } = useConcursoQuestions()
    const { add_response } = useConcursoQuiz()
    const [currentIdx, setCurrentIdx] = useState(0)
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [hasConfirmed, setHasConfirmed] = useState(false)
    const [srsFeedbackGiven, setSrsFeedbackGiven] = useState(false)
    
    // Caderno de Erros logic
    const [errorCauseRequired, setErrorCauseRequired] = useState(false)
    const [selectedErrorCause, setSelectedErrorCause] = useState<'conhecimento' | 'desatencao' | 'interpretacao' | 'decoreba' | null>(null)
    const [savingError, setSavingError] = useState(false)
    const [showSuperacaoModal, setShowSuperacaoModal] = useState(false)
    const [resolvedErrorId, setResolvedErrorId] = useState<string | null>(null)
    const [superacaoNote, setSuperacaoNote] = useState('')
    const [isSavingSuperacao, setIsSavingSuperacao] = useState(false)
    const [isLockdown, setIsLockdown] = useState(false)

    const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { correct: boolean, selectedId: string }>>({})
    const [isFocusMode, setIsFocusMode] = useState(false)
    const [fontSize, setFontSize] = useState(20)
    const [sessionStartTime] = useState(Date.now())

    // NIVELAMENTO score tracking
    const [nivelamentoScore, setNivelamentoScore] = useState<{ total: number, weighted: number, maxWeighted: number } | null>(null)

    const isNivelamento = mode === 'NIVELAMENTO'
    const isSRS = mode === 'SRS'

    useEffect(() => {
        const load = async () => {
            if (params.id === 'expurgo' && user?.id) {
                const { data: errors } = await supabase
                    .from('concurso_user_errors')
                    .select('question_id')
                    .eq('user_id', user.id)
                    .eq('is_resolved', false)
                    .limit(10)

                if (errors && errors.length > 0) {
                    const qIds = errors.map(e => e.question_id)
                    const { data: qs } = await supabase
                        .from('concurso_questao_base')
                        .select('*, banca:concurso_bancas(*), disciplina:concurso_disciplinas(*), assunto:concurso_assuntos(*)')
                        .in('id', qIds)
                    
                    if (qs) {
                        useConcursoQuestions.getState().setQuestions(qs as any)
                    }
                }
            } else {
                const filters = {
                    area_id: searchParams.get('areaId') || undefined,
                    disciplina_id: params.id.length < 20 ? params.id : undefined,
                    packageId: params.id.length >= 20 ? params.id : undefined,
                    subdisciplina_id: searchParams.get('subdisciplinaId') || undefined,
                    assunto_id: searchParams.get('assuntoId') || undefined,
                    banca_id: searchParams.get('bancaId') || undefined,
                    pageSize: parseInt(searchParams.get('count') || '20')
                }
                loadQuestions(filters)
            }
        }
        load()
    }, [params.id, user, searchParams])

    const question = questions[currentIdx]

    if (questionsLoading && questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
                    />
                    <p className="text-sm font-black uppercase tracking-widest text-[#1A1033]">
                        {isNivelamento ? 'Preparando Teste de Nivelamento...' : 'Carregando Bateria Especializada...'}
                    </p>
                </div>
            </div>
        )
    }

    if (!question && !questionsLoading) {
        // If nivelamento is complete, show score
        if (isNivelamento && nivelamentoScore) {
            const percent = Math.round((nivelamentoScore.weighted / nivelamentoScore.maxWeighted) * 100)
            const level = percent < 40 ? 'Iniciante' : percent < 75 ? 'Intermediário' : 'Avançado'
            const levelColor = percent < 40 ? 'text-rose-500' : percent < 75 ? 'text-amber-500' : 'text-emerald-500'
            const levelBg = percent < 40 ? 'bg-rose-50 border-rose-200' : percent < 75 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'

            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                    <div className="w-full max-w-lg bg-white border-2 border-slate-100 rounded-[50px] p-12 text-center space-y-8 shadow-2xl">
                        <div className="w-24 h-24 bg-indigo-50 rounded-[35px] flex items-center justify-center mx-auto">
                            <Brain className="w-12 h-12 text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-2">Nivelamento Concluído</h3>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Score de Entrada Calculado</p>
                        </div>
                        <div className="text-6xl font-black italic text-indigo-600">{percent}%</div>
                        <div className={cn("inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 font-black uppercase text-sm tracking-widest", levelBg, levelColor)}>
                            <Star className="w-5 h-5 fill-current" />
                            {level}
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            {percent < 40 && 'O SRS iniciará com intervalos curtos e maior densidade para consolidar a base.'}
                            {percent >= 40 && percent < 75 && 'O foco será preencher lacunas com espaçamento progressivo.'}
                            {percent >= 75 && 'Assunto classificado como Consolidado — foco em manutenção de longo prazo.'}
                        </p>
                        <button onClick={() => router.push('/concursos/plano')} className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all">
                            Voltar ao Plano de Estudo
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                <div className="w-full max-w-md bg-white border-2 border-slate-100 rounded-[50px] p-12 text-center space-y-8 shadow-2xl">
                    <div className="w-24 h-24 bg-indigo-50 rounded-[35px] flex items-center justify-center mx-auto">
                        <Target className="w-12 h-12 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-4">Fim da Linha</h3>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest leading-relaxed">Não encontramos questões para os filtros selecionados ou você completou todos os itens.</p>
                    </div>
                    <button onClick={() => router.back()} className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all">
                        Tentar Configurar Novamente
                    </button>
                </div>
            </div>
        )
    }

    const handleSelect = (optionId: string) => {
        if (hasConfirmed) return
        QrubAudio.play('click')
        setSelectedOptionId(optionId)
    }

    const handleNavigate = (idx: number) => {
        setCurrentIdx(idx)
        const answered = answeredQuestions[idx]
        if (answered) {
            setSelectedOptionId(answered.selectedId)
            setIsAnswered(true)
            setHasConfirmed(true)
            setSrsFeedbackGiven(true)
        } else {
            setSelectedOptionId(null)
            setIsAnswered(false)
            setHasConfirmed(false)
            setSrsFeedbackGiven(false)
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleConfirm = () => {
        if (!selectedOptionId || hasConfirmed) return

        setHasConfirmed(true)
        const isCorrect = selectedOptionId === question.correct_option_id
        setIsAnswered(true)

        setAnsweredQuestions(prev => ({
            ...prev,
            [currentIdx]: { correct: isCorrect, selectedId: selectedOptionId }
        }))

        // Track nivelamento weighted score
        if (isNivelamento) {
            const weight = question.difficulty === 'facil' ? 1 : question.difficulty === 'media' ? 2 : 3
            setNivelamentoScore(prev => {
                const current = prev || { total: 0, weighted: 0, maxWeighted: 0 }
                return {
                    total: current.total + 1,
                    weighted: current.weighted + (isCorrect ? weight : 0),
                    maxWeighted: current.maxWeighted + weight,
                }
            })
        }

        add_response({
            id: uuidv4_local(),
            user_id: user?.id || 'visitor',
            question_id: question.id,
            disciplina_id: question.disciplina_id || 'geral',
            assunto_id: question.assunto_id,
            is_correct: isCorrect,
            timestamp: new Date().toISOString()
        })

        if (!isCorrect && user?.id) {
            setErrorCauseRequired(true)
            QrubAudio.play('error')
        }

        // If in expurgo mode, update the hit counter
        if (params.id === 'expurgo' && user?.id && question) {
            updateErrorHitOnResponse(question.id, isCorrect)
        }
    }

    const updateErrorHitOnResponse = async (questionId: string, isCorrect: boolean) => {
        const { data: err } = await supabase
            .from('concurso_user_errors')
            .select('id, consecutive_correct_hits')
            .eq('user_id', user?.id)
            .eq('question_id', questionId)
            .eq('is_resolved', false)
            .single()
        
        if (!err) return

        let newHits = isCorrect ? (err.consecutive_correct_hits || 0) + 1 : 0
        const isResolved = newHits >= 2

        await supabase
            .from('concurso_user_errors')
            .update({ 
                consecutive_correct_hits: newHits, 
                is_resolved: isResolved,
                updated_at: new Date().toISOString()
            })
            .eq('id', err.id)
            
        if (isResolved) {
            // Activating Mastery Note flow
            setResolvedErrorId(err.id)
            setShowSuperacaoModal(true)
            QrubAudio.play('success')
        }
    }

    const handleSaveSuperacao = async () => {
        if (!resolvedErrorId || !superacaoNote.trim()) return
        setIsSavingSuperacao(true)
        try {
            await supabase
                .from('concurso_user_errors')
                .update({ 
                    anotacao_superacao: superacaoNote,
                    updated_at: new Date().toISOString()
                })
                .eq('id', resolvedErrorId)
            
            setShowSuperacaoModal(false)
            setResolvedErrorId(null)
            setSuperacaoNote('')
        } catch (err) {
            console.error('Error saving superacao note:', err)
        } finally {
            setIsSavingSuperacao(false)
        }
    }

    const handleErrorClassification = async (cause: 'conhecimento' | 'desatencao' | 'interpretacao' | 'decoreba') => {
        if (!user?.id || !question) return
        setSavingError(true)
        setSelectedErrorCause(cause)
        
        try {
            await supabase.from('concurso_user_errors').insert({
                user_id: user.id,
                question_id: question.id,
                disciplina_id: question.disciplina_id,
                assunto_id: question.assunto_id,
                error_cause: cause,
                origin: isNivelamento ? 'nivelamento' : isSRS ? 'revisao' : 'treino',
                is_resolved: false
            })
            
            // Som de registro solicitado: data_entry
            QrubAudio.play('data_entry')
            
            setErrorCauseRequired(false)
        } catch (err) {
            console.error('Error saving to error notebook:', err)
        } finally {
            setSavingError(false)
        }
    }

    const handleSRSFeedback = async (feedback: SRSFeedback) => {
        setSrsFeedbackGiven(true)
        const isCorrect = selectedOptionId === question.correct_option_id
        
        if (user?.id) {
            await upsertSRS(
                user.id,
                question.id,
                question.disciplina_id || 'geral',
                feedback,
                isCorrect
            )
        }

        // Auto-advance after small delay
        setTimeout(() => {
            if (currentIdx < questions.length - 1) {
                handleNavigate(currentIdx + 1)
            } else {
                // Session complete
                if (isNivelamento) {
                    // Will show score screen
                    setCurrentIdx(currentIdx + 1)
                } else {
                    QrubAudio.play('success_final')
                    router.push('/concursos')
                }
            }
        }, 600)
    }

    function uuidv4_local() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return (
        <div className={cn(
            "min-h-screen flex flex-col px-4 pb-40 transition-all duration-700",
            isFocusMode ? 'bg-[#0a0a0a] text-white pt-16' : 'bg-slate-50/70 pt-16'
        )}>
            {/* Header Flutuante Premium */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-white/20 backdrop-blur-md border-b border-indigo-500/10 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-3 hover:bg-slate-100/50 rounded-2xl transition-all">
                            <ArrowLeft className="w-5 h-5 text-[#1A1033]" />
                        </button>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {isNivelamento ? 'Teste de Nivelamento' : isSRS ? 'Revisão SRS' : 'Progresso Atual'}
                            </span>
                            <span className="text-sm font-black italic uppercase tracking-tighter text-[#1A1033]">Bateria {currentIdx + 1}/{questions.length}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Mode Badge */}
                        {isNivelamento && (
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-2xl">
                                <Brain className="w-4 h-4 text-amber-600" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-amber-700">Nivelamento</span>
                            </div>
                        )}
                        {isSRS && (
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-100 border border-indigo-300 rounded-2xl">
                                <Sparkles className="w-4 h-4 text-indigo-600" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-700">Revisão SRS</span>
                            </div>
                        )}

                        <div className="hidden md:flex items-center gap-2 bg-white/50 border border-slate-100 p-1.5 rounded-2xl shadow-sm">
                            <button onClick={() => setFontSize(prev => Math.max(16, prev - 2))} className="w-10 h-10 flex items-center justify-center hover:bg-slate-200/50 rounded-xl transition-all">
                                <span className="text-xs font-black">A-</span>
                            </button>
                            <button onClick={() => setFontSize(prev => Math.min(32, prev + 2))} className="w-10 h-10 flex items-center justify-center hover:bg-slate-200/50 rounded-xl transition-all">
                                <span className="text-sm font-black">A+</span>
                            </button>
                        </div>
                        <button 
                            onClick={() => setIsFocusMode(!isFocusMode)} 
                            className={cn(
                                "p-3 rounded-2xl transition-all shadow-sm flex items-center gap-2 font-black uppercase text-[10px] tracking-widest",
                                isFocusMode ? "bg-indigo-600 text-white" : "bg-white text-slate-400 border border-slate-100 hover:text-indigo-600"
                            )}
                        >
                            {isFocusMode ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                            <span className="hidden md:inline">{isFocusMode ? 'Normal' : 'Foco Total'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-5xl mx-auto w-full space-y-12 mt-8">
                {/* Meta-Informações da Questão */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">
                        <GraduationCap className="w-3 h-3" />
                        {question.area_id || 'Processo Civil'}
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest">
                        <Zap className="w-3 h-3 text-orange-500" />
                        {question.difficulty === 'facil' ? 'Nível Bronze' : question.difficulty === 'media' ? 'Nível Prata' : 'Nível Ouro'}
                    </div>
                    {isNivelamento && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-300 text-amber-700 text-[10px] font-black uppercase tracking-widest">
                            <Brain className="w-3 h-3" />
                            Peso: {question.difficulty === 'facil' ? '1' : question.difficulty === 'media' ? '2' : '3'}
                        </div>
                    )}
                    {isAnswered && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                        >
                            <CheckCircle2 className="w-3 h-3" />
                            Gabarito Verificado
                        </motion.div>
                    )}
                </div>

                {/* Enunciado Centralizado/Elegante */}
                <motion.div 
                    layout
                    className="relative"
                >
                    <div className="absolute -left-12 top-0 text-8xl font-black text-slate-100 -z-10 select-none opacity-50">Q</div>
                    <h2 
                        className={cn(
                            "font-bold leading-[1.4] transition-colors duration-500",
                            isFocusMode ? "text-slate-100" : "text-[#1A1033]"
                        )} 
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        {question.enunciado}
                    </h2>
                </motion.div>

                {/* Grid de Alternativas Premium */}
                <div className="grid grid-cols-1 gap-5">
                    {question.options.map((opt, idx) => {
                        const isCorrect = opt.id === question.correct_option_id
                        const isSelected = opt.id === selectedOptionId
                        const showFeedback = isAnswered
                        const label = String.fromCharCode(65 + idx)

                        return (
                            <motion.button
                                key={opt.id}
                                whileHover={{ scale: showFeedback ? 1 : 1.01, x: 5 }}
                                whileTap={{ scale: showFeedback ? 1 : 0.99 }}
                                onClick={() => handleSelect(opt.id)}
                                disabled={showFeedback}
                                className={cn(
                                    "w-full text-left p-8 rounded-[35px] border-2 transition-all duration-300 flex items-start gap-8 group relative overflow-hidden shadow-sm",
                                    !showFeedback && isSelected ? "border-indigo-600 bg-indigo-50/30 ring-8 ring-indigo-500/5 shadow-xl" : "border-slate-100 bg-white hover:border-indigo-300 hover:bg-slate-50",
                                    showFeedback && isCorrect ? "border-emerald-500 bg-emerald-50 ring-8 ring-emerald-500/5 shadow-lg" : "",
                                    showFeedback && isSelected && !isCorrect ? "border-rose-500 bg-rose-50 ring-8 ring-rose-500/5 shadow-lg" : "",
                                    showFeedback && !isSelected && !isCorrect ? "opacity-40 scale-[0.98] grayscale-[0.5]" : "",
                                    isFocusMode && !showFeedback && isSelected ? "bg-indigo-900/40 text-white" : isFocusMode ? "bg-white/5 border-white/10 text-slate-300" : ""
                                )}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-sm shrink-0 font-black transition-all",
                                    isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white",
                                    showFeedback && isCorrect ? "bg-emerald-500 text-white" : "",
                                    showFeedback && isSelected && !isCorrect ? "bg-rose-500 text-white" : ""
                                )}>
                                    {label}
                                </div>
                                <span className={cn(
                                    "pt-3 text-[1.1rem] font-bold leading-relaxed transition-colors",
                                    isSelected && !showFeedback ? "text-indigo-700" : "text-inherit",
                                    showFeedback && isCorrect ? "text-emerald-800" : "",
                                    showFeedback && isSelected && !isCorrect ? "text-rose-800" : "",
                                    isFocusMode ? "text-white" : ""
                                )}>
                                    {opt.text}
                                </span>

                                {showFeedback && isCorrect && (
                                    <div className="ml-auto shrink-0 flex items-center gap-2">
                                        <div className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">CORRETO</div>
                                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                    </div>
                                )}
                                {showFeedback && isSelected && !isCorrect && (
                                    <div className="ml-auto shrink-0 flex items-center gap-2">
                                        <div className="px-3 py-1 bg-rose-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20">ERRADO</div>
                                        <XCircle className="w-8 h-8 text-rose-500" />
                                    </div>
                                )}
                            </motion.button>
                        )
                    })}
                </div>

                {/* ─── CADERNO DE ERROS: CLASSIFICAÇÃO OBRIGATÓRIA ─── */}
                <AnimatePresence>
                    {errorCauseRequired && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#0B0F1A]/80 backdrop-blur-xl"
                        >
                            <div className="w-full max-w-2xl bg-[#1A1033] rounded-[50px] p-12 md:p-16 border border-rose-500/30 shadow-[0_0_100px_rgba(244,63,94,0.2)] text-center space-y-12">
                                <div className="space-y-4">
                                    <div className="w-24 h-24 bg-rose-500/20 rounded-[35px] flex items-center justify-center mx-auto mb-6">
                                        <AlertTriangle className="w-12 h-12 text-rose-500 animate-pulse" />
                                    </div>
                                    <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">REPROCESSAMENTO COGNITIVO</h3>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">
                                        O QRub bloqueou seu avanço. <br/> Identifique a causa raiz do erro para salvar no seu Caderno de Erros.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'conhecimento' as const, label: 'Falta de Conhecimento', desc: 'Não conhecia a teoria ou regra', icon: Brain },
                                        { id: 'desatencao' as const, label: 'Desatenção', desc: 'Saber a matéria, erro de leitura', icon: Activity },
                                        { id: 'interpretacao' as const, label: 'Interpretação', desc: 'Dificuldade com o comando da banca', icon: MessageSquare },
                                        { id: 'decoreba' as const, label: 'Decoreba', desc: 'Esquecimento de prazo/lista/mnemônico', icon: Zap },
                                    ].map((cause) => (
                                        <button
                                            key={cause.id}
                                            disabled={savingError}
                                            onClick={() => handleErrorClassification(cause.id)}
                                            className="group p-6 rounded-3xl bg-white/5 border-2 border-white/10 text-left hover:border-rose-500 hover:bg-rose-500/10 transition-all flex items-center gap-6"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-rose-500/20 text-slate-400 group-hover:text-rose-500 transition-all">
                                                <cause.icon className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="text-sm font-black text-white uppercase tracking-tighter">{cause.label}</p>
                                                <p className="text-[10px] font-bold text-slate-500">{cause.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                {savingError && (
                                    <div className="flex items-center justify-center gap-3 text-rose-500 animate-pulse">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Registrando falha...</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ─── CADERNO DE ERROS: ANOTAÇÃO DE SUPERAÇÃO (MASTERY NOTE) ─── */}
                <AnimatePresence>
                    {showSuperacaoModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-[#0a0a0a]/90 backdrop-blur-2xl"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="w-full max-w-2xl bg-white dark:bg-[#1A1033] rounded-[60px] p-12 md:p-20 shadow-[0_0_80px_rgba(16,185,129,0.3)] border-4 border-emerald-500/20 text-center space-y-12"
                            >
                                <div className="space-y-6">
                                    <div className="w-24 h-24 bg-emerald-500/10 rounded-[35px] flex items-center justify-center mx-auto mb-8 border-2 border-emerald-500/30">
                                        <Sparkles className="w-12 h-12 text-emerald-500 animate-bounce" />
                                    </div>
                                    <h3 className="text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">ÍNDICE DE CURA <br/><span className="text-emerald-500">ATINGIDO!</span></h3>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] leading-relaxed">
                                        Você acertou esta questão duas vezes seguidas no expurgo. <br/> O que você aprendeu com este erro?
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <textarea
                                        value={superacaoNote}
                                        onChange={(e) => setSuperacaoNote(e.target.value)}
                                        placeholder="Ex: 'Cuidado com o prazo de 15 dias do Art. 523 do CPC, ele é contado em dias úteis...'"
                                        className="w-full h-48 p-8 rounded-[40px] bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 text-lg font-medium focus:ring-4 ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none outline-none dark:text-white"
                                    />
                                    
                                    <button
                                        onClick={handleSaveSuperacao}
                                        disabled={isSavingSuperacao || !superacaoNote.trim()}
                                        className="w-full py-6 bg-emerald-500 text-white rounded-3xl font-black uppercase text-xs tracking-[0.3em] shadow-2xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-30"
                                    >
                                        {isSavingSuperacao ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>GRAVAR NO CADERNO DE ERROS <Zap className="w-5 h-5 fill-current" /></>
                                        )}
                                    </button>
                                    
                                    <button 
                                        onClick={() => setShowSuperacaoModal(false)}
                                        className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-colors"
                                    >
                                        Pular anotação (não recomendado)
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ─── SRS FEEDBACK BUTTONS ─── */}
                <AnimatePresence>
                    {isAnswered && hasConfirmed && !srsFeedbackGiven && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="py-8"
                        >
                            <div className="bg-[#1A1033] rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 opacity-5">
                                    <Brain className="w-48 h-48 text-white" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-indigo-500/20 rounded-2xl">
                                            <Sparkles className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-black italic uppercase tracking-tighter text-lg">Como foi a retenção?</h3>
                                            <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Isso alimenta a Revisão Espaçada (SRS)</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleSRSFeedback('ERREI')}
                                            className="flex flex-col items-center gap-3 p-6 bg-rose-500/10 border-2 border-rose-500/20 rounded-3xl hover:bg-rose-500/20 hover:border-rose-500/40 transition-all group"
                                        >
                                            <ThumbsDown className="w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-300">Errei</span>
                                            <span className="text-[8px] font-bold text-white/30">Revisão: 1 dia</span>
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleSRSFeedback('DIFICIL')}
                                            className="flex flex-col items-center gap-3 p-6 bg-amber-500/10 border-2 border-amber-500/20 rounded-3xl hover:bg-amber-500/20 hover:border-amber-500/40 transition-all group"
                                        >
                                            <AlertTriangle className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Difícil</span>
                                            <span className="text-[8px] font-bold text-white/30">Revisão: 3 dias</span>
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleSRSFeedback('FACIL')}
                                            className="flex flex-col items-center gap-3 p-6 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-3xl hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group"
                                        >
                                            <ThumbsUp className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Fácil</span>
                                            <span className="text-[8px] font-bold text-white/30">Revisão: 7 dias</span>
                                        </motion.button>

                                        <motion.button
                                            whileHover={{ scale: 1.03, y: -2 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleSRSFeedback('DOMINEI')}
                                            className="flex flex-col items-center gap-3 p-6 bg-indigo-500/10 border-2 border-indigo-500/20 rounded-3xl hover:bg-indigo-500/20 hover:border-indigo-500/40 transition-all group"
                                        >
                                            <Crown className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Dominei</span>
                                            <span className="text-[8px] font-bold text-white/30">Revisão: 21 dias</span>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Painel de Explicação / Comentário */}
                <AnimatePresence>
                    {isAnswered && srsFeedbackGiven && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="pt-4 space-y-12 pb-20"
                        >
                            <div className={cn(
                                "rounded-[50px] p-12 md:p-16 border relative overflow-hidden shadow-2xl transition-all duration-500",
                                selectedOptionId === question.correct_option_id 
                                    ? "bg-[#1A1033] border-indigo-500/20" 
                                    : "bg-rose-900 border-rose-500/20"
                            )}>
                                <div className="absolute -top-10 -right-10 p-12 opacity-5">
                                    <BrainCircuit className="w-64 h-64 text-white" />
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-14 h-14 bg-white/10 rounded-[20px] flex items-center justify-center">
                                            <Sparkles className="w-6 h-6 text-indigo-300" />
                                        </div>
                                        <div>
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Análise do QRub</h3>
                                            <p className="text-2xl font-black italic uppercase text-white tracking-tighter">Gabarito Comentado</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="inline-block px-6 py-3 bg-white/10 rounded-2xl border border-white/5">
                                            <p className="text-3xl font-black italic uppercase text-white leading-none">
                                                Alternativa <span className="text-indigo-400">{String.fromCharCode(65 + question.options.findIndex(o => o.id === question.correct_option_id))}</span>
                                            </p>
                                        </div>

                                        <p className="text-xl font-medium leading-[1.8] text-slate-100 max-w-4xl">
                                            {question.explanation || "A fundamentação jurídica desta questão baseia-se na jurisprudência consolidada dos Tribunais Superiores, especificamente no que tange ao princípio da legalidade e segurança jurídica."}
                                        </p>
                                    </div>

                                    <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap items-center gap-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                                <Trophy className="w-5 h-5 text-indigo-400" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base legal robusta</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Questão Verificada</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Navigation - Fixado e Transparente */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-2xl border-2 border-slate-100 rounded-[40px] p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Progress Dots */}
                        <div className="hidden lg:flex flex-wrap items-center gap-2 max-w-[50%] justify-start">
                            {questions.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleNavigate(idx)}
                                    title={`Questão ${idx + 1}`}
                                    className={cn(
                                        "h-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-125",
                                        idx === currentIdx ? "bg-indigo-600 w-12 shadow-lg shadow-indigo-600/30" : 
                                        answeredQuestions[idx]?.correct ? "bg-emerald-400 w-3 hover:bg-emerald-500" :
                                        answeredQuestions[idx] ? "bg-rose-400 w-3 hover:bg-rose-500" : "bg-slate-200 w-3 hover:bg-slate-300 hover:w-6"
                                    )}
                                />
                            ))}
                        </div>

                        {/* Practical Action Buttons */}
                        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                            <button
                                onClick={() => currentIdx > 0 && handleNavigate(currentIdx - 1)}
                                disabled={currentIdx === 0}
                                className={cn(
                                    "p-4 rounded-3xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all flex items-center justify-center shrink-0",
                                    currentIdx === 0 && "opacity-30 cursor-not-allowed"
                                )}
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>

                            {/* Main Confirm / Next Action */}
                            {!hasConfirmed ? (
                                <button
                                    onClick={handleConfirm}
                                    disabled={!selectedOptionId}
                                    className="flex-1 md:w-auto md:px-12 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-3"
                                >
                                    Confirmar <CheckCircle2 className="w-5 h-5 hidden md:block" />
                                </button>
                            ) : srsFeedbackGiven ? (
                                <button
                                    onClick={() => {
                                        if (currentIdx < questions.length - 1) {
                                            handleNavigate(currentIdx + 1)
                                        } else {
                                            router.push('/concursos')
                                        }
                                    }}
                                    className="flex-1 md:w-auto md:px-12 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                >
                                    {currentIdx < questions.length - 1 ? 'Próximo' : 'Concluir'} <ArrowRight className="w-5 h-5 hidden md:block" />
                                </button>
                            ) : (
                                <div className="flex-1 md:w-auto md:px-12 py-5 bg-indigo-600/30 text-white/50 rounded-3xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 cursor-default">
                                    <Sparkles className="w-5 h-5 animate-pulse" /> Avalie a Retenção ↑
                                </div>
                            )}

                            {/* Skip without answering */}
                            {!hasConfirmed && currentIdx < questions.length - 1 && (
                                <button
                                    onClick={() => handleNavigate(currentIdx + 1)}
                                    className="p-4 rounded-3xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all flex items-center justify-center shrink-0"
                                >
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
