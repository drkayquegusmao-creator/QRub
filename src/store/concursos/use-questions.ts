import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export interface ConcursoQuestion {
    id: string
    area_id: string
    disciplina_id: string
    subdisciplina_id: string
    assunto_id: string
    banca_id: string
    orgao?: string
    cargo?: string
    ano?: number
    difficulty: 'facil' | 'media' | 'dificil'
    enunciado: string
    comando?: string
    options: Array<{ id: string, text: string }>
    correct_option_id: string
    explanation?: string
    por_que_nao_as_outras?: Record<string, string>
    metadata?: any
    image_url?: string
    status: 'active' | 'archived'
}

export interface QuestionMeta {
    id: string
    area_id: string | null
    disciplina_id: string | null
    subdisciplina_id: string | null
    assunto_id: string | null
    banca_id: string | null
}

interface ConcursoQuestionsState {
    questions: ConcursoQuestion[]
    questionsMeta: QuestionMeta[]
    totalCount: number
    loading: boolean
    loadingMeta: boolean
    error: string | null
    loadQuestions: (filters?: {
        area_id?: string,
        disciplina_id?: string,
        subdisciplina_id?: string,
        assunto_id?: string,
        difficulty?: string,
        banca_id?: string,
        searchTerm?: string,
        page?: number,
        pageSize?: number,
        packageId?: string
    }) => Promise<void>
    loadAllQuestionsMeta: () => Promise<void>
    setQuestions: (questions: ConcursoQuestion[]) => void
}

export const useConcursoQuestions = create<ConcursoQuestionsState>()((set, get) => ({
    questions: [],
    questionsMeta: [],
    totalCount: 0,
    loading: false,
    loadingMeta: false,
    error: null,

    loadAllQuestionsMeta: async () => {
        if (!isSupabaseConfigured()) return
        if (get().loadingMeta) return
        set({ loadingMeta: true })

        try {
            const BATCH = 1000
            const allMeta: QuestionMeta[] = []
            let from = 0
            let keepGoing = true

            while (keepGoing) {
                const { data, error } = await supabase
                    .from('concurso_questao_base')
                    .select('id, area_id, disciplina_id, subdisciplina_id, assunto_id, banca_id')
                    .eq('status', 'active')
                    .range(from, from + BATCH - 1)

                if (error) throw error

                if (data && data.length > 0) {
                    allMeta.push(...(data as QuestionMeta[]))
                    from += BATCH
                    if (data.length < BATCH) keepGoing = false
                } else {
                    keepGoing = false
                }
            }

            set({ questionsMeta: allMeta, totalCount: allMeta.length, loadingMeta: false })
        } catch (err: any) {
            console.error('Error loading questions meta:', err)
            set({ loadingMeta: false })
        }
    },

    loadQuestions: async (filters) => {
        if (!isSupabaseConfigured()) return
        set({ loading: true, error: null })

        try {
            const page = filters?.page ?? 1
            const pageSize = filters?.pageSize ?? 20
            const from = (page - 1) * pageSize
            const to = from + pageSize - 1

            let query = supabase
                .from('concurso_questao_base')
                .select('*', { count: 'exact' })

            if (filters?.area_id) query = query.eq('area_id', filters.area_id)
            if (filters?.disciplina_id) query = query.eq('disciplina_id', filters.disciplina_id)
            if (filters?.subdisciplina_id) query = query.eq('subdisciplina_id', filters.subdisciplina_id)
            if (filters?.assunto_id) query = query.eq('assunto_id', filters.assunto_id)
            if (filters?.difficulty) query = query.eq('difficulty', filters.difficulty)
            if (filters?.banca_id) query = query.eq('banca_id', filters.banca_id)
            if (filters?.searchTerm) query = query.ilike('enunciado', `%${filters.searchTerm}%`)

            if (pageSize > 0) {
                query = query.range(from, to)
            }
            
            const { data, error, count } = await query
                .order('created_at', { ascending: false })

            if (error) throw error

            set({
                questions: data || [],
                totalCount: count || 0,
                loading: false
            })
        } catch (err: any) {
            set({ error: err.message, loading: false })
        }
    },

    setQuestions: (questions: ConcursoQuestion[]) => set({ questions, totalCount: questions.length, loading: false })
}))
