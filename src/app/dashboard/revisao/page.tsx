"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Activity,
    ArrowRight,
    BrainCircuit,
    History,
    CalendarDays,
    Settings2,
    Target
} from 'lucide-react'
import { DashboardDiario } from '@/components/dashboard-diario-v2'
import { cn } from '@/lib/utils'

export default function SaudeRevisaoPage() {
    return (
        <div className="space-y-12 pb-32 animate-in fade-in duration-700">
            {/* 1. TOP HEADER MODULE */}
            <div className="bg-[#111827] rounded-b-[40px] -mx-8 -mt-8 p-12 pt-16 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-blue-500/5 blur-[80px] pointer-events-none" />

                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 relative z-10 w-full">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <BrainCircuit className="w-4 h-4" />
                            Retenção Ativa
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                                Revisão <span className="text-emerald-500">Médica</span>
                            </h1>
                            <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.2em] max-w-xl leading-relaxed">
                                Seu sistema de repetição espaçada. Alimentado por seus erros, metas de nivelamento e resultados nos simulados.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        <div className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md flex items-center gap-4">
                            <Activity className="w-6 h-6 text-emerald-400" />
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Memória</p>
                                <p className="text-lg font-black italic text-white flex items-baseline gap-1">Otimizada</p>
                            </div>
                        </div>

                        <button className="h-full px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-emerald-600/30 hover:bg-emerald-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                            <Settings2 className="w-4 h-4" /> Preferências
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. IN-PAGE TABS / MENUS */}
            <div className="hidden sm:flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl w-fit">
                <div className="px-6 py-3 rounded-xl bg-white dark:bg-white/10 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest shadow-sm flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-500" /> Fila Principal
                </div>
                <div className="px-6 py-3 rounded-xl text-slate-400 hover:text-emerald-500 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest transition-all cursor-not-allowed opacity-50 flex items-center gap-2">
                    <History className="w-4 h-4" /> Histórico
                </div>
                <div className="px-6 py-3 rounded-xl text-slate-400 hover:text-emerald-500 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest transition-all cursor-not-allowed opacity-50 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" /> Próximos Ciclos
                </div>
            </div>


            {/* 3. WIDGET DE REVISÃO */}
            <div className="rounded-[40px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 shadow-xl p-6 md:p-12 relative overflow-hidden group">
                {/* Override the primary colors to emerald using CSS classes inside this scope */}
                {/* Force theme variable overrides inside this scope */}
                <div 
                    className="[&_.text-primary]:!text-emerald-500 [&_.bg-primary]:!bg-emerald-500 [&_.border-primary]:!border-emerald-500"
                    style={{ '--primary': '160 84% 39%' } as React.CSSProperties}
                >
                    <DashboardDiario />
                </div>
            </div>
        </div>
    )
}
