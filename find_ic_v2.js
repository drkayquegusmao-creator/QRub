
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function findIC() {
    const { data: nodes } = await supabase
        .from('taxonomia')
        .select('id, name, level, parent_id')
        .ilike('name', 'Insuficiência Cardíaca');

    for (const node of nodes) {
        console.log(`ID: ${node.id}, Name: ${node.name}, Level: ${node.level}`);
    }
}

findIC();
