"use client"

import { useAuth } from '@/store/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BottomTabs } from '@/components/bottom-tabs'
import { UserProfileModal } from '@/components/user-profile-modal'
import { SupportChatWidget } from '@/components/support-chat-widget'
import { Hexagon, LogOut, Moon, Sun, Shield, User, ArrowLeft } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, logout } = useAuth()
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    const [showProfileModal, setShowProfileModal] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/')
        } else if (user && user.role !== 'MASTER' && !user.profile_completed) {
            router.push('/onboarding')
        }
    }, [isAuthenticated, user, router])

    if (!isAuthenticated) return null

    return (
        <div className="min-h-screen bg-background pb-32 md:pb-0">
            {/* Minimal Top Navigation */}
            <header className="fixed top-0 z-40 w-full bg-background/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-3 group transition-all">
                        <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <Hexagon className="w-5 h-5 text-white fill-white/20" />
                        </div>
                        <span className="text-2xl font-black italic uppercase tracking-tighter">QRub</span>
                    </Link>

                    <div className="flex items-center gap-3">


                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-3 rounded-2xl bg-muted/50 text-muted-foreground hover:text-primary transition-all hover:bg-primary/5"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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

            {/* Content Area with Top Padding for Fixed Header */}
            <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 md:pb-24">
                {children}
            </main>

            <BottomTabs />

            <UserProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
            />
            <SupportChatWidget />
        </div>
    )
}
