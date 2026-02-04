"use client"

import { useAuth } from '@/store/use-auth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BottomTabs } from '@/components/bottom-tabs'
import { UserProfileModal } from '@/components/user-profile-modal'
import { SupportChatWidget } from '@/components/support-chat-widget'
import { Hexagon, LogOut, Moon, Sun, Shield, User, Share2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // Pequeno delay para garantir que o Zustand carregou o localStorage
        const timer = setTimeout(() => setIsLoaded(true), 100)
        return () => clearTimeout(timer)
    }, [])

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

    const isQuizPage = pathname?.includes('/dashboard/quiz')
    const isErrorPage = pathname?.includes('/dashboard/errors')
    const hideNav = isQuizPage || isErrorPage

    return (
        <div className={cn(
            "min-h-screen bg-background transition-all",
            hideNav ? "pb-0" : "pb-32 md:pb-0"
        )}>
            {/* Minimal Top Navigation */}
            {!hideNav && (
                <header className="fixed top-0 z-40 w-full bg-background/50 backdrop-blur-xl border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="flex items-center gap-3 group transition-all">
                                <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                    <Hexagon className="w-5 h-5 text-white fill-white/20" />
                                </div>
                                <span className="text-2xl font-black italic uppercase tracking-tighter">QRub</span>
                            </Link>

                            <button
                                onClick={async () => {
                                    const shareData = {
                                        title: 'QRub | Plataforma de Questões de Alta Performance',
                                        text: '🚀 QRub: Sua Aprovação Começa Aqui!\n\nA plataforma definitiva para residência médica e concursos.\n\n✅ Questões comentadas por especialistas\n✅ Agenda inteligente (estude o que importa)\n✅ Métricas detalhadas de performance\n\nAcesse agora:',
                                        url: 'https://qrub.com.br'
                                    };

                                    if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                                        try {
                                            await navigator.share(shareData);
                                        } catch (err) {
                                            // Fallback if user cancels or error
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

                            {/* Mobile Logout (Visible on small screens) */}
                            <button
                                onClick={() => { logout(); router.push('/') }}
                                className="md:hidden p-3 rounded-2xl bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all flex items-center justify-center"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>

                            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-white/10">
                                {user?.role === 'MASTER' && (
                                    <Link href="/admin">
                                        <button className="flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-primary/20 transition-all border border-primary/20">
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
                hideNav ? "pt-6" : "pt-24"
            )}>
                {children}
            </main>

            <BottomTabs />

            <UserProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
            />
            {pathname === '/dashboard' && <SupportChatWidget />}
        </div>
    )
}
