DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-kl4sib', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um recém-nascido apresentando hipotireoidismo subclínico transitório pode ter sua condição atribuída ao uso materno de qual substância durante a gestação?', '[{"id":"a","text":"Antitireoidianos de síntese (PTU ou Metimazol) ou exposição a iodo tópico antisséptico (PVP-I)."},{"id":"b","text":"Vitamina C em comprimidos efervescentes."},{"id":"c","text":"Água com gás em excesso."},{"id":"d","text":"Lentes de contato descartáveis."},{"id":"e","text":"Uso de calçados de salto alto por mais de 8 horas."}]', 'a', 
        'Essas medicações e substâncias ultrapassam a barreira placentária. Os antitireoidianos bloqueiam a tireoide fetal. O uso excessivo de iodo (como antissépticos tópicos usados pela mãe em cirurgias ou feridas) induz o efeito Wolff-Chaikoff na tireoide do feto/neonato, que é extremamente sensível ao excesso de iodo.', '{"a":"Correta. Causa farmacológica externa transmitida pela mãe.","b":"Incorreta. Inócuo ao eixo tireoidiano nesta dose.","c":"Incorreta. Irreal.","d":"Incorreta. Irreal.","e":"Incorreta. Absurdo clínico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'kl4sib', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Gestação","Iatrogenia","Wolff-Chaikoff","Neonato"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-kl4sib', 'approved', 120)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q122 (Part 5)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-wfmeh5', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente de 55 anos submetido à tireoidectomia total por Carcinoma Folicular invasivo (T3N1M0). Dois meses após a cirurgia, a Tireoglobulina sérica sob estímulo do TSH está em 50 ng/mL (valor alto). A pesquisa de corpo inteiro (PCI) com I-131 não mostra captação em nenhuma região do corpo. Este quadro sugere:', '[{"id":"a","text":"Doença recorrente desdiferenciada (não funcionante para os radioisótopos de iodo)."},{"id":"b","text":"Cura completa laboratorial."},{"id":"c","text":"Ausência funcional de metástases."},{"id":"d","text":"Necessidade de repor iodo na dieta desesperadamente."},{"id":"e","text":"Apenas erro do laboratório que deve ser ignorado."}]', 'a', 
        'A presença de Tireoglobulina elevada em um paciente sem tireoide é prova inequívoca de tecido tireoidiano residual (geralmente tumoral). O fato de o exame de imagem funcional (PCI) ser negativo diante de um marcador tumoral elevado caracteriza o fenômeno de ''desdiferenciação'', onde a metástase perdeu o transportador de iodo (NIS) mas continua produzindo TG, exigindo outros métodos de imagem como PET-CT.', '{"a":"Correta. Dilema clínico oncológico frequente (TG positiva, PCI negativa).","b":"Incorreta. A TG deveria tendencialmente ser indetectável ou < 1 ng/mL.","c":"Incorreta. As metástases existem, mas não são vistas pelo iodo.","d":"Incorreta. Excesso de iodo na verdade pioraria a sensibilidade diagnóstica se houvesse captação.","e":"Incorreta. Conduta temerária frente a um marcador oncológico real."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'wfmeh5', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Desdiferenciação","Tireoglobulina","Radioiodo","Oncologia"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-wfmeh5', 'approved', 121)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q123 (Part 5)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ua3wyb', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal causa de Bócio Mergulhante (Intratorácico) é:', '[{"id":"a","text":"O peso da glândula aumentado em bócios multinodulares de longa data, associado à pressão intratorácica negativa e movimentação cervicotorácica."},{"id":"b","text":"Uma bactéria que ''puxa'' a glândula para baixo."},{"id":"c","text":"Atração magnética das costelas."},{"id":"d","text":"Deficiência persistente de magnésio intracelular."},{"id":"e","text":"Consumo de refrigerantes com sódio alto."}]', 'a', 
        'O bócio cresce em direção ao mediastino, seguindo o caminho de menor resistência, auxiliado pela força da gravidade e pela pressão negativa do tórax durante a respiração. A região supraclavicular torna-se insuficiente para conter glândulas hipertrofiadas volumosas.', '{"a":"Correta. Fisiopatologia anatômica coerente.","b":"Incorreta. Irreal.","c":"Incorreta. Totalmente sem pé nem cabeça.","d":"Incorreta. Inesistente na etiologia do bócio mergulhante.","e":"Incorreta. Relacionado secundariamente se houver obesidade, mas não causal direto estrutural."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ua3wyb', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bócio Mergulhante","Anatomia","Cirurgia","Endocrinologia"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ua3wyb', 'approved', 122)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q124 (Part 5)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-gnn9g', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de hipercalcemia em um paciente com hipertireoidismo severo é decorrente da:', '[{"id":"a","text":"Aumento da reabsorção óssea mediada diretamente pelo excesso de T3 e T4, estimulando os osteoclastos e reduzindo o tempo de remodelamento."},{"id":"b","text":"Produção ectópica de paratormônio (PTH) pela glândula tireóide."},{"id":"c","text":"Ingestão excessiva de leite para compensar a perda de peso."},{"id":"d","text":"Perda urinária de fósforo induzindo acúmulo sérico de cálcio reativo."},{"id":"e","text":"Desidratação causando concentração do cálcio plasmático isolada por 24 horas."}]', 'a', 
        'Os hormônios tireoidianos têm ação anabólica óssa em baixas doses, mas em doses suprafisiológicas ativam as vias de reabsorção óssea. Isso pode elevar o cálcio iônico sérico em até 10-15% dos pacientes tireotóxicos e levar a bócio por hipercalcinose se o quadro for crônico.', '{"a":"Correta. Mecanismo fisiopatológico da osteopatia e calciopenia tireotóxica.","b":"Incorreta. Paratireoides são órgãos distintos e regulados negativamente se o cálcio sobe.","c":"Incorreta. Sem nexo epidemiológico.","d":"Incorreta. Inexistente.","e":"Incorreta. O edema intersticial tireotóxico pode ocorrer, mas o mecanismo do cálcio é ósseo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'gnn9g', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipercalcemia","Remodelamento Ósseo","Fisiologia","Tireotoxicose"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-gnn9g', 'approved', 123)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q125 (Part 5)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-gvh4y1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a conduta imediata em um paciente com Nódulo de Tireoide e TSH = 0,05 mUI/L (suprimido)?', '[{"id":"a","text":"Realizar Cintilografia de Tireoide."},{"id":"b","text":"Realizar PAAF imediata."},{"id":"c","text":"Tratar com Radiofrequência profilática."},{"id":"d","text":"Aguardar 6 meses sem exames."},{"id":"e","text":"Iniciar Levotiroxina."}]', 'a', 
        'Algoritmo de nódulo tireoidiano: Se TSH baixo, proceda à cintilografia (padrão ouro). Se o nódulo for ''quente'' (hipercaptante), o risco de câncer é desprezível e a PAAF não é indicada inicialmente. Se for ''frio'', trata-se como um nódulo comum seguindo critérios de USG.', '{"a":"Correta. Primeira etapa diagnóstica obrigatória no algoritmo endocrinológico.","b":"Incorreta. PAAF em nódulo quente gera falso diagnósticos de ''lesão folicular'' por atipias induzidas pelo estímulo hormonal.","c":"Incorreta. Excesso terapêutico.","d":"Incorreta. Atrai agravamento da tireotoxicose não diagnosticada.","e":"Incorreta. Agrava drasticamente o quadro clínico do paciente."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'gvh4y1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Nódulo de Tireoide","Algoritmo","TSH","Endocrinologia"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-gvh4y1', 'approved', 124)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q126 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-qwenrn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Síndrome de Marine-Lenhart'' descreve uma variante rara da Doença de Graves que se associa a qual outra condição funcional da tireoide?', '[{"id":"a","text":"Nódulos autônomos (bócio nodular tóxico) coexistindo com a estimulação difusa pelo TRAb."},{"id":"b","text":"Agravação por anticorpos anti-células parietais."},{"id":"c","text":"Somente hipotireoidismo agudo de Hashimoto."},{"id":"d","text":"Câncer anaplásico precoce."},{"id":"e","text":"Deficiência congênita de Vitamina B12."}]', 'a', 
        'A Síndrome de Marine-Lenhart é a combinação de Doença de Graves (estimulação difusa e homogênea da glândula por TRAb) com a presença de um ou mais nódulos autonômos hiperfuncionantes. Laboratorialmente é indistinguível do Graves clássico, mas na cintilografia os nódulos podem captar mais iodo que o parênquima circundante, e habitualmente exigem doses maiores de Iodo-131 para tratamento eficaz.', '{"a":"Correta. Definição da síndrome mista.","b":"Incorreta. Relacionado a anemia perniciosa.","c":"Incorreta. Marine-Lenhart cursa com hipertireoidismo.","d":"Incorreta. Sem relação oncológica específica.","e":"Incorreta. Sem nexo clínico primário."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'qwenrn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Marine-Lenhart","Graves","Bócio Nodular","Cintilografia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-qwenrn', 'approved', 125)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q127 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-u6enq2', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O ''Hipertireoidismo Apático'' é uma forma de apresentação atípica da tireotoxicose que exige alto índice de suspeição diagnóstica. Em qual grupo populacional ele é mais prevalente?', '[{"id":"a","text":"Idosos acima de 70-80 anos."},{"id":"b","text":"Crianças menores de 2 anos."},{"id":"c","text":"Atletas de crossfit em uso de anabolizantes."},{"id":"d","text":"Gestantes no primeiro mês."},{"id":"e","text":"Adolescentes com transtorno bipolar."}]', 'a', 
        'No idoso, os sinais adrenérgicos clássicos do hipertireoidismo (taquicardia, agitação, tremor) podem estar ausentes. O paciente apresenta-se paradoxalmente letárgico, deprimido (apático), com perda ponderal severa e, frequentemente, apenas fibrilação atrial isolada como pista diagnóstica.', '{"a":"Correta. Perfil clínico atípico de extrema importância na geriatria.","b":"Incorreta. Em pediatria a clínica costuma ser florida.","c":"Incorreta. Hipertireoidismo factício teria outras facetas.","d":"Incorreta. Clínica gestacional é exuberante.","e":"Incorreta. O transtorno bipolar não amortece de forma ''apática'' o hipertireoidismo clínico comum no jovem."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'u6enq2', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Idoso","Hipertireoidismo Apático","Diagnóstico Diferencial","Clínica Médica"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-u6enq2', 'approved', 126)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q128 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-zv4jr', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a alteração do colesterol sérico clássica encontrada em pacientes com Hipotireoidismo Primário severo?', '[{"id":"a","text":"Aumento do Colesterol Total e do LDL-Colesterol decorrente da diminuição da síntese de receptores de LDL pelos hepatócitos."},{"id":"b","text":"Redução global de todas as frações de gordura no sangue."},{"id":"c","text":"Somente aumento isolado de Triglicerídeos e redução de HDL sérico."},{"id":"d","text":"Não há interação laboratorial entre tireoide e perfil lipídico."},{"id":"e","text":"Hipotrigliceridemia grave persistente."}]', 'a', 
        'A tiroxina (T4) estimula a expressão hepática dos receptores de LDL. Sem hormônio, o LDL circulante não é adequadamente limpo da circulação, elevando significativamente os níveis lipídicos. Em muitos pacientes, o tratamento exclusivo do hipotireoidismo normaliza o perfil lipídico sérico sem necessidade de estatinas iniciais.', '{"a":"Correta. Mecanismo metabólico endócrino fundamental.","b":"Incorreta. Ocorre no hipertireoidismo.","c":"Incorreta. O aumento do LDL é a marca registrada metabólica mais sensível.","d":"Incorreta. O hipotireoidismo é uma das principais causas de dislipidemia secundária.","e":"Incorreta. Os TG podem até subir secundariamente no hipotira."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'zv4jr', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Dislipidemia","Hipotireoidismo","LDL","Metabolismo"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-zv4jr', 'approved', 127)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q129 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-wu1xvm', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Síndrome de Schmidt'' é constituída por qual combinação de patologias autoimunes?', '[{"id":"a","text":"Doença de Addison (Insuficiência Adrenal) e Doença de Hashimoto (ou Graves)."},{"id":"b","text":"Diabetes tipo 1 e Vitiligo."},{"id":"c","text":"Bócio multinodular e Doença Celíaca."},{"id":"d","text":"Anemia Perniciosa e Hipoparatiroidismo."},{"id":"e","text":"Lúpus e Sarcoidose."}]', 'a', 
        'A Síndrome de Schmidt é a denominação clássica para a Síndrome Poliglandular Autoimune Tipo 2 (SPA 2), caracterizada prioritariamente pela associação de insuficiência adrenal autoimune com doença autoimune da tireoide (comumente Hashimoto, mas também Graves). É vital detectar ambas, pois o tratamento isolado da tireoide em um paciente com Addison não diagnosticado pode levar à morte por choque adrenal.', '{"a":"Correta. Nome histórico e associação clínica padrão-ouro.","b":"Incorreta. Podem fazer parte do SPA 2, mas não definem o núcleo da Schmidt sozinhos.","c":"Incorreta. Sem relação sindrômica direta prioritária.","d":"Incorreta. Marcadores do SPA tipo 1.","e":"Incorreta. Doenças sistêmicas não endócrinas típicas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'wu1xvm', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Síndrome de Schmidt","SPA Tipo 2","Addison","Polidlandular"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-wu1xvm', 'approved', 128)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q130 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w1zvrw', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A lesão unilateral acidental do Nervo Laríngeo Superior duranta a tireoidectomia (frequentemente ao clampar a artéria tireóidea superior) manifesta-se clinicamente como:', '[{"id":"a","text":"Perda de tons agudos e fadiga vocal (especialmente em profissionais da voz/cantores), além de risco de aspiração de líquidos."},{"id":"b","text":"Rouquidão intensa e imediata (bitonalidade)."},{"id":"c","text":"Fasciculação da língua prolongada."},{"id":"d","text":"Paralisia completa de toda a laringe com estridor."},{"id":"e","text":"Cessação da produção de saliva pelo ducto parotídeo."}]', 'a', 
        'Diferente do nervo recorrente (que move as cordas vocais), o nervo laríngeo superior inerva o músculo cricotireóideo, responsável pelo estiramento da prega vocal e produção de sons de alta frequência. Sua lesão é muitas vezes sutil para o paciente comum, mas devastadora para oradores e cantores devido à perda de alcance vocal.', '{"a":"Correta. Semiologia neurológica cirúrgica específica.","b":"Incorreta. Marca registrada da lesão do nervo recorrente unilateral.","c":"Incorreta. Lesão do Hipoglosso.","d":"Incorreta. Exigiria lesão bilateral severa traumática.","e":"Incorreta. Glândulas salivares são distantes deste sítio cirúrgico tireoidiano."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w1zvrw', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Complicações Cirúrgicas","Nervo Laríngeo Superior","Foniatria","Cirurgia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-w1zvrw', 'approved', 129)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q131 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-f6rhau', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma Medular de Tireoide e o Feocromocitoma Bilateral são manifestações clínicas obrigatórias em qual destas síndromes?', '[{"id":"a","text":"Neoplasia Endócrina Múltipla tipo 2A e 2B (NEM 2)."},{"id":"b","text":"NEM tipo 1 apenas (Síndrome de Wermer)."},{"id":"c","text":"Síndrome de Cushing subclínica."},{"id":"d","text":"Anemia de Fanconi hereditária."},{"id":"e","text":"Síndrome de Kallmann (hipogonadismo hipogonadotrófico)."}]', 'a', 
        'A Neoplasia Endócrina Múltipla Tipo 2 é causada por mutações ativadoras no proto-oncogene RET. Ambas as variantes (2A e 2B) apresentam Carcinoma Medular de Tireoide (100% dos casos) e Feocromocitoma (cerca de 50%). A tipo 2A associa-se também ao hiperparatiroidismo, enquanto a 2B apresenta fenotipo marfanoide e neuromas de mucosa.', '{"a":"Correta. Associação clássica e viga-mestra na oncogenética endócrina.","b":"Incorreta. Hipófise, Paratireoide e Pâncreas (os 3 ''P''s).","c":"Incorreta. Relacionado a excesso de glicocorticoides de causa diversa.","d":"Incorreta. Causa falência medular hematológica.","e":"Incorreta. Relacionado a anosmia e deficiência de GnRH central."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'f6rhau', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["NEM 2","CMT","Feocromocitoma","RET"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-f6rhau', 'approved', 130)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q132 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-79diyj', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O hormônio T3 (tri-iodotironina) circulante provém majoritariamente de qual processo metabólico?', '[{"id":"a","text":"Conversão periférica do T4 para T3 pela ação das enzimas deiodinases (tipo 1 e 2), principalmente no fígado e rins."},{"id":"b","text":"Secreção direta massiva pela glândula tireóide."},{"id":"c","text":"Digestão estomacal baseada em ácido gástrico."},{"id":"d","text":"Absorção pelo intestino grosso através de bactérias simbióticas."},{"id":"e","text":"Transformação por radiações UV no tecido subcutâneo facial."}]', 'a', 
        'A tireoide produz cerca de 90-95% de T4 (pro-hormônio) e apenas uma pequena fração de T3 (hormônio ativo). Cerca de 80% do T3 circulante é oriundo da remoção enzimática de um átomo de ioda do T4 nos tecidos periféricos (fígado, músculo, rim), o que torna a deiodinação o principal passo de ativação hormonal.', '{"a":"Correta. Bioquímica e fisiologia tireoidiana central.","b":"Incorreta. A tireoide produz pouco T3 direto.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Irreal.","e":"Incorreta. Descreve a síntese de Vitamina D."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '79diyj', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["T3","T4","Deiodinases","Conversão Periférica"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-79diyj', 'approved', 131)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q133 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-3xp8xs', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Variante Insular'' (Insular variant) do câncer de tireoide é atualmente considerada pelo sistema de classificação da WHO como um tumor de que tipo?', '[{"id":"a","text":"Carcinoma de Tireoide Pouco Diferenciado (Poorly Differentiated Thyroid Carcinoma - PDTC), de prognóstico intermediário entre o diferenciado e o anaplásico."},{"id":"b","text":"Microcarcinoma benigno."},{"id":"c","text":"Tumor puramente estromal e sem agressividade clínica."},{"id":"d","text":"Variante oncocítica de células de Hürthle simples."},{"id":"e","text":"Metástase pulmonar intramamária apenas."}]', 'a', 
        'O carcinoma insular é o protótipo do carcinoma ''pouco diferenciado''. Apresenta um padrão de ninhos sólidos de células pequenas (ilhas), elevada taxa mitótica e necrose tecidual histológica. Possui maior agressividade biológica e menores taxas de cura pelo radioiodo quando isolado comparado ao papilífero clássico.', '{"a":"Correta. Evolução histopatológica e terminologia diagnóstica atualizada.","b":"Incorreta. Maligno de alto grau.","c":"Incorreta. Tumor epitelial epitelial agressivo.","d":"Incorreta. Diferente citologicamente das células oncocíticas.","e":"Incorreta. Sem nexo."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '3xp8xs', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Insular","Pouco Diferenciado","Patologia","Oncologia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-3xp8xs', 'approved', 132)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q134 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ojt3sn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 40 anos apresenta nódulo tireoidiano de 1,2 cm em lobo direito. A citologia por PAAF revela: ''Epitélio folicular arranjado em microfolículos, escassa coloide, intensa atipia nuclear frouxa, sistema Bethesda IV''. Qual a conduta padrão ouro?', '[{"id":"a","text":"Cirurgia (geralmente lobectomia diagnóstica inicial) ou teste molecular (quando disponível) para diferenciar adenoma de carcinoma."},{"id":"b","text":"Apenas repetir a PAAF após 6 meses."},{"id":"c","text":"Iodo Radioativo curativo de 30 mCi imediato."},{"id":"d","text":"Aspirar e esvaziar o cisto."},{"id":"e","text":"Suspender o sal na comida por 1 ano."}]', 'a', 
        'A categoria Bethesda IV (Suspeito para Neoplasia Folicular) apresenta um risco de malignidade entre 15% e 30%. Como a citologia não diferencia adenoma de carcinoma, o diagnóstico definitivo depende da análise da peça cirúrgica (cápsula e vasos). Alternativamente, o uso de painéis moleculares que buscam mutações e padrões de gene expression pode evitar cirurgias diagnósticas desnecessárias.', '{"a":"Correta. Conduta padrão em nódulos indeterminados da linhagem folicular.","b":"Incorreta. A repetição não resolve o problema diagnóstico biológico subjacente do Bethesda IV.","c":"Incorreta. Iodo não diagnostica ou trata nódulos frios Bethesda IV inicialmente.","d":"Incorreta. Nódulos Bethesda IV são tipicamente sólidos ou predominantemente sólidos.","e":"Incorreta. Absurdo clínico sem nexo biológico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ojt3sn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bethesda IV","Nódulo de Tireoide","Cirurgia","Conduta"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ojt3sn', 'approved', 133)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q135 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-1eqqn5', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de bócio indolor volumoso e endurecido, associado a Hipocalcemia severa sintomática (Sinal de Trousseau positivo) em um paciente com diagnóstico prévio de Doença Medular de Tireoide deve levantar a suspeita de qual processo sistêmico?', '[{"id":"a","text":"Invasão direta local das paratireoides pelo Carcinoma Medular, reduzindo o PTH agudamente."},{"id":"b","text":"Excesso de Calcitonina isolado reduzindo o cálcio (efeito farmacológico massivo)."},{"id":"c","text":"Hipotireoidismo de Riedel induzido pelo tumor."},{"id":"d","text":"Gordura na biliar fecal."},{"id":"e","text":"Mimetismo molecular com calcificações da aorta."}]', 'a', 
        'O carcinoma medular pode ser localmente invasivo. Devido à sua posição anatômica frequente na parte superior e central dos lobos tireoidianos, pode infiltrar e destruir as quatro glândulas paratireoides vizinhas, levando ao hipoparatiroidismo grave e hipocalcemia persistente.', '{"a":"Correta. Complicação biomecânica e oncológica loco-regional severa.","b":"Incorreta. Curiosamente, mesmo níveis astronômicos de calcitonina (ex: 20.000 ng/mL) no carcinoma medular raramente causam hipocalcemia clínica, pois os receptores ósseos sofrem downregulation (''downregulation'') rápido.","c":"Incorreta. Riedel é autoimune por IgG4, não tumoral direta.","d":"Incorreta. Sem nexo.","e":"Incorreta. Sem nexo."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '1eqqn5', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Medular","Hipocalcemia","Paratireoide","Metástases"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-1eqqn5', 'approved', 134)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q136 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-qjk7gq', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Sobre o uso do Tapazol (Metimazol) em idosos com cardiopatia, qual cuidado inicial é recomendado antes de atingir o eutireoidismo pleno?', '[{"id":"a","text":"Sempre associar Betabloqueadores (como Atenolol ou Propranolol) para controlar a taquicardia e prevenir arritmias letais até que a função tireoidiana esteje medicada."},{"id":"b","text":"Realizar reposição massiva de iodo na dieta."},{"id":"c","text":"Somente repouso absoluto no escuro por 30 dias."},{"id":"d","text":"Induzir hipotireoidismo agudo imediato com doses de 100 mg/dia do fármaco de rotina em casos leves."},{"id":"e","text":"Utilizar exclusivamente aspirina para aliviar os tremores."}]', 'a', 
        'O tratamento com tionamidas (Metimazol) demora de 4 a 8 semanas para normalizar os níveis hormonais (estoppel de síntese e depleção hormonal residual). No paciente cardiopata, os sintomas adrenérgicos do hipertireoidismo (palpitações, FA, angina) causam risco imediato; portanto, o uso adjuvante de betabloqueadores é crucial para estabilização hemodinâmica inicial.', '{"a":"Correta. Prática clínica de segurança primária cardiovascular.","b":"Incorreta. Pioraria o hipertireoidismo (Jod-Basedow) no idoso com bócio nodular.","c":"Incorreta. Não resolve a toxicidade bioquímica tecidual cardíaca.","d":"Incorreta. Doses astronômicas iniciais em idosos aumentam o risco de hepatotoxicidade e agranulocitose.","e":"Incorreta. Aspirina pode elevar o T4 livre, piorando o quadro."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'qjk7gq', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Metimazol","Betabloqueadores","Idoso","Cardiopatia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-qjk7gq', 'approved', 135)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q137 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-glvan6', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Célula de Askanazy'' (Hürthle) é comum em biópsias de tireoide e caracteriza-se por um citoplasma abundante, granular e eosinofílico. Histologicamente, esse aspecto é decorrente do acúmulo patológico de qual organela celular?', '[{"id":"a","text":"Mitocôndrias."},{"id":"b","text":"Complexo de Golgi dilatado."},{"id":"c","text":"Ribossomos livres."},{"id":"d","text":"Lisossomos com pigmento melânico."},{"id":"e","text":"Retículo Endoplasmático Rugoso hipertrófico apenas."}]', 'a', 
        'As células de Hürthle (oncócitos) apresentam um citoplasma granular rosa característico devido à presença massiva e hipertrófica de mitocôndrias. São comuns na Tireoidite de Hashimoto e em neoplasias oncocíticas, representando células com alto turnover metabólico ou degeneração metabólica específica.', '{"a":"Correta. Fato histopatológico definidor da oncocitose.","b":"Incorreta. Não causa esse tipo de granulação eosinofílica clássica.","c":"Incorreta. Ribossomos dão cor basofílica (azulada) ao citoplasma, não eosinofílica.","d":"Incorreta. Não relacionado.","e":"Incorreta. O retículo liso poderia ser abundante em células produtoras de esteroides, mas na tireoide do Hürthle são as mitocôndrias."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'glvan6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Célula de Hürthle","Mitocôndria","Hashimoto","Histologia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-glvan6', 'approved', 136)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q138 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-g9iol7', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O principal anticorpo marcador da Doença de Graves, capaz de estimular a glândula tireóide de forma contínua, é o:', '[{"id":"a","text":"TSH receptor antibody (TRAb) - fração estimuladora."},{"id":"b","text":"Antibiorpo Antirreticulina."},{"id":"c","text":"Antigeno Carcinoembrionário (CEA)."},{"id":"d","text":"Antígeno prostático específico (PSA)."},{"id":"e","text":"Anti-SCL 70."}]', 'a', 
        'O TRAb é o mecanismo patogênico central da Doença de Graves. Ele mimetiza o TSH, ligando-se ao seu receptor nos tireócitos e ativando a cascata do AMP cíclico, levando à hiperplasia difusa e hiper-secreção desgovernada de hormônios.', '{"a":"Correta. Bioquímica e imunologia da doença tireoidiana básica.","b":"Incorreta. Relacionado a doença celíaca.","c":"Incorreta. Marcador oncológico do CMT ou TGI.","d":"Incorreta. Marcador prostático.","e":"Incorreta. Relacionado a esclerodermia sistêmica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'g9iol7', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TRAb","Graves","Autoimunidade","Endocrinologia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-g9iol7', 'approved', 137)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q139 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-lifkss', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Biópsia por PAAF'' tem o seu maior valor diagnóstico em qual destes cenários oncológicos?', '[{"id":"a","text":"Na identificação do Carcinoma Papilífero de Tireoide, onde apresenta sensibilidade e especificidade elevadíssimas (> 95%)."},{"id":"b","text":"Para diferenciar Carcinoma Folicular de Nódulo Benigno."},{"id":"c","text":"Para detectar exclusivamente osteoporose cervical."},{"id":"d","text":"Como tratamento para câncer de pulmão."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'O diagnóstico citológico do carcinoma papilífero baseia-se em alterações nucleares inequívocas (fendas, núcleos claros, pseudo-inclusões). Diferente do folicular (que exige análise capsular histológica), o papilífero pode ser diagnosticado com segurança absoluta apenas pelas células aspiradas.', '{"a":"Correta. Fato diagnóstico viga-mestra na oncologia de cabeça e pescoço.","b":"Incorreta. Justamente a principal limitação da PAAF é a linhagem folicular (Bethesda IV).","c":"Incorreta. Absurdo técnico.","d":"Incorreta. Absurdo técnico.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'lifkss', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PAAF","Carcinoma Papilífero","Diagnóstico","Bethesda"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-lifkss', 'approved', 138)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q140 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8exz13', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente apresentando bócio difuso leve, taquicardia severa e níveis indetectáveis de Tireoglobulina (TG) sérica deve sugerir:', '[{"id":"a","text":"Hipertireoidismo factício (ingestão exógena inadvertida ou proposital de hormônio tireoidiano)."},{"id":"b","text":"Doença de Graves em atividade massiva."},{"id":"c","text":"Bócio multinodular tóxico crônico."},{"id":"d","text":"Carcinoma medular oculto."},{"id":"e","text":"Uso excessivo de sal marinho iodado."}]', 'a', 
        'A Tireoglobulina é produzida apenas por tecido tireoidiano funcionante e ''vaza'' para a circulação quando a glândula está em hiperatividade endógena. Se houver excesso de hormônio no sangue mas a TG estiver baixa (indetectável ou < 1-2 ng/mL), significa que a glândula nativa está suprimida e a fonte de hormônio é externa (pastilhas manipuladas, iatrogenia ou transtorno psiquiátrico).', '{"a":"Correta. Diagnóstico diferencial bioquímico essencial na clínica médica.","b":"Incorreta. TG estaria extremamente elevada pelo estímulo do TRAb.","c":"Incorreta. TG estaria elevada pela autonomia nodular.","d":"Incorreta. CMT não causa hipertireoidismo clínico direto desta forma.","e":"Incorreta. Sem nexo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8exz13', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Factício","Tireoglobulina","Diagnóstico Diferencial","Endocrinologia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8exz13', 'approved', 139)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q141 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-zf0ves', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O tratamento do Hipotireoidismo primário durante a gestação exige ajustes na dose de Levotiroxina (L-T4). Qual a conduta prática recomendada logo após a confirmação da gravidez pela paciente?', '[{"id":"a","text":"Aumentar a dose semanal de L-T4 em aproximadamente 25 a 30% (geralmente acrescentando 2 doses semanais extras na grade atual) e dosar TSH mensalmente."},{"id":"b","text":"Suspender a medicação para não sobrecarregar o feto."},{"id":"c","text":"Manter a mesma dose e reavaliar apenas após o 6º mês."},{"id":"d","text":"Trocar para T3 isolado em gotas puras."},{"id":"e","text":"Dobrar a dose de rotina."}]', 'a', 
        'A demanda de hormônio aumenta logo no início da gestação devido aos elevados níveis de estrogênio (aumentando a TBG) e à transferência de T4 materno para o feto. O atraso no ajuste pode elevar o TSH materno rapidamente, prejudicando o neurodesenvolvimento fetal nas fases iniciais críticas.', '{"a":"Correta. Guideline internacional mandatória para segurança obstétrica.","b":"Incorreta. Conduta de alto risco para abortamento e dano cerebral fetal.","c":"Incorreta. Perigoso atraso no ajuste fisiológico necessário.","d":"Incorreta. O T4 é essencial e seguro na gestação; o T3 não é recomendado para reposição isolada.","e":"Incorreta. Excesso sugerido; o aumento de 30% é o ideal estatístico inicial maioria dos casos."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'zf0ves', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Gestação","Hipotireoidismo","Levotiroxina","Pré-Natal"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-zf0ves', 'approved', 140)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q142 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-fjyr9y', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O sinal de ''Stella'' ou retração palpebral superior em pacientes com hipertireoidismo decorre de qual efeito fisiológico?', '[{"id":"a","text":"Hiperatividade simpática do músculo tarsal superior (músculo de Müller), induzida pelo excesso de hormônio tireoidiano."},{"id":"b","text":"Infiltração gordura na pele da pálpebra."},{"id":"c","text":"Paralisia do nervo facial bilateral."},{"id":"d","text":"Desejo do paciente de manter os olhos abertos por mania."},{"id":"e","text":"Calcificação da conjuntiva ocular aguda profunda."}]', 'a', 
        'O estado tireotóxico induz um aumento da sinalização simpática sistêmica e local. O músculo de Müller (músculo liso da pálpebra) sofre contração persistente, gerando a retração palpebral (olhar de espanto). Ao contrário da exoftalmia real (proptose), a retração palpebral pode estar presente em qualquer causa de hipertireoidismo (não exclusivo do Graves) e frequentemente melhora com betabloqueadores.', '{"a":"Correta. Fisiopatologia da semiologia ocular tireotoxicose.","b":"Incorreta. Processo volumétrico, não reacional imediato.","c":"Incorreta. Causaria ptose, não retração.","d":"Incorreta. Inexistente.","e":"Incorreta. Sem nexo anatômico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'fjyr9y', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Sinal de Stella","Müller","Hipertireoidismo","Sinais Clínicos"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-fjyr9y', 'approved', 141)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q143 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-glmxh1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal intervenção recomendada para nódulos tireoidianos benignos (Bethesda II) que são inteiramente císticos (líquidos) e recorrentes após a punção de esvaziamento?', '[{"id":"a","text":"Alcoolização percutânea (injeção guiada por USG de etanol absoluto)."},{"id":"b","text":"Cirurgia de lobectomia aberta."},{"id":"c","text":"Uso de Iodo Radioativo."},{"id":"d","text":"Administração de antineoplásicos intravasculares."},{"id":"e","text":"Colocação de stent cervical."}]', 'a', 
        'Para cistos tireoidianos recorrentes, a escleroterapia com etanol é extremamente eficaz. O álcool causa desidratação e necrose da parede do cisto (que produz o líquido), levando ao colabamento definitivo da cavidade com mínima morbidade e alta taxa de sucesso estético e funcional.', '{"a":"Correta. Técnica intervencionista padrão-ouro em radiologia da tireoide.","b":"Incorreta. Excesso terapêutico para uma lesão benigna puramente cística.","c":"Incorreta. Cistos não captam rádioisótopos (são ''frios'' por definição).","d":"Incorreta. Não há neoplasia para justificar antineoplásicos.","e":"Incorreta. Sem nexo anatômico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'glmxh1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Alcoolização","Cisto de Tireoide","Tratamento","Biópsia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-glmxh1', 'approved', 142)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q144 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-hzcbjt', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireotoxicose de Hashimoto'' (ou Hashitoxicose) é um quadro clínico que descreve:', '[{"id":"a","text":"Uma fase transitória de hipertireoidismo no início da Tireoidite de Hashimoto, decorrente da destruição folicular inflamatória e liberação hormonal indesejada."},{"id":"b","text":"Desejo do paciente de ter câncer."},{"id":"c","text":"Urgência metabólica tratada com iodo radioativo curativo em 24h."},{"id":"d","text":"Hipertireoidismo induzido por dieta sem glúten."},{"id":"e","text":"Variante maligna do bócio de Riedel."}]', 'a', 
        'Semelhante à tireoidite subaguda ou silenciosa, a fase aguda do Hashimoto pode ocasionar liberação massiva de hormônio pré-formado para a circulação devido ao ataque linfocitário intenso à glândula. Deve ser tratada sintomaticamente com betabloqueadores, pois não há hiperfunção glandular real, evitando-se tratamentos definitivos que piorariam o hipotireoidismo futuro inevitável.', '{"a":"Correta. Definição fisiopatológica da fase hiper da tireoidite linfocítica crônica.","b":"Incorreta. Absurdo.","c":"Incorreta. Contraindicado absoluto (destruiria ainda mais o pouco tecido normal residual).","d":"Incorreta. Inexistente.","e":"Incorreta. Riedel é outra entidade patológica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hzcbjt', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hashitoxicose","Hipotireoidismo","Inflamação","Diferencial"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-hzcbjt', 'approved', 143)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q145 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-579y6y', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual hormônio deve ser obrigatoriamente dosado para avaliar o risco de desenvolvimento de Carcinoma Medular de Tireoide em pacientes com nódulos sólidos e antecedentes familiares de Neoplasia Endócrina Múltipla?', '[{"id":"a","text":"Calcitonina."},{"id":"b","text":"ADH."},{"id":"c","text":"Inibina B."},{"id":"d","text":"Gastrina sérica isolada."},{"id":"e","text":"T3 livre em urina de 24 horas."}]', 'a', 
        'A calcitonina é o marcador direto da atividade das células C (parafoliculares). Níveis elevados associados a nódulos tireoidianos são altamente sugestivos de Carcinoma Medular, especialmente em contextos genéticos familiares.', '{"a":"Correta. Marcador tumoral ideal para linhagem Medular.","b":"Incorreta. Hormônio antidiurético (neurohipófise).","c":"Incorreta. Marcador da reserva folicular ovariana ou função testicular periférica.","d":"Incorreta. Pode elevar no NEM 1 (gastrinoma), mas não avalia risco de CMT direto.","e":"Incorreta. Bioquímica inexistente na rotina prática diagnóstica de câncer."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '579y6y', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Calcitonina","Carcinoma Medular","NEM","Oncologia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-579y6y', 'approved', 144)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q146 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9f7o8d', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O principal efeito colateral cutâneo (dermatológico) associado ao uso de Propiltiomacil (PTU) ou Metimazol, que exige suspeita imediata e possível troca de medicação se houver agravamento sistêmico, é:', '[{"id":"a","text":"Exantema macular/papular acompanhado de prurido (urticária leve) ou, raramente, vasculite anca-positiva e agranulocitose."},{"id":"b","text":"Hiperqueratose palmo-plantar fixa."},{"id":"c","text":"Queda massiva de supercílios (Madarose)."},{"id":"d","text":"Surgimento de múltiplas sardas no rosto (Efelides)."},{"id":"e","text":"Cianose de extremidades permanente."}]', 'a', 
        'Reações alérgicas cutâneas ocorrem em 5% dos pacientes em uso de antitireoidianos. Embora a maioria seja leve (prurido), a ocorrência de vasculite ANCA-positiva ou reações severas pode indicar toxicidade hematológica ou sistêmica grave (LES-like), exigindo suspensão ou substituição da terapia por iodo radioativo ou cirurgia.', '{"a":"Correta. Efito colateral dermatológico e sistêmico farmacológico.","b":"Incorreta. Inespecífico.","c":"Incorreta. É sinal de hipotireoidismo severo/Hashimoto (Sinal de Hertoghe).","d":"Incorreta. Exposição solar.","e":"Incorreta. Causas cardíacas/pulmonares críticas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9f7o8d', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Metimazol","PTU","Efeitos Colaterais","Reações Cutâneas"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9f7o8d', 'approved', 145)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q147 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-lqk5vh', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No tratamento do câncer diferenciado de tireoide, o termo ''Radioiodoterapia'' de ablação refere-se:', '[{"id":"a","text":"À destruição do remanescente de tecido tireoidiano normal após a cirurgia de tireoidectomia total, visando diminuir a recorrência e facilitar o monitoramento futuro da Tireoglobulina."},{"id":"b","text":"Ao uso de laser para evaporar o nódulo."},{"id":"c","text":"Ao tratamento exclusivo com iodo na dieta por 30 anos."},{"id":"d","text":"À lavagem cerebral por radiação ionizante."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'O objetivo da ablação após a cirurgia é ''zerar'' a produção de TG proveniente de células normais residuais. Uma vez que não sobra nenhuma célula tireoidiana no corpo, qualquer valor de TG detectado no futuro indicará tumor remanescente/recorrente.', '{"a":"Correta. Conceito terapêutico básico da oncologia radiometabólica.","b":"Incorreta. Ablação térmica por rádio frequência é diferente da ablação radiometabólica por I-131.","c":"Incorreta. Seria o oposto do tratamento radioterápico clínico metabólico planejado.","d":"Incorreta. Absurdo.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'lqk5vh', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Radioiodo","Ablação","Câncer de Tireoide","Metabolismo"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-lqk5vh', 'approved', 146)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q148 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ckmfc8', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal indicação clínica de dosagem de Tireoglobulina (TG) é:', '[{"id":"a","text":"O monitoramento de recorrência tumoral em pacientes já submetidos a tireoidectomia total por câncer diferenciado de tireoide."},{"id":"b","text":"O diagnóstico inicial de câncer de tireoide em nódulos palpáveis."},{"id":"c","text":"Triagem para hipotireoidismo em gestantes."},{"id":"d","text":"Acompanhamento de gastrite crônica atrófica."},{"id":"e","text":"Verificação do nível de mercúrio no sangue profundo."}]', 'a', 
        'A TG nunca deve ser usada como ferramenta diagnóstica inicial em pacientes com glândula íntegra, pois bócios benignos e tireoidites elevam absurdamente seu nível. No entanto, em pacientes sem tireoide (pós-cirurgia radical), ela se torna o marcador tumoral de excelência.', '{"a":"Correta. Função clínica primordial e exclusiva do marcador oncológico.","b":"Incorreta. Possui baixíssima especificidade no paciente não operado.","c":"Incorreta. Usa-se TSH/T4 livre.","d":"Incorreta. Marcador gástrico (Pepsinogênio/Gastrina).","e":"Incorreta. Inexistente tecnicamente."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ckmfc8', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoglobulina","Marcador Tumoral","Oncologia","Monitoramento"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ckmfc8', 'approved', 147)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q149 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-zg5k5h', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual medicação é utilizada para proteger a tireoide de indivíduos saudáveis de forma preventiva em cenários de acidentes nucleares com liberação de Iodo radioativo ambiental?', '[{"id":"a","text":"Iodeto de Potássio (KI) em doses elevadas (pastilhas de iodo estável)."},{"id":"b","text":"Levotiroxina em altas doses."},{"id":"c","text":"Vitamina de complexo B completa."},{"id":"d","text":"Xarope de guaco melado."},{"id":"e","text":"Bicarbonato de sódio tópico na garganta."}]', 'a', 
        'O iodo estável bloqueia competitivamente a entrada de iodo radioativo na tireoide (saturação do NIS e Wolff-Chaikoff temporário). Isso evita que o rádio-isótopo perigoso se acumule na glândula das crianças e adultos, reduzindo severamente o risco futuro de carcinoma radio-induzido.', '{"a":"Correta. Protocolo internacional de defesa civil e saúde pública.","b":"Incorreta. Não bloqueia o transportador de iodo de forma tão rápida e eficaz quanto o próprio iodo saturado.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Fitoterápico expectorante sem nexo rádio-protetor.","e":"Incorreta. Sem nexo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'zg5k5h', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Acidente Nuclear","Radioproteção","Iodeto de Potássio","Segurança"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-zg5k5h', 'approved', 148)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q150 (Part 6)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-hkhmaw', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de um sopro audível à ausculta sobre a glândula tireóide e a palpação de um frêmito (thrill) em um bócio difuso são sinais clínicos virtuais de:', '[{"id":"a","text":"Doença de Graves (devido ao hiperfluxo sanguíneo patológico secundário à neoangiogênese imune)."},{"id":"b","text":"Carcinoma Medular calcificado."},{"id":"c","text":"Hipotireoidismo severo de longa data por iodo baixo."},{"id":"d","text":"Infecção por micobactérias na traqueia."},{"id":"e","text":"Compressão da artéria aorta retro-esofágica."}]', 'a', 
        'A intensa estimulação da glândula pelo TRAb induz um aumento dramático na vascularização tireoidiana (visto ao Doppler como ''hell''s fire''). Esse fluxo turbulento gera sopros e frêmitos que são característicos do hipertireoidismo autoimune de Graves severo.', '{"a":"Correta. Semiologia cardiovascular dedicada à glândula hiperativa.","b":"Incorreta. O tumor é sólido e endurecido, raramente gerando sopro auditivo distal.","c":"Incorreta. A glândula hipoativa tem fluxo reduzido.","d":"Incorreta. Sem relação.","e":"Incorreta. Sem relação anatômica direta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hkhmaw', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Graves","Semiologia","Sopro Tireoidiano","Vascularização"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-hkhmaw', 'approved', 149)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q151 (Part 7)
    
END c:UserskayquDesktopQrub1QRub;