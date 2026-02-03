"use client"

import { useState, useEffect, useMemo } from 'react'
import {
    Plus, Search, Edit2, Trash2, Users, Crown, Star,
    RefreshCw, Database, BarChart3, Upload, CheckCircle2, XCircle,
    AlertCircle, History, ExternalLink, Mail, Phone, BookOpen, GraduationCap, Sparkles, X, ShieldCheck, DollarSign, Settings, ArrowLeft,
    Activity, Target, Zap, TrendingUp, ChevronLeft, ChevronRight, Flag, Hammer, Wrench, ShieldAlert
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQuestions as useQuestionsStore } from '@/store/use-questions'
import { COURSES, QUESTIONS, Question } from '@/lib/data-mock'
import { useAuth, PlanLevel, UserRole } from '@/store/use-auth'
import { useUserDb } from '@/store/use-user-db'
import { useModeration } from '@/store/use-moderation'
import { useQuiz } from '@/store/use-quiz'
import { useRouter } from 'next/navigation'
// Removed AI Prompt imports

import { motion, AnimatePresence } from 'framer-motion'
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line
} from 'recharts'
import * as XLSX from 'xlsx'
import { useSystem } from '@/store/use-system'
// Redundant imports removed
import { generateStructuralQuestion } from '@/lib/generators/structural-engine'
import { MEDICAL_LIBRARY } from '@/lib/generators/medical-library'
import { MEDICAL_HIERARCHY } from '@/lib/medical-specialties'
import { QuestionPreviewModal } from '@/components/question-preview-modal'

export default function AdminDashboard() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { questions, deleteQuestion, deleteQuestions, addQuestion, addQuestions, loadQuestions, loading } = useQuestionsStore()
    const { users: realUsers, loadUsers, updateUserPlan, deleteUser, deleteUsers } = useUserDb()
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

    const { reports, loadReports, updateReportStatus, loading: reportsLoading } = useModeration()
    const { responses, load_all_responses: loadAllResponses } = useQuiz()
    // QRUB MASTER - Structural State
    const [view, setViewInternal] = useState<'questions' | 'users' | 'analytics' | 'reports' | 'import' | 'structural' | 'validation' | 'settings'>('analytics')
    const { isMaintenanceMode, maintenanceMessage, setMaintenanceMode } = useSystem()
    const [structuralArea, setStructuralArea] = useState('')
    const [structuralSubarea, setStructuralSubarea] = useState('')
    const [structuralTema, setStructuralTema] = useState('')
    const [validationFilter, setValidationFilter] = useState<'PENDENTE' | 'APROVADA' | 'REPROVADA'>('PENDENTE')
    const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null)

    const setView = (newView: string) => {
        setViewInternal(newView as any)
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', newView)
        router.push(`/admin?${params.toString()}`, { scroll: false })
    }

    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab && ['questions', 'users', 'analytics', 'reports', 'import', 'structural', 'validation', 'settings'].includes(tab)) {
            setViewInternal(tab as any)
        } else if (!tab && view === 'analytics') {
            setViewInternal('analytics')
        }
    }, [searchParams])

    const [searchTerm, setSearchTerm] = useState('')
    const [jsonInput, setJsonInput] = useState('')
    const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null)
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
    const [loadingManual, setLoadingManual] = useState(false)
    const [userFilter, setUserFilter] = useState<'all' | 'insano' | 'premium' | 'incomplete'>('all')
    const [userSearch, setUserSearch] = useState('')

    // QRUB MASTER - Logic
    // QRUB MASTER - Logic
    const handleStructuralGenerate = async () => {
        if (!structuralArea) {
            alert('Selecione ao menos a Área da Prova.')
            return
        }

        const areaObj = MEDICAL_HIERARCHY[0].specialties.find(s => s.id === structuralArea)
        if (!areaObj) return

        // 1. Resolve Subarea (Auto-pick or Generic)
        let subareaObj = areaObj.subspecialties.find(sub => sub.id === structuralSubarea)
        if (!subareaObj) {
            if (areaObj.subspecialties.length > 0) {
                // Auto-pick random available subspecialty
                subareaObj = areaObj.subspecialties[Math.floor(Math.random() * areaObj.subspecialties.length)]
            } else {
                // Formatting for Generic fallback
                subareaObj = { id: 'geral', name: 'Geral', subjects: [], category: 'N/A' } as any
            }
        }

        // 2. Resolve Tema (Auto-pick or Generic)
        let temaObj = subareaObj?.subjects?.find(t => t.id === structuralTema)
        if (!temaObj) {
            if (subareaObj && subareaObj.subjects && subareaObj.subjects.length > 0) {
                // Auto-pick random subject
                temaObj = subareaObj.subjects[Math.floor(Math.random() * subareaObj.subjects.length)]
            } else {
                // Generic fallback
                temaObj = { id: 'geral', name: 'Geral' }
            }
        }

        const newQuestion = generateStructuralQuestion(
            { id: areaObj.id, nome: areaObj.name },
            { id: subareaObj!.id, nome: subareaObj!.name },
            { id: temaObj!.id, nome: temaObj!.name }
        )

        setLoadingManual(true)
        const result = await addQuestion(newQuestion)
        if (result.success) {
            setImportStatus({ type: 'success', msg: `✅ Gerado: ${areaObj.name} > ${subareaObj!.name} > ${temaObj!.name}` })
            loadQuestions()
        } else {
            setImportStatus({ type: 'error', msg: `❌ Erro ao salvar: ${result.message}` })
        }
        setLoadingManual(false)
    }

    const filteredUsers = useMemo(() => {
        return realUsers.filter(u => {
            const matchesFilter =
                userFilter === 'insano' ? u.plan_level === 'INSANO' :
                    userFilter === 'premium' ? u.plan_level === 'PREMIUM' :
                        userFilter === 'incomplete' ? (!u.institution || !u.graduation_year) :
                            true;

            const matchesSearch =
                u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                u.email.toLowerCase().includes(userSearch.toLowerCase());

            return matchesFilter && matchesSearch;
        })
    }, [realUsers, userFilter, userSearch])

    const handleBulkUserDelete = async () => {
        if (selectedUserIds.length === 0) return
        if (!confirm(`Tem certeza que deseja excluir ${selectedUserIds.length} usuários? Esta ação é irreversível!`)) return

        try {
            await deleteUsers(selectedUserIds)
            setSelectedUserIds([])
            alert('Usuários excluídos com sucesso!')
        } catch (error) {
            console.error(error)
            alert('Erro ao excluir usuários.')
        }
    }

    useEffect(() => {
        setSelectedUserIds([])
    }, [userFilter, userSearch])

    const renderStructuralGenerator = () => {
        const specialties = MEDICAL_HIERARCHY[0].specialties
        const activeArea = specialties.find(s => s.id === structuralArea)
        const activeSubarea = activeArea?.subspecialties.find(sub => sub.id === structuralSubarea)

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-card border border-border rounded-[40px] p-8 md:p-12 soft-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Sparkles className="w-64 h-64 text-primary" />
                    </div>

                    <div className="max-w-3xl space-y-8 relative z-10">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                <Zap className="w-3.5 h-3.5 fill-primary" />
                                Qrub Master Structural
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                                Gerador <span className="royal-gradient-text">Oficial</span>
                            </h2>
                            <p className="text-muted-foreground font-medium max-w-xl">
                                Gere questões médicas baseadas em bibliotecas fixas, sem dependência de IA.
                                Controle total sobre a hierarquia e temas oficiais QRUB.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Área Prova</label>
                                <select
                                    value={structuralArea}
                                    onChange={(e) => {
                                        setStructuralArea(e.target.value)
                                        setStructuralSubarea('')
                                        setStructuralTema('')
                                    }}
                                    className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                                >
                                    <option value="">Selecionar Área</option>
                                    {specialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Subárea</label>
                                <select
                                    value={structuralSubarea}
                                    onChange={(e) => {
                                        setStructuralSubarea(e.target.value)
                                        setStructuralTema('')
                                    }}
                                    disabled={!structuralArea}
                                    className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <option value="">Selecionar Subárea</option>
                                    {activeArea?.subspecialties.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Tema</label>
                                <select
                                    value={structuralTema}
                                    onChange={(e) => setStructuralTema(e.target.value)}
                                    disabled={!structuralSubarea}
                                    className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <option value="">Selecionar Tema</option>
                                    {activeSubarea?.subjects.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleStructuralGenerate}
                            disabled={loadingManual || !structuralArea}
                            className="w-full royal-gradient text-white py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                        >
                            {loadingManual ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                            GERAR QUESTÃO ESTRUTURAL
                        </button>
                    </div>
                </div>

                {importStatus && (
                    <div className={`p-6 rounded-3xl border ${importStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-rose-500/10 border-rose-500/20 text-rose-600'} flex items-center gap-4 transition-all animate-in zoom-in-95`}>
                        {importStatus.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        <p className="font-black uppercase text-[10px] tracking-widest leading-relaxed flex-1">{importStatus.msg}</p>
                        <button onClick={() => setImportStatus(null)} className="p-2 hover:bg-black/5 rounded-xl"><X className="w-4 h-4" /></button>
                    </div>
                )}
            </div>
        )
    }

    const renderValidationQueue = () => {
        const filteredQuestions = questions.filter(q => q.status_validacao === validationFilter)

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Fila de Validação</h2>
                        <p className="text-muted-foreground text-xs font-black uppercase tracking-widest opacity-60">Questões aguardando aprovação master</p>
                    </div>

                    <div className="flex bg-muted p-1.5 rounded-2xl">
                        {(['PENDENTE', 'APROVADA', 'REPROVADA'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => { setValidationFilter(f); setSelectedQuestions([]) }}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${validationFilter === f ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:bg-white/50'}`}
                            >
                                {f} ({questions.filter(q => q.status_validacao === f).length})
                            </button>
                        ))}
                    </div>
                </div>

                {selectedQuestions.length > 0 && (
                    <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 p-4 rounded-3xl animate-in zoom-in-95">
                        <span className="text-xs font-black uppercase tracking-widest text-primary ml-4">
                            {selectedQuestions.length} questões selecionadas
                        </span>
                        <div className="flex-1" />
                        <button
                            onClick={handleBulkApprove}
                            className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
                        >
                            <CheckCircle2 className="w-4 h-4" /> Aprovar Em Lote
                        </button>
                        <button
                            onClick={handleBulkReject}
                            className="bg-rose-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-rose-500/20"
                        >
                            <XCircle className="w-4 h-4" /> Reprovar Em Lote
                        </button>
                    </div>
                )}

                <div className="bg-card border border-border rounded-[40px] overflow-hidden soft-shadow">
                    <table className="w-full text-left">
                        <thead className="bg-muted/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                            <tr>
                                <th className="px-8 py-6 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-border"
                                        checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                                        onChange={() => {
                                            if (selectedQuestions.length === filteredQuestions.length) setSelectedQuestions([])
                                            else setSelectedQuestions(filteredQuestions.map(q => q.id))
                                        }}
                                    />
                                </th>
                                <th className="px-8 py-6">Questão / Tema</th>
                                <th className="px-8 py-6">Fonte</th>
                                <th className="px-8 py-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredQuestions.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-8 py-20 text-center text-muted-foreground uppercase text-xs font-black tracking-widest">Fila Vazia</td>
                                </tr>
                            ) : filteredQuestions.map(q => (
                                <tr
                                    key={q.id}
                                    className="hover:bg-muted/10 transition-colors group cursor-pointer"
                                    onClick={() => setPreviewQuestion(q)}
                                >
                                    <td className="px-8 py-6 text-center" onClick={(e) => e.stopPropagation()}>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-border"
                                            checked={selectedQuestions.includes(q.id)}
                                            onChange={() => {
                                                if (selectedQuestions.includes(q.id)) setSelectedQuestions(selectedQuestions.filter(id => id !== q.id))
                                                else setSelectedQuestions([...selectedQuestions, q.id])
                                            }}
                                        />
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-2 max-w-2xl">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black rounded-lg">{q.id}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{q.area_id} › {q.subarea_id}</span>
                                            </div>
                                            <p className="text-sm font-bold leading-relaxed line-clamp-2 text-[#1A1033]">{q.enunciado}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${q.fonte === 'estrutural' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-500' :
                                            q.fonte === 'ia' ? 'bg-primary/10 border-primary/20 text-primary' :
                                                'bg-slate-500/10 border-slate-500/20 text-slate-500'
                                            }`}>
                                            {q.fonte}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        {q.status_validacao !== 'APROVADA' && (
                                            <button
                                                onClick={async () => {
                                                    const res = await addQuestion({ ...q, status_validacao: 'APROVADA' })
                                                    if (res.success) loadQuestions()
                                                }}
                                                className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20"
                                                title="Aprovar"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                        )}
                                        {q.status_validacao !== 'REPROVADA' && (
                                            <button
                                                onClick={async () => {
                                                    const res = await addQuestion({ ...q, status_validacao: 'REPROVADA' })
                                                    if (res.success) loadQuestions()
                                                }}
                                                className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20"
                                                title="Reprovar"
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const renderSettingsSection = () => {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-card border border-border rounded-[40px] p-8 md:p-12 soft-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Settings className="w-64 h-64 text-primary" />
                    </div>

                    <div className="max-w-3xl space-y-12 relative z-10">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                <ShieldAlert className="w-3.5 h-3.5" />
                                Controle de Ativos do Sistema
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                                Ajustes <span className="royal-gradient-text">Críticos</span>
                            </h2>
                            <p className="text-muted-foreground font-medium max-w-xl">
                                Utilize estas ferramentas para gerenciar a estabilidade da plataforma durante janelas de manutenção ou correções de bugs.
                            </p>
                        </div>

                        {/* Maintenance Toggle Card */}
                        <div className={`p-8 rounded-[32px] border-2 transition-all ${isMaintenanceMode ? 'bg-amber-500/5 border-amber-500 shadow-xl shadow-amber-500/10' : 'bg-muted/30 border-border hover:border-primary/20'}`}>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl ${isMaintenanceMode ? 'bg-amber-500 text-white animate-pulse' : 'bg-muted text-muted-foreground'}`}>
                                            <Hammer className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-1">Modo Manutenção</h3>
                                            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">Aviso global para todos os usuários</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Mensagem de Aviso</label>
                                        <textarea
                                            value={maintenanceMessage}
                                            onChange={(e) => setMaintenanceMode(isMaintenanceMode, e.target.value)}
                                            className="w-full h-24 bg-white/50 border border-border rounded-2xl p-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all"
                                            placeholder="Descreva o motivo da manutenção..."
                                        />
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    <button
                                        onClick={() => setMaintenanceMode(!isMaintenanceMode, maintenanceMessage)}
                                        className={`w-20 h-10 rounded-full relative transition-all duration-500 ${isMaintenanceMode ? 'bg-amber-500' : 'bg-slate-300'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-lg transition-transform duration-500 ${isMaintenanceMode ? 'translate-x-10' : ''} flex items-center justify-center`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${isMaintenanceMode ? 'bg-amber-500' : 'bg-slate-300'}`} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40 grayscale pointer-events-none">
                            <div className="bg-card border border-border p-6 rounded-3xl space-y-3">
                                <div className="p-3 bg-muted rounded-xl w-fit"><Zap className="w-4 h-4" /></div>
                                <h4 className="font-black text-xs uppercase italic">Flush Cache</h4>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed">Limpar memória temporária do servidor</p>
                            </div>
                            <div className="bg-card border border-border p-6 rounded-3xl space-y-3">
                                <div className="p-3 bg-muted rounded-xl w-fit"><Wrench className="w-4 h-4" /></div>
                                <h4 className="font-black text-xs uppercase italic">Debug Mode</h4>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase leading-relaxed">Habilitar logs avançados no console</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderImportSection = () => {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-card border border-border rounded-[40px] p-8 md:p-12 soft-shadow">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Importação em Lote</h2>
                            <p className="text-muted-foreground text-sm font-medium">Insira o JSON oficial seguindo o schema QRUB MASTER.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Área Prova (Opcional)</label>
                                <select
                                    value={selectedSpecialty}
                                    onChange={(e) => {
                                        setSelectedSpecialty(e.target.value)
                                        setSelectedSubspecialty('')
                                        setSelectedSubject('')
                                    }}
                                    className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                                >
                                    <option value="">Detectar Automático</option>
                                    {MEDICAL_HIERARCHY[0].specialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Subárea (Opcional)</label>
                                <select
                                    value={selectedSubspecialty}
                                    onChange={(e) => {
                                        setSelectedSubspecialty(e.target.value)
                                        setSelectedSubject('')
                                    }}
                                    disabled={!selectedSpecialty}
                                    className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <option value="">Detectar Automático</option>
                                    {activeSpecialty?.subspecialties.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Tema (Opcional)</label>
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    disabled={!selectedSubspecialty}
                                    className="w-full h-14 bg-muted/50 border border-border rounded-2xl px-5 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer disabled:opacity-50"
                                >
                                    <option value="">Detectar Automático</option>
                                    {activeSubspecialty?.subjects.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">JSON das Questões</label>
                            <textarea
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                className="w-full h-80 bg-muted/30 border-2 border-dashed border-border rounded-[32px] p-8 font-mono text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                placeholder='[ { "id": "...", "area": { ... }, "subarea": { ... }, "tema": { ... }, "enunciado": "...", ... } ]'
                            />
                        </div>

                        <button
                            onClick={handleManualImportSave}
                            disabled={loadingManual || !jsonInput.trim()}
                            className="w-full bg-[#1A1033] text-white py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                        >
                            {loadingManual ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-6 h-6" />}
                            PROCESSAR E SALVAR LOTE
                        </button>
                    </div>
                </div>

                {importStatus && (
                    <div className={`p-6 rounded-3xl border ${importStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-rose-500/10 border-rose-500/20 text-rose-600'} flex items-center gap-4 animate-in zoom-in-95`}>
                        {importStatus.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        <p className="font-black uppercase text-[10px] tracking-widest flex-1">{importStatus.msg}</p>
                        <button onClick={() => setImportStatus(null)} className="p-2 hover:bg-black/5 rounded-xl"><X className="w-4 h-4" /></button>
                    </div>
                )}
            </div>
        )
    }

    // Real Demographic Stats
    const stats = useMemo(() => {
        const total = realUsers.length
        const premium = realUsers.filter(u => u.plan_level === 'PREMIUM' || u.plan_level === 'INSANO').length
        const free = total - premium
        const admins = realUsers.filter(u => u.role === 'MASTER').length

        // Mocking inactive for now as we don't have last_login, but making it proportional
        const inactive = realUsers.filter(u => {
            const lastUpdate = u.created_at ? new Date(u.created_at) : new Date()
            const daysSince = (new Date().getTime() - lastUpdate.getTime()) / (1000 * 3600 * 24)
            return daysSince > 14
        }).length

        return {
            total,
            premium,
            free,
            admins,
            inactive,
            premiumPct: total > 0 ? Math.round((premium / total) * 100) : 0,
            freePct: total > 0 ? Math.round((free / total) * 100) : 0
        }
    }, [realUsers])

    const active7d = useMemo(() => {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        const uniqueUsers = new Set(responses.filter(r => new Date(r.timestamp) > weekAgo).map(r => r.user_id))
        return uniqueUsers.size
    }, [responses])

    // Global performance metrics from all user responses (requires global fetching)
    const names = useMemo(() => {
        const specs: Record<string, string> = {}
        const subs: Record<string, string> = {}
        COURSES.forEach(c => {
            c.specialties.forEach(s => {
                specs[s.id] = s.name
                s.subspecialties.forEach(sub => {
                    subs[sub.id] = sub.name
                })
            })
        })
        return { specs, subs }
    }, [])

    const globalPerformance = useMemo(() => {
        if (responses.length === 0) return { accuracy: 0, bySpecialty: [], bySubject: [] }

        const totalResp = responses.length
        const accuracy = Math.round((responses.filter(r => r.is_correct).length / totalResp) * 100)

        // Grouping
        const specs: Record<string, { total: number, errors: number }> = {}
        const subjects: Record<string, { total: number, errors: number }> = {}

        responses.forEach(r => {
            if (!specs[r.specialty_id]) specs[r.specialty_id] = { total: 0, errors: 0 }
            specs[r.specialty_id].total++
            if (!r.is_correct) specs[r.specialty_id].errors++

            if (r.subject_id) {
                if (!subjects[r.subject_id]) subjects[r.subject_id] = { total: 0, errors: 0 }
                subjects[r.subject_id].total++
                if (!r.is_correct) subjects[r.subject_id].errors++
            }
        })

        const bySpecialty = Object.entries(specs)
            .map(([id, s]) => ({
                name: names.specs[id] || id,
                errorRate: Math.round((s.errors / s.total) * 100)
            }))
            .sort((a, b) => b.errorRate - a.errorRate)
            .slice(0, 3)

        const bySubject = Object.entries(subjects)
            .map(([id, s]) => ({
                name: names.subs[id] || id,
                errorRate: Math.round((s.errors / s.total) * 100)
            }))
            .sort((a, b) => b.errorRate - a.errorRate)
            .slice(0, 3)

        return { accuracy, bySpecialty, bySubject }
    }, [responses, names])


    useEffect(() => {
        loadUsers()
        loadAllResponses()
    }, [loadUsers, loadAllResponses])

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 50

    // Filtered questions
    const filteredQuestions = useMemo(() => {
        return questions.filter(q => q.enunciado.toLowerCase().includes(searchTerm.toLowerCase()))
    }, [questions, searchTerm])

    // Question counts by specialty
    const countsBySpecialty = useMemo(() => {
        const counts: Record<string, number> = {}
        questions.forEach(q => {
            counts[q.specialty_id] = (counts[q.specialty_id] || 0) + 1
        })
        return counts
    }, [questions])

    // Pagination Logic
    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage)
    const paginatedQuestions = filteredQuestions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // Reset page when search changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    // Load questions from IndexedDB on mount
    useEffect(() => {
        loadQuestions()
        loadReports()
    }, [])


    // Protection Logic
    useEffect(() => {
        if (isAuthenticated && user?.role !== 'MASTER') {
            router.push('/dashboard')
        }
    }, [isAuthenticated, user, router])

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingQuestion, setEditingQuestion] = useState<Partial<Question> | null>(null)

    const handleOpenEditor = (q?: Question) => {
        setEditingQuestion(q || {
            id: `QRUB-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            enunciado: '',
            options: [
                { id: 'a', text: '' },
                { id: 'b', text: '' },
                { id: 'c', text: '' },
                { id: 'd', text: '' },
                { id: 'e', text: '' },
            ],
            correct_option_id: 'a',
            explanation: '',
            alternative_explanations: {},
            subject_id: '',
            specialty_id: '',
            subspecialty_id: '',
            course_id: COURSES[0].id
        })
        setIsEditModalOpen(true)
    }

    const [selectedCourse, setSelectedCourse] = useState(COURSES[0].id)
    const [selectedSpecialty, setSelectedSpecialty] = useState('')
    const [selectedSubspecialty, setSelectedSubspecialty] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [customSubspecialty, setCustomSubspecialty] = useState('')
    const [customSubject, setCustomSubject] = useState('')
    const [selectedDifficulty, setSelectedDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil' | 'RANDOM'>('RANDOM')
    const [selectedBatchSize, setSelectedBatchSize] = useState(500)

    const activeCourse = MEDICAL_HIERARCHY[0]
    const activeSpecialty = activeCourse?.specialties.find(s => s.id === selectedSpecialty)
    const activeSubspecialty = activeSpecialty?.subspecialties.find(sub => sub.id === selectedSubspecialty)


    const handleManualImportSave = async () => {
        if (!jsonInput.trim()) {
            alert('Cole o JSON gerado antes de salvar.')
            return
        }

        setLoadingManual(true)
        try {
            const rawJson = jsonInput.trim()
            // Tenta limpar markdown se o usuário colou com ```json
            const cleanJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim()
            const parsed = JSON.parse(cleanJson)

            const questionsToSave = Array.isArray(parsed) ? parsed : (parsed.questions || [parsed])

            const convertedBatch: Question[] = questionsToSave.map((q: any) => {
                // Tenta extrair ID de objetos ou strings do JSON
                const jsonSpecialty = typeof q.area === 'object' ? q.area.id : (q.specialty || q.area)
                const jsonSubspecialty = typeof q.subarea === 'object' ? q.subarea.id : (q.subspecialty || q.subarea)
                const jsonSubject = typeof q.tema === 'object' ? q.tema.id : (q.tema || q.subject)

                return {
                    id: q.id?.startsWith('QRB') ? q.id : `QRUB-MANUAL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                    course_id: selectedCourse,
                    specialty_id: (jsonSpecialty || selectedSpecialty || 'clinica-medica').toLowerCase().replace(/\s+/g, '-'),
                    subspecialty_id: jsonSubspecialty || selectedSubspecialty || 'geral',
                    subject_id: jsonSubject || selectedSubject || 'geral',
                    difficulty: q.dificuldade || 'Médio',
                    enunciado: q.question_text || q.enunciado,
                    comando: q.comando || '',
                    options: (q.option_a || q.alternativas) ? [
                        { id: 'a', text: q.option_a || (q.alternativas?.[0]?.texto || '') },
                        { id: 'b', text: q.option_b || (q.alternativas?.[1]?.texto || '') },
                        { id: 'c', text: q.option_c || (q.alternativas?.[2]?.texto || '') },
                        { id: 'd', text: q.option_d || (q.alternativas?.[3]?.texto || '') },
                        { id: 'e', text: q.option_e || (q.alternativas?.[4]?.texto || '') },
                    ].filter(opt => opt.text) : [],
                    correct_option_id: (q.correct_answer || q.gabarito || 'a').toLowerCase(),
                    explanation: q.explanation || q.justificativa_gabarito || 'Importado manualmente.',
                    alternative_explanations: q.por_que_nao_as_outras || {},
                    tag_transversal: q.tag_transversal || [],
                    status_validacao: q.status_validacao || 'PENDENTE',
                    erros_graves: q.erros_graves || [],
                    exam_type: q.exam_type,
                    year: q.year,
                    source: q.source,
                    metadata: { ...q.metadata, data_importacao: new Date().toISOString() }
                }
            })

            const { success, message } = await addQuestions(convertedBatch)
            if (success) {
                setImportStatus({ type: 'success', msg: `✅ ${convertedBatch.length} questões importadas com sucesso!` })
                setJsonInput('')
                loadQuestions()
            } else {
                throw new Error(message)
            }
        } catch (error: any) {
            alert('Erro no formato do JSON: ' + error.message)
            setImportStatus({ type: 'error', msg: 'Erro no JSON: ' + error.message })
        } finally {
            setLoadingManual(false)
        }
    }

    const handleExportUsers = () => {
        const ws = XLSX.utils.json_to_sheet(filteredUsers.map((u: any) => ({
            ID: u.id,
            Nome: u.name,
            Email: u.email,
            Telefone: u.phone || '',
            Instituição: u.institution || '',
            Ano: u.graduation_year || '',
            Plano: u.plan_level,
            "Data Cadastro": u.joined_at
        })))
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Alunos")
        XLSX.writeFile(wb, `Relatorio_Alunos_QRub_${new Date().toISOString().split('T')[0]}.xlsx`)
    }

    const handlePlanChange = async (userId: string, newPlan: PlanLevel) => {
        await updateUserPlan(userId, newPlan)
    }

    const handleToggleQuestion = (id: string) => {
        setSelectedQuestions(prev =>
            prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
        )
    }

    const handleToggleAll = () => {
        if (selectedQuestions.length === questions.length) {
            setSelectedQuestions([])
        } else {
            setSelectedQuestions(questions.map(q => q.id))
        }
    }

    const handleBulkApprove = async () => {
        if (selectedQuestions.length === 0) return
        if (confirm(`✅ Aprovar ${selectedQuestions.length} questões selecionadas?`)) {
            setLoadingManual(true)
            const batch = questions
                .filter(q => selectedQuestions.includes(q.id))
                .map(q => ({ ...q, status_validacao: 'APROVADA' as const }))
            const res = await addQuestions(batch)
            if (res.success) {
                setImportStatus({ type: 'success', msg: `✅ ${selectedQuestions.length} questões confirmadas!` })
                setSelectedQuestions([])
                loadQuestions()
            }
            setLoadingManual(false)
        }
    }

    const handleBulkReject = async () => {
        if (selectedQuestions.length === 0) return
        if (confirm(`❌ Reprovar ${selectedQuestions.length} questões selecionadas?`)) {
            setLoadingManual(true)
            const batch = questions
                .filter(q => selectedQuestions.includes(q.id))
                .map(q => ({ ...q, status_validacao: 'REPROVADA' as const }))
            const res = await addQuestions(batch)
            if (res.success) {
                setImportStatus({ type: 'success', msg: `❌ ${selectedQuestions.length} questões arquivadas.` })
                setSelectedQuestions([])
                loadQuestions()
            }
            setLoadingManual(false)
        }
    }

    const handleBulkDelete = async () => {
        if (selectedQuestions.length === 0) return
        if (confirm(`⚠️ ATENÇÃO: Tem certeza que deseja DELETAR PERMANENTEMENTE ${selectedQuestions.length} questões?`)) {
            try {
                const res = await deleteQuestions(selectedQuestions)
                if (res.success) {
                    setSelectedQuestions([])
                    await loadQuestions()
                    alert(`✅ ${res.message}`)
                } else {
                    alert(`❌ Erro: ${res.message}`)
                }
            } catch (error: any) {
                console.error('Error deleting questions:', error)
                alert(`❌ Erro crítico: ${error.message || 'Falha desconhecida'}`)
            }
        }
    }

    const handleDeleteSingleQuestion = async (id: string) => {
        if (confirm('🗑️ Deseja excluir esta questão do banco de dados?')) {
            try {
                const res = await deleteQuestion(id)
                if (res.success) {
                    await loadQuestions()
                } else {
                    alert(`❌ Não foi possível excluir: ${res.message}`)
                }
            } catch (error: any) {
                console.error('Error deleting question:', error)
                alert(`❌ Erro ao deletar: ${error.message}`)
            }
        }
    }



    const handleValidateJSON = async () => {
        try {
            const parsed = JSON.parse(jsonInput)

            // Validação básica de estrutura
            if (!Array.isArray(parsed)) {
                setImportStatus({ type: 'error', msg: '❌ Erro: O JSON deve ser um array de questões.' })
                return
            }

            // Validar campos obrigatórios
            for (let i = 0; i < parsed.length; i++) {
                const q = parsed[i]
                if (!q.id || !q.enunciado || !q.options || !q.correct_option_id) {
                    setImportStatus({ type: 'error', msg: `❌ Erro na questão ${i + 1}: Campos obrigatórios faltando (id, enunciado, options, correct_option_id).` })
                    return
                }
            }

            // Se passou, salvar
            await addQuestions(parsed)
            const newTotal = questions.length + parsed.length
            setImportStatus({ type: 'success', msg: `✅ ${parsed.length} questões validadas e salvas! Total no banco: ${newTotal}.` })
        } catch (error: any) {
            setImportStatus({ type: 'error', msg: `❌ JSON Inválido: ${error.message}` })
        }
    }

    const handleDownloadBackup = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2))
        const downloadAnchorNode = document.createElement('a')
        downloadAnchorNode.setAttribute("href", dataStr)
        downloadAnchorNode.setAttribute("download", `BACKUP_QRUB_QUESTOES_${new Date().toISOString().split('T')[0]}.json`)
        document.body.appendChild(downloadAnchorNode)
        downloadAnchorNode.click()
        downloadAnchorNode.remove()
    }

    const handleRestoreBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()
        if (e.target.files && e.target.files[0]) {
            fileReader.readAsText(e.target.files[0], "UTF-8")
            fileReader.onload = async (e) => {
                if (e.target?.result) {
                    try {
                        const parsed = JSON.parse(e.target.result as string)
                        if (Array.isArray(parsed)) {
                            if (confirm(`Deseja restaurar ${parsed.length} questões? Isso irá ADICIONAR ao banco atual.`)) {
                                await addQuestions(parsed)
                                alert('Backup restaurado com sucesso!')
                            }
                        } else {
                            alert('Arquivo inválido. Deve ser um array de questões JSON.')
                        }
                    } catch (error) {
                        alert('Erro ao ler arquivo JSON.')
                    }
                }
            }
        }
    }

    if (user?.role !== 'MASTER') return null

    return (
        <div className="space-y-10 relative">
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-card border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl p-10 relative"
                        >
                            <button onClick={() => setIsEditModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-muted rounded-full transition-all">
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-primary/10 p-3 rounded-2xl text-primary"><Edit2 className="w-6 h-6" /></div>
                                <div>
                                    <h2 className="text-3xl font-black italic uppercase tracking-tighter">Editor de Questão Master</h2>
                                    <p className="text-sm font-medium text-muted-foreground">Configure os enunciados, imagens e revisões do Dr. QRub.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Enunciado da Questão</label>
                                        <textarea
                                            value={editingQuestion?.enunciado}
                                            onChange={(e) => setEditingQuestion({ ...editingQuestion, enunciado: e.target.value })}
                                            className="w-full h-32 bg-muted border border-border rounded-2xl p-4 font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                            placeholder="Descreva o caso clínico..."
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Comando da Pergunta</label>
                                            <div className="flex gap-1">
                                                {(['PENDENTE', 'APROVADA', 'REPROVADA'] as const).map(s => (
                                                    <button
                                                        key={s}
                                                        onClick={() => setEditingQuestion({ ...editingQuestion, status_validacao: s })}
                                                        className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase transition-all ${editingQuestion?.status_validacao === s ? (s === 'APROVADA' ? 'bg-emerald-500 text-white' : s === 'REPROVADA' ? 'bg-red-500 text-white' : 'bg-primary text-white') : 'bg-muted text-muted-foreground'}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <input
                                            type="text"
                                            value={editingQuestion?.comando}
                                            onChange={(e) => setEditingQuestion({ ...editingQuestion, comando: e.target.value })}
                                            className="w-full bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                            placeholder="Ex: Qual o diagnóstico mais provável?"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">URL da Imagem (ECG, Tomografia, etc.)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={editingQuestion?.image_url}
                                                onChange={(e) => setEditingQuestion({ ...editingQuestion, image_url: e.target.value })}
                                                className="flex-1 bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                                placeholder="https://..."
                                            />
                                        </div>
                                        {editingQuestion?.image_url && (
                                            <div className="mt-2 relative group rounded-2xl overflow-hidden border border-border">
                                                <img src={editingQuestion.image_url} className="w-full h-32 object-cover" alt="Preview" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-white text-[10px] font-black uppercase">Preview Ativo</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Especialidade</label>
                                            <select
                                                value={editingQuestion?.specialty_id}
                                                onChange={(e) => setEditingQuestion({ ...editingQuestion, specialty_id: e.target.value })}
                                                className="w-full bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                            >
                                                {activeCourse?.specialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subespecialidade</label>
                                                <input
                                                    type="text"
                                                    list="subspecialties-list"
                                                    value={editingQuestion?.subspecialty_id}
                                                    onChange={(e) => setEditingQuestion({ ...editingQuestion, subspecialty_id: e.target.value })}
                                                    className="w-full bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                                    placeholder="Escolha ou digite nova..."
                                                />
                                                <datalist id="subspecialties-list">
                                                    {activeCourse?.specialties.find(s => s.id === editingQuestion?.specialty_id)?.subspecialties.map(sub => (
                                                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                                                    ))}
                                                </datalist>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assunto</label>
                                                <input
                                                    type="text"
                                                    list="subjects-list"
                                                    value={editingQuestion?.subject_id}
                                                    onChange={(e) => setEditingQuestion({ ...editingQuestion, subject_id: e.target.value })}
                                                    className="w-full bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                                    placeholder="Escolha ou digite novo..."
                                                />
                                                <datalist id="subjects-list">
                                                    {activeCourse?.specialties
                                                        .find(s => s.id === editingQuestion?.specialty_id)
                                                        ?.subspecialties.find(ss => ss.id === editingQuestion?.subspecialty_id)
                                                        ?.subjects.map(subj => (
                                                            <option key={subj.id} value={subj.id}>{subj.name}</option>
                                                        ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Link de Revisão</label>
                                            <input
                                                type="text"
                                                value={editingQuestion?.revision_link}
                                                onChange={(e) => setEditingQuestion({ ...editingQuestion, revision_link: e.target.value })}
                                                className="w-full bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                                placeholder="Link p/ Dr. QRub"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ID Correto</label>
                                            <select
                                                value={editingQuestion?.correct_option_id}
                                                onChange={(e) => setEditingQuestion({ ...editingQuestion, correct_option_id: e.target.value })}
                                                className="w-full bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                            >
                                                {['a', 'b', 'c', 'd', 'e'].map(id => <option key={id} value={id}>{id.toUpperCase()}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Alternativas</label>
                                    <div className="space-y-3">
                                        {editingQuestion?.options?.map((opt, i) => (
                                            <div key={opt.id} className="flex gap-3 items-center">
                                                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black uppercase shrink-0">{opt.id}</span>
                                                <input
                                                    type="text"
                                                    value={opt.text}
                                                    onChange={(e) => {
                                                        const newOpts = [...(editingQuestion?.options || [])]
                                                        newOpts[i].text = e.target.value
                                                        setEditingQuestion({ ...editingQuestion, options: newOpts })
                                                    }}
                                                    className="flex-1 bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                                    placeholder={`Texto da alternativa ${opt.id.toUpperCase()}...`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Nova Seção: Fundamentação Técnica */}
                            <div className="mt-8 pt-8 border-t border-border space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="bg-amber-400/10 p-2 rounded-xl text-amber-500"><Sparkles className="w-5 h-5" /></div>
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter">Fundamentação Técnica</h3>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Explicação Principal (Resposta Correta)</label>
                                    <textarea
                                        value={editingQuestion?.explanation || ''}
                                        onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                                        className="w-full h-32 bg-muted border border-border rounded-2xl p-4 font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                        placeholder="Descreva a lógica clínica e a diretriz utilizada..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {['a', 'b', 'c', 'd', 'e'].map((id) => (
                                        <div key={id} className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                <span className="w-4 h-4 rounded bg-muted flex items-center justify-center text-[8px]">{id.toUpperCase()}</span>
                                                Erro da Alternativa
                                            </label>
                                            <textarea
                                                value={editingQuestion?.alternative_explanations?.[id] || ''}
                                                onChange={(e) => {
                                                    const currentExps = editingQuestion?.alternative_explanations || {}
                                                    setEditingQuestion({
                                                        ...editingQuestion,
                                                        alternative_explanations: {
                                                            ...currentExps,
                                                            [id]: e.target.value
                                                        }
                                                    })
                                                }}
                                                className="w-full h-24 bg-muted/50 border border-border rounded-xl p-3 font-medium text-xs focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                                placeholder={`Por que a alternativa ${id.toUpperCase()} está incorreta?`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 pt-8 border-t border-border flex justify-end gap-4">
                                <button onClick={() => setIsEditModalOpen(false)} className="px-8 py-3 rounded-xl font-bold text-muted-foreground hover:bg-muted transition-all uppercase text-xs tracking-widest">Cancelar</button>
                                <button onClick={async () => {
                                    if (editingQuestion) {
                                        setLoadingManual(true)
                                        try {
                                            const result = await addQuestion(editingQuestion as Question)
                                            if (result.success) {
                                                setImportStatus({ type: 'success', msg: '✅ Questão salva com sucesso no Supabase!' })
                                                setIsEditModalOpen(false)
                                            } else {
                                                setImportStatus({ type: 'error', msg: `❌ Erro: ${result.message}` })
                                            }
                                        } catch (error) {
                                            console.error('Save error:', error)
                                        } finally {
                                            setLoadingManual(false)
                                        }
                                    }
                                }} className="royal-gradient text-white px-10 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50" disabled={loadingManual}>
                                    {loadingManual ? 'Salvando...' : 'Salvar Questão'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Admin Header */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                        <ShieldCheck className="w-10 h-10 text-primary" />
                        Master Control
                    </h1>
                    <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.2em] opacity-60">
                        Whitelist: {user?.email}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 p-1.5 bg-muted rounded-2xl w-fit">
                    <NavBtn active={view === 'analytics'} onClick={() => setView('analytics')} icon={<BarChart3 className="w-4 h-4" />} label="Stats" />
                    <NavBtn active={view === 'questions'} onClick={() => setView('questions')} icon={<Database className="w-4 h-4" />} label="Banco" />
                    <NavBtn active={view === 'validation'} onClick={() => setView('validation')} icon={<ShieldCheck className="w-4 h-4" />} label="Validação" />
                    <NavBtn active={view === 'structural'} onClick={() => setView('structural')} icon={<Sparkles className="w-4 h-4" />} label="Gerador" />
                    <NavBtn active={view === 'import'} onClick={() => setView('import')} icon={<Upload className="w-4 h-4" />} label="Import" />
                    <NavBtn active={view === 'reports'} onClick={() => setView('reports')} icon={<AlertCircle className="w-4 h-4" />} label="Regulação" />
                    <NavBtn active={view === 'users'} onClick={() => setView('users')} icon={<Users className="w-4 h-4" />} label="Alunos" />
                    <NavBtn active={view === 'settings'} onClick={() => setView('settings')} icon={<Settings className="w-4 h-4" />} label="Ajustes" />
                </div>

                <div className="flex gap-3">
                    <Link href="/admin/finance">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500/10 transition-all border border-emerald-500/20">
                            <DollarSign className="w-4 h-4" />
                            Financeiro
                        </button>
                    </Link>
                </div>
            </header>

            {/* View Content */}
            <AnimatePresence mode="wait">
                {view === 'questions' && (
                    <motion.div key="q" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard label="Total Questões" value={questions.length} color="text-primary" icon={<Database className="w-4 h-4" />} />
                            <StatCard label="Especialidades" value="12" color="text-blue-500" icon={<BookOpen className="w-4 h-4" />} />
                            <StatCard label="Questões com Flag" value={questions.filter(q => q.status === 'flagged').length} color="text-orange-500" icon={<Flag className="w-4 h-4" />} />
                            <StatCard label="Erros Reportados" value={reports.filter(r => r.status === 'pending').length} color="text-rose-500" icon={<AlertCircle className="w-4 h-4" />} />

                        </div>

                        <div className="bg-card border border-border rounded-[32px] overflow-hidden soft-shadow">
                            <div className="p-8 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center">
                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Filtrar por enunciado ou ID..."
                                        className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button onClick={() => handleOpenEditor()} className="bg-primary text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all">
                                    Nova Questão Manual
                                </button>
                            </div>

                            {/* Backup Controls */}
                            <div className="px-8 py-4 border-b border-border bg-muted/20 flex gap-4 items-center">
                                <button onClick={handleDownloadBackup} className="text-xs font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2">
                                    <Database className="w-3 h-3" /> Fazer Backup (JSON)
                                </button>
                                <div className="h-4 w-px bg-border" />
                                <label className="text-xs font-black uppercase tracking-widest text-emerald-500 hover:underline flex items-center gap-2 cursor-pointer">
                                    <Upload className="w-3 h-3" /> Restaurar Backup
                                    <input type="file" accept=".json" onChange={handleRestoreBackup} className="hidden" />
                                </label>
                            </div>
                            {selectedQuestions.length > 0 && (
                                <div className="bg-destructive/10 border border-destructive/20 rounded-2xl px-6 py-4 flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold text-destructive">
                                        {selectedQuestions.length} questões selecionadas
                                    </span>
                                    <button
                                        onClick={handleBulkDelete}
                                        className="flex items-center gap-2 bg-destructive text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-destructive/90 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Deletar Selecionadas
                                    </button>
                                </div>
                            )}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-muted/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        <tr>
                                            <th className="px-4 py-6 w-12">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedQuestions.length === questions.length && questions.length > 0}
                                                    onChange={handleToggleAll}
                                                    className="w-4 h-4 rounded border-border"
                                                />
                                            </th>
                                            <th className="px-8 py-6">Questão / ID</th>
                                            <th className="px-8 py-6">Especialidade / Assunto</th>
                                            <th className="px-8 py-6 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {paginatedQuestions.map(q => (
                                            <tr key={q.id} className="hover:bg-muted/10 transition-colors group">
                                                <td className="px-4 py-6">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedQuestions.includes(q.id)}
                                                        onChange={() => handleToggleQuestion(q.id)}
                                                        className="w-4 h-4 rounded border-border"
                                                    />
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="font-bold line-clamp-1 max-w-md group-hover:text-primary transition-all">{q.enunciado}</div>
                                                    <div className="text-[10px] font-mono text-muted-foreground italic uppercase flex items-center gap-2">
                                                        {q.id}
                                                        {q.image_url && <span className="text-[8px] bg-primary/20 text-primary px-1 rounded">IMAGE</span>}
                                                        {q.status === 'flagged' && <span className="text-[8px] bg-rose-500/20 text-rose-500 px-1 rounded flex items-center gap-1 font-black"><AlertCircle className="w-2.5 h-2.5" /> FLAG</span>}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex gap-2">
                                                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">{q.specialty_id}</span>
                                                        <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">{q.subject_id}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => handleOpenEditor(q)} className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                                                        <button onClick={() => handleDeleteSingleQuestion(q.id)} className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Footer */}
                            <div className="p-4 border-t border-border flex items-center justify-between">
                                <div className="text-xs font-medium text-muted-foreground">
                                    Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, filteredQuestions.length)} de {filteredQuestions.length} questões
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="text-xs font-black px-2">{currentPage} / {totalPages || 1}</span>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                        className="p-2 rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'users' && (
                    <motion.div key="u" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                label="Alunos Totais"
                                value={realUsers.length}
                                sub="+12 hoje"
                                color="text-emerald-500"
                                icon={<Users className="w-4 h-4" />}
                                onClick={() => setUserFilter('all')}
                                active={userFilter === 'all'}
                            />
                            <StatCard
                                label="Plano Insano"
                                value={realUsers.filter((u: any) => u.plan_level === 'INSANO').length}
                                color="text-orange-500"
                                icon={<Crown className="w-4 h-4" />}
                                onClick={() => setUserFilter('insano')}
                                active={userFilter === 'insano'}
                            />
                            <StatCard
                                label="Plano Premium"
                                value={realUsers.filter((u: any) => u.plan_level === 'PREMIUM').length}
                                color="text-primary"
                                icon={<Star className="w-4 h-4" />}
                                onClick={() => setUserFilter('premium')}
                                active={userFilter === 'premium'}
                            />
                            <StatCard
                                label="Cadastro Incompleto"
                                value={realUsers.filter((u: any) => !u.institution || !u.graduation_year).length}
                                color="text-rose-500"
                                icon={<AlertCircle className="w-4 h-4" />}
                                onClick={() => setUserFilter('incomplete')}
                                active={userFilter === 'incomplete'}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="relative w-full md:w-96 flex items-center">
                                <Search className="absolute left-4 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Procurar aluno por nome ou email..."
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.target.value)}
                                    className="w-full bg-card border border-border rounded-2xl py-3 pl-12 pr-4 text-xs font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                                {userFilter !== 'all' && (
                                    <button
                                        onClick={() => setUserFilter('all')}
                                        className="px-4 py-3 bg-muted text-muted-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-muted/80 border border-border flex items-center gap-2"
                                    >
                                        <X className="w-3 h-3" /> Limpar Filtro
                                    </button>
                                )}
                                {selectedUserIds.length > 0 && (
                                    <button
                                        onClick={handleBulkUserDelete}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-rose-500/20 whitespace-nowrap"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                        Excluir ({selectedUserIds.length})
                                    </button>
                                )}
                                <button
                                    onClick={handleExportUsers}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-emerald-500/20 whitespace-nowrap"
                                >
                                    <Database className="w-3 h-3" />
                                    Exportar XLs
                                </button>
                                <button
                                    onClick={() => loadUsers()}
                                    className="p-3 bg-muted/30 rounded-2xl hover:bg-muted/50 transition-all border border-border"
                                    title="Atualizar Lista"
                                >
                                    <RefreshCw className={`w-4 h-4 text-muted-foreground ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-[32px] overflow-hidden soft-shadow">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-muted/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        <tr>
                                            <th className="px-4 py-6 text-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                                                    checked={filteredUsers.length > 0 && selectedUserIds.length === filteredUsers.length}
                                                    onChange={(e) => {
                                                        if (e.target.checked) setSelectedUserIds(filteredUsers.map(u => u.id))
                                                        else setSelectedUserIds([])
                                                    }}
                                                />
                                            </th>
                                            <th className="px-4 py-6">Aluno</th>
                                            <th className="px-8 py-6">Formação</th>
                                            <th className="px-8 py-6">Plano</th>
                                            <th className="px-8 py-6 text-right">Controle Master</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-20 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Carregando alunos...</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : filteredUsers.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground uppercase text-xs font-black tracking-widest">
                                                    Nenhum aluno encontrado
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredUsers.map(u => (
                                                <tr key={u.id} className={`${selectedUserIds.includes(u.id) ? 'bg-primary/5' : ''} hover:bg-muted/10 transition-colors`}>
                                                    <td className="px-4 py-6 text-center">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
                                                            checked={selectedUserIds.includes(u.id)}
                                                            onChange={() => {
                                                                setSelectedUserIds(prev =>
                                                                    prev.includes(u.id) ? prev.filter(id => id !== u.id) : [...prev, u.id]
                                                                )
                                                            }}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-6">
                                                        <div className="font-bold flex items-center gap-2">
                                                            {u.name}
                                                            <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                                        </div>
                                                        <div className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                                                            <Mail className="w-3 h-3" /> {u.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 text-xs font-bold">
                                                                <BookOpen className="w-3 h-3 text-primary" /> {u.institution || 'N/A'}
                                                            </div>
                                                            <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase font-black">
                                                                <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {u.graduation_year || 'N/A'}</span>
                                                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {u.phone || 'N/A'}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <PlanBadge plan={u.plan_level} />
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            {['FREE', 'PREMIUM', 'INSANO'].map(p => (
                                                                <button
                                                                    key={p}
                                                                    onClick={() => updateUserPlan(u.id, p as PlanLevel)}
                                                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${u.plan_level === p ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'}`}
                                                                >
                                                                    {p}
                                                                </button>
                                                            ))}
                                                            <button
                                                                onClick={() => {
                                                                    if (confirm('Deseja excluir este usuário?')) deleteUser(u.id)
                                                                }}
                                                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all ml-2"
                                                                title="Excluir Usuário"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'reports' && (
                    <motion.div key="r" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="bg-card border border-border rounded-[32px] overflow-hidden soft-shadow">
                            <div className="p-8 border-b border-border bg-muted/20">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2 text-rose-500">
                                    <AlertCircle className="w-5 h-5" /> Fila de Regulação Médica
                                </h3>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">Analise os erros reportados pelos alunos e corrija as questões.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-muted/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        <tr>
                                            <th className="px-8 py-6">ID Questão</th>
                                            <th className="px-8 py-6">Tipo</th>
                                            <th className="px-8 py-6">Descrição</th>
                                            <th className="px-8 py-6 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {reports.map(r => (
                                            <tr key={r.id} className="hover:bg-rose-500/5 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="font-mono text-[10px] font-black">{r.question_id}</div>
                                                    <div className="text-[8px] text-muted-foreground">{new Date(r.created_at).toLocaleString()}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="bg-rose-500/10 text-rose-500 px-2 py-1 rounded text-[8px] font-black uppercase">{r.type}</span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="text-sm font-medium">{r.description}</div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={async () => {
                                                                const q = questions.find(qst => qst.id === r.question_id)
                                                                if (q) handleOpenEditor(q)
                                                            }}
                                                            className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase hover:bg-primary/20 transition-all"
                                                        >
                                                            Editar Questão
                                                        </button>
                                                        <button
                                                            onClick={() => updateReportStatus(r.id, 'resolved')}
                                                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase hover:bg-emerald-500/20 transition-all"
                                                        >
                                                            Resolvido
                                                        </button>
                                                        <button
                                                            onClick={() => updateReportStatus(r.id, 'dismissed')}
                                                            className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-[10px] font-black uppercase hover:bg-muted/80 transition-all"
                                                        >
                                                            Dispensar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {reports.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-8 py-20 text-center">
                                                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                                                    <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Tudo limpo! Sem pendências de regulação.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'structural' && renderStructuralGenerator()}
                {view === 'validation' && renderValidationQueue()}
                {view === 'import' && renderImportSection()}
                {view === 'settings' && renderSettingsSection()}



                {view === 'analytics' && (
                    <motion.div
                        key="a"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-10"
                    >
                        {/* 🔝 SEÇÃO 1 – SAÚDE DA PLATAFORMA */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                label="Usuários Totais"
                                value={realUsers.length.toLocaleString('pt-BR')}
                                sub={`+${realUsers.filter(u => {
                                    const d = u.created_at ? new Date(u.created_at) : new Date();
                                    return d.toDateString() === new Date().toDateString();
                                }).length} hoje`}
                                color="text-primary"
                                icon={<Users className="w-5 h-5" />}
                            />
                            <StatCard
                                label="Ativos (7 Dias)"
                                value={active7d.toString()}
                                sub={`${stats.total > 0 ? Math.round((active7d / stats.total) * 100) : 0}% do total`}
                                color="text-emerald-500"
                                icon={<Activity className="w-5 h-5" />}
                            />
                            <StatCard
                                label="Questões no Banco"
                                value={questions.length.toLocaleString('pt-BR')}
                                sub={`${questions.filter(q => q.status_validacao === 'PENDENTE').length} pendentes`}
                                color="text-blue-500"
                                icon={<Database className="w-5 h-5" />}
                            />
                            <StatCard
                                label="Acertos Global"
                                value={`${globalPerformance.accuracy}%`}
                                sub="Média de todos alunos"
                                color="text-orange-500"
                                icon={<Target className="w-5 h-5" />}
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* 📊 SEÇÃO 2 – ENGAJAMENTO REAL */}
                            <section className="lg:col-span-2 bg-card glass-card border border-border/50 rounded-[40px] p-8 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-black italic uppercase tracking-tighter">Engajamento de Guerra</h4>
                                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex gap-3 items-center">
                                        <Zap className="w-5 h-5 text-primary shrink-0" />
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed">
                                            Insight: <span className="text-primary">&quot;60% dos usuários saem antes da 3ª questão&quot;</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={[
                                            { name: 'Seg', online: 400, real: 240 },
                                            { name: 'Ter', online: 300, real: 139 },
                                            { name: 'Qua', online: 200, real: 980 },
                                            { name: 'Qui', online: 278, real: 390 },
                                            { name: 'Sex', online: 189, real: 480 },
                                            { name: 'Sab', online: 239, real: 380 },
                                            { name: 'Dom', online: 349, real: 430 },
                                        ]}>
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900 }} />
                                            <YAxis hide />
                                            <Tooltip contentStyle={{ backgroundColor: '#1A1033', border: 'none', borderRadius: '12px' }} />
                                            <Bar dataKey="online" fill="rgba(109,40,217,0.2)" radius={[6, 6, 0, 0]} />
                                            <Bar dataKey="real" fill="#6D28D9" radius={[6, 6, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-muted/30 rounded-2xl">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Tempo Médio/Sessão</p>
                                        <p className="text-2xl font-black italic">14m 32s</p>
                                    </div>
                                    <div className="p-4 bg-muted/30 rounded-2xl border border-rose-500/10">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Sessões Abandonadas</p>
                                        <p className="text-2xl font-black italic text-rose-500">22%</p>
                                    </div>
                                </div>
                            </section>

                            {/* 🧠 SEÇÃO 3 – USO DO GERADOR */}
                            <section className="bg-card glass-card border border-border/50 rounded-[40px] p-8 space-y-6">
                                <h4 className="text-xl font-black italic uppercase tracking-tighter">Motor Dr. QRub</h4>
                                <div className="space-y-4">
                                    <GenStat label="Geradas Hoje" value={questions.filter(q => {
                                        const d = q.created_at ? new Date(q.created_at) : new Date();
                                        return d.toDateString() === new Date().toDateString();
                                    }).length.toString()} />
                                    <GenStat label="Aguardando Validação" value={questions.filter(q => q.status_validacao === 'PENDENTE').length.toString()} />
                                    <GenStat label="Taxa de Erro Reportado" value={reports.length > 0 ? `${Math.round((reports.length / questions.length) * 100)}%` : '0%'} color="text-emerald-500" />
                                    <GenStat label="Temas Cobertos" value={new Set(questions.map(q => q.subject_id)).size.toString()} />
                                    <div className="pt-6 mt-6 border-t border-border flex justify-between items-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Custo Indireto</p>
                                        <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[9px] font-black">BAIXO</span>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* 🚨 SEÇÃO 4 – ALERTAS DO SISTEMA */}
                            <section className="bg-card glass-card border border-border/50 rounded-[40px] p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-black italic uppercase tracking-tighter">Alertas Prioritários</h4>
                                    <AlertCircle className="w-5 h-5 text-rose-500" />
                                </div>
                                <div className="space-y-4">
                                    <AlertItem type="critical" msg="Erro de geração: Lote #492 falhou" time="Há 2m" />
                                    <AlertItem type="warning" msg="Inconsistência de salvamento detected" time="Há 14m" />
                                    <AlertItem type="info" msg="Tela branca evitada: Hydration Fix" time="Há 45m" />
                                    <AlertItem type="warning" msg="14 usuários sem retorno (Free Trial)" time="Há 1h" />
                                </div>
                            </section>

                            {/* 🧩 SEÇÃO 7 – CONTROLE OPERACIONAL */}
                            <section className="bg-card glass-card border border-border/50 rounded-[40px] p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-black italic uppercase tracking-tighter">Protocolo de Operação</h4>
                                    <ShieldCheck className="w-5 h-5 text-primary opacity-40" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <OpButton icon={<Sparkles className="w-4 h-4" />} label="Forçar Lote" desc="Geração Massiva" />
                                    <OpButton icon={<RefreshCw className="w-4 h-4" />} label="Limpar Cache" desc="Redis / Vercel" />
                                    <OpButton icon={<Database className="w-4 h-4" />} label="Métricas" desc="Reprocessar" />
                                    <OpButton icon={<Settings className="w-4 h-4" />} label="Avançado" desc="Painel Raw" primary />
                                </div>
                            </section>
                        </div>

                        {/* 👥 SEÇÃO 5 – USUÁRIOS SUMMARY */}
                        <section className="bg-card glass-card border border-border/50 rounded-[40px] overflow-hidden">
                            <div className="p-8 border-b border-border flex justify-between items-center">
                                <h4 className="text-xl font-black italic uppercase tracking-tighter">Demografia da Elite</h4>
                                <div className="flex gap-4">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase leading-none">Inativos {'>'} 14 dias</p>
                                        <p className="text-xl font-black italic text-rose-500">{stats.inactive} usuários</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                                <UserQuickStat label="Total Cadastrados" value={stats.total.toLocaleString('pt-BR')} />
                                <UserQuickStat label="Premium" value={stats.premium.toLocaleString('pt-BR')} sub={`${stats.premiumPct}%`} />
                                <UserQuickStat label="Free" value={stats.free.toLocaleString('pt-BR')} sub={`${stats.freePct}%`} />
                                <UserQuickStat label="Admins" value={stats.admins.toString()} sub="Master/Ops" />
                            </div>
                        </section>

                        {/* 📈 SEÇÃO 6 – PERFORMANCE EDUCACIONAL */}
                        <div className="bg-card glass-card border border-border/50 rounded-[40px] p-10 space-y-8">
                            <h4 className="text-xl font-black italic uppercase tracking-tight">Métricas Globais de Domínio</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                <div className="space-y-6">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Áreas mais Erradas</p>
                                    {globalPerformance.bySpecialty.length > 0 ? globalPerformance.bySpecialty.map((s, i) => (
                                        <ThemeBar key={s.name} label={s.name} percent={s.errorRate} color={i === 0 ? "bg-rose-500" : i === 1 ? "bg-orange-500" : "bg-rose-400"} />
                                    )) : (
                                        <p className="text-xs text-muted-foreground italic">Sem dados suficientes...</p>
                                    )}
                                </div>
                                <div className="space-y-6">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Temas Críticos (Global)</p>
                                    {globalPerformance.bySubject.length > 0 ? globalPerformance.bySubject.map((s, i) => (
                                        <ThemeBar key={s.name} label={s.name} percent={s.errorRate} color="bg-primary" />
                                    )) : (
                                        <p className="text-xs text-muted-foreground italic">Sem dados suficientes...</p>
                                    )}
                                </div>
                                <div className="flex flex-col items-center justify-center p-8 bg-muted/20 rounded-[35px] border border-white/5">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-4">Média de Acertos Geral</p>
                                    <h3 className="text-7xl font-black italic text-primary">{globalPerformance.accuracy}%</h3>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase mt-4">Padrão de aprovação: 70%</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
                {/* Import view removed */}
            </AnimatePresence>

            <QuestionPreviewModal
                isOpen={!!previewQuestion}
                onClose={() => setPreviewQuestion(null)}
                question={previewQuestion}
            />
        </div>
    )
}

function NavBtn({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:bg-white/5'}`}
        >
            {icon}
            {label}
        </button>
    )
}

function StatCard({ label, value, sub, color, icon, alert, onClick, active }: { label: string, value: string | number, sub?: string, color: string, icon?: React.ReactNode, alert?: boolean, onClick?: () => void, active?: boolean }) {
    return (
        <div
            onClick={onClick}
            className={`bg-card border ${alert ? 'border-rose-500/30 bg-rose-500/5' : active ? 'border-primary ring-2 ring-primary/20' : 'border-border'} rounded-[32px] p-8 soft-shadow group hover:border-primary/30 transition-all relative overflow-hidden ${onClick ? 'cursor-pointer hover:bg-muted/5' : ''}`}
        >
            {alert && <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 blur-2xl -translate-y-1/2 translate-x-1/2" />}
            <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                {icon && <div className={`${color} opacity-40`}>{icon}</div>}
            </div>
            <h3 className={`text-4xl font-black italic tracking-tighter ${color}`}>{value}</h3>
            {sub && <p className="text-[10px] font-bold text-muted-foreground uppercase mt-2">{sub}</p>}
        </div>
    )
}

function GenStat({ label, value, color = "text-foreground" }: { label: string, value: string, color?: string }) {
    return (
        <div className="flex justify-between items-center p-4 bg-muted/20 rounded-2xl border border-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</span>
            <span className={`text-sm font-black italic ${color}`}>{value}</span>
        </div>
    )
}

function AlertItem({ type, msg, time }: { type: 'critical' | 'warning' | 'info', msg: string, time: string }) {
    const colors = {
        critical: 'border-rose-500/20 bg-rose-500/5 text-rose-500',
        warning: 'border-amber-500/20 bg-amber-500/5 text-amber-500',
        info: 'border-blue-500/20 bg-blue-500/5 text-blue-500'
    }
    return (
        <div className={`flex items-center justify-between p-4 rounded-2xl border ${colors[type]}`}>
            <span className="text-[10px] font-black uppercase tracking-tight">{msg}</span>
            <span className="text-[9px] font-bold opacity-60 uppercase whitespace-nowrap">{time}</span>
        </div>
    )
}

function OpButton({ icon, label, desc, primary }: { icon: React.ReactNode, label: string, desc: string, primary?: boolean }) {
    return (
        <button className={`p-4 rounded-[24px] border border-border flex flex-col gap-2 text-left transition-all hover:scale-[1.02] active:scale-95 group ${primary ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' : 'bg-muted/30 hover:bg-muted/50'}`}>
            <div className={`${primary ? 'text-white' : 'text-primary'} mb-1`}>{icon}</div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-tighter leading-none">{label}</p>
                <p className={`text-[8px] font-bold uppercase opacity-60 group-hover:opacity-100 ${primary ? 'text-white' : 'text-muted-foreground'}`}>{desc}</p>
            </div>
        </button>
    )
}

function UserQuickStat({ label, value, sub }: { label: string, value: string, sub?: string }) {
    return (
        <div className="p-8 text-center md:text-left">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">{label}</p>
            <div className="flex items-baseline gap-2 justify-center md:justify-start">
                <h3 className="text-3xl font-black italic tracking-tighter">{value}</h3>
                {sub && <span className="text-[10px] font-black text-primary uppercase">{sub}</span>}
            </div>
        </div>
    )
}

function ThemeBar({ label, percent, color }: { label: string, percent: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span>{label}</span>
                <span>{percent}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    )
}

function PlanBadge({ plan }: { plan: PlanLevel }) {
    if (plan === 'INSANO') return <span className="inline-flex items-center gap-1 bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded-full text-[10px] font-black uppercase"><Crown className="w-3 h-3" /> INSANO</span>
    if (plan === 'PREMIUM') return <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-[10px] font-black uppercase"><Star className="w-3 h-3" /> PREMIUM</span>
    return <span className="inline-flex items-center gap-1 bg-muted text-muted-foreground px-3 py-1.5 rounded-full text-[10px] font-black uppercase">FREE</span>
}

