
const { MEDICAL_HIERARCHY } = require('./src/lib/medical-specialties');

const assuntosParaCriar = [];

MEDICAL_HIERARCHY.forEach((course) => {
    if (course.specialties && Array.isArray(course.specialties)) {
        course.specialties.forEach((specialty) => {
            // Criar assunto para a especialidade principal
            assuntosParaCriar.push({
                nome: specialty.name,
                specialty_id: specialty.id,
                subspecialty_id: null,
                tema: null
            });

            // Criar assuntos para subespecialidades (se existirem)
            if (specialty.subspecialties && Array.isArray(specialty.subspecialties)) {
                specialty.subspecialties.forEach((subspecialty) => {
                    assuntosParaCriar.push({
                        nome: `${specialty.name} - ${subspecialty.name}`,
                        specialty_id: specialty.id,
                        subspecialty_id: subspecialty.id,
                        tema: subspecialty.name
                    });
                });
            }
        });
    }
});

let sql = "INSERT INTO assuntos (nome, specialty_id, subspecialty_id, tema) VALUES \n";
const values = assuntosParaCriar.map(a => {
    return `('${a.nome.replace(/'/g, "''")}', '${a.specialty_id}', ${a.subspecialty_id ? `'${a.subspecialty_id}'` : 'NULL'}, ${a.tema ? `'${a.tema.replace(/'/g, "''")}'` : 'NULL'})`;
});

sql += values.join(",\n") + ";";

console.log(sql);
