
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkIC() {
    const { data } = await supabase.from('taxonomia').select('slug').eq('id', '4216d73d-72e4-4944-9bee-4fc22c65853e').single();
    if (data) console.log('Slug:', data.slug);
}

checkIC();
