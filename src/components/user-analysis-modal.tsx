
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X, User, Mail, Phone, BookOpen, GraduationCap,
    Calendar, Clock, Zap, Target, TrendingUp, AlertTriangle,
    ArrowRight, Star, Crown, Shield, BarChart2,
    CheckCircle2, XCircle, Brain, Trophy, MessageCircle,
    Info, ExternalLink, Sparkles, Hexagon
} from 'lucide-react'
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
    Tooltip, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { PlanLevel } from '@/store/use-auth'

interface UserAnalysisModalProps {
    isOpen: boolean
    onClose: () => void
    userId: string | null
}

interface AnalyticsData {
    profile: {
        name: string
        email: string
        phone: string
        institution: string
        graduation_year: string
        plan_level: PlanLevel
        created_at: string
        last_sign_in: string | null
        streak: number
        status: 'ATIVO' | 'INATIVO' | 'EM RISCO' | 'ABANDONO'
    }
    activity: {
        activeDaysLast7: number
        activeDaysLast30: number
        totalSessions: number
        consecutiveDays: number
        maxStreak: number
        lastLoginToday: boolean
    }
    questions: {
        totalGenerated: number
        totalAnswered: number
        completionRate: number
        averageTimePerQuestion: number
        correctCount: number
        incorrectCount: number
        specialtyPerformance: { id: string; name: string; correct: number; total: number; accuracy: number }[]
        mostAvoidedSpecialties: string[]
        mostAccessedSpecialties: string[]
    }
    retention: {
        revisesQuestions: boolean
        revisionFrequency: string
        estimatedRetention: 'Baixa' | 'Média' | 'Alta'
        spacedRepetitionRate: number
    }
    behavioralProfile: {
        level: 'RISCO' | 'IRREGULAR' | 'BOM' | 'ÓTIMO' | 'ELITE'
        score: number
        interpretation: string
    }
    engagementMetrics: {
        frequency: string
        volume: string
        precision: string
        retention: string
    }
    chartData: { d: string; v: number; count: number }[]
    peakHour: string
    avgSessionTime: string
    totalScreenTime: string
    alerts: { type: 'critical' | 'warning' | 'success' | 'info'; msg: string }[]
    suggestedActions: { label: string; action: string; primary?: boolean }[]
}

export function UserAnalysisModal({ isOpen, onClose, userId }: UserAnalysisModalProps) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [activeTab, setActiveTab] = useState<'geral' | 'questoes' | 'comportamento'>('geral')

    useEffect(() => {
        if (isOpen && userId) {
            fetchAnalytics()
        }
    }, [isOpen, userId])

    const fetchAnalytics = async () => {
        if (!userId || !isSupabaseConfigured()) return
        setLoading(true)
        try {
            // 0. Fetch Taxonomy for Mapping (UUID -> Name)
            // We fetch name and parent name to construct full labels if needed
            const { data: taxonomyNodes } = await supabase
                .from('taxonomia')
                .select('id, name')

            const taxonomyMap = new Map<string, string>()
            taxonomyNodes?.forEach((node: any) => {
                taxonomyMap.set(node.id, node.name)
            })

            // 1. Fetch Basic Info
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single()

            if (userError) throw userError

            // 2. Fetch Question History
            const { data: questionHistory, error: qError } = await supabase
                .from('questao_uso_usuario')
                .select('*')
                .eq('user_id', userId)
                .order('data_uso', { ascending: false })

            // 3. Fetch Matches
            const { data: matches, error: mError } = await supabase
                .from('rank_matches')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })

            // 4. Fetch Sessions for timing
            const { data: sessoes, error: sError } = await supabase
                .from('sessoes')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })

            const { data: sessaoItens, error: siError } = await supabase
                .from('sessao_itens')
                .select('tempo_resposta_segundos, created_at, esta_correta, resposta_usuario')
                .eq('user_id', userId)

            // --- CALCULATIONS ---
            const now = new Date()
            const history = questionHistory || []
            const userMatches = matches || []
            const userSessions = sessoes || []
            const items = sessaoItens || []

            const activityDates = new Set([
                ...history.map(h => new Date(h.data_uso).toDateString()),
                ...userSessions.map(s => new Date(s.created_at).toDateString()),
                ...userMatches.map(m => new Date(m.created_at).toDateString())
            ])
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - i)
                return d.toDateString()
            })
            const last30Days = Array.from({ length: 30 }, (_, i) => {
                const d = new Date()
                d.setDate(d.getDate() - i)
                return d.toDateString()
            })

            const activeDays7 = last7Days.filter(d => activityDates.has(d)).length
            const activeDays30 = last30Days.filter(d => activityDates.has(d)).length

            const lastActivityDate = [
                ...history.map(h => new Date(h.data_uso)),
                ...userSessions.map(s => new Date(s.created_at)),
                userData.updated_at ? new Date(userData.updated_at) : null,
                userData.last_sign_in_at ? new Date(userData.last_sign_in_at) : null
            ].filter(d => d !== null).sort((a: any, b: any) => b - a)[0]

            const daysSinceLastUse = lastActivityDate ? Math.floor((now.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24)) : 999

            // "Hoje" if last activity < 24h OR same calendar day
            const isToday = lastActivityDate ? (
                lastActivityDate.toDateString() === now.toDateString() ||
                (now.getTime() - lastActivityDate.getTime()) < (12 * 60 * 60 * 1000) // 12h buffer
            ) : false

            const isOnlineNow = userSessions.some(s => s.status === 'EM_ANDAMENTO') || isToday

            let status: any = 'ATIVO'
            if (daysSinceLastUse > 30) status = 'ABANDONO'
            else if (daysSinceLastUse > 14) status = 'INATIVO'
            else if (daysSinceLastUse > 7) status = 'EM RISCO'

            // Question Stats (History + Matches + LIVE Session Items)
            const answeredItems = items.filter(i => i.resposta_usuario !== null)
            const totalAnswered = history.length +
                userMatches.reduce((acc, m) => acc + (m.answered_questions || 0), 0) +
                answeredItems.length

            const correctCount = history.filter(h => h.foi_acertada).length +
                userMatches.reduce((acc, m) => acc + (m.correct_count || 0), 0) +
                answeredItems.filter(i => i.esta_correta).length

            const incorrectCount = totalAnswered - correctCount

            // Performance per group (Mapped via Taxonomy)
            const specMap: Record<string, { correct: number; total: number }> = {}
            history.forEach(h => {
                const key = h.assunto_id // UUID
                if (!key) return
                if (!specMap[key]) specMap[key] = { correct: 0, total: 0 }
                specMap[key].total++
                if (h.foi_acertada) specMap[key].correct++
            })

            const specialtyPerformance = Object.entries(specMap).map(([id, stats]) => {
                const name = taxonomyMap.get(id) || 'Geral'
                return {
                    id,
                    name,
                    correct: stats.correct,
                    total: stats.total,
                    accuracy: Math.round((stats.correct / stats.total) * 100)
                }
            }).sort((a, b) => b.total - a.total).slice(0, 5) // Top 5 by Volume

            // Behavior & Score
            let score = 0
            score += Math.min(30, activeDays30 * 1.5) // Freq (max 30)
            score += Math.min(30, (totalAnswered / 20)) // Volume (max 30)
            score += (totalAnswered > 0 ? (correctCount / totalAnswered) * 20 : 0) // Accuracy (max 20)
            score += (userData.streak ? Math.min(20, userData.streak * 2) : 0) // Consistency (max 20)

            let level: any = 'BOM'
            let interpretation = ''
            if (score > 85) {
                level = 'ELITE'
                interpretation = 'Usuário altamente engajado, com rotina sólida e resultados consistentes. Potencial mentor.'
            } else if (score > 65) {
                level = 'ÓTIMO'
                interpretation = 'Uso frequente e produtivo. Mantém uma boa média de acertos e constância.'
            } else if (score > 40) {
                level = 'BOM'
                interpretation = 'Utiliza a plataforma regularmente, mas pode aumentar o volume ou a frequência de revisão.'
            } else if (score > 20) {
                level = 'IRREGULAR'
                interpretation = 'Uso esporádico. Frequentemente interrompe sequências de estudo.'
            } else {
                level = 'RISCO'
                interpretation = 'Baixo engajamento ou longo período sem acesso. Alta probabilidade de churn.'
            }

            // --- Real Timing Calculations ---
            let totalSeconds = 0

            // 1. From Matches
            userMatches.forEach(m => totalSeconds += (m.duration_seconds || 0))

            // 2. From Sessions (Finished and Active)
            userSessions.forEach(s => {
                if (s.finalized_at && s.created_at) {
                    const duration = (new Date(s.finalized_at).getTime() - new Date(s.created_at).getTime()) / 1000
                    totalSeconds += Math.max(0, duration)
                } else if (s.status === 'EM_ANDAMENTO') {
                    const duration = (now.getTime() - new Date(s.created_at).getTime()) / 1000
                    totalSeconds += Math.max(0, duration)
                }
            })

            // 3. From Individual Items (to be double sure about answering time)
            // Note: We only add these if they aren't already covered by session durations to avoid double counting
            // However, usually sessao_itens tempo_resposta_segundos is the most "granular" measure.
            // Let's take the MAX between session duration and sum of item times for each session to be safe.
            const sessionItemTimes: Record<string, number> = {}
            items.forEach(item => {
                const sid = (item as any).sessao_id || 'no-session'
                sessionItemTimes[sid] = (sessionItemTimes[sid] || 0) + (item.tempo_resposta_segundos || 0)
            })

            // If we have items without session mapping, add them directly
            if (sessionItemTimes['no-session']) {
                totalSeconds += sessionItemTimes['no-session']
            }

            const totalScreenTimeMinutes = Math.round(totalSeconds / 60)
            const avgSessionMinutes = userSessions.length + userMatches.length > 0
                ? Math.round(totalScreenTimeMinutes / (userSessions.length + userMatches.length))
                : 0

            // Chart Data Generation (Last 7 Days) - PRECISION BASED
            const chartData = last7Days.map(dateStr => {
                const dayHistory = history.filter(h => new Date(h.data_uso).toDateString() === dateStr)
                // Filter matches by date
                const dayMatches = userMatches.filter(m => new Date(m.created_at).toDateString() === dateStr)

                const dayCorrect = dayHistory.filter(h => h.foi_acertada).length +
                    dayMatches.reduce((acc, m) => acc + (m.correct_count || 0), 0)

                const dayTotal = dayHistory.length +
                    dayMatches.reduce((acc, m) => acc + (m.answered_questions || 0), 0)

                const precision = dayTotal > 0 ? Math.round((dayCorrect / dayTotal) * 100) : 0

                // Format label: "Segunda", "Terça" or just DD/MM
                // Screenshot uses "Quarta", "Quinta". Let's use Weekday name.
                const weekday = new Date(dateStr).toLocaleDateString('pt-BR', { weekday: 'long' })
                const label = weekday.charAt(0).toUpperCase() + weekday.slice(1).split('-')[0] // "Segunda"

                return { d: label, v: precision, count: dayTotal } // v is precision now (0-100)
            }).reverse()

            // Peak Hour
            const hours = [...history.map(h => new Date(h.data_uso).getHours()),
            ...userMatches.map(m => new Date(m.created_at).getHours())]
            const hourFreq: Record<number, number> = {}
            hours.forEach(h => hourFreq[h] = (hourFreq[h] || 0) + 1)
            const peakHourNum = Object.entries(hourFreq).sort((a, b) => b[1] - a[1])[0]?.[0] || '--'
            const peakHour = peakHourNum !== '--' ? `${peakHourNum}:00` : '--'

            // Alerts
            const alerts: any[] = []
            if (daysSinceLastUse > 7) alerts.push({ type: 'critical', msg: `${daysSinceLastUse} dias sem acesso` })
            if (activeDays7 === 0 && activeDays30 > 0) alerts.push({ type: 'warning', msg: 'Queda brusca de uso detectada' })
            if (userData.streak >= 7) alerts.push({ type: 'success', msg: `🔥 Sequência de ${userData.streak} dias!` })
            if (score > 90) alerts.push({ type: 'info', msg: '⭐ Candidato a Aluno Destaque' })

            // Mocked/Calculated final object
            const analytics: AnalyticsData = {
                profile: {
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone || 'Sem telefone',
                    institution: userData.institution || 'Não informada',
                    graduation_year: userData.graduation_year || 'N/A',
                    plan_level: userData.plan_level,
                    created_at: userData.created_at,
                    last_sign_in: lastActivityDate?.toISOString() || null,
                    streak: userData.streak || 0,
                    status: isOnlineNow ? 'ATIVO' : status
                },
                activity: {
                    activeDaysLast7: activeDays7,
                    activeDaysLast30: activeDays30,
                    totalSessions: userMatches.length + userSessions.length,
                    consecutiveDays: userData.streak || 0,
                    maxStreak: userData.streak || 0,
                    lastLoginToday: isOnlineNow || daysSinceLastUse === 0
                },
                questions: {
                    totalGenerated: totalAnswered + 10, // Mocked pending
                    totalAnswered,
                    completionRate: totalAnswered > 0 ? (totalAnswered / (totalAnswered + 10)) * 100 : 0,
                    averageTimePerQuestion: 45, // Placeholder
                    correctCount,
                    incorrectCount,
                    specialtyPerformance,
                    mostAvoidedSpecialties: ['Nefrologia', 'Gastroenterologia'], // Placeholder
                    mostAccessedSpecialties: specialtyPerformance.map(s => s.name)
                },
                retention: {
                    revisesQuestions: history.some(h => h.is_review),
                    revisionFrequency: 'Semanal',
                    estimatedRetention: score > 70 ? 'Alta' : score > 40 ? 'Média' : 'Baixa',
                    spacedRepetitionRate: 45
                },
                behavioralProfile: {
                    level,
                    score: Math.round(score),
                    interpretation
                },
                engagementMetrics: {
                    frequency: activeDays30 > 15 ? '9/10' : activeDays30 > 5 ? '6/10' : '3/10',
                    volume: totalAnswered > 100 ? '9/10' : totalAnswered > 30 ? '7/10' : '4/10',
                    precision: totalAnswered > 0 && (correctCount / totalAnswered) > 0.8 ? '9/10' : '6/10',
                    retention: history.some(h => h.is_review) ? '8/10' : '4/10'
                },
                chartData,
                peakHour,
                avgSessionTime: `${avgSessionMinutes} min`,
                totalScreenTime: `${totalScreenTimeMinutes} min`,
                alerts,
                suggestedActions: [
                    { label: 'Enviar Incentivo Zap', action: 'OFFER_DISCOUNT', primary: true },
                    { label: 'Ligar para Aluno', action: 'CALL' },
                    { label: 'Liberar Bônus Master', action: 'UPGRADE' }
                ]
            }

            setData(analytics)
        } catch (err) {
            console.error('Error fetching analytics:', err)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#0a0a0a] border border-white/10 w-full max-w-7xl h-full md:max-h-[850px] overflow-hidden rounded-[40px] shadow-2xl flex flex-col relative"
            >
                {/* Header HUD */}
                <div className="flex items-center justify-between p-6 md:px-10 border-b border-white/5 bg-gradient-to-r from-black via-[#0a0a0a] to-black">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-3xl bg-primary border border-primary/20 flex items-center justify-center text-white shadow-xl shadow-primary/20">
                            <Hexagon className="w-8 h-8 fill-white/20" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                                    {loading ? 'Analisando...' : data?.profile.name}
                                </h2>
                                {!loading && data && <StatusBadge status={data.profile.status} />}
                            </div>
                            <div className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest mt-1">
                                <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {data?.profile.email}</span>
                                <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-primary" /> ID: {userId?.slice(0, 8)}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10 group">
                        <X className="w-6 h-6 text-white/40 group-hover:text-white" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Brain className="w-8 h-8 text-primary animate-pulse" />
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-black italic uppercase tracking-tighter text-white">Processando Eventos Reais</p>
                            <p className="text-sm font-bold text-white/20 uppercase tracking-[0.3em]">IA de Análise Comportamental Ativa</p>
                        </div>
                    </div>
                ) : data ? (
                    <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row divide-x divide-white/5">

                        {/* Coluna Esquerda: Identidade e Comportamento */}
                        <div className="w-full lg:w-80 p-8 space-y-8 flex-shrink-0 bg-white/[0.02]">

                            <section className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 px-1">Identidade do Aluno</h3>
                                <div className="space-y-2">
                                    <IdentityItem icon={<GraduationCap />} label="Instituição" value={data.profile.institution} />
                                    <IdentityItem icon={<Calendar />} label="Formação" value={data.profile.graduation_year} />
                                    <IdentityItem icon={<Phone />} label="WhatsApp" value={data.profile.phone} />
                                    <IdentityItem icon={<Shield />} label="Plano" value={<PlanBadge plan={data.profile.plan_level} />} />
                                </div>
                            </section>

                            <section className="p-6 rounded-[32px] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Crown className="w-12 h-12" />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">TOTAL PROGRESS</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">ÍNDICE DE<br />PRONTIDÃO<br /><span className="text-[#8b5cf6]">ELITE</span></h1>
                                    </div>

                                    <div className="relative pt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-4xl font-black italic text-white">{data.behavioralProfile.score}%</span>
                                            <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${data.behavioralProfile.score < 40 ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                                {data.behavioralProfile.score < 40 ? 'CRÍTICO' : 'ESTÁVEL'}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${data.behavioralProfile.score}%` }}
                                                className="h-full royal-gradient rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-xs font-medium text-white/60 leading-relaxed italic border-t border-white/5 pt-4">
                                        "{data.behavioralProfile.interpretation}"
                                    </p>
                                </div>
                            </section>

                            {/* Engagement Score Meter */}
                            <section className="space-y-4">
                                <div className="flex justify-between items-end px-1">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Score de Engajamento</h3>
                                    <span className="text-2xl font-black italic text-primary">{data.behavioralProfile.score}</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${data.behavioralProfile.score}%` }}
                                        className="h-full royal-gradient rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <ScoreMetric label="Frequência" value={data.engagementMetrics.frequency} />
                                    <ScoreMetric label="Volume" value={data.engagementMetrics.volume} />
                                    <ScoreMetric label="Precisão" value={data.engagementMetrics.precision} />
                                    <ScoreMetric label="Retenção" value={data.engagementMetrics.retention} />
                                </div>
                            </section>
                        </div>

                        {/* Área Central: Analytics e Gráficos */}
                        <div className="flex-1 flex flex-col min-w-0">

                            {/* Top Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 p-4 border-b border-white/5">
                                <MainStat label="Entrou Hoje?" value={data.activity.lastLoginToday ? 'SIM' : 'NÃO'} icon={<Zap className={data.activity.lastLoginToday ? 'text-amber-400' : 'text-white/20'} />} />
                                <MainStat label="Dias Ativos (30d)" value={data.activity.activeDaysLast30} sub="de 30 dias" icon={<Calendar className="text-blue-400" />} />
                                <MainStat label="Questões Fone" value={data.questions.totalAnswered} sub="Respondidas" icon={<Target className="text-emerald-400" />} />
                                <MainStat label="Taxa de Acerto" value={`${Math.round((data.questions.correctCount / data.questions.totalAnswered) * 100)}%`} icon={<Trophy className="text-purple-400" />} />
                            </div>

                            {/* Tabs Navigation */}
                            <div className="flex border-b border-white/5 px-8">
                                <TabBtn active={activeTab === 'geral'} onClick={() => setActiveTab('geral')} label="Atividade Geral" />
                                <TabBtn active={activeTab === 'questoes'} onClick={() => setActiveTab('questoes')} label="Desempenho Médico" />
                                <TabBtn active={activeTab === 'comportamento'} onClick={() => setActiveTab('comportamento')} label="Alertas e IA" />
                            </div>

                            <div className="flex-1 p-8 overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'geral' && (
                                        <motion.div key="geral" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <h4 className="text-3xl font-black italic uppercase tracking-tighter text-foreground text-white">EVOLUÇÃO GLOBAL</h4>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">PRECISÃO MÉDIA NOS ÚLTIMOS 7 DIAS</p>
                                                    <div className="h-64 bg-white/[0.02] border border-white/10 rounded-[32px] p-6">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <AreaChart data={data.chartData}>
                                                                <defs>
                                                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                                    </linearGradient>
                                                                </defs>
                                                                <XAxis dataKey="d" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)' }} />
                                                                <YAxis domain={[0, 100]} fontSize={10} axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)' }} />
                                                                <Tooltip
                                                                    formatter={(value: any) => [`${value}%`, 'Precisão']}
                                                                    labelStyle={{ color: '#fff' }}
                                                                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                                                />
                                                                <Area type="monotone" dataKey="v" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <MetricCard title="Tempo de Tela" value={data.totalScreenTime} sub="Total real" icon={<Clock />} />
                                                    <MetricCard title="Média Sessão" value={data.avgSessionTime} sub="Por acesso" icon={<Zap />} />
                                                    <MetricCard title="Acessos Totais" value={data.activity.totalSessions} sub="Sessões registradas" icon={<User />} />
                                                    <MetricCard title="Horário Pico" value={data.peakHour} sub="Mais frequente" icon={<TrendingUp />} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'questoes' && (
                                        <motion.div key="questoes" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Distribuição de Acertos</h4>
                                                    <div className="h-64 bg-white/[0.02] border border-white/10 rounded-[32px] p-6 flex flex-col items-center justify-center">
                                                        <ResponsiveContainer width="100%" height="80%">
                                                            <PieChart>
                                                                <Pie
                                                                    data={[
                                                                        { name: 'Corretas', value: data.questions.correctCount },
                                                                        { name: 'Incorretas', value: data.questions.incorrectCount }
                                                                    ]}
                                                                    innerRadius={60}
                                                                    outerRadius={80}
                                                                    paddingAngle={5}
                                                                    dataKey="value"
                                                                >
                                                                    <Cell fill="#10b981" />
                                                                    <Cell fill="#f43f5e" />
                                                                </Pie>
                                                                <Tooltip />
                                                            </PieChart>
                                                        </ResponsiveContainer>
                                                        <div className="flex gap-6 mt-4">
                                                            <div className="flex items-center gap-2 text-xs font-black"><div className="w-2 h-2 rounded-full bg-emerald-500" /> {data.questions.correctCount} ACERTOS</div>
                                                            <div className="flex items-center gap-2 text-xs font-black"><div className="w-2 h-2 rounded-full bg-rose-500" /> {data.questions.incorrectCount} ERROS</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h4 className="text-3xl font-black italic uppercase tracking-tighter text-white">PERFORMANCE POR ÁREA</h4>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">TOP 5 ESPECIALIDADES</p>
                                                    <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-6 space-y-6">
                                                        {data.questions.specialtyPerformance.map((spec, i) => (
                                                            <div key={i} className="space-y-2">
                                                                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60 truncate max-w-[200px]">{spec.name}</span>
                                                                    <span className="text-xl font-black italic text-primary">{spec.accuracy}%</span>
                                                                </div>
                                                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${spec.accuracy}%` }}
                                                                        className="h-full bg-emerald-500 rounded-full"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === 'comportamento' && (
                                        <motion.div key="comportamento" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <section className="space-y-4">
                                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Alertas Inteligentes</h4>
                                                    <div className="space-y-3">
                                                        {data.alerts.length > 0 ? data.alerts.map((alert, i) => (
                                                            <div key={i} className={`p-4 rounded-2xl flex items-center gap-4 border ${alert.type === 'critical' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : alert.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                                                                <div className="p-2 rounded-xl bg-white/5">
                                                                    {alert.type === 'critical' ? <AlertTriangle className="w-4 h-4" /> : alert.type === 'warning' ? <Clock className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                                                                </div>
                                                                <p className="text-xs font-black uppercase tracking-widest">{alert.msg}</p>
                                                            </div>
                                                        )) : (
                                                            <div className="p-8 text-center bg-white/[0.02] border border-white/10 rounded-[32px]">
                                                                <CheckCircle2 className="w-8 h-8 text-emerald-500/40 mx-auto mb-3" />
                                                                <p className="text-xs font-bold text-white/20 uppercase">Nenhum alerta crítico</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </section>

                                                <section className="space-y-4">
                                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/30">Consistência de Retenção</h4>
                                                    <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-6 space-y-6">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400"><Brain className="w-4 h-4" /></div>
                                                                <span className="text-xs font-bold uppercase text-white/60">Usa Revisão Espaçada?</span>
                                                            </div>
                                                            <span className={`text-[10px] font-black px-2 py-1 rounded ${data.retention.revisesQuestions ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                                                                {data.retention.revisesQuestions ? 'SIM' : 'NÃO'}
                                                            </span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between items-end">
                                                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Retenção Estimada</span>
                                                                <span className="text-sm font-black italic text-white uppercase">{data.retention.estimatedRetention}</span>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <div className={`h-1.5 flex-1 rounded-full ${data.retention.estimatedRetention === 'Baixa' || data.retention.estimatedRetention === 'Média' || data.retention.estimatedRetention === 'Alta' ? 'bg-rose-500' : 'bg-white/5'}`} />
                                                                <div className={`h-1.5 flex-1 rounded-full ${data.retention.estimatedRetention === 'Média' || data.retention.estimatedRetention === 'Alta' ? 'bg-amber-500' : 'bg-white/5'}`} />
                                                                <div className={`h-1.5 flex-1 rounded-full ${data.retention.estimatedRetention === 'Alta' ? 'bg-emerald-500' : 'bg-white/5'}`} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Coluna Direita: Ações e Sumário */}
                        <div className="w-full lg:w-72 p-8 space-y-8 flex-shrink-0 bg-black/40">
                            <section className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Histórico de Acesso</h3>
                                <div className="space-y-2">
                                    <div className="text-xs font-bold text-white/60 flex justify-between">
                                        <span>Cadastro</span>
                                        <span className="text-white">{new Date(data.profile.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="text-xs font-bold text-white/60 flex justify-between">
                                        <span>Último Login</span>
                                        <span className="text-white">{data.profile.last_sign_in ? new Date(data.profile.last_sign_in).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                    <div className="text-xs font-bold text-white/60 flex justify-between">
                                        <span>Streak Atual</span>
                                        <span className="text-amber-400">🔥 {data.profile.streak} dias</span>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Ações Master (Sugeridas)</h3>
                                <div className="space-y-3">
                                    {data.suggestedActions.map((item, i) => (
                                        <button
                                            key={i}
                                            className={`w-full p-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-between group ${item.primary ? 'royal-gradient text-white shadow-lg shadow-primary/20 hover:scale-105' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'}`}
                                        >
                                            {item.label}
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <div className="p-6 rounded-[32px] bg-emerald-500/5 border border-emerald-500/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Insights Admin</span>
                                </div>
                                <p className="text-[10px] font-medium text-emerald-500/60 leading-relaxed italic">
                                    Aluno está no Top 10% de engajamento em {data.questions.specialtyPerformance[0]?.name || 'Geral'}. Considere convidar para o programa de afiliados.
                                </p>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                        <Info className="w-12 h-12 text-white/10 mb-4" />
                        <p className="text-xl font-black italic uppercase tracking-tighter text-white/40">Dados insuficientes para análise completa</p>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

// --- HELPER COMPONENTS ---

function StatusBadge({ status }: { status: string }) {
    const map = {
        'ATIVO': 'bg-emerald-500 text-white',
        'INATIVO': 'bg-white/20 text-white/60',
        'EM RISCO': 'bg-amber-500 text-white',
        'ABANDONO': 'bg-rose-500 text-white'
    }
    return <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${map[status as keyof typeof map]}`}>{status}</span>
}

function IdentityItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: any }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all group">
            <div className="p-2 bg-white/5 rounded-xl text-white/30 group-hover:text-primary transition-colors">{icon}</div>
            <div className="min-w-0">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/20 leading-none mb-1">{label}</p>
                <p className="text-xs font-black text-white truncate">{value}</p>
            </div>
        </div>
    )
}

function ProfileRank({ level }: { level: string }) {
    const map = {
        'RISCO': <XCircle className="w-6 h-6 text-rose-500" />,
        'IRREGULAR': <AlertTriangle className="w-6 h-6 text-amber-500" />,
        'BOM': <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
        'ÓTIMO': <Star className="w-6 h-6 text-blue-500" />,
        'ELITE': <Crown className="w-6 h-6 text-amber-400" />
    }
    return <div className="p-3 bg-white/5 rounded-2xl">{map[level as keyof typeof map]}</div>
}

function ScoreMetric({ label, value }: { label: string, value: string }) {
    return (
        <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">{label}</p>
            <p className="text-[10px] font-black text-white">{value}</p>
        </div>
    )
}

function MainStat({ label, value, sub, icon }: { label: string, value: any, sub?: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 flex flex-col items-center text-center group">
            <div className="mb-4 p-3 bg-white/5 rounded-2xl group-hover:bg-primary/10 transition-all border border-transparent group-hover:border-primary/20">
                {React.cloneElement(icon as React.ReactElement<any>, {
                    className: ((icon as React.ReactElement<any>).props.className || '') + ' w-5 h-5'
                })}
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">{label}</p>
            <p className="text-2xl font-black italic uppercase tracking-tighter text-white">{value}</p>
            {sub && <p className="text-[8px] font-bold uppercase tracking-widest text-white/20">{sub}</p>}
        </div>
    )
}

function TabBtn({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all ${active ? 'border-primary text-primary' : 'border-transparent text-white/30 hover:text-white/60'}`}
        >
            {label}
        </button>
    )
}

function MetricCard({ title, value, sub, icon }: { title: string, value: any, sub: string, icon: React.ReactNode }) {
    return (
        <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-6 hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-xl text-white/20">{icon}</div>
                <h5 className="text-[10px] font-black uppercase tracking-widest text-white/40">{title}</h5>
            </div>
            <p className="text-2xl font-black italic uppercase tracking-tighter text-white mb-1">{value}</p>
            <p className="text-[8px] font-bold uppercase tracking-widest text-white/20">{sub}</p>
        </div>
    )
}

function PlanBadge({ plan }: { plan: PlanLevel }) {
    if (plan === 'INSANO') return <span className="flex items-center gap-1 text-amber-400"><Crown className="w-3 h-3" /> INSANO</span>
    if (plan === 'PREMIUM') return <span className="flex items-center gap-1 text-primary"><Star className="w-3 h-3" /> PREMIUM</span>
    return <span className="text-white/40">FREE</span>
}
