'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { vincularConcursoQuestao } from '@/lib/concursos/editais'
import { X, Search, FileJson, ClipboardList, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

interface Props {
    editalId: string
    onClose: () => void
    onSuccess?: () => void
}

type ImportMethod = 'json' | 'ids' | 'search'

interface QuestaoPreview {
    id: string
    enunciado: string
    taxonomy_path?: string
    difficulty?: string
}

export default function ConcursoEditalImportQuestoes({ editalId, onClose, onSuccess }: Props) {
    const [method, setMethod] = useState<ImportMethod>('search')
    const [jsonText, setJsonText] = useState('')
    const [idsText, setIdsText] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<QuestaoPreview[]>([])
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSearch() {
        if (!searchQuery.trim()) return
        setLoading(true)
        setError(null)
        try {
            const { data, error: qErr } = await supabase
                .from('concurso_questao_base')
                .select('id, enunciado, taxonomy_path, difficulty')
                .or(`enunciado.ilike.%${searchQuery}%,taxonomy_path.ilike.%${searchQuery}%`)
                .limit(20)

            if (qErr) throw qErr
            setSearchResults(data || [])
        } catch (err: any) {
            setError(err.message || 'Erro na busca')
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
        let idsToImport: string[] = []

        try {
            if (method === 'json') {
                const parsed = JSON.parse(jsonText)
                const arr = Array.isArray(parsed) ? parsed : [parsed]
                idsToImport = arr.map((q: any) => q.id).filter((id: any) => !!id)
            } else if (method === 'ids') {
                idsToImport = idsText
                    .split(/[\n,;]/)
                    .map(s => s.trim())
                    .filter(Boolean)
            } else {
                idsToImport = Array.from(selected)
            }

            if (idsToImport.length === 0) {
                toast.error('Nenhuma questão selecionada.')
                return
            }

            let count = 0
            for (const id of idsToImport) {
                const { error: vErr } = await vincularConcursoQuestao(editalId, id)
                if (!vErr) count++
            }

            toast.success(`${count} questão(ões) vinculada(s) com sucesso!`)
            onSuccess?.()
            onClose()
        } catch (err: any) {
            setError(err.message || 'Erro ao importar')
            toast.error('Erro na importação')
        } finally {
            setLoading(false)
        }
    }

    const tabs = [
        { id: 'search' as ImportMethod, label: 'Busca Master', icon: Search },
        { id: 'ids' as ImportMethod, label: 'Lista de IDs', icon: ClipboardList },
        { id: 'json' as ImportMethod, label: 'JSON Puro', icon: FileJson },
    ]

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-slate-100 rounded-[3rem] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Vincular Questões</h2>
                        <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mt-1">Acervo: Ambiente Concursos</p>
                    </div>
                    <button onClick={onClose} className="p-4 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-2xl">
                        <X size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex px-10 border-b border-slate-50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setMethod(tab.id)}
                            className={`flex items-center gap-3 px-8 py-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-4 ${
                                method === tab.id 
                                ? 'text-indigo-600 border-indigo-600' 
                                : 'text-slate-300 border-transparent hover:text-slate-400'
                            }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-10 space-y-6">
                    {method === 'search' && (
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-1 bg-slate-50 rounded-2xl px-6 py-2 flex items-center gap-4 shadow-inner ring-2 ring-transparent focus-within:ring-indigo-500/10 transition-all">
                                    <Search className="text-slate-300" size={20} />
                                    <input 
                                        className="w-full bg-transparent border-none p-3 font-bold text-sm outline-none"
                                        placeholder="Assunto, tema ou palavras-chave..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                                <button 
                                    onClick={handleSearch}
                                    disabled={loading}
                                    className="px-8 py-2 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all"
                                >
                                    {loading ? '...' : 'Buscar'}
                                </button>
                            </div>

                            <div className="space-y-4">
                                {searchResults.map(q => (
                                    <div 
                                        key={q.id}
                                        onClick={() => toggleSelect(q.id)}
                                        className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${
                                            selected.has(q.id) 
                                            ? 'bg-indigo-50 border-indigo-200 shadow-lg shadow-indigo-500/10' 
                                            : 'bg-white border-slate-100 hover:border-indigo-200'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                                selected.has(q.id) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-200 group-hover:border-indigo-300'
                                            }`}>
                                                {selected.has(q.id) && <CheckCircle2 className="text-white" size={14} />}
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <p className="text-sm font-bold leading-relaxed text-slate-700 italic">
                                                    &quot;{q.enunciado}&quot;
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[8px] font-black rounded uppercase">{q.id.substring(0,8)}</span>
                                                    <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{q.taxonomy_path || 'Sem Taxonomia'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {method === 'ids' && (
                        <div className="space-y-4 animate-in fade-in">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Lista de Identificadores (UUID)</label>
                            <textarea 
                                className="w-full bg-slate-50 border-none rounded-[2rem] p-8 font-mono text-sm shadow-inner outline-none ring-2 ring-transparent focus:ring-indigo-500/10 transition-all min-h-[300px]"
                                placeholder="827364...&#10;918273...&#10;726354..."
                                value={idsText}
                                onChange={e => setIdsText(e.target.value)}
                            />
                        </div>
                    )}

                    {method === 'json' && (
                        <div className="space-y-4 animate-in fade-in">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Pacote JSON Estruturado</label>
                            <textarea 
                                className="w-full bg-slate-50 border-none rounded-[2rem] p-8 font-mono text-xs shadow-inner outline-none ring-2 ring-transparent focus:ring-indigo-500/10 transition-all min-h-[300px]"
                                placeholder='[{"id": "..."}, {"id": "..."}]'
                                value={jsonText}
                                onChange={e => setJsonText(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button 
                        onClick={onClose}
                        className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
                    >
                        Cancelar
                    </button>
                    <button 
                        disabled={loading}
                        onClick={handleImport}
                        className="px-12 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        {loading ? 'Vinculando...' : '🚀 Confirmar Vínculo'}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
