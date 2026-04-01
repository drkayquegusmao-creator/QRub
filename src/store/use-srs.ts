import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

export type SRSStage = 'NEUTRAL' | 'LEVELING' | 'ACTIVE'
export type SRSLevel = 'FRACO' | 'REGULAR' | 'BOM' | 'FORTE' | 'NOT_LEVELED'

export interface SubjectSRS {
    id: string
    level: number
    last_accuracy: number
    last_studied: Date | null
    next_review: Date | null
    current_interval: number
    stage: SRSStage
    history: any[]
}

export interface AgendaItem {
    agenda_id: string;
    assunto_id: string;
    nome: string;
    specialty_id: string;
    data_programada: string;
    dias_atrasado?: number;
    nivel_atual: number;
    ultima_nota: number;
}

export interface SugestaoNivelamento {
    assunto_id: string;
    nome: string;
    specialty_id: string;
    questoes_disponiveis: number;
}

interface SRSStore {
    subjects: SubjectSRS[]
    taxonomy: any[]
    agenda: {
        revisoes_atrasadas: AgendaItem[]
        revisoes_do_dia: AgendaItem[]
        sugestao_nivelamento: SugestaoNivelamento | null
        loading: boolean
        error: string | null
    }
    
    // Actions
    init_taxonomy: () => Promise<void>
    load_progress: (userId: string) => Promise<void>
    load_agenda: (userId: string) => Promise<void>
    
    // Session Actions
    start_session: (userId: string, assuntoId: string, tipo: string) => Promise<any>
    finish_session: (sessaoId: string, userId: string, respostas: any[]) => Promise<any>
    
    // Intelligent Engine
    get_intelligent_action: (allQuestions?: any[]) => { subject_id: string | null; type: 'NIVELAMENTO' | 'REVISAO' | 'CADERNO_ERROS' }
    get_pending_tasks: (allQuestions?: any[]) => Array<{ subject_id: string; stage: 'LEVELING' | 'REVISION' }>
    get_critical_points: () => Array<{ subject_id: string; score: number }>
}

export const useSRS = create<SRSStore>()(
    persist(
        (set, get) => ({
            subjects: [],
            taxonomy: [],
            agenda: {
                revisoes_atrasadas: [],
                revisoes_do_dia: [],
                sugestao_nivelamento: null,
                loading: false,
                error: null
            },

            init_taxonomy: async () => {
                try {
                    // Try to load from database cache first
                    const { data: taxonomia, error } = await supabase
                        .from('taxonomia')
                        .select('*')
                        .order('level', { ascending: true })
                        .order('name', { ascending: true })

                    if (error) throw error

                    // Build tree structure
                    const buildTree = (nodes: any[], parentId: string | null = null): any[] => {
                        return nodes
                            .filter(n => n.parent_id === parentId)
                            .map(n => ({
                                id: n.id,
                                name: n.name,
                                slug: n.slug,
                                level: n.level,
                                specialty_id: n.slug || n.id,
                                subspecialties: buildTree(nodes, n.id),
                                subjects: [] 
                            }))
                    }

                    const roots = buildTree(taxonomia, null)
                    
                    set({ 
                        taxonomy: roots.length > 0 ? [{ 
                            id: 'medicina', 
                            name: 'Residência Médica', 
                            specialties: roots 
                        }] : [] 
                    })
                } catch (err) {
                    console.error('Error loading taxonomy:', err)
                }
            },

            load_progress: async (userId: string) => {
                const { data, error } = await supabase
                    .from('assunto_progresso')
                    .select('*')
                    .eq('user_id', userId)

                if (error) return

                const mapped: SubjectSRS[] = data.map(p => ({
                    id: p.assunto_id,
                    level: p.nivel_atual || 0,
                    history: [], 
                    last_accuracy: p.percentual_acerto || 0,
                    last_studied: p.data_ultima_sessao ? new Date(p.data_ultima_sessao) : null,
                    next_review: p.data_proxima_revisao ? new Date(p.data_proxima_revisao) : null,
                    current_interval: p.intervalo_dias || 0,
                    stage: (p.estado_cognitivo === 'NAO_NIVELADO' || !p.estado_cognitivo) ? 'NEUTRAL' : 
                           (p.data_nivelamento ? 'ACTIVE' : 'LEVELING')
                }))

                set({ subjects: mapped })
            },

            load_agenda: async (userId: string) => {
                set(state => ({ agenda: { ...state.agenda, loading: true, error: null } }))
                try {
                    const response = await fetch(`/api/dashboard/diario?user_id=${userId}`)
                    const result = await response.json()
                    
                    if (result.success) {
                        set({
                            agenda: {
                                revisoes_atrasadas: result.revisoes_atrasadas,
                                revisoes_do_dia: result.revisoes_do_dia,
                                sugestao_nivelamento: result.sugestao_nivelamento,
                                loading: false,
                                error: null
                            }
                        })
                    } else {
                        throw new Error(result.error || 'Erro ao carregar agenda')
                    }
                } catch (err: any) {
                    set(state => ({ agenda: { ...state.agenda, loading: false, error: err.message } }))
                }
            },

            start_session: async (userId: string, assuntoId: string, tipo: string) => {
                try {
                    const response = await fetch('/api/sessao/criar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: userId, assunto_id: assuntoId, tipo })
                    })
                    const result = await response.json()
                    if (!result.success) throw new Error(result.error || 'Erro ao criar sessão')
                    return result.data
                } catch (err) {
                    console.error('Error starting session:', err)
                    throw err
                }
            },

            finish_session: async (sessaoId: string, userId: string, respostas: any[]) => {
                try {
                    const response = await fetch('/api/sessao/finalizar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ sessao_id: sessaoId, user_id: userId, respostas })
                    })
                    const result = await response.json()
                    if (!result.success) throw new Error(result.error || 'Erro ao finalizar sessão')
                    
                    // Update memory score on frontend for immediate feedback
                    try {
                        const { updateSubjectMemoryScore } = await import('@/lib/srs-service')
                        await updateSubjectMemoryScore(userId, result.data.assunto_id)
                    } catch (e) {
                        console.warn('Could not update memory score:', e)
                    }

                    // Refresh agenda and progress
                    await get().load_agenda(userId)
                    await get().load_progress(userId)
                    
                    return result.data
                } catch (err) {
                    console.error('Error finishing session:', err)
                    throw err
                }
            },

            get_intelligent_action: (allQuestions?: any[]) => {
                const { agenda, subjects } = get()

                // Priority 1: Atrasadas
                if (agenda.revisoes_atrasadas && agenda.revisoes_atrasadas.length > 0) {
                    return { subject_id: agenda.revisoes_atrasadas[0].assunto_id, type: 'REVISAO' }
                }

                // Priority 2: Do Dia
                if (agenda.revisoes_do_dia && agenda.revisoes_do_dia.length > 0) {
                    return { subject_id: agenda.revisoes_do_dia[0].assunto_id, type: 'REVISAO' }
                }

                // Priority 3: Sugestão Nivelamento
                if (agenda.sugestao_nivelamento) {
                    return { subject_id: agenda.sugestao_nivelamento.assunto_id, type: 'NIVELAMENTO' }
                }

                // Fallback: use internal subjects list (legacy)
                const pendingLevelingIds = subjects.filter(s => s.stage === 'LEVELING' || s.stage === 'NEUTRAL').map(s => s.id)
                if (pendingLevelingIds.length > 0) {
                    return { subject_id: pendingLevelingIds[0], type: 'NIVELAMENTO' }
                }

                return { subject_id: null, type: 'NIVELAMENTO' }
            },

            get_pending_tasks: (allQuestions?: any[]) => {
                const { agenda } = get()
                const tasks: Array<{ subject_id: string; stage: 'LEVELING' | 'REVISION' }> = []

                if (agenda.revisoes_atrasadas) {
                    agenda.revisoes_atrasadas.forEach(r => {
                        tasks.push({ subject_id: r.assunto_id, stage: 'REVISION' })
                    })
                }

                if (agenda.revisoes_do_dia) {
                    agenda.revisoes_do_dia.forEach(r => {
                        tasks.push({ subject_id: r.assunto_id, stage: 'REVISION' })
                    })
                }

                if (agenda.sugestao_nivelamento) {
                    tasks.push({ subject_id: agenda.sugestao_nivelamento.assunto_id, stage: 'LEVELING' })
                }

                return tasks
            },

            get_critical_points: () => {
                const { subjects } = get()
                return subjects
                    .filter(s => s.last_accuracy < 50 && s.stage === 'ACTIVE')
                    .map(s => ({ subject_id: s.id, score: s.last_accuracy }))
            }
        }),
        {
            name: 'qrub-srs-v2-session',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ subjects: state.subjects })
        }
    )
)
