/**
 * Plan Validator
 * 
 * Valida limites e permissões baseados no plano do usuário
 */

export type Plan = 'FREE' | 'PREMIUM' | 'INSANO'

export interface PlanLimits {
    max_assuntos_ativos: number
    max_sessoes_por_dia: number
    visoes_calendario: ('DIA' | 'SEMANA' | 'MES')[]
    ajustes_inteligentes: boolean
    suporte_prioritario: boolean
    dr_qrub_mentor: boolean
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
    FREE: {
        max_assuntos_ativos: 3,
        max_sessoes_por_dia: 1,
        visoes_calendario: ['DIA'],
        ajustes_inteligentes: false,
        suporte_prioritario: false,
        dr_qrub_mentor: false
    },
    PREMIUM: {
        max_assuntos_ativos: Infinity,
        max_sessoes_por_dia: 3,
        visoes_calendario: ['DIA', 'SEMANA'],
        ajustes_inteligentes: false,
        suporte_prioritario: false,
        dr_qrub_mentor: false
    },
    INSANO: {
        max_assuntos_ativos: Infinity,
        max_sessoes_por_dia: Infinity,
        visoes_calendario: ['DIA', 'SEMANA', 'MES'],
        ajustes_inteligentes: true,
        suporte_prioritario: true,
        dr_qrub_mentor: true
    }
}

export interface ValidationResult {
    allowed: boolean
    reason?: string
    upgrade_plan?: Plan
}

/**
 * Valida se o usuário pode criar uma nova sessão
 */
export function validateSessionCreation(
    plan: Plan,
    sessoes_hoje: number
): ValidationResult {
    const limits = PLAN_LIMITS[plan]

    if (sessoes_hoje >= limits.max_sessoes_por_dia) {
        return {
            allowed: false,
            reason: `Limite de ${limits.max_sessoes_por_dia} sessão(ões) por dia atingido`,
            upgrade_plan: plan === 'FREE' ? 'PREMIUM' : 'INSANO'
        }
    }

    return { allowed: true }
}

/**
 * Valida se o usuário pode ativar um novo assunto
 */
export function validateSubjectActivation(
    plan: Plan,
    assuntos_ativos: number
): ValidationResult {
    const limits = PLAN_LIMITS[plan]

    if (assuntos_ativos >= limits.max_assuntos_ativos) {
        return {
            allowed: false,
            reason: `Limite de ${limits.max_assuntos_ativos} assuntos ativos atingido`,
            upgrade_plan: 'PREMIUM'
        }
    }

    return { allowed: true }
}

/**
 * Valida se o usuário pode acessar uma visão do calendário
 */
export function validateCalendarView(
    plan: Plan,
    visao: 'DIA' | 'SEMANA' | 'MES'
): ValidationResult {
    const limits = PLAN_LIMITS[plan]

    if (!limits.visoes_calendario.includes(visao)) {
        const upgradePlan = visao === 'SEMANA' ? 'PREMIUM' : 'INSANO'
        return {
            allowed: false,
            reason: `Visão ${visao} disponível apenas no plano ${upgradePlan}`,
            upgrade_plan: upgradePlan
        }
    }

    return { allowed: true }
}

/**
 * Valida se o usuário pode usar ajustes inteligentes
 */
export function validateIntelligentAdjustments(plan: Plan): ValidationResult {
    const limits = PLAN_LIMITS[plan]

    if (!limits.ajustes_inteligentes) {
        return {
            allowed: false,
            reason: 'Ajustes inteligentes disponíveis apenas no plano INSANO',
            upgrade_plan: 'INSANO'
        }
    }

    return { allowed: true }
}

/**
 * Valida se o usuário pode usar o Dr. QRub Mentor
 */
export function validateDrQrubMentor(plan: Plan): ValidationResult {
    const limits = PLAN_LIMITS[plan]

    if (!limits.dr_qrub_mentor) {
        return {
            allowed: false,
            reason: 'Dr. QRub Mentor disponível apenas no plano INSANO',
            upgrade_plan: 'INSANO'
        }
    }

    return { allowed: true }
}

/**
 * Obtém os limites do plano
 */
export function getPlanLimits(plan: Plan): PlanLimits {
    return PLAN_LIMITS[plan]
}

/**
 * Verifica se um plano é superior a outro
 */
export function isPlanUpgrade(from: Plan, to: Plan): boolean {
    const hierarchy: Record<Plan, number> = {
        FREE: 0,
        PREMIUM: 1,
        INSANO: 2
    }

    return hierarchy[to] > hierarchy[from]
}
