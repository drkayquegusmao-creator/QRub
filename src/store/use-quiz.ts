import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserResponse } from '@/lib/data-mock'
import { subDays, format, isSameDay } from 'date-fns'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { ptBR } from 'date-fns/locale'
import { safeParseDate } from '@/lib/date-utils'
import { useUserStats } from './use-user-stats'

interface ErrorItem {
    question_id: string
    specialty_id: string
    review_count: number
    next_review_date: string // ISO string
}

interface QuizState {
    responses: UserResponse[]
    error_notebook: ErrorItem[]
    add_response: (response: UserResponse) => Promise<void>
    get_accuracy_by_specialty: (specialty_id: string) => number
    get_weekly_data: () => { day: string; count: number }[]
    get_weekly_accuracy: () => { day: string; accuracy: number }[]
    get_probability_of_passing: () => number
    get_daily_mission: () => string[]
    load_responses: (userId?: string) => Promise<void>
    load_all_responses: () => Promise<void>
    reset_metrics: () => void
}

export const useQuiz = create<QuizState>()(
    persist(
        (set, get) => ({
            responses: [],
            error_notebook: [],

            get_weekly_accuracy: () => {
                const today = new Date()
                const last_7_days = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i))

                return last_7_days.map(date => {
                    const day_label = format(date, 'EEE', { locale: ptBR })
                    const formatted_label = day_label.charAt(0).toUpperCase() + day_label.slice(1)

                    const day_responses = get().responses.filter(r =>
                        isSameDay(safeParseDate(r.timestamp), date)
                    )

                    const accuracy = day_responses.length > 0
                        ? Math.round((day_responses.filter(r => r.is_correct).length / day_responses.length) * 100)
                        : 0

                    return {
                        day: formatted_label.replace('.', ''),
                        accuracy
                    }
                })
            },

            add_response: async (response) => {
                const isConcursos = !!response.is_concursos

                // Update persistent user stats
                if (response.user_id) {
                    useUserStats.getState().updateStats(response.user_id, response.is_correct, isConcursos)
                }

                // Supabase Sync
                if (isSupabaseConfigured()) {
                    const table = isConcursos ? 'concurso_user_respostas' : 'user_responses'
                    try {
                        await supabase
                            .from(table)
                            .insert({
                                user_id: response.user_id,
                                question_id: response.question_id,
                                specialty_id: response.specialty_id,
                                is_correct: response.is_correct,
                                timestamp: response.timestamp
                            })
                    } catch (err) {
                        console.warn('Could not save response to Supabase (saved locally):', err instanceof Error ? err.message : 'Unknown error')
                    }
                }

                set((state) => {
                    const new_responses = [...state.responses, response]
                    const new_error_notebook = [...state.error_notebook]

                    if (!response.is_correct) {
                        const existing = new_error_notebook.find(e => e.question_id === response.question_id)
                        if (existing) {
                            existing.review_count = 0
                            existing.next_review_date = new Date(Date.now() + 86400000).toISOString()
                        } else {
                            new_error_notebook.push({
                                question_id: response.question_id,
                                specialty_id: response.specialty_id,
                                review_count: 0,
                                next_review_date: new Date(Date.now() + 86400000).toISOString()
                            })
                        }
                    } else {
                        const index = new_error_notebook.findIndex(e => e.question_id === response.question_id)
                        if (index !== -1) {
                            const item = new_error_notebook[index]
                            item.review_count += 1
                            if (item.review_count >= 3) {
                                new_error_notebook.splice(index, 1)
                            } else {
                                const intervals = [1, 7, 30]
                                const days_to_add = intervals[item.review_count] || 30
                                item.next_review_date = new Date(Date.now() + days_to_add * 86400000).toISOString()
                            }
                        }
                    }

                    return { responses: new_responses, error_notebook: new_error_notebook }
                })
            },

            load_responses: async (userId?: string) => {
                if (!isSupabaseConfigured() || !userId) {
                    console.log('Supabase not configured or no user ID, using local responses')
                    return
                }

                const isConcursos = typeof window !== 'undefined' && window.location.pathname.startsWith('/concursos')
                const table = isConcursos ? 'concurso_user_respostas' : 'user_responses'

                // Precautionary check: Supabase UUID columns will throw if the string is not a valid UUID format
                const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);

                if (!isUuid) {
                    console.warn('Skipping Supabase response load: User ID is not a valid UUID.', userId);
                    return;
                }

                try {
                    const { data, error } = await supabase
                        .from(table)
                        .select('*')
                        .eq('user_id', userId)
                        .order('timestamp', { ascending: true })

                    if (error) {
                        console.warn('Could not load responses from Supabase:', error.message)
                        return
                    }

                    if (data && data.length > 0) {
                        const withFlag = data.map((r: any) => ({ ...r, is_concursos: isConcursos }))
                        set({ responses: withFlag })
                        console.log(`Loaded ${data.length} responses from Supabase (${table})`)
                    } else {
                        console.log(`No responses found in Supabase (${table}) for this user`)
                    }
                } catch (err: any) {
                    console.warn('Error loading responses (using local data):', err.message || 'Unknown error')
                }
            },

            load_all_responses: async () => {
                if (!isSupabaseConfigured()) return
                const isConcursos = typeof window !== 'undefined' && window.location.pathname.startsWith('/concursos')
                const table = isConcursos ? 'concurso_user_respostas' : 'user_responses'

                try {
                    const { data, error } = await supabase
                        .from(table)
                        .select('*')
                        .order('timestamp', { ascending: false })
                        .limit(5000)

                    if (error) throw error

                    if (data) {
                        const withFlag = data.map((r: any) => ({ ...r, is_concursos: isConcursos }))
                        set({ responses: withFlag })
                        console.log(`Loaded ${data.length} global responses from Supabase (${table})`)
                    }
                } catch (err: any) {
                    console.error('Error loading all responses:', err.message)
                }
            },

            get_accuracy_by_specialty: (specialty_id: string) => {
                const relevant = get().responses.filter(r => r.specialty_id === specialty_id)
                if (relevant.length === 0) return 0
                const correct = relevant.filter(r => r.is_correct).length
                return Math.round((correct / relevant.length) * 100)
            },

            get_weekly_data: () => {
                const today = new Date()
                const last_7_days = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i))

                return last_7_days.map(date => {
                    const day_label = format(date, 'EEE', { locale: ptBR })
                    const formatted_label = day_label.charAt(0).toUpperCase() + day_label.slice(1)

                    const count = get().responses.filter(r =>
                        isSameDay(safeParseDate(r.timestamp), date)
                    ).length

                    return {
                        day: formatted_label.replace('.', ''),
                        count
                    }
                })
            },

            get_probability_of_passing: () => {
                const total = get().responses.length
                if (total === 0) return 0
                const accuracy = (get().responses.filter(r => r.is_correct).length / total) * 100
                const confidence = Math.min(total / 100, 1)
                const base_prob = Math.min(Math.round((accuracy / 85) * 100), 100)

                return Math.round(base_prob * confidence)
            },

            get_daily_mission: () => {
                return ['q1', 'q2']
            },

            reset_metrics: () => {
                set({ responses: [], error_notebook: [] })
                const isConcursos = typeof window !== 'undefined' && window.location.pathname.startsWith('/concursos')
                const table = isConcursos ? 'concurso_user_respostas' : 'user_responses'

                if (isSupabaseConfigured()) {
                    supabase.auth.getUser().then(({ data: { user } }) => {
                        if (user) {
                            supabase.from(table).delete().eq('user_id', user.id).then(({ error }) => {
                                if (error) console.error('Error resetting Supabase metrics:', error)
                            })
                        }
                    })
                }
            }
        }),
        {
            name: 'qrub-quiz-storage',
        }
    )
)
