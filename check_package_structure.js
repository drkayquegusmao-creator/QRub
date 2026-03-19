
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPackageStructure() {
    const { data, error } = await supabase
        .from('concurso_question_packages')
        .select(`*, banks:concurso_banks(name, slug), concurso_question_blueprints(name, format, blueprint_rules)`)
        .limit(1);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('Package Structure:', JSON.stringify(data[0], null, 2));
}

checkPackageStructure();
