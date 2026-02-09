"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, ArrowRight, ShieldAlert, CheckCircle2, ChevronRight, XCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRankElite } from '@/store/use-rank-elite'
import { HighlightableText } from '@/components/highlightable-text'

interface ArenaMatchProps {
    matchId: string;
    onFinish: (result: any) => void;
    onAbort: () => void;
}

export function ArenaMatch({ matchId, onFinish, onAbort }: ArenaMatchProps) {
    const { finishMatch, profile } = useRankElite()
    const [questions, setQuestions] = useState<any[]>([])
    const [currentIdx, setCurrentIdx] = useState(0)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)
    const [responses, setResponses] = useState<Record<number, string>>({})
    const [startTime] = useState(Date.now())
    const [isLoading, setIsLoading] = useState(true)

    // New Metrics State
    const [currentStreak, setCurrentStreak] = useState(0)
    const [fastCorrectCount, setFastCorrectCount] = useState(0)
    const [questionStartTime, setQuestionStartTime] = useState(Date.now())

    // Buscar questões únicas para o usuário via RPC
    useEffect(() => {
        async function fetchMatchQuestions() {
            if (!profile?.user_id) return

            setIsLoading(true)
            try {
                const { data, error } = await supabase.rpc('get_user_rank_questions', {
                    p_user_id: profile.user_id,
                    p_limit: 10
                })

                if (error) throw error
                setQuestions(data || [])
            } catch (err) {
                console.error('Match Fetch Error:', err)
                // Fallback
                const { data: fallbackData } = await supabase
                    .from('questao_base')
                    .select('*')
                    .eq('status_validacao', 'APROVADA')
                    .limit(10)
                if (fallbackData && (!questions || questions.length === 0)) {
                    setQuestions(fallbackData)
                }
            } finally {
                setIsLoading(false)
            }
        }
        fetchMatchQuestions()
    }, [matchId, profile?.user_id])

    // Reset question timer on new question
    useEffect(() => {
        setQuestionStartTime(Date.now())
    }, [currentIdx])

    const handleNext = async () => {
        if (!selectedOption) return

        const newResponses = { ...responses, [currentIdx]: selectedOption }
        setResponses(newResponses)

        // Calculate Metrics for this question
        const isCorrect = selectedOption === questions[currentIdx].correct_option_id
        const responseTime = (Date.now() - questionStartTime) / 1000

        let newStreak = currentStreak
        let newFastCount = fastCorrectCount

        if (isCorrect) {
            newStreak += 1
            if (responseTime < 5) { // 5 seconds threshold for "Fast"
                newFastCount += 1
            }
        } else {
            newStreak = 0
        }

        setCurrentStreak(newStreak)
        setFastCorrectCount(newFastCount)
        setSelectedOption(null)

        if (currentIdx < questions.length - 1) {
            setCurrentIdx(prev => prev + 1)
        } else {
            // Finalizar Match
            const duration = Math.floor((Date.now() - startTime) / 1000)
            let correctCount = 0
            const incorrectIds: number[] = []

            questions.forEach((q, idx) => {
                if (newResponses[idx] === q.correct_option_id) {
                    correctCount++
                } else {
                    incorrectIds.push(q.id)
                }
            })

            const points = (correctCount * 10) - ((questions.length - correctCount) * 4)
            const xp = 50 + (correctCount === questions.length ? 30 : 0)

            await finishMatch(matchId, {
                correct: correctCount,
                wrong: questions.length - correctCount,
                points: Math.max(0, points),
                xp: xp,
                duration,
                incorrectQuestionIds: incorrectIds
            })

            onFinish({
                correctCount,
                total: questions.length,
                score: Math.max(0, points),
                xp: xp,
                duration
            })
        }
    }

    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-8">
                <div className="w-16 h-16 border-4 border-[#39FF14] border-t-transparent animate-spin rounded-full" />
                <h2 className="text-xl font-black italic uppercase tracking-tighter animate-pulse">Iniciando Sincronização Arena...</h2>
            </div>
        )
    }

    const question = questions[currentIdx]

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 min-h-full flex flex-col pb-32">
            {/* Header de Progresso */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                <div className="flex items-center gap-6">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">HUD Questão</p>
                        <p className="text-xl font-black italic uppercase tracking-tighter">
                            {currentIdx + 1} de {questions.length}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                    <Timer className="w-5 h-5 text-[#39FF14]" />
                    <span className="font-mono font-bold text-xl tabular-nums">
                        {Math.floor((Date.now() - startTime) / 1000)}s
                    </span>
                </div>
            </div>

            <div className="flex-1 space-y-12">
                {/* Enunciado */}
                <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <HighlightableText
                        text={question?.enunciado}
                        field="enunciado"
                        questionId={question?.id}
                        className="text-2xl md:text-3xl font-black italic uppercase leading-tight tracking-tighter"
                    />

                    {/* Alternativas */}
                    <div className="space-y-4">
                        {question?.options.map((opt: any) => (
                            <button
                                key={opt.id}
                                onClick={() => setSelectedOption(opt.id)}
                                className={`w-full text-left p-6 border-2 transition-all flex items-start gap-6 group relative overflow-hidden ${selectedOption === opt.id
                                    ? 'border-[#39FF14] bg-[#39FF14]/5'
                                    : 'border-white/5 hover:border-[#39FF14]/30 bg-white/5'
                                    }`}
                                style={{ borderRadius: '0px' }} // Sharp Edges as requested
                            >
                                <div className={`w-10 h-10 flex items-center justify-center font-black text-sm shrink-0 transition-colors ${selectedOption === opt.id ? 'bg-[#39FF14] text-black' : 'bg-white/10 text-white/50 group-hover:bg-[#39FF14]/10 group-hover:text-[#39FF14]'
                                    }`}>
                                    {opt.id.toUpperCase()}
                                </div>
                                <div className={`text-lg font-bold flex-1 pt-1 ${selectedOption === opt.id ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                    <HighlightableText
                                        text={opt.text}
                                        field={`option_${opt.id}`}
                                        questionId={question?.id}
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Ações Inferiores */}
            <div className="pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <button
                    onClick={onAbort}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-rose-500 transition-colors flex items-center gap-2"
                >
                    <XCircle className="w-4 h-4" /> ABANDONAR MATCH
                </button>

                <button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    className={`w-full md:w-auto px-12 py-6 font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-4 transition-all ${selectedOption
                        ? 'bg-[#39FF14] text-black hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(57,255,20,0.2)]'
                        : 'bg-white/5 text-white/20 cursor-not-allowed'
                        }`}
                    style={{ borderRadius: '0px' }}
                >
                    {currentIdx === questions.length - 1 ? 'FINALIZAR MATCH' : 'PRÓXIMA QUESTÃO'}
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div >
        </div >
    )
}
