import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { generatePerformanceContent, PerformanceInput, PerformanceTone } from '@/lib/generators/performance-generator'
import { isSameDay } from 'date-fns'

export interface UserStats {
    total_questoes: number
    total_acertos: number
    media_geral: number
    nivel_usuario: string
    ultima_frase_exibida: string | null
    headline?: string
    media?: string
    tone?: PerformanceTone
    streak_current?: number
    streak_max?: number
}

interface UserStatsState {
    stats: UserStats | null
    loading: boolean
    isConcursos: boolean
    loadStats: (userId: string, isConcursos?: boolean) => Promise<void>
    updateStats: (userId: string, isCorrect: boolean, isConcursos?: boolean) => Promise<void>
    calculateLevel: (total: number) => string
    getDynamicPhrase: (total: number) => string
}

const PHRASES: Record<number, string[]> = {
    10: ["Começou. Não pare.", "A disciplina nasceu."],
    25: ["Consistência é a chave.", "Cada questão conta."],
    50: ["50 já foram. Isso muda destino.", "Cérebro aquecido."],
    100: ["100. Agora é compromisso.", "Médico não nasce pronto."],
    250: ["250. Você está construindo uma base sólida.", "A excelência é um hábito."],
    500: ["500. Você não é comum.", "Isso já é padrão alto."],
    1000: ["1.000 questões. Elite ativada.", "Agora ficou sério."]
}

export const useUserStats = create<UserStatsState>()(
    persist(
        (set, get) => ({
            stats: null,
            loading: false,
            isConcursos: false,

            calculateLevel: (total: number) => {
                if (total >= 1000) return 'Elite'
                if (total >= 600) return 'Avançado'
                if (total >= 300) return 'Forte'
                if (total >= 150) return 'Consistente'
                if (total >= 50) return 'Dedicado'
                return 'Iniciante'
            },

            getDynamicPhrase: (total: number) => {
                const marcos = [1000, 500, 250, 100, 50, 25, 10]
                const marcoAtivo = marcos.find(m => total >= m)

                if (marcoAtivo && PHRASES[marcoAtivo]) {
                    const pool = PHRASES[marcoAtivo]
                    return pool[Math.floor(Math.random() * pool.length)]
                }
                return "Continue seu progresso para novos marcos."
            },

            loadStats: async (userId, isConcursos = false) => {
                if (!isSupabaseConfigured()) return
                set({ loading: true, isConcursos })
                const table = isConcursos ? 'concurso_user_estatisticas' : 'user_stats'

                try {
                    const { data, error } = await supabase
                        .from(table)
                        .select('*')
                        .eq('user_id', userId)
                        .maybeSingle()

                    if (!data) {
                        // Create initial stats
                        const initialStats = isConcursos ? {
                            user_id: userId,
                            total_respondidas: 0,
                            total_acertos: 0,
                            accuracy: 0,
                            streak_current: 0,
                            streak_max: 0,
                            last_activity_at: new Date().toISOString()
                        } : {
                            user_id: userId,
                            total_questoes: 0,
                            total_acertos: 0,
                            media_geral: 0,
                            nivel_usuario: 'Iniciante',
                            ultima_frase_exibida: 'Resolva sua primeira questão para ativar suas estatísticas.'
                        }

                        const { data: newData, error: insertError } = await supabase
                            .from(table)
                            .insert(initialStats)
                            .select()
                            .single()

                        if (!insertError && newData) {
                            set({ stats: isConcursos ? {
                                total_questoes: newData.total_respondidas,
                                total_acertos: newData.total_acertos,
                                media_geral: newData.accuracy,
                                streak_current: newData.streak_current,
                                streak_max: newData.streak_max,
                                nivel_usuario: 'Iniciante',
                                ultima_frase_exibida: 'Resolva sua primeira questão para ativar suas estatísticas.'
                            } : newData })
                        }
                    } else {
                        // Map concurso columns to general stats interface
                        const normalizedData = isConcursos ? {
                            total_questoes: data.total_respondidas,
                            total_acertos: data.total_acertos,
                            media_geral: data.accuracy,
                            streak_current: data.streak_current,
                            streak_max: data.streak_max,
                            nivel_usuario: get().calculateLevel(data.total_respondidas),
                            ultima_frase_exibida: data.ultima_frase_exibida || 'Siga firme!'
                        } : data

                        // Calculate streaks for the generator
                        const quizState = (await import('./use-quiz')).useQuiz.getState()
                        const filteredResponses = quizState.responses.filter(r => 
                            isConcursos ? !!r.is_concursos : !r.is_concursos
                        )
                        const todayResponses = filteredResponses.filter(r => isSameDay(new Date(r.timestamp), new Date()))

                        let currentStreakCorrect = 0
                        let currentStreakWrong = 0
                        const lastResponses = [...filteredResponses].reverse()

                        if (lastResponses.length > 0) {
                            const lastWasCorrect = lastResponses[0].is_correct
                            if (lastWasCorrect) {
                                for (const r of lastResponses) {
                                    if (r.is_correct) currentStreakCorrect++
                                    else break
                                }
                            } else {
                                for (const r of lastResponses) {
                                    if (!r.is_correct) currentStreakWrong++
                                    else break
                                }
                            }
                        }

                        const genInput: PerformanceInput = {
                            total_answered: normalizedData.total_questoes,
                            accuracy_percent: normalizedData.media_geral,
                            today_answered: todayResponses.length,
                            streak_correct: currentStreakCorrect,
                            streak_wrong: currentStreakWrong,
                            last_10_messages: normalizedData.ultima_frase_exibida ? [normalizedData.ultima_frase_exibida] : []
                        }

                        const genOutput = generatePerformanceContent(genInput)

                        set({
                            stats: {
                                ...normalizedData,
                                ultima_frase_exibida: genOutput.frase,
                                headline: genOutput.headline,
                                media: genOutput.media,
                                tone: genOutput.tone
                            }
                        })
                    }
                } catch (err) {
                    console.error('Error loading stats:', err)
                } finally {
                    set({ loading: false })
                }
            },

            updateStats: async (userId, isCorrect, isConcursos = false) => {
                const state = get()
                const table = isConcursos ? 'concurso_user_estatisticas' : 'user_stats'
                
                const currentStats = state.stats || {
                    total_questoes: 0,
                    total_acertos: 0,
                    media_geral: 0,
                    streak_current: 0,
                    streak_max: 0,
                    nivel_usuario: 'Iniciante',
                    ultima_frase_exibida: null,
                    headline: '',
                    media: '',
                    tone: 'medio'
                }

                const newTotal = currentStats.total_questoes + 1
                const newAcertos = isCorrect ? currentStats.total_acertos + 1 : currentStats.total_acertos
                const newMedia = Math.round((newAcertos / newTotal) * 100)
                const newLevel = state.calculateLevel(newTotal)

                // Streak logic for Concursos specifically uses the sequential correct answer streak
                const quizState = (await import('./use-quiz')).useQuiz.getState()
                const filteredResponses = quizState.responses.filter(r => 
                    isConcursos ? !!r.is_concursos : !r.is_concursos
                )
                const lastResponses = [...filteredResponses].reverse()
                
                let streakCorrect = isCorrect ? 1 : 0
                let streakWrong = isCorrect ? 0 : 1

                if (isCorrect) {
                    for (const r of lastResponses) {
                        if (r.is_correct) streakCorrect++
                        else break
                    }
                } else {
                    for (const r of lastResponses) {
                        if (!r.is_correct) streakWrong++
                        else break
                    }
                }

                const todayResponses = filteredResponses.filter(r => isSameDay(new Date(r.timestamp), new Date()))
                const todayAnswered = todayResponses.length + 1

                const genInput: PerformanceInput = {
                    total_answered: newTotal,
                    accuracy_percent: newMedia,
                    today_answered: todayAnswered,
                    streak_correct: streakCorrect,
                    streak_wrong: streakWrong,
                    last_10_messages: currentStats.ultima_frase_exibida ? [currentStats.ultima_frase_exibida] : []
                }

                const genOutput = generatePerformanceContent(genInput)

                const updatedStats: UserStats = {
                    total_questoes: newTotal,
                    total_acertos: newAcertos,
                    media_geral: newMedia,
                    nivel_usuario: newLevel,
                    ultima_frase_exibida: genOutput.frase,
                    headline: genOutput.headline,
                    media: genOutput.media,
                    tone: genOutput.tone,
                    streak_current: isConcursos ? streakCorrect : currentStats.streak_current,
                    streak_max: isConcursos ? Math.max(currentStats.streak_max || 0, streakCorrect) : currentStats.streak_max
                }

                // Optimistic update
                set({ stats: updatedStats })

                if (isSupabaseConfigured()) {
                    try {
                        const payload = isConcursos ? {
                            user_id: userId,
                            total_respondidas: newTotal,
                            total_acertos: newAcertos,
                            accuracy: newMedia,
                            streak_current: streakCorrect,
                            streak_max: updatedStats.streak_max,
                            last_activity_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                            ultima_frase_exibida: genOutput.frase
                        } : {
                            user_id: userId,
                            ...updatedStats,
                            updated_at: new Date().toISOString()
                        }

                        await supabase
                            .from(table)
                            .upsert(payload)
                    } catch (err) {
                        // Silent error
                    }
                }
            }
        }),
        {
            name: 'qrub-user-stats-storage',
        }
    )
)
