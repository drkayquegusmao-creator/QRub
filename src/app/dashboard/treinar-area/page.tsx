"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Target, Search, ChevronDown, Check, Play, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/store/use-auth'

interface AreaCount {
    specialty_id: string
    total_questions: number
}

interface TaxonomyItem {
    specialty_id: string
    subspecialty_id: string
    subject_id: string
    total_questions: number
}

export default function TreinarAreaPage() {
    const router = useRouter()
    const { user } = useAuth()

    // States
    const [status, setStatus] = useState<'LOADING' | 'READY' | 'ERROR'>('LOADING')
    const [areas, setAreas] = useState<AreaCount[]>([])

    // Selections
    const [selectedArea, setSelectedArea] = useState<string>('')
    const [selectedSubarea, setSelectedSubarea] = useState<string>('')
    const [selectedSubject, setSelectedSubject] = useState<string>('')

    // Filter dependencies
    const [availableSubareas, setAvailableSubareas] = useState<{ name: string, count: number }[]>([])
    const [availableSubjects, setAvailableSubjects] = useState<{ name: string, count: number }[]>([])

    // Extra filters
    const [difficulty, setDifficulty] = useState<string>('Qualquer')
    const [volume, setVolume] = useState<number>(20)
    const [mode, setMode] = useState<'Aleatório' | 'Sequencial'>('Aleatório')

    // Search
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<TaxonomyItem[]>([])
    const [isSearching, setIsSearching] = useState(false)

    // Total count
    const [totalInSelection, setTotalInSelection] = useState<number>(0)
    const [isCreatingSession, setIsCreatingSession] = useState(false)

    // Load initial config from cache and fetch areas
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Restore cache
                const cachedArea = localStorage.getItem('qrub_training_area')
                const cachedSubarea = localStorage.getItem('qrub_training_subarea')
                const cachedSubject = localStorage.getItem('qrub_training_subject')

                // Fetch main areas
                const { data: areasData, error: areasError } = await supabase
                    .from('view_specialty_counts')
                    .select('*')
                    .order('total_questions', { ascending: false })

                if (areasError) throw areasError

                setAreas(areasData || [])

                if (cachedArea && areasData?.find(a => a.specialty_id === cachedArea)) {
                    setSelectedArea(cachedArea)

                    if (cachedSubarea) {
                        setSelectedSubarea(cachedSubarea)

                        if (cachedSubject) {
                            setSelectedSubject(cachedSubject)
                        }
                    }
                }

                setStatus('READY')
            } catch (error) {
                console.error('Failed to load areas:', error)
                setStatus('ERROR')
            }
        }

        loadInitialData()
    }, [])

    // Update Subareas when Area changes
    useEffect(() => {
        if (!selectedArea) {
            setAvailableSubareas([])
            setAvailableSubjects([])
            return
        }

        localStorage.setItem('qrub_training_area', selectedArea)

        const fetchSubareas = async () => {
            const { data, error } = await supabase
                .from('view_question_taxonomy')
                .select('subspecialty_id, total_questions')
                .eq('specialty_id', selectedArea)

            if (error) {
                console.error(error)
                return
            }

            // group and sum
            const aggregated = data?.reduce((acc: any, curr) => {
                const existing = acc.find((a: any) => a.name === curr.subspecialty_id)
                if (existing) {
                    existing.count += curr.total_questions
                } else {
                    acc.push({ name: curr.subspecialty_id, count: curr.total_questions })
                }
                return acc
            }, [])

            setAvailableSubareas(aggregated?.sort((a: any, b: any) => b.count - a.count) || [])
        }

        fetchSubareas()
    }, [selectedArea])

    // Update Subjects when Subarea changes
    useEffect(() => {
        if (!selectedSubarea) {
            setAvailableSubjects([])
            return
        }

        localStorage.setItem('qrub_training_subarea', selectedSubarea)

        const fetchSubjects = async () => {
            const { data, error } = await supabase
                .from('view_question_taxonomy')
                .select('subject_id, total_questions')
                .eq('specialty_id', selectedArea)
                .eq('subspecialty_id', selectedSubarea)
                .order('total_questions', { ascending: false })

            if (error) {
                console.error(error)
                return
            }

            setAvailableSubjects(data?.map(d => ({ name: d.subject_id, count: d.total_questions })) || [])
        }

        fetchSubjects()
    }, [selectedSubarea, selectedArea])

    // Cache subject when selected
    useEffect(() => {
        if (selectedSubject) {
            localStorage.setItem('qrub_training_subject', selectedSubject)
        } else {
            localStorage.removeItem('qrub_training_subject')
        }
    }, [selectedSubject])

    // Calculate total questions available based on selection and difficulty
    useEffect(() => {
        if (!selectedArea) {
            setTotalInSelection(0)
            return
        }

        const calcTotal = async () => {
            let query = supabase
                .from('questao_base')
                .select('id', { count: 'exact', head: true })
                .eq('course_id', 'medicina')
                .eq('status', 'active')
                .eq('status_validacao', 'APROVADA')
                .eq('specialty_id', selectedArea)

            if (selectedSubarea) query = query.eq('subspecialty_id', selectedSubarea)
            if (selectedSubject) query = query.eq('subject_id', selectedSubject)
            if (difficulty !== 'Qualquer') query = query.eq('difficulty', difficulty.toLowerCase())

            const { count, error } = await query

            if (!error && count !== null) {
                setTotalInSelection(count)
            }
        }

        calcTotal()
    }, [selectedArea, selectedSubarea, selectedSubject, difficulty])

    // Search Logic
    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (searchTerm.trim().length < 3) {
                setSearchResults([])
                return
            }

            setIsSearching(true)
            try {
                const { data, error } = await supabase
                    .from('view_question_taxonomy')
                    .select('*')
                    .ilike('subject_id', `%${searchTerm}%`)
                    .limit(20)

                if (!error && data) {
                    setSearchResults(data)
                }
            } finally {
                setIsSearching(false)
            }
        }, 500)

        return () => clearTimeout(timeout)
    }, [searchTerm])

    const handleStartSession = async () => {
        if (!user || !selectedArea) return
        if (totalInSelection === 0) {
            alert('Não há questões suficientes para os filtros selecionados.')
            return
        }

        try {
            setIsCreatingSession(true)

            // Register session
            const { data, error } = await supabase
                .from('training_sessions')
                .insert({
                    user_id: user.id,
                    area: selectedArea,
                    subarea: selectedSubarea || null,
                    subject: selectedSubject || null,
                    difficulty,
                    volume,
                })
                .select()
                .single()

            if (error) throw error

            localStorage.setItem('qrub_current_session_id', data.id)
            router.push(`/dashboard/treino-area/${data.id}`)

        } catch (error) {
            console.error('Failed to create session:', error)
            alert('Erro ao iniciar treino. Tente novamente.')
            setIsCreatingSession(false)
        }
    }

    if (status === 'LOADING') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="mt-4 text-xs font-black uppercase tracking-widest text-[#1A1033]">Carregando Taxonomia...</p>
            </div>
        )
    }

    if (status === 'ERROR') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
                <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
                <h2 className="text-xl font-black italic uppercase text-[#1A1033]">Conexão Perdida</h2>
                <p className="text-sm font-bold text-slate-400 mt-2 mb-6 text-center max-w-sm">Houve um problema ao carregar as questões. Tente novamente.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 bg-primary text-white rounded-[20px] font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                    Tentar Novamente
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.push('/dashboard')}
                    className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] flex items-center gap-3">
                        <Target className="w-8 h-8 text-primary" />
                        Treinar por Área
                    </h1>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Escolha uma especialidade médica e aprimore seus conhecimentos
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full relative">

                {/* Lateral Esquerda - Formulário Principal */}
                <div className="md:col-span-8 flex flex-col gap-6">

                    {/* Pesquisa Inteligente */}
                    <div className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 flex flex-col gap-4 relative z-20">
                        <div className="flex items-center gap-3 text-[#1A1033] mb-2">
                            <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-black uppercase italic tracking-tight">Busca Inteligente</h2>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Encontre um assunto rapidamente</p>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ex: Hipertensão, Tireoide, Diabetes..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 pl-12 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm text-[#1A1033]"
                            />
                            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>

                        {/* Search Results Dropdown */}
                        <AnimatePresence>
                            {searchTerm.length >= 3 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl p-2 z-50 max-h-64 overflow-y-auto"
                                >
                                    {isSearching ? (
                                        <div className="p-4 flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Buscando...
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        searchResults.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedArea(item.specialty_id);
                                                    setSelectedSubarea(item.subspecialty_id);
                                                    // Give time for state updates to cascade before selecting subject
                                                    setTimeout(() => setSelectedSubject(item.subject_id), 100);
                                                    setSearchTerm('');
                                                    setSearchResults([]);
                                                }}
                                                className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition-colors mb-1"
                                            >
                                                <div className="text-xs font-bold text-slate-400 uppercase items-center gap-1 flex flex-wrap">
                                                    <span>{item.specialty_id || 'Geral'}</span>
                                                    <ChevronDown className="w-3 h-3 -rotate-90 inline" />
                                                    <span>{item.subspecialty_id || 'Geral'}</span>
                                                </div>
                                                <div className="text-sm font-black text-[#1A1033] mt-0.5 flex items-center justify-between">
                                                    <span>{item.subject_id}</span>
                                                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 whitespace-nowrap">{item.total_questions} Q</span>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                                            Nenhum resultado encontrado
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Taxonomia Step by Step */}
                    <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-slate-100 flex flex-col gap-8 relative z-10">
                        {/* Area */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">1. Especialidade Principal</label>
                            <select
                                value={selectedArea}
                                onChange={e => {
                                    setSelectedArea(e.target.value);
                                    setSelectedSubarea('');
                                    setSelectedSubject('');
                                }}
                                className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm text-[#1A1033]"
                            >
                                <option value="" disabled>Selecione uma especialidade...</option>
                                {areas.map(area => (
                                    <option key={area.specialty_id} value={area.specialty_id}>
                                        {area.specialty_id} ({area.total_questions})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subarea */}
                        <AnimatePresence mode="popLayout">
                            {selectedArea && availableSubareas.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-3"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">2. Subespecialidade (Opcional)</label>
                                    <select
                                        value={selectedSubarea}
                                        onChange={e => {
                                            setSelectedSubarea(e.target.value);
                                            setSelectedSubject('');
                                        }}
                                        className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm text-[#1A1033]"
                                    >
                                        <option value="">Todas da área</option>
                                        {availableSubareas.map(sub => (
                                            <option key={sub.name} value={sub.name}>
                                                {sub.name} ({sub.count})
                                            </option>
                                        ))}
                                    </select>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Subject */}
                        <AnimatePresence mode="popLayout">
                            {selectedSubarea && availableSubjects.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-3"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">3. Tema / Assunto (Opcional)</label>
                                    <select
                                        value={selectedSubject}
                                        onChange={e => setSelectedSubject(e.target.value)}
                                        className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm text-[#1A1033]"
                                    >
                                        <option value="">Todos os temas</option>
                                        {availableSubjects.map(sub => (
                                            <option key={sub.name} value={sub.name}>
                                                {sub.name} ({sub.count})
                                            </option>
                                        ))}
                                    </select>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Preferences Setup */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block pb-2 border-b border-slate-50">Dificuldade</label>
                            {['Qualquer', 'Fácil', 'Média', 'Difícil'].map(d => (
                                <div key={d} onClick={() => setDifficulty(d)} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${difficulty === d ? 'bg-primary border-primary' : 'border border-slate-300'}`}>
                                        {difficulty === d && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={`text-sm font-bold ${difficulty === d ? 'text-primary' : 'text-slate-500 group-hover:text-[#1A1033]'}`}>{d}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block pb-2 border-b border-slate-50">Volume</label>
                            {[10, 20, 30, 50, 100].map(v => (
                                <div key={v} onClick={() => setVolume(v)} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${volume === v ? 'border-[6px] border-primary' : 'border border-slate-300'}`}></div>
                                    <span className={`text-sm font-bold ${volume === v ? 'text-primary' : 'text-slate-500 group-hover:text-[#1A1033]'}`}>{v} Metas</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block pb-2 border-b border-slate-50">Modo</label>
                            {['Aleatório', 'Sequencial'].map(m => (
                                <div key={m} onClick={() => setMode(m as any)} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${mode === m ? 'bg-indigo-500 border-indigo-500' : 'border border-slate-300'}`}>
                                        {mode === m && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={`text-sm font-bold ${mode === m ? 'text-indigo-600' : 'text-slate-500 group-hover:text-[#1A1033]'}`}>{m}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Lateral Direita - Resumo e Sticky Button */}
                <div className="md:col-span-4 mt-6 md:mt-0 relative">
                    <div className="sticky top-6 flex flex-col gap-4">
                        <div className="bg-gradient-to-br from-[#1A1033] to-indigo-950 p-6 md:p-8 rounded-[30px] shadow-xl text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-1000"></div>

                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-6">Seu Treino</h3>

                            <div className="space-y-4 mb-8">
                                <div>
                                    <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Área Selecionada</p>
                                    <p className="text-lg font-black italic">{selectedArea || 'Selecione uma Área'}</p>
                                </div>
                                {selectedSubarea && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Subespecialidade</p>
                                        <p className="text-sm font-bold">{selectedSubarea}</p>
                                    </motion.div>
                                )}
                                {selectedSubject && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Tema</p>
                                        <p className="text-sm font-bold">{selectedSubject}</p>
                                    </motion.div>
                                )}
                            </div>

                            <div className="p-4 bg-white/10 rounded-[20px] backdrop-blur-sm border border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Questões Compatíveis</p>
                                <p className="text-3xl font-black">{totalInSelection.toLocaleString()} <span className="text-sm text-primary tracking-widest uppercase">Disp.</span></p>
                            </div>

                        </div>

                        <button
                            onClick={handleStartSession}
                            disabled={!selectedArea || totalInSelection === 0 || isCreatingSession}
                            className="group relative w-full h-[70px] bg-primary rounded-[25px] flex items-center justify-center shadow-2xl shadow-primary/30 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            {isCreatingSession ? (
                                <Loader2 className="w-6 h-6 text-white animate-spin" />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <span className="relative z-10 text-white font-black italic uppercase text-lg tracking-widest flex items-center gap-3">
                                        <Play className="fill-white" /> Iniciar Treino
                                    </span>
                                </>
                            )}
                        </button>

                        <button
                            disabled
                            className="w-full py-4 text-[#1A1033] border-2 border-slate-200 rounded-[24px] font-black uppercase text-xs tracking-widest opacity-50 relative overflow-hidden flex flex-col items-center justify-center gap-1"
                        >
                            <span>Modo Revisão (Erros)</span>
                            <span className="text-[8px] bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Em Breve</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
