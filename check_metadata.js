
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkMetadata() {
    const { data } = await supabase.from('questao_base').select('metadata').limit(5);
    console.log(JSON.stringify(data, null, 2));
}

checkMetadata();
