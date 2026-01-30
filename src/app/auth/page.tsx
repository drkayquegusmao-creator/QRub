"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Sparkles, Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import Image from 'next/image'

export default function AuthPage() {
    const router = useRouter()
    const { loginWithPassword } = useAuth()
    const [mode, setMode] = useState<'login' | 'signup'>('login')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [useMockMode, setUseMockMode] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        rg: '',
        address: '',
        phoneDDI: '+55',
        phoneDDD: '',
        phoneNumber: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        setUseMockMode(!isSupabaseConfigured())
    }, [])
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            // Mock mode - use local authentication
            if (useMockMode) {
                const result = loginWithPassword(formData.email, formData.password, formData.name)

                if (result.success) {
                    setSuccess(mode === 'signup' ? 'Conta criada com sucesso!' : 'Login realizado!')
                    if (mode === 'signup') {
                        setShowConfirmModal(true)
                    } else {
                        setTimeout(() => {
                            if (result.role === 'MASTER') {
                                router.push('/admin')
                            } else {
                                router.push('/onboarding')
                            }
                        }, 1000)
                    }
                } else {
                    setError(result.message)
                }
                setLoading(false)
                return
            }

            // Supabase mode
            if (mode === 'signup') {
                // Sign up with Supabase
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            name: formData.name,
                            rg: formData.rg,
                            address: formData.address,
                            phone: `${formData.phoneDDI}${formData.phoneDDD}${formData.phoneNumber}`
                        }
                    }
                })

                if (signUpError) throw signUpError

                if (data.user) {
                    // Create user profile in database
                    const { error: profileError } = await supabase
                        .from('users')
                        .insert({
                            id: data.user.id,
                            email: formData.email,
                            name: formData.name,
                            rg: formData.rg,
                            address: formData.address,
                            phone: `${formData.phoneDDI}${formData.phoneDDD}${formData.phoneNumber}`,
                            role: 'ALUNO',
                            plan_level: 'FREE',
                            profile_completed: false
                        })

                    if (profileError) throw profileError

                    setShowConfirmModal(true)
                }
            } else {
                // Login with Supabase
                const { data, error: signInError } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password
                })

                if (signInError) throw signInError

                if (data.user) {
                    // Fetch user profile
                    const { data: profile, error: profileError } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', data.user.id)
                        .single()

                    if (profileError) throw profileError

                    // Login locally with profile data
                    loginWithPassword(formData.email, formData.password, profile.name, profile.id)

                    setSuccess('Login realizado com sucesso!')
                    setTimeout(() => {
                        if (profile.profile_completed) {
                            router.push('/dashboard')
                        } else {
                            router.push('/onboarding')
                        }
                    }, 1000)
                }
            }
        } catch (err: any) {
            setError(err.message || 'Erro ao processar autenticação')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo & Title */}
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
                    <p className="text-muted-foreground text-sm font-medium">
                        {mode === 'login'
                            ? 'Entre para continuar sua jornada de aprovação'
                            : 'Comece sua jornada rumo à aprovação'}
                    </p>
                </div>

                {/* Auth Card */}
                <div className="bg-card border border-border rounded-[40px] p-8 shadow-2xl soft-shadow">
                    {/* Mock Mode Indicator */}
                    {useMockMode && (
                        <div className="mb-6 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center gap-2 text-orange-600">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p className="text-[10px] font-bold uppercase tracking-wide">
                                Modo Local - Configure Supabase para produção
                            </p>
                        </div>
                    )}

                    {/* Mode Toggle - Hidden but state kept for simplicity, user wants specific flow */}
                    <div className="hidden gap-2 p-1.5 bg-muted/50 rounded-[20px] mb-8">
                        <button
                            onClick={() => setMode('login')}
                            className={`flex-1 py-3 px-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${mode === 'login'
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setMode('signup')}
                            className={`flex-1 py-3 px-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${mode === 'signup'
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Cadastro
                        </button>
                    </div>

                    {/* Error/Success Messages */}
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive text-sm font-bold"
                            >
                                {error}
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-600 text-sm font-bold"
                            >
                                {success}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {mode === 'signup' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                        Nome Completo
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Ex: João Silva"
                                            className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                        RG
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.rg}
                                        onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                                        placeholder="00.000.000-0"
                                        className="w-full bg-muted border border-border rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                        Telefone (DDI + DDD + Num)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            required
                                            type="text"
                                            value={formData.phoneDDI}
                                            onChange={(e) => setFormData({ ...formData, phoneDDI: e.target.value })}
                                            placeholder="+55"
                                            className="w-20 bg-muted border border-border rounded-xl px-2 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-xs text-center"
                                        />
                                        <input
                                            required
                                            type="text"
                                            value={formData.phoneDDD}
                                            onChange={(e) => setFormData({ ...formData, phoneDDD: e.target.value })}
                                            placeholder="11"
                                            className="w-16 bg-muted border border-border rounded-xl px-2 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-xs text-center"
                                        />
                                        <input
                                            required
                                            type="text"
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                            placeholder="99999-9999"
                                            className="flex-1 bg-muted border border-border rounded-xl px-3 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                        Endereço Completo
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Rua, Número, Bairro, Cidade - UF"
                                        className="w-full bg-muted border border-border rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                    />
                                </div>
                            </>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                Email
                            </label>
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
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                Senha
                            </label>
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
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full royal-gradient text-white py-4 rounded-[20px] font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {mode === 'login' ? 'Entrar' : 'Criar Conta'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {/* Create Account Link (only in login mode) with extra highlight */}
                        {mode === 'login' ? (
                            <div className="mt-8 text-center pt-4 border-t border-border/10">
                                <p className="text-xs font-bold text-muted-foreground mb-4">Ainda não faz parte da elite?</p>
                                <button
                                    type="button"
                                    onClick={() => setMode('signup')}
                                    className="group relative inline-flex items-center gap-2 px-8 py-3 bg-primary/10 border border-primary/20 rounded-2xl text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                    Criar cadastro no QRub
                                </button>
                            </div>
                        ) : (
                            <div className="mt-8 text-center pt-4 border-t border-border/10">
                                <button
                                    type="button"
                                    onClick={() => setMode('login')}
                                    className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Já possui uma conta? <span className="text-primary underline">Fazer Login</span>
                                </button>
                            </div>
                        )}
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">
                            <Sparkles className="w-3 h-3 inline mr-1" />
                            Sua aprovação começa aqui
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <button
                    onClick={() => router.push('/')}
                    className="mt-6 w-full text-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                    ← Voltar para home
                </button>
            </motion.div>

            {/* Email Confirmation Modal */}
            <AnimatePresence>
                {showConfirmModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            onClick={() => setShowConfirmModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-sm bg-card border border-border rounded-[40px] p-8 shadow-2xl relative z-10 text-center"
                        >
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-10 h-10 text-primary" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Verifique seu Email</h2>
                            <p className="text-muted-foreground text-sm font-medium mb-8 leading-relaxed">
                                Enviamos um link de confirmação para <span className="text-foreground font-bold">{formData.email}</span>.
                                Por favor, verifique sua caixa de entrada e spam para ativar sua conta.
                            </p>
                            <button
                                onClick={() => {
                                    setShowConfirmModal(false)
                                    setMode('login')
                                }}
                                className="w-full royal-gradient text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/30"
                            >
                                Entendido
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
