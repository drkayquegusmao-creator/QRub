import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(
    request: Request,
    { params }: { params: Promise<{ packageId: string }> }
) {
    try {
        const { packageId } = await params

        // 1) Auth via Bearer token from Authorization header
        const authHeader = request.headers.get('Authorization') || ''
        const token = authHeader.replace('Bearer ', '').trim()

        if (!token) {
            return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
        }

        // 2) Admin client (bypasses RLS) — used for all DB operations
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Verify token by calling getUser with the access token
        const supabaseWithToken = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: `Bearer ${token}` } } }
        )
        const { data: { user }, error: authErr } = await supabaseWithToken.auth.getUser()
        if (authErr || !user) {
            return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
        }

        // 3) Verify admin role — use supabaseWithToken to ensure we can read our own record if SERVICE_ROLE is missing
        const { data: profile } = await supabaseWithToken
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()

        if (!profile || !['MASTER', 'ADMIN', 'ADMIN_MASTER', 'master', 'admin'].includes(profile.role)) {
            return NextResponse.json({ error: 'Acesso restrito a administradores' }, { status: 403 })
        }


        // 4) Load package
        const { data: pkg, error: pkgErr } = await supabaseWithToken
            .from('question_packages')
            .select('*')
            .eq('id', packageId)
            .single()

        if (pkgErr || !pkg) {
            return NextResponse.json({ error: 'Pacote nao encontrado', dbError: pkgErr?.message }, { status: 404 })
        }

        if (pkg.status === 'archived') {
            return NextResponse.json({ error: 'Pacote arquivado nao pode ser publicado' }, { status: 400 })
        }

        // 5) Lock against double-publish
        if ((pkg as any).publishing_at) {
            return NextResponse.json({ error: 'Publicacao ja em andamento. Aguarde.' }, { status: 423 })
        }
        await supabaseWithToken
            .from('question_packages')
            .update({ publishing_at: new Date().toISOString() })
            .eq('id', packageId)

        // 6) Load all package questions
        const { data: pkgQuestions } = await supabaseWithToken
            .from('package_questions')
            .select('*')
            .eq('package_id', packageId)
            .order('order_index')

        if (!pkgQuestions || pkgQuestions.length === 0) {
            await unlockPackage(supabaseWithToken, packageId)
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
            await unlockPackage(supabaseWithToken, packageId)
            return NextResponse.json({
                error: 'Validacao falhou. Reprocesse o pacote antes de publicar.',
                details: validationErrors
            }, { status: 422 })
        }

        // 8) Resolve taxonomy + bank name
        const bankName = await getBankName(supabaseWithToken, pkg.bank_id)

        // Fetch taxonomy nodes for precise mapping
        const { data: taxNodes } = await supabaseWithToken
            .from('taxonomia')
            .select('slug, name, level')
            .eq('active', true)

        const txFields = resolveTaxonomyFromPath(pkg.taxonomy_path || '', taxNodes || [])

        // 9) Upsert each question into questao_base
        let publishedCount = 0
        const upsertErrors: string[] = []

        for (let i = 0; i < pkgQuestions.length; i++) {
            const pq = pkgQuestions[i]
            try {
                // Parse & normalize: support both English and Portuguese field names
                const qj = typeof pq.question_json === 'string'
                    ? JSON.parse(pq.question_json)
                    : pq.question_json

                const enunciado = qj.enunciado || qj.stem || qj.pergunta || ''
                const answer = String(qj.answer || qj.gabarito || qj.resposta || qj.correct_answer || '').toLowerCase().trim()
                const rationale = qj.rationale || qj.justificativa_gabarito || qj.justificativa_geral || qj.justificativa || qj.explanation || ''
                const optionRationales = qj.option_rationales || qj.justificativas_alternativas || null
                const rawOpts = qj.options || qj.alternativas || qj.alternatives || {}

                // questao_base uses array [{id, text}] format for options
                const optionsArray = ['a', 'b', 'c', 'd', 'e']
                    .filter(k => rawOpts[k])
                    .map(k => ({ id: k, text: rawOpts[k] }))


                const questionId = pq.question_id || generateShortId()

                const { error: upsertErr } = await supabaseWithToken
                    .from('questao_base')
                    .upsert({
                        id: questionId,
                        enunciado: enunciado,
                        options: optionsArray,
                        correct_option_id: answer,
                        explanation: rationale,
                        alternative_explanations: optionRationales,
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
                await supabaseWithToken
                    .from('package_questions')
                    .update({ status: 'approved', question_id: questionId })
                    .eq('id', pq.id)

                publishedCount++
            } catch (err: any) {
                upsertErrors.push(`Q${i + 1}: ${err?.message || 'Erro desconhecido'}`)
            }
        }

        // 10) Update package status to approved
        await supabaseWithToken
            .from('question_packages')
            .update({
                status: 'approved',
                publishing_at: null,
                updated_at: new Date().toISOString()
            })
            .eq('id', packageId)

        // 11) Log (optional — table may not exist)
        try {
            await supabaseWithToken.from('package_logs').insert({
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
    // Support both English and Portuguese field names
    const enunciado = qj?.enunciado || qj?.stem || qj?.pergunta || ''
    if (!enunciado || String(enunciado).length < 10)
        errs.push(`Q${index}: enunciado ausente ou muito curto`)
    const opts = qj?.options || qj?.alternativas || qj?.alternatives || {}
    const keys = Object.keys(opts).filter(k => ['a', 'b', 'c', 'd', 'e'].includes(k) && opts[k])
    if (keys.length < 4)
        errs.push(`Q${index}: apenas ${keys.length} alternativas (minimo 4)`)
    const ans = String(qj?.answer || qj?.gabarito || qj?.resposta || '').toLowerCase().trim()
    if (!['a', 'b', 'c', 'd', 'e'].includes(ans))
        errs.push(`Q${index}: gabarito invalido ("${ans}")`)
    const rationale = qj?.rationale || qj?.justificativa_gabarito || qj?.justificativa_geral || qj?.justificativa || qj?.explanation || ''
    if (!rationale || String(rationale).length < 5)
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

function resolveTaxonomyFromPath(path: string, taxonomyNodes: any[]) {
    const parts = path.split('>').map(p => p.trim()).filter(Boolean)

    const findNodeSlug = (name: string, level: string) => {
        if (!name) return null
        const node = taxonomyNodes.find(n =>
            n.level === level &&
            (n.name.toLowerCase() === name.toLowerCase() || n.slug.toLowerCase() === name.toLowerCase())
        )
        return node ? node.slug : slugify(name)
    }

    const specialty_slug = parts[1] ? findNodeSlug(parts[1], 'specialty') : null
    const subspecialty_slug = parts[2] ? findNodeSlug(parts[2], 'subspecialty') : null
    const subject_slug = parts[3] ? findNodeSlug(parts[3], 'subject') : subspecialty_slug

    return {
        course_id: 'medicina',
        specialty_id: specialty_slug,
        subspecialty_id: subspecialty_slug,
        subject_id: subject_slug,
        area_id: specialty_slug,
        subarea_id: subspecialty_slug,
        tema_id: subject_slug
    }
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .replace(/[^\w\s-]/g, '') // remove non-alphanumeric
        .replace(/\s+/g, '-') // spaces to hyphens
        .replace(/-+/g, '-') // double hyphens
        .trim()
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
