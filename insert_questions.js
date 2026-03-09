
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Mappings from the user request
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
    if (!fs.existsSync(fileName)) {
        console.error(`File ${fileName} not found.`);
        return;
    }

    const questions = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    console.log(`Inserting batch ${batchNum} (${questions.length} questions)...`);

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];

        // Compute logical hash for duplicate detection and package requirement
        const hash = computeHash(q.enunciado);

        // Prepare payload for package_questions
        const payload = {
            package_id: PACKAGE_ID,
            question_json: q,
            hash_logico: hash,
            order_index: i + (batchNum * 100), // Approximate order index
            status: 'draft'
        };

        const { data, error } = await supabase
            .from('package_questions')
            .insert(payload);

        if (error) {
            console.error(`Error inserting Q${i + 1} from batch ${batchNum}:`, error.message);
        } else {
            console.log(`Inserted Q${i + 1} into package ${PACKAGE_ID}`);
        }
    }
}

const batch = process.argv[2];
if (batch) {
    insertBatch(batch);
} else {
    console.log('Please provide batch number: node insert_questions.js <num>');
}
