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

export interface EditalVersao {
    id: string
    edital_id: string
    versao: number
    descricao?: string
    created_at?: string
}

export interface EditalWithDetails extends Edital {
    edital_eventos?: EditalEvento[]
    edital_links?: EditalLink[]
    edital_versoes?: EditalVersao[]
    questoes_count?: number
    edital_question_filters?: EditalQuestionFilter
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

export async function getEditais(params?: {
    status?: EditalStatus
    banca?: string
    search?: string
    limit?: number
}) {
    try {
        let query = supabase
            .from('editais')
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
        console.error('[editais] getEditais erro:', err)
        return { data: [] as Edital[], error: err }
    }
}

export async function getEditalBySlug(slug: string): Promise<{ data: EditalWithDetails | null; error: unknown }> {
    try {
        const { data, error } = await supabase
            .from('editais')
            .select(`
        *,
        edital_eventos(*),
        edital_links(*),
        edital_versoes(*)
      `)
            .eq('slug', slug)
            .single()

        if (error) throw error
        return { data: data as EditalWithDetails, error: null }
    } catch (err) {
        console.error('[editais] getEditalBySlug erro:', err)
        return { data: null, error: err }
    }
}

export async function getEditalById(id: string): Promise<{ data: EditalWithDetails | null; error: unknown }> {
    try {
        const { data, error } = await supabase
            .from('editais')
            .select(`
        *,
        edital_eventos(*),
        edital_links(*),
        edital_versoes(*)
      `)
            .eq('id', id)
            .single()

        if (error) throw error
        return { data: data as EditalWithDetails, error: null }
    } catch (err) {
        console.error('[editais] getEditalById erro:', err)
        return { data: null, error: err }
    }
}

export async function getQuestoesDoEdital(editalId: string) {
    try {
        const { data, error } = await supabase
            .from('edital_questoes')
            .select(`
        questao_id,
        ordem,
        questao_base(id, enunciado, options, correct_option_id, explanation, difficulty, specialty_id)
      `)
            .eq('edital_id', editalId)
            .order('ordem')

        if (error) throw error
        return { data: data || [], error: null }
    } catch (err) {
        console.error('[editais] getQuestoesDoEdital erro:', err)
        return { data: [], error: err }
    }
}

// ─── CREATE / UPDATE ───────────────────────────────────────────────────────

export async function createEdital(payload: Partial<Edital>) {
    try {
        const { data, error } = await supabase
            .from('editais')
            .insert({ ...payload, status: payload.status ?? 'rascunho' })
            .select()
            .single()

        if (error) throw error
        await logAdminAction('CREATE_EDITAL', 'editais', data.id, { titulo: data.titulo })
        return { data, error: null }
    } catch (err) {
        console.error('[editais] createEdital erro:', err)
        return { data: null, error: err }
    }
}

export async function updateEdital(id: string, payload: Partial<Edital>) {
    try {
        const { data, error } = await supabase
            .from('editais')
            .update(payload)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        await logAdminAction('UPDATE_EDITAL', 'editais', id, { campos: Object.keys(payload) })
        return { data, error: null }
    } catch (err) {
        console.error('[editais] updateEdital erro:', err)
        return { data: null, error: err }
    }
}

export async function publishEdital(id: string) {
    return updateEdital(id, { status: 'publicado' })
}

export async function archiveEdital(id: string) {
    return updateEdital(id, { status: 'arquivado' })
}

// ─── EVENTOS ───────────────────────────────────────────────────────────────

export async function upsertEventos(editalId: string, eventos: Partial<EditalEvento>[]) {
    try {
        await supabase.from('edital_eventos').delete().eq('edital_id', editalId)

        if (eventos.length === 0) return { data: [], error: null }

        const { data, error } = await supabase
            .from('edital_eventos')
            .insert(eventos.map(e => ({ ...e, edital_id: editalId })))
            .select()

        if (error) throw error
        return { data, error: null }
    } catch (err) {
        console.error('[editais] upsertEventos erro:', err)
        return { data: [], error: err }
    }
}

// ─── LINKS ─────────────────────────────────────────────────────────────────

export async function upsertLinks(editalId: string, links: Partial<EditalLink>[]) {
    try {
        await supabase.from('edital_links').delete().eq('edital_id', editalId)

        if (links.length === 0) return { data: [], error: null }

        const { data, error } = await supabase
            .from('edital_links')
            .insert(links.map(l => ({ ...l, edital_id: editalId })))
            .select()

        if (error) throw error
        return { data, error: null }
    } catch (err) {
        console.error('[editais] upsertLinks erro:', err)
        return { data: [], error: err }
    }
}

// ─── QUESTÕES ──────────────────────────────────────────────────────────────

export async function vincularQuestao(editalId: string, questaoId: string) {
    try {
        const { error } = await supabase
            .from('edital_questoes')
            .upsert({ edital_id: editalId, questao_id: questaoId }, { onConflict: 'edital_id,questao_id' })

        if (error) throw error
        await logAdminAction('VINCULAR_QUESTAO', 'edital_questoes', editalId, { questao_id: questaoId })
        return { error: null }
    } catch (err) {
        console.error('[editais] vincularQuestao erro:', err)
        return { error: err }
    }
}

export async function desvincularQuestao(editalId: string, questaoId: string) {
    try {
        const { error } = await supabase
            .from('edital_questoes')
            .delete()
            .eq('edital_id', editalId)
            .eq('questao_id', questaoId)

        if (error) throw error
        return { error: null }
    } catch (err) {
        console.error('[editais] desvincularQuestao erro:', err)
        return { error: err }
    }
}

// ─── ALERTAS ───────────────────────────────────────────────────────────────

export async function toggleAlerta(editalId: string) {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Não autenticado')

        const { data: existing } = await supabase
            .from('edital_alertas')
            .select('id, ativo')
            .eq('edital_id', editalId)
            .eq('user_id', user.id)
            .single()

        if (existing) {
            const { error } = await supabase
                .from('edital_alertas')
                .update({ ativo: !existing.ativo })
                .eq('id', existing.id)
            if (error) throw error
            return { ativo: !existing.ativo, error: null }
        } else {
            const { error } = await supabase
                .from('edital_alertas')
                .insert({ edital_id: editalId, user_id: user.id, ativo: true })
            if (error) throw error
            return { ativo: true, error: null }
        }
    } catch (err) {
        console.error('[editais] toggleAlerta erro:', err)
        return { ativo: false, error: err }
    }
}

// ─── LOGS ──────────────────────────────────────────────────────────────────

export async function logAdminAction(
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
            acao,
            entidade,
            entidade_id: entidadeId,
            detalhes,
        })
    } catch {
        // Silently fail - logs are non-critical
    }
}

export async function uploadEditalPDF(file: File) {
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
    const { data, error } = await supabase.storage
        .from('editais')
        .upload(filename, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
        .from('editais')
        .getPublicUrl(filename)

    return { publicUrl, filename }
}

// ─── EXTRAÇÃO DE TEXTO ─────────────────────────────────────────────────────

export function extractEditalInfo(text: string): Partial<Edital> {
    const extracted: Partial<Edital> = { texto_extraido: text }

    const anoMatch = text.match(/\b(20\d{2})\b/)
    if (anoMatch) extracted.ano = parseInt(anoMatch[1])

    const taxaMatch = text.match(/taxa[^\n]*?R\$\s*([\d.,]+)/i) ||
        text.match(/inscri[çc]ão[^\n]*?R\$\s*([\d.,]+)/i)
    if (taxaMatch) {
        extracted.taxa = parseFloat(taxaMatch[1].replace(',', '.').replace('.', ''))
    }

    return extracted
}

export function extractEventos(text: string, editalId: string): Partial<EditalEvento>[] {
    const eventos: Partial<EditalEvento>[] = []
    const datePattern = /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/g
    const keywords = [
        { pattern: /inscri[çc][ãa]o/i, tipo: 'inscricao' },
        { pattern: /prova|avalia[çc]ão/i, tipo: 'prova' },
        { pattern: /resultado/i, tipo: 'resultado' },
        { pattern: /recurso/i, tipo: 'recurso' },
        { pattern: /isen[çc]ão/i, tipo: 'isencao' },
        { pattern: /gabarito/i, tipo: 'gabarito' },
    ]

    const lines = text.split('\n')
    for (const line of lines) {
        const dateMatches = line.match(datePattern)
        if (!dateMatches) continue

        for (const kw of keywords) {
            if (kw.pattern.test(line)) {
                eventos.push({
                    edital_id: editalId,
                    tipo_evento: kw.tipo,
                    data_inicio: formatDateISO(dateMatches[0]),
                    observacao: line.trim().substring(0, 200),
                    confianca_extracao: 70,
                })
                break
            }
        }
    }

    return eventos
}

function formatDateISO(dateStr: string): string {
    const parts = dateStr.split(/[\/\-]/)
    if (parts.length === 3) {
        const [day, month, year] = parts
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
    return dateStr
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

// ─── EDITAL QUESTION FILTERS ───────────────────────────────────────────────

export async function getEditalFilters(editalId: string): Promise<{ data: EditalQuestionFilter | null; error: unknown }> {
    try {
        const { data, error } = await supabase
            .from('edital_question_filters')
            .select('*')
            .eq('edital_id', editalId)
            .maybeSingle()
        if (error) throw error
        return { data: data as EditalQuestionFilter | null, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function upsertEditalFilters(editalId: string, payload: Partial<EditalQuestionFilter>) {
    try {
        const { data, error } = await supabase
            .from('edital_question_filters')
            .upsert({ ...payload, edital_id: editalId, updated_at: new Date().toISOString() }, { onConflict: 'edital_id' })
            .select()
            .single()
        if (error) throw error
        await logAdminAction('UPSERT_EDITAL_FILTERS', 'edital_question_filters', editalId, {})
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function getEditalById_WithFilters(id: string): Promise<{ data: EditalWithDetails | null; error: unknown }> {
    try {
        const { data, error } = await supabase
            .from('editais')
            .select(`
        *,
        edital_eventos(*),
        edital_links(*),
        edital_versoes(*),
        edital_question_filters(*)
      `)
            .eq('id', id)
            .single()
        if (error) throw error
        return { data: data as EditalWithDetails, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function getEditalBySlug_WithFilters(slug: string): Promise<{ data: EditalWithDetails | null; error: unknown }> {
    try {
        const { data, error } = await supabase
            .from('editais')
            .select(`
        *,
        edital_eventos(*),
        edital_links(*),
        edital_versoes(*),
        edital_question_filters(*)
      `)
            .eq('slug', slug)
            .single()
        if (error) throw error
        return { data: data as EditalWithDetails, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}
