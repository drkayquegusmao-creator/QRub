"use client"

import { motion } from 'framer-motion'
import { Settings, Calendar, Award, Users, Shield, Zap, Database, ArrowLeft, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'SEASONS' | 'LEAGUES' | 'XP' | 'REWARDS' | 'MODERATION'>('SEASONS')

    const tabs = [
        { id: 'SEASONS', label: 'Seasons', icon: Calendar },
        { id: 'LEAGUES', label: 'Ligas', icon: Award },
        { id: 'XP', label: 'XP & Níveis', icon: Zap },
        { id: 'REWARDS', label: 'Recompensas', icon: Database },
        { id: 'MODERATION', label: 'Moderação', icon: Shield },
    ]

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-10">
            <header className="flex justify-between items-end">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter">ADMIN RANK ELITE</h2>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Controle total da Arena Competitiva</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-[#39FF14] text-black font-black uppercase text-[10px] tracking-widest">Salvar Alterações</button>
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-black uppercase text-[10px] tracking-widest border border-white/10 transition-all">Exportar Dados</button>
                </div>
            </header>

            <div className="flex gap-4 border-b border-white/5 pb-4 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-3 px-6 py-3 font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === tab.id ? 'bg-[#39FF14] text-black' : 'text-white/40 hover:text-white'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="min-h-[400px]"
                >
                    {activeTab === 'SEASONS' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Temporadas Ativas</h3>
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase text-[#39FF14] hover:underline">
                                    <Plus className="w-4 h-4" /> Nova Season
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-white/5 border-2 border-[#39FF14]/30 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-2xl font-black italic uppercase tracking-tighter">Season 1: Origem</h4>
                                            <p className="text-[10px] text-[#39FF14] font-black uppercase mt-1">Status: EM ANDAMENTO</p>
                                        </div>
                                        <div className="p-2 bg-[#39FF14] text-black"><Calendar className="w-5 h-5" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                        <div>
                                            <p className="text-[8px] text-white/40 uppercase font-black">Início</p>
                                            <p className="text-xs font-bold">01/02/2025</p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] text-white/40 uppercase font-black">Término</p>
                                            <p className="text-xs font-bold">28/02/2025</p>
                                        </div>
                                    </div>
                                    <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all">Configurar Detalhes</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'LEAGUES' && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter">Estrutura de Ligas</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="px-4 py-3 text-[10px] font-black uppercase text-white/40 tracking-widest">Liga</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase text-white/40 tracking-widest">PTS Min</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase text-white/40 tracking-widest">PTS Max</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase text-white/40 tracking-widest">Dif. Média</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase text-white/40 tracking-widest">Mult. XP</th>
                                            <th className="px-4 py-3 text-[10px] font-black uppercase text-white/40 tracking-widest text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {['BRONZE', 'PRATA', 'OURO', 'PLATINA', 'DIAMANTE', 'ELITE'].map(name => (
                                            <tr key={name} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-4 py-4 font-black italic uppercase text-lg">{name}</td>
                                                <td className="px-4 py-4 text-xs font-bold font-mono">0000</td>
                                                <td className="px-4 py-4 text-xs font-bold font-mono text-white/60">1000</td>
                                                <td className="px-4 py-4 text-[10px] font-black uppercase">50/30/20</td>
                                                <td className="px-4 py-4 text-xs font-bold text-[#1fd655]">1.0x</td>
                                                <td className="px-4 py-4 text-right">
                                                    <button className="p-2 hover:text-[#39FF14] transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'XP' && (
                        <div className="max-w-2xl space-y-8">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter">Curva de Progressão Permanente</h3>
                            <div className="space-y-6 bg-white/5 p-8 border border-white/5">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-white/40 tracking-widest block">XP Base p/ Match</label>
                                        <input type="number" defaultValue={50} className="w-full bg-black border border-white/10 p-4 text-lg font-black text-[#39FF14]" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-white/40 tracking-widest block">Bônus Match Perfeito</label>
                                        <input type="number" defaultValue={30} className="w-full bg-black border border-white/10 p-4 text-lg font-black text-amber-500" />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-white/40 tracking-widest block">XP p/ Nível (Fixo)</label>
                                        <input type="number" defaultValue={500} className="w-full bg-black border border-white/10 p-4 text-lg font-black text-white" />
                                    </div>
                                    <div className="space-y-4 flex items-end">
                                        <div className="flex gap-4">
                                            <button className="px-4 py-2 bg-green-900/20 text-green-500 font-bold uppercase text-[9px] border border-green-500/20">Linear</button>
                                            <button className="px-4 py-2 bg-zinc-800 text-white/40 font-bold uppercase text-[9px]">Exponencial</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'REWARDS' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Catálogo de Recompensas</h3>
                                <button className="px-6 py-2 bg-white text-black font-black uppercase text-[10px] tracking-widest">Criar Recompensa</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {['Moldura Bronze', 'Título "Anti-Chute"', 'Skip de Questão', 'XP Boost 2h'].map((r, i) => (
                                    <div key={i} className="bg-zinc-900 border border-white/10 p-6 flex flex-col justify-between group">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/5 group-hover:border-[#39FF14]/50 transition-all">
                                                    <Award className="w-6 h-6 text-white/20" />
                                                </div>
                                                <div className="px-3 py-1 bg-white/5 text-[8px] font-black text-white/40 uppercase">Catalogo</div>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-black uppercase italic tracking-tight">{r}</h4>
                                                <p className="text-[9px] font-bold text-white/40 uppercase">Tipo: {i < 2 ? 'Visual' : 'Funcional'}</p>
                                            </div>
                                        </div>
                                        <div className="pt-6 mt-6 border-t border-white/5 flex gap-4">
                                            <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase text-white/60">Configurar</button>
                                            <button className="px-4 py-3 bg-rose-900/20 hover:bg-rose-900/40 text-rose-500"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'MODERATION' && (
                        <div className="space-y-6 text-center py-20 bg-white/5 border-2 border-dashed border-white/5">
                            <Shield className="w-16 h-16 text-white/20 mx-auto" />
                            <div className="space-y-2">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Fila de Moderação Vazia</h3>
                                <p className="text-sm font-bold text-white/40 uppercase">Nenhuma foto de perfil aguardando revisão no momento.</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

import { AnimatePresence } from 'framer-motion'
