
const fs = require('fs');
let allQuestions = [];
for (let i = 1; i <= 19; i++) {
    const data = JSON.parse(fs.readFileSync(`questions_ic_batch${i}.json`, 'utf8'));
    allQuestions = allQuestions.concat(data);
}
fs.writeFileSync('questions_ic_full.json', JSON.stringify(allQuestions, null, 2));
console.log(`Merged ${allQuestions.length} questions into questions_ic_full.json`);
