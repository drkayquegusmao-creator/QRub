import { supabase } from '@/lib/supabase'

export type EditalStatus = 'rascunho' | 'publicado' | 'arquivado'

export interface Edital {
    id: string
    titulo: string
    banca?: string
    ano?: number
    status: EditalStatus
    pdf_url?: string
    fonte_url?: string
    texto_extraido?: string
    taxa?: number
    data_prova?: string
    data_inscricao_inicio?: string
    data_inscricao_fim?: string
    local_resumido?: string
    conteudo_programatico?: string
    etapas_regras?: string
    slug?: string
    area?: string
    total_questoes?: number
    created_by?: string
    created_at?: string
    updated_at?: string
    pdf_filename?: string
    pdf_hash?: string
    extracted_json?: any
    extraction_status?: string
    extraction_error?: string
}

export interface EditalEvento {
    id: string
    edital_id: string
    tipo_evento: string
    data_inicio?: string
    data_fim?: string
    observacao?: string
    link_relacionado?: string
    confianca_extracao?: number
}

export interface EditalLink {
    id: string
    edital_id: string
    tipo: string
    url: string
    rotulo: string
}

export interface EditalWithDetails extends Edital {
    edital_eventos?: EditalEvento[]
    edital_links?: EditalLink[]
}

export interface EditalQuestionFilter {
    id?: string
    edital_id: string
    banca_id?: string
    banca_nome?: string
    area_ids?: string[]
    disciplina_ids?: string[]
    tema_ids?: string[]
    default_difficulty?: 'facil' | 'media' | 'dificil' | 'mista'
    default_qty?: number
    updated_at?: string
}

// ─── READ ──────────────────────────────────────────────────────────────────

export async function getConcursoEditais(params?: {
    status?: EditalStatus
    banca?: string
    search?: string
    limit?: number
}) {
    try {
        let query = supabase
            .from('concurso_editais')
            .select('*')
            .order('created_at', { ascending: false })

        if (params?.status) query = query.eq('status', params.status)
        if (params?.banca) query = query.ilike('banca', `%${params.banca}%`)
        if (params?.search) {
            query = query.or(`titulo.ilike.%${params.search}%,banca.ilike.%${params.search}%`)
        }
        if (params?.limit) query = query.limit(params.limit)

        const { data, error } = await query
        if (error) throw error
        return { data: (data || []) as Edital[], error: null }
    } catch (err) {
        console.error('[concurso_editais] getEditais erro:', err)
        return { data: [] as Edital[], error: err }
    }
}

export async function getConcursoEditalById(id: string): Promise<{ data: EditalWithDetails | null; error: unknown }> {
    try {
        const { data, error } = await supabase
            .from('concurso_editais')
            .select(`
                *,
                edital_eventos:concurso_edital_eventos(*),
                edital_links:concurso_edital_links(*)
            `)
            .eq('id', id)
            .single()

        if (error) throw error
        return { data: data as EditalWithDetails, error: null }
    } catch (err) {
        console.error('[concurso_editais] getEditalById erro:', err)
        return { data: null, error: err }
    }
}

// ─── CREATE / UPDATE ───────────────────────────────────────────────────────

export async function createConcursoEdital(payload: Partial<Edital>) {
    try {
        const { data, error } = await supabase
            .from('concurso_editais')
            .insert({ ...payload, status: payload.status ?? 'rascunho' })
            .select()
            .single()

        if (error) throw error
        await logConcursoAdminAction('CREATE_EDITAL', 'editais', data.id, { titulo: data.titulo })
        return { data, error: null }
    } catch (err) {
        console.error('[concurso_editais] createEdital erro:', err)
        return { data: null, error: err }
    }
}

export async function updateConcursoEdital(id: string, payload: Partial<Edital>) {
    try {
        const { data, error } = await supabase
            .from('concurso_editais')
            .update(payload)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        await logConcursoAdminAction('UPDATE_EDITAL', 'editais', id, { campos: Object.keys(payload) })
        return { data, error: null }
    } catch (err) {
        console.error('[concurso_editais] updateEdital erro:', err)
        return { data: null, error: err }
    }
}

export async function publishConcursoEdital(id: string) {
    return updateConcursoEdital(id, { status: 'publicado' })
}

export async function archiveConcursoEdital(id: string) {
    return updateConcursoEdital(id, { status: 'arquivado' })
}

export async function deleteConcursoEdital(id: string) {
    try {
        const { error } = await supabase.from('concurso_editais').delete().eq('id', id)
        if (error) throw error
        await logConcursoAdminAction('DELETE_EDITAL', 'editais', id, {})
        return { error: null }
    } catch (err) {
        console.error('[concurso_editais] deleteEdital erro:', err)
        return { error: err }
    }
}

// ─── EVENTOS ───────────────────────────────────────────────────────────────

export async function upsertConcursoEventos(editalId: string, eventos: Partial<EditalEvento>[]) {
    try {
        await supabase.from('concurso_edital_eventos').delete().eq('edital_id', editalId)
        if (eventos.length === 0) return { data: [], error: null }
        const { data, error } = await supabase
            .from('concurso_edital_eventos')
            .insert(eventos.map(e => ({ ...e, edital_id: editalId })))
            .select()
        if (error) throw error
        return { data, error: null }
    } catch (err) {
        console.error('[concurso_editais] upsertEventos erro:', err)
        return { data: [], error: err }
    }
}

// ─── LINKS ─────────────────────────────────────────────────────────────────

export async function upsertConcursoLinks(editalId: string, links: Partial<EditalLink>[]) {
    try {
        await supabase.from('concurso_edital_links').delete().eq('edital_id', editalId)
        if (links.length === 0) return { data: [], error: null }
        const { data, error } = await supabase
            .from('concurso_edital_links')
            .insert(links.map(l => ({ ...l, edital_id: editalId })))
            .select()
        if (error) throw error
        return { data, error: null }
    } catch (err) {
        console.error('[concurso_editais] upsertLinks erro:', err)
        return { data: [], error: err }
    }
}

// ─── QUESTÕES ──────────────────────────────────────────────────────────────

export async function vincularConcursoQuestao(editalId: string, questaoId: string) {
    try {
        const { error } = await supabase
            .from('concurso_edital_questoes')
            .upsert({ edital_id: editalId, questao_id: questaoId }, { onConflict: 'edital_id,questao_id' })

        if (error) throw error
        await logConcursoAdminAction('VINCULAR_QUESTAO', 'edital_questoes', editalId, { questao_id: questaoId })
        return { error: null }
    } catch (err) {
        console.error('[concurso_editais] vincularQuestao erro:', err)
        return { error: err }
    }
}

export async function desvincularConcursoQuestao(editalId: string, questaoId: string) {
    try {
        const { error } = await supabase
            .from('concurso_edital_questoes')
            .delete()
            .eq('edital_id', editalId)
            .eq('questao_id', questaoId)

        if (error) throw error
        return { error: null }
    } catch (err) {
        console.error('[concurso_editais] desvincularQuestao erro:', err)
        return { error: err }
    }
}

// ─── EDITAL QUESTION FILTERS ───────────────────────────────────────────────

export async function getConcursoEditalFilters(editalId: string): Promise<{ data: EditalQuestionFilter | null; error: unknown }> {
    try {
        const { data, error } = await supabase
            .from('concurso_edital_question_filters')
            .select('*')
            .eq('edital_id', editalId)
            .maybeSingle()
        if (error) throw error
        return { data: data as EditalQuestionFilter | null, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function upsertConcursoEditalFilters(editalId: string, payload: Partial<EditalQuestionFilter>) {
    try {
        const { data, error } = await supabase
            .from('concurso_edital_question_filters')
            .upsert({ ...payload, edital_id: editalId, updated_at: new Date().toISOString() }, { onConflict: 'edital_id' })
            .select()
            .single()
        if (error) throw error
        await logConcursoAdminAction('UPSERT_EDITAL_FILTERS', 'edital_question_filters', editalId, {})
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

// ─── LOGS ──────────────────────────────────────────────────────────────────

export async function logConcursoAdminAction(
    acao: string,
    entidade: string,
    entidadeId: string,
    detalhes: Record<string, unknown> = {}
) {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        await supabase.from('logs_admin').insert({
            admin_id: user.id,
            acao: `CONCURSO_${acao}`,
            entidade: `concurso_${entidade}`,
            entidade_id: entidadeId,
            detalhes,
        })
    } catch {
        // Silently fail
    }
}

export function formatCurrency(value?: number | null): string {
    if (!value) return '—'
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function formatDate_BR(dateStr?: string | null): string {
    if (!dateStr) return '—'
    try {
        return new Date(dateStr + 'T12:00:00').toLocaleDateString('pt-BR')
    } catch {
        return dateStr
    }
}
