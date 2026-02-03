import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export interface WidgetConfig {
    id: WidgetId
    title: string
    visible: boolean
    width: WidgetSize
}

interface DashboardState {
    widgets: WidgetConfig[]
    isEditMode: boolean
    toggleEditMode: () => void
    setWidgetVisibility: (id: WidgetId, visible: boolean) => void
    setWidgetWidth: (id: WidgetId, width: WidgetSize) => void
    reorderWidgets: (startIndex: number, endIndex: number) => void
    resetLayout: () => void
}

const DEFAULT_WIDGETS: WidgetConfig[] = [
    { id: 'UPGRADE_BANNER', title: 'Banner de Upgrade', visible: true, width: 'full' },
    { id: 'INTELLIGENT_AGENDA', title: 'Agenda Inteligente', visible: true, width: 'half' },
    { id: 'FAST_PRACTICE', title: 'Treino por Área', visible: true, width: 'half' },
    { id: 'PENDING_CRITICAL', title: 'Pendentes & Atenção', visible: true, width: 'full' },
    { id: 'EVOLUTION_STATS', title: 'Evolução Global', visible: true, width: 'full' },
    { id: 'PERFORMANCE_BY_AREA', title: 'Performance por Área', visible: true, width: 'half' },
    { id: 'READINESS_INDEX', title: 'Índice de Prontidão', visible: true, width: 'half' },
    { id: 'TACTICAL_SHORTCUTS', title: 'Atalhos Táticos', visible: true, width: 'full' },
]

export const useDashboard = create<DashboardState>()(
    persist(
        (set) => ({
            widgets: DEFAULT_WIDGETS,
            isEditMode: false,

            toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),

            setWidgetVisibility: (id, visible) => set((state) => ({
                widgets: state.widgets.map(w => w.id === id ? { ...w, visible } : w)
            })),

            setWidgetWidth: (id, width) => set((state) => ({
                widgets: state.widgets.map(w => w.id === id ? { ...w, width } : w)
            })),

            reorderWidgets: (startIndex, endIndex) => set((state) => {
                const result = Array.from(state.widgets)
                const [removed] = result.splice(startIndex, 1)
                result.splice(endIndex, 0, removed)
                return { widgets: result }
            }),

            resetLayout: () => set({ widgets: DEFAULT_WIDGETS })
        }),
        {
            name: 'qrub-dashboard-layout-v2'
        }
    )
)
