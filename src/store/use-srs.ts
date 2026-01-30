import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserResponse } from '@/lib/data-mock'
import { addDays, isBefore, parseISO, startOfDay, differenceInDays } from 'date-fns'

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

    // Action called whenever a user answers a question
    process_answer: (is_insano: boolean, response: UserResponse, subject_id: string) => void

    // Core Engine Logic
    get_intelligent_action: () => {
        type: 'NIVELAMENTO' | 'REVISÃO' | 'REFORÇO' | 'MANUTENÇÃO' | 'TUDO_EM_DIA',
        subject_id: string | null,
        status: 'ALERTA' | 'ATRASADO' | 'MANUTENÇÃO' | 'NÃO_NIVELADO' | 'NORMAL'
    }

    // Getters for UI
    get_daily_agenda: () => SubjectSRS[]
    get_pending_tasks: () => SubjectSRS[]
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

            process_answer: (is_insano, response, subject_id) => {
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
                        // For simplicity in this mock, we re-eval after any answer but adaptive logic applies
                        const session_accuracy = response.is_correct ? 100 : 0 // Simplified for single answer processing

                        // Logic: After a set of questions (handled by the caller or quiz end)
                        // But let's refine current_interval based on trend
                    }

                    return { subjects }
                })
            },

            get_intelligent_action: () => {
                const { subjects } = get()
                const today = startOfDay(new Date())
                const all_subs = Object.values(subjects)

                // 1. Priority: Delayed Revisions
                const overdue = all_subs.find(s =>
                    s.stage === 'ACTIVE' &&
                    s.next_review_date &&
                    isBefore(parseISO(s.next_review_date), today)
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
                    differenceInDays(parseISO(s.next_review_date), today) === 0
                )
                if (today_review) {
                    return {
                        type: 'REVISÃO',
                        subject_id: today_review.subject_id,
                        status: 'NORMAL'
                    }
                }

                // 3. Priority: In-progress Leveling
                const incomplete_leveling = all_subs.find(s => s.stage === 'LEVELING')
                if (incomplete_leveling) {
                    return {
                        type: 'NIVELAMENTO',
                        subject_id: incomplete_leveling.subject_id,
                        status: 'NÃO_NIVELADO'
                    }
                }

                // 4. Priority: Start New Leveling (Maintenance/Progression)
                // In a real app, we'd pick a subject the user hasn't touched.
                return {
                    type: 'NIVELAMENTO',
                    subject_id: 'Clinica Médica', // Default suggestion
                    status: 'NÃO_NIVELADO'
                }
            },

            get_pending_tasks: () => {
                const { subjects } = get()
                const today = startOfDay(new Date())
                return Object.values(subjects).filter(s => {
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

            get_daily_agenda: () => {
                const { subjects } = get()
                const today = new Date()
                return Object.values(subjects).filter(s =>
                    s.stage === 'ACTIVE' &&
                    s.next_review_date &&
                    isBefore(parseISO(s.next_review_date), addDays(today, 1))
                )
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
