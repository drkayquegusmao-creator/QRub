
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPackageQuestionsSchema() {
    const { data, error } = await supabase.from('package_questions').select('*').limit(1);
    if (error) {
        console.error('Error:', JSON.stringify(error));
    } else {
        if (data.length > 0) {
            console.log('FIELDS:' + JSON.stringify(Object.keys(data[0])));
        } else {
            console.log('EMPTY TABLE');
        }
    }
}

checkPackageQuestionsSchema();
