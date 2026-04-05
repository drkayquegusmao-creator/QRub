"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, LogIn, AlertCircle, UserPlus, User, ArrowRight } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { isMasterEmail } from '@/lib/auth-constants'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    preventRedirect?: boolean
}

export function AuthModal({ isOpen, onClose, preventRedirect }: AuthModalProps) {
    const { setUser } = useAuth()
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            let authData;
            
            if (isSignUp) {
                if (password !== confirmPassword) throw new Error('As senhas não coincidem')
                if (!username.startsWith('@') || username.length < 4) throw new Error('Crie um nome de usuário válido começando com @ (ex: @joao)')

                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: email.trim(),
                    password: password.trim()
                })
                if (signUpError) {
                    if (signUpError.message.includes('already registered')) throw new Error('E-mail já cadastrado. Tente Entrar.')
                    throw signUpError
                }
                if (!signUpData.user) throw new Error('Não foi possível criar a conta')
                
                const { data: signInData } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password.trim()
                })
                
                authData = signInData || signUpData
            } else {
                const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password.trim()
                })
                if (signInError) throw new Error('E-mail ou senha incorretos')
                authData = signInData
            }

            if (!authData?.user) throw new Error('Sessão não estabelecida')

            const { data: profiles, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', authData.user.id)

            if (profileError) throw profileError

            let profile = profiles && profiles.length > 0 ? profiles[0] : null
            const isMaster = isMasterEmail(email)

            if (!profile) {
                const { data: newProfile, error: createError } = await supabase.from('users').insert({
                    id: authData.user.id,
                    email: email.toLowerCase().trim(),
                    name: isSignUp ? username : email.split('@')[0],
                    role: isMaster ? 'MASTER' : 'ALUNO',
                    plan_level: 'FREE',
                    profile_completed: isMaster
                }).select().single()

                if (createError) throw createError
                profile = newProfile
            } else if (isMaster && profile.role !== 'MASTER') {
                await supabase.from('users').update({
                    role: 'MASTER',
                    plan_level: 'INSANO',
                    profile_completed: true
                }).eq('id', authData.user.id)
                profile = { ...profile, role: 'MASTER', plan_level: 'INSANO', profile_completed: true }
            }

            setUser(profile)
            onClose()

            if (preventRedirect) return

            if (profile.product_type === 'saude') {
                window.location.assign('/saude')
            } else if (profile.product_type === 'concurso') {
                window.location.assign('/concursos')
            } else if (profile.profile_completed || profile.role === 'MASTER') {
                const lastEnv = window.localStorage.getItem('qrub_last_environment')
                if (lastEnv === 'SAUDE') window.location.assign('/saude')
                else if (lastEnv === 'CONCURSOS') window.location.assign('/concursos')
                else window.location.assign('/dashboard')
            } else {
                window.location.assign('/onboarding')
            }

        } catch (err: any) {
            setError(err.message || 'Erro ao realizar login')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-[440px] overflow-hidden bg-white rounded-[48px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-white"
                    >
                        {/* Header: Purple Gradient with Logo */}
                        <div className="bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] h-48 flex items-center justify-center relative overflow-hidden">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-50" />
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={onClose}
                                    className="p-2.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all backdrop-blur-md"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            
                            {/* The "Q" Logo in white box */}
                            <div className="bg-white p-4 rounded-[24px] shadow-2xl relative z-10">
                                <div className="relative w-14 h-14 overflow-hidden rounded-xl">
                                    <Image 
                                        src="/logo-icon.jpg" 
                                        alt="QRub" 
                                        fill 
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-8 pb-12 pt-10">
                            <div className="text-center mb-10">
                                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-[#1e293b] mb-1">
                                    {isSignUp ? 'Criar Conta' : 'Entrar'}
                                </h1>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#64748b]">
                                    {isSignUp ? 'Faça parte da revolução QRub' : 'Acesse sua conta QRub'}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {isSignUp && (
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] ml-4">Usuário</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#7c3aed] transition-colors">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (!val.startsWith('@') && val.length > 0) setUsername('@' + val.replace('@', ''));
                                                    else setUsername(val.toLowerCase().replace(/\s/g, ''));
                                                }}
                                                placeholder="@seu_perfil"
                                                required={isSignUp}
                                                className="w-full pl-12 pr-6 py-4 bg-[#f8fafc] border-2 border-transparent rounded-full focus:border-[#7c3aed]/20 focus:bg-white outline-none transition-all font-bold text-sm text-[#1e293b] placeholder:text-[#cbd5e1]"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] ml-4">Email</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#7c3aed] transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="exemplo@email.com"
                                            required
                                            autoComplete="off"
                                            className="w-full pl-12 pr-6 py-4 bg-[#f8fafc] border-2 border-transparent rounded-full focus:border-[#7c3aed]/20 focus:bg-white outline-none transition-all font-bold text-sm text-[#1e293b] placeholder:text-[#cbd5e1]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] ml-4">Senha</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#7c3aed] transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            required
                                            autoComplete="off"
                                            className="w-full pl-12 pr-6 py-4 bg-[#f8fafc] border-2 border-transparent rounded-full focus:border-[#7c3aed]/20 focus:bg-white outline-none transition-all font-bold text-sm text-[#1e293b] placeholder:text-[#cbd5e1]"
                                        />
                                    </div>
                                </div>

                                {isSignUp && (
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-[#94a3b8] ml-4">Confirmar Senha</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#94a3b8] group-focus-within:text-[#7c3aed] transition-colors">
                                                <Lock className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                required={isSignUp}
                                                className="w-full pl-12 pr-6 py-4 bg-[#f8fafc] border-2 border-transparent rounded-full focus:border-[#7c3aed]/20 focus:bg-white outline-none transition-all font-bold text-sm text-[#1e293b] placeholder:text-[#cbd5e1]"
                                            />
                                        </div>
                                    </div>
                                )}

                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -4 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        className="flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl p-4"
                                    >
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <p className="text-[11px] font-bold">{error}</p>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-16 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-violet-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isLoading ? (isSignUp ? 'CRIANDO...' : 'ENTRANDO...') : (isSignUp ? 'CRIAR CONTA' : 'ENTRAR')}
                                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                                </button>

                                <div className="text-center mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsSignUp(!isSignUp)}
                                        className="text-[10px] font-black uppercase tracking-widest text-[#64748b] hover:text-[#7c3aed] transition-colors"
                                    >
                                        {isSignUp ? 'Já tem uma conta? Entre aqui' : 'Ainda não tem conta? Crie uma'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
