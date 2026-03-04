'use client'

import { useState, useRef } from 'react'
import {
    createEdital, updateEdital, upsertEventos, upsertLinks,
    extractEditalInfo, uploadEditalPDF,
    type Edital, type EditalWithDetails
} from '@/lib/editais'

interface Props {
    edital?: EditalWithDetails
    onClose: () => void
    onSuccess?: (edital: Edital) => void
}

type Step = 'dados' | 'cronograma' | 'links' | 'revisao'

export default function EditalFormModal({ edital, onClose, onSuccess }: Props) {
    const isEdit = !!edital
    const [step, setStep] = useState<Step>('dados')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'extracting' | 'done' | 'error'>('idle')
    const [extractionResults, setExtractionResults] = useState<any>(null)
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

    function handleExtractTextManual() {
        if (!form.texto_extraido) return
        const extracted = extractEditalInfo(form.texto_extraido)
        setForm(prev => ({
            ...prev,
            ano: extracted.ano || prev.ano,
            taxa: extracted.taxa || prev.taxa,
        }))
    }

    async function handlePDFUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2)
        console.log(`Uploading PDF: ${file.name}, Size: ${fileSizeMB}MB`)

        setUploadStatus('uploading')
        setError(null)

        try {
            // 1. Upload to Storage
            const { publicUrl, filename } = await uploadEditalPDF(file)
            setForm(p => ({ ...p, pdf_url: publicUrl, pdf_filename: filename }))

            // 2. Extract Data
            setUploadStatus('extracting')
            const formData = new FormData()
            formData.append('pdf', file)

            const resp = await fetch('/api/admin/editais/extract', {
                method: 'POST',
                body: formData
            })

            if (!resp.ok) {
                const text = await resp.text()
                let errMsg = 'Erro na extração'
                try {
                    const errorJson = JSON.parse(text)
                    errMsg = errorJson.error || errMsg
                } catch {
                    errMsg = `Erro HTTP ${resp.status}: O servidor retornou uma página de erro (HTML).`
                }
                throw new Error(errMsg)
            }

            const result = await resp.json()

            setExtractionResults(result.extracted)
            setUploadStatus('done')

            // 3. Auto-fill Form
            const ext = result.extracted.dados
            setForm(prev => ({
                ...prev,
                titulo: ext.titulo.value || prev.titulo,
                banca: ext.banca.value || prev.banca,
                ano: ext.ano.value ? Number(ext.ano.value) : prev.ano,
                taxa: ext.taxa.value || prev.taxa,
                data_prova: ext.data_prova.value || prev.data_prova,
                data_inscricao_inicio: ext.inscricoes_inicio.value || prev.data_inscricao_inicio,
                data_inscricao_fim: ext.inscricoes_fim.value || prev.data_inscricao_fim,
                local_resumido: ext.local_cidade?.value || prev.local_resumido,
                area: ext.area.value || prev.area,
                texto_extraido: result.text || prev.texto_extraido,
                pdf_hash: result.hash,
            }))

            // 4. Auto-fill Cronograma
            if (result.extracted.cronograma?.length > 0) {
                setEventos(result.extracted.cronograma.map((c: any) => ({
                    tipo_evento: c.evento.toLowerCase().includes('inscri') ? 'inscricao' : 'prova',
                    data_inicio: c.data,
                    data_fim: '',
                    observacao: c.evento,
                    link_relacionado: ''
                })))
            }

            // 5. Auto-fill Links
            if (result.extracted.links?.length > 0) {
                setLinks(result.extracted.links.map((l: any) => ({
                    tipo: 'outros',
                    url: l.url,
                    rotulo: l.label
                })))
            }

        } catch (err: any) {
            console.error('PDF Flow error:', err)
            setError(err.message)
            setUploadStatus('error')
        }
    }

    const ConfidenceBadge = ({ confidence, source }: { confidence?: number, source?: string }) => {
        if (confidence === undefined) return null
        let color = 'bg-red-500/20 text-red-400 border-red-500/30'
        let label = 'Baixa'
        if (confidence > 0.8) {
            color = 'bg-green-500/20 text-green-400 border-green-500/30'
            label = 'Alta'
        } else if (confidence > 0.5) {
            color = 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
            label = 'Média'
        }

        return (
            <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] border ${color}`}>
                    Confiança {label}
                </span>
                {source && source.length > 5 && (
                    <span className="text-[10px] text-white/30 truncate max-w-[200px]" title={source}>
                        Fonte: "{source}"
                    </span>
                )}
            </div>
        )
    }

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
            setError('Título é obrigatório.')
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
                extraction_status: uploadStatus === 'done' ? 'done' : (error ? 'error' : 'none'),
                extracted_json: extractionResults,
            }

            let savedEdital: Edital
            if (isEdit) {
                const { data, error: uErr } = await updateEdital(edital!.id, payload)
                if (uErr || !data) throw uErr || new Error('Erro ao atualizar')
                savedEdital = data as Edital
            } else {
                const { data, error: cErr } = await createEdital(payload)
                if (cErr || !data) throw cErr || new Error('Erro ao criar')
                savedEdital = data as Edital
            }

            // Save related data
            await upsertEventos(savedEdital.id, eventos.filter(e => e.tipo_evento))
            await upsertLinks(savedEdital.id, links.filter(l => l.url && l.rotulo))

            onSuccess?.(savedEdital)
            onClose()
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Erro inesperado'
            setError(msg)
        } finally {
            setLoading(false)
        }
    }

    const steps: { id: Step; label: string; icon: string }[] = [
        { id: 'dados', label: 'Dados', icon: '📋' },
        { id: 'cronograma', label: 'Cronograma', icon: '📅' },
        { id: 'links', label: 'Links', icon: '🔗' },
        { id: 'revisao', label: 'Revisão', icon: '✅' },
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0f0f23] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[95vh] flex flex-col shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h2 className="text-lg font-bold text-white">
                        {isEdit ? '✏️ Editar Edital' : '➕ Novo Edital'}
                    </h2>
                    <button onClick={onClose} className="text-white/40 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10">✕</button>
                </div>

                {/* Steps */}
                <div className="flex border-b border-white/10">
                    {steps.map((s, i) => (
                        <button
                            key={s.id}
                            onClick={() => setStep(s.id)}
                            className={`flex-1 py-3 text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${step === s.id
                                ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/5'
                                : 'text-white/40 hover:text-white/70'
                                }`}
                        >
                            <span>{s.icon}</span>
                            <span className="hidden sm:inline">{s.label}</span>
                            <span className="sm:hidden">{i + 1}</span>
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {error && (
                        <div className="mb-4 bg-red-500/20 border border-red-500/40 rounded-xl p-3 text-red-300 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {step === 'dados' && (
                        <div className="space-y-4">
                            {/* PDF Uploader */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className={`group relative border-2 border-dashed rounded-2xl p-6 transition-all cursor-pointer overflow-hidden
                                    ${uploadStatus === 'idle' ? 'border-white/10 hover:border-blue-500/50 bg-white/5 hover:bg-white/[0.07]' : ''}
                                    ${uploadStatus === 'uploading' || uploadStatus === 'extracting' ? 'border-blue-500 bg-blue-500/5' : ''}
                                    ${uploadStatus === 'done' ? 'border-green-500/50 bg-green-500/5' : ''}
                                    ${uploadStatus === 'error' ? 'border-red-500/50 bg-red-500/5' : ''}
                                `}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePDFUpload}
                                    accept="application/pdf"
                                    className="hidden"
                                />

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 mb-3 group-hover:scale-110 transition-transform">
                                        {uploadStatus === 'idle' && <span className="text-2xl">📄</span>}
                                        {(uploadStatus === 'uploading' || uploadStatus === 'extracting') && <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent animate-spin rounded-full"></div>}
                                        {uploadStatus === 'done' && <span className="text-2xl">✅</span>}
                                        {uploadStatus === 'error' && <span className="text-2xl">❌</span>}
                                    </div>
                                    <p className="text-sm font-semibold text-white">
                                        {uploadStatus === 'idle' && 'Clique ou arraste o PDF do Edital'}
                                        {uploadStatus === 'uploading' && 'Enviando PDF...'}
                                        {uploadStatus === 'extracting' && 'Extraindo dados automaticamente...'}
                                        {uploadStatus === 'done' && 'Extração concluída com sucesso!'}
                                        {uploadStatus === 'error' && 'Erro na extração.'}
                                    </p>
                                    <p className="text-xs text-white/40 mt-1">
                                        {uploadStatus === 'idle' && 'Título, banca, datas e links serão extraídos via IA local'}
                                        {uploadStatus === 'done' && 'Revise os campos preenchidos abaixo'}
                                    </p>
                                </div>

                                {/* Progress bar if extracting */}
                                {(uploadStatus === 'uploading' || uploadStatus === 'extracting') && (
                                    <div className="absolute bottom-0 left-0 h-1 bg-blue-500/50 animate-[shimmer_2s_infinite]" style={{ width: '100%', background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)' }}></div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-white/70 text-sm mb-1.5 flex justify-between">
                                        Título do Edital *
                                        {extractionResults?.dados.titulo && <ConfidenceBadge {...extractionResults.dados.titulo} />}
                                    </label>
                                    <input
                                        type="text"
                                        value={form.titulo}
                                        onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))}
                                        placeholder="Ex: Concurso EBSERH 2025 – Médico Clínico"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-1.5 flex justify-between">
                                        Banca Organizadora
                                        {extractionResults?.dados.banca && <ConfidenceBadge {...extractionResults.dados.banca} />}
                                    </label>
                                    <input
                                        type="text"
                                        value={form.banca}
                                        onChange={e => setForm(p => ({ ...p, banca: e.target.value }))}
                                        placeholder="Ex: CEBRASPE, FCC, VUNESP..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-1.5 flex justify-between">
                                        Ano
                                        {extractionResults?.dados.ano && <ConfidenceBadge {...extractionResults.dados.ano} />}
                                    </label>
                                    <input
                                        type="number"
                                        value={form.ano}
                                        onChange={e => setForm(p => ({ ...p, ano: parseInt(e.target.value) }))}
                                        min={2000}
                                        max={2100}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-1.5 flex justify-between">
                                        Taxa de Inscrição (R$)
                                        {extractionResults?.dados.taxa && <ConfidenceBadge {...extractionResults.dados.taxa} />}
                                    </label>
                                    <input
                                        type="number"
                                        value={form.taxa}
                                        onChange={e => setForm(p => ({ ...p, taxa: e.target.value }))}
                                        placeholder="0,00"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-1.5">Área</label>
                                    <select
                                        value={form.area}
                                        onChange={e => setForm(p => ({ ...p, area: e.target.value }))}
                                        className="w-full bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="concurso">Concurso Público</option>
                                        <option value="residencia">Residência Médica</option>
                                        <option value="titulo">Título de Especialista</option>
                                        <option value="revalidacao">Revalidação</option>
                                        <option value="outros">Outros</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-1.5 flex justify-between">
                                        Data da Prova
                                        {extractionResults?.dados.data_prova && <ConfidenceBadge {...extractionResults.dados.data_prova} />}
                                    </label>
                                    <input
                                        type="date"
                                        value={form.data_prova}
                                        onChange={e => setForm(p => ({ ...p, data_prova: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-1.5 flex justify-between">
                                        Inscrições — Início
                                        {extractionResults?.dados.inscricoes_inicio && <ConfidenceBadge {...extractionResults.dados.inscricoes_inicio} />}
                                    </label>
                                    <input
                                        type="date"
                                        value={form.data_inscricao_inicio}
                                        onChange={e => setForm(p => ({ ...p, data_inscricao_inicio: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-1.5 flex justify-between">
                                        Inscrições — Fim
                                        {extractionResults?.dados.inscricoes_fim && <ConfidenceBadge {...extractionResults.dados.inscricoes_fim} />}
                                    </label>
                                    <input
                                        type="date"
                                        value={form.data_inscricao_fim}
                                        onChange={e => setForm(p => ({ ...p, data_inscricao_fim: e.target.value }))}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-1.5">Local / Cidade</label>
                                    <input
                                        type="text"
                                        value={form.local_resumido}
                                        onChange={e => setForm(p => ({ ...p, local_resumido: e.target.value }))}
                                        placeholder="Ex: Brasil todo / São Paulo-SP"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 text-sm mb-1.5">Link Oficial</label>
                                    <input
                                        type="url"
                                        value={form.fonte_url}
                                        onChange={e => setForm(p => ({ ...p, fonte_url: e.target.value }))}
                                        placeholder="https://..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-white/70 text-sm mb-1.5">Conteúdo Programático</label>
                                    <textarea
                                        value={form.conteudo_programatico}
                                        onChange={e => setForm(p => ({ ...p, conteudo_programatico: e.target.value }))}
                                        placeholder="Tópicos cobrados na prova..."
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="text-white/70 text-sm">Texto do Edital (para extração)</label>
                                        <button
                                            type="button"
                                            onClick={handleExtractTextManual}
                                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            ⚡ Extrair informações (Texto)
                                        </button>
                                    </div>
                                    <textarea
                                        value={form.texto_extraido}
                                        onChange={e => setForm(p => ({ ...p, texto_extraido: e.target.value }))}
                                        placeholder="Cole o texto do edital aqui para extração automática de datas, taxas, etc..."
                                        rows={5}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'cronograma' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-white/70 text-sm">Adicione os eventos do cronograma</p>
                                <button
                                    onClick={addEvento}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition-colors"
                                >
                                    + Evento
                                </button>
                            </div>

                            {eventos.length === 0 && (
                                <div className="text-center py-12 text-white/30">
                                    <p className="text-4xl mb-3">📅</p>
                                    <p>Nenhum evento adicionado</p>
                                    <button onClick={addEvento} className="mt-3 text-blue-400 text-sm">Adicionar primeiro evento</button>
                                </div>
                            )}

                            <div className="space-y-3">
                                {eventos.map((ev, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/50 text-xs">Evento {idx + 1}</span>
                                            <button
                                                onClick={() => removeEvento(idx)}
                                                className="text-red-400 hover:text-red-300 text-xs transition-colors"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            <div className="col-span-2 sm:col-span-1">
                                                <label className="text-white/50 text-xs mb-1 block">Tipo</label>
                                                <select
                                                    value={ev.tipo_evento}
                                                    onChange={e => setEventos(prev => prev.map((p, i) => i === idx ? { ...p, tipo_evento: e.target.value } : p))}
                                                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value="inscricao">Inscrição</option>
                                                    <option value="isencao">Isenção</option>
                                                    <option value="prova">Prova</option>
                                                    <option value="gabarito">Gabarito</option>
                                                    <option value="resultado">Resultado</option>
                                                    <option value="recurso">Recurso</option>
                                                    <option value="convocacao">Convocação</option>
                                                    <option value="outros">Outros</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-white/50 text-xs mb-1 block">Data Início</label>
                                                <input
                                                    type="date"
                                                    value={ev.data_inicio}
                                                    onChange={e => setEventos(prev => prev.map((p, i) => i === idx ? { ...p, data_inicio: e.target.value } : p))}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-white/50 text-xs mb-1 block">Data Fim</label>
                                                <input
                                                    type="date"
                                                    value={ev.data_fim}
                                                    onChange={e => setEventos(prev => prev.map((p, i) => i === idx ? { ...p, data_fim: e.target.value } : p))}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-4">
                                                <label className="text-white/50 text-xs mb-1 block">Observação</label>
                                                <input
                                                    type="text"
                                                    value={ev.observacao}
                                                    onChange={e => setEventos(prev => prev.map((p, i) => i === idx ? { ...p, observacao: e.target.value } : p))}
                                                    placeholder="Detalhes adicionais..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'links' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-white/70 text-sm">Links oficiais relacionados</p>
                                <button
                                    onClick={addLink}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-lg transition-colors"
                                >
                                    + Link
                                </button>
                            </div>

                            {links.length === 0 && (
                                <div className="text-center py-12 text-white/30">
                                    <p className="text-4xl mb-3">🔗</p>
                                    <p>Nenhum link adicionado</p>
                                    <button onClick={addLink} className="mt-3 text-blue-400 text-sm">Adicionar link</button>
                                </div>
                            )}

                            <div className="space-y-3">
                                {links.map((lk, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/50 text-xs">Link {idx + 1}</span>
                                            <button
                                                onClick={() => removeLink(idx)}
                                                className="text-red-400 hover:text-red-300 text-xs transition-colors"
                                            >
                                                Remover
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            <div>
                                                <label className="text-white/50 text-xs mb-1 block">Tipo</label>
                                                <select
                                                    value={lk.tipo}
                                                    onChange={e => setLinks(prev => prev.map((p, i) => i === idx ? { ...p, tipo: e.target.value } : p))}
                                                    className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value="inscricao">Inscrição</option>
                                                    <option value="banca">Banca</option>
                                                    <option value="resultado">Resultado</option>
                                                    <option value="retificacao">Retificação</option>
                                                    <option value="edital">Edital PDF</option>
                                                    <option value="outros">Outros</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-white/50 text-xs mb-1 block">Rótulo</label>
                                                <input
                                                    type="text"
                                                    value={lk.rotulo}
                                                    onChange={e => setLinks(prev => prev.map((p, i) => i === idx ? { ...p, rotulo: e.target.value } : p))}
                                                    placeholder="Nome do link"
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-white/50 text-xs mb-1 block">URL</label>
                                                <input
                                                    type="url"
                                                    value={lk.url}
                                                    onChange={e => setLinks(prev => prev.map((p, i) => i === idx ? { ...p, url: e.target.value } : p))}
                                                    placeholder="https://..."
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'revisao' && (
                        <div className="space-y-4">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                                <h3 className="text-white font-semibold">Resumo do Edital</h3>
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <span className="text-white/50">Título:</span>
                                        <p className="text-white">{form.titulo || '—'}</p>
                                    </div>
                                    <div>
                                        <span className="text-white/50">Banca:</span>
                                        <p className="text-white">{form.banca || '—'}</p>
                                    </div>
                                    <div>
                                        <span className="text-white/50">Ano:</span>
                                        <p className="text-white">{form.ano}</p>
                                    </div>
                                    <div>
                                        <span className="text-white/50">Taxa:</span>
                                        <p className="text-white">{form.taxa ? `R$ ${form.taxa}` : '—'}</p>
                                    </div>
                                    <div>
                                        <span className="text-white/50">Data Prova:</span>
                                        <p className="text-white">{form.data_prova ? new Date(form.data_prova + 'T12:00').toLocaleDateString('pt-BR') : '—'}</p>
                                    </div>
                                    <div>
                                        <span className="text-white/50">Local:</span>
                                        <p className="text-white">{form.local_resumido || '—'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2 text-sm text-white/50 border-t border-white/5">
                                    <span>{eventos.length} evento(s) no cronograma</span>
                                    <span>·</span>
                                    <span>{links.length} link(s)</span>
                                </div>
                            </div>

                            {!form.titulo && (
                                <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-xl p-3 text-yellow-300 text-sm">
                                    ⚠️ O título é obrigatório para publicar.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 flex gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-colors text-sm"
                    >
                        Cancelar
                    </button>

                    <div className="flex-1 flex gap-2 justify-end">
                        <button
                            onClick={() => handleSave(false)}
                            disabled={loading}
                            className="px-4 py-2.5 bg-white/10 hover:bg-white/15 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors"
                        >
                            {loading ? '...' : 'Salvar Rascunho'}
                        </button>
                        <button
                            onClick={() => handleSave(true)}
                            disabled={loading || !form.titulo}
                            className="px-4 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-colors"
                        >
                            {loading ? '...' : '🚀 Publicar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
