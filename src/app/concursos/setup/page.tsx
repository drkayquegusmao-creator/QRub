"use client"

import { ConcursoQuizSetupFilters } from '@/components/concursos/quiz-setup-filters'
import { Filter } from 'lucide-react'

export default function ConcursoQuizSetupPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-24 pt-4">
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 border border-indigo-200 dark:border-indigo-500/20 text-[9px] font-black uppercase tracking-widest mx-auto">
                    <Filter className="w-3.5 h-3.5" />
                    Bateria Personalizada
                </div>
                <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                    Configure sua <span className="text-indigo-600 dark:text-indigo-400">Sessão</span>
                </h1>
                <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] max-w-md mx-auto leading-none">
                    Filtros Estratégicos • {new Date().toLocaleDateString('pt-BR')}
                </p>
            </div>

            <ConcursoQuizSetupFilters />
        </div>
    )
}
