
"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Trash2, X } from 'lucide-react'
import { useHighlights, Highlight } from '@/store/use-highlights'
import { cn } from '@/lib/utils'

interface HighlightableTextProps {
    text: string
    field: string
    questionId: string
    className?: string
}

const COLORS = {
    yellow: 'rgba(255, 235, 59, 0.4)',
    purple: 'rgba(156, 39, 176, 0.35)',
    green: 'rgba(76, 175, 80, 0.35)',
    blue: 'rgba(33, 150, 243, 0.35)',
    pink: 'rgba(233, 30, 99, 0.35)',
}

type ColorKey = keyof typeof COLORS

export function HighlightableText({ text, field, questionId, className }: HighlightableTextProps) {
    const { highlights, addHighlight, removeHighlight, removeHighlightsIntersecting, fetchHighlights } = useHighlights()
    const containerRef = useRef<HTMLDivElement>(null)
    const [toolbarPosition, setToolbarPosition] = useState<{ top: number, left: number } | null>(null)
    const [currentSelection, setCurrentSelection] = useState<{ start: number, end: number } | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    // Load highlights for this specific question/field context efficiently
    const fieldHighlights = highlights.filter(h => h.question_id === questionId && h.field === field)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        fetchHighlights(questionId)
    }, [questionId])

    // --- Selection Handling ---

    const handleSelection = useCallback(() => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
            setToolbarPosition(null)
            setCurrentSelection(null)
            return
        }

        const range = selection.getRangeAt(0)
        const container = containerRef.current

        // Validation: Must be inside our container
        if (!container || !container.contains(range.commonAncestorContainer)) {
            // Clicked outside or selected across different blocks - ignore responsibly
            return
        }

        // Calculate generic start/end relative to text content
        // We need to map DOM Range to plain text offsets.
        // This is tricky because the DOM has spans for existing highlights.

        // Robust strategy: 
        // 1. Get plain text of container.
        // 2. Create a temporary range covering from start of container to start of selection.
        // 3. The length of that temp range's text is our start index.

        try {
            const preCaretRange = range.cloneRange()
            preCaretRange.selectNodeContents(container)
            preCaretRange.setEnd(range.startContainer, range.startOffset)
            const start = preCaretRange.toString().length
            const end = start + range.toString().length

            if (start < end) {
                const rect = range.getBoundingClientRect()

                // Position toolbar above selection
                // Adjust for scroll and viewport
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const scrollLeft = window.scrollX || document.documentElement.scrollLeft

                setToolbarPosition({
                    top: rect.top + scrollTop - 60, // 60px above
                    left: rect.left + scrollLeft + (rect.width / 2) // Centered
                })
                setCurrentSelection({ start, end })
            }
        } catch (e) {
            console.warn('Selection calculation failed', e)
            setToolbarPosition(null)
        }

    }, [])

    const clearSelection = () => {
        window.getSelection()?.removeAllRanges()
        setToolbarPosition(null)
        setCurrentSelection(null)
    }

    const applyHighlight = async (color: ColorKey) => {
        if (!currentSelection) return

        // 1. Remove overlapping/intersecting existing highlights to avoid mess
        await removeHighlightsIntersecting(questionId, field, currentSelection.start, currentSelection.end)

        // 2. Add new highlight
        await addHighlight({
            question_id: questionId,
            field,
            start_index: currentSelection.start,
            end_index: currentSelection.end,
            color
        })

        clearSelection()
    }

    const handleRemoveIntersecting = async () => {
        if (!currentSelection) return
        await removeHighlightsIntersecting(questionId, field, currentSelection.start, currentSelection.end)
        clearSelection()
    }

    // --- Rendering Logic ---

    // Merging logic: We need to render segments.
    // Text: "Hello world this is a test"
    // Highlight 1: 0-5 (Hello)
    // Highlight 2: 10-15 (this)
    // Result: <span>Hello</span> world <span>this</span> is a test

    const renderContent = () => {
        if (!text) return null

        // Sort highlights by start index
        const sorted = [...fieldHighlights].sort((a, b) => a.start_index - b.start_index)

        const segments = []
        let lastIndex = 0

        sorted.forEach(h => {
            // Safety Check: validate range against current text length
            if (h.start_index >= text.length || h.end_index > text.length || h.start_index < 0) return

            // Push text before highlight
            if (h.start_index > lastIndex) {
                segments.push(
                    <span key={`text-${lastIndex}`}>{text.slice(lastIndex, h.start_index)}</span>
                )
            }

            // Push highlighted text
            // If highlight overlaps with previous (shouldn't happen with our logic, but safety first), clamp it
            const effectiveStart = Math.max(h.start_index, lastIndex)
            if (h.end_index > effectiveStart) {
                segments.push(
                    <span
                        key={h.id}
                        style={{ backgroundColor: COLORS[h.color as ColorKey] || COLORS.yellow }}
                        className="rounded-sm px-0.5 cursor-pointer box-decoration-clone"
                        title="Clique e arraste para remover"
                    >
                        {text.slice(effectiveStart, h.end_index)}
                    </span>
                )
                lastIndex = h.end_index
            }
        })

        // Push remaining text
        if (lastIndex < text.length) {
            segments.push(
                <span key={`text-end`}>{text.slice(lastIndex)}</span>
            )
        }

        return segments
    }

    return (
        <>
            <div
                ref={containerRef}
                className={cn("relative outline-none", className)}
                onMouseUp={handleSelection}
                onTouchEnd={handleSelection} // Basic mobile support
            >
                {renderContent()}
            </div>

            {/* Floating Toolbar Portal */}
            {toolbarPosition && createPortal(
                <div
                    style={{
                        top: isMobile ? '20px' : `${toolbarPosition.top}px`,
                        left: isMobile ? '50%' : `${toolbarPosition.left}px`,
                        transform: 'translateX(-50%)',
                        position: isMobile ? 'fixed' : 'absolute',
                        zIndex: 9999
                    }}
                    className="flex items-center gap-1.5 p-2 bg-[#1A1033] rounded-full shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200"
                    onMouseDown={(e) => e.preventDefault()} // Prevent losing focus/selection
                >
                    {/* Color Options */}
                    {(Object.keys(COLORS) as ColorKey[]).map(color => (
                        <button
                            key={color}
                            onClick={() => applyHighlight(color)}
                            className="w-6 h-6 rounded-full hover:scale-110 active:scale-95 transition-transform border border-white/20"
                            style={{ backgroundColor: COLORS[color] }}
                        />
                    ))}

                    <div className="w-px h-4 bg-white/20 mx-1" />

                    {/* Actions */}
                    <button
                        onClick={handleRemoveIntersecting}
                        className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        title="Remover destaque"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                        onClick={clearSelection}
                        className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>,
                document.body
            )}
        </>
    )
}
