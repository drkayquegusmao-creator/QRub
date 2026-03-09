
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function listAllTables() {
    // This is a hacky way to find table names if rpc is available
    const { data, error } = await supabase.rpc('get_tables'); // unlikely to work
    if (error) {
        // Try to query questao_base and check foreign keys if possible? No.
        // Let's try to query information_schema via a trick if allowed, 
        // but typically Supabase doesn't allow direct SELECT on information_schema via API.

        // Let's try common names one by one and log if they DON'T return 404/PGRST204
        const tables = ['pacote', 'pacotes', 'package', 'packages', 'pacote_questoes', 'package_question', 'questoes_pacote'];
        for (const t of tables) {
            const { error: e } = await supabase.from(t).select('id').limit(1);
            if (e && e.code === 'PGRST116') { // Table exists but no row matched? Or just PGRST204
                console.log(`Potential table: ${t} (Row not found)`);
            } else if (!e) {
                console.log(`Confirmed table: ${t}`);
            } else {
                console.log(`Table ${t} error: ${e.code} ${e.message}`);
            }
        }
    } else {
        console.log(data);
    }
}

listAllTables();
