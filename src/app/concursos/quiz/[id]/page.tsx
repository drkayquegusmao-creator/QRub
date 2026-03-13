"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
    ChevronLeft, Clock, Target, CheckCircle2, XCircle, Info, 
    Maximize2, Minimize2, Sparkles, BrainCircuit, Crown, 
    ArrowLeft, ArrowRight, Flag, ShieldCheck, History as HistoryIcon, 
    Activity, Microscope, Loader2, AlertTriangle, MessageSquare
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useConcursoQuestions } from '@/store/concursos/use-questions'
import { useConcursoQuiz } from '@/store/concursos/use-quiz'

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
    const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { correct: boolean, selectedId: string }>>({})
    const [timeLeft, setTimeLeft] = useState(600)
    const [isFocusMode, setIsFocusMode] = useState(false)
    const [fontSize, setFontSize] = useState(18)

    useEffect(() => {
        const filters = {
            area_id: searchParams.get('areaId') || undefined,
            disciplina_id: searchParams.get('disciplinaId') || undefined,
            pageSize: parseInt(searchParams.get('count') || '20')
        }
        loadQuestions(filters)
    }, [searchParams])

    const quizStats = useMemo(() => {
        const answers = Object.values(answeredQuestions)
        const total = questions.length
        const correct = answers.filter(a => a.correct).length
        const incorrect = answers.length - correct
        const percentage = answers.length > 0 ? (correct / answers.length) * 100 : 0
        return { total, correct, incorrect, percentage }
    }, [answeredQuestions, questions.length])

    const question = questions[currentIdx]

    if (questionsLoading && questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-6">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                    <p className="text-sm font-black uppercase tracking-widest text-[#1A1033]">Carregando Questões de Concurso...</p>
                </div>
            </div>
        )
    }

    if (!question && !questionsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white p-6">
                <div className="w-full max-w-md bg-white border border-slate-100 rounded-[40px] p-10 text-center space-y-6 shadow-xl">
                    <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto">
                        <Target className="w-10 h-10 text-indigo-500" />
                    </div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033]">Bateria Esgotada</h3>
                    <p className="text-slate-400 font-bold text-sm">Não encontramos questões para os filtros selecionados.</p>
                    <button onClick={() => router.back()} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-indigo-600/20 transition-all">
                        Tentar Outros Filtros
                    </button>
                </div>
            </div>
        )
    }

    const handleSelect = (optionId: string) => {
        if (hasConfirmed) return
        setSelectedOptionId(optionId)
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

        add_response({
            id: uuidv4_local(),
            user_id: user?.id || 'visitor',
            question_id: question.id,
            disciplina_id: question.disciplina_id || 'geral',
            is_correct: isCorrect,
            timestamp: new Date().toISOString()
        })
    }

    function uuidv4_local() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return (
        <div className={`min-h-screen flex flex-col px-4 pb-32 transition-all duration-500 ${isFocusMode ? 'bg-[#0a0a0a] text-white py-12' : 'bg-slate-50/50 py-12'}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-12 max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-6">
                    <div className="bg-white border border-slate-100 px-6 py-3 rounded-2xl shadow-sm font-black uppercase text-[10px] tracking-widest text-[#1A1033]">
                        Questão {currentIdx + 1}/{questions.length}
                    </div>
                    {mode === 'SIMULADO' && (
                        <div className="bg-rose-50 text-rose-500 px-6 py-3 rounded-2xl border border-rose-100 font-black flex items-center gap-2 text-[10px] tracking-widest uppercase">
                            <Clock className="w-4 h-4" /> 59:59
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                     <div className="bg-white border border-slate-100 p-1.5 rounded-2xl flex gap-1 shadow-sm">
                        <button onClick={() => setFontSize(prev => Math.max(14, prev - 2))} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                            <span className="text-xs font-black">A-</span>
                        </button>
                        <button onClick={() => setFontSize(prev => Math.min(32, prev + 2))} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                            <span className="text-sm font-black">A+</span>
                        </button>
                    </div>
                    <button onClick={() => setIsFocusMode(!isFocusMode)} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                        {isFocusMode ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                    </button>
                    <button onClick={() => router.back()} className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-[#1A1033] hover:text-rose-500 transition-all shadow-sm">
                        <ArrowLeft className="w-4 h-4" /> Sair
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-10 max-w-5xl mx-auto w-full">
                {/* Question Info */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                        {question.area_id || 'Área'}
                    </span>
                    <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                        Dificuldade: {question.difficulty}
                    </span>
                    {isAnswered && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-amber-100 text-amber-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> Assunto Detectado
                        </motion.span>
                    )}
                </div>

                {/* Enunciado */}
                <div className="space-y-8">
                    <h2 className="font-bold leading-tight text-[#1A1033]" style={{ fontSize: `${fontSize * 1.3}px` }}>
                        {question.enunciado}
                    </h2>
                </div>

                {/* Alternativas */}
                <div className="space-y-4">
                    {question.options.map((opt, idx) => {
                        const isCorrect = opt.id === question.correct_option_id
                        const isSelected = opt.id === selectedOptionId
                        const showFeedback = isAnswered
                        const label = String.fromCharCode(65 + idx)

                        let borderClass = 'border-slate-100'
                        let bgClass = 'bg-white'
                        let textClass = 'text-slate-600'

                        if (showFeedback) {
                            if (isCorrect) {
                                borderClass = 'border-emerald-500 ring-2 ring-emerald-500/20'
                                bgClass = 'bg-emerald-50/50'
                                textClass = 'text-emerald-700'
                            } else if (isSelected) {
                                borderClass = 'border-rose-500'
                                bgClass = 'bg-rose-50/50'
                                textClass = 'text-rose-700'
                            } else {
                                bgClass = 'bg-slate-50/50 opacity-40'
                            }
                        } else if (isSelected) {
                            borderClass = 'border-indigo-600 shadow-xl shadow-indigo-600/10'
                            bgClass = 'bg-indigo-50/10'
                            textClass = 'text-indigo-600'
                        }

                        return (
                            <button
                                key={opt.id}
                                onClick={() => handleSelect(opt.id)}
                                disabled={showFeedback}
                                className={`w-full text-left p-8 rounded-[30px] border-2 transition-all flex items-start gap-6 font-bold text-lg group ${borderClass} ${bgClass} ${textClass}`}
                            >
                                <span className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm shrink-0 font-black transition-all ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white'} ${showFeedback && isCorrect ? '!bg-emerald-500 !text-white' : ''} ${showFeedback && isSelected && !isCorrect ? '!bg-rose-500 !text-white' : ''}`}>
                                    {label}
                                </span>
                                <span className="pt-1.5">{opt.text}</span>
                                {showFeedback && isCorrect && <CheckCircle2 className="w-8 h-8 text-emerald-500 ml-auto shrink-0" />}
                                {showFeedback && isSelected && !isCorrect && <XCircle className="w-8 h-8 text-rose-500 ml-auto shrink-0" />}
                            </button>
                        )
                    })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-12 space-y-8">
                         <div className="bg-[#1A1033] rounded-[40px] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
                             <div className="absolute top-0 right-0 p-12 opacity-10">
                                <BrainCircuit className="w-40 h-40" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-indigo-400" /> Gabarito Comentado
                            </h3>
                            <p className="text-2xl font-black italic uppercase leading-none mb-6">Resposta: {question.correct_option_id}</p>
                            <p className="text-xl font-bold leading-relaxed text-slate-300">
                                {question.explanation}
                            </p>
                        </div>

                        <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-sm flex items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-slate-50 text-slate-400 rounded-3xl">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase italic text-[#1A1033]">Dúvidas ou Erros?</h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reporte problemas ou comente esta questão</p>
                                </div>
                            </div>
                            <button className="px-8 py-4 bg-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Reportar
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Footer Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between gap-8">
                    <div className="hidden md:flex items-center gap-2">
                        {questions.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`w-3 h-3 rounded-full transition-all ${idx === currentIdx ? 'bg-indigo-600 scale-125 w-8' : idx < currentIdx ? 'bg-emerald-400' : 'bg-slate-200'}`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {!hasConfirmed ? (
                            <button
                                onClick={handleConfirm}
                                disabled={!selectedOptionId}
                                className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-[25px] font-black uppercase text-xs tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:hover:scale-100 flex items-center justify-center gap-3"
                            >
                                Confirmar Resposta <CheckCircle2 className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    if (currentIdx < questions.length - 1) {
                                        setCurrentIdx(currentIdx + 1)
                                        setHasConfirmed(false)
                                        setIsAnswered(false)
                                        setSelectedOptionId(null)
                                    } else {
                                        router.push('/concursos')
                                    }
                                }}
                                className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-[25px] font-black uppercase text-xs tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                {currentIdx < questions.length - 1 ? 'Próxima Questão' : 'Concluir Bateria'} <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
