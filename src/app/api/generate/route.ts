import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { GOLD_STANDARD_SYSTEM_PROMPT, buildPrompt } from '@/lib/prompts/gold-standard';

export async function POST(req: Request) {
    try {
        const { apiKey, topic, specialty, count, provider = 'openai' } = await req.json();

        if (!apiKey) {
            return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
        }

        const userPrompt = buildPrompt(topic, specialty, count);
        let parsedResult;

        // --- GOOGLE GEMINI HANDLER ---
        if (provider === 'gemini') {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

            // Gemini não usa "system role" da mesma forma estrita nos SDKs antigos, mas o 1.5 suporta instruction
            // Vamos fundir o prompt para garantir
            const finalPrompt = `${GOLD_STANDARD_SYSTEM_PROMPT}\n\n-----\n\n${userPrompt}`;

            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                }
            });

            const text = result.response.text();
            parsedResult = JSON.parse(text);

        }
        // --- OPENAI HANDLER (DEFAULT) ---
        else {
            const openai = new OpenAI({ apiKey: apiKey });

            const completion = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: GOLD_STANDARD_SYSTEM_PROMPT },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            });

            const content = completion.choices[0].message.content;
            if (!content) throw new Error('No content from OpenAI');
            parsedResult = JSON.parse(content);
        }

        // --- NORMALIZAÇÃO DE RESPOSTA ---
        let questions = [];
        if (Array.isArray(parsedResult)) {
            questions = parsedResult;
        } else if (parsedResult.questions && Array.isArray(parsedResult.questions)) {
            questions = parsedResult.questions;
        } else if (parsedResult.data && Array.isArray(parsedResult.data)) {
            questions = parsedResult.data;
        } else {
            // Tenta achar o primeiro array no objeto
            const firstArray = Object.values(parsedResult).find(v => Array.isArray(v));
            questions = firstArray ? (firstArray as any[]) : [parsedResult];
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
