"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function SaudeRedirectPage() {
    const router = useRouter()

    useEffect(() => {
        router.push('/dashboard')
    }, [router])

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="mt-4 text-xs font-black uppercase tracking-widest text-[#1A1033] dark:text-white">Redirecionando para QRub Saúde...</p>
        </div>
    )
}
