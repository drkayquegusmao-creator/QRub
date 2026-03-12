"use client"

import { useState, useEffect, useMemo, useRef } from 'react'
import {
    Plus, Search, Edit2, Trash2, Users, Crown, Star,
    RefreshCw, Database, BarChart3, Upload, CheckCircle2, XCircle,
    AlertCircle, History, ExternalLink, Mail, Phone, BookOpen, GraduationCap, Sparkles, X, ShieldCheck, DollarSign, Settings, ArrowLeft,
    Activity, Target, Zap, Clock, TrendingUp, ChevronLeft, ChevronRight, Flag, Hammer, Wrench, ShieldAlert, Paperclip, Network, Eye, MessageSquare, ClipboardCheck, Package, Building2
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQuestions as useQuestionsStore } from '@/store/use-questions'
import { COURSES, QUESTIONS, Question } from '@/lib/data-mock'
import { useAuth, PlanLevel, UserRole } from '@/store/use-auth'
import { useUserDb } from '@/store/use-user-db'
import { useModeration } from '@/store/use-moderation'
import { useQuiz } from '@/store/use-quiz'
import { useSupport } from '@/store/use-support'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
// Removed AI Prompt imports

import { motion, AnimatePresence } from 'framer-motion'
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line
} from 'recharts'
import * as XLSX from 'xlsx'
import { useSystem } from '@/store/use-system'
import { generateStructuralQuestion } from '@/lib/generators/structural-engine'
import { MEDICAL_LIBRARY } from '@/lib/generators/medical-library'
import AdminPackagesManager from '@/components/admin-packages-manager'
import { MEDICAL_HIERARCHY } from '@/lib/medical-specialties'
import { QuestionPreviewModal } from '@/components/question-preview-modal'
import { QuestionsBreakdownModal } from '@/components/questions-breakdown-modal'
import { UserAnalysisModal } from '@/components/user-analysis-modal'
import TaxonomyEditor from '@/components/admin-taxonomy-editor'
import { useTaxonomy } from '@/store/use-taxonomy'

export default function AdminDashboard() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { questions, totalCount, currentPage: storePage, deleteQuestion, deleteQuestions, addQuestion, addQuestions, loadQuestions, fetchAllQuestions, loading } = useQuestionsStore()
    const { users: realUsers, loadUsers, updateUserPlan, updateUserRole, deleteUser, deleteUsers } = useUserDb()
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

    const { reports, loadReports, updateReportStatus, loading: reportsLoading } = useModeration()
    const { responses, load_all_responses: loadAllResponses } = useQuiz()
    const { taxonomy, loadTaxonomy, loading: taxonomyLoading } = useTaxonomy()
    const { createTicket, sendMessage, tickets, fetchTickets } = useSupport()

    // QRUB MASTER - Structural State
    const [view, setViewInternal] = useState<'questions' | 'users' | 'analytics' | 'reports' | 'import' | 'structural' | 'validation' | 'settings' | 'taxonomy' | 'packages'>('analytics')
    const { isMaintenanceMode, maintenanceMessage, setMaintenanceMode, openaiApiKey, setOpenaiApiKey } = useSystem()
    const [generationMode, setGenerationMode] = useState<'structural' | 'ai'>('structural')
    const [generationQuantity, setGenerationQuantity] = useState(1)
    const [structuralArea, setStructuralArea] = useState('')
    const [structuralSubarea, setStructuralSubarea] = useState('')
    const [structuralTema, setStructuralTema] = useState('')
    const [validationFilter, setValidationFilter] = useState<'PENDENTE' | 'APROVADA' | 'REPROVADA'>('PENDENTE')
    const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null)
    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab && ['analytics', 'questions', 'users', 'reports', 'import', 'structural', 'validation', 'settings', 'taxonomy', 'packages'].includes(tab)) {
            setViewInternal(tab as any)
        }
    }, [searchParams])
    const [isBreakdownOpen, setIsBreakdownOpen] = useState(false)
    const [analysisUserId, setAnalysisUserId] = useState<string | null>(null)
    const [currentReportId, setCurrentReportId] = useState<string | null>(null)

    const setView = (newView: string) => {
        setViewInternal(newView as any)
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', newView)
        router.push(`/admin?${params.toString()}`, { scroll: false })
    }

    useEffect(() => {
        loadUsers()
        loadReports()
        loadQuestions()
        loadTaxonomy()
        fetchTickets()
        loadAllResponses()
    }, [])

    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab && ['questions', 'users', 'analytics', 'reports', 'import', 'structural', 'validation', 'settings', 'taxonomy', 'packages'].includes(tab)) {
            setViewInternal(tab as any)
        } else if (!tab) {
            setViewInternal('analytics')
        }
    }, [searchParams])

    const [searchTerm, setSearchTerm] = useState('')
    const [jsonInput, setJsonInput] = useState('')
    const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null)
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
    const [loadingManual, setLoadingManual] = useState(false)
    const [userFilter, setUserFilter] = useState<'all' | 'insano' | 'premium' | 'incomplete' | 'active-today'>('all')
    const [userSearch, setUserSearch] = useState('')
    const [languageSuggestions, setLanguageSuggestions] = useState<any[]>([])
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
    const [isStepReviewing, setIsStepReviewing] = useState(false)
    const [jsonError, setJsonError] = useState<{ line: number, message: string } | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    const handleJsonScroll = () => {
        if (textareaRef.current && overlayRef.current) {
            overlayRef.current.scrollTop = textareaRef.current.scrollTop
        }
    }

    const dynamicHierarchy = useMemo(() => {
        // Use database taxonomy as primary source
        if (taxonomy && taxonomy.length > 0) {
            const course = taxonomy.find(t => t.level === 'course' || t.slug === 'medicina')
            if (course && course.children) {
                // Return specialties for a course
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

        // Fallback to static if DB is empty (should not happen after setup)
        return MEDICAL_HIERARCHY[0].specialties
    }, [taxonomy])

    // QRUB MASTER - Logic
    // QRUB MASTER - Logic
    const handleStructuralGenerate = async () => {
        if (!structuralArea) {
            alert('Selecione ao menos a Área da Prova.')
            return
        }

        const areaObj = dynamicHierarchy.find((s: any) => s.id === structuralArea)
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
            reloadCurrentPage()
        } else {
            setImportStatus({ type: 'error', msg: `❌ Erro ao salvar: ${result.message}` })
        }
        setLoadingManual(false)
    }

    const handleAIGenerate = async () => {
        if (!openaiApiKey) {
            alert('Configure a OpenAI API Key em Ajustes primeiro.')
            setView('settings')
            return
        }
        if (!structuralArea) {
            alert('Selecione ao menos a Área da Prova.')
            return
        }

        const areaObj = dynamicHierarchy.find((s: any) => s.id === structuralArea)
        const subareaObj = areaObj?.subspecialties.find((sub: any) => sub.id === structuralSubarea)
        const temaObj = subareaObj?.subjects.find((t: any) => t.id === structuralTema)

        setLoadingManual(true)
        let totalCreated = 0

        try {
            for (let i = 0; i < generationQuantity; i++) {
                setImportStatus({ type: 'success', msg: `⏳ Gerando questão ${i + 1} de ${generationQuantity}...` })

                const response = await fetch('/api/ai/generate-question', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        apiKey: openaiApiKey,
                        especialidade: areaObj?.name || 'Medicina Geral',
                        subespecialidade: subareaObj?.name || 'Detectar Automático',
                        tema: temaObj?.name || 'Detectar Automático'
                    })
                })

                const data = await response.json()
                if (!response.ok) throw new Error(data.error || 'Erro na geração IA')

                const alternatives = [
                    { id: 'a', text: data.alternativas.A },
                    { id: 'b', text: data.alternativas.B },
                    { id: 'c', text: data.alternativas.C },
                    { id: 'd', text: data.alternativas.D },
                    { id: 'e', text: data.alternativas.E },
                ]

                const normalizedJustificativas: Record<string, string> = {}
                if (data.justificativas_incorretas) {
                    Object.entries(data.justificativas_incorretas).forEach(([key, val]) => {
                        normalizedJustificativas[key.toLowerCase()] = val as string
                    })
                }

                // IA results hierarchy
                const finalSubName = data.subespecialidade || 'Pneumologia'
                const finalTemaName = data.tema || 'Geral'
                const finalAreaName = data.especialidade || areaObj?.name || 'Clínica Médica'

                const aiQuestion: Question = {
                    id: crypto.randomUUID(),
                    course_id: 'medicina',
                    // Use names as IDs if IDs are not found to ensure visibility in dynamic lists
                    area_id: areaObj?.id || finalAreaName.toLowerCase().replace(/\s+/g, '-'),
                    subarea_id: finalSubName.toLowerCase().replace(/\s+/g, '-'),
                    tema_id: finalTemaName.toLowerCase().replace(/\s+/g, '-'),
                    specialty_id: areaObj?.id || finalAreaName.toLowerCase().replace(/\s+/g, '-'),
                    subspecialty_id: finalSubName,
                    subject_id: finalTemaName,
                    difficulty: data.nivel_dificuldade === 'moderado' ? 'Médio' : 'Difícil',
                    enunciado: data.enunciado,
                    comando: "Qual a conduta mais adequada?",
                    options: alternatives,
                    correct_option_id: data.resposta_correta.toLowerCase(),
                    explanation: data.justificativa_correta,
                    alternative_explanations: normalizedJustificativas,
                    image_description: data.descricao_imagem,
                    fonte: 'ia',
                    status_validacao: 'PENDENTE',
                    created_at: new Date().toISOString(),
                    metadata: {
                        especialidade: finalAreaName,
                        subespecialidade: finalSubName,
                        tema: finalTemaName
                    }
                }

                const result = await addQuestion(aiQuestion)
                if (result.success) {
                    totalCreated++
                } else {
                    console.error('Erro ao salvar IA:', result.message)
                }
            }

            if (totalCreated > 0) {
                setImportStatus({ type: 'success', msg: `🚀 IA Gerou ${totalCreated} questões com sucesso!` })
                reloadCurrentPage()
            }
        } catch (error: any) {
            setImportStatus({ type: 'error', msg: `❌ Erro IA: ${error.message}` })
        } finally {
            setLoadingManual(false)
        }
    }

    const filteredUsers = useMemo(() => {
        return realUsers.filter(u => {
            const matchesFilter =
                userFilter === 'insano' ? u.plan_level === 'INSANO' :
                    userFilter === 'premium' ? u.plan_level === 'PREMIUM' :
                        userFilter === 'incomplete' ? (!u.institution || !u.graduation_year) :
                            userFilter === 'active-today' ? (() => {
                                const startOfToday = new Date()
                                startOfToday.setHours(0, 0, 0, 0)

                                const last = u.updated_at ? new Date(u.updated_at) : (u.last_sign_in_at ? new Date(u.last_sign_in_at) : null)
                                if (last && last.getTime() >= startOfToday.getTime()) return true

                                const recentResponse = responses.find(r => r.user_id === u.id && new Date(r.timestamp).getTime() >= startOfToday.getTime())
                                return !!recentResponse
                            })() :
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

    const handleBulkAIGenerate = async (target: 'specialty' | 'subspecialty') => {
        if (!confirm(`Isso irá gerar ${generationQuantity} questões para CADA ${target === 'specialty' ? 'especialidade' : 'subespecialidade'} encontrada. Continuar?`)) return

        setLoadingManual(true)
        let totalCreated = 0

        try {
            const targets: { area: string, sub: string, tema: string }[] = []
            if (target === 'specialty') {
                dynamicHierarchy.forEach((s: any) => targets.push({ area: s.name, sub: 'Detectar Automático', tema: 'Detectar Automático' }))
            } else {
                dynamicHierarchy.forEach((s: any) => {
                    s.subspecialties.forEach((sub: any) => {
                        targets.push({ area: s.name, sub: sub.name, tema: 'Detectar Automático' })
                    })
                })
            }

            for (const t of targets) {
                for (let i = 0; i < generationQuantity; i++) {
                    setImportStatus({ type: 'success', msg: `⏳ Gerando para ${t.area}${t.sub !== 'Detectar Automático' ? ' > ' + t.sub : ''} (${i + 1}/${generationQuantity})...` })

                    const response = await fetch('/api/ai/generate-question', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            apiKey: openaiApiKey,
                            especialidade: t.area,
                            subespecialidade: t.sub,
                            tema: t.tema
                        })
                    })

                    const data = await response.json()
                    if (!response.ok) continue

                    const alternatives = [
                        { id: 'a', text: data.alternativas.A },
                        { id: 'b', text: data.alternativas.B },
                        { id: 'c', text: data.alternativas.C },
                        { id: 'd', text: data.alternativas.D },
                        { id: 'e', text: data.alternativas.E },
                    ]

                    const normalizedJustificativas: Record<string, string> = {}
                    if (data.justificativas_incorretas) {
                        Object.entries(data.justificativas_incorretas).forEach(([key, val]) => {
                            normalizedJustificativas[key.toLowerCase()] = val as string
                        })
                    }

                    const finalSubName = data.subespecialidade || t.sub
                    const finalTemaName = data.tema || 'Geral'
                    const finalAreaName = data.especialidade || t.area

                    const aiQuestion: Question = {
                        id: crypto.randomUUID(),
                        course_id: 'medicina',
                        area_id: finalAreaName.toLowerCase().replace(/\s+/g, '-'),
                        subarea_id: finalSubName.toLowerCase().replace(/\s+/g, '-'),
                        tema_id: finalTemaName.toLowerCase().replace(/\s+/g, '-'),
                        specialty_id: finalAreaName.toLowerCase().replace(/\s+/g, '-'),
                        subspecialty_id: finalSubName,
                        subject_id: finalTemaName,
                        difficulty: data.nivel_dificuldade === 'moderado' ? 'Médio' : 'Difícil',
                        enunciado: data.enunciado,
                        comando: "Qual a conduta mais adequada?",
                        options: alternatives,
                        correct_option_id: data.resposta_correta.toLowerCase(),
                        explanation: data.justificativa_correta,
                        alternative_explanations: normalizedJustificativas,
                        image_description: data.descricao_imagem,
                        fonte: 'ia',
                        status_validacao: 'PENDENTE',
                        created_at: new Date().toISOString(),
                        metadata: {
                            especialidade: finalAreaName,
                            subespecialidade: finalSubName,
                            tema: finalTemaName
                        }
                    }

                    const result = await addQuestion(aiQuestion)
                    if (result.success) totalCreated++
                }
            }

            setImportStatus({ type: 'success', msg: `🚀 IA Gerou ${totalCreated} questões em lote com sucesso!` })
            reloadCurrentPage()
        } catch (error: any) {
            setImportStatus({ type: 'error', msg: `❌ Erro Lote IA: ${error.message}` })
        } finally {
            setLoadingManual(false)
        }
    }

    useEffect(() => {
        setSelectedUserIds([])
    }, [userFilter, userSearch])

    const renderStructuralGenerator = () => {
        const specialties = dynamicHierarchy
        const activeArea = specialties.find((s: any) => s.id === structuralArea)
        const activeSubarea = activeArea?.subspecialties.find((sub: any) => sub.id === structuralSubarea)

        return (
            <>
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
                                    Gere questões médicas baseadas em bibliotecas fixas ou utilize IA avançada.
                                    Controle total sobre a hierarquia e temas oficiais QRUB.
                                </p>
                            </div>

                            <div className="flex bg-muted/50 p-1 rounded-2xl w-fit border border-border">
                                <button
                                    onClick={() => setGenerationMode('structural')}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${generationMode === 'structural' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:bg-muted'}`}
                                >
                                    <Zap className={`w-3.5 h-3.5 inline mr-2 ${generationMode === 'structural' ? 'fill-white' : ''}`} />
                                    Estrutural (Fixo)
                                </button>
                                <button
                                    onClick={() => setGenerationMode('ai')}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${generationMode === 'ai' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground hover:bg-muted'}`}
                                >
                                    <Sparkles className={`w-3.5 h-3.5 inline mr-2 ${generationMode === 'ai' ? 'fill-white' : ''}`} />
                                    IA Generativa
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Área Prova</label>
                                    <select
                                        value={structuralArea}
                                        onChange={(e) => {
                                            setStructuralArea(e.target.value)
                                            setStructuralSubarea('')
                                            setStructuralTema('')
                                        }}
                                        className="w-full h-16 bg-muted/30 border-2 border-border rounded-2xl px-6 font-black uppercase tracking-tighter outline-none focus:border-primary/50 focus:bg-white transition-all appearance-none"
                                    >
                                        <option value="">Selecionar Área</option>
                                        {dynamicHierarchy.map((s: any) => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Subárea</label>
                                    <select
                                        value={structuralSubarea}
                                        onChange={(e) => {
                                            setStructuralSubarea(e.target.value)
                                            setStructuralTema('')
                                        }}
                                        className="w-full h-16 bg-muted/30 border-2 border-border rounded-2xl px-6 font-black uppercase tracking-tighter outline-none focus:border-primary/50 focus:bg-white transition-all appearance-none"
                                    >
                                        <option value="">{generationMode === 'ai' ? 'Detectar Automático' : 'Selecionar Subárea'}</option>
                                        {dynamicHierarchy.find((s: any) => s.id === structuralArea)?.subspecialties.map((sub: any) => (
                                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Tema</label>
                                    <select
                                        value={structuralTema}
                                        onChange={(e) => setStructuralTema(e.target.value)}
                                        className="w-full h-16 bg-muted/30 border-2 border-border rounded-2xl px-6 font-black uppercase tracking-tighter outline-none focus:border-primary/50 focus:bg-white transition-all appearance-none"
                                    >
                                        <option value="">{generationMode === 'ai' ? 'Detectar Automático' : 'Selecionar Tema'}</option>
                                        {dynamicHierarchy.find((s: any) => s.id === structuralArea)?.subspecialties.find((sub: any) => sub.id === structuralSubarea)?.subjects.map((t: any) => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {generationMode === 'ai' && (
                            <div className="space-y-4 bg-primary/5 p-8 rounded-3xl border border-primary/10 animate-in zoom-in-95">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h4 className="font-black uppercase italic text-primary">Volume de Geração</h4>
                                        <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">Escolha quantas questões deseja que a IA gere de uma vez</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-primary/20">
                                        {[1, 5, 10, 20].map(n => (
                                            <button
                                                key={n}
                                                onClick={() => setGenerationQuantity(n)}
                                                className={`w-12 h-12 rounded-xl font-black transition-all ${generationQuantity === n ? 'bg-primary text-white shadow-lg' : 'hover:bg-primary/5 text-primary'}`}
                                            >
                                                {n}
                                            </button>
                                        ))}
                                        <div className="w-px h-8 bg-primary/10 mx-2" />
                                        <input
                                            type="number"
                                            value={generationQuantity}
                                            onChange={(e) => setGenerationQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-16 h-12 bg-transparent text-center font-black text-primary outline-none"
                                            min="1"
                                            max="50"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                            <button
                                onClick={() => handleBulkAIGenerate('specialty')}
                                disabled={loadingManual || generationMode !== 'ai'}
                                className="px-6 py-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-500 hover:text-white transition-all disabled:opacity-30"
                            >
                                Gerar p/ Especialidade (Lote)
                            </button>
                            <button
                                onClick={() => handleBulkAIGenerate('subspecialty')}
                                disabled={loadingManual || generationMode !== 'ai'}
                                className="px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-30"
                            >
                                Gerar p/ Subespecialidade (Lote)
                            </button>
                        </div>

                        <button
                            onClick={generationMode === 'structural' ? handleStructuralGenerate : handleAIGenerate}
                            disabled={loadingManual || !structuralArea}
                            className="w-full royal-gradient text-white py-6 rounded-2xl font-black uppercase text-sm tracking-[0.1em] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                        >
                            {loadingManual ? <RefreshCw className="w-5 h-5 animate-spin" /> : (generationMode === 'structural' ? <Sparkles className="w-6 h-6" /> : <Zap className="w-6 h-6 fill-white" />)}
                            {generationMode === 'structural' ? 'GERAR QUESTÃO ESTRUTURAL' : 'GERAR QUESTÃO COM IA'}
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
            </>
        )
    }

    const renderValidationQueue = () => {
        const filteredQuestions = questions

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
                                onClick={() => {
                                    setValidationFilter(f);
                                    setSelectedQuestions([]);
                                    setCurrentPage(1); // Reset to first page when filter changes
                                }}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${validationFilter === f ? 'bg-white text-primary shadow-sm' : 'text-muted-foreground hover:bg-white/50'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedQuestions.length > 0 && (
                    <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 p-6 rounded-[32px] animate-in zoom-in-95 shadow-xl shadow-primary/5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black">
                                {selectedQuestions.length}
                            </div>
                            <div>
                                <p className="font-black italic uppercase text-sm text-primary">Questões Selecionadas</p>
                                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest leading-none">Ações em lote disponíveis</p>
                            </div>
                        </div>
                        <div className="flex-1" />
                        <button
                            onClick={() => setSelectedQuestions([])}
                            className="px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest text-muted-foreground hover:bg-muted transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            className="bg-rose-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-rose-500/20"
                        >
                            <Trash2 className="w-4 h-4" /> Deletar
                        </button>
                        <button
                            onClick={handleBulkApprove}
                            className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
                        >
                            <CheckCircle2 className="w-4 h-4" /> Aprovar
                        </button>
                        <button
                            onClick={handleBulkReject}
                            className="bg-rose-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-rose-500/20"
                        >
                            <XCircle className="w-4 h-4" /> Reprovar
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
                                                    if (res.success) reloadCurrentPage()
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
                                                    if (res.success) reloadCurrentPage()
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
                        <div className="grid grid-cols-1 gap-6">
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

                            <div className={`p-8 rounded-[32px] border-2 transition-all ${openaiApiKey ? 'bg-primary/5 border-primary shadow-xl shadow-primary/10' : 'bg-muted/30 border-border hover:border-primary/20'}`}>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl ${openaiApiKey ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                                            <Zap className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-1">OpenAI API Key</h3>
                                            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">Necessária para o gerador de questões IA</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Sua API Key (sk-...)</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={openaiApiKey}
                                                onChange={(e) => setOpenaiApiKey(e.target.value)}
                                                className="w-full h-14 bg-white/50 border border-border rounded-2xl px-5 font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                                            />
                                            {openaiApiKey && (
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest ml-2">A chave é salva de forma segura no banco de dados do sistema.</p>
                                    </div>
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
                                    {dynamicHierarchy.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
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
                            <div className="flex items-center justify-between ml-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">JSON das Questões</label>
                                {jsonError && (
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-rose-500 uppercase animate-pulse">
                                        <AlertCircle className="w-3 h-3" />
                                        Erro na Linha {jsonError.line}: {jsonError.message}
                                    </div>
                                )}
                            </div>
                            <div className="relative group bg-[#0F0A1E] rounded-[32px] overflow-hidden border-2 border-border/50 focus-within:border-primary/50 transition-all">
                                {/* Line numbers gutter */}
                                <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/20 border-r border-white/5 flex flex-col py-8 items-end pr-3 text-[9px] font-mono text-muted-foreground/50 select-none pointer-events-none z-20">
                                    {jsonInput.split('\n').map((_, i) => (
                                        <div key={i} className={`h-[1.35em] flex items-center ${jsonError?.line === i + 1 ? 'text-rose-500 font-bold' : ''}`}>
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>

                                <textarea
                                    ref={textareaRef}
                                    value={jsonInput}
                                    onScroll={handleJsonScroll}
                                    onChange={(e) => {
                                        setJsonInput(e.target.value)
                                        if (jsonError) setJsonError(null)
                                    }}
                                    className={`w-full h-[550px] bg-transparent pl-16 pr-8 py-8 font-mono text-[11px] leading-[1.35em] text-white focus:ring-0 outline-none transition-all resize-none relative z-10 custom-scrollbar overflow-auto placeholder:text-muted-foreground/20`}
                                    placeholder='[ { "id": "...", "enunciado": "...", ... } ]'
                                    spellCheck={false}
                                />

                                {/* Highlighter Overlay */}
                                <div
                                    ref={overlayRef}
                                    className="absolute inset-0 pl-16 pr-8 py-8 font-mono text-[11px] leading-[1.35em] pointer-events-none whitespace-pre select-none text-transparent overflow-hidden"
                                >
                                    {jsonInput.split('\n').map((line, i) => (
                                        <div
                                            key={i}
                                            className={`${jsonError?.line === i + 1 ? 'bg-rose-500/20 ring-1 ring-rose-500/50 relative after:content-["←_ERRO_AQUI"] after:absolute after:right-0 after:text-rose-400 after:text-[9px] after:font-black after:bg-rose-950/80 after:px-2 after:py-0.5 after:rounded after:border after:border-rose-500/30' : ''} h-[1.35em] flex items-center`}
                                        >
                                            {line || ' '}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleReviewLanguage}
                                disabled={isStepReviewing || !jsonInput.trim()}
                                className="flex-1 bg-primary/10 text-primary py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] border border-primary/20 hover:bg-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                            >
                                {isStepReviewing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                                REVISAR E CORRIGIR (IA)
                            </button>
                            <button
                                onClick={handleManualImportSave}
                                disabled={loadingManual || !jsonInput.trim()}
                                className="flex-1 bg-[#1A1033] text-white py-6 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                            >
                                {loadingManual ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-6 h-6" />}
                                PROCESSAR E SALVAR LOTE
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-border space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    <Zap className="w-4 h-4 fill-primary" /> Modelo Oficial QRUB
                                </h3>
                                <button
                                    onClick={() => {
                                        const model = `[
  {
    "id": "QRB-ID",
    "especialidade": "Clínica Médica",
    "subespecialidade": "Geral",
    "tema": "Geral",
    "enunciado": "Texto da questão...",
    "comando": "Pergunta da questão...",
    "alternativas": {
      "a": "Opção A",
      "b": "Opção B",
      "c": "Opção C",
      "d": "Opção D",
      "e": "Opção E"
    },
    "gabarito": "a",
    "justificativa_gabarito": "Explicação...",
    "justificativas_alternativas": {
      "a": "...",
      "b": "..."
    },
    "fonte": "importada"
  }
]`;
                                        navigator.clipboard.writeText(model);
                                        alert('Modelo copiado!');
                                    }}
                                    className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-all"
                                >
                                    Copiar Modelo
                                </button>
                            </div>
                            <pre className="bg-muted p-6 rounded-2xl text-[10px] font-mono overflow-x-auto border border-border text-muted-foreground">
                                {`[
  {
    "id": "QRB-ID",
    "especialidade": "Clínica Médica",
    "subespecialidade": "Geral",
    "tema": "Geral",
    "enunciado": "Texto da questão...",
    "comando": "Pergunta da questão...",
    "alternativas": {
      "a": "Opção A",
      "b": "Opção B",
      "c": "Opção C",
      "d": "Opção D",
      "e": "Opção E"
    },
    "gabarito": "a",
    "justificativa_gabarito": "Explicação...",
    "fonte": "importada"
  }
]`}
                            </pre>
                        </div>
                    </div>
                </div>

                {importStatus && (
                    <div className={`p-6 rounded-3xl border ${importStatus.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-rose-500/10 border-rose-500/20 text-rose-600'} flex items-center gap-4 animate-in zoom-in-95`}>
                        {importStatus.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        <div className="flex-1 flex items-center justify-between gap-4">
                            <p className="font-black uppercase text-[10px] tracking-widest">{importStatus.msg}</p>
                            {languageSuggestions.length > 0 && importStatus.type === 'success' && (
                                <button
                                    onClick={() => setIsReviewModalOpen(true)}
                                    className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all"
                                >
                                    Ver Detalhes das Alterações
                                </button>
                            )}
                        </div>
                        <button onClick={() => {
                            setImportStatus(null)
                            setLanguageSuggestions([])
                        }} className="p-2 hover:bg-black/5 rounded-xl"><X className="w-4 h-4" /></button>
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
    const itemsPerPage = 100

    // Filtered questions (apenas filtro de busca local, paginação vem do backend)
    const filteredQuestions = useMemo(() => {
        return questions
    }, [questions])

    // Question counts by specialty
    const countsBySpecialty = useMemo(() => {
        const counts: Record<string, number> = {}
        questions.forEach(q => {
            counts[q.specialty_id] = (counts[q.specialty_id] || 0) + 1
        })
        return counts
    }, [questions])

    // Pagination Logic - usa totalCount do store
    const totalPages = Math.ceil(totalCount / itemsPerPage)
    const paginatedQuestions = filteredQuestions // Já vem paginado do backend

    // Carregar nova página quando currentPage mudar
    useEffect(() => {
        console.log(`🔄 Carregando página ${currentPage}...`)
        const filters: any = { page: currentPage, pageSize: itemsPerPage, searchTerm }
        if (view === 'validation') {
            filters.status_validacao = validationFilter
        }
        loadQuestions(filters)
    }, [currentPage, view, validationFilter]) // Adicionado view e validationFilter como dependências

    // Reset page when search changes
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1)
        } else {
            const filters: any = { page: 1, pageSize: itemsPerPage, searchTerm }
            if (view === 'validation') {
                filters.status_validacao = validationFilter
            }
            loadQuestions(filters)
        }
    }, [searchTerm])

    // Helper function to reload current page
    const reloadCurrentPage = () => {
        const filters: any = { page: currentPage, pageSize: itemsPerPage, searchTerm }
        if (view === 'validation') {
            filters.status_validacao = validationFilter
        }
        loadQuestions(filters)
    }

    // Load reports on mount
    useEffect(() => {
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

    const handleOpenEditor = (q?: Question, reportId?: string) => {
        setCurrentReportId(reportId || null)
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

    const activeCourse = useMemo(() => ({
        specialties: dynamicHierarchy
    }), [dynamicHierarchy])
    const activeSpecialty = activeCourse?.specialties.find((s: any) => s.id === selectedSpecialty)
    const activeSubspecialty = activeSpecialty?.subspecialties.find((sub: any) => sub.id === selectedSubspecialty)


    const handleReviewLanguage = async () => {
        if (!jsonInput.trim()) {
            alert('Cole o JSON gerado antes de revisar.')
            return
        }

        setIsStepReviewing(true)
        setImportStatus({ type: 'success', msg: '🔍 Dr. QRub está revisando o texto e aplicando correções automáticas...' })

        try {
            const rawJson = jsonInput.trim()
            const cleanJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim()
            const parsed = JSON.parse(cleanJson)
            const questionsToReview = Array.isArray(parsed) ? [...parsed] : [...(parsed.questions || [parsed])]

            const response = await fetch('/api/ai/review-questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apiKey: openaiApiKey,
                    questions: questionsToReview
                })
            })

            const data = await response.json()
            if (data.error) throw new Error(data.error)

            if (data.suggestions && data.suggestions.length > 0) {
                // AUTO-APPLY ALL SUGGESTIONS
                data.suggestions.forEach((suggestion: any) => {
                    const q = questionsToReview[suggestion.questionIndex]
                    if (!q) return

                    if (suggestion.field.includes('justificativas_alternativas')) {
                        const fieldParts = suggestion.field.split('.')
                        if (fieldParts.length > 1) {
                            const altKey = fieldParts[1]
                            if (!q.justificativas_alternativas) q.justificativas_alternativas = {}
                            q.justificativas_alternativas[altKey] = suggestion.suggested
                        }
                    } else {
                        q[suggestion.field] = suggestion.suggested
                    }
                })

                // Update the JSON input with corrected content
                setJsonInput(JSON.stringify(questionsToReview, null, 2))
                setLanguageSuggestions(data.suggestions)

                setImportStatus({
                    type: 'success',
                    msg: `✨ Dr. QRub aplicou ${data.suggestions.length} correções automáticas! O JSON foi atualizado.`
                })

                // Still allow user to open modal to see what was changed if they wish
                // But don't force it open anymore
            } else {
                setImportStatus({ type: 'success', msg: '✅ Nenhuma correção necessária! O texto está perfeito.' })
            }
            setJsonError(null)
        } catch (error: any) {
            console.error('Review error:', error)

            // Tentar extrair linha do erro
            const posMatch = error.message.match(/position (\d+)/) || error.message.match(/at (\d+)/)
            if (posMatch) {
                const pos = parseInt(posMatch[1])
                const line = jsonInput.substring(0, pos).split('\n').length
                setJsonError({ line, message: error.message })
            } else {
                setJsonError({ line: 1, message: error.message })
            }

            setImportStatus({ type: 'error', msg: `❌ Erro na revisão: ${error.message}` })
        } finally {
            setIsStepReviewing(false)
        }
    }

    const applySuggestion = (suggestion: any) => {
        try {
            const rawJson = jsonInput.trim()
            const cleanJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim()
            const parsed = JSON.parse(cleanJson)
            const questions = Array.isArray(parsed) ? [...parsed] : [...(parsed.questions || [parsed])]

            const q = questions[suggestion.questionIndex]
            if (!q) return

            if (suggestion.field.includes('justificativas_alternativas')) {
                // Handle nested justificativas_alternativas
                const fieldParts = suggestion.field.split('.')
                if (fieldParts.length > 1) {
                    const altKey = fieldParts[1]
                    if (!q.justificativas_alternativas) q.justificativas_alternativas = {}
                    q.justificativas_alternativas[altKey] = suggestion.suggested
                }
            } else {
                q[suggestion.field] = suggestion.suggested
            }

            setJsonInput(JSON.stringify(questions, null, 2))
            setLanguageSuggestions(prev => prev.filter(s => s !== suggestion))

            if (languageSuggestions.length <= 1) {
                setIsReviewModalOpen(false)
            }
        } catch (error) {
            console.error('Error applying suggestion:', error)
        }
    }

    const applyAllSuggestions = () => {
        try {
            const rawJson = jsonInput.trim()
            const cleanJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim()
            const parsed = JSON.parse(cleanJson)
            const questions = Array.isArray(parsed) ? [...parsed] : [...(parsed.questions || [parsed])]

            languageSuggestions.forEach(suggestion => {
                const q = questions[suggestion.questionIndex]
                if (!q) return

                if (suggestion.field.includes('justificativas_alternativas')) {
                    const fieldParts = suggestion.field.split('.')
                    if (fieldParts.length > 1) {
                        const altKey = fieldParts[1]
                        if (!q.justificativas_alternativas) q.justificativas_alternativas = {}
                        q.justificativas_alternativas[altKey] = suggestion.suggested
                    }
                } else {
                    q[suggestion.field] = suggestion.suggested
                }
            })

            setJsonInput(JSON.stringify(questions, null, 2))
            setLanguageSuggestions([])
            setIsReviewModalOpen(false)
            setImportStatus({ type: 'success', msg: '✅ Todas as sugestões foram aplicadas!' })
        } catch (error) {
            console.error('Error applying all suggestions:', error)
        }
    }

    const handleManualImportSave = async () => {
        if (!jsonInput.trim()) {
            alert('Cole o JSON gerado antes de salvar.')
            return
        }

        setLoadingManual(true)
        try {
            const rawJson = jsonInput.trim()
            const cleanJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim()
            const parsed = JSON.parse(cleanJson)
            const questionsToSave = Array.isArray(parsed) ? parsed : (parsed.questions || [parsed])

            const SPECIALTY_MAP: Record<string, string> = {
                "Ginecologia e Obstetrícia": "ginecologia-obstetricia",
                "Clínica Médica": "clinica-medica",
                "Pediatria": "pediatria",
                "Cirurgia Geral": "cirurgia-geral",
                "Medicina de Família e Comunidade": "medicina-familia-comunidade",
                "Preventiva": "preventiva-social"
            }

            const convertedBatch: Question[] = normalizeQuestions(questionsToSave)
            const { success, message } = await addQuestions(convertedBatch)
            if (success) {
                setImportStatus({ type: 'success', msg: `✅ ${convertedBatch.length} questões processadas e salvas no banco!` })
                setJsonInput('')
                reloadCurrentPage()
            } else {
                throw new Error(message)
            }
        } catch (error: any) {
            console.error('Save error:', error)

            // Tentar extrair linha do erro
            const posMatch = error.message.match(/at position (\d+)/)
            if (posMatch) {
                const pos = parseInt(posMatch[1])
                const line = jsonInput.substring(0, pos).split('\n').length
                setJsonError({ line, message: error.message })
            } else {
                setJsonError({ line: 1, message: error.message })
            }

            setImportStatus({ type: 'error', msg: `❌ Erro: ${error.message}` })
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

    const handleReportResolve = async (report: any) => {
        try {
            let q = questions.find(qst => qst.id === report.question_id)
            if (!q) {
                // Try fetching from store/DB
                const { fetchQuestionById } = useQuestionsStore.getState()
                q = await fetchQuestionById(report.question_id) as Question
            }

            // 1. Update status
            const { success } = await updateReportStatus(report.id, 'resolved')
            if (!success) throw new Error("Erro ao atualizar reporte")

            // 2. Send Support Message to User (Only if user exists in DB)
            if (report.user_id) {
                const reporter = realUsers.find(u => u.id === report.user_id)

                if (reporter) {
                    const specLabel = q ? (names.specs[q.specialty_id] || q.specialty_id) : 'N/A'
                    const subLabel = q ? (names.subs[q.subspecialty_id] || q.subspecialty_id) : 'N/A'

                    const message = `Olá! 👋
Passando para avisar que o seu ajuste solicitado na questão [**${report.question_id}**] - (${specLabel} > ${subLabel}) foi analisado e **RESOLVIDO** pela nossa equipe reguladora.

Obrigado por nos ajudar a melhorar o QRub! 🚀`

                    // Find existing open ticket or create new
                    const activeTicket = tickets.filter(t => t.user_id === report.user_id).find(t => t.status !== 'closed')
                    if (activeTicket) {
                        await sendMessage(activeTicket.id, message, true)
                    } else {
                        const ticketId = await createTicket(`Ajuste de Questão: ${report.question_id}`, "Iniciando atendimento de regulação...", report.user_id)
                        if (ticketId) await sendMessage(ticketId, message, true)
                    }
                    toast.success("Problema resolvido! Agradecemos a contribuição do aluno.", {
                        duration: 5000,
                        icon: '🚀'
                    })
                } else {
                    console.warn(`Report user ${report.user_id} not found in users table. Skipping message.`)
                    toast.success("Problema resolvido conforme relatado!")
                }
            } else {
                toast.success("Problema resolvido!")
            }

            loadReports() // Refresh list
        } catch (err: any) {
            toast.error(err.message || "Erro ao resolver reporte")
        }
    }

    const handleToggleQuestion = (id: string) => {
        setSelectedQuestions(prev =>
            prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
        )
    }

    const handleToggleAll = () => {
        if (selectedQuestions.length === filteredQuestions.length) {
            setSelectedQuestions([])
        } else {
            setSelectedQuestions(filteredQuestions.map(q => q.id))
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
                reloadCurrentPage()
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
                reloadCurrentPage()
            }
            setLoadingManual(false)
        }
    }

    const handleBulkDelete = async () => {
        if (selectedQuestions.length === 0) return
        if (confirm(`⚠️ ATENÇÃO: Tem certeza que deseja DELETAR PERMANENTEMENTE ${selectedQuestions.length} questões?`)) {
            try {
                console.log(`🗑️ Cliente: Iniciando deleção em massa:`, selectedQuestions)
                const res = await deleteQuestions(selectedQuestions)
                console.log('🗑️ Cliente: Resultado da deleção em massa:', res)

                if (res.success) {
                    setSelectedQuestions([])
                    setImportStatus({ type: 'success', msg: `✅ ${selectedQuestions.length} questões removidas.` })
                    setTimeout(() => {
                        reloadCurrentPage()
                    }, 800)
                    alert(`✅ ${res.message}`)
                } else {
                    alert(`❌ Erro: ${res.message}`)
                }
            } catch (error: any) {
                console.error('🗑️ Cliente: Erro crítico na deleção em massa:', error)
                alert(`❌ Erro crítico: ${error.message || 'Falha desconhecida'}`)
            }
        }
    }

    const handleDeleteSingleQuestion = async (id: string) => {
        console.log(`🗑️ Cliente: Iniciando deleção da questão: ${id}`)
        if (window.confirm('🗑️ Deseja excluir esta questão do banco de dados?')) {
            try {
                const res = await deleteQuestion(id)
                console.log('🗑️ Cliente: Resultado da deleção:', res)

                if (res.success) {
                    setImportStatus({ type: 'success', msg: `✅ Questão ${id} removida com sucesso!` })
                    // Aguardar um pouco para o banco sincronizar antes de recarregar
                    setTimeout(() => {
                        reloadCurrentPage()
                    }, 500)
                } else {
                    alert(`❌ Erro ao deletar: ${res.message}`)
                }
            } catch (error: any) {
                console.error('🗑️ Cliente: Erro crítico ao deletar:', error)
                alert(`❌ Erro crítico: ${error.message}`)
            }
        }
    }




    const handleDownloadBackup = async () => {
        try {
            console.log('📥 Iniciando download de backup completo...')
            const allQuestions = await fetchAllQuestions()

            if (!allQuestions || allQuestions.length === 0) {
                alert('⚠️ Nenhuma questão encontrada ou erro ao carregar o banco.')
                return
            }

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allQuestions, null, 2))
            const downloadAnchorNode = document.createElement('a')
            downloadAnchorNode.setAttribute("href", dataStr)
            downloadAnchorNode.setAttribute("download", `BACKUP_QRUB_QUESTOES_${allQuestions.length}_${new Date().toISOString().split('T')[0]}.json`)
            document.body.appendChild(downloadAnchorNode)
            downloadAnchorNode.click()
            downloadAnchorNode.remove()
            console.log(`✅ Backup de ${allQuestions.length} questões concluído.`)
        } catch (error) {
            console.error('❌ Erro no backup:', error)
            alert('Erro ao gerar arquivo de backup.')
        }
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

    const normalizeQuestions = (questionsToSave: any[]): Question[] => {
        const SPECIALTY_MAP: Record<string, string> = {
            "Ginecologia e Obstetrícia": "ginecologia-obstetricia",
            "Clínica Médica": "clinica-medica",
            "Pediatria": "pediatria",
            "Cirurgia Geral": "cirurgia-geral",
            "Medicina de Família e Comunidade": "medicina-familia-comunidade",
            "Preventiva": "preventiva-social"
        }

        return questionsToSave.map((q: any) => {
            const id = q.id || `QRB-IMP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
            const rawSpec = q.especialidade || (typeof q.area === 'object' ? q.area.id : q.area)
            const rawSub = q.subespecialidade || (typeof q.subarea === 'object' ? q.subarea.id : q.subarea)
            const rawTema = q.tema || (typeof q.tema === 'object' ? q.tema.id : q.tema)

            const specialty_id = SPECIALTY_MAP[rawSpec] || (rawSpec?.toLowerCase().replace(/\s+/g, '-')) || 'clinica-medica'
            const subspecialty_id = rawSub || 'geral'
            const subject_id = rawTema || 'geral'

            let options = []
            if (q.alternativas && typeof q.alternativas === 'object' && !Array.isArray(q.alternativas)) {
                options = Object.entries(q.alternativas).map(([key, text]) => ({
                    id: key.toLowerCase(),
                    text: text as string
                }))
            } else if (Array.isArray(q.alternativas)) {
                options = q.alternativas.map((opt: any, idx: number) => ({
                    id: String.fromCharCode(97 + idx),
                    text: typeof opt === 'string' ? opt : (opt.texto || opt.text || '')
                }))
            } else if (Array.isArray(q.options)) {
                options = q.options
            }

            const correct = (q.gabarito || q.correct_option_id || q.correct_answer || 'a').toLowerCase()
            const altExps = q.alternative_explanations || q.justificativas_alternativas || q.por_que_nao_as_outras || {}
            const normalizedExps = Object.fromEntries(
                Object.entries(altExps).map(([k, v]) => [k.toLowerCase(), v])
            )

            return {
                id,
                course_id: q.course_id || 'medicina',
                specialty_id,
                subspecialty_id,
                subject_id,
                area_id: specialty_id,
                subarea_id: subspecialty_id,
                tema_id: subject_id,
                difficulty: q.difficulty || q.nivel || 'Média',
                enunciado: q.enunciado || q.question_text || '',
                comando: q.comando || '',
                options,
                correct_option_id: correct,
                explanation: q.explanation || q.explicacao_gabarito || q.justificativa_gabarito || '',
                alternative_explanations: normalizedExps,
                fonte: q.fonte || (q.origem ? 'ia' : 'importada'),
                status_validacao: q.status_validacao || 'PENDENTE',
                metadata: { ...q.metadata, import_date: new Date().toISOString() }
            } as Question
        })
    }

    const normalizeQuestionsStrict = (questionsToSave: any[], catalogs: { especialidades: any[], subespecialidades: any[], temas: any[] }): Question[] => {
        return questionsToSave.map((q: any) => {
            const id = q.id || `QRB-IMP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

            // 1. Localizar o Tema correspondente
            // APENAS IDs definem relações.
            let tema = catalogs.temas.find(t => t.id === q.tema_id)

            // Fallback: Combinação exata de IDs (especialidade + subespecialidade + tema)
            if (!tema && q.especialidade_id && q.subespecialidade_id && q.tema_id) {
                tema = catalogs.temas.find(t =>
                    t.id === q.tema_id &&
                    t.subespecialidade_id === q.subespecialidade_id
                )
            }

            const status_classificacao = tema ? 'OK' : 'PENDENTE'

            // Se encontrou tema, resolve a hierarquia absoluta
            let area_id = ''
            let subarea_id = ''
            let tema_id = q.tema_id || ''

            if (tema) {
                tema_id = tema.id
                subarea_id = tema.subespecialidade_id
                const sub = catalogs.subespecialidades.find(s => s.id === subarea_id)
                area_id = sub ? sub.especialidade_id : ''
            }

            // Normalizar alternativas
            let options = []
            if (q.alternativas && typeof q.alternativas === 'object' && !Array.isArray(q.alternativas)) {
                options = Object.entries(q.alternativas).map(([key, text]) => ({
                    id: key.toLowerCase(),
                    text: text as string
                }))
            } else if (Array.isArray(q.alternativas)) {
                options = q.alternativas.map((opt: any, idx: number) => ({
                    id: String.fromCharCode(97 + idx),
                    text: typeof opt === 'string' ? opt : (opt.texto || opt.text || '')
                }))
            } else if (Array.isArray(q.options)) {
                options = q.options
            }

            const correct = (q.gabarito || q.correct_option_id || q.correct_answer || 'a').toLowerCase()
            const altExps = q.alternative_explanations || q.justificativas_alternativas || q.por_que_nao_as_outras || {}
            const normalizedExps = Object.fromEntries(
                Object.entries(altExps).map(([k, v]) => [k.toLowerCase(), v])
            )

            // Criar objeto limpo (Removendo textos redundantes conforme Regra)
            const cleanedMetadata = { ...q.metadata }
            delete (cleanedMetadata as any).especialidade
            delete (cleanedMetadata as any).subespecialidade
            delete (cleanedMetadata as any).tema

            return {
                id,
                course_id: q.course_id || 'medicina',
                area_id,
                subarea_id,
                tema_id,
                // Proteger legados mantendo os IDs encontrados
                specialty_id: area_id,
                subspecialty_id: subarea_id,
                subject_id: tema_id,
                difficulty: q.difficulty || q.nivel || 'Média',
                enunciado: q.enunciado || q.question_text || '',
                comando: q.comando || '',
                options,
                correct_option_id: correct,
                explanation: q.explanation || q.explicacao_gabarito || q.justificativa_gabarito || '',
                alternative_explanations: normalizedExps,
                fonte: q.fonte || (q.origem ? 'ia' : 'importada'),
                status_validacao: q.status_validacao || 'PENDENTE',
                status_classificacao, // Campo obrigatório conforme regra
                metadata: { ...cleanedMetadata, import_date: new Date().toISOString() }
            } as any
        })
    }

    const handleAttachJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setLoadingManual(true)
        setImportStatus({ type: 'success', msg: '⏳ Processadora Ativa: Validando Catálogos...' })

        try {
            const fileContents: Record<string, any> = {}
            const readPromises = Array.from(files).map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = (ev) => {
                        try {
                            const content = JSON.parse((ev.target?.result as string).replace(/```json/g, '').replace(/```/g, '').trim())
                            fileContents[file.name.toLowerCase()] = content
                            resolve(true)
                        } catch (err) {
                            reject(new Error(`Erro no arquivo ${file.name}: JSON inválido`))
                        }
                    }
                    reader.readAsText(file)
                })
            })

            await Promise.all(readPromises)

            // 2. Identificar arquivos obrigatórios (Master 4) - Aceita nomes flexíveis
            const findFile = (keywords: string[]) => {
                const entry = Object.entries(fileContents).find(([name]) =>
                    keywords.some(kw => name.toLowerCase().includes(kw.toLowerCase()))
                )
                return entry ? entry[1] : null
            }

            const especialidades = findFile(['especialidade']) && !findFile(['subespecialidade'])
                ? findFile(['especialidade'])
                : Object.entries(fileContents).find(([name]) =>
                    name.toLowerCase().includes('especialidade') &&
                    !name.toLowerCase().includes('subespecialidade')
                )?.[1]

            const subespecialidades = findFile(['subespecialidade', 'subarea'])
            const temas = findFile(['tema', 'assunto'])
            const questoesRaw = findFile(['quest', 'questao', 'questoes'])

            if (!especialidades || !subespecialidades || !temas || !questoesRaw) {
                const missing = []
                if (!especialidades) missing.push('Especialidades')
                if (!subespecialidades) missing.push('Subespecialidades')
                if (!temas) missing.push('Temas')
                if (!questoesRaw) missing.push('Questões')
                throw new Error(`ESTRUTURA INCOMPLETA. Faltam arquivos: ${missing.join(', ')}.\n\nArquivos recebidos: ${Object.keys(fileContents).join(', ')}`)
            }


            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // ETAPA 1 — VALIDAR ESPECIALIDADES
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // Normalizar campos (aceita 'name' ou 'nome')
            especialidades.forEach((s: any) => {
                if (!s.name && s.nome) s.name = s.nome
            })

            const specIds = new Set()
            const specNames = new Set()
            especialidades.forEach((s: any) => {
                if (!s.id || !s.name) throw new Error(`ERRO ESTRUTURAL: Especialidade ${JSON.stringify(s)} inválida.`)
                if (specIds.has(s.id) || specNames.has(s.name)) throw new Error(`ERRO ESTRUTURAL: Duplicata na especialidade: ${s.name} (${s.id})`)
                specIds.add(s.id)
                specNames.add(s.name)
            })

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // ETAPA 2 — VALIDAR SUBESPECIALIDADES
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // Normalizar campos
            subespecialidades.forEach((sub: any) => {
                if (!sub.name && sub.nome) sub.name = sub.nome
                if (!sub.especialidade_id && sub.especialidadeId) sub.especialidade_id = sub.especialidadeId
            })

            subespecialidades.forEach((sub: any) => {
                if (!sub.especialidade_id || !specIds.has(sub.especialidade_id)) {
                    throw new Error(`ERRO ESTRUTURAL: Subespecialidade ${sub.name} vinculada a ID inexistente: ${sub.especialidade_id}`)
                }
            })
            const subIds = new Set(subespecialidades.map((s: any) => s.id))

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // ETAPA 3 — VALIDAR TEMAS
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // Normalizar campos
            temas.forEach((t: any) => {
                if (!t.name && t.nome) t.name = t.nome
                if (!t.subespecialidade_id && t.subespecialidadeId) t.subespecialidade_id = t.subespecialidadeId
            })

            temas.forEach((t: any) => {
                if (!t.subespecialidade_id || !subIds.has(t.subespecialidade_id)) {
                    throw new Error(`ERRO ESTRUTURAL: Tema ${t.name} vinculado a subespecialidade inexistente: ${t.subespecialidade_id}`)
                }
            })
            const catalogs = { especialidades, subespecialidades, temas }

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // PROCESSAMENTO DAS QUESTÕES
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            const processed = normalizeQuestionsStrict(questoesRaw, catalogs)

            const report = {
                total_questoes: processed.length,
                total_classificadas: processed.filter((q: any) => q.status_classificacao === 'OK').length,
                total_pendentes: processed.filter((q: any) => q.status_classificacao === 'PENDENTE').length,
                timestamp: new Date().toISOString()
            }

            const pendentes = processed
                .filter((q: any) => q.status_classificacao === 'PENDENTE')
                .map((q: any) => ({
                    id: q.id,
                    motivo: "Tema inexistente ou hierarquia violada no catálogo oficial."
                }))

            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            // SAÍDA OBRIGATÓRIA (3 ARQUIVOS)
            // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            const download = (obj: any, filename: string) => {
                const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = filename
                a.click()
            }

            if (confirm(`VALIDAÇÃO MASTER CONCLUÍDA:\n\n- Classificadas: ${report.total_classificadas}\n- Pendentes: ${report.total_pendentes}\n\nDeseja salvar no banco e baixar os 3 relatórios JSON?`)) {

                const toSave = processed.filter((q: any) => q.status_classificacao === 'OK')
                const { success, message } = await addQuestions(toSave)

                if (success) {
                    download(processed, 'questoes_processadas.json')
                    download(report, 'relatorio_importacao.json')
                    download(pendentes, 'pendentes.json')

                    setImportStatus({ type: 'success', msg: `✅ Importação Concluída: ${toSave.length} salvas.` })
                    reloadCurrentPage()
                } else {
                    alert(`Falha no salvamento: ${message}`)
                }
            }

        } catch (error: any) {
            console.error('Master Logic Error:', error)
            setImportStatus({ type: 'error', msg: `❌ ${error.message}` })
            alert(error.message)
        } finally {
            setLoadingManual(false)
            if (e.target) e.target.value = ''
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
                                            value={editingQuestion?.enunciado || ''}
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
                                            value={editingQuestion?.comando || ''}
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
                                                value={editingQuestion?.image_url || ''}
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
                                                value={editingQuestion?.specialty_id || ''}
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
                                                    value={editingQuestion?.subspecialty_id || ''}
                                                    onChange={(e) => setEditingQuestion({ ...editingQuestion, subspecialty_id: e.target.value })}
                                                    className="w-full bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                                    placeholder="Escolha ou digite nova..."
                                                />
                                                <datalist id="subspecialties-list">
                                                    {activeCourse?.specialties.find((s: any) => s.id === editingQuestion?.specialty_id)?.subspecialties.map((sub: any) => (
                                                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                                                    ))}
                                                </datalist>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assunto</label>
                                                <input
                                                    type="text"
                                                    list="subjects-list"
                                                    value={editingQuestion?.subject_id || ''}
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
                                                value={editingQuestion?.revision_link || ''}
                                                onChange={(e) => setEditingQuestion({ ...editingQuestion, revision_link: e.target.value })}
                                                className="w-full bg-muted border border-border rounded-xl p-3 font-bold text-sm"
                                                placeholder="Link p/ Dr. QRub"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ID Correto</label>
                                            <select
                                                value={editingQuestion?.correct_option_id || ''}
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

                                                // If we were editing from a report, resolve it
                                                if (currentReportId) {
                                                    const report = reports.find(r => r.id === currentReportId)
                                                    if (report) {
                                                        await handleReportResolve(report)
                                                    }
                                                }

                                                setIsEditModalOpen(false)
                                                setCurrentReportId(null)
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

            {/* Admin Header: Command Center (Light Mode) */}
            <header className="space-y-8 mb-12">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-100">
                    {/* Left: Identity */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 shadow-sm">
                            <ShieldCheck className="w-8 h-8 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
                                Master Control
                            </h1>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Module Links */}
                    <div className="flex flex-wrap gap-3">
                        <Link href="/admin/editais">
                            <button className="group flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#5E5CE6] hover:bg-[#5E5CE6]/5 transition-all border border-[#5E5CE6]/20 bg-white shadow-sm">
                                <ClipboardCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Editais & Caixas
                            </button>
                        </Link>
                        <Link href="/admin/pacotes">
                            <button className="group flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-purple-600 hover:bg-purple-500/5 transition-all border border-purple-500/20 bg-white shadow-sm">
                                <Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Pacotes & Deploy
                            </button>
                        </Link>
                        <Link href="/admin/finance">
                            <button className="group flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-500/5 transition-all border border-emerald-500/20 bg-white shadow-sm">
                                <DollarSign className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Financeiro Pro
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Central Navigation Tabs */}
                <div className="flex justify-center">
                    <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-50 border border-slate-200 rounded-[2rem] w-fit shadow-sm">
                        <NavBtn active={view === 'analytics'} onClick={() => setView('analytics')} icon={<BarChart3 className="w-4 h-4" />} label="Estatísticas" />
                        <div className="w-px h-4 bg-slate-200 mx-1" />
                        <NavBtn active={view === 'questions'} onClick={() => setView('questions')} icon={<Database className="w-4 h-4" />} label="Banco" />
                        <NavBtn active={view === 'validation'} onClick={() => setView('validation')} icon={<ShieldCheck className="w-4 h-4" />} label="Validação" />
                        <NavBtn active={view === 'structural'} onClick={() => setView('structural')} icon={<Sparkles className="w-4 h-4" />} label="Gerador IA" />
                        <NavBtn active={view === 'packages'} onClick={() => setView('packages')} icon={<Package className="w-4 h-4" />} label="Pacotes" />
                        <div className="w-px h-4 bg-slate-200 mx-1" />
                        <NavBtn active={view === 'import'} onClick={() => setView('import')} icon={<Upload className="w-4 h-4" />} label="Importador" />
                        <NavBtn active={view === 'reports'} onClick={() => setView('reports')} icon={<AlertCircle className="w-4 h-4" />} label="Regulação" />
                        <NavBtn active={view === 'taxonomy'} onClick={() => setView('taxonomy')} icon={<Network className="w-4 h-4" />} label="Taxonomia" />
                        <div className="w-px h-4 bg-slate-200 mx-1" />
                        <NavBtn active={view === 'users'} onClick={() => setView('users')} icon={<Users className="w-4 h-4" />} label="Alunos" />
                        <NavBtn active={view === 'settings'} onClick={() => setView('settings')} icon={<Settings className="w-4 h-4" />} label="Ajustes" />
                    </div>
                </div>
            </header>

            {/* View Content */}
            <AnimatePresence mode="wait">
                {view === 'packages' && (
                    <motion.div key="pkg" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
                        <AdminPackagesManager />
                    </motion.div>
                )}
                {view === 'questions' && (
                    <motion.div key="q" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                label="Total Questões"
                                value={totalCount}
                                color="text-primary"
                                icon={<Database className="w-4 h-4" />}
                                onClick={() => setIsBreakdownOpen(true)}
                            />
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

                            <div className="px-8 py-4 border-b border-border bg-muted/20 flex gap-4 items-center">
                                <button onClick={handleDownloadBackup} className="text-xs font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2">
                                    <Database className="w-3 h-3" /> Fazer Backup (JSON)
                                </button>
                                <div className="h-4 w-px bg-border" />
                                <label className="text-xs font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2 cursor-pointer">
                                    <Paperclip className="w-3 h-3" /> Anexar JSON (Master 4)
                                    <input type="file" accept=".json" multiple onChange={handleAttachJson} className="hidden" />
                                </label>
                                <div className="h-4 w-px bg-border" />
                                <label className="text-xs font-black uppercase tracking-widest text-emerald-500 hover:underline flex items-center gap-2 cursor-pointer">
                                    <Upload className="w-3 h-3" /> Restaurar Backup
                                    <input type="file" accept=".json" onChange={handleRestoreBackup} className="hidden" />
                                </label>
                            </div>
                            {selectedQuestions.length > 0 && (
                                <div className="mx-8 mt-4 mb-4 bg-rose-500/10 border-2 border-rose-500/20 rounded-[24px] px-8 py-5 flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-black">
                                            {selectedQuestions.length}
                                        </div>
                                        <div>
                                            <p className="font-black italic uppercase text-sm text-rose-500">Questões Selecionadas</p>
                                            <p className="text-[10px] font-bold text-rose-500/60 uppercase tracking-widest leading-none">Ações em lote disponíveis</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setSelectedQuestions([])}
                                            className="px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest text-muted-foreground hover:bg-muted transition-all"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleBulkDelete}
                                            className="flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-rose-500/20 hover:scale-[1.03] active:scale-95 transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Deletar Todas
                                        </button>
                                    </div>
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
                                    Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, totalCount)} de {totalCount} questões
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
                                label="Acessou Hoje"
                                value={realUsers.filter((u: any) => {
                                    const startOfToday = new Date()
                                    startOfToday.setHours(0, 0, 0, 0)

                                    const last = u.updated_at ? new Date(u.updated_at) : (u.last_sign_in_at ? new Date(u.last_sign_in_at) : null)
                                    if (last && last.getTime() >= startOfToday.getTime()) return true

                                    const recentResponse = responses.find(r => r.user_id === u.id && new Date(r.timestamp).getTime() >= startOfToday.getTime())
                                    return !!recentResponse
                                }).length}
                                color="text-indigo-500"
                                icon={<Zap className="w-4 h-4" />}
                                onClick={() => setUserFilter('active-today')}
                                active={userFilter === 'active-today'}
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
                                            <th className="px-8 py-6">Atividade</th>
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
                                                        <div
                                                            className="font-bold flex items-center gap-2 cursor-pointer hover:text-primary transition-colors group"
                                                            onClick={() => setAnalysisUserId(u.id)}
                                                        >
                                                            {u.name}
                                                            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
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
                                                    <td className="px-8 py-6">
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                                <Target className="w-3 h-3 text-emerald-500" />
                                                                {responses.filter(r => r.user_id === u.id).length} Qs
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                                                <Clock className="w-3 h-3 text-primary" />
                                                                {(() => {
                                                                    const userResp = responses.filter(r => r.user_id === u.id)
                                                                    // Estimativa: 30s por questão respondida
                                                                    const min = Math.round((userResp.length * 30) / 60)
                                                                    return `${min} min`
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex justify-end gap-2 items-center">
                                                            {/* ROLE TOGGLE */}
                                                            <button
                                                                onClick={() => {
                                                                    const newRole = u.role === 'MASTER' ? 'ALUNO' : 'MASTER';
                                                                    if (confirm(`Deseja alterar o acesso de ${u.name} para ${newRole}?`)) {
                                                                        updateUserRole(u.id, newRole);
                                                                    }
                                                                }}
                                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-1 border ${u.role === 'MASTER' ? 'bg-purple-900/20 text-purple-400 border-purple-500/30' : 'bg-muted text-muted-foreground border-transparent hover:bg-muted/80'}`}
                                                                title={u.role === 'MASTER' ? 'Remover Acesso Master' : 'Tornar Master'}
                                                            >
                                                                <ShieldCheck className="w-3 h-3" />
                                                                {u.role === 'MASTER' ? 'MASTER' : 'ALUNO'}
                                                            </button>

                                                            <div className="w-px h-4 bg-border mx-2" />

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
                                        {reports.filter(r => r.status === 'pending').map(r => (
                                            <tr key={r.id} className={`hover:bg-muted/10 transition-colors group ${r.question_id === 'FEEDBACK_GERAL' ? 'bg-primary/5' : ''}`}>
                                                <td
                                                    className="px-8 py-6 cursor-pointer hover:bg-muted/5 transition-all rounded-l-xl whitespace-nowrap"
                                                    onClick={async () => {
                                                        if (r.question_id === 'FEEDBACK_GERAL') return
                                                        const q = questions.find(qst => qst.id === r.question_id)
                                                        if (q) setPreviewQuestion(q)
                                                        else {
                                                            toast.error('Questão não encontrada no cache. Recarregando...')
                                                            await loadQuestions()
                                                        }
                                                    }}
                                                >
                                                    <div className="font-mono text-[10px] font-black flex items-center gap-2 group-hover:text-primary transition-colors">
                                                        {r.question_id === 'FEEDBACK_GERAL' ? (
                                                            <span className="text-primary flex items-center gap-1"><MessageSquare className="w-3 h-3" /> FEEDBACK GERAL</span>
                                                        ) : (
                                                            <>
                                                                {r.question_id}
                                                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="text-[8px] text-muted-foreground">{new Date(r.created_at).toLocaleString()}</div>
                                                </td>
                                                <td className="px-8 py-6 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded text-[8px] font-black uppercase ${r.type === 'SUGESTÃO' ? 'bg-emerald-500/10 text-emerald-500' :
                                                        r.type === 'DÚVIDA' ? 'bg-amber-500/10 text-amber-500' :
                                                            'bg-rose-500/10 text-rose-500'
                                                        }`}>
                                                        {r.type}
                                                    </span>
                                                </td>
                                                <td
                                                    className="px-8 py-6 cursor-pointer hover:bg-muted/5 transition-all"
                                                    onClick={async () => {
                                                        if (r.question_id === 'FEEDBACK_GERAL') return
                                                        const q = questions.find(qst => qst.id === r.question_id)
                                                        if (q) setPreviewQuestion(q)
                                                        else {
                                                            toast.error('Questão não encontrada no cache. Recarregando...')
                                                            await loadQuestions()
                                                        }
                                                    }}
                                                >
                                                    <div className="text-sm font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                                                        {r.description}
                                                        {r.question_id !== 'FEEDBACK_GERAL' && <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right rounded-r-xl whitespace-nowrap">
                                                    <div className="flex justify-end gap-2">
                                                        {r.question_id !== 'FEEDBACK_GERAL' && (
                                                            <>
                                                                <button
                                                                    onClick={async () => {
                                                                        let q = questions.find(qst => qst.id === r.question_id)
                                                                        if (!q) {
                                                                            const { fetchQuestionById } = useQuestionsStore.getState()
                                                                            q = await fetchQuestionById(r.question_id) as Question
                                                                        }

                                                                        if (q) handleOpenEditor(q, r.id)
                                                                        else {
                                                                            toast.error('Questão não encontrada no banco de dados.')
                                                                        }
                                                                    }}
                                                                    className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase hover:bg-primary/20 transition-all flex items-center gap-1.5"
                                                                >
                                                                    <Edit2 className="w-3 h-3" />
                                                                    Editar
                                                                </button>
                                                                <button
                                                                    onClick={async () => {
                                                                        if (confirm(`⚠️ EXCLUSÃO PERMANENTE\n\nDeseja excluir a questão ${r.question_id}?\n\nEsta ação NÃO pode ser desfeita.`)) {
                                                                            await handleDeleteSingleQuestion(r.question_id)
                                                                            await updateReportStatus(r.id, 'dismissed')
                                                                            toast.success('Questão excluída e reporte arquivado')
                                                                            loadReports()
                                                                        }
                                                                    }}
                                                                    className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase hover:bg-rose-500/20 transition-all flex items-center gap-1.5"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                    Excluir
                                                                </button>
                                                                <div className="w-px h-8 bg-border mx-1" />
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => handleReportResolve(r)}
                                                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
                                                        >
                                                            <CheckCircle2 className="w-3 h-3" />
                                                            {r.question_id === 'FEEDBACK_GERAL' ? 'Concluir' : 'Resolvido'}
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
                                        {reports.filter(r => r.status === 'pending').length === 0 && (
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
                {view === 'taxonomy' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-[calc(100vh-200px)] overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                        <TaxonomyEditor />
                    </motion.div>
                )}



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
                                sub={`+${realUsers.filter((u: any) => {
                                    const date = new Date(u.created_at || '')
                                    return date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                                }).length} esta semana`}
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
                                value={totalCount.toLocaleString('pt-BR')}
                                sub={`${questions.filter((q: any) => q.status_validacao === 'PENDENTE').length} pendentes`}
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
                            <section className="lg:col-span-2 bg-white border-2 border-slate-100 soft-shadow rounded-[40px] p-8 space-y-8">
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
                            <section className="bg-white border-2 border-slate-100 soft-shadow rounded-[40px] p-8 space-y-6">
                                <h4 className="text-xl font-black italic uppercase tracking-tighter">Motor Dr. QRub</h4>
                                <div className="space-y-4">
                                    <GenStat label="Geradas Hoje" value={questions.filter(q => {
                                        const d = q.created_at ? new Date(q.created_at) : new Date();
                                        return d.toDateString() === new Date().toDateString();
                                    }).length.toString()} />
                                    <GenStat label="Aguardando Validação" value={questions.filter((q: any) => q.status_validacao === 'PENDENTE').length.toString()} />
                                    <GenStat label="Total Questões" value={totalCount.toString()} />
                                    <GenStat label="Temas Cobertos" value={new Set(questions.map((q: any) => q.subject_id)).size.toString()} />
                                    <div className="pt-6 mt-6 border-t border-border flex justify-between items-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Custo Indireto</p>
                                        <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[9px] font-black">BAIXO</span>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* 🚨 SEÇÃO 4 – ALERTAS DO SISTEMA */}
                            <section className="bg-white border-2 border-slate-100 soft-shadow rounded-[40px] p-8 space-y-6">
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
                            <section className="bg-white border-2 border-slate-100 soft-shadow rounded-[40px] p-8 space-y-6">
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
                        <section className="bg-white border-2 border-slate-100 soft-shadow rounded-[40px] overflow-hidden">
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
                        <div className="bg-white border-2 border-slate-100 soft-shadow rounded-[40px] p-10 space-y-8">
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

            <AnimatePresence>
                {isReviewModalOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card border border-border w-full max-w-5xl max-h-[85vh] overflow-hidden rounded-[40px] shadow-2xl flex flex-col"
                        >
                            <div className="p-10 border-b border-border flex justify-between items-center bg-muted/20">
                                <div className="flex items-center gap-6">
                                    <div className="bg-primary/20 p-4 rounded-3xl text-primary animate-pulse">
                                        <Sparkles className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Sugestões do Dr. QRub</h2>
                                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Revisão ortográfica, gramatical e de clareza técnica.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={applyAllSuggestions}
                                        className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
                                    >
                                        Aceitar Todas ({languageSuggestions.length})
                                    </button>
                                    <button
                                        onClick={() => setIsReviewModalOpen(false)}
                                        className="p-3 hover:bg-muted rounded-full transition-all"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-10 space-y-8">
                                {languageSuggestions.map((suggestion, index) => (
                                    <div key={index} className="bg-muted/30 border border-border rounded-3xl overflow-hidden hover:border-primary/30 transition-all group">
                                        <div className="p-4 bg-primary/5 border-b border-border flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest bg-primary text-white px-3 py-1 rounded-full">Questão #{suggestion.questionIndex + 1}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{suggestion.field.toUpperCase()}</span>
                                            </div>
                                            <span className="text-[10px] font-bold text-primary italic uppercase">{suggestion.reason}</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                                            <div className="p-6 space-y-3">
                                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Original</p>
                                                <div className="text-sm font-medium opacity-60 line-through decoration-rose-500/50">{suggestion.original}</div>
                                            </div>
                                            <div className="p-6 space-y-3 bg-emerald-500/5">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Sugestão</p>
                                                    <button
                                                        onClick={() => applySuggestion(suggestion)}
                                                        className="text-[10px] bg-emerald-500 text-white px-3 py-1 rounded-lg hover:scale-110 transition-all shadow-md font-black"
                                                    >
                                                        Aplicar Esta
                                                    </button>
                                                </div>
                                                <div className="text-sm font-bold text-emerald-900 leading-relaxed">{suggestion.suggested}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {isBreakdownOpen && (
                <QuestionsBreakdownFetcher
                    isOpen={isBreakdownOpen}
                    onClose={() => setIsBreakdownOpen(false)}
                    fetchAll={fetchAllQuestions}
                />
            )}

            <UserAnalysisModal
                isOpen={!!analysisUserId}
                onClose={() => setAnalysisUserId(null)}
                userId={analysisUserId}
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

function QuestionsBreakdownFetcher({ isOpen, onClose, fetchAll }: { isOpen: boolean, onClose: () => void, fetchAll: () => Promise<Question[]> }) {
    const [allQs, setAllQs] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isOpen) {
            fetchAll().then(qs => {
                setAllQs(qs)
                setLoading(false)
            })
        }
    }, [isOpen, fetchAll])

    if (loading) {
        return (
            <div className="fixed inset-0 z-[11001] flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Processando Raio-X do Banco...</p>
                </div>
            </div>
        )
    }

    return (
        <QuestionsBreakdownModal
            isOpen={isOpen}
            onClose={onClose}
            questions={allQs}
        />
    )
}


