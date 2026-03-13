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
    getDisciplinasByArea: (areaId: string) => ConcursoTaxonomyNode[]
    getSubdisciplinasByDisciplina: (disciplinaId: string) => ConcursoTaxonomyNode[]
    getAssuntosBySubdisciplina: (subdisciplinaId: string) => ConcursoTaxonomyNode[]
}

const buildTree = (nodes: any[]): ConcursoTaxonomyNode[] => {
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

    getAreas: () => get().taxonomy.flatMap(env => env.children || []).filter(t => t.level === 'area'),
    
    getDisciplinasByArea: (areaId) => {
        if (!areaId) return []
        const areas = get().getAreas()
        const area = areas.find(a => a.id === areaId)
        return area?.children || []
    },

    getSubdisciplinasByDisciplina: (disciplinaId) => {
        if (!disciplinaId) return []
        const areas = get().getAreas()
        for (const area of areas) {
            const disc = area.children?.find(d => d.id === disciplinaId)
            if (disc) return disc.children || []
        }
        return []
    },

    getAssuntosBySubdisciplina: (subId) => {
        if (!subId) return []
        const areas = get().getAreas()
        for (const area of areas) {
            for (const disc of (area.children || [])) {
                const sub = disc.children?.find(s => s.id === subId)
                if (sub) return sub.children || []
            }
        }
        return []
    }
}))
