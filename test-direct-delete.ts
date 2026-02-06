import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://czguyzdbvqfyjsfwcpnh.supabase.co'
const supabaseKey = 'sb_publishable_VBdyIxTT-gY71MqvCQKZyg_l9yHtMuZ'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testDeletion() {
    console.log('🧪 Testando deleção direta via Supabase...\n')

    // 1. Buscar uma das questões de teste
    const { data: questions, error: fetchError } = await supabase
        .from('questao_base')
        .select('id')
        .like('id', 'test-question-%')
        .limit(1)

    if (fetchError || !questions || questions.length === 0) {
        console.log('⚠️ Nenhuma questão de teste encontrada para deletar.')
        return
    }

    const targetId = questions[0].id
    console.log(`🗑️ Tentando deletar questão: ${targetId}`)

    // 2. Tentar deletar
    const { error: deleteError } = await supabase
        .from('questao_base')
        .delete()
        .eq('id', targetId)

    if (deleteError) {
        console.error('❌ Erro ao deletar:', deleteError.message)
    } else {
        console.log('✅ Questão deletada com sucesso no backend!')
    }
}

testDeletion()
