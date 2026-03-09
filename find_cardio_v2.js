
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
        .ilike('name', '%Cardiologia%');

    if (error) {
        console.error(error);
        return;
    }

    console.log(`FOUND_NODES:${nodes.length}`);
    for (const node of nodes) {
        let parentName = 'NONE';
        if (node.parent_id) {
            const { data: parent } = await supabase.from('taxonomia').select('name').eq('id', node.parent_id).single();
            parentName = parent ? parent.name : 'Unknown';
        }
        console.log(`NODE:${node.name}:LEVEL:${node.level}:PARENT:${parentName}:ID:${node.id}`);
    }
}

findCardio();
