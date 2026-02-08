"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Target, Zap, Crown, Flame, ArrowRight, Timer, Medal, ShieldAlert } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { useRankElite, MatchMode } from '@/store/use-rank-elite'
import { Lobby } from './lobby'
import { ArenaMatch } from './arena-match'
import { MatchResult } from './match-result'
import { AdminDashboard } from './admin-dashboard'
import { RewardsView } from './rewards-view'
import { AnnouncementBanner } from '@/components/announcement-banner'

export type RankView = 'LOBBY' | 'MATCH' | 'RESULT' | 'REWARDS' | 'ADMIN';

interface RankEliteModuleProps {
    onClose: () => void;
}

export function RankEliteModule({ onClose }: RankEliteModuleProps) {
    const { user } = useAuth()
    const {
        init, activeSeason, profile, xpProfile, leagues, missions, rewards, isAdmin, isLoading, error, equipReward,
        startMatch, claimMission
    } = useRankElite()
    const [view, setView] = useState<RankView>('LOBBY')
    const [currentMatchId, setCurrentMatchId] = useState<string | null>(null)
    const [lastMatchResult, setLastMatchResult] = useState<any>(null)

    // Bloquear scroll do body enquanto o módulo está aberto
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    useEffect(() => {
        if (user?.id) {
            init(user.id, user.role)
        }
    }, [user?.id, user?.role, init])

    if (error) {
        return (
            <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 text-center">
                <div className="max-w-md space-y-6">
                    <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto" />
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Erro de Comunicação</h2>
                    <p className="text-slate-400 font-medium">{error}</p>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-white text-black font-black uppercase text-sm tracking-widest rounded-xl"
                    >
                        Voltar ao Dashboard
                    </button>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col font-sans h-[100dvh] [[data-banner-active=true]_&]:pt-10 transition-all"
        >
            {/* Header / HUD Superior */}
            <div className="border-b border-white/5 bg-black/50 backdrop-blur-xl px-4 md:px-6 py-4 flex items-center justify-between shrink-0 z-50 [[data-banner-active=true]_&]:border-t [[data-banner-active=true]_&]:border-t-white/5 transition-all">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setView('LOBBY')}
                        className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-lg hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
                    >
                        <Crown className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-sm font-black italic uppercase tracking-tighter leading-none">Rank Elite</h1>
                        <p className="text-[10px] font-bold text-[#39FF14] uppercase tracking-widest mt-1">
                            {activeSeason?.name || 'Carregando Season...'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {view === 'LOBBY' ? (
                        <button
                            onClick={onClose}
                            aria-label="Fechar"
                            className="p-2 hover:bg-white/10 rounded-xl transition-all group"
                        >
                            <X className="w-6 h-6 text-slate-400 group-hover:text-white" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setView('LOBBY')}
                            className="text-[10px] font-black uppercase tracking-widest text-[#39FF14] hover:underline"
                        >
                            Voltar para Lobby
                        </button>
                    )}
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative pb-safe scroll-smooth">
                <AnimatePresence mode="wait">
                    {view === 'LOBBY' && (
                        <Lobby
                            key="lobby"
                            activeSeason={activeSeason}
                            profile={profile}
                            xpProfile={xpProfile}
                            leagues={leagues}
                            missions={missions}
                            rewards={rewards}
                            isAdmin={isAdmin}
                            isLoading={isLoading}
                            onStartMatch={async (mode) => {
                                const matchId = await startMatch(user?.id || '', mode)
                                if (matchId) {
                                    setCurrentMatchId(matchId)
                                    setView('MATCH')
                                }
                            }}
                            onOpenAdmin={() => setView('ADMIN')}
                            onOpenRewards={() => setView('REWARDS')}
                            onClaimMission={claimMission}
                        />
                    )}

                    {view === 'MATCH' && currentMatchId && (
                        <ArenaMatch
                            key="match"
                            matchId={currentMatchId}
                            onFinish={(result: any) => {
                                setLastMatchResult(result)
                                setView('RESULT')
                            }}
                            onAbort={() => setView('LOBBY')}
                        />
                    )}

                    {view === 'RESULT' && lastMatchResult && (
                        <MatchResult
                            key="result"
                            result={lastMatchResult}
                            onBackToLobby={() => setView('LOBBY')}
                        />
                    )}

                    {view === 'ADMIN' && <AdminDashboard key="admin" />}

                    {view === 'REWARDS' && (
                        <RewardsView
                            key="rewards"
                            xpProfile={xpProfile}
                            profile={profile}
                            rewards={rewards}
                            onEquip={equipReward}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Overlay de Scan/Cyber (Apenas Visual) */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[10000] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>
        </motion.div>
    )
}
