"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    BookMarked, 
    ArrowRight, 
    AlertCircle, 
    TrendingUp, 
    Sparkles, 
    RotateCcw,
    XCircle,
    CheckCircle2,
    Calendar,
    Search,
    Filter,
    Zap,
    History,
    ChevronRight
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function CadernosPagina() {
    const router = useRouter()
    const [view, setView] = useState<'overview' | 'detail'>('overview')

    return (
        <div className="space-y-8 pb-24">
            {/* Header Conectado ao Redesign */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-rose-200 dark:border-rose-500/20">
                        <AlertCircle className="w-3 h-3" /> Foco em Superação de Falhas
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Caderno de <span className="text-rose-600 dark:text-rose-400">Erros</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                            <History className="w-3 h-3 text-rose-500" /> 142 Erros Mapeados • Transformando Falhas em Pontos
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end pr-4 border-r border-slate-100 dark:border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Conversão Global</span>
                        <span className="text-2xl font-black italic text-[#1A1033] dark:text-white">42%</span>
                    </div>
                    <button 
                        onClick={() => router.push('/concursos/agenda')}
                        className="px-8 py-3.5 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-600/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
                    >
                        Limpar Pendências <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {view === 'overview' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* 1. Disciplinas em Destaque */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ErrorDisciplineCard label="Direito Administrativo" count={42} trend="+12" color="rose" />
                            <ErrorDisciplineCard label="Direito Constitucional" count={28} trend="-5" color="indigo" />
                            <ErrorDisciplineCard label="Processo Civil" count={30} trend="+2" color="amber" />
                            <ErrorDisciplineCard label="Língua Portuguesa" count={15} trend="-8" color="emerald" />
                        </div>

                        {/* 2. Estatística Lateral de Erros */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-[#1A1033] border border-slate-200 dark:border-white/5 rounded-[40px] p-8 shadow-sm">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#1A1033] dark:text-white mb-6">Frequência Semanal</h3>
                                <div className="space-y-6">
                                    {[
                                        { day: 'Seg', val: 40 },
                                        { day: 'Ter', val: 80 },
                                        { day: 'Qua', val: 60 },
                                        { day: 'Qui', val: 95 },
                                        { day: 'Sex', val: 30 }
                                    ].map((d) => (
                                        <div key={d.day} className="flex items-center gap-4">
                                            <span className="text-[9px] font-black text-slate-400 uppercase w-6">{d.day}</span>
                                            <div className="flex-1 h-2 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${d.val}%` }} className="h-full bg-indigo-500 rounded-full" />
                                            </div>
                                            <span className="text-[10px] font-black italic text-indigo-500">{d.val}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-10 rounded-[40px] bg-gradient-to-br from-[#1A1033] to-[#2D1F4D] text-white overflow-hidden relative group">
                                <Sparkles className="absolute -bottom-4 -right-4 w-32 h-32 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                                <div className="relative z-10 space-y-4">
                                    <h4 className="text-lg font-black italic uppercase tracking-tighter leading-none">Insight Estratégico</h4>
                                    <p className="text-xs font-medium leading-relaxed opacity-60">Seu maior volume de erros ocorre após 40 minutos de estudo contínuo. Sugerimos pausas curtas a cada 25 minutos.</p>
                                    <button className="text-[9px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2 group-hover:translate-x-1 transition-transform">Ler Análise Completa <ChevronRight className="w-3 h-3" /></button>
                                </div>
                            </div>
                        </div>

                        {/* 3. Lista de Erros Recentes (Full Width Table) */}
                        <div className="md:col-span-3">
                            <h2 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white px-2 mb-6">Últimas 10 Falhas Críticas</h2>
                            <ConcursoCard className="p-0 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                                        <tr className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                                            <th className="py-5 px-10 text-left w-12">#</th>
                                            <th className="py-5 px-6 text-left">Questão / Tópico</th>
                                            <th className="py-5 px-6 text-center">Banca</th>
                                            <th className="py-5 px-6 text-center">Data</th>
                                            <th className="py-5 px-10 text-right">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {[1, 2, 3].map((i) => (
                                            <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                                <td className="py-6 px-10 font-black italic text-slate-400 text-sm">0{i}</td>
                                                <td className="py-6 px-6">
                                                   <div className="space-y-0.5">
                                                        <p className="text-xs font-black uppercase tracking-tight text-[#1A1033] dark:text-white">Improbidade Administrativa - Atos</p>
                                                        <p className="text-[8px] font-black uppercase text-rose-500 tracking-widest">Confusão: Suspensão vs Perda</p>
                                                   </div>
                                                </td>
                                                <td className="py-6 px-6 text-center">
                                                    <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[8px] font-black text-slate-400 uppercase">FGV</span>
                                                </td>
                                                <td className="py-6 px-6 text-center text-[9px] font-bold text-slate-500">HOJE, 10:24</td>
                                                <td className="py-6 px-10 text-right">
                                                    <button onClick={() => router.push('/concursos/agenda')} className="p-3 rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100">
                                                        <RotateCcw className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </ConcursoCard>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ErrorDisciplineCard({ label, count, trend, color }: { label: string, count: number, trend: string, color: 'rose' | 'indigo' | 'amber' | 'emerald' }) {
    return (
        <ConcursoCard className="flex flex-col gap-6 group hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h4 className="text-lg font-black italic uppercase tracking-tighter leading-tight text-[#1A1033] dark:text-white group-hover:text-rose-600 transition-colors">{label}</h4>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Taxa de Conversão: 65%</p>
                </div>
                <div className={cn(
                    "p-3 rounded-2xl group-hover:scale-110 transition-all",
                    color === 'rose' ? "bg-rose-50 text-rose-500" : "bg-indigo-50 text-indigo-500"
                )}>
                    <XCircle className="w-5 h-5" />
                </div>
            </div>

            <div className="flex items-end justify-between">
                <div>
                   <span className="text-4xl font-black italic tracking-tighter text-[#1A1033] dark:text-white">{count}</span>
                   <span className="text-[10px] uppercase font-black opacity-30 ml-2">Questões</span>
                </div>
                <div className={cn(
                    "px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[9px] font-black uppercase tracking-tighter border",
                    trend.startsWith('+') ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
                )}>
                    {trend.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                    {trend}
                </div>
            </div>

            <button className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-[#1A1033] rounded-[24px] text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-xl">
                Resolver Erros <Zap className="w-4 h-4 fill-current" />
            </button>
        </ConcursoCard>
    )
}
