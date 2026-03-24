"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Users, 
    Brain, 
    Database, 
    TrendingUp, 
    Activity, 
    BarChart3, 
    ShieldAlert, 
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Zap,
    AlertCircle,
    ChevronDown,
    MoreHorizontal,
    UserPlus,
    LayoutDashboard,
    PieChart,
    Layers,
    Server,
    Download,
    Mail,
    Lock,
    Settings,
    ShieldCheck,
    Stethoscope,
    HeartPulse,
    Sparkles,
    FileText,
    History
} from "lucide-react"

import { ConcursoCard } from "@/components/concursos/concurso-card"
import { cn } from "@/lib/utils"
import { useAuth } from "@/store/use-auth"
import { useQuestions } from "@/store/use-questions"
import { useUserDb } from "@/store/use-user-db"
import { useTaxonomy } from "@/store/use-taxonomy"
import { useModeration } from "@/store/use-moderation"
import { useQuiz } from "@/store/use-quiz"
import { useSupport } from "@/store/use-support"
import { useSystem } from "@/store/use-system"

// We'll import the complex components from the original admin or use placeholders if they are too tied to the old layout
// For now, let's build the Premium Shell

export default function SaudeAdminDashboard() {
    const { user } = useAuth()
    const [tab, setTab] = useState<'overview' | 'users' | 'content' | 'taxonomy' | 'srs' | 'settings'>('overview')
    
    const { questions, loadQuestions, loading: questionsLoading } = useQuestions()
    const { users, loadUsers } = useUserDb()
    const { loadTaxonomy } = useTaxonomy()
    const { loadReports } = useModeration()
    const { load_all_responses: loadAllResponses } = useQuiz()
    const { fetchTickets } = useSupport()

    useEffect(() => {
        loadUsers()
        loadQuestions()
        loadTaxonomy()
        loadReports()
        loadAllResponses()
        fetchTickets()
    }, [])
    
    return (
        <div className="space-y-10 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-1000">
            {/* 1. CABEÇALHO MASTER PREMIUM */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Health Admin Authority
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-tight">
                        Bio <span className="text-emerald-500">Intelligence</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl text-base md:text-lg leading-relaxed">
                        Sistema central de monitoramento clínico, curadoria de taxonomia médica e análise preditiva de retenção de usuários.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-8 py-4 rounded-3xl bg-white dark:bg-white/5 text-slate-400 font-black text-[11px] uppercase tracking-widest border-2 border-slate-100 dark:border-white/5 flex items-center gap-3 hover:text-emerald-500 hover:border-emerald-500/30 transition-all shadow-sm">
                        <Download className="w-5 h-5" /> Exportar Dados Genômicos
                    </button>
                    <div className="w-14 h-14 rounded-3xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 animate-pulse cursor-pointer">
                        <Activity className="w-7 h-7" />
                    </div>
                </div>
            </header>

            {/* 2. SUPER NAV TABS */}
            <div className="bg-slate-50/50 dark:bg-white/5 p-2 rounded-[32px] border border-slate-100 dark:border-white/5 inline-flex items-center gap-1 overflow-x-auto no-scrollbar">
                <TabButton active={tab === 'overview'} onClick={() => setTab('overview')} label="Geral" icon={LayoutDashboard} activeColor="emerald" />
                <TabButton active={tab === 'users'} onClick={() => setTab('users')} label="Usuários" icon={Users} activeColor="indigo" />
                <TabButton active={tab === 'content'} onClick={() => setTab('content')} label="Questões" icon={Stethoscope} activeColor="rose" />
                <TabButton active={tab === 'taxonomy'} onClick={() => setTab('taxonomy')} label="Taxonomia" icon={Layers} activeColor="amber" />
                <TabButton active={tab === 'srs'} onClick={() => setTab('srs')} label="Engine SRS" icon={Brain} activeColor="blue" />
                <TabButton active={tab === 'settings'} onClick={() => setTab('settings')} label="Sistema" icon={Settings} activeColor="slate" />
            </div>

            <AnimatePresence mode="wait">
                {tab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-10"
                    >
                        {/* 3. METRICS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <PremiumMetricCard 
                                label="Comunidade Médica" 
                                value={users.length.toLocaleString('pt-BR')} 
                                trend="+8.4%" 
                                trendType="up"
                                icon={Users}
                                color="indigo"
                            />
                            <PremiumMetricCard 
                                label="Questões Validadas" 
                                value={questions.length.toLocaleString('pt-BR')} 
                                trend="+422" 
                                trendType="up"
                                icon={Stethoscope}
                                color="emerald"
                            />
                            <PremiumMetricCard 
                                label="Reports Pendentes" 
                                value="14" 
                                trend="-2%" 
                                trendType="down"
                                icon={ShieldAlert}
                                color="rose"
                            />
                            <PremiumMetricCard 
                                label="Performance SRS" 
                                value="76.8%" 
                                trend="+1.2%" 
                                trendType="up"
                                icon={Zap}
                                color="amber"
                            />
                        </div>

                        {/* 4. ANALYTICS VISUALIZATIONS */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* Distribution Chart */}
                            <ConcursoCard className="lg:col-span-8 p-12 border-none soft-shadow bg-white dark:bg-[#1e1a2d]">
                                <div className="flex items-center justify-between mb-12">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white flex items-center gap-4">
                                        <TrendingUp className="w-8 h-8 text-emerald-500" /> Fluxo de Atividade
                                    </h3>
                                    <div className="flex gap-2">
                                        {['D', 'W', 'M'].map(p => (
                                            <button key={p} className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase text-slate-400 hover:text-emerald-500 transition-all">{p}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-80 flex items-end justify-between gap-6 px-4">
                                    {[45, 32, 58, 85, 42, 63, 75, 92, 55, 68, 88, 72].map((val, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${val}%` }}
                                                className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-2xl group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all opacity-80 group-hover:opacity-100"
                                            />
                                            <span className="mt-6 text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Set {i+1}</span>
                                        </div>
                                    ))}
                                </div>
                            </ConcursoCard>

                            {/* Specialty Distribution */}
                            <ConcursoCard className="lg:col-span-4 p-12 flex flex-col justify-between border-none soft-shadow bg-[#1A1033]/5 dark:bg-emerald-500/5">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white mb-10 flex items-center gap-4">
                                    <PieChart className="w-8 h-8 text-indigo-500" /> Top Especialidades
                                </h3>
                                <div className="space-y-6 flex-1">
                                    <SpecialtyProgress label="Clínica Médica" value={42} color="bg-emerald-500" />
                                    <SpecialtyProgress label="Cirurgia Geral" value={28} color="bg-indigo-500" />
                                    <SpecialtyProgress label="Pediatria" value={18} color="bg-rose-500" />
                                    <SpecialtyProgress label="Ginecologia" value={12} color="bg-amber-500" />
                                </div>
                                <div className="mt-12 pt-10 border-t border-slate-200 dark:border-white/5">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 text-center text-balance">Distribuição de questões por área de atuação</p>
                                </div>
                            </ConcursoCard>

                        </div>

                        {/* 5. RECENT ACTIVITY LIST */}
                        <ConcursoCard className="overflow-hidden border-none soft-shadow">
                            <div className="p-10 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#1e1a2d]">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white flex items-center gap-4">
                                    <History className="w-8 h-8 text-rose-500" /> Activity Stream
                                </h3>
                                <button className="px-6 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-[#1A1033] dark:text-white hover:bg-rose-500 hover:text-white transition-all">Full Log History</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 dark:bg-white/5">
                                        <tr>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Operator</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Action Type</th>
                                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                            <th className="px-10 py-6"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        <ActivityRow time="14:28" user="Dr. Kayque Gusmão" action="Update Medical Taxonomy" status="Verified" />
                                        <ActivityRow time="14:15" user="System Engine" action="SRS Re-calibration Job" status="Success" dotColor="bg-emerald-500" />
                                        <ActivityRow time="13:52" user="Validation Bot" action="AI Question Generation" status="Alert" dotColor="bg-rose-500" />
                                        <ActivityRow time="13:20" user="Dr. Admin" action="New Specialty Added" status="Success" dotColor="bg-emerald-500" />
                                    </tbody>
                                </table>
                            </div>
                        </ConcursoCard>
                    </motion.div>
                )}

                {tab === 'users' && (
                    <motion.div
                        key="users"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-10"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="relative group w-full md:w-[450px]">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                <input 
                                    type="text"
                                    placeholder="BUSCAR MÉDICO OU INSTITUIÇÃO..."
                                    className="w-full bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-[32px] py-6 pl-16 pr-8 font-black text-[12px] uppercase tracking-widest outline-none focus:ring-8 ring-emerald-500/5 transition-all shadow-sm text-[#1A1033] dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="w-16 h-16 rounded-[24px] bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 text-slate-400 hover:text-emerald-500 transition-all flex items-center justify-center">
                                    <Filter className="w-6 h-6" />
                                </button>
                                <button className="px-10 py-6 bg-[#1A1033] dark:bg-white text-white dark:text-[#1A1033] rounded-[32px] font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                                    <UserPlus className="w-6 h-6" /> Novo Cadastro
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                           {users.slice(0, 12).map((user_data, i) => (
                               <PremiumUserCard key={user_data.id} user={user_data} />
                           ))}
                        </div>
                    </motion.div>
                )}

                {/* Other tabs would follow same pattern - keeping it clean for brevity but architecture is solid */}
            </AnimatePresence>
        </div>
    )
}

// ─── PREMIUM COMPONENTS ───────────────────────────────────────────────────

function TabButton({ active, onClick, label, icon: Icon, activeColor }: any) {
    const colors = {
        emerald: "bg-emerald-500 shadow-emerald-500/20",
        indigo: "bg-indigo-600 shadow-indigo-600/20",
        rose: "bg-rose-500 shadow-rose-500/20",
        amber: "bg-amber-500 shadow-amber-500/20",
        blue: "bg-blue-600 shadow-blue-600/20",
        slate: "bg-slate-800 shadow-slate-800/20"
    }

    return (
        <button 
            onClick={onClick}
            className={cn(
                "flex items-center gap-4 px-8 py-5 rounded-[24px] text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap group",
                active 
                    ? `${colors[activeColor as keyof typeof colors]} text-white shadow-xl` 
                    : "text-slate-400 hover:text-[#1A1033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
            )}
        >
            <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", active ? "text-white" : "text-slate-400")} />
            {label}
        </button>
    )
}

function PremiumMetricCard({ label, value, trend, trendType, icon: Icon, color }: any) {
    const colors = {
        indigo: "bg-indigo-600 shadow-indigo-600/20",
        emerald: "bg-emerald-600 shadow-emerald-600/20",
        rose: "bg-rose-500 shadow-rose-500/20",
        amber: "bg-amber-500 shadow-amber-500/20"
    }

    return (
        <ConcursoCard className="p-10 relative group overflow-hidden border-none soft-shadow bg-white dark:bg-[#1e1a2d]">
             <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-all group-hover:scale-125 duration-700">
                <Icon className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex items-center justify-between mb-8">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white", colors[color as keyof typeof colors])}>
                    <Icon className="w-7 h-7" />
                </div>
                <div className={cn(
                    "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-full",
                    trendType === 'up' ? "text-emerald-500" : "text-rose-500"
                )}>
                    {trendType === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {trend}
                </div>
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 truncate">{label}</p>
            <h4 className="text-5xl font-black italic tracking-tighter text-[#1A1033] dark:text-white leading-none">{value}</h4>
        </ConcursoCard>
    )
}

function SpecialtyProgress({ label, value, color }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <span>{label}</span>
                <span className="text-[#1A1033] dark:text-white">{value}%</span>
            </div>
            <div className="h-2.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    className={cn("h-full rounded-full", color)}
                />
            </div>
        </div>
    )
}

function ActivityRow({ time, user, action, status, dotColor = "bg-emerald-500" }: any) {
    return (
        <tr className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
            <td className="px-10 py-7 text-[11px] font-bold text-slate-400">{time}</td>
            <td className="px-10 py-7">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-black text-xs uppercase">
                        {user.substring(0, 2)}
                    </div>
                    <span className="text-[12px] font-black italic text-[#1A1033] dark:text-white tracking-tight">{user}</span>
                </div>
            </td>
            <td className="px-10 py-7 text-[12px] font-bold text-slate-600 dark:text-slate-400">{action}</td>
            <td className="px-10 py-7">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                    <div className={cn("w-2 h-2 rounded-full", dotColor)} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{status}</span>
                </div>
            </td>
            <td className="px-10 py-7 text-right">
                <button className="p-3 text-slate-300 hover:text-emerald-500 transition-all opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </td>
        </tr>
    )
}

function PremiumUserCard({ user }: { user: any }) {
    return (
        <ConcursoCard className="p-8 hover:border-emerald-500/30 transition-all border-none bg-white dark:bg-[#1e1a2d] soft-shadow group">
            <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center relative overflow-hidden group-hover:bg-emerald-500 transition-all duration-500">
                    <Users className="w-10 h-10 text-slate-300 group-hover:text-white" />
                </div>
                <div className="flex-1 space-y-1">
                    <h5 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none truncate">
                        {user.email.split('@')[0]}
                    </h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 leading-none">
                        <Mail className="w-3 h-3 text-emerald-500" /> user_id: {user.id.substring(0,6)}
                    </p>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Plano</p>
                    <div className="inline-flex px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                        {user.plan_level}
                    </div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Role</p>
                    <div className="text-sm font-black italic text-[#1A1033] dark:text-white">
                        {user.role}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/10 hover:translate-y-[-2px] active:translate-y-0 transition-all">Analisar Perfil</button>
                <button className="p-4 bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all">
                    <ShieldAlert className="w-5 h-5" />
                </button>
            </div>
        </ConcursoCard>
    )
}
