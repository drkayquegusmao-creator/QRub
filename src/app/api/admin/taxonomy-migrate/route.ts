import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { MEDICAL_HIERARCHY } from '@/lib/medical-specialties'

export async function POST(request: Request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
            return NextResponse.json({ error: '🚨 É necessário configurar o SUPABASE_SERVICE_ROLE_KEY no seu .env.local para rodar essa migração.' }, { status: 500 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const logs: string[] = []

        logs.push('🚀 [FASE 1] Sincronizando tabela taxonomia com MEDICAL_HIERARCHY...')

        const upsertNode = async (slug: string, name: string, level: string, parentId: string | null, metadata: any = {}) => {
            const { data: existing } = await supabase
                .from('taxonomia')
                .select('id')
                .eq('slug', slug)
                .eq(parentId ? 'parent_id' : 'level', parentId || 'course') // work-around for parent
                .maybeSingle()

            let match = null;
            if (parentId) {
                const { data } = await supabase.from('taxonomia').select('id').eq('slug', slug).eq('parent_id', parentId).maybeSingle()
                match = data;
            } else {
                const { data } = await supabase.from('taxonomia').select('id').eq('slug', slug).eq('level', level).maybeSingle()
                match = data;
            }

            if (match) {
                const { data } = await supabase
                    .from('taxonomia')
                    .update({ name, level, metadata, updated_at: new Date() })
                    .eq('id', match.id)
                    .select()
                    .single()
                return data
            } else {
                const { data, error } = await supabase
                    .from('taxonomia')
                    .insert({ slug, name, level, parent_id: parentId, metadata })
                    .select()
                    .single()
                if (error) {
                    throw error
                }
                return data
            }
        }

        for (const course of MEDICAL_HIERARCHY) {
            const courseNode = await upsertNode(course.id, course.name, 'course', null)
            if (course.specialties) {
                for (const spec of course.specialties) {
                    const specNode = await upsertNode(spec.id, spec.name, 'specialty', courseNode.id, { category: spec.category })
                    if (spec.subspecialties) {
                        for (const sub of spec.subspecialties) {
                            const subNode = await upsertNode(sub.id, sub.name, 'subspecialty', specNode.id)
                            if (sub.subjects) {
                                for (const subj of sub.subjects) {
                                    await upsertNode(subj.id, subj.name, 'subject', subNode.id)
                                }
                            }
                        }
                    }
                }
            }
        }

        logs.push('✅ Taxonomia sincronizada! Iniciando FASE 2: Migração de questões...')

        const { data: questions, error: qError } = await supabase
            .from('questao_base')
            .select('id, course_id, specialty_id, subspecialty_id, subject_id, tags')

        if (qError) throw qError;

        const { data: taxNodes } = await supabase.from('taxonomia').select('slug, level')

        const validSlugs = {
            course: new Set(taxNodes?.filter((t: any) => t.level === 'course').map((t: any) => t.slug)),
            specialty: new Set(taxNodes?.filter((t: any) => t.level === 'specialty').map((t: any) => t.slug)),
            subspecialty: new Set(taxNodes?.filter((t: any) => t.level === 'subspecialty').map((t: any) => t.slug)),
            subject: new Set(taxNodes?.filter((t: any) => t.level === 'subject').map((t: any) => t.slug))
        }

        let correctedCount = 0;
        let orphanCount = 0;

        for (const q of questions || []) {
            const updates: any = {};

            const clean = (val: string) => val ? val.replace(/['"]+/g, '').trim() : null;

            let c = clean(q.course_id);
            let sp = clean(q.specialty_id);
            let ssp = clean(q.subspecialty_id);
            let sbj = clean(q.subject_id);

            if (sp === 'cirurgia') sp = 'cirurgia-geral';
            if (sp === 'ginecologia') sp = 'ginecologia-obstetricia';
            if (ssp === 'pediatria-geral') ssp = 'neonatologia';
            if (!sbj) sbj = 'geral';

            if (c !== q.course_id) updates.course_id = c || 'medicina';
            if (sp !== q.specialty_id) updates.specialty_id = sp;
            if (ssp !== q.subspecialty_id) updates.subspecialty_id = ssp;
            if (sbj !== q.subject_id) updates.subject_id = sbj;

            if (sp && !validSlugs.specialty.has(sp)) orphanCount++;

            if (Object.keys(updates).length > 0) {
                const { error: updErr } = await supabase.from('questao_base').update(updates).eq('id', q.id);
                if (!updErr) correctedCount++;
            }
        }

        logs.push(`✅ Migração concluída! Questões corrigidas/padronizadas: ${correctedCount}. Orfãos detectados: ${orphanCount}.`);

        return NextResponse.json({ success: true, logs, correctedCount, orphanCount })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
