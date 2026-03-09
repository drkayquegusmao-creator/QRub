
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSources() {
    const { data } = await supabase.from('questao_base').select('source');
    const sources = [...new Set(data.filter(d => d.source).map(d => d.source))];
    console.log('Unique Sources:', sources);
}

checkSources();
