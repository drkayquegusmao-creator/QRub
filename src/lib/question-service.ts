import { createClient } from '@supabase/supabase-js'
import { getDescendants } from './taxonomy-service'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface QuestionFilters {
    banca?: string
    taxonomyId?: string // node selecionado
    difficulty?: string
    status?: string // 'todas', 'nao-resolvidas', etc
}

/**
 * Build valid taxonomy matchers (slugs + names) for a given taxonomy node + its descendants.
 */
/**
 * Build valid taxonomy matchers (slugs + names) for a given taxonomy node + its descendants.
 */
/**
 * Build taxonomy UUID list (node + all descendants) for a given taxonomy node.
 * For Concursos: returns only UUIDs (concurso_questao_base stores UUID FKs).
 * For Saúde: returns IDs + slugs + names (questao_base uses text matching).
 */
async function buildTaxonomyMatchers(taxonomyId: string, isConcursos = false): Promise<string[]> {
    const table = isConcursos ? 'concurso_taxonomia' : 'taxonomia'
    const { data: node } = await supabase
        .from(table)
        .select('id, slug, name')
        .eq('id', taxonomyId)
        .single()

    const matchers: string[] = []
    if (node?.id) matchers.push(node.id)

    // Saúde uses text matching against slug/name; Concursos uses UUID FK columns
    if (!isConcursos) {
        if (node?.slug) matchers.push(node.slug)
        if (node?.name) matchers.push(node.name)
    }

    const descendants = await getDescendants(taxonomyId, isConcursos)
    descendants.forEach(d => {
        if (d.id) matchers.push(d.id)
        if (!isConcursos) {
            if (d.slug) matchers.push(d.slug)
            if (d.name) matchers.push(d.name)
        }
    })

    return [...new Set(matchers)]
}

/**
 * Fetch matching question IDs using per-column individual queries.
 * Columns differ between Saúde (specialty_id etc.) and Concursos (area_id etc.)
 */
async function fetchMatchingIds(matchers: string[], isConcursos = false): Promise<string[]> {
    if (matchers.length === 0) return []

    const qTable = isConcursos ? 'concurso_questao_base' : 'questao_base'

    // Concursos table uses direct UUID FK columns that map to concurso_taxonomia
    const concursosTaxColumns = ['area_id', 'disciplina_id', 'subdisciplina_id', 'assunto_id'] as const
    // Saúde table uses legacy text/UUID columns
    const saudeTaxColumns = ['specialty_id', 'subspecialty_id', 'subject_id', 'area_id', 'tema_id', 'subarea_id'] as const
    const taxColumns = isConcursos ? concursosTaxColumns : saudeTaxColumns

    const chunkSize = 50
    const chunks: string[][] = []
    for (let i = 0; i < matchers.length; i += chunkSize) {
        chunks.push(matchers.slice(i, i + chunkSize))
    }

    const allIds = new Set<string>()

    await Promise.all(
        chunks.map(async chunk => {
            const idSets = await Promise.all(
                taxColumns.map(col =>
                    supabase
                        .from(qTable)
                        .select('id')
                        .in(col, chunk)
                        .eq('status', 'active')
                        .then(({ data }) => (data || []).map((r: any) => r.id as string))
                )
            )
            const flatIds = ([] as string[]).concat(...idSets)
            flatIds.forEach(id => allIds.add(id))
        })
    )

    return Array.from(allIds)
}

/**
 * Returns the count of questions applying the hierarchical rules
 */
export async function countQuestionsByFilters(filters: QuestionFilters, isConcursos = false): Promise<number> {
    const qTable = isConcursos ? 'concurso_questao_base' : 'questao_base'
    
    if (filters.taxonomyId) {
        const matchers = await buildTaxonomyMatchers(filters.taxonomyId, isConcursos)
        const matchingIds = await fetchMatchingIds(matchers, isConcursos)
        if (matchingIds.length === 0) return 0

        const chunkSize = 150
        const idChunks: string[][] = []
        for (let i = 0; i < matchingIds.length; i += chunkSize) {
            idChunks.push(matchingIds.slice(i, i + chunkSize))
        }

        let totalValidCount = 0

        await Promise.all(
            idChunks.map(async chunk => {
                let query = supabase
                    .from(qTable)
                    .select('id', { count: 'exact', head: true })
                    .in('id', chunk)
                    .eq('status', 'active')
                
                if (!isConcursos) query = query.eq('status_validacao', 'APROVADA')

                if (filters.banca) query = query.eq('banca', filters.banca)
                
                if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
                    const diffLow = filters.difficulty.toLowerCase()
                    const diffNorm = diffLow.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    query = query.in('difficulty', diffLow !== diffNorm ? [diffLow, diffNorm] : [diffLow])
                }

                const { count, error } = await query
                if (!error && count) {
                    totalValidCount += count
                }
            })
        )
        return totalValidCount
    }

    let query = supabase
        .from(qTable)
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active')
    
    if (!isConcursos) query = query.eq('status_validacao', 'APROVADA')

    if (filters.banca) query = query.eq('banca', filters.banca)
    if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
        const diffLow = filters.difficulty.toLowerCase()
        const diffNorm = diffLow.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        query = query.in('difficulty', diffLow !== diffNorm ? [diffLow, diffNorm] : [diffLow])
    }

    const { count, error } = await query
    if (error) { console.error('Error counting questions:', error); return 0 }
    return count || 0
}

/**
 * Gets explicit question objects for the session
 */
export async function getQuestionsForTraining(filters: QuestionFilters, limit: number = 20, isConcursos = false): Promise<any[]> {
    const qTable = isConcursos ? 'concurso_questao_base' : 'questao_base'

    if (filters.taxonomyId) {
        const matchers = await buildTaxonomyMatchers(filters.taxonomyId, isConcursos)
        const matchingIds = await fetchMatchingIds(matchers, isConcursos)
        if (matchingIds.length === 0) return []

        const shuffled = matchingIds
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

        const limitChunkSize = 150
        const idChunks: string[][] = []
        for (let i = 0; i < shuffled.length; i += limitChunkSize) {
            idChunks.push(shuffled.slice(i, i + limitChunkSize))
            if (idChunks.length >= Math.ceil((limit * 5) / limitChunkSize)) break
        }

        const validQuestions: any[] = []

        await Promise.all(
            idChunks.map(async chunk => {
                let query = supabase
                    .from(qTable)
                    .select('*')
                    .in('id', chunk)
                    .eq('status', 'active')
                
                if (!isConcursos) query = query.eq('status_validacao', 'APROVADA')

                if (filters.banca) query = query.eq('banca', filters.banca)
                if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
                    const diffLow = filters.difficulty.toLowerCase()
                    const diffNorm = diffLow.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    query = query.in('difficulty', diffLow !== diffNorm ? [diffLow, diffNorm] : [diffLow])
                }

                const { data, error } = await query
                if (!error && data) {
                    validQuestions.push(...data)
                }
            })
        )

        return validQuestions
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .slice(0, limit)
    }

    const totalActive = await countQuestionsByFilters(filters, isConcursos)
    const randomOffset = totalActive > limit ? Math.floor(Math.random() * Math.max(0, totalActive - limit)) : 0

    let query = supabase
        .from(qTable)
        .select('*')
        .eq('status', 'active')
    
    if (!isConcursos) query = query.eq('status_validacao', 'APROVADA')

    query = query.range(randomOffset, randomOffset + limit - 1)

    if (filters.banca) query = query.eq('banca', filters.banca)
    if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
        const diffLow = filters.difficulty.toLowerCase()
        const diffNorm = diffLow.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        query = query.in('difficulty', diffLow !== diffNorm ? [diffLow, diffNorm] : [diffLow])
    }

    const { data, error } = await query
    if (error) { console.error('Error fetching questions:', error); return [] }

    return (data || [])
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}
