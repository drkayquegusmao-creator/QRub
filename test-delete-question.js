
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDelete() {
    // Let's first get a single question ID
    const { data: questions, error: getError } = await supabase
        .from('questions')
        .select('id')
        .limit(1);

    if (getError) {
        console.error('Error fetching question:', getError);
        return;
    }

    if (!questions || questions.length === 0) {
        console.log('No questions found to delete.');
        return;
    }

    const id = questions[0].id;
    console.log(`Attempting to delete question with ID: ${id}`);

    const { error: deleteError } = await supabase
        .from('questions')
        .delete()
        .eq('id', id);

    if (deleteError) {
        console.error('DELETE ERROR:', deleteError);
    } else {
        console.log('SUCCESS: Question deleted.');
    }
}

testDelete();
