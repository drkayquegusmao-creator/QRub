import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PlanLevel, UserRole } from '@/store/use-auth'

export interface RegisteredUser {
    id: string
    name: string
    email: string
    role: UserRole
    plan_level: PlanLevel
    joined_at: string
    phone?: string
    institution?: string
    graduation_year?: string
}

interface UserDbState {
    users: RegisteredUser[]
    addUser: (user: RegisteredUser) => void
    updateUserPlan: (userId: string, plan: PlanLevel) => void
    deleteUser: (userId: string) => void
    getUsers: () => RegisteredUser[]
}

export const useUserDb = create<UserDbState>()(
    persist(
        (set, get) => ({
            users: [
              // Initial seeded user relative to current real users
              { id: 'master-1', name: 'Kayque Gusmão', email: 'kayquegusmao@gmail.com', role: 'MASTER', plan_level: 'INSANO', joined_at: '2024-01-01', institution: 'System Owner', graduation_year: 'N/A' }
            ],
            addUser: (user) => set((state) => {
                // Avoid duplicates by email
                if (state.users.some(u => u.email === user.email)) return state
                return { users: [user, ...state.users] }
            }),
            updateUserPlan: (userId, plan) => set((state) => ({
                users: state.users.map(u => u.id === userId ? { ...u, plan_level: plan } : u)
            })),
            deleteUser: (userId) => set((state) => ({
                users: state.users.filter(u => u.id !== userId)
            })),
            getUsers: () => get().users
        }),
        {
            name: 'qrub-users-db', // Storage for all registred users
        }
    )
)
