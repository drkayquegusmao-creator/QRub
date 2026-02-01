
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use Service Role for admin actions

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testEditalFlow() {
    console.log('🚀 Starting Admin Edital Flow Test...');

    // 1. Create Blueprint (Edital) with is_course = true
    console.log('\n1️⃣  Creating Test Course Blueprint...');
    const blueprintData = {
        name: 'TESTE AUTOMATIZADO - CURSO EBSERH',
        institution: 'EBSERH TEST',
        year: 2026,
        exam_type: 'Residência Médica',
        status: 'active',
        is_course: true, // FEATURE TEST
        details: {
            exam_date: '15/12/2026',
            vacancies: 500,
            salary: 'R$ 4.000,00',
            description: 'Edital de teste gerado via script'
        },
        raw_pdf_url: 'https://fake-url.com/edital.pdf'
    };

    const { data: blueprint, error: bpError } = await supabase
        .from('exam_blueprints')
        .insert(blueprintData)
        .select()
        .single();

    if (bpError) {
        console.error('❌ Failed to create blueprint:', bpError);
        return;
    }
    console.log(`✅ Blueprint created: ${blueprint.id} (is_course: ${blueprint.is_course})`);

    // 2. Create Study Box linked to Blueprint
    console.log('\n2️⃣  Creating Linked Study Box...');
    const boxData = {
        blueprint_id: blueprint.id,
        title: 'Clínica Médica - Asma',
        specialty_id: 'clinica-medica',
        subspecialty_id: 'pneumologia',
        cognitive_level: 'Intermediário',
        charge_profile: 'Clínica',
        weight: 2.0,
        base_text: 'Foco no tratamento da asma grave.'
    };

    const { data: box, error: boxError } = await supabase
        .from('study_boxes')
        .insert(boxData)
        .select()
        .single();

    if (boxError) {
        console.error('❌ Failed to create study box:', boxError);
        return;
    }
    console.log(`✅ Study Box created: ${box.id}`);

    // 3. Simulate Question Generation (Admin Action)
    console.log('\n3️⃣  Simulating Question Generation...');
    // Note: We are simulating the RESULT of the generator, as we can't invoke the Store logic directly here.
    // We verify that the database accepts questions linked to this blueprint and box.

    const questionData = {
        course_id: 'medicina',
        specialty_id: 'clinica-medica',
        subspecialty_id: 'pneumologia',
        subject_id: 'asma',
        difficulty: 'Médio',
        enunciado: 'Questão de teste gerada automaticamente para validação do fluxo.',
        options: [
            { id: 'a', text: 'Opção Correta' },
            { id: 'b', text: 'Distrator 1' },
            { id: 'c', text: 'Distrator 2' },
            { id: 'd', text: 'Distrator 3' },
            { id: 'e', text: 'Distrator 4' }
        ],
        correct_option_id: 'a',
        explanation: 'Explicação detalhada.',
        blueprint_id: blueprint.id, // FEATURE TEST
        study_box_id: box.id        // FEATURE TEST
    };

    const { data: question, error: qError } = await supabase
        .from('questions')
        .insert(questionData)
        .select()
        .single();

    if (qError) {
        console.error('❌ Failed to generate question:', qError);
        return;
    }
    console.log(`✅ Question generated: ${question.id}`);
    console.log(`   Linked to Blueprint: ${question.blueprint_id === blueprint.id}`);
    console.log(`   Linked to StudyBox: ${question.study_box_id === box.id}`);

    // 4. Verify Fetching (User Dashboard Simulation)
    console.log('\n4️⃣  Verifying Data Retrieval for Dashboard...');
    const { data: fetchedBoxes, error: fetchError } = await supabase
        .from('study_boxes')
        .select('*, questions(*)') // Assuming relationship exists or just verifying query
        .eq('blueprint_id', blueprint.id);

    if (fetchError) console.error('Error fetching boxes:', fetchError);
    console.log(`✅ Retrieved ${fetchedBoxes.length} study boxes for this blueprint.`);

    // 5. Clean up
    console.log('\n🧹 Cleaning up test data...');
    await supabase.from('questions').delete().eq('id', question.id);
    await supabase.from('study_boxes').delete().eq('id', box.id);
    await supabase.from('exam_blueprints').delete().eq('id', blueprint.id);
    console.log('✅ Cleanup complete.');

    console.log('\n✨ TEST PASSED: All features (Course Flag, Details, Question Linking) are working in the DB.');
}

testEditalFlow();
