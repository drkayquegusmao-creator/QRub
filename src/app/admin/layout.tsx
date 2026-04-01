"use client"

import { useAuth } from '@/store/use-auth'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Shield, LayoutDashboard, Database, Settings, LogOut, Hexagon, DollarSign, ArrowLeft, MessageSquare, ClipboardCheck, Package, Users, BarChart3, Building2, ArrowLeftRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>}>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </Suspense>
    )
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, refreshUserProfile } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isHydrated, setIsHydrated] = useState(false)

    // Master verification similar to dashboard/page.tsx
    const isMaster = user?.role === 'MASTER' || (user?.email && require('@/lib/auth-constants').isMasterEmail(user.email))

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (isHydrated) {
            if (!isAuthenticated || !isMaster) {
                router.push('/')
            } else if (user?.email && require('@/lib/auth-constants').isMasterEmail(user.email) && user.role !== 'MASTER') {
                // If it's a master email but role is not master, force refresh
                refreshUserProfile()
            }
        }
    }, [isHydrated, isAuthenticated, user, isMaster, router, refreshUserProfile])

    if (!isHydrated) return null
    if (!isAuthenticated || !isMaster) return null

    // Determine if a link is active. 
    // Exact match for root '/admin', partial match for sub-routes
    const isActive = (path: string) => {
        if (path === '/admin') return pathname === '/admin'
        return pathname?.startsWith(path)
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-slate-100 md:min-h-screen p-6 flex flex-col gap-8 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                        <Hexagon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-black uppercase italic tracking-tighter block leading-none">QRub Master</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Saúde</span>
                    </div>
                </div>

                {isMaster && (
                    <div className="flex flex-col gap-2 p-2 bg-primary/5 rounded-2xl border border-primary/10">
                        <Link href="/concursos/admin">
                            <button
                                className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-indigo-600 hover:text-white text-indigo-600 rounded-xl transition-all shadow-sm border border-indigo-100 group/switch"
                            >
                                <div className="flex items-center gap-2">
                                    <ArrowLeftRight className="w-3.5 h-3.5 group-hover/switch:rotate-180 transition-transform duration-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Concursos</span>
                                </div>
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                            </button>
                        </Link>
                    </div>
                )}

                <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
                    <AdminNavLink href="/admin?tab=analytics" icon={BarChart3} label="Estatísticas" active={isActive('/admin') && (!searchParams.get('tab') || searchParams.get('tab') === 'analytics')} />
                    <AdminNavLink href="/admin?tab=questions" icon={Database} label="Banco de Dados" active={isActive('/admin') && searchParams.get('tab') === 'questions'} />
                    <AdminNavLink href="/admin?tab=users" icon={Users} label="Gestão de Alunos" active={isActive('/admin') && searchParams.get('tab') === 'users'} />
                    <AdminNavLink href="/admin/database" icon={Shield} label="Matriz de Conhecimento" active={isActive('/admin/database')} />

                    <div className="h-px bg-slate-100 my-2 mx-4" />

                    <AdminNavLink href="/admin/editais" icon={ClipboardCheck} label="Editais" active={isActive('/admin/editais')} />
                    <AdminNavLink href="/admin/pacotes" icon={Package} label="Pacotes & Deploy" active={isActive('/admin/pacotes')} />
                    <AdminNavLink href="/admin/bancas" icon={Building2} label="Bancas & Perfis" active={isActive('/admin/bancas')} />

                    <div className="h-px bg-slate-100 my-2 mx-4" />

                    <AdminNavLink href="/admin/support" icon={MessageSquare} label="Suporte ao Aluno" active={isActive('/admin/support')} />
                    <AdminNavLink href="/admin/finance" icon={DollarSign} label="Faturamento e Planos" active={isActive('/admin/finance')} />
                    <AdminNavLink href="/admin/settings" icon={Settings} label="Configurações do Sistema" active={isActive('/admin/settings')} />
                </nav>

                <Link href="/dashboard">
                    <button className="flex items-center gap-2 w-full p-4 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all font-bold text-xs uppercase tracking-widest mt-auto">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao QRub
                    </button>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto relative bg-slate-50">
                <EnvironmentAlert />

                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black mb-2 text-[#1A1033] italic uppercase tracking-tighter leadning-none">Painel de Controle</h1>
                            <p className="text-slate-400 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                                <Shield className="w-4 h-4 text-primary" />
                                Master: {user?.name} | Ambiente Saúde
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <button className="flex items-center gap-2 bg-white border border-slate-100 text-slate-400 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:text-rose-500 transition-all shadow-sm">
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
            className={`flex items-center gap-3 p-4 rounded-xl font-bold text-sm transition-all group ${active
                ? 'bg-primary text-white shadow-xl shadow-primary/20'
                : 'text-slate-400 hover:bg-primary/10 hover:text-primary'
                }`}
        >
            <Icon className={`w-5 h-5 transition-colors ${active ? 'text-white' : 'group-hover:text-primary'}`} />
            {label}
        </Link>
    )
}

function EnvironmentAlert() {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 60000) // 60 seconds
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                    className="mb-8"
                >
                    <div className="bg-primary rounded-3xl p-6 text-white flex items-center justify-between shadow-2xl shadow-primary/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black italic uppercase tracking-widest">Ambiente Saúde Ativo</h4>
                                <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mt-0.5 opacity-80">
                                    Base de dados principal | Admin Master Protocol v2.5
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setVisible(false)}
                            className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all border border-white/10 relative z-10"
                        >
                            <LogOut className="w-4 h-4 rotate-90" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

