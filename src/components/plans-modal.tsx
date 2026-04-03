"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Star, X, Check, Zap, Sparkles } from 'lucide-react'
import { CheckoutModal } from '@/components/checkout-modal'

interface PlansModalProps {
    isOpen: boolean
    onClose: () => void
}

export function PlansModal({ isOpen, onClose }: PlansModalProps) {
    const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'insano' | null>(null)

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-5xl overflow-hidden"
                    >
                        <div className="text-center mb-10 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-foreground">
                                Escolha Sua <span className="text-primary">Evolução</span>
                            </h2>
                            <p className="text-muted-foreground font-medium max-w-xl mx-auto">
                                Desbloqueie ferramentas profissionais e leve sua preparação para o nível de elite. Cancele quando quiser.
                            </p>

                            <button
                                onClick={onClose}
                                className="absolute top-0 right-0 p-4 md:p-0 md:fixed md:top-8 md:right-8 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto pb-20">
                            {/* PREMIUM PLAN */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-card border border-border p-8 rounded-[40px] shadow-xl hover:border-primary/30 transition-all group relative overflow-hidden"
                            >
                                <div className="space-y-6 relative z-10">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                                        <Star className="w-8 h-8 text-primary" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-foreground">Premium</h3>
                                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Essencial para Aprovação</p>
                                    </div>

                                    <div className="py-6 border-y border-border">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm font-bold text-muted-foreground">R$</span>
                                            <span className="text-5xl font-black tracking-tighter text-foreground">29,90</span>
                                            <span className="text-sm font-bold text-muted-foreground">/mês</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4">
                                        <FeatureItem text="Questões Ilimitadas 24h" />
                                        <FeatureItem text="Filtros de Especialidade" />
                                        <FeatureItem text="Modo Simulado Completo" />
                                        <FeatureItem text="Estatísticas de Desempenho" />
                                        <FeatureItem text="Acesso Offline (App)" />
                                    </ul>

                                    <button
                                        onClick={() => setSelectedPlan('mensal')}
                                        className="w-full py-4 rounded-2xl bg-foreground text-background font-black uppercase text-sm tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                                    >
                                        Escolher Premium
                                    </button>
                                </div>
                            </motion.div>

                            {/* INSANO PLAN */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-card border border-orange-500/30 p-8 rounded-[40px] shadow-2xl shadow-orange-500/10 relative overflow-hidden group scale-105 ring-4 ring-orange-500/10"
                            >
                                <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-bl-2xl">
                                    Recomendado
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

                                <div className="space-y-6 relative z-10">
                                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6">
                                        <Crown className="w-8 h-8 text-orange-500" />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-foreground flex items-center gap-2">
                                            Insano <Sparkles className="w-5 h-5 text-orange-500 fill-orange-500" />
                                        </h3>
                                        <p className="text-sm font-bold text-orange-500/80 uppercase tracking-widest mt-1">Alta Performance com IA</p>
                                    </div>

                                    <div className="py-6 border-y border-orange-500/20">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm font-bold text-muted-foreground">R$</span>
                                            <span className="text-5xl font-black tracking-tighter text-foreground">129,90</span>
                                            <span className="text-sm font-bold text-muted-foreground">/mês</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4">
                                        <FeatureItem text="TUDO do Plano Premium" highlighted />
                                        <FeatureItem text="Dr. QRub Mentor (IA)" highlighted />
                                        <FeatureItem text="Caderno de Erros Inteligente" highlighted />
                                        <FeatureItem text="Agenda de Revisão Automática" highlighted />
                                        <FeatureItem text="Suporte VIP Prioritário" highlighted />
                                    </ul>

                                    <button
                                        onClick={() => setSelectedPlan('insano')}
                                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-black uppercase text-sm tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-orange-500/20"
                                    >
                                        Quero Ser Insano
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Checkout Modal Overlay */}
                    {selectedPlan && (
                        <CheckoutModal
                            isOpen={!!selectedPlan}
                            onClose={() => setSelectedPlan(null)}
                            plan={selectedPlan}
                            product="qrub_concurso"
                        />
                    )}
                </div>
            )}
        </AnimatePresence>
    )
}

function FeatureItem({ text, highlighted }: { text: string, highlighted?: boolean }) {
    return (
        <li className={`flex items-center gap-3 text-xs font-bold ${highlighted ? 'text-foreground' : 'text-muted-foreground'}`}>
            <div className={`p-1 rounded-full ${highlighted ? 'bg-orange-500/10 text-orange-500' : 'bg-primary/10 text-primary'}`}>
                <Check className="w-3 h-3" />
            </div>
            {text}
        </li>
    )
}
