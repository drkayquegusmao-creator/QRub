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
async function buildTaxonomyMatchers(taxonomyId: string): Promise<string[]> {
    const { data: node } = await supabase
        .from('taxonomia')
        .select('slug, name')
        .eq('id', taxonomyId)
        .single()

    const matchers: string[] = []
    if (node?.slug) matchers.push(node.slug)
    if (node?.name) matchers.push(node.name)

    const descendants = await getDescendants(taxonomyId)
    descendants.forEach(d => {
        if (d.slug) matchers.push(d.slug)
        if (d.name) matchers.push(d.name)
    })

    return [...new Set(matchers)]
}

/**
 * Fetch matching question IDs using per-column individual queries.
 * This avoids the Supabase JS .or('col.in.(...)') syntax bug with accented/mixed-case values.
 */
async function fetchMatchingIds(matchers: string[]): Promise<string[]> {
    if (matchers.length === 0) return []

    const taxColumns = [
        'specialty_id',
        'subspecialty_id',
        'subject_id',
        'area_id',
        'tema_id',
        'subarea_id',
    ] as const

    const idSets = await Promise.all(
        taxColumns.map(col =>
            supabase
                .from('questao_base')
                .select('id')
                .in(col, matchers)
                .eq('status', 'active')
                .eq('status_validacao', 'APROVADA')
                .then(({ data }) => (data || []).map((r: any) => r.id as string))
        )
    )

    const allIds = ([] as string[]).concat(...idSets)
    return [...new Set(allIds)]
}

/**
 * Returns the count of questions applying the hierarchical rules
 */
export async function countQuestionsByFilters(filters: QuestionFilters): Promise<number> {
    if (filters.taxonomyId) {
        const matchers = await buildTaxonomyMatchers(filters.taxonomyId)
        const matchingIds = await fetchMatchingIds(matchers)
        if (matchingIds.length === 0) return 0

        let query = supabase
            .from('questao_base')
            .select('id', { count: 'exact', head: true })
            .in('id', matchingIds)

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

    // No taxonomy selected — count all active+approved
    let query = supabase
        .from('questao_base')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active')
        .eq('status_validacao', 'APROVADA')

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
export async function getQuestionsForTraining(filters: QuestionFilters, limit: number = 20): Promise<any[]> {
    if (filters.taxonomyId) {
        const matchers = await buildTaxonomyMatchers(filters.taxonomyId)
        const matchingIds = await fetchMatchingIds(matchers)
        if (matchingIds.length === 0) return []

        // Shuffle for variety and cap for performance
        const shuffled = matchingIds.sort(() => Math.random() - 0.5)

        let query = supabase
            .from('questao_base')
            .select('*')
            .in('id', shuffled.slice(0, Math.max(limit * 3, 100)))
            .eq('status', 'active')
            .eq('status_validacao', 'APROVADA')

        if (filters.banca) query = query.eq('banca', filters.banca)

        if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
            const diffLow = filters.difficulty.toLowerCase()
            const diffNorm = diffLow.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            query = query.in('difficulty', diffLow !== diffNorm ? [diffLow, diffNorm] : [diffLow])
        }

        query = query.limit(limit)

        const { data, error } = await query
        if (error) { console.error('Error fetching questions:', error); return [] }
        return data || []
    }

    // No taxonomy
    let query = supabase
        .from('questao_base')
        .select('*')
        .eq('status', 'active')
        .eq('status_validacao', 'APROVADA')
        .limit(limit)

    if (filters.banca) query = query.eq('banca', filters.banca)

    if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
        const diffLow = filters.difficulty.toLowerCase()
        const diffNorm = diffLow.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        query = query.in('difficulty', diffLow !== diffNorm ? [diffLow, diffNorm] : [diffLow])
    }

    const { data, error } = await query
    if (error) { console.error('Error fetching questions:', error); return [] }
    return data || []
}
