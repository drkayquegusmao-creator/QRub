"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, Send, CheckCircle2 } from 'lucide-react'
import { useModeration } from '@/store/use-moderation'
import { useAuth } from '@/store/use-auth'

interface ReportModalProps {
    isOpen: boolean
    onClose: () => void
    questionId?: string // Tornar opcional para sugestões gerais
}

type ReportType = 'ENUNCIADO' | 'GABARITO' | 'EXPLICAÇÃO' | 'SUGESTÃO' | 'DÚVIDA' | 'OUTRO'

export function ReportModal({ isOpen, onClose, questionId }: ReportModalProps) {
    const { user } = useAuth()
    const { createReport } = useModeration()
    const [type, setType] = useState<ReportType>(questionId ? 'GABARITO' : 'SUGESTÃO')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        const result = await createReport({
            user_id: user.id,
            question_id: questionId || 'FEEDBACK_GERAL',
            type,
            description
        })

        if (result.success) {
            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setDescription('')
            }, 2500)
        }
        setLoading(false)
    }

    const types: { id: ReportType, label: string }[] = questionId
        ? [
            { id: 'ENUNCIADO', label: 'Erro Enunciado' },
            { id: 'GABARITO', label: 'Erro Gabarito' },
            { id: 'EXPLICAÇÃO', label: 'Explicação' },
            { id: 'DÚVIDA', label: 'Tive Dúvida' },
            { id: 'OUTRO', label: 'Outro' }
        ]
        : [
            { id: 'SUGESTÃO', label: 'Sugestão' },
            { id: 'DÚVIDA', label: 'Dúvida' },
            { id: 'OUTRO', label: 'Melhoria' }
        ]

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-card border border-border w-full max-w-lg rounded-[40px] shadow-2xl p-8 md:p-10 relative overflow-hidden"
                    >
                        {success ? (
                            <div className="text-center space-y-4 py-8">
                                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Enviado ao Master!</h3>
                                <p className="text-muted-foreground font-medium">Obrigado por nos ajudar a manter a qualidade do QRub. O Agente Master irá analisar esta solicitação.</p>
                            </div>
                        ) : (
                            <>
                                <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-muted rounded-full transition-all">
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`p-3 rounded-2xl ${questionId ? 'bg-rose-500/10 text-rose-500' : 'bg-primary/10 text-primary'}`}>
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                                            {questionId ? 'Reportar Problema' : 'Ideias e Sugestões'}
                                        </h2>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">Dr. QRub Master Control</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-2">
                                        {types.map(t => (
                                            <button
                                                key={t.id}
                                                type="button"
                                                onClick={() => setType(t.id)}
                                                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${type === t.id
                                                    ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20'
                                                    : 'bg-muted border-border text-muted-foreground hover:border-rose-500/50'
                                                    }`}
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                            {questionId ? 'O que há de errado?' : 'Descreva sua sugestão abaixo:'}
                                        </label>
                                        <textarea
                                            required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={questionId ? "Descreva o erro..." : "No que podemos melhorar? Mande sua ideia..."}
                                            className="w-full h-32 bg-muted border border-border rounded-2xl p-4 font-medium text-sm focus:ring-2 focus:ring-rose-500/20 outline-none resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-16 royal-gradient text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                ENVIAR AO MASTER
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
