"use client"

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, BookOpen, Stethoscope, Microscope, Search, Check, Play, LayoutGrid } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { COURSES, Course, Specialty, Subspecialty } from '@/lib/data-mock'

interface TrainModalProps {
    isOpen: boolean
    onClose: () => void
}

type Mode = 'MENU' | 'COURSE' | 'SPECIALTY' | 'SUBSPECIALTY' | 'SUBJECT'

export function TrainModal({ isOpen, onClose }: TrainModalProps) {
    const router = useRouter()
    const [mode, setMode] = useState<Mode>('MENU')
    const [searchQuery, setSearchQuery] = useState('')

    // Reset state when opening
    if (!isOpen && mode !== 'MENU') {
        setTimeout(() => setMode('MENU'), 200)
    }

    if (!isOpen) return null

    const handleStart = (params: string) => {
        router.push(`/dashboard/quiz/auto?mode=TREINO&${params}&count=15`)
        onClose()
    }

    const filteredItems = useMemo(() => {
        const query = searchQuery.toLowerCase()
        if (mode === 'COURSE') {
            return COURSES.filter(c => c.name.toLowerCase().includes(query))
        }
        if (mode === 'SPECIALTY') {
            return COURSES.flatMap(c => c.specialties).filter(s => s.name.toLowerCase().includes(query))
        }
        if (mode === 'SUBSPECIALTY') {
            return COURSES.flatMap(c => c.specialties.flatMap(s => s.subspecialties)).filter(sub => sub.name.toLowerCase().includes(query))
        }
        if (mode === 'SUBJECT') {
            // Subjects are nested deep, let's just show matching subjects with their context
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
            <MenuOption
                icon={<BookOpen className="w-6 h-6" />}
                title="Por Curso"
                description="Treine todo o conteúdo de um curso específico"
                onClick={() => setMode('COURSE')}
                color="text-blue-500"
                bg="bg-blue-500/10"
            />
            <MenuOption
                icon={<Stethoscope className="w-6 h-6" />}
                title="Por Especialidade"
                description="Foque em uma especialidade médica"
                onClick={() => setMode('SPECIALTY')}
                color="text-emerald-500"
                bg="bg-emerald-500/10"
            />
            <MenuOption
                icon={<Microscope className="w-6 h-6" />}
                title="Por Sub-Especialidade"
                description="Aprofunde-se em uma área específica"
                onClick={() => setMode('SUBSPECIALTY')}
                color="text-purple-500"
                bg="bg-purple-500/10"
            />
            <MenuOption
                icon={<Search className="w-6 h-6" />}
                title="Por Assunto"
                description="Busque e treine tópicos pontuais"
                onClick={() => setMode('SUBJECT')}
                color="text-orange-500"
                bg="bg-orange-500/10"
            />
            <div className="md:col-span-2">
                <MenuOption
                    icon={<LayoutGrid className="w-6 h-6" />}
                    title="Treinar Tudo"
                    description="Questões aleatórias de todo o banco"
                    onClick={() => handleStart('scope=ALL')}
                    color="text-primary"
                    bg="bg-primary/10"
                    highlight
                />
            </div>
        </div>
    )

    const renderList = () => (
        <div className="flex flex-col h-[500px]">
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                {filteredItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50">
                        <Search className="w-12 h-12 mb-2" />
                        <p>Nenhum resultado encontrado</p>
                    </div>
                ) : (
                    filteredItems.map((item: any, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                if (mode === 'COURSE') handleStart(`courseId=${encodeURIComponent(item.id)}`)
                                if (mode === 'SPECIALTY') handleStart(`specialtyId=${encodeURIComponent(item.id)}`)
                                if (mode === 'SUBSPECIALTY') handleStart(`subspecialtyId=${encodeURIComponent(item.id)}`)
                                if (mode === 'SUBJECT') handleStart(`subjectId=${encodeURIComponent(item.id)}&subspecialtyId=${encodeURIComponent(item.fullData.sub.id)}`)
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
                                    {item.category && <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.category}</p>}
                                </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                        </button>
                    ))
                )}
            </div>
        </div>
    )

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-100">
                    <div>
                        {mode !== 'MENU' && (
                            <button
                                onClick={() => {
                                    setMode('MENU')
                                    setSearchQuery('')
                                }}
                                className="text-xs font-bold text-slate-400 hover:text-primary mb-1 flex items-center gap-1"
                            >
                                <ChevronRight className="w-3 h-3 rotate-180" /> Voltar
                            </button>
                        )}
                        <h2 className="text-2xl font-black italic tracking-tighter uppercase text-[#1A1033]">
                            {mode === 'MENU' ? 'Personalizar Treino' :
                                mode === 'COURSE' ? 'Selecione o Curso' :
                                    mode === 'SPECIALTY' ? 'Selecione a Especialidade' :
                                        mode === 'SUBSPECIALTY' ? 'Selecione a Sub-especialidade' :
                                            'Selecione o Assunto'}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 pt-6 overflow-hidden">
                    {mode === 'MENU' ? renderMenu() : renderList()}
                </div>
            </motion.div>
        </div>
    )
}

function MenuOption({ icon, title, description, onClick, color, bg, highlight }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-6 rounded-[25px] border-2 transition-all group flex items-start gap-5 
                ${highlight
                    ? 'border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary hover:scale-[1.01]'
                    : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50 hover:translate-x-1'
                }`}
        >
            <div className={`p-4 rounded-2xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div>
                <h3 className={`font-black italic uppercase tracking-tight text-lg ${highlight ? 'text-primary' : 'text-[#1A1033]'}`}>
                    {title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                    {description}
                </p>
            </div>
        </button>
    )
}
