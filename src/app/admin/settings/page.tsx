"use client"

import { useState } from 'react'
import { useSettings } from '@/store/use-settings'
import { Save, DollarSign, QrCode, Ticket, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SettingsPage() {
    const { prices, pix, coupons, updatePrices, updatePix, addCoupon, removeCoupon } = useSettings()
    const [tempPrices, setTempPrices] = useState({ ...prices })
    const [tempPix, setTempPix] = useState({ ...pix })
    const [newCoupon, setNewCoupon] = useState('')
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        updatePrices(tempPrices)
        updatePix(tempPix)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const handleAddCoupon = (e: React.FormEvent) => {
        e.preventDefault()
        if (newCoupon) {
            addCoupon(newCoupon)
            setNewCoupon('')
        }
    }

    return (
        <div className="space-y-12 max-w-4xl">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">Configurações do Sistema</h1>
                    <p className="text-muted-foreground font-medium">Gerencie preços, pagamentos e cupons de desconto.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 royal-gradient text-white px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                    {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? 'Salvo!' : 'Salvar Alterações'}
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Preços */}
                <section className="bg-card border border-border rounded-[32px] p-8 space-y-6 soft-shadow">
                    <div className="flex items-center gap-3 text-primary">
                        <DollarSign className="w-6 h-6" />
                        <h2 className="text-xl font-black uppercase tracking-tight">Preços dos Planos</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Plano Premium (Mensal)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold opacity-50">R$</span>
                                <input
                                    type="number"
                                    value={tempPrices.premium}
                                    onChange={(e) => setTempPrices({ ...tempPrices, premium: parseFloat(e.target.value) })}
                                    className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-4 font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Plano Insano (Mensal)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold opacity-50">R$</span>
                                <input
                                    type="number"
                                    value={tempPrices.insano}
                                    onChange={(e) => setTempPrices({ ...tempPrices, insano: parseFloat(e.target.value) })}
                                    className="w-full bg-muted border border-border rounded-xl pl-12 pr-4 py-4 font-bold text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* PIX Config */}
                <section className="bg-card border border-border rounded-[32px] p-8 space-y-6 soft-shadow">
                    <div className="flex items-center gap-3 text-emerald-500">
                        <QrCode className="w-6 h-6" />
                        <h2 className="text-xl font-black uppercase tracking-tight">Recebimento PIX</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Chave PIX</label>
                            <input
                                type="text"
                                value={tempPix.key}
                                onChange={(e) => setTempPix({ ...tempPix, key: e.target.value })}
                                placeholder="Email, CPF ou Chave Aleatória"
                                className="w-full bg-muted border border-border rounded-xl px-4 py-4 font-bold text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Beneficiário</label>
                            <input
                                type="text"
                                value={tempPix.beneficiary}
                                onChange={(e) => setTempPix({ ...tempPix, beneficiary: e.target.value })}
                                placeholder="Nome Completo / Empresa"
                                className="w-full bg-muted border border-border rounded-xl px-4 py-4 font-bold text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Cupons */}
                <section className="bg-card border border-border rounded-[32px] p-8 md:col-span-2 space-y-6 soft-shadow">
                    <div className="flex items-center gap-3 text-orange-500">
                        <Ticket className="w-6 h-6" />
                        <h2 className="text-xl font-black uppercase tracking-tight">Cupons de Desconto</h2>
                    </div>

                    <form onSubmit={handleAddCoupon} className="flex gap-2">
                        <input
                            type="text"
                            value={newCoupon}
                            onChange={(e) => setNewCoupon(e.target.value)}
                            placeholder="NOVO_CUPOM_2026"
                            className="flex-1 bg-muted border border-border rounded-xl px-4 py-4 font-bold text-sm focus:ring-2 focus:ring-orange-500/20 outline-none uppercase"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-orange-500/20"
                        >
                            Adicionar
                        </button>
                    </form>

                    <div className="flex flex-wrap gap-3 mt-4">
                        {coupons.map((coupon) => (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                key={coupon}
                                className="bg-muted border border-border rounded-xl px-4 py-2 flex items-center gap-3"
                            >
                                <span className="text-xs font-black uppercase tracking-widest">{coupon}</span>
                                <button
                                    onClick={() => removeCoupon(coupon)}
                                    className="text-muted-foreground hover:text-destructive transition-colors rounded-full p-1"
                                >
                                    <ShieldCheck className="w-4 h-4 rotate-45" />
                                </button>
                            </motion.div>
                        ))}
                        {coupons.length === 0 && (
                            <p className="text-sm text-muted-foreground font-medium italic">Nenhum cupom ativo no momento.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
