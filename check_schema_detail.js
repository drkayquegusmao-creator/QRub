
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSchemaDetail() {
    const { data } = await supabase.from('questao_base').select('*').limit(1);
    const keys = Object.keys(data[0]);
    fs.writeFileSync('schema_keys.json', JSON.stringify(keys, null, 2));
    console.log('Sample Data for one row:', JSON.stringify(data[0], null, 2));
}

checkSchemaDetail();
