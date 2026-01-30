"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, LogIn, AlertCircle, Sparkles } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { loginWithPassword } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Validação básica
        if (!email || !password) {
            setError('Por favor, preencha todos os campos')
            setIsLoading(false)
            return
        }

        // Tentar login
        const result = loginWithPassword(email, password)

        setIsLoading(false)

        if (result.success) {
            onClose()
            // Redirecionar baseado no role
            if (result.role === 'MASTER') {
                router.push('/dashboard')
            } else {
                router.push('/onboarding')
            }
        } else {
            setError(result.message)
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
                            {/* Decorative Elements */}
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
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">
                                    Entrar
                                </h2>
                                <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest">
                                    Digite suas credenciais para acessar
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                        Email
                                    </label>
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

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                                        Senha
                                    </label>
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



                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl p-3"
                                    >
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <p className="text-xs font-bold">{error}</p>
                                    </motion.div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full royal-gradient text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest soft-shadow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    <LogIn className="w-5 h-5" />
                                    {isLoading ? 'ENTRANDO...' : 'ENTRAR'}
                                </button>

                                {/* Info Text */}
                                <p className="text-center text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60 leading-relaxed">
                                    Ainda não tem conta? Digite um email e senha para criar agora.
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
