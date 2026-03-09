
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkColumns() {
    const { data, error } = await supabase.rpc('get_table_columns', { t_name: 'questao_base' });
    if (error) {
        // Fallback to direct query if RPC doesn't exist
        const { data: d2, error: e2 } = await supabase.from('questao_base').select('*').limit(0);
        if (e2) console.error(e2);
        else console.log('Columns from select *:', Object.keys(d2));
    } else {
        console.log(data);
    }
}

checkColumns();
