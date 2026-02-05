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
interface ErrorItem {
    id: string
    questao_id: string
    specialty_id: string
    subspecialty_id?: string
    tema: string
    assunto_id: string
    tipo_de_erro: 'conhecimento' | 'interpretacao' | 'conduta' | 'distracao'
    status: 'ativo' | 'em_revisao' | 'resolvido'
    nivel_de_gravidade: 'leve' | 'moderado' | 'crítico'
    contador_de_repeticao: number
    data_ultimo_erro: string
    proxima_revisao: string
    enunciado: string
    assunto_nome?: string
}

interface ErrorSummary {
    total_erros: number
    criticos: number
    erros: ErrorItem[]
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

            const { data: erros, error } = await supabase
                .from('caderno_erros')
                .select(`
                    id,
                    questao_id,
                    specialty_id,
                    subspecialty_id,
                    tema,
                    assunto_id,
                    tipo_de_erro,
                    status,
                    nivel_de_gravidade,
                    contador_de_repeticao,
                    data_ultimo_erro,
                    proxima_revisao,
                    assuntos (nome),
                    questao_base (enunciado)
                `)
                .eq('user_id', user!.id)
                .neq('status', 'resolvido')
                .order('nivel_de_gravidade', { ascending: false }) // Críticos primeiro

            if (error) throw error

            const mapeados: ErrorItem[] = erros?.map((e: any) => ({
                id: e.id,
                questao_id: e.questao_id,
                specialty_id: e.specialty_id,
                subspecialty_id: e.subspecialty_id,
                tema: e.tema,
                assunto_id: e.assunto_id,
                tipo_de_erro: e.tipo_de_erro,
                status: e.status,
                nivel_de_gravidade: e.nivel_de_gravidade,
                contador_de_repeticao: e.contador_de_repeticao,
                data_ultimo_erro: e.data_ultimo_erro,
                proxima_revisao: e.proxima_revisao,
                enunciado: e.questao_base?.enunciado || 'Enunciado indisponível',
                assunto_nome: e.assuntos?.nome
            })) || []

            setSummary({
                total_erros: mapeados.length,
                criticos: mapeados.filter(m => m.nivel_de_gravidade === 'crítico').length,
                erros: mapeados
            })

        } catch (error) {
            console.error('Failed to fetch errors', error)
        } finally {
            setLoading(false)
        }
    }

    const startReviewSession = async (errorItem?: ErrorItem) => {
        if (processing) return
        setProcessing(true)

        try {
            let questoesIds: string[] = []

            if (errorItem) {
                // Modo: Resolver Erro Específico (Mini-bloco de 3-5 questões novas)
                const { data: novasQuestoes } = await supabase
                    .from('questao_base')
                    .select('id')
                    .eq('subject_id', errorItem.tema)
                    .neq('id', errorItem.questao_id)
                    .limit(5)

                if (novasQuestoes && novasQuestoes.length > 0) {
                    questoesIds = novasQuestoes.map(q => q.id)
                } else {
                    questoesIds = [errorItem.questao_id]
                }
            } else if (summary) {
                // Modo: Repassar Tudo
                questoesIds = summary.erros.map(e => e.questao_id).slice(0, 10)
            }

            if (questoesIds.length === 0) {
                alert('Nenhuma questão para revisar.')
                setProcessing(false)
                return
            }

            const { data: questoesDetalhadas } = await supabase
                .from('questao_base')
                .select('*')
                .in('id', questoesIds)

            if (!questoesDetalhadas) throw new Error('Falha ao carregar questões')

            setEphemeralQuestions(questoesDetalhadas)
            router.push(`/dashboard/quiz/error-review?mode=CADERNO_ERROS&origin=${errorItem ? 'single' : 'all'}`)

        } catch (error) {
            console.error(error)
            alert('Falha ao iniciar. Tente novamente.')
        } finally {
            setProcessing(false)
        }
    }

    const filteredErrors = summary?.erros.filter(e =>
        e.enunciado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.assunto_nome?.toLowerCase().includes(searchTerm.toLowerCase())
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
                                <span className="text-4xl font-black text-white">{summary?.total_erros || 0}</span>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="text-center">
                                <span className="block text-xs uppercase tracking-widest text-white/40 mb-1">Críticos</span>
                                <span className="text-4xl font-black text-rose-500">{summary?.criticos || 0}</span>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredErrors.map((error) => (
                            <motion.div
                                key={error.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`group bg-white rounded-[32px] p-8 border hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden shadow-xl shadow-slate-200/50 flex flex-col ${error.nivel_de_gravidade === 'crítico' ? 'border-l-8 border-l-rose-500' : 'border-slate-100'}`}
                                onClick={() => startReviewSession(error)}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex flex-col gap-2">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${error.nivel_de_gravidade === 'crítico' ? 'bg-rose-100 text-rose-600' :
                                            error.nivel_de_gravidade === 'moderado' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {error.nivel_de_gravidade}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            Erro de {error.tipo_de_erro}
                                        </span>
                                    </div>
                                    <div className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 text-center">
                                        <span className="block text-[8px] uppercase tracking-tighter text-slate-400 font-bold">Repetições</span>
                                        <span className="text-sm font-black text-slate-700">{error.contador_de_repeticao}x</span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#7C3AED] mb-2">{error.assunto_nome || error.tema}</p>
                                    <h3 className="text-slate-800 font-bold mb-6 line-clamp-4 leading-relaxed text-sm">
                                        {error.enunciado}
                                    </h3>
                                </div>

                                <div className="pt-6 border-t border-slate-100 mt-auto">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                                            <Clock className="w-3 h-3" /> Revisar em {error.proxima_revisao ? new Date(error.proxima_revisao).toLocaleDateString('pt-BR') : 'Agendando...'}
                                        </div>
                                    </div>

                                    <button className="w-full py-4 rounded-xl bg-[#1A1033] text-white text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-primary transition-all flex items-center justify-center gap-2">
                                        Resolver Agora <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
