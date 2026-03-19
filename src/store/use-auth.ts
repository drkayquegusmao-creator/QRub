import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isMasterEmail } from '@/lib/auth-constants'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export const DAILY_QUESTION_LIMIT_FREE = 10

export type PlanLevel = 'FREE' | 'PREMIUM' | 'INSANO'
export type UserRole = 'MASTER' | 'ALUNO' | 'VISITANTE'

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    plan_level: PlanLevel
    profile_completed: boolean
    rg?: string
    address?: string
    phone?: string
    institution?: string
    graduation_year?: string
    specialty_of_interest?: string
    streak?: number
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    visitorCount: number
    visitorId: string
    dailyQuestionCount: number

    // Actions
    setUser: (user: User | null) => void
    setAuthenticated: (value: boolean) => void
    setLoading: (value: boolean) => void
    logout: () => Promise<void>
    incrementVisitorCount: () => void
    incrementDailyCount: () => void

    // Helpers
    completeProfile: (data: Partial<User>) => Promise<void>
    updatePlan: (plan: PlanLevel) => Promise<void>
    updateUserPlan: (plan: PlanLevel) => Promise<void> // Alias for consistent usage in components
    refreshUserProfile: () => Promise<void>
}

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            visitorCount: 0,
            visitorId: Math.random().toString(36).substring(2, 9),
            dailyQuestionCount: 0,

            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setAuthenticated: (value) => set({ isAuthenticated: value }),
            setLoading: (value) => set({ isLoading: value }),

            incrementVisitorCount: () => set((state) => ({ visitorCount: state.visitorCount + 1 })),
            incrementDailyCount: () => set((state) => ({ dailyQuestionCount: state.dailyQuestionCount + 1 })),

            logout: async () => {
                if (isSupabaseConfigured()) {
                    await supabase.auth.signOut()
                }
                set({ user: null, isAuthenticated: false })
            },

            refreshUserProfile: async () => {
                const state = get()
                if (!state.user) return

                if (!isSupabaseConfigured()) return

                try {
                    const { data, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', state.user.id)
                        .single()

                    if (data && !error) {
                        const isMaster = isMasterEmail(data.email)
                        const updates: any = { plan_level: 'INSANO' }

                        if (isMaster && data.role !== 'MASTER') {
                            updates.role = 'MASTER'
                        }

                        if (Object.keys(updates).length > 0) {
                            await supabase.from('users').update(updates).eq('id', state.user.id)
                            data.plan_level = 'INSANO'
                            if (isMaster) data.role = 'MASTER'
                        }

                        set({ user: data })
                    }
                } catch (err) {
                    console.error('Error refreshing profile:', err)
                }
            },

            completeProfile: async (data) => {
                const state = get()
                if (state.user) {

                    // Optimistic update
                    const isMaster = isMasterEmail(state.user.email)
                    const updatedUser = {
                        ...state.user,
                        ...data,
                        profile_completed: true,
                        role: isMaster ? 'MASTER' : state.user.role,
                        plan_level: 'INSANO' // Todos os usuários começam como INSANO

                    }
                    set({ user: updatedUser as User })

                    if (isSupabaseConfigured()) {
                        const { error } = await supabase
                            .from('users')
                            .update({
                                ...data,
                                profile_completed: true,
                                plan_level: 'INSANO', // Garantir que salva como INSANO
                                ...(isMaster ? { role: 'MASTER' } : {})
                            })
                            .eq('id', state.user.id)
                        
                        if (error) {
                            console.error('Error in completeProfile DB update:', error)
                            throw error
                        }
                    }
                }
            },

            updatePlan: async (plan) => {
                const state = get()
                if (state.user) {
                    const updatedUser = { ...state.user, plan_level: plan }
                    set({ user: updatedUser })

                    if (isSupabaseConfigured()) {
                        await supabase
                            .from('users')
                            .update({ plan_level: plan })
                            .eq('id', state.user.id)
                    }
                }
            },

            updateUserPlan: async (plan) => {
                return get().updatePlan(plan)
            },
        }),
        {
            name: 'qrub-auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)

