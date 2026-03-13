import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export interface ConcursoTaxonomyNode {
    id: string
    name: string
    slug: string
    parent_id: string | null
    level: 'environment' | 'area' | 'disciplina' | 'subdisciplina' | 'assunto'
    active: boolean
    order: number
    children?: ConcursoTaxonomyNode[]
    metadata?: any
}

interface ConcursoTaxonomyState {
    taxonomy: ConcursoTaxonomyNode[]
    loading: boolean
    loadTaxonomy: () => Promise<void>
    addNode: (node: Partial<ConcursoTaxonomyNode>) => Promise<{ success: boolean; message: string }>
    updateNode: (id: string, updates: Partial<ConcursoTaxonomyNode>) => Promise<{ success: boolean; message: string }>
    deleteNode: (id: string) => Promise<{ success: boolean; message: string }>
    getAreas: () => ConcursoTaxonomyNode[]
}

const buildTree = (nodes: ConcursoTaxonomyNode[]): ConcursoTaxonomyNode[] => {
    const map = new Map<string, ConcursoTaxonomyNode>()
    const roots: ConcursoTaxonomyNode[] = []

    nodes.forEach(node => {
        map.set(node.id, { ...node, children: [] })
    })

    nodes.forEach(node => {
        const mapped = map.get(node.id)!
        if (node.parent_id && map.has(node.parent_id)) {
            map.get(node.parent_id)!.children?.push(mapped)
        } else if (node.level === 'environment' || !node.parent_id) {
            roots.push(mapped)
        }
    })

    return roots
}

export const useConcursoTaxonomy = create<ConcursoTaxonomyState>()((set, get) => ({
    taxonomy: [],
    loading: false,

    loadTaxonomy: async () => {
        if (!isSupabaseConfigured()) return
        set({ loading: true })
        try {
            const { data, error } = await supabase
                .from('concurso_taxonomia')
                .select('*')
                .order('order', { ascending: true })

            if (error) throw error
            set({ taxonomy: buildTree(data || []) })
        } catch (err) {
            console.error('Error loading concurso taxonomy:', err)
        } finally {
            set({ loading: false })
        }
    },

    addNode: async (node) => {
        const { data, error } = await supabase
            .from('concurso_taxonomia')
            .insert([node])
            .select()

        if (error) return { success: false, message: error.message }
        await get().loadTaxonomy()
        return { success: true, message: 'Adicionado com sucesso' }
    },

    updateNode: async (id, updates) => {
        const { error } = await supabase
            .from('concurso_taxonomia')
            .update(updates)
            .eq('id', id)

        if (error) return { success: false, message: error.message }
        await get().loadTaxonomy()
        return { success: true, message: 'Atualizado com sucesso' }
    },

    deleteNode: async (id) => {
        const { error } = await supabase
            .from('concurso_taxonomia')
            .delete()
            .eq('id', id)

        if (error) return { success: false, message: 'Este nó pode ter dados vinculados: ' + error.message }
        await get().loadTaxonomy()
        return { success: true, message: 'Excluído com sucesso' }
    },

    getAreas: () => get().taxonomy.filter(t => t.level === 'area'),
}))
