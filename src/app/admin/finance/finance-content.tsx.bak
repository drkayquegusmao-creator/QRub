"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, DollarSign, QrCode, CheckCircle, XCircle, Search, Clock, FileText, Upload } from 'lucide-react'
import { useSettings } from '@/store/use-settings'
import { useSales, SaleStatus } from '@/store/use-sales'
import { useAuth } from '@/store/use-auth'

export default function FinanceContent() {
    const [activeTab, setActiveTab] = useState<'settings' | 'sales'>('settings')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 bg-card p-2 rounded-2xl w-fit border border-border">
                <TabButton
                    active={activeTab === 'settings'}
                    onClick={() => setActiveTab('settings')}
                    label="Planos e Preços"
                    icon={DollarSign}
                />
                <TabButton
                    active={activeTab === 'sales'}
                    onClick={() => setActiveTab('sales')}
                    label="Vendas e Ativações"
                    icon={FileText}
                />
            </div>

            {activeTab === 'settings' ? <FinancialSettingsTab /> : <SalesTab />}
        </div>
    )
}

function TabButton({ active, onClick, label, icon: Icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${active
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
        >
            <Icon className="w-4 h-4" />
            {label}
        </button>
    )
}

function FinancialSettingsTab() {
    const { prices, pix, updatePrices, updatePix, coupons, addCoupon, removeCoupon } = useSettings()
    const [localPrices, setLocalPrices] = useState(prices)
    const [localPix, setLocalPix] = useState(pix)
    const [newCoupon, setNewCoupon] = useState('')
    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        updatePrices(localPrices)
        updatePix(localPix)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Price Configuration */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-6"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-emerald-500/10 p-3 rounded-xl">
                        <DollarSign className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black">Preços dos Planos</h2>
                        <p className="text-muted-foreground text-sm">Defina o valor exibido no modal de upgrade.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Plano Premium (R$)</label>
                        <input
                            type="number"
                            value={localPrices.premium || ''}
                            onChange={(e) => setLocalPrices({ ...localPrices, premium: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-background border border-border rounded-xl p-4 font-mono text-lg focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Plano Insano (R$)</label>
                        <input
                            type="number"
                            value={localPrices.insano || ''}
                            onChange={(e) => setLocalPrices({ ...localPrices, insano: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-background border border-border rounded-xl p-4 font-mono text-lg focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                </div>
            </motion.div>

            {/* PIX Configuration */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-6"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500/10 p-3 rounded-xl">
                        <QrCode className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black">Dados do PIX</h2>
                        <p className="text-muted-foreground text-sm">Configuração para geração do QR Code.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Chave PIX</label>
                        <input
                            type="text"
                            value={localPix.key}
                            onChange={(e) => setLocalPix({ ...localPix, key: e.target.value })}
                            placeholder="CPF, CNPJ, Email ou Aleatória"
                            className="w-full bg-background border border-border rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Nome do Beneficiário</label>
                        <input
                            type="text"
                            value={localPix.beneficiary}
                            onChange={(e) => setLocalPix({ ...localPix, beneficiary: e.target.value })}
                            className="w-full bg-background border border-border rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Instituição Bancária</label>
                        <input
                            type="text"
                            value={localPix.institution}
                            onChange={(e) => setLocalPix({ ...localPix, institution: e.target.value })}
                            className="w-full bg-background border border-border rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Cupons de Desconto */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card p-8 rounded-3xl border border-border shadow-sm space-y-6 md:col-span-2"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500/10 p-3 rounded-xl">
                        <DollarSign className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black">Cupons de Desconto</h2>
                        <p className="text-muted-foreground text-sm">Gerencie códigos promocionais para campanhas.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={newCoupon}
                            onChange={(e) => setNewCoupon(e.target.value)}
                            placeholder="Ex: REVALIDA20"
                            className="flex-1 bg-background border border-border rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none font-black uppercase"
                        />
                        <button
                            onClick={() => {
                                if (newCoupon) {
                                    addCoupon(newCoupon)
                                    setNewCoupon('')
                                }
                            }}
                            className="bg-blue-500 text-white px-6 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-blue-600 transition-all"
                        >
                            Adicionar
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {coupons.map(coupon => (
                            <div key={coupon} className="group flex items-center gap-2 bg-muted px-4 py-2 rounded-xl text-sm font-black uppercase text-muted-foreground border border-transparent hover:border-destructive hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer" onClick={() => removeCoupon(coupon)}>
                                {coupon}
                                <XCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                        {coupons.length === 0 && <span className="text-sm text-muted-foreground italic">Nenhum cupom ativo.</span>}
                    </div>
                </div>
            </motion.div>

            <div className="md:col-span-2 flex justify-end">
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                    {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                    {saved ? 'Alterações Salvas!' : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    )
}

function SalesTab() {
    const { sales, approveSale, rejectSale } = useSales()
    const { updatePlan } = useAuth()
    const [filter, setFilter] = useState<'ALL' | SaleStatus>('ALL')

    const filteredSales = sales.filter(s => filter === 'ALL' || s.status === filter)

    const handleApprove = (id: string, userId: string, plan: any) => {
        if (confirm('Tem certeza que deseja aprovar esta venda e liberar o plano?')) {
            approveSale(id)
            // In a real app, you'd trigger a backend update here.
            // For now, we manually update the user status if the user is currently logged in, 
            // but since this is an admin panel likely viewed by Master, we can't update the Student User session directly here easily without a proper backend.
            // However, the requirement says "Manual Activation". We updated the status in sales store.
            // Ideally we would have a way to match userId to update their profile, but we only have local storage auth for the current user.
            // We will assume the "Sales Log" is the source of truth for "active subscriptions" in this mock.
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <FilterButton active={filter === 'ALL'} onClick={() => setFilter('ALL')} label="Todas" />
                <FilterButton active={filter === 'PENDING'} onClick={() => setFilter('PENDING')} label="Pendentes" count={sales.filter(s => s.status === 'PENDING').length} />
                <FilterButton active={filter === 'APPROVED'} onClick={() => setFilter('APPROVED')} label="Aprovadas" />
                <FilterButton active={filter === 'REJECTED'} onClick={() => setFilter('REJECTED')} label="Rejeitadas" />
            </div>

            <div className="bg-card rounded-3xl border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="p-6 text-xs font-black uppercase text-muted-foreground tracking-wider">Data</th>
                            <th className="p-6 text-xs font-black uppercase text-muted-foreground tracking-wider">Aluno</th>
                            <th className="p-6 text-xs font-black uppercase text-muted-foreground tracking-wider">Plano</th>
                            <th className="p-6 text-xs font-black uppercase text-muted-foreground tracking-wider">Valor</th>
                            <th className="p-6 text-xs font-black uppercase text-muted-foreground tracking-wider">Comprovante</th>
                            <th className="p-6 text-xs font-black uppercase text-muted-foreground tracking-wider">Status</th>
                            <th className="p-6 text-xs font-black uppercase text-muted-foreground tracking-wider text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredSales.map((sale) => (
                            <tr key={sale.id} className="hover:bg-muted/10 transition-colors">
                                <td className="p-6 text-sm font-medium text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {new Date(sale.date).toLocaleDateString('pt-BR')} <br />
                                        {new Date(sale.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="font-bold">{sale.userName}</div>
                                    <div className="text-xs text-muted-foreground">{sale.userEmail}</div>
                                </td>
                                <td className="p-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sale.plan === 'INSANO' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {sale.plan}
                                    </span>
                                </td>
                                <td className="p-6 font-mono text-sm">R$ {sale.amount.toFixed(2)}</td>
                                <td className="p-6">
                                    {sale.proofUrl ? (
                                        <a href={sale.proofUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline text-xs font-bold">
                                            <Upload className="w-4 h-4" />
                                            Ver Comprovante
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground text-xs italic">Sem comprovante</span>
                                    )}
                                </td>
                                <td className="p-6">
                                    <StatusBadge status={sale.status} />
                                </td>
                                <td className="p-6 text-right space-x-2">
                                    {sale.status === 'PENDING' && (
                                        <>
                                            <button
                                                onClick={() => rejectSale(sale.id)}
                                                className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-lg transition-colors"
                                                title="Rejeitar"
                                            >
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleApprove(sale.id, sale.userId, sale.plan)}
                                                className="p-2 hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-500 rounded-lg transition-colors"
                                                title="Aprovar e Ativar"
                                            >
                                                <CheckCircle className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {filteredSales.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-12 text-center text-muted-foreground">
                                    Nenhuma venda encontrada com este filtro.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function FilterButton({ active, onClick, label, count }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${active
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-background border-border text-muted-foreground hover:bg-muted'
                }`}
        >
            {label}
            {count !== undefined && <span className="ml-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">{count}</span>}
        </button>
    )
}

function StatusBadge({ status }: { status: SaleStatus }) {
    const styles = {
        PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        APPROVED: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        REJECTED: 'bg-red-100 text-red-800 border-red-200'
    }
    const labels = {
        PENDING: 'Pendente',
        APPROVED: 'Aprovado',
        REJECTED: 'Rejeitado'
    }
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status]}`}>
            {labels[status]}
        </span>
    )
}
