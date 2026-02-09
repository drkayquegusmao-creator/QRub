
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

export interface Highlight {
    id: string
    user_id: string
    question_id: string
    field: string
    start_index: number
    end_index: number
    color: 'yellow' | 'purple' | 'green' | 'blue' | 'pink'
}

interface HighlightsState {
    highlights: Highlight[]
    isLoading: boolean
    error: string | null

    // Actions
    fetchHighlights: (questionId: string) => Promise<void>
    addHighlight: (h: Omit<Highlight, 'id' | 'user_id'>) => Promise<void>
    removeHighlight: (id: string) => Promise<void>
    removeHighlightsIntersecting: (questionId: string, field: string, start: number, end: number) => Promise<void>
    clearHighlights: () => void
}

export const useHighlights = create<HighlightsState>((set, get) => ({
    highlights: [],
    isLoading: false,
    error: null,

    fetchHighlights: async (questionId) => {
        set({ isLoading: true, error: null })
        try {
            const { data, error } = await supabase
                .from('highlights')
                .select('*')
                .eq('question_id', questionId)

            if (error) throw error
            set({ highlights: data as Highlight[] })
        } catch (err: any) {
            console.error('Error fetching highlights:', err)
            set({ error: err.message })
        } finally {
            set({ isLoading: false })
        }
    },

    addHighlight: async (highlightData) => {
        // Optimistic Update
        const tempId = crypto.randomUUID()
        const optimizeHighlight = { ...highlightData, id: tempId, user_id: 'optimistic' } as Highlight

        set(state => ({ highlights: [...state.highlights, optimizeHighlight] }))

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('User not authenticated')

            const payload = { ...highlightData, user_id: user.id }

            const { data, error } = await supabase
                .from('highlights')
                .insert(payload)
                .select()
                .single()

            if (error) throw error

            // Replace optimistic with real
            set(state => ({
                highlights: state.highlights.map(h => h.id === tempId ? data : h)
            }))
        } catch (err: any) {
            console.error('Error adding highlight:', err)
            // Revert optimistic
            set(state => ({ highlights: state.highlights.filter(h => h.id !== tempId) }))
        }
    },

    removeHighlight: async (id) => {
        const prev = get().highlights
        set({ highlights: prev.filter(h => h.id !== id) })

        try {
            const { error } = await supabase.from('highlights').delete().eq('id', id)
            if (error) throw error
        } catch (err) {
            console.error('Error removing highlight:', err)
            set({ highlights: prev })
        }
    },

    removeHighlightsIntersecting: async (questionId, field, start, end) => {
        const prev = get().highlights

        // Find intersecting highlights to remove locally
        const toRemove = prev.filter(h =>
            h.question_id === questionId &&
            h.field === field &&
            !(h.end_index <= start || h.start_index >= end) // Intersection logic
        )

        if (toRemove.length === 0) return

        set({ highlights: prev.filter(h => !toRemove.includes(h)) })

        try {
            // Cannot easily delete via range in basic SQL via client without RPC or multiple delete calls
            // For now, delete by IDs of the ones found locally (assuming strict sync)
            const ids = toRemove.map(h => h.id)
            const { error } = await supabase.from('highlights').delete().in('id', ids)
            if (error) throw error
        } catch (err) {
            console.error('Error removing intersecting highlights:', err)
            set({ highlights: prev })
        }
    },

    clearHighlights: () => set({ highlights: [] })
}))
