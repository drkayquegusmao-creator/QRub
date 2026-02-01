
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { GOLD_STANDARD_SYSTEM_PROMPT, buildPrompt } from '@/lib/prompts/gold-standard';

export async function POST(req: Request) {
    try {
        const { apiKey, topic, specialty, count } = await req.json();

        if (!apiKey) {
            return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
        }

        const openai = new OpenAI({
            apiKey: apiKey,
        });

        const userPrompt = buildPrompt(topic, specialty, count);

        const completion = await openai.chat.completions.create({
            model: "gpt-4o", // O melhor modelo para seguir instruções complexas
            messages: [
                { role: "system", content: GOLD_STANDARD_SYSTEM_PROMPT },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7, // Criatividade controlada
            response_format: { type: "json_object" } // Força JSON válido
        });

        const content = completion.choices[0].message.content;

        if (!content) {
            throw new Error('No content generated');
        }

        // O GPT às vezes envelopa o array em um objeto tipo { "questions": [...] }
        // Vamos tentar parsear e normalizar
        let parsed = JSON.parse(content);

        let questions = [];
        if (Array.isArray(parsed)) {
            questions = parsed;
        } else if (parsed.questions && Array.isArray(parsed.questions)) {
            questions = parsed.questions;
        } else if (parsed.data && Array.isArray(parsed.data)) {
            questions = parsed.data;
        } else {
            // Tenta achar o primeiro array no objeto
            const firstArray = Object.values(parsed).find(v => Array.isArray(v));
            if (firstArray) {
                questions = firstArray as any[];
            } else {
                // Fallback: assume que retornou um único objeto fora de array
                questions = [parsed];
            }
        }

        return NextResponse.json({ questions });

    } catch (error: any) {
        console.error('Generation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate questions' },
            { status: 500 }
        );
    }
}
