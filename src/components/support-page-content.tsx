"use client"

import { motion } from 'framer-motion'
import { Mail, MessageCircle, Shield, Sparkles, Zap, ArrowRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SupportPageContentProps {
    isConcursos?: boolean
}

export function SupportPageContent({ isConcursos }: SupportPageContentProps) {
    const primaryColor = isConcursos ? "text-indigo-500" : "text-emerald-500"
    const primaryBg = isConcursos ? "bg-indigo-500/10" : "bg-emerald-500/10"
    const primaryBorder = isConcursos ? "border-indigo-500/20" : "border-emerald-500/20"
    const primaryShadow = isConcursos ? "shadow-indigo-500/20" : "shadow-emerald-500/20"

    const contactMethods = [
        {
            name: 'E-mail Comercial',
            value: 'Qrubcomercial@gmail.com',
            desc: 'Para questões financeiras, parcerias e planos corporativos.',
            icon: Mail,
            action: () => window.location.href = 'mailto:Qrubcomercial@gmail.com',
            label: 'Enviar E-mail'
        },
        {
            name: 'WhatsApp Suporte',
            value: 'Suporte Direto',
            desc: 'Dúvidas técnicas, bugs ou ajuda com a plataforma.',
            icon: MessageCircle,
            action: () => window.open('https://wa.me/5500000000000', '_blank'), // Placeholder for WhatsApp, user didn't provide number so I'll use a placeholder or generic link
            label: 'Abrir WhatsApp'
        }
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-12 py-12 px-6">
            <header className="space-y-4">
                <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest", primaryBg, primaryColor, primaryBorder)}>
                    <Shield className="w-3 h-3" />
                    Central de Suporte QRub
                </div>
                <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white leading-none">
                    COMO PODEMOS <br/> <span className={primaryColor}>TE AJUDAR?</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl">
                    Nossa equipe está pronta para acelerar sua aprovação. Entre em contato pelos canais oficiais abaixo.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactMethods.map((method, idx) => (
                    <motion.div
                        key={method.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group p-8 rounded-[40px] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-indigo-500/30 transition-all shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden"
                    >
                        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6", primaryBg, primaryColor)}>
                            <method.icon className="w-8 h-8" />
                        </div>
                        
                        <div className="space-y-2 mb-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-800 dark:text-white">{method.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">{method.desc}</p>
                            <p className={cn("text-lg font-black tracking-tight", primaryColor)}>{method.value}</p>
                        </div>

                        <button
                            onClick={method.action}
                            className={cn(
                                "w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3",
                                isConcursos ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
                                "hover:scale-[1.02] active:scale-[0.98]"
                            )}
                        >
                            {method.label}
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                            <method.icon className="w-40 h-40" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="p-12 rounded-[50px] bg-slate-900 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <Sparkles className="w-32 h-32 text-indigo-400" />
                </div>
                
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Dica Pro</span>
                    </div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-tight">
                        RESPOSTA RÁPIDA NO <br/> <span className="text-indigo-400">PLANO INSANO</span>
                    </h2>
                    <p className="text-slate-400 font-medium max-w-xl">
                        Assinantes do Plano Insano possuem prioridade máxima no atendimento e canal direto com nossos mentores pedagógicos.
                    </p>
                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3">
                        Conhecer Benefícios <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
