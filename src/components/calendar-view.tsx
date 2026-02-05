"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Sparkles, Clock, Zap } from 'lucide-react'

interface Evento {
    id: string
    assunto_id?: string
    data: string // YYYY-MM-DD
    tipo: 'REVISAO' | 'RECUPERACAO'
    assunto: string
    especialidade?: string
    status: 'PENDENTE' | 'REALIZADA' | 'ATRASADA'
}

interface CalendarViewProps {
    eventos: Evento[]
    onSelectDate?: (date: string) => void
    onEventClick?: (evento: Evento) => void
    onClose?: () => void
}

export function CalendarView({ eventos, onSelectDate, onEventClick, onClose }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState<string | null>(null)

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() // 0 = Sun

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const today = new Date()
    const isToday = (day: number) => {
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        )
    }

    // Get events for the selected date to display details - but wait, the modal uses selectedDate
    const getEventsForDate = (dateStr: string) => {
        return eventos.filter(e => e.data === dateStr || (e.status === 'ATRASADA' && dateStr === new Date().toISOString().split('T')[0]))
    }

    const handleDateClick = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        setSelectedDate(dateStr)
        if (onSelectDate) onSelectDate(dateStr)
    }

    // Fixed date display to avoid timezone shift (e.g. clicking 8 and appearing 7)
    const formatDateSafely = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-').map(Number)
        // Month is 0-indexed in JS Date
        const date = new Date(year, month - 1, day)
        return {
            long: date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' }),
            weekday: date.toLocaleDateString('pt-BR', { weekday: 'long' })
        }
    }

    return (
        <div className="relative">
            {/* Main Calendar Card */}
            <div className="bg-white rounded-[40px] border-2 border-slate-100 p-4 md:p-8 soft-shadow relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none">
                    <CalendarIcon className="w-64 h-64 text-[#1A1033]" />
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 relative z-10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                            <CalendarIcon className="w-3 h-3" />
                            Visão Tática
                        </div>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#1A1033]">
                            Calendário
                        </h3>
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-slate-50 p-1 rounded-2xl border border-slate-100">
                        <button onClick={prevMonth} className="p-3 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-400 hover:text-primary">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span className="w-32 text-center text-sm font-bold text-[#1A1033] uppercase tracking-wide">
                            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                        </span>
                        <button onClick={nextMonth} className="p-3 hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-400 hover:text-primary">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7 gap-1 md:gap-4 mb-2">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                        <div key={day} className="text-center text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest py-2">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-4 relative z-10">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

                        // Strict event filter for this exact day
                        const dayEvents = eventos.filter(e => e.data === dateStr)
                        const isCurrentDay = isToday(day)

                        // Priority logic for dot color
                        const hasOverdue = dayEvents.some(e => e.status === 'ATRASADA')
                        const hasRecuperacao = dayEvents.some(e => e.tipo === 'RECUPERACAO')

                        return (
                            <motion.button
                                key={day}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDateClick(day)}
                                className={`
                                    aspect-square rounded-xl md:rounded-2xl flex flex-col items-center justify-center relative transition-all border
                                    ${isCurrentDay
                                        ? 'bg-white text-[#1A1033] border-primary/30 shadow-sm ring-1 ring-primary/10'
                                        : 'bg-slate-50 text-slate-400 border-slate-50 hover:border-primary/20 hover:bg-white'
                                    }
                                `}
                            >
                                <span className={`text-sm md:text-lg font-black ${isCurrentDay ? 'text-[#1A1033]' : 'text-slate-500'}`}>
                                    {day}
                                </span>

                                {/* Indicators */}
                                <div className="flex gap-0.5 md:gap-1 mt-0.5 md:mt-1">
                                    {hasOverdue && <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-destructive" />}
                                    {hasRecuperacao && <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-yellow-500" />}
                                    {!hasOverdue && !hasRecuperacao && dayEvents.length > 0 && (
                                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-primary" />
                                    )}
                                </div>
                            </motion.button>
                        )
                    })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-destructive" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Atraso</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Recuperar</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Revisão</span>
                    </div>
                </div>
            </div>

            {/* POPUP MODAL for Selected Date */}
            <AnimatePresence>
                {selectedDate && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 rounded-[40px] overflow-hidden">
                        {/* Backdrop - Contained within calendar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedDate(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />

                        {/* Popup Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="relative bg-white rounded-[32px] border border-slate-100 shadow-2xl p-6 w-full max-w-[90%] mx-auto overflow-hidden z-10"
                            style={{ maxHeight: '90%' }}
                        >
                            <button
                                onClick={() => setSelectedDate(null)}
                                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-20"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>

                            <div className="text-center mb-6 pt-2">
                                <h4 className="text-lg font-black italic uppercase tracking-tighter text-[#1A1033] mb-1">
                                    {formatDateSafely(selectedDate).long}
                                </h4>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {formatDateSafely(selectedDate).weekday}
                                </p>
                            </div>

                            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1 scrollbar-hide">
                                {getEventsForDate(selectedDate).length > 0 ? (
                                    getEventsForDate(selectedDate).map(evt => (
                                        <div
                                            key={evt.id}
                                            onClick={() => {
                                                if (onEventClick) {
                                                    onEventClick(evt)
                                                    setSelectedDate(null)
                                                }
                                            }}
                                            className="group flex items-start gap-3 p-3 rounded-2xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50 transition-all bg-white cursor-pointer active:scale-95"
                                        >
                                            <div className={`
                                                w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
                                                ${evt.tipo === 'RECUPERACAO' || evt.status === 'ATRASADA' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-primary/10 text-primary'}
                                             `}>
                                                {evt.tipo === 'RECUPERACAO' ? <Zap className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                            </div>
                                            <div className="text-left flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 shrink-0">
                                                        {evt.tipo === 'RECUPERACAO' ? 'RECUPERAÇÃO' : 'REVISÃO'}
                                                    </p>
                                                    {evt.especialidade && (
                                                        <span className="text-[9px] font-bold text-slate-300 truncate">
                                                            • {evt.especialidade}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm font-bold text-[#1A1033] leading-tight line-clamp-2">
                                                    {evt.assunto}
                                                </p>
                                                {evt.status === 'ATRASADA' && (
                                                    <p className="text-[10px] font-bold text-destructive mt-1 uppercase tracking-wider">
                                                        • Em Atraso
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-8 text-center flex flex-col items-center">
                                        <Sparkles className="w-8 h-8 text-slate-200 mb-2" />
                                        <p className="text-slate-400 font-medium text-sm">Nada para este dia.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
