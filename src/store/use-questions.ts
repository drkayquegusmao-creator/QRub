import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Question } from '@/lib/data-mock'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

interface QuestionsState {
    questions: Question[]
    loading: boolean
    error: string | null
    loadQuestions: () => Promise<void>
    addQuestion: (question: Omit<Question, 'id'>) => Promise<{ success: boolean, message: string }>
    addQuestions: (questions: Question[]) => Promise<{ success: boolean, message: string }>
    deleteQuestion: (id: string) => Promise<{ success: boolean, message: string }>
    generateQuestions: (params: {
        specialty_id: string
        subspecialty_id?: string
        subject_id?: string
        count: number
        difficulty?: "Fácil" | "Médio" | "Difícil"
    }) => Promise<{ success: boolean, message: string, generated?: number }>
}

export const useQuestions = create<QuestionsState>()(
    persist(
        (set, get) => ({
            questions: [],
            loading: false,
            error: null,

            loadQuestions: async () => {
                set({ loading: true, error: null })

                try {
                    if (isSupabaseConfigured()) {
                        let allQuestions: Question[] = []
                        let from = 0
                        let to = 999
                        let finished = false

                        while (!finished) {
                            const { data, error } = await supabase
                                .from('questions')
                                .select('*')
                                .order('created_at', { ascending: false })
                                .range(from, to)

                            if (error) throw error

                            if (data && data.length > 0) {
                                allQuestions = [...allQuestions, ...data]
                                if (data.length < 1000) {
                                    finished = true
                                } else {
                                    from += 1000
                                    to += 1000
                                }
                            } else {
                                finished = true
                            }
                        }

                        set({ questions: allQuestions, loading: false })
                    } else {
                        // Load from local storage (already persisted)
                        const { questions } = get()
                        if (questions.length === 0) {
                            const { QUESTIONS } = await import('@/lib/data-mock')
                            set({ questions: QUESTIONS, loading: false })
                        } else {
                            set({ loading: false })
                        }
                    }
                } catch (err: any) {
                    set({ error: err.message, loading: false })
                }
            },

            addQuestion: async (questionData: Omit<Question, 'id'>) => {
                try {
                    const newQuestion: Question = {
                        ...questionData,
                        id: `QRUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    }

                    if (isSupabaseConfigured()) {
                        // Save to Supabase
                        const { error } = await supabase
                            .from('questions')
                            .insert(newQuestion)

                        if (error) throw error
                    }

                    // Update local state
                    set((state) => ({
                        questions: [newQuestion, ...state.questions]
                    }))

                    return { success: true, message: 'Questão adicionada com sucesso!' }
                } catch (err: any) {
                    return { success: false, message: err.message || 'Erro ao adicionar questão' }
                }
            },

            addQuestions: async (newQuestions: Question[]) => {
                try {
                    if (isSupabaseConfigured()) {
                        // Bulk insert to Supabase
                        const { error } = await supabase
                            .from('questions')
                            .insert(newQuestions)

                        if (error) throw error
                    }

                    // Update local state by merging
                    set((state) => ({
                        questions: [...newQuestions, ...state.questions]
                    }))

                    return { success: true, message: `${newQuestions.length} questões adicionadas com sucesso!` }
                } catch (err: any) {
                    return { success: false, message: err.message || 'Erro ao adicionar lote de questões' }
                }
            },

            deleteQuestion: async (id) => {
                try {
                    if (isSupabaseConfigured()) {
                        // Delete from Supabase
                        const { error } = await supabase
                            .from('questions')
                            .delete()
                            .eq('id', id)

                        if (error) throw error
                    }

                    // Update local state
                    set((state) => ({
                        questions: state.questions.filter(q => q.id !== id)
                    }))

                    return { success: true, message: 'Questão removida com sucesso!' }
                } catch (err: any) {
                    return { success: false, message: err.message || 'Erro ao remover questão' }
                }
            },

            generateQuestions: async ({ specialty_id, subspecialty_id, subject_id, count, difficulty }) => {
                try {
                    const generatedQuestions: Question[] = []

                    for (let i = 0; i < count; i++) {
                        const finalSub = subspecialty_id || 'geral'
                        const finalSubject = subject_id || 'clinica'
                        const questionId = `QRUB-GEN-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`

                        const question: Question = {
                            id: questionId,
                            course_id: 'medicina',
                            specialty_id: specialty_id,
                            subspecialty_id: finalSub,
                            subject_id: finalSubject,
                            difficulty: (difficulty as any) || 'Médio',
                            enunciado: `[Questão #${i + 1}] Paciente apresenta quadro clínico de alta complexidade em ${specialty_id}${subspecialty_id ? ' (' + subspecialty_id + ')' : ''}. Com base nos protocolos mais recentes para ${finalSubject}, qual a conduta imediata?`,
                            options: [
                                { id: 'a', text: 'Opção A' },
                                { id: 'b', text: 'Opção B (Correta)' },
                                { id: 'c', text: 'Opção C' },
                                { id: 'd', text: 'Opção D' },
                                { id: 'e', text: 'Opção E' }
                            ],
                            correct_option_id: 'b',
                            explanation: 'Esta é uma questão gerada automaticamente para demonstração.'
                        }

                        generatedQuestions.push(question)
                    }

                    if (isSupabaseConfigured()) {
                        // Bulk insert to Supabase
                        const { error } = await supabase
                            .from('questions')
                            .insert(generatedQuestions)

                        if (error) throw error
                    }

                    // Update local state
                    set((state) => ({
                        questions: [...generatedQuestions, ...state.questions]
                    }))

                    return {
                        success: true,
                        message: `${count} questões geradas com sucesso!`,
                        generated: count
                    }
                } catch (err: any) {
                    return {
                        success: false,
                        message: err.message || 'Erro ao gerar questões'
                    }
                }
            }
        }),
        {
            name: 'qrub-questions-storage',
        }
    )
)
