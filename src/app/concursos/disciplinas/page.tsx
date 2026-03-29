"use client"

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    Library, 
    Search, 
    ChevronRight, 
    Target, 
    TrendingUp, 
    Sparkles, 
    BookOpen,
    Filter,
    Layers,
    ArrowRight,
    Zap
} from 'lucide-react'
import { useConcursoTaxonomy } from '@/store/concursos/use-taxonomy'
import { useAuth } from '@/store/use-auth'
import { getDisciplinasPerformance, UserPerformanceStats } from '@/lib/concursos/performance-service'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function DisciplinasPage() {
    const router = useRouter()
    const { user } = useAuth()
    const { taxonomy, loadTaxonomy, getAreas } = useConcursoTaxonomy()
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedAreaId, setSelectedAreaId] = useState<string | 'all'>('all')
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
                const data = await getDisciplinasPerformance(user.id)
                setStats(data)
            } finally {
                setLoadingStats(false)
            }
        }
        fetchStats()
    }, [user?.id])

    const areas = useMemo(() => getAreas(), [taxonomy])

    const filteredTaxonomy = useMemo(() => {
        let result = areas
        if (selectedAreaId !== 'all') {
            result = result.filter(a => a.id === selectedAreaId)
        }
        
        return result.map(area => ({
            ...area,
            children: area.children?.filter(disc => 
                disc.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(area => (area.children?.length || 0) > 0)
    }, [areas, selectedAreaId, searchTerm])

    return (
        <div className="space-y-8 pb-24">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-indigo-200 dark:border-indigo-500/20">
                        <Library className="w-3 h-3" /> Catálogo de Conhecimento
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Minhas <span className="text-indigo-600 dark:text-indigo-400">Disciplinas</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                            <Target className="w-3 h-3 text-indigo-500" /> {areas.length} Áreas Mapeadas • Estrutura Didática
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                   <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Buscar disciplina..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-3.5 text-xs font-bold text-[#1A1033] dark:text-white placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all w-full md:w-64"
                        />
                   </div>
                   <select 
                        value={selectedAreaId}
                        onChange={(e) => setSelectedAreaId(e.target.value)}
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-3.5 text-xs font-black uppercase tracking-widest text-[#1A1033] dark:text-white outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none min-w-[180px]"
                   >
                        <option value="all">Todas as Áreas</option>
                        {areas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                   </select>
                </div>
            </header>

            {/* Areas & Disciplinas Grid */}
            <div className="space-y-12">
                {filteredTaxonomy.map((area, areaIdx) => (
                    <motion.section 
                        key={area.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: areaIdx * 0.1 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4 px-2">
                            <div className="h-px flex-1 bg-slate-100 dark:bg-white/5" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{area.name}</h3>
                            <div className="h-px flex-1 bg-slate-100 dark:bg-white/5" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(area.children || []).map((disc: any) => (
                                <DisciplinaCard 
                                    key={disc.id} 
                                    disciplina={disc} 
                                    stats={stats[disc.id]}
                                    loading={loadingStats}
                                    onClick={() => router.push(`/concursos/setup?disciplinaId=${disc.id}&areaId=${area.id}`)}
                                />
                            ))}
                        </div>
                    </motion.section>
                ))}
            </div>

            {filteredTaxonomy.length === 0 && (
                <div className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-[30px] flex items-center justify-center mx-auto">
                        <Search className="w-10 h-10 text-slate-200" />
                    </div>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Nenhuma disciplina encontrada</p>
                </div>
            )}
        </div>
    )
}

function DisciplinaCard({ disciplina, stats, loading, onClick }: { 
    disciplina: any, 
    stats?: UserPerformanceStats, 
    loading: boolean,
    onClick: () => void 
}) {
    const completion = stats?.completude || 0
    const accuracy = stats?.precisao_media || 0
    const totalQuestions = stats?.total_vistas || 0

    return (
        <ConcursoCard className="group cursor-pointer hover:-translate-y-1 transition-all">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h4 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-tight group-hover:text-indigo-600 transition-colors">
                            {disciplina.name}
                        </h4>
                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                            {disciplina.children?.length || 0} Assuntos Mapeados
                        </p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <BookOpen className="w-4 h-4" />
                    </div>
                </div>

                {/* Progress */}
                <div className={cn("space-y-4 transition-opacity", loading ? "opacity-40 animate-pulse" : "opacity-100")}>
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                            <span className="text-slate-400">Completude</span>
                            <span className="text-indigo-500">{completion}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${completion}%` }} 
                                className="h-full bg-indigo-500 rounded-full" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-0.5">
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">Precisão Média</p>
                            <div className="flex items-center gap-1.5">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                <span className="text-sm font-black italic text-[#1A1033] dark:text-white tracking-tighter">{accuracy}%</span>
                            </div>
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">Questões Vistas</p>
                            <p className="text-sm font-black italic text-[#1A1033] dark:text-white tracking-tighter">{totalQuestions} <span className="text-[8px] uppercase not-italic opacity-40">Itens</span></p>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2">
                        Treinar agora <Zap className="w-3 h-3 fill-indigo-500" />
                    </span>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation()
                            onClick()
                        }}
                        className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-[#1A1033] dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-[#1A1033] transition-all"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </ConcursoCard>
    )
}
