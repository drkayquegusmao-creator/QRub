"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, BarChart2, User, History, Settings } from 'lucide-react'
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

    const tabs = [
        { label: 'Início', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Praticar', icon: BookOpen, href: '/dashboard/setup' },
        { label: 'Revisar', icon: History, href: '/dashboard/errors' },
        { label: 'Métricas', icon: BarChart2, href: '/dashboard/stats' },
        { label: 'Perfil', icon: '/dashboard/profile', isProfile: true }, // Hypothetical profile link or modal trigger
    ]

    // Ajustando os links para serem consistentes
    const finalTabs = [
        { label: 'Início', icon: LayoutDashboard, href: '/dashboard' },
        { label: 'Praticar', icon: BookOpen, href: '/dashboard/setup' },
        { label: 'Célis', icon: History, href: '/dashboard/errors' },
        { label: 'Intel', icon: BarChart2, href: '/dashboard/stats' },
    ]

    if (user?.role === 'MASTER') {
        finalTabs.push({ label: 'Master', icon: Settings, href: '/admin' })
    }

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
                                    className="absolute inset-0 bg-primary/10 rounded-2xl"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <tab.icon className={cn(
                                "w-6 h-6 transition-colors relative z-10",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )} />
                            <span className={cn(
                                "text-[9px] font-black uppercase tracking-widest relative z-10",
                                isActive ? "text-primary" : "text-muted-foreground/60"
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
