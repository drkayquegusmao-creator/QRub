'use client'

import { useEffect, useState, useCallback } from 'react'
import {
    getConcursoEditais,
    getConcursoEditalById,
    publishConcursoEdital,
    archiveConcursoEdital,
    deleteConcursoEdital,
    type Edital,
    type EditalWithDetails,
    formatDate_BR,
    formatCurrency,
} from '@/lib/concursos/editais'
import ConcursoEditalFormModal from '@/components/concursos/admin-edital-form-modal'
import ConcursoEditalImportQuestoes from '@/components/concursos/admin-edital-import-questoes'
import ConcursoEditalFiltersPanel from '@/components/concursos/admin-edital-filters-panel'
import { 
    Plus, Search, Filter, ShieldCheck, ClipboardCheck, 
    Calendar, MapPin, Edit2, Trash2, BookOpen, 
    Target, RefreshCw, Layers
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

// ─── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, color = 'indigo' }: { icon: any; label: string; value: string | number; color?: string }) {
    const colors: Record<string, string> = {
        indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
        emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
        amber: 'bg-amber-50 border-amber-100 text-amber-600',
        slate: 'bg-slate-50 border-slate-100 text-slate-600',
    }

    return (
        <div className={`border rounded-[2.5rem] p-8 ${colors[color].split(' text-')[0]} shadow-sm hover:shadow-xl transition-all group`}>
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm border ${colors[color].split(' ')[1]} group-hover:scale-110 transition-transform`}>
                    <div className={colors[color].split(' ')[2]}>{icon}</div>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{label}</p>
            </div>
            <p className="text-slate-900 text-5xl font-black italic tracking-tighter leading-none">{value}</p>
        </div>
    )
}

// ─── Edital Row ──────────────────────────────────────────────────────────

function EditalRow({
    edital,
    onEdit,
    onPublish,
    onArchive,
    onDelete,
    onImport,
    onFilters,
}: {
    edital: Edital
    onEdit: () => void
    onPublish: () => void
    onArchive: () => void
    onDelete: () => void
    onImport: () => void
    onFilters: () => void
}) {
    const statusColors: Record<string, string> = {
        rascunho: 'bg-amber-50 text-amber-700 border-amber-200',
        publicado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        arquivado: 'bg-slate-100 text-slate-500 border-slate-200',
    }

    return (
        <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <p className="text-slate-900 text-sm font-black uppercase italic tracking-tight">{edital.titulo}</p>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">{edital.banca || 'BANCA NÃO DEFINIDA'} · {edital.ano}</p>
                    </div>
                </div>
            </td>
            <td className="px-8 py-6">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColors[edital.status] || statusColors.rascunho}`}>
                    {edital.status}
                </span>
            </td>
            <td className="px-8 py-6 text-slate-500 font-bold text-xs italic">{formatDate_BR(edital.data_prova)}</td>
            <td className="px-8 py-6 text-slate-500 font-black text-xs">{formatCurrency(edital.taxa)}</td>
            <td className="px-8 py-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl w-fit">
                    <Layers size={12} className="opacity-50" />
                    <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                        {edital.total_questoes || 0} ALVOS
                    </span>
                </div>
            </td>
            <td className="px-8 py-6">
                <div className="flex items-center gap-2">
                    <ActionBtn icon={<Edit2 size={16} />} title="Editar Master" onClick={onEdit} color="indigo" />
                    <ActionBtn icon={<Plus size={16} />} title="Vincular Questões" onClick={onImport} color="indigo-solid" />
                    <ActionBtn icon={<Target size={16} />} title="Escopo do Certame" onClick={onFilters} color="indigo" />
                    {edital.status === 'rascunho' && (
                        <ActionBtn icon={<RefreshCw size={16} />} title="Publicar" onClick={onPublish} color="emerald" />
                    )}
                    <ActionBtn icon={<Trash2 size={16} />} title="Deletar" onClick={onDelete} color="rose" />
                </div>
            </td>
        </tr>
    )
}

function ActionBtn({ icon, title, onClick, color }: { icon: any; title: string; onClick: () => void; color: string }) {
    const colors: Record<string, string> = {
        indigo: 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100',
        'indigo-solid': 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white',
        rose: 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-600 hover:text-white',
    }

    return (
        <button
            title={title}
            onClick={onClick}
            className={`w-10 h-10 flex items-center justify-center rounded-2xl border transition-all active:scale-90 ${colors[color]}`}
        >
            {icon}
        </button>
    )
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function ConcursoEditaisAdminPage() {
    const [editais, setEditais] = useState<Edital[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState<string>('')

    const [showForm, setShowForm] = useState(false)
    const [editingEdital, setEditingEdital] = useState<EditalWithDetails | null>(null)
    const [importingEditalId, setImportingEditalId] = useState<string | null>(null)
    const [filtersEdital, setFiltersEdital] = useState<Edital | null>(null)

    const loadEditais = useCallback(async () => {
        setLoading(true)
        try {
            const { data, error: err } = await getConcursoEditais()
            if (err) throw err
            setEditais(data || [])
        } catch (err: any) {
            toast.error('Erro ao carregar editais: ' + err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { loadEditais() }, [loadEditais])

    async function handlePublish(id: string) {
        if (!confirm('Tornar este edital público no Mural de Concursos?')) return
        await publishConcursoEdital(id)
        loadEditais()
    }

    async function handleArchive(id: string) {
        if (!confirm('Mover este edital para o arquivo morto?')) return
        await archiveConcursoEdital(id)
        loadEditais()
    }

    async function handleDelete(id: string) {
        if (!confirm('Deseja realmente EXCLUIR este edital? Registro e vínculos serão perdidos.')) return
        await deleteConcursoEdital(id)
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
        alvos: editais.reduce((acc, curr) => acc + (curr.total_questoes || 0), 0)
    }

    return (
        <div className="space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Mural de Editais</h1>
                    <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-4 ml-1 flex items-center gap-2">
                        <ShieldCheck size={14} className="text-indigo-500" />
                        Ambiente Concursos Master
                    </p>
                </div>
                <button
                    onClick={() => { setEditingEdital(null); setShowForm(true) }}
                    className="flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
                >
                    <Plus size={20} />
                    Criar Novo Edital
                </button>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<ClipboardCheck size={28} />} label="Total Geral" value={stats.total} color="slate" />
                <StatCard icon={<ShieldCheck size={28} />} label="Publicados" value={stats.publicados} color="emerald" />
                <StatCard icon={<Edit2 size={24} />} label="Em Rascunho" value={stats.rascunhos} color="amber" />
                <StatCard icon={<Layers size={28} />} label="Questões Alvo" value={stats.alvos} color="indigo" />
            </div>

            {/* Tools Area */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Pesquisar por título, banca ou palavra-chave..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2.5rem] text-slate-800 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-200 transition-all shadow-sm"
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="bg-white border border-slate-100 rounded-[2.5rem] px-8 py-5 text-slate-700 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none shadow-sm cursor-pointer"
                    >
                        <option value="">Status: Todos</option>
                        <option value="rascunho">Rascunho</option>
                        <option value="publicado">Publicado</option>
                        <option value="arquivado">Arquivado</option>
                    </select>
                    <button 
                        onClick={loadEditais}
                        className="p-5 bg-white border border-slate-100 rounded-[2.5rem] text-slate-300 hover:text-indigo-600 transition-all shadow-sm active:rotate-180"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>

            {/* Matrix Display */}
            <div className="bg-white border border-slate-100 rounded-[3.5rem] shadow-2xl shadow-slate-200/40 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-50">
                            <tr>
                                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Edital / Corporação</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Data Prova</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Taxa</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Volume</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Comandos Master</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-10 py-8">
                                            <div className="h-10 bg-slate-50 rounded-2xl w-full" />
                                        </td>
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-32">
                                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-dashed border-slate-200">
                                            <Layers className="text-slate-200" size={32} />
                                        </div>
                                        <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Matriz de editais vazia</p>
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(edital => (
                                    <EditalRow
                                        key={edital.id}
                                        edital={edital}
                                        onEdit={async () => { 
                                            const { data, error } = await getConcursoEditalById(edital.id);
                                            if (error || !data) {
                                                toast.error('Erro ao carregar detalhes do edital');
                                                return;
                                            }
                                            setEditingEdital(data); 
                                            setShowForm(true); 
                                        }}
                                        onPublish={() => handlePublish(edital.id)}
                                        onArchive={() => handleArchive(edital.id)}
                                        onDelete={() => handleDelete(edital.id)}
                                        onImport={() => setImportingEditalId(edital.id)}
                                        onFilters={() => setFiltersEdital(edital)}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals Bridge */}
            <AnimatePresence>
                {showForm && (
                    <ConcursoEditalFormModal
                        edital={editingEdital || undefined}
                        onClose={() => { setShowForm(false); setEditingEdital(null) }}
                        onSuccess={() => { setShowForm(false); setEditingEdital(null); loadEditais() }}
                    />
                )}

                {importingEditalId && (
                    <ConcursoEditalImportQuestoes
                        editalId={importingEditalId}
                        onClose={() => setImportingEditalId(null)}
                        onSuccess={() => { setImportingEditalId(null); loadEditais() }}
                    />
                )}

                {filtersEdital && (
                    <ConcursoEditalFiltersPanel
                        editalId={filtersEdital.id}
                        editalBanca={filtersEdital.banca || ''}
                        onClose={() => setFiltersEdital(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
