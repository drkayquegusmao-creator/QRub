
const fs = require('fs');
const PACKAGE_ID = '3568d15e-55e9-4c02-9b18-e0af24172fb4';

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

for (let batchNum = 1; batchNum <= 10; batchNum++) {
    const fileName = 'batch_fgv_cirrose_part' + batchNum + '.json';
    if (!fs.existsSync(fileName)) continue;

    const questions = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    questions.forEach((q, i) => {
        const hash = computeHash(q.enunciado);
        const questionId = 'FGV-CIRR-' + hash;
        const optionsArr = q.options ? Object.entries(q.options).map(([k, v]) => ({ id: k, text: v })) : [];
        const optionsJson = JSON.stringify(optionsArr);
        const altExplanations = JSON.stringify(q.option_rationales || {});
        const metadata = JSON.stringify({ package_id: PACKAGE_ID, tags: q.tags || [] });

        sql += '    -- Q' + ((batchNum - 1) * 20 + i + 1) + '\n';
        sql += '    INSERT INTO questao_base (\n';
        sql += '        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,\n';
        sql += '        enunciado, options, correct_option_id, explanation, alternative_explanations,\n';
        sql += '        difficulty, status, status_validacao, fonte, hash, metadata\n';
        sql += '    ) VALUES (\n';
        sql += '        ' + escapeSql(questionId) + ', \'medicina\', \'clinica-medica\', \'gastroenterologia\', \'gastroenterologia\', \'cirrose-hepatica\', \'cirrose-hepatica\',\n';
        sql += '        ' + escapeSql(q.enunciado) + ', ' + escapeSql(optionsJson) + ', ' + escapeSql(q.answer) + ', \n';
        sql += '        ' + escapeSql(q.rationale) + ', ' + escapeSql(altExplanations) + ', \n';
        sql += '        ' + escapeSql(q.difficulty || 'média') + ', \'active\', \'APROVADA\', \'gerada_qrub\', ' + escapeSql(hash) + ', ' + escapeSql(metadata) + '\n';
        sql += '    ) ON CONFLICT (id) DO UPDATE SET status_validacao = \'APROVADA\', metadata = EXCLUDED.metadata;\n\n';

        sql += '    INSERT INTO package_questions (package_id, question_id, status, order_index)\n';
        sql += '    VALUES (p_id, ' + escapeSql(questionId) + ', \'approved\', ' + ((batchNum - 1) * 20 + i) + ')\n';
        sql += '    ON CONFLICT DO NOTHING;\n\n';
    });
}

sql += 'END $$;';

fs.writeFileSync('import_all_cirrose.sql', sql);
console.log('SQL generated successfully for 200 questions.');
