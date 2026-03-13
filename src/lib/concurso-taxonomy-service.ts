import { supabase } from './supabase'
import { TaxonomyNode } from './taxonomy-service'

export async function getAllConcursoTaxonomyNodes(): Promise<TaxonomyNode[]> {
    const { data, error } = await supabase
        .from('concurso_taxonomia')
        .select('*')
        .eq('active', true)
        .order('order', { ascending: true })

    if (error) {
        console.error('Error fetching all concurso taxonomy nodes:', error)
        throw error
    }
    return data as TaxonomyNode[]
}

export async function getRootConcursoTaxonomy(): Promise<TaxonomyNode[]> {
    const { data, error } = await supabase
        .from('concurso_taxonomia')
        .select('*')
        .is('parent_id', null)
        .eq('active', true)
        .order('order', { ascending: true })

    if (error) throw error
    return data as TaxonomyNode[]
}

export async function getConcursoChildren(nodeId: string): Promise<TaxonomyNode[]> {
    const { data, error } = await supabase
        .from('concurso_taxonomia')
        .select('*')
        .eq('parent_id', nodeId)
        .eq('active', true)
        .order('order', { ascending: true })

    if (error) throw error
    return data as TaxonomyNode[]
}

export async function getConcursoTaxonomyPath(nodeId: string): Promise<TaxonomyNode[]> {
    const allActive = await getAllConcursoTaxonomyNodes()
    const path: TaxonomyNode[] = []

    let current: TaxonomyNode | undefined = allActive.find(n => n.id === nodeId)
    while (current) {
        path.unshift(current)
        const parentId = current.parent_id
        if (!parentId) break
        current = allActive.find(n => n.id === parentId)
    }

    return path
}
