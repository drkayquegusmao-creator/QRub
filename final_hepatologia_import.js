const fs = require('fs');
const PACKAGE_ID = '375f7808-3a7d-4ece-a932-da0ab8360a23';

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

const escapeSql = (str) => {
    if (typeof str !== 'string') return "''";
    return "'" + str.replace(/'/g, "''") + "'";
}

let sql = 'DO $$\nDECLARE\n    p_id UUID := \'' + PACKAGE_ID + '\';\nBEGIN\n';

// For now only part 1
const fileName = 'batch_fgv_doenca_hepatica_part1.json';
if (fs.existsSync(fileName)) {
    const questions = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    questions.forEach((q, i) => {
        const hash = computeHash(q.enunciado);
        const questionId = 'FGV-HEP-' + hash;
        
        // Format options as array of objects [{id: 'a', text: '...'}, ...]
        const optionsArr = q.options ? Object.entries(q.options).map(([k, v]) => ({ id: k, text: v })) : [];
        const optionsJson = JSON.stringify(optionsArr);
        const altExplanations = JSON.stringify(q.option_rationales || {});
        
        // Metadata as JSON
        const metadata = JSON.stringify({ 
            package_id: PACKAGE_ID, 
            tags: q.tags || [],
            source: 'qrub_generator_v2'
        });

        sql += '    -- Q' + (i + 1) + '\n';
        sql += '    INSERT INTO questao_base (\n';
        sql += '        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,\n';
        sql += '        enunciado, options, correct_option_id, explanation, alternative_explanations,\n';
        sql += '        difficulty, status, status_validacao, fonte, hash, metadata\n';
        sql += '    ) VALUES (\n';
        sql += '        ' + escapeSql(questionId) + ', \'medicina\', \'clinica-medica\', \'gastroenterologia\', \'gastroenterologia\', \'doenca-hepatica\', \'doenca-hepatica\',\n';
        sql += '        ' + escapeSql(q.enunciado) + ', ' + escapeSql(optionsJson) + ', ' + escapeSql(q.answer) + ', \n';
        sql += '        ' + escapeSql(q.rationale) + ', ' + escapeSql(altExplanations) + ', \n';
        sql += '        ' + escapeSql(q.difficulty || 'média') + ', \'active\', \'APROVADA\', \'gerada_qrub\', ' + escapeSql(hash) + ', ' + escapeSql(metadata) + '\n';
        sql += '    ) ON CONFLICT (id) DO UPDATE SET status_validacao = \'APROVADA\', metadata = EXCLUDED.metadata;\n\n';

        sql += '    INSERT INTO package_questions (package_id, question_id, status, order_index)\n';
        sql += '    SELECT p_id, ' + escapeSql(questionId) + ', \'approved\', ' + (83 + i) + '\n';
        sql += '    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = ' + escapeSql(questionId) + ');\n\n';
    });
}

sql += 'END $$;';

fs.writeFileSync('import_hepatologia_p1.sql', sql);
console.log('SQL generated successfully.');
