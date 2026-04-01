DO $$
DECLARE
    p_id UUID := '5e29ffee-93e4-4924-8560-3137b82c6d00';
BEGIN
    -- Q1
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-q7r92m', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Um homem de 62 anos, hipertenso e tabagista, chega à emergência com dor precordial em aperto de forte intensidade, iniciada há 40 minutos em repouso, irradiada para o membro superior esquerdo e mandíbula, acompanhada de sudorese profusa. O eletrocardiograma (ECG) realizado na admissão (10 minutos após a chegada) revela supradesnivelamento do segmento ST de 3 mm nas derivações V1 a V4. O hospital dispõe de laboratório de hemodinâmica ativo. Qual a conduta imediata mais adequada conforme as diretrizes atuais para este paciente?', '[{"id":"a","text":"Realizar trombólise com Tenecteplase imediatamente na sala de emergência."},{"id":"b","text":"Encaminhar para Intervenção Coronariana Percutânea (ICP) primária, visando tempo porta-balão < 90 minutos."},{"id":"c","text":"Solicitar Troponina ultrassensível e aguardar o resultado para confirmar IAM antes de intervir."},{"id":"d","text":"Administrar apenas AAS e Clopidogrel e observar a evolução do ECG em 6 horas."},{"id":"e","text":"Realizar teste ergométrico de urgência para avaliar reserva coronariana."}]', 'b', 'O paciente apresenta um Infarto Agudo do Miocárdio com Supradesnivelamento do Segmento ST (IAMCSST) de parede anterior. Em hospitais com serviço de hemodinâmica disponível, a estratégia de reperfusão preferencial é a ICP primária, que deve ser realizada o mais rápido possível, idealmente com tempo porta-balão inferior a 90 minutos.', '{"a":"A trombólise é indicada apenas se o tempo estimado para ICP primária for superior a 120 minutos.","b":"Correta. Define a conduta padrão-ouro para reperfusão em centro especializado.","c":"No IAM com supra de ST, o diagnóstico é eletrocardiográfico e a reperfusão não deve ser atrasada aguardando marcadores de necrose.","d":"A terapia antiagregante é necessária, mas a prioridade absoluta é a reperfusão mecânica ou química.","e":"O teste de esforço é contraindicado na fase aguda da SCA."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'q7r92m', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["IAMCSST","ICP Primária","Reperfusão"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-q7r92m', 'approved', 0
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-q7r92m');

    -- Q2
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-k8m10p', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Uma paciente de 70 anos, diabética e renal crônica, apresenta quadro de desconforto retroesternal vago e náuseas há 4 horas. O ECG mostra inversão de onda T simétrica e profunda em parede anterior (V2-V4), sem supra ou infradesnivelamento de ST. A primeira troponina ultrassensível veio levemente alterada. O escore GRACE calculado foi de 142 (alto risco). Segundo a estratificação de risco da Síndrome Coronariana Aguda sem supra de ST (SCASSST), qual a estratégia de manejo invasivo recomendada?', '[{"id":"a","text":"Estratégia invasiva imediata (em até 2 horas)."},{"id":"b","text":"Estratégia invasiva precoce (em até 24 horas)."},{"id":"c","text":"Estratégia invasiva tardia (em até 72 horas)."},{"id":"d","text":"Tratamento conservador apenas com medicação oral, sem cateterismo."},{"id":"e","text":"Aguardar estabilização clínica por 1 semana antes de realizar exames invasivos."}]', 'b', 'Pacientes com SCASSST portadores de critérios de alto risco, como escore GRACE > 140, alterações dinâmicas de onda T ou elevação de troponina, devem ser submetidos à estratégia invasiva precoce, definida como a realização de cineangiocoronariografia em até 24 horas da admissão.', '{"a":"A estratégia imediata (< 2h) é reservada para instabilidade hemodinâmica, choque, dor refratária ou arritmias ventriculares graves.","b":"Correta. Aplica os critérios de ''Alto Risco'' do escore GRACE para definir o tempo do CAT.","c":"A estratégia em 72h é para risco intermediário (ex: escore GRACE entre 109-140).","d":"O alto risco exige estratificação invasiva obrigatória.","e":"O atraso aumenta o risco de eventos isquêmicos recorrentes."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'k8m10p', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["SCASSST","Escore GRACE","Cineangiocoronariografia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-k8m10p', 'approved', 1
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-k8m10p');

    -- Q3
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-w3v8n5', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'No tratamento farmacológico da Síndrome Coronariana Aguda, a dupla antiagregação plaquetária (DAPT) é fundamental. Qual dos seguintes inibidores do receptor P2Y12 é um pró-fármaco de ação irreversível, que possui início de ação mais rápido e maior potência em comparação ao clopidogrel, mas que é CONTRAINDICADO em pacientes com antecedente de Acidente Vascular Cerebral (AVC) ou Ataque Isquêmico Transitório (AIT)?', '[{"id":"a","text":"Ticagrelor."},{"id":"b","text":"Prasugrel."},{"id":"c","text":"Cangrelor."},{"id":"d","text":"Abciximabe."},{"id":"e","text":"Eptifibatide."}]', 'b', 'O Prasugrel é uma tienopiridina (pró-fármaco) de terceira geração. Embora seja superior ao clopidogrel na prevenção de eventos isquêmicos e trombose de stent (estudo TRITON-TIMI 38), ele cursa com maior risco de sangramento. Por isso, é contraindicado em pacientes com história de AVC/AIT prévios devido ao risco aumentado de hemorragia intracraniana.', '{"a":"O Ticagrelor é um inibidor reversível e não é um pró-fármaco. Sua contraindicação principal é hemorragia intracraniana prévia, mas não AIT/AVC isquêmico per se.","b":"Correta. Identifica a droga e sua restrição de segurança específica baseada em evidência.","c":"O Cangrelor é de uso intravenoso e ação ultrarrápida.","d":"O Abciximabe é um inibidor da glicoproteína IIb/IIIa.","e":"O Eptifibatide também é um inibidor IIb/IIIa."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'w3v8n5', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["DAPT","Prasugrel","Contraindicações"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-w3v8n5', 'approved', 2
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-w3v8n5');

    -- Q4
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-p1x2z9', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Um paciente de 55 anos, no 4º dia pós-infarto agudo do miocárdio de parede anterior extenso, evolui com insuficiência cardíaca súbita, dispneia intensa e novo sopro holossistólico rude em borda esternal esquerda inferior, acompanhado de frêmito. O ecocardiograma à beira-leito confirma a suspeita clínica. Qual é a complicação mecânica mais provável?', '[{"id":"a","text":"Insuficiência Mitral por ruptura de músculo papilar."},{"id":"b","text":"Ruptura de Septo Interventricular (CIV pós-IAM)."},{"id":"c","text":"Ruptura de parede livre do ventrículo esquerdo com tamponamento cardíaco."},{"id":"d","text":"Aneurisma de ventrículo sinistro."},{"id":"e","text":"Pericardite de Dressler."}]', 'b', 'A ruptura de septo interventricular (CIV) ocorre tipicamente entre o 3º e 5º dia pós-infarto (fase de amolecimento do tecido necrótico). Manifesta-se com sopro holossistólico em borda esternal esquerda (diferente do sopro de insuficiência mitral que irradia para axila) e frêmito, culminando em choque cardiogênico biventricular.', '{"a":"A ruptura de papilar causa insuficiência mitral aguda com sopro em ápice irradiado para axila, sem frêmito em borda esternal.","b":"Correta. Localiza a anatomia do sopro e o tempo cronológico da complicação mecânica.","c":"A ruptura de parede livre geralmente causa morte súbita por tamponamento ou atividade elétrica sem pulso (AESP).","d":"O aneurisma é uma complicação tardia que causa supra de ST persistente.","e":"A síndrome de Dressler é uma pericardite autoimune tardia (semanas após o IAM)."}',
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'p1x2z9', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Complicações Mecânicas","CIV pós-IAM","Semiologia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-p1x2z9', 'approved', 3
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-p1x2z9');

    -- Q5
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-m6n9u4', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Um paciente tabagista pesado, com 45 anos, apresenta episódios recorrentes de dor precordial em repouso, de curta duração, que ocorrem predominantemente durante a madrugada. O ECG realizado durante a crise mostra elevação transitória do segmento ST que normaliza completamente após o uso de nitrato sublingual ou cessação do esforço (embora a dor seja de repouso). O cateterismo cardíaco não revela obstruções fixas significativas. Qual é o diagnóstico e o tratamento farmacológico de escolha?', '[{"id":"a","text":"Infarto com supra de ST clássico; ICP primária."},{"id":"b","text":"Angina de Prinzmetal (Vasoespástica); Bloqueadores dos Canais de Cálcio (BCC) e Nitratos."},{"id":"c","text":"Miocardite aguda; Suporte e AINEs."},{"id":"d","text":"Angina Estável; Betabloqueadores em doses altas."},{"id":"e","text":"Dissecção de aorta; Cirurgia de urgência."}]', 'b', 'A Angina de Prinzmetal é caracterizada por vasoespasmo coronariano episódico. O supra de ST é transitório e ocorre em repouso. O tratamento foca no relaxamento da musculatura lisa vascular com bloqueadores dos canais de cálcio e nitratos. Betabloqueadores puros devem ser evitados, pois podem exacerbar o espasmo por oposição dos receptores beta-2 vasodilatadores.', '{"a":"O supra é transitório e as coronárias são lisas, descartando obstrução aterosclerótica.","b":"Correta. Define a patologia vasoespástica e a terapia correta (BCC).","c":"Miocardite não costuma causar supra de ST transitório cíclico na madrugada.","d":"Betabloqueadores são perigosos nesta patologia por causarem alfa-estimulação paradoxal.","e":"A dor de dissecção é lancinante e irradia para o dorso, com imagem tomográfica característica."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'm6n9u4', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Prinzmetal","Vasoespasmo","BCC"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-m6n9u4', 'approved', 4
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-m6n9u4');

    -- Q6
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-t4o8p2', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Um homem de 50 anos apresenta-se com dor torácica de início recente. O ECG de admissão revela ritmo de fibrilação atrial e infradesnivelamento do segmento ST > 1 mm em 6 ou mais derivações, associado a supradesnivelamento do segmento ST em aVR. Clinicamente, o paciente encontra-se em Killip IV (choque cardiogênico). Este achado eletrocardiográfico sugere acometimento de qual estrutura coronariana?', '[{"id":"a","text":"Artéria Coronária Direita (ACD)."},{"id":"b","text":"Tronco da Coronária Esquerda (TCE) ou doença triarterial grave."},{"id":"c","text":"Artéria Circunflexa (Cx)."},{"id":"d","text":"Ramos Diagonais da Descendente Anterior."},{"id":"e","text":"Artéria Marginal da Circunflexa."}]', 'b', 'O padrão de infradesnivelamento generalizado do ST com supra de ST em aVR (ou V1) em um contexto de choque cardiogênico é um sinal de alarme para lesão obstrutiva grave no Tronco da Coronária Esquerda (TCE) ou isquemia global por doença multiarterial. Trata-se de uma emergência cirúrgica ou hemodinâmica absoluta.', '{"a":"A ACD causa supra em parede inferior (DII, DIII, aVF).","b":"Correta. Identifica o padrão eletrocardiográfico de ''lesão de tronco''.","c":"A Cx isolada pode ser ''eletricamente muda'' ou causar alterações laterais/inferolaterais.","d":"A DA causa supra em parede anterior.","e":"Alterações localizadas laterais."}',
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 't4o8p2', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["ECG","Tronco de Coronária","aVR"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-t4o8p2', 'approved', 5
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-t4o8p2');

    -- Q7
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-r8x1u6', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'A estratificação de risco através do escore HEART (History, ECG, Age, Risk factors, Troponin) tem sido amplamente utilizada na sala de emergência para triagem de dor torácica. Qual a conduta recomendada para um paciente com pontuação 0 a 3 no escore HEART?', '[{"id":"a","text":"Internação imediata em Unidade Coronariana (UCO)."},{"id":"b","text":"Realização de Angiotomografia de Coronárias em até 6 horas."},{"id":"c","text":"Alta hospitalar precoce e seguimento ambulatorial, dado o baixíssimo risco de MACE (Major Adverse Cardiac Events) em 30 dias."},{"id":"d","text":"Indicação direta de cateterismo cardíaco."},{"id":"e","text":"Administração de heparina de baixo peso molecular por 48 horas."}]', 'c', 'O escore HEART foi validado para identificar pacientes de baixo risco (0-3 pontos) que podem ser liberados da emergência com segurança, apresentando taxa de eventos cardíacos maiores em 30 dias inferior a 1%.', '{"a":"Reservado para HEART >= 7.","b":"Pode ser usado em risco intermediário (HEART 4-6) para definição diagnóstica.","c":"Correta. Define o limiar de segurança para alta hospitalar em dor torácica não traumática.","d":"Indicado para alto risco ou diagnóstico confirmado de SCA.","e":"Terapia anticoagulante exige diagnóstico de SCA ou alto risco isquêmico."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'r8x1u6', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Escore HEART","Emergência","MACE"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-r8x1u6', 'approved', 6
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-r8x1u6');

    -- Q8
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-f4v2h9', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Durante um IAM com supradesnivelamento de ST de parede inferior (DII, DIII, aVF), o paciente evolui com bradicardia sinusal (FC 40 bpm) e hipotensão arterial severa. O exame físico não revela estertores crepitantes, mas há turgência jugular patológica. Qual a derivação adicional deve ser solicitada e qual a conduta imediata evitar?', '[{"id":"a","text":"V1 e V2; evitar nitratos."},{"id":"b","text":"V3R e V4R; evitar nitratos e diuréticos, pois pode haver infarto de Ventrículo Direito (VD)."},{"id":"c","text":"V5 e V6; evitar betabloqueadores."},{"id":"d","text":"V7 e V8; evitar aspirina."},{"id":"e","text":"ECG de 12 derivações padrão é suficiente; evitar atropina."}]', 'b', 'O infarto inferior frequentemente associa-se ao infarto de VD. O quadro de hipotensão com pulmões limpos (sem congestão) e turgência jugular é clássico. O diagnóstico é feito com derivações à direita (V3R/V4R). Nestes casos, o VD depende criticamente da pré-carga para manter o débito; logo, nitratos, diuréticos e morfina são perigosos por causarem venodilatação e colapso hemodinâmico.', '{"a":"V1 e V2 avaliam o septo.","b":"Correta. Identifica a necessidade de derivações direitas e a contraindicação de drogas que baixam a pré-carga no infarto de VD.","c":"Avaliam a parede lateral.","d":"Avaliam a parede posterior.","e":"O infra de ST isolado em V1-V3 pode sugerir infarto posterior (imagem em espelho), exigindo V7-V8, mas o quadro hemodinâmico citado é de VD."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'f4v2h9', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Infarto de VD","Derivações Direitas","Pré-carga"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-f4v2h9', 'approved', 7
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-f4v2h9');

    -- Q9
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-l3p9k1', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'A Síndrome de Wellens é um padrão eletrocardiográfico na Síndrome Coronariana Aguda sem supra de ST que indica uma obstrução crítica em qual artéria coronária, alertando para alto risco de infarto extenso se não houver intervenção precoce?', '[{"id":"a","text":"Coronária Direita."},{"id":"b","text":"Tronco da Coronária Esquerda."},{"id":"c","text":"Artéria Descendente Anterior (DA) proximal."},{"id":"d","text":"Artéria Circunflexa."},{"id":"e","text":"Ramo Marginal da Circunflexa."}]', 'c', 'A Síndrome de Wellens apresenta dois padrões de ondas T em precordiais (V2-V3): T bifásica (Tipo A) ou T invertida profunda e simétrica (Tipo B), na ausência de supra de ST e com troponinas muitas vezes normais ou pouco elevadas. Este achado é preditor de lesão proximal grave da Descendente Anterior.', '{"a":"O infra de ST em DII, DIII e aVF sugere lesão de ACD.","b":"Tronco causa supra em aVR.","c":"Correta. Reconhece o epônimo e a correlação anatômica crítica da DA proximal.","d":"A Cx cursa com ECG vago.","e":"N/A."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'l3p9k1', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Wellens","Descendente Anterior","Isquemia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-l3p9k1', 'approved', 8
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-l3p9k1');

    -- Q10
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-b6x2h5', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Qual o critério de reperfusão bem-sucedida mais fidedigno e independente após a administração de fibrinolítico em um paciente com IAM com supra de ST?', '[{"id":"a","text":"Redução do supradesnivelamento do segmento ST > 50% em 60 a 90 minutos."},{"id":"b","text":"Pico precoce de Creatinofosfoquinase-MB (CPK-MB) em 24 horas."},{"id":"c","text":"Ausência completa de dor torácica imediatamente após a infusão."},{"id":"d","text":"Ocorrência de arritmia acelerada idioventricular (AIVA)."},{"id":"e","text":"Inversão da onda T em menos de 4 horas."}]', 'a', 'O critério eletrocardiográfico de redução de mais de 50% (ou 70%, dependendo da diretriz) do maior supradesnivelamento observado no ECG pré-trombólise é o marcador clínico-laboratorial mais robusto de reperfusão do lúmen coronariano. A AIVA (opção D) também é um sinal de reperfusão, mas a resolução do ST é o padrão-ouro clínico.', '{"a":"Correta. Define o parâmetro quantitativo de sucesso da fibrinólise.","b":"O pico precoce é sinal de reperfusão, mas ocorre mais tarde que a resolução do ST.","c":"A dor pode ceder sem reperfusão completa (por analgesia ou morfina).","d":"A AIVA é específica, mas menos frequente como critério isolado do que a redução do ST.","e":"A inversão de onda T pode levar mais tempo."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'b6x2h5', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Fibrinólise","Reperfusão","Critérios de Sucesso"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-b6x2h5', 'approved', 9
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-b6x2h5');

    -- Q11
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-z1d9v3', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Sobre o uso de nitratos na Síndrome Coronariana Aguda, em qual das situações abaixo o seu uso está TERMINANTEMENTE contraindicado?', '[{"id":"a","text":"Paciente com Insuficiência Cardíaca e edema agudo de pulmão."},{"id":"b","text":"Paciente hipertenso com dor torácica refratária."},{"id":"c","text":"Paciente que fez uso de inibidor da fosfodiesterase-5 (ex: Sildenafil) nas últimas 24-48 horas."},{"id":"d","text":"Paciente com taquicardia sinusal associada à dor."},{"id":"e","text":"Fase estável de infarto de parede anterior."}]', 'c', 'O Sildenafil (e outros inibidores da PDE-5) potencializa o efeito vasodilatador mediado pelo óxido nítrico dos nitratos, podendo levar a hipotensão severa, choque e síncope. O intervalo de segurança é de 24h para Sildenafil e 48h para Tadalafil.', '{"a":"O nitrato é benéfico no edema agudo por reduzir a pré-carga.","b":"O nitrato IV é indicado para controle pressórico e anginoso.","c":"Correta. Alerta para uma interação farmacológica perigosa clássica em provas.","d":"A taquicardia não é contraindicação absoluta, embora a hipotensão seja.","e":"Pode ser usado para controle sintomático se necessário."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'z1d9v3', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Nitratos","Interação","Sildenafil"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-z1d9v3', 'approved', 10
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-z1d9v3');

    -- Q12
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-y5p2m8', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Um paciente de 40 anos apresenta dor torácica intensa e contínua, com supradesnivelamento de ST difuso (em todas as derivações, exceto aVR) e depressão do intervalo PR. A dor piora na inspiração profunda e melhora ao sentar-se e inclinar o tronco para frente (posição em prece maometana). Qual o diagnóstico provável e a alteração da troponina esperada?', '[{"id":"a","text":"IAM inferior; Troponina muito alta."},{"id":"b","text":"Pericardite Aguda; Troponina pode ser normal ou levemente elevada (se houver miopericardite)."},{"id":"c","text":"Angina Estável; Troponina normal."},{"id":"d","text":"Dissecção de Coronária; Troponina ascendente."},{"id":"e","text":"Tromboembolismo Pulmonar; Troponina negativa."}]', 'b', 'A pericardite aguda mimetiza o IAM no ECG, mas o supra de ST é côncavo, difuso e não respeita território coronariano, além do sinal patognomônico do infra de PR. A clínica postural (prece maometana) e a relação com o ciclo respiratório fecham o diagnóstico. A troponina pode subir se houver inflamação do miocárdio adjacente (miopericardite).', '{"a":"O IAM inferior teria alterações localizadas e supra convexo (em domo).","b":"Correta. Diferencia a síndrome pericárdica da coronariana agudizada.","c":"A angina estável não altera ECG de repouso dessa forma.","d":"Causa padrão de infarto localizado.","e":"O TEP causa padrão S1Q3T3 e inversão de T de V1-V4, não supra difuso."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'y5p2m8', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Pericardite","ECG","Diagnóstico Diferencial"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-y5p2m8', 'approved', 11
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-y5p2m8');

    -- Q13
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-m3r8t2', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Qual medicação tem benefício comprovado em reduzir a mortalidade a longo prazo e deve ser iniciada precocemente (primeiras 24h) em todos os pacientes com IAM que não tenham contraindicações como asma grave, Bloqueio Atrioventricular de alto grau ou choque cardiogênico?', '[{"id":"a","text":"Digoxina."},{"id":"b","text":"Lidocaína profilática."},{"id":"c","text":"Betabloqueadores (ex: Carvedilol, Metoprolol)."},{"id":"d","text":"Verapamil."},{"id":"e","text":"Amiodarona."}]', 'c', 'Os betabloqueadores reduzem o consumo de oxigênio miocárdico, diminuem o risco de arritmias ventriculares e o remodelamento cardíaco pós-infarto, sendo pilares da terapia redutora de mortalidade.', '{"a":"Usada apenas para controle de frequência na FA associada, sem impacto na mortalidade do IAM.","b":"O uso profilático de lidocaína aumentou a mortalidade no passado por causar AESP.","c":"Correta. Define o grupo farmacológico de escolha para o manejo crônico do coronariopata.","d":"Pode ser perigoso se houver disfunção ventricular.","e":"Reservada para tratamento de arritmias específicas."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'm3r8t2', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Betabloqueadores","Mortalidade","IAM"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-m3r8t2', 'approved', 12
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-m3r8t2');

    -- Q14
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-w1l9j4', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Um paciente com Síndrome Coronariana Aguda sem supra de ST é classificado como risco intermediário. Ele possui história de asma e hipercalemia (K=5.6). Qual o inibidor da enzima conversora de angiotensina (IECA) ou bloqueador de receptor de angiotensina (BRA) deve ser PREFERIDO neste paciente?', '[{"id":"a","text":"Lisinopril."},{"id":"b","text":"Losartana."},{"id":"c","text":"Nenhum deles deve ser iniciado enquanto houver hipercalemia; ambos são contraindicados nesta situação."},{"id":"d","text":"Captopril em dose plena."},{"id":"e","text":"Anlodipino."}]', 'c', 'Tanto os IECAs quanto os BRAs bloqueiam o eixo renina-angiotensina-aldosterona, reduzindo a excreção de potássio. Iniciá-los com K > 5.5 mEq/L aumenta o risco de arritmias fatais e parada cardíaca. A conduta correta é estabilizar o nível de potássio antes de introduzir estas medicações, que são indicadas para prevenir remodelamento.', '{"a":"N/A devido ao potássio alto.","b":"N/A devido ao potássio alto.","c":"Correta. Aborda a contraindicação de segurança laboratorial no manejo pós-isquêmico.","d":"N/A.","e":"O Anlodipino é um BCC, não age na ECA, mas não é a droga redutora de mortalidade de primeira escolha para remodelamento."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'w1l9j4', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["IECA","Hipercalemia","Contraindicações"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-w1l9j4', 'approved', 13
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-w1l9j4');

    -- Q15
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-k9m4u2', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'A Síndrome de Takotsubo (ou cardiomiopatia de estresse), frequentemente mimetiza um quadro de SCA. No cateterismo desse paciente, observa-se ausência de lesões coronarianas obstrutivas e a ventriculografia esquerda demonstra qual padrão característico?', '[{"id":"a","text":"Acinésia total do ventrículo esquerdo."},{"id":"b","text":"Abaulamento (ballooning) apical do ventrículo esquerdo com hipercinesia da base."},{"id":"c","text":"Hipertrofia septal assimétrica."},{"id":"d","text":"Aumento global das quatro cavidades."},{"id":"e","text":"Fístulas coronário-cavitárias difusas."}]', 'b', 'O Takotsubo é causado por um pico de catecolaminas em situações de estresse. O ventrículo esquerdo assume um formato parecido com uma armadilha de polvos japonesa (Takotsubo), com o ápice dilatado e hipocinético enquanto a base do coração contrai vigorosamente.', '{"a":"Acinésia global é rara e sugere choque cardiogênico terminal.","b":"Correta. Descreve a morfologia clássica da ventriculografia na síndrome de estresse.","c":"Padrão de Miocardiopatia Hipertrófica.","d":"Padrão de Miocardiopatia Dilatada.","e":"Malformação vascular."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'k9m4u2', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Takotsubo","Balonamento Apical","Simuladores de SCA"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-k9m4u2', 'approved', 14
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-k9m4u2');

    -- Q16
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-t8y1z5', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Paciente de 68 anos com dor torácica típica em repouso e ECG com infradesnivelamento persistente de ST em parede lateral. Iniciado tratamento medicamentoso. Durante a evolução, apresenta quadro de confusão mental e flapping. Qual exame laboratorial explicaria essa complicação secundária ao tratamento da SCA em pacientes predispostos?', '[{"id":"a","text":"Glicemia de 200 mg/dL."},{"id":"b","text":"Sódio sérico de 135 mEq/L."},{"id":"c","text":"Níveis elevados de escopolamina."},{"id":"d","text":"Intoxicação por Bismuto."},{"id":"e","text":"Isquemia hepática (Fígado de choque) ou efeito colateral de opioides em idosos."}]', 'e', 'Em idosos, a polifarmácia na SCA (morfina, sedação para CAT, betabloqueadores em baixo débito) pode gerar delirium. Mas no contexto de ''flapping'' (asterixe), o médico deve estar atento à encefalopatia hepática por isquemia (hepatite isquêmica) decorrente do baixo débito cardíaco persistente (fígado de choque).', '{"a":"Causa cetoacidose ou estado hiperosmolar, mas o flapping é mais específico da amônia.","b":"Hiponatremia leve não explica o flapping.","c":"Causaria síndrome anticolinérgica (agitação), não flapping.","d":"Raro.","e":"Correta. Integra complicações sistêmicas do baixo débito da SCA."}',
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 't8y1z5', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Complicações Sistêmicas","Fígado de Choque","Delirium"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-t8y1z5', 'approved', 15
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-t8y1z5');

    -- Q17
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-x2o9p3', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'No Infarto Agudo do Miocárdio, o uso de Estatinas de alta potência (ex: Atorvastatina 80mg ou Rosuvastatina 40mg) deve ser iniciado quando?', '[{"id":"a","text":"Apenas após receber o resultado do Perfil Lipídico (LDL/HDL)."},{"id":"b","text":"Se o LDL for superior a 130 mg/dL."},{"id":"c","text":"Imediatamente na fase aguda, independentemente dos níveis basais de colesterol, devido aos seus efeitos pleiotrópicos estabilizadores de placa."},{"id":"d","text":"Apenas após 30 dias de alta hospitalar."},{"id":"e","text":"Somente se houver histórico familiar de hipercolesterolemia."}]', 'c', 'As estatinas agem não apenas na redução do colesterol LDL, mas possuem efeitos ''pleiotrópicos'' como redução da inflamação endotelial, melhora da função microvascular e estabilização da placa aterosclerótica rota. Devem ser iniciadas no primeiro dia da SCA.', '{"a":"Atrasar o início retarda o benefício pleiotrópico.","b":"O alvo no coronariopata agudo é LDL < 50 mg/dL, mas o início é para todos.","c":"Correta. Define o conceito moderno de estatina na SCA como estabilizadora de placa.","d":"Perde-se a janela de maior instabilidade da doença.","e":"Indicada para todos os pacientes com doença aterosclerótica estabelecida."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'x2o9p3', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Estatinas","Efeitos Pleiotrópicos","SCA"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-x2o9p3', 'approved', 16
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-x2o9p3');

    -- Q18
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-p7x8r1', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'A Encefalopatia por Hipóxia após parada cardiorrespiratória (PCR) em um paciente com IAM deve ser prevenida através de qual estratégia de manejo intensivo, que deve ser iniciada assim que houver retorno da circulação espontânea (RCE) se o paciente permanecer em coma?', '[{"id":"a","text":"Manter hiperglicemia controlada (Glicose > 250)."},{"id":"b","text":"Controle Direcionado da Temperatura (Hipotermia Terapêutica / Normotermia estrita), mantendo temperatura entre 32-36°C."},{"id":"c","text":"Administração de doses cavalares de corticoides."},{"id":"d","text":"Hiperventilação vigorosa para manter PaCO2 < 20 mmHg."},{"id":"e","text":"Uso de Diazepam profilático."}]', 'b', 'O controle da temperatura reduz o metabolismo cerebral e a cascata de lesão após a isquemia-reperfusão da PCR, melhorando o prognóstico neurológico.', '{"a":"A hiperglicemia piora o dano neurológico por acidose lática tecidual.","b":"Correta. Identifica a medida de neuroproteção pós-PCR recomendada pelo ACLS.","c":"Sem evidência de benefício na neuroproteção pós-PCR.","d":"A hipocapnia severa causa vasoconstrição cerebral e piora a isquemia.","e":"Sem indicação."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'p7x8r1', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Pós-PCR","Neuroproteção","Hipotermia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-p7x8r1', 'approved', 17
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-p7x8r1');

    -- Q19
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-k1m9u3', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'Um paciente tabagista, submetido a cateterismo cardíaco que demonstrou lesão obstrutiva de 90% em coronária direita, realiza angioplastia com sucesso e implante de stent farmacológico. No dia seguinte, apresenta dor em artelhos, que se tornam cianóticos e dolorosos (''''síndrome do dedo azul''''), acompanhado de livedo reticular em membros inferiores e um aumento súbito de creatinina. No sedimento urinário, há presença de eosinofilia. Qual o diagnóstico?', '[{"id":"a","text":"Embolia por Cristais de Colesterol."},{"id":"b","text":"Nefropatia por Contraste."},{"id":"c","text":"Trombose Aguda de Stent."},{"id":"d","text":"Reação de hipersensibilidade ao material do stent (Níquel)."},{"id":"e","text":"Endocardite Infecciosa Aguda."}]', 'a', 'A manipulação de guias e cateteres em aortas ateroscleróticas pode fragmentar placas, liberando cristais de colesterol que embolizam para a periferia (dedo azul, livedo) e rins (IRA com eosinofilia/eosinofilúria). É diferente da nefropatia por contraste, que cursa com aumento de creatinina mais precoce e sem sinais cutâneos.', '{"a":"Correta. Associa a manipulação vascular ao quadro multisistêmico de embolia sólida.","b":"A nefropatia por contraste não causa livedo ou dedos azuis.","c":"Causaria recorrência da dor anginosa e alteração de ECG.","d":"Dermatite de contato ou sistêmica não explicariam a IRA e as extremidades cianóticas.","e":"Quadro infeccioso com febre e vegetações, menos provável imediatamente pós-CAT."}',
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'k1m9u3', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Embolismo","Colesterol","Complicação CAT"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-k1m9u3', 'approved', 18
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-k1m9u3');

    -- Q20
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-SCA-r5o2x8', 'medicina', 'clinica-medica', 'cardiologia', 'cardiologia', 'sindromes-coronarianas', 'sindromes-coronarianas',
        'A presença de onda Q patológica no eletrocardiograma de um paciente com dor torácica crônica estratificado para cirurgia indica:', '[{"id":"a","text":"Isquemia miocárdica reversível."},{"id":"b","text":"Área de fibrose (infarto prévio consolidado), ou seja, necrose tecidual."},{"id":"c","text":"Hipertrofia ventricular esquerda."},{"id":"d","text":"Distúrbio de condução do ramo direito."},{"id":"e","text":"Normalidade em atletas de alto rendimento."}]', 'b', 'A onda Q patológica (larga e profunda) representa a perda de vetores de despolarização em uma área do miocárdio que foi substituída por tecido fibrótico cicatricial, sinalizando um infarto antigo.', '{"a":"Isquemia reversível causa inversão de T ou infra de ST.","b":"Correta. Define o significado eletrofisiológico da onda Q patológica.","c":"Causa aumento da amplitude do QRS e inversão de T assimétrica (strain).","d":"Altera a duração do QRS (alargamento).","e":"Falsa."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'r5o2x8', '{"package_id":"5e29ffee-93e4-4924-8560-3137b82c6d00","tags":["Onda Q","História Natural","Necrose"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-SCA-r5o2x8', 'approved', 19
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-SCA-r5o2x8');

END $$;