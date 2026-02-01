"use client"

import dynamic from 'next/dynamic'

const SupportInbox = dynamic(() => import('./support-content'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
})

export default function SupportPage() {
    return <SupportInbox />
}
