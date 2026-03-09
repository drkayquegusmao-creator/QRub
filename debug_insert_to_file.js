
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PACKAGE_ID = '57ae3ba0-9032-4198-841e-18280b55e766';

function computeHash(text) {
    if (!text) return '';
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
        const char = normalized.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

async function insertBatch(batchNum) {
    const fileName = `questions_ic_batch${batchNum}.json`;
    if (!fs.existsSync(fileName)) return;

    const questions = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const hash = computeHash(q.enunciado);

        const payload = {
            package_id: PACKAGE_ID,
            question_json: q,
            hash_logico: hash,
            order_index: i + (batchNum * 100),
            status: 'draft'
        };

        const { error } = await supabase.from('package_questions').insert(payload);
        if (error) {
            fs.writeFileSync('insert_error.json', JSON.stringify(error, null, 2));
            process.exit(1);
        }
    }
}

insertBatch(process.argv[2]);
