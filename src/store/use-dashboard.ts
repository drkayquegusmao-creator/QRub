import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

export type WidgetId =
    | 'UPGRADE_BANNER'
    | 'INTELLIGENT_AGENDA'
    | 'PENDING_CRITICAL'
    | 'TACTICAL_SHORTCUTS'
    | 'READINESS_INDEX'
    | 'EVOLUTION_STATS'
    | 'PERFORMANCE_BY_AREA'
    | 'FAST_PRACTICE'

export type WidgetSize = 'full' | 'half'
export type WidgetStatus = 'active' | 'maintenance' | 'disabled'

export interface WidgetConfig {
    id: WidgetId
    title: string
    visible: boolean
    width: WidgetSize
    status: WidgetStatus
}

interface DashboardState {
    widgets: WidgetConfig[]
    isEditMode: boolean
    loading: boolean
    toggleEditMode: () => void
    setWidgetVisibility: (id: WidgetId, visible: boolean) => void
    setWidgetWidth: (id: WidgetId, width: WidgetSize) => void
    setWidgetStatus: (id: WidgetId, status: WidgetStatus) => void
    reorderWidgets: (startIndex: number, endIndex: number) => void
    resetLayout: () => void
    syncWithSupabase: () => Promise<void>
    loadFromSupabase: () => Promise<void>
}

const DEFAULT_WIDGETS: WidgetConfig[] = [
    { id: 'UPGRADE_BANNER', title: 'Banner de Upgrade', visible: true, width: 'full', status: 'active' },
    { id: 'INTELLIGENT_AGENDA', title: 'Agenda Inteligente', visible: true, width: 'full', status: 'active' },
    { id: 'FAST_PRACTICE', title: 'Treino por Área', visible: true, width: 'full', status: 'active' },
    { id: 'PENDING_CRITICAL', title: 'Pendentes & Atenção', visible: true, width: 'full', status: 'active' },
    { id: 'EVOLUTION_STATS', title: 'Evolução Global', visible: true, width: 'full', status: 'active' },
    { id: 'PERFORMANCE_BY_AREA', title: 'Performance por Área', visible: true, width: 'half', status: 'active' },
    { id: 'READINESS_INDEX', title: 'Índice de Prontidão', visible: true, width: 'half', status: 'active' },
    { id: 'TACTICAL_SHORTCUTS', title: 'Atalhos Táticos', visible: true, width: 'full', status: 'active' },
]

export const useDashboard = create<DashboardState>()(
    persist(
        (set, get) => ({
            widgets: DEFAULT_WIDGETS,
            isEditMode: false,
            loading: false,

            toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),

            setWidgetVisibility: (id, visible) => set((state) => ({
                widgets: state.widgets.map(w => w.id === id ? { ...w, visible } : w)
            })),

            setWidgetWidth: (id, width) => set((state) => ({
                widgets: state.widgets.map(w => w.id === id ? { ...w, width } : w)
            })),

            setWidgetStatus: (id, status) => {
                set((state) => ({
                    widgets: state.widgets.map(w => w.id === id ? { ...w, status, visible: status !== 'disabled' } : w)
                }))
                // Auto-sync immediately to Supabase — master control affects ALL users globally
                setTimeout(() => get().syncWithSupabase(), 50)
            },

            reorderWidgets: (startIndex, endIndex) => set((state) => {
                const result = Array.from(state.widgets)
                const [removed] = result.splice(startIndex, 1)
                result.splice(endIndex, 0, removed)
                return { widgets: result }
            }),

            resetLayout: () => set({ widgets: DEFAULT_WIDGETS }),

            syncWithSupabase: async () => {
                const { widgets } = get()
                try {
                    const { error } = await supabase
                        .from('system_settings')
                        .upsert({
                            key: 'dashboard_config',
                            value: { widgets },
                            updated_at: new Date().toISOString()
                        })
                    if (error) throw error
                } catch (err) {
                    console.error('Error syncing dashboard to Supabase:', err)
                }
            },

            loadFromSupabase: async () => {
                set({ loading: true })
                try {
                    const { data } = await supabase
                        .from('system_settings')
                        .select('value')
                        .eq('key', 'dashboard_config')
                        .single()

                    if (data && data.value && (data.value as any).widgets) {
                        // Supabase is always the source of truth — override localStorage completely
                        // Normalize: visible must reflect status (active/maintenance = visible, disabled = hidden)
                        const normalized = (data.value as any).widgets.map((w: WidgetConfig) => ({
                            ...w,
                            visible: w.status !== 'disabled'
                        }))
                        set({ widgets: normalized })
                    }
                } catch (err) {
                    console.error('Error loading dashboard from Supabase:', err)
                } finally {
                    set({ loading: false })
                }
            }
        }),
        {
            name: 'qrub-dashboard-layout-v3',
            partialize: (state) => ({
                widgets: state.widgets
            })
        }
    )
)
