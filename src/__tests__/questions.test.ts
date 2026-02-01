
import { useQuestions } from '../store/use-questions'

// Mock de Supabase para evitar chamadas reais à API
jest.mock('../lib/supabase', () => ({
    supabase: {
        from: jest.fn(() => ({
            select: jest.fn(() => ({
                order: jest.fn(() => ({
                    range: jest.fn(() => Promise.resolve({ data: [], error: null }))
                }))
            })),
            insert: jest.fn(() => Promise.resolve({ data: null, error: null }))
        })),
    },
    isSupabaseConfigured: jest.fn(() => true)
}))

describe('useQuestions Store', () => {
    it('deve iniciar com estado vazio', () => {
        const state = useQuestions.getState()
        expect(state.questions).toEqual([])
        expect(state.loading).toBe(false)
    })

    it('deve gerar questões com os metadados corretos', async () => {
        const { generateQuestions } = useQuestions.getState()

        // Testa a geração de uma questão
        const result = await generateQuestions({
            specialty_id: 'clinica-medica',
            count: 1,
            difficulty: 'Médio'
        })

        expect(result.success).toBe(true)
        const questions = useQuestions.getState().questions
        expect(questions.length).toBe(1)

        const question = questions[0]
        expect(question.specialty_id).toBe('clinica-medica')
        expect(question.difficulty).toBe('Médio')
        expect(question.case_study).toBeDefined()
        expect(question.case_study?.history).toContain('anos')
    })
})
