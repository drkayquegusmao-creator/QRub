import { supabase } from './supabase'
import { getAllConcursoTaxonomyNodes } from './concurso-taxonomy-service'

export interface ConcursoQuestionFilters {
    taxonomy_id?: string  // generic: pass any level node (area, disciplina, subdisciplina, assunto)
    area_id?: string
    disciplina_id?: string
    subdisciplina_id?: string
    assunto_id?: string
    banca_id?: string
    difficulty?: string
    status?: string
}

/**
 * Given a taxonomy node ID, resolves which DB column to query
 * and all IDs to include (the node itself + all descendant IDs at that same level).
 * 
 * Strategy: questions store all 4 FK levels. Filtering by `area_id = X` returns all
 * questions in that area (regardless of discipline). This is O(1) — no large IN lists.
 */
async function resolveTaxonomyFilter(taxonomyId: string): Promise<{ column: string; ids: string[] }> {
    const allNodes = await getAllConcursoTaxonomyNodes()
    const node = allNodes.find(n => n.id === taxonomyId)

    if (!node) return { column: 'area_id', ids: [taxonomyId] }

    const level = (node as any).level as string

    // Map taxonomy level → question table column
    const levelToColumn: Record<string, string> = {
        area: 'area_id',
        disciplina: 'disciplina_id',
        subdisciplina: 'subdisciplina_id',
        assunto: 'assunto_id',
    }

    const column = levelToColumn[level] || 'area_id'

    // Collect the node + all same-level descendants
    // (e.g. if user picks an area, find all area_ids under it — but actually
    // areas are roots, so just use the node itself)
    // For deeper levels, we collect all descendant IDs at the SAME level
    const ids = collectSameLevelDescendants(taxonomyId, level, allNodes)

    return { column, ids }
}

function collectSameLevelDescendants(rootId: string, targetLevel: string, allNodes: any[]): string[] {
    const node = allNodes.find(n => n.id === rootId)
    if (!node) return [rootId]

    // If node is already at the target level, return just its ID
    if ((node as any).level === targetLevel) return [rootId]

    // Otherwise recurse to find all descendants at the target level
    const result: string[] = []
    function recurse(id: string) {
        const children = allNodes.filter(n => n.parent_id === id)
        for (const child of children) {
            if ((child as any).level === targetLevel) {
                result.push(child.id)
            } else {
                recurse(child.id)
            }
        }
    }
    recurse(rootId)
    return result.length > 0 ? result : [rootId]
}

async function applyTaxonomyFilter(
    query: any,
    filters: ConcursoQuestionFilters
): Promise<any> {
    const selectedId = filters.taxonomy_id || filters.area_id

    if (selectedId) {
        const { column, ids } = await resolveTaxonomyFilter(selectedId)

        if (ids.length === 0) {
            return query.eq('id', '__no_match__')
        }

        // Chunk to avoid URL length limits (Supabase REST has ~8KB URL limit)
        // For single-column filtering with up to a few hundred IDs, this is safe
        if (ids.length <= 200) {
            query = query.in(column, ids)
        } else {
            // Too many IDs — fall back to just the root node (area-level match)
            query = query.eq(column, selectedId)
        }
    }

    // Fine-grained overrides when explicitly passed
    if (filters.disciplina_id && !filters.taxonomy_id && !filters.area_id) {
        query = query.eq('disciplina_id', filters.disciplina_id)
    }
    if (filters.subdisciplina_id && !filters.taxonomy_id && !filters.area_id) {
        query = query.eq('subdisciplina_id', filters.subdisciplina_id)
    }
    if (filters.assunto_id && !filters.taxonomy_id && !filters.area_id) {
        query = query.eq('assunto_id', filters.assunto_id)
    }

    if (filters.banca_id) query = query.eq('banca_id', filters.banca_id)

    if (filters.difficulty && filters.difficulty.toLowerCase() !== 'qualquer') {
        const diffNorm = filters.difficulty
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        query = query.eq('difficulty', diffNorm)
    }

    return query
}

export async function countConcursoQuestions(filters: ConcursoQuestionFilters): Promise<number> {
    try {
        let query = supabase
            .from('concurso_questao_base')
            .select('id', { count: 'exact', head: true })
            .eq('status', 'active')

        query = await applyTaxonomyFilter(query, filters)

        const { count, error } = await query
        if (error) {
            console.error('[concurso-question-service] countConcursoQuestions:', error)
            return 0
        }
        return count || 0
    } catch (err) {
        console.error('[concurso-question-service] countConcursoQuestions:', err)
        return 0
    }
}

export async function getConcursoQuestions(filters: ConcursoQuestionFilters, limit: number = 20): Promise<any[]> {
    try {
        let query = supabase
            .from('concurso_questao_base')
            .select('*')
            .eq('status', 'active')

        query = await applyTaxonomyFilter(query, filters)

        const { data, error } = await query.limit(limit * 3)

        if (error) {
            console.error('[concurso-question-service] getConcursoQuestions:', error)
            return []
        }

        // Shuffle and return requested limit
        return (data || [])
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .slice(0, limit)
    } catch (err) {
        console.error('[concurso-question-service] getConcursoQuestions:', err)
        return []
    }
}
