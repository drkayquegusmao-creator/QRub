"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { isMasterEmail } from '@/lib/auth-constants'
import { motion } from 'framer-motion'
import { Activity, BookOpen, ChevronRight, HardHat, Loader2, Sparkles } from 'lucide-react'

export default function SelectEnvironmentPage() {
    const router = useRouter()
    const { user, isAuthenticated } = useAuth()
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (!isHydrated) return

        if (!isAuthenticated || !user) {
            router.push('/auth')
            return
        }

        if (!isMasterEmail(user.email)) {
            router.push('/saude')
        }
    }, [isHydrated, isAuthenticated, user, router])

    if (!isHydrated || !user || !isMasterEmail(user.email)) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="mt-4 text-xs font-black uppercase tracking-widest text-[#1A1033]">Validando acesso...</p>
            </div>
        )
    }

    const handleSelectSaude = () => {
        localStorage.setItem('qrub_last_environment', 'SAUDE')
        router.push('/saude')
    }

    const handleSelectConcursos = () => {
        localStorage.setItem('qrub_last_environment', 'CONCURSOS')
        router.push('/concursos')
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-4xl relative z-10">
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 mb-6"
                    >
                        <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/30">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-4xl font-black italic uppercase tracking-tighter text-[#1A1033]">QRub</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-[#1A1033]"
                    >
                        Escolha o ambiente do QRub
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-base font-bold text-muted-foreground uppercase tracking-widest"
                    >
                        Selecione qual versão do sistema deseja acessar.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1: Saúde */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-card border border-border rounded-[40px] p-8 md:p-10 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all flex flex-col group relative overflow-hidden cursor-pointer"
                        onClick={handleSelectSaude}
                    >
                        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                            <Activity className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-[#1A1033] mb-4">
                            QRub Saúde
                        </h2>
                        <p className="text-sm text-muted-foreground font-medium mb-10 flex-1 leading-relaxed">
                            Banco de questões da área da saúde. <br/> Revalida, residência médica e treinamento clínico.
                        </p>
                        <button className="w-full py-5 bg-card border-2 border-primary/20 text-primary group-hover:bg-primary group-hover:text-white rounded-[24px] font-black uppercase text-sm tracking-widest transition-all flex items-center justify-center gap-2">
                            Acessar QRub Saúde
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>

                    {/* Card 2: Concursos */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-card border border-border rounded-[40px] p-8 md:p-10 shadow-xl hover:shadow-2xl hover:border-indigo-500/50 transition-all flex flex-col group relative overflow-hidden cursor-pointer"
                        onClick={handleSelectConcursos}
                    >
                        <div className="absolute top-6 right-6">
                            <span className="bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                <HardHat className="w-3.5 h-3.5" />
                                Em construção
                            </span>
                        </div>
                        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />
                        <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-[#1A1033] mb-4">
                            QRub Concursos
                        </h2>
                        <p className="text-sm text-muted-foreground font-medium mb-10 flex-1 leading-relaxed">
                            Banco de questões voltado para concursos públicos. Ambiente em preparação.
                        </p>
                        <button className="w-full py-5 bg-card border-2 border-indigo-500/20 text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white rounded-[24px] font-black uppercase text-sm tracking-widest transition-all flex items-center justify-center gap-2">
                            Acessar QRub Concursos
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
