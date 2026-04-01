require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getAllConcursoTaxonomyNodes() {
    const { data } = await supabase.from('concurso_taxonomia').select('*').eq('active', true);
    return data || [];
}

function getDescendantsIds(taxonomyId, allNodes) {
    const result = [taxonomyId];
    function recurse(currentId) {
        const children = allNodes.filter(n => n.parent_id === currentId);
        for (const child of children) { result.push(child.id); recurse(child.id); }
    }
    recurse(taxonomyId);
    return result;
}

async function testAreaQuery(label, taxonomyId) {
    const allNodes = await getAllConcursoTaxonomyNodes();
    const ids = getDescendantsIds(taxonomyId, allNodes);
    console.log(`\n[${label}] → ${ids.length} nós descendentes`);

    // Strategy: chunk IDs and query each taxonomy column separately (avoids URL limit)
    const CHUNK_SIZE = 100;
    const chunks = [];
    for (let i = 0; i < ids.length; i += CHUNK_SIZE) chunks.push(ids.slice(i, i + CHUNK_SIZE));
    
    const cols = ['area_id', 'disciplina_id', 'subdisciplina_id', 'assunto_id'];
    const foundIds = new Set();

    for (const chunk of chunks) {
        await Promise.all(cols.map(async col => {
            const { data, error } = await supabase
                .from('concurso_questao_base')
                .select('id')
                .eq('status', 'active')
                .in(col, chunk);
            if (error) { console.log(`   ❌ ${col}: ${error.message}`); return; }
            (data || []).forEach(r => foundIds.add(r.id));
        }));
    }

    console.log(`   ${foundIds.size > 0 ? '✅' : '❌'} Questões encontradas: ${foundIds.size}`);
    return foundIds.size;
}

async function main() {
    const { data: roots } = await supabase
        .from('concurso_taxonomia').select('id,name,level').is('parent_id', null).eq('active', true).limit(5);

    console.log('Áreas raiz:');
    for (const r of roots || []) {
        console.log(`  - ${r.name} [${r.level}]`);
        await testAreaQuery(r.name, r.id);
    }

    const { count } = await supabase.from('concurso_questao_base').select('id', { count: 'exact', head: true }).eq('status', 'active');
    console.log(`\n📈 Total de questões ativas: ${count}`);
}

main().catch(console.error);
