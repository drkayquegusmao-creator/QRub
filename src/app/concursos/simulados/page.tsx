"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Layers, 
    Zap, 
    Trophy, 
    Target, 
    TrendingUp, 
    Sparkles, 
    Clock, 
    ArrowRight, 
    History,
    Search,
    Filter,
    Activity,
    Lock,
    Microscope
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function SimuladosPage() {
    const router = useRouter()
    const [view, setView] = useState<'available' | 'results'>('available')

    return (
        <div className="space-y-8 pb-24">
            {/* Header Pro-Concurso */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-200 dark:border-indigo-500/20">
                        <Trophy className="w-3 h-3" /> Arena de Competição
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Centro de <span className="text-indigo-600 dark:text-indigo-400">Simulados</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                            <Layers className="w-3 h-3 text-indigo-500" /> 12 Provas Realizadas • Média Global: 78.4%
                        </p>
                    </div>
                </div>

                <div className="bg-indigo-600 dark:bg-indigo-500 p-1 rounded-2xl flex gap-1 shadow-xl shadow-indigo-600/20">
                    <button 
                        onClick={() => setView('available')}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                            view === 'available' ? "bg-white text-indigo-600 shadow-sm" : "text-white/70 hover:text-white"
                        )}
                    >
                        Disponíveis
                    </button>
                    <button 
                        onClick={() => setView('results')}
                        className={cn(
                            "px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                            view === 'results' ? "bg-white text-indigo-600 shadow-sm" : "text-white/70 hover:text-white"
                        )}
                    >
                        Meus Resultados
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {view === 'available' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <SimuladoCard 
                            title="PCDF - Agente" 
                            subtitle="Simulado Geral v2.0" 
                            questions={120} 
                            time="4h 30min" 
                            difficulty="Hardcore" 
                            status="Livre"
                            onClick={() => router.push('/concursos/agenda')}
                        />
                        <SimuladoCard 
                            title="TSE Unificado" 
                            subtitle="Bloco de Direito Eleitoral" 
                            questions={50} 
                            time="2h 00min" 
                            difficulty="Médio" 
                            status="Livre"
                            onClick={() => router.push('/concursos/agenda')}
                        />
                        <SimuladoCard 
                            title="TJ-SP Escrevente" 
                            subtitle="Pós-Edital Acelerado" 
                            questions={100} 
                            time="3h 30min" 
                            difficulty="Elite" 
                            status="Livre"
                            onClick={() => router.push('/concursos/agenda')}
                        />
                        
                        <div className="md:col-span-2 lg:col-span-3">
                            <div className="bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-[40px] p-12 text-center group transition-all hover:bg-slate-100 dark:hover:bg-white/10">
                                <Search className="w-12 h-12 text-slate-300 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-400">Ver Outras 45 Provas do Banco</h3>
                                <button className="mt-4 text-[9px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2 mx-auto">Filtrar por Banca Examinadora <ArrowRight className="w-3 h-3" /></button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'results' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Ranking Card */}
                            <div className="lg:col-span-4 bg-[#1A1033] rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl">
                                <Trophy className="absolute -bottom-10 -right-10 w-64 h-64 text-white opacity-5 group-hover:rotate-12 transition-transform duration-1000" />
                                <div className="relative z-10 space-y-10">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Sua Performance Média</h3>
                                    <div className="flex flex-col">
                                       <span className="text-7xl font-black italic tracking-tighter leading-none mb-2 text-indigo-400">7.8</span>
                                       <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">Nota de Corte Estimada: 7.2</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 w-fit">
                                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">TOP 12% DO RANKING</span>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Statistics Grid */}
                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ConcursoCard>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Tempo Médio p/ Questão</h4>
                                    <div className="flex items-end gap-3 font-black italic uppercase text-[#1A1033] dark:text-white leading-none">
                                        <p className="text-5xl tracking-tighter">01:15</p>
                                        <p className="text-[10px] pb-1 opacity-50 tracking-widest">MIN/ITEM</p>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100 dark:border-white/5 mt-6">
                                        <p className="text-[10px] font-medium leading-relaxed text-slate-400 italic">Você é <span className="text-emerald-500 font-bold">15% mais rápido</span> que a média da maioria dos candidatos aprovados.</p>
                                    </div>
                                </ConcursoCard>

                                <ConcursoCard>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Taxa de Chute (Gap Analysis)</h4>
                                    <div className="flex items-end gap-3 font-black italic uppercase text-rose-500 leading-none">
                                        <p className="text-5xl tracking-tighter">18%</p>
                                        <p className="text-[10px] pb-1 opacity-50 tracking-widest text-slate-400">INCERTEZA</p>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100 dark:border-white/5 mt-6">
                                        <p className="text-[10px] font-medium leading-relaxed text-slate-400 italic hover:text-indigo-600 transition-colors cursor-pointer">Revisar questões marcadas como "Dúvida" para diminuir este gap.</p>
                                    </div>
                                </ConcursoCard>
                            </div>
                        </div>

                        {/* Recent History Table */}
                        <ConcursoCard className="p-0 overflow-hidden">
                            <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1033] dark:text-white">Seus 5 Últimos Simulados de Elite</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {[1, 2, 3].map((i) => (
                                            <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                                <td className="py-8 px-10">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-slate-100 dark:bg-white/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                            <Activity className="w-5 h-5" />
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <p className="text-sm font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">Simulado PCDF #0{i}</p>
                                                            <p className="text-[9px] font-black uppercase text-indigo-500 tracking-widest opacity-60">Realizado em 12/03/24</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-6 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-xl font-black italic tracking-tighter text-[#1A1033] dark:text-white leading-none">88/120</span>
                                                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em]">Acertos</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-6 text-center">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-full border border-emerald-200">
                                                        <TrendingUp className="w-3 h-3" />
                                                        <span className="text-[10px] font-black italic tracking-tighter">73% Final</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-10 text-right">
                                                    <button className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-[#1A1033] text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ml-auto shadow-lg hover:scale-105 transition-all">
                                                        Relatório <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </ConcursoCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function SimuladoCard({ title, subtitle, questions, time, difficulty, status, onClick }: { title: string, subtitle: string, questions: number, time: string, difficulty: string, status: string, onClick: () => void }) {
    return (
        <ConcursoCard className="flex flex-col gap-6 group hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h4 className="text-lg font-black italic uppercase tracking-tighter leading-tight text-[#1A1033] dark:text-white group-hover:text-indigo-600 transition-colors">{title}</h4>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">{subtitle}</p>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <Layers className="w-4 h-4" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">Volume</p>
                   <div className="flex items-center gap-1.5 text-xs font-black italic uppercase text-[#1A1033] dark:text-white">
                        <Target className="w-3 h-3 text-indigo-400" /> {questions} <span className="text-[8px] opacity-40 not-italic uppercase font-bold">Itens</span>
                   </div>
                </div>
                <div className="space-y-1">
                   <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">Duração</p>
                   <div className="flex items-center gap-1.5 text-xs font-black italic uppercase text-[#1A1033] dark:text-white">
                        <Clock className="w-3 h-3 text-indigo-400" /> {time}
                   </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">{status}</span>
                </div>
                <div className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200/50 text-[8px] font-black uppercase text-slate-400 tracking-tighter">
                   NÍVEL {difficulty.toUpperCase()}
                </div>
            </div>

            <button 
                onClick={onClick}
                className="w-full py-4 bg-indigo-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 group-hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
                Participar <Zap className="w-4 h-4 fill-white shrink-0" />
            </button>
        </ConcursoCard>
    )
}
