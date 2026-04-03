"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Search, FileText, Calendar, Building, ChevronRight, Loader2, ArrowLeft, Plus } from 'lucide-react'
import { getConcursoEditais, ConcursoEdital } from '@/lib/concurso-editais-service'
import { SectionHeader } from '@/components/dashboard-ui'

export default function ConcursoEditaisPage() {
    const router = useRouter()
    const [editais, setEditais] = useState<ConcursoEdital[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getConcursoEditais({ status: 'publicado' })
                setEditais(data)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    const filtered = editais.filter(e => 
        e.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.banca_id?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-32">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4">
                    <button
                        onClick={() => router.push('/concursos')}
                        className="inline-flex items-center gap-2 text-indigo-500 font-black uppercase text-[10px] tracking-widest hover:translate-x-1 transition-transform"
                    >
                        <ArrowLeft className="w-4 h-4" /> Voltar para o Dashboard
                    </button>
                    <h1 className="text-5xl font-black italic tracking-tighter text-[#1A1033] dark:text-white uppercase leading-none">
                        Mural de <br /> <span className="text-indigo-600">Editais</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                        Acompanhe os principais editais de concursos públicos
                    </p>
                </div>

                <div className="flex flex-col md:items-end gap-3">
                    <div className="bg-indigo-600/5 px-6 py-4 rounded-3xl border border-indigo-500/10 flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1033] dark:text-white/40">Editais Disponíveis</span>
                        <span className="text-3xl font-black italic text-indigo-600">{editais.length}</span>
                    </div>
                </div>
            </header>

            {/* Search */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                    <Search className="w-6 h-6 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Busque por cargo, órgão ou banca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border-2 border-slate-100 focus:border-indigo-500 rounded-[35px] py-8 pl-20 pr-10 outline-none text-lg font-bold text-[#1A1033] dark:text-white shadow-lg shadow-slate-200/20 transition-all placeholder:text-slate-300"
                />
            </div>

            {/* List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                    <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Consultando Base de Editais...</p>
                </div>
            ) : filtered.length > 0 ? (
                <div className="grid gap-6">
                    {filtered.map((edital, idx) => (
                        <motion.div
                            key={edital.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => router.push(`/concursos/editais/${edital.id}`)}
                            className="group bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden"
                        >
                             <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-125 group-hover:opacity-[0.05] transition-all">
                                <FileText className="w-40 h-40" />
                            </div>

                            <div className="space-y-4 relative z-10 flex-1">
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {edital.banca_id || 'Banca não informada'}
                                    </span>
                                    <span className="bg-slate-50 text-slate-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Escolaridade TBC
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white group-hover:text-indigo-600 transition-colors">
                                    {edital.titulo}
                                </h3>
                                <div className="flex flex-wrap items-center gap-6 text-slate-400">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                        <Calendar className="w-4 h-4" /> Data da Prova: {edital.data_prova || 'TBC'}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                        <Building className="w-4 h-4" /> {edital.area_id || 'Área Principal'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 relative z-10">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1033] dark:text-white/40">Questões do Edital</span>
                                    <span className="text-2xl font-black italic text-[#1A1033] dark:text-white">{edital.total_questoes || 0}</span>
                                </div>
                                <div className="w-16 h-16 rounded-[24px] bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center justify-center">
                                    <ChevronRight className="w-6 h-6" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border-2 border-dashed border-slate-100 p-20 rounded-[40px] text-center space-y-4">
                    <p className="text-slate-300 font-black italic text-2xl uppercase">Nenhum edital encontrado</p>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Tente buscar de outra forma ou aguarde novas publicações</p>
                </div>
            )}
        </div>
    )
}
