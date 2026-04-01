const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('import_tbc.json', 'utf8'));
const packageId = '44bb9f70-13d0-42e0-808e-8ded933cea6a';
const subjectSlug = 'tuberculose';
const specialtySlug = 'infectologia';

function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    if (typeof str === 'object') return `'${JSON.stringify(str).replace(/'/g, "''")}'`;
    return `'${String(str).replace(/'/g, "''")}'`;
}

let sql = `DO $$\nDECLARE\n    p_id UUID := ${escapeSql(packageId)};\nBEGIN\n`;

questions.forEach((q, i) => {
    const questionId = q.id;
    const metadata = {
        package_id: packageId,
        tags: q.tags,
        source: 'qrub_generator_v2'
    };

    sql += `    -- Q${i + 1}\n`;
    sql += '    INSERT INTO questao_base (\n';
    sql += '        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,\n';
    sql += '        enunciado, options, correct_option_id, explanation, alternative_explanations,\n';
    sql += '        difficulty, status, status_validacao, fonte, hash, metadata\n';
    sql += '    ) VALUES (\n';
    sql += `        ${escapeSql(questionId)}, 'medicina', 'clinica-medica', ${escapeSql(specialtySlug)}, ${escapeSql(specialtySlug)}, ${escapeSql(subjectSlug)}, ${escapeSql(subjectSlug)},\n`;
    sql += `        ${escapeSql(q.enunciado)}, ${escapeSql(q.options)}, ${escapeSql(q.correct_option_id)}, ${escapeSql(q.explanation)}, ${escapeSql(q.alternative_explanations)},\n`;
    sql += `        ${escapeSql(q.difficulty)}, 'active', 'APROVADA', 'gerada_qrub', ${escapeSql(q.hash)}, ${escapeSql(metadata)}\n`;
    sql += '    ) ON CONFLICT (id) DO UPDATE SET status_validacao = \'APROVADA\', metadata = EXCLUDED.metadata;\n\n';

    sql += '    INSERT INTO package_questions (package_id, question_id, status, order_index)\n';
    sql += `    SELECT p_id, ${escapeSql(questionId)}, 'approved', ${i}\n`;
    sql += `    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = ${escapeSql(questionId)});\n\n`;
});

sql += 'END $$;';

fs.writeFileSync('import_tbc.sql', sql);
console.log('SQL generated successfully for Infectologia - Tuberculose.');
