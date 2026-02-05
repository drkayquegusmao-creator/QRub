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
        const body = await request.json()
        const { user_id, tipo } = body
        // 'assunto_id' pode vir ou ser inferido no caso de CADERNO_DE_ERROS
        // 'questoes_ids' opcional para CADERNO_DE_ERROS

        if (!user_id || !tipo) {
            return NextResponse.json({ error: 'Missing user_id or tipo' }, { status: 400 })
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json({ error: 'Supabase credentials not configured' }, { status: 500 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        let questoesSelecionadas: any[] = []
        let assuntoIdFinal = body.assunto_id

        // ------------------------------------------------------------------
        // LÓGICA 1: CADERNO DE ERROS
        // ------------------------------------------------------------------
        if (tipo === 'CADERNO_DE_ERROS') {
            let idsParaBuscar = body.questoes_ids

            // Se não forneceu IDs, buscar erros mais prioritários do usuário
            if (!idsParaBuscar || idsParaBuscar.length === 0) {
                // Buscar do caderno_erros
                const { data: erros } = await supabase
                    .from('caderno_erros')
                    .select('questao_id')
                    .eq('user_id', user_id)
                    .in('status', ['ATIVO', 'RECUPERACAO'])
                    .order('ultima_tentativa', { ascending: true }) // Mais antigos primeiro? Ou mais recentes? Prioridade: ATIVO
                    .limit(10)

                idsParaBuscar = erros?.map(e => e.questao_id) || []
            }

            if (idsParaBuscar.length === 0) {
                return NextResponse.json({
                    error: 'Nenhum erro encontrado',
                    message: 'Parabéns! Seu caderno de erros está vazio.'
                }, { status: 400 })
            }

            // Buscar os detalhes das questões
            const { data: questoes, error: qError } = await supabase
                .from('questao_base')
                .select('*')
                .in('id', idsParaBuscar)

            if (qError || !questoes) {
                return NextResponse.json({ error: 'Falha ao buscar detalhes das questões' }, { status: 500 })
            }

            questoesSelecionadas = questoes

            // Inferir assunto se não veio (pega do primeiro)
            if (!assuntoIdFinal && questoesSelecionadas.length > 0) {
                // Tentar buscar o assunto da primeira questão
                // Mas a questao_base não tem link direto pra assuntos em alguns schemas, tem specialty_id, subject_id (string).
                // Vamos tentar achar um 'assunto' real que bata com o subject_id da questão
                const qSubjectId = questoesSelecionadas[0].subject_id

                // Buscar um assunto com esse tema
                const { data: assuntoRef } = await supabase
                    .from('assuntos')
                    .select('id')
                    .eq('specialty_id', questoesSelecionadas[0].specialty_id)
                    .limit(1)
                    .single()

                if (assuntoRef) {
                    assuntoIdFinal = assuntoRef.id
                } else {
                    // Fallback perigoso se FK for estrita. Vamos criar um erro se não achar.
                    return NextResponse.json({ error: 'Não foi possível vincular a um assunto válido.' }, { status: 400 })
                }
            }

        }
        // ------------------------------------------------------------------
        // LÓGICA 2: NIVELAMENTO / REVISÃO (Padrão SRS)
        // ------------------------------------------------------------------
        else {
            if (!assuntoIdFinal) return NextResponse.json({ error: 'assunto_id required for generic session' }, { status: 400 })

            // 1. Validar assunto existe
            const { data: assunto, error: assuntoError } = await supabase
                .from('assuntos')
                .select('*')
                .eq('id', assuntoIdFinal)
                .single()

            if (assuntoError || !assunto) return NextResponse.json({ error: 'Assunto not found' }, { status: 404 })

            // 2. Buscar questões APROVADAS
            const { data: todasQuestoes } = await supabase
                .from('questao_base')
                .select('*')
                .eq('specialty_id', assunto.specialty_id)
                .eq('status_validacao', 'APROVADA')

            if (!todasQuestoes || todasQuestoes.length < 10) {
                return NextResponse.json({ error: 'Insufficient questions', available: todasQuestoes?.length || 0 }, { status: 400 })
            }

            // 3. Anti-repetição
            const { data: questoesUsadas } = await supabase
                .from('questao_uso_usuario')
                .select('questao_id')
                .eq('user_id', user_id)
                .eq('assunto_id', assuntoIdFinal)

            const questoesUsadasIds = new Set(questoesUsadas?.map(q => q.questao_id) || [])
            let questoesDisponiveis = todasQuestoes.filter(q => !questoesUsadasIds.has(q.id))

            // Fallback
            if (questoesDisponiveis.length < 10) {
                const { data: questoesAntigas } = await supabase
                    .from('questao_uso_usuario')
                    .select('questao_id, data_uso')
                    .eq('user_id', user_id)
                    .eq('assunto_id', assuntoIdFinal)
                    .order('data_uso', { ascending: true })
                    .limit(10 - questoesDisponiveis.length)

                if (questoesAntigas) {
                    const idsAntigas = questoesAntigas.map(q => q.questao_id)
                    const questoesComplementares = todasQuestoes.filter(q => idsAntigas.includes(q.id))
                    questoesDisponiveis = [...questoesDisponiveis, ...questoesComplementares]
                }
            }
            questoesSelecionadas = questoesDisponiveis.slice(0, 10)
        }

        // ------------------------------------------------------------------
        // PASSO COMUM: CRIAR SESSÃO NO BANCO
        // ------------------------------------------------------------------
        if (questoesSelecionadas.length === 0) {
            return NextResponse.json({ error: 'Nenhuma questão selecionada' }, { status: 400 })
        }

        // Criar sessão
        const { data: sessao, error: sessaoError } = await supabase
            .from('sessoes')
            .insert({
                user_id,
                assunto_id: assuntoIdFinal,
                tipo,
                status: 'EM_ANDAMENTO',
                total_questoes: questoesSelecionadas.length,
                total_acertos: 0
            })
            .select()
            .single()

        if (sessaoError) {
            console.error('Error creating session:', sessaoError)
            return NextResponse.json({ error: 'Failed to create session db record' }, { status: 500 })
        }

        // Criar itens
        const itens = questoesSelecionadas.map((questao, index) => ({
            sessao_id: sessao.id,
            questao_id: questao.id,
            ordem: index + 1
        }))

        const { error: itensError } = await supabase.from('sessao_itens').insert(itens)

        if (itensError) {
            await supabase.from('sessoes').delete().eq('id', sessao.id)
            return NextResponse.json({ error: 'Failed to create session items' }, { status: 500 })
        }

        // Retorno
        const questoesPayload = questoesSelecionadas.map((questao, index) => ({
            questao_id: questao.id,
            ordem: index + 1,
            enunciado: questao.enunciado,
            case_study: questao.case_study,
            options: questao.options,
            image_url: questao.image_url,
            difficulty: questao.difficulty,
            explanation: questao.explanation, // Necessário para o feedback imediato
            alternative_explanations: questao.alternative_explanations,
            correct_option_id: questao.correct_option_id
        }))

        return NextResponse.json({
            success: true,
            sessao_id: sessao.id,
            tipo: sessao.tipo,
            assunto_id: assuntoIdFinal,
            questoes: questoesPayload,
            total_questoes: questoesSelecionadas.length
        })

    } catch (error) {
        console.error('Error in criar sessao:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
