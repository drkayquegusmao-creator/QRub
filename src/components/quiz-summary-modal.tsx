"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, TrendingUp, ArrowRight, Home, RefreshCw, Trophy } from 'lucide-react'
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
}

export function QuizSummaryModal({ isOpen, onClose, stats }: QuizSummaryModalProps) {
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
                    className="relative w-full max-w-lg bg-card border border-border rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="text-center space-y-8 relative z-10">
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Trophy className="w-10 h-10 text-primary" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Sessão Concluída!</h2>
                            <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-[0.2em]">Desempenho Geral</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/50 p-6 rounded-[32px] border border-border/50">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Acertos</p>
                                <div className="flex items-center justify-center gap-2 text-emerald-500">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span className="text-3xl font-black italic">{stats.correct}</span>
                                </div>
                            </div>
                            <div className="bg-muted/50 p-6 rounded-[32px] border border-border/50">
                                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Erros</p>
                                <div className="flex items-center justify-center gap-2 text-rose-500">
                                    <XCircle className="w-5 h-5" />
                                    <span className="text-3xl font-black italic">{stats.incorrect}</span>
                                </div>
                            </div>
                        </div>

                        {/* Score Circle */}
                        <div className="relative w-32 h-32 mx-auto">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="58"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    fill="transparent"
                                    className="text-border"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="58"
                                    stroke="currentColor"
                                    strokeWidth="10"
                                    fill="transparent"
                                    strokeDasharray={364.4}
                                    strokeDashoffset={364.4 - (364.4 * stats.percentage) / 100}
                                    className="text-primary transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black italic">{Math.round(stats.percentage)}%</span>
                                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Precisão</span>
                            </div>
                        </div>

                        <div className="pt-4 space-y-3">
                            <button
                                onClick={() => router.push('/dashboard/stats')}
                                className="w-full royal-gradient text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                Ver Estatísticas Detalhadas <TrendingUp className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-card border border-border hover:bg-muted py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" /> Refazer
                                </button>
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="bg-card border border-border hover:bg-muted py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                    <Home className="w-3.5 h-3.5" /> Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
