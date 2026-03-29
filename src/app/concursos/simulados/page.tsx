"use client"

import { useState, useEffect } from 'react'
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
    Activity,
    Search,
    BrainCircuit,
    Filter,
    X,
    CheckCircle2,
    Settings2
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { 
    fetchAvailableSimulados, 
    fetchUserSimuladoResults, 
    Simulado, 
    SimuladoResult, 
    generateBlindSpotSimulado 
} from '@/lib/simulado-service'
import { getSimuladosGlobalStats } from '@/lib/concursos/performance-service'
import { supabase } from '@/lib/supabase'

export default function SimuladosPage() {
    const router = useRouter()
    const [view, setView] = useState<'available' | 'results'>('available')
    const [simulados, setSimulados] = useState<Simulado[]>([])
    const [results, setResults] = useState<SimuladoResult[]>([])
    const [blindSpot, setBlindSpot] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeSession, setActiveSession] = useState<any>(null)
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)
    const [globalSimStats, setGlobalSimStats] = useState({ avgTimePerQuestion: 0, uncertaintyRate: 0, totalSimulados: 0 })

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            
            const [avail, hist, blind, session, globalStats] = await Promise.all([
                fetchAvailableSimulados(),
                fetchUserSimuladoResults(),
                generateBlindSpotSimulado(),
                user ? supabase.from('concurso_user_simulado_sessions').select('*').eq('user_id', user.id).single() : Promise.resolve({ data: null }),
                user ? getSimuladosGlobalStats(user.id) : Promise.resolve({ avgTimePerQuestion: 0, uncertaintyRate: 0, totalSimulados: 0 })
            ])
            
            setSimulados(avail)
            setResults(hist)
            setBlindSpot(blind)
            setActiveSession(session.data)
            setGlobalSimStats(globalStats)
            setLoading(false)
        }
        loadData()
    }, [])

    const avgScore = results.length > 0 
        ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length) 
        : 0

    const bestScore = results.length > 0
        ? Math.max(...results.map(r => r.score))
        : 0

    const lastSimulado = results[0]

    // Helper to format seconds to mm:ss
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

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
                            <Layers className="w-3 h-3 text-indigo-500" /> {results.length} Provas Realizadas • Média Global: {avgScore}%
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsConfigModalOpen(true)}
                        className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-indigo-500 hover:scale-105 transition-all shadow-sm"
                    >
                        <Settings2 className="w-5 h-5" />
                    </button>
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
                </div>
            </header>

            {/* Resume Session Banner */}
            {activeSession && (
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-emerald-500 p-6 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-emerald-500/20"
                >
                    <div className="flex items-center gap-4 text-center md:text-left">
                        <div className="p-4 bg-white/20 rounded-2xl">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">SESSÃO PENDENTE DETECTADA</p>
                            <h4 className="text-xl font-black italic uppercase tracking-tighter">Retomar Simulado Antecipado</h4>
                        </div>
                    </div>
                    <button 
                        onClick={() => router.push(`/concursos/simulados/arena/${activeSession.package_id || 'resume'}`)}
                        className="px-10 py-4 bg-white text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                    >
                        RETOMAR AGORA
                    </button>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {view === 'available' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {/* IA Blind Spot Card */}
                        {blindSpot && (
                            <ConcursoCard className="flex flex-col gap-6 group bg-indigo-50 dark:bg-indigo-500/5 border-indigo-200/50 dark:border-indigo-500/20 shadow-xl shadow-indigo-500/10">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[8px] font-black uppercase rounded-md animate-pulse">IA Engine</span>
                                        </div>
                                        <h4 className="text-lg font-black italic uppercase tracking-tighter leading-tight text-[#1A1033] dark:text-white group-hover:text-indigo-600 transition-colors">Pontos Cegos</h4>
                                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Baseado em seus erros recentes</p>
                                    </div>
                                    <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/30">
                                        <BrainCircuit className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-black italic uppercase text-[#1A1033] dark:text-white">
                                                <Target className="w-3 h-3 text-indigo-400" /> {blindSpot.questionsCount} <span className="text-[8px] opacity-40 not-italic uppercase font-bold">Gaps</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs font-black italic uppercase text-[#1A1033] dark:text-white">
                                                <Clock className="w-3 h-3 text-indigo-400" /> {blindSpot.durationMinutes} min
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => router.push(`/concursos/simulados/arena/${blindSpot.id}`)}
                                    className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95"
                                >
                                    Corrigir Gaps <Zap className="w-4 h-4 fill-current shrink-0" />
                                </button>
                            </ConcursoCard>
                        )}

                        {simulados.map((sim) => (
                            <SimuladoCard 
                                key={sim.id}
                                title={sim.title} 
                                subtitle={sim.subtitle} 
                                questions={sim.questionsCount} 
                                time={`${Math.floor(sim.durationMinutes / 60)}h ${sim.durationMinutes % 60}min`} 
                                difficulty={sim.difficulty} 
                                status={sim.status}
                                onClick={() => router.push(`/concursos/simulados/arena/${sim.id}`)}
                            />
                        ))}
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
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Sua Melhor Nota</h3>
                                    <div className="flex flex-col">
                                       <span className="text-7xl font-black italic tracking-tighter leading-none mb-2 text-indigo-400">{(bestScore / 10).toFixed(1)}</span>
                                       <span className="text-[10px] font-black uppercase opacity-60 tracking-widest">Média do Último: {(lastSimulado?.score || 0) / 10}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 w-fit">
                                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                            {avgScore > 70 ? 'TOP 12% DO RANKING' : 'MÉDIA ACIMA DA NACIONAL'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Statistics Grid */}
                            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ConcursoCard>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Tempo Médio p/ Questão</h4>
                                    <div className="flex items-end gap-3 font-black italic uppercase text-[#1A1033] dark:text-white leading-none">
                                        <p className="text-5xl tracking-tighter">{formatTime(globalSimStats.avgTimePerQuestion)}</p>
                                        <p className="text-[10px] pb-1 opacity-50 tracking-widest">MIN/ITEM</p>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100 dark:border-white/5 mt-6">
                                        <p className="text-[10px] font-medium leading-relaxed text-slate-400 italic">
                                            {globalSimStats.avgTimePerQuestion > 0 ? (
                                                <>Você é <span className="text-emerald-500 font-bold">eficiente</span> no gerenciamento do tempo.</>
                                            ) : (
                                                <>Sem dados médios suficientes.</>
                                            )}
                                        </p>
                                    </div>
                                </ConcursoCard>

                                <ConcursoCard>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Taxa de Incerteza (Dúvidas)</h4>
                                    <div className="flex items-end gap-3 font-black italic uppercase text-rose-500 leading-none">
                                        <p className="text-5xl tracking-tighter">{globalSimStats.uncertaintyRate}%</p>
                                        <p className="text-[10px] pb-1 opacity-50 tracking-widest text-slate-400">INCERTEZA</p>
                                    </div>
                                    <div className="pt-8 border-t border-slate-100 dark:border-white/5 mt-6">
                                        <p className="text-[10px] font-medium leading-relaxed text-slate-400 italic">
                                            {globalSimStats.uncertaintyRate > 15 ? (
                                                <>Atenção: Procure revisar tópicos marcados com <span className="text-rose-500 font-bold">dúvida</span>.</>
                                            ) : (
                                                <>Excelente confiança na resolução das provas.</>
                                            )}
                                         </p>
                                    </div>
                                </ConcursoCard>
                            </div>
                        </div>

                        {/* Recent History Table */}
                        <ConcursoCard className="p-0 overflow-hidden">
                            <div className="p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/5 flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1033] dark:text-white">Histórico Versão Definitiva</h3>
                                <button className="text-[8px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-1.5">
                                    VER TODOS <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {results.map((res) => (
                                            <tr key={res.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                                <td className="py-8 px-10">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-slate-100 dark:bg-white/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                            <Activity className="w-5 h-5" />
                                                        </div>
                                                        <div className="space-y-0.5">
                                                            <p className="text-sm font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">{res.title}</p>
                                                            <p className="text-[9px] font-black uppercase text-indigo-500 tracking-widest opacity-60">Realizado em {res.date}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-6 text-center">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-xl font-black italic tracking-tighter text-[#1A1033] dark:text-white leading-none">{res.correct}/{res.total}</span>
                                                        <span className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em]">Acertos</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-6 text-center">
                                                    <div className={cn(
                                                        "inline-flex items-center gap-2 px-3 py-1 rounded-full border",
                                                        res.score >= 70 ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-200" : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 border-rose-200"
                                                    )}>
                                                        <TrendingUp className="w-3 h-3" />
                                                        <span className="text-[10px] font-black italic tracking-tighter">{res.score}% Líquido</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 px-10 text-right">
                                                    <button 
                                                        onClick={() => router.push(`/concursos/simulados/resultados/${res.id}`)}
                                                        className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-[#1A1033] text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ml-auto shadow-lg hover:scale-105 transition-all"
                                                    >
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

            {/* Configurator Modal */}
            <AnimatePresence>
                {isConfigModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsConfigModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-[#1A1033] w-full max-w-2xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="p-10 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white">Custom Simulator</h3>
                                    <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">Configure sua estratégia de prova</p>
                                </div>
                                <button onClick={() => setIsConfigModalOpen(false)} className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-10 space-y-10">
                                {/* Option Selection UI */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Banca Examinadora</label>
                                        <select className="w-full p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-bold focus:ring-2 ring-indigo-500 transition-all outline-none">
                                            <option>CEBRASPE (1 anula 1)</option>
                                            <option>FGV (Interpretação)</option>
                                            <option>FCC (Conteúdo Direto)</option>
                                            <option>VUNESP (Médio/Previsível)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Volume de Itens</label>
                                        <div className="flex gap-2">
                                            {[20, 50, 100].map(v => (
                                                <button key={v} className="flex-1 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-black">{v}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    className="w-full py-5 bg-indigo-600 text-white rounded-[24px] text-xs font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
                                >
                                    GERAR SIMULADO <Sparkles className="w-5 h-5 fill-white" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
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
