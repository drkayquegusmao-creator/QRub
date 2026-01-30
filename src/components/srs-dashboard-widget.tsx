"use client"

import { useSRS, SubjectSRS } from '@/store/use-srs'
import { useAuth } from '@/store/use-auth'
import { COURSES } from '@/lib/data-mock'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import { BrainCircuit, Zap, CheckCircle2, TrendingUp, Calendar, ArrowRight, Play, RefreshCw, XCircle, AlertCircle, BarChart3, Clock, ChevronRight } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function SRSDashboardWidget() {
    const { user } = useAuth()
    const { get_daily_agenda, subjects } = useSRS()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const agenda = get_daily_agenda()

    // Memoized fallback
    const fallbackAgenda = useMemo(() => {
        const allSubjects: { id: string, name: string, specialtyName: string }[] = []
        COURSES.forEach(c =>
            c.specialties.forEach(s =>
                s.subspecialties.forEach(sub =>
                    sub.subjects.forEach(subj =>
                        allSubjects.push({ id: subj.id, name: subj.name, specialtyName: s.name })
                    )
                )
            )
        )
        return [...allSubjects].sort(() => 0.5 - Math.random()).slice(0, 3)
    }, [])

    // Collections
    const weakSubjects = useMemo(() => Object.values(subjects).filter((s) => s.level === 'FRACO'), [subjects])

    // Mock Evolution Data (fallback if no history)
    const evolutionData = useMemo(() => [
        { name: 'Seg', val: 65 },
        { name: 'Ter', val: 58 },
        { name: 'Qua', val: 72 },
        { name: 'Qui', val: 68 },
        { name: 'Sex', val: 85 },
        { name: 'Sab', val: 78 },
        { name: 'Dom', val: 82 },
    ], [])

    // Helper to get name
    const getSubjectInfo = (id: string) => {
        for (const c of COURSES) {
            for (const s of c.specialties) {
                for (const sub of s.subspecialties) {
                    const found = sub.subjects.find(subj => subj.id === id)
                    if (found) return { name: found.name, specialty: s.name }
                }
            }
        }
        return { name: id, specialty: 'Geral' }
    }

    if (!mounted) return null
    if (user?.plan_level !== 'INSANO') return null

    // Determine Main Action Item (Top of Agenda)
    const primaryAction = agenda.length > 0 ? agenda[0] : {
        subject_id: fallbackAgenda[0]?.id,
        level: 'PENDING',
        stage: 'NEUTRAL',
        next_review_date: null
    } as any

    const primaryInfo = getSubjectInfo(primaryAction.subject_id)

    return (
        <div className="space-y-8 mb-12 animate-in fade-in slide-in-from-top-8 duration-700">

            {/* HEADLINE */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <BrainCircuit className="w-3 h-3" />
                        Motor Neural Ativo
                    </div>
                    <div>
                        <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-foreground leading-[0.9]">
                            Agenda <span className="text-orange-500">Inteligente</span>
                        </h2>
                        <p className="text-muted-foreground font-medium mt-2 max-w-lg">
                            O QRub estuda por você. Identificamos seus pontos fracos e organizamos sua revisão automaticamente.
                        </p>
                    </div>
                </div>

                <div className="text-right hidden md:block">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Status do Motor</p>
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Otimizado
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. CARTÃO PRINCIPAL: AGENDA DO DIA */}
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-[40px] p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl group flex flex-col justify-between min-h-[300px]">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/20 transition-all duration-1000" />

                    <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-400">Prioridade Máxima</p>
                                <h3 className="text-3xl lg:text-4xl font-black italic uppercase leading-none">{primaryInfo.name}</h3>
                                <p className="text-white/60 font-bold uppercase text-xs tracking-wider">{primaryInfo.specialty}</p>
                            </div>
                            <div className={`p-4 rounded-2xl ${(primaryAction.level === 'PENDING' || primaryAction.level === 'NOT_LEVELED') ? 'bg-blue-500/20 text-blue-400' :
                                    primaryAction.level === 'FRACO' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                                }`}>
                                {(primaryAction.level === 'PENDING' || primaryAction.level === 'NOT_LEVELED') ? <Zap className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex gap-6 backdrop-blur-sm w-fit">
                            <div>
                                <p className="text-[9px] font-black uppercase text-white/40">Status</p>
                                <p className="text-sm font-bold uppercase">
                                    {primaryAction.stage === 'LEVELING' ? 'Nivelamento' :
                                        primaryAction.stage === 'NEUTRAL' ? 'Não Iniciado' : 'Revisão'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black uppercase text-white/40">Meta</p>
                                <p className="text-sm font-bold uppercase">
                                    {primaryAction.stage === 'LEVELING' ? '10 Questões' :
                                        primaryAction.stage === 'NEUTRAL' ? 'Nivelar Agora' : 'Manutenção'}
                                </p>
                            </div>
                            {primaryAction.next_review_date && (
                                <div>
                                    <p className="text-[9px] font-black uppercase text-white/40">Vencimento</p>
                                    <p className="text-sm font-bold uppercase text-rose-400">
                                        {formatDistanceToNow(new Date(primaryAction.next_review_date), { locale: ptBR, addSuffix: true })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative z-10 mt-8">
                        <Link href={`/dashboard/setup?subjectId=${primaryAction.subject_id}&mode=SRS&count=10`}>
                            <button className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-400 hover:text-white transition-all shadow-xl flex items-center gap-3">
                                <Play className="w-4 h-4 fill-current" />
                                {primaryAction.level === 'PENDING' ? 'Iniciar Sessão Automática' : 'Treinar Agora'}
                            </button>
                        </Link>
                    </div>
                </div>

                {/* 2. REVISÕES PENDENTES (SIDEBAR) */}
                <div className="bg-card border border-border/50 rounded-[40px] p-8 flex flex-col shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" /> Pendentes
                        </h3>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">{agenda.length}</span>
                    </div>

                    <div className="flex-1 w-full min-h-0 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                        {agenda.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground/50 space-y-2">
                                <CheckCircle2 className="w-10 h-10" />
                                <p className="text-xs font-bold uppercase tracking-wider">Tudo em dia!</p>
                            </div>
                        ) : (
                            agenda.slice(0, 5).map((item, idx) => {
                                const info = getSubjectInfo(item.subject_id)
                                return (
                                    <Link key={idx} href={`/dashboard/setup?subjectId=${item.subject_id}&mode=SRS`}>
                                        <div className="group flex items-center justify-between p-3 rounded-2xl hover:bg-muted transition-colors border border-transparent hover:border-border cursor-pointer">
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold uppercase truncate">{info.name}</p>
                                                <p className="text-[10px] text-muted-foreground uppercase">{info.specialty}</p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                    </Link>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* SECONDARY GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 3. ASSUNTOS FRACOS */}
                <div className="bg-card border border-border/50 rounded-[40px] p-8 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-rose-500" /> Pontos de Atenção
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {weakSubjects.length === 0 ? (
                            <div className="col-span-full py-8 text-center text-muted-foreground/50 border border-dashed border-border rounded-2xl">
                                <p className="text-xs font-bold uppercase tracking-wider">Nenhum assunto crítico identificado</p>
                            </div>
                        ) : (
                            weakSubjects.slice(0, 4).map((item, idx) => {
                                const info = getSubjectInfo(item.subject_id)
                                return (
                                    <div key={idx} className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-2xl flex flex-col justify-between gap-4">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-rose-400 mb-1">Status: Fraco</p>
                                            <p className="text-sm font-bold uppercase leading-tight line-clamp-1">{info.name}</p>
                                        </div>
                                        <Link href={`/dashboard/setup?subjectId=${item.subject_id}&mode=SRS`}>
                                            <button className="w-full py-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                                Treinar Focado
                                            </button>
                                        </Link>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>

                {/* 4. EVOLUÇÃO POR ASSUNTO */}
                <div className="bg-card border border-border/50 rounded-[40px] p-8 shadow-lg flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-500" /> Evolução Global
                        </h3>
                        <div className="flex gap-1">
                            {['7d', '30d'].map(r => (
                                <span key={r} className="px-2 py-1 rounded-lg bg-muted text-[10px] font-bold text-muted-foreground uppercase cursor-pointer hover:text-foreground">{r}</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full min-h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={evolutionData}>
                                <defs>
                                    <linearGradient id="colorEvo" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}
                                />
                                <Area type="monotone" dataKey="val" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorEvo)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    )
}
