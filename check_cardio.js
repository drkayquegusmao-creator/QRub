
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkCardio() {
    console.log('Using URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

    const { data: cardio, error: e1 } = await supabase
        .from('taxonomia')
        .select('*')
        .or('slug.eq.cardiologia,name.eq.Cardiologia');

    if (e1) {
        console.error('Error finding cardio:', e1);
        return;
    }

    console.log('Cardio node(s):', cardio);

    if (cardio && cardio.length > 0) {
        for (const c of cardio) {
            const { data: children, error: e2 } = await supabase
                .from('taxonomia')
                .select('*')
                .eq('parent_id', c.id);

            if (e2) {
                console.error(`Error finding children for ${c.name}:`, e2);
            } else {
                console.log(`Children of ${c.name} (${c.id}, Level: ${c.level}):`, children.length);
                if (children.length > 0) {
                    console.log('First 5 children:', children.slice(0, 5).map(n => n.name));
                }
            }
        }
    } else {
        console.log('No Cardiologia node found in taxonomia table.');
    }
}

checkCardio();
