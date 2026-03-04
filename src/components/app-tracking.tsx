
"use client"

import { useEffect, useRef } from 'react'
import { useAuth } from '@/store/use-auth'
import { trackEvent } from '@/lib/events'

export function AppTracking() {
    const { user, isAuthenticated } = useAuth()
    const trackedRef = useRef(false)

    useEffect(() => {
        if (isAuthenticated && user?.id && !trackedRef.current) {
            // Dedupe by minute to avoid too many events on refresh but still track activity
            const now = new Date()
            const dateStr = now.toISOString().split('T')[0]
            const timeStr = `${now.getHours()}:${now.getMinutes()}`
            const dedupeKey = `open_app:${user.id}:${dateStr}:${timeStr}`

            trackEvent(user.id, 'open_app', { dedupeKey }).then(() => {
                trackedRef.current = true
            })
        }
    }, [isAuthenticated, user?.id])

    return null
}
