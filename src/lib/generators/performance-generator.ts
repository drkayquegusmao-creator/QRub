
export type PerformanceTone = 'elite' | 'medio' | 'provocacao' | 'suporte' | 'disciplina' | 'safe';

export interface PerformanceInput {
    total_answered: number | null;
    accuracy_percent: number | null;
    today_answered: number | null;
    streak_correct: number | null;
    streak_wrong: number | null;
    last_10_messages: string[] | null;
}

export interface PerformanceOutput {
    headline: string;
    media: string;
    frase: string;
    tone: PerformanceTone;
}

const FALLBACK_PHRASE = "Bora manter consistência hoje.";

const PHRASE_BANKS: Record<Exclude<PerformanceTone, 'safe'>, string[]> = {
    elite: [
        "Nível altíssimo. Poucos chegam aqui, mas você decidiu morar no topo.",
        "A elite médica não é um título, é o seu hábito diário.",
        "Precisão de cirurgião e foco de veterano. Continue assim.",
        "Sua performance é um insulto à mediocridade. Mantenha o ritmo.",
        "O ranking está ficando pequeno para você. Rumo ao topo!"
    ],
    medio: [
        "Desempenho sólido, mas sabemos que você tem fôlego para mais.",
        "Boa média. Agora é ajustar os detalhes para entrar na elite.",
        "Consistência é o seu forte. O próximo nível está logo ali.",
        "Você está no caminho certo. Discipline o que falta e conquiste tudo.",
        "Média respeitável. Vamos transformar esse 'bom' em 'extraordinário'?"
    ],
    provocacao: [
        "A prova não terá pena. Melhore essa média enquanto há tempo.",
        "Média perigosa. O QRub não perdoa erros bobos. Foco total!",
        "Você é melhor que esses números. Prove isso na próxima rodada.",
        "Rodar é para os fracos. Estude como se sua vida dependesse disso.",
        "Menos desculpas, mais acertos. O mercado é cruel com os médicos médios."
    ],
    suporte: [
        "Sequência difícil? Respire, revise e volte com a mente limpa.",
        "Erros são degraus. Aprenda com eles agora para não errar no exame.",
        "O QRub está aqui para te apoiar. Vamos quebrar essa sequência!",
        "Não se deixe abalar. Até os melhores têm dias de tempestade.",
        "Sequência de erros identificada. Hora de focar na teoria e voltar forte."
    ],
    disciplina: [
        "Volume baixo hoje. A consistência é o que separa os aprovados.",
        "Poucas questões feitas. O cérebro é um músculo, exercite-o agora.",
        "A aprovação exige repetição. Volte para o banco de questões.",
        "O relógio não para. Recupere o tempo perdido com 15 questões agora.",
        "A disciplina bate o talento quando o talento não tem disciplina."
    ]
};

const EXTRA_PHRASES = {
    confianca: [
        "Acertando tudo! Sua mente está em sincronia total com a banca.",
        "Sequência de mestre. O conhecimento está fluindo naturalmente.",
        "Imparável! Essa confiança será sua maior arma no dia da prova.",
        "Mais um acerto para a conta. Você está no controle total.",
        "Domínio absoluto. Continue surfando nessa onda de acertos!"
    ],
    volume_incentive: [
        "Volume insuficiente. Aumente o ritmo para consolidar o conhecimento.",
        "Estudando pouco hoje? A aprovação exige mais suor que isso.",
        "Meta diária não atingida. Vamos bater pelo menos 15 questões?",
        "O Dr. QRub sentiu falta do seu empenho. Volte para a arena."
    ],
    positive_reinforcement: [
        "Volume impressionante hoje! Sua dedicação é fora de série.",
        "Mais de 40 questões! Você está construindo uma muralha de conhecimento.",
        "Maratona de estudos detectada. O sucesso ama a preparação.",
        "Que ritmo! Se mantiver isso, a vaga já é sua."
    ]
};

export function generatePerformanceContent(input: PerformanceInput): PerformanceOutput {
    // 1) Validation & Safe Mode Check
    if (
        input.total_answered === null || input.total_answered === undefined || isNaN(input.total_answered) ||
        input.accuracy_percent === null || input.accuracy_percent === undefined || isNaN(input.accuracy_percent) ||
        input.today_answered === null || input.today_answered === undefined || isNaN(input.today_answered) ||
        input.streak_correct === null || input.streak_correct === undefined || isNaN(input.streak_correct) ||
        input.streak_wrong === null || input.streak_wrong === undefined || isNaN(input.streak_wrong)
    ) {
        return {
            headline: "Seu desempenho está sendo atualizado",
            media: "Carregando métricas...",
            frase: "Continue resolvendo questões. Estamos sincronizando.",
            tone: "safe"
        };
    }

    // 2) Base Fields
    const headline = `${input.total_answered} questões resolvidas`;
    const media = `Média de acertos: ${input.accuracy_percent}%`;

    // 3) Tone & Phrase Logic
    let tone: PerformanceTone = 'medio';
    let phrasePool: string[] = [];

    // Logic Priority:
    // 1. Streak Wrong >= 3 -> suporte
    // 2. Streak Correct >= 4 -> confiança (uses elite tone but specific phrases)
    // 3. Today Answered < 15 -> disciplina (incentive)
    // 4. Today Answered >= 40 -> positive reinforcement
    // 5. Accuracy based tones

    if (input.streak_wrong >= 3) {
        tone = 'suporte';
        phrasePool = PHRASE_BANKS.suporte;
    } else if (input.streak_correct >= 4) {
        tone = 'elite'; // Or should we have a 'confiança' tone mapping? Requirement says elite | medio | provocacao | suporte | disciplina | safe
        // Since 'confiança' isn't a required tone, we map it to 'elite'
        phrasePool = EXTRA_PHRASES.confianca;
    } else if (input.today_answered < 15) {
        tone = 'disciplina';
        phrasePool = [...PHRASE_BANKS.disciplina, ...EXTRA_PHRASES.volume_incentive];
    } else if (input.today_answered >= 40) {
        tone = 'elite';
        phrasePool = [...EXTRA_PHRASES.positive_reinforcement, ...PHRASE_BANKS.elite];
    } else {
        // Basic accuracy logic
        if (input.accuracy_percent >= 80) {
            tone = 'elite';
            phrasePool = PHRASE_BANKS.elite;
        } else if (input.accuracy_percent >= 65) {
            tone = 'medio';
            phrasePool = PHRASE_BANKS.medio;
        } else {
            tone = 'provocacao';
            phrasePool = PHRASE_BANKS.provocacao;
        }
    }

    // 4) Anti-repetition & Final Selection
    const lastMessages = input.last_10_messages || [];
    let frase = selectPhrase(phrasePool, lastMessages);

    // 5) Final Guarantee/Limitation Checks
    const output: PerformanceOutput = {
        headline: headline.substring(0, 40),
        media: media.substring(0, 30),
        frase: frase.substring(0, 90),
        tone: tone
    };

    return output;
}

function selectPhrase(pool: string[], lastMessages: string[]): string {
    const available = pool.filter(p => !lastMessages.includes(p));

    if (available.length > 0) {
        return available[Math.floor(Math.random() * available.length)];
    }

    // Try finding a new phrase from other pools if needed, or fallback
    return FALLBACK_PHRASE;
}
