import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export type QuestionFont = 'default' | 'arial' | 'times'

interface PreferencesState {
    questionsFont: QuestionFont
    loading: boolean
    loadPreferences: (userId: string) => Promise<void>
    setQuestionsFont: (font: QuestionFont, userId?: string) => Promise<void>
}

export const usePreferences = create<PreferencesState>()(
    persist(
        (set, get) => ({
            questionsFont: 'default',
            loading: false,

            loadPreferences: async (userId) => {
                if (!isSupabaseConfigured()) return
                set({ loading: true })
                try {
                    const { data, error } = await supabase
                        .from('user_preferences')
                        .select('questions_font')
                        .eq('user_id', userId)
                        .single()

                    if (error && error.code !== 'PGRST116') throw error // PGRST116 is "no rows found"

                    if (data) {
                        set({ questionsFont: data.questions_font as QuestionFont })
                    }
                } catch (err) {
                    console.error('Error loading preferences:', err)
                } finally {
                    set({ loading: false })
                }
            },

            setQuestionsFont: async (font, userId) => {
                set({ questionsFont: font })
                if (userId && isSupabaseConfigured()) {
                    try {
                        const { error } = await supabase
                            .from('user_preferences')
                            .upsert({
                                user_id: userId,
                                questions_font: font,
                                updated_at: new Date().toISOString()
                            })

                        if (error) throw error
                    } catch (err) {
                        console.error('Error saving font preference:', err)
                    }
                }
            },
        }),
        {
            name: 'qrub-user-preferences',
        }
    )
)
