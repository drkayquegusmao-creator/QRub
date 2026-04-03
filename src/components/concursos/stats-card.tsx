"use client"

import { useUserStats } from '@/store/use-user-stats'
import { useAuth } from '@/store/use-auth'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, CheckCircle2, Trophy, Loader2, Zap } from 'lucide-react'

export function ConcursoUserStatsCard() {
    const { user } = useAuth()
    const { stats, loading, loadStats } = useUserStats()

    useEffect(() => {
        if (user?.id) {
            loadStats(user.id, true)
        }
    }, [user?.id, loadStats])

    if (loading && !stats) {
        return (
            <div className="w-full bg-white rounded-[40px] border-2 border-slate-100 p-10 flex items-center justify-center min-h-[200px] shadow-sm">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            </div>
        )
    }

    if (!stats || stats.total_questoes === 0) {
        return (
            <div className="w-full bg-white rounded-[40px] border-2 border-slate-100 p-10 shadow-sm relative overflow-hidden group">
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-500">
                        <Zap className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white">Pronto para Começar?</h3>
                        <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm">
                            Resolva sua primeira questão no ambiente de Concursos para ativar suas estatísticas.
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
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white">
                        {stats.total_questoes} Questões Resolvidas
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50/50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Média de Acertos</p>
                            <p className="text-lg font-black italic text-[#1A1033] dark:text-white uppercase">{stats.media_geral}%</p>
                        </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Fogo Atual</p>
                            <p className="text-lg font-black italic text-[#1A1033] dark:text-white uppercase">{stats.streak_current} Questões</p>
                        </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-3xl p-5 border border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Recorde</p>
                            <p className="text-lg font-black italic text-[#1A1033] dark:text-white uppercase">{stats.streak_max}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
