"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Sparkles, Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import Image from 'next/image'

import { isMasterEmail } from '@/lib/auth-constants'

export default function AuthPage() {
    const router = useRouter()
    const { setUser, isAuthenticated } = useAuth()
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isHydrated, setIsHydrated] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rg: '',
        address: '',
        phone: ''
    })

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (isHydrated && isAuthenticated) {
            router.push('/dashboard')
        }
    }, [isHydrated, isAuthenticated, router])

    if (!isHydrated) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            if (mode === 'signup') {
                // 1. Sign Up in Supabase Auth
                const { data: authData, error: signUpError } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            displayName: formData.name
                        }
                    }
                })

                if (signUpError) throw signUpError
                if (!authData.user) throw new Error('Erro ao criar usuário')

                // 2. Create Profile in 'users' table
                const isMaster = isMasterEmail(formData.email)

                const { error: profileError } = await supabase.from('users').upsert({
                    id: authData.user.id,
                    email: formData.email.toLowerCase().trim(),
                    name: formData.name,
                    role: isMaster ? 'MASTER' : 'ALUNO',
                    plan_level: isMaster ? 'INSANO' : 'FREE',
                    profile_completed: isMaster, // Master doesn't need onboarding
                    rg: formData.rg,
                    address: formData.address,
                    phone: formData.phone,
                    streak: 0
                })

                if (profileError) throw profileError

                setSuccess('Cadastro realizado! Verifique seu e-mail para confirmar.')
            } else {
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
                        name: formData.name || formData.email.split('@')[0],
                        role: isMaster ? 'MASTER' : 'ALUNO',
                        plan_level: isMaster ? 'INSANO' : 'FREE',
                        profile_completed: isMaster
                    }).select().single()

                    if (createError) throw createError
                    profile = newProfile
                }

                // 4. Force Master role if email matches (security/convenience)
                if (isMaster && profile.role !== 'MASTER') {
                    await supabase.from('users').update({
                        role: 'MASTER',
                        plan_level: 'INSANO',
                        profile_completed: true
                    }).eq('id', authData.user.id)
                    profile = { ...profile, role: 'MASTER', plan_level: 'INSANO', profile_completed: true }
                }

                // 5. Update Local State
                setUser({
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    role: profile.role,
                    plan_level: profile.plan_level,
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
                    if (profile.role === 'MASTER' || profile.profile_completed) {
                        window.location.assign('/dashboard')
                    } else {
                        window.location.assign('/onboarding')
                    }
                }, 500)
            }
        } catch (err: any) {
            console.error('Auth Error:', err)
            setError(err.message || 'Erro inesperado na autenticação')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/30">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-4xl font-black italic uppercase tracking-tighter">QRub</span>
                    </div>
                    <h1 className="text-2xl font-black uppercase tracking-tight mb-2">
                        {mode === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
                    </h1>
                </div>

                <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl soft-shadow">
                    <div className="flex gap-2 p-1.5 bg-muted/50 rounded-[24px] mb-8">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-3 px-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${mode === 'login' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 py-3 px-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${mode === 'signup' ? 'bg-primary text-white shadow-lg' : 'text-muted-foreground'}`}
                        >
                            Cadastro
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-sm font-bold flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </motion.div>
                        )}
                        {success && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-600 text-sm font-bold">
                                {success}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {mode === 'signup' && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Seu nome"
                                        className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="seu@email.com"
                                    className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                                <input
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full bg-muted border border-border rounded-xl pl-12 pr-12 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full royal-gradient text-white py-5 rounded-[24px] font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {mode === 'login' ? 'Entrar' : 'Começar Agora'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
