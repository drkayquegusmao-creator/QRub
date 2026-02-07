"use client"

import { motion } from 'framer-motion'
import { Trophy, Target, Zap, Crown, Flame, ArrowRight, Timer, Medal, RotateCcw, LayoutGrid, CheckCircle2 } from 'lucide-react'

interface MatchResultProps {
    result: {
        correctCount: number;
        total: number;
        score: number;
        xp: number;
        duration: number;
    };
    onBackToLobby: () => void;
}

export function MatchResult({ result, onBackToLobby }: MatchResultProps) {
    const accuracy = Math.round((result.correctCount / result.total) * 100)

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-4"
            >
                <div className="w-32 h-32 bg-[#39FF14] text-black rounded-full flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(57,255,20,0.3)] mb-8">
                    <Trophy className="w-16 h-16" />
                </div>
                <h2 className="text-6xl font-black italic uppercase tracking-tighter royal-gradient-text">
                    Operação Finalizada
                </h2>
                <p className="text-white/40 font-black uppercase tracking-[0.4em] text-xs">Desempenho Registrado</p>
            </motion.div>

            {/* Grid de Métricas de Fim de Jogo */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {[
                    { label: 'Precisão', val: `${accuracy}%`, icon: <Target className="w-4 h-4" color="#39FF14" /> },
                    { label: 'Pontos Ganho', val: `+${result.score}`, icon: <Zap className="w-4 h-4" color="#39FF14" fill="#39FF14" /> },
                    { label: 'XP Perman.', val: `+${result.xp}`, icon: <Medal className="w-4 h-4" color="#39FF14" /> },
                    { label: 'Duração', val: `${result.duration}s`, icon: <Timer className="w-4 h-4" color="#39FF14" /> },
                ].map((m, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="bg-white/5 border border-white/10 p-8 space-y-2 relative overflow-hidden group"
                        style={{ borderRadius: '0px' }}
                    >
                        <div className="absolute top-2 right-2 opacity-20">{m.icon}</div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{m.label}</p>
                        <p className="text-3xl font-black italic uppercase tracking-tighter">{m.val}</p>
                    </motion.div>
                ))}
            </div>

            <div className="space-y-6 w-full max-w-md pt-8">
                <button
                    onClick={onBackToLobby}
                    className="w-full bg-[#39FF14] text-black py-6 font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                    style={{ borderRadius: '0px' }}
                >
                    Retornar para Arena
                    <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex gap-4">
                    <button
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-none font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                        <LayoutGrid className="w-4 h-4" /> REVISAR ERROS
                    </button>
                    <button
                        onClick={onBackToLobby}
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-none font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> NOVO MATCH
                    </button>
                </div>
            </div>

            {/* Mensagem Motivacional */}
            <div className="pt-12 text-[#39FF14] text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
                Sincronizando Ranking Global...
            </div>
        </div>
    )
}

