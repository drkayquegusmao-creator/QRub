
const { createClient } = require('@supabase/supabase-client');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const specMap = {
    'clinica-medica': {
        name: 'Clínica Médica',
        subjects: [
            { id: 'cardiologia', name: 'Cardiologia' },
            { id: 'endocrinologia', name: 'Endocrinologia' },
            { id: 'nefrologia', name: 'Nefrologia' }
        ]
    },
    'medicina-emergencia': {
        name: 'Medicina de Emergência',
        subjects: [
            { id: 'sepse-choque', name: 'Sepse e Choque Séptico' },
            { id: 'iam', name: 'Infarto Agudo do Miocárdio' },
            { id: 'trauma', name: 'Trauma' }
        ]
    }
};

async function generateBatch(specialtyId, count) {
    const spec = specMap[specialtyId];
    const generatedQuestions = [];

    for (let i = 0; i < count; i++) {
        const age = 18 + Math.floor(Math.random() * 65);
        const gender = Math.random() > 0.5 ? 'masculino' : 'feminino';
        const genderAdj = gender === 'masculino' ? 'o' : 'a';
        const subj = spec.subjects[Math.floor(Math.random() * spec.subjects.length)];

        const questionId = `QRUB-GEN-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`;

        const clinicalScenarios = [
            `Paciente de ${age} anos, sexo ${gender}, previamente hígid${genderAdj}, comparece ao pronto-socorro com quadro de início há 6 horas. Refere sintomatologia compatível com ${subj.name}. Ao exame físico: BEG, corad${genderAdj}, hidratad${genderAdj}, acianótic${genderAdj}, anictéric${genderAdj}. PA: ${115 + Math.floor(Math.random() * 50)}/${75 + Math.floor(Math.random() * 30)} mmHg, FC: ${70 + Math.floor(Math.random() * 40)} bpm, TAX: ${(36.5 + Math.random() * 2).toFixed(1).replace('.', ',')}°C, FR: ${16 + Math.floor(Math.random() * 8)} irpm. Exames complementares evidenciam alterações compatíveis com o diagnóstico diferencial de ${subj.name}. Diante do quadro, qual a conduta mais adequada?`,
            `Paciente de ${age} anos, sexo ${gender}, com história de tratamento para ${subj.name} há 3 meses, procura atendimento médico por piora do quadro clínico. Relata sintomas progressivos, incluindo manifestações específicas da especialidade. Ao exame: estado geral regular, sinais vitais com PA ${125 + Math.floor(Math.random() * 40)}/${80 + Math.floor(Math.random() * 25)} mmHg, FC ${75 + Math.floor(Math.random() * 35)} bpm, TAX: ${(36.5 + Math.random() * 1.5).toFixed(1).replace('.', ',')}°C. Exame físico segmentar revela achados compatíveis com a hipótese diagnóstica principal. Exames laboratoriais: Hemograma com Hb ${(11 + Math.random() * 3).toFixed(1).replace('.', ',')} g/dL, Leucócitos ${6000 + Math.floor(Math.random() * 8000)}/mm³, Plaquetas ${150000 + Math.floor(Math.random() * 200000)}/mm³. Qual o próximo passo na propedêutica deste paciente?`,
            `Paciente de ${age} anos, sexo ${gender}, admitid${genderAdj} na emergência com quadro agudo de ${subj.name}. Início súbito há 2 horas. Nega traumas ou uso de medicações. Ao exame: Glasgow ${13 + Math.floor(Math.random() * 3)}, pupilas isocóricas e fotorreagentes, ausência de sinais meníngeos. PA: ${105 + Math.floor(Math.random() * 60)}/${65 + Math.floor(Math.random() * 35)} mmHg, FC: ${80 + Math.floor(Math.random() * 40)} bpm, TAX: ${(36.2 + Math.random() * 1.2).toFixed(1).replace('.', ',')}°C, SatO2: ${92 + Math.floor(Math.random() * 8)}% em ar ambiente. Qual a principal hipótese diagnóstica e conduta imediata?`
        ];

        const distractorOptions = [
            `Conduta expectante com reavaliação em 48h`,
            `Iniciar tratamento sintomático isolado sem investigação complementar`,
            `Realizar procedimento invasivo sem estabilização prévia`,
            `Administrar medicação de primeira linha em dose subterapêutica`,
            `Encaminhar para especialista sem estabilização inicial`
        ];

        const correctAnswerText = `Iniciar protocolo terapêutico conforme diretriz brasileira atualizada de ${spec.name} (2024), com estabilização clínica e investigação complementar direcionada para ${subj.name}`;
        const allIds = ['a', 'b', 'c', 'd', 'e', 'f'].slice(0, 5);
        const correctIdx = Math.floor(Math.random() * 5);
        const correctId = allIds[correctIdx];

        const finalOptions = allIds.map((id, idx) => {
            if (id === correctId) return { id, text: correctAnswerText };
            return { id, text: distractorOptions[idx > correctIdx ? idx - 1 : idx] };
        });

        const altExplanations = {};
        allIds.forEach((id) => {
            if (id === correctId) return;
            altExplanations[id] = `INCORRETA. A conduta sugerida nesta alternativa não é apropriada neste contexto de ${subj.name}, pois o quadro exige abordagem imediata e baseada em evidências conforme diretrizes de ${spec.name}.`;
        });

        const question = {
            id: questionId,
            course_id: 'medicina',
            specialty_id: specialtyId,
            subspecialty_id: 'geral',
            subject_id: subj.id,
            difficulty: 'Médio',
            enunciado: clinicalScenarios[Math.floor(Math.random() * clinicalScenarios.length)],
            case_study: {
                history: `Paciente de ${age} anos, ${gender}, com quadro clínico compatível com ${subj.name}. Antecedentes pessoais: nega comorbidades prévias.`,
                physical_exam: `BEG, corad${genderAdj}, hidratad${genderAdj}, acianótic${genderAdj}, anictéric${genderAdj}. Sinais vitais: PA ${120 + Math.floor(Math.random() * 20)}/80 mmHg, FC 80 bpm.`,
                lab_results: `Hemograma: Hb ${(12 + Math.random() * 2).toFixed(1).replace('.', ',')} g/dL, Leucócitos ${6000 + Math.floor(Math.random() * 4000)}/mm³. Bioquímica: Creatinina normal.`
            },
            options: finalOptions,
            correct_option_id: correctId,
            explanation: `A alternativa ${correctId.toUpperCase()} está CORRETA pois representa a conduta padrão-ouro segundo as diretrizes brasileiras atualizadas de ${spec.name} (2024). O quadro clínico apresentado evidencia critérios diagnósticos para ${subj.name}.`,
            alternative_explanations: altExplanations,
            metadata: {
                origem: 'Gerada via Dr. QRub IA',
                data_geracao: new Date().toISOString(),
                tema: subj.name
            }
        };

        generatedQuestions.push(question);
    }

    const { error } = await supabase.from('questions').insert(generatedQuestions);
    if (error) {
        console.error(`Error inserting batch for ${specialtyId}:`, error);
    } else {
        console.log(`Successfully generated ${count} questions for ${specialtyId}`);
    }
}

async function main() {
    await generateBatch('clinica-medica', 50);
    await generateBatch('medicina-emergencia', 50);
    console.log("Seeding completed!");
}

main();
