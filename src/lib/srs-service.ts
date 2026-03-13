/**
 * SRS and Memory Map Service - WRub Saúde
 * Implementation of SM-2 Adapted and Memory Score Logic
 */

import { supabase } from './supabase';

export interface MemoryScoreConfig {
  weight_historical: number;
  weight_recent: number;
  weight_consolidation: number;
  weight_regularity: number;
  weight_stability: number;
  penalty_max_delay: number;
}

export const SRS_CONFIG = {
  EASE_FACTOR_DEFAULT: 2.5,
  EASE_FACTOR_MIN: 1.3,
  EASE_FACTOR_MAX: 3.0,
  INTERVAL_MIN: 1,
  INTERVAL_MAX: 120,
  MEMORY_SCORE: {
    weight_historical: 0.30,
    weight_recent: 0.25,
    weight_consolidation: 0.15,
    weight_regularity: 0.10,
    weight_stability: 0.10,
    penalty_max_delay: 15,
  } as MemoryScoreConfig,
};

export type MemoryState = 'Critical' | 'Weak' | 'Unstable' | 'Good' | 'Consolidated';

export interface SRSStateUpdate {
  intervalo_dias: number;
  ease_factor: number;
  repeticoes: number;
}

/**
 * Calculates the next SRS state based on performance (0-100)
 */
export function calculateNextSRSState(
  currentInterval: number,
  currentEaseFactor: number,
  currentRepetitions: number,
  performance: number
): SRSStateUpdate {
  let interval = currentInterval;
  let easeFactor = currentEaseFactor;
  let repetitions = currentRepetitions;

  if (performance >= 80) {
    repetitions += 1;
    interval = Math.round(interval * easeFactor);
    easeFactor = Math.min(SRS_CONFIG.EASE_FACTOR_MAX, easeFactor + 0.1);
  } else if (performance >= 60) {
    // repetitions stay the same
    interval = Math.round(interval * 1.3);
    // easeFactor stays the same
  } else {
    repetitions = 0;
    interval = 1;
    easeFactor = Math.max(SRS_CONFIG.EASE_FACTOR_MIN, easeFactor - 0.2);
  }

  // Safety limits
  interval = Math.max(SRS_CONFIG.INTERVAL_MIN, Math.min(SRS_CONFIG.INTERVAL_MAX, interval));

  return {
    intervalo_dias: interval,
    ease_factor: Number(easeFactor.toFixed(2)),
    repeticoes: repetitions,
  };
}

/**
 * Calculates current Memory Score with Real-time Decay
 */
export function calculateCurrentMemoryScore(
  baseScore: number,
  lastRevisionDate: Date,
  revisionsCompleted: number,
  isDelayed: boolean
): { score: number; state: MemoryState } {
  const now = new Date();
  const daysSinceLast = Math.floor((now.getTime() - lastRevisionDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let decayPerDay = 0;
  if (revisionsCompleted <= 1) decayPerDay = 2.0;
  else if (revisionsCompleted <= 4) decayPerDay = 1.0;
  else decayPerDay = 0.4;

  let currentScore = baseScore;
  
  // Apply delay penalty
  if (isDelayed) {
    currentScore -= 5; // Immediate penalty for being late
  }

  // Apply decay only after the "grace period" (current day)
  if (daysSinceLast > 0) {
    currentScore -= (daysSinceLast * decayPerDay);
  }

  currentScore = Math.max(0, Math.min(100, currentScore));

  let state: MemoryState = 'Critical';
  if (currentScore > 80) state = 'Consolidated';
  else if (currentScore > 60) state = 'Good';
  else if (currentScore > 40) state = 'Unstable';
  else if (currentScore > 20) state = 'Weak';

  return { score: Number(currentScore.toFixed(2)), state };
}

/**
 * Calculates Weighted Memory Score based on session history
 */
export async function updateSubjectMemoryScore(userId: string, subjectId: string) {
  // 1. Fetch sessions
  const { data: sessions } = await supabase
    .from('sessoes')
    .select('nota, finalized_at, tipo')
    .eq('user_id', userId)
    .eq('assunto_id', subjectId)
    .eq('status', 'FINALIZADA')
    .order('finalized_at', { ascending: false });

  if (!sessions || sessions.length === 0) return;

  const avgNote = (sessions.reduce((acc, s) => acc + Number(s.nota), 0) / sessions.length) * 10; // 0-100
  const recentSessions = sessions.slice(0, 3);
  const recentAvg = (recentSessions.reduce((acc, s) => acc + Number(s.nota), 0) / recentSessions.length) * 10;
  
  const totalRevisions = sessions.filter(s => s.tipo === 'REVISAO').length;
  
  // Consolidation score: log-based growth capped at 100% contribution
  const consolidationScore = Math.min(100, totalRevisions * 20); 

  // Stability: inverse of variance in recent scores
  const stability = 100 - (recentSessions.length > 1 ? calculateVariance(recentSessions.map(s => Number(s.nota) * 10)) : 0);

  const config = SRS_CONFIG.MEMORY_SCORE;
  const weightedScore = 
    (avgNote * config.weight_historical) +
    (recentAvg * config.weight_recent) +
    (consolidationScore * config.weight_consolidation) +
    (stability * config.weight_stability);
    
  // Update DB
  await supabase
    .from('assunto_progresso')
    .update({ 
      memory_score: weightedScore,
      revisoes_concluidas: totalRevisions,
      melhor_nota: Math.max(...sessions.map(s => Number(s.nota))),
      pior_nota: Math.min(...sessions.map(s => Number(s.nota))),
      estabilidade: stability
    })
    .match({ user_id: userId, assunto_id: subjectId });

  // Record history
  const { score, state } = calculateCurrentMemoryScore(weightedScore, new Date(sessions[0].finalized_at!), totalRevisions, false);
  
  await supabase.from('memory_score_history').insert({
    user_id: userId,
    assunto_id: subjectId,
    memory_score: score,
    estado_memoria: state,
    tendencia: 'ESTAVEL',
    origem_evento: sessions[0].tipo === 'NIVELAMENTO' ? 'nivelamento' : 'revisao'
  });
}

function calculateVariance(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b) / values.length;
  const squareDiffs = values.map(v => Math.pow(v - mean, 2));
  return Math.sqrt(squareDiffs.reduce((a, b) => a + b) / values.length);
}
