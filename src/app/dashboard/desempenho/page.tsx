"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Activity,
    TrendingUp,
    Target,
    BarChart3,
    BrainCircuit,
    Layers,
    Clock,
    Flame,
    Zap,
    Trophy,
    Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SaudeDesempenhoPage() {
    return (
        <div className="space-y-12 pb-32 animate-in fade-in duration-700">
            {/* Header Module */}
            <div className="bg-[#111827] rounded-b-[40px] -mx-8 -mt-8 p-12 pt-16 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-blue-500/5 blur-[80px] pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10 w-full">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <BarChart3 className="w-4 h-4" /> 
                            Análise de Dados
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                                Centro de <span className="text-emerald-500">Inteligência</span>
                            </h1>
                            <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none mt-2">
                                <Activity className="w-4 h-4 text-emerald-500" /> Métricas e Desempenho Global Estimado
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Cards */}
                <StatCard 
                    title="Acurácia Geral"
                    value="78.4%"
                    trend="+2.1%"
                    icon={Target}
                    color="text-emerald-500"
                    bg="bg-emerald-500/10"
                    trendUp={true}
                />
                <StatCard 
                    title="Pontuação SRS Médio"
                    value="64"
                    trend="+12 points"
                    icon={BrainCircuit}
                    color="text-blue-500"
                    bg="bg-blue-500/10"
                    trendUp={true}
                />
                <StatCard 
                    title="Horas Líquidas"
                    value="142h"
                    trend="-5h"
                    icon={Clock}
                    color="text-amber-500"
                    bg="bg-amber-500/10"
                    trendUp={false}
                />
                <StatCard 
                    title="Questões Feitas"
                    value="4.250"
                    trend="+450"
                    icon={Layers}
                    color="text-indigo-500"
                    bg="bg-indigo-500/10"
                    trendUp={true}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    {/* Main Chart Area */}
                    <div className="p-10 rounded-[40px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 shadow-xl">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#111827] dark:text-white">Evolução de Retenção</h3>
                            <select className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none">
                                <option>Últimos 30 dias</option>
                                <option>Últimos 6 meses</option>
                                <option>Desde o início</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-2 px-4">
                            {/* Dummy bars for visual effect */}
                            {[40, 45, 42, 50, 58, 55, 60, 65, 62, 70, 75, 78].map((val, i) => (
                                <div key={i} className="flex-1 bg-slate-100 dark:bg-white/5 rounded-t-xl relative group">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        transition={{ delay: i * 0.05 }}
                                        className="absolute bottom-0 w-full bg-emerald-500 rounded-t-xl opacity-60 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111827] text-white px-3 py-1.5 rounded-lg text-[9px] font-black pointer-events-none transition-opacity">
                                        {val}%
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-6 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                            <span>S1</span>
                            <span>S2</span>
                            <span>S3</span>
                            <span>S4</span>
                            <span>S5</span>
                            <span>S6</span>
                            <span>S7</span>
                            <span>S8</span>
                            <span>S9</span>
                            <span>S10</span>
                            <span>S11</span>
                            <span>Hoje</span>
                        </div>
                    </div>

                    {/* Specialty Breakdown */}
                    <div className="p-10 rounded-[40px] bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 shadow-xl space-y-8">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#111827] dark:text-white flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-emerald-500" /> Desempenho por Especialidade
                        </h3>
                        
                        <div className="space-y-6">
                            <SpecialtyBar name="Clínica Médica" value={85} />
                            <SpecialtyBar name="Pediatria" value={72} />
                            <SpecialtyBar name="Ginecologia e Obstetrícia" value={68} />
                            <SpecialtyBar name="Cirurgia Geral" value={54} />
                            <SpecialtyBar name="Medicina Preventiva" value={45} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    {/* Strengths & Weaknesses */}
                    <div className="p-10 rounded-[40px] bg-gradient-to-br from-[#111827] to-[#1e293b] text-white shadow-2xl relative overflow-hidden">
                        <Zap className="absolute -bottom-8 -right-8 w-48 h-48 text-emerald-500 opacity-10" />
                        
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-10">Diagnóstico</h3>
                        
                        <div className="space-y-8 relative z-10">
                            <div>
                                <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-4">
                                    <TrendingUp className="w-4 h-4" /> Pontos Fortes
                                </h4>
                                <ul className="space-y-3">
                                    <li className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold uppercase tracking-widest flex justify-between">
                                        Cardiologia <span className="text-emerald-500">89%</span>
                                    </li>
                                    <li className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold uppercase tracking-widest flex justify-between">
                                        Neonatologia <span className="text-emerald-500">84%</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="pt-8 border-t border-white/10">
                                <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-rose-400 mb-4">
                                    <Activity className="w-4 h-4" /> Risco de Queda (Fraquezas)
                                </h4>
                                <ul className="space-y-3">
                                    <li className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold uppercase tracking-widest flex justify-between">
                                        Trauma <span className="text-rose-500">42%</span>
                                    </li>
                                    <li className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-bold uppercase tracking-widest flex justify-between">
                                        Obstetrícia <span className="text-rose-500">48%</span>
                                    </li>
                                </ul>
                                <button className="w-full mt-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all">
                                    Gerar Revisão Focada
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, trend, icon: Icon, color, bg, trendUp }: any) {
    return (
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-[32px] p-8 shadow-sm flex flex-col justify-between group hover:-translate-y-1 transition-transform">
            <div className="flex items-center justify-between mb-6">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", bg)}>
                    <Icon className={cn("w-6 h-6", color)} />
                </div>
                <div className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest", trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500")}>
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{title}</p>
                <div className="text-4xl font-black italic tracking-tighter text-[#111827] dark:text-white leading-none">
                    {value}
                </div>
            </div>
        </div>
    )
}

function SpecialtyBar({ name, value }: { name: string, value: number }) {
    const isCritical = value < 60
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <span className="text-sm font-black uppercase tracking-widest text-[#111827] dark:text-white">{name}</span>
                <span className={cn("text-xl font-black italic tracking-tighter", isCritical ? "text-rose-500" : "text-emerald-500")}>{value}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-white/5 h-3 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={cn("h-full", isCritical ? "bg-rose-500" : "bg-emerald-500")}
                />
            </div>
        </div>
    )
}
