
const { execSync } = require('child_process');
for (let i = 1; i <= 15; i++) {
    try {
        console.log(`Processing batch ${i}...`);
        execSync(`node insert_questions.js ${i}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed on batch ${i}`);
    }
}
