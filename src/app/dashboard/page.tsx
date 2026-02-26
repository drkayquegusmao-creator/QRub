"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { useSRS } from '@/store/use-srs'
import { useQuiz } from '@/store/use-quiz'
import { useQuestions } from '@/store/use-questions'
import { useDashboard, WidgetId } from '@/store/use-dashboard'
import { useBlueprints } from '@/store/use-blueprints'
import {
    Zap,
    Target,
    BarChart3,
    TrendingUp,
    Clock,
    AlertCircle,
    ArrowRight,
    Play,
    CheckCircle2,
    Sparkles,
    Crown,
    Activity
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { SRSDashboardWidget } from '@/components/srs-dashboard-widget'
import { PlansModal } from '@/components/plans-modal'
import { PaywallModal } from '@/components/paywall-modal'
import { TrainModal } from '@/components/train-modal'
import { SectionHeader } from '@/components/dashboard-ui'
import { WelcomeTutorial } from '@/components/welcome-tutorial'
import { COURSES } from '@/lib/data-mock'
import { UserStatsCard } from '@/components/user-stats-card'

export default function StudentDashboard() {
    const router = useRouter()
    const { user } = useAuth()
    const { get_intelligent_action, get_pending_tasks, get_critical_points, load_progress, taxonomy } = useSRS()
    const { blueprints, loadBlueprints } = useBlueprints()
    const { responses, get_accuracy_by_specialty, get_weekly_accuracy, load_responses } = useQuiz()
    const { questions, loadQuestions } = useQuestions()
    const { widgets, isEditMode, toggleEditMode, setWidgetVisibility, setWidgetWidth, reorderWidgets, resetLayout } = useDashboard()
    const intelligentAction = useMemo(() => get_intelligent_action(questions), [get_intelligent_action, questions])
    const pendingTasks = useMemo(() => get_pending_tasks(questions), [get_pending_tasks, questions])
    const criticalPoints = useMemo(() => get_critical_points(), [get_critical_points])

    // Use dynamic taxonomy if available, else static
    const courses = useMemo(() => {
        if (taxonomy && taxonomy.length > 0) return taxonomy
        return COURSES
    }, [taxonomy])

    // Safety accessor
    const getSpecialties = () => courses[0]?.specialties || []

    const [showPaywall, setShowPaywall] = useState(false)
    const [showPlansModal, setShowPlansModal] = useState(false)
    const [showTrainModal, setShowTrainModal] = useState(false)
    const [showRankElite, setShowRankElite] = useState(false)
    const [trainModalInitialSpecialty, setTrainModalInitialSpecialty] = useState<string | undefined>(undefined)

    // Load responses and SRS progress on mount
    useEffect(() => {
        if (user?.id) {
            load_responses(user.id)
            load_progress(user.id)
        }
        loadBlueprints()
        loadQuestions() // Power Dr. QRub intelligence
    }, [user?.id])

    // Calculated metrics
    const totalSolved = responses.length
    const accuracy = totalSolved > 0
        ? Math.round((responses.filter(r => r.is_correct).length / totalSolved) * 100)
        : 0

    const readiness = Math.min(Math.round((totalSolved / 500) * 40 + (accuracy / 100) * 60), 100)
    const readinessStatus = readiness > 80 ? 'Avançado' : readiness > 50 ? 'Intermediário' : 'Crítico'
    const readinessColor = readiness > 80 ? 'text-emerald-500' : readiness > 50 ? 'text-amber-500' : 'text-rose-500'

    const isFree = user?.plan_level === 'FREE'

    const today = new Date()
    const formattedDate = today.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    const startIntelligentSession = () => {
        const action = get_intelligent_action(questions)
        if (!action.subject_id) return
        const count = action.type === 'NIVELAMENTO' ? 10 : Math.floor(Math.random() * (12 - 5 + 1)) + 5
        router.push(`/dashboard/quiz/auto?mode=TREINO&specialtyId=${encodeURIComponent(action.subject_id)}&count=${count}`)
    }

    // --- WIDGET RENDERERS ---

    const InfoBubble = ({ text }: { text: string }) => (
        <div className="absolute top-4 right-4 z-20 group/info">
            <div className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-primary/10 text-slate-400 hover:text-primary transition-colors flex items-center justify-center cursor-help">
                <span className="font-bold text-[10px] font-serif italic">i</span>
            </div>
            <div className="absolute top-8 right-0 w-48 bg-gray-900 text-white text-[10px] font-medium p-3 rounded-xl shadow-xl opacity-0 scale-95 group-hover/info:opacity-100 group-hover/info:scale-100 transition-all pointer-events-none z-30">
                {text}
                <div className="absolute -top-1 right-2 w-2 h-2 bg-gray-900 rotate-45" />
            </div>
        </div>
    )

    const renderUpgradeBanner = () => {
        if (!isFree) return null
        return (
            <div className="relative overflow-hidden rounded-[40px] shadow-2xl shadow-orange-500/20 group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 bg-[length:200%_200%] animate-[gradient_3s_ease_infinite]" />
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
                            <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.9]">
                                Desbloqueie o <br />
                                <span className="text-yellow-300">Modo Insano</span>
                            </h3>
                        </div>
                    </div>
                    <button onClick={() => setShowPlansModal(true)} className="w-full md:w-auto shrink-0 relative group/btn">
                        <div className="relative bg-white text-orange-600 hover:text-orange-700 px-10 py-5 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                            Fazer Upgrade Agora
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                    </button>
                </div>
            </div>
        )
    }

    const renderIntelligentAgenda = () => (
        <section className="h-full">
            <SRSDashboardWidget />
        </section>
    )

    const renderPendingCritical = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[45px] bg-purple-50/50 border border-purple-100 space-y-8 flex flex-col h-full text-[#1A1033] relative">
                <InfoBubble text="Tarefas acumuladas que precisam da sua atenção imediata." />
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
                        <div key={i} className="bg-white p-5 rounded-3xl border border-purple-100 flex items-center justify-between shadow-sm hover:translate-x-1 transition-transform cursor-pointer" onClick={() => router.push(`/dashboard/quiz/auto?mode=TREINO&specialtyId=${encodeURIComponent(task.subject_id)}&count=10`)}>
                            <div className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${task.stage === 'LEVELING' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                                <div>
                                    <p className="font-black text-sm uppercase italic leading-tight">
                                        {getSpecialties().find((s: { id: string; name: string }) => s.id === task.subject_id)?.name || task.subject_id}
                                    </p>
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

            <div className="p-10 rounded-[45px] bg-[#1A1033] text-white space-y-8 relative overflow-hidden group/alert">
                <InfoBubble text="Áreas onde seu desempenho está abaixo do esperado e requer reforço." />
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover/alert:scale-110 transition-transform duration-700">
                    <AlertCircle className="w-32 h-32" />
                </div>
                <div className="flex items-center justify-between relative z-10">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter">Pontos de Atenção</h3>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">O Dr. QRub identificou anomalias</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-2xl text-rose-400">
                        <Activity className="w-6 h-6" />
                    </div>
                </div>
                <div className="relative z-10 space-y-4">
                    {criticalPoints.length > 0 ? criticalPoints.map((point, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-3xl space-y-2">
                            <p className="font-bold text-base leading-snug">Sua precisão em <span className="text-primary-foreground font-black italic">{getSpecialties().find((s: { id: string; name: string }) => s.id === point.subject_id)?.name || point.subject_id}</span> caiu abaixo de 50%.</p>
                            <Link href={`/dashboard/quiz/auto?mode=TREINO&specialtyId=${encodeURIComponent(point.subject_id)}&count=15`} className="flex items-center gap-2 pt-2 text-[10px] font-black text-white/50 hover:text-white transition-colors cursor-pointer uppercase tracking-widest group/link">
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
    )

    const renderTacticalShortcuts = () => (
        <section className="space-y-6 relative">
            <InfoBubble text="Acesso rápido às principais ferramentas de treino e análise." />
            <SectionHeader title="Atalhos Táticos" subtitle="Operações fora da agenda principal" icon={<Sparkles className="w-5 h-5" />} />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Treino Livre', icon: <Play />, href: '/dashboard/setup', color: 'bg-primary/10 text-primary hover:bg-primary' },
                    { label: 'Métricas', icon: <BarChart3 />, href: '/dashboard/stats', color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500' },
                    { label: 'Caderno de Erros', icon: <AlertCircle />, href: '/dashboard/errors', color: 'bg-rose-500/10 text-rose-500 hover:bg-rose-500' },
                    { label: 'Rank Elite', icon: <Crown />, onClick: () => setShowRankElite(true), color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500' }
                ].map((item: any, i) => (
                    item.onClick ? (
                        <button key={i} onClick={item.onClick} className="bg-white border-2 border-slate-100 hover:border-amber-500/30 p-8 rounded-[40px] transition-all hover:-translate-y-2 flex flex-col items-center text-center gap-4 group">
                            <div className={`p-4 rounded-2xl transition-all group-hover:text-white ${item.color.split(' ').slice(0, 2).join(' ')} group-hover:${item.color.split(' ').slice(2).join(' ')}`}>
                                {item.icon}
                            </div>
                            <p className="font-black italic uppercase text-xs tracking-tighter text-[#1A1033]">{item.label}</p>
                        </button>
                    ) : (
                        <Link key={i} href={item.href} className="bg-white border-2 border-slate-100 hover:border-primary/30 p-8 rounded-[40px] transition-all hover:-translate-y-2 flex flex-col items-center text-center gap-4 group">
                            <div className={`p-4 rounded-2xl transition-all group-hover:text-white ${item.color.split(' ').slice(0, 2).join(' ')} group-hover:${item.color.split(' ').slice(2).join(' ')}`}>
                                {item.icon}
                            </div>
                            <p className="font-black italic uppercase text-xs tracking-tighter text-[#1A1033]">{item.label}</p>
                        </Link>
                    )
                ))}
            </div>
        </section>
    )

    const renderReadinessIndex = () => (
        <div className="bg-white border-2 border-slate-100 rounded-[50px] p-10 md:p-14 soft-shadow relative">
            <InfoBubble text="Índice que mede sua preparação geral baseado em volume e precisão." />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-6 flex-1 text-center md:text-left">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Total Progress</p>
                        <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-[1.2] pb-4">
                            Índice de <br />
                            <span className="royal-gradient-text block py-2 pr-10">Prontidão Elite</span>
                        </h3>
                    </div>
                    <p className="text-slate-500 font-medium max-w-md leading-relaxed mx-auto md:mx-0">
                        Sua pontuação de prontidão é calculada combinando volumetria de questões com consistência de acerto e manutenção de intervalos.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6 shrink-0 px-4">
                    <div className="relative w-48 h-48 md:w-60 md:h-60 flex items-center justify-center">
                        <div className={`absolute inset-4 rounded-full blur-2xl opacity-20 ${readiness > 80 ? 'bg-emerald-500' : readiness > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                        <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-100" />
                            <motion.circle
                                cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6"
                                strokeDasharray="0 263.89" strokeLinecap="round" className={readinessColor}
                                animate={{ strokeDasharray: `${(readiness * 263.89) / 100} 263.89` }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                            <span className="text-6xl md:text-7xl font-black italic text-[#1A1033] tracking-[-0.05em] leading-none mb-2">
                                {readiness}<span className="text-2xl md:text-3xl ml-0.5">%</span>
                            </span>
                            <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-white border shadow-sm ${readinessColor}`}>
                                {readinessStatus}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    const renderEvolutionStats = () => {
        const evolutionData = get_weekly_accuracy().map(d => ({ name: d.day, val: d.accuracy }))
        return (
            <div className="bg-white border-2 border-slate-100 rounded-[50px] p-10 md:p-14 soft-shadow h-full flex flex-col relative">
                <InfoBubble text="Gráfico da sua precisão média dia a dia na última semana." />
                <div className="flex items-center justify-between mb-10">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033]">Evolução Global</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Precisão média nos últimos 7 dias</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                </div>
                <div className="flex-1 w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={evolutionData}>
                            <defs>
                                <linearGradient id="colorEvo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} domain={[0, 100]} />
                            <Tooltip contentStyle={{ backgroundColor: '#1A1033', border: 'none', borderRadius: '15px', color: '#fff' }} />
                            <Area type="monotone" dataKey="val" stroke="#8B5CF6" strokeWidth={4} fillOpacity={1} fill="url(#colorEvo)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

    const renderPerformanceByArea = () => {
        const performanceData = getSpecialties().map((s: { id: string; name: string }) => ({
            name: s.name,
            val: get_accuracy_by_specialty(s.id)
        })).sort((a: any, b: any) => b.val - a.val).slice(0, 5)

        return (
            <div className="bg-white border-2 border-slate-100 rounded-[50px] p-10 md:p-14 soft-shadow h-full flex flex-col relative">
                <InfoBubble text="Suas 5 melhores áreas de desempenho até o momento." />
                <div className="flex items-center justify-between mb-10">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033]">Performance por Área</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top 5 especialidades</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                </div>
                <div className="flex-1 space-y-6">
                    {performanceData.map((item: any, i: number) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider truncate max-w-[150px]">{item.name}</span>
                                <span className="text-xs font-black italic text-primary">{item.val}%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${item.val}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full bg-primary" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderFastPractice = () => (
        <div className="bg-white border-2 border-slate-100 rounded-[50px] p-10 md:p-14 soft-shadow h-full flex flex-col items-center relative group hover:border-primary/30 transition-all overflow-hidden">
            <InfoBubble text="Comece um treino rápido escolhendo a especialidade desejada no momento." />
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Target className="w-40 h-40 text-[#1A1033]" />
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-md relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    <Zap className="w-3 h-3" /> Acesso Rápido
                </div>
                <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-[0.9] mb-4">Treinar <br /> <span className="royal-gradient-text">Por Área</span></h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">Acesse todo o banco de questões organizado por especialidades médicas.</p>
            </div>
            <button onClick={() => setShowTrainModal(true)} className="w-full bg-[#1A1033] text-white py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] mt-10 hover:scale-[1.02] active:scale-95 transition-all relative z-10">Iniciar Agora</button>
        </div>
    )


    const WIDGET_MAP: Record<WidgetId, () => React.ReactNode> = {
        'UPGRADE_BANNER': renderUpgradeBanner,
        'INTELLIGENT_AGENDA': renderIntelligentAgenda,
        'PENDING_CRITICAL': renderPendingCritical,
        'TACTICAL_SHORTCUTS': renderTacticalShortcuts,
        'READINESS_INDEX': renderReadinessIndex,
        'EVOLUTION_STATS': renderEvolutionStats,
        'PERFORMANCE_BY_AREA': renderPerformanceByArea,
        'FAST_PRACTICE': renderFastPractice
    }

    return (
        <div className="space-y-8 pb-32 max-w-7xl mx-auto px-4 md:px-0">
            <WelcomeTutorial />

            {/* Premium Dashboard Header */}
            <div className="pt-4 pb-2">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-none"
                >
                    Sua Central de <span className="text-primary italic">Estudos</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 font-bold mt-2 first-letter:uppercase"
                >
                    {formattedDate}
                </motion.p>
            </div>

            <UserStatsCard />

            <PlansModal isOpen={showPlansModal} onClose={() => setShowPlansModal(false)} />
            <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} reason="feature" requiredPlan="INSANO" />
            <TrainModal isOpen={showTrainModal} onClose={() => setShowTrainModal(false)} initialSpecialtyId={trainModalInitialSpecialty} />

            {renderUpgradeBanner()}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <AnimatePresence mode="popLayout">
                    {widgets.filter(w => w.id !== 'UPGRADE_BANNER').map((widget) => {
                        const content = WIDGET_MAP[widget.id]()
                        if (!content && !isEditMode) return null
                        if (!widget.visible && !isEditMode) return null
                        const isFullWidth = widget.width === 'full'
                        return (
                            <motion.div key={widget.id} layout className={isFullWidth ? 'md:col-span-2' : ''}>
                                {content}
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </div>
    )
}
