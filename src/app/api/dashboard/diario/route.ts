import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * GET /api/dashboard/diario?user_id=uuid
 * 
 * Retorna a priorização diária do usuário:
 * 1. Revisões ATRASADAS
 * 2. Revisões DO DIA
 * 3. Sugestão de novo NIVELAMENTO
 * 
 * Retorna:
 * {
 *   "revisoes_atrasadas": [...],
 *   "revisoes_do_dia": [...],
 *   "sugestao_nivelamento": {...}
 * }
 */

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const user_id = searchParams.get('user_id')

        if (!user_id) {
            return NextResponse.json(
                { error: 'Missing required parameter: user_id' },
                { status: 400 }
            )
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json(
                { error: 'Supabase credentials not configured' },
                { status: 500 }
            )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        const hoje = new Date().toISOString().split('T')[0] // YYYY-MM-DD

        // 1. Buscar revisões ATRASADAS
        const { data: atrasadas, error: atrasadasError } = await supabase
            .from('agenda_revisoes')
            .select(`
        id,
        data_programada,
        assunto_id,
        assuntos (
          id,
          nome,
          specialty_id
        ),
        assunto_progresso (
          nivel_atual,
          ultima_nota
        )
      `)
            .eq('user_id', user_id)
            .eq('status', 'ATRASADA')
            .order('data_programada', { ascending: true })

        if (atrasadasError) {
            console.error('Error fetching atrasadas:', atrasadasError)
        }

        // 2. Buscar revisões DO DIA
        const { data: doDia, error: doDiaError } = await supabase
            .from('agenda_revisoes')
            .select(`
        id,
        data_programada,
        assunto_id,
        assuntos (
          id,
          nome,
          specialty_id
        ),
        assunto_progresso (
          nivel_atual,
          ultima_nota
        )
      `)
            .eq('user_id', user_id)
            .eq('data_programada', hoje)
            .eq('status', 'PENDENTE')
            .order('data_programada', { ascending: true })

        if (doDiaError) {
            console.error('Error fetching do dia:', doDiaError)
        }

        // 3. Buscar assuntos NÃO NIVELADOS (sugestão)
        // Primeiro, buscar todos os assuntos já nivelados
        const { data: progressos } = await supabase
            .from('assunto_progresso')
            .select('assunto_id')
            .eq('user_id', user_id)

        const assuntosNiveladosIds = new Set(progressos?.map(p => p.assunto_id) || [])

        // Buscar todos os assuntos disponíveis
        const { data: todosAssuntos } = await supabase
            .from('assuntos')
            .select('*')
            .order('created_at', { ascending: true })

        // Filtrar assuntos não nivelados
        const assuntosNaoNivelados = todosAssuntos?.filter(a => !assuntosNiveladosIds.has(a.id)) || []

        // Verificar se há questões aprovadas para cada assunto não nivelado
        let sugestaoNivelamento = null

        for (const assunto of assuntosNaoNivelados) {
            const { data: questoes } = await supabase
                .from('questao_base')
                .select('id')
                .eq('specialty_id', assunto.specialty_id)
                .eq('status_validacao', 'APROVADA')
                .limit(10)

            if (questoes && questoes.length >= 10) {
                sugestaoNivelamento = {
                    assunto_id: assunto.id,
                    nome: assunto.nome,
                    specialty_id: assunto.specialty_id,
                    questoes_disponiveis: questoes.length
                }
                break // Pegar apenas o primeiro disponível
            }
        }

        // 4. Formatar resposta
        const revisoesAtrasadas = (atrasadas || []).map(r => {
            const diasAtrasado = Math.floor(
                (new Date().getTime() - new Date(r.data_programada).getTime()) / (1000 * 60 * 60 * 24)
            )
            const assunto = Array.isArray(r.assuntos) ? r.assuntos[0] : r.assuntos
            const progresso = Array.isArray(r.assunto_progresso) ? r.assunto_progresso[0] : r.assunto_progresso

            return {
                agenda_id: r.id,
                assunto_id: r.assunto_id,
                nome: assunto?.nome || 'Assunto desconhecido',
                specialty_id: assunto?.specialty_id,
                data_programada: r.data_programada,
                dias_atrasado: diasAtrasado,
                nivel_atual: progresso?.nivel_atual || 0,
                ultima_nota: progresso?.ultima_nota || 0
            }
        })

        const revisoesDoDia = (doDia || []).map(r => {
            const assunto = Array.isArray(r.assuntos) ? r.assuntos[0] : r.assuntos
            const progresso = Array.isArray(r.assunto_progresso) ? r.assunto_progresso[0] : r.assunto_progresso

            return {
                agenda_id: r.id,
                assunto_id: r.assunto_id,
                nome: assunto?.nome || 'Assunto desconhecido',
                specialty_id: assunto?.specialty_id,
                data_programada: r.data_programada,
                nivel_atual: progresso?.nivel_atual || 0,
                ultima_nota: progresso?.ultima_nota || 0
            }
        })

        return NextResponse.json({
            success: true,
            data_hoje: hoje,
            revisoes_atrasadas: revisoesAtrasadas,
            revisoes_do_dia: revisoesDoDia,
            sugestao_nivelamento: sugestaoNivelamento,
            resumo: {
                total_atrasadas: revisoesAtrasadas.length,
                total_do_dia: revisoesDoDia.length,
                tem_sugestao: !!sugestaoNivelamento
            }
        })

    } catch (error) {
        console.error('Error in dashboard diario:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
