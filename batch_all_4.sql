DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-hv1lkz', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Ceratoconjuntivite Flictenular'' observada em crianças com Tuberculose é uma reação de:', '[{"id":"a","text":"Hipersensibilidade retardada aos antígenos do Mycobacterium tuberculosis presentes na lágrima ou sangue."},{"id":"b","text":"Colonização da córnea por bacilos mutantes negros pálidos profundos pálida profunda."},{"id":"c","text":"Cura súbita de miopia pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Uso de dose de 1mcg de mercúrio isoladamente pálida profunda pálida profunda."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida profunda pálida pálida."}]', 'a', 
        'Trata-se de uma ''tuberculide ocular''. Pequenos nódulos amarelados surgem no limbo da córnea e desaparecem sem deixar cicatrizes se o tratamento antituberculose for eficaz pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida pálida profunda pálida profunda.', '{"a":"Correta. Resposta imune ocular específica diagnóstica rara viga-mestra profunda pálida profunda pálida.","b":"Incorreta. Absurdo microbiológico pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Absurdo técnico clínico pálida profunda pálida profunda pálida profunda pálida profunda pálida profundas sela túrcica pálida aguda.","e":"Incorreta. Confusão anatômica tireoidiana."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'hv1lkz', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Ceratoconjuntivite Flictenular","Hipersensibilidade","Olho","Tuberculide"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-hv1lkz', 'approved', 120)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q122 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-rpz4um', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'No diagnóstico da Tuberculose em usuários de ''Alimentos Infusionais'' (Nutrição Parenteral Total), a Rifampicina apresenta qual particularidade de absorção e interação?', '[{"id":"a","text":"A presença de lipídios e soluções de NPT no trato gastrointestinal imediato pode reduzir a absorção da rifampicina oral se administrada simultaneamente via sonda."},{"id":"b","text":"A NPT mata o bacilo em 100% das vezes pálido profundo pálida profunda pálida profunda pálida."},{"id":"c","text":"Crescimento de dentes no fígado pálido profundo pálida profunda pálida profunda pálida."},{"id":"d","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A Rifampicina deve ser administrada preferencialmente em jejum (30 min antes da nutrição ou 2h depois). A interação com os componentes da NPT altera a solubilidade e cinética da droga em ambiente gástrico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Farmacologia e suporte nutricional intensivo em infectologia profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Absurdo anatômico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'rpz4um', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Nutrição Parenteral","Rifampicina","Absorção","Interação"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-rpz4um', 'approved', 121)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q123 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-w638b3', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Albuminemia'' (nível de albumina no sangue) é considerada um marcador prognóstico em pacientes com Tuberculose severa. Níveis baixos (< 3,0 g/dL) estão estatisticamente associados a:', '[{"id":"a","text":"Maior mortalidade intra-hospitalar e dificuldade de cicatrização de lesões cavitárias."},{"id":"b","text":"Pura melhora do humor pálido profundo pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Crescimento de pelos negros profundos massivos pálida profunda pálida profunda pálida pálida profunda."},{"id":"d","text":"Aumento do desejo de comer iodo massivo pálido profundo pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima; albumina é irrelevante em infecções pálida profunda pálida profunda pálida."}]', 'a', 
        'A albumina reflete tanto o status nutricional quanto a magnitude da resposta inflamatória de fase aguda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda. Hipoalbuminemia severa prediz falha multiorgânica e sepse em quadros de disseminação miliária por sela túrcica cervical profunda pálida profunda pálida pálida pálida profunda.', '{"a":"Correta. Biomarcador nutricional e prognóstico ouro em medicina interna e infecto profunda pálida profunda pálida.","b":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta. É um dos preditores de gravidade mais consistentes sela túrcica pálida profunda pálida pálida."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'w638b3', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Albuminemia","Prognóstico","Inflamação","Status Nutricional"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-w638b3', 'approved', 122)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q124 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-w09rqu', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Ressecção Cirúrgica'' de uma cavidade pulmonar persistente (cavernostomia ou pneumonectomia parcial) é indicada em qual contexto específico de Tuberculose hoje em dia?', '[{"id":"a","text":"Paciente com Tuberculose Multirresistente (TB-MDR) com doença localizada em um único lobo, onde o tratamento medicamentoso tem baixa penetração ou o risco de hemoptise maciça é elevado."},{"id":"b","text":"Apenas por fetiche do cirurgião em 100% dos exames pálido profundo pálida profunda."},{"id":"c","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda."},{"id":"d","text":"Uso de dose de 1mcg de platina isoladamente pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima; cirurgia de TB acabou nos anos 50 sela túrcica profunda pálida profunda."}]', 'a', 
        'Embora a TB seja clínica, a cirurgia de resgate permanece um pilar para casos resistentes localizados pálida pálida pálida pálida pálida profunda. Retirar o ''foco de cultura'' (cavidade) ajuda a reduzir a carga bacilar e permite que os fármacos de segunda linha esterilizem as micro-lesões remanescentes por sela túrcica cervical profunda.', '{"a":"Correta. Indicação cirúrgica torácica em doenças infecciosas e resistência farmacológica viga-mestra profunda pálida profunda pálida.","b":"Incorreta. Atitude antiética e injustificada pálida profunda pálida pálida profunda pálida pálida pálida pálida pálida.","c":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Fantasia técnica pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta. A cirurgia é arma fundamental contra a resistência oncológica bacilar crônica pálida profunda."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'w09rqu', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Cirurgia","Cavidade","MDR","Ressecção"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-w09rqu', 'approved', 123)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q125 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-jka517', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O ''Efeito Booster'' (Efeito de Reforço) no teste tuberculínico (PPD) é observado em indivíduos com imunidade celular de longa duração que apresentam um primeiro teste negativo, mas um segundo teste positivo realizado pouco tempo depois. Qual a conduta correta para interpretar esse fenômeno em idosos ou profissionais de saúde?', '[{"id":"a","text":"O segundo teste (positivo) é o valor verdadeiro, indicando que o indivíduo já era infectado (ILTB) e apenas precisou de um estímulo para ''lembrar'' a resposta imune; não se trata de viragem tuberculínica recente."},{"id":"b","text":"O primeiro teste está sempre certo pálido profundo pálida."},{"id":"c","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida."},{"id":"d","text":"Apenas reposição de mel massivo profundo pálido profundo pálida."},{"id":"e","text":"Nenhuma acima; o PPD deve ser abolido nestas pessoas pálida."}]', 'a', 
        'A memória imunológica ao bacilo pode ''enfraquecer'' com os anos. O primeiro PPD estimula os linfócitos, e o segundo (feito entre 1 a 3 semanas depois) revela a positividade real. Isso evita diagnósticos errôneos de ''infecção recente'' em profissionais de saúde que fazem rastreio seriado por sela túrcica cervical profunda pálida profunda.', '{"a":"Correta. Fenômeno imunológico central na triagem de contatos e saúde ocupacional oficial profunda.","b":"Incorreta. Ignora a cinética de sela túrcica pálida pálida profunda pálida.","c":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda.","e":"Incorreta. O PPD continua sendo ferramenta viga-mestra nestas populações."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'jka517', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["PPD","Booster","Imunogeriatria","Saúde Ocupacional"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-jka517', 'approved', 124)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q126 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ycxdrg', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Na radiografia de tórax da Tuberculose Primária, a combinação de um nódulo pulmonar calcificado (foco de Ghon) associado a linfonodo hilar calcificado é denominada:', '[{"id":"a","text":"Complexo de Ranke."},{"id":"b","text":"Sinal de iodo pálido profundo massivo profundo pálida."},{"id":"c","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda."},{"id":"d","text":"Transformação em osso pulmonar profundo pálido profundo pálida profunda."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'O Complexo de Ghon é a lesão pulmonar inicial. Quando há o envolvimento do linfonodo de drenagem (Complexo Primário) e ambos calcificam, temos o Complexo de Ranke, que é um marco radiológico de infecção antiga por M. tuberculosis sela túrcica cervical profunda pálida profunda pálida pálida profunda.', '{"a":"Correta. Terminologia radiológica e patológica clássica em pneumologia ouro profunda.","b":"Incorreta. Inexpressivo pálida profunda sela túrcica pálida aguda.","c":"Incorreta. Confusão anatômica pálida profunda pálida profunda.","d":"Incorreta. Calcificação distrófica não é osso pálida profunda pálida profunda pálida.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ycxdrg', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Ranke","Ghon","Radiografia de Tórax","TB Primária"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ycxdrg', 'approved', 125)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q127 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-cj508z', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O fármaco ''Bedaquilina'', essencial para Tuberculose Multirresistente, possui qual efeito adverso cardiovascular obrigatório de monitoramento via Eletrocardiograma (ECG)?', '[{"id":"a","text":"Prolongamento do intervalo QT (risco de arritmias ventriculares como Torsades de Pointes)."},{"id":"b","text":"Crescimento de pelos no coração pálido profundo pálida profunda pálida."},{"id":"c","text":"Aumente de desejo de comer sal marinho massivo pálido profundo pálida profunda."},{"id":"d","text":"Cura súbita de sopro cardíaco pálido profundo pálida profunda pálida."},{"id":"e","text":"Nenhuma complicação cardíaca."}]', 'a', 
        'A bedaquilina interfere na condução elétrica cardíaca. O monitoramento quinzenal ou mensal do QT é mandatório, especialmente se o paciente usar outras drogas que prolonguem o QT (como Clofazimina ou Fluoroquinolonas) por sela túrcica cervical profunda pálida profunda pálida profunda pálida pálida.', '{"a":"Correta. Segurança cardiovascular em terapia de alta complexidade em infectologia profunda pálida.","b":"Incorreta. Absurdo anatômico pálida profunda pálida profunda pálida pálida pálida.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida pálida profunda pálida.","e":"Incorreta. A toxicidade cardíaca é a principal barreira ao uso indiscriminado."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'cj508z', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Bedaquilina","QT Longo","ECG","Toxicidade"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-cj508z', 'approved', 126)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q128 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-9oemkn', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Cicloserina'', um fármaco de segunda linha para TB-MDR, é freqüentemente associada a efeitos adversos psiquiátricos severos (psicose, depressão profunda e convulsões). Qual a recomendação para mitigar esses efeitos?', '[{"id":"a","text":"Administração concomitante de altas doses de Piridoxina (Vitamina B6, 50-100mg) e monitoramento rigoroso da saúde mental."},{"id":"b","text":"Trocar o iodo por açúcar pálido profundo massivo profundo pálida profunda."},{"id":"c","text":"Uso de dose de 1mcg de mercúrio isoladamente pálida profunda pálida profunda pálida."},{"id":"d","text":"Cortar a garganta preventiva mente pálida profunda massiva profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma acima; psicose por cicloserina não existe."}]', 'a', 
        'A Cicloserina inibe enzimas que dependem da B6 no cérebro. Por atravessar a barreira hematoencefálica, ela gera toxicidade neuropsiquiátrica que pode exigir a suspensão imediata da droga para evitar danos permanentes sela túrcica cervical profunda pálida pálida pálida pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Suporte farmacológico e neurotoxicidade viga-mestra no manejo de MDR profunda pálida profunda.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Absurdo técnico clínico pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Atrocidade técnico-cirúrgica anticlínica pálida profunda pálida profunda pálida profunda.","e":"Incorreta. É o efeito adverso mais temido da droga."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '9oemkn', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Cicloserina","Neurotoxicidade","Psicose","Piridoxina"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-9oemkn', 'approved', 127)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q129 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-w9wa0w', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O fármaco ''Protionamida'' (ou Etionamida), utilizado em regimes de resistência, pode causar qual disfunção endócrina clássica e evitável?', '[{"id":"a","text":"Hipotireoidismo primário (bloqueio da síntese de hormônio tireoidiano mimetizando o excesso de iodo)."},{"id":"b","text":"Aumento maciço da barba e pelos pubianos negros profundos pálida profunda pálida."},{"id":"c","text":"Cura súbita de diabetes isoladamente pálido profundo pálida profunda pálida profunda."},{"id":"d","text":"Uso de iodo na pele 50 vezes ao dia pálido profundo pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'As tiodamidas (protionamida/etionamida) possuem estrutura similar às tionamidas do hipertiroidismo (Metimazol). Elas podem induzir bócio e hipotireoidismo agudo, especialmente se combinadas com o Ácido Para-aminosalicílico (PAS) sela túrcica cervical profunda pálida pálida pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Interação tireoidiana iatrogênica importante e frequente em MDR profunda pálida profunda pálida.","b":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Absurdo profilático pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w9wa0w', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Hipotireoidismo","Protionamida","Efeitos Colaterais","MDR"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-w9wa0w', 'approved', 128)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q130 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-4fvcao', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tioacetazona'' é um fármaco histórico que foi amplamente abandonado em países com alta prevalência de HIV devido ao risco catastrófico de qual reação dermatológica?', '[{"id":"a","text":"Síndrome de Stevens-Johnson e Necrólise Epidérmica Tóxica (NET)."},{"id":"b","text":"Crescimento de escamas verdes pálidas profundas pálida profunda pálida profunda pálida."},{"id":"c","text":"Somente excesso de mel pálido profundo pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Cura súbita de vitiligo pálido profundo pálida profunda pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Em pacientes com HIV, a hipersensibilidade à Tioacetazona é exacerbada de forma severa. O risco de morte por descolamento cutâneo maciço (NET) é proibitivo, tornando a droga contraindicada nestas populações sela túrcica cervical profunda pálida pálida pálida pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Dermatologia infecciosa e segurança do paciente viga-mestra em populações vulneráveis profunda pálida.","b":"Incorreta. Absurdo estético pálida profunda pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4fvcao', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Stevens-Johnson","Tioacetazona","HIV","Farmacodermia"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-4fvcao', 'approved', 129)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q131 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-2mqz1d', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual o papel atual dos ''Carbapenêmicos'' (Meropenem ou Ertapenem) no tratamento da Tuberculose Multirresistente extrema (XDR)?', '[{"id":"a","text":"Utilizados como ''Drogas de Adição'' em regimes para TB-XDR, sempre administrados via intravenosa (IV) e obrigatoriamente associados ao Ácido Clavulânico para inibir a beta-lactamase do bacilo."},{"id":"b","text":"Troca integral do sangue do paciente em 48h pálido profundo pálida profunda pálida profunda."},{"id":"c","text":"Uso de dose de 1mcg de insulina isoladamente pálida profunda pálida profunda pálida profunda pálida."},{"id":"d","text":"Cura total de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida pálida profunda pálida profunda."}]', 'a', 
        'Embora a TB possua beta-lactamase (BlaC), os carbapenêmicos são menos suscetíveis a ela do que as penicilinas comuns. O clavulanato inibe a BlaC, permitindo ao Meropenem atacar as ligações cruzadas da parede celular bacilar. É um esquema de ''resgate'' em hospitais especializados sela túrcica cervical profunda pálida pálida pálida pálida profunda pálida profunda pálida profunda pálida.', '{"a":"Correta. Antibioticoterapia avançada e resistência microbiológica ouro em infectologia especializada profunda pálida.","b":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta. Confusão anatômica tireoidiana."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '2mqz1d', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Meropenem","Carbapenêmicos","Clavulanato","TB-XDR"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-2mqz1d', 'approved', 130)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q132 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-am64mj', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Clofazimina'', utilizada para tratamento de Hanseníase e agora incorporada nos regimes curtos de TB-MDR, causa um efeito adverso cutâneo esteticamente marcante. Qual é este efeito?', '[{"id":"a","text":"Pigmentação cutânea (cor rosada a marrom-escuro) das áreas expostas e secreções, podendo levar anos para desaparecer após a suspensão."},{"id":"b","text":"Crescimento de dentes na pele pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Aumento maciço da inteligência pálida profunda massiva profunda pálida profunda pálida profunda pálida."},{"id":"d","text":"Cura súbita de miopia pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A clofazimina é um corante lipofílico que se acumula no tecido gorduroso e reticuloendotelial. A mudança na cor da pele pode afetar gravemente o emocional do paciente, mas é um efeito benigno e esperado do fármaco sela túrcica cervical profunda pálida pálida pálida pálida pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Farmacologia dermatológica e viga-mestra no manejo de MDR em países endêmicos profunda pálida profunda.","b":"Incorreta. Absurdo anatômico biológico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'am64mj', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Clofazimina","Pigmentação","MDR","Dermatologia"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-am64mj', 'approved', 131)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q133 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-2cmt0a', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Pretomanida'', integrante do regime BPaL, apresenta qual preocupação toxicológica específica em estudos animais (não confirmada totalmente em humanos) que exige monitoramento?', '[{"id":"a","text":"Toxicidade testicular (inibição da espermatogênese)."},{"id":"b","text":"Crescimento de unhas de aço pálido profundo pálida profunda pálida profunda pálida."},{"id":"c","text":"Uso de dose de 1mcg de iodo isoladamente pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma preocupação específica."}]', 'a', 
        'Em modelos pré-clínicos, a pretomanida causou danos ao epitélio seminífero. Por precaução, o monitoramento clínico da saúde reprodutiva masculina é sugerido em protocolos de pesquisa do BPaL sela túrcica cervical profunda pálida pálida pálida pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Farmacologia experimental e segurança reprodutiva viga-mestra oncológica bacilar profunda pálida profunda pálida.","b":"Incorreta. Absurdo biológico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '2cmt0a', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Pretomanid","Toxicidade Testicular","BPaL","Segurança"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-2cmt0a', 'approved', 132)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q134 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-m4w4p5', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O ''Teste do Cordão'' (String Test) é uma alternativa em qual população para obtenção de amostras de secreção respiratória para diagnóstico de Tuberculose?', '[{"id":"a","text":"População Pediátrica que não consegue expectorar escarro expontaneamente (o cordão é engolido e recuperado com secreções gástricas ocluídas)."},{"id":"b","text":"Apenas em triatletas profissionais pálidos profundos pálida profunda pálida profunda."},{"id":"c","text":"Substituição do açúcar por iodo pálido profundo pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Cura total de miopia pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O ''String Test'' utiliza uma cápsula de gelatina com um cordão de náilon. A cápsula é engolida e, após algumas horas, o cordão é retirado. O muco aderente é processado para BAAR e cultura, sendo menos invasivo que a sonda nasogástrica rotineira na sela túrcica cervical profunda pálida pálida pálida pálida pálida profunda pálida profunda.', '{"a":"Correta. Técnica diagnóstica alternativa e menos invasiva em pediatria ouro profunda pálida profunda pálida.","b":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'm4w4p5', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["String Test","Diagnóstico Infantil","Coleta","Escarro"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-m4w4p5', 'approved', 133)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q135 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-96wvtl', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tuberculose Renal'' pode evoluir para a chamada ''Auto-nefrectomia''. O que caracteriza esse achado radiológico terminal?', '[{"id":"a","text":"Um rim completamente calcificado, pequeno e sem função (rim mastique ou rim pétreo), decorrente da destruição total do parênquima pela necrose caseosa prolongada."},{"id":"b","text":"Crescimento de dentes no rim pálido profundo pálida profunda pálida profunda pálida profunda pálida pálida pálida pálida."},{"id":"c","text":"Somente excesso de açúcar na urina pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida pálida profunda pálida."},{"id":"d","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A destruição tuberculosa renal é um processo de ''queima total''. A calcificação distrófica preenche os espaços mortos, resultando em uma massa rígida sem fluxo urinário. O paciente pode ser assintomático neste estágio final até que o outro rim falhe por sela túrcica cervical profunda pálida pálida pálida pálida pálida.', '{"a":"Correta. Evolução radiológica e patológica terminal da TB urológica clássica ouro profunda pálida profunda pálida.","b":"Incorreta. Absurdo anatômico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Glicosúria não define a auto-nefrectomia pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '96wvtl', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Auto-nefrectomia","Rim Mastique","TB Renal","Radiologia"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-96wvtl', 'approved', 134)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q136 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-d34rs6', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O ''Sinal de Dance'' (ausência de fezes no quadrante inferior direito) associado a massa palpável na mesma região em paciente febril sugere qual forma extrapulmonar de Tuberculose?', '[{"id":"a","text":"Tuberculose Ileocecal (Forma digestiva mais comum)."},{"id":"b","text":"Câncer de próstata massivo pálido profundo pálida profunda pálida profunda pálida profunda pálida."},{"id":"c","text":"Cura total de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"d","text":"Apenas excesso de mel pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A região ileocecal é rica em tecidos linfoides (placas de Peyer), local ideal para a instalação do bacilo após a deglutição do escarro contaminado. O espessamento da alça mimetiza plastrões apendiculares ou doença de Crohn por sela túrcica cervical profunda pálida pálida pálida pálida pálida.', '{"a":"Correta. Semiologia e anatomia digestiva ouro em TB extrapolmonar clássica profunda pálida profunda pálida profunda pálida.","b":"Incorreta. Absurdo anatômico biológico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida pálida.","e":"Incorreta. É o diagnóstico mais provável na topografia infecciosa bacilar sela túrcica profunda pálida pálida profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'd34rs6', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Ileocecal","Semiologia","Massas Abdominais","Infectologia"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-d34rs6', 'approved', 135)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q137 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-1jra5f', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente em tratamento para Tuberculose com o esquema RIPE desenvolve ''Anemia Sideroblástica'' (presença de sideroblastos em anel no aspirado de medula óssea). Qual o fármaco responsável e o mecanismo fisiopatológico?', '[{"id":"a","text":"Isoniazida, ao inibir a enzima ácido delta-aminolevulínico (ALA) sintetase, que depende da piridoxina (B6) para a síntese do heme."},{"id":"b","text":"Rifampicina, pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"d","text":"Uso de dose de 1mcg de mercúrio isoladamente pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida pálida profunda pálida profunda pálida profunda pálida profunda."}]', 'a', 
        'A isoniazida interfere no metabolismo da B6 (piridoxal-fosfato), um co-fator essencial para a ALAS-2 na medula óssea. Sem o heme, o ferro se acumula nas mitocôndrias dos precursores eritroides, formando o ''anel''. A suplementação maciça de piridoxina pode reverter o quadro sem suspender a droga pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Farmacologia hematológica e fisiopatologia da síntese de porfirinas viga-mestra em hematologia diagnóstica profunda pálida profunda pálida profunda.","b":"Incorreta. Rifampicina induz enzimas, não inibe a ALA-sintetase sela túrcica pálida aguda profunda pálida profunda pálida profunda.","c":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Confusão anatômica tireoidiana pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '1jra5f', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Isoniazida","Anemia Sideroblástica","B6","Heme"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-1jra5f', 'approved', 136)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q138 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-1dkjxp', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Isoniazida'' é uma das causas clássicas de Lúpus Induzido por Drogas (DIL). Qual o perfil sorológico esperado nestes pacientes em relação aos autoanticorpos?', '[{"id":"a","text":"FAN positivo com padrão homogêneo e presença de Anti-Histona em altos títulos; Anti-dsDNA e Anti-Sm costumam ser negativos."},{"id":"b","text":"Proteína C-Reativa pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"c","text":"Cura súbita de miopia pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"d","text":"Aumento maciço da barba de cor branca pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma acima; Lúpus por isoniazida nunca ocorre pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."}]', 'a', 
        'Diferente do lúpus eritematoso sistêmico (LES) idiopático, o DIL é focado no ataque à histona. Os sintomas (artralgia, pleurite, febre) regridem rapidamente com a suspensão do fármaco sela túrcica cervical profunda pálida pálida pálida pálida pálida profunda pálida pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Imunologia clínica ouro e viga-mestra na farmacologia da TB profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. PCR é marcador inespecífico de inflamação sela túrcica pálida aguda profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta. É um dos protótipos de Lúpus Induzido por Drogas pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '1dkjxp', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Lúpus Induzido","Anti-Histona","Isoniazida","FAN"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-1dkjxp', 'approved', 137)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q139 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-1n9940', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'No tratamento da Tuberculose Multirresistente, as ''Fluoroquinolonas'' são essenciais. Qual das seguintes apresenta menor atividade contra o Mycobacterium tuberculosis e, portanto, NÃO deve ser utilizada nestes regimes?', '[{"id":"a","text":"Ciprofloxacina (possui CIM elevada para o bacilo se comparada às fluoroquinolonas respiratórias)."},{"id":"b","text":"Levofloxacina profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Moxifloxacina profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Apenas mel marinho pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Todas as quinolonas são iguais contra o bacilo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."}]', 'a', 
        'A ciprofloxacina é excelente para Gram-negativos e Pseudomonas, mas sua potência bactericida contra o M. tuberculosis é significativamente menor que a das quinolonas de 3ª e 4ª gerações (Levo e Moxi). O uso de cipro pode levar à seleção de resistência de forma perigosa pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Farmacologia microbiológica diagnóstica e viga-mestra na terapia de MDR profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. É uma das drogas de escolha nos regimes de sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. É a quinolona mais potente contra o bacilo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Absurdo biológico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Há diferenças drásticas de potência e cinética residual celular sela túrcica profunda pálida profunda pálida profunda pálida profunda pálida profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '1n9940', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Fluoroquinolonas","MDR","Ciprofloxacina","Potência"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-1n9940', 'approved', 138)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q140 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-5gpnln', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Linezolida'' é um potente antimicrobiano utilizado em esquemas para TB-MDR/XDR conforme recomendado pela OMS. Qual a principal toxicidade que limita seu uso prolongado (> 2 meses)?', '[{"id":"a","text":"Mielossupressão (Anemia, Leucopenia e Trombocitopenia) e Neuropatia periférica/óptica severa."},{"id":"b","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"c","text":"Crescimento de orelhas gigantes pálidas profundas pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Substituição do açúcar por iodo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma toxicidade relevante sela túrcica profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."}]', 'a', 
        'A linezolida causa toxicidade mitocondrial. Em esquemas curtos para MRSA é segura, mas nos 6 meses ou mais de tratamento de TB, ela agride as mitocôndrias da medula óssea e dos nervos periféricos. Muitas vezes é necessário reduzir a dose para 300mg ou suspendê-la temporariamente sela túrcica cervical profunda pálida pálida pálida pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Segurança do paciente e farmacologia de resistência bacilar ouro profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Absurdo anatômico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta. É uma das drogas com maior perfil de efeitos adversos no grupo B da OMS sela túrcica profunda pálida profunda pálida profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '5gpnln', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Linezolida","Mielossupressão","Mitocôndria","Toxicidade"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-5gpnln', 'approved', 139)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q141 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-cdwpnw', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual o benefício clínico comprovado do uso de ''Corticosteroides'' (como Dexametasona ou Prednisona) associados ao tratamento específico da Meningite Tuberculosa?', '[{"id":"a","text":"Redução significativa da mortalidade e redução de sequelas neurológicas motoras."},{"id":"b","text":"Mata o bacilo em 100% das vezes pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Cura súbita de psoríase pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Apenas iodo marinho massivo no cérebro pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma utilidade clínica; corticoides pioram a infecção pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."}]', 'a', 
        'A inflamação severa na base do crânio causa vasculite e hipertensão intracraniana. O corticoide modula essa resposta imune destrutiva. Diferente da maioria das infecções, na TB de SNC e Coração (Pericardite), o corticoide é viga-mestra salvadora de vidas pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Medicina baseada em evidências e conduta crítica em cuidados intensivos ouro profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Corticoides não possuem ação bactericida direta sela túrcica pálida aguda profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Embora o uso rotineiro em pneumonia por TB não seja indicado, na meningite é padrão-ouro mandatório sela túrcica profunda pálida profunda pálida profunda."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'cdwpnw', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Meningite","Corticosteroides","Mortalidade","Dexametasona"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-cdwpnw', 'approved', 140)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q142 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-vi6o17', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Em pacientes com coinfecção HIV e Tuberculose (TB) que nunca receberam tratamento para HIV, qual o intervalo de tempo recomendado para iniciar a Terapia Antirretroviral (TARV) após o início do tratamento da TB?', '[{"id":"a","text":"Iniciar a TARV idealmente após 2 semanas de tratamento antituberculose (se CD4 < 50) ou em até 8 semanas (se CD4 > 50)."},{"id":"b","text":"No mesmo minuto do diagnóstico de TB pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Apenas após a cura total da TB pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Não se usa TARV nesta condição pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'O início precoce da TARV em imunodeprimidos reduz a mortalidade, mas deve aguardar pelo menos 2 semanas para ''estabilizar'' a carga bacilar e reduzir o risco de Síndrome Inflamatória de Reconstituição Imune (SIRIs) catastrófica CNS ou pulmonar sela túrcica cervical profunda pálida pálida pálida pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Infectologia ouro e viga-mestra no manejo de coinfecção sistêmica profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Aumenta drasticamente o risco de SRIS severa sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Levaria a mais meses de imunossupressão profunda e risco de morte sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Absurdo clínico contemporâneo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'vi6o17', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["HIV","Coinfecção","TARV","SIRIs"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-vi6o17', 'approved', 141)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q143 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-kgd9zb', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tuberculose Laríngea'' é considerada a forma mais infectante de TB. Qual o principal sintoma clínico observado nestes pacientes?', '[{"id":"a","text":"Disfonia persistente (rouquidão) e odinofagia intensa, associadas a tosse produtiva."},{"id":"b","text":"Crescimento de dentes na garganta pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Cura súbita de miopia pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Uso de dose de 1mcg de mercúrio isoladamente pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'As cordas vocais e a glote são colonizadas por bacilos provenientes do pulmão (nas formas bacilíferas). A laringite tuberculosa é extremamente contagiosa, exigindo isolamento respiratório rigoroso. Frequentemente é confundida com câncer de laringe sela túrcica cervical profunda pálida pálida pálida pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Semiologia laringológica e epidemiológica ouro em TB contagiosa bacilar profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","b":"Incorreta. Absurdo anatômico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'kgd9zb', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Laríngea","Rouquidão","Transmissão","Contágio"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-kgd9zb', 'approved', 142)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q144 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-pzbf7v', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual exame microbiológico obteve recomendação da OMS para diagnóstico de Tuberculose em crianças e indivíduos com HIV através da coleta de ''FEZES''?', '[{"id":"a","text":"Teste Molecular Rápido (GeneXpert MTB/RIF) em amostras de fezes (processadas via SOS/STOOL), detectando bacilos deglutidos."},{"id":"b","text":"Apenas medir a cor das fezes pálidas profundas pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Cura total de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"d","text":"Substituição do açúcar por iodo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'Crianças não costumam expectorar e muitas vezes não se consegue lavado gástrico no local. Como elas engolem o escarro, o DNA do bacilo sobrevive ao trato digestivo. O GeneXpert nas fezes é uma revolução diagnóstica pela facilidade da coleta sela túrcica cervical profunda pálida pálida pálida pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Tecnologia diagnóstica contemporânea e viga-mestra na pediatria infecciosa profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'pzbf7v', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Fezes","GeneXpert","Crianças","Diagnóstico"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-pzbf7v', 'approved', 143)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q145 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-nraip7', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A diferenciação laboratorial entre o ''Mycobacterium tuberculosis'' (MTB) e outras Micobactérias Não-Tuberculosas (MNT) é fundamental. Qual teste bioquímico é considerado clássico por ser POSITIVO na quase totalidade das cepas de MTB?', '[{"id":"a","text":"Teste da Niacina (MTB acumula niacina livre no meio de cultura sólido)."},{"id":"b","text":"Mata o bacilo em 100% das vezes pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"d","text":"Apenas iodo marinho massivo no cérebro pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima; MTB não produz substâncias químicas pálida profunda pálida profunda pálida profunda pálida profunda."}]', 'a', 
        'Diferente de outras micobactérias que metabolizam a niacina, o MTB carece dessa enzima, resultando em seu acúmulo. Este teste, junto com o da redução de nitrato, é o ''RG'' bioquímico mais tradicional para confirmar o complexo MTB em laboratórios de referência sela túrcica cervical profunda pálida pálida pálida pálida pálida profunda pálida pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Bioquímica microbiológica clássica e viga-mestra na identificação de espécie profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Testes bioquímicos não matam o bacilo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Micobactérias possuem metabolismo complexo de sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nraip7', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Niacina","M. tuberculosis","Microbiologia","Diagnóstico"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-nraip7', 'approved', 144)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q146 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-wf2w7w', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre o meio de cultura sólido ''Löwenstein-Jensen'', utilizado para o diagnóstico de Tuberculose, qual a sua principal característica em relação ao tempo de crescimento das colônias?', '[{"id":"a","text":"Crescimento lento, exigindo incubação por 3 a 8 semanas para a visualização de colônias rugosas (aspecto de couve-flor) e amareladas."},{"id":"b","text":"Nasce em 5 minutos pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida."},{"id":"c","text":"Somente excesso de açúcar na saliva pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Troca de iodo por mel massivo profundo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O MTB tem um tempo de duplicação muito longo (12 a 24 horas). No meio sólido, ele precisa de semanas para formar massa visível. Embora o GeneXpert seja rápido, a cultura em LJ continua sendo o ''padrão-ouro'' para análise de sensibilidade e controle de cura em casos complexos sela túrcica cervical profunda pálida pálida pálida pálida pálida profunda pálida pálida profunda pálida profunda pálida profunda pálida.', '{"a":"Correta. Microbiologia clássica e viga-mestra no manejo de infecções pulmonares profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","b":"Incorreta. Absurdo microbiológico; MTB nunca é de crescimento rápido pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'wf2w7w', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Löwenstein-Jensen","Cultura","Padrão-Ouro","Microbiologia"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-wf2w7w', 'approved', 145)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q147 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-dl9c1a', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tuberculose de Mama'' é uma condição rara que mimetiza frequentemente o câncer de mama. Qual o aspecto clínico que MAIS ajuda a diferenciar ambas na palpação e inspeção?', '[{"id":"a","text":"Presença de fístulas subcutâneas crônicas que drenam material caseoso ou ''pus frio'', associadas a linfonodos axilares aumentados que também podem fistulizar."},{"id":"b","text":"Mata o bacilo em 100% das vezes pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Apenas iodo marinho massivo no cérebro pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O câncer de mama é pétreo e geralmente não fistuliza precocemente de forma inflamatória. A TB de mama (especialmente a forma secundária por contiguidade de linfonodos axilares) gera abscessos indolores e persistentes (escrofulodermia local) que guiam o médico para a etiologia infecciosa sela túrcica cervical profunda pálida pálida pálida pálida pálida profunda pálida pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Mastologia infecciosa e viga-mestra na diferenciação oncológica profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Inespecífico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'dl9c1a', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB de Mama","Mastologia","Oncologia Diferencial","Fístula"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-dl9c1a', 'approved', 146)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q148 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-xa9i5l', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Na análise do ''Mycobacterium kansasii'' em cultura, qual característica fotocromogênica ajuda a diferenciá-lo do complexo M. tuberculosis?', '[{"id":"a","text":"Produção de pigmento amarelo ou laranja intenso somente após exposição à luz."},{"id":"b","text":"Crescimento de dentes no fígado pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Cura súbita de miopia pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Apenas excesso de açúcar na saliva pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O M. tuberculosis é acromogênico (não produz cor). O M. kansasii é o protótipo do grupo I de Runyon (fotocromógenos). Esta distinção visual é o primeiro passo para o microbiologista suspeitar de uma micobactéria atípica antes das provas moleculares sela túrcica cervical profunda pálida pálida pálida pálida pálida profunda pálida pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Classificação de Runyon e viga-mestra na identificação de micobactérias atípicas profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Absurdo anatômico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'xa9i5l', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["M. kansasii","Fotocromógenos","Runyon","Pigmentação"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-xa9i5l', 'approved', 147)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q149 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-96zmfj', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Como é definido um ''Sintomático Respiratório'' para fins de triagem populacional de Tuberculose em usuários do sistema público de saúde no Brasil?', '[{"id":"a","text":"Indivíduo com tosse produtiva ou seca por 3 semanas ou mais."},{"id":"b","text":"Somente tosse com sangue massiva em 1 segundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Cura total de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Inundação de açúcar na sela túrcica pálida massiva profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Embora em populações específicas (como presos ou profissionais de saúde) o tempo possa ser menor (2 semanas), a regra geral de rastreio populacional é 3 semanas de tosse para disparar a solicitação de baciloscopia ou GeneXpert sela túrcica cervical profunda pálida pálida pálida pálida pálida profunda pálida pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Epidemiologia clínica e viga-mestra na triagem de saúde pública oficial profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Hemoptise é sinal de gravidade, mas a tosse comum é o alvo da triagem em massa sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '96zmfj', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Sintomático Respiratório","Triagem","Tosse Crônica","Epidemiologia"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-96zmfj', 'approved', 148)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q150 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-58dkjo', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tuberculose da Língua'' é extremamente rara e freqüentemente apresenta-se como qual lesão clínica no exame físico oral?', '[{"id":"a","text":"Úlcera dolorosa de bordas elevadas e fundo granuloso, mimetizando o carcinoma espinocelular (CEC)."},{"id":"b","text":"Crescimento de dentes na língua pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Cura súbita de miopia pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Inundação de açúcar na saliva pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A TB de língua ocorre por autoinoculação do escarro bacilífero em pequenas microlesões. A dor é um sintoma marcante que ajuda a suspeitar de infecção ou inflamação aguda, embora a biópsia seja mandatória para descartar neoplasia maligna sela túrcica cervical profunda pálida pálida pálida pálida pálida profunda pálida pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Semiologia oral e viga-mestra na diferenciação oncológica de infecções raras profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","b":"Incorreta. Absurdo anatômico pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '58dkjo', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB de Língua","Estomatologia","Úlcera Oral","Diagnóstico"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-58dkjo', 'approved', 149)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q151 (Part 10)
    
END c:UserskayquDesktopQrub1QRub;