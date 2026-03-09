
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function deactivateEmptyCardio() {
    // 1. Find the specialty Cardiologia under Medicina (level 2)
    const { data: nodes } = await supabase
        .from('taxonomia')
        .select('id, name, level, parent_id')
        .eq('name', 'Cardiologia')
        .eq('level', 'specialty');

    console.log('Nodes found:', nodes.length);

    for (const node of nodes) {
        // Double check it has no children
        const { count } = await supabase
            .from('taxonomia')
            .select('*', { count: 'exact', head: true })
            .eq('parent_id', node.id);

        if (count === 0) {
            console.log(`Deactivating empty Cardiologia node: ${node.id}`);
            const { error } = await supabase
                .from('taxonomia')
                .update({ active: false })
                .eq('id', node.id);

            if (error) console.error('Error deactivating:', error);
            else console.log('Successfully deactivated.');
        } else {
            console.log(`Node ${node.id} has ${count} children, skipping deactivation.`);
        }
    }
}

deactivateEmptyCardio();
