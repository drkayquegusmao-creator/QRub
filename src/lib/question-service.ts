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
 * Uses batching to avoid 414 URI Too Long errors when matchers are vast.
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

    const chunkSize = 50
    const chunks: string[][] = []
    for (let i = 0; i < matchers.length; i += chunkSize) {
        chunks.push(matchers.slice(i, i + chunkSize))
    }

    const allIds = new Set<string>()

    // Run each chunk
    await Promise.all(
        chunks.map(async chunk => {
            const idSets = await Promise.all(
                taxColumns.map(col =>
                    supabase
                        .from('questao_base')
                        .select('id')
                        .in(col, chunk)
                        .eq('status', 'active')
                        .eq('status_validacao', 'APROVADA')
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
export async function countQuestionsByFilters(filters: QuestionFilters): Promise<number> {
    if (filters.taxonomyId) {
        const matchers = await buildTaxonomyMatchers(filters.taxonomyId)
        const matchingIds = await fetchMatchingIds(matchers)
        if (matchingIds.length === 0) return 0

        // Optimize the subsequent query by also chunking or processing locally.
        // Actually, matchingIds might contain thousands of questions! We can't use .in() effectively.
        // But since we JUST fetched the valid matching IDs, and we already filtered status & validacao during fetchMatchingIds,
        // we can just fetch the remaining columns (banca, difficulty) to apply local filters, OR chunk the count.
        // Local filtering is safer and faster for 5000 items than 100 URI requests.

        const chunkSize = 150
        const idChunks: string[][] = []
        for (let i = 0; i < matchingIds.length; i += chunkSize) {
            idChunks.push(matchingIds.slice(i, i + chunkSize))
        }

        let totalValidCount = 0

        await Promise.all(
            idChunks.map(async chunk => {
                let query = supabase
                    .from('questao_base')
                    .select('id', { count: 'exact', head: true })
                    .in('id', chunk)

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
        // Usando uma semente aleatória mais forte
        const shuffled = matchingIds
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

        const limitChunkSize = 150
        const idChunks: string[][] = []
        for (let i = 0; i < shuffled.length; i += limitChunkSize) {
            idChunks.push(shuffled.slice(i, i + limitChunkSize))
            // We only need enough overlapping chunks to fulfill the limit. Let's cap chunks at 3 if limit is 20.
            if (idChunks.length >= Math.ceil((limit * 5) / limitChunkSize)) break
        }

        const validQuestions: any[] = []

        await Promise.all(
            idChunks.map(async chunk => {
                let query = supabase
                    .from('questao_base')
                    .select('*')
                    .in('id', chunk)
                    .eq('status', 'active')
                    .eq('status_validacao', 'APROVADA')

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

        // Shuffle final pool again before returning requested limit
        return validQuestions
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .slice(0, limit)
    }

    // No taxonomy - Fetching directly with a random offset to avoid the same initial questions
    const totalActive = await countQuestionsByFilters(filters)
    const randomOffset = totalActive > limit ? Math.floor(Math.random() * Math.max(0, totalActive - limit)) : 0

    let query = supabase
        .from('questao_base')
        .select('*')
        .eq('status', 'active')
        .eq('status_validacao', 'APROVADA')
        .range(randomOffset, randomOffset + limit - 1)

    if (filters.banca) query = query.eq('banca', filters.banca)

    if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
        const diffLow = filters.difficulty.toLowerCase()
        const diffNorm = diffLow.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        query = query.in('difficulty', diffLow !== diffNorm ? [diffLow, diffNorm] : [diffLow])
    }

    const { data, error } = await query
    if (error) { console.error('Error fetching questions:', error); return [] }

    // Final shuffle to avoid "order bias"
    return (data || [])
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}
