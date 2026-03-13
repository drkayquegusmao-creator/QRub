
"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    AlertTriangle,
    Calendar,
    Sparkles,
    ArrowRight,
    TrendingUp,
    Clock,
    Flame,
    Zap,
    LayoutGrid,
    CalendarDays,
    List,
    Search,
    ChevronDown,
    ChevronRight,
    Loader2,
    Check
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useQuestions } from '@/store/use-questions'
import { SessaoModal } from './sessao-modal'
import { CalendarView } from './calendar-view'
import srsRules from '@/lib/srs-rules.json'
import { calculateCurrentMemoryScore } from '@/lib/srs-service'
import { useRouter, useSearchParams } from 'next/navigation'
import { MemoryMapView } from './memory-map-view'
import { HierarchyNode } from '@/lib/taxonomy-service'

interface DashboardData {
    success: boolean
    data_hoje: string
    revisoes_atrasadas: RevisaoItem[]
    revisoes_do_dia: RevisaoItem[]
    sugestao_nivelamento: SugestaoNivelamento | null
    erros_ativos: ErroItem[]
    todos_eventos: any[]
    resumo: {
        total_atrasadas: number
        total_do_dia: number
        total_erros: number
        tem_sugestao: boolean
    }
}

interface RevisaoItem {
    agenda_id: string
    assunto_id: string
    nome: string
    especialidade?: string
    specialty_id: string
    data_programada: string
    dias_atrasado?: number
    nivel_atual: number
    ultima_nota: number
    estado_cognitivo?: string
}

interface SugestaoNivelamento {
    assunto_id: string
    nome: string
    specialty_id: string
    questoes_disponiveis: number
}

interface ErroItem {
    assunto_id: string
    nome: string
    especialidade?: string
    quantidade: number
}

export function DashboardDiario() {
    const { user } = useAuth()
    const router = useRouter()
    const { questions } = useQuestions()
    const [dashboard, setDashboard] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const searchParams = useSearchParams()
    
    // View Mode State - Initialized from URL if present
    const [viewMode, setViewMode] = useState<'AGENDA' | 'CALENDARIO' | 'MAPA'>('AGENDA')
    const [hierarchy, setHierarchy] = useState<HierarchyNode[]>([])
    const [expandedSpecialty, setExpandedSpecialty] = useState<string | null>(null)
    const [searchLeveling, setSearchLeveling] = useState('')
    const [userProgress, setUserProgress] = useState<Record<string, any>>({})

    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab === 'MAPA') setViewMode('MAPA')
        else if (tab === 'CALENDARIO') setViewMode('CALENDARIO')
        else setViewMode('AGENDA')
    }, [searchParams])

    const [sessaoAberta, setSessaoAberta] = useState(false)
    const [sessaoAssuntoId, setSessaoAssuntoId] = useState<string>('')
    const [sessaoTipo, setSessaoTipo] = useState<'NIVELAMENTO' | 'REVISAO' | 'CADERNO_ERROS'>('NIVELAMENTO')

    useEffect(() => {
        if (!user?.id) return

        const fetchDashboardLocal = async () => {
            try {
                setLoading(true)
                const { supabase } = await import('@/lib/supabase')
                const { fetchTaxonomyHierarchy } = await import('@/lib/taxonomy-service')
                let hierarchyData: any[] = []
                try {
                    hierarchyData = await fetchTaxonomyHierarchy()
                } catch (e) { console.error('Error fetching taxonomy', e) }

                if (!hierarchyData || hierarchyData.length === 0) {
                    const { MEDICAL_HIERARCHY: staticHier } = require('@/lib/medical-specialties')
                    hierarchyData = staticHier
                }
                setHierarchy(hierarchyData)

                const today = new Date()
                today.setHours(0, 0, 0, 0)
                const todayStr = today.toISOString().split('T')[0]

                // 1. Buscar progresso SRS COMPLETO
                const { data: progressos } = await supabase
                    .from('assunto_progresso')
                    .select('*')
                    .eq('user_id', user.id)

                const progMap: Record<string, any> = {}
                progressos?.forEach(p => { progMap[p.assunto_id] = p })
                setUserProgress(progMap)

                // 2. Buscar Agenda de Revisões
                const { data: agenda } = await supabase
                    .from('agenda_revisoes')
                    .select('*')
                    .eq('user_id', user.id)
                    .in('status', ['PENDENTE', 'ATRASADA'])

                // 3. Buscar Caderno de Erros (ATIVOS)
                let errosAtivos: ErroItem[] = []
                const { data: errosDb, error: errErros } = await supabase
                    .from('caderno_erros')
                    .select('*')
                    .eq('user_id', user.id)
                    .in('status', ['ativo', 'em_revisao'])

                // Helper de Detalhes do Assunto
                const getDetalhesAssunto = (id: string) => {
                    let found: { especialidade: string, assunto: string } | null = null

                    const search = (nodes: any[], currentSpec: string | null) => {
                        if (found) return
                        for (const node of nodes) {
                            let specName = currentSpec
                            if (!specName && (node.specialties || node.subspecialties)) specName = node.name

                            if (node.id === id) {
                                found = { especialidade: specName || node.name, assunto: node.name }
                                return
                            }

                            if (node.specialties) search(node.specialties, specName)
                            if (node.subspecialties) search(node.subspecialties, specName || node.name)
                            if (node.subjects) search(node.subjects, specName)
                        }
                    }

                    search(hierarchyData, null)

                    if (found) return found
                    return { especialidade: 'Geral', assunto: id }
                }

                if (!errErros && errosDb) {
                    const errosMap: Record<string, number> = {}
                    errosDb.forEach((e: any) => {
                        errosMap[e.assunto_id] = (errosMap[e.assunto_id] || 0) + 1
                    })

                    errosAtivos = Object.entries(errosMap).map(([id, qtd]) => {
                        const info = getDetalhesAssunto(id)
                        return {
                            assunto_id: id,
                            nome: info.assunto,
                            especialidade: info.especialidade,
                            quantidade: qtd
                        }
                    }).sort((a, b) => b.quantidade - a.quantidade)
                }

                const atrasadas: any[] = []
                const doDia: any[] = []
                const eventosCalendario: any[] = []

                if (agenda) {
                    agenda.forEach((item: any) => {
                        const dataProg = new Date(item.data_programada)
                        const dataParts = item.data_programada.split('-')
                        const dataLocal = new Date(Number(dataParts[0]), Number(dataParts[1]) - 1, Number(dataParts[2]))
                        dataLocal.setHours(0, 0, 0, 0)

                        const progressoRelacionado = progressos?.find(p => p.assunto_id === item.assunto_id)

                        // REGRA: Se NÃO_NIVELADO, remove da agenda de revisão (fallback de segurança)
                        // AVISO: Isso impede que REVISÕES apareçam se o estado estiver 'NAO_NIVELADO', 
                        // forçando o usuário a passar pelo card de nivelamento (sugestão)
                        if (!progressoRelacionado || progressoRelacionado.estado_cognitivo === 'NAO_NIVELADO') {
                            return;
                        }

                        const info = getDetalhesAssunto(item.assunto_id)

                        const revisaoItem = {
                            agenda_id: item.id,
                            assunto_id: item.assunto_id,
                            nome: info.assunto,
                            especialidade: info.especialidade,
                            specialty_id: item.assunto_id,
                            data_programada: item.data_programada,
                            dias_atrasado: 0,
                            nivel_atual: progressoRelacionado?.nivel_atual || 0,
                            ultima_nota: progressoRelacionado?.ultima_nota || 0,
                            estado_cognitivo: progressoRelacionado?.estado_cognitivo,
                            memory_score: progressoRelacionado?.memory_score,
                            data_ultima_sessao: progressoRelacionado?.data_ultima_sessao
                        }

                        // Aplicar Decay em tempo real para o Score
                        if (revisaoItem.memory_score) {
                            const { score } = calculateCurrentMemoryScore(
                                Number(revisaoItem.memory_score),
                                new Date(revisaoItem.data_ultima_sessao || item.created_at),
                                progressoRelacionado?.revisoes_concluidas || 0,
                                dataLocal < today
                            )
                            revisaoItem.ultima_nota = score // Usar score decaído como "nota" visual momentânea
                        }

                        let calendarStatus = 'PENDENTE'
                        if (dataLocal < today) calendarStatus = 'ATRASADA'

                        eventosCalendario.push({
                            id: item.id,
                            assunto_id: item.assunto_id,
                            data: item.data_programada,
                            tipo: 'REVISAO',
                            assunto: info.assunto,
                            especialidade: info.especialidade,
                            status: calendarStatus
                        })

                        if (dataLocal < today) {
                            const diffTime = Math.abs(today.getTime() - dataLocal.getTime())
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                            revisaoItem.dias_atrasado = diffDays
                            atrasadas.push(revisaoItem)
                        } else if (dataLocal.getTime() === today.getTime()) {
                            doDia.push(revisaoItem)
                        }
                    })
                }

                // Processar Erros (Apenas se já nivelado)
                errosAtivos.forEach(erro => {
                    const prog = progressos?.find(p => p.assunto_id === erro.assunto_id)
                    // Pela Regra 1: Bloqueio Total se NAO_NIVELADO. Erros não podem ser recuperados sem nivelamento.
                    if (!prog || prog.estado_cognitivo === 'NAO_NIVELADO') return;

                    if (erro.quantidade < 10) return;

                    const hasReviewToday = eventosCalendario.some(e => e.assunto === erro.nome && e.data === todayStr)
                    if (!hasReviewToday) {
                        eventosCalendario.push({
                            id: `erro-${erro.assunto_id}`,
                            assunto_id: erro.assunto_id,
                            data: todayStr,
                            tipo: 'RECUPERACAO',
                            assunto: erro.nome,
                            especialidade: erro.especialidade,
                            status: 'PENDENTE'
                        })
                    } else {
                        const evt = eventosCalendario.find(e => e.assunto === erro.nome && e.data === todayStr)
                        if (evt) evt.tipo = 'RECUPERACAO'
                    }
                })

                // Lógica de Sugestão de Nivelamento (Prioritária)
                let sugestao = null
                let levelCandidates: any[] = []

                // Fallback simplest: usage of injected hierarchy or default
                if (hierarchyData.length > 0 && hierarchyData[0].specialties) {
                    levelCandidates = hierarchyData[0].specialties // Start high level
                } else {
                    levelCandidates = hierarchyData
                }

                // Busca assuntos Explicitamente NÃO NIVELADOS ou sem registro
                const niveladosMap = new Map(progressos?.map(p => [p.assunto_id, p]))

                for (const cand of levelCandidates) {
                    const prog = niveladosMap.get(cand.id)
                    const isNaoNivelado = !prog || prog.estado_cognitivo === 'NAO_NIVELADO'

                    if (isNaoNivelado) {
                        // Check availability
                        const hasApprovedQuestions = questions.some((q: any) =>
                            (q.subject_id === cand.id || q.subspecialty_id === cand.id || q.specialty_id === cand.id) &&
                            q.status_validacao === 'APROVADA'
                        )

                        if (hasApprovedQuestions) {
                            sugestao = {
                                assunto_id: cand.id,
                                nome: cand.name,
                                specialty_id: cand.id,
                                questoes_disponiveis: 10
                            }
                            break // Encontrou um candidato válido para nivelamento
                        }
                    }
                }

                setDashboard({
                    success: true,
                    data_hoje: today.toISOString(),
                    revisoes_atrasadas: atrasadas,
                    revisoes_do_dia: doDia,
                    erros_ativos: errosAtivos,
                    sugestao_nivelamento: sugestao,
                    todos_eventos: eventosCalendario,
                    resumo: {
                        total_atrasadas: atrasadas.length,
                        total_do_dia: doDia.length,
                        total_erros: errosAtivos.filter(e => e.quantidade >= 10).reduce((acc, curr) => acc + curr.quantidade, 0),
                        tem_sugestao: !!sugestao
                    }
                })

            } catch (err) {
                console.error('Error fetching dashboard local:', err)
                setError('Erro ao carregar dados. Verifique sua conexão.')
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardLocal()
    }, [user?.id, questions.length])

    const handleIniciarSessao = (assunto_id: string, tipo: 'NIVELAMENTO' | 'REVISAO' | 'CADERNO_ERROS') => {
        setSessaoAssuntoId(assunto_id)
        setSessaoTipo(tipo)
        setSessaoAberta(true)
    }

    const handleSessaoComplete = () => {
        window.location.reload()
    }

    const handleCalendarEventClick = (evento: any) => {
        if (evento.assunto_id) {
            const tipoSessao = evento.tipo === 'RECUPERACAO' ? 'CADERNO_ERROS' : 'REVISAO'
            handleIniciarSessao(evento.assunto_id, tipoSessao)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                />
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-destructive/10 border border-destructive/20 rounded-3xl p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-destructive font-bold">{error}</p>
            </div>
        )
    }

    if (!dashboard) return null

    const { revisoes_atrasadas, revisoes_do_dia, erros_ativos, sugestao_nivelamento, resumo, todos_eventos } = dashboard

    return (
        <>
            <div className="space-y-8">
                {/* Tabs Switcher - Improved Spacing and Responsiveness */}
                <div className="flex flex-col gap-4">
                    <div className="bg-slate-100 p-2 rounded-3xl flex flex-wrap items-center gap-2 self-start w-full md:w-auto">
                        <button
                            onClick={() => setViewMode('AGENDA')}
                            className={`flex-1 md:flex-none flex justify-center items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'AGENDA'
                                ? 'bg-white shadow-xl text-[#1A1033] ring-1 ring-black/5'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Agenda Ativa
                            {(resumo.total_atrasadas + resumo.total_erros) > 0 && (
                                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 bg-destructive text-white text-[10px] rounded-full scale-110">
                                    {resumo.total_atrasadas + resumo.total_erros}
                                </span>
                            )}
                        </button>
                        
                        <button
                            onClick={() => setViewMode('MAPA')}
                            className={`flex-1 md:flex-none flex justify-center items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'MAPA'
                                ? 'bg-white shadow-xl text-[#1A1033] ring-1 ring-black/5'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Mapa de Memória
                        </button>

                        <button
                            onClick={() => setViewMode('CALENDARIO')}
                            className={`flex-1 md:flex-none flex justify-center items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'CALENDARIO'
                                ? 'bg-white shadow-xl text-[#1A1033] ring-1 ring-black/5'
                                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200/50'
                                }`}
                        >
                            <CalendarDays className="w-4 h-4" />
                            Calendário
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {viewMode === 'AGENDA' ? (
                        <motion.div
                            key="agenda"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 gap-8"
                        >
                            {/* Empty State / All Done */}
                            {!sugestao_nivelamento && revisoes_do_dia.length === 0 && revisoes_atrasadas.length === 0 && erros_ativos.length === 0 && (
                                <div className="bg-white border-2 border-slate-100 rounded-[50px] p-16 flex flex-col items-center justify-center text-center soft-shadow min-h-[400px]">
                                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                                        <Sparkles className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-4">
                                        Tudo Limpo!
                                    </h3>
                                    <p className="text-slate-500 font-medium max-w-sm mx-auto">
                                        Você zerou sua agenda de hoje. Aproveite para descansar ou explorar o banco de questões livremente.
                                    </p>
                                </div>
                            )}

                            {/* 0. NIVELAMENTO (PRIORIDADE ABSOLUTA DA REGRA 2) */}
                            {sugestao_nivelamento && (
                                <div className="pt-2">
                                    <CardNivelamento
                                        sugestao={sugestao_nivelamento}
                                        onIniciar={() => handleIniciarSessao(sugestao_nivelamento.assunto_id, 'NIVELAMENTO')}
                                    />
                                </div>
                            )}

                            {/* 1. Caderno de Erros (Só aparece se já nivelado) */}
                            {erros_ativos.filter(e => e.quantidade >= 10).map((erro, index) => (
                                <motion.div
                                    key={'erro-' + erro.assunto_id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-yellow-500/5 border-2 border-yellow-500/20 rounded-[40px] p-8 md:p-12 relative overflow-hidden group hover:border-yellow-500/40 transition-all"
                                >
                                    <div className="flex items-center justify-between gap-6 relative z-10 flex-wrap">
                                        <div className="max-w-xl">
                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 text-[10px] font-black uppercase tracking-widest mb-4">
                                                <Zap className="w-3 h-3" />
                                                Prioridade Máxima
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-2 leading-none">
                                                Recuperar {erro.nome}
                                            </h3>
                                            <p className="text-slate-600 font-medium text-base leading-relaxed">
                                                Detectamos instabilidade neste tópico. O sistema agendou uma recuperação imediata para evitar esquecimento.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-center hidden md:block px-6 border-r border-yellow-500/20">
                                                <p className="text-5xl font-black text-yellow-500 leading-none">{erro.quantidade}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2">Falhas Ativas</p>
                                            </div>
                                            <button
                                                onClick={() => handleIniciarSessao(erro.assunto_id, 'CADERNO_ERROS')}
                                                className="bg-yellow-500 text-white px-10 py-6 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-yellow-500/20 flex items-center gap-3"
                                            >
                                                Iniciar Recuperação
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* 2. Revisões Atrasadas */}
                            {revisoes_atrasadas.length > 0 && (
                                <div className="space-y-4 pt-2">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-destructive flex items-center gap-3 px-2">
                                        <Flame className="w-6 h-6" /> Itens em Atraso
                                    </h3>
                                    {revisoes_atrasadas.map((revisao, index) => (
                                        <CardRevisaoAtrasada
                                            key={revisao.agenda_id}
                                            revisao={revisao}
                                            index={index}
                                            onIniciar={() => handleIniciarSessao(revisao.assunto_id, 'REVISAO')}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* 3. Revisões do Dia */}
                            {revisoes_do_dia.length > 0 && (
                                <div className="space-y-4 pt-2">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-primary flex items-center gap-3 px-2">
                                        <Calendar className="w-6 h-6" /> Meta Diária
                                    </h3>
                                    {revisoes_do_dia.map((revisao, index) => (
                                        <CardRevisaoDoDia
                                            key={revisao.agenda_id}
                                            revisao={revisao}
                                            index={index}
                                            onIniciar={() => handleIniciarSessao(revisao.assunto_id, 'REVISAO')}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* 4. Explorar outros assuntos - Corrigido para Termo Nivelamento */}
                            <div className="pt-8 border-t border-slate-100 mt-12 pb-12">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] flex items-center gap-3">
                                        <Sparkles className="w-6 h-6 text-orange-500" /> Nivelar novo assunto
                                    </h3>
                                </div>
                                <p className="text-slate-500 font-medium mb-6">Deseja dominar um novo tópico? Escolha qualquer assunto para realizar o nivelamento inicial.</p>
                                 <div className="space-y-6">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input 
                                            type="text"
                                            placeholder="BUSCAR ASSUNTO PARA NIVELAR..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-xs uppercase tracking-widest outline-none focus:ring-2 ring-primary/20 transition-all"
                                            value={searchLeveling}
                                            onChange={(e) => setSearchLeveling(e.target.value)}
                                        />
                                    </div>

                                    {/* Hierarchy List - Scrollable Container */}
                                    <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar space-y-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(219, 234, 254, 0.8) transparent' }}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                                            {hierarchy.length > 0 && hierarchy[0].specialties?.filter(spec => {
                                                const hasSubjects = spec.subspecialties?.some(sub => (sub.subjects || []).length > 0);
                                                const matchesSearch = searchLeveling === '' || 
                                                    spec.name.toLowerCase().includes(searchLeveling.toLowerCase()) ||
                                                    spec.subspecialties?.some(sub => sub.name.toLowerCase().includes(searchLeveling.toLowerCase())) ||
                                                    spec.subspecialties?.some(sub => sub.subjects?.some(s => s.name.toLowerCase().includes(searchLeveling.toLowerCase())));
                                                
                                                return hasSubjects && matchesSearch;
                                            }).map((spec) => (
                                                <div key={spec.id} className="space-y-2">
                                                    <button 
                                                        onClick={() => setExpandedSpecialty(expandedSpecialty === spec.id ? null : spec.id)}
                                                        className={`w-full bg-white border-2 p-4 rounded-[25px] flex items-center justify-between transition-all text-left ${expandedSpecialty === spec.id ? 'border-primary shadow-lg ring-4 ring-primary/5' : 'border-slate-100 hover:border-slate-200'}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${expandedSpecialty === spec.id ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>
                                                                <List className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <p className="font-black italic uppercase text-xs text-[#1A1033] tracking-tight leading-tight">{spec.name}</p>
                                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                                                    {spec.subspecialties?.length || 0} Subáreas
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${expandedSpecialty === spec.id ? 'rotate-180 text-primary' : ''}`} />
                                                    </button>

                                                    <AnimatePresence>
                                                        {expandedSpecialty === spec.id && (
                                                            <motion.div 
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="overflow-hidden px-2"
                                                            >
                                                                <div className="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar space-y-2 py-2">
                                                                    {spec.subspecialties?.map(sub => (
                                                                        <div key={sub.id} className="space-y-1">
                                                                            <div className="px-3 py-1.5 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] border-l-2 border-slate-100 ml-5 bg-slate-50/50 rounded-r-lg">
                                                                                {sub.name}
                                                                            </div>
                                                                            <div className="ml-8 space-y-1">
                                                                                {(sub.subjects || []).map(subject => {
                                                                                    const prog = userProgress[subject.id]
                                                                                    const isLeveled = prog && prog.estado_cognitivo !== 'NAO_NIVELADO'
                                                                                    
                                                                                    return (
                                                                                        <button 
                                                                                            key={subject.id}
                                                                                            onClick={() => !isLeveled && handleIniciarSessao(subject.id, 'NIVELAMENTO')}
                                                                                            disabled={isLeveled}
                                                                                            className={`w-full text-left p-3 rounded-xl group flex items-center justify-between transition-all ${isLeveled ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:bg-primary/5 hover:translate-x-1 border border-transparent hover:border-primary/10'}`}
                                                                                        >
                                                                                            <div className="flex items-center gap-2">
                                                                                                <span className={`text-[11px] font-bold transition-colors ${isLeveled ? 'text-slate-400' : 'text-slate-600 group-hover:text-primary'}`}>
                                                                                                    {subject.name}
                                                                                                </span>
                                                                                                {isLeveled && (
                                                                                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-500 text-[7px] font-black uppercase">
                                                                                                        <Check className="w-1.5 h-1.5" />
                                                                                                        Nivelado
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                            {!isLeveled && <ArrowRight className="w-3 h-3 text-slate-200 group-hover:text-primary" />}
                                                                                        </button>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    {(!spec.subspecialties || spec.subspecialties.length === 0) && (
                                                                        <div className="p-4 text-center text-[10px] font-bold text-slate-400 uppercase">
                                                                            Nenhum assunto disponível
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : viewMode === 'MAPA' ? (
                        <motion.div
                            key="mapa"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="pt-4"
                        >
                            <MemoryMapView />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="calendario"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <CalendarView
                                eventos={todos_eventos}
                                onSelectDate={(date) => console.log('Selected', date)}
                                onEventClick={handleCalendarEventClick}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modal de Sessão */}
            <SessaoModal
                isOpen={sessaoAberta}
                onClose={() => setSessaoAberta(false)}
                assunto_id={sessaoAssuntoId}
                tipo={sessaoTipo}
                onComplete={handleSessaoComplete}
            />
        </>
    )
}

function CardRevisaoAtrasada({ revisao, index, onIniciar }: { revisao: RevisaoItem, index: number, onIniciar: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border-l-4 border-destructive p-8 rounded-r-[30px] soft-shadow flex items-center justify-between group hover:bg-destructive/5 transition-all w-full"
        >
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-destructive bg-destructive/10 px-2 py-1 rounded">
                        {revisao.dias_atrasado} DIA{revisao.dias_atrasado! > 1 ? 'S' : ''} DE ATRASO
                    </span>
                </div>
                <h4 className="text-xl font-black text-[#1A1033] mb-1">{revisao.nome}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">ÚLTIMA NOTA</span>
                    <span className="text-xs font-bold text-[#1A1033] px-2 py-0.5 bg-slate-100 rounded">{revisao.ultima_nota.toFixed(1)}</span>
                </div>
            </div>
            <button onClick={onIniciar} className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-destructive group-hover:text-white transition-all shadow-sm">
                <ArrowRight className="w-6 h-6" />
            </button>
        </motion.div>
    )
}

function CardRevisaoDoDia({ revisao, index, onIniciar }: { revisao: RevisaoItem, index: number, onIniciar: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border-l-4 border-primary p-8 rounded-r-[30px] soft-shadow flex items-center justify-between group hover:bg-primary/5 transition-all w-full"
        >
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">
                        AGENDA DE HOJE
                    </span>
                </div>
                <h4 className="text-xl font-black text-[#1A1033] mb-1">{revisao.nome}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">NÍVEL ATUAL</span>
                    <span className="text-xs font-bold text-[#1A1033] px-2 py-0.5 bg-slate-100 rounded">{revisao.nivel_atual.toFixed(1)}</span>
                </div>
            </div>
            <button onClick={onIniciar} className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <ArrowRight className="w-6 h-6" />
            </button>
        </motion.div>
    )
}

function CardNivelamento({
    sugestao,
    onIniciar
}: {
    sugestao: SugestaoNivelamento
    onIniciar: () => void
}) {
    // Implementa LAYOUT e COPYWRITING RIGOROSO do PROMPT 2
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-slate-100 rounded-[40px] p-10 md:p-14 soft-shadow h-full flex flex-col items-center relative overflow-hidden group hover:border-orange-500/30 transition-all"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-white -z-10" />
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <Sparkles className="w-40 h-40 text-orange-500" />
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-lg relative z-10 w-full">
                <div>
                    {/* Badge: AVALIAÇÃO INICIAL */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <Sparkles className="w-3 h-3" />
                        AVALIAÇÃO INICIAL
                    </div>
                    {/* Título: Nivelar conhecimento */}
                    <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-[0.9] mb-4">
                        Nivelar <br />
                        <span className="text-orange-500 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">conhecimento</span>
                    </h3>
                    <p className="text-xl font-bold text-[#1A1033] mb-2">{sugestao.nome}</p>
                    {/* Descrição: Este assunto ainda não foi avaliado... */}
                    <p className="text-slate-500 font-medium text-base leading-relaxed max-w-sm mx-auto">
                        {srsRules.cards.NIVELAMENTO.descricao || "Este assunto ainda não foi avaliado. Antes de revisar, precisamos entender seu nível atual."}
                    </p>
                </div>
            </div>

            <div className="mt-10 w-full max-w-md">
                <button
                    onClick={onIniciar}
                    className="relative group/btn z-30 w-full"
                >
                    <div className="absolute -inset-1 bg-orange-500/30 rounded-2xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    {/* Botão: INICIAR NIVELAMENTO */}
                    <div className="relative bg-[#1A1033] text-white py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all">
                        {srsRules.cards.NIVELAMENTO.cta || "INICIAR NIVELAMENTO"}
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </button>
            </div>
        </motion.div>
    )
}
