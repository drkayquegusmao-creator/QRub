"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, ArrowRight, Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { useTheme } from 'next-themes'
import { isMasterEmail } from '@/lib/auth-constants'

export default function AuthPage() {
    const { setTheme } = useTheme()
    const router = useRouter()
    const { setUser, isAuthenticated, user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isHydrated, setIsHydrated] = useState(false)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        setIsHydrated(true)
        setTheme('light')
    }, [setTheme])

    useEffect(() => {
        if (isHydrated && isAuthenticated) {
            if (user && isMasterEmail(user.email)) {
                router.push('/select-environment')
            } else {
                router.push('/dashboard')
            }
        }
    }, [isHydrated, isAuthenticated, user, router])

    if (!isHydrated) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            // 1. Sign In in Supabase Auth
            const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password
            })

            if (signInError) throw signInError
            if (!authData.user) throw new Error('Erro no login')

            // 2. Get Profile from 'users' table
            const { data: profiles, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', authData.user.id)

            if (profileError) throw profileError

            let profile = profiles && profiles.length > 0 ? profiles[0] : null
            const isMaster = isMasterEmail(formData.email)

            // 3. If no profile exists (legacy users), create it
            if (!profile) {
                const { data: newProfile, error: createError } = await supabase.from('users').insert({
                    id: authData.user.id,
                    email: formData.email.toLowerCase().trim(),
                    name: formData.email.split('@')[0],
                    role: isMaster ? 'MASTER' : 'ALUNO',
                    plan_level: 'insano',
                    profile_completed: isMaster
                }).select()

                if (createError) throw createError
                profile = newProfile && newProfile.length > 0 ? newProfile[0] : null
            }

            // 4. Force Master role if email matches (security/convenience)
            if (isMaster && profile.role !== 'MASTER') {
                await supabase.from('users').update({
                    role: 'MASTER',
                    plan_level: 'insano',
                    profile_completed: true
                }).eq('id', authData.user.id)
                profile = { ...profile, role: 'MASTER', plan_level: 'insano', profile_completed: true }
            }

            // 5. Update Local State
            setUser({
                id: profile.id,
                name: profile.name,
                email: profile.email,
                role: profile.role,
                plan_level: profile.plan_level,
                subscriptions: profile.subscriptions || [],
                usage: profile.usage || {
                    qrub_concurso: { dailyQuestionsUsed: 0, lastResetDate: new Date().toISOString().split('T')[0] },
                    qrub_saude: { dailyQuestionsUsed: 0, lastResetDate: new Date().toISOString().split('T')[0] }
                },
                profile_completed: profile.profile_completed,
                rg: profile.rg,
                address: profile.address,
                phone: profile.phone,
                institution: profile.institution,
                graduation_year: profile.graduation_year,
                specialty_of_interest: profile.specialty_of_interest,
                streak: profile.streak
            })

            setSuccess('Login realizado com sucesso!')

            // Redirect based on profile completion
            setTimeout(() => {
                if (isMaster) {
                    window.location.assign('/select-environment')
                } else if (profile.role === 'MASTER' || profile.profile_completed) {
                    window.location.assign('/dashboard')
                } else {
                    window.location.assign('/onboarding')
                }
            }, 500)

        } catch (err: any) {
            console.error('Auth Error:', err)
            const msg = err.message || 'Erro inesperado na autenticação'
            if (msg.includes('Invalid login credentials')) {
                setError('E-mail ou senha incorretos.')
            } else {
                setError(msg)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6 relative overflow-hidden font-outfit">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden border border-white">
                    {/* Premium Header */}
                    <div className="royal-gradient p-12 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-30">
                            <Shield className="w-24 h-24 text-white/20 -mr-8 -mt-8 rotate-12" />
                        </div>
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-5 rounded-[24px] shadow-2xl mb-6 relative z-10"
                        >
                            <div className="w-12 h-12 flex items-center justify-center">
                                <span className="text-4xl font-black royal-gradient-text">Q</span>
                            </div>
                        </motion.div>
                        
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-white/10 blur-3xl pointer-events-none" />
                    </div>

                    {/* Form Body */}
                    <div className="px-10 py-12">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-black uppercase tracking-tight text-[#0c1322] mb-2 leading-none">
                                Entrar
                            </h1>
                            <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.2em]">
                                Acesse sua conta QRub
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-8 p-4 bg-destructive/5 border border-destructive/10 rounded-2xl text-destructive text-sm font-bold flex items-center gap-3"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </motion.div>
                            )}
                            {success && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-emerald-600 text-sm font-bold flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    {success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/60 ml-1">Email</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-muted/30 text-primary transition-all group-focus-within:bg-primary group-focus-within:text-white">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="seu@email.com"
                                        className="w-full bg-[#F8F9FD] border border-transparent rounded-[20px] pl-16 pr-4 py-5 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-sm text-[#0c1322] placeholder:text-muted-foreground/30"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/60 ml-1">Senha</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-muted/30 text-primary transition-all group-focus-within:bg-primary group-focus-within:text-white">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full bg-[#F8F9FD] border border-transparent rounded-[20px] pl-16 pr-14 py-5 focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-sm text-[#0c1322] placeholder:text-muted-foreground/30"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-muted-foreground/40 hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01, translateY: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full royal-gradient text-white py-6 rounded-[24px] font-black text-sm uppercase tracking-[0.15em] shadow-[0_10px_30px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_35px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-3 mt-4"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Entrar
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <div className="mt-12 text-center">
                            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">
                                Ainda não tem conta? Crie uma
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Badges or Info */}
                <div className="mt-8 flex justify-center items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    <Shield className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Plataforma Segura</span>
                </div>
            </motion.div>
        </div>
    )
}
