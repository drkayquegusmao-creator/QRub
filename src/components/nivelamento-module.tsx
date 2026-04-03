'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
    Target, ChevronDown, ChevronRight, Search, BookOpen,
    CheckCircle2, XCircle, Clock, TrendingUp, Calendar,
    Star, AlertTriangle, Trophy, ArrowRight, RotateCcw,
    Zap, Brain, Flame, ChevronLeft, BarChart3, Loader2, Settings, ShieldCheck, RefreshCw, Save
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import {
    fetchQuestionCounts, fetchQuestionsForNivelamento, createPlacementSession,
    completePlacementSession, getUserNivelamentoStats, getUpcomingReviews,
    getSrsConfig,
    ScopeConfig, ScopeType, MasteryLevel, QuestionCountMap
} from '@/lib/nivelamento-service'
import { toast } from 'react-hot-toast'
import { isMasterEmail } from '@/lib/auth-constants'
import { motion } from 'framer-motion'


// ─── Types ────────────────────────────────────────────────────────────────────

type View = 'dashboard' | 'picker' | 'session' | 'result'
type PickerTab = 'area' | 'subarea' | 'tema'

interface Question {
    id: string
    enunciado: string
    alternativas: Record<string, string>
    resposta_correta: string
    explicacao?: string
    dificuldade?: string
}

interface SessionState {
    sessionId: string
    scope: ScopeConfig
    questions: Question[]
    currentIndex: number
    answers: Record<number, string>
    startTime: number
    questionStartTime: number
    questionTimes: number[]
    showResult: boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugToLabel(slug: string): string {
    if (!slug) return ''
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
}

function getMasteryColor(level: string): string {
    const colors: Record<string, string> = {
        MUITO_BAIXO: '#ef4444', BAIXO: '#f97316', BOM: '#3b82f6', ALTO: '#22c55e',
        critico: '#ef4444', fragil: '#f97316', em_consolidacao: '#3b82f6', consolidado: '#22c55e'
    }
    return colors[level] || '#6b7280'
}

function getMasteryLabel(level: string): string {
    const labels: Record<string, string> = {
        MUITO_BAIXO: 'Domínio Muito Baixo', BAIXO: 'Domínio Baixo',
        BOM: 'Domínio Bom', ALTO: 'Domínio Alto',
        critico: 'Crítico', fragil: 'Frágil',
        em_consolidacao: 'Em Consolidação', consolidado: 'Consolidado'
    }
    return labels[level] || level
}

function formatDate(dateStr: string): string {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T12:00:00')
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

const SCOPE_QUESTION_COUNTS: Record<ScopeType, number> = { area: 20, subarea: 15, tema: 10 }

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ icon: Icon, value, label, color, description }: { icon: any, value: string | number, label: string, color: string, description?: string }) {
    return (
        <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="relative group overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 p-5 rounded-3xl flex flex-col gap-3 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20 shadow-xl shadow-black/20"
        >
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-current opacity-[0.03] rounded-full blur-2xl group-hover:opacity-[0.06] transition-opacity" style={{ color }} />
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: `${color}20 shadow: 0 8px 16px ${color}10` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white leading-none tracking-tight">{value}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{label}</span>
                </div>
            </div>
            {description && <p className="text-[10px] text-slate-500 font-medium leading-tight">{description}</p>}
        </motion.div>
    )
}

function ReviewCard({ event }: { event: any }) {
    const isToday = event.scheduled_date === new Date().toISOString().split('T')[0]
    const isOverdue = event.status === 'atrasada'
    const color = isOverdue ? '#ef4444' : isToday ? '#f59e0b' : '#3b82f6'

    return (
        <motion.div 
            whileHover={{ x: 4 }}
            className="group flex items-center gap-4 p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-2xl mb-3 transition-all cursor-pointer"
        >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                <Calendar className="w-5 h-5" style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-200 truncate group-hover:text-white transition-colors">
                    {event.scope_label || slugToLabel(event.specialty_id || '')}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {isOverdue ? 'Atrasada' : isToday ? 'Hoje' : formatDate(event.scheduled_date)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-[10px] font-medium text-slate-500">{event.question_count} questões</span>
                </div>
            </div>
            <div className="shrink-0 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest" style={{ background: `${color}15`, color: color, border: `1px solid ${color}20` }}>
                {event.priority?.replace('_', ' ') || 'Normal'}
            </div>
        </motion.div>
    )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function NivelamentoModule() {
    const [view, setView] = useState<View>('dashboard')
    const [user, setUser] = useState<any>(null)

    // Dashboard state
    const [isAdmin, setIsAdmin] = useState(false)
    const [showAdminPanel, setShowAdminPanel] = useState(false)
    const [adminConfig, setAdminConfig] = useState<any>(null)
    const [savingAdmin, setSavingAdmin] = useState(false)

    useEffect(() => {
        if (user?.email && isMasterEmail(user.email)) {
            setIsAdmin(true)
        }
    }, [user])
    const [stats, setStats] = useState<any>(null)
    const [upcomingReviews, setUpcomingReviews] = useState<any[]>([])
    const [statsLoading, setStatsLoading] = useState(true)

    // Picker state
    const [pickerTab, setPickerTab] = useState<PickerTab>('area')
    const [questionCounts, setQuestionCounts] = useState<QuestionCountMap>({})
    const [countsLoading, setCountsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
    const [selectedSubspecialty, setSelectedSubspecialty] = useState<string | null>(null)
    const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set())
    const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set())

    // Session state
    const [session, setSession] = useState<SessionState | null>(null)
    const [sessionLoading, setSessionLoading] = useState(false)

    // Result state
    const [placementResult, setPlacementResult] = useState<any>(null)
    const [reviewDates, setReviewDates] = useState<string[]>([])

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    // ── Auth ──────────────────────────────────────────────────────────────────
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setUser(data?.user || null))
    }, [])

    // ── Load dashboard stats ──────────────────────────────────────────────────
    const loadStats = useCallback(async () => {
        if (!user?.id) return
        setStatsLoading(true)
        try {
            const [statsData, reviewsData, configData] = await Promise.all([
                getUserNivelamentoStats(user.id),
                getUpcomingReviews(user.id, 7),
                getSrsConfig()
            ])
            setStats(statsData)
            setUpcomingReviews(reviewsData)
            setAdminConfig(configData)
        } catch (e) {
            console.error('Error loading stats:', e)
        } finally {
            setStatsLoading(false)
        }
    }, [user])

    const handleSaveAdminConfig = async () => {
        if (!adminConfig) return
        setSavingAdmin(true)
        try {
            const { error } = await supabase
                .from('system_settings')
                .upsert({ key: 'srs_config', value: adminConfig, updated_at: new Date().toISOString() })
            
            if (error) throw error
            setShowAdminPanel(false)
            toast.success('Configurações salvas!')
        } catch (e) {
            console.error(e)
            toast.error('Erro ao salvar')
        } finally {
            setSavingAdmin(false)
        }
    }

    useEffect(() => { if (user) loadStats() }, [user, loadStats])

    // ── Load question counts ──────────────────────────────────────────────────
    useEffect(() => {
        if (view !== 'picker') return
        setCountsLoading(true)
        fetchQuestionCounts().then(data => {
            setQuestionCounts(data)
            setCountsLoading(false)
        })
    }, [view])

    // ── Start session ─────────────────────────────────────────────────────────
    const startSession = async (scope: ScopeConfig) => {
        if (!user) return
        setSessionLoading(true)
        try {
            const questionCount = adminConfig?.questions?.[scope.scopeType] || SCOPE_QUESTION_COUNTS[scope.scopeType]
            const [questions, sessionId] = await Promise.all([
                fetchQuestionsForNivelamento(scope, user.id, questionCount),
                createPlacementSession(user.id, scope, questionCount)
            ])

            if (questions.length === 0) {
                alert('Não há questões suficientes para este recorte. Tente uma área mais ampla.')
                setSessionLoading(false)
                return
            }

            setSession({
                sessionId,
                scope,
                questions,
                currentIndex: 0,
                answers: {},
                startTime: Date.now(),
                questionStartTime: Date.now(),
                questionTimes: [],
                showResult: false,
            })
            setView('session')
        } catch (e) {
            console.error('Error starting session:', e)
            alert('Erro ao iniciar sessão. Tente novamente.')
        } finally {
            setSessionLoading(false)
        }
    }

    // ── Answer question ───────────────────────────────────────────────────────
    const answerQuestion = (answer: string) => {
        if (!session || session.answers[session.currentIndex] !== undefined) return

        const elapsed = (Date.now() - session.questionStartTime) / 1000
        const newTimes = [...session.questionTimes, elapsed]
        const newAnswers = { ...session.answers, [session.currentIndex]: answer }

        setSession(prev => prev ? {
            ...prev,
            answers: newAnswers,
            questionTimes: newTimes,
            showResult: true,
        } : null)
    }

    // ── Next question ─────────────────────────────────────────────────────────
    const nextQuestion = () => {
        if (!session) return
        if (session.currentIndex < session.questions.length - 1) {
            setSession(prev => prev ? {
                ...prev,
                currentIndex: prev.currentIndex + 1,
                questionStartTime: Date.now(),
                showResult: false,
            } : null)
        } else {
            finishSession()
        }
    }

    // ── Finish session ────────────────────────────────────────────────────────
    const finishSession = async () => {
        if (!session || !user) return
        setSessionLoading(true)

        const correct = session.questions.filter(
            (q, i) => session.answers[i] === q.resposta_correta
        ).length
        const total = session.questions.length
        const avgTime = session.questionTimes.length > 0
            ? session.questionTimes.reduce((a, b) => a + b, 0) / session.questionTimes.length
            : 0

        try {
            const result = await completePlacementSession(
                session.sessionId, user.id, session.scope, correct, total, avgTime
            )
            setPlacementResult(result)

            // Calculate review dates for display
            const intervals = getReviewIntervals(result.masteryLevel)
            const dates = intervals.map(days => {
                const d = new Date()
                d.setDate(d.getDate() + days)
                return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
            })
            setReviewDates(dates)
            setView('result')
            loadStats()
        } catch (e) {
            console.error('Error finishing session:', e)
        } finally {
            setSessionLoading(false)
        }
    }

    function getReviewIntervals(mastery: MasteryLevel): number[] {
        const intervals: Record<MasteryLevel, number[]> = adminConfig?.intervals?.[mastery] || {
            MUITO_BAIXO: [1, 3, 7, 14, 30],
            BAIXO: [3, 7, 15, 30],
            BOM: [7, 15, 30, 60],
            ALTO: [15, 30, 60, 90],
        }
        return intervals[mastery] || [7, 15, 30]
    }

    // ── Filtered specialties ──────────────────────────────────────────────────
    const filteredSpecialties = Object.entries(questionCounts)
        .filter(([key, val]) => {
            if (!searchQuery) return val.total > 0
            return key.toLowerCase().includes(searchQuery.toLowerCase()) && val.total > 0
        })
        .sort(([, a], [, b]) => b.total - a.total)

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER: Dashboard
    // ─────────────────────────────────────────────────────────────────────────
    if (view === 'dashboard') {
        const hasData = stats && (stats.totalPlacements > 0 || stats.todayReviews.length > 0)

        return (
            <div style={{ fontFamily: "'Inter', sans-serif", color: '#e2e8f0', minHeight: '100%' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white flex items-center gap-3">
                            <Brain className="w-8 h-8 text-primary" />
                            Nivelamento & SRS
                        </h1>
                        <div className="flex items-center gap-4">
                            {isAdmin && (
                                <button
                                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                                    className="p-3 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-primary"
                                    title="Configurações Administrativas"
                                >
                                    <Settings className="w-5 h-5" />
                                </button>
                            )}
                            <div className="h-10 w-px bg-slate-200" />
                            <button
                                onClick={loadStats}
                                className="p-3 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-primary"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {showAdminPanel && isAdmin && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900 text-white rounded-[32px] p-8 mb-10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                                    Painel de Controle SRS
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Questões por Escopo</p>
                                        <div className="space-y-2">
                                            {['area', 'subarea', 'tema'].map(k => (
                                                <div key={k} className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
                                                    <span className="text-xs uppercase font-bold">{k}</span>
                                                    <input 
                                                        type="number" 
                                                        value={adminConfig?.questions?.[k] || 0}
                                                        onChange={(e) => setAdminConfig({...adminConfig, questions: {...adminConfig.questions, [k]: parseInt(e.target.value)}})}
                                                        className="bg-transparent text-right w-16 outline-none text-emerald-400 font-bold"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Gatilhos de Domínio (%)</p>
                                        <div className="space-y-2">
                                            {Object.keys(adminConfig?.score_bands || {}).map(k => (
                                                <div key={k} className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
                                                    <span className="text-xs uppercase font-bold text-slate-300">{k.replace('_', ' ')}</span>
                                                    <input 
                                                        type="number" 
                                                        value={adminConfig?.score_bands?.[k] || 0}
                                                        onChange={(e) => setAdminConfig({...adminConfig, score_bands: {...adminConfig.score_bands, [k]: parseInt(e.target.value)}})}
                                                        className="bg-transparent text-right w-16 outline-none text-emerald-400 font-bold"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-end gap-3">
                                        <button 
                                            onClick={handleSaveAdminConfig}
                                            disabled={savingAdmin}
                                            className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-black font-black uppercase py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                                        >
                                            {savingAdmin ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            Salvar Parâmetros
                                        </button>
                                        <button 
                                            onClick={() => setShowAdminPanel(false)}
                                            className="w-full bg-white/10 hover:bg-white/20 text-white font-black uppercase py-4 rounded-2xl transition-all"
                                        >
                                            Fechar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <button
                        onClick={() => { setView('picker'); setSearchQuery(''); setSelectedSpecialty(null); setSelectedSubspecialty(null) }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.3 }}
                    >
                        <Zap size={15} /> Nivelar Assunto
                    </button>
                </div>

                {/* Stats */}
                {statsLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                        <Loader2 size={24} color="#64748b" style={{ animation: 'spin 1s linear infinite' }} />
                    </div>
                ) : !hasData ? (
                    /* Empty state */
                    <div style={{ textAlign: 'center', padding: '48px 24px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 16 }}>
                        <Brain size={48} color="#4b5563" style={{ marginBottom: 16 }} />
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#94a3b8', marginBottom: 8 }}>Nenhum nivelamento realizado</h3>
                        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
                            Escolha um assunto e faça seu primeiro nivelamento para descobrir seu nível atual e receber um plano de revisão personalizado.
                        </p>
                        <button
                            onClick={() => setView('picker')}
                            style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
                        >
                            Começar meu primeiro nivelamento
                        </button>
                    </div>
                ) : (
                    <>
                {/* Stats grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StatCard icon={BarChart3} value={stats.totalPlacements} label="Nivelamentos" color="#f59e0b" description="Total de sessões realizadas" />
                    <StatCard icon={Calendar} value={stats.todayReviews.length} label="Revisões hoje" color="#3b82f6" description="Meta de hoje" />
                    <StatCard icon={AlertTriangle} value={stats.overdueReviews.length} label="Atrasadas" color="#ef4444" description="Prioridade máxima" />
                    <StatCard icon={Trophy} value={`${stats.avgScore}%`} label="Média geral" color="#22c55e" description="Desempenho acumulado" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Reviews */}
                    <div className="space-y-6">
                        {(stats.todayReviews.length > 0 || stats.overdueReviews.length > 0) && (
                            <div>
                                <h3 className="text-xs font-black uppercase text-slate-500 tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Prioridades de Hoje
                                </h3>
                                {[...stats.overdueReviews, ...stats.todayReviews].slice(0, 5).map((ev: any) => (
                                    <ReviewCard key={ev.id} event={ev} />
                                ))}
                            </div>
                        )}

                        {upcomingReviews.length > 0 && (
                            <div>
                                <h3 className="text-xs font-black uppercase text-slate-500 tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Próximos 7 Dias
                                </h3>
                                {upcomingReviews.slice(0, 5).map((ev: any) => (
                                    <ReviewCard key={ev.id} event={ev} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Memory Map */}
                    <div>
                        <h3 className="text-xs font-black uppercase text-slate-500 tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            Mapa de Retenção
                        </h3>
                        <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-6 space-y-4">
                            {stats.memory.length > 0 ? (
                                stats.memory.slice(0, 8).map((mem: any) => {
                                    const color = getMasteryColor(mem.mastery_level)
                                    return (
                                        <div key={mem.id} className="flex items-center gap-4 group">
                                            <div className="w-1.5 h-10 rounded-full bg-slate-800 relative overflow-hidden shrink-0">
                                                <div className="absolute bottom-0 left-0 w-full bg-current transition-all duration-1000" style={{ height: `${mem.last_score}%`, color }} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <h4 className="text-sm font-bold text-slate-200 truncate">{mem.scope_label || slugToLabel(mem.specialty_id)}</h4>
                                                    <span className="text-[10px] font-black text-white">{mem.last_score}%</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] uppercase font-black tracking-widest" style={{ color }}>{getMasteryLabel(mem.mastery_level)}</span>
                                                    <span className="text-[10px] text-slate-600 font-medium">Revisão: {formatDate(mem.next_review_date)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="py-12 text-center">
                                    <TrendingUp className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                                    <p className="text-xs text-slate-500 font-medium">Sua árvore de conhecimento <br/>começará a crescer aqui.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                    </>
                )}

                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER: Picker
    // ─────────────────────────────────────────────────────────────────────────
    if (view === 'picker') {
        const tabs: { key: PickerTab; label: string; count: number }[] = [
            { key: 'area', label: 'Por Área', count: 20 },
            { key: 'subarea', label: 'Por Subárea', count: 15 },
            { key: 'tema', label: 'Por Tema', count: 10 },
        ]

        return (
            <div style={{ fontFamily: "'Inter', sans-serif", color: '#e2e8f0' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <button onClick={() => setView('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 13 }}>
                        <ChevronLeft size={16} /> Voltar
                    </button>
                    <div>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Escolher Assunto</h2>
                        <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Selecione o escopo do nivelamento</p>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: 'rgba(0,0,0,0.3)', padding: 4, borderRadius: 10 }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => { setPickerTab(tab.key); setSelectedSpecialty(null); setSelectedSubspecialty(null) }}
                            style={{
                                flex: 1, padding: '8px 4px', border: 'none', borderRadius: 7, cursor: 'pointer', fontSize: 12, fontWeight: 600, textAlign: 'center',
                                background: pickerTab === tab.key ? '#f59e0b' : 'transparent',
                                color: pickerTab === tab.key ? '#000' : '#94a3b8',
                                transition: 'all 0.2s',
                            }}
                        >
                            {tab.label}
                            <span style={{ display: 'block', fontSize: 10, opacity: 0.7 }}>{tab.count} questões</span>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div style={{ position: 'relative', marginBottom: 16 }}>
                    <Search size={14} color="#64748b" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Buscar especialidade..."
                        style={{ width: '100%', padding: '10px 12px 10px 34px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                    />
                </div>

                {/* List */}
                {countsLoading ? (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                        <Loader2 size={24} color="#64748b" style={{ animation: 'spin 1s linear infinite' }} />
                        <p style={{ color: '#64748b', fontSize: 13, marginTop: 8 }}>Carregando questões do banco...</p>
                    </div>
                ) : (
                    <div style={{ maxHeight: 480, overflowY: 'auto', paddingRight: 4 }}>
                        {pickerTab === 'area' && filteredSpecialties.map(([specId, specData]) => (
                            <div
                                key={specId}
                                onClick={() => {
                                    if (!sessionLoading) startSession({
                                        scopeType: 'area',
                                        specialtyId: specId,
                                        label: slugToLabel(specId),
                                    })
                                }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: 10, marginBottom: 6, cursor: 'pointer', transition: 'all 0.15s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,158,11,0.08)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                            >
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <BookOpen size={16} color="#f59e0b" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', margin: 0 }}>{slugToLabel(specId)}</p>
                                    <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{specData.total} questões aprovadas</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '2px 8px', borderRadius: 6 }}>
                                        20 q
                                    </span>
                                    <ChevronRight size={14} color="#64748b" />
                                </div>
                            </div>
                        ))}

                        {pickerTab === 'subarea' && filteredSpecialties.map(([specId, specData]) => {
                            const isExpanded = expandedAreas.has(specId)
                            const subs = Object.entries(specData.subspecialties)
                                .filter(([, s]) => s.total > 0)
                                .sort(([, a], [, b]) => b.total - a.total)

                            if (subs.length === 0) return null

                            return (
                                <div key={specId} style={{ marginBottom: 6 }}>
                                    <div
                                        onClick={() => setExpandedAreas(prev => {
                                            const n = new Set(prev)
                                            n.has(specId) ? n.delete(specId) : n.add(specId)
                                            return n
                                        })}
                                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, cursor: 'pointer' }}
                                    >
                                        {isExpanded ? <ChevronDown size={14} color="#94a3b8" /> : <ChevronRight size={14} color="#94a3b8" />}
                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1', flex: 1 }}>{slugToLabel(specId)}</span>
                                        <span style={{ fontSize: 11, color: '#64748b' }}>{subs.length} subáreas · {specData.total} q</span>
                                    </div>
                                    {isExpanded && (
                                        <div style={{ paddingLeft: 12, marginTop: 4 }}>
                                            {subs.map(([subId, subData]) => (
                                                <div
                                                    key={subId}
                                                    onClick={() => {
                                                        if (!sessionLoading) startSession({
                                                            scopeType: 'subarea',
                                                            specialtyId: specId,
                                                            subspecialtyId: subId,
                                                            label: `${slugToLabel(specId)} > ${slugToLabel(subId)}`,
                                                        })
                                                    }}
                                                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 8, marginBottom: 4, cursor: 'pointer', transition: 'all 0.15s' }}
                                                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.08)')}
                                                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                                                >
                                                    <div style={{ flex: 1 }}>
                                                        <p style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0', margin: 0 }}>{slugToLabel(subId)}</p>
                                                        <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{subData.total} questões</p>
                                                    </div>
                                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#3b82f6', background: 'rgba(59,130,246,0.1)', padding: '2px 7px', borderRadius: 5 }}>15 q</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                        {pickerTab === 'tema' && filteredSpecialties.map(([specId, specData]) => {
                            const isExpanded = expandedAreas.has(specId)
                            const subs = Object.entries(specData.subspecialties)
                                .filter(([, s]) => Object.values(s.subjects).length > 0)
                                .sort(([, a], [, b]) => b.total - a.total)
                            if (subs.length === 0) return null

                            return (
                                <div key={specId} style={{ marginBottom: 6 }}>
                                    <div
                                        onClick={() => setExpandedAreas(prev => { const n = new Set(prev); n.has(specId) ? n.delete(specId) : n.add(specId); return n })}
                                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, cursor: 'pointer' }}
                                    >
                                        {isExpanded ? <ChevronDown size={14} color="#94a3b8" /> : <ChevronRight size={14} color="#94a3b8" />}
                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#cbd5e1', flex: 1 }}>{slugToLabel(specId)}</span>
                                        <span style={{ fontSize: 11, color: '#64748b' }}>{specData.total} q</span>
                                    </div>
                                    {isExpanded && subs.map(([subId, subData]) => {
                                        const subKey = `${specId}:${subId}`
                                        const subExpanded = expandedSubs.has(subKey)
                                        const subjects = Object.entries(subData.subjects)
                                            .filter(([, c]) => c >= 5)
                                            .sort(([, a], [, b]) => b - a)
                                        if (subjects.length === 0) return null
                                        return (
                                            <div key={subId} style={{ paddingLeft: 12, marginTop: 4 }}>
                                                <div
                                                    onClick={() => setExpandedSubs(prev => { const n = new Set(prev); n.has(subKey) ? n.delete(subKey) : n.add(subKey); return n })}
                                                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 7, marginBottom: 4, cursor: 'pointer' }}
                                                >
                                                    {subExpanded ? <ChevronDown size={12} color="#64748b" /> : <ChevronRight size={12} color="#64748b" />}
                                                    <span style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8', flex: 1 }}>{slugToLabel(subId)}</span>
                                                    <span style={{ fontSize: 10, color: '#64748b' }}>{subjects.length} temas</span>
                                                </div>
                                                {subExpanded && (
                                                    <div style={{ paddingLeft: 12 }}>
                                                        {subjects.map(([subjId, count]) => (
                                                            <div
                                                                key={subjId}
                                                                onClick={() => {
                                                                    if (!sessionLoading) startSession({
                                                                        scopeType: 'tema',
                                                                        specialtyId: specId,
                                                                        subspecialtyId: subId,
                                                                        subjectId: subjId,
                                                                        label: `${slugToLabel(specId)} > ${slugToLabel(subjId)}`,
                                                                    })
                                                                }}
                                                                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 6, marginBottom: 3, cursor: 'pointer', transition: 'all 0.15s' }}
                                                                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(34,197,94,0.06)')}
                                                                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.01)')}
                                                            >
                                                                <div style={{ flex: 1 }}>
                                                                    <p style={{ fontSize: 12, fontWeight: 500, color: '#cbd5e1', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                        {slugToLabel(subjId)}
                                                                    </p>
                                                                    <p style={{ fontSize: 10, color: '#64748b', margin: 0 }}>{count} questões</p>
                                                                </div>
                                                                <span style={{ fontSize: 10, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.1)', padding: '2px 6px', borderRadius: 5, flexShrink: 0 }}>10 q</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )}

                {sessionLoading && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                        <div style={{ textAlign: 'center' }}>
                            <Loader2 size={32} color="#f59e0b" style={{ animation: 'spin 1s linear infinite' }} />
                            <p style={{ color: '#e2e8f0', marginTop: 12 }}>Preparando nivelamento...</p>
                        </div>
                    </div>
                )}

                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER: Session (Quiz)
    // ─────────────────────────────────────────────────────────────────────────
    if (view === 'session' && session) {
        const q = session.questions[session.currentIndex]
        const answered = session.answers[session.currentIndex]
        const correct = answered === q.resposta_correta
        const progress = ((session.currentIndex + (answered !== undefined ? 1 : 0)) / session.questions.length) * 100
        const altKeys = Object.keys(q.alternativas || {}).sort()

        return (
            <div style={{ fontFamily: "'Inter', sans-serif", color: '#e2e8f0', maxWidth: 680, margin: '0 auto' }}>
                {/* Progress bar */}
                <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 12, color: '#64748b' }}>{session.scope.label}</span>
                        <span style={{ fontSize: 12, color: '#64748b' }}>{session.currentIndex + 1} / {session.questions.length}</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #f59e0b, #d97706)', borderRadius: 2, transition: 'width 0.3s' }} />
                    </div>
                </div>

                {/* Difficulty badge */}
                {q.dificuldade && (
                    <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, marginBottom: 12, display: 'inline-block', textTransform: 'uppercase',
                        background: q.dificuldade.toLowerCase().includes('facil') || q.dificuldade.toLowerCase().includes('fácil') ? 'rgba(34,197,94,0.15)' :
                            q.dificuldade.toLowerCase().includes('dificil') || q.dificuldade.toLowerCase().includes('difícil') ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                        color: q.dificuldade.toLowerCase().includes('facil') || q.dificuldade.toLowerCase().includes('fácil') ? '#22c55e' :
                            q.dificuldade.toLowerCase().includes('dificil') || q.dificuldade.toLowerCase().includes('difícil') ? '#ef4444' : '#f59e0b',
                    }}>
                        {q.dificuldade}
                    </span>
                )}

                {/* Question */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px', marginBottom: 16 }}>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: '#e2e8f0', margin: 0 }}>{q.enunciado}</p>
                </div>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {altKeys.map(key => {
                        const isSelected = answered === key
                        const isCorrect = key === q.resposta_correta
                        let bg = 'rgba(255,255,255,0.03)'
                        let border = 'rgba(255,255,255,0.07)'
                        let textColor = '#e2e8f0'
                        if (answered !== undefined) {
                            if (isCorrect) { bg = 'rgba(34,197,94,0.1)'; border = '#22c55e'; }
                            else if (isSelected) { bg = 'rgba(239,68,68,0.1)'; border = '#ef4444'; }
                        }

                        return (
                            <button
                                key={key}
                                onClick={() => answerQuestion(key)}
                                disabled={answered !== undefined}
                                style={{
                                    display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px',
                                    background: bg, border: `1px solid ${border}`, borderRadius: 10,
                                    cursor: answered !== undefined ? 'default' : 'pointer', textAlign: 'left',
                                    color: textColor, fontSize: 14, lineHeight: 1.5, transition: 'all 0.15s',
                                    width: '100%',
                                }}
                            >
                                <span style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    minWidth: 24, height: 24, borderRadius: '50%', fontSize: 11, fontWeight: 700,
                                    background: answered !== undefined && (isCorrect || isSelected) ? 'transparent' : 'rgba(255,255,255,0.08)',
                                    color: border === 'rgba(255,255,255,0.07)' ? '#94a3b8' : border,
                                }}>
                                    {key.toUpperCase()}
                                </span>
                                {q.alternativas[key]}
                            </button>
                        )
                    })}
                </div>

                {/* Feedback */}
                {session.showResult && answered !== undefined && (
                    <div style={{
                        padding: '14px 16px', borderRadius: 10, marginBottom: 16,
                        background: correct ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                        border: `1px solid ${correct ? '#22c55e' : '#ef4444'}33`,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: q.explicacao ? 8 : 0 }}>
                            {correct ? <CheckCircle2 size={16} color="#22c55e" /> : <XCircle size={16} color="#ef4444" />}
                            <span style={{ fontSize: 14, fontWeight: 600, color: correct ? '#22c55e' : '#ef4444' }}>
                                {correct ? 'Correto!' : `Incorreto. Resposta: ${q.resposta_correta?.toUpperCase()}`}
                            </span>
                        </div>
                        {q.explicacao && <p style={{ fontSize: 13, color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>{q.explicacao}</p>}
                    </div>
                )}

                {/* Next button */}
                {answered !== undefined && (
                    <button
                        onClick={session.currentIndex < session.questions.length - 1 ? nextQuestion : finishSession}
                        disabled={sessionLoading}
                        style={{
                            width: '100%', padding: '13px', background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            border: 'none', borderRadius: 10, color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        }}
                    >
                        {sessionLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> :
                            session.currentIndex < session.questions.length - 1 ? <><ArrowRight size={16} /> Próxima questão</> :
                                <><Trophy size={16} /> Ver resultado</>}
                    </button>
                )}

                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        )
    }

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER: Result
    // ─────────────────────────────────────────────────────────────────────────
    if (view === 'result' && placementResult) {
        const { score, masteryLevel, correct, wrong, total } = placementResult
        const color = getMasteryColor(masteryLevel)
        const intervals = getReviewIntervals(masteryLevel)

        return (
            <div style={{ fontFamily: "'Inter', sans-serif", color: '#e2e8f0', maxWidth: 580, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${color}20`, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                        <Trophy size={28} color={color} />
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', margin: '0 0 4px' }}>Nivelamento concluído!</h2>
                    <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{session?.scope.label}</p>
                </div>

                {/* Score */}
                <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}30`, borderRadius: 16, padding: '24px', marginBottom: 20, textAlign: 'center' }}>
                    <div style={{ fontSize: 56, fontWeight: 900, color: color, lineHeight: 1 }}>{score}%</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color, marginTop: 4 }}>{getMasteryLabel(masteryLevel)}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#22c55e' }}>{correct}</div>
                            <div style={{ fontSize: 11, color: '#64748b' }}>Acertos</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#ef4444' }}>{wrong}</div>
                            <div style={{ fontSize: 11, color: '#64748b' }}>Erros</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#94a3b8' }}>{total}</div>
                            <div style={{ fontSize: 11, color: '#64748b' }}>Total</div>
                        </div>
                    </div>
                </div>

                {/* Pedagogical message */}
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px', marginBottom: 20 }}>
                    <p style={{ fontSize: 13, color: '#94a3b8', margin: '0 0 8px', fontWeight: 600 }}>📊 Diagnóstico:</p>
                    <p style={{ fontSize: 14, color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
                        {masteryLevel === 'MUITO_BAIXO' && 'Seu conhecimento neste assunto precisa de reforço imediato. Preparamos um plano de revisão intensivo para você.'}
                        {masteryLevel === 'BAIXO' && 'Você conhece partes do conteúdo, mas ainda há lacunas importantes. Revisões frequentes vão consolidar seu aprendizado.'}
                        {masteryLevel === 'BOM' && 'Bom entendimento! Você precisa consolidar alguns pontos. As revisões vão garantir a retenção de longo prazo.'}
                        {masteryLevel === 'ALTO' && 'Excelente domínio! Este conteúdo está bem consolidado. Revisões espaçadas manterão seu conhecimento ativo.'}
                    </p>
                </div>

                {/* Review plan */}
                <div style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 12, padding: '16px', marginBottom: 24 }}>
                    <p style={{ fontSize: 13, color: '#3b82f6', margin: '0 0 12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={14} /> Plano de revisão criado automaticamente
                    </p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {reviewDates.map((date, i) => (
                            <div key={i} style={{ textAlign: 'center', padding: '8px 12px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#93c5fd' }}>{date}</div>
                                <div style={{ fontSize: 10, color: '#64748b' }}>revisão {i + 1}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: 11, color: '#64748b', margin: '10px 0 0' }}>
                        ✅ As revisões foram adicionadas ao seu calendário de estudos
                    </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 10 }}>
                    <button
                        onClick={() => { setView('dashboard'); setSession(null); setPlacementResult(null) }}
                        style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#e2e8f0', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                    >
                        <BarChart3 size={15} /> Ver calendário
                    </button>
                    <button
                        onClick={() => { setView('picker'); setSession(null); setPlacementResult(null); setSearchQuery('') }}
                        style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: 10, color: '#000', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                    >
                        <Target size={15} /> Nivelar outro
                    </button>
                </div>
            </div>
        )
    }

    return null
}
