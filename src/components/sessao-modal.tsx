
"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, XCircle, Trophy, CheckCircle2, Calendar } from 'lucide-react'
import { QuestionText } from '@/components/question-typography'
import { useAuth } from '@/store/use-auth'
import { supabase } from '@/lib/supabase'
import { MEDICAL_HIERARCHY } from '@/lib/medical-specialties'
import srsRules from '@/lib/srs-rules.json'

interface SessaoModalProps {
    isOpen: boolean
    onClose: () => void
    assunto_id: string
    tipo: 'NIVELAMENTO' | 'REVISAO' | 'CADERNO_ERROS'
    onComplete?: () => void
}

interface Questao {
    questao_id: string
    ordem: number
    enunciado: string
    comando?: string
    options: Array<{ id: string; text: string }>
    image_url?: string
    difficulty?: string
}

interface SessaoData {
    sessao_id: string
    tipo: string
    assunto: {
        id: string
        nome: string
        specialty_id: string
    }
    questoes: Questao[]
    total_questoes: number
}

interface Resposta {
    questao_id: string
    resposta: string
    tempo_segundos: number
}

export function SessaoModal({ isOpen, onClose, assunto_id, tipo, onComplete }: SessaoModalProps) {
    const { user } = useAuth()
    const [sessao, setSessao] = useState<SessaoData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [questaoAtual, setQuestaoAtual] = useState(0)
    const [respostas, setRespostas] = useState<Resposta[]>([])
    const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null)
    const [tempoInicio, setTempoInicio] = useState<number>(Date.now())

    const [finalizando, setFinalizando] = useState(false)
    const [resultado, setResultado] = useState<any>(null)
    const [fontSize, setFontSize] = useState(18) // base font size in px

    // Criar sessão ao abrir modal
    useEffect(() => {
        if (!isOpen || !user?.id) return

        const criarSessaoLocal = async () => {
            try {
                setLoading(true)
                setError(null)

                // 1. Buscar detalhes do assunto
                let assunto = null

                // Helper to search in a hierarchy tree
                const findSubject = (nodes: any[]) => {
                    for (const node of nodes) {
                        if (node.id === assunto_id) return { id: node.id, nome: node.name, specialty_id: node.id } // If it's a specialty itself

                        if (node.subspecialties) {
                            for (const sub of node.subspecialties) {
                                if (sub.id === assunto_id) return { id: sub.id, nome: sub.name, specialty_id: node.id }
                                if (sub.subjects) {
                                    for (const subj of sub.subjects) {
                                        if (subj.id === assunto_id) return { id: subj.id, nome: subj.name, specialty_id: node.id }
                                    }
                                }
                            }
                        } else if (node.subjects) { // In case structure varies or flat list
                            for (const subj of node.subjects) {
                                if (subj.id === assunto_id) return { id: subj.id, nome: subj.name, specialty_id: node.id }
                            }
                        }
                    }
                    return null
                }

                // Try Dynamic Taxonomy first
                try {
                    const { useSRS } = await import('@/store/use-srs')
                    const { taxonomy } = useSRS.getState()
                    if (taxonomy && taxonomy.length > 0 && taxonomy[0].specialties) {
                        assunto = findSubject(taxonomy[0].specialties)
                    }
                } catch (e) { console.warn('SRS Taxonomy not available', e) }

                // Fallback to Static
                if (!assunto) {
                    const { MEDICAL_HIERARCHY } = await import('@/lib/medical-specialties')
                    assunto = findSubject(MEDICAL_HIERARCHY[0].specialties)
                }

                if (!assunto) {
                    // Final fallback: fetch from taxonomia table directly if not found in tree
                    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(assunto_id)
                    let taxNode = null

                    if (isUUID) {
                        const { data } = await supabase.from('taxonomia').select('id, name, slug, parent_id, level').eq('id', assunto_id).single()
                        taxNode = data
                    } else {
                        const { data } = await supabase.from('taxonomia').select('id, name, slug, parent_id, level').eq('slug', assunto_id).single()
                        taxNode = data
                    }

                    if (taxNode) {
                        // Use SLUG for specialty_id as questions use slugs
                        assunto = { id: taxNode.id, nome: taxNode.name, specialty_id: taxNode.slug || taxNode.id }
                    } else {
                        assunto = { id: assunto_id, nome: 'Assunto Desconhecido', specialty_id: assunto_id }
                    }
                }

                // 2. Buscar questoes COMPATÍVEIS e ANTI-REPETIÇÃO
                let pool: any[] = []

                // SPECIALTY MAPPING LOGIC (Must match use-questions.ts)
                const REAL_SPECIALTIES_MAPPED_AS_SUBS = [
                    'cardiologia', 'endocrinologia', 'gastroenterologia', 'geriatria',
                    'hematologia', 'infectologia', 'nefrologia', 'pneumologia',
                    'reumatologia', 'oncologia-clinica'
                ]

                let targetIds: string[] = [assunto.specialty_id]

                // Se o assunto é uma subespecialidade mapeada como especialidade
                if (REAL_SPECIALTIES_MAPPED_AS_SUBS.includes(assunto.specialty_id)) {
                    targetIds = [assunto.specialty_id]
                }

                // Se o assunto é Clínica Médica, expandir (slug é 'clinica-medica')
                if (assunto.specialty_id === 'clinica-medica' || assunto.id === 'clinica-medica') {
                    targetIds.push(...REAL_SPECIALTIES_MAPPED_AS_SUBS)
                }

                if (tipo === 'CADERNO_ERROS') {
                    // Buscar apenas questões com status ATIVA ou EM_RECUPERACAO no caderno
                    const { data: erros } = await supabase
                        .from('caderno_erros')
                        .select('questao_id')
                        .eq('user_id', user.id)
                        .in('assunto_id', targetIds) // Use expanded list
                        .in('status', ['ativo', 'em_revisao'])
                        .limit(20)

                    if (!erros || erros.length === 0) {
                        throw new Error('Não há erros ativos para este assunto. Ótimo trabalho!')
                    }

                    const erroIds = erros.map(e => e.questao_id)

                    // Fetch das questões reais
                    const { data: qData } = await supabase
                        .from('questao_base')
                        .select('*')
                        .in('id', erroIds)

                    pool = qData || []
                } else {
                    // NIVELAMENTO ou REVISAO (Inéditas)
                    const { data: usadas } = await supabase
                        .from('questao_uso_usuario')
                        .select('questao_id')
                        .eq('user_id', user.id)
                        .in('assunto_id', targetIds)

                    const usadasIds = new Set(usadas?.map(u => u.questao_id) || [])

                    // Build dynamic query
                    let query = supabase.from('questao_base').select('*').eq('status_validacao', 'APROVADA')

                    if (targetIds.length > 1) {
                        // Multi-specialty case (e.g. Clinica Medica expansion)
                        query = query.in('specialty_id', targetIds)
                    } else if (REAL_SPECIALTIES_MAPPED_AS_SUBS.includes(assunto.specialty_id)) {
                        // Direct Specialty Case (e.g Pneumologia)
                        query = query.eq('specialty_id', assunto.specialty_id)
                    } else {
                        // Standard fallback
                        const slug = assunto.specialty_id
                        query = query.or(`subject_id.eq."${slug}",subspecialty_id.eq."${slug}",specialty_id.eq."${slug}"`)
                    }

                    const { data: qData, error: qError } = await query.limit(200)

                    if (qError) throw qError

                    // Prioritize specific matches (subject > subspecialty > specialty)
                    const specificPool = qData?.filter(q =>
                        q.subject_id === assunto.id ||
                        q.subspecialty_id === assunto.id ||
                        q.specialty_id === assunto.id
                    ) || []

                    const finalData = specificPool.length > 0 ? specificPool : (qData || [])

                    if (finalData.length === 0) {
                        throw new Error('Nenhuma questão aprovada encontrada para este assunto.')
                    }

                    pool = finalData.filter(q => !usadasIds.has(q.id))

                    if (pool.length < 5) {
                        const usadasDisponiveis = finalData.filter(q => usadasIds.has(q.id))
                        pool = [...pool, ...usadasDisponiveis]
                    }
                }

                if (pool.length < 1) {
                    throw new Error(`Questões insuficientes para iniciar a sessão (${pool.length}).`)
                }

                // E. Selecionar 10 (ou todas se < 10)
                const targetCount = Math.min(10, pool.length)

                // SHUFFLE: Randomize order to ensure unique sessions every time
                // Fisher-Yates shuffle is better, but simple sort works for small pools.
                // We shuffle the ENTIRE pool first, then take the first N.
                const shuffled = pool
                    .map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
                    .slice(0, targetCount)

                // 3. Criar Sessão
                const { data: novaSessao, error: sError } = await supabase
                    .from('sessoes')
                    .insert({
                        user_id: user.id,
                        assunto_id: assunto.id,
                        tipo: tipo,
                        status: 'EM_ANDAMENTO',
                        total_questoes: shuffled.length,
                        total_acertos: 0
                    })
                    .select()
                    .single()

                if (sError) throw sError

                // 4. Criar Itens
                const itens = shuffled.map((q, i) => ({
                    sessao_id: novaSessao.id,
                    user_id: user.id,
                    questao_id: q.id,
                    ordem: i + 1
                }))

                const { error: itensError } = await supabase.from('sessao_itens').insert(itens)
                if (itensError) throw itensError

                // 5. Montar Objeto Sessao
                setSessao({
                    sessao_id: novaSessao.id,
                    tipo: tipo,
                    assunto: assunto,
                    total_questoes: shuffled.length,
                    questoes: shuffled.map((q, i) => ({
                        questao_id: q.id,
                        ordem: i + 1,
                        enunciado: q.enunciado || q.statement || 'Enunciado indisponível',
                        comando: q.comando || null,
                        options: Array.isArray(q.alternatives) ? q.alternatives : (q.options || []),
                        image_url: q.image_url
                    }))
                })
                setTempoInicio(Date.now())

            } catch (err: any) {
                console.error('Error creating session:', err)
                setError(err.message || 'Erro ao criar sessão. Verifique sua conexão.')
            } finally {
                setLoading(false)
            }
        }

        criarSessaoLocal()
    }, [isOpen, user?.id, assunto_id, tipo])

    const handleResponder = async () => {
        if (!respostaSelecionada || !sessao) return

        const tempoDecorrido = Math.floor((Date.now() - tempoInicio) / 1000)
        const questao = sessao.questoes[questaoAtual]

        const novaResposta: Resposta = {
            questao_id: questao.questao_id,
            resposta: respostaSelecionada,
            tempo_segundos: tempoDecorrido
        }

        // 🟢 REAL-TIME SYNC (For Admin Insights)
        try {
            // Heartbeat user activity
            if (user?.id) {
                supabase.from('users').update({ updated_at: new Date().toISOString() }).eq('id', user.id).then()
            }

            // Save item response
            supabase.from('sessao_itens')
                .update({
                    resposta_usuario: respostaSelecionada,
                    tempo_resposta_segundos: tempoDecorrido
                })
                .eq('sessao_id', sessao.sessao_id)
                .eq('questao_id', questao.questao_id)
                .then()
        } catch (e) { /* silent fail for real-time */ }

        setRespostas([...respostas, novaResposta])
        setRespostaSelecionada(null)

        // Próxima questão ou finalizar
        if (questaoAtual < sessao.questoes.length - 1) {
            setQuestaoAtual(questaoAtual + 1)
            setTempoInicio(Date.now())
        } else {
            finalizarSessaoLocal([...respostas, novaResposta])
        }
    }

    const finalizarSessaoLocal = async (todasRespostas: Resposta[]) => {
        if (!sessao || !user?.id) return

        try {
            setFinalizando(true)

            // 1. Buscar respostas corretas (Gabarito)
            const qIds = todasRespostas.map(r => r.questao_id)
            const { data: qCorretas } = await supabase
                .from('questao_base')
                .select('id, correct_option_id')
                .in('id', qIds)

            const gabarito = new Map(qCorretas?.map(q => [q.id, q.correct_option_id]))

            // 2. Buscar Erros Existentes (Para transição de status)
            const { data: errosExistentes } = await supabase
                .from('caderno_erros')
                .select('questao_id, status, contador_de_repeticao')
                .eq('user_id', user.id)
                .in('questao_id', qIds)

            const errosMap = new Map(errosExistentes?.map(e => [e.questao_id, e]))

            // 3. Processar Resultados e Preparar Updates
            let acertos = 0
            const updatesCaderno: any[] = []

            // Fetch itens IDs para update da sessão
            const { data: itensDb } = await supabase
                .from('sessao_itens')
                .select('id, questao_id')
                .eq('sessao_id', sessao.sessao_id)

            const itensMap = new Map(itensDb?.map(i => [i.questao_id, i.id]))

            for (const resp of todasRespostas) {
                const correta = gabarito.get(resp.questao_id)
                const isCorrect = String(correta) === String(resp.resposta)

                if (isCorrect) acertos++

                // A. Atualizar Item da Sessão
                const itemId = itensMap.get(resp.questao_id)
                if (itemId) {
                    await supabase.from('sessao_itens').update({
                        resposta_usuario: resp.resposta,
                        esta_correta: isCorrect,
                        tempo_resposta_segundos: resp.tempo_segundos
                    }).eq('id', itemId)
                }

                // B. Atualizar Uso (Anti-Repetição)
                await supabase.from('questao_uso_usuario').upsert({
                    user_id: user.id,
                    assunto_id: sessao.assunto.id,
                    questao_id: resp.questao_id,
                    foi_usada: true,
                    foi_acertada: isCorrect,
                    data_uso: new Date().toISOString(),
                    sessao_id: sessao.sessao_id
                }, { onConflict: 'user_id,assunto_id,questao_id' })

                // C. Lógica do CADERNO DE ERROS (Orquestração)
                const erroAntigo = errosMap.get(resp.questao_id)

                if (!isCorrect) {
                    updatesCaderno.push({
                        user_id: user.id,
                        questao_id: resp.questao_id,
                        assunto_id: sessao.assunto.id,
                        status: 'ativo',
                        contador_de_repeticao: (erroAntigo?.contador_de_repeticao || 0) + 1,
                        ultima_interacao: new Date().toISOString()
                    })
                } else if (isCorrect && erroAntigo) {
                    let novoStatus = erroAntigo.status
                    if (erroAntigo.status === 'ativo') novoStatus = 'em_revisao'
                    else if (erroAntigo.status === 'em_revisao') novoStatus = 'resolvido'

                    updatesCaderno.push({
                        user_id: user.id,
                        questao_id: resp.questao_id,
                        assunto_id: sessao.assunto.id,
                        status: novoStatus,
                        contador_de_repeticao: erroAntigo.contador_de_repeticao,
                        ultima_interacao: new Date().toISOString()
                    })
                }
            }

            // Aplicar updates no Caderno de Erros (Serial)
            for (const upsert of updatesCaderno) {
                await supabase.from('caderno_erros').upsert(upsert, { onConflict: 'user_id, questao_id' })
            }

            // 4. Verificar Estado Geral do Assunto (Pós-Sessão)
            const { count: countErrosAtivos } = await supabase
                .from('caderno_erros')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .eq('status', 'ativo')

            const temErrosAtivos = (countErrosAtivos || 0) > 0

            // 5. LÓGICA DE NIVELAMENTO E REGULADOR SRS
            const percentual = Math.round((acertos / sessao.total_questoes) * 100)
            const nota = Math.round((acertos / sessao.total_questoes) * 10)

            let estadoCognitivo = 'NAO_NIVELADO'
            let intervalo = 3 // Default
            let dataNivelamento = null

            // REGRA 3: Nivelamento
            if (sessao.tipo === 'NIVELAMENTO') {
                if (percentual <= 39) estadoCognitivo = 'NIVEL_BAIXO'
                else if (percentual <= 69) estadoCognitivo = 'NIVEL_INTERMEDIARIO'
                else if (percentual <= 89) estadoCognitivo = 'NIVEL_ALTO'
                else estadoCognitivo = 'DOMINADO'

                dataNivelamento = new Date().toISOString()

                // REGRA 4: Intervalos Iniciais via JSON
                // @ts-ignore
                intervalo = srsRules.srs_parametros.intervalos_iniciais[estadoCognitivo] || 4
            } else {
                // REVISÃO: Mantém estado, apenas agenga próxima
                // SRS Base Padrão via JSON
                if (nota <= 3) intervalo = srsRules.srs_parametros.intervalos_revisao.nota_0_3
                else if (nota <= 5) intervalo = srsRules.srs_parametros.intervalos_revisao.nota_4_5
                else if (nota <= 7) intervalo = srsRules.srs_parametros.intervalos_revisao.nota_6_7
                else if (nota <= 9) intervalo = srsRules.srs_parametros.intervalos_revisao.nota_8_9
                else if (nota === 10) intervalo = srsRules.srs_parametros.intervalos_revisao.nota_10

                const { data: currentProg } = await supabase
                    .from('assunto_progresso')
                    .select('estado_cognitivo, data_nivelamento')
                    .eq('user_id', user.id)
                    .eq('assunto_id', sessao.assunto.id)
                    .single()

                estadoCognitivo = currentProg?.estado_cognitivo || 'NIVEL_INTERMEDIARIO'
                dataNivelamento = currentProg?.data_nivelamento
            }

            // PENALIDADE: Se houver erros ativos
            if (temErrosAtivos) {
                intervalo = Math.min(intervalo, srsRules.srs_parametros.penalidades.erro_ativo_teto)
            }

            const dataProxima = new Date()
            dataProxima.setDate(dataProxima.getDate() + intervalo)
            const dataProximaStr = dataProxima.toISOString().split('T')[0]

            // 6. Fechar Sessão
            await supabase.from('sessoes').update({
                status: 'FINALIZADA',
                total_acertos: acertos,
                nota: nota,
                finalized_at: new Date().toISOString()
            }).eq('id', sessao.sessao_id)

            // 7. Atualizar Progresso
            const { data: progAnt } = await supabase
                .from('assunto_progresso')
                .select('total_questoes_respondidas, total_acertos')
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .single()

            const totalQ = (progAnt?.total_questoes_respondidas || 0) + sessao.total_questoes
            const totalA = (progAnt?.total_acertos || 0) + acertos

            const updateData: any = {
                user_id: user.id,
                assunto_id: sessao.assunto.id,
                estado_cognitivo: estadoCognitivo,
                percentual_acerto: percentual, // Armazena último percentual da sessão
                ultima_nota: nota,
                total_questoes_respondidas: totalQ,
                total_acertos: totalA,
                data_ultima_sessao: new Date().toISOString(),
                data_proxima_revisao: dataProxima.toISOString(),
                intervalo_dias: intervalo,
                updated_at: new Date().toISOString(),
                ultima_interacao: new Date().toISOString()
            }

            if (dataNivelamento) {
                updateData.data_nivelamento = dataNivelamento
            }

            await supabase.from('assunto_progresso').upsert(updateData, { onConflict: 'user_id,assunto_id' })

            // 8. Atualizar Agenda
            await supabase.from('agenda_revisoes')
                .delete()
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .eq('status', 'PENDENTE')

            // Agenda próxima revisão se NÃO for NAO_NIVELADO (redundância)
            if (estadoCognitivo !== 'NAO_NIVELADO') {
                await supabase.from('agenda_revisoes').insert({
                    user_id: user.id,
                    assunto_id: sessao.assunto.id,
                    data_programada: dataProximaStr,
                    status: 'PENDENTE'
                })
            }

            await supabase.from('agenda_revisoes')
                .update({ status: 'REALIZADA' })
                .eq('user_id', user.id)
                .eq('assunto_id', sessao.assunto.id)
                .eq('status', 'ATRASADA')

            setResultado({
                success: true,
                nota: nota,
                percentual: percentual,
                acertos: acertos,
                total: sessao.total_questoes,
                nivel_atual: nota,
                proxima_revisao: dataProximaStr,
                intervalo_dias: intervalo,
                erros_ativos: countErrosAtivos || 0,
                estado_cognitivo: estadoCognitivo
            })

        } catch (err: any) {
            console.error('Error finalizing session:', err)
            setError('Erro ao finalizar sessão')
        } finally {
            setFinalizando(false)
        }
    }

    const handleFechar = () => {
        setSessao(null)
        setQuestaoAtual(0)
        setRespostas([])
        setRespostaSelecionada(null)
        setResultado(null)
        setError(null)
        onClose()
        if (resultado && onComplete) {
            onComplete()
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex justify-center p-2 sm:p-4 bg-background/95 backdrop-blur-sm overflow-y-auto h-[100dvh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl bg-card border border-border sm:rounded-[40px] rounded-3xl shadow-2xl my-auto pb-safe"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-50 to-transparent p-4 sm:p-6 border-b border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`px-3 py-1 rounded-full ${tipo === 'NIVELAMENTO'
                                        ? 'bg-orange-500/10 text-orange-500'
                                        : tipo === 'CADERNO_ERROS'
                                            ? 'bg-yellow-500/10 text-yellow-500'
                                            : 'bg-primary/10 text-primary'
                                        }`}>
                                        <span className="text-xs font-black uppercase tracking-widest">
                                            {tipo === 'CADERNO_ERROS' ? 'RECUPERAÇÃO DE ERROS' : tipo}
                                        </span>
                                    </div>
                                    {sessao && (
                                        <span className="text-sm font-bold text-muted-foreground">
                                            {questaoAtual + 1} de {sessao.total_questoes}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-foreground">
                                    {sessao?.assunto.nome || 'Carregando...'}
                                </h2>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex items-center gap-2 bg-muted/30 p-1.5 rounded-xl border border-border mr-2">
                                    <button
                                        onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                                        className="p-2 hover:bg-white rounded-lg transition-all"
                                        title="Diminuir Fonte"
                                    >
                                        <span className="text-xs font-bold font-serif">A-</span>
                                    </button>
                                    <div className="w-px h-4 bg-border" />
                                    <button
                                        onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
                                        className="p-2 hover:bg-white rounded-lg transition-all"
                                        title="Aumentar Fonte"
                                    >
                                        <span className="text-sm font-bold font-serif">A+</span>
                                    </button>
                                </div>

                                <button
                                    onClick={handleFechar}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        {sessao && (
                            <div className="mt-6 h-3 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((questaoAtual + 1) / sessao.total_questoes) * 100}%` }}
                                    className={`h-full ${tipo === 'NIVELAMENTO'
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500'
                                        : tipo === 'CADERNO_ERROS'
                                            ? 'bg-yellow-500'
                                            : 'bg-primary'
                                        }`}
                                />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-8 md:p-12 pb-12 sm:pb-16 min-h-[300px] sm:min-h-[500px] flex flex-col">
                        {loading && (
                            <div className="flex items-center justify-center py-20">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="bg-destructive/10 border border-destructive/20 rounded-[30px] p-8 text-center max-w-md mx-auto">
                                <XCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-destructive mb-2">Ops! Algo deu errado</h3>
                                <p className="text-muted-foreground mb-6 font-medium">{error}</p>
                                <button
                                    onClick={handleFechar}
                                    className="px-8 py-3 bg-destructive text-white rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-lg shadow-destructive/20"
                                >
                                    Fechar
                                </button>
                            </div>
                        )}

                        {resultado && (
                            <TelaResultado resultado={resultado} tipo={tipo} onFechar={handleFechar} />
                        )}

                        {sessao && !resultado && !error && (
                            <>
                                <TelaQuestao
                                    questao={sessao.questoes[questaoAtual]}
                                    respostaSelecionada={respostaSelecionada}
                                    onSelecionarResposta={setRespostaSelecionada}
                                    onResponder={handleResponder}
                                    onAbort={handleFechar}
                                    finalizando={finalizando}
                                    isUltima={questaoAtual === sessao.questoes.length - 1}
                                    fontSize={fontSize}
                                />

                                <div className="mt-12 pt-8 border-t border-border">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Progresso da Sessão</p>
                                    <div className="flex flex-wrap gap-2">
                                        {sessao.questoes.map((_, idx) => {
                                            const isCurrentQuestion = idx === questaoAtual
                                            const isAnswered = idx < respostas.length
                                            const isLocked = idx > respostas.length

                                            let bgColor = 'bg-muted text-muted-foreground'
                                            if (isAnswered) {
                                                bgColor = 'bg-primary text-white'
                                            } else if (isCurrentQuestion) {
                                                bgColor = 'bg-primary text-white ring-2 ring-primary/50'
                                            } else if (isLocked) {
                                                bgColor = 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-50'
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    disabled={isLocked}
                                                    onClick={() => {
                                                        if (!isLocked) {
                                                            setQuestaoAtual(idx)
                                                            if (idx < respostas.length) {
                                                                setRespostaSelecionada(respostas[idx].resposta)
                                                            } else {
                                                                setRespostaSelecionada(null)
                                                            }
                                                        }
                                                    }}
                                                    className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${isLocked ? '' : 'hover:scale-110'} ${bgColor}`}
                                                >
                                                    {idx + 1}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

function TelaQuestao({
    questao,
    respostaSelecionada,
    onSelecionarResposta,
    onResponder,
    onAbort,
    finalizando,
    isUltima,
    fontSize
}: {
    questao: Questao
    respostaSelecionada: string | null
    onSelecionarResposta: (resposta: string) => void
    onResponder: () => void
    onAbort: () => void
    finalizando: boolean
    isUltima: boolean
    fontSize: number
}) {
    return (
        <motion.div
            key={questao.questao_id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 sm:space-y-8 max-w-3xl mx-auto w-full"
        >
            <div className="prose prose-lg max-w-none">
                <QuestionText
                    className="text-[#1A1033] font-black italic uppercase leading-tight tracking-tighter"
                    style={{ fontSize: `${fontSize * 1.3}px` }}
                >
                    {questao.enunciado}
                </QuestionText>

                {questao.comando && (
                    <QuestionText
                        className="mt-4 text-[#1A1033] font-bold"
                        style={{ fontSize: `${fontSize * 1.1}px` }}
                    >
                        {questao.comando}
                    </QuestionText>
                )}
                {/* Fallback para imagem se houver */}
                {questao.image_url && (
                    <img src={questao.image_url} alt="Imagem da questão" className="rounded-xl mt-4 max-h-[300px] object-contain" />
                )}
            </div>

            <div className="space-y-4">
                {questao.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelecionarResposta(option.id)}
                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-start gap-4 group ${respostaSelecionada === option.id
                            ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                            : 'border-slate-100 hover:border-primary/30 bg-white hover:bg-slate-50'
                            }`}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-colors ${respostaSelecionada === option.id
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
                            }`}>
                            {option.id.toUpperCase()}
                        </div>
                        <QuestionText
                            className={`font-bold flex-1 pt-1 ${respostaSelecionada === option.id
                                ? 'text-primary'
                                : 'text-slate-600'
                                }`}
                            style={{ fontSize: `${fontSize * 0.9}px` }}
                        >
                            {option.text}
                        </QuestionText>
                    </button>
                ))}
            </div>

            <div className="pt-4">
                <button
                    onClick={onResponder}
                    disabled={!respostaSelecionada || finalizando}
                    className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] transition-all ${respostaSelecionada && !finalizando
                        ? 'bg-[#1A1033] text-white hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20'
                        : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                        }`}
                >
                    {finalizando ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Finalizando...
                        </>
                    ) : (
                        <>
                            {isUltima ? 'Finalizar Sessão' : 'Próxima Questão'}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>

                <button
                    onClick={onAbort}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-slate-400 hover:text-slate-600 font-bold uppercase text-xs tracking-[0.2em] transition-all"
                >
                    <XCircle className="w-4 h-4" />
                    Interromper e Voltar
                </button>
            </div>
        </motion.div>
    )
}

function TelaResultado({
    resultado,
    tipo,
    onFechar
}: {
    resultado: any
    tipo: string
    onFechar: () => void
}) {
    const isLeveling = tipo === 'NIVELAMENTO'

    // Mensagem baseada no Estado Cognitivo (Se houver)
    let titulo = "Resultado da Sessão"
    let subtitulo = "Veja como foi seu desempenho."

    if (isLeveling && resultado.estado_cognitivo) {
        if (resultado.estado_cognitivo === 'DOMINADO') {
            titulo = "Domínio Total!"
            subtitulo = "Você demonstrou excelente conhecimento."
        } else if (resultado.estado_cognitivo === 'NIVEL_ALTO') {
            titulo = "Alto Desempenho"
            subtitulo = "Você tem uma base sólida neste assunto."
        } else if (resultado.estado_cognitivo === 'NIVEL_INTERMEDIARIO') {
            titulo = "Nível Intermediário"
            subtitulo = "Bom começo, mas precisa de revisão."
        } else {
            titulo = "Nível Básico"
            subtitulo = "Identificamos lacunas importantes. Faremos revisões curtas."
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-8 py-8"
        >
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-12 h-12 text-green-500" />
            </div>

            <div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-[#1A1033] mb-2">
                    {titulo}
                </h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                    {subtitulo}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center">
                    <span className="text-4xl font-black text-[#1A1033]">{resultado.acertos}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Acertos</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center">
                    <span className="text-4xl font-black text-[#1A1033]">{resultado.percentual || Math.round((resultado.acertos / resultado.total) * 100)}%</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Precisão</span>
                </div>
            </div>

            {resultado.proxima_revisao && (
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-bold text-blue-700">
                        Próxima revisão agendada para: {new Date(resultado.proxima_revisao).toLocaleDateString('pt-BR')}
                    </span>
                </div>
            )}

            {resultado.estado_cognitivo && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest">
                    <span>Nível: {resultado.estado_cognitivo.replace('NIVEL_', '').replace('_', ' ')}</span>
                </div>
            )}

            <button
                onClick={onFechar}
                className="w-full max-w-md bg-[#1A1033] text-white py-4 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
                Concluir
            </button>
        </motion.div>
    )
}
