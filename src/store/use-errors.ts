import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export interface ErrorItem {
    id: string
    questao_id: string
    user_id: string
    specialty_id: string
    subspecialty_id?: string
    tema: string
    assunto_id: string
    tipo_de_erro: 'conhecimento' | 'interpretacao' | 'conduta' | 'distracao'
    status: 'ativo' | 'em_revisao' | 'resolvido'
    nivel_de_gravidade: 'leve' | 'moderado' | 'crítico'
    contador_de_repeticao: number
    data_ultimo_erro: string
    proxima_revisao: string
    enunciado?: string
    assunto_nome?: string
}

interface ErrorState {
    errors: ErrorItem[]
    loading: boolean
    syncing: boolean
    loadErrors: (userId: string) => Promise<void>
    addToNotebook: (userId: string, question: any, options?: { isManual?: boolean, markedOption?: string }) => Promise<void>
    removeFromNotebook: (id: string) => Promise<void>
    isInNotebook: (questionId: string) => boolean
}

export const useErrors = create<ErrorState>((set, get) => ({
    errors: [],
    loading: false,
    syncing: false,

    loadErrors: async (userId) => {
        if (!isSupabaseConfigured()) return
        set({ loading: true })
        try {
            const { data, error } = await supabase
                .from('caderno_erros')
                .select(`
                    *,
                    assuntos (nome),
                    questao_base (enunciado)
                `)
                .eq('user_id', userId)
                .neq('status', 'resolvido')
                .order('created_at', { ascending: false })

            if (error) throw error

            const mapeados: ErrorItem[] = data?.map((e: any) => ({
                ...e,
                enunciado: e.questao_base?.enunciado,
                assunto_nome: e.assuntos?.nome
            })) || []

            set({ errors: mapeados })
        } catch (err) {
            console.error('Failed to load error notebook:', err)
        } finally {
            set({ loading: false })
        }
    },

    addToNotebook: async (userId, question, options = {}) => {
        if (!isSupabaseConfigured()) return
        if (get().isInNotebook(question.id)) return

        set({ syncing: true })
        try {
            const { data, error } = await supabase
                .from('caderno_erros')
                .insert({
                    user_id: userId,
                    questao_id: question.id,
                    specialty_id: question.specialty_id,
                    subspecialty_id: question.subspecialty_id,
                    tema: question.subject_id,
                    assunto_id: question.subject_id, // assuming same for now
                    tipo_de_erro: options.isManual ? 'distracao' : 'conhecimento',
                    alternativa_marcada: options.markedOption,
                    alternativa_correta: question.correct_option_id,
                    status: 'ativo',
                    nivel_de_gravidade: options.isManual ? 'leve' : 'moderado',
                    contador_de_repeticao: 1,
                    data_primeiro_erro: new Date().toISOString(),
                    data_ultimo_erro: new Date().toISOString(),
                    proxima_revisao: new Date(Date.now() + 86400000).toISOString() // 1 day later
                })
                .select()
                .single()

            if (error) throw error

            if (data) {
                // Fetch extra info for state
                const { data: fullData } = await supabase
                    .from('caderno_erros')
                    .select('*, assuntos(nome), questao_base(enunciado)')
                    .eq('id', data.id)
                    .single()

                const newItem: ErrorItem = {
                    ...fullData,
                    enunciado: fullData.questao_base?.enunciado,
                    assunto_nome: fullData.assuntos?.nome
                }
                set(state => ({ errors: [newItem, ...state.errors] }))
            }
        } catch (err) {
            console.error('Failed to add to notebook:', err)
        } finally {
            set({ syncing: false })
        }
    },

    removeFromNotebook: async (id) => {
        if (!isSupabaseConfigured()) return
        try {
            const { error } = await supabase
                .from('caderno_erros')
                .delete()
                .eq('id', id)

            if (error) throw error
            set(state => ({ errors: state.errors.filter(e => e.id !== id) }))
        } catch (err) {
            console.error('Failed to remove from notebook:', err)
        }
    },

    isInNotebook: (questionId) => {
        return get().errors.some(e => e.questao_id === questionId)
    }
}))
