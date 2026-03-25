const fs = require('fs');

const data = [
  {
    "enunciado": "A despeito da regra insculpida sobre a presunção de inocência no ordenamento constitucional, o Supremo Tribunal Federal consolidou em deliberação plenária que a execução antecipada de pena privativa de liberdade decorrente de condenação criminal amparada sob a égide do Tribunal do Júri ofende irremediavelmente o princípio garantidor elencado, não sendo autorizada a execução imediata mesmo frente ao postulado da soberania dos veredictos, devendo-se aguardar sempre e impreterivelmente o trânsito em julgado corriqueiro da ação penal.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "A assertiva está errada em face do paradigmático entendimento proferido pelo STF. No recente e paradigmático Tema 1.068 de Repercussão Geral, o Supremo Tribunal Federal asseverou que 'A soberania dos veredictos do Tribunal do Júri autoriza a imediata execução de condenação imposta pelo corpo de jurados, independentemente do total da pena aplicada'. Assim, a presunção de inocência, nesse caso particular lastreado pelo poder direto da deliberação popular oriunda da Constituição, cede espaço, autorizando a execução incipiente da pena e refutando categoricamente o condicionamento único e imutável ao trânsito em julgado.",
    "difficulty": "dificil",
    "tags": ["Presunção de Inocência", "Tribunal do Júri", "Execução Provisória da Pena", "STF"]
  },
  {
    "enunciado": "Ação de índole constitucional de rito sumaríssimo delineada precípuamente para resguardar a intimidade do cidadão, o Habeas Data afigura-se como instrumento formal imprescindível não apenas para que o próprio indivíduo assegure o direito à obtenção e eventual retificação de dados pertinentes à sua própria pessoa arquivados em entidades de caráter público, estendendo-se por construção doutrinária também a autorizar inescusável colheita investigativa perante dados reputados intrinsecamente pertencentes a terceiros desconhecidos quando isso demonstrar insuperável utilidade probatória.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "A assertiva encontra-se frontalmente errada e conflita incisivamente com o núcleo inarredável da garantia. O mandamento alocado no artigo 5º, inciso LXXII sublinha inexoravelmente que a tutela jurídica efetivada via Habeas Data é puramente existencial, personalíssima e de via direta, restrita sem elisão ao conhecimento ou alteração de dados 'relativos à PESSOA DO IMPETRANTE'. Desautoriza-se, assim, mediante iterativa jurisprudência sumulada do Superior Tribunal de Justiça, sua veiculação para requisição investigativa ou extração oblíqua de dados vinculados a terceiros, sejam conhecidos ou não.",
    "difficulty": "dificil",
    "tags": ["Habeas Data", "Direitos de Terceiros", "Informações Pessoais"]
  },
  {
    "enunciado": "A consagração do baluarte correspondente à ampla consagração do instituto basilar da liberdade de manifestação do pensamento é acompanhada originariamente da peremptória vedação ao apelo ao generalizado anonimato. Dessa forma, nos casos decorrentes de afrontas ilícitas à honra atreladas a agressões em plataformas interativas na rede mundial de computadores, assegura-se expressamente o direito basilar ao indivíduo preterido de pugnar judicialmente pela correspondente obtenção da quebra judicial atinente aos dados cadastrais em provedoros cibernéticos objetivando identificar indubitavelmente o ofensor difamador.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "c",
    "rationale": "A assertiva encontra seu fiel acerto técnico. O art. 5º, IV, da CF cristaliza que 'é livre a manifestação do pensamento, sendo vedado o anonimato'. Desse postulado inafastável, o arcabouço jurisdicional sedimentou a plena validade e regularidade garantindo que qualquer ofendido instale contencioso exigindo, face aos provedores atuantes nas redes de conexão à internet, o inquestionável lastro fornecendo a quebra protetiva concernente aos dados de provedor e perfis falsos propiciando identificar formalmente os autores materiais ocultos difamadores, salvaguardando assim eventual posterior imputação por responsabilidade cível ou ilícito punível atrelados.",
    "difficulty": "dificil",
    "tags": ["Liberdade de Expressão", "Vedação ao Anonimato", "Responsabilidade Civil", "Internet"]
  },
  {
    "enunciado": "No espectro da proteção abrangente concebida sob o prisma atinente ao inviolável direito ao preceito libertário de toda expressão afeta a crença religiosa estipulada expressamente como dogma aos direitos de primaz grandeza, o Supremo Tribunal Federal debruçou-se sobre os limites de referida tolerância, firmando preceito vinculante proibindo incondicional e irrestritamente o correspondente abate litúrgico-sacrificial de determinadas classes de animais efetuado nos estritos ambientes restritos a cultos com raízes arraigadas primordialmente em tradições de matiz puramente afro-brasileira.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "A assertiva configura grave deturpação afeta a temática julgada à luz pelo STF. Exatamente na moldura decorrente de debate concernente ao RE 494.601 (Tema 933), a mais Suprema Corte sedimentou baliza reconhecendo que: 'É plenamente CONSTITUCIONAL efetuar o abate sistemático atinente a animais pautado como um contorno de ordem litúrgica efetuado dentro nos estritos dogmas e domínios afetos substancialmente a religiões provenientes precipuamente de origens em bases teológicas ligadas de raiz eminentemente afro-brasileira.' É admitido integralmente caso exercido sem excessos supérfluos, configurando efetivo imperativo correlacionado à garantia explícita perante o livre gozo ao culto e ampla liberdade.",
    "difficulty": "dificil",
    "tags": ["Liberdade de Culto", "Abate Religioso", "Tolerância Religiosa", "STF"]
  },
  {
    "enunciado": "As condicionantes ao instituto delineado englobando o sagrado direito de reunião pacífica dispostas a todo agrupamento social sem portabilidade bélica impõem taxativamente a obrigatoriedade da ocorrência de um mero 'aviso prévio formal' emitido obrigatoriamente perante as correspondentes forças e autoridades rependentes em nível policial ou governamental. Contudo, em flexibilização fixada nas recentes decisões atreladas pela jurisprudência balizada proferida emanada do STF, a simples ausência efetuada formal atinente a esse expresso aviso protocolar descaracterizará em absolutismo o direito aglutinador ensejando pronta dissolução legítima por aparato do Estado.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "A assertiva apresenta distorção do entendimento recente. No julgamento do RE 806.339/SE (Tema 855), resguardando o art. 5º, XVI da regra Magna, o Supremo Tribunal Federal impôs um viés material flexível firmando que 'a mera exigência legal atinente sob viés formal procedimental frente ao dever basilar efetuado por prévio aviso à autoridade pode ser tranquilamente suprida substancialmente caso atrelados existam incontáveis elementos idôneos amplamente difundidos em noticiários que propiciem que o governo ou o poder policial tomem plena ciência efetiva no intuito preeminente propiciando a devida e imperativa segurança inerente à mobilização', refutando dissolver ou reprimir unicamente com arrimo amparada pela mera e solitária ausência documental protocolizada do dito aviso.",
    "difficulty": "dificil",
    "tags": ["Direito de Reunião", "Aviso Prévio", "Liberdades Públicas"]
  },
  {
    "enunciado": "A consagração perene da inviolabilidade do amplo manto atinente à integral propriedade privada transpassa garantindo primazia. Todavia, como impostergável penalidade correlata atinente ao flagrante desvio inaceitável balizando o caráter do descumprimento social, o estatuto constitucional delineia de forma impositiva hipóteses expropriatórias agudas onde eventual enredamento constatando irrefutável alocação ou uso das vastas glebas rurais promovendo corriqueiramente a lamentável exploração ilícita atrelada ao deplorável cultivo inerente voltado perante plantas categorizadas no quadro de compostos estritamente psicotrópicos desencadeará inescapavelmente expressa desapropriação punitiva confiscando o bem por integral, abolindo por completo toda ou e qualquer perspectiva e viabilidade em nível indenizatório afeto oriundo do tesouro do proprietário perpetrador.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "c",
    "rationale": "A assertiva consagra irretocável arrimo atinente à moldura do art. 243 da Constituição Federal. Trata-se faticamente de desapropriação cunhada em viés marcadamente sancionatório confiscatório onde preceito textualmente apregoa premissa estipulando expressamente: as propriedades estipuladas tanto de escopos rurais quanto daquelas localizadas urbanamente interligadas e encontrando-se irremediavelmente deturpadas perpetrando cultivo estritamente ilegal frente as plantas psicotrópicas inabituais ou daquelas maculadas operando a infame exploração atinente ao repudiado trabalho considerado material em molde caracterizado como subumano qualificado de 'escravo' serão inexoravelmente engolfadas sendo expropriadas rigorosamente sem qualquer pátio para o pagamento de indenização restritiva ou ressarcimento econômico decorrente face o dono causador.",
    "difficulty": "dificil",
    "tags": ["Direito de Propriedade", "Desapropriação Confiscatória", "Trabalho Escravo", "Cultivo Ilícito"]
  },
  {
    "enunciado": "A amplitude deferida ao exercício balizando o imperativo pertinente ao complexo direito atinente e direcionado em arrimo referenciando prementemente o habeas data admite a impetração excepcional com caráter resolutivo em relação ao seu deferimento como providência assecuratória visando impor incontestável exigência imperando à pronta devida e regular formalização preeminente perante a requerimentos de emissões e consequentes expedições exigidas buscando compelir a viabilização obrigando que os respectivos entes burocráticos confeccionem e forneçam devidas complexas certidões documentais probantes pleiteadas perante resguardar defesas almejando elucidar as variadas contendas a pretexto administrativo.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "A manifestação aduz gravoso equívoco atinente à restritiva estipulação formal acerca da utilidade premente à via adequada. O mandamento inserto a respeito do sagrado remédio habeas data não serve invariavelmente sequer encontra substrato e correspondência atinente servindo a exigório impelindo a fornecimentos elaborados consubstanciados à formalização forçosa de expedições de requeridas 'certidões'. Premente é alocado afeto a garantia inserida pelo inciso XXXIV da Carta Magna asseverando contundente e distintamente que o cabimento do inafastável direito correlativo perante emissões documentais de 'certidões' resolve-se pela estrita órbita decorrente unicamente através das estreitas balizas oriundas por impetração afetadas pelo esquadro em mandado de segurança na recusa de expedir.",
    "difficulty": "dificil",
    "tags": ["Habeas Data", "Direito de Certidão", "Mandado de Segurança", "Garantias Constitucionais"]
  },
  {
    "enunciado": "O princípio garantidor atinente da impostergável intangibilidade afeto fundamentalmente às características inibidoras proibitivas vedando por inteiro as referidas punições rigorísticas na modalidade inafastável das execuções qualificadas sob o balizamento mortífero abarca e perpassa todo o espectro do universo inserido ao ordenamento repressor civil-brasileiro. Distanciando-se do viés absolutista, ressalva delineante abrigada explícita e textualmente pelo diploma matriz admite validamente que pena categorizada afeto consubstanciada de morte subsistirá isoladamente caso sobrevenha e ocorra flagrantemente e unicamente perpetração de inqualificáveis crimes formalmente consumados diante de período decretado instaurando premissa estrita em situação declaratória imposta e proclamada defrontando eventual formal deflagrada irrupção no que se repute e afirme um respectivo caso atinente a formal 'guerra declarada'.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "c",
    "rationale": "A assertiva acentua e reverbera com formidável lastro a norma preeminente. No cerne afeto ao artigo 5º, ex vi inciso XLVII, na correspondente alínea nominativa abrigada sob a rubrica em 'a', a regra Magna cristaliza de forma direta: 'não haverá penas enquadradas restritivamente caracterizadas de caráter imposto a mote material de referida dita imposição mortífera', logo efetuando a exclusão primordial. Ato contínuo preceitua em continuação imediata abrindo fresta textualmente alocando: 'salvo forçoso e unicamente nas correspondentes inarredáveis casuísticas tipificadas nos contornos preementemente caracterizadas no inciso decantado e afetado decorrente diante perante irrefutável conjuntura alusiva de guerra declaratória formal'.",
    "difficulty": "dificil",
    "tags": ["Pena de Morte", "Direito à Vida", "Guerra Declarada", "Direitos Fundamentais"]
  },
  {
    "enunciado": "A salvaguarda imperativa ao devido processo legal assegurada extensamente a toda órbita litigiosa assegura forçosamente e peremptoriamente que tanto os incontestáveis julgamentos efetuados nas esferas em patamar administrativo ou até mesmo diante a complexos percalços de crivo disciplinar oriundos ou vinculativos de cunho público e estritamente no meio perante a servidores se materializam apenas validamente quando permeados e cercados amplamente contidos à moldura premissa ofertando impreterivelmente sempre uma inconteste impostergável obrigatória representação premente alicerçada a advogados ou prepostos defensivos sob a pena iminente ensejando insuperável e imediata decretação contendo imperiosa nulidade anulatória irrefreável processual material do decurso de tais sanções punitivas.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "A assertiva demonstra gravoso contraponto conflitante exaustivamente balizado na respectiva Súmula Vinculante 5 sedimentada sob o bastião do colendo STF. Com o advento firmado, consolidou-se unissonamente em imperativo estipulando que: 'a premissa isolada advinda evidenciando a patente peculiar falta referenciando eventual carestia da expressa estipulada constituição de defesa estritamente de viés efetuada perante a um técnico dotado de postulação na órbita de prerrogativa qualificada advocatícia no curso subjacente inserido ao regular processamento em órbita do inquérito atinente a procedimento ou respectivo crivo meramente em patamar administrativo em caráter contencioso de vertentes sancionatórias disciplinares não ofende preceito ensejador de postulado balístico sob a dita e garantidora rubrica ampla constitucional de salvaguardas de direito preeminente e inarredável contenciosa do referido magno arcabouço garantista'.",
    "difficulty": "dificil",
    "tags": ["Devido Processo Legal", "Processo Administrativo Disciplinar", "Defesa Técnica", "Súmula Vinculante 5"]
  },
  {
    "enunciado": "O sigilo e incomunicabilidade das missivas, inserido nos bens mais íntimos da personalidade enraizada na privacidade, proíbem incondicionalmente a interceptação material ou o rompimento forçado da estrita correspondência mantida pelos detentos alocados no interior do sistema penitenciário de matiz carcerária pátria, impondo que sequer a administração disciplinar possa violar a integridade dessas peças visando averiguar planejamentos criminosos ou garantir a segurança pública do recinto sem ordem prévia e estrita oriunda de acautelatório decreto jurisdicional.",
    "options": {
      "c": "Certo",
      "e": "Errado"
    },
    "answer": "e",
    "rationale": "A assertiva erra e incide em flagrante descompasso com os limites práticos estendidos nos preceitos delimitados na jurisdição pátria sobre as excepcionalidades limitadoras no gozo à fundamental privacidade em casos extremos punitivos. A Suprema Corte brasileira, de fato, pacificou a diretriz em que a referendada administração alocada em presídios detém margem protetiva preeminente fundamentada legalmente em substratos de preservação institucional ensejando licitude caso verifiquem fundados suspeitamentos concretos permitindo expressamente o referido e imperativo acesso e rompimento sigiloso afeto unicamente às matérias referentes ao correspondente teor em formato epistolar que rege ou se dirige de trânsito em face de recolhido que se enquadra atrelado à reprimenda inserido no aprisionamento penal carcerário, em tutela afeta não precisando da deflagração prévia atinente da respectiva emissão alicerçada no referendado ato decretório imperativo jurisdicional.",
    "difficulty": "dificil",
    "tags": ["Sigilo das Correspondências", "Sistema Penitenciário", "Direitos de Presos", "Limitação de Direitos Intangíveis"]
  }
];

function computeHash(text) {
    const normalized = text.toLowerCase().replace(/\\s+/g, ' ').trim()
    let hash = 0
    for (let i = 0; i < normalized.length; i++) {
        hash = ((hash << 5) - hash) + normalized.charCodeAt(i)
        hash = hash & hash
    }
    return Math.abs(hash).toString(36)
}

let sql = 'INSERT INTO concurso_package_questions (package_id, question_json, status, hash_logico, order_index) VALUES\\n';
const packageId = '61F5C5CD-4591-4E9C-805D-097C4D36B810'.toLowerCase();

// This is the second batch, so we start order_index from 10.
const values = data.map((q, idx) => {
    const hash = computeHash(q.enunciado) + '_' + (idx+10); 
    const jsonStr = JSON.stringify(q).replace(/'/g, "''");
    return `('${packageId}', '${jsonStr}'::jsonb, 'draft', '${hash}', ${idx + 10})`;
});

sql += values.join(',\\n') + ';';

fs.writeFileSync('insert_direitos2.sql', sql);
console.log('SQL file created: insert_direitos2.sql. Generated ' + data.length + ' questions.');
