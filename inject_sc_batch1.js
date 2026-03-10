const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const PACKAGE_ID = 'a3f47c03-2d6d-4245-a9d5-3fa67001a254'

async function inject() {
    const raw = fs.readFileSync('./sc_batch1.json', 'utf-8')
    const questions = JSON.parse(raw)

    console.log(`Injetando ${questions.length} questões no pacote ${PACKAGE_ID}...`)

    // Get current max order_index
    const { data: existing } = await supabase
        .from('package_questions')
        .select('order_index')
        .eq('package_id', PACKAGE_ID)
        .order('order_index', { ascending: false })
        .limit(1)

    let startIndex = (existing?.[0]?.order_index || 0) + 1

    const rows = questions.map((q, i) => ({
        package_id: PACKAGE_ID,
        question_json: q,
        status: 'pending',
        order_index: startIndex + i
    }))

    // Insert in batches of 5 to avoid limits
    let inserted = 0
    let errors = 0

    for (let i = 0; i < rows.length; i += 5) {
        const batch = rows.slice(i, i + 5)
        const { data, error } = await supabase
            .from('package_questions')
            .insert(batch)
            .select('id')

        if (error) {
            console.error(`Erro no lote ${i}-${i + 5}:`, error.message)
            errors++
        } else {
            inserted += (data?.length || 0)
            process.stdout.write(`\r[${inserted}/${rows.length}] questões inseridas...`)
        }

        await new Promise(r => setTimeout(r, 100))
    }

    console.log(`\n✅ Concluído! ${inserted} inseridas, ${errors} erros.`)

    // Verify count
    const { count } = await supabase
        .from('package_questions')
        .select('id', { count: 'exact', head: true })
        .eq('package_id', PACKAGE_ID)

    console.log(`📦 Total de questões no pacote agora: ${count}`)
}

inject().catch(console.error)
