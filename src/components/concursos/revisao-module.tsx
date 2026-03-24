"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Zap,
    Calendar,
    Target,
    TrendingUp,
    Brain,
    FileText,
    Search,
    ChevronDown,
    ArrowRight,
    Star,
    CheckCircle2,
    Clock,
    AlertCircle,
    RotateCcw,
    Shield,
    BarChart3
} from "lucide-react"

import { useAuth } from "@/store/use-auth"
import { useConcursoTaxonomy, ConcursoTaxonomyNode } from "@/store/concursos/use-taxonomy"
import { useConcursoQuestions } from "@/store/concursos/use-questions"
import { ConcursoCard } from "@/components/concursos/concurso-card"
import { cn } from "@/lib/utils"
import * as srsService from "@/lib/nivelamento-service"
import { toast } from "react-hot-toast"

// ─── TOWER 1: DASHBOARD DE REVISÃO ───────────────────────────────────────────

export function ConcursoRevisaoDashboard() {
    const { user } = useAuth()
    const { taxonomy, loadTaxonomy, getAreas } = useConcursoTaxonomy()
    
    // UI State
    const [view, setView] = useState<'overview' | 'picker' | 'session' | 'stats' | 'results'>('overview')
    const [search, setSearch] = useState("")
    const [expandedArea, setExpandedArea] = useState<string | null>(null)
    
    // Session State
    const [loading, setLoading] = useState(false)
    const [sessionData, setSessionData] = useState<{
        id: string
        questions: any[]
        currentIndex: number
        answers: Record<string, string>
        startTime: number
        scope: srsService.ScopeConfig
    } | null>(null)
    
    const [lastResult, setLastResult] = useState<srsService.PlacementResult | null>(null)

    useEffect(() => {
        loadTaxonomy()
    }, [])

    const handleStartSession = async (disciplina: ConcursoTaxonomyNode, area: ConcursoTaxonomyNode) => {
        if (!user) return
        setLoading(true)
        
        try {
            const scope: srsService.ScopeConfig = {
                scopeType: 'subarea', // Mapping disciplina to subarea for the SRS engine
                specialtyId: area.id,
                subspecialtyId: disciplina.id,
                label: disciplina.name
            }

            const sessionId = await srsService.createPlacementSession(user.id, scope)
            const questions = await srsService.fetchQuestionsForNivelamento(scope, user.id, 10)

            if (questions.length === 0) {
                toast.error("Nenhuma questão disponível para este tópico no momento.")
                setLoading(false)
                return
            }

            setSessionData({
                id: sessionId,
                questions,
                currentIndex: 0,
                answers: {},
                startTime: Date.now(),
                scope
            })
            setView('session')
        } catch (err) {
            console.error(err)
            toast.error("Erro ao carregar sessão de nivelamento.")
        } finally {
            setLoading(false)
        }
    }

    const handleAnswer = (questionId: string, answer: string) => {
        if (!sessionData) return
        
        const newAnswers = { ...sessionData.answers, [questionId]: answer }
        
        if (sessionData.currentIndex < sessionData.questions.length - 1) {
            setSessionData({
                ...sessionData,
                answers: newAnswers,
                currentIndex: sessionData.currentIndex + 1
            })
        } else {
            // Finish session
            handleFinishSession(newAnswers)
        }
    }

    const handleFinishSession = async (finalAnswers: Record<string, string>) => {
        if (!sessionData || !user) return
        setLoading(true)

        try {
            let correctCount = 0
            sessionData.questions.forEach(q => {
                if (finalAnswers[q.id] === q.resposta_correta) {
                    correctCount++
                }
            })

            const durationSeconds = Math.floor((Date.now() - sessionData.startTime) / 1000)
            const avgTime = durationSeconds / sessionData.questions.length

            const result = await srsService.completePlacementSession(
                sessionData.id,
                user.id,
                sessionData.scope,
                correctCount,
                sessionData.questions.length,
                avgTime
            )

            setLastResult(result)
            setView('results')
            setSessionData(null)
            toast.success("Sessão concluída com sucesso!")
        } catch (err) {
            console.error(err)
            toast.error("Erro ao salvar resultados.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8 pb-12">
            {/* Header com Contexto Premium - Oculto durante sessão */}
            {view !== 'session' && view !== 'results' && (
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Brain className="w-3 h-3" />
                            Engine de Aprendizado
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-tight mb-2">
                            Revisão <span className="text-indigo-600">Espaçada</span>
                        </h1>
                        <p className="text-slate-500 font-medium max-w-2xl text-sm md:text-base leading-relaxed">
                            Maximize sua retenção de longo prazo com algoritmos de SRS 
                            que garantem revisões no momento ideal antes do esquecimento.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setView('overview')}
                            className={cn(
                                "px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all",
                                view === 'overview' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white text-slate-400 hover:text-indigo-600 border border-slate-100 shadow-sm"
                            )}
                        >
                            Overview
                        </button>
                        <button 
                            onClick={() => setView('stats')}
                            className={cn(
                                "px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all",
                                view === 'stats' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white text-slate-400 hover:text-indigo-600 border border-slate-100 shadow-sm"
                            )}
                        >
                            Métricas
                        </button>
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {view === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* Status Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <ConcursoCard theme="active">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/60 bg-white/5 px-2 py-0.5 rounded">
                                        Prioridade
                                    </span>
                                </div>
                                <h3 className="text-4xl font-black italic text-white mb-1 leading-none">12</h3>
                                <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">
                                    Revisões Urgentes
                                </p>
                            </ConcursoCard>

                            <ConcursoCard theme="active" className="bg-emerald-600 border-emerald-500/50">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Star className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/60 bg-white/5 px-2 py-0.5 rounded">
                                        Consolidado
                                    </span>
                                </div>
                                <h3 className="text-4xl font-black italic text-white mb-1 leading-none">84%</h3>
                                <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest">
                                    Nível de Retenção
                                </p>
                            </ConcursoCard>

                            <ConcursoCard theme="indigo" className="group overflow-hidden">
                                <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <TrendingUp className="w-24 h-24 text-indigo-400" />
                                </div>
                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/5 px-2 py-0.5 rounded">
                                        Meta
                                    </span>
                                </div>
                                <h3 className="text-4xl font-black italic text-white mb-1 leading-none relative z-10">158</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">
                                    Revisões no Mês
                                </p>
                            </ConcursoCard>
                        </div>

                        {/* Critical Alert Card */}
                        <motion.div
                            whileHover={{ scale: 1.005 }}
                            className="bg-orange-500/5 border-2 border-orange-500/20 rounded-[32px] p-6 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 group"
                        >
                            <div className="max-w-xl">
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 text-[9px] font-black uppercase tracking-widest mb-4">
                                    <AlertCircle className="w-3 h-3" />
                                    Prioridade
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-2 leading-none">
                                    Direito Constitucional <span className="text-orange-500">em Risco</span>
                                </h2>
                                <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
                                    A curva de esquecimento está acelerando em <span className="text-[#1A1033] font-bold">Controle de Constitucionalidade</span>. Retome a revisão agora.
                                </p>
                            </div>
                            <button className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/10 flex items-center gap-3 shrink-0">
                                Iniciar Recuperação <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>

                        {/* Search and Picker Section */}
                        <div className="pt-8 space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] flex items-center gap-3 px-2">
                                    <Search className="w-6 h-6 text-indigo-600" /> Nivelar Novo Tópico
                                </h3>
                                <div className="relative group w-full md:w-80">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input 
                                        type="text"
                                        placeholder="BUSCAR DISCIPLINA..."
                                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-6 font-black text-[10px] uppercase tracking-widest outline-none focus:ring-4 ring-indigo-500/5 transition-all shadow-sm"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-[#1A1033]">
                                {getAreas().map((area) => (
                                    <div key={area.id} className="space-y-4">
                                        <motion.button
                                            layout
                                            onClick={() => setExpandedArea(expandedArea === area.id ? null : area.id)}
                                            className={cn(
                                                "w-full bg-white border p-6 rounded-[24px] flex items-center justify-between transition-all text-left group shadow-sm",
                                                expandedArea === area.id ? "border-indigo-600 ring-4 ring-indigo-500/5" : "border-slate-100 hover:border-indigo-500/20"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                                    expandedArea === area.id ? "bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-600/20" : "bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-400"
                                                )}>
                                                    <Brain className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-black italic uppercase text-base text-[#1A1033] tracking-tighter leading-none mb-0.5">{area.name}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                        {area.children?.length || 0} Disciplinas
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronDown className={cn(
                                                "w-5 h-5 text-slate-300 transition-transform duration-300",
                                                expandedArea === area.id ? "rotate-180 text-indigo-600" : "group-hover:text-indigo-400"
                                            )} />
                                        </motion.button>

                                        <AnimatePresence>
                                            {expandedArea === area.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden bg-white/50 backdrop-blur-sm rounded-[24px] border border-slate-100 p-1"
                                                >
                                                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-1 space-y-1">
                                                        {area.children?.map(disciplina => (
                                                            <button 
                                                                key={disciplina.id}
                                                                onClick={() => handleStartSession(disciplina, area)}
                                                                disabled={loading}
                                                                className="w-full text-left p-4 rounded-xl bg-white border border-transparent hover:border-indigo-500/10 hover:shadow-sm transition-all group flex items-center justify-between disabled:opacity-50"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                                                                    <span className="text-[11px] font-black italic uppercase tracking-tighter text-slate-600 group-hover:text-indigo-600">
                                                                        {disciplina.name}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'session' && sessionData && (
                    <motion.div
                        key="session"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="max-w-4xl mx-auto pt-10"
                    >
                        {/* Progress Header */}
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-6">
                                <button 
                                    onClick={() => setView('overview')}
                                    className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                </button>
                                <div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-none mb-1">
                                        Nivelamento Premium
                                    </h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {sessionData.scope.label} • Tópico em Análise
                                    </p>
                                </div>
                            </div>
                            <div className="bg-[#1A1033] text-white px-6 py-3 rounded-2xl font-black italic text-xl shadow-xl shadow-indigo-900/20">
                                {sessionData.currentIndex + 1} <span className="text-indigo-400 text-xs not-italic opacity-40 mx-1">DE</span> {sessionData.questions.length}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-3 bg-slate-100 rounded-full mb-16 relative overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${((sessionData.currentIndex + 1) / sessionData.questions.length) * 100}%` }}
                                className="absolute h-full bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/20"
                            />
                        </div>

                        {/* Question Card */}
                        <ConcursoCard className="p-8 md:p-12 border-slate-100 shadow-2xl shadow-indigo-100/30">
                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                                        <Zap className="w-3 h-3" /> Questão em Foco
                                    </div>
                                    <p className="text-xl md:text-2xl font-black italic text-[#1A1033] leading-relaxed tracking-tight">
                                        {sessionData.questions[sessionData.currentIndex].enunciado}
                                    </p>
                                </div>

                                <div className="grid gap-4">
                                    {Object.entries(sessionData.questions[sessionData.currentIndex].alternativas || {}).map(([key, value]) => (
                                        <motion.button
                                            key={key}
                                            whileHover={{ scale: 1.01, x: 4 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => handleAnswer(sessionData.questions[sessionData.currentIndex].id, key)}
                                            className="w-full text-left p-6 md:p-8 rounded-[24px] bg-slate-50 border-2 border-transparent hover:border-indigo-600 hover:bg-white transition-all group flex items-start gap-6"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black italic text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shrink-0 shadow-sm">
                                                {key}
                                            </div>
                                            <span className="text-base md:text-lg font-bold text-slate-600 group-hover:text-[#1A1033] mt-1.5 leading-relaxed">
                                                {value as string}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </ConcursoCard>
                    </motion.div>
                )}

                {view === 'results' && lastResult && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="max-w-4xl mx-auto pt-10"
                    >
                        <div className="text-center space-y-4 mb-16">
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-600/10">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-none">
                                Diagnóstico <span className="text-emerald-500">Concluído</span>
                            </h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                                Sua trajetória de retenção foi atualizada pela Engine SRS
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <ConcursoCard theme="active" className="p-10 text-center flex flex-col items-center justify-center overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Target className="w-32 h-32" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-4">Mastery Level</span>
                                <h3 className="text-5xl font-black italic text-white mb-2 tracking-tighter">{lastResult.masteryLevel}</h3>
                                <div className="px-4 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                                    {lastResult.score}% de Aproveitamento
                                </div>
                            </ConcursoCard>

                            <ConcursoCard className="p-10 flex flex-col justify-center gap-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Questões</p>
                                        <p className="text-2xl font-black italic text-[#1A1033]">{lastResult.total}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tempo Médio</p>
                                        <p className="text-2xl font-black italic text-[#1A1033]">{Math.round(lastResult.avgTimeSeconds)}s</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest font-mono">
                                        <span className="text-emerald-500">ACERTOS: {lastResult.correct}</span>
                                        <span className="text-rose-500">ERROS: {lastResult.wrong}</span>
                                    </div>
                                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex">
                                        <div style={{ width: `${(lastResult.correct / lastResult.total) * 100}%` }} className="bg-emerald-500 h-full" />
                                        <div style={{ width: `${(lastResult.wrong / lastResult.total) * 100}%` }} className="bg-rose-500 h-full" />
                                    </div>
                                </div>
                            </ConcursoCard>
                        </div>

                        <div className="flex justify-center gap-6">
                            <button 
                                onClick={() => setView('overview')}
                                className="px-12 py-6 bg-[#1A1033] text-white rounded-[28px] font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl flex items-center gap-3"
                            >
                                Voltar ao Dashboard <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {view === 'stats' && (
                    <motion.div
                        key="stats"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <ConcursoCard>
                                <h3 className="text-lg font-black italic uppercase tracking-tighter text-[#1A1033] mb-6 flex items-center gap-2 px-2">
                                    <BarChart3 className="w-5 h-5 text-indigo-600" /> Retenção
                                </h3>
                                <div className="h-56 flex items-end justify-between gap-1.5 px-2">
                                    {[45, 62, 58, 75, 82, 78, 85].map((h, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                            <div 
                                                className="w-full bg-slate-50/50 rounded-xl relative overflow-hidden group-hover:bg-indigo-50 transition-colors"
                                                style={{ height: '100%' }}
                                            >
                                                <motion.div 
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h}%` }}
                                                    className="absolute bottom-0 w-full bg-indigo-600 rounded-t-lg group-hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/10"
                                                />
                                            </div>
                                            <span className="text-[8px] font-bold text-slate-400 underline decoration-indigo-500/10 uppercase tracking-widest">{['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][i]}</span>
                                        </div>
                                    ))}
                                </div>
                            </ConcursoCard>

                            <ConcursoCard>
                                <h3 className="text-lg font-black italic uppercase tracking-tighter text-[#1A1033] mb-6 flex items-center gap-2 px-2">
                                    <Shield className="w-5 h-5 text-indigo-600" /> Disciplinas
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { name: 'Direito Constitucional', score: 85, color: 'bg-emerald-500' },
                                        { name: 'Direito Administrativo', score: 62, color: 'bg-indigo-500' },
                                        { name: 'Direito Penal', score: 45, color: 'bg-orange-500' },
                                        { name: 'Língua Portuguesa', score: 92, color: 'bg-emerald-500' }
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                                <span className="text-[#1A1033]">{item.name}</span>
                                                <span className="text-slate-400">{item.score}%</span>
                                            </div>
                                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.score}%` }}
                                                    className={cn("h-full rounded-full shadow-sm", item.color)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ConcursoCard>
                        </div>

                        {/* Consistency Heatmap Placeholder */}
                        <ConcursoCard className="p-10">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-8 flex items-center gap-3">
                                <RotateCcw className="w-6 h-6 text-indigo-600" /> Histórico de Consistência
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {Array.from({ length: 90 }).map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={cn(
                                            "w-6 h-6 rounded-lg transition-all hover:scale-125 hover:shadow-lg cursor-pointer",
                                            Math.random() > 0.3 ? (Math.random() > 0.5 ? "bg-indigo-600" : "bg-indigo-400") : "bg-slate-100"
                                        )} 
                                    />
                                ))}
                            </div>
                            <div className="mt-8 flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-100" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inativo</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-indigo-400" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Atividade</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alta Intensidade</span>
                                </div>
                            </div>
                        </ConcursoCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
