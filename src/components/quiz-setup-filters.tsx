"use client"

import { useState, useEffect } from 'react'
import { COURSES, Course, Specialty, Subspecialty, Subject, filterQuestions } from '@/lib/data-mock'
import { ChevronRight, Filter, Play, Lock, Sparkles, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth, PlanLevel } from '@/store/use-auth'
import { PaywallModal } from '@/components/paywall-modal'
import { ProfileModal } from '@/components/profile-modal'
import { useQuestions } from '@/store/use-questions'
import { SectionHeader, Divider } from '@/components/dashboard-ui'

export function QuizSetupFilters() {
    const { user } = useAuth()
    const { questions, loadQuestions } = useQuestions()
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null)
    const [selectedSubspecialty, setSelectedSubspecialty] = useState<Subspecialty | null>(null)
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
    const [mode, setMode] = useState<'TREINO' | 'SIMULADO'>('TREINO')
    const [questionCount, setQuestionCount] = useState(20)

    const [isPaywallOpen, setIsPaywallOpen] = useState(false)
    const [paywallReason, setPaywallReason] = useState<'limit' | 'filter' | 'feature'>('filter')
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const router = useRouter()
    const isFree = !user || user.plan_level === 'FREE'

    useEffect(() => {
        loadQuestions()

        // Handle search params for pre-filled filters
        const params = new URLSearchParams(window.location.search)
        const courseId = params.get('courseId')
        const specialtyId = params.get('specialtyId')
        const subspecialtyId = params.get('subspecialtyId')
        const subjectId = params.get('subjectId')

        if (courseId) {
            const course = COURSES.find(c => c.id === courseId)
            if (course) {
                setSelectedCourse(course)
                if (specialtyId) {
                    const specialty = course.specialties.find(s => s.id === specialtyId)
                    if (specialty) {
                        setSelectedSpecialty(specialty)
                        if (subspecialtyId) {
                            const sub = specialty.subspecialties.find(ss => ss.id === subspecialtyId)
                            if (sub) {
                                setSelectedSubspecialty(sub)
                                if (subjectId) {
                                    const subjt = sub.subjects.find(sbt => sbt.id === subjectId)
                                    if (subjt) {
                                        setSelectedSubject(subjt)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [])

    useEffect(() => {
        if (!selectedCourse) {
            setSelectedSpecialty(null)
            setSelectedSubspecialty(null)
            setSelectedSubject(null)
        }
    }, [selectedCourse])

    useEffect(() => {
        if (!selectedSpecialty) {
            setSelectedSubspecialty(null)
            setSelectedSubject(null)
        }
    }, [selectedSpecialty])

    useEffect(() => {
        if (!selectedSubspecialty) {
            setSelectedSubject(null)
        }
    }, [selectedSubspecialty])

    const handleModeChange = (newMode: 'TREINO' | 'SIMULADO') => {
        if (newMode === 'SIMULADO' && isFree) {
            setPaywallReason('filter')
            setIsPaywallOpen(true)
            return
        }
        setMode(newMode)
    }

    const checkLock = () => {
        if (isFree) {
            setPaywallReason('filter')
            setIsPaywallOpen(true)
            return true
        }
        return false
    }

    const filteredQuestions = filterQuestions(questions, {
        course_id: selectedCourse?.id,
        specialty_id: selectedSpecialty?.id,
        subspecialty_id: selectedSubspecialty?.id,
        subject_id: selectedSubject?.id
    }).filter(q => q.status_validacao === 'APROVADA')

    const handleStart = () => {
        if (isFree && !user?.profile_completed) {
            setIsProfileOpen(true)
            return
        }

        if (!selectedCourse) return

        const params = new URLSearchParams()
        params.set('mode', mode)
        params.set('courseId', selectedCourse.id)
        params.set('count', questionCount.toString())

        if (selectedSpecialty) params.set('specialtyId', selectedSpecialty.id)
        if (selectedSubspecialty) params.set('subspecialtyId', selectedSubspecialty.id)
        if (selectedSubject) params.set('subjectId', selectedSubject.id)

        const id = 'q1'
        router.push(`/dashboard/quiz/${id}?${params.toString()}`)
    }

    return (
        <div className="space-y-12">
            <PaywallModal
                isOpen={isPaywallOpen}
                onClose={() => setIsPaywallOpen(false)}
                reason={paywallReason}
                requiredPlan="PREMIUM"
            />
            <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />

            {/* 🔝 GRUPO A: MODALIDADE */}
            <section className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <SectionHeader
                        title="Modalidade"
                        subtitle="Escolha seu objetivo de treinamento"
                        icon={<Sparkles className="w-5 h-5" />}
                    />
                    <div className="px-6 py-3 bg-card border border-border/50 rounded-2xl flex flex-col items-end hover:border-primary/30 transition-all cursor-default group">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-primary/60 transition-colors">Banco Total</span>
                        <span className="text-2xl font-black italic text-foreground group-hover:text-primary transition-colors">
                            {questions.filter(q => q.status_validacao === 'APROVADA').length.toLocaleString('pt-BR')}
                            <span className="ml-2 text-[10px] uppercase not-italic opacity-40">Questões</span>
                        </span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="bg-card/50 backdrop-blur-xl border border-white/5 p-1.5 rounded-[30px] flex gap-1 shadow-2xl overflow-hidden relative soft-shadow">
                        <motion.div
                            layoutId="activeMode"
                            className="absolute inset-y-1.5 bg-primary rounded-2xl shadow-lg shadow-primary/20"
                            initial={false}
                            animate={{
                                x: mode === 'TREINO' ? 0 : 'calc(100% + 4px)',
                                width: mode === 'TREINO' ? '160px' : '180px'
                            }}
                            style={{ left: '6px' }}
                        />
                        <button
                            onClick={() => handleModeChange('TREINO')}
                            className={`relative z-10 w-[160px] py-4 px-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-colors ${mode === 'TREINO' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Modo Treino
                        </button>
                        <button
                            onClick={() => handleModeChange('SIMULADO')}
                            className={`relative z-10 w-[180px] py-4 px-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-colors flex items-center justify-center gap-2 ${mode === 'SIMULADO' ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            {isFree && <Lock className={`w-3 h-3 ${mode === 'SIMULADO' ? 'text-white/40' : 'text-orange-500 opacity-60'}`} />}
                            Modo Simulado
                        </button>
                    </div>
                </div>


                {/* Mode Explanation */}
                <div className="flex justify-center gap-8 text-center px-4">
                    <AnimatePresence mode="wait">
                        {mode === 'TREINO' ? (
                            <motion.div
                                key="treino"
                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                                className="max-w-md space-y-1"
                            >
                                <p className="text-primary font-black uppercase text-xs tracking-widest">⚡️ Modo Treino</p>
                                <p className="text-muted-foreground text-xs font-medium">Feedback imediato após cada resposta. Ideal para aprender e fixar conteúdo sem pressão de tempo.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="simulado"
                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                                className="max-w-md space-y-1"
                            >
                                <p className="text-primary font-black uppercase text-xs tracking-widest">⏱️ Modo Simulado</p>
                                <p className="text-muted-foreground text-xs font-medium">Cronometrado e sem feedback imediato. O gabarito só é revelado ao finalizar a prova. Simulação real de exame.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section >

            <Divider />

            {/* 📍 GRUPO B: FILTROS */}
            <section className="space-y-8">
                <SectionHeader
                    title="Especialização"
                    subtitle="Filtre o campo de atuação cirúrgica"
                    icon={<Filter className="w-5 h-5" />}
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <FilterCard
                        title="Curso"
                        value={selectedCourse?.name}
                        options={COURSES}
                        icon={<Sparkles className="w-4 h-4" />}
                        onSelect={(id) => setSelectedCourse(COURSES.find(c => c.id === id) || null)}
                    />

                    <FilterCard
                        title="Especialidade"
                        value={selectedSpecialty?.name}
                        options={selectedCourse?.specialties || []}
                        disabled={!selectedCourse}
                        onSelect={(id) => setSelectedSpecialty(selectedCourse?.specialties.find(s => s.id === id) || null)}
                    />

                    <FilterCard
                        title="Subespecialidade"
                        value={selectedSubspecialty?.name}
                        options={selectedSpecialty?.subspecialties || []}
                        disabled={!selectedSpecialty}
                        isLocked={isFree}
                        onSelect={(id) => checkLock() || setSelectedSubspecialty(selectedSpecialty?.subspecialties.find(s => s.id === id) || null)}
                    />

                    <FilterCard
                        title="Assunto"
                        value={selectedSubject?.name}
                        options={selectedSubspecialty?.subjects || []}
                        disabled={!selectedSubspecialty}
                        isLocked={isFree}
                        onSelect={(id) => checkLock() || setSelectedSubject(selectedSubspecialty?.subjects.find(s => s.id === id) || null)}
                    />
                </div>
            </section>

            <Divider />

            {/* 🔥 GRUPO C: VOLUME */}
            <section className="space-y-8">
                <SectionHeader
                    title="Intensidade"
                    subtitle="Volume de fogo para sua bateria"
                    icon={<Play className="w-5 h-5" />}
                />

                <div className="bg-card glass-card border border-border/50 rounded-[40px] p-10 md:p-12 shadow-2xl relative overflow-hidden soft-shadow">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <Filter className="w-64 h-64 rotate-12" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-primary font-black uppercase text-[10px] tracking-[0.3em] mb-2">
                                <Filter className="w-4 h-4" />
                                Escopo de Questões
                            </div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Volume de Questões</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-muted-foreground text-sm font-medium uppercase tracking-tight italic opacity-60">Sessão calibrada para retenção máxima.</p>
                                <div className="h-1 w-1 rounded-full bg-primary/40" />
                                <p className="text-primary text-sm font-black uppercase tracking-tight italic">
                                    {filteredQuestions.length} questões encontradas para seu filtro
                                </p>
                            </div>
                        </div>

                        <div className="bg-foreground text-white px-10 py-5 rounded-3xl min-w-[150px] text-center shadow-2xl">
                            <span className="text-4xl font-black italic">{questionCount}</span>
                            <span className="text-[10px] font-black uppercase text-white/40 block tracking-widest mt-1">Questões</span>
                        </div>
                    </div>

                    <div className="relative z-10 px-4 group">
                        <div className="relative h-2.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-primary"
                                animate={{ width: `${((questionCount - 5) / 95) * 100}%` }}
                                transition={{ type: 'spring', damping: 20 }}
                            />
                        </div>

                        <input
                            type="range"
                            min="5"
                            max="100"
                            step="5"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                            className="absolute inset-x-4 -top-2.5 h-8 w-[calc(100%-32px)] appearance-none bg-transparent cursor-pointer z-20 
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:h-10 
                            [&::-webkit-slider-thumb]:rounded-2xl [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 
                            [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-2xl [&::-webkit-slider-thumb]:transition-all 
                            hover:[&::-webkit-slider-thumb]:scale-110 active:[&::-webkit-slider-thumb]:scale-95"
                        />

                        <div className="flex justify-between mt-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                            <span>Mín: 05</span>
                            <span>Médio: 50</span>
                            <span>Máx: 100</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Bar */}
            <div className="flex flex-col items-center gap-6 pt-10">
                <button
                    disabled={!selectedCourse}
                    onClick={handleStart}
                    className="group relative px-20 py-8 royal-gradient rounded-[35px] overflow-hidden transition-all hover:scale-105 active:scale-95 disabled:grayscale disabled:opacity-30 disabled:hover:scale-100 shadow-2xl shadow-primary/30"
                >
                    <div className="relative z-10 flex items-center gap-4 text-white font-black italic uppercase text-2xl tracking-tighter">
                        INICIAR SIMULADO <Play className="w-8 h-8 fill-white" />
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 flex items-center gap-2">
                    <Check className="w-3 h-3 text-emerald-500" /> Protocolo Qrub Ativo
                </p>
            </div>
        </div >
    )
}

function FilterCard({ title, value, options, onSelect, isLocked, disabled, icon }: {
    title: string, value?: string, options: any[], onSelect: (id: string) => void, isLocked?: boolean, disabled?: boolean, icon?: React.ReactNode
}) {
    // Group options if they have a category property
    const groupedOptions = options.reduce((acc: Record<string, any[]>, opt) => {
        const category = opt.category || 'Outros';
        if (!acc[category]) acc[category] = [];
        acc[category].push(opt);
        return acc;
    }, {});

    const hasCategories = Object.keys(groupedOptions).length > 1 || (Object.keys(groupedOptions)[0] !== 'Outros');

    return (
        <div className={`group bg-card transition-all duration-300 rounded-[35px] p-8 border border-border/50 shadow-xl flex flex-col justify-between min-h-[220px] 
            ${disabled ? 'opacity-30 pointer-events-none grayscale' : 'hover:border-primary/40 hover:translate-y-[-4px]'}
            ${isLocked ? 'grayscale-[0.5] opacity-80' : ''}`}>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="p-3 bg-muted/50 rounded-2xl text-primary group-hover:bg-primary/10 transition-colors">
                        {icon || <Filter className="w-5 h-5" />}
                    </div>
                    {isLocked && <Lock className="w-4 h-4 text-orange-500/50" />}
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 leading-none">{title}</p>
                    <h4 className="text-lg font-black italic uppercase tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis">
                        {value || (isLocked ? 'Upgrade Plan' : 'Selecionar...')}
                    </h4>
                </div>
            </div>

            <div className="mt-8 relative">
                <select
                    disabled={disabled || isLocked}
                    className="w-full bg-muted/50 border border-white/5 rounded-2xl px-5 py-4 appearance-none font-black text-[10px] uppercase tracking-widest cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                    onChange={(e) => onSelect(e.target.value)}
                    value={options.find(o => o.id === (options.find(opt => opt.name === value)?.id || value))?.id || ""}
                >
                    <option value="">{isLocked ? 'DESBLOQUEAR' : 'MAIS OPÇÕES'}</option>
                    {!isLocked && (
                        hasCategories ? (
                            Object.entries(groupedOptions).map(([category, opts]) => (
                                <optgroup key={category} label={category.toUpperCase()}>
                                    {opts.map((opt) => (
                                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                                    ))}
                                </optgroup>
                            ))
                        ) : (
                            options.map((opt) => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))
                        )
                    )}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
            </div>
        </div>
    )
}
