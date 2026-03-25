import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(
    request: NextRequest,
    context: any
) {
    const params = await context.params;
    let supabaseWithToken: any = null;
    let packageId: string = '';

    try {
        packageId = params.packageId

        // 1) Auth via Bearer token
        const authHeader = request.headers.get('Authorization') || ''
        const token = authHeader.replace('Bearer ', '').trim()

        if (!token) {
            return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
        }

        supabaseWithToken = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: `Bearer ${token}` } } }
        )
        const { data: { user }, error: authErr } = await supabaseWithToken.auth.getUser()
        if (authErr || !user) {
            return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
        }

        // 2) Verify admin role
        const { data: profile } = await supabaseWithToken
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()

        if (!profile || !['MASTER', 'ADMIN', 'ADMIN_MASTER', 'master', 'admin'].includes(profile.role)) {
            return NextResponse.json({ error: 'Acesso restrito a administradores' }, { status: 403 })
        }

        // 3) Load package
        const { data: pkg, error: pkgErr } = await supabaseWithToken
            .from('concurso_question_packages')
            .select('*, banks:concurso_banks(name)')
            .eq('id', packageId)
            .single()

        if (pkgErr || !pkg) {
            return NextResponse.json({ error: 'Pacote nao encontrado' }, { status: 404 })
        }

        // 4) Load pending questions
        const { data: pkgQuestions } = await supabaseWithToken
            .from('concurso_package_questions')
            .select('*')
            .eq('package_id', packageId)
            .order('order_index')

        if (!pkgQuestions || pkgQuestions.length === 0) {
            return NextResponse.json({ error: 'Nenhuma questao no pacote' }, { status: 400 })
        }

        let publishedCount = 0
        const errors: string[] = []

        // 5) Upsert into concurso_questao_base
        for (let i = 0; i < pkgQuestions.length; i++) {
            const pq = pkgQuestions[i]
            if (pq.status === 'approved') {
                publishedCount++
                continue
            }

            try {
                const qj = pq.question_json as any
                const hash = pq.hash_logico || crypto.randomUUID().substring(0, 8)

                // Normalize difficulty for check constraint: facil, media, dificil
                const rawDiff = (qj.difficulty || 'media').toLowerCase()
                const normalizedDifficulty = 
                    rawDiff.includes('faci') ? 'facil' :
                    rawDiff.includes('dific') ? 'dificil' :
                    'media'

                const { error: upsertErr } = await supabaseWithToken
                    .from('concurso_questao_base')
                    .insert({
                        id: crypto.randomUUID(),
                        enunciado: qj.enunciado,
                        options: qj.options,
                        correct_option_id: qj.answer,
                        explanation: qj.rationale,
                        alternative_explanations: qj.option_rationales,
                        difficulty: normalizedDifficulty,
                        hash: hash,
                        status: 'active',
                        source: pkg.banks?.name || 'Geral',
                        taxonomy_path: pkg.taxonomy_path,
                        // NEW fields inherited from package for filtering
                        area_id: pkg.area_id,
                        disciplina_id: pkg.disciplina_id,
                        subdisciplina_id: pkg.subdisciplina_id,
                        assunto_id: pkg.assunto_id,
                        banca_id: pkg.bank_id,
                        metadata: {
                            tags: qj.tags || [],
                            package_id: packageId,
                            source_pq_id: pq.id,
                            source_pq_hash: hash
                        }
                    })

                if (upsertErr) {
                    errors.push(`Q${i+1}: ${upsertErr.message}`)
                    continue
                }

                await supabaseWithToken
                    .from('concurso_package_questions')
                    .update({ status: 'approved' })
                    .eq('id', pq.id)

                publishedCount++
            } catch (err: any) {
                errors.push(`Q${i+1}: ${err.message}`)
            }
        }

        // 6) Update package status
        await supabaseWithToken
            .from('concurso_question_packages')
            .update({ 
                status: publishedCount === pkgQuestions.length ? 'approved' : 'partial',
                updated_at: new Date().toISOString()
            })
            .eq('id', packageId)

        return NextResponse.json({
            success: true,
            publishedCount,
            errors,
            packageId
        })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
