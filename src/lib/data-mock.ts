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

export interface Guideline {
    id: string
    specialty_id: string
    name: string
    institution: string
    version: string
    year: number
    status: 'Ativa' | 'Arquivada'
    summary?: string
    key_points?: any
    created_at?: string
}

export interface QuestionMetadata {
    concurso?: string
    cargo?: string
    eixo?: string
    tema?: string
    subtema?: string
    origem?: string
    data_geracao?: string
    quality_score?: number
    scenario_id?: string
}

export interface ExamBlueprint {
    id: string
    name: string
    institution: string
    year: number
    exam_type: 'Residência Médica' | 'Título de Especialista' | 'Prova Nacional' | 'Outras'
    status: 'processing' | 'active' | 'archived'
    raw_pdf_url?: string
    metadata?: {
        total_items?: number
        main_areas?: string[]
    }
    is_course?: boolean // Se true, funciona como um "Curso" (ex: EBSERH, SUS-SP)
    details?: {
        exam_date?: string
        registration_start?: string
        registration_end?: string
        salary?: string
        vacancies?: number
        phases?: string[]
        description?: string
    }
}

export interface StudyBox {
    id: string
    blueprint_id: string
    title: string
    specialty_id: string
    subspecialty_id?: string
    base_text?: string
    keywords?: string[]
    cognitive_level: 'Básico' | 'Intermediário' | 'Avançado'
    charge_profile: 'Clínica' | 'Guideline' | 'Epidemiológica' | 'Técnica'
    weight: number
    status: 'não iniciado' | 'em progresso' | 'concluído'
}

export interface Question {
    id: string
    course_id: string

    // QRUB MASTER Mapping
    area_id: string      // ex: "CM"
    subarea_id: string   // ex: "CM-CARD"
    tema_id: string      // ex: "CM-CARD-IAM"

    // Legacy mapping (keep for compatibility)
    specialty_id: string
    subspecialty_id: string
    subject_id: string

    difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Alta' | 'Média' | 'moderada' | 'dificil'
    enunciado: string
    comando?: string

    case_study?: {
        history: string
        physical_exam: string
        lab_results: string
    }

    options: Option[]
    correct_option_id: string

    explanation: string
    alternative_explanations?: Record<string, string>
    por_que_nao_as_outras?: Record<string, string> | any[] // Supporting both formats

    severe_error_alert?: string
    erros_graves?: string[]

    image_url?: string
    revision_link?: string
    guideline_id?: string
    guideline_version?: string
    references?: string

    tag_transversal?: string[]
    fonte: 'estrutural' | 'importada' | 'ia'
    status_validacao: 'PENDENTE' | 'APROVADA' | 'REPROVADA'
    status?: 'flagged' | 'normal'
    created_at?: string
    metadata?: QuestionMetadata
}

export interface QuestionReport {
    id: string
    user_id: string
    question_id: string
    type: 'ENUNCIADO' | 'GABARITO' | 'EXPLICAÇÃO' | 'OUTRO'
    description: string
    status: 'pending' | 'resolved' | 'dismissed'
    created_at: string
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

export const QUESTIONS: Question[] = []

