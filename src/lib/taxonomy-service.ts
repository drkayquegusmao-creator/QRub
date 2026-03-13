import { createClient } from '@supabase/supabase-js'

export interface TaxonomyNode {
    id: string
    name: string
    slug: string
    parent_id: string | null
    level: 'course' | 'specialty' | 'subspecialty' | 'subject' | 'topic'
    active: boolean
    order: number
    metadata?: any
    // optional fields based on requirement
    path_ids?: string[]
    path_names?: string[]
    children_count?: number
    questions_count_direct?: number
    questions_count_recursive?: number
}

// Instantiate Supabase local to the service
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * Returns all taxonomy nodes flat, often useful for memory-caching
 */
export async function getAllTaxonomyNodes(isConcursos = false): Promise<TaxonomyNode[]> {
    const table = isConcursos ? 'concurso_taxonomia' : 'taxonomia'
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('active', true)
        .order('order', { ascending: true })

    if (error) {
        console.error('Error fetching all taxonomy nodes:', error)
        throw error
    }
    return data as TaxonomyNode[]
}

/**
 * Returns roots (highest level elements)
 */
export async function getRootTaxonomy(isConcursos = false): Promise<TaxonomyNode[]> {
    const table = isConcursos ? 'concurso_taxonomia' : 'taxonomia'
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .is('parent_id', null)
        .eq('active', true)
        .order('order', { ascending: true })

    if (error) throw error
    return data as TaxonomyNode[]
}

/**
 * Returns children nodes for a given node id (1 level deep)
 */
export async function getChildren(nodeId: string, isConcursos = false): Promise<TaxonomyNode[]> {
    const table = isConcursos ? 'concurso_taxonomia' : 'taxonomia'
    const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('parent_id', nodeId)
        .eq('active', true)
        .order('order', { ascending: true })

    if (error) throw error
    return data as TaxonomyNode[]
}

/**
 * Returns ALL descendants hierarchically for a given node id
 * This is an iterative/recursive approach fetching locally, since taxonomia is relatively small.
 * It ensures we get everything below visually or logically.
 */
export async function getDescendants(nodeId: string, isConcursos = false): Promise<TaxonomyNode[]> {
    const allActive = await getAllTaxonomyNodes(isConcursos)
    const result: TaxonomyNode[] = []

    function recurse(currentId: string) {
        const children = allActive.filter(n => n.parent_id === currentId)
        for (const child of children) {
            result.push(child)
            recurse(child.id)
        }
    }

    recurse(nodeId)
    return result
}

/**
 * Returns path from root to the given node
 */
export async function getTaxonomyPath(nodeId: string, isConcursos = false): Promise<TaxonomyNode[]> {
    const allActive = await getAllTaxonomyNodes(isConcursos)
    const path: TaxonomyNode[] = []

    let current: TaxonomyNode | undefined = allActive.find(n => n.id === nodeId)
    while (current) {
        path.unshift(current) // push to start
        const parentId = current.parent_id
        if (!parentId) break
        current = allActive.find(n => n.id === parentId)
    }

    return path
}

// Preserve existing interface/functions for legacy components that haven't been migrated yet
export interface HierarchyNode {
    id: string
    name: string
    category?: string
    specialties?: HierarchyNode[]
    subspecialties?: HierarchyNode[]
    subjects?: HierarchyNode[]
}

export const fetchTaxonomyHierarchy = async (): Promise<HierarchyNode[]> => {
    const nodes = await getAllTaxonomyNodes()

    const nodeMap = new Map<string, any>()

    nodes.forEach((n: any) => {
        const formatted: any = {
            id: n.id,
            slug: n.slug,
            name: n.name,
        }

        if (n.level === 'specialty' && n.metadata?.category) {
            formatted.category = n.metadata.category
        }

        if (n.level === 'course') formatted.specialties = []
        if (n.level === 'specialty') formatted.subspecialties = []
        if (n.level === 'subspecialty') formatted.subjects = []

        nodeMap.set(n.id, formatted)
    })

    const roots: any[] = []

    nodes.forEach((n: any) => {
        const current = nodeMap.get(n.id)
        if (n.parent_id && nodeMap.has(n.parent_id)) {
            const parent = nodeMap.get(n.parent_id)

            if (n.level === 'specialty') {
                if (!parent.specialties) parent.specialties = []
                parent.specialties.push(current)
            } else if (n.level === 'subspecialty') {
                if (!parent.subspecialties) parent.subspecialties = []
                parent.subspecialties.push(current)
            } else if (n.level === 'subject') {
                if (!parent.subjects) parent.subjects = []
                parent.subjects.push(current)
            }

        } else if (n.level === 'course') {
            roots.push(current)
        }
    })

    return roots
}
