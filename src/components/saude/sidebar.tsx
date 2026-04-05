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
    CreditCard,
    User,
    Users,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Hexagon,
    Shield,
    Stethoscope,
    Activity,
    HeartPulse,
    ArrowLeftRight,
    ShieldAlert,
    Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/store/use-auth'
import { usePreferences } from '@/store/use-preferences'

const SIDEBAR_GROUPS = [
    {
        name: 'Principal',
        items: [
            { name: 'Dashboard', icon: Home, href: '/dashboard' },
            { name: 'Praticar', icon: Stethoscope, href: '/dashboard/setup' },
            { name: 'Simulados', icon: Layers, href: '/dashboard/simulados' },
        ]
    },
    {
        name: 'Aprendizado',
        items: [
            { name: 'Minha Agenda', icon: Calendar, href: '/dashboard/agenda', badge: 'BETA' },
            { name: 'Cadernos', icon: BookMarked, href: '/dashboard/cadernos', badge: 'BETA' },
            { name: 'Desempenho', icon: BarChart3, href: '/dashboard/stats', badge: 'BETA' },
        ]
    },
    {
        name: 'Social',
        items: [
            { name: 'Comunidade QRub', icon: Users, href: '/dashboard/comunidade', badge: 'BETA' },
        ]
    },
    {
        name: 'Suporte',
        items: [
            { name: 'Fale Conosco', icon: Shield, href: '/dashboard/support' },
            { name: 'Financeiro', icon: CreditCard, href: '/dashboard/financeiro' },
            { name: 'Configurações', icon: Settings, href: '/dashboard/settings' },
        ]
    }
]

export function SaudeSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuth()
    const { setSettingsOpen } = usePreferences()
    const [collapsed, setCollapsed] = useState(false)

    const isAdmin = user?.role === 'MASTER'

    return (
        <aside 
            className={cn(
                "hidden md:flex flex-col fixed left-0 top-0 h-full bg-[#1A1033] text-white border-r border-white/5 transition-all duration-500 z-[50] overflow-hidden",
                collapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header / Logo */}
            <div className="p-8 pb-4 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/10">
                        <Hexagon className="w-6 h-6 text-white fill-white/20" />
                    </div>
                    {!collapsed && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col leading-none"
                        >
                            <span className="text-2xl font-black italic uppercase tracking-tighter text-white">QRub</span>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Saúde</span>
                        </motion.div>
                    )}
                </Link>
            </div>

            {/* Navigation Groups */}
            <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto no-scrollbar scroll-smooth">
                {SIDEBAR_GROUPS.map((group) => (
                    <div key={group.name} className="space-y-1">
                        {!collapsed && (
                            <h3 className="px-4 text-[8px] font-black uppercase tracking-[0.2em] text-white/20 truncate">
                                {group.name}
                            </h3>
                        )}
                        <div className="space-y-0.5">
                            {group.items.map((item) => {
                                const active = pathname === item.href
                                const Icon = item.icon
                                
                                const isSettings = item.name === 'Configurações'
                                
                                const content = (
                                    <>
                                        <Icon className={cn(
                                            "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                                            active ? "text-white" : "text-white/40"
                                        )} />
                                        {!collapsed && (
                                            <span className="text-xs uppercase tracking-widest font-black truncate">
                                                {item.name}
                                            </span>
                                        )}
                                        {!collapsed && (item as any).badge && (
                                            <span className="ml-auto px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[7px] font-black uppercase tracking-wider shrink-0">
                                                {(item as any).badge}
                                            </span>
                                        )}
                                        {active && !collapsed && (
                                            <motion.div 
                                                layoutId="active-nav-indicator"
                                                className="absolute right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" 
                                            />
                                        )}
                                    </>
                                )

                                if (isSettings) {
                                    return (
                                        <button 
                                            key={item.name} 
                                            onClick={() => setSettingsOpen(true)}
                                            className={cn(
                                                "flex items-center gap-2.5 w-full text-left px-4 py-2.5 rounded-xl transition-all group relative",
                                                "text-white/40 hover:text-white hover:bg-white/5"
                                            )}
                                            title={collapsed ? item.name : undefined}
                                        >
                                            {content}
                                        </button>
                                    )
                                }

                                return (
                                    <Link 
                                        key={item.name} 
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all group relative",
                                            active 
                                                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/10 font-bold" 
                                                : "text-white/40 hover:text-white hover:bg-white/5"
                                        )}
                                        title={collapsed ? item.name : undefined}
                                    >
                                        {content}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}

                {/* MASTER SECTION - Apenas para Master */}
                {isAdmin && (
                    <div className="pt-4 mt-4 border-t border-white/5 space-y-2">
                        {!collapsed && (
                            <h3 className="px-4 text-[8px] font-black uppercase tracking-[0.2em] text-indigo-400 truncate">
                                Administração Master
                            </h3>
                        )}
                        <Link 
                            href="/dashboard/admin"
                            className={cn(
                                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all group relative",
                                pathname === '/dashboard/admin' 
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10 font-bold" 
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <ShieldAlert className="w-4 h-4 shrink-0" />
                            {!collapsed && <span className="text-xs uppercase tracking-widest font-black truncate">Administrativo</span>}
                        </Link>

                        <button 
                            onClick={() => {
                                localStorage.setItem('qrub_last_environment', 'CONCURSOS')
                                window.location.href = '/select-environment'
                            }}
                            className={cn(
                                "flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl bg-indigo-500/5 text-indigo-400 border border-indigo-500/10 group overflow-hidden transition-all hover:bg-indigo-600 hover:text-white",
                                collapsed && "justify-center"
                            )}
                        >
                            <ArrowLeftRight className="w-4 h-4 shrink-0 group-hover:rotate-180 duration-500 transition-transform" />
                            {!collapsed && <span className="text-[10px] font-black italic uppercase tracking-tighter truncate">Permutar Concursos</span>}
                        </button>
                    </div>
                )}
            </nav>

            {/* Footer / Logout / Collapse */}
            <div className="p-3 bg-black/10 border-t border-white/5 space-y-2">
                <button 
                    onClick={() => { logout(); router.push('/'); }}
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
