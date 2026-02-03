import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SystemState {
    isMaintenanceMode: boolean
    maintenanceMessage: string
    setMaintenanceMode: (active: boolean, message?: string) => void
}

export const useSystem = create<SystemState>()(
    persist(
        (set) => ({
            isMaintenanceMode: false,
            maintenanceMessage: 'Estamos realizando ajustes técnicos para melhorar sua experiência. Voltamos em breve!',
            setMaintenanceMode: (active, message) => set({
                isMaintenanceMode: active,
                maintenanceMessage: message || 'Estamos realizando ajustes técnicos para melhorar sua experiência. Voltamos em breve!'
            }),
        }),
        {
            name: 'qrub-system-storage',
        }
    )
)
