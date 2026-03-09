
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkValidationStatus() {
    const { data } = await supabase.from('questao_base').select('status_validacao');
    const uniqueStatus = [...new Set(data.map(d => d.status_validacao))];
    console.log('Unique Validation Status:', uniqueStatus);
}

checkValidationStatus();
