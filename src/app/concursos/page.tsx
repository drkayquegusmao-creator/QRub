"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/use-auth'
import { isMasterEmail } from '@/lib/auth-constants'
import { Loader2 } from 'lucide-react'
import { ConcursoDashboard } from '@/components/concursos/dashboard'

export default function ConcursosPage() {
    const router = useRouter()
    const { user, isAuthenticated } = useAuth()
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (!isHydrated) return

        if (!isAuthenticated || !user) {
            router.push('/auth')
            return
        }

        if (!isMasterEmail(user.email)) {
            router.push('/saude')
        }
    }, [isHydrated, isAuthenticated, user, router])

    if (!isHydrated || !user || !isMasterEmail(user.email)) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Autenticando ambiente...</p>
            </div>
        )
    }

    return <ConcursoDashboard />
}
