
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/);
if (match) {
    console.log('FOUND SERVICE ROLE KEY');
} else {
    console.log('NOT FOUND');
}
const anon = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);
if (anon) {
    console.log('FOUND ANON KEY');
}
