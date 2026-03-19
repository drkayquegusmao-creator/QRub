import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import { QuestionFilters, getQuestionsForTraining } from './question-service'

export interface TrainingSession {
    id: string
    user_id: string
    filters: QuestionFilters
    question_ids: string[]
    created_at: string
}

export async function createTrainingSession(userId: string, filters: QuestionFilters, limit: number): Promise<string> {
    const questions = await getQuestionsForTraining(filters, limit)

    if (!questions || questions.length === 0) {
        throw new Error('Não há questões suficientes para os filtros selecionados.')
    }

    const questionIds = questions.map(q => q.id)
    const sessionId = uuidv4()

    const { error } = await supabase
        .from('training_sessions')
        .insert({
            id: sessionId,
            user_id: userId,
            // To maintain compatibility with legacy training table schema, map filters:
            area: filters.taxonomyId || 'all',
            difficulty: filters.difficulty || 'qualquer',
            volume: limit,
            question_ids: questionIds, // In a real app we might store these in a mapping table
            created_at: new Date().toISOString()
        })

    // If 'question_ids' column doesn't exist, we might need a mapping table or update schema.
    // For V2 MVP we return the ID.

    if (error) {
        console.error('Error creating training session:', error)
        throw new Error('Erro ao iniciar treino. Tente novamente.')
    }

    return sessionId
}
