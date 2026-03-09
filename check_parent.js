
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkParent() {
    const { data: nodes, error } = await supabase
        .from('taxonomia')
        .select('id, name, level, parent_id');

    const cardiologia = nodes.find(n => n.name === 'Cardiologia');
    if (cardiologia && cardiologia.parent_id) {
        const parent = nodes.find(n => n.id === cardiologia.parent_id);
        console.log(`Cardiologia Parent: ${parent ? parent.name : 'Unknown'}`);
    } else {
        console.log('Cardiologia has no parent or not found.');
    }
}

checkParent();
