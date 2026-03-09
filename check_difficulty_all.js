
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkDifficulty() {
    const { data: allData } = await supabase.from('questao_base').select('difficulty');
    const uniqueDiffs = [...new Set(allData.map(d => d.difficulty))];
    console.log('Unique Difficulties:', uniqueDiffs);
}

checkDifficulty();
