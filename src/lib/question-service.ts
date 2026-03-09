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
 * Returns the count of questions applying the hierarchical rules
 */
export async function countQuestionsByFilters(filters: QuestionFilters): Promise<number> {
    // 1. Gather all valid taxonomy matchers (slugs & names)
    let validMatchers: string[] = []

    if (filters.taxonomyId) {
        const { data: node } = await supabase.from('taxonomia').select('slug, name').eq('id', filters.taxonomyId).single()
        if (node?.slug) validMatchers.push(node.slug)
        if (node?.name) validMatchers.push(node.name)

        const descendants = await getDescendants(filters.taxonomyId)
        descendants.forEach(d => {
            if (d.slug) validMatchers.push(d.slug)
            if (d.name) validMatchers.push(d.name)
        })
    }
    validMatchers = [...new Set(validMatchers)]

    let query = supabase
        .from('questao_base')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active')
        .eq('status_validacao', 'APROVADA')

    if (filters.banca) {
        query = query.eq('banca', filters.banca)
    }

    if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
        const diffLow = filters.difficulty.toLowerCase()
        const diffNorm = diffLow.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        query = query.or(`difficulty.eq.${diffLow},difficulty.eq.${diffNorm}`)
    }

    if (validMatchers.length > 0) {
        const matchersJoined = `(${validMatchers.map(m => `"${m}"`).join(',')})`
        const orConditions = [
            `specialty_id.in.${matchersJoined}`,
            `subspecialty_id.in.${matchersJoined}`,
            `subject_id.in.${matchersJoined}`,
            `area_id.in.${matchersJoined}`,
            `tema_id.in.${matchersJoined}`,
            `subarea_id.in.${matchersJoined}`
        ].join(',')

        query = query.or(orConditions)
    }

    const { count, error } = await query
    if (error) {
        console.error('Error counting questions:', error)
        return 0
    }
    return count || 0
}

/**
 * Gets explicit question objects for the session
 */
export async function getQuestionsForTraining(filters: QuestionFilters, limit: number = 20): Promise<any[]> {
    let validMatchers: string[] = []

    if (filters.taxonomyId) {
        const { data: node } = await supabase.from('taxonomia').select('slug, name').eq('id', filters.taxonomyId).single()
        if (node?.slug) validMatchers.push(node.slug)
        if (node?.name) validMatchers.push(node.name)

        const descendants = await getDescendants(filters.taxonomyId)
        descendants.forEach(d => {
            if (d.slug) validMatchers.push(d.slug)
            if (d.name) validMatchers.push(d.name)
        })
    }
    validMatchers = [...new Set(validMatchers)]

    let query = supabase
        .from('questao_base')
        .select('*')
        .eq('status', 'active')
        .eq('status_validacao', 'APROVADA')
        .limit(limit)

    if (filters.banca) {
        query = query.eq('banca', filters.banca)
    }

    if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
        const diffLow = filters.difficulty.toLowerCase()
        const diffNorm = diffLow.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        query = query.or(`difficulty.eq.${diffLow},difficulty.eq.${diffNorm}`)
    }

    if (validMatchers.length > 0) {
        const matchersJoined = `(${validMatchers.map(m => `"${m}"`).join(',')})`
        const orConditions = [
            `specialty_id.in.${matchersJoined}`,
            `subspecialty_id.in.${matchersJoined}`,
            `subject_id.in.${matchersJoined}`,
            `area_id.in.${matchersJoined}`,
            `tema_id.in.${matchersJoined}`,
            `subarea_id.in.${matchersJoined}`
        ].join(',')

        query = query.or(orConditions)
    }

    const { data, error } = await query
    if (error) {
        console.error('Error fetching questions:', error)
        return []
    }
    return data || []
}
