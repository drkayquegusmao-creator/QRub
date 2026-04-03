"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ChevronRight, Zap, Target, BookOpen, BarChart3, ChevronLeft } from 'lucide-react'
import { useAuth } from '@/store/use-auth'

const TUTORIAL_STEPS = [
    {
        title: "Bem-vindo ao QRub!",
        description: "Sua plataforma de alta performance para residência médica e concursos. Vamos fazer um tour rápido?",
        icon: <Zap className="w-12 h-12 text-yellow-400" />,
        highlight: null
    },
    {
        title: "Agenda Inteligente",
        description: "O Dr. QRub analisa seu desempenho e sugere exatamente o que você precisa estudar hoje. Siga a meta diária!",
        icon: <Target className="w-12 h-12 text-primary" />,
        highlight: "INTELLIGENT_AGENDA"
    },
    {
        title: "Treino Livre",
        description: "Quer focar em uma área específica? Use o 'Treino por Área' para acessar todo o banco de questões.",
        icon: <BookOpen className="w-12 h-12 text-blue-500" />,
        highlight: "FAST_PRACTICE"
    },
    {
        title: "Métricas Avançadas",
        description: "Acompanhe sua evolução, pontos fortes e fracos em tempo real. Dados são seu superpoder.",
        icon: <BarChart3 className="w-12 h-12 text-emerald-500" />,
        highlight: "EVOLUTION_STATS"
    },
    {
        title: "Tudo pronto!",
        description: "Você já sabe o básico. Agora é com você. Bons estudos e Rumo à Aprovação!",
        icon: <CheckCircle2 className="w-12 h-12 text-emerald-500" />,
        highlight: null
    }
]

export function WelcomeTutorial() {
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        // Check if tutorial has been seen
        const hasSeenTutorial = localStorage.getItem('qrub_tutorial_completed')
        if (!hasSeenTutorial) {
            // Small delay to allow dashboard to load
            const timer = setTimeout(() => setIsOpen(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleNext = () => {
        if (currentStep < TUTORIAL_STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            handleClose()
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem('qrub_tutorial_completed', 'true')
    }

    const step = TUTORIAL_STEPS[currentStep]

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white rounded-[40px] max-w-md w-full overflow-hidden shadow-2xl relative"
                    >
                        {/* Progress Bar */}
                        <div className="h-2 bg-slate-100 w-full">
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
                            />
                        </div>

                        <div className="p-8 md:p-10 text-center space-y-6">
                            <div className="flex justify-center">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                                    {step.icon}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#1A1033] dark:text-white leading-none">
                                    {step.title}
                                </h2>
                                <p className="text-slate-500 font-medium leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <button
                                onClick={handleClose}
                                className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 px-4 py-2"
                            >
                                Pular
                            </button>

                            <div className="flex gap-2">
                                {currentStep > 0 && (
                                    <button
                                        onClick={handlePrev}
                                        className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-white transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-slate-400" />
                                    </button>
                                )}
                                <button
                                    onClick={handleNext}
                                    className="royal-gradient text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    {currentStep === TUTORIAL_STEPS.length - 1 ? 'Começar' : 'Próximo'}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
