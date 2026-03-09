
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPackageTables() {
    // Try to guess table names
    const tables = ['pacote_questoes', 'package_questions', 'questoes_pacote'];
    for (const t of tables) {
        const { error } = await supabase.from(t).select('count(*)').limit(1);
        if (!error) {
            console.log(`Table exists: ${t}`);
            // Check columns
            const { data } = await supabase.from(t).select('*').limit(1);
            if (data && data.length > 0) {
                console.log(`Columns in ${t}:`, Object.keys(data[0]));
            } else {
                console.log(`Table ${t} is empty.`);
            }
        }
    }
}

checkPackageTables();
