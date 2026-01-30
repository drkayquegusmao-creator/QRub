"use client"

import { useState, useEffect, useMemo } from 'react'
import {
    Plus, Search, Edit2, Trash2, Users, Crown, Star,
    RefreshCw, Database, BarChart3, Upload, CheckCircle2,
    AlertCircle, History, ExternalLink, Mail, Phone, BookOpen, GraduationCap, Sparkles, X, ShieldCheck, DollarSign, Settings, ArrowLeft,
    Activity, Target, Zap, TrendingUp, ChevronLeft, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useQuestions as useQuestionsStore } from '@/store/use-questions'
import { COURSES, QUESTIONS, Question } from '@/lib/data-mock'
import { useAuth, PlanLevel } from '@/store/use-auth'
import { useUserDb } from '@/store/use-user-db'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line
} from 'recharts'
import * as XLSX from 'xlsx'

export default function AdminDashboard() {
    const { user, isAuthenticated } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { questions, deleteQuestion, addQuestion, addQuestions, loadQuestions, loading } = useQuestionsStore()
    const { users: realUsers, loadUsers, updateUserPlan } = useUserDb()

    // Sync view with URL param 'tab'
    const [view, setViewInternal] = useState<'questions' | 'users' | 'analytics' | 'import'>('analytics')

    const setView = (newView: string) => {
        setViewInternal(newView as any)
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', newView)
        router.push(`/admin?${params.toString()}`, { scroll: false })
    }

    useEffect(() => {
        const tab = searchParams.get('tab')
        if (tab && ['questions', 'users', 'analytics', 'import'].includes(tab)) {
            setViewInternal(tab as any)
        } else if (!tab && view === 'analytics') {
            // Default if no tab
            setViewInternal('analytics')
        }
    }, [searchParams])
    const [searchTerm, setSearchTerm] = useState('')
    const [jsonInput, setJsonInput] = useState('')
    const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null)
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
    const [loadingManual, setLoadingManual] = useState(false)

    useEffect(() => {
        loadUsers()
    }, [loadUsers])

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
            subject_id: '',
            specialty_id: '',
            subspecialty_id: '',
            course_id: COURSES[0].id
        })
        setIsEditModalOpen(true)
    }

    const [selectedCourse, setSelectedCourse] = useState(COURSES[0].id)
    const [selectedSpecialty, setSelectedSpecialty] = useState(COURSES[0].specialties[0].id)
    const [selectedSubspecialty, setSelectedSubspecialty] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [customSubspecialty, setCustomSubspecialty] = useState('')
    const [customSubject, setCustomSubject] = useState('')
    const [selectedDifficulty, setSelectedDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil' | 'RANDOM'>('RANDOM')
    const [selectedBatchSize, setSelectedBatchSize] = useState(500)

    const activeCourse = COURSES.find(c => c.id === selectedCourse)
    const activeSpecialty = activeCourse?.specialties.find(s => s.id === selectedSpecialty)
    const activeSubspecialty = activeSpecialty?.subspecialties.find(sub => sub.id === selectedSubspecialty)

    const handleExportUsers = () => {
        const ws = XLSX.utils.json_to_sheet(realUsers.map((u: any) => ({
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

    const handleBulkDelete = async () => {
        if (selectedQuestions.length === 0) return
        if (confirm(`Tem certeza que deseja deletar ${selectedQuestions.length} questões selecionadas?`)) {
            try {
                await Promise.all(selectedQuestions.map(id => deleteQuestion(id)))
                setSelectedQuestions([])
                setImportStatus({ type: 'success', msg: `✅ ${selectedQuestions.length} questões deletadas com sucesso!` })
            } catch (error) {
                console.error('Error deleting questions:', error)
                setImportStatus({ type: 'error', msg: '❌ Erro ao deletar questões. Tente novamente.' })
            }
        }
    }

    const handleBatchImport = async () => {
        const targetCourse = COURSES.find(c => c.id === selectedCourse) || COURSES[0]

        let targetSpecialties = targetCourse.specialties
        if (selectedSpecialty) {
            targetSpecialties = targetSpecialties.filter(s => s.id === selectedSpecialty)
        }

        const batchSize = selectedBatchSize
        const mockGeneratedQuestions: Question[] = Array(batchSize).fill(null).map((_, i) => {
            const randomSpec = targetSpecialties[Math.floor(Math.random() * targetSpecialties.length)]

            let targetSubspecialties = (randomSpec?.subspecialties || [])
            if (selectedSubspecialty && selectedSubspecialty !== 'NEW') {
                targetSubspecialties = targetSubspecialties.filter(ss => ss.id === selectedSubspecialty)
            }
            if (targetSubspecialties.length === 0) {
                targetSubspecialties = (randomSpec?.subspecialties || []).length > 0
                    ? randomSpec.subspecialties
                    : [{ id: 'geral', name: 'Geral', subjects: [] }]
            }

            const chosenSub = selectedSubspecialty === 'NEW' && customSubspecialty
                ? { id: customSubspecialty.toLowerCase().replace(/\s+/g, '-'), name: customSubspecialty, subjects: [] }
                : (targetSubspecialties[Math.floor(Math.random() * targetSubspecialties.length)] || targetSubspecialties[0])

            let targetSubjects = (chosenSub as any).subjects || []
            if (selectedSubject && selectedSubject !== 'NEW' && targetSubjects.length > 0) {
                targetSubjects = targetSubjects.filter((s: any) => s.id === selectedSubject)
            }

            const chosenSubject = selectedSubject === 'NEW' && customSubject
                ? { id: customSubject.toLowerCase().replace(/\s+/g, '-'), name: customSubject }
                : (targetSubjects.length > 0
                    ? targetSubjects[Math.floor(Math.random() * targetSubjects.length)]
                    : { id: 'geral', name: 'Geral' })

            const age = 25 + Math.floor(Math.random() * 60)
            const gender = Math.random() > 0.5 ? 'masculino' : 'feminino'
            const genderAdj = gender === 'masculino' ? 'o' : 'a'

            // Casos clínicos densos e realistas
            const clinicalScenarios = [
                `Paciente de ${age} anos, sexo ${gender}, previamente hígid${genderAdj}, comparece ao pronto-socorro com quadro de início há 6 horas. Refere sintomatologia compatível com ${chosenSub.name}. Ao exame físico: BEG, corad${genderAdj}, hidratad${genderAdj}, acianótic${genderAdj}, anictéric${genderAdj}. PA: ${120 + Math.floor(Math.random() * 50)}/${80 + Math.floor(Math.random() * 30)} mmHg, FC: ${70 + Math.floor(Math.random() * 40)} bpm, TAX: ${(36.5 + Math.random() * 2).toFixed(1).replace('.', ',')}°C, FR: ${16 + Math.floor(Math.random() * 8)} irpm. Exames complementares evidenciam alterações compatíveis com o diagnóstico diferencial de ${chosenSubject.name}. História patológica pregressa: nega comorbidades. História familiar: pai com diagnóstico de ${randomSpec.name}. Diante do quadro, qual a conduta mais adequada?`,
                `Paciente de ${age} anos, sexo ${gender}, com história de ${chosenSub.name} há 3 meses, procura atendimento médico por piora do quadro clínico. Relata sintomas progressivos de ${chosenSubject.name}, incluindo manifestações específicas da especialidade. Ao exame: estado geral regular, sinais vitais com PA ${130 + Math.floor(Math.random() * 40)}/${85 + Math.floor(Math.random() * 25)} mmHg, FC ${75 + Math.floor(Math.random() * 35)} bpm, TAX: ${(36.5 + Math.random() * 1.5).toFixed(1).replace('.', ',')}°C. Exame físico segmentar revela achados compatíveis com a hipótese diagnóstica principal. Exames laboratoriais: Hemograma com Hb ${(11 + Math.random() * 3).toFixed(1).replace('.', ',')} g/dL, Leucócitos ${6000 + Math.floor(Math.random() * 8000)}/mm³, Plaquetas ${150000 + Math.floor(Math.random() * 200000)}/mm³. Qual o próximo passo na propedêutica deste paciente?`,
                `Paciente de ${age} anos, sexo ${gender}, admitid${genderAdj} na emergência com quadro agudo de ${chosenSubject.name}. Início súbito há 2 horas. Nega traumas ou uso de medicações. Ao exame: Glasgow ${13 + Math.floor(Math.random() * 3)}, pupilas isocóricas e fotorreagentes, ausência de sinais meníngeos. PA: ${110 + Math.floor(Math.random() * 60)}/${70 + Math.floor(Math.random() * 35)} mmHg, FC: ${80 + Math.floor(Math.random() * 40)} bpm, TAX: ${(36.2 + Math.random() * 1.2).toFixed(1).replace('.', ',')}°C, SatO2: ${92 + Math.floor(Math.random() * 8)}% em ar ambiente. Exames de imagem e laboratoriais foram solicitados conforme protocolo institucional para ${randomSpec.name}. Qual a principal hipótese diagnóstica e conduta imediata?`
            ]

            const enunciado = clinicalScenarios[Math.floor(Math.random() * clinicalScenarios.length)]

            // Distratores baseados em erros comuns
            const distractorTypes = [
                `Conduta expectante com reavaliação em 48h`,
                `Iniciar tratamento sintomático isolado sem investigação complementar`,
                `Realizar procedimento invasivo sem estabilização prévia`,
                `Administrar medicação de primeira linha em dose subterapêutica`,
                `Encaminhar para especialista sem estabilização inicial`
            ]

            // Randomizar qual alternativa será a correta
            const correctAnswerText = `Iniciar protocolo terapêutico conforme diretriz brasileira atualizada de ${randomSpec.name}, com estabilização clínica e investigação complementar direcionada para ${chosenSubject.name}`
            const allOptionIds = ['a', 'b', 'c', 'd', 'e']
            const correctOptionId = allOptionIds[Math.floor(Math.random() * 5)]

            // Criar array de opções com a correta na posição randomizada
            const optionsTexts = [...distractorTypes]
            const correctIndex = allOptionIds.indexOf(correctOptionId)
            optionsTexts.splice(correctIndex, 1, correctAnswerText)

            const options = allOptionIds.map((id, idx) => ({
                id,
                text: optionsTexts[idx]
            }))

            // Gerar explicações dinâmicas baseadas na alternativa correta
            const altExplanations: Record<string, string> = {}
            allOptionIds.forEach((id) => {
                if (id === correctOptionId) return

                const incorrectTexts = [
                    `INCORRETA. A conduta expectante não é apropriada neste contexto clínico de ${chosenSub.name}, pois o quadro exige intervenção terapêutica imediata conforme diretriz de ${randomSpec.name}.`,
                    `INCORRETA. O tratamento sintomático isolado sem investigação complementar não é adequado para ${chosenSubject.name}.`,
                    `INCORRETA. Realizar procedimento invasivo sem estabilização prévia em quadro de ${chosenSubject.name} constitui erro grave de conduta médica.`,
                    `INCORRETA. A administração de medicação em dose subterapêutica para tratar ${chosenSub.name} resultará em falha terapêutica.`,
                    `INCORRETA. A estabilização inicial de ${chosenSubject.name} é prioritária antes de qualquer encaminhamento.`
                ]
                altExplanations[id] = incorrectTexts[Math.floor(Math.random() * incorrectTexts.length)]
            })

            return {
                id: `QRUB-MED-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
                course_id: targetCourse.id,
                specialty_id: randomSpec.id,
                subspecialty_id: chosenSub.id,
                subject_id: chosenSubject.id,
                difficulty: (selectedDifficulty === 'RANDOM'
                    ? (Math.random() > 0.5 ? 'Difícil' : 'Médio')
                    : selectedDifficulty) as any,
                enunciado: clinicalScenarios[Math.floor(Math.random() * clinicalScenarios.length)],
                case_study: {
                    history: `Paciente de ${age} anos, ${gender}, com quadro clínico compatível com ${chosenSub.name}. Antecedentes pessoais: nega comorbidades prévias. Antecedentes familiares: história familiar positiva para ${randomSpec.name}.`,
                    physical_exam: `BEG, corad${genderAdj}, hidratad${genderAdj}, acianótic${genderAdj}, anictéric${genderAdj}. Sinais vitais estáveis. Exame físico segmentar revela achados específicos compatíveis com a hipótese diagnóstica principal de ${chosenSub.name}.`,
                    lab_results: `Hemograma: Hb ${(11 + Math.random() * 3).toFixed(1).replace('.', ',')} g/dL, Leucócitos ${6000 + Math.floor(Math.random() * 8000)}/mm³, Plaquetas ${150000 + Math.floor(Math.random() * 200000)}/mm³. Função renal: Creatinina ${(0.8 + Math.random() * 0.5).toFixed(1).replace('.', ',')} mg/dL, Ureia ${25 + Math.floor(Math.random() * 20)} mg/dL.`
                },
                options,
                correct_option_id: correctOptionId,
                explanation: `A alternativa ${correctOptionId.toUpperCase()} está CORRETA pois representa a conduta padrão-ouro segundo as diretrizes brasileiras atualizadas de ${randomSpec.name} (2024). O quadro clínico apresentado evidencia critérios diagnósticos para ${chosenSub.name}, exigindo abordagem terapêutica imediata e baseada em evidências para o quadro de ${chosenSubject.name}.`,
                alternative_explanations: altExplanations,
                severe_error_alert: i % 10 === 0 ? `⚠️ ALERTA DE ERRO GRAVE: A escolha de uma alternativa incorreta neste caso de ${chosenSub.name} resultaria em risco iminente de complicações graves em um cenário de ${chosenSubject.name}.` : undefined,
                hash: Math.random().toString(36).substr(2, 12)
            }
        })

        try {
            // Use bulk addQuestions which handles Supabase
            await addQuestions(mockGeneratedQuestions)

            setImportStatus({
                type: 'success',
                msg: `✅ Sucesso! Geradas ${batchSize} questões para ${selectedSpecialty ? targetSpecialties[0].name : 'Todas Espec.'}.`
            })
            setJsonInput(JSON.stringify(mockGeneratedQuestions, null, 2))
        } catch (error) {
            console.error('Error saving questions:', error)
            setImportStatus({ type: 'error', msg: '❌ Erro ao salvar questões no Supabase. Tente novamente.' })
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
                    <NavBtn active={view === 'analytics'} onClick={() => setView('analytics')} icon={<BarChart3 className="w-4 h-4" />} label="Dashboard" />
                    <NavBtn active={view === 'questions'} onClick={() => setView('questions')} icon={<Database className="w-4 h-4" />} label="Banco" />
                    <NavBtn active={view === 'import'} onClick={() => setView('import')} icon={<Sparkles className="w-4 h-4" />} label="Dr. QRub (IA)" />
                    <NavBtn active={view === 'users'} onClick={() => setView('users')} icon={<Users className="w-4 h-4" />} label="Alunos" />
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
                            <StatCard label="Aguardando Revisão" value="0" color="text-emerald-500" icon={<CheckCircle2 className="w-4 h-4" />} />
                            <StatCard label="Erros Reportados" value="0" color="text-rose-500" icon={<AlertCircle className="w-4 h-4" />} />
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
                                                        <button onClick={() => deleteQuestion(q.id)} className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
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
                                color="text-emerald-500"
                                icon={<Users className="w-4 h-4" />}
                            />
                            <StatCard
                                label="Plano Insano"
                                value={realUsers.filter((u: any) => u.plan_level === 'INSANO').length}
                                color="text-orange-500"
                                icon={<Crown className="w-4 h-4" />}
                            />
                            <StatCard
                                label="Plano Premium"
                                value={realUsers.filter((u: any) => u.plan_level === 'PREMIUM').length}
                                color="text-primary"
                                icon={<Star className="w-4 h-4" />}
                            />
                            <StatCard
                                label="Cadastro Incompleto"
                                value={realUsers.filter((u: any) => !u.institution || !u.graduation_year).length}
                                color="text-rose-500"
                                icon={<AlertCircle className="w-4 h-4" />}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleExportUsers}
                                className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-emerald-500/20"
                            >
                                <Database className="w-4 h-4" />
                                Exportar Relatório (XLS)
                            </button>
                        </div>

                        <div className="bg-card border border-border rounded-[32px] overflow-hidden soft-shadow">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-muted/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                        <tr>
                                            <th className="px-8 py-6">Aluno</th>
                                            <th className="px-8 py-6">Formação</th>
                                            <th className="px-8 py-6">Plano</th>
                                            <th className="px-8 py-6 text-right">Controle Master</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {realUsers.map(u => (
                                            <tr key={u.id} className="hover:bg-muted/10 transition-colors">
                                                <td className="px-8 py-6">
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
                                                                onClick={() => handlePlanChange(u.id, p as PlanLevel)}
                                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${u.plan_level === p ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-primary/20'}`}
                                                            >
                                                                {p}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {view === 'import' && (
                    <motion.div key="i" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-4xl mx-auto space-y-8">
                        <div className="bg-card border border-border rounded-[40px] p-10 space-y-6 soft-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="royal-gradient p-3 rounded-2xl text-white shadow-lg shrink-0"><Sparkles className="w-6 h-6" /></div>
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Motor de Geração Dr. QRub</h3>
                                                <p className="text-sm font-medium text-muted-foreground">O Dr. QRub gera lotes de 500 questões de alta complexidade seguindo o padrão Revalida.</p>
                                            </div>
                                            <button
                                                onClick={() => setView('questions')}
                                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all text-[10px] font-black uppercase tracking-widest border border-border group"
                                            >
                                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                                Voltar ao Banco de Dados
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl flex flex-col items-end shadow-sm animate-in fade-in slide-in-from-right-4 duration-700">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">Banco Total</span>
                                    <span className="text-3xl font-black italic text-primary leading-none">
                                        {questions.length.toLocaleString('pt-BR')}
                                        <span className="ml-1 text-xs uppercase not-italic opacity-60">Qst</span>
                                    </span>
                                </div>
                            </div>

                            {/* Specialty Stats Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 bg-muted/30 p-6 rounded-2xl border border-border/50">
                                {activeCourse?.specialties.map(spec => (
                                    <div key={spec.id} className="bg-card border border-border p-3 rounded-xl flex flex-col items-center justify-center text-center hover:border-primary/30 transition-all cursor-default group">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary/60 transition-colors mb-1 line-clamp-1">{spec.name}</span>
                                        <span className="text-xl font-black italic text-foreground group-hover:text-primary transition-colors">
                                            {countsBySpecialty[spec.id] || 0}
                                            <span className="ml-1 text-[8px] uppercase not-italic opacity-40">Qst</span>
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/50 p-6 rounded-2xl border border-border">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Curso</label>
                                    <select
                                        value={selectedCourse}
                                        onChange={(e) => {
                                            setSelectedCourse(e.target.value)
                                            const newCourse = COURSES.find(c => c.id === e.target.value)
                                            if (newCourse && newCourse.specialties.length > 0) {
                                                setSelectedSpecialty(newCourse.specialties[0].id)
                                                // Reset sub logic would go here ideally
                                            }
                                        }}
                                        className="w-full bg-card border border-border rounded-xl p-3 font-bold text-sm"
                                    >
                                        {COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Especialidade</label>
                                    <select
                                        value={selectedSpecialty}
                                        onChange={(e) => {
                                            setSelectedSpecialty(e.target.value)
                                            setSelectedSubspecialty('')
                                            setSelectedSubject('')
                                        }}
                                        className="w-full bg-card border border-border rounded-xl p-3 font-bold text-sm"
                                    >
                                        {Object.entries(
                                            activeCourse?.specialties.reduce((acc: Record<string, any[]>, spec) => {
                                                const cat = spec.category || 'Outros';
                                                if (!acc[cat]) acc[cat] = [];
                                                acc[cat].push(spec);
                                                return acc;
                                            }, {}) || {}
                                        ).map(([category, specs]) => (
                                            <optgroup key={category} label={category.toUpperCase()}>
                                                {specs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                            </optgroup>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Subespecialidade (Opcional)</label>
                                    <select
                                        value={selectedSubspecialty}
                                        onChange={(e) => {
                                            setSelectedSubspecialty(e.target.value)
                                            if (e.target.value !== 'NEW') setCustomSubspecialty('')
                                        }}
                                        className="w-full bg-card border border-border rounded-xl p-3 font-bold text-sm"
                                    >
                                        <option value="">Todas</option>
                                        {activeSpecialty?.subspecialties.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                                        <option value="NEW" className="text-primary font-black">+ Adicionar Nova...</option>
                                    </select>
                                    {selectedSubspecialty === 'NEW' && (
                                        <motion.input
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            type="text"
                                            value={customSubspecialty}
                                            onChange={(e) => setCustomSubspecialty(e.target.value)}
                                            placeholder="Nome da nova subespecialidade..."
                                            className="w-full mt-2 bg-card border border-primary/30 rounded-xl p-3 font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Assunto (Opcional)</label>
                                    <select
                                        value={selectedSubject}
                                        onChange={(e) => {
                                            setSelectedSubject(e.target.value)
                                            if (e.target.value !== 'NEW') setCustomSubject('')
                                        }}
                                        className="w-full bg-card border border-border rounded-xl p-3 font-bold text-sm"
                                    >
                                        <option value="">Todos</option>
                                        {activeSubspecialty?.subjects.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                                        <option value="NEW" className="text-primary font-black">+ Adicionar Novo...</option>
                                    </select>
                                    {selectedSubject === 'NEW' && (
                                        <motion.input
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            type="text"
                                            value={customSubject}
                                            onChange={(e) => setCustomSubject(e.target.value)}
                                            placeholder="Nome do novo assunto..."
                                            className="w-full mt-2 bg-card border border-primary/30 rounded-xl p-3 font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lote de Questões</label>
                                    <select
                                        value={selectedBatchSize}
                                        onChange={(e) => setSelectedBatchSize(parseInt(e.target.value))}
                                        className="w-full bg-card border border-border rounded-xl p-3 font-bold text-sm"
                                    >
                                        <option value={500}>500 Questões (Revalida)</option>
                                        <option value={100}>100 Questões</option>
                                        <option value={50}>50 Questões</option>
                                        <option value={10}>10 Questões</option>
                                        <option value={1}>1 Questão (Teste)</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nível de Dificuldade</label>
                                    <select
                                        value={selectedDifficulty}
                                        onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                                        className="w-full bg-card border border-border rounded-xl p-3 font-bold text-sm"
                                    >
                                        <option value="RANDOM">Aleatório (Médio/Difícil)</option>
                                        <option value="Fácil">Fácil (Conceitos Básicos)</option>
                                        <option value="Médio">Médio (Caso Clínico Padrão)</option>
                                        <option value="Difícil">Difícil (Alta Complexidade)</option>
                                    </select>
                                </div>
                            </div>

                            <textarea
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                placeholder='Cole um lote JSON pronto ou use o gerador acima...'
                                className="w-full h-48 bg-muted border border-border rounded-2xl p-6 font-mono text-xs focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                            />

                            {importStatus && (
                                <div className="space-y-4">
                                    <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${importStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                                        {importStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                        {importStatus.msg}
                                    </div>
                                    {importStatus.msg.includes('Gerando') && (
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: '45%' }}
                                                className="h-full royal-gradient"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-4">
                                <button
                                    onClick={() => {
                                        setImportStatus({ type: 'success', msg: 'Solicitando ao Dr. QRub: Gerando questão 250/500...' })
                                        setTimeout(() => {
                                            handleBatchImport()
                                        }, 2000)
                                    }}
                                    className="flex-1 royal-gradient text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Gerar 500 Questões (Padrão Revalida)
                                </button>
                                <button
                                    onClick={handleValidateJSON}
                                    className="px-8 bg-card border border-border py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-muted transition-all"
                                >
                                    Validar JSON
                                </button>
                            </div>
                        </div>
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
                                sub="+12 hoje"
                                color="text-primary"
                                icon={<Users className="w-5 h-5" />}
                            />
                            <StatCard
                                label="Ativos (7 Dias)"
                                value="842"
                                sub="68% do total"
                                color="text-emerald-500"
                                icon={<Activity className="w-5 h-5" />}
                            />
                            <StatCard
                                label="Ativos Reais (>10m)"
                                value="312"
                                sub="Engajamento Alto"
                                color="text-blue-500"
                                icon={<Target className="w-5 h-5" />}
                            />
                            <StatCard
                                label="Sessões Hoje"
                                value="1,840"
                                sub="Pico às 14:00"
                                color="text-orange-500"
                                icon={<History className="w-5 h-5" />}
                                alert={true} // Visual alert if needed
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
                                            Insight: <span className="text-primary">"60% dos usuários saem antes da 3ª questão"</span>
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
                                    <GenStat label="Geradas Hoje" value="12,500" />
                                    <GenStat label="Cache Utilizado" value="84%" />
                                    <GenStat label="Requisições Falhas" value="0.2%" color="text-emerald-500" />
                                    <GenStat label="Tempo Médio Geração" value="1.42s" />
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
                                        <p className="text-xl font-black italic text-rose-500">12 usuários</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                                <UserQuickStat label="Total Cadastrados" value="1,244" />
                                <UserQuickStat label="Premium" value="312" sub="25%" />
                                <UserQuickStat label="Free" value="920" sub="74%" />
                                <UserQuickStat label="Admins" value="12" sub="Master/Ops" />
                            </div>
                        </section>

                        {/* 📈 SEÇÃO 6 – PERFORMANCE EDUCACIONAL */}
                        <div className="bg-card glass-card border border-border/50 rounded-[40px] p-10 space-y-8">
                            <h4 className="text-xl font-black italic uppercase tracking-tight">Métricas Globais de Domínio</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                <div className="space-y-6">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Áreas mais Erradas</p>
                                    <ThemeBar label="Obstetrícia de Alto Risco" percent={42} color="bg-rose-500" />
                                    <ThemeBar label="Medicina Preventiva" percent={38} color="bg-orange-500" />
                                    <ThemeBar label="Estatística Médica" percent={35} color="bg-rose-400" />
                                </div>
                                <div className="space-y-6">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Temas Críticos (Global)</p>
                                    <ThemeBar label="Pré-eclâmpsia" percent={68} color="bg-primary" />
                                    <ThemeBar label="Cetoacidose Diabética" percent={54} color="bg-primary" />
                                    <ThemeBar label="Trauma Abdominal" percent={51} color="bg-primary" />
                                </div>
                                <div className="flex flex-col items-center justify-center p-8 bg-muted/20 rounded-[35px] border border-white/5">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-4">Média de Acertos Geral</p>
                                    <h3 className="text-7xl font-black italic text-primary">64%</h3>
                                    <p className="text-[9px] font-bold text-muted-foreground uppercase mt-4">Padrão de aprovação: 70%</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    )
}

function NavBtn({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
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

function StatCard({ label, value, sub, color, icon, alert }: { label: string, value: any, sub?: string, color: string, icon?: any, alert?: boolean }) {
    return (
        <div className={`bg-card border ${alert ? 'border-rose-500/30 bg-rose-500/5' : 'border-border'} rounded-[32px] p-8 soft-shadow group hover:border-primary/30 transition-all relative overflow-hidden`}>
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

function OpButton({ icon, label, desc, primary }: { icon: any, label: string, desc: string, primary?: boolean }) {
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

