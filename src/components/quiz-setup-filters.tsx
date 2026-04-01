"use client"

import { useState, useEffect, useMemo } from 'react'
import { ChevronDown, Filter, Play, Lock, Sparkles, Zap, Database, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { useTaxonomy } from '@/store/use-taxonomy'
import { useQuestions } from '@/store/use-questions'
import { cn } from '@/lib/utils'
import { PaywallModal } from '@/components/paywall-modal'
import { ProfileModal } from '@/components/profile-modal'

export function QuizSetupFilters() {
    const { user } = useAuth()
    const { taxonomy, loadTaxonomy } = useTaxonomy()
    const { questions, totalCount, loadQuestions } = useQuestions()
    
    const [selectedCourseId, setSelectedCourseId] = useState<string>("")
    const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string>("")
    const [selectedSubspecialtyId, setSelectedSubspecialtyId] = useState<string>("")
    const [selectedSubjectId, setSelectedSubjectId] = useState<string>("")
    
    const [mode, setMode] = useState<'TREINO' | 'SIMULADO'>('TREINO')
    const [questionCount, setQuestionCount] = useState(20)

    const [isPaywallOpen, setIsPaywallOpen] = useState(false)
    const [paywallReason, setPaywallReason] = useState<'limit' | 'filter' | 'feature'>('filter')
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const router = useRouter()
    const isFree = !user || user.plan_level === 'FREE'

    useEffect(() => {
        loadTaxonomy()
        loadQuestions()
    }, [])

    const courses = useMemo(() => taxonomy.filter(n => n.level === 'course'), [taxonomy])
    
    const specialties = useMemo(() => {
        if (!selectedCourseId) return []
        return courses.find(c => c.slug === selectedCourseId)?.children || []
    }, [selectedCourseId, courses])

    const subspecialties = useMemo(() => {
        if (!selectedSpecialtyId) return []
        return specialties.find(s => s.slug === selectedSpecialtyId)?.children || []
    }, [selectedSpecialtyId, specialties])

    const subjects = useMemo(() => {
        if (!selectedSubspecialtyId) return []
        return subspecialties.find(s => s.slug === selectedSubspecialtyId)?.children || []
    }, [selectedSubspecialtyId, subspecialties])

    const filteredQuestionsCount = useMemo(() => {
        if (selectedSubjectId) return subjects.find(s => s.slug === selectedSubjectId)?.questionCount || 0
        if (selectedSubspecialtyId) return subspecialties.find(s => s.slug === selectedSubspecialtyId)?.questionCount || 0
        if (selectedSpecialtyId) return specialties.find(s => s.slug === selectedSpecialtyId)?.questionCount || 0
        if (selectedCourseId) return courses.find(s => s.slug === selectedCourseId)?.questionCount || 0
        return totalCount
    }, [totalCount, courses, specialties, subspecialties, subjects, selectedCourseId, selectedSpecialtyId, selectedSubspecialtyId, selectedSubjectId])

    const handleStart = () => {
        if (isFree && !user?.profile_completed) {
            setIsProfileOpen(true)
            return
        }

        if (!selectedCourseId) return

        const params = new URLSearchParams()
        params.set('mode', mode)
        params.set('courseId', selectedCourseId)
        params.set('count', questionCount.toString())

        if (selectedSpecialtyId) params.set('specialtyId', selectedSpecialtyId)
        if (selectedSubspecialtyId) params.set('subspecialtyId', selectedSubspecialtyId)
        if (selectedSubjectId) params.set('subjectId', selectedSubjectId)

        router.push(`/dashboard/quiz/auto?${params.toString()}`)
    }

    const checkLock = () => {
        if (isFree) {
            setPaywallReason('filter')
            setIsPaywallOpen(true)
            return true
        }
        return false
    }

    // Determine disabled states functionally
    const isStartDisabled = !selectedCourseId || filteredQuestionsCount === 0

    return (
        <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} reason={paywallReason} requiredPlan="PREMIUM" />
            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

            {/* HEADER SECTIONS: Modalidade & Stats side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Modalidade */}
                <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black italic uppercase tracking-tight text-[#1A1033] leading-none">Modalidade</h2>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-bold">Objetivo da sessão</p>
                        </div>
                    </div>

                    <div className="flex bg-slate-50 border border-slate-100 p-1.5 rounded-2xl relative shadow-inner mb-4">
                        <motion.div
                            className="absolute inset-y-1.5 bg-primary rounded-xl shadow-lg shadow-primary/20"
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
                                mode === 'TREINO' ? "text-white" : "text-slate-400 hover:text-primary"
                            )}
                        >
                            Treino
                        </button>
                        <button
                            onClick={() => {
                                if (isFree) {
                                    setPaywallReason('feature')
                                    setIsPaywallOpen(true)
                                    return
                                }
                                setMode('SIMULADO')
                            }}
                            className={cn(
                                "relative z-10 flex-1 py-3 px-4 rounded-xl font-black uppercase text-xs tracking-widest transition-colors flex items-center justify-center gap-2",
                                mode === 'SIMULADO' ? "text-white" : "text-slate-400 hover:text-primary"
                            )}
                        >
                            {isFree && <Lock className="w-3.5 h-3.5 opacity-50" />}
                            Simulado
                        </button>
                    </div>

                    <p className="text-[11px] font-bold text-slate-500 bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                        {mode === 'TREINO' 
                            ? "✅ Comentários e feedback questão por questão." 
                            : "⏱️ Sem comentários durante a prova, cronômetro e ranking."
                        }
                    </p>
                </div>

                {/* Database Stats */}
                <div className="bg-[#1A1033] rounded-3xl p-6 md:p-8 border border-[#2a1b4d] flex flex-col items-center justify-center text-center group hover:bg-[#201440] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full mix-blend-screen opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />
                    
                    <div className="p-4 bg-primary/20 text-primary rounded-2xl shadow-xl shadow-primary/10 mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 relative z-10">
                        <Database className="w-8 h-8" />
                    </div>
                    <h3 className="text-5xl font-black italic tracking-tighter text-white mb-2 relative z-10">
                        {totalCount.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-[10px] uppercase font-black tracking-widest text-white/50 relative z-10">Questões Ativas</p>
                </div>
            </div>

            {/* FILTROS ESTRATÉGICOS */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                        <Filter className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black italic uppercase tracking-tight text-[#1A1033] leading-none">Configuração da Prova</h2>
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 mt-1 font-bold">Direcione seu estudo detalhadamente</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FilterItem
                        step="01"
                        label="Curso Principal"
                        options={courses}
                        value={selectedCourseId}
                        getOptionCount={(val) => courses.find(c => c.slug === val)?.questionCount || 0}
                        onChange={(val) => {
                            setSelectedCourseId(val)
                            setSelectedSpecialtyId("")
                            setSelectedSubspecialtyId("")
                            setSelectedSubjectId("")
                        }}
                    />
                    
                    <FilterItem
                        step="02"
                        label="Especialidade"
                        options={specialties}
                        value={selectedSpecialtyId}
                        disabled={!selectedCourseId}
                        getOptionCount={(val) => specialties.find(s => s.slug === val)?.questionCount || 0}
                        onChange={(val) => {
                            setSelectedSpecialtyId(val)
                            setSelectedSubspecialtyId("")
                            setSelectedSubjectId("")
                        }}
                    />
                    
                    <FilterItem
                        step="03"
                        label="Subespecialidade"
                        options={subspecialties}
                        value={selectedSubspecialtyId}
                        disabled={!selectedSpecialtyId}
                        isLocked={isFree}
                        getOptionCount={(val) => subspecialties.find(s => s.slug === val)?.questionCount || 0}
                        onChange={(val) => {
                            if (checkLock()) return
                            setSelectedSubspecialtyId(val)
                            setSelectedSubjectId("")
                        }}
                    />
                    
                    <FilterItem
                        step="04"
                        label="Tema Específico"
                        options={subjects}
                        value={selectedSubjectId}
                        disabled={!selectedSubspecialtyId}
                        isLocked={isFree}
                        getOptionCount={(val) => subjects.find(s => s.slug === val)?.questionCount || 0}
                        onChange={(val) => {
                            if (checkLock()) return
                            setSelectedSubjectId(val)
                        }}
                    />
                </div>
            </div>

            {/* FINAL ACTION BAR: Intensidade + Start */}
            <div className="bg-[#1A1033] rounded-[32px] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full mix-blend-screen opacity-10 blur-3xl pointer-events-none" />
                
                <div className="flex-1 w-full relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Filter Summary Circle */}
                    <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-4 min-w-[140px]">
                        <span className="text-4xl font-black italic text-white tracking-tighter">
                            {filteredQuestionsCount.toLocaleString('pt-BR')}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/50 text-center mt-1">
                            Disponíveis com<br/>estes filtros
                        </span>
                    </div>

                    <div className="flex-1 w-full space-y-5">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-primary" />
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
                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                                <span>05 Q</span>
                                <span className={cn(
                                    "px-4 py-1.5 rounded-full border",
                                    "bg-primary/20 border-primary/50 text-white"
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
                            "relative group px-12 py-6 bg-primary text-white rounded-[20px] font-black uppercase tracking-tighter text-2xl italic flex items-center justify-center gap-4 transition-all shadow-xl shadow-primary/20",
                            isStartDisabled && "opacity-50 grayscale cursor-not-allowed shadow-none"
                        )}
                    >
                        <span>Iniciar Prova</span>
                        <Play className="w-7 h-7 fill-current group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                    
                    {filteredQuestionsCount === 0 && selectedCourseId && (
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
    step, label, options, value, onChange, disabled, isLocked, getOptionCount 
}: {
    step: string, label: string, options: { id: string, slug?: string, name: string }[], value: string, onChange: (val: string) => void, disabled?: boolean, isLocked?: boolean, getOptionCount?: (val: string) => number
}) {
    const selectedName = options.find(o => (o.slug || o.id) === value)?.name
    const selectedCount = value && getOptionCount ? getOptionCount(value) : null

    return (
        <div className={cn(
            "relative bg-slate-50 border border-slate-200 hover:border-primary/30 p-4 xl:p-5 rounded-2xl transition-all group",
            disabled ? "opacity-40 grayscale pointer-events-none" : "hover:bg-primary/[0.02]",
            isLocked && "bg-slate-100/50"
        )}>
            {/* Absolute invisible native select covering the whole card for super easy clicking on mobile / desktop */}
            <select
                disabled={disabled || isLocked}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 appearance-none"
                onChange={(e) => onChange(e.target.value)}
                value={value}
            >
                <option value="">{isLocked ? '🔒 Bloqueado' : 'Todos'}</option>
                {!isLocked && options.map((opt) => (
                    <option key={opt.id} value={opt.slug || opt.id}>
                        {opt.name} {getOptionCount ? `(${getOptionCount(opt.slug || opt.id)})` : ''}
                    </option>
                ))}
            </select>

            <div className="relative z-0 pointer-events-none">
                <div className="flex items-center justify-between mb-2 lg:mb-3">
                    <span className="text-[9px] xl:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {step}. {label}
                    </span>
                    {isLocked ? (
                        <Lock className="w-3.5 h-3.5 text-orange-400" />
                    ) : value ? (
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                        </div>
                    ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
                    )}
                </div>
                
                <h4 className={cn(
                    "text-sm xl:text-base font-extrabold italic uppercase tracking-tight line-clamp-2 pr-4",
                    value ? "text-primary" : "text-[#1A1033]"
                )}>
                    {isLocked ? 'Plano Premium' : (selectedName || 'Selecione...')}
                </h4>

                {selectedCount !== null && !isLocked && (
                    <div className="mt-2 flex items-center gap-1.5 font-bold text-[9px] uppercase tracking-widest text-slate-400">
                        <Database className="w-3 h-3 text-primary/40" />
                        <span>{selectedCount} Questões</span>
                    </div>
                )}
            </div>
        </div>
    )
}
