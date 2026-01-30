"use client"

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, BookOpen, Stethoscope, Microscope, Search, Check, Play, LayoutGrid, Settings2, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { COURSES, Course, Specialty, Subspecialty } from '@/lib/data-mock'

interface TrainModalProps {
    isOpen: boolean
    onClose: () => void
    initialMode?: Mode
    initialSpecialtyId?: string
}

type Mode = 'MENU' | 'COURSE' | 'SPECIALTY' | 'SUBSPECIALTY' | 'SUBJECT' | 'CONFIG'

export function TrainModal({ isOpen, onClose, initialMode, initialSpecialtyId }: TrainModalProps) {
    const router = useRouter()

    // Internal State
    const [mode, setMode] = useState<Mode>('MENU')
    const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | null>(null)
    const [selectedSubId, setSelectedSubId] = useState<string | null>(null)
    const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)
    const [questionCount, setQuestionCount] = useState(15)

    const [searchQuery, setSearchQuery] = useState('')

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            if (initialSpecialtyId) {
                setMode('CONFIG')
                setSelectedSpecialtyId(initialSpecialtyId)
                setSelectedSubId(null)
                setSelectedSubjectId(null)
                setQuestionCount(15)
            } else {
                setMode(initialMode || 'MENU')
                setSelectedSpecialtyId(null)
            }
        }
    }, [isOpen, initialMode, initialSpecialtyId])

    const selectedSpecialty = useMemo(() => {
        if (!selectedSpecialtyId) return null
        return COURSES[0].specialties.find(s => s.id === selectedSpecialtyId)
    }, [selectedSpecialtyId])

    const availableSubspecialties = useMemo(() => {
        return selectedSpecialty?.subspecialties || []
    }, [selectedSpecialty])

    const availableSubjects = useMemo(() => {
        if (selectedSubId) {
            return availableSubspecialties.find(s => s.id === selectedSubId)?.subjects || []
        }
        return availableSubspecialties.flatMap(s => s.subjects)
    }, [selectedSubId, availableSubspecialties])

    if (!isOpen) return null

    const handleStart = (params: string) => {
        router.push(`/dashboard/quiz/auto?mode=TREINO&${params}&count=${questionCount}`)
        onClose()
    }

    const handleConfigStart = () => {
        const parts = []
        if (selectedSpecialtyId) parts.push(`specialtyId=${encodeURIComponent(selectedSpecialtyId)}`)
        if (selectedSubId) parts.push(`subspecialtyId=${encodeURIComponent(selectedSubId)}`)
        if (selectedSubjectId) parts.push(`subjectId=${encodeURIComponent(selectedSubjectId)}`)
        handleStart(parts.join('&'))
    }

    // LIST RENDERER (For standard menu selections)
    const filteredItems = useMemo(() => {
        const query = searchQuery.toLowerCase()
        if (mode === 'COURSE') return COURSES.filter(c => c.name.toLowerCase().includes(query))
        if (mode === 'SPECIALTY') return COURSES.flatMap(c => c.specialties).filter(s => s.name.toLowerCase().includes(query))
        if (mode === 'SUBSPECIALTY') return COURSES.flatMap(c => c.specialties.flatMap(s => s.subspecialties)).filter(sub => sub.name.toLowerCase().includes(query))
        if (mode === 'SUBJECT') {
            const allSubjects = []
            for (const course of COURSES) {
                for (const spec of course.specialties) {
                    for (const sub of spec.subspecialties) {
                        for (const subject of sub.subjects) {
                            if (subject.name.toLowerCase().includes(query)) {
                                allSubjects.push({
                                    ...subject,
                                    context: `${spec.name} > ${sub.name}`,
                                    fullData: { course, spec, sub, subject }
                                })
                            }
                        }
                    }
                }
            }
            return allSubjects
        }
        return []
    }, [mode, searchQuery])

    const renderMenu = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <MenuOption icon={<BookOpen className="w-6 h-6" />} title="Por Curso" description="Treine todo o conteúdo de um curso" onClick={() => setMode('COURSE')} color="text-blue-500" bg="bg-blue-500/10" />
            <MenuOption icon={<Stethoscope className="w-6 h-6" />} title="Por Especialidade" description="Foque em uma especialidade médica" onClick={() => setMode('SPECIALTY')} color="text-emerald-500" bg="bg-emerald-500/10" />
            <MenuOption icon={<Microscope className="w-6 h-6" />} title="Por Sub-Especialidade" description="Aprofunde-se em uma área específica" onClick={() => setMode('SUBSPECIALTY')} color="text-purple-500" bg="bg-purple-500/10" />
            <MenuOption icon={<Search className="w-6 h-6" />} title="Por Assunto" description="Busque e treine tópicos pontuais" onClick={() => setMode('SUBJECT')} color="text-orange-500" bg="bg-orange-500/10" />
            <div className="md:col-span-2">
                <MenuOption icon={<LayoutGrid className="w-6 h-6" />} title="Treinar Tudo" description="Questões aleatórias de todo o banco" onClick={() => handleStart('scope=ALL')} color="text-primary" bg="bg-primary/10" highlight />
            </div>
        </div>
    )

    const renderList = () => (
        <div className="flex flex-col h-[500px]">
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text" placeholder="Buscar..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus
                />
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                {filteredItems.map((item: any, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            if (mode === 'COURSE') handleStart(`courseId=${encodeURIComponent(item.id)}`)
                            if (mode === 'SPECIALTY') { setSelectedSpecialtyId(item.id); setMode('CONFIG'); }
                            if (mode === 'SUBSPECIALTY') handleStart(`subspecialtyId=${encodeURIComponent(item.id)}`)
                            if (mode === 'SUBJECT') handleStart(`courseId=${encodeURIComponent(item.fullData.course.id)}&specialtyId=${encodeURIComponent(item.fullData.spec.id)}&subspecialtyId=${encodeURIComponent(item.fullData.sub.id)}&subjectId=${encodeURIComponent(item.id)}`)
                        }}
                        className="w-full text-left p-4 rounded-xl border border-slate-100 bg-white hover:border-primary/30 hover:bg-slate-50 transition-all flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${mode === 'COURSE' ? 'bg-blue-100 text-blue-600' : mode === 'SPECIALTY' ? 'bg-emerald-100 text-emerald-600' : mode === 'SUBSPECIALTY' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                                {mode === 'COURSE' && <BookOpen className="w-4 h-4" />}
                                {mode === 'SPECIALTY' && <Stethoscope className="w-4 h-4" />}
                                {mode === 'SUBSPECIALTY' && <Microscope className="w-4 h-4" />}
                                {mode === 'SUBJECT' && <Search className="w-4 h-4" />}
                            </div>
                            <div>
                                <p className="font-bold text-slate-700">{item.name}</p>
                                {item.context && <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.context}</p>}
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                    </button>
                ))}
            </div>
        </div>
    )

    const renderConfig = () => (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Context Header */}
            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                    <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-black italic uppercase text-lg text-[#1A1033]">{selectedSpecialty?.name}</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Configuração de Treino</p>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[#1A1033] flex items-center gap-2">
                        <Filter className="w-3 h-3" /> Sub-Especialidade (Opcional)
                    </label>
                    <select
                        className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700"
                        value={selectedSubId || ''}
                        onChange={(e) => { setSelectedSubId(e.target.value || null); setSelectedSubjectId(null) }}
                    >
                        <option value="">Todas</option>
                        {availableSubspecialties.map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[#1A1033] flex items-center gap-2">
                        <Search className="w-3 h-3" /> Assunto (Opcional)
                    </label>
                    <select
                        className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700"
                        value={selectedSubjectId || ''}
                        onChange={(e) => setSelectedSubjectId(e.target.value || null)}
                    >
                        <option value="">Todos</option>
                        {availableSubjects.map(subj => (
                            <option key={subj.id} value={subj.id}>{subj.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Quantity Slider */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-widest text-[#1A1033]">Quantidade de Questões</label>
                    <span className="text-2xl font-black italic text-primary">{questionCount}</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full">
                    <div className="absolute h-full bg-primary rounded-full" style={{ width: `${((questionCount - 5) / 95) * 100}%` }} />
                    <input
                        type="range" min="5" max="100" step="5"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                        className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-lg flex items-center justify-center top-1/2 -translate-y-1/2 pointer-events-none transition-all"
                        style={{ left: `calc(${((questionCount - 5) / 95) * 100}% - 12px)` }}
                    >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-300 tracking-widest">
                    <span>5</span>
                    <span>100</span>
                </div>
            </div>

            {/* Start Button */}
            <button
                onClick={handleConfigStart}
                className="w-full bg-[#1A1033] text-white py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10">Iniciar Questões</span>
                <Play className="w-5 h-5 fill-current relative z-10" />
            </button>
        </div>
    )

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-100">
                    <div>
                        {mode !== 'MENU' && !initialSpecialtyId && (
                            <button onClick={() => { setMode('MENU'); setSearchQuery('') }} className="text-xs font-bold text-slate-400 hover:text-primary mb-1 flex items-center gap-1">
                                <ChevronRight className="w-3 h-3 rotate-180" /> Voltar
                            </button>
                        )}
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase text-[#1A1033]">
                            {mode === 'CONFIG' ? 'Configurar Treino' : 'Personalizar Treino'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400"><X className="w-6 h-6" /></button>
                </div>
                <div className="p-8 pt-6 overflow-hidden">
                    {mode === 'MENU' ? renderMenu() : mode === 'CONFIG' ? renderConfig() : renderList()}
                </div>
            </motion.div>
        </div>
    )
}

function MenuOption({ icon, title, description, onClick, color, bg, highlight }: any) {
    return (
        <button onClick={onClick} className={`w-full text-left p-6 rounded-[25px] border-2 transition-all group flex items-start gap-5 ${highlight ? 'border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary' : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'}`}>
            <div className={`p-4 rounded-2xl ${bg} ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
            <div>
                <h3 className={`font-black italic uppercase tracking-tight text-lg ${highlight ? 'text-primary' : 'text-[#1A1033]'}`}>{title}</h3>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">{description}</p>
            </div>
        </button>
    )
}
