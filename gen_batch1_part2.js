
const fs = require('fs');
const crypto = require('crypto');

const package_id = '4a6f7797-c62a-4002-b6b5-d7eb76f1d903';

function getHash(text) {
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();
    return crypto.createHash('md5').update(normalized).digest('hex');
}

const batch1_remaining = [
    {
        'enunciado': 'A clavícula é o primeiro osso a ossificar e o único osso longo que se ossifica em membrana. Em caso de fratura, a maioria ocorre no terço médio, devido à sua curvatura. Qual músculo, ao tracionar o fragmento medial superiormente após uma fratura, é responsável pelo desvio característico visível no exame físico?',
        'options': {
            'a': 'Deltoide.',
            'b': 'Peitoral maior.',
            'c': 'Esternocleidomastoideo.',
            'd': 'Trapézio.',
            'e': 'Subclávio.'
        },
        'answer': 'c',
        'rationale': 'Na fratura de clavícula, o músculo esternocleidomastoideo traciona o fragmento medial para cima, enquanto o peso do braço e a ação do peitoral maior puxam o fragmento lateral para baixo e medialmente. O subclávio, por sua vez, pode proteger os vasos subclávios subjacentes em caso de fraturas não cominutivas.',
        'option_rationales': {
            'a': 'Errada. O deltoide traciona o fragmento lateral.',
            'b': 'Errada. O peitoral maior traciona o fragmento lateral medialmente.',
            'c': 'Correta. Tração superior do fragmento medial.',
            'd': 'Errada. O trapézio atua na estabilização posterior da escápula.',
            'e': 'Errada. O subclávio atua puxando a clavícula inferiormente, não o fragmento medial superiormente.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Osteologia', 'Membro Superior']
    },
    {
        'enunciado': 'O músculo iliopsoas é o principal flexor do quadril. Ele é formado pela união dos músculos psoas maior e ilíaco. O psoas menor, quando presente, situa-se anteriormente ao psoas maior. Qual é o local de inserção distal comum do tendão do músculo iliopsoas no fêmur?',
        'options': {
            'a': 'Trocânter maior.',
            'b': 'Trocânter menor.',
            'c': 'Linha pectínea.',
            'd': 'Crista intertrocantérica.',
            'e': 'Fossa trocantérica.'
        },
        'answer': 'b',
        'rationale': 'O tendão do iliopsoas insere-se no trocânter menor do fêmur. É o mais potente flexor da articulação do quadril, essencial para a marcha e para levantar-se da posição sentada.',
        'option_rationales': {
            'a': 'Errada. Inserção de glúteos e piriforme.',
            'b': 'Correta. Localização clássica de inserção do iliopsoas.',
            'c': 'Errada. Local de inserção do músculo pectíneo.',
            'd': 'Errada. Marco ósseo posterior do fêmur.',
            'e': 'Errada. Local de inserção do músculo obturador externo.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Miologia', 'Membro Inferior']
    },
    {
        'enunciado': 'A anatomia do pescoço é organizada em triângulos delimitados por músculos proeminentes. O triângulo carótico, local de palpação do pulso carotídeo, é delimitado por quais músculos?',
        'options': {
            'a': 'Esternocleidomastoideo, ventre superior do omo-hioideo e ventre posterior do digástrico.',
            'b': 'Trapézio, clavícula e esternocleidomastoideo.',
            'c': 'Mandíbula, ventre anterior e posterior do digástrico.',
            'd': 'Esternocleidomastoideo, esterno-hioideo e mandíbula.',
            'e': 'Escaleno anterior, escaleno médio e 1ª costela.'
        },
        'answer': 'a',
        'rationale': 'O triângulo carótico é delimitado pelo bordo anterior do músculo esternocleidomastoideo, pelo ventre posterior do músculo digástrico e pelo ventre superior do músculo omo-hioideo. Contém a artéria carótida comum e sua bifurcação.',
        'option_rationales': {
            'a': 'Correta. Limites clássicos do triângulo carótico.',
            'b': 'Errada. Limites do triângulo cervical posterior.',
            'c': 'Errada. Limites do triângulo submandibular.',
            'd': 'Errada. Descrição incorreta de triângulos cervicais.',
            'e': 'Errada. Limites do espaço interescalênico.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Miologia', 'Pescoço']
    },
    {
        'enunciado': 'Dentre os ossos do tarso, qual é o único que não possui inserções musculares ou tendinosas diretas, transmitindo todo o peso do corpo da tíbia para o calcâneo e o restante do pé?',
        'options': {
            'a': 'Calcâneo.',
            'b': 'Talus (astrágalo).',
            'c': 'Navicular.',
            'd': 'Cuboide.',
            'e': 'Cuneiforme medial.'
        },
        'answer': 'b',
        'rationale': 'O talus é o osso do tarso que se articula com a tíbia e a fíbula na articulação do tornozelo. Ele é recoberto por cartilagem articular em grande parte de sua superfície e é único por não possuir nenhuma inserção muscular ou tendinosa em suas faces.',
        'option_rationales': {
            'a': 'Errada. O calcâneo recebe a inserção do tendão calcâneo (Aquiles).',
            'b': 'Correta. O talus não possui inserções musculares diretas.',
            'c': 'Errada. O tibial posterior insere-se no navicular.',
            'd': 'Errada. O tibial posterior também tem expansões para o cuboide.',
            'e': 'Errada. O tibial anterior e o tibial posterior inserem-se nos cuneiformes.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Osteologia', 'Membro Inferior']
    },
    {
        'enunciado': 'O músculo diafragma possui três grandes aberturas (hiatos) que permitem a passagem de estruturas entre as cavidades torácica e abdominal. O forame da veia cava localiza-se em qual porção do diafragma e em qual nível vertebral?',
        'options': {
            'a': 'Centro tendíneo; Nível T8.',
            'b': 'Parte muscular vertebral; Nível T10.',
            'c': 'Pilar direito; Nível T12.',
            'd': 'Ligamento arqueado mediano; Nível L1.',
            'e': 'Trígono lombo-costal; Nível T12.'
        },
        'answer': 'a',
        'rationale': 'O forame da veia cava situa-se no centro tendíneo do diafragma, geralmente no nível da 8ª vértebra torácica (T8). Além da veia cava inferior, ramos do nervo frênico direito também atravessam essa abertura.',
        'option_rationales': {
            'a': 'Correta. Localização e nível vertebral do forame da veia cava.',
            'b': 'Errada. Nível T10 corresponde ao hiato esofágico.',
            'c': 'Errada. Nível T12 corresponde ao hiato aórtico.',
            'd': 'Errada. O ligamento arqueado mediano forma o hiato aórtico.',
            'e': 'Errada. O trígono lombo-costal é uma zona de fraqueza, não um hiato anatômico para grandes vasos.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Miologia', 'Diafragma']
    },
    {
        'enunciado': 'A parede abdominal anterior é formada por vários músculos e suas aponeuroses. Abaixo da linha arqueada (de Douglas), a bainha do músculo reto abdominal apresenta qual configuração anatômica em relação às lâminas aponeuróticas?',
        'options': {
            'a': 'Todas as aponeuroses passam posteriormente ao músculo reto.',
            'b': 'A aponeurose do oblíquo interno se divide, uma parte passando anterior e outra posterior ao reto.',
            'c': 'Todas as aponeuroses passam anteriormente ao músculo reto, deixando-o em contato direto com a fáscia transversalis posteriormente.',
            'd': 'A bainha é ausente abaixo da linha arqueada, sendo o músculo coberto apenas por pele.',
            'e': 'A aponeurose do transverso do abdome permanece posterior ao músculo reto.'
        },
        'answer': 'c',
        'rationale': 'Acima da linha arqueada, as aponeuroses se distribuem anterior e posteriormente ao reto. Porém, abaixo da linha arqueada (cerca de 5 cm abaixo da cicatriz umbilical), as aponeuroses do oblíquo externo, oblíquo interno e transverso do abdome passam todas ANTERIORMENTE ao músculo reto, formando a lâmina anterior da bainha. Posteriormente, o músculo reto fica em contato apenas com a fáscia transversalis e o peritônio.',
        'option_rationales': {
            'a': 'Errada. Isso não ocorre em nenhum nível.',
            'b': 'Errada. Isso ocorre APENAS acima da linha arqueada.',
            'c': 'Correta. Descrição clássica da transição na linha arqueada.',
            'd': 'Errada. O músculo sempre é protegido internamente por fáscia e peritônio.',
            'e': 'Errada. Abaixo da linha arqueada, ela passa para a frente.'
        },
        'difficulty': 'Difícil',
        'tags': ['Anatomia', 'Parede Abdominal', 'Miologia']
    },
    {
        'enunciado': 'A fáscia toracolombar é uma estrutura aponeurótica complexa no dorso. Ela é composta por várias camadas. Qual desses músculos tem sua origem diretamente relacionada à camada posterior da fáscia toracolombar?',
        'options': {
            'a': 'Latíssimo do dorso (grande dorsal).',
            'b': 'Trapézio.',
            'c': 'Eretor da espinha.',
            'd': 'Multífido.',
            'e': 'Quadrado lombar.'
        },
        'answer': 'a',
        'rationale': 'O músculo latíssimo do dorso tem uma origem aponeurótica extensa na fáscia toracolombar (camada posterior), além dos processos espinhosos de T7-L5 e crista ilíaca.',
        'option_rationales': {
            'a': 'Correta. Origem principal do grande dorsal no dorso inferior.',
            'b': 'Errada. O trapézio origina-se na linha nucal e processos espinhosos cervicais/torácicos superiores.',
            'c': 'Errada. O eretor da espinha situa-se ENTRE as camadas da fáscia, mas não origina a camada posterior.',
            'd': 'Errada. O multífido é profundo e situa-se medialmente ao eretor.',
            'e': 'Errada. O quadrado lombar situa-se entre as camadas média e anterior da fáscia toracolombar.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Miologia', 'Dorso']
    },
    {
        'enunciado': 'O plexo coccígeo é formado por pequenos ramos nervosos. No entanto, o nervo frênico, essencial para a respiração, tem sua origem principal em qual plexo e quais raízes?',
        'options': {
            'a': 'Plexo braquial; C5-C7.',
            'b': 'Plexo cervical; C3-C5.',
            'c': 'Plexo lombar; L1-L3.',
            'd': 'Plexo sacral; S2-S4.',
            'e': 'Plexo celíaco; Nervos esplâncnicos.'
        },
        'answer': 'b',
        'rationale': 'O nervo frênico origina-se primordialmente do 4º nervo cervical (C4), com contribuições de C3 e C5 (mnemônico: \"C3, 4, 5 keep the diaphragm alive\"). Ele atravessa o pescoço e o tórax para inervar o diafragma.',
        'option_rationales': {
            'a': 'Errada. C5 pode contribuir, mas a origem é cervical superior.',
            'b': 'Correta. Origem clássica do nervo frênico.',
            'c': 'Errada. O plexo lombar supre membros inferiores e parede abdominal.',
            'd': 'Errada. O plexo sacral supre períneo e membros inferiores.',
            'e': 'Errada. O plexo celíaco é autonômico (simpático/parassimpático).'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Neuroanatomia', 'Sistema Respiratório']
    },
    {
        'enunciado': 'O canal do carpo é uma passagem estreita no punho por onde transitam tendões e o nervo mediano. Qual estrutura anatômica forma o teto (limite superficial) desse canal e cuja secção cirúrgica é o tratamento definitivo para a síndrome do túnel do carpo?',
        'options': {
            'a': 'Retináculo dos flexores (ligamento carpal transverso).',
            'b': 'Aponeurose palmar.',
            'c': 'Retináculo dos extensores.',
            'd': 'Ligamento colateral ulnar.',
            'e': 'Tendão do palmar longo.'
        },
        'answer': 'a',
        'rationale': 'O retináculo dos flexores é uma banda fibrosa resistente que se estende entre o escafoide/trapézio e o pisiforme/hamato. Ele forma o teto do túnel do carpo, mantendo os tendões flexores em posição. Seu espessamento pode comprimir o nervo mediano.',
        'option_rationales': {
            'a': 'Correta. Estrutura alvo na síndrome do túnel do carpo.',
            'b': 'Errada. A aponeurose palmar é superficial ao retináculo na palma da mão.',
            'c': 'Errada. O retináculo dos extensores localiza-se na face dorsal do punho.',
            'd': 'Errada. Estabiliza o lado medial da articulação do punho.',
            'e': 'Errada. O tendão do palmar longo passa SUPERFICIALMENTE ao retináculo e não compõe o teto do canal.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Membro Superior', 'Aplicação Clínica']
    },
    {
        'enunciado': 'Os músculos intercostais são fundamentais para a mecânica respiratória. Sobre a disposição de suas fibras, assinale a alternativa que descreve corretamente a orientação das fibras do músculo intercostal externo.',
        'options': {
            'a': 'De cima para baixo e de trás para frente (sentido das mãos no bolso).',
            'b': 'De cima para baixo e de frente para trás.',
            'c': 'Horizontalmente entre as costelas.',
            'd': 'Verticalmente unindo as bordas das costelas.',
            'e': 'Em sentido perpendicular às fibras do intercostal íntimo.'
        },
        'answer': 'a',
        'rationale': 'Os músculos intercostais externos têm suas fibras orientadas obliquamente, de cima para baixo e de trás para frente (anteroinferiormente). Essa orientação é análoga à dos músculos oblíquos externos do abdome e auxilia na elevação das costelas durante a inspiração.',
        'option_rationales': {
            'a': 'Correta. Orientação clássica \"mãos no bolso\".',
            'b': 'Errada. Esta seria a orientação inversa (intercostais internos).',
            'c': 'Errada. Nenhuma camada intercostal é puramente horizontal.',
            'd': 'Errada. Disposição incorreta.',
            'e': 'Errada. As fibras do intercostal íntimo têm a mesma direção que as do interno, sendo perpendiculares às do externo.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Miologia', 'Tórax']
    },
    {
        'enunciado': 'A bursa omental (pequeno saco peritoneal) é um espaço potencial localizado atrás do estômago. O acesso cirúrgico a esse espaço pode ser feito através do forame omental (de Winslow). Qual é o limite anterior desse forame?',
        'options': {
            'a': 'Veia cava inferior e pilar direito do diafragma.',
            'b': 'Ligamento hepatoduodenal (contendo a tríade portal).',
            'c': 'Lobo caudado do fígado.',
            'd': 'Bulbo duodenal.',
            'e': 'Pâncreas.'
        },
        'answer': 'b',
        'rationale': 'O forame omental é a comunicação entre a grande cavidade peritoneal e a bursa omental. Seus limites são: Anterior (ligamento hepatoduodenal com a veia porta, artéria hepática própria e ducto colédoco); Posterior (VCI e pilar direito); Superior (lobo caudado); Inferior (duodeno).',
        'option_rationales': {
            'a': 'Errada. Estes são os limites posteriores.',
            'b': 'Correta. Limite anterior contendo estruturas vitais.',
            'c': 'Errada. Limite superior.',
            'd': 'Errada. Limite inferior.',
            'e': 'Errada. O pâncreas forma a parede posterior da bursa omental, mas não do forame diretamente.'
        },
        'difficulty': 'Difícil',
        'tags': ['Anatomia', 'Peritônio', 'Sistema Digestório']
    },
    {
        'enunciado': 'A fossa cubital é uma depressão triangular na face anterior do cotovelo. Qual nervo atravessa essa fossa situando-se medialmente à artéria braquial e ao tendão do músculo bíceps braquial?',
        'options': {
            'a': 'Nervo radial.',
            'b': 'Nervo ulnar.',
            'c': 'Nervo mediano.',
            'd': 'Nervo musculocutâneo.',
            'e': 'Nervo axilar.'
        },
        'answer': 'c',
        'rationale': 'Na fossa cubital, as estruturas de lateral para medial são: Tendão do bíceps, Artéria braquial e Nervo mediano. O nervo mediano entra no antebraço passando entre as duas cabeças do músculo pronador redondo.',
        'option_rationales': {
            'a': 'Errada. O nervo radial situa-se lateralmente na fossa cubital, sob o braquiorradial.',
            'b': 'Errada. O nervo ulnar passa posteriormente ao epicôndilo medial, fora da fossa cubital.',
            'c': 'Correta. Posição medial característica na fossa cubital.',
            'd': 'Errada. O musculocutâneo torna-se o nervo cutâneo lateral do antebraço após emergir lateralmente ao bíceps.',
            'e': 'Errada. O nervo axilar inerva o ombro.'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Membro Superior', 'Topografia']
    },
    {
        'enunciado': 'Um paciente apresenta-se com \"pé caído\" (incapacidade de realizar dorsiflexão e eversão do pé) após trauma na face lateral do joelho. O médico suspeita de lesão nervosa no nível da cabeça da fíbula. Qual nervo é o mais provável de ter sido lesado?',
        'options': {
            'a': 'Nervo tibial.',
            'b': 'Nervo fibular comum.',
            'c': 'Nervo isquiático.',
            'd': 'Nervo femoral.',
            'e': 'Nervo obturador.'
        },
        'answer': 'b',
        'rationale': 'O nervo fibular comum contorna o colo da fíbula, onde é superficial e vulnerável. Ele se divide em fibular superficial (eversão) e fibular profundo (dorsiflexão). Sua lesão causa perda desses movimentos e pé caído.',
        'option_rationales': {
            'a': 'Errada. O tibial inerva o compartimento posterior da perna (flexão plantar).',
            'b': 'Correta. Vulnerabilidade anatômica no colo da fíbula.',
            'c': 'Errada. O isquiático divide-se em tibial e fibular comum na fossa poplítea.',
            'd': 'Errada. O femoral supre o compartimento anterior da coxa.',
            'e': 'Errada. O obturador supre o compartimento medial da coxa (adutores).'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Neuroanatomia', 'Membro Inferior']
    },
    {
        'enunciado': 'O canal de Hunter (canal adutor) é uma passagem no terço médio da coxa. Ele é limitado lateralmente pelo músculo vasto medial. Qual músculo forma o teto ou limite anterior desse canal?',
        'options': {
            'a': 'Músculo sartório.',
            'b': 'Músculo reto femoral.',
            'c': 'Músculo adutor longo.',
            'd': 'Músculo grácil.',
            'e': 'Músculo pectíneo.'
        },
        'answer': 'a',
        'rationale': 'O canal adutor é limitado pelo vasto medial (lateral), adutor longo e magno (posterior) e o músculo sartório (teto/anterior). Contém a artéria e veia femorais e o nervo safeno.',
        'option_rationales': {
            'a': 'Correta. O sartório recobre o canal adutor.',
            'b': 'Errada. O reto femoral é superficial mas não forma o teto do canal adutor.',
            'c': 'Errada. Forma o limite posterior/medial.',
            'd': 'Errada. O grácil é mais medial e superficial.',
            'e': 'Errada. O pectíneo situa-se na parte superior (triângulo femoral).'
        },
        'difficulty': 'Média',
        'tags': ['Anatomia', 'Membro Inferior', 'Topografia']
    },
    {
        'enunciado': 'A articulação do joelho é reforçada por ligamentos extracapsulares e intracapsulares. Qual ligamento intracapsular impede o deslocamento anterior da tíbia em relação ao fêmur, sendo frequentemente lesado em entorses esportivas?',
        'options': {
            'a': 'Ligamento cruzado posterior (LCP).',
            'b': 'Ligamento cruzado anterior (LCA).',
            'c': 'Ligamento colateral medial (LCM).',
            'd': 'Ligamento colateral lateral (LCL).',
            'e': 'Ligamento patelar.'
        },
        'answer': 'b',
        'rationale': 'O LCA estende-se da área intercondilar anterior da tíbia até a face medial do côndilo lateral do fêmur. Ele impede a anteriorização da tíbia sob o fêmur.',
        'option_rationales': {
            'a': 'Errada. O LCP impede o deslocamento posterior da tíbia.',
            'b': 'Correta. Função clássica do LCA.',
            'c': 'Errada. O LCM impede o estresse em valgo.',
            'd': 'Errada. O LCL impede o estresse em varo.',
            'e': 'Errada. O ligamento patelar é a continuação do tendão do quadríceps.'
        },
        'difficulty': 'Fácil',
        'tags': ['Anatomia', 'Artrologia', 'Membro Inferior']
    }
];

const all_questions = batch1_remaining;

const sqlValues = all_questions.map((q, i) => {
    const q_json = JSON.stringify(q);
    const hash = getHash(q.enunciado);
    const q_json_esc = q_json.replace(/'/g, \"''\");
    return `('${package_id}', '${q_json_esc}', '${hash}', ${i + 20}, 'draft')`;
}).join(', ');

const sql = 'INSERT INTO package_questions (package_id, question_json, hash_logico, order_index, status) VALUES ' + sqlValues + ';';
fs.writeFileSync('C:/Users/kayqu/Desktop/Qrub1/QRub/batch_1_part_2.sql', sql);
console.log('Batch 1 part 2 created with ' + all_questions.length + ' questions');
