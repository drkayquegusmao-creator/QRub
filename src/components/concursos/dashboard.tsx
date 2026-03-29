"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { useUserStats } from '@/store/use-user-stats'
import { useQuiz } from '@/store/use-quiz'
import { useConcursoTaxonomy } from '@/store/concursos/use-taxonomy'
import { 
    Zap, 
    TrendingUp, 
    BookOpen, 
    Sparkles, 
    CheckCircle2, 
    ArrowRight,
    Trophy,
    Target,
    FileText,
    Users,
    Calendar,
    AlertCircle,
    LayoutGrid,
    Search,
    Play,
    Timer,
    Flame
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'
import { ConcursoCard } from './concurso-card'

export function ConcursoDashboard() {
    const router = useRouter()
    const { user } = useAuth()
    const { stats, loadStats } = useUserStats()
    const { get_weekly_accuracy, load_responses, responses } = useQuiz()
    const { taxonomy, loadTaxonomy, getAreas } = useConcursoTaxonomy()

    useEffect(() => {
        if (user?.id) {
            loadStats(user.id, true)
            load_responses(user.id, true)
            loadTaxonomy()
        }
    }, [user?.id, loadStats, load_responses, loadTaxonomy])

    const areas = useMemo(() => getAreas(), [taxonomy])
    
    // Calculate Today's Stats and Overall
    const { todayTotal, todayCorrect, todayWrong, todayAccuracy, overallTotal, overallCorrect, overallWrong, overallAccuracy } = useMemo(() => {
        const todayStr = new Date().toDateString()
        const targetRes = responses.filter(r => !!r.is_concursos)
        
        // Today
        const todayRes = targetRes.filter(r => new Date(r.timestamp).toDateString() === todayStr)
        const tTotal = todayRes.length
        const tCorrect = todayRes.filter(r => r.is_correct).length
        const tWrong = tTotal - tCorrect
        const tAccuracy = tTotal > 0 ? Math.round((tCorrect / tTotal) * 100) : 0

        // Overall
        const oTotal = targetRes.length
        const oCorrect = targetRes.filter(r => r.is_correct).length
        const oWrong = oTotal - oCorrect
        const oAccuracy = oTotal > 0 ? Math.round((oCorrect / oTotal) * 100) : 0

        return { 
            todayTotal: tTotal, todayCorrect: tCorrect, todayWrong: tWrong, todayAccuracy: tAccuracy,
            overallTotal: oTotal, overallCorrect: oCorrect, overallWrong: oWrong, overallAccuracy: oAccuracy
        }
    }, [responses])

    const evolutionData = get_weekly_accuracy().map(d => ({ name: d.day, val: d.accuracy }))

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 pb-16"
        >
            {/* 1. WELCOME HEADER */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-3">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-indigo-200 dark:border-indigo-500/20"
                    >
                        <Sparkles className="w-3 h-3" /> Dashboard Alpha
                    </motion.div>
                    <div className="space-y-1">
                        <motion.h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Bom dia, <span className="text-indigo-600 dark:text-indigo-400">{user?.name?.split(' ')[0]}</span>
                        </motion.h1>
                        <div className="flex flex-wrap items-center gap-4 text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em]">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 text-indigo-500" />
                                {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Flame className="w-3 h-3 text-orange-500" />
                                {stats?.streak_current || 0} Dias de Constância
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => router.push('/concursos/agenda')}
                        className="px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 hover:bg-indigo-500 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <Play className="w-3 h-3 fill-white shrink-0" /> Executar Agenda
                    </button>
                </div>
            </header>

            {/* 2. HERO CARD - CONTEXTUAL DESTAQUE */}
            <motion.div 
                variants={itemVariants}
                className="relative bg-[#1A1033] rounded-[32px] p-8 md:p-10 text-white overflow-hidden group shadow-2xl border border-white/5"
            >
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000">
                    <Target className="w-[400px] h-[400px] text-white" />
                </div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 blur-[130px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(26,16,51,0.8)_100%)] z-1" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-10">
                        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md">
                            <Sparkles className="w-4 h-4" /> Recomendação Principal
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">
                                FOCO EM <br /> <span className="text-indigo-400">ADMINISTRATIVO</span>
                            </h3>
                            <p className="text-white/50 font-medium text-sm md:text-base max-w-lg leading-relaxed">
                                Seu desempenho em Atos Administrativos subiu 15%. Vamos consolidar com uma bateria de questões de nível Médio/Difícil?
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <button 
                                onClick={() => router.push('/concursos/setup')}
                                className="group flex items-center gap-3 bg-white text-[#1A1033] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-slate-100 transition-all active:scale-95"
                            >
                                Resolver Agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex items-center gap-2 text-white/30 text-[9px] font-black uppercase tracking-widest">
                                <Timer className="w-4 h-4 text-indigo-400" /> Aprox. 20 min
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 3. O QUE FAZER HOJE (MAIORIA DA TELA) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-end justify-between px-1">
                        <div className="space-y-0.5">
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">O que fazer hoje</h2>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Baseado no seu ciclo de estudos</p>
                        </div>
                        <button 
                            onClick={() => router.push('/concursos/plano')}
                            className="text-[9px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-600 transition-all pb-0.5 border-b border-indigo-500/20 hover:border-indigo-500"
                        >
                            Ver Plano Completo
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Task: Resolvendo Questões */}
                        <ConcursoCard 
                            title="Questões do Dia" 
                            subtitle="Meta Diária Estruturada"
                            icon={<FileText className="w-5 h-5" />}
                            badge={<span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-md text-[8px] font-bold uppercase tracking-widest border border-amber-500/20">Ação Urgente</span>}
                            onClick={() => router.push('/concursos/setup')}
                        >
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-tighter">
                                        <span className="text-slate-400">Progresso Atual</span>
                                        <span className="text-indigo-600">0/15 Resolvidas</span>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden border border-slate-200/50 dark:border-white/5">
                                        <motion.div initial={{ width: 0 }} animate={{ width: '0%' }} className="bg-indigo-500 h-full" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">Faltam 15 questões para bater sua meta diária.</p>
                                <div className="flex items-center gap-1.5 pt-1 text-[#1A1033] dark:text-white text-[9px] font-black uppercase tracking-widest group-hover:text-indigo-500 transition-colors">
                                    Iniciar Bateria <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </ConcursoCard>

                        {/* Task: Revisão Espaçada */}
                        <ConcursoCard 
                            title="Revisão Espaçada"
                            subtitle="Sua memória de longo prazo"
                            icon={<Zap className="w-5 h-5" />}
                            badge={<span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded-md text-[8px] font-bold uppercase tracking-widest border border-indigo-500/20">Agendado</span>}
                            onClick={() => router.push('/concursos/revisao')}
                            premium
                        >
                            <div className="space-y-5">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex -space-x-2.5">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 border border-white dark:border-[#1e1a2d] flex items-center justify-center text-indigo-600 font-black text-[9px]">
                                                {i === 3 ? '+2' : <CheckCircle2 className="w-3 h-3" />}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] font-black uppercase tracking-tighter text-[#1A1033] dark:text-white">5 assuntos expirando</p>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">Revise tópicos urgentes para garantir a retenção.</p>
                                <div className="flex items-center gap-1.5 pt-1 text-[#1A1033] dark:text-white text-[9px] font-black uppercase tracking-widest group-hover:text-indigo-500 transition-colors">
                                    Entrar no Fluxo <ArrowRight className="w-3 h-3 ml-auto group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </ConcursoCard>
                    </div>

                    {/* ATALHOS INTELIGENTES EM GRID REDUZIDO */}
                    <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">Acesso Rápido</h2>
                            <LayoutGrid className="w-4 h-4 text-slate-300" />
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { name: 'Simulados', icon: Layers, href: '/concursos/simulados', count: '12 Disp.' },
                                { name: 'Caderno', icon: BookMarked, href: '/concursos/cadernos', count: '45 Itens' },
                                { name: 'Disciplinas', icon: Library, href: '/concursos/disciplinas', count: '12 Matérias' },
                                { name: 'Ranking', icon: Trophy, href: '/concursos/ranking', count: 'Top 10%' },
                            ].map((item) => (
                                <button 
                                    key={item.name}
                                    onClick={() => router.push(item.href)}
                                    className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-4 rounded-[24px] hover:border-indigo-500/30 transition-all hover:-translate-y-1 flex flex-col items-center text-center gap-2 group"
                                >
                                    <div className="p-3 bg-slate-50 dark:bg-white/5 text-slate-400 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                                        <item.icon className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-[9px] font-black uppercase tracking-[0.1em] text-[#1A1033] dark:text-white block truncate">{item.name}</span>
                                        <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 block">{item.count}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. SIDEBAR DESTATUS & PENDÊNCIAS (1 COLUNA) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Performance Premium */}
                    <div className="bg-white dark:bg-[#1e1a2d] border border-slate-200 dark:border-white/5 rounded-[32px] p-8 shadow-sm relative overflow-hidden group">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">Métricas</h3>
                                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-500">
                                    <TrendingUp className="w-4 h-4" />
                                </div>
                            </div>
                            
                            <div className="space-y-8">
                                <div className="flex items-end justify-between">
                                    <div className="space-y-0.5">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Taxa de Acerto</p>
                                        <p className="text-4xl font-black italic text-[#1A1033] dark:text-white leading-none">{overallAccuracy}%</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-full text-[8px] font-black uppercase tracking-tighter border border-emerald-500/20">
                                            <TrendingUp className="w-2.5 h-2.5" /> +2.4%
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[100px] w-full mt-2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={evolutionData}>
                                            <defs>
                                                <linearGradient id="colorEvo2" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip contentStyle={{ backgroundColor: '#1A1033', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '9px' }} />
                                            <Area type="monotone" dataKey="accuracy" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEvo2)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                    <div className="space-y-3">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 border-b border-slate-100 dark:border-white/5 pb-1">Desempenho Hoje</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                                                <p className="text-sm font-black italic text-[#1A1033] dark:text-white tracking-tighter">{todayTotal}</p>
                                            </div>
                                            <div>
                                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Acerto</p>
                                                <p className="text-sm font-black italic text-emerald-500 tracking-tighter">{todayAccuracy}%</p>
                                            </div>
                                            <div>
                                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Certas</p>
                                                <p className="text-sm font-black italic text-[#1A1033] dark:text-white tracking-tighter">{todayCorrect}</p>
                                            </div>
                                            <div>
                                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Erradas</p>
                                                <p className="text-sm font-black italic text-rose-500 tracking-tighter">{todayWrong}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3 border-l border-slate-100 dark:border-white/5 pl-4">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 border-b border-slate-100 dark:border-white/5 pb-1">Geral</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                                                <p className="text-sm font-black italic text-[#1A1033] dark:text-white tracking-tighter">{overallTotal}</p>
                                            </div>
                                            <div>
                                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Acerto</p>
                                                <p className="text-sm font-black italic text-emerald-500 tracking-tighter">{overallAccuracy}%</p>
                                            </div>
                                            <div>
                                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Certas</p>
                                                <p className="text-sm font-black italic text-[#1A1033] dark:text-white tracking-tighter">{overallCorrect}</p>
                                            </div>
                                            <div>
                                                <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Erradas</p>
                                                <p className="text-sm font-black italic text-rose-500 tracking-tighter">{overallWrong}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bloco de Interrupções / Pendências */}
                    <div className="bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/10 rounded-[32px] p-8 flex flex-col gap-6">
                        <div className="flex items-center gap-2.5">
                            <AlertCircle className="w-5 h-5 text-rose-600" />
                            <h3 className="text-base font-black italic uppercase tracking-tighter text-rose-700 leading-none">Atrasos</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 group cursor-pointer" onClick={() => router.push('/concursos/agenda')}>
                                <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black uppercase text-rose-800 tracking-tight leading-tight">Direito Constitucional</p>
                                    <p className="text-[9px] font-medium text-rose-900/50">+2 dias de atraso.</p>
                                </div>
                            </li>
                        </ul>
                        <button 
                            onClick={() => router.push('/concursos/agenda')}
                            className="w-full py-3 rounded-xl bg-rose-500/10 text-rose-700 text-[9px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                        >
                            Regularizar Agora
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Internal icons needed for shortcuts
function Layers(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> }
function Library(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/><path d="M4 20h16"/></svg> }
function BookMarked(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-5z"/><path d="M6.5 15.5H20"/><path d="M9 2v8l3-2.25L15 10V2"/></svg> }
