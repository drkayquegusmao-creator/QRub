"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, XCircle, Trophy, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { supabase } from '@/lib/supabase'
import { MEDICAL_HIERARCHY } from '@/lib/medical-specialties'

interface SessaoModalProps {
    isOpen: boolean
    onClose: () => void
    assunto_id: string
    tipo: 'NIVELAMENTO' | 'REVISAO' | 'CADERNO_ERROS'
    onComplete?: () => void
}

interface Questao {
    questao_id: string
    ordem: number
    enunciado: string
    case_study?: any
    options: Array<{ id: string; text: string }>
    image_url?: string
    difficulty?: string
}

interface SessaoData {
    sessao_id: string
    tipo: string
    assunto: {
        id: string
        nome: string
        specialty_id: string
    }
    questoes: Questao[]
    total_questoes: number
}

interface Resposta {
    questao_id: string
    resposta: string
    tempo_segundos: number
}

export function SessaoModal({ isOpen, onClose, assunto_id, tipo, onComplete }: SessaoModalProps) {
    const { user } = useAuth()
    const [sessao, setSessao] = useState<SessaoData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [questaoAtual, setQuestaoAtual] = useState(0)
    const [respostas, setRespostas] = useState<Resposta[]>([])
    const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null)
    const [tempoInicio, setTempoInicio] = useState<number>(Date.now())

    const [finalizando, setFinalizando] = useState(false)
    const [resultado, setResultado] = useState<any>(null)

    // Criar sessão ao abrir modal
    useEffect(() => {
        if (!isOpen || !user?.id) return

        const criarSessaoLocal = async () => {
            try {
                setLoading(true)
                setError(null)

                // 1. Buscar detalhes do assunto
                let assunto = null
                // Tenta achar em specialty level (padrão atual do dashboard)
                const spec = MEDICAL_HIERARCHY[0].specialties.find((s: any) => s.id === assunto_id)
                if (spec) {
                    assunto = { id: spec.id, nome: spec.name, specialty_id: spec.id }
                } else {
                    // Deep search
                    MEDICAL_HIERARCHY[0].specialties.forEach(s => {
                        if (s.subspecialties) {
                            s.subspecialties.forEach(sub => {
                                if (sub.id === assunto_id) assunto = { id: sub.id, nome: sub.name, specialty_id: s.id }
                                if (sub.subjects) {
                                    sub.subjects.forEach(subj => {
                                        if (subj.id === assunto_id) assunto = { id: subj.id, nome: subj.name, specialty_id: s.id }
                                    })
                                }
                            })
                        }
                    })
                }

                if (!assunto) {
                    assunto = { id: assunto_id, nome: 'Assunto Desconhecido', specialty_id: assunto_id }
                }

                // 2. Buscar questoes COMPATÍVEIS e ANTI-REPETIÇÃO
                let pool: any[] = []

                if (tipo === 'CADERNO_ERROS') {
                    // Buscar apenas questões com status ATIVA ou EM_RECUPERACAO no caderno
                    const { data: erros } = await supabase
                        .from('caderno_erros')
                        .select('questao_id')
                        .eq('user_id', user.id)
                        .eq('assunto_id', assunto.id)
                        .in('status', ['ATIVA', 'EM_RECUPERACAO'])
                        .limit(20) // Ex: Max 20 pra sortear 10

                    if (!erros || erros.length === 0) {
                        throw new Error('Não há erros ativos para este assunto. Ótimo trabalho!')
                    }

                    const erroIds = erros.map(e => e.questao_id)

                    // Fetch das questões reais
                    const { data: qData } = await supabase
                        .from('questions')
                        .select('*')
                        .in('id', erroIds)

                    pool = qData || []
                } else {
                    // NIVELAMENTO ou REVISAO (Inéditas)
                    const { data: usadas } = await supabase
                        .from('questao_uso_usuario')
                        .select('questao_id')
                        .eq('user_id', user.id)
                        .eq('assunto_id', assunto.id)

                    const usadasIds = new Set(usadas?.map(u => u.questao_id) || [])

                    const { data: qData, error: qError } = await supabase
                        .from('questions')
                        .select('*')
                        .eq('specialty_id', assunto.specialty_id)
                        .limit(200)

                    if (qError) throw qError
                    if (!qData || qData.length === 0) {
                        throw new Error('Nenhuma questão encontrada para este assunto.')
                    }

                    pool = qData.filter(q => !usadasIds.has(q.id))

                    if (pool.length < 10) {
                        // Se faltar inéditas, pega as mais antigas (fallback simples)
                        const usadasDisponiveis = qData.filter(q => usadasIds.has(q.id))
                        pool = [...pool, ...usadasDisponiveis]
                    }
                }

                if (pool.length < 1) { // Flexível pra caderno de erros que pode ter poucas
                    throw new Error(`Questões insuficientes para iniciar a sessão (${pool.length}).`)
                }

                // E. Selecionar 10 (ou todas se < 10)
                const targetCount = Math.min(10, pool.length)
                const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, targetCount)

                // 3. Criar Sessão
                const { data: novaSessao, error: sError } = await supabase
                    .from('sessoes')
                    .insert({
                        user_id: user.id,
                        assunto_id: assunto.id,
                        tipo: tipo,
                        status: 'EM_ANDAMENTO',
                        total_questoes: shuffled.length,
                        total_acertos: 0
                    })
                    .select()
                    .single()

                if (sError) throw sError

                // 4. Criar Itens
                const itens = shuffled.map((q, i) => ({
                    sessao_id: novaSessao.id,
                    user_id: user.id, // Coluna obrigatória adicionada
                    questao_id: q.id,
                    ordem: i + 1
                }))

                const { error: itensError } = await supabase.from('sessao_itens').insert(itens)
                if (itensError) throw itensError

                // 5. Montar Objeto Sessao
                setSessao({
                    sessao_id: novaSessao.id,
                    tipo: tipo,
                    assunto: assunto,
                    total_questoes: shuffled.length,
                    questoes: shuffled.map((q, i) => ({
                        questao_id: q.id,
                        ordem: i + 1,
                        enunciado: q.statement || q.enunciado || 'Enunciado indisponível',
                        // Adapter para suportar diferentes schemas de options
                        options: Array.isArray(q.alternatives) ? q.alternatives : (q.options || []),
                        image_url: q.image_url
                    }))
                })
                setTempoInicio(Date.now())

            } catch (err: any) {
                console.error('Error creating session:', err)
                setError(err.message || 'Erro ao criar sessão. Verifique sua conexão.')
            } finally {
                setLoading(false)
            }
        }

        criarSessaoLocal()
    }, [isOpen, user?.id, assunto_id, tipo])

    const handleResponder = () => {
        if (!respostaSelecionada || !sessao) return

        const tempoDecorrido = Math.floor((Date.now() - tempoInicio) / 1000)
        const questao = sessao.questoes[questaoAtual]

        const novaResposta: Resposta = {
            questao_id: questao.questao_id,
            resposta: respostaSelecionada,
            tempo_segundos: tempoDecorrido
        }

        setRespostas([...respostas, novaResposta])
        setRespostaSelecionada(null)

        // Próxima questão ou finalizar
        if (questaoAtual < sessao.questoes.length - 1) {
            setQuestaoAtual(questaoAtual + 1)
            setTempoInicio(Date.now())
        } else {
            finalizarSessaoLocal([...respostas, novaResposta])
        }
    }

    const finalizarSessaoLocal = async (todasRespostas: Resposta[]) => {
        if (!sessao || !user?.id) return

        try {
            setFinalizando(true)

            // 1. Buscar respostas corretas (Gabarito)
            const qIds = todasRespostas.map(r => r.questao_id)
            const { data: qCorretas } = await supabase
                .from('questions')
                .select('id, correct_alternative, correct_option_id')
                .in('id', qIds)

            const gabarito = new Map(qCorretas?.map(q => [q.id, q.correct_alternative || q.correct_option_id]))

            // 2. Buscar Erros Existentes (Para transição de status)
            const { data: errosExistentes } = await supabase
                .from('caderno_erros')
                .select('questao_id, status, contador_erros')
                .eq('user_id', user.id)
                .in('questao_id', qIds)

            const errosMap = new Map(errosExistentes?.map(e => [e.questao_id, e]))

            // 3. Processar Resultados e Preparar Updates
            let acertos = 0
            const updatesCaderno: any[] = []

            // Fetch itens IDs para update da sessão
            const { data: itensDb } = await supabase
                .from('sessao_itens')
                .select('id, questao_id')
                .eq('sessao_id', sessao.sessao_id)

            const itensMap = new Map(itensDb?.map(i => [i.questao_id, i.id]))

            for (const resp of todasRespostas) {
                const correta = gabarito.get(resp.questao_id)
                // Comparação robusta (string vs string)
                const isCorrect = String(correta) === String(resp.resposta)

                if (isCorrect) acertos++

                // A. Atualizar Item da Sessão
                const itemId = itensMap.get(resp.questao_id)
                if (itemId) {
                    await supabase.from('sessao_itens').update({
                        resposta_usuario: resp.resposta,
                        esta_correta: isCorrect,
                        tempo_resposta_segundos: resp.tempo_segundos
                    }).eq('id', itemId)
                }

                // B. Atualizar Uso (Anti-Repetição) - Só se não for Caderno de Erros (pois ali já foi usada)
                // Mas, vamos logar sempre pra garantir histórico.
                await supabase.from('questao_uso_usuario').upsert({
                    user_id: user.id,
                    assunto_id: sessao.assunto.id,
                    questao_id: resp.questao_id,
                    foi_usada: true,
                    foi_acertada: isCorrect,
                    data_uso: new Date().toISOString(),
                    sessao_id: sessao.sessao_id
                }, { onConflict: 'user_id,assunto_id,questao_id' })

                // C. Lógica do CADERNO DE ERROS (Orquestração)
                const erroAntigo = errosMap.get(resp.questao_id)

                if (!isCorrect) {
                    // ERROU: Criar ou Atualizar como ATIVA
                    updatesCaderno.push({
                        user_id: user.id,
                        questao_id: resp.questao_id,
                        assunto_id: sessao.assunto.id,
                        status: 'ATIVA',
                        contador_erros: (erroAntigo?.contador_erros || 0) + 1,
                        ultima_interacao: new Date().toISOString()
                    })
                } else if (isCorrect && erroAntigo) {
                    // ACERTOU e já existia erro: Evoluir Status
                    let novoStatus = erroAntigo.status
                    if (erroAntigo.status === 'ATIVA') novoStatus = 'EM_RECUPERACAO'
                    else if (erroAntigo.status === 'EM_RECUPERACAO') novoStatus = 'CONSOLIDADA'

                    // Se já era CONSOLIDADA, mantém (ou remove se quiser limpar, mas melhor manter histórico)

                    updatesCaderno.push({
                        user_id: user.id,
                        questao_id: resp.questao_id,
                        assunto_id: sessao.assunto.id,
                        status: novoStatus,
                        contador_erros: erroAntigo.contador_erros, // Mantém contagem
                        ultima_interacao: new Date().toISOString()
                    })
                }
            }

            // Aplicar updates no Caderno de Erros (Serial)
            for (const upsert of updatesCaderno) {
                await supabase.from('caderno_erros').upsert(upsert, { onConflict: 'user_id, questao_id' })
            }

            // 4. Verificar Estado Geral do Assunto (Pós-Sessão)
            // Contar quantos erros ATIVOS restam neste assunto para definir penalidade
            const { count: countErrosAtivos } = await supabase
                .from('caderno_erros')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .eq('status', 'ATIVA')

            const temErrosAtivos = (countErrosAtivos || 0) > 0

            // 5. Cálculo SRS com Penalidade de Erro
            const nota = Math.round((acertos / sessao.total_questoes) * 10)

            // Tabela Base
            let intervalo = 3
            if (nota >= 4 && nota <= 5) intervalo = 7
            else if (nota >= 6 && nota <= 7) intervalo = 14
            else if (nota >= 8 && nota <= 9) intervalo = 30
            else if (nota === 10) intervalo = 45
            else if (nota <= 3) intervalo = 3

            // PENALIDADE: Se houver erros ativos, intervalo não pode passar de 7 dias
            if (temErrosAtivos) {
                intervalo = Math.min(intervalo, 7)
            }

            const dataProxima = new Date()
            dataProxima.setDate(dataProxima.getDate() + intervalo)
            const dataProximaStr = dataProxima.toISOString().split('T')[0]

            // 6. Fechar Sessão
            await supabase.from('sessoes').update({
                status: 'FINALIZADA',
                total_acertos: acertos,
                nota: nota,
                finalized_at: new Date().toISOString()
            }).eq('id', sessao.sessao_id)

            // 7. Atualizar Progresso Assunto
            const { data: progAnt } = await supabase
                .from('assunto_progresso')
                .select('total_questoes_respondidas, total_acertos')
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .single()

            const totalQ = (progAnt?.total_questoes_respondidas || 0) + sessao.total_questoes
            const totalA = (progAnt?.total_acertos || 0) + acertos

            const novoEstado = temErrosAtivos ? 'EM_RECUPERACAO' : 'AGUARDANDO_REVISAO'

            await supabase.from('assunto_progresso').upsert({
                user_id: user.id,
                assunto_id: sessao.assunto.id,
                estado: novoEstado,
                nivel_atual: nota,
                ultima_nota: nota,
                total_questoes_respondidas: totalQ,
                total_acertos: totalA,
                data_ultima_sessao: new Date().toISOString(),
                data_proxima_revisao: dataProxima.toISOString(),
                intervalo_dias: intervalo,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,assunto_id' })

            // 8. Atualizar Agenda de Revisões
            await supabase.from('agenda_revisoes')
                .delete()
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .eq('status', 'PENDENTE')

            await supabase.from('agenda_revisoes').insert({
                user_id: user.id,
                assunto_id: sessao.assunto.id,
                data_programada: dataProximaStr,
                status: 'PENDENTE'
            })

            // Marcar anteriores como REALIZADA
            await supabase.from('agenda_revisoes')
                .update({ status: 'REALIZADA' })
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .eq('status', 'ATRASADA')

            setResultado({
                success: true,
                nota: nota,
                acertos: acertos,
                total: sessao.total_questoes,
                nivel_atual: nota,
                proxima_revisao: dataProximaStr,
                intervalo_dias: intervalo,
                erros_ativos: countErrosAtivos || 0
            })

        } catch (err: any) {
            console.error('Error finalizing session:', err)
            setError('Erro ao finalizar sessão')
        } finally {
            setFinalizando(false)
        }
    }

    const handleFechar = () => {
        setSessao(null)
        setQuestaoAtual(0)
        setRespostas([])
        setRespostaSelecionada(null)
        setResultado(null)
        setError(null)
        onClose()
        if (resultado && onComplete) {
            onComplete()
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-4xl bg-card border border-border rounded-[40px] shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-50 to-transparent p-6 border-b border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`px-3 py-1 rounded-full ${tipo === 'NIVELAMENTO'
                                        ? 'bg-orange-500/10 text-orange-500'
                                        : tipo === 'CADERNO_ERROS'
                                            ? 'bg-yellow-500/10 text-yellow-500'
                                            : 'bg-primary/10 text-primary'
                                        }`}>
                                        <span className="text-xs font-black uppercase tracking-widest">
                                            {tipo === 'CADERNO_ERROS' ? 'RECUPERAÇÃO DE ERROS' : tipo}
                                        </span>
                                    </div>
                                    {sessao && (
                                        <span className="text-sm font-bold text-muted-foreground">
                                            {questaoAtual + 1} de {sessao.total_questoes}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-foreground">
                                    {sessao?.assunto.nome || 'Carregando...'}
                                </h2>
                            </div>

                            <button
                                onClick={handleFechar}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        {sessao && (
                            <div className="mt-6 h-3 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((questaoAtual + 1) / sessao.total_questoes) * 100}%` }}
                                    className={`h-full ${tipo === 'NIVELAMENTO'
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500'
                                        : tipo === 'CADERNO_ERROS'
                                            ? 'bg-yellow-500'
                                            : 'bg-primary'
                                        }`}
                                />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 min-h-[500px] flex flex-col justify-center">
                        {loading && (
                            <div className="flex items-center justify-center py-20">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 rounded-[30px] p-8 text-center max-w-md mx-auto">
                                <XCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-destructive mb-2">Ops! Algo deu errado</h3>
                                <p className="text-muted-foreground mb-6 font-medium">{error}</p>
                                <button
                                    onClick={handleFechar}
                                    className="px-8 py-3 bg-destructive text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-lg shadow-destructive/20"
                                >
                                    Fechar
                                </button>
                            </div>
                        )}

                        {resultado && (
                            <TelaResultado resultado={resultado} tipo={tipo} onFechar={handleFechar} />
                        )}

                        {sessao && !resultado && !error && (
                            <TelaQuestao
                                questao={sessao.questoes[questaoAtual]}
                                respostaSelecionada={respostaSelecionada}
                                onSelecionarResposta={setRespostaSelecionada}
                                onResponder={handleResponder}
                                onAbort={handleFechar}
                                finalizando={finalizando}
                                isUltima={questaoAtual === sessao.questoes.length - 1}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

function TelaQuestao({
    questao,
    respostaSelecionada,
    onSelecionarResposta,
    onResponder,
    onAbort,
    finalizando,
    isUltima
}: {
    questao: Questao
    respostaSelecionada: string | null
    onSelecionarResposta: (resposta: string) => void
    onResponder: () => void
    onAbort: () => void
    finalizando: boolean
    isUltima: boolean
}) {
    return (
        <motion.div
            key={questao.questao_id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 max-w-3xl mx-auto w-full"
        >
            {/* Enunciado */}
            <div className="prose prose-lg max-w-none">
                <p className="text-[#1A1033] font-medium leading-relaxed whitespace-pre-wrap text-lg">
                    {questao.enunciado}
                </p>
            </div>

            {/* Alternativas */}
            <div className="space-y-4">
                {questao.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelecionarResposta(option.id)}
                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-start gap-4 group ${respostaSelecionada === option.id
                            ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                            : 'border-slate-100 hover:border-primary/30 bg-white hover:bg-slate-50'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-colors ${respostaSelecionada === option.id
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
                            }`}>
                            {option.id.toUpperCase()}
                        </div>
                        <p className={`text-base font-medium flex-1 pt-2 ${respostaSelecionada === option.id
                            ? 'text-primary'
                            : 'text-slate-600'
                            }`}>
                            {option.text}
                        </p>
                    </button>
                ))}
            </div>

            {/* Botão Responder */}
            <div className="pt-4">
                <button
                    onClick={onResponder}
                    disabled={!respostaSelecionada || finalizando}
                    className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] transition-all ${respostaSelecionada && !finalizando
                        ? 'bg-[#1A1033] text-white hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20'
                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                        }`}
                >
                    {finalizando ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Finalizando...
                        </>
                    ) : (
                        <>
                            {isUltima ? 'Finalizar Sessão' : 'Próxima Questão'}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>

                <button
                    onClick={onAbort}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-slate-400 hover:text-slate-600 font-bold uppercase text-xs tracking-[0.2em] transition-all"
                >
                    <XCircle className="w-4 h-4" />
                    Interromper e Voltar
                </button>
            </div>
        </motion.div>
    )
}

function TelaResultado({
    resultado,
    tipo,
    onFechar
}: {
    resultado: any
    tipo: string
    onFechar: () => void
}) {
    // Calculo simples de msg
    const isRecuperacao = tipo === 'CADERNO_ERROS'

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-8 max-w-lg mx-auto"
        >
            {/* Ícone */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative inline-block"
            >
                <div className={`absolute inset-0 blur-2xl rounded-full ${isRecuperacao ? 'bg-yellow-500/20' : 'bg-emerald-500/20'}`} />
                {isRecuperacao ? (
                    <CheckCircle2 className="w-32 h-32 text-yellow-500 relative z-10" />
                ) : (
                    <Trophy className="w-32 h-32 text-yellow-500 relative z-10" />
                )}
            </motion.div>

            {/* Título */}
            <div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-2">
                    {isRecuperacao ? 'Recuperação Concluída!' : tipo === 'NIVELAMENTO' ? 'Nivelamento Concluído!' : 'Revisão Concluída!'}
                </h3>
                <p className="text-slate-500 font-medium text-lg">
                    {isRecuperacao
                        ? 'Você deu um passo importante para fechar suas lacunas.'
                        : 'Parabéns! Você estourou a boca do balão.'
                    }
                </p>
            </div>

            {/* Nota */}
            <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 soft-shadow">
                <div className="flex flex-col items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Sua Nota</span>
                    <div className="text-7xl font-black tracking-tighter text-[#1A1033] mb-2">
                        {resultado.nota.toFixed(1)}
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        {resultado.acertos} ACERTOS
                    </div>
                </div>
            </div>

            {/* Informações */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                        Situação Atual
                    </p>
                    {resultado.erros_ativos > 0 ? (
                        <p className="text-xl font-black text-yellow-500 flex items-center justify-center gap-1">
                            {resultado.erros_ativos} <span className="text-xs">ERROS ATIVOS</span>
                        </p>
                    ) : (
                        <p className="text-3xl font-black text-emerald-500">LIMPO</p>
                    )}
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                        Próxima Revisão
                    </p>
                    <div className="flex items-baseline gap-1 justify-center">
                        <p className="text-3xl font-black text-primary">
                            {resultado.intervalo_dias}
                        </p>
                        <span className="text-xs font-bold text-slate-400 uppercase">DIAS</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                        {new Date(resultado.proxima_revisao).toLocaleDateString('pt-BR')}
                    </p>
                </div>
            </div>

            {/* Botão Fechar */}
            <button
                onClick={onFechar}
                className="w-full py-5 rounded-2xl bg-[#1A1033] text-white font-black uppercase text-sm tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
                Voltar ao Dashboard
            </button>
        </motion.div>
    )
}
