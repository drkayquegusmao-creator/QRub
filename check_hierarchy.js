
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listHierarchy() {
    const { data: nodes, error } = await supabase
        .from('taxonomia')
        .select('id, name, level, parent_id');

    if (error) {
        console.error(error);
        return;
    }

    console.log('Total nodes:', nodes.length);

    const specialties = nodes.filter(n => n.level === 'specialty');
    console.log('Specialties:', specialties.map(s => s.name));

    const cardiologia = nodes.find(n => n.name === 'Cardiologia');
    if (cardiologia) {
        const sub = nodes.filter(n => n.parent_id === cardiologia.id);
        console.log(`Children of Cardiologia (${cardiologia.id}):`, sub.map(s => `${s.name} (${s.level})`));
    }
}

listHierarchy();
