import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export interface ConcursoTrainingSession {
    id: string
    area_id?: string
    difficulty?: string
    volume: number
    question_ids: string[]
    status: 'active' | 'completed'
    created_at: string
}

interface ConcursoSessionsState {
    sessions: ConcursoTrainingSession[]
    loading: boolean
    loadSessions: (userId: string) => Promise<void>
}

export const useConcursoSessions = create<ConcursoSessionsState>()((set) => ({
    sessions: [],
    loading: false,

    loadSessions: async (userId) => {
        if (!isSupabaseConfigured()) return
        set({ loading: true })
        try {
            const { data, error } = await supabase
                .from('concurso_training_sessions')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })

            if (error) throw error
            set({ sessions: data || [], loading: false })
        } catch (err) {
            console.error('Error loading concurso sessions:', err)
            set({ loading: false })
        }
    }
}))
