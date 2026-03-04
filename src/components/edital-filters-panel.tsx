'use client'

import { useState, useEffect, useMemo } from 'react'
import { Save, X, CheckCircle2, AlertCircle, RefreshCw, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { getEditalFilters, upsertEditalFilters, type EditalQuestionFilter } from '@/lib/editais'
import { getBanks, type Bank } from '@/lib/banks'
import { useTaxonomy, TaxonomyNode } from '@/store/use-taxonomy'

interface Props {
    editalId: string
    editalBanca?: string // fallback name
    onClose: () => void
}

export default function EditalFiltersPanel({ editalId, editalBanca, onClose }: Props) {
    const { taxonomy, loadTaxonomy } = useTaxonomy()
    const [banks, setBanks] = useState<Bank[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [filters, setFilters] = useState<EditalQuestionFilter>({
        edital_id: editalId,
        banca_id: '',
        banca_nome: editalBanca || '',
        area_ids: [],
        disciplina_ids: [],
        tema_ids: [],
        default_difficulty: 'mista',
        default_qty: 20,
    })

    // Flat taxonomy lists
    const areas = useMemo(() => {
        const list: { id: string; name: string }[] = []
        function walk(node: TaxonomyNode) {
            if (node.level === 'specialty') list.push({ id: node.id, name: node.name })
            node.children?.forEach(walk)
        }
        taxonomy.forEach(walk)
        return list
    }, [taxonomy])

    const disciplinas = useMemo(() => {
        const list: { id: string; name: string }[] = []
        function walk(node: TaxonomyNode) {
            if (node.level === 'subspecialty') list.push({ id: node.id, name: node.name })
            node.children?.forEach(walk)
        }
        taxonomy.forEach(walk)
        return list
    }, [taxonomy])

    const temas = useMemo(() => {
        const list: { id: string; name: string }[] = []
        function walk(node: TaxonomyNode) {
            if (node.level === 'subject') list.push({ id: node.id, name: node.name })
            node.children?.forEach(walk)
        }
        taxonomy.forEach(walk)
        return list
    }, [taxonomy])

    useEffect(() => {
        async function init() {
            setLoading(true)
            await loadTaxonomy()
            const { data: bankData } = await getBanks(true)
            setBanks(bankData)
            const { data: existing } = await getEditalFilters(editalId)
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
            const current = prev[field] || []
            return {
                ...prev,
                [field]: current.includes(id) ? current.filter(x => x !== id) : [...current, id]
            }
        })
    }

    async function handleSave() {
        setSaving(true)
        try {
            const { error } = await upsertEditalFilters(editalId, {
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

    const selectedCount = (filters.area_ids?.length || 0) + (filters.disciplina_ids?.length || 0) + (filters.tema_ids?.length || 0)

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-[#0f1120] border border-white/10 rounded-[32px] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Filter className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg">Filtros de Questões</h2>
                            <p className="text-white/40 text-xs">Define quais questões aparecem para este edital</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {selectedCount > 0 && (
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">
                                {selectedCount} filtro(s) selecionado(s)
                            </span>
                        )}
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <X className="w-5 h-5 text-white/50" />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                        {/* Banca */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/50">Banca (Obrigatório)</label>
                            <select
                                value={filters.banca_id || ''}
                                onChange={e => {
                                    const bank = banks.find(b => b.id === e.target.value)
                                    setFilters(prev => ({ ...prev, banca_id: e.target.value, banca_nome: bank?.name || prev.banca_nome }))
                                }}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="">Selecionar banca...</option>
                                {banks.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                            {!filters.banca_id && (
                                <input
                                    type="text"
                                    placeholder="Ou digitar nome da banca (se não cadastrada)"
                                    value={filters.banca_nome || ''}
                                    onChange={e => setFilters(prev => ({ ...prev, banca_nome: e.target.value }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            )}
                        </div>

                        {/* Configurações padrão */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/50">Dificuldade padrão</label>
                                <select
                                    value={filters.default_difficulty || 'mista'}
                                    onChange={e => setFilters(prev => ({ ...prev, default_difficulty: e.target.value as any }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                                >
                                    <option value="facil">Fácil</option>
                                    <option value="media">Média</option>
                                    <option value="dificil">Difícil</option>
                                    <option value="mista">Mista</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/50">Quantidade padrão</label>
                                <select
                                    value={filters.default_qty || 20}
                                    onChange={e => setFilters(prev => ({ ...prev, default_qty: Number(e.target.value) }))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500"
                                >
                                    {[5, 10, 15, 20, 30, 50].map(n => (
                                        <option key={n} value={n}>{n} questões</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Áreas */}
                        {areas.length > 0 && (
                            <TagSelector
                                title="Áreas / Especialidades"
                                subtitle="Opcional — restringe por área médica"
                                items={areas}
                                selected={filters.area_ids || []}
                                onToggle={id => toggleTag('area_ids', id)}
                            />
                        )}

                        {/* Disciplinas */}
                        {disciplinas.length > 0 && (
                            <TagSelector
                                title="Disciplinas"
                                subtitle="Opcional — restringe por disciplina"
                                items={disciplinas.slice(0, 50)}
                                selected={filters.disciplina_ids || []}
                                onToggle={id => toggleTag('disciplina_ids', id)}
                            />
                        )}

                        {/* Temas */}
                        {temas.length > 0 && (
                            <TagSelector
                                title="Temas / Assuntos"
                                subtitle="Opcional — restringe por tema específico"
                                items={temas.slice(0, 60)}
                                selected={filters.tema_ids || []}
                                onToggle={id => toggleTag('tema_ids', id)}
                            />
                        )}

                        {/* Info box */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3">
                            <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                            <p className="text-blue-300/80 text-xs leading-relaxed">
                                Se nenhuma área/disciplina/tema for selecionado, o filtro usará apenas a banca.
                                Quanto mais específicos os filtros, mais focadas serão as questões.
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex justify-end gap-3 shrink-0">
                    <button onClick={onClose} className="px-6 py-3 text-sm font-bold text-white/50 hover:text-white transition-colors">
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || (!filters.banca_id && !filters.banca_nome)}
                        className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-bold transition-all disabled:opacity-50 shadow-xl shadow-blue-500/20"
                    >
                        {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Salvar Filtros
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

function TagSelector({ title, subtitle, items, selected, onToggle }: {
    title: string
    subtitle: string
    items: { id: string; name: string }[]
    selected: string[]
    onToggle: (id: string) => void
}) {
    const [search, setSearch] = useState('')
    const filtered = items.filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="space-y-3">
            <div>
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">{title}</label>
                <p className="text-white/30 text-xs mt-0.5">{subtitle}</p>
            </div>
            <input
                type="text"
                placeholder={`Buscar ${title.toLowerCase()}...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-xs placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
                {filtered.map(item => {
                    const isSelected = selected.includes(item.id)
                    return (
                        <button
                            key={item.id}
                            onClick={() => onToggle(item.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${isSelected
                                ? 'bg-blue-500/30 border border-blue-500/50 text-blue-300'
                                : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20'
                                }`}
                        >
                            {isSelected && <span className="mr-1">✓</span>}
                            {item.name}
                        </button>
                    )
                })}
                {filtered.length === 0 && (
                    <p className="text-white/30 text-xs py-4 w-full text-center">Nenhum resultado</p>
                )}
            </div>
        </div>
    )
}
