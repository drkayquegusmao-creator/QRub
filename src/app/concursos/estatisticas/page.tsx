"use client"

import { useAuth } from '@/store/use-auth'
import { useUserStats } from '@/store/use-user-stats'
import { useQuiz } from '@/store/use-quiz'
import { motion } from 'framer-motion'
import { 
    BarChart3, 
    TrendingUp, 
    ArrowUpRight, 
    PieChart, 
    Calendar, 
    Target,
    Zap,
    Trophy,
    CheckCircle,
    XCircle,
    Clock,
    Flame
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { 
    AreaChart, Area, BarChart, Bar, 
    XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, PieChart as RePieChart, Pie, Cell 
} from 'recharts'
import { cn } from '@/lib/utils'

export default function ConcursoEstatisticasPage() {
    const { user } = useAuth()
    const { stats } = useUserStats()
    const { get_weekly_accuracy } = useQuiz()

    const evolutionData = get_weekly_accuracy().map(d => ({ name: d.day, accuracy: d.accuracy }))
    
    const performanceData = [
        { name: 'Constitucional', correct: 85, total: 100 },
        { name: 'Administrativo', correct: 62, total: 100 },
        { name: 'Português', correct: 92, total: 100 },
        { name: 'Processo Civil', correct: 75, total: 100 },
        { name: 'Penal', correct: 45, total: 100 },
    ]

    const distributionData = [
        { name: 'Acertos', value: stats?.media_geral || 0, color: '#10B981' },
        { name: 'Erros', value: 100 - (stats?.media_geral || 0), color: '#EF4444' },
    ]

    return (
        <div className="space-y-8 pb-24 max-w-7xl mx-auto px-4 md:px-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-500 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        <BarChart3 className="w-3.5 h-3.5" /> HUB DE PERFORMANCE
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Métricas de <span className="text-indigo-600 dark:text-indigo-400">Alta Performance</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                            <Target className="w-3 h-3 text-indigo-500" /> Otimização de Trajetória • Dados Consolidados
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 p-1.5 rounded-[24px] shadow-sm">
                    <div className="px-5 py-3 flex flex-col items-center gap-0.5">
                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Streak</span>
                        <div className="flex items-center gap-1.5 text-[#1A1033] dark:text-white">
                           <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                           <span className="text-xl font-black italic">{stats?.streak_current || 0}</span>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-slate-100 dark:bg-white/10" />
                    <div className="px-5 py-3 flex flex-col items-center gap-0.5">
                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Acerto Geral</span>
                        <span className="text-xl font-black italic text-[#1A1033] dark:text-white">{stats?.media_geral || 0}%</span>
                    </div>
                </div>
            </header>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 1. CHART: EVOLUÇÃO SEMANAL */}
                <div className="lg:col-span-8">
                    <ConcursoCard premium className="h-full">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033]">Evolução de Retenção</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Taxa de acerto nos últimos 7 dias</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">+5.2%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={evolutionData}>
                                    <defs>
                                        <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} 
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                                        domain={[0, 100]}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1A1033', border: 'none', borderRadius: '16px', color: '#fff' }}
                                        itemStyle={{ color: '#818cf8', fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="accuracy" 
                                        stroke="#6366f1" 
                                        strokeWidth={4} 
                                        fillOpacity={1} 
                                        fill="url(#colorAcc)" 
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </ConcursoCard>
                </div>

                {/* 2. PIE CHART: DISTRIBUIÇÃO */}
                <div className="lg:col-span-4">
                    <ConcursoCard theme="indigo" className="h-full flex flex-col items-center justify-center text-center p-12">
                        <div className="h-[250px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={distributionData}
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={10}
                                        dataKey="value"
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </RePieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black italic text-white leading-none">{stats?.media_geral || 0}%</span>
                                <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] mt-2">Overall Score</span>
                            </div>
                        </div>
                        <div className="mt-8 space-y-4 w-full">
                            {distributionData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/70">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-white">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </ConcursoCard>
                </div>

                {/* 3. LISTA: DESEMPENHO POR DISCIPLINA */}
                <div className="lg:col-span-12">
                    <ConcursoCard className="p-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033]">Ranking por Disciplina</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sua proficiência em cada matéria da base</p>
                            </div>
                            <button className="px-6 py-3 bg-slate-50 text-[#1A1033] border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2">
                                Exportar Relatório <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-10">
                            {performanceData.map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs">
                                                {idx + 1}
                                            </div>
                                            <span className="text-sm font-black italic uppercase text-[#1A1033] tracking-tighter">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.correct}/{item.total} Questões</span>
                                            <span className={cn(
                                                "text-lg font-black italic",
                                                item.correct >= 80 ? "text-emerald-500" : item.correct >= 60 ? "text-indigo-600" : "text-orange-500"
                                            )}>{item.correct}%</span>
                                        </div>
                                    </div>
                                    <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.correct}%` }}
                                            className={cn(
                                                "h-full rounded-full shadow-lg",
                                                item.correct >= 80 ? "bg-emerald-500 shadow-emerald-500/20" : item.correct >= 60 ? "bg-indigo-600 shadow-indigo-600/20" : "bg-orange-500 shadow-orange-500/20"
                                            )}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </ConcursoCard>
                </div>
            </div>
            
            {/* Quick Insights Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Tempo Médio', val: '45s', icon: Clock, color: 'text-indigo-500' },
                    { label: 'Melhor Banca', val: 'IBFC', icon: Target, color: 'text-emerald-500' },
                    { label: 'Concursos Batidos', val: '08', icon: Trophy, color: 'text-amber-500' },
                    { label: 'Tópicos Críticos', val: '12', icon: Zap, color: 'text-rose-500' },
                ].map((insight, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-slate-100 p-8 rounded-[40px] flex items-center gap-5 shadow-sm"
                    >
                        <div className={cn("p-4 rounded-2xl bg-slate-50", insight.color)}>
                            <insight.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{insight.label}</span>
                            <span className="text-2xl font-black italic text-[#1A1033] tracking-tighter">{insight.val}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
