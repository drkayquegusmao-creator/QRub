
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPackageStructure() {
    console.log('Fetching package...');
    const { data, error } = await supabase
        .from('concurso_question_packages')
        .select(`*, banks:concurso_banks(name, slug), concurso_question_blueprints(name, format, blueprint_rules)`)
        .limit(1);

    if (error) {
        console.error('Error:', JSON.stringify(error, null, 2));
        return;
    }

    if (!data || data.length === 0) {
        console.log('No data found');
        return;
    }

    console.log('Keys in data[0]:', Object.keys(data[0]));
    console.log('Blueprints Value Type:', typeof data[0].concurso_question_blueprints);
    console.log('Is Blueprints Array?', Array.isArray(data[0].concurso_question_blueprints));
    console.log('Blueprints Value:', JSON.stringify(data[0].concurso_question_blueprints, null, 2));
}

checkPackageStructure();
