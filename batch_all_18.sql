DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-n53c5l', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Pesquisa de Corpo Inteiro'' (PCI) pós-tratamento com Iodo-131 em pacientes com câncer diferenciado de tireoide serve prioritariamente para qual finalidade específica?', '[{"id":"a","text":"Detectar focos ocultos de captação (metástases micrométricas) que não foram vistos na PCI pré-dose diagnóstica pela maior sensibilidade da dose terapêutica."},{"id":"b","text":"Medir o nível de cálcio nos ossos longos massivos profundos."},{"id":"c","text":"Confirmar se o fígado é feito de ferro."},{"id":"d","text":"Verificar se o paciente absorveu todo o iodo no estômago profunda."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'A dose terapêutica (ex: 150 mCi) é muito maior que a dose diagnóstica (ex: 2 mCi). Isso aumenta a sinalização e permite encontrar focos tumorais que seriam invisíveis de outra forma (fenômeno do ''Stunning'' inexistente no pós-dose de alta atividade), re-estratificando o risco do paciente.', '{"a":"Correta. Princípio técnico e clínico central na medicina nuclear oncológica.","b":"Incorreta. Densitometria óssea ou exames de laboratório avaliam o cálcio.","c":"Incorreta. Absurdo técnico anatômico.","d":"Incorreta. Inexpressivo funcionalmente para o seguimento tumoral nesta fase central da questão.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'n53c5l', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PCI","Iodo-131","Metástases","Medicina Nuclear"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-n53c5l', 'approved', 240)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q242 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-3x19sf', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em pacientes idosos com Doença de Graves, a ocorrência de perda ponderal súbita associada a cansaço fácil e episódios de Fibrilação Atrial deve obrigatoriamente levantar a suspeita de hipertiroidismo, mesmo que falte qual sinal clássico ocular?', '[{"id":"a","text":"Exoftalmia (Orbitopatia de Graves), pois ela ocorre em apenas cerca de 25-50% dos pacientes com Graves e é ainda mais rara no idoso."},{"id":"b","text":"Cura súbita de daltonismo antigo."},{"id":"c","text":"Crescimento de cílios dourados."},{"id":"d","text":"Surgimento de visão de calor profunda térmica."},{"id":"e","text":"Somente pele de cor amarela pálida aguda."}]', 'a', 
        'A ausência de sinais oculares característicos (oftalmopatia) não afasta a Doença de Graves. Muitos idosos manifestam-se apenas com cansaço gastrointestinal e arritmias (Hipertireoidismo Apático), o que atrasa o diagnóstico se o médico for puramente focado em propedeutica clássica juvenil de sela.', '{"a":"Correta. Semiologia avançada do idoso e doenças sistêmicas endocrinológicas.","b":"Incorreta. Fantasia técnica anticlínica.","c":"Incorreta. Absurdo biológico.","d":"Incorreta. Inexistente nestes termos científicos modernos.","e":"Incorreta. Cor amarela sugere icterícia ou caronenemia severa."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '3x19sf', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Graves","Idoso","Orbitopatia","Semiologia"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-3x19sf', 'approved', 241)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q243 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-u8qtzy', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Dosagem Sérica de Calcitonina'' em todos os nódulos tireoidianos na avaliação inicial é controversa. Qual o principal argumento favorável ao rastreio universal (em países da Europa por exemplo)?', '[{"id":"a","text":"Permite o diagnóstico precoce do Carcinoma Medular de Tireoide (CMT) em estágios curáveis antes do surgimento clínico nodal invasivo."},{"id":"b","text":"Ajuda a medir o nível de iodo no feto da paciente se ela engravidar pálida profunda."},{"id":"c","text":"Detecta câncer de pulmão oculto em 100% dos fumantes."},{"id":"d","text":"Mede a força dos dentes molares se houver excesso."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O CMT é 100% curável se operado precocemente. A PAAF tem sensibilidade limitada para o Medular. Embora no Brasil as diretrizes desaconselhem o rastreio custo-efetivo massivo devido à raridade da doença (0,5%), em outros centros o rastreio universal visa captar precocemente esses tumores agressivos.', '{"a":"Correta. Debate ético-clínico internacional em endocrinologia.","b":"Incorreta. Absurdo clínico sem base biológica.","c":"Incorreta. Marcadores de pulmão são outros (CYFRA 21, etc).","d":"Incorreta. Inexpressivo.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'u8qtzy', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Calcitonina","Rastreio","CMT","Saúde Pública"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-u8qtzy', 'approved', 242)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q244 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-htvmdt', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal causa de mortalidade em pacientes com Bócio Mergulhante Gigante que não são submetidos a cirurgia a longo prazo?', '[{"id":"a","text":"Asfixia aguda por compressão traqueal súbita decorrente de infecção respiratória alta ou hemorragia intra-nodular explosiva."},{"id":"b","text":"Câncer de estômago por refluxo agudo profundo."},{"id":"c","text":"Fratura de fêmur espontânea por peso do pescoço."},{"id":"d","text":"Suicídio tireoidiano programado por iodo excessivo."},{"id":"e","text":"Transformação total em pele de cor preta profunda."}]', 'a', 
        'Massas intratorácicas diminuem a luz traqueal progressivamente (traqueomalácia). Um episódio inflamatório banal pode causar edema de mucosa que, somado à compressão extrínseca rígida do bócio, precipita insuficiência respiratória fatal em poucos minutos.', '{"a":"Correta. Evolução clínica catastrófica final do bócio negligenciado.","b":"Incorreta. Sem relação anatômica biológica direta nesta magnitude.","c":"Incorreta. Inexistente.","d":"Incorreta. Absurdo psiquiátrico anticlínico.","e":"Incorreta. Confunde com o efeito da minociclina na glândula em si, não no paciente sistemicamente desta forma letal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'htvmdt', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bócio Mergulhante","Asfixia","Emergência Respiratória","Evolução Clínica"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-htvmdt', 'approved', 243)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q245 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-jzgak3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Regla de Ouro'' para o tratamento do hipotireoidismo severo (Coma Mixedematoso) no que tange à reposição hormonal e glicocorticoides é:', '[{"id":"a","text":"Administrar Hidrocortisona (100mg EV a cada 8h) ANTES ou simultaneamente à Levotiroxina EV (dose de ataque), para tratar uma possível insuficiência adrenal associada ou desencadeada pelo aumento do metabolismo (Síndrome de Schmidt ou estresse central)."},{"id":"b","text":"Apenas dar iodo puro na língua do paciente em coma."},{"id":"c","text":"Fazer cirurgia de sela turca cervical imediata massiva profunda."},{"id":"d","text":"Tratar com insulina glargina gelada massiva."},{"id":"e","text":"Nenhuma acima; deve-se apenas esperar o paciente acordar em 24h."}]', 'a', 
        'Aumentar o metabolismo (com reposição de T4) em um paciente com insuficiência adrenal oculta pode precipitar um choque adrenal fatal. Na dúvida clínica, repõe-se corticoide antes da tiroxina até que se descarte Addison/Síndrome Poliglandular associada.', '{"a":"Correta. Manejo de suporte crítico em endocrinologia intensiva salvador de vidas.","b":"Incorreta. Atrocidade clínica sem base fisiológica neste status severo terminal.","c":"Incorreta. Inexistente.","d":"Incorreta. Conduta criminogênica em pacientes não diabéticos agudizados nestes termos.","e":"Incorreta. O Coma Mixedematoso tem mortalidade > 30-50% se não tratado agressivamente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'jzgak3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Coma Mixedematoso","Hidrocortisona","Síndrome de Schmidt","Emergência"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-jzgak3', 'approved', 244)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q246 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-jefh0', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual receptor nuclear do hormônio tireoidiano (TR) é predominante no tecido cardíaco, sendo o principal responsável pelos efeitos cronotrópicos e inotrópicos positivos da tireotoxicos?', '[{"id":"a","text":"TR-alfa 1."},{"id":"b","text":"TR-beta 2 exclusivamente."},{"id":"c","text":"Receptor de Ocitocina massivo."},{"id":"d","text":"Receptor de Glicose intracelular profunda pálida."},{"id":"e","text":"Nervos do estômago apical."}]', 'a', 
        'O TR-alfa 1 domina no coração e vasos. O TR-beta é predominante na hipófise (regulação do TSH) e fígado. Essa distinção de isoformas é a base para o desenvolvimento futuro de drogas ''tireomiméticas seletivas'' (como o Resmetirom para NASH), que agem no fígado sem causar taquicardia severa pelo bloqueio/não ativação seletiva de TR-alfa cardíaco.', '{"a":"Correta. Fisiologia molecular cardiovascular viga-mestra.","b":"Incorreta. Predomina no feedback hipofisário central.","c":"Incorreta. Absurdo técnico.","d":"Incorreta. Inexistente.","e":"Incorreta. Inexpressivo."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'jefh0', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TR-alfa","Receptores Tireoidianos","Farmacologia","Coração"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-jefh0', 'approved', 245)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q247 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-bogj7h', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de ''Hipotireoidismo Central'' (TSH baixo ou normal com T4 livre baixo) associada a dores de cabeça persistentes, hemianopsia bitemporal (perda visual lateral) e excesso de Prolactina sugere qual diagnóstico prioritário?', '[{"id":"a","text":"Adenoma Hipofisário Macrocístico (ex: Macroadenoma ou Prolactinoma gigante) comprimindo o eixo hipotálamo-hipofisário."},{"id":"b","text":"Tireoidite de Hashimoto isolada e pálida."},{"id":"c","text":"Uso excessivo de sal marinho iodado massivo."},{"id":"d","text":"Câncer de cólon metastático inverso."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O hipotireoidismo central é causado por compressão ou destruição dos tireotrofos da adenohipófise. A massa expansiva na sela turca comprime o quiasma óptico (causando defeitos visuais) e impede o fluxo de dopamina (freio da prolactina), elevando-a secundariamente (efeito da haste hipofisária).', '{"a":"Correta. Síndrome selar completa e viga-mestra no diagnóstico diferencial endocrinológico central.","b":"Incorreta. Hashimoto cursa com TSH elevado (primário).","c":"Incorreta. Inexpressivo.","d":"Incorreta. Inexistente nestes padrões anatômofisiológicos.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'bogj7h', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Central","Adenoma Hipofisário","Quiasma Óptico","Endocrinologia"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-bogj7h', 'approved', 246)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q248 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-rsjqgl', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a conduta inicial recomendada para o tratamento da ''Oftalmopatia de Graves'' ativa moderada a grave com risco de perda visual por neuropatia óptica compressiva?', '[{"id":"a","text":"Pulsoterapia intravenosa com Metilprednisolona (ex: 500 mg a 1g/semana por ciclos) ou, em casos agudos extremos, descompressão cirúrgica orbital de urgência."},{"id":"b","text":"Apenas colírio lubrificante comum pálido."},{"id":"c","text":"Usar tapa-olho de pirata por 30 dias contínuos."},{"id":"d","text":"Tratar com insulina gelada massiva na córnea profunda."},{"id":"e","text":"Suspender o iodo na dieta."}]', 'a', 
        'A inflamação orbital severa comprime o nervo óptico no ápice da órbita. Os corticoides EV oferecem a maior eficácia e rapidez para reduzir o edema tecidual imuno-dependente. Se houver falha rápida ou perda visual eminente documentada ao fundo de olho/campo visual, a descompressão óssea por cirurgia é mandatória para salvar a visão.', '{"a":"Correta. Manejo de urgência oftalmo-endocrinológica para prevenção de cegueira iatrogênica ou autoimune.","b":"Incorreta. Medida de suporte leve insuficiente para neuropatia compressiva severa profunda.","c":"Incorreta. Absurdo clínico profilático.","d":"Incorreta. Conduta criminosa perigosa e sem base técnico-científica.","e":"Incorreta. O iodo urinário materno não é o motor prioritário desta patologia orbital específica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'rsjqgl', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Orbitopatia de Graves","Pulsoterapia","Metilprednisolona","Neuropatia Óptica"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-rsjqgl', 'approved', 247)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q249 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ktg1wn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal limitação da cintilografia de tireoide no diagnóstico de nódulos de pacientes gestantes é:', '[{"id":"a","text":"Contraindicação absoluta de uso de rádio-isótopos (I-131 ou Tc-99m) durante a gestação pelo risco de radiação ionizante ao feto e destruição da tireoide fetal."},{"id":"b","text":"O iodo queima os dentes da gestante profunda massiva."},{"id":"c","text":"Aumenta o risco de gêmeos bivitelinos pálidos."},{"id":"d","text":"Somente reduz o leite materno futuro em 100%."},{"id":"e","text":"Nenhuma limitação; é o exame padrão-ouro da gestação pálida."}]', 'a', 
        'Radioisótopos atravessam a placenta. Devido à sua afinidade pela tireoide, o iodo-131 pode destruir permanentemente a glândula do bebê. Por isso, exames nucleares (incluindo a PCI) são proibidos na gestação, devendo ser adiados para o pós-parto, priorizando-se no pré-natal apenas a ultrassonografia e, se indicado, a PAAF.', '{"a":"Correta. Regra fundamental da radioproteção obstétrica internacional.","b":"Incorreta. Inexpressivo.","c":"Incorreta. Inexistente.","d":"Incorreta. Inexpressivo.","e":"Incorreta. É formalmente contraindicado absoluto."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ktg1wn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Gestação","Cintilografia","Contraindicação","Segurança Fetal"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ktg1wn', 'approved', 248)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q250 (Part 10)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-dtvd0g', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O hormônio TSH (Glicoproteína) é composto por duas subunidades (Alfa e Beta). Qual destas subunidades é idêntica à do FSH, LH e hCG?', '[{"id":"a","text":"Subunidade Alfa."},{"id":"b","text":"Subunidade Beta exclusivamente."},{"id":"c","text":"Somente as cadeias de iodo pálidas profundas."},{"id":"d","text":"Nenhuma; o TSH é uma molécula única massiva isolada."},{"id":"e","text":"Somente em pacientes que consomem soja."}]', 'a', 
        'A subunidade Alfa é comum a todos os hormônios glicoproteicos (hCG, FSH, LH e TSH). A especificidade biológica e laboratorial de cada hormônio reside na subunidade Beta. É por isso que o hCG em níveis muito altos pode ativar o receptor de TSH fetal e materno (cross-reactivity) pela homologia entre as hélices da molécula.', '{"a":"Correta. Bioquímica hormonal viga-mestra em endocrinologia e ginecologia.","b":"Incorreta. É a parte específica e diferente de cada hormônio.","c":"Incorreta. Hormônios hipofisários não possuem iodo; apenas os hormônios periféricos da tireoide (T4/T3).","d":"Incorreta. Desmentida pela bioquímica clássica estrutural.","e":"Incorreta. Absurdo anticlínico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'dtvd0g', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TSH","Subunidade Alfa","Glicoproteínas","hCG"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-dtvd0g', 'approved', 249)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q251 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-egma2', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O uso de inibidores de checkpoint imunológico (ICIs), como Pembrolizumabe ou Nivolumabe, no tratamento de neoplasias sólidas, pode causar disfunção tireoidiana em até 15% dos pacientes. Qual o padrão clínico mais frequente desta ''Tireoidite Induzida por Imunoterápicos''?', '[{"id":"a","text":"Uma fase inicial de tireotoxicose por destruição (tireoidite destrutiva indolor), evoluindo rapidamente para hipotireoidismo primário permanente na maioria dos casos."},{"id":"b","text":"Bócio multinodular tóxico por mutação RET aguda."},{"id":"c","text":"Cura súbita de Hashimoto em 100% das vezes."},{"id":"d","text":"Apenas surgimento de nódulos de 1 mm pálidos profundos."},{"id":"e","text":"Somente aumento da Calcitonina sérica acima de 500."}]', 'a', 
        'Os ICIs reativam o sistema imune (bloqueio de PD-1 ou PD-L1), o que pode desencadear uma resposta autoimune contra a glândula tireóide. O quadro é tipicamente de uma tireoidite indolor que ''queima'' a glândula rapidamente. Por ser destrutivo, o hipotireoidismo resultante costuma ser definitivo, exigindo reposição vitalícia de levotiroxina.', '{"a":"Correta. Novo cenário clínico onco-endocrinológico de extrema importância diagnóstica.","b":"Incorreta. ICIs causam autoimunidade, não mutações somáticas nódulares.","c":"Incorreta. Pelo contrário; podem agravar ou desencadear hipotireoidismo imune.","d":"Incorreta. Causa alterações funcionais massivas, não apenas nódulos mínimos.","e":"Incorreta. Inexpressivo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'egma2', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["ICIs","Pembrolizumabe","Hipotireoidismo Iatrogênico","Tireoidite"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-egma2', 'approved', 250)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q252 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-nip64v', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A descoberta de uma captação focal incidental na glândula tireóide durante a realização de um PET-CT com FDG-18 (Incidentaloma PET) em um paciente oncológico aumenta o risco de malignidade para qual porcentagem aproximada?', '[{"id":"a","text":"Cerca de 30% a 50% (exigindo PAAF obrigatória do foco captante), mesmo que o nódulo seja pequeno."},{"id":"b","text":"Menos de 1% (deve ser ignorado)."},{"id":"c","text":"Em 100% dos casos; captação focal é sinônimo de câncer anaplásico."},{"id":"d","text":"Indica apenas excesso de iodo na dieta."},{"id":"e","text":"Somente metástases de câncer de cólon pálidas profundas."}]', 'a', 
        'Diferente da captação difusa (que sugere tireoidite ou Graves), a captação focal no PET-CT é altamente suspeita para câncer diferenciado de tireoide (ou metástase intratiroidiana). Por esse motivo, qualquer incidentaloma focal de tireoide no PET-CT, se tiver correlação com nódulo ultrassonográfico > 1 cm ou sinais de suspeição, deve ser puncionado.', '{"a":"Correta. Regra de manejo radiológico contemporâneo em oncologia.","b":"Incorreta. Subestima gravemente o risco oncológico do achado.","c":"Incorreta. Embora o risco seja alto, muitos focos captantes podem ser adenomas benignos celulares.","d":"Incorreta. A captação de FDG mede metabolismo de glicose, não de iodo.","e":"Incorreta. Diagnóstico diferencial mas o câncer primário Papilífero é o mais comum."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nip64v', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PET-CT","Incidentaloma","FDG-18","Diagnóstico"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-nip64v', 'approved', 251)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q253 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-19bgb1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Síndrome de Refetoff'' (Resistência ao Hormônio Tireoidiano - RHT) é causada, na maioria das vezes, por mutações com perda de função em qual receptor nuclear?', '[{"id":"a","text":"Receptor TR-beta (mutado no gene THRB)."},{"id":"b","text":"Receptor TR-alfa exclusivamente no coração."},{"id":"c","text":"Insulina glargina pálida profunda."},{"id":"d","text":"Nervos do estômago apical."},{"id":"e","text":"Somente em glóbulos brancos de adultos idosos."}]', 'a', 
        'A mutação no TR-beta impede o feedback negativo hipofisário (causando TSH normal ou elevado) e a ação hormonal periférica no fígado e em outros tecidos controlados pelo subtipo beta. O coração (regulado pelo TR-alfa normal) pode apresentar sinais de tireotoxicose (taquicardia) porque os níveis de T4/T3 livres sobem para tentar ''vencer'' a resistência central.', '{"a":"Correta. Genética molecular e fisiopatologia da resistência hormonal clássica.","b":"Incorreta. Mutações TR-alfa são muito mais raras e apresentam quadro clínico distinto (predomina constipação e bradicardia).","c":"Incorreta. Inexpressivo.","d":"Incorreta. Absurdo técnico.","e":"Incorreta. Absurdo clínico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '19bgb1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Refetoff","TR-beta","Resistência Hormonal","TSH"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-19bgb1', 'approved', 252)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q254 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-whbpcg', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O ''Angiosarcoma de Tireoide'' é uma neoplasia vascular rara de prognóstico extremamente reservado. Qual o principal fator epidemiológico associado ao seu surgimento em regiões específicas da Europa (ex: Alpes suíços e austríacos)?', '[{"id":"a","text":"Bócio multinodular volumoso e endêmico por longa data em áreas de carência de iodo profunda."},{"id":"b","text":"Consumo de queijo suíço massivo com sódio alto."},{"id":"c","text":"Escaladas em altas altitudes acima de 8000m."},{"id":"d","text":"Uso de calçados de couro de cabra selvagem profunda."},{"id":"e","text":"Nenhuma das anteriores; o angiosarcoma só ocorre na pele."}]', 'a', 
        'Embora o angiosarcoma possa ocorrer em qualquer lugar, sua variante tireoidiana foi descrita classicamente em portadores de bócios volumosos e antigos de regiões montanhosas. Trata-se de um tumor mesenquimal altamente invasivo que mimetiza o carcinoma anaplásico em agressividade clínica local e sistêmica.', '{"a":"Correta. Fato epidemiológico e patológico viga-mestra em oncologia tireoidiana geográfica.","b":"Incorreta. Fantasia técnica sem base científica.","c":"Incorreta. Sem relação oncológica comprovada.","d":"Incorreta. Absurdo anticlínico.","e":"Incorreta. Existe primário da tireoide como entidade patológica rara."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'whbpcg', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Angiosarcoma","Bócio Endêmico","Oncologia","Geografia Médica"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-whbpcg', 'approved', 253)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q255 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-r7m59y', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A anemia encontrada em pacientes com hipotireoidismo primário severo (não tratada) apresenta-se tipicamente como:', '[{"id":"a","text":"Anemia Normocítica e Normocrômica (Anemia de Doença Crônica), decorrente da redução da eritropoese secundária ao baixo metabolismo e demanda de oxigênio."},{"id":"b","text":"Anemia Megaloblástica isolada pálida massiva profunda."},{"id":"c","text":"Somente excesso de glóbulos brancos mutantes."},{"id":"d","text":"Hemólise aguda por iodo urinário profundo."},{"id":"e","text":"Nenhuma das anteriores; o hipotireoidismo não afeta a medula óssea."}]', 'a', 
        'A falta de hormônio tireoidiano diminui a produção de eritropoetina (EPO) pelo rim e a resposta medular. Pode coexisitr com anemia ferropriva (pela menor absorção gástrica de ferro) ou macrocítica (se houver Doença Perniciosa associada - Hashimoto em SPA tipo 2), mas a forma pura é normo/normo.', '{"a":"Correta. Mecanismo hematológico endócrino e diagnóstico laboratorial fundamental.","b":"Incorreta. Ocorre em 10% dos casos se houver anemia perniciosa autoimune, mas não define a anemia básica do hipotireoidismo puro.","c":"Incorreta. Absurdo clínico.","d":"Incorreta. Fantasia técnica biológica.","e":"Incorreta. É uma causa clássica de anemia secundária."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'r7m59y', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Anemia","Eritropoese","Hipotireoidismo","Metabolismo"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-r7m59y', 'approved', 254)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q256 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-uu48xn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O ''Pico de TSH Neonatal'' ocorre fisiologicamente em qual momento após o parto e possui qual função biológica?', '[{"id":"a","text":"Ocorre nos primeiros 30 a 60 minutos de vida, induzido pela queda de temperatura ambiental, visando estimular a produção rápida de T4 para termogênese neonatal."},{"id":"b","text":"Ocorre no décimo dia apenas para curar a asma."},{"id":"c","text":"Ocorre durante o sono profundo aos 18 anos."},{"id":"d","text":"Nenhum pico; o TSH no recém-nascido é zero."},{"id":"e","text":"Ocorre apenas se a mãe comer gengibre pálido."}]', 'a', 
        'O bebê sai de um ambiente de 37°C para um mais frio. Esse estresse térmico ativa o eixo TRH-TSH, aumentando o TSH sérico (que pode chegar a 60-80 mUI/L em 30 min). Por isso, não se recomenda colher o Teste do Pezinho ou TSH nas primeiras 48h de vida (pelo risco de falso-positivo de hipotireoidismo congênito devido a esse pico fisiológico inicial).', '{"a":"Correta. Fisiologia neonatal viga-mestra e explicação técnica da triagem neonatal.","b":"Incorreta. Inexpressivo.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Fundamental para a sobrevivência e crescimento.","e":"Incorreta. Absurdo biológico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'uu48xn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TSH Neonatal","Pico Fisiológico","Termogênese","Triagem"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-uu48xn', 'approved', 255)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q257 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-63yc66', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal repercussão reprodutiva masculina encontrada no Hipertireoidismo severo (Ex: Graves em atividade)?', '[{"id":"a","text":"Aumento dos níveis de SHBG (elevando a testosterona total mas diminuindo a testosterona livre ativa), o que pode levar a Ginecomastia e disfunção erétil."},{"id":"b","text":"Aumento maciço da barba e pelos pubianos negros profundos."},{"id":"c","text":"Produção de sêmen feito de iodo puro."},{"id":"d","text":"Cura súbita de calvície androgenética pálida profunda."},{"id":"e","text":"Somente aumento da vontade de praticar esportes massivos."}]', 'a', 
        'O excesso de hormônio tireoidiano estimula a síntese hepática de SHBG (globulina ligadora de hormônios sexuais). Isso sequestra a testosterona livre, favorecendo o desequilíbrio na relação estrógeno/andrógeno periférica, manifestando-se clinicamente como aumento das mamas (ginecomastia) e queixas de líbido reduzida.', '{"a":"Correta. Endocrinologia reprodutiva e eixo tireoidiano masculino clássico.","b":"Incorreta. Inespecífico.","c":"Incorreta. Fantasia técnica biológica.","d":"Incorreta. Não relacionado conceitualmente desta forma sistemática causal.","e":"Incorreta. Apesar da agitação, os sintomas sexuais são de falha."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '63yc66', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["SHBG","Ginecomastia","Hipertireoidismo","Saúde do Homem"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-63yc66', 'approved', 256)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q258 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-cc6tk1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Hipotiroxinemia Transitória da Prematuridade'' (THP) deve ser tratada rotineiramente com Levotiroxina em bebês nascidos com menos de 30 semanas de gestação?', '[{"id":"a","text":"Não; a THP reflete a imaturidade fisiológica do eixo hipotálamo-hipófise e a perda da transferência placentária de T4, não havendo evidência consolidada de ganho no neurodesenvolvimento com o tratamento profilático rotineiro."},{"id":"b","text":"Sim; em dose de 100 mcg para todos os bebês prematuros."},{"id":"c","text":"Somente se o bebê tiver olhos verdes pálidos profundos."},{"id":"d","text":"Apenas se a mãe usou iodo na comida massivo pálido."},{"id":"e","text":"Uso de levotiroxina em 100% das gestações de risco."}]', 'a', 
        'O prematuro apresenta baixos níveis de T4 livre por imaturidade, mas o TSH geralmente está normal. Tratar esses níveis baixos com L-T4 exógena é controverso e, na ausência de elevação do TSH ou sinais de hipotireoidismo congênito real, recomenda-se apenas o acompanhamento seriado laboratorial até a maturação do eixo.', '{"a":"Correta. Dilema clínico neonatal contemporâneo e base de evidência atualizada.","b":"Incorreta. Dose excessiva e perigosa para um prematuro extremo.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Decisão baseada na função neonatal, não preventiva irracional gestacional."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'cc6tk1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Prematuridade","THP","Levotiroxina","Eixo Hipofisário"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-cc6tk1', 'approved', 257)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q259 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-2ohdoh', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A dosagem de TSH é utilizada como rastreio inicial de rotina no diagnóstico de qual tumor hipofisário raro?', '[{"id":"a","text":"Tireotropinoma (Adenoma produtor de TSH), embora o valor de TSH possa estar ''falsamente'' dentro do limite normal (valor inapropriado para o excesso de T4 livre concomitante)."},{"id":"b","text":"Prolactinoma gigante de cor negra profunda."},{"id":"c","text":"Somatotropinoma isolado do lobo posterior."},{"id":"d","text":"Câncer de cólon oculto em 100% dos idosos pálidos."},{"id":"e","text":"Nenhum tumor hipofisário afeta o TSH sérico."}]', 'a', 
        'Diferente do hipertireoidismo primário (Graves) onde o TSH é suprimido (< 0,01), no tireotropinoma a secreção é autônoma. O achado de TSH elevado ou normal em face de um T4 Livre elevado é o marcador bioquímico suspeito princeps desta patologia neuroendócrina.', '{"a":"Correta. Raciocínio laboratorial clínico neuroendocrinológico viga-mestra.","b":"Incorreta. Dosa-se Prolactina.","c":"Incorreta. Somas-se GH/IGF-1.","d":"Incorreta. Marcadores digestivos oncológicos (CEA, etc).","e":"Incorreta. Praticamente todos afetam o eixo direta ou indiretamente por compressão da haste."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '2ohdoh', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TSH","Tireotropinoma","Adenoma Hipofisário","Laboratório"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-2ohdoh', 'approved', 258)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q260 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9ceykd', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No tratamento do hipertireoidismo com Iodo radioativo (I-131), recomenda-se suspender o Metimazol pelo menos qual período ANTES da administração da dose terapêutica e por qual justificativa técnica?', '[{"id":"a","text":"Pelo menos 3 a 5 dias antes, para evitar a inibição competitiva da captação do iodo radioativo (já que a tionamida bloqueia o transporte e organificação de iodo)."},{"id":"b","text":"Somente no momento da ingestão do comprimido de iodo."},{"id":"c","text":"A medicação nunca deve ser suspensa na sela túrcica cervical."},{"id":"d","text":"Apenas 10 minutos antes acompanhado de suco de guaco massivo pálido profundo."},{"id":"e","text":"Suspender por 1 ano para limpar o fígado tumorizado."}]', 'a', 
        'As tionamidas bloqueiam a TPO. Se a enzima estiver inibida, o radioiodo entrará na célula mas não será ''fixado'' (organificado), saindo rapidamente da glândula e reduzindo drasticamente a eficácia da dose terapêutica pretendida.', '{"a":"Correta. Prática farmacológica clínica e medicina nuclear de segurança e eficácia.","b":"Incorreta. Tempo insuficiente para restaurar a maquinaria de organificação folicular plenamente.","c":"Incorreta. Levaria à falha terapêutica completa do radioiodo em muitos pacientes.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Excesso de tempo que levaria a descontrole clínico cardiovascular severo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9ceykd', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Iodo-131","Metimazol","Suspensão","Eficácia Terapêutica"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9ceykd', 'approved', 259)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q261 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-bnuk7v', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal indicação de cirurgia em pacientes com Doença de Graves, em vez de Iodo Radioativo ou Tionamidas, é a presença de:', '[{"id":"a","text":"Bócio volumoso (> 80-100g) com sintomas compressivos locais severos (disfagia/dispineia), ou nódulos suspeitos de malignidade associados."},{"id":"b","text":"Apenas desejo estético de cicatriz no pescoço pálido profundo."},{"id":"c","text":"Fobia de comprimidos de cor branca."},{"id":"d","text":"Excesso de desejo de comer sal marinho massivo no litoral."},{"id":"e","text":"Somente em mulheres acima dos 90 anos isoladamente pálidas."}]', 'a', 
        'Grandes bócios respondem mal ao radioiodo (que pode causar edema agudo e asfixia se já houver compressão) e raramente atingem eutireoidismo sustentado apenas com medicações. A tireoidectomia total oferece cura imediata do hipertireoidismo e resolve o problema mecânico compressivo simultaneamente.', '{"a":"Correta. Indicação cirúrgica clássica e absoluta para bócio volumoso.","b":"Incorreta. Pacientes costumam preferir evitar cicatrizes se possível.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Cirurgia no muito idoso exige cautela; não é a indicação primária ''somente'' por idade desta forma."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'bnuk7v', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Graves","Cirurgia","Bócio Gigante","Compressão"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-bnuk7v', 'approved', 260)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q262 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ui0pd0', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoperoxidase'' (TPO) localiza-se em qual região subcelular do tireócito e qual o seu papel motor na síntese de T4?', '[{"id":"a","text":"Membrana apical (voltada para o coloide); realiza a oxidação do iodo e a iodação da tireoglobulina (organificação)."},{"id":"b","text":"Dentro do núcleo, fabricando DNA de cor pálida profunda massiva."},{"id":"c","text":"Na membrana basal, puxando o iodo do sangue central profundo pálido."},{"id":"d","text":"Somente dentro do retículo endoplasmático rugoso massivo pálido."},{"id":"e","text":"Inexistente no ser humano adulto saudável pálido."}]', 'a', 
        'A TPO é a enzima viga-mestra da tireoide. Ela utiliza peróxido de hidrogênio (H2O2) para ''ativar'' o iodo e acoplá-lo aos resíduos de tirosina da tireoglobulina no limite entre a célula e o lúmen folicular preenchido por coloide.', '{"a":"Correta. Localização anatômica e funcional molecular precisa.","b":"Incorreta. Não relacionado conceitualmente à sela tumoral oncológica.","c":"Incorreta. O NIS (Simportador de Sódio-Iodo) é quem faz essa função na membrana basal.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Essencial para a vida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ui0pd0', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TPO","Tireocito","Membrana Apical","Bioquímica"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ui0pd0', 'approved', 261)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q263 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-5v43y6', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O ''Nódulo Quente'' na cintilografia de tireoide tem qual significado prioritário em termos de risco de malignidade?', '[{"id":"a","text":"Risco de malignidade desprezível (próximo de zero), pois nódulos hiperfuncionantes raramente são carcinomas de tireoide diferenciados clássicos."},{"id":"b","text":"Indicação imediata de cirurgia oncológica radical profunda massiva pálida."},{"id":"c","text":"Sinal clássico de câncer anaplásico terminal pálido profundo."},{"id":"d","text":"Informa que o paciente é rádio-resistente em 100% dos exames."},{"id":"e","text":"Necessidade de PAAF de urgência no primeiro minuto diagnóstico."}]', 'a', 
        'Nódulos quentes ''sequestram'' a captação de iodo e suprimem o tecido normal por autonomia de produção. Como o câncer de tireoide diferenciado quase nunca é hiperfuncionante, um nódulo quente afasta a necessidade de PAAF inicial, dilitando a conduta para o manejo do hipertiroidismo laboratorial (radioiodo ou cirurgia do nódulo tóxico).', '{"a":"Correta. Valor preditivo negativo do nódulo quente na cintilografia clássica.","b":"Incorreta. A cirurgia pode ser necessária para tratar o hipertiroidismo, mas não por suspeita oncológica.","c":"Incorreta. Anaplásicos são massas pétreas e ''frias''.","d":"Incorreta. Justamente são os melhores candidatos ao rádio-iodo.","e":"Incorreta. PAAF em nódulo quente gera atipias citológicas induzidas pelo status funcional que podem induzir a erros cirúrgicos."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '5v43y6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Nódulo Quente","Cintilografia","Malignidade","Diagnóstico"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-5v43y6', 'approved', 262)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q264 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-byjhvv', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de ''Hipotireoidismo primário'' durante a infância pode levar ao ''Sinal de Kocher-Debré-Semélaigne''. Qual a característica clínica principal desta síndrome rara?', '[{"id":"a","text":"Pseudohipertrofia muscular generalizada (especialmente nas panturrilhas), dando à criança um aspecto de ''pequeno Hércules'', associado à lentidão de resposta muscular e hipotireoidismo severo."},{"id":"b","text":"Perda total de dentes em 24h pálida profunda."},{"id":"c","text":"Crescimento de orelhas gigantes pálidas profundas."},{"id":"d","text":"Desenvolvimento de inteligência superior matemática isolada aguda profunda."},{"id":"e","text":"Apenas febre baixa persistente por 30 dias."}]', 'a', 
        'A falta de hormônio tireoidiano causa um depósito patológico de mucopolissacarídeos nos músculos e altera a contrabilidade, gerando um aumento no volume muscular paradoxal (pseudohipertrofia) em crianças severamente hipotiroideas. A reposição hormonal reverte o quadro clínico por completo.', '{"a":"Correta. Semiologia pediátrica rara e definidora em endocrinologia.","b":"Incorreta. Inexpressivo.","c":"Incorreta. Inexpressivo.","d":"Incorreta. O hipotireoidismo congênito causa deficiência intelectual (Cretinismo).","e":"Incorreta. Inespecífico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'byjhvv', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Kocher-Debré-Semélaigne","Hipotireoidismo","Pseudohipertrofia","Pediatria"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-byjhvv', 'approved', 263)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q265 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-d5gcqk', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal intervenção diagnóstica para confirmar a suspeita de ''Insuficiência Adrenal'' em um paciente que apresenta TSH elevado mas que não melhora clinicamente (mantém hipotensão e astenia severa) após reposição generosa de Levotiroxina?', '[{"id":"a","text":"Teste de estímulo com ACTH sintético (Cosintropina) ou dosagem de Cortisol matinal sérico e ACTH plástico profundo pálido."},{"id":"b","text":"Apenas medir o iodo na urina pálida profunda."},{"id":"c","text":"Biópsia de garganta massiva profunda pálida aguda."},{"id":"d","text":"RX de bacia para excluir fraturas patológicas profundas."},{"id":"e","text":"Nenhuma acima; deve-se apenas aumentar a dose de T4 até 600 mcg."}]', 'a', 
        'A suspeita recai sobre a Síndrome de Schmidt (SPA 2). No paciente com falta de cortisol, o uso de tiroxina agrava o consumo metabólico de cortisol residual, podendo precipitar crise adrenal aguda. O diagnóstico da insuficiência adrenal é prioritário.', '{"a":"Correta. Manejo de síndromes poliglandulares autoimunes críticas.","b":"Incorreta. Inexpressivo.","c":"Incorreta. Inexistente.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Doses astronômicas de T4 matariam o paciente em crise adrenal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'd5gcqk', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Schmidt","Insuficiência Adrenal","Cortisol","SPA"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-d5gcqk', 'approved', 264)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q266 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-cqlkyy', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Biópsia por PAAF'' tem o seu maior índice de FALHA diagnóstica (falsos negativos ou resultados inconclusivos) em qual destes tipos de nódulo tireoidiano?', '[{"id":"a","text":"Nódulos predominantemente císticos (líquidos) e nódulos volumosos de linhagem folicular (Bethesda IV)."},{"id":"b","text":"Carcinoma Papilífero de Tireoide clássico sólido."},{"id":"c","text":"Tireoidite de Hashimoto pálida aguda profunda."},{"id":"d","text":"Cisto coloide simples preenchido por gelatina."},{"id":"e","text":"Nódulo quente cintilográfico pálido massivo profundo."}]', 'a', 
        'Nódulos císticos têm poucas células em suspensão (amostra paucicelular ou inadequada). Nódulos de padrão folicular não podem ser diferenciados como malignos na citologia (exigem análise de cápsula ausente na PAAF). Esses dois cenários são os principais responsáveis pela necessidade de repetir o exame ou encaminhar à cirurgia sem diagnóstico por sela.', '{"a":"Correta. Limitações técnicas e biológicas da citologia tireoidiana.","b":"Incorreta. É o diagnóstico mais fácil e seguro da PAAF.","c":"Incorreta. Pode ter atipias, mas o diagnóstico inflamatório é geralmente claro.","d":"Incorreta. Facilmente identificado pela coloide abundante.","e":"Incorreta. Ponto funcional, não diagnóstica histológica primária da PAAF isolada."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'cqlkyy', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PAAF","Limitações","Cisto","Bethesda IV"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-cqlkyy', 'approved', 265)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q267 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-6x9tkl', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma Folicular de Tireoide é diferenciado do Adenoma Folicular (Benigno) através de qual achado obrigatório na análise histopatológica da peça cirúrgica?', '[{"id":"a","text":"Presença inequívoca de invasão da cápsula tumoral ou invasão de vasos sanguíneos pelo tumor."},{"id":"b","text":"Apenas presença de coloide de cor preta profunda."},{"id":"c","text":"Mutações do gene da insulina pálida profunda pálida."},{"id":"d","text":"Crescimento de dentes dentro do nódulo pálido profundo."},{"id":"e","text":"Nenhuma das anteriores; a PAAF já faz essa diferenciação 100% das vezes."}]', 'a', 
        'Essa é a viga-mestra do diagnóstico dos tumores foliculares. Como a morfologia das células pode ser idêntica no adenoma e no carcinoma, a confirmação de malignidade só ocorre se as células tumorais atravessarem totalmente a cápsula fibro-focal ou entrarem no lúmen de vasos intratumorais ou capsulares.', '{"a":"Correta. Critério anátomo-patológico ouro para malignidade folicular tireoidiana.","b":"Incorreta. Coloide preto é efeito iatrogênico de minociclina, não sinal de câncer.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Caracteriza teratomas, não neoplasias foliculares puras.","e":"Incorreta. PAAF não avalia cápsula, apenas células soltas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '6x9tkl', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Invasão Capsular","Carcinoma Folicular","Patologia","Diferenciação"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-6x9tkl', 'approved', 266)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q268 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-vshqgd', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de ''Hipotireoidismo transitório'' (fase de hipo) após o hipertireoidismo da Tireoidite Silenciosa (ou Quervain) deve ser tratada se:', '[{"id":"a","text":"Houver sintomas incapacitantes de hipotireoidismo severo ou se o TSH ultrapassar 10 mUI/L, idealmente por um período curto de 3 a 6 meses."},{"id":"b","text":"O paciente desejar ter câncer de tireoide."},{"id":"c","text":"Somente se a pele estiver de cor azul pálido profundo."},{"id":"d","text":"Uso de dose massiva de Levotiroxina por 40 anos ininterruptos."},{"id":"e","text":"Nenhuma acima; nunca se trata a fase de hipo da tireoidite viral."}]', 'a', 
        'A fase de hipotireoidismo das tireoidites costuma regredir. Trata-se sintomáticos ou níveis elevados de TSH (para evitar bócio compensatório). A reavaliação periódica é mandatória para tentar suspender a medicação e confirmar se a função glandular nativa se restabeleceu.', '{"a":"Correta. Manejo clínico prudente e reversível de patologias autolimitadas.","b":"Incorreta. Absurdo psiquiátrico.","c":"Incorreta. Absurdo clínico pálido profundo.","d":"Incorreta. Excesso terapêutico injustificado.","e":"Incorreta. Pacientes sintomáticos merecem tratamento temporário."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'vshqgd', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Fase de Hipotireoidismo","Tireoidite","Manejo Clínico","Recuperação"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-vshqgd', 'approved', 267)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q269 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-le0936', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoglobulina Sérica'' (TG) em pacientes saudáveis com glândula íntegra costuma estar em qual faixa de valor?', '[{"id":"a","text":"Geralmente entre 1 e 50 ng/mL, podendo subir significativamente em bócio multinodular ou tireoidites."},{"id":"b","text":"Sempre indetectável (< 0,01) massiva profunda pálida."},{"id":"c","text":"Acompanha o nível de glicose em 100% das refeições pálidas."},{"id":"d","text":"Mede o iodo urinário materno pálido profundo."},{"id":"e","text":"Nenhum valor; a TG não existe no sangue de seres humanos vivos."}]', 'a', 
        'A TG é a proteína de estoque do hormônio. Um vazamento fisiológico ocorre para o sangue. Níveis normais excluem tireoide factícia no diagnóstico do hipertireoidismo pálido profundo, pois factícia suprime a glândula e baixa a TG para < 1.', '{"a":"Correta. Referência laboratorial bioquímica para o clínico geral.","b":"Incorreta. Só ocorre em pacientes tireoidectomizados ou com agenesia tireoidiana.","c":"Incorreta. Absurdo bioquímico.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Existe e é muito utilizada clinicamente."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'le0936', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoglobulina","Valores de Referência","Bioquímica","Laboratório"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-le0936', 'approved', 268)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q270 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-sm72r1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Síndrome de Jod-Basedow'' descreve:', '[{"id":"a","text":"O desenvolvimento de Hipertireoidismo clínico após uma carga elevada de iodo (ex: contraste radiológico, amiodarona ou suplementos de algas) em uma glândula previamente suscetível (Bócio Multinodular ou Graves latente)."},{"id":"b","text":"A cura súbita de câncer de pele profunda pálida."},{"id":"c","text":"Falência medular por falta de iodo massivo pálido."},{"id":"d","text":"Transformação da tireoide em osso sólido pálido profundo."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'É o oposto do Wolff-Chaikoff. Em glândulas com autonomia (BMN) ou prontas para atacar (Graves), o iodo extra serve de matéria-prima para uma explosão de síntese de T4/T3, levando à tireotoxicose iatrogênica induzida por excesso de substrato.', '{"a":"Correta. Fenômeno fisiopatológico clássico e iatrogênico comum.","b":"Incorreta. Absurdo clínico pálido profundo.","c":"Incorreta. Fantasia técnica biológica.","d":"Incorreta. Calcificação é um processo degenerativo, não hormonal agudo.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'sm72r1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Jod-Basedow","Hipertireoidismo Iatrogênico","Contraste","Iodo"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-sm72r1', 'approved', 269)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q271 (Part 11)
    
END c:UserskayquDesktopQrub1QRub;