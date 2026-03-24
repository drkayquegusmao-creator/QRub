"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
    ChevronLeft, Clock, Target, CheckCircle2, XCircle, Info, 
    Maximize2, Minimize2, Sparkles, BrainCircuit, Crown, 
    ArrowLeft, ArrowRight, Flag, ShieldCheck, History as HistoryIcon, 
    Activity, Microscope, Loader2, AlertTriangle, MessageSquare,
    Trophy, GraduationCap, Zap
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useConcursoQuestions } from '@/store/concursos/use-questions'
import { useConcursoQuiz } from '@/store/concursos/use-quiz'
import { cn } from '@/lib/utils'

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
    const [isFocusMode, setIsFocusMode] = useState(false)
    const [fontSize, setFontSize] = useState(20)

    useEffect(() => {
        const filters = {
            area_id: searchParams.get('areaId') || undefined,
            disciplina_id: searchParams.get('disciplinaId') || undefined,
            subdisciplina_id: searchParams.get('subdisciplinaId') || undefined,
            assunto_id: searchParams.get('assuntoId') || undefined,
            banca_id: searchParams.get('bancaId') || undefined,
            pageSize: parseInt(searchParams.get('count') || '20')
        }
        loadQuestions(filters)
    }, [searchParams])

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
                    <p className="text-sm font-black uppercase tracking-widest text-[#1A1033]">Carregando Bateria Especializada...</p>
                </div>
            </div>
        )
    }

    if (!question && !questionsLoading) {
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
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Progresso Atual</span>
                            <span className="text-sm font-black italic uppercase tracking-tighter text-[#1A1033]">Bateria {currentIdx + 1}/{questions.length}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
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

                {/* Painel de Explicação / Comentário */}
                <AnimatePresence>
                    {isAnswered && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="pt-16 space-y-12 pb-20"
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

                            {/* Ações Secundárias */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button className="flex items-center justify-between p-8 bg-white border-2 border-slate-100 rounded-[40px] hover:border-indigo-500/20 transition-all group shadow-sm text-left">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                                            <MessageSquare className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase text-[#1A1033]">Dúvidas ou Feedback?</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reporte problemas nesta questão</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                </button>

                                <button className="flex items-center justify-between p-8 bg-white border-2 border-slate-100 rounded-[40px] hover:border-indigo-500/20 transition-all group shadow-sm text-left">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                                            <HistoryIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase text-[#1A1033]">Seu Histórico</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Veja suas resoluções anteriores</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                </button>
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
                        <div className="hidden lg:flex items-center gap-2">
                            {questions.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={cn(
                                        "h-3 rounded-full transition-all duration-500",
                                        idx === currentIdx ? "bg-indigo-600 w-12 shadow-lg shadow-indigo-600/30" : 
                                        answeredQuestions[idx]?.correct ? "bg-emerald-400 w-3" :
                                        answeredQuestions[idx] ? "bg-rose-400 w-3" : "bg-slate-200 w-3"
                                    )}
                                />
                            ))}
                        </div>

                        {/* Practical Action Button */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            {!hasConfirmed ? (
                                <button
                                    onClick={handleConfirm}
                                    disabled={!selectedOptionId}
                                    className="w-full md:px-16 py-6 bg-indigo-600 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-4"
                                >
                                    Confirmar Gabarito <CheckCircle2 className="w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        if (currentIdx < questions.length - 1) {
                                            setCurrentIdx(currentIdx + 1)
                                            setHasConfirmed(false)
                                            setIsAnswered(false)
                                            setSelectedOptionId(null)
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                        } else {
                                            router.push('/concursos')
                                        }
                                    }}
                                    className="w-full md:px-16 py-6 bg-indigo-600 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                                >
                                    {currentIdx < questions.length - 1 ? 'Próximo Item' : 'Concluir Bateria'} <ArrowRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
