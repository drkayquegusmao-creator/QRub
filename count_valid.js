
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function countValid() {
    const { count: c1 } = await supabase.from('questao_base').select('*', { count: 'exact', head: true }).eq('status', 'active');
    const { count: c2 } = await supabase.from('questao_base').select('*', { count: 'exact', head: true }).eq('status_validacao', 'APROVADA');
    const { count: c3 } = await supabase.from('questao_base').select('*', { count: 'exact', head: true }).eq('status', 'active').eq('status_validacao', 'APROVADA');

    console.log('Active:', c1);
    console.log('Approved:', c2);
    console.log('Both:', c3);
}

countValid();
