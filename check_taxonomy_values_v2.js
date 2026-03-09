
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkValues() {
    const { data, error } = await supabase
        .from('questao_base')
        .select('specialty_id, subspecialty_id, subject_id, area_id, tema_id, subarea_id, source')
        .limit(5);

    if (error) {
        console.error(error);
        return;
    }

    console.log('Sample Data:', JSON.stringify(data, null, 2));
}

checkValues();
