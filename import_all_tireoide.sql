DO $$
DECLARE
    p_id UUID := 'F90B96F6-66B4-47E6-A80F-E0CC70C17F71';
BEGIN
    -- Q1
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ptab0x', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Uma mulher de 34 anos apresenta-se ao consultório com queixas de fadiga, constipação severa, pele seca e irregularidade menstrual (polimenorreia) nos últimos 6 meses. Ela relata também discreto aumento de peso (4 kg) no período, apesar de manter o apetite habitual. Ao exame físico: bradicardia (FC: 52 bpm), reflexos tendinosos profundos lentificados (fase de relaxamento prolongada) e edema periorbitário leve. Não há bócio palpável. Exames laboratoriais revelam: TSH = 18 mUI/L (VR: 0,4 a 4,5) e T4 Livre = 0,6 ng/dL (VR: 0,8 a 1,8). Qual o diagnóstico mais provável e a conduta inicial correta?', '[{"id":"a","text":"Hipotireoidismo primário clínico; iniciar Levotiroxina (1,6 mcg/kg/dia) com estômago vazio."},{"id":"b","text":"Hipotireoidismo subclínico; apenas observar e repetir exames em 3 meses."},{"id":"c","text":"Hipotireoidismo central (secundário); solicitar Ressonância de Sela Túrcica."},{"id":"d","text":"Síndrome do Eutireoideo Doente; não há necessidade de reposição hormonal."},{"id":"e","text":"Hipotireoidismo primário clínico; iniciar Liotironina (T3) isolada."}]', 'a', 
        'A paciente apresenta sinais e sintomas clássicos de hipotireoidismo clínico (TSH elevado e T4L baixo). A conduta padrão é a reposição com Levotiroxina (T4 sintético) em jejum. A dose de 1,6 mcg/kg/dia é a preconizada para adultos jovens e hígidos. O hipotireoidismo subclínico seria definido se o T4L estivesse normal (o que não é o caso).', '{"a":"Correta. Diagnóstico e conduta baseados no consenso brasileiro e internacional.","b":"Incorreta. O T4L baixo exclui a forma subclínica.","c":"Incorreta. No hipotireoidismo central, o TSH estaria baixo ou inadequadamente normal, nunca elevado desta forma.","d":"Incorreta. A síndrome do eutireoideo doente ocorre em pacientes críticos internados e cursa com T3 baixo, mas T4L e TSH usualmente normais no início.","e":"Incorreta. A reposição de escolha é sempre com T4 (Levotiroxina) devido à sua meia-vida longa e conversão periférica fisiológica em T3."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ptab0x', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Hipotireoidismo","Diagnóstico","Dose","Semiologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-ptab0x', 'approved', 0)
    ON CONFLICT DO NOTHING;

    -- Q2
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8dls7v', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Um homem de 52 anos, com história de cardiopatia isquêmica (infarto prévio há 2 anos), apresenta TSH = 12 mUI/L e T4 Livre = 0,7 ng/dL. O paciente queixa-se de cansaço extremo. Sobre a introdução de Levotiroxina neste paciente com comorbidade cardíaca, qual a orientação correta?', '[{"id":"a","text":"Iniciar com dose plena (1,6 mcg/kg/dia) para resolver os sintomas rapidamente."},{"id":"b","text":"Iniciar com dose baixa (12,5 a 25 mcg/dia) e aumentar lentamente a cada 4-8 semanas (estratégia ''start low, go slow'')."},{"id":"c","text":"Contraindicar a levotiroxina pois o hormônio causa arritmias fatais em cardiopatas."},{"id":"d","text":"Iniciar reposição apenas se o TSH for maior que 20 mUI/L."},{"id":"e","text":"Substituir a levotiroxina por Propranolol para proteger o coração."}]', 'b', 
        'Em pacientes idosos ou com dança arterial coronariana conhecida, a reposição hormonal brusca pode aumentar o consumo de oxigênio pelo miocárdio e o débito cardíaco, podendo desencadear angina, arritmias ou novo infarto. Por isso, a regra de ouro é começar com doses muito baixas e progredir conforme a tolerância clínica e laboratorial.', '{"a":"Incorreta. Risco cardíaco injustificável e perigoso.","b":"Correta. Medida de segurança fundamental na endocrinogeriatria e cardiologia.","c":"Incorreta. O hipotireoidismo não tratado também traz sérios riscos cardíacos (dislipidemia, disfunção diastólica, bradicardia).","d":"Incorreta. O paciente já tem hipotireoidismo clínico (T4L baixo) e deve ser tratado.","e":"Incorreta. Propranolol é usado no hipertireoidismo, não no hipotireoidismo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8dls7v', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Hipotireoidismo","Segurança","Cardiologia","Endocrinologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-8dls7v', 'approved', 1)
    ON CONFLICT DO NOTHING;

    -- Q3
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-61cqa0', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Uma gestante de 8 semanas de idade gestacional apresenta, no seu primeiro exame de pré-natal, TSH = 3,8 mUI/L. Ela não possui diagnóstico prévio de doença tireoidiana. De acordo com os consensos brasileiros de tireoide na gestação, qual a conduta diante deste valor?', '[{"id":"a","text":"O valor está normal para a gestação, não exige nenhuma medida."},{"id":"b","text":"Solicitar obrigatoriamente a dosagem de Anticorpo Antiperoxidase (Anti-TPO); se positivo, iniciar Levotiroxina."},{"id":"c","text":"Iniciar Levotiroxina (100 mcg/dia) para todas as gestantes com TSH > 2,5."},{"id":"d","text":"Solicitar interrupção da gravidez por risco de bócio fetal."},{"id":"e","text":"Aguardar o segundo trimestre para repetir o exame, pois o TSH só tem valor após a 20ª semana."}]', 'b', 
        'Os valores de referência para TSH na gestação são mais baixos devido à ação do HCG (que estimula o receptor de TSH). Um TSH entre 2,5 e o limite superior do método (geralmente 4,0) em gestantes exige a dosagem do Anti-TPO. Se a gestante tiver autoimunidade positiva, o risco de progressão para hipotireoidismo durante a gestação e de complicações obstétricas (aborto, pré-eclâmpsia) aumenta, justificando o tratamento precoce se TSH > 2,5. Se o Anti-TPO for negativo, apenas monitora-se.', '{"a":"Incorreta. Na gestação, o limite de 4,0 já é considerado suspeito para hipotireoidismo subclínico em muitos contextos.","b":"Correta. Reflete o manejo estratificado de risco pelo anticorpo.","c":"Incorreta. Nem toda gestante com TSH > 2,5 precisa de tratamento; a dose de 100 mcg é excessiva para início de quem tem hipotireoidismo subclínico.","d":"Incorreta. Absurdo obstétrico.","e":"Incorreta. O primeiro trimestre é o período crucial para o desenvolvimento neurológico fetal dependente de hormônios maternos."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '61cqa0', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Gestação","TSH","Anti-TPO","Endocrinologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-61cqa0', 'approved', 2)
    ON CONFLICT DO NOTHING;

    -- Q4
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-j4gwhc', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'A Tireoidite de Hashimoto é a causa mais comum de hipotireoidismo em áreas iodo-suficientes. Qual o achado histopatológico e o anticorpo marcador desta patologia respecitvamente?', '[{"id":"a","text":"Infiltrado linfocítico com centros germinativos e células de Hürthle (oxicílicas); Anti-TPO."},{"id":"b","text":"Infiltrado neutrofílico agudo e necrose de liquefação; Anti-TRAB."},{"id":"c","text":"Fibrose pétrea que invade tecidos adjacentes; Anti-TPO."},{"id":"d","text":"Granulomas epitelioides com células gigantes de Langhans; Anti-TG."},{"id":"e","text":"Hiperplasia folicular com bordas festonadas; Anticorpo Anti-TSH."}]', 'a', 
        'A Tireoidite de Hashimoto é uma doença autoimune mediada por células T. Na patologia, observamos a destruição do parênquima folicular e sua substituição por um infiltrado inflamatório linfocítico denso, podendo formar folículos linfoides (centros germinativos). As células foliculares remanescentes tornam-se metaplásicas (Células de Hürthle ou oxicílicas). O Anti-TPO (Antiperoxidase) é positivo em > 90% dos casos.', '{"a":"Correta. Definição patognomônica da doença.","b":"Incorreta. Sugere processo infeccioso agudo (abscesso), não crônico autoimune.","c":"Incorreta. Isto descreve a Tireoidite de Riedel.","d":"Incorreta. Granulomas sugerem TB, sarcoidose ou Tireoidite de De Quervain em fase específica (mas sem Caseum).","e":"Incorreta. Descrição clássica da Doença de Graves."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'j4gwhc', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Hashimoto","Histopatologia","Anticorpos","Autoimunidade"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-j4gwhc', 'approved', 3)
    ON CONFLICT DO NOTHING;

    -- Q5
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-alqpw1', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Um paciente de 28 anos, ansioso, apresenta palpitações, insônia, tremores de extremidades e perda de massa muscular proximal (miopatia). Refere sensação de calor constante. Ao exame físico: bócio difuso e indolor com presença de sopro sistólico na glândula tireoide. Nota-se proptose ocular (exoftalmia) e retração palpebral. Laboratório: TSH < 0,01 mUI/L e T4 Livre = 4,2 ng/dL. Qual o diagnóstico e o anticorpo envolvido?', '[{"id":"a","text":"Doença de Graves; Anticorpo estimulador do receptor de TSH (TRAB)."},{"id":"b","text":"Bócio Multinodular Tóxico; Anticorpo Anti-Tireoglobulina."},{"id":"c","text":"Adenoma Tóxico (Doença de Plummer); Anticorpo Anti-TPO."},{"id":"d","text":"Tireoidite Subaguda de De Quervain; Anti-TRAB."},{"id":"e","text":"Hipertireoidismo factício; TRAB negativo."}]', 'a', 
        'O quadro de bócio difuso (''sopro na tireoide'') associado a sinais oculares específicos (oftalmopatia) e hipertireoidismo clínico severo define a Doença de Graves. A etiologia é a produção de anticorpos (TRAB) que mimetizam a ação do TSH, estimulando continuamente a glândula.', '{"a":"Correta. Tríade de Graves e fisiopatologia molecular.","b":"Incorreta. O bócio multinodular não apresenta exoftalmia típica nem sopro difuso na glândula.","c":"Incorreta. A Doença de Plummer é um nódulo único autônomo (quente no cintilograma) e não possui etiologia autoimune.","d":"Incorreta. A tireoidite de De Quervain é extremamente DOLOROSA na palpação cervical.","e":"Incorreta. O hipertireoidismo factício (pela ingestão de hormônio) cursa com glândula atrófica (sem bócio)."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'alqpw1', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Hipertireoidismo","Graves","TRAB","Oftalmopatia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-alqpw1', 'approved', 4)
    ON CONFLICT DO NOTHING;

    -- Q6
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w9cozi', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Uma paciente de 35 anos apresenta quadro clínico de dor cervical súbita e intensa, que irradia para a mandíbula e orelhas. Relata ter tido uma infecção respiratória alta (resfriado) há 2 semanas. Ao exame: tireoide aumentada de volume, de consistência elástica e extremamente dolorosa à palpação. Laboratório: TSH suprimido, T4L elevado e Velocidade de Hemossedimentação (VHS) = 90 mm/1ªh (VR: < 20). Qual o diagnóstico e o tratamento de escolha para a fase aguda?', '[{"id":"a","text":"Tireoidite Subaguda (De Quervain); tratamento com Anti-inflamatórios não hormonais (AINH) ou Corticoides."},{"id":"b","text":"Tireoidite Infecciosa Aguda (Supurativa); tratamento com Antibioticoterapia endovenosa."},{"id":"c","text":"Tireoidite de Hashimoto (fase Hashitoxicose); tratamento com Metimazol."},{"id":"d","text":"Hemorragia intranodular; tratamento cirúrgico de urgência."},{"id":"e","text":"Carcinoma Anaplásico de Tireoide; tratamento paliativo."}]', 'a', 
        'A apresentação de dor cervical súbita e intensa após um quadro viral, associada a tireotoxicose clínica e laboratorial (TSH baixo, T4L alto) e VHS extremamente elevado, é patognomônica da Tireoidite Subaguda de De Quervain (ou granulomatosa). O tratamento visa o controle da dor e da inflamação, sendo os AINHs a primeira escolha; em casos graves ou refratários, os corticoides são indicados.', '{"a":"Correta. Diagnóstico clássico pós-viral com dor e VHS alto.","b":"Incorreta. A tireoidite supurativa cursa com sinais flogísticos locais intensos e desvio à esquerda no hemograma.","c":"Incorreta. Hashitoxicose não costuma ser dolorosa e o VHS é normal.","d":"Incorreta. A hemorragia causa dor súbita mas raramente hipertireoidismo e VHS tão alto.","e":"Incorreta. O carcinoma anaplásico causa dor e crescimento rápido em idosos, mas o VHS e a relação pós-viral são típicos de De Quervain."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w9cozi', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Tireoidite","De Quervain","Dor Cervical","VHS"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-w9cozi', 'approved', 5)
    ON CONFLICT DO NOTHING;

    -- Q7
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-jd1htl', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'A crise tireotóxica (tempestade tireoidiana) é uma emergência médica. De acordo com o escore de Burch-Wartofsky, qual dos sinais abaixo NÃO é um critério clássico para o diagnóstico de tempestade tireoidiana?', '[{"id":"a","text":"Febre acima de 38,5°C."},{"id":"b","text":"Taquicardia proporcional à febre (FC < 90 bpm)."},{"id":"c","text":"Alterações no sistema nervoso central (agitação, confusão, coma)."},{"id":"d","text":"Sintomas gastrointestinais (vômitos, diarreia, icterícia)."},{"id":"e","text":"Insuficiência cardíaca congestiva."}]', 'b', 
        'A tempestade tireoidiana cursa com taquicardia DESPROPORCIONAL à febre, geralmente com FC > 140 bpm. O escore de Burch-Wartofsky pontua temperatura, efeitos neurológicos centrais, disfunção cardiovascular (taquicardia, fibrilação atrial, ICC) e disfunção gastro-hepática. Uma frequência cardíaca baixa (90 bpm) pontua zero no escore e desfavorece o diagnóstico de crise tireotóxica.', '{"a":"Incorreta. A hipertermia é o marco da crise.","b":"Correta. O erro está na frequência cardíaca descrita como baixa.","c":"Incorreta. Disfunção do SNC é critério viga mestra do escore.","d":"Incorreta. Disfunção gastrointestinal pontua no escore.","e":"Incorreta. ICC é uma das manifestações clínicas terminais ou graves da tempestade."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'jd1htl', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Emergência","Crise Tireotóxica","Burch-Wartofsky","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-jd1htl', 'approved', 6)
    ON CONFLICT DO NOTHING;

    -- Q8
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9pncu1', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'No tratamento do hipertireoidismo, o Metimazol (MMI) é preferencial ao Propiltiouracil (PTU), EXCETO em situações específicas. Em qual das situações abaixo o Propiltiouracil (PTU) deve ser preferido como droga de primeira escolha?', '[{"id":"a","text":"Primeiro trimestre da gestação e Crise Tireotóxica."},{"id":"b","text":"Hipotireoidismo severo."},{"id":"c","text":"Idosos com arritmia cardíaca."},{"id":"d","text":"Adolescentes com bócio discreto."},{"id":"e","text":"Pacientes com insuficiência renal crônica."}]', 'a', 
        'O PTU é preferível no 1º trimestre da gestação porque o Metimazol (MMI) está associado a malformações fetais raras mas graves (aplasia cutis, atresia de coanas/esôfago). Na Crise Tireotóxica, o PTU é preferido porque, além de inibir a síntese do hormônio tireoidiano (como o MMI), ele também inibe a conversão periférica de T4 em T3 (o hormônio metabolicamente mais ativo). No 2º e 3º trimestres, volta-se ao MMI por menor risco de hepatotoxicidade materna grave comparado ao PTU.', '{"a":"Correta. Regra farmacológica clássica da tireoide.","b":"Incorreta. Nenhuma destas drogas é usada no hipotireoidismo.","c":"Incorreta. MMI é mais seguro em idosos por menor hepatotoxicidade.","d":"Incorreta. Adolescentes devem usar MMI preferencialmente.","e":"Incorreta. O metabolismo é predominantemente hepático; o PTU não tem vantagem renal específica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9pncu1', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Farmacologia","Gestação","Crise Tireotóxica","Metimazol"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-9pncu1', 'approved', 7)
    ON CONFLICT DO NOTHING;

    -- Q9
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ismymg', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Um paciente de 45 anos, assintomático, apresenta em um exame de check-up um nódulo tireoidiano de 1,8 cm em lobo direito. A ultrassonografia demonstra: ''Nódulo sólido, hipoecogênico, com margens irregulares e presença de microcalcificações (TI-RADS 5)''. Qual a conduta correta perante esta descrição ultrassonográfica?', '[{"id":"a","text":"Realizar Punção Aspirativa por Agulha Fina (PAAF) imediatamente."},{"id":"b","text":"Apenas repetir a ultrassonografia em 12 meses."},{"id":"c","text":"Solicitar Cintilografia de Tireoide como primeiro exame."},{"id":"d","text":"Iniciar Levotiroxina para suprimir o TSH e reduzir o nódulo."},{"id":"e","text":"Indicar tireoidectomia total sem necessidade de punção prévia."}]', 'a', 
        'O nódulo apresenta características de altíssima suspeição para malignidade (sólido, hipoecoico, microcalcificações e margens irregulares). Pela classificação ACR TI-RADS, nódulos TI-RADS 5 superiores a 1,0 cm devem ser submetidos à PAAF para diagnóstico citológico (Bethesda).', '{"a":"Correta. Conduta padrão para nódulo suspeito.","b":"Incorreta. Retardar a investigação em um nódulo TI-RADS 5 é um erro grave.","c":"Incorreta. A cintilografia só é indicada como passo inicial se o TSH estiver suprimido (nódulo possivelmente ''quente'').","d":"Incorreta. A terapia supressiva com levotiroxina para nódulos não é mais recomendada.","e":"Incorreta. A cirurgia deve ser baseada no resultado da citologia (PAAF)."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ismymg', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Nódulo de Tireoide","PAAF","TI-RADS","Câncer de Tireoide"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-ismymg', 'approved', 8)
    ON CONFLICT DO NOTHING;

    -- Q10
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-x6n1lb', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'O resultado da PAAF de um nódulo tireoidiano de 2,5 cm foi classificado como ''Bethesda IV (Neoplasia Folicular ou Suspeito para Neoplasia Folicular)''. Qual a conduta recomendada para este resultado?', '[{"id":"a","text":"Cirurgia (Lobectomia ou Tireoidectomia Total) ou realização de testes moleculares, pois a citologia não consegue diferenciar adenoma folicular de carcinoma folicular."},{"id":"b","text":"Repetir a PAAF imediatamente para confirmar se é câncer."},{"id":"c","text":"Alta definitiva; o nódulo é benigno."},{"id":"d","text":"Apenas observação radiológica a cada 24 meses."},{"id":"e","text":"Tratamento com Iodo Radioativo (I-131)."}]', 'a', 
        'O diagnóstico citológico (Bethesda IV) não consegue distinguir se há invasão de cápsula ou de vasos, que são os critérios histopatológicos que definem o Carcinoma Folicular. Portanto, a análise do nódulo inteiro (peça cirúrgica) é necessária. Em centros avançados, o teste molecular pode ser usado para evitar cirurgias desnecessárias se demonstrar baixo risco genético.', '{"a":"Correta. Dilema histopatológico do padrão folicular.","b":"Incorreta. Repetir a punção resultará no mesmo padrão ''folicular'' e não resolverá a dúvida de invasão capsular.","c":"Incorreta. Bethesda IV tem risco de malignidade de 15% a 30%.","d":"Incorreta. Risco de negligenciar um carcinoma folicular.","e":"Incorreta. O I-131 é tratamento de resgate pós-cirúrgico ou para hipertireoidismo, não para diagnóstico inicial de nódulos."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'x6n1lb', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Bethesda","PAAF","Carcinoma Folicular","Cirurgia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-x6n1lb', 'approved', 9)
    ON CONFLICT DO NOTHING;

    -- Q11
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-fj4w3u', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'O Carcinoma Papilífero de Tireoide (CPT) é o tipo mais comum de câncer de tireoide. Qual a via de disseminação preferencial deste tumor e qual o marcador laboratorial usado no seguimento pós-operatório (após tireoidectomia total e ablação com iodo)?', '[{"id":"a","text":"Disseminação Linfática; marcador: Tireoglobulina."},{"id":"b","text":"Disseminação Hematogênica; marcador: Calcitonina."},{"id":"c","text":"Disseminação por contiguidade; marcador: T4 Livre."},{"id":"d","text":"Não sofre disseminação; marcador: Anti-TPO."},{"id":"e","text":"Disseminação Linfática; marcador: TSH."}]', 'a', 
        'O CPT dissemina-se preferencialmente por via linfática para os linfonodos cervicais. Como as células foliculares normais e as neoplásicas papilíferas produzem Tireoglobulina (Tg), após a retirada total de todo o tecido tireoidiano (cirurgia + iodo), a Tg deve ser indetectável. Sua detecção no sangue durante o seguimento sugere recidiva ou metástase.', '{"a":"Correta. Padrão ouro de oncologia da tireoide.","b":"Incorreta. Disseminação hematogênica é mais comum no Folitcular e Medular. Calcitonina é o marcador do Medular.","c":"Incorreta. Embora invada por contiguidade, a via linfática é a regra para as metástases iniciais. T4L não é marcador tumoral.","d":"Incorreta. Todos os cânceres podem disseminar-se.","e":"Incorreta. O TSH é usado para avaliar a dose da medicação ou preparar para exames, mas o marcador do tumor em si é a Tg."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'fj4w3u', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Carcinoma Papilífero","Tireoglobulina","Linfonodos","Oncologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-fj4w3u', 'approved', 10)
    ON CONFLICT DO NOTHING;

    -- Q12
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-rtppem', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Um paciente submetido a Punção Aspirativa por Agulha Fina (PAAF) de um nódulo tireoidiano recebe o laudo como ''Sistema Bethesda VI''. Qual o significado clínico e a conduta sugerida?', '[{"id":"a","text":"Maligno (Câncer); indicar tratamento cirúrgico definitivo."},{"id":"b","text":"Benigno; acompanhamento clínico."},{"id":"c","text":"Inconclusivo; repetir punção em 3 meses com auxílio de Core Biopsy."},{"id":"d","text":"Lesão de significado indeterminado; conduta expectante."},{"id":"e","text":"Células foliculares normais; alta."}]', 'a', 
        'No sistema Bethesda, a categoria VI representa um diagnóstico definitivo de Malignidade (geralmente Carcinoma Papilífero), com valor preditivo positivo > 99%. A cirurgia é o tratamento mandatório.', '{"a":"Correta. Classificação de Bethesda máxima.","b":"Incorreta. Benigno é Bethesda II.","c":"Incorreta. Inconclusivo é Bethesda I.","d":"Incorreta. Indeterminado é Bethesda III.","e":"Incorreta. Bethesda VI nunca é normal."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'rtppem', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Bethesda","Câncer","Conduta","Cirurgia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-rtppem', 'approved', 11)
    ON CONFLICT DO NOTHING;

    -- Q13
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w5vlxa', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'O Carcinoma Medular de Tireoide (CMT) origina-se de quais células e qual marcador laboratorial é utilizado para seu diagnóstico e seguimento?', '[{"id":"a","text":"Células C (Parafoliculares); marcador: Calcitonina."},{"id":"b","text":"Células Foliculares; marcador: Tireoglobulina."},{"id":"c","text":"Linfócitos intra-tireoidianos; marcador: CD20."},{"id":"d","text":"Células de Hürthle; marcador: Ácido Úrico."},{"id":"e","text":"Células Estromais; marcador: Estrogênio."}]', 'a', 
        'O CMT deriva das células parafoliculares (Células C), que produzem o hormônio Calcitonina. Este tumor pode ser esporádico ou associado a síndromes de Neoplasia Endócrina Múltipla (NEM 2A ou 2B). A Calcitonina é o biomarcador sensível e específico para este câncer.', '{"a":"Correta. Fisiopatologia do Carcinoma Medular.","b":"Incorreta. Células foliculares originam o Papilífero e o Folicular.","c":"Incorreta. Linfomas de tireoide originam-se de linfócitos.","d":"Incorreta. Células de Hürthle são variantes das foliculares.","e":"Incorreta. Não existe carcinoma estromal de tireoide produtor de estrogênio."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w5vlxa', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Carcinoma Medular","Calcitonina","Células C","NEM"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-w5vlxa', 'approved', 12)
    ON CONFLICT DO NOTHING;

    -- Q14
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-699zlw', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Um paciente de 40 anos com quadro de hipertireoidismo por Doença de Graves recebe tratamento com Metimazol (MMI). Após 10 dias, desenvolve febre alta e dor de garganta severa (odinofagia) com presença de exsudato em orofaringe. Qual o efeito colateral grave e raro do Metimazol deve ser suspeitado e qual o exame imediato?', '[{"id":"a","text":"Agranulocitose; Hemograma com contagem de neutrófilos."},{"id":"b","text":"Hepatite fulminante; Transaminases."},{"id":"c","text":"Síndrome Nefrótica; Urina Tipo 1."},{"id":"d","text":"Hipotireoidismo iatrogênico; TSH."},{"id":"e","text":"Mononucleose infecciosa por imunodepressão; Sorologias."}]', 'a', 
        'A agranulocitose (neutrófilos < 500/mm³) é um efeito colateral raro (0,2 a 0,5%) e potencialmente fatal das tionamidas (MMI e PTU). Manifesta-se subitamente como infecção de orofaringe ou sepse. O paciente deve ser orientado a suspender a droga e procurar o hospital imediatamente se tiver febre e dor de garganta. A conduta é a suspensão definitiva da medicação e suporte com fator de crescimento de colônias (G-CSF) se necessário.', '{"a":"Correta. Efeito adverso hematológico crítico.","b":"Incorreta. Hepatite causa icterícia e dor abdominal, não dor de garganta.","c":"Incorreta. Não há tal associação dermatológica/renal.","d":"Incorreta. Hipotireoidismo não causa dor de garganta e febre.","e":"Incorreta. Embora os sintomas simulem mononucleose, a causa medicamentosa é a prioridade no paciente em uso de MMI."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '699zlw', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Agranulocitose","Metimazol","Efeitos Adversos","Hematologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-699zlw', 'approved', 13)
    ON CONFLICT DO NOTHING;

    -- Q15
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        '', '[{"id":"a","text":"Associação de Doença de Graves (hipertireoidismo autoimune) com a presença de nódulos funcionais autônomos (Bócio Multinodular Tóxico)."},{"id":"b","text":"Associação de Hipotireoidismo com Insuficiência Adrenal."},{"id":"c","text":"Associação de Câncer de Tireoide com Feocromocitoma."},{"id":"d","text":"Tireoidite de Hashimoto cursando com Fibrose Retroperitoneal."},{"id":"e","text":"Hipertireoidismo causado por tumor hipofisário secretor de TSH."}]', 'a', 
        'A Síndrome de Marine-Lenhart é uma variante rara do hipertireoidismo onde coexistem duas doenças: a Doença de Graves (estímulo difuso pelo TRAB) e nódulos que são independentes do TRAB e do TSH (autônomos). No cintilograma, observa-se captação difusa aumentada com áreas nodulares de captação ainda mais intensa.', '{"a":"Correta. Definição da síndrome epônima.","b":"Incorreta. Isto descreve a Síndrome de Schmidt.","c":"Incorreta. Sugere NEM 2A.","d":"Incorreta. Sem relação descrita.","e":"Incorreta. Isto é um TSHoma."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Graves","Marine-Lenhart","Bócio","Endocrinologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-', 'approved', 14)
    ON CONFLICT DO NOTHING;

    -- Q16
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w98jjz', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'No estado de Hipertireoidismo (Graves), o que se espera encontrar na avaliação da Captação de Iodo Radioativo (RAIU) de 24 horas?', '[{"id":"a","text":"RAIU elevada (Glândula ávida por iodo)."},{"id":"b","text":"RAIU baixa (Glândula ''branca'' ou sem captação)."},{"id":"c","text":"RAIU normal, mas com excreção urinária aumentada."},{"id":"d","text":"Padrão nodular frio."},{"id":"e","text":"Captação exclusiva em pirâmide de Lalouette."}]', 'a', 
        'Na Doença de Graves, a glândula está em hiperatividade sintética constante. Portanto, ela capta avidamente o iodo circulante para produzir hormônios. Já nas Tireoidites (onde o hormônio ''vaza'' do folículo destruído) ou no hipertireoidismo factício, a RAIU está baixa.', '{"a":"Correta. Padrão de hiperfunção verdadeira.","b":"Incorreta. RAIU baixa ocorre em tireoidites, ingestão exógena ou excesso de iodo (Jod-Basedow).","c":"Incorreta. A captação intraglandular é o que define o diagnóstico diferencial.","d":"Incorreta. Doença de Graves é difusa.","e":"Incorreta. Pirâmide de Lalouette é um remanescente anatômico, não um padrão funcional isolado no Graves."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w98jjz', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["RAIU","Iodo Radioativo","Graves","Diferencial"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-w98jjz', 'approved', 15)
    ON CONFLICT DO NOTHING;

    -- Q17
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-m6o0ba', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'A principal causa de Hipotireoidismo Congênito no Brasil é a Disgenesia Tireoidiana. Qual o exame de triagem neonatal obrigatório para detecção desta condição e qual o período ideal para coleta?', '[{"id":"a","text":"Teste do Pezinho (Dosagem de TSH); entre o 3º e 5º dia de vida."},{"id":"b","text":"Dosagem de T4 Livre no cordão umbilical."},{"id":"c","text":"Ultrassonografia cervical na maternidade."},{"id":"d","text":"Cintilografia de tireoide aos 7 dias de vida."},{"id":"e","text":"Teste do Pezinho (Dosagem de Calcitonina); 1º dia de vida."}]', 'a', 
        'O Teste do Pezinho coleta sangue capilar do calcanhar do RN. O TSH neonatal é a ferramenta de triagem para hipotireoidismo congênito, que se não tratado precocemente (idealmente nas primeiras 2 semanas), causa deficiência intelectual irreversível (cretinismo). A coleta no 3º-5º dia evita o pico fisiológico de TSH que ocorre logo após o nascimento.', '{"a":"Correta. Protocolo de triagem neonatal universal.","b":"Incorreta. Sangue de cordão pode sofrer interferência materna e não é operacionalmente viável como triagem de massa.","c":"Incorreta. USG serve para localizar a glândula após o diagnóstico bioquímico, não como triagem.","d":"Incorreta. Exame diagnóstico de segunda linha.","e":"Incorreta. Calcitonina não serve para rastrear hipotireoidismo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'm6o0ba', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Hipotireoidismo Congênito","Triagem Neonatal","Teste do Pezinho","Prevenção"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-m6o0ba', 'approved', 16)
    ON CONFLICT DO NOTHING;

    -- Q18
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-l3yfpb', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Sobre o Coma Mixedematoso, assinale a alternativa que contém a tríade diagnóstica clássica.', '[{"id":"a","text":"Alteração de consciência (coma/letargia), Hipotermia e fator precipitante (ex: infecção, frio, cirurgia)."},{"id":"b","text":"Febre alta, Taquicardia e Agitação."},{"id":"c","text":"Bócio gigante, Proptose e Insuficiência cardíaca."},{"id":"d","text":"Tremores, Perda de peso e Diarreia."},{"id":"e","text":"Poliúria, Polidipsia e Desidratação severa."}]', 'a', 
        'O Coma Mixedematoso é o estágio terminal do hipotireoidismo não tratado, agravado por um fator agudo. Caracteriza-se por lentificação global: hipotermia (frequentemente < 35°C), depressão respiratória (hipercapnia), bradicardia e alteração do nível de consciência. É uma emergência com alta mortalidade.', '{"a":"Correta. Reconhecimento clínico da emergência.","b":"Incorreta. Descrição de crise tireotóxica (o oposto).","c":"Incorreta. Sugere Doença de Graves severa.","d":"Incorreta. Sintomas de hipertireoidismo.","e":"Incorreta. Sugere Diabetes Mellitus ou Insipidus."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'l3yfpb', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Coma Mixedematoso","Emergência","Terapia Intensiva","Hipotireoidismo"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-l3yfpb', 'approved', 17)
    ON CONFLICT DO NOTHING;

    -- Q19
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ska4sy', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Qual complicação cirúrgica imediata da tireoidectomia pode levar à obstrução respiratória aguda e morte se não for prontamente drenada?', '[{"id":"a","text":"Hematoma cervical expansivo sufocante."},{"id":"b","text":"Hipocalcemia por retirada das paratireoides."},{"id":"c","text":"Lesão bilateral do nervo laríngeo superior."},{"id":"d","text":"Crise asmática induzida pelo iodo."},{"id":"e","text":"Recorrência tumoral imediata."}]', 'a', 
        'O sangramento no espaço cervical após tireoidectomia pode formar um hematoma sob a fáscia profunda. Devido à rigidez das estruturas cervicais, o sangue comprime a traqueia (laringomalácia reacional) e causa asfixia mecânica imediata. A conduta é a abertura da ferida cirúrgica à beira do leito para descompressão e posterior retorno ao bloco cirúrgico.', '{"a":"Correta. Emergência pós-operatória crítica do cirurgião de cabeça e pescoço.","b":"Incorreta. Hipocalcemia causa parestesias e tetania (sinal de Chvostek/Trousseau), mas não obstrução respiratória mecânica súbita.","c":"Incorreta. A lesão do laríngeo superior altera a emissão de tons agudos. A lesão do RECORRENTE bilateral é que causa paralisia das cordas vocais em adução e estridor (obstrução alta).","d":"Incorreta. Raríssimo e não cursa com compressão cervical externa.","e":"Incorreta. Impossível."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ska4sy', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Cirurgia","Complicações","Emergência Post-Op","Hematoma"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-ska4sy', 'approved', 18)
    ON CONFLICT DO NOTHING;

    -- Q20
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        '', '[{"id":"a","text":"Resistência generalizada aos hormônios tireoidianos (mutação no receptor TR-beta)."},{"id":"b","text":"Destruição da glândula tireoide por radiação nuclear."},{"id":"c","text":"Produção ectópica de hormônio tireoidiano por um tumor ovariano (Struma Ovarii)."},{"id":"d","text":"Insucesso na conversão periférica de T4 em T3 por deficiência de selênio."},{"id":"e","text":"Aumento do bócio causado por ingestão excessiva de mandioca branca."}]', 'a', 
        'Na Síndrome de Refetoff, os tecidos são resistentes à ação do hormônio tireoidiano. O resultado laboratorial é paradoxal: T4 Livre e T3 elevados, mas TSH também elevado ou normal (pois a hipófise também é resistente ao feedback negativo). O paciente pode estar clinicamente eutireoideo, hipotireoideo ou hipertireoideo (dependendo do grau de resistência em diferentes tecidos).', '{"a":"Correta. Doença genética de resistência hormonal.","b":"Incorreta. Trata-se de tireoidite actínica.","c":"Incorreta. Descrição de Struma Ovarii.","d":"Incorreta. Síndrome do Eutireoideo Doente ou defeitos nas deiodinases.","e":"Incorreta. Bócio endêmico bociogênico alimentar."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"F90B96F6-66B4-47E6-A80F-E0CC70C17F71","tags":["Resistência Hormonal","Refetoff","Endocrinologia","Tireoide"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TIR-', 'approved', 19)
    ON CONFLICT DO NOTHING;

END $$;