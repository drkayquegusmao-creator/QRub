import { supabase } from './supabase'

export type ConcursoEditalStatus = 'rascunho' | 'publicado' | 'arquivado'

export interface ConcursoEdital {
    id: string
    titulo: string
    banca_id?: string
    ano?: number
    status: ConcursoEditalStatus
    pdf_url?: string
    total_questoes?: number
    data_prova?: string
    area_id?: string
    created_at?: string
}

export async function getConcursoEditais(params?: {
    status?: ConcursoEditalStatus
    searchTerm?: string
}) {
    let query = supabase
        .from('concurso_editais')
        .select('*')
        .order('created_at', { ascending: false })

    if (params?.status) query = query.eq('status', params.status)
    if (params?.searchTerm) {
        query = query.ilike('titulo', `%${params.searchTerm}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data as ConcursoEdital[]
}

export async function getConcursoEditalById(id: string) {
    const { data, error } = await supabase
        .from('concurso_editais')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data as ConcursoEdital
}
