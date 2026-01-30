export interface Subject {
    id: string
    name: string
}

export interface Subspecialty {
    id: string
    name: string
    subjects: Subject[]
}

export interface Specialty {
    id: string
    name: string
    category?: string
    subspecialties: Subspecialty[]
}

export interface Course {
    id: string
    name: string
    specialties: Specialty[]
}

export interface Option {
    id: string
    text: string
}

export interface Question {
    id: string
    course_id: string
    specialty_id: string
    subspecialty_id: string
    subject_id: string
    difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Alta' | 'Média'
    enunciado: string
    case_study?: {
        history: string
        physical_exam: string
        lab_results: string
    }
    options: Option[]
    correct_option_id: string
    explanation: string
    alternative_explanations?: Record<string, string>
    severe_error_alert?: string
    references?: string
    image_url?: string
    revision_link?: string
    hash?: string // Anti-repetição
}

export interface UserResponse {
    id: string
    user_id: string
    question_id: string
    specialty_id: string
    subject_id?: string
    is_correct: boolean
    timestamp: string
}

// Importar estrutura completa de especialidades médicas
import { MEDICAL_HIERARCHY } from './medical-specialties'

// Exportar a estrutura completa
export const COURSES: Course[] = MEDICAL_HIERARCHY

/**
 * Filtra questões do banco de dados baseado nos filtros selecionados
 * @param questions - Array de questões disponíveis
 * @param filters - Filtros de busca (course_id, specialty_id, subspecialty_id, subject_id)
 * @returns Questões filtradas
 */
export function filterQuestions(
    questions: Question[],
    filters: {
        course_id?: string
        specialty_id?: string
        subspecialty_id?: string
        subject_id?: string
    }
): Question[] {
    return questions.filter(q => {
        if (filters.course_id && q.course_id !== filters.course_id) {
            return false
        }

        if (filters.specialty_id && q.specialty_id !== filters.specialty_id) {
            return false
        }

        if (filters.subspecialty_id && q.subspecialty_id !== filters.subspecialty_id) {
            return false
        }

        if (filters.subject_id && q.subject_id !== filters.subject_id) {
            return false
        }

        return true
    })
}

export const QUESTIONS: Question[] = [
    {
        "id": "QRUB-MED-GO-001",
        "course_id": "medicina",
        "specialty_id": "ginecologia-obstetricia",
        "subspecialty_id": "obstetricia-alto-risco",
        "subject_id": "pre-eclampsia",
        "difficulty": "Alta",
        "enunciado": "Primigesta, 32 semanas, refere cefaleia persistente e turvação visual. Antecedente de HAS crônica. PA 170/115 mmHg, edema de membros inferiores (3+/4+), reflexos exaltados. Proteinúria de 24h: 5g. Plaquetas: 90.000/mm³. Creatinina: 1.2 mg/dL.",
        "case_study": {
            "history": "Primigesta, 32 semanas, refere cefaleia persistente e turvação visual. Antecedente de HAS crônica.",
            "physical_exam": "PA 170/115 mmHg, edema de membros inferiores (3+/4+), reflexos exaltados.",
            "lab_results": "Proteinúria de 24h: 5g. Plaquetas: 90.000/mm³. Creatinina: 1.2 mg/dL."
        },
        "options": [
            { "id": "a", "text": "Aguardar 37 semanas for interrupção da gestação." },
            { "id": "b", "text": "Iniciar Sulfato de Magnésio e planejar interrupção após estabilização." },
            { "id": "c", "text": "Administrar apenas Hidralazina e dar alta para pré-natal de alto risco." },
            { "id": "d", "text": "Realizar cesariana imediata sem necessidade de magnésio." },
            { "id": "e", "text": "Iniciar apenas corticoterapia para maturação pulmonar e reavaliar em 1 semana." }
        ],
        "correct_option_id": "b",
        "explanation": "Paciente apresenta critérios de gravidade (PA > 160/110, plaquetopenia, iminência de eclâmpsia). A conduta imediata é a prevenção de crises convulsivas com Sulfato de Magnésio.",
        "references": "Protocolos FEBRASGO / Ministério da Saúde.",
        "revision_link": "https://www.febrasgo.org.br/pt/noticias/item/425-pre-eclampsia",
        "image_url": "https://images.unsplash.com/photo-1576091160550-2173599211d0?auto=format&fit=crop&q=80&w=400"
    },
    {
        "id": "QRUB-MED-CM-002",
        "course_id": "medicina",
        "specialty_id": "clinica-medica",
        "subspecialty_id": "endocrinologia",
        "subject_id": "cetoacidose",
        "difficulty": "Média",
        "enunciado": "Paciente, 19 anos, DM1, chega com hálito cetônico, dor abdominal e vômitos há 12h. Desidratado, respiração de Kussmaul. Glicemia capilar: 450 mg/dL. pH arterial: 7.1, HCO3: 12 mEq/L, Cetonúria positiva (4+).",
        "case_study": {
            "history": "Paciente, 19 anos, DM1, chega com hálito cetônico, dor abdominal e vômitos há 12h.",
            "physical_exam": "Desidratado, respiração de Kussmaul. Glicemia capilar: 450 mg/dL.",
            "lab_results": "pH arterial: 7.1, HCO3: 12 mEq/L, Cetonúria positiva (4+)."
        },
        "options": [
            { "id": "a", "text": "Bicarbonato de sódio IV imediato para todos os pacientes com pH < 7.2." },
            { "id": "b", "text": "Insulina SC em bólus e hidratação oral." },
            { "id": "c", "text": "Expansão volêmica vigorosa with SF 0,9% and insulinoterapia IV contínua (0,1 UI/kg/h)." },
            { "id": "d", "text": "Apenas observação e dieta zero." },
            { "id": "e", "text": "Insulina NPH IM e potássio via oral." }
        ],
        "correct_option_id": "c",
        "explanation": "O pilar do tratamento da cetoacidose diabética é a reposição volêmica e a insulinoterapia endovenosa contínua para bloquear a cetogênese.",
        "references": "Diretrizes Sociedade Brasileira de Diabetes (SBD).",
        "revision_link": "https://www.diabetes.org.br/profissionais/diretrizes-sbd",
        "image_url": "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=400"
    }
]
