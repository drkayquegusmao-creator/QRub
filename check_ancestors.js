
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkAncestors() {
    const { data: ic } = await supabase.from('taxonomia').select('parent_id').eq('slug', 'insuficiencia-cardiaca').single();
    if (ic && ic.parent_id) {
        const { data: cardio } = await supabase.from('taxonomia').select('slug, name, parent_id').eq('id', ic.parent_id).single();
        if (cardio) {
            console.log('Cardiolga:', cardio);
            if (cardio.parent_id) {
                const { data: clinica } = await supabase.from('taxonomia').select('slug, name, parent_id').eq('id', cardio.parent_id).single();
                if (clinica) {
                    console.log('Clinica:', clinica);
                    if (clinica.parent_id) {
                        const { data: med } = await supabase.from('taxonomia').select('slug, name').eq('id', clinica.parent_id).single();
                        console.log('Med:', med);
                    }
                }
            }
        }
    }
}

checkAncestors();
