'use client'

import { useState, useRef } from 'react'
import {
    createConcursoEdital, updateConcursoEdital, upsertConcursoEventos, upsertConcursoLinks,
    type Edital, type EditalWithDetails
} from '@/lib/concursos/editais'
import { X, ClipboardCheck, Calendar, Link as LinkIcon, CheckCircle2, AlertCircle, FileText, Upload, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

interface Props {
    edital?: EditalWithDetails
    onClose: () => void
    onSuccess?: (edital: Edital) => void
}

type Step = 'dados' | 'cronograma' | 'links' | 'revisao'

export default function ConcursoEditalFormModal({ edital, onClose, onSuccess }: Props) {
    const isEdit = !!edital
    const [step, setStep] = useState<Step>('dados')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'extracting' | 'done' | 'error'>('idle')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [form, setForm] = useState({
        titulo: edital?.titulo || '',
        banca: edital?.banca || '',
        ano: edital?.ano ?? new Date().getFullYear(),
        taxa: edital?.taxa ?? '',
        data_prova: edital?.data_prova || '',
        data_inscricao_inicio: edital?.data_inscricao_inicio || '',
        data_inscricao_fim: edital?.data_inscricao_fim || '',
        local_resumido: edital?.local_resumido || '',
        fonte_url: edital?.fonte_url || '',
        conteudo_programatico: edital?.conteudo_programatico || '',
        etapas_regras: edital?.etapas_regras || '',
        area: edital?.area || 'concurso',
        texto_extraido: edital?.texto_extraido || '',
    })

    const [eventos, setEventos] = useState(
        edital?.edital_eventos?.map(e => ({
            tipo_evento: e.tipo_evento,
            data_inicio: e.data_inicio || '',
            data_fim: e.data_fim || '',
            observacao: e.observacao || '',
            link_relacionado: e.link_relacionado || '',
        })) || []
    )

    const [links, setLinks] = useState(
        edital?.edital_links?.map(l => ({
            tipo: l.tipo,
            url: l.url,
            rotulo: l.rotulo,
        })) || []
    )

    function addEvento() {
        setEventos(prev => [...prev, { tipo_evento: 'inscricao', data_inicio: '', data_fim: '', observacao: '', link_relacionado: '' }])
    }

    function removeEvento(idx: number) {
        setEventos(prev => prev.filter((_, i) => i !== idx))
    }

    function addLink() {
        setLinks(prev => [...prev, { tipo: 'inscricao', url: '', rotulo: '' }])
    }

    function removeLink(idx: number) {
        setLinks(prev => prev.filter((_, i) => i !== idx))
    }

    async function handleSave(publish = false) {
        if (!form.titulo.trim()) {
            toast.error('Título é obrigatório.')
            setStep('dados')
            return
        }
        setLoading(true)
        setError(null)

        try {
            const payload: Partial<Edital> = {
                ...form,
                taxa: form.taxa ? Number(form.taxa) : undefined,
                data_prova: form.data_prova || undefined,
                data_inscricao_inicio: form.data_inscricao_inicio || undefined,
                data_inscricao_fim: form.data_inscricao_fim || undefined,
                status: publish ? 'publicado' : (edital?.status || 'rascunho'),
            }

            let savedEdital: Edital
            if (isEdit) {
                const { data, error: uErr } = await updateConcursoEdital(edital!.id, payload)
                if (uErr || !data) throw uErr || new Error('Erro ao atualizar')
                savedEdital = data as Edital
            } else {
                const { data, error: cErr } = await createConcursoEdital(payload)
                if (cErr || !data) throw cErr || new Error('Erro ao criar')
                savedEdital = data as Edital
            }

            // Save related data
            await upsertConcursoEventos(savedEdital.id, eventos.filter(e => e.tipo_evento))
            await upsertConcursoLinks(savedEdital.id, links.filter(l => l.url && l.rotulo))

            toast.success(publish ? 'Edital publicado!' : 'Alterações salvas!')
            onSuccess?.(savedEdital)
            onClose()
        } catch (err: any) {
            setError(err.message || 'Erro inesperado')
            toast.error('Erro ao salvar edital')
        } finally {
            setLoading(false)
        }
    }

    const steps: { id: Step; label: string; icon: any }[] = [
        { id: 'dados', label: 'Dados Base', icon: ClipboardCheck },
        { id: 'cronograma', label: 'Datas', icon: Calendar },
        { id: 'links', label: 'Links', icon: LinkIcon },
        { id: 'revisao', label: 'Revisão', icon: CheckCircle2 },
    ]

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-slate-100 rounded-[3rem] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-10 py-8 border-b border-slate-50">
                    <div>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
                            {isEdit ? 'Editar Certame' : 'Novo Edital Concurso'}
                        </h2>
                        <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mt-1">Ambiente de Operações Master</p>
                    </div>
                    <button onClick={onClose} className="p-4 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-2xl">
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Steps */}
                <div className="flex px-10 border-b border-slate-50 overflow-x-auto no-scrollbar">
                    {steps.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setStep(s.id)}
                            className={`flex items-center gap-3 px-8 py-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-4 ${
                                step === s.id 
                                ? 'text-indigo-600 border-indigo-600' 
                                : 'text-slate-300 border-transparent hover:text-slate-400'
                            }`}
                        >
                            <s.icon size={16} />
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8">
                    {error && (
                        <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-center gap-4 text-rose-600 text-sm font-bold animate-in zoom-in">
                            <AlertCircle size={24} />
                            {error}
                        </div>
                    )}

                    {step === 'dados' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Título do Certame</label>
                                <input 
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500/10 transition-all shadow-inner"
                                    value={form.titulo}
                                    onChange={e => setForm({...form, titulo: e.target.value})}
                                    placeholder="Ex: PC-PI Agente de Polícia 2025"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Banca Organizadora</label>
                                <input 
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500/10 transition-all shadow-inner"
                                    value={form.banca}
                                    onChange={e => setForm({...form, banca: e.target.value})}
                                    placeholder="Ex: NUCEPE, CEBRASPE, FGV..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Ano</label>
                                <input 
                                    type="number"
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500/10 transition-all shadow-inner"
                                    value={form.ano}
                                    onChange={e => setForm({...form, ano: parseInt(e.target.value)})}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Taxa de Inscrição (R$)</label>
                                <input 
                                    type="number"
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500/10 transition-all shadow-inner"
                                    value={form.taxa}
                                    onChange={e => setForm({...form, taxa: e.target.value})}
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Local / UF</label>
                                <input 
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500/10 transition-all shadow-inner"
                                    value={form.local_resumido}
                                    onChange={e => setForm({...form, local_resumido: e.target.value})}
                                    placeholder="Ex: Teresina - PI"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Conteúdo Programático</label>
                                <textarea 
                                    rows={4}
                                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500/10 transition-all shadow-inner resize-none text-sm"
                                    value={form.conteudo_programatico}
                                    onChange={e => setForm({...form, conteudo_programatico: e.target.value})}
                                    placeholder="Resumo dos tópicos principais..."
                                />
                            </div>
                        </div>
                    )}

                    {step === 'cronograma' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-900">Linha do Tempo</h3>
                                <button 
                                    onClick={addEvento}
                                    className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {eventos.map((ev, i) => (
                                    <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-3 gap-6 relative group animate-in slide-in-from-left-4">
                                        <button 
                                            onClick={() => removeEvento(i)}
                                            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={16} />
                                        </button>
                                        
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-400">Tipo de Evento</label>
                                            <select 
                                                className="w-full bg-white border-none rounded-xl p-3 text-xs font-bold outline-none"
                                                value={ev.tipo_evento}
                                                onChange={e => setEventos(prev => prev.map((p, idx) => idx === i ? {...p, tipo_evento: e.target.value} : p))}
                                            >
                                                <option value="inscricao">Inscrição</option>
                                                <option value="prova">Prova</option>
                                                <option value="resultado">Resultado</option>
                                                <option value="gabarito">Gabarito</option>
                                                <option value="isencao">Isenção</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-400">Data Inicial</label>
                                            <input 
                                                type="date"
                                                className="w-full bg-white border-none rounded-xl p-3 text-xs font-bold outline-none"
                                                value={ev.data_inicio}
                                                onChange={e => setEventos(prev => prev.map((p, idx) => idx === i ? {...p, data_inicio: e.target.value} : p))}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-400">Data Final (Opcional)</label>
                                            <input 
                                                type="date"
                                                className="w-full bg-white border-none rounded-xl p-3 text-xs font-bold outline-none"
                                                value={ev.data_fim}
                                                onChange={e => setEventos(prev => prev.map((p, idx) => idx === i ? {...p, data_fim: e.target.value} : p))}
                                            />
                                        </div>

                                        <div className="md:col-span-3 space-y-2">
                                            <input 
                                                className="w-full bg-white border-none rounded-xl p-3 text-xs font-bold outline-none"
                                                placeholder="Observação (ex: Horário da prova, link específico...)"
                                                value={ev.observacao}
                                                onChange={e => setEventos(prev => prev.map((p, idx) => idx === i ? {...p, observacao: e.target.value} : p))}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {eventos.length === 0 && (
                                    <div className="p-16 border-2 border-dashed border-slate-100 rounded-[3rem] text-center space-y-4">
                                        <Calendar size={48} className="text-slate-100 mx-auto" />
                                        <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Nenhuma data importante definida</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 'links' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black uppercase italic tracking-tight text-slate-900">Atalhos Externos</h3>
                                <button 
                                    onClick={addLink}
                                    className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {links.map((lk, i) => (
                                    <div key={i} className="p-6 bg-slate-50 rounded-3xl space-y-4 relative group animate-in zoom-in">
                                        <button 
                                            onClick={() => removeLink(i)}
                                            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 transition-all"
                                        >
                                            <X size={14} />
                                        </button>
                                        <div className="grid gap-3">
                                            <input 
                                                className="w-full bg-white border-none rounded-xl p-3 text-[10px] font-black uppercase tracking-widest outline-none shadow-sm"
                                                placeholder="Rótulo (ex: Baixar PDF)"
                                                value={lk.rotulo}
                                                onChange={e => setLinks(prev => prev.map((p, idx) => idx === i ? {...p, rotulo: e.target.value} : p))}
                                            />
                                            <input 
                                                className="w-full bg-white border-none rounded-xl p-3 text-xs font-bold outline-none shadow-sm"
                                                placeholder="URL (https://...)"
                                                value={lk.url}
                                                onChange={e => setLinks(prev => prev.map((p, idx) => idx === i ? {...p, url: e.target.value} : p))}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'revisao' && (
                        <div className="space-y-8 animate-in fade-in">
                            <div className="bg-indigo-900 p-12 rounded-[4rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
                                <FileText size={120} className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none" />
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Resumo da Publicação</p>
                                    <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{form.titulo || 'Sem Título'}</h3>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-indigo-400">Banca</p>
                                        <p className="text-sm font-bold italic">{form.banca || 'Definir'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-indigo-400">Ano</p>
                                        <p className="text-sm font-bold italic">{form.ano}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-indigo-400">Datas</p>
                                        <p className="text-sm font-bold italic">{eventos.length} marcos</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase text-indigo-400">Links</p>
                                        <p className="text-sm font-bold italic">{links.length} ativos</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button 
                        onClick={onClose}
                        className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
                    >
                        Descartar
                    </button>
                    <div className="flex gap-4">
                        <button 
                            disabled={loading}
                            onClick={() => handleSave(false)}
                            className="px-8 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
                        >
                            {loading ? 'Salvando...' : 'Salvar Rascunho'}
                        </button>
                        <button 
                            disabled={loading}
                            onClick={() => handleSave(true)}
                            className="px-12 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            {loading ? 'Processando...' : '⚡ Publicar Edital'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

function Plus({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    )
}
