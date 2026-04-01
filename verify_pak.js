require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function validateQuestionJson(qj, index) {
    const errs = [];
    const enunciado = qj?.enunciado || qj?.stem || qj?.pergunta || '';
    if (!enunciado || String(enunciado).length < 10)
        errs.push(`Q${index}: enunciado ausente ou muito curto`);
    
    const opts = qj?.options || qj?.alternativas || qj?.alternatives || {};
    const keys = Object.keys(opts).filter(k => ['a', 'b', 'c', 'd', 'e'].includes(k) && opts[k]);
    if (keys.length < 4)
        errs.push(`Q${index}: apenas ${keys.length} alternativas (minimo 4)`);
    
    const ans = String(qj?.answer || qj?.gabarito || qj?.resposta || '').toLowerCase().trim();
    if (!['a', 'b', 'c', 'd', 'e'].includes(ans))
        errs.push(`Q${index}: gabarito invalido ("${ans}")`);
    
    const rationale = qj?.rationale || qj?.justificativa_gabarito || qj?.justificativa_geral || qj?.justificativa || qj?.explanation || '';
    if (!rationale || String(rationale).length < 5)
        errs.push(`Q${index}: justificativa ausente`);
    
    return errs;
}

async function run() {
    const packageId = '375f7808-3a7d-4ece-a932-da0ab8360a23';
    console.log(`Buscando questoes do pacote ${packageId}...`);
    
    const { data: questions, error } = await supabase
        .from('package_questions')
        .select('*')
        .eq('package_id', packageId)
        .order('order_index');
        
    if (error) {
        console.error('Erro ao buscar:', error);
        return;
    }
    
    console.log(`Encontradas ${questions.length} questoes.`);
    
    const validationErrors = [];
    
    for (let i = 0; i < questions.length; i++) {
        const pq = questions[i];
        if (pq.status === 'approved') continue;
        
        let qj = pq.question_json;
        if (typeof qj === 'string') {
            try {
                qj = JSON.parse(qj);
            } catch (e) {
                validationErrors.push(`Q${i+1} (ID: ${pq.id}): JSON Invalido`);
                continue;
            }
        }
        
        const errs = validateQuestionJson(qj, i + 1);
        if (errs.length > 0) {
            validationErrors.push(`Q${i+1} (ID: ${pq.id}):\n  - ` + errs.join('\n  - '));
        }
    }
    
    if (validationErrors.length > 0) {
        console.log('\n========= ERROS DE VALIDACAO ENCONTRADOS =========');
        console.log(validationErrors.join('\n\n'));
    } else {
        console.log('NENHUM ERRO ENCONTRADO! Todas as questoes estao formatadas corretamente.');
    }
}

run();
