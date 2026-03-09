
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkCardio() {
    const { data } = await supabase
        .from('questao_base')
        .select('*')
        .or('specialty_id.eq.cardiologia,subarea_id.eq.cardiologia,tema_id.eq.cardiologia')
        .limit(1);

    console.log('Question:', JSON.stringify(data, null, 2));
}

checkCardio();
