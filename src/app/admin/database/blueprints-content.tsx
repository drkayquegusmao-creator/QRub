
"use client"

import { useState, useEffect } from 'react'
import { FileText, Upload, Plus, ChevronRight, Binary, Database, Trash2, CheckCircle2, Clock } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBlueprints } from '@/store/use-blueprints'
import { ExamBlueprint } from '@/lib/data-mock'

export default function BlueprintsAdmin() {
    const { blueprints, loadBlueprints, createBlueprint, uploadPDF, processBlueprint, loadStudyBoxes, studyBoxes, loading } = useBlueprints()
    const [isAdding, setIsAdding] = useState(false)
    const [name, setName] = useState('')
    const [institution, setInstitution] = useState('')
    const [year, setYear] = useState(new Date().getFullYear())
    const [examType, setExamType] = useState<any>('Residência Médica')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const [selectedBlueprint, setSelectedBlueprint] = useState<ExamBlueprint | null>(null)

    useEffect(() => {
        loadBlueprints()
    }, [])

    useEffect(() => {
        if (selectedBlueprint) {
            loadStudyBoxes(selectedBlueprint.id)
        }
    }, [selectedBlueprint])

    const handleCreate = async () => {
        if (!name || !institution || !selectedFile) {
            alert('Por favor, preencha todos os campos e anexe o edital PDF.')
            return
        }

        setIsProcessing(true)
        try {
            // 1. Upload do PDF para o Storage
            const pdfUrl = await uploadPDF(selectedFile)
            if (!pdfUrl) throw new Error('Falha no upload do PDF')

            // 2. Criar o Edital no Banco
            const blueprint = await createBlueprint({
                name,
                institution,
                year,
                exam_type: examType,
                raw_pdf_url: pdfUrl,
                status: 'processing'
            })

            if (!blueprint) throw new Error('Falha ao criar edital')

            // 3. Processar Inteligência QRub (Simulado)
            // Aqui o sistema lê o PDF e cria as Caixinhas automaticamente
            const success = await processBlueprint(blueprint.id)

            if (success) {
                alert('Edital processado com sucesso! As caixinhas de conteúdo foram geradas.')
                setIsAdding(false)
                setName('')
                setInstitution('')
                setSelectedFile(null)
            } else {
                alert('Ocorreu um erro no processamento do edital.')
            }
        } catch (error: any) {
            console.error(error)
            alert(error.message || 'Erro ao processar arquivo.')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="space-y-12 pb-20">
            <header className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-xl">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Editais & Provas</h1>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Base lógica orientada a dados do PDF</p>
                    </div>
                </div>

                <button
                    onClick={() => setIsAdding(true)}
                    className="royal-gradient text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="w-4 h-4" /> Novo Edital
                </button>
            </header>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-card border border-border rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
                    >
                        {isProcessing && (
                            <div className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                                <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                                <div className="text-center">
                                    <h3 className="text-lg font-black uppercase italic">Processando Inteligência QRub...</h3>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest animate-pulse">Lendo padrões do PDF, identificando áreas e criando caixinhas</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Nome do Documento</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex: Prova de Título 2024"
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Instituição</label>
                                <input
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                    placeholder="Ex: AMB / SBPT"
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Ano</label>
                                <input
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(parseInt(e.target.value))}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Tipo de Prova</label>
                                <select
                                    value={examType}
                                    onChange={(e) => setExamType(e.target.value)}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 font-bold"
                                >
                                    <option>Residência Médica</option>
                                    <option>Título de Especialista</option>
                                    <option>Prova Nacional</option>
                                    <option>Outras</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
                            <div className="flex items-center gap-6">
                                <label className={`relative group cursor-pointer border-2 border-dashed rounded-2xl px-10 py-6 transition-all ${selectedFile ? 'border-emerald-500 bg-emerald-500/5' : 'border-border hover:border-primary hover:bg-primary/5'}`}>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                    />
                                    <div className="flex items-center gap-4">
                                        {selectedFile ? (
                                            <>
                                                <div className="bg-emerald-500 p-2 rounded-lg"><CheckCircle2 className="w-6 h-6 text-white" /></div>
                                                <div>
                                                    <p className="text-xs font-black uppercase text-emerald-600">Arquivo Selecionado</p>
                                                    <p className="text-[10px] font-bold text-emerald-500/70 truncate max-w-[150px]">{selectedFile.name}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="bg-muted p-2 rounded-lg group-hover:bg-primary transition-all"><Upload className="w-6 h-6 group-hover:text-white" /></div>
                                                <p className="text-xs font-black uppercase tracking-widest">Anexar Edital PDF</p>
                                            </>
                                        )}
                                    </div>
                                </label>
                                <p className="text-[10px] text-muted-foreground max-w-[250px] leading-tight font-medium">A Inteligência QRub identificará automaticamente Área Principal, Temas e cobrará conforme diretriz predita.</p>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setIsAdding(false)} className="px-6 py-3 text-xs font-black uppercase text-muted-foreground hover:text-foreground">Cancelar</button>
                                <button
                                    onClick={handleCreate}
                                    className="royal-gradient text-white px-10 py-4 rounded-[20px] font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                                >
                                    Gerar Base de Estudo
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {!selectedBlueprint ? (
                    blueprints.map((bp) => (
                        <motion.div
                            key={bp.id}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedBlueprint(bp)}
                            className="bg-card border border-border rounded-[32px] p-6 soft-shadow relative overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute top-0 left-0 w-1.5 h-full royal-gradient" />

                            <div className="flex justify-between items-start mb-6">
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${bp.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary animate-pulse'
                                    }`}>
                                    {bp.status === 'active' ? 'Processado' : 'Processando PDF...'}
                                </div>
                                <span className="text-xs font-black text-muted-foreground">{bp.year}</span>
                            </div>

                            <h3 className="text-xl font-black uppercase tracking-tighter mb-1 leading-tight">{bp.name}</h3>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">{bp.institution}</p>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-background/50 rounded-2xl p-4 border border-border/50">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 uppercase tracking-widest">Caixinhas</p>
                                    <p className="text-xl font-black text-primary">{bp.metadata?.total_items || 0}</p>
                                </div>
                                <div className="bg-background/50 rounded-2xl p-4 border border-border/50">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 uppercase tracking-widest">Tipo</p>
                                    <p className="text-xs font-black opacity-80">{bp.exam_type.split(' ')[0]}</p>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-center gap-2 py-4 bg-muted group-hover:bg-primary/10 group-hover:text-primary rounded-2xl border border-border transition-all text-xs font-black uppercase tracking-widest">
                                Visualizar Caixinhas <ChevronRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full space-y-8">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSelectedBlueprint(null)}
                                className="bg-muted hover:bg-border p-3 rounded-xl transition-all"
                            >
                                <ChevronRight className="w-5 h-5 rotate-180" />
                            </button>
                            <div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter">{selectedBlueprint.name}</h2>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{selectedBlueprint.institution} • {selectedBlueprint.year}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {studyBoxes.map((box) => (
                                <div key={box.id} className="bg-card border border-border rounded-[28px] p-6 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-2">
                                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-[9px] font-black uppercase">{box.specialty_id}</span>
                                            <span className="bg-muted text-foreground/70 px-2 py-1 rounded-md text-[9px] font-black uppercase">{box.cognitive_level}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground">Peso: {box.weight}</span>
                                    </div>

                                    <h4 className="text-lg font-black uppercase tracking-tighter mb-2">{box.title}</h4>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-6 italic">"{box.base_text}"</p>

                                    <div className="flex items-center justify-between border-t border-border pt-4">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/70">
                                            <Binary className="w-3 h-3" /> Perfil: {box.charge_profile}
                                        </div>
                                        <button className="text-[10px] font-black uppercase tracking-widest bg-primary text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all">
                                            Gerar Questões
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {blueprints.length === 0 && !loading && !selectedBlueprint && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-[40px]">
                        <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <h3 className="text-lg font-black uppercase text-muted-foreground">Nenhum edital processado</h3>
                        <p className="text-sm text-muted-foreground/60">Anexe o primeiro PDF para estruturar o app.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
