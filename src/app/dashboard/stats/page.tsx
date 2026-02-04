"use client"

import { useQuiz } from '@/store/use-quiz'
import { COURSES } from '@/lib/data-mock'
import { BarChart3, Activity, Target, Share2, Award, Zap, TrendingUp, Calendar, ChevronRight, PieChart, Sparkles, Filter, RotateCcw, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/store/use-auth'
import { SectionHeader, Divider } from '@/components/dashboard-ui'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { useState } from 'react'

export default function StudentStats() {
    const { user } = useAuth()
    const { get_accuracy_by_specialty, get_weekly_data, responses } = useQuiz()
    const weeklyData = get_weekly_data()
    const medicalSpecialties = COURSES[0].specialties

    const [timeRange, setTimeRange] = useState('30d')

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    // Prepare Radar Data
    const radarData = medicalSpecialties.map(spec => ({
        subject: spec.name.split(' ')[0], // Short name
        A: get_accuracy_by_specialty(spec.id),
        fullMark: 100
    }))

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12 pb-32"
        >
            {/* HEADER SIMPLIFICADO SEGUINDO PADRÃO */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-foreground">
                        Relatório de <span className="text-primary">Inteligência</span>
                    </h1>
                    <p className="text-muted-foreground font-medium mt-2 max-w-lg">
                        Análise profunda do seu desempenho, pontos cegos e projeção de aprovação.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-card border border-border text-foreground px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-muted transition-all">
                        <Calendar className="w-4 h-4" />
                        {timeRange}
                    </button>
                    <button className="royal-gradient text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                        <Share2 className="w-4 h-4" />
                        Exportar
                    </button>
                    <ResetButton />
                </div>
            </div>

            {/* VISÃO GERAL (CARDS) */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Precisão Global"
                    value={`${responses.length > 0 ? Math.round((responses.filter(r => r.is_correct).length / responses.length) * 100) : 0}%`}
                    icon={<Target className="w-6 h-6 text-primary" />}
                    trend="+2.5% vs. ontem"
                    trendUp
                />
                <StatCard
                    label="Questões Realizadas"
                    value={responses.length.toString()}
                    icon={<Activity className="w-6 h-6 text-blue-500" />}
                    trend="+14 hoje"
                    trendUp
                />
                <StatCard
                    label="Tempo Médio/Questão"
                    value="1:24"
                    icon={<Zap className="w-6 h-6 text-orange-500" />}
                    sub="Recomendado: 1:30"
                />
                <StatCard
                    label="Ranking Estimado"
                    value="Top 5%"
                    icon={<Award className="w-6 h-6 text-emerald-500" />}
                    trend="#128 Geral"
                    trendUp
                />
            </section>

            {/* GRÁFICOS PRINCIPAIS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* RADAR CHART (DOMÍNIO POR ÁREA) */}
                <div className="lg:col-span-1 bg-card border border-border/50 rounded-[35px] p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                    <h3 className="text-lg font-black italic uppercase tracking-tighter self-start mb-6 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-primary" /> Raio-X de Competência
                    </h3>

                    <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontWeight: 700, fill: '#333' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Precisão"
                                    dataKey="A"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                    fill="#8884d8"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AREA CHART (EVOLUÇÃO) - Use generic data or real */}
                <div className="lg:col-span-2 bg-card border border-border/50 rounded-[35px] p-8 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-emerald-500" /> Curva de Aprendizado
                            </h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Consistência e Volume Semanal</p>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#888' }} dy={10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ fontSize: '11px', fontWeight: 700, color: '#10B981' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <Divider />

            {/* DOMÍNIO TÉCNICO COMPLETO */}
            <section className="space-y-8">
                <SectionHeader
                    title="Métricas Detalhadas"
                    subtitle="Desempenho granular por especialidade"
                    icon={<Filter className="w-5 h-5" />}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {medicalSpecialties.map((spec) => {
                        const accuracy = get_accuracy_by_specialty(spec.id)
                        const isStrong = accuracy >= 70
                        const isWeak = accuracy < 50

                        return (
                            <div key={spec.id} className={`group p-6 rounded-[30px] border transition-all hover:-translate-y-1 relative overflow-hidden ${isStrong ? 'bg-emerald-500/5 border-emerald-500/20' : isWeak ? 'bg-rose-500/5 border-rose-500/20' : 'bg-card border-border/50'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2.5 rounded-xl ${isStrong ? 'bg-emerald-100 text-emerald-600' : isWeak ? 'bg-rose-100 text-rose-600' : 'bg-muted text-muted-foreground'}`}>
                                        <Activity className="w-5 h-5" />
                                    </div>
                                    <span className={`text-2xl font-black italic ${isStrong ? 'text-emerald-600' : isWeak ? 'text-rose-600' : 'text-foreground'}`}>
                                        {accuracy}%
                                    </span>
                                </div>

                                <h4 className="font-bold text-sm uppercase tracking-tight mb-1">{spec.name}</h4>
                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
                                    <div className={`h-full rounded-full ${isStrong ? 'bg-emerald-500' : isWeak ? 'bg-rose-500' : 'bg-primary'}`} style={{ width: `${accuracy}%` }} />
                                </div>

                                <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground">
                                    <span>{isStrong ? 'Dominado' : isWeak ? 'Crítico' : 'Regular'}</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

        </motion.div>
    )
}

function StatCard({ label, value, icon, trend, trendUp, sub }: { label: string, value: string, icon: React.ReactNode, trend?: string, trendUp?: boolean, sub?: string }) {
    return (
        <div className="bg-card border border-border/50 rounded-[35px] p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-muted/40 rounded-2xl group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                {trend && (
                    <span className={`ml-auto text-[10px] font-black uppercase px-2 py-1 rounded-lg ${trendUp ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                <h3 className="text-3xl font-black italic tracking-tighter text-foreground">{value}</h3>
                {sub && <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase">{sub}</p>}
            </div>
        </div>
    )
}

function ResetButton() {
    const { reset_metrics } = useQuiz()
    const [confirming, setConfirming] = useState(false)

    if (confirming) {
        return (
            <div className="flex gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                <button
                    onClick={() => setConfirming(false)}
                    className="px-4 py-2.5 rounded-xl bg-muted text-muted-foreground font-bold text-xs hover:bg-muted/80 transition-all"
                >
                    Cancelar
                </button>
                <button
                    onClick={() => {
                        reset_metrics()
                        setConfirming(false)
                        // Optional: Show toast or reload page logic
                        window.location.reload()
                    }}
                    className="px-4 py-2.5 rounded-xl bg-destructive text-white font-bold text-xs hover:bg-destructive/90 transition-all flex items-center gap-2"
                >
                    <Trash2 className="w-4 h-4" /> Confirmar Reset
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={() => setConfirming(true)}
            className="bg-card border border-destructive/20 text-destructive px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-destructive/10 transition-all"
        >
            <RotateCcw className="w-4 h-4" />
            Resetar
        </button>
    )
}
