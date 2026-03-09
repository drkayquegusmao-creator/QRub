const fs = require('fs');
const crypto = require('crypto');

// Usage: node json_to_sql.js <package_id> <json_file> <sql_output_file> <start_index>

const package_id = process.argv[2];
const jsonFile = process.argv[3];
const sqlFile = process.argv[4];
const startIndex = parseInt(process.argv[5], 10);

if (!package_id || !jsonFile || !sqlFile || isNaN(startIndex)) {
    console.error('Usage: node json_to_sql.js <package_id> <json_file> <sql_output_file> <start_index>');
    process.exit(1);
}

function getHash(text) {
    if (!text) return 'no-text-hash';
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
    return crypto.createHash('md5').update(normalized).digest('hex');
}

try {
    const rawData = fs.readFileSync(jsonFile, 'utf8');
    const questions = JSON.parse(rawData);

    if (!Array.isArray(questions)) {
        throw new Error('JSON file must contain an array of questions');
    }

    const sqlValues = questions.map((q, i) => {
        const q_json = JSON.stringify(q);
        const hash = getHash(q.enunciado);
        // Correctly handle single quotes for SQL
        const q_json_esc = q_json.replace(/'/g, "''");
        return `('${package_id}', '${q_json_esc}', '${hash}', ${i + startIndex}, 'draft')`;
    }).join(',\n');

    const sql = 'INSERT INTO package_questions (package_id, question_json, hash_logico, order_index, status) VALUES\n' + sqlValues + ';';
    fs.writeFileSync(sqlFile, sql);
    console.log(`Successfully generated ${sqlFile} for ${questions.length} questions starting at index ${startIndex}`);
} catch (error) {
    console.error('Error processing questions:', error.message);
    process.exit(1);
}
