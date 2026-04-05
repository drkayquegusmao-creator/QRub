"use client"

import { useState, useEffect } from 'react'
import { X, CreditCard, Check, QrCode, Loader2, Copy, ArrowLeft, ShieldCheck, Lock, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth, PlanLevel } from '@/store/use-auth'

interface CheckoutModalProps {
    isOpen: boolean
    onClose: () => void
    plan: PlanLevel // Updated to use PlanLevel
    product: 'qrub_concurso' | 'qrub_saude'
}

const PLAN_PRICES: Record<PlanLevel, number> = {
    free: 0.00,
    insano: 24.99,
    mensal: 29.99,
    trimestral: 79.99,
    semestral: 159.99,
    anual: 319.99
}

const PLAN_BENEFITS: Record<PlanLevel, string[]> = {
    free: [
        '15 questões por dia',
        'Filtros básicos',
        'Teste toda a plataforma'
    ],
    insano: [
        'Questões ilimitadas',
        'Revisão espaçada',
        'Caderno de erros auto',
        'Dr. Qrub (mentor estratégico)',
        'Estatísticas completas',
        'Filtros avançados'
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
        }, 3000)

        return () => clearInterval(interval)
    }, [paymentStatus, paymentId, user, plan, updateUserPlan, product])

    const handleGeneratePixPayment = async () => {
        setPaymentStatus('generating')
        setError('')
        setPixCode('')
        setQrCodeBase64('')

        try {
            const response = await fetch('/api/payments/create-pix', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: price,
                    plan: plan,
                    product: product,
                    userId: user?.id,
                    userEmail: user?.email,
                    userDoc: '' 
                }),
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Erro ao gerar PIX')

            setPixCode(data.qr_code)
            setQrCodeBase64(data.qr_code_base64)
            setPaymentId(data.payment_id)
            setPaymentStatus('pending')

        } catch (err: any) {
            console.error('PIX Error:', err)
            setError(err.message || 'Erro ao conectar ao Mercado Pago.')
            setPaymentStatus('error')
        }
    }

    const handleProcessCardPayment = async (e: React.FormEvent) => {
        e.preventDefault()
        setPaymentStatus('generating')
        setError('')

        try {
            const response = await fetch('/api/payments/create-card', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: price,
                    plan: plan,
                    product: product,
                    userId: user?.id,
                    userEmail: user?.email
                }),
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Erro ao processar cartão')
            window.location.href = data.init_point
        } catch (err: any) {
            console.error('Card Error:', err)
            setError(err.message || 'Erro ao iniciar pagamento com cartão.')
            setPaymentStatus('error')
        }
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
                {/* Premium Header */}
                <div className="royal-gradient p-10 text-center relative overflow-hidden rounded-t-[40px]">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all text-white/50 hover:text-white z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white mb-2">
                            <CreditCard className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg">
                            Assinar {plan}
                        </h2>
                        <p className="text-sm font-medium text-white/70 uppercase tracking-widest">
                            {productLabel}
                        </p>
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
                                {/* Plan Details Upgrade */}
                                <div className="royal-gradient p-1 rounded-[32px] shadow-2xl">
                                    <div className="bg-background rounded-[30px] p-8 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <QrCode className="w-32 h-32 rotate-12" />
                                        </div>

                                        <div className="flex flex-col gap-6 relative z-10">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Assinatura Selecionada</p>
                                                    <h3 className="text-2xl font-black italic uppercase text-foreground">{plan}</h3>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Valor Unitário</p>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-3xl font-black text-foreground">R$ {price.toFixed(2).replace('.', ',')}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="h-px bg-border/50" />

                                            <div className="space-y-2">
                                                {benefits.slice(0, 4).map((benefit, idx) => (
                                                    <div key={idx} className="flex items-center gap-3">
                                                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-emerald-500" />
                                                        </div>
                                                        <span className="text-sm font-medium text-muted-foreground">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
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
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-px flex-1 bg-border" />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Formas de Pagamento</p>
                                            <div className="h-px flex-1 bg-border" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setPaymentMethod('pix')}
                                                className="p-8 border-2 border-border hover:border-emerald-500 hover:bg-emerald-500/5 rounded-[24px] flex flex-col items-center gap-4 transition-all relative group overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                                                    <QrCode className="w-12 h-12" />
                                                </div>
                                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                                    <QrCode className="w-6 h-6 text-emerald-500" />
                                                </div>
                                                <div className="text-center">
                                                    <span className="block font-black text-sm uppercase tracking-tight">PIX</span>
                                                    <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Instantâneo</span>
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => setPaymentMethod('card')}
                                                className="p-8 border-2 border-border hover:border-blue-500 hover:bg-blue-500/5 rounded-[24px] flex flex-col items-center gap-4 transition-all relative group overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-10 transition-opacity">
                                                    <CreditCard className="w-12 h-12" />
                                                </div>
                                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                                                    <CreditCard className="w-6 h-6 text-blue-500" />
                                                </div>
                                                <div className="text-center">
                                                    <span className="block font-black text-sm uppercase tracking-tight">Cartão</span>
                                                    <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Até 12x</span>
                                                </div>
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
                                    <div className="space-y-6">
                                        <button onClick={() => setPaymentMethod(null)} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-2">
                                            <ArrowLeft className="w-3 h-3" /> Voltar para opções
                                        </button>
                                        
                                        <div className="p-8 border-2 border-blue-500/20 bg-blue-500/5 rounded-3xl space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                                    <CreditCard className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black uppercase text-sm italic">Pagamento com Cartão</h4>
                                                    <p className="text-xs text-muted-foreground">Redirecionamento seguro para o Mercado Pago</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleProcessCardPayment}
                                                className="w-full py-5 rounded-2xl font-black uppercase text-sm tracking-widest transition-all bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95"
                                            >
                                                Ir para Pagamento Seguro
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-center gap-4 grayscale opacity-50">
                                            <div className="flex items-center gap-1">
                                                <ShieldCheck className="w-4 h-4" />
                                                <span className="text-[9px] font-bold uppercase tracking-widest">Ambiente Seguro</span>
                                            </div>
                                            <div className="h-4 w-px bg-border" />
                                            <div className="flex items-center gap-1">
                                                <Lock className="w-4 h-4" />
                                                <span className="text-[9px] font-bold uppercase tracking-widest">SSL Encrypted</span>
                                            </div>
                                        </div>
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
