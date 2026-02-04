
"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSystem } from '@/store/use-system'
import { useAuth } from '@/store/use-auth'

export function MaintenanceGuardian({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { isMaintenanceMode, fetchMaintenanceStatus, subscribeToMaintenance, loading } = useSystem()
    const { user, isLoading: authLoading } = useAuth()

    useEffect(() => {
        fetchMaintenanceStatus()
        const unsubscribe = subscribeToMaintenance()
        return () => {
            if (typeof unsubscribe === 'function') unsubscribe()
        }
    }, [])

    useEffect(() => {
        // Don't redirect while loading essential states
        if (loading || authLoading) return

        const isMaintenancePage = pathname === '/maintenance'
        const isPublicPage = pathname === '/auth' || pathname === '/' // Allow landing and auth
        const isMaster = user?.role === 'MASTER'

        if (isMaintenanceMode) {
            // If Maintenance is ON
            if (!isMaster && !isMaintenancePage && !isPublicPage) {
                // If user is NOT master, NOT on maintenance page, and NOT on public page -> Redirect to Maintenance
                router.replace('/maintenance')
            }
        } else {
            // If Maintenance is OFF
            if (isMaintenancePage) {
                // If user IS on maintenance page -> Redirect back to dashboard
                router.replace('/dashboard')
            }
        }
    }, [isMaintenanceMode, user, pathname, loading, authLoading, router])

    if (isMaintenanceMode && !user && pathname !== '/maintenance' && pathname !== '/auth' && pathname !== '/') {
        // Optional: Show loading or nothing while redirecting
        return null
    }

    return <>{children}</>
}
