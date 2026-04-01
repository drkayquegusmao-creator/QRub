
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Mappings from the user request
const PACKAGE_ID = '3568d15e-55e9-4c02-9b18-e0af24172fb4';

// Taxonomy mappings for Cirrose
const TAXONOMY = {
    course_id: 'medicina',
    specialty_id: 'gastroenterologia',
    subspecialty_id: 'gastroenterologia',
    subject_id: 'cirrose-hepatica',
    area_id: 'clinica-medica',
    subarea_id: 'gastroenterologia',
    tema_id: 'cirrose-hepatica'
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

async function runImport() {
    console.log(`🚀 Iniciando importação para o pacote: ${PACKAGE_ID}`);

    for (let batchNum = 1; batchNum <= 10; batchNum++) {
        const fileName = `batch_fgv_cirrose_part${batchNum}.json`;
        if (!fs.existsSync(fileName)) {
            console.log(`⚠️ Arquivo não encontrado: ${fileName}`);
            continue;
        }

        const questions = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        console.log(`\n📦 Lote ${batchNum}: Processando ${questions.length} questões...`);

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            const hash = computeHash(q.enunciado);
            const questionId = `FGV-CIRR-${hash}`;

            // 1. Upsert into questao_base
            const payload = {
                id: questionId,
                ...TAXONOMY,
                enunciado: q.enunciado,
                options: q.options ? Object.entries(q.options).map(([k, v]) => ({ id: k, text: v })) : [],
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

            const { error: errorBase } = await supabase.from('questao_base').upsert(payload, { onConflict: 'id' });
            
            if (errorBase) {
                console.error(`❌ Erro Q${i+1} (base):`, errorBase.message);
                continue;
            }

            // 2. Link to Package (check first to avoid unique constraint issues if we add it later, but here we just prevent duplicates)
            const { data: existingLink } = await supabase
                .from('package_questions')
                .select('id')
                .eq('package_id', PACKAGE_ID)
                .eq('question_id', questionId)
                .maybeSingle();

            if (!existingLink) {
                const packagePayload = {
                    package_id: PACKAGE_ID,
                    question_id: questionId,
                    status: 'approved',
                    order_index: (batchNum - 1) * 20 + i
                };

                const { error: errorPkg } = await supabase.from('package_questions').insert(packagePayload);

                if (errorPkg) {
                    console.error(`❌ Erro Q${i+1} (link):`, errorPkg.message);
                } else {
                    console.log(`✅ Q${i+1} [${questionId}] importada e vinculada.`);
                }
            } else {
                console.log(`ℹ️ Q${i+1} [${questionId}] já está vinculada ao pacote.`);
            }
        }
    }
    console.log("\n✨ Importação concluída!");
}

runImport();
