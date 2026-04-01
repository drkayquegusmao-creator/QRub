"use client"

import { useAuth } from '@/store/use-auth'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Shield, LayoutDashboard, Database, Settings, LogOut, Hexagon, DollarSign, ArrowLeft, MessageSquare, ClipboardCheck, Package, Users, BarChart3, Building2, ArrowLeftRight, CheckCircle2, ShieldAlert, Zap, FileText, Layers, Stethoscope, Activity, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function SaudeAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        </div>}>
            <SaudeAdminLayoutContent>{children}</SaudeAdminLayoutContent>
        </Suspense>
    )
}

function SaudeAdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, refreshUserProfile } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isHydrated, setIsHydrated] = useState(false)

    // Master verification
    const isMaster = user?.role === 'MASTER' || (user?.email && require('@/lib/auth-constants').isMasterEmail(user.email))

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (isHydrated) {
            if (!isAuthenticated || !isMaster) {
                router.push('/')
            } else if (user?.email && require('@/lib/auth-constants').isMasterEmail(user.email) && user.role !== 'MASTER') {
                refreshUserProfile()
            }
        }
    }, [isHydrated, isAuthenticated, user, isMaster, router, refreshUserProfile])

    if (!isHydrated) return null
    if (!isAuthenticated || !isMaster) return null

    const isActive = (tabValue: string) => {
        const currentTab = searchParams.get('tab') || 'overview'
        return currentTab === tabValue
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
            {/* Sidebar */}
            <aside className="w-full md:w-72 bg-white border-r border-slate-100 md:min-h-screen p-8 flex flex-col gap-10 shadow-sm z-20">
                <div className="flex items-center gap-4">
                    <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-600/20">
                        <Hexagon className="w-7 h-7 text-white fill-white/20" />
                    </div>
                    <div>
                        <span className="text-2xl font-black uppercase italic tracking-tighter block leading-none text-slate-900">QRub Master</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Saúde</span>
                    </div>
                </div>

                {isMaster && (
                    <div className="flex flex-col gap-3 p-3 bg-emerald-50/50 rounded-3xl border border-emerald-100/50">
                        <Link href="/concursos/admin">
                            <button
                                className="flex items-center justify-between w-full px-5 py-4 bg-white hover:bg-emerald-600 text-emerald-600 rounded-[20px] transition-all shadow-sm border border-slate-100 group/switch"
                            >
                                <div className="flex items-center gap-3">
                                    <ArrowLeftRight className="w-4 h-4 group-hover/switch:rotate-180 transition-transform duration-500" />
                                    <span className="text-xs font-black uppercase tracking-widest text-[#1A1033] group-hover/switch:text-white transition-colors">Concursos</span>
                                </div>
                                <span className="w-2 h-2 bg-slate-300 rounded-full" />
                            </button>
                        </Link>
                    </div>
                )}
                <nav className="flex-1 flex flex-col gap-1.5 overflow-y-auto no-scrollbar">
                    <AdminNavLink href="/dashboard/admin?tab=overview" icon={BarChart3} label="Estatísticas" active={isActive('overview')} />
                    <AdminNavLink href="/dashboard/admin?tab=validation" icon={Database} label="Banco de Questões" active={isActive('validation')} />
                    <AdminNavLink href="/dashboard/admin?tab=students" icon={Users} label="Gestão de Alunos" active={isActive('students')} />
                    
                    <div className="h-px bg-slate-100 my-4 mx-4" />
                    <p className="text-[9px] font-black uppercase text-slate-300 tracking-[0.3em] px-4 mb-2">Engenharia Master</p>
                    
                    <AdminNavLink href="/dashboard/admin?tab=generator" icon={Zap} label="Auto Gerador" active={isActive('generator')} />
                    <AdminNavLink href="/dashboard/admin?tab=taxonomy" icon={Shield} label="Matriz de Conhecimento" active={isActive('taxonomy')} />
                    <AdminNavLink href="/dashboard/admin?tab=editais" icon={ClipboardCheck} label="Mural de Editais" active={isActive('editais')} />
                    <AdminNavLink href="/dashboard/admin?tab=packages" icon={Package} label="Pacotes & Deploy" active={isActive('packages')} />
                    <AdminNavLink href="/dashboard/admin?tab=banks" icon={Building2} label="Bancas & Perfis" active={isActive('banks')} />
                    
                    <div className="h-px bg-slate-100 my-4 mx-4" />
                    
                    <AdminNavLink href="/dashboard/admin?tab=prompts" icon={Zap} label="Gerador de Prompts" active={isActive('prompts')} />
                    <AdminNavLink href="/dashboard/admin?tab=settings" icon={Settings} label="Ajustes do Sistema" active={isActive('settings')} />
                </nav>

                <Link href="/dashboard">
                    <button className="flex items-center gap-3 w-full p-5 rounded-2xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all font-black text-xs uppercase tracking-widest mt-auto">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao QRub
                    </button>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-14 overflow-y-auto relative no-scrollbar">
                {/* Global Alert Overlay */}
                <EnvironmentAlert />

                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-14">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black mb-3 text-[#1A1033] italic uppercase tracking-tighter">Painel de Controle Admin</h1>
                            <p className="text-slate-400 flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                                <Shield className="w-5 h-5 text-emerald-500" />
                                Master: {user?.name} | Ambiente Saúde
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <button className="flex items-center gap-3 bg-white border border-slate-100 text-slate-400 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:text-rose-500 transition-all shadow-sm">
                                    <LogOut className="w-4 h-4" />
                                    Sair Total
                                </button>
                            </Link>
                        </div>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    )
}

function AdminNavLink({ href, icon: Icon, label, active }: { href: string, icon: any, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-4 p-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all group",
                active 
                    ? "bg-emerald-600 text-white shadow-2xl shadow-emerald-600/20 translate-x-2" 
                    : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
            )}
        >
            <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", active ? "text-white" : "group-hover:text-emerald-600")} />
            {label}
        </Link>
    )
}

function EnvironmentAlert() {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 60000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                    className="mb-10"
                >
                    <div className="bg-emerald-600 rounded-[32px] p-8 text-white flex items-center justify-between shadow-2xl shadow-emerald-600/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <div className="flex items-center gap-8 relative z-10">
                            <div className="w-14 h-14 bg-white/10 rounded-[20px] flex items-center justify-center backdrop-blur-md border border-white/20">
                                <Shield className="w-7 h-7" />
                            </div>
                            <div>
                                <h4 className="text-lg font-black italic uppercase tracking-[0.1em]">Ambiente Saúde Ativo</h4>
                                <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest mt-1 opacity-80">
                                    Base de dados isolada (saude_*) | Admin Master Protocol v2.5
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setVisible(false)}
                            className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/10 relative z-10"
                        >
                            <LogOut className="w-5 h-5 rotate-90" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
