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
    Flame
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { SessaoModal } from './sessao-modal'

interface DashboardData {
    success: boolean
    data_hoje: string
    revisoes_atrasadas: RevisaoItem[]
    revisoes_do_dia: RevisaoItem[]
    sugestao_nivelamento: SugestaoNivelamento | null
    resumo: {
        total_atrasadas: number
        total_do_dia: number
        tem_sugestao: boolean
    }
}

interface RevisaoItem {
    agenda_id: string
    assunto_id: string
    nome: string
    specialty_id: string
    data_programada: string
    dias_atrasado?: number
    nivel_atual: number
    ultima_nota: number
}

interface SugestaoNivelamento {
    assunto_id: string
    nome: string
    specialty_id: string
    questoes_disponiveis: number
}

export function DashboardDiario() {
    const { user } = useAuth()
    const [dashboard, setDashboard] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Estado do modal de sessão
    const [sessaoAberta, setSessaoAberta] = useState(false)
    const [sessaoAssuntoId, setSessaoAssuntoId] = useState<string>('')
    const [sessaoTipo, setSessaoTipo] = useState<'NIVELAMENTO' | 'REVISAO'>('NIVELAMENTO')

    useEffect(() => {
        if (!user?.id) return

        const fetchDashboardLocal = async () => {
            try {
                setLoading(true)
                // Import dinâmico do createClient se não estiver disponível ou usar a instância global
                // Como este é um componente "use client", podemos importar do @/lib/supabase
                // Mas para garantir, vou usar imports no topo.

                const { supabase } = await import('@/lib/supabase')
                const hoje = new Date().toISOString().split('T')[0]

                // 1. Buscar revisões ATRASADAS
                const { data: atrasadas, error: errAtrasadas } = await supabase
                    .from('agenda_revisoes')
                    .select(`
                        id,
                        data_programada,
                        assunto_id,
                        assuntos (id, nome, specialty_id),
                        assunto_progresso (nivel_atual, ultima_nota)
                    `)
                    .eq('user_id', user.id)
                    .eq('status', 'ATRASADA')
                    .order('data_programada', { ascending: true })

                if (errAtrasadas) throw errAtrasadas

                // 2. Buscar revisões DO DIA
                const { data: doDia, error: errDoDia } = await supabase
                    .from('agenda_revisoes')
                    .select(`
                        id,
                        data_programada,
                        assunto_id,
                        assuntos (id, nome, specialty_id),
                        assunto_progresso (nivel_atual, ultima_nota)
                    `)
                    .eq('user_id', user.id)
                    .eq('data_programada', hoje)
                    .eq('status', 'PENDENTE')
                    .order('data_programada', { ascending: true })

                if (errDoDia) throw errDoDia

                // 3. Sugestão de Nivelamento
                // Buscar assuntos já nivelados
                const { data: progressos } = await supabase
                    .from('assunto_progresso')
                    .select('assunto_id')
                    .eq('user_id', user.id)

                const niveladosIds = new Set(progressos?.map(p => p.assunto_id) || [])

                // Buscar um assunto não nivelado
                // Precisamos buscar assuntos e filtrar no cliente ou fazer um 'not.in' se a lista for pequena
                // Vamos tentar buscar 20 assuntos e achar o primeiro não nivelado
                const { data: candidatos } = await supabase
                    .from('assuntos')
                    .select('*')
                    .limit(50)

                let sugestao = null
                if (candidatos) {
                    for (const cand of candidatos) {
                        if (!niveladosIds.has(cand.id)) {
                            // Verificar se tem questões
                            const { count } = await supabase
                                .from('questao_base')
                                .select('*', { count: 'exact', head: true })
                                .eq('specialty_id', cand.specialty_id)
                                .eq('status_validacao', 'APROVADA')

                            if (count && count >= 10) {
                                sugestao = {
                                    assunto_id: cand.id,
                                    nome: cand.nome,
                                    specialty_id: cand.specialty_id,
                                    questoes_disponiveis: count
                                }
                                break
                            }
                        }
                    }
                }

                // 4. Formatar
                const formatRevisao = (r: any) => {
                    const assunto = Array.isArray(r.assuntos) ? r.assuntos[0] : r.assuntos
                    const progresso = Array.isArray(r.assunto_progresso) ? r.assunto_progresso[0] : r.assunto_progresso
                    const dias = Math.floor((new Date().getTime() - new Date(r.data_programada).getTime()) / (1000 * 60 * 60 * 24))

                    return {
                        agenda_id: r.id,
                        assunto_id: r.assunto_id,
                        nome: assunto?.nome || 'Assunto desconhecido',
                        specialty_id: assunto?.specialty_id,
                        data_programada: r.data_programada,
                        dias_atrasado: dias,
                        nivel_atual: progresso?.nivel_atual || 0,
                        ultima_nota: progresso?.ultima_nota || 0
                    }
                }

                setDashboard({
                    success: true,
                    data_hoje: hoje,
                    revisoes_atrasadas: (atrasadas || []).map(formatRevisao),
                    revisoes_do_dia: (doDia || []).map(formatRevisao),
                    sugestao_nivelamento: sugestao,
                    resumo: {
                        total_atrasadas: (atrasadas || []).length,
                        total_do_dia: (doDia || []).length,
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
    }, [user?.id])

    const handleIniciarSessao = (assunto_id: string, tipo: 'NIVELAMENTO' | 'REVISAO') => {
        setSessaoAssuntoId(assunto_id)
        setSessaoTipo(tipo)
        setSessaoAberta(true)
    }

    const handleSessaoComplete = () => {
        // Recarregar dashboard (trigger reload changing key or refetching)
        // Simplificação: reload page ou refetch manual. 
        // Como o useEffect depende de user?.id, podemos forçar update ou recarregar página.
        window.location.reload()
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

    const { revisoes_atrasadas, revisoes_do_dia, sugestao_nivelamento, resumo } = dashboard

    // Se não há nada para fazer
    if (resumo.total_atrasadas === 0 && resumo.total_do_dia === 0 && !resumo.tem_sugestao) {
        return (
            <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">
                    Tudo em Dia! 🎉
                </h3>
                <p className="text-muted-foreground font-medium">
                    Você está em dia com todos os seus estudos. Continue assim!
                </p>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-foreground">
                            Sua Agenda de <span className="text-primary">Hoje</span>
                        </h2>
                        <p className="text-sm text-muted-foreground font-medium mt-1">
                            {new Date(dashboard.data_hoje).toLocaleDateString('pt-BR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                            })}
                        </p>
                    </div>

                    {/* Resumo Rápido */}
                    <div className="hidden md:flex items-center gap-4">
                        {resumo.total_atrasadas > 0 && (
                            <div className="flex items-center gap-2 bg-destructive/10 px-4 py-2 rounded-full">
                                <Flame className="w-4 h-4 text-destructive" />
                                <span className="text-sm font-bold text-destructive">
                                    {resumo.total_atrasadas} atrasada{resumo.total_atrasadas > 1 ? 's' : ''}
                                </span>
                            </div>
                        )}
                        {resumo.total_do_dia > 0 && (
                            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm font-bold text-primary">
                                    {resumo.total_do_dia} hoje
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Revisões Atrasadas */}
                <AnimatePresence>
                    {revisoes_atrasadas.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-destructive" />
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-destructive">
                                    Revisões Atrasadas
                                </h3>
                            </div>

                            <div className="grid gap-4">
                                {revisoes_atrasadas.map((revisao, index) => (
                                    <CardRevisaoAtrasada
                                        key={revisao.agenda_id}
                                        revisao={revisao}
                                        index={index}
                                        onIniciar={() => handleIniciarSessao(revisao.assunto_id, 'REVISAO')}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Revisões do Dia */}
                <AnimatePresence>
                    {revisoes_do_dia.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-primary">
                                    Revisões de Hoje
                                </h3>
                            </div>

                            <div className="grid gap-4">
                                {revisoes_do_dia.map((revisao, index) => (
                                    <CardRevisaoDoDia
                                        key={revisao.agenda_id}
                                        revisao={revisao}
                                        index={index}
                                        onIniciar={() => handleIniciarSessao(revisao.assunto_id, 'REVISAO')}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Sugestão de Nivelamento */}
                <AnimatePresence>
                    {sugestao_nivelamento && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-orange-500" />
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-orange-500">
                                    Novo Nivelamento Sugerido
                                </h3>
                            </div>

                            <CardNivelamento
                                sugestao={sugestao_nivelamento}
                                onIniciar={() => handleIniciarSessao(sugestao_nivelamento.assunto_id, 'NIVELAMENTO')}
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

// Card de Revisão Atrasada (Vermelho)
function CardRevisaoAtrasada({
    revisao,
    index,
    onIniciar
}: {
    revisao: RevisaoItem
    index: number
    onIniciar: () => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-destructive/5 border-2 border-destructive/20 rounded-3xl p-6 hover:border-destructive/40 transition-all group relative overflow-hidden"
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-destructive/10 px-3 py-1 rounded-full">
                            <span className="text-xs font-black uppercase tracking-widest text-destructive">
                                {revisao.dias_atrasado} dia{revisao.dias_atrasado! > 1 ? 's' : ''} atrasado
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-bold text-muted-foreground">
                                Nível {revisao.nivel_atual.toFixed(1)}
                            </span>
                        </div>
                    </div>

                    <h4 className="text-lg font-black italic uppercase tracking-tighter text-foreground mb-1">
                        {revisao.nome}
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium">
                        Última nota: {revisao.ultima_nota.toFixed(1)}/10
                    </p>
                </div>

                <button
                    onClick={onIniciar}
                    className="flex items-center gap-2 bg-destructive text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-destructive/20"
                >
                    Revisar Agora
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    )
}

// Card de Revisão do Dia (Roxo)
function CardRevisaoDoDia({
    revisao,
    index,
    onIniciar
}: {
    revisao: RevisaoItem
    index: number
    onIniciar: () => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-primary/5 border-2 border-primary/20 rounded-3xl p-6 hover:border-primary/40 transition-all group relative overflow-hidden"
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary/10 px-3 py-1 rounded-full">
                            <span className="text-xs font-black uppercase tracking-widest text-primary">
                                Programada para hoje
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-bold text-muted-foreground">
                                Nível {revisao.nivel_atual.toFixed(1)}
                            </span>
                        </div>
                    </div>

                    <h4 className="text-lg font-black italic uppercase tracking-tighter text-foreground mb-1">
                        {revisao.nome}
                    </h4>
                    <p className="text-sm text-muted-foreground font-medium">
                        Última nota: {revisao.ultima_nota.toFixed(1)}/10
                    </p>
                </div>

                <button
                    onClick={onIniciar}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                    Iniciar
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    )
}

// Card de Nivelamento (Gradiente Laranja)
function CardNivelamento({
    sugestao,
    onIniciar
}: {
    sugestao: SugestaoNivelamento
    onIniciar: () => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent border-2 border-orange-500/20 rounded-3xl p-8 hover:border-orange-500/40 transition-all group relative overflow-hidden"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-orange-500 fill-orange-500" />
                            </div>
                            <div className="bg-orange-500/10 px-3 py-1 rounded-full">
                                <span className="text-xs font-black uppercase tracking-widest text-orange-500">
                                    Não Nivelado
                                </span>
                            </div>
                        </div>

                        <h4 className="text-2xl font-black italic uppercase tracking-tighter text-foreground mb-2">
                            {sugestao.nome}
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium">
                            {sugestao.questoes_disponiveis} questões disponíveis • 10 questões para nivelamento
                        </p>
                    </div>
                </div>

                <button
                    onClick={onIniciar}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-500/20"
                >
                    Iniciar Nivelamento
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    )
}
