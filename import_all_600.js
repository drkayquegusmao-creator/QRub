
const fs = require('fs');

const TAXONOMY = {
    TB: {
        specialty_id: 'd6782401-1302-41a0-9a23-c879ededd6b8', // Infectologia
        subspecialty_id: 'd6782401-1302-41a0-9a23-c879ededd6b8',
        subject_id: '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', // Tuberculose
        package_id: '44bb9f70-13d0-42e0-808e-8ded933cea6a',
        prefix: 'FGV-TB-',
        files: 55,
        filePrefix: 'batch_fgv_tuberculose_part'
    },
    TIR: {
        specialty_id: 'fa6919ef-d143-474f-838b-0b0f39b52f0d', // Endocrinologia
        subspecialty_id: 'fa6919ef-d143-474f-838b-0b0f39b52f0d',
        subject_id: '0e8afdbd-831a-409b-a6d9-3676c56426d0', // Tireoide
        package_id: 'f90b96f6-66b4-47e6-a80f-e0cc70c17f71',
        prefix: 'FGV-TIR-',
        files: 12,
        filePrefix: 'batch_fgv_tireoide_part'
    }
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

const escapeSql = (str) => {
    if (typeof str !== 'string') return "''";
    return "'" + str.replace(/'/g, "''") + "'";
}

let sql = 'DO $$\nDECLARE\n    current_q_id TEXT;\nBEGIN\n';

for (const [key, config] of Object.entries(TAXONOMY)) {
    console.log(`Processing ${key}...`);
    let globalCounter = 0;
    
    for (let i = 1; i <= config.files; i++) {
        const f = config.filePrefix + i + '.json';
        if (!fs.existsSync(f)) continue;
        
        const questions = JSON.parse(fs.readFileSync(f, 'utf8'));
        questions.forEach(q => {
            const hash = computeHash(q.enunciado);
            const questionId = config.prefix + hash;
            const optionsArr = q.options ? Object.entries(q.options).map(([k, v]) => ({ id: k, text: v })) : [];
            const optionsJson = JSON.stringify(optionsArr);
            const altExplanations = JSON.stringify(q.option_rationales || {});
            const metadata = JSON.stringify({ package_id: config.package_id, tags: q.tags || [], batch: i });

            sql += `    -- ${key} Q${globalCounter + 1} (Part ${i})\n`;
            sql += `    INSERT INTO questao_base (\n`;
            sql += `        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,\n`;
            sql += `        enunciado, options, correct_option_id, explanation, alternative_explanations,\n`;
            sql += `        difficulty, status, status_validacao, fonte, hash, metadata\n`;
            sql += `    ) VALUES (\n`;
            sql += `        ${escapeSql(questionId)}, 'medicina', 'clinica-medica', '${config.specialty_id}', '${config.subspecialty_id}', '${config.subject_id}', '${config.subject_id}',\n`;
            sql += `        ${escapeSql(q.enunciado)}, ${escapeSql(optionsJson)}, ${escapeSql(q.answer)}, \n`;
            sql += `        ${escapeSql(q.rationale)}, ${escapeSql(altExplanations)}, \n`;
            sql += `        ${escapeSql(q.difficulty || 'média')}, 'active', 'APROVADA', 'gerada_qrub', ${escapeSql(hash)}, ${escapeSql(metadata)}\n`;
            sql += `    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, \n`;
            sql += `        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, \n`;
            sql += `        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;\n\n`;

            sql += `    INSERT INTO package_questions (package_id, question_id, status, order_index)\n`;
            sql += `    VALUES ('${config.package_id}', ${escapeSql(questionId)}, 'approved', ${globalCounter})\n`;
            sql += `    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';\n\n`;

            globalCounter++;
        });
    }
    console.log(`Finished ${key}: ${globalCounter} questions.`);
}

sql += 'END $$;';

fs.writeFileSync('import_all_600.sql', sql);
console.log('Final SQL generated for 600 questions.');
