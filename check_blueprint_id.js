
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkBlueprints() {
    const pkgId = '57ae3ba0-9032-4198-841e-18280b55e766';
    const { data: d1, error: e1 } = await supabase.from('blueprints').select('*').eq('id', pkgId).single();
    if (!e1) {
        console.log('Found in blueprints:', d1.name || d1.nome);
        return;
    }
    const { data: d2, error: e2 } = await supabase.from('blueprint').select('*').eq('id', pkgId).single();
    if (!e2) {
        console.log('Found in blueprint:', d2.name || d2.nome);
        return;
    }
    console.log('Not found in blueprints/blueprint');
}

checkBlueprints();
