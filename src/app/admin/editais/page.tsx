'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
    getEditais,
    publishEdital,
    archiveEdital,
    deleteEdital,
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
        blue: 'bg-blue-50 border-blue-100 text-blue-600',
        green: 'bg-emerald-50 border-emerald-100 text-emerald-600',
        yellow: 'bg-amber-50 border-amber-100 text-amber-600',
        gray: 'bg-slate-50 border-slate-100 text-slate-600',
    }

    return (
        <div className={`border rounded-3xl p-6 ${colors[color].split(' text-')[0]} shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm border ${colors[color].split(' ')[1]}`}>
                    <span className="text-xl">{icon}</span>
                </div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{label}</p>
            </div>
            <p className="text-slate-900 text-4xl font-black tracking-tighter">{value}</p>
        </div>
    )
}

// ─── Tabela de editais ──────────────────────────────────────────────────────

function EditalRow({
    edital,
    onEdit,
    onPublish,
    onArchive,
    onDelete,
    onImport,
    onView,
    onFilters,
}: {
    edital: Edital
    onEdit: () => void
    onPublish: () => void
    onArchive: () => void
    onDelete: () => void
    onImport: () => void
    onView: () => void
    onFilters: () => void
}) {
    const statusColors: Record<string, string> = {
        rascunho: 'bg-amber-50 text-amber-700 border-amber-200',
        publicado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        arquivado: 'bg-slate-100 text-slate-500 border-slate-200',
    }

    return (
        <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
                <div>
                    <p className="text-slate-900 text-sm font-semibold line-clamp-1">{edital.titulo}</p>
                    <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider mt-0.5">{edital.banca} · {edital.ano}</p>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] border font-black uppercase tracking-widest ${statusColors[edital.status] || statusColors.rascunho}`}>
                    {edital.status}
                </span>
            </td>
            <td className="px-6 py-4 text-slate-600 text-xs font-medium">{formatDate_BR(edital.data_prova)}</td>
            <td className="px-6 py-4 text-slate-600 text-xs font-medium">{formatCurrency(edital.taxa)}</td>
            <td className="px-6 py-4">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold border border-blue-100">
                    {edital.total_questoes || 0} QUESTÕES
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
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
                    <ActionBtn icon="🗑️" title="Deletar" onClick={onDelete} color="red" />
                </div>
            </td>
        </tr>
    )
}

function ActionBtn({ icon, title, onClick, color }: { icon: string; title: string; onClick: () => void; color: string }) {
    const colors: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white',
        green: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white',
        yellow: 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-600 hover:text-white',
        purple: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-600 hover:text-white',
        gray: 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-600 hover:text-white',
        red: 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white',
    }

    return (
        <button
            title={title}
            onClick={onClick}
            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all shadow-sm ${colors[color]}`}
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

    async function handleDelete(id: string) {
        if (!confirm('ATENÇÃO: Deletar este edital? Esta ação não pode ser desfeita.')) return
        await deleteEdital(id)
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
        <div className="space-y-6 pb-20">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
                            <span className="text-xl">📋</span>
                        </div>
                        Gestão de Editais
                    </h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1 ml-14">
                        Sistema Inteligente — QRub v2
                    </p>
                </div>
                <button
                    onClick={() => { setEditingEdital(null); setShowForm(true) }}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                >
                    ➕ Novo Edital Master
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
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por título, banca ou ano..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3.5 text-slate-700 text-sm font-bold uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all flex items-center gap-2"
                >
                    <option value="">TODOS OS STATUS</option>
                    <option value="rascunho">RASCUNHOS</option>
                    <option value="publicado">PUBLICADOS</option>
                    <option value="arquivado">ARQUIVADOS</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Edital / Banca</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Data Prova</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Taxa</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Banco</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12">
                                        <p className="text-slate-400 font-medium mb-3">{error}</p>
                                        <button onClick={loadEditais} className="text-blue-600 text-sm font-bold hover:underline">Tentar novamente</button>
                                    </td>
                                </tr>
                            ) : loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse border-b border-slate-100 last:border-0">
                                        <td colSpan={6} className="p-4">
                                            <div className="h-10 bg-slate-100 rounded-2xl w-full" />
                                        </td>
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-20">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-inner">
                                            <span className="text-4xl grayscale opacity-50">📭</span>
                                        </div>
                                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Nenhum edital encontrado</p>
                                        {!search && !filterStatus && (
                                            <button
                                                onClick={() => { setEditingEdital(null); setShowForm(true) }}
                                                className="mt-3 text-blue-600 text-sm font-bold hover:underline underline-offset-4"
                                            >
                                                Criar primeiro edital
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(edital => (
                                    <EditalRow
                                        key={edital.id}
                                        edital={edital}
                                        onEdit={() => { setEditingEdital(edital); setShowForm(true) }}
                                        onPublish={() => handlePublish(edital.id)}
                                        onArchive={() => handleArchive(edital.id)}
                                        onDelete={() => handleDelete(edital.id)}
                                        onImport={() => setImportingEditalId(edital.id)}
                                        onView={() => router.push(`/dashboard/editais/${edital.slug || edital.id}`)}
                                        onFilters={() => setFiltersEdital(edital)}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            {showForm && (
                <EditalFormModal
                    edital={editingEdital as any}
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
                    editalBanca={filtersEdital.banca || ''}
                    onClose={() => setFiltersEdital(null)}
                />
            )}
        </div>
    )
}
