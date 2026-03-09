
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkTaxonomy() {
    const { data, error } = await supabase
        .from('taxonomia')
        .select('id, name, slug')
        .limit(5);

    if (error) {
        console.error(error);
        return;
    }

    console.log('Taxonomy Data:', JSON.stringify(data, null, 2));
}

checkTaxonomy();
