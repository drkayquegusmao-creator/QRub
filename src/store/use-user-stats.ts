import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { generatePerformanceContent, PerformanceInput } from '@/lib/generators/performance-generator'
import { isSameDay } from 'date-fns'

export interface UserStats {
    total_questoes: number
    total_acertos: number
    media_geral: number
    nivel_usuario: string
    ultima_frase_exibida: string | null
    headline?: string
    media?: string
    tone?: string
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
                    const possiblePhrases = PHRASES[marcoAtivo]
                    return possiblePhrases[Math.floor(Math.random() * possiblePhrases.length)]
                }

                return "Consistência vence talento."
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
                        const initialStats = {
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
                            set({ stats: newData })
                        }
                    } else {
                        // Calculate or re-calculate extra metrics on load
                        const quizState = (await import('./use-quiz')).useQuiz.getState()
                        const filteredResponses = quizState.responses.filter(r => 
                            isConcursos ? !!r.is_concursos : !r.is_concursos
                        )
                        const todayResponses = filteredResponses.filter(r => isSameDay(new Date(r.timestamp), new Date()))

                        // Streaks from history
                        let streakCorrect = 0
                        let streakWrong = 0
                        const lastResponses = [...filteredResponses].reverse()

                        // Find current streak
                        if (lastResponses.length > 0) {
                            const lastWasCorrect = lastResponses[0].is_correct
                            if (lastWasCorrect) {
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
                        }

                        const genInput: PerformanceInput = {
                            total_answered: data.total_questoes,
                            accuracy_percent: data.media_geral,
                            today_answered: todayResponses.length,
                            streak_correct: streakCorrect,
                            streak_wrong: streakWrong,
                            last_10_messages: data.ultima_frase_exibida ? [data.ultima_frase_exibida] : []
                        }

                        const genOutput = generatePerformanceContent(genInput)

                        set({
                            stats: {
                                ...data,
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

                // Get additional context for the generator
                const quizState = (await import('./use-quiz')).useQuiz.getState()
                const filteredResponses = quizState.responses.filter(r => 
                    isConcursos ? !!r.is_concursos : !r.is_concursos
                )
                const todayResponses = filteredResponses.filter(r => isSameDay(new Date(r.timestamp), new Date()))
                const todayAnswered = todayResponses.length + 1 // +1 for the current one

                // Calculate Streaks
                let streakCorrect = isCorrect ? 1 : 0
                let streakWrong = isCorrect ? 0 : 1

                // Look back at previous responses in quizState
                const lastResponses = [...filteredResponses].reverse()
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
                    tone: genOutput.tone
                }

                // Optimistic update
                set({ stats: updatedStats })

                if (isSupabaseConfigured()) {
                    try {
                        await supabase
                            .from(table)
                            .upsert({
                                user_id: userId,
                                ...updatedStats,
                                updated_at: new Date().toISOString()
                            })
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
