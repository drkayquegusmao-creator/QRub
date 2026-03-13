import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

export type WidgetId =
    | 'CONCURSO_STATS_CARD'
    | 'CONCURSO_AREAS_GRID'
    | 'CONCURSO_PACKAGES'
    | 'CONCURSO_EDITAIS'
    | 'CONCURSO_RECENT_QUESTOES'

export type WidgetSize = 'full' | 'half'
export type WidgetStatus = 'active' | 'maintenance' | 'disabled'

export interface WidgetConfig {
    id: WidgetId
    title: string
    visible: boolean
    width: WidgetSize
    status: WidgetStatus
}

interface ConcursoDashboardState {
    widgets: WidgetConfig[]
    isEditMode: boolean
    loading: boolean
    toggleEditMode: () => void
    setWidgetVisibility: (id: WidgetId, visible: boolean) => void
    resetLayout: () => void
}

const DEFAULT_WIDGETS: WidgetConfig[] = [
    { id: 'CONCURSO_STATS_CARD', title: 'Visão Geral', visible: true, width: 'full', status: 'active' },
    { id: 'CONCURSO_AREAS_GRID', title: 'Explorar por Área', visible: true, width: 'full', status: 'active' },
    { id: 'CONCURSO_PACKAGES', title: 'Meus Pacotes', visible: true, width: 'half', status: 'active' },
    { id: 'CONCURSO_RECENT_QUESTOES', title: 'Recentemente Resolvidas', visible: true, width: 'half', status: 'active' },
]

export const useConcursoDashboard = create<ConcursoDashboardState>()(
    persist(
        (set, get) => ({
            widgets: DEFAULT_WIDGETS,
            isEditMode: false,
            loading: false,

            toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),

            setWidgetVisibility: (id, visible) => set((state) => ({
                widgets: state.widgets.map(w => w.id === id ? { ...w, visible } : w)
            })),

            resetLayout: () => set({ widgets: DEFAULT_WIDGETS }),
        }),
        {
            name: 'qrub-concurso-dashboard-layout',
        }
    )
)
