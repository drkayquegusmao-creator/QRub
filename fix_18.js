
const fs = require('fs');

let f18 = fs.readFileSync('questions_ic_batch18.json', 'utf8');
f18 = f18.replace('"e": "Paciente saudável que corre 10 km.",', '"e": "Paciente saudável que corre 10 km."');
f18 = f18.replace('"enunciatedo":', '"enunciado":');
fs.writeFileSync('questions_ic_batch18.json', f18);

let f19 = fs.readFileSync('questions_ic_batch19.json', 'utf8');
// Fix whatever errors are in batch 19. Let's see what they are first.
// I will just use JSON parse internally.
