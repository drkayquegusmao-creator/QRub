import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserResponse } from '@/lib/data-mock'
import { addDays, isBefore, parseISO, startOfDay, differenceInDays } from 'date-fns'
import { createClient } from '@supabase/supabase-js'

type SRSStage = 'NEUTRAL' | 'LEVELING' | 'ACTIVE'
type SRSLevel = 'FRACO' | 'REGULAR' | 'BOM' | 'FORTE' | 'NOT_LEVELED'

export interface SubjectSRS {
    subject_id: string
    stage: SRSStage
    level: SRSLevel

    // Leveling Phase Metrics
    leveling_count: number // Count up to 10
    leveling_correct: number

    // Active Phase Metrics
    total_questions: number
    total_correct: number
    streak: number // Consecutive correct answers

    // Performance Tracking
    current_interval: number // in days
    last_accuracy: number | null

    // Scheduling
    last_eval_date: string | null // ISO Date
    next_review_date: string | null // ISO Date

    history: { date: string, accuracy: number, level: SRSLevel }[]
}

interface SRSState {
    subjects: Record<string, SubjectSRS>
    loading: boolean

    // Action called whenever a user answers a question
    process_answer: (user_id: string | null, response: UserResponse, subject_id: string) => Promise<void>

    // Core Engine Logic
    get_intelligent_action: (questions?: any[]) => {
        type: 'NIVELAMENTO' | 'REVISÃO' | 'REFORÇO' | 'MANUTENÇÃO' | 'TUDO_EM_DIA' | 'CARREGANDO' | 'DESCANSANDO',
        subject_id: string | null,
        status: 'ALERTA' | 'ATRASADO' | 'MANUTENÇÃO' | 'NÃO_NIVELADO' | 'NORMAL' | 'AGUARDE' | 'CONCLUÍDO' | 'FOLGA'
    }

    // Supabase Sync
    load_progress: (user_id: string) => Promise<void>
    load_folgas: (user_id: string) => Promise<void>
    folgas: string[]

    // Dynamic Taxonomy
    taxonomy: any[]
    init_taxonomy: () => Promise<void>

    save_progress: (user_id: string, subject_id: string) => Promise<void>

    // Getters for UI
    get_daily_agenda: (questions?: any[]) => SubjectSRS[]
    get_pending_tasks: (questions?: any[]) => SubjectSRS[]
    get_critical_points: () => { type: 'QUEDA_PERFORMANCE' | 'ERRO_CRÍTICO', subject_id: string }[]
    get_subject_status: (subject_id: string) => SubjectSRS | undefined
}

const get_initial_interval = (level: SRSLevel): number => {
    switch (level) {
        case 'FORTE': return 30
        case 'BOM': return 14
        default: return 7 // FRACO / REGULAR
    }
}

const classify_accuracy = (accuracy: number): SRSLevel => {
    if (accuracy >= 85) return 'FORTE'
    if (accuracy >= 70) return 'BOM'
    if (accuracy >= 50) return 'REGULAR'
    return 'FRACO'
}

export const useSRS = create<SRSState>()(
    persist(
        (set, get) => ({
            subjects: {},
            loading: false,
            taxonomy: [],
            folgas: [],

            init_taxonomy: async () => {
                const { taxonomy } = get()
                if (taxonomy.length > 0) return

                try {
                    const supabase = createClient(
                        process.env.NEXT_PUBLIC_SUPABASE_URL!,
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                    )
                    const { data, error } = await supabase
                        .from('taxonomia')
                        .select('id, slug, name, parent_id, level, metadata')
                        .eq('active', true)

                    if (error || !data) return

                    // Transform flat list to hierarchy matching MEDICAL_HIERARCHY structure
                    const buildHierarchy = (items: any[]) => {
                        const nodeMap = new Map()
                        const roots: any[] = []

                        // Create nodes
                        items.forEach(item => {
                            const node = {
                                id: item.slug, // Map slug to id for app compatibility
                                name: item.name,
                                uuid: item.id,
                                category: item.metadata?.category, // Only for specialties
                                specialties: item.level === 'course' ? [] : undefined,
                                subspecialties: item.level === 'specialty' ? [] : undefined,
                                subjects: item.level === 'subspecialty' ? [] : undefined
                            }
                            nodeMap.set(item.id, node)
                        })

                        // Link parents
                        items.forEach(item => {
                            const node = nodeMap.get(item.id)
                            if (item.parent_id && nodeMap.has(item.parent_id)) {
                                const parent = nodeMap.get(item.parent_id)
                                if (item.level === 'specialty') {
                                    if (!parent.specialties) parent.specialties = []
                                    parent.specialties.push(node)
                                } else if (item.level === 'subspecialty') {
                                    if (!parent.subspecialties) parent.subspecialties = []
                                    parent.subspecialties.push(node)
                                } else if (item.level === 'subject') {
                                    if (!parent.subjects) parent.subjects = []
                                    parent.subjects.push(node)
                                }
                            } else if (item.level === 'course') {
                                roots.push(node)
                            }
                        })

                        return roots
                    }

                    const hierarchy = buildHierarchy(data)
                    set({ taxonomy: hierarchy })
                } catch (err) {
                    console.error('Failed to load dynamic taxonomy for SRS:', err)
                }
            },


            process_answer: async (user_id, response, subject_id) => {
                // The leveling logic is invisible but mandatory
                set((state) => {
                    const subjects = { ...state.subjects }

                    if (!subjects[subject_id]) {
                        subjects[subject_id] = {
                            subject_id: subject_id,
                            stage: 'NEUTRAL',
                            level: 'NOT_LEVELED',
                            leveling_count: 0,
                            leveling_correct: 0,
                            total_questions: 0,
                            total_correct: 0,
                            streak: 0,
                            current_interval: 7,
                            last_accuracy: null,
                            last_eval_date: null,
                            next_review_date: null,
                            history: []
                        }
                    }

                    const sub = subjects[subject_id]

                    if (sub.stage === 'NEUTRAL') {
                        sub.stage = 'LEVELING'
                    }

                    if (sub.stage === 'LEVELING') {
                        sub.leveling_count += 1
                        if (response.is_correct) sub.leveling_correct += 1

                        if (sub.leveling_count >= 10) {
                            const accuracy = (sub.leveling_correct / sub.leveling_count) * 100
                            sub.level = classify_accuracy(accuracy)
                            sub.stage = 'ACTIVE'
                            sub.last_accuracy = accuracy
                            sub.current_interval = get_initial_interval(sub.level)
                            sub.last_eval_date = new Date().toISOString()
                            sub.next_review_date = addDays(new Date(), sub.current_interval).toISOString()

                            sub.history.push({
                                date: new Date().toISOString(),
                                accuracy,
                                level: sub.level
                            })

                            // Reset leveling counters after completion
                            sub.total_questions = sub.leveling_count
                            sub.total_correct = sub.leveling_correct
                        }
                    }
                    else if (sub.stage === 'ACTIVE') {
                        sub.total_questions += 1
                        if (response.is_correct) {
                            sub.total_correct += 1
                            sub.streak += 1
                        } else {
                            sub.streak = 0
                        }

                        // Every session of revision (usually 5-12 questions) triggers a re-eval
                        const accuracy = (sub.total_correct / sub.total_questions) * 100
                        sub.last_accuracy = accuracy
                        sub.last_eval_date = new Date().toISOString()

                        // Adaptive Interval: Increase if streak is high, decrease if streak is 0
                        if (response.is_correct && sub.streak >= 3) {
                            sub.current_interval = Math.min(60, sub.current_interval + 7)
                        } else if (!response.is_correct) {
                            sub.current_interval = Math.max(1, Math.floor(sub.current_interval / 2))
                        }

                        sub.next_review_date = addDays(new Date(), sub.current_interval).toISOString()
                        sub.level = classify_accuracy(accuracy)
                    }

                    return { subjects }
                })

                if (user_id) {
                    await get().save_progress(user_id, subject_id)
                }
            },

            load_progress: async (user_id) => {
                try {
                    const { supabase, isSupabaseConfigured } = require('@/lib/supabase')
                    if (!isSupabaseConfigured()) {
                        console.log('Supabase not configured, skipping SRS progress load')
                        return
                    }

                    set({ loading: true })

                    // Initialize taxonomy if not loaded
                    await get().init_taxonomy()

                    // Load folgas
                    await get().load_folgas(user_id)

                    const { data, error } = await supabase
                        .from('subject_progress')
                        .select('*')
                        .eq('user_id', user_id)

                    if (error) {
                        // If table doesn't exist or other DB error, just log and continue
                        console.warn('Could not load SRS progress from Supabase:', error.message)
                        return
                    }

                    if (data && data.length > 0) {
                        const subjects: Record<string, SubjectSRS> = {}
                        data.forEach((row: any) => {
                            subjects[row.subject_id] = {
                                subject_id: row.subject_id,
                                stage: row.stage,
                                level: row.level,
                                leveling_count: row.leveling_count,
                                leveling_correct: row.leveling_correct,
                                total_questions: row.total_questions,
                                total_correct: row.total_correct,
                                streak: row.streak,
                                current_interval: row.current_interval,
                                last_accuracy: row.last_accuracy,
                                last_eval_date: row.last_eval_date,
                                next_review_date: row.next_review_date,
                                history: row.history || []
                            }
                        })
                        set({ subjects })
                        console.log(`Loaded SRS progress for ${Object.keys(subjects).length} subjects`)
                    } else {
                        console.log('No SRS progress found in Supabase for this user')
                    }
                } catch (err) {
                    // Catch any unexpected errors (network issues, etc)
                    console.warn('Error loading SRS progress (using local data):', err instanceof Error ? err.message : 'Unknown error')
                } finally {
                    set({ loading: false })
                }
            },

            save_progress: async (user_id, subject_id) => {
                try {
                    const { supabase, isSupabaseConfigured } = require('@/lib/supabase')
                    if (!isSupabaseConfigured()) {
                        // Silently skip if Supabase not configured
                        return
                    }

                    const sub = get().subjects[subject_id]
                    if (!sub) return

                    const { error } = await supabase
                        .from('subject_progress')
                        .upsert({
                            user_id,
                            subject_id,
                            stage: sub.stage,
                            level: sub.level,
                            leveling_count: sub.leveling_count,
                            leveling_correct: sub.leveling_correct,
                            total_questions: sub.total_questions,
                            total_correct: sub.total_correct,
                            streak: sub.streak,
                            current_interval: sub.current_interval,
                            last_accuracy: sub.last_accuracy,
                            last_eval_date: sub.last_eval_date,
                            next_review_date: sub.next_review_date,
                            history: sub.history
                        }, { onConflict: 'user_id,subject_id' })

                    if (error) {
                        console.warn('Could not save SRS progress to Supabase:', error.message)
                    }
                } catch (err) {
                    console.warn('Error saving SRS progress (data saved locally):', err instanceof Error ? err.message : 'Unknown error')
                }
            },

            load_folgas: async (user_id) => {
                const { supabase, isSupabaseConfigured } = require('@/lib/supabase')
                if (!isSupabaseConfigured()) return

                try {
                    const { data, error } = await supabase
                        .from('user_folgas')
                        .select('data')
                        .eq('user_id', user_id)

                    if (error) throw error
                    if (data) {
                        set({ folgas: data.map((f: any) => f.data) })
                    }
                } catch (err) {
                    console.warn('Error loading folgas:', err)
                }
            },

            get_intelligent_action: (manualQuestions?: any[]) => {
                const { subjects, folgas } = get()
                const today = startOfDay(new Date())
                const todayStr = new Date().toISOString().split('T')[0]

                // Check if today is a folga
                if (folgas.includes(todayStr)) {
                    return {
                        type: 'DESCANSANDO',
                        subject_id: null,
                        status: 'FOLGA'
                    }
                }

                const all_subs = Object.values(subjects)

                // Source of truth for questions (prefer manual passed for reactivity)
                let questions = manualQuestions
                if (!questions) {
                    try {
                        const { useQuestions } = require('@/store/use-questions')
                        questions = useQuestions.getState().questions || []
                    } catch (err) {
                        questions = []
                    }
                }

                if (!questions || questions.length === 0) {
                    return {
                        type: 'CARREGANDO',
                        subject_id: null,
                        status: 'AGUARDE'
                    }
                }

                // 1. Priority: Delayed Revisions
                const overdue = all_subs.find(s =>
                    s.stage === 'ACTIVE' &&
                    s.next_review_date &&
                    isBefore(parseISO(s.next_review_date), today) &&
                    questions!.some((q: any) =>
                        (q.subject_id === s.subject_id || q.subspecialty_id === s.subject_id || q.specialty_id === s.subject_id) &&
                        q.status_validacao === 'APROVADA'
                    )
                )
                if (overdue) {
                    return {
                        type: 'REVISÃO',
                        subject_id: overdue.subject_id,
                        status: 'ATRASADO'
                    }
                }

                // 2. Priority: Revisions for Today
                const today_review = all_subs.find(s =>
                    s.stage === 'ACTIVE' &&
                    s.next_review_date &&
                    differenceInDays(parseISO(s.next_review_date), today) === 0 &&
                    questions!.some((q: any) =>
                        (q.subject_id === s.subject_id || q.subspecialty_id === s.subject_id || q.specialty_id === s.subject_id) &&
                        q.status_validacao === 'APROVADA'
                    )
                )
                if (today_review) {
                    return {
                        type: 'REVISÃO',
                        subject_id: today_review.subject_id,
                        status: 'NORMAL'
                    }
                }

                // 3. Priority: In-progress Leveling (only if questions still exist)
                const incomplete_leveling = all_subs.find(s =>
                    s.stage === 'LEVELING' &&
                    questions!.some((q: any) =>
                        (q.subject_id === s.subject_id || q.subspecialty_id === s.subject_id || q.specialty_id === s.subject_id) &&
                        q.status_validacao === 'APROVADA'
                    )
                )
                if (incomplete_leveling) {
                    return {
                        type: 'NIVELAMENTO',
                        subject_id: incomplete_leveling.subject_id,
                        status: 'NÃO_NIVELADO'
                    }
                }

                // 4. Priority: Start New Leveling (Maintenance/Progression)
                // Use dynamic taxonomy if available, fallback to static
                let allSpecialties = []
                const { taxonomy } = get()

                if (taxonomy.length > 0 && taxonomy[0].specialties) {
                    allSpecialties = taxonomy[0].specialties
                } else {
                    const { MEDICAL_HIERARCHY } = require('@/lib/medical-specialties')
                    allSpecialties = MEDICAL_HIERARCHY[0].specialties
                }

                // Find specialties the user hasn't started yet and THAT HAVE QUESTIONS APROVADAS
                const untrackedWithQuestions = allSpecialties.filter((spec: any) => {
                    const isUntracked = !subjects[spec.id]
                    const hasQuestions = questions!.some((q: any) =>
                        (q.subject_id === spec.id || q.subspecialty_id === spec.id || q.specialty_id === spec.id) &&
                        q.status_validacao === 'APROVADA'
                    )
                    return isUntracked && hasQuestions
                })

                if (untrackedWithQuestions.length > 0) {
                    // Select first available untracked specialty with questions
                    const selected = untrackedWithQuestions[0]
                    return {
                        type: 'NIVELAMENTO',
                        subject_id: selected.id,
                        status: 'NÃO_NIVELADO'
                    }
                }

                // 5. Fallback: If everything is tracked and up to date
                return {
                    type: 'TUDO_EM_DIA',
                    subject_id: null,
                    status: 'CONCLUÍDO'
                }
            },

            get_pending_tasks: (manualQuestions?: any[]) => {
                const { subjects } = get()
                const today = startOfDay(new Date())

                // Source of truth for questions
                let questions = manualQuestions
                if (!questions) {
                    try {
                        const { useQuestions } = require('@/store/use-questions')
                        questions = useQuestions.getState().questions || []
                    } catch (err) {
                        questions = []
                    }
                }

                return Object.values(subjects).filter(s => {
                    // Check availability first
                    const hasQuestions = questions?.some((q: any) =>
                        (q.subject_id === s.subject_id || q.subspecialty_id === s.subject_id || q.specialty_id === s.subject_id) &&
                        q.status_validacao === 'APROVADA'
                    )

                    if (!hasQuestions) return false

                    if (s.stage === 'LEVELING') return true
                    if (s.stage === 'ACTIVE' && s.next_review_date && isBefore(parseISO(s.next_review_date), today)) return true
                    return false
                })
            },

            get_critical_points: () => {
                const { subjects } = get()
                const points: { type: 'QUEDA_PERFORMANCE' | 'ERRO_CRÍTICO', subject_id: string }[] = []

                Object.values(subjects).forEach(s => {
                    if (s.stage === 'ACTIVE' && s.last_accuracy !== null && s.last_accuracy < 50) {
                        points.push({ type: 'QUEDA_PERFORMANCE', subject_id: s.subject_id })
                    }
                })

                return points
            },

            get_daily_agenda: (manualQuestions?: any[]) => {
                const { subjects } = get()
                const today = new Date()

                // Source of truth for questions
                let questions = manualQuestions
                if (!questions) {
                    try {
                        const { useQuestions } = require('@/store/use-questions')
                        questions = useQuestions.getState().questions || []
                    } catch (err) {
                        questions = []
                    }
                }

                // 1. Get Due Reviews
                const dueReviews = Object.values(subjects).filter(s =>
                    s.stage === 'ACTIVE' &&
                    s.next_review_date &&
                    isBefore(parseISO(s.next_review_date), addDays(today, 1)) &&
                    questions!.some((q: any) =>
                        (q.subject_id === s.subject_id || q.subspecialty_id === s.subject_id || q.specialty_id === s.subject_id) &&
                        q.status_validacao === 'APROVADA'
                    )
                )

                // 2. Get Ongoing Leveling
                const ongoingLeveling = Object.values(subjects).filter(s =>
                    s.stage === 'LEVELING' &&
                    questions!.some((q: any) =>
                        (q.subject_id === s.subject_id || q.subspecialty_id === s.subject_id || q.specialty_id === s.subject_id) &&
                        q.status_validacao === 'APROVADA'
                    )
                )

                const combined = [...dueReviews, ...ongoingLeveling]

                // 3. If empty, suggest new subjects from hierarchy THAT HAVE QUESTIONS
                if (combined.length === 0) {
                    let allSpecialties = []
                    const { taxonomy } = get()

                    if (taxonomy.length > 0 && taxonomy[0].specialties) {
                        allSpecialties = taxonomy[0].specialties
                    } else {
                        const { MEDICAL_HIERARCHY } = require('@/lib/medical-specialties')
                        allSpecialties = MEDICAL_HIERARCHY[0].specialties
                    }
                    const untracked = allSpecialties.filter((spec: any) =>
                        !subjects[spec.id] &&
                        questions!.some((q: any) =>
                            (q.subject_id === spec.id || q.subspecialty_id === spec.id || q.specialty_id === spec.id) &&
                            q.status_validacao === 'APROVADA'
                        )
                    )

                    if (untracked.length > 0) {
                        // Suggest first 3 untracked subjects as PENDING
                        return untracked.slice(0, 3).map((spec: any) => ({
                            subject_id: spec.id,
                            stage: 'NEUTRAL',
                            level: 'NOT_LEVELED',
                            next_review_date: null
                        })) as any
                    }
                }

                return combined
            },

            get_subject_status: (subject_id) => {
                return get().subjects[subject_id]
            }
        }),
        {
            name: 'qrub-srs-engine-v2',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
