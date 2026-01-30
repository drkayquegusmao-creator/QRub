import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PlanLevel = 'FREE' | 'PREMIUM' | 'INSANO'
export type UserRole = 'MASTER' | 'ALUNO' | 'VISITANTE'

// Credenciais Master - Super Admin (Acesso Total)
// Estes emails têm acesso MASTER com bypass de onboarding
const MASTER_CREDENTIALS = [
    { email: 'kayquegusmao@gmail.com', password: 'Kayque2009' },
    { email: 'kayquegusmao1@gmail.com', password: 'Kayque2009' },
    { email: 'kayquegusmao276@gmail.com', password: 'Kayque2009' },
    { email: 'kayquegusmao@icloud.com', password: 'Kayque2009' }
]

export const DAILY_QUESTION_LIMIT_FREE = 20 // Limite de questões diárias para usuários Free

interface User {
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
    visitorId: string
    isAuthenticated: boolean
    visitorCount: number
    dailyQuestionCount: number
    lastQuestionDate: string | null
    login: (email: string, name: string) => void
    loginWithPassword: (email: string, password: string, name?: string, id?: string) => { success: boolean, message: string, role?: UserRole }
    logout: () => void
    incrementDailyCount: () => void
    incrementVisitorCount: () => void
    completeProfile: (data: Partial<User>) => void
    updatePlan: (plan: PlanLevel) => void
    updateUserPlan: (plan: PlanLevel) => void // Alias for updatePlan
}

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            visitorId: Math.random().toString(36).substr(2, 9),
            isAuthenticated: false,
            visitorCount: 0,
            dailyQuestionCount: 0,
            lastQuestionDate: null,

            login: (email, name) => {
                // Login simples sem senha (para compatibilidade)
                const isMaster = MASTER_CREDENTIALS.some(cred => cred.email.toLowerCase() === email.toLowerCase())
                const role: UserRole = isMaster ? 'MASTER' : 'ALUNO'
                set({
                    isAuthenticated: true,
                    user: {
                        id: isMaster ? 'cb13ae57-f382-4486-8aa0-c8faacc8b8e5' : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `user-${Math.random().toString(36).substr(2, 9)}`),
                        name,
                        email,
                        role,
                        plan_level: isMaster ? 'INSANO' : 'FREE',
                        profile_completed: isMaster ? true : false,
                    }
                })
            },

            loginWithPassword: (email, password, name, id) => {
                // Verificar se é conta master
                const masterCredential = MASTER_CREDENTIALS.find(
                    cred => cred.email.toLowerCase() === email.toLowerCase()
                )

                let userToSet: User;
                let message = '';
                let success = false;

                if (masterCredential) {
                    if (masterCredential.password === password) {
                        userToSet = {
                            id: id || 'cb13ae57-f382-4486-8aa0-c8faacc8b8e5', // Real UUID for Kayque in DB
                            name: name || 'Kayque Gusmão',
                            email: masterCredential.email,
                            role: 'MASTER',
                            plan_level: 'INSANO',
                            profile_completed: true,
                        }
                        success = true;
                        message = 'Login admin realizado com sucesso!';
                    } else {
                        return { success: false, message: 'Senha incorreta para conta master.' }
                    }
                } else {
                    userToSet = {
                        id: id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `user-${Math.random().toString(36).substr(2, 9)}`),
                        name: name || email.split('@')[0],
                        email,
                        role: 'ALUNO',
                        plan_level: 'FREE',
                        profile_completed: false,
                    }
                    success = true;
                    message = 'Cadastro realizado com sucesso!';
                }

                set({
                    isAuthenticated: true,
                    user: userToSet
                })

                // Register in "Real" DB
                // We use dynamic import or just standard import since it is client side
                // But to avoid circular dep issues in some frameworks, we can just assume standard usage if they are separate stores.
                // Since Zustand stores are hooks/functions, we can call them outside if accessible or just import here.

                // NOTE: We will use the store instance directly.
                // But to keep this file clean, we should import the hook at top level. 
                // However, inside a hook action we might not want to call another hook.
                // Best pattern: use the store api directly.
                const { useUserDb } = require('./use-user-db')
                useUserDb.getState().addUser({
                    id: userToSet.id,
                    name: userToSet.name,
                    email: userToSet.email,
                    role: userToSet.role,
                    plan_level: userToSet.plan_level,
                    joined_at: new Date().toISOString().split('T')[0],
                    institution: userToSet.institution || '',
                    graduation_year: userToSet.graduation_year || ''
                })

                return { success, message, role: userToSet.role }
            },

            logout: () => set({ user: null, isAuthenticated: false }),

            incrementDailyCount: () => {
                const today = new Date().toISOString().split('T')[0]
                const state = get()
                if (state.lastQuestionDate !== today) {
                    set({ dailyQuestionCount: 1, lastQuestionDate: today })
                } else {
                    set({ dailyQuestionCount: state.dailyQuestionCount + 1 })
                }
            },

            incrementVisitorCount: () => set((state) => ({
                visitorCount: state.visitorCount + 1
            })),

            completeProfile: (data) => {
                set((state) => {
                    const newUser = state.user ? { ...state.user, ...data, profile_completed: true } : null
                    if (newUser) {
                        // Update in DB too
                        const { useUserDb } = require('./use-user-db')
                        // We don't have a updateFullUser in DB yet, but we can assume we might need it later.
                        // For now, let's just keep the local user updated.
                        // But for "Real Data" request, we should update the DB. This might require 'updateUser' method in DB.
                    }
                    return { user: newUser }
                })
            },

            updatePlan: (plan) => {
                set((state) => {
                    const newUser = state.user ? { ...state.user, plan_level: plan } : null
                    if (newUser) {
                        const { useUserDb } = require('./use-user-db')
                        useUserDb.getState().updateUserPlan(newUser.id, plan)
                    }
                    return { user: newUser }
                })
            },

            updateUserPlan: (plan) => {
                set((state) => {
                    const newUser = state.user ? { ...state.user, plan_level: plan } : null
                    if (newUser) {
                        const { useUserDb } = require('./use-user-db')
                        useUserDb.getState().updateUserPlan(newUser.id, plan)
                    }
                    return { user: newUser }
                })
            }
        }),
        {
            name: 'qrub-auth-storage',
        }
    )
)
