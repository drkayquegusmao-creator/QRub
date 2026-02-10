import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PlanLevel, UserRole } from '@/store/use-auth'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export interface RegisteredUser {
    id: string
    name: string
    email: string
    role: UserRole
    plan_level: PlanLevel
    profile_completed: boolean
    created_at: string
    phone?: string
    institution?: string
    graduation_year?: string
    updated_at?: string
    last_sign_in_at?: string
}

interface UserDbState {
    users: RegisteredUser[]
    loading: boolean
    addUser: (user: RegisteredUser) => Promise<void>
    updateUserPlan: (userId: string, plan: PlanLevel) => Promise<void>
    updateUserRole: (userId: string, role: UserRole) => Promise<void>
    updateUserProfile: (userId: string, data: Partial<RegisteredUser>) => Promise<void>
    deleteUser: (userId: string) => Promise<void>
    deleteUsers: (userIds: string[]) => Promise<void>
    loadUsers: () => Promise<void>
}

export const useUserDb = create<UserDbState>()(
    persist(
        (set) => ({
            users: [],
            loading: false,

            loadUsers: async () => {
                try {
                    if (!isSupabaseConfigured()) {
                        return
                    }

                    set({ loading: true })

                    const { data, error } = await supabase
                        .from('users')
                        .select('*')
                        .order('created_at', { ascending: false })

                    if (error) {
                        console.warn('Could not load users from Supabase:', error.message)
                        return
                    }

                    if (data) {
                        set({ users: data })
                        console.log(`Loaded ${data.length} users from Supabase`)
                    }
                } catch (err) {
                    console.warn('Error loading users:', err instanceof Error ? err.message : 'Unknown error')
                } finally {
                    set({ loading: false })
                }
            },

            addUser: async (user) => {

                set((state) => {
                    if (state.users.some(u => u.id === user.id)) return state
                    return { users: [user, ...state.users] }
                })

                if (isSupabaseConfigured()) {
                    try {
                        const { error } = await supabase
                            .from('users')
                            .upsert({
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                plan_level: user.plan_level,
                                profile_completed: user.profile_completed,
                                institution: user.institution,
                                graduation_year: user.graduation_year
                            }, { onConflict: 'id' })
                        if (error) console.error('Error syncing User to Supabase:', error)
                    } catch (err) {
                        console.error('Supabase Sync error:', err)
                    }
                }
            },

            updateUserPlan: async (userId, plan) => {
                set((state) => ({
                    users: state.users.map(u => u.id === userId ? { ...u, plan_level: plan } : u)
                }))

                if (isSupabaseConfigured()) {
                    await supabase
                        .from('users')
                        .update({ plan_level: plan })
                        .eq('id', userId)
                }
            },

            updateUserRole: async (userId, role) => {
                set((state) => ({
                    users: state.users.map(u => u.id === userId ? { ...u, role: role } : u)
                }))

                if (isSupabaseConfigured()) {
                    await supabase
                        .from('users')
                        .update({ role: role })
                        .eq('id', userId)
                }
            },

            updateUserProfile: async (userId, data) => {
                set((state) => ({
                    users: state.users.map(u => u.id === userId ? { ...u, ...data, profile_completed: true } : u)
                }))

                if (isSupabaseConfigured()) {
                    await supabase
                        .from('users')
                        .update({ ...data, profile_completed: true })
                        .eq('id', userId)
                }
            },

            deleteUser: async (userId) => {
                set((state) => ({
                    users: state.users.filter(u => u.id !== userId)
                }))

                if (isSupabaseConfigured()) {
                    await supabase
                        .from('users')
                        .delete()
                        .eq('id', userId)
                }
            },

            deleteUsers: async (userIds) => {
                set((state) => ({
                    users: state.users.filter(u => !userIds.includes(u.id))
                }))

                if (isSupabaseConfigured()) {
                    await supabase
                        .from('users')
                        .delete()
                        .in('id', userIds)
                }
            }
        }),
        {
            name: 'qrub-users-db', // Storage for all registred users
        }
    )
)
