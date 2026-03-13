import { supabase } from '@/lib/supabase'
import { logConcursoAdminAction as logAdminAction } from '@/lib/concursos/editais'

// ─── Types ────────────────────────────────────────────────────────────────

export interface ConcursoBank {
    id: string
    name: string
    slug: string
    description?: string
    is_active: boolean
    created_at?: string
}

export interface ConcursoBankProfile {
    id: string
    bank_id: string
    version: number
    profile_text: string
    profile_json?: Record<string, unknown>
    examples_json?: unknown[]
    is_current: boolean
    created_at?: string
}

export interface ConcursoQuestionBlueprint {
    id: string
    bank_id: string
    name: string
    format: 'mcq_5' | 'mcq_4' | 'certo_errado' | 'discursiva'
    blueprint_rules?: Record<string, unknown>
    description?: string
    is_active: boolean
    created_at?: string
}

export interface ConcursoQuestionPackage {
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
    banks?: ConcursoBank
    question_blueprints?: ConcursoQuestionBlueprint
}

export interface ConcursoPackageQuestion {
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

export async function getConcursoBanks(activeOnly = false) {
    try {
        let query = supabase.from('concurso_banks').select('*').order('name')
        if (activeOnly) query = query.eq('is_active', true)
        const { data, error } = await query
        if (error) throw error
        return { data: (data || []) as ConcursoBank[], error: null }
    } catch (err) {
        console.error('[concursos-banks] getBanks:', err)
        return { data: [] as ConcursoBank[], error: err }
    }
}

export async function createConcursoBank(payload: Partial<ConcursoBank>) {
    try {
        const slug = payload.slug || generateSlug(payload.name || '')
        const { data, error } = await supabase
            .from('concurso_banks')
            .insert({ ...payload, slug })
            .select()
            .single()
        if (error) throw error
        await logAdminAction('CREATE_BANK', 'concurso_banks', data.id, { name: data.name })
        return { data: data as ConcursoBank, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function updateConcursoBank(id: string, payload: Partial<ConcursoBank>) {
    try {
        const { data, error } = await supabase
            .from('concurso_banks')
            .update(payload)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        await logAdminAction('UPDATE_BANK', 'concurso_banks', id, payload)
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

// ─── Bank Profiles ────────────────────────────────────────────────────────

export async function getConcursoBankProfiles(bankId: string) {
    try {
        const { data, error } = await supabase
            .from('concurso_bank_profiles')
            .select('*')
            .eq('bank_id', bankId)
            .order('version', { ascending: false })
        if (error) throw error
        return { data: (data || []) as ConcursoBankProfile[], error: null }
    } catch (err) {
        return { data: [] as ConcursoBankProfile[], error: err }
    }
}

export async function getConcursoCurrentProfile(bankId: string) {
    try {
        const { data, error } = await supabase
            .from('concurso_bank_profiles')
            .select('*')
            .eq('bank_id', bankId)
            .eq('is_current', true)
            .maybeSingle()
        if (error) throw error
        return { data: data as ConcursoBankProfile | null, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function createConcursoBankProfile(payload: Partial<ConcursoBankProfile>) {
    try {
        // Find latest version
        const { data: latest } = await supabase
            .from('concurso_bank_profiles')
            .select('version')
            .eq('bank_id', payload.bank_id)
            .order('version', { ascending: false })
            .limit(1)
            .single()

        const newVersion = (latest?.version || 0) + 1

        if (payload.is_current) {
            await supabase
                .from('concurso_bank_profiles')
                .update({ is_current: false })
                .eq('bank_id', payload.bank_id)
        }

        const { data, error } = await supabase
            .from('concurso_bank_profiles')
            .insert({ ...payload, version: newVersion })
            .select()
            .single()
        if (error) throw error
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function setConcursoCurrentProfile(profileId: string, bankId: string) {
    try {
        await supabase
            .from('concurso_bank_profiles')
            .update({ is_current: false })
            .eq('bank_id', bankId)

        const { data, error } = await supabase
            .from('concurso_bank_profiles')
            .update({ is_current: true })
            .eq('id', profileId)
            .select()
            .single()
        if (error) throw error
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

// ─── Blueprints ────────────────────────────────────────────────────────────

export async function getConcursoBlueprints(bankId: string) {
    try {
        const { data, error } = await supabase
            .from('concurso_question_blueprints')
            .select('*')
            .eq('bank_id', bankId)
            .order('name')
        if (error) throw error
        return { data: (data || []) as ConcursoQuestionBlueprint[], error: null }
    } catch (err) {
        return { data: [] as ConcursoQuestionBlueprint[], error: err }
    }
}

export async function createConcursoBlueprint(payload: Partial<ConcursoQuestionBlueprint>) {
    try {
        const { data, error } = await supabase
            .from('concurso_question_blueprints')
            .insert(payload)
            .select()
            .single()
        if (error) throw error
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function updateConcursoBlueprint(id: string, payload: Partial<ConcursoQuestionBlueprint>) {
    try {
        const { data, error } = await supabase
            .from('concurso_question_blueprints')
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

export async function getConcursoPackages(filters?: { status?: string; bank_id?: string }) {
    try {
        let query = supabase
            .from('concurso_question_packages')
            .select(`*, banks:concurso_banks(name, slug), question_blueprints:concurso_question_blueprints(name, format)`)
            .order('created_at', { ascending: false })

        if (filters?.status) query = query.eq('status', filters.status)
        if (filters?.bank_id) query = query.eq('bank_id', filters.bank_id)

        const { data, error } = await query
        if (error) throw error
        return { data: (data || []) as ConcursoQuestionPackage[], error: null }
    } catch (err) {
        return { data: [] as ConcursoQuestionPackage[], error: err }
    }
}

export async function createConcursoPackage(payload: Partial<ConcursoQuestionPackage>) {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        const cleanPayload = { ...payload }
        if (cleanPayload.bank_id === '') delete cleanPayload.bank_id
        if (cleanPayload.blueprint_id === '') delete cleanPayload.blueprint_id

        const { data, error } = await supabase
            .from('concurso_question_packages')
            .insert({ ...cleanPayload, created_by: user?.id })
            .select()
            .single()
        if (error) throw error
        await logAdminAction('CREATE_PACKAGE', 'concurso_question_packages', data.id, { title: data.title })
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function updateConcursoPackage(id: string, payload: Partial<ConcursoQuestionPackage>) {
    try {
        const { data, error } = await supabase
            .from('concurso_question_packages')
            .update(payload)
            .eq('id', id)
            .select()
            .single()
        if (error) throw error
        await logAdminAction('UPDATE_PACKAGE', 'concurso_question_packages', id, payload)
        return { data, error: null }
    } catch (err) {
        return { data: null, error: err }
    }
}

export async function deleteConcursoPackage(id: string) {
    try {
        const { error } = await supabase
            .from('concurso_question_packages')
            .delete()
            .eq('id', id)
        if (error) throw error
        await logAdminAction('DELETE_PACKAGE', 'concurso_question_packages', id, { id })
        return { error: null }
    } catch (err) {
        return { error: err }
    }
}

export async function getConcursoPackageQuestions(packageId: string) {
    try {
        const { data, error } = await supabase
            .from('concurso_package_questions')
            .select('*')
            .eq('package_id', packageId)
            .order('order_index')
        if (error) throw error
        return { data: (data || []) as ConcursoPackageQuestion[], error: null }
    } catch (err) {
        return { data: [] as ConcursoPackageQuestion[], error: err }
    }
}

export async function importQuestionsToConcursoPackage(packageId: string, questions: any[]) {
    // Basic implementation for now, mirroring the original logic
    const results = { imported: 0, duplicates: 0, errors: [] as any[] }
    for (const q of questions) {
        try {
            const normalized = normalizeQuestion(q)
            const hash = computeHash(normalized.enunciado as string)
            
            const { error } = await supabase
                .from('concurso_package_questions')
                .insert({
                    package_id: packageId,
                    question_json: normalized,
                    hash_logico: hash,
                    status: 'draft'
                })
            if (error) throw error
            results.imported++
        } catch (err: any) {
            results.errors.push({ message: err.message })
        }
    }
    return results
}

export async function updateConcursoPackageQuestion(id: string, payload: Partial<ConcursoPackageQuestion>) {
    try {
        const { data, error } = await supabase
            .from('concurso_package_questions')
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

export async function deleteConcursoPackageQuestion(id: string) {
    try {
        const { error } = await supabase
            .from('concurso_package_questions')
            .delete()
            .eq('id', id)
        if (error) throw error
        return { error: null }
    } catch (err) {
        return { error: err }
    }
}

export async function publishConcursoQuestion(packageQuestionId: string): Promise<{ success: boolean; error?: any }> {
    try {
        const { data: pq, error: fetchErr } = await supabase
            .from('concurso_package_questions')
            .select('*, package:concurso_question_packages(taxonomy_path, bank_id, banks:concurso_banks(name))')
            .eq('id', packageQuestionId)
            .single()

        if (fetchErr) throw fetchErr
        const qj = pq.question_json as any

        // Upsert into concurso_questao_base
        const { error: upsertErr } = await supabase
            .from('concurso_questao_base')
            .insert({
                enunciado: qj.enunciado,
                options: qj.options,
                correct_option_id: qj.answer,
                explanation: qj.rationale,
                difficulty: qj.difficulty || 'media',
                hash: pq.hash_logico,
                status: 'active',
                source: pq.package?.banks?.name,
                taxonomy_path: pq.package?.taxonomy_path,
                metadata: {
                    tags: qj.tags,
                    package_id: pq.package_id
                }
            })

        if (upsertErr) throw upsertErr

        await supabase
            .from('concurso_package_questions')
            .update({ status: 'approved' })
            .eq('id', packageQuestionId)

        return { success: true }
    } catch (err) {
        return { success: false, error: err }
    }
}

// ─── Helpers (Mirroring original) ──────────────────────────────────────────

// ─── AI Prompt Generation ──────────────────────────────────────────────────

export interface ConcursoPromptPayload {
    bank: ConcursoBank
    profile: ConcursoBankProfile | null
    blueprint: ConcursoQuestionBlueprint | null
    taxonomyPath: string
    difficulty: string
    count: number
    packageId: string
}

export function generateConcursoPrompt(payload: ConcursoPromptPayload): string {
    const { bank, profile, blueprint, taxonomyPath, difficulty, count, packageId } = payload
    
    // Default blueprint structure if none provided
    const blueprintText = blueprint?.blueprint_rules 
        ? JSON.stringify(blueprint.blueprint_rules, null, 2)
        : `Utilize o formato de 5 alternativas (A-E), sendo apenas uma correta.`

    return `
# PROTOCOLO DE GERAÇÃO MASTER • QRUB CONCURSOS
# IDENTIFICADOR DO LOTE: ${packageId.toUpperCase()}

VOCÊ É UM ESPECIALISTA EM CONCURSOS PÚBLICOS DE ALTA PERFORMANCE.
SUA MISSÃO É GERAR UM LOTE DE ${count} QUESTÕES INÉDITAS NO ESTILO DA BANCA ${bank.name.toUpperCase()}.

---
## 1. PERFIL DA BANCA (DNA)
${profile?.profile_text || 'Siga o estilo padrão de questões de concursos de nível superior, com foco em jurisprudência, doutrina e legislação seca conforme o cargo.'}

---
## 2. ESCOPO TAXONÔMICO
ÁREA/ASSUNTO: ${taxonomyPath}
DIFICULDADE ALVO: ${difficulty.toUpperCase()}

---
## 3. DIRETRIZES TÉCNICAS (BLUEPRINT)
${blueprintText}

---
## 4. REGRAS DE OURO
- NUNCA repita enunciados ou conceitos idênticos no mesmo lote.
- As alternativas incorretas (distratores) devem ser plausíveis e baseadas em erros comuns.
- A justificativa deve ser didática, citando a base legal/jurisprudencial quando aplicável.
- O campo "tags" deve conter palavras-chave para busca direta.

---
## 5. FORMATO DE SAÍDA (JSON OBRIGATÓRIO)
Retorne APENAS um array JSON válido no formato:
[
  {
    "enunciado": "Texto da questão...",
    "options": {
      "a": "Texto da opção A",
      "b": "Texto da opção B",
      "c": "Texto da opção C",
      "d": "Texto da opção D",
      "e": "Texto da opção E"
    },
    "answer": "letra da correta (a, b, c, d ou e)",
    "rationale": "Justificativa completa da questão...",
    "option_rationales": {
      "a": "Por que a A está certa ou errada...",
      "b": "...",
      "c": "...",
      "d": "...",
      "e": "..."
    },
    "difficulty": "${difficulty}",
    "tags": ["Tag1", "Tag2"]
  }
]
`.trim()
}

function generateSlug(name: string): string {
    return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function computeHash(text: string): string {
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim()
    let hash = 0
    for (let i = 0; i < normalized.length; i++) {
        hash = ((hash << 5) - hash) + normalized.charCodeAt(i)
        hash = hash & hash
    }
    return Math.abs(hash).toString(36)
}

function normalizeQuestion(q: any): any {
    // Simply proxying the logic for now
    return {
        enunciado: q.enunciado || q.stem || '',
        options: q.options || q.alternativas || {},
        answer: (q.answer || q.gabarito || '').toLowerCase(),
        rationale: q.rationale || q.justificativa || '',
        difficulty: q.difficulty || 'media',
        tags: q.tags || []
    }
}
