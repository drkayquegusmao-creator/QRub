"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
    Trophy, 
    ChevronLeft, 
    TrendingUp, 
    AlertTriangle, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    Target,
    Brain,
    Share2,
    RotateCcw,
    Zap,
    BarChart3,
    ArrowUpRight,
    Sparkles
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { fetchUserSimuladoResults, SimuladoResult } from '@/lib/simulado-service'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'

export default function ResultDetailPage() {
    const router = useRouter()
    const { id } = useParams()
    const [result, setResult] = useState<SimuladoResult | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadResult() {
            setLoading(true)
            const allResults = await fetchUserSimuladoResults()
            const found = allResults.find(r => r.id === id)
            setResult(found || null)
            setLoading(false)
        }
        loadResult()
    }, [id])

    if (loading) return <div className="p-24 text-center">Carregando análise...</div>
    if (!result) return <div className="p-24 text-center">Relatório não encontrado.</div>

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-32">
            {/* Minimal Navigation */}
            <div className="flex items-center justify-between">
                <button 
                    onClick={() => router.push('/concursos/simulados?view=results')}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Voltar ao Histórico
                </button>
                <div className="flex items-center gap-3">
                    <button className="p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-400">
                        <Share2 className="w-4 h-4" />
                    </button>
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20">
                        Baixar PDF
                    </button>
                </div>
            </div>

            {/* Hero Summary */}
            <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        <Trophy className="w-3 h-3" /> Relatório de Performance
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.8]">
                        Análise <span className="text-indigo-600">Estratégica</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.1em]">{result.title} • Realizado em {result.date}</p>
                </div>

                <div className="lg:col-span-5 bg-[#1A1033] rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Nota Líquida</span>
                        <h2 className="text-8xl font-black italic tracking-tighter text-indigo-400">{(result.score / 10).toFixed(1)}</h2>
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex flex-col">
                                <span className="text-xl font-black italic text-emerald-400 leading-none">{result.correct}</span>
                                <span className="text-[8px] font-black uppercase opacity-40 tracking-widest">Acertos</span>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-xl font-black italic text-rose-500 leading-none">{result.errors}</span>
                                <span className="text-[8px] font-black uppercase opacity-40 tracking-widest">Erros</span>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-xl font-black italic text-white leading-none">{result.blanks}</span>
                                <span className="text-[8px] font-black uppercase opacity-40 tracking-widest">Brancos</span>
                            </div>
                        </div>
                    </div>
                    <BarChart3 className="absolute -bottom-10 -right-10 w-48 h-48 text-white opacity-5" />
                </div>
            </header>

            {/* Strategic Analysis Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ConcursoCard className="bg-emerald-500/5 border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-emerald-500 text-white rounded-2xl">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1A1033] dark:text-white"> Competitive Edge</h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400 mb-6">Você acertou <span className="text-emerald-500 font-bold">{result.strategic?.hardHit.length || 0} questões de nível difícil</span>. Isso te coloca à frente de 85% dos candidatos em temas complexos.</p>
                </ConcursoCard>

                <ConcursoCard className="bg-rose-500/5 border-rose-500/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-rose-500 text-white rounded-2xl">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1A1033] dark:text-white">Alerta de Atenção</h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400 mb-6">Houve <span className="text-rose-500 font-bold">{result.strategic?.easyMissed.length || 0} erros em temas fáceis</span>. Estes são pontos "caros" que não podem ser perdidos no edital.</p>
                </ConcursoCard>

                <ConcursoCard className="bg-indigo-500/5 border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-indigo-500 text-white rounded-2xl">
                            <Brain className="w-5 h-5" />
                        </div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1A1033] dark:text-white">Cognição & Tempo</h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400 mb-6">Seu tempo médio foi de <span className="text-indigo-500 font-bold">75s por item</span>. Velocidade ideal para garantir a revisão final do cartão-resposta.</p>
                </ConcursoCard>
            </div>

            {/* Performance by Discipline and Theme */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ConcursoCard>
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1033] dark:text-white flex items-center gap-2">
                            <Target className="w-4 h-4 text-indigo-500" /> Domínio por Disciplina
                        </h3>
                    </div>
                    <div className="space-y-8">
                        {Object.entries(result.disciplineScores).map(([name, stats]: [string, any]) => {
                            const pct = Math.round((stats.correct / stats.total) * 100)
                            return (
                                <div key={name} className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white">{name}</p>
                                            <p className="text-[10px] font-bold text-slate-400">{stats.correct}/{stats.total} ACERTOS</p>
                                        </div>
                                        <span className={cn(
                                            "text-xl font-black italic italic",
                                            pct >= 70 ? "text-emerald-500" : "text-rose-500"
                                        )}>{pct}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${pct}%` }}
                                            className={cn(
                                                "h-full rounded-full",
                                                pct >= 70 ? "bg-emerald-500" : "bg-rose-500"
                                            )}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ConcursoCard>

                <ConcursoCard>
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1033] dark:text-white flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" /> Micro-Desempenho (Temas)
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(result.themeScores).map(([name, stats]: [string, any]) => {
                            const pct = Math.round((stats.correct / stats.total) * 100)
                            return (
                                <div key={name} className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-tighter text-[#1A1033] dark:text-white">{name}</p>
                                        <div className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                            <span className="text-[8px] font-bold text-slate-400 tracking-widest">{stats.total} QUESTÕES</span>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-lg font-black italic",
                                        pct >= 70 ? "text-emerald-500" : "text-slate-400"
                                    )}>{pct}%</span>
                                </div>
                            )
                        })}
                    </div>
                </ConcursoCard>
            </div>

            {/* Next Steps CTA */}
            <div className="bg-indigo-600 rounded-[56px] p-16 text-white text-center space-y-8 shadow-3xl shadow-indigo-600/30 relative overflow-hidden">
                <Sparkles className="absolute top-10 right-10 w-24 h-24 text-white opacity-10 animate-pulse" />
                <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                    <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Evoluir não é opcional</h3>
                    <p className="text-lg font-medium text-white/70 leading-relaxed">
                        Identificamos {result.strategic?.easyMissed.length || 0} lacunas críticas. Recomendamos iniciar uma sessão de 
                        <span className="text-white font-black italic"> Nivelamento de Emergência</span> agora.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6">
                        <button 
                            onClick={() => router.push('/concursos/nivelamento')}
                            className="w-full md:w-auto px-12 py-5 bg-white text-indigo-600 rounded-3xl text-sm font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                        >
                            INICIAR NIVELAMENTO
                        </button>
                        <button 
                            onClick={() => router.push(`/concursos/simulados/arena/${id}`)}
                            className="w-full md:w-auto px-12 py-5 bg-indigo-500 text-white border border-white/20 rounded-3xl text-sm font-black uppercase tracking-widest hover:bg-indigo-400 transition-all"
                        >
                            REFAZER SIMULADO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
