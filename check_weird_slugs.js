
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkSlugs() {
    const { data } = await supabase.from('taxonomia').select('slug');
    const weird = data.filter(d => d.slug.includes(' ') || d.slug.includes(',') || d.slug.includes('('));
    console.log('Weird Slugs:', weird);
}

checkSlugs();
