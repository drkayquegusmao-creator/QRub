"use client"

import { useAuth } from '@/store/use-auth'
import { 
    CreditCard, 
    Calendar, 
    Zap, 
    ShieldCheck, 
    Clock, 
    ChevronRight,
    TrendingUp,
    Sparkles,
    CheckCircle2,
    Lock,
    ArrowUpCircle,
    BadgeDollarSign,
    ReceiptText
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PlansModal } from '@/components/plans-modal'
import { supabase } from '@/lib/supabase'

interface FinanceiroPanelProps {
    productType: 'qrub_concurso' | 'qrub_saude'
}

export function FinanceiroPanel({ productType }: FinanceiroPanelProps) {
    const { user } = useAuth()
    const [isPlansOpen, setIsPlansOpen] = useState(false)
    const [detailedSub, setDetailedSub] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchDetailedSubscription() {
            if (!user?.id) return
            
            try {
                const { data, error } = await supabase
                    .from('subscriptions')
                    .select('*, plans(*)')
                    .eq('user_id', user.id)
                    .eq('product', productType)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single()
                
                if (data && !error) {
                    setDetailedSub(data)
                }
            } catch (err) {
                console.error('Error fetching sub:', err)
            } finally {
                setIsLoading(false)
            }
        }
        
        fetchDetailedSubscription()
    }, [user?.id, productType])

    // Local fallback
    const subscription = user?.subscriptions?.find(s => s.product === productType)
    const currentPlan = detailedSub?.plans?.nome || subscription?.plan || user?.plan_level || 'free'
    const status = detailedSub?.status || subscription?.status || 'active'
    const expiresAt = detailedSub?.fim || subscription?.expiresAt
    const startsAt = detailedSub?.inicio || subscription?.startsAt
    const paymentMethod = detailedSub?.payment_method || 'PIX/Cartão'
    const paymentId = detailedSub?.mercadopago_payment_id

    const isPremium = currentPlan !== 'free' && currentPlan !== 'FREE'
    const isPaid = ['mensal', 'trimestral', 'semestral', 'anual'].includes(currentPlan.toLowerCase())

    return (
        <div className="space-y-8 max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-700">
            <header className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <CreditCard className="w-5 h-5 font-black" />
                    </div>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-[#0c1322] dark:text-white">
                        Gestão <span className="text-primary italic">Financeira</span>
                    </h1>
                </div>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest pl-1">
                    Informações de faturamento, plano atual e histórico de transações
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. Detalhes da Assinatura */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="overflow-hidden border border-[#0c1322]/5 dark:border-white/5 shadow-2xl shadow-primary/5 bg-card/60 backdrop-blur-2xl rounded-[32px] p-8 relative">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.07]">
                            <Zap className="w-48 h-48 text-primary" />
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 relative z-10">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground flex items-center gap-2">
                                    Assinatura Ativa {isPaid && <Sparkles className="w-5 h-5 text-orange-500 fill-orange-500" />}
                                </h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                    Produto: <span className="text-primary">{productType === 'qrub_saude' ? 'QRUB SAÚDE' : 'QRUB CONCURSOS'}</span>
                                </p>
                            </div>
                            <div className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border-none flex items-center gap-2 ${
                                isPremium 
                                ? "bg-primary text-white shadow-xl shadow-primary/30" 
                                : "bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-400"
                            }`}>
                                {isPremium ? <Zap className="w-3 h-3 fill-current" /> : <Lock className="w-3 h-3" />}
                                {currentPlan.toUpperCase()}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="bg-white/40 dark:bg-white/5 p-6 rounded-[24px] border border-border/30">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Vigência</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-muted-foreground mr-1">Vencimento em:</p>
                                    <p className="text-2xl font-black text-[#0c1322] dark:text-white">
                                        {expiresAt ? new Date(expiresAt).toLocaleDateString('pt-BR') : 'Tempo Indeterminado'}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/40 dark:bg-white/5 p-6 rounded-[24px] border border-border/30">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Data da Compra</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-muted-foreground mr-1">Iniciado em:</p>
                                    <p className="text-2xl font-black text-[#0c1322] dark:text-white">
                                        {startsAt ? new Date(startsAt).toLocaleDateString('pt-BR') : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                            <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 flex items-center gap-4">
                                <BadgeDollarSign className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Pagamento</p>
                                    <p className="text-[10px] font-bold uppercase">{paymentMethod || 'Cartão/PIX'}</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 flex items-center gap-4">
                                <ReceiptText className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Cod. Transação</p>
                                    <p className="text-[10px] font-bold uppercase truncate max-w-[100px]">{paymentId || 'QRUB-FREE'}</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 flex items-center gap-4">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Status MP</p>
                                    <p className="text-[10px] font-black text-emerald-500 uppercase">{status === 'active' ? 'APROVADO' : status.toUpperCase()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upsell / Info Banner */}
                    <motion.div 
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-r from-[#0c1322] to-[#1a2b4a] p-8 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl selection:bg-primary"
                    >
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter">Precisa de um Upgrade?</h3>
                            <p className="text-slate-400 text-xs font-medium max-w-md">
                                Elevate sua preparação com os Planos Premium. Mentor IA, estatísticas avançadas e revisões personalizadas.
                            </p>
                        </div>
                        <button 
                            onClick={() => setIsPlansOpen(true)}
                            className="bg-white text-[#0c1322] font-black uppercase text-xs tracking-widest py-4 px-8 rounded-2xl hover:bg-primary hover:text-white transition-all shadow-xl flex items-center gap-2 shrink-0"
                        >
                            <ArrowUpCircle className="w-4 h-4" /> Ver Planos
                        </button>
                    </motion.div>
                </div>

                {/* 2. Resumo de Benefícios & Infos Úteis */}
                <div className="space-y-6">
                    <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-[32px] p-8 h-full flex flex-col">
                        <h2 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-6 flex items-center gap-2">
                           <TrendingUp className="w-5 h-5 text-primary" /> Ativos do Plano
                        </h2>
                        
                        <ul className="space-y-5 flex-1">
                            <BenefitItem text="Acesso total ao banco de questões" active={isPremium} />
                            <BenefitItem text="Estatísticas detalhadas de evolução" active={isPremium} />
                            <BenefitItem text="Comentários dos Especialistas" active={isPremium} />
                            <FeatureDivider />
                            <BenefitItem text="Mentor Estratégico Dr. QRub (IA)" active={isPaid} isPremium={isPaid} />
                            <BenefitItem text="Resumos inteligentes automáticos" active={isPaid} isPremium={isPaid} />
                            <BenefitItem text="Agenda de revisão adaptativa" active={isPaid} isPremium={isPaid} />
                            <BenefitItem text="Suporte VIP 24h" active={isPaid} isPremium={isPaid} />
                        </ul>

                        <div className="mt-10 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Dúvidas sobre faturamento?</p>
                            <p className="text-[10px] font-semibold text-muted-foreground leading-relaxed">
                                Se você tiver algum problema com seu pagamento ou quiser cancelar, entre em contato com nosso Suporte via Fale Conosco.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <PlansModal 
                isOpen={isPlansOpen} 
                onClose={() => setIsPlansOpen(false)} 
                product={productType}
            />
        </div>
    )
}

function BenefitItem({ text, active, isPremium }: { text: string, active: boolean, isPremium?: boolean }) {
    return (
        <li className={`flex items-center gap-3 text-xs font-bold ${active ? 'text-foreground' : 'text-muted-foreground/50'}`}>
            <div className={`p-1 rounded-full ${active ? (isPremium ? 'bg-orange-500/10 text-orange-500' : 'bg-emerald-500/10 text-emerald-500') : 'bg-slate-100 text-slate-300 dark:bg-white/5'}`}>
                {active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
            </div>
            {text}
            {isPremium && <Badge variant="premium">PREMIUM</Badge>}
        </li>
    )
}

function FeatureDivider() {
    return <div className="h-px bg-border/40 w-full my-2" />
}

function Badge({ children, variant }: { children: any, variant: 'premium' }) {
    return (
        <span className="text-[7px] font-black bg-orange-500/10 text-orange-500 px-1.5 py-0.5 rounded ml-auto tracking-tighter">
            {children}
        </span>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
