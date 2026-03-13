"use client"

import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { useConcursoUserStats } from '@/store/concursos/use-user-stats'
import { useConcursoQuiz } from '@/store/concursos/use-quiz'
import { useConcursoDashboard, WidgetId } from '@/store/concursos/use-dashboard'
import { useConcursoTaxonomy } from '@/store/concursos/use-taxonomy'
import { 
    Zap, 
    BarChart3, 
    TrendingUp, 
    BookOpen, 
    Sparkles, 
    CheckCircle2, 
    LayoutGrid, 
    ArrowRight,
    Trophy,
    Target,
    FileText
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ConcursoUserStatsCard } from './stats-card'
import { SectionHeader } from '@/components/dashboard-ui'

export function ConcursoDashboard() {
    const router = useRouter()
    const { user } = useAuth()
    const { stats, loadStats } = useConcursoUserStats()
    const { responses, get_weekly_accuracy, load_responses } = useConcursoQuiz()
    const { widgets } = useConcursoDashboard()
    const { taxonomy, loadTaxonomy, getAreas } = useConcursoTaxonomy()

    useEffect(() => {
        if (user?.id) {
            loadStats(user.id)
            load_responses(user.id)
            loadTaxonomy()
        }
    }, [user?.id])

    const formattedDate = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })

    const areas = useMemo(() => getAreas(), [taxonomy])

    // --- WIDGET RENDERERS ---

    const renderStatsCard = () => <ConcursoUserStatsCard />

    const renderAreasGrid = () => (
        <section className="space-y-6">
            <SectionHeader 
                title="Explorar por Área" 
                subtitle="Selecione sua base de estudos" 
                icon={<LayoutGrid className="w-5 h-5" />} 
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {areas.length > 0 ? areas.map((area) => (
                    <button 
                        key={area.id}
                        onClick={() => router.push(`/concursos/treino/${area.slug}`)}
                        className="bg-white border-2 border-slate-100 p-6 rounded-[32px] hover:border-indigo-500/30 transition-all hover:-translate-y-1 flex flex-col items-center text-center gap-3 group"
                    >
                        <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-tighter text-[#1A1033] line-clamp-1">{area.name}</span>
                    </button>
                )) : (
                    <div className="col-span-full py-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center opacity-50">
                        <Database className="w-8 h-8 mb-2" />
                        <p className="text-[9px] font-black uppercase tracking-widest">Nenhuma área configurada</p>
                    </div>
                )}
            </div>
        </section>
    )

    const renderEvolutionStats = () => {
        const evolutionData = get_weekly_accuracy().map(d => ({ name: d.day, val: d.accuracy }))
        return (
            <div className="bg-white border-2 border-slate-100 rounded-[30px] p-6 md:p-8 soft-shadow flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-black italic uppercase tracking-tighter text-[#1A1033]">Evolução Semanal</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Média de acertos</p>
                    </div>
                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-500">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                </div>
                <div className="flex-1 w-full min-h-[140px]">
                    <ResponsiveContainer width="100%" height={140}>
                        <AreaChart data={evolutionData}>
                            <defs>
                                <linearGradient id="colorEvoConcurso" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94A3B8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94A3B8' }} domain={[0, 100]} width={25} />
                            <Tooltip contentStyle={{ backgroundColor: '#1A1033', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '10px' }} />
                            <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEvoConcurso)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )
    }

    const renderFastPractice = () => (
        <div className="bg-[#1A1033] rounded-[40px] p-8 md:p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Target className="w-40 h-40" />
            </div>
            <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-indigo-300 text-[10px] font-black uppercase tracking-widest">
                    <Zap className="w-3 h-3" /> Treino Turbo
                </div>
                <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                    Início <br /> <span className="text-indigo-400">Rápido</span>
                </h3>
                <p className="text-white/60 font-medium text-sm max-w-xs">
                    Gere uma bateria de 10 questões aleatórias de qualquer cargo agora.
                </p>
                <button 
                    onClick={() => router.push('/concursos/setup')}
                    className="flex items-center gap-3 bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:bg-indigo-400 transition-all"
                >
                    Começar Agora <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )

    const WIDGET_MAP: Record<string, () => React.ReactNode> = {
        'CONCURSO_STATS_CARD': renderStatsCard,
        'CONCURSO_AREAS_GRID': renderAreasGrid,
        'CONCURSO_RECENT_QUESTOES': renderEvolutionStats,
        'CONCURSO_PACKAGES': renderFastPractice
    }

    return (
        <div className="space-y-12 pb-32">
            <div className="pt-4 pb-2">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-none"
                >
                    QRub <span className="text-indigo-600 italic">Concursos</span>
                </motion.h1>
                <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-widest border border-indigo-200">Alpha</span>
                    <p className="text-slate-500 font-bold text-sm">{formattedDate}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {widgets.filter(w => w.visible).map((widget) => (
                    <div key={widget.id} className={widget.width === 'full' ? 'md:col-span-2' : ''}>
                        {WIDGET_MAP[widget.id]?.()}
                    </div>
                ))}
            </div>
            
            {/* Disclaimer for Admin Master */}
            <div className="bg-amber-50 border-2 border-dashed border-amber-200 p-8 rounded-[40px] flex items-center gap-6">
                <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="text-lg font-black italic uppercase tracking-tighter text-amber-600">Ambiente em Construção</h4>
                    <p className="text-sm font-medium text-amber-700/70">
                        Você está visualizando a arquitetura paralela do QRub Concursos. Esta estrutura está sendo sincronizada com o banco de dados oficial de concursos.
                    </p>
                </div>
            </div>
        </div>
    )
}

function Database(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
    )
}
