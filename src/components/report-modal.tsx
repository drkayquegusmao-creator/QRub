"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, Send, CheckCircle2 } from 'lucide-react'
import { useModeration } from '@/store/use-moderation'
import { useAuth } from '@/store/use-auth'

interface ReportModalProps {
    isOpen: boolean
    onClose: () => void
    questionId: string
}

export function ReportModal({ isOpen, onClose, questionId }: ReportModalProps) {
    const { user } = useAuth()
    const { createReport } = useModeration()
    const [type, setType] = useState<'ENUNCIADO' | 'GABARITO' | 'EXPLICAÇÃO' | 'OUTRO'>('GABARITO')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        const result = await createReport({
            user_id: user.id,
            question_id: questionId,
            type,
            description
        })

        if (result.success) {
            setSuccess(true)
            setTimeout(() => {
                onClose()
                setSuccess(false)
                setDescription('')
            }, 2000)
        }
        setLoading(false)
    }

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
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Reporte Enviado!</h3>
                                <p className="text-muted-foreground font-medium">Obrigado por nos ajudar a manter a qualidade do QRub. Nossa equipe reguladora irá analisar esta questão.</p>
                            </div>
                        ) : (
                            <>
                                <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-muted rounded-full transition-all">
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="bg-rose-500/10 p-3 rounded-2xl text-rose-500">
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black italic uppercase tracking-tighter">Reportar Problema</h2>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">Ajude o Agente Regulador QRub</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-2">
                                        {(['ENUNCIADO', 'GABARITO', 'EXPLICAÇÃO', 'OUTRO'] as const).map(t => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setType(t)}
                                                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${type === t
                                                        ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20'
                                                        : 'bg-muted border-border text-muted-foreground hover:border-rose-500/50'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Descrição do Problema</label>
                                        <textarea
                                            required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Descreva o que está errado com a questão..."
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
                                                ENVIAR AO AGENTE REGULADOR
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
