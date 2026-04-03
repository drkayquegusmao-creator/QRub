"use client"

import { useState, useEffect, useMemo } from 'react'
import { ChevronDown, Filter, Play, Sparkles, Zap, Database, CheckCircle2, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { useConcursoTaxonomy } from '@/store/concursos/use-taxonomy'
import { useConcursoQuestions } from '@/store/concursos/use-questions'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'

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
    const { questionsMeta: questions, loadAllQuestionsMeta, loadingMeta } = useConcursoQuestions()
    
    const [selectedAreaId, setSelectedAreaId] = useState<string>("")
    const [selectedDisciplinaId, setSelectedDisciplinaId] = useState<string>("")
    const [selectedSubdisciplinaId, setSelectedSubdisciplinaId] = useState<string>("")
    const [selectedAssuntoId, setSelectedAssuntoId] = useState<string>("")
    const [selectedBancaId, setSelectedBancaId] = useState<string>("")
    
    const [mode, setMode] = useState<'TREINO' | 'SIMULADO'>('TREINO')
    const [questionCount, setQuestionCount] = useState(20)
    const [bancas, setBancas] = useState<any[]>([])

    const router = useRouter()
    const isFree = !user || user.plan_level === 'free'
    
    useEffect(() => {
        loadTaxonomy()
        loadAllQuestionsMeta()
        async function loadBancas() {
            const { data } = await supabase.from('concurso_bancas').select('id, name')
            if (data) setBancas(data)
        }
        loadBancas()
    }, [])

    const areas = useMemo(() => {
        const fromTaxonomy = getAreas()
        const knownIds = new Set(fromTaxonomy.map(a => a.id))
        const hasUnmapped = questions.some(q => !q.area_id || !knownIds.has(q.area_id))
        return hasUnmapped ? [...fromTaxonomy, { id: 'unmapped-area', name: 'Geral / Outras Áreas' } as any] : fromTaxonomy
    }, [taxonomy, questions])
    
    const disciplinas = useMemo(() => {
        const fromTaxonomy = getDisciplinasByArea(selectedAreaId)
        if (!selectedAreaId) return []
        const knownIds = new Set(fromTaxonomy.map(d => d.id))
        const areaQuestions = questions.filter(q => q.area_id === selectedAreaId)
        const hasUnmapped = areaQuestions.some(q => !q.disciplina_id || !knownIds.has(q.disciplina_id))
        return hasUnmapped ? [...fromTaxonomy, { id: 'unmapped-disciplina', name: 'Geral / Outros' } as any] : fromTaxonomy
    }, [selectedAreaId, taxonomy, questions])

    const subdisciplinas = useMemo(() => {
        const fromTaxonomy = getSubdisciplinasByDisciplina(selectedDisciplinaId)
        if (!selectedDisciplinaId || selectedDisciplinaId === 'unmapped-disciplina') return []
        const knownIds = new Set(fromTaxonomy.map(s => s.id))
        const discQuestions = questions.filter(q => q.disciplina_id === selectedDisciplinaId)
        const hasUnmapped = discQuestions.some(q => !q.subdisciplina_id || !knownIds.has(q.subdisciplina_id))
        return hasUnmapped ? [...fromTaxonomy, { id: 'unmapped-sub', name: 'Geral / Outros' } as any] : fromTaxonomy
    }, [selectedDisciplinaId, taxonomy, questions])

    const assuntos = useMemo(() => {
        const fromTaxonomy = getAssuntosBySubdisciplina(selectedSubdisciplinaId)
        if (!selectedSubdisciplinaId || selectedSubdisciplinaId === 'unmapped-sub') return []
        const knownIds = new Set(fromTaxonomy.map(s => s.id))
        const subQuestions = questions.filter(q => q.subdisciplina_id === selectedSubdisciplinaId)
        const hasUnmapped = subQuestions.some(q => !q.assunto_id || !knownIds.has(q.assunto_id))
        return hasUnmapped ? [...fromTaxonomy, { id: 'unmapped-assunto', name: 'Geral / Outros' } as any] : fromTaxonomy
    }, [selectedSubdisciplinaId, taxonomy, questions])

    const bancaIds = useMemo(() => {
        const unique = Array.from(new Set(questions.map(q => q.banca_id).filter(Boolean)))
        return unique.sort()
    }, [questions])

    const displayBancas = useMemo(() => {
        const knownIds = new Set(bancas.map(b => b.id))
        const hasUnmapped = questions.some(q => !q.banca_id || !knownIds.has(q.banca_id))
        return hasUnmapped ? [...bancas, { id: 'unmapped-banca', name: 'Geral / Sem Banca' }] : bancas
    }, [bancas, questions])

    const filteredCount = useMemo(() => {
        let filtered = questions
        if (selectedAreaId) {
            if (selectedAreaId === 'unmapped-area') {
                const knownIds = new Set(getAreas().map(a => a.id))
                filtered = filtered.filter(q => !q.area_id || !knownIds.has(q.area_id))
            } else {
                filtered = filtered.filter(q => q.area_id === selectedAreaId)
            }
        }
        
        if (selectedDisciplinaId) {
            if (selectedDisciplinaId === 'unmapped-disciplina') {
                const knownIds = new Set(getDisciplinasByArea(selectedAreaId).map(d => d.id))
                filtered = filtered.filter(q => !q.disciplina_id || !knownIds.has(q.disciplina_id))
            } else {
                filtered = filtered.filter(q => q.disciplina_id === selectedDisciplinaId)
            }
        }
        
        if (selectedSubdisciplinaId) {
            if (selectedSubdisciplinaId === 'unmapped-sub') {
                const knownIds = new Set(getSubdisciplinasByDisciplina(selectedDisciplinaId).map(s => s.id))
                filtered = filtered.filter(q => !q.subdisciplina_id || !knownIds.has(q.subdisciplina_id))
            } else {
                filtered = filtered.filter(q => q.subdisciplina_id === selectedSubdisciplinaId)
            }
        }
        
        if (selectedAssuntoId) {
            if (selectedAssuntoId === 'unmapped-assunto') {
                const knownIds = new Set(getAssuntosBySubdisciplina(selectedSubdisciplinaId).map(s => s.id))
                filtered = filtered.filter(q => !q.assunto_id || !knownIds.has(q.assunto_id))
            } else {
                filtered = filtered.filter(q => q.assunto_id === selectedAssuntoId)
            }
        }
        
        if (selectedBancaId) {
            if (selectedBancaId === 'unmapped-banca') {
                const knownIds = new Set(bancas.map(b => b.id))
                filtered = filtered.filter(q => !q.banca_id || !knownIds.has(q.banca_id))
            } else {
                filtered = filtered.filter(q => q.banca_id === selectedBancaId)
            }
        }
        return filtered.length
    }, [questions, selectedAreaId, selectedDisciplinaId, selectedSubdisciplinaId, selectedAssuntoId, selectedBancaId, taxonomy, bancas])

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

    const isStartDisabled = !selectedAreaId || filteredCount === 0

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* HEADER SECTIONS: Modalidade & Stats side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Modalidade */}
                <div className="md:col-span-2 bg-white dark:bg-white/5 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-white/10 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black italic uppercase tracking-tight text-[#1A1033] dark:text-white leading-none">Modalidade</h2>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-bold">Objetivo da sessão</p>
                        </div>
                    </div>

                    <div className="flex bg-slate-50 dark:bg-[#1A1033]/50 border border-slate-100 dark:border-white/5 p-1.5 rounded-2xl relative shadow-inner mb-4">
                        <motion.div
                            className="absolute inset-y-1.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20"
                            initial={false}
                            animate={{
                                x: mode === 'TREINO' ? 0 : '100%',
                                width: 'calc(50% - 3px)'
                            }}
                            style={{ left: '6px' }}
                        />
                        <button
                            onClick={() => setMode('TREINO')}
                            className={cn(
                                "relative z-10 flex-1 py-3 px-4 rounded-xl font-black uppercase text-xs tracking-widest transition-colors",
                                mode === 'TREINO' ? "text-white" : "text-slate-400 hover:text-indigo-600"
                            )}
                        >
                            Treino
                        </button>
                        <button
                            onClick={() => setMode('SIMULADO')}
                            className={cn(
                                "relative z-10 flex-1 py-3 px-4 rounded-xl font-black uppercase text-xs tracking-widest transition-colors flex items-center justify-center gap-2",
                                mode === 'SIMULADO' ? "text-white" : "text-slate-400 hover:text-indigo-600"
                            )}
                        >
                            Simulado
                        </button>
                    </div>

                    <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-lg p-3 text-center border border-slate-100 dark:border-white/5">
                        {mode === 'TREINO' 
                            ? "✅ Feedback imediato em tempo real ao responder." 
                            : "🚨 Cronômetro ativo e painel de resultados no final."
                        }
                    </p>
                </div>

                {/* Database Stats */}
                <div className="bg-[#1A1033] rounded-3xl p-6 md:p-8 border border-[#2a1b4d] flex flex-col items-center justify-center text-center group hover:bg-[#201440] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-600 rounded-full mix-blend-screen opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
                    
                    <div className="p-4 bg-indigo-500/20 text-indigo-400 rounded-2xl shadow-xl shadow-indigo-500/10 mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 relative z-10">
                        <Database className="w-8 h-8" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-2 relative z-10">
                        {questions.length}
                    </h3>
                    <p className="text-[10px] uppercase font-black tracking-widest text-indigo-400/50 relative z-10">Questões Ativas</p>
                </div>
            </div>

            {/* FILTROS ESTRATÉGICOS */}
            <div className="bg-white dark:bg-white/5 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-white/10 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
                        <Filter className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black italic uppercase tracking-tight text-[#1A1033] dark:text-white leading-none">Configuração da Prova</h2>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-bold">Refine seus critérios de seleção</p>
                    </div>
                </div>

                {/* Grid 5 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
                    <FilterItem
                        step="01"
                        label="Área"
                        options={areas}
                        value={selectedAreaId}
                        getOptionCount={(id) => {
                            if (id === 'unmapped-area') {
                                const knownIds = new Set(getAreas().map(a => a.id))
                                return questions.filter(q => !q.area_id || !knownIds.has(q.area_id)).length
                            }
                            return questions.filter(q => q.area_id === id).length
                        }}
                        onChange={(id) => {
                            setSelectedAreaId(id)
                            setSelectedDisciplinaId("")
                            setSelectedSubdisciplinaId("")
                            setSelectedAssuntoId("")
                        }}
                    />
                    
                    <FilterItem
                        step="02"
                        label="Disciplina"
                        options={disciplinas}
                        value={selectedDisciplinaId}
                        disabled={!selectedAreaId}
                        getOptionCount={(id) => {
                            if (id === 'unmapped-disciplina') {
                                const knownIds = new Set(getDisciplinasByArea(selectedAreaId).map(d => d.id))
                                return questions.filter(q => q.area_id === selectedAreaId && (!q.disciplina_id || !knownIds.has(q.disciplina_id))).length
                            }
                            return questions.filter(q => q.disciplina_id === id && q.area_id === selectedAreaId).length
                        }}
                        onChange={(id) => {
                            setSelectedDisciplinaId(id)
                            setSelectedSubdisciplinaId("")
                            setSelectedAssuntoId("")
                        }}
                    />
                    
                    <FilterItem
                        step="03"
                        label="Subdisciplina"
                        options={subdisciplinas}
                        value={selectedSubdisciplinaId}
                        disabled={!selectedDisciplinaId}
                        getOptionCount={(id) => {
                            if (id === 'unmapped-sub') {
                                const knownIds = new Set(getSubdisciplinasByDisciplina(selectedDisciplinaId).map(s => s.id))
                                return questions.filter(q => q.disciplina_id === selectedDisciplinaId && (!q.subdisciplina_id || !knownIds.has(q.subdisciplina_id))).length
                            }
                            return questions.filter(q => q.subdisciplina_id === id && q.disciplina_id === selectedDisciplinaId).length
                        }}
                        onChange={(id) => {
                            setSelectedSubdisciplinaId(id)
                            setSelectedAssuntoId("")
                        }}
                    />
                    
                    <FilterItem
                        step="04"
                        label="Assunto"
                        options={assuntos}
                        value={selectedAssuntoId}
                        disabled={!selectedSubdisciplinaId}
                        getOptionCount={(id) => {
                            if (id === 'unmapped-assunto') {
                                const knownIds = new Set(getAssuntosBySubdisciplina(selectedSubdisciplinaId).map(s => s.id))
                                return questions.filter(q => q.subdisciplina_id === selectedSubdisciplinaId && (!q.assunto_id || !knownIds.has(q.assunto_id))).length
                            }
                            return questions.filter(q => q.assunto_id === id && q.subdisciplina_id === selectedSubdisciplinaId).length
                        }}
                        onChange={(id) => setSelectedAssuntoId(id)}
                    />

                    <FilterItem
                        step="05"
                        label="Banca"
                        options={displayBancas}
                        value={selectedBancaId}
                        getOptionCount={(id) => {
                            if (id === 'unmapped-banca') {
                                const knownIds = new Set(bancas.map(b => b.id))
                                return questions.filter(q => !q.banca_id || !knownIds.has(q.banca_id)).length
                            }
                            // Bancas should not cascade down from Assunto/Subdisciplina rigidly, 
                            // but filtering by Area/Disciplina helps accuracy. For now, count globally.
                            return questions.filter(q => q.banca_id === id).length
                        }}
                        onChange={(id) => setSelectedBancaId(id)}
                    />
                </div>
            </div>

            {/* FINAL ACTION BAR: Intensidade + Start */}
            <div className="bg-[#1A1033] rounded-[32px] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen opacity-10 blur-3xl pointer-events-none" />
                
                <div className="flex-1 w-full relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Filter Summary Circle */}
                    <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[140px]">
                        <span className="text-4xl font-black italic text-white tracking-tighter">
                            {filteredCount}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 text-center mt-1">
                            Disponíveis com<br/>estes filtros
                        </span>
                    </div>

                    <div className="flex-1 w-full space-y-5 mt-2">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-indigo-400" />
                            <h3 className="text-xl font-black italic text-white uppercase tracking-tight">Intensidade</h3>
                        </div>
                        
                        <div className="px-2">
                            <input
                                type="range"
                                min="5"
                                max="100"
                                step="5"
                                value={questionCount}
                                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
                            />
                            <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                                <span>05 Q</span>
                                <span className={cn(
                                    "px-4 py-1.5 rounded-full border",
                                    "bg-indigo-600/30 border-indigo-500/50 text-indigo-100"
                                )}>{questionCount} Escolhidas</span>
                                <span>100 Q</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-auto flex flex-col gap-3 relative z-10">
                    <motion.button
                        whileHover={{ scale: isStartDisabled ? 1 : 1.02, y: isStartDisabled ? 0 : -2 }}
                        whileTap={{ scale: isStartDisabled ? 1 : 0.98 }}
                        disabled={isStartDisabled}
                        onClick={handleStart}
                        className={cn(
                            "relative group px-12 py-6 bg-indigo-600 text-white rounded-[20px] font-black uppercase tracking-tighter text-2xl italic flex items-center justify-center gap-4 transition-all shadow-xl shadow-indigo-600/20",
                            isStartDisabled && "opacity-50 grayscale cursor-not-allowed shadow-none"
                        )}
                    >
                        <span>Gerar Bateria</span>
                        <Play className="w-7 h-7 fill-current group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                    
                    {filteredCount === 0 && selectedAreaId && (
                        <p className="text-rose-400 text-[10px] font-bold text-center uppercase tracking-widest animate-pulse">
                            🚨 Zero questões ativas nestes filtros.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

function FilterItem({ 
    step, label, options, value, onChange, disabled, getOptionCount
}: {
    step: string, label: string, options: { id: string, name: string }[], value: string, onChange: (id: string) => void, disabled?: boolean, getOptionCount?: (id: string) => number
}) {
    const selectedName = options.find(o => o.id === value)?.name
    const selectedCount = value && getOptionCount ? getOptionCount(value) : null

    return (
        <div className={cn(
            "relative bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 dark:hover:border-indigo-500/40 p-4 xl:p-5 rounded-2xl transition-all group",
            disabled ? "opacity-40 grayscale pointer-events-none" : "hover:bg-indigo-500/[0.02] dark:hover:bg-indigo-500/[0.05]"
        )}>
            {/* Absolute invisible native select covering the whole card for super easy clicking on mobile / desktop */}
            <select
                disabled={disabled}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 appearance-none"
                onChange={(e) => onChange(e.target.value)}
                value={value}
            >
                <option value="">Todos</option>
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name} {getOptionCount ? `(${getOptionCount(opt.id)})` : ''}
                    </option>
                ))}
            </select>

            <div className="relative z-0 pointer-events-none flex flex-col h-full justify-between gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-[9px] xl:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        {step}. {label}
                    </span>
                    {value ? (
                        <div className="w-4 h-4 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" />
                    )}
                </div>
                
                <h4 className={cn(
                    "text-sm xl:text-base font-extrabold italic uppercase tracking-tight line-clamp-2 pr-4 break-words",
                    value ? "text-indigo-600 dark:text-indigo-400" : "text-[#1A1033] dark:text-slate-300"
                )}>
                    {selectedName || 'Selecione...'}
                </h4>

                {selectedCount !== null && (
                    <div className="mt-2 flex items-center gap-1.5 font-bold text-[9px] uppercase tracking-widest text-slate-400">
                        <Database className="w-3 h-3 text-indigo-500/40" />
                        <span>{selectedCount} Questões</span>
                    </div>
                )}
            </div>
        </div>
    )
}
