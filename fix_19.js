
const fs = require('fs');
let f = fs.readFileSync('questions_ic_batch19.json', 'utf8');
f = f.replace('"e": "Paciente saudável que corre 10 km.",', '"e": "Paciente saudável que corre 10 km."');
f = f.replace('"enunciatedo":', '"enunciado":');
fs.writeFileSync('questions_ic_batch19.json', f);
