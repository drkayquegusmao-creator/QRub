
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSession(id) {
    const { data, error } = await supabase
        .from('training_sessions')
        .select('*')
        .limit(1);

    if (data) console.log('Session Keys:', Object.keys(data[0]));
}

checkSession();
