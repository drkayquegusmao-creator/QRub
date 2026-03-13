"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X, Target, AlertCircle, Loader2, CheckCircle2,
    XCircle, ChevronRight, RefreshCw, BarChart2,
    Check, AlertTriangle
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/store/use-auth'
import { usePreferences } from '@/store/use-preferences'
import React from 'react';

interface TrainingSession {
    id: string
    user_id: string
    area: string
    subarea: string | null
    subject: string | null
    difficulty: string
    volume: number
    question_ids?: string[]
}

interface Option {
    id: string
    label: string
    text: string
    explanation?: string
}

interface Question {
    id: string
    specialty_id: string
    subspecialty_id: string
    subject_id: string
    difficulty: string
    enunciado: string
    options: Option[]
    correct_option_id: string
    explanation: string
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, message: string }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, message: '' };
    }
    static getDerivedStateFromError(error: any) {
        return { hasError: true, message: error.message + '\n' + error.stack };
    }
    render() {
        if (this.state.hasError) {
            return <div style={{ padding: 20, whiteSpace: 'pre-wrap', color: 'red' }}>{this.state.message}</div>;
        }
        return this.props.children;
    }
}

export default function TreinoExecucaoPageWrapper() {
    return <ErrorBoundary><TreinoExecucaoPage /></ErrorBoundary>;
}

function TreinoExecucaoPage() {
    const router = useRouter()
    const params = useParams()
    const sessionId = params.id as string
    const { user } = useAuth()
    const { questionsFont } = usePreferences()

    // States
    const [status, setStatus] = useState<'LOADING' | 'READY' | 'ERROR' | 'EMPTY' | 'FINISHED'>('LOADING')
    const [session, setSession] = useState<TrainingSession | null>(null)
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)

    // Interaction States
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    // Stats
    const [correctCount, setCorrectCount] = useState(0)
    const [wrongCount, setWrongCount] = useState(0)

    // HOOKS MUST BE AT THE TOP
    const fontStyle = useMemo(() => ({
        fontFamily: questionsFont === 'arial' ? 'Arial, sans-serif' :
            questionsFont === 'times' ? '"Times New Roman", serif' :
                'inherit'
    }), [questionsFont])

    const currentQ = questions[currentIndex]

    const shuffledOptions = useMemo(() => {
        if (!currentQ) return []
        const baseOptions = [...(currentQ.options || [])]
        return baseOptions
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }, [currentIndex, currentQ?.id])

    // Load initial data
    useEffect(() => {
        const loadTrain = async () => {
            if (!user || !sessionId) return

            try {
                // 1. Get Session
                const { data: sessionData, error: sessionError } = await supabase
                    .from('training_sessions')
                    .select('*')
                    .eq('id', sessionId)
                    .eq('user_id', user.id)
                    .single()

                if (sessionError || !sessionData) throw new Error('Sessão Inválida')
                setSession(sessionData)

                // 2. Fetch Questions
                let finalQuestions: any[] = []

                if (sessionData.question_ids && sessionData.question_ids.length > 0) {
                    const { data: idQuestions, error: idError } = await supabase
                        .from('questao_base')
                        .select('*')
                        .in('id', sessionData.question_ids)

                    if (idError) throw idError
                    finalQuestions = idQuestions || []
                } else {
                    let query = supabase
                        .from('questao_base')
                        .select('*')
                        .eq('status', 'active')
                        .eq('status_validacao', 'APROVADA')

                    const slug = sessionData.area
                    const orConditions = [
                        `specialty_id.eq.${slug}`,
                        `subspecialty_id.eq.${slug}`,
                        `subject_id.eq.${slug}`,
                        `area_id.eq.${slug}`,
                        `tema_id.eq.${slug}`,
                        `subarea_id.eq.${slug}`
                    ].join(',')
                    query = query.or(orConditions)

                    if (sessionData.difficulty && sessionData.difficulty !== 'Qualquer') {
                        const diff = sessionData.difficulty.toLowerCase()
                            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        query = query.or(`difficulty.eq.${diff},difficulty.eq.${sessionData.difficulty.toLowerCase()}`)
                    }

                    query = query.limit(sessionData.volume)
                    const { data: fallbackQuestions, error: fallbackError } = await query
                    if (fallbackError) throw fallbackError
                    finalQuestions = fallbackQuestions || []
                }

                if (finalQuestions.length === 0) {
                    setStatus('EMPTY')
                    return
                }

                const parsedQuestions = finalQuestions.map(q => {
                    let opts = q.options
                    if (typeof opts === 'string') {
                        try { opts = JSON.parse(opts) } catch { opts = [] }
                    }
                    return { ...q, options: Array.isArray(opts) ? opts : [] }
                }).filter(q => q.options.length > 0)

                if (parsedQuestions.length === 0) {
                    setStatus('EMPTY')
                    return
                }

                const shuffledPool = parsedQuestions
                    .map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)

                setQuestions(shuffledPool)
                setStatus('READY')

            } catch (error: any) {
                setErrorMsg(error.message)
                setStatus('ERROR')
            }
        }

        loadTrain()
    }, [user, sessionId])

    const handleConfirm = async () => {
        if (!selectedOption || !user) return
        const currentQ = questions[currentIndex]
        const isCorrect = selectedOption === currentQ.correct_option_id
        setIsSaving(true)
        try {
            await supabase.from('user_question_history').insert({
                user_id: user.id,
                question_id: currentQ.id,
                answered_correct: isCorrect,
                last_seen_at: new Date().toISOString()
            })
            if (isCorrect) setCorrectCount(prev => prev + 1)
            else setWrongCount(prev => prev + 1)
            setIsConfirmed(true)
        } catch (e) {
            console.error('Error saving history:', e)
            setIsConfirmed(true)
        } finally {
            setIsSaving(false)
        }
    }

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelectedOption(null)
            setIsConfirmed(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            setStatus('FINISHED')
        }
    }

    if (status === 'LOADING') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] bg-slate-50 relative z-50">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1033]">Carregando Seu Treino</p>
                <div className="mt-2 text-xs font-bold text-slate-400 italic">Aplicando algoritmos anti-repetição...</div>
            </div>
        )
    }

    if (status === 'ERROR' || status === 'EMPTY') {
        const isError = status === 'ERROR'
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] bg-slate-50">
                {isError ? <AlertCircle className="w-16 h-16 text-rose-500 mb-4" /> : <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />}
                <h2 className="text-xl font-black italic uppercase text-[#1A1033] tracking-tighter">
                    {isError ? 'Erro ao Carregar' : 'Sem Questões Novas'}
                </h2>
                <p className="text-sm font-bold text-slate-400 mt-2 mb-6 text-center max-w-sm">
                    {isError ? errorMsg || 'Ocorreu um erro ao tentar conectar no banco de questões.' : 'Você já esgotou as questões para este filtro. Tente ampliar as áreas ou reverter o filtro de dificuldade.'}
                </p>
                <button
                    onClick={() => router.push('/dashboard/treinar-area')}
                    className="px-8 py-4 bg-primary text-white rounded-[20px] font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                    Voltar aos Filtros
                </button>
            </div>
        )
    }

    if (status === 'FINISHED') {
        const percent = Math.round((correctCount / questions.length) * 100) || 0;
        return (
            <div className="max-w-2xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                    <div className="w-24 h-24 mx-auto rounded-full bg-slate-50 border-[6px] border-white shadow-xl flex items-center justify-center mb-6 relative z-10">
                        <BarChart2 className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-2 relative z-10">Treino Concluído</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 relative z-10">Área: {session?.area}</p>
                    <div className="grid grid-cols-3 gap-4 mb-10 relative z-10">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-[10px] uppercase font-black tracking-widest text-[#1A1033] mb-2">Acertos</p>
                            <p className="text-2xl font-black text-emerald-500">{correctCount}</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <p className="text-[10px] uppercase font-black tracking-widest text-[#1A1033] mb-2">Erros</p>
                            <p className="text-2xl font-black text-rose-500">{wrongCount}</p>
                        </div>
                        <div className="bg-primary p-4 rounded-2xl shadow-xl shadow-primary/20 text-white">
                            <p className="text-[10px] uppercase font-black tracking-widest mb-2 opacity-80">Rendimento</p>
                            <p className="text-2xl font-black italic">{percent}%</p>
                        </div>
                    </div>
                    <div className="flex gap-4 relative z-10">
                        <button
                            onClick={() => router.push('/dashboard/treinar-area')}
                            className="flex-1 py-5 bg-slate-100 text-[#1A1033] rounded-[24px] font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-colors"
                        >
                            Novo Treino
                        </button>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="flex-1 py-5 bg-white border-2 border-[#1A1033] text-[#1A1033] rounded-[24px] font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-colors"
                        >
                            Ir para Dashboard
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50/50 pb-32">
            <div className="bg-white border-b border-slate-100 sticky top-0 z-40 p-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/dashboard/treinar-area')}
                            className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:text-[#1A1033] hover:bg-slate-100 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="hidden sm:block">
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1">
                                {session?.area}
                            </p>
                            <p className="text-sm font-bold text-[#1A1033] line-clamp-1">{session?.subject || 'Todos os Assuntos'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Progresso</p>
                            <p className="text-sm font-bold text-[#1A1033]">{currentIndex + 1} <span className="text-slate-300">/ {questions.length}</span></p>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle
                                    className="text-primary transition-all duration-500 ease-out"
                                    strokeWidth="4"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="18"
                                    cx="24"
                                    cy="24"
                                    style={{ strokeDasharray: 113.1, strokeDashoffset: 113.1 - (113.1 * ((currentIndex + 1) / questions.length)) }}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8">
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                        QID: {currentQ?.id?.substring(0, 6)}
                    </span>
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg ${currentQ?.difficulty === 'fcil' || currentQ?.difficulty === 'fácil' ? 'bg-emerald-100 text-emerald-600' :
                        currentQ?.difficulty === 'difcil' || currentQ?.difficulty === 'difícil' ? 'bg-rose-100 text-rose-600' :
                            'bg-amber-100 text-amber-600'
                        }`}>
                        {currentQ?.difficulty}
                    </span>
                </div>

                <div
                    className="bg-white p-6 md:p-10 rounded-[30px] shadow-sm border border-slate-100 mb-6 text-lg font-medium text-[#1A1033] leading-relaxed break-words whitespace-pre-wrap"
                    style={fontStyle}
                    dangerouslySetInnerHTML={{ __html: currentQ?.enunciado || 'Enunciado indisponível' }}
                />

                <div className="space-y-3 mb-10">
                    {shuffledOptions.map((opt, index) => {
                        const isSelected = selectedOption === opt.id
                        const isCorrectOption = opt.id === currentQ.correct_option_id
                        const visualLabel = String.fromCharCode(65 + index)

                        let stateClass = "bg-white border-slate-200 hover:border-indigo-300"
                        if (isConfirmed) {
                            if (isCorrectOption) stateClass = "bg-emerald-50 border-emerald-500 shadow-xl shadow-emerald-500/20"
                            else if (isSelected && !isCorrectOption) stateClass = "bg-rose-50 border-rose-500 shadow-xl shadow-rose-500/20 opacity-90"
                            else stateClass = "bg-slate-50 border-slate-100 opacity-50 grayscale"
                        } else if (isSelected) {
                            stateClass = "bg-primary/5 border-primary shadow-lg shadow-primary/20 scale-[1.01]"
                        }

                        return (
                            <button
                                key={opt.id}
                                disabled={isConfirmed}
                                onClick={() => setSelectedOption(opt.id)}
                                className={`w-full text-left p-5 rounded-[24px] border-2 transition-all flex gap-4 relative overflow-hidden ${stateClass}`}
                            >
                                <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black mt-0.5 ${isConfirmed && isCorrectOption ? 'bg-emerald-500 text-white' :
                                    isConfirmed && isSelected && !isCorrectOption ? 'bg-rose-500 text-white' :
                                        isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {isConfirmed && isCorrectOption ? <Check className="w-5 h-5" /> :
                                        isConfirmed && isSelected ? <X className="w-5 h-5" /> :
                                            visualLabel}
                                </div>
                                <div className="flex-1" style={fontStyle} dangerouslySetInnerHTML={{ __html: opt.text }} />
                            </button>
                        )
                    })}
                </div>

                <AnimatePresence>
                    {isConfirmed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#1A1033] text-white p-6 md:p-8 rounded-[30px] border border-slate-800 shadow-2xl mb-10 overflow-hidden relative"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                {selectedOption === currentQ.correct_option_id ? (
                                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center shrink-0">
                                        <XCircle className="w-6 h-6" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-black italic uppercase tracking-widest text-slate-100">
                                        {selectedOption === currentQ.correct_option_id ? 'Correto!' : 'Incorreto'}
                                    </h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                                        A alternativa correta era a {(() => {
                                            const visualIdx = shuffledOptions.findIndex(o => o.id === currentQ.correct_option_id);
                                            return String.fromCharCode(65 + visualIdx);
                                        })()}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 p-6 rounded-[20px] text-slate-300 font-medium text-sm leading-relaxed" style={fontStyle} dangerouslySetInnerHTML={{ __html: currentQ.explanation || 'Resolução indisponível.' }} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 md:p-6 z-40">
                <div className="max-w-4xl mx-auto flex items-center justify-end">
                    {!isConfirmed ? (
                        <button
                            onClick={handleConfirm}
                            disabled={!selectedOption || isSaving}
                            className="px-8 py-5 bg-primary text-white rounded-[20px] font-black uppercase text-sm tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmar Resposta'}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-8 py-5 bg-[#1A1033] text-white rounded-[20px] font-black uppercase text-sm tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                            Próxima Questão <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
