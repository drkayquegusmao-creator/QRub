import { supabase } from '../supabase'

export interface UserPerformanceStats {
    id: string
    total_vistas: number
    acertos: number
    precisao_media: number
    completude?: number
    total_questoes_base?: number
}

export async function getAssuntosPerformance(userId: string): Promise<Record<string, UserPerformanceStats>> {
    const { data: responseData, error: responseError } = await supabase
        .from('concurso_user_respostas')
        .select('assunto_id, is_correct')
        .eq('user_id', userId)

    if (responseError) {
        console.error('Error fetching user subject performance:', responseError)
        return {}
    }

    const performance: Record<string, UserPerformanceStats> = {}

    responseData?.forEach(resp => {
        const aId = resp.assunto_id
        if (!aId) return

        if (!performance[aId]) {
            performance[aId] = {
                id: aId,
                total_vistas: 0,
                acertos: 0,
                precisao_media: 0
            }
        }

        performance[aId].total_vistas += 1
        if (resp.is_correct) {
            performance[aId].acertos += 1
        }
    })

    Object.keys(performance).forEach(aId => {
        const stats = performance[aId]
        stats.precisao_media = stats.total_vistas > 0 
            ? Math.round((stats.acertos / stats.total_vistas) * 100) 
            : 0
    })

    return performance
}

export async function getSimuladosGlobalStats(userId: string) {
    const { data: results, error } = await supabase
        .from('concurso_user_simulado_historico')
        .select('total_tempo_segundos, total_questoes, questoes_duvida')
        .eq('user_id', userId)

    if (error || !results || results.length === 0) {
        return {
            avgTimePerQuestion: 0,
            uncertaintyRate: 0,
            totalSimulados: 0
        }
    }

    const totalTime = results.reduce((acc, r) => acc + (r.total_tempo_segundos || 0), 0)
    const totalQuestions = results.reduce((acc, r) => acc + (r.total_questoes || 0), 0)
    const totalDoubt = results.reduce((acc, r) => acc + (r.questoes_duvida || 0), 0)

    return {
        avgTimePerQuestion: totalQuestions > 0 ? Math.round(totalTime / totalQuestions) : 0,
        uncertaintyRate: totalQuestions > 0 ? Math.round((totalDoubt / totalQuestions) * 100) : 0,
        totalSimulados: results.length
    }
}

export async function getDisciplinasPerformance(userId: string): Promise<Record<string, UserPerformanceStats>> {
    // 1. Fetch total questions per discipline from base
    const { data: baseCountData, error: baseCountError } = await supabase
        .from('concurso_questao_base')
        .select('disciplina_id')
        .eq('status', 'active')

    if (baseCountError) {
        console.error('Error fetching base question counts:', baseCountError)
        return {}
    }

    const baseCounts: Record<string, number> = {}
    baseCountData?.forEach(q => {
        if (q.disciplina_id) {
            baseCounts[q.disciplina_id] = (baseCounts[q.disciplina_id] || 0) + 1
        }
    })

    // 2. Fetch user responses for these disciplines
    const { data: responseData, error: responseError } = await supabase
        .from('concurso_user_respostas')
        .select('disciplina_id, is_correct, question_id')
        .eq('user_id', userId)

    if (responseError) {
        console.error('Error fetching user responses performance:', responseError)
        return {}
    }

    const performance: Record<string, UserPerformanceStats> = {}

    // Grouping responses by discipline
    responseData?.forEach(resp => {
        const dId = resp.disciplina_id
        if (!dId) return

        if (!performance[dId]) {
            performance[dId] = {
                id: dId,
                total_vistas: 0,
                acertos: 0,
                precisao_media: 0,
                completude: 0,
                total_questoes_base: baseCounts[dId] || 0
            }
        }

        performance[dId].total_vistas += 1
        if (resp.is_correct) {
            performance[dId].acertos += 1
        }
    })

    // Calculate final percentages
    Object.keys(performance).forEach(dId => {
        const stats = performance[dId]
        
        // Average Accuracy
        stats.precisao_media = stats.total_vistas > 0 
            ? Math.round((stats.acertos / stats.total_vistas) * 100) 
            : 0

        // Completion (Unique questions solved vs Total available)
        // Note: For a more accurate unique count, we'd need a Set of questao_ids per discipline
        const uniqueQuestionsSolved = (responseData || [])
            .filter(r => r.disciplina_id === dId)
            .map(r => r.question_id).length

        const totalBase = stats.total_questoes_base || 0
        stats.completude = totalBase > 0
            ? Math.round((new Set((responseData || []).filter(r => r.disciplina_id === dId).map(r => r.question_id)).size / totalBase) * 100)
            : 0
    })

    return performance
}
