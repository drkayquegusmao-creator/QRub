require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testPublish() {
    // Get 1 draft question
    const { data: pqs, error: fetchErr } = await supabase
        .from('concurso_package_questions')
        .select('*, package:concurso_question_packages(taxonomy_path, bank_id, area_id, disciplina_id, subdisciplina_id, assunto_id, banks:concurso_banks(name))')
        .eq('status', 'draft')
        .limit(1);

    if (fetchErr) {
        console.error('Fetch Error:', fetchErr);
        return;
    }
    if (!pqs || pqs.length === 0) {
        console.log('No draft questions found.');
        return;
    }

    const pq = pqs[0];
    const qj = pq.question_json;
    const rawOpts = qj.options || {};
    const optionsArray = Object.keys(rawOpts).map(k => ({
        id: k,
        text: rawOpts[k]
    }));

    const questionId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : (Math.random().toString(36).substring(2) + Date.now().toString(36));

    const upsertData = [{
        id: questionId,
        enunciado: qj.enunciado || qj.stem || '',
        options: optionsArray,
        correct_option_id: qj.answer,
        explanation: qj.rationale,
        difficulty: qj.difficulty || 'media',
        status: 'active',
        banca_id: pq.package?.bank_id,
        area_id: pq.package?.area_id,
        disciplina_id: pq.package?.disciplina_id,
        subdisciplina_id: pq.package?.subdisciplina_id,
        assunto_id: pq.package?.assunto_id,
        source: pq.package?.banks?.name || 'Manual',
        taxonomy_path: pq.package?.taxonomy_path,
        metadata: {
            tags: qj.tags || [],
            package_id: pq.package_id,
            hash: pq.hash_logico,
            published_at: new Date().toISOString()
        }
    }];

    const { error: upsertErr, data } = await supabase
        .from('concurso_questao_base')
        .upsert(upsertData, { onConflict: 'id' }).select();

    if (upsertErr) {
        console.error('Upsert Error:\n', JSON.stringify(upsertErr, null, 2));
    } else {
        console.log('Success!', data);
    }
}

testPublish();
