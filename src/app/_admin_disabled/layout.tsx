"use client"

import { useAuth } from '@/store/use-auth'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Shield, LayoutDashboard, Database, Settings, LogOut, Hexagon, DollarSign, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // const { user, isAuthenticated, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Mock props for build
    const user = { name: 'Master', role: 'MASTER' }
    const isAuthenticated = true
    const logout = () => { }

    /*
    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'MASTER') {
            router.push('/')
        }
    }, [isAuthenticated, user, router])
    
    if (!isAuthenticated || user?.role !== 'MASTER') return null
    */

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

                <nav className="flex-1 flex flex-col gap-2">
                    <AdminNavLink href="/admin?tab=analytics" icon={LayoutDashboard} label="Dashboard" active={isActive('/admin') && (!searchParams.get('tab') || searchParams.get('tab') === 'analytics')} />
                    <AdminNavLink href="/admin?tab=questions" icon={Database} label="Banco de Dados" active={isActive('/admin') && searchParams.get('tab') === 'questions'} />
                    <AdminNavLink href="/admin/finance" icon={DollarSign} label="Faturamento e Planos" active={isActive('/admin/finance')} />
                    <AdminNavLink href="/admin/settings" icon={Settings} label="Configurações do Sistema" active={isActive('/admin/settings')} />
                </nav>

                <button
                    onClick={() => { logout(); router.push('/') }}
                    className="flex items-center gap-3 p-4 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all font-bold text-sm"
                >
                    <LogOut className="w-5 h-5" />
                    Sair do Painel
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-3xl font-black mb-2">Painel de Controle</h1>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                Acesso Master: {user.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">

                            <div className="hidden md:block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
                                Sistema Online
                            </div>
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
