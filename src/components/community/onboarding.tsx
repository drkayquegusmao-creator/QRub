"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AtSign, Check, AlertCircle, Loader2, Sparkles, Shield, ArrowRight, User, BookOpen, GraduationCap } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useCommunity } from '@/store/community/use-community'
import { cn } from '@/lib/utils'

interface CommunityOnboardingProps {
    onComplete: () => void
}

const USERNAME_REGEX = /^[a-z0-9_]{3,20}$/

export function CommunityOnboarding({ onComplete }: CommunityOnboardingProps) {
    const { user } = useAuth()
    const { createProfile, checkUsername, profileLoading } = useCommunity()
    
    const [step, setStep] = useState(0)
    const [username, setUsername] = useState('')
    const [displayName, setDisplayName] = useState(user?.name || '')
    const [studyFocus, setStudyFocus] = useState('')
    const [studyLevel, setStudyLevel] = useState('')
    const [statusMessage, setStatusMessage] = useState('')
    
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
    const [usernameChecking, setUsernameChecking] = useState(false)
    const [usernameError, setUsernameError] = useState('')
    const [saving, setSaving] = useState(false)

    // Debounced username check
    useEffect(() => {
        const normalized = username.toLowerCase().trim()
        if (!normalized || normalized.length < 3) {
            setUsernameAvailable(null)
            setUsernameError(normalized.length > 0 && normalized.length < 3 ? 'Mínimo 3 caracteres' : '')
            return
        }
        if (!USERNAME_REGEX.test(normalized)) {
            setUsernameAvailable(false)
            setUsernameError('Apenas letras minúsculas, números e underscore')
            return
        }
        setUsernameChecking(true)
        const timer = setTimeout(async () => {
            try {
                const available = await checkUsername(normalized)
                setUsernameAvailable(available)
                setUsernameError(available ? '' : 'Username já está em uso')
            } catch {
                setUsernameError('Erro ao verificar')
            } finally {
                setUsernameChecking(false)
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [username])

    const handleSubmit = async () => {
        if (!user?.id || !username || !usernameAvailable || !displayName.trim()) return
        setSaving(true)
        try {
            await createProfile(
                user.id,
                username.toLowerCase().trim(),
                displayName.trim(),
                undefined,
                studyFocus || undefined,
                studyLevel || undefined,
                statusMessage || undefined
            )
            onComplete()
        } catch (err: any) {
            setUsernameError(err?.message || 'Erro ao criar perfil')
        } finally {
            setSaving(false)
        }
    }

    const focusOptions = [
        'Clínica Médica', 'Cirurgia Geral', 'Pediatria', 'Ginecologia',
        'Cardiologia', 'Neurologia', 'Ortopedia', 'Dermatologia',
        'Psiquiatria', 'Medicina de Família', 'Outro'
    ]

    const levelOptions = [
        'Graduação', 'Internato', 'Preparação R1', 'Residente',
        'Pós-Residência', 'Concurseiro'
    ]

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B0F1A] p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                {/* Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                        <Sparkles className="w-3 h-3" />
                        Comunidade QRub
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[8px]">BETA</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white leading-none">
                        CRIE SUA<br/>
                        <span className="text-emerald-500">IDENTIDADE</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-md mx-auto">
                        Seu @ será único e <span className="text-rose-400 font-bold">não poderá ser alterado</span> depois. Escolha com cuidado.
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-8">
                    
                    {/* Username */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <AtSign className="w-3 h-3" /> Username *
                        </label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500 font-black text-lg">@</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20))}
                                placeholder="seu_username"
                                className={cn(
                                    "w-full pl-10 pr-14 py-5 bg-slate-50 dark:bg-white/5 border-2 rounded-2xl text-lg font-bold focus:outline-none transition-all",
                                    usernameAvailable === true ? "border-emerald-500 focus:ring-4 ring-emerald-500/10" :
                                    usernameAvailable === false ? "border-rose-500 focus:ring-4 ring-rose-500/10" :
                                    "border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:ring-4 ring-emerald-500/10"
                                )}
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                {usernameChecking && <Loader2 className="w-5 h-5 animate-spin text-slate-400" />}
                                {!usernameChecking && usernameAvailable === true && <Check className="w-5 h-5 text-emerald-500" />}
                                {!usernameChecking && usernameAvailable === false && <AlertCircle className="w-5 h-5 text-rose-500" />}
                            </div>
                        </div>
                        {usernameError && (
                            <p className="text-rose-500 text-xs font-bold">{usernameError}</p>
                        )}
                        <p className="text-[10px] text-slate-400 font-bold">3-20 caracteres. Letras, números e underscore.</p>
                    </div>

                    {/* Display Name */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <User className="w-3 h-3" /> Nome Público *
                        </label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value.slice(0, 50))}
                            placeholder="Dr. João Silva"
                            className="w-full px-6 py-5 bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-2xl text-lg font-bold focus:outline-none focus:border-emerald-500 focus:ring-4 ring-emerald-500/10 transition-all"
                        />
                    </div>

                    {/* Study Focus */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <BookOpen className="w-3 h-3" /> Foco de Estudo
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {focusOptions.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setStudyFocus(studyFocus === f ? '' : f)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border-2 transition-all",
                                        studyFocus === f
                                            ? "bg-emerald-500 text-white border-emerald-500"
                                            : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 hover:border-emerald-500/50"
                                    )}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Study Level */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <GraduationCap className="w-3 h-3" /> Nível / Etapa
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {levelOptions.map(l => (
                                <button
                                    key={l}
                                    onClick={() => setStudyLevel(studyLevel === l ? '' : l)}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border-2 transition-all",
                                        studyLevel === l
                                            ? "bg-emerald-500 text-white border-emerald-500"
                                            : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 hover:border-emerald-500/50"
                                    )}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <Shield className="w-3 h-3" /> Status (opcional)
                        </label>
                        <input
                            type="text"
                            value={statusMessage}
                            onChange={(e) => setStatusMessage(e.target.value.slice(0, 100))}
                            placeholder="Estudando para residência 2026..."
                            className="w-full px-6 py-4 bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-2xl text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 ring-emerald-500/10 transition-all"
                        />
                    </div>

                    {/* Imutability Warning */}
                    <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl">
                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                            Atenção: Seu <span className="font-black">@username</span> é permanente e não poderá ser alterado após a criação.
                        </p>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={!usernameAvailable || !displayName.trim() || saving || profileLoading}
                        className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:scale-100"
                    >
                        {saving ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Criando perfil...</>
                        ) : (
                            <>Entrar na Comunidade <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
