"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { QrubNotifications } from '@/lib/notification-service'
import { QrubAudio } from '@/lib/audio-engine'
import {
    Calendar, CheckCircle2, Clock, Play, Zap, BookOpen, FileText,
    AlertCircle, ChevronRight, ArrowRight, Target, MoreHorizontal,
    TrendingUp, Flame, X, CalendarDays, Timer, Check, ChevronLeft,
    ChevronDown, Plus, RefreshCw, NotebookPen, Loader2, Inbox,
    AlertTriangle, Brain, Sparkles, Shield, StickyNote, Bell,
    SkipForward, Eye, CalendarPlus, Repeat, ChevronUp
} from 'lucide-react'
import { ConcursoCard } from '@/components/concursos/concurso-card'
import { cn } from '@/lib/utils'
import {
    fetchDailyAgenda, fetchWeeklyActivity, saveManualTask, postponeTask,
    getPostponeCount, type AgendaTask, type AgendaDayStats
} from '@/lib/agenda-service'

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type ModalType = 'none' | 'add-task' | 'add-note' | 'schedule-nivelamento' | 'task-details' | 'confirm-start'

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function ConcursoAgendaPage() {
    const router = useRouter()
    const [tasks, setTasks] = useState<AgendaTask[]>([])
    const [stats, setStats] = useState<AgendaDayStats>({ total: 0, completed: 0, pending: 0, late: 0, totalEstimatedMinutes: 0, percentComplete: 0 })
    const [weeklyActivity, setWeeklyActivity] = useState<{ date: string; count: number }[]>([])
    const [userName, setUserName] = useState('Candidato')
    const [streak, setStreak] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [view, setView] = useState<'daily' | 'weekly'>('daily')
    const [modal, setModal] = useState<ModalType>('none')
    const [selectedTask, setSelectedTask] = useState<AgendaTask | null>(null)
    const [focusMode, setFocusMode] = useState(false)
    const [focusIdx, setFocusIdx] = useState(0)

    // Form states
    const [formTitle, setFormTitle] = useState('')
    const [formDesc, setFormDesc] = useState('')
    const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0])
    const [formTime, setFormTime] = useState('')
    const [formDiscipline, setFormDiscipline] = useState('')
    const [formSubject, setFormSubject] = useState('')

    const checkInitialDrift = async (tasks: AgendaTask[]) => {
        await QrubNotifications.checkAgendaDrift(tasks)
    }

    const loadData = useCallback(async () => {
        setLoading(true); setError(null)
        try {
            const [agenda, activity] = await Promise.all([fetchDailyAgenda(), fetchWeeklyActivity()])
            setTasks(agenda.tasks); setStats(agenda.stats)
            setUserName(agenda.userName); setStreak(agenda.streak)
            setWeeklyActivity(activity)
            checkInitialDrift(agenda.tasks)
        } catch { setError('Não foi possível carregar sua agenda.') }
        finally { setLoading(false) }
    }, [])

    useEffect(() => { loadData() }, [loadData])

    const pendingTasks = tasks.filter(t => t.status !== 'concluido')

    const markComplete = (taskId: string) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'concluido' as const } : t))
        setStats(prev => ({ ...prev, completed: prev.completed + 1, pending: Math.max(0, prev.pending - 1), percentComplete: Math.round(((prev.completed + 1) / prev.total) * 100) }))
    }

    const handlePostpone = async (taskId: string) => {
        QrubAudio.play('pulse')
        const result = postponeTask(taskId)
        if (!result.success) { alert(`Limite de 3 adiamentos atingido! Este item está EM RISCO.`); return }
        setTasks(prev => prev.filter(t => t.id !== taskId))
        setStats(prev => ({ ...prev, pending: Math.max(0, prev.pending - 1) }))
    }

    const handleIgnore = (taskId: string) => {
        setTasks(prev => prev.filter(t => t.id !== taskId))
        setStats(prev => ({ ...prev, pending: Math.max(0, prev.pending - 1), total: Math.max(0, prev.total - 1), percentComplete: prev.total > 1 ? Math.round((prev.completed / (prev.total - 1)) * 100) : 100 }))
    }

    const startTask = (task: AgendaTask) => {
        QrubAudio.play('swoosh')
        if (task.type === 'nivelamento') {
            router.push(`/concursos/quiz/session?mode=NIVELAMENTO&count=10&disciplinaId=${task.discipline}`)
        } else if (task.type === 'revisao' || task.type === 'recuperacao') {
            router.push(`/concursos/quiz/session?mode=SRS&count=10`)
        } else if (task.type === 'simulado') {
            router.push('/concursos/simulados')
        } else if (task.type === 'questoes') {
            router.push('/concursos/questoes')
        } else {
            markComplete(task.id)
        }
    }

    const handleAddTask = () => {
        if (!formTitle.trim()) return
        const newTask = saveManualTask({ type: 'lembrete', title: formTitle, description: formDesc, date: formDate, time: formTime })
        setTasks(prev => [...prev, newTask])
        setStats(prev => ({ ...prev, total: prev.total + 1, pending: prev.pending + 1, percentComplete: Math.round((prev.completed / (prev.total + 1)) * 100) }))
        setFormTitle(''); setFormDesc(''); setModal('none')
    }

    const handleAddNote = () => {
        if (!formTitle.trim()) return
        const newTask = saveManualTask({ type: 'nota', title: formTitle, description: formDesc, date: formDate })
        setTasks(prev => [...prev, newTask])
        setStats(prev => ({ ...prev, total: prev.total + 1, pending: prev.pending + 1 }))
        setFormTitle(''); setFormDesc(''); setModal('none')
    }

    const handleScheduleNivelamento = () => {
        if (!formDiscipline.trim()) return
        const newTask = saveManualTask({ type: 'nivelamento', title: `Nivelamento: ${formDiscipline}`, description: formSubject, date: formDate, discipline: formDiscipline, subject: formSubject })
        setTasks(prev => [...prev, newTask])
        setStats(prev => ({ ...prev, total: prev.total + 1, pending: prev.pending + 1 }))
        setFormDiscipline(''); setFormSubject(''); setModal('none')
    }

    const resetForm = () => { setFormTitle(''); setFormDesc(''); setFormDate(new Date().toISOString().split('T')[0]); setFormTime(''); setFormDiscipline(''); setFormSubject('') }

    const fmtMin = (m: number) => m < 60 ? `${m} min` : `${Math.floor(m/60)}h ${m%60 > 0 ? `${m%60}min` : ''}`

    // ─── FOCUS MODE ────────────────────────────────────────────────
    if (focusMode && pendingTasks.length > 0) {
        const task = pendingTasks[focusIdx % pendingTasks.length]
        return <FocusModeView task={task} total={pendingTasks.length} idx={focusIdx % pendingTasks.length}
            onClose={() => setFocusMode(false)} onNext={() => setFocusIdx(p => p + 1)}
            onFinish={(id) => { markComplete(id); setFocusIdx(p => p + 1) }}
            onStart={() => startTask(task)} />
    }

    return (
        <div className="space-y-12 pb-32 animate-in fade-in duration-700">
            {/* 1. TOP PROGRESS MONITOR */}
            <div className="bg-[#1A1033] rounded-b-[40px] -mx-8 -mt-8 p-12 pt-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
                <div className="space-y-6 relative z-10 w-full md:w-auto">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        <Flame className="w-4 h-4 animate-pulse" />
                        {streak > 0 ? `${streak} dias de sequência` : 'Daily Study Routine'}
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                            Olá, <span className="text-indigo-500">{userName}</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.4em] flex items-center gap-4">
                            {new Date().toLocaleDateString('pt-BR', { weekday: 'long' })}
                            <span className="w-12 h-px bg-slate-800" />
                            {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 relative z-10">
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                                <motion.circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-indigo-500" strokeDasharray="364.4"
                                    initial={{ strokeDashoffset: 364.4 }} animate={{ strokeDashoffset: loading ? 364.4 : 364.4 - (364.4 * stats.percentComplete) / 100 }} transition={{ duration: 1.5, ease: "easeOut" }} />
                            </svg>
                            <div className="absolute flex flex-col items-center leading-none">
                                {loading ? <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" /> : <>
                                    <span className="text-3xl font-black text-white italic">{stats.percentComplete}%</span>
                                    <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest mt-1">Meta</span>
                                </>}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <MiniStat label="Concluído" value={loading ? '—' : `${stats.completed}/${stats.total}`} color="text-indigo-400" />
                            <MiniStat label="Atrasados" value={loading ? '—' : stats.late} color={stats.late > 0 ? 'text-rose-400' : 'text-slate-400'} />
                            <MiniStat label="Tempo Est." value={loading ? '—' : fmtMin(stats.totalEstimatedMinutes)} color="text-amber-400" />
                            <MiniStat label="Pendentes" value={loading ? '—' : stats.pending} color="text-slate-400" />
                        </div>
                        <button onClick={() => { setFocusMode(true); setFocusIdx(0) }} disabled={loading || pendingTasks.length === 0}
                            className="w-full px-8 py-4 bg-indigo-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed">
                            <Play className="w-4 h-4 fill-white" />
                            {pendingTasks.length === 0 ? 'Tudo Concluído!' : 'Iniciar Sessão'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. DATE + VIEW TOGGLE + ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                    <button className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-indigo-500 transition-all shadow-sm"><ChevronLeft className="w-6 h-6" /></button>
                    <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <CalendarDays className="w-5 h-5 text-indigo-500" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-[#1A1033]">Hoje</span>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                    </div>
                    <button className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-indigo-500 transition-all shadow-sm"><ChevronRight className="w-6 h-6" /></button>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={loadData} className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-indigo-500 transition-all shadow-sm" title="Atualizar Agenda">
                        <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                    </button>
                    <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
                        <button onClick={() => setView('daily')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", view === 'daily' ? "bg-white text-[#1A1033] shadow-sm" : "text-slate-400")}>Diário</button>
                        <button onClick={() => setView('weekly')} className={cn("px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", view === 'weekly' ? "bg-white text-[#1A1033] shadow-sm" : "text-slate-400")}>Semanal</button>
                    </div>
                </div>
            </div>

            {/* 3. MAIN CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500"><Target className="w-6 h-6" /></div>
                            Ordem de <span className="text-indigo-600">Execução</span>
                        </h2>
                        {stats.late > 0 && <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-[10px] font-black uppercase tracking-wider">
                            <AlertTriangle className="w-3.5 h-3.5" /> {stats.late} atrasado{stats.late > 1 ? 's' : ''}
                        </div>}
                    </div>

                    {loading && <TasksSkeleton />}
                    {!loading && error && <div className="p-12 rounded-[32px] border-2 border-rose-500/20 bg-rose-500/5 flex flex-col items-center gap-6 text-center">
                        <AlertCircle className="w-12 h-12 text-rose-400" /><p className="text-sm font-bold text-slate-500">{error}</p>
                        <button onClick={loadData} className="px-8 py-3 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Tentar novamente</button>
                    </div>}
                    {!loading && !error && tasks.length === 0 && <EmptyAgenda onAddTask={() => { resetForm(); setModal('add-task') }} />}

                    {!loading && !error && tasks.length > 0 && (
                        <div className="space-y-6 relative before:absolute before:left-[27px] before:top-8 before:bottom-8 before:w-1 before:bg-slate-100">
                            <AnimatePresence>
                                {tasks.map((task, i) => (
                                    <TaskCard key={task.id} task={task} index={i}
                                        onComplete={() => markComplete(task.id)}
                                        onPostpone={() => handlePostpone(task.id)}
                                        onIgnore={() => handleIgnore(task.id)}
                                        onStart={() => startTask(task)}
                                        onDetails={() => { setSelectedTask(task); setModal('task-details') }}
                                    />
                                ))}
                            </AnimatePresence>

                            {/* Action buttons row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                <button onClick={() => { resetForm(); setModal('add-task') }} className="p-6 border-2 border-dashed border-slate-100 rounded-[28px] flex items-center justify-center gap-3 text-slate-300 hover:text-indigo-500 hover:border-indigo-500/30 transition-all group">
                                    <Bell className="w-5 h-5" /><span className="text-[10px] font-black uppercase tracking-widest">Lembrete</span>
                                </button>
                                <button onClick={() => { resetForm(); setModal('add-note') }} className="p-6 border-2 border-dashed border-slate-100 rounded-[28px] flex items-center justify-center gap-3 text-slate-300 hover:text-amber-500 hover:border-amber-500/30 transition-all group">
                                    <StickyNote className="w-5 h-5" /><span className="text-[10px] font-black uppercase tracking-widest">Nota</span>
                                </button>
                                <button onClick={() => { resetForm(); setModal('schedule-nivelamento') }} className="p-6 border-2 border-dashed border-slate-100 rounded-[28px] flex items-center justify-center gap-3 text-slate-300 hover:text-emerald-500 hover:border-emerald-500/30 transition-all group">
                                    <Brain className="w-5 h-5" /><span className="text-[10px] font-black uppercase tracking-widest">Nivelamento</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-10">
                    <WeeklyHeatmap activity={weeklyActivity} />
                    {stats.late > 0 && <PendenciesCard tasks={tasks} stats={stats} onStartRecovery={() => router.push('/concursos/quiz/session?mode=SRS&count=10')} />}
                    <StreakCard streak={streak} loading={loading} activity={weeklyActivity} />
                </div>
            </div>

            {/* ─── MODALS ─── */}
            <AnimatePresence>
                {modal === 'add-task' && <Modal title="Adicionar Lembrete" icon={<Bell className="w-6 h-6 text-indigo-400" />} onClose={() => setModal('none')}>
                    <input value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="Título do lembrete..." className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-[#1A1033] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    <textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} placeholder="Descrição (opcional)..." rows={3} className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-[#1A1033] placeholder:text-slate-300 focus:outline-none resize-none" />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="date" value={formDate} onChange={e => setFormDate(e.target.value)} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-[#1A1033] focus:outline-none" />
                        <input type="time" value={formTime} onChange={e => setFormTime(e.target.value)} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-[#1A1033] focus:outline-none" />
                    </div>
                    <button onClick={handleAddTask} disabled={!formTitle.trim()} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30">Salvar Lembrete</button>
                </Modal>}

                {modal === 'add-note' && <Modal title="Adicionar Nota" icon={<StickyNote className="w-6 h-6 text-amber-400" />} onClose={() => setModal('none')}>
                    <input value={formTitle} onChange={e => setFormTitle(e.target.value)} placeholder="Título da nota..." className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-[#1A1033] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
                    <textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} placeholder="Conteúdo (macetes, insights, revisões rápidas)..." rows={5} className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-[#1A1033] placeholder:text-slate-300 focus:outline-none resize-none" />
                    <button onClick={handleAddNote} disabled={!formTitle.trim()} className="w-full py-5 bg-amber-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30">Salvar Nota</button>
                </Modal>}

                {modal === 'schedule-nivelamento' && <Modal title="Agendar Nivelamento" icon={<Brain className="w-6 h-6 text-emerald-400" />} onClose={() => setModal('none')}>
                    <input value={formDiscipline} onChange={e => setFormDiscipline(e.target.value)} placeholder="Disciplina (ex: Direito Constitucional)..." className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-[#1A1033] placeholder:text-slate-300 focus:outline-none" />
                    <input value={formSubject} onChange={e => setFormSubject(e.target.value)} placeholder="Assunto (opcional)..." className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-[#1A1033] placeholder:text-slate-300 focus:outline-none" />
                    <input type="date" value={formDate} onChange={e => setFormDate(e.target.value)} className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-bold text-[#1A1033] focus:outline-none" />
                    <button onClick={handleScheduleNivelamento} disabled={!formDiscipline.trim()} className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30">Agendar Nivelamento</button>
                </Modal>}

                {modal === 'task-details' && selectedTask && <Modal title="Detalhes da Tarefa" icon={<Eye className="w-6 h-6 text-indigo-400" />} onClose={() => setModal('none')}>
                    <div className="space-y-4">
                        <DetailRow label="Tipo" value={selectedTask.type.toUpperCase()} />
                        <DetailRow label="Disciplina" value={selectedTask.discipline || '—'} />
                        <DetailRow label="Assunto" value={selectedTask.subject} />
                        <DetailRow label="Prioridade" value={selectedTask.priority.toUpperCase()} />
                        <DetailRow label="Tempo Estimado" value={selectedTask.estimatedTime} />
                        <DetailRow label="Origem" value={selectedTask.origin === 'sistema' ? 'Sistema (SRS)' : 'Manual'} />
                        <DetailRow label="Adiamentos" value={`${getPostponeCount(selectedTask.id)}/3`} />
                        {selectedTask.observacao && <DetailRow label="Observação" value={selectedTask.observacao} />}
                    </div>
                    <button onClick={() => { startTask(selectedTask); setModal('none') }} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all">
                        {getActionLabel(selectedTask.type, selectedTask.status)}
                    </button>
                </Modal>}
            </AnimatePresence>
        </div>
    )
}

// ─── HELPERS ────────────────────────────────────────────────────────────────────
function getActionLabel(type: AgendaTask['type'], status: AgendaTask['status']): string {
    if (status === 'concluido') return 'Revisar Novamente'
    const map: Record<string, string> = { nivelamento: 'Iniciar Nivelamento', revisao: 'Iniciar Revisão', recuperacao: 'Iniciar Recuperação', simulado: 'Iniciar Simulado', lembrete: 'Concluir', nota: 'Concluir', questoes: 'Iniciar Questões', teoria: 'Iniciar Estudo', caderno: 'Revisar Erros' }
    return map[type] || 'Executar'
}

function DetailRow({ label, value }: { label: string; value: string }) {
    return <div className="flex items-center justify-between py-3 border-b border-slate-50"><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span><span className="text-sm font-bold text-[#1A1033]">{value}</span></div>
}

// ─── TASK CARD ──────────────────────────────────────────────────────────────────
function TaskCard({ task, index, onComplete, onPostpone, onIgnore, onStart, onDetails }: {
    task: AgendaTask; index: number; onComplete: () => void; onPostpone: () => void; onIgnore: () => void; onStart: () => void; onDetails: () => void
}) {
    const [expanded, setExpanded] = useState(false)
    const isLate = task.status === 'atrasado'; const isDone = task.status === 'concluido'
    const iconMap: Record<string, any> = { teoria: BookOpen, revisao: Zap, questoes: FileText, caderno: NotebookPen, nivelamento: Target, recuperacao: Shield, simulado: Sparkles, lembrete: Bell, nota: StickyNote }
    const colorMap: Record<string, { c: string, bg: string }> = { teoria: { c: 'text-indigo-500', bg: 'bg-indigo-500/10' }, revisao: { c: 'text-amber-500', bg: 'bg-amber-500/10' }, questoes: { c: 'text-emerald-500', bg: 'bg-emerald-500/10' }, caderno: { c: 'text-rose-400', bg: 'bg-rose-400/10' }, nivelamento: { c: 'text-violet-500', bg: 'bg-violet-500/10' }, recuperacao: { c: 'text-rose-500', bg: 'bg-rose-500/10' }, simulado: { c: 'text-cyan-500', bg: 'bg-cyan-500/10' }, lembrete: { c: 'text-blue-500', bg: 'bg-blue-500/10' }, nota: { c: 'text-amber-500', bg: 'bg-amber-500/10' } }
    const Icon = iconMap[task.type] || Target
    const { c: color, bg } = colorMap[task.type] || { c: 'text-indigo-500', bg: 'bg-indigo-500/10' }
    const labelMap: Record<string, string> = { teoria: 'Estudo Teórico', revisao: 'Revisão Espaçada', questoes: 'Ciclo de Questões', caderno: 'Caderno de Erros', nivelamento: 'Nivelamento Obrigatório', recuperacao: 'Recuperação Urgente', simulado: 'Simulado', lembrete: 'Lembrete', nota: 'Nota' }

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: isDone ? 0.5 : 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ delay: index * 0.07 }}
            className={cn("group flex gap-8 relative p-8 pr-12 rounded-[32px] border-2 transition-all items-start",
                isLate ? "bg-rose-500/5 border-rose-500/10" : "bg-white border-slate-50 shadow-sm",
                isDone && "grayscale scale-[0.98]", "hover:border-indigo-500/30 hover:scale-[1.01] hover:shadow-2xl active:scale-[0.99]")}>
            <div className="relative z-10 flex flex-col items-center pt-1">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg", isDone ? "bg-emerald-500 text-white" : isLate ? "bg-rose-500 text-white" : `${bg} ${color} group-hover:bg-indigo-600 group-hover:text-white`)}>
                    {isDone ? <Check className="w-7 h-7" /> : <Icon className="w-7 h-7" />}
                </div>
            </div>

            <div className="flex-1 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                    <span className={cn("text-[10px] font-black uppercase tracking-[0.2em] italic", isLate ? "text-rose-600" : color)}>{labelMap[task.type]}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#1A1033] truncate">{task.discipline}</span>
                    {task.daysLate && task.daysLate > 0 && <div className="ml-auto flex items-center gap-2 text-rose-500"><AlertTriangle className="w-3.5 h-3.5" /><span className="text-[10px] font-black">{task.daysLate}d atrás</span></div>}
                </div>
                <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] leading-tight">{task.subject}</h3>
                <div className="flex flex-wrap items-center gap-8">
                    {task.quantity && <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400"><Target className="w-4 h-4 text-indigo-500 opacity-50" /> {task.quantity}</div>}
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400"><Timer className="w-4 h-4 text-indigo-500 opacity-50" /> {task.estimatedTime}</div>
                    <div className={cn("px-4 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border", task.priority === 'urgente' ? "bg-rose-500/10 border-rose-500/20 text-rose-600" : task.priority === 'alta' ? "bg-amber-500/10 border-amber-500/20 text-amber-600" : "bg-slate-50 border-slate-100 text-slate-400")}>{task.priority}</div>
                </div>

                {!isDone && (
                    <div className="flex flex-wrap items-center gap-3 pt-4">
                        <button onClick={onStart} className="flex-1 md:flex-none px-8 py-4 bg-[#1A1033] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-all flex items-center justify-center gap-3">
                            {getActionLabel(task.type, task.status)} <ArrowRight className="w-4 h-4" />
                        </button>
                        <button onClick={onPostpone} className="px-6 py-4 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 rounded-2xl transition-all" title="Adiar (máx 3x)">Adiar</button>
                        <button onClick={() => setExpanded(!expanded)} className="p-4 text-slate-300 hover:text-indigo-600 transition-colors ml-auto"><MoreHorizontal className="w-6 h-6" /></button>
                    </div>
                )}

                <AnimatePresence>
                    {expanded && !isDone && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex flex-wrap gap-3 pt-2">
                                <button onClick={onDetails} className="px-5 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all flex items-center gap-2"><Eye className="w-3.5 h-3.5" /> Detalhes</button>
                                <button onClick={onComplete} className="px-5 py-3 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> Marcar Concluído</button>
                                <button onClick={onIgnore} className="px-5 py-3 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 hover:text-rose-500 transition-all flex items-center gap-2"><SkipForward className="w-3.5 h-3.5" /> Ignorar</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {isLate && <div className="absolute top-0 right-0 overflow-hidden rounded-tr-[30px]"><div className="bg-rose-600 text-white text-[9px] font-black uppercase px-6 py-1.5 rotate-45 translate-x-4 translate-y-2 shadow-lg">Atrasado</div></div>}
        </motion.div>
    )
}

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────────
function MiniStat({ label, value, color }: { label: string; value: string | number; color: string }) {
    return <div className="px-5 py-3 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-md text-center"><p className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{label}</p><p className={cn("text-lg font-black italic", color)}>{value}</p></div>
}

function Modal({ title, icon, onClose, children }: { title: string; icon: React.ReactNode; onClose: () => void; children: React.ReactNode }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="w-full max-w-lg bg-white rounded-[40px] p-10 space-y-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4"><div className="p-3 bg-slate-50 rounded-2xl">{icon}</div><h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033]">{title}</h3></div>
                    <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-2xl transition-all"><X className="w-5 h-5 text-slate-400" /></button>
                </div>
                {children}
            </motion.div>
        </motion.div>
    )
}

function WeeklyHeatmap({ activity }: { activity: { date: string; count: number }[] }) {
    return (
        <ConcursoCard className="p-10 border-none soft-shadow bg-white">
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1A1033] mb-10 flex items-center gap-4 leading-none"><Calendar className="w-7 h-7 text-indigo-500" /> Atividade <span className="opacity-40">Semanal</span></h3>
            <div className="grid grid-cols-7 gap-2">
                {(activity.length > 0 ? activity : Array.from({ length: 7 }, () => ({ date: '', count: 0 }))).map((day, i) => {
                    const isToday = i === (activity.length > 0 ? activity.length - 1 : 6)
                    const intensity = day.count === 0 ? 0 : day.count <= 1 ? 1 : day.count <= 3 ? 2 : 3
                    const dayLabel = day.date ? new Date(day.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'narrow' }) : ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]
                    return (<div key={i} className="flex flex-col items-center gap-3">
                        <span className={cn("text-[9px] font-black tracking-widest", isToday ? "text-indigo-500" : "text-slate-400")}>{dayLabel}</span>
                        <div className={cn("w-full aspect-square rounded-xl flex items-center justify-center border-2 text-[10px] font-black",
                            isToday && intensity === 0 ? "bg-indigo-600/30 border-indigo-400 text-indigo-300" : isToday ? "bg-indigo-600 border-indigo-400 shadow-xl shadow-indigo-600/20 text-white" :
                            intensity === 3 ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-500" : intensity === 2 ? "bg-indigo-500/15 border-indigo-500/20 text-indigo-400" :
                            intensity === 1 ? "bg-slate-100 border-slate-200 text-slate-500" : "bg-slate-50 border-transparent text-slate-300")}>{day.count > 0 ? day.count : ''}</div>
                    </div>)
                })}
            </div>
            {activity.length > 0 && <p className="mt-6 text-[9px] font-black uppercase tracking-widest text-slate-400">{activity.reduce((a, d) => a + d.count, 0)} sessões nos últimos 7 dias</p>}
        </ConcursoCard>
    )
}

function PendenciesCard({ tasks, stats, onStartRecovery }: { tasks: AgendaTask[]; stats: AgendaDayStats; onStartRecovery: () => void }) {
    return (
        <div className="p-10 bg-rose-500/5 border-2 border-rose-500/10 rounded-[40px] space-y-8">
            <div className="flex items-center justify-between"><h3 className="text-xl font-black italic uppercase tracking-tighter text-rose-600 flex items-center gap-4"><AlertCircle className="w-7 h-7" /> Pendências</h3>
                <div className="px-2 py-0.5 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">{stats.late}</div></div>
            <div className="space-y-4">{tasks.filter(t => t.status === 'atrasado').slice(0, 3).map(t => (
                <div key={t.id} className="flex items-center gap-4 p-5 bg-white border border-rose-500/20 rounded-3xl">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500"><Zap className="w-5 h-5" /></div>
                    <div className="flex-1 min-w-0"><p className="text-[11px] font-black uppercase text-[#1A1033] tracking-tight truncate">{t.subject}</p><p className="text-[8px] font-bold text-rose-600 uppercase tracking-widest">{t.daysLate ? `Vencido há ${t.daysLate} dia${t.daysLate > 1 ? 's' : ''}` : 'Vencido hoje'}</p></div>
                </div>
            ))}</div>
            <button onClick={onStartRecovery} className="w-full py-5 bg-rose-500 text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-95 transition-all">Iniciar Recuperação</button>
        </div>
    )
}

function StreakCard({ streak, loading, activity }: { streak: number; loading: boolean; activity: { date: string; count: number }[] }) {
    return (
        <ConcursoCard className="p-10 border-none bg-gradient-to-br from-[#1A1033] to-[#2D1F4D] text-white shadow-2xl shadow-indigo-900/30 overflow-hidden relative">
            <TrendingUp className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 pointer-events-none" />
            <div className="relative z-10 space-y-6">
                <div className="flex items-start justify-between"><div className="space-y-1"><p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Study Streak</p><h4 className="text-4xl font-black italic uppercase tracking-tighter">{loading ? '—' : `${streak} Dia${streak !== 1 ? 's' : ''}`}</h4></div><div className="p-3 bg-white/10 rounded-2xl"><Timer className="w-6 h-6 text-white" /></div></div>
                <div className="flex items-end justify-between gap-2 h-20">{(activity.length > 0 ? activity : Array.from({ length: 7 }, () => ({ count: 0, date: '' }))).map((day, i) => {
                    const maxC = Math.max(...activity.map(d => d.count), 1); const pct = (day.count / maxC) * 100
                    return <div key={i} className="flex-1 rounded-t-lg bg-white/10 relative group"><motion.div initial={{ height: 0 }} animate={{ height: `${Math.max(pct, day.count > 0 ? 15 : 0)}%` }} className="absolute bottom-0 w-full bg-white rounded-t-lg opacity-40 group-hover:opacity-100 transition-opacity" /></div>
                })}</div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Últimos 7 dias</p>
            </div>
        </ConcursoCard>
    )
}

function TasksSkeleton() { return <div className="space-y-6">{[1,2,3].map(i => <div key={i} className="p-8 rounded-[32px] bg-slate-50 animate-pulse"><div className="flex gap-8"><div className="w-14 h-14 rounded-2xl bg-slate-200" /><div className="flex-1 space-y-4"><div className="h-3 bg-slate-200 rounded-lg w-32" /><div className="h-6 bg-slate-200 rounded-lg w-64" /><div className="flex gap-4"><div className="h-3 bg-slate-200 rounded-lg w-24" /><div className="h-3 bg-slate-200 rounded-lg w-16" /></div></div></div></div>)}</div> }

function EmptyAgenda({ onAddTask }: { onAddTask: () => void }) {
    return (<motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="p-16 rounded-[40px] border-2 border-dashed border-slate-100 flex flex-col items-center gap-8 text-center">
        <div className="w-20 h-20 rounded-[32px] bg-emerald-500/10 flex items-center justify-center"><Inbox className="w-10 h-10 text-emerald-500" /></div>
        <div className="space-y-3"><h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033]">Agenda <span className="text-emerald-500">Limpa!</span></h3><p className="text-slate-400 font-medium text-sm max-w-xs">Nenhuma revisão ou missão para hoje.</p></div>
        <button onClick={onAddTask} className="px-8 py-4 bg-[#1A1033] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Adicionar Tarefa</button>
    </motion.div>)
}

// ─── FOCUS MODE ─────────────────────────────────────────────────────────────────
function FocusModeView({ task, total, idx, onClose, onNext, onFinish, onStart }: {
    task: AgendaTask; total: number; idx: number; onClose: () => void; onNext: () => void; onFinish: (id: string) => void; onStart: () => void
}) {
    const iconMap: Record<string, any> = { revisao: Zap, questoes: FileText, teoria: BookOpen, caderno: NotebookPen, nivelamento: Target, recuperacao: Shield, simulado: Sparkles, lembrete: Bell, nota: StickyNote }
    const Icon = iconMap[task.type] || Target
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-[#0A051A] z-[100] flex flex-col items-center justify-center p-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none"><div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full" /><div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-600/5 blur-[150px] rounded-full" /></div>
            <button onClick={onClose} className="absolute top-12 right-12 p-5 text-white/30 hover:text-white transition-all bg-white/5 rounded-full hover:scale-110 active:scale-90"><X className="w-10 h-10" /></button>
            <div className="absolute top-12 left-12 flex items-center gap-3 text-white/30"><span className="text-sm font-black uppercase tracking-widest">{idx + 1}</span><span className="text-white/10">/</span><span className="text-sm font-black uppercase tracking-widest">{total}</span></div>
            <div className="w-full max-w-4xl space-y-16 text-center relative z-10">
                <div className="space-y-6">
                    <motion.div initial={{ scale: 0.5, y: 50 }} animate={{ scale: 1, y: 0 }} className="w-32 h-32 rounded-[40px] bg-indigo-600 flex items-center justify-center mx-auto shadow-[0_30px_60px_-15px_rgba(79,70,229,0.5)]"><Icon className="w-16 h-16 text-white" /></motion.div>
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">Missão em Andamento</div>
                </div>
                <div className="space-y-6"><h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none text-balance">{task.subject}</h2><p className="text-indigo-400 text-xl md:text-2xl font-black italic uppercase tracking-[0.2em]">{task.discipline}</p></div>
                <div className="flex items-center justify-center gap-16 text-white/20">
                    <div className="flex flex-col items-center gap-3 group"><Clock className="w-8 h-8 group-hover:text-white transition-colors" /><span className="text-sm font-black uppercase tracking-[0.2em]">{task.estimatedTime}</span></div>
                    {task.quantity && <><div className="w-px h-10 bg-white/5" /><div className="flex flex-col items-center gap-3 group"><Target className="w-8 h-8 group-hover:text-white transition-colors" /><span className="text-sm font-black uppercase tracking-[0.3em]">{task.quantity}</span></div></>}
                </div>
                <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-8">
                    <button onClick={onStart} className="w-full md:w-auto px-16 py-8 bg-indigo-600 text-white rounded-[32px] font-black text-xl uppercase tracking-widest shadow-[0_25px_50px_-12px_rgba(79,70,229,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4">
                        {getActionLabel(task.type, task.status)} <ArrowRight className="w-8 h-8" />
                    </button>
                    <button onClick={() => onFinish(task.id)} className="w-full md:w-auto px-12 py-8 bg-white/10 text-white/60 rounded-[32px] font-black text-xl uppercase tracking-widest hover:text-white hover:bg-white/20 transition-all flex items-center justify-center gap-4">
                        Marcar Concluído <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </button>
                    <button onClick={onNext} className="w-full md:w-auto px-12 py-8 bg-white/5 text-white/40 rounded-[32px] font-black text-xl uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all">Pular</button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-white/5"><motion.div initial={{ width: 0 }} animate={{ width: `${((idx + 1) / total) * 100}%` }} className="h-full bg-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.8)]" /></div>
        </motion.div>
    )
}
