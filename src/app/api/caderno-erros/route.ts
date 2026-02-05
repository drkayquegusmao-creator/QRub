import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const user_id = searchParams.get('user_id')

        if (!user_id) {
            return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json({ error: 'Supabase credentials missing' }, { status: 500 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        // Buscar erros ativos ou em recuperação
        const { data: erros, error } = await supabase
            .from('caderno_erros')
            .select(`
        id,
        questao_id,
        specialty_id,
        status,
        numero_erros,
        ultima_tentativa,
        assuntos (nome),
        questao_base!inner (
           enunciado
        )
      `)
            .eq('user_id', user_id)
            .in('status', ['ATIVO', 'RECUPERACAO']) // Focar nos não consolidados
            .order('ultima_tentativa', { ascending: false })

        if (error) {
            console.error('Erro ao buscar caderno:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // Agrupar por especialidade
        const agrupado: Record<string, any> = {}

        // Importar hierarquia para nomes bonitos
        const { MEDICAL_HIERARCHY } = require('@/lib/medical-specialties')

        erros.forEach((erro: any) => {
            const specId = erro.specialty_id

            if (!agrupado[specId]) {
                const specName = MEDICAL_HIERARCHY[0].specialties.find((s: any) => s.id === specId)?.name || specId
                agrupado[specId] = {
                    id: specId,
                    nome: specName,
                    total: 0,
                    questoes: []
                }
            }

            agrupado[specId].total++
            agrupado[specId].questoes.push({
                id: erro.questao_id, // ID da questão real
                erro_id: erro.id,    // ID do registro de erro
                enunciado: erro.questao_base?.enunciado || 'Enunciado indisponível',
                status: erro.status,
                revisoes: erro.numero_erros,
                data: erro.ultima_tentativa,
                assunto: erro.assuntos?.nome
            })
        })

        return NextResponse.json({
            total_erros: erros.length,
            especialidades: Object.values(agrupado)
        })

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
