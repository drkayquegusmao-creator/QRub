
import { supabase } from '@/lib/supabase'

export interface AdminUserMetrics {
    total_assuntos: number
    assuntos_nao_nivelados: number
    percentual_nivelado: number
    distribuicao_estado: Record<string, number>
    tempo_medio_nivelamento: number // em dias desde cadastro (aprox)
    tempo_medio_revisoes: number // intervalo medio
}

export async function fetchUserMetrics(userId: string): Promise<AdminUserMetrics> {
    // 1. Fetch Progresso
    const { data: progresso, error } = await supabase
        .from('assunto_progresso')
        .select('*')
        .eq('user_id', userId)

    if (error || !progresso) {
        throw new Error('Erro ao buscar métricas do usuário')
    }

    const total = progresso.length
    const naoNivelados = progresso.filter(p => p.estado_cognitivo === 'NAO_NIVELADO').length
    const nivelados = total - naoNivelados

    // Distribuição
    const dist: Record<string, number> = {
        'NAO_NIVELADO': 0,
        'NIVEL_BAIXO': 0,
        'NIVEL_INTERMEDIARIO': 0,
        'NIVEL_ALTO': 0,
        'DOMINADO': 0
    }

    progresso.forEach(p => {
        const estado = p.estado_cognitivo || 'NAO_NIVELADO'
        dist[estado] = (dist[estado] || 0) + 1
    })

    // Médias
    const intervalos = progresso.map(p => p.intervalo_dias || 0).filter(i => i > 0)
    const mediaIntervalo = intervalos.length > 0
        ? intervalos.reduce((a, b) => a + b, 0) / intervalos.length
        : 0

    return {
        total_assuntos: total,
        assuntos_nao_nivelados: naoNivelados,
        percentual_nivelado: total > 0 ? (nivelados / total) * 100 : 0,
        distribuicao_estado: dist,
        tempo_medio_nivelamento: 0, // Requer dados de 'users.created_at' vs 'data_nivelamento'
        tempo_medio_revisoes: mediaIntervalo
    }
}

export async function fetchGlobalMetrics() {
    // Exemplo de métrica global (Agregada) -> Requer permissão de ADMIN
    // "MÉTRICAS GLOBAIS: % usuários com >30% NÃO_NIVELADO"

    // Isso seria pesado para rodar no client, idealmente seria uma Edge Function ou View Materializada.
    // Vou deixar o esqueleto da lógica.

    /*
    const { data: users } = await supabase.from('users').select('id')
    let riskUsers = 0
    
    for (const u of users || []) {
        const m = await fetchUserMetrics(u.id)
        if ((m.assuntos_nao_nivelados / m.total_assuntos) > 0.3) riskUsers++
    }
    return { risk_users_percentage: (riskUsers / users.length) * 100 }
    */

    return { message: "Calculated via Edge Function (Placeholder)" }
}
