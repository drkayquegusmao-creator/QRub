"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, BookOpen, Calendar, Save, Sparkles, Target } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function OnboardingPage() {
    const { user, completeProfile } = useAuth()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: '',
        institution: '',
        graduation_year: '',
        specialty_of_interest: '',
    })

    const isFormValid = formData.name && formData.phone && formData.institution && formData.graduation_year && formData.specialty_of_interest

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isFormValid) return
        completeProfile(formData)
        router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-card border border-border rounded-[40px] soft-shadow overflow-hidden relative z-10"
            >
                <div className="royal-gradient p-12 text-white relative">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-white p-2 rounded-xl">
                            <Image src="/logo-icon.jpg" alt="QRub" width={32} height={32} className="rounded-lg" />
                        </div>
                        <span className="text-2xl font-black italic uppercase tracking-tighter">QRub</span>
                    </div>
                    <Sparkles className="absolute top-8 right-8 w-10 h-10 opacity-20" />
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Quase lá!</h2>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-80 leading-relaxed">
                        Complete seu perfil para liberar o acesso ao banco de questões e suas métricas personalizadas.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <InputField
                                label="Nome Completo"
                                icon={<User className="w-4 h-4" />}
                                placeholder="Seu nome..."
                                value={formData.name}
                                onChange={(val) => setFormData({ ...formData, name: val })}
                            />
                        </div>
                        <InputField
                            label="WhatsApp"
                            icon={<Phone className="w-4 h-4" />}
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={(val) => setFormData({ ...formData, phone: val })}
                        />
                        <InputField
                            label="Ano de Formação"
                            icon={<Calendar className="w-4 h-4" />}
                            placeholder="Ex: 2026"
                            value={formData.graduation_year}
                            onChange={(val) => setFormData({ ...formData, graduation_year: val })}
                        />
                        <div className="md:col-span-2">
                            <InputField
                                label="Instituição de Ensino"
                                icon={<BookOpen className="w-4 h-4" />}
                                placeholder="Nome da sua faculdade..."
                                value={formData.institution}
                                onChange={(val) => setFormData({ ...formData, institution: val })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <InputField
                                label="Especialidade de Interesse"
                                icon={<Target className="w-4 h-4" />}
                                placeholder="Ex: Cirurgia Geral, Pediatria..."
                                value={formData.specialty_of_interest}
                                onChange={(val) => setFormData({ ...formData, specialty_of_interest: val })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className="w-full royal-gradient text-white py-6 rounded-[24px] font-black text-xl uppercase tracking-widest soft-shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                    >
                        <Save className="w-6 h-6" />
                        CONCLUIR CADASTRO
                    </button>

                    <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">
                        Sua jornada para a aprovação começa agora.
                    </p>
                </form>
            </motion.div>
        </div>
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
