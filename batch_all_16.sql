DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-r6hqs6', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A conduta terapêutica atual recomendada para o ''Microcarcinoma Papilífero de Tireoide'' (nódulo único de até 1 cm, sem invasão capsular ou metástases linfonodais aparentes) em centros especializados é:', '[{"id":"a","text":"Vigilância Ativa (seguimento ultrassonográfico sem cirurgia imediata) em pacientes selecionados, devido ao comportamento biológico indolente na maioria dos casos."},{"id":"b","text":"Iodo Radioativo de urgência assim que biopsiado Bethesda VI."},{"id":"c","text":"Tireoidectomia total seguida de rádio-iodo em 100% dos casos."},{"id":"d","text":"Apenas uso de levotiroxina em dose supressiva perpétua."},{"id":"e","text":"Esvaziamento cervical lateral bilateral profilático."}]', 'a', 
        'Estudos de longo prazo (notadamente os protocolos japoneses de Kuma/Kobe) mostraram que a maioria dos microcarcinomas papilíferos não progride significativamente em décadas. A vigilância ativa é uma opção de manejo conservadora que evita as complicações da cirurgia (hipoparatiroidismo, lesão de nervo) sem comprometer a sobrevida do paciente em casos de baixo risco.', '{"a":"Correta. Mudança de paradigma ética e cirúrgica recente na oncologia de tireoide.","b":"Incorreta. O rádio-iodo exige tecido alvo residual para atuar; sem cirurgia, não é tratamento padrão-ouro diagnóstica primária desta lesão.","c":"Incorreta. Constitui sobre-tratamento (overtreatment) segundo diretrizes mundiais atuais.","d":"Incorreta. A dosagem de L-T4 supressiva sem cirurgia não cura o tumor.","e":"Incorreta. Excesso agressivo injustificado por qualquer diretriz moderna."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'r6hqs6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Vigilância Ativa","Microcarcinoma","Papilífero","Bioética"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-r6hqs6', 'approved', 180)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q182 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-lnrm5i', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O uso de Lítio (utilizado no tratamento do transtorno bipolar) pode ocasionar bócio e hipotireoidismo primário através de qual mecanismo biológico na glândula tireóide?', '[{"id":"a","text":"Inibição da liberação dos hormônios tireoidianos (T4 e T3) dos folículos para a circulação."},{"id":"b","text":"Aumento excessivo da conversão de T4 em T3."},{"id":"c","text":"Destruição citotóxica direta das células C."},{"id":"d","text":"Melhora das taxas de captação de iodo pelo NIS."},{"id":"e","text":"Falta de receptores nucleares celulares."}]', 'a', 
        'O lítio interfere em várias etapas da fisiologia tireoidiana, mas sua ação mais marcante é o bloqueio da secreção hormonal da célula folicular. Com menos hormônio no sangue, o TSH sobe, estimulando o crescimento da glândula (bócio) e o estabelecimento do hipotireoidismo clínico em até 10-20% dos pacientes em uso crônico.', '{"a":"Correta. Farmacodinâmica tireoidiana do lítio clássica.","b":"Incorreta. Diminuiria o risco de hipotireoidismo se assim fosse.","c":"Incorreta. Células C não participam da regulação central da tiroxina.","d":"Incorreta. Na verdade, por elevar o TSH, a captação pode aumentar secundariamente, mas o efeito primário na secreção hormonal é de bloqueio.","e":"Incorreta. Sem nexo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'lnrm5i', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Lítio","Hipotireoidismo Iatrogênico","Bócio","Farmacologia"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-lnrm5i', 'approved', 181)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q183 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4ud8vq', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em pacientes submetidos à tireoidectomia total por câncer diferenciado de tireoide, o termo ''Resposta Excelente'' (Dynamic Risk Stratification) significa:', '[{"id":"a","text":"Níveis de Tireoglobulina (TG) estimulada ou não estimulada indetectáveis (ou muito baixos) associados a exames de imagem e USG cervical completamente normais."},{"id":"b","text":"Acura pelo uso exclusivo de sal marinho granulado no pós-operatório."},{"id":"c","text":"Presença de metástases ósseas mas sem dores no corpo."},{"id":"d","text":"Títulos de Anti-TG aumentando em 500% ao ano."},{"id":"e","text":"TSH baixo com T4 livre também baixo."}]', 'a', 
        'A estratificação de risco dinâmica (vinda do guideline da ATA 2015) reavalia o paciente com base na evolução laboratorial e de imagem. A ''Resposta Excelente'' indica que o risco de recorrência no curto prazo é < 1-4%, permitindo menor frequência de exames e relaxamento dos níveis de supressão de TSH.', '{"a":"Correta. Definição do melhor cenário prognóstico possível no câncer diferenciado.","b":"Incorreta. Fantasia clínica absurda.","c":"Incorreta. Caracteriza ''Resposta Estrutural Incompleta''.","d":"Incorreta. Caracteriza ''Resposta Bioquímica Incompleta'' ou suspeita de recorrência silente.","e":"Incorreta. Caracteriza quadro de hipotireoidismo central ou mal ajuste medicamentoso."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4ud8vq', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Estratificação de Risco","Resposta Excelente","Tireoglobulina","Follow-up"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4ud8vq', 'approved', 182)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q184 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-70ry82', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual exame de imagem é considerado o padrão-ouro inicial para detectar a presença de ''Bócio Mergulhante'' (intratorácico) e avaliar sua relação anatômica com os vasos da base e a traqueia?', '[{"id":"a","text":"Tomografia Computadorizada (TC) de Tórax e Pescoço (preferencialmente sem contraste iodado inicial para não prejudicar Iodo-131 futuro)."},{"id":"b","text":"Radiografia simples da mão esquerda."},{"id":"c","text":"Ultrassonografia abdominal total com preparo de cólon."},{"id":"d","text":"Pet-CT scan massivo em 100% dos suspeitos."},{"id":"e","text":"Biópsia de fígado para ver metástases inversas."}]', 'a', 
        'A TC é essencial para o planejamento cirúrgico e para identificar a extensão mediastinal do bócio, localizando deslocamentos traqueais e risco compressivo vascular. O contraste iodado deve ser evitado se houver suspeita de necessidade de tratamento imediato com iodo radioativo (ex: Graves ou Câncer), pois bloqueia os receptores por meses.', '{"a":"Correta. Ferramenta anatômica definidora para massas intratorácicas desta origem.","b":"Incorreta. Mede idade óssea.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Reservado para casos oncológicos agressivos ou desdiferenciados, não para bócio mergulhante comum prioritariamente.","e":"Incorreta. Absurdo técnico anatômico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '70ry82', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bócio Mergulhante","Tomografia","Planejamento Cirúrgico","Diagnóstico"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-70ry82', 'approved', 183)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q185 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-c5c6ak', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoide Ectópica Lingual'' é decorrente de falha em qual processo embriológico?', '[{"id":"a","text":"Descida (migração) da glândula tireóide do forame cego na base da língua para a sua posição cervical pré-traqueal normal no pescoço anterior."},{"id":"b","text":"Absorção de resíduos de glóbulos vermelhos pela boca."},{"id":"c","text":"Fechamento incompleto do palato primário durante o 2º mês."},{"id":"d","text":"Excesso de produção de saliva durante a fase fetal."},{"id":"e","text":"Crescimento seletivo de dentes dentro do pescoço."}]', 'a', 
        'A tireoude migra ao longo do ducto tireoglosso. Se houver falha, ela pode permanecer em qualquer ponto do trajeto, sendo a base da língua (tireoide lingual) o sítio mais comum de ectopia. Curiosamente, em 70% destes casos, a tireoide lingual é o único tecido tireoidiano funcional do paciente.', '{"a":"Correta. Embriologia específica e frequente em provas de base.","b":"Incorreta. Inexistente.","c":"Incorreta. Relacionado a fendas palatinas.","d":"Incorreta. Inócuo.","e":"Incorreta. Absurdo biológico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'c5c6ak', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoide Lingual","Embriologia","Migração","Ectopia"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-c5c6ak', 'approved', 184)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q186 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-hi1p1h', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente com hipertireoidismo por Doença de Graves que desenvolve febre súbita, dor de garganta intensa (odinofagia) e surgimento de crostas esbranquiçadas nas amígdalas enquanto usa Metimazol deve ser imediatamente submetido a qual exame de urgência?', '[{"id":"a","text":"Hemograma completo com diferencial de leucócitos (para descartar Agranulocitose)."},{"id":"b","text":"Urocultura e sumário de urina em 24h."},{"id":"c","text":"RX de bacia para excluir fraturas patológicas."},{"id":"d","text":"Somente colher TSH e T4 livre novos."},{"id":"e","text":"Exame de fezes (Protoparasitológico)."}]', 'a', 
        'A agranulocitose (neutrófilos < 500/mm³) é o efeito colateral mais temido e letal das tionamidas (0,1 a 0,5% dos casos). Com a falência imune, o paciente desenvolve infecções bacterianas massivas na orofaringe (angina agranulocitótica). Se houver suspeita, a medicação deve ser suspensa imediatamente e o paciente hospitalizado por choque séptico iminente.', '{"a":"Correta. Conduta de urgência salvadora de vidas.","b":"Incorreta. Não trata o perigo hematológico primário associado às drogas tireoidianas.","c":"Incorreta. Inexpressivo.","d":"Incorreta. A toxicidade é medular, não hormonal glandular direta no laboratório.","e":"Incorreta. Inútil."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hi1p1h', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Agranulocitose","Metimazol","Efeitos Colaterais","Angina"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-hi1p1h', 'approved', 185)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q187 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-yjt2qw', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de hipertireoidismo no primeiro trimestre da gestação pode ser decorrente da ação estimuladora direta de qual outro hormônio no receptor de TSH (mimetismo hormonal)?', '[{"id":"a","text":"Gonadotrofina Coriônica Humana (hCG)."},{"id":"b","text":"Prolactina."},{"id":"c","text":"Ocitocina."},{"id":"d","text":"Insulina."},{"id":"e","text":"Glucagon."}]', 'a', 
        'O hCG possui uma subunidade alfa idêntica à do TSH e uma subunidade beta com homologia estrutural significativa. Em níveis muito elevados (como no primeiro trimestre da gravidez ou em mola hidatidiforme), o hCG liga-se ao receptor de TSH na tireoide, podendo causar hipertireoidismo transitório (Tireotoxicose Gestacional Transitória).', '{"a":"Correta. Bioquímica e endocrinologia obstétrica clássica.","b":"Incorreta. Relacionado a lactação e sela túrcica.","c":"Incorreta. Contração uterina e ejeção de leite.","d":"Incorreta. Metabolismo de glicose.","e":"Incorreta. Contrapor à insulina."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'yjt2qw', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["hCG","Gestação","Hipertireoidismo Transitório","Hormônios"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-yjt2qw', 'approved', 186)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q188 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-zhyk94', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Os ''Corpos Psamomatosos'' (Psammoma bodies) são calcificações esféricas de laminas concêntricas frequentemente encontradas no anátomo-patológico de qual neoplasia tireoidiana?', '[{"id":"a","text":"Carcinoma Papilífero de Tireoide."},{"id":"b","text":"Adenoma Tóxico de Plummer."},{"id":"c","text":"Bócio Coloide antigo."},{"id":"d","text":"Linfoma de Hodgkin."},{"id":"e","text":"Carcinoma Espinocelular profundo."}]', 'a', 
        'Embora nem todo papilífero os tenha (presentes em cerca de 40-50%), a sua identificação no anátomo-patológico ou até em uma PAAF é um indício fortíssimo desta neoplasia. Representam a calcificação de papilas tumorais necrosadas ou pequenos focos de reabsorção calcificante histológica.', '{"a":"Correta. Marcador histológico definidor para a linhagem papilífera.","b":"Incorreta. Lesões benignas puras raramente formam laminas psamomatoides.","c":"Incorreta. Pode ter calcificações grosseiras amorfas, mas não corpos psamomatosos típicos organizados.","d":"Incorreta. Caracteriza-se por células de Reed-Sternberg.","e":"Incorreta. Marcador ceratinizante."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'zhyk94', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Corpos Psamomatosos","Patologia","Papilífero","Diagnóstico"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-zhyk94', 'approved', 187)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q189 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-u2533f', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal manifestação clínica psiquiátrica em pacientes com hipotireoidismo de Hashimoto severo é:', '[{"id":"a","text":"Depressão maior com sinais de lentificação psicomotora e apatia (Pseudodermência no idoso)."},{"id":"b","text":"Mania explosiva de alta energia."},{"id":"c","text":"Crises de pânico decorrentes exclusivamente de excesso de sudorese."},{"id":"d","text":"Transtorno obsessivo por contagem detida de iodo."},{"id":"e","text":"Somente hiperatividade infantil imediata."}]', 'a', 
        'A falta de hormônio desacelera todas as funções mentais e neurológicas. Em idosos, a lentificação cognitiva e o esquecimento podem ser tão graves que simulam demência real (ex: Alzheimer), quadro que é curiosamente reversível com a reposição hormonal correta.', '{"a":"Correta. Correlação clássica entre tireoide e psiquiatria gerátrica.","b":"Incorreta. Quadro associado ao hipertireoidismo agudo florido.","c":"Incorreta. Hipertireoidismo e feocromocitoma são diferenciais da ansiedade pânico.","d":"Incorreta. Inexistente clinicamente desta forma específica.","e":"Incorreta. Pelo contrário; cursa com sono excessivo (hipersonia)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'u2533f', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Depressão","Alzheimer","Hipotireoidismo","Pseudodermência"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-u2533f', 'approved', 188)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q190 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-a1zl39', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um nódulo tireoidiano que apresenta ''padrão central e periférico de vascularização'' ao Doppler colorido e ''frio'' (sem captação) na cintilografia deve ser preferencialmente submetido a:', '[{"id":"a","text":"PAAF (Punção Aspirativa por Agulha Fina) guiada por USG."},{"id":"b","text":"Tratamento empírico com rádio-iodo em dose cavalar."},{"id":"c","text":"Massagens locais com óleo de rícino de 12/12h."},{"id":"d","text":"Suspensão de qualquer investigação adicional se houver bócio associado."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'Nódulos frios (hipocaptantes) em exames nucleares e com vascularização interna desorganizada (Doppler) têm maior risco de malignidade. A PAAF é a ferramenta de eleição para definir o citodiagnóstico e ditar a conduta cirúrgica.', '{"a":"Correta. Sequência algorítmica diagnóstica padrão.","b":"Incorreta. Nódulos frios não captam iodo; tratá-los assim é inútil e perigoso.","c":"Incorreta. Homeopatia/alternativa sem eficácia científica comprovada neste contexto.","d":"Incorreta. Atrai alto risco de negligência oncológica.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'a1zl39', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Doppler","PAAF","Nódulo Frio","Diagnóstico"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-a1zl39', 'approved', 189)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q191 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-otfohn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Fase de Saturação'' (Wolff-Chaikoff paradoxal) ocorre quando submetemos a glândula tireóide a uma carga massiva de iodo exógeno (ex: doses terapêuticas de lugol ou xarope de iodo). Qual o resultado sistêmico imediato desta carga?', '[{"id":"a","text":"Bloqueio temporário (cerca de 10-14 dias) da organificação do iodo e da secreção hormonal, usado para estabilizar pacientes Graves antes da cirurgia (Lugolização)."},{"id":"b","text":"Auto-combustão química espontânea da glândula tireóide."},{"id":"c","text":"Aceleração instantânea do metabolismo basal em 1000%."},{"id":"d","text":"A glândula aumenta de tamanho imediatamente para 5 kg."},{"id":"e","text":"Não há nenhum efeito significativo no ser humano adulto."}]', 'a', 
        'O efeito Wolff-Chaikoff é um mecanismo de defesa da tireoide para evitar a tiroxicose por excesso de substrato. Em pacientes com Graves, o Lugol é dado no pré-operatório para diminuir a vascularização (deixando a glândula ''seca'' para o cirurgião) e baixar os hormônios temporariamente até o momento da retirada.', '{"a":"Correta. Fisiologia aplicada à conduta perioperatória clássica.","b":"Incorreta. Absurdo técnico.","c":"Incorreta. Se houver falha de escape (Jod-Basedow), pode ocorrer, mas o Wolff-Chaikoff é, por definição, de bloqueio.","d":"Incorreta. Bócio demora semanas para aumentar e raramente nesta magnitude aguda.","e":"Incorreta. Efeito fisiológico real e comprovado."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'otfohn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Wolff-Chaikoff","Lugol","Graves","Preparação Cirúrgica"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-otfohn', 'approved', 190)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q192 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-duldti', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O hormônio TSH (Hormônio Estimulador da Tireóide) é secretado por qual glândula e por qual conjunto de células especializadas?', '[{"id":"a","text":"Glândula Adenohipófise (Hipófise Anterior), pelas células tireotróficas."},{"id":"b","text":"Pela própria glândula Tireóide, via feedback autocrino."},{"id":"c","text":"Pela Glândula Adrenal, zona glomerulosa."},{"id":"d","text":"Pelo Fígado, em conjunto com a albumina."},{"id":"e","text":"Pelo Pâncreas exócrino na digestão."}]', 'a', 
        'O TSH é uma glicoproteína produzida pela hipófise em resposta ao TRH hipotalâmico. Atua na tireoide estimulando todas as etapas da síntese hormonal e o crescimento glandular.', '{"a":"Correta. Anatomofisiologia básica do eixo endócrino.","b":"Incorreta. A tireoide recebe o sinal, não o produz centralmente.","c":"Incorreta. Adrenais produzem Aldosterona/Cortisol.","d":"Incorreta. Fígado metaboliza, não produz TSH.","e":"Incorreta. Pâncreas produz Insulina/Glucagon em suas ilhotas endócrinas."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'duldti', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TSH","Hipófise","Fisiologia","Eixo Hormonal"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-duldti', 'approved', 191)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q193 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-k2uen1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A presença de uma massa cervical associada a sinais de amiloidose sistêmica ou história familiar de feocromocitoma deve obrigatoriamente levantar a suspeita de:', '[{"id":"a","text":"Carcinoma Medular de Tireoide (CMT)."},{"id":"b","text":"Hipotireoidismo leve por excesso de glúten."},{"id":"c","text":"Cisto do ducto tireoglosso comum."},{"id":"d","text":"Apenas resfriado comum persistente."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'O CMT produz calcitonina e, frequentemente, depósito local de substância amiloide (originada da própria calcitonina mal enovelada no tumor). Além disso, ele faz parte das síndromes de Neoplasia Endócrina Múltipla tipo 2 (associado ao feocromocitoma), exigindo triagem genética de parentes.', '{"a":"Correta. Tríade sindrômica e patológica que direciona para a linhagem Medular.","b":"Incorreta. Sem relação oncológica desta magnitude sindrômica.","c":"Incorreta. Lesões císticas linfóides benignas.","d":"Incorreta. Sem base clínica.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'k2uen1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Amiloidose","Carcinoma Medular","NEM 2","Feocromocitoma"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-k2uen1', 'approved', 192)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q194 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-rfdb1d', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal vantagem da dosagem de T4 Livre sobre o T4 Total em pacientes que usam anticoncepcionais orais?', '[{"id":"a","text":"O T4 total aumenta falsamente pelo aumento da TBG induzido pelo estrógeno, enquanto o T4 livre permanece o marcador fiel do status tireoidiano real."},{"id":"b","text":"O T4 livre não precisa ser colhido em jejum."},{"id":"c","text":"Somente o T4 total provoca ganho de peso direto após os 50 anos."},{"id":"d","text":"O T4 livre cursa com cura súbita de acne hormonal."},{"id":"e","text":"Nenhuma vantagem; ambos são idênticos em 100% das situações."}]', 'a', 
        'Estrogênios estimulam a glicosilação hepática da TBG, aumentando sua meia-vida e nível sérico. Como o T4 Total mede tanto o hormônio ligado quanto o livre, seu valor sobe artificialmente. O T4 Livre não sofre influência das proteínas de ligação e fornece a informação correta sobre a fração biologicamente ativa.', '{"a":"Correta. Distinção laboratorial fundamental para evitar falsos diagnósticos.","b":"Incorreta. Jejume ajuda na padronização laboratorial, mas não é a razão técnica principal.","c":"Incorreta. Fantasia técnica sem correlação hormonal direta desta forma isolada.","d":"Incorreta. Absurdo técnico.","e":"Incorreta. Situações de alteração proteica (como gestação e ACO) os tornam muito diferentes."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'rfdb1d', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["T4 Livre","TBG","Estrogênios","ACO"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-rfdb1d', 'approved', 193)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q195 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-x57wel', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Biópsia por PAAF'' em nódulos tireoidianos spongiformes (aspecto de esponja em mais de 50% do nódulo ao USG) é classificada em termos de risco de malignidade como:', '[{"id":"a","text":"Baixíssimo risco (< 1%), sendo geralmente dispensável se o nódulo for pequeno ou estável."},{"id":"b","text":"Alto risco (> 90%), exigindo cirurgia radical imediata."},{"id":"c","text":"Nódulo marcador de câncer anaplásico progressivo."},{"id":"d","text":"Impossível de ser realizada por ser um cisto oco."},{"id":"e","text":"Única forma de diagnosticar sarampo cervical."}]', 'a', 
        'O padrão espongiforme é um marcador ultrassonográfico de benignidade (Bethesda II prospectivo). Nódulos com este aspecto predominantemente representam nódulos coloides benignos dilatados, não havendo indicação rotineira de intervenção a menos que causem sintomas compressivos severos.', '{"a":"Correta. Guideline de estratificação de risco ultrassonográfico (TIRADS).","b":"Incorreta. Nódulos suspeitos são hipoecogênicos e sólidos, não espongiformes.","c":"Incorreta. Inexiste essa correlação específica agressiva.","d":"Incorreta. Pode-se puncionar a parede se houver componentes sólidos marginais, mas o risco justifica a conduta expectante.","e":"Incorreta. Absurdo clínico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'x57wel', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TIRADS","Espongiforme","Nódulo de Tireoide","Benigno"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-x57wel', 'approved', 194)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q196 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4ms2w', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Como deve ser feita a ingestão da Levotiroxina (L-T4) para garantir a melhor absorção intestinal possível?', '[{"id":"a","text":"Em jejum absoluto, pelo menos 30 a 60 minutos antes do café da manhã, apenas com água pura."},{"id":"b","text":"Misturada a leite ou café para reduzir a acidez."},{"id":"c","text":"Imediatamente após o jantar acompanhada de vitaminas e ferro."},{"id":"d","text":"Diluída em suco de laranja massivo para melhorar o sabor."},{"id":"e","text":"Qualquer horário do dia independente da alimentação."}]', 'a', 
        'A levotiroxina exige o pH ácido gástrico para sua solubilização e absorção intestinal (duodeno/jejuno). Café, alimentos, cálcio, ferro e inibidores de bomba de prótons reduzem drasticamente sua biodisponibilidade, podendo elevar o TSH do paciente mesmo com doses teoricamente elevadas.', '{"a":"Correta. Orientação farmacológica basilar para o sucesso do tratamento.","b":"Incorreta. O leite contém cálcio e proteínas que inibem a absorção.","c":"Incorreta. Ferro e cálcio são os principais vilões da absorção da tiroxina.","d":"Incorreta. Suco pode alterar a dinâmica de absorção se tiver fibras ou resíduos excessivos no momento agudo.","e":"Incorreta. A variabilidade da absorção causaria flutuações severas do TSH sérico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '4ms2w', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Levotiroxina","Absorção","Jejum","Farmacodinâmica"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4ms2w', 'approved', 195)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q197 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-7bkd4m', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual variante do câncer de tireoide é mais comum em pacientes submetidos a radiações ionizantes externas (ex: crianças sobreviventes de acidentes nucleares ou radioterapia cervical previa)?', '[{"id":"a","text":"Carcinoma Papilífero de Tireoide."},{"id":"b","text":"Carcinoma Medular por RET somático isolado."},{"id":"c","text":"Bócio multinodular não-tóxico rádio-resistente."},{"id":"d","text":"Tireoidite de Quervain traumática."},{"id":"e","text":"Osteossarcoma de mandíbula aguda profunda."}]', 'a', 
        'O carcinoma papilífero é a neoplasia tireoidiana mais relacionada à radiação, com um período de latência de 10 a 20 anos. Em crianças sobreviventes de Chernobyl, por exemplo, a variante mais encontrada foi a ''variante sólida'' do carcinoma papilífero, frequentemente agressiva.', '{"a":"Correta. Correlação epidemiológica radio-induzida clássica.","b":"Incorreta. Medular tem forte base genética (RET), mas menos relação direta rádio-induzida epidemiológica comprovada desta forma proporcional.","c":"Incorreta. Doença benigna; radiação aumenta o risco oncológico prioritariamente.","d":"Incorreta. Desordem inflamatória viral subaguda.","e":"Incorreta. Tumor ósseo raro; a tireoide papilífera domina o cenário radio-induzido cervical."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '7bkd4m', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Radiação","Carcinoma Papilífero","Epidemiologia","História da Medicina"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-7bkd4m', 'approved', 196)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q198 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4aa26b', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de hiperoxalúria e aumento do risco de cálculos renais em pacientes com hipotireoidismo severo deve-se a qual mudança na motilidade do trato gastrointestinal?', '[{"id":"a","text":"Lentificação do trânsito intestinal (constipação), aumentando o tempo de absorção de oxalato livre no cólon."},{"id":"b","text":"Fuga massiva de iodo pelos rins."},{"id":"c","text":"Presença de vermes invasores que produzem cristais."},{"id":"d","text":"Poliúria extrema decorrente de excesso de sede."},{"id":"e","text":"Não há risco maior de cálculos no hipotireoidismo."}]', 'a', 
        'A motilidade reduzida (clássica no hipotireoidismo) atrasa o esvaziamento colônico. Isso permite maior absorção de oxalato proveniente da dieta, o que aumenta a excreção urinária deste e favorece a formação de pedras de oxalato de cálcio.', '{"a":"Correta. Mecanismo fisiopatológico renal-intestinal secundário ao status hormonal.","b":"Incorreta. Sem relação causal desta forma com litíase.","c":"Incorreta. Inexistente nestes termos científicos.","d":"Incorreta. Ocorre o oposto (oligúria e tendência a hiponatremia dilucional ou edema).","e":"Incorreta. Estudos mostram maior incidência nestes pacientes se houver constipação severa crônica associada."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '4aa26b', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Cálculo Renal","Oxalato","Motilidade Intestinal","Hipotireoidismo"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4aa26b', 'approved', 197)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q199 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-wcwq67', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O principal tratamento da ''Tireotoxicose Gestacional Transitória'' (TGT) do primeiro trimestre da gravidez é:', '[{"id":"a","text":"Conduta conservadora (apenas monitoramento e, se necessário, controle de sintomas leves com betabloqueadores), pois o quadro costuma regredir espontaneamente após a 14ª-16ª semana gestacional."},{"id":"b","text":"Tireoidectomia total de urgência no 1º mês."},{"id":"c","text":"Doses elevadas de Propiltiomacil (PTU)."},{"id":"d","text":"Iodo Radioativo no primeiro trimestre."},{"id":"e","text":"Nenhuma das anteriores; o hipertireoidismo na gestação nunca é transitório."}]', 'a', 
        'Diferente da Doença de Graves, a TGT é causada pelos níveis pico de hCG. Como o hCG cai naturalmente no segundo trimestre, a tireoide volta ao normal. O uso de antitireoidianos de síntese é frequentemente dispensável e pode ser perigoso para a embriogênese (risco de aplasia cutis com metimazol ou hepatite com PTU).', '{"a":"Correta. Conduta obstétrica e endócrina refinada para evitar iatrogenias fetoconteúdas.","b":"Incorreta. Atrocidade cirúrgica fetal injustificada.","c":"Incorreta. PTU deve ser reservado para Graves real gestacional confirmado.","d":"Incorreta. Absolutamente proibido na gestação (destruição tireoide fetal).","e":"Incorreta. É muito comum e decorre da fisiologia placentária inicial."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'wcwq67', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TGT","Gestação","Manejo Clínico","hCG"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-wcwq67', 'approved', 198)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q200 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-pkrl2m', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Captação de Radioiodo em 24h'' (RAIU) está classicamente DIMINUÍDA (< 1 a 5%) em qual destas situações tireotóxicas?', '[{"id":"a","text":"Tireoidite subaguda de Quervain (fase aguda)."},{"id":"b","text":"Doença de Graves em atividade."},{"id":"c","text":"Adenoma Tóxico único gigante."},{"id":"d","text":"Bócio multinodular tóxico por mutação do RET."},{"id":"e","text":"Hipertireoidismo primário por deficiência de selênio isolada."}]', 'a', 
        'Nas tireoidites destrutivas (estágio inicial da Quervain, silenciosa ou indolor), a glândula está inflamada e não consegue captar ou processar o iodo; o excesso de tiroxina no sangue vem do ''vazamento'' dos estoques destruídos. Já no Graves ou no BMN tóxico (hiperfunção), a captação está obrigatoriamente elevada.', '{"a":"Correta. Distinção laboratorial e cintilográfica essencial para diagnóstico diferencial de hipertiroidismo.","b":"Incorreta. Captação elevada e homogênea.","c":"Incorreta. Captação elevada focal no nódulo.","d":"Incorreta. Captação elevada heterogênea em múltiplos focos.","e":"Incorreta. Inexistente nestes termos teciduais diretos iniciais."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'pkrl2m', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["RAIU","Tireoidite","Cintilografia","Diagnóstico Diferencial"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-pkrl2m', 'approved', 199)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q201 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-yhnfvf', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A elastografia tireoidiana (Strain ou Shear Wave - SWE) é uma ferramenta ultrassonográfica complementar para avaliar nódulos. Qual o princípio físico fundamental utilizado para sugerir maior risco de malignidade durante este exame?', '[{"id":"a","text":"Medição da rigidez tecidual; nódulos malignos tendem a ser mais duros e menos deformáveis que o parênquima normal devido à maior densidade celular e fibrose."},{"id":"b","text":"Análise da cor do nódulo sob luz ultravioleta profunda."},{"id":"c","text":"Cálculo da velocidade do sangue nas veias jugulares apenas."},{"id":"d","text":"Contagem de mitocôndrias por milímetro quadrado de imagem."},{"id":"e","text":"Refração da luz solar pela pele do pescoço."}]', 'a', 
        'A elastografia avalia a elasticidade dos tecidos. Carcinomas (especialmente o papilífero) possuem menor elasticidade (maior rigidez) do que o tecido benigno circundante. Um nódulo ''azul'' ou de alta rigidez no mapeamento cromático da elastografia aumenta o índice de suspeição e ajuda a priorizar a PAAF em nódulos com morfologia TIRADS indeterminada.', '{"a":"Correta. Princípio biomecânico moderno da elastografia em radiologia tireoidiana.","b":"Incorreta. Fantasia técnica sem aplicação médica.","c":"Incorreta. Mede fluxo, não elasticidade tecidual.","d":"Incorreta. Ultrassom não tem resolução subcelular para mitocôndrias.","e":"Incorreta. Absurdo físico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'yhnfvf', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Elastografia","Nódulo de Tireoide","Malignidade","Ultrassom"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-yhnfvf', 'approved', 200)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q202 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-n1yxbm', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em pacientes com Neoplasia Endócrina Múltipla tipo 2B (NEM 2B), a ocorrência de qual mutação específica no proto-oncogene RET é encontrada em mais de 95% dos casos, determinando o fenótipo agressivo do Carcinoma Medular?', '[{"id":"a","text":"Mutação no Códon 918 (M918T)."},{"id":"b","text":"Mutação no Códon 634."},{"id":"c","text":"Mutação do gene BRCA1 cervical."},{"id":"d","text":"Perda de função do gene da Insulina."},{"id":"e","text":"Excesso de repetições CAG no cromossomo 21."}]', 'a', 
        'A mutação M918T no exon 16 do RET é viga-mestra do NEM 2B. Ela confere uma agressividade clínica superior (tumor medular surgindo na infância precoce) comparada às mutações encontradas no NEM 2A (como no códon 634). Nesses pacientes, a tireoidectomia profilática é recomendada idealmente já no primeiro ano de vida.', '{"a":"Correta. Alvo genético específico e agressivo na endocrinologia oncológica.","b":"Incorreta. Típica do NEM 2A.","c":"Incorreta. Relacionado a câncer de mama e ovário.","d":"Incorreta. Diabetes Mellitus neonatal grave.","e":"Incorreta. Relacionado a Doença de Huntington ou Síndrome de Down (Trissomia), não oncogenética RET tireoidiana.","f":"Incorreta. A NEM 2B exige vigilância extrema do CMT."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'n1yxbm', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["RET","NEM 2B","Códon 918","CMT"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-n1yxbm', 'approved', 201)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q203 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-jpltgs', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A hiponatremia (redução do sódio no sangue) encontrada em pacientes com hipotireoidismo severo (Estado Mixedematoso) é decorrente prioritariamente de qual mecanismo renal e hormonal?', '[{"id":"a","text":"Redução do débito cardíaco e do fluxo sanguíneo renal, levando à secreção inapropriada de ADH (vasopressina) e consequente diluição de sódio sérico (hiponatremia dilucional)."},{"id":"b","text":"Perda massiva de sal pelo suor excessivo."},{"id":"c","text":"Absorção intestinal reduzida de cloreto de potássio."},{"id":"d","text":"Destruição dos túbulos renais por cristais de iodo."},{"id":"e","text":"Nenhuma das anteriores; o hipotireoidismo causa hipernatremia."}]', 'a', 
        'A hipofunção tireoidiana diminui a taxa de filtração glomerular e a depuração de água livre. O corpo interpreta o baixo débito cardíaco como hipovolemia ''efetiva'', estimulando a liberação de ADH. Isso retém água pura nos túbulos renais, diluindo o sódio circulante e podendo causar coma por edema cerebral se não corrigido no manejo do Coma Mixedematoso.', '{"a":"Correta. Fisiopatologia hidro-eletrolítica detalhada da insuficiência tireoidiana profunda.","b":"Incorreta. Pacientes com hipotireoidismo apresentam pele seca (anidrose).","c":"Incorreta. Absorção intestinal não é o motor primário da hiponatermia sistêmica aguda nestes casos.","d":"Incorreta. Inexistente.","e":"Incorreta. Pelo contrário; cursa com tendência à hiponatremia."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'jpltgs', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hiponatremia","ADH","Hipotireoidismo","Fisiologia Renal"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-jpltgs', 'approved', 202)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q204 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-u9lx63', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O principal acesso cirúrgico para a remoção da maioria dos Bócios Mergulhantes (intratorácicos) que migraram do pescoço para o mediastino superior é:', '[{"id":"a","text":"Cervicotomia transversa (incisão de colar de Kocher), pois a maioria dos bócios mergulhantes são extratireoidianos mas mantêm seu suprimento sanguíneo pelas artérias tireóideas do pescoço."},{"id":"b","text":"Esternotomia total mediana massiva em 100% dos casos."},{"id":"c","text":"Toracotomia lateral profunda pelo 5º espaço intercostal."},{"id":"d","text":"Acesso endoscópico via estômago (NOTES)."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'Apesar da localização torácica, o bócio é ''puxado'' de cima para baixo pela gravidade e respiração. O cirurgião costuma conseguir luxar a glândula para o pescoço através da incisão de rotina da tireoidectomia. A esternotomia só é necessária em cerca de 2 a 5% dos casos (bócios gigantes, invasivos ou com suprimento vascular mediastinal ectópico).', '{"a":"Correta. Técnica cirúrgica e anatomopatologia viga-mestra na cabeça e pescoço.","b":"Incorreta. Raramente necessária; a cervicotomia é preferida pela menor morbidade.","c":"Incorreta. Inadequada para acessar o compartimento tireoidiano cervical-mediastinal superior médio.","d":"Incorreta. Irreal e antianatômico para este órgão.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'u9lx63', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bócio Mergulhante","Cervicotomia","Mediastino","Técnica Cirúrgica"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-u9lx63', 'approved', 203)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q205 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-zcwhoh', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Anticorpos contra o Receptor de TSH (TRAb) podem atravessar a barreira placentária durante a gestação. Qual a consequência potencial para o feto se a mãe persistir com títulos elevados de TRAb (fração estimuladora TSI)?', '[{"id":"a","text":"Hipertireoidismo Neonatal transitório (Tireotoxicose Neonatal), decorrente da estimulação da glândula fetal pelo anticorpo materno."},{"id":"b","text":"Cretinismo genético fixo."},{"id":"c","text":"Somente aumento das unhas do bebê."},{"id":"d","text":"Diabetes Mellitus tipo 1 imediato."},{"id":"e","text":"Excesso de ferro nos pulmões por respiração celular."}]', 'a', 
        'Assim como na mãe, o TRAb materno ativa o receptor de TSH fetal. O bebê nasce com bócio e hipertireoidismo (taquicardia, baixo ganho de peso, irritabilidade). O quadro se resolve espontaneamente em algumas semanas conforme o anticorpo materno (IgG) é degradado na circulação do recém-nascido.', '{"a":"Correta. Patologia neonatológica de origem autoimune materna.","b":"Incorreta. Cretinismo decorre de hipotireoidismo congênito severo (falta de hormônio).","c":"Incorreta. Inexpressivo.","d":"Incorreta. Doença autoimune de outra linhagem celular pancreática.","e":"Incorreta. Absurdo clínico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'zcwhoh', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TRAb","Hipertireoidismo Neonatal","Gestação","Autoimunidade"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-zcwhoh', 'approved', 204)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q206 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-82sjis', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Síndrome de Carney'' é uma doença multissistêmica familiar associada a diversos tumores endócrinos. Dentre as alterações tireoidianas, qual o achado mais frequente e qual o principal tumor endócrino associado?', '[{"id":"a","text":"Nódulos tireoidianos benignos (cistadenomas) ou câncer papilífero; associado a Adenoma de Hipófise produtor de GH (Acromegalia)."},{"id":"b","text":"Bócio multinodular isolado puramente."},{"id":"c","text":"Massa gástrica tipo GIST primário da tireoide."},{"id":"d","text":"Tireoidite de Hashimoto explosiva aguda e permanente."},{"id":"e","text":"Níveis astronômicos de Insulina sérica com bócio."}]', 'a', 
        'O complexo de Carney (mutações no gene PRKAR1A) cursa com mixomas (cardíacos e cutâneos), lentiginose (manchas na pele) e hiperatividade endócrina múltipla. Os nódulos tireoidianos ocorrem em 75% dos casos, e a acromegalia por adenoma somatotrófico hipofisário é uma marca registrada sindrômica importante.', '{"a":"Correta. Síndrome endócrina rara de extrema importância para provas de subespecialidade.","b":"Incorreta. Muito inespecífico frente à riqueza da síndrome de Carney.","c":"Incorreta. GIST ocorre no complexo de Carney mas raramente se manifesta como massa tireoidiana primária habitualmente.","d":"Incorreta. Não relacionado conceitualmente à patogênese genética PRKAR1A.","e":"Incorreta. Relacionado à síndrome de insulina ou outras patologias."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '82sjis', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Complexo de Carney","Nódulos de Tireoide","Acromegalia","PRKAR1A"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-82sjis', 'approved', 205)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q207 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-sw6xmh', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O uso de Inibidores de Tirosina Quinase (TKIs), como Sunitinibe ou Sorafenibe, no tratamento de cânceres renais ou do sistema hepático, induz hipotireoidismo através de qual mecanismo atípico?', '[{"id":"a","text":"Redução do fluxo capilar tireoidiano e indução de tireoidite destrutiva indolor pálida por inibição do VEGF (fator de crescimento vascular)."},{"id":"b","text":"Aumento da absorção de iodo pelo fígado tumorizado."},{"id":"c","text":"Bloqueio do canal de sódio-potássio na garganta."},{"id":"d","text":"Transformação do T4 em iodo gasoso agudo."},{"id":"e","text":"Consumo massivo de selênio pelo tumor renal secundário."}]', 'a', 
        'Os TKIs atuam inibindo receptores de fatores de crescimento (como VEGF). A tireoide é um órgão altamente vascularizado e dependente de VEGF. Sua inibição causa isquemia capilar e subsequente fibrose ou destruição autoimune transitória, levando ao hipotireoidismo em até 40-70% dos pacientes em uso crônico.', '{"a":"Correta. Farmacologia oncológica contemporânea e eixo tireoidiano.","b":"Incorreta. Inesistente na fisiopatologia da droga.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Absurdo bioquímico.","e":"Incorreta. Sem nexo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'sw6xmh', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Sunitinibe","Sorafenibe","TKIs","Hipotireoidismo"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-sw6xmh', 'approved', 206)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q208 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-5m0yhp', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em uma emergência por ''Crise Tireotóxica'', o uso de solução de Iodo (como o Lugol) deve ser administrado prioritariamente em qual sequência temporal em relação ao início das tionamidas (Metimazol/PTU)?', '[{"id":"a","text":"O Lugol deve ser administrado pelo menos 1 a 2 horas APÓS a primeira dose de antitireoidiano de síntese, para evitar o uso do iodo como substrato para nova síntese hormonal (Escape)."},{"id":"b","text":"O Lugol deve vir 12 horas antes de qualquer outra medicação."},{"id":"c","text":"Somente se o paciente estiver em coma profundo."},{"id":"d","text":"Nunca deve ser usado na crise, pois piora o hipertiroidismo."},{"id":"e","text":"Simultaneamente na mesma seringa se possível."}]', 'a', 
        'Se dermos iodo antes de bloquear a tireoperoxidase (TPO) com tionamidas, corremos o risco de induzir o fenômeno Jod-Basedow, onde o excesso de iodo serve de ''combustível'' para a produção de ainda mais hormônio. O bloqueio prévio da síntese garante que a carga massiva de iodo aja apenas bloqueando a liberação hormonal folicular (Wolff-Chaikoff).', '{"a":"Correta. Regra de ouro da sequência terapêutica na tempestade tireotóxica.","b":"Incorreta. Risco extremo de piora clínica cardiovascular.","c":"Incorreta. É indicado na crise independente do nível de consciência, seguindo a ordem correta.","d":"Incorreta. É salvador de vidas se usado após o bloqueio das tionamidas.","e":"Incorreta. Mistura química inviável e conduta errada na sequência biológica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '5m0yhp', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Lugolização","Crise Tireotóxica","Ordem de Medicação","Endocrinologia"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-5m0yhp', 'approved', 207)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q209 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-69x2zn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Vias de Sinalização'' mais frequentemente ativada em Carcinomas Papilíferos de Tireoide, através de rearranjos genéticos do tipo RET/PTC ou mutações pontuais BRAF, é a via:', '[{"id":"a","text":"Via da Proteína Quinase Ativada por Mitógenos (MAPK / ERK)."},{"id":"b","text":"Via da Coagulação extrínseca pura."},{"id":"c","text":"Via da Glicólise anaeróbia do músculo esquelético."},{"id":"d","text":"Produção seletiva de adrenalina hipofisária."},{"id":"e","text":"Vibraconcentração do colágeno dérmico cervical."}]', 'a', 
        'Quase todos os tumores derivados da célula folicular do papilífero apresentam disfunção na via MAPK. A hiperativação crônica desta cascata de sinalização celular leva ao crescimento descontrolado e à perda da diferenciação típica da linhagem papilífera.', '{"a":"Correta. Biologia molecular oncológica central da tireoide.","b":"Incorreta. Hemostasia.","c":"Incorreta. Metabolismo muscular.","d":"Incorreta. Absurdo anatômico.","e":"Incorreta. Termo fantasioso."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '69x2zn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["BRAF","MAPK","Carcinoma Papilífero","Oncogenética"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-69x2zn', 'approved', 208)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q210 (Part 9)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-n9y588', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de ''Hipotireoidismo Permanente'' após uma crise de Tireoidite Subaguda de Quervain (viral) ocorre em qual porcentagem aproximada dos pacientes?', '[{"id":"a","text":"Cerca de 5 a 10% (a maioria dos pacientes apresenta recuperação completa da função tireoidiana após as fases hiper e hipo transitórias)."},{"id":"b","text":"Em 100% dos casos; ninguém se recupera de Quervain."},{"id":"c","text":"Somente se o paciente for triatleta."},{"id":"d","text":"Em menos de 0,1% das situações."},{"id":"e","text":"Somente em crianças recém-nascidas."}]', 'a', 
        'A Quervain é tipicamente autolimitada. A destruição tecidual é severa mas a capacidade regenerativa dos folículos é alta. No entanto, uma pequena parcela dos pacientes (cerca de 5-15% dependendo da série) mantém hipotireoidismo residual permanente devido à fibrose cicatricial excessiva da glândula.', '{"a":"Correta. Prognóstico clínico e epidemiologia da tireoidite viral.","b":"Incorreta. Conduta clínica de pânico injustificada frente ao curso natural da doença.","c":"Incorreta. O exercício não altera o curso regenerativo folicular básico.","d":"Incorreta. Subestima o risco residual real.","e":"Incorreta. Quervain é rara em neonatos; ocorre mais em adultos jovens e meia idade pós-infecções respiratórias superiores."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'n9y588', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Quervain","Prognóstico","Tireoidite Subaguda","Hipotireoidismo"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-n9y588', 'approved', 209)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q211 (Part 9)
    
END c:UserskayquDesktopQrub1QRub;