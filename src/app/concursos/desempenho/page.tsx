"use client"

import { useAuth } from '@/store/use-auth'
import { useUserStats } from '@/store/use-user-stats'
import { motion } from 'framer-motion'
import { 
    Zap, 
    Target, 
    TrendingUp, 
    BarChart3, 
    ArrowRight,
    Search,
    Filter,
    Layers,
    Brain,
    Trophy,
    Flame
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import { useQuiz } from '@/store/use-quiz'
import { useConcursoTaxonomy, ConcursoTaxonomyNode } from '@/store/concursos/use-taxonomy'
import { useEffect, useMemo } from 'react'

export default function ConcursoDesempenhoPage() {
    const { user } = useAuth()
    const { stats, loadStats } = useUserStats()
    const { responses, load_responses } = useQuiz()
    const { taxonomy, loadTaxonomy } = useConcursoTaxonomy()

    useEffect(() => {
        if (user?.id) {
            loadStats(user.id, true)
            load_responses(user.id, true)
            loadTaxonomy()
        }
    }, [user?.id, loadStats, load_responses, loadTaxonomy])

    const findNodeName = (id: string, nodes: ConcursoTaxonomyNode[]): string => {
        if (!nodes) return id
        for (const node of nodes) {
            if (node.id === id) return node.name
            if (node.children) {
                const found = findNodeName(id, node.children)
                if (found) return found
            }
        }
        return id
    }

    const disciplines = useMemo(() => {
        const targetRes = responses.filter(r => !!r.is_concursos)
        if (targetRes.length === 0) return []

        const map = new Map<string, { total: number, correct: number }>()

        targetRes.forEach(r => {
            const discId = r.specialty_id || (r as any).disciplina_id || 'unknown'
            if (!map.has(discId)) map.set(discId, { total: 0, correct: 0 })
            const entry = map.get(discId)!
            entry.total++
            if (r.is_correct) entry.correct++
        })

        return Array.from(map.entries()).map(([id, metrics]) => {
            const mastery = Math.round((metrics.correct / metrics.total) * 100)
            const name = findNodeName(id, taxonomy)
            
            return {
                id,
                name: name !== id ? name : 'Disciplina Sem Nome',
                mastery,
                accuracy: mastery,
                trend: mastery >= 80 ? 'up' : mastery >= 50 ? 'stable' : 'down',
                color: mastery >= 80 ? 'emerald' : mastery >= 50 ? 'indigo' : 'rose'
            }
        }).sort((a, b) => b.mastery - a.mastery)
    }, [responses, taxonomy])

    return (
        <div className="space-y-8 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 px-2">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-500 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        <Target className="w-3.5 h-3.5" /> MASTER MAP
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-[0.9]">
                            Domínio por <span className="text-indigo-600 dark:text-indigo-400">Disciplina</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 leading-none">
                            <Layers className="w-3 h-3 text-indigo-500" /> Proficiência Granular • 06 Áreas em Monitoramento
                        </p>
                    </div>
                </div>

                <div className="relative group w-full md:w-80">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                        type="text"
                        placeholder="BUSCAR DISCIPLINA..."
                        className="w-full bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[24px] py-4 pl-12 pr-6 font-black text-[10px] uppercase tracking-widest outline-none focus:ring-4 ring-indigo-500/5 transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Mastery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                {disciplines.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 min-h-[40vh] flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800/20 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl text-center">
                        <Brain className="w-12 h-12 text-slate-300 mb-4" />
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white">Nenhum Domínio Mapeado</h3>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 max-w-sm">Resolva questões para mapear seu nível de proficiência técnica e visualizar quais disciplinas constam no seu perfil.</p>
                    </div>
                ) : (
                    disciplines.map((item, idx) => (
                    <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        <ConcursoCard theme={item.mastery >= 80 ? 'emerald' : item.mastery >= 60 ? 'indigo' : 'active'} className="p-10 h-full flex flex-col justify-between group cursor-pointer hover:scale-[1.02]">
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                        {item.mastery >= 80 ? <Trophy className="w-6 h-6 text-white" /> : <Brain className="w-6 h-6 text-white" />}
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Domínio</span>
                                        <span className="text-3xl font-black italic text-white leading-none">{item.mastery}%</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white leading-tight min-h-[3rem]">
                                    {item.name}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/60 tracking-widest">
                                        <span>Status</span>
                                        <span className="flex items-center gap-1">
                                            {item.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-300" />}
                                            {item.trend === 'up' ? 'Em Evolução' : item.trend === 'down' ? 'Revisão Necessária' : 'Estabilizado'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.mastery}%` }}
                                            className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className="mt-10 w-full py-4 rounded-2xl bg-white text-[#1A1033] text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                                Detalhes do Domínio <ArrowRight className="w-4 h-4" />
                            </button>
                        </ConcursoCard>
                    </motion.div>
                    ))
                )}
            </div>

            {/* Bottom Insights */}
            <div className="px-2">
                <ConcursoCard premium className="p-12 flex flex-col md:flex-row items-center justify-between gap-8 group">
                    <div className="space-y-4 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                            <Zap className="w-3.5 h-3.5" /> Insight de IA
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">
                            Ciclo de Alerta: <span className="text-rose-500 font-black">Direito Penal</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                            Notamos um padrão de erros recorrentes em <span className="text-[#1A1033] dark:text-white font-bold italic">Teoria do Crime</span>. 
                            Sua última revisão foi há 23 dias. Recomendamos 40 questões para recuperação técnica.
                        </p>
                    </div>
                    <button className="px-12 py-7 bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center gap-3 shrink-0">
                        Injetar Carga de Reforço <Flame className="w-5 h-5 fill-white" />
                    </button>
                </ConcursoCard>
            </div>
        </div>
    )
}
