"use client"

import { motion } from 'framer-motion'
import { Trophy, Target, Zap, Crown, Flame, ArrowRight, Timer, Medal, ShieldAlert, Star, Lock, Settings } from 'lucide-react'
import { useAuth } from '@/store/use-auth'
import { League, MatchMode, Mission, Reward, RankProfile, XPProfile } from '@/store/use-rank-elite'

interface LobbyProps {
    stats?: any; // Legacy prop, we'll use profile and xpProfile from store or props
    profile: RankProfile | null;
    xpProfile: XPProfile | null;
    leagues: League[];
    missions: Mission[];
    rewards: Reward[];
    isAdmin: boolean;
    activeSeason: { name: string } | null;
    isLoading: boolean;
    onStartMatch: (mode: MatchMode) => void;
    onOpenAdmin: () => void;
    onOpenRewards: () => void;
    onClaimMission: (id: string) => void;
}

export function Lobby({
    profile,
    xpProfile,
    leagues,
    missions,
    rewards,
    isAdmin,
    activeSeason,
    isLoading,
    onStartMatch,
    onOpenAdmin,
    onOpenRewards,
    onClaimMission
}: LobbyProps) {
    const { user } = useAuth()

    if (isLoading || leagues.length === 0) {
        return (
            <div className="flex-1 h-full flex flex-col items-center justify-center space-y-4 min-h-[400px]">
                <div className="w-12 h-12 border-4 border-[#39FF14]/20 border-t-[#39FF14] rounded-full animate-spin" />
                <p className="text-[#39FF14] font-black uppercase tracking-widest text-xs">Sincronizando Dados...</p>
            </div>
        )
    }

    const currentLeague = leagues.find(l => l.id === profile?.current_league_id) || leagues[0];
    const nextLeague = leagues[leagues.indexOf(currentLeague) + 1];

    // Calcula progresso da liga
    const pointsInLeague = (profile?.season_points || 0) - currentLeague.min_points;
    const leagueRange = (currentLeague.max_points || pointsInLeague + 1000) - currentLeague.min_points;
    const leagueProgress = Math.min(100, Math.max(0, (pointsInLeague / leagueRange) * 100));

    // Zone Status Logic
    let zoneStatus = 'SAFE';
    if (leagueProgress > 85) zoneStatus = 'PROMOTION';
    if (leagueProgress < 15 && currentLeague.min_points > 0) zoneStatus = 'DANGER';

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 w-full space-y-10 pb-24">

            {/* Grid Principal: Player Card + Top 5 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 3.2 Card Principal do Jogador */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-gradient-to-br from-[#111] to-black border-2 border-white/5 p-8 relative overflow-hidden flex flex-col justify-between"
                    style={{ borderRadius: '0px' }}
                >
                    {/* Background Detail */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#39FF14]/5 blur-[100px] pointer-events-none" />

                    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                        {/* Avatar & Nick */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full border-4 border-[#39FF14] bg-zinc-900 flex items-center justify-center text-3xl font-black text-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl font-black italic uppercase tracking-tighter">{user?.name || 'Recrutas'}</h2>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nível {xpProfile?.level_current || 1}</p>
                            </div>
                        </div>

                        {/* Stats & Liga */}
                        <div className="flex-1 space-y-6 w-full">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-[#39FF14]">{currentLeague.name}</h3>
                                    <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{profile?.season_points || 0} PONTOS DA SEASON</p>
                                </div>
                                <div className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${zoneStatus === 'PROMOTION' ? 'bg-[#39FF14] text-black' :
                                    zoneStatus === 'DANGER' ? 'bg-rose-600 text-white' : 'bg-zinc-800 text-white'
                                    }`}>
                                    {zoneStatus === 'PROMOTION' ? 'Zona de Promoção' : zoneStatus === 'DANGER' ? 'Zona de Risco' : 'Zona Segura'}
                                </div>
                            </div>

                            {/* Barra de Progresso */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
                                    <span>{currentLeague.min_points} PTS</span>
                                    <span>PROGRESSO DA LIGA ({Math.floor(leagueProgress)}%)</span>
                                    <span>{currentLeague.max_points || 'MAX'} PTS</span>
                                </div>
                                <div className="h-4 bg-white/5 p-1">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${leagueProgress}%` }}
                                        className="h-full bg-gradient-to-r from-[#39FF14] to-[#1fd655] shadow-[0_0_15px_rgba(57,255,20,0.4)]"
                                    />
                                </div>
                            </div>

                            <p className="text-[10px] italic font-bold text-[#39FF14] uppercase tracking-widest opacity-80 mt-4">
                                "Consistência vence volume."
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 3.3 Painel Top 5 da Liga */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#0a0a0a] border-2 border-white/5 p-6 space-y-6"
                    style={{ borderRadius: '0px' }}
                >
                    <h3 className="text-sm font-black italic uppercase tracking-tighter flex items-center gap-2 text-white/40">
                        <Trophy className="w-4 h-4" /> Top 5 da Liga
                    </h3>

                    <div className="space-y-3">
                        {/* Placeholder Ranking */}
                        {[1, 2, 3].map((pos) => (
                            <div key={pos} className="flex items-center justify-between p-3 bg-white/5 border-l-2 border-transparent">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-black italic text-white/40">#{pos}</span>
                                    <span className="text-xs font-bold uppercase">Competidor_{pos}</span>
                                </div>
                                <span className="text-[10px] font-black text-[#39FF14]">{2500 - (pos * 200)} PTS</span>
                            </div>
                        ))}

                        {/* VOCÊ em destaque */}
                        <div className="flex items-center justify-between p-4 bg-[#39FF14]/10 border-l-4 border-[#39FF14]">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-black italic text-[#39FF14]">#42</span>
                                <span className="text-sm font-black uppercase italic">VOCÊ</span>
                            </div>
                            <span className="text-sm font-black text-[#39FF14]">{profile?.season_points || 0} PTS</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Grid de Modos de Jogo e Missões */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* 3.5 Cards Principais (Modos) */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* JOGAR AGORA */}
                    <button
                        onClick={() => onStartMatch('RAPIDA')}
                        className="group relative h-80 bg-zinc-900 border-2 border-white/5 hover:border-[#39FF14] transition-all p-8 flex flex-col justify-between text-left overflow-hidden cursor-pointer"
                        style={{ borderRadius: '0px' }}
                    >
                        <Zap className="w-12 h-12 text-[#39FF14] group-hover:scale-110 transition-transform" />
                        <div className="space-y-2 relative z-10 font-sans">
                            <h4 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-[#39FF14] transition-colors">Jogar Agora</h4>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">
                                10 questões rápidas. Precisão e velocidade máxima.
                            </p>
                        </div>
                        <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all">
                            <ArrowRight className="w-8 h-8 text-[#39FF14]" />
                        </div>
                    </button>

                    {/* DESAFIO DIÁRIO */}
                    <button
                        onClick={() => onStartMatch('DIARIA')}
                        className="group relative h-80 bg-zinc-900 border-2 border-white/5 hover:border-amber-400 transition-all p-8 flex flex-col justify-between text-left overflow-hidden cursor-pointer"
                        style={{ borderRadius: '0px' }}
                    >
                        <Flame className="w-12 h-12 text-amber-500 group-hover:scale-110 transition-transform" />
                        <div className="space-y-2 relative z-10 font-sans">
                            <h4 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-amber-400 transition-colors">Desafio Diário</h4>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                5 questões. Bônus de streak diária para manter o foco.
                            </p>
                        </div>
                    </button>

                    {/* ARENA SEMANAL */}
                    <button
                        onClick={() => onStartMatch('ARENA')}
                        disabled={(profile?.season_points || 0) < 500}
                        className={`group relative h-80 bg-zinc-900 border-2 transition-all p-8 flex flex-col justify-between text-left overflow-hidden ${(profile?.season_points || 0) >= 500
                            ? 'border-white/5 hover:border-purple-500 cursor-pointer'
                            : 'opacity-50 cursor-not-allowed grayscale'
                            }`}
                        style={{ borderRadius: '0px' }}
                    >
                        {(profile?.season_points || 0) < 500 ? <Lock className="w-12 h-12 text-white/40" /> : <Medal className="w-12 h-12 text-purple-500" />}
                        <div className="space-y-2 relative z-10 font-sans">
                            <h4 className="text-2xl font-black italic uppercase tracking-tighter">Arena Semanal</h4>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                                20 questões avançadas. Recompensa máxima da liga.
                            </p>
                            {(profile?.season_points || 0) < 500 && (
                                <p className="text-[9px] font-black text-rose-500 uppercase mt-2">Requer 500 Pontos para Desbloquear</p>
                            )}
                        </div>
                    </button>

                </div>

                {/* 3.4 Missões da Semana */}
                <div className="bg-[#0a0a0a] border-2 border-white/5 p-6 space-y-6 overflow-y-auto max-h-[600px]">
                    <h3 className="text-sm font-black italic uppercase tracking-tighter flex items-center gap-2 text-white/40">
                        <Target className="w-4 h-4" /> Missões Semanais
                    </h3>

                    <div className="space-y-4">
                        {missions.length === 0 ? (
                            <p className="text-[10px] text-white/40 text-center py-8 italic uppercase font-bold tracking-widest">Nenhuma missão no momento...</p>
                        ) : missions.map((mission) => (
                            <div key={mission.id} className="space-y-3 p-4 bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                                <div>
                                    <h4 className="text-[10px] font-black italic uppercase text-[#39FF14] tracking-widest">{mission.name}</h4>
                                    <p className="text-[9px] font-bold text-white/60 uppercase mt-1 leading-tight">{mission.description}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-[8px] font-black uppercase text-white/40">
                                        <span>PROGRESSO</span>
                                        <span>{mission.progress}/{mission.goal}</span>
                                    </div>
                                    <div className="h-1.5 bg-black rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#39FF14]"
                                            style={{ width: `${(mission.progress / mission.goal) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[8px] font-black text-[#39FF14] uppercase">+{mission.reward.points || 0} PTS / +{mission.reward.xp || 0} XP</span>
                                    {mission.status === 'COMPLETED' ? (
                                        <button
                                            onClick={() => onClaimMission && onClaimMission(mission.id)}
                                            className="px-4 py-1.5 bg-[#39FF14] text-black font-black uppercase text-[8px] hover:scale-105 active:scale-95 transition-all shadow-[0_0_10px_rgba(57,255,20,0.4)]"
                                        >
                                            RESGATAR
                                        </button>
                                    ) : mission.status === 'CLAIMED' ? (
                                        <span className="text-[8px] font-black text-white/20 uppercase">Resgatado</span>
                                    ) : (
                                        <span className="text-[8px] font-black text-white/20 uppercase">Em andamento</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3.6 Rodapé */}
            <div className="pt-10 border-t border-white/5 flex flex-wrap gap-8 items-center justify-between">
                <div className="flex gap-8">
                    <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-[#39FF14] transition-colors">Regras do Rank</button>
                    <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-[#39FF14] transition-colors">Histórico de Seasons</button>
                    <button
                        onClick={onOpenRewards}
                        className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-purple-400 transition-colors flex items-center gap-2"
                    >
                        <Star className="w-3 h-3" /> Recompensas & Nível
                    </button>
                </div>

                {isAdmin && (
                    <button
                        onClick={onOpenAdmin}
                        className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-colors"
                        style={{ borderRadius: '0px' }}
                    >
                        <Settings className="w-4 h-4" /> Admin Rank Elite
                    </button>
                )}
            </div>
        </div>
    )
}
