import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * GET /api/calendario
 * 
 * Retorna o calendário de revisões do usuário
 * 
 * Query params:
 * - user_id: ID do usuário (obrigatório)
 * - visao: 'DIA' | 'SEMANA' | 'MES' (obrigatório)
 * - data_referencia: Data de referência (opcional, padrão: hoje)
 */

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const user_id = searchParams.get('user_id')
        const visao = searchParams.get('visao') as 'DIA' | 'SEMANA' | 'MES'
        const data_referencia = searchParams.get('data_referencia') || new Date().toISOString().split('T')[0]

        if (!user_id) {
            return NextResponse.json(
                { error: 'user_id is required' },
                { status: 400 }
            )
        }

        if (!visao || !['DIA', 'SEMANA', 'MES'].includes(visao)) {
            return NextResponse.json(
                { error: 'visao must be DIA, SEMANA, or MES' },
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

        // Calcular intervalo de datas baseado na visão
        const dataRef = new Date(data_referencia)
        let dataInicio: string
        let dataFim: string

        switch (visao) {
            case 'DIA':
                dataInicio = data_referencia
                dataFim = data_referencia
                break

            case 'SEMANA':
                // Início da semana (domingo)
                const diaSemana = dataRef.getDay()
                const inicioSemana = new Date(dataRef)
                inicioSemana.setDate(dataRef.getDate() - diaSemana)

                // Fim da semana (sábado)
                const fimSemana = new Date(inicioSemana)
                fimSemana.setDate(inicioSemana.getDate() + 6)

                dataInicio = inicioSemana.toISOString().split('T')[0]
                dataFim = fimSemana.toISOString().split('T')[0]
                break

            case 'MES':
                // Primeiro dia do mês
                const inicioMes = new Date(dataRef.getFullYear(), dataRef.getMonth(), 1)

                // Último dia do mês
                const fimMes = new Date(dataRef.getFullYear(), dataRef.getMonth() + 1, 0)

                dataInicio = inicioMes.toISOString().split('T')[0]
                dataFim = fimMes.toISOString().split('T')[0]
                break
        }

        // Buscar revisões no intervalo
        const { data: revisoes, error: revisoesError } = await supabase
            .from('agenda_revisoes')
            .select(`
        id,
        assunto_id,
        data_programada,
        status,
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
            .gte('data_programada', dataInicio)
            .lte('data_programada', dataFim)
            .order('data_programada', { ascending: true })

        if (revisoesError) {
            console.error('Error fetching revisoes:', revisoesError)
            return NextResponse.json(
                { error: 'Failed to fetch revisoes', details: revisoesError },
                { status: 500 }
            )
        }

        // Formatar dados
        const revisoesFormatadas = revisoes?.map(r => {
            const assunto = Array.isArray(r.assuntos) ? r.assuntos[0] : r.assuntos
            const progresso = Array.isArray(r.assunto_progresso) ? r.assunto_progresso[0] : r.assunto_progresso

            return {
                agenda_id: r.id,
                assunto_id: r.assunto_id,
                nome: assunto?.nome || 'Assunto desconhecido',
                specialty_id: assunto?.specialty_id || '',
                data_programada: r.data_programada,
                status: r.status,
                nivel_atual: progresso?.nivel_atual || 0,
                ultima_nota: progresso?.ultima_nota || 0
            }
        }) || []

        // Agrupar por data (para facilitar renderização)
        const porData: Record<string, any[]> = {}
        revisoesFormatadas.forEach(r => {
            if (!porData[r.data_programada]) {
                porData[r.data_programada] = []
            }
            porData[r.data_programada].push(r)
        })

        // Calcular estatísticas
        const totalRevisoes = revisoesFormatadas.length
        const concluidas = revisoesFormatadas.filter(r => r.status === 'CONCLUIDA').length
        const pendentes = revisoesFormatadas.filter(r => r.status === 'PENDENTE').length
        const atrasadas = revisoesFormatadas.filter(r => r.status === 'ATRASADA').length

        return NextResponse.json({
            success: true,
            visao,
            data_referencia,
            periodo: {
                inicio: dataInicio,
                fim: dataFim
            },
            revisoes: revisoesFormatadas,
            por_data: porData,
            estatisticas: {
                total: totalRevisoes,
                concluidas,
                pendentes,
                atrasadas
            }
        })

    } catch (error) {
        console.error('Error in calendario:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
