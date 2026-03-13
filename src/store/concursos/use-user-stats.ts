import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export interface ConcursoUserStats {
    total_respondidas: number
    total_acertos: number
    accuracy: number
    streak_current: number
    streak_max: number
    last_activity_at: string
}

interface ConcursoUserStatsState {
    stats: ConcursoUserStats | null
    loading: boolean
    loadStats: (userId: string) => Promise<void>
    updateStats: (userId: string, isCorrect: boolean) => Promise<void>
}

export const useConcursoUserStats = create<ConcursoUserStatsState>()(
    persist(
        (set, get) => ({
            stats: null,
            loading: false,

            loadStats: async (userId) => {
                if (!isSupabaseConfigured()) return
                set({ loading: true })

                try {
                    const { data, error } = await supabase
                        .from('concurso_user_estatisticas')
                        .select('*')
                        .eq('user_id', userId)
                        .single()

                    if (error && error.code === 'PGRST116') {
                        // Create initial stats
                        const initial = {
                            user_id: userId,
                            total_respondidas: 0,
                            total_acertos: 0,
                            accuracy: 0,
                            streak_current: 0,
                            streak_max: 0,
                            last_activity_at: new Date().toISOString()
                        }
                        await supabase.from('concurso_user_estatisticas').insert(initial)
                        set({ stats: initial as any })
                    } else if (data) {
                        set({ stats: data })
                    }
                } catch (err) {
                    console.error('Error loading concurso stats:', err)
                } finally {
                    set({ loading: false })
                }
            },

            updateStats: async (userId, isCorrect) => {
                const current = get().stats || {
                    total_respondidas: 0,
                    total_acertos: 0,
                    accuracy: 0,
                    streak_current: 0,
                    streak_max: 0,
                    last_activity_at: new Date().toISOString()
                }

                const newTotal = current.total_respondidas + 1
                const newAcertos = isCorrect ? current.total_acertos + 1 : current.total_acertos
                const newAccuracy = Math.round((newAcertos / newTotal) * 100)
                const newStreak = isCorrect ? current.streak_current + 1 : 0
                const newMaxStreak = Math.max(current.streak_max, newStreak)

                const updated = {
                    total_respondidas: newTotal,
                    total_acertos: newAcertos,
                    accuracy: newAccuracy,
                    streak_current: newStreak,
                    streak_max: newMaxStreak,
                    last_activity_at: new Date().toISOString()
                }

                set({ stats: updated as any })

                if (isSupabaseConfigured()) {
                    await supabase
                        .from('concurso_user_estatisticas')
                        .upsert({ user_id: userId, ...updated })
                }
            }
        }),
        {
            name: 'qrub-concurso-stats-storage',
        }
    )
)
