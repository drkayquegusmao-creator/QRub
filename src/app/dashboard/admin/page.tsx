"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Users, 
    Brain, 
    Database, 
    TrendingUp, 
    Activity, 
    ShieldAlert, 
    Search,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    LayoutDashboard,
    Layers,
    Server,
    Download,
    Mail,
    Settings,
    ShieldCheck,
    Stethoscope,
    Sparkles,
    FileText,
    History,
    ArrowLeftRight,
    CheckCircle2,
    Clock4,
    BookOpen,
    Trash2,
    MoreHorizontal
} from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

import { ConcursoCard } from "@/components/concursos/concurso-card"
import { cn } from "@/lib/utils"
import { useAuth } from "@/store/use-auth"
import { useQuestions } from "@/store/use-questions"
import { useUserDb } from "@/store/use-user-db"
import { useTaxonomy } from "@/store/use-taxonomy"
import { useModeration } from "@/store/use-moderation"
import { useQuiz } from "@/store/use-quiz"
import { useSupport } from "@/store/use-support"
import { generateStructuralQuestion } from "@/lib/generators/structural-engine"

// Helper for Brazil Timezone
const formatBRT = (dateString?: string) => {
    if (!dateString) return "N/A"
    try {
        return new Date(dateString).toLocaleString('pt-BR', { 
            timeZone: 'America/Sao_Paulo',
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    } catch (e) {
        return "Erro Data"
    }
}

export default function SaudeAdminDashboard() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    
    // Tab State
    const [tab, setTab] = useState<'overview' | 'users' | 'content' | 'moderation' | 'generator' | 'prompts' | 'validation' | 'taxonomy' | 'settings'>('overview')
    
    // Data Stores
    const { 
        questions, 
        totalCount, 
        loadQuestions, 
        deleteQuestion, 
        addQuestion, 
        addQuestions, 
        loading: questionsLoading 
    } = useQuestions()
    
    const { users, loadUsers, updateUserPlan, deleteUser } = useUserDb()
    const { taxonomy, loadTaxonomy } = useTaxonomy()
    const { reports, loadReports, updateReportStatus } = useModeration()
    const { load_all_responses: loadAllResponses } = useQuiz()
    const { fetchTickets } = useSupport()

    // Prompt States
    const [banks, setBanks] = useState<any[]>([])
    const [blueprints, setBlueprints] = useState<any[]>([])
    const [selectedBank, setSelectedBank] = useState('')
    const [selectedBlueprint, setSelectedBlueprint] = useState('')
    const [selectedProfile, setSelectedProfile] = useState('')
    const [profiles, setProfiles] = useState<any[]>([])
    const [generatedPrompt, setGeneratedPrompt] = useState('')
    const [pendingQuestions, setPendingQuestions] = useState<any[]>([])

    // UI States
    const [searchTerm, setSearchTerm] = useState('')
    const [loadingManual, setLoadingManual] = useState(false)
    const [structuralArea, setStructuralArea] = useState('')
    const [structuralSubarea, setStructuralSubarea] = useState('')
    const [structuralTema, setStructuralTema] = useState('')
    const [generationQuantity, setGenerationQuantity] = useState(1)

    // INITIAL LOAD
    useEffect(() => {
        if (isAuthenticated && user?.role !== 'MASTER') {
            router.push('/dashboard')
            return
        }
        
        loadUsers()
        loadQuestions({ page: 1, pageSize: 100 })
        loadTaxonomy()
        loadReports()
        loadAllResponses()
        fetchTickets()
        
        // Load Banks & Blueprints
        const fetchPromptData = async () => {
             const { data: bks } = await import('@/lib/banks').then(m => m.getBanks(true))
             setBanks(bks || [])
             
             // Load Pending Questions
             loadQuestions({ status_validacao: 'PENDENTE', page: 1, pageSize: 50 })
        }
        fetchPromptData()
    }, [isAuthenticated, user, router])

    useEffect(() => {
        if (selectedBank) {
            import('@/lib/banks').then(async m => {
                const { data } = await m.getBankWithProfiles(selectedBank)
                if (data?.question_blueprints) setBlueprints(data.question_blueprints)
                if (data?.bank_profiles) {
                    setProfiles(data.bank_profiles)
                    const current = data.bank_profiles.find((p: any) => p.is_current)
                    if (current) setSelectedProfile(current.id)
                }
            })
        }
    }, [selectedBank])

    // TAXONOMY DERIVATION
    const dynamicHierarchy = useMemo(() => {
        if (taxonomy && taxonomy.length > 0) {
            const course = taxonomy.find(t => t.level === 'course' || t.slug === 'medicina')
            if (course && course.children) {
                return course.children.map(s => ({
                    id: s.slug,
                    uuid: s.id,
                    name: s.name,
                    subspecialties: (s.children || []).map(ss => ({
                        id: ss.slug,
                        uuid: ss.id,
                        name: ss.name,
                        subjects: (ss.children || []).map(subj => ({
                            id: subj.slug,
                            uuid: subj.id,
                            name: subj.name
                        }))
                    }))
                }))
            }
        }
        return []
    }, [taxonomy])

    const handlePromptBuild = async () => {
        const m = await import('@/lib/banks')
        const bank = banks.find(b => b.id === selectedBank)
        const blueprint = blueprints.find(b => b.id === selectedBlueprint)
        
        const areaObj = dynamicHierarchy.find((s: any) => s.id === structuralArea)
        const subareaObj = areaObj?.subspecialties.find(s => s.id === (structuralSubarea || ''))
        const temaObj = subareaObj?.subjects?.find((t: any) => t.id === (structuralTema || ''))
        
        const path = [areaObj?.name, subareaObj?.name, temaObj?.name].filter(Boolean).join(' > ')

        const prompt = m.generatePrompt({
            bank: bank || { name: 'Padrão' },
            profile: profiles.find(p => p.id === selectedProfile) || null,
            blueprint: blueprint || null,
            taxonomyPath: path || 'Definido pelo contexto',
            difficulty: 'mista',
            count: generationQuantity,
            packageId: 'ADMIN-DIRECT-INJECT'
        } as any)
        
        setGeneratedPrompt(prompt)
        toast.success("Prompt gerado e pronto para cópia!")
    }

    const handleQuestionApprove = async (qId: string) => {
        const { supabase } = await import('@/lib/supabase')
        const { error } = await supabase.from('questao_base').update({ status_validacao: 'APROVADA' }).eq('id', qId)
        if (!error) {
            toast.success("Questão oficializada no banco!")
            loadQuestions({ status_validacao: 'PENDENTE' })
        }
    }

    const handleQuestionReject = async (qId: string) => {
        const { supabase } = await import('@/lib/supabase')
        const { error } = await supabase.from('questao_base').update({ status_validacao: 'REPROVADA' }).eq('id', qId)
        if (!error) {
            toast.error("Questão removida da fila.")
            loadQuestions({ status_validacao: 'PENDENTE' })
        }
    }

    const activeUsersToday = useMemo(() => {
        const today = new Date().toISOString().split('T')[0]
        return users.filter(u => u.created_at?.startsWith(today)).length
    }, [users])

    // CORE ACTIONS
    const handleStructuralGenerate = async () => {
        if (!structuralArea) {
            toast.error('Selecione ao menos a Especialidade Alvo.')
            return
        }

        const areaObj = dynamicHierarchy.find((s: any) => s.id === structuralArea)
        if (!areaObj) return

        let subareaObj = areaObj.subspecialties.find(sub => sub.id === (structuralSubarea || ''))
        if (!subareaObj && (areaObj.subspecialties?.length || 0) > 0) {
            subareaObj = areaObj.subspecialties[0]
        }
        
        let temaObj = subareaObj?.subjects?.find(t => t.id === (structuralTema || ''))
        if (!temaObj && (subareaObj?.subjects?.length || 0) > 0) {
            temaObj = subareaObj?.subjects?.[0]
        }

        // Default if hierarchy is incomplete
        const finalArea = { id: areaObj.id, nome: areaObj.name }
        const finalSub = { id: subareaObj?.id || 'geral', nome: subareaObj?.name || 'Geral' }
        const finalTema = { id: temaObj?.id || 'geral', nome: temaObj?.name || 'Geral' }

        setLoadingManual(true)
        try {
            for(let i=0; i<generationQuantity; i++) {
                const newQ = generateStructuralQuestion(finalArea, finalSub, finalTema)
                await addQuestion(newQ)
            }
            toast.success(`✅ ${generationQuantity} questões geradas em ${finalArea.nome}`)
            loadQuestions()
        } catch (e) {
            toast.error("Erro na geração estrutural")
        } finally {
            setLoadingManual(false)
        }
    }

    const handleReportResolve = async (id: string, action: 'resolved' | 'dismissed') => {
        const res = await updateReportStatus(id, action)
        if (res.success) {
            toast.success(`Regulação ${action === 'resolved' ? 'concluída' : 'arquivada'}`)
            loadReports()
        }
    }

    // RENDERERS
    const renderOverview = () => (
        <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <PremiumMetricCard label="Alunos QRub" value={users.length} icon={Users} color="indigo" trend="+12%" />
                <PremiumMetricCard label="Acessos Hoje (BRT)" value={activeUsersToday} icon={Activity} color="emerald" trend="Pico: 85" />
                <PremiumMetricCard label="Solicitações Regulação" value={reports.filter(r => r.status === 'pending').length} icon={ShieldAlert} color="rose" trend="Crítico" />
                <PremiumMetricCard label="Questões Ativas" value={totalCount} icon={Database} color="amber" trend="+88" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <ConcursoCard className="lg:col-span-8 p-12 border-none soft-shadow bg-white dark:bg-white/5">
                    <div className="flex items-center justify-between mb-12">
                         <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-4 dark:text-white">
                            <TrendingUp className="w-8 h-8 text-emerald-500" /> Atividade Clínica (24h)
                        </h3>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-4">
                        {[40, 60, 45, 90, 65, 30, 80, 50, 70, 40, 85, 60].map((v, i) => (
                            <div key={i} className="flex-1 bg-emerald-500/20 rounded-t-xl relative group hover:bg-emerald-500 transition-all cursor-crosshair">
                                <motion.div initial={{ height: 0 }} animate={{ height: `${v}%` }} className="w-full bg-emerald-500 rounded-t-xl opacity-80" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-[#1A1033] text-white text-[8px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {v} ACESSOS
                                </div>
                            </div>
                        ))}
                    </div>
                </ConcursoCard>
                <ConcursoCard className="lg:col-span-4 p-12 bg-indigo-600 dark:bg-indigo-900 text-white flex flex-col justify-between">
                     <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-4">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" /> Autoridade Master
                    </h3>
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-white/10 border border-white/10">
                            <p className="text-[10px] font-black uppercase text-indigo-200">Database Saúde</p>
                            <p className="text-2xl font-black">{totalCount} Questões</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/10 border border-white/10">
                            <p className="text-[10px] font-black uppercase text-indigo-200">Uptime Sistema</p>
                            <p className="text-2xl font-black">99.8%</p>
                        </div>
                    </div>
                </ConcursoCard>
            </div>
        </motion.div>
    )

    const renderModeration = () => (
        <motion.div key="mod" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-white/5 rounded-[32px] overflow-hidden soft-shadow">
            <div className="p-10 border-b border-slate-100 dark:border-white/5 bg-rose-500/5">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-rose-500 flex items-center gap-4">
                    <ShieldAlert className="w-8 h-8" /> Regulação Médica & Denúncias (Contestações)
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-white/5">
                        <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <th className="px-10 py-6">Questão / Data BRT</th>
                            <th className="px-10 py-6">Motivo da Contestação</th>
                            <th className="px-10 py-6">Status</th>
                            <th className="px-10 py-6 text-right">Ação Master</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                        {reports.filter(r => r.status === 'pending').map(r => (
                            <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                                <td className="px-10 py-6">
                                    <div className="font-black text-xs dark:text-white uppercase">{r.question_id.substring(0,8)}</div>
                                    <div className="text-[9px] text-slate-400 mt-1">{formatBRT(r.created_at)}</div>
                                </td>
                                <td className="px-10 py-6 max-w-sm">
                                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight">{r.description}</p>
                                </td>
                                <td className="px-10 py-6">
                                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[9px] font-black uppercase rounded-lg">{r.type}</span>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleReportResolve(r.id, 'resolved')} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-emerald-600/20">Aprovar</button>
                                        <button onClick={() => handleReportResolve(r.id, 'dismissed')} className="px-4 py-2 bg-slate-200 dark:bg-white/10 text-slate-400 rounded-xl text-[10px] font-black uppercase">Arquivar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )

    const renderGenerator = () => (
        <motion.div key="gen" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
             <div className="bg-white dark:bg-[#1e1a2d] border border-slate-100 dark:border-white/5 rounded-[48px] p-10 md:p-14 soft-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                    <Sparkles className="w-96 h-96 text-indigo-500" />
                </div>
                <div className="max-w-4xl space-y-10 relative z-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Zap className="w-4 h-4 fill-emerald-500" /> Bio Intelligence Engine
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
                            Gerador <span className="text-indigo-600">Structural</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
                            Criação instantânea de questões baseadas em temas cadastrados. 
                            <button onClick={() => setTab('prompts')} className="ml-2 text-indigo-500 underline font-black uppercase text-xs">Ou use o Gerador de Prompt →</button>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Área (Especialidade)</label>
                            <select value={structuralArea} onChange={(e) => setStructuralArea(e.target.value)} className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl px-6 font-black uppercase tracking-tighter outline-none focus:border-indigo-500 transition-all appearance-none">
                                <option value="">Selecionar Área</option>
                                {dynamicHierarchy.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Sub-especialidade</label>
                            <select value={structuralSubarea} onChange={(e) => setStructuralSubarea(e.target.value)} className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl px-6 font-black uppercase tracking-tighter outline-none focus:border-indigo-500 transition-all appearance-none">
                                <option value="">Auto-Detectar</option>
                                {dynamicHierarchy.find(h => h.id === structuralArea)?.subspecialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Quantidade (Batch)</label>
                            <input type="number" value={generationQuantity} onChange={(e) => setGenerationQuantity(Number(e.target.value))} className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl px-6 font-black uppercase tracking-tighter outline-none focus:border-indigo-500 transition-all" />
                        </div>
                    </div>

                    <button 
                        disabled={loadingManual || !structuralArea}
                        onClick={handleStructuralGenerate}
                        className={cn(
                            "w-full h-24 rounded-[32px] font-black uppercase text-lg tracking-widest shadow-2xl transition-all flex items-center justify-center gap-4",
                            loadingManual ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:scale-[1.02] hover:shadow-indigo-500/20 active:scale-95"
                        )}
                    >
                        {loadingManual ? <Activity className="w-8 h-8 animate-spin" /> : <Zap className="w-8 h-8 fill-emerald-500 text-emerald-500" />} 
                        {loadingManual ? 'PROCESSANDO LOTE...' : 'DISPARAR IMPORTAÇÃO'}
                    </button>
                </div>
             </div>
        </motion.div>
    )

    const renderPromptGenerator = () => (
        <motion.div key="prompts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
            <div className="bg-white dark:bg-white/5 rounded-[48px] p-12 soft-shadow border border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-4 mb-10">
                    <FileText className="w-10 h-10 text-indigo-500" />
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter dark:text-white">Gerador de Prompt Especializado</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Instituição / Banca</label>
                        <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="w-full h-14 bg-slate-100 dark:bg-white/5 rounded-xl px-4 font-black uppercase text-[10px] outline-none border border-transparent focus:border-indigo-500 text-[#1A1033] dark:text-white">
                            <option value="">Selecionar Banca</option>
                            {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Perfil DNA (Versão)</label>
                        <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)} className="w-full h-14 bg-slate-100 dark:bg-white/5 rounded-xl px-4 font-black uppercase text-[10px] outline-none border border-transparent focus:border-indigo-500 text-[#1A1033] dark:text-white">
                            <option value="">Padrão (Sem DNA)</option>
                            {profiles.map(p => <option key={p.id} value={p.id}>Versão {p.version} {p.is_current ? '(Atual)' : ''}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Modelo de Questão</label>
                        <select value={selectedBlueprint} onChange={(e) => setSelectedBlueprint(e.target.value)} className="w-full h-14 bg-slate-100 dark:bg-white/5 rounded-xl px-4 font-black uppercase text-[10px] outline-none border border-transparent focus:border-indigo-500 text-[#1A1033] dark:text-white">
                            <option value="">Selecionar Modelo</option>
                            {blueprints.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Assunto (Taxonomia)</label>
                        <select value={structuralTema} onChange={(e) => setStructuralTema(e.target.value)} className="w-full h-14 bg-slate-100 dark:bg-white/5 rounded-xl px-4 font-black uppercase text-[10px] outline-none border border-transparent focus:border-indigo-500 text-[#1A1033] dark:text-white">
                            <option value="">Usar Seleção Atual</option>
                            {dynamicHierarchy.find(h => h.id === structuralArea)?.subspecialties.find(s => s.id === structuralSubarea)?.subjects.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button onClick={handlePromptBuild} className="w-full h-14 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:opacity-90 active:scale-95 transition-all">Construir Prompt</button>
                    </div>
                </div>

                {generatedPrompt && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 italic">Prompt Estruturado para Bio-IA</p>
                            <button onClick={() => { navigator.clipboard.writeText(generatedPrompt); toast.success("Prompt copiado!") }} className="text-xs font-black uppercase text-emerald-500 hover:underline">Copiar para o Clipboard</button>
                        </div>
                        <div className="p-8 bg-slate-100 dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-white/5 max-h-[400px] overflow-y-auto no-scrollbar">
                            <pre className="text-[11px] font-mono whitespace-pre-wrap dark:text-slate-300 leading-relaxed">{generatedPrompt}</pre>
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold uppercase text-center mt-4 italic">
                            💡 Cole este prompt no QRub Chat ou na sua IA de preferência e importe o JSON resultante.
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )

    const renderValidation = () => (
        <motion.div key="val" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
            <div className="flex items-center justify-between px-6">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-amber-500 flex items-center gap-4">
                    <History className="w-8 h-8" /> Fila de Validação (Aprovação Master)
                </h3>
                <span className="px-4 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full uppercase italic">{questions.length} Pendentes</span>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                {questions.map(q => (
                    <ConcursoCard key={q.id} className="p-8 border-none soft-shadow bg-white dark:bg-white/5 group">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[8px] font-black uppercase rounded-lg">ID: {q.id.substring(0,8)}</span>
                                    <span className="px-3 py-1 bg-slate-500/10 text-slate-500 text-[8px] font-black uppercase rounded-lg">{q.status_validacao || 'PENDENTE'}</span>
                                </div>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-300 leading-relaxed italic">"{q.enunciado.substring(0, 300)}..."</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                                        <p className="text-[7px] font-black text-slate-400 uppercase mb-1">Especialidade</p>
                                        <p className="text-[9px] font-black text-[#1A1033] dark:text-white uppercase truncate">{q.area_id}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5">
                                        <p className="text-[7px] font-black text-slate-400 uppercase mb-1">Tema</p>
                                        <p className="text-[9px] font-black text-[#1A1033] dark:text-white uppercase truncate">{q.tema_id}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-64 flex flex-col justify-center gap-3">
                                <button onClick={() => handleQuestionApprove(q.id)} className="w-full h-14 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">Aprovar & Publicar</button>
                                <button onClick={() => handleQuestionReject(q.id)} className="w-full h-14 bg-white dark:bg-white/5 text-rose-500 border border-rose-500/20 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-500 hover:text-white active:scale-95 transition-all">Reprovar</button>
                                <button onClick={() => router.push(`/dashboard/questions/edit/${q.id}`)} className="w-full py-2 text-[9px] font-black uppercase text-slate-400 hover:text-indigo-500">Editar Detalhes →</button>
                            </div>
                        </div>
                    </ConcursoCard>
                ))}
            </div>
        </motion.div>
    )

    return (
        <div className="space-y-12 pb-20 max-w-[1800px] mx-auto animate-in fade-in duration-700">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 text-[11px] font-black uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" /> MASTER AUTHORITY
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter dark:text-white leading-none">
                        Saúde <span className="text-indigo-600">Admin</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-xl">
                        Monitoramento de atividade clínica, regulação técnica e geração de conteúdo via Bio-IA QRub.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => { localStorage.setItem('qrub_last_environment', 'CONCURSOS'); router.push('/select-environment'); }}
                        className="px-8 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-3xl shadow-indigo-600/30 hover:scale-105 transition-all flex items-center gap-3 active:scale-95 border-b-4 border-indigo-800"
                    >
                        <ArrowLeftRight className="w-5 h-5" /> Permutar Concursos
                    </button>
                </div>
            </header>

            {/* Nav */}
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-6">
                <TabBtn active={tab === 'overview'} onClick={() => setTab('overview')} label="Geral" icon={LayoutDashboard} color="indigo" />
                <TabBtn active={tab === 'users'} onClick={() => setTab('users')} label="Alunos" icon={Users} color="emerald" />
                <TabBtn active={tab === 'validation'} onClick={() => { setTab('validation'); loadQuestions({ status_validacao: 'PENDENTE' }); }} label="Validação" icon={CheckCircle2} color="amber" />
                <TabBtn active={tab === 'moderation'} onClick={() => setTab('moderation')} label="Regulação" icon={ShieldAlert} color="rose" />
                <TabBtn active={tab === 'generator'} onClick={() => setTab('generator')} label="Auto Gerador" icon={Zap} color="indigo" />
                <TabBtn active={tab === 'prompts'} onClick={() => setTab('prompts')} label="Gerador de Prompt" icon={FileText} color="emerald" />
                <TabBtn active={tab === 'taxonomy'} onClick={() => setTab('taxonomy')} label="Taxonomia" icon={Server} color="slate" />
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {tab === 'overview' && renderOverview()}
                {tab === 'moderation' && renderModeration()}
                {tab === 'generator' && renderGenerator()}
                {tab === 'prompts' && renderPromptGenerator()}
                {tab === 'validation' && renderValidation()}
                {tab === 'users' && (
                    <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                        <div className="relative group w-full md:w-[500px]">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="BUSCAR MÉDICO, EMAIL OU CRM..." className="w-full bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/5 rounded-[32px] py-6 pl-16 pr-8 font-black text-xs uppercase tracking-widest outline-none focus:ring-8 ring-emerald-500/5 transition-all dark:text-white" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {users.filter(u => !searchTerm || u.email.includes(searchTerm)).slice(0, 16).map(u => (
                                <UserCard key={u.id} user={u} onPlanChange={updateUserPlan} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function TabBtn({ active, onClick, label, icon: Icon, color }: any) {
    const colors = {
        indigo: "bg-[#1A1033] dark:bg-white text-white dark:text-[#1A1033]",
        emerald: "bg-emerald-500 text-white",
        rose: "bg-rose-500 text-white",
        amber: "bg-amber-500 text-white",
        slate: "bg-slate-700 text-white"
    }

    return (
        <button onClick={onClick} className={cn("px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all", active ? `${colors[color as keyof typeof colors]} shadow-xl scale-105` : "text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5")}>
            <Icon className="w-4 h-4" /> {label}
        </button>
    )
}

function PremiumMetricCard({ label, value, icon: Icon, color, trend }: any) {
    const colors = {
        indigo: "bg-[#1A1033] text-white", emerald: "bg-emerald-500 text-white", rose: "bg-rose-500 text-white", amber: "bg-amber-500 text-white"
    }
    return (
        <ConcursoCard className="p-8 border-none bg-white dark:bg-white/5 soft-shadow relative overflow-hidden group">
            <Icon className="absolute -right-4 -top-4 w-24 h-24 opacity-5 group-hover:scale-125 transition-transform duration-500" />
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", colors[color as keyof typeof colors])}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
            <h4 className="text-4xl font-black italic tracking-tighter dark:text-white leading-none mb-3">{value}</h4>
            <div className="inline-flex px-2 py-1 bg-slate-100 dark:bg-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500">{trend}</div>
        </ConcursoCard>
    )
}

function UserCard({ user, onPlanChange }: any) {
    return (
        <ConcursoCard className="p-8 border-none bg-white dark:bg-white/5 soft-shadow group hover:border-emerald-500/20 transition-all">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Users className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <h5 className="font-black italic uppercase tracking-tighter dark:text-white truncate leading-none mb-1">{user.email.split('@')[0]}</h5>
                    <p className="text-[9px] font-black text-slate-400 truncate uppercase">{formatBRT(user.created_at)}</p>
                </div>
            </div>
            <div className="space-y-3 mb-8">
                 <div className="flex justify-between items-center px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl">
                    <span className="text-[8px] font-black uppercase text-slate-400">Plano</span>
                    <select value={user.plan_level} onChange={(e) => onPlanChange(user.id, e.target.value)} className="bg-transparent text-[10px] font-black text-[#1A1033] dark:text-white outline-none">
                        <option value="FREE">FREE</option>
                        <option value="PREMIUM">PREMIUM</option>
                        <option value="INSANO">INSANO</option>
                    </select>
                </div>
            </div>
            <button className="w-full py-4 bg-[#1A1033] dark:bg-white text-white dark:text-[#1A1033] rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:translate-y-[-2px] transition-all">Analisar Perfil</button>
        </ConcursoCard>
    )
}
