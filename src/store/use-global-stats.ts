import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface GlobalStatsState {
  totalAnswered: number;
  averageScore: number;
  loadGlobalStats: () => Promise<void>;
}

export const useGlobalStats = create<GlobalStatsState>((set) => ({
  totalAnswered: 0,
  averageScore: 0,
  loadGlobalStats: async () => {
    // We could calculate this from user_question_history or user_stats_rolling
    const { data, error } = await supabase
      .from('user_question_history')
      .select('answered_correct')

    if (!error && data) {
      const total = data.length
      const correct = data.filter(d => d.answered_correct).length
      
      set({ 
          totalAnswered: total, 
          averageScore: total > 0 ? Math.round((correct / total) * 100) : 0 
      })
    }
  }
}))
