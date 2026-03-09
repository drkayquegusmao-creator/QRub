
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listHierarchy() {
    const { data: nodes, error } = await supabase
        .from('taxonomia')
        .select('id, name, level, parent_id, active');

    if (error) {
        console.error(error);
        return;
    }

    const cardiologia = nodes.find(n => n.name === 'Cardiologia');
    if (cardiologia) {
        const sub = nodes.filter(n => n.parent_id === cardiologia.id);
        console.log(`Total children of Cardiologia:`, sub.length);
        console.log(`Active children of Cardiologia:`, sub.filter(n => n.active).length);
        if (sub.length > 0) {
            console.log('Sample children status:', sub.slice(0, 5).map(n => ({ name: n.name, active: n.active })));
        }
    }
}

listHierarchy();
