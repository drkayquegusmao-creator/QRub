"use client"

import React, { useState, useEffect, useMemo } from 'react'
import {
    Plus, Search, Edit2, Trash2, Package, Building2,
    Network, CheckCircle2, Clock, ChevronRight, X,
    Copy, Download, Upload, Eye, Archive, ArrowLeft,
    FileJson, AlertCircle, RefreshCw, Send, Zap, Trash
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
    getBanks, getBlueprints, getCurrentProfile,
    getPackages, createPackage, updatePackage,
    getPackageQuestions, importQuestionsToPackage,
    updatePackageQuestion, publishPackage, publishQuestion, generatePrompt,
    reprocessPackageQuestions, normalizeQuestion,
    Bank, QuestionBlueprint, QuestionPackage, PackageQuestion,
    BankProfile
} from '@/lib/banks'
import { useTaxonomy, TaxonomyNode } from '@/store/use-taxonomy'
import { useAuth } from '@/store/use-auth'

export default function AdminPackagesManager() {
    const { user } = useAuth()
    const { taxonomy, loadTaxonomy } = useTaxonomy()

    // List state
    const [packages, setPackages] = useState<QuestionPackage[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedPackage, setSelectedPackage] = useState<QuestionPackage | null>(null)
    const [pkgQuestions, setPkgQuestions] = useState<PackageQuestion[]>([])
    const [loadingQuestions, setLoadingQuestions] = useState(false)

    // Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [isPromptModalOpen, setIsPromptModalOpen] = useState(false)
    const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false)

    // Create Form
    const [banks, setBanks] = useState<Bank[]>([])
    const [blueprints, setBlueprints] = useState<QuestionBlueprint[]>([])
    const [createForm, setCreateForm] = useState({
        title: '',
        bank_id: '',
        blueprint_id: '',
        taxonomy_path: '',
        difficulty: 'media' as any,
        requested_count: 10,
        notes: ''
    })

    // Import Form
    const [importJson, setImportJson] = useState('')
    const [isImporting, setIsImporting] = useState(false)
    const [importErrors, setImportErrors] = useState<{ index: number; message: string }[]>([])
    const [isReprocessing, setIsReprocessing] = useState(false)

    // Publish Modal
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)
    const [publishResult, setPublishResult] = useState<{ published: number; errors: number } | null>(null)
    const [publishApiErrors, setPublishApiErrors] = useState<string[]>([])

    // Prompt Data
    const [promptData, setPromptData] = useState<string>('')

    // Single Question Edit
    const [editingQuestion, setEditingQuestion] = useState<PackageQuestion | null>(null)
    const [editData, setEditData] = useState<any>(null)
    const [isSavingQuestion, setIsSavingQuestion] = useState(false)

    useEffect(() => {
        refreshPackages()
        loadTaxonomy()
        loadBanks()
    }, [])

    async function loadBanks() {
        const { data } = await getBanks(true)
        setBanks(data)
    }

    async function refreshPackages() {
        setLoading(true)
        const { data } = await getPackages()
        setPackages(data)
        setLoading(false)
    }

    async function handleSelectPackage(pkg: QuestionPackage) {
        setSelectedPackage(pkg)
        setLoadingQuestions(true)
        const { data } = await getPackageQuestions(pkg.id)
        setPkgQuestions(data)
        setLoadingQuestions(false)
    }

    // --- Create Package Helpers ---

    useEffect(() => {
        if (createForm.bank_id) {
            loadBlueprints(createForm.bank_id)
        } else {
            setBlueprints([])
        }
    }, [createForm.bank_id])

    async function loadBlueprints(bankId: string) {
        const { data } = await getBlueprints(bankId)
        setBlueprints(data.filter(b => b.is_active))
    }

    const taxonomyOptions = useMemo(() => {
        const options: { id: string; path: string }[] = []
        function traverse(node: TaxonomyNode, currentPath: string) {
            const newPath = currentPath ? `${currentPath} > ${node.name}` : node.name
            if (node.level === 'subject') {
                options.push({ id: node.id, path: newPath })
            }
            if (node.children) {
                node.children.forEach(child => traverse(child, newPath))
            }
        }
        taxonomy.forEach(root => traverse(root, ''))
        return options
    }, [taxonomy])

    useEffect(() => {
        const bankName = banks.find(b => b.id === createForm.bank_id)?.name || 'Banca'
        const taxonomyLabel = taxonomyOptions.find(t => t.path === createForm.taxonomy_path)?.path.split(' > ').pop() || 'Assunto'
        const diffLabel = createForm.difficulty === 'media' ? 'Média' : createForm.difficulty === 'facil' ? 'Fácil' : 'Difícil'
        const countLabel = isNaN(createForm.requested_count) ? '0' : createForm.requested_count
        setCreateForm(prev => ({
            ...prev,
            title: `${bankName} • ${taxonomyLabel} • ${diffLabel} • ${countLabel}Q`
        }))
    }, [createForm.bank_id, createForm.taxonomy_path, createForm.difficulty, createForm.requested_count, banks, taxonomyOptions])

    async function handleCreatePackage() {
        if (!createForm.bank_id || !createForm.taxonomy_path) {
            toast.error('Preencha os campos obrigatórios')
            return
        }
        setLoading(true)
        const { data, error } = await createPackage({
            ...createForm,
            status: 'draft'
        })
        if (error) {
            toast.error('Erro ao criar pacote')
        } else {
            toast.success('Pacote criado!')
            setIsCreateModalOpen(false)
            setCreateForm({
                title: '',
                bank_id: '',
                blueprint_id: '',
                taxonomy_path: '',
                difficulty: 'media',
                requested_count: 10,
                notes: ''
            })
            refreshPackages()
        }
        setLoading(false)
    }

    // --- Detail View Actions ---

    async function handleCopyPrompt() {
        if (!selectedPackage || !selectedPackage.bank_id) return
        const bank = banks.find(b => b.id === selectedPackage.bank_id)
        if (!bank) return
        const profile = await getCurrentProfile(selectedPackage.bank_id)
        const blueprint = blueprints.find(b => b.id === selectedPackage.blueprint_id) || null
        const prompt = generatePrompt({
            bank,
            profile: profile as BankProfile,
            blueprint,
            taxonomyPath: selectedPackage.taxonomy_path || '',
            difficulty: selectedPackage.difficulty,
            count: selectedPackage.requested_count,
            packageId: selectedPackage.id
        })
        setPromptData(prompt)
        setIsPromptModalOpen(true)
    }

    async function handleImportJson() {
        if (!selectedPackage) return
        if (!importJson.trim()) return
        setIsImporting(true)
        setImportErrors([])
        try {
            const data = JSON.parse(importJson)
            const questions = Array.isArray(data) ? data : [data]
            const result = await importQuestionsToPackage(selectedPackage.id, questions)

            if (result.errors.length > 0) {
                setImportErrors(result.errors)
                toast.error(`${result.errors.length} questões com erro`)
            }

            if (result.imported > 0) {
                toast.success(`${result.imported} questões importadas!`)
                const { data: newQuestions } = await getPackageQuestions(selectedPackage.id)
                setPkgQuestions(newQuestions)
                if (result.errors.length === 0) {
                    setImportJson('')
                    setIsImportModalOpen(false)
                }
            }
            if (result.duplicates > 0) {
                toast(`${result.duplicates} duplicadas ignoradas.`, { icon: '⚠️' })
            }
        } catch (err) {
            toast.error('JSON inválido')
        } finally {
            setIsImporting(false)
        }
    }

    async function handleReprocessPackage() {
        if (!selectedPackage) return
        if (!confirm('Deseja reprocessar (normalizar) todas as questões deste pacote? Isso pode corrigir campos de gabarito e alternativas.')) return
        setIsReprocessing(true)
        const result = await reprocessPackageQuestions(selectedPackage.id)
        if (result.imported > 0) {
            toast.success(`${result.imported} questões reprocessadas!`)
            handleSelectPackage(selectedPackage)
        }
        if (result.errors.length > 0) {
            toast.error(`${result.errors.length} erros encontrados.`)
            console.error('Reprocess errors:', result.errors)
        }
        setIsReprocessing(false)
    }

    async function handlePublishPackage() {
        if (!selectedPackage) return
        if (pkgQuestions.length === 0) {
            toast.error('Não há questões para publicar')
            return
        }
        setIsPublishModalOpen(true)
        setPublishResult(null)
        setPublishApiErrors([])
    }

    async function executePublish() {
        if (!selectedPackage) return
        setIsPublishing(true)
        setPublishApiErrors([])
        try {
            const res = await fetch(`/api/admin/packages/${selectedPackage.id}/publish`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            const json = await res.json()

            if (!res.ok) {
                const msg = json?.error || `Erro HTTP ${res.status}`
                setPublishApiErrors([msg])
                toast.error(msg)
            } else {
                setPublishResult({ published: json.publishedQuestionsCount, errors: 0 })
                toast.success(`✅ ${json.publishedQuestionsCount} questões publicadas!`)
                // Update package status locally
                setSelectedPackage(prev => prev ? { ...prev, status: 'approved' as any } : null)
                refreshPackages()
                // Reload questions to show updated statuses
                const { data: newQuestions } = await getPackageQuestions(selectedPackage.id)
                setPkgQuestions(newQuestions)
            }
        } catch (err: any) {
            const msg = err?.message || 'Erro de conexão'
            setPublishApiErrors([msg])
            toast.error('Falha na publicação: ' + msg)
        } finally {
            setIsPublishing(false)
        }
    }

    async function handleArchivePackage() {
        if (!selectedPackage) return
        if (!confirm('Deseja arquivar este pacote?')) return
        setLoading(true)
        const { error } = await updatePackage(selectedPackage.id, { status: 'archived' })
        if (error) {
            toast.error('Erro ao arquivar')
        } else {
            toast.success('Pacote arquivado')
            setSelectedPackage(null)
            refreshPackages()
        }
        setLoading(false)
    }

    async function handleDeletePackageQuestion(id: string) {
        if (!confirm('Excluir esta questão do pacote?')) return
        await updatePackageQuestion(id, { status: 'rejected' })
        setPkgQuestions(prev => prev.filter(q => q.id !== id))
        toast.success('Removida')
    }

    // --- Single Question Actions ---

    function handleOpenQuestionDetails(pq: PackageQuestion) {
        setEditingQuestion(pq)
        // Normalize on the fly for the UI to always see the correct keys (answer, options, rationale)
        const qData = normalizeQuestion(pq.question_json as any)
        setEditData(qData)
        setIsEditQuestionModalOpen(true)
    }

    async function handleSaveQuestionEdits() {
        if (!editingQuestion) return
        setIsSavingQuestion(true)
        const { error } = await updatePackageQuestion(editingQuestion.id, {
            question_json: editData,
            status: 'edited'
        })
        if (error) {
            toast.error('Erro ao salvar')
        } else {
            toast.success('Alterações salvas')
            if (selectedPackage) handleSelectPackage(selectedPackage)
            setIsEditQuestionModalOpen(false)
        }
        setIsSavingQuestion(false)
    }

    async function handleApproveSingleQuestion() {
        if (!editingQuestion) return
        if (!confirm('Deseja aprovar e publicar esta questão individualmente no banco oficial?')) return
        setIsSavingQuestion(true)
        const { error: saveErr } = await updatePackageQuestion(editingQuestion.id, {
            question_json: editData,
            status: 'edited'
        })
        if (saveErr) {
            toast.error('Erro ao salvar dados antes de aprovar')
            setIsSavingQuestion(false)
            return
        }
        const res = await publishQuestion(editingQuestion.id)
        if (res.success) {
            toast.success('Questão publicada com sucesso!')
            if (selectedPackage) handleSelectPackage(selectedPackage)
            setIsEditQuestionModalOpen(false)
        } else {
            toast.error('Erro ao publicar')
        }
        setIsSavingQuestion(false)
    }

    // --- Renders ---

    if (selectedPackage) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header Datalhes */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card border border-border/50 p-8 rounded-[40px] shadow-sm">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedPackage(null)} className="p-3 hover:bg-muted rounded-2xl transition-all">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-black italic uppercase tracking-tighter">{selectedPackage.title}</h1>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedPackage.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                    (selectedPackage.status as any) === 'published' ? 'bg-blue-500/10 text-blue-500' :
                                        selectedPackage.status === 'draft' ? 'bg-amber-500/10 text-amber-500' :
                                            'bg-muted text-muted-foreground'
                                    }`}>
                                    {selectedPackage.status}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mt-1">ID: {selectedPackage.id}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleCopyPrompt}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Copy className="w-4 h-4" />
                            Copiar Prompt
                        </button>
                        <button
                            onClick={() => setIsImportModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                            <Upload className="w-4 h-4" />
                            Importar JSON
                        </button>
                        <button
                            disabled={isReprocessing || pkgQuestions.length === 0}
                            onClick={handleReprocessPackage}
                            className="flex items-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 rounded-2xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50"
                        >
                            {isReprocessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                            Reprocessar
                        </button>
                        <button
                            disabled={isPublishing || pkgQuestions.length === 0 || (selectedPackage as any).status === 'archived'}
                            onClick={handlePublishPackage}
                            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isPublishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            {isPublishing ? 'Publicando...' : 'Publicar'}
                        </button>
                        <button
                            onClick={handleArchivePackage}
                            className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                            <Archive className="w-4 h-4" />
                            Arquivar
                        </button>
                    </div>
                </div>

                {/* Questions List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                    {loadingQuestions ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-40 bg-card/50 rounded-[30px] animate-pulse" />
                        ))
                    ) : pkgQuestions.length === 0 ? (
                        <div className="lg:col-span-2 p-20 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-border rounded-[40px]">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground opacity-40">
                                <FileJson className="w-10 h-10" />
                            </div>
                            <p className="font-black uppercase tracking-widest text-muted-foreground opacity-60">Nenhuma questão importada</p>
                            <button onClick={() => setIsImportModalOpen(true)} className="text-primary font-black uppercase text-[10px] tracking-widest border-b border-primary/20 hover:border-primary">Colar JSON agora</button>
                        </div>
                    ) : (
                        pkgQuestions.map((pq, idx) => {
                            const q = pq.question_json as any
                            return (
                                <motion.div
                                    key={pq.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-card glass-card border border-border/50 p-6 rounded-[32px] space-y-4 group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                                                    Questão {pq.status}
                                                    {pq.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                                </p>
                                                <p className="text-xs font-bold text-primary truncate max-w-[200px]">{q.enunciado?.substring(0, 40)}...</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {pq.status !== 'approved' && (
                                                <button onClick={() => handleDeletePackageQuestion(pq.id)} className="p-2 hover:bg-rose-500/10 text-rose-500 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-muted/30 rounded-2xl text-xs line-clamp-3 italic opacity-70">
                                        &quot;{q.enunciado}&quot;
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-1 text-[10px] font-black text-muted-foreground opacity-60">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                ABCDE
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-black text-muted-foreground opacity-60">
                                                <Zap className="w-3 h-3 text-amber-500" />
                                                {q.difficulty}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleOpenQuestionDetails(pq)}
                                            className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                                        >
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        })
                    )}
                </div>

                {/* Modals inside Detail View */}
                <AnimatePresence>
                    {isImportModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/40">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-card w-full max-w-4xl rounded-[40px] border border-border overflow-hidden shadow-2xl"
                            >
                                <div className="p-8 border-b border-border flex justify-between items-center bg-muted/20">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Importar Lote JSON</h2>
                                    </div>
                                    <button onClick={() => setIsImportModalOpen(false)} className="p-2 hover:bg-muted rounded-full">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Cole o array JSON abaixo</label>
                                        <textarea
                                            value={importJson}
                                            onChange={e => setImportJson(e.target.value)}
                                            placeholder='[ { "enunciado": "...", "options": {...}, "answer": "a", "rationale": "..." } ]'
                                            className="w-full h-[250px] bg-muted/30 border border-border rounded-3xl p-6 font-mono text-xs outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                        />
                                    </div>

                                    {importErrors.length > 0 && (
                                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 space-y-2">
                                            <p className="text-[10px] font-black uppercase text-rose-500 tracking-widest flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                Erros de Validação ({importErrors.length})
                                            </p>
                                            <div className="max-h-40 overflow-y-auto space-y-1">
                                                {importErrors.map((err, i) => (
                                                    <p key={i} className="text-[10px] font-medium text-rose-500/80">
                                                        Item {err.index + 1}: {err.message}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] text-muted-foreground max-w-sm italic">
                                            O sistema valida automaticamente a estrutura, gabarito e alternativas antes de salvar.
                                        </p>
                                        <button
                                            disabled={isImporting || !importJson}
                                            onClick={handleImportJson}
                                            className="flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all"
                                        >
                                            {isImporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                            Processar Questions
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isEditQuestionModalOpen && editData && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/40">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-card w-full max-w-5xl h-[90vh] rounded-[40px] border border-border overflow-hidden shadow-2xl flex flex-col"
                            >
                                <div className="p-8 border-b border-border flex justify-between items-center bg-muted/20 shrink-0">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                                            <Edit2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Detalhes da Questão</h2>
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-60">Status: {editingQuestion?.status}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            disabled={isSavingQuestion || editingQuestion?.status === 'approved'}
                                            onClick={handleApproveSingleQuestion}
                                            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl transition-all disabled:opacity-50 ${editingQuestion?.status === 'approved'
                                                ? 'bg-emerald-500/20 text-emerald-500 cursor-default'
                                                : 'bg-emerald-500 text-white shadow-emerald-500/20 hover:scale-105'
                                                }`}
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            {editingQuestion?.status === 'approved' ? 'Publicada' : 'Aprovar & Publicar'}
                                        </button>
                                        {editingQuestion?.status === 'approved' && editingQuestion.question_id && (
                                            <a
                                                href={`/app/resolver?id=${editingQuestion.question_id}`}
                                                target="_blank"
                                                className="flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary/20 transition-all"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Ver no App
                                            </a>
                                        )}
                                        <button onClick={() => setIsEditQuestionModalOpen(false)} className="p-2 hover:bg-muted rounded-full ml-4">
                                            <X className="w-8 h-8" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Enunciado</label>
                                        <textarea
                                            readOnly={editingQuestion?.status === 'approved'}
                                            value={editData.enunciado}
                                            onChange={e => setEditData({ ...editData, enunciado: e.target.value })}
                                            className="w-full h-40 bg-muted/30 border border-border rounded-3xl p-6 font-medium text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none disabled:opacity-70"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {['a', 'b', 'c', 'd', 'e'].map(letter => (
                                            <div key={letter} className="space-y-2">
                                                <div className="flex items-center justify-between px-1">
                                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Alternativa {letter.toUpperCase()}</label>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-bold text-muted-foreground uppercase">Gabarito</span>
                                                        <input
                                                            type="radio"
                                                            checked={editData.answer === letter}
                                                            onChange={() => setEditData({ ...editData, answer: letter })}
                                                            className="w-4 h-4 accent-emerald-500 cursor-pointer"
                                                        />
                                                    </div>
                                                </div>
                                                <textarea
                                                    value={editData.options?.[letter] || ''}
                                                    onChange={e => setEditData({
                                                        ...editData,
                                                        options: { ...editData.options, [letter]: e.target.value }
                                                    })}
                                                    placeholder="Texto da alternativa..."
                                                    className="w-full h-24 bg-muted/30 border border-border rounded-2xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none mb-2"
                                                />
                                                <textarea
                                                    value={editData.option_rationales?.[letter] || ''}
                                                    onChange={e => setEditData({
                                                        ...editData,
                                                        option_rationales: { ...editData.option_rationales, [letter]: e.target.value }
                                                    })}
                                                    placeholder="Por que esta alternativa está correta/errada?"
                                                    className="w-full h-16 bg-primary/5 border border-primary/10 rounded-xl p-3 text-[10px] font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border/50">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Justificativa Geral</label>
                                            <textarea
                                                value={editData.rationale}
                                                onChange={e => setEditData({ ...editData, rationale: e.target.value })}
                                                className="w-full h-48 bg-muted/30 border border-border rounded-3xl p-6 text-xs font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                            />
                                        </div>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Tags (Separadas por vírgula)</label>
                                                <input
                                                    value={editData.tags ? editData.tags.join(', ') : ''}
                                                    onChange={e => setEditData({ ...editData, tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean) })}
                                                    className="w-full h-12 bg-muted/30 border border-border rounded-2xl px-6 text-xs font-bold outline-none"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Dificuldade</label>
                                                <select
                                                    value={editData.difficulty}
                                                    onChange={e => setEditData({ ...editData, difficulty: e.target.value })}
                                                    className="w-full h-12 bg-muted/30 border border-border rounded-2xl px-6 text-xs font-bold outline-none"
                                                >
                                                    <option value="facil">Fácil</option>
                                                    <option value="media">Média</option>
                                                    <option value="dificil">Difícil</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 border-t border-border bg-muted/20 shrink-0 flex justify-end gap-4">
                                    <button onClick={() => setIsEditQuestionModalOpen(false)} className="px-8 py-3 text-xs font-black uppercase tracking-widest text-muted-foreground">Fechar</button>
                                    {editingQuestion?.status !== 'approved' && (
                                        <button disabled={isSavingQuestion} onClick={handleSaveQuestionEdits} className="px-10 py-4 bg-muted border border-border rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-card transition-all disabled:opacity-50">Salvar Rascunho</button>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isPromptModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/40">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-card w-full max-w-2xl rounded-[40px] border border-border overflow-hidden shadow-2xl"
                            >
                                <div className="p-8 border-b border-border flex justify-between items-center bg-primary/5">
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-primary">IA Generation Prompt</h2>
                                    <button onClick={() => setIsPromptModalOpen(false)} className="p-2 hover:bg-muted rounded-full">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="bg-muted/50 rounded-3xl p-6 h-[400px] overflow-y-auto whitespace-pre-wrap text-sm font-medium leading-relaxed border border-border/50">
                                        {promptData}
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(promptData)
                                            toast.success('Prompt copiado!')
                                        }}
                                        className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                                    >
                                        <Copy className="w-5 h-5" />
                                        Copiar Instrucoes para o Antigravity
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* PUBLISH CONFIRMATION MODAL */}
                <AnimatePresence>
                    {isPublishModalOpen && (
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-md bg-black/50">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-card w-full max-w-lg rounded-[40px] border border-border overflow-hidden shadow-2xl"
                            >
                                <div className="p-8 space-y-6">
                                    <div className="flex flex-col items-center text-center space-y-4 pt-4">
                                        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center shadow-xl">
                                            {publishResult
                                                ? <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                                : <Send className="w-10 h-10 text-emerald-500" />
                                            }
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                                                {publishResult ? 'Publicado!' : 'Publicar Pacote'}
                                            </h2>
                                            <p className="text-sm text-muted-foreground font-medium mt-1 max-w-sm mx-auto">
                                                {publishResult
                                                    ? `${publishResult.published} questoes agora disponiveis para os usuarios.`
                                                    : `Este pacote tem ${pkgQuestions.length} questao(oes). Ao confirmar, elas serao migradas para o Banco de Questoes e ficam visiveis para os alunos imediatamente.`
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {publishApiErrors.length > 0 && (
                                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 space-y-2">
                                            <p className="text-[10px] font-black uppercase text-rose-500 tracking-widest flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                Nao foi possivel publicar
                                            </p>
                                            {publishApiErrors.map((e, i) => (
                                                <p key={i} className="text-xs font-medium text-rose-500/80">{e}</p>
                                            ))}
                                            <p className="text-[10px] text-muted-foreground mt-2 italic">
                                                Verifique se as questoes foram reprocessadas ou tente novamente.
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-2">
                                        {publishResult ? (
                                            <button
                                                onClick={() => setIsPublishModalOpen(false)}
                                                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                                            >
                                                Concluido
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setIsPublishModalOpen(false)}
                                                    disabled={isPublishing}
                                                    className="flex-1 py-4 bg-muted hover:bg-muted/80 rounded-2xl font-black uppercase text-xs tracking-widest transition-all disabled:opacity-50"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={executePublish}
                                                    disabled={isPublishing}
                                                    className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                                >
                                                    {isPublishing
                                                        ? <><RefreshCw className="w-4 h-4 animate-spin" /> Publicando...</>
                                                        : <><Send className="w-4 h-4" /> Confirmar</>
                                                    }
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        )
    }

    return (
        <div className="space-y-10">
            {/* HUD Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-1">
                        Pacotes <span className="text-primary">& Deploy</span>
                    </h1>
                    <p className="text-xs text-muted-foreground font-black uppercase tracking-widest opacity-60">Controle o Ciclo de Vida da Inteligência</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-muted/50 p-1.5 rounded-2xl border border-border/50">
                        <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase bg-card shadow-sm">Todos</button>
                        <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase opacity-60 hover:opacity-100 transition-all">Drafts</button>
                        <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase opacity-60 hover:opacity-100 transition-all">Aprovados</button>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-[24px] text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Novo Pacote
                    </button>
                </div>
            </div>

            {/* List Table */}
            <section className="bg-card glass-card border border-border/50 rounded-[40px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted/30 border-b border-border/50">
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Título do Deploy</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Banca / Blueprint</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Volume</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                            <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right italic">Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={5} className="px-8 py-8"><div className="h-6 bg-muted rounded-xl w-full" /></td>
                                </tr>
                            ))
                        ) : packages.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center opacity-40">
                                        <Package className="w-12 h-12 mb-4" />
                                        <p className="font-black uppercase text-xs tracking-widest">Sem pacotes pendentes</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            packages.map((pkg) => (
                                <tr
                                    key={pkg.id}
                                    onClick={() => handleSelectPackage(pkg)}
                                    className="group hover:bg-muted/30 cursor-pointer transition-all"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                                <FileJson className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-black text-sm uppercase italic tracking-tight">{pkg.title}</p>
                                                <p className="text-[10px] font-medium text-muted-foreground truncate max-w-[200px]">{pkg.taxonomy_path}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{(pkg as any).banks?.name || 'Vários'}</span>
                                            <span className="text-xs font-bold text-muted-foreground">{(pkg as any).question_blueprints?.name || 'Manual'}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="text-lg font-black italic">{pkg.requested_count}Q</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${pkg.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                            pkg.status === 'draft' ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-muted text-muted-foreground'
                                            }`}>
                                            {pkg.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-mono text-[10px] text-muted-foreground">
                                        {new Date(pkg.created_at || '').toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>

            {/* Create Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/40">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card w-full max-w-4xl rounded-[50px] border border-border overflow-hidden shadow-2xl"
                        >
                            <div className="p-10 border-b border-border flex justify-between items-center bg-muted/20">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary p-3 rounded-2xl text-white shadow-lg shadow-primary/30">
                                        <Package className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Novo Deploy de Questões</h2>
                                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-60">Orquestração para o Antigravity</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsCreateModalOpen(false)} className="p-3 hover:bg-muted rounded-full transition-all">
                                    <X className="w-8 h-8" />
                                </button>
                            </div>

                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Selecionar Banca</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                            <select
                                                value={createForm.bank_id}
                                                onChange={e => setCreateForm({ ...createForm, bank_id: e.target.value })}
                                                className="w-full h-14 bg-muted/30 border border-border rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-bold text-sm"
                                            >
                                                <option value="">Selecione a Banca</option>
                                                {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Taxonomia (Assunto)</label>
                                        <div className="relative">
                                            <Network className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                            <select
                                                value={createForm.taxonomy_path}
                                                onChange={e => setCreateForm({ ...createForm, taxonomy_path: e.target.value })}
                                                className="w-full h-14 bg-muted/30 border border-border rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-bold text-sm"
                                            >
                                                <option value="">Selecione o Assunto</option>
                                                {taxonomyOptions.map(t => <option key={t.id} value={t.path}>{t.path}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Blueprint (Modelo)</label>
                                        <select
                                            value={createForm.blueprint_id}
                                            onChange={e => setCreateForm({ ...createForm, blueprint_id: e.target.value })}
                                            className="w-full h-14 bg-muted/30 border border-border rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-bold text-sm"
                                        >
                                            <option value="">Modelo Manual</option>
                                            {blueprints.map(b => <option key={b.id} value={b.id}>{b.name} ({b.format})</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Volume</label>
                                            <input
                                                type="number"
                                                value={isNaN(createForm.requested_count) ? '' : createForm.requested_count}
                                                onChange={e => {
                                                    const val = parseInt(e.target.value)
                                                    setCreateForm({ ...createForm, requested_count: isNaN(val) ? 0 : val })
                                                }}
                                                className="w-full h-14 bg-muted/30 border border-border rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 font-black text-center"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Dificuldade</label>
                                            <select
                                                value={createForm.difficulty}
                                                onChange={e => setCreateForm({ ...createForm, difficulty: e.target.value as any })}
                                                className="w-full h-14 bg-muted/30 border border-border rounded-2xl px-6 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                                            >
                                                <option value="facil">Fácil</option>
                                                <option value="media">Média</option>
                                                <option value="dificil">Difícil</option>
                                                <option value="mista">Mista</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Título do Deploy (Auto)</label>
                                        <input
                                            readOnly
                                            value={createForm.title}
                                            className="w-full h-14 bg-primary/5 border border-primary/20 rounded-2xl px-6 outline-none font-black italic uppercase text-primary"
                                        />
                                    </div>

                                    <div className="pt-4 flex items-center justify-between">
                                        <button onClick={() => setIsCreateModalOpen(false)} className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-foreground underline decoration-border underline-offset-8 transition-all">Cancelar</button>
                                        <button
                                            onClick={handleCreatePackage}
                                            className="flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-[24px] font-black uppercase tracking-widest shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
                                        >
                                            <Send className="w-5 h-5" />
                                            Criar Registro
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
