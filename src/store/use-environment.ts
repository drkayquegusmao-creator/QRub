import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type QrubEnvironment = 'SAUDE' | 'CONCURSOS'

interface EnvironmentState {
    currentEnvironment: QrubEnvironment
    setEnvironment: (env: QrubEnvironment) => void
}

export const useEnvironment = create<EnvironmentState>()(
    persist(
        (set) => ({
            currentEnvironment: 'SAUDE',
            setEnvironment: (env) => set({ currentEnvironment: env }),
        }),
        {
            name: 'qrub-environment-storage',
        }
    )
)
