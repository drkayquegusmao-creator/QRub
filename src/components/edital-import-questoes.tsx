'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { vincularQuestao } from '@/lib/editais'

interface Props {
    editalId: string
    onClose: () => void
    onSuccess?: () => void
}

type ImportMethod = 'json' | 'ids' | 'search'

interface QuestaoPreview {
    id: string
    enunciado: string
    specialty_id?: string
    difficulty?: string
}

export default function EditalImportQuestoes({ editalId, onClose, onSuccess }: Props) {
    const [method, setMethod] = useState<ImportMethod>('search')
    const [jsonText, setJsonText] = useState('')
    const [idsText, setIdsText] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<QuestaoPreview[]>([])
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    async function handleSearch() {
        if (!searchQuery.trim()) return
        setLoading(true)
        setError(null)
        try {
            const { data, error: qErr } = await supabase
                .from('questao_base')
                .select('id, enunciado, specialty_id, difficulty')
                .or(`enunciado.ilike.%${searchQuery}%,specialty_id.ilike.%${searchQuery}%`)
                .limit(20)

            if (qErr) throw qErr
            setSearchResults(data || [])
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Erro na busca'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    function toggleSelect(id: string) {
        setSelected(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    async function handleImport() {
        setLoading(true)
        setError(null)
        setSuccess(null)
        let idsToImport: string[] = []

        try {
            if (method === 'json') {
                const parsed = JSON.parse(jsonText)
                const arr = Array.isArray(parsed) ? parsed : [parsed]
                idsToImport = arr.map((q: { id?: string }) => q.id).filter((id): id is string => !!id)
            } else if (method === 'ids') {
                idsToImport = idsText
                    .split(/[\n,;]/)
                    .map(s => s.trim())
                    .filter(Boolean)
            } else {
                idsToImport = Array.from(selected)
            }

            if (idsToImport.length === 0) {
                setError('Nenhuma questão selecionada.')
                return
            }

            let count = 0
            for (const id of idsToImport) {
                const { error: vErr } = await vincularQuestao(editalId, id)
                if (!vErr) count++
            }

            setSuccess(`${count} questão(ões) vinculada(s) com sucesso!`)
            onSuccess?.()
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Erro ao importar'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">Importar Questões</h2>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
                    >
                        ✕
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10">
                    {[
                        { id: 'search' as ImportMethod, label: '🔍 Buscar' },
                        { id: 'ids' as ImportMethod, label: '📋 Por IDs' },
                        { id: 'json' as ImportMethod, label: '📄 Por JSON' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setMethod(tab.id)}
                            className={`flex-1 py-3 text-sm font-medium transition-colors ${method === tab.id
                                ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/5'
                                : 'text-white/50 hover:text-white'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-3 text-red-300 text-sm">
                            ⚠️ {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-3 text-green-300 text-sm">
                            ✅ {success}
                        </div>
                    )}

                    {method === 'search' && (
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Buscar por assunto ou conteúdo..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={handleSearch}
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
                                >
                                    {loading ? '...' : 'Buscar'}
                                </button>
                            </div>

                            {searchResults.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-white/50 text-xs">{searchResults.length} resultado(s) · {selected.size} selecionada(s)</p>
                                    {searchResults.map(q => (
                                        <div
                                            key={q.id}
                                            onClick={() => toggleSelect(q.id)}
                                            className={`p-3 rounded-xl border cursor-pointer transition-all ${selected.has(q.id)
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-white/10 bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${selected.has(q.id) ? 'bg-blue-500 border-blue-500' : 'border-white/30'
                                                    }`}>
                                                    {selected.has(q.id) && <span className="text-white text-xs">✓</span>}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-white/90 text-sm line-clamp-2">{q.enunciado}</p>
                                                    <div className="flex gap-2 mt-1">
                                                        {q.specialty_id && <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">{q.specialty_id}</span>}
                                                        {q.difficulty && <span className="text-xs text-white/40">{q.difficulty}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {method === 'ids' && (
                        <div className="space-y-2">
                            <label className="text-white/70 text-sm">IDs das questões (um por linha ou separados por vírgula)</label>
                            <textarea
                                value={idsText}
                                onChange={e => setIdsText(e.target.value)}
                                placeholder="abc123&#10;def456&#10;..."
                                rows={10}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm placeholder-white/30 focus:outline-none focus:border-blue-500 font-mono resize-none"
                            />
                        </div>
                    )}

                    {method === 'json' && (
                        <div className="space-y-2">
                            <label className="text-white/70 text-sm">JSON com array de questões (campo &quot;id&quot; obrigatório)</label>
                            <textarea
                                value={jsonText}
                                onChange={e => setJsonText(e.target.value)}
                                placeholder={'[{"id": "abc123", ...}, ...]'}
                                rows={12}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/90 text-sm placeholder-white/30 focus:outline-none focus:border-blue-500 font-mono resize-none"
                            />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-colors text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={loading}
                        className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold transition-colors text-sm"
                    >
                        {loading ? 'Importando...' : 'Vincular Questões'}
                    </button>
                </div>
            </div>
        </div>
    )
}
