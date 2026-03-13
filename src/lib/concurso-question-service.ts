import { supabase } from './supabase'
import { getAllConcursoTaxonomyNodes } from './concurso-taxonomy-service'

export interface ConcursoQuestionFilters {
    area_id?: string
    disciplina_id?: string
    subdisciplina_id?: string
    assunto_id?: string
    banca_id?: string
    difficulty?: string
    status?: string // 'todas', 'nao-resolvidas', etc
}

async function getDescendantsIds(taxonomyId: string): Promise<string[]> {
    const allActive = await getAllConcursoTaxonomyNodes()
    const result: string[] = [taxonomyId]

    function recurse(currentId: string) {
        const children = allActive.filter(n => n.parent_id === currentId)
        for (const child of children) {
            result.push(child.id)
            recurse(child.id)
        }
    }

    recurse(taxonomyId)
    return result
}

export async function countConcursoQuestions(filters: ConcursoQuestionFilters): Promise<number> {
    let query = supabase
        .from('concurso_questao_base')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active')

    if (filters.area_id) {
        const descendantIds = await getDescendantsIds(filters.area_id)
        query = query.in('area_id', descendantIds)
    }
    
    if (filters.disciplina_id) query = query.eq('disciplina_id', filters.disciplina_id)
    if (filters.banca_id) query = query.eq('banca_id', filters.banca_id)
    
    if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
        query = query.eq('difficulty', filters.difficulty.toLowerCase())
    }

    const { count, error } = await query
    if (error) {
        console.error('Error counting concurso questions:', error)
        return 0
    }
    return count || 0
}

export async function getConcursoQuestions(filters: ConcursoQuestionFilters, limit: number = 20): Promise<any[]> {
    let query = supabase
        .from('concurso_questao_base')
        .select('*')
        .eq('status', 'active')

    if (filters.area_id) {
        const descendantIds = await getDescendantsIds(filters.area_id)
        query = query.in('area_id', descendantIds)
    }

    if (filters.disciplina_id) query = query.eq('disciplina_id', filters.disciplina_id)
    if (filters.banca_id) query = query.eq('banca_id', filters.banca_id)

    if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
        query = query.eq('difficulty', filters.difficulty.toLowerCase())
    }

    const { data, error } = await query
        .limit(limit)
        .order('id', { ascending: false }) // Use a better ordering for variety if needed

    if (error) {
        console.error('Error fetching concurso questions:', error)
        return []
    }

    // Shuffle final pool
    return (data || [])
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
}
