const fs = require('fs');
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

const generateSql = (packageId, filename) => {
    const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    let values = data.map((q, i) => {
        // Prepare question text for escaping
        const q_str = JSON.stringify(q).replace(/'/g, "''");
        const hash = computeHash(q.enunciado || '');
        return `('${packageId}', '${q_str}'::jsonb, 'draft', '${hash}', ${i + 1})`;
    }).join(',\n');

    return `INSERT INTO public.concurso_package_questions (package_id, question_json, status, hash_logico, order_index) VALUES \n${values};`;
};

const sqlDI = generateSql('c78911de-9502-4184-8a96-c9d7e0d85e60', 'master_direitos_individuais_total_55.json');
const sqlSeg = generateSql('cdd9c27d-f85f-4593-b010-89216c0df69f', 'master_segurados_total_55.json');

fs.writeFileSync('inject_master.sql', sqlDI + '\n\n' + sqlSeg);
console.log('SQL generated successfully.');
