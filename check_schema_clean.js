
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSchema() {
    const { data, error } = await supabase
        .from('questao_base')
        .select('*')
        .limit(1);

    if (error) {
        console.error(error);
        return;
    }

    if (data && data.length > 0) {
        console.log('Columns:', JSON.stringify(Object.keys(data[0]), null, 2));
    } else {
        console.log('No data found in questao_base');
    }
}

checkSchema();
