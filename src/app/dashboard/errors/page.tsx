"use client"

import { useEffect, useState, useMemo } from 'react'
import { History, Search, AlertCircle, ChevronRight, Play, BookOpen, Clock, Filter, BrainCircuit } from 'lucide-react'
import { useQuestions } from '@/store/use-questions'
import { useQuiz } from '@/store/use-quiz'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeader, Divider } from '@/components/dashboard-ui'
import { MEDICAL_HIERARCHY } from '@/lib/medical-specialties'
import Link from 'next/link'

export default function ErrorCenter() {
    const { questions, loadQuestions, loading: questionsLoading } = useQuestions()
    const { error_notebook } = useQuiz()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | 'ALL'>('ALL')

    useEffect(() => {
        if (questions.length === 0) {
            loadQuestions()
        }
    }, [])

    // Filter questions that are in the error notebook
    const erredQuestions = useMemo(() => {
        const erredIds = new Set(error_notebook.map(e => e.question_id))
        return questions.filter(q => erredIds.has(q.id))
    }, [questions, error_notebook])

    // Group errors by specialty
    const mistakesBySpecialty = useMemo(() => {
        const groups: Record<string, typeof erredQuestions> = {}
        erredQuestions.forEach(q => {
            if (!groups[q.specialty_id]) groups[q.specialty_id] = []
            groups[q.specialty_id].push(q)
        })
        return groups
    }, [erredQuestions])

    // Filtered list for display
    const filteredGroups = useMemo(() => {
        let result = Object.entries(mistakesBySpecialty)

        if (selectedSpecialty !== 'ALL') {
            result = result.filter(([id]) => id === selectedSpecialty)
        }

        if (searchTerm) {
            result = result.map(([specId, qList]) => {
                const filteredList = qList.filter(q =>
                    q.enunciado.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    MEDICAL_HIERARCHY[0].specialties.find(s => s.id === specId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                return [specId, filteredList] as [string, typeof erredQuestions]
            }).filter(([_, list]) => list.length > 0)
        }

        return result
    }, [mistakesBySpecialty, selectedSpecialty, searchTerm])

    const totalErrors = erredQuestions.length

    return (
        <div className="space-y-12 pb-32 max-w-7xl mx-auto px-6">
            {/* 🔝 HEADER ESTATÍSTICO */}
            <section className="relative overflow-hidden bg-[#1A1033] rounded-[50px] p-10 md:p-16 text-white soft-shadow">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <BrainCircuit className="w-64 h-64" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-black uppercase tracking-[0.3em]">
                            <AlertCircle className="w-4 h-4" />
                            Ambiente de Recuperação
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85]">
                            Caderno de <span className="royal-gradient-text">Erros.</span>
                        </h1>
                        <p className="text-white/60 font-medium max-w-md leading-relaxed italic">
                            O Dr. QRub mapeou as lacunas no seu conhecimento. Resolva estas questões para transformar fraquezas em aprovação.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Total de Erros</p>
                            <p className="text-4xl font-black italic text-rose-500">{totalErrors}</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Especialidades</p>
                            <p className="text-4xl font-black italic text-primary">{Object.keys(mistakesBySpecialty).length}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔍 FILTROS */}
            <section className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar erro ou enunciado..."
                        className="w-full bg-white border-2 border-slate-100 rounded-3xl py-5 pl-16 pr-6 text-sm font-bold focus:border-primary/30 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        className="bg-white border-2 border-slate-100 rounded-3xl px-8 py-5 text-sm font-black uppercase tracking-widest outline-none appearance-none cursor-pointer hover:border-primary/30 transition-all"
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                        <option value="ALL">Todas Especialidades</option>
                        {Object.keys(mistakesBySpecialty).map(id => (
                            <option key={id} value={id}>
                                {MEDICAL_HIERARCHY[0].specialties.find(s => s.id === id)?.name || id}
                            </option>
                        ))}
                    </select>
                    <button className="royal-gradient text-white px-10 py-5 rounded-3xl font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:scale-[1.05] active:scale-95 transition-all shadow-xl">
                        <Play className="w-5 h-5 fill-white" />
                        Repassar Tudo
                    </button>
                </div>
            </section>

            <Divider />

            {/* 📍 LISTAGEM POR ESPECIALIDADE */}
            <div className="space-y-16">
                {questionsLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="font-black italic uppercase tracking-widest text-slate-400 text-xs">Mapeando lacunas...</p>
                    </div>
                ) : filteredGroups.length === 0 ? (
                    <div className="text-center py-32 bg-slate-50 rounded-[50px] border-2 border-dashed border-slate-200">
                        <div className="bg-white p-8 rounded-full w-fit mx-auto mb-8 shadow-sm">
                            <History className="w-16 h-16 text-emerald-500/30" />
                        </div>
                        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-3">Seu Caderno está Limpo!</h3>
                        <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                            Nenhum erro pendente. Seu desempenho atual está acima da média do Dr. QRub. Continue focado!
                        </p>
                    </div>
                ) : (
                    filteredGroups.map(([specId, qList]) => {
                        const specName = MEDICAL_HIERARCHY[0].specialties.find(s => s.id === specId)?.name || specId
                        return (
                            <section key={specId} className="space-y-8">
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-primary rounded-3xl text-white shadow-lg shadow-primary/20">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033]">{specName}</h2>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{qList.length} QUESTÕES PARA REVISAR</p>
                                        </div>
                                    </div>
                                    <Link href={`/dashboard/quiz/auto?mode=TREINO&specialtyId=${encodeURIComponent(specId)}&count=10`}>
                                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary/10 text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all">
                                            Repassar Área <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {qList.map((q, idx) => {
                                        const errorData = error_notebook.find(e => e.question_id === q.id)
                                        return (
                                            <motion.div
                                                key={q.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="bg-white border-2 border-slate-100 p-10 rounded-[45px] soft-shadow hover:border-rose-500/30 transition-all group flex flex-col justify-between h-[320px] relative"
                                            >
                                                <div className="absolute top-8 right-8">
                                                    <div className="flex flex-col items-end gap-1">
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Revisões</span>
                                                        <div className="flex gap-1">
                                                            {[1, 2, 3].map(step => (
                                                                <div key={step} className={`w-2 h-2 rounded-full ${(errorData?.review_count || 0) >= step ? 'bg-emerald-500' : 'bg-slate-100'}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2.5 bg-rose-500/10 rounded-2xl">
                                                            <AlertCircle className="w-5 h-5 text-rose-500" />
                                                        </div>
                                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">ID: {q.id.slice(0, 8)}</span>
                                                    </div>
                                                    <p className="font-bold text-[#1A1033] leading-snug text-lg group-hover:text-rose-600 transition-colors line-clamp-4">
                                                        {q.enunciado}
                                                    </p>
                                                </div>

                                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <Clock className="w-4 h-4" />
                                                        <span className="text-[9px] font-bold uppercase tracking-widest italic font-sans">{errorData?.next_review_date ? new Date(errorData.next_review_date).toLocaleDateString() : 'Imediato'}</span>
                                                    </div>
                                                    <Link href={`/dashboard/quiz/auto?mode=TREINO&specialtyId=${q.specialty_id}&count=1`}>
                                                        <button className="p-4 rounded-3xl bg-slate-50 text-slate-400 group-hover:bg-[#1A1033] group-hover:text-white transition-all shadow-sm">
                                                            <ChevronRight className="w-6 h-6" />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </section>
                        )
                    })
                )}
            </div>
        </div>
    )
}
