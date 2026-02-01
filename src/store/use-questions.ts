
import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Question, Guideline, Subspecialty, Subject } from '@/lib/data-mock'

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
    deleteQuestions: (ids: string[]) => Promise<{ success: boolean, message: string }>
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
    (set) => ({
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
            } catch (err: unknown) {
                set({ error: err instanceof Error ? err.message : String(err), loading: false })
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
            } catch (err: unknown) {
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao salvar questão' }
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
            } catch (err: unknown) {
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao importar questões' }
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
            } catch (err: unknown) {
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao remover questão' }
            }
        },

        deleteQuestions: async (ids: string[]) => {
            try {
                if (!isSupabaseConfigured()) throw new Error('Supabase not configured')
                if (ids.length === 0) return { success: true, message: 'Nenhuma questão para remover.' }

                // Batch into chunks of 50 to avoid URL length limits in the Supabase API
                const CHUNK_SIZE = 50
                for (let i = 0; i < ids.length; i += CHUNK_SIZE) {
                    const chunk = ids.slice(i, i + CHUNK_SIZE)
                    const { error } = await supabase
                        .from('questions')
                        .delete()
                        .in('id', chunk)

                    if (error) {
                        console.error(`Error deleting chunk ${i / CHUNK_SIZE}:`, error)
                        if (error.code === '23503') {
                            throw new Error('Algumas questões possuem vínculos e não puderam ser excluídas.')
                        }
                        throw error
                    }
                }

                set((state) => ({
                    questions: state.questions.filter(q => !ids.includes(q.id))
                }))

                return { success: true, message: `${ids.length} questões removidas com sucesso!` }
            } catch (err: unknown) {
                console.error('Core delete error:', err)
                return { success: false, message: err instanceof Error ? err.message : 'Erro ao remover questões' }
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
                const subjects = (sub as Subspecialty).subjects || []
                const subj = subjects.find((s: Subject) => s.id === subject_id) || subjects[0] || { id: 'geral', name: 'geral' }
                const subjName = subj.name || 'Geral'

                for (let i = 0; i < count; i++) {
                    const age = 18 + Math.floor(Math.random() * 65)
                    const gender = Math.random() > 0.5 ? 'masculino' : 'feminino'
                    const genderAdj = gender === 'masculino' ? 'o' : 'a'
                    const article = gender === 'masculino' ? 'um' : 'uma'
                    const questionId = `QRUB-REV-${Date.now()}-${i}`

                    // --- ESTRUTURA REVALIDA/RESIDÊNCIA ---
                    // 1. Identificação + QP + HDA
                    const clinicalStart = [
                        `Paciente de ${age} anos, sexo ${gender}, pardo, procura a UPA queixando-se de ${subjName} há 3 dias, com piora progressiva nas últimas 12 horas.`,
                        `${article.charAt(0).toUpperCase() + article.slice(1)} paciente de ${age} anos, sexo ${gender}, é trazid${genderAdj} pelo SAMU com rebaixamento do nível de consciência e história de ${subjName}.`,
                        `Paciente de ${age} anos, ${gender}, tabagista e hipertenso, dá entrada no PS com quadro súbito de ${subjName} associado a sudorese fria.`
                    ]

                    // 2. Exame Físico Rico (Vitals + Findings)
                    const vitals = `PA: ${90 + Math.floor(Math.random() * 60)}/${50 + Math.floor(Math.random() * 40)} mmHg | FC: ${60 + Math.floor(Math.random() * 60)} bpm | FR: ${14 + Math.floor(Math.random() * 20)} irpm | SatO2: ${85 + Math.floor(Math.random() * 14)}%`

                    const physicalExam = [
                        `Mau estado geral, descorad${genderAdj} (3+/4+), desidratad${genderAdj}. ${vitals}. Ausculta pulmonar com estertores crepitantes em bases. Abdome distendido, doloroso à palpação difusa, com descompressão brusca positiva.`,
                        `Estado geral regular, vigil, orientado. ${vitals}. Exame segmentar revela edema de membros inferiores (2+/4+) e turgencia jugular patológica. Ictus cordis desviado para esquerda.`,
                        `Torporoso (Glasgow 10), pupilas isocóricas. ${vitals}. Extremidades frias e perfusão capilar > 3 segundos. Ritmo cardíaco irregular, sem sopros.`
                    ]

                    // 3. Exames Complementares (Labs + Imagem)
                    const labs = `Hb: ${(8 + Math.random() * 6).toFixed(1).replace('.', ',')} g/dL | Leuco: ${4000 + Math.floor(Math.random() * 15000)} | Plq: ${150000 + Math.floor(Math.random() * 200000)} | Cr: ${(0.7 + Math.random() * 2).toFixed(1).replace('.', ',')} | Na: 135 | K: 4.5`

                    // Montagem do Caso Completo
                    // Montagem do Caso Completo
                    const intro = clinicalStart[Math.floor(Math.random() * clinicalStart.length)]
                    const exam = physicalExam[Math.floor(Math.random() * physicalExam.length)]

                    const questionPrompt = [
                        `Diante deste quadro clínico e considerando as diretrizes atuais de ${spec.name}, assinale a alternativa que apresenta o diagnóstico mais provável e a conduta imediata:`,
                        `Qual a estratégia de reperfusão preferencial considerando que o hospital não dispõe de hemodinâmica e o tempo de transporte é superior a 120 minutos?`,
                        `Qual a classe farmacológica de primeira linha para controle sintomático e melhoria de prognóstico a longo prazo?`
                    ][Math.floor(Math.random() * 3)]

                    // Gerar Alternativas Complexas (Diagnóstico + Conduta)
                    const correctOptions = [
                        `Diagnóstico: Infarto Agudo do Miocárdio com Supra de ST; Conduta: Fibrinólise química imediata com Tenecteplase (se sem contraindicações) e posterior transferência.`,
                        `Diagnóstico: Sepse de foco pulmonar; Conduta: Iniciar pacote de 1 hora (cristaloides 30ml/kg + coleta de cultura + antibiótico largo espectro).`,
                        `Diagnóstico: Cetoacidose Diabética; Conduta: Hidratação vigorosa inicial com SF 0,9%, seguida de insulinoterapia venosa após confirmação do Potássio.`
                    ]
                    const distractorOptions = [
                        `Diagnóstico: Angina Instável; Conduta: Estratificação não invasiva em 24h e dupla antiagregação plaquetária.`,
                        `Diagnóstico: Insuficiência Cardíaca Descompensada (Perfil B); Conduta: Diureticoterapia endovenosa e vasodilatador se PA permitir.`,
                        `Diagnóstico: Choque Cardiogênico; Conduta: Dobutamina imediata e restrição volêmica rigorosa.`,
                        `Diagnóstico: Pneumonia Comunitária não grave; Conduta: Tratamento ambulatorial com Amoxicilina + Clavulanato.`,
                        `Diagnóstico: Tromboembolismo Pulmonar; Conduta: Anticoagulação plena com Enoxaparina 1mg/kg 12/12h.`
                    ]

                    const correctAnswer = correctOptions[Math.floor(Math.random() * correctOptions.length)]
                    const allIds = ['a', 'b', 'c', 'd', 'e']
                    const correctIdx = Math.floor(Math.random() * 5)
                    const correctId = allIds[correctIdx]

                    const finalOptions = allIds.map((id, idx) => {
                        if (id === correctId) return { id, text: correctAnswer }
                        // Pegar distradores randomicos sem repetir
                        const wrong = distractorOptions[(idx + Math.floor(Math.random() * distractorOptions.length)) % distractorOptions.length]
                        return { id, text: wrong }
                    })

                    const altExplanations: Record<string, string> = {}
                    allIds.forEach((id) => {
                        if (id === correctId) return
                        altExplanations[id] = `INCORRETA. O quadro descrito (com dados vitais alterados e sinais de gravidade) não condiz com esta hipótese. A conduta proposta seria iatrogênica pois atrasaria o manejo definitivo.`
                    })

                    const question: Question = {
                        id: questionId,
                        course_id: 'medicina',
                        specialty_id: specialty_id,
                        subspecialty_id: subspecialty_id || 'geral',
                        subject_id: subject_id || 'geral',
                        difficulty: (difficulty as 'Fácil' | 'Médio' | 'Difícil') || 'Médio',
                        enunciado: questionPrompt,
                        case_study: {
                            history: intro,
                            physical_exam: exam,
                            lab_results: labs
                        },
                        options: finalOptions,
                        correct_option_id: correctId,
                        explanation: `A alternativa ${correctId.toUpperCase()} está CORRETA.\n\nFUNDAMENTAÇÃO:\nO paciente apresenta sinais claros de instabilidade/gravidade (${vitals}) que corroboram com o diagnóstico de ${subjName} complexo. Segundo a Diretriz Brasileira, a conduta padrão-ouro neste cenário específico é a intervenção imediata descrita na opção correta, visando reduzir morbi-mortalidade. As demais opções subestimam a gravidade ou propõem tratamentos para diagnósticos diferenciais menos prováveis.`,
                        alternative_explanations: altExplanations,
                        blueprint_id,
                        study_box_id,
                        metadata: {
                            origem: 'QRub AI (Revalida Std)',
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
            } catch (err: unknown) {
                console.error('Erro na geração:', err)
                set({ loading: false })
                return {
                    success: false,
                    message: err instanceof Error ? err.message : 'Erro ao gerar questões'
                }
            }
        }
    })
)
