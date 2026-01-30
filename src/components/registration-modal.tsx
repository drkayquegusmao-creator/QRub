"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/store/use-auth'

interface RegistrationModalProps {
    isOpen: boolean
    onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-lg overflow-hidden bg-card rounded-[32px] soft-shadow border border-primary/20"
                    >
                        {/* Visual Header */}
                        <div className="royal-gradient h-32 flex items-center justify-center relative">
                            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                                <ShieldCheck className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute top-4 right-4 bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Limite Atingido
                            </div>
                        </div>

                        <div className="p-10 text-center space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black italic tracking-tight">Limite de Visitante Atingido</h2>
                                <p className="text-muted-foreground font-medium">
                                    Você atingiu o limite de <span className="text-primary font-bold">20 questões</span> como visitante.
                                    Crie sua conta agora para continuar estudando e desbloquear o banco completo.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                <div className="flex items-center gap-3 text-left p-4 rounded-2xl bg-muted/50 border border-border">
                                    <div className="bg-emerald-500/10 p-2 rounded-lg"><Sparkles className="w-5 h-5 text-emerald-500" /></div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest">Relatórios Reais</p>
                                        <p className="text-[10px] text-muted-foreground">Veja seu desempenho por subespecialidade.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-left p-4 rounded-2xl bg-muted/50 border border-border">
                                    <div className="bg-primary/10 p-2 rounded-lg"><ShieldCheck className="w-5 h-5 text-primary" /></div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest">Acesso Vitalício</p>
                                        <p className="text-[10px] text-muted-foreground">Histórico completo de erros e acertos.</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full royal-gradient text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 soft-shadow hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                CRIAR MINHA CONTA AGORA
                                <ArrowRight className="w-6 h-6" />
                            </button>

                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                Lead Generation by QRub SaaS
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
