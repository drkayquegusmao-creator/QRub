
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function findIC() {
    const { data: nodes } = await supabase
        .from('taxonomia')
        .select('id, name, level')
        .eq('name', 'Insuficiência Cardíaca');

    nodes.forEach(n => {
        process.stdout.write(`FULL_ID:${n.id}\n`);
    });
}

findIC();
