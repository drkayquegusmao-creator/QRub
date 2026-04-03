"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, FileText, Activity, AlertCircle } from 'lucide-react'
import { Question } from '@/lib/data-mock'
import { QuestionText } from '@/components/question-typography'

interface QuestionPreviewModalProps {
    isOpen: boolean
    onClose: () => void
    question: Question | null
}

export function QuestionPreviewModal({ isOpen, onClose, question }: QuestionPreviewModalProps) {
    if (!question) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="bg-card border border-border w-full max-w-4xl h-[90vh] rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-border flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                                        ID: {question.id}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${question.status_validacao === 'PENDENTE' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : question.status_validacao === 'APROVADA' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                                        {question.status_validacao}
                                    </span>
                                </div>
                                <h2 className="text-xl font-black italic uppercase tracking-tighter/50">{question.area_id} › {question.subarea_id}</h2>
                            </div>
                            <button onClick={onClose} className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-all">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Enunciado */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <FileText className="w-3.5 h-3.5" /> Enunciado
                                </label>
                                <div className="p-6 bg-muted/30 border border-border rounded-2xl">
                                    <QuestionText className="font-medium text-lg text-[#1A1033] dark:text-white leading-relaxed">
                                        {question.enunciado}
                                    </QuestionText>
                                    {(question as any).comando && (
                                        <QuestionText className="mt-4 font-bold text-[#1A1033] dark:text-white">
                                            {(question as any).comando}
                                        </QuestionText>
                                    )}
                                </div>
                            </div>

                            {/* Alternativas */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <Activity className="w-3.5 h-3.5" /> Alternativas
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {question.options.map((opt) => {
                                        const isCorrect = opt.id === question.correct_option_id
                                        return (
                                            <div key={opt.id} className={`p-4 rounded-xl border-2 flex items-start gap-3 transition-all ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/50' : 'bg-card border-border'}`}>
                                                <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-black uppercase ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                                                    {opt.id}
                                                </div>
                                                <QuestionText className={`text-sm font-medium ${isCorrect ? 'text-emerald-800' : 'text-foreground'}`}>{opt.text}</QuestionText>
                                                {isCorrect && <Check className="w-4 h-4 text-emerald-500 ml-auto" />}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Explicação */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <AlertCircle className="w-3.5 h-3.5" /> Comentário do Especialista
                                </label>
                                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                                    <QuestionText className="font-medium text-primary/80 leading-relaxed">
                                        {question.explanation}
                                    </QuestionText>
                                </div>
                            </div>

                            {/* Metadados */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Dificuldade</label>
                                    <p className="text-xs font-bold">{question.difficulty}</p>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Fonte</label>
                                    <p className="text-xs font-bold uppercase">{question.fonte}</p>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Tema</label>
                                    <p className="text-xs font-bold">{question.subject_id || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Criado em</label>
                                    <p className="text-xs font-bold">{new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions if needed in future */}
                        {/* <div className="p-6 border-t border-border bg-muted/20"></div> */}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
