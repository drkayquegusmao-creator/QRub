"use client"

import { useAuth } from '@/store/use-auth'
import { useQuiz } from '@/store/use-quiz'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Zap,
    Target,
    Flame,
    Clock,
    BarChart3,
    TrendingUp,
    Activity,
    ChevronRight,
    ArrowRight,
    AlertCircle,
    Play,
    CheckCircle2,
    Sparkles,
    BrainCircuit,
    Crown
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSRS } from '@/store/use-srs'
import { SectionHeader, Divider } from '@/components/dashboard-ui'
import { PaywallModal } from '@/components/paywall-modal'
import { PlansModal } from '@/components/plans-modal'
import { SRSDashboardWidget } from '@/components/srs-dashboard-widget'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts'
import { COURSES } from '@/lib/data-mock'
import { useState, useMemo, useEffect } from 'react'

export default function StudentDashboard() {
    const router = useRouter()
    const { user } = useAuth()
    const { get_intelligent_action, get_pending_tasks, get_critical_points } = useSRS()
    const { responses, get_accuracy_by_specialty, get_weekly_accuracy, load_responses } = useQuiz()
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'total'>('7d')
    const [showPaywall, setShowPaywall] = useState(false)
    const [showPlansModal, setShowPlansModal] = useState(false)

    // Load responses on mount
    useEffect(() => {
        if (user?.id) {
            load_responses(user.id)
        }
    }, [user?.id])

    // Calculated metrics
    const totalSolved = responses.length
    const todaySolved = responses.filter(r => {
        const d = new Date(r.timestamp)
        const now = new Date()
        return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length

    const accuracy = totalSolved > 0
        ? Math.round((responses.filter(r => r.is_correct).length / totalSolved) * 100)
        : 0

    const accuracyColor = accuracy >= 70 ? 'text-emerald-500' : accuracy >= 50 ? 'text-amber-500' : 'text-rose-500'
    const accuracyBg = accuracy >= 70 ? 'bg-emerald-500/10' : accuracy >= 50 ? 'bg-amber-500/10' : 'bg-rose-500/10'

    // Simple time calculation (mocked for now, or could use responses)
    const totalTimeEst = "04:20" // Fallback: "—" if 0

    // Evolution Data (Now using weekly counts)
    const evolutionData = useMemo(() => {
        return get_weekly_accuracy().map(d => ({
            name: d.day,
            perc: d.accuracy
        }))
    }, [responses, get_weekly_accuracy])

    // Performance by Area
    const areaPerformance = useMemo(() => {
        return COURSES[0].specialties.map(spec => ({
            id: spec.id,
            name: spec.name,
            accuracy: get_accuracy_by_specialty(spec.id),
            count: responses.filter(r => r.specialty_id === spec.id).length
        })).sort((a, b) => b.accuracy - a.accuracy)
    }, [responses])

    // Important Errors (Repetidos >= 3 vezes)
    const errorThemes = useMemo(() => {
        const errorCount: Record<string, { theme: string, area: string, count: number }> = {}
        responses.filter(r => !r.is_correct).forEach(r => {
            const key = r.subject_id || 'Geral'
            if (!errorCount[key]) {
                errorCount[key] = { theme: key, area: r.specialty_id || 'Geral', count: 0 }
            }
            errorCount[key].count++
        })
        return Object.values(errorCount).filter(e => e.count >= 3).slice(0, 5)
    }, [responses])

    // Readiness Progress (Mocked logic)
    const readiness = Math.min(Math.round((totalSolved / 500) * 40 + (accuracy / 100) * 60), 100)
    const readinessStatus = readiness > 80 ? 'Avançado' : readiness > 50 ? 'Intermediário' : 'Crítico'

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    const isFree = user?.plan_level === 'FREE'

    // Agenda Logic
    const intelligentAction = useMemo(() => get_intelligent_action(), [get_intelligent_action])
    const pendingTasks = useMemo(() => get_pending_tasks(), [get_pending_tasks])
    const criticalPoints = useMemo(() => get_critical_points(), [get_critical_points])

    const startIntelligentSession = () => {
        const action = get_intelligent_action()
        if (!action.subject_id) return

        const count = action.type === 'NIVELAMENTO' ? 10 : Math.floor(Math.random() * (12 - 5 + 1)) + 5
        router.push(`/dashboard/quiz/auto?mode=TREINO&subjectId=${encodeURIComponent(action.subject_id)}&count=${count}`)
    }

    return (
        <div className="space-y-12 pb-32 max-w-7xl mx-auto px-4 md:px-0">

            {/* UPGRADE BANNER FOR FREE USERS */}
            {isFree && (
                <div className="relative overflow-hidden rounded-[40px] shadow-2xl shadow-orange-500/20 animate-in fade-in slide-in-from-top-4 duration-1000 group cursor-pointer">
                    {/* Living Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-[length:200%_200%] animate-[gradient_3s_ease_infinite]" />

                    {/* Subtle Overlay Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 gap-8 text-white">
                        <div className="flex items-center gap-6 text-center md:text-left flex-1">
                            <div className="hidden md:flex p-4 bg-white/20 backdrop-blur-md rounded-3xl border border-white/20 shadow-inner md:scale-110">
                                <Sparkles className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/10 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                                    <Zap className="w-3 h-3 text-yellow-300" />
                                    Plano Básico
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.9] drop-shadow-sm">
                                    Desbloqueie o <br />
                                    <span className="text-yellow-300">Modo Insano</span>
                                </h3>
                                <p className="font-bold text-white/90 text-sm md:text-base max-w-lg leading-relaxed mix-blend-screen">
                                    Você está usando apenas 10% do potencial da plataforma. <br className="hidden lg:block" />
                                    Garanta acesso ilimitado a questões e inteligência artificial.
                                </p>
                            </div>
                        </div>

                        <button onClick={() => setShowPlansModal(true)} className="w-full md:w-auto shrink-0 relative group/btn">
                            <div className="absolute -inset-1 bg-white rounded-2xl blur opacity-30 group-hover/btn:opacity-60 transition-opacity duration-500" />
                            <div className="relative bg-white text-orange-600 hover:text-orange-700 px-10 py-5 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                                Fazer Upgrade Agora
                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </div>
                </div>
            )}

            <PlansModal
                isOpen={showPlansModal}
                onClose={() => setShowPlansModal(false)}
            />

            <PaywallModal
                isOpen={showPaywall}
                onClose={() => setShowPaywall(false)}
                reason="feature"
                requiredPlan="INSANO"
            />

            {/* 🎯 SEÇÃO 1: AGENDA INTELIGENTE (O CORAÇÃO DO QRub) */}
            <section className="relative group perspective-1000 pt-16 md:pt-20">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-purple-600/20 to-indigo-600/30 rounded-[60px] blur-3xl opacity-50 group-hover:opacity-100 transition-all duration-1000 animate-pulse" />

                <div className="relative bg-white/70 backdrop-blur-3xl border-2 border-primary/20 rounded-[50px] p-10 md:p-14 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <BrainCircuit className="w-64 h-64 text-primary" />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="space-y-6 flex-1">
                            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] animate-bounce">
                                <Zap className="w-4 h-4 fill-primary" />
                                Sugestão do Dr. QRub
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-[#1A1033]">
                                    {intelligentAction.type === 'NIVELAMENTO' ? 'Sessão de' : 'Revisão'} <br />
                                    <span className="royal-gradient-text italic">{intelligentAction.subject_id}</span>
                                </h2>
                                <div className="flex items-center gap-4 mt-4">
                                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${intelligentAction.status === 'ATRASADO' ? 'bg-rose-500 text-white animate-pulse' :
                                        intelligentAction.status === 'NÃO_NIVELADO' ? 'bg-amber-500 text-white' :
                                            'bg-emerald-500 text-white'
                                        }`}>
                                        {intelligentAction.status}
                                    </span>
                                    <span className="text-[#4B5563] font-bold text-sm uppercase tracking-wider">
                                        {intelligentAction.type === 'NIVELAMENTO' ? '10 questões para identificar seu nível' : 'Manual de manutenção (5-12 questões)'}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={startIntelligentSession}
                                    className="group relative w-full md:w-auto"
                                >
                                    <div className="absolute -inset-2 bg-primary rounded-[25px] blur-xl opacity-40 group-hover:opacity-70 transition-all" />
                                    <div className="relative royal-gradient text-white px-12 py-7 rounded-[22px] font-black uppercase text-sm md:text-base tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.03] active:scale-95 transition-all">
                                        INICIAR SESSÃO AUTOMÁTICA
                                        <Play className="w-6 h-6 fill-current ml-1" />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Quick Stats side for the Agenda */}
                        <div className="hidden lg:grid grid-cols-2 gap-4 w-1/3">
                            <div className="p-6 rounded-[35px] bg-white border border-purple-100 shadow-sm space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Conclusão</p>
                                <p className="text-3xl font-black italic text-[#1A1033]">{readiness}%</p>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${readiness}%` }} />
                                </div>
                            </div>
                            <div className="p-6 rounded-[35px] bg-white border border-purple-100 shadow-sm space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Domínio</p>
                                <p className="text-3xl font-black italic text-emerald-500">{accuracy}%</p>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= (accuracy / 20) ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* 💸 DESTAQUE SECUNDÁRIO: PENDENTES & ATENÇÃO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Card de Pendentes */}
                <div className="p-10 rounded-[45px] bg-purple-50/50 border border-purple-100 space-y-8 flex flex-col h-full text-[#1A1033]">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Pendentes</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Sua lista de dívidas reais</p>
                        </div>
                        <div className="p-3 bg-white rounded-2xl shadow-sm">
                            <Clock className="w-6 h-6 text-primary" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        {pendingTasks.length > 0 ? pendingTasks.slice(0, 3).map((task, i) => (
                            <div key={i} className="bg-white p-5 rounded-3xl border border-purple-100 flex items-center justify-between shadow-sm hover:translate-x-1 transition-transform cursor-pointer" onClick={() => router.push(`/dashboard/quiz/auto?mode=TREINO&subjectId=${encodeURIComponent(task.subject_id)}&count=10`)}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${task.stage === 'LEVELING' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                                    <div>
                                        <p className="font-black text-sm uppercase italic leading-tight">{task.subject_id}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{task.stage === 'LEVELING' ? 'Nivelamento Pendente' : 'Revisão Atrasada'}</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-primary" />
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-10 opacity-40">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2" />
                                <p className="font-black italic uppercase tracking-tighter">Tudo em dia!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Card de Pontos de Atenção */}
                <div className="p-10 rounded-[45px] bg-[#1A1033] text-white space-y-8 relative overflow-hidden group/alert">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover/alert:scale-110 transition-transform duration-700">
                        <AlertCircle className="w-32 h-32" />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Pontos de Atenção</h3>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">O Dr. QRub identificou anomalias</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-2xl">
                            <Activity className="w-6 h-6 text-rose-400" />
                        </div>
                    </div>

                    <div className="relative z-10 space-y-4">
                        {criticalPoints.length > 0 ? criticalPoints.map((point, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-2">
                                <p className="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em]">Alerta de Performance</p>
                                <p className="font-bold text-base leading-snug">Sua precisão em <span className="text-primary-foreground font-black italic">{point.subject_id}</span> caiu abaixo de 50%.</p>
                                <Link
                                    href={`/dashboard/quiz/auto?mode=TREINO&subjectId=${encodeURIComponent(point.subject_id)}&count=15`}
                                    className="flex items-center gap-2 pt-2 text-[10px] font-black text-white/50 hover:text-white transition-colors cursor-pointer uppercase tracking-widest group/link"
                                >
                                    Resolver Erros Críticos <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )) : (
                            <div className="py-10 flex flex-col items-center justify-center opacity-40">
                                <Target className="w-12 h-12 mb-2" />
                                <p className="font-black italic uppercase tracking-tighter">Performance Estável</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 🛠️ GRUPO C: ATALHOS TÁTICOS (OPCIONAIS) */}
            <section className="space-y-6">
                <div className="flex items-center justify-between px-4">
                    <SectionHeader title="Atalhos Táticos" subtitle="Operações fora da agenda principal" icon={<Sparkles className="w-5 h-5" />} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <Link href="/dashboard/setup" className="bg-white border-2 border-slate-100 hover:border-primary/30 p-8 rounded-[40px] transition-all hover:-translate-y-2 flex flex-col items-center text-center gap-4 group">
                        <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                            <Play className="w-6 h-6" />
                        </div>
                        <p className="font-black italic uppercase text-xs tracking-tighter text-[#1A1033]">Treino Livre</p>
                    </Link>
                    <Link href="/dashboard/stats" className="bg-white border-2 border-slate-100 hover:border-primary/30 p-8 rounded-[40px] transition-all hover:-translate-y-2 flex flex-col items-center text-center gap-4 group">
                        <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <p className="font-black italic uppercase text-xs tracking-tighter text-[#1A1033]">Métricas</p>
                    </Link>
                    <Link href="/dashboard/errors" className="bg-white border-2 border-slate-100 hover:border-primary/30 p-8 rounded-[40px] transition-all hover:-translate-y-2 flex flex-col items-center text-center gap-4 group">
                        <div className="p-4 bg-rose-500/10 text-rose-500 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-all">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <p className="font-black italic uppercase text-xs tracking-tighter text-[#1A1033]">Erros</p>
                    </Link>
                    <div className="bg-white border-2 border-slate-100 p-8 rounded-[40px] opacity-40 cursor-not-allowed flex flex-col items-center text-center gap-4">
                        <div className="p-4 bg-slate-100 rounded-2xl">
                            <Crown className="w-6 h-6" />
                        </div>
                        <p className="font-black italic uppercase text-xs tracking-tighter text-[#1A1033]">Rank Elite</p>
                    </div>
                </div>
            </section>

            {/* PROGRESSO DE PRONTIDÃO (RODAPÉ) */}
            <div className="bg-white border-2 border-slate-100 rounded-[50px] p-10 md:p-14 soft-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                    <div className="space-y-4 flex-1">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Total Progress</p>
                            <h3 className="text-5xl font-black italic uppercase tracking-tighter text-[#1A1033]">
                                Índice de <br /><span className="royal-gradient-text uppercase">Prontidão Elite</span>
                            </h3>
                        </div>
                        <p className="text-slate-500 font-medium max-w-md leading-relaxed">
                            Sua pontuação de prontidão é calculada combinando volumetria de questões com consistência de acerto e manutenção de intervalos de revisão.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
                            {/* SVG Progress Circle */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="50%" cy="50%" r="45%"
                                    fill="none" stroke="currentColor" strokeWidth="12"
                                    className="text-slate-100"
                                />
                                <motion.circle
                                    cx="50%" cy="50%" r="45%"
                                    fill="none" stroke="currentColor" strokeWidth="12"
                                    strokeDasharray="283"
                                    strokeDashoffset={283 - (283 * readiness / 100)}
                                    strokeLinecap="round"
                                    className="text-primary"
                                    initial={{ strokeDashoffset: 283 }}
                                    animate={{ strokeDashoffset: 283 - (283 * readiness / 100) }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-5xl md:text-6xl font-black italic text-[#1A1033]">{readiness}%</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#1A1033]/40">{readinessStatus}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

function SummaryCard({ label, value, sub, valueColor, valueBg, icon, light }: { label: string, value: string, sub?: string, valueColor?: string, valueBg?: string, icon: React.ReactNode, light?: boolean }) {
    return (
        <div className={`group/card backdrop-blur-xl rounded-[30px] p-6 min-w-[240px] md:min-w-0 transition-all hover:-translate-y-1 shadow-lg ${light ? 'bg-white/80 border border-purple-100 hover:bg-white hover:border-primary/40' : 'bg-card/40 border border-white/5 hover:bg-card/60 hover:border-primary/40'}`}>
            <div className="flex justify-between items-start mb-6">
                <p className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors uppercase ${light ? 'text-purple-500/50 group-hover/card:text-primary' : 'text-muted-foreground/50 group-hover/card:text-primary/70'}`}>{label}</p>
                <div className={`p-2.5 rounded-xl group-hover/card:scale-110 transition-transform duration-500 ${light ? 'bg-purple-100/50' : 'bg-muted/50'}`}>
                    {icon}
                </div>
            </div>
            <div className="space-y-1">
                <span className={`text-3xl font-black italic tracking-tighter ${valueColor || (light ? 'text-purple-950' : 'text-foreground')}`}>{value}</span>
                {sub && <p className={`text-[10px] font-bold uppercase transition-colors ${light ? 'text-purple-400 group-hover/card:text-purple-600' : 'text-muted-foreground/60 group-hover/card:text-muted-foreground'}`}>{sub}</p>}
            </div>
        </div>
    )
}

function EfficiencyMetric({ label, value, sub }: { label: string, value: string, sub: string }) {
    return (
        <div className="bg-muted/30 rounded-2xl p-4 border border-white/5">
            <p className="text-[10px] font-black uppercase text-muted-foreground/60 mb-2 leading-none whitespace-nowrap">{label}</p>
            <p className="text-xl font-black italic tracking-tighter">{value}</p>
            <p className="text-[8px] font-bold text-muted-foreground uppercase">{sub}</p>
        </div>
    )
}

function RecommendCard({ title, desc, cta, primary, href }: { title: string, desc: string, cta: string, primary?: boolean, href?: string }) {
    const CardContent = (
        <div className={`rounded-[30px] p-8 border flex flex-col justify-between gap-8 group transition-all duration-300 h-full ${primary ? 'bg-primary border-primary shadow-xl shadow-primary/20' : 'bg-card border-border/50 hover:border-primary/30'}`}>
            <div className="space-y-4">
                <div className={`p-3 rounded-xl w-fit ${primary ? 'bg-white/10' : 'bg-primary/10'}`}>
                    <Sparkles className={`w-5 h-5 ${primary ? 'text-white' : 'text-primary'}`} />
                </div>
                <h4 className={`text-xl font-black italic uppercase tracking-tighter leading-none ${primary ? 'text-white' : 'text-foreground'}`}>{title}</h4>
                <p className={`text-xs font-medium italic ${primary ? 'text-white/60' : 'text-muted-foreground'}`}>{desc}</p>
            </div>
            <button className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${primary ? 'bg-white text-primary hover:bg-white/90' : 'bg-foreground text-background hover:bg-foreground/90'}`}>
                {cta}
            </button>
        </div>
    )

    if (href) return <Link href={href} className="flex-1">{CardContent}</Link>
    return <div className="flex-1">{CardContent}</div>
}
