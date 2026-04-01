"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, XCircle, Trophy, Calendar } from 'lucide-react'
import { QuestionText } from './question-typography'
import { QuestionComments } from '@/components/question-comments'

import { useAuth } from '@/store/use-auth'
import { supabase } from '@/lib/supabase'
import { completePlacementSession, ScopeConfig } from '@/lib/nivelamento-service'
import { useSRS } from '@/store/use-srs'

interface SessaoModalProps {
    isOpen: boolean
    onClose: () => void
    assunto_id: string
    tipo: 'NIVELAMENTO' | 'REVISAO' | 'CADERNO_ERROS'
    onComplete?: () => void
    isNewSRS?: boolean
    agendaId?: string
    scope?: ScopeConfig
}

interface Questao {
    questao_id: string
    ordem: number
    enunciado: string
    comando?: string
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

export function SessaoModal({ isOpen, onClose, assunto_id, tipo, onComplete, isNewSRS, agendaId, scope }: SessaoModalProps) {
    const { user } = useAuth()
    const { start_session, finish_session } = useSRS()
    const [sessao, setSessao] = useState<SessaoData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [questaoAtual, setQuestaoAtual] = useState(0)
    const [respostas, setRespostas] = useState<Resposta[]>([])
    const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null)
    const [tempoInicio, setTempoInicio] = useState<number>(Date.now())

    const [finalizando, setFinalizando] = useState(false)
    const [resultado, setResultado] = useState<any>(null)
    const [fontSize] = useState(18) // base font size in px

    useEffect(() => {
        if (!isOpen || !user?.id || !assunto_id) return

        const carregarSessao = async () => {
            try {
                setLoading(true)
                setError(null)
                
                const data = await start_session(user.id, assunto_id, tipo)

                if (!data || !data.questoes || data.questoes.length === 0) {
                    throw new Error('Não encontramos questões suficientes para este assunto.')
                }

                setSessao({
                    sessao_id: data.sessao_id,
                    tipo: data.tipo,
                    assunto: {
                        id: data.assunto_id,
                        nome: data.assunto_nome,
                        specialty_id: data.specialty_id
                    },
                    total_questoes: data.questoes.length,
                    questoes: data.questoes.map((q: any, i: number) => ({
                        questao_id: q.id,
                        ordem: i + 1,
                        enunciado: q.enunciado || q.statement || 'Enunciado indisponível',
                        comando: q.comando || null,
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

        carregarSessao()
    }, [isOpen, user?.id, assunto_id, tipo, start_session])

    const handleResponder = async () => {
        if (!respostaSelecionada || !sessao) return

        const tempoDecorrido = Math.floor((Date.now() - tempoInicio) / 1000)
        const questao = sessao.questoes[questaoAtual]

        const novaResposta: Resposta = {
            questao_id: questao.questao_id,
            resposta: respostaSelecionada,
            tempo_segundos: tempoDecorrido
        }

        // Heartbeat activity
        if (user?.id) {
            supabase.from('users').update({ updated_at: new Date().toISOString() }).eq('id', user.id).then()
        }

        const novasRespostas = [...respostas, novaResposta]
        setRespostas(novasRespostas)
        setRespostaSelecionada(null)

        if (questaoAtual < sessao.questoes.length - 1) {
            setQuestaoAtual(questaoAtual + 1)
            setTempoInicio(Date.now())
        } else {
            finalizarSessao(novasRespostas)
        }
    }

    const finalizarSessao = async (todasRespostas: Resposta[]) => {
        if (!sessao || !user?.id) return

        try {
            setFinalizando(true)
            const resultData = await finish_session(sessao.sessao_id, user.id, todasRespostas)

            if (isNewSRS) {
                try {
                    const avgTime = todasRespostas.length > 0
                        ? todasRespostas.reduce((a, b) => a + (b.tempo_segundos || 0), 0) / todasRespostas.length
                        : 0
                    
                    if (scope) {
                        await completePlacementSession(
                            agendaId || sessao.sessao_id, 
                            user.id, 
                            scope, 
                            resultData.acertos, 
                            sessao.total_questoes, 
                            avgTime
                        )
                    }

                    if (agendaId) {
                        await supabase.from('spaced_review_events').update({
                            status: 'concluida',
                            resulting_score: resultData.percentual,
                            completed_at: new Date().toISOString()
                        }).eq('id', agendaId)
                    }
                } catch (e) {
                    console.error('Error syncing additional SRS metrics:', e)
                }
            }

            setResultado({
                success: true,
                nota: resultData.nota,
                percentual: resultData.percentual,
                acertos: resultData.acertos,
                total: sessao.total_questoes,
                nivel_atual: resultData.nota,
                proxima_revisao: resultData.proxima_revisao,
                intervalo_dias: resultData.intervalo_dias,
                estado_cognitivo: resultData.estado_cognitivo
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
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#0F0A1E]/95 backdrop-blur-xl pointer-events-auto"
                    onClick={handleFechar}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-5xl bg-white dark:bg-[#1A1033] rounded-[40px] shadow-2xl overflow-hidden flex flex-col pointer-events-auto max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black uppercase italic tracking-tighter text-[#1A1033] dark:text-white leading-none">
                                    {sessao?.assunto.nome || 'Carregando...'}
                                </h2>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1033]/40 dark:text-white/40">
                                    Sessão de {tipo.replace('_', ' ')}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleFechar}
                            className="p-3 bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-[#1A1033] dark:hover:text-white rounded-2xl transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 sm:p-12 scroll-smooth custom-scrollbar">
                        {loading && (
                            <div className="flex flex-col items-center justify-center h-full space-y-4">
                                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest animate-pulse">Iniciando Inteligência do SRS...</p>
                            </div>
                        )}

                        {error && (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                <div className="p-6 bg-red-50 dark:bg-red-500/10 rounded-3xl">
                                    <XCircle className="w-12 h-12 text-red-500" />
                                </div>
                                <h3 className="text-2xl font-black text-[#1A1033] dark:text-white uppercase italic">{error}</h3>
                                <button
                                    onClick={handleFechar}
                                    className="px-8 py-4 bg-[#1A1033] dark:bg-white/10 text-white rounded-2xl font-black uppercase text-sm tracking-widest"
                                >
                                    Voltar
                                </button>
                            </div>
                        )}

                        {resultado && (
                            <TelaResultado resultado={resultado} tipo={tipo} onFechar={handleFechar} />
                        )}

                        {sessao && !resultado && !error && (
                            <>
                                <TelaQuestao
                                    questao={sessao.questoes[questaoAtual]}
                                    respostaSelecionada={respostaSelecionada}
                                    onSelecionarResposta={setRespostaSelecionada}
                                    onResponder={handleResponder}
                                    onAbort={handleFechar}
                                    finalizando={finalizando}
                                    isUltima={questaoAtual === sessao.questoes.length - 1}
                                    fontSize={fontSize}
                                />

                                <div className="mt-12 pt-8 border-t border-border">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Progresso da Sessão</p>
                                    <div className="flex flex-wrap gap-2">
                                        {sessao.questoes.map((_, idx) => {
                                            const isCurrentQuestion = idx === questaoAtual
                                            const isAnswered = idx < respostas.length
                                            const isLocked = idx > respostas.length
                                            let bgColor = 'bg-muted text-muted-foreground'
                                            if (isAnswered) bgColor = 'bg-primary text-white'
                                            else if (isCurrentQuestion) bgColor = 'bg-primary text-white ring-2 ring-primary/50'
                                            else if (isLocked) bgColor = 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-50'

                                            return (
                                                <button
                                                    key={idx}
                                                    disabled={isLocked}
                                                    onClick={() => {
                                                        if (!isLocked) {
                                                            setQuestaoAtual(idx)
                                                            if (idx < respostas.length) setRespostaSelecionada(respostas[idx].resposta)
                                                            else setRespostaSelecionada(null)
                                                        }
                                                    }}
                                                    className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${isLocked ? '' : 'hover:scale-110'} ${bgColor}`}
                                                >
                                                    {idx + 1}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
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
    isUltima,
    fontSize
}: {
    questao: Questao
    respostaSelecionada: string | null
    onSelecionarResposta: (resposta: string) => void
    onResponder: () => void
    onAbort: () => void
    finalizando: boolean
    isUltima: boolean
    fontSize: number
}) {
    return (
        <motion.div
            key={questao.questao_id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 sm:space-y-8 max-w-3xl mx-auto w-full"
        >
            <div className="prose prose-lg max-w-none dark:prose-invert">
                <QuestionText
                    className="text-[#1A1033] dark:text-white font-black italic uppercase leading-tight tracking-tighter"
                    style={{ fontSize: `${fontSize * 1.3}px` }}
                >
                    {questao.enunciado}
                </QuestionText>

                {questao.comando && (
                    <QuestionText
                        className="mt-4 text-[#1A1033] dark:text-white font-bold"
                        style={{ fontSize: `${fontSize * 1.1}px` }}
                    >
                        {questao.comando}
                    </QuestionText>
                )}
                {questao.image_url && (
                    <img src={questao.image_url} alt="Imagem" className="rounded-xl mt-4 max-h-[300px] object-contain" />
                )}
            </div>

            <div className="space-y-4">
                {questao.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelecionarResposta(option.id)}
                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-start gap-4 group ${respostaSelecionada === option.id
                            ? 'border-primary bg-primary/5 dark:bg-primary/20'
                            : 'border-slate-100 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/50'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-colors ${respostaSelecionada === option.id
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-white/40'
                            }`}>
                            {option.id.toUpperCase()}
                        </div>
                        <QuestionText
                            className={`font-bold flex-1 pt-1 ${respostaSelecionada === option.id ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}
                            style={{ fontSize: `${fontSize * 0.9}px` }}
                        >
                            {option.text}
                        </QuestionText>
                    </button>
                ))}
            </div>

            <div className="pt-8">
                <QuestionComments questionId={questao.questao_id} />
            </div>

            <div className="pt-8">
                <button
                    onClick={onResponder}
                    disabled={!respostaSelecionada || finalizando}
                    className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] transition-all ${respostaSelecionada && !finalizando
                        ? 'bg-primary text-white hover:scale-[1.02] active:scale-95'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-300 dark:text-white/20'
                        }`}
                >
                    {finalizando ? 'Finalizando...' : (isUltima ? 'Finalizar Sessão' : 'Próxima Questão')}
                    {!finalizando && <ArrowRight className="w-5 h-5" />}
                </button>

                <button
                    onClick={onAbort}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-slate-400 font-bold uppercase text-xs tracking-[0.2em]"
                >
                    <XCircle className="w-4 h-4" />
                    Interromper
                </button>
            </div>
        </motion.div>
    )
}

function TelaResultado({ resultado, tipo, onFechar }: { resultado: any, tipo: string, onFechar: () => void }) {
    const isLeveling = tipo === 'NIVELAMENTO'
    let titulo = "Resultado da Sessão"
    let subtitulo = "Veja como foi seu desempenho."

    if (isLeveling && resultado.estado_cognitivo) {
        if (resultado.estado_cognitivo === 'DOMINADO') { titulo = "Domínio Total!"; subtitulo = "Você demonstrou excelente conhecimento." }
        else if (resultado.estado_cognitivo === 'NIVEL_ALTO') { titulo = "Alto Desempenho"; subtitulo = "Você tem uma base sólida neste assunto." }
        else if (resultado.estado_cognitivo === 'NIVEL_INTERMEDIARIO') { titulo = "Nível Intermediário"; subtitulo = "Bom começo, mas precisa de revisão." }
        else { titulo = "Nível Básico"; subtitulo = "Identificamos lacunas importantes. Faremos revisões curtas." }
    }

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-8 py-8">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-green-500" />
            </div>
            <div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[#1A1033] dark:text-white mb-2">{titulo}</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">{subtitulo}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl flex flex-col items-center">
                    <span className="text-4xl font-black text-[#1A1033] dark:text-white">{resultado.acertos}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Acertos</span>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl flex flex-col items-center">
                    <span className="text-4xl font-black text-[#1A1033] dark:text-white">{resultado.percentual}%</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Precisão</span>
                </div>
            </div>
            {resultado.proxima_revisao && (
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-bold text-blue-700">
                        Próxima revisão: {new Date(resultado.proxima_revisao).toLocaleDateString('pt-BR')}
                    </span>
                </div>
            )}
            <button onClick={onFechar} className="w-full max-w-md bg-primary text-white py-4 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl transition-all">
                Concluir
            </button>
        </motion.div>
    )
}
