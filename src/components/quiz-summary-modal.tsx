"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, TrendingUp, ArrowRight, Home, RefreshCw, Trophy, BrainCircuit } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface QuizSummaryModalProps {
    isOpen: boolean
    onClose: () => void
    stats: {
        total: number
        correct: number
        incorrect: number
        percentage: number
    }
    nextAction?: {
        type: string
        subject_id: string | null
        subject_name?: string
    }
    onNextRecommendation?: () => void
}

export function QuizSummaryModal({ isOpen, onClose, stats, nextAction, onNextRecommendation }: QuizSummaryModalProps) {
    const router = useRouter()

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border rounded-3xl md:rounded-[40px] p-6 md:p-10 shadow-2xl custom-scrollbar"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="text-center space-y-4 md:space-y-6 relative z-10">
                        {/* Trophy */}
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                            <Trophy className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                        </div>

                        {/* Text */}
                        <div className="space-y-1">
                            <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter leading-tight">Sessão Concluída!</h2>
                            <p className="text-muted-foreground font-bold uppercase text-[9px] tracking-[0.2em] leading-tight">Desempenho Geral</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-muted/50 p-4 md:p-6 rounded-[24px] border border-border/50">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Acertos</p>
                                <div className="flex items-center justify-center gap-2 text-emerald-500">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-2xl md:text-3xl font-black italic leading-none">{stats.correct}</span>
                                </div>
                            </div>
                            <div className="bg-muted/50 p-4 md:p-6 rounded-[24px] border border-border/50">
                                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Erros</p>
                                <div className="flex items-center justify-center gap-2 text-rose-500">
                                    <XCircle className="w-4 h-4" />
                                    <span className="text-2xl md:text-3xl font-black italic leading-none">{stats.incorrect}</span>
                                </div>
                            </div>
                        </div>

                        {/* Score Circle */}
                        <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto -my-1">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-border"
                                />
                                <circle
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={283}
                                    strokeDashoffset={283 - (283 * stats.percentage) / 100}
                                    className="text-primary transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl md:text-2xl font-black italic leading-none">{Math.round(stats.percentage)}%</span>
                                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-1">Precisão</span>
                            </div>
                        </div>

                        <div className="pt-2 space-y-2 md:space-y-3">
                            {nextAction && nextAction.subject_id && (
                                <button
                                    onClick={onNextRecommendation}
                                    className="w-full bg-[#1A1033] text-white py-3 md:py-4 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center gap-1 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                    <div className="flex items-center gap-2 relative z-10">
                                        <BrainCircuit className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                                        Entrar no Fluxo
                                    </div>
                                    <div className="text-[8px] opacity-70 relative z-10 line-clamp-1 break-all px-2">
                                        {nextAction.subject_name || nextAction.subject_id}
                                    </div>
                                </button>
                            )}

                            <button
                                onClick={() => router.push('/dashboard/stats')}
                                className="w-full royal-gradient text-white py-3 md:py-4 rounded-xl font-black uppercase text-[10px] md:text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                Estatísticas Detalhadas <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>

                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-card border border-border hover:bg-muted py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 flex-col md:flex-row"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" /> <span className="hidden leading-tight iPhoneSE:inline">Refazer</span>
                                </button>
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="bg-card border border-border hover:bg-muted py-3 rounded-xl font-black uppercase text-[9px] md:text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 flex-col md:flex-row"
                                >
                                    <Home className="w-3.5 h-3.5" /> <span className="hidden leading-tight iPhoneSE:inline">Dashboard</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
