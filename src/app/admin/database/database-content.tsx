"use client"

import { useState, useEffect } from 'react'
import { Save, ChevronRight, BookOpen, Database, Download, Upload, FileSpreadsheet, ShieldCheck } from 'lucide-react'
import { COURSES, Course, Specialty, Subspecialty, QuestionMetadata } from '@/lib/data-mock'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuestions } from '@/store/use-questions'

export default function DatabaseContent() {
    const { questions, guidelines, loadQuestions, loadGuidelines, addQuestion, addQuestions } = useQuestions()
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
    const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null)
    const [selectedSubspecialty, setSelectedSubspecialty] = useState<Subspecialty | null>(null)

    const [selectedGuidelineId, setSelectedGuidelineId] = useState('')
    const [metadata, setMetadata] = useState<QuestionMetadata>({
        concurso: '',
        cargo: '',
        eixo: '',
        tema: '',
        subtema: '',
        origem: 'Gerada automaticamente – QRub',
        data_geracao: new Date().toISOString()
    })

    const [enunciado, setEnunciado] = useState('')
    const [options, setOptions] = useState([
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' },
        { id: 'e', text: '' }
    ])
    const [correctOptionId, setCorrectOptionId] = useState('a')
    const [explanation, setExplanation] = useState('')
    const [difficulty, setDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil'>('Médio')

    // Load data on mount
    useEffect(() => {
        loadQuestions()
        loadGuidelines()
    }, [loadQuestions, loadGuidelines])

    const handleExportXLS = async () => {
        const XLSX = await import('xlsx')
        // Flatten data for XLS
        const flatQuestions = questions.map(q => ({
            ID: q.id,
            Curso: q.course_id,
            Especialidade: q.specialty_id,
            Subespecialidade: q.subspecialty_id || '',
            Assunto: q.subject_id || '',
            Dificuldade: q.difficulty,
            Enunciado: q.enunciado,
            OpcaoA: q.options.find(o => o.id === 'a')?.text || '',
            OpcaoB: q.options.find(o => o.id === 'b')?.text || '',
            OpcaoC: q.options.find(o => o.id === 'c')?.text || '',
            OpcaoD: q.options.find(o => o.id === 'd')?.text || '',
            OpcaoE: q.options.find(o => o.id === 'e')?.text || '',
            Correta: q.correct_option_id,
            Explicação: q.explanation,
            DiretrizID: q.guideline_id || '',
            Concurso: q.metadata?.concurso || '',
            Cargo: q.metadata?.cargo || '',
            Eixo: q.metadata?.eixo || '',
            Tema: q.metadata?.tema || '',
            Origem: q.metadata?.origem || '',
            Imagem: q.image_url || '',
            Referencia: q.references || '',
            LinkRevisao: q.revision_link || ''
        }))

        const ws = XLSX.utils.json_to_sheet(flatQuestions)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Banco de Questões")
        XLSX.writeFile(wb, `QRUB_QUESTOES_BACKUP_${new Date().toISOString().slice(0, 10)}.xlsx`)
    }

    const handleImportXLS = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const XLSX = await import('xlsx')
        const reader = new FileReader()

        reader.onload = async (e) => {
            try {
                const data = e.target?.result
                const workbook = XLSX.read(data, { type: 'binary' })
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const jsonData = XLSX.utils.sheet_to_json(sheet)

                const parsedQuestions = jsonData.map((row: any) => ({
                    id: row.ID || `QRUB-XLS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                    course_id: row.Curso || 'medicina',
                    specialty_id: row.Especialidade || 'geral',
                    subspecialty_id: row.Subespecialidade || 'geral',
                    subject_id: row.Assunto || 'geral',
                    difficulty: row.Dificuldade || 'Médio',
                    enunciado: row.Enunciado || '',
                    options: [
                        { id: 'a', text: row.OpcaoA || '' },
                        { id: 'b', text: row.OpcaoB || '' },
                        { id: 'c', text: row.OpcaoC || '' },
                        { id: 'd', text: row.OpcaoD || '' },
                        { id: 'e', text: row.OpcaoE || '' },
                    ].filter(o => o.text),
                    correct_option_id: row.Correta?.toLowerCase() || 'a',
                    explanation: row.Explicação || '',
                    guideline_id: row.DiretrizID || undefined,
                    metadata: {
                        concurso: row.Concurso || '',
                        cargo: row.Cargo || '',
                        eixo: row.Eixo || '',
                        tema: row.Tema || '',
                        origem: row.Origem || 'Importado via XLS',
                        data_geracao: new Date().toISOString()
                    },
                    image_url: row.Imagem || undefined,
                    references: row.Referencia || undefined,
                    revision_link: row.LinkRevisao || undefined
                }))

                if (parsedQuestions.length > 0) {
                    await addQuestions(parsedQuestions as any)
                    alert(`${parsedQuestions.length} questões importadas via XLS com sucesso!`)
                    loadQuestions()
                } else {
                    alert('Nenhuma questão válida encontrada no XLS.')
                }
            } catch (error) {
                console.error('Erro na importação XLS:', error)
                alert('Erro ao processar arquivo XLS. Verifique o formato.')
            }
        }
        reader.readAsBinaryString(file)
    }

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(questions, null, 2)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        const exportFileDefaultName = `qrub-backup-${new Date().toISOString().slice(0, 10)}.json`
        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }

    const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader()
        if (event.target.files && event.target.files.length > 0) {
            fileReader.readAsText(event.target.files[0], "UTF-8")
            fileReader.onload = async (e) => {
                if (e.target?.result) {
                    try {
                        const parsedQuestions = JSON.parse(e.target.result as string)
                        if (Array.isArray(parsedQuestions)) {
                            await addQuestions(parsedQuestions as any)
                            alert(`${parsedQuestions.length} questões importadas com sucesso!`)
                            loadQuestions()
                        } else {
                            alert('Formato de arquivo inválido. Certifique-se de que é um array JSON de questões.')
                        }
                    } catch (error) {
                        console.error(error)
                        alert('Erro ao processar o arquivo. Verifique se é um JSON válido.')
                    }
                }
            }
        }
    }

    useEffect(() => {
        setSelectedSpecialty(null)
        setSelectedSubspecialty(null)
    }, [selectedCourse])

    useEffect(() => {
        setSelectedSubspecialty(null)
    }, [selectedSpecialty])


    const handleSave = async () => {
        if (!selectedCourse) return

        try {
            const selectedGuideline = guidelines.find(g => g.id === selectedGuidelineId)

            await addQuestion({
                course_id: selectedCourse.id,
                specialty_id: selectedSpecialty?.id || 'geral',
                subspecialty_id: selectedSubspecialty?.id || 'geral',
                subject_id: metadata.tema || 'manual',
                difficulty: difficulty,
                enunciado,
                options,
                correct_option_id: correctOptionId,
                explanation,
                guideline_id: selectedGuidelineId || undefined,
                guideline_version: selectedGuideline?.version || undefined,
                metadata: {
                    ...metadata,
                    data_geracao: new Date().toISOString()
                },
                case_study: { history: '', physical_exam: '', lab_results: '' }
            })

            alert('Questão salva com sucesso seguindo os padrões QRub!')
            setEnunciado('')
            setOptions([{ id: 'a', text: '' }, { id: 'b', text: '' }, { id: 'c', text: '' }, { id: 'd', text: '' }, { id: 'e', text: '' }])
            loadQuestions()
        } catch (error) {
            console.error('Error saving question:', error)
            alert('Erro ao salvar questão. Tente novamente.')
        }
    }

    return (
        <div className="space-y-12 pb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-xl">
                        <Database className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter">Gestão de Conteúdo (QRub Pro)</h1>
                </div>

                <div className="flex gap-2">
                    <div className="flex gap-2 mr-4 border-r border-border pr-4">
                        <button
                            onClick={handleExportXLS}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-500/20 transition-all"
                        >
                            <FileSpreadsheet className="w-4 h-4" />
                            Relatório (XLS)
                        </button>
                        <label className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-500/20 transition-all cursor-pointer">
                            <Upload className="w-4 h-4" />
                            Importar (XLS)
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleImportXLS}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <button
                        onClick={handleExportJSON}
                        className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-xs font-black uppercase tracking-widest text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                    >
                        <Download className="w-4 h-4" />
                        JSON
                    </button>
                    <label className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl text-xs font-black uppercase tracking-widest text-primary hover:bg-primary/20 transition-all cursor-pointer">
                        <Upload className="w-4 h-4" />
                        Restaurar
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImportJSON}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Step 1: Hierarquia e Diretrizes */}
                <section className="space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</span>
                            Hierarquia e Diretrizes
                        </h3>

                        <div className="space-y-4">
                            <FilterSelect
                                label="Curso"
                                options={COURSES}
                                onSelect={(id) => setSelectedCourse(COURSES.find(c => c.id === id) || null)}
                            />

                            <AnimatePresence>
                                {selectedCourse && (
                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                        <FilterSelect
                                            label="Especialidade"
                                            options={selectedCourse.specialties}
                                            onSelect={(id) => setSelectedSpecialty(selectedCourse.specialties.find(s => s.id === id) || null)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {selectedSpecialty && (
                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                        <div className="space-y-4">
                                            <FilterSelect
                                                label="Subespecialidade"
                                                options={selectedSpecialty.subspecialties}
                                                onSelect={(id) => setSelectedSubspecialty(selectedSpecialty.subspecialties.find(s => s.id === id) || null)}
                                            />

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    Diretriz Base
                                                </label>
                                                <select
                                                    value={selectedGuidelineId}
                                                    onChange={(e) => setSelectedGuidelineId(e.target.value)}
                                                    className="w-full bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none font-bold text-sm text-primary"
                                                >
                                                    <option value="">Nenhuma vinculada...</option>
                                                    {guidelines.filter(g => g.specialty_id === selectedSpecialty.id || g.specialty_id === 'geral').map(g => (
                                                        <option key={g.id} value={g.id}>{g.name} ({g.version})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-border">
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            Metadados Obrigatórios
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground px-1">Concurso</label>
                                <input
                                    type="text"
                                    value={metadata.concurso}
                                    onChange={(e) => setMetadata({ ...metadata, concurso: e.target.value })}
                                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-xs font-bold"
                                    placeholder="Ex: Revalida"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground px-1">Cargo</label>
                                <input
                                    type="text"
                                    value={metadata.cargo}
                                    onChange={(e) => setMetadata({ ...metadata, cargo: e.target.value })}
                                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-xs font-bold"
                                    placeholder="Ex: Médico"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground px-1">Eixo</label>
                                <input
                                    type="text"
                                    value={metadata.eixo}
                                    onChange={(e) => setMetadata({ ...metadata, eixo: e.target.value })}
                                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-xs font-bold"
                                    placeholder="Ex: Pediatria"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground px-1">Tema</label>
                                <input
                                    type="text"
                                    value={metadata.tema}
                                    onChange={(e) => setMetadata({ ...metadata, tema: e.target.value })}
                                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-xs font-bold"
                                    placeholder="Ex: Asma"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Step 2: Enunciado & Options */}
                <section className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">2</span>
                            Corpo da Questão (Padrão QRub)
                        </h3>
                        <div className="flex gap-2">
                            {['Fácil', 'Médio', 'Difícil'].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDifficulty(d as 'Fácil' | 'Médio' | 'Difícil')}
                                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-all ${difficulty === d ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Enunciado (Markdown)</label>
                                <span className="text-[10px] text-primary font-black uppercase tracking-tighter">Siga a ordem: ID + Queixa + Tempo + SV + Exames</span>
                            </div>
                            <textarea
                                value={enunciado}
                                onChange={(e) => setEnunciado(e.target.value)}
                                placeholder="Insira o texto da questão aqui..."
                                className="w-full h-40 bg-card border border-border rounded-2xl p-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium leading-relaxed"
                            />
                        </div>

                        <div className="grid gap-4">
                            <label className="text-xs font-bold uppercase text-muted-foreground">Alternativas (A-E)</label>
                            {options.map((opt, idx) => (
                                <div key={opt.id} className="flex gap-4">
                                    <button
                                        onClick={() => setCorrectOptionId(opt.id)}
                                        className={`w-12 h-12 rounded-xl font-black transition-all shrink-0 ${correctOptionId === opt.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        {opt.id.toUpperCase()}
                                    </button>
                                    <input
                                        type="text"
                                        value={opt.text}
                                        onChange={(e) => {
                                            const newOptions = [...options]
                                            newOptions[idx].text = e.target.value
                                            setOptions(newOptions)
                                        }}
                                        placeholder={`Opção ${opt.id.toUpperCase()}...`}
                                        className="flex-1 bg-card border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-primary">
                                <BookOpen className="w-4 h-4" />
                                <label className="text-xs font-bold uppercase">Explicação Baseada em Diretriz</label>
                            </div>
                            <textarea
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                placeholder="Cite a diretriz e explique por que as outras opções estão incorretas (Padrão Psicométrico)..."
                                className="w-full h-32 bg-primary/5 border border-primary/20 rounded-2xl p-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium italic"
                            />
                        </div>

                        <div className="pt-8 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={!selectedCourse || !enunciado || !selectedGuidelineId}
                                title={!selectedGuidelineId ? "Vincule uma diretriz para salvar" : ""}
                                className="royal-gradient text-white px-12 py-5 rounded-2xl font-black text-xl flex items-center gap-3 soft-shadow hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                            >
                                <Save className="w-6 h-6" />
                                SALVAR QUESTÃO
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

function FilterSelect({ label, options, onSelect }: { label: string, options: { id: string, name: string }[], onSelect: (id: string) => void }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{label}</label>
            <div className="relative">
                <select
                    onChange={(e) => onSelect(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-primary/20 outline-none font-bold text-sm"
                >
                    <option value="">Selecione...</option>
                    {options.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90" />
            </div>
        </div>
    )
}
