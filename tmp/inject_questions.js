require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PACKAGE_ID = '810cdf77-da86-4cb8-abc1-81cf50dc65cb';

const questions = [
    {
        "enunciado": "Um paciente de 65 anos é admitido na emergência com quadro de hipotensão arterial (PA 80x50 mmHg), taquicardia (FC 120 bpm), extremidades frias, tempo de enchimento capilar alentecido e confusão mental. Queixa-se de dor torácica atípica iniciada há 4 horas. O eletrocardiograma revela supradesnivelamento do segmento ST em parede anterior extensa. Solicitado ecocardiograma à beira leito. Qual o principal mecanismo fisiopatológico responsável pelo estado de choque desse paciente?",
        "options": {
            "a": "Redução da resistência vascular sistêmica.",
            "b": "Falência primária da bomba cardíaca com redução do débito cardíaco.",
            "c": "Obstrução mecânica ao fluxo sanguíneo pulmonar.",
            "d": "Perda aguda de volume intravascular.",
            "e": "Aumento excessivo do retorno venoso sistêmico."
        },
        "answer": "b",
        "rationale": "O quadro clínico e eletrocardiográfico é clássico de um infarto agudo do miocárdio de parede anterior extensa, que pode evoluir com disfunção miocárdica grave. O estado de baixo fluxo sistêmico acompanhado de extremidades frias (aumento reflexo da resistência vascular) caracteriza o choque cardiogênico, cuja fisiopatologia primária é a falência da bomba ventricular, resultando em queda expressiva do débito cardíaco.",
        "option_rationales": {
            "a": "A redução da resistência vascular sistêmica é a marca do choque distributivo (ex: séptico, anafilático, neurogênico), cursando inicialmente com extremidades quentes, diferente do caso descrito.",
            "b": "Correta. A isquemia miocárdica extensa compromete a função sistólica, diminuindo o débito cardíaco e caracterizando o choque cardiogênico.",
            "c": "A obstrução mecânica ao fluxo pulmonar (ex: TEP maciço) causa choque obstrutivo, que não é a principal suspeita em um paciente com IAM com supra de ST anterior.",
            "d": "A perda aguda de volume intravascular define o choque hipovolêmico, cujas causas comuns são hemorragias ou perdas gastrointestinais, ausentes neste cenário clínico.",
            "e": "No choque cardiogênico, ocorre aumento das pressões de enchimento (congestão), porém o débito é reduzido. O retorno venoso em si não está excessivamente aumentado como fator causal primário."
        },
        "difficulty": "media",
        "tags": ["Choque Cardiogênico", "Cardiologia", "Fisiopatologia"]
    },
    {
        "enunciado": "Paciente de 40 anos, do sexo feminino, dá entrada com febre aferida (39°C), calafrios e tosse produtiva há 3 dias. Apresenta PA 85x45 mmHg, FC 115 bpm, FR 28 irpm e saturação de O2 de 91%. Ao exame físico, apresenta extremidades quentes e extremidades com perfusão mantida. Após a administração de 30 mL/kg de cristaloide intravenoso, a pressão arterial permanece 85x50 mmHg. Qual deve ser a próxima conduta imediata para manter a perfusão tecidual desta paciente?",
        "options": {
            "a": "Iniciar infusão de noradrenalina.",
            "b": "Realizar transfusão de concentrado de hemácias.",
            "c": "Administrar dobutamina para melhora do inotropismo.",
            "d": "Iniciar infusão de adrenalina em dose baixa.",
            "e": "Administrar hidrocortisona na dose de 200 mg/dia."
        },
        "answer": "a",
        "rationale": "A paciente apresenta um quadro de sepse com provável foco pulmonar evoluindo para choque séptico, evidenciado pela hipotensão refratária à ressuscitação volêmica inicial (30 mL/kg de cristaloide). A conduta medicamentosa imediata de escolha nestes casos é a introdução de um vasopressor para manter a pressão arterial média (PAM) ≥ 65 mmHg. A noradrenalina é o agente vasopressor de primeira linha.",
        "option_rationales": {
            "a": "Correta. A noradrenalina é o vasopressor de primeira escolha no choque séptico refratário a volume sistêmico inicial.",
            "b": "Transfusão de concentrado de hemácias está indicada usualmente apenas se a hemoglobina for < 7 g/dL, não sendo a medida inicial para controle pressórico na ausência de sangramento.",
            "c": "A dobutamina é um inotrópico indicado quando há disfunção miocárdica associada ou hipoperfusão persistente apesar de volume e vasopressor adequados, não como droga isolada inicial para hipotensão periférica pura.",
            "d": "A adrenalina pode ser adicionada como segundo agente vasopressor se houver refratariedade à noradrenalina, ou agente de primeira linha no choque anafilático.",
            "e": "Os corticosteroides (hidrocortisona) são considerados apenas em choque séptico refratário a volume e uso de drogas vasoativas, e não como primeira intervenção medicamentosa isolada."
        },
        "difficulty": "media",
        "tags": ["Choque Séptico", "Vasopressores", "Surviving Sepsis Campaign"]
    },
    {
        "enunciado": "Um jovem de 25 anos é trazido ao pronto-socorro após trauma automobilístico. Na admissão, apresenta-se confuso, pálido, com FC de 135 bpm, PA 70x40 mmHg e FR de 30 irpm. O exame das extremidades revela pulsos periféricos filiformes e cianose de extremidades. Durante a avaliação primária, o FAST é positivo para líquido livre em cavidade abdominal em grande quantidade. Nesse contexto, qual o padrão hemodinâmico esperado caso seja instalado um acesso venoso central e monitorização invasiva?",
        "options": {
            "a": "Débito cardíaco elevado, resistência vascular sistêmica reduzida e pressão venosa central reduzida.",
            "b": "Débito cardíaco reduzido, resistência vascular sistêmica aumentada e pressão capilar pulmonar aumentada.",
            "c": "Débito cardíaco elevado, resistência vascular sistêmica aumentada e pressão venosa central elevada.",
            "d": "Débito cardíaco reduzido, resistência vascular sistêmica aumentada e pressão venosa central reduzida.",
            "e": "Débito cardíaco reduzido, resistência vascular sistêmica reduzida e pressão capilar pulmonar reduzida."
        },
        "answer": "d",
        "rationale": "O quadro descreve um paciente politraumatizado com hemorragia intra-abdominal detectada pelo FAST, caracterizando choque hipovolêmico grave. No choque hipovolêmico, ocorre redução do retorno venoso, o que diminui a pressão venosa central (PVC) e o débito cardíaco (DC). Como mecanismo compensatório simpático, há um aumento expressivo da resistência vascular sistêmica (RVS), causando palidez e extremidades frias.",
        "option_rationales": {
            "a": "Padrão clássico do choque distributivo inicial (séptico), divergente do quadro hipovolêmico sangrante.",
            "b": "Este padrão hemodinâmico (DC baixo, RVS alta e PCP/enchendo altas) é típico do choque cardiogênico. No paciente traumatizado hipovolêmico as pressões de enchimento caem.",
            "c": "Associação fisiológica inviável no choque: DC elevado raramente coexiste com RVS gravemente aumentada e PVC alta simultaneamente como causa primária de choque.",
            "d": "Correta. DC baixo devido à falta de pré-carga, RVS alta por vasoconstrição simpática compensatória e PVC baixa pelo baixo volume vascular.",
            "e": "DC baixo sem o mecanismo compensatório de aumento de RVS ocorre no choque neurogênico ou nas fases finais e descompensadas do choque."
        },
        "difficulty": "media",
        "tags": ["Choque Hemorrágico", "Padrão Hemodinâmico", "Trauma"]
    },
    {
        "enunciado": "Durante uma refeição em restaurante, um homem de 35 anos desenvolve subitamente prurido facial intenso, sensação de inchaço na garganta, dispneia sibilante e tontura importante. Ao chegar à emergência, está torporoso, FC 130 bpm e PA 60x30 mmHg. Dentre as medicações abaixo, qual deve ser administrada imediatamente como a principal medida salvadora?",
        "options": {
            "a": "Difidramina 50 mg intravenosa.",
            "b": "Hidrocortisona 250 mg intravenosa.",
            "c": "Salbutamol nebulizado.",
            "d": "Adrenalina 0,3 a 0,5 mg intramuscular na coxa.",
            "e": "Prometazina 25 mg intramuscular."
        },
        "answer": "d",
        "rationale": "O quadro clínico agudo de comprometimento sistêmico grave (hipotensão e comprometimento de via aérea/respiratório) após exposição inadvertida a um antígeno desconhecido caracteriza anafilaxia. A droga de primeira linha, essencial e salvadora na anafilaxia aguda com choque distributivo secundário (choque anafilático), é a adrenalina (epinefrina) intramuscular, tipicamente na face anterolateral da coxa na dose de 0,3 a 0,5 mg no adulto.",
        "option_rationales": {
            "a": "Os anti-histamínicos (difenidramina) auxiliam no controle de sintomas cutâneos secundários, mas não revertem broncoespasmo grave ou choque, não sendo drogas de primeira linha salvadoras.",
            "b": "Os corticosteroides são usados na anafilaxia para prevenir as reações bifásicas ou tardias e não revertem o quadro isquêmico agudo.",
            "c": "O salbutamol é um beta-2 agonista indicado para aliviar broncoespasmo remanescente de crises reativas após tratamento de suporte, mas não atua reversão de colapso cardiovascular.",
            "d": "Correta. Adrenalina atua nos receptores alfa e beta, revertendo rapidamente vasodilatação, edema mucoso, broncoespasmo e estabilizando mastócitos.",
            "e": "Anti-histamínicos não têm papel primordial para reversão primária de choque ou vias aéreas na anafilaxia aguda."
        },
        "difficulty": "media",
        "tags": ["Choque Anafilático", "Epinefrina", "Anafilaxia"]
    },
    {
        "enunciado": "Você é chamado para avaliar um paciente internado na UTI por choque séptico de foco urinário. O paciente está em ventilação mecânica. Os parâmetros atuais mostram PAM 55 mmHg a despeito do uso de Noradrenalina 0,8 mcg/kg/min e reposição volêmica guiada por ultrassom que já totalizou 40 mL/kg nas últimas 6h. A saturação venosa central de O2 (ScvO2) é de 68% e o lactato arterial com clearance adequado. O ecocardiograma na beira do leito mostra função sistólica do ventrículo esquerdo normal (FE: 65%). Diante desse cenário clínico de choque refratário, qual é a atitude mais adequada?",
        "options": {
            "a": "Aumentar excessivamente as doses de Dobutamina.",
            "b": "Realizar reposição hídrica com coloides (albumina) além do cristaloide administrado.",
            "c": "Associar um segundo vasopressor, como a vasopressina em dose fixa.",
            "d": "Iniciar inibidor da fosfodiesterase III (milrinona).",
            "e": "Suspender noradrenalina e optar exclusivamente pelo uso da dopamina em doses cronotrópicas."
        },
        "answer": "c",
        "rationale": "O paciente encontra-se em choque séptico (distributivo), que ainda não atingiu o alvo de perfusão tensional principal (PAM > 65 mmHg) apesar do uso de doses moderadas-altas de noradrenalina. Além disso, a perfusão já mostra que a bomba cardíaca não é o problema primário (FEVE 65% normal). O Surviving Sepsis Campaign recomenda a associação de Vasopressina (geralmente a 0,03 U/min) à Noradrenalina para o alcance da PAM alvo, visando também diminuir as doses do catecolaminérgico primário.",
        "option_rationales": {
            "a": "O paciente não possui indicação primária para dobutamina neste momento, já que a função ventricular e aparentemente o débito periférico associado à ScvO2 estão preservados para sua doença não-bomba. Seu problema é a falência vasomotora.",
            "b": "O objetivo tensional requer tônus periférico (RVS), não necessariamente o volume isoladamente, particularmente sabendo que o paciente já recebeu 40 mL/kg, podendo aumentar o risco de congestão tissular.",
            "c": "Correta. O acréscimo da Vasopressina está indicado no choque reacionário a doses elevadas de Noradrenalina.",
            "d": "Milrinona possui ação marcante de redução do tônus de artérias sistêmicas, sendo inodilatadora, piorando a hipotensão e não tem espaço neste choque refratário hiperdinâmico.",
            "e": "A dopamina não deve ser preferida por ter maior taxa de evento arritmogênico em comparação à noradrenalina, sendo preterida pelas diretrizes do choque séptico."
        },
        "difficulty": "media",
        "tags": ["Choque Séptico", "Vasopressina", "UTI"]
    },
    {
        "enunciado": "Qual dos seguintes parâmetros clínicos, laboratoriais ou monitorizados representa o alvo terapêutico preferencial, segundo as diretrizes mais recentes, para guiar e reavaliar a ressuscitação inicial no choque circulatório tissular refratário?",
        "options": {
            "a": "Níveis de bicarbonato sérico.",
            "b": "Saturação arterial periférica (SpO2).",
            "c": "Clearance do lactato sérico.",
            "d": "Pressão venosa central (PVC) acima de 12 mmHg.",
            "e": "Manutenção isolada do débito urinário."
        },
        "answer": "c",
        "rationale": "O lactato sérico é um marcador estabelecido de disóxia e hipoperfusão tecidual (metabolismo anaeróbico). A eficácia da ressuscitação (como administração de volume e vasopressores) é frequentemente avaliada e guiada pela capacidade de reduzir o lactato sérico previamente elevado, um processo conhecido como 'clearance de lactato'. Diretrizes modernas priorizam a normalização do lactato ou seu decréscimo progressivo como meta.",
        "option_rationales": {
            "a": "O bicarbonato pode se alterar por várias causas além do estado de choque, como insuficiência renal, diarreias ou distúrbios respiratórios intrincados, não sendo isoladamente o alvo ideal da ressuscitação primária.",
            "b": "Saturação de O2 indica as trocas gasosas pulmonares e se é necessário manejo ventilatório, não servindo singularmente como proxy de perfusão celular periférica sistêmica.",
            "c": "Correta. O clearance de lactato documenta objetivamente a reversibilidade da anaerobiose tissular gerada pelo estado de choque.",
            "d": "O uso da pressões venosa central (PVC) isoladas para guiar volume foi preterido em decorrência de estudos mais recentes que mostraram sua fraca correlação preditiva de fluido-responsividade.",
            "e": "A manutenção da diurese (>0,5 mL/kg/h) é sempre avaliada e essencial, mas clinicamente isolada demora para sinalizar e não possui o poder da titulação temporal que a curva do lactato permite."
        },
        "difficulty": "media",
        "tags": ["Marcadores de Perfusão", "Lactato", "Monitorização Hemodinâmica"]
    },
    {
        "enunciado": "Paciente masculino de 22 anos, vítima de ferimento por arma branca em transição toracoabdominal esquerda, apresenta-se com engurgitamento jugular patológico acentuado, bulhas cardíacas abafadas e hipotensão arterial (PA 85 x 60 mmHg) apresentando queda tensional inspiratória de 15 mmHg. Realizada ultrassonografia à beira-leito do abdome e saco pericárdico. Diante desse quadro clínico clássico, a principal causa do choque é categorizada mecanicamente como:",
        "options": {
            "a": "Choque Hipovolêmico, pela possível laceração esplênica.",
            "b": "Choque Vasoplagico, pelo desvio e liberação de citocinas infamatórias localizadas do trauma.",
            "c": "Choque Obstrutivo, secundário possivelmente a um tamponamento cardíaco.",
            "d": "Choque Neurogênico, por possível lesão espinhal associada não visível.",
            "e": "Choque Cardiogênico miocárdico, indicando secção artéria descendente anterior."
        },
        "answer": "c",
        "rationale": "Esses achados — engurgitamento jugular, bulhas abafadas, hipotensão (Tríade de Beck) junto ao pulso paradoxal (queda tensional inspiratória > 10 mmHg) em contexto de trauma toracoabdominal — são clássicos do tamponamento cardíaco. Fisiopatologicamente, o tamponamento constitui um tipo de choque obstrutivo, visto que barra mecanicamente a capacidade de diástole direita (enchimento ventricular) provocando queda aguda no débito cardíaco sem inicialmente apresentar disfunção intrínseca da célula miocárdica e sim uma obstrução extrínseca ao débito.",
        "option_rationales": {
            "a": "O sangramento gera choque compensatório, contudo não explica sozinho o abafamento de bulhas ou a congestão venosa das jugulares de forma pronunciada, presentes sim no tamponamento.",
            "b": "A vasoplegia não faz parte do evento agudo restrito de trauma cortante desta natureza isolada. Seria esperado na sepse ou anafilaxia tardia.",
            "c": "Correta. Tríade de Beck em ferida transfixante aponta para tamponamento, que representa uma limitação extra cardíaca do débito, formatando o Choque Obstrutivo.",
            "d": "O choque neurogênico apresentaria bradicardia, pele quente e não estaria acoplado a engurgitamento jugular por não congestionar cavidades.",
            "e": "Embora pareça problema do coração, o tamponamento por sangramento é limitação diastólica extracardíaca com integridade (inicial) actina-miosina celular. Por isso divide etiologia formalmente como choque obstrutivo."
        },
        "difficulty": "media",
        "tags": ["Trauma", "Choque Obstrutivo", "Tamponamento Cardíaco"]
    },
    {
        "enunciado": "Um paciente vítima de queda de grande altura (8 metros) é atendido no departamento de emergência. À admissão, encontra-se paralisado sob o apêndice xifóide, hipotenso (PA 75x40 mmHg) e, chamando especial atenção, o paciente apresenta bradicardia relativa de 55 bpm associada a flacidez muscular e extremidades estranhamente aquecidas. Não há sinais óbvios de sangramento ativo pelo exame primário. Qual a melhor descrição fisiopatológica para o evento que causa este padrão de choque?",
        "options": {
            "a": "Liberação excessiva da cascata do complemento por esmagamento muscular.",
            "b": "Perda aguda do controle motor encefálico e do tônus intrínseco muscular esquelético.",
            "c": "Interrupção súbita das vias eferentes simpáticas autonômicas.",
            "d": "Resposta vagal reativa desencadeada apenas pela agonia e dor extrema do evento traumático.",
            "e": "Depressão do miocárdio resultante da liberação abrupta de estresse contusão frontal e medular isolada."
        },
        "answer": "c",
        "rationale": "O cenário retrata tipicamente o choque neurogênico decorrente de uma lesão raquimedular alta. Nele, a transecção da medula (na região torácica ou cervical) promove o bloqueio do impulso eferente do sistema nervoso simpático até a periférica (perda de tônus vascular vasomotor e inotropismo/cronotropismo mediado pelo simpático). Devido à ação do parassimpático permanecer intacta (nervo Vago), resulta frequentemente no aparente paradoxo de hipotensão acompanhada da bradicardia grave crônica, com os leitos periféricos relaxados mostrando-se quentes e não com as tipicas palidezes ou vasoconstrições hipovolêmicas compensatórias.",
        "option_rationales": {
            "a": "Apenas um esmagamento muscular com isquemia pode desencadear dano miorenal extenso pós-reperfusão ou SIRS e mais adiante disfunções coagulopáticas tardias, nunca inicialmente geraria bradicardia isolada desta magnitude e paralisias clássicas.",
            "b": "O evento medular paralisa o tônus esquelético, entretanto o real motivador da derrocada circulatória obedece ao desarranjo de inervação seletiva do músculo liso autônomo e não ao músculo da perna puramente.",
            "c": "Correta. O apagão simpático permite a ocorrência da vasoplegia periférica e predominância parassimpática cronotrópica reversa.",
            "d": "Choques por estímulos vasovagais da dor manifestam mal-estar, síncopes leves temporais, entretanto sem o conjunto refratário neurológico permanente exibido simultaneamente ali.",
            "e": "O músculo não passa por depressão inicial tóxica primária se não se contundiu o miocárdio. E uma contusão miocárdica causa compensação taquicárdica com periferia constringida se o simpático estiver válido fisiologicamente."
        },
        "difficulty": "media",
        "tags": ["Choque Neurogênico", "Trauma Raquimedular", "Neurologia no Trauma"]
    },
    {
        "enunciado": "No contexto da ressuscitação agressiva do choque hemorrágico grave provocado pelo trauma, existe hoje as indicações para o Protocolo de Transfusão Maciça. A maioria destas diretrizes internacionais de PTM sugerem que a administração de hemoderivados obedeça idealmente a qual proporção estratégica empírica enquanto não há acesso precoce ao tromboelastograma em casos de instabilidade franca?",
        "options": {
            "a": "1 concentrado de hemácias : 2 plasmas frescos : 0 plaquetas",
            "b": "3 concentrados de hemácias : 1 plasma fresco : 1 unidade de criopreciptado",
            "c": "1 concentrado de hemácias : 1 plasma fresco : 1 aférese de plaquetas (ou equivalente set de plaquetas)",
            "d": "4 concentrados de hemácias : 0 plasma : 2 transfusões plaquetárias intensivas",
            "e": "Infusão exclusiva de dezenas de bolsas de cristaloides quentes antes da primeira doação de hemoderivados totais."
        },
        "answer": "c",
        "rationale": "Como a exsanguinação rápida leva à perda desmedida de eritrócitos, volume plasmático e fatores da coagulação simultaneamente com plaquetas, grandes diretrizes atuais do manejo de traumatizados orientam o uso da paridade proporcional no empírico imediato de resgate 1:1:1 na tentativa de restituir algo próximo ao 'sangue total' de maneira balanceada evitando coagulopatia dilucional e isóxia.",
        "option_rationales": {
            "a": "Dar apenas pouco plasma sem pacote plaquetário ignorará a deficiência na adesão mecânica na tentativa primária hemostática do ferimento cirúrgico.",
            "b": "O uso preferencial e desproporcional de hemácia isolada acarreta diluição pesada dos fatores sanguíneos e de circulação agindo tardiamente no controle do sangramento principal.",
            "c": "Correta. A relação empírica tradicional mais amplamente aceita de controle para minimizar coagulopatia traumática inciente.",
            "d": "Reações de alto número de células rubras perante raras plaquetas induzem mais coagulopatia. A quantidade deve tentar replicar artificialmente 1:1:1.",
            "e": "Infundir apenas imensas cargas de colóides/cristaloides estáveis inicialmente agrava acentuadamente o evento final de trinca de sobrevida do politrauma letal: a hipotermia, acidose com a decorrente e brutal coagulopatia dilucional induzida pelo profissional de saúde."
        },
        "difficulty": "media",
        "tags": ["Choque Hemorrágico", "Transfusão Maciça", "Hemoderivados"]
    },
    {
        "enunciado": "Sobre a monitorização dinâmica da responsividade a fluidos em pacientes chocados em ventilação mecânica invasiva de ambiente rigorosamente controlado, o ensaio ou estratégia que tem demonstrado a melhor acurácia preditiva contra resultados estatísticos não definitivos, superando pressões estáticas isoladas no centro terapêutico baseando-se em variações de complacencia e volume é a verificação da:",
        "options": {
            "a": "Pressão Venosa Central avaliada a cada 6 horas.",
            "b": "Variação de Pressão de Pulso (VPP) do traçado de artéria invasiva acompanhando incursões sincrônicas.",
            "c": "Medida visual volumosa da turgescência jugular durante tosse intensa induzida.",
            "d": "Ausência absoluta de crepitação na base do lobo médio do pulmão por esteto tradicional.",
            "e": "Contagem visual simples da cor primária urinaria durante 4 horas."
        },
        "answer": "b",
        "rationale": "Indicadores estáticos (como PVC e níveis de catecolaminas séricas simples) foram perdendo força preditiva devido a falses posivos dependentes do cor pulmonale. As análises variacionais da dinâmica circulatória como a VPP e a variação de volume sistólico refletidas diretamente da curvatura invasiva e monitorizada continuamente por inserções da artéria em interações cardio-pulmonares se provam de maneira muito mais acurada e resoluta se o volume incrementado gerará na extremidade uma variação responsiva e tolerante.",
        "option_rationales": {
            "a": "Valores estáticos per se como a PVC ou Pressões Pulmonares mostraram-se insuficiências e preditores fracos em dezenas de grandes metanálises perante a perfusão celular central.",
            "b": "Correta. Através da interação cardio-pulmonar restritiva das pressões intratorácicas na máquina, a alteração superior à casa dos 10-13% em VPP documenta se os fluidos serão integrados utilmente no status em franca reserva cardíaca ou se induzirão sobrecarga fútil imediata.",
            "c": "A turgescência induzida pela tosse descarrega volumes esmagueados ou não controlados e se apresenta muito indireto sobre as curvas intrínsecas de débito.",
            "d": "Basear apenas em crepitação de esteto fará com que a checagem da hidratação celular perigosa ocorra apenas após haver francos transudatos intrapleurais ou alveolares.",
            "e": "Sistemas de cor não representam taxa imediata, eles traduzem horas passadas acumuladas filtradas pelas características nefróticas isoladamente temporais de perdas longilíneas."
        },
        "difficulty": "media",
        "tags": ["Responsividade a Volume", "Monitorização Hemodinâmica", "UTI"]
    },
    {
        "enunciado": "Diante de um quadro de sepse provável secundária à pneumonia e detectado hipoperfusão grosseira num ambiente de emergência em primeiro lugar, segundo os feixes do guia internacional Surviving Sepsis Campaign (Bundle de 1 hora), NÃO constitui uma das medidas cruciais necessárias a serem colhidas visando o prognóstico e resolução favorável nesta primeira contagem de cronômetro?",
        "options": {
            "a": "Hemoculturas e cultura adequada antes de antibioticoterapia empírica imediata caso oportuno.",
            "b": "Dosar os níveis urgentes de ácido láctico (Lactato sérico) arterial ou venoso.",
            "c": "Instalar imediatamente sistema de ventilação mecânica e traqueostomia invasiva de primeira hora de forma protocolar mesmo para pacientes saturação segura via ambiente.",
            "d": "Infundir ressuscitação rápida no uso de 30 mL/kg para combater pressões médias abaladas de hipotensão em cristaloide isotônico endovenoso.",
            "e": "Início das doses com antibióticos potentes de amplo espectro com menor atraso crônico."
        },
        "answer": "c",
        "rationale": "O famoso 'Bundle de 1 hora' da campanha de sobrevivência a sepse determina medidas capitais contra o tempo: coletas velozes do lactato, garantia das hemoculturas (antes do antibiótico iniciar preferencialmente se rápido controle), largar forte dose empírica da medicação infecciosa, e iniciar cargas de ressucitação rápida de cristaloides 30m/kg associando por fim a vasoativamente no choque. Procedimentos restritamente respiratórios avançados e de via definitiva irreversível per si (traqueostomia/intubação) não integram essa listinha 'obrigatória' base a todos, mas obedecem estritamente à dinâmica clínica respiratória paralela exigida ou não pelo órgão acometido limitante unicamente.",
        "option_rationales": {
            "a": "Este item compõe perfeitamente a chave do bundle, e devem ser obtidas culturas rigorosamente precoces e orientadas, a fim de estreitar terapêuticos adiante em 48/h.",
            "b": "O lactato determina severidade oculta celular, seu rastreamento dita o fluxo da reanimação de fluidos se há disoxía progressiva base inicial do bundle.",
            "c": "Correta - Falsa no questionamento. A intubação profilática em 1 hora como protocolo compulsório em todas as sepse não constitui pilar na literatura e não figura entre as premissas dos 5 passos do pacote inicial geral.",
            "d": "As bases da ressuscitação volêmica da fase inicial demandam a resposta base de fluidos nas quantidades mencionadas sem coloides imediatas descritas.",
            "e": "Garantir a bomba do ataque antibiótico dentro do espaço cronometrado se mostrou em dezenas de dados práticos a chance real de minimizar sobrevidas falhas da sepse sistêmica."
        },
        "difficulty": "media",
        "tags": ["Surviving Sepsis Campaign", "Sepse", "Manejo Inicial"]
    },
    {
        "enunciado": "Numa criança de 18 meses subitamente apresentada sem resposta neurológica central tátil no atendimento e rebaixada grave, o pulso periférico não é palpável, havendo grande taquidispneia rítmica. Diagnóstica-se Choque em ambiente sem rede venosa profunda viável aparente após 90 cruciais segundos visuais perigosos em 2 tentativas. A via que deve ser considerada imperativamente na manobra salva-vidas emergencial nesta pediátrica pela ACLS/PALS em primeira mão diante da recusa dos acessos primários para droga ou volume seria:",
        "options": {
            "a": "Tentativa prolongada, profunda e isolada unicamente venosa do sistema jugular sob palpação cruzada complexa em centro não-cirúrgico.",
            "b": "Dissecção venosa clássica imediata profunda unicamente do tronco basílico lateral cubital.",
            "c": "Estabelecimento imediato da Via Intraóssea.",
            "d": "Subministro por infusão intratecal de base de medicações para tentar ressuprir encéfalo indiretamente.",
            "e": "Injeção e liberação de volume através de sondagens e infusor intra-pleural massivo a depender dos lados orgânicos."
        },
        "answer": "c",
        "rationale": "A emergência descompensada letal aguda perante do pediatrico demanda resgate e uso da fisiologia volêmica em poucos segundos. Com as redes imaturas colapsadas perifericamente pela hipotensão e instantes cruciais, as manobras e algoritmos internacionais consolidados ditam imperativamente passar, diante de sucessões curtas de falhas normais à preferência do uso irrestrito tático primário a agulha de perfuração intraóssea.",
        "option_rationales": {
            "a": "Em ambiente tenso, de recém instabilidade central sob pescoço tenso em colapso profundo circulatório da pediatria buscar cegamente sem guiamento é contraindicado na janela crítica salvadora vital e gerará falhas de risco enormes de perfurar e dissecções da tireoide lateral etc.",
            "b": "Trata-se de procedimento operatório cirúrgico engessado com dispêndio massivo temporal na situação exigindo incisões finas que demoram consideravelmente em contraposição.",
            "c": "Correta. Via segura, que não entra em colapso venoso em caso de choque (por ter o osso do pleto) não se fecham pela contração muscular central compensatória severa admitindo medicações vitais.",
            "d": "As doses diretas encéfalicas através de líquors intratecais invadindo membranas do duto primário raquidiano não tem sustentação de reversão cardiovascular.",
            "e": "O espaço pleural requer integridade torácica da criança e gerar volumes aquosos causará limitação mecânica grave do tipo tamponamento obstrutivo massivo reverso sem a ressurreição arterial requerida original."
        },
        "difficulty": "media",
        "tags": ["Acesso Intraósseo", "Choque Pediátrico", "PALS"]
    },
    {
        "enunciado": "Em paciente transferida de enfermaria instabilizada subitamente pós-procedimento cirúrgico prolongado restrito à cama em leito inativo, manifesta dispneia de inicio maciço com dessaturas e dor pleurítica. O Ecocardiograma registra cor pulmonale agudo dilatação das cavidades direitass da veia do septo intraventricular base e sinais francos do aumento e refracao isquêmica dos VD por sobrecarga primária. Em meio ao Choque diagnosticado evidente da complicação subjacente com hipotensão sustentada por um TEP massivo macrológico comprovado na triagem de artérias profundas, qual atitude terapêutica específica além de manobras suplementares O2 e ressuscitação suportiva circulatória clássica passa a possuir real força resoluta inicial das diretrizes restritas nesta emergência?",
        "options": {
            "a": "Adoção restrita imperativa a heparina fracionada subcutânea diária profilática unicamente de longa duração domiciliar.",
            "b": "Manejo e desobstrução química primária da falência obstrutiva através dos trombolíticos sistêmicos (ex. Alteplase).",
            "c": "Manobra mecânica forçada puramente das bases ventilatórias mecânicas contínuas PEEP elevados com restrição total as medicações perigosas em refratariedade crônica irreversível.",
            "d": "Dosagem massiva contínua ininterrupta por bolus únicos mensais restritos corticoides supressores unicamente inalatórios de longo prazo a toda carga brônquica.",
            "e": "Infusão sistêmica exclusiva da lidocaína intratecal periférica tentando amenizar apenas bloqueios neuronais reacionários a coágulos locais espinodal orgânica puramente paliativa."
        },
        "answer": "b",
        "rationale": "O diagnóstico explícito descrito no enunciado envolve um paciente com evento gravíssimo tromboembólico pulmonar gerando restrição obstrutiva arterial crônica no ramo que por fim cursa de modo central em estado de disoxia secundária aguda extrema com hipotensão grave (Choque Obstrutivo pelo TEP Maciço). Nesse quadro isolado fulminante, diferentemente das embolias passivas estabilizadas que tratam com heparinizações anticoagulantes terapêuticas isoladas, a repercussão com desbalanço tensional imediato (hipotensão choque refratário presente) impera a indicação mandrosa clínica na quebra acelerada de via desse êmbolo causador fulminante (a Trombolise imediata química sistemica intravenosa).",
        "option_rationales": {
            "a": "Tratamentos profiláticos básicos isolados e com tempos dilatados seriam indicados antes para prevenir riscos mas jamais desobstruirão agudamente o colapso arterial maciço causador central do choque iminente ali presente em horas minutas para salvaguardamentos miocárdicos agudos falhos e irreversíveis posteriores ali detectados precocemente base.",
            "b": "Correta. Nos episódios instáveis com instabilidades persistentes graves atestadas em hipotensão e choque pela obstrução principal perante TEP maciço, o desfazer e trombolisar via sistêmica medicamentosa com fibrinolítico direto resgata precocemente leitos e inibe progressão imediata irreversível celular global da morte iminente obstrutiva mecânica aguda do lado direito coração por fim resolutivo ali exposto pontual.",
            "c": "O aporte isolado do PEEP altíssimo não só falhará mas exacerbará por mecanismo restritivo do ar hiperinsuflador em volta no baú restritivo ainda mais a carga precaríssima impedindo fluxo e retorno sanguíneos aéreos venosos de reentrada ali que estão colapsados sem resolutividade original causativa ali de origem em artéria grossa local e sem via direta resolutória base química causal original que necessita per urgência aguda obstrutiva exposta na triagem de salvamento imediata exposta por fibrinolítica causal original do leito maciço primário base.",
            "d": "Bases de esteroidizações não atuam em dissolver grandes pedaços de entupimentos primários isquêmicos da via direita da ramificação central pulmonar gerando colapso orgânico falho local e obstrutivo de bomba primária originário sem resposta aguda imediata.",
            "e": "Sistemas de lidocaína limitam arritmias curtas limitadas em tecido puramente excitado crônico passível de estimulo sem desdobramento obstrutivo ou de ação coagulatória para destamponamento de TEP restrito físico puro sem efeito direto mecânico da base primária resolutória base original de choque obstrutivo fulminante agudo perante trombos físicos diretos primários."
        },
        "difficulty": "media",
        "tags": ["Choque Obstrutivo", "TEP Maciço", "Trombólise"]
    },
    {
        "enunciado": "Quando um paciente séptico evolui na enfermaria para o ambiente de UTI instável em fase compensatória do famoso choque circulatório, as respostas hemodinâmicas fisiológicas que agem na manutenção e compensação natural a este insulto gerado inicialmente pelas toxinas promovem que tipo de perfusão nos leitos basais iniciais microcirculatórios teciduais dos órgãos mais passivos esplâncnicos e de pele base da resistência sistêmica corpórea periférica?",
        "options": {
            "a": "Redistribuição total com acionamentos esplâncnicos contínuos maximizados de fluxos e palidez das musculaturas craníanas restritas centrais sem envolvimentos capilares em derme puras locais das bordas passivas periféricas desabastecidas sem controle base neural reverso reorientado local dos fluxos sistêmico puramente centrais expostos isolados.",
            "b": "Reversão das bombas crônicas com paralisação das trocas na célula limitantes por defesas puramente imunológicas isentas de componentes do sistema arterial simpático regulatórios sem vasoplegia local aguda imediata puramente crônica perante citocinas restritas locais teciduais expostas nos sistemas isoladas restritas passivamente falhas.",
            "c": "O insulto inflamatório da sepse induz inicialmente vasodilatação de resistência arterial sistêmica acentuadamente generalizada periférica. Contudo de mecanismos protetores simpáticos tentam perfundir coração central cérebro sacrificando o tônus basal mesentéricos estomacais hepáticas isquêmicas renais em fases subsequentes não visíveis base teciduais de hipoperfusoes disóxicas.",
            "d": "A fase quente acarreta contrações micro arteriais precoces sistêmicas imediatas em toda derme base local gerando extremidades congeladas unicamente isoladas puramente no estágio das endotoxinas primárias iniciais da cascata local não gerando nenhum estado de vasoplegia pura crônica central sistêmica exposta e diagnosticamente evidente refratária de base inicial de compensações periféricas capilares puras diretas reversas e sistêmica puras nas pontas de pele.",
            "e": "O aumento irrestrito absoluto massivo das correntes pressóricas capilares unicamente periféricas inibem e colabam diretamente com sobrecarga irreversivelmente o encéfalo por reorientamento sanguíneo superior totalitário contínuo restrito puro nas trocas inflamatórias base limitantes na área esplâncnica sem fluxos disóxicos reversos compensatórias intestinais primárias focais normais ocultos na hipoperfusão silenciosa micro base esplânc. primárias sem vasodilatações basais."
        },
        "answer": "c",
        "rationale": "Base fisiopatológica clássica principal puramente do contexto do insulto séptico primário inicial distributivo. Ao contato infe infectious base severo inflamatório orgânica aguda (sepse grave inicial originárias do estagio distributivo do evento da disfunção generalizada choque) há a ocorrência vasoplégica clássica macroscópica em tecidos base. Como compensação central reorientadora secundária reacional natural basilar da bomba as microvasculaturas base sistêmicas puras focais profundas periféricas focadas em território base dos sistema mesentérico intestinais orgânicas vitais renais esplanquinas e passivas são submetidas a isquemias silenciosas profundas com a finalização protetora e redirecionamento de restrições de sangues primários à manter viabilidade base circulatória base central protetora dos leitos coração cérebro originárias dos feixes simpático perante do trauma originário base microcirculatório da base patogênica local original.",
        "option_rationales": {
            "a": "Falo conceitual original: o esplâncnico não farta volume central e não se perfunde com primazias totais nestes embates isquêmicos macro ou vasoplegico orgânicos em sacrifício de bordamentos centrais reversos sem bases na microcirculação de fase reativa protetora autômata periférica compensatórias originárias restritas de reajuste inicial orgânica do insulto inicial.",
            "b": "Sistemas de estagios reativos simpáticos nervosos atuam de frontes primárias no gatilho imunológicos expostos de disfunção sem omissões limitantes ou isenção puras autônomas nas fases restritas centrais obstrutivas periféricas e imunes perante do embate fisiopatológico limitante base do fluxo disóxico geral restrito passivo isento imune base puramente na via inicial pura das vias centrais orgânicas crônicas no controle de fluxo restrito.",
            "c": "Correta. Traduz nitidamente como as fases de resistências dos calibres base orgânicos são de origens redistributivas imunes (fase vasodilatadora crônica exposta inicial base dos agentes choque quente) entretanto mascarando a centralização silenciosa base periférica de leitos restritos vitotais bases de órgãos passivos viscerais em estresse disóxico perigoso micro restritas nas reações do reajuste perigoso sem resolução.",
            "d": "Extremidades reativas totalmente pálidas geladas não englobam os gatilhos originais distributivos típicos primários que induzem à fase famosa vasoplégicas rubor de choque quente na etiologia puramente distributiva inflamatória endotóxicas perante a desatenção crônica inicial no exame macro físico local compensatório base restrito de início vascular inflamatório.",
            "e": "Fase descritiva totalmente controversa com base nas defesas sistêmicas cerebrais que não perdem suas trocas com reorientações sistêmicas inibitórias limitadoras crônicas para fluxos descontinuo intestinais micro refratárias das proteções básicas na descoordenação vasoplégica celular sistêmica perante choque exposto inicial de redirecionamento orgânica pura do controle protetor celular e arterial macro sistêmicos orgânicos restritas crônicas focais desorganizadas base microcirculatórias sistêmicos do trauma disóxico orgânico local central periféricos."
        },
        "difficulty": "media",
        "tags": ["Choque Séptico", "Microcirculação", "Fisiopatologia"]
    },
    {
        "enunciado": "O principal substrato base funcional orgânico que dita a incapacidade reversível crônica imediata refratária original para um desentupimento restrito puramente funcional na mecânica final sistêmica dos tratamentos perante vasoplegicos em leitos estritamente celulares passivos e restritos disóxicos a longa data tardias sem mananciais adequados iniciais nas síndromes originárias extremas e de falência sistêmica global celular base da sepse (Choque Séptico Tardio/MODS sistêmico progressivo) refere-se diretamente falha em qual orgânica base microscópica estrutural restritamente perigosa na não reversão energética primária dos tecidos disóxicos isêmicos refluídos secundários puros orgânico periférico sistêmico global?",
        "options": {
            "a": "Perfuramento exclusivo e paralisação maciça dos vacúolos basais contidos do aparelho mitocondrial puro sem substrato restrito na captação reversão final orgânico sistêmico nas disóxia celular originária restrita local profunda (Disfunção/Estresse orgânica mitocondrial secundário grave restrito final local sistêmico micro reverso passivo sistêmico final no fluxo perigoso e falha do metabolismo final oxigênio secundário na falência global da respiração celular básica extrema perante sepse crônica na ponta capilar restrita).",
            "b": "Mecanismos de quebras do retículo rugoso sem ligações químicas macro na lises puras basais macro citoplasmáticas dos líquidos orgânicos imunes celulares bases sem bases e descolamentos puros da cadeia dos núcleo DNA reativos.",
            "c": "Quebras da parede externa óssea medulares das placas das hemocartilagens isentas perante medulas crônicas primária gerando infecções mecânicas isquêmicas ósseas restritas puras em todos leitos reativos limitantes bases orgânicos globais puros teciduais sem origens diretas no oxigênio da ponta citoplasmáticas no trauma macro isquêmicas base reversíveis primárias puras reativas limitadoras.",
            "d": "Asfixia das pontes aéreas dos micro fios colagenosos contidos fora da derme não possuindo correlações e sem envolvimentos dos reatores intracelulares aeróbios sistêmicos básicos ou falhas bioquímicas no ATP ou deficiência disóxicas puros passivos energéticos macro orgânicas no curso final do fluxo passivo da perfusão restrita e tardio base limitante.",
            "e": "Deficiência aguda obstrutiva isquêmica exclusiva base isoladamente pura em veias gástricas superiores não atestando relações em todos as disfunções ou falências em orgânicas secundarias sistêmicas remotas de falências microscópicas basais periférica generalizadas pura citoplasmáticas do metabolismo sistémico reversível passivo orgânico restrito."
        },
        "answer": "a",
        "rationale": "Em contextos tardios perigosos da evolução final não remediada crônica originária de disóxias ou síndromes micro inflamatórias sistêmicas como a sepse fulminante extensa, atinge-se limiares onde mesmo que o volume reapareça no leito periférico celular, a injúria final macro perigosa originaria nos órgãos base gerou uma estátua conhecida da apoptose celular e disfunção da cadeia mitocondrial primária de ponta orgânica intracelulares de forma gravíssima e sem retorno. Isso significa puramente base de incapacidades na respiração reatora oxigênio e de gerenciar ou absorver a demanda final básica no metabolismo com a parada geradora da vida celular no ATP macro reativo base com toxinas estagnadas gerando a morte e a falência de multifunção orgânicas reversa fatal.",
        "option_rationales": {
            "a": "Correta. Ao descrever a barreira ou disfunção final de respiro mitocondrial exposto em falência na não absolvição das correntes do retorno celular puramente secundária originária da desativação orgânica e do estresse na não fabricação do metabolismo aéro terminal das estruturas passivas puramente microcapilares disóxicas.",
            "b": "Não relator primário mecânica e isquêmicas bases e não aborda restritas origens do evento disóxico puramente final reativos que encerra falhas energéticas básicas intracelulares em macro órgãos do fluxo terminal como se traduz e atesta as refratárias limitantes do estresse mitocondrial orgânicos passivos.",
            "c": "Isenções ou atuações puros ósseos ou perante de lesão cartoligenosas locais medulares isoladas não definem todo e o aglomerante estado celular e multiorgânico do metabolismo global sem falências citoplasmáticas vitais disóximos bases orgânicos nos estágios obstrutivo finais passivas nas microvasculaturas base sistêmicas dos órgãos do choque macro tecidual periférica limitante originais.",
            "d": "Isentos de fundamentação base. A falência se passa essencialmente pela falta primária reatora de respiração disfunço mitocondrial e não se isenta de ATP originária disóxica de forma orgânica macro nas bordas puros colagenosas ou da pele base reversas não micro reativas citoplasmáticas em bases limitantes terminais das vias originais.",
            "e": "Focalizar isquêmicas puros gástricos é restritiva e de origens obstrutivos puros da veia limitante base sem estressar todas as cadeias sistêmicas e as multfalências que geram falhas básicas generalizado reversíveis sistêmicos orgânicas não suportativas das origens do choque final global perante falhas celulares das células passivas de forma primária restrita periférica imune macro microcitoplasmáticos na sepse terminal orgânica reativa."
        },
        "difficulty": "media",
        "tags": ["Fisiopatologia do Choque", "Disfunção Mitocondrial", "Microcirculação"]
    }
];

function StringUtilComputeHash(text) {
    const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim()
    let hash = 0
    for (let i = 0; i < normalized.length; i++) {
        const char = normalized.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return Math.abs(hash).toString(36)
}

function normalizeQuestion(q) {
    return q;
}

async function authAndRun() {
    const email = 'kayquegusmao@gmail.com';
    const password = process.env.ADMIN_PASSWORD;

    if (!password) {
        console.error('Missing ADMIN_PASSWORD in .env.local');
        process.exit(1);
    }

    console.log('Autenticando...');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.log('Falha na auth. Verifique a senha no .env.local (ADMIN_PASSWORD). Logando o erro:');
        console.error(error.message);
        process.exit(1);
    }

    console.log('Inserting questions...');
    let duplicates = 0;
    let inserted = 0;

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const hash = StringUtilComputeHash(q.enunciado);

        const { data: existingPkg } = await supabase
            .from('package_questions')
            .select('id')
            .eq('package_id', PACKAGE_ID)
            .eq('hash_logico', hash)
            .single();

        if (existingPkg) {
            duplicates++;
            continue;
        }

        const { error: insError } = await supabase
            .from('package_questions')
            .insert({
                package_id: PACKAGE_ID,
                question_json: normalizeQuestion(q),
                hash_logico: hash,
                order_index: i,
                status: 'draft',
            });

        if (insError) {
            console.error("Error inserting:", insError.message);
        } else {
            inserted++;
        }
    }

    console.log(`Finished. Inserted: ${inserted}, Duplicates ignored: ${duplicates}`);
}

authAndRun().then(() => process.exit(0)).catch((err) => {
    console.error(err);
    process.exit(1);
});
