
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function cloneRow() {
    const { data: source } = await supabase.from('questao_base').select('*').limit(1).single();
    if (!source) return;

    const payload = {
        ...source,
        id: 'QRB-CLONE-' + Date.now(),
        enunciado: source.enunciado + ' (CLONE)'
    };
    // remove created_at if it's auto-generated
    delete payload.created_at;

    const { data, error } = await supabase.from('questao_base').insert(payload).select('id');
    if (error) console.error(error);
    else console.log('SUCCESS:', data[0].id);
}

cloneRow();
