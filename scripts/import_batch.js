const { createClient } = require('@supabase/supabase-js')
const crypto = require('crypto')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const PACKAGE_ID = '3602738e-b824-45c1-9c86-5bf078626b5e'

async function getBaseIdx() {
  const { data } = await supabase
    .from('package_questions')
    .select('order_index')
    .eq('package_id', PACKAGE_ID)
    .order('order_index', { ascending: false })
    .limit(1)
  return (data?.[0]?.order_index ?? -1) + 1
}

async function insertQuestions(questions) {
  let baseIdx = await getBaseIdx()
  let imported = 0, duplicates = 0, errors = 0

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    const hash = crypto.createHash('md5').update(q.enunciado).digest('hex')

    const { data: dup } = await supabase
      .from('package_questions')
      .select('id')
      .eq('package_id', PACKAGE_ID)
      .eq('hash_logico', hash)
      .maybeSingle()

    if (dup) { duplicates++; continue }

    const { error } = await supabase
      .from('package_questions')
      .insert({
        package_id: PACKAGE_ID,
        question_json: q,
        hash_logico: hash,
        order_index: baseIdx + imported,
        status: 'draft'
      })

    if (error) {
      console.error(`Erro Q${i + 1} [${q.subspecialty}]:`, error.message)
      errors++
    } else {
      imported++
      process.stdout.write('.')
    }
  }

  return { imported, duplicates, errors }
}

const questions = require(process.argv[2])

insertQuestions(questions).then(async (r) => {
  console.log(`\n=== RESULTADO ===`)
  console.log(`Importadas: ${r.imported}`)
  console.log(`Duplicadas: ${r.duplicates}`)
  console.log(`Erros: ${r.errors}`)
  const { count } = await supabase
    .from('package_questions')
    .select('*', { count: 'exact', head: true })
    .eq('package_id', PACKAGE_ID)
  console.log(`Total no pacote: ${count}`)
}).catch(console.error)
