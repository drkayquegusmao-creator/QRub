import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { apiKey, questions } = await req.json()

        if (!apiKey) {
            return NextResponse.json({ error: 'API Key missing' }, { status: 400 })
        }

        if (!questions || !Array.isArray(questions)) {
            return NextResponse.json({ error: 'No questions provided' }, { status: 400 })
        }

        const SYSTEM_PROMPT = `VOCÊ É O DOUTOR QRUB - O MAIOR ESPECIALISTA BRASILEIRO EM REVALIDAÇÃO MÉDICA E LÍNGUA PORTUGUESA.

SUA MISSÃO: Transformar rascunhos de questões em textos médicos de elite (padrão INEP/Revalida).

REGRAS DE OURO PARA CORREÇÃO:
1. ORTOGRAFIA E GRAMÁTICA: Corrija qualquer erro de português, pontuação ou concordância.
2. TERMOS TÉCNICOS: Use a nomenclatura médica oficial (ex: "IAM sem supra" em vez de termos genéricos).
3. CLAREZA: Remova ambiguidades. O enunciado deve ser direto e clínico.
4. JUSTIFICATIVAS: Garanta que a explicação explique por que a alternativa está correta E por que as outras estão erradas (se o campo permitir).

PARÂMETROS DE RESPOSTA (JSON):
- Retorne um array de sugestões que serão APLICADAS AUTOMATICAMENTE.
- Foque nos campos: "enunciado", "comando", "justificativa_gabarito", "justificativas_alternativas".
- Para "justificativas_alternativas", use o formato "justificativas_alternativas.a", "justificativas_alternativas.b", etc.

FORMATO:
{
  "suggestions": [
    {
      "questionIndex": number,
      "field": string,
      "original": "...",
      "suggested": "...",
      "reason": "..."
    }
  ]
}`

        const USER_PROMPT = `Analise as seguintes questões e sugira correções linguísticas e técnicas:
${JSON.stringify(questions, null, 2)}`

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: USER_PROMPT }
                ],
                temperature: 0.3,
                response_format: { type: 'json_object' }
            })
        })

        const rawData = await openaiResponse.json()

        if (rawData.error) {
            return NextResponse.json({ error: rawData.error.message }, { status: 500 })
        }

        const review = JSON.parse(rawData.choices[0].message.content)

        return NextResponse.json(review)

    } catch (error: any) {
        console.error('AI Review Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
