
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkQuestionTags() {
    const { data: nodes } = await supabase
        .from('taxonomia')
        .select('id, name, level, parent_id')
        .ilike('name', 'Cardiologia');

    for (const node of nodes) {
        // Check in questao_base table
        // We check if any question has this node as area_id, tema_id, or subarea_id
        const { count: c1 } = await supabase.from('questao_base').select('*', { count: 'exact', head: true }).eq('area_id', node.id);
        const { count: c2 } = await supabase.from('questao_base').select('*', { count: 'exact', head: true }).eq('tema_id', node.id);
        const { count: c3 } = await supabase.from('questao_base').select('*', { count: 'exact', head: true }).eq('subarea_id', node.id);

        console.log(`Node: ${node.name}, Level: ${node.level}, ID: ${node.id}`);
        console.log(`Tagged as Area: ${c1}, Tema: ${c2}, Subarea: ${c3}`);
    }
}

checkQuestionTags();
