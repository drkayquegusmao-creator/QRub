
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
        console.log(`TOTAL_CHILDREN:${sub.length}`);
        console.log(`ACTIVE_CHILDREN:${sub.filter(n => n.active).length}`);
        sub.slice(0, 10).forEach(n => {
            console.log(`CHILD:${n.name}:ACTIVE:${n.active}`);
        });
    }
}

listHierarchy();
