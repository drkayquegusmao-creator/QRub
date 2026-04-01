"use client"

import { useState, useEffect } from 'react'
import { 
  Database, 
  Search, 
  AlertTriangle, 
  Activity,
  Layers, 
  BookOpen, 
  Stethoscope, 
  ArrowUpRight,
  Filter,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'

// UI Foundations
const MetricCard = ({ title, value, subtitle, icon, trend, color = "primary" }: any) => (
  <div className="relative group bg-card border border-border/50 rounded-3xl p-6 transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5">
    <div className="flex items-start justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
          {icon}
          {title}
        </div>
        <div>
          <div className="text-4xl font-black italic tracking-tighter text-foreground leading-none mb-1">
            {value.toLocaleString()}
          </div>
          <p className="text-[10px] font-bold text-muted-foreground/60 uppercase">{subtitle}</p>
        </div>
      </div>
      {trend && (
        <div className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">
          <ArrowUpRight className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
    <div className={`absolute bottom-0 left-0 h-1 bg-${color} rounded-full transition-all w-0 group-hover:w-full opacity-30`} />
  </div>
)

interface SpecialtyStat {
  id: string
  name: string
  count: number
  percent: number
}

export default function DatabaseStats() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<{
    total: number,
    published: number,
    specialties: SpecialtyStat[],
    validationQueue: number,
    queueBySpec: Record<string, number>
  }>({
    total: 0,
    published: 0,
    specialties: [],
    validationQueue: 0,
    queueBySpec: {}
  })
  const [expandedStats, setExpandedStats] = useState<Record<string, any>>({})
  const [expandingId, setExpandingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchData = async () => {
    setLoading(true)
    try {
      // 1. Fetch total count first
      const { count: totalCount } = await supabase
        .from('questao_base')
        .select('*', { count: 'exact', head: true })

      // 2. Fetch all specialty_ids with pagination to defeat 1000-row limit
      let allRows: any[] = []
      let from = 0
      const step = 1000
      let hasMore = true

      while (hasMore) {
        const { data, error } = await supabase
          .from('questao_base')
          .select('specialty_id')
          .range(from, from + step - 1)
        
        if (error) throw error
        if (data.length < step) hasMore = false
        allRows = [...allRows, ...data]
        from += step
        if (from > 20000) break // Safety break
      }

      // 3. Get taxonomy map
      const { data: taxo } = await supabase
        .from('taxonomia')
        .select('id, name, slug')
        .eq('level', 'specialty')

      const taxoMap = new Map((taxo || []).map(t => [t.slug, t.name]))

      // 4. Process aggregation
      const counts: Record<string, number> = {}
      allRows.forEach(r => {
        const key = r.specialty_id || 'unassigned'
        counts[key] = (counts[key] || 0) + 1
      })

      const total = allRows.length
      
      const formatted: SpecialtyStat[] = Object.entries(counts).map(([slug, count]) => ({
        id: slug,
        name: taxoMap.get(slug) || slug.replace(/-/g, ' ').toUpperCase() || 'Sem Categoria',
        count,
        percent: total > 0 ? (count / total) * 100 : 0
      })).sort((a, b) => b.count - a.count)

      // 5. Get validation queue (draft items) details
      const { data: queueData } = await supabase
        .from('package_questions')
        .select("question_json->>subspecialty, question_json->>specialty")
      
      const qBySpec: Record<string, number> = {}
      queueData?.forEach(q => {
        const spec = (q.subspecialty || q.specialty || 'unassigned').toLowerCase().replace(/\s+/g, '-')
        qBySpec[spec] = (qBySpec[spec] || 0) + 1
      })

      setStats({
        total,
        published: total,
        specialties: formatted,
        validationQueue: queueData?.length || 0,
        queueBySpec: qBySpec
      })

    } catch (err) {
      console.error('Core Dashboard Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchSubjectStats = async (specSlug: string) => {
    if (expandedStats[specSlug]) return
    setExpandingId(specSlug)
    try {
      const { data, error } = await supabase
        .from('questao_base')
        .select('subject_id')
        .eq('specialty_id', specSlug)
      
      if (error) throw error

      const subCounts: Record<string, number> = {}
      data.forEach(r => {
        const key = r.subject_id || 'geral'
        subCounts[key] = (subCounts[key] || 0) + 1
      })

      // Get taxonomy names for these subjects
      const { data: taxo } = await supabase
        .from('taxonomia')
        .select('slug, name')
        .in('slug', Object.keys(subCounts))
      
      const taxoMap = new Map((taxo || []).map(t => [t.slug, t.name]))

      const formatted = Object.entries(subCounts).map(([slug, count]) => ({
        id: slug,
        name: taxoMap.get(slug) || slug.replace(/-/g, ' ').toUpperCase(),
        count
      })).sort((a, b) => b.count - a.count)

      setExpandedStats(prev => ({ ...prev, [specSlug]: formatted }))
    } catch (err) {
      console.error('Error fetching subject stats:', err)
    } finally {
      setExpandingId(null)
    }
  }

  const filteredSpecialties = stats.specialties.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-10 py-6 animate-in fade-in duration-700">
      {/* Header metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Acervo Total" 
          value={stats.total} 
          subtitle="Questões Base Saúde" 
          icon={<Database className="w-3 h-3" />}
          trend="+12% mes"
          color="primary"
        />
        <MetricCard 
          title="Em Validação" 
          value={stats.validationQueue} 
          subtitle="Questões em Lote (Draft)" 
          icon={<Clock className="w-3 h-3" />}
          color="amber-500"
        />
        <MetricCard 
          title="Cobertura Temática" 
          value={stats.specialties.length} 
          subtitle="Especialidades Ativas" 
          icon={<Layers className="w-3 h-3" />}
          color="emerald-500"
        />
        <MetricCard 
          title="Status do Sistema" 
          value="ATIVO" 
          subtitle="Monitoramento em Tempo Real" 
          icon={<Activity className="w-3 h-3" />}
          color="blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-3">
              <Stethoscope className="text-primary w-6 h-6" />
              Matriz de Especialidades
            </h2>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filtrar especialidade..."
                className="bg-muted/50 border-none rounded-xl pl-10 pr-4 py-2 text-xs font-bold w-64 focus:ring-2 ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="bg-card border border-border/50 rounded-[2.5rem] overflow-hidden">
            <div className="grid grid-cols-12 px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted/30">
              <div className="col-span-6">Especialidade</div>
              <div className="col-span-3 text-center">Volume</div>
              <div className="col-span-3 text-right">Densidade</div>
            </div>
            
            <div className="divide-y divide-border/30 max-h-[600px] overflow-y-auto custom-scrollbar">
              {loading ? (
                Array(8).fill(0).map((_, i) => (
                  <div key={i} className="px-8 py-6 animate-pulse flex gap-12">
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-4 bg-muted rounded w-1/4" />
                  </div>
                ))
              ) : (
                filteredSpecialties.map((spec) => (
                  <div key={spec.id}>
                    <button 
                      onClick={() => {
                        const isExpanding = expandedId !== spec.id
                        setExpandedId(isExpanding ? spec.id : null)
                        if (isExpanding) fetchSubjectStats(spec.id)
                      }}
                      className={`w-full grid grid-cols-12 px-8 py-5 items-center transition-all hover:bg-primary/5 text-left group ${expandedId === spec.id ? 'bg-primary/5' : ''}`}
                    >
                      <div className="col-span-6 flex items-center gap-4">
                        <div className={`w-1 h-8 rounded-full transition-all ${expandedId === spec.id ? 'bg-primary' : 'bg-transparent group-hover:bg-primary/30'}`} />
                        <div>
                          <div className="flex items-center gap-2">
                             <p className="text-sm font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                              {spec.name}
                            </p>
                            {stats.queueBySpec[spec.id] > 0 && (
                              <span className="bg-amber-500/10 text-amber-500 text-[8px] font-black px-1.5 py-0.5 rounded-full border border-amber-500/20">
                                {stats.queueBySpec[spec.id]} PENDENTES
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] font-bold text-muted-foreground/60">ID: {spec.id}</p>
                        </div>
                      </div>
                      <div className="col-span-3 text-center">
                        <span className="text-lg font-black italic tracking-tighter">{spec.count} Q</span>
                      </div>
                      <div className="col-span-3 space-y-2">
                         <div className="flex items-center justify-end gap-2 text-[10px] font-black italic">
                          {spec.count < 50 ? (
                            <span className="text-amber-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> BAIXA
                            </span>
                          ) : (
                            <span className="text-emerald-500 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> OK
                            </span>
                          )}
                          <span className="text-muted-foreground opacity-50">{spec.percent.toFixed(1)}%</span>
                         </div>
                         <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${spec.count < 50 ? 'bg-amber-500' : 'bg-primary'}`}
                            style={{ width: `${spec.percent * 10}%` }} // Simplified visual scaling
                          />
                         </div>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedId === spec.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-muted/20 border-t border-border/10"
                        >
                          <div className="px-16 py-6 space-y-4">
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-primary/60 flex items-center gap-2">
                               <Layers className="w-3 h-3" />
                               Detalhamento por Temas (Publicados)
                             </h4>
                             <div className="grid grid-cols-2 gap-4">
                               {expandingId === spec.id ? (
                                 <div className="col-span-2 py-4 text-center text-[10px] font-bold text-muted-foreground animate-pulse">
                                   CARREGANDO TAXONOMIA...
                                 </div>
                               ) : expandedStats[spec.id]?.length > 0 ? (
                                 expandedStats[spec.id].map((sub: any) => (
                                   <div key={sub.id} className="flex items-center justify-between p-3 bg-card border border-border/50 rounded-xl">
                                     <span className="text-xs font-bold text-foreground">{sub.name}</span>
                                     <span className="text-xs font-black italic text-primary">{sub.count} Q</span>
                                   </div>
                                 ))
                               ) : (
                                 <div className="col-span-2 py-4 text-center text-[10px] font-bold text-muted-foreground">
                                   NENHUM TEMA MAPEADO NO BANCO PUBLICADO
                                 </div>
                               )}
                             </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 relative overflow-hidden">
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                  <AlertTriangle className="w-4 h-4" />
                  Zonas Críticas de Geração
                </div>
                <p className="text-sm font-bold text-foreground leading-relaxed">
                  As seguintes especialidades possuem menos de 50 questões e exigem atenção imediata da Engine de IA:
                </p>
                <div className="space-y-2">
                   {stats.specialties.filter(s => s.count < 50).slice(0, 5).map(s => (
                     <div key={s.id} className="flex items-center justify-between bg-white/50 dark:bg-black/20 p-3 rounded-xl border border-black/5 dark:border-white/5">
                        <span className="text-xs font-black uppercase">{s.name}</span>
                        <span className="text-xs font-black text-red-500">{s.count} Q</span>
                     </div>
                   ))}
                </div>
                <button className="w-full bg-primary text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95 shadow-xl shadow-primary/20">
                  Abrir Engine de IA
                </button>
             </div>
             <div className="absolute -right-8 -bottom-8 opacity-10">
                <Database className="w-48 h-48" />
             </div>
          </div>

          <div className="bg-card border border-border/50 rounded-3xl p-6 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Tendências
                </h3>
                <span className="text-[10px] font-bold text-muted-foreground">Últimos 7 dias</span>
             </div>
             
             <div className="space-y-4">
                <TrendItem label="Cardiologia" value="+450q" type="up" />
                <TrendItem label="Clínica Médica" value="+120q" type="up" />
                <TrendItem label="Ginecologia" value="0q" type="stable" />
                <TrendItem label="Pediatria" value="+15q" type="up" />
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TrendItem({ label, value, type }: any) {
  return (
    <div className="flex items-center justify-between group">
      <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-black ${type === 'up' ? 'text-emerald-500' : 'text-muted-foreground'}`}>{value}</span>
        {type === 'up' ? <ArrowUpRight className="w-3 h-3 text-emerald-500" /> : <div className="w-3 h-[1px] bg-muted-foreground" />}
      </div>
    </div>
)
}
