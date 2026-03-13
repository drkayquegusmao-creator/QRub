"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { ArrowLeft, Target, Search, ChevronDown, Check, Play, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/store/use-auth'
import { getRootTaxonomy, getChildren, getDescendants, TaxonomyNode, getTaxonomyPath } from '@/lib/taxonomy-service'
import { countQuestionsByFilters, getQuestionsForTraining } from '@/lib/question-service'
import { v4 as uuidv4 } from 'uuid'

interface TaxonomyLevel {
    id: string
    title: string
    nodes: TaxonomyNode[]
    selectedNodeId: string
    loading: boolean
}

export default function TreinarAreaPage() {
    const router = useRouter()
    const pathname = usePathname()
    const { user } = useAuth()
    const isConcursos = pathname?.startsWith('/concursos')

    // Status / View States
    const [status, setStatus] = useState<'LOADING' | 'READY' | 'ERROR'>('LOADING')
    const [isCreatingSession, setIsCreatingSession] = useState(false)
    const [totalAvailable, setTotalAvailable] = useState<number>(0)
    const [isCounting, setIsCounting] = useState(false)

    // Cascaded Taxonomy Levels
    const [levels, setLevels] = useState<TaxonomyLevel[]>([
        { id: 'area', title: '1. Área Principal', nodes: [], selectedNodeId: '', loading: true }
    ])

    // Filters
    const [difficulty, setDifficulty] = useState<string>('Qualquer')
    const [statusF, setStatusF] = useState<string>('Nao Resolvidas')
    const [banca, setBanca] = useState<string>('')
    const [volume, setVolume] = useState<number>(20)

    // Search
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState<TaxonomyNode[]>([])
    const [isSearching, setIsSearching] = useState(false)

    // Derived State
    const deepestSelectedNode = useMemo(() => {
        let lastSelected: TaxonomyNode | null = null
        for (let lvl of levels) {
            const node = lvl.nodes.find(n => n.id === lvl.selectedNodeId)
            if (node) lastSelected = node
        }
        return lastSelected
    }, [levels])

    // Load Initial Roots
    useEffect(() => {
        const loadRoots = async () => {
            try {
                const roots = await getRootTaxonomy(isConcursos)
                setLevels(prev => [
                    { ...prev[0], nodes: roots, loading: false }
                ])
                setStatus('READY')
            } catch (error) {
                console.error('Failed to load root taxonomy:', error)
                setStatus('ERROR')
            }
        }
        loadRoots()
    }, [])

    // Update cascading children
    const handleNodeSelect = useCallback(async (levelIndex: number, nodeId: string) => {
        setLevels(prev => {
            const next = [...prev]
            next[levelIndex].selectedNodeId = nodeId
            // Wipe out subsequent levels when a parent changes
            return next.slice(0, levelIndex + 1)
        })

        if (!nodeId) return

        try {
            const children = await getChildren(nodeId, isConcursos)
            if (children.length > 0) {
                const nextLevelTitle = `${levelIndex + 2}. Nível Específico`
                setLevels(prev => [
                    ...prev,
                    { id: `lvl-${levelIndex + 1}`, title: nextLevelTitle, nodes: children, selectedNodeId: '', loading: false }
                ])
            }
        } catch (error) {
            console.error('Failed to load children taxonomy:', error)
        }
    }, [])

    // Smart Count Effect
    useEffect(() => {
        const updateCount = async () => {
            if (!deepestSelectedNode) {
                setTotalAvailable(0)
                return
            }
            setIsCounting(true)
            try {
                // To fetch valid count accurately
                const count = await countQuestionsByFilters({
                    banca: banca || undefined,
                    taxonomyId: deepestSelectedNode.id,
                    difficulty: difficulty,
                    status: statusF
                }, isConcursos)
                setTotalAvailable(count)
            } catch (err) {
                console.error('Error counting total questions:', err)
            } finally {
                setIsCounting(false)
            }
        }

        // debounce slightly
        const timeout = setTimeout(updateCount, 300)
        return () => clearTimeout(timeout)
    }, [deepestSelectedNode, banca, difficulty, statusF])


    // Search logic pointing to the new taxonomia view
    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (searchTerm.trim().length < 3) {
                setSearchResults([])
                return
            }

            setIsSearching(true)
            const table = isConcursos ? 'concurso_taxonomia' : 'taxonomia'
            try {
                const { data, error } = await supabase
                    .from(table)
                    .select('*')
                    .or(`name.ilike.%${searchTerm}%,slug.ilike.%${searchTerm}%`)
                    .eq('active', true)
                    .order('name', { ascending: true })
                    .limit(50)

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
        if (!user || !deepestSelectedNode || totalAvailable === 0) return

        try {
            setIsCreatingSession(true)
            // Save to DB
            const questions = await getQuestionsForTraining({
                banca: banca || undefined,
                taxonomyId: deepestSelectedNode.id,
                difficulty: difficulty,
                status: statusF
            }, volume, isConcursos)

            if (!questions || questions.length === 0) {
                throw new Error('Não há questões com este filtro exato.')
            }

            const sessionId = uuidv4()
            const { error } = await supabase
                .from('training_sessions')
                .insert({
                    id: sessionId,
                    user_id: user.id,
                    area: deepestSelectedNode.slug,
                    difficulty: difficulty,
                    volume: questions.length,
                    question_ids: questions.map(q => q.id),
                    created_at: new Date().toISOString()
                })

            if (error) throw error

            localStorage.setItem('qrub_current_session_id', sessionId)
            router.push(`/dashboard/treino-area/${sessionId}`)

        } catch (err: any) {
            console.error(err)
            alert(err.message || 'Erro ao iniciar sessão.')
            setIsCreatingSession(false)
        }
    }


    if (status === 'LOADING') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="mt-4 text-xs font-black uppercase tracking-widest text-[#1A1033]">Carregando Taxonomia V2...</p>
            </div>
        )
    }

    if (status === 'ERROR') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
                <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
                <h2 className="text-xl font-black italic uppercase text-[#1A1033]">Falha na Base</h2>
                <p className="text-sm font-bold text-slate-400 mt-2 mb-6 text-center max-w-sm">
                    Impossível sincronizar com a base de dados oficial.
                </p>
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
                        Acesse toda a Base de Questões por Área de forma dinâmica e hierárquica
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full relative">

                {/* Left Side - Forms */}
                <div className="md:col-span-8 flex flex-col gap-6">

                    {/* Smart Search */}
                    <div className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 flex flex-col gap-4 relative z-20">
                        <div className="flex items-center gap-3 text-[#1A1033] mb-2">
                            <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl">
                                <Search className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-black uppercase italic tracking-tight">Busca Direta</h2>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Ache um tópico da matriz</p>
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ex: Síndrome, Diabetes, Asma..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 pl-12 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-sm text-[#1A1033]"
                            />
                            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>

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
                                            <Loader2 className="w-4 h-4 animate-spin" /> Buscando nós na Matriz...
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        searchResults.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={async () => {
                                                    setSearchTerm('')
                                                    setSearchResults([])
                                                    setIsSearching(true)
                                                    try {
                                                        const path = await getTaxonomyPath(item.id)
                                                        if (path.length > 0) {
                                                            const newLevels: TaxonomyLevel[] = []
                                                            const roots = await getRootTaxonomy()
                                                            newLevels.push({
                                                                id: 'area',
                                                                title: '1. Área Principal',
                                                                nodes: roots,
                                                                selectedNodeId: path[0]?.id || '',
                                                                loading: false
                                                            })

                                                            for (let i = 0; i < path.length; i++) {
                                                                const currentNode = path[i]
                                                                const children = await getChildren(currentNode.id)
                                                                if (children.length > 0) {
                                                                    newLevels.push({
                                                                        id: `lvl-${i + 1}`,
                                                                        title: `${i + 2}. Nível Específico`,
                                                                        nodes: children,
                                                                        selectedNodeId: path[i + 1]?.id || '',
                                                                        loading: false
                                                                    })
                                                                }
                                                            }
                                                            setLevels(newLevels)
                                                        }
                                                    } catch (err) {
                                                        console.error('Failed to rebuild path', err)
                                                    } finally {
                                                        setIsSearching(false)
                                                    }
                                                }}
                                                className="w-full text-left p-3 hover:bg-slate-50 rounded-xl transition-colors mb-1"
                                            >
                                                <div className="text-sm font-black text-[#1A1033] mt-0.5 flex items-center justify-between">
                                                    <span>{item.name}</span>
                                                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 whitespace-nowrap">{item.level}</span>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                                            Nenhum resultado na taxonomia
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Taxonomy Matrix - Cascading Dropdowns */}
                    <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm border border-slate-100 flex flex-col gap-6 relative z-10 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl">
                                <Target className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-sm font-black uppercase italic tracking-tight">Navegação Hierárquica</h2>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Navegue pelas pastas oficiais</p>
                            </div>
                        </div>

                        {levels.map((lvl, index) => (
                            <AnimatePresence key={lvl.id}>
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="space-y-3"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        {lvl.title}
                                        {index === levels.length - 1 && lvl.selectedNodeId && ' (Fim da Rota Selecionado)'}
                                    </label>
                                    <select
                                        value={lvl.selectedNodeId}
                                        onChange={e => handleNodeSelect(index, e.target.value)}
                                        className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-black text-sm text-[#1A1033]"
                                    >
                                        <option value="" disabled>Selecione uma opção...</option>
                                        <option value="">Todas do nível Acima (Pular/Filtrar Tudo)</option>
                                        {lvl.nodes.map(node => (
                                            <option key={node.id} value={node.id}>
                                                {node.name}
                                            </option>
                                        ))}
                                    </select>
                                </motion.div>
                            </AnimatePresence>
                        ))}
                    </div>

                    {/* Mixed Options */}
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
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block pb-2 border-b border-slate-50">Status do Aluno</label>
                            {['Qualquer', 'Nao Resolvidas', 'Já Acertadas', 'Já Erradas'].map(m => (
                                <div key={m} onClick={() => setStatusF(m)} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${statusF === m ? 'bg-indigo-500 border-indigo-500' : 'border border-slate-300'}`}>
                                        {statusF === m && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={`text-sm font-bold ${statusF === m ? 'text-indigo-600' : 'text-slate-500 group-hover:text-[#1A1033]'}`}>{m}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-3 flex flex-col justify-between">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block pb-2 border-b border-slate-50 mb-3">Volume no Grid</label>
                                {[10, 20, 30, 50, 100].map(v => (
                                    <div key={v} onClick={() => setVolume(v)} className="flex items-center gap-3 cursor-pointer group mb-1">
                                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${volume === v ? 'border-[5px] border-primary' : 'border border-slate-300'}`}></div>
                                        <span className={`text-sm font-bold ${volume === v ? 'text-primary' : 'text-slate-500 group-hover:text-[#1A1033]'}`}>{v} Metas</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Panel - Summary */}
                <div className="md:col-span-4 mt-6 md:mt-0 relative">
                    <div className="sticky top-6 flex flex-col gap-4">
                        <div className="bg-gradient-to-br from-[#1A1033] to-indigo-950 p-6 md:p-8 rounded-[30px] shadow-xl text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-1000"></div>

                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-6">Filtros Ativos</h3>

                            <div className="space-y-4 mb-8 text-sm">
                                <div>
                                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Rota Profunda Ativa</p>
                                    <p className="font-black italic text-lg">{deepestSelectedNode ? deepestSelectedNode.name : 'Nenhuma Área'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Dificuldade</p>
                                        <p className="font-bold">{difficulty}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Status</p>
                                        <p className="font-bold">{statusF}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-white/10 rounded-[20px] backdrop-blur-sm border border-white/5 flex flex-col">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1 flex items-center justify-between">
                                    Questões Realmente Disponíveis
                                    {isCounting && <RefreshCw className="w-3 h-3 animate-spin" />}
                                </p>
                                {deepestSelectedNode ? (
                                    <p className="text-3xl font-black">{totalAvailable.toLocaleString()} <span className="text-sm text-primary tracking-widest uppercase">Q.</span></p>
                                ) : (
                                    <p className="text-lg font-black text-rose-300">Aguardando Filtro...</p>
                                )}
                            </div>

                        </div>

                        <button
                            onClick={handleStartSession}
                            disabled={!deepestSelectedNode || totalAvailable === 0 || isCreatingSession}
                            className={`group relative w-full h-[70px] rounded-[25px] flex items-center justify-center shadow-2xl overflow-hidden transition-all
                                ${(!deepestSelectedNode || totalAvailable === 0) ? 'bg-slate-200 cursor-not-allowed text-slate-400' : 'bg-primary text-white shadow-primary/30 hover:scale-[1.02] active:scale-95'}
                            `}
                        >
                            {isCreatingSession ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <span className="relative z-10 font-black italic uppercase text-lg tracking-widest flex items-center gap-3">
                                        <Play className={!deepestSelectedNode || totalAvailable === 0 ? "fill-slate-400" : "fill-white"} />
                                        {totalAvailable === 0 ? 'Filtro Zerado' : 'Iniciar Treino'}
                                    </span>
                                </>
                            )}
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}
