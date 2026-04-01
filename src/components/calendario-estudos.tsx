"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Lock,
    RefreshCcw,
    Flag
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'

import { SessaoModal } from './sessao-modal'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useErrors } from '@/store/use-errors'

type Visao = 'DIA' | 'SEMANA' | 'MES'

interface CalendarioData {
    success: boolean
    visao: Visao
    data_referencia: string
    periodo: {
        inicio: string
        fim: string
    }
    revisoes: RevisaoItem[]
    por_data: Record<string, RevisaoItem[]>
    estatisticas: {
        total: number
        concluidas: number
        pendentes: number
        atrasadas: number
    }
}

interface RevisaoItem {
    agenda_id: string
    assunto_id: string
    nome: string
    specialty_id: string
    data_programada: string
    status: 'PENDENTE' | 'CONCLUIDA' | 'ATRASADA'
    nivel_atual: number
    ultima_nota: number
}

interface CalendarioEstudosProps {
    plano?: 'FREE' | 'PREMIUM' | 'INSANO'
}

export function CalendarioEstudos({ plano = 'FREE' }: CalendarioEstudosProps) {
    const { user } = useAuth()
    const [visao, setVisao] = useState<Visao>('DIA')
    const [dataReferencia, setDataReferencia] = useState(new Date())
    const [calendario, setCalendario] = useState<CalendarioData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [folgas, setFolgas] = useState<string[]>([])

    const load_folgas = async (userId: string) => {
        if (!isSupabaseConfigured()) return
        const { data } = await supabase.from('user_folgas').select('data').eq('user_id', userId)
        if (data) {
            setFolgas(data.map((d: any) => d.data))
        }
    }
    const [localFolgas, setLocalFolgas] = useState<string[]>([]) // For optimistic updates if needed, but let's use store

    // Estado do modal de sessão
    const [sessaoAberta, setSessaoAberta] = useState(false)
    const [sessaoAssuntoId, setSessaoAssuntoId] = useState<string>('')

    // Validação de plano
    const visoesPermitidas: Record<string, Visao[]> = {
        FREE: ['DIA'],
        PREMIUM: ['DIA', 'SEMANA'],
        INSANO: ['DIA', 'SEMANA', 'MES']
    }

    const podeAcessarVisao = (v: Visao) => visoesPermitidas[plano].includes(v)

    useEffect(() => {
        if (!user?.id) return

        const fetchFolgas = async () => {
            if (user?.id) await load_folgas(user.id)
        }

        const fetchCalendarioLocal = async () => {
            try {
                setLoading(true)
                const dataRefDate = new Date(dataReferencia)
                const dataRef = dataRefDate.toISOString().split('T')[0]

                // Calcular intervalo de datas baseado na visão
                let dataInicio: string
                let dataFim: string

                switch (visao) {
                    case 'DIA':
                        dataInicio = dataRef
                        dataFim = dataRef
                        break

                    case 'SEMANA':
                        // Início da semana (domingo)
                        const diaSemana = dataRefDate.getDay()
                        const inicioSemana = new Date(dataRefDate)
                        inicioSemana.setDate(dataRefDate.getDate() - diaSemana)

                        // Fim da semana (sábado)
                        const fimSemana = new Date(inicioSemana)
                        fimSemana.setDate(inicioSemana.getDate() + 6)

                        dataInicio = inicioSemana.toISOString().split('T')[0]
                        dataFim = fimSemana.toISOString().split('T')[0]
                        break

                    case 'MES':
                        // Primeiro dia do mês
                        const inicioMes = new Date(dataRefDate.getFullYear(), dataRefDate.getMonth(), 1)

                        // Último dia do mês
                        const fimMes = new Date(dataRefDate.getFullYear(), dataRefDate.getMonth() + 1, 0)

                        dataInicio = inicioMes.toISOString().split('T')[0]
                        dataFim = fimMes.toISOString().split('T')[0]
                        break
                }

                // Buscar revisões no client side
                const { data: revisoes, error: revisoesError } = await supabase
                    .from('agenda_revisoes')
                    .select(`
                        id,
                        assunto_id,
                        data_programada,
                        status,
                        assuntos (id, nome, specialty_id),
                        assunto_progresso (nivel_atual, ultima_nota)
                    `)
                    .eq('user_id', user.id)
                    .gte('data_programada', dataInicio)
                    .lte('data_programada', dataFim)
                    .order('data_programada', { ascending: true })

                if (revisoesError) throw revisoesError

                // Formatar dados
                const revisoesFormatadas: RevisaoItem[] = (revisoes || []).map((r: any) => {
                    const assunto = Array.isArray(r.assuntos) ? r.assuntos[0] : r.assuntos
                    const progresso = Array.isArray(r.assunto_progresso) ? r.assunto_progresso[0] : r.assunto_progresso

                    return {
                        agenda_id: r.id,
                        assunto_id: r.assunto_id,
                        nome: assunto?.nome || 'Assunto desconhecido',
                        specialty_id: assunto?.specialty_id || '',
                        data_programada: r.data_programada,
                        status: r.status,
                        nivel_atual: progresso?.nivel_atual || 0,
                        ultima_nota: progresso?.ultima_nota || 0
                    }
                })

                // Agrupar por data (para facilitar renderização)
                const porData: Record<string, RevisaoItem[]> = {}
                revisoesFormatadas.forEach(r => {
                    if (!porData[r.data_programada]) {
                        porData[r.data_programada] = []
                    }
                    porData[r.data_programada].push(r)
                })

                // Calcular estatísticas
                const totalRevisoes = revisoesFormatadas.length
                const concluidas = revisoesFormatadas.filter(r => r.status === 'CONCLUIDA').length
                const pendentes = revisoesFormatadas.filter(r => r.status === 'PENDENTE').length
                const atrasadas = revisoesFormatadas.filter(r => r.status === 'ATRASADA').length

                setCalendario({
                    success: true,
                    visao,
                    data_referencia: dataRef,
                    periodo: {
                        inicio: dataInicio,
                        fim: dataFim
                    },
                    revisoes: revisoesFormatadas,
                    por_data: porData,
                    estatisticas: {
                        total: totalRevisoes,
                        concluidas,
                        pendentes,
                        atrasadas
                    }
                })

            } catch (err: any) {
                console.error('Error fetching calendario local:', err)
                setError('Erro ao carregar dados do calendário.')
            } finally {
                setLoading(false)
            }
        }

        fetchFolgas()
        fetchCalendarioLocal()
    }, [user?.id, visao, dataReferencia])

    const toggleFolga = async (dateStr: string) => {
        if (!user?.id || !isSupabaseConfigured()) return

        const isFolga = folgas.includes(dateStr)
        if (isFolga) {
            await supabase
                .from('user_folgas')
                .delete()
                .eq('user_id', user.id)
                .eq('data', dateStr)
        } else {
            await supabase
                .from('user_folgas')
                .insert({ user_id: user.id, data: dateStr })
        }
        await load_folgas(user.id)
    }

    const handleMudarVisao = (novaVisao: Visao) => {
        if (!podeAcessarVisao(novaVisao)) {
            // TODO: Mostrar modal de upgrade
            alert(`Visão ${novaVisao} disponível apenas no plano ${novaVisao === 'SEMANA' ? 'PREMIUM' : 'INSANO'}`)
            return
        }
        setVisao(novaVisao)
    }

    const handleAnterior = () => {
        const nova = new Date(dataReferencia)
        switch (visao) {
            case 'DIA':
                nova.setDate(nova.getDate() - 1)
                break
            case 'SEMANA':
                nova.setDate(nova.getDate() - 7)
                break
            case 'MES':
                nova.setMonth(nova.getMonth() - 1)
                break
        }
        setDataReferencia(nova)
    }

    const handleProximo = () => {
        const nova = new Date(dataReferencia)
        switch (visao) {
            case 'DIA':
                nova.setDate(nova.getDate() + 1)
                break
            case 'SEMANA':
                nova.setDate(nova.getDate() + 7)
                break
            case 'MES':
                nova.setMonth(nova.getMonth() + 1)
                break
        }
        setDataReferencia(nova)
    }

    const handleHoje = () => {
        setDataReferencia(new Date())
    }

    const handleIniciarRevisao = (assunto_id: string) => {
        setSessaoAssuntoId(assunto_id)
        setSessaoAberta(true)
    }

    const handleSessaoComplete = () => {
        // Recarregar calendário
        setDataReferencia(new Date(dataReferencia)) // force effect trigger
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

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-foreground">
                            Calendário de <span className="text-primary">Estudos</span>
                        </h2>
                        <p className="text-sm text-muted-foreground font-medium mt-1">
                            Organize suas revisões e acompanhe seu progresso
                        </p>
                    </div>

                    {/* Estatísticas */}
                    {calendario && (
                        <div className="flex items-center gap-3">
                            <div className="bg-green-500/10 px-3 py-2 rounded-full flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-bold text-green-500">
                                    {calendario.estatisticas.concluidas}
                                </span>
                            </div>
                            <div className="bg-primary/10 px-3 py-2 rounded-full flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm font-bold text-primary">
                                    {calendario.estatisticas.pendentes}
                                </span>
                            </div>
                            <div className="bg-destructive/10 px-3 py-2 rounded-full flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-destructive" />
                                <span className="text-sm font-bold text-destructive">
                                    {calendario.estatisticas.atrasadas}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Controles */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-card border border-border rounded-2xl p-4">
                    {/* Seletor de Visão */}
                    <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
                        {(['DIA', 'SEMANA', 'MES'] as Visao[]).map((v) => (
                            <button
                                key={v}
                                onClick={() => handleMudarVisao(v)}
                                disabled={!podeAcessarVisao(v)}
                                className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${visao === v
                                    ? 'bg-primary text-white shadow-lg'
                                    : podeAcessarVisao(v)
                                        ? 'text-muted-foreground hover:text-foreground'
                                        : 'text-muted-foreground/50 cursor-not-allowed'
                                    }`}
                            >
                                {v}
                                {!podeAcessarVisao(v) && <Lock className="w-3 h-3 inline ml-1" />}
                            </button>
                        ))}
                    </div>

                    {/* Navegação */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleAnterior}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={handleHoje}
                            className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg font-bold text-sm transition-colors"
                        >
                            Hoje
                        </button>

                        <button
                            onClick={handleProximo}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Conteúdo do Calendário */}
                {calendario && (
                    <AnimatePresence mode="wait">
                        {visao === 'DIA' && (
                            <VisaoDia
                                key="dia"
                                calendario={calendario}
                                onIniciarRevisao={handleIniciarRevisao}
                                folgas={folgas}
                                onToggleFolga={toggleFolga}
                            />
                        )}
                        {visao === 'SEMANA' && (
                            <VisaoSemana
                                key="semana"
                                calendario={calendario}
                                onIniciarRevisao={handleIniciarRevisao}
                                folgas={folgas}
                                onToggleFolga={toggleFolga}
                            />
                        )}
                        {visao === 'MES' && (
                            <VisaoMes
                                key="mes"
                                calendario={calendario}
                                onIniciarRevisao={handleIniciarRevisao}
                                folgas={folgas}
                                onToggleFolga={toggleFolga}
                            />
                        )}
                    </AnimatePresence>
                )}
            </div>

            {/* Modal de Sessão */}
            <SessaoModal
                isOpen={sessaoAberta}
                onClose={() => setSessaoAberta(false)}
                assunto_id={sessaoAssuntoId}
                tipo="REVISAO"
                onComplete={handleSessaoComplete}
            />
        </>
    )
}

// Visão DIA - Lista de tarefas
function VisaoDia({
    calendario,
    onIniciarRevisao,
    folgas,
    onToggleFolga
}: {
    calendario: CalendarioData
    onIniciarRevisao: (assunto_id: string) => void
    folgas: string[]
    onToggleFolga: (date: string) => void
}) {
    const data = new Date(calendario.data_referencia)
    const dateStr = calendario.data_referencia
    const isFolga = folgas.includes(dateStr)
    const revisoesDoDia = isFolga ? [] : (calendario.por_data[dateStr] || [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
        >
            <div className="flex flex-col items-center justify-center py-4 gap-2">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-foreground">
                    {data.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </h3>
                <button
                    onClick={() => onToggleFolga(dateStr)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all gap-1.5 flex items-center border ${isFolga
                        ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20'
                        : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                >
                    <Clock className={`w-3.5 h-3.5 ${isFolga ? 'hidden' : ''}`} />
                    <RefreshCcw className={`w-3.5 h-3.5 animate-spin ${isFolga ? '' : 'hidden'}`} />
                    {isFolga ? 'Dia de Folga (Ativado)' : 'Marcar como Folga'}
                </button>
            </div>

            {isFolga ? (
                <div className="bg-rose-50 border-2 border-rose-100 rounded-[40px] p-16 text-center">
                    <div className="w-20 h-20 bg-rose-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-rose-500/20">
                        <CalendarIcon className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black italic text-rose-500 uppercase tracking-tighter mb-4">DIA DE DESCANSO</h2>
                    <p className="text-rose-400 font-bold max-w-sm mx-auto uppercase text-xs tracking-[0.2em] leading-relaxed">
                        Recarregue suas energias. <br />Não há revisões programadas para hoje.
                    </p>
                </div>
            ) : revisoesDoDia.length === 0 ? (
                <div className="bg-card border border-border rounded-3xl p-12 text-center">
                    <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground font-medium">
                        Nenhuma revisão programada para este dia
                    </p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {revisoesDoDia.map((revisao, index) => (
                        <CardRevisao
                            key={revisao.agenda_id}
                            revisao={revisao}
                            index={index}
                            onIniciar={() => onIniciarRevisao(revisao.assunto_id)}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    )
}

// Visão SEMANA - Grid de 7 dias
function VisaoSemana({
    calendario,
    onIniciarRevisao,
    folgas,
    onToggleFolga
}: {
    calendario: CalendarioData
    onIniciarRevisao: (assunto_id: string) => void
    folgas: string[]
    onToggleFolga: (date: string) => void
}) {
    const inicio = new Date(calendario.periodo.inicio)
    // O problema de datas em JS... a conversão precisa ser correta. 
    // Como a data ISO já vem certa do estado, vamos parsear com replace
    const dias = Array.from({ length: 7 }, (_, i) => {
        const dia = new Date(inicio)
        dia.setDate(inicio.getDate() + i + 1) // Correção de fuso se necessário, mas new Date(string) é UTC. 
        // Vamos usar dia simples.
        const dt = new Date(inicio)
        dt.setDate(inicio.getDate() + i)
        return dt
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-7 gap-2"
        >
            {dias.map((dia, index) => {
                const dataStr = dia.toISOString().split('T')[0]
                const revisoes = calendario.por_data[dataStr] || []
                const isHoje = dataStr === new Date().toISOString().split('T')[0]

                const isFolga = folgas.includes(dataStr)

                return (
                    <div
                        key={dataStr}
                        onClick={() => onToggleFolga(dataStr)}
                        className={`bg-card border rounded-2xl p-3 min-h-[120px] cursor-pointer transition-all hover:border-primary/50 relative group ${isFolga ? 'bg-rose-50 border-rose-100 opacity-80' : isHoje ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                            }`}
                    >
                        {isFolga && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                <CalendarIcon className="w-12 h-12 text-rose-500" />
                            </div>
                        )}
                        <div className="text-center mb-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase">
                                {dia.toLocaleDateString('pt-BR', { weekday: 'short' })}
                            </p>
                            <p className={`text-lg font-black ${isFolga ? 'text-rose-500' : isHoje ? 'text-primary' : 'text-foreground'}`}>
                                {dia.getUTCDate()}
                            </p>
                        </div>

                        {!isFolga && (
                            <div className="space-y-1">
                                {revisoes.slice(0, 3).map((r) => (
                                    <button
                                        key={r.agenda_id}
                                        onClick={() => onIniciarRevisao(r.assunto_id)}
                                        className={`w-full text-left px-2 py-1 rounded-lg text-xs font-bold truncate ${r.status === 'CONCLUIDA'
                                            ? 'bg-green-500/10 text-green-500'
                                            : r.status === 'ATRASADA'
                                                ? 'bg-destructive/10 text-destructive'
                                                : 'bg-primary/10 text-primary hover:bg-primary/20'
                                            }`}
                                    >
                                        {r.nome}
                                    </button>
                                ))}
                                {revisoes.length > 3 && (
                                    <p className="text-xs text-muted-foreground text-center">
                                        +{revisoes.length - 3} mais
                                    </p>
                                )}
                            </div>
                        )}
                        {isFolga && (
                            <p className="text-[10px] font-black text-rose-400 text-center uppercase tracking-tighter mt-4">FOLGA</p>
                        )}
                    </div>
                )
            })}
        </motion.div>
    )
}

// Visão MÊS - Grid mensal
function VisaoMes({
    calendario,
    onIniciarRevisao,
    folgas,
    onToggleFolga
}: {
    calendario: CalendarioData
    onIniciarRevisao: (assunto_id: string) => void
    folgas: string[]
    onToggleFolga: (date: string) => void
}) {
    const dataRefDate = new Date(calendario.data_referencia)
    const primeiroDia = new Date(dataRefDate.getFullYear(), dataRefDate.getMonth(), 1)
    const ultimoDia = new Date(dataRefDate.getFullYear(), dataRefDate.getMonth() + 1, 0)

    // Dias do mês
    const dias: Date[] = []

    // Loop simples para preencher dias
    // Usar datas com timezone offset corrigido para evitar problemas
    // Mas simplificando:
    const temp = new Date(primeiroDia)
    while (temp <= ultimoDia) {
        dias.push(new Date(temp))
        temp.setDate(temp.getDate() + 1)
    }

    // Preencher início (dias da semana anterior)
    const diaSemanaInicio = primeiroDia.getDay()
    for (let i = 0; i < diaSemanaInicio; i++) {
        const d = new Date(dias[0])
        d.setDate(d.getDate() - 1)
        dias.unshift(d)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
        >
            <div className="text-center">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-foreground">
                    {dataRefDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </h3>
            </div>

            {/* Cabeçalho dos dias da semana */}
            <div className="grid grid-cols-7 gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                    <div key={dia} className="text-center text-xs font-bold text-muted-foreground uppercase">
                        {dia}
                    </div>
                ))}
            </div>

            {/* Grid de dias */}
            <div className="grid grid-cols-7 gap-2">
                {dias.map((dia, index) => {
                    const dataStr = dia.toISOString().split('T')[0]
                    const revisoes = calendario.por_data[dataStr] || []
                    const isHoje = dataStr === new Date().toISOString().split('T')[0]
                    const isOutroMes = dia.getMonth() !== dataRefDate.getMonth()

                    const isFolga = folgas.includes(dataStr)

                    return (
                        <div
                            key={index}
                            onClick={() => onToggleFolga(dataStr)}
                            className={`bg-card border rounded-xl p-2 min-h-[80px] cursor-pointer transition-all hover:bg-slate-50 relative ${isFolga ? 'bg-rose-50/50 border-rose-100' :
                                isHoje ? 'border-primary ring-2 ring-primary/20' :
                                    isOutroMes ? 'border-border/50 opacity-50' : 'border-border'
                                }`}
                        >
                            {isFolga && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full" />}
                            <p className={`text-sm font-bold mb-1 ${isFolga ? 'text-rose-500' : isHoje ? 'text-primary' : 'text-foreground'}`}>
                                {dia.getDate()}
                            </p>

                            {!isFolga && revisoes.length > 0 && (
                                <div className="flex items-center gap-1">
                                    {revisoes.slice(0, 3).map((r) => (
                                        <div
                                            key={r.agenda_id}
                                            className={`w-2 h-2 rounded-full ${r.status === 'CONCLUIDA'
                                                ? 'bg-green-500'
                                                : r.status === 'ATRASADA'
                                                    ? 'bg-destructive'
                                                    : 'bg-primary'
                                                }`}
                                        />
                                    ))}
                                    {revisoes.length > 3 && (
                                        <span className="text-[10px] text-muted-foreground">+{revisoes.length - 3}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}

// Card de Revisão (usado na visão DIA)
function CardRevisao({
    revisao,
    index,
    onIniciar
}: {
    revisao: RevisaoItem
    index: number
    onIniciar: () => void
}) {
    const statusConfig = {
        CONCLUIDA: {
            bg: 'bg-green-500/5',
            border: 'border-green-500/20',
            badge: 'bg-green-500/10 text-green-500',
            icon: CheckCircle2,
            label: 'Concluída'
        },
        ATRASADA: {
            bg: 'bg-destructive/5',
            border: 'border-destructive/20',
            badge: 'bg-destructive/10 text-destructive',
            icon: AlertTriangle,
            label: 'Atrasada'
        },
        PENDENTE: {
            bg: 'bg-primary/5',
            border: 'border-primary/20',
            badge: 'bg-primary/10 text-primary',
            icon: Clock,
            label: 'Pendente'
        }
    }

    const config = statusConfig[revisao.status]
    const Icon = config.icon

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`${config.bg} border-2 ${config.border} rounded-3xl p-6 hover:border-primary/40 transition-all group relative overflow-hidden`}
        >
            <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`px-3 py-1 rounded-full ${config.badge}`}>
                            <span className="text-xs font-black uppercase tracking-widest flex items-center gap-1">
                                <Icon className="w-3 h-3" />
                                {config.label}
                            </span>
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">
                            Nível {revisao.nivel_atual.toFixed(1)}
                        </span>
                    </div>

                    <h4 className="text-lg font-black italic uppercase tracking-tighter text-foreground mb-1">
                        {revisao.nome}
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium">
                        Última nota: {revisao.ultima_nota.toFixed(1)}/10
                    </p>
                </div>

                {revisao.status !== 'CONCLUIDA' && (
                    <button
                        onClick={onIniciar}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                    >
                        Revisar
                    </button>
                )}
            </div>
        </motion.div>
    )
}
