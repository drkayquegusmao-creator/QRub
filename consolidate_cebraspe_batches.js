const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const topics = ['direitos_individuais', 'segurados'];

console.log('Iniciando consolidação dos lotes CEBRASPE...');

topics.forEach(topic => {
  let masterArray = [];
  let filesFound = 0;

  for (let i = 1; i <= 10; i++) {
    const fileName = `cebraspe_${topic}_batch${i}.json`;
    const filePath = path.join(baseDir, fileName);

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(fileContent);
        
        if (Array.isArray(parsedData)) {
          masterArray = masterArray.concat(parsedData);
          filesFound++;
        }
      } catch (e) {
        console.error(`Erro ao ler/parsear ${fileName}:`, e.message);
      }
    }
  }

  if (masterArray.length > 0) {
    const masterFileName = `master_${topic}_total_${masterArray.length}.json`;
    const masterFilePath = path.join(baseDir, masterFileName);
    fs.writeFileSync(masterFilePath, JSON.stringify(masterArray, null, 2));
    console.log(`✅ ${masterFileName} gerado com sucesso! Contém ${masterArray.length} questões. (Consolidou ${filesFound} lotes).`);
  } else {
    console.log(`Nenhuma questão encontrada para o tópico: ${topic}`);
  }
});
console.log('Processo finalizado.');
