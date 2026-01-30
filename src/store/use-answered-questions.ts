import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AnsweredQuestionsState {
    answeredQuestions: Record<string, string[]> // userId -> questionIds
    markAsAnswered: (userId: string, questionId: string) => void
    hasAnswered: (userId: string, questionId: string) => boolean
    resetAnswered: (userId: string) => void
    getAnsweredCount: (userId: string) => number
}

export const useAnsweredQuestions = create<AnsweredQuestionsState>()(
    persist(
        (set, get) => ({
            answeredQuestions: {},

            markAsAnswered: (userId: string, questionId: string) => {
                set((state) => {
                    const userAnswered = state.answeredQuestions[userId] || []
                    if (userAnswered.includes(questionId)) return state

                    return {
                        answeredQuestions: {
                            ...state.answeredQuestions,
                            [userId]: [...userAnswered, questionId]
                        }
                    }
                })
            },

            hasAnswered: (userId: string, questionId: string) => {
                const userAnswered = get().answeredQuestions[userId] || []
                return userAnswered.includes(questionId)
            },

            resetAnswered: (userId: string) => {
                set((state) => ({
                    answeredQuestions: {
                        ...state.answeredQuestions,
                        [userId]: []
                    }
                }))
            },

            getAnsweredCount: (userId: string) => {
                const userAnswered = get().answeredQuestions[userId] || []
                return userAnswered.length
            }
        }),
        {
            name: 'qrub-answered-questions'
        }
    )
)
