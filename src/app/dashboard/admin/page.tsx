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
    BarChart3,
    X,
    ArrowUpRight,
    ArrowDownRight,
    Target,
    Zap,
    LayoutDashboard,
    Layers,
    Server,
    Upload,
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
    MoreHorizontal,
    ClipboardCheck,
    Building2,
    Package
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "react-hot-toast"

import { ConcursoCard } from "@/components/concursos/concurso-card"
import AdminPackagesManager from "@/components/admin-packages-manager"
import { SaudeAdminBanksManager } from "@/components/saude/admin-banks-manager"
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
    const searchParams = useSearchParams()
    
    // Tab State
    type TabType = 'overview' | 'students' | 'content' | 'moderation' | 'generator' | 'prompts' | 'validation' | 'taxonomy' | 'settings' | 'packages' | 'editais' | 'banks'
    const [tab, setTab] = useState<TabType>('overview')
    
    useEffect(() => {
        const t = searchParams.get('tab') as TabType
        if (t) setTab(t)
    }, [searchParams])
    
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

    // TAB SYNC FROM URL
    useEffect(() => {
        const urlTab = searchParams.get('tab')
        if (urlTab) {
            setTab(urlTab as TabType)
        }
    }, [searchParams])

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
        <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-[#1A1033] rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-[#1A1033]/20">
                    <BarChart3 size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Estatísticas Gerais</h1>
                    <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Saúde v2.5</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <MetricCard label="Alunos QRub" value={users.length} trend="+12%" trendType="up" icon={Users} color="indigo" />
                <MetricCard label="Acessos Hoje" value={activeUsersToday} trend="Pico: 85" trendType="up" icon={Activity} color="emerald" />
                <MetricCard label="Contestações" value={reports.filter(r => r.status === 'pending').length} trend="Crítico" trendType="down" icon={ShieldAlert} color="rose" />
                <MetricCard label="Questões Ativas" value={totalCount} trend="+88" trendType="up" icon={Database} color="amber" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Growth Chart Panel */}
                <ConcursoCard className="lg:col-span-8 p-10">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white flex items-center gap-3">
                            <BarChart3 className="w-6 h-6 text-indigo-600" /> Desempenho de Carga (Bio-IA)
                        </h3>
                        <select className="bg-slate-50 dark:bg-white/5 border-none outline-none text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl text-slate-500">
                            <option>Últimos 7 dias</option>
                            <option>Últimos 30 dias</option>
                        </select>
                    </div>
                    <div className="h-72 flex items-end justify-between gap-4 px-4">
                        {[45, 62, 58, 75, 42, 88, 70].map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group">
                                <div className="w-full relative h-[250px] flex items-end">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg group-hover:from-emerald-500 transition-all opacity-80 group-hover:opacity-100"
                                    />
                                </div>
                                <span className="mt-4 text-[8px] font-bold text-slate-400 uppercase">Dia {i+1}</span>
                            </div>
                        ))}
                    </div>
                </ConcursoCard>

                {/* Conversion / Distribution */}
                <ConcursoCard className="lg:col-span-4 p-10 flex flex-col justify-between">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white mb-8 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-indigo-500" /> Status da Base
                    </h3>
                    <div className="space-y-8 flex-1 flex flex-col justify-center">
                        <div className="relative w-48 h-48 mx-auto">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path 
                                    className="text-slate-100 dark:text-white/5" 
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none" stroke="currentColor" strokeWidth="3"
                                />
                                <path 
                                    className="text-emerald-500" 
                                    strokeDasharray="75, 100"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none" stroke="currentColor" strokeWidth="3"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-44 font-black italic text-[#1A1033] dark:text-white">75%</span>
                                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest text-center">Validadas<br/>Humanamente</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Prontas</p>
                                <p className="text-xl font-black italic text-[#1A1033] dark:text-white leading-none">{totalCount}</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                <p className="text-[10px] font-black text-rose-600 uppercase mb-1">Pendentes</p>
                                <p className="text-xl font-black italic text-[#1A1033] dark:text-white leading-none">1.2k</p>
                            </div>
                        </div>
                    </div>
                </ConcursoCard>
            </div>

            {/* 5. RECENT ACTIVITY TABLE */}
            <ConcursoCard className="overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-white dark:bg-[#1e1a2d]">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white flex items-center gap-3">
                        <Activity className="w-6 h-6 text-rose-500" /> Logs Críticos de Curadoria
                    </h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:opacity-75 transition-all">Ver tudo</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5">
                                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Hora</th>
                                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Moderador</th>
                                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Operação</th>
                                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                <th className="px-8 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            <LogEntry time="16:42:12" user="Master Bio-IA" event="Batch Hepatologia Sync" status="Concluído" />
                            <LogEntry time="16:35:05" user="admin@qrub.com.br" event="Aprovação Massa (Cardio)" status="Avisos" color="text-amber-500" />
                            <LogEntry time="16:20:44" user="Lucas M." event="Revisão de Taxonomia" status="Concluído" />
                            <LogEntry time="16:15:30" user="System" event="Backup Binário" status="Crítico" color="text-rose-500" />
                        </tbody>
                    </table>
                </div>
            </ConcursoCard>
        </motion.div>
    )

    const renderModeration = () => (
        <motion.div key="mod" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-rose-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-rose-600/20">
                    <ShieldAlert size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Regulação Médica</h1>
                    <p className="text-xs font-black uppercase text-rose-600 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Saúde • Contestações</p>
                </div>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-[40px] overflow-hidden soft-shadow border border-slate-100 dark:border-white/5">
                <div className="p-10 border-b border-slate-100 dark:border-white/5 bg-rose-500/5">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-rose-500 flex items-center gap-4">
                        <ShieldAlert className="w-6 h-6" /> Fila de Contestações
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
          </div>
        </motion.div>
    )

    const renderGenerator = () => (
        <motion.div key="gen" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-12">
            <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-600/20">
                    <Zap size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Auto Gerador Bio-IA</h1>
                    <p className="text-xs font-black uppercase text-emerald-600 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Saúde • Structural Engine</p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#1e1a2d] border border-slate-100 dark:border-white/5 rounded-[48px] p-10 md:p-14 soft-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                    <Sparkles className="w-96 h-96 text-indigo-500" />
                </div>
                <div className="max-w-4xl space-y-10 relative z-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">
                            <Zap className="w-4 h-4 fill-emerald-500" /> Bio Intelligence Engine
                        </div>
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
        <motion.div key="prompts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-slate-900/20">
                    <Zap size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Gerador de Prompts Master</h1>
                    <p className="text-xs font-black uppercase text-slate-400 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Saúde • Bio-IA Protocol</p>
                </div>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-[48px] p-12 soft-shadow border border-slate-100 dark:border-white/5 relative overflow-hidden">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10 relative z-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Instituição / Banca</label>
                        <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="w-full h-14 bg-slate-50 dark:bg-white/5 rounded-xl px-4 font-black uppercase text-[10px] outline-none border border-slate-100 dark:border-white/10 focus:border-indigo-500 text-[#1A1033] dark:text-white appearance-none">
                            <option value="">Selecionar Banca</option>
                            {banks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Perfil DNA (Versão)</label>
                        <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)} className="w-full h-14 bg-slate-50 dark:bg-white/5 rounded-xl px-4 font-black uppercase text-[10px] outline-none border border-slate-100 dark:border-white/10 focus:border-indigo-500 text-[#1A1033] dark:text-white appearance-none">
                            <option value="">Padrão (Sem DNA)</option>
                            {profiles.map(p => <option key={p.id} value={p.id}>Versão {p.version} {p.is_current ? '(Atual)' : ''}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Modelo de Questão</label>
                        <select value={selectedBlueprint} onChange={(e) => setSelectedBlueprint(e.target.value)} className="w-full h-14 bg-slate-50 dark:bg-white/5 rounded-xl px-4 font-black uppercase text-[10px] outline-none border border-slate-100 dark:border-white/10 focus:border-indigo-500 text-[#1A1033] dark:text-white appearance-none">
                            <option value="">Selecionar Modelo</option>
                            {blueprints.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Assunto (Taxonomia)</label>
                        <select value={structuralTema} onChange={(e) => setStructuralTema(e.target.value)} className="w-full h-14 bg-slate-50 dark:bg-white/5 rounded-xl px-4 font-black uppercase text-[10px] outline-none border border-slate-100 dark:border-white/10 focus:border-indigo-500 text-[#1A1033] dark:text-white appearance-none">
                            <option value="">Usar Seleção Atual</option>
                            {dynamicHierarchy.find(h => h.id === structuralArea)?.subspecialties.find(s => s.id === (structuralSubarea || ''))?.subjects.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button onClick={handlePromptBuild} className="w-full h-14 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">Construir Prompt</button>
                    </div>
                </div>

                {generatedPrompt && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-indigo-500" />
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 italic">Protocolo Bio-IA Gerado</p>
                            </div>
                            <button onClick={() => { navigator.clipboard.writeText(generatedPrompt); toast.success("Prompt copiado!") }} className="text-xs font-black uppercase text-emerald-500 hover:underline flex items-center gap-2">
                                <Sparkles className="w-3 h-3" /> Copiar para o Clipboard
                            </button>
                        </div>
                        <div className="p-8 bg-slate-900 border border-slate-800 rounded-[32px] soft-shadow-inner max-h-[500px] overflow-y-auto no-scrollbar font-mono text-xs text-emerald-400 leading-relaxed shadow-inner">
                            <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
                        </div>
                        <div className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-2xl text-center">
                            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest italic">
                                💡 Cole este prompt no QRub Chat ou na sua IA de preferência e importe o JSON resultante na aba Importação.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )


    const renderValidation = () => (
        <motion.div key="val" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-600/20">
                    <Database size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Banco de Questões</h1>
                    <p className="text-xs font-black uppercase text-emerald-600 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Saúde • Fila de Validação</p>
                </div>
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

    const renderTaxonomy = () => (
        <motion.div key="tax" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/20">
                    <Brain size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Matriz de Conhecimento</h1>
                    <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Saúde • Taxonomia Médica</p>
                </div>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-[48px] p-12 soft-shadow border border-slate-100 dark:border-white/5">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {dynamicHierarchy.map(area => (
                        <div key={area.id} className="p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-indigo-500/30 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-black italic uppercase text-lg text-[#1A1033] dark:text-white">{area.name}</h4>
                                <span className="text-[9px] font-black bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded-lg">AREA</span>
                            </div>
                            <div className="space-y-2">
                                {area.subspecialties.slice(0, 3).map(sub => (
                                    <div key={sub.id} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 capitalize">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {sub.name}
                                    </div>
                                ))}
                                {area.subspecialties.length > 3 && (
                                    <p className="text-[9px] font-black text-indigo-500 mt-2 hover:underline cursor-pointer">+{area.subspecialties.length - 3} OUTROS →</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Database className="w-8 h-8 text-amber-500" />
                        <div>
                            <p className="text-xs font-black uppercase text-amber-600">Sincronização de Dados</p>
                            <p className="text-sm font-medium text-amber-900/60 dark:text-amber-100/60">A taxonomia é herdada do núcleo central. Alterações devem ser validadas via Protocolo Master.</p>
                        </div>
                    </div>
                    <button onClick={loadTaxonomy} className="px-6 py-3 bg-amber-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">Recarregar Árvore</button>
                </div>
            </div>
        </motion.div>
    )

    const renderSettings = () => (
        <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-slate-900/20">
                    <Settings size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Configurações Master</h1>
                    <p className="text-xs font-black uppercase text-slate-400 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Saúde • Painel de Controle</p>
                </div>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-[48px] p-12 soft-shadow border border-slate-100 dark:border-white/5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 space-y-6">
                        <h4 className="text-lg font-black uppercase italic text-[#1A1033] dark:text-white">Backups do Sistema</h4>
                        <div className="flex flex-col gap-4">
                            <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3">
                                <Download className="w-4 h-4" /> Exportar Dump JSON Geral
                            </button>
                            <button className="w-full py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest">
                                Agendar Backup Semanal
                            </button>
                        </div>
                    </div>
                    <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-white/5 space-y-6">
                        <h4 className="text-lg font-black uppercase italic text-[#1A1033] dark:text-white">Restrição de Acesso</h4>
                        <div className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                            <div>
                                <p className="text-xs font-black uppercase text-[#1A1033] dark:text-white">Apenas Master</p>
                                <p className="text-[10px] text-slate-400 font-bold">Bloqueia acesso administrativo de Staff</p>
                            </div>
                            <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )


    return (
        <div className="animate-in fade-in duration-700">
            {/* Content */}
            <AnimatePresence mode="wait">
                {tab === 'overview' && renderOverview()}
                {tab === 'moderation' && renderModeration()}
                {tab === 'generator' && renderGenerator()}
                {tab === 'prompts' && renderPromptGenerator()}
                {tab === 'validation' && renderValidation()}
                {tab === 'taxonomy' && renderTaxonomy()}
                {tab === 'settings' && renderSettings()}
                {tab === 'packages' && (
                    <motion.div key="packages" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                         <div className="flex items-center gap-6 mb-12">
                            <div className="w-16 h-16 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-600/20">
                                <Package size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Gerenciador de Pacotes</h1>
                                <p className="text-xs font-black uppercase text-emerald-600 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Saúde</p>
                            </div>
                        </div>
                        <AdminPackagesManager />
                    </motion.div>
                )}
                {tab === 'editais' && (
                    <motion.div key="editais" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-20 flex flex-col items-center justify-center bg-white rounded-[40px] border-2 border-dashed border-slate-100 shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 flex items-center justify-center rounded-full mb-10">
                            <ClipboardCheck className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Mural de Editais Saúde</h3>
                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest mt-4">Módulo em Integração com a Matriz de Vagas Médicas</p>
                    </motion.div>
                )}
                {tab === 'banks' && (
                    <motion.div key="banks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                         <div className="flex items-center gap-6 mb-12">
                            <div className="w-16 h-16 bg-slate-800 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-slate-800/20">
                                <Building2 size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Bancas & Perfis Saúde</h1>
                                <p className="text-xs font-black uppercase text-slate-500 tracking-[0.4em] mt-3 ml-1">Gestão de Estilo de IA (Protocolo Saúde)</p>
                            </div>
                        </div>
                        <SaudeAdminBanksManager />
                    </motion.div>
                )}
                {tab === 'students' && (
                    <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                         <div className="flex items-center gap-6 mb-12">
                            <div className="w-16 h-16 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/20">
                                <Users size={32} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">Gestão de Alunos</h1>
                                <p className="text-xs font-black uppercase text-indigo-600 tracking-[0.4em] mt-3 ml-1">Protocolo QRub Saúde • CRM & Onboarding</p>
                            </div>
                        </div>

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

function TabButton({ active, onClick, label, icon: Icon }: any) {
    return (
        <button 
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                active 
                    ? "bg-[#1A1033] dark:bg-white text-white dark:text-[#1A1033] shadow-xl" 
                    : "text-slate-400 hover:text-[#1A1033] dark:hover:text-white"
            )}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    )
}

function MetricCard({ label, value, trend, trendType, icon: Icon, color }: any) {
    const colors = {
        indigo: "bg-indigo-600 shadow-indigo-600/20",
        emerald: "bg-emerald-600 shadow-emerald-600/20",
        rose: "bg-rose-600 shadow-rose-600/20",
        amber: "bg-amber-600 shadow-amber-600/20"
    }

    return (
        <ConcursoCard className="p-6 relative group overflow-hidden">
             <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-all">
                <Icon className="w-20 h-20" />
            </div>
            <div className="relative z-10 flex items-center justify-between mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", colors[color as keyof typeof colors])}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-[8px] font-black uppercase tracking-widest",
                    trendType === 'up' ? "text-emerald-500" : "text-rose-500"
                )}>
                    {trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {trend}
                </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
            <h4 className="text-3xl font-black italic tracking-tighter text-[#1A1033] dark:text-white">{value}</h4>
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

function LogEntry({ time, user, event, status, color = "text-emerald-500" }: any) {
    return (
        <tr className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <td className="px-8 py-5 text-[10px] font-bold text-slate-400">{time}</td>
            <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-black text-[10px] uppercase">
                        {user.substring(0, 2)}
                    </div>
                    <span className="text-[11px] font-black italic text-[#1A1033] dark:text-white tracking-tight">{user}</span>
                </div>
            </td>
            <td className="px-8 py-5 text-[11px] font-bold text-slate-600 dark:text-slate-400 capitalize">{event}</td>
            <td className="px-8 py-5">
                <span className={cn("text-[9px] font-black uppercase tracking-widest", color)}>{status}</span>
            </td>
            <td className="px-8 py-5 text-right">
                <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </td>
        </tr>
    )
}
