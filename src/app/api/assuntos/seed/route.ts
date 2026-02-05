import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * POST /api/assuntos/seed
 * 
 * Popula a tabela `assuntos` baseado no MEDICAL_HIERARCHY
 * 
 * Body: { "force": true } // Opcional: forçar recriação
 */

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}))
        const force = body.force || false

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json(
                { error: 'Supabase credentials not configured' },
                { status: 500 }
            )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Importar MEDICAL_HIERARCHY
        const { MEDICAL_HIERARCHY } = require('@/lib/medical-specialties')

        if (!MEDICAL_HIERARCHY || !Array.isArray(MEDICAL_HIERARCHY)) {
            return NextResponse.json(
                { error: 'MEDICAL_HIERARCHY not found or invalid' },
                { status: 500 }
            )
        }

        // Verificar se já existem assuntos
        const { data: existentes, error: checkError } = await supabase
            .from('assuntos')
            .select('id')
            .limit(1)

        if (checkError) {
            console.error('Error checking existing assuntos:', checkError)
            return NextResponse.json(
                { error: 'Failed to check existing assuntos' },
                { status: 500 }
            )
        }

        if (existentes && existentes.length > 0 && !force) {
            return NextResponse.json({
                success: false,
                message: 'Assuntos já existem. Use { "force": true } para recriar.',
                existing_count: existentes.length
            })
        }

        // Se force = true, deletar todos os assuntos existentes
        if (force) {
            const { error: deleteError } = await supabase
                .from('assuntos')
                .delete()
                .neq('id', '00000000-0000-0000-0000-000000000000') // Deletar todos

            if (deleteError) {
                console.error('Error deleting existing assuntos:', deleteError)
            }
        }

        // Criar assuntos baseado no MEDICAL_HIERARCHY
        const assuntosParaCriar: any[] = []

        MEDICAL_HIERARCHY.forEach((course: any) => {
            if (course.specialties && Array.isArray(course.specialties)) {
                course.specialties.forEach((specialty: any) => {
                    // Criar assunto para a especialidade principal
                    assuntosParaCriar.push({
                        nome: specialty.name,
                        specialty_id: specialty.id,
                        subspecialty_id: null,
                        tema: null
                    })

                    // Criar assuntos para subespecialidades (se existirem)
                    if (specialty.subspecialties && Array.isArray(specialty.subspecialties)) {
                        specialty.subspecialties.forEach((subspecialty: any) => {
                            assuntosParaCriar.push({
                                nome: `${specialty.name} - ${subspecialty.name}`,
                                specialty_id: specialty.id,
                                subspecialty_id: subspecialty.id,
                                tema: subspecialty.name
                            })
                        })
                    }
                })
            }
        })

        if (assuntosParaCriar.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'Nenhum assunto encontrado no MEDICAL_HIERARCHY'
            })
        }

        // Inserir assuntos no banco
        const { data: assuntosCriados, error: insertError } = await supabase
            .from('assuntos')
            .insert(assuntosParaCriar)
            .select()

        if (insertError) {
            console.error('Error inserting assuntos:', insertError)
            return NextResponse.json(
                { error: 'Failed to insert assuntos', details: insertError },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Assuntos criados com sucesso',
            total_criados: assuntosCriados?.length || 0,
            assuntos: assuntosCriados
        })

    } catch (error) {
        console.error('Error in seed assuntos:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}

/**
 * GET /api/assuntos/seed
 * 
 * Retorna estatísticas dos assuntos
 */
export async function GET() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json(
                { error: 'Supabase credentials not configured' },
                { status: 500 }
            )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        const { data: assuntos, error } = await supabase
            .from('assuntos')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) {
            console.error('Error fetching assuntos:', error)
            return NextResponse.json(
                { error: 'Failed to fetch assuntos' },
                { status: 500 }
            )
        }

        // Agrupar por specialty_id
        const porEspecialidade: Record<string, number> = {}
        assuntos?.forEach(a => {
            porEspecialidade[a.specialty_id] = (porEspecialidade[a.specialty_id] || 0) + 1
        })

        return NextResponse.json({
            success: true,
            total_assuntos: assuntos?.length || 0,
            por_especialidade: porEspecialidade,
            assuntos: assuntos
        })

    } catch (error) {
        console.error('Error in get assuntos:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
