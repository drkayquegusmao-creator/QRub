"use client"

import { useState, useEffect, useMemo } from 'react'
import {
    Plus, Search, Edit2, Trash2, Package, Building2,
    Network, CheckCircle2, Clock, ChevronRight, X,
    Copy, Download, Upload, Eye, Archive, ArrowLeft,
    FileJson, AlertCircle, RefreshCw, Send, Zap, Trash, Check
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
        const options: { id: string; path: string; level: string; count: number }[] = []
        function traverse(node: TaxonomyNode, currentPath: string) {
            const newPath = currentPath ? `${currentPath} > ${node.name}` : node.name

            // Adicionamos todos os níveis para permitir geração ampla (Geral) ou específica (Assunto)
            options.push({
                id: node.id,
                path: newPath,
                level: node.level,
                count: (node as any).questionCount || 0
            })

            if (node.children) {
                node.children.forEach(child => traverse(child, newPath))
            }
        }
        taxonomy.forEach(root => traverse(root, ''))
        return options
    }, [taxonomy])

    useEffect(() => {
        const bankName = banks.find(b => b.id === createForm.bank_id)?.name || 'Banca'
        const selectedTax = taxonomyOptions.find(t => t.path === createForm.taxonomy_path)
        const taxonomyLabel = selectedTax
            ? (selectedTax.level !== 'subject' ? `${selectedTax.path.split(' > ').pop()?.toUpperCase()} GERAL` : selectedTax.path.split(' > ').pop()?.toUpperCase())
            : 'ASSUNTO'
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

        // Descobrir sub-tópicos se for nível GERAL
        const path = selectedPackage.taxonomy_path || ''
        const parts = path.split(' > ').map(p => p.trim())
        let currentLevel = taxonomy
        let targetNode: TaxonomyNode | null = null

        for (const part of parts) {
            const found = currentLevel.find(n => n.name === part)
            if (found) {
                targetNode = found
                currentLevel = found.children || []
            } else {
                break
            }
        }

        const subTopics = targetNode?.children?.map(c => c.name) || []

        const profile = await getCurrentProfile(selectedPackage.bank_id)
        const blueprint = blueprints.find(b => b.id === selectedPackage.blueprint_id) || null
        const prompt = generatePrompt({
            bank,
            profile: profile as BankProfile,
            blueprint,
            taxonomyPath: selectedPackage.taxonomy_path || '',
            difficulty: selectedPackage.difficulty,
            count: selectedPackage.requested_count,
            packageId: selectedPackage.id,
            subTopics: subTopics.length > 0 ? subTopics : undefined
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
            // Get current auth token to send in Authorization header
            const { supabase } = await import('@/lib/supabase')
            const { data: { session } } = await supabase.auth.getSession()
            const token = session?.access_token || ''

            const res = await fetch(`/api/admin/packages/${selectedPackage.id}/publish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            const json = await res.json()
            console.log('[publish] response', res.status, json)

            if (!res.ok) {
                const msg = json?.error || `Erro HTTP ${res.status}`
                setPublishApiErrors([msg])
                toast.error(msg)
            } else {
                setPublishResult({ published: json.publishedQuestionsCount, errors: json.errors?.length || 0 })
                toast.success(`✅ ${json.publishedQuestionsCount} questões publicadas!`)
                // Update package status locally
                setSelectedPackage(prev => prev ? { ...prev, status: 'approved' as any } : null)
                refreshPackages()
                await loadTaxonomy()
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

    async function handleDeletePackage(pkgToDelete?: QuestionPackage) {
        const target = pkgToDelete || selectedPackage
        if (!target) return
        if (!confirm(`🛑 ATENÇÃO: Deseja excluir PERMANENTEMENTE o pacote "${target.title}" e todas as suas questões em rascunho? Esta ação não pode ser desfeita.`)) return

        setLoading(true)
        try {
            const { supabase } = await import('@/lib/supabase')
            const { data: { session } } = await supabase.auth.getSession()
            const token = session?.access_token || ''

            const res = await fetch(`/api/admin/packages/${target.id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!res.ok) {
                const json = await res.json()
                throw new Error(json.error || 'Erro ao excluir pacote')
            }

            toast.success('Pacote excluído com sucesso')
            if (selectedPackage?.id === target.id) {
                setSelectedPackage(null)
            }
            refreshPackages()
        } catch (err: any) {
            toast.error(err.message || 'Erro ao excluir')
        } finally {
            setLoading(false)
        }
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
            await loadTaxonomy()
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-slate-100 p-8 rounded-[40px] shadow-2xl shadow-blue-500/5">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedPackage(null)} className="p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200">
                            <ArrowLeft className="w-6 h-6 text-slate-900" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">{selectedPackage.title}</h1>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${selectedPackage.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                    (selectedPackage.status as any) === 'published' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                        selectedPackage.status === 'draft' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                            'bg-slate-50 text-slate-400'
                                    }`}>
                                    {selectedPackage.status}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 font-bold tracking-widest mt-1 opacity-60">IDENTIFICADOR: {selectedPackage.id.toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleCopyPrompt}
                            className="flex items-center gap-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Copy className="w-4 h-4" />
                            Copiar Prompt
                        </button>
                        <button
                            onClick={() => setIsImportModalOpen(true)}
                            className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:border-blue-500 hover:text-blue-600 shadow-sm"
                        >
                            <Upload className="w-4 h-4" />
                            Importar JSON
                        </button>
                        <button
                            disabled={isReprocessing || pkgQuestions.length === 0}
                            onClick={handleReprocessPackage}
                            className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 shadow-sm"
                        >
                            {isReprocessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 text-slate-400" />}
                            Reprocessar
                        </button>
                        <button
                            disabled={isPublishing || pkgQuestions.length === 0 || (selectedPackage as any).status === 'archived'}
                            onClick={handlePublishPackage}
                            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isPublishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            {isPublishing ? 'Publicando...' : 'Publicar Todo'}
                        </button>
                        <button
                            onClick={handleArchivePackage}
                            className="flex items-center gap-2 px-8 py-3 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-100 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            <Archive className="w-4 h-4" />
                            Arquivar
                        </button>
                        <button
                            onClick={() => handleDeletePackage()}
                            className="flex items-center gap-2 px-8 py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                            Excluir
                        </button>
                    </div>
                </div>

                {/* Questions List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                    {loadingQuestions ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-44 bg-slate-50 border border-slate-100 rounded-[40px] animate-pulse" />
                        ))
                    ) : pkgQuestions.length === 0 ? (
                        <div className="lg:col-span-2 p-24 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px]">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-slate-300 shadow-inner">
                                <FileJson className="w-10 h-10 opacity-30" />
                            </div>
                            <div>
                                <h3 className="text-slate-400 font-black uppercase text-sm tracking-[0.2em]">Nenhuma questão importada</h3>
                                <p className="text-slate-300 text-xs font-bold mt-2">O deploy está aguardando os dados do Antigravity</p>
                            </div>
                            <button onClick={() => setIsImportModalOpen(true)} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-slate-900/10">Injetar JSON Agora</button>
                        </div>
                    ) : (
                        pkgQuestions.map((pq, idx) => {
                            const q = pq.question_json as any
                            return (
                                <motion.div
                                    key={pq.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white border border-slate-100 p-8 rounded-[3rem] space-y-5 group hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-2"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-3xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-black text-xl shadow-inner">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5 leading-none mb-1">
                                                    Status: <span className={pq.status === 'approved' ? 'text-emerald-500' : 'text-slate-900'}>{pq.status.toUpperCase()}</span>
                                                    {pq.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                                </p>
                                                <h4 className="text-sm font-black text-slate-900 uppercase italic tracking-tight line-clamp-1">{q.enunciado?.substring(0, 50)}...</h4>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {pq.status !== 'approved' && (
                                                <button onClick={() => handleDeletePackageQuestion(pq.id)} className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl transition-all opacity-0 group-hover:opacity-100 border border-rose-100 hover:bg-rose-500 hover:text-white">
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-xs font-medium text-slate-600 leading-relaxed italic relative">
                                        <span className="absolute -top-3 left-4 bg-white border border-slate-100 text-slate-300 text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Excerto</span>
                                        &quot;{q.enunciado}&quot;
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex gap-6">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                {q.answer?.toUpperCase()} (VÁLIDO)
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                <Zap className="w-3 h-3 text-amber-500" />
                                                {q.difficulty?.toUpperCase() || 'MISTO'}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleOpenQuestionDetails(pq)}
                                            className="px-6 py-2.5 bg-slate-50 hover:bg-blue-600 text-slate-900 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-slate-100"
                                        >
                                            Inspecionar
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
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="bg-white w-full max-w-4xl rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl"
                            >
                                <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <div className="flex items-center gap-5">
                                        <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Injetar Matriz JSON</h2>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Carregamento de Dados Antigravity</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsImportModalOpen(false)} className="w-12 h-12 hover:bg-slate-100 rounded-2xl flex items-center justify-center transition-all border border-transparent hover:border-slate-200">
                                        <X className="w-6 h-6 text-slate-400" />
                                    </button>
                                </div>
                                <div className="p-10 space-y-8 overflow-y-auto max-h-[70vh]">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Cole a Matriz Serializada</label>
                                        <textarea
                                            value={importJson}
                                            onChange={e => setImportJson(e.target.value)}
                                            placeholder='[ { "enunciado": "...", "options": {...}, "answer": "a", "rationale": "..." } ]'
                                            className="w-full h-[300px] bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-mono text-xs outline-none focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all resize-none shadow-inner"
                                        />
                                    </div>

                                    {importErrors.length > 0 && (
                                        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 space-y-3">
                                            <p className="text-[10px] font-black uppercase text-rose-600 tracking-widest flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                Anomalias de Estrutura Detectadas ({importErrors.length})
                                            </p>
                                            <div className="max-h-40 overflow-y-auto space-y-2">
                                                {importErrors.map((err, i) => (
                                                    <p key={i} className="text-[11px] font-bold text-rose-500/90 leading-tight">
                                                        <span className="opacity-50">#ID {err.index + 1}:</span> {err.message}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <div className="max-w-md">
                                            <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest leading-relaxed">
                                                Protocolo de Validação Ativo
                                            </p>
                                            <p className="text-[10px] text-slate-400 font-bold mt-1">
                                                O sistema verifica automaticamente cada nó da árvore JSON antes da persistência.
                                            </p>
                                        </div>
                                        <button
                                            disabled={isImporting || !importJson}
                                            onClick={handleImportJson}
                                            className="flex items-center gap-4 px-12 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-slate-900/20 disabled:opacity-50 hover:scale-105 active:scale-95 transition-all"
                                        >
                                            {isImporting ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                                            Processar Matriz
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isEditQuestionModalOpen && editData && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="bg-white w-full max-w-6xl h-[95vh] rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl flex flex-col"
                            >
                                <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
                                    <div className="flex items-center gap-6">
                                        <div className="bg-slate-900 p-5 rounded-[1.5rem] text-white shadow-xl shadow-slate-900/20">
                                            <Edit2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Editor de Manuscrito</h2>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mt-2 flex items-center gap-2">
                                                ID: {editingQuestion?.id.substring(0, 8).toUpperCase()} —
                                                <span className={`px-2 py-0.5 rounded-md ${editingQuestion?.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                    {editingQuestion?.status.toUpperCase()}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            disabled={isSavingQuestion || editingQuestion?.status === 'approved'}
                                            onClick={handleApproveSingleQuestion}
                                            className={`flex items-center gap-3 px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-xl transition-all disabled:opacity-50 ${editingQuestion?.status === 'approved'
                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default'
                                                : 'bg-emerald-600 text-white shadow-emerald-500/20 hover:scale-105 active:scale-95'
                                                }`}
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            {editingQuestion?.status === 'approved' ? 'CONSOLIDADA' : 'PUBLICAR ESTA'}
                                        </button>
                                        {editingQuestion?.status === 'approved' && editingQuestion.question_id && (
                                            <a
                                                href={`/app/resolver?id=${editingQuestion.question_id}`}
                                                target="_blank"
                                                className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Visualizar App
                                            </a>
                                        )}
                                        <button onClick={() => setIsEditQuestionModalOpen(false)} className="w-14 h-14 bg-white border border-slate-100 hover:bg-slate-50 rounded-[1.5rem] flex items-center justify-center transition-all shadow-sm">
                                            <X className="w-8 h-8 text-slate-400" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar bg-white">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Enunciado da Questão</label>
                                        <textarea
                                            readOnly={editingQuestion?.status === 'approved'}
                                            value={editData.enunciado}
                                            onChange={e => setEditData({ ...editData, enunciado: e.target.value })}
                                            className="w-full h-48 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 font-bold text-slate-900 leading-relaxed outline-none focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all resize-none shadow-inner"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {['a', 'b', 'c', 'd', 'e'].map(letter => (
                                            <div key={letter} className="p-8 bg-slate-50/50 border border-slate-100 rounded-[3rem] space-y-5 transition-all focus-within:bg-white focus-within:shadow-xl focus-within:border-blue-200 group">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm uppercase transition-all ${editData.answer === letter ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white border border-slate-200 text-slate-400'}`}>
                                                            {letter}
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Alternativa {letter}</span>
                                                    </div>
                                                    <label className="flex items-center gap-3 cursor-pointer group/toggle">
                                                        <span className={`text-[10px] font-black uppercase transition-all ${editData.answer === letter ? 'text-emerald-500' : 'text-slate-300 group-hover/toggle:text-slate-400'}`}>Correta</span>
                                                        <div className="relative">
                                                            <input
                                                                type="radio"
                                                                checked={editData.answer === letter}
                                                                onChange={() => setEditData({ ...editData, answer: letter })}
                                                                className="sr-only"
                                                            />
                                                            <div className={`w-12 h-6 rounded-full transition-all ${editData.answer === letter ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                                                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all flex items-center justify-center ${editData.answer === letter ? 'translate-x-6' : 'translate-x-0'}`}>
                                                                {editData.answer === letter && <Check className="w-2.5 h-2.5 text-emerald-500" />}
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                <textarea
                                                    value={editData.options?.[letter] || ''}
                                                    onChange={e => setEditData({
                                                        ...editData,
                                                        options: { ...editData.options, [letter]: e.target.value }
                                                    })}
                                                    placeholder="Digite o texto da opção..."
                                                    className="w-full h-20 bg-white border border-slate-200 rounded-2xl p-5 text-sm font-bold text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all resize-none"
                                                />
                                                <div className="space-y-2">
                                                    <label className="text-[8px] font-black uppercase text-slate-400 tracking-widest px-2">Racional da Opção (Privado)</label>
                                                    <textarea
                                                        value={editData.option_rationales?.[letter] || ''}
                                                        onChange={e => setEditData({
                                                            ...editData,
                                                            option_rationales: { ...editData.option_rationales, [letter]: e.target.value }
                                                        })}
                                                        placeholder="Por que esta opção?"
                                                        className="w-full h-16 bg-white/50 border border-slate-100 rounded-xl p-4 text-[10px] font-bold text-slate-500 outline-none focus:bg-white transition-all resize-none italic"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Justificativa Master (App)</label>
                                            <textarea
                                                value={editData.rationale}
                                                onChange={e => setEditData({ ...editData, rationale: e.target.value })}
                                                className="w-full h-64 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10 text-sm font-bold text-slate-600 leading-relaxed outline-none focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 transition-all resize-none shadow-inner"
                                            />
                                        </div>
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Metadados & Tags</label>
                                                <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 space-y-6">
                                                    <div className="space-y-2">
                                                        <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">Palavras-Chave</p>
                                                        <input
                                                            value={editData.tags ? editData.tags.join(', ') : ''}
                                                            onChange={e => setEditData({ ...editData, tags: e.target.value.split(',').map((t: string) => t.trim()).filter(Boolean) })}
                                                            className="w-full h-14 bg-white border border-slate-200 rounded-2xl px-6 text-xs font-black text-slate-900 outline-none focus:border-slate-400 shadow-sm"
                                                            placeholder="Ex: Cardiologia, ECG, Emergência"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest ml-1">Nível de Complexidade</p>
                                                        <select
                                                            value={editData.difficulty}
                                                            onChange={e => setEditData({ ...editData, difficulty: e.target.value })}
                                                            className="w-full h-14 bg-white border border-slate-200 rounded-2xl px-6 text-xs font-black text-slate-900 outline-none shadow-sm appearance-none"
                                                        >
                                                            <option value="facil">FÁCIL (NÍVEL 1)</option>
                                                            <option value="media">MÉDIA (NÍVEL 2)</option>
                                                            <option value="dificil">DIFÍCIL (NÍVEL 3)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-10 border-t border-slate-100 bg-slate-50/50 shrink-0 flex justify-end gap-5">
                                    <button onClick={() => setIsEditQuestionModalOpen(false)} className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Fechar Monitor</button>
                                    {editingQuestion?.status !== 'approved' && (
                                        <button disabled={isSavingQuestion} onClick={handleSaveQuestionEdits} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 shadow-2xl shadow-slate-900/10 active:scale-95 transition-all disabled:opacity-50">Salvar Rascunho</button>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isPromptModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="bg-white w-full max-w-2xl rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl"
                            >
                                <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                                    <div className="flex items-center gap-4">
                                        <Zap className="w-6 h-6 text-blue-400" />
                                        <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none pt-1">Geração Antigravity</h2>
                                    </div>
                                    <button onClick={() => setIsPromptModalOpen(false)} className="w-12 h-12 hover:bg-white/10 rounded-2xl flex items-center justify-center transition-all">
                                        <X className="w-6 h-6 text-white/40" />
                                    </button>
                                </div>
                                <div className="p-10 space-y-8 bg-white">
                                    <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 h-[450px] overflow-y-auto whitespace-pre-wrap text-[11px] font-bold text-slate-600 leading-[1.8] shadow-inner custom-scrollbar italic">
                                        {promptData}
                                    </div>
                                    <button
                                        onClick={async () => {
                                            try {
                                                if (navigator.clipboard && window.isSecureContext) {
                                                    await navigator.clipboard.writeText(promptData);
                                                    toast.success('Protocolo copiado!');
                                                    return;
                                                }
                                                throw new Error('Clipboard API indisponível');
                                            } catch (err) {
                                                const textArea = document.createElement("textarea");
                                                textArea.value = promptData;
                                                textArea.style.position = "absolute";
                                                textArea.style.left = "-999999px";
                                                document.body.appendChild(textArea);
                                                textArea.select();
                                                try {
                                                    document.execCommand('copy');
                                                    toast.success('Protocolo copiado!');
                                                } catch (fallbackErr) {
                                                    console.error('Fallback copy error', fallbackErr);
                                                    toast.error('Erro ao copiar protocolo.');
                                                } finally {
                                                    textArea.remove();
                                                }
                                            }
                                        }}
                                        className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                                    >
                                        <Copy className="w-5 h-5" />
                                        Copiar Protocolo de Geração
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* PUBLISH CONFIRMATION MODAL */}
                <AnimatePresence>
                    {isPublishModalOpen && (
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                                className="bg-white w-full max-w-xl rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl relative"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />

                                <div className="p-12 space-y-10">
                                    <div className="flex flex-col items-center text-center space-y-6 pt-4">
                                        <div className="w-24 h-24 rounded-[2rem] bg-emerald-50 border-4 border-white flex items-center justify-center shadow-xl shadow-emerald-500/10">
                                            {publishResult
                                                ? <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                                : <Send className="w-12 h-12 text-emerald-500 animate-pulse" />
                                            }
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900">
                                                {publishResult ? 'PUBLICAÇÃO CONCLUÍDA' : 'FINALIZAR DEPLOY'}
                                            </h2>
                                            <p className="text-xs text-slate-400 font-bold mt-3 max-w-[18rem] mx-auto uppercase tracking-widest leading-relaxed">
                                                {publishResult
                                                    ? `PACOTE SINCRONIZADO: ${publishResult.published} QUESTÕES FORAM INTEGRADAS AO BANCO MASTER.`
                                                    : `SINCRONISMO DE ${pkgQuestions.length} QUESTÕES PARA O AMBIENTE DE PRODUÇÃO.`
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {publishApiErrors.length > 0 && (
                                        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 space-y-3">
                                            <p className="text-[10px] font-black uppercase text-rose-600 tracking-widest flex items-center gap-2">
                                                <AlertCircle className="w-5 h-5" />
                                                FALHA NA INTEGRAÇÃO
                                            </p>
                                            <div className="space-y-1">
                                                {publishApiErrors.map((e, i) => (
                                                    <p key={i} className="text-[11px] font-bold text-rose-500/90 leading-tight">ERRO: {e.toUpperCase()}</p>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-4 pt-4">
                                        {publishResult ? (
                                            <button
                                                onClick={() => setIsPublishModalOpen(false)}
                                                className="w-full py-6 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-slate-900/10 hover:scale-[1.02] active:scale-95 transition-all"
                                            >
                                                FECHAR RELATÓRIO
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setIsPublishModalOpen(false)}
                                                    disabled={isPublishing}
                                                    className="flex-1 py-6 bg-white border border-slate-200 text-slate-400 hover:text-slate-600 rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all hover:bg-slate-50 disabled:opacity-50"
                                                >
                                                    ABORTAR
                                                </button>
                                                <button
                                                    onClick={executePublish}
                                                    disabled={isPublishing}
                                                    className="flex-1 py-6 bg-emerald-500 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                                                >
                                                    {isPublishing
                                                        ? <><RefreshCw className="w-5 h-5 animate-spin" /> SINCRONIZANDO...</>
                                                        : <><Send className="w-5 h-5" /> CONFIRMAR</>
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
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-1 text-slate-900">
                        Pacotes <span className="text-blue-600">& Deploy</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest opacity-60">Centro de Orquestração de Inteligência Artificial</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
                        <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase bg-white text-slate-900 shadow-sm border border-slate-200/50">Todos</button>
                        <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-all">Drafts</button>
                        <button className="px-6 py-2 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-all">Aprovados</button>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:scale-105 active:scale-95 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Gerar Lote Master
                    </button>
                </div>
            </div>

            {/* List Table */}
            <section className="bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-2xl shadow-blue-500/5">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Título do Deploy</th>
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Banca / Blueprint</th>
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Volume</th>
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right italic">Criado em</th>
                            <th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={5} className="px-10 py-10"><div className="h-8 bg-slate-50 rounded-2xl w-full" /></td>
                                </tr>
                            ))
                        ) : packages.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-10 py-24 text-center">
                                    <div className="flex flex-col items-center opacity-20">
                                        <Package className="w-16 h-16 mb-6 grayscale" />
                                        <p className="font-black uppercase text-xs tracking-[0.2em] text-slate-400">Sem pacotes pendentes no pipeline</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            packages.map((pkg) => (
                                <tr
                                    key={pkg.id}
                                    onClick={() => handleSelectPackage(pkg)}
                                    className="group hover:bg-slate-50 cursor-pointer transition-all active:scale-[0.99]"
                                >
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                                <FileJson className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-black text-base uppercase italic tracking-tighter text-slate-900">{pkg.title}</p>
                                                <p className="text-[10px] font-bold text-slate-400 truncate max-w-[250px] uppercase tracking-widest leading-none mt-1 opacity-60">{pkg.taxonomy_path}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-900 leading-none mb-1">{(pkg as any).banks?.name || 'GENÉRICA'}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{(pkg as any).question_blueprints?.name || 'MANUAL'}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <div className="inline-flex flex-col bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl shadow-inner">
                                            <span className="text-xl font-black italic text-slate-900">{pkg.requested_count}</span>
                                            <span className="text-[8px] font-black uppercase text-slate-400">Total Q</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${pkg.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                            pkg.status === 'draft' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                'bg-slate-50 text-slate-400'
                                            }`}>
                                            {pkg.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right font-mono text-[10px] text-slate-400 font-bold">
                                        {new Date(pkg.created_at || '').toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-10 py-8 text-right" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => handleDeletePackage(pkg)}
                                            className="w-10 h-10 inline-flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl transition-all opacity-0 group-hover:opacity-100 border border-rose-100 hover:bg-rose-500 hover:text-white shadow-sm"
                                            title="Excluir Pacote"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
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
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-white w-full max-w-5xl rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

                            <div className="p-12 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div className="flex items-center gap-6">
                                    <div className="bg-slate-900 p-5 rounded-[2rem] text-white shadow-2xl shadow-slate-900/20 rotate-3">
                                        <Package className="w-10 h-10" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Novo Deploy Master</h2>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mt-2">Configuração de Lote Para Geração I.A.</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsCreateModalOpen(false)} className="w-14 h-14 bg-white border border-slate-100 hover:bg-slate-50 rounded-[1.5rem] flex items-center justify-center transition-all shadow-sm hover:rotate-90">
                                    <X className="w-8 h-8 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">1. Entidade Organizadora (Banca)</label>
                                        <div className="relative group">
                                            <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 transition-transform group-focus-within:scale-110" />
                                            <select
                                                value={createForm.bank_id}
                                                onChange={e => setCreateForm({ ...createForm, bank_id: e.target.value })}
                                                className="w-full h-16 bg-slate-50 border border-slate-200 rounded-3xl pl-16 pr-6 outline-none focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 appearance-none font-bold text-slate-900 transition-all text-sm"
                                            >
                                                <option value="">SELECIONE A BANCA ALVO</option>
                                                {banks.map(b => <option key={b.id} value={b.id}>{b.name.toUpperCase()}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">2. Assunto Específico (Taxonomia)</label>
                                        <div className="relative group">
                                            <Network className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 transition-transform group-focus-within:scale-110" />
                                            <select
                                                value={createForm.taxonomy_path}
                                                onChange={e => setCreateForm({ ...createForm, taxonomy_path: e.target.value })}
                                                className="w-full h-16 bg-slate-50 border border-slate-200 rounded-3xl pl-16 pr-6 outline-none focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 appearance-none font-bold text-slate-900 transition-all text-sm"
                                            >
                                                <option value="">SELECIONE O CONCURSO/ÁREA</option>
                                                {taxonomyOptions.map(t => (
                                                    <option key={t.id} value={t.path}>
                                                        {t.path.toUpperCase()} {t.level !== 'subject' ? '— GERAL' : ''} ({t.count} Questões)
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">3. Protocolo de Questão (Blueprint)</label>
                                        <select
                                            value={createForm.blueprint_id}
                                            onChange={e => setCreateForm({ ...createForm, blueprint_id: e.target.value })}
                                            className="w-full h-16 bg-slate-50 border border-slate-200 rounded-3xl px-8 outline-none focus:bg-white focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 appearance-none font-bold text-slate-900 transition-all text-sm"
                                        >
                                            <option value="">MODELAGEM MANUAL / PADRÃO</option>
                                            {blueprints.map(b => <option key={b.id} value={b.id}>{b.name.toUpperCase()} — {b.format.toUpperCase()}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-8 bg-slate-50/50 p-8 rounded-[3rem] border border-slate-100">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Volume Desejado</label>
                                            <input
                                                type="number"
                                                value={isNaN(createForm.requested_count) ? '' : createForm.requested_count}
                                                onChange={e => {
                                                    const val = parseInt(e.target.value)
                                                    setCreateForm({ ...createForm, requested_count: isNaN(val) ? 0 : val })
                                                }}
                                                className="w-full h-16 bg-white border border-slate-200 rounded-3xl px-8 outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 font-black text-2xl text-slate-900 shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Escala de Dificuldade</label>
                                            <select
                                                value={createForm.difficulty}
                                                onChange={e => setCreateForm({ ...createForm, difficulty: e.target.value as any })}
                                                className="w-full h-16 bg-white border border-slate-200 rounded-3xl px-8 outline-none focus:ring-8 focus:ring-blue-600/5 focus:border-blue-600 font-black text-slate-900 shadow-sm text-sm"
                                            >
                                                <option value="facil">FÁCIL</option>
                                                <option value="media">MÉDIA</option>
                                                <option value="dificil">DIFÍCIL</option>
                                                <option value="mista">MISTURA BALANCEADA</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Título Visual do Lote (Auto-Gerado)</label>
                                        <div className="w-full h-20 bg-slate-900 border border-slate-800 rounded-3xl px-8 flex items-center shadow-xl">
                                            <p className="font-black italic uppercase text-blue-400 tracking-tighter text-lg leading-tight truncate">{createForm.title}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 flex items-center justify-between border-t border-slate-200">
                                        <button onClick={() => setIsCreateModalOpen(false)} className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-600 transition-colors">Abortar Operação</button>
                                        <button
                                            onClick={handleCreatePackage}
                                            className="flex items-center gap-4 px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all"
                                        >
                                            <Send className="w-5 h-5" />
                                            Iniciar Registro MASTER
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
