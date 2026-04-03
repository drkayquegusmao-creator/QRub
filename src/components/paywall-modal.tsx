"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Star, X, Check, Zap, ArrowRight, ShieldAlert, Copy, Upload, Clock, CheckCircle } from 'lucide-react'
import { useAuth, PlanLevel } from '@/store/use-auth'
import { useSettings } from '@/store/use-settings'
import { useSales } from '@/store/use-sales'
import { useRouter } from 'next/navigation'
import { CheckoutModal } from '@/components/checkout-modal'


interface PaywallModalProps {
    isOpen: boolean
    onClose: () => void
    reason: 'limit' | 'filter' | 'feature' | 'product'
    product: 'qrub_concurso' | 'qrub_saude'
}

type CheckoutStep = 'OFFER' | 'PAYMENT' | 'SUCCESS'

export function PaywallModal({ isOpen, onClose, reason, product }: PaywallModalProps) {
    const { user } = useAuth()
    const { prices, pix } = useSettings()
    const { addSale } = useSales()
    const router = useRouter()
    const [step, setStep] = useState<CheckoutStep>('OFFER')
    const [copied, setCopied] = useState(false)
    const [proofFile, setProofFile] = useState<File | null>(null)
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

    const planPrice = 24.99
    const requiredPlan = 'insano'

    // Reset state when opening
    if (!isOpen && step !== 'OFFER') setStep('OFFER')

    const handleCopyPix = () => {
        navigator.clipboard.writeText(pix.key)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleConfirmPayment = () => {
        if (!user) return

        // Dispatch sale event
        addSale({
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            plan: requiredPlan,
            amount: planPrice,
            proofUrl: proofFile ? URL.createObjectURL(proofFile) : undefined
        })

        setStep('SUCCESS')
    }

    const handleOpenCheckout = () => {
        setIsCheckoutOpen(true)
    }

    const messages = {
        limit: "Você atingiu o limite de 15 questões diárias do Plano Freemium.",
        filter: "Filtros avançados e especializados são exclusivos para o Plano Insano.",
        feature: "Esse recurso é exclusivo do Plano Insano. Desbloqueie acesso ilimitado, mentor IA e revisão inteligente.",
        product: "Você precisa assinar este produto separadamente para ter acesso ilimitado."
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-lg overflow-hidden bg-card rounded-[40px] soft-shadow border border-primary/30"
                    >
                        {/* Header Visual */}
                        <div className="royal-gradient h-32 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            <motion.div
                                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="bg-white/20 p-4 rounded-[24px] backdrop-blur-md relative z-10"
                            >
                                {<Crown className="w-8 h-8 text-white" />}
                            </motion.div>
                            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 z-20">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8">
                            {step === 'OFFER' && (
                                <div className="space-y-6 text-center">
                                    <div className="space-y-2">
                                        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                                            <ShieldAlert className="w-3 h-3" />
                                            Acesso Restrito
                                        </div>
                                        <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                                            QUERO SER INSANO
                                        </h2>
                                        <p className="text-muted-foreground font-medium text-sm leading-relaxed px-2">
                                            {messages[reason]}
                                        </p>
                                    </div>

                                    <div className="bg-primary/5 rounded-3xl p-6 text-center border border-primary/10 space-y-2">
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Investimento</span>
                                        <div className="text-4xl font-black text-primary tracking-tighter">
                                            R$ 24,99
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">Plano Mensal • Renovação Automática</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2 text-left bg-muted/30 p-4 rounded-2xl">
                                        <FeatureItem text="Questões Ilimitadas" />
                                        <FeatureItem text="Mentor IA (Dr. Qrub)" />
                                        <FeatureItem text="Revisão Espaçada e Inteligente" />
                                        <FeatureItem text="Caderno de Erros Automático" />
                                    </div>


                                    <button
                                        onClick={handleOpenCheckout}
                                        className="w-full royal-gradient text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 soft-shadow hover:scale-[1.02] active:scale-95 transition-all group shadow-xl shadow-primary/20"
                                    >
                                        QUERO SER INSANO
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            )}

                            {step === 'PAYMENT' && (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-xl font-black italic tracking-tight uppercase">Pagamento via PIX</h3>
                                        <p className="text-xs text-muted-foreground">Escaneie o QR Code ou copie a chave abaixo.</p>
                                    </div>

                                    <div className="flex justify-center my-4">
                                        {/* Using a public API for QR Code generation based on the PIX key */}
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-border">
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pix.key}`}
                                                alt="QR Code PIX"
                                                className="w-32 h-32"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-muted p-4 rounded-2xl space-y-3">
                                        <div className="flex items-center justify-between gap-3 bg-background p-3 rounded-xl border border-border">
                                            <code className="text-xs font-mono truncate flex-1">{pix.key || "Chave não configurada"}</code>
                                            <button
                                                onClick={handleCopyPix}
                                                className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                                            >
                                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <div className="text-[10px] text-muted-foreground text-center">
                                            <span className="font-bold">Beneficiário:</span> {pix.beneficiary} • <span className="font-bold">Banco:</span> {pix.institution}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="flex flex-col gap-2 p-4 border-2 border-dashed border-border rounded-2xl hover:bg-muted/30 transition-colors cursor-pointer text-center">
                                            <Upload className="w-6 h-6 mx-auto text-muted-foreground" />
                                            <span className="text-xs font-bold text-muted-foreground">
                                                {proofFile ? proofFile.name : "Clique para anexar o Comprovante"}
                                            </span>
                                            <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => setProofFile(e.target.files?.[0] || null)} />
                                        </label>

                                        <button
                                            onClick={handleConfirmPayment}
                                            className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 active:scale-95"
                                        >
                                            JÁ REALIZEI O PAGAMENTO
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 'SUCCESS' && (
                                <div className="text-center space-y-6 py-8">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Clock className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-emerald-600 italic tracking-tight uppercase">Pagamento Enviado!</h3>
                                        <p className="text-muted-foreground text-sm mt-2 px-4">
                                            Recebemos o seu comprovante. Nossa equipe irá validar o pagamento e liberar seu acesso em instantes.
                                        </p>
                                    </div>
                                    <div className="bg-muted p-4 rounded-2xl text-xs text-muted-foreground">
                                        <p>Status atual: <span className="font-bold text-yellow-600">Em Análise</span></p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-full bg-muted text-foreground py-4 rounded-2xl font-bold hover:bg-muted/80 transition-colors"
                                    >
                                        Fechar e Aguardar
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Checkout Modal - Automated PIX Payment */}
                    <CheckoutModal
                        isOpen={isCheckoutOpen}
                        onClose={() => setIsCheckoutOpen(false)}
                        plan="insano"
                        product={product}
                    />
                </div>
            )}
        </AnimatePresence>
    )
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground">
            <Check className="w-3 h-3 text-emerald-500" />
            {text}
        </div>
    )
}
