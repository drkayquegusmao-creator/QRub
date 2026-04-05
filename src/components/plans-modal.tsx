"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Star, X, Check, Zap, Sparkles, TrendingDown, Infinity, Calendar } from 'lucide-react'
import { CheckoutModal } from '@/components/checkout-modal'
import { PlanLevel } from '@/store/use-auth'

interface PlansModalProps {
    isOpen: boolean
    onClose: () => void
    product?: 'qrub_concurso' | 'qrub_saude'
}

interface PlanData {
    id: PlanLevel
    name: string
    price: number
    period: string
    monthly_equivalent?: number
    description: string
    features: string[]
    badge?: string
    color: string
    highlighted?: boolean
}

const ALL_PLANS: PlanData[] = [
    {
        id: 'free',
        name: 'FREE',
        price: 0,
        period: '/mês',
        description: 'Comece sem custo e evolua no seu ritmo.',
        features: [
            '15 questões por dia',
            'Acesso ao banco de questões',
            'Experimente a plataforma'
        ],
        color: 'slate'
    },
    {
        id: 'mensal',
        name: 'MENSAL',
        price: 29.99,
        period: '/mês',
        description: 'Flexibilidade total para começar agora.',
        features: [
            'Questões ilimitadas',
            'Revisão espaçada',
            'Caderno de erros auto',
            'Dr. Qrub (mentor estratégico)',
            'Estatísticas completas',
            'Filtros avançados'
        ],
        color: 'default'
    },
    {
        id: 'trimestral',
        name: 'TRIMESTRAL',
        price: 79.99,
        period: '/3m',
        monthly_equivalent: 26.66,
        badge: 'ECONÔMICO',
        description: 'Compromisso com resultado.',
        features: [
            'Tudo do plano mensal',
            'Melhor custo-benefício'
        ],
        color: 'default'
    },
    {
        id: 'semestral',
        name: 'SEMESTRAL',
        price: 159.99,
        period: '/6m',
        monthly_equivalent: 26.66,
        badge: 'MAIS ESCOLHIDO',
        highlighted: true,
        description: 'O plano de quem leva a aprovação a sério.',
        features: [
            'Tudo do plano insano',
            'Economia maior',
            'Ideal para ciclos de estudo'
        ],
        color: 'purple'
    },
    {
        id: 'anual',
        name: 'ANUAL',
        price: 319.99,
        period: '/ano',
        monthly_equivalent: 26.66,
        badge: 'MELHOR VALOR',
        description: 'Um ano focado na sua aprovação.',
        features: [
            'Tudo liberado por 12 meses',
            'Máxima economia',
            'Para quem quer aprovação sem pausa'
        ],
        color: 'orange'
    }
]

export function PlansModal({ isOpen, onClose, product = 'qrub_concurso' }: PlansModalProps) {
    const [selectedPlan, setSelectedPlan] = useState<PlanLevel | null>(null)

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md overflow-hidden">
            {/* Close Button UI */}
            <div className="absolute top-0 right-0 w-full p-8 flex justify-end items-center pointer-events-none z-50">
               <button
                    onClick={onClose}
                    className="pointer-events-auto p-3 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="w-full max-w-[1400px] max-h-[95vh] overflow-y-auto no-scrollbar">
                <div className="text-center py-12 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-foreground leading-none">
                        Escolha Sua <span className="text-primary italic">Evolução</span>
                    </h2>
                    <p className="text-muted-foreground font-bold text-xs uppercase tracking-[0.2em]">
                        Desbloqueie ferramentas profissionais e seja aprovado mais rápido
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-4 pb-20 items-stretch">
                    {ALL_PLANS.map((plan) => (
                        <PlanCard 
                            key={plan.id} 
                            plan={plan} 
                            onSelect={() => setSelectedPlan(plan.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Checkout Modal Overlay */}
            <AnimatePresence>
                {selectedPlan && (
                    <CheckoutModal
                        isOpen={!!selectedPlan}
                        onClose={() => setSelectedPlan(null)}
                        plan={selectedPlan}
                        product={product}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

function PlanCard({ plan, onSelect }: { plan: PlanData, onSelect: () => void }) {
    const isHighlighted = plan.highlighted
    const colorClasses = {
        slate: "bg-[#1e293b]/40 border-slate-500/20",
        default: "bg-[#0f172a]/60 border-white/5 hover:border-primary/20",
        purple: "bg-[#4c1d95] border-purple-500/30 shadow-2xl shadow-purple-500/20",
        orange: "bg-[#0f172a]/60 border-orange-500/30 hover:border-orange-500/50"
    }

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={`
                relative flex flex-col p-6 rounded-[32px] border transition-all group
                ${colorClasses[plan.color as keyof typeof colorClasses]}
                ${isHighlighted ? 'scale-105 z-10' : 'scale-100 opacity-90 hover:opacity-100'}
            `}
        >
            {plan.badge && (
                <div className={`
                    absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[9px] font-black tracking-widest
                    ${plan.color === 'purple' ? 'bg-white text-purple-900' : 'bg-blue-500 text-white'}
                `}>
                    {plan.badge}
                </div>
            )}

            <div className="space-y-4 flex-1">
                <div className="space-y-1">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">{plan.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 leading-tight min-h-[30px]">{plan.description}</p>
                </div>

                <div className="py-2 border-y border-white/5 space-y-1">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xs font-bold text-slate-400">R$</span>
                        <span className="text-3xl font-black text-white">{plan.price.toString().replace('.', ',')}</span>
                        <span className="text-xs font-bold text-slate-400">{plan.period}</span>
                    </div>
                    {plan.monthly_equivalent && (
                        <p className="text-[10px] font-bold text-slate-500 italic uppercase">Equivalente ~R$ {plan.monthly_equivalent.toString().replace('.', ',')}/m</p>
                    )}
                </div>

                <ul className="space-y-3 py-4">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                            <div className={`mt-0.5 p-0.5 rounded-full ${plan.color === 'purple' ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                                <Check className="w-3 h-3" />
                            </div>
                            <span className="text-[11px] font-medium text-slate-300 leading-snug">{feature}</span>
                        </li>
                    ))}
                    {/* Placeholder for missing features in cheaper plans */}
                    {plan.id === 'free' && (
                         <li className="flex items-start gap-2.5 opacity-20 filter grayscale">
                            <X className="w-4 h-4" />
                            <span className="text-[11px] font-medium text-slate-500 leading-snug">Sem Dr. Qrub Mentor</span>
                         </li>
                    )}
                </ul>
            </div>

            <button
                onClick={onSelect}
                className={`
                    w-full py-4 mt-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all
                    ${plan.color === 'purple' 
                        ? 'bg-white text-purple-900 hover:scale-105' 
                        : (plan.color === 'orange' 
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:scale-105 shadow-xl shadow-orange-500/20' 
                            : 'bg-white/5 text-white hover:bg-white/10')}
                `}
            >
                Assinar Agora
            </button>
        </motion.div>
    )
}
