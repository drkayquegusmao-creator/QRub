
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
        specialty_id?: string,
        subspecialty_id?: string,
        subject_id?: string
    }) => Promise<void>
    loadGuidelines: () => Promise<void>
    addQuestion: (question: Omit<Question, 'id'>) => Promise<{ success: boolean, message: string }>
    addQuestions: (questions: Question[]) => Promise<{ success: boolean, message: string }>
    deleteQuestion: (id: string) => Promise<{ success: boolean, message: string }>
    generateQuestions: (params: {
        specialty_id: string
        subspecialty_id?: string
        subject_id?: string
        count: number
        difficulty?: "Fácil" | "Médio" | "Difícil"
        blueprint_id?: string
        study_box_id?: string
    }) => Promise<{ success: boolean, message: string, generated?: number }>
}

export const useQuestions = create<QuestionsState>()(
    (set, get) => ({
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
                        if (filters?.specialty_id) query = query.eq('specialty_id', filters.specialty_id)
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
            } catch (err: any) {
                set({ error: err.message, loading: false })
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
                    .insert([question])
                    .select()

                if (error) throw error

                set((state) => ({
                    questions: [data[0], ...state.questions]
                }))

                return { success: true, message: 'Questão salva com sucesso!' }
            } catch (err: any) {
                return { success: false, message: err.message || 'Erro ao salvar questão' }
            }
        },

        addQuestions: async (questions) => {
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

                const { data, error } = await supabase
                    .from('questions')
                    .insert(questions)
                    .select()

                if (error) throw error

                set((state) => ({
                    questions: [...(data || []), ...state.questions]
                }))

                return { success: true, message: `${questions.length} questões importadas com sucesso!` }
            } catch (err: any) {
                return { success: false, message: err.message || 'Erro ao importar questões' }
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
            } catch (err: any) {
                return { success: false, message: err.message || 'Erro ao remover questão' }
            }
        },

        generateQuestions: async ({ specialty_id, subspecialty_id, subject_id, count, difficulty, blueprint_id, study_box_id }) => {
            set({ loading: true })
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
                        enunciado: study_box_id
                            ? `[Questão de Edital] Paciente apresenta quadro clínico baseado na caixinha ${study_box_id}.`
                            : `[Questão Clínica #${i + 1}] Paciente apresenta quadro clínico seguindo os novos padrões QRub para ${specialty_id}.`,
                        case_study: {
                            history: "Identificação: ... Queixa principal: ... Tempo de evolução: ...",
                            physical_exam: "Sinais Vitais decimais (ex: 36,5 °C). FC: 80 bpm. PA: 120/80 mmHg.",
                            lab_results: "Exames em g/dL, /mm³."
                        },
                        options: [
                            { id: 'a', text: 'Conduta baseada em diretriz do edital' },
                            { id: 'b', text: 'Distrator 1' },
                            { id: 'c', text: 'Distrator 2' },
                            { id: 'd', text: 'Distrator 3' },
                            { id: 'e', text: 'Distrator 4' }
                        ],
                        correct_option_id: 'a',
                        explanation: 'Explicação detalhada citando a diretriz oficial contida no perfil do edital.',
                        blueprint_id,
                        study_box_id,
                        metadata: {
                            origem: 'Gerada via PDF/Edital – QRub',
                            data_geracao: new Date().toISOString(),
                            tema: finalSubject
                        }
                    }

                    generatedQuestions.push(question)
                }

                if (isSupabaseConfigured()) {
                    const { error } = await supabase.from('questions').insert(generatedQuestions)
                    if (error) throw error
                }

                set(state => ({
                    questions: [...generatedQuestions, ...state.questions],
                    loading: false
                }))

                return {
                    success: true,
                    message: `${count} questões geradas com sucesso!`,
                    generated: count
                }
            } catch (err: any) {
                console.error('Erro na geração:', err)
                set({ loading: false })
                return {
                    success: false,
                    message: err.message || 'Erro ao gerar questões'
                }
            }
        }
    })
)
