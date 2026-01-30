"use client"

import { useEffect, ReactNode } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { useAuth } from '@/store/use-auth'
import { useSRS } from '@/store/use-srs'
import { useUserDb } from '@/store/use-user-db'

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { setUser, setAuthenticated, setLoading } = useAuth()
    const { load_progress } = useSRS()
    const { loadUsers } = useUserDb()

    useEffect(() => {
        if (!isSupabaseConfigured()) {
            console.log('Supabase mode: MOCK')
            return
        }

        const syncUser = async (session: any) => {
            if (session?.user) {
                setLoading(true)
                try {
                    const { data: profiles, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', session.user.id)

                    const profile = profiles && profiles.length > 0 ? profiles[0] : null

                    if (profile && !error) {
                        setUser(profile)
                        // Load additional data
                        load_progress(profile.id)
                        if (profile.role === 'MASTER') {
                            loadUsers()
                        }
                    } else if (error && error.code === 'PGRST116') {
                        // Profile not found, but auth user exists
                        // Likely a legacy user or trigger didn't run
                        console.warn('Profile not found in "users" table, but auth exists.')
                    }
                } catch (err) {
                    console.error('Error syncing user:', err)
                } finally {
                    setLoading(false)
                }
            } else {
                setUser(null)
            }
        }

        // 1. Check initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            syncUser(session)
        })

        // 2. Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            syncUser(session)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [setUser, setAuthenticated, setLoading, load_progress, loadUsers])

    return <>{children}</>
}
