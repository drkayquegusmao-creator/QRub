
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkCorrectOptionId() {
    const { data } = await supabase.from('questao_base').select('correct_option_id').limit(1);
    if (data && data[0]) console.log('Correct Option ID:', data[0].correct_option_id);
}

checkCorrectOptionId();
