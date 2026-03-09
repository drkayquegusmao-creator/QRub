
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function findCardio() {
    const { data: nodes, error } = await supabase
        .from('taxonomia')
        .select('id, name, level, parent_id')
        .ilike('name', 'Cardiologia');

    console.log('Count:', nodes.length);
    for (const node of nodes) {
        console.log('---');
        console.log('ID:', node.id);
        console.log('Name:', node.name);
        console.log('Level:', node.level);
        console.log('ParentID:', node.parent_id);
    }
}

findCardio();
