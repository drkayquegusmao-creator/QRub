"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchPlanHealth, PlanHealth } from '@/lib/revisao-service'
import { 
    Calendar, 
    Zap, 
    BookOpen, 
    FileText, 
    Layers, 
    Settings,
    ArrowRight,
    Target,
    Clock,
    BarChart3,
    TrendingUp,
    CheckCircle2,
    RotateCcw,
    Sliders,
    History,
    Shield,
    Heart,
    Trophy,
    Sparkles,
    Brain,
    Info
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function StudyPlanPage() {
    const [step, setStep] = useState<'overview' | 'wizard' | 'config'>('overview')
    const [config, setConfig] = useState({
        hoursPerDay: 4,
        daysPerWeek: 6,
        focus: 'administrativo',
        goal: 'pcdf'
    })
    const [healthMetrics, setHealthMetrics] = useState<PlanHealth | null>(null)

    useEffect(() => {
        const load = async () => {
            const data = await fetchPlanHealth()
            setHealthMetrics(data)
        }
        load()
    }, [])

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-indigo-200 dark:border-indigo-500/20">
                        <Sparkles className="w-3 h-3" /> Motor de Planejamento Inteligente
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Plano de <span className="text-indigo-600 dark:text-indigo-400">Estudo</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5">
                            <Target className="w-3 h-3" /> Foco: {config.goal.toUpperCase()} • Estratégia Ativa
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link 
                        href="/concursos/agenda"
                        className="px-6 py-2.5 bg-[#1A1033] dark:bg-white text-white dark:text-[#1A1033] rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                    >
                        Abrir Agenda de Execução <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {step === 'overview' && (
                    <motion.div 
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        {/* 1. Status Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { label: 'Saúde do Plano', value: `${healthMetrics?.health ?? '--'}%`, icon: Heart, trend: '+2.1%', color: 'text-rose-500' },
                                { label: 'Média Diária', value: `${healthMetrics?.dailyAvg ?? '--'}H`, icon: Zap, trend: '-0.4H', color: 'text-amber-500' },
                                { label: 'Consistência', value: `${healthMetrics?.consistency ?? '--'}%`, icon: Trophy, trend: '+5%', color: 'text-emerald-500' },
                                { label: 'Revisões Hoje', value: String(healthMetrics?.pendingReviews ?? '--'), icon: History, trend: 'Urgente', color: 'text-indigo-500' },
                            ].map((stat, i) => (
                                <SummaryCard key={i} label={stat.label} value={stat.value} icon={<stat.icon className={cn("w-4 h-4", stat.color)} />} />
                            ))}
                        </div>

                        {/* 2. Planejamento e Controle Body */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            
                            {/* Distribution Column */}
                            <div className="lg:col-span-8 space-y-6">
                                <ConcursoCard>
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-[#1A1033] dark:text-white flex items-center gap-2 px-2">
                                            <BarChart3 className="w-4 h-4 text-indigo-600" /> Distribuição de Peso Decisiva
                                        </h3>
                                        <button 
                                            onClick={() => setStep('config')}
                                            className="text-[8px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-lg"
                                        >
                                            Ajustar Foco
                                        </button>
                                    </div>
                                    <div className="space-y-4 px-2">
                                        <DistributionItem label="Direito Constitucional" percent={35} color="bg-indigo-500" />
                                        <DistributionItem label="Direito Administrativo" percent={25} color="bg-indigo-400" />
                                        <DistributionItem label="Língua Portuguesa" percent={20} color="bg-indigo-300" />
                                        <DistributionItem label="Informática" percent={15} color="bg-indigo-200" />
                                        <DistributionItem label="Direito Penal" percent={5} color="bg-indigo-100" />
                                    </div>
                                </ConcursoCard>

                                {/* Planejamento Inteligente Alerts */}
                                <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10 rounded-[32px] p-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Brain className="w-24 h-24 text-amber-600" />
                                    </div>
                                    <div className="relative z-10 max-w-xl space-y-4">
                                        <h4 className="text-lg font-black uppercase italic tracking-tighter text-[#1A1033] dark:text-white">Diagnóstico da IA</h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                                            Notamos que seu desempenho em <span className="font-bold text-indigo-600">Direito Administrativo</span> caiu nos últimos 3 dias. 
                                            O sistema sugere redistribuir o plano para incluir um bloco de reforço teórico amanhã.
                                        </p>
                                        <div className="pt-2 flex items-center gap-3">
                                            <button className="px-6 py-3 bg-white dark:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#1A1033] dark:text-white shadow-sm border border-slate-100 dark:border-white/5">
                                                Ignorar
                                            </button>
                                            <button className="px-6 py-3 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">
                                                Reorganizar Agora
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Config Summary */}
                            <div className="lg:col-span-4 space-y-6">
                                <ConcursoCard>
                                    <h3 className="text-xs font-black uppercase tracking-widest text-[#1A1033] dark:text-white mb-6">Minhas Metas</h3>
                                    <div className="space-y-5">
                                        <MetaItem label="Carga Diária" value={`${config.hoursPerDay} HORAS`} />
                                        <MetaItem label="Ciclo Semanal" value={`${config.daysPerWeek} DIAS`} />
                                        <MetaItem label="Revisões" value="ATIVO (AUTOMÁTICO)" />
                                        <MetaItem label="Questões/Dia" value="30 MIN" />
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5">
                                        <button 
                                            onClick={() => setStep('config')}
                                            className="w-full py-4 rounded-xl bg-slate-100 dark:bg-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Sliders className="w-3 h-3" /> Alterar Configurações
                                        </button>
                                    </div>
                                </ConcursoCard>

                                <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#1A1033] to-[#2D1F4D] text-white">
                                    <Info className="w-5 h-5 text-indigo-400 mb-4" />
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2">Redistribuição Automática</p>
                                    <p className="text-xs font-medium leading-relaxed opacity-80">
                                        Se você pular uma tarefa hoje, o sistema irá redistribuir a carga suavemente nos próximos 3 dias para não te sobrecarregar amanhã.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'config' && <ConfigWizard onFinish={() => setStep('overview')} />}
            </AnimatePresence>
        </div>
    )
}

// Subcomponents
function SummaryCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <ConcursoCard className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{label}</span>
                <div className="w-6 h-6 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <p className="text-2xl font-black italic uppercase text-[#1A1033] dark:text-white">{value}</p>
        </ConcursoCard>
    )
}

function DistributionItem({ label, percent, color }: { label: string, percent: number, color: string }) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                <span className="text-[#1A1033] dark:text-white opacity-80">{label}</span>
                <span className="text-indigo-500">{percent}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${percent}%` }} 
                    className={cn("h-full rounded-full transition-all", color)} 
                />
            </div>
        </div>
    )
}

function MetaItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{label}</span>
            <span className="text-[10px] font-black text-[#1A1033] dark:text-white tracking-wider">{value}</span>
        </div>
    )
}

function ConfigWizard({ onFinish }: { onFinish: () => void }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto space-y-8 py-12"
        >
            <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto shadow-xl shadow-indigo-600/20 text-white">
                    <Settings className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white">Refinar Estratégia</h2>
                <p className="text-slate-400 text-sm font-medium">Ajuste seus parâmetros para que a IA gere a agenda perfeita.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChoiceBox 
                    title="Carga Diária" 
                    description="Quanto tempo você pode dedicar por dia?" 
                    options={['2 Horas', '4 Horas', '6 Horas', 'Full Time']} 
                />
                <ChoiceBox 
                    title="Intensidade" 
                    description="Como deve ser a velocidade de avanço?" 
                    options={['Leve', 'Padrão', 'Hardcore', 'Pós-Edital']} 
                />
            </div>

            <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[32px] p-8 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <Target className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-widest dark:text-white">Meta de Simulados</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Agenda a frequência de avaliações gerais</p>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {['Semanal', 'Quinzenal', 'Mensal', 'Somente Pós-Edital'].map((opt) => (
                        <button key={opt} className="px-4 py-3 rounded-xl border border-slate-100 dark:border-white/5 text-[9px] font-black uppercase text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all">
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-8 flex items-center justify-center gap-4">
                <button 
                    onClick={onFinish}
                    className="px-8 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400"
                >
                    Voltar
                </button>
                <button 
                    onClick={onFinish}
                    className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all"
                >
                    Salvar e Aplicar Agenda
                </button>
            </div>
        </motion.div>
    )
}

function ChoiceBox({ title, description, options }: { title: string, description: string, options: string[] }) {
    return (
        <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[32px] p-8 space-y-6">
            <div className="space-y-1">
                <h4 className="text-sm font-black uppercase tracking-widest dark:text-white">{title}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {options.map((opt) => (
                    <button key={opt} className="px-4 py-3 rounded-xl border border-slate-100 dark:border-white/5 text-[9px] font-black uppercase text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all">
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    )
}
