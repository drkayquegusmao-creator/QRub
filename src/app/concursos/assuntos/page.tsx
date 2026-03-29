"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Hash, 
    Search, 
    ChevronRight, 
    Target, 
    TrendingUp, 
    Sparkles, 
    BookMarked,
    Filter,
    Layers,
    ArrowRight,
    Zap,
    LayoutGrid,
    BarChart3
} from 'lucide-react'
import { useConcursoTaxonomy } from '@/store/concursos/use-taxonomy'
import { useAuth } from '@/store/use-auth'
import { getAssuntosPerformance, UserPerformanceStats } from '@/lib/concursos/performance-service'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function AssuntosPage() {
    const router = useRouter()
    const { user } = useAuth()
    const { taxonomy, loadTaxonomy, getAreas } = useConcursoTaxonomy()
    
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedAreaId, setSelectedAreaId] = useState<string>('')
    const [selectedDisciplinaId, setSelectedDisciplinaId] = useState<string>('')
    const [stats, setStats] = useState<Record<string, UserPerformanceStats>>({})
    const [loadingStats, setLoadingStats] = useState(true)

    useEffect(() => {
        loadTaxonomy()
    }, [])

    useEffect(() => {
        async function fetchStats() {
            if (!user?.id) return
            setLoadingStats(true)
            try {
                const data = await getAssuntosPerformance(user.id)
                setStats(data)
            } finally {
                setLoadingStats(false)
            }
        }
        fetchStats()
    }, [user?.id])

    const areas = useMemo(() => getAreas(), [taxonomy])
    const disciplinas = useMemo(() => {
        if (!selectedAreaId) return []
        const area = areas.find(a => a.id === selectedAreaId)
        return area?.children || []
    }, [selectedAreaId, areas])

    const filteredAssuntos = useMemo(() => {
        let subjects: any[] = []
        
        // Flatten the taxonomy to get subjects if filtering by area/disciplina
        if (selectedDisciplinaId) {
            const disc = disciplinas.find(d => d.id === selectedDisciplinaId)
            const subs = disc?.children || []
            subjects = subs.flatMap(s => s.children || [])
        } else if (selectedAreaId) {
            const area = areas.find(a => a.id === selectedAreaId)
            const discs = area?.children || []
            const subs = discs.flatMap(d => d.children || [])
            subjects = subs.flatMap(s => s.children || [])
        } else {
            // General view: just take everything for the first few environments
            const envs = taxonomy
            const ar = envs.flatMap(e => e.children || [])
            const di = ar.flatMap(a => a.children || [])
            const su = di.flatMap(d => d.children || [])
            subjects = su.flatMap(s => s.children || [])
        }

        if (searchTerm) {
            subjects = subjects.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        return subjects.slice(0, 40) // Limit for performance if too many
    }, [taxonomy, selectedAreaId, selectedDisciplinaId, searchTerm, areas, disciplinas])

    return (
        <div className="space-y-8 pb-24">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-200 dark:border-indigo-500/20">
                        <Hash className="w-3 h-3" /> Nivelamento por Tópico
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Tópicos & <span className="text-indigo-600 dark:text-indigo-400">Assuntos</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                            <Target className="w-3 h-3 text-indigo-500" /> Detalhamento Granular • {filteredAssuntos.length} Tópicos Disponíveis
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                   <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Buscar assunto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-xs font-bold text-[#1A1033] dark:text-white placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all w-full md:w-64"
                        />
                   </div>
                </div>
            </header>

            {/* Filters Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Área do Concurso</label>
                    <select 
                        value={selectedAreaId}
                        onChange={(e) => {
                            setSelectedAreaId(e.target.value)
                            setSelectedDisciplinaId('')
                        }}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[24px] p-5 text-sm font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                    >
                        <option value="">Selecionar Área Para Filtrar...</option>
                        {areas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Disciplina</label>
                    <select 
                        disabled={!selectedAreaId}
                        value={selectedDisciplinaId}
                        onChange={(e) => setSelectedDisciplinaId(e.target.value)}
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[24px] p-5 text-sm font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer disabled:opacity-30"
                    >
                        <option value="">Filtrar Assuntos por Disciplina...</option>
                        {disciplinas.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Subjects Table/List */}
            <ConcursoCard className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5">
                                <th className="text-left py-6 px-10 text-[9px] font-black uppercase tracking-widest text-slate-400">Assunto / Tópico</th>
                                <th className="text-center py-6 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400">Desempenho</th>
                                <th className="text-center py-6 px-6 text-[9px] font-black uppercase tracking-widest text-slate-400">Vistos</th>
                                <th className="text-right py-6 px-10 text-[9px] font-black uppercase tracking-widest text-slate-400">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {filteredAssuntos.map((assunto, idx) => (
                                <SubjectRow 
                                    key={assunto.id} 
                                    subject={assunto} 
                                    stats={stats[assunto.id]}
                                    loading={loadingStats}
                                    onClick={() => router.push(`/concursos/setup?assuntoId=${assunto.id}`)} 
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredAssuntos.length === 0 && (
                    <div className="py-24 text-center space-y-4">
                        <Layers className="w-12 h-12 text-slate-200 mx-auto" />
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Selecione filtros para exibir tópicos</p>
                    </div>
                )}
            </ConcursoCard>
        </div>
    )
}

function SubjectRow({ subject, stats, loading, onClick }: { 
    subject: any, 
    stats?: UserPerformanceStats,
    loading: boolean,
    onClick: () => void 
}) {
    const accuracy = stats?.precisao_media || 0
    const count = stats?.total_vistas || 0

    return (
        <tr className={cn("group hover:bg-slate-50 dark:hover:bg-white/5 transition-all", loading && "opacity-40 animate-pulse")}>
            <td className="py-8 px-10">
                <div className="space-y-1">
                    <p className="text-sm font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white group-hover:text-indigo-600 transition-colors">
                        {subject.name}
                    </p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 leading-none">
                        Ref: {subject.id.slice(0, 8)} • Nível Granular
                    </p>
                </div>
            </td>
            <td className="py-8 px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200/50 dark:border-white/5">
                    <BarChart3 className={cn(
                        "w-3 h-3",
                        accuracy > 70 ? "text-emerald-500" : accuracy > 50 ? "text-amber-500" : "text-rose-500"
                    )} />
                    <span className="text-xs font-black italic tracking-tighter text-[#1A1033] dark:text-white">{accuracy}%</span>
                </div>
            </td>
            <td className="py-8 px-6 text-center">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-black italic tracking-tighter text-[#1A1033] dark:text-white leading-none">{count}</span>
                    <span className="text-[7px] font-black uppercase tracking-widest text-slate-400">Questões</span>
                </div>
            </td>
            <td className="py-8 px-10 text-right">
                <button 
                    onClick={onClick}
                    className="p-3 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl text-slate-400 hover:bg-[#1A1033] dark:hover:bg-white hover:text-white dark:hover:text-[#1A1033] hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                    <Zap className="w-4 h-4 fill-current" />
                </button>
            </td>
        </tr>
    )
}
