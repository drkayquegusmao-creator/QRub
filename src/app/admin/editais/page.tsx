'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
    getEditais,
    publishEdital,
    archiveEdital,
    type Edital,
    formatDate_BR,
    formatCurrency,
} from '@/lib/editais'
import EditalFormModal from '@/components/edital-form-modal'
import EditalImportQuestoes from '@/components/edital-import-questoes'
import EditalFiltersPanel from '@/components/edital-filters-panel'

// ─── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, color = 'blue' }: { icon: string; label: string; value: string | number; color?: string }) {
    const colors: Record<string, string> = {
        blue: 'from-blue-600/20 to-blue-600/5 border-blue-500/20',
        green: 'from-green-600/20 to-green-600/5 border-green-500/20',
        yellow: 'from-yellow-600/20 to-yellow-600/5 border-yellow-500/20',
        gray: 'from-white/10 to-white/5 border-white/10',
    }

    return (
        <div className={`bg-gradient-to-br ${colors[color]} border rounded-2xl p-4`}>
            <p className="text-2xl mb-2">{icon}</p>
            <p className="text-white/50 text-xs mb-1">{label}</p>
            <p className="text-white text-2xl font-bold">{value}</p>
        </div>
    )
}

// ─── Tabela de editais ──────────────────────────────────────────────────────

function EditalRow({
    edital,
    onEdit,
    onPublish,
    onArchive,
    onImport,
    onView,
    onFilters,
}: {
    edital: Edital
    onEdit: () => void
    onPublish: () => void
    onArchive: () => void
    onImport: () => void
    onView: () => void
    onFilters: () => void
}) {
    const statusColors: Record<string, string> = {
        rascunho: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        publicado: 'bg-green-500/20 text-green-300 border-green-500/30',
        arquivado: 'bg-white/10 text-white/40 border-white/10',
    }

    return (
        <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <td className="px-4 py-3">
                <div>
                    <p className="text-white text-sm font-medium line-clamp-1">{edital.titulo}</p>
                    <p className="text-white/40 text-xs">{edital.banca} · {edital.ano}</p>
                </div>
            </td>
            <td className="px-4 py-3">
                <span className={`px-2.5 py-1 rounded-full text-xs border font-medium ${statusColors[edital.status] || statusColors.rascunho}`}>
                    {edital.status}
                </span>
            </td>
            <td className="px-4 py-3 text-white/60 text-sm">{formatDate_BR(edital.data_prova)}</td>
            <td className="px-4 py-3 text-white/60 text-sm">{formatCurrency(edital.taxa)}</td>
            <td className="px-4 py-3 text-white/60 text-sm">{edital.total_questoes || 0}</td>
            <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                    <ActionBtn icon="👁" title="Visualizar" onClick={onView} color="gray" />
                    <ActionBtn icon="✏️" title="Editar" onClick={onEdit} color="blue" />
                    <ActionBtn icon="📚" title="Importar Questoes" onClick={onImport} color="purple" />
                    <ActionBtn icon="🎯" title="Filtros de Questoes" onClick={onFilters} color="blue" />
                    {edital.status === 'rascunho' && (
                        <ActionBtn icon="🚀" title="Publicar" onClick={onPublish} color="green" />
                    )}
                    {edital.status === 'publicado' && (
                        <ActionBtn icon="📦" title="Arquivar" onClick={onArchive} color="yellow" />
                    )}
                </div>
            </td>
        </tr>
    )
}

function ActionBtn({ icon, title, onClick, color }: { icon: string; title: string; onClick: () => void; color: string }) {
    const colors: Record<string, string> = {
        blue: 'hover:bg-blue-500/20 hover:text-blue-300',
        green: 'hover:bg-green-500/20 hover:text-green-300',
        yellow: 'hover:bg-yellow-500/20 hover:text-yellow-300',
        purple: 'hover:bg-purple-500/20 hover:text-purple-300',
        gray: 'hover:bg-white/10 hover:text-white',
    }

    return (
        <button
            title={title}
            onClick={onClick}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-white/50 transition-all ${colors[color]}`}
        >
            <span className="text-sm">{icon}</span>
        </button>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function AdminEditaisPage() {
    const router = useRouter()
    const [editais, setEditais] = useState<Edital[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<string>('')

    const [showForm, setShowForm] = useState(false)
    const [editingEdital, setEditingEdital] = useState<Edital | null>(null)
    const [importingEditalId, setImportingEditalId] = useState<string | null>(null)
    const [filtersEdital, setFiltersEdital] = useState<Edital | null>(null)

    const loadEditais = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const { data, error: err } = await getEditais()
            if (err) throw err
            setEditais(data)
        } catch {
            setError('Erro ao carregar editais.')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { loadEditais() }, [loadEditais])

    async function handlePublish(id: string) {
        if (!confirm('Publicar este edital? Ele ficará visível para todos os alunos.')) return
        await publishEdital(id)
        loadEditais()
    }

    async function handleArchive(id: string) {
        if (!confirm('Arquivar este edital? Ele ficará oculto para alunos.')) return
        await archiveEdital(id)
        loadEditais()
    }

    const filtered = editais.filter(e => {
        const matchSearch = !search || e.titulo.toLowerCase().includes(search.toLowerCase()) || (e.banca || '').toLowerCase().includes(search.toLowerCase())
        const matchStatus = !filterStatus || e.status === filterStatus
        return matchSearch && matchStatus
    })

    const stats = {
        total: editais.length,
        publicados: editais.filter(e => e.status === 'publicado').length,
        rascunhos: editais.filter(e => e.status === 'rascunho').length,
        comQuestoes: editais.filter(e => (e.total_questoes || 0) > 0).length,
    }

    return (
        <div className="min-h-screen bg-[#080818] p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">📋 Gestão de Editais</h1>
                        <p className="text-white/40 text-sm mt-0.5">Sistema Inteligente de Editais — QRub</p>
                    </div>
                    <button
                        onClick={() => { setEditingEdital(null); setShowForm(true) }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors"
                    >
                        ➕ Novo Edital
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatCard icon="📋" label="Total" value={stats.total} color="gray" />
                    <StatCard icon="✅" label="Publicados" value={stats.publicados} color="green" />
                    <StatCard icon="📝" label="Rascunhos" value={stats.rascunhos} color="yellow" />
                    <StatCard icon="📚" label="Com Questões" value={stats.comQuestoes} color="blue" />
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar editais..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                    </div>
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        <option value="">Todos os status</option>
                        <option value="rascunho">Rascunho</option>
                        <option value="publicado">Publicado</option>
                        <option value="arquivado">Arquivado</option>
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                    {error ? (
                        <div className="text-center py-12">
                            <p className="text-white/50 mb-3">{error}</p>
                            <button onClick={loadEditais} className="text-blue-400 text-sm">Tentar novamente</button>
                        </div>
                    ) : loading ? (
                        <div className="space-y-0">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-4 p-4 border-b border-white/5 animate-pulse">
                                    <div className="flex-1 h-10 bg-white/10 rounded-xl" />
                                    <div className="w-20 h-6 bg-white/10 rounded-full" />
                                    <div className="w-24 h-6 bg-white/10 rounded" />
                                    <div className="w-20 h-6 bg-white/10 rounded" />
                                    <div className="w-32 h-6 bg-white/10 rounded" />
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-4xl mb-3">📭</p>
                            <p className="text-white/50">Nenhum edital encontrado</p>
                            {!search && !filterStatus && (
                                <button
                                    onClick={() => { setEditingEdital(null); setShowForm(true) }}
                                    className="mt-3 text-blue-400 text-sm"
                                >
                                    Criar primeiro edital
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="px-4 py-3 text-left text-white/50 text-xs font-medium uppercase">Edital</th>
                                        <th className="px-4 py-3 text-left text-white/50 text-xs font-medium uppercase">Status</th>
                                        <th className="px-4 py-3 text-left text-white/50 text-xs font-medium uppercase">Prova</th>
                                        <th className="px-4 py-3 text-left text-white/50 text-xs font-medium uppercase">Taxa</th>
                                        <th className="px-4 py-3 text-left text-white/50 text-xs font-medium uppercase">Questões</th>
                                        <th className="px-4 py-3 text-left text-white/50 text-xs font-medium uppercase">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(edital => (
                                        <EditalRow
                                            key={edital.id}
                                            edital={edital}
                                            onEdit={() => { setEditingEdital(edital); setShowForm(true) }}
                                            onPublish={() => handlePublish(edital.id)}
                                            onArchive={() => handleArchive(edital.id)}
                                            onImport={() => setImportingEditalId(edital.id)}
                                            onView={() => router.push(`/dashboard/editais/${edital.slug || edital.id}`)}
                                            onFilters={() => setFiltersEdital(edital)}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showForm && (
                <EditalFormModal
                    edital={editingEdital as never}
                    onClose={() => { setShowForm(false); setEditingEdital(null) }}
                    onSuccess={() => { setShowForm(false); setEditingEdital(null); loadEditais() }}
                />
            )}

            {importingEditalId && (
                <EditalImportQuestoes
                    editalId={importingEditalId}
                    onClose={() => setImportingEditalId(null)}
                    onSuccess={() => { setImportingEditalId(null); loadEditais() }}
                />
            )}

            {filtersEdital && (
                <EditalFiltersPanel
                    editalId={filtersEdital.id}
                    editalBanca={filtersEdital.banca}
                    onClose={() => setFiltersEdital(null)}
                />
            )}
        </div>
    )
}
