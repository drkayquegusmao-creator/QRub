
const fs = require('fs');
const path = require('path');

const MEDICAL_HIERARCHY = [
    {
        id: 'medicina',
        name: 'Medicina',
        specialties: [
            // ESPECIALIDADES BÁSICAS
            {
                id: 'clinica-medica', name: 'Clínica Médica', category: 'Especialidades Básicas', subspecialties: [
                    { id: 'cardiologia', name: 'Cardiologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'endocrinologia', name: 'Endocrinologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'gastroenterologia', name: 'Gastroenterologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'geriatria', name: 'Geriatria', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'hematologia', name: 'Hematologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'infectologia', name: 'Infectologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'nefrologia', name: 'Nefrologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'pneumologia', name: 'Pneumologia', subjects: [{ id: 'CM-PNEUMO-TEP', name: 'Tromboembolismo Pulmonar (TEP)' }] },
                    { id: 'reumatologia', name: 'Reumatologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'oncologia-clinica', name: 'Oncologia Clínica', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            { id: 'cirurgia-geral', name: 'Cirurgia Geral', category: 'Especialidades Básicas', subspecialties: [] },
            {
                id: 'pediatria', name: 'Pediatria', category: 'Especialidades Básicas', subspecialties: [
                    { id: 'neonatologia', name: 'Neonatologia', subjects: [{ id: 'PED-NEO-SEPSE', name: 'Sepse Neonatal' }] },
                    { id: 'cardiologia-pediatrica', name: 'Cardiologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'endocrinologia-pediatrica', name: 'Endocrinologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'gastroenterologia-pediatrica', name: 'Gastroenterologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'nefrologia-pediatrica', name: 'Nefrologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'pneumologia-pediatrica', name: 'Pneumologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'terapia-intensiva-pediatrica', name: 'Terapia Intensiva Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'alergia-imunologia-pediatrica', name: 'Alergia e Imunologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            {
                id: 'ginecologia-obstetricia', name: 'Ginecologia e Obstetrícia', category: 'Especialidades Básicas', subspecialties: [
                    { id: 'reproducao-humana', name: 'Reprodução Humana', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'medicina-fetal', name: 'Medicina Fetal', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'endoscopia-ginecologica', name: 'Endoscopia Ginecológica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'uroginecologia', name: 'Uroginecologia', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            { id: 'medicina-familia-comunidade', name: 'Medicina de Família e Comunidade', category: 'Especialidades Básicas', subspecialties: [] },
            { id: 'alergia-imunologia', name: 'Alergia e Imunologia', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'angiologia', name: 'Angiologia', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'cardiologia-clinica', name: 'Cardiologia', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'dermatologia', name: 'Dermatologia', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'endocrinologia-metabologia', name: 'Endocrinologia e Metabologia', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'gastroenterologia-clinica', name: 'Gastroenterologia', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'geriatria-clinica', name: 'Geriatria', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'hematologia-hemoterapia', name: 'Hematologia e Hemoterapia', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'infectologia-clinica', name: 'Infectologia', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'nefrologia-clinica', name: 'Nefrologia', category: 'Especialidades Clínicas', subspecialties: [] },
            {
                id: 'neurologia', name: 'Neurologia', category: 'Especialidades Clínicas', subspecialties: [
                    { id: 'neurologia-pediatrica', name: 'Neurologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'neurofisiologia-clinica', name: 'Neurofisiologia Clínica', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            { id: 'oncologia-clinica-espec', name: 'Oncologia Clínica', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'pneumologia-clinica', name: 'Pneumologia', category: 'Especialidades Clínicas', subspecialties: [] },
            {
                id: 'psiquiatria', name: 'Psiquiatria', category: 'Especialidades Clínicas', subspecialties: [
                    { id: 'psiquiatria-infancia-adolescencia', name: 'Psiquiatria da Infância e Adolescência', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'dependencia-quimica', name: 'Dependência Química', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'psicogeriatria', name: 'Psicogeriatria', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'psiquiatria-forense', name: 'Psiquiatria Forense', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            { id: 'reumatologia-clinica', name: 'Reumatologia', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'medicina-trabalho', name: 'Medicina do Trabalho', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'medicina-esportiva', name: 'Medicina Esportiva', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'medicina-fisica-reabilitacao', name: 'Medicina Física e Reabilitação', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'medicina-preventiva-social', name: 'Medicina Preventiva e Social', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'genetica-medica', name: 'Genética Médica', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'medicina-intensiva', name: 'Medicina Intensiva', category: 'Especialidades Clínicas', subspecialties: [] },
            {
                id: 'medicina-emergencia', name: 'Medicina de Emergência', category: 'Especialidades Clínicas', subspecialties: [
                    {
                        id: 'emergencias-clinicas', name: 'Emergências Clínicas', subjects: [
                            { id: 'sepse-choque', name: 'Sepse e Choque Séptico' },
                            { id: 'insuficiencia-respiratoria', name: 'Insuficiência Respiratória' },
                            { id: 'equilibrio-acido-base', name: 'Distúrbios Ácido-Base' },
                            { id: 'emergencias-endocrinas', name: 'Emergências Endócrinas' }
                        ]
                    },
                    {
                        id: 'emergencias-cardiovasculares', name: 'Emergências Cardiovasculares', subjects: [
                            { id: 'iam', name: 'Infarto Agudo do Miocárdio' },
                            { id: 'arritmias', name: 'Arritmias Cardíacas' },
                            { id: 'edema-pulmao', name: 'Edema Agudo de Pulmão' },
                            { id: 'crise-hipertensiva', name: 'Crise Hipertensiva' }
                        ]
                    },
                    {
                        id: 'trauma', name: 'Trauma', subjects: [
                            { id: 'atls', name: 'Atendimento Inicial (ATLS)' },
                            { id: 'tce', name: 'Traumatismo Cranioencefálico' },
                            { id: 'trauma-toracico', name: 'Trauma Torácico' },
                            { id: 'trauma-abdominal', name: 'Trauma Abdominal' }
                        ]
                    },
                    {
                        id: 'emergencias-neurologicas', name: 'Emergências Neurológicas', subjects: [
                            { id: 'ave', name: 'Acidente Vascular Encefálico' },
                            { id: 'estado-mal-epileptico', name: 'Estado de Mal Epiléptico' },
                            { id: 'coma', name: 'Coma e Rebaixamento do Nível de Consciência' }
                        ]
                    }
                ]
            },
            { id: 'medicina-sono', name: 'Medicina do Sono', category: 'Especialidades Clínicas', subspecialties: [] },
            { id: 'cirurgia-cardiovascular', name: 'Cirurgia Cardiovascular', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'cirurgia-mao', name: 'Cirurgia da Mão', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'cirurgia-cabeca-pescoco', name: 'Cirurgia de Cabeça e Pescoço', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'cirurgia-aparelho-digestivo', name: 'Cirurgia do Aparelho Digestivo', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'cirurgia-pediatrica', name: 'Cirurgia Pediátrica', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'cirurgia-plastica', name: 'Cirurgia Plástica', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'cirurgia-toracica', name: 'Cirurgia Torácica', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'cirurgia-vascular', name: 'Cirurgia Vascular', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'coloproctologia', name: 'Coloproctologia', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'mastologia', name: 'Mastologia', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'neurocirurgia', name: 'Neurocirurgia', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'oftalmologia', name: 'Oftalmologia', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            {
                id: 'ortopedia-traumatologia', name: 'Ortopedia e Traumatologia', category: 'Especialidades Cirúrgicas', subspecialties: [
                    { id: 'cirurgia-joelho', name: 'Cirurgia do Joelho', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'cirurgia-quadril', name: 'Cirurgia do Quadril', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'cirurgia-coluna', name: 'Cirurgia da Coluna', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'cirurgia-ombro-cotovelo', name: 'Cirurgia do Ombro e Cotovelo', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'ortopedia-pediatrica', name: 'Ortopedia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'medicina-esporte-orto', name: 'Medicina do Esporte', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            { id: 'otorrinolaringologia', name: 'Otorrinolaringologia', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'urologia', name: 'Urologia', category: 'Especialidades Cirúrgicas', subspecialties: [] },
            { id: 'anestesiologia', name: 'Anestesiologia', category: 'Apoio Diagnóstico e Terapêutico', subspecialties: [] },
            { id: 'patologia', name: 'Patologia', category: 'Apoio Diagnóstico e Terapêutico', subspecialties: [] },
            { id: 'patologia-clinica', name: 'Patologia Clínica / Medicina Laboratorial', category: 'Apoio Diagnóstico e Terapêutico', subspecialties: [] },
            { id: 'radiologia', name: 'Radiologia e Diagnóstico por Imagem', category: 'Apoio Diagnóstico e Terapêutico', subspecialties: [] },
            { id: 'radioterapia', name: 'Radioterapia', category: 'Apoio Diagnóstico e Terapêutico', subspecialties: [] },
            { id: 'medicina-nuclear', name: 'Medicina Nuclear', category: 'Apoio Diagnóstico e Terapêutico', subspecialties: [] }
        ]
    }
];

// Helper to generate UUIDs
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let sql = `
DO $$ 
DECLARE 
    course_id UUID;
    spec_id UUID;
    sub_id UUID;
BEGIN
    -- Clear table
    DELETE FROM public.taxonomia;
`;

MEDICAL_HIERARCHY.forEach(course => {
    sql += `
    -- Course: ${course.name}
    INSERT INTO public.taxonomia (id, slug, name, level, active) 
    VALUES (gen_random_uuid(), '${course.id}', '${course.name}', 'course', true) 
    RETURNING id INTO course_id;
    `;

    course.specialties.forEach(spec => {
        sql += `
        -- Specialty: ${spec.name}
        INSERT INTO public.taxonomia (id, slug, name, parent_id, level, active, metadata) 
        VALUES (gen_random_uuid(), '${spec.id}', '${spec.name}', course_id, 'specialty', true, '{"category": "${spec.category}"}'::jsonb) 
        RETURNING id INTO spec_id;
        `;

        spec.subspecialties.forEach(sub => {
            sql += `
            -- Subspecialty: ${sub.name}
            INSERT INTO public.taxonomia (id, slug, name, parent_id, level, active) 
            VALUES (gen_random_uuid(), '${sub.id}', '${sub.name}', spec_id, 'subspecialty', true) 
            RETURNING id INTO sub_id;
            `;

            if (sub.subjects) {
                sub.subjects.forEach(subj => {
                    sql += `
                    -- Subject: ${subj.name}
                    INSERT INTO public.taxonomia (id, slug, name, parent_id, level, active) 
                    VALUES (gen_random_uuid(), '${subj.id}', '${subj.name}', sub_id, 'subject', true);
                    `;
                });
            }
        });
    });
});

sql += `
END $$;
`;

fs.writeFileSync(path.join(__dirname, 'seed_taxonomy.sql'), sql);
console.log('SQL generated at scripts/seed_taxonomy.sql');
