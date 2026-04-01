import { supabase } from '../supabase'

export interface UserErrorStats {
    total: number
    resolved: number
    causes: {
        conhecimento: number
        desatencao: number
        interpretacao: number
        decoreba: number
    }
    topDisciplines: Array<{
        id: string
        name: string
        count: number
    }>
    isLockdownActive: boolean
}

export async function fetchErrorDashboardStats(userId: string): Promise<UserErrorStats> {
    const { data: errors, error } = await supabase
        .from('concurso_user_errors')
        .select('error_cause, is_resolved, disciplina_id, assunto_id')
        .eq('user_id', userId)

    if (error || !errors) {
        return {
            total: 0,
            resolved: 0,
            causes: { conhecimento: 0, desatencao: 0, interpretacao: 0, decoreba: 0 },
            topDisciplines: [],
            isLockdownActive: false
        }
    }

    const stats: UserErrorStats = {
        total: errors.length,
        resolved: errors.filter(e => e.is_resolved).length,
        causes: { conhecimento: 0, desatencao: 0, interpretacao: 0, decoreba: 0 },
        topDisciplines: [],
        isLockdownActive: false
    }

    const disciplineMap: Record<string, number> = {}

    errors.forEach(e => {
        if (e.error_cause) {
            stats.causes[e.error_cause as keyof typeof stats.causes]++
        }
        if (e.disciplina_id) {
            disciplineMap[e.disciplina_id] = (disciplineMap[e.disciplina_id] || 0) + 1
        }
    })

    // To get discipline names, we'd need another query or a join. 
    // For now, returning the IDs. We will handle names in the UI or fetch them.
    stats.topDisciplines = Object.entries(disciplineMap)
        .map(([id, count]) => ({ id, name: 'Disciplina', count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 4)

    // Lockdown: total > 20 OR any discipline > 3 errors in a subject
    let isLockdown = stats.total - stats.resolved > 20
    
    // Detailed check for 3+ errors in a subject
    if (!isLockdown) {
        const subjectCount: Record<string, number> = {}
        const unresolved = errors.filter(e => !e.is_resolved)
        unresolved.forEach(e => {
            if (e.assunto_id) {
                subjectCount[e.assunto_id] = (subjectCount[e.assunto_id] || 0) + 1
                if (subjectCount[e.assunto_id] >= 3) isLockdown = true
            }
        })
    }

    stats.isLockdownActive = isLockdown

    return stats
}

export async function fetchLockdownQuestions(userId: string) {
    const { data: errors } = await supabase
        .from('concurso_user_errors')
        .select('question_id')
        .eq('user_id', userId)
        .eq('is_resolved', false)
        .limit(10)

    if (!errors || errors.length === 0) return []

    const qIds = errors.map(e => e.question_id)
    const { data: qs } = await supabase
        .from('concurso_questao_base')
        .select('*, banca:concurso_bancas(*), disciplina:concurso_disciplinas(*), assunto:concurso_assuntos(*)')
        .in('id', qIds)
    
    return qs || []
}

export async function saveSuperacaoNote(errorId: string, note: string) {
    return await supabase
        .from('concurso_user_errors')
        .update({ anotacao_superacao: note, updated_at: new Date().toISOString() })
        .eq('id', errorId)
}

export async function updateErrorHit(errorId: string, isCorrect: boolean) {
    if (!isCorrect) {
        return await supabase
            .from('concurso_user_errors')
            .update({ consecutive_correct_hits: 0, updated_at: new Date().toISOString() })
            .eq('id', errorId)
    }

    const { data: current } = await supabase
        .from('concurso_user_errors')
        .select('consecutive_correct_hits')
        .eq('id', errorId)
        .single()

    const newHits = (current?.consecutive_correct_hits || 0) + 1
    const isResolved = newHits >= 2

    return await supabase
        .from('concurso_user_errors')
        .update({ 
            consecutive_correct_hits: newHits, 
            is_resolved: isResolved,
            updated_at: new Date().toISOString() 
        })
        .eq('id', errorId)
}
