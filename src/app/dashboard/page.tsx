"use client"

import { useAuth } from '@/store/use-auth'
import { useQuiz } from '@/store/use-quiz'
import { useQuestions } from '@/store/use-questions'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Zap,
    Target,
    Flame,
    Clock,
    BarChart3,
    TrendingUp,
    Activity,
    ChevronUp,
    ChevronDown,
    ArrowRight,
    AlertCircle,
    Play,
    CheckCircle2,
    Sparkles,
    BrainCircuit,
    Crown,
    Settings2,
    Eye,
    EyeOff,
    Check,
    RotateCcw,
    GripVertical,
    BookOpen,
    Microscope,
    Search,

    LayoutGrid,
    Bell,
    FileText,
    Calendar,
    ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSRS } from '@/store/use-srs'
import { useBlueprints } from '@/store/use-blueprints'
import { useDashboard, WidgetId } from '@/store/use-dashboard'
import { SectionHeader, Divider } from '@/components/dashboard-ui'
import { PaywallModal } from '@/components/paywall-modal'
import { PlansModal } from '@/components/plans-modal'
import { TrainModal } from '@/components/train-modal'
import { WelcomeTutorial } from '@/components/welcome-tutorial'
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
    const { get_intelligent_action, get_pending_tasks, get_critical_points, load_progress } = useSRS()
    const { blueprints, loadBlueprints } = useBlueprints()
    const { responses, get_accuracy_by_specialty, get_weekly_accuracy, load_responses } = useQuiz()
    const { questions, loadQuestions } = useQuestions()
    const { widgets, isEditMode, toggleEditMode, setWidgetVisibility, setWidgetWidth, reorderWidgets, resetLayout } = useDashboard()
    const intelligentAction = useMemo(() => get_intelligent_action(questions), [get_intelligent_action, questions])
    const pendingTasks = useMemo(() => get_pending_tasks(), [get_pending_tasks])
    const criticalPoints = useMemo(() => get_critical_points(), [get_critical_points])

    const [showPaywall, setShowPaywall] = useState(false)
    const [showPlansModal, setShowPlansModal] = useState(false)
    const [showTrainModal, setShowTrainModal] = useState(false)
    const [trainModalInitialSpecialty, setTrainModalInitialSpecialty] = useState<string | undefined>(undefined)

    // Load responses and SRS progress on mount
    useEffect(() => {
        if (user?.id) {
            load_responses(user.id)
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

    const startIntelligentSession = () => {
        const action = get_intelligent_action(questions)
        if (!action.subject_id) return
        const count = action.type === 'NIVELAMENTO' ? 10 : Math.floor(Math.random() * (12 - 5 + 1)) + 5
        router.push(`/dashboard/quiz/auto?mode=TREINO&specialtyId=${encodeURIComponent(action.subject_id)}&count=${count}`)
    }

    const intelligentActionName = useMemo(() => {
        if (!intelligentAction.subject_id) return ''
        const { MEDICAL_HIERARCHY } = require('@/lib/medical-specialties')
        const spec = MEDICAL_HIERARCHY[0].specialties.find((s: any) => s.id === intelligentAction.subject_id)
        return spec ? spec.name : intelligentAction.subject_id
    }, [intelligentAction.subject_id])

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
            {/* Card de Pendentes */}
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
                                        {COURSES[0].specialties.find(s => s.id === task.subject_id)?.name || task.subject_id}
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

            {/* Card de Pontos de Atenção */}
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
                            <p className="font-bold text-base leading-snug">Sua precisão em <span className="text-primary-foreground font-black italic">{COURSES[0].specialties.find(s => s.id === point.subject_id)?.name || point.subject_id}</span> caiu abaixo de 50%.</p>
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
                    { label: 'Rank Elite', icon: <Crown />, href: '#', color: 'bg-slate-100 text-slate-400 opacity-40 cursor-not-allowed', disabled: true }
                ].map((item, i) => (
                    item.disabled ? (
                        <div key={i} className="bg-white border-2 border-slate-100 p-8 rounded-[40px] opacity-40 cursor-not-allowed flex flex-col items-center text-center gap-4">
                            <div className="p-4 bg-slate-100 rounded-2xl">{item.icon}</div>
                            <p className="font-black italic uppercase text-xs tracking-tighter text-[#1A1033]">{item.label}</p>
                        </div>
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

                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-48 h-48 md:w-60 md:h-60 flex items-center justify-center">
                        {/* Glow Effect Background */}
                        <div className={`absolute inset-4 rounded-full blur-2xl opacity-20 ${readiness > 80 ? 'bg-emerald-500' : readiness > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} />

                        <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                            {/* Background Circle */}
                            <circle
                                cx="50" cy="50" r="42"
                                fill="none" stroke="currentColor" strokeWidth="4"
                                className="text-slate-100"
                            />
                            {/* Progress Circle */}
                            <motion.circle
                                cx="50" cy="50" r="42"
                                fill="none" stroke="currentColor" strokeWidth="6"
                                strokeDasharray="0 263.89"
                                strokeLinecap="round"
                                className={readinessColor}
                                animate={{ strokeDasharray: `${(readiness * 263.89) / 100} 263.89` }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                            <span className="text-6xl md:text-7xl font-black italic text-[#1A1033] tracking-[ -0.05em] leading-none mb-2">
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
        const evolutionData = get_weekly_accuracy().map(d => ({
            name: d.day,
            val: d.accuracy
        }))

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
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1A1033', border: 'none', borderRadius: '15px', color: '#fff' }}
                                itemStyle={{ fontSize: '12px', fontWeight: 900, color: '#A78BFA' }}
                            />
                            <Area type="monotone" dataKey="val" stroke="#8B5CF6" strokeWidth={4} fillOpacity={1} fill="url(#colorEvo)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

    const renderPerformanceByArea = () => {
        const performanceData = COURSES[0].specialties.map(s => ({
            name: s.name,
            val: get_accuracy_by_specialty(s.id)
        })).sort((a, b) => b.val - a.val).slice(0, 5)

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
                    {performanceData.map((item, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider truncate max-w-[150px]">{item.name}</span>
                                <span className="text-xs font-black italic text-primary">{item.val}%</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.val}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="h-full bg-primary rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderFastPractice = () => {
        return (
            <div className="bg-white border-2 border-slate-100 rounded-[50px] p-10 md:p-14 soft-shadow h-full flex flex-col items-center relative overflow-hidden group hover:border-primary/30 transition-all">
                <InfoBubble text="Comece um treino rápido escolhendo a especialidade desejada no momento." />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white -z-10" />
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <Target className="w-40 h-40 text-[#1A1033]" />
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-md relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <Zap className="w-3 h-3" />
                            Acesso Rápido
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-[0.9] mb-4">
                            Treinar <br />
                            <span className="royal-gradient-text">Por Área</span>
                        </h3>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">
                            Acesse todo o banco de questões organizado por especialidades médicas. Escolha sua área e comece agora.
                        </p>
                    </div>
                </div>

                <div className="mt-10 w-full">
                    <button
                        onClick={() => { setTrainModalInitialSpecialty(undefined); setShowTrainModal(true) }}
                        className="relative group/btn z-30 w-full"
                    >
                        <div className="absolute -inset-1 bg-primary/30 rounded-2xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        <div className="relative bg-[#1A1033] text-white py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all">
                            Iniciar Agora
                            <Play className="w-5 h-5 fill-current" />
                        </div>
                    </button>
                </div>
            </div>
        )
    }


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



            <PlansModal isOpen={showPlansModal} onClose={() => setShowPlansModal(false)} />
            <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} reason="feature" requiredPlan="INSANO" />
            <TrainModal isOpen={showTrainModal} onClose={() => setShowTrainModal(false)} initialSpecialtyId={trainModalInitialSpecialty} />

            {renderUpgradeBanner()}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <AnimatePresence mode="popLayout">
                    {widgets.filter(w => w.id !== 'UPGRADE_BANNER').map((widget, index) => {
                        const content = WIDGET_MAP[widget.id]()
                        if (!content && !isEditMode) return null
                        if (!widget.visible && !isEditMode) return null

                        const isFullWidth = widget.width === 'full'

                        return (
                            <motion.div
                                layout
                                key={widget.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`relative group/widget transition-all ${isFullWidth ? 'md:col-span-2' : 'md:col-span-1'} ${isEditMode ? 'ring-2 ring-primary/20 ring-dashed p-4 rounded-[60px] bg-slate-50/50' : ''} ${!widget.visible ? 'opacity-40 grayscale blur-[1px]' : ''}`}
                            >
                                {/* CONTROLES DE EDIÇÃO */}
                                {isEditMode && (
                                    <div className="absolute top-0 right-10 -translate-y-1/2 flex items-center gap-2 z-20">
                                        <div className="flex bg-white border border-primary/20 rounded-2xl p-1.5 shadow-xl items-center gap-1">
                                            <div className="px-2 text-slate-300">
                                                <GripVertical className="w-4 h-4" />
                                            </div>
                                            <div className="w-px h-4 bg-slate-100 mx-1" />
                                            <button onClick={() => setWidgetVisibility(widget.id, !widget.visible)} className={`p-2 rounded-xl transition-all ${widget.visible ? 'text-primary bg-primary/10' : 'text-slate-400 hover:text-primary'}`} title={widget.visible ? 'Ocultar' : 'Mostrar'}>
                                                {widget.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                            </button>
                                            <div className="w-px bg-slate-100 mx-1" />
                                            <button onClick={() => setWidgetWidth(widget.id, isFullWidth ? 'half' : 'full')} className="p-2 text-slate-400 hover:text-primary rounded-xl transition-all" title={isFullWidth ? 'Minimizar' : 'Maximizar'}>
                                                {isFullWidth ? <ArrowRight className="w-4 h-4 rotate-45" /> : <ArrowRight className="w-4 h-4" />}
                                            </button>
                                            <div className="w-px bg-slate-100 mx-1" />
                                            <button onClick={() => reorderWidgets(index, Math.max(0, index - 1))} className="p-2 text-slate-400 hover:text-primary rounded-xl transition-all disabled:opacity-30" disabled={index === 0}>
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => reorderWidgets(index, Math.min(widgets.length - 1, index + 1))} className="p-2 text-slate-400 hover:text-primary rounded-xl transition-all disabled:opacity-30" disabled={index === widgets.length - 1}>
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="bg-primary text-white text-[8px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg">
                                            {widget.title}
                                        </div>
                                    </div>
                                )}

                                <div className={!widget.visible && isEditMode ? 'pointer-events-none' : 'h-full'}>
                                    {content || (isEditMode && (
                                        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-[50px] bg-slate-50/50 text-slate-400 gap-3">
                                            <Sparkles className="w-8 h-8 opacity-20" />
                                            <p className="font-black italic uppercase text-[10px] tracking-widest">Widget "{widget.title}" não disponível</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
            {/* TOOLBAR DA DASHBOARD FIXA NO RODAPÉ DO SITE (NÃO DA TELA) */}
            <div className="relative mt-12 mb-8 mx-auto w-[95%] max-w-5xl bg-[#F5F3FF] border border-white/60 p-2.5 rounded-full shadow-sm flex items-center justify-between transition-all">
                <div className="flex items-center gap-4 pl-2">
                    <div className="w-10 h-10 rounded-full bg-[#EBE5FF] flex items-center justify-center text-[#7C3AED] shadow-inner">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black italic uppercase tracking-tighter text-[#1A1033] leading-none">DASHBOARD (V2.1)</h1>
                        <p className="text-[9px] font-bold text-[#7C3AED] uppercase tracking-widest mt-0.5">Status em tempo real</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 pr-1">
                    {isEditMode ? (
                        <div className="flex items-center gap-2">
                            <button onClick={resetLayout} className="hidden md:flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
                                <RotateCcw className="w-3 h-3" /> Resetar
                            </button>
                            <button onClick={toggleEditMode} className="bg-emerald-500 text-white px-6 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
                                <Check className="w-3 h-3" /> <span className="hidden sm:inline">Finalizar</span>
                            </button>
                        </div>
                    ) : (
                        <button onClick={toggleEditMode} className="bg-white text-[#1A1033] px-6 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 shadow-sm border border-slate-100 group">
                            <Settings2 className="w-3 h-3 text-slate-400 group-hover:text-primary transition-colors" />
                            Personalizar
                        </button>
                    )}
                </div>
            </div>
        </div >
    )
}
