"use client"

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function ConcursoQuizAutoRedirect() {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        const id = 'auto-' + Math.random().toString(36).substr(2, 9)
        router.replace(`/concursos/quiz/${id}?${params.toString()}`)
    }, [router, searchParams])

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-6">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                <p className="text-sm font-black uppercase tracking-widest text-[#1A1033] dark:text-white animate-pulse">Sintonizando Questões de Concurso...</p>
            </div>
        </div>
    )
}

export default function ConcursoQuizAutoPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
            </div>
        }>
            <ConcursoQuizAutoRedirect />
        </Suspense>
    )
}
