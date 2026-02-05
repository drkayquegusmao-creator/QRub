
import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Question, Guideline } from '@/lib/data-mock'

interface QuestionsState {
    questions: Question[]
    guidelines: Guideline[]
    loading: boolean
    error: string | null
    loadQuestions: (filters?: {
        course_id?: string,
        specialty_id?: string | string[],
        subspecialty_id?: string,
        subject_id?: string
    }) => Promise<void>
    loadGuidelines: () => Promise<void>
    addQuestion: (question: Question | Partial<Question>) => Promise<{ success: boolean, message: string }>
    addQuestions: (questions: Question[]) => Promise<{ success: boolean, message: string }>
    deleteQuestion: (id: string) => Promise<{ success: boolean, message: string }>
    deleteQuestions: (ids: string[]) => Promise<{ success: boolean, message: string }>
    setEphemeralQuestions: (questions: Question[]) => void
}

export const useQuestions = create<QuestionsState>()(
    (set) => ({
        questions: [],
        guidelines: [],
        loading: false,
        error: null,

        loadQuestions: async (filters) => {
            set({ loading: true, error: null })

            try {
                if (isSupabaseConfigured()) {
                    let allQuestions: Question[] = []
                    let hasMore = true
                    let page = 0
                    const pageSize = 1000

                    while (hasMore && allQuestions.length < 20000) {
                        let query = supabase.from('questions').select('*')

                        if (filters?.course_id) query = query.eq('course_id', filters.course_id)

                        if (filters?.specialty_id) {
                            if (Array.isArray(filters.specialty_id)) {
                                query = query.in('specialty_id', filters.specialty_id)
                            } else {
                                query = query.eq('specialty_id', filters.specialty_id)
                            }
                        }

                        if (filters?.subspecialty_id) query = query.eq('subspecialty_id', filters.subspecialty_id)
                        if (filters?.subject_id) query = query.eq('subject_id', filters.subject_id)

                        const { data, error } = await query
                            .order('created_at', { ascending: false })
                            .range(page * pageSize, (page + 1) * pageSize - 1)

                        if (error) throw error

                        if (data) {
                            allQuestions = [...allQuestions, ...data]
                            if (data.length < pageSize) {
                                hasMore = false
                            } else {
                                page++
                            }
                        } else {
                            hasMore = false
                        }
                    }

                    set({ questions: allQuestions, loading: false })
                }
            } catch (err: unknown) {
                set({ error: err instanceof Error ? err.message : String(err), loading: false })
            }
        },

        loadGuidelines: async () => {
            try {
                const { data, error } = await supabase
                    .from('guidelines')
                    .select('*')
                    .order('name')

                if (error) throw error
                set({ guidelines: data || [] })
            } catch (error) {
                console.error('Error loading guidelines:', error)
            }
        },

        addQuestion: async (question) => {
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

                const { data, error } = await supabase
                    .from('questions')
                    .upsert([question])
                    .select()

                if (error) throw error

                set((state) => {
                    const exists = state.questions.findIndex(q => q.id === data[0].id)
                    let newQuestions = [...state.questions]
                    if (exists >= 0) {
                        newQuestions[exists] = data[0]
                    } else {
                        newQuestions = [data[0], ...newQuestions]
                    }
                    return { questions: newQuestions }
                })

                return { success: true, message: 'Questão salva com sucesso!' }
            } catch (err: unknown) {
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao salvar questão' }
            }
        },

        addQuestions: async (questions) => {
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

                const { data, error } = await supabase
                    .from('questions')
                    .upsert(questions)
                    .select()

                if (error) throw error

                set((state) => {
                    const incomingIds = new Set((data || []).map(q => q.id))
                    const filteredOld = state.questions.filter(q => !incomingIds.has(q.id))
                    return { questions: [...(data || []), ...filteredOld] }
                })

                return { success: true, message: `${questions.length} questões processadas com sucesso!` }
            } catch (err: unknown) {
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao importar questões' }
            }
        },

        deleteQuestion: async (id) => {
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

                const { error } = await supabase
                    .from('questions')
                    .delete()
                    .eq('id', id)

                if (error) {
                    if (error.code === '23503') {
                        throw new Error('Esta questão possui respostas de usuários e não pode ser excluída para manter a integridade dos dados.')
                    }
                    throw error
                }

                set((state) => ({
                    questions: state.questions.filter(q => q.id !== id)
                }))

                return { success: true, message: 'Questão removida com sucesso!' }
            } catch (err: unknown) {
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao remover questão' }
            }
        },

        deleteQuestions: async (ids: string[]) => {
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')
                if (ids.length === 0) return { success: true, message: 'Nenhuma questão para remover.' }

                // Batch into chunks of 50 to avoid URL length limits in the Supabase API
                const CHUNK_SIZE = 50
                for (let i = 0; i < ids.length; i += CHUNK_SIZE) {
                    const chunk = ids.slice(i, i + CHUNK_SIZE)
                    const { error } = await supabase
                        .from('questions')
                        .delete()
                        .in('id', chunk)

                    if (error) {
                        console.error(`Error deleting chunk ${i / CHUNK_SIZE}:`, error)
                        if (error.code === '23503') {
                            throw new Error('Algumas questões possuem vínculos e não puderam ser excluídas.')
                        }
                        throw error
                    }
                }

                set((state) => ({
                    questions: state.questions.filter(q => !ids.includes(q.id))
                }))

                return { success: true, message: `${ids.length} questões removidas com sucesso!` }
            } catch (err: unknown) {
                console.error('Core delete error:', err)
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao remover questões' }
            }
        },

        setEphemeralQuestions: (qs) => set({ questions: qs, loading: false })
    })
)
