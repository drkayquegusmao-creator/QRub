"use client"

import { useEffect } from 'react'
import { History, Search, AlertCircle, ChevronRight, Play } from 'lucide-react'
import { useQuestions } from '@/store/use-questions'
import { motion } from 'framer-motion'
import { SectionHeader, Divider } from '@/components/dashboard-ui'

export default function ErrorCenter() {
    const { questions, loadQuestions } = useQuestions()
    // Simulate some "erred" questions - showing all questions for now
    const erredQuestions = questions

    useEffect(() => {
        loadQuestions()
    }, [])


    return (
        <div className="space-y-16 pb-32 max-w-7xl mx-auto px-4 md:px-0">
            {/* 🔝 GRUPO A: HEADER E AÇÕES */}
            <section className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 text-rose-500 font-black uppercase text-[10px] tracking-[0.3em] mb-4">
                            <AlertCircle className="w-4 h-4" />
                            Recuperação de Desempenho
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                            CENTRAL DE <span className="text-rose-500">ERROS.</span>
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-card glass-card border border-border/50 text-foreground px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-muted/50 transition-all shadow-xl">
                            <Search className="w-4 h-4" />
                            Filtrar
                        </button>
                        <button className="royal-gradient text-white px-10 py-4 rounded-2xl font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all soft-shadow">
                            <Play className="w-5 h-5 fill-white" />
                            Resolver Tudo
                        </button>
                    </div>
                </div>
            </section>

            <Divider />

            {/* 📍 GRUPO B: LISTAGEM DE ERROS */}
            <section className="space-y-8">
                <SectionHeader
                    title="Seu Caderno de Erros"
                    subtitle="Questões que precisam de atenção imediata para sua aprovação"
                    icon={<History className="w-5 h-5" />}
                />

                {erredQuestions.length === 0 ? (
                    <div className="text-center py-24 bg-card glass-card rounded-[40px] border-2 border-dashed border-border/50 soft-shadow">
                        <div className="bg-muted/50 p-6 rounded-full w-fit mx-auto mb-6">
                            <History className="w-12 h-12 text-muted-foreground/40" />
                        </div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Nenhum erro encontrado!</h3>
                        <p className="text-muted-foreground text-sm font-medium italic opacity-60">Continue assim, seu desempenho está impecável.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {erredQuestions.map((q, idx) => (
                            <motion.div
                                key={q.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-card glass-card border border-border/50 p-8 rounded-[35px] soft-shadow hover:border-rose-500/30 transition-all group relative overflow-hidden flex flex-col justify-between h-[280px]"
                            >
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                        Frequente
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-muted/50 p-2 rounded-xl">
                                            <AlertCircle className="w-4 h-4 text-rose-500" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{q.specialty_id}</span>
                                    </div>
                                    <p className="font-bold italic uppercase tracking-tight line-clamp-3 text-lg leading-tight group-hover:text-rose-500 transition-colors">
                                        {q.enunciado}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-border/30 flex items-center justify-between">
                                    <button className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:opacity-70 transition-opacity">Ver Mentoria</button>
                                    <button className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all soft-shadow">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

