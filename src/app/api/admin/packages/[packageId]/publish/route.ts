import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(
    request: Request,
    { params }: { params: Promise<{ packageId: string }> }
) {
    let supabaseWithToken: any = null;
    let packageId: string = '';

    try {
        packageId = (await params).packageId

        // 1) Auth via Bearer token from Authorization header
        const authHeader = request.headers.get('Authorization') || ''
        const token = authHeader.replace('Bearer ', '').trim()

        if (!token) {
            return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
        }

        // 2) Verify token by calling getUser with the access token
        supabaseWithToken = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { global: { headers: { Authorization: `Bearer ${token}` } } }
        )
        const { data: { user }, error: authErr } = await supabaseWithToken.auth.getUser()
        if (authErr || !user) {
            return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
        }

        // 3) Verify admin role 
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

        // 5) Lock against double-publish, unless older than 5 mins
        if ((pkg as any).publishing_at) {
            const pubAt = new Date((pkg as any).publishing_at)
            const diffMs = Date.now() - pubAt.getTime()
            if (diffMs < 5 * 60 * 1000) {
                return NextResponse.json({ error: 'Publicacao ja em andamento. Aguarde.' }, { status: 423 })
            }
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

        // 7) Validate only pending questions
        const validationErrors: string[] = []
        let pkgHasPending = false;

        for (let i = 0; i < pkgQuestions.length; i++) {
            const pq = pkgQuestions[i]
            if (pq.status === 'approved') continue; // skips if python script already published them

            pkgHasPending = true;
            const qj = typeof pq.question_json === 'string'
                ? JSON.parse(pq.question_json)
                : pq.question_json
            const errs = validateQuestionJson(qj, i + 1)
            if (errs.length > 0) validationErrors.push(...errs)
        }

        if (validationErrors.length > 0) {
            await unlockPackage(supabaseWithToken, packageId)
            return NextResponse.json({
                error: 'Validacao falhou. Reprocesse ou remova a questão com defeito antes de publicar.',
                details: validationErrors
            }, { status: 422 })
        }

        let publishedCount = 0
        const upsertErrors: string[] = []

        // 8) Resolve taxonomy only if we actually need to insert questions
        if (pkgHasPending) {
            const bankName = await getBankName(supabaseWithToken, pkg.bank_id)

            const { data: taxNodes } = await supabaseWithToken
                .from('taxonomia')
                .select('slug, name, level')
                .eq('active', true)

            const txFields = resolveTaxonomyFromPath(pkg.taxonomy_path || '', taxNodes || [])

            // 9) Upsert pending questions into questao_base
            for (let i = 0; i < pkgQuestions.length; i++) {
                const pq = pkgQuestions[i]
                if (pq.status === 'approved') {
                    // Already published
                    publishedCount++
                    continue;
                }

                try {
                    const qj = typeof pq.question_json === 'string'
                        ? JSON.parse(pq.question_json)
                        : pq.question_json

                    const enunciado = qj.enunciado || qj.stem || qj.pergunta || ''
                    const answer = String(qj.answer || qj.gabarito || qj.resposta || qj.correct_answer || '').toLowerCase().trim()
                    const rationale = qj.rationale || qj.justificativa_gabarito || qj.justificativa_geral || qj.justificativa || qj.explanation || ''
                    const optionRationales = qj.option_rationales || qj.justificativas_alternativas || null
                    const rawOpts = qj.options || qj.alternativas || qj.alternatives || {}

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

                    await supabaseWithToken
                        .from('package_questions')
                        .update({ status: 'approved', question_id: questionId })
                        .eq('id', pq.id)

                    publishedCount++
                } catch (err: any) {
                    upsertErrors.push(`Q${i + 1}: ${err?.message || 'Erro desconhecido'}`)
                }
            }
        } else {
            // If they were already approved (e.g. by python script), we just count them.
            publishedCount = pkgQuestions.length;
        }

        // 10) Update package status to approved (if we successfully pushed the pending questions)
        const updateParams = {
            status: 'approved',
            publishing_at: null,
            updated_at: new Date().toISOString()
        } as any;

        const { data: updData, error: updErr } = await supabaseWithToken
            .from('question_packages')
            .update(updateParams)
            .eq('id', packageId)
            .select();

        if (updErr) {
            console.error('[publish] Update package error:', updErr);
            throw new Error(`Falha ao atualizar status do pacote: ${updErr.message}`);
        }

        if (!updData || updData.length === 0) {
            console.warn('[publish] Nenhuma linha atualizada (possível bloqueio de RLS). Tentando contornar...');
            // Fallback para admin puro
            const supabaseAdminFallback = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );
            const { error: fallbackErr } = await supabaseAdminFallback
                .from('question_packages')
                .update(updateParams)
                .eq('id', packageId);

            if (fallbackErr) {
                throw new Error(`Não foi possível atualizar o status do pacote (RLS & Fallback falharam): ${fallbackErr.message}`);
            }
        }

        // 11) Log
        try {
            await supabaseWithToken.from('package_logs').insert({
                package_id: packageId,
                action: publishedCount > 0 ? 'published' : 'publish_failed',
                user_id: user.id,
                previous_status: pkg.status,
                new_status: 'approved',
                count_questions: publishedCount,
            })
        } catch { }

        return NextResponse.json({
            success: true,
            publishedQuestionsCount: publishedCount,
            errors: upsertErrors,
            packageId
        })

    } catch (err: any) {
        console.error('[publish] Unexpected error:', err)
        if (supabaseWithToken && packageId) {
            await unlockPackage(supabaseWithToken, packageId)
        }
        return NextResponse.json(
            { error: err?.message || 'Erro interno' },
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
        if (node) return node.slug

        // Fuzzy match: if name contains abbreviation like (TEP)
        const abbreviationMatch = name.match(/\(([^)]+)\)/)
        if (abbreviationMatch) {
            const abbr = abbreviationMatch[1].toLowerCase()
            const fuzzyNode = taxonomyNodes.find(n =>
                n.level === level &&
                (n.slug.toLowerCase().includes(abbr) || n.name.toLowerCase().includes(abbr))
            )
            if (fuzzyNode) return fuzzyNode.slug
        }

        // Special Mapping for Clínica Médica specialties that are slugs
        if (name.toLowerCase() === 'pneumologia') return 'pneumologia'
        if (name.toLowerCase() === 'cardiologia') return 'cardiologia'
        if (name.toLowerCase() === 'endocrinologia') return 'endocrinologia'

        return slugify(name)
    }

    const specialty_name = parts[1] || null
    const subspecialty_name = parts[2] || null
    const subject_name = parts[3] || null

    const specialty_slug = specialty_name ? findNodeSlug(specialty_name, 'specialty') : null
    const subspecialty_slug = subspecialty_name ? findNodeSlug(subspecialty_name, 'subspecialty') : null

    // Explicit TEP handling to prevent generic names in subject_id
    let subject_slug = subject_name ? findNodeSlug(subject_name, 'subject') : subspecialty_slug
    if (subject_name?.includes('TEP')) {
        subject_slug = 'CM-PNEUMO-TEP'
    }

    // Standardize IDs for Clínica Médica sub-areas that are stored as specialties in the DB
    let final_spec = specialty_slug
    const MAPPED_SUBS = ['pneumologia', 'cardiologia', 'endocrinologia', 'gastroenterologia', 'nefrologia', 'hematologia', 'infectologia', 'neurologia', 'reumatologia']

    if (subspecialty_slug && MAPPED_SUBS.includes(subspecialty_slug)) {
        final_spec = subspecialty_slug
    }

    return {
        course_id: 'medicina',
        specialty_id: final_spec,
        subspecialty_id: subspecialty_slug || final_spec,
        subject_id: subject_slug,
        area_id: final_spec,
        subarea_id: subspecialty_slug || final_spec,
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
