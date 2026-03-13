"use client"

import { DollarSign, TrendingUp, BarChart3, ShieldCheck, Mail, Send, Award, Target, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function FinanceAdminPage() {
    const router = useRouter()
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Faturamento & Planos</h1>
                <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-3 ml-1 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-indigo-500" />
                    Console Comercial Concursos
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-slate-100 p-12 rounded-[4rem] space-y-10 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <TrendingUp size={32} />
                    </div>
                    <div className="max-w-md space-y-4">
                        <h3 className="text-3xl font-black uppercase italic italic text-slate-900 tracking-tight">Checkout Integrado</h3>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            O faturamento e assinaturas do QRub Concursos são processados através da API global do sistema. Use o console Master para gestão de receitas.
                        </p>
                    </div>
                    <button 
                        onClick={() => router.push('/admin/finance')}
                        className="px-12 py-5 bg-indigo-900 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-indigo-900/20"
                    >
                        Abrir Console Financeiro
                    </button>
                </div>

                <div className="bg-indigo-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                        <Award size={240} className="text-white fill-white" />
                    </div>
                    <div className="relative z-10 max-w-lg space-y-6">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Planos Concursos 2025</h2>
                        <ul className="space-y-4">
                            {[
                                { name: 'Concurseiro PRO', price: 'R$ 49,90/mês' },
                                { name: 'Master Concursos', price: 'R$ 89,90/mês' },
                                { name: 'Acesso Global QRub', price: 'R$ 149,90/mês' },
                            ].map((plan, i) => (
                                <li key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <span className="text-[10px] font-black uppercase tracking-widest">{plan.name}</span>
                                    <span className="text-xs font-black italic">{plan.price}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-indigo-200 font-medium text-[10px] uppercase tracking-widest text-center mt-6">Configurações de precificação gerenciadas centralmente</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
