
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testInsert() {
    const payload = {
        id: 'QRB-TEST-V3',
        course_id: 'medicina',
        specialty_id: 'clinica-medica',
        subspecialty_id: 'cardiologia',
        subject_id: 'insuficiencia-cardiaca',
        enunciado: 'Questão de teste Antigravity V3',
        options: [
            { id: 'a', text: 'Opção A' },
            { id: 'b', text: 'Opção B' },
            { id: 'c', text: 'Opção C' },
            { id: 'd', text: 'Opção D' },
            { id: 'e', text: 'Opção E' }
        ],
        correct_option_id: 'a',
        explanation: 'Teste',
        status: 'active',
        status_validacao: 'APROVADA',
        source: 'TEST',
        year: 2024
    };

    const { data, error } = await supabase.from('questao_base').insert(payload).select('id');
    if (error) console.error(error);
    else console.log('SUCCESS:', data[0].id);
}

testInsert();
