"use client"

import { useAuth } from '@/store/use-auth'
import { useUserStats } from '@/store/use-user-stats'
import { motion } from 'framer-motion'
import { 
    Zap, 
    Target, 
    TrendingUp, 
    BarChart3, 
    ArrowRight,
    Search,
    Filter,
    Layers,
    Brain,
    Trophy,
    Flame
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'

export default function ConcursoDesempenhoPage() {
    const { user } = useAuth()
    const { stats } = useUserStats()

    const disciplines = [
        { name: 'Direito Constitucional', mastery: 85, accuracy: 92, trend: 'up', color: 'indigo' },
        { name: 'Direito Administrativo', mastery: 64, accuracy: 78, trend: 'stable', color: 'indigo' },
        { name: 'Língua Portuguesa', mastery: 92, accuracy: 95, trend: 'up', color: 'emerald' },
        { name: 'Direito Penal', mastery: 45, accuracy: 52, trend: 'down', color: 'rose' },
        { name: 'Direito Processual Penal', mastery: 58, accuracy: 65, trend: 'up', color: 'indigo' },
        { name: 'Informática', mastery: 72, accuracy: 80, trend: 'up', color: 'indigo' },
    ]

    return (
        <div className="space-y-8 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-500 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        <Target className="w-3.5 h-3.5" /> MASTER MAP
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Domínio por <span className="text-indigo-600 dark:text-indigo-400">Disciplina</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                            <Layers className="w-3 h-3 text-indigo-500" /> Proficiência Granular • 06 Áreas em Monitoramento
                        </p>
                    </div>
                </div>

                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                        type="text"
                        placeholder="BUSCAR DISCIPLINA..."
                        className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] py-4 pl-12 pr-6 font-black text-[10px] uppercase tracking-widest outline-none focus:ring-4 ring-indigo-500/5 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Mastery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                {disciplines.map((item, idx) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <ConcursoCard theme={item.mastery >= 80 ? 'emerald' : item.mastery >= 60 ? 'indigo' : 'active'} className="p-10 h-full flex flex-col justify-between group cursor-pointer hover:scale-[1.02]">
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        {item.mastery >= 80 ? <Trophy className="w-6 h-6 text-white" /> : <Brain className="w-6 h-6 text-white" />}
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Domínio</span>
                                        <span className="text-3xl font-black italic text-white leading-none">{item.mastery}%</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white leading-tight min-h-[3rem]">
                                    {item.name}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/60 tracking-widest">
                                        <span>Status</span>
                                        <span className="flex items-center gap-1">
                                            {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-300" />}
                                            {item.trend === 'up' ? 'Em Evolução' : item.trend === 'down' ? 'Revisão Necessária' : 'Estabilizado'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.mastery}%` }}
                                            className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className="mt-10 w-full py-4 rounded-2xl bg-white text-[#1A1033] text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                Detalhes do Domínio <ArrowRight className="w-4 h-4" />
                            </button>
                        </ConcursoCard>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Insights */}
            <div className="px-2">
                <ConcursoCard premium className="p-12 flex flex-col md:flex-row items-center justify-between gap-8 group">
                    <div className="space-y-4 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                            <Zap className="w-3.5 h-3.5" /> Insight de IA
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">
                            Ciclo de Alerta: <span className="text-rose-500 font-black">Direito Penal</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            Notamos um padrão de erros recorrentes em <span className="text-[#1A1033] dark:text-white font-bold italic">Teoria do Crime</span>. 
                            Sua última revisão foi há 23 dias. Recomendamos 40 questões para recuperação técnica.
                        </p>
                    </div>
                    <button className="px-12 py-7 bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center gap-3 shrink-0">
                        Injetar Carga de Reforço <Flame className="w-5 h-5 fill-white" />
                    </button>
                </ConcursoCard>
            </div>
        </div>
    )
}
