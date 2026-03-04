require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const email = 'kayquegusmao@gmail.com'; // Admin email from previous schema file
const password = process.env.ADMIN_PASSWORD || 'sua_senha_aqui';

// Config do Supabase
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function authenticate() {
    console.log('Autenticando...');
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) {
        throw new Error('Erro de auth: ' + error.message);
    }
    console.log('Autenticado com sucesso!');
}
const MEDICAL_HIERARCHY = [
    {
        id: 'medicina',
        name: 'Medicina',
        specialties: [
            {
                id: 'clinica-medica', name: 'Clínica Médica', category: 'Especialidades Básicas', subspecialties: [
                    { id: 'cardiologia', name: 'Cardiologia', subjects: [{ id: 'geral', name: 'Geral' }, { id: 'arritmias', name: 'Arritmias' }, { id: 'insuficiencia-cardiaca', name: 'Insuficiência Cardíaca' }, { id: 'sindromes-coronarianas', name: 'Síndromes Coronarianas' }, { id: 'valvopatias', name: 'Valvopatias' }] },
                    { id: 'endocrinologia', name: 'Endocrinologia', subjects: [{ id: 'geral', name: 'Geral' }, { id: 'diabetes-mellitus', name: 'Diabetes Mellitus' }, { id: 'disturbios-adrenais', name: 'Distúrbios Adrenais' }, { id: 'tireoide', name: 'Tireoide' }] },
                    { id: 'gastroenterologia', name: 'Gastroenterologia', subjects: [{ id: 'geral', name: 'Geral' }, { id: 'doenca-hepatica', name: 'Doença Hepática' }, { id: 'doenca-inflamatoria-intestinal', name: 'Doença Inflamatória Intestinal' }, { id: 'sangramento-digestivo', name: 'Sangramento Digestivo' }] },
                    { id: 'geriatria', name: 'Geriatria', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            {
                id: 'cirurgia-geral', name: 'Cirurgia Geral', category: 'Especialidades Básicas', subspecialties: [
                    { id: 'abdome-agudo', name: 'Abdome Agudo', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'doencas-vesicula', name: 'Doenças da Vesícula', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'hernias', name: 'Hérnias', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'pos-operatorio', name: 'Pós-operatório', subjects: [{ id: 'complicacoes', name: 'Complicações' }] },
                    { id: 'trauma-abdominal', name: 'Trauma Abdominal', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            }
        ]
    }
];

async function syncTaxonomy() {
    console.log('🚀 Iniciando sincronização da taxonomia...');
    try {
        for (const course of MEDICAL_HIERARCHY) {
            // 1. Curso
            const courseNode = await upsertNode(course.id, course.name, 'course', null);

            if (course.specialties) {
                for (const spec of course.specialties) {
                    // 2. Especialidade
                    const specNode = await upsertNode(spec.id, spec.name, 'specialty', courseNode.id, { category: spec.category });

                    if (spec.subspecialties) {
                        for (const sub of spec.subspecialties) {
                            // 3. Subespecialidade
                            const subNode = await upsertNode(sub.id, sub.name, 'subspecialty', specNode.id);

                            if (sub.subjects) {
                                for (const subj of sub.subjects) {
                                    // 4. Assunto/Tema
                                    await upsertNode(subj.id, subj.name, 'subject', subNode.id);
                                }
                            }
                        }
                    }
                }
            }
        }

        console.log('✅ Sincronização concluída!');
    } catch (err) {
        console.error('❌ Erro durante a execução:', err);
    }
}

async function upsertNode(slug, name, level, parentId, metadata = {}) {
    console.log(`  - [${level}] ${name} (${slug})`);

    // Tenta buscar por slug e parent_id pra evitar duplicar 'geral' em pais diferentes
    const { data: existing } = await supabase
        .from('taxonomia')
        .select('id')
        .eq('slug', slug)
        .eq('parent_id', parentId)
        .maybeSingle();

    if (existing) {
        const { data, error } = await supabase
            .from('taxonomia')
            .update({ name, level, metadata, updated_at: new Date() })
            .eq('id', existing.id)
            .select()
            .single();
        if (error) throw error;
        return data;
    } else {
        const { data, error } = await supabase
            .from('taxonomia')
            .insert({ slug, name, level, parent_id: parentId, metadata })
            .select()
            .single();
        if (error) throw error;
        return data;
    }
}

syncTaxonomy().catch(err => {
    console.error('❌ Erro na sincronização:', err);
    process.exit(1);
});
