
import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Question, Guideline } from '@/lib/data-mock'

interface QuestionsState {
    questions: Question[]
    guidelines: Guideline[]
    loading: boolean
    error: string | null
    loadQuestions: (filters?: {
        course_id?: string,
        specialty_id?: string,
        subspecialty_id?: string,
        subject_id?: string
    }) => Promise<void>
    loadGuidelines: () => Promise<void>
    addQuestion: (question: Omit<Question, 'id'>) => Promise<{ success: boolean, message: string }>
    addQuestions: (questions: Question[]) => Promise<{ success: boolean, message: string }>
    deleteQuestion: (id: string) => Promise<{ success: boolean, message: string }>
    generateQuestions: (params: {
        specialty_id: string
        subspecialty_id?: string
        subject_id?: string
        count: number
        difficulty?: "Fácil" | "Médio" | "Difícil"
        blueprint_id?: string
        study_box_id?: string
    }) => Promise<{ success: boolean, message: string, generated?: number }>
}

export const useQuestions = create<QuestionsState>()(
    (set, get) => ({
        questions: [],
        guidelines: [],
        loading: false,
        error: null,

        loadQuestions: async (filters) => {
            set({ loading: true, error: null })

            try {
                if (isSupabaseConfigured()) {
                    let allQuestions: Question[] = []
                    let hasMore = true
                    let page = 0
                    const pageSize = 1000

                    while (hasMore && allQuestions.length < 20000) {
                        let query = supabase.from('questions').select('*')

                        if (filters?.course_id) query = query.eq('course_id', filters.course_id)
                        if (filters?.specialty_id) query = query.eq('specialty_id', filters.specialty_id)
                        if (filters?.subspecialty_id) query = query.eq('subspecialty_id', filters.subspecialty_id)
                        if (filters?.subject_id) query = query.eq('subject_id', filters.subject_id)

                        const { data, error } = await query
                            .order('created_at', { ascending: false })
                            .range(page * pageSize, (page + 1) * pageSize - 1)

                        if (error) throw error

                        if (data) {
                            allQuestions = [...allQuestions, ...data]
                            if (data.length < pageSize) {
                                hasMore = false
                            } else {
                                page++
                            }
                        } else {
                            hasMore = false
                        }
                    }

                    set({ questions: allQuestions, loading: false })
                }
            } catch (err: any) {
                set({ error: err.message, loading: false })
            }
        },

        loadGuidelines: async () => {
            try {
                const { data, error } = await supabase
                    .from('guidelines')
                    .select('*')
                    .order('name')

                if (error) throw error
                set({ guidelines: data || [] })
            } catch (error) {
                console.error('Error loading guidelines:', error)
            }
        },

        addQuestion: async (question) => {
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

                const { data, error } = await supabase
                    .from('questions')
                    .insert([question])
                    .select()

                if (error) throw error

                set((state) => ({
                    questions: [data[0], ...state.questions]
                }))

                return { success: true, message: 'Questão salva com sucesso!' }
            } catch (err: any) {
                return { success: false, message: err.message || 'Erro ao salvar questão' }
            }
        },

        addQuestions: async (questions) => {
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

                const { data, error } = await supabase
                    .from('questions')
                    .insert(questions)
                    .select()

                if (error) throw error

                set((state) => ({
                    questions: [...(data || []), ...state.questions]
                }))

                return { success: true, message: `${questions.length} questões importadas com sucesso!` }
            } catch (err: any) {
                return { success: false, message: err.message || 'Erro ao importar questões' }
            }
        },

        deleteQuestion: async (id) => {
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')

                const { error } = await supabase
                    .from('questions')
                    .delete()
                    .eq('id', id)

                if (error) {
                    if (error.code === '23503') {
                        throw new Error('Esta questão possui respostas de usuários e não pode ser excluída para manter a integridade dos dados.')
                    }
                    throw error
                }

                set((state) => ({
                    questions: state.questions.filter(q => q.id !== id)
                }))

                return { success: true, message: 'Questão removida com sucesso!' }
            } catch (err: any) {
                return { success: false, message: err.message || 'Erro ao remover questão' }
            }
        },

        generateQuestions: async ({ specialty_id, subspecialty_id, subject_id, count, difficulty, blueprint_id, study_box_id }) => {
            const { COURSES } = await import('@/lib/data-mock')
            set({ loading: true })
            try {
                const generatedQuestions: Question[] = []

                // Helper to find data in hierarchy
                const targetCourse = COURSES.find(c => c.id === 'medicina') || COURSES[0]
                const spec = targetCourse.specialties.find(s => s.id === specialty_id) || targetCourse.specialties[0]
                const sub = spec.subspecialties.find(ss => ss.id === subspecialty_id) || spec.subspecialties[0] || { id: 'geral', name: 'geral', subjects: [] }
                const subName = sub.name || 'Geral'

                const subjects = (sub as any).subjects || []
                const subj = subjects.find((s: any) => s.id === subject_id) || subjects[0] || { id: 'geral', name: 'geral' }
                const subjName = subj.name || 'Geral'

                for (let i = 0; i < count; i++) {
                    const age = 18 + Math.floor(Math.random() * 65)
                    const gender = Math.random() > 0.5 ? 'masculino' : 'feminino'
                    const genderAdj = gender === 'masculino' ? 'o' : 'a'
                    const questionId = `QRUB-GEN-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`

                    const clinicalScenarios = [
                        `Paciente de ${age} anos, sexo ${gender}, previamente hígid${genderAdj}, comparece ao pronto-socorro com quadro de início há 6 horas. Refere sintomatologia compatível com ${subName}. Ao exame físico: BEG, corad${genderAdj}, hidratad${genderAdj}, acianótic${genderAdj}, anictéric${genderAdj}. PA: ${115 + Math.floor(Math.random() * 50)}/${75 + Math.floor(Math.random() * 30)} mmHg, FC: ${70 + Math.floor(Math.random() * 40)} bpm, TAX: ${(36.5 + Math.random() * 2).toFixed(1).replace('.', ',')}°C, FR: ${16 + Math.floor(Math.random() * 8)} irpm. Exames complementares evidenciam alterações compatíveis com o diagnóstico diferencial de ${subjName}. História patológica pregressa: nega comorbidades. Diante do quadro, qual a conduta mais adequada?`,
                        `Paciente de ${age} anos, sexo ${gender}, com história de ${subName} há 3 meses, procura atendimento médico por piora do quadro clínico. Relata sintomas progressivos de ${subjName}, incluindo manifestações específicas da especialidade. Ao exame: estado geral regular, sinais vitais com PA ${125 + Math.floor(Math.random() * 40)}/${80 + Math.floor(Math.random() * 25)} mmHg, FC ${75 + Math.floor(Math.random() * 35)} bpm, TAX: ${(36.5 + Math.random() * 1.5).toFixed(1).replace('.', ',')}°C. Exame físico segmentar revela achados compatíveis com a hipótese diagnóstica principal. Exames laboratoriais: Hemograma com Hb ${(11 + Math.random() * 3).toFixed(1).replace('.', ',')} g/dL, Leucócitos ${6000 + Math.floor(Math.random() * 8000)}/mm³, Plaquetas ${150000 + Math.floor(Math.random() * 200000)}/mm³. Qual o próximo passo na propedêutica deste paciente?`,
                        `Paciente de ${age} anos, sexo ${gender}, admitid${genderAdj} na emergência com quadro agudo de ${subjName}. Início súbito há 2 horas. Nega traumas ou uso de medicações. Ao exame: Glasgow ${13 + Math.floor(Math.random() * 3)}, pupilas isocóricas e fotorreagentes, ausência de sinais meníngeos. PA: ${105 + Math.floor(Math.random() * 60)}/${65 + Math.floor(Math.random() * 35)} mmHg, FC: ${80 + Math.floor(Math.random() * 40)} bpm, TAX: ${(36.2 + Math.random() * 1.2).toFixed(1).replace('.', ',')}°C, SatO2: ${92 + Math.floor(Math.random() * 8)}% em ar ambiente. Exames de imagem e laboratoriais foram solicitados conforme protocolo institucional para ${spec.name}. Qual a principal hipótese diagnóstica e conduta imediata?`
                    ]

                    const distractorOptions = [
                        `Conduta expectante com reavaliação em 48h`,
                        `Iniciar tratamento sintomático isolado sem investigação complementar`,
                        `Realizar procedimento invasivo sem estabilização prévia`,
                        `Administrar medicação de primeira linha em dose subterapêutica`,
                        `Encaminhar para especialista sem estabilização inicial`
                    ]

                    const correctAnswerText = `Iniciar protocolo terapêutico conforme diretriz brasileira atualizada de ${spec.name} (2024), com estabilização clínica e investigação complementar direcionada para ${subjName}`
                    const allIds = ['a', 'b', 'c', 'd', 'e']
                    const correctIdx = Math.floor(Math.random() * 5)
                    const correctId = allIds[correctIdx]

                    const finalOptions = allIds.map((id, idx) => {
                        if (id === correctId) return { id, text: correctAnswerText }
                        return { id, text: distractorOptions[idx > correctIdx ? idx - 1 : idx] }
                    })

                    const altExplanations: Record<string, string> = {}
                    allIds.forEach((id) => {
                        if (id === correctId) return
                        altExplanations[id] = `INCORRETA. A conduta sugerida nesta alternativa não é apropriada neste contexto de ${subjName}, pois o quadro exige abordagem imediata e baseada em evidências conforme diretrizes de ${spec.name}.`
                    })

                    const question: Question = {
                        id: questionId,
                        course_id: specialty_id === 'medicina-famlia-comunidade' ? 'medicina' : 'medicina',
                        specialty_id: specialty_id,
                        subspecialty_id: subspecialty_id || 'geral',
                        subject_id: subject_id || 'geral',
                        difficulty: (difficulty as any) || 'Médio',
                        enunciado: clinicalScenarios[Math.floor(Math.random() * clinicalScenarios.length)],
                        case_study: {
                            history: `Paciente de ${age} anos, ${gender}, com quadro clínico compatível com ${subName}. Antecedentes pessoais: nega comorbidades prévias. Antecedentes familiares: sem particularidades relevantes para o quadro atual.`,
                            physical_exam: `BEG, corad${genderAdj}, hidratad${genderAdj}, acianótic${genderAdj}, anictéric${genderAdj}. Sinais vitais: PA ${120 + Math.floor(Math.random() * 30)}/80 mmHg, FC 80 bpm, TAX 36,5°C. Exame físico segmentar compatível com a hipótese de ${subjName}.`,
                            lab_results: `Hemograma: Hb ${(12 + Math.random() * 2).toFixed(1).replace('.', ',')} g/dL, Leucócitos ${6000 + Math.floor(Math.random() * 4000)}/mm³, Plaquetas ${250000 + Math.floor(Math.random() * 100000)}/mm³. Bioquímica sem alterações significativas.`
                        },
                        options: finalOptions,
                        correct_option_id: correctId,
                        explanation: `A alternativa ${correctId.toUpperCase()} está CORRETA pois representa a conduta padrão-ouro segundo as diretrizes brasileiras atualizadas de ${spec.name}. O quadro clínico apresentado evidencia critérios diagnósticos para ${subjName}, exigindo abordagem terapêutica imediata e baseada em evidências.`,
                        alternative_explanations: altExplanations,
                        blueprint_id,
                        study_box_id,
                        metadata: {
                            origem: 'Gerada via Dr. QRub IA',
                            data_geracao: new Date().toISOString(),
                            tema: subjName
                        }
                    }

                    generatedQuestions.push(question)
                }

                if (isSupabaseConfigured()) {
                    const { error } = await supabase.from('questions').insert(generatedQuestions)
                    if (error) throw error
                }

                set(state => ({
                    questions: [...generatedQuestions, ...state.questions],
                    loading: false
                }))

                return {
                    success: true,
                    message: `${count} questões geradas com sucesso!`,
                    generated: count
                }
            } catch (err: any) {
                console.error('Erro na geração:', err)
                set({ loading: false })
                return {
                    success: false,
                    message: err.message || 'Erro ao gerar questões'
                }
            }
        }
    })
)
