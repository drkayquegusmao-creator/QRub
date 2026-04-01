DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-h1zds7', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a alteração laboratorial clássica encontrada na ''Síndrome do Eutireoideo Doente'' (Non-thyroidal illness syndrome) em pacientes criticamente enfermos na UTI?', '[{"id":"a","text":"Níveis baixos de T3 total e livre, com TSH normal ou discretamente baixo e T3 reverso elevado."},{"id":"b","text":"T4 livre extremamente alto com TSH suprimido."},{"id":"c","text":"Hipotireoidismo primário severo com TSH > 100."},{"id":"d","text":"Inversão da relação T4/T3 sem alteração do TSH."},{"id":"e","text":"Aumento global de todos os hormônios tireoidianos devido ao estresse."}]', 'a', 
        'Em doenças graves sistêmicas, o corpo reduz o metabolismo basal alterando a conversão de T4 para T3 (diminuindo a deiodinase tipo 1 e aumentando a tipo 3). Isso resulta em níveis baixos de T3 (forma ativa) e acúmulo de T3 reverso (forma inativa). O TSH costuma permanecer na faixa da normalidade, o que diferencia de doenças intrínsecas da tireoide.', '{"a":"Correta. Perfil hormonal adaptativo clássico no estresse metabólico.","b":"Incorreta. Sugere hipertireoidismo real.","c":"Incorreta. Hipotireoidismo primário exige falha da glândula, não apenas estresse sistêmico.","d":"Incorreta. Ocorre alteração mas o T3 reverso é o ponto chave diagnóstica.","e":"Incorreta. Ocorre o oposto (economia de energia)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'h1zds7', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["UTI","Eutireoideo Doente","Fisiologia","T3 Reverso"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-h1zds7', 'approved', 30)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q32 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-thsf3b', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A tempestade tireotóxica (Crise Tireotóxica) é uma emergência médica com alta mortalidade. Qual fármaco, além dos antitireoidianos e betabloqueadores, deve ser utilizado para reduzir imediatamente a conversão periférica de T4 em T3 e o estresse adrenal associado?', '[{"id":"a","text":"Corticosteroides (ex: Dexametasona ou Hidrocortisona)."},{"id":"b","text":"Levotiroxina intravenosa."},{"id":"c","text":"Aspirina em altas doses."},{"id":"d","text":"Dobitaminina para suporte inotrópico de rotina."},{"id":"e","text":"Vitamina B12 intramuscular."}]', 'a', 
        'Na crise tireotóxica, o uso de corticoides é fundamental por dois motivos: 1) Em altas doses, inibem a conversão periférica de T4 (pouco ativo) em T3 (muito ativo); 2) Tratam uma possível insuficiência adrenal relativa causada pelo estado hipermetabólico extremo.', '{"a":"Correta. Pilar do tratamento da tempestade tireoidiana.","b":"Incorreta. Pioraria o quadro agudamente.","c":"Incorreta. Aspirina deve ser EVITADA, pois desloca os hormônios das proteínas transportadoras, aumentando o T4 livre circulante.","d":"Incorreta. Betabloqueadores são prioridade para controle adrenérgico.","e":"Incorreta. Sem papel na patogênese aguda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'thsf3b', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tempestade Tireotóxica","Manejo Emergencial","Corticosteroides","Endocrinologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-thsf3b', 'approved', 31)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q33 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8j6u0u', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente feminina, 38 anos, refere surgimento de bócio e sintomas de hipotireoidismo leve. A ultrassonografia mostra uma glândula heterogênea, hipoecoica com septos fibrosos (aspecto ''em girino'' ou reticulado). Qual o diagnóstico autoimune mais provável e qual o risco aumentado a longo prazo para o qual esta paciente deve ser monitorada?', '[{"id":"a","text":"Tireoidite de Hashimoto; risco aumentado de Linfoma de Tireoide (linfoma não-Hodgkin de células B)."},{"id":"b","text":"Doença de Graves; risco de orbitopatia infiltrativa severa."},{"id":"c","text":"Hipotireoidismo pós-cirúrgico; risco de hipoparatireoidismo permanente."},{"id":"d","text":"Tireoidite de Riedel; risco de fibrose retroperitoneal."},{"id":"e","text":"Bócio Multinodular; risco de câncer anaplásico fulminante."}]', 'a', 
        'A Tireoidite de Hashimoto apresenta um padrão ultrassonográfico característico de heterogeneidade e ecostrutura ''pseudonodular'' ou reticulada. Além do risco de hipotireoidismo crônico, esses pacientes possuem um risco relativo cerca de 40 a 80 vezes maior de desenvolver Linfoma Primário da Tireoide, embora a incidência absoluta ainda seja baixa.', '{"a":"Correta. Diagnóstico e complicação neoplásica específica associada.","b":"Incorreta. Graves causa bócio hipoecoico difuso, mas com hipervascularização (hell''s fire).","c":"Incorreta. Não houve relato de cirurgia.","d":"Incorreta. Riedel é extremamente rara e causa imagem endurecida e infiltrativa profunda.","e":"Incorreta. O anaplásico não tem predileção específica prévia majoritária pelo Hashimoto clínico típico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8j6u0u', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hashimoto","Linfoma","Ultrassonografia","Risco Neoplásico"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8j6u0u', 'approved', 32)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q34 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-szu9vl', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a conduta recomendada para um recém-nascido cujo ''Teste do Pezinho'' (triagem neonatal) revelou níveis elevados de TSH?', '[{"id":"a","text":"Confirmação laboratorial imediata com TSH e T4 livre venosos e início imediato de Levotiroxina (L-T4) se confirmados, para prevenir o cretinismo."},{"id":"b","text":"Aguardar 6 meses para verificar se houve maturação espontânea do eixo hipofisário."},{"id":"c","text":"Realizar apenas ultrassonografia abdominal para pesquisar malformações."},{"id":"d","text":"Substituir o aleitamento materno por fórmula sem soja."},{"id":"e","text":"Iniciar Iodo Radioativo para destruir o bócio fetal."}]', 'a', 
        'O Hipotireoidismo Congênito é a principal causa evitável de deficiência intelectual (mental retardation). O diagnóstico e início do tratamento nas primeiras 2 semanas de vida são cruciais para o desenvolvimento neurocognitivo normal da criança. Qualquer atraso no início da L-T4 pode levar a danos cerebrais permanentes irreversíveis (cretinismo).', '{"a":"Correta. Urgência diagnóstica e terapêutica em pediatria.","b":"Incorreta. Tempo excessivo que causaria dano neurológico permanente.","c":"Incorreta. O foco absoluto é a reposição hormonal tireoidiana.","d":"Incorreta. Aleitamento deve ser mantido, apenas se monitora a absorção se houver soja na dieta futura da criança.","e":"Incorreta. Absurdo clínico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'szu9vl', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Triagem Neonatal","Hipotireoidismo Congênito","Pediatria","Saúde Pública"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-szu9vl', 'approved', 33)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q35 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-c9igta', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 45 anos, com quadro de hipotireoidismo central (hipopituitarismo), deve iniciar reposição de Levotiroxina. Qual o cuidado fundamental antes de iniciar a hormonioterapia tireoidiana neste paciente?', '[{"id":"a","text":"Avaliar e tratar primeiro um eventual hipocortisolismo adrenal associado, para evitar uma crise adrenal aguda."},{"id":"b","text":"Realizar densitometria óssea devido ao risco de fraturas."},{"id":"c","text":"Dobrar a dose de Levotiroxina devido à falta de TSH estímulo."},{"id":"d","text":"Administrar GH (Hormônio do Crescimento) simultaneamente."},{"id":"e","text":"Realizar biópsia de medula óssea."}]', 'a', 
        'No hipotireoidismo secundário/central, outras deficiências hipofisárias podem coexistir (pan-hipopituitarismo). Se o paciente tiver deficiência de ACTH/cortisol não diagnosticada, o início da Levotiroxina aumentará o metabolismo basal e a depuração do pouco cortisol circulante, podendo desencadear uma crise adrenal aguda e choque circulante. Deve-se repor o corticoide antes da tiroxina.', '{"a":"Correta. Regra de segurança viga-mestra na endocrinologia.","b":"Incorreta. A preocupação aguda é a insuficiência adrenal.","c":"Incorreta. As doses seguem o cálculo por peso, monitoradas pelo T4 livre (já que o TSH não é confiável no central).","d":"Incorreta. GH não é prioridade imediata sobre a adrenal no adulto.","e":"Incorreta. Sem relação diagnóstica."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'c9igta', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Central","Insuficiência Adrenal","Segurança","Hipófise"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-c9igta', 'approved', 34)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q36 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ou345t', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A Orbitopatia de Graves é frequentemente agravada por qual hábito de vida do paciente?', '[{"id":"a","text":"Tabagismo."},{"id":"b","text":"Consumo excessivo de sal."},{"id":"c","text":"Sedentarismo."},{"id":"d","text":"Consumo de cafeína."},{"id":"e","text":"Uso de lentes de contato rígidas isolado."}]', 'a', 
        'O tabagismo é o principal fator de risco modificável para a Orbitopatia de Graves. Ele aumenta o risco de desenvolver a doença ocular em 7 a 8 vezes, diminui a resposta ao tratamento com corticoides e predispõe à progressão para as formas graves (neuropatia óptica compressiva).', '{"a":"Correta. Principal orientação preventiva no paciente com Graves.","b":"Incorreta. Piora o edema, mas não é o fator patogênico central como o tabaco.","c":"Incorreta. Sem relação direta comprovada.","d":"Incorreta. Pode causar tremores, mas não inflamação retro-orbitária mediada por anticorpos.","e":"Incorreta. Pode irritar a superfície ocular, mas a doença é sistêmica imunológica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ou345t', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Orbitopatia","Graves","Tabagismo","Oftalmologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ou345t', 'approved', 35)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q37 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ycut3q', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente feminina, 28 anos, apresenta nódulo tireoidiano de 1,2 cm em istmo. A citologia (PAAF) revela Bethesda III (Atipia de significado indeterminado). De acordo com os consensos atuais, qual a conduta inicial recomendada para esse nódulo?', '[{"id":"a","text":"Repetir a PAAF (Geralmente em 3 a 6 meses) ou realizar testes moleculares, se disponíveis."},{"id":"b","text":"Indicar tireoidectomia total imediata."},{"id":"c","text":"Realizar apenas seguimento com Tomografia Computadorizada."},{"id":"d","text":"Prescrever iodo para tentar reduzir o tamanho do nódulo."},{"id":"e","text":"Tratar como carcinoma papilífero de variantes agressiva."}]', 'a', 
        'Nódulos Bethesda III (AUS/FLUS) possuem um risco de malignidade entre 5-15%. A recomendação inicial é repetir a punção, pois em mais de 50-60% dos casos a repetição resulta em uma classificação benigna (Bethesda II), evitando cirurgias desnecessárias. Testes moleculares (ex: ThyroSeq, Afirma) ajudam a estratificar casos persistentes.', '{"a":"Correta. Algoritmo padrão de nódulos indeterminados.","b":"Incorreta. Conduta agressiva demais para baixo risco de câncer.","c":"Incorreta. TC não tem papel na diferenciação citológica.","d":"Incorreta. O excesso de iodo pode induzir hipertireoidismo (Jod-Basedow).","e":"Incorreta. Não há base citológica para essa afirmação."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ycut3q', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bethesda III","Nódulo de Tireoide","PAAF","Conduta"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ycut3q', 'approved', 36)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q38 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-98zlzo', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente em uso de Lítio para transtorno bipolar desenvolve hipotireoidismo. Como o Lítio ateta o metabolismo tireoidiano?', '[{"id":"a","text":"Inibe a liberação (secreção) dos hormônios tireoidianos pré-formados da glândula."},{"id":"b","text":"Destrói os receptores de TSH na hipófise."},{"id":"c","text":"Aumenta a excreção renal de T4 livre."},{"id":"d","text":"Neutraliza o iodo dietético no estômago."},{"id":"e","text":"Causa fibrose da glândula paratireoide, reduzindo a ativação hormonal."}]', 'a', 
        'O Lítio atua bloqueando a liberação de T4 e T3 dos folículos tireoidianos (efeito similar ao excesso de iodo). Isso pode levar ao bócio compensatório e hipotireoidismo clínico ou subclínico em até 10-20% dos pacientes em uso crônico. O tratamento é a reposição de levotiroxina sem necessariamente suspender o lítio se ele for essencial para a psiquiatria.', '{"a":"Correta. Mecanismo de ação farmacológica e endócrina.","b":"Incorreta. Não atua em receptores hipofisários desta forma.","c":"Incorreta. Sem relação com metabolismo renal de tiroxina.","d":"Incorreta. O efeito é intra-tireoidiano.","e":"Incorreta. A tireoide não é a paratireoide."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '98zlzo', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Lítio","Hipotireoidismo Iatrogênico","Mecanismo de Ação","Interações"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-98zlzo', 'approved', 37)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q39 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-dk02j7', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a tríade clássica da Síndrome de Pendred, uma condição genética que afeta a tireoide?', '[{"id":"a","text":"Bócio, surdez neurossensorial congênita e defeito de organificação do iodo (teste de perclorato positivo)."},{"id":"b","text":"Hipotireoidismo, polipose colônica e câncer de mama."},{"id":"c","text":"Hipertireoidismo, cegueira e macrocefalia."},{"id":"d","text":"Anemia, bócio e insuficiência renal."},{"id":"e","text":"Calcinose, fenômeno de Raynaud e dismotilidade esofágica."}]', 'a', 
        'A Síndrome de Pendred é causada por mutações no gene SLC26A4 (que codifica a pendrina, transportadora de iodo e cloreto). Manifesta-se por bócio (disormonogênese tireoidiana) e surdez severa devido a malformações na orelha interna (como alargamento do aqueduto vestibular).', '{"a":"Correta. Definição da síndrome genética endócrina.","b":"Incorreta. Descreve variantes da Síndrome de Cowden.","c":"Incorreta. Sem base sindrômica.","d":"Incorreta. Totalmente inespecífico.","e":"Incorreta. Descreve a Síndrome CREST (Esclerodermia)."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'dk02j7', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Síndrome de Pendred","Genética","Bócio","Surdez"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-dk02j7', 'approved', 38)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q40 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-brbryx', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um nódulo tireoidiano espongiforme (aparência em favo de mel em mais de 50% do volume do nódulo) à ultrassonografia é classificado como:', '[{"id":"a","text":"Altamente sugestivo de benignidade (Bethesda II / TI-RADS 2)."},{"id":"b","text":"Altamente suspeito de malignidade (Bethesda VI)."},{"id":"c","text":"Carcinoma Papilífero Variante Folicular."},{"id":"d","text":"Nódulo ''Frio'' funcional."},{"id":"e","text":"Metástase pulmonar intramamária."}]', 'a', 
        'Nódulos espongiformes são caracterizados por múltiplas pequenas áreas císticas separadas por septos finos. Este padrão é um dos sinais ultrassonográficos mais confiáveis de benignidade (nódulo coloide), apresentando risco de câncer menor que 1-3%.', '{"a":"Correta. Marco de benignidade na ultrassonografia de tireoide.","b":"Incorreta. Malignidade sugere nódulos hipoecoicos, margens irregulares e microcalcificações.","c":"Incorreta. A aparência não é espongiforme típica.","d":"Incorreta. A funcionalidade é avaliada pela cintilografia, não pela ecostrutura isoladamente.","e":"Incorreta. Sem nexo anatômico clínico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'brbryx', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Ultrassonografia","TI-RADS","Nódulo Espongiforme","Benignidade"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-brbryx', 'approved', 39)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q41 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-hpf2ct', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de bócio lingual (presença de tecido tireoidiano na base da língua) decorre de qual falha embriológica?', '[{"id":"a","text":"Ausência ou falha na descida da glândula tireoide pelo ducto tireoglosso até sua posição pré-traqueal definitiva."},{"id":"b","text":"Fusão prematura dos arcos branquiais 1 e 2."},{"id":"c","text":"Sobras de tecido da bolsa de Rathke."},{"id":"d","text":"Maliformação das artérias carótidas durante a oitava semana."},{"id":"e","text":"Agenesia de células da crista neural cervicais."}]', 'a', 
        'A tireoide se origina na base da língua (forame cego) e desce pelo pescoço durante a vida embrionária. Se esse processo falha, a tireoide pode se desenvolver em qualquer ponto do trajeto do ducto tireoglosso. O bócio lingual é a forma mais comum de tireoide ectópica, e frequentemente é o ÚNICO tecido tireoidiano funcional do paciente.', '{"a":"Correta. Explicação embriológica clássica.","b":"Incorreta. Arcos branquiais formam mandíbula e ouvido, não a descida tireoidiana.","c":"Incorreta. Origina a adenohipófise.","d":"Incorreta. Sem relação com a descida da glândula.","e":"Incorreta. Cristais neurais originam as células C (parafoliculares), não a estrutura glandular principal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hpf2ct', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Embriologia","Ectopia Tireoidiana","Bócio Lingual","Anatomia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-hpf2ct', 'approved', 40)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q42 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-15g0bx', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual fármaco é o antídoto utilizado para tratar o efeito de ''Escape'' da liberação hormonal tireoidiana ou a preparação pré-operatória rápida na Doença de Graves severa, utilizando o efeito Wolff-Chaikoff?', '[{"id":"a","text":"Solução de Lugol (iodo inorgânico)."},{"id":"b","text":"Gliconato de Cálcio."},{"id":"c","text":"Levotiroxina."},{"id":"d","text":"Dexametasona."},{"id":"e","text":"Propranolol."}]', 'a', 
        'A administração de altas doses de iodo inorgânico (Lugol ou solução saturada de iodeto de potássio - SSKI) bloqueia temporariamente a organificação do iodo e a liberação de hormônios tireoidianos (Efeito Wolff-Chaikoff). É usado para reduzir a vascularização glândular antes da tireoidectomia e para controlar agudamente a tireotoxicose severa pós-tratamento com antitireoidianos.', '{"a":"Correta. Uso terapêutico do bloqueio por iodo.","b":"Incorreta. Usado para hipocalcemia.","c":"Incorreta. Agrava o hipertireoidismo.","d":"Incorreta. Ajuda na conversão periférica, mas não é o agente do efeito Wolff-Chaikoff.","e":"Incorreta. Bloqueia os efeitos adrenérgicos periféricos apenas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '15g0bx', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Lugol","Wolff-Chaikoff","Hipertireoidismo","Preparo Cirúrgico"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-15g0bx', 'approved', 41)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q43 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-efo67w', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente de 42 anos submetida a tireoidectomia total apresenta no pós-operatório imediato estridor inspiratório e insuficiência respiratória progressiva. Foi descartado hematoma cervical compressivo. Qual a complicação nervosa mais provável?', '[{"id":"a","text":"Lesão bilateral do nervo laríngeo recorrente."},{"id":"b","text":"Lesão unilateral do nervo laríngeo superior."},{"id":"c","text":"Lesão do nervo frênico."},{"id":"d","text":"Edema de glote induzido por iodo profunda."},{"id":"e","text":"Trombose de veia jugular interna."}]', 'a', 
        'O nervo laríngeo recorrente é responsável pela abdução (abertura) das pregas vocais. Uma lesão bilateral deste nervo deixa as pregas vocais paradas na linha média, causando obstrução completa da via aérea superior (estridor e asfixia). É uma emergência cirúrgica que exige reintubação ou traqueostomia.', '{"a":"Correta. Complicação neurológica cirúrgica fatal se não manejada.","b":"Incorreta. Causa fadiga vocal e perda de tons agudos, mas não estridor.","c":"Incorreta. Causaria insuficiência ventilatória por paralisia diafragmática, mas não obstrução alta (estridor).","d":"Incorreta. Possível, mas menos comum que a causa traumática cirúrgica neste contexto imediato.","e":"Incorreta. Causa edema e dor, não estridor respiratório."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'efo67w', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Complicações Cirúrgicas","Nervo Recorrente","Estridor","Cirurgia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-efo67w', 'approved', 42)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q44 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-cbvdde', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente com Síndrome de Resistência ao Hormônio Tireoidiano (Síndrome de Refetoff) apresenta tipicamente qual perfil laboratorial?', '[{"id":"a","text":"TSH inapropriadamente normal ou elevado, associado a níveis altos de T4 e T3 livres."},{"id":"b","text":"TSH baixo com T4 e T3 baixos."},{"id":"c","text":"TSH > 100 com T4 indetectável."},{"id":"d","text":"Somente T3 elevado com T4 e TSH normais."},{"id":"e","text":"Ausência completa de proteínas transportadoras (TBG)."}]', 'a', 
        'Na resistência ao hormônio tireoidiano (geralmente por mutação no receptor Beta), a hipófise e os tecidos periféricos não ''sentem'' o hormônio circulante. Consequentemente, não há feedback negativo, e os níveis de TSH continuam altos ou normais mesmo com excesso de hormônio tireoidiano no sangue. O diferencial principal é com o adenoma hipofisário produtor de TSH (TSHoma).', '{"a":"Correta. Perfil laboratorial paradoxal característico.","b":"Incorreta. Descreve hipotireoidismo central.","c":"Incorreta. Descreve hipotireoidismo primário severo.","d":"Incorreta. Descreve a T3-toxicose, onde o TSH estaria suprimido.","e":"Incorreta. Alteraria o hormônio total, mas não o livre e o TSH simultaneamente desta maneira."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'cbvdde', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Síndrome de Refetoff","Resistência Hormonal","Fisiologia","Endocrinologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-cbvdde', 'approved', 43)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q45 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-eiwdzt', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A Tireoidite de Riedel é uma condição rara caracterizada por extrema fibrose da glândula e estruturas adjacentes. Atualmente, ela é considerada uma manifestação de qual doença sistêmica?', '[{"id":"a","text":"Doença relacionada à IgG4 (IgG4-Related Disease)."},{"id":"b","text":"Lúpus Eritematoso Sistêmico."},{"id":"c","text":"Esclerose Lateral Amiotrófica."},{"id":"d","text":"AIDS (SIV/HIV)."},{"id":"e","text":"Sarcoidose estádio IV."}]', 'a', 
        'A Tireoidite de Riedel faz parte do espectro das doenças esclerosantes sistêmicas mediadas por IgG4. Pode estar associada a outras fibroses, como a fibrose retroperitoneal, colangite esclerosante e fibrose pancreática. O diagnóstico é histopatológico e o tratamento inicial envolve corticoides ou tamoxifeno.', '{"a":"Correta. Paradigma atual da patogênese da tireoidite lenhosa.","b":"Incorreta. Não existe essa associação específica.","c":"Incorreta. Doença neurológica degenerativa motora.","d":"Incorreta. TB e pneumocistose podem atingir a tireoide no HIV, mas não Riedel.","e":"Incorreta. Sarcoidose é granulomatosa, não puramente fibrótica infiltrativa como a Riedel/IgG4."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'eiwdzt', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoidite de Riedel","IgG4","Fibrose","Infiltrativa"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-eiwdzt', 'approved', 44)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q46 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-901q74', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 35 anos apresenta hipogonadismo secundário, diminuição do campo visual (hemianopsia bitemporal) e um microadenoma hipofisário produtor de TSH (TSHoma) diagnosticado por ressonância magnética e perfil hormonal. Qual o achado laboratorial tireoidiano que confirma o TSHoma em detrimento da Síndrome de Resistência ao Hormônio Tireoidiano?', '[{"id":"a","text":"Níveis elevados de subunidade Alfa (alfa-GSU) e aumento da Tireoglobulina."},{"id":"b","text":"TSH baixo com T4 livre alto."},{"id":"c","text":"Somatomedina C (IGF-1) reduzida."},{"id":"d","text":"Prolactina indetectável."},{"id":"e","text":"Resposta exagerada do TSH após teste do TRH."}]', 'a', 
        'Ambas as condições apresentam TSH normal/alto com T4 livre alto. O TSHoma se diferencia pela produção autônoma da subunidade alfa das glicoproteínas (alfa-GSU) e pela ausência de resposta adequada no teste do TRH (o tumor é autônomo). Na resistência, o TSH costuma responder vigorosamente ao TRH e a relação alfa-GSU/TSH é normal.', '{"a":"Correta. Marcador bioquímico diferencial chave.","b":"Incorreta. Perfil de hipertireoidismo primário.","c":"Incorreta. Relacionado à deficiência de GH ou acromegalia.","d":"Incorreta. Adenomas hipofisários podem cursar com hiperprolactinemia por compressão da haste.","e":"Incorreta. Na resistência há resposta, no TSHoma geralmente não.","f":"Incorreta. Outra característica do TSHoma é o aumento de SHBG devido ao excesso de hormônio tireoidiano periférico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '901q74', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TSHoma","Neuroendocrinologia","Diagnóstico Diferencial","Hipófise"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-901q74', 'approved', 45)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q47 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-pwaggg', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A cintilografia de tireoide com captação de 24 horas está extremamente reduzida (< 2%) nos seguintes quadros clínicos, EXCETO:', '[{"id":"a","text":"Doença de Graves em atividade severa."},{"id":"b","text":"Tireoidite Subaguda de Quervain (fase inicial)."},{"id":"c","text":"Uso excessivo de iodo exógeno (amiodarona, contraste)."},{"id":"d","text":"Tireotoxicose factícia (ingestão inadvertida de Levotiroxina)."},{"id":"e","text":"Tireoidite Silenciosa (indolor)."}]', 'a', 
        'Na Doença de Graves, a glândula está hiperestimulada e hiperativa, apresentando CAPTAÇÃO ELEVADA de iodo (geralmente > 30-40% em 24h). Em todas as outras opções (inflamação destrutiva, excesso de iodo saturando a glândula ou ingestão exógena de hormônio que suprime o TSH), a captação de iodo pela glândula nativa é suprimida ou bloqueada.', '{"a":"Correta. Graves é a exceção (captação alta).","b":"Incorreta. A captação é baixa por destruição folicular.","c":"Incorreta. Bloqueio por saturação (Wolff-Chaikoff).","d":"Incorreta. O excesso de T4 suprime o TSH, que por sua vez não estimula a captação na glândula.","e":"Incorreta. Similar à Quervain (inflamação destrutiva)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'pwaggg', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Cintilografia","Captação de Iodo","Diferencial","Exames"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-pwaggg', 'approved', 46)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q48 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-74rnq4', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual o achado histológico patognomônico do Carcinoma Papilífero de Tireoide (CPT) que representa a formação de pequenos depósitos de cálcio concêntricos e laminados?', '[{"id":"a","text":"Corpos Psamomatosos (Psammoma bodies)."},{"id":"b","text":"Células Claros de Askanazy."},{"id":"c","text":"Cristais de Charcot-Leyden."},{"id":"d","text":"Granulomas de Langhans."},{"id":"e","text":"Ninhos de Malassezia."}]', 'a', 
        'Os corpos psamomatosos são calcificações distróficas laminadas concêntricas, frequentes no Carcinoma Papilífero (encontradas em até 50% dos casos). Sua presença no aspirado de PAAF ou na peça histológica é um sinal forte de CPT.', '{"a":"Correta. Hallmarks patológicos do papilífero.","b":"Incorreta. São células oncofílicas comuns no Hashimoto.","c":"Incorreta. Presentes em asma/eosinofilia.","d":"Incorreta. Típicos de tuberculose.","e":"Incorreta. Fungo da pele."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '74rnq4', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Psammoma","CPT","Histologia","Patologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-74rnq4', 'approved', 47)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q49 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-qzi1yp', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Mulher de 42 anos queixa-se de bócio indolor e fadiga. Exames: TSH = 10,2 mUI/L (VR: 0,4-4,5) e T4 Livre = 0,9 ng/dL (VR: 0,8-1,8). Anti-TPO positivo em altos títulos. Qual a conduta recomendada para este quadro de Hipotireoidismo Subclínico se a paciente desejar engravidar?', '[{"id":"a","text":"Iniciar Levotiroxina imediatamente, visando TSH < 2,5 mUI/L no período pré-concepcional."},{"id":"b","text":"Apenas observar e repetir TSH após o parto."},{"id":"c","text":"Realizar tireoidectomia profilática para evitar bócio fetal."},{"id":"d","text":"Iniciar Metimazol para suprimir a produção de anticorpos."},{"id":"e","text":"Prescrever apenas selênio e zinco, sem hormônios."}]', 'a', 
        'No hipotireoidismo subclínico, a recomendação de tratamento torna-se mais forte quando o TSH > 10, presença de anticorpos positivos ou planos de gestação. Em pacientes que desejam engravidar, o consenso é tratar para evitar complicações obstétricas (aborto, descolamento de placenta) e garantir o neurodesenvolvimento fetal, mantendo o TSH idealmente abaixo de 2,5.', '{"a":"Correta. Recomendação obstétrica endócrina clara.","b":"Incorreta. Conduta de alto risco para o feto.","c":"Incorreta. Totalmente desnecessária.","d":"Incorreta. Antitireoidianos piorariam o hipotireoidismo.","e":"Incorreta. A reposição hormonal é o tratamento definitivo e seguro."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'qzi1yp', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Subclínico","Gestação","Anti-TPO","Meta Terapêutica"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-qzi1yp', 'approved', 48)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q50 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-qohv78', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma Anaplásico de Tireoide (CAT) é um dos tumores mais agressivos da medicina. Qual a mutação detectada em cerca de 40-50% desses casos e que pode estar associada à progressão a partir de um carcinoma diferenciado pré-existente?', '[{"id":"a","text":"Mutação do gene p53 acompanhada de mutação BRAF V600E."},{"id":"b","text":"Mutações do gene BRCA1 e BRCA2."},{"id":"c","text":"Deleção do cromossomo 21."},{"id":"d","text":"Rearranjo RET/PTC3 apenas."},{"id":"e","text":"Mutação do receptor de estrogênio Beta."}]', 'a', 
        'O CAT frequentemente surge pela ''desdiferenciação'' de um carcinoma papilífero ou folicular prévio. Para que ocorra essa agressividade extrema, mutações de ''driver'' iniciais (como BRAF ou RAS) são acompanhadas de mutações de perda de função do gene supressor de tumor p53. É um tumor de crescimento rápido, invasivo e com péssimo prognóstico.', '{"a":"Correta. Mecanismo genético da desdiferenciação anaplásica.","b":"Incorreta. Relacionado a câncer de mama e ovário.","c":"Incorreta. Síndrome de Down.","d":"Incorreta. RET/PTC é clássico do papilífero.","e":"Incorreta. Sem papel causal importante no CAT."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'qohv78', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Anaplásico","p53","BRAF","Genética Tumoral"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-qohv78', 'approved', 49)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q51 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-s8wber', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 40 anos apresenta bócio nodular e bócio tóxico. Ao exame físico, apresenta hiperpigmentação cutânea nas áreas de exposição solar e fraqueza muscular proximal. Esta associação de hipertireoidismo com hiperpigmentação secundária à doença autoimune polidlandular deve levantar suspeita de:', '[{"id":"a","text":"Insuficiência Adrenal Primária associada (Doença de Addison na Síndrome Poliglandular Autoimune tipo 2)."},{"id":"b","text":"Tumor de Wilms primário."},{"id":"c","text":"Acromegalia descompensada."},{"id":"d","text":"Hepatite B viral ativa."},{"id":"e","text":"Sifilis Secundária."}]', 'a', 
        'A Doença de Graves pode vir acompanhada de outras doenças autoimunes (Síndrome de Schmidt ou SPA Tipo 2). A hiperpigmentação (pelo excesso de ACTH e MSH) associada à fraqueza e hipotensão (sugerida no contexto de bócio) deve alertar para falha adrenal. O tratamento da tireoide sem tratar a adrenal pode matar o paciente (Crise de Addison).', '{"a":"Correta. Associação clássica e perigosa na clínica médica.","b":"Incorreta. Tumor renal infantil.","c":"Incorreta. Causa traços grosseiros e bócio, mas não hiperpigmentação cutânea melânica típica.","d":"Incorreta. Causa icterícia, não hiperpigmentação adrenal.","e":"Incorreta. Manifesta-se com roséolas, não pigmentação persistente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 's8wber', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["SPA Tipo 2","Addison","Graves","Poliglandular"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-s8wber', 'approved', 50)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q52 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-h8e7pf', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal limitação do uso da cintilografia com Tecnécio-99m (Tc99m) em relação ao Iodo-131 na avaliação funcional de nódulos tireoidianos?', '[{"id":"a","text":"O Tecnécio avalia apenas a captação (trapping) e não a organificação, podendo resultar em ''nódulos quentes'' falso-positivos que são na verdade frios/malignos."},{"id":"b","text":"O Tecnécio tem meia-vida de 30 dias, sendo perigoso para o ambiente."},{"id":"c","text":"O Tecnécio é mais caro que o Iodo."},{"id":"d","text":"O Tecnécio não permite visualizar a tiróide."},{"id":"e","text":"Não existem limitações; o Tecnécio é superior em todos os aspectos."}]', 'a', 
        'Enquanto o Iodo é captado e organificado (incorporado à tireoglobulina), o Tecnécio entra na célula pelo mesmo transportador (NIS) mas não é organificado. Alguns tumores (como carcinomas papilíferos) podem manter a capacidade de captar (trapping) mas perder a de organificar. Assim, podem aparecer ''quentes'' no Tecnécio mas serem ''frios'' (não funcionais) na realidade biológica.', '{"a":"Correta. Fato técnico fundamental na medicina nuclear.","b":"Incorreta. Tem meia-vida curta (6 horas).","c":"Incorreta. É muito mais barato devido aos geradores hospitalares.","d":"Incorreta. Visualiza muito bem devido à radiação gama ideal.","e":"Incorreta. Existe a limitação biológica citada."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'h8e7pf', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tecnécio","Iodo-131","Cintilografia","Nódulo Quente"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-h8e7pf', 'approved', 51)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q53 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8v3k98', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente feminina, 30 anos, procura emergência com palpitações e bócio doloroso há 3 dias. Refere gripe há 1 semana. Exames: TSH < 0,05 mUI/L, T4 livre = 3,5 ng/dL, VHS = 105 mm/h. Ela deve receber qual das seguintes medicações como tratamento inicial dos sintomas adrenérgicos?', '[{"id":"a","text":"Propranolol e Anti-inflamatórios não esteroides (AINEs)."},{"id":"b","text":"Metimazol em altas doses associado a iodo."},{"id":"c","text":"Levotiroxina de urgência."},{"id":"d","text":"Heparina de baixo peso molecular."},{"id":"e","text":"Antibioticoterapia de amplo espectro por 14 dias."}]', 'a', 
        'Trata-se de Tireoidite de Quervain (Subaguda). O hipertireoidismo é por ''escape'' (destruição glandular), não por excesso de síntese. Logo, antitireoidianos (Metimazol) NÃO FUNCIONAM. O tratamento foca no controle da dor (AINEs ou Corticoides se severa) e dos sintomas de tireotoxicose (Betabloqueadores como Propranolol).', '{"a":"Correta. Manejo sintomático da fase aguda.","b":"Incorreta. Metimazol inibe a síntese, que já está baixa/normal na tireoidite.","c":"Incorreta. Faria sentido apenas na fase posterior de hipotireoidismo.","d":"Incorreta. Não há trombose envolvida.","e":"Incorreta. A causa é viral/imune pós-viral, não bacteriana (exceto na rara tireoidite aguda supurativa)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8v3k98', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoidite Subaguda","Quervain","Manejo Clínico","VHS"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8v3k98', 'approved', 52)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q54 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-qtogzs', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em pacientes com hipotireoidismo severo ou mixedema, a ocorrência de hiponatremia (sódio baixo) é atribuída principalmente a:', '[{"id":"a","text":"Diminuição da depuração de água livre devido ao excesso de secreção de ADH (vasopressina) e redução do débito cardíaco."},{"id":"b","text":"Perda urinária massiva de sal por resistência à aldosterona."},{"id":"c","text":"Ingestão compulsiva de água pura (polidipsia primária mixedematosa)."},{"id":"d","text":"Sudorese profusa induzida pelo coma."},{"id":"e","text":"Hiperuricemia interferindo com o túbulo coletor."}]', 'a', 
        'O hipotireoidismo grave causa redução do débito cardíaco e do fluxo plasmático renal, estimulando a liberação barorreflexa de ADH (hormônio antidiurético). Além disso, a carência de tiroxina reduz a capacidade de diluição urinária. Isso leva à retenção de água livre desproporcional ao sódio, gerando hiponatremia dilucional.', '{"a":"Correta. Mecanismo fisiopatológico endocrinológico clássico.","b":"Incorreta. Addison causa isso, o hipotireoidismo não.","c":"Incorreta. Mixedema causa bradipneumia/letargia, não polidipsia ativa.","d":"Incorreta. Mixedematosos têm pele seca e anidrose (não suam).","e":"Incorreta. Explicação sem nexo fisiopatológico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'qtogzs', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hiponatremia","Mixedema","ADH","Fisiopatologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-qtogzs', 'approved', 53)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q55 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ccujsm', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual o principal parâmetro de ultrassonografia que define um nódulo como TI-RADS 5 (Altamente Suspeito) de acordo com o ACR (American College of Radiology)?', '[{"id":"a","text":"Soma de pontos (7 ou mais) decorrentes de: sólido, hipoecoico, mais alto que largo, margens irregulares e microcalcificações."},{"id":"b","text":"Apenas o bócio mergulhante."},{"id":"c","text":"Nódulo puramente cístico."},{"id":"d","text":"Nódulo isoeico com halo fino."},{"id":"e","text":"Nódulo maior que 5 cm sem atipias."}]', 'a', 
        'O sistema TI-RADS do ACR atribui pontos a características ecográficas. A pontuação máxima e a categoria 5 (sugerindo malignidade > 80%) ocorrem quando o nódulo acumula achados como hipoecogenicidade acentuada, orientação vertical (taller-than-wide), focos ecogênicos pontuados (microcalcificações) e margens extratireoidianas ou irregulares.', '{"a":"Correta. Critérios diagnósticos radiológicos atuais.","b":"Incorreta. Bócio mergulhante é posição anatômica.","c":"Incorreta. Cistos simples são TI-RADS 1/2 (benignos).","d":"Incorreta. Sugere benignidade (nódulo coloide ou adenoma).","e":"Incorreta. Tamanho isolado não define TI-RADS 5."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ccujsm', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TI-RADS","Ultrassonografia","Câncer de Tireoide","Critérios"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ccujsm', 'approved', 54)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q56 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-p3540q', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 25 anos apresenta hipertireoidismo clínico severo. Além do TSH suprimido e T4 livre elevado, apresenta anticorpos anti-receptor de TSH (TRAb) positivos. Qual o sinal oftálmico patognomônico da Doença de Graves que permite o diagnóstico clínico mesmo sem o bócio?', '[{"id":"a","text":"Exoftalmia (proptose) associada a edema palpebral e retração palpebral (Sinal de Dalrymple)."},{"id":"b","text":"Cegueira noturna (nictalopia)."},{"id":"c","text":"Arco senil bilateral."},{"id":"d","text":"Hifema pós-traumático."},{"id":"e","text":"Anisocoria pupilar fixa."}]', 'a', 
        'A Orbitopatia de Graves é a manifestação extratireoidiana mais específica da doença. A retração palpebral e a proptose (devido ao aumento dos músculos extraoculares e gordura retro-orbitária por inflamação mediada por linfócitos e TRAb) são sinais que fecham o diagnóstico clínico da síndrome de Graves.', '{"a":"Correta. Sinal clínico autoritativo.","b":"Incorreta. Falta de Vitamina A.","c":"Incorreta. Dislipidemia.","d":"Incorreta. Sangue na câmara anterior do olho por trauma.","e":"Incorreta. Neurologia/Síndrome de Horner ou Horner."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'p3540q', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Graves","Exoftalmia","Semiologia","Oftalmopatia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-p3540q', 'approved', 55)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q57 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-y14l2n', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Anticorpos Monoclonais como o Teprotumumabe foram recentemente aprovados pelo FDA (embora ainda de difícil acesso no Brasil) para o tratamento de qual complicação tireoidiana?', '[{"id":"a","text":"Orbitopatia de Graves moderada a grave e ativa."},{"id":"b","text":"Carcinoma Anaplásico de Tireoide."},{"id":"c","text":"Tireoidite de Hashimoto resistente a reposição."},{"id":"d","text":"Mixedema congênito tardio."},{"id":"e","text":"Bócio intratorácico recidivante."}]', 'a', 
        'O Teprotumumabe é um anticorpo bloqueador do receptor do fator de crescimento semelhante à insulina 1 (IGF-IR). Ele demonstrou reduzir significativamente a proptose e a inflamação na orbitopatia de Graves, atuando diretamente no mecanismo patogênico da gordura e tecidos retro-orbitários.', '{"a":"Correta. Novidade terapêutica de ponta na endocrino-oftalmologia.","b":"Incorreta. CAT exige ITKs ou BRAF-inhibitors.","c":"Incorreta. Hashimoto não exige anticorpos monoclonais.","d":"Incorreta. Tratado com L-T4.","e":"Incorreta. Manejo cirúrgico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'y14l2n', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Teprotumumabe","Graves","Imunobiológicos","Tratamento"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-y14l2n', 'approved', 56)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q58 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-oyy4b0', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Ao realizar uma dosagem laboratorial, o clínico percebe que o paciente tem T3 e T4 TOTAIS muito elevados, porém o T4 e T3 LIVRES e o TSH são perfeitamente normais. O paciente está assintomático. Qual a causa provável?', '[{"id":"a","text":"Aumento da concentração de Proteína Transportadora de Tiroxina (TBG), geralmente por uso de estrogênios ou gravidez."},{"id":"b","text":"Hipertireoidismo subclínico severo."},{"id":"c","text":"Erro laboratorial por hemólise."},{"id":"d","text":"Câncer de Tireoide hiperprodutor de TBG."},{"id":"e","text":"Consumo excessivo de iodo na dieta (dieta japonesa)."}]', 'a', 
        'Hormônios ''totais'' medem a soma do hormônio livre (ativo) com o hormônio ligado às proteínas (inativo). Condições que aumentam a TBG (como anticoncepcionais orais, reposição de estrogênio ou excesso de produção hepática na gravidez) elevam o T4 Total, mas o feedback hipofisário regula apenas o T4 Livre. O paciente é eutireoidiano.', '{"a":"Correta. Armadilha diagnóstica clássica na interpretação de exames.","b":"Incorreta. Subclínico teria TSH alterado e livres normais.","c":"Incorreta. Hemólise não altera TBG seletivamente desta forma.","d":"Incorreta. TBG é produzida no fígado, não na tireoide.","e":"Incorreta. Alteraria o metabolismo hormonal, mas não a proteína de transporte de forma isolada."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'oyy4b0', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TBG","Hormônios Totais","Estrogênio","Laboratório"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-oyy4b0', 'approved', 57)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q59 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-xvdinn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O linfonodo pré-laríngeo, localizado sobre a membrana cricotireóidea e frequentemente envolvido em metástases de câncer de tireoide, é conhecido como:', '[{"id":"a","text":"Linfonodo de Delphian."},{"id":"b","text":"Linfonodo de Virchow."},{"id":"c","text":"Linfonodo da Irmã Maria José."},{"id":"d","text":"Linfonodo de Cloquet."},{"id":"e","text":"Linfonodo Sentinela Axilar."}]', 'a', 
        'O linfonodo de Delphian (nível VI cervical) situa-se anteriormente à laringe. No contexto de nódulo tireoidiano, sua palpação ou visualização por imagem como aumentado sugere fortemente cúpula para carcinoma papilífero ou câncer de laringe.', '{"a":"Correta. Anatomia cirúrgica e oncológica cervical.","b":"Incorreta. Supraclavicular esquerdo (metástase abdominal).","c":"Incorreta. Nódulo umbilical (carcinomatose peritoneal).","d":"Incorreta. Canal inguinal/femoral.","e":"Incorreta. Relacionado a mama/MMSS."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'xvdinn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Delphian","Metástase","Cirurgia","Anatomia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-xvdinn', 'approved', 58)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q60 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-drnmnp', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 18 anos apresenta nódulo tireoidiano Bethesda II (Benigno) e solicita a ablação do nódulo por razões estéticas, pois ele é protuberante. Além da cirurgia convencional, qual técnica minimamente invasiva pode ser utilizada, especialmente se o nódulo for predominantemente sólido?', '[{"id":"a","text":"Ablação por Radiofrequência (RFA) ou Laser."},{"id":"b","text":"Radioterapia externa holocraniana."},{"id":"c","text":"Lipoaspiração cervical focada."},{"id":"d","text":"Uso de gelo seco local por 30 dias."},{"id":"e","text":"Aplicação de Toxina Botulínica intraglândular."}]', 'a', 
        'Para nódulos benignos (confirmados por 2 PAAFs) que causam sintomas compressivos ou estéticos, a radiofrequência é uma alternativa segura à cirurgia, permitindo a redução térmica do nódulo sem cicatriz cervical significativa e preservando a função tireoidiana residual.', '{"a":"Correta. Técnica moderna e eficaz para nódulos benignos.","b":"Incorreta. Proibida pelo risco de câncer induzido por radiação.","c":"Incorreta. Não remove tecido glandular/nodular.","d":"Incorreta. Ineficaz e perigoso para a pele.","e":"Incorreta. Botox paralisa músculos, não reduz volume nodular."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'drnmnp', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Radiofrequência","RFA","Nódulo Benigno","Tratamento"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-drnmnp', 'approved', 59)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q61 (Part 3)
    
END c:UserskayquDesktopQrub1QRub;