"use client"

import { supabase } from '@/lib/supabase'

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
    getConcursoBanks, getConcursoBlueprints, getConcursoCurrentProfile,
    getConcursoPackages, createConcursoPackage, updateConcursoPackage,
    deleteConcursoPackage, getConcursoPackageQuestions, importQuestionsToConcursoPackage,
    updateConcursoPackageQuestion, publishConcursoQuestion, generateConcursoPrompt,
    ConcursoBank, ConcursoQuestionBlueprint, ConcursoQuestionPackage, ConcursoPackageQuestion,
    ConcursoBankProfile
} from '@/lib/concursos/banks'
import { useConcursoTaxonomy as useTaxonomy, ConcursoTaxonomyNode } from '@/store/concursos/use-taxonomy'
import { useAuth } from '@/store/use-auth'

export default function ConcursoAdminPackagesManager() {
    const { user } = useAuth()
    const { taxonomy, loadTaxonomy } = useTaxonomy()

    // List state
    const [packages, setPackages] = useState<ConcursoQuestionPackage[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedPackage, setSelectedPackage] = useState<ConcursoQuestionPackage | null>(null)
    const [pkgQuestions, setPkgQuestions] = useState<ConcursoPackageQuestion[]>([])
    const [loadingQuestions, setLoadingQuestions] = useState(false)
    const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'approved'>('all')

    // Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [isPromptModalOpen, setIsPromptModalOpen] = useState(false)
    const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false)

    // Create Form
    const [banks, setBanks] = useState<ConcursoBank[]>([])
    const [blueprints, setBlueprints] = useState<ConcursoQuestionBlueprint[]>([])
    const [createForm, setCreateForm] = useState({
        title: '',
        bank_id: '',
        blueprint_id: '',
        taxonomy_path: '',
        difficulty: 'media' as any,
        requested_count: 10,
        notes: '',
        // Taxon IDs for cascading selection
        area_id: '',
        disciplina_id: '',
        subdisciplina_id: '',
        assunto_id: ''
    })

    // Import Form
    const [importJson, setImportJson] = useState('')
    const [isImporting, setIsImporting] = useState(false)
    const [importErrors, setImportErrors] = useState<{ index: number; message: string }[]>([])

    // Prompt Data
    const [promptData, setPromptData] = useState<string>('')
    const [isCopying, setIsCopying] = useState(false)

    // Single Question Edit
    const [editingQuestion, setEditingQuestion] = useState<ConcursoPackageQuestion | null>(null)
    const [editData, setEditData] = useState<any>(null)
    const [isSavingQuestion, setIsSavingQuestion] = useState(false)

    // Question counts per taxonomy node
    const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({})

    useEffect(() => {
        refreshPackages()
        loadTaxonomy()
        loadBanks()
        loadQuestionCounts()
    }, [])

    async function loadQuestionCounts() {
        try {
            const counts: Record<string, number> = {}
            const fields = ['area_id', 'disciplina_id', 'subdisciplina_id', 'assunto_id'] as const
            for (const field of fields) {
                const { data } = await supabase
                    .from('concurso_questao_base')
                    .select(field)
                if (data) {
                    for (const row of data) {
                        const id = (row as any)[field]
                        if (id) counts[id] = (counts[id] || 0) + 1
                    }
                }
            }
            setQuestionCounts(counts)
        } catch (err) {
            console.error('Error loading question counts:', err)
        }
    }

    async function loadBanks() {
        const { data } = await getConcursoBanks(true)
        setBanks(data)
    }

    async function refreshPackages() {
        setLoading(true)
        const { data } = await getConcursoPackages()
        setPackages(data)
        setLoading(false)
    }

    async function handleSelectPackage(pkg: ConcursoQuestionPackage) {
        setSelectedPackage(pkg)
        setLoadingQuestions(true)
        const { data } = await getConcursoPackageQuestions(pkg.id)
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
        const { data } = await getConcursoBlueprints(bankId)
        setBlueprints(data.filter(b => b.is_active))
    }

    const taxonomyOptions = useMemo(() => {
        const result: { id: string; name: string; path: string; level: string; displayName: string; count: number; depth: number }[] = []
        
        function countDescendants(node: ConcursoTaxonomyNode): number {
            let total = questionCounts[node.id] || 0
            if (node.children) {
                for (const child of node.children) {
                    total += countDescendants(child)
                }
            }
            return total
        }
        
        function flattenTree(nodes: ConcursoTaxonomyNode[], depth: number = 0) {
            for (const node of nodes) {
                const totalCount = countDescendants(node)
                const countLabel = totalCount > 0 ? ` [${totalCount}Q]` : ''
                result.push({
                    id: node.id,
                    name: node.name,
                    path: node.name,
                    level: node.level,
                    displayName: `${node.name}${countLabel}`,
                    count: totalCount,
                    depth: depth
                })
                if (node.children && node.children.length > 0) {
                    flattenTree(node.children, depth + 1)
                }
            }
        }
        
        flattenTree(taxonomy)
        return result
    }, [taxonomy, questionCounts])

    useEffect(() => {
        const bankName = banks.find(b => b.id === createForm.bank_id)?.name || 'Banca'
        const selectedTax = taxonomyOptions.find(t => t.path === createForm.taxonomy_path)
        const taxonomyLabel = selectedTax ? selectedTax.path.toUpperCase() : 'ASSUNTO'
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
        const { data, error } = await createConcursoPackage({
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
                notes: '',
                area_id: '',
                disciplina_id: '',
                subdisciplina_id: '',
                assunto_id: ''
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

        setLoading(true)
        const { data: profile } = await getConcursoCurrentProfile(selectedPackage.bank_id)
        
        // Ensure we have the blueprint with format
        let blueprint = (selectedPackage as any).blueprint || null
        
        // Fallback: If joined data is missing or missing format, fetch it explicitly
        if (!blueprint || !blueprint.format) {
            const { data: bpss } = await supabase
                .from('concurso_question_blueprints')
                .select('*')
                .eq('id', selectedPackage.blueprint_id)
                .single()
            if (bpss) blueprint = bpss
        }
        
        console.log('Generating Prompt with Blueprint:', blueprint)

        const prompt = generateConcursoPrompt({
            bank,
            profile: profile as ConcursoBankProfile,
            blueprint,
            taxonomyPath: selectedPackage.taxonomy_path || '',
            difficulty: selectedPackage.difficulty,
            count: selectedPackage.requested_count,
            packageId: selectedPackage.id
        })
        setPromptData(prompt)
        setIsPromptModalOpen(true)
        setLoading(false)
    }

    async function handleImportJson() {
        if (!selectedPackage) return
        if (!importJson.trim()) return
        setIsImporting(true)
        setImportErrors([])
        try {
            const data = JSON.parse(importJson)
            const questions = Array.isArray(data) ? data : [data]
            const result = await importQuestionsToConcursoPackage(selectedPackage.id, questions)

            if (result.errors.length > 0) {
                setImportErrors(result.errors)
                toast.error(`${result.errors.length} questões com erro`)
            }

            if (result.imported > 0) {
                toast.success(`${result.imported} questões importadas!`)
                const { data: newQuestions } = await getConcursoPackageQuestions(selectedPackage.id)
                setPkgQuestions(newQuestions)
                if (result.errors.length === 0) {
                    setImportJson('')
                    setIsImportModalOpen(false)
                }
            }
        } catch (err) {
            toast.error('JSON inválido')
        } finally {
            setIsImporting(false)
        }
    }

    async function handlePublishPackage() {
        if (!selectedPackage || pkgQuestions.length === 0) return
        
        setLoading(true)
        let successCount = 0
        let errorCount = 0

        for (const pq of pkgQuestions) {
            if (pq.status === 'approved') {
                successCount++
                continue
            }
            const res = await publishConcursoQuestion(pq.id)
            if (res.success) successCount++
            else errorCount++
        }

        // Update package status to approved if all questions are processed
        if (errorCount === 0) {
            await updateConcursoPackage(selectedPackage.id, { status: 'approved' })
        }

        if (errorCount > 0) {
            toast.error(`${errorCount} questões falharam ao publicar.`)
        } else {
            toast.success(`${successCount} questões publicadas com sucesso!`)
        }
        
        // Refresh data
        handleSelectPackage(selectedPackage)
        refreshPackages()
        setLoading(false)
    }

    async function handleArchivePackage() {
        if (!selectedPackage) return
        if (!confirm('Deseja arquivar este pacote?')) return
        setLoading(true)
        const { error } = await updateConcursoPackage(selectedPackage.id, { status: 'archived' })
        if (error) {
            toast.error('Erro ao arquivar')
        } else {
            toast.success('Pacote arquivado')
            setSelectedPackage(null)
            refreshPackages()
        }
        setLoading(false)
    }

    async function handleDeletePackage(pkgToDelete?: ConcursoQuestionPackage) {
        const target = pkgToDelete || selectedPackage
        if (!target) return
        if (!confirm(`🛑 ATENÇÃO: Deseja excluir PERMANENTEMENTE o pacote "${target.title}"? Esta ação não pode ser desfeita.`)) return

        setLoading(true)
        const { error } = await deleteConcursoPackage(target.id)
        if (error) {
            toast.error('Erro ao excluir pacote')
        } else {
            toast.success('Pacote excluído')
            if (selectedPackage?.id === target.id) setSelectedPackage(null)
            refreshPackages()
        }
        setLoading(false)
    }

    // --- Single Question Actions ---

    function handleOpenQuestionDetails(pq: ConcursoPackageQuestion) {
        setEditingQuestion(pq)
        setEditData(pq.question_json)
        setIsEditQuestionModalOpen(true)
    }

    async function handleSaveQuestionEdits() {
        if (!editingQuestion) return
        setIsSavingQuestion(true)
        const { error } = await updateConcursoPackageQuestion(editingQuestion.id, {
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
        if (!confirm('Deseja aprovar e publicar esta questão no banco de Concursos?')) return
        setIsSavingQuestion(true)
        const res = await publishConcursoQuestion(editingQuestion.id)
        if (res.success) {
            toast.success('Questão consolidada!')
            if (selectedPackage) handleSelectPackage(selectedPackage)
            setIsEditQuestionModalOpen(false)
        } else {
            toast.error('Erro ao publicar')
        }
        setIsSavingQuestion(false)
    }

    const filteredPackages = useMemo(() => {
        if (activeTab === 'all') return packages
        return packages.filter(p => p.status === activeTab)
    }, [packages, activeTab])

    // --- Renders ---

    if (selectedPackage) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-slate-100 p-8 rounded-[40px] shadow-2xl shadow-indigo-500/5">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSelectedPackage(null)} className="p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200">
                            <ArrowLeft className="w-6 h-6 text-slate-900" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">{selectedPackage.title}</h1>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                    selectedPackage.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
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
                            className="flex items-center gap-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:scale-105 transition-all"
                        >
                            <Copy className="w-4 h-4" />
                            Copiar Prompt
                        </button>
                        <button
                            onClick={() => setIsImportModalOpen(true)}
                            className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:border-indigo-500 hover:text-indigo-600 shadow-sm"
                        >
                            <Upload className="w-4 h-4" />
                            Importar JSON
                        </button>
                        <button
                            disabled={loading || pkgQuestions.length === 0 || selectedPackage.status === 'approved'}
                            onClick={handlePublishPackage}
                            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/10 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Send className="w-4 h-4" />
                            Publicar Pacote
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                    {loadingQuestions ? (
                        Array(4).fill(0).map((_, i) => (
                            <div key={i} className="h-44 bg-slate-50 border border-slate-100 rounded-[40px] animate-pulse" />
                        ))
                    ) : pkgQuestions.length === 0 ? (
                        <div className="lg:col-span-2 p-24 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px]">
                            <FileJson className="w-10 h-10 opacity-30 text-slate-400" />
                            <h3 className="text-slate-400 font-black uppercase text-sm tracking-widest">Aguardando Carga Antigravity</h3>
                            <button onClick={() => setIsImportModalOpen(true)} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-600/20">Injetar JSON Agora</button>
                        </div>
                    ) : (
                        pkgQuestions.map((pq, idx) => {
                            const q = pq.question_json as any
                            return (
                                <motion.div
                                    key={pq.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white border border-slate-100 p-8 rounded-[3rem] space-y-5 group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Status: <span className="text-indigo-600">{pq.status.toUpperCase()}</span></p>
                                                <h4 className="text-sm font-black text-slate-900 uppercase italic tracking-tight line-clamp-1">{q.enunciado?.substring(0, 50)}...</h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl text-xs text-slate-600 leading-relaxed italic truncate">
                                        &quot;{q.enunciado}&quot;
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex gap-4">
                                            <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase">Gabarito: {q.answer?.toUpperCase()}</div>
                                            <div className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[9px] font-black uppercase">{q.difficulty?.toUpperCase()}</div>
                                        </div>
                                        <button
                                            onClick={() => handleOpenQuestionDetails(pq)}
                                            className="px-6 py-2 bg-slate-50 hover:bg-indigo-600 text-slate-900 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-slate-100"
                                        >
                                            Inspecionar
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        })
                    )}
                </div>

                {/* --- Modals for Detail View --- */}
                <AnimatePresence>
                    {isImportModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-4xl rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl">
                                <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Injetar Matriz Concursos</h2>
                                    <button onClick={() => setIsImportModalOpen(false)}><X className="w-8 h-8 text-slate-400" /></button>
                                </div>
                                <div className="p-10 space-y-8">
                                    <textarea
                                        value={importJson}
                                        onChange={e => setImportJson(e.target.value)}
                                        placeholder='[ { "enunciado": "...", "options": {...}, "answer": "a", "rationale": "..." } ]'
                                        className="w-full h-[300px] bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-mono text-xs outline-none focus:bg-white transition-all resize-none shadow-inner"
                                    />
                                    {importErrors.length > 0 && (
                                        <div className="bg-rose-50 p-4 rounded-2xl text-rose-600 text-[10px] font-bold">
                                            {importErrors.length} questões com erro de integridade detectadas.
                                        </div>
                                    )}
                                    <button
                                        disabled={isImporting || !importJson}
                                        onClick={handleImportJson}
                                        className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl shadow-indigo-600/20 active:scale-95 transition-all"
                                    >
                                        Processar Matriz de Dados
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isPromptModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-2xl rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl">
                                <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter">Protocolo Antigravity</h2>
                                    <button onClick={() => setIsPromptModalOpen(false)}><X className="w-6 h-6 opacity-40 hover:opacity-100" /></button>
                                </div>
                                <div className="p-10 space-y-6">
                                    <div className="bg-slate-50 p-8 h-96 overflow-y-auto whitespace-pre-wrap text-[10px] font-bold text-slate-600 italic leading-relaxed border border-slate-100 rounded-3xl">
                                        {promptData}
                                    </div>
                                    <button
                                        onClick={async () => {
                                            if (!promptData || isCopying) return;
                                            
                                            const copyToClipboard = async (text: string) => {
                                                try {
                                                    if (navigator.clipboard && window.isSecureContext) {
                                                        await navigator.clipboard.writeText(text);
                                                        return true;
                                                    }
                                                } catch (err) {
                                                    console.error('Clipboard API failed', err);
                                                }
                                                
                                                // Fallback to execCommand
                                                try {
                                                    const textArea = document.createElement("textarea");
                                                    textArea.value = text;
                                                    textArea.style.position = "fixed";
                                                    textArea.style.left = "-9999px";
                                                    textArea.style.top = "0";
                                                    textArea.style.opacity = "0";
                                                    document.body.appendChild(textArea);
                                                    textArea.focus();
                                                    textArea.select();
                                                    const successful = document.execCommand('copy');
                                                    document.body.removeChild(textArea);
                                                    return successful;
                                                } catch (err) {
                                                    console.error('execCommand fallback failed', err);
                                                    return false;
                                                }
                                            };

                                            const success = await copyToClipboard(promptData);
                                            if (success) {
                                                setIsCopying(true);
                                                toast.success('Protocolo copiado!');
                                                setTimeout(() => setIsCopying(false), 2000);
                                            } else {
                                                toast.error('Erro ao copiar. Tente selecionar e copiar manualmente.');
                                            }
                                        }}
                                        className={`w-full py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 ${
                                            isCopying ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        }`}
                                    >
                                        {isCopying ? (
                                            <>
                                                <CheckCircle2 className="w-5 h-5" />
                                                Copiado com Sucesso!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5" />
                                                Copiar Protocolo de Geração
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isEditQuestionModalOpen && editData && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-5xl h-[90vh] rounded-[3rem] flex flex-col shadow-2xl overflow-hidden">
                                <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">Editor Master Concursos</h2>
                                    <div className="flex gap-4">
                                        <button
                                            disabled={isSavingQuestion || editingQuestion?.status === 'approved'}
                                            onClick={handleApproveSingleQuestion}
                                            className="px-8 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl"
                                        >
                                            Publicar Agora
                                        </button>
                                        <button onClick={() => setIsEditQuestionModalOpen(false)} className="p-3 bg-white border border-slate-100 rounded-xl"><X className="w-6 h-6 text-slate-400" /></button>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-12 space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Enunciado</label>
                                        <textarea
                                            value={editData.enunciado}
                                            onChange={e => setEditData({ ...editData, enunciado: e.target.value })}
                                            className="w-full h-40 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-bold outline-none focus:bg-white transition-all text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {['a', 'b', 'c', 'd', 'e'].map(letter => (
                                            <div key={letter} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black uppercase text-slate-400">Opção {letter.toUpperCase()}</span>
                                                    <input
                                                        type="radio"
                                                        checked={editData.answer === letter}
                                                        onChange={() => setEditData({ ...editData, answer: letter })}
                                                    />
                                                </div>
                                                <textarea
                                                    value={editData.options?.[letter]}
                                                    onChange={e => setEditData({ ...editData, options: { ...editData.options, [letter]: e.target.value } })}
                                                    className="w-full h-16 bg-white border border-slate-200 rounded-xl p-4 text-xs font-bold outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Justificativa (App)</label>
                                        <textarea
                                            value={editData.rationale}
                                            onChange={e => setEditData({ ...editData, rationale: e.target.value })}
                                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 font-bold outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="p-10 border-t border-slate-100 flex justify-end gap-4">
                                    <button onClick={() => setIsEditQuestionModalOpen(false)} className="text-xs font-black uppercase text-slate-400">Fechar</button>
                                    <button onClick={handleSaveQuestionEdits} disabled={isSavingQuestion} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest">Salvar Rascunho</button>
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
            {/* --- HUD HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-1 text-slate-900">
                        Cargas <span className="text-indigo-600">& Deploy</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest opacity-60 ml-0.5">Centro de Orquestração Protocolo Concursos</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setActiveTab('draft')}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'draft' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Drafts
                        </button>
                        <button
                            onClick={() => setActiveTab('approved')}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'approved' ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Aprovados
                        </button>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10 hover:scale-105 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Gerar Lote Master
                    </button>
                </div>
            </div>

            {/* --- TAXONOMY COVERAGE PANEL --- */}
            <TaxonomyCoveragePanel taxonomy={taxonomy} questionCounts={questionCounts} />

            {/* --- LIST TABLE --- */}
            <section className="bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-2xl shadow-indigo-500/5">
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
                                    <td colSpan={6} className="px-10 py-10"><div className="h-8 bg-slate-100 rounded-2xl w-full" /></td>
                                </tr>
                            ))
                        ) : filteredPackages.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-10 py-24 text-center">
                                    <div className="flex flex-col items-center opacity-20">
                                        <Package className="w-16 h-16 mb-4 grayscale text-slate-400" />
                                        <p className="font-black uppercase text-xs tracking-widest text-slate-400">Nenhum pacote pendente</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filteredPackages.map((pkg) => (
                                <tr
                                    key={pkg.id}
                                    onClick={() => handleSelectPackage(pkg)}
                                    className="group hover:bg-slate-50/50 cursor-pointer transition-all"
                                >
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                <FileJson className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-black text-sm uppercase italic tracking-tighter text-slate-900">{pkg.title}</p>
                                                <p className="text-[10px] font-bold text-slate-400 truncate max-w-[200px] uppercase tracking-widest mt-0.5">{pkg.taxonomy_path}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase text-slate-900">{(pkg as any).banks?.name || 'PADRÃO'}</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                                                {Array.isArray((pkg as any).blueprint) 
                                                    ? (pkg as any).blueprint[0]?.name 
                                                    : (pkg as any).blueprint?.name || 'MANUAL'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-center text-sm font-black italic text-slate-900">
                                        {pkg.requested_count}Q
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                            pkg.status === 'approved' ? 'bg-emerald-50 text-emerald-600' :
                                            pkg.status === 'draft' ? 'bg-amber-50 text-amber-600' :
                                            'bg-slate-50 text-slate-400'
                                        }`}>
                                            {pkg.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right font-mono text-[10px] text-slate-400">
                                        {new Date(pkg.created_at || '').toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-10 py-8 text-right" onClick={e => e.stopPropagation()}>
                                        <button onClick={() => handleDeletePackage(pkg)} className="w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>

            {/* --- CREATE MODAL --- */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/60">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-full max-w-4xl rounded-[3rem] border border-slate-200 shadow-2xl relative">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600" />
                            <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div>
                                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Novo Deploy Master</h2>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-2">Configuração de Lote Para Geração I.A.</p>
                                </div>
                                <button onClick={() => setIsCreateModalOpen(false)} className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center transition-all shadow-sm hover:rotate-90">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-12 pb-96 grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-y-auto max-h-[70vh]">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">1. Banca</label>
                                        <select
                                            value={createForm.bank_id}
                                            onChange={e => setCreateForm({ ...createForm, bank_id: e.target.value })}
                                            className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 outline-none font-bold text-slate-900"
                                        >
                                            <option value="">Selecione a Banca</option>
                                            {banks.map(b => <option key={b.id} value={b.id}>{b.name.toUpperCase()}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">2. Taxonomia Estruturada</label>
                                        <CascadingTaxonomySelector 
                                            taxonomy={taxonomy}
                                            form={createForm}
                                            setForm={(updates) => setCreateForm(prev => ({ ...prev, ...updates }))}
                                            questionCounts={questionCounts}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">3. Blueprint (Opcional)</label>
                                        <select
                                            value={createForm.blueprint_id}
                                            onChange={e => setCreateForm({ ...createForm, blueprint_id: e.target.value })}
                                            className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 outline-none font-bold text-slate-900"
                                        >
                                            <option value="">Padrão do Sistema</option>
                                            {blueprints.map(b => <option key={b.id} value={b.id}>{b.name.toUpperCase()}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-6 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Qtd</label>
                                            <input
                                                type="number"
                                                value={createForm.requested_count}
                                                onChange={e => setCreateForm({ ...createForm, requested_count: parseInt(e.target.value) })}
                                                className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 font-black"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Dificuldade</label>
                                            <select
                                                value={createForm.difficulty}
                                                onChange={e => setCreateForm({ ...createForm, difficulty: e.target.value as any })}
                                                className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 font-bold"
                                            >
                                                <option value="facil">Fácil</option>
                                                <option value="media">Média</option>
                                                <option value="dificil">Difícil</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Título Visual</label>
                                        <div className="p-4 bg-slate-900 text-indigo-400 font-black uppercase italic text-xs rounded-xl truncate">{createForm.title}</div>
                                    </div>
                                    <button
                                        onClick={handleCreatePackage}
                                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-indigo-600/20 active:scale-95 transition-all mt-4"
                                    >
                                        Iniciar Registro Master
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

// --- Taxonomy Coverage Panel ---
function TaxonomyCoveragePanel({ taxonomy, questionCounts }: { taxonomy: ConcursoTaxonomyNode[]; questionCounts: Record<string, number> }) {
    const [isOpen, setIsOpen] = useState(false)
    const [expandedAreas, setExpandedAreas] = useState<Set<string>>(new Set())

    function countNode(node: ConcursoTaxonomyNode): number {
        let total = questionCounts[node.id] || 0
        if (node.children) {
            for (const child of node.children) {
                total += countNode(child)
            }
        }
        return total
    }

    const totalQuestions = taxonomy.reduce((sum, area) => sum + countNode(area), 0)

    function toggleArea(id: string) {
        setExpandedAreas(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    return (
        <section className="bg-white border border-slate-100 rounded-[40px] shadow-xl shadow-indigo-500/5 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-10 py-6 bg-slate-50/80 hover:bg-slate-50 transition-all"
            >
                <div className="flex items-center gap-4">
                    <Network className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-black uppercase tracking-tight text-slate-900">Cobertura Taxonômica</span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase">
                        {totalQuestions} questões no banco
                    </span>
                </div>
                <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>

            {isOpen && (
                <div className="p-8 space-y-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {taxonomy.map(area => {
                            const areaCount = countNode(area)
                            const isExpanded = expandedAreas.has(area.id)

                            return (
                                <div key={area.id} className="border border-slate-100 rounded-3xl overflow-hidden">
                                    <button
                                        onClick={() => toggleArea(area.id)}
                                        className={`w-full flex items-center justify-between px-6 py-4 transition-all ${
                                            areaCount > 0 ? 'bg-emerald-50/50 hover:bg-emerald-50' : 'bg-rose-50/50 hover:bg-rose-50'
                                        }`}
                                    >
                                        <span className="text-[11px] font-black uppercase tracking-tight text-slate-900 text-left truncate flex-1">
                                            {area.name}
                                        </span>
                                        <span className={`ml-2 px-3 py-1 rounded-lg text-[10px] font-black shrink-0 ${
                                            areaCount > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'
                                        }`}>
                                            {areaCount}Q
                                        </span>
                                    </button>

                                    {isExpanded && area.children && (
                                        <div className="px-4 py-3 space-y-1 bg-white max-h-[400px] overflow-y-auto">
                                            {area.children.map(disc => {
                                                const discCount = countNode(disc)
                                                return (
                                                    <div key={disc.id}>
                                                        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-slate-50">
                                                            <span className="text-[10px] font-bold text-slate-700 truncate">
                                                                📘 {disc.name}
                                                            </span>
                                                            <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                                                                discCount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                                                            }`}>
                                                                {discCount}
                                                            </span>
                                                        </div>
                                                        {disc.children && disc.children.map(sub => {
                                                            const subCount = countNode(sub)
                                                            return (
                                                                <div key={sub.id}>
                                                                    <div className="flex items-center justify-between px-3 py-1 ml-4 rounded hover:bg-slate-50/50">
                                                                        <span className="text-[9px] font-bold text-slate-500 truncate">
                                                                            └ {sub.name}
                                                                        </span>
                                                                        <span className={`text-[8px] font-black px-2 py-0.5 rounded ${
                                                                            subCount > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-400'
                                                                        }`}>
                                                                            {subCount}
                                                                        </span>
                                                                    </div>
                                                                    {sub.children && sub.children.map(assunto => {
                                                                        const assuntoCount = questionCounts[assunto.id] || 0
                                                                        return (
                                                                            <div key={assunto.id} className="flex items-center justify-between px-3 py-0.5 ml-8 rounded hover:bg-slate-50/30">
                                                                                <span className={`text-[8px] truncate ${
                                                                                    assuntoCount > 0 ? 'font-bold text-slate-500' : 'font-medium text-rose-400'
                                                                                }`}>
                                                                                    • {assunto.name}
                                                                                </span>
                                                                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                                                                                    assuntoCount > 0 ? 'bg-emerald-50 text-emerald-600' : 'text-rose-300'
                                                                                }`}>
                                                                                    {assuntoCount}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </section>
    )
}

// --- Cascading Taxonomy Selector ---
function CascadingTaxonomySelector({ 
    taxonomy, 
    form, 
    setForm,
    questionCounts 
}: { 
    taxonomy: ConcursoTaxonomyNode[], 
    form: any, 
    setForm: (updates: any) => void,
    questionCounts: Record<string, number> 
}) {
    // Area -> Disciplina -> Subdisciplina -> Assunto
    const areas = useMemo(() => taxonomy, [taxonomy])
    
    const disciplinas = useMemo(() => {
        const area = areas.find(a => a.id === form.area_id)
        return area?.children || []
    }, [areas, form.area_id])

    const subdisciplinas = useMemo(() => {
        const disc = disciplinas.find(d => d.id === form.disciplina_id)
        return disc?.children || []
    }, [disciplinas, form.disciplina_id])

    const assuntos = useMemo(() => {
        const sub = subdisciplinas.find(s => s.id === form.subdisciplina_id)
        return sub?.children || []
    }, [subdisciplinas, form.subdisciplina_id])

    function countNode(node: ConcursoTaxonomyNode): number {
        let total = questionCounts[node.id] || 0
        if (node.children) {
            for (const child of node.children) {
                total += countNode(child)
            }
        }
        return total
    }

    return (
        <div className="space-y-3">
            {/* Level 1: AREA */}
            <LevelSelect 
                label="Área"
                items={areas.map(a => ({ id: a.id, name: a.name, count: countNode(a) }))}
                value={form.area_id}
                onSelect={(node) => setForm({ 
                    area_id: node.id, 
                    disciplina_id: '', 
                    subdisciplina_id: '', 
                    assunto_id: '',
                    taxonomy_path: node.name
                })}
            />

            {/* Level 2: DISCIPLINA */}
            {disciplinas.length > 0 && (
                <LevelSelect 
                    label="Disciplina"
                    items={disciplinas.map(d => ({ id: d.id, name: d.name, count: countNode(d) }))}
                    value={form.disciplina_id}
                    onSelect={(node) => setForm({ 
                        disciplina_id: node.id, 
                        subdisciplina_id: '', 
                        assunto_id: '',
                        taxonomy_path: node.name
                    })}
                />
            )}

            {/* Level 3: SUBDISCIPLINA / ASSUNTO MAIOR */}
            {subdisciplinas.length > 0 && (
                <LevelSelect 
                    label="Subdiretório"
                    items={subdisciplinas.map(s => ({ id: s.id, name: s.name, count: countNode(s) }))}
                    value={form.subdisciplina_id}
                    onSelect={(node) => setForm({ 
                        subdisciplina_id: node.id, 
                        assunto_id: '',
                        taxonomy_path: node.name
                    })}
                />
            )}

            {/* Level 4: ASSUNTO ESPECÍFICO */}
            {assuntos.length > 0 && (
                <LevelSelect 
                    label="Assunto Específico"
                    items={assuntos.map(a => ({ id: a.id, name: a.name, count: questionCounts[a.id] || 0 }))}
                    value={form.assunto_id}
                    onSelect={(node) => setForm({ 
                        assunto_id: node.id,
                        taxonomy_path: node.name
                    })}
                />
            )}
        </div>
    )
}

function LevelSelect({ label, items, value, onSelect }: { label: string, items: any[], value: string, onSelect: (node: any) => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    
    const selected = items.find(i => i.id === value)
    const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="relative z-[140]">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border transition-all ${
                    value ? 'bg-white border-indigo-100 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
            >
                <div className="flex flex-col items-start min-w-0">
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{label}</span>
                    <span className="text-[11px] font-bold text-slate-900 truncate">
                        {selected ? selected.name.toUpperCase() : `Selecione ${label}...`}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {selected?.count > 0 && (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[8px] font-black">
                            {selected.count}Q
                        </span>
                    )}
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-[120]" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="absolute mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl z-[130] overflow-hidden flex flex-col max-h-[250px]"
                        >
                            {items.length > 5 && (
                                <div className="p-3 bg-slate-50 border-b border-slate-100">
                                    <input 
                                        autoFocus
                                        placeholder="Buscar..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="w-full h-8 px-3 rounded-lg border border-slate-200 text-[10px] font-bold outline-none focus:border-indigo-400"
                                    />
                                </div>
                            )}
                            <div className="overflow-y-auto p-1.5 space-y-0.5">
                                {filtered.map(i => (
                                    <button
                                        key={i.id}
                                        onClick={() => {
                                            onSelect(i)
                                            setIsOpen(false)
                                            setSearch('')
                                        }}
                                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all hover:bg-indigo-50 ${
                                            value === i.id ? 'bg-indigo-50/50 text-indigo-600 font-black' : 'text-slate-600'
                                        }`}
                                    >
                                        <span className="text-[10px] uppercase font-bold text-left">{i.name}</span>
                                        {i.count > 0 && <span className="text-[8px] font-black opacity-40">{i.count}Q</span>}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

function TaxonomySearchableSelect({ 
    options, 
    value, 
    onSelect 
}: { 
    options: any[], 
    value: string, 
    onSelect: (val: string) => void 
}) {
    // Keep this for backward compat or other places if needed, but we used Cascading above
    return null; 
}
