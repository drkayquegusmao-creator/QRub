import { NextResponse } from 'next/server'
import crypto from 'crypto'

// Use require for pdf-parse as it's a CommonJS module with side effects
// const pdf = require('pdf-parse')
const pdf = async () => ({ text: 'Extracao de PDF temporariamente desativada para build' })

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Common Bancas
const BANCAS_LIST = [
    'FGV', 'CEBRASPE', 'VUNESP', 'FCC', 'IBFC', 'INEP', 'CESGRANRIO', 'IDECAN',
    'FUNDATEC', 'AOCP', 'FAU', 'CONSULPLAN', 'QUADRIX', 'IDIB', 'IADES'
]

// Extraction Heuristics
async function extractDataFromText(text: string) {
    const data: any = {
        titulo: { value: '', confidence: 0, source: '' },
        banca: { value: '', confidence: 0, source: '' },
        ano: { value: '', confidence: 0, source: '' },
        area: { value: 'concurso', confidence: 0.5, source: '' },
        taxa: { value: '', confidence: 0, source: '' },
        data_prova: { value: '', confidence: 0, source: '' },
        inscricoes_inicio: { value: '', confidence: 0, source: '' },
        inscricoes_fim: { value: '', confidence: 0, source: '' },
        local_cidade: { value: '', confidence: 0, source: '' }
    }

    const first5k = text.substring(0, 5000)
    const lines = text.split('\n').filter(l => l.trim().length > 3)

    // 1. Título
    const titleLines = lines.slice(0, 15)
    const titleCandidate = titleLines.find(l =>
        /EDITAL|CONCURSO|PROCESSO SELETIVO|RESIDÊNCIA|REVALIDA/i.test(l) &&
        l.length > 20
    ) || titleLines[0]

    if (titleCandidate) {
        data.titulo.value = titleCandidate.trim().substring(0, 100)
        data.titulo.confidence = 0.7
        data.titulo.source = titleCandidate.trim()
    }

    // 2. Banca
    for (const b of BANCAS_LIST) {
        const bancaRegex = new RegExp(`\\b${b}\\b|${b.replace(/ /g, '\\s+')}`, 'i')
        if (bancaRegex.test(first5k)) {
            data.banca.value = b
            data.banca.confidence = 0.9
            data.banca.source = b
            break
        }
    }

    // 3. Ano
    const yearMatch = first5k.match(/\b(202[4-9]|2030)\b/)
    if (yearMatch) {
        data.ano.value = parseInt(yearMatch[1])
        data.ano.confidence = 0.9
        data.ano.source = yearMatch[0]
    }

    // 4. Taxa
    const taxaMatch = text.match(/(?:taxa|valor)[^\d]*?R\$\s*([\d.,]+)/i) ||
        text.match(/R\$\s*([\d.,]+)[^\n]*?(?:inscrição|pagamento)/i)
    if (taxaMatch && !taxaMatch[1].includes('/')) {
        data.taxa.value = parseFloat(taxaMatch[1].replace(/\./g, '').replace(',', '.'))
        data.taxa.confidence = 0.8
        data.taxa.source = taxaMatch[0].trim()
    }

    // 5. Datas
    const dateRegex = /(\d{2})\/(\d{2})\/(2[0-9]{3})/g

    const findBestDate = (keywords: string[]) => {
        for (const line of lines) {
            const lowerLine = line.toLowerCase()
            if (keywords.some(k => lowerLine.includes(k))) {
                const matches = line.match(dateRegex)
                if (matches) return { date: formatDate(matches[0]), context: line.trim() }
            }
        }
        return null
    }

    const prova = findBestDate(['data da prova', 'realização da prova', 'provas objetivas'])
    if (prova) {
        data.data_prova.value = prova.date
        data.data_prova.confidence = 0.85
        data.data_prova.source = prova.context
    }

    const inicio = findBestDate(['início das inscrições', 'abertura das inscrições'])
    if (inicio) {
        data.inscricoes_inicio.value = inicio.date
        data.inscricoes_inicio.confidence = 0.85
        data.inscricoes_inicio.source = inicio.context
    }

    const fim = findBestDate(['término das inscrições', 'fim das inscrições', 'encerramento'])
    if (fim) {
        data.inscricoes_fim.value = fim.date
        data.inscricoes_fim.confidence = 0.85
        data.inscricoes_fim.source = fim.context
    }

    // 6. Cronograma
    const cronograma: any[] = []
    const cronoStart = text.toLowerCase().search(/cronograma|calend[áa]rio/i)
    if (cronoStart > -1) {
        const cronoText = text.substring(cronoStart, cronoStart + 4000)
        let match;
        const cronoRegex = /(\d{2}\/\d{2}\/20\d{2})[^\n]*?([^\n\d]{10,100})/g
        while ((match = cronoRegex.exec(cronoText)) !== null) {
            cronograma.push({
                data: formatDate(match[1]),
                evento: match[2].trim().replace(/^[-:.\s]+/, ''),
                confidence: 0.6,
                source: match[0].trim()
            })
        }
    }

    // 7. Links
    const links: any[] = []
    const urlRegex = /(https?:\/\/[^\s]+)/g
    let uMatch;
    const seenUrls = new Set()
    while ((uMatch = urlRegex.exec(first5k)) !== null) {
        const url = uMatch[1].replace(/[.,;]$/, '')
        if (!seenUrls.has(url)) {
            links.push({ label: 'Link extraído', url: url, confidence: 0.5, source: url })
            seenUrls.add(url)
        }
    }

    return { dados: data, cronograma: cronograma.slice(0, 10), links: links.slice(0, 5) }
}

function formatDate(ptBrDate: string) {
    const [d, m, y] = ptBrDate.split('/')
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('pdf') as File
        if (!file) {
            return NextResponse.json({ error: 'Nenhum arquivo PDF foi enviado' }, { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer()
        if (arrayBuffer.byteLength === 0) {
            return NextResponse.json({ error: 'Arquivo PDF está vazio' }, { status: 400 })
        }

        const buffer = Buffer.from(arrayBuffer)
        const hash = crypto.createHash('sha256').update(buffer).digest('hex')

        let data;
        try {
            // data = await pdf(buffer)
            data = { text: 'Extracao de PDF temporariamente desativada para build' }
        } catch (pdfErr: any) {
            console.error('PDF Parse Error:', pdfErr)
            return NextResponse.json({ error: `Erro ao processar PDF: ${pdfErr.message}` }, { status: 500 })
        }

        const text = data.text
        if (!text || text.trim().length === 0) {
            return NextResponse.json({ error: 'Não foi possível extrair texto deste PDF (pode ser uma imagem)' }, { status: 500 })
        }

        const extracted = await extractDataFromText(text)

        return NextResponse.json({
            hash,
            text: text.substring(0, 5000),
            extracted
        })
    } catch (err: any) {
        console.error('API Error:', err)
        return NextResponse.json({ error: `Erro interno no servidor: ${err.message}` }, { status: 500 })
    }
}
