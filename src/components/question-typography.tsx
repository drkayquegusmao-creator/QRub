"use client"

import React from 'react'
import { usePreferences, QuestionFont } from '@/store/use-preferences'

interface QuestionTextProps {
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
    as?: 'p' | 'span' | 'h2' | 'h3' | 'div'
}

export function getQuestionFontFamily(font: QuestionFont): string {
    switch (font) {
        case 'arial':
            return 'Arial, Helvetica, sans-serif'
        case 'times':
            return '"Times New Roman", Times, serif'
        default:
            return 'inherit' // Uses the app's default font
    }
}

export function QuestionText({
    children,
    className = "",
    style = {},
    as: Component = 'p'
}: QuestionTextProps) {
    const { questionsFont } = usePreferences()

    const fontFamily = getQuestionFontFamily(questionsFont)

    return (
        <Component
            className={className}
            style={{ ...style, fontFamily }}
        >
            {children}
        </Component>
    )
}

/**
 * QuestionTypographyProvider can be used if we want to set the font at a higher level
 * but the requirement specifies applying it specifically to question contents.
 */
export function QuestionTypographyProvider({ children }: { children: React.ReactNode }) {
    const { questionsFont } = usePreferences()
    const fontFamily = getQuestionFontFamily(questionsFont)

    return (
        <div style={{ '--question-font-family': fontFamily } as React.CSSProperties}>
            {children}
        </div>
    )
}
