"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  ChevronRight, 
  Search, 
  LayoutGrid,
  List,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/store/use-auth'
import { calculateCurrentMemoryScore, MemoryState } from '@/lib/srs-service'
import { 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  Tooltip
} from 'recharts'

interface SubjectMemory {
  id: string
  assunto_id: string
  assunto_nome: string
  specialty_id: string
  memory_score: number
  estado_memoria: MemoryState
  tendencia: 'SUBINDO' | 'ESTAVEL' | 'CAINDO'
  revisoes_concluidas: number
  data_ultima_sessao: string
  data_proxima_revisao: string
  score_atual: number
}

export function MemoryMapView() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<SubjectMemory[]>([])
  const [filter, setFilter] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All')
  const [selectedState, setSelectedState] = useState<string>('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    if (user?.id) {
      loadMemoryMap()
    }
  }, [user?.id])

  async function loadMemoryMap() {
    try {
      setLoading(true)
      const { data: progresso, error } = await supabase
        .from('assunto_progresso')
        .select(`
          *,
          assuntos (nome, specialty_id)
        `)
        .eq('user_id', user?.id)

      if (error) throw error

      const mapped: SubjectMemory[] = (progresso || []).map(p => {
        const { score, state } = calculateCurrentMemoryScore(
          Number(p.memory_score || 0),
          new Date(p.data_ultima_sessao || p.created_at),
          p.revisoes_concluidas || 0,
          p.estado === 'REVISAO_VENCIDA'
        )

        return {
          id: p.id,
          assunto_id: p.assunto_id,
          assunto_nome: p.assuntos?.nome || p.assunto_id,
          specialty_id: p.assuntos?.specialty_id || 'Geral',
          memory_score: Number(p.memory_score),
          estado_memoria: state,
          tendencia: p.tendencia || 'ESTAVEL',
          revisoes_concluidas: p.revisoes_concluidas || 0,
          data_ultima_sessao: p.data_ultima_sessao,
          data_proxima_revisao: p.data_proxima_revisao,
          score_atual: score
        }
      })

      setData(mapped)
    } finally {
      setLoading(false)
    }
  }

  const radarData = Array.from(new Set(data.map(d => d.specialty_id)))
    .filter(spec => spec) // Filter out nulls
    .map(spec => {
      const specData = data.filter(d => d.specialty_id === spec)
      const avgScore = specData.reduce((acc, curr) => acc + curr.score_atual, 0) / specData.length
      // Shorten name if too long for the chart
      const displayName = spec.length > 15 ? spec.substring(0, 12) + '...' : spec
      return { subject: displayName, fullName: spec, A: Math.round(avgScore), fullMark: 100 }
    })

  const stats = {
    total: data.length,
    consolidated: data.filter(d => d.estado_memoria === 'Consolidated').length,
    good: data.filter(d => d.estado_memoria === 'Good').length,
    unstable: data.filter(d => d.estado_memoria === 'Unstable').length,
    weak: data.filter(d => d.estado_memoria === 'Weak').length,
    critical: data.filter(d => d.estado_memoria === 'Critical').length,
    avg: data.length > 0 ? Math.round(data.reduce((acc, curr) => acc + curr.score_atual, 0) / data.length) : 0
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div className="space-y-12">
      {/* Analytics Row */}
      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Radar Chart & Global Avg */}
        <div className="lg:col-span-7 bg-white border-2 border-slate-100 rounded-[40px] p-6 md:p-8 soft-shadow flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 w-full h-[220px] md:h-[240px]">
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="50%" data={radarData}>
                 <PolarGrid stroke="#E2E8F0" />
                 <PolarAngleAxis 
                    dataKey="subject" 
                    tick={(props: any) => {
                        const { x, y, payload } = props;
                        return (
                            <g transform={`translate(${x},${y})`}>
                                <text 
                                    x={0} 
                                    y={0} 
                                    dy={4} 
                                    textAnchor="middle" 
                                    fill="#94A3B8" 
                                    className="text-[6px] md:text-[8px] font-black uppercase tracking-tighter"
                                >
                                    {payload.value}
                                </text>
                            </g>
                        );
                    }}
                 />
                 <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={false} 
                    axisLine={false} 
                 />
                 <Radar
                   name="Retenção"
                   dataKey="A"
                   stroke="#8B5CF6"
                   fill="#8B5CF6"
                   fillOpacity={0.5}
                 />
                 <Tooltip 
                    contentStyle={{ 
                        backgroundColor: '#1A1033', 
                        border: 'none', 
                        borderRadius: '16px', 
                        color: '#fff', 
                        fontSize: '10px',
                        padding: '10px'
                    }} 
                 />
               </RadarChart>
             </ResponsiveContainer>
          </div>
          
          <div className="space-y-4 w-full md:w-48 shrink-0 py-4">
            <h3 className="text-base font-black italic uppercase tracking-tighter text-[#1A1033]">Retenção Média</h3>
            <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Global</span>
                 <span className="text-2xl font-black italic text-primary">{stats.avg}%</span>
               </div>
               <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${stats.avg}%` }} 
                    className="h-full bg-primary" 
                 />
               </div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="lg:col-span-3 bg-[#1A1033] text-white rounded-[40px] p-5 soft-shadow flex flex-col justify-center min-h-[300px]">
            <div className="mb-4">
              <div className="p-2 bg-white/10 rounded-xl w-fit mb-2">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm font-black italic uppercase tracking-tight leading-tight">Resumo de<br/>Memória</h3>
            </div>

            <div className="space-y-1">
               <StatItem label="Consolidados" count={stats.consolidated} color="bg-emerald-500" />
               <StatItem label="Bons" count={stats.good} color="bg-blue-500" />
               <StatItem label="Instáveis" count={stats.unstable} color="bg-yellow-500" />
               <StatItem label="Em Risco" count={stats.weak} color="bg-orange-500" />
               <StatItem label="Críticos" count={stats.critical} color="bg-rose-500" />
            </div>
        </div>
      </div>

      {/* Search & Grid */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
           <div className="relative flex-[3]">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
             <input 
               type="text" 
               placeholder="FILTRAR ASSUNTO..."
               className="w-full bg-slate-100/80 border-none rounded-2xl py-6 pl-14 pr-6 font-black uppercase text-xs tracking-[0.2em] focus:ring-2 ring-primary/20 transition-all outline-none"
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
             />
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 flex-[2]">
             <select 
               className="w-full bg-slate-100/80 border-none rounded-2xl px-6 py-6 md:py-0 font-black uppercase text-xs tracking-widest focus:ring-2 ring-primary/20 appearance-none cursor-pointer outline-none"
               value={selectedSpecialty}
               onChange={(e) => setSelectedSpecialty(e.target.value)}
             >
               <option value="All">Especialidades</option>
               {Array.from(new Set(data.map(d => d.specialty_id))).sort().map(spec => (
                 <option key={spec} value={spec}>{spec}</option>
               ))}
             </select>

             <select 
               className="w-full bg-slate-100/80 border-none rounded-2xl px-6 py-6 md:py-0 font-black uppercase text-xs tracking-widest focus:ring-2 ring-primary/20 appearance-none cursor-pointer outline-none"
               value={selectedState}
               onChange={(e) => setSelectedState(e.target.value)}
             >
               <option value="All">Todos Estados</option>
               <option value="Consolidated">Consolidados</option>
               <option value="Good">Bons</option>
               <option value="Unstable">Instáveis</option>
               <option value="Weak">Em Risco</option>
               <option value="Critical">Críticos</option>
             </select>
           </div>
        </div>

        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
           {data
             .filter(d => 
               (filter === '' || d.assunto_nome.toLowerCase().includes(filter.toLowerCase())) &&
               (selectedSpecialty === 'All' || d.specialty_id === selectedSpecialty) &&
               (selectedState === 'All' || d.estado_memoria === selectedState)
             )
             .map((item) => (
               viewMode === 'grid' ? (
                 <MemoryCard key={item.id} item={item} />
               ) : (
                 <MemoryRow key={item.id} item={item} />
               )
             ))}
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, count, color }: { label: string, count: number, color: string }) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <div className={`w-2 h-2 rounded-full shrink-0 ${color}`} />
        <span className="text-[9px] font-black uppercase tracking-tight text-white/60 truncate">{label}</span>
      </div>
      <span className="text-base font-black italic shrink-0">{count}</span>
    </div>
  )
}

function MemoryCard({ item }: { item: SubjectMemory }) {
  const stateColor = {
    'Consolidated': 'text-emerald-500 bg-emerald-50 border-emerald-100',
    'Good': 'text-blue-500 bg-blue-50 border-blue-100',
    'Unstable': 'text-yellow-500 bg-yellow-50 border-yellow-100',
    'Weak': 'text-orange-500 bg-orange-50 border-orange-100',
    'Critical': 'text-rose-500 bg-rose-50 border-rose-100'
  }[item.estado_memoria]

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border-2 border-slate-100 p-8 rounded-[40px] soft-shadow hover:border-primary/30 transition-all group flex flex-col justify-between"
    >
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-2xl bg-slate-50 text-slate-300 group-hover:text-primary transition-colors">
            <Brain className="w-6 h-6" />
          </div>
          <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${stateColor}`}>
            {item.estado_memoria}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.specialty_id}</p>
          <h4 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-tight line-clamp-2">
            {item.assunto_nome}
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="bg-slate-50 p-4 rounded-3xl">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Score</p>
             <p className="text-2xl font-black italic text-primary">{Math.round(item.score_atual)}%</p>
           </div>
           <div className="bg-slate-50 p-4 rounded-3xl">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tendência</p>
             <div className="flex items-center gap-2">
                {item.tendencia === 'SUBINDO' ? <TrendingUp className="w-5 h-5 text-emerald-500" /> : item.tendencia === 'CAINDO' ? <TrendingDown className="w-5 h-5 text-rose-500" /> : <Minus className="w-5 h-5 text-slate-300" />}
                <span className="text-[10px] font-black uppercase text-[#1A1033]">{item.tendencia}</span>
             </div>
           </div>
        </div>
      </div>

      <button className="w-full mt-8 py-5 rounded-2xl bg-[#1A1033] text-white font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3">
        Ver Detalhes <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

function MemoryRow({ item }: { item: SubjectMemory }) {
  return (
    <div className="bg-white border-2 border-slate-100 p-6 rounded-3xl flex items-center justify-between group hover:border-primary/30 transition-all">
       <div className="flex items-center gap-8">
          <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-2xl">
            <Brain className="w-5 h-5 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="space-y-1">
            <h4 className="font-black italic uppercase text-lg text-[#1A1033]">{item.assunto_nome}</h4>
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>{item.specialty_id}</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full" />
              <span>{item.revisoes_concluidas} Revisões</span>
            </div>
          </div>
       </div>

       <div className="flex items-center gap-12">
          <div className="text-right">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fator Saúde</p>
            <p className="text-2xl font-black italic text-primary">{Math.round(item.score_atual)}%</p>
          </div>
          <div className="flex items-center gap-4">
             {item.estado_memoria === 'Consolidated' ? (
                <div className="p-3 bg-emerald-100 text-emerald-500 rounded-2xl">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
             ) : item.estado_memoria === 'Critical' ? (
                <div className="p-3 bg-rose-100 text-rose-500 rounded-2xl animate-pulse">
                  <AlertCircle className="w-6 h-6" />
                </div>
             ) : (
                <div className="p-3 bg-slate-100 text-slate-400 rounded-2xl">
                  <Clock className="w-6 h-6" />
                </div>
             )}
             <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:bg-primary hover:text-white transition-all">
               <ArrowRight className="w-5 h-5" />
             </button>
          </div>
       </div>
    </div>
  )
}
