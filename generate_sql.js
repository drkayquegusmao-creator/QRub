const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./batch_manual.json', 'utf8'));

function computeHash(text) {
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim()
    let hash = 0
    for (let i = 0; i < normalized.length; i++) {
        hash = ((hash << 5) - hash) + normalized.charCodeAt(i)
        hash = hash & hash
    }
    return Math.abs(hash).toString(36)
}

let sql = `INSERT INTO concurso_package_questions (package_id, question_json, status, hash_logico, order_index) VALUES\n`;
const packageId = 'E1445D06-0ADF-49D9-90DE-9143B95959F8'.toLowerCase();

const values = data.map((q, idx) => {
    const normalized = {
        enunciado: q.enunciado || q.stem || '',
        options: q.options || q.alternativas || {},
        answer: (q.answer || q.gabarito || '').toLowerCase(),
        rationale: q.rationale || q.justificativa || '',
        difficulty: q.difficulty || 'media',
        tags: q.tags || []
    };
    const hash = computeHash(normalized.enunciado);
    const jsonStr = JSON.stringify(normalized).replace(/'/g, "''");
    return `('${packageId}', '${jsonStr}'::jsonb, 'draft', '${hash}', ${idx})`;
});

sql += values.join(',\n') + ';';

fs.writeFileSync('insert_manual.sql', sql);
console.log('SQL file created: insert_manual.sql');
