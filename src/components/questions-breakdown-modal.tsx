"use client"

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Database, ChevronRight, Stethoscope, Microscope } from 'lucide-react'
import { Question } from '@/lib/data-mock'

interface QuestionsBreakdownModalProps {
    isOpen: boolean
    onClose: () => void
    questions: Question[]
}

export function QuestionsBreakdownModal({ isOpen, onClose, questions }: QuestionsBreakdownModalProps) {

    const breakdown = useMemo(() => {
        const stats: Record<string, { name: string, count: number, subs: Record<string, { name: string, count: number }> }> = {}

        questions.forEach(q => {
            // Normalize IDs
            const specId = q.specialty_id || 'sem-categoria'
            const specName = q.metadata?.especialidade || q.specialty_id || 'Sem Categoria'

            const subId = q.subspecialty_id || 'sem-sub'
            const subName = q.metadata?.subespecialidade || q.subspecialty_id || 'Geral'

            if (!stats[specId]) {
                stats[specId] = {
                    name: specName,
                    count: 0,
                    subs: {}
                }
            }

            stats[specId].count++

            if (!stats[specId].subs[subId]) {
                stats[specId].subs[subId] = {
                    name: subName,
                    count: 0
                }
            }
            stats[specId].subs[subId].count++
        })

        // Sort by count descending
        return Object.values(stats)
            .sort((a, b) => b.count - a.count)
            .map(spec => ({
                ...spec,
                subs: Object.values(spec.subs).sort((a, b) => b.count - a.count)
            }))
    }, [questions])

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[40px] w-full max-w-4xl max-h-[85vh] shadow-2xl flex flex-col overflow-hidden relative"
                >
                    {/* Header */}
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <Database className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033]">
                                    Raio-X do Banco
                                </h2>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Detalhamento por Especialidade
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <div className="grid grid-cols-1 gap-4">
                            {breakdown.length === 0 ? (
                                <div className="text-center py-20 text-slate-400">
                                    <Database className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p className="font-bold uppercase tracking-widest">Nenhuma questão encontrada</p>
                                </div>
                            ) : (
                                breakdown.map((spec, i) => (
                                    <div key={i} className="bg-white border-2 border-slate-100 rounded-[24px] overflow-hidden hover:border-primary/20 transition-all group">
                                        {/* Specialty Header */}
                                        <div className="p-5 flex items-center justify-between bg-slate-50/50">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-400 group-hover:text-primary transition-colors">
                                                    <Stethoscope className="w-4 h-4" />
                                                </div>
                                                <span className="font-black uppercase tracking-tight text-[#1A1033] text-lg">
                                                    {spec.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-black italic text-primary">{spec.count}</span>
                                                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Questões</span>
                                            </div>
                                        </div>

                                        {/* Subs List */}
                                        <div className="p-2 bg-white">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                                {spec.subs.map((sub, j) => (
                                                    <div key={j} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <Microscope className="w-3 h-3 text-slate-400 shrink-0" />
                                                            <span className="text-xs font-bold text-slate-600 truncate">{sub.name}</span>
                                                        </div>
                                                        <span className="text-xs font-black text-primary bg-primary/5 px-2 py-1 rounded-md">
                                                            {sub.count}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Total Geral: {questions.length}</span>
                        <span>{breakdown.length} Áreas Identificadas</span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
