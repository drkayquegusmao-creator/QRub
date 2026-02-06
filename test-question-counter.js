// Script para testar se o contador passa de 1999
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis de ambiente não configuradas')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testQuestionCounter() {
    console.log('🧪 Iniciando teste do contador de questões...\n')

    // 1. Verificar contador atual
    const { count: currentCount, error: countError } = await supabase
        .from('questao_base')
        .select('*', { count: 'exact', head: true })

    if (countError) {
        console.error('❌ Erro ao contar questões:', countError)
        return
    }

    console.log(`📊 Contador atual: ${currentCount} questões\n`)

    // 2. Adicionar duas questões de teste
    const testQuestions = [
        {
            id: `test-question-${Date.now()}-1`,
            course_id: 'revalida',
            specialty_id: 'clinica_medica',
            subspecialty_id: 'cardiologia',
            subject_id: 'hipertensao',
            enunciado: 'Questao Teste 1 - Verificacao de contador apos correcao do limite',
            comando: 'Qual e a resposta correta?',
            options: [
                { id: 'a', text: 'Alternativa A' },
                { id: 'b', text: 'Alternativa B' },
                { id: 'c', text: 'Alternativa C' },
                { id: 'd', text: 'Alternativa D' },
                { id: 'e', text: 'Alternativa E' }
            ],
            correct_option_id: 'a',
            explanation: 'Esta e uma questao de teste para verificar se o contador passa de 1999',
            status: 'active',
            status_validacao: 'APROVADA'
        },
        {
            id: `test-question-${Date.now()}-2`,
            course_id: 'revalida',
            specialty_id: 'clinica_medica',
            subspecialty_id: 'cardiologia',
            subject_id: 'hipertensao',
            enunciado: 'Questao Teste 2 - Verificacao de contador apos correcao do limite',
            comando: 'Qual e a resposta correta?',
            options: [
                { id: 'a', text: 'Alternativa A' },
                { id: 'b', text: 'Alternativa B' },
                { id: 'c', text: 'Alternativa C' },
                { id: 'd', text: 'Alternativa D' },
                { id: 'e', text: 'Alternativa E' }
            ],
            correct_option_id: 'b',
            explanation: 'Esta e uma questao de teste para verificar se o contador passa de 1999',
            status: 'active',
            status_validacao: 'APROVADA'
        }
    ]

    console.log('➕ Adicionando 2 questões de teste...\n')

    const { data, error } = await supabase
        .from('questao_base')
        .insert(testQuestions)
        .select()

    if (error) {
        console.error('❌ Erro ao adicionar questões:', error)
        return
    }

    console.log(`✅ ${data.length} questões adicionadas com sucesso!\n`)

    // 3. Verificar novo contador
    const { count: newCount, error: newCountError } = await supabase
        .from('questao_base')
        .select('*', { count: 'exact', head: true })

    if (newCountError) {
        console.error('❌ Erro ao contar questões:', newCountError)
        return
    }

    console.log(`📊 Novo contador: ${newCount} questões\n`)

    // 4. Resultado
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('📈 RESULTADO DO TESTE:')
    console.log(`   Antes: ${currentCount} questões`)
    console.log(`   Depois: ${newCount} questões`)
    console.log(`   Diferença: +${newCount - currentCount} questões`)

    if (newCount > 1999) {
        console.log('\n✅ SUCESSO! O contador passou de 1999!')
        console.log('   O limite foi removido com sucesso.')
    } else {
        console.log('\n⚠️  O contador ainda está abaixo de 2000')
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

testQuestionCounter()
