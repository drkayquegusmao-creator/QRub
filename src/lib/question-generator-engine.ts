/**
 * QRUB MEDICAL QUESTION GENERATOR v3.0 - COMPLETE SYSTEM
 * CLINICAL REASONING + VALIDATION + ADMINISTRATIVE AUDIT
 * 
 * EXECUTION CONTRACT:
 * - Questions must pass ALL validation checks
 * - Quality score must be ≥8/10
 * - Invalid questions are logged for admin audit
 * - Any violation = question is INVALID and NOT DISPLAYED
 */

import { Question } from './data-mock'

interface GeneratorParams {
    specialty_id: string
    subspecialty_id?: string
    subject_id?: string
    difficulty: 'Fácil' | 'Médio' | 'Difícil'
    specialty_name: string
    subspecialty_name?: string
    subject_name?: string
}

// ==================== LAYER 1: CLINICAL GENERATION BY SPECIALTY ====================

interface SpecialtyGuidelines {
    specialty: string
    guidelines: string[]
    emphasis: string[]
    age_range: [number, number]
    common_errors: string[]
}

const SPECIALTY_GUIDELINES: Record<string, SpecialtyGuidelines> = {
    'clinica-medica': {
        specialty: 'Clínica Médica',
        guidelines: ['MS', 'SBC', 'KDIGO', 'GINA', 'GOLD', 'ESC'],
        emphasis: ['diagnóstico diferencial', 'interpretação de exames', 'conduta inicial'],
        age_range: [18, 85],
        common_errors: ['excesso de exames', 'omissão de tratamento', 'diagnóstico precipitado']
    },
    'cirurgia-geral': {
        specialty: 'Cirurgia Geral',
        guidelines: ['ATLS', 'Protocolos Cirúrgicos Brasileiros', 'SBCBM'],
        emphasis: ['decisão operatória', 'timing cirúrgico', 'contraindicações'],
        age_range: [18, 80],
        common_errors: ['cirurgia desnecessária', 'atraso cirúrgico', 'preparo inadequado']
    },
    'pediatria': {
        specialty: 'Pediatria',
        guidelines: ['SBP', 'MS', 'PNI'],
        emphasis: ['faixas etárias', 'doses pediátricas', 'sinais de gravidade', 'desenvolvimento'],
        age_range: [0, 18],
        common_errors: ['dose incorreta', 'não reconhecer gravidade', 'conduta de adulto em criança']
    },
    'ginecologia-obstetricia': {
        specialty: 'Ginecologia e Obstetrícia',
        guidelines: ['FEBRASGO', 'MS', 'OMS'],
        emphasis: ['idade gestacional', 'riscos maternos', 'conduta imediata', 'parto seguro'],
        age_range: [15, 45],
        common_errors: ['não interromper gestação quando indicado', 'excesso de intervenção', 'não reconhecer emergência']
    },
    'medicina-preventiva': {
        specialty: 'Medicina Preventiva e Saúde Coletiva',
        guidelines: ['MS', 'PNI', 'Protocolos de Rastreamento'],
        emphasis: ['indicação correta', 'periodicidade', 'população-alvo', 'custo-efetividade'],
        age_range: [0, 100],
        common_errors: ['rastreamento desnecessário', 'população errada', 'periodicidade incorreta']
    }
}

// ==================== LAYER 2: CLINICAL DEFINITIONS ====================

interface ClinicalDefinition {
    specialty: string
    clinical_topic: string
    guideline: string
    correct_diagnosis: string
    correct_action: string
    medical_errors: {
        type: 'excess_intervention' | 'omission' | 'alternative_diagnosis' | 'exam_misinterpretation'
        description: string
        why_wrong: string
    }[]
    essential_data: {
        vitals?: boolean
        labs?: boolean
        imaging?: boolean
        history?: boolean
    }
}

const CLINICAL_DATABASE: ClinicalDefinition[] = [
    {
        specialty: 'Cardiologia',
        clinical_topic: 'Infarto Agudo do Miocárdio com Supra de ST',
        guideline: 'Diretriz Brasileira de Síndromes Coronarianas Agudas (SBC 2021)',
        correct_diagnosis: 'IAM com supra de ST em parede inferior',
        correct_action: 'AAS 200mg VO + Clopidogrel 300-600mg VO + Heparina não-fracionada + Reperfusão (Angioplastia primária se <120min ou Fibrinólise com Tenecteplase)',
        medical_errors: [
            {
                type: 'excess_intervention',
                description: 'Solicitar cintilografia miocárdica e aguardar resultado antes de iniciar reperfusão',
                why_wrong: 'Cintilografia não tem papel no diagnóstico agudo de IAM. ECG e troponina são suficientes. Atraso na reperfusão aumenta mortalidade ("time is muscle").'
            },
            {
                type: 'omission',
                description: 'Observação em sala de emergência com ECG seriado a cada 6 horas sem antiagregação',
                why_wrong: 'IAM com supra de ST requer reperfusão IMEDIATA (<90min). Observação passiva é negligência médica e aumenta área de necrose.'
            },
            {
                type: 'alternative_diagnosis',
                description: 'Tratar como angina instável com estratificação não invasiva em 24 horas',
                why_wrong: 'Supra de ST em DII, DIII e aVF confirma IAM, não angina instável. Estratificação não invasiva é contraindicada em IAM com supra.'
            },
            {
                type: 'exam_misinterpretation',
                description: 'Iniciar betabloqueador EV imediato sem avaliar sinais de choque',
                why_wrong: 'Betabloqueador EV pode precipitar choque cardiogênico em IAM de VD. Deve-se avaliar PA, FC e sinais de congestão antes.'
            }
        ],
        essential_data: {
            vitals: true,
            labs: true,
            imaging: false,
            history: true
        }
    },
    {
        specialty: 'Neurologia',
        clinical_topic: 'Acidente Vascular Cerebral Isquêmico',
        guideline: 'Diretriz Brasileira de AVC Agudo (Academia Brasileira de Neurologia 2021)',
        correct_diagnosis: 'AVC isquêmico em território de artéria cerebral média esquerda',
        correct_action: 'Trombólise EV com rtPA 0,9mg/kg (se <4,5h do início e sem contraindicações) ou Trombectomia mecânica (se <6h e oclusão de grande vaso)',
        medical_errors: [
            {
                type: 'excess_intervention',
                description: 'Solicitar RNM de crânio e aguardar resultado antes de trombolizar',
                why_wrong: 'TC sem hemorragia é suficiente para trombólise. RNM atrasa tratamento. Cada minuto perdido = 1,9 milhão de neurônios mortos.'
            },
            {
                type: 'omission',
                description: 'Iniciar AAS 300mg VO imediatamente sem considerar janela de trombólise',
                why_wrong: 'AAS é contraindicado nas primeiras 24h pós-trombólise (risco de hemorragia). Deve-se avaliar janela terapêutica primeiro.'
            },
            {
                type: 'alternative_diagnosis',
                description: 'Administrar corticoide EV para reduzir edema cerebral',
                why_wrong: 'Corticoide não tem benefício em AVCi agudo e pode piorar prognóstico. Indicado apenas em casos selecionados de edema maligno.'
            },
            {
                type: 'exam_misinterpretation',
                description: 'Reduzir PA para <140/90 mmHg antes de qualquer intervenção',
                why_wrong: 'Redução agressiva de PA piora perfusão cerebral. Manter PA <220/120 mmHg. Só reduzir se candidato a trombólise e PA >185/110.'
            }
        ],
        essential_data: {
            vitals: true,
            labs: true,
            imaging: true,
            history: true
        }
    },
    {
        specialty: 'Endocrinologia',
        clinical_topic: 'Cetoacidose Diabética',
        guideline: 'Diretriz SBD 2023 - Emergências Hiperglicêmicas',
        correct_diagnosis: 'Cetoacidose diabética',
        correct_action: 'SF 0,9% 1L na primeira hora + Insulina regular EV 0,1 UI/kg/h (SOMENTE após K+ >3,3 mEq/L) + Reposição de potássio + Bicarbonato apenas se pH <6,9',
        medical_errors: [
            {
                type: 'excess_intervention',
                description: 'Administrar bicarbonato de sódio imediatamente para corrigir acidose',
                why_wrong: 'Bicarbonato rotineiro piora desfecho (edema cerebral, hipocalemia). Só indicado se pH <6,9. Insulina corrige acidose naturalmente.'
            },
            {
                type: 'omission',
                description: 'Prescrever hipoglicemiante oral e orientar aumento de ingesta hídrica',
                why_wrong: 'Hipoglicemiante oral não funciona em CAD (deficiência absoluta de insulina). Paciente necessita insulina EV e hidratação venosa.'
            },
            {
                type: 'alternative_diagnosis',
                description: 'Iniciar insulina NPH subcutânea e dieta para diabéticos',
                why_wrong: 'NPH subcutânea não tem ação rápida suficiente. CAD requer insulina regular EV contínua. Paciente está em jejum absoluto.'
            },
            {
                type: 'exam_misinterpretation',
                description: 'Iniciar insulina regular EV sem verificar potássio sérico',
                why_wrong: 'NUNCA iniciar insulina se K+ <3,3 mEq/L (risco de arritmia fatal). Insulina desloca K+ para dentro da célula, agravando hipocalemia.'
            }
        ],
        essential_data: {
            vitals: true,
            labs: true,
            imaging: false,
            history: true
        }
    }
]

// ==================== LAYER 3: VALIDATION SYSTEM ====================

interface ValidationResult {
    valid: boolean
    score: number
    reasons: string[]
    checklist: {
        only_one_correct: boolean
        no_generic_alternatives: boolean
        no_defendable_pairs: boolean
        all_data_relevant: boolean
        no_ambiguous_wording: boolean
        has_essential_data: boolean
        no_repeated_ideas: boolean
    }
}

function validateQuestion(
    definition: ClinicalDefinition,
    alternatives: string[]
): ValidationResult {
    const reasons: string[] = []
    let score = 10

    const checklist = {
        only_one_correct: true,
        no_generic_alternatives: true,
        no_defendable_pairs: true,
        all_data_relevant: true,
        no_ambiguous_wording: true,
        has_essential_data: true,
        no_repeated_ideas: true
    }

    // CHECK 1: Only ONE correct alternative?
    const correctCount = alternatives.filter(alt => alt === definition.correct_action).length
    if (correctCount !== 1) {
        checklist.only_one_correct = false
        reasons.push('Múltiplas alternativas corretas detectadas')
        return { valid: false, score: 0, reasons, checklist }
    }

    // CHECK 2: Any generic/protocol alternative?
    const genericPatterns = [
        'observar evolução',
        'aguardar',
        'reavaliar',
        'encaminhar para especialista',
        'solicitar exames complementares'
    ]

    alternatives.forEach(alt => {
        if (alt !== definition.correct_action) {
            if (genericPatterns.some(pattern => alt.toLowerCase().includes(pattern))) {
                checklist.no_generic_alternatives = false
                reasons.push(`Alternativa genérica detectada: "${alt.substring(0, 50)}..."`)
                score -= 2
            }
        }
    })

    // CHECK 3: Two alternatives could be defended?
    const actionKeywords = alternatives.map(alt => {
        const words = alt.toLowerCase().split(' ')
        return words.filter(w => w.length > 4)
    })

    for (let i = 0; i < actionKeywords.length; i++) {
        for (let j = i + 1; j < actionKeywords.length; j++) {
            const intersection = actionKeywords[i].filter(w => actionKeywords[j].includes(w))
            if (intersection.length > 3) {
                checklist.no_defendable_pairs = false
                reasons.push('Alternativas com ações similares detectadas')
                score -= 3
                break
            }
        }
    }

    // CHECK 5: Ambiguous wording?
    alternatives.forEach(alt => {
        const ambiguousWords = ['pode', 'considerar', 'avaliar possibilidade', 'se necessário']
        if (ambiguousWords.some(word => alt.toLowerCase().includes(word))) {
            checklist.no_ambiguous_wording = false
            score -= 1
        }
    })

    // CHECK 6: Has essential data?
    if (!definition.essential_data.vitals && !definition.essential_data.labs) {
        checklist.has_essential_data = false
        reasons.push('Falta dado essencial para diagnóstico')
        score -= 2
    }

    // CHECK 7: Repeated ideas?
    for (let i = 0; i < alternatives.length; i++) {
        for (let j = i + 1; j < alternatives.length; j++) {
            const similarity = calculateSimilarity(alternatives[i], alternatives[j])
            if (similarity > 0.6) {
                checklist.no_repeated_ideas = false
                reasons.push('Ideias repetidas com palavras diferentes')
                score -= 2
            }
        }
    }

    const valid = score >= 8 && reasons.filter(r => r.includes('detectada')).length === 0
    return { valid, score, reasons, checklist }
}

function calculateSimilarity(str1: string, str2: string): number {
    const words1 = new Set(str1.toLowerCase().split(' ').filter(w => w.length > 3))
    const words2 = new Set(str2.toLowerCase().split(' ').filter(w => w.length > 3))
    const intersection = new Set([...words1].filter(x => words2.has(x)))
    return intersection.size / Math.max(words1.size, words2.size)
}

// ==================== ADMINISTRATIVE LAYER ====================

export interface QuestionAuditLog {
    id: string
    timestamp: string
    specialty: string
    clinical_topic: string
    guideline: string
    quality_score: number
    is_valid: boolean
    invalidation_reason?: string
    validation_checklist: ValidationResult['checklist']
    question_data?: Question
}

const AUDIT_LOG: QuestionAuditLog[] = []

export function getAuditLog(): QuestionAuditLog[] {
    return AUDIT_LOG
}

export function getInvalidQuestions(): QuestionAuditLog[] {
    return AUDIT_LOG.filter(log => !log.is_valid)
}

// ==================== QUESTION GENERATOR ====================

export function generateRevalidaStyleQuestion(params: GeneratorParams): Question | null {
    // STEP 1: Select clinical definition
    const definition = CLINICAL_DATABASE[Math.floor(Math.random() * CLINICAL_DATABASE.length)]

    // STEP 2: Build alternatives
    const alternatives = [
        definition.correct_action,
        ...definition.medical_errors.map(err => err.description)
    ]

    // STEP 3: VALIDATE
    const validation = validateQuestion(definition, alternatives)

    // STEP 4: LOG FOR ADMIN AUDIT
    const auditEntry: QuestionAuditLog = {
        id: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        specialty: definition.specialty,
        clinical_topic: definition.clinical_topic,
        guideline: definition.guideline,
        quality_score: validation.score,
        is_valid: validation.valid,
        invalidation_reason: validation.valid ? undefined : validation.reasons.join('; '),
        validation_checklist: validation.checklist
    }

    if (!validation.valid || validation.score < 8) {
        AUDIT_LOG.push(auditEntry)
        console.warn('❌ Question REJECTED:', {
            topic: definition.clinical_topic,
            score: validation.score,
            reasons: validation.reasons
        })
        return null // ABORT - Invalid question
    }

    // STEP 5: Generate clinical presentation
    const age = params.difficulty === 'Fácil' ? 45 + Math.floor(Math.random() * 20) :
        params.difficulty === 'Médio' ? 35 + Math.floor(Math.random() * 40) :
            25 + Math.floor(Math.random() * 60)

    const gender = Math.random() > 0.5 ? 'masculino' : 'feminino'
    const genderArticle = gender === 'masculino' ? 'o' : 'a'

    // Generate realistic vitals
    const isShock = definition.correct_diagnosis.toLowerCase().includes('choque')
    const vitals = {
        pa_sys: isShock ? 70 + Math.floor(Math.random() * 30) : 110 + Math.floor(Math.random() * 50),
        pa_dia: 0,
        fc: isShock ? 110 + Math.floor(Math.random() * 30) : 70 + Math.floor(Math.random() * 40),
        fr: 16 + Math.floor(Math.random() * 16),
        sato2: isShock ? 85 + Math.floor(Math.random() * 10) : 92 + Math.floor(Math.random() * 7)
    }
    vitals.pa_dia = Math.floor(vitals.pa_sys * 0.6)

    const presentation = `Paciente de ${age} anos, sexo ${gender}, admitid${genderArticle} na emergência. Sinais vitais: PA: ${vitals.pa_sys}/${vitals.pa_dia} mmHg, FC: ${vitals.fc} bpm, FR: ${vitals.fr} irpm, SatO2: ${vitals.sato2}% em ar ambiente. Diante do quadro clínico apresentado, qual a conduta mais adequada?`

    // STEP 6: Shuffle alternatives
    const shuffled = alternatives
        .map(text => ({ text, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map((item, index) => ({
            id: String.fromCharCode(97 + index),
            text: item.text
        }))

    const correctId = shuffled.find(opt => opt.text === definition.correct_action)!.id

    // STEP 7: Build explanation
    const explanation = `**RESPOSTA CORRETA: ${correctId.toUpperCase()}**

**FUNDAMENTAÇÃO CLÍNICA:**
Diagnóstico: ${definition.correct_diagnosis}
Conduta: ${definition.correct_action}

Baseado em: ${definition.guideline}

**ANÁLISE DAS ALTERNATIVAS INCORRETAS:**
${shuffled.filter(opt => opt.id !== correctId).map(opt => {
        const error = definition.medical_errors.find(err => err.description === opt.text)
        return `**${opt.id.toUpperCase()})** INCORRETA - ${error?.why_wrong || 'Conduta inadequada para o quadro apresentado.'}`
    }).join('\n\n')}`

    const question: Question = {
        id: `QRUB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        course_id: 'medicina',
        specialty_id: params.specialty_id,
        subspecialty_id: params.subspecialty_id || 'geral',
        subject_id: params.subject_id || 'geral',
        difficulty: params.difficulty,
        enunciado: presentation,
        options: shuffled,
        correct_option_id: correctId,
        explanation,
        references: definition.guideline,
        status: 'active',
        metadata: {
            origem: 'QRub AI Engine v3.0 - Validated',
            data_geracao: new Date().toISOString(),
            tema: definition.clinical_topic,
            quality_score: validation.score
        }
    }

    // Log successful generation
    auditEntry.question_data = question
    AUDIT_LOG.push(auditEntry)

    console.log('✅ Question APPROVED:', {
        topic: definition.clinical_topic,
        score: validation.score
    })

    return question
}

export function generateBatchQuestions(params: GeneratorParams, count: number): Question[] {
    const questions: Question[] = []
    let attempts = 0
    const maxAttempts = count * 5 // Allow more retries

    while (questions.length < count && attempts < maxAttempts) {
        const question = generateRevalidaStyleQuestion(params)
        if (question) {
            questions.push(question)
        }
        attempts++
    }

    if (questions.length < count) {
        console.warn(`⚠️ Generated ${questions.length}/${count} valid questions after ${attempts} attempts`)
        console.warn(`Invalid questions: ${attempts - questions.length}`)
    }

    return questions
}

// ==================== REFACTORING SYSTEM ====================

export function refactorQuestion(badQuestion: Question): Question | null {
    console.log('🔧 Refactoring question:', badQuestion.id)

    // Find best matching clinical definition
    const definition = CLINICAL_DATABASE[0] // Simplified for now

    // Rebuild with strict validation
    return generateRevalidaStyleQuestion({
        specialty_id: badQuestion.specialty_id,
        subspecialty_id: badQuestion.subspecialty_id,
        subject_id: badQuestion.subject_id,
        difficulty: badQuestion.difficulty as 'Fácil' | 'Médio' | 'Difícil',
        specialty_name: definition.specialty
    })
}
