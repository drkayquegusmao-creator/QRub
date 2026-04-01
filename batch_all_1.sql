DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-u0c1t4', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um homem de 33 anos, com diagnóstico de Tuberculose Pulmonar bacilífera, iniciou o esquema RIPE há 10 dias. Ele retorna à Unidade Básica de Saúde queixando-se de náuseas leves e anorexia matinal, mas nega vômitos, icterícia ou dor abdominal. Ao exame físico: anictérico, eupneico e sem visceromegalias. Foram solicitados exames admissionais que mostram: TGO = 85 U/L (VR: < 40), TGP = 90 U/L (VR: < 40) e Bilirrubinas Totais = 0,9 mg/dL. Qual a conduta mais adequada perante este quadro de possível hepatotoxicidade inicial?', '[{"id":"a","text":"Manter o esquema RIPE inalterado, realizar orientações dietéticas e repetir os exames de função hepática em 15 dias para monitoramento."},{"id":"b","text":"Suspender imediatamente a Rifampicina e a Isoniazida e iniciar esquema alternativo com Etambutol e Estreptomicina."},{"id":"c","text":"Internar o paciente para biópsia hepática imediata devido ao risco de insuficiência hepática fulminante."},{"id":"d","text":"Apenas suspender a Pirazinamida, por ser o fármaco mais hepatotóxico das quatro drogas."},{"id":"e","text":"Dobrar a dose de Isoniazida para acelerar a cura e reduzir o tempo de exposição hepática."}]', 'a', 
        'A elevação assintomática das transaminases (até 3 ou 5 vezes o valor de referência, dependendo da presença ou não de sintomas) é comum no início do esquema RIPE e não exige a suspensão dos fármacos. Como o paciente tem elevação leve (cerca de 2 vezes o VR) e sintomas gastrointestinais muito discretos (sem icterícia ou dor), a conduta correta é a observação clínica próxima e repetição dos exames em duas semanas. A suspensão só é mandatória se: 1) Transaminases > 3x VR com sintomas; 2) Transaminases > 5x VR mesmo assintomático ou 3) Icterícia clínica.', '{"a":"Correta. Reflete o critério de segurança para manutenção do tratamento primário.","b":"Incorreta. A suspensão precoce sem critérios laboratoriais/clínicos suficientes prejudica o tratamento da TB.","c":"Incorreta. Não há sinais de gravidez ou insuficiência hepática que justifiquem medida invasiva.","d":"Incorreta. Embora a Pirazinamida seja hepatotóxica, não se retira apenas uma droga do esquema fixo (4 em 1) sem necessidade absoluta.","e":"Incorreta. Dobrar a dose aumentaria drasticamente o risco de necrose hepática por metabólitos da isoniazida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'u0c1t4', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Hepatotoxicidade","Efeitos Adversos","Manejo Clínico","Infectologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-u0c1t4', 'approved', 30)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q32 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-p5llbb', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre o diagnóstico da Tuberculose Pleural, analise as afirmativas abaixo e assinale a alternativa que contém a sequência correta de verdadeiro (V) ou falso (F):

( ) O líquido pleural na TB é tipicamente um exsudato, com predominância de polimorfonucleares na fase crônica.
( ) A dosagem de Adenosina Deaminase (ADA) possui alto valor preditivo negativo; se < 40 U/L, a chance de ser TB pleural é muito baixa.
( ) A biópsia pleural por agulha (ex: agulha de Cope) tem maior sensibilidade diagnóstica que a baciloscopia direta do líquido pleural.
( ) A presença de células mesoteliais em grande quantidade (> 5%) no líquido pleural reforça o diagnóstico de tuberculose.', '[{"id":"a","text":"V, V, F, F"},{"id":"b","text":"F, V, V, F"},{"id":"c","text":"F, F, V, V"},{"id":"d","text":"V, F, V, F"},{"id":"e","text":"F, V, F, V"}]', 'b', 
        'Análise das sentenças: 1) Falso: O líquido é exsudato, mas a predominância é linfocítica (não polimorfonuclear); 2) Verdadeiro: O ADA é excelente para exclusão (VPN alto); 3) Verdadeiro: A biópsia pleural pleural atinge 70-80% de sensibilidade (vê granulomas/caseum), enquanto a baciloscopia do líquido é raramente positiva (< 5-10%); 4) Falso: A tuberculose pleural causa uma reação fibrinosa que ''bloqueia'' o mesotélio, sendo característica a escassez ou ausência de células mesoteliais.', '{"a":"Incorreta. Falha no perfil celular e na biópsia.","b":"Correta. Sequência exata baseada nos critérios de Light e histopatologia da TB.","c":"Incorreta. Falha no ADA e na biópsia.","d":"Incorreta. Falha generalizada em imunoliquidologia.","e":"Incorreta. Falha na correlação biópsia x mesotélio."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'p5llbb', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Pleural","Líquido Pleural","ADA","Biópsia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-p5llbb', 'approved', 31)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q33 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-v59aj0', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 19 anos, hígido, realiza exame admissional e apresenta PPD de 18 mm. O RX de tórax é normal e o paciente é completamente assintomático. Informa que foi vacinado com BCG ao nascer (possui cicatriz). De acordo com as normas de 2024 do Ministério da Saúde, qual a abordagem correta para este caso?', '[{"id":"a","text":"Diagnosticar Infecção Latente por Tuberculose (ILTB) e indicar Tratamento Preventivo (TPTB) com Rifampicina (4 meses) ou Isoniazida (6-9 meses)."},{"id":"b","text":"Considerar PPD falso-positivo pela vacinação com BCG na infância e liberar para o trabalho sem intervenção."},{"id":"c","text":"Realizar teste de escarro induzido para confirmar baciloscopia positiva oculta."},{"id":"d","text":"Indicar repetição da vacina BCG para reforçar a imunidade, já que o PPD está alto."},{"id":"e","text":"Solicitar tomografia de tórax de alta resolução; se normal, descartar qualquer infecção."}]', 'a', 
        'Um PPD ≥ 5 mm (ou ≥ 10 mm em alguns contextos, mas no Brasil adota-se o corte de 5 mm para contatos e grupos de risco) em indivíduo assintomático com RX normal define Infecção Latente. A cicatriz de BCG feita ao nascer não justifica um PPD de 18 mm aos 19 anos (o efeito da vacina no teste costuma desaparecer nos primeiros anos de vida). Por ser jovem e ter teste claramente positivo, há benefício em tratar a ILTB para reduzir o risco de adoecimento futuro.', '{"a":"Correta. Conduta preventiva padrão para ILTB.","b":"Incorreta. Atribuir um PPD de 18 mm apenas à BCG neonatal é um erro comum que negligencia a infecção real.","c":"Incorreta. Se o RX é normal e o paciente é assintomático, não há indicação de pesquisa de bacilo em escarro (não é doença ativa).","d":"Incorreta. Não se faz reforço de BCG em adultos, muito menos com PPD positivo.","e":"Incorreta. A TC é desnecessária se o RX for de boa qualidade e normal, pois o diagnóstico latente é imunobiológico, não de imagem."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'v59aj0', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["ILTB","BCG","Epidemiologia","Saúde Ocupacional"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-v59aj0', 'approved', 32)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q34 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-719vjl', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente em tratamento para Tuberculose Pulmonar apresenta, subitamente, piora da acuidade visual bilateral, informando que as cores parecem ''desbotadas'' (especialmente o verde e o vermelho). Ao exame oftalmológico, nota-se neurite óptica retrobulbar. Qual droga do esquema RIPE deve ser suspensa imediatamente e qual a conduta para este efeito adverso?', '[{"id":"a","text":"Etambutol; suspender a droga definitivamente."},{"id":"b","text":"Isoniazida; suspender e substituir por Rifabutina."},{"id":"c","text":"Rifampicina; manter a droga e usar colírio de corticoide."},{"id":"d","text":"Pirazinamida; ajustar a dose para o peso ideal."},{"id":"e","text":"O quadro não está relacionado às drogas da TB; investigar glaucoma agudo."}]', 'a', 
        'A neurite óptica (com alteração na percepção de cores e perda de campo visual central) é o efeito colateral mais grave e característico do Etambutol. Frequentemente é dose-dependente e ocorre mais em pacientes com falha renal. Uma vez diagnosticada a toxicidade ocular, o fármaco deve ser suspenso de forma definitiva para evitar a cegueira irreversível.', '{"a":"Correta. Reconhecimento imediato do efeito tóxico clássico do Etambutol.","b":"Incorreta. A Isoniazida causa neuropatia periférica e psicose, raramente neurite óptica isolada.","c":"Incorreta. A Rifampicina não atinge o nervo óptico desta maneira.","d":"Incorreta. A Pirazinamida atinge o fígado e o metabolismo do ácido úrico.","e":"Incorreta. É um efeito adverso medicamentoso bem documentado no tratamento da TB."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '719vjl', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Etambutol","Toxicidade Ocular","Farmacovigilância"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-719vjl', 'approved', 33)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q35 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-2816rg', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Durante uma investigação de surto de Tuberculose em uma prisão, um detento apresenta tosse há 2 semanas. Realizado Teste Rápido Molecular (TRM-TB) que resultou: ''Detectado M. tuberculosis - Baixa Carga - Resistência à Rifampicina Detectada''. O serviço de saúde local decide realizar a cultura e o Teste de Sensibilidade Genotípico por Sonda (LPA) para investigar resistência de segunda linha. O LPA demonstrou resistência adicional ao Levofloxacino e Moxifloxacino. Qual a classificação correta desta cepa de tuberculose?', '[{"id":"a","text":"Tuberculose com resistência estendida (Pre-XDR)."},{"id":"b","text":"Tuberculose Multirresistente (TB-MDR)."},{"id":"c","text":"Tuberculose Extremamente Resistente (XDR-TB)."},{"id":"d","text":"Tuberculose com resistência monodroga (TB-MR)."},{"id":"e","text":"Tuberculose sensível atípica."}]', 'a', 
        'Definições da OMS/Ministério da Saúde: 1) TB-RR: Resistente apenas à rifampicina; 2) TB-MDR: Resistente a Rifampicina E Isoniazida; 3) Pre-XDR: Resistente a Rifampicina E a qualquer Fluoroquinolona (Levofloxacino/Moxifloxacino); 4) XDR: Resistente a Rifampicina, Fluoroquinolonas E pelo menos uma droga de grupo A (Bedaquilina ou Linezolida). No caso, a resistência à Rifampicina + Fluoroquinolona caracteriza a Pre-XDR.', '{"a":"Correta. Reflete a nova nomenclatura para cepas com resistência a quinolonas.","b":"Incorreta. TB-MDR é a base para as outras resistências, mas o termo Pre-XDR é mais específico para este caso.","c":"Incorreta. Para ser XDR, precisaria de resistência a Bedaquilina ou Linezolida.","d":"Incorreta. Houve resistência a pelo menos duas classes (Rifa + Quinolona).","e":"Incorreta. Não existe este termo para resistências detectadas."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '2816rg', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Resistência Bacteriana","Pre-XDR","Infectologia","Sistema Prisional"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-2816rg', 'approved', 34)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q36 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-vyrvg7', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente portador de Hepatite C crônica com cirrose Child-Pugh B é diagnosticado com Tuberculose Pulmonar. Perante o alto risco de falência hepática com o esquema RIPE convencional, qual a recomendação de esquema terapêutico alternativo com menor carga hepatotóxica?', '[{"id":"a","text":"Esquema sem Pirazinamida: Rifampicina + Isoniazida + Etambutol por 9 meses."},{"id":"b","text":"Esquema com substituição de todas as drogas por Estreptomicina e Amicacina."},{"id":"c","text":"Tratamento apenas com Levofloxacino por 18 meses."},{"id":"d","text":"Manter o RIPE e associar Silimarina para proteção hepatocitária."},{"id":"e","text":"Aguardar o tratamento da Hepatite C antes de iniciar o da Tuberculose."}]', 'a', 
        'A Pirazinamida é a droga mais hepatotóxica do esquema RIPE e a primeira a ser retirada em hepatopatas graves. O esquema 2 RIE / 7 RI (9 meses de duração total) é a alternativa preferencial para cirróticos Child B ou C, pois exclui a pirazinamida mas mantém a Rifampicina e Isoniazida, garantindo alta taxa de cura.', '{"a":"Correta. Manejo de hepatopatas graves na TB.","b":"Incorreta. Esquemas puramente injetáveis são tóxicos e menos eficazes que o RIE.","c":"Incorreta. Monoterapia com quinolona gera resistência rápida.","d":"Incorreta. A Silimarina não anula a toxicidade direta da pirazinamida no parênquima cirrótico.","e":"Incorreta. A tuberculose é uma doença aguda e infectocontagiosa que exige tratamento imediato."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'vyrvg7', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Cirrose","Hepatotoxicidade","Esquemas Especiais","Child-Pugh"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-vyrvg7', 'approved', 35)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q37 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-2ke2ho', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um escolar de 8 anos apresenta emagrecimento, febre diária não aferida há 1 mês e tosse seca persistente. O contato intradomiciliar é o tio, que trata TB pulmonar bacilífera. O RX de tórax da criança mostra ''alargamento do mediastino por linfonodomegalia hilar direita''. O PPD é de 12 mm. De acordo com o sistema de escore para diagnóstico de TB na infância (Ministério da Saúde), qual a pontuação aproximada e a conduta sugerida?', '[{"id":"a","text":"40 pontos ou mais (Diagnóstico muito provável); iniciar tratamento com esquema RIPE (doses pediátricas)."},{"id":"b","text":"10 pontos (Diagnóstico pouco provável); realizar broncoscopia para biópsia."},{"id":"c","text":"25 pontos (Diagnóstico possível); colher 3 amostras de escarro induzido para confirmar."},{"id":"d","text":"0 pontos; o tio é que deve ser investigado, não a criança."},{"id":"e","text":"30 pontos (Diagnóstico provável); realizar TC de crânio antes de tratar."}]', 'a', 
        'O sistema de escore considera: 1) Quadro clínico (febre/tosse/perda de peso) = 15 pontos; 2) RX de tórax com linfonodomegalia (imagem sugestiva) = 15 pontos; 3) Contato com adulto bacilífero = 10 pontos; 4) PPD positivo = 10 a 15 pontos. No caso, a criança soma > 40 pontos. Pelo protocolo, em crianças com > 40 pontos, o diagnóstico é MUITO PROVÁVEL e o tratamento pode ser iniciado sem necessidade de confirmação bacteriológica (difícil na infância).', '{"a":"Correta. Aplicação prática do escore de diagnóstico infantil.","b":"Incorreta. Subestima gravemente os achados clínicos e epidemiológicos.","c":"Incorreta. Embora o escarro possa ser colhido, não se deve retardar o tratamento com esta pontuação.","d":"Incorreta. A criança é sintomática e tem critérios claros de infecção/doença.","e":"Incorreta. A TC de crânio não tem indicação clínica neste quadro puramente pulmonar/mediastinal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '2ke2ho', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Infantil","Escore de Diagnóstico","Pediatria","Saúde da Família"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-2ke2ho', 'approved', 36)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q38 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-oho5cz', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre a Tuberculose Miliar, assinale a alternativa que descreve corretamente o padrão radiológico típico e o mecanismo fisiopatológico principal.', '[{"id":"a","text":"Micronódulos difusos (1-3 mm) distribuídos uniformemente em ambos os pulmões; reflexo de disseminação hematogênica massiva do bacilo."},{"id":"b","text":"Grandes cavitações em ápices pulmonares; reflexo de hipersensibilidade tardia exuberante."},{"id":"c","text":"Consolidação lobar com broncograma aéreo; reflexo de disseminação broncogênica."},{"id":"d","text":"Derrame pleural bilateral e massivo; reflexo de insuficiência cardíaca direita associada à TB."},{"id":"e","text":"Fibrose pulmonar extensa em campos médios; reflexo de cura espontânea sem tratamento."}]', 'a', 
        'A TB miliar recebe esse nome pela semelhança das lesões com sementes de milho (millet). Ocorre quando um foco caseoso se rompe para dentro de um vaso sanguíneo, espalhando milhões de bacilos pela circulação sistêmica. O resultado são milhões de pequenos granulomas (micronódulos) que se depositam nos pulmões e outros órgãos (fígado, baço, medula óssea). É uma forma grave e potencialmente fatal.', '{"a":"Correta. Definição clássica radiológica e patogênica da forma miliar.","b":"Incorreta. Cavitações são típicas da forma pós-primária localizada.","c":"Incorreta. Padrão de consolidação é de pneumonia comum; a TB pode causar, mas não é o padrão ''miliar''.","d":"Incorreta. Embora o derrame possa ocorrer, os micronódulos são o achado definidor.","e":"Incorreta. A TB miliar não cura espontaneamente; evolui para óbito se não tratada."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'oho5cz', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Miliar","Radiologia","Fisiopatologia","Infectologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-oho5cz', 'approved', 37)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q39 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-kg2tvd', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 42 anos apresenta quadro clínico de tosse crônica e hemoptise. O teste rápido molecular (TRM-TB) detecta M. tuberculosis sensível à rifampicina. No entanto, após 3 meses de tratamento com o esquema RIPE e boa adesão (TDO), o paciente mantém febre diária e a baciloscopia de escarro continua persistentemente positiva (2+). Qual a melhor conduta perante a suspeita de falência terapêutica?', '[{"id":"a","text":"Encaminhar para centro de referência, solicitar cultura com teste de sensibilidade genotípico/fenotípico e iniciar esquema especial para TB multirresistente."},{"id":"b","text":"Apenas repetir o esquema RIPE do zero, pois ele deve ter cuspido os remédios."},{"id":"c","text":"Aumentar a duração do tratamento para 12 meses, mantendo as mesmas drogas."},{"id":"d","text":"Indicar lobectomia pulmonar para retirada do foco persistente."},{"id":"e","text":"Trocar apenas a Rifampicina por Rifabutina."}]', 'a', 
        'A manutenção da positividade da baciloscopia no 3º ou 4º mês de tratamento adequado define FALÊNCIA TERAPÊUTICA. Isso geralmente indica que o bacilo é resistente às drogas do esquema primário ou que há um problema imunológico/absortivo severo. A conduta é a investigação de resistência em rede de referência e mudança para esquemas robustos para resistência (ex: TB-MDR).', '{"a":"Correta. Protocolo de manejo de falha ao esquema primário.","b":"Incorreta. Repetir o mesmo esquema que já falhou é promover mais resistência.","c":"Incorreta. Se o bacilo é resistente, o tempo de exposição não resolverá a infecção.","d":"Incorreta. A cirurgia é reservada para sequelas ou complicações localizadas, não para tratamento de falha primária sem antes ajustar as drogas.","e":"Incorreta. Trocar uma droga por outra da mesma classe não resolve a multirresistência."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'kg2tvd', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Falência Terapêutica","Resistência","Manejo Clínico"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-kg2tvd', 'approved', 38)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q40 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-6ji6nd', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um homem de 35 anos apresenta Tuberculose Ganglionar cervical (escrofulose). Foi iniciada medicação e, após 15 dias, os linfonodos que eram endurecidos tornaram-se flutuantes e drenaram espontaneamente material caseoso. O paciente desesperado procura o médico achando que a doença piorou. Qual a explicação e conduta correta?', '[{"id":"a","text":"Trata-se da evolução natural da TB ganglionar (coliquação); deve-se manter o esquema RIPE e realizar curativos locais."},{"id":"b","text":"Isso indica resistência bacteriana; trocar o tratamento para o esquema de resistência."},{"id":"c","text":"O paciente desenvolveu uma superinfecção bacteriana por Staphylococcus; adicionar Vancomicina venosa."},{"id":"d","text":"É uma reação alérgica à Pirazinamida; suspender todas as drogas."},{"id":"e","text":"Indicação cirúrgica imediata de esvaziamento cervical radical."}]', 'a', 
        'A TB ganglionar cursa com inflamação que pode evoluir para a necrose de liquefação (coliquação). O linfonodo ''amolece'' e pode drenar por fístulas na pele (escrofulodermia). Isso não significa obrigatoriamente falha do tratamento, mas sim o processo de expulsão do material necrótico. O tratamento medicamentoso deve continuar exatamente como está.', '{"a":"Correta. Evolução clínica clássica da forma ganglionar.","b":"Incorreta. A drenagem de caseum é um fenómeno físico do granuloma, não sinal de resistência biológica.","c":"Incorreta. Embora a infecção secundária possa ocorrer, a saída de material amarelado/esbranquiçado sem odor fétido ou inflamação aguda severa sugere caseum da TB.","d":"Incorreta. Não há padrão de hipersensibilidade cutânea sugerido.","e":"Incorreta. A cirurgia radical não é o tratamento primário para linfonodos tuberculosos coliquados."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '6ji6nd', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Ganglionar","Escrofulose","Caseum","Infectologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-6ji6nd', 'approved', 39)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q41 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-wf7r13', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual o achado tomográfico clássico que sugere a presença de disseminação broncogênica da tuberculose em um pulmão previamente cavitado?', '[{"id":"a","text":"Padrão de ''árvore em brotamento'' (tree-in-bud)."},{"id":"b","text":"Vidro fosco difuso e homogêneo."},{"id":"c","text":"Placas pleurais calcificadas."},{"id":"d","text":"Padrão de ''pavimentação maluca'' (crazy paving)."},{"id":"e","text":"Sinal do ''halo invertido''."}]', 'a', 
        'O sinal de ''árvore em brotamento'' na Tomografia de Alta Resolução representa o preenchimento de bronquíolos terminais por material mucoide, pus ou inflamação. Na TB, quando uma caverna drena seu conteúdo rico em bacilos para os brônquios, esse material ''escorre'' e entope os bronquíolos distais, criando esse aspecto de pequenos ramos com brotos na ponta, indicativo de atividade de doença e disseminação local.', '{"a":"Correta. Sinal radiológico clássico de disseminação broncogênica.","b":"Incorreta. Vidro fosco é inespecífico e sugere edema ou inflamação alveolar leve.","c":"Incorreta. Placas pleurais sugerem exposição ao asbesto.","d":"Incorreta. Pavimentação maluca sugere proteinose alveolar ou certas pneumonias virais (ex: COVID-19).","e":"Incorreta. Halo invertido é mais associado à pneumonia em organização ou paracoccidioidomicose."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'wf7r13', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tomografia","Árvore em Brotamento","Radiologia","Pneumologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-wf7r13', 'approved', 40)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q42 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-j96xuh', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre o manejo da Tuberculose no Sistema Prisional brasileiro, é fundamental o rastreio sistemático de sintomas. Qual o critério de ''sintomático respiratório'' adotado especificamente para as populações privadas de liberdade e por que é diferente da população geral?', '[{"id":"a","text":"Presença de tosse por qualquer tempo (independentemente da duração); devido ao alto risco de transmissão em ambientes confinados."},{"id":"b","text":"Tosse por mais de 3 semanas; conforme padrão da OMS para países tropicais."},{"id":"c","text":"Tosse acompanhada obrigatoriamente de febre > 39°C."},{"id":"d","text":"Apenas aqueles que apresentam hemoptise franca."},{"id":"e","text":"Não há rastreio de tosse, apenas realização de RX de tórax anual para todos."}]', 'a', 
        'Em populações de alto risco e confinamento (como prisioneiros e moradores de rua), o critério de ''3 semanas de tosse'' é considerado muito tardio. Para evitar surtos massivos, qualquer pessoa que relate tosse (por qualquer tempo) deve ser considerada suspeita e investigada com TRM-TB ou baciloscopia imediatamente.', '{"a":"Correta. Estratégia de busca ativa agressiva em grupos vulneráveis.","b":"Incorreta. Este é o critério para a população geral sem fatores de risco conhecidos.","c":"Incorreta. A febre não é necessária para iniciar a investigação.","d":"Incorreta. Hemoptise é sinal tardio; o objetivo é pegar casos precoces.","e":"Incorreta. O rastreio clínico é a base do programa de controle prisional."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'j96xuh', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Saúde Prisional","Sintomático Respiratório","Vigilância","Epidemiologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-j96xuh', 'approved', 41)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q43 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-dmamwj', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 25 anos, em tratamento para TB pulmonar há 1 mês, desenvolve quadro de icterícia (3+/4+), dor em hipocôndrio direito e vômitos persistentes. Transaminases: TGO = 550 U/L, TGP = 610 U/L. De acordo com o protocolo do Ministério da Saúde para hepatotoxicidade grave, qual a conduta imediata em relação ao esquema RIPE?', '[{"id":"a","text":"Suspender todas as drogas (R-I-P-E) imediatamente e aguardar a normalização dos sintomas e das enzimas (até queda < 2x VR) antes de reintroduzir."},{"id":"b","text":"Suspender apenas a Pirazinamida e manter as demais."},{"id":"c","text":"Trocar por esquema injetável com Estreptomicina e Gentamicina imediatamente."},{"id":"d","text":"Reduzir as doses pela metade até o paciente melhorar da cor amarelada."},{"id":"e","text":"Manter o tratamento e prescrever corticoide sistêmico para reduzir a inflamação hepática."}]', 'a', 
        'Icterícia e transaminases > 10x o valor de referência (ou > 5x com sintomas) configuram hepatite medicamentosa grave. A primeira medida é interromper TODO o tratamento (STOP RIPE). Após a melhora clínica e laboratorial evidente, as drogas serão reintroduzidas uma a uma, em ordem específica (Geralmente R -> I -> P ou esquemas alternativos se a toxicidade persistir).', '{"a":"Correta. Regra de ouro na segurança do tratamento da TB.","b":"Incorreta. Na vigência de icterícia, não se arrisca manter nenhuma droga hepatotóxica (R e I também são).","c":"Incorreta. Não se inicia tratamento de resistência no meio de uma hepatite medicamentosa aguda sem necessidade absoluta.","d":"Incorreta. Subdose mantém a agressão hepática e gera resistência bacteriana.","e":"Incorreta. Corticoides não tratam a causa (as drogas) e podem mascarar a gravidade da lesão."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'dmamwj', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Hepatotoxicidade","Icterícia","Manejo de Crise","Infectologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-dmamwj', 'approved', 42)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q44 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-qlalw2', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 50 anos, ex-tabagista, trata TB há 4 meses e apresenta imagem cavitária residual estável em lobo superior direito. Ele queixa-se de episódios recorrentes de hemoptise leve. A tomografia mostra uma ''massa arredondada móvel conforme decúbito'' dentro da antiga cavidade da TB, com o sinal do ''crescente aéreo'' (Monod sign). Qual o diagnóstico provável?', '[{"id":"a","text":"Aspergiloma (Bola fúngica)."},{"id":"b","text":"Reativação da Tuberculose."},{"id":"c","text":"Abscesso pulmonar piogênico."},{"id":"d","text":"Carcinoma broncogênico escamoso."},{"id":"e","text":"Infarto pulmonar por TEP."}]', 'a', 
        'Cavidades antigas da tuberculose são locais ideais para a colonização por fungos do gênero Aspergillus. O fungo cresce formando uma massa de hifas e debris (bola fúngica) que fica solta dentro da cavidade. O sinal característico é o crescente de ar ao redor da massa arredondada. Clinicamente, a hemoptise recorrente é o sintoma cardinal, causada pela erosão mecânica dos vasos da parede da cavidade pela massa fúngica.', '{"a":"Correta. Complicação cavitária clássica da TB sequelar.","b":"Incorreta. Reativação causaria novos infiltrados e sintomas sistêmicos (febre/sudorese).","c":"Incorreta. Abscesso causa nível hidroaéreo e febre alta.","d":"Incorreta. Câncer de pulmão pode cavitar, mas a ''bola móvel'' é muito típica do fungo.","e":"Incorreta. TEP não costuma se manifestar como massa móvel intracavitária."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'qlalw2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Aspergiloma","Sequela de TB","Radiologia","Pneumologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-qlalw2', 'approved', 43)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q45 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-xn4yth', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre a Tuberculose Genitourinária, qual o achado clássico no exame de urina (EAS/Tipo 1) que levanta a suspeita diagnóstica mesmo antes da cultura?', '[{"id":"a","text":"Piúria estéril (presença de leucócitos na urina com cultura bacteriana convencional negativa)."},{"id":"b","text":"Hematúria macroscópica com cilindros hemáticos."},{"id":"c","text":"Glicosúria maciça sem hiperglicemia."},{"id":"d","text":"Cristais de oxalato de cálcio em grande quantidade."},{"id":"e","text":"Proteinúria nefrótica (> 3,5 g/dia)."}]', 'a', 
        'A presença sistemática de leucócitos na urina (pus) em um paciente com sintomas urinários crônicos (polaciúria, disúria), mas cujas culturas de urina para bactérias comuns (como E. coli) são sempre negativas, é chamada de ''piúria estéril''. Isso sugere que o agente causador é um germe que não cresce em meios comuns, sendo o M. tuberculosis a principal hipótese clínica a ser investigada com culturas em meio de Lowenstein-Jensen.', '{"a":"Correta. Signo clássico de TB urinária.","b":"Incorreta. Sugere glomerulonefrite, não infecção por micobactéria.","c":"Incorreta. Sugere síndrome de Fanconi ou diabetes, sem relação com TB.","d":"Incorreta. Associado a cálculos renais (litíase).","e":"Incorreta. Padrão de doença glomerular primária."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'xn4yth', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Genitourinária","Piúria Estéril","Urologia","Nefrologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-xn4yth', 'approved', 44)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q46 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-n2tarc', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a duração padrão do tratamento para Tuberculose do Sistema Nervoso Central (Meningoencefalite) e da Tuberculose Osteoarticular no Brasil?', '[{"id":"a","text":"12 meses; com uso associado de corticoide nos primeiros meses de tratamento da meningite."},{"id":"b","text":"6 meses; igual ao tratamento da forma pulmonar."},{"id":"c","text":"18 meses; devido à baixa penetração das drogas na barreira hematoencefálica."},{"id":"d","text":"24 meses; conforme protocolo de TB multirresistente."},{"id":"e","text":"9 meses; sem necessidade de corticoides."}]', 'a', 
        'Diferente da forma pulmonar (6 meses), as formas osteoarticular e de SNC exigem um tratamento prolongado de 12 meses (2 meses de RIPE + 10 meses de RI). Na meningite tuberculosa, o uso de corticoides (prednisona ou dexametasona) nas primeiras 4 a 8 semanas é fundamental para reduzir a resposta inflamatória no espaço subaracnóideo, prevenindo sequelas como hidrocefalia e vasculites cerebrais.', '{"a":"Correta. Duração e adjuvância preconizadas para formas graves/extrapulmonares selecionadas.","b":"Incorreta. 6 meses é tempo insuficiente para estas localizações específicas.","c":"Incorreta. 18 meses é excessivo para o esquema sensível.","d":"Incorreta. 24 meses não é o padrão para casos sensíveis.","e":"Incorreta. O corticoide é viga mestra na meningite TB para melhorar o prognóstico neurológico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'n2tarc', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Meningite TB","Terapêutica","Corticosteroides","Neurologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-n2tarc', 'approved', 45)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q47 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-15hkv6', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre a imunologia da Tuberculose, o Teste de Liberação de Interferon-gama (IGRA) tem se tornado mais comum. Qual a principal vantagem do IGRA em relação ao teste cutâneo de PPD?', '[{"id":"a","text":"O IGRA não apresenta falso-positivo em pessoas vacinadas com BCG, pois utiliza antígenos específicos (ESAT-6 e CFP-10) que não estão presentes na cepa da vacina."},{"id":"b","text":"O IGRA é um teste de baixo custo que pode ser feito em qualquer farmácia."},{"id":"c","text":"O IGRA consegue diferenciar com clareza se a doença é latente ou se é ativa."},{"id":"d","text":"O IGRA não exige coleta de sangue, sendo feito através da saliva."},{"id":"e","text":"O IGRA é positivo apenas em pacientes com imunodepressão grave (HIV/AIDS)."}]', 'a', 
        'O IGRA é um teste ''in vitro'' que mede a resposta das células T ao M. tuberculosis. Ao contrário do PPD, que usa um ''pool'' de proteínas (PPD - Purified Protein Derivative) comuns a muitas micobactérias e à vacina BCG, o IGRA usa apenas proteínas específicas do bacilo selvagem. Portanto, um IGRA positivo indica infecção real, sem a interferência diagnóstica da vacinação prévia, o que é muito útil em países com alta cobertura vacinal como o Brasil.', '{"a":"Correta. Versa sobre a especificidade superior do IGRA.","b":"Incorreta. O IGRA é um teste caro e exige laboratório especializado com tecnologia de ensaio ELISA.","c":"Incorreta. Nem o PPD nem o IGRA conseguem diferenciar infecção latente de doença ativa; ambos indicam apenas que o corpo ''conhece'' o bacilo.","d":"Incorreta. O IGRA é feito em sangue total colhido por venopunção.","e":"Incorreta. O IGRA, assim como o PPD, pode ter sensibilidade reduzida em imunodeprimidos graves pela falta de resposta das células T."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '15hkv6', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["IGRA","PPD","Diagnóstico Imunológico","BCG"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-15hkv6', 'approved', 46)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q48 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        '', '[{"id":"a","text":"A presença de S. aureus não exclui a possibilidade de coinfecção com TB, especialmente em pacientes vulneráveis; deve-se considerar a realização de TRM-TB e biópsia das lesões se o quadro não regredir com antibióticos comuns."},{"id":"b","text":"Estafilococos e M. tuberculosis não coexistem no mesmo paciente devido à competição por substratos."},{"id":"c","text":"Toda lesão cavitária no pulmão é obrigatoriamente TB até que se prove o contrário."},{"id":"d","text":"O TRM-TB não deve ser feito em quem tem diagnóstico de bacteremia estafilocócica por risco de resultados falso-positivos por ''reação cruzada de capsídeos''."},{"id":"e","text":"A cavitação de êmbolos sépticos é patognomônica de tuberculose miliar."}]', 'a', 
        'O raciocínio clínico deve estar aberto a coinfecções ou diagnósticos diferenciais. Embora o foco agora seja a endocardite/êmbolos sépticos por S. aureus, a Tuberculose é endêmica e pode coexistir. O erro comum é parar a investigação ao encontrar o primeiro patógeno, negligenciando a TB em grupos de altíssimo risco (como usuários de drogas).', '{"a":"Correta. Demonstra prudência diagnóstica e consciência epidemiológica.","b":"Incorreta. Não existe tal exclusão biológica competitiva.","c":"Incorreta. Muitas doenças causam cavitação: fungos, câncer, abscessos piogênicos, êmbolos sépticos, granulomatose de Wegener, etc.","d":"Incorreta. O TRM-TB é baseado em PCR (DNA), não tem reação cruzada com bactérias Gram-positivas como S. aureus.","e":"Incorreta. TB miliar tipicamente NÃO causa macro-cavitações, mas sim micronódulos compactos."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Diagnóstico Diferencial","Êmbolos Sépticos","Co-infecção"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-', 'approved', 47)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q49 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-nuq4qk', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a principal causa de resistência a múltiplas drogas (TB-MDR) no contexto do sistema de saúde?', '[{"id":"a","text":"Uso irregular da medicação pelo paciente ou prescrição inadequada de doses/tempos pelos profissionais (tratamento inadequado)."},{"id":"b","text":"Mutação espontânea do bacilo causada pela poluição atmosférica."},{"id":"c","text":"Transmissão exclusiva por animais domésticos infectados."},{"id":"d","text":"Falta de vacinação com BCG em adultos."},{"id":"e","text":"Ingestão excessiva de laticínios não pasteurizados."}]', 'a', 
        'A resistência é um fenômeno de seleção natural induzido pelo homem. Quando o paciente toma o remédio de forma intermitente (alguns dias sim, outros não), os níveis da droga no sangue caem abaixo da dose letal. Isso mata os bacilos sensíveis, mas permite que os bacilos com mutações naturais de resistência sobrevivam e se proliferem, tornando o tratamento convencional ineficaz.', '{"a":"Correta. A falha de adesão é o motor da crise de multirresistência global.","b":"Incorreta. Poluição não tem relação genética com a mutação do M. tuberculosis.","c":"Incorreta. A TB humana (por M. tuberculosis) é transmitida de pessoa para pessoa por via aérea.","d":"Incorreta. A BCG previne formas graves na infância, mas não tem relação direta com a prevenção de resistência de cepas em adultos.","e":"Incorreta. Isso descreve a transmissão da TB bovina (M. bovis), que é rara e não é a causa da crise de MDR."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'nuq4qk', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Resistência","Antropogenia","Saúde Pública","Adesão"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-nuq4qk', 'approved', 48)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q50 (Part 3)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-7tzrus', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'No contexto da pandemia de HIV, a Tuberculose tornou-se a principal causa de óbito evitável. Sobre o ''rastreio da TB em indivíduos vivendo com HIV'', qual a ferramenta recomendada para diagnóstico em pacientes gravemente doentes e internados, mesmo que não consigam produzir escarro?', '[{"id":"a","text":"Teste de antígeno lipoarabinomanana na urina (LF-LAM)."},{"id":"b","text":"Baciloscopia de secreção lacrimar."},{"id":"c","text":"Níveis de proteína C reativa ultrassensível."},{"id":"d","text":"Biópsia de medula óssea para todos os pacientes com HIV."},{"id":"e","text":"Aguardar a produção espontânea de escarro, independente do tempo."}]', 'a', 
        'O LF-LAM é um teste rápido feito na URINA que detecta um componente da parede celular do bacilo da TB (o lipoarabinomanano). Ele é indicado especificamente para pacientes com HIV avançado (CD4 < 200 ou muito doentes), pois nestes casos a carga bacilar é alta e o bacilo ''vaza'' para a urina. É uma ferramenta vital para diagnóstico rápido à beira do leito em pacientes que não conseguem fornecer amostras respiratórias.', '{"a":"Correta. Tecnologia inovadora incorporada para redução da mortalidade TB-HIV.","b":"Incorreta. Não existe baciloscopia de lágrima como método diagnóstico padronizado.","c":"Incorreta. A PCR é inespecífica e indica inflamação, não confirmando TB.","d":"Incorreta. Seria uma medida invasiva desproporcional como rastreio inicial msm em HIV.","e":"Incorreta. Retardar o diagnóstico em TB-HIV é fatal; deve-se usar métodos alternativos (induções, urina, biópsias de linfonodos) imediatamente."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '7tzrus', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["LF-LAM","TB-HIV","Diagnóstico Rápido","Tecnologia em Saúde"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-7tzrus', 'approved', 49)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q51 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-miuykp', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 38 anos, em tratamento regular para tuberculose pulmonar há 3 meses (término da fase de ataque), apresenta melhora clínica significativa e baciloscopias negativas no 1º e 2º meses. No entanto, o exame do 3º mês resultou em: ''Baciloscopia de Escarro: Positiva (1+)''. O paciente nega tosse ou febre. Qual o fenômeno imunológico que pode explicar este achado em um paciente que vinha em melhora progressiva?', '[{"id":"a","text":"Eliminação de bacilos mortos (bacilos persistentes não viáveis), o que não caracteriza necessariamente falência do tratamento."},{"id":"b","text":"Resistência secundária adquirida à Pirazinamida puramente motivada pelo estresse metabólico."},{"id":"c","text":"Erro laboratorial mandatório, pois é impossível ter baciloscopia positiva após 2 negativas."},{"id":"d","text":"Aparecimento de uma nova caverna pulmonar causada pelo ''efeito paradoxal'' das vitaminas do complexo B."},{"id":"e","text":"Infecção por micobactéria não tuberculosa (MNT) oportunista pela cura da TB primária."}]', 'a', 
        'Em alguns pacientes, conforme as cavidades pulmonares ''limpam'' e se consolidam, pode haver a expulsão ocasional de restos celulares e bacilos mortos (ou fragmentos de DNA) que são detectados pela baciloscopia (coloração de Ziehl-Neelsen) ou TRM-TB. Se o paciente está clinicamente bem e as culturas forem negativas, esse achado isolado não deve ser interpretado como falha. No entanto, exige monitoramento rigoroso e repetição do exame.', '{"a":"Correta. Fenômeno de ''clareamento'' cavitário.","b":"Incorreta. A resistência secundária não se manifesta clinicamente como ''melhora total''.","c":"Incorreta. Embora o erro possa ocorrer, há uma base biológica para este achado.","d":"Incorreta. Não existe tal efeito paradoxal descrito com vitaminas.","e":"Incorreta. MNTs não ''substituem'' a TB desta forma e não seriam a primeira hipótese."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'miuykp', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Fisiopatologia","Monitoramento","Baciloscopia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-miuykp', 'approved', 50)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q52 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ra50i6', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A Tuberculose Pericárdica é uma das formas mais graves de tuberculose extrapulmonar. Qual a complicação crônica mais temida desta condição e qual medicamento, se usado precocemente, pode reduzir sua incidência?', '[{"id":"a","text":"Pericardite Constritiva; uso de Prednisona (corticosteroides)."},{"id":"b","text":"Tamponamento cardíaco agudo; uso de Digoxina."},{"id":"c","text":"Infarto agudo do miocárdio; uso de Aspirina."},{"id":"d","text":"Prolapso de valva mitral; uso de Penicilina benzatina."},{"id":"e","text":"Fibrilação atrial paroxística; uso de Varfarina."}]', 'a', 
        'A inflamação crônica causada pelo M. tuberculosis no pericárdio leva à deposição de fibrina, espessamento e posterior calcificação das camadas pericárdicas. Isso resulta em pericardite constritiva (o ''coração em couraça''), que impede o enchimento diastólico. O uso de corticoides (Prednisona) associado ao esquema RIPE ajuda a modular a resposta inflamatória e reduzir a formação de cicatrizes fibróticas, diminuindo o risco de constrição.', '{"a":"Correta. Complicação e prevenção clássica na TB cardíaca.","b":"Incorreta. O tamponamento é uma complicação aguda (efusiva), não crônica (fibrosa).","c":"Incorreta. A TB não atinge as coronárias desta maneira direta.","d":"Incorreta. Isso descreve sequelas de febre reumática.","e":"Incorreta. Arritmias podem ocorrer, mas a constrição é a sequela estrutural viga mestra da doença."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ra50i6', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Pericárdica","Cardiologia","Corticosteroides","Prevenção"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ra50i6', 'approved', 51)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q53 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-5zngsm', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Uma enfermeira de 28 anos, gestante (18 semanas), foi exposta a um paciente com tuberculose pulmonar bacilífera. Ela nunca teve TB e sua PPD de admissão (há 1 ano) era 0 mm. Realizado novo PPD agora que resultou 15 mm. RX de tórax normal e assintomática. Qual a melhor conduta para a gestante?', '[{"id":"a","text":"Iniciar o Tratamento Preventivo da TB (TPTB) com Isoniazida ou Rifampicina imediatamente; a gestação NÃO é contraindicação para o tratamento de infecção latente."},{"id":"b","text":"Aguardar o término da gestação e do aleitamento para tratar a ILTB."},{"id":"c","text":"Interromper a gestação por risco de teratogenicidade dos fármacos da TB."},{"id":"d","text":"Indicar apenas vitamina B6 (Piridoxina) sem os antibióticos, pois o corpo grávido se protege sozinho."},{"id":"e","text":"Realizar abortamento terapêutico imediato, pois a mãe transmitirá a TB latente via placenta."}]', 'a', 
        'Gestantes têm o mesmo risco de adoecimento por TB que a população geral e, se adoecerem, a doença pode ser grave para o feto (baixo peso, prematuridade). A conversão tuberculínica recente indica infecção aguda. As drogas usadas no TPTB (Isoniazida e Rifampicina) são seguras na gestação. Portanto, o tratamento deve ser iniciado com suplementação obrigatória de Piridoxina (B6) para prevenir neuropatia na mãe e no feto.', '{"a":"Correta. Protocolo de ILTB em Gestantes atualizado.","b":"Incorreta. O adiamento aumenta o risco de a gestante adoecer durante o período de maior vulnerabilidade (puerpério).","c":"Incorreta. As drogas de primeira linha são categoria B/C e amplamente usadas com segurança.","d":"Incorreta. A vitamina previne efeitos colaterais, mas não trata o bacilo.","e":"Incorreta. A TB latente não ultrapassa a placenta e não existe indicação de interrupção de gravidez por TB."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '5zngsm', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Gestação","ILTB","Infectologia","Saúde da Mulher"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-5zngsm', 'approved', 52)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q54 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-3i7tdv', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente está tratando TB há 15 dias e apresenta prurido generalizado e manchas vermelhas (exantema morbiliforme) sem febre ou sinais de gravidade (sinal de Nikolsky negativo). Qual o manejo escalonado correto sugerido pelo Ministério da Saúde para reações cutâneas leves/moderadas?', '[{"id":"a","text":"Suspender todas as drogas até a regressão do exantema e, após, reintroduzir uma a uma começando pela Rifampicina (fármaco com menor chance de causar alergia grave)."},{"id":"b","text":"Manter o tratamento e prescrever apenas hidratante corporal."},{"id":"c","text":"Suspender apenas a Isoniazida e manter o restante do tratamento por 1 ano."},{"id":"d","text":"Trocar por Estreptomicina injetável para o resto da vida."},{"id":"e","text":"Internar o paciente e realizar plasmaférese de urgência."}]', 'a', 
        'Em casos de farmacodermia leve a moderada, o protocolo é: 1) Suspender todas as drogas (R-I-P-E); 2) Aguardar o desaparecimento das lesões; 3) Reintroduzir as drogas sequencialmente para identificar o culpado: Rifampicina (3-7 dias de teste), Isoniazida (3-7 dias), Etambutol (3-7 dias) e, por último, a Pirazinamida (frequente culpada por alergias). Se a reação for grave (ex: Stevens-Johnson), as drogas não devem ser reintroduzidas.', '{"a":"Correta. Protocolo de reintrodução sequencial padrão.","b":"Incorreta. Se houver alergia sistêmica, manter a droga pode levar à anafilaxia ou reações bolhosas graves.","c":"Incorreta. Não se retira uma droga sem saber se ela é a causa.","d":"Incorreta. A conduta é desproporcional e a estreptomicina também pode causar alergia.","e":"Incorreta. Medidas de suporte são suficientes para casos leves após suspensão da droga."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '3i7tdv', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Farmacodermia","Alergia","Manejo","Enfermagem"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-3i7tdv', 'approved', 53)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q55 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-o9qak9', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A Tuberculose de Orofaringe e Laringe é considerada uma das formas mais contagiosas da doença. Qual o sintoma cardinal da tuberculose laríngea que deve alertar o clínico para o diagnóstico em um paciente com tosse crônica?', '[{"id":"a","text":"Disfonia (rouquidão) progressiva e dolorosa."},{"id":"b","text":"Perda total da audição bilateral súbita."},{"id":"c","text":"Aumentos de volume das glândulas parótidas (Sialonose)."},{"id":"d","text":"Gengivorragia maciça espontânea."},{"id":"e","text":"Odinofagia profunda que impede a deglutição de sólidos apenas."}]', 'a', 
        'A TB laríngea é quase sempre secundária à TB pulmonar (os bacilos expectorados ''banham'' as cordas vocais). O sintoma mais comum é a rouquidão (disfonia) e a dor ao falar/deglutir (odinofagia laríngea). Devido à alta carga bacilar e à aerolização pela fala, esses pacientes são extremamente bacilíferos, exigindo isolamento respiratório rigoroso.', '{"a":"Correta. Sintoma guia para TB de vias aéreas superiores.","b":"Incorreta. Associado a otite média por TB ou ototoxicidade de drogas.","c":"Incorreta. Sialonose é comum em parotidite viral ou sarcoidose.","d":"Incorreta. A gengivite por TB é rara e não se manifesta tipicamente por hemorragia maciça isolada.","e":"Incorreta. A dor costuma ser tanto para sólidos quanto para líquidos e a disfonia é o marco principal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'o9qak9', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Otorrinolaringologia","Disfonia","Contagiosidade","Higiene"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-o9qak9', 'approved', 54)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q56 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-733e2h', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um detento de 45 anos iniciou tratamento para TB com esquema RIPE. Após 3 meses, ele é transferido para o regime semiaberto e deixa de comparecer ao posto de saúde. Por quanto tempo de interrupção contínua um paciente deve ser considerado como tendo ''abandonado'' o tratamento no programa de controle da tuberculose?', '[{"id":"a","text":"30 dias ou mais após a data prevista para o retorno."},{"id":"b","text":"7 dias corridos após a falta à consulta."},{"id":"c","text":"6 meses, correspondendo a um curso completo."},{"id":"d","text":"Apenas se ele formalizar por escrito que não quer mais tomar os remédios."},{"id":"e","text":"24 horas de atraso na dose do Tratamento Diretamente Observado (TDO)."}]', 'a', 
        'Definição de Abandono (Ministério da Saúde): Considera-se abandono o caso em que o paciente, após iniciar o tratamento, deixa de comparecer à unidade de saúde (ou de receber a medicação no TDO) por 30 dias consecutivos ou mais. O abandono é um dos maiores desafios para a cura do paciente e para a saúde coletiva (risco de resistência).', '{"a":"Correta. Definição epidemiológica operacional.","b":"Incorreta. 7 dias é considerado falta; busca ativa deve ser iniciada, mas ainda não é ''abandono'' oficial no sistema.","c":"Incorreta. Seria tempo demais para esperar antes de tomar uma medida de vigilância.","d":"Incorreta. A maioria dos abandonos é silenciosa e sem justificativa formal.","e":"Incorreta. Seria impossível gerir o programa com um critério de 24h para abandono."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '733e2h', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Vigilância","Abandono","Fluxo","Gestão"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-733e2h', 'approved', 55)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q57 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-oois8q', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A Tuberculose Miliar pode evoluir com Síndrome do Desconforto Respiratório Agudo (SDRA) e falência de múltiplos órgãos. Qual o exame complementar que frequentemente demonstra a gravidade da disseminação hematogênica na medula óssea desses pacientes?', '[{"id":"a","text":"Mielograma ou Biópsia de medula óssea, evidenciando granulomas caseosos."},{"id":"b","text":"Dosagem de Vitamina B12 sérica."},{"id":"c","text":"Conteúdo de ferritina no líquor."},{"id":"d","text":"Avaliação de fragilidade osmótica eritrocitária."},{"id":"e","text":"Cintilografia óssea com tecnécio."}]', 'a', 
        'A TB miliar atinge órgãos ricos em filtros reticuloendoteliais, sendo a medula óssea um dos principais alvos. A biópsia de medula é extremamente útil em casos de febre de origem indeterminada, podendo demonstrar os granulomas típicos (caséolo) e permitir o isolamento do bacilo antes mesmo dos exames de escarro (que podem ser negativos na forma puramente hematogênica).', '{"a":"Correta. Método diagnóstico para TB disseminada.","b":"Incorreta. A B12 avalia anemias carenciais, sem relação específica diagnóstica com a TB.","c":"Incorreta. A ferritina é marcador inflamatório sérico e não faz parte do rastreio de TB no líquor.","d":"Incorreta. Usado na investigação de esferocitose hereditária.","e":"Incorreta. A cintilografia detecta áreas de hipermetabolismo ósseo, mas não diferencia TB de metástases ou infecções piogênicas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'oois8q', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Miliar","Medula Óssea","Hematologia","Biópsia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-oois8q', 'approved', 56)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q58 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-nawa1f', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 58 anos, morador de área rural, apresenta febre, perda de peso e o RX de tórax com cavitação em ápice pulmonar. Ele relata o costume de ''pastar'' ou mastigar gravetos e capim. Além de Tuberculose, qual o principal diagnóstico diferencial desta síndrome cavitária, considerando a exposição e a localização geográfica?', '[{"id":"a","text":"Paracoccidioidomicose (Micose Sul-Americana)."},{"id":"b","text":"Asbestos pulmonar pela poeira da estrada."},{"id":"c","text":"Histoplasmose epidêmica (doença das cavernas)."},{"id":"d","text":"Sarcoidose estádio IV."},{"id":"e","text":"Silicose aguda por moagem de grãos."}]', 'a', 
        'A Paracoccidioidomicose (PCM) é frequentemente confundida com a Tuberculose. Ambas atingem o parênquima pulmonar com infiltrados e cavitações, causam sintomas constitucionais (febre/emagrecimento) e linfonodomegalias. O hábito de mastigar vegetais (onde o fungo reside no solo) é um dado epidemiológico clássico. O diagnóstico diferencial é fundamental, pois o tratamento da PCM envolve sulfonamidas ou derivados imidazólicos (ex: Itraconazol), enquanto o da TB envolve antibióticos específicos.', '{"a":"Correta. Principal diagnóstico diferencial micológico da TB no Brasil.","b":"Incorreta. Causa fibrose em bases, sem síndrome febril aguda/subaguda típica.","c":"Incorreta. Associada a fezes de morcegos em cavernas/galinheiros.","d":"Incorreta. Doença granulomatosa sistêmica idiopática; menos provável com histórico rural e hábito mastigatório.","e":"Incorreta. Exposição à sílica envolve mineração ou jateamento de areia."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nawa1f', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["PCM","Diagnóstico Diferencial","Infectologia","Brasil"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-nawa1f', 'approved', 57)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q59 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-5b9mkh', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a orientação correta quanto ao tempo de isolamento respiratório (precaução para aerossóis) para um paciente com Tuberculose Pulmonar sensível que está sob tratamento adequado com o esquema RIPE e apresenta boa adesão?', '[{"id":"a","text":"Geralmente 15 dias após o início do tratamento efetivo, desde que haja melhora clínica, pois a carga bacilar na via aérea cai drasticamente neste período."},{"id":"b","text":"Até que o tratamento complete 6 meses."},{"id":"c","text":"O isolamento não é necessário em nenhum momento, apenas o uso de máscara cirúrgica pelo médico."},{"id":"d","text":"Até que o PPD (teste cutâneo) negative."},{"id":"e","text":"Vitalício para contato com crianças e idosos."}]', 'a', 
        'Após 14 a 15 dias de tratamento correto com Rifampicina (altamente bactericida), a maioria dos pacientes com TB sensível deixa de ser infectante, pois os bacilos remanescentes na via aérea estão inviabilizados para transmissão. No entanto, se houver suspeita de resistência ou o paciente estiver em ambiente hospitalar crítico, o isolamento deve ser mantido até a negativação definitiva das baciloscopias.', '{"a":"Correta. Critério operacional de desisolamento ambulatorial/hospitalar.","b":"Incorreta. Seria inviável manter o isolamento por 6 meses para todos os pacientes.","c":"Incorreta. A transmissibilidade no início (fase pré-tratamento) é real e perigosa.","d":"Incorreta. O PPD raramente negativa e não serve para monitorar transmissibilidade ou cura.","e":"Incorreta. O contagio cessa com o tratamento resolutivo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '5b9mkh', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Biossegurança","Isolamento","Transmissibilidade","Epidemiologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-5b9mkh', 'approved', 58)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q60 (Part 4)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ldxp8x', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 40 anos, com TB pulmonar, apresenta quadro de tonturas, náuseas e dificuldades na marcha (desequilíbrio). Ao exame físico, nota-se nistagmo horizontal e alteração no teste de Romberg. Qual fármaco, tipicamente usado em esquemas de segunda linha ou retratamento, é o principal suspeito deste efeito ototóxico vestibular?', '[{"id":"a","text":"Estreptomicina (ou outros aminoglicosídeos)."},{"id":"b","text":"Levofloxacino."},{"id":"c","text":"Bedaquilina."},{"id":"d","text":"Linezolida."},{"id":"e","text":"Clofazimina."}]', 'a', 
        'A Estreptomicina é um aminoglicosídeo injetável que tem como principal toxicidade a lesão do VIII par craniano (nervo vestibulococlear). Pode causar tanto perda auditiva (toxicidade coclear) quanto tontura/vertigem (toxicidade vestibular). O idoso e o renal crônico são mais susceptíveis. Por isso, as drogas injetáveis foram retiradas da primeira linha de tratamento.', '{"a":"Correta. Efeito adverso clássico do grupo dos aminoglicosídeos.","b":"Incorreta. Causa rotura de tendões e distúrbios do SNC (insônia/tremores), não ototoxicidade direta.","c":"Incorreta. Aumenta o intervalo QT no ECG.","d":"Incorreta. Causa neurite óptica e plaquetopenia periférica.","e":"Incorreta. Causa pigmentação acastanhada da pele."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ldxp8x', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Ototoxicidade","Estreptomicina","Efeitos Adversos","Auditivo"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ldxp8x', 'approved', 59)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q61 (Part 4)
    
END c:UserskayquDesktopQrub1QRub;