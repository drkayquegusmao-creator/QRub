"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity,
    Layers,
    Search,
    Stethoscope,
    ChevronRight,
    BrainCircuit,
    HeartPulse,
    Baby,
    Ribbon,
    Microscope,
    Pill,
    ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SaudeEspecialidadesPage() {
    const specialties = [
        { name: "Clínica Médica", icon: Pill, progress: 85, questions: 1250 },
        { name: "Cirurgia Geral", icon: Activity, progress: 54, questions: 890 },
        { name: "Pediatria", icon: Baby, progress: 72, questions: 1020 },
        { name: "Ginecologia", icon: Ribbon, progress: 68, questions: 950 },
        { name: "Medicina Preventiva", icon: Microscope, progress: 45, questions: 450 },
    ]

    return (
        <div className="space-y-12 pb-32 animate-in fade-in duration-700">
            {/* Header Module */}
            <div className="bg-[#111827] rounded-b-[40px] -mx-8 -mt-8 p-12 pt-16 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-blue-500/5 blur-[80px] pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10 w-full">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Stethoscope className="w-4 h-4" /> 
                            Áreas Médicas
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                                <span className="text-emerald-500">Especialidades</span>
                            </h1>
                            <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none mt-2">
                                <Layers className="w-4 h-4 text-emerald-500" /> Domine todas as 5 grandes áreas da Medicina.
                            </p>
                        </div>
                    </div>

                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 opacity-50" />
                        <input 
                            type="text"
                            placeholder="BUSCAR ESPECIALIDADE..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 font-bold text-xs text-white uppercase tracking-widest outline-none focus:ring-2 ring-emerald-500/50 backdrop-blur-md"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {specialties.map((spec, i) => (
                    <motion.div
                        key={spec.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-[40px] p-8 flex flex-col justify-between group hover:shadow-2xl transition-all hover:border-emerald-500/30 cursor-pointer relative overflow-hidden"
                    >
                        <spec.icon className="absolute -bottom-10 -right-10 w-48 h-48 text-emerald-500 opacity-[0.03] group-hover:scale-110 transition-transform group-hover:opacity-10 pointer-events-none" />

                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div className="space-y-3">
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#111827] dark:text-white leading-none">
                                    {spec.name}
                                </h3>
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span className="flex items-center gap-1"><BrainCircuit className="w-4 h-4 text-emerald-500" /> {spec.questions} Questões</span>
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                                <spec.icon className="w-8 h-8 text-emerald-500 group-hover:text-white transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-end">
                                <span className={cn(
                                    "text-2xl font-black italic tracking-tighter leading-none",
                                    spec.progress >= 80 ? "text-emerald-500" :
                                    spec.progress >= 50 ? "text-amber-500" : "text-rose-500"
                                )}>
                                    {spec.progress}%
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nivelamento Global</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-white/5 h-4 rounded-full overflow-hidden">
                                <div 
                                    className={cn(
                                        "h-full transition-all duration-1000",
                                        spec.progress >= 80 ? "bg-emerald-500" :
                                        spec.progress >= 50 ? "bg-amber-500" : "bg-rose-500"
                                    )}
                                    style={{ width: `${spec.progress}%` }}
                                />
                            </div>
                            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex gap-4">
                                <button className="flex-1 py-4 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform shadow-xl">
                                    Estudar Temas <ChevronRight className="w-4 h-4" />
                                </button>
                                <button className="px-6 py-4 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
                                    <Activity className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[40px] p-12 flex flex-col items-center justify-center text-center gap-6 group hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer"
                >
                    <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                        <Search className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-400 group-hover:text-emerald-500 transition-colors">Explorar Subespecialidades</h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2">Veja os rankings internos</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-slate-300 group-hover:translate-x-2 transition-transform" />
                </motion.div>
            </div>
        </div>
    )
}
