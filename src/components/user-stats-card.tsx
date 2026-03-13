"use client"

import { useUserStats } from '@/store/use-user-stats'
import { useAuth } from '@/store/use-auth'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, BarChart3, CheckCircle2, Trophy, Loader2 } from 'lucide-react'

export function UserStatsCard() {
    const { user } = useAuth()
    const { stats, loading, loadStats } = useUserStats()

    useEffect(() => {
        if (user?.id) {
            const isConcursos = typeof window !== 'undefined' && window.location.pathname.startsWith('/concursos')
            loadStats(user.id, isConcursos)
        }
    }, [user?.id, loadStats])

    if (loading && !stats) {
        return (
            <div className="w-full bg-white rounded-[40px] border-2 border-slate-100 p-10 flex items-center justify-center min-h-[200px] shadow-sm">
                <div className="flex flex-col items-center gap-4 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="font-black italic uppercase text-[10px] tracking-widest text-[#1A1033]/50">Sincronizando estatísticas...</p>
                </div>
            </div>
        )
    }

    if (!stats || stats.total_questoes === 0) {
        return (
            <div className="w-full bg-white rounded-[40px] border-2 border-slate-100 p-10 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <Trophy className="w-32 h-32" />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                        <Trophy className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033]">Pronto para Começar?</h3>
                        <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm leading-relaxed">
                            Resolva sua primeira questão para ativar suas estatísticas e desbloquear sua evolução.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white rounded-[40px] border-2 border-slate-100 p-10 shadow-sm relative overflow-hidden group"
        >
            <div className="space-y-8">
                {/* Main Metric */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className={`absolute inset-0 blur-xl rounded-full scale-150 animate-pulse ${stats.tone === 'elite' ? 'bg-orange-500/20' :
                                stats.tone === 'medio' ? 'bg-primary/20' :
                                    stats.tone === 'provocacao' ? 'bg-rose-500/20' :
                                        stats.tone === 'suporte' ? 'bg-blue-500/20' :
                                            stats.tone === 'disciplina' ? 'bg-amber-500/20' : 'bg-primary/20'
                            }`} />
                        <span className="text-4xl md:text-5xl relative z-10">
                            {stats.tone === 'elite' ? '👑' :
                                stats.tone === 'provocacao' ? '🎯' :
                                    stats.tone === 'suporte' ? '🛡️' :
                                        stats.tone === 'disciplina' ? '⚡' : '🔥'}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#1A1033]">
                        {stats.headline || `${stats.total_questoes} questões resolvidas`}
                    </h2>
                </div>

                {/* Grid Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50/50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Média de Acertos</p>
                            <p className="text-lg font-black italic text-[#1A1033] uppercase">{stats.media_geral}%</p>
                        </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Acertos</p>
                            <p className="text-lg font-black italic text-[#1A1033] uppercase">{stats.total_acertos}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Nível</p>
                            <p className="text-lg font-black italic text-[#1A1033] uppercase">{stats.nivel_usuario}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Phrase */}
                <div className="pt-2">
                    <p className="text-slate-400 italic font-serif text-lg md:text-xl font-medium tracking-tight">
                        "{stats.ultima_frase_exibida}"
                    </p>
                </div>
            </div>

            {/* Aesthetic Background Detail */}
            <div className="absolute bottom-0 right-0 p-8 opacity-[0.02] -rotate-12 translate-x-1/4 translate-y-1/4 select-none pointer-events-none">
                <Flame className="w-64 h-64 text-[#1A1033]" />
            </div>
        </motion.div>
    )
}
