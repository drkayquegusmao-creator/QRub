import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface SystemState {
    isMaintenanceMode: boolean
    maintenanceMessage: string
    loading: boolean
    fetchMaintenanceStatus: () => Promise<void>
    setMaintenanceMode: (active: boolean, message?: string) => Promise<void>
    subscribeToMaintenance: () => () => void
}

export const useSystem = create<SystemState>((set) => ({
    isMaintenanceMode: false,
    maintenanceMessage: 'Estamos realizando ajustes técnicos para melhorar sua experiência. Voltamos em breve!',
    loading: true,

    fetchMaintenanceStatus: async () => {
        try {
            const { data } = await supabase
                .from('system_settings')
                .select('value')
                .eq('key', 'maintenance_mode')
                .single()

            if (data && data.value) {
                set({
                    isMaintenanceMode: (data.value as any).active,
                    maintenanceMessage: (data.value as any).message,
                    loading: false
                })
            } else {
                set({ loading: false })
            }
        } catch (error) {
            console.error('Error fetching maintenance status:', error)
            set({ loading: false })
        }
    },

    setMaintenanceMode: async (active, message) => {
        const msg = message || 'Estamos realizando ajustes técnicos para melhorar sua experiência. Voltamos em breve!'
        // Optimistic update
        set({ isMaintenanceMode: active, maintenanceMessage: msg })

        try {
            const { error } = await supabase
                .from('system_settings')
                .upsert({
                    key: 'maintenance_mode',
                    value: { active, message: msg },
                    updated_at: new Date().toISOString()
                })

            if (error) throw error
        } catch (error) {
            console.error('Error updating maintenance mode:', error)
            // Revert on error could be added here
        }
    },

    subscribeToMaintenance: () => {
        const channel = supabase
            .channel('system_settings_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'system_settings',
                    filter: 'key=eq.maintenance_mode'
                },
                (payload) => {
                    const newValue = payload.new as { value: { active: boolean, message: string } }
                    if (newValue && newValue.value) {
                        set({
                            isMaintenanceMode: newValue.value.active,
                            maintenanceMessage: newValue.value.message
                        })
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }
}))
