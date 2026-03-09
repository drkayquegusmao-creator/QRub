
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testFilter() {
    // Simulated "Infectologia" selection
    const matchers = ["Infectologia", "infectologia"];
    const matchersJoined = `(${matchers.map(m => `"${m}"`).join(',')})`;
    const orConditions = [
        `specialty_id.in.${matchersJoined}`,
        `subspecialty_id.in.${matchersJoined}`,
        `subject_id.in.${matchersJoined}`,
        `area_id.in.${matchersJoined}`,
        `tema_id.in.${matchersJoined}`,
        `subarea_id.in.${matchersJoined}`
    ].join(',');

    const { count, error } = await supabase
        .from('questao_base')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active')
        .eq('status_validacao', 'APROVADA')
        .or(orConditions);

    if (error) console.error(error);
    else console.log('Count for Infectologia:', count);
}

testFilter();
