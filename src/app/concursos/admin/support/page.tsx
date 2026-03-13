"use client"

import { MessageSquare, Users, Clock, ShieldCheck, Mail, Send, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function SupportAdminPage() {
    const router = useRouter()
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Suporte ao Aluno</h1>
                <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-3 ml-1 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-indigo-500" />
                    Central de Atendimento Concursos
                </p>
            </div>

            <div className="p-32 bg-white border border-slate-100 rounded-[4rem] flex flex-col items-center justify-center text-center space-y-10 shadow-sm">
                <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 shadow-inner">
                    <MessageSquare size={48} />
                </div>
                <div className="max-w-md space-y-4">
                    <h3 className="text-3xl font-black uppercase italic italic text-slate-900 tracking-tight">Gestão Unificada</h3>
                    <p className="text-slate-400 font-medium leading-relaxed">
                        A gestão de tickets e suporte é unificada para todos os produtos QRub. Utilize o console global para gerenciar as demandas dos alunos.
                    </p>
                </div>
                <button 
                    onClick={() => router.push('/admin/support')}
                    className="px-12 py-5 bg-indigo-900 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-2xl shadow-indigo-900/20"
                >
                    Acessar Central Global
                </button>
            </div>
        </div>
    )
}
