'use client'

import { useEffect, useState, useCallback } from 'react'
import {
    getBanks, createBank, updateBank, getBankProfiles, createBankProfile, setCurrentProfile,
    getBlueprints, createBlueprint, updateBlueprint,
    type Bank, type BankProfile, type QuestionBlueprint,
} from '@/lib/banks'

// ─── Skeletons ─────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
    return <div className={`animate-pulse bg-white/10 rounded-xl ${className}`} />
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
        <div className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold text-sm">➕ Novo Perfil</h3>
            {error && <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl p-3">⚠️ {error}</div>}
            <div>
                <label className="text-white/60 text-xs mb-1.5 block">Texto do Perfil (estilo, pegadinhas, padrões...)</label>
                <textarea
                    value={form.profile_text}
                    onChange={e => setForm(p => ({ ...p, profile_text: e.target.value }))}
                    placeholder="Descreva o estilo da banca: como cobra, que pegadinhas usa, tamanho das questões, linguagem..."
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500 resize-none"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Profile JSON (regras estruturadas)</label>
                    <textarea
                        value={form.profile_json}
                        onChange={e => setForm(p => ({ ...p, profile_json: e.target.value }))}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-xs font-mono placeholder-white/30 focus:outline-none focus:border-blue-500 resize-none"
                        placeholder='{"num_alternativas": 5, "estilo": "caso clinico"}'
                    />
                </div>
                <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Examples JSON (mini-questões modelo)</label>
                    <textarea
                        value={form.examples_json}
                        onChange={e => setForm(p => ({ ...p, examples_json: e.target.value }))}
                        rows={5}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-xs font-mono placeholder-white/30 focus:outline-none focus:border-blue-500 resize-none"
                        placeholder='[{"enunciado": "...", "gabarito": "a"}]'
                    />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-white/70 text-sm cursor-pointer">
                    <input
                        type="checkbox"
                        checked={form.is_current}
                        onChange={e => setForm(p => ({ ...p, is_current: e.target.checked }))}
                        className="rounded"
                    />
                    Definir como perfil atual
                </label>
                <div className="flex-1" />
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm rounded-xl transition-colors font-medium"
                >
                    {loading ? 'Salvando...' : '💾 Salvar Perfil'}
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
        <div className="space-y-3 bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-white/80 text-sm font-medium">➕ Novo Blueprint</h4>
            {error && <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/30 rounded-xl p-2">⚠️ {error}</div>}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                    <label className="text-white/50 text-xs mb-1 block">Nome</label>
                    <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Ex: Caso Clínico" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <label className="text-white/50 text-xs mb-1 block">Formato</label>
                    <select value={form.format} onChange={e => setForm(p => ({ ...p, format: e.target.value as QuestionBlueprint['format'] }))}
                        className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500">
                        <option value="mcq_5">Múltipla Escolha 5</option>
                        <option value="mcq_4">Múltipla Escolha 4</option>
                        <option value="certo_errado">Certo/Errado</option>
                        <option value="discursiva">Discursiva</option>
                    </select>
                </div>
                <div>
                    <label className="text-white/50 text-xs mb-1 block">Descrição</label>
                    <input type="text" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                        placeholder="Ex: Questão com caso clínico e conduta" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" />
                </div>
            </div>
            <div>
                <label className="text-white/50 text-xs mb-1 block">Regras (JSON)</label>
                <textarea value={form.blueprint_rules} onChange={e => setForm(p => ({ ...p, blueprint_rules: e.target.value }))}
                    rows={3} placeholder='{"foco": "conduta", "pegadinhas": true}' className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/80 text-xs font-mono focus:outline-none focus:border-blue-500 resize-none" />
            </div>
            <div className="flex justify-end">
                <button onClick={handleSave} disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm rounded-xl transition-colors">
                    {loading ? '...' : '+ Salvar Blueprint'}
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
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-[#0f0f23] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <div>
                        <h2 className="text-lg font-bold text-white">{bank.name}</h2>
                        <p className="text-white/40 text-xs">/{bank.slug} · {bank.is_active ? '✅ Ativa' : '⛔ Inativa'}</p>
                    </div>
                    <button onClick={onClose} className="text-white/40 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10">✕</button>
                </div>

                <div className="flex border-b border-white/10">
                    {(['perfis', 'blueprints'] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`flex-1 py-3 text-sm font-medium capitalize transition-colors ${tab === t ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/5' : 'text-white/50 hover:text-white'}`}>
                            {t === 'perfis' ? '🧬 Perfis' : '🔷 Blueprints'}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {loading ? (
                        <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
                    ) : tab === 'perfis' ? (
                        <>
                            <BankProfileForm bankId={bank.id} onSaved={load} />
                            {profiles.length === 0 ? (
                                <div className="text-center py-8 text-white/30">Nenhum perfil cadastrado</div>
                            ) : (
                                <div className="space-y-3">
                                    {profiles.map(p => (
                                        <div key={p.id} className={`p-4 rounded-xl border ${p.is_current ? 'border-green-500/40 bg-green-500/5' : 'border-white/10 bg-white/5'}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white/50 text-xs bg-white/10 px-2 py-0.5 rounded">v{p.version}</span>
                                                    {p.is_current && <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">✅ Atual</span>}
                                                </div>
                                                {!p.is_current && (
                                                    <button onClick={() => handleSetCurrent(p.id)}
                                                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                                                        Definir como atual
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-white/70 text-sm line-clamp-3">{p.profile_text}</p>
                                            <p className="text-white/30 text-xs mt-1">{new Date(p.created_at || '').toLocaleDateString('pt-BR')}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <BlueprintForm bankId={bank.id} onSaved={load} />
                            {blueprints.length === 0 ? (
                                <div className="text-center py-8 text-white/30">Nenhum blueprint cadastrado</div>
                            ) : (
                                <div className="space-y-2">
                                    {blueprints.map(bp => (
                                        <div key={bp.id} className={`flex items-center gap-3 p-3 rounded-xl border ${bp.is_active ? 'border-white/10 bg-white/5' : 'border-white/5 bg-white/[0.02] opacity-50'}`}>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium">{bp.name}</p>
                                                <p className="text-white/40 text-xs">{bp.format} {bp.description && `· ${bp.description}`}</p>
                                            </div>
                                            <button onClick={() => handleToggleBlueprint(bp)}
                                                className={`text-xs px-2 py-1 rounded-lg transition-colors ${bp.is_active ? 'text-white/50 hover:text-red-400' : 'text-green-400 hover:text-green-300'}`}>
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
        <div className="min-h-screen bg-[#080818] p-6">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">🏛️ Bancas</h1>
                        <p className="text-white/40 text-sm mt-0.5">Gerencie perfis e blueprints de bancas organizadoras</p>
                    </div>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-colors"
                    >
                        ➕ Nova Banca
                    </button>
                </div>

                {/* Create Form */}
                {showCreate && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                        <h3 className="text-white font-semibold">Nova Banca</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input type="text" placeholder="Nome (ex: CEBRASPE)" value={newBank.name}
                                onChange={e => setNewBank(p => ({ ...p, name: e.target.value }))}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
                            <input type="text" placeholder="Slug (ex: cebraspe)" value={newBank.slug}
                                onChange={e => setNewBank(p => ({ ...p, slug: e.target.value }))}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
                            <input type="text" placeholder="Descrição (opcional)" value={newBank.description}
                                onChange={e => setNewBank(p => ({ ...p, description: e.target.value }))}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-white/50 hover:text-white text-sm">Cancelar</button>
                            <button onClick={handleCreate} disabled={creating || !newBank.name}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm rounded-xl transition-colors">
                                {creating ? '...' : 'Criar Banca'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Banks List */}
                {error ? (
                    <div className="text-center py-12 text-white/50">{error}</div>
                ) : loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-28" />)}
                    </div>
                ) : banks.length === 0 ? (
                    <div className="text-center py-16 text-white/30">
                        <p className="text-4xl mb-3">🏛️</p>
                        <p>Nenhuma banca cadastrada</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {banks.map(bank => (
                            <div
                                key={bank.id}
                                className={`bg-white/5 border rounded-2xl p-4 transition-all ${bank.is_active ? 'border-white/10 hover:border-blue-500/30' : 'border-white/5 opacity-60'}`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-white font-semibold">{bank.name}</h3>
                                        <p className="text-white/40 text-xs mt-0.5">/{bank.slug}</p>
                                        {bank.description && <p className="text-white/50 text-xs mt-1">{bank.description}</p>}
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${bank.is_active ? 'bg-green-500/20 text-green-300' : 'bg-white/10 text-white/40'}`}>
                                        {bank.is_active ? 'Ativa' : 'Inativa'}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedBank(bank)}
                                        className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-sm rounded-xl transition-colors font-medium"
                                    >
                                        🧬 Perfis & Blueprints
                                    </button>
                                    <button
                                        onClick={() => handleToggleActive(bank)}
                                        className={`px-3 py-2 text-xs rounded-xl transition-colors ${bank.is_active ? 'bg-white/10 text-white/50 hover:bg-red-500/20 hover:text-red-300' : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'}`}
                                    >
                                        {bank.is_active ? 'Desativar' : 'Ativar'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

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
