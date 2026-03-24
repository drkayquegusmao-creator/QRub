"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Star, 
    Search,
    Filter,
    FileText,
    BookOpen,
    Layers,
    BrainCircuit,
    MoreHorizontal,
    Plus,
    X,
    Play
} from 'lucide-react'
import { cn } from '@/lib/utils'

type FavoriteType = 'questoes' | 'temas' | 'simulados' | 'revisoes'

export default function SaudeFavoritosPage() {
    const [activeTab, setActiveTab] = useState<FavoriteType>('questoes')

    return (
        <div className="space-y-12 pb-32 animate-in fade-in duration-700">
            {/* Header Module */}
            <div className="bg-[#111827] rounded-b-[40px] -mx-8 -mt-8 p-12 pt-16 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-amber-500/10 blur-[100px] pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-blue-500/5 blur-[80px] pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10 w-full">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Star className="w-4 h-4 fill-amber-500" /> 
                            Itens Salvos
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                                Seus <span className="text-amber-500">Favoritos</span>
                            </h1>
                            <p className="text-slate-400 font-bold text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none mt-2">
                                Acerte e salve as questões e temas mais desafiadores.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 backdrop-blur-sm p-1.5 rounded-3xl flex flex-wrap gap-1 shadow-xl">
                        {[
                            { id: 'questoes', label: 'Questões', icon: FileText },
                            { id: 'temas', label: 'Temas', icon: BookOpen },
                            { id: 'simulados', label: 'Simulados', icon: Layers },
                            { id: 'revisoes', label: 'Revisões', icon: BrainCircuit }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as FavoriteType)}
                                className={cn(
                                    "px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all",
                                    activeTab === tab.id ? "bg-white text-slate-900 shadow-xl" : "text-white/50 hover:text-white"
                                )}
                            >
                                <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-amber-500" : "opacity-50")} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                        type="text"
                        placeholder="BUSCAR NOS SEUS FAVORITOS..."
                        className="w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 font-bold text-xs uppercase tracking-widest outline-none focus:ring-2 ring-amber-500/20 shadow-sm"
                    />
                </div>
                <button className="p-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-2xl text-slate-400 hover:text-amber-500 transition-colors shadow-sm">
                    <Filter className="w-5 h-5" />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {activeTab === 'questoes' && (
                        <>
                            <FavoriteCard 
                                type="questoes"
                                title="Clínica Médica - Cardiologia"
                                description="HAS Estágio 3 e Manejo Clínico. Questão com pegadinha sobre contraindicação de diuréticos."
                                date="Salvo em 12/03/24"
                                bank="USP SP"
                            />
                            <FavoriteCard 
                                type="questoes"
                                title="Pediatria - Neonatologia"
                                description="Reanimação Neonatal. Protocolos atualizados de 2023."
                                date="Salvo em 10/03/24"
                                bank="Enare"
                            />
                            <div className="md:col-span-2 lg:col-span-3 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-white/5 p-16 text-center">
                                <Star className="w-12 h-12 text-slate-300 mx-auto mb-6 opacity-30" />
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-400">Fim dos favoritos</h3>
                            </div>
                        </>
                    )}
                    {activeTab === 'temas' && (
                        <div className="col-span-full rounded-[40px] border-2 border-dashed border-slate-200 dark:border-white/5 p-16 text-center">
                            <BookOpen className="w-16 h-16 text-emerald-500/20 mx-auto mb-6" />
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-400">Nenhum tema salvo</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">Você pode favoritar temas diretamente no Mapa de Memória.</p>
                        </div>
                    )}
                    {activeTab === 'simulados' && (
                        <div className="col-span-full rounded-[40px] border-2 border-dashed border-slate-200 dark:border-white/5 p-16 text-center">
                            <Layers className="w-16 h-16 text-indigo-500/20 mx-auto mb-6" />
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-400">Nenhum simulado salvo</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">Salve simulados do banco para treinar mais tarde.</p>
                        </div>
                    )}
                    {activeTab === 'revisoes' && (
                        <div className="col-span-full rounded-[40px] border-2 border-dashed border-slate-200 dark:border-white/5 p-16 text-center">
                            <BrainCircuit className="w-16 h-16 text-amber-500/20 mx-auto mb-6" />
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-400">Nenhuma revisão fixa</h3>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

function FavoriteCard({ type, title, description, date, bank }: { type: string, title: string, description: string, date: string, bank?: string }) {
    return (
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/5 rounded-[40px] p-8 group relative overflow-hidden shadow-xl hover:-translate-y-2 transition-all">
            <div className="absolute top-0 right-0 p-8 flex items-center gap-2">
                <button className="p-2 rounded-xl text-amber-500 hover:bg-amber-500/10 transition-colors tooltip" title="Remover Histórico">
                    <Star className="w-5 h-5 fill-amber-500" />
                </button>
            </div>
            
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-amber-500" />
            </div>

            <div className="space-y-2 mb-6 pr-12">
                <h4 className="text-xl font-black italic uppercase tracking-tighter leading-none text-[#111827] dark:text-white">{title}</h4>
                {bank && (
                    <div className="inline-flex items-center px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-[9px] font-black uppercase text-slate-500">
                        {bank}
                    </div>
                )}
            </div>

            <p className="text-[11px] font-bold text-slate-500 leading-relaxed mb-8 line-clamp-3">
                {description}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5 mt-auto">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">{date}</span>
                <button className="px-5 py-2.5 rounded-xl bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-[10px] font-black uppercase flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
                    Responder <Play className="w-3 h-3 fill-current" />
                </button>
            </div>
        </div>
    )
}
