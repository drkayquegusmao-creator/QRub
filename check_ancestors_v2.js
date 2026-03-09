
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkAncestors() {
    let output = {};
    const { data: ic } = await supabase.from('taxonomia').select('parent_id').eq('slug', 'insuficiencia-cardiaca').single();
    if (ic && ic.parent_id) {
        const { data: cardio } = await supabase.from('taxonomia').select('slug, name, parent_id').eq('id', ic.parent_id).single();
        if (cardio) {
            output.cardio = cardio;
            if (cardio.parent_id) {
                const { data: clinica } = await supabase.from('taxonomia').select('slug, name, parent_id').eq('id', cardio.parent_id).single();
                if (clinica) {
                    output.clinica = clinica;
                    if (clinica.parent_id) {
                        const { data: med } = await supabase.from('taxonomia').select('slug, name').eq('id', clinica.parent_id).single();
                        output.med = med;
                    }
                }
            }
        }
    }
    fs.writeFileSync('ancestors.json', JSON.stringify(output, null, 2));
}

checkAncestors();
