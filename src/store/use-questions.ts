
import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Question, Guideline } from '@/lib/data-mock'


interface QuestionsState {
    questions: Question[]
    totalCount: number
    currentPage: number
    pageSize: number
    guidelines: Guideline[]
    loading: boolean
    error: string | null
    loadQuestions: (filters?: {
        course_id?: string,
        specialty_id?: string | string[],
        subspecialty_id?: string,
        subject_id?: string,
        status_validacao?: 'PENDENTE' | 'APROVADA' | 'REPROVADA',
        searchTerm?: string,
        page?: number,
        pageSize?: number
    }) => Promise<void>
    loadGuidelines: () => Promise<void>
    addQuestion: (question: Question | Partial<Question>) => Promise<{ success: boolean, message: string }>
    addQuestions: (questions: Question[]) => Promise<{ success: boolean, message: string }>
    deleteQuestion: (id: string) => Promise<{ success: boolean, message: string }>
    deleteQuestions: (ids: string[]) => Promise<{ success: boolean, message: string }>
    fetchAllQuestions: () => Promise<Question[]>
    fetchQuestionById: (id: string) => Promise<Question | null>
    setEphemeralQuestions: (questions: Question[]) => void
}

export const useQuestions = create<QuestionsState>()(
    (set) => ({
        questions: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 100,
        guidelines: [],
        loading: false,
        error: null,

        loadQuestions: async (filters) => {
            set({ loading: true, error: null })

            try {
                if (isSupabaseConfigured()) {
                    const page = filters?.page || 1
                    const pageSize = filters?.pageSize || 100

                    // SPECIALTY MAPPING LOGIC
                    // Alguns "subespecialidades" de Clínica Médica são armazenadas como "specialty_id" no banco
                    const REAL_SPECIALTIES_MAPPED_AS_SUBS = [
                        'cardiologia', 'endocrinologia', 'gastroenterologia', 'geriatria',
                        'hematologia', 'infectologia', 'nefrologia', 'pneumologia',
                        'reumatologia', 'oncologia-clinica'
                    ]

                    let targetSpecialtyIds: string[] = []
                    if (filters?.specialty_id) {
                        if (Array.isArray(filters.specialty_id)) {
                            targetSpecialtyIds = [...filters.specialty_id]
                        } else {
                            targetSpecialtyIds = [filters.specialty_id]
                        }
                    }

                    let targetSubspecialtyId = filters?.subspecialty_id

                    // 1. Se a subespecialidade selecionada for na verdade uma especialidade real no banco
                    if (targetSubspecialtyId && REAL_SPECIALTIES_MAPPED_AS_SUBS.includes(targetSubspecialtyId)) {
                        // Tratar como especialidade principal
                        targetSpecialtyIds = [targetSubspecialtyId]
                        targetSubspecialtyId = undefined // Limpar filtro de subespecialidade pois o banco não usa assim
                    }

                    // 2. Expansão de "Clínica Médica"
                    // Se estiver filtrando por CM, incluir também todas as especialidades filhas
                    if (targetSpecialtyIds.includes('clinica-medica')) {
                        targetSpecialtyIds.push(...REAL_SPECIALTIES_MAPPED_AS_SUBS)
                    }

                    // Remover duplicatas e IDs vazios
                    targetSpecialtyIds = Array.from(new Set(targetSpecialtyIds)).filter(Boolean)


                    // 1. Primeiro, obter o count total (sem carregar os dados)
                    let countQuery = supabase.from('questao_base').select('*', { count: 'exact', head: true })

                    if (filters?.course_id) countQuery = countQuery.eq('course_id', filters.course_id)

                    if (targetSpecialtyIds.length > 0) {
                        countQuery = countQuery.in('specialty_id', targetSpecialtyIds)
                    }

                    if (targetSubspecialtyId) countQuery = countQuery.eq('subspecialty_id', targetSubspecialtyId)
                    if (filters?.subject_id) countQuery = countQuery.eq('subject_id', filters.subject_id)
                    if (filters?.status_validacao) countQuery = countQuery.eq('status_validacao', filters.status_validacao)
                    if (filters?.searchTerm) countQuery = countQuery.ilike('enunciado', `%${filters.searchTerm}%`)

                    const { count, error: countError } = await countQuery

                    if (countError) throw countError

                    // 2. Depois, carregar apenas a página atual
                    let dataQuery = supabase.from('questao_base').select('*')

                    if (filters?.course_id) dataQuery = dataQuery.eq('course_id', filters.course_id)

                    if (targetSpecialtyIds.length > 0) {
                        dataQuery = dataQuery.in('specialty_id', targetSpecialtyIds)
                    }

                    if (targetSubspecialtyId) dataQuery = dataQuery.eq('subspecialty_id', targetSubspecialtyId)
                    if (filters?.subject_id) dataQuery = dataQuery.eq('subject_id', filters.subject_id)
                    if (filters?.status_validacao) dataQuery = dataQuery.eq('status_validacao', filters.status_validacao)
                    if (filters?.searchTerm) dataQuery = dataQuery.ilike('enunciado', `%${filters.searchTerm}%`)

                    const startIndex = (page - 1) * pageSize
                    const endIndex = startIndex + pageSize - 1

                    const { data, error } = await dataQuery
                        .order('created_at', { ascending: false })
                        .range(startIndex, endIndex)

                    if (error) throw error

                    console.log(`✅ Carregadas ${data?.length || 0} questões (página ${page}) de ${count} total`)

                    set({
                        questions: data || [],
                        totalCount: count || 0,
                        currentPage: page,
                        pageSize: pageSize,
                        loading: false
                    })
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
                    .from('questao_base')
                    .upsert([question])
                    .select()

                if (error) throw error

                set((state) => {
                    const exists = state.questions.findIndex(q => q.id === data[0].id)
                    let newQuestions = [...state.questions]
                    let newTotalCount = state.totalCount
                    if (exists >= 0) {
                        newQuestions[exists] = data[0]
                    } else {
                        newQuestions = [data[0], ...newQuestions]
                        newTotalCount++
                    }
                    return { questions: newQuestions, totalCount: newTotalCount }
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
                    .from('questao_base')
                    .upsert(questions)
                    .select()

                if (error) throw error

                set((state) => {
                    const incomingIds = new Set((data || []).map(q => q.id))
                    const filteredOld = state.questions.filter(q => !incomingIds.has(q.id))
                    const newCount = filteredOld.length + (data || []).length
                    return { questions: [...(data || []), ...filteredOld], totalCount: newCount }
                })

                return { success: true, message: `${questions.length} questões processadas com sucesso!` }
            } catch (err: unknown) {
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao importar questões' }
            }
        },

        deleteQuestion: async (id) => {
            console.log(`🗑️ Store: Iniciando deleção da questão: ${id}`)
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

                const { error, count } = await supabase
                    .from('questao_base')
                    .delete({ count: 'exact' })
                    .eq('id', id)

                if (error) {
                    console.error(`❌ Erro Supabase ao deletar ${id}:`, error)
                    if (error.code === '23503') {
                        throw new Error('Esta questão possui respostas de usuários e não pode ser excluída para manter a integridade dos dados.')
                    }
                    throw error
                }

                console.log(`✅ Store: Deleção concluída no banco para ${id}`)

                set((state) => {
                    const newQuestions = state.questions.filter(q => q.id !== id)
                    const wasRemoved = newQuestions.length < state.questions.length
                    return {
                        questions: newQuestions,
                        totalCount: wasRemoved ? Math.max(0, state.totalCount - 1) : state.totalCount
                    }
                })

                return { success: true, message: 'Questão removida com sucesso!' }
            } catch (err: unknown) {
                console.error(`💥 Store: Exceção ao deletar ${id}:`, err)
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao remover questão' }
            }
        },

        deleteQuestions: async (ids: string[]) => {
            console.log(`🗑️ Store: Iniciando deleção em massa de ${ids.length} questões...`)
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')
                if (ids.length === 0) return { success: true, message: 'Nenhuma questão para remover.' }

                const CHUNK_SIZE = 50
                for (let i = 0; i < ids.length; i += CHUNK_SIZE) {
                    const chunk = ids.slice(i, i + CHUNK_SIZE)
                    console.log(`🗑️ Store: Deletando fragmento ${i / CHUNK_SIZE + 1} de ${Math.ceil(ids.length / CHUNK_SIZE)}...`)
                    const { error } = await supabase
                        .from('questao_base')
                        .delete()
                        .in('id', chunk)

                    if (error) throw error
                }

                console.log(`✅ Store: Deleção em massa concluída para ${ids.length} questões.`)

                set((state) => {
                    const remainingQuestions = state.questions.filter(q => !ids.includes(q.id))
                    const removedInPageCount = state.questions.length - remainingQuestions.length

                    // Note: This logic assumes all 'ids' were present in the total database.
                    // If some IDs were already deleted or didn't exist, totalCount decrease might slightly drift.
                    // But usually, IDs come from the current state/selection.
                    return {
                        questions: remainingQuestions,
                        totalCount: Math.max(0, state.totalCount - ids.length)
                    }
                })

                return { success: true, message: `${ids.length} questões removidas com sucesso!` }
            } catch (err: unknown) {
                console.error('💥 Store: Erro na deleção em massa:', err)
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao remover questões' }
            }
        },

        fetchAllQuestions: async () => {
            if (!isSupabaseConfigured()) return []
            console.log('📦 Buscando todas as questões para backup...')

            let allData: Question[] = []
            let from = 0
            const step = 1000
            let hasMore = true

            try {
                while (hasMore) {
                    const { data, error } = await supabase
                        .from('questao_base')
                        .select('*')
                        .range(from, from + step - 1)
                        .order('created_at', { ascending: false })

                    if (error) throw error
                    if (!data || data.length === 0) {
                        hasMore = false
                    } else {
                        allData = [...allData, ...data]
                        from += step
                        if (data.length < step) hasMore = false
                    }
                }
                console.log(`✅ ${allData.length} questões carregadas com sucesso.`)
                return allData
            } catch (error) {
                console.error('❌ Erro ao buscar todas as questões:', error)
                return []
            }
        },

        fetchQuestionById: async (id: string) => {
            if (!isSupabaseConfigured()) return null
            try {
                const { data, error } = await supabase
                    .from('questao_base')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                return data
            } catch (err) {
                console.error('Error fetching question by id:', err)
                return null
            }
        },

        setEphemeralQuestions: (qs) => set({ questions: qs, loading: false })
    })
)
