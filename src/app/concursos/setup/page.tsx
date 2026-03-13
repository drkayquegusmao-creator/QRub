"use client"

import { ConcursoQuizSetupFilters } from '@/components/concursos/quiz-setup-filters'
import { Filter } from 'lucide-react'

export default function ConcursoQuizSetupPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-24">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-500 border border-indigo-100 text-[10px] font-black uppercase tracking-widest">
                    <Filter className="w-4 h-4" />
                    Filtros de Concurso
                </div>
                <h1 className="text-5xl md:text-6xl font-black italic tracking-tight text-[#1A1033] uppercase leading-none">
                    Configure sua <br /> <span className="text-indigo-600">Sessão</span>
                </h1>
                <p className="text-slate-500 font-bold text-sm max-w-md mx-auto">
                    Ajuste o foco dos seus estudos filtrando pela área do seu interesse e banca examinadora.
                </p>
            </div>

            <ConcursoQuizSetupFilters />
        </div>
    )
}
