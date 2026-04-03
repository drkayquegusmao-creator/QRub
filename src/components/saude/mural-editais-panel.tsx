'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, ClipboardCheck, Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'
import {
    getEditais,
    publishEdital,
    archiveEdital,
    deleteEdital,
    type Edital,
} from '@/lib/editais'
import EditalFormModal from '@/components/edital-form-modal'
import EditalImportQuestoes from '@/components/edital-import-questoes'
import EditalFiltersPanel from '@/components/edital-filters-panel'

export function MuralDeEditaisPanel() {
    const [editais, setEditais] = useState<Edital[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('')

    // Modal states
    const [showForm, setShowForm] = useState(false)
    const [editingEdital, setEditingEdital] = useState<Edital | null>(null)
    const [importingEditalId, setImportingEditalId] = useState<string | null>(null)
    const [filtersEdital, setFiltersEdital] = useState<Edital | null>(null)

    const load = useCallback(async () => {
        setLoading(true)
        setError(null)
        const { data, error: err } = await getEditais()
        if (err) setError('Erro ao carregar editais. Verifique o console.')
        else setEditais(data)
        setLoading(false)
    }, [])

    useEffect(() => { load() }, [load])

    const handlePublish = async (edital: Edital) => {
        if (!window.confirm(`Publicar "${edital.titulo}"? Ficará visível para todos os alunos.`)) return
        const { error: err } = await publishEdital(edital.id)
        if (err) toast.error('Erro ao publicar edital.')
        else { toast.success('Edital publicado!'); load() }
    }

    const handleArchive = async (edital: Edital) => {
        if (!window.confirm(`Arquivar "${edital.titulo}"? Ele ficará oculto para alunos.`)) return
        const { error: err } = await archiveEdital(edital.id)
        if (err) toast.error('Erro ao arquivar edital.')
        else { toast.success('Edital arquivado.'); load() }
    }

    const handleDelete = async (edital: Edital) => {
        if (!window.confirm(`DELETAR "${edital.titulo}"? Esta ação é IRREVERSÍVEL.`)) return
        const { error: err } = await deleteEdital(edital.id)
        if (err) toast.error('Erro ao deletar edital.')
        else { toast.success('Edital deletado.'); load() }
    }

    const filtered = editais.filter(e => {
        const matchSearch = !search
            || e.titulo?.toLowerCase().includes(search.toLowerCase())
            || (e.banca || '').toLowerCase().includes(search.toLowerCase())
        const matchStatus = !filterStatus || e.status === filterStatus
        return matchSearch && matchStatus
    })

    const stats = {
        total: editais.length,
        publicados: editais.filter(e => e.status === 'publicado').length,
        rascunhos: editais.filter(e => e.status === 'rascunho').length,
    }

    const statusStyle: Record<string, string> = {
        rascunho: 'bg-amber-50 text-amber-700 border-amber-200',
        publicado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        arquivado: 'bg-slate-100 text-slate-500 border-slate-200',
    }

    return (
        <div className="space-y-8">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/20">
                        <ClipboardCheck size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Mural de Editais
                        </h1>
                        <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-2">
                            Protocolo QRub Saúde • Gestão de Editais
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => { setEditingEdital(null); setShowForm(true) }}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Novo Edital
                </button>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total', value: stats.total, style: 'bg-slate-50 border-slate-200 text-slate-700' },
                    { label: 'Publicados', value: stats.publicados, style: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                    { label: 'Rascunhos', value: stats.rascunhos, style: 'bg-amber-50 border-amber-200 text-amber-700' },
                ].map(s => (
                    <div key={s.label} className={`border rounded-3xl p-6 ${s.style}`}>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-3 opacity-60">{s.label}</p>
                        <p className="text-4xl font-black italic tracking-tighter">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* ── Filters ── */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por título ou banca..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3.5 text-slate-700 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-indigo-500 transition-all"
                >
                    <option value="">TODOS OS STATUS</option>
                    <option value="rascunho">RASCUNHOS</option>
                    <option value="publicado">PUBLICADOS</option>
                    <option value="arquivado">ARQUIVADOS</option>
                </select>
            </div>

            {/* ── Table ── */}
            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/40 overflow-hidden">
                {error && (
                    <div className="p-6 bg-rose-50 border-b border-rose-100 text-rose-600 text-sm font-bold text-center">
                        ⚠️ {error} — <button onClick={load} className="underline">Tentar novamente</button>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                {['Edital / Banca', 'Status', 'Data Prova', 'Taxa', 'Questões', 'Ações'].map(h => (
                                    <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i} className="animate-pulse border-b border-slate-100">
                                        <td colSpan={6} className="p-4">
                                            <div className="h-10 bg-slate-100 rounded-2xl w-full" />
                                        </td>
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-20">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                            <ClipboardCheck className="w-8 h-8 text-slate-300" />
                                        </div>
                                        <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                                            Nenhum edital encontrado
                                        </p>
                                        {!search && !filterStatus && (
                                            <button
                                                onClick={() => { setEditingEdital(null); setShowForm(true) }}
                                                className="mt-4 text-indigo-600 text-sm font-bold hover:underline"
                                            >
                                                Criar primeiro edital →
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ) : filtered.map(edital => (
                                <tr key={edital.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-slate-900 text-sm font-semibold line-clamp-1">{edital.titulo}</p>
                                        <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider mt-0.5">
                                            {edital.banca || '—'} · {edital.ano || '—'}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] border font-black uppercase tracking-widest ${statusStyle[edital.status] || statusStyle.rascunho}`}>
                                            {edital.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-xs font-medium whitespace-nowrap">
                                        {edital.data_prova ? new Date(edital.data_prova + 'T12:00').toLocaleDateString('pt-BR') : '—'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-xs font-medium whitespace-nowrap">
                                        {edital.taxa ? `R$ ${Number(edital.taxa).toFixed(2)}` : '—'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl text-[10px] font-bold border border-indigo-100">
                                            {(edital as any).total_questoes || 0} questões
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {/* Editar */}
                                            <ActionBtn
                                                title="Editar"
                                                emoji="✏️"
                                                color="blue"
                                                onClick={() => { setEditingEdital(edital); setShowForm(true) }}
                                            />
                                            {/* Importar questões */}
                                            <ActionBtn
                                                title="Importar Questões"
                                                emoji="📚"
                                                color="purple"
                                                onClick={() => setImportingEditalId(edital.id)}
                                            />
                                            {/* Filtros */}
                                            <ActionBtn
                                                title="Filtros de Questões"
                                                emoji="🎯"
                                                color="slate"
                                                onClick={() => setFiltersEdital(edital)}
                                            />
                                            {/* Publicar (apenas rascunho) */}
                                            {edital.status === 'rascunho' && (
                                                <ActionBtn
                                                    title="Publicar"
                                                    emoji="🚀"
                                                    color="green"
                                                    onClick={() => handlePublish(edital)}
                                                />
                                            )}
                                            {/* Arquivar (apenas publicado) */}
                                            {edital.status === 'publicado' && (
                                                <ActionBtn
                                                    title="Arquivar"
                                                    emoji="📦"
                                                    color="amber"
                                                    onClick={() => handleArchive(edital)}
                                                />
                                            )}
                                            {/* Ocultar/Re-publicar (apenas arquivado) */}
                                            {edital.status === 'arquivado' && (
                                                <ActionBtn
                                                    title="Re-publicar"
                                                    emoji="🔄"
                                                    color="green"
                                                    onClick={() => handlePublish(edital)}
                                                />
                                            )}
                                            {/* Deletar */}
                                            <ActionBtn
                                                title="Deletar"
                                                emoji="🗑️"
                                                color="red"
                                                onClick={() => handleDelete(edital)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Modals ── */}
            {showForm && (
                <EditalFormModal
                    edital={editingEdital as any}
                    onClose={() => { setShowForm(false); setEditingEdital(null) }}
                    onSuccess={() => { setShowForm(false); setEditingEdital(null); load() }}
                />
            )}
            {importingEditalId && (
                <EditalImportQuestoes
                    editalId={importingEditalId}
                    onClose={() => setImportingEditalId(null)}
                    onSuccess={() => { setImportingEditalId(null); load() }}
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

// ── Action Button ─────────────────────────────────────────────────────────────

type BtnColor = 'blue' | 'green' | 'amber' | 'purple' | 'slate' | 'red'

function ActionBtn({ title, emoji, color, onClick }: { title: string; emoji: string; color: BtnColor; onClick: () => void }) {
    const styles: Record<BtnColor, string> = {
        blue:   'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600',
        green:  'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600',
        amber:  'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-500 hover:text-white hover:border-amber-500',
        purple: 'bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-600 hover:text-white hover:border-purple-600',
        slate:  'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-600 hover:text-white hover:border-slate-600',
        red:    'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600',
    }

    return (
        <button
            title={title}
            onClick={onClick}
            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all shadow-sm active:scale-90 ${styles[color]}`}
        >
            <span className="text-sm">{emoji}</span>
        </button>
    )
}
