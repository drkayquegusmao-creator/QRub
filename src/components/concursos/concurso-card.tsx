"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface ConcursoCardProps {
    title?: string
    subtitle?: string
    icon?: ReactNode
    badge?: ReactNode
    children: ReactNode
    className?: string
    onClick?: () => void
    premium?: boolean
    theme?: 'default' | 'active' | 'indigo' | 'emerald' | 'orange' | 'rose'
}

export function ConcursoCard({
    title,
    subtitle,
    icon,
    badge,
    children,
    className,
    onClick,
    premium = false,
    theme = 'default'
}: ConcursoCardProps) {
    const themeStyles = {
        default: "bg-white dark:bg-[#1e1a2d] border-slate-200 dark:border-white/5 text-[#1A1033] dark:text-white",
        active: "bg-indigo-600 border-indigo-500/50 text-white shadow-xl shadow-indigo-600/20",
        indigo: "bg-[#1A1033] border-white/10 text-white",
        emerald: "bg-emerald-600 border-emerald-500/50 text-white shadow-xl shadow-emerald-600/20",
        orange: "bg-orange-500 border-orange-400/50 text-white shadow-xl shadow-orange-500/20",
        rose: "bg-rose-600 border-rose-500/50 text-white shadow-xl shadow-rose-600/20"
    }

    return (
        <motion.div
            whileHover={onClick ? { y: -4 } : {}}
            onClick={onClick}
            className={cn(
                "group relative border rounded-[32px] p-6 shadow-sm transition-all",
                themeStyles[theme],
                onClick && "cursor-pointer hover:shadow-2xl",
                premium && theme === 'default' && "bg-gradient-to-br from-indigo-500/5 to-transparent border-indigo-500/10",
                className
            )}
        >
            <div className="flex flex-col h-full gap-6">
                {(title || icon || badge) && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {icon && (
                                <div className="p-3.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                                    {icon}
                                </div>
                            )}
                            {(title || subtitle) && (
                                <div>
                                    {title && <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">{title}</h3>}
                                    {subtitle && <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{subtitle}</p>}
                                </div>
                            )}
                        </div>
                        {badge && (
                            <div className="shrink-0">
                                {badge}
                            </div>
                        )}
                    </div>
                )}
                
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </motion.div>
    )
}
