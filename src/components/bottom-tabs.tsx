"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, BarChart2, User, Users, History, Settings, LayoutGrid, Calendar, Sparkles } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

import { useAuth } from '@/store/use-auth'

export function BottomTabs() {
    const pathname = usePathname()
    const { user } = useAuth()

    const isConcursos = pathname?.startsWith('/concursos')
    const basePath = isConcursos ? '/concursos' : '/dashboard'

    const finalTabs = isConcursos ? [
        { label: 'Início', icon: LayoutDashboard, href: '/concursos' },
        { label: 'Agenda', icon: Calendar, href: '/concursos/agenda', badge: 'BETA' },
        { label: 'Praticar', icon: BookOpen, href: '/concursos/setup' },
        { label: 'Revisão', icon: Sparkles, href: '/concursos/revisao' },
        { label: 'Métricas', icon: BarChart2, href: '/concursos/estatisticas', badge: 'BETA' },
    ] : [
        { label: 'Início', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Praticar', icon: BookOpen, href: '/dashboard/setup' },
        { label: 'Comunidade', icon: Users, href: '/dashboard/comunidade' },
        { label: 'Caderno', icon: History, href: '/dashboard/errors', badge: 'BETA' },
        { label: 'Métricas', icon: BarChart2, href: '/dashboard/stats', badge: 'BETA' },
    ]

    if (user?.role === 'MASTER') {
        finalTabs.push({ 
            label: 'Master', 
            icon: Settings, 
            href: isConcursos ? '/concursos/admin' : '/admin' 
        })
    }

    // Hide bottom tabs on quiz and error pages
    const isQuizPage = pathname?.includes('/dashboard/quiz') || 
                      pathname?.includes('/dashboard/treinar-area') || 
                      pathname?.includes('/concursos/quiz') || 
                      pathname?.includes('/concursos/treino') ||
                      pathname?.includes('/dashboard/errors') ||
                      pathname?.includes('/concursos/errors') ||
                      pathname?.includes('/comunidade')

    if (isQuizPage) {
        return null
    }

    const activeColor = isConcursos ? "text-indigo-600" : "text-primary"
    const activeBg = isConcursos ? "bg-indigo-600/10" : "bg-primary/10"

    return (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-40">
            <nav className="bg-card/90 backdrop-blur-2xl border border-border rounded-[30px] p-2 flex justify-around items-center shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {finalTabs.map((tab) => {
                    const isActive = pathname === tab.href
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className="relative px-4 py-3 flex flex-col items-center gap-1 transition-all"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className={cn("absolute inset-0 rounded-2xl", activeBg)}
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <tab.icon className={cn(
                                "w-6 h-6 transition-colors relative z-10",
                                isActive ? activeColor : "text-muted-foreground"
                            )} />
                            {(tab as any).badge && (
                                <span className={cn(
                                    "absolute top-2 right-2 px-1 py-0.5 rounded-[4px] text-[6px] font-black uppercase tracking-tighter z-20",
                                    isConcursos ? "bg-indigo-500 text-white" : "bg-primary text-white"
                                )}>
                                    {(tab as any).badge}
                                </span>
                            )}
                            <span className={cn(
                                "text-[9px] font-black uppercase tracking-widest relative z-10",
                                isActive ? activeColor : "text-muted-foreground/60"
                            )}>
                                {tab.label}
                            </span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
