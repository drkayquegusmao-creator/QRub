import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * POST /api/sessao/finalizar
 * 
 * Finaliza uma sessão e atualiza todo o progresso do usuário
 * 
 * Body:
 * {
 *   "sessao_id": "uuid",
 *   "respostas": [
 *     { "questao_id": "uuid", "resposta": "a", "tempo_segundos": 45 }
 *   ]
 * }
 * 
 * Retorna:
 * {
 *   "nota": 8.0,
 *   "acertos": 8,
 *   "total": 10,
 *   "nivel_atual": 8.0,
 *   "proxima_revisao": "2026-03-07"
 * }
 */

export async function POST(request: Request) {
    try {
        const { sessao_id, respostas } = await request.json()

        // Validação de entrada
        if (!sessao_id || !respostas || !Array.isArray(respostas)) {
            return NextResponse.json(
                { error: 'Missing required fields: sessao_id, respostas' },
                { status: 400 }
            )
        }

        if (respostas.length !== 10) {
            return NextResponse.json(
                { error: 'Invalid respostas. Must contain exactly 10 answers' },
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

        // 1. Buscar sessão
        const { data: sessao, error: sessaoError } = await supabase
            .from('sessoes')
            .select('*')
            .eq('id', sessao_id)
            .single()

        if (sessaoError || !sessao) {
            return NextResponse.json(
                { error: 'Session not found' },
                { status: 404 }
            )
        }

        if (sessao.status !== 'EM_ANDAMENTO') {
            return NextResponse.json(
                { error: 'Session already finalized or cancelled' },
                { status: 400 }
            )
        }

        // 2. Buscar itens da sessão
        const { data: itens, error: itensError } = await supabase
            .from('sessao_itens')
            .select('*')
            .eq('sessao_id', sessao_id)

        if (itensError || !itens || itens.length !== 10) {
            return NextResponse.json(
                { error: 'Invalid session items' },
                { status: 500 }
            )
        }

        // 3. Buscar questões para verificar respostas corretas
        const questoesIds = itens.map(item => item.questao_id)
        const { data: questoes, error: questoesError } = await supabase
            .from('questao_base')
            .select('id, correct_option_id, specialty_id, subspecialty_id, subject_id, explanation, metadata')
            .in('id', questoesIds)

        if (questoesError || !questoes) {
            return NextResponse.json(
                { error: 'Failed to fetch questions' },
                { status: 500 }
            )
        }

        const questoesMap = new Map(questoes.map(q => [q.id, q.correct_option_id]))

        // 4. Calcular acertos e atualizar itens da sessão
        let totalAcertos = 0
        const respostasMap = new Map(respostas.map(r => [r.questao_id, r]))

        const itensAtualizados = itens.map(item => {
            const resposta = respostasMap.get(item.questao_id)
            const correta = questoesMap.get(item.questao_id)
            const estaCorreta = resposta?.resposta === correta

            if (estaCorreta) totalAcertos++

            return {
                id: item.id,
                questao_id: item.questao_id,
                resposta_usuario: resposta?.resposta || null,
                esta_correta: estaCorreta,
                tempo_resposta_segundos: resposta?.tempo_segundos || null
            }
        })

        // Atualizar itens da sessão
        for (const item of itensAtualizados) {
            await supabase
                .from('sessao_itens')
                .update({
                    resposta_usuario: item.resposta_usuario,
                    esta_correta: item.esta_correta,
                    tempo_resposta_segundos: item.tempo_resposta_segundos
                })
                .eq('id', item.id)
        }

        // 5. Calcular nota (0-10)
        const nota = totalAcertos // Já está de 0 a 10

        // 6. Calcular intervalo de revisão usando a função do banco
        const { data: intervaloData, error: intervaloError } = await supabase
            .rpc('calcular_intervalo_revisao', { nota })

        const intervalo = intervaloData || 7 // Fallback para 7 dias

        // 7. Calcular data da próxima revisão
        const dataProximaRevisao = new Date()
        dataProximaRevisao.setDate(dataProximaRevisao.getDate() + intervalo)

        // 8. Atualizar sessão
        const { error: updateSessaoError } = await supabase
            .from('sessoes')
            .update({
                status: 'FINALIZADA',
                total_acertos: totalAcertos,
                nota: nota,
                finalized_at: new Date().toISOString()
            })
            .eq('id', sessao_id)

        if (updateSessaoError) {
            console.error('Error updating session:', updateSessaoError)
            return NextResponse.json(
                { error: 'Failed to finalize session' },
                { status: 500 }
            )
        }

        // 8.5. Lógica Especial: Resolução de Caderno de Erros
        if (sessao.tipo === 'CADERNO_DE_ERROS') {
            const percentual = (totalAcertos / itens.length) * 100

            if (percentual >= 70) {
                // Sucesso: Resolver erros deste assunto
                await supabase
                    .from('caderno_erros')
                    .update({
                        status: 'resolvido',
                        updated_at: new Date().toISOString()
                    })
                    .eq('user_id', sessao.user_id)
                    .eq('assunto_id', sessao.assunto_id)
                    .eq('status', 'ativo')
            } else {
                // Falha: Manter ativo e agendar para 3 dias (reforço)
                const dataReforco = new Date()
                dataReforco.setDate(dataReforco.getDate() + 3)

                await supabase
                    .from('caderno_erros')
                    .update({
                        proxima_revisao: dataReforco.toISOString(),
                        updated_at: new Date().toISOString()
                    })
                    .eq('user_id', sessao.user_id)
                    .eq('assunto_id', sessao.assunto_id)
                    .eq('status', 'ativo')
            }
        }

        // 9. Atualizar ou criar progresso do assunto
        const { data: progressoExistente } = await supabase
            .from('assunto_progresso')
            .select('*')
            .eq('user_id', sessao.user_id)
            .eq('assunto_id', sessao.assunto_id)
            .single()

        const novoProgresso = {
            user_id: sessao.user_id,
            assunto_id: sessao.assunto_id,
            estado: 'AGUARDANDO_REVISAO',
            nivel_atual: nota,
            ultima_nota: nota,
            total_questoes_respondidas: (progressoExistente?.total_questoes_respondidas || 0) + 10,
            total_acertos: (progressoExistente?.total_acertos || 0) + totalAcertos,
            data_ultima_sessao: new Date().toISOString(),
            data_proxima_revisao: dataProximaRevisao.toISOString(),
            intervalo_dias: intervalo,
            updated_at: new Date().toISOString()
        }

        const { error: progressoError } = await supabase
            .from('assunto_progresso')
            .upsert(novoProgresso, { onConflict: 'user_id,assunto_id' })

        if (progressoError) {
            console.error('Error updating progress:', progressoError)
            return NextResponse.json(
                { error: 'Failed to update progress' },
                { status: 500 }
            )
        }

        // 10. Registrar uso das questões
        const usoQuestoes = itens.map((item, index) => ({
            user_id: sessao.user_id,
            assunto_id: sessao.assunto_id,
            questao_id: item.questao_id,
            foi_usada: true,
            foi_acertada: itensAtualizados[index].esta_correta,
            data_uso: new Date().toISOString(),
            sessao_id: sessao_id
        }))

        const { error: usoError } = await supabase
            .from('questao_uso_usuario')
            .upsert(usoQuestoes, { onConflict: 'user_id,assunto_id,questao_id' })

        if (usoError) {
            console.error('Error registering question usage:', usoError)
        }

        // 11. Processar Caderno de Erros
        const errosParaLogar = []
        for (let i = 0; i < itensAtualizados.length; i++) {
            const item = itensAtualizados[i]
            if (!item.esta_correta) {
                const questaoData = questoes?.find(q => q.id === item.questao_id)
                if (!questaoData) continue

                // Lógica de Classificação Automática
                let tipoDeErro: 'conhecimento' | 'interpretacao' | 'conduta' | 'distracao' = 'conhecimento'
                let gravidade: 'leve' | 'moderado' | 'critico' = 'moderado'

                if (questaoData.metadata?.perfil === 'Especialista') gravidade = 'critico'
                if (item.tempo_resposta_segundos && item.tempo_resposta_segundos < 15) tipoDeErro = 'distracao'

                // Heurística simples: se errou algo que tinha 'conduta' na explicação
                if (questaoData.explanation?.toLowerCase().includes('conduta') ||
                    questaoData.explanation?.toLowerCase().includes('manejo')) {
                    tipoDeErro = 'conduta'
                }

                errosParaLogar.push({
                    user_id: sessao.user_id,
                    questao_id: item.questao_id,
                    specialty_id: questaoData.specialty_id,
                    subspecialty_id: questaoData.subspecialty_id,
                    tema: questaoData.subject_id,
                    assunto_id: sessao.assunto_id,
                    tipo_de_erro: tipoDeErro,
                    alternativa_marcada: item.resposta_usuario,
                    alternativa_correta: questaoData.correct_option_id,
                    justificativa_oficial: questaoData.explanation,
                    nivel_de_gravidade: gravidade,
                    status: 'ativo',
                    data_ultimo_erro: new Date().toISOString()
                })
            }
        }

        if (errosParaLogar.length > 0) {
            for (const erro of errosParaLogar) {
                // Verificar se já existe erro
                const { data: erroExistente } = await supabase
                    .from('caderno_erros')
                    .select('contador_de_repeticao, nivel_de_gravidade')
                    .eq('user_id', erro.user_id)
                    .eq('questao_id', erro.questao_id)
                    .single()

                const repeticao = (erroExistente?.contador_de_repeticao || 0) + 1
                const gravidadeFinal = repeticao > 1 ? 'critico' : erro.nivel_de_gravidade

                // Calcular próxima revisão do erro
                const { data: dataRevisao } = await supabase
                    .rpc('calcular_data_revisao_erro', {
                        gravidade: gravidadeFinal,
                        repeticao
                    })

                await supabase
                    .from('caderno_erros')
                    .upsert({
                        ...erro,
                        contador_de_repeticao: repeticao,
                        nivel_de_gravidade: gravidadeFinal,
                        proxima_revisao: dataRevisao,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id,questao_id' })

                // Integrar com a Agenda (Revisão de Erro)
                if (dataRevisao) {
                    const dataAgendaErro = new Date(dataRevisao).toISOString().split('T')[0]
                    await supabase
                        .from('agenda_revisoes')
                        .upsert({
                            user_id: erro.user_id,
                            assunto_id: erro.assunto_id,
                            data_programada: dataAgendaErro,
                            status: 'PENDENTE',
                            created_at: new Date().toISOString()
                        }, { onConflict: 'user_id,assunto_id,data_programada' })
                }
            }
        }

        // 12. Criar ou atualizar agenda de revisão (Sessão normal)
        const dataAgenda = dataProximaRevisao.toISOString().split('T')[0] // YYYY-MM-DD

        const { error: agendaError } = await supabase
            .from('agenda_revisoes')
            .upsert({
                user_id: sessao.user_id,
                assunto_id: sessao.assunto_id,
                data_programada: dataAgenda,
                status: 'PENDENTE',
                created_at: new Date().toISOString()
            }, { onConflict: 'user_id,assunto_id,data_programada' })

        if (agendaError) {
            console.error('Error creating agenda:', agendaError)
            // Não retornar erro, apenas logar (não é crítico)
        }

        // 12. Retornar resultado
        return NextResponse.json({
            success: true,
            nota: nota,
            acertos: totalAcertos,
            total: 10,
            nivel_atual: nota,
            proxima_revisao: dataAgenda,
            intervalo_dias: intervalo,
            detalhes: {
                sessao_id: sessao_id,
                tipo: sessao.tipo,
                finalizada_em: new Date().toISOString()
            }
        })

    } catch (error) {
        console.error('Error in finalizar sessao:', error)
        return NextResponse.json(
            { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
