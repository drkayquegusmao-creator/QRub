"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Palette, Type, ChevronRight, Settings, Check, ArrowLeft } from 'lucide-react'
import { usePreferences, QuestionFont } from '@/store/use-preferences'
import { useAuth } from '@/store/use-auth'

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

type SettingsView = 'MENU' | 'APPEARANCE'

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [view, setView] = useState<SettingsView>('MENU')
    const { user } = useAuth()
    const { questionsFont, setQuestionsFont } = usePreferences()

    if (!isOpen) return null

    const handleBack = () => {
        if (view === 'APPEARANCE') setView('MENU')
        else onClose()
    }

    const renderMenu = () => (
        <div className="space-y-4">
            <button
                onClick={() => setView('APPEARANCE')}
                className="w-full flex items-center justify-between p-6 rounded-[25px] bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all group"
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Palette className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-black italic uppercase text-sm text-[#1A1033]">Aparência</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Temas, fontes e visual</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>

            <p className="text-[10px] font-black uppercase text-center text-slate-300 tracking-[0.2em] pt-4">
                Mais configurações em breve
            </p>
        </div>
    )

    const renderAppearance = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                    <Type className="w-3 h-3" /> Fonte das Questões
                </label>

                <div className="grid grid-cols-1 gap-3">
                    <FontOption
                        label="Padrão QRub"
                        font="default"
                        active={questionsFont === 'default'}
                        onClick={() => setQuestionsFont('default', user?.id)}
                        preview="A anatomia humana é o campo da biologia..."
                        previewClass="font-sans"
                    />
                    <FontOption
                        label="Arial"
                        font="arial"
                        active={questionsFont === 'arial'}
                        onClick={() => setQuestionsFont('arial', user?.id)}
                        preview="A anatomia humana é o campo da biologia..."
                        previewStyle={{ fontFamily: 'Arial, sans-serif' }}
                    />
                    <FontOption
                        label="Times New Roman"
                        font="times"
                        active={questionsFont === 'times'}
                        onClick={() => setQuestionsFont('times', user?.id)}
                        preview="A anatomia humana é o campo da biologia..."
                        previewStyle={{ fontFamily: '"Times New Roman", serif' }}
                    />
                </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 p-6 rounded-[30px] space-y-3">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary">Preview do Texto</h4>
                <div className="p-6 bg-white rounded-2xl border border-border shadow-sm">
                    <p
                        className="text-lg leading-relaxed text-[#1A1033]"
                        style={{
                            fontFamily: questionsFont === 'arial' ? 'Arial, sans-serif' :
                                questionsFont === 'times' ? '"Times New Roman", serif' :
                                    'inherit'
                        }}
                    >
                        O sinal de Murphy é característico de qual patologia?
                    </p>
                    <div className="mt-4 grid grid-cols-1 gap-2">
                        {['A) Apendicite', 'B) Colecistite'].map((opt, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black">
                                    {opt[0]}
                                </div>
                                <span
                                    className="text-sm font-medium"
                                    style={{
                                        fontFamily: questionsFont === 'arial' ? 'Arial, sans-serif' :
                                            questionsFont === 'times' ? '"Times New Roman", serif' :
                                                'inherit'
                                    }}
                                >
                                    {opt.substring(3)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 pb-6 flex items-center justify-between border-b border-slate-50">
                            <div className="flex items-center gap-4">
                                {view !== 'MENU' && (
                                    <button
                                        onClick={handleBack}
                                        className="p-2 -ml-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                )}
                                <div>
                                    <h2 className="text-2xl font-black italic tracking-tighter uppercase text-[#1A1033]">
                                        {view === 'MENU' ? 'Ajustes' : 'Aparência'}
                                    </h2>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mt-1">
                                        Personalize sua experiência
                                    </p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-all">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 pt-6 overflow-y-auto max-h-[70vh] custom-scrollbar">
                            {view === 'MENU' ? renderMenu() : renderAppearance()}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function FontOption({ label, font, active, onClick, preview, previewClass, previewStyle }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full p-5 rounded-[25px] border-2 transition-all flex flex-col gap-3 group text-left ${active
                    ? 'bg-primary/5 border-primary shadow-lg shadow-primary/5 scale-[1.02]'
                    : 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-white'
                }`}
        >
            <div className="flex items-center justify-between">
                <span className={`text-xs font-black uppercase tracking-tight ${active ? 'text-primary' : 'text-[#1A1033]'}`}>
                    {label}
                </span>
                {active && (
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                    </div>
                )}
            </div>
            <p
                className={`text-sm font-medium opacity-60 truncate ${previewClass}`}
                style={previewStyle}
            >
                {preview}
            </p>
        </button>
    )
}
