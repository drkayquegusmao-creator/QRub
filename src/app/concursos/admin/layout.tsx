"use client"

import { useAuth } from '@/store/use-auth'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Shield, LayoutDashboard, Database, Settings, LogOut, Hexagon, DollarSign, ArrowLeft, MessageSquare, ClipboardCheck, Package, Users, BarChart3, Building2, ArrowLeftRight } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function ConcursoAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>}>
            <ConcursoAdminLayoutContent>{children}</ConcursoAdminLayoutContent>
        </Suspense>
    )
}

function ConcursoAdminLayoutContent({ children }: { children: React.ReactNode }) {
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

    const isActive = (path: string) => {
        if (path === '/concursos/admin') return pathname === '/concursos/admin'
        return pathname?.startsWith(path)
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-slate-100 md:min-h-screen p-6 flex flex-col gap-8 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
                        <Hexagon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="text-xl font-black uppercase italic tracking-tighter block leading-none">QRub Master</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-500">Concursos</span>
                    </div>
                </div>

                {isMaster && (
                    <div className="flex flex-col gap-2 p-2 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                        <Link href="/admin">
                            <button
                                className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-primary hover:text-white text-primary rounded-xl transition-all shadow-sm border border-slate-100 group/switch"
                            >
                                <div className="flex items-center gap-2">
                                    <ArrowLeftRight className="w-3.5 h-3.5 group-hover/switch:rotate-180 transition-transform duration-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1033] group-hover/switch:text-white transition-colors">Saúde</span>
                                </div>
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                            </button>
                        </Link>
                    </div>
                )}

                <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
                    <AdminNavLink href="/concursos/admin?tab=analytics" icon={BarChart3} label="Estatísticas" active={isActive('/concursos/admin') && (!searchParams.get('tab') || searchParams.get('tab') === 'analytics')} />
                    <AdminNavLink href="/concursos/admin?tab=questions" icon={Database} label="Banco de Questões" active={isActive('/concursos/admin') && searchParams.get('tab') === 'questions'} />
                    <AdminNavLink href="/concursos/admin?tab=users" icon={Users} label="Gestão de Alunos" active={isActive('/concursos/admin') && searchParams.get('tab') === 'users'} />
                    <AdminNavLink href="/concursos/admin/database" icon={Shield} label="Matriz de Conhecimento" active={isActive('/concursos/admin/database')} />

                    <div className="h-px bg-slate-100 my-2 mx-4" />

                    <AdminNavLink href="/concursos/admin/editais" icon={ClipboardCheck} label="Mural de Editais" active={isActive('/concursos/admin/editais')} />
                    <AdminNavLink href="/concursos/admin/pacotes" icon={Package} label="Pacotes & Deploy" active={isActive('/concursos/admin/pacotes')} />
                    <AdminNavLink href="/concursos/admin/bancas" icon={Building2} label="Bancas & Perfis" active={isActive('/concursos/admin/bancas')} />

                    <div className="h-px bg-slate-100 my-2 mx-4" />

                    <AdminNavLink href="/concursos/admin/support" icon={MessageSquare} label="Suporte ao Aluno" active={isActive('/concursos/admin/support')} />
                    <AdminNavLink href="/concursos/admin/finance" icon={DollarSign} label="Planos & Vendas" active={isActive('/concursos/admin/finance')} />
                    <AdminNavLink href="/concursos/admin/settings" icon={Settings} label="Ajustes do Sistema" active={isActive('/concursos/admin/settings')} />
                </nav>

                <Link href="/concursos">
                    <button className="flex items-center gap-2 w-full p-4 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all font-bold text-xs uppercase tracking-widest mt-auto">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar ao QRub
                    </button>
                </Link>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto relative">
                {/* 60s Global Alert Overlay */}
                <EnvironmentAlert />

                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-3xl font-black mb-2 text-[#1A1033] italic uppercase tracking-tighter">Painel de Controle Admin</h1>
                            <p className="text-slate-400 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                                <Shield className="w-4 h-4 text-indigo-500" />
                                Master: {user?.name} | Ambiente Concursos
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
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20'
                : 'text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
        >
            <Icon className={`w-5 h-5 transition-colors ${active ? 'text-white' : 'group-hover:text-indigo-600'}`} />
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
                    <div className="bg-indigo-600 rounded-3xl p-6 text-white flex items-center justify-between shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black italic uppercase tracking-widest">Ambiente Concursos Ativo</h4>
                                <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest mt-0.5 opacity-80">
                                    Base de dados isolada (concurso_*) | Admin Master Protocol v2.5
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
