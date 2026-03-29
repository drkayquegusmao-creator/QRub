export type SRSTaskStatus = 'novo' | 'em_revisao' | 'em_risco'

export interface SRSProfile {
    forca_memoria: number
    sequencia_acertos: number
    sequencia_erros: number
    intervalo_dias: number
    facilidade: number
    repeticoes: number
    status: SRSTaskStatus
}

/**
 * Calcula a próxima fase de revisão espaçada com base na resposta do aluno.
 * Segue estritamente as regras de negócio "Menos questões, mais retenção".
 */
export function calculateNextSRSInterval(
    current: SRSProfile,
    action: 'errei' | 'dificil' | 'acertei'
): SRSProfile {
    let { 
        forca_memoria, 
        sequencia_acertos, 
        sequencia_erros, 
        intervalo_dias, 
        facilidade, 
        repeticoes, 
        status 
    } = current

    if (action === 'errei') {
        intervalo_dias = 1
        repeticoes = 0
        forca_memoria = Math.max(0, forca_memoria - 25)
        sequencia_erros += 1
        sequencia_acertos = 0
        status = 'em_risco'
    } 
    else if (action === 'dificil') {
        intervalo_dias = Math.max(1, intervalo_dias + 1)
        forca_memoria = Math.min(100, forca_memoria + 5)
        sequencia_acertos += 1
        sequencia_erros = 0
        // Condição para sair do risco
        status = forca_memoria < 40 ? 'em_risco' : 'em_revisao'
    }
    else if (action === 'acertei') {
        repeticoes += 1
        sequencia_acertos += 1
        sequencia_erros = 0
        forca_memoria = Math.min(100, forca_memoria + 15)
        
        // O Fator de Domínio acelera o intervalo se o aluno está em boa sequência
        const fatorDominio = 1 + (sequencia_acertos * 0.3)
        
        if (intervalo_dias === 0) {
            intervalo_dias = 1
        } else {
            intervalo_dias = Math.round(intervalo_dias * facilidade * fatorDominio)
        }

        // Tabela de Progressão Obrigatória
        if (sequencia_acertos === 1 && intervalo_dias < 2) intervalo_dias = 2
        else if (sequencia_acertos === 2 && intervalo_dias < 5) intervalo_dias = 5
        else if (sequencia_acertos === 3 && intervalo_dias < 10) intervalo_dias = 10
        else if (sequencia_acertos === 4 && intervalo_dias < 20) intervalo_dias = 20
        else if (sequencia_acertos >= 5 && intervalo_dias < 30) intervalo_dias = 30

        status = forca_memoria < 40 ? 'em_risco' : 'em_revisao'
    }

    // Regra adicional: se errar 3 vezes seguidas entra em modo extremo de risco
    if (sequencia_erros >= 3) {
        status = 'em_risco'
    }

    return {
        forca_memoria,
        sequencia_acertos,
        sequencia_erros,
        intervalo_dias,
        facilidade,
        repeticoes,
        status
    }
}

/**
 * Retorna a Data ISO exata para a próxima revisão baseada nos intervalos calculados.
 */
export function getNextReviewDate(intervalDays: number): string {
    const nextDate = new Date()
    nextDate.setDate(nextDate.getDate() + intervalDays)
    return nextDate.toISOString()
}
