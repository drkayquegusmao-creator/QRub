"use client"

import { useAuth } from '@/store/use-auth'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Shield, LayoutDashboard, Database, Settings, LogOut, Hexagon, DollarSign, ArrowLeft, MessageSquare, ClipboardCheck, Package, Users, BarChart3, Building2, ArrowLeftRight } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
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
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-card border-r border-border md:min-h-screen p-6 flex flex-col gap-8">
                <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-xl">
                        <Hexagon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-black uppercase italic tracking-tighter">QRub Master</span>
                </div>

                {isMaster && (
                    <div className="flex flex-col gap-2 p-2 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
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
                    <AdminNavLink href="/admin?tab=analytics" icon={BarChart3} label="Dashboard" active={isActive('/admin') && (!searchParams.get('tab') || searchParams.get('tab') === 'analytics')} />
                    <AdminNavLink href="/admin?tab=questions" icon={Database} label="Banco de Dados" active={isActive('/admin') && searchParams.get('tab') === 'questions'} />
                    <AdminNavLink href="/admin?tab=users" icon={Users} label="Gestão de Alunos" active={isActive('/admin') && searchParams.get('tab') === 'users'} />

                    <div className="h-px bg-border my-2 mx-4 opacity-50" />

                    <AdminNavLink href="/admin/editais" icon={ClipboardCheck} label="Editais" active={isActive('/admin/editais')} />
                    <AdminNavLink href="/admin/pacotes" icon={Package} label="Pacotes & Deploy" active={isActive('/admin/pacotes')} />
                    <AdminNavLink href="/admin/bancas" icon={Building2} label="Bancas & Perfis" active={isActive('/admin/bancas')} />

                    <div className="h-px bg-border my-2 mx-4 opacity-50" />

                    <AdminNavLink href="/admin/support" icon={MessageSquare} label="Suporte ao Aluno" active={isActive('/admin/support')} />
                    <AdminNavLink href="/admin/finance" icon={DollarSign} label="Faturamento e Planos" active={isActive('/admin/finance')} />
                    <AdminNavLink href="/admin/settings" icon={Settings} label="Configurações do Sistema" active={isActive('/admin/settings')} />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-white text-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-3xl font-black mb-2 text-[#1A1033]">Painel de Controle</h1>
                            <p className="text-muted-foreground flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                <Shield className="w-4 h-4 text-primary" />
                                Acesso Master: {user?.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-100">
                                Sistema Online
                            </div>

                            <Link href="/dashboard">
                                <button className="flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-200">
                                    <LogOut className="w-4 h-4" />
                                    Sair do Painel
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
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
        >
            <Icon className={`w-5 h-5 transition-colors ${active ? 'text-white' : 'group-hover:text-primary'}`} />
            {label}
        </Link>
    )
}
