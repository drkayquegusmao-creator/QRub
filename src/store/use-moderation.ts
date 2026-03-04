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

export const useModeration = create<ModerationState>((set) => ({
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
        } catch (err: unknown) {
            console.error('Error loading reports:', err)
            set({ loading: false })
        }
    },

    createReport: async (reportData) => {
        try {
            if (isSupabaseConfigured()) {
                const { error } = await supabase
                    .from('question_reports')
                    .insert({
                        ...reportData,
                        status: 'pending'
                    })

                if (error) throw error

                // Flag the question as 'flagged' if a report is created
                if (reportData.question_id) {
                    await supabase
                        .from('questao_base')
                        .update({ status: 'flagged' })
                        .eq('id', reportData.question_id)
                }
            }
            return { success: true, message: 'Recebemos seu reporte! Nossa equipe reguladora irá analisar com prioridade.' }
        } catch (err: unknown) {
            console.error('Error creating report:', err)
            return { success: false, message: err instanceof Error ? err.message : 'Erro ao enviar reporte' }
        }
    },

    updateReportStatus: async (id, status) => {
        try {
            if (isSupabaseConfigured()) {
                const { data: report } = await supabase
                    .from('question_reports')
                    .select('question_id')
                    .eq('id', id)
                    .single()

                const { error } = await supabase
                    .from('question_reports')
                    .update({ status })
                    .eq('id', id)

                if (error) throw error

                // If resolved or dismissed, unflag the question
                if (status !== 'pending' && report?.question_id) {
                    await supabase
                        .from('questao_base')
                        .update({ status: 'active' }) // Revert to active or original state
                        .eq('id', report.question_id)
                }

                set(state => ({
                    reports: state.reports.map(r => r.id === id ? { ...r, status } : r)
                }))
            }
            return { success: true, message: 'Status atualizado com sucesso!' }
        } catch (err: unknown) {
            console.error('Error updating report status:', err)
            return { success: false, message: err instanceof Error ? err.message : String(err) }
        }
    }
}))
