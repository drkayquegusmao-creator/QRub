require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function computeHash(text) {
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
        hash = ((hash << 5) - hash) + normalized.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function importToDb() {
    console.log('Iniciando carga indireta via RPC Segura no Supabase (QRub Concursos)...');

    // 1. Direitos Individuais
    const packageIdDI = 'c78911de-9502-4184-8a96-c9d7e0d85e60';
    try {
        const fileDI = path.join(__dirname, 'master_direitos_individuais_total_55.json');
        if (fs.existsSync(fileDI)) {
            const dataDI = JSON.parse(fs.readFileSync(fileDI, 'utf8'));
            let inserted = 0;
            for (let i = 0; i < dataDI.length; i++) {
                const q = dataDI[i];
                const { error } = await supabase.rpc('bulk_import_package_questions', {
                    p_package_id: packageIdDI,
                    p_question_json: q,
                    p_status: 'draft',
                    p_hash_logico: computeHash(q.enunciado || ''),
                    p_order_index: i + 1
                });
                if (error) throw error;
                inserted++;
            }
            console.log(`✅ [DIREITOS INDIVIDUAIS] Carga de ${inserted} questões efetuada com sucesso no pacote ${packageIdDI}.`);
        } else {
            console.log('⚠️ Arquivo master_direitos_individuais_total_55.json não encontrado.');
        }
    } catch (e) {
        console.error('❌ Erro na carga de Direitos Individuais:', e.message || e);
    }

    // 2. Segurados
    const packageIdSeg = 'cdd9c27d-f85f-4593-b010-89216c0df69f';
    try {
        const fileSeg = path.join(__dirname, 'master_segurados_total_55.json');
        if (fs.existsSync(fileSeg)) {
            const dataSeg = JSON.parse(fs.readFileSync(fileSeg, 'utf8'));
            let inserted = 0;
            for (let i = 0; i < dataSeg.length; i++) {
                const q = dataSeg[i];
                const { error } = await supabase.rpc('bulk_import_package_questions', {
                    p_package_id: packageIdSeg,
                    p_question_json: q,
                    p_status: 'draft',
                    p_hash_logico: computeHash(q.enunciado || ''),
                    p_order_index: i + 1
                });
                if (error) throw error;
                inserted++;
            }
            console.log(`✅ [SEGURADOS] Carga de ${inserted} questões efetuada com sucesso no pacote ${packageIdSeg}.`);
        } else {
            console.log('⚠️ Arquivo master_segurados_total_55.json não encontrado.');
        }
    } catch (e) {
        console.error('❌ Erro na carga de Segurados:', e.message || e);
    }

    console.log('Processo de injeção direta RPC finalizado.');
}

importToDb();
