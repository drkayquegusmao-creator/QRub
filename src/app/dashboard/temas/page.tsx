"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    LayoutGrid,
    Search,
    BookOpen,
    Filter,
    ChevronDown,
    Zap,
    History,
    MoreHorizontal,
    TrendingUp,
    ShieldAlert,
    Activity,
    CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SaudeTemasPage() {
    return (
        <div className="space-y-12 pb-32 animate-in fade-in duration-700">
            {/* Header Module */}
            <div className="bg-[#111827] rounded-b-[40px] -mx-8 -mt-8 p-12 pt-16 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-amber-500/5 blur-[80px] pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10 w-full">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <BookOpen className="w-4 h-4" /> 
                            Organização Granular
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                                Temas <span className="text-emerald-500">Médicos</span>
                            </h1>
                            <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none mt-2">
                                <LayoutGrid className="w-4 h-4 text-emerald-500" /> Domine a medicina, assunto por assunto.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 opacity-50" />
                            <input 
                                type="text"
                                placeholder="BUSCAR TRATAMENTOS, DOENÇAS..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 font-bold text-xs text-white uppercase tracking-widest outline-none focus:ring-2 ring-emerald-500/50 backdrop-blur-md"
                            />
                        </div>
                        <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:text-emerald-500 transition-colors backdrop-blur-md shrink-0">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 custom-scrollbar">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mr-4">Filtros:</span>
                <button className="px-6 py-2.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shrink-0">Todos os Temas</button>
                <button className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-emerald-500 text-[10px] font-black uppercase tracking-widest transition-all shrink-0">Alta Frequência (Enare)</button>
                <button className="px-6 py-2.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest transition-all shrink-0">Em Risco de Esquecimento</button>
                <button className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-emerald-500 text-[10px] font-black uppercase tracking-widest transition-all shrink-0">Prioridade Alta</button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <TemaCard 
                    specialty="Cardiologia" 
                    title="Insuficiência Cardíaca"
                    status="Domínio Parcial"
                    accuracy={68}
                    questions={145}
                    critical={false}
                />
                
                <TemaCard 
                    specialty="Ginecologia e Obstetrícia" 
                    title="Sistematização da Assistência Pré-Natal"
                    status="Domínio Sólido"
                    accuracy={89}
                    questions={234}
                    critical={false}
                />

                <TemaCard 
                    specialty="Cirurgia Geral" 
                    title="Trauma Abdominal"
                    status="Atenção Necessária"
                    accuracy={42}
                    questions={89}
                    critical={true}
                />
                
                <TemaCard 
                    specialty="Pediatria" 
                    title="Reanimação Neonatal"
                    status="Domínio Sólido"
                    accuracy={92}
                    questions={180}
                    critical={false}
                />
            </div>
        </div>
    )
}

function TemaCard({ specialty, title, status, accuracy, questions, critical }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "bg-white dark:bg-[#111827] border rounded-[32px] p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between group hover:shadow-2xl transition-all",
                critical ? "border-amber-500/30 hover:border-amber-500/50 bg-amber-500/5" : "border-slate-200 dark:border-white/5 hover:border-emerald-500/30"
            )}
        >
            <div className="flex gap-6 w-full md:w-auto">
                <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                    critical ? "bg-amber-500/10 text-amber-500" :
                    accuracy >= 80 ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-100 dark:bg-white/5 text-emerald-500"
                )}>
                    {critical ? <ShieldAlert className="w-8 h-8" /> : 
                     accuracy >= 80 ? <CheckCircle2 className="w-8 h-8" /> : <Activity className="w-8 h-8" />}
                </div>

                <div className="space-y-2 flex-1">
                    <p className={cn("text-[9px] font-black uppercase tracking-[0.2em]", critical ? "text-amber-600" : "text-emerald-500")}>
                        {specialty}
                    </p>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#111827] dark:text-white leading-none">
                        {title}
                    </h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <span className="flex items-center gap-1.5"><LayoutGrid className="w-3.5 h-3.5" /> {questions} Questões Feitas</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                        <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Estado: {status}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-10 w-full md:w-auto border-t border-slate-100 dark:border-white/5 md:border-t-0 pt-6 md:pt-0">
                <div className="flex flex-col items-center">
                    <span className={cn(
                        "text-3xl font-black italic tracking-tighter leading-none shadow-sm",
                        critical ? "text-amber-500" : "text-[#111827] dark:text-white"
                    )}>
                        {accuracy}%
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">Acurácia Global</span>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-8 py-4 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all">
                        <Zap className="w-4 h-4 fill-current text-emerald-500" />
                        Sessão
                    </button>
                    <button className="p-4 rounded-xl text-slate-400 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:text-emerald-500 transition-colors shadow-sm">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
