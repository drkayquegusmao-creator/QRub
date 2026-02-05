import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validateSessionCreation } from '@/lib/plan-validator'

/**
 * POST /api/sessao/criar
 * 
 * Cria uma nova sessão de estudo (NIVELAMENTO ou REVISÃO)
 * 
 * Body:
 * {
 *   "user_id": "uuid",
 *   "assunto_id": "uuid",
 *   "tipo": "NIVELAMENTO" | "REVISAO"
 * }
 * 
 * Retorna:
 * {
 *   "sessao_id": "uuid",
 *   "questoes": [{ questao_id, ordem, enunciado, options, ... }]
 * }
 */

export async function POST(request: Request) {
    try {
        const { user_id, assunto_id, tipo } = await request.json()

        // Validação de entrada
        if (!user_id || !assunto_id || !tipo) {
            return NextResponse.json(
                { error: 'Missing required fields: user_id, assunto_id, tipo' },
                { status: 400 }
            )
        }

        if (!['NIVELAMENTO', 'REVISAO'].includes(tipo)) {
            return NextResponse.json(
                { error: 'Invalid tipo. Must be NIVELAMENTO or REVISAO' },
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

        // 1. Validar assunto existe
        const { data: assunto, error: assuntoError } = await supabase
            .from('assuntos')
            .select('*')
            .eq('id', assunto_id)
            .single()

        if (assuntoError || !assunto) {
            return NextResponse.json(
                { error: 'Assunto not found' },
                { status: 404 }
            )
        }

        // 2. Buscar questões APROVADAS do assunto
        const { data: todasQuestoes, error: questoesError } = await supabase
            .from('questao_base')
            .select('*')
            .eq('specialty_id', assunto.specialty_id)
            .eq('status_validacao', 'APROVADA')

        if (questoesError) {
            console.error('Error fetching questions:', questoesError)
            return NextResponse.json(
                { error: 'Failed to fetch questions' },
                { status: 500 }
            )
        }

        if (!todasQuestoes || todasQuestoes.length < 10) {
            return NextResponse.json(
                {
                    error: 'Insufficient questions',
                    message: `Este assunto possui apenas ${todasQuestoes?.length || 0} questões aprovadas. São necessárias pelo menos 10 questões para iniciar uma sessão.`,
                    available: todasQuestoes?.length || 0,
                    required: 10
                },
                { status: 400 }
            )
        }

        // 3. Buscar questões já usadas pelo usuário neste assunto
        const { data: questoesUsadas, error: usadasError } = await supabase
            .from('questao_uso_usuario')
            .select('questao_id')
            .eq('user_id', user_id)
            .eq('assunto_id', assunto_id)

        if (usadasError) {
            console.error('Error fetching used questions:', usadasError)
            return NextResponse.json(
                { error: 'Failed to fetch used questions' },
                { status: 500 }
            )
        }

        const questoesUsadasIds = new Set(questoesUsadas?.map(q => q.questao_id) || [])

        // 4. Aplicar regra anti-repetição
        let questoesDisponiveis = todasQuestoes.filter(q => !questoesUsadasIds.has(q.id))

        // Se não houver 10 questões inéditas, completar com as mais antigas
        if (questoesDisponiveis.length < 10) {
            console.warn(`Only ${questoesDisponiveis.length} unused questions available. Completing with oldest used questions.`)

            // Buscar questões usadas ordenadas por data de uso (mais antigas primeiro)
            const { data: questoesAntigas } = await supabase
                .from('questao_uso_usuario')
                .select('questao_id, data_uso')
                .eq('user_id', user_id)
                .eq('assunto_id', assunto_id)
                .order('data_uso', { ascending: true })
                .limit(10 - questoesDisponiveis.length)

            if (questoesAntigas) {
                const idsAntigas = questoesAntigas.map(q => q.questao_id)
                const questoesComplementares = todasQuestoes.filter(q => idsAntigas.includes(q.id))
                questoesDisponiveis = [...questoesDisponiveis, ...questoesComplementares]
            }
        }

        // Garantir exatamente 10 questões
        const questoesSelecionadas = questoesDisponiveis.slice(0, 10)

        if (questoesSelecionadas.length < 10) {
            return NextResponse.json(
                {
                    error: 'Cannot create session',
                    message: 'Não foi possível selecionar 10 questões válidas para esta sessão.',
                    available: questoesSelecionadas.length
                },
                { status: 400 }
            )
        }

        // 5. Criar sessão
        const { data: sessao, error: sessaoError } = await supabase
            .from('sessoes')
            .insert({
                user_id,
                assunto_id,
                tipo,
                status: 'EM_ANDAMENTO',
                total_questoes: 10,
                total_acertos: 0
            })
            .select()
            .single()

        if (sessaoError || !sessao) {
            console.error('Error creating session:', sessaoError)
            return NextResponse.json(
                { error: 'Failed to create session' },
                { status: 500 }
            )
        }

        // 6. Criar itens da sessão
        const itens = questoesSelecionadas.map((questao, index) => ({
            sessao_id: sessao.id,
            questao_id: questao.id,
            ordem: index + 1
        }))

        const { error: itensError } = await supabase
            .from('sessao_itens')
            .insert(itens)

        if (itensError) {
            console.error('Error creating session items:', itensError)
            // Rollback: deletar sessão criada
            await supabase.from('sessoes').delete().eq('id', sessao.id)
            return NextResponse.json(
                { error: 'Failed to create session items' },
                { status: 500 }
            )
        }

        // 7. Retornar payload para UI
        const questoesPayload = questoesSelecionadas.map((questao, index) => ({
            questao_id: questao.id,
            ordem: index + 1,
            enunciado: questao.enunciado,
            case_study: questao.case_study,
            options: questao.options,
            image_url: questao.image_url,
            difficulty: questao.difficulty
        }))

        return NextResponse.json({
            success: true,
            sessao_id: sessao.id,
            tipo: sessao.tipo,
            assunto: {
                id: assunto.id,
                nome: assunto.nome,
                specialty_id: assunto.specialty_id
            },
            questoes: questoesPayload,
            total_questoes: 10
        })

    } catch (error) {
        console.error('Error in criar sessao:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
