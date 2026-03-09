
const fs = require('fs');
const content = fs.readFileSync('table_search.txt', 'utf16le');
fs.writeFileSync('table_search_utf8.txt', content, 'utf8');
