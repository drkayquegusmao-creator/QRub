import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

export interface TaxonomyNode {
    id: string
    slug: string
    name: string
    parent_id: string | null
    level: 'course' | 'specialty' | 'subspecialty' | 'subject'
    active: boolean
    order: number
    metadata: any
    questionCount?: number
    children?: TaxonomyNode[]
}

interface TaxonomyState {
    taxonomy: TaxonomyNode[]
    loading: boolean
    error: string | null
    loadTaxonomy: () => Promise<void>
    addNode: (node: Partial<TaxonomyNode>) => Promise<{ success: boolean; message: string }>
    updateNode: (id: string, updates: Partial<TaxonomyNode>) => Promise<{ success: boolean; message: string }>
    deleteNode: (id: string) => Promise<{ success: boolean; message: string }>
}

export const useTaxonomy = create<TaxonomyState>((set, get) => ({
    taxonomy: [],
    loading: false,
    error: null,

    loadTaxonomy: async () => {
        set({ loading: true, error: null })
        try {
            // Fetch taxonomy nodes
            const { data: taxonomyData, error: taxonomyError } = await supabase
                .from('taxonomia')
                .select('*')
                .order('order')
                .order('name')

            if (taxonomyError) throw taxonomyError

            // Fetch question counts from our new view
            const { data: countsData, error: countsError } = await supabase
                .from('v_taxonomia_counts')
                .select('*')

            if (countsError) {
                console.error('Error loading taxonomy counts:', countsError)
                // We don't throw here to allow the taxonomy to load even if counts fail
            }

            // Create a lookup for counts
            // Using a Map for O(1) matching and case-insensitive summing
            const countsMap = new Map()
            countsData?.forEach(c => {
                const key = `${c.level}:${c.val}`.toLowerCase()
                const current = countsMap.get(key) || 0
                countsMap.set(key, current + (c.count || 0))
            })

            // Build hierarchical tree
            const buildTree = (nodes: any[]) => {
                const map = new Map()
                const roots: TaxonomyNode[] = []

                nodes.forEach(n => {
                    // Try to find count by slug or name
                    const countBySlug = countsMap.get(`${n.level}:${n.slug}`.toLowerCase()) || 0
                    const countByName = countsMap.get(`${n.level}:${n.name}`.toLowerCase()) || 0
                    const questionCount = Math.max(countBySlug, countByName)

                    map.set(n.id, {
                        ...n,
                        children: [],
                        questionCount
                    })
                })

                nodes.forEach(n => {
                    const node = map.get(n.id)
                    if (n.parent_id && map.has(n.parent_id)) {
                        map.get(n.parent_id).children.push(node)
                    } else if (!n.parent_id) {
                        roots.push(node)
                    } else if (n.parent_id && !map.has(n.parent_id)) {
                        roots.push(node)
                    }
                })

                // In this system, questions are tagged at multiple levels (course_id, specialty_id, etc.).
                // Summing children's counts UP the tree causes extreme double-counting.
                // We trust the exact count provided by the database for each level.
                // Only if a node has 0 count do we check if it's a structural root that needs summing (unlikely here).
                
                return roots
            }

            set({ taxonomy: buildTree(taxonomyData || []), loading: false })
        } catch (err: any) {
            set({ error: err.message, loading: false })
        }
    },

    addNode: async (node) => {
        try {
            const { data, error } = await supabase
                .from('taxonomia')
                .insert([node])
                .select()

            if (error) throw error

            await get().loadTaxonomy()
            return { success: true, message: 'Nó adicionado com sucesso' }
        } catch (err: any) {
            return { success: false, message: err.message }
        }
    },

    updateNode: async (id, updates) => {
        try {
            const { error } = await supabase
                .from('taxonomia')
                .update(updates)
                .eq('id', id)

            if (error) throw error

            await get().loadTaxonomy()
            return { success: true, message: 'Nó atualizado com sucesso' }
        } catch (err: any) {
            return { success: false, message: err.message }
        }
    },

    deleteNode: async (id) => {
        try {
            // Check if it has children first (standard DB level check usually handles this but UX is better)
            const { data: children } = await supabase
                .from('taxonomia')
                .select('id')
                .eq('parent_id', id)

            if (children && children.length > 0) {
                return { success: false, message: 'Não é possível excluir um nó que possui filhos. Mova ou exclua os filhos primeiro.' }
            }

            const { error } = await supabase
                .from('taxonomia')
                .delete()
                .eq('id', id)

            if (error) throw error

            await get().loadTaxonomy()
            return { success: true, message: 'Nó excluído com sucesso' }
        } catch (err: any) {
            return { success: false, message: err.message }
        }
    }
}))
