"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, LogIn, AlertCircle, Sparkles } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { isMasterEmail } from '@/lib/auth-constants'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { setUser } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            // 1. Supabase Sign In
            const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password.trim()
            })

            if (signInError) throw signInError
            if (!authData.user) throw new Error('Não foi possível realizar o login')

            // 2. Fetch Profile
            const { data: profiles, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', authData.user.id)

            if (profileError) throw profileError

            let profile = profiles && profiles.length > 0 ? profiles[0] : null

            // 3. Handle Missing Profile or Master Check
            const isMaster = isMasterEmail(email)

            if (!profile) {
                // Create minimal profile if missing
                const { data: newProfile, error: createError } = await supabase.from('users').insert({
                    id: authData.user.id,
                    email: email.toLowerCase().trim(),
                    name: email.split('@')[0],
                    role: isMaster ? 'MASTER' : 'ALUNO',
                    plan_level: 'INSANO',
                    profile_completed: isMaster
                }).select().single()

                if (createError) throw createError
                profile = newProfile
            } else if (isMaster && profile.role !== 'MASTER') {
                // Update to Master if email matches
                await supabase.from('users').update({
                    role: 'MASTER',
                    plan_level: 'INSANO',
                    profile_completed: true
                }).eq('id', authData.user.id)
                profile = { ...profile, role: 'MASTER', plan_level: 'INSANO', profile_completed: true }
            }

            // 4. Update Global State
            setUser(profile)

            onClose()

            // 5. Navigate
            if (profile.role === 'MASTER' || profile.profile_completed) {
                window.location.assign('/dashboard')
            } else {
                window.location.assign('/onboarding')
            }

        } catch (err: any) {
            console.error('Login error:', err)
            setError(err.message || 'Erro ao realizar login')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md overflow-hidden bg-card rounded-[40px] soft-shadow border border-border"
                    >
                        {/* Visual Banner */}
                        <div className="royal-gradient h-40 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                            <Sparkles className="absolute top-6 right-6 w-8 h-8 text-white/20" />

                            <div className="bg-white p-3 rounded-2xl shadow-2xl relative z-10">
                                <div className="relative w-12 h-12">
                                    <Image src="/logo-icon.jpg" alt="QRub" fill className="object-cover rounded-lg" />
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-10 pt-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Entrar</h2>
                                <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">Acesse sua conta QRub</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="seu@email.com"
                                            className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Senha</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl p-3">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <p className="text-xs font-bold">{error}</p>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full royal-gradient text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest soft-shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
                                    <LogIn className="w-5 h-5" />
                                </button>

                                <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60 leading-relaxed">
                                    Ainda não tem conta? Clique fora e use a página de cadastro.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div >
            )
            }
        </AnimatePresence >
    )
}
