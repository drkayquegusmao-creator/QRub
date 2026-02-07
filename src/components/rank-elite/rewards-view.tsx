"use client"

import { motion } from 'framer-motion'
import { Award, Star, Lock, CheckCircle2, Crown, Zap, Shield, Sparkles } from 'lucide-react'
import { XPProfile, Reward, RankProfile } from '@/store/use-rank-elite'

interface RewardsViewProps {
    xpProfile: XPProfile | null;
    rewards: Reward[];
    profile: RankProfile | null;
    onEquip: (rewardId: string, equip: boolean) => void;
}

export function RewardsView({ xpProfile, rewards, profile, onEquip }: RewardsViewProps) {
    // Definir recompensas fixas (templates que o usuário pode desbloquear)
    const levelRewards = [
        { level: 2, name: 'Moldura Bronze', type: 'MOLDURA', description: 'O inicio da jornada.' },
        { level: 5, name: 'Título "Raiz Clínica"', type: 'TITULO', description: 'Mostre sua base sólida.' },
        { level: 10, name: 'Moldura de Prata', type: 'MOLDURA', description: 'Avançando nas ligas.' },
        { level: 15, name: 'Título "Anti-Chute"', type: 'TITULO', description: 'Precisão é sua marca.' },
        { level: 20, name: 'Avatar Especial Elite', type: 'AVATAR', description: 'Reconhecimento máximo.' },
    ]

    const nextReward = levelRewards.find(r => r.level > (xpProfile?.level_current || 1))

    return (
        <div className="max-w-6xl mx-auto p-8 md:p-12 space-y-16 pb-32">

            {/* Header com Progresso */}
            <header className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/20">
                            <Zap className="w-8 h-8 text-purple-400" />
                        </div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">PROGRESSÃO PERMANENTE</h2>
                    </div>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-xs leading-relaxed">
                        Seu nível no Rank Elite nunca reseta. <br />
                        Cada match concluído aproxima você de novas glórias e personalizações únicas.
                    </p>
                </div>

                <div className="space-y-6 bg-white/5 border border-white/5 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4"><Crown className="w-12 h-12 text-white/5" /></div>
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-5xl font-black italic text-white leading-none">Lvl {xpProfile?.level_current || 1}</span>
                            <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mt-2">{xpProfile?.xp_total || 0} XP TOTAL ACUMULADO</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Próxima Recompensa</p>
                            <p className="text-sm font-black italic text-white uppercase">{nextReward?.name || 'MAXIMIZADO'}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-black p-1">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${((xpProfile?.xp_total || 0) % 500) / 500 * 100}%` }}
                                className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 shadow-[0_0_20px_rgba(147,51,234,0.4)]"
                            />
                        </div>
                        <div className="flex justify-between text-[9px] font-bold text-white/20 uppercase">
                            <span>{Math.floor((xpProfile?.xp_total || 0) / 500) * 500} XP</span>
                            <span>{500 - ((xpProfile?.xp_total || 0) % 500)} XP PARA O NÍVEL {(xpProfile?.level_current || 1) + 1}</span>
                            <span>{Math.floor((xpProfile?.xp_total || 0) / 500 + 1) * 500} XP</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Grid de Recompensas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Meus Equipados */}
                <section className="lg:col-span-1 space-y-6">
                    <h3 className="text-sm font-black italic uppercase tracking-tighter flex items-center gap-2 text-white/40">
                        <Shield className="w-4 h-4" /> Ativos no Perfil
                    </h3>
                    <div className="space-y-4">
                        {rewards.filter(r => r.is_equipped).length === 0 ? (
                            <div className="p-8 border-2 border-dashed border-white/5 text-center space-y-2 opacity-40">
                                <Sparkles className="w-8 h-8 mx-auto text-white/20" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Nenhum item equipado</p>
                            </div>
                        ) : (
                            rewards.filter(r => r.is_equipped).map(reward => (
                                <div key={reward.id} className="p-6 bg-white/5 border border-purple-500/30 flex justify-between items-center group">
                                    <div>
                                        <h4 className="text-sm font-black uppercase italic text-[#39FF14]">{reward.name}</h4>
                                        <p className="text-[10px] text-white/40 font-bold uppercase">{reward.type}</p>
                                    </div>
                                    <button
                                        onClick={() => onEquip(reward.id, false)}
                                        className="text-[10px] font-black uppercase text-rose-500 hover:underline"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Trilhas de Desbloqueio */}
                <section className="lg:col-span-2 space-y-8">
                    <h3 className="text-sm font-black italic uppercase tracking-tighter flex items-center gap-2 text-white/40">
                        <Award className="w-4 h-4" /> Linha do Tempo de Recompensas
                    </h3>

                    <div className="space-y-6">
                        {levelRewards.map((item) => {
                            const isUnlocked = (xpProfile?.level_current || 1) >= item.level;
                            const isEquipped = rewards.find(r => r.name === item.name)?.is_equipped;

                            return (
                                <div
                                    key={item.level}
                                    className={`p-6 border-2 transition-all flex items-center gap-8 ${isUnlocked ? 'bg-zinc-900 border-white/10' : 'bg-black/40 border-white/5 opacity-50 grayscale'
                                        }`}
                                    style={{ borderRadius: '0px' }}
                                >
                                    <div className={`w-16 h-16 shrink-0 flex items-center justify-center font-black italic transition-all ${isUnlocked ? 'bg-[#39FF14] text-black shadow-[0_0_20px_rgba(57,255,20,0.3)]' : 'bg-white/5 text-white/20'
                                        }`}>
                                        LVL {item.level}
                                    </div>

                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-xl font-black italic uppercase tracking-tighter">{item.name}</h4>
                                            {isUnlocked && <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />}
                                        </div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.description}</p>
                                    </div>

                                    <div>
                                        {isUnlocked ? (
                                            isEquipped ? (
                                                <span className="text-[10px] font-black uppercase text-[#39FF14] tracking-widest">Equipado</span>
                                            ) : (
                                                <button
                                                    className="px-6 py-2 bg-white text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all"
                                                    style={{ borderRadius: '0px' }}
                                                >
                                                    Equipar
                                                </button>
                                            )
                                        ) : (
                                            <div className="flex items-center gap-2 text-white/20">
                                                <Lock className="w-3 h-3" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Bloqueado</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}
