
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSampleFields() {
    const { data } = await supabase.from('questao_base').select('course_id, specialty_id, subspecialty_id, subject_id, area_id, tema_id, subarea_id').limit(10);
    console.log(JSON.stringify(data, null, 2));
}

checkSampleFields();
