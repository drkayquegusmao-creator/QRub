import { OpenAI } from 'openai';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { GOLD_STANDARD_SYSTEM_PROMPT, buildPrompt, buildIngestionPrompt } from '@/lib/prompts/gold-standard';

export async function POST(req: Request) {
    try {
        const {
            apiKey,
            topic,
            specialty,
            count,
            provider = 'openai',
            mode = 'generation',
            examText,
            answerKey,
            start,
            end,
            source
        } = await req.json();

        if (!apiKey) {
            return NextResponse.json({ error: 'API Key is required' }, { status: 400 });
        }

        const userPrompt = mode === 'ingestion'
            ? buildIngestionPrompt(examText, answerKey, start, end, source)
            : buildPrompt(topic, specialty, count);

        let parsedResult;

        // --- GOOGLE GEMINI HANDLER ---
        if (provider === 'gemini') {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash", // Flash é mais rápido e menos propenso a timeout no Vercel (60s limit)
                safetySettings: [
                    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
                    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
                    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
                ]
            });

            const finalPrompt = `${GOLD_STANDARD_SYSTEM_PROMPT}\n\n-----\n\n${userPrompt}`;

            try {
                const result = await model.generateContent({
                    contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
                    generationConfig: {
                        responseMimeType: "application/json",
                    }
                });

                const text = result.response.text();
                if (!text) throw new Error('Gemini retornou texto vazio.');

                // Tenta limpar markdown primeiro
                let cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

                try {
                    parsedResult = JSON.parse(cleanText);
                } catch (e) {
                    // Fallback: Tenta extrair apenas o array JSON via Regex se houver texto em volta
                    const jsonArrayMatch = cleanText.match(/\[[\s\S]*\]/);
                    if (jsonArrayMatch) {
                        parsedResult = JSON.parse(jsonArrayMatch[0]);
                    } else {
                        throw new Error('Não foi possível encontrar um JSON válido na resposta do Gemini.');
                    }
                }
            } catch (geminiError: any) {
                console.error('Gemini Internal Error:', geminiError);
                throw new Error(`Erro no Gemini: ${geminiError.message || 'Bloqueio de Segurança ou Timeout'}`);
            }

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
                temperature: 0.4,
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

        // Validação básica para não retornar array vazio silenciosamente se o parse falhou na estrutura
        if (questions.length === 0) {
            console.warn('Parsed result was empty:', parsedResult);
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
