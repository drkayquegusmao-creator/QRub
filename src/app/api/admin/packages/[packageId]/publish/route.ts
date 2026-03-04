import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function POST(
    request: Request,
    { params }: { params: Promise<{ packageId: string }> }
) {
    try {
        const { packageId } = await params

        // 1) Auth via anon client (reads session cookie)
        const cookieStore = await cookies()
        const cookieHeader = cookieStore.getAll()
            .map(c => `${c.name}=${c.value}`)
            .join('; ')

        const supabaseAnon = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                    headers: { Cookie: cookieHeader }
                }
            }
        )

        const { data: { user }, error: authErr } = await supabaseAnon.auth.getUser()
        if (authErr || !user) {
            return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
        }

        // 2) Admin client (bypasses RLS)
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // 3) Verify admin role
        const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (!profile || !['MASTER', 'ADMIN', 'ADMIN_MASTER'].includes(profile.role)) {
            return NextResponse.json({ error: 'Acesso restrito a administradores' }, { status: 403 })
        }

        // 4) Load package
        const { data: pkg, error: pkgErr } = await supabaseAdmin
            .from('question_packages')
            .select('*')
            .eq('id', packageId)
            .single()

        if (pkgErr || !pkg) {
            return NextResponse.json({ error: 'Pacote nao encontrado' }, { status: 404 })
        }

        if (pkg.status === 'archived') {
            return NextResponse.json({ error: 'Pacote arquivado nao pode ser publicado' }, { status: 400 })
        }

        // 5) Lock against double-publish
        if ((pkg as any).publishing_at) {
            return NextResponse.json({ error: 'Publicacao ja em andamento. Aguarde.' }, { status: 423 })
        }
        await supabaseAdmin
            .from('question_packages')
            .update({ publishing_at: new Date().toISOString() })
            .eq('id', packageId)

        // 6) Load all package questions
        const { data: pkgQuestions } = await supabaseAdmin
            .from('package_questions')
            .select('*')
            .eq('package_id', packageId)
            .order('order_index')

        if (!pkgQuestions || pkgQuestions.length === 0) {
            await unlockPackage(supabaseAdmin, packageId)
            return NextResponse.json({ error: 'Nenhuma questao no pacote' }, { status: 400 })
        }

        // 7) Validate all questions first
        const validationErrors: string[] = []
        for (let i = 0; i < pkgQuestions.length; i++) {
            const pq = pkgQuestions[i]
            const qj = typeof pq.question_json === 'string'
                ? JSON.parse(pq.question_json)
                : pq.question_json
            const errs = validateQuestionJson(qj, i + 1)
            if (errs.length > 0) validationErrors.push(...errs)
        }

        if (validationErrors.length > 0) {
            await unlockPackage(supabaseAdmin, packageId)
            return NextResponse.json({
                error: 'Validacao falhou. Reprocesse o pacote antes de publicar.',
                details: validationErrors
            }, { status: 422 })
        }

        // 8) Resolve taxonomy + bank name
        const bankName = await getBankName(supabaseAdmin, pkg.bank_id)
        const txFields = resolveTaxonomyFromPath(pkg.taxonomy_path || '')

        // 9) Upsert each question into questao_base
        let publishedCount = 0
        const upsertErrors: string[] = []

        for (let i = 0; i < pkgQuestions.length; i++) {
            const pq = pkgQuestions[i]
            try {
                const qj = typeof pq.question_json === 'string'
                    ? JSON.parse(pq.question_json)
                    : pq.question_json

                // questao_base uses array [{id, text}] format for options
                const optionsArray = ['a', 'b', 'c', 'd', 'e']
                    .filter(k => qj.options?.[k])
                    .map(k => ({ id: k, text: qj.options[k] }))

                const questionId = pq.question_id || generateShortId()

                const { error: upsertErr } = await supabaseAdmin
                    .from('questao_base')
                    .upsert({
                        id: questionId,
                        enunciado: qj.enunciado,
                        options: optionsArray,
                        correct_option_id: qj.answer,
                        explanation: qj.rationale,
                        alternative_explanations: qj.option_rationales || null,
                        difficulty: qj.difficulty || pkg.difficulty || 'media',
                        hash: pq.hash_logico,
                        status: 'active',
                        status_validacao: 'APROVADA',
                        fonte: 'importada',
                        source: bankName,
                        ...txFields,
                        metadata: {
                            tags: qj.tags || [],
                            package_id: packageId,
                            source_package_question_id: pq.id,
                            published_at: new Date().toISOString(),
                            published_by: user.id
                        }
                    }, { onConflict: 'id' })

                if (upsertErr) {
                    upsertErrors.push(`Q${i + 1}: ${upsertErr.message}`)
                    continue
                }

                // Mark question as approved in the package
                await supabaseAdmin
                    .from('package_questions')
                    .update({ status: 'approved', question_id: questionId })
                    .eq('id', pq.id)

                publishedCount++
            } catch (err: any) {
                upsertErrors.push(`Q${i + 1}: ${err?.message || 'Erro desconhecido'}`)
            }
        }

        // 10) Update package status to approved
        await supabaseAdmin
            .from('question_packages')
            .update({
                status: 'approved',
                publishing_at: null,
                updated_at: new Date().toISOString()
            })
            .eq('id', packageId)

        // 11) Log (optional — table may not exist)
        try {
            await supabaseAdmin.from('package_logs').insert({
                package_id: packageId,
                action: publishedCount > 0 ? 'published' : 'publish_failed',
                user_id: user.id,
                previous_status: pkg.status,
                new_status: 'approved',
                count_questions: publishedCount,
            })
        } catch { /* log table is optional */ }

        return NextResponse.json({
            success: true,
            publishedQuestionsCount: publishedCount,
            errors: upsertErrors,
            packageId
        })

    } catch (err: any) {
        console.error('[publish] Unexpected error:', err)
        return NextResponse.json(
            { error: 'Erro interno', msg: err?.message },
            { status: 500 }
        )
    }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function validateQuestionJson(qj: any, index: number): string[] {
    const errs: string[] = []
    if (!qj?.enunciado || String(qj.enunciado).length < 10)
        errs.push(`Q${index}: enunciado ausente ou muito curto`)
    const opts = qj?.options || {}
    const keys = Object.keys(opts).filter(k => ['a', 'b', 'c', 'd', 'e'].includes(k) && opts[k])
    if (keys.length < 4)
        errs.push(`Q${index}: apenas ${keys.length} alternativas (minimo 4)`)
    const ans = String(qj?.answer || '').toLowerCase().trim()
    if (!['a', 'b', 'c', 'd', 'e'].includes(ans))
        errs.push(`Q${index}: gabarito invalido ("${ans}")`)
    if (!qj?.rationale || String(qj.rationale).length < 5)
        errs.push(`Q${index}: justificativa ausente`)
    return errs
}

async function getBankName(supabase: any, bankId?: string): Promise<string> {
    if (!bankId) return 'Geral'
    try {
        const { data } = await supabase.from('banks').select('name').eq('id', bankId).single()
        return data?.name || 'Geral'
    } catch { return 'Geral' }
}

function resolveTaxonomyFromPath(path: string) {
    const parts = path.split('>').map(p => p.trim()).filter(Boolean)
    return {
        course_id: 'medicina',
        specialty_id: parts[1] || null,
        subspecialty_id: parts[2] || null,
        subject_id: parts[3] || parts[2] || null,
        area_id: parts[1] || null,
        subarea_id: parts[2] || null,
        tema_id: parts[3] || parts[2] || null
    }
}

async function unlockPackage(supabase: any, packageId: string) {
    await supabase
        .from('question_packages')
        .update({ publishing_at: null })
        .eq('id', packageId)
}

function generateShortId(): string {
    return crypto.randomUUID()
}
