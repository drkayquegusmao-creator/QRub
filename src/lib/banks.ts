import { supabase } from '@/lib/supabase'
import { logAdminAction } from '@/lib/editais'

// ─── Types ────────────────────────────────────────────────────────────────

export interface Bank {
    id: string
    name: string
    slug: string
    description?: string
    is_active: boolean
    created_at?: string
}

export interface BankProfile {
    id: string
    bank_id: string
    version: number
    profile_text: string
    profile_json?: Record<string, unknown>
    examples_json?: unknown[]
    is_current: boolean
    created_at?: string
}

export interface QuestionBlueprint {
    id: string
    bank_id: string
    name: string
    format: 'mcq_5' | 'mcq_4' | 'certo_errado' | 'discursiva'
    blueprint_rules?: Record<string, unknown>
    description?: string
    is_active: boolean
    created_at?: string
}

export interface QuestionPackage {
    id: string
    title: string
    bank_id?: string
    blueprint_id?: string
    taxonomy_path?: string
    difficulty: 'facil' | 'media' | 'dificil' | 'mista'
    requested_count: number
    status: 'draft' | 'reviewing' | 'approved' | 'published' | 'archived'
    generation_prompt_snapshot?: string
    notes?: string
    created_at?: string
    updated_at?: string
    // Joined
    banks?: Bank
    question_blueprints?: QuestionBlueprint
}

export interface PackageQuestion {
    id: string
    package_id: string
    question_id?: string
    question_json: Record<string, unknown>
    status: 'draft' | 'edited' | 'approved' | 'rejected'
    hash_logico?: string
    review_notes?: string
    order_index: number
    created_at?: string
}

// ─── Banks CRUD ───────────────────────────────────────────────────────────

export async function getBanks(activeOnly = false) {
    try {
        let query = supabase.from('banks').select('*').order('name')
        if (activeOnly) query = query.eq('is_active', true)
        const { data, error } = await query
        if (error) throw error
        return { data: (data || []) as Bank[], error: null }
    } catch (err) {
        console.error('[banks] getBanks:', err)
        return { data: [] as Bank[], error: err }
    }
}

export async function getBankWithProfiles(bankId: string) {
    try {
        const { data, error } = await supabase
            .from('banks')
            .select(`
        *,
        bank_profiles(*),
        question_blueprints(*)
      `)
            .eq('id', bankId)
            .single()
        if (error) throw error
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function createBank(payload: Partial<Bank>) {
    try {
        const slug = payload.slug || generateSlug(payload.name || '')
        const { data, error } = await supabase
            .from('banks')
            .insert({ ...payload, slug })
            .select()
            .single()
        if (error) throw error
        await logAdminAction('CREATE_BANK', 'banks', data.id, { name: data.name })
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function updateBank(id: string, payload: Partial<Bank>) {
    try {
        const { data, error } = await supabase
            .from('banks')
            .update(payload)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        await logAdminAction('UPDATE_BANK', 'banks', id, payload as Record<string, unknown>)
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

// ─── Bank Profiles ─────────────────────────────────────────────────────────

export async function getBankProfiles(bankId: string) {
    try {
        const { data, error } = await supabase
            .from('bank_profiles')
            .select('*')
            .eq('bank_id', bankId)
            .order('version', { ascending: false })
        if (error) throw error
        return { data: (data || []) as BankProfile[], error: null }
    } catch (err) {
        return { data: [] as BankProfile[], error: err }
    }
}

export async function getCurrentProfile(bankId: string): Promise<BankProfile | null> {
    try {
        const { data, error } = await supabase
            .from('bank_profiles')
            .select('*')
            .eq('bank_id', bankId)
            .eq('is_current', true)
            .single()
        if (error) return null
        return data as BankProfile
    } catch {
        return null
    }
}

export async function createBankProfile(payload: Partial<BankProfile>) {
    try {
        // Get latest version number
        const { data: existing } = await supabase
            .from('bank_profiles')
            .select('version')
            .eq('bank_id', payload.bank_id)
            .order('version', { ascending: false })
            .limit(1)
            .single()

        const version = (existing?.version || 0) + 1

        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
            .from('bank_profiles')
            .insert({ ...payload, version, created_by: user?.id })
            .select()
            .single()
        if (error) throw error
        await logAdminAction('CREATE_BANK_PROFILE', 'bank_profiles', data.id, { bank_id: payload.bank_id, version })
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function setCurrentProfile(profileId: string, bankId: string) {
    try {
        const { error } = await supabase
            .from('bank_profiles')
            .update({ is_current: true })
            .eq('id', profileId)
        if (error) throw error
        await logAdminAction('SET_CURRENT_PROFILE', 'bank_profiles', profileId, { bank_id: bankId })
        return { error: null }
    } catch (err) {
        return { error: err }
    }
}

// ─── Blueprints ────────────────────────────────────────────────────────────

export async function getBlueprints(bankId: string) {
    try {
        const { data, error } = await supabase
            .from('question_blueprints')
            .select('*')
            .eq('bank_id', bankId)
            .order('name')
        if (error) throw error
        return { data: (data || []) as QuestionBlueprint[], error: null }
    } catch (err) {
        return { data: [] as QuestionBlueprint[], error: err }
    }
}

export async function createBlueprint(payload: Partial<QuestionBlueprint>) {
    try {
        const { data, error } = await supabase
            .from('question_blueprints')
            .insert(payload)
            .select()
            .single()
        if (error) throw error
        await logAdminAction('CREATE_BLUEPRINT', 'question_blueprints', data.id, { name: data.name })
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function updateBlueprint(id: string, payload: Partial<QuestionBlueprint>) {
    try {
        const { data, error } = await supabase
            .from('question_blueprints')
            .update(payload)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

// ─── Packages ──────────────────────────────────────────────────────────────

export async function getPackages(filters?: { status?: string; bank_id?: string }) {
    try {
        let query = supabase
            .from('question_packages')
            .select(`*, banks(name, slug), question_blueprints(name, format)`)
            .order('created_at', { ascending: false })

        if (filters?.status) query = query.eq('status', filters.status)
        if (filters?.bank_id) query = query.eq('bank_id', filters.bank_id)

        const { data, error } = await query
        if (error) throw error
        return { data: (data || []) as QuestionPackage[], error: null }
    } catch (err) {
        return { data: [] as QuestionPackage[], error: err }
    }
}

export async function createPackage(payload: Partial<QuestionPackage>) {
    try {
        const { data: { user } } = await supabase.auth.getUser()

        // Clean payload: remove empty strings for UUID fields to avoid database errors
        const cleanPayload = { ...payload }
        if (cleanPayload.bank_id === '') delete cleanPayload.bank_id
        if (cleanPayload.blueprint_id === '') delete cleanPayload.blueprint_id

        const { data, error } = await supabase
            .from('question_packages')
            .insert({ ...cleanPayload, created_by: user?.id })
            .select()
            .single()
        if (error) throw error
        await logAdminAction('CREATE_PACKAGE', 'question_packages', data.id, { title: data.title })
        return { data, error: null }
    } catch (err) {
        console.error('[banks] createPackage error:', err)
        return { data: null, error: err }
    }
}


export async function updatePackage(id: string, payload: Partial<QuestionPackage>) {
    try {
        const { data, error } = await supabase
            .from('question_packages')
            .update(payload)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

// ─── Package Questions ──────────────────────────────────────────────────────

export async function getPackageQuestions(packageId: string) {
    try {
        const { data, error } = await supabase
            .from('package_questions')
            .select('*')
            .eq('package_id', packageId)
            .order('order_index')
        if (error) throw error
        return { data: (data || []) as PackageQuestion[], error: null }
    } catch (err) {
        return { data: [] as PackageQuestion[], error: err }
    }
}

export interface ImportedQuestion {
    enunciado?: string
    stem?: string
    pergunta?: string
    texto?: string
    options?: Record<string, string>
    alternativas?: Record<string, string>
    alternatives?: Record<string, string>
    answer?: string
    gabarito?: string
    correct_answer?: string
    resposta?: string
    rationale?: string
    justificativa?: string
    justificativa_geral?: string
    justificativa_gabarito?: string
    explanation?: string
    option_rationales?: Record<string, string>
    justificativas_alternativas?: Record<string, string>
    explanation_options?: Record<string, string>
    difficulty?: string
    dificuldade?: string
    tags?: string[] | string
    [key: string]: unknown
}

export interface ImportResult {
    imported: number
    duplicates: number
    errors: { index: number; message: string }[]
}

export async function importQuestionsToPackage(
    packageId: string,
    questions: ImportedQuestion[]
): Promise<ImportResult> {
    const result: ImportResult = { imported: 0, duplicates: 0, errors: [] }

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i]
        try {
            const normalized = normalizeQuestion(q)
            const valid = validateQuestion(normalized)
            if (!valid.ok) {
                result.errors.push({ index: i, message: valid.error || 'Inválido' })
                continue
            }

            const hash = computeHash(normalized.enunciado as string)

            // Check duplicate
            const { data: existingPkg } = await supabase
                .from('package_questions')
                .select('id')
                .eq('package_id', packageId)
                .eq('hash_logico', hash)
                .single()

            if (existingPkg) {
                result.duplicates++
                continue
            }

            const { error } = await supabase
                .from('package_questions')
                .insert({
                    package_id: packageId,
                    question_json: normalized,
                    hash_logico: hash,
                    order_index: i,
                    status: 'draft',
                })

            if (error) throw error
            result.imported++
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Erro desconhecido'
            result.errors.push({ index: i, message: msg })
        }
    }

    await logAdminAction('IMPORT_QUESTIONS', 'package_questions', packageId, {
        imported: result.imported,
        duplicates: result.duplicates,
        errors: result.errors.length,
    })

    return result
}

export async function updatePackageQuestion(id: string, payload: Partial<PackageQuestion>) {
    try {
        const { data, error } = await supabase
            .from('package_questions')
            .update(payload)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function reprocessPackageQuestions(packageId: string): Promise<ImportResult> {
    const { data: pkgQuestions } = await getPackageQuestions(packageId)
    const result: ImportResult = { imported: 0, duplicates: 0, errors: [] }

    for (let i = 0; i < pkgQuestions.length; i++) {
        const pq = pkgQuestions[i]
        try {
            // Reprocess the current JSON
            const normalized = normalizeQuestion(pq.question_json as ImportedQuestion)
            const valid = validateQuestion(normalized)

            if (!valid.ok) {
                result.errors.push({ index: i, message: `Q${i + 1}: ${valid.error}` })
                continue
            }

            const hash = computeHash(normalized.enunciado as string)

            const { error } = await supabase
                .from('package_questions')
                .update({
                    question_json: normalized,
                    hash_logico: hash,
                    status: pq.status === 'approved' ? 'approved' : 'edited'
                })
                .eq('id', pq.id)

            if (error) throw error
            result.imported++
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Erro no reprocessamento'
            result.errors.push({ index: i, message: msg })
        }
    }

    await logAdminAction('REPROCESS_PACKAGE', 'question_packages', packageId, {
        reprocessed: result.imported,
        errors: result.errors.length
    })

    return result
}

export async function publishQuestion(packageQuestionId: string, taxonomyIds?: { course_id?: string; specialty_id?: string; subspecialty_id?: string; subject_id?: string }): Promise<{ success: boolean; question_id?: string; error?: any }> {
    try {
        const { data: pq, error: fetchErr } = await supabase
            .from('package_questions')
            .select('*, question_packages(taxonomy_path, bank_id, banks(name))')
            .eq('id', packageQuestionId)
            .single()

        if (fetchErr) throw fetchErr

        const qj = pq.question_json as Record<string, any>

        // 1. Resolve taxonomy if not provided
        let txRaw = taxonomyIds as any
        if (!txRaw && pq.question_packages?.taxonomy_path) {
            txRaw = await resolveTaxonomyPath(pq.question_packages.taxonomy_path)
        }

        // 2. Check for existing question with same hash (Logical Upsert)
        const { data: existingQ } = await supabase
            .from('questao_base')
            .select('id')
            .eq('hash', pq.hash_logico)
            .maybeSingle()

        const questionId = existingQ?.id || generateShortId()

        // 3. Prepare taxonomy fields (using slugs/names as seen in current DB)
        const taxonomyFields = {
            course_id: txRaw?.course?.slug || txRaw?.course_id || 'medicina',
            specialty_id: txRaw?.specialty?.slug || txRaw?.specialty_id,
            subspecialty_id: txRaw?.subspecialty?.slug || txRaw?.subspecialty_id,
            subject_id: txRaw?.subject?.name || txRaw?.subject_id, // Subject uses name as seen in existing data
            area_id: txRaw?.specialty?.slug || txRaw?.specialty_id,
            subarea_id: txRaw?.subspecialty?.slug || txRaw?.subspecialty_id,
            tema_id: txRaw?.subject?.name || txRaw?.subject_id
        }

        // 4. Upsert into main question bank (questao_base)
        const { error: upsertErr } = await supabase
            .from('questao_base')
            .upsert({
                id: questionId,
                enunciado: qj.enunciado,
                options: qj.options,
                correct_option_id: qj.answer,
                explanation: qj.rationale,
                alternative_explanations: qj.option_rationales || null,
                difficulty: qj.difficulty || 'media',
                hash: pq.hash_logico,
                status: 'active',
                status_validacao: 'APROVADA',
                fonte: 'importada',
                source: pq.question_packages?.banks?.name,
                ...taxonomyFields,
                metadata: {
                    tags: qj.tags,
                    package_id: pq.package_id,
                    bank_source_id: pq.question_packages?.bank_id,
                    imported_at: new Date().toISOString()
                }
            }, { onConflict: 'id' })

        if (upsertErr) throw upsertErr

        // 5. Update status in package
        await supabase
            .from('package_questions')
            .update({
                status: 'approved',
                question_id: questionId
            })
            .eq('id', packageQuestionId)

        return { success: true, question_id: questionId }
    } catch (err: any) {
        console.error('[banks] publishQuestion Error:', err)
        return { success: false, error: err }
    }
}

export async function publishPackage(packageId: string): Promise<{ published: number; errors: number }> {
    const { data: pkgQuestions } = await getPackageQuestions(packageId)
    // Only publish those not already published
    const toPublish = pkgQuestions.filter(q => q.status === 'draft' || q.status === 'edited')
    let published = 0
    let errors = 0

    for (const pq of toPublish) {
        const res = await publishQuestion(pq.id)
        if (res.success) {
            published++
        } else {
            errors++
        }
    }

    await updatePackage(packageId, { status: 'published' })
    await logAdminAction('PUBLISH_PACKAGE', 'question_packages', packageId, { published, errors })
    return { published, errors }
}

// ─── Prompt Generator ──────────────────────────────────────────────────────

export function generatePrompt(opts: {
    bank: Bank
    profile: BankProfile | null
    blueprint: QuestionBlueprint | null
    taxonomyPath: string
    difficulty: string
    count: number
    packageId?: string
}): string {
    const { bank, profile, blueprint, taxonomyPath, difficulty, count, packageId } = opts

    const diffLabel: Record<string, string> = {
        facil: 'FÁCIL (básico, conceitual)',
        media: 'MÉDIA (aplicação clínica/prática)',
        dificil: 'DIFÍCIL (raciocínio clínico complexo)',
        mista: 'MISTA (variar entre fácil, média e difícil)',
    }

    const profileSection = profile
        ? `## PERFIL DA BANCA\n\n${profile.profile_text}\n\n### Regras estruturadas (JSON):\n${JSON.stringify(profile.profile_json, null, 2)}\n\n### Exemplos modelo:\n${JSON.stringify(profile.examples_json, null, 2)}`
        : '## PERFIL DA BANCA\n\n[Nenhum perfil cadastrado para esta banca. Use o estilo padrão do concurso público brasileiro.]'

    const blueprintSection = blueprint
        ? `## BLUEPRINT / MODELO DE QUESTÃO\n\nNome: ${blueprint.name}\nFormato: ${blueprint.format}\nRegras:\n${JSON.stringify(blueprint.blueprint_rules, null, 2)}`
        : ''

    return `# INSTRUÇÕES DE GERAÇÃO DE QUESTÕES — QRub

## ID DO PACOTE (OBRIGATÓRIO)
${packageId || 'Não informado'}

## BANCA
${bank.name}

## TAXONOMIA / ASSUNTO
${taxonomyPath || 'Definido pelo admin'}

## DIFICULDADE
${diffLabel[difficulty] || difficulty}

## QUANTIDADE
Gere exatamente **${count} questões**.

${profileSection}

${blueprintSection}

---

## FORMATO DE SAÍDA OBRIGATÓRIO

Retorne APENAS um JSON array válido no seguinte formato (sem texto antes ou depois):

\`\`\`json
[
  {
    "enunciado": "Texto completo do enunciado da questão...",
    "options": {
      "a": "Texto da alternativa A",
      "b": "Texto da alternativa B",
      "c": "Texto da alternativa C",
      "d": "Texto da alternativa D",
      "e": "Texto da alternativa E"
    },
    "answer": "a",
    "rationale": "Justificativa detalhada do gabarito...",
    "option_rationales": {
      "a": "Por que A está correta...",
      "b": "Por que B está errada...",
      "c": "Por que C está errada...",
      "d": "Por que D está errada...",
      "e": "Por que E está errada..."
    },
    "difficulty": "${difficulty}",
    "tags": ["tag1", "tag2"]
  }
]
\`\`\`

## REGRAS OBRIGATÓRIAS
- Todas as ${blueprint?.format === 'mcq_4' ? '4' : '5'} alternativas presentes
- Gabarito em letra minúscula (a, b, c, d ou e)
- Enunciado sem nome de banca ou ano
- Justificativas completas para TODAS as alternativas
- Conteúdo 100% em português brasileiro
- Sem repetição de conteúdo entre questões
- JSON válido sem comentários ou texto extra`
}

// ─── Helpers ───────────────────────────────────────────────────────────────

export function normalizeQuestion(q: ImportedQuestion): Record<string, unknown> {
    // 1. Alternativas
    const optionsRaw = q.options || q.alternativas || q.alternatives || {}
    const options: Record<string, string> = {}
    for (const [k, v] of Object.entries(optionsRaw)) {
        const key = k.toLowerCase().trim()
        if (['a', 'b', 'c', 'd', 'e'].includes(key)) {
            options[key] = String(v).trim()
        }
    }

    // 2. Gabarito
    const answerRaw = String(q.answer || q.gabarito || q.correct_answer || q.resposta || '').toLowerCase().trim()
    let answer = ''
    if (['a', 'b', 'c', 'd', 'e'].includes(answerRaw)) {
        answer = answerRaw
    } else if (answerRaw.includes('a')) answer = 'a'
    else if (answerRaw.includes('b')) answer = 'b'
    else if (answerRaw.includes('c')) answer = 'c'
    else if (answerRaw.includes('d')) answer = 'd'
    else if (answerRaw.includes('e')) answer = 'e'

    // 3. Justificativa Geral
    const rationale = String(
        q.justificativa_geral ||
        q.justificativa_gabarito ||
        q.rationale ||
        q.justificativa ||
        q.explanation ||
        ''
    ).trim()

    // 4. Justificativas por Alternativa
    const optionRationalesRaw = q.option_rationales || q.justificativas_alternativas || q.explanation_options || {}
    const option_rationales: Record<string, string> = {}
    for (const [k, v] of Object.entries(optionRationalesRaw)) {
        const key = k.toLowerCase().trim()
        if (['a', 'b', 'c', 'd', 'e'].includes(key)) {
            option_rationales[key] = String(v).trim()
        }
    }

    // 5. Dificuldade
    const diffRaw = String(q.difficulty || q.dificuldade || 'media').toLowerCase().trim()
    let difficulty = 'media'
    if (diffRaw.includes('facil') || diffRaw.includes('easy')) difficulty = 'facil'
    else if (diffRaw.includes('dificil') || diffRaw.includes('hard')) difficulty = 'dificil'
    else if (diffRaw.includes('media') || diffRaw.includes('moderada')) difficulty = 'media'

    // 6. Tags
    let tags: string[] = []
    if (Array.isArray(q.tags)) {
        tags = q.tags.map(t => String(t).trim()).filter(Boolean)
    } else if (typeof q.tags === 'string') {
        tags = q.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    return {
        enunciado: String(q.enunciado || q.stem || q.pergunta || q.texto || '').trim(),
        options,
        answer,
        rationale,
        option_rationales,
        difficulty,
        tags,
    }
}

function validateQuestion(q: Record<string, unknown>): { ok: boolean; error?: string } {
    if (!q.enunciado || String(q.enunciado).length < 10) {
        return { ok: false, error: 'Enunciado vazio ou muito curto (min 10 chars)' }
    }

    const options = q.options as Record<string, string> | undefined
    if (!options) return { ok: false, error: 'Objeto de alternativas ausente' }

    const optionKeys = Object.keys(options)
    if (optionKeys.length < 4) {
        return { ok: false, error: `Número insuficiente de alternativas (encontradas: ${optionKeys.length}, esperado: 5)` }
    }

    const answer = String(q.answer || '')
    if (!answer || !['a', 'b', 'c', 'd', 'e'].includes(answer)) {
        return { ok: false, error: `Gabarito inválido ou ausente: "${answer}"` }
    }

    if (!options[answer]) {
        return { ok: false, error: `Gabarito "${answer}" não possui texto na alternativa correspondente` }
    }

    if (!q.rationale || String(q.rationale).length < 5) {
        return { ok: false, error: 'Justificativa geral ausente ou muito curta' }
    }

    return { ok: true }
}

function computeHash(text: string): string {
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim()
    let hash = 0
    for (let i = 0; i < normalized.length; i++) {
        const char = normalized.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return Math.abs(hash).toString(36)
}

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

function generateShortId(): string {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
}

export async function resolveTaxonomyPath(path: string): Promise<{
    course?: { id: string; slug: string; name: string };
    specialty?: { id: string; slug: string; name: string };
    subspecialty?: { id: string; slug: string; name: string };
    subject?: { id: string; slug: string; name: string };
}> {
    const parts = path.split(' > ').map(p => p.trim())
    const result: any = {}

    // Dicionário de sinônimos médicos para melhorar a resolução de taxonomia
    const MEDICAL_SYNONYMS: Record<string, string[]> = {
        'cardiologia': ['cardio', 'coracao', 'sistema cardiovascular'],
        'pneumologia': ['pneumo', 'pulmao', 'respiratorio', 'dpoc', 'tep', 'tromboembolismo pulmonar'],
        'nefrologia': ['nefro', 'rim', 'renal', 'disturbios hidroeletroliticos'],
        'gastroenterologia': ['gastro', 'digestivo', 'estomago', 'intestino'],
        'endocrinologia': ['endocrino', 'diabetes', 'tireoide', 'hormonal'],
        'infectologia': ['infecto', 'doencas infectocontagiosas', 'virus', 'bacterias', 'sepse'],
        'hematologia': ['hemato', 'sangue', 'anemia', 'leucemia'],
        'reumatologia': ['reumato', 'articulacoes', 'autoimune'],
        'geriatria': ['idoso', 'terceira idade'],
        'urologia': ['uro', 'sistema urinario', 'litiase renal', 'infeccao urinaria'],
        'obstetricia': ['go', 'obstetrico', 'gravidez', 'parto'],
        'pediatria': ['peds', 'crianca', 'infantil'],
        'psiquiatria': ['psiq', 'mental', 'saude mental', 'depressao', 'ansiedade']
    }

    let lastId: string | null = null

    for (let i = 0; i < parts.length; i++) {
        const originalName = parts[i]
        const level = i === 0 ? 'course' : i === 1 ? 'specialty' : i === 2 ? 'subspecialty' : 'subject'

        // Tentar busca exata primeiro
        let query = supabase.from('taxonomia').select('id, slug, name').eq('name', originalName).eq('level', level)
        if (lastId) query = query.eq('parent_id', lastId)

        let { data } = await query.maybeSingle()

        // Se não encontrar, tentar busca por sinônimos ou ilike
        if (!data) {
            // Tentar encontrar uma especialidade que possua o termo original como sinônimo
            const foundTerm = Object.entries(MEDICAL_SYNONYMS).find(([key, synonyms]) =>
                synonyms.some(s => originalName.toLowerCase().includes(s)) || key === originalName.toLowerCase()
            )

            if (foundTerm) {
                const searchName = foundTerm[0]
                let synQuery = supabase.from('taxonomia').select('id, slug, name').ilike('name', `%${searchName}%`).eq('level', level)
                if (lastId) synQuery = synQuery.eq('parent_id', lastId)
                const { data: synData } = await synQuery.maybeSingle()
                data = synData
            }
        }

        // Última tentativa: busca partial pelo nome original
        if (!data) {
            let partialQuery = supabase.from('taxonomia').select('id, slug, name').ilike('name', `%${originalName}%`).eq('level', level)
            if (lastId) partialQuery = partialQuery.eq('parent_id', lastId)
            const { data: partialData } = await partialQuery.maybeSingle()
            data = partialData
        }

        if (data) {
            lastId = data.id
            result[level] = { id: data.id, slug: data.slug, name: data.name }
        } else {
            // Se falhou num nível intermediário, tentamos continuar para o próximo se for assunto (as vezes pulam sub)
            if (level === 'subspecialty') continue
            break
        }
    }

    return result
}
