"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, BookOpen, Calendar, Save, Sparkles } from 'lucide-react'
import { useAuth } from '@/store/use-auth'

interface ProfileModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
    const { user, completeProfile } = useAuth()
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: '',
        institution: '',
        graduation_year: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        completeProfile(formData)
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-background/95 backdrop-blur-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-lg bg-card border border-border rounded-[40px] soft-shadow overflow-hidden"
                    >
                        <div className="royal-gradient p-10 text-white relative">
                            <Sparkles className="absolute top-6 right-6 w-8 h-8 opacity-20" />
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Complete seu Perfil</h2>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                                Necessário para liberar as 20 questões diárias do Plano Free.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-6">
                            <div className="space-y-4">
                                <InputField
                                    label="Nome Completo"
                                    icon={<User className="w-4 h-4" />}
                                    placeholder="Seu nome..."
                                    value={formData.name}
                                    onChange={(val) => setFormData({ ...formData, name: val })}
                                />
                                <InputField
                                    label="WhatsApp"
                                    icon={<Phone className="w-4 h-4" />}
                                    placeholder="(11) 99999-9999"
                                    value={formData.phone}
                                    onChange={(val) => setFormData({ ...formData, phone: val })}
                                />
                                <InputField
                                    label="Instituição de Ensino"
                                    icon={<BookOpen className="w-4 h-4" />}
                                    placeholder="Nome da sua faculdade..."
                                    value={formData.institution}
                                    onChange={(val) => setFormData({ ...formData, institution: val })}
                                />
                                <InputField
                                    label="Ano de Formação"
                                    icon={<Calendar className="w-4 h-4" />}
                                    placeholder="Ex: 2026"
                                    value={formData.graduation_year}
                                    onChange={(val) => setFormData({ ...formData, graduation_year: val })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full royal-gradient text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest soft-shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <Save className="w-5 h-5" />
                                SALVAR E LIBERAR ACESSO
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function InputField({ label, icon, placeholder, value, onChange }: { label: string, icon: any, placeholder: string, value: string, onChange: (val: string) => void }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{label}</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">{icon}</div>
                <input
                    required
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                />
            </div>
        </div>
    )
}
