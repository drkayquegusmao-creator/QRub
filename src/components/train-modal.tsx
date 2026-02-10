"use client"

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, BookOpen, Stethoscope, Microscope, Search, Check, Play, LayoutGrid, Settings2, Filter, AlertCircle, CheckSquare, Square } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTaxonomy } from '@/store/use-taxonomy'
import { COURSES, Course, Specialty, Subspecialty } from '@/lib/data-mock'

interface TrainModalProps {
    isOpen: boolean
    onClose: () => void
    initialMode?: Mode
    initialSpecialtyId?: string
}

type Mode = 'MENU' | 'COURSE' | 'SPECIALTY' | 'SUBSPECIALTY' | 'SUBJECT' | 'CONFIG' | 'CONFIG_ALL' | 'CONFIG_MULTI'

export function TrainModal({ isOpen, onClose, initialMode, initialSpecialtyId }: TrainModalProps) {
    const router = useRouter()

    // Internal State
    const [mode, setMode] = useState<Mode>('MENU')
    const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | null>(null)
    const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<string[]>([])
    const [selectedSubId, setSelectedSubId] = useState<string | null>(null)
    const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)
    const [questionCount, setQuestionCount] = useState(15)

    const [searchQuery, setSearchQuery] = useState('')

    const { taxonomy, loadTaxonomy } = useTaxonomy()

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            loadTaxonomy()
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

    const dynamicSpecialties = useMemo(() => {
        const course = taxonomy.find(t => t.active && (t.level === 'course' || t.slug === 'medicina'))
        return course?.children?.filter(s => s.active) || []
    }, [taxonomy])

    const selectedSpecialty = useMemo(() => {
        if (!selectedSpecialtyId || dynamicSpecialties.length === 0) return null
        return dynamicSpecialties.find(s => s.id === selectedSpecialtyId)
    }, [selectedSpecialtyId, dynamicSpecialties])

    const availableSubspecialties = useMemo(() => {
        return selectedSpecialty?.children || []
    }, [selectedSpecialty])

    const availableSubjects = useMemo(() => {
        let subjects: { id: string, name: string }[] = []
        if (selectedSubId) {
            subjects = availableSubspecialties.find(s => s.id === selectedSubId)?.children || []
        } else {
            subjects = availableSubspecialties.flatMap(s => s.children || [])
        }

        // Remove duplicates by name to prevent multiple "Geral" options
        const unique = new Map()
        subjects.forEach(s => {
            if (!unique.has(s.name)) {
                unique.set(s.name, s)
            }
        })
        return Array.from(unique.values())
    }, [selectedSubId, availableSubspecialties])

    // Hooks are safe here
    // filteredItems useMemo is below


    const handleStart = (params: string) => {
        router.push(`/dashboard/quiz/auto?mode=TREINO&${params}&count=${questionCount}`)
        onClose()
    }

    const handleConfigStart = () => {
        const parts = []

        // QRUB MASTER FIX: Prioritize SLUG over ID because questions use legacy slugs
        const spec = dynamicSpecialties.find(s => s.id === selectedSpecialtyId)
        const sub = availableSubspecialties.find(s => s.id === selectedSubId)
        const subj = availableSubjects.find(s => s.id === selectedSubjectId)

        // Use slug if available, otherwise fallback to ID (for new taxonomy items)
        const specVal = spec?.slug || selectedSpecialtyId
        const subVal = sub?.slug || selectedSubId
        const subjVal = subj?.slug || selectedSubjectId

        if (selectedSpecialtyId) parts.push(`specialtyId=${encodeURIComponent(specVal || '')}`)
        if (selectedSubId) parts.push(`subspecialtyId=${encodeURIComponent(subVal || '')}`)
        if (selectedSubjectId) parts.push(`subjectId=${encodeURIComponent(subjVal || '')}`)

        handleStart(parts.join('&'))
    }

    // LIST RENDERER (For standard menu selections)
    const filteredItems = useMemo(() => {
        const query = searchQuery.toLowerCase()
        if (dynamicSpecialties.length === 0) return []

        if (mode === 'SPECIALTY') return dynamicSpecialties.filter(s => s.name.toLowerCase().includes(query))
        if (mode === 'SUBSPECIALTY') return dynamicSpecialties.flatMap(s => (s.children || [])).filter(sub => sub.name.toLowerCase().includes(query))
        if (mode === 'SUBJECT') {
            const allSubjects: any[] = []
            for (const spec of dynamicSpecialties) {
                for (const sub of (spec.children || [])) {
                    for (const subject of (sub.children || [])) {
                        if (subject.name.toLowerCase().includes(query)) {
                            allSubjects.push({
                                ...subject,
                                context: `${spec.name} > ${sub.name}`,
                                fullData: { spec, sub, subject }
                            })
                        }
                    }
                }
            }
            return allSubjects
        }
        return []
    }, [mode, searchQuery, dynamicSpecialties])

    const renderMenu = () => {
        const specialties = dynamicSpecialties
        const query = searchQuery.toLowerCase()

        const filteredSpecialties = specialties.filter(spec =>
            spec.name.toLowerCase().includes(query) ||
            (spec.metadata?.category && String(spec.metadata.category).toLowerCase().includes(query))
        )

        const toggleSpecialty = (specId: string) => {
            setSelectedSpecialtyIds(prev =>
                prev.includes(specId)
                    ? prev.filter(id => id !== specId)
                    : [...prev, specId]
            )
        }

        if (specialties.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-[300px] text-slate-400">
                    <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                    <p className="font-bold">Nenhuma especialidade encontrada.</p>
                </div>
            )
        }

        const isSelectingMultiple = selectedSpecialtyIds.length > 0

        return (
            <div className="flex flex-col gap-6 h-full">
                {/* Search Bar */}
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Qual especialidade deseja treinar?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 rounded-[25px] border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/20 focus:shadow-xl focus:shadow-primary/5 focus:outline-none transition-all font-bold text-sm text-[#1A1033] placeholder:text-slate-400 placeholder:font-bold"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredSpecialties.length > 0 ? (
                        filteredSpecialties.map((spec) => {
                            const isSelected = selectedSpecialtyIds.includes(spec.id)
                            return (
                                <button
                                    key={spec.id}
                                    onClick={() => toggleSpecialty(spec.id)}
                                    className={`group w-full text-left p-5 rounded-[25px] border transition-all flex items-center justify-between ${isSelected
                                        ? 'bg-emerald-50 border-emerald-400 shadow-lg shadow-emerald-500/5'
                                        : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected
                                            ? 'bg-emerald-500 border-emerald-500'
                                            : 'border-slate-200'
                                            }`}>
                                            {isSelected && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className={`font-black italic uppercase text-xs tracking-tight transition-colors ${isSelected ? 'text-emerald-700' : 'text-[#1A1033] group-hover:text-primary'}`}>{spec.name}</h4>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{spec.metadata?.category || 'Especialidades Básicas'}</p>
                                        </div>
                                    </div>
                                    {!isSelected && (
                                        <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm">
                                            <Play className="w-3 h-3 fill-current ml-0.5" />
                                        </div>
                                    )}
                                </button>
                            )
                        })
                    ) : (
                        <div className="md:col-span-2 flex flex-col items-center justify-center py-10 text-slate-400">
                            <Search className="w-8 h-8 mb-2 opacity-20" />
                            <p className="text-xs font-bold uppercase tracking-widest">Nenhuma especialidade encontrada para "{searchQuery}"</p>
                        </div>
                    )}
                </div>

                {/* Confirm / Actions */}
                <div className="flex flex-col gap-3 pt-2">
                    {isSelectingMultiple ? (
                        <button
                            onClick={() => {
                                if (selectedSpecialtyIds.length === 1) {
                                    setSelectedSpecialtyId(selectedSpecialtyIds[0])
                                    setMode('CONFIG')
                                } else {
                                    setMode('CONFIG_MULTI')
                                }
                            }}
                            className="w-full p-5 rounded-[25px] bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 font-black uppercase text-sm tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-[1.02] active:scale-95"
                        >
                            <Settings2 className="w-5 h-5" />
                            Configurar Treino ({selectedSpecialtyIds.length} área{selectedSpecialtyIds.length > 1 ? 's' : ''})
                        </button>
                    ) : (
                        <button
                            onClick={() => setMode('CONFIG_ALL')}
                            className="w-full p-5 rounded-[25px] border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-purple-500/5 hover:from-primary/10 hover:to-purple-500/10 hover:border-primary/40 text-primary transition-all flex items-center justify-center gap-3 font-black uppercase text-sm tracking-widest shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                        >
                            <LayoutGrid className="w-5 h-5" />
                            Treinar Tudo (Aleatório)
                        </button>
                    )}
                </div>
            </div>
        )
    }

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
                            if (mode === 'SPECIALTY') { setSelectedSpecialtyId(item.id); setMode('CONFIG'); }
                            if (mode === 'SUBSPECIALTY') handleStart(`subspecialtyId=${encodeURIComponent(item.id)}`)
                            if (mode === 'SUBJECT') handleStart(`specialtyId=${encodeURIComponent(item.fullData.spec.id)}&subspecialtyId=${encodeURIComponent(item.fullData.sub.id)}&subjectId=${encodeURIComponent(item.id)}`)
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


    const renderConfigAll = () => (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
            {/* Context Header */}
            <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-black italic uppercase text-lg text-[#1A1033]">Treino Aleatório</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Banco Geral de Questões</p>
                </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-2">
                <p className="font-bold text-[#1A1033]">Você está prestes a iniciar um treino com questões de todas as áreas.</p>
                <p className="text-xs text-slate-500">Ideal para testar seus conhecimentos gerais e simular a aleatoriedade da prova real.</p>
            </div>

            {/* Quantity Slider */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-widest text-[#1A1033]">Quantidade de Questões</label>
                    <span className="text-2xl font-black italic text-primary">{questionCount}</span>
                </div>
                <div className="relative h-2 bg-slate-100 rounded-full">
                    <div className="absolute h-full bg-primary rounded-full" style={{ width: `${((questionCount - 1) / 99) * 100}%` }} />
                    <input
                        type="range" min="1" max="100" step="1"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div
                        className="absolute w-6 h-6 bg-white border-2 border-primary rounded-full shadow-lg flex items-center justify-center top-1/2 -translate-y-1/2 pointer-events-none transition-all"
                        style={{ left: `calc(${((questionCount - 1) / 99) * 100}% - 12px)` }}
                    >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-300 tracking-widest">
                    <span>1</span>
                    <span>100</span>
                </div>
            </div>

            {/* Start Button */}
            <button
                onClick={() => handleStart('scope=ALL')}
                className="w-full bg-[#1A1033] text-white py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative z-10">Iniciar Modo Aleatório</span>
                <Play className="w-5 h-5 fill-current relative z-10" />
            </button>
        </div>
    )

    const renderConfigMulti = () => {
        const specialties = dynamicSpecialties
        const query = searchQuery.toLowerCase()

        const filteredSpecialties = specialties.filter(spec =>
            spec.name.toLowerCase().includes(query) ||
            (spec.metadata?.category && String(spec.metadata.category).toLowerCase().includes(query))
        )

        const toggleSpecialty = (specId: string) => {
            setSelectedSpecialtyIds(prev =>
                prev.includes(specId)
                    ? prev.filter(id => id !== specId)
                    : [...prev, specId]
            )
        }

        const toggleAll = () => {
            if (selectedSpecialtyIds.length === specialties.length) {
                setSelectedSpecialtyIds([])
            } else {
                setSelectedSpecialtyIds(specialties.map(s => s.id))
            }
        }

        const handleMultiStart = () => {
            if (selectedSpecialtyIds.length === 0) {
                alert('Selecione ao menos uma especialidade!')
                return
            }
            const params = selectedSpecialtyIds.map(id => `specialtyId=${encodeURIComponent(id)}`).join('&')
            handleStart(`${params}&multi=true`)
        }

        return (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                {/* Context Header */}
                <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                    <div className="w-12 h-12 rounded-xl bg-emerald-200 text-emerald-700 flex items-center justify-center">
                        <CheckSquare className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-black italic uppercase text-lg text-[#1A1033]">Treino Combinado</h3>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                            {selectedSpecialtyIds.length} área{selectedSpecialtyIds.length !== 1 ? 's' : ''} selecionada{selectedSpecialtyIds.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <button
                        onClick={toggleAll}
                        className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                        {selectedSpecialtyIds.length === specialties.length ? 'Deselecionar Tudo' : 'Selecionar Todas'}
                    </button>
                </div>

                {/* Sub-Search Bar */}
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Filtrar especialidades..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-emerald-200 focus:outline-none transition-all font-bold text-xs text-[#1A1033] placeholder:text-slate-300"
                    />
                </div>

                {/* Specialty Selection Grid */}
                <div className="max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {filteredSpecialties.map((spec) => {
                            const isSelected = selectedSpecialtyIds.includes(spec.id)

                            return (
                                <button
                                    key={spec.id}
                                    onClick={() => toggleSpecialty(spec.id)}
                                    className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${isSelected
                                        ? 'bg-emerald-50 border-emerald-400 shadow-md scale-[1.02]'
                                        : 'bg-white border-slate-100 hover:border-emerald-200'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected
                                        ? 'bg-emerald-500 border-emerald-500'
                                        : 'border-slate-300'
                                        }`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h4 className={`font-black uppercase text-[10px] tracking-tight ${isSelected ? 'text-emerald-700' : 'text-[#1A1033]'
                                            }`}>
                                            {spec.name}
                                        </h4>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Quantity Slider */}
                <div className="space-y-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-black uppercase tracking-widest text-[#1A1033]">Quantidade de Questões</label>
                        <span className="text-2xl font-black italic text-emerald-600">{questionCount}</span>
                    </div>
                    <div className="relative h-2 bg-slate-100 rounded-full">
                        <div className="absolute h-full bg-emerald-500 rounded-full" style={{ width: `${((questionCount - 5) / 95) * 100}%` }} />
                        <input
                            type="range" min="5" max="100" step="5"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(Number(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div
                            className="absolute w-6 h-6 bg-white border-2 border-emerald-500 rounded-full shadow-lg flex items-center justify-center top-1/2 -translate-y-1/2 pointer-events-none transition-all"
                            style={{ left: `calc(${((questionCount - 5) / 95) * 100}% - 12px)` }}
                        >
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        </div>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-300 tracking-widest">
                        <span>5</span>
                        <span>100</span>
                    </div>
                </div>

                {/* Start Button */}
                <button
                    onClick={handleMultiStart}
                    disabled={selectedSpecialtyIds.length === 0}
                    className="w-full bg-[#1A1033] text-white py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    <span className="relative z-10">Iniciar Treino Especial</span>
                    <Play className="w-5 h-5 fill-current relative z-10" />
                </button>
            </div>
        )
    }


    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-100">
                        <div>
                            {mode !== 'MENU' && !initialSpecialtyId && (
                                <button onClick={() => { setMode('MENU'); setSearchQuery('') }} className="text-xs font-bold text-slate-400 hover:text-primary mb-1 flex items-center gap-1">
                                    <ChevronRight className="w-3 h-3 rotate-180" /> Voltar
                                </button>
                            )}
                            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-[#1A1033]">
                                {mode === 'MENU' ? 'Treinar por Área' :
                                    mode === 'CONFIG' ? 'Configurar Treino' :
                                        mode === 'CONFIG_ALL' ? 'Modo Aleatório' :
                                            mode === 'CONFIG_MULTI' ? 'Seleção Múltipla' : 'Personalizar Treino'}
                            </h2>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400"><X className="w-6 h-6" /></button>
                    </div>
                    <div className="p-8 pt-6 overflow-y-auto flex-1">
                        {mode === 'MENU' ? renderMenu() :
                            mode === 'CONFIG' ? renderConfig() :
                                mode === 'CONFIG_ALL' ? renderConfigAll() :
                                    mode === 'CONFIG_MULTI' ? renderConfigMulti() :
                                        renderList()}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
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
