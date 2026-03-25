const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://czguyzdbvqfyjsfwcpnh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6Z3V5emRidnFmeWpzZndjcG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTc0ODYsImV4cCI6MjA4NTI3MzQ4Nn0.xg9bhx3G8R_s29WEIwr3SWp38isihpFVdB8ilwmIb9k';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const data = JSON.parse(fs.readFileSync('./batch_manual.json', 'utf8'));
const packageId = 'E1445D06-0ADF-49D9-90DE-9143B95959F8'.toLowerCase();

function computeHash(text) {
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim()
    let hash = 0
    for (let i = 0; i < normalized.length; i++) {
        hash = ((hash << 5) - hash) + normalized.charCodeAt(i)
        hash = hash & hash
    }
    return Math.abs(hash).toString(36)
}

async function run() {
    let successCount = 0;
    for (const q of data) {
        const normalized = {
            enunciado: q.enunciado || q.stem || '',
            options: q.options || q.alternativas || {},
            answer: (q.answer || q.gabarito || '').toLowerCase(),
            rationale: q.rationale || q.justificativa || '',
            difficulty: q.difficulty || 'media',
            tags: q.tags || []
        }
        const hash = computeHash(normalized.enunciado);
        
        const { error } = await supabase
            .from('concurso_package_questions')
            .insert({
                package_id: packageId,
                question_json: normalized,
                hash_logico: hash,
                status: 'draft'
            });
            
        if (error) {
            console.error('Falha ao inserir:', error.message);
        } else {
            console.log('Inserida:', normalized.enunciado.substring(0, 40) + '...');
            successCount++;
        }
    }
    console.log(`\nImportação concluída! ${successCount} perguntas anexadas ao Lote ${packageId}`);
}

run();
