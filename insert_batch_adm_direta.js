const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const packageId = '14AB8F85-8B67-4BE4-8507-BF5D88B48062';

const questions = [
  {
    "enunciado": "De acordo com o entendimento do Supremo Tribunal Federal, os órgãos públicos, por serem meros centros de competência despersonalizados da Administração Direta, não detêm capacidade processual para a defesa judicial de suas prerrogativas institucionais, devendo a representação em juízo ocorrer invariavelmente por meio do ente político ao qual estão subordinados.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "e",
    "rationale": "A assertiva está errada, pois o STF possui o entendimento pacificado, consubstanciado na Súmula 525 do STJ e em precedentes da Suprema Corte, de que órgãos públicos independentes e autônomos (como a Câmara Municipal, a Assembleia Legislativa ou o Ministério Público) possuem capacidade processual (personalidade judiciária) para atuar em juízo exclusivamente na defesa de suas prerrogativas institucionais, configurando uma exceção à regra geral da falta de capacidade processual dos órgãos da Administração Direta.",
    "difficulty": "dificil",
    "tags": ["Administração Direta", "Órgãos Públicos", "Capacidade Processual"]
  },
  {
    "enunciado": "Considerando as características da Administração Pública Direta e as teorias que explicam a imputação da atuação estatal, a teoria do órgão, adotada expressamente pelo direito brasileiro, pressupõe a existência de um vínculo de representação e de mandato entre o agente público e o Estado, razão pela qual o ato praticado forçosamente se imputa à pessoa jurídica de direito público a que ele integra.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "e",
    "rationale": "A assertiva está errada. A Teoria do Órgão (ou da Imputação Volitiva), adotada no ordenamento pátrio, rechaça as teorias do mandato e da representação (em que haveria a transferência de poderes de sujeitos distintos). Na teoria do órgão, o Estado não é representado judicialmente pelo agente, mas sim 'apresenta-se' através dele, de forma que o agente público é parte integrante da vontade do próprio Estado, havendo a imputação direta da conduta à pessoa jurídica, sem a necessidade de vínculos representativos clássicos do direito civil.",
    "difficulty": "dificil",
    "tags": ["Administração Direta", "Teoria do Órgão", "Agentes Públicos"]
  },
  {
    "enunciado": "No âmbito das estruturas da Administração Pública, o exercício da desconcentração pressupõe, obrigatoriamente, a existência do vínculo de subordinação hierárquica e traduz-se na distribuição interna de competências no seio de uma mesma pessoa jurídica, circunstância que impede, sob a luz dos entendimentos doutrinários predominantes, que uma autarquia federal promova a desconcentração dos seus próprios serviços.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "e",
    "rationale": "A afirmação está incorreta. A desconcentração é de fato uma técnica administrativa de distribuição interna de competências baseada em hierarquia, realizada dentro da estrutura de uma mesma pessoa jurídica. Contudo, apesar de ser mais estudada nos entes federativos da Administração Direta, qualquer pessoa jurídica da Administração Indireta (como autarquias, fundações ou empresas públicas) pode estruturar órgãos internos (diretorias, gerências), realizando legitimamente a desconcentração em sua própria estrutura administrativa.",
    "difficulty": "dificil",
    "tags": ["Administração Direta e Indireta", "Desconcentração", "Direito Administrativo"]
  },
  {
    "enunciado": "A Administração Pública Direta dos Estados-membros sujeita-se às diretrizes constitucionais federais. Dessa forma, configura-se violação ao princípio da simetria a criação, por meio de lei estadual de iniciativa parlamentar, de órgãos na estrutura administrativa direta do Poder Executivo daquela unidade federativa, mesmo que o diploma legal tenha como objetivo precípuo a ampliação do controle e da transparência gerencial do Estado.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "c",
    "rationale": "A assertiva está correta. É de iniciativa privativa do Chefe do Poder Executivo (art. 61, §1º, II, 'e', da Constituição Federal) as leis que disponham sobre a criação, estruturação e atribuições dos Ministérios e órgãos da Administração Pública. Pelo princípio da simetria, esse preceito é de observância obrigatória por Estados e Municípios. Assim, padroniza-se inconstitucional, por vício formal de iniciativa, a legislação de origem parlamentar com esse objeto, independentemente do mérito da matéria ou de sua função moralizadora.",
    "difficulty": "dificil",
    "tags": ["Administração Pública Direta", "Processo Legislativo", "Princípio da Simetria"]
  },
  {
    "enunciado": "A Presidência da República, os Ministérios e as Polícias Civis são exemplos basilares de órgãos da Administração Direta. Sob o prisma normativo, um dos aspectos que distingue tais entidades daquelas integrantes da administração indireta é a ausência absoluta de patrimônio e de receitas próprias em seu favor, uma vez que o custeio financeiro dos órgãos depende invariavelmente dos recursos limitados à pessoa jurídica que os integram de forma descentralizada.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "e",
    "rationale": "A assertiva traz uma inversão conceitual sútil que a torna incorreta. Ao tratar a Presidência, ministérios e polícias civis como 'órgãos', a alternativa erra tecnicamente ao denominá-los como 'tais entidades' logo na sequência (entidades possuem personalidade jurídica; órgãos, não). Além disso, a lei admite, como exceção, que órgãos da administração direta possam auferir receitas próprias com autonomia financeira e contábil, frequentemente via 'fundos especiais', tornando inadequada a generalização de que são absolutamente desprovidas de receitas próprias.",
    "difficulty": "dificil",
    "tags": ["Administração Direta", "Órgãos vs Entidades", "Patrimônio e Receita"]
  },
  {
    "enunciado": "Tendo em vista o regime jurídico-administrativo dispensado às relações patrimoniais do Estado, caso determinado ente da Administração Direta federal não efetue o pagamento de obras pactuadas mediante contrato regular de empreitada, é juridicamente viável a imposição judicial da penhora compulsória sobre as parcelas de arrecadação de tributos federais vinculados ao ente inadimplente, como forma de tutelar a segurança jurídica do contrato.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "e",
    "rationale": "Errado. Entes da Administração Direta se obrigam sob regime de direito público, que possui a prerrogativa da impenhorabilidade de seus bens e receitas. A quitação de débitos devidos pela Fazenda Pública oriundos de sentenças judiciárias segue o regime obrigatório de Precatórios (art. 100, CF). Ademais, a retenção ou penhora de receita de impostos afrontaria diretamente o princípio da não afetação das receitas de impostos (art. 167, IV, CF).",
    "difficulty": "dificil",
    "tags": ["Administração Direta", "Bens Públicos", "Regime de Precatórios", "Impenhorabilidade"]
  },
  {
    "enunciado": "No contexto da organização hierárquica típica da Administração Direta, é firme a compreensão de que os órgãos diretivos superiores gozam do poder de avocação sobre as instâncias executoras. Nesse cenário, embora deva configurar medida excepcional acompanhada da justificativa adequada, a avocação pode abranger qualquer matéria no âmbito da discricionariedade administrativa, não encontrando vedações materiais expressas em virtude do poder hierárquico geral absoluto.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "e",
    "rationale": "A assertiva está errada quanto à universalidade da avocação. Apesar do superior hierárquico deter o poder de avocar a tomada de decisões em caráter excepcional e motivado, a Lei de Processo Administrativo em âmbito federal (Lei nº 9.784/1999) determina que competências atribuídas legalmente com caráter de exclusividade a um determinado órgão inferior não podem ser objeto de avocação. Logo, não há 'poder hierárquico geral absoluto' que se sobreponha a limitações expressas de competência exclusiva estabelecida em lei.",
    "difficulty": "dificil",
    "tags": ["Poder Hierárquico", "Avocação", "Administração Direta", "Lei 9784/99"]
  },
  {
    "enunciado": "A descentralização técnica difere da descentralização política por não criar novos entes federativos, mas sim entidades dotadas de personalidade jurídica própria; por sua vez, na outorga – comumente utilizada para constituição da Administração Indireta –, transfere-se não apenas a execução do serviço, mas também a sua titularidade, exigindo-se sempre de instrumento legal por tempo vitalício.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "e",
    "rationale": "A primeira parte da assertiva está coerente, porém o erro está focado nos requisitos e efeitos da outorga técnica e seus tempos atrelados. Embora a outorga legal de fato transfira a titularidade e a execução do serviço, a afirmação 'exigindo-se sempre tempo vitalício' extrapola o preceito. A outorga é criada e transferida por lei por prazo indeterminado, de modo perpétuo perante a própria pessoa estatal, e não por tempo vitalício, sendo plenamente possível o encerramento superveniente de suas atividades através de um processo paralelo de 're-centralização' formalizado em nova legislação que a desfaça.",
    "difficulty": "dificil",
    "tags": ["Administração Direta e Indireta", "Descentralização Técnica", "Outorga Administrativa"]
  },
  {
    "enunciado": "A intervenção federal nas competências e na estrutura dos Estados-membros afasta excepcionalmente a autonomia do ente componente da Administração Direta Estadual em favor da preservação do Pacto Federativo. Para a concretização válida da intervenção pautada em perturbação da ordem pública, o texto constitucional impõe como requisito vinculante a requisição prévia e a aprovação unânime e compulsória por parte do Conselho da República e do Conselho de Defesa Nacional.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "e",
    "rationale": "A assertiva é incorreta. A competência para decretar e executar a Intervenção Federal repousa no Presidente da República. Muito embora os Conselhos da República e de Defesa Nacional atuem obrigatoriamente sendo instados a se pronunciar sobre a matéria (art. 89, I e art. 91, § 1º, II, CF), referidas consultas processuais possuem natureza essencialmente consultiva e de assessoramento (opinativas), não impondo caráter vinculante tampouco requisito de 'aprovação unânime e compulsória' para a expedição do decreto interventivo pelo Chefe do Executivo.",
    "difficulty": "dificil",
    "tags": ["União Federativa", "Administração Direta", "Intervenção Federal", "Conselho da República"]
  },
  {
    "enunciado": "Considera-se intrínseca ao conceito restrito de Administração Direta a centralização das funções estatais e prestacionais elementares. No entanto, consagra-se na jurisprudência pátria a licitude de o Chefe do Poder Executivo, frente a eventual situação emergencial decorrente de greve de servidores estatutários ocupantes de cargos efetivos em áreas essenciais, manejar o instituto da contratação por tempo determinado para repor inadiável necessidade, escorado na proteção da continuidade do serviço público.",
    "options": { "c": "Certo", "e": "Errado" },
    "answer": "c",
    "rationale": "Item correto. O Supremo Tribunal Federal (RE 658026 e jurisprudências coligatas) vem pacificando que, diante da ameaça ao princípio da continuidade da prestação inadiável de serviços públicos essenciais afetos à Administração Direta (ex. segurança pública, hospitais, educação), decorrente do exercício de greve pelos servidores efetivos lotados nelas, a contratação temporária por excepcional interesse público promovida (Art. 37, IX, da CF/88) pelo Estado revela-se um instrumento constitucionalmente amparado e indispensável não para fragilizar a greve, mas sim para proteger as necessidades elementares da coletividade em risco.",
    "difficulty": "dificil",
    "tags": ["Servidores Públicos", "Contratação Temporária", "Administração Direta", "Princípio da Continuidade"]
  }
];

async function insertBatch() {
  console.log(`Inserting ${questions.length} questions to package: ${packageId}`);
  
  const preparedData = questions.map((q, i) => {
    const jsonStr = JSON.stringify(q);
    const hash = crypto.createHash('md5').update(jsonStr).digest('hex');
    return {
      package_id: packageId,
      question_json: q,
      hash_logico: hash,
      order_index: i,
      status: 'draft'
    };
  });

  const { data, error } = await supabase
    .from('package_questions')
    .insert(preparedData);
    
  if (error) {
    console.error('Error inserting into package_questions', error);
  } else {
    console.log('Successfully inserted into package_questions:', preparedData.length);
  }
}

insertBatch();
