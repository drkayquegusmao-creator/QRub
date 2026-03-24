"use client"

import React, { useState } from "react"
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
    ArrowRight,
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
    Lock
} from "lucide-react"

import { ConcursoCard } from "@/components/concursos/concurso-card"
import { cn } from "@/lib/utils"

export default function AdminDashboardPage() {
    const [tab, setTab] = useState<'overview' | 'users' | 'content' | 'srs'>('overview')
    
    return (
        <div className="space-y-8 pb-20">
            {/* 1. CABEÇALHO MASTER */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        <Lock className="w-3 h-3" />
                        Admin Master Access
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-tight mb-2">
                        Sistema <span className="text-indigo-600 dark:text-indigo-400">Analítico</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl text-sm md:text-base leading-relaxed">
                        Painel de controle para monitoramento de usuários, conteúdos, performance de engine SRS e métricas de conversão.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 rounded-2xl bg-white dark:bg-white/5 text-slate-400 font-black text-[10px] uppercase tracking-widest border border-slate-100 dark:border-white/5 flex items-center gap-2 hover:text-indigo-600 transition-all">
                        <Download className="w-4 h-4" /> Exportar Report
                    </button>
                </div>
            </header>

            {/* 2. NAV TABS */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                <TabButton active={tab === 'overview'} onClick={() => setTab('overview')} label="Geral" icon={LayoutDashboard} />
                <TabButton active={tab === 'users'} onClick={() => setTab('users')} label="Usuários" icon={Users} />
                <TabButton active={tab === 'content'} onClick={() => setTab('content')} label="Conteúdo" icon={BookOpenIcon} />
                <TabButton active={tab === 'srs'} onClick={() => setTab('srs')} label="Engine SRS" icon={Brain} />
            </div>

            <AnimatePresence mode="wait">
                {tab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        {/* 3. METRICS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <MetricCard 
                                label="Total Usuários" 
                                value="12.482" 
                                trend="+12%" 
                                trendType="up"
                                icon={Users}
                                color="indigo"
                            />
                            <MetricCard 
                                label="Sessões Ativas" 
                                value="1.842" 
                                trend="+5%" 
                                trendType="up"
                                icon={Activity}
                                color="emerald"
                            />
                            <MetricCard 
                                label="Churn Rate" 
                                value="2.1%" 
                                trend="-0.4%" 
                                trendType="down"
                                icon={TrendingUp}
                                color="rose"
                            />
                            <MetricCard 
                                label="Tempo Médio" 
                                value="48m" 
                                trend="+15%" 
                                trendType="up"
                                icon={Clock}
                                color="amber"
                            />
                        </div>

                        {/* 4. MAIN CHARTS / ANALYTICS SECTION */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            
                            {/* Growth Chart Panel */}
                            <ConcursoCard className="lg:col-span-8 p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white flex items-center gap-3">
                                        <BarChart3 className="w-6 h-6 text-indigo-600" /> Crescimento de Base
                                    </h3>
                                    <select className="bg-slate-50 dark:bg-white/5 border-none outline-none text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl text-slate-500">
                                        <option>Últimos 30 dias</option>
                                        <option>Últimos 6 meses</option>
                                    </select>
                                </div>
                                <div className="h-72 flex items-end justify-between gap-4 px-4">
                                    {[32, 45, 38, 52, 65, 58, 75, 82, 70, 88, 92, 98].map((val, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center group">
                                            <div className="w-full relative h-[250px] flex items-end">
                                                <motion.div 
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${val}%` }}
                                                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg group-hover:from-indigo-500 transition-all opacity-80 group-hover:opacity-100"
                                                />
                                            </div>
                                            <span className="mt-4 text-[8px] font-bold text-slate-400 uppercase">Mes {i+1}</span>
                                        </div>
                                    ))}
                                </div>
                            </ConcursoCard>

                            {/* Conversion / Distribution */}
                            <ConcursoCard className="lg:col-span-4 p-10 flex flex-col justify-between">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white mb-8 flex items-center gap-3">
                                    <PieChart className="w-6 h-6 text-emerald-500" /> Distribuição Premium
                                </h3>
                                <div className="space-y-8 flex-1 flex flex-col justify-center">
                                    <div className="relative w-48 h-48 mx-auto">
                                        <svg className="w-full h-full" viewBox="0 0 36 36">
                                            <path 
                                                className="text-slate-100 dark:text-white/5" 
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none" stroke="currentColor" strokeWidth="3"
                                            />
                                            <path 
                                                className="text-indigo-600" 
                                                strokeDasharray="65, 100"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none" stroke="currentColor" strokeWidth="3"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-black italic text-[#1A1033] dark:text-white">65%</span>
                                            <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest text-center">Assinantes<br/>Premium</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                            <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">Anual</p>
                                            <p className="text-xl font-black italic text-[#1A1033] dark:text-white leading-none">4.2k</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Mensal</p>
                                            <p className="text-xl font-black italic text-[#1A1033] dark:text-white leading-none">3.8k</p>
                                        </div>
                                    </div>
                                </div>
                            </ConcursoCard>

                        </div>

                        {/* 5. RECENT ACTIVITY TABLE */}
                        <ConcursoCard className="overflow-hidden">
                            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#1e1a2d]">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white flex items-center gap-3">
                                    <Activity className="w-6 h-6 text-rose-500" /> Logs Críticos do Sistema
                                </h3>
                                <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:opacity-75 transition-all">Ver todos os logs</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-white/5">
                                            <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Hora</th>
                                            <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Usuário</th>
                                            <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Evento</th>
                                            <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                            <th className="px-8 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        <LogEntry time="10:24:12" user="kayque.gusmao@gmail.com" event="Sessão SRS Iniciada" status="Success" />
                                        <LogEntry time="10:22:05" user="admin@qrub.com.br" event="Update Question Database" status="Warning" color="text-amber-500" />
                                        <LogEntry time="10:18:44" user="user_4821@gmail.com" event="Criação de Simulado" status="Success" />
                                        <LogEntry time="10:15:30" user="system_bot" event="Backup Automatizado" status="Critical" color="text-rose-500" />
                                    </tbody>
                                </table>
                            </div>
                        </ConcursoCard>
                    </motion.div>
                )}

                {tab === 'users' && (
                    <motion.div
                        key="users"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="relative group w-full md:w-96">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input 
                                    type="text"
                                    placeholder="BUSCAR USUÁRIO POR NOME OU EMAIL..."
                                    className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-4 pl-12 pr-6 font-black text-[10px] uppercase tracking-widest outline-none focus:ring-4 ring-indigo-500/5 transition-all shadow-sm text-[#1A1033] dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 text-slate-400 hover:text-indigo-600 transition-all">
                                    <Filter className="w-4 h-4" />
                                </button>
                                <button className="px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all flex items-center gap-2">
                                    <UserPlus className="w-4 h-4" /> Convidar Usuário
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {Array.from({ length: 9 }).map((_, i) => (
                               <UserAdminCard key={i} />
                           ))}
                        </div>
                    </motion.div>
                )}

                {tab === 'content' && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-8 text-center py-20 bg-slate-50 dark:bg-white/5 rounded-[48px] border-2 border-dashed border-slate-200 dark:border-white/10"
                    >
                        <Database className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white">Gerenciamento de Conteúdo</h3>
                        <p className="text-slate-400 max-w-md mx-auto font-medium">Módulo em desenvolvimento para edição rápida de questões, importação em lote e curadoria de tópicos vinculados ao SRS.</p>
                        <div className="flex justify-center gap-4 mt-8">
                            <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">Importar CSV/Excel</button>
                            <button className="px-8 py-4 bg-white dark:bg-white/5 text-slate-400 border border-slate-100 dark:border-white/5 rounded-2xl font-black text-[10px] uppercase tracking-widest">Editor Manual</button>
                        </div>
                    </motion.div>
                )}

                {tab === 'srs' && (
                    <motion.div
                        key="srs"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <ConcursoCard theme="active" className="p-10 flex flex-col items-center justify-center space-y-4">
                                <Brain className="w-12 h-12 text-white" />
                                <h4 className="text-sm font-black uppercase tracking-widest opacity-60">Retenção Global</h4>
                                <span className="text-6xl font-black italic tracking-tighter">78.4%</span>
                                <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-widest text-center">Baseado em 1.2M de revisões individuais nos últimos 90 dias.</p>
                            </ConcursoCard>
                            
                            <ConcursoCard className="lg:col-span-2 p-10">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white mb-8 flex items-center gap-3">
                                    <Server className="w-6 h-6 text-indigo-600" /> Carga da Engine (Tasks Pendentes)
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Re-calculo de Curva (Job 1)', progress: 85, status: 'Processing' },
                                        { label: 'Sincronização Cloud (Job 2)', progress: 42, status: 'Syncing' },
                                        { label: 'Limpeza de Cache (Job 3)', progress: 10, status: 'Pending' }
                                    ].map((job, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-[#1A1033] dark:text-white">{job.label}</span>
                                                <span className="text-indigo-600">{job.status} ({job.progress}%)</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${job.progress}%` }}
                                                    className="h-full bg-indigo-600"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ConcursoCard>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ConcursoCard className="bg-orange-500/5 border-orange-500/20 p-6">
                                <div className="flex items-center gap-3 text-orange-600 mb-2">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Config Global</span>
                                </div>
                                <h5 className="text-lg font-black italic text-[#1A1033] dark:text-white">Factor K: 2.1</h5>
                                <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">Multiplicador de intervalo padrão</p>
                            </ConcursoCard>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// ─── SUBCOMPONENTS ──────────────────────────────────────────────────────────

function TabButton({ active, onClick, label, icon: Icon }: any) {
    return (
        <button 
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                active 
                    ? "bg-[#1A1033] dark:bg-white text-white dark:text-[#1A1033] shadow-xl" 
                    : "text-slate-400 hover:text-[#1A1033] dark:hover:text-white"
            )}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    )
}

function MetricCard({ label, value, trend, trendType, icon: Icon, color }: any) {
    const colors = {
        indigo: "bg-indigo-600 shadow-indigo-600/20",
        emerald: "bg-emerald-600 shadow-emerald-600/20",
        rose: "bg-rose-600 shadow-rose-600/20",
        amber: "bg-amber-600 shadow-amber-600/20"
    }

    return (
        <ConcursoCard className="p-6 relative group overflow-hidden">
             <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-all">
                <Icon className="w-20 h-20" />
            </div>
            <div className="relative z-10 flex items-center justify-between mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", colors[color as keyof typeof colors])}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-[8px] font-black uppercase tracking-widest",
                    trendType === 'up' ? "text-emerald-500" : "text-rose-500"
                )}>
                    {trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
            <h4 className="text-3xl font-black italic tracking-tighter text-[#1A1033] dark:text-white">{value}</h4>
        </ConcursoCard>
    )
}

function LogEntry({ time, user, event, status, color = "text-emerald-500" }: any) {
    return (
        <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <td className="px-8 py-5 text-[10px] font-bold text-slate-400">{time}</td>
            <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-black text-[10px] uppercase">
                        {user.substring(0, 2)}
                    </div>
                    <span className="text-[11px] font-black italic text-[#1A1033] dark:text-white tracking-tight">{user}</span>
                </div>
            </td>
            <td className="px-8 py-5 text-[11px] font-bold text-slate-600 dark:text-slate-400 capitalize">{event}</td>
            <td className="px-8 py-5">
                <span className={cn("text-[9px] font-black uppercase tracking-widest", color)}>{status}</span>
            </td>
            <td className="px-8 py-5 text-right">
                <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </td>
        </tr>
    )
}

function UserAdminCard() {
    return (
        <ConcursoCard className="p-6 hover:border-indigo-500/30 transition-all">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center relative overflow-hidden group-hover:bg-indigo-600 transition-all">
                    <Users className="w-8 h-8 text-slate-300 group-hover:text-white" />
                </div>
                <div className="flex-1">
                    <h5 className="text-lg font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none mb-1">Lucas Martins</h5>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                        <Mail className="w-2.5 h-2.5" /> lucas@email.com
                    </p>
                </div>
                <div className="px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 text-[8px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">
                    Premium
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Questões</p>
                    <p className="text-xl font-black italic text-[#1A1033] dark:text-white">1.284</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Performance</p>
                    <p className="text-xl font-black italic text-emerald-500">82%</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="flex-1 py-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl text-[8px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 hover:border-indigo-600 transition-all">Ver Detalhes</button>
                <button className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                    <ShieldAlert className="w-4 h-4" />
                </button>
            </div>
        </ConcursoCard>
    )
}

function BookOpenIcon(props: any) {
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
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    )
}
