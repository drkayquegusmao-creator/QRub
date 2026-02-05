"use client"

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Target } from 'lucide-react'

function AutoRedirect() {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        const id = 'auto-' + Math.random().toString(36).substr(2, 9)
        router.replace(`/dashboard/quiz/${id}?${params.toString()}`)
    }, [router, searchParams])

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-primary">Carregando Sessão Inteligente...</p>
            </div>
        </div>
    )
}

export default function QuizAutoPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
        }>
            <AutoRedirect />
        </Suspense>
    )
}
