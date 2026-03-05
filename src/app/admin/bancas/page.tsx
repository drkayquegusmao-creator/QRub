'use client'

import { useEffect, useState, useCallback } from 'react'
import {
    getBanks, createBank, updateBank, getBankProfiles, createBankProfile, setCurrentProfile,
    getBlueprints, createBlueprint, updateBlueprint,
    type Bank, type BankProfile, type QuestionBlueprint,
} from '@/lib/banks'

// ─── Skeletons ─────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
    return <div className={`animate-pulse bg-slate-100 rounded-2xl ${className}`} />
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
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Erro ao salvar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="text-slate-900 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Criar Novo Perfil de Banca
            </h3>
            {error && <div className="text-red-700 text-xs bg-red-50 border border-red-100 rounded-xl p-4">⚠️ {error}</div>}

            <div className="space-y-4">
                <div>
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 block">Texto do Perfil (Diretrizes de Estilo)</label>
                    <textarea
                        value={form.profile_text}
                        onChange={e => setForm(p => ({ ...p, profile_text: e.target.value }))}
                        placeholder="Descreva o estilo da banca: como cobra, que pegadinhas usa, tamanho das questões, linguagem..."
                        rows={6}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all resize-none shadow-sm"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 block">Profile JSON (Lógica)</label>
                        <textarea
                            value={form.profile_json}
                            onChange={e => setForm(p => ({ ...p, profile_json: e.target.value }))}
                            rows={5}
                            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-emerald-400 text-xs font-mono placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/5 resize-none shadow-lg"
                            placeholder='{"num_alternativas": 5, "estilo": "caso clinico"}'
                        />
                    </div>
                    <div>
                        <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 block">Examples JSON (Modelos)</label>
                        <textarea
                            value={form.examples_json}
                            onChange={e => setForm(p => ({ ...p, examples_json: e.target.value }))}
                            rows={5}
                            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-emerald-400 text-xs font-mono placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/5 resize-none shadow-lg"
                            placeholder='[{"enunciado": "...", "gabarito": "a"}]'
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-3 text-slate-600 text-sm font-bold cursor-pointer hover:text-slate-900 transition-colors">
                    <input
                        type="checkbox"
                        checked={form.is_current}
                        onChange={e => setForm(p => ({ ...p, is_current: e.target.checked }))}
                        className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500/20"
                    />
                    Definir como perfil atual
                </label>
                <div className="flex-1" />
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                >
                    {loading ? 'Processando...' : '💾 Salvar Perfil'}
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
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Erro ao salvar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h4 className="text-slate-900 font-bold text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                Configurar Blueprint de Questões
            </h4>
            {error && <div className="text-red-700 text-xs bg-red-50 border border-red-100 rounded-xl p-3">⚠️ {error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 block">Nome do Modelo</label>
                    <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Ex: Caso Clínico v2" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-blue-500 shadow-sm" />
                </div>
                <div>
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 block">Formato Estrutural</label>
                    <select value={form.format} onChange={e => setForm(p => ({ ...p, format: e.target.value as QuestionBlueprint['format'] }))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-blue-500 shadow-sm">
                        <option value="mcq_5">Múltipla Escolha (5 alt)</option>
                        <option value="mcq_4">Múltipla Escolha (4 alt)</option>
                        <option value="certo_errado">Certo/Errado</option>
                        <option value="discursiva">Discursiva Profissional</option>
                    </select>
                </div>
                <div>
                    <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 block">Descrição Breve</label>
                    <input type="text" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        placeholder="Ex: Questão complexa com conduta" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:outline-none focus:border-blue-500 shadow-sm" />
                </div>
            </div>

            <div>
                <label className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1.5 block">Regras de Geração (Blueprint JSON)</label>
                <textarea value={form.blueprint_rules} onChange={e => setForm(p => ({ ...p, blueprint_rules: e.target.value }))}
                    rows={3} placeholder='{"foco": "conduta", "pegadinhas": true}' className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-emerald-400 text-xs font-mono focus:outline-none shadow-lg resize-none" />
            </div>

            <div className="flex justify-end pt-2">
                <button onClick={handleSave} disabled={loading}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:scale-105">
                    {loading ? '...' : '+ Adicionar Blueprint Master'}
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
    }

    async function handleToggleBlueprint(bp: QuestionBlueprint) {
        await updateBlueprint(bp.id, { is_active: !bp.is_active })
        load()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden scale-in-center">
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">{bank.name}</h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                            {bank.slug} · <span className={bank.is_active ? 'text-emerald-600' : 'text-rose-600'}>{bank.is_active ? 'Ativa no Sistema' : 'Inativa'}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-900 w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-slate-200 transition-all">✕</button>
                </div>

                <div className="flex border-b border-slate-100 bg-white px-8">
                    {(['perfis', 'blueprints'] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${tab === t ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
                            {t === 'perfis' ? '🧬 Perfis de Estilo' : '🔷 Blueprints de Geração'}
                            {tab === t && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                    {loading ? (
                        <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-24" />)}</div>
                    ) : tab === 'perfis' ? (
                        <>
                            <BankProfileForm bankId={bank.id} onSaved={load} />
                            {profiles.length === 0 ? (
                                <div className="text-center py-16 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                                    <p className="text-4xl grayscale opacity-20 mb-2">🧬</p>
                                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Nenhum perfil cadastrado para esta banca</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {profiles.map(p => (
                                        <div key={p.id} className={`p-6 rounded-[2rem] border transition-all ${p.is_current ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 bg-slate-50/50'}`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-black px-3 py-1 rounded-full shadow-sm">VERSÃO {p.version}</span>
                                                    {p.is_current && <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">Ação Atual</span>}
                                                </div>
                                                {!p.is_current && (
                                                    <button onClick={() => handleSetCurrent(p.id)}
                                                        className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline underline-offset-4 decoration-2">
                                                        Ativar como perfil atual
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-slate-700 text-sm leading-relaxed font-medium italic">"{p.profile_text}"</p>
                                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                                                <p className="text-slate-400 text-[10px] font-bold uppercase">{new Date(p.created_at || '').toLocaleDateString('pt-BR')}</p>
                                                <div className="flex-1" />
                                                <span className="text-[10px] text-slate-300 font-mono">ID: {p.id.slice(0, 8)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <BlueprintForm bankId={bank.id} onSaved={load} />
                            {blueprints.length === 0 ? (
                                <div className="text-center py-16 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                                    <p className="text-4xl grayscale opacity-20 mb-2">🔷</p>
                                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Nenhum blueprint cadastrado</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-3">
                                    {blueprints.map(bp => (
                                        <div key={bp.id} className={`flex items-center gap-4 p-5 rounded-3xl border transition-all ${bp.is_active ? 'border-indigo-100 bg-white shadow-md' : 'border-slate-100 bg-slate-50 opacity-60 grayscale'}`}>
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl shadow-inner">
                                                {bp.format === 'certo_errado' ? '⚖️' : '📝'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-slate-900 text-sm font-black uppercase tracking-tight">{bp.name}</p>
                                                <p className="text-slate-400 text-[11px] font-medium leading-tight mt-0.5">{bp.format.replace('_', ' ').toUpperCase()} {bp.description && `· ${bp.description}`}</p>
                                            </div>
                                            <button onClick={() => handleToggleBlueprint(bp)}
                                                className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${bp.is_active ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}>
                                                {bp.is_active ? 'Desativar' : 'Ativar'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function AdminBancasPage() {
    const [banks, setBanks] = useState<Bank[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
    const [showCreate, setShowCreate] = useState(false)
    const [newBank, setNewBank] = useState({ name: '', slug: '', description: '' })
    const [creating, setCreating] = useState(false)

    const loadBanks = useCallback(async () => {
        setLoading(true)
        const { data, error: err } = await getBanks()
        if (err) setError('Erro ao carregar bancas')
        setBanks(data)
        setLoading(false)
    }, [])

    useEffect(() => { loadBanks() }, [loadBanks])

    async function handleCreate() {
        if (!newBank.name.trim()) return
        setCreating(true)
        await createBank({
            name: newBank.name,
            slug: newBank.slug || undefined,
            description: newBank.description,
            is_active: true,
        })
        setNewBank({ name: '', slug: '', description: '' })
        setShowCreate(false)
        setCreating(false)
        loadBanks()
    }

    async function handleToggleActive(bank: Bank) {
        await updateBank(bank.id, { is_active: !bank.is_active })
        loadBanks()
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shadow-sm transition-transform hover:rotate-6">
                            <span className="text-xl">🏛️</span>
                        </div>
                        Bancas & Inteligência
                    </h1>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1 ml-14">
                        Centro de Treinamento de Padronagem — QRub v2
                    </p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-slate-900/10 transition-all hover:scale-105"
                >
                    ➕ Configurar Nova Banca
                </button>
            </div>

            {/* Create Form */}
            {showCreate && (
                <div className="bg-white border border-slate-200 rounded-[2rem] p-8 space-y-6 shadow-2xl shadow-blue-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors" />
                    <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest relative">Cadastrar Nova Entidade Organizadora</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nome da Banca</label>
                            <input type="text" placeholder="Ex: CEBRASPE / FGV" value={newBank.name}
                                onChange={e => setNewBank(p => ({ ...p, name: e.target.value }))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 text-sm font-bold focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Slug (URL)</label>
                            <input type="text" placeholder="Ex: cebraspe-med" value={newBank.slug}
                                onChange={e => setNewBank(p => ({ ...p, slug: e.target.value }))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all" />
                        </div>
                        <div className="space-y-1.5 lg:col-span-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Breve Descrição</label>
                            <input type="text" placeholder="Ex: Banca famosa por questões de CERTO/ERRADO" value={newBank.description}
                                onChange={e => setNewBank(p => ({ ...p, description: e.target.value }))}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-slate-800 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all" />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-end relative">
                        <button onClick={() => setShowCreate(false)} className="px-6 py-3 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors">Cancelar Operação</button>
                        <button onClick={handleCreate} disabled={creating || !newBank.name}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                            {creating ? 'Processando...' : 'Finalizar Cadastro'}
                        </button>
                    </div>
                </div>
            )}

            {/* Banks List */}
            {error ? (
                <div className="text-center py-12 text-slate-400 font-bold uppercase text-xs tracking-widest bg-slate-50 rounded-[2rem] border border-slate-200">{error}</div>
            ) : loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-44" />)}
                </div>
            ) : banks.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                    <p className="text-5xl grayscale opacity-20 mb-4 animate-bounce">🏛️</p>
                    <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">Nenhuma banca operacional cadastrada</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {banks.map(bank => (
                        <div
                            key={bank.id}
                            className={`group relative bg-white border rounded-[2rem] p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 ${bank.is_active ? 'border-slate-200' : 'border-slate-100 opacity-60 grayscale'}`}
                        >
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors leading-none">{bank.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-slate-400 text-[10px] font-mono tracking-wider">/{bank.slug}</p>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                        <span className={`text-[8px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full ${bank.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-400'}`}>
                                            {bank.is_active ? 'Sistema Online' : 'Pausada'}
                                        </span>
                                    </div>
                                    {bank.description && <p className="text-slate-500 text-[11px] leading-relaxed mt-2 line-clamp-2">{bank.description}</p>}
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl shadow-sm border border-slate-100">
                                    🏛️
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                                <button
                                    onClick={() => setSelectedBank(bank)}
                                    className="flex-1 py-3 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
                                >
                                    Configurar I.A.
                                </button>
                                <button
                                    onClick={() => handleToggleActive(bank)}
                                    className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all border ${bank.is_active ? 'bg-white text-slate-300 border-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white'}`}
                                    title={bank.is_active ? 'Desativar Banca' : 'Ativar Banca'}
                                >
                                    {bank.is_active ? '✕' : '✓'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Bank Detail Panel */}
            {selectedBank && (
                <BankDetailPanel
                    bank={selectedBank}
                    onClose={() => { setSelectedBank(null); loadBanks() }}
                />
            )}
        </div>
    )
}
