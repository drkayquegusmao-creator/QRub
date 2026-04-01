DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-v8bld4', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A maior parte da tiroxina (T4) e da tri-iodotironina (T3) circulantes no plasma está ligada a proteínas transportadoras. Qual é a principal proteína responsável pelo transporte de cerca de 75% do T4 e 75% do T3 séricos?', '[{"id":"a","text":"Globulina Ligadora de Tiroxina (TBG)."},{"id":"b","text":"Transtiretina (Pré-albumina ligadora de tiroxina - TTR/TBPA)."},{"id":"c","text":"Albumina."},{"id":"d","text":"Hemoglobina Glicada."},{"id":"e","text":"Ceruloplasmina."}]', 'a', 
        'A TBG é a principal proteína de transporte dos hormônios tireoidianos devido à sua alta afinidade. Embora a albumina tenha maior capacidade (quantidade), sua afinidade é muito menor. Condições que alteram a síntese hepática de TBG (gravidez, estrógenos, cirrose) interferem drasticamente no nível de hormônio total, mas não no livre.', '{"a":"Correta. Principal proteína carreadora de alta afinidade.","b":"Incorreta. Transporta cerca de 15% do T4 e é importante para o transporte de tiroxina para o sistema nervoso central (Cerebrospinall Fluid).","c":"Incorreta. Transporta cerca de 10% apesar de ser muito abundante.","d":"Incorreta. Marcador de glicemia crônica.","e":"Incorreta. Transportadora de cobre."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'v8bld4', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TBG","Proteínas de Transporte","Fisiologia","Hormônios"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-v8bld4', 'approved', 150)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q152 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-aojlv0', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente em uso de altas doses de Ácido Acetilsalicílico (Aspirina) ou Heparina pode apresentar qual alteração paradoxal nos exames de laboratório da tireoide?', '[{"id":"a","text":"Aumento temporário do T4 Livre devido ao deslocamento do hormônio de suas proteínas transportadoras (TBG/Albumina) in vitro ou in vivo."},{"id":"b","text":"Destruição do TSH hipofisário."},{"id":"c","text":"Cura espontânea do hipotireoidismo de Hashimoto."},{"id":"d","text":"Aumento maciço da Calcitonina."},{"id":"e","text":"Redução do volume glandular por resfriamento local."}]', 'a', 
        'Salicilatos (em altas doses) e ácidos graxos livres (estimulados pela heparina via lípase lipoproteica) competem com o T4 pelo sítio de ligação nas proteínas transportadoras. Isso resulta em um aumento espúrio da fração livre (T4L) nos ensaios laboratoriais comuns, o que pode levar a diagnósticos incorretos de hipertireoidismo se o clínico não considerar o uso destas drogas.', '{"a":"Correta. Interferência medicamentosa clássica em laboratórios de endocrinologia.","b":"Incorreta. O TSH responde ao feedback; se o T4 livre sobe (realmente ou laboratorialmente), o TSH cai por feedback, não por destruição.","c":"Incorreta. Irreal e anticientífico.","d":"Incorreta. Aspirina não estimula as células C.","e":"Incorreta. Absurdo clínico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'aojlv0', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Aspirina","Heparina","T4 Livre","Interferência Laboratorial"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-aojlv0', 'approved', 151)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q153 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-uwxaoo', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O tratamento recomendado para a Tireotoxicose Induzida por Amiodarona (TIA) Tipo 2, caracterizada por destruição folicular inflamatória (tireoidite destrutiva), baseia-se em:', '[{"id":"a","text":"Corticoterapia sistêmica (ex: Prednisona 30-40 mg/dia) com desmame gradual ao longo de 2 a 3 meses."},{"id":"b","text":"Iodo Radioativo de urgência."},{"id":"c","text":"Metimazol 60 mg/dia em dose única para o resto da vida."},{"id":"d","text":"Plasmaférese terapêutica diária por 30 dias."},{"id":"e","text":"Cirurgia de urgência de bócio lingual."}]', 'a', 
        'Diferente da TIA Tipo 1 (que é por excesso de iodo síntese), a Tipo 2 é uma tireoidite inflamatória/destrutiva. O excesso de hormônio no sangue é de hormônios pré-formados. Os corticoides estabilizam a membrana lisossomal e reduzem a inflamação, bloqueando a destruição adicional e resolvendo o quadro rapidamente.', '{"a":"Correta. Tratamento padrão-ouro para TIA Tipo 2.","b":"Incorreta. A captação de iodo na TIA tipo 2 é < 1%, tornando o rádio-iodo ineficaz.","c":"Incorreta. Tionamidas não tratam a destruição (liberação de hormônio já produzido).","d":"Incorreta. Reservado para casos de tempestade tireotóxica refratária de extrema gravidade.","e":"Incorreta. Sem nexo anatômico básico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'uwxaoo', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Amiodarona","TIA Tipo 2","Prednisona","Tratamento"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-uwxaoo', 'approved', 152)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q154 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-h0tzdf', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Osteocalcina'' e a ''Globulina Ligadora de Hormônios Sexuais'' (SHBG) podem ser utilizadas como marcadores indiretos de que parâmetro na Doença de Graves?', '[{"id":"a","text":"Ação excessiva do hormônio tireoidiano nos tecidos periféricos (ossos e fígado)."},{"id":"b","text":"Metástases para o cérebro."},{"id":"c","text":"Nível de gordura subcutânea no abdome."},{"id":"d","text":"Avaliação de resposta a antibióticos."},{"id":"e","text":"Medição do tamanho do nódulo medular fetal."}]', 'a', 
        'Os hormônios tireoidianos estimulam a síntese hepática de SHBG e o turnover ósseo (libertando osteocalcina). Em casos de dúvida laboratorial (ex: resistência ao hormônio ou interferências no TSH/T4L), níveis elevados de SHBG e osteocalcina confirmam que os tecidos periféricos estão sentindo o excesso de hormônio tireoidiano.', '{"a":"Correta. Marcadores de ação tecidual (''end-organ targets'').","b":"Incorreta. Sem nexo.","c":"Incorreta. Inespecífico.","d":"Incorreta. Inexistente.","e":"Incorreta. Absurdo técnico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'h0tzdf', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["SHBG","Osteocalcina","Marcadores de Ação","Graves"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-h0tzdf', 'approved', 153)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q155 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-22pinh', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Linfoma Primário da Tireóide é uma neoplasia rara e agressiva. Qual o subtipo histológico mais frequente e qual a principal associação etiológica?', '[{"id":"a","text":"Linfoma Difuso de Grandes Células B (DLBCL) e Linfoma MALT; associado à Tireoidite de Hashimoto crônica de longa data."},{"id":"b","text":"Linfoma de Hodgkin Esclerose Nodular; associado à exposição ao Radônio."},{"id":"c","text":"Leucemia Mieloide Crônica infiltrativa; associada ao tabagismo excessivo."},{"id":"d","text":"Sarcoma de Kaposi cervical; associado ao HIV estádio IV."},{"id":"e","text":"Linfoma de Burkitt endêmico; associado à deficiência de selênio extremo."}]', 'a', 
        'O Linfoma Primário da Tireoide tem uma forte correlação biológica com a Tireodite de Hashimoto (risco 40-80 vezes maior que na população geral). O DLBCL é a variante mais agressiva, apresentando crescimento rápido, enquanto o MALT (tecido linfoide associado à mucosa) tem melhor prognóstico.', '{"a":"Correta. Patologia e epidemiologia clássica do linfoma tireoidiano.","b":"Incorreta. Hodgkin raramente é primário da tireoide.","c":"Incorreta. Causa leucocitose medular, não nódulo infiltrativo tireoidiano primário habitualmente.","d":"Incorreta. Doença vascular sarcomatosa imunossuprimida.","e":"Incorreta. Burkitt afeta mandíbula e abdome; sem relação específica causal descrita com a tireoide deste modo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '22pinh', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Linfoma","Hashimoto","DLBCL","Oncologia"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-22pinh', 'approved', 154)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q156 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-zi2107', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Durante o tratamento com Iodo-131 para ablação do câncer de tireoide, recomenda-se que o paciente chupe balas azedas (ácidas) ou consuma suco de limão após o procedimento por qual motivo?', '[{"id":"a","text":"Estimular o fluxo salivar e acelerar a lavagem (wash-out) do iodo radioativo das glândulas salivares, reduzindo o risco de parotidite actínica e xerostomia."},{"id":"b","text":"Neutralizar o gosto metálico da radiação no estômago."},{"id":"c","text":"Melhorar a absorção do iodo pelo tumor."},{"id":"d","text":"Acidificar o pH sanguíneo para precipitar ocitocina."},{"id":"e","text":"Somente por conforto psicológico ao paladar agredido."}]', 'a', 
        'O NIS (transportador de iodo) também é expresso nas glândulas salivares. O iodo radioativo nelas acumulado pode causar inflamação (sialadenite/parotidite) e perda permanente de salivação. O estímulo sialogogo (balas azedas) protege as glândulas ao diminuir o tempo de contato e a dose de radiação local.', '{"a":"Correta. Prática preventiva viga-mestra em medicina nuclear terapêutica.","b":"Incorreta. Embora ajude no paladar, o principal objetivo é a proteção das parótidas.","c":"Incorreta. Não interfere na biologia tumoral NIS-dependente desta forma sistêmica.","d":"Incorreta. Sem base fisiológica.","e":"Incorreta. Ignora o benefício biológico radioprotector nas mucosas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'zi2107', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Iodo-131","Glândulas Salivares","Sialadenite","Prevenção"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-zi2107', 'approved', 155)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q157 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-2e6cxu', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O uso de Monitorização Intraoperatória de Nervos (IONM) durante a tireoidectomia tem como principal objetivo:', '[{"id":"a","text":"Identificar funcionalmente e testar a integridade dos nervos laríngeos recorrentes e superiores, auxiliando na redução de lesões nervosas traumáticas permanentes."},{"id":"b","text":"Medir o nível de cálcio em tempo real."},{"id":"c","text":"Guiar o laser de robótica para destruição seletiva de metástases."},{"id":"d","text":"Aspirar fumaça cirúrgica com precisão micrométrica."},{"id":"e","text":"Fazer diagnóstico histopatológico intrauterino fetal."}]', 'a', 
        'A IONM permite ao cirurgião localizar o nervo mesmo sob sangramento ou em reoperações (onde há fibrose), além de confirmar se o sinal elétrico (resposta motora da laringe) está preservado após a manipulação. Embora não substitua a técnica cirúrgica cuidadosa, é um importante adjuvante para segurança do paciente.', '{"a":"Correta. Tecnologia aplicada à segurança cirúrgica laringológica e tireoidiana.","b":"Incorreta. A IONM mede atividade eletromiográfica, não bioquímica.","c":"Incorreta. Sem relação funcional robótica específica fundamental desta ferramenta isolada.","d":"Incorreta. Função de aspiradores e filtros cirúrgicos.","e":"Incorreta. Absurdo técnico sem nexo cirúrgico cervical."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '2e6cxu', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["IONM","Nervo Recorrente","Segurança Cirúrgica","Tecnologia"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-2e6cxu', 'approved', 156)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q158 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-i7tqit', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No manejo do hipotireoidismo pós-operatório imediato, o surgimento de parestesias graves e espasmos musculares dolorosos (carpopedais) que não respondem satisfatoriamente à reposição de Cálcio deve sugerir qual deficiência iatrogênica associada?', '[{"id":"a","text":"Hipomagnesemia (Magnésio baixo)."},{"id":"b","text":"Deficiência massiva de Vitamina C."},{"id":"c","text":"Excesso de Vitamina D tóxica."},{"id":"d","text":"Acúmulo de Chumbo nos ossos."},{"id":"e","text":"Sódio elevado no sangue central."}]', 'a', 
        'O magnésio é essencial para a secreção de paratormônio (PTH) pela glândula paratireoide e para a sua ação periférica nos tecidos (osso/rim). Em pacientes graves ou desnutridos, a hipomagnesemia causa um estado de ''resistência ao cálcio'' e hipoparatiroidismo funcional severo. Sem corrigir o magnésio, o cálcio raramente normaliza.', '{"a":"Correta. Fato bioquímico crucial no equilíbrio mineral pós-operatório.","b":"Incorreta. Causa escorbuto, não hipocalcemia neuromuscular aguda desta forma.","c":"Incorreta. Causaria hipercalcemia.","d":"Incorreta. Causa intoxicação sistêmica lenta e anemia sideroblástica.","e":"Incorreta. Causaria desidratação e confusão mental.","f":"Incorreta. O magnésio deve ser reposto antes ou simultaneamente ao cálcio em casos refratários."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'i7tqit', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipomagnesemia","Cálcio","Hipocalcemia","Manejo Mineral"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-i7tqit', 'approved', 157)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q159 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-dnbek4', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoide de Riedel'' diferencia-se do Carcinoma Anaplásico de Tireoide prioritariamente por:', '[{"id":"a","text":"Ser uma doença fibro-inflamatória benigna agressiva localmente (associada a IgG4), com crescimento mais lento que o anaplásico e ausência de metástases a distância."},{"id":"b","text":"Ser curável apenas com antibióticos por 7 dias."},{"id":"c","text":"Ocorre apenas em crianças menores de 1 ano."},{"id":"d","text":"Não causar bócio endurecido (é mole à palpação)."},{"id":"e","text":"Aumentar drasticamente a altura do paciente por liberação excessiva de GH."}]', 'a', 
        'Ambas apresentam-se como uma massa pescoçosa pétrea e fixa. No entanto, o anaplásico mata o paciente em meses devido às metástases sistêmicas e à anaplasia citológica rala. A Riedel é uma fibrose tecidual que pode demorar anos para progredir e frequentemente está associada a fibroses em outros órgãos (fibrose retroperitoneal).', '{"a":"Correta. Diferencial clínico patológico entre uma doença esclerosante e um tumor letal.","b":"Incorreta. Tratada com corticoides ou tamoxifeno, não antibióticos.","c":"Incorreta. É doença de adultos de meia-idade e idosos.","d":"Incorreta. Pelo contrário; Riedel é conhecida como tireoidite lenhosa (''woody'').","e":"Incorreta. Inexistente clinicamente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'dnbek4', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Riedel","Anaplásico","Diagnóstico Diferencial","Patologia"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-dnbek4', 'approved', 158)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q160 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-i58vb6', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A conversão periférica de T4 para T3 reverso (rT3), em vez de T3 ativo, ocorre preferencialmente sob ação de qual enzima e em qual cenário clínico frequente?', '[{"id":"a","text":"Deiodinase tipo 3 (D3); comum em estados de jejum prolongado, trauma grave e sepse (Síndrome do Eutireoideo Doente)."},{"id":"b","text":"Deiodinase tipo 1 (D1) no coração saudavel."},{"id":"c","text":"Alfa-amilase na saliva."},{"id":"d","text":"Lipoproteína lípase em atletas de elite."},{"id":"e","text":"Pepsina gástrica após alimentação rica em proteínas."}]', 'a', 
        'A D3 retira o iodo do anel interno da tiroxina(T4), transformando-a em T3 reverso (inativo metabolicamente). Em doenças sistêmicas críticas, o corpo ativa a D3 para economizar energia, reduzindo o metabolismo e impedindo a formação de T3 livre ativo pela D1/D2.', '{"a":"Correta. Mecanismo de adaptação metabólica no estresse celular e sistêmico.","b":"Incorreta. D1 participa da síntese de T3 ativo (anel externo).","c":"Incorreta. Digestão de amido.","d":"Incorreta. Metabolismo lipídico.","e":"Incorreta. Digestão proteica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'i58vb6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["T3 Reverso","Deiodinase tipo 3","Eutireoideo Doente","Metabolismo"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-i58vb6', 'approved', 159)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q161 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-cpubak', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A '' Orbitopatia de Graves'' ativa é classificada e monitorada em termos de gravidade e atividade por qual escore clínico internacionalmente reconhecido?', '[{"id":"a","text":"Clinical Activity Score (CAS)."},{"id":"b","text":"Escore de Apgar cervical."},{"id":"c","text":"Classificação de Child-Pugh ocular."},{"id":"d","text":"Critérios de NYHA para pulmão e olho."},{"id":"e","text":"Escala de Glasgow-Cervical de 1 a 15."}]', 'a', 
        'O CAS avalia sinais de inflamação orbital (dor, hiperemia conjuntival, edema de carúncula, inchaço palpebral). Um escore ≥ 3/7 ou 4/10 define a doença oculares como ''ativa'', justificando o uso de imunossupressão (corticoide pulsoterapia) em vez de apenas medidas conservadoras.', '{"a":"Correta. Ferramenta clínica de decisão terapêutica oftalmo-endocrinológica.","b":"Incorreta. Usado em pediatria/neonatologia inicial após o nascimento.","c":"Incorreta. Usado em cirrose hepática.","d":"Incorreta. Classificação funcional de insuficiência cardíaca.","e":"Incorreta. Avalia nível de consciência em neurologia."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'cpubak', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Orbitopatia","Graves","Clinical Activity Score","CAS"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-cpubak', 'approved', 160)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q162 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-hruqem', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal limitação no uso exclusivo do T3 livre isolado para o diagnóstico de hipotireoidismo primário?', '[{"id":"a","text":"O T3 sérico é o último hormônio a cair no hipotireoidismo severo (devido à compensação central via TSH e aumento da deiodinação), apresentando baixa sensibilidade diagnóstica."},{"id":"b","text":"O T3 causa câncer se dosado em jejum prolongado."},{"id":"c","text":"Ninguém produz T3 após os 40 anos."},{"id":"d","text":"O T3 é destruído pelo ar atmosférico no momento da coleta."},{"id":"e","text":"O T3 livre sobe no hipotireoidismo leve em 100% dos casos."}]', 'a', 
        'No início do hipotireoidismo, a tireoide e os tecidos periféricos ''priorizam'' a produção de T3 para manter o eutireoidismo tecidual o máximo possível, enquanto o T4 total e livre já estão caindo. Portanto, um T3 normal não afasta hipotireoidismo, tornando o TSH e o T4 livre os marcadores prioritários para diagnóstico.', '{"a":"Correta. Conceito interpretativo avançado de exames hormonais.","b":"Incorreta. Absurdo técnico.","c":"Incorreta. Fisiologia básica desmente.","d":"Incorreta. Absurdo técnico.","e":"Incorreta. Pode haver uma elevação compensatória transitória pálida em fase subclínica, mas não é regra em 100% e é o TSH que sobe primeiro."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hruqem', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["T3 Livre","Hipotireoidismo","Laboratório","Bioquímica"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-hruqem', 'approved', 161)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q163 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-dprm28', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No rastreio laboratorial neonatal (Teste do Pezinho), a dosagem inicial de T4 livre ou TSH varia entre os estados brasileiros. Qual o valor de corte habitual de TSH neonatal no sangue de papel de filtro (amostra de triagem) que exige recoleta de urgência para confirmar a suspeita de hipotireoidismo congênito?', '[{"id":"a","text":"Geralmente TSH > 10 mUI/L (TSH neonatal elevado)."},{"id":"b","text":"Geralmente TSH > 100 mUI/L apenas."},{"id":"c","text":"Qualquer TSH detectável."},{"id":"d","text":"TSH < 0,1 mUI/L."},{"id":"e","text":"Não se dosa TSH, apenas Calcitonina no bebê."}]', 'a', 
        'Níveis de TSH no papel de filtro acima de 10 mUI/L são suspeitos; níveis muito altos (> 20 ou 40 dependendo do laboratório) autorizam início imediato do tratamento antes mesmo do resultado confirmatório venoso em alguns protocolos estaduais prioritários para salvar o QI da criança.', '{"a":"Correta. Parâmetro de saúde pública nacional brasileira importante.","b":"Incorreta. Valor excessivamente alto que perderia muitos diagnósticos críticos iniciais.","c":"Incorreta. Recém-nascidos normais possuem TSH detectável fisiologicamente.","d":"Incorreta. TSH baixo sugere hipertiroidismo neonatal ou hipotira central, menos sensível do que o alvo da triagem em massa.","e":"Incorreta. Triagem neonatal de rotina não inclui calcitonina."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'dprm28', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Teste do Pezinho","TSH Neonatal","Pediatria","Triagem"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-dprm28', 'approved', 162)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q164 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8fx43p', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Biópsia Core'' (ou macrobiópsia por agulha grossa) de tireoide é indicada preferencialmente em qual destas situações de difícil diagnóstico?', '[{"id":"a","text":"Nódulos com laudos de PAAF repetidamente indeterminados (Bethesda III/IV) em nódulos maiores, suspeita de Linfoma ou Carcinoma Anaplásico, para obter arquitetura histológica básica."},{"id":"b","text":"Para esvaziar cistos benignos pequenos de 1 mm."},{"id":"c","text":"Em gestantes com Graves apenas por curiosidade."},{"id":"d","text":"Para substituir o ultrassom em 100% dos casos."},{"id":"e","text":"Nenhuma; biópsia de tireoide só pode ser feita por cirurgia aberta."}]', 'a', 
        'Enquanto a PAAF aspira células soltas (citologia), a Biópsia Core retira um pequeno fragmento de tecido (histologia parcial). Isso permite visualizar a disposição arquitetural das células, ajudando no diagnóstico diferencial de linfomas e lesões foliculares complexas onde o arcabouço tecidual é necessário para o patologista.', '{"a":"Correta. Indicação técnica do uso de agulha grossa na tireoide.","b":"Incorreta. Desnecessariamente agressiva para cistos.","c":"Incorreta. Totalmente contraindicado isolada sem base oncológica suspeita severa.","d":"Incorreta. Ferramentas complementares, o USG guia a biópsia.","e":"Incorreta. Procedimentos percutâneos são rotina e seguros sob guia USG."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8fx43p', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Biópsia Core","Histologia","Nódulo de Tireoide","Diagnóstico"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8fx43p', 'approved', 163)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q165 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-j2xafu', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No hipotireoidismo primário severo (Mixedema), a ocorrência de derrame pericárdico e pleural deve-se prioritariamente à:', '[{"id":"a","text":"Aumento da permeabilidade capilar gênica e redução da depuração linfática das proteínas e ácido hialurônico de alto peso molecular que se acumulam nos espaços serosos."},{"id":"b","text":"Perfuração dos pulmões por bócio mergulhante."},{"id":"c","text":"Infecção bacteriana generalizada associada obrigatoriamente."},{"id":"d","text":"Destruição do fígado por falta de sal."},{"id":"e","text":"Absorção de resíduos de plástico pela glândula doente."}]', 'a', 
        'O mecanismo do derrame no mixedema não é apenas hidrostático (como na IC). É um derrame exsudativo ou misto decorrente de fragilidade capilar e acúmulo de substâncias mucoides que retêm água nas cavidades. Curiosamente, a melhora é dramática apenas com a reposição da levotiroxina.', '{"a":"Correta. Fisiopatologia complexa das serosites no hipotireoidismo.","b":"Incorreta. Inexistente.","c":"Incorreta. Não relacionado conceitualmente à fisiologia endócrina pura do mixedema.","d":"Incorreta. Absurdo técnico.","e":"Incorreta. Absurdo clínico sem fundamento científico moderno."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'j2xafu', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Derrame Pericárdico","Mixedema","Fisiopatologia","Hipotireoidismo"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-j2xafu', 'approved', 164)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q166 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-lr3umt', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal causa de Bócio Multinodular Tóxico (Doença de Plummer) decorre de qual processo biológico celular nos nódulos tireoidianos?', '[{"id":"a","text":"Mutações ativadoras somáticas adquiridas no receptor de TSH (TSHR) ou na proteína Gs-alfa, gerando clones de células que produzem hormônio de forma independente do controle hipofisário."},{"id":"b","text":"Inchaço das células por excesso de bebedeira de água mineral."},{"id":"c","text":"Ataque massivo de anticorpos destruidores."},{"id":"d","text":"Falta absoluta hereditária de vitamina K."},{"id":"e","text":"Somente crescimento secundário à gravidez."}]', 'a', 
        'Diferente do Graves (autoimune), o bócio Plummer é neoplasia folicular benigna (nódulos) com autonomia funcional decorrente de defeitos no receptor que permanece ''ligado'' sem precisar do TSH. Clinicamente, o hipertireoidismo costuma ser mais leve e insidioso, comum em idosos.', '{"a":"Correta. Mecanismo genético molecular da autonomia tireoidiana.","b":"Incorreta. Totalmente fantasioso.","c":"Incorreta. Descreve tireoidites.","d":"Incorreta. Sem relação hormonal tireoidiana.","e":"Incorreta. Aumenta a demanda de iodo mas não causa autonomia nodular genética persistente definitiva per se."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'lr3umt', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Doença de Plummer","Receptor de TSH","Autonomia","Bócio Multinodular"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-lr3umt', 'approved', 165)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q167 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-6obi93', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Antitireoperoxidase'' (Anti-TPO) é o anticorpo mais sensível para o diagnóstico da Tireoidite de Hashimoto. No entanto, qual a sua principal utilidade clínica no contexto de uma gestante sem hipotireoidismo diagnosticado (TFTs normais)?', '[{"id":"a","text":"É marcador de risco para o desenvolvimento futuro de hipotireoidismo clínico durante a gestação e de tireoidite pós-parto, além de predizer menor sucesso em ciclos de fertilização in vitro (FIV)."},{"id":"b","text":"Nenhuma utilidade clínica."},{"id":"c","text":"Serve para medir o nível de iodo no feto."},{"id":"d","text":"Informa se a criança terá olhos claros."},{"id":"e","text":"Previsão de ganho de peso excessivo por compulsão alimentar."}]', 'a', 
        'Mulheres eutireoidianas mas Anti-TPO positivas possuem uma ''reserva tireoidiana'' menor. Durante a gestação (onde a demanda hormonal aumenta), elas têm maior chance de o TSH começar a subir inadequadamente, exigindo monitoramento mensal. Também existe correlação estatística comprovada entre anti-TPO positivo e maiores taxas de aborto espontâneo precoce.', '{"a":"Correta. Importância do rastreio de anticorpos no planejamento reprodutivo moderno.","b":"Incorreta. Informação valiosa para o obstetra e endócrino.","c":"Incorreta. O iodo fetal é avaliado por USG (bócio) ou biópsia em casos extremos, não pelo anti-TPO materno.","d":"Incorreta. Absurdo genético.","e":"Incorreta. Sem nexo científico direto específico desta forma biológica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '6obi93', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Anti-TPO","Gestação","Abortamento","Tireoidite Pós-Parto"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-6obi93', 'approved', 166)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q168 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-mnvzxn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Como o hormônio tireoidiano afeta a resistência vascular periférica e a pressão arterial sistólica?', '[{"id":"a","text":"Causa vasodilatação periférica generalizada (redução da resistência vascular) e aumento do débito cardíaco, levando à elevação da pressão sistólica (pressão de pulso alargada)."},{"id":"b","text":"Causa vasoconstrição renal seletiva absoluta."},{"id":"c","text":"Reduz o volume sanguíneo total em 50% em 24h."},{"id":"d","text":"Bloqueia a produção de adrenalina nas adrenais."},{"id":"e","text":"Nenhuma das anteriores; o hormônio tireoidiano não afeta o coração ou vasos."}]', 'a', 
        'Hormônios tireoidianos diminuem a resistência vascular sistêmica nos tecidos periféricos (via óxido nítrico e relaxamento do músculo liso vascular). Para compensar e manter a pressão, o corpo aumenta o débito cardíaco (frequência e força de contração). O resultado é uma pressão sistólica alta e uma diastólica normal/baixa no hipertireoidismo (alargamento da pressão de pulso).', '{"a":"Correta. Mecanismo hemodinâmico clássico da tireotoxicose.","b":"Incorreta. Pelo contrário; ocorre vasodilatação para compensar metabólitos.","c":"Incorreta. Absurdo clínico fisiológico.","d":"Incorreta. Pelo contrário; eleva a sensibilidade aos receptores adrenérgicos (upregulation).","e":"Incorreta. É um dos principais controladores do sistema circulatório basal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'mnvzxn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Pressão Sistólica","Hormônio Tireoidiano","Fisiologia Cardiovascular","Débito Cardíaco"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-mnvzxn', 'approved', 167)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q169 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-5c63lw', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O principal substrato para a síntese dos hormônios tireoidianos, que representa cerca de 1/3 do peso total da molécula de T4, é:', '[{"id":"a","text":"Iodo orgânico captado da dieta."},{"id":"b","text":"Proteína de soja processada."},{"id":"c","text":"Ativador de plasminogênio tecidual."},{"id":"d","text":"Cálcio sérico complexado."},{"id":"e","text":"Ácido clorídrico gástrico."}]', 'a', 
        'O iodo é essencial para a formação da mono-iodotirosina (MIT) e di-iodotirosina (DIT), cujos acoplamentos originam T3 (MIT+DIT) e T4 (DIT+DIT). A glândula tireóide é o único órgão do corpo humano capaz de metabolizar o iodo de forma complexa e regular.', '{"a":"Correta. Nutriente e viga-mestra bioquímica da tireoide.","b":"Incorreta. Interfere na absorção, não é substrato de síntese.","c":"Incorreta. Relacionado a fibrinólise.","d":"Incorreta. Sem relação estrutural hormonal.","e":"Incorreta. Estômago."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '5c63lw', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Iodo","Bioquímica","Hormônios","Fisiologia"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-5c63lw', 'approved', 168)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q170 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-7bdnxc', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Biópsia por Congelação'' (Intra-operative frozen section) durante a cirurgia de tireoide em nódulos Bethesda IV (Suspeito para Neoplasia Folicular) é desencorajada por qual motivo principal?', '[{"id":"a","text":"Possui baixíssima acurácia, pois o patologista não consegue avaliar toda a periferia da cápsula e vasos sob o microscópio de urgência, resultando em altas taxas de falso-negativos."},{"id":"b","text":"O cirurgião não pode parar a cirurgia por 20 minutos."},{"id":"c","text":"Causa infecção cervical generalizada no intraoperatório."},{"id":"d","text":"Ninguém no Brasil realiza este procedimento."},{"id":"e","text":"O iodo queima as lâminas de microscopia de urgência."}]', 'a', 
        'Diferente do papilífero (que tem atipias nucleares fáceis), o folicular exige análise extensa de cortes seriados da cápsula para provar invasão. 20 minutos de análise intraoperatória de alguns cortes é insuficiente, raramente alterando a conduta cirúrgica e podendo submeter o paciente ao risco de cirurgia total desnecessária ou inconclusiva.', '{"a":"Correta. Regra cirúrgica de cabeça e pescoço baseada em diretrizes atuais de eficácia diagnóstica.","b":"Incorreta. O tempo cirúrgico não é a barreira primordial, mas sim a técnica patológica da biópsia per se neste câncer específico.","c":"Incorreta. O material é retirado do corpo; sem relação com infecção.","d":"Incorreta. É realizado, mas as diretrizes cada vez mais restringem sua utilidade na linhagem folicular suspeita.","e":"Incorreta. Fantasioso."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '7bdnxc', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Biópsia de Congelação","Cirurgia","Neoplasia Folicular","Patologia"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-7bdnxc', 'approved', 169)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q171 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-kguoq', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a dose aproximada de Levotiroxina (L-T4) para reposição plena em um adulto jovem saudável (sem tireoide residual após cirurgia radical), calculada com base no peso corporal?', '[{"id":"a","text":"Cerca de 1,6 a 1,8 microgramas por quilograma de peso corporal ao dia (mcg/kg/dia)."},{"id":"b","text":"Exatamente 25 mcg para todo ser humano independente do peso."},{"id":"c","text":"500 mcg ao dia independente do sexo."},{"id":"d","text":"1 mg por grama de gordura corporal profunda."},{"id":"e","text":"A dose deve ser calculada baseando-se no nível de iodo no sal marinho da cidade onde o paciente mora."}]', 'a', 
        'Este cálculo serve como estimativa inicial de reposição total em pacientes submetidos a tireoidectomia total ou Hashimoto severo descompensado. Pacientes idosos com cardiopatia devem iniciar com doses muito menores (ex: 12,5 a 25 mcg/dia) para evitar estresse cardíaco adrenérgico excessivo repentino.', '{"a":"Correta. Cálculo padrão internacional de farmacologia clínica endócrina.","b":"Incorreta. Dose insuficiente para a maioria absoluta dos adultos.","c":"Incorreta. Dose tóxica (induziria tempestade tireotóxica iatrogênica).","d":"Incorreta. Unidades de medida absurdas e sem nexo farmacognóstico.","e":"Incorreta. O controle é individual, feito pelo TSH, não geográfico desta forma indireta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'kguoq', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Levotiroxina","Dose","Peso Corporal","Manejo Clínico"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-kguoq', 'approved', 170)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q172 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4fje9j', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A manifestação cardíaca clássica e potencialmente reversível do Hipotireoidismo primário severo (não tratada), caracterizada por bradicardia sinusal, voltagem baixa no ECG e cardiomegalia global à radiografia (presença de derrame pericárdico), é conhecida como:', '[{"id":"a","text":"Coração Mixedematoso (Myxedema Heart)."},{"id":"b","text":"Prolapso de Valva Mitral agudo traumático."},{"id":"c","text":"Estenose Aórtica calcificada por iodo."},{"id":"d","text":"Síndrome de Wolff-Parkinson-White."},{"id":"e","text":"Cardiomiopatia Hipertrófica de base muscular seletiva."}]', 'a', 
        'O coração no hipotireoidismo tem baixa contratilidade (inotropismo negativo) e bradicardia. O derrame pericárdico (rico em proteínas) aumenta a silhueta cardíaca mas mascara a força real do pulso elétrico no ECG. A reposição de L-T4 costuma reverter todos os sinais em poucas semanas.', '{"a":"Correta. Evolução cardiotireoidiana específica e dramática.","b":"Incorreta. Patologia valvular mista sem relação hormonal direta desta forma sistemática.","c":"Incorreta. Sem relação.","d":"Incorreta. Via acessória elétrica congênita.","e":"Incorreta. Conduta congênita específica estrutural."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4fje9j', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Myxedema Heart","Bradicardia","Derrame Pericárdico","ECG"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4fje9j', 'approved', 171)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q173 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-nsc6s9', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em pacientes com Hipertiroidismo severo que necessitam de cirurgia de urgência não-tireoidiana (ex: apendicectomia), qual a medida imediata para estabilizar a função cardiovascular até a sala cirúrgica?', '[{"id":"a","text":"Betabloqueio pleno (ex: Propranolol EV ou dose oral máxima tolerada), associado a Dexametasona e antitireoidianos, visando bloquear a ação adrenérgica sistêmica e a conversão periférica de T4."},{"id":"b","text":"Realizar o processo sem medicações, pois a anestesia cura o hipertiroidismo."},{"id":"c","text":"Apenas hidratar com 10 litros de soro fisiológico rápido."},{"id":"d","text":"Induzir coma barbitúrico por 7 dias."},{"id":"e","text":"Suspender todas as medicações em uso."}]', 'a', 
        'O maior perigo do hipertiroidismo em cirurgias é o desencadeamento de uma Tempestade Tireotóxica pelo estresse cirúrgico/anestésico. O bloqueio dos receptores beta é a medida que salva vidas mais rapidamente ao reduzir a frequência cardíaca extrema e o risco de insuficiência cardíaca de alto débito no intraoperatório.', '{"a":"Correta. Manejo de urgência pré-anestésico oncológico cardiovascular em endocrinologia.","b":"Incorreta. Altíssimo risco de parada cardiorrespiratória ou crise tireotóxica intra-operatória.","c":"Incorreta. Pode agravar a sobrecarga cardíaca já exigida pelo estado hipermetabólico.","d":"Incorreta. Medida desnecessária e de alto risco para o manejo da tireoide em si.","e":"Incorreta. Pioraria o descontrole autonômico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nsc6s9', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Pré-Operatório","Betabloqueadores","Hipertireoidismo","Emergência"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-nsc6s9', 'approved', 172)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q174 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-sczhm4', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma Folicular de Tireoide tende a se disseminar preferencialmente por qual via e para quais órgãos principais?', '[{"id":"a","text":"Via hematogênica para ossos e pulmões."},{"id":"b","text":"Via linfática para o cérebro."},{"id":"c","text":"Por contiguidade para a pele das costas."},{"id":"d","text":"Somente via digestiva profunda."},{"id":"e","text":"Através do sistema urinário por refluxo uretérico."}]', 'a', 
        'Invasão de capsula e vasos é a marca do Carcinoma Folicular. Devido à sua afinidade por vasos sanguíneos, as metástases iniciais costumam acometer pulmão e ossos (onde as lesões são tipicamente osteolíticas e captantes de iodo, o que facilita o tratamento radiometabólico futuro).', '{"a":"Correta. Padrão de metástases viga-mestra do câncer folicular diferenciado.","b":"Incorreta. Invasão linfática é típica do papilífero, não do folicular puro na fase inicial clássica.","c":"Incorreta. Irreal e antianatômico.","d":"Incorreta. Absurdo técnico.","e":"Incorreta. Absurdo clínico sem bse em anatomopatologia."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'sczhm4', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Folicular","Metástases","Hematogênica","Oncologia"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-sczhm4', 'approved', 173)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q175 (Part 7)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-hsatvl', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O hormônio T3 reverso (rT3) é inativo metabolicamente. Qual a sua única utilidade diagnóstica discutida no contexto de unidades de terapia intensiva (UTI)?', '[{"id":"a","text":"Diferenciar hipotireoidismo de origem central (TSH baixo, rT3 baixo) de Síndrome do Eutireoideo Doente (TSH baixo/normal, rT3 elevado devido ao bloqueio da D1 periférica)."},{"id":"b","text":"Prever se o paciente terá câncer de pele no futuro."},{"id":"c","text":"Substituir a dosagem de glicose capilar."},{"id":"d","text":"Diagnosticar pneumonia bacteriana atípica precocemente."},{"id":"e","text":"Nenhuma; o rT3 nunca deve ser dosado no ser humano vivo por ser um resíduo celular puro."}]', 'a', 
        'Na Síndrome do Eutireoideo Doente (SES), a conversão de T4 para T3 (ativo) está bloqueada, enquanto a conversão para rT3 (inativo) e a sua degradação estão alteradas. Isso resulta em níveis altos de rT3 no sangue. Já no hipotireoidismo central (falta de estímulo hipotálamo-hipofisário real), não há produção sequer de substrato T4 suficiente, portanto o rT3 estará proporcionalmente baixo.', '{"a":"Correta. Utilidade clínica refinada na interpretação laboratorial de UTI.","b":"Incorreta. Sem relação.","c":"Incorreta. Absurdo técnico bioquímico.","d":"Incorreta. Inespecífico.","e":"Incorreta. Pode ser dosado e interpretado se houver dúvida diagnóstica crítica de eixo central."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'hsatvl', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["T3 Reverso","rT3","Eutireoideo Doente","UTI"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-hsatvl', 'approved', 174)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q176 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-lmb2xv', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Atualmente, muitos suplementos vitamínicos para cabelo e unhas contêm doses elevadas de uma vitamina que pode causar um padrão laboratorial de ''Falso-Hipertireoidismo'' (TSH baixo e T4/T3 livres altos) nos ensaios baseados em estreptavidina-biotina. Qual é essa vitamina?', '[{"id":"a","text":"Biotina (Vitamina B7 ou Vitamina H)."},{"id":"b","text":"Vitamina B12 (Cobalamina)."},{"id":"c","text":"Ácido Fólico (Vitamina B9)."},{"id":"d","text":"Vitamina D3 (Colecalciferol)."},{"id":"e","text":"Vitamina K2 (Menaquinona)."}]', 'a', 
        'Doses suprafisiológicas de biotina (ex: 5 a 30 mg/dia) interferem nos imunoensaios que utilizam a forte ligação biotina-estreptavidina para separar os anticorpos de detecção. Em ensaios competitivos (T4 e T3 livres), a biotina causa resultados falsamente elevados; em ensaios tipo sanduíche (TSH, PTH, HCG, Ferritina), ela causa resultados falsamente baixos. Recomenda-se suspender a biotina por 48 a 72 horas antes da coleta de sangue.', '{"a":"Correta. Principal causa de erro laboratorial contemporâneo em exames tireoidianos.","b":"Incorreta. Não interfere nos sítios de ligação estreptavidina dos imunoensaios comuns.","c":"Incorreta. Sem nexo laboratorial deste tipo.","d":"Incorreta. Vitamina D não causa esse tipo de interferência técnica.","e":"Incorreta. Sem relação."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'lmb2xv', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Biotina","Interferência Laboratorial","TSH","Erros Diagnósticos"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-lmb2xv', 'approved', 175)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q177 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-lmtcck', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O ''Struma Ovarii'' é um tipo raro de teratoma ovariano especializado que possui tecido tireoidiano funcional. Qual achado é característico de uma paciente com tireotoxicose por Struma Ovarii na investigação por imagem?', '[{"id":"a","text":"Hipertireoidismo (TSH suprimido) com captação nula na cintilografia cervical, mas captação intensa de Iodo-131 em região pélvica."},{"id":"b","text":"Bócio difuso cervical massivo captante."},{"id":"c","text":"Somente nódulos mamários bilaterais."},{"id":"d","text":"Aumento do PTH sérico com ureia alta."},{"id":"e","text":"Destruição óssea craniana isolada."}]', 'a', 
        'Por ser uma fonte ectópica de hormônio, o Struma Ovarii suprime o TSH hipofisário, o que por sua vez ''desliga'' a captação da tireoide cervical normal. A cintilografia de corpo inteiro com I-131 revela a localização pélvica do tecido tireoidiano produtor, sendo o diagnóstico definitivo cirúrgico com anátomo-patológico da massa ovariana.', '{"a":"Correta. Fisiopatologia e diagnóstico por imagem funcional característicos.","b":"Incorreta. O bócio cervical estaria suprimido (frio ou hipocaptante).","c":"Incorreta. Sem relação anatômica biológica direta.","d":"Incorreta. Sem nexo bioquímico sistêmico com este tumor.","e":"Incorreta. Absurdo clínico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'lmtcck', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Struma Ovarii","Teratoma","Ectopia Tireoidiana","Iodo-131"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-lmtcck', 'approved', 176)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q178 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-3iib9h', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Variante de Células Altas'' (Tall Cell Variant) do Carcinoma Papilífero de Tireoide é caracterizada por apresentar células cuja altura é de qual proporção em relação à sua largura?', '[{"id":"a","text":"Altura de pelo menos 2 a 3 vezes a largura."},{"id":"b","text":"A mesma altura que largura (isocúbica)."},{"id":"c","text":"Somente largura longitudinal mínima."},{"id":"d","text":"Pelo menos 10 vezes maior largura que altura."},{"id":"e","text":"Nenhuma das anteriores; a classificação depende apenas do brilho citoplasmático."}]', 'a', 
        'Histologicamente, a variante ''Tall Cell'' exige que pelo menos 30% a 50% das células apresentem altura > 2-3 vezes a largura. Esta variante é clinicamente mais agressiva que o papilífero clássico, com maior taxa de invasão extra-tireoidiana, metástases linfonodais e recidiva.', '{"a":"Correta. Critério histopatológico definidor da variante agressiva.","b":"Incorreta. Característica das células normais da tireoide.","c":"Incorreta. Inespecífico.","d":"Incorreta. Descreve variantes escamosas raras e sem nexo com o nome da variante ''altas''.","e":"Incorreta. O brilho (pálido ou granular) não é o critério definidor primário desta nomenclatura."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '3iib9h', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Variante Células Altas","Papilífero","Oncologia","Histologia"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-3iib9h', 'approved', 177)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q179 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-n3gcqc', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O diagnóstico de ''Adenoma Hipofisário Produtor de TSH'' (Tireotropinoma) deve ser suspeitado em qual combinação laboratorial de TSH e Hormônios Livres?', '[{"id":"a","text":"TSH inapropriadamente normal ou elevado, em face de níveis de T4 e T3 livres elevados (ausência de feedback negativo hipofisário)."},{"id":"b","text":"TSH elevado e T4 livre indetectável."},{"id":"c","text":"TSH baixo e T4 livre baixo."},{"id":"d","text":"TSH suprimido (< 0,001) e T3 livre elevado."},{"id":"e","text":"Níveis astronômicos de Calcitonina cercados de cortisol baixo."}]', 'a', 
        'O diagnóstico diferencial viga-mestra deste quadro é a Síndrome de Resistência ao Hormônio Tireoidiano. No adenoma, as células são autônomas e não respondem ao freio hormonal periférico, estimulando a tireoide continuamente através da secreção excessiva de TSH. Clinicamente, o paciente tem sinais de tireotoxicose e, eventualmente, sintomas compressivos selar (visão).', '{"a":"Correta. Perfil bioquímico clássico e paradoxal na endocrinologia.","b":"Incorreta. Hipotireoidismo primário típico.","c":"Incorreta. Hipotireoidismo central (secundário).","d":"Incorreta. Hipertireoidismo primário (ex: Graves).","e":"Incorreta. Absurdo técnico sem correlação fisiopatológica com esta massa selar."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'n3gcqc', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireotropinoma","Adenoma Hipofisário","Feedback","TSH"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-n3gcqc', 'approved', 178)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q180 (Part 8)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-idqmpz', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal complicação neurológica e intelectual irreversível decorrente do hipotireoidismo congênito não tratado nos primeiros meses de vida?', '[{"id":"a","text":"Cretinismo (atraso mental severo e déficit de crescimento)."},{"id":"b","text":"Epilepsia infantil focal isolada."},{"id":"c","text":"Esclerose Lateral Amiotrófica (ELA)."},{"id":"d","text":"Excesso de inteligência por aumento de plasticidade cerebral."},{"id":"e","text":"Apenas queda de cabelos temporária."}]', 'a', 
        'O hormônio tireoidiano é indispensável para o desenvolvimento embrionário e pós-natal do sistema nervoso central, atuando na migração neuronal, mielinização e sinaptogênese. A deficiência na fase crítica do neurodesenvolvimento resulta em danos cognitivos e motores permanentes (cretinismo), que o diagnóstico precoce (teste do pezinho) visa prevenir completamente.', '{"a":"Correta. Consequência clássica do hipotireoidismo neonatal severo.","b":"Incorreta. Pode ocorrer secundariamente a distúrbios metabólicos, mas não é a marca da doença.","c":"Incorreta. Doença degenerativa motora de adultos.","d":"Incorreta. Fantasia perigosa baseada em nexo nenhum.","e":"Incorreta. A carência hormonal causa mudanças multissistêmicas graves, não apenas estéticas funcionais mínimas."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'idqmpz', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Congênito","Cretinismo","Neurodesenvolvimento","TSH"],"batch":8}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-idqmpz', 'approved', 179)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q181 (Part 8)
    
END c:UserskayquDesktopQrub1QRub;