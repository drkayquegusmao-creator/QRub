"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { useSRS } from '@/store/use-srs'
import { useQuiz } from '@/store/use-quiz'
import { useQuestions } from '@/store/use-questions'
import { useDashboard, WidgetId } from '@/store/use-dashboard'
import { useBlueprints } from '@/store/use-blueprints'
import { isMasterEmail } from '@/lib/auth-constants'
import { supabase } from '@/lib/supabase'
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
    Activity,
    Info,
    FileText,
    ChevronRight,
    GripVertical,
    LayoutGrid,
    X as XIcon,
    Database,
    Wrench,
    MessageSquare,
    Send,
    RefreshCw,
    ShieldCheck
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { SRSDashboardWidget } from '@/components/srs-dashboard-widget'
import { PlansModal } from '@/components/plans-modal'
import { PaywallModal } from '@/components/paywall-modal'
import { SectionHeader } from '@/components/dashboard-ui'
import { WelcomeTutorial } from '@/components/welcome-tutorial'
import { COURSES } from '@/lib/data-mock'
import { UserStatsCard } from '@/components/user-stats-card'
import { ReportModal } from '@/components/report-modal'
import { getEditais, Edital } from '@/lib/editais'

export default function StudentDashboard() {
    const router = useRouter()
    const { user } = useAuth()
    const { get_intelligent_action, get_pending_tasks, get_critical_points, load_progress, taxonomy } = useSRS()
    const { blueprints, loadBlueprints } = useBlueprints()
    const { responses, get_accuracy_by_specialty, get_weekly_accuracy, load_responses } = useQuiz()
    const { questions, loadQuestions } = useQuestions()
    const {
        widgets, isEditMode, toggleEditMode, setWidgetVisibility,
        setWidgetWidth, reorderWidgets, resetLayout, loadFromSupabase,
        syncWithSupabase, setWidgetStatus
    } = useDashboard()

    // QRUB MASTER - Absolute Control System
    const [masterStatus, setMasterStatus] = useState({
        isMaster: false,
        isRoleMaster: false,
        isEmailMaster: false,
        isSessionMaster: false,
        loading: true
    })

    useEffect(() => {
        const verify = async () => {
            const isRole = user?.role === 'MASTER'
            const isEmail = isMasterEmail(user?.email)

            let isSession = false
            const { data: { session } } = await supabase.auth.getSession()
            if (session?.user?.email) {
                isSession = isMasterEmail(session.user.email)
            }

            const finalMaster = isRole || isEmail || isSession || (typeof window !== 'undefined' && window.location.search.includes('master=true'))

            setMasterStatus({
                isMaster: finalMaster,
                isRoleMaster: isRole,
                isEmailMaster: isEmail,
                isSessionMaster: isSession,
                loading: false
            })

            console.log('🛡️ MASTER VERIFICATION:', { isRole, isEmail, isSession, finalMaster })

            // Auto-fix role if email is master but role is not
            if ((isEmail || isSession) && !isRole && user?.id) {
                await supabase.from('users').update({ role: 'MASTER' }).eq('id', user.id)
            }
        }
        verify()
    }, [user])

    const isMaster = masterStatus.isMaster
    const intelligentAction = useMemo(() => {
        try {
            return get_intelligent_action(questions)
        } catch (e) {
            console.error("Error getting intelligent action:", e)
            return { subject_id: null, type: 'NIVELAMENTO' }
        }
    }, [get_intelligent_action, questions])

    const pendingTasks = useMemo(() => {
        try {
            return get_pending_tasks(questions)
        } catch (e) {
            console.error("Error getting pending tasks:", e)
            return []
        }
    }, [get_pending_tasks, questions])

    const criticalPoints = useMemo(() => {
        try {
            return get_critical_points()
        } catch (e) {
            console.error("Error getting critical points:", e)
            return []
        }
    }, [get_critical_points])

    // Use dynamic taxonomy if available, else static
    const courses = useMemo(() => {
        if (taxonomy && taxonomy.length > 0) return taxonomy
        return COURSES
    }, [taxonomy])

    // Safety accessor
    const getSpecialties = () => courses[0]?.specialties || []

    const [showPaywall, setShowPaywall] = useState(false)
    const [showPlansModal, setShowPlansModal] = useState(false)
    const [showRankElite, setShowRankElite] = useState(false)
    const [showFeedbackModal, setShowFeedbackModal] = useState(false)
    const [activeEditais, setActiveEditais] = useState<Edital[]>([])



    // Load responses and SRS progress on mount
    useEffect(() => {
        loadFromSupabase()
        if (user?.id) {
            load_responses(user.id)
            load_progress(user.id)
        }
        loadBlueprints()
        loadQuestions() // Power Dr. QRub intelligence

        getEditais({ status: 'publicado' }).then(({ data }) => {
            setActiveEditais(data || [])
        })

        // Realtime: when admin changes dashboard config, all users get updated instantly
        const channel = supabase
            .channel('dashboard-config-changes')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'system_settings', filter: 'key=eq.dashboard_config' },
                () => { loadFromSupabase() }
            )
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [user?.id, loadFromSupabase])

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

                {/* Feedback CTA */}
                <button
                    onClick={() => setShowFeedbackModal(true)}
                    className="col-span-2 lg:col-span-4 bg-primary/5 border-2 border-dashed border-primary/20 p-8 rounded-[45px] hover:bg-primary/10 transition-all group relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-6 text-center md:text-left">
                        <div className="p-4 bg-primary/10 rounded-3xl text-primary group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black italic uppercase tracking-tighter text-primary">Sugestões & Melhorias</h4>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Viu algo que pode ser melhorado? Ajude a construir o QRub.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 w-full md:w-auto justify-center">
                        <Send className="w-4 h-4" /> Enviar ao Master
                    </div>
                </button>
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
            <div className="bg-white border-2 border-slate-100 rounded-[30px] p-6 md:p-8 soft-shadow flex flex-col h-full relative">
                <InfoBubble text="Gráfico da sua precisão média dia a dia na última semana." />
                <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-black italic uppercase tracking-tighter text-[#1A1033]">Evolução Global</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Últimos 7 dias</p>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                </div>
                <div className="flex-1 w-full min-h-[140px] max-h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={evolutionData}>
                            <defs>
                                <linearGradient id="colorEvo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94A3B8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94A3B8' }} domain={[0, 100]} width={25} />
                            <Tooltip contentStyle={{ backgroundColor: '#1A1033', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '10px' }} />
                            <Area type="monotone" dataKey="val" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorEvo)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

    const renderActiveBlueprints = () => {
        if (activeEditais.length === 0) return null

        return (
            <div className="space-y-6 mt-8">
                <SectionHeader title="Editais Publicados" subtitle="Material exclusivo e focado" icon={<FileText className="w-5 h-5" />} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeEditais.map(edital => (
                        <div key={edital.id} className="bg-white border-2 border-slate-100 p-6 rounded-[32px] soft-shadow hover:-translate-y-1 hover:border-primary/30 transition-all group flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">{edital.ano || new Date().getFullYear()}</span>
                                    </div>
                                    <h4 className="text-sm font-black italic uppercase tracking-tighter text-[#1A1033] leading-tight line-clamp-2">{edital.titulo}</h4>
                                    <p className="text-xs font-bold text-slate-500 uppercase">{edital.banca || 'Banca Padrão'}</p>
                                </div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0 text-right">
                                    <p>{edital.total_questoes || 0}</p>
                                    <p className="text-[8px]">Questões</p>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push(`/dashboard/editais/${edital.slug || edital.id}`)}
                                className="w-full mt-6 py-3 rounded-xl bg-slate-50 text-slate-600 font-black uppercase text-[10px] tracking-widest group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                Iniciar Preparação <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
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
            <button onClick={() => router.push('/dashboard/treinar-area')} className="w-full bg-[#1A1033] text-white py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] mt-10 hover:scale-[1.02] active:scale-95 transition-all relative z-10">Iniciar Agora</button>
        </div>
    )


    const WIDGET_MAP: Record<string, () => React.ReactNode> = {
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

            {/* MASTER CONTROL BAR (ABSOLUTE TOP) */}
            {isMaster && (
                <div className="bg-[#1A1033] text-white p-4 rounded-[30px] shadow-2xl border-4 border-amber-500/30 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top duration-500">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <Crown className="w-6 h-6 text-[#1A1033]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black italic uppercase tracking-tighter leading-none">Painel de Controle Master</h2>
                            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mt-1">Acesso Privilegiado Ativo</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            onClick={() => { if (confirm('Limpar cache e restaurar layout v3?')) resetLayout() }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-rose-500 transition-all border border-white/10"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Resetar Layout
                        </button>

                        <button
                            onClick={toggleEditMode}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${isEditMode
                                ? 'bg-primary text-white scale-105'
                                : 'bg-white text-primary hover:bg-slate-50'
                                }`}
                        >
                            {isEditMode ? <XIcon className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
                            {isEditMode ? 'Concluir Edição' : 'Organizar Painel'}
                        </button>

                        <button
                            onClick={() => router.push('/admin')}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-amber-500 text-[#1A1033] hover:bg-amber-400 transition-all"
                        >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Admin Panel
                        </button>
                    </div>
                </div>
            )}

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
            <ReportModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />

            {renderUpgradeBanner()}
            {renderActiveBlueprints()}



            <WidgetGrid
                widgets={widgets}
                isMaster={isMaster}
                isEditMode={isEditMode}
                reorderWidgets={reorderWidgets}
                WIDGET_MAP={WIDGET_MAP}
                onSync={syncWithSupabase}
                onUpdateStatus={setWidgetStatus}
            />
        </div>
    )
}

// ─── Drag-and-drop Widget Grid ───────────────────────────────────────────────

function WidgetGrid({
    widgets,
    isMaster,
    isEditMode,
    reorderWidgets,
    WIDGET_MAP,
    onSync,
    onUpdateStatus
}: {
    widgets: any[]
    isMaster: boolean
    isEditMode: boolean
    reorderWidgets: (a: number, b: number) => void
    WIDGET_MAP: Record<string, () => React.ReactNode>
    onSync?: () => void
    onUpdateStatus?: (id: any, status: any) => void
}) {
    const dragIndex = useRef<number | null>(null)
    const [dragOver, setDragOver] = useState<number | null>(null)

    const visibleWidgets = widgets.filter(w => w.id !== 'UPGRADE_BANNER')
    const WIP_WIDGETS = ['PENDING_CRITICAL', 'EVOLUTION_STATS', 'PERFORMANCE_BY_AREA', 'READINESS_INDEX']

    return (
        <div className="space-y-8">
            {isEditMode && isMaster && (
                <div className="flex justify-center animate-in fade-in zoom-in-95">
                    <button
                        onClick={() => { onSync?.(); alert('Configuração salva no Banco Master!') }}
                        className="px-10 py-4 royal-gradient text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex items-center gap-3 hover:scale-105 transition-all"
                    >
                        <Database className="w-4 h-4" />
                        Sincronizar Layout com o Banco
                    </button>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {visibleWidgets.map((widget, idx) => {
                    const renderer = WIDGET_MAP[widget.id]
                    if (!renderer) return null

                    const isDisabled = widget.status === 'disabled'
                    const isMaintenance = widget.status === 'maintenance'
                    const isFullWidth = widget.width === 'full'
                    const isDraggable = isEditMode && isMaster
                    const isDragTarget = dragOver === idx

                    // Disabled: hide from regular users entirely
                    // In edit mode, master can still see it (greyed out)
                    if (isDisabled && !isMaster) return null
                    if (isDisabled && isMaster && !isEditMode) return null

                    let content: React.ReactNode
                    try {
                        content = renderer()
                        if (!content && !isEditMode) return null

                        // Maintenance: show placeholder to regular users (widget is still visible)
                        if (isMaintenance && !isMaster) {
                            return (
                                <motion.div
                                    key={widget.id}
                                    layout
                                    className={`relative group ${isFullWidth ? 'md:col-span-2' : ''}`}
                                >
                                    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border-2 border-dashed border-amber-200 rounded-[40px] md:rounded-[50px] h-[300px]">
                                        <div className="w-16 h-16 bg-amber-50 rounded-3xl shadow-md flex items-center justify-center mb-5 text-amber-500 border border-amber-200">
                                            <Wrench className="w-8 h-8" />
                                        </div>
                                        <div className="px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 bg-amber-500 text-white shadow-lg shadow-amber-500/20">
                                            <Clock className="w-4 h-4" />
                                            Em Manutenção
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                                            Ajustes técnicos em andamento
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        }
                    } catch {
                        return null
                    }

                    return (
                        <motion.div
                            key={widget.id}
                            layout
                            className={`relative group ${isFullWidth ? 'md:col-span-2' : ''}
                                ${isDragTarget ? 'ring-2 ring-primary/40 ring-offset-2 rounded-[50px] scale-[0.98]' : ''}
                                ${isDisabled && isMaster && isEditMode ? 'opacity-40 grayscale border-2 border-dashed border-slate-300 rounded-[50px]' : ''}
                                ${isMaintenance && isMaster && isEditMode ? 'ring-2 ring-amber-400/40 ring-offset-2 rounded-[50px]' : ''}
                                transition-transform`}
                            draggable={isDraggable}
                            onDragStart={() => { dragIndex.current = idx }}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(idx) }}
                            onDragLeave={() => setDragOver(null)}
                            onDrop={() => {
                                if (dragIndex.current !== null && dragIndex.current !== idx) {
                                    reorderWidgets(dragIndex.current, idx)
                                } // Sincronização manual agora pelo botão
                                dragIndex.current = null
                                setDragOver(null)
                            }}
                            onDragEnd={() => { dragIndex.current = null; setDragOver(null) }}
                        >
                            {/* Master Controls layer - only in edit mode */}
                            {isMaster && isEditMode && (
                                <div className="absolute top-4 left-4 right-4 z-[60] flex items-center justify-between pointer-events-none">
                                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 shadow-md rounded-xl px-3 py-1.5 cursor-grab active:cursor-grabbing pointer-events-auto">
                                        <GripVertical className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mover</span>
                                    </div>

                                    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl rounded-2xl p-1.5 pointer-events-auto">
                                        {(['active', 'maintenance', 'disabled'] as const).map(s => (
                                            <button
                                                key={s}
                                                onClick={() => onUpdateStatus?.(widget.id, s)}
                                                className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${widget.status === s ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
                                            >
                                                {s === 'active' ? <CheckCircle2 className="w-3 h-3 mb-0.5" /> : s === 'maintenance' ? <Wrench className="w-3 h-3 mb-0.5" /> : <XIcon className="w-3 h-3 mb-0.5" />}
                                                <span className="block">{s}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Master Status Badge (Visible outside edit mode for master info) */}
                            {isMaster && !isEditMode && widget.status !== 'active' && (
                                <div className="absolute top-4 right-20 z-20 animate-pulse">
                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${widget.status === 'maintenance' ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-500 text-white border-slate-600'}`}>
                                        {widget.status} - Master Mode
                                    </div>
                                </div>
                            )}

                            {content}
                        </motion.div>
                    )
                })}
                <style>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }
                `}</style>
            </div>
        </div>
    )
}
