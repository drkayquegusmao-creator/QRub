'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import {
    getEditalBySlug_WithFilters, getEditalById_WithFilters,
    toggleAlerta, type EditalWithDetails, type EditalQuestionFilter,
    formatDate_BR, formatCurrency
} from '@/lib/editais'
import { BookOpen, ExternalLink, Bell, BellOff, AlertCircle, ChevronLeft, RefreshCw, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

// ─── Skeleton ────────────────────────────────────────────────────────────────

function DetailSkeleton() {
    return (
        <div className="min-h-screen bg-[#080818] animate-pulse">
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
                <div className="h-8 bg-white/10 rounded w-3/4" />
                <div className="h-5 bg-white/10 rounded w-1/3" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-white/10 rounded-2xl" />)}
                </div>
                <div className="h-64 bg-white/10 rounded-2xl" />
                <div className="h-40 bg-white/10 rounded-2xl" />
            </div>
        </div>
    )
}

// ─── Section ─────────────────────────────────────────────────────────────────

function Section({ title, icon, children, empty }: { title: string; icon: string; children?: React.ReactNode; empty?: string }) {
    return (
        <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <span className="text-xl">{icon}</span>
                <h2 className="text-white font-semibold">{title}</h2>
            </div>
            <div className="p-6">
                {children ?? (
                    <div className="text-center py-8 text-white/30">
                        <p className="text-3xl mb-2">📭</p>
                        <p>{empty || 'Nenhuma informação disponível'}</p>
                    </div>
                )}
            </div>
        </section>
    )
}

function QuickCard({ icon, label, value, highlight }: { icon: string; label: string; value: string; highlight?: boolean }) {
    return (
        <div className={`rounded-2xl p-4 border ${highlight ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
            <p className="text-2xl mb-1">{icon}</p>
            <p className="text-white/50 text-xs mb-0.5">{label}</p>
            <p className="text-white font-semibold text-sm leading-snug">{value}</p>
        </div>
    )
}

function Timeline({ eventos }: { eventos: EditalWithDetails['edital_eventos'] }) {
    if (!eventos || eventos.length === 0) return null
    const tipoLabel: Record<string, { label: string; icon: string }> = {
        inscricao: { label: 'Inscrição', icon: '📝' },
        isencao: { label: 'Isenção', icon: '💸' },
        prova: { label: 'Prova', icon: '🎯' },
        gabarito: { label: 'Gabarito', icon: '📋' },
        resultado: { label: 'Resultado', icon: '🏅' },
        recurso: { label: 'Recurso', icon: '⚖️' },
        outros: { label: 'Outros', icon: '📌' },
    }
    return (
        <div className="space-y-3">
            {eventos.map(ev => {
                const info = tipoLabel[ev.tipo_evento] || tipoLabel.outros
                const isPast = ev.data_inicio && new Date(ev.data_inicio + 'T12:00') < new Date()
                return (
                    <div key={ev.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${isPast ? 'opacity-60 border-white/5 bg-white/[0.02]' : 'border-white/10 bg-white/5'}`}>
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">{info.icon}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-white font-medium text-sm">{info.label}</p>
                                {isPast && <span className="text-xs text-white/30">(concluído)</span>}
                            </div>
                            <p className="text-white/60 text-sm">
                                {formatDate_BR(ev.data_inicio)}
                                {ev.data_fim && ev.data_fim !== ev.data_inicio && ` → ${formatDate_BR(ev.data_fim)}`}
                            </p>
                            {ev.observacao && <p className="text-white/40 text-xs mt-1">{ev.observacao}</p>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

// ─── BOTÃO PRINCIPAL: Resolver questões ──────────────────────────────────────

function ResolverQuestoesSection({
    edital,
    filters,
    router,
}: {
    edital: EditalWithDetails
    filters: EditalQuestionFilter | null
    router: ReturnType<typeof useRouter>
}) {
    const [loading, setLoading] = useState(false)
    const [questoesCount, setQuestoesCount] = useState<number | null>(null)
    const [noQuestions, setNoQuestions] = useState(false)

    const hasFilters = filters && (filters.banca_id || filters.banca_nome)
    const bancaDisplay = filters?.banca_nome || edital.banca || ''

    function buildQueryParams(mode?: 'banca_only') {
        const params = new URLSearchParams()
        params.set('editalId', edital.id)
        if (filters?.banca_id) params.set('bancaId', filters.banca_id)
        if (bancaDisplay) params.set('banca', bancaDisplay)

        if (mode !== 'banca_only') {
            if (filters?.area_ids?.length) params.set('areas', filters.area_ids.join(','))
            if (filters?.disciplina_ids?.length) params.set('disciplinas', filters.disciplina_ids.join(','))
            if (filters?.tema_ids?.length) params.set('temas', filters.tema_ids.join(','))
        }
        if (filters?.default_difficulty && filters.default_difficulty !== 'mista') {
            params.set('difficulty', filters.default_difficulty)
        }
        if (filters?.default_qty) params.set('qty', String(filters.default_qty))
        return params.toString()
    }

    function handleResolverQuestoes(mode?: 'banca_only') {
        setLoading(true)
        const qs = buildQueryParams(mode)
        router.push(`/dashboard/banco?${qs}`)
    }

    const hasTemas = (filters?.area_ids?.length || 0) + (filters?.disciplina_ids?.length || 0) + (filters?.tema_ids?.length || 0) > 0

    return (
        <div className="space-y-4">
            {/* Main CTA */}
            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleResolverQuestoes()}
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-base shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 transition-all disabled:opacity-70"
            >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <BookOpen className="w-5 h-5" />}
                Resolver questões deste edital
                {hasFilters && <Zap className="w-4 h-4 opacity-70" />}
            </motion.button>

            {/* Info sobre filtros ativos */}
            {hasTemas ? (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3">
                    <Zap className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-blue-300 text-sm font-medium">Questões filtradas por:</p>
                        <p className="text-blue-300/60 text-xs mt-0.5">
                            Banca: {bancaDisplay}
                            {filters?.area_ids?.length ? ` · ${filters.area_ids.length} área(s)` : ''}
                            {filters?.disciplina_ids?.length ? ` · ${filters.disciplina_ids.length} disciplina(s)` : ''}
                            {filters?.tema_ids?.length ? ` · ${filters.tema_ids.length} tema(s)` : ''}
                        </p>
                    </div>
                </div>
            ) : bancaDisplay ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-white/50 text-xs leading-relaxed">
                            Este edital ainda não tem temas definidos. Vamos focar na banca <strong className="text-white/70">{bancaDisplay}</strong>.
                        </p>
                        <button
                            onClick={() => handleResolverQuestoes('banca_only')}
                            className="text-blue-400 text-xs font-medium mt-2 hover:text-blue-300 transition-colors"
                        >
                            Rodar só por banca →
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-amber-300/80 text-xs leading-relaxed">
                        Este edital ainda não tem filtros configurados pelo admin. Você pode explorar o banco de questões direto.
                    </p>
                </div>
            )}
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const router = useRouter()
    const [edital, setEdital] = useState<EditalWithDetails | null>(null)
    const [filters, setFilters] = useState<EditalQuestionFilter | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [alertActive, setAlertActive] = useState(false)
    const [alertLoading, setAlertLoading] = useState(false)

    useEffect(() => {
        if (slug) loadEdital()
    }, [slug])

    async function loadEdital() {
        setLoading(true)
        setError(null)
        try {
            let result = await getEditalBySlug_WithFilters(slug)
            if (!result.data) result = await getEditalById_WithFilters(slug)
            if (!result.data) throw new Error('Edital não encontrado')
            setEdital(result.data)
            // edital_question_filters is joined as an object (1:1 relationship)
            const f = (result.data as any).edital_question_filters
            setFilters(Array.isArray(f) ? f[0] || null : f || null)
        } catch {
            setError('Edital não encontrado ou não disponível.')
        } finally {
            setLoading(false)
        }
    }

    async function handleToggleAlerta() {
        if (!edital) return
        setAlertLoading(true)
        try {
            const { ativo } = await toggleAlerta(edital.id)
            setAlertActive(ativo)
        } catch { /* silently fail */ } finally {
            setAlertLoading(false)
        }
    }

    if (loading) return <DetailSkeleton />

    if (error || !edital) {
        return (
            <div className="min-h-screen bg-[#080818] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-6xl mb-4">📭</p>
                    <h1 className="text-white text-xl font-bold mb-2">Edital não encontrado</h1>
                    <p className="text-white/40 mb-6">{error}</p>
                    <button onClick={() => router.push('/dashboard/editais')} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors">
                        ← Voltar
                    </button>
                </div>
            </div>
        )
    }

    const now = new Date()
    const inscFim = edital.data_inscricao_fim ? new Date(edital.data_inscricao_fim + 'T23:59') : null
    const isOpen = inscFim && inscFim > now

    return (
        <div className="min-h-screen bg-[#080818]">
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

                {/* Header */}
                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-3">
                                <button onClick={() => router.push('/dashboard/editais')} className="flex items-center gap-1 text-white/40 hover:text-white text-sm transition-colors">
                                    <ChevronLeft className="w-4 h-4" /> Editais
                                </button>
                                <span className="text-white/20">/</span>
                                {isOpen ? (
                                    <span className="px-2.5 py-0.5 bg-green-500/20 border border-green-500/40 text-green-300 text-xs rounded-full">✅ Inscrições abertas</span>
                                ) : (
                                    <span className="px-2.5 py-0.5 bg-white/10 border border-white/10 text-white/40 text-xs rounded-full">Encerrado</span>
                                )}
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{edital.titulo}</h1>
                            <p className="text-white/50">{[edital.banca, edital.ano, edital.area].filter(Boolean).join(' · ')}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {edital.pdf_url && (
                                <a href={edital.pdf_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/15 text-white text-sm rounded-xl transition-colors border border-white/10">
                                    <ExternalLink className="w-3.5 h-3.5" /> PDF
                                </a>
                            )}
                            {edital.fonte_url && (
                                <a href={edital.fonte_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/15 text-white text-sm rounded-xl transition-colors border border-white/10">
                                    <ExternalLink className="w-3.5 h-3.5" /> Site Oficial
                                </a>
                            )}
                            <button onClick={handleToggleAlerta} disabled={alertLoading} className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl transition-colors border ${alertActive ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' : 'bg-white/10 border-white/10 text-white hover:bg-white/15'}`}>
                                {alertActive ? <><Bell className="w-3.5 h-3.5" /> Alerta ativo</> : <><BellOff className="w-3.5 h-3.5" /> Alertar</>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <QuickCard icon="📅" label="Inscrições" value={edital.data_inscricao_inicio ? `${formatDate_BR(edital.data_inscricao_inicio)} até ${formatDate_BR(edital.data_inscricao_fim)}` : '—'} highlight={isOpen === true} />
                    <QuickCard icon="💰" label="Taxa" value={formatCurrency(edital.taxa)} />
                    <QuickCard icon="🎯" label="Data da Prova" value={formatDate_BR(edital.data_prova)} />
                    <QuickCard icon="📍" label="Local" value={edital.local_resumido || '—'} />
                </div>

                {/* ── BOTÃO PRINCIPAL ────────────────────────────────────────────── */}
                <Section title="Questões do Edital" icon="📚">
                    <ResolverQuestoesSection edital={edital} filters={filters} router={router} />
                </Section>

                {/* Cronograma */}
                {edital.edital_eventos && edital.edital_eventos.length > 0 ? (
                    <Section title="Cronograma" icon="📅">
                        <Timeline eventos={edital.edital_eventos} />
                    </Section>
                ) : (
                    <Section title="Cronograma" icon="📅" empty="Cronograma não disponível para este edital" />
                )}

                {/* Links */}
                {edital.edital_links && edital.edital_links.length > 0 && (
                    <Section title="Links Oficiais" icon="🔗">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {edital.edital_links.map(lk => (
                                <a key={lk.id} href={lk.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:border-blue-500/40 rounded-xl transition-all group">
                                    <span className="text-2xl">{lk.tipo === 'inscricao' ? '📝' : lk.tipo === 'resultado' ? '🏅' : '🔗'}</span>
                                    <div className="min-w-0">
                                        <p className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">{lk.rotulo}</p>
                                        <p className="text-white/40 text-xs truncate">{lk.tipo}</p>
                                    </div>
                                    <span className="ml-auto text-white/30 group-hover:text-blue-400">↗</span>
                                </a>
                            ))}
                        </div>
                    </Section>
                )}

                {/* Conteúdo programático */}
                {edital.conteudo_programatico && (
                    <Section title="Conteúdo Programático" icon="📚">
                        <div className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{edital.conteudo_programatico}</div>
                    </Section>
                )}

                {/* Etapas e regras */}
                {edital.etapas_regras && (
                    <Section title="Etapas e Regras" icon="📜">
                        <div className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{edital.etapas_regras}</div>
                    </Section>
                )}

                {/* Histórico */}
                {edital.edital_versoes && edital.edital_versoes.length > 0 && (
                    <Section title="Histórico / Retificações" icon="🕐">
                        <div className="space-y-2">
                            {edital.edital_versoes.map(v => (
                                <div key={v.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                    <span className="text-white/40 text-xs bg-white/10 px-2 py-1 rounded">v{v.versao}</span>
                                    <p className="text-white/70 text-sm flex-1">{v.descricao || 'Atualização'}</p>
                                    <p className="text-white/30 text-xs">{v.created_at ? new Date(v.created_at).toLocaleDateString('pt-BR') : ''}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}
            </div>
        </div>
    )
}
