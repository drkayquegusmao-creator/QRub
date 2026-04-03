"use client"

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useBlueprints } from '@/store/use-blueprints'
import { ArrowLeft, BookOpen, BrainCircuit, Calendar, CheckCircle2, FileText, Play, Target, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/dashboard-ui'

export default function EditalPage() {
    const params = useParams()
    const router = useRouter()
    const { blueprints, studyBoxes, loadBlueprints, loadStudyBoxes } = useBlueprints()
    const [filter, setFilter] = useState<'ALL' | 'CLINICA' | 'CIRURGIA' | 'PEDIATRIA' | 'GO' | 'PREVENTIVA'>('ALL')

    const editalId = typeof params.id === 'string' ? params.id : ''

    useEffect(() => {
        if (blueprints.length === 0) loadBlueprints()
        if (editalId) loadStudyBoxes(editalId)
    }, [editalId])

    const currentBlueprint = blueprints.find(b => b.id === editalId)

    const filteredBoxes = studyBoxes.filter(box => {
        if (filter === 'ALL') return true
        if (filter === 'CLINICA') return box.specialty_id === 'clinica-medica'
        // Add other filters as needed logic map
        return true
    })

    if (!currentBlueprint) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Carregando Edital...</p>
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-0 pb-32 space-y-8">
            {/* Header */}
            <div className="bg-white border-2 border-slate-100 rounded-[50px] p-8 md:p-12 soft-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <FileText className="w-64 h-64 text-primary" />
                </div>

                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold uppercase text-[10px] tracking-widest mb-8"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
                </button>

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Edital Ativo
                            </span>
                            <span className="flex items-center gap-1 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                                <Calendar className="w-3 h-3" /> {currentBlueprint.year}
                            </span>
                            {currentBlueprint.is_course && (
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Curso Completo
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            {currentBlueprint.name}
                        </h1>
                        <p className="text-slate-500 font-medium max-w-2xl">
                            {currentBlueprint.details?.description || `Estratégia personalizada baseada no edital ${currentBlueprint.institution}. Foque nos assuntos de maior incidência e resolva questões filtradas.`}
                        </p>

                        {currentBlueprint.details && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                {[
                                    { label: 'Prova', value: currentBlueprint.details.exam_date, icon: <Calendar className="w-4 h-4" /> },
                                    { label: 'Inscrições', value: `${currentBlueprint.details.registration_start?.split('/').slice(0, 2).join('/')} - ${currentBlueprint.details.registration_end?.split('/').slice(0, 2).join('/')}`, icon: <Target className="w-4 h-4" /> },
                                    { label: 'Bolsa/Salário', value: currentBlueprint.details.salary, icon: <Zap className="w-4 h-4" /> },
                                    { label: 'Vagas', value: currentBlueprint.details.vacancies, icon: <CheckCircle2 className="w-4 h-4" /> }
                                ].map((item, i) => item.value && (
                                    <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                            {item.icon} {item.label}
                                        </div>
                                        <div className="font-black text-xs text-[#1A1033] dark:text-white">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-3xl font-black text-primary">{studyBoxes.length}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tópicos</p>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-3xl font-black text-emerald-500">0%</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Concluído</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar / Filters */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border-2 border-slate-100 rounded-[40px] p-8 soft-shadow sticky top-8">
                        <SectionHeader title="Filtros" subtitle="Organize seu estudo" icon={<Target className="w-4 h-4" />} />

                        <div className="space-y-2 mt-6">
                            {[
                                { id: 'ALL', label: 'Todos os Tópicos' },
                                { id: 'CLINICA', label: 'Clínica Médica' },
                                { id: 'CIRURGIA', label: 'Cirurgia Geral' },
                                { id: 'PEDIATRIA', label: 'Pediatria' },
                                { id: 'GO', label: 'Ginecologia e Obs.' },
                                { id: 'PREVENTIVA', label: 'Preventiva' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setFilter(item.id as any)}
                                    className={`w-full text-left px-5 py-4 rounded-2xl font-bold uppercase text-xs tracking-wider transition-all flex items-center justify-between ${filter === item.id
                                        ? 'bg-[#1A1033] text-white shadow-lg'
                                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                        }`}
                                >
                                    {item.label}
                                    {filter === item.id && <CheckCircle2 className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content / Study Boxes */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <SectionHeader title="Caixinhas de Estudo" subtitle="Tópicos extraídos do edital" icon={<BrainCircuit className="w-4 h-4" />} />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {filteredBoxes.length > 0 ? filteredBoxes.map((box) => (
                            <motion.div
                                key={box.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group bg-white border-2 border-slate-100 hover:border-primary/30 rounded-[30px] p-6 transition-all hover:translate-x-1 cursor-pointer soft-shadow relative overflow-hidden"
                                onClick={() => router.push(`/dashboard/quiz/auto?mode=TREINO&studyBoxId=${box.id}&count=10`)}
                            >
                                <div className="absolute right-0 top-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                    <Zap className="w-24 h-24 rotate-12" />
                                </div>

                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg ${box.cognitive_level === 'Avançado' ? 'bg-rose-500' :
                                            box.cognitive_level === 'Intermediário' ? 'bg-amber-500' :
                                                'bg-emerald-500'
                                            }`}>
                                            {box.weight?.toFixed(0)}%
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black italic uppercase text-[#1A1033] dark:text-white leading-tight group-hover:text-primary transition-colors">
                                                {box.title}
                                            </h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                {box.specialty_id} • {box.subspecialty_id}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all">
                                        <Play className="w-4 h-4 fill-current" />
                                    </button>
                                </div>

                                {box.base_text && (
                                    <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <p className="text-xs text-slate-500 font-medium line-clamp-2">
                                            {box.base_text}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        )) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
                                <BookOpen className="w-16 h-16 text-slate-300" />
                                <p className="font-black uppercase text-slate-400 tracking-widest">Nenhum tópico encontrado</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
