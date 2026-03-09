
const crypto = require('crypto');
const fs = require('fs');

const questions = [
    {
        'enunciado': 'Um homem de 45 anos, motorista de carga pesada, apresenta-se ao ambulatório com queixa de dor lombar intensa que se irradia para a face lateral da perna esquerda e dorso do pé. Durante o exame físico, observa-se diminuição da força na dorsiflexão do hálux e sensibilidade alterada no primeiro espaço interdigital. Ao revisar a anatomia da coluna vertebral, o médico identifica que a hérnia de disco provável está comprimindo uma raiz nervosa que emerge abaixo da vértebra correspondente. Considerando as características anatômicas das vértebras lombares e a emergência das raízes nervosas, assinale a alternativa que descreve corretamente a relação anatômica envolvida.',
        'options': {
            'a': 'A raiz de L5 emerge pelo forame intervertebral entre L5 e S1, sendo tipicamente comprimida por uma hérnia discal nesse nível.',
            'b': 'As vértebras lombares possuem forames transversários que protegem a passagem das raízes nervosas antes de sua saída pelo forame intervertebral.',
            'c': 'O processo espinhoso das vértebras lombares é delgado e inclinado inferiormente, dificultando o acesso cirúrgico posterior ao canal vertebral.',
            'd': 'O ligamento amarelo conecta os processos transversos de vértebras adjacentes, servindo como limite anterior do forame intervertebral.',
            'e': 'O canal vertebral no nível lombar é circular e estreito, o que predispõe à síndrome da cauda equina em casos de protusões centrais mínimas.'
        },
        'answer': 'a',
        'rationale': 'A questão aborda a anatomia aplicada da coluna lombar. No nível lombar, as raízes nervosas emergem abaixo da vértebra de mesma numeração. A sintomatologia descrita (fraqueza na dorsiflexão do hálux e parestesia no dorso do pé) é clássica de compressão da raiz de L5. A raiz de L5 sai pelo forame entre L5 e S1. Portanto, a alternativa A reflete corretamente a anatomia de emergência nervosa e a correlação clínica habitual das hérnias discais posterolaterais.',
        'option_rationales': {
            'a': 'Correta. A emergência das raízes lombares ocorre logo abaixo do pedículo da vértebra correspondente.',
            'b': 'Errada. Forames transversários são características exclusivas das vértebras cervicais (passagem da artéria vertebral).',
            'c': 'Errada. O processo espinhoso lombar é quadrilátero, robusto e horizontalizado.',
            'd': 'Errada. O ligamento amarelo conecta as lâminas das vértebras, não os processos transversos; o limite anterior do forame é o disco e o corpo vertebral.',
            'e': 'Errada. O canal vertebral lombar tende a ser triangular; protusões \"mínimas\" raramente causam síndrome da cauda equina, que exige compressão volumosa.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Coluna Vertebral', 'Neuroanatomia Aplicada']
    },
    {
        'enunciado': 'Durante uma cirurgia de correção de hérnia inguinal por via aberta (técnica de Lichtenstein), o cirurgião precisa identificar as estruturas que compõem o canal inguinal para posicionar a tela adequadamente. Ao dissecar a região, identifica-se uma camada aponeurótica que forma a parede anterior do canal em quase toda a sua extensão e cujo bordo inferior se enrola para formar o ligamento inguinal. Essa estrutura anatômica é derivada de qual dos seguintes músculos ou aponeuroses?',
        'options': {
            'a': 'Músculo transverso do abdome.',
            'b': 'Aponeurose do músculo oblíquo externo.',
            'c': 'Fáscia transversalis.',
            'd': 'Músculo oblíquo interno.',
            'e': 'Músculo reto abdominal.'
        },
        'answer': 'b',
        'rationale': 'O canal inguinal é uma passagem oblíqua através da parede abdominal. A parede anterior é formada primordialmente pela aponeurose do músculo oblíquo externo do abdome. O ligamento inguinal (de Poupart) é, de fato, o bordo inferior espessado e fletido dessa aponeurose, estendendo-se da espinha ilíaca anterossuperior ao tubérculo púbico. O conhecimento dessas camadas é fundamental para a técnica cirúrgica de reparo de hérnias.',
        'option_rationales': {
            'a': 'Errada. O transverso do abdome forma a parede posterior (via tendão conjunto) e o teto do canal, mas não a parede anterior.',
            'b': 'Correta. A aponeurose do oblíquo externo forma a parede anterior e o ligamento inguinal.',
            'c': 'Errada. A fáscia transversalis forma a parede posterior do canal inguinal.',
            'd': 'Errada. O oblíquo interno contribui para o teto do canal e, em conjunto com o transverso, forma o foice inguinal (tendão conjunto).',
            'e': 'Errada. O músculo reto abdominal situa-se medialmente ao canal inguinal e não compõe suas paredes diretas.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Parede Abdominal', 'Canal Inguinal']
    },
    {
        'enunciado': 'Um paciente vítima de trauma torácico fechado apresenta fratura de múltiplas costelas, resultando em um quadro de tórax instável. Durante a avaliação radiológica, nota-se que a fratura ocorreu na região mais frágil da costela, onde o osso apresenta sua maior curvatura e o sulco costal é mais evidente. Além disso, o médico deve estar atento ao feixe vasculonervoso intercostal. Com base na anatomia das costelas típicas, assinale a alternativa que descreve corretamente a localização do feixe vasculonervoso intercostal.',
        'options': {
            'a': 'O feixe localiza-se na borda superior da costela, protegido pelo músculo intercostal externo.',
            'b': 'O feixe localiza-se na borda inferior da costela, no sulco da costela, entre os músculos intercostal interno e íntimo.',
            'c': 'O feixe localiza-se superficialmente ao músculo intercostal externo, logo abaixo da fáscia peitoral.',
            'd': 'O nervo intercostal situa-se superiormente à artéria e à veia dentro do sulco costal.',
            'e': 'A veia intercostal é a estrutura mais inferior do feixe, sendo a primeira a ser lesada em punções inadvertidas na borda inferior.'
        },
        'answer': 'b',
        'rationale': 'As costelas típicas (3ª a 9ª) possuem um sulco na face interna de sua borda inferior. O feixe vasculonervoso intercostal (Veia, Artéria, Nervo - mnemônico VAN) percorre esse sulco. Anatômica e cirurgicamente, o feixe situa-se no plano entre as camadas média (intercostal interno) e profunda (intercostal íntimo) dos músculos intercostais. Por isso, orienta-se realizar punções torácicas na borda SUPERIOR da costela inferior ao espaço, para evitar lesão do feixe.',
        'option_rationales': {
            'a': 'Errada. O feixe situa-se na borda inferior, não na superior.',
            'b': 'Correta. Esta é a descrição clássica da topografia do feixe VAN intercostal.',
            'c': 'Errada. O feixe é profundo aos músculos intercostais externo e interno.',
            'd': 'Errada. A ordem de superior para inferior é Veia, Artéria e Nervo (VAN); o nervo é o mais inferior.',
            'e': 'Errada. O nervo é a estrutura mais inferior do feixe, não a veia.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Tórax', 'Osteologia']
    },
    {
        'enunciado': 'O diafragma é o principal músculo da respiração e separa as cavidades torácica e abdominal. Ele possui hiatos que permitem a passagem de estruturas fundamentais entre essas cavidades. Um paciente com esofagite de refluxo grave apresenta hérnia de hiato ao exame endoscópico. Anatômica e funcionalmente, o hiato esofágico é formado predominantemente por fibras de qual estrutura?',
        'options': {
            'a': 'Pilar direito do diafragma.',
            'b': 'Pilar esquerdo do diafragma.',
            'c': 'Centro tendíneo do diafragma.',
            'd': 'Ligamento arqueado mediano.',
            'e': 'Ligamento arqueado lateral.'
        },
        'answer': 'a',
        'rationale': 'O diafragma possui três grandes aberturas: o forame da veia cava (no centro tendíneo, nível T8), o hiato esofágico (nível T10) e o hiato aórtico (nível T12). O hiato esofágico é formado por uma fenda muscular nas fibras do pilar direito do diafragma, que se cruzam para formar uma espécie de esfíncter extrínseco ao redor do esôfago. Fraquezas nessas fibras contribuem para o desenvolvimento de hérnias de hiato.',
        'option_rationales': {
            'a': 'Correta. O pilar direito circunda o esôfago na maioria dos indivíduos.',
            'b': 'Errada. O pilar esquerdo é menor e raramente contribui significativamente para a formação do hiato esofágico.',
            'c': 'Errada. O centro tendíneo abriga o forame da veia cava, não o hiato esofágico.',
            'd': 'Errada. O ligamento arqueado mediano forma o arco anterior do hiato aórtico.',
            'e': 'Errada. O ligamento arqueado lateral é um espessamento da fáscia do músculo quadrado lombar e não forma hiatos viscerais.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Diafragma', 'Sistema Digestório']
    },
    {
        'enunciado': 'Durante um exame físico de rotina, um médico solicita que o paciente realize uma inspiração profunda forçada. Ele observa a contração dos músculos acessórios da respiração. Entre os músculos citados abaixo, qual deles atua como um músculo inspiratório acessório ao elevar as primeiras e segundas costelas?',
        'options': {
            'a': 'Músculos escalenos.',
            'b': 'Músculo reto abdominal.',
            'c': 'Músculo transverso do tórax.',
            'd': 'Músculos intercostais internos (parte interóssea).',
            'e': 'Músculo oblíquo externo.'
        },
        'answer': 'a',
        'rationale': 'Na inspiração forçada ou em situações de insuficiência respiratória, músculos acessórios são recrutados para aumentar o volume da caixa torácica. Os músculos escalenos (anterior, médio e posterior), localizados no pescoço, fixam-se no processo transverso das vértebras cervicais e inserem-se na 1ª e 2ª costelas. Sua contração eleva essas costelas, auxiliando na expansão do diâmetro superior do tórax.',
        'option_rationales': {
            'a': 'Correta. Os escalenos elevam as costelas superiores.',
            'b': 'Errada. O reto abdominal é um potente músculo expiratório acessório (comprime as vísceras e abaixa as costelas).',
            'c': 'Errada. O transverso do tórax auxilia no abaixamento das cartilagens costais (expiração).',
            'd': 'Errada. A parte interóssea dos intercostais internos atua na expiração forçada; apenas a parte intercondral auxilia na inspiração.',
            'e': 'Errada. O oblíquo externo é um músculo expiratório acessório.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Músculos', 'Sistema Respiratório']
    },
    {
        'enunciado': 'A articulação atlantoaxial é responsável por grande parte da amplitude de movimento de rotação da cabeça. Ela é composta por articulações sinoviais entre o atlas (C1) e o áxis (C2). O dente do áxis é a estrutura central desse movimento, sendo mantido em posição contra o arco anterior do atlas por um ligamento crucial para a estabilidade da coluna cervical superior. Em casos de artrite reumatoide grave, esse ligamento pode sofrer erosão, levando à subluxação atlantoaxial perigosa. Qual é esse ligamento?',
        'options': {
            'a': 'Ligamento alar.',
            'b': 'Ligamento transverso do atlas.',
            'c': 'Ligamento amarelo.',
            'd': 'Ligamento nucal.',
            'e': 'Ligamento longitudinal anterior.'
        },
        'answer': 'b',
        'rationale': 'O ligamento transverso do atlas estende-se entre os tubérculos nas massas laterais de C1, passando posteriormente ao dente do áxis. Ele forma a parede posterior da articulação trocoide atlantoaxial mediana. Sua integridade impede que o dente se desloque para trás e comprima a medula espinal. Ligamentos alares limitam a rotação, mas o transverso é o principal estabilizador \"em pivô\".',
        'option_rationales': {
            'a': 'Errada. Os ligamentos alares unem o dente aos côndilos occipitais e limitam a rotação lateral excessiva.',
            'b': 'Correta. O ligamento transverso é o pilar da estabilidade atlantoaxial mediana.',
            'c': 'Errada. O ligamento amarelo está presente entre as lâminas de todas as vértebras abaixo de C1.',
            'd': 'Errada. O ligamento nucal é um septo fibroso posterior que se estende da protuberância occipital externa aos processos espinhosos cervicais.',
            'e': 'Errada. O ligamento longitudinal anterior percorre a face anterior dos corpos vertebrais; ele não estabiliza o dente do áxis especificamente.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Artrologia', 'Coluna Vertebral']
    },
    {
        'enunciado': 'Um estudante de medicina observa, durante a dissecação de um cadáver, uma estrutura fibrosa que corre verticalmente na linha média da parede abdominal anterior, estendendo-se do processo xifoide à sínfise púbica. Ele nota que essa estrutura é formada pela decussação das aponeuroses dos músculos oblíquo externo, oblíquo interno e transverso do abdome. Sabendo que essa região é um local comum para a realização de laparotomias por ser relativamente avascular, identifique a estrutura descrita.',
        'options': {
            'a': 'Linha semilunar.',
            'b': 'Fáscia de Scarpa.',
            'c': 'Linha alba.',
            'd': 'Bainha do músculo reto.',
            'e': 'Ligamento de Cooper.'
        },
        'answer': 'c',
        'rationale': 'A linha alba é o rafe fibroso central da parede abdominal anterior. Ela resulta do entrelaçamento das fibras aponeuróticas dos músculos largos do abdome de ambos os lados. Como contém poucos vasos sanguíneos e nervos significativos, é a via de escolha para a incisão mediana (laparotomia mediana), facilitando o acesso rápido e com sangramento mínimo à cavidade peritoneal.',
        'option_rationales': {
            'a': 'Errada. A linha semilunar marca o limite lateral do músculo reto abdominal.',
            'b': 'Errada. A fáscia de Scarpa é uma camada profunda e membranosa da tela subcutânea abdominal.',
            'c': 'Correta. Descrição clássica da linha alba abdominal.',
            'd': 'Errada. A bainha do músculo reto é o invólucro aponeurótico do músculo reto, mas a estrutura central é a linha alba.',
            'e': 'Errada. O ligamento de Cooper (pectíneo) localiza-se na crista pectínea do púbis.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Parede Abdominal', 'Músculos']
    },
    {
        'enunciado': 'A parede torácica é suprida por artérias intercostais que se anastomosam para garantir a perfusão dos tecidos. A maioria das artérias intercostais posteriores origina-se diretamente da aorta torácica. No entanto, as duas primeiras artérias intercostais posteriores originam-se de um tronco comum. Identifique a origem correta das artérias intercostais posteriores do 1º e 2º espaços.',
        'options': {
            'a': 'Artéria mamária interna (torácica interna).',
            'b': 'Artéria intercostal suprema, ramo do tronco costocervical.',
            'c': 'Artéria subclávia, ramo direto.',
            'd': 'Artéria carótida comum.',
            'e': 'Artéria axilar, ramo torácico superior.'
        },
        'answer': 'b',
        'rationale': 'O suprimento arterial das paredes torácicas é distribuído entre artérias intercostais anteriores (ramos da torácica interna) e posteriores. As intercostais posteriores do 3º ao 11º espaço nascem da aorta. Já as dos dois primeiros espaços derivam da artéria intercostal suprema, que por sua vez é um ramo do tronco costocervical, um dos ramos da segunda porção da artéria subclávia. Esse detalhe é frequente em provas de anatomia vascular.',
        'option_rationales': {
            'a': 'Errada. A torácica interna dá origem às intercostais anteriores.',
            'b': 'Correta. A intercostal suprema supre os dois primeiros espaços posteriores.',
            'c': 'Errada. Não nascem diretamente da subclávia, mas via tronco costocervical.',
            'd': 'Errada. A carótida comum supre cabeça e pescoço.',
            'e': 'Errada. A torácica superior supre a parte superior da parede torácica, mas não as intercostais posteriores típicas.'
        },
        'difficulty': 'Difícil',
        'tags': ['Anatomia', 'Vascularização', 'Tórax']
    },
    {
        'enunciado': 'Um paciente de 60 anos apresenta dificuldade progressiva para defecar e dor na região perineal. O exame físico revela uma hérnia que protrui através de uma fraqueza no assoalho pélvico. Anatomia básica: o assoalho pélvico (diafragma da pélvis) é formado primordialmente por um complexo muscular que sustenta as vísceras pélvicas. Qual é o principal músculo desse complexo?',
        'options': {
            'a': 'Músculo piriforme.',
            'b': 'Músculo levantador do ânus.',
            'c': 'Músculo obturador interno.',
            'd': 'Músculo psoas maior.',
            'e': 'Músculo glúteo máximo.'
        },
        'answer': 'b',
        'rationale': 'O diafragma da pélvis é a estrutura muscular que fecha a abertura inferior da pélvis. Ele é composto principalmente pelo músculo levantador do ânus (formado pelos músculos puborretal, pubococcígeo e iliococcígeo) e pelo músculo isquiococcígeo (coccígeo). O levantador do ânus é essencial para a continência fecal e urinária, além de sustentar o útero, bexiga e reto.',
        'option_rationales': {
            'a': 'Errada. O piriforme é um músculo da parede posterior da pélvis que atua no quadril.',
            'b': 'Correta. O levantador do ânus é o principal componente do assoalho pélvico.',
            'c': 'Errada. O obturador interno forma a parede lateral da pélvis menor.',
            'd': 'Errada. O psoas maior localiza-se na parede abdominal posterior.',
            'e': 'Errada. O glúteo máximo é um músculo extrínseco da região glútea.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Pélvis', 'Assoalho Pélvico']
    },
    {
        'enunciado': 'Durante uma punção lombar (colheita de líquor), a agulha deve atravessar várias camadas de tecido antes de atingir o espaço subaracnóideo. Após atravessar a pele e o tecido subcutâneo na linha média entre os processos espinhosos de L3 e L4, qual é a sequência correta dos ligamentos perfurados pela agulha até chegar à dura-máter?',
        'options': {
            'a': 'Ligamento supraespinal → Ligamento infraespinal → Ligamento amarelo.',
            'b': 'Ligamento supraespinal → Ligamento interespinal → Ligamento amarelo.',
            'c': 'Ligamento interespinal → Ligamento supraespinal → Ligamento longitudinal posterior.',
            'd': 'Ligamento longitudinal anterior → Ligamento amarelo → Ligamento interespinal.',
            'e': 'Ligamento nucal → Ligamento interespinal → Ligamento amarelo.'
        },
        'answer': 'b',
        'rationale': 'Para realizar uma punção lombar mediana, a agulha percorre: Pele → Subcutâneo → Ligamento supraespinal (que conecta as pontas dos processos espinhosos) → Ligamento interespinal (entre os processos espinhosos) → Ligamento amarelo (entre as lâminas). Ao perfurar o ligamento amarelo, sente-se frequentemente uma \"perda de resistência\". Após o ligamento amarelo e o espaço epidural, a agulha perfura a dura-máter e a aracnóide para colher o líquor.',
        'option_rationales': {
            'a': 'Errada. \"Infraespinal\" não é a nomenclatura anatômica padrão para o ligamento interespinal.',
            'b': 'Correta. Sequência exata dos ligamentos de posterior para anterior na linha média.',
            'c': 'Errada. O supraespinal é mais superficial que o interespinal; o longitudinal posterior é anterior à medula.',
            'd': 'Errada. O longitudinal anterior é a estrutura mais anterior da coluna, não sendo perfurado na punção posterior.',
            'e': 'Errada. O ligamento nucal existe apenas na região cervical.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Coluna Vertebral', 'Prática Clínica']
    },
    {
        'enunciado': 'A anatomia da superfície do dorso permite a identificação de pontos de referência importantes. Ao palpar o processo espinhoso mais proeminente na base do pescoço quando o paciente flexiona a cabeça, o examinador identifica a vértebra tecnicamente chamada de \"vértebra proeminente\". Qual é a numeração correta dessa vértebra?',
        'options': {
            'a': 'C5.',
            'b': 'C6.',
            'c': 'C7.',
            'd': 'T1.',
            'e': 'T2.'
        },
        'answer': 'c',
        'rationale': 'A 7ª vértebra cervical (C7) possui um processo espinhoso longo, não bifurcado e muito proeminente, o que a torna um marco anatômico fundamental para a contagem das vértebras no exame físico do dorso. Embora o processo espinhoso de T1 também seja proeminente, o de C7 é o ponto de referência clássico descrito na anatomia sistemática como \"vértebra proeminens\".',
        'option_rationales': {
            'a': 'Errada. C5 não é proeminente ao toque superficial.',
            'b': 'Errada. C6 é identificada pelo tubérculo carótico, mas não pelo processo espinhoso no dorso.',
            'c': 'Correta. C7 é a definição técnica de vértebra proeminente.',
            'd': 'Errada. T1 é proeminente, mas situa-se logo abaixo da C7.',
            'e': 'Errada. T2 é oculta pela musculatura do trapézio superior.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Coluna Vertebral', 'Osteologia']
    },
    {
        'enunciado': 'A respiração paradoxal é um sinal clínico de grave insuficiência respiratória ou lesão traumática (como o tórax instável). Em recém-nascidos, devido à complacência da caixa torácica, a inspiração pode causar retrações intercostais. Do ponto de vista anatômico, o movimento de \"alça de balde\" (bucket handle), que aumenta o diâmetro lateral (transverso) do tórax durante a inspiração, é realizado predominantemente por quais costelas?',
        'options': {
            'a': '1ª e 2ª costelas.',
            'b': '3ª a 6ª costelas.',
            'c': '7ª a 10ª costelas.',
            'd': '11ª e 12ª costelas.',
            'e': 'Apenas as costelas flutuantes.'
        },
        'answer': 'c',
        'rationale': 'Existem dois movimentos clássicos das costelas na inspiração: o \"braço de bomba\" (pump handle), que eleva as extremidades anteriores das costelas superiores (2-6) aumentando o diâmetro anteroposterior; e a \"alça de balde\" (bucket handle), típico das costelas inferiores (7-10), cujas partes laterais se elevam e se afastam da linha média, aumentando o diâmetro transverso. As flutuantes (11-12) têm pouco papel mecânico direto na expansão volumétrica.',
        'option_rationales': {
            'a': 'Errada. As costelas superiores fazem movimento de \"braço de bomba\".',
            'b': 'Errada. Costelas 3-6 aumentam principalmente o diâmetro anteroposterior.',
            'c': 'Correta. 7ª a 10ª realizam o movimento de alça de balde.',
            'd': 'Errada. 11ª e 12ª são flutuantes e não fixas ao esterno.',
            'e': 'Errada. As flutuantes não contribuem para o movimento de alça de balde eficiente.'
        },
        'difficulty': 'Difícil',
        'tags': ['Anatomia', 'Tórax', 'Biomecânica']
    },
    {
        'enunciado': 'Um paciente submetido a uma nefrectomia radical por via lombar (incisão de lombo-laparotomia) apresenta, no pós-operatório, uma fraqueza na musculatura abdominal anterolateral e perda de sensibilidade na região suprapúbica. O cirurgião suspeita de lesão nervosa durante a incisão muscular profunda. Qual nervo, que percorre a face anterior do músculo quadrado lombar e perfura o músculo transverso do abdome, é o mais provável de ter sido lesado?',
        'options': {
            'a': 'Nervo femoral.',
            'b': 'Nervo ilio-hipogástrico.',
            'c': 'Nervo obturador.',
            'd': 'Nervo genitofemoral.',
            'e': 'Nervo subcostal.'
        },
        'answer': 'b',
        'rationale': 'O nervo ilio-hipogástrico (L1) emerge da borda lateral do psoas maior, passa anteriormente ao quadrado lombar e perfura o transverso do abdome próximo à crista ilíaca. Ele supre os músculos da parede abdominal e fornece sensibilidade à pele da região glútea lateral e suprapúbica. Sua localização o torna vulnerável em incisões lombares ou renais.',
        'option_rationales': {
            'a': 'Errada. O nervo femoral é profundo e emerge entre o psoas e o ilíaco, dirigindo-se à coxa.',
            'b': 'Correta. Sua topografia condiz com o risco em cirurgias renais via lombar.',
            'c': 'Errada. O nervo obturador corre medialmente ao psoas para o forame obturado.',
            'd': 'Errada. O genitofemoral perfura o músculo psoas na sua face anterior.',
            'e': 'Errada. O subcostal (T12) corre logo abaixo da 12ª costela; embora vulnerável, o relato de parestesia suprapúbica aponta mais para L1.',
        },
        'difficulty': 'Difícil',
        'tags': ['Anatomia', 'Plexo Lombar', 'Parede Abdominal']
    },
    {
        'enunciado': 'O canal vertebral contém a medula espinal, as meninges e as raízes nervosas. Em um adulto jovem saudável, em qual nível vertebral a medula espinal geralmente termina, dando início à cauda equina?',
        'options': {
            'a': 'L1 - L2.',
            'b': 'L4 - L5.',
            'c': 'S1 - S2.',
            'd': 'T10 - T11.',
            'e': 'No nível do cóccix.'
        },
        'answer': 'a',
        'rationale': 'No feto, a medula ocupa toda a extensão do canal vertebral. Devido ao crescimento diferencial da coluna vertebral e do tecido nervoso (ascensão aparente da medula), no adulto, o cone medular (final da medula espinal) situa-se geralmente no nível do disco intervertebral entre L1 e L2. Por isso, punções lombares são realizadas com segurança abaixo deste nível (ex: L3-L4 ou L4-L5).',
        'option_rationales': {
            'a': 'Correta. Nível fisiológico padrão no adulto.',
            'b': 'Errada. Nível comum para punção lombar, já no espaço da cauda equina.',
            'c': 'Errada. S1-S2 é o nível onde termina o saco dural, não a medula.',
            'd': 'Errada. Nível muito elevado; a medula continua abaixo de T12.',
            'e': 'Errada. Incorreto; a medula termina muito antes do cóccix no adulto.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Medula Espinal', 'Neuroanatomia']
    },
    {
        'enunciado': 'As costelas são classificadas como verdadeiras, falsas ou flutuantes baseadas em sua fixação ao esterno. Um paciente com dor torácica localizada na junção das cartilagens costais com o esterno (condrite) é avaliado. Anatômica e sistematicamente, quais são as costelas consideradas \"verdadeiras\" (vertebrocostais)?',
        'options': {
            'a': '1ª a 5ª costelas.',
            'b': '1ª a 7ª costelas.',
            'c': '1ª a 10ª costelas.',
            'd': '8ª a 10ª costelas.',
            'e': '11ª e 12ª costelas.'
        },
        'answer': 'b',
        'rationale': 'Costelas verdadeiras (1ª-7ª) são aquelas cujas cartilagens costais se articulam diretamente com o esterno. As falsas (8ª-10ª) têm suas cartilagens unidas à cartilagem da costela imediatamente superior, formando a margem costal. As flutuantes (11ª-12ª) não possuem fixação anterior, terminando na musculatura abdominal posterior.',
        'option_rationales': {
            'a': 'Errada. Incompleto, a 6ª e 7ª também são verdadeiras.',
            'b': 'Correta. Classificação clássica das costelas vertebrocostais.',
            'c': 'Errada. Inclui as costelas falsas (8-10).',
            'd': 'Errada. Estas são as costelas falsas.',
            'e': 'Errada. Estas são as costelas flutuantes.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Tórax', 'Osteologia']
    },
    {
        'enunciado': 'O músculo grande dorsal (latissimus dorsi) é um dos maiores e mais superficiais músculos do dorso. Ele possui uma origem extensa e se insere no úmero. Sabendo que este músculo é clinicamente testado pedindo ao paciente para aduzir o braço contra resistência (movimento de \"coçar as costas\"), identifique o nervo responsável por sua inervação.',
        'options': {
            'a': 'Nervo acessório (XI par).',
            'b': 'Nervo dorsal da escápula.',
            'c': 'Nervo toracodorsal.',
            'd': 'Nervo torácico longo.',
            'e': 'Nervos intercostais.'
        },
        'answer': 'c',
        'rationale': 'O músculo grande dorsal é inervado pelo nervo toracodorsal (ramo do fascículo posterior do plexo braquial, raízes C6, C7, C8). Lesões desse nervo (por exemplo, em cirurgias de esvaziamento axilar por câncer de mama) resultam em fraqueza na extensão, adução e rotação medial do úmero.',
        'option_rationales': {
            'a': 'Errada. O nervo acessório inerva o trapézio e o esternocleidomastoideo.',
            'b': 'Errada. O dorsal da escápula inerva os romboides e o levantador da escápula.',
            'c': 'Correta. Nervo específico para o músculo grande dorsal.',
            'd': 'Errada. O torácico longo inerva o músculo serrátil anterior.',
            'e': 'Errada. O grande dorsal é um músculo extrínseco do dorso derivado do membro superior, não sendo inervado por ramos segmentares do tronco.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Músculos', 'Plexo Braquial']
    },
    {
        'enunciado': 'A herniação de disco intervertebral ocorre mais frequentemente em direção posterolateral devido a uma característica anatômica específica dos ligamentos da coluna vertebral. Qual ligamento reforça a face anterior dos corpos vertebrais e discos, mas torna-se estreito e menos resistente na sua porção posterior?',
        'options': {
            'a': 'Ligamento longitudinal anterior.',
            'b': 'Ligamento longitudinal posterior.',
            'c': 'Ligamento amarelo.',
            'd': 'Ligamento nucal.',
            'e': 'Ligamento supraespinal.'
        },
        'answer': 'b',
        'rationale': 'O ligamento longitudinal anterior é largo e forte, cobrindo a face anterior dos corpos vertebrais. Já o ligamento longitudinal posterior percorre o interior do canal vertebral; ele é mais estreito e fraco, especialmente nas margens posterolaterais dos discos intervertebrais. Essa \"fraqueza\" anatômica lateral ao ligamento posterior é o caminho de menor resistência para o núcleo pulposo herniar.',
        'option_rationales': {
            'a': 'Errada. O longitudinal anterior é extremamente forte e largo.',
            'b': 'Correta. Sua conformação estreita predispõe a hérnias posterolaterais.',
            'c': 'Errada. O ligamento amarelo está no arco vertebral, não no corpo.',
            'd': 'Errada. Ligamento cervical posterior.',
            'e': 'Errada. Conecta os processos espinhosos.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Coluna Vertebral', 'Patologia Anatômica']
    },
    {
        'enunciado': 'Uma criança de 4 anos aspira acidentalmente um pequeno brinquedo de plástico. O exame radiográfico sugere que o corpo estranho está alojado em um dos brônquios principais. De acordo com a anatomia da árvore brônquica, em qual brônquio o objeto tem maior probabilidade de ser encontrado?',
        'options': {
            'a': 'Brônquio principal esquerdo, por ser mais horizontal e largo.',
            'b': 'Brônquio principal direito, por ser mais vertical, mais curto e mais largo.',
            'c': 'Brônquio principal esquerdo, por ser mais longo e estreito.',
            'd': 'Brônquio principal direito, por ser mais longo e horizontal.',
            'e': 'Ambos têm a mesma probabilidade anatômica.'
        },
        'answer': 'b',
        'rationale': 'O brônquio principal direito é mais vertical (forma ângulo menos agudo com a traqueia), mais curto (aproximadamente 2,5 cm) e mais largo que o esquerdo. Essas características anatômicas facilitam a passagem de corpos estranhos aspirados, que tendem a seguir a trajetória retilínea da traqueia para o pulmão direito.',
        'option_rationales': {
            'a': 'Errada. O esquerdo é mais horizontal, o que dificulta o alojamento de objetos.',
            'b': 'Correta. Morfologia clássica que explica a epidemiologia da aspiração.',
            'c': 'Errada. Características corretas do esquerdo, mas que diminuem a chance de aspiração.',
            'd': 'Errada. O direito é curto e vertical.',
            'e': 'Errada. Há uma clara predisposição anatômica para o lado direito.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Sistema Respiratório', 'Clínica.']
    },
    {
        'enunciado': 'As articulações sinoviais dos processos articulares da coluna vertebral, que permitem movimentos de deslizamento entre vértebras adjacentes, são conhecidas como:',
        'options': {
            'a': 'Sinfises intervertebrais.',
            'b': 'Articulações uncovertebrais (de Luschka).',
            'c': 'Articulações zigapofisárias.',
            'd': 'Sindesmoses interlaminares.',
            'e': 'Esquindileses cervicais.'
        },
        'answer': 'c',
        'rationale': 'As articulações zigapofisárias (ou articulações de facetas) são articulações sinoviais planas entre os processos articulares superior de uma vértebra e inferior da vértebra sobrejacente. Elas determinam o tipo de movimento permitido em cada região da coluna (ex: rotação na torácica, flexão/extensão na lombar). Degenerações nessas articulações são causas comuns de dor nas costas crônica.',
        'option_rationales': {
            'a': 'Errada. Sinfises referem-se aos discos entre os corpos vertebrais (cartilaginosas).',
            'b': 'Errada. Estas ocorrem apenas na região cervical entre os processos uncinados.',
            'c': 'Correta. Nomenclatura anatômica padrão para as facetas articulares.',
            'd': 'Errada. Sindesmoses interlaminares referem-se à união pelos ligamentos amarelos.',
            'e': 'Errada. Esquindilese é um tipo de articulação fibrosa rara (ex: vômer com esfenoide).'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Artrologia', 'Coluna Vertebral']
    },
    {
        'enunciado': 'O músculo psoas maior é um músculo volumoso que compõe a parede abdominal posterior. Ele tem origem nos processos transversos e corpos das vértebras lombares (T12-L5). Sabendo que seu tendão se une ao músculo ilíaco para se inserir no fêmur, identifique o seu local de inserção distal e a sua função principal no quadril.',
        'options': {
            'a': 'Trocânter maior; Extensão do quadril.',
            'b': 'Trocânter menor; Flexão do quadril.',
            'c': 'Linha áspera; Adução do quadril.',
            'd': 'Epicôndilo medial; Rotação externa do joelho.',
            'e': 'Tuberosidade isquiática; Estabilização da pélvis.'
        },
        'answer': 'b',
        'rationale': 'O músculo iliopsoas (fusão do psoas maior e ilíaco) é o flexor mais potente do quadril. Ele se insere distalmente no trocânter menor do fêmur. Além da flexão do quadril, ele atua na flexão do tronco e na estabilização da postura ereta. É um músculo clinicamente importante, pois abscessos de coluna (ex: mal de Pott) podem drenar através de sua fáscia até a coxa.',
        'option_rationales': {
            'a': 'Errada. O trocânter maior é local de inserção de glúteos e rotadores externos; o psoas não estende o quadril.',
            'b': 'Correta. Inserção no trocânter menor e função de flexão.',
            'c': 'Errada. Músculos adutores inserem-se na linha áspera.',
            'd': 'Errada. Foge totalmente da anatomia do psoas.',
            'e': 'Errada. A tuberosidade isquiática é origem dos hamstrings (isquiotibiais).'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Músculos', 'Membro Inferior']
    }
];

const package_id = '4a6f7797-c62a-4002-b6b5-d7eb76f1d903';

const sqlValues = questions.map((q, i) => {
    const q_json = JSON.stringify(q);
    const normalized = q.enunciado.toLowerCase().replace(/\s+/g, ' ').trim();
    const hash = crypto.createHash('md5').update(normalized).digest('hex');
    const q_json_esc = q_json.replace(/'/g, "''");
    return "('" + package_id + "', '" + q_json_esc + "', '" + hash + "', " + i + ", 'draft')";
}).join(', ');

const sql = 'INSERT INTO package_questions (package_id, question_json, hash_logico, order_index, status) VALUES ' + sqlValues + ';';
fs.writeFileSync('C:/Users/kayqu/Desktop/Qrub1/QRub/questions_insert.sql', sql);
console.log('SQL file created successfully');
