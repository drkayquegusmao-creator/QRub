
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPackageQuestionsSchema() {
    const { data, error } = await supabase.from('package_questions').select('*').limit(1);
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Columns in package_questions:', Object.keys(data[0] || {}));
    }
}

checkPackageQuestionsSchema();
