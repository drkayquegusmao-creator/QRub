import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// RESET TOTAL DOS DADOS DO USUÁRIO
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const userId = body.user_id

        if (!userId) {
            return NextResponse.json({ error: 'Falta user_id no corpo da requisição' }, { status: 400 })
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        // A PRIORI: Precisamos da SERVICE_ROLE_KEY para deletar ignorando RLS
        // Se ela não existir, o reset falhará se o RLS estiver ativo.
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json({ error: 'Supabase não configurado' }, { status: 500 })
        }

        const supabase = createClient(supabaseUrl, supabaseKey)
        const isUsingAnonKey = supabaseKey === process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        // LISTA DE TABELAS PARA LIMPAR (Ordem respeita Constraints de FK)
        const tables = [
            'questao_uso_usuario',
            'sessao_itens',
            'sessoes',
            'user_responses',
            'user_stats_rolling',
            'user_stats_daily',
            'assunto_progresso',
            'subject_progress',
            'agenda_revisoes',
            'caderno_erros'
        ]

        console.log(`Iniciando reset para o usuário ${userId}...`)

        const results = []
        for (const table of tables) {
            const { error } = await supabase.from(table).delete().eq('user_id', userId)
            results.push({ table, error })
            if (error) console.error(`Erro ao deletar de ${table}:`, error)
        }

        const hasErrors = results.some(r => r.error !== null)

        if (hasErrors && isUsingAnonKey) {
            return NextResponse.json({
                error: 'O reset falhou devido a restrições de segurança (RLS). Por favor, adicione o SUPABASE_SERVICE_ROLE_KEY ao seu arquivo .env.local para permitir o reset total.'
            }, { status: 403 })
        }

        // Log opcional
        try {
            await supabase.from('user_metric_resets').insert({
                user_id: userId,
                reason: 'manual_reset',
                created_at: new Date().toISOString()
            })
        } catch (e) { }

        return NextResponse.json({
            success: true,
            message: 'Métricas resetadas com sucesso'
        })

    } catch (err: any) {
        console.error('Reset Metrics Error:', err)
        return NextResponse.json({ error: 'Erro interno ao resetar métricas' }, { status: 500 })
    }
}
