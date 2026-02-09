"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Phone, BookOpen, Calendar, Target, Crown, Zap, Shield, LogOut, CreditCard, MapPin } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useRankElite } from '@/store/use-rank-elite'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

interface UserProfileModalProps {
    isOpen: boolean
    onClose: () => void
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
    const { user, logout } = useAuth()
    const { profile } = useRankElite()
    const router = useRouter()
    const [showUpgradeModal, setShowUpgradeModal] = useState(false)

    if (!user) return null

    const handleLogout = () => {
        logout()
        onClose()
        router.push('/')
    }

    const getPlanIcon = () => {
        switch (user.plan_level) {
            case 'INSANO':
                return <Crown className="w-5 h-5" />
            case 'PREMIUM':
                return <Zap className="w-5 h-5" />
            default:
                return <User className="w-5 h-5" />
        }
    }

    const getPlanColor = () => {
        switch (user.plan_level) {
            case 'INSANO':
                return 'from-yellow-500 to-orange-500'
            case 'PREMIUM':
                return 'from-purple-500 to-pink-500'
            default:
                return 'from-gray-500 to-gray-600'
        }
    }

    const getPlanBadge = () => {
        switch (user.plan_level) {
            case 'INSANO':
                return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
            case 'PREMIUM':
                return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
            default:
                return 'bg-muted text-muted-foreground'
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg overflow-hidden bg-card rounded-[40px] soft-shadow border border-border"
                    >
                        {/* Header com Gradient */}
                        <div className={`bg-gradient-to-br ${getPlanColor()} p-8 text-white relative overflow-hidden`}>
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 ring-4 ring-white/30">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-1">
                                    {user.name}
                                </h2>
                                <p className="text-sm opacity-90 font-medium">{user.email}</p>

                                {/* Plan Badge */}
                                <div className="mt-4 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md flex items-center gap-2">
                                    {getPlanIcon()}
                                    <span className="font-black uppercase text-xs tracking-widest">
                                        {user.plan_level}
                                    </span>
                                </div>

                                {/* Master Badge */}
                                {user.role === 'MASTER' && (
                                    <div className="mt-3 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        <span className="font-black uppercase text-[10px] tracking-[0.15em]">
                                            Super Admin
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            {/* Informações Pessoais */}
                            <div className="space-y-3">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                    Informações Pessoais
                                </h3>

                                {user.phone && (
                                    <InfoRow icon={<Phone className="w-4 h-4" />} label="WhatsApp" value={user.phone} />
                                )}

                                {user.institution && (
                                    <InfoRow icon={<BookOpen className="w-4 h-4" />} label="Instituição" value={user.institution} />
                                )}

                                {user.graduation_year && (
                                    <InfoRow icon={<Calendar className="w-4 h-4" />} label="Ano de Formação" value={user.graduation_year} />
                                )}

                                {user.specialty_of_interest && (
                                    <InfoRow icon={<Target className="w-4 h-4" />} label="Especialidade" value={user.specialty_of_interest} />
                                )}

                                {user.address && (
                                    <InfoRow icon={<MapPin className="w-4 h-4" />} label="Endereço" value={user.address} />
                                )}

                                {profile && (
                                    <div className="mt-2 bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-2xl flex items-center justify-between border border-primary/10">
                                        <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                            <Target className="w-4 h-4" />
                                            Total Respondidas
                                        </span>
                                        <span className="text-2xl font-black text-[#1A1033]">{profile.total_questions_answered || 0}</span>
                                    </div>
                                )}
                            </div>

                            {/* Plano e Benefícios */}
                            <div className="space-y-3">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                    Plano e Benefícios
                                </h3>

                                <div className="bg-muted rounded-2xl p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold">Plano Atual</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${getPlanBadge()}`}>
                                            {user.plan_level}
                                        </span>
                                    </div>

                                    {user.plan_level === 'FREE' && (
                                        <div className="pt-2 border-t border-border">
                                            <p className="text-xs text-muted-foreground mb-3">
                                                Faça upgrade para ter acesso ilimitado a todas as questões!
                                            </p>
                                            <button
                                                onClick={() => setShowUpgradeModal(true)}
                                                className="w-full royal-gradient text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                            >
                                                <CreditCard className="w-4 h-4" />
                                                Fazer Upgrade
                                            </button>
                                        </div>
                                    )}

                                    {(user.plan_level === 'PREMIUM' || user.plan_level === 'INSANO') && (
                                        <div className="pt-2 border-t border-border">
                                            <ul className="space-y-1.5 text-xs">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    <span>Questões ilimitadas</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    <span>Estatísticas avançadas</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    <span>Prioridade no suporte</span>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full bg-destructive/10 text-destructive py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-destructive hover:text-white transition-all flex items-center justify-center gap-3"
                            >
                                <LogOut className="w-5 h-5" />
                                Sair da Conta
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3 bg-muted rounded-xl p-3">
            <div className="text-primary">{icon}</div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {label}
                </p>
                <p className="text-sm font-bold truncate">{value}</p>
            </div>
        </div>
    )
}
