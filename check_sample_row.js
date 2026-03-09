
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSampleRow() {
    const { data } = await supabase.from('questao_base').select('*').limit(1);
    fs.writeFileSync('sample_row.json', JSON.stringify(data[0], null, 2));
}

checkSampleRow();
