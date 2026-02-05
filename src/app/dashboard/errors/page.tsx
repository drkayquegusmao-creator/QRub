'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
    AlertCircle,
    ArrowRight,
    BrainCircuit,
    CheckCircle2,
    ChevronLeft,
    Clock,
    Play,
    RefreshCcw,
    Search,
} from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useQuestions } from '@/store/use-questions'
import { supabase } from '@/lib/supabase' // Import direto
import { MEDICAL_HIERARCHY } from '@/lib/medical-specialties'

// Definição de Tipos
interface ErrorGroup {
    id: string
    nome: string
    total: number
    questoes: {
        id: string // questao_id
        erro_id: string
        enunciado: string
        status: 'ATIVO' | 'RECUPERACAO' | 'CONSOLIDADO'
        revisoes: number
        data: string
        assunto?: string
    }[]
}

interface ErrorSummary {
    total_erros: number
    especialidades: ErrorGroup[]
}

export default function ErrorNotebookPage() {
    const router = useRouter()
    const { user } = useAuth()
    const { setEphemeralQuestions } = useQuestions()

    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<ErrorSummary | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        if (user) fetchErrors()
    }, [user])

    const fetchErrors = async () => {
        try {
            setLoading(true)

            // Buscar erros
            const { data: erros, error } = await supabase
                .from('caderno_erros')
                .select(`
                id,
                questao_id,
                specialty_id,
                status,
                numero_erros,
                ultima_tentativa,
                assuntos (nome),
                questao_base (
                   enunciado
                )
              `)
                .eq('user_id', user!.id)
                .in('status', ['ATIVO', 'RECUPERACAO'])
                .order('ultima_tentativa', { ascending: false })

            if (error) {
                console.error('Supabase error:', error)
                throw error
            }

            // Agrupar por especialidade
            const agrupado: Record<string, ErrorGroup> = {}

            erros?.forEach((erro: any) => {
                const specId = erro.specialty_id

                if (!agrupado[specId]) {
                    let specName = specId
                    for (const area of MEDICAL_HIERARCHY) {
                        const found = area.specialties.find((s: any) => s.id === specId)
                        if (found) { specName = found.name; break; }
                    }

                    agrupado[specId] = {
                        id: specId,
                        nome: specName,
                        total: 0,
                        questoes: []
                    }
                }

                const questaoBase = Array.isArray(erro.questao_base) ? erro.questao_base[0] : erro.questao_base
                const assuntoNome = Array.isArray(erro.assuntos) ? erro.assuntos[0]?.nome : erro.assuntos?.nome

                agrupado[specId].total++
                agrupado[specId].questoes.push({
                    id: erro.questao_id,
                    erro_id: erro.id,
                    enunciado: questaoBase?.enunciado || 'Enunciado indisponível',
                    status: erro.status,
                    revisoes: erro.numero_erros,
                    data: erro.ultima_tentativa,
                    assunto: assuntoNome
                })
            })

            setSummary({
                total_erros: erros?.length || 0,
                especialidades: Object.values(agrupado)
            })

        } catch (error) {
            console.error('Failed to fetch errors', error)
        } finally {
            setLoading(false)
        }
    }

    const startReviewSession = async (filter?: { specialty_id?: string, question_ids?: string[] }) => {
        if (processing) return
        setProcessing(true)

        try {
            // Lógica Client-Side para criar Sessão
            // 1. Definir quais questões usar
            let questoesIds: string[] = []

            if (filter?.question_ids) {
                questoesIds = filter.question_ids
            } else if (filter?.specialty_id && summary) {
                const group = summary.especialidades.find(s => s.id === filter.specialty_id)
                if (group) questoesIds = group.questoes.map(q => q.id)
            } else if (summary) {
                // Todas
                summary.especialidades.forEach(g => {
                    questoesIds.push(...g.questoes.map(q => q.id))
                })
            }

            // Limitar a 10 para sessão padrão, ou permitir mais? O SRS padrão é 10.
            // Vamos limitar a 15 para caderno de erros para ser mais intenso?
            // Vamos manter 10 por "sessão" para não cansar.
            questoesIds = questoesIds.slice(0, 10)

            if (questoesIds.length === 0) {
                alert('Nenhuma questão selecionada.')
                setProcessing(false)
                return
            }

            // 2. Buscar detalhes completos das questões (necessário para o Store)
            const { data: questoesDetalhadas, error: qError } = await supabase
                .from('questao_base')
                .select('*')
                .in('id', questoesIds)

            if (qError || !questoesDetalhadas) throw new Error('Falha ao carregar detalhes das questões')

            // 3. Criar Sessão no Banco (para travar o histórico)
            // Assunto ID é necessário? Sim, FK.
            // Se for mix, usar o primeiro.
            const assuntoId = questoesDetalhadas[0]?.subject_id || null // subject_id é string ou uuid?
            // Wait, na tabela questao_base, 'subject_id' refere a string ou ID?
            // No schema antigo era string. No novo SRS é 'assunto_id' na sessao.
            // Vamos tentar achar um assunto_id válido.
            // Se não conseguirmos, podemos falhar na criação da sessão no banco.

            // HACK: Para Caderno de Erros, vamos pular a criação da sessão no banco SE falhar o assunto_id.
            // Mas precisamos do tracking para marcar como 'CONSOLIDADO'.
            // Então vamos tentar buscar o assunto pelo specialty_id.

            let finalAssuntoId = null
            const { data: assuntoRef } = await supabase
                .from('assuntos')
                .select('id')
                .eq('specialty_id', questoesDetalhadas[0].specialty_id)
                .limit(1)
                .single()

            if (assuntoRef) finalAssuntoId = assuntoRef.id

            if (finalAssuntoId) {
                const { data: sessao, error: sError } = await supabase
                    .from('sessoes')
                    .insert({
                        user_id: user?.id,
                        assunto_id: finalAssuntoId,
                        tipo: 'CADERNO_DE_ERROS',
                        status: 'EM_ANDAMENTO',
                        total_questoes: questoesDetalhadas.length,
                        total_acertos: 0
                    })
                    .select()
                    .single()

                if (sessao) {
                    const itens = questoesDetalhadas.map((q, i) => ({
                        sessao_id: sessao.id,
                        questao_id: q.id,
                        ordem: i + 1
                    }))
                    await supabase.from('sessao_itens').insert(itens)
                }
            } else {
                console.warn('Não foi possível criar sessão no banco (assunto_id não encontrado), mas seguindo modo offline.')
            }

            // 4. Injetar no Store e Navegar
            const questoesMapeadas = questoesDetalhadas.map((q: any) => ({
                ...q,
                explanation: q.explanation // garantir campos
            }))

            setEphemeralQuestions(questoesMapeadas)

            // Navegar para o quiz em modo especial
            router.push(`/dashboard/quiz/error-review?mode=CADERNO_ERROS`)

        } catch (error) {
            console.error(error)
            alert('Falha ao iniciar. Tente novamente.')
        } finally {
            setProcessing(false)
        }
    }

    const filteredSpecialties = summary?.especialidades.filter(s =>
        s.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.questoes.some(q => q.enunciado.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || []

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header Hero */}
            <div className="bg-[#1A1033] text-white pt-12 pb-24 px-6 md:px-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                    <BrainCircuit className="w-96 h-96 -mr-20 -mt-20" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="mb-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                        <ChevronLeft className="w-4 h-4" /> Voltar ao Dashboard
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] uppercase tracking-widest font-bold">
                                <AlertCircle className="w-3 h-3" /> Ambiente de Recuperação Ativa
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                                CADERNO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A966FF] to-[#63D1F0]">ERROS</span>.
                            </h1>
                            <p className="text-white/60 max-w-xl text-lg leading-relaxed">
                                O Dr. QRub mapeou as lacunas no seu conhecimento.
                                Resolva estas questões para transformar fraquezas em aprovação.
                            </p>
                        </div>

                        <div className="flex items-center gap-8 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <div className="text-center">
                                <span className="block text-xs uppercase tracking-widest text-white/40 mb-1">Total de Erros</span>
                                <span className="text-4xl font-black text-rose-500">{summary?.total_erros || 0}</span>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="text-center">
                                <span className="block text-xs uppercase tracking-widest text-white/40 mb-1">Especialidades</span>
                                <span className="text-4xl font-black text-white">{summary?.especialidades.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20 pb-20">
                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="flex-1 bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-2 flex items-center">
                        <Search className="w-5 h-5 text-slate-400 ml-4" />
                        <input
                            type="text"
                            placeholder="Buscar erro ou enunciado..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 border-none outline-none p-4 text-slate-700 bg-transparent font-medium placeholder:text-slate-400"
                        />
                    </div>

                    <button
                        onClick={() => startReviewSession()}
                        disabled={processing || summary?.total_erros === 0}
                        className="bg-gradient-to-r from-[#A966FF] to-[#D946EF] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-500/30 flex items-center gap-3 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {processing ? (
                            <RefreshCcw className="w-5 h-5 animate-spin" />
                        ) : (
                            <Play className="w-5 h-5 fill-current" />
                        )}
                        Repassar Tudo
                    </button>
                </div>

                {/* Empty State */}
                {summary?.total_erros === 0 ? (
                    <div className="bg-white rounded-[40px] p-20 text-center shadow-xl shadow-slate-200/50">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-4">Nenhum erro pendente!</h2>
                        <p className="text-slate-500 text-lg max-w-md mx-auto">
                            Seu caderno de erros está limpo. Você consolidou todo o conhecimento pendente.
                        </p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="mt-8 text-primary font-bold uppercase tracking-widest text-sm hover:underline"
                        >
                            Voltar para os Estudos
                        </button>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {filteredSpecialties.map((group) => (
                            <motion.div
                                key={group.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#7C3AED] flex items-center justify-center text-white">
                                            {/* Icon placeholder based on generic map */}
                                            <BrainCircuit className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-[#1A1033] uppercase italic">{group.nome}</h2>
                                            <p className="text-xs uppercase tracking-widest font-bold text-slate-400">{group.total} questões para revisar</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => startReviewSession({ specialty_id: group.id })}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                                    >
                                        Repassar Área <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {group.questoes.map((erro) => (
                                        <div key={erro.id} className={`group bg-white rounded-[32px] p-8 border hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden shadow-lg shadow-slate-200/50 ${erro.status === 'ATIVO' ? 'border-l-4 border-l-rose-500' : 'border-slate-100'}`}
                                            onClick={() => startReviewSession({ question_ids: [erro.id] })}
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`p-2 rounded-full ${erro.status === 'ATIVO' ? 'bg-rose-50 text-rose-500' : 'bg-orange-50 text-orange-500'}`}>
                                                    <AlertCircle className="w-5 h-5" />
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 block mb-1">Status</span>
                                                    <div className="flex gap-1 justify-end">
                                                        <div className={`w-2 h-2 rounded-full ${erro.status === 'ATIVO' ? 'bg-rose-500' : 'bg-slate-200'}`} />
                                                        <div className={`w-2 h-2 rounded-full ${erro.status === 'RECUPERACAO' ? 'bg-orange-400' : 'bg-slate-200'}`} />
                                                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="text-slate-700 font-bold mb-6 line-clamp-3 leading-relaxed">
                                                {erro.enunciado}
                                            </h3>

                                            <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-slate-400">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(erro.data).toLocaleDateString('pt-BR')}
                                                </div>
                                                <div className="group-hover:translate-x-1 transition-transform text-primary flex items-center gap-1">
                                                    Resolver <ChevronLeft className="w-3 h-3 rotate-180" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
