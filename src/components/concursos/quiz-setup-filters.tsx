"use client"

import { useState, useEffect, useMemo } from 'react'
import { ChevronRight, Filter, Play, Lock, Sparkles, Check, Database } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { useConcursoTaxonomy } from '@/store/concursos/use-taxonomy'
import { useConcursoQuestions } from '@/store/concursos/use-questions'
import { SectionHeader, Divider } from '@/components/dashboard-ui'

export function ConcursoQuizSetupFilters() {
    const { user } = useAuth()
    const { 
        taxonomy, 
        loadTaxonomy, 
        getAreas, 
        getDisciplinasByArea, 
        getSubdisciplinasByDisciplina, 
        getAssuntosBySubdisciplina 
    } = useConcursoTaxonomy()
    const { questions, loadQuestions } = useConcursoQuestions()
    
    const [selectedAreaId, setSelectedAreaId] = useState<string>("")
    const [selectedDisciplinaId, setSelectedDisciplinaId] = useState<string>("")
    const [selectedSubdisciplinaId, setSelectedSubdisciplinaId] = useState<string>("")
    const [selectedAssuntoId, setSelectedAssuntoId] = useState<string>("")
    const [selectedBancaId, setSelectedBancaId] = useState<string>("")
    
    const [mode, setMode] = useState<'TREINO' | 'SIMULADO'>('TREINO')
    const [questionCount, setQuestionCount] = useState(20)

    const router = useRouter()
    
    useEffect(() => {
        loadTaxonomy()
        loadQuestions()
    }, [])

    const areas = useMemo(() => getAreas(), [taxonomy])
    const disciplinas = useMemo(() => getDisciplinasByArea(selectedAreaId), [selectedAreaId, taxonomy])
    const subdisciplinas = useMemo(() => getSubdisciplinasByDisciplina(selectedDisciplinaId), [selectedDisciplinaId, taxonomy])
    const assuntos = useMemo(() => getAssuntosBySubdisciplina(selectedSubdisciplinaId), [selectedSubdisciplinaId, taxonomy])

    // Get unique banca_ids from questions
    const bancaIds = useMemo(() => {
        const unique = Array.from(new Set(questions.map(q => q.banca_id).filter(Boolean)))
        return unique.sort()
    }, [questions])

    const filteredCount = useMemo(() => {
        let filtered = questions
        if (selectedAreaId) {
            filtered = filtered.filter(q => q.area_id === selectedAreaId)
        }
        if (selectedDisciplinaId) {
            filtered = filtered.filter(q => q.disciplina_id === selectedDisciplinaId)
        }
        if (selectedBancaId) {
            filtered = filtered.filter(q => q.banca_id === selectedBancaId)
        }
        return filtered.length
    }, [questions, selectedAreaId, selectedDisciplinaId, selectedBancaId])

    const handleStart = () => {
        if (!selectedAreaId) return

        const params = new URLSearchParams()
        params.set('mode', mode)
        params.set('areaId', selectedAreaId)
        params.set('count', questionCount.toString())

        if (selectedDisciplinaId) params.set('disciplinaId', selectedDisciplinaId)
        if (selectedSubdisciplinaId) params.set('subdisciplinaId', selectedSubdisciplinaId)
        if (selectedAssuntoId) params.set('assuntoId', selectedAssuntoId)
        if (selectedBancaId) params.set('bancaId', selectedBancaId)

        router.push(`/concursos/quiz/auto?${params.toString()}`)
    }

    return (
        <div className="space-y-12">
            {/* 🔝 MODALIDADE */}
            <section className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <SectionHeader
                        title="Modalidade"
                        subtitle="Escolha seu objetivo de treinamento"
                        icon={<Sparkles className="w-5 h-5" />}
                    />
                    <div className="md:px-6 py-3 bg-white border border-slate-100 rounded-2xl hidden md:flex flex-col items-end hover:border-indigo-500/30 transition-all cursor-default group">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-500/60 transition-colors">Banco Concursos</span>
                        <span className="text-2xl font-black italic text-[#1A1033] group-hover:text-indigo-600 transition-colors">
                            {questions.length.toLocaleString('pt-BR')}
                            <span className="ml-2 text-[10px] uppercase not-italic opacity-40">Questões</span>
                        </span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="bg-slate-50 border border-slate-200 p-1.5 rounded-[30px] flex gap-1 shadow-sm overflow-hidden relative">
                        <motion.div
                            className="absolute inset-y-1.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20"
                            initial={false}
                            animate={{
                                x: mode === 'TREINO' ? 0 : 'calc(100% + 4px)',
                                width: mode === 'TREINO' ? '160px' : '180px'
                            }}
                            style={{ left: '6px' }}
                        />
                        <button
                            onClick={() => setMode('TREINO')}
                            className={`relative z-10 w-[160px] py-4 px-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-colors ${mode === 'TREINO' ? 'text-white' : 'text-slate-500 hover:text-indigo-600'}`}
                        >
                            Modo Treino
                        </button>
                        <button
                            onClick={() => setMode('SIMULADO')}
                            className={`relative z-10 w-[180px] py-4 px-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-colors flex items-center justify-center gap-2 ${mode === 'SIMULADO' ? 'text-white' : 'text-slate-500 hover:text-indigo-600'}`}
                        >
                            Modo Simulado
                        </button>
                    </div>
                </div>

                <div className="flex justify-center gap-8 text-center px-4">
                    <p className="text-slate-400 text-xs font-medium max-w-md">
                        {mode === 'TREINO' 
                            ? "Feedback imediato após cada resposta. Ideal para fixar conteúdo." 
                            : "Cronometrado e sem feedback imediato durante a prova."}
                    </p>
                </div>
            </section >

            <Divider />

            {/* 📍 FILTROS */}
            <section className="space-y-8">
                <SectionHeader
                    title="Configuração da Prova"
                    subtitle="Filtre por área, disciplina e banca examinadora"
                    icon={<Filter className="w-5 h-5" />}
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Área do Concurso</label>
                        <select 
                            value={selectedAreaId}
                            onChange={(e) => {
                                setSelectedAreaId(e.target.value)
                                setSelectedDisciplinaId("")
                                setSelectedSubdisciplinaId("")
                                setSelectedAssuntoId("")
                            }}
                            className="w-full bg-white border-2 border-slate-100 rounded-[30px] p-6 font-black italic uppercase tracking-tighter text-lg focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="">Selecionar Área...</option>
                            {areas.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Disciplina</label>
                        <select 
                            disabled={!selectedAreaId}
                            value={selectedDisciplinaId}
                            onChange={(e) => {
                                setSelectedDisciplinaId(e.target.value)
                                setSelectedSubdisciplinaId("")
                                setSelectedAssuntoId("")
                            }}
                            className="w-full bg-white border-2 border-slate-100 rounded-[30px] p-6 font-black italic uppercase tracking-tighter text-lg focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer disabled:opacity-30"
                        >
                            <option value="">Selecionar Disciplina...</option>
                            {disciplinas.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Banca Examinadora</label>
                        <select 
                            value={selectedBancaId}
                            onChange={(e) => setSelectedBancaId(e.target.value)}
                            className="w-full bg-white border-2 border-slate-100 rounded-[30px] p-6 font-black italic uppercase tracking-tighter text-lg focus:border-indigo-500 outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="">Todas as Bancas</option>
                            {bancaIds.map((b: any) => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                </div>
            </section>

            <Divider />

            {/* 🔥 VOLUME */}
            <section className="space-y-8">
                <SectionHeader
                    title="Intensidade"
                    subtitle="Volume de questões para esta sessão"
                    icon={<Play className="w-5 h-5" />}
                />

                <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 md:p-12 relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none text-[#1A1033]">Volume da Bateria</h3>
                            <p className="text-indigo-600 text-sm font-black uppercase tracking-tight italic">
                                {filteredCount} questões disponíveis com filtros atuais
                            </p>
                        </div>

                        <div className="bg-[#1A1033] text-white px-10 py-5 rounded-3xl min-w-[150px] text-center shadow-2xl">
                            <span className="text-4xl font-black italic">{questionCount}</span>
                            <span className="text-[10px] font-black uppercase text-white/40 block tracking-widest mt-1">Questões</span>
                        </div>
                    </div>

                    <div className="px-4">
                        <input
                            type="range"
                            min="5"
                            max="100"
                            step="5"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                            className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between mt-6 text-[10px] font-black uppercase tracking-widest text-slate-300">
                            <span>05</span>
                            <span>50</span>
                            <span>100</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Bar */}
            <div className="flex flex-col items-center gap-6 pt-10">
                <button
                    disabled={!selectedAreaId || filteredCount === 0}
                    onClick={handleStart}
                    className="px-20 py-8 bg-indigo-600 text-white rounded-[35px] overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:grayscale disabled:opacity-30 shadow-2xl shadow-indigo-600/30 flex items-center gap-4 text-2xl font-black italic uppercase tracking-tighter"
                >
                    INICIAR ESTUDOS <Play className="w-8 h-8 fill-white" />
                </button>
            </div>
        </div >
    )
}
