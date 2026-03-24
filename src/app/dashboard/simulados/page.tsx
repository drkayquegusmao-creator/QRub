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
    Microscope,
    Stethoscope,
    FileHeart
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function SaudeSimuladosPage() {
    const router = useRouter()
    const [view, setView] = useState<'available' | 'results'>('available')

    return (
        <div className="space-y-12 pb-32 animate-in fade-in duration-700">
            {/* Header Module */}
            <div className="bg-[#111827] rounded-b-[40px] -mx-8 -mt-8 p-12 pt-16 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-blue-500/5 blur-[80px] pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10 w-full">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Stethoscope className="w-4 h-4" /> 
                            Simuladores de Excelência
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                                Centro de <span className="text-emerald-500">Simulados</span>
                            </h1>
                            <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none mt-2">
                                <Activity className="w-4 h-4 text-emerald-500" /> Residência Médica & Revalida • Acurácia Global Estimada: 74%
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 backdrop-blur-sm p-1.5 rounded-3xl flex gap-1 shadow-xl">
                        <button 
                            onClick={() => setView('available')}
                            className={cn(
                                "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                view === 'available' ? "bg-white text-slate-900 shadow-xl" : "text-white/50 hover:text-white"
                            )}
                        >
                            Disponíveis
                        </button>
                        <button 
                            onClick={() => setView('results')}
                            className={cn(
                                "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                view === 'results' ? "bg-white text-slate-900 shadow-xl" : "text-white/50 hover:text-white"
                            )}
                        >
                            Performance
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {view === 'available' && (
                    <motion.div 
                        key="available"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {/* Custom Card Action */}
                        <div className="md:col-span-2 lg:col-span-3 mb-4">
                            <div className="p-10 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center gap-6 group hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all cursor-pointer">
                                <div className="w-20 h-20 rounded-[32px] bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-10 h-10 text-emerald-500" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#111827] dark:text-white">Gerar Simulado Personalizado</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Escolha as bancas, áreas e quantidade de questões a seu critério.</p>
                                </div>
                            </div>
                        </div>

                        <SimuladoCard 
                            title="SUS - USP SP" 
                            subtitle="Prova Oficial 2024" 
                            questions={120} 
                            time="5h 00min" 
                            difficulty="Difícil" 
                            status="Livre"
                            onClick={() => console.log('Iniciar Simulado USP')}
                        />
                        <SimuladoCard 
                            title="Enare - Geral" 
                            subtitle="Bloco Clínico e Cirúrgico" 
                            questions={100} 
                            time="4h 00min" 
                            difficulty="Médio" 
                            status="Livre"
                            onClick={() => console.log('Iniciar Simulado Enare')}
                        />
                        <SimuladoCard 
                            title="Revalida - Inep" 
                            subtitle="Prova Prática & Teórica V1" 
                            questions={100} 
                            time="5h 00min" 
                            difficulty="Elite" 
                            status="Livre"
                            onClick={() => console.log('Iniciar Revalida')}
                        />
                        
                        <div className="md:col-span-2 lg:col-span-3 mt-6">
                            <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-[40px] p-12 text-center group transition-all shadow-sm">
                                <Search className="w-12 h-12 text-emerald-500 mx-auto mb-6 group-hover:scale-110 transition-transform opacity-50 justify-center" />
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-400">Ver Outras 18 Provas do Banco</h3>
                                <button className="mt-4 text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2 mx-auto justify-center hover:translate-x-2 transition-transform">
                                    Filtrar por Banca Examinadora <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'results' && (
                    <motion.div 
                        key="results"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Ranking/Score Card */}
                            <div className="lg:col-span-5 rounded-[40px] bg-gradient-to-br from-[#111827] to-[#1e293b] p-12 text-white relative overflow-hidden group shadow-2xl">
                                <Trophy className="absolute -bottom-10 -right-10 w-64 h-64 text-emerald-500 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
                                <div className="relative z-10 space-y-12">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400/80">Nota Média Global</h3>
                                    
                                    <div className="flex flex-col">
                                       <span className="text-8xl font-black italic tracking-tighter leading-none mb-4 text-white">74.2</span>
                                       <span className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em] bg-white/10 px-4 py-2 rounded-full w-fit">Nota de Corte Estimada Anual: 78.0</span>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-slate-400">Taxa de Evolução</span>
                                            <span className="text-emerald-400">+4.2% ao mês</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full w-[74.2%] shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Statistics Grid */}
                            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-[40px] p-10 shadow-xl flex flex-col justify-between">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 inline-flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-emerald-500" />
                                        Tempo Médio de Prova
                                    </h4>
                                    <div className="flex items-end gap-3 font-black italic uppercase text-[#111827] dark:text-white leading-none">
                                        <p className="text-6xl tracking-tighter">02:14</p>
                                        <p className="text-xs pb-1 opacity-50 tracking-widest">MIN/ITEM</p>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100 dark:border-white/5 mt-8">
                                        <p className="text-[11px] font-bold leading-relaxed text-slate-500">O seu ritmo atual te deixa <span className="text-emerald-500">seguro</span>, restando cerca de 25 min de sobra na prova do Revalida.</p>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-[40px] p-10 shadow-xl flex flex-col justify-between">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 inline-flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                        Especialidade mais forte
                                    </h4>
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-[20px] bg-emerald-500/10 flex items-center justify-center">
                                            <FileHeart className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <div className="font-black italic uppercase text-[#111827] dark:text-white leading-none">
                                            <p className="text-2xl tracking-tighter mb-1">Clínica</p>
                                            <p className="text-4xl text-emerald-500">89%</p>
                                        </div>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100 dark:border-white/5 mt-8">
                                        <p className="text-[11px] font-bold leading-relaxed text-slate-500">Continue priorizando Cirurgia e Ginecologia como fraquezas no Nivelamento.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent History Table */}
                        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-[40px] overflow-hidden shadow-xl">
                            <div className="p-10 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex items-center gap-4">
                                <History className="w-6 h-6 text-emerald-500" />
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#111827] dark:text-white">Últimos Simulados Registrados</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {[1, 2, 3].map((i) => (
                                            <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                                <td className="py-10 px-12">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 bg-slate-100 dark:bg-[#111827] rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg border border-slate-200 dark:border-white/5">
                                                            <Activity className="w-8 h-8" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-xl font-black italic uppercase tracking-tighter text-[#111827] dark:text-white leading-none">SUS-SP 2024</p>
                                                            <p className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em]">Realizado em 12/03/24</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-10 px-8 text-center">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <span className="text-4xl font-black italic tracking-tighter text-[#111827] dark:text-white leading-none shadow-sm">94/120</span>
                                                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Acertos Totais</span>
                                                    </div>
                                                </td>
                                                <td className="py-10 px-8">
                                                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500/10 text-emerald-600 rounded-full border border-emerald-500/20">
                                                        <TrendingUp className="w-4 h-4" />
                                                        <span className="text-xs font-black italic tracking-widest">78% Final</span>
                                                    </div>
                                                </td>
                                                <td className="py-10 px-12 text-right">
                                                    <button className="px-8 py-4 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 ml-auto shadow-xl hover:scale-105 active:scale-95 transition-all">
                                                        Relatório Completo <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function SimuladoCard({ title, subtitle, questions, time, difficulty, status, onClick }: { title: string, subtitle: string, questions: number, time: string, difficulty: string, status: string, onClick: () => void }) {
    return (
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-[40px] p-8 flex flex-col gap-8 group hover:-translate-y-2 hover:shadow-2xl transition-all h-full">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <h4 className="text-2xl font-black italic uppercase tracking-tighter leading-none text-[#111827] dark:text-white transition-colors">{title}</h4>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/80 line-clamp-1">{subtitle}</p>
                </div>
                <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                    <Layers className="w-6 h-6" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-2">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Target className="w-3 h-3 text-emerald-400" /> Questões
                   </p>
                   <div className="text-xl font-black italic uppercase text-[#111827] dark:text-white leading-none">
                        {questions}
                   </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 space-y-2">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Clock className="w-3 h-3 text-emerald-400" /> Duração
                   </p>
                   <div className="text-xl font-black italic uppercase text-[#111827] dark:text-white leading-none">
                        {time}
                   </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase text-emerald-500 tracking-[0.2em]">{status}</span>
                </div>
                <div className={cn(
                    "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                    difficulty === 'Elite' || difficulty === 'Difícil' ? "border-rose-500/20 bg-rose-500/10 text-rose-500" :
                    "border-amber-500/20 bg-amber-500/10 text-amber-500"
                )}>
                   {difficulty}
                </div>
            </div>

            <button 
                onClick={onClick}
                className="w-full py-5 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl hover:translate-y-[-2px] hover:shadow-emerald-500/20 active:translate-y-0 relative overflow-hidden group/btn"
            >
                Iniciar Simulado 
                <ArrowRight className="w-4 h-4 text-emerald-500 group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    )
}
