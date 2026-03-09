
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkLevels() {
    const { data: nodes, error } = await supabase
        .from('taxonomia')
        .select('name, level');

    const names = ['Medicina', 'Clínica Médica', 'Cardiologia', 'Arritmias'];
    names.forEach(name => {
        const node = nodes.find(n => n.name === name);
        if (node) {
            console.log(`${name}: Level: ${node.level}`);
        } else {
            console.log(`${name}: Not found`);
        }
    });
}

checkLevels();
