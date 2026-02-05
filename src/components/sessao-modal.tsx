"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Clock, CheckCircle2, XCircle, Trophy } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { supabase } from '@/lib/supabase'

interface SessaoModalProps {
    isOpen: boolean
    onClose: () => void
    assunto_id: string
    tipo: 'NIVELAMENTO' | 'REVISAO'
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
                const { data: assunto } = await supabase
                    .from('assuntos')
                    .select('id, nome, specialty_id')
                    .eq('id', assunto_id)
                    .single()

                if (!assunto) throw new Error('Assunto não encontrado')

                // 2. Buscar questoes (simplificado: random)
                // Usar RPC 'get_random_questions' se existir, ou buscar N e shuffle no cliente
                const { data: qData, error: qError } = await supabase
                    .from('questao_base')
                    .select('*')
                    .eq('specialty_id', assunto.specialty_id) // Assumindo relação direta
                    .eq('status_validacao', 'APROVADA')
                    .limit(20) // Pegar um pool maior e slice

                if (qError || !qData || qData.length < 5) {
                    throw new Error('Questões insuficientes para este assunto.')
                }

                // Shuffle e slice 10
                const shuffled = qData.sort(() => 0.5 - Math.random()).slice(0, 10)

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
                    questao_id: q.id,
                    ordem: i + 1
                }))

                await supabase.from('sessao_itens').insert(itens)

                // 5. Montar Objeto Sessao
                setSessao({
                    sessao_id: novaSessao.id,
                    tipo: tipo,
                    assunto: assunto,
                    total_questoes: shuffled.length,
                    questoes: shuffled.map((q, i) => ({
                        questao_id: q.id,
                        ordem: i + 1,
                        enunciado: q.enunciado,
                        case_study: q.case_study,
                        options: q.options,
                        image_url: q.image_url
                    }))
                })
                setTempoInicio(Date.now())

            } catch (err: any) {
                console.error('Error creating session:', err)
                setError(err.message || 'Erro ao conectar com o servidor')
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

            // 1. Buscar respostas corretas
            const qIds = todasRespostas.map(r => r.questao_id)
            const { data: qCorretas } = await supabase
                .from('questao_base')
                .select('id, correct_option_id')
                .in('id', qIds)

            const gabarito = new Map(qCorretas?.map(q => [q.id, q.correct_option_id]))

            // 2. Calcular acertos
            let acertos = 0
            const itensUpdate = []

            // fetch itens IDs
            const { data: itensDb } = await supabase
                .from('sessao_itens')
                .select('id, questao_id')
                .eq('sessao_id', sessao.sessao_id)

            const itensMap = new Map(itensDb?.map(i => [i.questao_id, i.id]))

            for (const resp of todasRespostas) {
                const correta = gabarito.get(resp.questao_id)
                const isCorrect = correta === resp.resposta
                if (isCorrect) acertos++

                const itemId = itensMap.get(resp.questao_id)
                if (itemId) {
                    // Update Item (async loop is ok-ish here or Promise.all)
                    await supabase.from('sessao_itens').update({
                        resposta_usuario: resp.resposta,
                        esta_correta: isCorrect,
                        tempo_resposta_segundos: resp.tempo_segundos
                    }).eq('id', itemId)

                    // Update Usage Log
                    await supabase.from('questao_uso_usuario').upsert({
                        user_id: user.id,
                        assunto_id: sessao.assunto.id,
                        questao_id: resp.questao_id,
                        foi_usada: true,
                        foi_acertada: isCorrect,
                        data_uso: new Date().toISOString(),
                        sessao_id: sessao.sessao_id
                    }, { onConflict: 'user_id,assunto_id,questao_id' })
                }
            }

            // 3. Calcular Nota e SRS
            const nota = acertos // 0-10 para 10 questões

            // RPC para intervalo
            const { data: intervaloCalc } = await supabase.rpc('calcular_intervalo_revisao', { nota })
            const intervalo = intervaloCalc || 7

            const dataProxima = new Date()
            dataProxima.setDate(dataProxima.getDate() + intervalo)
            const dataProximaStr = dataProxima.toISOString().split('T')[0]

            // 4. Fechar Sessão
            await supabase.from('sessoes').update({
                status: 'FINALIZADA',
                total_acertos: acertos,
                nota: nota,
                finalized_at: new Date().toISOString()
            }).eq('id', sessao.sessao_id)

            // 5. Atualizar Progresso Assunto
            // Buscar anterior
            const { data: progAnt } = await supabase
                .from('assunto_progresso')
                .select('total_questoes_respondidas, total_acertos')
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .single()

            const totalQ = (progAnt?.total_questoes_respondidas || 0) + sessao.total_questoes
            const totalA = (progAnt?.total_acertos || 0) + acertos

            await supabase.from('assunto_progresso').upsert({
                user_id: user.id,
                assunto_id: sessao.assunto.id,
                estado: 'AGUARDANDO_REVISAO',
                nivel_atual: nota, // Simplificação: nota atual vira nível
                ultima_nota: nota,
                total_questoes_respondidas: totalQ,
                total_acertos: totalA,
                data_ultima_sessao: new Date().toISOString(),
                data_proxima_revisao: dataProxima.toISOString(),
                intervalo_dias: intervalo,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,assunto_id' })

            // 6. Atualizar Agenda
            await supabase.from('agenda_revisoes').upsert({
                user_id: user.id,
                assunto_id: sessao.assunto.id,
                data_programada: dataProximaStr,
                status: 'PENDENTE',
                created_at: new Date().toISOString()
            }, { onConflict: 'user_id,assunto_id,data_programada' })

            // Se tinha atrasada antiga, marcar como REALIZADA? 
            // O sistema deve limpar atrasos ao criar nova agenda futura? 
            // Idealmente sim, atualizamos status='REALIZADA' nas passadas.
            await supabase.from('agenda_revisoes')
                .update({ status: 'REALIZADA' })
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .lt('data_programada', dataProximaStr)
                .eq('status', 'ATRASADA')

            setResultado({
                success: true,
                nota: nota,
                acertos: acertos,
                total: sessao.total_questoes,
                nivel_atual: nota,
                proxima_revisao: dataProximaStr,
                intervalo_dias: intervalo
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
                    className="relative w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`px-3 py-1 rounded-full ${tipo === 'NIVELAMENTO'
                                        ? 'bg-orange-500/10 text-orange-500'
                                        : 'bg-primary/10 text-primary'
                                        }`}>
                                        <span className="text-xs font-black uppercase tracking-widest">
                                            {tipo}
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
                            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((questaoAtual + 1) / sessao.total_questoes) * 100}%` }}
                                    className={`h-full ${tipo === 'NIVELAMENTO'
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500'
                                        : 'bg-primary'
                                        }`}
                                />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-8">
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
                            <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 text-center">
                                <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                                <p className="text-destructive font-bold mb-4">{error}</p>
                                <button
                                    onClick={handleFechar}
                                    className="px-6 py-2 bg-destructive text-white rounded-xl font-bold hover:scale-105 transition-all"
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
    finalizando,
    isUltima
}: {
    questao: Questao
    respostaSelecionada: string | null
    onSelecionarResposta: (resposta: string) => void
    onResponder: () => void
    finalizando: boolean
    isUltima: boolean
}) {
    return (
        <motion.div
            key={questao.questao_id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            {/* Enunciado */}
            <div className="prose prose-sm max-w-none">
                <p className="text-foreground font-medium leading-relaxed whitespace-pre-wrap">
                    {questao.enunciado}
                </p>
            </div>

            {/* Caso Clínico (se houver) */}
            {questao.case_study && (
                <div className="bg-muted/50 border border-border rounded-2xl p-6 space-y-4">
                    {questao.case_study.history && (
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-wider text-muted-foreground mb-2">
                                História
                            </h4>
                            <p className="text-sm text-foreground">{questao.case_study.history}</p>
                        </div>
                    )}
                    {questao.case_study.physical_exam && (
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-wider text-muted-foreground mb-2">
                                Exame Físico
                            </h4>
                            <p className="text-sm text-foreground">{questao.case_study.physical_exam}</p>
                        </div>
                    )}
                    {questao.case_study.lab_results && (
                        <div>
                            <h4 className="text-sm font-black uppercase tracking-wider text-muted-foreground mb-2">
                                Exames Laboratoriais
                            </h4>
                            <p className="text-sm text-foreground">{questao.case_study.lab_results}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Imagem (se houver) */}
            {questao.image_url && (
                <div className="rounded-2xl overflow-hidden border border-border">
                    <img src={questao.image_url} alt="Imagem da questão" className="w-full" />
                </div>
            )}

            {/* Alternativas */}
            <div className="space-y-3">
                {questao.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelecionarResposta(option.id)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${respostaSelecionada === option.id
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                            : 'border-border hover:border-primary/50 bg-card'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${respostaSelecionada === option.id
                                ? 'bg-primary text-white'
                                : 'bg-muted text-muted-foreground'
                                }`}>
                                {option.id.toUpperCase()}
                            </div>
                            <p className="text-sm font-medium text-foreground flex-1 pt-1">
                                {option.text}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Botão Responder */}
            <button
                onClick={onResponder}
                disabled={!respostaSelecionada || finalizando}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black uppercase text-sm tracking-widest transition-all ${respostaSelecionada && !finalizando
                    ? 'bg-primary text-white hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
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
    const porcentagem = (resultado.acertos / resultado.total) * 100

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-6"
        >
            {/* Ícone */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
                <Trophy className="w-24 h-24 text-primary mx-auto" />
            </motion.div>

            {/* Título */}
            <div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-foreground mb-2">
                    {tipo === 'NIVELAMENTO' ? 'Nivelamento Concluído!' : 'Revisão Concluída!'}
                </h3>
                <p className="text-muted-foreground font-medium">
                    Parabéns! Você completou sua sessão de estudos.
                </p>
            </div>

            {/* Nota */}
            <div className="bg-gradient-to-br from-primary/10 to-transparent border-2 border-primary/20 rounded-3xl p-8">
                <div className="text-6xl font-black tracking-tighter text-foreground mb-2">
                    {resultado.nota.toFixed(1)}
                    <span className="text-2xl text-muted-foreground">/10</span>
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {resultado.acertos} de {resultado.total} questões corretas ({porcentagem.toFixed(0)}%)
                </p>
            </div>

            {/* Informações */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-2xl p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
                        Nível Atual
                    </p>
                    <p className="text-2xl font-black text-foreground">
                        {resultado.nivel_atual.toFixed(1)}
                    </p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-4">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">
                        Próxima Revisão
                    </p>
                    <p className="text-sm font-bold text-foreground">
                        {new Date(resultado.proxima_revisao).toLocaleDateString('pt-BR')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {resultado.intervalo_dias} dias
                    </p>
                </div>
            </div>

            {/* Botão Fechar */}
            <button
                onClick={onFechar}
                className="w-full py-4 rounded-2xl bg-primary text-white font-black uppercase text-sm tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
                Voltar ao Dashboard
            </button>
        </motion.div>
    )
}
