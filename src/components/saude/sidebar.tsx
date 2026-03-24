"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
    HeartPulse
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
            { name: 'Questões', icon: Stethoscope, href: '/dashboard/setup' },
            { name: 'Simulados', icon: Layers, href: '/dashboard/simulados' },
            { name: 'Revisão Médica', icon: Sparkles, icon_override: true, href: '/dashboard/revisao' },
            { name: 'Agenda Saúde', icon: Calendar, href: '/dashboard/agenda' },
        ]
    },
    {
        name: 'Organização',
        items: [
            { name: 'Especialidades', icon: HeartPulse, href: '/dashboard/especialidades' },
            { name: 'Temas', icon: Hash, href: '/dashboard/temas' },
            { name: 'Caderno de Erros', icon: BookMarked, href: '/dashboard/errors' },
            { name: 'Favoritos', icon: Star, href: '/dashboard/favoritos' },
            { name: 'Administrativo', icon: Shield, href: '/saude/admin' },
        ]
    },
    {
        name: 'Análise',
        items: [
            { name: 'Métricas', icon: BarChart3, href: '/dashboard/stats' },
            { name: 'Desempenho', icon: TrendingUp, href: '/dashboard/desempenho' },
        ]
    }
]

// Custom icon for Sparkles to match the "didactic" theme
function Sparkles(props: any) {
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
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    )
}

export function SaudeSidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)
    const { logout } = useAuth()

    return (
        <aside 
            className={cn(
                "hidden md:flex flex-col fixed left-0 top-0 h-screen bg-[#111827] text-white border-r border-white/5 transition-all duration-500 ease-in-out z-50 overflow-hidden",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header / Logo */}
            <div className="p-8 pb-4 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
                        <Hexagon className="w-6 h-6 text-white fill-white/20" />
                    </div>
                    {!collapsed && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col leading-none"
                        >
                            <span className="text-2xl font-black italic uppercase tracking-tighter">QRub</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Saúde</span>
                        </motion.div>
                    )}
                </Link>
            </div>

            {/* Nav Groups */}
            <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto no-scrollbar">
                {SIDEBAR_GROUPS.map((group) => (
                    <div key={group.name} className="space-y-1">
                        {!collapsed && (
                            <h3 className="px-4 text-[8px] font-black uppercase tracking-[0.2em] text-white/20 truncate">
                                {group.name}
                            </h3>
                        )}
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                                const Icon = item.icon_override ? Sparkles : item.icon
                                return (
                                    <Link 
                                        key={item.name} 
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all group relative",
                                            isActive 
                                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/10 font-bold" 
                                                : "text-white/40 hover:text-white hover:bg-white/5"
                                        )}
                                        title={collapsed ? item.name : undefined}
                                    >
                                        <Icon className={cn(
                                            "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                                            isActive ? "text-white" : "text-white/40"
                                        )} />
                                        {!collapsed && (
                                            <span className="text-xs uppercase tracking-widest font-black truncate">
                                                {item.name}
                                            </span>
                                        )}
                                        {isActive && !collapsed && (
                                            <motion.div 
                                                layoutId="active-nav-indicator-saude"
                                                className="absolute right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                                            />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer / User / Collapse */}
            <div className="p-3 bg-black/10 border-t border-white/5 space-y-2">
                <button 
                    onClick={() => logout()}
                    className="flex items-center gap-2.5 w-full px-4 py-2 rounded-xl hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all group"
                >
                    <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    {!collapsed && <span className="text-[9px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">Sair</span>}
                </button>

                <button 
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/30 hover:text-white transition-all"
                >
                    {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    {!collapsed && <span className="text-[8px] font-black uppercase tracking-widest">Recolher</span>}
                </button>
            </div>
        </aside>
    )
}
