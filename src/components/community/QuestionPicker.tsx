"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, BookOpen, Layers, Check, Database } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Question {
    id: string
    enunciado: string
    specialty_id: string
    subject_id: string
}

interface QuestionPickerProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (question: Question) => void
}

export function QuestionPicker({ isOpen, onClose, onSelect }: QuestionPickerProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            loadRecentQuestions()
        }
    }, [isOpen])

    async function loadRecentQuestions() {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('questions')
                .select('id, enunciado, specialty_id, subject_id')
                .order('created_at', { ascending: false })
                .limit(20)

            if (!error && data) {
                setQuestions(data)
            }
        } finally {
            setLoading(false)
        }
    }

    async function handleSearch() {
        if (!searchTerm.trim()) {
            loadRecentQuestions()
            return
        }

        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('questions')
                .select('id, enunciado, specialty_id, subject_id')
                .ilike('enunciado', `%${searchTerm}%`)
                .limit(20)

            if (!error && data) {
                setQuestions(data)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-card rounded-[32px] soft-shadow border border-border overflow-hidden flex flex-col max-h-[80vh]"
                    >
                        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-xl">
                                    <Database className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase italic tracking-tighter text-lg">Compartilhar Questão</h3>
                                    <p className="text-xs text-muted-foreground">Selecione uma questão para enviar ao chat.</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 flex-1 overflow-hidden flex flex-col">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Buscar por enunciado ou termos-chave..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Acessando banco de questões...</p>
                                    </div>
                                ) : questions.length > 0 ? (
                                    questions.map((q) => (
                                        <button
                                            key={q.id}
                                            onClick={() => onSelect(q)}
                                            className="w-full text-left p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="bg-muted p-2 rounded-lg group-hover:bg-primary/10 transition-colors">
                                                    <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <p className="text-sm font-bold line-clamp-2 leading-relaxed">{q.enunciado}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                                            {q.specialty_id}
                                                        </span>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                                                            {q.subject_id}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="bg-primary text-white p-2 rounded-full">
                                                        <Check className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed border-border rounded-[32px]">
                                        <Layers className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-20" />
                                        <p className="text-sm font-medium text-muted-foreground">Nenhuma questão encontrada.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
