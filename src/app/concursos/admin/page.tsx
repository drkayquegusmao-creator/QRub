"use client"

import { useState, useEffect, useMemo } from 'react'
import {
    Activity, Database, Package, Users, TrendingUp, BarChart3,
    ArrowUpRight, Clock, ShieldCheck, Mail, Target, Award,
    FileText, Zap, LucideIcon, Search, Trash2, CheckCircle2,
    XCircle, AlertCircle, RefreshCw, Plus, Eye, ArrowLeft
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useSearchParams, useRouter } from 'next/navigation'

// Components
import ConcursoTaxonomyEditor from '@/components/concursos/admin-taxonomy-editor'

interface StatCardProps {
    title: string
    value: string | number
    label: string
    icon: LucideIcon
    trend?: string
    color: string
}

function StatCard({ title, value, label, icon: Icon, trend, color }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group"
        >
            <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-inner group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                </div>
                {trend && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
                        <ArrowUpRight size={12} />
                        {trend}
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{title}</p>
                <h3 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{value}</h3>
                <p className="text-xs font-bold text-slate-400 mt-2">{label}</p>
            </div>
        </motion.div>
    )
}

export default function ConcursoAdminPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tab = searchParams.get('tab') || 'analytics'

    const [stats, setStats] = useState({
        questions: '0',
        packages: '0',
        activeEditais: '0',
        activeUsers: '0'
    })
    const [loading, setLoading] = useState(true)

    // Questions State
    const [questions, setQuestions] = useState<any[]>([])
    const [loadingQuestions, setLoadingQuestions] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchStats()
        if (tab === 'questions') fetchQuestions()
    }, [tab])

    async function fetchStats() {
        setLoading(true)
        try {
            const { count: qCount } = await supabase.from('concurso_questao_base').select('*', { count: 'exact', head: true })
            const { count: pCount } = await supabase.from('concurso_question_packages').select('*', { count: 'exact', head: true })
            const { count: eCount } = await supabase.from('concurso_editais').select('*', { count: 'exact', head: true })
            const { count: uCount } = await supabase.from('users').select('*', { count: 'exact', head: true })

            setStats({
                questions: qCount?.toString() || '0',
                packages: pCount?.toString() || '0',
                activeEditais: eCount?.toString() || '0',
                activeUsers: uCount?.toString() || '0'
            })
        } catch (err) {
            console.error('Error fetching admin stats:', err)
        } finally {
            setLoading(false)
        }
    }

    async function fetchQuestions() {
        setLoadingQuestions(true)
        try {
            const { data } = await supabase
                .from('concurso_questao_base')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(50)
            setQuestions(data || [])
        } catch (err) {
            console.error('Error fetching questions:', err)
        } finally {
            setLoadingQuestions(false)
        }
    }

    const filteredQuestions = useMemo(() => {
        if (!searchTerm) return questions
        return questions.filter(q => 
            q.enunciado?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.taxonomy_path?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [questions, searchTerm])

    // --- Renders ---

    const renderAnalytics = () => (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Base de Dados"
                    value={stats.questions}
                    label="Questões Consolidadas"
                    icon={Database}
                    trend="+12%"
                    color="bg-indigo-50 text-indigo-600"
                />
                <StatCard
                    title="Operações IA"
                    value={stats.packages}
                    label="Pacotes de Ingestão"
                    icon={Package}
                    trend="Estável"
                    color="bg-amber-50 text-amber-600"
                />
                <StatCard
                    title="Editais"
                    value={stats.activeEditais}
                    label="Publicados Total"
                    icon={FileText}
                    color="bg-emerald-50 text-emerald-600"
                />
                <StatCard
                    title="Alunos"
                    value={stats.activeUsers}
                    label="Cadastrados no Ecossistema"
                    icon={Users}
                    color="bg-blue-50 text-blue-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-indigo-900 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
                        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                            <Zap size={240} className="text-white fill-white" />
                        </div>
                        <div className="relative z-10 max-w-lg space-y-6">
                            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Growth Metrics</h2>
                            <p className="text-indigo-200 font-medium leading-relaxed">
                                A infraestrutura do ambiente Concursos está 100% isolada. Monitore o fluxo de ingestão de questões via Console de Pacotes.
                            </p>
                            <button 
                                onClick={() => router.push('/concursos/admin/pacotes')}
                                className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl"
                            >
                                Gerenciar Pacotes IA
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 p-10 rounded-[4rem] space-y-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black italic uppercase tracking-tight text-slate-900">Eventos Master</h3>
                        <Clock size={20} className="text-slate-300" />
                    </div>
                    <div className="space-y-6">
                        {[
                            { icon: Database, msg: 'Taxonomia "Concursos" sincronizada', time: '5 min atrás' },
                            { icon: Package, msg: 'Fila de aprovação de questões ativa', time: '1h atrás' },
                            { icon: Award, msg: 'Verificação de RLS concluída', time: 'Aguardando' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-center">
                                <div className="p-3 bg-slate-50 text-slate-400 rounded-xl">
                                    <item.icon size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-black text-slate-600 leading-tight">{item.msg}</p>
                                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    const renderQuestions = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter line-clamp-1">Banco de Dados Master</h2>
                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest opacity-60">Questões Ativas no Ambiente Concursos</p>
                </div>
                <div className="flex bg-white border border-slate-100 rounded-2xl px-6 py-2 items-center gap-4 w-full md:w-96 shadow-sm">
                    <Search className="text-slate-300" size={20} />
                    <input 
                        placeholder="Buscar por enunciado ou taxonomia..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none font-bold text-sm w-full"
                    />
                </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                        <tr>
                            <th className="px-8 py-6">ID & Taxonomia</th>
                            <th className="px-8 py-6">Enunciado</th>
                            <th className="px-8 py-6">Fonte</th>
                            <th className="px-8 py-6 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loadingQuestions ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-8 py-10 bg-slate-50/20" />
                                </tr>
                            ))
                        ) : filteredQuestions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-20 text-center text-slate-300 uppercase text-xs font-black tracking-widest italic">Nenhuma questão encontrada</td>
                            </tr>
                        ) : filteredQuestions.map(q => (
                            <tr key={q.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="space-y-1">
                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-500 text-[8px] font-black rounded uppercase tracking-tighter">{q.id.substring(0, 8)}</span>
                                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest line-clamp-1 max-w-[200px]">{q.taxonomy_path || 'Sem Taxonomia'}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-sm font-bold leading-relaxed line-clamp-2 text-slate-700 max-w-xl italic">&quot;{q.enunciado}&quot;</p>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest">{q.source || 'Manual'}</span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <button className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

    const renderUsers = () => (
        <div className="p-20 flex flex-col items-center justify-center text-center space-y-6 bg-white border border-slate-100 rounded-[4rem] shadow-sm animate-in fade-in">
            <Users size={64} className="text-slate-100" strokeWidth={3} />
            <div>
                <h3 className="text-2xl font-black uppercase italic italic text-slate-900 tracking-tight">Gestão Global de Usuários</h3>
                <p className="text-slate-400 font-medium max-w-md mx-auto mt-2">Os usuários são compartilhados entre os ambientes. Use o Admin Principal para gestão avançada de filas e suporte.</p>
            </div>
            <button 
                onClick={() => router.push('/concursos/admin?tab=users')}
                className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-600/20"
            >
                Abrir Central de Usuários
            </button>
        </div>
    )

    return (
        <div className="pb-20">
            {tab === 'analytics' && renderAnalytics()}
            {tab === 'questions' && renderQuestions()}
            {tab === 'users' && renderUsers()}
        </div>
    )
}
