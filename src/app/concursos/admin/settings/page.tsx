"use client"

import { useState } from 'react'
import {
    Settings, ShieldAlert, Hammer, Zap, Sparkles, 
    RefreshCw, Globe, Lock, ShieldCheck, Mail
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useSystem } from '@/store/use-system'
import { toast } from 'react-hot-toast'

export default function SettingsAdminPage() {
    const { isMaintenanceMode, setMaintenanceMode } = useSystem()
    const [isSaving, setIsSaving] = useState(false)

    async function handleToggleMaintenance() {
        setIsSaving(true)
        setMaintenanceMode(!isMaintenanceMode)
        toast.success(`Modo manutenção: ${!isMaintenanceMode ? 'Ativado' : 'Desativado'}`)
        setIsSaving(false)
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            <div>
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Ajustes do Sistema</h1>
                <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-3 ml-1 flex items-center gap-2">
                    <Lock size={14} className="text-indigo-500" />
                    Controle Crítico Concursos
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Maintenance Card */}
                <div className={`p-10 rounded-[4rem] border-2 transition-all ${isMaintenanceMode ? 'bg-amber-500/5 border-amber-500' : 'bg-white border-slate-100'}`}>
                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center ${isMaintenanceMode ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-50 text-slate-300'}`}>
                                <Hammer size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 leading-none mb-1">Modo Manutenção</h3>
                                <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Controle de Acesso Público</p>
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            Quando ativado, os alunos não poderão responder questões ou acessar o ambiente concursos. O painel master continua acessível.
                        </p>
                        <button 
                            disabled={isSaving}
                            onClick={handleToggleMaintenance}
                            className={`w-full py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] transition-all ${isMaintenanceMode ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' : 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'}`}
                        >
                            {isMaintenanceMode ? 'DESATIVAR MANUTENÇÃO' : 'ATIVAR MANUTENÇÃO'}
                        </button>
                    </div>
                </div>

                {/* API / AI Card */}
                <div className="bg-white border border-slate-100 p-10 rounded-[4rem] space-y-8 shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600">
                            <Zap size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tight text-slate-900 leading-none mb-1">IA Integration</h3>
                            <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Protocolo Antigravity</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Modelo de Geração</span>
                            <span className="text-xs font-black text-indigo-600 uppercase italic">GPT-4o Master</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Status da Conexão</span>
                            <span className="text-xs font-black text-emerald-600 uppercase italic">Verificado / Live</span>
                        </div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest text-center italic">Chaves de API gerenciadas via Admin Saúde Global</p>
                </div>
            </div>
        </div>
    )
}
