
const fs = require('fs');

function processBatch(filePath) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const values = data.map(q => {
        const options = JSON.stringify(q.options).replace(/'/g, "''");
        const metadata = JSON.stringify(q.metadata || {}).replace(/'/g, "''");
        const enunciado = q.enunciado.replace(/'/g, "''");
        const explanation = q.explanation ? q.explanation.replace(/'/g, "''") : '';

        return `('${q.id}', '${q.course_id}', '${q.specialty_id}', '${q.subspecialty_id || ''}', '${q.subject_id || ''}', '${q.difficulty}', '${enunciado}', '${options}', '${q.correct_option_id}', '${explanation}', '${metadata}', 'ia', 'APROVADA')`;
    });

    return `INSERT INTO questions (id, course_id, specialty_id, subspecialty_id, subject_id, difficulty, enunciado, options, correct_option_id, explanation, metadata, fonte, status_validacao) VALUES \n${values.join(",\n")} \nON CONFLICT (id) DO NOTHING;`;
}

const ebserhSql = processBatch('ebserh_2026_batch.json');
fs.writeFileSync('ebserh_questions.sql', ebserhSql);

try {
    const massSql = processBatch('mass_batch_questions.json');
    fs.writeFileSync('mass_questions.sql', massSql);
} catch (e) {
    console.log("Mass batch error or too big to process in one go:", e.message);
}
