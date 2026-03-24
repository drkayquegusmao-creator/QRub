"use client"

import { useAuth } from '@/store/use-auth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BottomTabs } from '@/components/bottom-tabs'
import { UserProfileModal } from '@/components/user-profile-modal'
import { SettingsModal } from '@/components/settings-modal'
import { ConcursoSidebar } from '@/components/concursos/sidebar'
import { Menu, X, Bell, Search, User as UserIcon, Settings as SettingsIcon, LogOut, Hexagon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePreferences } from '@/store/use-preferences'
import { motion, AnimatePresence } from 'framer-motion'

export default function ConcursoLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    
    const [isLoaded, setIsLoaded] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const { loadPreferences } = usePreferences()

    useEffect(() => {
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
                router.push('/auth')
                return
            }
        }
    }, [isLoaded, isAuthenticated, router])

    // Close mobile menu on path change
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [pathname])

    if (!isLoaded || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#1A1033] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    const isQuizPage = pathname?.includes('/concursos/quiz') || pathname?.includes('/concursos/treino')
    const hideNav = isQuizPage

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30">
            {/* Desktop Sidebar */}
            {!hideNav && <ConcursoSidebar />}

            {/* Mobile Header */}
            {!hideNav && (
                <header className="md:hidden fixed top-0 z-[60] w-full bg-white dark:bg-[#1A1033] border-b border-slate-200 dark:border-white/5 px-4 h-16 flex items-center justify-between">
                    <Link href="/concursos" className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-indigo-500 shadow-md shadow-indigo-500/10">
                            <Hexagon className="w-4 h-4 text-white fill-white/20" />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-lg font-black italic uppercase tracking-tighter dark:text-white text-[#1A1033]">QRub</span>
                            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-indigo-500">Concursos</span>
                        </div>
                    </Link>

                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white/60"
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </header>
            )}

            {/* Main Content Area */}
            <main className={cn(
                "transition-all duration-500 ease-in-out pb-24 md:pb-12 min-h-screen",
                !hideNav && "md:pl-64", // Space for desktop sidebar
                !hideNav && "pt-20 md:pt-8", // Space for mobile header or top padding
                hideNav && "pt-0"
            )}>
                <div className="max-w-7xl mx-auto px-4 md:px-10">
                    {children}
                </div>
            </main>

            {/* Mobile Sidebar Overlay / Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] md:hidden"
                        />
                        <motion.div 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 h-full w-[80%] max-w-sm bg-[#1A1033] z-[80] md:hidden shadow-2xl overflow-y-auto no-scrollbar"
                        >
                            <div className="p-8">
                                <Link href="/concursos" className="flex items-center gap-3 mb-12">
                                    <div className="p-2.5 rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-500/20">
                                        <Hexagon className="w-6 h-6 text-white fill-white/20" />
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-2xl font-black italic uppercase tracking-tighter text-white">QRub</span>
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400">Concursos</span>
                                    </div>
                                </Link>

                                <div className="space-y-8">
                                    {/* Mobile Nav Groups - Simplified version or same as sidebar */}
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[.3em]">Menu Principal</p>
                                    <nav className="space-y-4">
                                        {[
                                            { name: 'Home', icon: Home, href: '/concursos' },
                                            { name: 'Plano de Estudo', icon: CheckSquare, href: '/concursos/plano' },
                                            { name: 'Questões', icon: FileText, href: '/concursos/setup' },
                                            { name: 'Simulados', icon: Layers, href: '/concursos/simulados' },
                                            { name: 'Métricas', icon: BarChart3, href: '/concursos/estatisticas' },
                                        ].map((item) => (
                                            <Link 
                                                key={item.name} 
                                                href={item.href}
                                                className="flex items-center gap-4 text-white/60 hover:text-white py-2"
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                                            </Link>
                                        ))}
                                    </nav>
                                    
                                    <div className="pt-8 border-t border-white/5 space-y-6">
                                        <button 
                                            onClick={() => { setShowProfileModal(true); setMobileMenuOpen(false); }}
                                            className="flex items-center gap-4 text-white/60"
                                        >
                                            <UserIcon className="w-5 h-5" />
                                            <span className="text-xs font-black uppercase tracking-widest">Meu Perfil</span>
                                        </button>
                                        <button 
                                            onClick={() => { logout(); router.push('/auth'); }}
                                            className="flex items-center gap-4 text-red-400"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span className="text-xs font-black uppercase tracking-widest">Sair da Conta</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Reuse Bottom Tabs */}
            <BottomTabs />

            {/* Modals */}
            <UserProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
            />
            <SettingsModal
                isOpen={showSettingsModal}
                onClose={() => setShowSettingsModal(false)}
            />
        </div>
    )
}

function Home(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function FileText(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14.5 2 14.5 7.5 20 7.5"/></svg> }
function Layers(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> }
function CheckSquare(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> }
function BarChart3(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg> }
