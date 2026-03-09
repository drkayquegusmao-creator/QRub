
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkBothCardios() {
    const { data: nodes, error } = await supabase
        .from('taxonomia')
        .select('id, name, level, parent_id')
        .ilike('name', 'Cardiologia');

    for (const node of nodes) {
        const { count, error: e } = await supabase
            .from('taxonomia')
            .select('*', { count: 'exact', head: true })
            .eq('parent_id', node.id);

        const { data: parent } = await supabase.from('taxonomia').select('name').eq('id', node.parent_id).single();

        console.log(`Node: ${node.name}, Level: ${node.level}, Parent: ${parent ? parent.name : 'NONE'}, Children Count: ${count}`);
    }
}

checkBothCardios();
