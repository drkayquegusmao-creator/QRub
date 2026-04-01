"use client"

import { useState, useEffect } from 'react'
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
    ChevronRight,
    Brain,
    MessageSquare,
    Activity,
    Target,
    Loader2
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { fetchErrorDashboardStats, UserErrorStats } from '@/lib/concursos/error-service'
import { supabase } from '@/lib/supabase'

export default function CadernosPagina() {
    const router = useRouter()
    const { user } = useAuth()
    const [stats, setStats] = useState<UserErrorStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [recentErrors, setRecentErrors] = useState<any[]>([])

    useEffect(() => {
        if (!user?.id) return
        
        const load = async () => {
            const [s, { data: list }] = await Promise.all([
                fetchErrorDashboardStats(user.id),
                supabase
                    .from('concurso_user_errors')
                    .select('id, question_id, error_cause, created_at, disciplina_id')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(10)
            ])
            setStats(s)
            setRecentErrors(list || [])
            setLoading(false)
        }
        load()
    }, [user])

    const curaIndex = stats ? (stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0) : 0

    if (loading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-8 pb-32">
            {/* Header Conectado ao Redesign */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-rose-200 dark:border-rose-500/20">
                        <AlertCircle className="w-3 h-3" /> Módulo de Reprocessamento Cognitivo
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Caderno de <span className="text-rose-600 dark:text-rose-400">Erros</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                            <History className="w-3 h-3 text-rose-500" /> {stats?.total || 0} Erros Mapeados • Transformando Falhas em Pontos
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end pr-4 border-r border-slate-100 dark:border-white/5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Índice de Cura</span>
                        <span className="text-2xl font-black italic text-emerald-500">{curaIndex}%</span>
                    </div>
                    <button 
                        onClick={() => router.push('/concursos/quiz/expurgo')} // Need to implement this route mode
                        className="px-8 py-3.5 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-600/20 hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
                    >
                        Iniciar Sessão de Expurgo <RotateCcw className="w-4 h-4" />
                    </button>
                </div>
            </header>

            <AnimatePresence mode="wait">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {/* Pie Chart / Cause Distribution */}
                    <div className="md:col-span-1 bg-white dark:bg-[#1A1033] border border-slate-200 dark:border-white/5 rounded-[40px] p-10 space-y-8">
                        <h3 className="text-sm font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white flex items-center gap-3">
                            <Brain className="w-5 h-5 text-rose-500" /> Origem das Falhas
                        </h3>
                        <div className="space-y-4">
                            <CauseStat label="Conhecimento" count={stats?.causes.conhecimento || 0} total={stats?.total || 1} color="bg-rose-500" icon={BookMarked} />
                            <CauseStat label="Desatenção" count={stats?.causes.desatencao || 0} total={stats?.total || 1} color="bg-amber-500" icon={Activity} />
                            <CauseStat label="Interpretação" count={stats?.causes.interpretacao || 0} total={stats?.total || 1} color="bg-blue-500" icon={MessageSquare} />
                            <CauseStat label="Decoreba" count={stats?.causes.decoreba || 0} total={stats?.total || 1} color="bg-purple-500" icon={Zap} />
                        </div>

                        <div className="pt-8 border-t border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                <span>Total de Falhas</span>
                                <span className="text-rose-500">{stats?.total || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Stats Disciplines */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {stats?.topDisciplines.map((d, index) => (
                                <ErrorDisciplineCard key={d.id} label={`Disciplina ${index + 1}`} count={d.count} trend="+0%" color={index % 2 === 0 ? 'rose' : 'indigo'} />
                            )) || <p className="text-slate-400 text-sm italic">Nenhum erro registrado ainda.</p>}
                        </div>

                        <div className="p-10 rounded-[40px] bg-gradient-to-br from-[#1A1033] to-[#2D1F4D] text-white overflow-hidden relative group">
                            <Sparkles className="absolute -bottom-4 -right-4 w-32 h-32 opacity-5 group-hover:scale-110 transition-transform duration-1000" />
                            <div className="relative z-10 space-y-6">
                                <h4 className="text-xl font-black italic uppercase tracking-tighter leading-none">Status de Recuperação: <span className="text-emerald-400">{curaIndex < 50 ? 'Crítico' : 'Evoluindo'}</span></h4>
                                <p className="text-xs font-medium leading-relaxed opacity-60 max-w-lg">
                                    O Índice de Cura representa as questões que você errou, mas já acertou duas vezes seguidas em sessões de expurgo. 
                                    Mantenha este índice acima de 80% para garantir uma base sólida.
                                </p>
                                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${curaIndex}%` }} className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Errors Table */}
                    <div className="md:col-span-3">
                        <div className="flex items-center justify-between px-2 mb-6">
                            <h2 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white">Últimas Falhas Críticas</h2>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:text-rose-600 transition-colors">Ver Histórico Completo <ChevronRight className="w-4 h-4" /></button>
                        </div>
                        <ConcursoCard className="p-0 overflow-hidden border-2 border-slate-100/50">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                                    <tr className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                        <th className="py-6 px-10">Questão</th>
                                        <th className="py-6 px-6">Causa Selecionada</th>
                                        <th className="py-6 px-6">Data</th>
                                        <th className="py-6 px-6">Status</th>
                                        <th className="py-6 px-10 text-right">Reprocessar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {recentErrors.map((err, i) => (
                                        <tr key={err.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                            <td className="py-8 px-10">
                                               <div className="space-y-1">
                                                    <p className="text-xs font-black uppercase tracking-tight text-[#1A1033] dark:text-white">Questão #{err.question_id.slice(-8).toUpperCase()}</p>
                                                    <p className="text-[10px] font-medium text-slate-400">Erro em {new Date(err.created_at).toLocaleDateString()}</p>
                                               </div>
                                            </td>
                                            <td className="py-8 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn("w-2 h-2 rounded-full", 
                                                        err.error_cause === 'conhecimento' ? 'bg-rose-500' :
                                                        err.error_cause === 'desatencao' ? 'bg-amber-500' :
                                                        err.error_cause === 'interpretacao' ? 'bg-blue-500' : 'bg-purple-500'
                                                    )} />
                                                    <span className="text-[10px] font-black uppercase text-slate-600 dark:text-slate-300">{err.error_cause}</span>
                                                </div>
                                            </td>
                                            <td className="py-8 px-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {new Date(err.created_at).toLocaleDateString('pt-BR')}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-8 px-6">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border",
                                                    err.is_resolved ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"
                                                )}>
                                                    {err.is_resolved ? 'Curado' : 'Pendente'}
                                                </span>
                                            </td>
                                            <td className="py-8 px-10 text-right">
                                                <button className="p-4 rounded-2xl bg-[#1A1033] text-white shadow-xl hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100">
                                                    <RotateCcw className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentErrors.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Parabéns! Nenhum erro registrado.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </ConcursoCard>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

function CauseStat({ label, count, total, color, icon: Icon }: { label: string, count: number, total: number, color: string, icon: any }) {
    const pct = Math.round((count / total) * 100)
    return (
        <div className="group space-y-3">
            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-tighter">
                <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                    <Icon className={cn("w-4 h-4", color.replace('bg-', 'text-'))} />
                    {label}
                </div>
                <span className="text-[#1A1033] dark:text-white">{count} ({pct}%)</span>
            </div>
            <div className="w-full h-1.5 bg-slate-50 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className={cn("h-full rounded-full transition-all", color)} />
            </div>
        </div>
    )
}

function ErrorDisciplineCard({ label, count, trend, color }: { label: string, count: number, trend: string, color: 'rose' | 'indigo' | 'amber' | 'emerald' }) {
    return (
        <ConcursoCard className="flex flex-col gap-6 group hover:-translate-y-1 transition-all border-none bg-white dark:bg-[#1A1033] relative overflow-hidden">
            <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[80px] -z-10", color === 'rose' ? 'bg-rose-500/10' : 'bg-indigo-500/10')} />
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h4 className="text-xl font-black italic uppercase tracking-tighter leading-tight text-[#1A1033] dark:text-white group-hover:text-rose-600 transition-colors">{label}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gravidade: <span className="text-rose-500">Alta</span></p>
                </div>
                <div className={cn(
                    "p-4 rounded-3xl group-hover:scale-110 transition-all shadow-sm",
                    color === 'rose' ? "bg-rose-50 text-rose-500" : "bg-indigo-50 text-indigo-500"
                )}>
                    <XCircle className="w-6 h-6" />
                </div>
            </div>

            <div className="flex items-end justify-between">
                <div>
                   <span className="text-5xl font-black italic tracking-tighter text-[#1A1033] dark:text-white">{count}</span>
                   <span className="text-[11px] uppercase font-black opacity-30 ml-2">Questões</span>
                </div>
                <div className={cn(
                    "px-4 py-2 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter border-2 shadow-sm",
                    trend.startsWith('+') ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                )}>
                    {trend.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                    {trend}
                </div>
            </div>

            <button className="w-full py-5 bg-[#1A1033] dark:bg-white text-white dark:text-[#1A1033] rounded-[28px] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-xl shadow-[#1A1033]/10">
                Reprocessar Falhas <Zap className="w-5 h-5 fill-current" />
            </button>
        </ConcursoCard>
    )
}
