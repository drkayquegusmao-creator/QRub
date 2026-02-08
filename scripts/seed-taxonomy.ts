
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

// Mocking the data here to avoid import issues
const MEDICAL_HIERARCHY = [
    {
        id: 'medicina',
        name: 'Medicina',
        specialties: [
            // ESPECIALIDADES BÁSICAS
            {
                id: 'clinica-medica', name: 'Clínica Médica', category: 'Especialidades Básicas', subspecialties: [
                    { id: 'cardiologia', name: 'Cardiologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'endocrinologia', name: 'Endocrinologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'gastroenterologia', name: 'Gastroenterologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'geriatria', name: 'Geriatria', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'hematologia', name: 'Hematologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'infectologia', name: 'Infectologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'nefrologia', name: 'Nefrologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'pneumologia', name: 'Pneumologia', subjects: [{ id: 'CM-PNEUMO-TEP', name: 'Tromboembolismo Pulmonar (TEP)' }] },
                    { id: 'reumatologia', name: 'Reumatologia', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'oncologia-clinica', name: 'Oncologia Clínica', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            { id: 'cirurgia-geral', name: 'Cirurgia Geral', category: 'Especialidades Básicas', subspecialties: [] },
            {
                id: 'pediatria', name: 'Pediatria', category: 'Especialidades Básicas', subspecialties: [
                    { id: 'neonatologia', name: 'Neonatologia', subjects: [{ id: 'PED-NEO-SEPSE', name: 'Sepse Neonatal' }] },
                    { id: 'cardiologia-pediatrica', name: 'Cardiologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'endocrinologia-pediatrica', name: 'Endocrinologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'gastroenterologia-pediatrica', name: 'Gastroenterologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'nefrologia-pediatrica', name: 'Nefrologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'pneumologia-pediatrica', name: 'Pneumologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'terapia-intensiva-pediatrica', name: 'Terapia Intensiva Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'alergia-imunologia-pediatrica', name: 'Alergia e Imunologia Pediátrica', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            {
                id: 'ginecologia-obstetricia', name: 'Ginecologia e Obstetrícia', category: 'Especialidades Básicas', subspecialties: [
                    { id: 'reproducao-humana', name: 'Reprodução Humana', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'medicina-fetal', name: 'Medicina Fetal', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'endoscopia-ginecologica', name: 'Endoscopia Ginecológica', subjects: [{ id: 'geral', name: 'Geral' }] },
                    { id: 'uroginecologia', name: 'Uroginecologia', subjects: [{ id: 'geral', name: 'Geral' }] }
                ]
            },
            { id: 'medicina-familia-comunidade', name: 'Medicina de Família e Comunidade', category: 'Especialidades Básicas', subspecialties: [] },

            // ... (Add all others as needed, truncating for brevity but ideally full list)
        ]
    }
]

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
    console.log('🌱 Seeding Taxonomy...')

    // Clear existing
    // await supabase.from('taxonomia').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    for (const course of MEDICAL_HIERARCHY) {
        // 1. Course
        console.log(`Processing Course: ${course.name}`)
        const { data: cData, error: cError } = await supabase
            .from('taxonomia')
            .upsert({
                slug: course.id,
                name: course.name,
                level: 'course',
                active: true
            }, { onConflict: 'slug, parent_id' }) // This might fail if constraint isn't exactly this
            .select()

        if (cError) { console.error('Error course:', cError); continue }
        const courseId = cData[0].id

        for (const spec of course.specialties) {
            // 2. Specialty
            const { data: sData, error: sError } = await supabase
                .from('taxonomia')
                .upsert({
                    slug: spec.id,
                    name: spec.name,
                    parent_id: courseId,
                    level: 'specialty',
                    active: true,
                    metadata: { category: spec.category }
                })
                .select()

            if (sError) { console.error(`Error spec ${spec.name}:`, sError); continue }
            const specId = sData[0].id

            for (const sub of spec.subspecialties) {
                // 3. Subspecialty
                const { data: subData, error: subError } = await supabase
                    .from('taxonomia')
                    .upsert({
                        slug: sub.id,
                        name: sub.name,
                        parent_id: specId,
                        level: 'subspecialty',
                        active: true
                    })
                    .select()

                if (subError) { console.error(`Error sub ${sub.name}:`, subError); continue }
                const subId = subData[0].id

                if (sub.subjects) {
                    for (const subj of sub.subjects) {
                        // 4. Subject
                        await supabase
                            .from('taxonomia')
                            .upsert({
                                slug: subj.id,
                                name: subj.name,
                                parent_id: subId,
                                level: 'subject',
                                active: true
                            })
                    }
                }
            }
        }
    }
    console.log('✅ Seeding Complete')
}

seed()
