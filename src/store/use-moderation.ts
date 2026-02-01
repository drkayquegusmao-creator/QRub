import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { QuestionReport } from '@/lib/data-mock'

interface ModerationState {
    reports: QuestionReport[]
    loading: boolean
    loadReports: () => Promise<void>
    createReport: (report: Omit<QuestionReport, 'id' | 'status' | 'created_at'>) => Promise<{ success: boolean, message: string }>
    updateReportStatus: (id: string, status: QuestionReport['status']) => Promise<{ success: boolean, message: string }>
}

export const useModeration = create<ModerationState>((set, get) => ({
    reports: [],
    loading: false,

    loadReports: async () => {
        if (!isSupabaseConfigured()) return
        set({ loading: true })
        try {
            const { data, error } = await supabase
                .from('question_reports')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            set({ reports: data || [], loading: false })
        } catch (err: any) {
            console.error('Error loading reports:', err)
            set({ loading: false })
        }
    },

    createReport: async (reportData) => {
        try {
            if (isSupabaseConfigured()) {
                const { error } = await supabase
                    .from('question_reports')
                    .insert(reportData)

                if (error) throw error

                // Flag the question as 'flagged' if a report is created
                await supabase
                    .from('questions')
                    .update({ status: 'flagged' })
                    .eq('id', reportData.question_id)
            }
            return { success: true, message: 'Reporte enviado com sucesso! Nossa equipe reguladora irá analisar.' }
        } catch (err: any) {
            return { success: false, message: err.message || 'Erro ao enviar reporte' }
        }
    },

    updateReportStatus: async (id, status) => {
        try {
            if (isSupabaseConfigured()) {
                const { error } = await supabase
                    .from('question_reports')
                    .update({ status })
                    .eq('id', id)

                if (error) throw error

                // If resolved or dismissed, we might want to unflag the question or archive it
                // For now just update local state
                set(state => ({
                    reports: state.reports.map(r => r.id === id ? { ...r, status } : r)
                }))
            }
            return { success: true, message: 'Status atualizado!' }
        } catch (err: any) {
            return { success: false, message: err.message }
        }
    }
}))
