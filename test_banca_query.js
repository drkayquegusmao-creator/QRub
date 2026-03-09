
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testBanca() {
    const { count, error } = await supabase
        .from('questao_base')
        .select('*', { count: 'exact', head: true })
        .eq('banca', 'FGV');

    if (error) console.log('ERROR:', error);
    else console.log('COUNT:', count);
}

testBanca();
