DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ptab0x', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma mulher de 34 anos apresenta-se ao consultório com queixas de fadiga, constipação severa, pele seca e irregularidade menstrual (polimenorreia) nos últimos 6 meses. Ela relata também discreto aumento de peso (4 kg) no período, apesar de manter o apetite habitual. Ao exame físico: bradicardia (FC: 52 bpm), reflexos tendinosos profundos lentificados (fase de relaxamento prolongada) e edema periorbitário leve. Não há bócio palpável. Exames laboratoriais revelam: TSH = 18 mUI/L (VR: 0,4 a 4,5) e T4 Livre = 0,6 ng/dL (VR: 0,8 a 1,8). Qual o diagnóstico mais provável e a conduta inicial correta?', '[{"id":"a","text":"Hipotireoidismo primário clínico; iniciar Levotiroxina (1,6 mcg/kg/dia) com estômago vazio."},{"id":"b","text":"Hipotireoidismo subclínico; apenas observar e repetir exames em 3 meses."},{"id":"c","text":"Hipotireoidismo central (secundário); solicitar Ressonância de Sela Túrcica."},{"id":"d","text":"Síndrome do Eutireoideo Doente; não há necessidade de reposição hormonal."},{"id":"e","text":"Hipotireoidismo primário clínico; iniciar Liotironina (T3) isolada."}]', 'a', 
        'A paciente apresenta sinais e sintomas clássicos de hipotireoidismo clínico (TSH elevado e T4L baixo). A conduta padrão é a reposição com Levotiroxina (T4 sintético) em jejum. A dose de 1,6 mcg/kg/dia é a preconizada para adultos jovens e hígidos. O hipotireoidismo subclínico seria definido se o T4L estivesse normal (o que não é o caso).', '{"a":"Correta. Diagnóstico e conduta baseados no consenso brasileiro e internacional.","b":"Incorreta. O T4L baixo exclui a forma subclínica.","c":"Incorreta. No hipotireoidismo central, o TSH estaria baixo ou inadequadamente normal, nunca elevado desta forma.","d":"Incorreta. A síndrome do eutireoideo doente ocorre em pacientes críticos internados e cursa com T3 baixo, mas T4L e TSH usualmente normais no início.","e":"Incorreta. A reposição de escolha é sempre com T4 (Levotiroxina) devido à sua meia-vida longa e conversão periférica fisiológica em T3."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ptab0x', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo","Diagnóstico","Dose","Semiologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ptab0x', 'approved', 0)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q2 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8dls7v', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um homem de 52 anos, com história de cardiopatia isquêmica (infarto prévio há 2 anos), apresenta TSH = 12 mUI/L e T4 Livre = 0,7 ng/dL. O paciente queixa-se de cansaço extremo. Sobre a introdução de Levotiroxina neste paciente com comorbidade cardíaca, qual a orientação correta?', '[{"id":"a","text":"Iniciar com dose plena (1,6 mcg/kg/dia) para resolver os sintomas rapidamente."},{"id":"b","text":"Iniciar com dose baixa (12,5 a 25 mcg/dia) e aumentar lentamente a cada 4-8 semanas (estratégia ''start low, go slow'')."},{"id":"c","text":"Contraindicar a levotiroxina pois o hormônio causa arritmias fatais em cardiopatas."},{"id":"d","text":"Iniciar reposição apenas se o TSH for maior que 20 mUI/L."},{"id":"e","text":"Substituir a levotiroxina por Propranolol para proteger o coração."}]', 'b', 
        'Em pacientes idosos ou com dança arterial coronariana conhecida, a reposição hormonal brusca pode aumentar o consumo de oxigênio pelo miocárdio e o débito cardíaco, podendo desencadear angina, arritmias ou novo infarto. Por isso, a regra de ouro é começar com doses muito baixas e progredir conforme a tolerância clínica e laboratorial.', '{"a":"Incorreta. Risco cardíaco injustificável e perigoso.","b":"Correta. Medida de segurança fundamental na endocrinogeriatria e cardiologia.","c":"Incorreta. O hipotireoidismo não tratado também traz sérios riscos cardíacos (dislipidemia, disfunção diastólica, bradicardia).","d":"Incorreta. O paciente já tem hipotireoidismo clínico (T4L baixo) e deve ser tratado.","e":"Incorreta. Propranolol é usado no hipertireoidismo, não no hipotireoidismo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8dls7v', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo","Segurança","Cardiologia","Endocrinologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8dls7v', 'approved', 1)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q3 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-61cqa0', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma gestante de 8 semanas de idade gestacional apresenta, no seu primeiro exame de pré-natal, TSH = 3,8 mUI/L. Ela não possui diagnóstico prévio de doença tireoidiana. De acordo com os consensos brasileiros de tireoide na gestação, qual a conduta diante deste valor?', '[{"id":"a","text":"O valor está normal para a gestação, não exige nenhuma medida."},{"id":"b","text":"Solicitar obrigatoriamente a dosagem de Anticorpo Antiperoxidase (Anti-TPO); se positivo, iniciar Levotiroxina."},{"id":"c","text":"Iniciar Levotiroxina (100 mcg/dia) para todas as gestantes com TSH > 2,5."},{"id":"d","text":"Solicitar interrupção da gravidez por risco de bócio fetal."},{"id":"e","text":"Aguardar o segundo trimestre para repetir o exame, pois o TSH só tem valor após a 20ª semana."}]', 'b', 
        'Os valores de referência para TSH na gestação são mais baixos devido à ação do HCG (que estimula o receptor de TSH). Um TSH entre 2,5 e o limite superior do método (geralmente 4,0) em gestantes exige a dosagem do Anti-TPO. Se a gestante tiver autoimunidade positiva, o risco de progressão para hipotireoidismo durante a gestação e de complicações obstétricas (aborto, pré-eclâmpsia) aumenta, justificando o tratamento precoce se TSH > 2,5. Se o Anti-TPO for negativo, apenas monitora-se.', '{"a":"Incorreta. Na gestação, o limite de 4,0 já é considerado suspeito para hipotireoidismo subclínico em muitos contextos.","b":"Correta. Reflete o manejo estratificado de risco pelo anticorpo.","c":"Incorreta. Nem toda gestante com TSH > 2,5 precisa de tratamento; a dose de 100 mcg é excessiva para início de quem tem hipotireoidismo subclínico.","d":"Incorreta. Absurdo obstétrico.","e":"Incorreta. O primeiro trimestre é o período crucial para o desenvolvimento neurológico fetal dependente de hormônios maternos."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '61cqa0', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Gestação","TSH","Anti-TPO","Endocrinologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-61cqa0', 'approved', 2)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q4 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-j4gwhc', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A Tireoidite de Hashimoto é a causa mais comum de hipotireoidismo em áreas iodo-suficientes. Qual o achado histopatológico e o anticorpo marcador desta patologia respecitvamente?', '[{"id":"a","text":"Infiltrado linfocítico com centros germinativos e células de Hürthle (oxicílicas); Anti-TPO."},{"id":"b","text":"Infiltrado neutrofílico agudo e necrose de liquefação; Anti-TRAB."},{"id":"c","text":"Fibrose pétrea que invade tecidos adjacentes; Anti-TPO."},{"id":"d","text":"Granulomas epitelioides com células gigantes de Langhans; Anti-TG."},{"id":"e","text":"Hiperplasia folicular com bordas festonadas; Anticorpo Anti-TSH."}]', 'a', 
        'A Tireoidite de Hashimoto é uma doença autoimune mediada por células T. Na patologia, observamos a destruição do parênquima folicular e sua substituição por um infiltrado inflamatório linfocítico denso, podendo formar folículos linfoides (centros germinativos). As células foliculares remanescentes tornam-se metaplásicas (Células de Hürthle ou oxicílicas). O Anti-TPO (Antiperoxidase) é positivo em > 90% dos casos.', '{"a":"Correta. Definição patognomônica da doença.","b":"Incorreta. Sugere processo infeccioso agudo (abscesso), não crônico autoimune.","c":"Incorreta. Isto descreve a Tireoidite de Riedel.","d":"Incorreta. Granulomas sugerem TB, sarcoidose ou Tireoidite de De Quervain em fase específica (mas sem Caseum).","e":"Incorreta. Descrição clássica da Doença de Graves."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'j4gwhc', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hashimoto","Histopatologia","Anticorpos","Autoimunidade"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-j4gwhc', 'approved', 3)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q5 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-alqpw1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 28 anos, ansioso, apresenta palpitações, insônia, tremores de extremidades e perda de massa muscular proximal (miopatia). Refere sensação de calor constante. Ao exame físico: bócio difuso e indolor com presença de sopro sistólico na glândula tireoide. Nota-se proptose ocular (exoftalmia) e retração palpebral. Laboratório: TSH < 0,01 mUI/L e T4 Livre = 4,2 ng/dL. Qual o diagnóstico e o anticorpo envolvido?', '[{"id":"a","text":"Doença de Graves; Anticorpo estimulador do receptor de TSH (TRAB)."},{"id":"b","text":"Bócio Multinodular Tóxico; Anticorpo Anti-Tireoglobulina."},{"id":"c","text":"Adenoma Tóxico (Doença de Plummer); Anticorpo Anti-TPO."},{"id":"d","text":"Tireoidite Subaguda de De Quervain; Anti-TRAB."},{"id":"e","text":"Hipertireoidismo factício; TRAB negativo."}]', 'a', 
        'O quadro de bócio difuso (''sopro na tireoide'') associado a sinais oculares específicos (oftalmopatia) e hipertireoidismo clínico severo define a Doença de Graves. A etiologia é a produção de anticorpos (TRAB) que mimetizam a ação do TSH, estimulando continuamente a glândula.', '{"a":"Correta. Tríade de Graves e fisiopatologia molecular.","b":"Incorreta. O bócio multinodular não apresenta exoftalmia típica nem sopro difuso na glândula.","c":"Incorreta. A Doença de Plummer é um nódulo único autônomo (quente no cintilograma) e não possui etiologia autoimune.","d":"Incorreta. A tireoidite de De Quervain é extremamente DOLOROSA na palpação cervical.","e":"Incorreta. O hipertireoidismo factício (pela ingestão de hormônio) cursa com glândula atrófica (sem bócio)."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'alqpw1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipertireoidismo","Graves","TRAB","Oftalmopatia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-alqpw1', 'approved', 4)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q6 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w9cozi', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma paciente de 35 anos apresenta quadro clínico de dor cervical súbita e intensa, que irradia para a mandíbula e orelhas. Relata ter tido uma infecção respiratória alta (resfriado) há 2 semanas. Ao exame: tireoide aumentada de volume, de consistência elástica e extremamente dolorosa à palpação. Laboratório: TSH suprimido, T4L elevado e Velocidade de Hemossedimentação (VHS) = 90 mm/1ªh (VR: < 20). Qual o diagnóstico e o tratamento de escolha para a fase aguda?', '[{"id":"a","text":"Tireoidite Subaguda (De Quervain); tratamento com Anti-inflamatórios não hormonais (AINH) ou Corticoides."},{"id":"b","text":"Tireoidite Infecciosa Aguda (Supurativa); tratamento com Antibioticoterapia endovenosa."},{"id":"c","text":"Tireoidite de Hashimoto (fase Hashitoxicose); tratamento com Metimazol."},{"id":"d","text":"Hemorragia intranodular; tratamento cirúrgico de urgência."},{"id":"e","text":"Carcinoma Anaplásico de Tireoide; tratamento paliativo."}]', 'a', 
        'A apresentação de dor cervical súbita e intensa após um quadro viral, associada a tireotoxicose clínica e laboratorial (TSH baixo, T4L alto) e VHS extremamente elevado, é patognomônica da Tireoidite Subaguda de De Quervain (ou granulomatosa). O tratamento visa o controle da dor e da inflamação, sendo os AINHs a primeira escolha; em casos graves ou refratários, os corticoides são indicados.', '{"a":"Correta. Diagnóstico clássico pós-viral com dor e VHS alto.","b":"Incorreta. A tireoidite supurativa cursa com sinais flogísticos locais intensos e desvio à esquerda no hemograma.","c":"Incorreta. Hashitoxicose não costuma ser dolorosa e o VHS é normal.","d":"Incorreta. A hemorragia causa dor súbita mas raramente hipertireoidismo e VHS tão alto.","e":"Incorreta. O carcinoma anaplásico causa dor e crescimento rápido em idosos, mas o VHS e a relação pós-viral são típicos de De Quervain."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w9cozi', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoidite","De Quervain","Dor Cervical","VHS"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-w9cozi', 'approved', 5)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q7 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-jd1htl', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A crise tireotóxica (tempestade tireoidiana) é uma emergência médica. De acordo com o escore de Burch-Wartofsky, qual dos sinais abaixo NÃO é um critério clássico para o diagnóstico de tempestade tireoidiana?', '[{"id":"a","text":"Febre acima de 38,5°C."},{"id":"b","text":"Taquicardia proporcional à febre (FC < 90 bpm)."},{"id":"c","text":"Alterações no sistema nervoso central (agitação, confusão, coma)."},{"id":"d","text":"Sintomas gastrointestinais (vômitos, diarreia, icterícia)."},{"id":"e","text":"Insuficiência cardíaca congestiva."}]', 'b', 
        'A tempestade tireoidiana cursa com taquicardia DESPROPORCIONAL à febre, geralmente com FC > 140 bpm. O escore de Burch-Wartofsky pontua temperatura, efeitos neurológicos centrais, disfunção cardiovascular (taquicardia, fibrilação atrial, ICC) e disfunção gastro-hepática. Uma frequência cardíaca baixa (90 bpm) pontua zero no escore e desfavorece o diagnóstico de crise tireotóxica.', '{"a":"Incorreta. A hipertermia é o marco da crise.","b":"Correta. O erro está na frequência cardíaca descrita como baixa.","c":"Incorreta. Disfunção do SNC é critério viga mestra do escore.","d":"Incorreta. Disfunção gastrointestinal pontua no escore.","e":"Incorreta. ICC é uma das manifestações clínicas terminais ou graves da tempestade."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'jd1htl', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Emergência","Crise Tireotóxica","Burch-Wartofsky","Infectologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-jd1htl', 'approved', 6)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q8 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9pncu1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No tratamento do hipertireoidismo, o Metimazol (MMI) é preferencial ao Propiltiouracil (PTU), EXCETO em situações específicas. Em qual das situações abaixo o Propiltiouracil (PTU) deve ser preferido como droga de primeira escolha?', '[{"id":"a","text":"Primeiro trimestre da gestação e Crise Tireotóxica."},{"id":"b","text":"Hipotireoidismo severo."},{"id":"c","text":"Idosos com arritmia cardíaca."},{"id":"d","text":"Adolescentes com bócio discreto."},{"id":"e","text":"Pacientes com insuficiência renal crônica."}]', 'a', 
        'O PTU é preferível no 1º trimestre da gestação porque o Metimazol (MMI) está associado a malformações fetais raras mas graves (aplasia cutis, atresia de coanas/esôfago). Na Crise Tireotóxica, o PTU é preferido porque, além de inibir a síntese do hormônio tireoidiano (como o MMI), ele também inibe a conversão periférica de T4 em T3 (o hormônio metabolicamente mais ativo). No 2º e 3º trimestres, volta-se ao MMI por menor risco de hepatotoxicidade materna grave comparado ao PTU.', '{"a":"Correta. Regra farmacológica clássica da tireoide.","b":"Incorreta. Nenhuma destas drogas é usada no hipotireoidismo.","c":"Incorreta. MMI é mais seguro em idosos por menor hepatotoxicidade.","d":"Incorreta. Adolescentes devem usar MMI preferencialmente.","e":"Incorreta. O metabolismo é predominantemente hepático; o PTU não tem vantagem renal específica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9pncu1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Farmacologia","Gestação","Crise Tireotóxica","Metimazol"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9pncu1', 'approved', 7)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q9 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ismymg', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 45 anos, assintomático, apresenta em um exame de check-up um nódulo tireoidiano de 1,8 cm em lobo direito. A ultrassonografia demonstra: ''Nódulo sólido, hipoecogênico, com margens irregulares e presença de microcalcificações (TI-RADS 5)''. Qual a conduta correta perante esta descrição ultrassonográfica?', '[{"id":"a","text":"Realizar Punção Aspirativa por Agulha Fina (PAAF) imediatamente."},{"id":"b","text":"Apenas repetir a ultrassonografia em 12 meses."},{"id":"c","text":"Solicitar Cintilografia de Tireoide como primeiro exame."},{"id":"d","text":"Iniciar Levotiroxina para suprimir o TSH e reduzir o nódulo."},{"id":"e","text":"Indicar tireoidectomia total sem necessidade de punção prévia."}]', 'a', 
        'O nódulo apresenta características de altíssima suspeição para malignidade (sólido, hipoecoico, microcalcificações e margens irregulares). Pela classificação ACR TI-RADS, nódulos TI-RADS 5 superiores a 1,0 cm devem ser submetidos à PAAF para diagnóstico citológico (Bethesda).', '{"a":"Correta. Conduta padrão para nódulo suspeito.","b":"Incorreta. Retardar a investigação em um nódulo TI-RADS 5 é um erro grave.","c":"Incorreta. A cintilografia só é indicada como passo inicial se o TSH estiver suprimido (nódulo possivelmente ''quente'').","d":"Incorreta. A terapia supressiva com levotiroxina para nódulos não é mais recomendada.","e":"Incorreta. A cirurgia deve ser baseada no resultado da citologia (PAAF)."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ismymg', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Nódulo de Tireoide","PAAF","TI-RADS","Câncer de Tireoide"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ismymg', 'approved', 8)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q10 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-x6n1lb', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O resultado da PAAF de um nódulo tireoidiano de 2,5 cm foi classificado como ''Bethesda IV (Neoplasia Folicular ou Suspeito para Neoplasia Folicular)''. Qual a conduta recomendada para este resultado?', '[{"id":"a","text":"Cirurgia (Lobectomia ou Tireoidectomia Total) ou realização de testes moleculares, pois a citologia não consegue diferenciar adenoma folicular de carcinoma folicular."},{"id":"b","text":"Repetir a PAAF imediatamente para confirmar se é câncer."},{"id":"c","text":"Alta definitiva; o nódulo é benigno."},{"id":"d","text":"Apenas observação radiológica a cada 24 meses."},{"id":"e","text":"Tratamento com Iodo Radioativo (I-131)."}]', 'a', 
        'O diagnóstico citológico (Bethesda IV) não consegue distinguir se há invasão de cápsula ou de vasos, que são os critérios histopatológicos que definem o Carcinoma Folicular. Portanto, a análise do nódulo inteiro (peça cirúrgica) é necessária. Em centros avançados, o teste molecular pode ser usado para evitar cirurgias desnecessárias se demonstrar baixo risco genético.', '{"a":"Correta. Dilema histopatológico do padrão folicular.","b":"Incorreta. Repetir a punção resultará no mesmo padrão ''folicular'' e não resolverá a dúvida de invasão capsular.","c":"Incorreta. Bethesda IV tem risco de malignidade de 15% a 30%.","d":"Incorreta. Risco de negligenciar um carcinoma folicular.","e":"Incorreta. O I-131 é tratamento de resgate pós-cirúrgico ou para hipertireoidismo, não para diagnóstico inicial de nódulos."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'x6n1lb', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bethesda","PAAF","Carcinoma Folicular","Cirurgia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-x6n1lb', 'approved', 9)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q11 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-fj4w3u', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma Papilífero de Tireoide (CPT) é o tipo mais comum de câncer de tireoide. Qual a via de disseminação preferencial deste tumor e qual o marcador laboratorial usado no seguimento pós-operatório (após tireoidectomia total e ablação com iodo)?', '[{"id":"a","text":"Disseminação Linfática; marcador: Tireoglobulina."},{"id":"b","text":"Disseminação Hematogênica; marcador: Calcitonina."},{"id":"c","text":"Disseminação por contiguidade; marcador: T4 Livre."},{"id":"d","text":"Não sofre disseminação; marcador: Anti-TPO."},{"id":"e","text":"Disseminação Linfática; marcador: TSH."}]', 'a', 
        'O CPT dissemina-se preferencialmente por via linfática para os linfonodos cervicais. Como as células foliculares normais e as neoplásicas papilíferas produzem Tireoglobulina (Tg), após a retirada total de todo o tecido tireoidiano (cirurgia + iodo), a Tg deve ser indetectável. Sua detecção no sangue durante o seguimento sugere recidiva ou metástase.', '{"a":"Correta. Padrão ouro de oncologia da tireoide.","b":"Incorreta. Disseminação hematogênica é mais comum no Folitcular e Medular. Calcitonina é o marcador do Medular.","c":"Incorreta. Embora invada por contiguidade, a via linfática é a regra para as metástases iniciais. T4L não é marcador tumoral.","d":"Incorreta. Todos os cânceres podem disseminar-se.","e":"Incorreta. O TSH é usado para avaliar a dose da medicação ou preparar para exames, mas o marcador do tumor em si é a Tg."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'fj4w3u', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Papilífero","Tireoglobulina","Linfonodos","Oncologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-fj4w3u', 'approved', 10)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q12 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-rtppem', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente submetido a Punção Aspirativa por Agulha Fina (PAAF) de um nódulo tireoidiano recebe o laudo como ''Sistema Bethesda VI''. Qual o significado clínico e a conduta sugerida?', '[{"id":"a","text":"Maligno (Câncer); indicar tratamento cirúrgico definitivo."},{"id":"b","text":"Benigno; acompanhamento clínico."},{"id":"c","text":"Inconclusivo; repetir punção em 3 meses com auxílio de Core Biopsy."},{"id":"d","text":"Lesão de significado indeterminado; conduta expectante."},{"id":"e","text":"Células foliculares normais; alta."}]', 'a', 
        'No sistema Bethesda, a categoria VI representa um diagnóstico definitivo de Malignidade (geralmente Carcinoma Papilífero), com valor preditivo positivo > 99%. A cirurgia é o tratamento mandatório.', '{"a":"Correta. Classificação de Bethesda máxima.","b":"Incorreta. Benigno é Bethesda II.","c":"Incorreta. Inconclusivo é Bethesda I.","d":"Incorreta. Indeterminado é Bethesda III.","e":"Incorreta. Bethesda VI nunca é normal."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'rtppem', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bethesda","Câncer","Conduta","Cirurgia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-rtppem', 'approved', 11)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q13 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w5vlxa', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma Medular de Tireoide (CMT) origina-se de quais células e qual marcador laboratorial é utilizado para seu diagnóstico e seguimento?', '[{"id":"a","text":"Células C (Parafoliculares); marcador: Calcitonina."},{"id":"b","text":"Células Foliculares; marcador: Tireoglobulina."},{"id":"c","text":"Linfócitos intra-tireoidianos; marcador: CD20."},{"id":"d","text":"Células de Hürthle; marcador: Ácido Úrico."},{"id":"e","text":"Células Estromais; marcador: Estrogênio."}]', 'a', 
        'O CMT deriva das células parafoliculares (Células C), que produzem o hormônio Calcitonina. Este tumor pode ser esporádico ou associado a síndromes de Neoplasia Endócrina Múltipla (NEM 2A ou 2B). A Calcitonina é o biomarcador sensível e específico para este câncer.', '{"a":"Correta. Fisiopatologia do Carcinoma Medular.","b":"Incorreta. Células foliculares originam o Papilífero e o Folicular.","c":"Incorreta. Linfomas de tireoide originam-se de linfócitos.","d":"Incorreta. Células de Hürthle são variantes das foliculares.","e":"Incorreta. Não existe carcinoma estromal de tireoide produtor de estrogênio."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w5vlxa', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Medular","Calcitonina","Células C","NEM"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-w5vlxa', 'approved', 12)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q14 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-699zlw', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 40 anos com quadro de hipertireoidismo por Doença de Graves recebe tratamento com Metimazol (MMI). Após 10 dias, desenvolve febre alta e dor de garganta severa (odinofagia) com presença de exsudato em orofaringe. Qual o efeito colateral grave e raro do Metimazol deve ser suspeitado e qual o exame imediato?', '[{"id":"a","text":"Agranulocitose; Hemograma com contagem de neutrófilos."},{"id":"b","text":"Hepatite fulminante; Transaminases."},{"id":"c","text":"Síndrome Nefrótica; Urina Tipo 1."},{"id":"d","text":"Hipotireoidismo iatrogênico; TSH."},{"id":"e","text":"Mononucleose infecciosa por imunodepressão; Sorologias."}]', 'a', 
        'A agranulocitose (neutrófilos < 500/mm³) é um efeito colateral raro (0,2 a 0,5%) e potencialmente fatal das tionamidas (MMI e PTU). Manifesta-se subitamente como infecção de orofaringe ou sepse. O paciente deve ser orientado a suspender a droga e procurar o hospital imediatamente se tiver febre e dor de garganta. A conduta é a suspensão definitiva da medicação e suporte com fator de crescimento de colônias (G-CSF) se necessário.', '{"a":"Correta. Efeito adverso hematológico crítico.","b":"Incorreta. Hepatite causa icterícia e dor abdominal, não dor de garganta.","c":"Incorreta. Não há tal associação dermatológica/renal.","d":"Incorreta. Hipotireoidismo não causa dor de garganta e febre.","e":"Incorreta. Embora os sintomas simulem mononucleose, a causa medicamentosa é a prioridade no paciente em uso de MMI."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '699zlw', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Agranulocitose","Metimazol","Efeitos Adversos","Hematologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-699zlw', 'approved', 13)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q15 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        '', '[{"id":"a","text":"Associação de Doença de Graves (hipertireoidismo autoimune) com a presença de nódulos funcionais autônomos (Bócio Multinodular Tóxico)."},{"id":"b","text":"Associação de Hipotireoidismo com Insuficiência Adrenal."},{"id":"c","text":"Associação de Câncer de Tireoide com Feocromocitoma."},{"id":"d","text":"Tireoidite de Hashimoto cursando com Fibrose Retroperitoneal."},{"id":"e","text":"Hipertireoidismo causado por tumor hipofisário secretor de TSH."}]', 'a', 
        'A Síndrome de Marine-Lenhart é uma variante rara do hipertireoidismo onde coexistem duas doenças: a Doença de Graves (estímulo difuso pelo TRAB) e nódulos que são independentes do TRAB e do TSH (autônomos). No cintilograma, observa-se captação difusa aumentada com áreas nodulares de captação ainda mais intensa.', '{"a":"Correta. Definição da síndrome epônima.","b":"Incorreta. Isto descreve a Síndrome de Schmidt.","c":"Incorreta. Sugere NEM 2A.","d":"Incorreta. Sem relação descrita.","e":"Incorreta. Isto é um TSHoma."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Graves","Marine-Lenhart","Bócio","Endocrinologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-', 'approved', 14)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q16 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w98jjz', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No estado de Hipertireoidismo (Graves), o que se espera encontrar na avaliação da Captação de Iodo Radioativo (RAIU) de 24 horas?', '[{"id":"a","text":"RAIU elevada (Glândula ávida por iodo)."},{"id":"b","text":"RAIU baixa (Glândula ''branca'' ou sem captação)."},{"id":"c","text":"RAIU normal, mas com excreção urinária aumentada."},{"id":"d","text":"Padrão nodular frio."},{"id":"e","text":"Captação exclusiva em pirâmide de Lalouette."}]', 'a', 
        'Na Doença de Graves, a glândula está em hiperatividade sintética constante. Portanto, ela capta avidamente o iodo circulante para produzir hormônios. Já nas Tireoidites (onde o hormônio ''vaza'' do folículo destruído) ou no hipertireoidismo factício, a RAIU está baixa.', '{"a":"Correta. Padrão de hiperfunção verdadeira.","b":"Incorreta. RAIU baixa ocorre em tireoidites, ingestão exógena ou excesso de iodo (Jod-Basedow).","c":"Incorreta. A captação intraglandular é o que define o diagnóstico diferencial.","d":"Incorreta. Doença de Graves é difusa.","e":"Incorreta. Pirâmide de Lalouette é um remanescente anatômico, não um padrão funcional isolado no Graves."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w98jjz', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["RAIU","Iodo Radioativo","Graves","Diferencial"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-w98jjz', 'approved', 15)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q17 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-m6o0ba', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal causa de Hipotireoidismo Congênito no Brasil é a Disgenesia Tireoidiana. Qual o exame de triagem neonatal obrigatório para detecção desta condição e qual o período ideal para coleta?', '[{"id":"a","text":"Teste do Pezinho (Dosagem de TSH); entre o 3º e 5º dia de vida."},{"id":"b","text":"Dosagem de T4 Livre no cordão umbilical."},{"id":"c","text":"Ultrassonografia cervical na maternidade."},{"id":"d","text":"Cintilografia de tireoide aos 7 dias de vida."},{"id":"e","text":"Teste do Pezinho (Dosagem de Calcitonina); 1º dia de vida."}]', 'a', 
        'O Teste do Pezinho coleta sangue capilar do calcanhar do RN. O TSH neonatal é a ferramenta de triagem para hipotireoidismo congênito, que se não tratado precocemente (idealmente nas primeiras 2 semanas), causa deficiência intelectual irreversível (cretinismo). A coleta no 3º-5º dia evita o pico fisiológico de TSH que ocorre logo após o nascimento.', '{"a":"Correta. Protocolo de triagem neonatal universal.","b":"Incorreta. Sangue de cordão pode sofrer interferência materna e não é operacionalmente viável como triagem de massa.","c":"Incorreta. USG serve para localizar a glândula após o diagnóstico bioquímico, não como triagem.","d":"Incorreta. Exame diagnóstico de segunda linha.","e":"Incorreta. Calcitonina não serve para rastrear hipotireoidismo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'm6o0ba', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Congênito","Triagem Neonatal","Teste do Pezinho","Prevenção"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-m6o0ba', 'approved', 16)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q18 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-l3yfpb', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Sobre o Coma Mixedematoso, assinale a alternativa que contém a tríade diagnóstica clássica.', '[{"id":"a","text":"Alteração de consciência (coma/letargia), Hipotermia e fator precipitante (ex: infecção, frio, cirurgia)."},{"id":"b","text":"Febre alta, Taquicardia e Agitação."},{"id":"c","text":"Bócio gigante, Proptose e Insuficiência cardíaca."},{"id":"d","text":"Tremores, Perda de peso e Diarreia."},{"id":"e","text":"Poliúria, Polidipsia e Desidratação severa."}]', 'a', 
        'O Coma Mixedematoso é o estágio terminal do hipotireoidismo não tratado, agravado por um fator agudo. Caracteriza-se por lentificação global: hipotermia (frequentemente < 35°C), depressão respiratória (hipercapnia), bradicardia e alteração do nível de consciência. É uma emergência com alta mortalidade.', '{"a":"Correta. Reconhecimento clínico da emergência.","b":"Incorreta. Descrição de crise tireotóxica (o oposto).","c":"Incorreta. Sugere Doença de Graves severa.","d":"Incorreta. Sintomas de hipertireoidismo.","e":"Incorreta. Sugere Diabetes Mellitus ou Insipidus."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'l3yfpb', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Coma Mixedematoso","Emergência","Terapia Intensiva","Hipotireoidismo"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-l3yfpb', 'approved', 17)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q19 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ska4sy', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual complicação cirúrgica imediata da tireoidectomia pode levar à obstrução respiratória aguda e morte se não for prontamente drenada?', '[{"id":"a","text":"Hematoma cervical expansivo sufocante."},{"id":"b","text":"Hipocalcemia por retirada das paratireoides."},{"id":"c","text":"Lesão bilateral do nervo laríngeo superior."},{"id":"d","text":"Crise asmática induzida pelo iodo."},{"id":"e","text":"Recorrência tumoral imediata."}]', 'a', 
        'O sangramento no espaço cervical após tireoidectomia pode formar um hematoma sob a fáscia profunda. Devido à rigidez das estruturas cervicais, o sangue comprime a traqueia (laringomalácia reacional) e causa asfixia mecânica imediata. A conduta é a abertura da ferida cirúrgica à beira do leito para descompressão e posterior retorno ao bloco cirúrgico.', '{"a":"Correta. Emergência pós-operatória crítica do cirurgião de cabeça e pescoço.","b":"Incorreta. Hipocalcemia causa parestesias e tetania (sinal de Chvostek/Trousseau), mas não obstrução respiratória mecânica súbita.","c":"Incorreta. A lesão do laríngeo superior altera a emissão de tons agudos. A lesão do RECORRENTE bilateral é que causa paralisia das cordas vocais em adução e estridor (obstrução alta).","d":"Incorreta. Raríssimo e não cursa com compressão cervical externa.","e":"Incorreta. Impossível."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ska4sy', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Cirurgia","Complicações","Emergência Post-Op","Hematoma"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ska4sy', 'approved', 18)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q20 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        '', '[{"id":"a","text":"Resistência generalizada aos hormônios tireoidianos (mutação no receptor TR-beta)."},{"id":"b","text":"Destruição da glândula tireoide por radiação nuclear."},{"id":"c","text":"Produção ectópica de hormônio tireoidiano por um tumor ovariano (Struma Ovarii)."},{"id":"d","text":"Insucesso na conversão periférica de T4 em T3 por deficiência de selênio."},{"id":"e","text":"Aumento do bócio causado por ingestão excessiva de mandioca branca."}]', 'a', 
        'Na Síndrome de Refetoff, os tecidos são resistentes à ação do hormônio tireoidiano. O resultado laboratorial é paradoxal: T4 Livre e T3 elevados, mas TSH também elevado ou normal (pois a hipófise também é resistente ao feedback negativo). O paciente pode estar clinicamente eutireoideo, hipotireoideo ou hipertireoideo (dependendo do grau de resistência em diferentes tecidos).', '{"a":"Correta. Doença genética de resistência hormonal.","b":"Incorreta. Trata-se de tireoidite actínica.","c":"Incorreta. Descrição de Struma Ovarii.","d":"Incorreta. Síndrome do Eutireoideo Doente ou defeitos nas deiodinases.","e":"Incorreta. Bócio endêmico bociogênico alimentar."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Resistência Hormonal","Refetoff","Endocrinologia","Tireoide"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-', 'approved', 19)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q21 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-nbjto4', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um homem de 58 anos, com diagnóstico de Carcinoma Folicular de Tireoide e metástases pulmonares funcionantes (captação de Iodo-131 na pesquisa de corpo inteiro), está em acompanhamento após tireoidectomia total. Ele apresenta níveis persistentes de Tireoglobulina (TG) de 150 ng/mL, apesar de múltiplas doses terapêuticas de Radioiodo. O último PET-CT com FDG demonstrou hipermetabolismo intenso nas lesões pulmonares, que deixaram de captar iodo. Qual a melhor conduta para este cenário de ''Doença Refratária ao Radioiodo''?', '[{"id":"a","text":"Iniciar inibidores de tirosina quinase multialvo (ITK), como o Lenvatinibe ou Sorafenibe."},{"id":"b","text":"Aumentar a dose de Radioiodo para 300 mCi e repetir em 3 meses."},{"id":"c","text":"Realizar quimioterapia sistêmica com Cisplatina e Doxorrubicina de resgate."},{"id":"d","text":"Suspender a Terapia Supressiva com Levotiroxina para sensibilizar as metástases."},{"id":"e","text":"Indicar radioterapia externa pulmonar bilateral profilática."}]', 'a', 
        'A perda da capacidade de captar iodo pelas metástases (fenômeno de desdiferenciação, evidenciado pelo ''mismatch'' entre PCI negativa e FDG-PET positivo) define a refratariedade ao radioiodo no câncer diferenciado de tireoide. Nestes casos, quando há progressão de doença radiológica em 12-14 meses, os inibidores de tirosina quinase (ITK) são a primeira linha de tratamento sistêmico aprovada, visando o controle da angiogênese e da sinalização celular tumoral.', '{"a":"Correta. Protocolo de tratamento sistêmico para câncer de tireoide radio-refratário.","b":"Incorreta. Doses cumulativas acima de 600 mCi ou ausência de captação contraindicam nova dose de iodo.","c":"Incorreta. Quimioterapia convencional tem baixíssima taxa de resposta no câncer de tireoide.","d":"Incorreta. A supressão do TSH deve ser mantida para evitar estímulo ao crescimento tumoral residual.","e":"Incorreta. A RTX externa não é indicada de forma profilática em bases pulmonares por toxicidade e baixa eficácia."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'nbjto4', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Câncer de Tireoide","Lenvatinibe","Radioiodo","Metástases"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-nbjto4', 'approved', 20)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q22 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4emyev', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma paciente de 22 anos, no quarto mês de gestação (16 semanas), apresenta-se com quadro de taquicardia, tremores, perda de peso e bócio difuso leve. Exames laboratoriais: TSH < 0,01 mUI/L, T4 Livre = 2,8 ng/dL (VR: 0,8-1,8) e TRAb (Anticorpo Antirreceptor de TSH) positivo. Considerando o tratamento da Doença de Graves durante a gestação no Brasil, qual a recomendação correta para o segundo e terceiro trimestres?', '[{"id":"a","text":"Trocar Propiltiomacil por Metimazol, dadas as preocupações com hepatotoxicidade materna no uso prolongado de Propiltiomacil."},{"id":"b","text":"Manter Metimazol durante toda a gestação, pois o risco de aplasia cutis é apenas teórico."},{"id":"c","text":"Realizar tireoidectomia total imediata, independentemente da idade gestacional."},{"id":"d","text":"Administrar Iodo Radioativo (I-131) para controle definitivo, pois não atravessa a placenta."},{"id":"e","text":"Suspender toda medicação antitireoidiana, pois a imunidade da gestante cura o Graves espontaneamente."}]', 'a', 
        'No tratamento da Doença de Graves gestacional, o Propiltiomacil (PTU) é a droga de escolha no primeiro trimestre devido ao risco de embriopatia pelo Metimazol (aplasia cutis, atresia de coanas). No entanto, a partir do segundo trimestre, recomenda-se a troca para o Metimazol (ou manutenção do PTU com cautela), pois o PTU está associado a um risco maior de hepatotoxicidade materna grave e fulminante se usado por longos períodos.', '{"a":"Correta. Protocolo de transição de antitireoidianos na gestação.","b":"Incorreta. Metimazol no 1º trimestre é sabidamente teratogênico.","c":"Incorreta. A cirurgia é reservada para casos graves/refratários, preferencialmente no 2º trimestre, mas não é a ''primeira escolha'' diagnóstica.","d":"Incorreta. O Iodo-131 é terminantemente proibido na gestação (risco de destruição da tireoide fetal).","e":"Incorreta. Embora os níveis de anticorpos possam cair, a suspensão sem eutireoidismo controlado causa risco de insuficiência cardíaca e abortamento."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4emyev', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Doença de Graves","Gestação","Metimazol","Teratogenicidade"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4emyev', 'approved', 21)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q23 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-nvm8pm', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Durante uma tireoidectomia total por bócio multinodular volumoso, o cirurgião identifica e preserva as glândulas paratireoides. No entanto, no primeiro dia pós-operatório, a paciente apresenta parestesias periorais e sinal de Chvostek positivo. Qual o mecanismo fisiopatológico mais provável e a conduta imediata?', '[{"id":"a","text":"Hipoparatireoidismo transitório por isquemia ou manipulação das paratireoides; administrar Gluconato de Cálcio endovenoso."},{"id":"b","text":"Tireotoxicose factícia por liberação de hormônios estocados; administrar Propranolol."},{"id":"c","text":"Crise tireotóxica aguda; realizar plasmaférese de urgência."},{"id":"d","text":"Paralisia crônica de pregas vocais; realizar traqueostomia."},{"id":"e","text":"Síndrome de DiGeorge adquirida; realizar transplante de timo."}]', 'a', 
        'O hipoparatireoidismo pós-operatório é a complicação mais comum da tireoidectomia total. Mesmo com a preservação anatômica, a manipulação ou a interrupção da delicada rede vascular das paratireoides (ramos da artéria tireóidea inferior) pode causar isquemia transitória e queda dos níveis de PTH, resultando em hipocalcemia sintomática (parestesias, sinais de Chvostek/Trousseau). O tratamento imediato é a reposição de cálcio venoso e oral.', '{"a":"Correta. Complicação pós-cirúrgica clássica e manejo agudo.","b":"Incorreta. A liberação de hormônios causaria sintomas de hipertireoidismo, não hipocalcemia.","c":"Incorreta. Quadro totalmente diferente da hipocalcemia pós-operatória.","d":"Incorreta. Lesão de nervo recorrente causa disfonia, não parestesia.","e":"Incorreta. DiGeorge é uma síndrome congênita de deleção cromossômica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nvm8pm', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Paratireoide","Hipocalcemia","Tireoidectomia","Complicações"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-nvm8pm', 'approved', 22)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q24 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9gflv2', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 50 anos apresenta um nódulo tireoidiano Bethesda IV (Suspeito para Neoplasia Folicular). Sabendo que o diagnóstico diferencial entre adenoma folicular e carcinoma folicular não pode ser feito pela citologia, qual o critério histopatológico definitivo encontrado apenas no Carcinoma Folicular?', '[{"id":"a","text":"Invasão capsular ou invasão vascular na análise da peça cirúrgica."},{"id":"b","text":"Presença de núcleos em vidro fosco ou fendas nucleares."},{"id":"c","text":"Atipia celular acentuada e alta taxa mitótica."},{"id":"d","text":"Células de Hürthle ocupando mais de 50% da lâmina."},{"id":"e","text":"Calcificações psamomatosas no estroma tumoral."}]', 'a', 
        'O Carcinoma Folicular de Tireoide exige, por definição, a demonstração de invasão da cápsula do nódulo pelo tumor ou a presença de invasão de vasos sanguíneos pericapsulares. Como a PAAF aspira apenas células isoladas (e não a cápsula inteira), ela não consegue diferenciar o adenoma do carcinoma, sendo necessária a tireoidectomia parcial ou total para o diagnóstico definitivo.', '{"a":"Correta. Diferencial patológico padrão viga-mestra.","b":"Incorreta. Achados típicos do Carcinoma Papilífero, não do Folicular.","c":"Incorreta. Atipias são comuns em ambos os tumores foliculares e não definem malignidade per se.","d":"Incorreta. Nódulos de células de Hürthle são uma variante, mas seguem o mesmo critério de invasão para malignidade.","e":"Incorreta. Corpos psamomatosos são típicos do Carcinoma Papilífero."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9gflv2', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Folicular","Bethesda IV","Patologia","Cirurgia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9gflv2', 'approved', 23)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q25 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9m8ar3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente feminina de 45 anos, com quadro de depressão, constipação severa, ganho de peso e pele seca. TSH = 52 mUI/L (VR: 0,4-4,5) e T4 Livre = 0,4 ng/dL (VR: 0,8-1,8). Além da reposição de Levotiroxina, qual anticorpo deve ser solicitado para confirmar a etiologia mais provável desta condição?', '[{"id":"a","text":"Anticorpo Anti-tireoperoxidase (Anti-TPO)."},{"id":"b","text":"Anticorpo Antirreceptor de TSH (TRAb)."},{"id":"c","text":"Anticorpo Antigliadina."},{"id":"d","text":"Anticorpo Antimusculo Liso."},{"id":"e","text":"Anticorpo Anti-tireoglobulina isolado."}]', 'a', 
        'O quadro de hipotireoidismo primário franco (TSH elevado com T4 livre baixo) em mulheres na meia-idade é, na maioria esmagadora dos casos, decorrente da Tireoidite de Hashimoto (tireoidite linfocítica crônica). O Anti-TPO é o marcador sorológico mais sensível e específico para esta condição autoimune, estando positivo em mais de 90-95% dos pacientes.', '{"a":"Correta. Marcador clássico da Tireoidite de Hashimoto.","b":"Incorreta. TRAb é marcador de Doença de Graves (hipertireoidismo).","c":"Incorreta. Relacionado à Doença Celíaca.","d":"Incorreta. Relacionado à Hepatite Autoimune.","e":"Incorreta. O anti-TG pode estar positivo, mas é menos sensível e específico que o anti-TPO para Hashimoto."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '9m8ar3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo","Hashimoto","Anti-TPO","Autoimunidade"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9m8ar3', 'approved', 24)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q26 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-o50xdi', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente idoso (75 anos), com história de fibrilação atrial crônica, desenvolve hipertireoidismo severo após o uso de Amiodarona (Tireotoxicose Induzida por Amiodarona - TIA). O Doppler cervical revela ausência de fluxo sanguíneo na tireoide (hipovascularidade). Qual o tipo de TIA provável e o tratamento de escolha?', '[{"id":"a","text":"TIA Tipo 2 (tireoidite destrutiva); uso de corticosteroides (Prednisona)."},{"id":"b","text":"TIA Tipo 1 (produção excessiva de hormônio); uso de Metimazol em altas doses."},{"id":"c","text":"Efeito Wolff-Chaikoff; suspender a medicação apenas."},{"id":"d","text":"Fenômeno Jod-Basedow agudo; realizar iodo radioativo imediato."},{"id":"e","text":"TIA Tipo Mista; combinar iodo e cirurgia de urgência."}]', 'a', 
        'A TIA Tipo 2 ocorre pela toxicidade direta da Amiodarona aos tireócitos, causando uma inflamação destrutiva e liberação de hormônios pré-formados (similar a uma tireoidite subaguda). Caracteriza-se por bócio ausente e Doppler com fluxo reduzido. Por ser um processo inflamatório, o tratamento eficaz é a corticoterapia sistêmica. Diferencia-se do Tipo 1 (que ocorre em glândulas já alteradas e tem fluxo aumentado), que responde melhor a antitireoidianos.', '{"a":"Correta. Diagnóstico e tratamento da TIA Tipo 2.","b":"Incorreta. TIA Tipo 1 teria fluxo aumentado no Doppler.","c":"Incorreta. Wolff-Chaikoff é o bloqueio da tireoide por excesso de iodo (hipotireoidismo), não hipertireoidismo.","d":"Incorreta. Jod-Basedow é o Tipo 1, mas o tratamento inicial é clínico.","e":"Incorreta. Conduta desnecessariamente agressiva para o Tipo 2 isolado."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'o50xdi', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Amiodarona","Efeitos Colaterais","Doppler","Tireotoxicose"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-o50xdi', 'approved', 25)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q27 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-bn6vjr', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma mulher de 62 anos apresenta nódulo tireoidiano de 2,2 cm, sólido e hipoecoico. TSH sérico é de 0,1 mUI/L (suprimido). Qual o próximo passo obrigatório na investigação diagnóstica desta paciente?', '[{"id":"a","text":"Cintilografia de tireoide (captação e mapeamento) para verificar se o nódulo é ''quente'' ou ''frio''."},{"id":"b","text":"Realizar PAAF imediatamente, independente do TSH."},{"id":"c","text":"Dosagem de Calcitonina sérica."},{"id":"d","text":"Iniciar Levotiroxina para suprimir o nódulo."},{"id":"e","text":"Realizar Tomografia Cervical com contraste iodado."}]', 'a', 
        'Em pacientes com nódulo tireoidiano e TSH suprimido, a conduta inicial é a cintilografia. Nódulos ''quentes'' (hipercaptadores) são raramente malignos e a PAAF deve ser evitada iniciais nestes casos, pois a citologia pode ser inconclusiva. Se o nódulo for ''frio'' (não captador), procede-se à investigação com PAAF se os critérios ultrassonográficos forem preenchidos.', '{"a":"Correta. Algoritmo padrão de nódulo com TSH baixo.","b":"Incorreta. PAAF em nódulo tóxico (quente) pode gerar resultados falso-positivos/indeterminados.","c":"Incorreta. Calcitonina não é recomendada de rotina no rastreio inicial de todos os nódulos.","d":"Incorreta. A reposição pioraria o hipertireoidismo subclínico/clínico já existente.","e":"Incorreta. O contraste iodado interferiria em diagnósticos e tratamentos futuros da tireoide."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'bn6vjr', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Nódulo de Tireoide","TSH","Cintilografia","Algoritmo"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-bn6vjr', 'approved', 26)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q28 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-sam92i', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente de 40 anos, com quadro de dor súbita e intensa na região anterior do pescoço que irradia para a mandíbula e ouvidos, associada a febre mal-estar. No exame físico: tireoide extremamente dolorosa ao toque. TSH = 0,05 mUI/L e Velocidade de Hemossedimentação (VHS) = 90 mm/h. Qual o diagnóstico e o provável agente etiológico prévio?', '[{"id":"a","text":"Tireoidite Subaguda de Quervain (granulomatosa); infecção viral prévia (ex: IVAS)."},{"id":"b","text":"Tireoidite Piógena Aguda; Staphylococcus aureus."},{"id":"c","text":"Tireoidite de Hashimoto; autoimunidade crônica."},{"id":"d","text":"Tireoidite de Riedel; infiltração fibrosa idiopática."},{"id":"e","text":"Bócio Multinodular Tóxico; mutação no receptor de TSH."}]', 'a', 
        'A Tireoidite de Quervain é caracterizada por dor tireoidiana severa e marcadores inflamatórios sistêmicos elevados (VHS muito alto). É tipicamente precedida por uma infecção viral das vias aéreas superiores. Evolui com uma fase de tireotoxicose inicial (por destruição folicular), seguida de hipotireoidismo transitório e recuperação funcional.', '{"a":"Correta. Quadro clínico e auditivo clássico de ''dor na tireoide''.","b":"Incorreta. A aguda supurativa é rara, causa leucocitose com desvio e sinais infecciosos localizados graves (abscesso).","c":"Incorreta. Hashimoto costuma ser indolor.","d":"Incorreta. Riedel causa bócio ''lenhoso'' e endurecido, raramente doloroso agudamente.","e":"Incorreta. Bócio multinodular não cursa com dor aguda e VHS de 90."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'sam92i', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoidite Subaguda","Quervain","Dor Cervical","Inflamação"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-sam92i', 'approved', 27)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q29 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-n1dkds', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Sinal de Pemberton (distensão das veias do pescoço e face avermelhada ao elevar os braços) é indicativo de:', '[{"id":"a","text":"Bócio mergulhante (extratorácico) causando compressão das estruturas do estreito superior do tórax."},{"id":"b","text":"Hipoalbuminemia severa."},{"id":"c","text":"Paralisia bilateral de nervo laringeo recorrente."},{"id":"d","text":"Insuficiência cardíaca esquerda descompensada."},{"id":"e","text":"Tireoidite linfocítica subaguda em fase de remissão."}]', 'a', 
        'O sinal de Pemberton é uma manobra diagnóstica para bócio intratorácico (mergulhante). Quando o paciente eleva os braços, o bócio ''mergulha'' mais profundamente no estreito superior, comprimindo a veia cava superior ou estruturas venosas adjacentes, gerando pletora facial e turgência jugular.', '{"a":"Correta. Semiologia clássica do bócio endotorácico.","b":"Incorreta. Causaria edema, mas não o sinal de Pemberton postural.","c":"Incorreta. Causa estridor e insuficiência respiratória obstrutiva aguda.","d":"Incorreta. A turgência jugular é fixa e não depende da elevação dos membros superiores desta forma.","e":"Incorreta. Sem relação anatômica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'n1dkds', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bócio","Semiologia","Sinal de Pemberton","Endocrinologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-n1dkds', 'approved', 28)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q30 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4jpgd3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em um paciente com Carcinoma de Tireoide bem diferenciado (Papilífero ou Folicular), qual o critério laboratorial de cura definitiva após a tireoidectomia total e ablação com Radioiodo?', '[{"id":"a","text":"Níveis de Tireoglobulina (TG) indetectáveis sob estímulo de TSH e ultrassonografia cervical negativa."},{"id":"b","text":"TSH permanentemente suprimido abaixo de 0,01 mUI/L."},{"id":"c","text":"Anticorpo Anti-tireoglobulina (Anti-TG) em níveis extremamente altos."},{"id":"d","text":"Idade superior a 45 anos na época do diagnóstico."},{"id":"e","text":"Níveis de Calcitonina indetectáveis."}]', 'a', 
        'A Tireoglobulina é produzida exclusivamente por tecido tireoidiano (normal ou neoplásico funcional). Após a retirada completa da glândula e ablação do remanescente com iodo, a presença de qualquer nível de TG indica persistência ou recorrência de doença. A cura é definida pela TG indetectável associada a exames de imagem (USG) limpos.', '{"a":"Correta. Marcador tumoral ideal para seguimento pós-tratamento radical.","b":"Incorreta. A supressão do TSH é parte do tratamento, não critério de cura clínica.","c":"Incorreta. O anti-TG deve estar baixo ou ausente, pois sua presença invalida a dosagem de TG por interferência metodológica.","d":"Incorreta. A idade é fator prognóstico no TNM, não critério de cura laboratorial.","e":"Incorreta. Calcitonina é marcador do carcinoma medular, não do diferenciado."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4jpgd3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Câncer de Tireoide","Tireoglobulina","Seguimento","Oncologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4jpgd3', 'approved', 29)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q31 (Part 2)
    
END c:UserskayquDesktopQrub1QRub;