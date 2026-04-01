"use client"

import { useEffect, useState, useCallback } from 'react'
import {
    Building2, Plus, Search, Edit2, Trash2, 
    Calendar, MapPin, ExternalLink, FileText, CheckCircle2,
    XCircle, Clock, AlertCircle, ShieldCheck, Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
    getBanks, createBank, updateBank,
    getBankProfiles, createBankProfile, setCurrentProfile,
    getBlueprints, createBlueprint, updateBlueprint,
    type Bank, type BankProfile, type QuestionBlueprint
} from '@/lib/banks'
import { toast } from 'react-hot-toast'

// ─── Skeletons ─────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
    return <div className={`animate-pulse bg-slate-100 rounded-[2rem] ${className}`} />
}

// ─── Bank Profile Form ─────────────────────────────────────────────────────

function BankProfileForm({ bankId, onSaved }: { bankId: string; onSaved: () => void }) {
    const [form, setForm] = useState({ profile_text: '', profile_json: '{}', examples_json: '[]', is_current: true })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSave() {
        if (!form.profile_text.trim()) { setError('Texto do perfil obrigatório'); return }
        setLoading(true); setError(null)
        try {
            let profile_json = {}
            let examples_json: unknown[] = []
            try { profile_json = JSON.parse(form.profile_json) } catch { /* use default */ }
            try { examples_json = JSON.parse(form.examples_json) } catch { /* use default */ }

            const { error: err } = await createBankProfile({
                bank_id: bankId,
                profile_text: form.profile_text,
                profile_json,
                examples_json,
                is_current: form.is_current,
            })
            if (err) throw err
            setForm({ profile_text: '', profile_json: '{}', examples_json: '[]', is_current: true })
            onSaved()
            toast.success('Perfil de estilo salvo!')
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Erro ao salvar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8">
            <h3 className="text-slate-900 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                Treinar Inteligência da Banca (Saúde)
            </h3>
            {error && <div className="text-red-700 text-xs bg-red-50 border border-red-100 rounded-xl p-4">⚠️ {error}</div>}

            <div className="space-y-6">
                <div>
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 block">Diretrizes de Estilo (Prompt Master)</label>
                    <textarea
                        value={form.profile_text}
                        onChange={e => setForm(p => ({ ...p, profile_text: e.target.value }))}
                        placeholder="Descreva o estilo da banca: temas recorrentes, tipo de pegadinha, complexidade do enunciado..."
                        rows={6}
                        className="w-full bg-white border border-slate-200 rounded-[2rem] px-6 py-5 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all resize-none shadow-sm"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 block">Logic JSON (Parâmetros)</label>
                        <textarea
                            value={form.profile_json}
                            onChange={e => setForm(p => ({ ...p, profile_json: e.target.value }))}
                            rows={5}
                            className="w-full bg-slate-900 border border-slate-800 rounded-[2rem] px-6 py-5 text-emerald-400 text-xs font-mono placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 resize-none shadow-lg"
                        />
                    </div>
                    <div>
                        <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3 block">Examples JSON (Padrão)</label>
                        <textarea
                            value={form.examples_json}
                            onChange={e => setForm(p => ({ ...p, examples_json: e.target.value }))}
                            rows={5}
                            className="w-full bg-slate-900 border border-slate-800 rounded-[2rem] px-6 py-5 text-emerald-400 text-xs font-mono placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 resize-none shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-3 text-slate-600 text-sm font-bold cursor-pointer hover:text-slate-900 transition-colors">
                    <input
                        type="checkbox"
                        checked={form.is_current}
                        onChange={e => setForm(p => ({ ...p, is_current: e.target.checked }))}
                        className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
                    />
                    Ativar versão imediatamente
                </label>
                <div className="flex-1" />
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/20 transition-all hover:scale-105"
                >
                    {loading ? 'Salvando...' : '💾 Salvar Perfil Saude'}
                </button>
            </div>
        </div>
    )
}

// ─── Blueprint Form ────────────────────────────────────────────────────────

function BlueprintForm({ bankId, onSaved }: { bankId: string; onSaved: () => void }) {
    const [form, setForm] = useState({ name: '', format: 'mcq_5' as QuestionBlueprint['format'], description: '', blueprint_rules: '{}' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSave() {
        if (!form.name.trim()) { setError('Nome obrigatório'); return }
        setLoading(true); setError(null)
        try {
            let rules = {}
            try { rules = JSON.parse(form.blueprint_rules) } catch { /* use default */ }
            const { error: err } = await createBlueprint({
                bank_id: bankId,
                name: form.name,
                format: form.format,
                description: form.description,
                blueprint_rules: rules,
                is_active: true,
            })
            if (err) throw err
            setForm({ name: '', format: 'mcq_5', description: '', blueprint_rules: '{}' })
            onSaved()
            toast.success('Blueprint adicionado!')
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Erro ao salvar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8">
            <h4 className="text-slate-900 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                Configurar Matriz de Questão
            </h4>
            {error && <div className="text-red-700 text-xs bg-red-50 border border-red-100 rounded-xl p-3">⚠️ {error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 block">Nome do Modelo</label>
                    <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Ex: Padrão Clínica Médica" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 shadow-sm font-bold" />
                </div>
                <div className="space-y-2">
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 block">Formato Estrutural</label>
                    <select value={form.format} onChange={e => setForm(p => ({ ...p, format: e.target.value as QuestionBlueprint['format'] }))}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 shadow-sm font-bold">
                        <option value="mcq_5">Múltipla Escolha (5 alt)</option>
                        <option value="mcq_4">Múltipla Escolha (4 alt)</option>
                        <option value="certo_errado">Certo / Errado</option>
                        <option value="discursiva">Discursiva</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 block">Descrição</label>
                    <input type="text" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        placeholder="Ex: Foco em diagnóstico e conduta" className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 shadow-sm font-bold" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 block">Regras Estruturais (JSON)</label>
                <textarea value={form.blueprint_rules} onChange={e => setForm(p => ({ ...p, blueprint_rules: e.target.value }))}
                    rows={3} placeholder='{"focus": "caso clínico longo"}' className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-emerald-400 text-xs font-mono focus:outline-none shadow-lg resize-none" />
            </div>

            <div className="flex justify-end pt-2">
                <button onClick={handleSave} disabled={loading}
                    className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-500/20 hover:scale-105">
                    {loading ? '...' : '+ Adicionar à Fila'}
                </button>
            </div>
        </div>
    )
}

// ─── Bank Detail Panel ──────────────────────────────────────────────────────

function BankDetailPanel({ bank, onClose }: { bank: Bank; onClose: () => void }) {
    const [tab, setTab] = useState<'perfis' | 'blueprints'>('perfis')
    const [profiles, setProfiles] = useState<BankProfile[]>([])
    const [blueprints, setBlueprints] = useState<QuestionBlueprint[]>([])
    const [loading, setLoading] = useState(true)

    const load = useCallback(async () => {
        setLoading(true)
        const [p, b] = await Promise.all([getBankProfiles(bank.id), getBlueprints(bank.id)])
        setProfiles(p.data)
        setBlueprints(b.data)
        setLoading(false)
    }, [bank.id])

    useEffect(() => { load() }, [load])

    async function handleSetCurrent(profileId: string) {
        await setCurrentProfile(profileId, bank.id)
        load()
        toast.success('Perfil ativado como atual')
    }

    async function handleToggleBlueprint(bp: QuestionBlueprint) {
        await updateBlueprint(bp.id, { is_active: !bp.is_active })
        load()
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 rounded-[3rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-10 py-8 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">{bank.name}</h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                            {bank.slug} · <span className={bank.is_active ? 'text-emerald-600' : 'text-rose-600'}>{bank.is_active ? 'Banca Operacional' : 'Modo Offline'}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-900 w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-slate-200 transition-all font-black">X</button>
                </div>

                <div className="flex border-b border-slate-100 bg-white px-10">
                    {(['perfis', 'blueprints'] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-10 py-5 text-[11px] font-black uppercase tracking-widest transition-all relative ${tab === t ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                            {t === 'perfis' ? '🧬 Perfis de Estilo' : '🔷 Blueprints de Questões'}
                            {tab === t && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-indigo-600 rounded-t-full shadow-lg shadow-indigo-600/50" />}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                    {loading ? (
                        <div className="space-y-6">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-28" />)}</div>
                    ) : tab === 'perfis' ? (
                        <>
                            <BankProfileForm bankId={bank.id} onSaved={load} />
                            {profiles.length === 0 ? (
                                <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                                    <Zap size={48} className="mx-auto text-slate-200 mb-4" />
                                    <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Nenhuma inteligência cadastrada para esta banca</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6">
                                    {profiles.map(p => (
                                        <div key={p.id} className={`p-8 rounded-[3rem] border transition-all ${p.is_current ? 'border-emerald-200 bg-emerald-50/30 ring-4 ring-emerald-500/5 shadow-lg' : 'border-slate-100 bg-slate-50/50 grayscale opacity-70'}`}>
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center gap-4">
                                                    <span className="bg-white border border-slate-200 text-slate-800 text-[10px] font-black px-4 py-1.5 rounded-full shadow-sm">V{p.version}</span>
                                                    {p.is_current && <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-4 py-1.5 rounded-full shadow-xl shadow-emerald-500/20">Protocolo Ativo</span>}
                                                </div>
                                                {!p.is_current && (
                                                    <button onClick={() => handleSetCurrent(p.id)}
                                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 hover:scale-105 transition-transform bg-white border border-indigo-100 px-6 py-2 rounded-xl">
                                                        Ativar Versão
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-slate-700 text-sm leading-relaxed font-medium italic">&quot;{p.profile_text}&quot;</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <BlueprintForm bankId={bank.id} onSaved={load} />
                            {blueprints.length === 0 ? (
                                <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
                                    <FileText size={48} className="mx-auto text-slate-200 mb-4" />
                                    <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Nenhum formato estrutural definido para esta banca</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-6">
                                    {blueprints.map(bp => (
                                        <div key={bp.id} className={`flex items-center gap-6 p-6 rounded-[2.5rem] border transition-all ${bp.is_active ? 'border-indigo-100 bg-white shadow-xl shadow-indigo-500/5' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
                                            <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shadow-inner">
                                                {bp.format === 'certo_errado' ? '⚖️' : '📝'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-slate-900 text-base font-black uppercase tracking-tight">{bp.name}</p>
                                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">{bp.format.replace('_', ' ')}</p>
                                            </div>
                                            <button onClick={() => handleToggleBlueprint(bp)}
                                                className={`text-[9px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all ${bp.is_active ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                                {bp.is_active ? 'Pausar' : 'Ativar'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

// ─── Component Export ──────────────────────────────────────────────────────

export function SaudeAdminBanksManager() {
    const [banks, setBanks] = useState<Bank[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editingBank, setEditingBank] = useState<Bank | null>(null)
    const [newBank, setNewBank] = useState({ name: '', slug: '', description: '' })
    const [searchTerm, setSearchTerm] = useState('')

    const loadBanks = useCallback(async () => {
        setLoading(true)
        const { data, error: err } = await getBanks()
        if (err) setError('Erro ao carregar bancas')
        setBanks(data)
        setLoading(false)
    }, [])

    useEffect(() => { loadBanks() }, [loadBanks])

    async function handleSaveBank() {
        if (!newBank.name.trim()) return
        
        const payload = { ...newBank }
        let res;
        
        if (editingBank) {
            res = await updateBank(editingBank.id, payload)
        } else {
            res = await createBank(payload)
        }
        
        if (res.error) {
            toast.error(`Erro ao ${editingBank ? 'atualizar' : 'criar'} banca`)
        } else {
            toast.success(`Banca ${editingBank ? 'atualizada' : 'integrada'} com sucesso!`)
            setNewBank({ name: '', slug: '', description: '' })
            setEditingBank(null)
            setIsCreateModalOpen(false)
            loadBanks()
        }
    }

    async function handleToggleActive(bank: Bank) {
        await updateBank(bank.id, { is_active: !bank.is_active })
        loadBanks()
    }

    const filteredBanks = banks.filter(b => 
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8">
                <div className="flex bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-4 items-center gap-4 flex-1 max-w-xl shadow-sm">
                    <Search className="text-slate-300 ml-2" size={20} />
                    <input 
                        placeholder="Buscar por nome da banca examinadora..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none font-bold text-xs uppercase w-full text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                    />
                </div>
                
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-4 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus size={18} />
                    Nova Banca no Hub
                </button>
            </div>

            {/* List Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-56" />)
                ) : filteredBanks.length === 0 ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 py-32 bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-100 dark:border-white/10 rounded-[4rem] flex flex-col items-center justify-center text-center">
                        <Building2 size={64} className="text-slate-200 dark:text-slate-700 mb-6" />
                        <h3 className="text-xl font-black uppercase text-slate-400 dark:text-slate-500">Nenhuma banca encontrada</h3>
                        <p className="text-[10px] text-slate-300 dark:text-slate-600 font-bold uppercase tracking-widest mt-2">Inicie o cadastro para a Base de Dados Saúde.</p>
                    </div>
                ) : filteredBanks.map(bank => (
                    <div
                        key={bank.id}
                        className={`group bg-white dark:bg-[#1A1033] border rounded-[3.5rem] p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${bank.is_active ? 'border-indigo-100/50 dark:border-white/5 hover:border-indigo-500/20 shadow-sm' : 'border-slate-50 dark:border-white/5 opacity-60 grayscale'}`}
                    >
                        <div className="flex items-start justify-between gap-6 mb-8">
                            <div className="space-y-3">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">{bank.name}</h3>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${bank.is_active ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20' : 'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-500 border-slate-100 dark:border-white/10'}`}>
                                        {bank.is_active ? 'Ativa' : 'Pausada'}
                                    </span>
                                    <p className="text-slate-300 dark:text-slate-600 text-[9px] font-mono tracking-tighter uppercase">{bank.slug}</p>
                                </div>
                            </div>
                            <div className="w-16 h-16 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-50 dark:border-white/5 flex items-center justify-center text-3xl group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                🏥
                            </div>
                        </div>

                        {bank.description && <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed mb-8 line-clamp-2 italic">&quot;{bank.description}&quot;</p>}

                        <div className="flex items-center gap-4 pt-8 border-t border-slate-50 dark:border-white/5">
                            <button
                                onClick={() => setSelectedBank(bank)}
                                className="flex-1 py-4 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-600 dark:hover:bg-indigo-500 text-indigo-600 dark:text-indigo-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-3xl transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-600/20 active:scale-95"
                            >
                                Gerenciar IA
                            </button>
                            <button
                                onClick={() => {
                                    setEditingBank(bank)
                                    setNewBank({ name: bank.name, slug: bank.slug, description: bank.description || '' })
                                    setIsCreateModalOpen(true)
                                }}
                                className="w-12 h-12 flex items-center justify-center rounded-[1.5rem] transition-all border bg-slate-50 dark:bg-white/5 text-slate-400 border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-600 dark:hover:text-white"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => handleToggleActive(bank)}
                                className={`w-12 h-12 flex items-center justify-center rounded-[1.5rem] transition-all border ${bank.is_active ? 'bg-white dark:bg-transparent text-slate-300 dark:text-slate-500 border-slate-100 dark:border-white/10 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-100 dark:hover:border-rose-500/20' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20 hover:bg-emerald-600 dark:hover:bg-emerald-500 hover:text-white'}`}
                            >
                                {bank.is_active ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60 dark:bg-black/80">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-[#1A1033] w-full max-w-xl rounded-[3rem] p-12 space-y-10 shadow-2xl relative overflow-hidden border border-slate-100 dark:border-white/10">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 dark:bg-indigo-500/10 rounded-full blur-3xl -mr-24 -mt-24 opacity-50" />
                            <div className="relative">
                                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
                                    {editingBank ? 'Editar Banca' : 'Nova Banca Saúde'}
                                </h3>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">{editingBank ? 'Atualizar Metadados' : 'Criar Novo Perfil para Questões'}</p>
                            </div>

                            <div className="space-y-6 relative">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nome Institucional</label>
                                    <input type="text" placeholder="Ex: SUS-SP, AMP, SES-PE" value={newBank.name}
                                        onChange={e => setNewBank(p => ({ ...p, name: e.target.value }))}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Slug (Link ID)</label>
                                    <input type="text" placeholder="Ex: sus-sp" value={newBank.slug}
                                        onChange={e => setNewBank(p => ({ ...p, slug: e.target.value }))}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-indigo-500 transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Descrição</label>
                                    <textarea placeholder="Ex: Banca focada em Saúde Pública e Casos Clínicos de Urgência..." value={newBank.description}
                                        onChange={e => setNewBank(p => ({ ...p, description: e.target.value }))}
                                        className="w-full h-32 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl px-6 py-4 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all resize-none outline-none" />
                                </div>
                            </div>

                            <div className="flex gap-6 justify-end relative">
                                <button onClick={() => { setIsCreateModalOpen(false); setEditingBank(null); setNewBank({ name: '', slug: '', description: '' }); }} className="px-8 py-4 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">Cancelar</button>
                                <button onClick={handleSaveBank} disabled={!newBank.name}
                                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black uppercase tracking-widest rounded-full shadow-2xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50">
                                    {editingBank ? 'Salvar Alterações' : 'Cadastrar Banca'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Bank Detail Portal */}
            <AnimatePresence>
                {selectedBank && (
                    <BankDetailPanel
                        bank={selectedBank}
                        onClose={() => { setSelectedBank(null); loadBanks() }}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
