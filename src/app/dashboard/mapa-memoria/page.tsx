"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MemoryMapRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard?tab=MAPA')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  )
}
