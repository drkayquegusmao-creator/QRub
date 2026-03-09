
const { execSync } = require('child_process');
for (let i = 1; i <= 19; i++) {
    try {
        console.log(`Processing batch ${i} to questao_base...`);
        execSync(`node insert_questions_to_base.js ${i}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed on batch ${i}`);
    }
}
console.log('All questions processed.');
