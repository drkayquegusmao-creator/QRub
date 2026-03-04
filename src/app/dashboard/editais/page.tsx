'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getEditais, type Edital, formatDate_BR, formatCurrency } from '@/lib/editais'

// ─── Skeleton ─────────────────────────────────────────────────────────────

function EditalCardSkeleton() {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="h-5 bg-white/10 rounded w-48 mb-2" />
                    <div className="h-4 bg-white/10 rounded w-32" />
                </div>
                <div className="h-6 bg-white/10 rounded-full w-20" />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-white/10 rounded-xl" />)}
            </div>
            <div className="h-10 bg-white/10 rounded-xl" />
        </div>
    )
}

// ─── Card ─────────────────────────────────────────────────────────────────

function EditalCard({ edital, onClick }: { edital: Edital; onClick: () => void }) {
    const areaLabel: Record<string, string> = {
        concurso: '🏛️ Concurso',
        residencia: '🏥 Residência',
        titulo: '📜 Título',
        revalidacao: '🔄 Revalidação',
        outros: '📋 Outros',
    }

    const now = new Date()
    const inscFim = edital.data_inscricao_fim ? new Date(edital.data_inscricao_fim + 'T23:59') : null
    const isOpen = inscFim && inscFim > now

    return (
        <div
            onClick={onClick}
            className="group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-500/40 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5"
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                    <h3 className="text-white font-semibold text-base group-hover:text-blue-300 transition-colors line-clamp-2">
                        {edital.titulo}
                    </h3>
                    <p className="text-white/50 text-sm mt-0.5">
                        {edital.banca && <span>{edital.banca} · </span>}
                        {edital.ano}
                    </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                    {isOpen ? (
                        <span className="px-2.5 py-1 bg-green-500/20 border border-green-500/40 text-green-300 text-xs rounded-full font-medium">
                            🟢 Aberto
                        </span>
                    ) : (
                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/40 text-xs rounded-full">
                            Encerrado
                        </span>
                    )}
                    <span className="text-xs text-white/30">{areaLabel[edital.area || 'concurso']}</span>
                </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-2.5 mb-4">
                <InfoChip icon="📅" label="Inscrições" value={
                    edital.data_inscricao_inicio
                        ? `${formatDate_BR(edital.data_inscricao_inicio)} → ${formatDate_BR(edital.data_inscricao_fim)}`
                        : '—'
                } />
                <InfoChip icon="🎯" label="Prova" value={formatDate_BR(edital.data_prova)} />
                <InfoChip icon="💰" label="Taxa" value={formatCurrency(edital.taxa)} />
                <InfoChip icon="📍" label="Local" value={edital.local_resumido || '—'} />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
                {edital.total_questoes ? (
                    <span className="text-xs text-blue-400/70">📚 {edital.total_questoes} questões</span>
                ) : (
                    <span className="text-xs text-white/30">📚 Sem questões</span>
                )}
                <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Ver edital →
                </span>
            </div>
        </div>
    )
}

function InfoChip({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
        <div className="bg-white/5 rounded-xl p-2.5">
            <p className="text-white/40 text-xs mb-0.5">{icon} {label}</p>
            <p className="text-white/80 text-xs font-medium line-clamp-1">{value}</p>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function EditaisListPage() {
    const router = useRouter()
    const [editais, setEditais] = useState<Edital[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [filterArea, setFilterArea] = useState('')

    useEffect(() => {
        loadEditais()
    }, [])

    async function loadEditais() {
        setLoading(true)
        setError(null)
        try {
            const { data, error: err } = await getEditais({ status: 'publicado' })
            if (err) throw err
            setEditais(data)
        } catch {
            setError('Não foi possível carregar os editais. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    const filtered = editais.filter(e => {
        const matchSearch = !search ||
            e.titulo.toLowerCase().includes(search.toLowerCase()) ||
            (e.banca || '').toLowerCase().includes(search.toLowerCase())
        const matchArea = !filterArea || e.area === filterArea
        return matchSearch && matchArea
    })

    return (
        <div className="min-h-screen bg-[#080818]">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Hero */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">📋</span>
                        <h1 className="text-3xl font-bold text-white">Editais</h1>
                    </div>
                    <p className="text-white/50">Acompanhe os principais editais e pratique com questões específicas</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar por nome, banca..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <select
                        value={filterArea}
                        onChange={e => setFilterArea(e.target.value)}
                        className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        <option value="">Todas as áreas</option>
                        <option value="concurso">Concurso Público</option>
                        <option value="residencia">Residência Médica</option>
                        <option value="titulo">Título de Especialista</option>
                        <option value="revalidacao">Revalidação</option>
                    </select>
                </div>

                {/* Content */}
                {error ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">⚠️</p>
                        <p className="text-white/70 mb-4">{error}</p>
                        <button
                            onClick={loadEditais}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                        >
                            Tentar novamente
                        </button>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => <EditalCardSkeleton key={i} />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">📭</p>
                        <p className="text-white font-semibold mb-2">Nenhum edital encontrado</p>
                        <p className="text-white/40 text-sm">
                            {search || filterArea ? 'Tente ajustar os filtros' : 'Novos editais em breve!'}
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="text-white/40 text-sm mb-4">{filtered.length} edital(is)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filtered.map(e => (
                                <EditalCard
                                    key={e.id}
                                    edital={e}
                                    onClick={() => router.push(`/dashboard/editais/${e.slug || e.id}`)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
