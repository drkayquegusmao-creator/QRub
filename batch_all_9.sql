DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-u8vd55', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O Xpert MTB/XDR detecta resistência a quais classes de drogas secundárias simultaneamente?', '[{"id":"a","text":"Fluoroquinolonas, Injetáveis de 2ª linha, Isoniazida e Etionamida."},{"id":"b","text":"Mata o bacilo sela túrcica pálido profundo pálida profunda."},{"id":"c","text":"Cura total pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Apenas iodo sela túrcica pálido profundo pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Ampliação do perfil de resistência molecular sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Detecta genes gyrA/B, rrs, inhA.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"Nenhuma acima."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'u8vd55', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Xpert XDR","Resistência","Molecular"],"batch":53}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-u8vd55', 'approved', 270)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q272 (Part 53)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-y2f45h', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A vacina BCG (bacilo de Calmette-Guérin) possui maior eficácia protetora contra quais formas de TB?', '[{"id":"a","text":"Tuberculose miliar e meníngea na infância."},{"id":"b","text":"Mata o pulmão sela túrcica pálido profundo pálida profunda."},{"id":"c","text":"Cura total pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Apenas iodo sela túrcica pálido profundo pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Eficácia contra disseminação hematogênica sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Proteção clássica para formas graves.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'y2f45h', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["BCG","Prevenção","Imunização"],"batch":53}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-y2f45h', 'approved', 271)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q273 (Part 53)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ndeiqn', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A dose padrão diária de Pretomanid no esquema BPaL para adultos é de?', '[{"id":"a","text":"200 mg."},{"id":"b","text":"600 sela túrcica pálido profundo pálida profunda."},{"id":"c","text":"Cura total pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Apenas iodo sela túrcica pálido profundo pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Dose terapêutica fixa no protocolo BPaL/BPaLM sela túrcica pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Dose de 200mg uma vez ao dia.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ndeiqn', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Pretomanid","BPaL","Dose"],"batch":53}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ndeiqn', 'approved', 272)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q274 (Part 54)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-lvyd1s', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre o manejo da coinfecção TB/HIV, qual o momento ideal para o início da Terapia Antirretroviral (TARV) em pacientes com CD4 < 50 cel/mm³?', '[{"id":"a","text":"Dentro das primeiras 2 semanas de tratamento da TB."},{"id":"b","text":"Após 8 semanas de tratamento da TB."},{"id":"c","text":"Somente após a cura da TB."},{"id":"d","text":"Imediatamente no mesmo dia do diagnóstico de TB."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Em pacientes graves (CD4 < 50), o início precoce reduz mortalidade, apesar do risco de IRIS.', '{"a":"Correta. Regra do MS para coinfecção grave.","b":"Incorreta. Atraso aumenta mortalidade.","c":"Incorreta. Risco de óbito por AIDS.","d":"Incorreta. Deve-se aguardar tolerância inicial ao RIPE.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'lvyd1s', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["HIV","TARV","Coinfecção"],"batch":54}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-lvyd1s', 'approved', 273)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q275 (Part 54)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-gxbfzm', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual o efeito adverso mais clássico do Etambutol?', '[{"id":"a","text":"Neurite óptica (perda de acuidade e discromatopsia)."},{"id":"b","text":"Surdez neurossensorial."},{"id":"c","text":"Insuficiência renal aguda."},{"id":"d","text":"Artralgia por hiperuricemia."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O etambutol é tóxico ao nervo óptico, exigindo monitoramento oftalmológico.', '{"a":"Correta. Principal toxicidade.","b":"Incorreta. Típico da Estreptomicina.","c":"Incorreta.","d":"Incorreta. Típico da Pirazinamida.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'gxbfzm', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Etambutol","Toxicidade","Oftalmologia"],"batch":54}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-gxbfzm', 'approved', 274)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q276 (Part 54)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-h2teyh', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A anemia sideroblástica induzida pela Isoniazida decorre de qual deficiência vitamínica?', '[{"id":"a","text":"Piridoxina (B6)."},{"id":"b","text":"Cianocobalamina (B12)."},{"id":"c","text":"Ácido Fólico."},{"id":"d","text":"Tiamina (B1)."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A isoniazida interfere no metabolismo da B6, essencial para a síntese do heme.', '{"a":"Correta. Suplementação obrigatória em gestantes e etilistas.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'h2teyh', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Isoniazida","Vitamina B6","Anemia"],"batch":54}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-h2teyh', 'approved', 275)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q277 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-xoz1ed', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A hiperuricemia assintomática é um efeito colateral comum de qual droga do esquema RIPE?', '[{"id":"a","text":"Pirazinamida."},{"id":"b","text":"Rifampicina."},{"id":"c","text":"Isoniazida."},{"id":"d","text":"Etambutol."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A pirazinamida compete com a excreção renal de urato. Gota é raro, mas hiperuricemia no laboratório é comum.', '{"a":"Correta. Marco da pirazinamida.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'xoz1ed', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Pirazinamida","Uracilemia","Gota"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-xoz1ed', 'approved', 276)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q278 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-puopuv', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual o regime de escolha para Tuberculose Meníngea no Brasil?', '[{"id":"a","text":"2 RIPE + 10 RI + Corticoide (4-8 semanas)."},{"id":"b","text":"2 RIPE + 4 RI."},{"id":"c","text":"6 RIPE isolado."},{"id":"d","text":"Regime BPaL de 6 meses."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Tratamento prolongado (1 ano total) e corticoterapia obrigatória para reduzir mortalidade.', '{"a":"Correta. Protocolo oficial do MS.","b":"Incorreta. Tempo insuficiente.","c":"Incorreta.","d":"Incorreta. BPaL é para resistência.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'puopuv', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Neurotuberculose","Meningite","Corticoides"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-puopuv', 'approved', 277)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q279 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-mqpdfk', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O suor e urina alaranjados são efeitos colaterais inofensivos de qual droga?', '[{"id":"a","text":"Rifampicina."},{"id":"b","text":"Isoniazida."},{"id":"c","text":"Pirazinamida."},{"id":"d","text":"Etambutol."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A rifampicina é um corante por si só, tingindo secreções corporais sem prejuízo clínico.', '{"a":"Correta. Orientação essencial ao paciente.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'mqpdfk', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Rifampicina","Orientação","Urina"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-mqpdfk', 'approved', 278)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q280 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-3jgl1g', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual o achado de fundo de olho sugestivo de Tuberculose Miliar?', '[{"id":"a","text":"Tubérculos de coroide (nódulos amarelados)."},{"id":"b","text":"Retinopatia hipertensiva."},{"id":"c","text":"Manchas de Roth."},{"id":"d","text":"Flocos de neve (snowballs)."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A disseminação hematogênica (miliar) pode ser visualizada na coroide como pequenos nódulos amarelados.', '{"a":"Correta. Marcador de doença sistêmica.","b":"Incorreta.","c":"Incorreta. Típico de endocardite.","d":"Incorreta. Típico de sarcoidose ocular.","e":"No sela túrcica."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '3jgl1g', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tuberculose Miliar","Exame Físico","Oftalmologia"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-3jgl1g', 'approved', 279)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q281 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-7pqt8f', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ascite na Tuberculose Peritoneal costuma apresentar qual característica bioquímica?', '[{"id":"a","text":"Exsudato com GASA < 1,1 g/dL e predomínio linfocítico."},{"id":"b","text":"Transudato com GASA > 1,1 g/dL."},{"id":"c","text":"Liquido leitoso com triglicerídeos > 200 mg/dL."},{"id":"d","text":"Predomínio de neutrófilos e ADA baixo."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Pelo processo inflamatório peritoneal, o GASA (SAAG) é baixo e os linfócitos predominam.', '{"a":"Correta. Perfil exsudativo típico.","b":"Incorreta. Típico de cirrose/ICC.","c":"Incorreta. Ascite quilosa (raro na TB).","d":"Incorreta. Neutrófilos sugerem PBE bacteriana.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '7pqt8f', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tuberculose Peritoneal","Ascite","GASA"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-7pqt8f', 'approved', 280)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q282 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-d57t3e', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual o critério laboratorial de cura da Tuberculose Pulmonar pelo MS?', '[{"id":"a","text":"Duas baciloscopias negativas, sendo uma no último mês."},{"id":"b","text":"Apenas o término do tratamento cursa com cura matemática."},{"id":"c","text":"Cultura negativa no 6º mês obrigatoriamente."},{"id":"d","text":"Melhora radiológica completa sem necessidade de exames."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A negativação do escarro no final do tratamento define a cura laboratorial.', '{"a":"Correta. Protocolo de seguimento.","b":"Incorreta. O critério puramente matemático ignora a adesão.","c":"Incorreta. Cultura não é obrigatória para cura se tiver baciloscopia.","d":"Incorreta. Ruídos radiológicos duram anos.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'd57t3e', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Cura","Manejo","Seguimento"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-d57t3e', 'approved', 281)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q283 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-q7f180', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual mycobacteria causa granulomas em aquário e é associada a lesões cutâneas em membros superiores?', '[{"id":"a","text":"M. marinum."},{"id":"b","text":"M. ulcerans."},{"id":"c","text":"M. abscessus."},{"id":"d","text":"M. kansasii."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'M. marinum é típica de ambiente aquático, causando lesões granulomatosas em pescadores ou tratadores de aquários.', '{"a":"Correta. Patógeno oportunista clássico.","b":"Incorreta. Causa úlcera de Buruli.","c":"Incorreta. Típica de abscessos após procedimentos.","d":"Incorreta. Simula TB pulmonar.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'q7f180', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["M. marinum","Aquário","Micobacteriose"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-q7f180', 'approved', 282)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q284 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-qo7jje', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O regime ''Short Course'' da OMS (DOTS) foca em qual pilar de gestão da saúde pública?', '[{"id":"a","text":"Tratamento diretamente observado (TDO) para garantir adesão."},{"id":"b","text":"Distribuição gratuita de remédios pela internet."},{"id":"c","text":"Apenas o diagnóstico rápido molecular."},{"id":"d","text":"Internação compulsória de todos os casos."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O pilar do DOTS é a supervisão da tomada da medicação por profissional de saúde.', '{"a":"Correta. Alma do programa de controle.","b":"Incorreta. Medicamento é via UBS.","c":"Incorreta. É parte, mas não o pilar principal.","d":"Incorreta. O tratamento é ambulatorial.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'qo7jje', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["DOTS","TDO","Saúde Pública"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-qo7jje', 'approved', 283)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q285 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-dd5m6u', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A reação de Herxheimer é frequentemente confundida com qual evento na Tuberculose?', '[{"id":"a","text":"Síndrome de Reconstituição Imune (IRIS)."},{"id":"b","text":"Choque séptico."},{"id":"c","text":"Falha terapêutica por resistência."},{"id":"d","text":"Anafilaxia à Rifampicina."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A piora paradóxica (IRIS) após início de tratamento (especialmente no HIV) simula progressão da doença.', '{"a":"Correta. Evolução paradoxal.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'dd5m6u', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["IRIS","Manejo","HIV"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-dd5m6u', 'approved', 284)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q286 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-fpdd0d', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente com Tuberculose e DM descompensado necessita de qual ajuste no manejo?', '[{"id":"a","text":"Monitoramento rigoroso da glicemia (risco de falha terapêutica se mal controlado)."},{"id":"b","text":"Redução da dose de Rifampicina."},{"id":"c","text":"Suspensão total do RIPE até normalizar glicemia."},{"id":"d","text":"Uso de metformina é contraindicado formalmente."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O diabetes triplica o risco de TB e piora o prognóstico, exigindo controle glicêmico estrito para cura.', '{"a":"Correta. Sinergia negativa TB/DM.","b":"Incorreta. Dose padrão necessária.","c":"Incorreta. O atraso agrava ambos os quadros.","d":"Incorreta.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'fpdd0d', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Diabetes","Manejo","Adesão"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-fpdd0d', 'approved', 285)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q287 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-h43ceu', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual teste molecular avalia resistência a drogas de segunda linha no Complexo M. tuberculosis?', '[{"id":"a","text":"Xpert MTB/XDR."},{"id":"b","text":"TRM-TB convencional."},{"id":"c","text":"Reação de Mantoux."},{"id":"d","text":"IGRA (QuantiFERON)."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O Xpert XDR detecta mutações para quinolonas e injetáveis simultaneamente.', '{"a":"Correta. Evolução diagnóstica recente.","b":"Incorreta. Só vê rifampicina.","c":"Incorreta. Vê latência.","d":"Incorreta. Vê infecção, não resistência.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'h43ceu', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Xpert XDR","Resistência","Diagnóstico"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-h43ceu', 'approved', 286)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q288 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-75ck6m', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A hepatotoxicidade por Isoniazida costuma ocorrer em qual período do tratamento?', '[{"id":"a","text":"Nas primeiras 4 a 8 semanas."},{"id":"b","text":"Somente após 6 meses."},{"id":"c","text":"Apenas no primeiro dia."},{"id":"d","text":"Após o término da rifampicina."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A toxicidade aguda/subaguda hepática é mais precoce, exigindo monitoramento de transaminases inicial.', '{"a":"Correta. Período crítico de adaptação.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '75ck6m', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Hepatotoxicidade","Transaminases","Segurança"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-75ck6m', 'approved', 287)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q289 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-9h3dh2', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a principal via de contágio da Tuberculose?', '[{"id":"a","text":"Inalação de aerossóis de gotículas (gotículas de Wells)."},{"id":"b","text":"Contato com sangue contaminado."},{"id":"c","text":"Via sexual."},{"id":"d","text":"Fezes-oral por alimentos mal lavados."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A transmissão requer a inalação de partículas suspensas no ar (núcleos secos).', '{"a":"Correta. Modelo clássico de transmissão aérea.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '9h3dh2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Transmissão","Gotículas","Epidemiologia"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-9h3dh2', 'approved', 288)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q290 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-v6a6px', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O Complexo Gohn na radiografia de tórax indica:', '[{"id":"a","text":"Foco primário pulmonar calcificado + linfonodo satélite."},{"id":"b","text":"Cavitação em ápice pulmonar ativa."},{"id":"c","text":"Derrame pleural loculado."},{"id":"d","text":"Pneumotorax hipertensivo."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O foco de Gohn é a cicatriz da infecção primária controlada pelo organismo.', '{"a":"Correta. Evolução da TB primária.","b":"Incorreta. Isto é TB pós-primária.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'v6a6px', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Radiologia","Foco de Gohn","TB Primária"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-v6a6px', 'approved', 289)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q291 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-jegr3', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A prova tuberculínica (Mantoux) deve ser lida após quanto tempo?', '[{"id":"a","text":"48 a 72 horas."},{"id":"b","text":"10 a 20 minutos."},{"id":"c","text":"7 dias corridos."},{"id":"d","text":"Apenas 1 hora depois."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'É uma reação de hipersensibilidade tardia (Tipo IV), exigindo tempo para infiltração celular.', '{"a":"Correta. Janela oficial de leitura.","b":"Incorreta. Tempo de teste alérgico tipo I.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'jegr3', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["PPD","Mantoux","Diagnóstico"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-jegr3', 'approved', 290)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q292 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-lzudwh', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A rifampicina atua inibindo qual componente bacteriano?', '[{"id":"a","text":"RNA polimerase dependente de DNA."},{"id":"b","text":"Parede celular (ácidos micólicos)."},{"id":"c","text":"Subunidade ribossômica 30S."},{"id":"d","text":"DNA girase."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Mecanismo central que bloqueia a transcrição bacteriana.', '{"a":"Correta. Mecanismo de ação molecular.","b":"Incorreta. Alvo da Isoniazida.","c":"Incorreta. Alvo dos aminoglicosídeos.","d":"Incorreta. Alvo das quinolonas.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'lzudwh', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Farmacologia","Rifampicina","Mecanismo"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-lzudwh', 'approved', 291)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q293 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-bg15e2', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O teste IGRA diferencia infecção latente de vacinação por BCG?', '[{"id":"a","text":"Sim, pois usa antígenos exclusivos (ESAT-6 e CFP-10) ausentes na BCG."},{"id":"b","text":"Não, ambos dão positivo."},{"id":"c","text":"Apenas se o paciente tiver Hipertensão."},{"id":"d","text":"Somente em crianças menores de 1 ano."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Diferencial fundamental: ao contrário do PPD, o IGRA não sofre interferência da vacina prévia.', '{"a":"Correta. Vantagem tecnológica do IGRA.","b":"Incorreta. Esta é a limitação do PPD.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'bg15e2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["IGRA","BCG","Diagnóstico"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-bg15e2', 'approved', 292)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q294 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-c6q6an', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a conduta para contatos de TB com PPD inicial de 3 mm e sem sintomas?', '[{"id":"a","text":"Repetir PPD em 8 semanas para avaliar viragem tuberculínica."},{"id":"b","text":"Tratar ILTB imediatamente."},{"id":"c","text":"Isolamento social por 14 dias."},{"id":"d","text":"Dar alta definitiva sem exames."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A resposta imune pode levar tempo para se manifestar; a viragem (> 10mm de aumento) indica infecção recente.', '{"a":"Correta. Janela imunológica da TB.","b":"Incorreta. Seria tratar antes da confirmação.","c":"Incorreta. Só se aplica a casos ativos bacilíferos.","d":"Incorreta. Ignora o risco de latência tardia.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'c6q6an', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Manejo","Contatos","ILTB"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-c6q6an', 'approved', 293)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q295 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ud0ak7', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a dose padrão de Rifampicina por kg de peso no esquema adulto?', '[{"id":"a","text":"10 mg/kg."},{"id":"b","text":"5 mg/kg."},{"id":"c","text":"25 mg/kg."},{"id":"d","text":"50 mg/kg."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Dose posológica padrão para eficácia máxima com baixa toxicidade.', '{"a":"Correta. Padrão MS.","b":"Incorreta. Dose da Isoniazida.","c":"Incorreta. Dose da Pirazinamida.","d":"Incorreta. Tóxica.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ud0ak7', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Dose","Rifampicina","Manejo"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ud0ak7', 'approved', 294)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q296 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ziem15', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tuberculose de Reativação'' ocorre comumente em qual segmento pulmonar?', '[{"id":"a","text":"Lóbulos superiores (especialmente segmentos apicais e posteriores)."},{"id":"b","text":"Bases pulmonares bilaterais."},{"id":"c","text":"Pleura isolada."},{"id":"d","text":"Lóbulo médio isolado."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Micobactérias são aeróbias estritas e preferem áreas com maior pressão de oxigênio (ápices).', '{"a":"Correta. Localização anatômica clássica.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ziem15', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Anatomia","Reativação","Pulmão"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ziem15', 'approved', 295)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q297 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-a0u0m', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual dos fenótipos abaixo sinaliza maior chance de hepatotoxicidade pelo RIPE?', '[{"id":"a","text":"Acetiladores lentos."},{"id":"b","text":"Acetiladores rápidos."},{"id":"c","text":"Portadores de asma."},{"id":"d","text":"Sexo masculino."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Acetiladores lentos acumulam metabólitos tóxicos da isoniazida por mais tempo.', '{"a":"Correta. Fator de risco genético.","b":"Incorreta. Estes têm maior risco de falha por limpar a droga rápido demais.","c":"Incorreta.","d":"Incorreta. Mulheres têm risco discretamente maior.","e":"No sela túrcica."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'a0u0m', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Hepatotoxicidade","Genética","Segurança"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-a0u0m', 'approved', 296)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q298 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-kwbjsu', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Síndrome de Simon'' refere-se a:', '[{"id":"a","text":"Focos apicais secundários calcificados decorrentes de disseminação linfo-hematogênica na infância."},{"id":"b","text":"Tuberculose do trato urinário."},{"id":"c","text":"Abscesso de Psoas por TB."},{"id":"d","text":"Coinfecção Lepra/TB."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'São focos de disseminação precoce que podem reativar na vida adulta.', '{"a":"Correta. Epônimo clássico da tisiologia.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'kwbjsu', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Epônimo","História","Foco de Simon"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-kwbjsu', 'approved', 297)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q299 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-p31bbe', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O Mal de Pott é a manifestação da Tuberculose em qual sistema?', '[{"id":"a","text":"Ósseo (Coluna Vertebral)."},{"id":"b","text":"Sistema Nervoso Central."},{"id":"c","text":"Gastrointestinal."},{"id":"d","text":"Gênito-urinário."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Causa destruição de corpos vertebrais e discos, podendo levar a colapso e deformidade (gibosidade).', '{"a":"Correta. Manifestação óssea clássica.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'p31bbe', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Mal de Pott","TB Óssea","Coluna"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-p31bbe', 'approved', 298)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q300 (Part 55)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ore63c', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A principal causa de resistência a drogas na Tuberculose a nível global é:', '[{"id":"a","text":"Má adesão ao tratamento e abandono."},{"id":"b","text":"Mutação espontânea em larga escala na natureza."},{"id":"c","text":"Uso de vitaminas durante o RIPE."},{"id":"d","text":"Excesso de vacinação BCG."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Monoterapia funcional (esquecimento de doses) seleciona mutantes resistentes.', '{"a":"Correta. Principal causa humana de resistência.","b":"Incorreta.","c":"Incorreta.","d":"Incorreta.","e":"No sela túrcica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ore63c', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Resistência","Adesão","Manejo"],"batch":55}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ore63c', 'approved', 299)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q1 (Part 1)
    
END c:UserskayquDesktopQrub1QRub;