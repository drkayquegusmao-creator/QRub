
import { createClient } from '@supabase/supabase-js'

export interface HierarchyNode {
    id: string
    name: string
    category?: string
    specialties?: HierarchyNode[]
    subspecialties?: HierarchyNode[]
    subjects?: HierarchyNode[]
}

export const fetchTaxonomyHierarchy = async (): Promise<HierarchyNode[]> => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Fetch all active taxonomy nodes
    const { data: nodes, error } = await supabase
        .from('taxonomia')
        .select('id, slug, name, parent_id, level, metadata')
        .eq('active', true)

    if (error) {
        console.error('Error fetching taxonomy:', error)
        throw error
    }

    if (!nodes) return []

    // 1. Create a map of UUID -> Node (formatted for the app)
    const nodeMap = new Map<string, any>()

    nodes.forEach(n => {
        const formatted: any = {
            id: n.slug, // Map slug to id for compatibility with existing app logic
            uuid: n.id, // Keep UUID just in case
            name: n.name,
        }

        if (n.level === 'specialty' && n.metadata?.category) {
            formatted.category = n.metadata.category
        }

        // Initialize arrays based on level
        if (n.level === 'course') formatted.specialties = []
        if (n.level === 'specialty') formatted.subspecialties = []
        if (n.level === 'subspecialty') formatted.subjects = []

        nodeMap.set(n.id, formatted)
    })

    const roots: any[] = []

    // 2. Build the tree
    nodes.forEach(n => {
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
