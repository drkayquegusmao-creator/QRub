
const fs = require('fs');
let total = 0;
for (let i = 1; i <= 20; i++) {
    try {
        const data = JSON.parse(fs.readFileSync(`questions_ic_batch${i}.json`, 'utf8'));
        console.log(`Batch ${i}: ${data.length} questions`);
        total += data.length;
    } catch (e) {
        if (e.code !== 'ENOENT') console.log(`Batch ${i}: ERROR ${e.message}`);
    }
}
console.log(`Total: ${total}`);
