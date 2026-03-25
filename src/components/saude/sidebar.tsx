"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
    Home, 
    BookOpen, 
    FileText, 
    Layers, 
    Calendar, 
    CheckSquare,
    Library,
    Hash,
    BookMarked,
    Star,
    BarChart3,
    TrendingUp,
    Target,
    Settings,
    User,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Hexagon,
    Shield,
    Stethoscope,
    Activity,
    HeartPulse,
    ArrowLeftRight,
    ShieldAlert
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/store/use-auth'

const SIDEBAR_GROUPS = [
    {
        name: 'Principal',
        items: [
            { name: 'Dashboard', icon: Home, href: '/dashboard' },
            { name: 'Praticar', icon: Stethoscope, href: '/dashboard/setup' },
            { name: 'Simulados', icon: Layers, href: '/dashboard/simulados' },
            { name: 'Resumo IA', icon: Activity, href: '/dashboard/summary' },
        ]
    },
    {
        name: 'Aprendizado',
        items: [
            { name: 'Minha Agenda', icon: Calendar, href: '/dashboard/agenda' },
            { name: 'Cadernos', icon: BookMarked, href: '/dashboard/cadernos' },
            { name: 'Desempenho', icon: BarChart3, href: '/dashboard/stats' },
        ]
    },
    {
        name: 'Suporte',
        items: [
            { name: 'Central de Ajuda', icon: Shield, href: '/dashboard/support' },
            { name: 'Configurações', icon: Settings, href: '/dashboard/settings' },
        ]
    }
]

export function SaudeSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuth()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <aside 
            className={cn(
                "hidden md:flex flex-col fixed left-0 top-0 h-full bg-white dark:bg-[#0B0F1A] border-r border-slate-200 dark:border-white/5 transition-all duration-500 z-[50]",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header / Logo */}
            <div className="p-6 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20 shrink-0">
                        <Hexagon className="w-5 h-5 text-white fill-white/20" />
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col leading-none">
                            <span className="text-xl font-black italic uppercase tracking-tighter dark:text-white text-[#111827]">QRub</span>
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500">Saúde</span>
                        </div>
                    )}
                </Link>
                <button 
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-8 overflow-y-auto no-scrollbar scroll-smooth pt-4">
                {SIDEBAR_GROUPS.map((group) => (
                    <div key={group.name} className="space-y-1">
                        {!collapsed && (
                            <p className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-600 mb-4">
                                {group.name}
                            </p>
                        )}
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const active = pathname === item.href
                                return (
                                    <Link 
                                        key={item.name} 
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative truncate",
                                            active 
                                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                                                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#111827] dark:hover:text-white"
                                        )}
                                    >
                                        <item.icon className={cn("w-5 h-5 shrink-0 transition-transform duration-300", !active && "group-hover:scale-110")} />
                                        {!collapsed && (
                                            <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                                        )}
                                        {active && !collapsed && (
                                            <motion.div layoutId="active-pill" className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}

                {/* MASTER SECTION */}
                {user?.role === 'MASTER' && (
                    <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-2">
                        {!collapsed && (
                            <p className="px-4 text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400 mb-4">
                                Master Authority
                            </p>
                        )}
                        <Link 
                            href="/dashboard/admin"
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group",
                                pathname === '/dashboard/admin' 
                                    ? "bg-[#1A1033] dark:bg-white text-white dark:text-[#1A1033] shadow-xl" 
                                    : "text-slate-400 hover:bg-indigo-50/50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400"
                            )}
                        >
                            <ShieldAlert className="w-5 h-5 shrink-0" />
                            {!collapsed && <span className="text-[10px] font-black italic uppercase tracking-tighter">Administrativo</span>}
                        </Link>

                        <button 
                            onClick={() => {
                                localStorage.setItem('qrub_last_environment', 'CONCURSOS')
                                window.location.href = '/select-environment'
                            }}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-2xl bg-indigo-600/5 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 border border-indigo-600/10 dark:border-indigo-400/10 group overflow-hidden transition-all hover:bg-indigo-600 hover:text-white",
                                collapsed && "justify-center"
                            )}
                        >
                            <ArrowLeftRight className="w-5 h-5 shrink-0 group-hover:rotate-180 duration-500 transition-transform" />
                            {!collapsed && <span className="text-[10px] font-black italic uppercase tracking-tighter">Permutar Concursos</span>}
                        </button>
                    </div>
                )}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-slate-200 dark:border-white/5 space-y-4 bg-white dark:bg-[#0B0F1A]">
                <button 
                    onClick={() => { logout(); router.push('/'); }}
                    className={cn(
                        "flex items-center gap-4 w-full px-4 py-3 rounded-xl border border-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300",
                        collapsed && "justify-center px-0"
                    )}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!collapsed && <span className="text-[10px] font-black uppercase tracking-widest">Encerrar Sessão</span>}
                </button>
            </div>
        </aside>
    )
}
