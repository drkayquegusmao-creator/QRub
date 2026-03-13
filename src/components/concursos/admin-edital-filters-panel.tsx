'use client'

import { useState, useEffect, useMemo } from 'react'
import { Save, X, Filter, Search, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { getConcursoEditalFilters, upsertConcursoEditalFilters, type EditalQuestionFilter } from '@/lib/concursos/editais'
import { getConcursoBanks, type ConcursoBank } from '@/lib/concursos/banks'
import { useConcursoTaxonomy } from '@/store/concursos/use-taxonomy'

interface Props {
    editalId: string
    editalBanca?: string 
    onClose: () => void
}

export default function ConcursoEditalFiltersPanel({ editalId, editalBanca, onClose }: Props) {
    const { taxonomy, loadTaxonomy } = useConcursoTaxonomy()
    const [banks, setBanks] = useState<ConcursoBank[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [filters, setFilters] = useState<EditalQuestionFilter>({
        edital_id: editalId,
        banca_id: '',
        banca_nome: editalBanca || '',
        area_ids: [],
        disciplina_ids: [],
        tema_ids: [],
        default_difficulty: 'media',
        default_qty: 20,
    })

    const areas = useMemo(() => taxonomy.filter(t => t.level === 'area'), [taxonomy])
    const disciplinas = useMemo(() => taxonomy.filter(t => t.level === 'disciplina'), [taxonomy])
    const assuntos = useMemo(() => taxonomy.filter(t => t.level === 'assunto'), [taxonomy])

    useEffect(() => {
        async function init() {
            setLoading(true)
            await loadTaxonomy()
            const { data: bankData } = await getConcursoBanks()
            setBanks(bankData || [])
            const { data: existing } = await getConcursoEditalFilters(editalId)
            if (existing) {
                setFilters({
                    ...existing,
                    area_ids: existing.area_ids || [],
                    disciplina_ids: existing.disciplina_ids || [],
                    tema_ids: existing.tema_ids || [],
                })
            }
            setLoading(false)
        }
        init()
    }, [editalId])

    function toggleTag(field: 'area_ids' | 'disciplina_ids' | 'tema_ids', id: string) {
        setFilters(prev => {
            const current = (prev as any)[field] || []
            return {
                ...prev,
                [field]: current.includes(id) ? current.filter((x: string) => x !== id) : [...current, id]
            }
        })
    }

    async function handleSave() {
        setSaving(true)
        try {
            const { error } = await upsertConcursoEditalFilters(editalId, {
                banca_id: filters.banca_id || undefined,
                banca_nome: filters.banca_nome,
                area_ids: filters.area_ids,
                disciplina_ids: filters.disciplina_ids,
                tema_ids: filters.tema_ids,
                default_difficulty: filters.default_difficulty,
                default_qty: filters.default_qty,
            })
            if (error) throw error
            toast.success('Filtros salvos!')
            onClose()
        } catch {
            toast.error('Erro ao salvar filtros')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-slate-100 rounded-[3rem] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Header */}
                <div className="p-10 border-b border-slate-50 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Filter className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Filtros Inteligentes</h2>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Configuração de Alvo para o Certame</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-4 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-2xl">
                        <X size={24} />
                    </button>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <RefreshCw className="w-10 h-10 text-indigo-400 animate-spin" />
                        <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Sincronizando Matrizes...</p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-10 space-y-10">
                        {/* Banca Section */}
                        <div className="space-y-4">
                            <label className="text-[12px] font-black uppercase text-slate-900 tracking-widest ml-1 flex items-center gap-2">
                                <Search size={14} className="text-indigo-500" />
                                Origem: Banca Examinadora
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select
                                    value={filters.banca_id || ''}
                                    onChange={e => {
                                        const bank = banks.find(b => b.id === e.target.value)
                                        setFilters(prev => ({ ...prev, banca_id: e.target.value, banca_nome: bank?.name || prev.banca_nome }))
                                    }}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-sm outline-none shadow-inner"
                                >
                                    <option value="">Buscar banca cadastrada...</option>
                                    {banks.map(b => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder="Nome da Banca Manual"
                                    value={filters.banca_nome || ''}
                                    onChange={e => setFilters(prev => ({ ...prev, banca_nome: e.target.value }))}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-sm outline-none shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Defaults Grid */}
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Dificuldade Alvo</label>
                                <select
                                    value={filters.default_difficulty || 'media'}
                                    onChange={e => setFilters(prev => ({ ...prev, default_difficulty: e.target.value as any }))}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-xs outline-none shadow-inner"
                                >
                                    <option value="facil">Fácil</option>
                                    <option value="media">Média</option>
                                    <option value="dificil">Difícil</option>
                                    <option value="mista">Mista / Aleatória</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Volume de Questões</label>
                                <select
                                    value={filters.default_qty || 20}
                                    onChange={e => setFilters(prev => ({ ...prev, default_qty: Number(e.target.value) }))}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-xs outline-none shadow-inner"
                                >
                                    {[5, 10, 20, 30, 50, 100].map(n => (
                                        <option key={n} value={n}>{n} questões</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Taxonomy Selectors */}
                        <div className="space-y-10">
                            <TagSection 
                                title="Macro Áreas" 
                                items={areas} 
                                selected={filters.area_ids || []} 
                                onToggle={id => toggleTag('area_ids', id)} 
                                color="indigo"
                            />
                            <TagSection 
                                title="Disciplinas Específicas" 
                                items={disciplinas} 
                                selected={filters.disciplina_ids || []} 
                                onToggle={id => toggleTag('disciplina_ids', id)} 
                                color="indigo"
                            />
                            <TagSection 
                                title="Temas & Assuntos" 
                                items={assuntos} 
                                selected={filters.tema_ids || []} 
                                onToggle={id => toggleTag('tema_ids', id)} 
                                color="indigo"
                            />
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="p-10 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                    <button onClick={onClose} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">
                        Descartar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || (!filters.banca_id && !filters.banca_nome)}
                        className="flex items-center gap-3 px-12 py-5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Salvar Configuração Master
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

function TagSection({ title, items, selected, onToggle, color }: {
    title: string
    items: any[]
    selected: string[]
    onToggle: (id: string) => void
    color: string
}) {
    const [search, setSearch] = useState('')
    const filtered = items.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-[12px] font-black uppercase text-slate-900 tracking-widest ml-1">{title}</label>
                <div className="bg-slate-50 rounded-xl px-4 py-1.5 flex items-center gap-3 shadow-inner">
                    <Search size={12} className="text-slate-300" />
                    <input 
                        placeholder="Filtrar..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent border-none outline-none text-[10px] font-bold w-24"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {filtered.map(item => {
                    const isSelected = selected.includes(item.id)
                    return (
                        <button
                            key={item.id}
                            onClick={() => onToggle(item.id)}
                            className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                                isSelected
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200'
                            }`}
                        >
                            {item.name}
                        </button>
                    )
                })}
                {filtered.length === 0 && <p className="text-[10px] font-black text-slate-200 uppercase tracking-widest py-4">Nenhum resultado</p>}
            </div>
        </div>
    )
}
