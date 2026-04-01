const fs = require('fs');

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

try {
    const content = fs.readFileSync('C:/Users/kayqu/.gemini/antigravity/brain/915d9539-b782-4c16-bbfb-5bd4372c7d74/.system_generated/steps/569/output.txt', 'utf8');
    
    // Attempt to extract the JSON array from the markdown/untrusted-data wrapping.
    const jsonStart = content.indexOf('[');
    const jsonEnd = content.lastIndexOf(']');
    
    if (jsonStart === -1 || jsonEnd === -1) {
        console.error("No JSON array found in the file.");
        process.exit(1);
    }
    
    const jsonStr = content.substring(jsonStart, jsonEnd + 1);
    const questions = JSON.parse(jsonStr);
    
    console.log(`Analyzing ${questions.length} questions...`);
    const validationErrors = [];
    
    questions.forEach((q, i) => {
        let qj = q.question_json;
        if (typeof qj === 'string') {
            try { qj = JSON.parse(qj); } 
            catch (e) {
                validationErrors.push(`Q${i+1} (ID: ${q.id}): JSON Invalido`);
                return;
            }
        }
        
        const errs = validateQuestionJson(qj, i + 1);
        if (errs.length > 0) {
            validationErrors.push(`Q${i+1} (ID: ${q.id}):\n  - ` + errs.join('\n  - '));
        }
    });

    if (validationErrors.length > 0) {
        console.log('\n========= ERROS DE VALIDACAO ENCONTRADOS =========');
        console.log(validationErrors.join('\n\n'));
    } else {
        console.log('NENHUM ERRO ENCONTRADO! Todas as questoes estao formatadas corretamente.');
    }
} catch (e) {
    console.error("Error running script:", e);
}
