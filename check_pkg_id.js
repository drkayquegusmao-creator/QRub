
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPackage() {
    const pkgId = '57ae3ba0-9032-4198-841e-18280b55e766';
    const { data, error } = await supabase.from('pacotes').select('*').eq('id', pkgId).single();
    if (error) {
        console.error('Error finding package in pacotes:', error);
        // Try 'pacote'
        const { data: d2, error: e2 } = await supabase.from('pacote').select('*').eq('id', pkgId).single();
        if (e2) console.error('Error finding package in pacote:', e2);
        else console.log('Found in pacote:', d2.nome);
    } else {
        console.log('Found in pacotes:', data.nome);
    }
}

checkPackage();
