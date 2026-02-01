
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import { ExamBlueprint, StudyBox } from '@/lib/data-mock'

interface BlueprintState {
    blueprints: ExamBlueprint[]
    studyBoxes: StudyBox[]
    loading: boolean
    loadBlueprints: () => Promise<void>
    loadStudyBoxes: (blueprintId: string) => Promise<void>
    createBlueprint: (data: Partial<ExamBlueprint>) => Promise<ExamBlueprint | null>
    createStudyBox: (data: Partial<StudyBox>) => Promise<void>
    uploadPDF: (file: File) => Promise<string | null>
    processBlueprint: (blueprintId: string) => Promise<boolean>
}

export const useBlueprints = create<BlueprintState>((set, get) => ({
    blueprints: [],
    studyBoxes: [],
    loading: false,

    loadBlueprints: async () => {
        set({ loading: true })
        const { data, error } = await supabase
            .from('exam_blueprints')
            .select('*')
            .order('year', { ascending: false })

        if (!error && data) set({ blueprints: data as any })
        set({ loading: false })
    },

    loadStudyBoxes: async (blueprintId: string) => {
        set({ loading: true })
        const { data, error } = await supabase
            .from('study_boxes')
            .select('*')
            .eq('blueprint_id', blueprintId)
            .order('weight', { ascending: false })

        if (!error && data) set({ studyBoxes: data as any })
        set({ loading: false })
    },

    uploadPDF: async (file: File) => {
        try {
            console.log('📤 Iniciando upload do PDF:', file.name, `(${(file.size / 1024 / 1024).toFixed(2)} MB)`)

            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = fileName

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('blueprints')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true
                })

            if (uploadError) {
                console.error('❌ Erro no upload do PDF:', {
                    message: uploadError.message,
                    statusCode: uploadError.statusCode,
                    error: uploadError
                })
                throw new Error(`Falha no upload: ${uploadError.message}`)
            }

            console.log('✅ Upload concluído:', uploadData.path)

            const { data } = supabase.storage.from('blueprints').getPublicUrl(filePath)
            console.log('🔗 URL pública gerada:', data.publicUrl)

            return data.publicUrl
        } catch (error: any) {
            console.error('❌ Erro crítico no uploadPDF:', error)
            return null
        }
    },

    processBlueprint: async (blueprintId: string) => {
        set({ loading: true })

        // Simulação de Inteligência QRub processando o PDF
        // Em um cenário real, isso dispararia uma Edge Function com IA OCR
        try {
            const mockBoxes: Partial<StudyBox>[] = [
                {
                    blueprint_id: blueprintId,
                    title: 'Manejo da Asma Grave',
                    specialty_id: 'clinica-medica',
                    subspecialty_id: 'pneumologia',
                    cognitive_level: 'Avançado',
                    charge_profile: 'Guideline',
                    weight: 2.5,
                    base_text: 'Extraído do Edital: Manejo conforme GINA 2023, protocolos de crise asmática e corticoterapia.'
                },
                {
                    blueprint_id: blueprintId,
                    title: 'Hipertensão Arterial Resistente',
                    specialty_id: 'clinica-medica',
                    subspecialty_id: 'cardiologia',
                    cognitive_level: 'Intermediário',
                    charge_profile: 'Clínica',
                    weight: 1.8,
                    base_text: 'Extraído do Edital: Diagnóstico de hipertensão resistente e associações triplas de fármacos.'
                }
            ]

            const { data: boxes, error } = await supabase
                .from('study_boxes')
                .insert(mockBoxes)
                .select()

            if (error) throw error

            // Atualizar status do edital
            await supabase
                .from('exam_blueprints')
                .update({ status: 'active', metadata: { total_items: boxes.length } })
                .eq('id', blueprintId)

            set(state => ({
                blueprints: state.blueprints.map(b => b.id === blueprintId ? { ...b, status: 'active', metadata: { total_items: boxes.length } } : b),
                studyBoxes: boxes as any
            }))

            return true
        } catch (err) {
            console.error('Error processing blueprint:', err)
            return false
        } finally {
            set({ loading: false })
        }
    },

    createBlueprint: async (data) => {
        const { data: result, error } = await supabase
            .from('exam_blueprints')
            .insert([data])
            .select()
            .single()

        if (error) {
            console.error('Error creating blueprint:', error)
            return null
        }

        const current = get().blueprints
        set({ blueprints: [result as any, ...current] })
        return result as any
    },

    createStudyBox: async (data) => {
        const { error } = await supabase
            .from('study_boxes')
            .insert([data])

        if (error) console.error('Error creating study box:', error)
    }
}))
