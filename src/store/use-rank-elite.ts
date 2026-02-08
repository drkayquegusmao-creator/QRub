import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

export type LeagueName = 'BRONZE' | 'PRATA' | 'OURO' | 'PLATINA' | 'DIAMANTE' | 'ELITE';
export type MatchMode = 'RAPIDA' | 'DIARIA' | 'ARENA';
export type ZoneStatus = 'SAFE' | 'PROMOTION' | 'DANGER';

export interface League {
    id: string;
    name: LeagueName;
    min_points: number;
    max_points: number | null;
    difficulty_profile: any;
    multipliers: any;
    arena_requirements: any;
}

export interface RankProfile {
    user_id: string;
    current_league_id: string;
    season_points: number;
    lifetime_points: number;
    streak_days: number;
    abandon_rate: number;
    accuracy_rate: number;
    rank_elite_admin: boolean;
}

export interface XPProfile {
    user_id: string;
    xp_total: number;
    level_current: number;
}

export interface Mission {
    id: string;
    template_id: string;
    progress: number;
    goal: number;
    status: 'IN_PROGRESS' | 'COMPLETED' | 'CLAIMED';
    name: string;
    description: string;
    reward: any;
}

export interface Reward {
    id: string;
    name: string;
    type: 'visual' | 'functional';
    config: any;
    unlock_condition: any;
    is_equipped?: boolean;
}

interface RankEliteState {
    activeSeason: { id: string; name: string } | null;
    leagues: League[];
    profile: RankProfile | null;
    xpProfile: XPProfile | null;
    missions: Mission[];
    rewards: Reward[];
    isLoading: boolean;
    error: string | null;
    isAdmin: boolean;

    // Actions
    init: (userId: string, userRole?: string) => Promise<void>;
    startMatch: (userId: string, mode: MatchMode) => Promise<string | null>;
    finishMatch: (matchId: string, stats: {
        correct: number;
        wrong: number;
        points: number;
        xp: number;
        duration: number;
        incorrectQuestionIds: number[];
    }) => Promise<void>;
    claimMission: (missionId: string) => Promise<void>;
    equipReward: (rewardId: string, equip: boolean) => Promise<void>;
}

export const useRankElite = create<RankEliteState>((set, get) => ({
    activeSeason: null,
    leagues: [],
    profile: null,
    xpProfile: null,
    missions: [],
    rewards: [],
    isLoading: false,
    error: null,
    isAdmin: false,

    init: async (userId: string, userRole?: string) => {
        set({ isLoading: true, error: null });
        try {
            // 1. Get Active Season
            const { data: seasons, error: seasonErr } = await supabase
                .from('rank_seasons')
                .select('id, name')
                .eq('status', 'ACTIVE')
                .maybeSingle();

            if (seasonErr) throw seasonErr;
            if (!seasons) throw new Error("Nenhuma temporada ativa encontrada.");
            set({ activeSeason: seasons });

            // 2. Get Leagues
            const { data: leaguesData, error: leaguesErr } = await supabase
                .from('rank_leagues')
                .select('*')
                .eq('is_active', true)
                .order('min_points', { ascending: true });
            if (leaguesErr) throw leaguesErr;
            set({ leagues: leaguesData });

            // 3. Get or Create Rank Profile
            let { data: profile, error: profileErr } = await supabase
                .from('rank_profiles')
                .select('*')
                .eq('user_id', userId)
                .maybeSingle();

            if (!profile && !profileErr) {
                // Determine initial league (usually Bronze)
                const bronzeLeague = leaguesData.find(l => l.name === 'BRONZE') || leaguesData[0];
                const { data: newProfile, error: createProfileErr } = await supabase
                    .from('rank_profiles')
                    .insert({
                        user_id: userId,
                        current_league_id: bronzeLeague.id,
                    })
                    .select()
                    .maybeSingle();

                if (createProfileErr && createProfileErr.code === '23505') {
                    const { data: refetched } = await supabase
                        .from('rank_profiles')
                        .select('*')
                        .eq('user_id', userId)
                        .single();
                    profile = refetched;
                } else if (createProfileErr) throw createProfileErr;
                else profile = newProfile;
            } else if (profileErr) throw profileErr;

            // 4. Get or Create XP Profile
            let { data: xpProfile, error: xpErr } = await supabase
                .from('rank_xp_profiles')
                .select('*')
                .eq('user_id', userId)
                .maybeSingle();

            if (!xpProfile && !xpErr) {
                const { data: newXP, error: createXPErr } = await supabase
                    .from('rank_xp_profiles')
                    .insert({ user_id: userId })
                    .select()
                    .maybeSingle();

                if (createXPErr && createXPErr.code === '23505') {
                    const { data: refetched } = await supabase
                        .from('rank_xp_profiles')
                        .select('*')
                        .eq('user_id', userId)
                        .single();
                    xpProfile = refetched;
                } else if (createXPErr) throw createXPErr;
                else xpProfile = newXP;
            } else if (xpErr) throw xpErr;

            // 5. Get Missions (current week)
            const { data: missionsData, error: missionsErr } = await supabase
                .from('rank_user_missions')
                .select(`
                    *,
                    template:rank_mission_templates!template_id(name, description, reward)
                `)
                .eq('user_id', userId)
                .eq('season_id', seasons.id);

            // Format missions for UI
            const formattedMissions = (missionsData || []).map(m => ({
                id: m.id,
                template_id: m.template_id,
                progress: m.progress,
                goal: m.goal,
                status: m.status,
                name: m.template?.name || 'Missão',
                description: m.template?.description || '',
                reward: m.template?.reward || {}
            }));

            // 6. Get Rewards (unlocked)
            const { data: userRewards, error: rewardsErr } = await supabase
                .from('rank_user_rewards')
                .select(`
                    *,
                    reward:rank_rewards!reward_id(*)
                `)
                .eq('user_id', userId);

            const formattedRewards = (userRewards || []).map(ur => ({
                ...ur.reward,
                is_equipped: ur.is_equipped
            }));

            // Check Admin Status
            const isAdminGlobal = ['MASTER', 'ADMIN_MASTER', 'ADMIN_GLOBAL'].includes(userRole || '');
            const isAdminElite = profile?.rank_elite_admin || isAdminGlobal;

            set({
                profile,
                xpProfile,
                missions: formattedMissions,
                rewards: formattedRewards,
                isAdmin: isAdminElite
            });

        } catch (err: any) {
            console.error('Rank Elite Init Error:', err);
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    },

    startMatch: async (userId: string, mode: MatchMode) => {
        const { activeSeason, profile } = get();
        if (!activeSeason || !profile) return null;

        try {
            const { data: match, error } = await supabase
                .from('rank_matches')
                .insert({
                    user_id: userId,
                    season_id: activeSeason.id,
                    league_id: profile.current_league_id,
                    mode,
                    status: 'IN_PROGRESS',
                    total_questions: mode === 'RAPIDA' ? 10 : (mode === 'DIARIA' ? 5 : 20)
                })
                .select()
                .single();

            if (error) throw error;
            return match.id;
        } catch (err) {
            console.error('Start Match Error:', err);
            return null;
        }
    },

    finishMatch: async (matchId: string, stats: {
        correct: number;
        wrong: number;
        points: number;
        xp: number;
        duration: number;
        incorrectQuestionIds: number[];
    }) => {
        try {
            // 1. Update Match record
            const { error: matchErr } = await supabase
                .from('rank_matches')
                .update({
                    status: 'FINISHED',
                    correct_count: stats.correct,
                    wrong_count: stats.wrong,
                    total_points: stats.points,
                    total_xp: stats.xp,
                    finished_at: new Date().toISOString()
                })
                .eq('id', matchId);
            if (matchErr) throw matchErr;

            // 2. Passive Integration: Error Notebook
            if (stats.incorrectQuestionIds.length > 0) {
                const { profile } = get();
                if (profile) {
                    const { data: qData } = await supabase
                        .from('questao_base')
                        .select('id, specialty_id')
                        .in('id', stats.incorrectQuestionIds);

                    if (qData) {
                        const errorLogs = qData.map(q => ({
                            user_id: profile.user_id,
                            question_id: q.id.toString(),
                            specialty_id: q.specialty_id || 'GERAL',
                            next_review_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                        }));
                        await supabase.from('error_notebook').upsert(errorLogs, { onConflict: 'user_id,question_id' });
                    }
                }
            }

            // 3. Update Profiles
            const { profile, xpProfile, leagues } = get();
            if (!profile || !xpProfile) return;

            const newPoints = profile.season_points + stats.points;
            const newXP = xpProfile.xp_total + stats.xp;

            // Re-calculate League if necessary
            let newLeagueId = profile.current_league_id;
            const currentLeague = [...leagues].reverse().find(l => newPoints >= l.min_points);
            if (currentLeague) newLeagueId = currentLeague.id;

            // Update DB
            const { error: profUpdateErr } = await supabase.from('rank_profiles').update({
                season_points: newPoints,
                lifetime_points: profile.lifetime_points + stats.points,
                current_league_id: newLeagueId,
                last_play_at: new Date().toISOString()
            }).eq('user_id', profile.user_id);

            const { error: xpUpdateErr } = await supabase.from('rank_xp_profiles').update({
                xp_total: newXP,
                level_current: Math.floor(newXP / 500) + 1,
                last_xp_gain_at: new Date().toISOString()
            }).eq('user_id', xpProfile.user_id);

            if (profUpdateErr || xpUpdateErr) throw (profUpdateErr || xpUpdateErr);

            // 4. Update Missions Progress (Simulated: +1 progress per match for all active missions)
            const { missions } = get();
            const updatedMissions = await Promise.all(missions.map(async (m) => {
                if (m.status === 'IN_PROGRESS') {
                    const newProgress = Math.min(m.progress + 1, m.goal);
                    const isCompleted = newProgress >= m.goal;
                    const newStatus = isCompleted ? 'COMPLETED' : 'IN_PROGRESS';

                    if (newProgress !== m.progress || newStatus !== m.status) {
                        await supabase.from('rank_user_missions').update({
                            progress: newProgress,
                            status: newStatus as any
                        }).eq('id', m.id);
                    }

                    return { ...m, progress: newProgress, status: newStatus as any };
                }
                return m;
            }));

            // Refresh Local State (UI update)
            set({
                profile: { ...profile, season_points: newPoints, current_league_id: newLeagueId },
                xpProfile: { ...xpProfile, xp_total: newXP, level_current: Math.floor(newXP / 500) + 1 },
                missions: updatedMissions
            });

        } catch (err) {
            console.error('Finish Match Error:', err);
        }
    },

    claimMission: async (missionId: string) => {
        const { missions, profile, xpProfile } = get();
        const mission = missions.find(m => m.id === missionId);

        if (!mission || mission.status !== 'COMPLETED' || !profile || !xpProfile) return;

        try {
            // 1. Mark as Claimed
            const { error: updateErr } = await supabase
                .from('rank_user_missions')
                .update({ status: 'CLAIMED', claimed_at: new Date().toISOString() })
                .eq('id', missionId);

            if (updateErr) throw updateErr;

            // 2. Grant Reward
            let rewardXP = 0;
            let rewardPoints = 0;

            if (mission.reward?.type === 'XP') rewardXP = mission.reward.value || 0;
            if (mission.reward?.type === 'POINTS') rewardPoints = mission.reward.value || 0;

            if (rewardXP > 0) {
                const newXP = xpProfile.xp_total + rewardXP;
                await supabase.from('rank_xp_profiles').update({
                    xp_total: newXP,
                    level_current: Math.floor(newXP / 500) + 1
                }).eq('user_id', xpProfile.user_id);

                set({ xpProfile: { ...xpProfile, xp_total: newXP, level_current: Math.floor(newXP / 500) + 1 } });
            }

            if (rewardPoints > 0) {
                const newPoints = profile.season_points + rewardPoints;
                await supabase.from('rank_profiles').update({
                    season_points: newPoints
                }).eq('user_id', profile.user_id);

                set({ profile: { ...profile, season_points: newPoints } });
            }

            // 3. Update Local Mission State
            const updatedMissions = missions.map(m =>
                m.id === missionId ? { ...m, status: 'CLAIMED' as const } : m
            );
            set({ missions: updatedMissions });

        } catch (err) {
            console.error('Claim Mission Error:', err);
        }
    },

    equipReward: async (rewardId: string, equip: boolean) => {
        const { profile } = get();
        if (!profile) return;
        try {
            // First UNEQUIP all of same type? (Optional, depends on logic)
            // Just equip this one
            const { error } = await supabase
                .from('rank_user_rewards')
                .update({ is_equipped: equip })
                .eq('user_id', profile.user_id)
                .eq('reward_id', rewardId);
            if (error) throw error;

            // Refresh
            const currentRewards = get().rewards.map(r =>
                r.id === rewardId ? { ...r, is_equipped: equip } : r
            );
            set({ rewards: currentRewards });
        } catch (err) {
            console.error('Equip Reward Error:', err);
        }
    }
}));
