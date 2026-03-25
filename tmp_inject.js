
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jtkyonfytxunebvyszhp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'; // Placeholder, I'll need to use actual key if I want it to work

const supabase = createClient(supabaseUrl, supabaseKey);

const packageId = '65C77D6C-2350-4282-9636-7689D6CF03E3';

const questions = [
  {
    enunciado: "No que tange aos princípios fundamentais que regem as relações internacionais da República Federativa do Brasil, a cooperação entre os povos para o progresso da humanidade é diretriz constitucional que veda a adoção de posturas isolacionistas em temas de direitos humanos globais.",
    options: { c: "Certo", e: "Errado" },
    answer: "c",
    rationale: "O Art. 4º, IX, da CF/88 estabelece a cooperação entre os povos para o progresso da humanidade como princípio das relações internacionais.",
    difficulty: "dificil",
    tags: ["Direito Constitucional", "Relacoes Internacionais"]
  },
  {
    enunciado: "A República Federativa do Brasil rege-se nas suas relações internacionais pelo princípio da não intervenção, o qual deve ser interpretado de forma mitigada quando houver risco iminente de graves violações a direitos humanos.",
    options: { c: "Certo", e: "Errado" },
    answer: "e",
    rationale: "O princípio da não intervenção (Art. 4º, IV) é absoluto no texto constitucional brasileiro.",
    difficulty: "dificil",
    tags: ["Constitucional", "Relacoes Internacionais"]
  },
  {
    enunciado: "O princípio constitucional da solução pacífica dos conflitos impede que o Brasil participe de operações de paz da ONU que envolvam o uso da força.",
    options: { c: "Certo", e: "Errado" },
    answer: "e",
    rationale: "A solução pacífica é um norte, mas não veda a participação em missões de paz autorizadas pelo Conselho de Segurança da ONU.",
    difficulty: "dificil",
    tags: ["Constitucional", "Relacoes Internacionais"]
  },
  {
    enunciado: "A defesa da paz e o repúdio ao terrorismo e ao racismo são princípios que vinculam a atuação internacional do Estado brasileiro.",
    options: { c: "Certo", e: "Errado" },
    answer: "c",
    rationale: "Art. 4º, VI e VIII da CF/88.",
    difficulty: "media",
    tags: ["Constitucional", "Relacoes Internacionais"]
  },
  {
    enunciado: "No âmbito das relações internacionais, a concessão de asilo político constitui ato discricionário do Presidente da República.",
    options: { c: "Certo", e: "Errado" },
    answer: "c",
    rationale: "O asilo político é ato de soberania e discricionariedade do Executivo.",
    difficulty: "dificil",
    tags: ["Constitucional", "Asilo"]
  },
  {
    enunciado: "O princípio da cooperação entre os povos para o progresso da humanidade autoriza o Brasil a extraditar brasileiro nato.",
    options: { c: "Certo", e: "Errado" },
    answer: "e",
    rationale: "Brasileiro nato nunca é extraditado (Art. 5º, LI).",
    difficulty: "dificil",
    tags: ["Constitucional", "Extradicao"]
  },
  {
    enunciado: "A integração econômica, política, social e cultural dos povos da América Latina visa à formação de uma comunidade latino-americana de nações.",
    options: { c: "Certo", e: "Errado" },
    answer: "c",
    rationale: "Parágrafo Único do Art. 4º da CF/88.",
    difficulty: "facil",
    tags: ["Constitucional", "America Latina"]
  },
  {
    enunciado: "O princípio da igualdade entre os Estados garante que o Brasil possua o mesmo peso decisório que as grandes potências em fóruns internacionais.",
    options: { c: "Certo", e: "Errado" },
    answer: "c",
    rationale: "Igualdade soberana (Art. 4º, V).",
    difficulty: "media",
    tags: ["Direito Internacional"]
  },
  {
    enunciado: "O Brasil adota o princípio da autodeterminação dos povos, o que implica o reconhecimento automático de qualquer grupo independente.",
    options: { c: "Certo", e: "Errado" },
    answer: "e",
    rationale: "A autodeterminação orienta o respeito, mas não obriga reconhecimento automático sem critérios internacionais.",
    difficulty: "dificil",
    tags: ["Constitucional"]
  },
  {
    enunciado: "A prevalência dos direitos humanos inviabiliza que o Brasil mantenha relações com Estados acusados de genocídio.",
    options: { c: "Certo", e: "Errado" },
    answer: "e",
    rationale: "Informar a postura, mas não dita proibições absolutas de diálogo soberano.",
    difficulty: "media",
    tags: ["Humanos"]
  }
];

async function inject() {
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const { data, error } = await supabase
      .from('concurso_package_questions')
      .insert({
        package_id: packageId,
        question_json: q,
        status: 'draft',
        hash_logico: 'batch1_' + i
      });
    
    if (error) {
      console.error('Error inserting question ' + i + ':', error);
    } else {
      console.log('Inserted question ' + i);
    }
  }
}

inject();
