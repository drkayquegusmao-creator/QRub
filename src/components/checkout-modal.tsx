"use client"

import { useState, useEffect } from 'react'
import { X, CreditCard, Check, Loader2, Copy, QrCode, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth, PlanLevel } from '@/store/use-auth'

interface CheckoutModalProps {
    isOpen: boolean
    onClose: () => void
    plan: 'free' | 'mensal' | 'trimestral' | 'semestral' | 'anual'
    product: 'qrub_concurso' | 'qrub_saude'
}

const PLAN_PRICES = {
    free: 0.00,
    mensal: 29.99,
    trimestral: 79.99,
    semestral: 159.99,
    anual: 319.99
}

const PLAN_BENEFITS = {
    free: [
        '15 questões por dia',
        'Filtros básicos',
        'Teste toda a plataforma'
    ],
    mensal: [
        'Questões ilimitadas',
        'Revisão espaçada',
        'Caderno de erros auto',
        'Dr. Qrub (mentor estratégico)',
        'Estatísticas completas',
        'Filtros avançados'
    ],
    trimestral: [
        'Tudo do plano mensal',
        'Melhor custo-benefício'
    ],
    semestral: [
        'Tudo do plano mensal',
        'Economia maior',
        'Ideal para ciclos de estudo'
    ],
    anual: [
        'Tudo liberado por 12 meses',
        'Máxima economia',
        'Para quem quer aprovação sem pausa'
    ]
}

type PaymentStatus = 'idle' | 'generating' | 'pending' | 'approved' | 'error'

export function CheckoutModal({ isOpen, onClose, plan, product }: CheckoutModalProps) {
    const { user, updateUserPlan } = useAuth()
    const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | null>(null)
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle')
    const [pixCode, setPixCode] = useState<string>('')
    const [qrCodeBase64, setQrCodeBase64] = useState<string>('')
    const [paymentId, setPaymentId] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [copied, setCopied] = useState(false)
    const [checkingPayment, setCheckingPayment] = useState(false)

    const price = PLAN_PRICES[plan]
    const benefits = PLAN_BENEFITS[plan]
    const productLabel = product === 'qrub_saude' ? 'QRub Saúde' : 'QRub Concurso'

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setPaymentMethod(null)
            setPaymentStatus('idle')
            setPixCode('')
            setQrCodeBase64('')
            setPaymentId('')
            setError('')
            setCopied(false)
            setCheckingPayment(false)
        }
    }, [isOpen])

    // Poll payment status when payment is pending
    useEffect(() => {
        if (paymentStatus !== 'pending' || !paymentId) return

        const interval = setInterval(async () => {
            setCheckingPayment(true)
            try {
                const response = await fetch(`/api/payments/check?paymentId=${paymentId}`)
                const data = await response.json()

                if (data.status === 'approved') {
                    setPaymentStatus('approved')
                    // Update user plan
                    if (user) {
                        updateUserPlan(plan, product)
                    }
                    clearInterval(interval)
                }
            } catch (err) {
                console.error('Error checking payment:', err)
            } finally {
                setCheckingPayment(false)
            }
        }, 3000) // Check every 3 seconds

        return () => clearInterval(interval)
    }, [paymentStatus, paymentId, user, plan, updateUserPlan])

    const handleGeneratePixPayment = async () => {
        setPaymentStatus('generating')
        setError('')

        try {
            const response = await fetch('/api/payments/create-pix', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: price,
                    plan: plan,
                    product: product,
                    userId: user?.id,
                    userEmail: user?.email,
                    userName: user?.name
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao gerar pagamento PIX')
            }

            setPixCode(data.qr_code)
            setQrCodeBase64(data.qr_code_base64)
            setPaymentId(data.payment_id)
            setPaymentStatus('pending')
        } catch (err: any) {
            setError(err.message)
            setPaymentStatus('error')
        }
    }

    const handleProcessCardPayment = async (e: React.FormEvent) => {
        e.preventDefault()
        setPaymentStatus('generating')
        setError('')
        
        // Simulação de processamento de cartão (Na real usaria Mercado Pago Bricks/Card Token)
        setTimeout(async () => {
            try {
                if (user) await updateUserPlan(plan, product)
                setPaymentStatus('approved')
            } catch (err) {
                setError('Erro ao ativar plano após pagamento.')
                setPaymentStatus('error')
            }
        }, 2000)
    }

    const handleCopyPixCode = async () => {
        try {
            await navigator.clipboard.writeText(pixCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-card border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl relative"
            >
                {/* Header */}
                <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-8 rounded-t-[40px] z-10">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${plan !== 'free' 
                            ? (product === 'qrub_saude' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500') 
                            : 'bg-primary/10 text-primary'}`}>
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                                Assinar {plan}
                            </h2>
                            <p className="text-sm font-medium text-muted-foreground">
                                {productLabel}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* Status Screens */}
                    <AnimatePresence mode="wait">
                        {paymentStatus === 'idle' && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Plan Details */}
                                <div className={`p-8 rounded-2xl border-2 ${plan !== 'free' ? 'bg-orange-500/5 border-orange-500/20' : 'bg-primary/5 border-primary/20'}`}>
                                    <div className="flex items-baseline justify-between mb-6">
                                        <div>
                                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Valor do Plano</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-black">R$ {price.toFixed(2).replace('.', ',')}</span>
                                                <span className="text-muted-foreground">/mês</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">O que está incluído:</p>
                                        {benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <Check className={`w-5 h-5 ${plan !== 'free' ? 'text-orange-500' : 'text-primary'}`} />
                                                <span className="font-medium">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Formas de Pagamento ou Acesso Grátis */}
                                {plan === 'free' ? (
                                    <div className="space-y-4">
                                        <button
                                            onClick={async () => {
                                                setPaymentStatus('generating')
                                                try {
                                                    if (user) {
                                                        await updateUserPlan('free', product)
                                                        setPaymentStatus('approved')
                                                    }
                                                } catch (err) {
                                                    setError('Erro ao ativar acesso grátis.')
                                                    setPaymentStatus('error')
                                                }
                                            }}
                                            className="w-full royal-gradient text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest transition-all shadow-xl hover:scale-[1.02] active:scale-95"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <Check className="w-5 h-5" />
                                                Ativar Acesso Grátis
                                            </div>
                                        </button>
                                        <p className="text-xs text-center text-muted-foreground">
                                            Acesso imediato apenas ao {productLabel}.
                                        </p>
                                    </div>
                                ) : !paymentMethod ? (
                                    <div className="space-y-4">
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Escolha como pagar:</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setPaymentMethod('pix')}
                                                className="p-6 border-2 border-border hover:border-emerald-500 hover:bg-emerald-500/5 rounded-2xl flex flex-col items-center gap-3 transition-all"
                                            >
                                                <QrCode className="w-8 h-8 text-emerald-500" />
                                                <span className="font-bold">PIX</span>
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Aprovação imediata</span>
                                            </button>
                                            <button
                                                onClick={() => setPaymentMethod('card')}
                                                className="p-6 border-2 border-border hover:border-blue-500 hover:bg-blue-500/5 rounded-2xl flex flex-col items-center gap-3 transition-all"
                                            >
                                                <CreditCard className="w-8 h-8 text-blue-500" />
                                                <span className="font-bold">Cartão de Crédito</span>
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Em até 12x</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : paymentMethod === 'pix' ? (
                                    <div className="space-y-4">
                                        <button onClick={() => setPaymentMethod(null)} className="text-sm text-primary hover:underline mb-2 inline-block">
                                            &larr; Voltar para formas de pagamento
                                        </button>
                                        <button
                                            onClick={handleGeneratePixPayment}
                                            className="w-full py-5 rounded-2xl font-black uppercase text-sm tracking-widest transition-all shadow-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-[1.02] active:scale-95"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <QrCode className="w-5 h-5" />
                                                Gerar PIX para Pagamento
                                            </div>
                                        </button>
                                        <p className="text-xs text-center text-muted-foreground">
                                            Liberação imediata para {productLabel}. Pagamento seguro via Mercado Pago.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <button onClick={() => setPaymentMethod(null)} className="text-sm text-primary hover:underline mb-2 inline-block">
                                            &larr; Voltar para formas de pagamento
                                        </button>
                                        <form onSubmit={handleProcessCardPayment} className="space-y-4 bg-muted/30 p-6 rounded-2xl border border-border">
                                            <div>
                                                <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Número do Cartão</label>
                                                <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Validade</label>
                                                    <input required type="text" placeholder="MM/AA" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">CVV</label>
                                                    <input required type="password" maxLength={4} placeholder="123" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">Nome no Cartão</label>
                                                <input required type="text" placeholder="NOME IMPRESSO" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none uppercase" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-muted-foreground uppercase mb-1 block">CPF do Titular</label>
                                                <input required type="text" placeholder="000.000.000-00" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                                            </div>
                                            
                                            <button
                                                type="submit"
                                                className="w-full mt-4 py-4 rounded-xl font-black uppercase text-sm tracking-widest transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-lg"
                                            >
                                                Pagar com Cartão
                                            </button>
                                            <p className="text-xs text-center text-muted-foreground mt-2">
                                                Seu acesso será liberado imediatamente após a aprovação.
                                            </p>
                                        </form>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {paymentStatus === 'generating' && (
                            <motion.div
                                key="generating"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20 space-y-4"
                            >
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                <p className="font-bold text-lg">Processando...</p>
                                <p className="text-sm text-muted-foreground">Aguarde um momento</p>
                            </motion.div>
                        )}

                        {paymentStatus === 'pending' && (
                            <motion.div
                                key="pending"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* QR Code */}
                                <div className="bg-white p-8 rounded-2xl border-2 border-border">
                                    <p className="text-center font-bold text-foreground mb-4">Escaneie o QR Code com seu banco:</p>
                                    {qrCodeBase64 && (
                                        <div className="flex justify-center">
                                            <img
                                                src={`data:image/png;base64,${qrCodeBase64}`}
                                                alt="QR Code PIX"
                                                className="w-64 h-64 border-4 border-foreground rounded-xl"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* PIX Code */}
                                <div className="space-y-2">
                                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-center">
                                        Ou copie o código PIX:
                                    </p>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={pixCode}
                                            readOnly
                                            className="flex-1 bg-muted border border-border rounded-xl px-4 py-3 font-mono text-xs"
                                        />
                                        <button
                                            onClick={handleCopyPixCode}
                                            className={`px-6 py-3 rounded-xl font-bold transition-all ${copied
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-primary text-white hover:scale-105'
                                                }`}
                                        >
                                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Status Message */}
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center space-y-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                                        <p className="font-bold text-blue-500">Aguardando pagamento...</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Após o pagamento, seu plano será ativado automaticamente em poucos segundos.
                                    </p>
                                    {checkingPayment && (
                                        <p className="text-xs text-blue-500 animate-pulse">Verificando pagamento...</p>
                                    )}
                                </div>

                                <div className="text-center">
                                    <p className="text-xs text-muted-foreground">
                                        Valor: <span className="font-bold">R$ {price.toFixed(2).replace('.', ',')}</span>
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {paymentStatus === 'approved' && (
                            <motion.div
                                key="approved"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center py-20 space-y-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <Check className="w-10 h-10 text-emerald-500" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-3xl font-black">Pagamento Aprovado! 🎉</h3>
                                    <p className="text-muted-foreground">
                                        Seu plano <span className="font-bold text-foreground">{plan}</span> foi ativado com sucesso!
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="royal-gradient text-white px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all"
                                >
                                    Começar a Estudar
                                </button>
                            </motion.div>
                        )}

                        {paymentStatus === 'error' && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                            >
                                <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-8 text-center space-y-4">
                                    <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
                                    <div>
                                        <h3 className="text-xl font-bold text-rose-500 mb-2">Erro ao Gerar Pagamento</h3>
                                        <p className="text-sm text-muted-foreground">{error}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setPaymentStatus('idle')
                                        setError('')
                                    }}
                                    className="w-full py-4 rounded-2xl font-bold uppercase text-sm tracking-widest bg-muted hover:bg-muted/80 transition-all"
                                >
                                    Tentar Novamente
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}
