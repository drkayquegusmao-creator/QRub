'use client'

import React, { useState, useCallback } from 'react'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    TouchSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    MeasuringStrategy,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { motion } from 'framer-motion'
import { useDashboard, type WidgetConfig } from '@/store/use-dashboard'

// ─── Sortable Item ────────────────────────────────────────────────────────────

interface SortableWidgetProps {
    widget: WidgetConfig
    children: React.ReactNode
    isDragging?: boolean
    isMaster?: boolean
    disabled?: boolean
}

function SortableWidget({ widget, children, isDragging = false, disabled = false }: SortableWidgetProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isSorting,
    } = useSortable({
        id: widget.id,
        disabled,
    })

    const isFullWidth = widget.width === 'full'

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 0 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative group/widget ${isFullWidth ? 'md:col-span-2' : ''} ${isDragging ? 'pointer-events-none' : ''}`}
        >
            {/* Drag handle — always visible on mobile, appears on hover for desktop */}
            <div
                ref={setActivatorNodeRef}
                {...listeners}
                {...attributes}
                className={`
                    absolute top-3 left-1/2 -translate-x-1/2 z-20
                    flex items-center justify-center gap-0.5
                    px-3 py-1.5 rounded-full
                    bg-slate-200/80 hover:bg-slate-300/90
                    backdrop-blur-sm shadow-sm
                    cursor-grab active:cursor-grabbing
                    touch-none select-none
                    transition-all duration-200
                    md:opacity-0 md:group-hover/widget:opacity-100
                    opacity-100
                `}
                title="Segurar para mover"
                aria-label="Arrastar widget"
            >
                <GripVertical className="w-3.5 h-3.5 text-slate-500" />
                <GripVertical className="w-3.5 h-3.5 text-slate-500 -ml-2.5" />
            </div>

            {/* Widget content */}
            <div className={`${isSorting ? 'pointer-events-none' : ''} pt-2`}>
                {children}
            </div>
        </div>
    )
}

// ─── Drag Overlay (ghost) ────────────────────────────────────────────────────

function DragGhost({ widget, children }: { widget: WidgetConfig | null; children?: React.ReactNode }) {
    if (!widget || !children) return null
    return (
        <div className={`${widget.width === 'full' ? 'md:col-span-2' : ''} opacity-90 rotate-1 scale-[1.02] shadow-2xl rounded-[50px] overflow-hidden pointer-events-none`}>
            {children}
        </div>
    )
}

// ─── Main Grid ───────────────────────────────────────────────────────────────

export interface DraggableWidgetGridProps {
    widgets: WidgetConfig[]
    renderWidget: (widget: WidgetConfig) => React.ReactNode
    filterFn?: (widget: WidgetConfig) => boolean
}

export default function DraggableWidgetGrid({
    widgets,
    renderWidget,
    filterFn,
}: DraggableWidgetGridProps) {
    const { reorderWidgets } = useDashboard()
    const [activeId, setActiveId] = useState<string | null>(null)

    // Filter widgets before rendering
    const visibleWidgets = widgets
        .filter(w => w.id !== 'UPGRADE_BANNER')
        .filter(w => w.visible)
        .filter(filterFn ?? (() => true))

    // Sensors: Touch requires 300ms hold (mobile long press) + 8px movement tolerance
    // Pointer (mouse/stylus): immediate, 8px tolerance
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,        // 250ms hold on mobile
                tolerance: 8,      // 8px movement allowed during hold
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(String(event.active.id))
        // Haptic feedback on mobile
        if ('vibrate' in navigator) navigator.vibrate(50)
    }, [])

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event
        setActiveId(null)

        if (!over || active.id === over.id) return

        // Find indices in the full widgets array (not just visible)
        const fullWidgets = widgets.filter(w => w.id !== 'UPGRADE_BANNER')
        const oldIndex = fullWidgets.findIndex(w => w.id === active.id)
        const newIndex = fullWidgets.findIndex(w => w.id === over.id)

        if (oldIndex !== -1 && newIndex !== -1) {
            // We need to remap to the full array indices (including UPGRADE_BANNER at front)
            const allOldIndex = widgets.findIndex(w => w.id === active.id)
            const allNewIndex = widgets.findIndex(w => w.id === over.id)
            reorderWidgets(allOldIndex, allNewIndex)
        }
    }, [widgets, reorderWidgets])

    const activeWidget = activeId ? widgets.find(w => w.id === activeId) ?? null : null
    const activeContent = activeWidget ? renderWidget(activeWidget) : null

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            measuring={{
                droppable: { strategy: MeasuringStrategy.Always }
            }}
        >
            <SortableContext
                items={visibleWidgets.map(w => w.id)}
                strategy={rectSortingStrategy}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {visibleWidgets.map((widget) => {
                        let content: React.ReactNode
                        try {
                            content = renderWidget(widget)
                            if (!content) return null
                        } catch (err) {
                            console.error(`Error rendering widget ${widget.id}:`, err)
                            return null
                        }

                        return (
                            <SortableWidget
                                key={widget.id}
                                widget={widget}
                                isDragging={activeId === widget.id}
                            >
                                <motion.div layout transition={{ duration: 0.2 }}>
                                    {content}
                                </motion.div>
                            </SortableWidget>
                        )
                    })}
                </div>
            </SortableContext>

            {/* Floating ghost card during drag */}
            <DragOverlay adjustScale={false} dropAnimation={{
                duration: 250,
                easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
            }}>
                {activeWidget ? (
                    <DragGhost widget={activeWidget}>
                        {activeContent}
                    </DragGhost>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
