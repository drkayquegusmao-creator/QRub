"use client"

import { QuizSetupFilters } from '@/components/quiz-setup-filters'
import { Filter } from 'lucide-react'

export default function QuizSetupPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-widest">
                    <Filter className="w-4 h-4" />
                    Filtros Inteligentes
                </div>
                <h1 className="text-5xl font-black italic tracking-tight">Configure seu <span className="text-primary">Simulado</span></h1>
                <p className="text-muted-foreground font-medium text-lg">Selecione a hierarquia de estudos para carregar as questões específicas.</p>
            </div>

            <QuizSetupFilters />
        </div>
    )
}
