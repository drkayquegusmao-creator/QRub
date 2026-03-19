const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase credentials not found. Check .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const packageId = 'bd552894-6ce4-45c6-a0f9-3d7337f3ef07';

const questions = [
  {
    "enunciado": "Considerando os poderes administrativos e o regime jurídico dos servidores públicos, julgue o item a seguir.\n\nO poder hierárquico, fundamento do escalonamento de funções no âmbito da administração pública, autoriza a autoridade superior a delegar competências a seus subordinados, bem como a avocar atribuições, sendo a avocação um ato de natureza ordinária que pode ser realizado mesmo sem a existência de motivos relevantes e devidamente justificados.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "A assertiva está incorreta. Embora o poder hierárquico fundamente a delegação e a avocação, a avocação de competência é medida excepcional e temporária, que exige, obrigatoriamente, a demonstração de motivos relevantes e devidamente justificados, conforme dispõe o art. 15 da Lei nº 9.784/1999.",
    "difficulty": "media",
    "tags": ["Direito Administrativo", "Poderes Administrativos", "Avocação"]
  },
  {
    "enunciado": "No que tange aos direitos fundamentais e à organização do Estado prevista na Constituição Federal de 1988, julgue o item.\n\nÉ livre a expressão da atividade intelectual, artística, científica e de comunicação, independentemente de censura ou licença, sendo garantido o direito de resposta, proporcional ao agravo, além da indenização por dano material, moral ou à imagem.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "c",
    "rationale": "A assertiva reproduz a literalidade do art. 5º, incisos IX e V, da Constituição Federal. O Supremo Tribunal Federal consolidou o entendimento de que a proibição de censura prévia é absoluta no regime democrático brasileiro, resguardando-se a responsabilidade a posteriori.",
    "difficulty": "media",
    "tags": ["Direito Constitucional", "Direitos e Garantias Fundamentais", "Liberdade de Expressão"]
  },
  {
    "enunciado": "Quanto à concordância verbal e nominal nas orações de Língua Portuguesa, julgue o item seguinte.\n\nNa frase 'Haviam muitos candidatos interessados nas vagas de analista administrativo', o verbo 'haver' está empregado corretamente no plural, uma vez que concorda com o sujeito composto da oração.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "Incorreto. O verbo 'haver', quando empregado com sentido de 'existir', é impessoal, não possuindo sujeito. Portanto, deve permanecer obrigatoriamente na 3ª pessoa do singular. A forma correta seria: 'Havia muitos candidatos...'.",
    "difficulty": "media",
    "tags": ["Língua Portuguesa", "Sintaxe", "Concordância Verbal"]
  },
  {
    "enunciado": "Julgue o item relativo aos conceitos de segurança da informação e redes de computadores.\n\nO ataque do tipo Phishing caracteriza-se pela tentativa de adquirir dados pessoais, como senhas e números de cartões de crédito, por meio de mensagens que aparentam ser de fontes confiáveis, utilizando técnicas de engenharia social para enganar o usuário.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "c",
    "rationale": "Correto. O Phishing é uma técnica de engenharia social clássica no ambiente digital, funcionando como uma 'pescaria' de dados sensíveis através de iscas (links ou mensagens falsas).",
    "difficulty": "media",
    "tags": ["Informática", "Segurança da Informação", "Phishing"]
  },
  {
    "enunciado": "Acerca do Direito Penal e dos crimes contra a administração pública, julgue o item.\n\nComete o crime de prevaricação o funcionário público que solicita ou recebe, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de assumi-la, mas em razão dela, vantagem indevida.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "Incorreto. A descrição dada refere-se ao crime de Corrupção Passiva (art. 317 do CP). A prevaricação (art. 319 do CP) consiste em retardar ou deixar de praticar, indevidamente, ato de ofício, ou praticá-lo contra disposição expressa de lei, para satisfazer interesse ou sentimento pessoal.",
    "difficulty": "media",
    "tags": ["Direito Penal", "Crimes contra a Administração Pública", "Prevaricação"]
  },
  {
    "enunciado": "No contexto da Ética no Serviço Público, julgue o item a seguir.\n\nA moralidade administrativa não se limita à distinção entre o bem e o mal, devendo ser acrescida da ideia de que o fim é sempre o bem comum, sendo que o equilíbrio entre a legalidade e a finalidade é o que consolida a moralidade do ato administrativo.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "c",
    "rationale": "Correto. De acordo com o Código de Ética Profissional do Servidor Público Civil do Poder Executivo Federal (Decreto nº 1.171/94), a moralidade administrativa exige que o servidor integre a ética em sua conduta cotidiana, visando sempre o interesse público.",
    "difficulty": "media",
    "tags": ["Ética no Serviço Público", "Decreto 1.171/94", "Moralidade"]
  },
  {
    "enunciado": "Com base nos princípios da lógica sentencial, julgue o item.\n\nA negação da proposição 'Todos os auditores são éticos' é expressa corretamente por 'Nenhum auditor é ético'.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "Incorreto. A negação de uma proposição universal afirmativa ('Todo A é B') não é outra universal ('Nenhum A é B'), mas sim uma particular negativa ('Algum A não é B' ou 'Existe pelo menos um A que não é B').",
    "difficulty": "media",
    "tags": ["Raciocínio Lógico", "Lógica de Predicados", "Negação"]
  },
  {
    "enunciado": "A respeito do Inquérito Policial, julgue o item.\n\nO inquérito policial possui natureza administrativa e é indispensável para a propositura da ação penal, sendo necessário que o Ministério Público aguarde o relatório final da autoridade policial para oferecer a denúncia.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "Incorreto. Uma das características fundamentais do Inquérito Policial é a sua dispensabilidade. Se o titular da ação penal (MP) já possuir elementos suficientes (justa causa), poderá oferecer a denúncia independentemente do IP.",
    "difficulty": "media",
    "tags": ["Direito Processual Penal", "Inquérito Policial", "Dispensabilidade"]
  },
  {
    "enunciado": "Julgue o item sobre o uso da crase na Língua Portuguesa.\n\nNo trecho 'O servidor deve submeter os relatórios à coordenação do departamento', o emprego do acento grave justificasse pela regência do verbo 'submeter', que exige preposição 'a', e pela presença do artigo definido feminino que acompanha o substantivo 'coordenação'.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "c",
    "rationale": "Correto. Ocorre a fusão da preposição 'a' (exigida por submeter algo **a** alguém) com o artigo 'a' de 'coordenação'.",
    "difficulty": "media",
    "tags": ["Língua Portuguesa", "Gramática", "Crase"]
  },
  {
    "enunciado": "Quanto ao controle de constitucionalidade exercido pelo Poder Judiciário, julgue o item.\n\nQualquer magistrado ou tribunal, no exercício da jurisdição, pode declarar a inconstitucionalidade de lei ou ato normativo no caso concreto, o que caracteriza o chamado controle difuso ou aberto de constitucionalidade.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "c",
    "rationale": "Correto. O controle difuso (ou incidental) permite que qualquer juiz ou tribunal afaste a aplicação de uma lei inconstitucional em um caso específico submetido a seu julgamento.",
    "difficulty": "media",
    "tags": ["Direito Constitucional", "Controle de Constitucionalidade", "Controle Difuso"]
  }
];

async function publish() {
  console.log(`Publishing ${questions.length} questions to package ${packageId}...`);
  
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const { error } = await supabase
      .from('concurso_package_questions')
      .insert({
        package_id: packageId,
        question_json: q,
        status: 'draft',
        order_index: i + 1
      });
    
    if (error) {
      console.error(`Error inserting question ${i + 1}:`, error.message);
    } else {
      console.log(`Inserted question ${i + 1}`);
    }
  }

  const { error: updateErr } = await supabase
    .from('concurso_question_packages')
    .update({ status: 'reviewing' })
    .eq('id', packageId);

  if (updateErr) {
    console.error('Error updating package status:', updateErr.message);
  } else {
    console.log('Package status updated to reviewing!');
  }
}

publish();
