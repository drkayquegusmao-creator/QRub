import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface SystemState {
    isMaintenanceMode: boolean
    maintenanceMessage: string
    openaiApiKey: string
    loading: boolean
    fetchMaintenanceStatus: () => Promise<void>
    setMaintenanceMode: (active: boolean, message?: string) => Promise<void>
    setOpenaiApiKey: (key: string) => Promise<void>
    subscribeToMaintenance: () => () => void
}

export const useSystem = create<SystemState>((set, get) => ({
    isMaintenanceMode: false,
    maintenanceMessage: 'Estamos realizando ajustes técnicos para melhorar sua experiência. Voltamos em breve!',
    openaiApiKey: '',
    loading: true,

    fetchMaintenanceStatus: async () => {
        try {
            const { data } = await supabase
                .from('system_settings')
                .select('key, value')
                .in('key', ['maintenance_mode', 'openai_api_key'])

            if (data) {
                const maintenance = data.find(i => i.key === 'maintenance_mode')?.value as any
                const openai = data.find(i => i.key === 'openai_api_key')?.value as any

                set({
                    isMaintenanceMode: false, // Forced disabled by Admin request
                    maintenanceMessage: maintenance?.message || 'Estamos realizando ajustes técnicos para melhorar sua experiência. Voltamos em breve!',
                    openaiApiKey: openai?.key || '',
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

    setOpenaiApiKey: async (key: string) => {
        set({ openaiApiKey: key })
        try {
            const { error } = await supabase
                .from('system_settings')
                .upsert({
                    key: 'openai_api_key',
                    value: { key },
                    updated_at: new Date().toISOString()
                })
            if (error) throw error
        } catch (error) {
            console.error('Error updating OpenAI API Key:', error)
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
                            isMaintenanceMode: false, // Forced disabled by Admin request
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
