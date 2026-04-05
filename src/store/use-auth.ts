import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isMasterEmail } from '@/lib/auth-constants'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export const DAILY_QUESTION_LIMIT_FREE = 15

export type PlanLevel = 'free' | 'insano' | 'mensal' | 'trimestral' | 'semestral' | 'anual'
export type ProductType = 'qrub_concurso' | 'qrub_saude'
export type SubscriptionStatus = 'active' | 'expired' | 'past_due' | 'canceled' | 'pending_payment'
export type UserRole = 'MASTER' | 'ALUNO' | 'VISITANTE'

export interface Subscription {
    product: ProductType
    plan: PlanLevel
    status: SubscriptionStatus
    startsAt: string | null
    expiresAt: string | null
}

export interface UserUsage {
    dailyQuestionsUsed: number
    lastResetDate: string
}

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    plan_level: PlanLevel
    subscriptions: Subscription[]
    usage: {
        qrub_concurso: UserUsage
        qrub_saude: UserUsage
    }
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
    updatePlan: (plan: PlanLevel, product?: ProductType) => Promise<void>
    updateUserPlan: (plan: PlanLevel, product?: ProductType) => Promise<void>
    refreshUserProfile: () => Promise<void>
    
    // Access Logic
    finishOnboarding: () => Promise<void>
    hasPremiumAccess: (product: ProductType) => boolean
    canAnswerQuestion: (product: ProductType) => boolean
    incrementQuestionCount: (product: ProductType) => Promise<void>
    
    // Pending Flow
    setPendingPlan: (plan: PlanLevel, product: ProductType) => void
    getPendingPlan: () => { plan: PlanLevel, product: ProductType } | null
    clearPendingPlan: () => void
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
                        role: isMaster ? 'MASTER' : state.user.role,
                        plan_level: 'free' // Default logic for initial profile completion
                    }
                    set({ user: updatedUser as User })

                    if (isSupabaseConfigured()) {
                        const { error } = await supabase
                            .from('users')
                            .update({
                                ...data,
                                plan_level: 'free',
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

            updatePlan: async (plan, product = 'qrub_concurso') => {
                const state = get()
                if (state.user) {
                    const price = plan === 'free' ? 0 
                        : (plan === 'mensal' ? 29.99 
                        : (plan === 'trimestral' ? 79.99 
                        : (plan === 'semestral' ? 159.99 
                        : (plan === 'anual' ? 319.99 : 0))));
                    
                    if (isSupabaseConfigured()) {
                        const { error } = await supabase.rpc('handle_user_subscription', {
                            p_user_id: state.user.id,
                            p_product: product,
                            p_plan: plan,
                            p_status: 'active',
                            p_payment_method: plan === 'free' ? 'free_activation' : 'checkout_activation',
                            p_price: price
                        })

                        if (error) {
                            console.error('Error in handle_user_subscription RPC:', error)
                            throw error
                        }
                    }

                    // Refresh local state to get the updated subscription array
                    await get().refreshUserProfile()
                }
            },

            updateUserPlan: async (plan, product) => {
                return get().updatePlan(plan, product)
            },

            finishOnboarding: async () => {
                const state = get()
                if (state.user) {
                    const updatedUser = { ...state.user, profile_completed: true }
                    set({ user: updatedUser })

                    if (isSupabaseConfigured()) {
                        await supabase
                            .from('users')
                            .update({ profile_completed: true })
                            .eq('id', state.user.id)
                    }
                }
            },

            hasPremiumAccess: (product) => {
                const user = get().user
                if (!user) return false
                if (user.role === 'MASTER') return true // Master has absolute access

                const sub = user.subscriptions?.find(s => s.product === product)
                if (!sub) return false

                // Check status and expiration
                if (sub.status !== 'active') return false
                if (sub.expiresAt && new Date(sub.expiresAt) < new Date()) return false

                return true
            },

            canAnswerQuestion: (product) => {
                const state = get()
                if (state.hasPremiumAccess(product)) return true

                const usage = state.user?.usage?.[product]
                if (!usage) return true // Should not happen with init

                // Check reset
                const today = new Date().toISOString().split('T')[0]
                if (usage.lastResetDate !== today) return true

                return usage.dailyQuestionsUsed < DAILY_QUESTION_LIMIT_FREE
            },

            incrementQuestionCount: async (product) => {
                const state = get()
                if (!state.user) return

                const today = new Date().toISOString().split('T')[0]
                const currentUsage = state.user.usage?.[product] || { dailyQuestionsUsed: 0, lastResetDate: today }
                
                let newCount = currentUsage.dailyQuestionsUsed + 1
                if (currentUsage.lastResetDate !== today) {
                    newCount = 1
                }

                const updatedUser = {
                    ...state.user,
                    usage: {
                        ...state.user.usage,
                        [product]: {
                            dailyQuestionsUsed: newCount,
                            lastResetDate: today
                        }
                    }
                }

                set({ user: updatedUser })

                if (isSupabaseConfigured()) {
                    await supabase
                        .from('users')
                        .update({ usage: updatedUser.usage })
                        .eq('id', state.user.id)
                }
            },

            setPendingPlan: (plan, product) => {
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem('qrub_pending_plan', JSON.stringify({ plan, product }))
                }
            },

            getPendingPlan: () => {
                if (typeof window !== 'undefined') {
                    const saved = sessionStorage.getItem('qrub_pending_plan')
                    return saved ? JSON.parse(saved) : null
                }
                return null
            },

            clearPendingPlan: () => {
                if (typeof window !== 'undefined') {
                    sessionStorage.removeItem('qrub_pending_plan')
                }
            }
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

