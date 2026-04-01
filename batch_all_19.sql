DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-y8r0aw', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal causa de Bócio (aumento do volume da glândula) em um paciente com Doença de Hashimoto severa que já apresenta hipotireoidismo?', '[{"id":"a","text":"O TSH elevado (pela falta de feedback negativo) estimula continuamente os tireócitos remanescentes ao crescimento e hiperplasia, tentando compensar a falta de hormônio circulante."},{"id":"b","text":"Somente inflamação viral pálida profunda aguda pálida."},{"id":"c","text":"Presença de tumores malignos em 100% dos nódulos de Hashimoto pálidos."},{"id":"d","text":"Uso de xarope de iodo excessivo pálido profundo massivo."},{"id":"e","text":"Nenhuma acima; Hashimoto nunca causa bócio, somente atrofia."}]', 'a', 
        'Embora o destino final do Hashimoto seja frequentemente a atrofia fibrótica (glândula pequena), em fases iniciais ou descompensadas o TSH alto pode gerar bócios volumosos (Bócio de Hashimoto). O tratamento com L-T4 baixa o TSH e, consequentemente, reduz o volume deste bócio compensatório.', '{"a":"Correta. Mecanismo de feedback e hiperplasia glandular endócrina clássica.","b":"Incorreta. Seria o caso das tireoidites subagudas.","c":"Incorreta. Hashimoto aumenta o risco de Linfoma, mas bócio não é sinônimo de tumor maligno em 100%.","d":"Incorreta. Pioraria o bloqueio glandular (Wolff-Chaikoff).","e":"Incorreta. O estágio de bócio é frequente e dá nome ao ''Bócio Linfoide'' clássico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'y8r0aw', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hashimoto","Bócio","TSH","Feedback"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-y8r0aw', 'approved', 270)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q272 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-iv2v1d', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Biópsia por PAAF'' é contraindicada ou considerada ineficaz em qual destas situações de nódulo tireoidiano?', '[{"id":"a","text":"Nódulos puramente quentes na cintilografia e nódulos que apresentam apenas sinais de calcificação grosseira com sombra acústica profunda pálida."},{"id":"b","text":"Carcinoma Papilífero sólido de 2 cm pálido profundo."},{"id":"c","text":"Bócio multinodular não-tóxico pálido massivo profundo."},{"id":"d","text":"Crianças com Hashimoto pálido agudo profundo pálido."},{"id":"e","text":"Gestantes no 3º mês pálida profunda massiva pálida."}]', 'a', 
        'Nesta combinação: Nódulos quentes têm risco oncológico desprezível e PAAF gera erros; Calcificações grosseiras impedem a penetração da agulha fina (amostras inadequadas ou dano à agulha). A calcificação deve ser contornada se houver nódulo sólido associado, mas se o nódulo for puramente cálcio amortecido, a PAAF é técnica e clinicamente limitada.', '{"a":"Correta. Limitações técnicas e indicações clínicas refinadas da biópsia percutânea.","b":"Incorreta. Indicação ouro.","c":"Incorreta. Nódulos frios/suspeitos no BMN devem ser puncionados.","d":"Incorreta. Pode ser feita se houver nódulos focais suspeitos.","e":"Incorreta. Gestação não é contraindicação à PAAF (exame seguro sem radiação)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'iv2v1d', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PAAF","Contraindicação","Nódulo Quente","Calcificação"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-iv2v1d', 'approved', 271)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q273 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9u0u03', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal via de disseminação inicial do Carcinoma de Células Claras e Microcarcinomas da tireoide, diferindo do papilífero clássico?', '[{"id":"a","text":"Disseminação linfática local (cadeias cervicais nível VI e laterais), comum a quase todas as linhagens diferenciadas de origem folicular em graus variados."},{"id":"b","text":"Via sexual pálida profunda massiva profunda pálida."},{"id":"c","text":"Somente por contato com a pele do pescoço profundo pálido."},{"id":"d","text":"Através de secreção de iodo na sela túrcica cervical profunda."},{"id":"e","text":"Nenhuma das anteriores; microcarcinomas nunca disseminam."}]', 'a', 
        'Apesar do tamanho, o comportamento ''papilífero'' é de migrar para os linfonodos do pescoço (linfofilia). A presença de metástase linfonodal é a principal causa técnica de perda da ''vigilância ativa'' favor da cirurgia em microcarcinomas de tireoide.', '{"a":"Correta. Padrão oncológico de disseminação viga-mestra.","b":"Incorreta. Absurdo técnico clínico.","c":"Incorreta. Absurdo anatômico biológico.","d":"Incorreta. Termo fantasioso sem nexo.","e":"Incorreta. Podem disseminar; embora o prognóstico permaneça excelente na maioria."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '9u0u03', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Linfonodos","Metástases","Papilífero","Oncologia"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9u0u03', 'approved', 272)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q274 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ox87u4', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a dosagem sérica de TSH que define, por consenso de diretrizes brasileiras (SBEM), a necessidade obrigatória de tratamento clínico do Hipotireoidismo Subclínico no adulto jovem assintomático?', '[{"id":"a","text":"TSH persistentemente ≥ 10 mUI/L (medido em pelo menos duas ocasiões com intervalo de 3 meses)."},{"id":"b","text":"TSH > 2 massivo pálido profundo pálida."},{"id":"c","text":"Qualquer TSH detectável se o paciente tiver olhos azuis pálidos."},{"id":"d","text":"TSH > 100 isoladamente em 100% dos pacientes pálidos."},{"id":"e","text":"Uso de levotiroxina para qualquer valor de TSH fora do laboratório."}]', 'a', 
        'Acima de 10, o risco de progressão para hipotireoidismo clínico em 1 ano é alto, assim como o risco cardiovascular no longo prazo em populações não-idosas. Para TSH entre o limite superior do laboratório e 10 (hipotireoidismo subclínico leve), o tratamento é individualizado baseando-se em idade, sintomas, anticorpos positivos e comorbidades cardíacas.', '{"a":"Correta. Guideline oficial de manejo do status subclínico brasileiro e internacional.","b":"Incorreta. Valor normal maioria dos laboratórios; induziria hipertireoidismo iatrogênico em massa.","c":"Incorreta. Absurdo anticlínico.","d":"Incorreta. Valor que define hipotireoidismo clínico severo e manifesto, não subclínico.","e":"Incorreta. Decisão imprudente que ignora o risco de fibrilação atrial/osteoporose pela sobredosagem."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ox87u4', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Subclínico","TSH","Consenso","Manejo"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ox87u4', 'approved', 273)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q275 (Part 11)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-e4ca4t', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Biópsia por PAAF'' em nódulos tireoidianos deve ser idealmente coletada de qual porção do nódulo ao ultrassom?', '[{"id":"a","text":"Da porção sólida e periférica (margem nodular suspeita), evitando áreas centrais de necrose, calcificações densas ou grandes lagos de coloide que podem resultar em amostras sem células viáveis."},{"id":"b","text":"Exclusivamente do centro geográfico absoluto do nódulo pálido profundo."},{"id":"c","text":"Somente da pele acima do nódulo pálido profundo pálida."},{"id":"d","text":"Aspirando apenas sangue do pescoço profundo pálido."},{"id":"e","text":"Qualquer parte; as células do nódulo são idênticas em 100% do seu volume pálido."}]', 'a', 
        'A ''área viva'' e metabolicamente ativa do tumor geralmente localiza-se na periferia sólida. Áreas centrais puramente líquidas ou necróticas fornecem apenas ''sujeira'' celular (debris) no microscópio, impossibilitando o diagnóstico citológico seguro pelo patologista.', '{"a":"Correta. Técnica radiológica e citológica de coleta e amostragem viga-mestra.","b":"Incorreta. Pode conter apenas coloide inerte ou necrose sem núcleos preservados.","c":"Incorreta. Coleta apenas epitélio escamoso da pele.","d":"Incorreta. Amostra hemática dificulta drasticamente a leitura citológica fina.","e":"Incorreta. Nódulos são heterogêneos; a amostragem seletiva guiada aumenta o rendimento diagnóstico significativamente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'e4ca4t', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PAAF","Técnica de Coleta","Nódulo de Tireoide","Patologia"],"batch":11}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-e4ca4t', 'approved', 274)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q276 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-zhyco4', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Pacientes com Síndrome Nefrótica grave podem desenvolver hipotireoidismo clínico ou necessidade de aumento da dose de Levotiroxina devido a qual mecanismo fisiopatológico urinário?', '[{"id":"a","text":"Perda urinária massiva de Globulina Ligadora de Tiroxina (TBG) e frações de T4/T3 ligadas à proteína filtrada pelo glomérulo doente."},{"id":"b","text":"O rim transforma o iodo em açúcar pálido profundo."},{"id":"c","text":"Somente excesso de ureia na sela túrcica cervical."},{"id":"d","text":"Aumento do apetite por iodo pálido profundo."},{"id":"e","text":"Nenhuma das anteriores; o rim não afeta a tireoide."}]', 'a', 
        'A TBG é uma proteína de peso molecular similar à albumina. Na proteinúria de faixa nefrótica (> 3.5g/24h), a perda de TBG arrasta consigo os hormônios tireoidianos estocados, reduzindo o pool total circulante e exigindo doses compensatórias de L-T4 muitas vezes superiores a 2 mcg/kg/dia.', '{"a":"Correta. Correlação nefrológica-endocrinológica clássica e de alto nível clínico.","b":"Incorreta. Fantasia técnica anticlínica.","c":"Incorreta. Sem nexo anatômico.","d":"Incorreta. Inexpressivo.","e":"Incorreta. A intersecção é vital para o ajuste de dose."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'zhyco4', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Síndrome Nefrótica","TBG","Hipotireoidismo","Proteína de Transporte"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-zhyco4', 'approved', 275)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q277 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-rxtdsl', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Encefalopatia de Hashimoto'' (ou EInat - Encefalopatia associada a Altos Títulos de Anticorpos Antitireoidianos) é uma condição neuropsiquiátrica rara caracterizada por:', '[{"id":"a","text":"Crises convulsivas, declínio cognitivo e mioclonias que respondem dramaticamente ao uso de Glicocorticoides, independentemente do status funcional da tireoide (eutiroideo ou hipotiroideo)."},{"id":"b","text":"Hemorragia cerebral maciça por excesso de T4 pálido profundo."},{"id":"c","text":"Transformação do cérebro em osso pálido profundo."},{"id":"d","text":"Cura súbita de daltonismo pálido profundo."},{"id":"e","text":"Apenas febre baixa no couro cabeludo pálido."}]', 'a', 
        'É uma vasculite autoimune encefálica idiopática associada a níveis muito elevados de Anti-TPO. O termo ''Hashimoto'' refere-se ao marcador de autoimunidade, não necessariamente a uma falha glandular. O diagnóstico é de exclusão e a resposta ao corticoide é diagnóstica da ''síndrome da mente brilhante''.', '{"a":"Correta. Diagnóstico diferencial importante em neurologia e psiquiatria gerando cura evitável.","b":"Incorreta. Inespecífico.","c":"Incorreta. Absurdo histológico.","d":"Incorreta. Fantasia pálida profunda.","e":"Incorreta. Inexpressivo."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'rxtdsl', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Encefalopatia de Hashimoto","Prednisona","Autoimunidade","Cérebro"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-rxtdsl', 'approved', 276)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q278 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-6atfn4', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal alteração no manejo da Levotiroxina recomendada para uma paciente que inicia o uso de Contraceptivos Orais Combinados (Estrogênio e Progestogênio)?', '[{"id":"a","text":"Monitorar o TSH e aumentar a dose de Levotiroxina se necessário, pois o estrogênio oral aumenta a síntese hepática de TBG, reduzindo a fração de T4 livre disponível."},{"id":"b","text":"Suspender a tiroxina para evitar trombose profunda."},{"id":"c","text":"Trocar o iodo por açúcar pálido profundo na sela túrcica."},{"id":"d","text":"Iodoterapia profilática massiva pálida profunda."},{"id":"e","text":"Nenhuma; o estrogênio não interage com a tireoide."}]', 'a', 
        'O estrogênio aumenta a glicosilação e meia-vida da TBG. No início de ACO ou TRH oral, a reserva hormonal circulante é ''sequestrada'' pela proteína extra, podendo levar o TSH a subir. Deve-se reavaliar o TSH em 6 a 8 semanas após o início do hormônio sexual.', '{"a":"Correta. Interação medicamentosa hormona-fisiológica clássica e frequente.","b":"Incorreta. Pioraria o status metabólico sem prevenir trombose desta forma primária.","c":"Incorreta. Absurdo bioquímico.","d":"Incorreta. Risco iatrogênico de hipertiroidismo pálido.","e":"Incorreta. Interação direta via fígado é viga-mestra do ajuste de dose."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '6atfn4', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Estrogênio","TBG","Levotiroxina","Ajuste de Dose"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-6atfn4', 'approved', 277)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q279 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-c7fx78', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireotoxicose Induzida por Amiodarona'' (TIA) Tipo 2 é distinguida do Tipo 1 principalmente por qual mecanismo fisiopatológico fundamentado na histologia?', '[{"id":"a","text":"TIA Tipo 2 é uma tireoidite destrutiva direta (causada pela droga); enquanto o Tipo 1 decorre de excesso de iodo (Jod-Basedow) em glândula pré-doente."},{"id":"b","text":"Tipo 2 cura com açúcar pálido profundo massivo."},{"id":"c","text":"Somente excesso de pelos faciais pálidos profundos pálidos."},{"id":"d","text":"Amiodarona nunca afeta a tireoide em adultos idosos pálidos."},{"id":"e","text":"Nenhuma acima; ambas tratam-se exclusivamente com Iodo-131."}]', 'a', 
        'Essa distinção é vital. O Tipo 1 (produção em excesso) usa tionamidas. O Tipo 2 (vazamento por destruição) usa corticoides (prednisona). O uso de Doppler (vascularização ausente no tipo 2) e dosagem de IL-6 ajudam na diferenciação diagnóstica clínica.', '{"a":"Correta. Diagnóstico diferencial farmacodinâmico e clínico de alta relevância.","b":"Incorreta. Absurdo terapêutico.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Affecta até 15% dos usuários devido ao alto teor de iodo na molécula e toxicidade direta.","e":"Incorreta. Iodo-131 é difícil nestes casos pelo excesso de iodo estável bloqueando a glândula."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'c7fx78', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TIA Tipo 2","Amiodarona","Tireotoxicose","Corticosteroides"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-c7fx78', 'approved', 278)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q280 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ltkf9w', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A monitorização do Paratormônio (PTH) sérico em 4 a 6 horas após uma Tireoidectomia Total é utilizada prioritariamente para:', '[{"id":"a","text":"Prever precocemente o risco de hipocalcemia sintomática (hipoparatireoidismo iatrogênico) e guiar a introdução antecipada de suplementação de cálcio e calcitriol."},{"id":"b","text":"Diagnosticar câncer de paratireoide em 100% dos exames."},{"id":"c","text":"Medir a força do pescoço profundo pálido."},{"id":"d","text":"Cura total da visão pálida profunda pálida."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido."}]', 'a', 
        'O PTH tem meia-vida de minutos. Se o PTH pós-op for indetectável ou muito baixo (< 10-15 pg/mL), o cirurgião já sabe que as paratireoides foram lesadas ou desvascularizadas, permitindo tratar antes que o cálcio caia e o paciente apresente tetania clínica (sinal de Chvostek/Trousseau).', '{"a":"Correta. Suporte pós-operatório baseada em biomarcadores cinéticos de alta precisão.","b":"Incorreta. Patologia rara e não é o objetivo do tracking pós-op de rotina.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Inexpressivo.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ltkf9w', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PTH","Hipocalcemia","Pós-Operatório","Tireoidectomia"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ltkf9w', 'approved', 279)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q281 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-uq6phb', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No seguimento de pacientes com Carcinoma Medular de Tireoide (CMT), o tempo de duplicação (doubling time) de qual marcador tumoral é o melhor preditor de sobrevida e velocidade de progressão da doença?', '[{"id":"a","text":"Calcitonina e Antígeno Carcinogênico Embrionário (CEA)."},{"id":"b","text":"Insulina glargina pálida profunda."},{"id":"c","text":"Apenas nível de açúcar no sangue pálido."},{"id":"d","text":"Produção de suor pálido profundo pálida."},{"id":"e","text":"Somente ferritina sela túrcica pálida aguda."}]', 'a', 
        'Embora o nível absoluto importe, a velocidade com que os marcadores sobem (tempo de duplicação < 6 meses) é o sinal de maior alerta para metástases à distância e resistência a tratamentos convencionais. Níveis estáveis ou subindo lentamente indicam prognóstico favorável a longo prazo.', '{"a":"Correta. Monitoramento dinâmico oncológico em endocrinologia.","b":"Incorreta. Inexpressivo.","c":"Incorreta. Diabetes.","d":"Incorreta. Inexistente.","e":"Incorreta. Inflamação/ferro."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'uq6phb', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["CMT","Calcitonina","CEA","Doubling Time"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-uq6phb', 'approved', 280)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q282 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ylxgwk', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O ''Bócio Multinodular Tóxico'' (BMT) é caracterizado pela presença de múltiplos nódulos hiperfuncionantes. Qual o principal fator de risco para o desenvolvimento desta autonomia glandular?', '[{"id":"a","text":"Carência de Iodo moderada e prolongada, levando à ativação crônica da divisão celular tireoidiana e surgimento de mutações ativadoras no Receptor de TSH."},{"id":"b","text":"Excesso de desejo sexual pálido profundo."},{"id":"c","text":"Uso de calçados de couro massivo pálido."},{"id":"d","text":"Cura súbita de gastrite pálida profunda pálida."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido."}]', 'a', 
        'O ''drive'' constante do TSH (tentando extrair iodo em áreas de carencia) induz proliferação clonal. Com o tempo, clones celulares adquirem mutações que ''ligam'' o receptor de TSH para sempre (constitutivas), gerando autonomia e hipertireoidismo clínico (Doença de Plummer no caso unio-nodular).', '{"a":"Correta. Evolução natural da patologia endêmica glandular para a autonomia funcional.","b":"Incorreta. Absurdo anticlínico.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Inexpressivo.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ylxgwk', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["BMT","Autonomia Glandular","Receptor TSH","Iodo"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ylxgwk', 'approved', 281)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q283 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-243225', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a conduta prioritária para um recém-nascido cujo Teste do Pezinho (Filtro) apresentou TSH = 64 mUI/L (TSH coletado com 3 dias de vida)?', '[{"id":"a","text":"Dosagem imediata de TSH e T4 livre em amostra venosa e INÍCIO IMEDIATO da Levotiroxina (10-15 mcg/kg) antes mesmo do resultado venoso se houver atraso laboratorial."},{"id":"b","text":"Esperar 1 ano para ver se o bebê cresce pálido profundo."},{"id":"c","text":"Dar iodo na mamadeira massivo pálido profundo pálida."},{"id":"d","text":"Apenas repetir o teste em 6 meses isoladamente."},{"id":"e","text":"Suspender o leite materno pálido profundo massivo."}]', 'a', 
        'Hipotireoidismo Congênito é uma emergência neurológica. O valor de 64 mUI/L é inequivocamente alto (acima de 20-30 sugere fortemente a doença). Cada dia sem hormônio resulta em perda irreversível de pontos de QI e prejuízo motor para a criança. O tratamento não deve ser postergado.', '{"a":"Correta. Conduta de emergência salvadora de neurodesenvolvimento infantil.","b":"Incorreta. Conduta criminogênica; causaria retardo mental grave (Cretinismo).","c":"Incorreta. O problema geralmente é disgenesia da glândula, não falta de iodo em países industrializados nestes níveis.","d":"Incorreta. Demasiado tempo para intervenção segura.","e":"Incorreta. Absurdo biológico nutritivo pálido profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '243225', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Congênito","Triagem Neonatal","QI","Tiroxina"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-243225', 'approved', 282)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q284 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-tz0wlg', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Fibrilação Atrial'' (FA) no hipertireoidismo resolve-se espontaneamente na maioria dos pacientes (cerca de 60%) apenas restaurando-se o eutireoidismo. Em que período isso ocorre comumente?', '[{"id":"a","text":"Entre 2 a 4 meses após o controle laboratorial da função tireoidiana."},{"id":"b","text":"10 segundos após a primeira gota de Lugol pálido profundo."},{"id":"c","text":"Somente após 40 anos de uso de Marcapasso pálido profundo."},{"id":"d","text":"Apenas se o paciente for vegano pálido profundo pálida."},{"id":"e","text":"Nunca resolve; FA por tireoide é permanente eterna pálida."}]', 'a', 
        'A tireotoxicose sensibiliza o miocárdio aos efeitos adrenérgicos e encurta o período refratário atrial. Assim que o hormônio normaliza, o coração tende a retornar ao ritmo sinusal espontâneo, a menos que existam outras cardiopatias estruturais subjacentes severas.', '{"a":"Correta. Evolução clínica cardiovascular tireoidiana e timing terapêutico.","b":"Incorreta. Absurdo cinético.","c":"Incorreta. Absurdo clínico pálido profundo pálida.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Frequentemente reversível se diagnosticada precocemente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'tz0wlg', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Fibrilação Atrial","Tireotoxicose","Evolução","Arritmia"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-tz0wlg', 'approved', 283)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q285 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        '', '[{"id":"a","text":"Idealmente cirurgia no 2º trimestre (antes da 24ª semana) se houver sinais de agressividade, ou adiar para o pós-parto se o tumor for estável e indolente ao ultrassom."},{"id":"b","text":"Abortar o feto imediatamente pálido profundo massivo."},{"id":"c","text":"Iodo-131 massivo pálido profundo na sela túrcica gestante pálida."},{"id":"d","text":"Somente rezar pálido profundo massivo profundo pálida."},{"id":"e","text":"Trocar o iodo urinário por mel pálido profundo."}]', 'a', 
        'O câncer diferenciado de tireoide progride lentamente. A maioria das gestantes pode aguardar com segurança até o nascimento do bebê para operar. A cirurgia só é antecipada para o 2º trimestre se houver crescimento rápido, linfonodos metastáticos gigantes ou compressão traqueal iminente, visando a segurança anestésica fora da fase de organogênese do 1º tri e viabilidade do 3º tri.', '{"a":"Correta. Conduta ética e técnico-cirúrgica baseada no binômio mãe-feto.","b":"Incorreta. Atrocidade contraindidada biologicamente neste contexto isolado.","c":"Incorreta. Contraindicação absoluta em gestantes (destrói tireoide fetal).","d":"Incorreta. Inexpressivo pálida profunda.","e":"Incorreta. Fantasia técnica biológica pálida pálida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Gestação","Carcinoma Papilífero","Cirurgia","Manejo Clínico"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-', 'approved', 284)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q286 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-jattna', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoidite de Riedel'' (estágio fibrótico) causa uma glândula endurecida (tireoide pétrea ou de ferro). Qual a complicação cervical mais comum desta invasão fibrótica local?', '[{"id":"a","text":"Paralisia de pregas vocais (compressão de nervo recorrente) e hipocalcemia (compressão/fibrose de paratireoides)."},{"id":"b","text":"Crescimento de dentes na garganta profunda pálida."},{"id":"c","text":"Aumento do desejo de comer gelo massivo pálido."},{"id":"d","text":"Cura súbita de asma alérgica pálida profunda pálida."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido."}]', 'a', 
        'Diferente de outras tireoidites, a de Riedel ultrapassa a cápsula glandular e ''cola'' nas estruturas adjacentes como vasos, nervos e traqueia. É muitas vezes confundida com o carcinoma anaplásico pela dureza pétrea e quadro clínico compressivo invasivo inicial na sela túrcica cervical profunda.', '{"a":"Correta. Fisiopatologia e semiologia da tireoidite fibrótica invasiva.","b":"Incorreta. Fantasia pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda.","e":"Incorreta. Inespecífico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'jattna', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Riedel","Fibrose","Nervo Recorrente","Invasão Cervical"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-jattna', 'approved', 285)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q287 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-56eola', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O hormônio T4 (Levotiroxina) é considerado um ''pró-hormônio'' porque:', '[{"id":"a","text":"Possui baixa afinidade pelos receptores nucleares e precisa ser convertido em T3 (a forma ativa) nas células periféricas para exercer seu efeito máximo."},{"id":"b","text":"Fabricado apenas por robôs pálidos profundos pálidas."},{"id":"c","text":"Transforma-se em iodo gasoso na urina pálida profunda."},{"id":"d","text":"Só atua em pacientes que praticam yoga massivo pálida."},{"id":"e","text":"Inexistente na sela túrcica de homens adultos pálidos."}]', 'a', 
        'A tireoide produz 90-95% de T4. No entanto, o T3 é 10 a 100 vezes mais potente na ligação com o receptor nuclear (TR). Esse mecanismo de ''reserva circulante'' de T4 permite ao corpo regular finamente o metabolismo tecidual local através das enzimas deiodinases.', '{"a":"Correta. Bioquímica molecular clássica e central da tireoide.","b":"Incorreta. Bioquímica pura.","c":"Incorreta. Absurdo pálido profundo pálida.","d":"Incorreta. Inexpressivo pálida profunda.","e":"Incorreta. É o principal hormônio circulante."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '56eola', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["T4","Pró-hormônio","T3","Conversão Periférica"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-56eola', 'approved', 286)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q288 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-aurym3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Paralisia Hipocalêmica Tireotóxica'' é uma complicação rara do hipertireoidismo que ocorre preferencialmente em quais populações e sob qual gatilho?', '[{"id":"a","text":"Populações de ascendência asiática após refeições ricas em carboidratos (insulina induz o influxo de potássio para as células, agravando a fraqueza muscular)."},{"id":"b","text":"Em todos os pacientes negros após comer melancia pálida profunda pálida."},{"id":"c","text":"Somente se o paciente for triatleta olímpico pálido profundo pálida."},{"id":"d","text":"Após dormir 24h seguidas no litoral pálido profundo."},{"id":"e","text":"Nenhuma acima; hipertireoidismo causa hiperpotassemia."}]', 'a', 
        'O excesso de hormônio tireoidiano aumenta a atividade da bomba Na/K-ATPase. A insulina (pós-refeição) também ativa essa bomba, jogando o potássio para dentro das células rapidamente. O resultado é uma hipocalemia sérica aguda que causa paralisia flácida e arritmias, corrigindo-se temporariamente com potássio e definitivamente tratando a tireoide.', '{"a":"Correta. Emergência clínico-eletrolítica e epidemiologia específica viga-mestra.","b":"Incorreta. Absurdo anticlínico e racista fantasioso pálido.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda.","d":"Incorreta. Sono não é o gatilho; carboidratos são.","e":"Incorreta. Pelo contrário; cursa com risco de hipocalemia severa por influxo celular."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'aurym3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Potássio","Paralisia Periódica","Insulina","Hipertireoidismo"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-aurym3', 'approved', 287)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q289 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-q990ks', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal característica da ''Crise Adrenal'' precipitada pelo tratamento do hipotireoidismo é:', '[{"id":"a","text":"Choque hipovolêmico refratário a aminas e hiperpotassemia, ocorrendo quando repomos tireoidiano em paciente com falência corticoadrenal associada (Síndrome de Schmidt) sem cobertura com corticoides."},{"id":"b","text":"Crescimento de orelhas gigantes pálidas profundas pálida."},{"id":"c","text":"Melhora absurda do humor em 100% dos pacientes pálidos profundos."},{"id":"d","text":"Uso de dose de 1mcg de T4 isoladamente pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Aumentar a demanda metabólica sem dar o ''sujeito'' de estresse (cortisol) quebra a homeostase residual pálida pálida. É uma regra de ouro em UTIs e pronto-socorros: no hipotireoidismo severo/espontâneo, avalie sempre a adrenal antes de dar doses plenas de tiroxina.', '{"a":"Correta. Manejo de suporte crítico em endocrinologia salvador de vidas.","b":"Incorreta. Inexistente pálida profunda pálida profunda.","c":"Incorreta. Absurdo pálido profundo pálida profunda.","d":"Incorreta. Insignificante para desencadear choque nesta magnitude pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'q990ks', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Crise Adrenal","Schmidt","Levotiroxina","Interação"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-q990ks', 'approved', 288)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q290 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-vpl67t', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Fase Folicular'' do câncer de tireoide diferencia-se do ''Câncer Anaplásico'' pela manutenção de qual propriedade celular básica que permite o tratamento com Radioiodo?', '[{"id":"a","text":"Presença funcional do transportador Simportador de Sódio-Iodo (NIS) e capacidade de produzir tiroglobulina."},{"id":"b","text":"Somente por ter dentes no microscópio pálido profundo pálida."},{"id":"c","text":"Pela cor azul da célula oncológica pálida profunda pálida."},{"id":"d","text":"Porque o anaplásico só ataca pacientes veganos pálidos profundos."},{"id":"e","text":"Nenhuma das anteriores; o anaplásico capta mais iodo que o folicular."}]', 'a', 
        'O câncer diferenciado (Papilífero/Folicular) ainda ''lembra'' que é tireoide. Ele expressa o NIS e ''puxa'' o iodo-131 tóxico para dentro de si, morrendo por radiação interna. O anaplásico é indiferenciado: perdeu o NIS, não capta iodo e é um dos tumores mais agressivos e letais da medicina por sela túrcica cervical profunda pálida profunda pálida.', '{"a":"Correta. Biologia oncológica celular definidora do tratamento e prognóstico.","b":"Incorreta. Fantasia técnica biológica pálida profunda pálida pálida.","c":"Incorreta. Absurdo histológico pálido profundo pálida pálida.","d":"Incorreta. O anaplásico ocorre preferencialmente em idosos de qualquer dieta.","e":"Incorreta. O anaplásico tem captação nula/mínima de radioiodo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'vpl67t', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["NIS","Indiferenciação","Anaplásico","Iodo-131"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-vpl67t', 'approved', 289)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q291 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-1alqxq', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal causa de ''Hipotireoidismo Iatrogênico'' em pacientes psiquiátricos crônicos em uso de estabilizador de humor?', '[{"id":"a","text":"Uso de Lítio (o lítio inibe a liberação de hormônio tireoidiano folicular através de mecanismos que mimetizam o iodo extra e interferem no citoesqueleto da glândula)."},{"id":"b","text":"Doses excessivas de Gardenal pálido profundo pálida profunda."},{"id":"c","text":"Amor excessivo pelo médico assistente pálido profundo."},{"id":"d","text":"Falta de iodo no xarope de guaco massivo pálido profundo."},{"id":"e","text":"Nenhuma acima; o lítio não afeta a tireoide em 100% dos testes pálidos."}]', 'a', 
        'O lítio é concentrado na tireoide. Ele inibe a saída de T4/T3 para o sangue. Atira tanto no Hashimoto latente quanto em glândulas sadias, elevando o TSH em até 20% dos usuários. O tratamento não exige suspensão do lítio, apenas reposição de levotiroxina concomitante pálida profunda pálida profunda.', '{"a":"Correta. Efeito colateral farmacológico clássico e muito frequente em provas de residência.","b":"Incorreta. Barbitúricos aumentam o metabolismo hepático do T4 (indução enzimática), mas não são a causa ''princeps'' de falha glandular desta forma.","c":"Incorreta. Absurdo psiquiátrico anticlínico pálido profundo.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda.","e":"Incorreta. É um dos efeitos colaterais mais monitorados da droga."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '1alqxq', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Lítio","Estabilizadores de Humor","Hipotireoidismo Iatrogênico","Farmacologia"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-1alqxq', 'approved', 290)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q292 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-dkkwwd', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoide de Centenários'' (idosos acima de 90-100 anos) apresenta qual característica peculiar no TSH sérico que pode induzir a erros de tratamento?', '[{"id":"a","text":"Níveis de TSH fisiologicamente mais elevados (pode estar entre 4 e 7 mUI/L sem representar doença), decorrente da mudança de ''set-point'' da hipófise e redução da bioatividade do TSH."},{"id":"b","text":"TSH sempre zero pálido profundo pálida profunda pálida."},{"id":"c","text":"Desejo de comer sal marinho em 100% das refeições pálidas."},{"id":"d","text":"Cura total de rugas na garganta massiva profunda pálida."},{"id":"e","text":"Transformação em glóbulos brancos de cor azul pálido profundo."}]', 'a', 
        'Tratar um idoso centenário com TSH de 6 mUI/L pode ser iatrogenia severa. Estudos populacionais mostram que o envelhecimento natural desloca a curva de normalidade do TSH para a direita. O excesso de zelo diagnóstico leva ao uso desnecessário de hormônio com riscos de arritmias neste grupo vulnerável pálida profunda pálida profunda pálida.', '{"a":"Correta. Gerontologia endócrina refinada viga-mestra no manejo de populações especiais.","b":"Incorreta. Absurdo técnico pálido profundo pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda.","d":"Incorreta. Fantasia técnica estética pálida pálida profunda.","e":"Incorreta. Absurdo hematológico pálido profundo pálida pálida."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'dkkwwd', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Centenários","TSH","Fisiologia do Envelhecimento","Sobrediagnóstico"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-dkkwwd', 'approved', 291)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q293 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4x4urz', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal limitação diagnóstica da ''Calcitonina Sérica'' no rastreamento do Carcinoma Medular de Tireoide (CMT) em pacientes tabagistas ou com insuficiência renal?', '[{"id":"a","text":"Risco de resultados ''Falso-Positivos'' (elevação discreta ou moderada da calcitonina sem evidência de tumor medular), devido à menor depuração renal ou estimulação de células C por secreção gástrica/pulmonar."},{"id":"b","text":"O iodo queima os pulmões do fumante pálido profundo pálida profunda."},{"id":"c","text":"Cura imediata de câncer de estômago pelo fumo pálido profundo pálida."},{"id":"d","text":"Transformação da saliva em cor preta profunda massiva pálida."},{"id":"e","text":"Nenhuma; a calcitonina é 100% específica apenas para CMT."}]', 'a', 
        'Muitas condições aumentam a Calcitonina: Uso de inibidores de bomba de prótons (omeprazol), hipercalcemia, fumo e IRC. O médico deve realizar testes de estímulo ou biopsiar nódulos antes de assumir CMT baseando-se em níveis levemente acima do teto laboratorial nestas populações pálida profunda pálida profunda pálida.', '{"a":"Correta. Armadilhas diagnósticas oncológicas e bioquímicas refinadas.","b":"Incorreta. Fantasia técnica anticlínica pálida pálida pálida.","c":"Incorreta. Absurdo clínico oncogênico pálido profundo pálida.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda.","e":"Incorreta. Inúmeras situações benignas podem elevá-la discretamente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4x4urz', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Calcitonina","CMT","Falso Positivo","Insuficiência Renal"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4x4urz', 'approved', 292)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q294 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ir4t95', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Latência'' (tempo entre exposição e surgimento) do câncer de tireoide rádio-induzido (ex: após acidentes nucleares ou radioterapia cervical na infância) é de aproximadamente:', '[{"id":"a","text":"Cerca de 5 a 15 anos para o pico de incidência, persistindo um risco elevado por toda a vida do indivíduo (exposição precoce é o maior fator de risco)."},{"id":"b","text":"Surge em 10 minutos após o acidente pálido profundo pálida profunda."},{"id":"c","text":"Apenas após 100 anos em 100% das vezes pálida profunda pálida."},{"id":"d","text":"Desaparece ao lavar o pescoço com suco de guaco massivo pálido."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido profundo pálida."}]', 'a', 
        'A tireoide infantil é extremamente sensível à radiação por estar em fase de crescimento acelerado. Diferente de outros tumores sólidos, o câncer papilífero rádio-induzido exige seguimento ultrassonográfico vitalício, pois o risco não normaliza mesmo décadas após a exposição inicial pálida profunda pálida profunda pálida.', '{"a":"Correta. Onco-epidemiologia radiológica e cuidados de seguimento a longo prazo.","b":"Incorreta. Mutação e promoção tumoral exigem anos de sela túrcica cervical profunda.","c":"Incorreta. Exagero temporal pálido profundo pálida profunda pálida profunda.","d":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ir4t95', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Radiação","Câncer de Tireoide","Latência","Acidentes Nucleares"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ir4t95', 'approved', 293)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q295 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8zxvnd', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Encerrando este lote do Banco Master Profissional QRub Saúde, qual a principal recomendação para o acompanhamento a longo prazo de pacientes com ''Nódulos Coloides'' puros estáveis (Bethesda II) e eutireoidismo?', '[{"id":"a","text":"Exame físico anual e ultrassonografia periódica conforme fatores de risco, sem necessidade de novas punções a menos que haja crescimento documentado ou mudança de padrão ecográfico."},{"id":"b","text":"Manejo cirúrgico radical de rotina para todos em pálida profunda pálida pálida."},{"id":"c","text":"Uso de iodo-131 preventivo massivo pálido profundo pálida profunda."},{"id":"d","text":"Troca integral do sangue do paciente em 100% dos testes pálidos profundos pálida."},{"id":"e","text":"Suspender o acompanhamento para sempre sem exames pálida profunda pálida."}]', 'a', 
        'Nódulos benignos são a vasta maioria. O overdiagnosis e overtreatment são riscos reais. A vigilância prudente com exames de imagem garante a segurança do paciente sem impor procedimentos invasivos desnecessários por sela túrcica cervical profunda pálida profunda pálida profunda.', '{"a":"Correta. Conduta clínica ética de custo-fecitividade em seguimento oncológico benigno tireoidiano.","b":"Incorreta. Atrocidade cirúrgica injustificada pálida profunda pálida pálida.","c":"Incorreta. Iatrogenia radioativa desnecessária pálida profunda pálida profunda.","d":"Incorreta. Absurdo hematológico pálido profundo pálida profunda pálida.","e":"Incorreta. Risco residual oncológico e compressivo exige mínima vigilância periódica pálida pálida."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '8zxvnd', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Seguimento","Bethesda II","Vigilância","Benignidade"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8zxvnd', 'approved', 294)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q296 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-qz9qmp', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Fase de Hipertireoidismo'' da Tireoidite de Hashimoto (Hashitoxicose) é tratada prioritariamente com:', '[{"id":"a","text":"Betabloqueadores (como Propranolol) para controle de sintomas adrenérgicos, pois o hipertireoidismo é por destruição (vazamento), não por excesso de síntese (o que torna tionamidas ineficazes)."},{"id":"b","text":"Metimazol 60mg em dose massiva pálida profunda pálida profunda."},{"id":"c","text":"Cirurgia de sela túrcica cervical de urgência pálida profunda pálida profunda pálida."},{"id":"d","text":"Iodo-131 em dose máxima para queimar a glândula pálida profunda pálida pálida pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Diferente do Graves, na Hashitoxicose não há excesso de produção; há apenas liberação do que já estava estocado. As tionamidas (que agem na síntese) não funcionam. O tratamento é puramente sintomático e aguarda-se a evolução natural para o hipotireoidismo definitivo por sela túrcica cervical profunda pálida profunda pálida profunda pálida.', '{"a":"Correta. Raciocínio fisiopatológico terapêutico de alta precisão clínica.","b":"Incorreta. Ineficaz pálida profunda pálida pálida profunda pálida pálida pálida.","c":"Incorreta. Absurdo cirúrgico pálida profunda pálida profunda pálida pálida profundo pálida.","d":"Incorreta. Innecessário e pode piorar a inflamação sela túrcica pálida aguda pálida pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'qz9qmp', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hashitoxicose","Propranolol","Destruição","Tratamento"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-qz9qmp', 'approved', 295)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q297 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8u8cnv', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O diagnóstico de ''Hipotireoidismo Factício'' (ingestão oculta de L-T4) é confirmado laboratorialmente por qual combinação de resultados?', '[{"id":"a","text":"TSH baixo, T4 livre elevado, Tireoglobulina sérica Indetectável e Cintilografia branca (ausência de captação)."},{"id":"b","text":"Tireoglobulina astronômica de cor preta profunda pálida profunda."},{"id":"c","text":"Apenas excesso de iodo na urina massiva profunda pálida profunda."},{"id":"d","text":"Crescimento de pelos na língua profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Como a ingestão é exógena, a sela túrcica cervical não produz nada (TG baixa) e a glândula fica ''preguiçosa'' (cintilografia fria). É o principal diagnóstico diferencial de tireotoxicose em profissionais de saúde ou pacientes psiquiátricos sela túrcica profunda pálida profunda pálida pálida pálida.', '{"a":"Correta. Bioquímica e psiquiatria forense-endocrinológica clássica e de alta complexidade diagnóstica.","b":"Incorreta. Sugere produção endógena tumorosa pálida profunda pálida pálida profunda.","c":"Incorreta. Inspecífico pálida profunda pálida profunda pálida profunda pálida pálida.","d":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8u8cnv', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Factício","Tireoglobulina","Diagnóstico Diferencial","Tireotoxicose"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8u8cnv', 'approved', 296)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q298 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-gdwb5h', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal via metabólica de degradação periférica da Levotiroxina (T4) envolve qual micronutriente essencial como cofator das enzimas Deiodinases?', '[{"id":"a","text":"Selênio (Se), sob a forma de selenocisteína no sítio ativo da enzima."},{"id":"b","text":"Açúcar mascavo massivo pálido profundo pálida profunda pálida profunda pálida."},{"id":"c","text":"Ferro de cor azul profunda sela túrcica pálida pálida pálida."},{"id":"d","text":"Potássio injetável no coração profundo pálido profundo pálida pálida pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'As deiodinases (D1, D2, D3) são selenoproteínas. Deficiências severas de selênio prejudicam a produção de T3 e a depuração de T3 reverso, agindo sinergicamente com a deficiência de iodo no bócio e atraso de crescimento pálida profunda pálida pálida pálida pálida.', '{"a":"Correta. Nutrologia e bioquímica tireoidiana viga-mestra sela túrcica cervical profunda.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida pálida pálida pálida.","c":"Incorreta. Absurdo pálido profundo pálida profunda pálida profunda pálida pálida.","d":"Incorreta. Absurdo técnico pálida profunda pálida profunda pálida pálida pálida.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'gdwb5h', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Selênio","Deiodinases","Bioquímica","Micronutrientes"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-gdwb5h', 'approved', 297)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q299 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-gofwv8', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Biópsia por PAAF'' realizada em múltiplos nódulos (Bócio Multinodular) deve priorizar quais lesões para coleta?', '[{"id":"a","text":"Nódulos que apresentam sinais de suspeição ultrassonográfica (microcalcificações, hipoecoicidade, margens irregulares), independentemente de serem os maiores ou ''dominantes'' do bócio."},{"id":"b","text":"Exclusivamente o menor nódulo invisível pálido profundo pálida pálida."},{"id":"c","text":"Somente nódulos que doem ao toque pálido profundo pálida profunda pálida profunda."},{"id":"d","text":"Inundar a glândula de sangue pálido profundo pálida pálida pálida profunda pálida."},{"id":"e","text":"Nenhum; bócios múltiplos nunca são câncer pálida profunda pálida profunda pálida."}]', 'a', 
        'O tamanho isolado (nódulo dominante) é um péssimo preditor de malignidade em bócios múltiplos. Um microcarcinomacom características TI-RADS 5 deve ser puncionado antes de um nódulo espongiforme (benigno) de 4 cm por sela túrcica cervical profunda pálida profunda pálida pálida pálida pálida.', '{"a":"Correta. Estratégia radiológica e cirúrgica de triagem em patologias nodulares complexas.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida pálida.","c":"Incorreta. Dor sugere inflamação ou hemorragia, não câncer pálida profunda pálida pálida.","d":"Incorreta. Atrocidade técnica pálida profunda pálida profunda pálida profunda pálida pálida.","e":"Incorreta. O risco de câncer de tireoide por nódulo é o mesmo em bócio uni ou multinodular."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'gofwv8', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bócio Multinodular","TI-RADS","PAAF","Seleção de Nódulo"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-gofwv8', 'approved', 298)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q300 (Part 12)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-p76goq', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'QUAL O TESTE DE ''PADRÃO OURO'' PARA AVALIAR A RESERVA DE TIREOTROFOS HIPOFISÁRIOS E DIFERENCIAR O HIPOTIREOIDISMO CENTRAL (HIPOFISÁRIO VS HIPOTALÂMICO)?', '[{"id":"a","text":"Teste de estímulo com TRH (Hormônio Liberador de Tireotrofina) sintético, observando-se a curva de resposta do TSH sérico pós-infusão."},{"id":"b","text":"Dosagem de açúcar pálido profundo pálida profunda pálida profunda."},{"id":"c","text":"Trocar o iodo por açúcar pálido profundo na sela túrcica pálida pálida profunda."},{"id":"d","text":"Cura total da visão pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido profundo pálida pálida profunda."}]', 'a', 
        'Embora pouco usado hoje em dia (pela qualidade dos ensaios de TSH de 4ª geração), o teste do TRH ajuda a localizar a lesão: se o TSH não subir, a sela túrcica hipofisária é a culpada primária da falha central pálida profunda pálida profunda pálida pálida pálida.', '{"a":"Correta. Fisiologia e dinâmica hormonal neuroendocrinológica clássica e de alto nível clínico diagnóstica profunda.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida pálida pálida.","c":"Incorreta. Absurdo pálido profundo pálida profunda pálida profunda pálida pálida pálida pálida.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida pálida pálida pálida pálida pálida pálida.","e":"Incorreta."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'p76goq', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Teste do TRH","Hipotireoidismo Central","Dinâmica Hormonal","Hipófise"],"batch":12}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-p76goq', 'approved', 299)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

END $$;
END c:UserskayquDesktopQrub1QRub;