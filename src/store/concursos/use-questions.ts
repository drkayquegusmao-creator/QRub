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

interface ConcursoQuestionsState {
    questions: ConcursoQuestion[]
    totalCount: number
    loading: boolean
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
        pageSize?: number
    }) => Promise<void>
}

export const useConcursoQuestions = create<ConcursoQuestionsState>()((set) => ({
    questions: [],
    totalCount: 0,
    loading: false,
    error: null,

    loadQuestions: async (filters) => {
        if (!isSupabaseConfigured()) return
        set({ loading: true, error: null })

        try {
            const page = filters?.page || 1
            const pageSize = filters?.pageSize || 20
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
    }
}))
