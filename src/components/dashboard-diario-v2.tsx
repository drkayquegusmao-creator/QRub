"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    AlertTriangle,
    Calendar,
    Sparkles,
    ArrowRight,
    Clock,
    Zap,
    LayoutGrid,
    CalendarDays,
    List,
    Search,
    ChevronDown,
    Check
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useQuestions } from '@/store/use-questions'
import { SessaoModal } from './sessao-modal'
import { CalendarView } from './calendar-view'
import { useRouter, useSearchParams } from 'next/navigation'
import { MemoryMapView } from './memory-map-view'
import NivelamentoModule from './nivelamento-module'
import { ScopeConfig } from '@/lib/nivelamento-service'
import { useSRS } from '@/store/use-srs'

interface DashboardData {
    success: boolean
    data_hoje: string
    revisoes_atrasadas: any[]
    revisoes_do_dia: any[]
    sugestao_nivelamento: any | null
    erros_ativos: any[]
    todos_eventos: any[]
    resumo: {
        total_atrasadas: number
        total_do_dia: number
        total_erros: number
        tem_sugestao: boolean
    }
}

export function DashboardDiario() {
    const { user } = useAuth()
    const router = useRouter()
    const { questions } = useQuestions()
    const { load_agenda, load_progress, init_taxonomy, agenda, taxonomy, subjects } = useSRS()
    
    const [dashboard, setDashboard] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const searchParams = useSearchParams()
    
    // View Mode State
    const [viewMode, setViewMode] = useState<'AGENDA' | 'CALENDARIO' | 'MAPA' | 'NIVELAMENTO'>('AGENDA')
    const [expandedSpecialty, setExpandedSpecialty] = useState<string | null>(null)
    const [searchLeveling, setSearchLeveling] = useState('')

    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab === 'MAPA') setViewMode('MAPA')
        else if (tab === 'CALENDARIO') setViewMode('CALENDARIO')
        else if (tab === 'NIVELAMENTO') setViewMode('NIVELAMENTO')
        else setViewMode('AGENDA')
    }, [searchParams])

    const [sessaoAberta, setSessaoAberta] = useState(false)
    const [sessaoAssuntoId, setSessaoAssuntoId] = useState<string>('')
    const [sessaoTipo, setSessaoTipo] = useState<'NIVELAMENTO' | 'REVISAO' | 'CADERNO_ERROS'>('NIVELAMENTO')
    const [sessaoSRS, setSessaoSRS] = useState<{ isNew: boolean, agendaId?: string, scope?: ScopeConfig }>({ isNew: false })

    useEffect(() => {
        if (!user?.id) return

        const fetchDashboardData = async () => {
            try {
                setLoading(true)
                await Promise.all([
                    load_agenda(user.id),
                    load_progress(user.id),
                    init_taxonomy()
                ])
            } catch (err) {
                console.error('Error fetching dashboard data:', err)
                setError('Erro ao sincronizar sua agenda com o servidor.')
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [user?.id, load_agenda, load_progress, init_taxonomy])

    useEffect(() => {
        if (!agenda.loading) {
            setDashboard({
                success: true,
                data_hoje: new Date().toISOString(),
                revisoes_atrasadas: agenda.revisoes_atrasadas,
                revisoes_do_dia: agenda.revisoes_do_dia,
                sugestao_nivelamento: agenda.sugestao_nivelamento,
                erros_ativos: [], 
                todos_eventos: [
                    ...agenda.revisoes_atrasadas.map(r => ({ ...r, tipo: 'REVISAO', status: 'ATRASADA' })),
                    ...agenda.revisoes_do_dia.map(r => ({ ...r, tipo: 'REVISAO', status: 'PENDENTE' }))
                ],
                resumo: {
                    total_atrasadas: agenda.revisoes_atrasadas.length,
                    total_do_dia: agenda.revisoes_do_dia.length,
                    total_erros: 0,
                    tem_sugestao: !!agenda.sugestao_nivelamento
                }
            })
        }
    }, [agenda])

    const handleIniciarSessao = (assunto_id: string, tipo: 'NIVELAMENTO' | 'REVISAO' | 'CADERNO_ERROS', srsInfo?: { isNew: boolean, agendaId?: string, scope?: ScopeConfig }) => {
        setSessaoAssuntoId(assunto_id)
        setSessaoTipo(tipo)
        setSessaoSRS(srsInfo || { isNew: false })
        setSessaoAberta(true)
    }

    const handleSessaoComplete = () => {
        if (user?.id) load_agenda(user.id)
    }

    const handleCalendarEventClick = (event: any) => {
        handleIniciarSessao(event.assunto_id, event.tipo || 'REVISAO', { isNew: true, agendaId: event.agenda_id || event.id })
    }

    if (loading || agenda.loading) {
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

    if (error || agenda.error) {
        return (
            <div className="bg-destructive/10 border border-destructive/20 rounded-3xl p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-destructive font-bold">{error || agenda.error}</p>
            </div>
        )
    }

    if (!dashboard) return null

    const { revisoes_atrasadas, revisoes_do_dia, sugestao_nivelamento, resumo, todos_eventos } = dashboard

    // Safety check for taxonomy
    const specialtyList = taxonomy.length > 0 && taxonomy[0].specialties ? taxonomy[0].specialties : []

    return (
        <>
            <div className="space-y-8">
                <div className="flex flex-col gap-4">
                    <div className="bg-slate-100 p-2 rounded-3xl flex flex-wrap items-center gap-2 self-start w-full md:w-auto">
                        <button
                            onClick={() => setViewMode('AGENDA')}
                            className={`flex-1 md:flex-none flex justify-center items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'AGENDA' ? 'bg-white shadow-xl text-[#1A1033] dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Agenda Ativa
                            {(resumo.total_atrasadas) > 0 && (
                                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 bg-destructive text-white text-[10px] rounded-full">
                                    {resumo.total_atrasadas}
                                </span>
                            )}
                        </button>
                        
                        <button
                            onClick={() => setViewMode('MAPA')}
                            className={`flex-1 md:flex-none flex justify-center items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'MAPA' ? 'bg-white shadow-xl text-[#1A1033] dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Mapa de Memória
                        </button>

                        <button
                            onClick={() => setViewMode('CALENDARIO')}
                            className={`flex-1 md:flex-none flex justify-center items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'CALENDARIO' ? 'bg-white shadow-xl text-[#1A1033] dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <CalendarDays className="w-4 h-4" />
                            Calendário
                        </button>

                        <button
                            onClick={() => setViewMode('NIVELAMENTO')}
                            className={`flex-1 md:flex-none flex justify-center items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'NIVELAMENTO' ? 'bg-white shadow-xl text-[#1A1033] dark:text-white' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Zap className="w-4 h-4" />
                            Nivelamento
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {viewMode === 'AGENDA' ? (
                        <motion.div key="agenda" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 gap-8">
                            {!sugestao_nivelamento && revisoes_do_dia.length === 0 && revisoes_atrasadas.length === 0 && (
                                <div className="bg-white border-2 border-slate-100 rounded-[50px] p-16 flex flex-col items-center justify-center text-center soft-shadow min-h-[400px]">
                                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                                        <Sparkles className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white mb-4">Tudo Limpo!</h3>
                                    <p className="text-slate-500 font-medium max-w-sm mx-auto">Você zerou sua agenda de hoje. Aproveite para descansar ou nivelar um novo assunto.</p>
                                </div>
                            )}

                            {sugestao_nivelamento && (
                                <CardNivelamento sugestao={sugestao_nivelamento} onIniciar={() => setViewMode('NIVELAMENTO')} />
                            )}

                            {revisoes_atrasadas.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-destructive flex items-center gap-3 px-2">
                                        <Clock className="w-6 h-6" /> Itens em Atraso
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {revisoes_atrasadas.map((revisao, index) => (
                                            <CardRevisaoAtrasada
                                                key={revisao.agenda_id}
                                                revisao={revisao}
                                                index={index}
                                                onIniciar={() => handleIniciarSessao(revisao.assunto_id, 'REVISAO', { isNew: true, agendaId: revisao.agenda_id })}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {revisoes_do_dia.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-primary flex items-center gap-3 px-2">
                                        <Calendar className="w-6 h-6 text-primary" /> Meta Diária
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {revisoes_do_dia.map((revisao, index) => (
                                            <CardRevisaoDoDia
                                                key={revisao.agenda_id}
                                                revisao={revisao}
                                                index={index}
                                                onIniciar={() => handleIniciarSessao(revisao.assunto_id, 'REVISAO', { isNew: true, agendaId: revisao.agenda_id })}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Leveling Browser */}
                            <div className="pt-8 border-t border-slate-100 mt-12 pb-12">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white mb-6 flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-orange-500" /> Nivelar novo assunto
                                </h3>
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

                                    <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                                            {specialtyList.filter((spec: any) => 
                                                searchLeveling === '' || spec.name.toLowerCase().includes(searchLeveling.toLowerCase())
                                            ).map((spec: any) => (
                                                <div key={spec.id} className="space-y-2">
                                                    <button 
                                                        onClick={() => setExpandedSpecialty(expandedSpecialty === spec.id ? null : spec.id)}
                                                        className={`w-full bg-white border-2 p-4 rounded-[25px] flex items-center justify-between transition-all ${expandedSpecialty === spec.id ? 'border-primary shadow-lg' : 'border-slate-100 hover:border-slate-200'}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${expandedSpecialty === spec.id ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>
                                                                <List className="w-4 h-4" />
                                                            </div>
                                                            <p className="font-black italic uppercase text-xs text-[#1A1033] dark:text-white tracking-tight">{spec.name}</p>
                                                        </div>
                                                        <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${expandedSpecialty === spec.id ? 'rotate-180' : ''}`} />
                                                    </button>

                                                    <AnimatePresence>
                                                        {expandedSpecialty === spec.id && (
                                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden px-2 py-2 space-y-2">
                                                                {(spec.subspecialties || []).map((sub: any) => (
                                                                    <div key={sub.id} className="space-y-1">
                                                                        <div className="px-3 py-1.5 text-[9px] font-black uppercase text-slate-400 tracking-widest bg-slate-50/50 rounded-lg ml-4">{sub.name}</div>
                                                                        <div className="ml-8 space-y-1">
                                                                            {(sub.subjects || []).map((subject: any) => {
                                                                                const prog = subjects.find(s => s.id === subject.id)
                                                                                const isLeveled = prog && prog.stage !== 'NEUTRAL'

                                                                                return (
                                                                                    <button 
                                                                                        key={subject.id}
                                                                                        onClick={() => !isLeveled && handleIniciarSessao(subject.id, 'NIVELAMENTO')}
                                                                                        disabled={isLeveled}
                                                                                        className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${isLeveled ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'hover:bg-primary/5 hover:translate-x-1'}`}
                                                                                    >
                                                                                        <div className="flex items-center gap-2">
                                                                                            <span className={`text-[11px] font-bold ${isLeveled ? 'text-slate-400' : 'text-slate-600'}`}>{subject.name}</span>
                                                                                            {isLeveled && <div className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-500 text-[7px] font-black uppercase">Nivelado</div>}
                                                                                        </div>
                                                                                        {!isLeveled && <ArrowRight className="w-3 h-3 text-slate-200" />}
                                                                                    </button>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                ))}
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
                        <motion.div key="mapa" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="pt-4">
                            <MemoryMapView />
                        </motion.div>
                    ) : viewMode === 'NIVELAMENTO' ? (
                        <motion.div key="nivelamento" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="pt-2">
                            <NivelamentoModule />
                        </motion.div>
                    ) : (
                        <motion.div key="calendario" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                            <CalendarView eventos={todos_eventos} onSelectDate={() => {}} onEventClick={handleCalendarEventClick} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <SessaoModal
                isOpen={sessaoAberta}
                onClose={() => setSessaoAberta(false)}
                assunto_id={sessaoAssuntoId}
                tipo={sessaoTipo}
                onComplete={handleSessaoComplete}
                isNewSRS={sessaoSRS.isNew}
                agendaId={sessaoSRS.agendaId}
                scope={sessaoSRS.scope}
            />
        </>
    )
}

function CardNivelamento({ sugestao, onIniciar }: { sugestao: any, onIniciar: () => void }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-primary/5 border-2 border-primary/20 rounded-[40px] p-8 md:p-12 relative overflow-hidden group hover:border-primary/40 transition-all">
            <div className="flex items-center justify-between gap-6 relative z-10 flex-wrap">
                <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">Novo Objetivo</div>
                    <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white mb-2">Nivelar {sugestao.nome}</h3>
                    <p className="text-slate-600 font-medium">Inicie o diagnóstico deste assunto para que o SRS possa calcular sua curva de esquecimento personalizada.</p>
                </div>
                <button onClick={onIniciar} className="bg-primary text-white px-10 py-6 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center gap-3">
                    Começar Nivelamento
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    )
}

function CardRevisaoAtrasada({ revisao, index, onIniciar }: { revisao: any, index: number, onIniciar: () => void }) {
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="bg-white border-l-4 border-destructive p-8 rounded-r-[30px] shadow-sm flex items-center justify-between group hover:bg-destructive/5 transition-all">
            <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-destructive bg-destructive/10 px-2 py-1 rounded inline-block mb-2">Revisão em Atraso</span>
                <h4 className="text-xl font-black text-[#1A1033] dark:text-white mb-1">{revisao.nome}</h4>
                <p className="text-xs font-bold text-slate-400">STATUS: <span className="text-destructive">ATRASADO</span></p>
            </div>
            <button onClick={onIniciar} className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-destructive group-hover:text-white transition-all">
                <ArrowRight className="w-6 h-6" />
            </button>
        </motion.div>
    )
}

function CardRevisaoDoDia({ revisao, index, onIniciar }: { revisao: any, index: number, onIniciar: () => void }) {
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="bg-white border-l-4 border-primary p-8 rounded-r-[30px] shadow-sm flex items-center justify-between group hover:bg-primary/5 transition-all">
            <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded inline-block mb-2">Meta de Hoje</span>
                <h4 className="text-xl font-black text-[#1A1033] dark:text-white mb-1">{revisao.nome}</h4>
                <p className="text-xs font-bold text-slate-400">Nível Atual: <span className="text-primary">{revisao.nivel_atual || 0}</span></p>
            </div>
            <button onClick={onIniciar} className="p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight className="w-6 h-6" />
            </button>
        </motion.div>
    )
}
