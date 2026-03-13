import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─── Types ───────────────────────────────────────────────────────────────────

export type ScopeType = 'area' | 'subarea' | 'tema'

export type MasteryLevel = 'MUITO_BAIXO' | 'BAIXO' | 'BOM' | 'ALTO'

export interface ScopeConfig {
    scopeType: ScopeType
    specialtyId?: string
    subspecialtyId?: string
    subjectId?: string
    label: string
}

export interface QuestionCountMap {
    [specialtyId: string]: {
        total: number
        subspecialties: {
            [subspecialtyId: string]: {
                total: number
                subjects: { [subjectId: string]: number }
            }
        }
    }
}

export interface PlacementResult {
    sessionId: string
    score: number
    masteryLevel: MasteryLevel
    correct: number
    wrong: number
    total: number
    avgTimeSeconds: number
}

// ─── Constants ────────────────────────────────────────────────────────────────
// 🟢 DASHBOARD STATS & CONFIG
export async function getSrsConfig() {
    const { data } = await supabase.from('system_settings').select('value').eq('key', 'srs_config').single()
    return data?.value as typeof DEFAULT_DIAGNOSTIC_CONFIG | null
}

const DEFAULT_DIAGNOSTIC_CONFIG = {
    questions: {
        area: 25,
        subarea: 15,
        tema: 10
    },
    difficulty_distribution: {
        area: { easy: 8, medium: 10, hard: 7 },
        subarea: { easy: 5, medium: 6, hard: 4 },
        tema: { easy: 4, medium: 4, hard: 2 }
    }
}

const QUESTION_COUNTS = { area: 20, subarea: 15, tema: 10 }

const DIFFICULTY_DIST = {
    area: { easy: 6, medium: 8, hard: 6 },
    subarea: { easy: 5, medium: 6, hard: 4 },
    tema: { easy: 4, medium: 4, hard: 2 },
}

const MASTERY_INTERVALS: Record<MasteryLevel, number[]> = {
    MUITO_BAIXO: [1, 3, 7, 14, 30],
    BAIXO: [3, 7, 15, 30],
    BOM: [7, 15, 30, 60],
    ALTO: [15, 30, 60, 90],
}

const MASTERY_QUESTION_COUNTS: Record<MasteryLevel, number[]> = {
    MUITO_BAIXO: [10, 10, 12, 12, 15],
    BAIXO: [8, 10, 10, 12],
    BOM: [6, 8, 10, 10],
    ALTO: [5, 6, 8, 8],
}

function getMastery(score: number): MasteryLevel {
    if (score <= 39) return 'MUITO_BAIXO'
    if (score <= 59) return 'BAIXO'
    if (score <= 79) return 'BOM'
    return 'ALTO'
}

function getPriority(mastery: MasteryLevel, cycle: number): string {
    if (mastery === 'MUITO_BAIXO') return 'muito_alta'
    if (mastery === 'BAIXO' && cycle <= 2) return 'alta'
    if (mastery === 'BOM') return 'media'
    return 'baixa'
}

// ─── Question Count Fetching ──────────────────────────────────────────────────

export async function fetchQuestionCounts(): Promise<QuestionCountMap> {
    const { data, error } = await supabase
        .from('questao_base')
        .select('specialty_id, subspecialty_id, subject_id')
        .eq('status_validacao', 'APROVADA')
        .not('specialty_id', 'is', null)
        .neq('specialty_id', '')

    if (error || !data) return {}

    const map: QuestionCountMap = {}

    for (const row of data) {
        const spec = row.specialty_id as string
        const sub = row.subspecialty_id as string
        const subj = row.subject_id as string

        if (!spec) continue

        if (!map[spec]) map[spec] = { total: 0, subspecialties: {} }
        map[spec].total++

        if (sub) {
            if (!map[spec].subspecialties[sub]) {
                map[spec].subspecialties[sub] = { total: 0, subjects: {} }
            }
            map[spec].subspecialties[sub].total++

            if (subj) {
                const cur = map[spec].subspecialties[sub].subjects[subj] || 0
                map[spec].subspecialties[sub].subjects[subj] = cur + 1
            }
        }
    }

    return map
}

// ─── Question Fetching ────────────────────────────────────────────────────────

export async function fetchQuestionsForNivelamento(
    scope: ScopeConfig,
    userId: string,
    count: number = 10
): Promise<any[]> {
    const config = await getSrsConfig() || DEFAULT_DIAGNOSTIC_CONFIG
    const targetCount = config.questions[scope.scopeType]
    const distribution = config.difficulty_distribution[scope.scopeType]

    const recentUsed = await getRecentlyUsedQuestions(userId, 30)

    let query = supabase
        .from('questao_base')
        .select('id, enunciado, alternativas, resposta_correta, explicacao, dificuldade, specialty_id, subspecialty_id, subject_id')
        .eq('status_validacao', 'APROVADA')

    // Apply scope filters
    if (scope.scopeType === 'area' && scope.specialtyId) {
        query = query.eq('specialty_id', scope.specialtyId)
    } else if (scope.scopeType === 'subarea' && scope.subspecialtyId) {
        query = query
            .eq('specialty_id', scope.specialtyId!)
            .eq('subspecialty_id', scope.subspecialtyId)
    } else if (scope.scopeType === 'tema' && scope.subjectId) {
        query = query
            .eq('specialty_id', scope.specialtyId!)
            .eq('subspecialty_id', scope.subspecialtyId!)
            .eq('subject_id', scope.subjectId)
    }

    // Exclude recently used
    if (recentUsed.length > 0) {
        query = query.not('id', 'in', `(${recentUsed.join(',')})`)
    }

    const { data: allQuestions } = await query.limit(500)
    if (!allQuestions || allQuestions.length === 0) return []

    // Distribute by difficulty
    const easy = allQuestions.filter(q => (q.dificuldade || '').toLowerCase() === 'facil' || (q.dificuldade || '').toLowerCase() === 'fácil')
    const medium = allQuestions.filter(q => (q.dificuldade || '').toLowerCase() === 'medio' || (q.dificuldade || '').toLowerCase() === 'médio')
    const hard = allQuestions.filter(q => (q.dificuldade || '').toLowerCase() === 'dificil' || (q.dificuldade || '').toLowerCase() === 'difícil')

    const shuffle = (arr: any[]) => arr.sort(() => Math.random() - 0.5)

    const selected = [
        ...shuffle(easy).slice(0, distribution.easy),
        ...shuffle(medium).slice(0, distribution.medium),
        ...shuffle(hard).slice(0, distribution.hard),
    ]

    // If we don't have enough, pad from the full pool
    if (selected.length < count) {
        const usedIds = new Set(selected.map((q: any) => q.id))
        const remaining = shuffle(allQuestions.filter((q: any) => !usedIds.has(q.id)))
        selected.push(...remaining.slice(0, count - selected.length))
    }

    return shuffle(selected).slice(0, count)
}

async function getRecentlyUsedQuestions(userId: string, days: number): Promise<string[]> {
    const since = new Date()
    since.setDate(since.getDate() - days)

    const { data } = await supabase
        .from('questao_uso_usuario')
        .select('questao_id')
        .eq('user_id', userId)
        .gte('ultimo_uso', since.toISOString())
        .limit(200)

    return (data || []).map((r: any) => r.questao_id)
}

// ─── Session Management ───────────────────────────────────────────────────────

export async function createPlacementSession(
    userId: string,
    scope: ScopeConfig,
    totalQuestions?: number
): Promise<string> {
    const config = await getSrsConfig()
    const count = totalQuestions || config?.questions?.[scope.scopeType] || 15
    const { data, error } = await supabase
        .from('placement_sessions')
        .insert({
            user_id: userId,
            scope_type: scope.scopeType,
            specialty_id: scope.specialtyId || null,
            subspecialty_id: scope.subspecialtyId || null,
            subject_id: scope.subjectId || null,
            scope_label: scope.label,
            total_questions: count,
            status: 'in_progress',
        })
        .select('id')
        .single()

    if (error || !data) throw new Error('Failed to create placement session')
    return data.id
}

export async function completePlacementSession(
    sessionId: string,
    userId: string,
    scope: ScopeConfig,
    correct: number,
    total: number,
    avgTimeSeconds: number
): Promise<PlacementResult> {
    const wrong = total - correct
    const score = Math.round((correct / Math.max(total, 1)) * 100)
    const mastery = getMastery(score)

    await supabase
        .from('placement_sessions')
        .update({
            correct_answers: correct,
            wrong_answers: wrong,
            score_percent: score,
            avg_time_seconds: avgTimeSeconds,
            mastery_level: mastery,
            status: 'completed',
            completed_at: new Date().toISOString(),
        })
        .eq('id', sessionId)
        .eq('user_id', userId)

    // Update memory
    await upsertUserSubjectMemory(userId, scope, score, mastery, 'placement')

    // Generate spaced review plan
    await generateSpacedReviewPlan(userId, scope, sessionId, score, mastery)

    return { sessionId, score, masteryLevel: mastery, correct, wrong, total, avgTimeSeconds }
}

// ─── User Subject Memory ──────────────────────────────────────────────────────

async function upsertUserSubjectMemory(
    userId: string,
    scope: ScopeConfig,
    score: number,
    mastery: MasteryLevel,
    type: 'placement' | 'review'
) {
    const { data: existing } = await supabase
        .from('user_subject_memory')
        .select('*')
        .eq('user_id', userId)
        .eq('specialty_id', scope.specialtyId || '')
        .eq('subspecialty_id', scope.subspecialtyId || '')
        .eq('subject_id', scope.subjectId || '')
        .eq('scope_type', scope.scopeType)
        .maybeSingle()

    const now = new Date().toISOString()

    if (!existing) {
        await supabase.from('user_subject_memory').insert({
            user_id: userId,
            scope_type: scope.scopeType,
            specialty_id: scope.specialtyId || null,
            subspecialty_id: scope.subspecialtyId || null,
            subject_id: scope.subjectId || null,
            scope_label: scope.label,
            first_placement_at: now,
            last_activity_at: now,
            last_score: score,
            best_score: score,
            worst_score: score,
            average_score: score,
            total_placements: type === 'placement' ? 1 : 0,
            total_reviews: type === 'review' ? 1 : 0,
            mastery_level: mastery,
            retention_status: getRetentionStatus(mastery),
            updated_at: now,
        })
    } else {
        const newTotal = (type === 'placement' ? existing.total_placements + 1 : existing.total_placements)
        const newReviews = (type === 'review' ? existing.total_reviews + 1 : existing.total_reviews)
        const scores = [existing.average_score, score].filter(Boolean)
        const newAvg = scores.reduce((a, b) => a + b, 0) / scores.length

        await supabase
            .from('user_subject_memory')
            .update({
                last_activity_at: now,
                last_score: score,
                best_score: Math.max(existing.best_score || 0, score),
                worst_score: Math.min(existing.worst_score ?? 100, score),
                average_score: Math.round(newAvg),
                total_placements: newTotal,
                total_reviews: newReviews,
                mastery_level: mastery,
                retention_status: getRetentionStatus(mastery, existing),
                updated_at: now,
            })
            .eq('id', existing.id)
    }
}

function getRetentionStatus(mastery: MasteryLevel, existing?: any): string {
    if (mastery === 'ALTO') {
        const completedReviews = existing?.completed_reviews || 0
        if (completedReviews >= 3) return 'consolidado'
        return 'em_consolidacao'
    }
    if (mastery === 'BOM') return 'em_consolidacao'
    if (mastery === 'BAIXO') return 'fragil'
    return 'critico'
}

// ─── Spaced Review Plan Generation ───────────────────────────────────────────

export async function generateSpacedReviewPlan(
    userId: string,
    scope: ScopeConfig,
    sessionId: string,
    score: number,
    mastery: MasteryLevel
) {
    // Prevent duplicate plans
    const today = new Date().toISOString().split('T')[0]
    const { data: existing } = await supabase
        .from('spaced_review_plans')
        .select('id')
        .eq('user_id', userId)
        .eq('specialty_id', scope.specialtyId || '')
        .eq('subspecialty_id', scope.subspecialtyId || '')
        .eq('subject_id', scope.subjectId || '')
        .eq('active', true)
        .gte('created_at', today + 'T00:00:00.000Z')
        .maybeSingle()

    if (existing) return

    const { data: plan, error } = await supabase
        .from('spaced_review_plans')
        .insert({
            user_id: userId,
            origin_type: 'nivelamento',
            origin_session_id: sessionId,
            scope_type: scope.scopeType,
            specialty_id: scope.specialtyId || null,
            subspecialty_id: scope.subspecialtyId || null,
            subject_id: scope.subjectId || null,
            scope_label: scope.label,
            base_score_percent: score,
            mastery_level: mastery,
            active: true,
        })
        .select('id')
        .single()

    if (error || !plan) return

    // Generate review events
    const intervals = MASTERY_INTERVALS[mastery]
    const questionCounts = MASTERY_QUESTION_COUNTS[mastery]
    const baseDate = new Date()

    const events = intervals.map((days, i) => {
        const reviewDate = new Date(baseDate)
        reviewDate.setDate(reviewDate.getDate() + days)

        return {
            user_id: userId,
            plan_id: plan.id,
            scope_type: scope.scopeType,
            specialty_id: scope.specialtyId || null,
            subspecialty_id: scope.subspecialtyId || null,
            subject_id: scope.subjectId || null,
            scope_label: scope.label,
            review_cycle_number: i + 1,
            scheduled_date: reviewDate.toISOString().split('T')[0],
            question_count: questionCounts[i] || 10,
            priority: getPriority(mastery, i + 1),
            status: 'agendada',
            source_score: score,
        }
    })

    await supabase.from('spaced_review_events').insert(events)

    // Update pending reviews in memory
    await supabase
        .from('user_subject_memory')
        .update({
            pending_reviews: intervals.length,
            next_review_date: events[0].scheduled_date,
        })
        .eq('user_id', userId)
        .eq('specialty_id', scope.specialtyId || '')
        .eq('subspecialty_id', scope.subspecialtyId || '')
        .eq('subject_id', scope.subjectId || '')
        .eq('scope_type', scope.scopeType)
}

// ─── Dashboard Data ───────────────────────────────────────────────────────────

export async function getUserNivelamentoStats(userId: string) {
    const today = new Date().toISOString().split('T')[0]

    const [memoryRes, todayRes, overdueRes] = await Promise.all([
        supabase.from('user_subject_memory').select('*').eq('user_id', userId),
        supabase.from('spaced_review_events').select('*').eq('user_id', userId).eq('scheduled_date', today).neq('status', 'concluida'),
        supabase.from('spaced_review_events').select('*').eq('user_id', userId).lt('scheduled_date', today).eq('status', 'agendada'),
    ])

    const memory = memoryRes.data || []
    const todayReviews = todayRes.data || []
    const overdueReviews = overdueRes.data || []

    // Mark overdue events
    if (overdueReviews.length > 0) {
        const ids = overdueReviews.map((e: any) => e.id)
        await supabase.from('spaced_review_events').update({ status: 'atrasada' }).in('id', ids)
    }

    return {
        memory,
        todayReviews,
        overdueReviews,
        totalPlacements: memory.reduce((sum, m: any) => sum + (m.total_placements || 0), 0),
        totalReviews: memory.reduce((sum, m: any) => sum + (m.total_reviews || 0), 0),
        criticalSubjects: memory.filter((m: any) => m.retention_status === 'critico').length,
        consolidatedSubjects: memory.filter((m: any) => m.retention_status === 'consolidado').length,
        avgScore: memory.length > 0
            ? Math.round(memory.reduce((sum, m: any) => sum + (m.last_score || 0), 0) / memory.length)
            : 0,
    }
}

export async function getUpcomingReviews(userId: string, days = 7) {
    const today = new Date().toISOString().split('T')[0]
    const future = new Date()
    future.setDate(future.getDate() + days)
    const futureStr = future.toISOString().split('T')[0]

    const { data } = await supabase
        .from('spaced_review_events')
        .select('*')
        .eq('user_id', userId)
        .gte('scheduled_date', today)
        .lte('scheduled_date', futureStr)
        .neq('status', 'concluida')
        .order('scheduled_date', { ascending: true })

    return data || []
}
