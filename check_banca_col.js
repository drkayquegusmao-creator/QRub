
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkColumns() {
    const { data } = await supabase.from('questao_base').select('*').limit(1);
    const keys = Object.keys(data[0]);
    console.log('Columns:', keys.join(','));
    console.log('Includes banca?', keys.includes('banca'));
}

checkColumns();
