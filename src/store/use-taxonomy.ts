import { create } from 'zustand'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface TaxonomyNode {
    id: string
    slug: string
    name: string
    parent_id: string | null
    level: 'course' | 'specialty' | 'subspecialty' | 'subject'
    active: boolean
    order: number
    metadata: any
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
            const { data, error } = await supabase
                .from('taxonomia')
                .select('*')
                .order('order')
                .order('name')

            if (error) throw error

            // Build hierarchical tree
            const buildTree = (nodes: any[]) => {
                const map = new Map()
                const roots: TaxonomyNode[] = []

                nodes.forEach(n => {
                    map.set(n.id, { ...n, children: [] })
                })

                nodes.forEach(n => {
                    const node = map.get(n.id)
                    if (n.parent_id && map.has(n.parent_id)) {
                        map.get(n.parent_id).children.push(node)
                    } else if (!n.parent_id) {
                        roots.push(node)
                    } else if (n.parent_id && !map.has(n.parent_id)) {
                        // Orphaned but has parent_id (parent might be filtered out or deleted)
                        roots.push(node)
                    }
                })

                return roots
            }

            set({ taxonomy: buildTree(data || []), loading: false })
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
