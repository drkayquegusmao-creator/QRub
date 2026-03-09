
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

    console.log('Cardiologia matches:', nodes);

    for (const node of nodes) {
        if (node.parent_id) {
            const { data: parent } = await supabase.from('taxonomia').select('name').eq('id', node.parent_id).single();
            console.log(`Node: ${node.name} (Level: ${node.level}), Parent: ${parent ? parent.name : 'Unknown'}`);
        } else {
            console.log(`Node: ${node.name} (Level: ${node.level}), Parent: NONE`);
        }
    }
}

findCardio();
