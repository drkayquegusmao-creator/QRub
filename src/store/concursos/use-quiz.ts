import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { subDays, format, isSameDay } from 'date-fns'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { ptBR } from 'date-fns/locale'
import { safeParseDate } from '@/lib/date-utils'

export interface ConcursoUserResponse {
    id: string
    user_id: string
    question_id: string
    disciplina_id: string
    assunto_id?: string
    is_correct: boolean
    tempo_resposta_segundos?: number
    timestamp: string
}

interface ErrorItem {
    question_id: string
    disciplina_id: string
    review_count: number
    next_review_date: string // ISO string
}

interface ConcursoQuizState {
    responses: ConcursoUserResponse[]
    error_notebook: ErrorItem[]
    add_response: (response: ConcursoUserResponse) => Promise<void>
    get_accuracy_by_disciplina: (disciplina_id: string) => number
    get_weekly_data: () => { day: string; count: number }[]
    get_weekly_accuracy: () => { day: string; accuracy: number }[]
    load_responses: (userId: string) => Promise<void>
}

export const useConcursoQuiz = create<ConcursoQuizState>()(
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
                const { useUserStats } = await import('../use-user-stats')
                if (response.user_id) {
                    useUserStats.getState().updateStats(response.user_id, response.is_correct, true)
                }

                if (isSupabaseConfigured()) {
                    try {
                        await supabase
                            .from('concurso_user_respostas')
                            .insert({
                                user_id: response.user_id,
                                question_id: response.question_id,
                                disciplina_id: response.disciplina_id,
                                assunto_id: response.assunto_id,
                                is_correct: response.is_correct,
                                tempo_resposta_segundos: response.tempo_resposta_segundos,
                                timestamp: response.timestamp
                            })
                    } catch (err) {
                        console.warn('Could not save response to Supabase (saved locally):', err)
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
                                disciplina_id: response.disciplina_id,
                                review_count: 0,
                                next_review_date: new Date(Date.now() + 86400000).toISOString()
                            })
                        }
                    }

                    return { responses: new_responses, error_notebook: new_error_notebook }
                })
            },

            load_responses: async (userId) => {
                if (!isSupabaseConfigured() || !userId) return

                try {
                    const { data, error } = await supabase
                        .from('concurso_user_respostas')
                        .select('*')
                        .eq('user_id', userId)
                        .order('timestamp', { ascending: true })

                    if (error) throw error
                    if (data) set({ responses: data })
                } catch (err) {
                    console.error('Error loading concurso responses:', err)
                }
            },

            get_accuracy_by_disciplina: (disciplina_id) => {
                const relevant = get().responses.filter(r => r.disciplina_id === disciplina_id)
                if (relevant.length === 0) return 0
                const correct = relevant.filter(r => r.is_correct).length
                return Math.round((correct / relevant.length) * 100)
            },

            get_weekly_data: () => {
                const today = new Date()
                const last_7_days = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i))

                return last_7_days.map(date => {
                    const day_label = format(date, 'EEE', { locale: ptBR })
                    const count = get().responses.filter(r =>
                        isSameDay(safeParseDate(r.timestamp), date)
                    ).length
                    return { day: day_label, count }
                })
            }
        }),
        {
            name: 'qrub-concurso-quiz-storage',
        }
    )
)
