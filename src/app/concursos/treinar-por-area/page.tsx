"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Target, Search, Check, Play, Loader2, AlertCircle, RefreshCw, BookOpen, Layers } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/store/use-auth'
import { getRootConcursoTaxonomy, getConcursoChildren, getConcursoTaxonomyPath } from '@/lib/concurso-taxonomy-service'
import { countConcursoQuestions, getConcursoQuestions } from '@/lib/concurso-question-service'
import { v4 as uuidv4 } from 'uuid'
import { TaxonomyNode } from '@/lib/taxonomy-service'

interface ConcursoTaxonomyLevel {
    id: string
    title: string
    nodes: TaxonomyNode[]
    selectedNodeId: string
    loading: boolean
}

export default function TreinarAreaConcursosPage() {
    const router = useRouter()
    const { user } = useAuth()

    // Status / View States
    const [status, setStatus] = useState<'LOADING' | 'READY' | 'ERROR'>('LOADING')
    const [isCreatingSession, setIsCreatingSession] = useState(false)
    const [totalAvailable, setTotalAvailable] = useState<number>(0)
    const [isCounting, setIsCounting] = useState(false)

    // Cascaded Taxonomy Levels
    const [levels, setLevels] = useState<ConcursoTaxonomyLevel[]>([
        { id: 'area', title: '1. Área do Concurso', nodes: [], selectedNodeId: '', loading: true }
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
                const roots = await getRootConcursoTaxonomy()
                setLevels(prev => [
                    { ...prev[0], nodes: roots, loading: false }
                ])
                setStatus('READY')
            } catch (error) {
                console.error('Failed to load root concurso taxonomy:', error)
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
            return next.slice(0, levelIndex + 1)
        })

        if (!nodeId) return

        try {
            const children = await getConcursoChildren(nodeId)
            if (children.length > 0) {
                const nextLevelTitle = `${levelIndex + 2}. Nível Específico`
                setLevels(prev => [
                    ...prev,
                    { id: `lvl-${levelIndex + 1}`, title: nextLevelTitle, nodes: children, selectedNodeId: '', loading: false }
                ])
            }
        } catch (error) {
            console.error('Failed to load concurso children taxonomy:', error)
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
                const count = await countConcursoQuestions({
                    banca_id: banca || undefined,
                    area_id: deepestSelectedNode.id,
                    difficulty: difficulty === 'Qualquer' ? undefined : difficulty,
                })
                setTotalAvailable(count)
            } catch (err) {
                console.error('Error counting concurso questions:', err)
            } finally {
                setIsCounting(false)
            }
        }

        const timeout = setTimeout(updateCount, 300)
        return () => clearTimeout(timeout)
    }, [deepestSelectedNode, banca, difficulty, statusF])

    // Search logic
    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (searchTerm.trim().length < 3) {
                setSearchResults([])
                return
            }

            setIsSearching(true)
            try {
                const { data, error } = await supabase
                    .from('concurso_taxonomia')
                    .select('*')
                    .ilike('name', `%${searchTerm}%`)
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
        if (!user || !deepestSelectedNode || totalAvailable === 0) return

        try {
            setIsCreatingSession(true)
            const questions = await getConcursoQuestions({
                area_id: deepestSelectedNode.id,
                difficulty: difficulty === 'Qualquer' ? undefined : difficulty,
            }, volume)

            if (!questions || questions.length === 0) {
                throw new Error('Não há questões com este filtro exato.')
            }

            const sessionId = uuidv4()
            const { error } = await supabase
                .from('concurso_training_sessions')
                .insert({
                    id: sessionId,
                    user_id: user.id,
                    area_id: deepestSelectedNode.id,
                    difficulty: difficulty,
                    volume: questions.length,
                    question_ids: questions.map(q => q.id),
                    created_at: new Date().toISOString()
                })

            if (error) throw error

            router.push(`/concursos/treino/${sessionId}`)

        } catch (err: any) {
            console.error(err)
            alert(err.message || 'Erro ao iniciar sessão.')
            setIsCreatingSession(false)
        }
    }

    if (status === 'LOADING') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-vh-50 py-32">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-[#1A1033]">Carregando Matriz de Concursos...</p>
            </div>
        )
    }

    if (status === 'ERROR') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-vh-50 py-32">
                <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
                <h2 className="text-xl font-black italic uppercase text-[#1A1033]">Falha na Base de Concursos</h2>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-6 px-8 py-4 bg-indigo-600 text-white rounded-[20px] font-black uppercase text-xs tracking-widest"
                >
                    Tentar Novamente
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-32">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => router.push('/concursos')}
                    className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#1A1033] flex items-center gap-3">
                        <Target className="w-8 h-8 text-indigo-500" />
                        Treinar por Área (Concursos)
                    </h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        Utilize a Navegação Hierárquica para acessar pastas de cargos e conhecimentos específicos
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8 space-y-8">
                    {/* Search Panel */}
                    <div className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 relative z-20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl">
                                <Search className="w-5 h-5" />
                            </div>
                            <h2 className="text-xs font-black uppercase italic tracking-widest text-indigo-900 leading-none mt-1">Busca Rápida na Matriz</h2>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Busque por cargo, tópico ou área..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold text-sm"
                            />
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
                                                <Loader2 className="w-4 h-4 animate-spin" /> Buscando na base de concursos...
                                            </div>
                                        ) : searchResults.length > 0 ? (
                                            searchResults.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={async () => {
                                                        const path = await getConcursoTaxonomyPath(item.id)
                                                        if (path.length > 0) {
                                                            const newLevels: ConcursoTaxonomyLevel[] = []
                                                            const roots = await getRootConcursoTaxonomy()
                                                            newLevels.push({
                                                                id: 'area', title: '1. Área do Concurso',
                                                                nodes: roots, selectedNodeId: path[0]?.id || '', loading: false
                                                            })
                                                            for (let i = 0; i < path.length; i++) {
                                                                const children = await getConcursoChildren(path[i].id)
                                                                if (children.length > 0) {
                                                                    newLevels.push({
                                                                        id: `lvl-${i + 1}`, title: `${i + 2}. Nível Específico`,
                                                                        nodes: children, selectedNodeId: path[i + 1]?.id || '', loading: false
                                                                    })
                                                                }
                                                            }
                                                            setLevels(newLevels)
                                                        }
                                                        setSearchTerm('')
                                                        setSearchResults([])
                                                    }}
                                                    className="w-full text-left p-4 hover:bg-slate-50 rounded-xl transition-colors mb-1"
                                                >
                                                    <div className="text-sm font-black text-[#1A1033] flex justify-between">
                                                        <span>{item.name}</span>
                                                        <span className="text-[9px] bg-indigo-50 px-2 py-1 rounded text-indigo-500 uppercase">{item.level}</span>
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-xs font-bold text-slate-400">Nenhum resultado</div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Taxonomy Nav */}
                    <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-6 relative z-10 transition-all">
                         <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h2 className="text-sm font-black uppercase italic tracking-widest text-[#1A1033]">Navegação por Nível</h2>
                        </div>

                        {levels.map((lvl, index) => (
                            <motion.div key={lvl.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">{lvl.title}</label>
                                <select
                                    value={lvl.selectedNodeId}
                                    onChange={e => handleNodeSelect(index, e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-[30px] p-6 font-black italic uppercase tracking-tighter text-lg focus:bg-white transition-all appearance-none cursor-pointer outline-none"
                                >
                                    <option value="">Selecionar...</option>
                                    {lvl.nodes.map(node => <option key={node.id} value={node.id}>{node.name}</option>)}
                                </select>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Summary */}
                <div className="md:col-span-4">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-[#1A1033] p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                <BookOpen className="w-32 h-32" />
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-8">Resumo da Configuração</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Área Selecionada</p>
                                    <p className="text-xl font-black italic uppercase leading-tight">
                                        {deepestSelectedNode ? deepestSelectedNode.name : 'Aguardando Seleção...'}
                                    </p>
                                </div>
                                
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-2">
                                     <p className="text-[9px] font-black uppercase tracking-widest text-white/40 flex justify-between">
                                        Questões Disponíveis
                                        {isCounting && <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />}
                                    </p>
                                    <p className="text-4xl font-black italic">
                                        {totalAvailable.toLocaleString()} <span className="text-[10px] text-indigo-500 not-italic">Q.</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleStartSession}
                            disabled={!deepestSelectedNode || totalAvailable === 0 || isCreatingSession}
                            className="w-full py-8 bg-indigo-600 rounded-[35px] text-white font-black italic uppercase text-lg tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:grayscale disabled:opacity-30 disabled:hover:scale-100"
                        >
                            {isCreatingSession ? <Loader2 className="w-6 h-6 animate-spin" /> : <>INICIAR TREINO <Play className="w-6 h-6 fill-white" /></>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
