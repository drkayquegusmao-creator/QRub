"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Star, 
    ArrowRight, 
    Layers, 
    Search, 
    Filter, 
    Zap, 
    Target,
    BookOpen,
    Clock,
    Sparkles,
    Trash2,
    Play
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function FavoritosPage() {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="space-y-8 pb-24">
            {/* Header Curadoria */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-200 dark:border-amber-500/20">
                        <Star className="w-3 h-3 fill-amber-500" /> Curadoria Pessoal
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Meus <span className="text-amber-500">Favoritos</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                            <Layers className="w-3 h-3 text-amber-500" /> 42 Itens Salvos • Bateria de Elite
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Buscar nos favoritos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] py-4 pl-12 pr-6 font-black text-[10px] uppercase tracking-widest outline-none focus:ring-4 ring-amber-500/5 transition-all shadow-sm"
                        />
                    </div>
                    <button className="px-8 py-4 bg-[#1A1033] dark:bg-white text-white dark:text-[#1A1033] rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center gap-2">
                        Treinar Salvos <Play className="w-4 h-4 fill-current" />
                    </button>
                </div>
            </header>

            {/* Grid de Favoritos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <FavoriteCard key={i} index={i} onClick={() => router.push('/concursos/quiz/auto')} />
                ))}
            </div>
            
            {/* Empty State Simulator */}
            {false && (
                <div className="py-24 text-center space-y-6">
                    <div className="w-24 h-24 bg-slate-50 dark:bg-white/5 rounded-[40px] flex items-center justify-center mx-auto border border-dashed border-slate-200">
                        <Star className="w-10 h-10 text-slate-200" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-400">Nenhum item favoritado</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mt-2">Favorite questões durante os treinos para vê-las aqui.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

function FavoriteCard({ index, onClick }: { index: number, onClick: () => void }) {
    return (
        <ConcursoCard className="flex flex-col gap-6 group hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h4 className="text-base font-black italic uppercase tracking-tighter leading-tight text-[#1A1033] dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                        Controle de Constitucionalidade: Teoria Geral e Modelos...
                    </h4>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Direito Constitucional</p>
                </div>
                <button className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-4">
                <p className="text-[10px] font-medium leading-relaxed text-slate-500 line-clamp-3">
                    As leis ou atos normativos de efeitos concretos não se submetem ao controle abstrato de constitucionalidade perante o Supremo Tribunal Federal...
                </p>
                
                <div className="flex items-center gap-3">
                   <div className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200/50 text-[8px] font-black uppercase text-slate-400 tracking-tighter">
                        BANCA: FGV
                   </div>
                   <div className="px-2.5 py-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200/50 text-[8px] font-black uppercase text-slate-400 tracking-tighter">
                        ANO: 2024
                   </div>
                </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-amber-500" /> Salvo há 2 dias
                </span>
                <button 
                    onClick={onClick}
                    className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-[#1A1033] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
                >
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </ConcursoCard>
    )
}
