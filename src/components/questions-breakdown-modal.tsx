"use client"

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Database, ChevronRight, Stethoscope, Microscope, AlertCircle } from 'lucide-react'
import { Question, COURSES } from '@/lib/data-mock'

interface QuestionsBreakdownModalProps {
    isOpen: boolean
    onClose: () => void
    questions: Question[]
}

export function QuestionsBreakdownModal({ isOpen, onClose, questions }: QuestionsBreakdownModalProps) {

    const breakdown = useMemo(() => {
        // Helper function to normalize names for consistent grouping
        const normalize = (str: string) => {
            return str
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remove accents
                .replace(/[^a-z0-9]/g, '') // Remove special chars and spaces
        }

        // Build stats from existing questions using normalized names as keys
        const stats: Record<string, {
            name: string,
            count: number,
            subs: Record<string, { name: string, count: number }>,
            officialId?: string
        }> = {}

        questions.forEach(q => {
            // Get the display name (prefer metadata over ID)
            const specName = q.metadata?.especialidade || q.specialty_id || 'Sem Categoria'
            const subName = q.metadata?.subespecialidade || q.subspecialty_id || 'Geral'

            // Normalize for consistent grouping
            const specKey = normalize(specName)
            const subKey = normalize(subName)

            if (!stats[specKey]) {
                stats[specKey] = {
                    name: specName,
                    count: 0,
                    subs: {},
                    officialId: q.specialty_id
                }
            }

            stats[specKey].count++

            if (!stats[specKey].subs[subKey]) {
                stats[specKey].subs[subKey] = {
                    name: subName,
                    count: 0
                }
            }
            stats[specKey].subs[subKey].count++
        })

        // Now add ALL specialties from the hierarchy, even if they have 0 questions
        if (COURSES && COURSES[0] && COURSES[0].specialties) {
            COURSES[0].specialties.forEach(specialty => {
                const specKey = normalize(specialty.name)

                if (!stats[specKey]) {
                    stats[specKey] = {
                        name: specialty.name,
                        count: 0,
                        subs: {},
                        officialId: specialty.id
                    }
                }

                // Add all subspecialties too
                if (specialty.subspecialties) {
                    specialty.subspecialties.forEach(sub => {
                        const subKey = normalize(sub.name)

                        if (!stats[specKey].subs[subKey]) {
                            stats[specKey].subs[subKey] = {
                                name: sub.name,
                                count: 0
                            }
                        }
                    })
                }
            })
        }

        // Sort: specialties with 0 questions at the end, then by count descending
        return Object.values(stats)
            .sort((a, b) => {
                if (a.count === 0 && b.count > 0) return 1
                if (b.count === 0 && a.count > 0) return -1
                return b.count - a.count
            })
            .map(spec => ({
                ...spec,
                subs: Object.values(spec.subs).sort((a, b) => {
                    if (a.count === 0 && b.count > 0) return 1
                    if (b.count === 0 && a.count > 0) return -1
                    return b.count - a.count
                })
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
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white">
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
                                breakdown.map((spec, i) => {
                                    const hasNoQuestions = spec.count === 0

                                    return (
                                        <div
                                            key={i}
                                            className={`bg-white border-2 rounded-[24px] overflow-hidden transition-all group ${hasNoQuestions
                                                ? 'border-rose-200 bg-rose-50/30 hover:border-rose-400'
                                                : 'border-slate-100 hover:border-primary/20'
                                                }`}
                                        >
                                            {/* Specialty Header */}
                                            <div className={`p-5 flex items-center justify-between ${hasNoQuestions ? 'bg-rose-50/50' : 'bg-slate-50/50'
                                                }`}>
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 bg-white rounded-lg border ${hasNoQuestions
                                                        ? 'border-rose-200 text-rose-500'
                                                        : 'border-slate-100 text-slate-400 group-hover:text-primary'
                                                        } transition-colors`}>
                                                        {hasNoQuestions ? (
                                                            <AlertCircle className="w-4 h-4" />
                                                        ) : (
                                                            <Stethoscope className="w-4 h-4" />
                                                        )}
                                                    </div>
                                                    <span className={`font-black uppercase tracking-tight text-lg ${hasNoQuestions ? 'text-rose-600' : 'text-[#1A1033] dark:text-white'
                                                        }`}>
                                                        {spec.name}
                                                    </span>
                                                    {hasNoQuestions && (
                                                        <span className="px-2 py-0.5 bg-rose-500 text-white text-[9px] font-black uppercase rounded-full">
                                                            SEM QUESTÕES
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-2xl font-black italic ${hasNoQuestions ? 'text-rose-500' : 'text-primary'
                                                        }`}>
                                                        {spec.count}
                                                    </span>
                                                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Questões</span>
                                                </div>
                                            </div>

                                            {/* Subs List */}
                                            <div className="p-2 bg-white">
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                                    {spec.subs.map((sub, j) => {
                                                        const subHasNoQuestions = sub.count === 0

                                                        return (
                                                            <div
                                                                key={j}
                                                                className={`flex items-center justify-between p-3 rounded-xl border ${subHasNoQuestions
                                                                    ? 'bg-rose-50 border-rose-200'
                                                                    : 'bg-slate-50 border-slate-100'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-2 min-w-0">
                                                                    <Microscope className={`w-3 h-3 shrink-0 ${subHasNoQuestions ? 'text-rose-400' : 'text-slate-400'
                                                                        }`} />
                                                                    <span className={`text-xs font-bold truncate ${subHasNoQuestions ? 'text-rose-600' : 'text-slate-600'
                                                                        }`}>
                                                                        {sub.name}
                                                                    </span>
                                                                </div>
                                                                <span className={`text-xs font-black px-2 py-1 rounded-md ${subHasNoQuestions
                                                                    ? 'text-rose-600 bg-rose-100'
                                                                    : 'text-primary bg-primary/5'
                                                                    }`}>
                                                                    {sub.count}
                                                                </span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
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
