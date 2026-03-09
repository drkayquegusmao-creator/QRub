
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Mappings from the user request
const PACKAGE_ID = '57ae3ba0-9032-4198-841e-18280b55e766';

// Taxonomy mappings for IC
const TAXONOMY = {
    course_id: 'medicina',
    specialty_id: 'cardiologia',
    subspecialty_id: 'cardiologia',
    subject_id: 'insuficiencia-cardiaca',
    area_id: 'clinica-medica',
    subarea_id: 'cardiologia',
    tema_id: 'insuficiencia-cardiaca'
};

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
    console.log(`Inserting batch ${batchNum} to questao_base...`);

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const hash = computeHash(q.enunciado);

        // Map to DB schema
        const payload = {
            id: `FGV-IC-${hash}`,
            ...TAXONOMY,
            enunciado: q.enunciado,
            options: Object.entries(q.options).map(([k, v]) => ({ id: k, text: v })),
            correct_option_id: q.answer,
            explanation: q.rationale,
            alternative_explanations: q.option_rationales,
            difficulty: q.difficulty || 'média',
            status: 'active',
            status_validacao: 'APROVADA',
            fonte: 'gerada_qrub',
            hash: hash,
            metadata: {
                tags: q.tags || [],
                package_id: PACKAGE_ID,
                generated_at: new Date().toISOString()
            }
        };

        const { error } = await supabase.from('questao_base').upsert(payload, { onConflict: 'id' });
        if (error) {
            console.error(`Error in Q${i + 1}:`, error.message);
        } else {
            console.log(`Upserted Q${i + 1} into questao_base with package_id ${PACKAGE_ID}`);
        }
    }
}

insertBatch(process.argv[2]);
