"use client"

import { useAuth } from '@/store/use-auth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BottomTabs } from '@/components/bottom-tabs'
import { UserProfileModal } from '@/components/user-profile-modal'
import { SettingsModal } from '@/components/settings-modal'
import { SupportChatWidget } from '@/components/support-chat-widget'
import { Hexagon, LogOut, Moon, Sun, Shield, User, Share2, Settings, ArrowLeftRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { usePreferences } from '@/store/use-preferences'
import { isMasterEmail } from '@/lib/auth-constants'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    // ... rest of the code
    const { theme, setTheme } = useTheme()
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const { loadPreferences } = usePreferences()

    useEffect(() => {
        // Pequeno delay para garantir que o Zustand carregou o localStorage
        const timer = setTimeout(() => {
            setIsLoaded(true)
            if (user?.id) {
                loadPreferences(user.id)
            }
        }, 100)
        return () => clearTimeout(timer)
    }, [user?.id])

    useEffect(() => {
        if (isLoaded) {
            if (!isAuthenticated) {
                router.push('/')
                return
            }

            // Se for Master, nunca redireciona pro onboarding
            if (user?.role === 'MASTER') return

            if (user && !user.profile_completed) {
                router.push('/onboarding')
            }
        }
    }, [isLoaded, isAuthenticated, user, router])

    if (!isLoaded || !isAuthenticated) {
        return <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    }

    const isConcursos = pathname?.startsWith('/concursos')
    const homePath = isConcursos ? '/concursos' : '/dashboard'
    const adminPath = isConcursos ? '/concursos/admin' : '/admin'

    const isQuizPage = pathname?.includes('/dashboard/quiz') || pathname?.includes('/concursos/quiz')
    const isErrorPage = pathname?.includes('/dashboard/errors') || pathname?.includes('/concursos/errors')
    const hideNav = isQuizPage || isErrorPage

    return (
        <div className={cn(
            "min-h-screen bg-background transition-all",
            hideNav ? "pb-0" : "pb-32 md:pb-0"
        )}>
            {/* Minimal Top Navigation */}
            {!hideNav && (
                <header className="fixed top-0 z-40 w-full bg-background/50 backdrop-blur-xl border-b border-white/5 [[data-banner-active=true]_&]:translate-y-10 transition-transform duration-200">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href={homePath} className="flex items-center gap-3 group transition-all">
                                <div className={cn(
                                    "p-2 rounded-xl shadow-lg transition-transform group-hover:scale-110",
                                    isConcursos ? "bg-indigo-500 shadow-indigo-500/20" : "bg-primary shadow-primary/20"
                                )}>
                                    <Hexagon className="w-5 h-5 text-white fill-white/20" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-2xl font-black italic uppercase tracking-tighter">QRub</span>
                                    {isConcursos && <span className="text-[8px] font-black uppercase tracking-[0.2em] text-indigo-500">Concursos</span>}
                                </div>
                            </Link>

                            {isMasterEmail(user?.email) && (
                                <Link href={isConcursos ? '/dashboard' : '/concursos'}>
                                    <button
                                        className={cn(
                                            "hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest border shadow-sm group/switch",
                                            isConcursos 
                                                ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white shadow-primary/10" 
                                                : "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 hover:bg-indigo-500 hover:text-white shadow-indigo-500/10"
                                        )}
                                        title={isConcursos ? "Mudar para Saúde" : "Mudar para Concursos"}
                                    >
                                        <ArrowLeftRight className="w-3.5 h-3.5 group-hover/switch:rotate-180 transition-transform duration-500" />
                                        <span className="hidden lg:inline">{isConcursos ? "Saúde" : "Concursos"}</span>
                                    </button>
                                </Link>
                            )}

                            <button
                                onClick={async () => {
                                    const shareData = {
                                        title: 'QRub | Plataforma de Questões de Alta Performance',
                                        text: `🚀 QRub${isConcursos ? ' Concursos' : ''}: Sua Aprovação Começa Aqui!\n\nA plataforma definitiva para ${isConcursos ? 'concursos públicos' : 'residência médica'}.\n\n✅ Questões comentadas por especialistas\n✅ Agenda inteligente\n✅ Métricas detalhadas\n\nAcesse agora:`,
                                        url: 'https://qrub.com.br'
                                    };

                                    if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                                        try {
                                            await navigator.share(shareData);
                                        } catch (err) {
                                            const waText = encodeURIComponent(`${shareData.text} ${shareData.url}`);
                                            window.open(`https://wa.me/?text=${waText}`, '_blank');
                                        }
                                    } else {
                                        const waText = encodeURIComponent(`${shareData.text} ${shareData.url}`);
                                        window.open(`https://wa.me/?text=${waText}`, '_blank');
                                    }
                                }}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-sm group/share"
                                title="Compartilhar QRub"
                            >
                                <Share2 className="w-3.5 h-3.5" />
                                <span className="hidden lg:inline">Compartilhar</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3">


                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-3 rounded-2xl bg-muted/50 text-muted-foreground hover:text-primary transition-all hover:bg-primary/5"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <button
                                onClick={() => setShowSettingsModal(true)}
                                className="p-3 rounded-2xl bg-muted/50 text-muted-foreground hover:text-primary transition-all hover:bg-primary/5"
                            >
                                <Settings className="w-5 h-5" />
                            </button>

                            {/* Mobile Logout (Visible on small screens) */}
                            <button
                                onClick={() => { logout(); router.push('/') }}
                                className="md:hidden p-3 rounded-2xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all flex items-center justify-center"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>

                            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-white/10">
                                {user?.role === 'MASTER' && (
                                    <Link href={adminPath}>
                                        <button className={cn(
                                            "flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all border",
                                            isConcursos 
                                                ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20 hover:bg-indigo-500/20"
                                                : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                                        )}>
                                            <Shield className="w-4 h-4" />
                                            Painel Admin
                                        </button>
                                    </Link>
                                )}

                                <button
                                    onClick={() => setShowProfileModal(true)}
                                    className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-2xl bg-muted/30 border border-white/5 hover:bg-muted/50 transition-all"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="text-left leading-none">
                                        <p className="text-xs font-black uppercase tracking-tight">{user?.name?.split(' ')[0]}</p>
                                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{user?.plan_level}</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => { logout(); router.push('/') }}
                                    className="p-3 rounded-2xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            )}

            {/* Content Area with Top Padding for Fixed Header */}
            <main className={cn(
                "max-w-7xl mx-auto px-6 pb-12 md:pb-24 transition-all",
                hideNav
                    ? "pt-6 [[data-banner-active=true]_&]:pt-16"
                    : "pt-24 [[data-banner-active=true]_&]:pt-[136px]"
            )}>
                {children}
            </main>

            <BottomTabs />

            <UserProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
            />
            <SettingsModal
                isOpen={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
            />
            {pathname === '/dashboard' && <SupportChatWidget />}
        </div>
    )
}
