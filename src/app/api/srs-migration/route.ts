import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

/**
 * API Helper para executar migrations do sistema SRS
 * 
 * Uso:
 * POST /api/srs-migration
 * Body: { "action": "apply" | "rollback" }
 */

export async function POST(request: Request) {
    try {
        const { action } = await request.json()

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json(
                { error: 'Supabase credentials not configured' },
                { status: 500 }
            )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        if (action === 'apply') {
            // Ler o schema SQL
            const schemaPath = path.join(process.cwd(), 'src', 'lib', 'schema-srs.sql')
            const schemaSql = fs.readFileSync(schemaPath, 'utf-8')

            // Executar o schema
            const { data, error } = await supabase.rpc('exec_sql', {
                sql_query: schemaSql
            })

            if (error) {
                console.error('Error applying SRS schema:', error)
                return NextResponse.json(
                    { error: 'Failed to apply schema', details: error },
                    { status: 500 }
                )
            }

            return NextResponse.json({
                success: true,
                message: 'SRS schema applied successfully',
                tables_created: [
                    'assuntos',
                    'assunto_progresso',
                    'sessoes',
                    'sessao_itens',
                    'questao_uso_usuario',
                    'agenda_revisoes'
                ]
            })
        }

        if (action === 'rollback') {
            // Rollback: dropar todas as tabelas do SRS
            const rollbackSql = `
        DROP TABLE IF EXISTS agenda_revisoes CASCADE;
        DROP TABLE IF EXISTS questao_uso_usuario CASCADE;
        DROP TABLE IF EXISTS sessao_itens CASCADE;
        DROP TABLE IF EXISTS sessoes CASCADE;
        DROP TABLE IF EXISTS assunto_progresso CASCADE;
        DROP TABLE IF EXISTS assuntos CASCADE;
        DROP FUNCTION IF EXISTS atualizar_revisoes_atrasadas();
        DROP FUNCTION IF EXISTS calcular_intervalo_revisao(DECIMAL);
      `

            const { data, error } = await supabase.rpc('exec_sql', {
                sql_query: rollbackSql
            })

            if (error) {
                console.error('Error rolling back SRS schema:', error)
                return NextResponse.json(
                    { error: 'Failed to rollback schema', details: error },
                    { status: 500 }
                )
            }

            return NextResponse.json({
                success: true,
                message: 'SRS schema rolled back successfully'
            })
        }

        return NextResponse.json(
            { error: 'Invalid action. Use "apply" or "rollback"' },
            { status: 400 }
        )

    } catch (error) {
        console.error('SRS Migration error:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
