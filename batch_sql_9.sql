DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
-- TB Q271 (Part 53)
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
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ptab0x', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma mulher de 34 anos apresenta-se ao consultório com queixas de fadiga, constipação severa, pele seca e irregularidade menstrual (polimenorreia) nos últimos 6 meses. Ela relata também discreto aumento de peso (4 kg) no período, apesar de manter o apetite habitual. Ao exame físico: bradicardia (FC: 52 bpm), reflexos tendinosos profundos lentificados (fase de relaxamento prolongada) e edema periorbitário leve. Não há bócio palpável. Exames laboratoriais revelam: TSH = 18 mUI/L (VR: 0,4 a 4,5) e T4 Livre = 0,6 ng/dL (VR: 0,8 a 1,8). Qual o diagnóstico mais provável e a conduta inicial correta?', '[{"id":"a","text":"Hipotireoidismo primário clínico; iniciar Levotiroxina (1,6 mcg/kg/dia) com estômago vazio."},{"id":"b","text":"Hipotireoidismo subclínico; apenas observar e repetir exames em 3 meses."},{"id":"c","text":"Hipotireoidismo central (secundário); solicitar Ressonância de Sela Túrcica."},{"id":"d","text":"Síndrome do Eutireoideo Doente; não há necessidade de reposição hormonal."},{"id":"e","text":"Hipotireoidismo primário clínico; iniciar Liotironina (T3) isolada."}]', 'a', 
        'A paciente apresenta sinais e sintomas clássicos de hipotireoidismo clínico (TSH elevado e T4L baixo). A conduta padrão é a reposição com Levotiroxina (T4 sintético) em jejum. A dose de 1,6 mcg/kg/dia é a preconizada para adultos jovens e hígidos. O hipotireoidismo subclínico seria definido se o T4L estivesse normal (o que não é o caso).', '{"a":"Correta. Diagnóstico e conduta baseados no consenso brasileiro e internacional.","b":"Incorreta. O T4L baixo exclui a forma subclínica.","c":"Incorreta. No hipotireoidismo central, o TSH estaria baixo ou inadequadamente normal, nunca elevado desta forma.","d":"Incorreta. A síndrome do eutireoideo doente ocorre em pacientes críticos internados e cursa com T3 baixo, mas T4L e TSH usualmente normais no início.","e":"Incorreta. A reposição de escolha é sempre com T4 (Levotiroxina) devido à sua meia-vida longa e conversão periférica fisiológica em T3."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ptab0x', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo","Diagnóstico","Dose","Semiologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ptab0x', 'approved', 0)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q2 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8dls7v', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um homem de 52 anos, com história de cardiopatia isquêmica (infarto prévio há 2 anos), apresenta TSH = 12 mUI/L e T4 Livre = 0,7 ng/dL. O paciente queixa-se de cansaço extremo. Sobre a introdução de Levotiroxina neste paciente com comorbidade cardíaca, qual a orientação correta?', '[{"id":"a","text":"Iniciar com dose plena (1,6 mcg/kg/dia) para resolver os sintomas rapidamente."},{"id":"b","text":"Iniciar com dose baixa (12,5 a 25 mcg/dia) e aumentar lentamente a cada 4-8 semanas (estratégia ''start low, go slow'')."},{"id":"c","text":"Contraindicar a levotiroxina pois o hormônio causa arritmias fatais em cardiopatas."},{"id":"d","text":"Iniciar reposição apenas se o TSH for maior que 20 mUI/L."},{"id":"e","text":"Substituir a levotiroxina por Propranolol para proteger o coração."}]', 'b', 
        'Em pacientes idosos ou com dança arterial coronariana conhecida, a reposição hormonal brusca pode aumentar o consumo de oxigênio pelo miocárdio e o débito cardíaco, podendo desencadear angina, arritmias ou novo infarto. Por isso, a regra de ouro é começar com doses muito baixas e progredir conforme a tolerância clínica e laboratorial.', '{"a":"Incorreta. Risco cardíaco injustificável e perigoso.","b":"Correta. Medida de segurança fundamental na endocrinogeriatria e cardiologia.","c":"Incorreta. O hipotireoidismo não tratado também traz sérios riscos cardíacos (dislipidemia, disfunção diastólica, bradicardia).","d":"Incorreta. O paciente já tem hipotireoidismo clínico (T4L baixo) e deve ser tratado.","e":"Incorreta. Propranolol é usado no hipertireoidismo, não no hipotireoidismo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8dls7v', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo","Segurança","Cardiologia","Endocrinologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8dls7v', 'approved', 1)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q3 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-61cqa0', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma gestante de 8 semanas de idade gestacional apresenta, no seu primeiro exame de pré-natal, TSH = 3,8 mUI/L. Ela não possui diagnóstico prévio de doença tireoidiana. De acordo com os consensos brasileiros de tireoide na gestação, qual a conduta diante deste valor?', '[{"id":"a","text":"O valor está normal para a gestação, não exige nenhuma medida."},{"id":"b","text":"Solicitar obrigatoriamente a dosagem de Anticorpo Antiperoxidase (Anti-TPO); se positivo, iniciar Levotiroxina."},{"id":"c","text":"Iniciar Levotiroxina (100 mcg/dia) para todas as gestantes com TSH > 2,5."},{"id":"d","text":"Solicitar interrupção da gravidez por risco de bócio fetal."},{"id":"e","text":"Aguardar o segundo trimestre para repetir o exame, pois o TSH só tem valor após a 20ª semana."}]', 'b', 
        'Os valores de referência para TSH na gestação são mais baixos devido à ação do HCG (que estimula o receptor de TSH). Um TSH entre 2,5 e o limite superior do método (geralmente 4,0) em gestantes exige a dosagem do Anti-TPO. Se a gestante tiver autoimunidade positiva, o risco de progressão para hipotireoidismo durante a gestação e de complicações obstétricas (aborto, pré-eclâmpsia) aumenta, justificando o tratamento precoce se TSH > 2,5. Se o Anti-TPO for negativo, apenas monitora-se.', '{"a":"Incorreta. Na gestação, o limite de 4,0 já é considerado suspeito para hipotireoidismo subclínico em muitos contextos.","b":"Correta. Reflete o manejo estratificado de risco pelo anticorpo.","c":"Incorreta. Nem toda gestante com TSH > 2,5 precisa de tratamento; a dose de 100 mcg é excessiva para início de quem tem hipotireoidismo subclínico.","d":"Incorreta. Absurdo obstétrico.","e":"Incorreta. O primeiro trimestre é o período crucial para o desenvolvimento neurológico fetal dependente de hormônios maternos."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '61cqa0', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Gestação","TSH","Anti-TPO","Endocrinologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-61cqa0', 'approved', 2)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q4 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-j4gwhc', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A Tireoidite de Hashimoto é a causa mais comum de hipotireoidismo em áreas iodo-suficientes. Qual o achado histopatológico e o anticorpo marcador desta patologia respecitvamente?', '[{"id":"a","text":"Infiltrado linfocítico com centros germinativos e células de Hürthle (oxicílicas); Anti-TPO."},{"id":"b","text":"Infiltrado neutrofílico agudo e necrose de liquefação; Anti-TRAB."},{"id":"c","text":"Fibrose pétrea que invade tecidos adjacentes; Anti-TPO."},{"id":"d","text":"Granulomas epitelioides com células gigantes de Langhans; Anti-TG."},{"id":"e","text":"Hiperplasia folicular com bordas festonadas; Anticorpo Anti-TSH."}]', 'a', 
        'A Tireoidite de Hashimoto é uma doença autoimune mediada por células T. Na patologia, observamos a destruição do parênquima folicular e sua substituição por um infiltrado inflamatório linfocítico denso, podendo formar folículos linfoides (centros germinativos). As células foliculares remanescentes tornam-se metaplásicas (Células de Hürthle ou oxicílicas). O Anti-TPO (Antiperoxidase) é positivo em > 90% dos casos.', '{"a":"Correta. Definição patognomônica da doença.","b":"Incorreta. Sugere processo infeccioso agudo (abscesso), não crônico autoimune.","c":"Incorreta. Isto descreve a Tireoidite de Riedel.","d":"Incorreta. Granulomas sugerem TB, sarcoidose ou Tireoidite de De Quervain em fase específica (mas sem Caseum).","e":"Incorreta. Descrição clássica da Doença de Graves."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'j4gwhc', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hashimoto","Histopatologia","Anticorpos","Autoimunidade"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-j4gwhc', 'approved', 3)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q5 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-alqpw1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 28 anos, ansioso, apresenta palpitações, insônia, tremores de extremidades e perda de massa muscular proximal (miopatia). Refere sensação de calor constante. Ao exame físico: bócio difuso e indolor com presença de sopro sistólico na glândula tireoide. Nota-se proptose ocular (exoftalmia) e retração palpebral. Laboratório: TSH < 0,01 mUI/L e T4 Livre = 4,2 ng/dL. Qual o diagnóstico e o anticorpo envolvido?', '[{"id":"a","text":"Doença de Graves; Anticorpo estimulador do receptor de TSH (TRAB)."},{"id":"b","text":"Bócio Multinodular Tóxico; Anticorpo Anti-Tireoglobulina."},{"id":"c","text":"Adenoma Tóxico (Doença de Plummer); Anticorpo Anti-TPO."},{"id":"d","text":"Tireoidite Subaguda de De Quervain; Anti-TRAB."},{"id":"e","text":"Hipertireoidismo factício; TRAB negativo."}]', 'a', 
        'O quadro de bócio difuso (''sopro na tireoide'') associado a sinais oculares específicos (oftalmopatia) e hipertireoidismo clínico severo define a Doença de Graves. A etiologia é a produção de anticorpos (TRAB) que mimetizam a ação do TSH, estimulando continuamente a glândula.', '{"a":"Correta. Tríade de Graves e fisiopatologia molecular.","b":"Incorreta. O bócio multinodular não apresenta exoftalmia típica nem sopro difuso na glândula.","c":"Incorreta. A Doença de Plummer é um nódulo único autônomo (quente no cintilograma) e não possui etiologia autoimune.","d":"Incorreta. A tireoidite de De Quervain é extremamente DOLOROSA na palpação cervical.","e":"Incorreta. O hipertireoidismo factício (pela ingestão de hormônio) cursa com glândula atrófica (sem bócio)."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'alqpw1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipertireoidismo","Graves","TRAB","Oftalmopatia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-alqpw1', 'approved', 4)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q6 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w9cozi', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma paciente de 35 anos apresenta quadro clínico de dor cervical súbita e intensa, que irradia para a mandíbula e orelhas. Relata ter tido uma infecção respiratória alta (resfriado) há 2 semanas. Ao exame: tireoide aumentada de volume, de consistência elástica e extremamente dolorosa à palpação. Laboratório: TSH suprimido, T4L elevado e Velocidade de Hemossedimentação (VHS) = 90 mm/1ªh (VR: < 20). Qual o diagnóstico e o tratamento de escolha para a fase aguda?', '[{"id":"a","text":"Tireoidite Subaguda (De Quervain); tratamento com Anti-inflamatórios não hormonais (AINH) ou Corticoides."},{"id":"b","text":"Tireoidite Infecciosa Aguda (Supurativa); tratamento com Antibioticoterapia endovenosa."},{"id":"c","text":"Tireoidite de Hashimoto (fase Hashitoxicose); tratamento com Metimazol."},{"id":"d","text":"Hemorragia intranodular; tratamento cirúrgico de urgência."},{"id":"e","text":"Carcinoma Anaplásico de Tireoide; tratamento paliativo."}]', 'a', 
        'A apresentação de dor cervical súbita e intensa após um quadro viral, associada a tireotoxicose clínica e laboratorial (TSH baixo, T4L alto) e VHS extremamente elevado, é patognomônica da Tireoidite Subaguda de De Quervain (ou granulomatosa). O tratamento visa o controle da dor e da inflamação, sendo os AINHs a primeira escolha; em casos graves ou refratários, os corticoides são indicados.', '{"a":"Correta. Diagnóstico clássico pós-viral com dor e VHS alto.","b":"Incorreta. A tireoidite supurativa cursa com sinais flogísticos locais intensos e desvio à esquerda no hemograma.","c":"Incorreta. Hashitoxicose não costuma ser dolorosa e o VHS é normal.","d":"Incorreta. A hemorragia causa dor súbita mas raramente hipertireoidismo e VHS tão alto.","e":"Incorreta. O carcinoma anaplásico causa dor e crescimento rápido em idosos, mas o VHS e a relação pós-viral são típicos de De Quervain."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w9cozi', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoidite","De Quervain","Dor Cervical","VHS"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-w9cozi', 'approved', 5)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q7 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-jd1htl', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A crise tireotóxica (tempestade tireoidiana) é uma emergência médica. De acordo com o escore de Burch-Wartofsky, qual dos sinais abaixo NÃO é um critério clássico para o diagnóstico de tempestade tireoidiana?', '[{"id":"a","text":"Febre acima de 38,5°C."},{"id":"b","text":"Taquicardia proporcional à febre (FC < 90 bpm)."},{"id":"c","text":"Alterações no sistema nervoso central (agitação, confusão, coma)."},{"id":"d","text":"Sintomas gastrointestinais (vômitos, diarreia, icterícia)."},{"id":"e","text":"Insuficiência cardíaca congestiva."}]', 'b', 
        'A tempestade tireoidiana cursa com taquicardia DESPROPORCIONAL à febre, geralmente com FC > 140 bpm. O escore de Burch-Wartofsky pontua temperatura, efeitos neurológicos centrais, disfunção cardiovascular (taquicardia, fibrilação atrial, ICC) e disfunção gastro-hepática. Uma frequência cardíaca baixa (90 bpm) pontua zero no escore e desfavorece o diagnóstico de crise tireotóxica.', '{"a":"Incorreta. A hipertermia é o marco da crise.","b":"Correta. O erro está na frequência cardíaca descrita como baixa.","c":"Incorreta. Disfunção do SNC é critério viga mestra do escore.","d":"Incorreta. Disfunção gastrointestinal pontua no escore.","e":"Incorreta. ICC é uma das manifestações clínicas terminais ou graves da tempestade."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'jd1htl', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Emergência","Crise Tireotóxica","Burch-Wartofsky","Infectologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-jd1htl', 'approved', 6)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q8 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9pncu1', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No tratamento do hipertireoidismo, o Metimazol (MMI) é preferencial ao Propiltiouracil (PTU), EXCETO em situações específicas. Em qual das situações abaixo o Propiltiouracil (PTU) deve ser preferido como droga de primeira escolha?', '[{"id":"a","text":"Primeiro trimestre da gestação e Crise Tireotóxica."},{"id":"b","text":"Hipotireoidismo severo."},{"id":"c","text":"Idosos com arritmia cardíaca."},{"id":"d","text":"Adolescentes com bócio discreto."},{"id":"e","text":"Pacientes com insuficiência renal crônica."}]', 'a', 
        'O PTU é preferível no 1º trimestre da gestação porque o Metimazol (MMI) está associado a malformações fetais raras mas graves (aplasia cutis, atresia de coanas/esôfago). Na Crise Tireotóxica, o PTU é preferido porque, além de inibir a síntese do hormônio tireoidiano (como o MMI), ele também inibe a conversão periférica de T4 em T3 (o hormônio metabolicamente mais ativo). No 2º e 3º trimestres, volta-se ao MMI por menor risco de hepatotoxicidade materna grave comparado ao PTU.', '{"a":"Correta. Regra farmacológica clássica da tireoide.","b":"Incorreta. Nenhuma destas drogas é usada no hipotireoidismo.","c":"Incorreta. MMI é mais seguro em idosos por menor hepatotoxicidade.","d":"Incorreta. Adolescentes devem usar MMI preferencialmente.","e":"Incorreta. O metabolismo é predominantemente hepático; o PTU não tem vantagem renal específica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9pncu1', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Farmacologia","Gestação","Crise Tireotóxica","Metimazol"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9pncu1', 'approved', 7)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q9 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ismymg', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 45 anos, assintomático, apresenta em um exame de check-up um nódulo tireoidiano de 1,8 cm em lobo direito. A ultrassonografia demonstra: ''Nódulo sólido, hipoecogênico, com margens irregulares e presença de microcalcificações (TI-RADS 5)''. Qual a conduta correta perante esta descrição ultrassonográfica?', '[{"id":"a","text":"Realizar Punção Aspirativa por Agulha Fina (PAAF) imediatamente."},{"id":"b","text":"Apenas repetir a ultrassonografia em 12 meses."},{"id":"c","text":"Solicitar Cintilografia de Tireoide como primeiro exame."},{"id":"d","text":"Iniciar Levotiroxina para suprimir o TSH e reduzir o nódulo."},{"id":"e","text":"Indicar tireoidectomia total sem necessidade de punção prévia."}]', 'a', 
        'O nódulo apresenta características de altíssima suspeição para malignidade (sólido, hipoecoico, microcalcificações e margens irregulares). Pela classificação ACR TI-RADS, nódulos TI-RADS 5 superiores a 1,0 cm devem ser submetidos à PAAF para diagnóstico citológico (Bethesda).', '{"a":"Correta. Conduta padrão para nódulo suspeito.","b":"Incorreta. Retardar a investigação em um nódulo TI-RADS 5 é um erro grave.","c":"Incorreta. A cintilografia só é indicada como passo inicial se o TSH estiver suprimido (nódulo possivelmente ''quente'').","d":"Incorreta. A terapia supressiva com levotiroxina para nódulos não é mais recomendada.","e":"Incorreta. A cirurgia deve ser baseada no resultado da citologia (PAAF)."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ismymg', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Nódulo de Tireoide","PAAF","TI-RADS","Câncer de Tireoide"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ismymg', 'approved', 8)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q10 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-x6n1lb', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O resultado da PAAF de um nódulo tireoidiano de 2,5 cm foi classificado como ''Bethesda IV (Neoplasia Folicular ou Suspeito para Neoplasia Folicular)''. Qual a conduta recomendada para este resultado?', '[{"id":"a","text":"Cirurgia (Lobectomia ou Tireoidectomia Total) ou realização de testes moleculares, pois a citologia não consegue diferenciar adenoma folicular de carcinoma folicular."},{"id":"b","text":"Repetir a PAAF imediatamente para confirmar se é câncer."},{"id":"c","text":"Alta definitiva; o nódulo é benigno."},{"id":"d","text":"Apenas observação radiológica a cada 24 meses."},{"id":"e","text":"Tratamento com Iodo Radioativo (I-131)."}]', 'a', 
        'O diagnóstico citológico (Bethesda IV) não consegue distinguir se há invasão de cápsula ou de vasos, que são os critérios histopatológicos que definem o Carcinoma Folicular. Portanto, a análise do nódulo inteiro (peça cirúrgica) é necessária. Em centros avançados, o teste molecular pode ser usado para evitar cirurgias desnecessárias se demonstrar baixo risco genético.', '{"a":"Correta. Dilema histopatológico do padrão folicular.","b":"Incorreta. Repetir a punção resultará no mesmo padrão ''folicular'' e não resolverá a dúvida de invasão capsular.","c":"Incorreta. Bethesda IV tem risco de malignidade de 15% a 30%.","d":"Incorreta. Risco de negligenciar um carcinoma folicular.","e":"Incorreta. O I-131 é tratamento de resgate pós-cirúrgico ou para hipertireoidismo, não para diagnóstico inicial de nódulos."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'x6n1lb', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bethesda","PAAF","Carcinoma Folicular","Cirurgia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-x6n1lb', 'approved', 9)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q11 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-fj4w3u', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma Papilífero de Tireoide (CPT) é o tipo mais comum de câncer de tireoide. Qual a via de disseminação preferencial deste tumor e qual o marcador laboratorial usado no seguimento pós-operatório (após tireoidectomia total e ablação com iodo)?', '[{"id":"a","text":"Disseminação Linfática; marcador: Tireoglobulina."},{"id":"b","text":"Disseminação Hematogênica; marcador: Calcitonina."},{"id":"c","text":"Disseminação por contiguidade; marcador: T4 Livre."},{"id":"d","text":"Não sofre disseminação; marcador: Anti-TPO."},{"id":"e","text":"Disseminação Linfática; marcador: TSH."}]', 'a', 
        'O CPT dissemina-se preferencialmente por via linfática para os linfonodos cervicais. Como as células foliculares normais e as neoplásicas papilíferas produzem Tireoglobulina (Tg), após a retirada total de todo o tecido tireoidiano (cirurgia + iodo), a Tg deve ser indetectável. Sua detecção no sangue durante o seguimento sugere recidiva ou metástase.', '{"a":"Correta. Padrão ouro de oncologia da tireoide.","b":"Incorreta. Disseminação hematogênica é mais comum no Folitcular e Medular. Calcitonina é o marcador do Medular.","c":"Incorreta. Embora invada por contiguidade, a via linfática é a regra para as metástases iniciais. T4L não é marcador tumoral.","d":"Incorreta. Todos os cânceres podem disseminar-se.","e":"Incorreta. O TSH é usado para avaliar a dose da medicação ou preparar para exames, mas o marcador do tumor em si é a Tg."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'fj4w3u', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Papilífero","Tireoglobulina","Linfonodos","Oncologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-fj4w3u', 'approved', 10)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q12 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-rtppem', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente submetido a Punção Aspirativa por Agulha Fina (PAAF) de um nódulo tireoidiano recebe o laudo como ''Sistema Bethesda VI''. Qual o significado clínico e a conduta sugerida?', '[{"id":"a","text":"Maligno (Câncer); indicar tratamento cirúrgico definitivo."},{"id":"b","text":"Benigno; acompanhamento clínico."},{"id":"c","text":"Inconclusivo; repetir punção em 3 meses com auxílio de Core Biopsy."},{"id":"d","text":"Lesão de significado indeterminado; conduta expectante."},{"id":"e","text":"Células foliculares normais; alta."}]', 'a', 
        'No sistema Bethesda, a categoria VI representa um diagnóstico definitivo de Malignidade (geralmente Carcinoma Papilífero), com valor preditivo positivo > 99%. A cirurgia é o tratamento mandatório.', '{"a":"Correta. Classificação de Bethesda máxima.","b":"Incorreta. Benigno é Bethesda II.","c":"Incorreta. Inconclusivo é Bethesda I.","d":"Incorreta. Indeterminado é Bethesda III.","e":"Incorreta. Bethesda VI nunca é normal."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'rtppem', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bethesda","Câncer","Conduta","Cirurgia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-rtppem', 'approved', 11)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q13 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w5vlxa', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma Medular de Tireoide (CMT) origina-se de quais células e qual marcador laboratorial é utilizado para seu diagnóstico e seguimento?', '[{"id":"a","text":"Células C (Parafoliculares); marcador: Calcitonina."},{"id":"b","text":"Células Foliculares; marcador: Tireoglobulina."},{"id":"c","text":"Linfócitos intra-tireoidianos; marcador: CD20."},{"id":"d","text":"Células de Hürthle; marcador: Ácido Úrico."},{"id":"e","text":"Células Estromais; marcador: Estrogênio."}]', 'a', 
        'O CMT deriva das células parafoliculares (Células C), que produzem o hormônio Calcitonina. Este tumor pode ser esporádico ou associado a síndromes de Neoplasia Endócrina Múltipla (NEM 2A ou 2B). A Calcitonina é o biomarcador sensível e específico para este câncer.', '{"a":"Correta. Fisiopatologia do Carcinoma Medular.","b":"Incorreta. Células foliculares originam o Papilífero e o Folicular.","c":"Incorreta. Linfomas de tireoide originam-se de linfócitos.","d":"Incorreta. Células de Hürthle são variantes das foliculares.","e":"Incorreta. Não existe carcinoma estromal de tireoide produtor de estrogênio."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w5vlxa', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Medular","Calcitonina","Células C","NEM"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-w5vlxa', 'approved', 12)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q14 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-699zlw', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 40 anos com quadro de hipertireoidismo por Doença de Graves recebe tratamento com Metimazol (MMI). Após 10 dias, desenvolve febre alta e dor de garganta severa (odinofagia) com presença de exsudato em orofaringe. Qual o efeito colateral grave e raro do Metimazol deve ser suspeitado e qual o exame imediato?', '[{"id":"a","text":"Agranulocitose; Hemograma com contagem de neutrófilos."},{"id":"b","text":"Hepatite fulminante; Transaminases."},{"id":"c","text":"Síndrome Nefrótica; Urina Tipo 1."},{"id":"d","text":"Hipotireoidismo iatrogênico; TSH."},{"id":"e","text":"Mononucleose infecciosa por imunodepressão; Sorologias."}]', 'a', 
        'A agranulocitose (neutrófilos < 500/mm³) é um efeito colateral raro (0,2 a 0,5%) e potencialmente fatal das tionamidas (MMI e PTU). Manifesta-se subitamente como infecção de orofaringe ou sepse. O paciente deve ser orientado a suspender a droga e procurar o hospital imediatamente se tiver febre e dor de garganta. A conduta é a suspensão definitiva da medicação e suporte com fator de crescimento de colônias (G-CSF) se necessário.', '{"a":"Correta. Efeito adverso hematológico crítico.","b":"Incorreta. Hepatite causa icterícia e dor abdominal, não dor de garganta.","c":"Incorreta. Não há tal associação dermatológica/renal.","d":"Incorreta. Hipotireoidismo não causa dor de garganta e febre.","e":"Incorreta. Embora os sintomas simulem mononucleose, a causa medicamentosa é a prioridade no paciente em uso de MMI."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '699zlw', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Agranulocitose","Metimazol","Efeitos Adversos","Hematologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-699zlw', 'approved', 13)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q15 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        '', '[{"id":"a","text":"Associação de Doença de Graves (hipertireoidismo autoimune) com a presença de nódulos funcionais autônomos (Bócio Multinodular Tóxico)."},{"id":"b","text":"Associação de Hipotireoidismo com Insuficiência Adrenal."},{"id":"c","text":"Associação de Câncer de Tireoide com Feocromocitoma."},{"id":"d","text":"Tireoidite de Hashimoto cursando com Fibrose Retroperitoneal."},{"id":"e","text":"Hipertireoidismo causado por tumor hipofisário secretor de TSH."}]', 'a', 
        'A Síndrome de Marine-Lenhart é uma variante rara do hipertireoidismo onde coexistem duas doenças: a Doença de Graves (estímulo difuso pelo TRAB) e nódulos que são independentes do TRAB e do TSH (autônomos). No cintilograma, observa-se captação difusa aumentada com áreas nodulares de captação ainda mais intensa.', '{"a":"Correta. Definição da síndrome epônima.","b":"Incorreta. Isto descreve a Síndrome de Schmidt.","c":"Incorreta. Sugere NEM 2A.","d":"Incorreta. Sem relação descrita.","e":"Incorreta. Isto é um TSHoma."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Graves","Marine-Lenhart","Bócio","Endocrinologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-', 'approved', 14)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q16 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w98jjz', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No estado de Hipertireoidismo (Graves), o que se espera encontrar na avaliação da Captação de Iodo Radioativo (RAIU) de 24 horas?', '[{"id":"a","text":"RAIU elevada (Glândula ávida por iodo)."},{"id":"b","text":"RAIU baixa (Glândula ''branca'' ou sem captação)."},{"id":"c","text":"RAIU normal, mas com excreção urinária aumentada."},{"id":"d","text":"Padrão nodular frio."},{"id":"e","text":"Captação exclusiva em pirâmide de Lalouette."}]', 'a', 
        'Na Doença de Graves, a glândula está em hiperatividade sintética constante. Portanto, ela capta avidamente o iodo circulante para produzir hormônios. Já nas Tireoidites (onde o hormônio ''vaza'' do folículo destruído) ou no hipertireoidismo factício, a RAIU está baixa.', '{"a":"Correta. Padrão de hiperfunção verdadeira.","b":"Incorreta. RAIU baixa ocorre em tireoidites, ingestão exógena ou excesso de iodo (Jod-Basedow).","c":"Incorreta. A captação intraglandular é o que define o diagnóstico diferencial.","d":"Incorreta. Doença de Graves é difusa.","e":"Incorreta. Pirâmide de Lalouette é um remanescente anatômico, não um padrão funcional isolado no Graves."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'w98jjz', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["RAIU","Iodo Radioativo","Graves","Diferencial"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-w98jjz', 'approved', 15)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q17 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-m6o0ba', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal causa de Hipotireoidismo Congênito no Brasil é a Disgenesia Tireoidiana. Qual o exame de triagem neonatal obrigatório para detecção desta condição e qual o período ideal para coleta?', '[{"id":"a","text":"Teste do Pezinho (Dosagem de TSH); entre o 3º e 5º dia de vida."},{"id":"b","text":"Dosagem de T4 Livre no cordão umbilical."},{"id":"c","text":"Ultrassonografia cervical na maternidade."},{"id":"d","text":"Cintilografia de tireoide aos 7 dias de vida."},{"id":"e","text":"Teste do Pezinho (Dosagem de Calcitonina); 1º dia de vida."}]', 'a', 
        'O Teste do Pezinho coleta sangue capilar do calcanhar do RN. O TSH neonatal é a ferramenta de triagem para hipotireoidismo congênito, que se não tratado precocemente (idealmente nas primeiras 2 semanas), causa deficiência intelectual irreversível (cretinismo). A coleta no 3º-5º dia evita o pico fisiológico de TSH que ocorre logo após o nascimento.', '{"a":"Correta. Protocolo de triagem neonatal universal.","b":"Incorreta. Sangue de cordão pode sofrer interferência materna e não é operacionalmente viável como triagem de massa.","c":"Incorreta. USG serve para localizar a glândula após o diagnóstico bioquímico, não como triagem.","d":"Incorreta. Exame diagnóstico de segunda linha.","e":"Incorreta. Calcitonina não serve para rastrear hipotireoidismo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'm6o0ba', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Congênito","Triagem Neonatal","Teste do Pezinho","Prevenção"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-m6o0ba', 'approved', 16)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q18 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-l3yfpb', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Sobre o Coma Mixedematoso, assinale a alternativa que contém a tríade diagnóstica clássica.', '[{"id":"a","text":"Alteração de consciência (coma/letargia), Hipotermia e fator precipitante (ex: infecção, frio, cirurgia)."},{"id":"b","text":"Febre alta, Taquicardia e Agitação."},{"id":"c","text":"Bócio gigante, Proptose e Insuficiência cardíaca."},{"id":"d","text":"Tremores, Perda de peso e Diarreia."},{"id":"e","text":"Poliúria, Polidipsia e Desidratação severa."}]', 'a', 
        'O Coma Mixedematoso é o estágio terminal do hipotireoidismo não tratado, agravado por um fator agudo. Caracteriza-se por lentificação global: hipotermia (frequentemente < 35°C), depressão respiratória (hipercapnia), bradicardia e alteração do nível de consciência. É uma emergência com alta mortalidade.', '{"a":"Correta. Reconhecimento clínico da emergência.","b":"Incorreta. Descrição de crise tireotóxica (o oposto).","c":"Incorreta. Sugere Doença de Graves severa.","d":"Incorreta. Sintomas de hipertireoidismo.","e":"Incorreta. Sugere Diabetes Mellitus ou Insipidus."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'l3yfpb', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Coma Mixedematoso","Emergência","Terapia Intensiva","Hipotireoidismo"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-l3yfpb', 'approved', 17)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q19 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ska4sy', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual complicação cirúrgica imediata da tireoidectomia pode levar à obstrução respiratória aguda e morte se não for prontamente drenada?', '[{"id":"a","text":"Hematoma cervical expansivo sufocante."},{"id":"b","text":"Hipocalcemia por retirada das paratireoides."},{"id":"c","text":"Lesão bilateral do nervo laríngeo superior."},{"id":"d","text":"Crise asmática induzida pelo iodo."},{"id":"e","text":"Recorrência tumoral imediata."}]', 'a', 
        'O sangramento no espaço cervical após tireoidectomia pode formar um hematoma sob a fáscia profunda. Devido à rigidez das estruturas cervicais, o sangue comprime a traqueia (laringomalácia reacional) e causa asfixia mecânica imediata. A conduta é a abertura da ferida cirúrgica à beira do leito para descompressão e posterior retorno ao bloco cirúrgico.', '{"a":"Correta. Emergência pós-operatória crítica do cirurgião de cabeça e pescoço.","b":"Incorreta. Hipocalcemia causa parestesias e tetania (sinal de Chvostek/Trousseau), mas não obstrução respiratória mecânica súbita.","c":"Incorreta. A lesão do laríngeo superior altera a emissão de tons agudos. A lesão do RECORRENTE bilateral é que causa paralisia das cordas vocais em adução e estridor (obstrução alta).","d":"Incorreta. Raríssimo e não cursa com compressão cervical externa.","e":"Incorreta. Impossível."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ska4sy', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Cirurgia","Complicações","Emergência Post-Op","Hematoma"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ska4sy', 'approved', 18)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q20 (Part 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        '', '[{"id":"a","text":"Resistência generalizada aos hormônios tireoidianos (mutação no receptor TR-beta)."},{"id":"b","text":"Destruição da glândula tireoide por radiação nuclear."},{"id":"c","text":"Produção ectópica de hormônio tireoidiano por um tumor ovariano (Struma Ovarii)."},{"id":"d","text":"Insucesso na conversão periférica de T4 em T3 por deficiência de selênio."},{"id":"e","text":"Aumento do bócio causado por ingestão excessiva de mandioca branca."}]', 'a', 
        'Na Síndrome de Refetoff, os tecidos são resistentes à ação do hormônio tireoidiano. O resultado laboratorial é paradoxal: T4 Livre e T3 elevados, mas TSH também elevado ou normal (pois a hipófise também é resistente ao feedback negativo). O paciente pode estar clinicamente eutireoideo, hipotireoideo ou hipertireoideo (dependendo do grau de resistência em diferentes tecidos).', '{"a":"Correta. Doença genética de resistência hormonal.","b":"Incorreta. Trata-se de tireoidite actínica.","c":"Incorreta. Descrição de Struma Ovarii.","d":"Incorreta. Síndrome do Eutireoideo Doente ou defeitos nas deiodinases.","e":"Incorreta. Bócio endêmico bociogênico alimentar."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Resistência Hormonal","Refetoff","Endocrinologia","Tireoide"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-', 'approved', 19)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q21 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-nbjto4', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um homem de 58 anos, com diagnóstico de Carcinoma Folicular de Tireoide e metástases pulmonares funcionantes (captação de Iodo-131 na pesquisa de corpo inteiro), está em acompanhamento após tireoidectomia total. Ele apresenta níveis persistentes de Tireoglobulina (TG) de 150 ng/mL, apesar de múltiplas doses terapêuticas de Radioiodo. O último PET-CT com FDG demonstrou hipermetabolismo intenso nas lesões pulmonares, que deixaram de captar iodo. Qual a melhor conduta para este cenário de ''Doença Refratária ao Radioiodo''?', '[{"id":"a","text":"Iniciar inibidores de tirosina quinase multialvo (ITK), como o Lenvatinibe ou Sorafenibe."},{"id":"b","text":"Aumentar a dose de Radioiodo para 300 mCi e repetir em 3 meses."},{"id":"c","text":"Realizar quimioterapia sistêmica com Cisplatina e Doxorrubicina de resgate."},{"id":"d","text":"Suspender a Terapia Supressiva com Levotiroxina para sensibilizar as metástases."},{"id":"e","text":"Indicar radioterapia externa pulmonar bilateral profilática."}]', 'a', 
        'A perda da capacidade de captar iodo pelas metástases (fenômeno de desdiferenciação, evidenciado pelo ''mismatch'' entre PCI negativa e FDG-PET positivo) define a refratariedade ao radioiodo no câncer diferenciado de tireoide. Nestes casos, quando há progressão de doença radiológica em 12-14 meses, os inibidores de tirosina quinase (ITK) são a primeira linha de tratamento sistêmico aprovada, visando o controle da angiogênese e da sinalização celular tumoral.', '{"a":"Correta. Protocolo de tratamento sistêmico para câncer de tireoide radio-refratário.","b":"Incorreta. Doses cumulativas acima de 600 mCi ou ausência de captação contraindicam nova dose de iodo.","c":"Incorreta. Quimioterapia convencional tem baixíssima taxa de resposta no câncer de tireoide.","d":"Incorreta. A supressão do TSH deve ser mantida para evitar estímulo ao crescimento tumoral residual.","e":"Incorreta. A RTX externa não é indicada de forma profilática em bases pulmonares por toxicidade e baixa eficácia."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'nbjto4', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Câncer de Tireoide","Lenvatinibe","Radioiodo","Metástases"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-nbjto4', 'approved', 20)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q22 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4emyev', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma paciente de 22 anos, no quarto mês de gestação (16 semanas), apresenta-se com quadro de taquicardia, tremores, perda de peso e bócio difuso leve. Exames laboratoriais: TSH < 0,01 mUI/L, T4 Livre = 2,8 ng/dL (VR: 0,8-1,8) e TRAb (Anticorpo Antirreceptor de TSH) positivo. Considerando o tratamento da Doença de Graves durante a gestação no Brasil, qual a recomendação correta para o segundo e terceiro trimestres?', '[{"id":"a","text":"Trocar Propiltiomacil por Metimazol, dadas as preocupações com hepatotoxicidade materna no uso prolongado de Propiltiomacil."},{"id":"b","text":"Manter Metimazol durante toda a gestação, pois o risco de aplasia cutis é apenas teórico."},{"id":"c","text":"Realizar tireoidectomia total imediata, independentemente da idade gestacional."},{"id":"d","text":"Administrar Iodo Radioativo (I-131) para controle definitivo, pois não atravessa a placenta."},{"id":"e","text":"Suspender toda medicação antitireoidiana, pois a imunidade da gestante cura o Graves espontaneamente."}]', 'a', 
        'No tratamento da Doença de Graves gestacional, o Propiltiomacil (PTU) é a droga de escolha no primeiro trimestre devido ao risco de embriopatia pelo Metimazol (aplasia cutis, atresia de coanas). No entanto, a partir do segundo trimestre, recomenda-se a troca para o Metimazol (ou manutenção do PTU com cautela), pois o PTU está associado a um risco maior de hepatotoxicidade materna grave e fulminante se usado por longos períodos.', '{"a":"Correta. Protocolo de transição de antitireoidianos na gestação.","b":"Incorreta. Metimazol no 1º trimestre é sabidamente teratogênico.","c":"Incorreta. A cirurgia é reservada para casos graves/refratários, preferencialmente no 2º trimestre, mas não é a ''primeira escolha'' diagnóstica.","d":"Incorreta. O Iodo-131 é terminantemente proibido na gestação (risco de destruição da tireoide fetal).","e":"Incorreta. Embora os níveis de anticorpos possam cair, a suspensão sem eutireoidismo controlado causa risco de insuficiência cardíaca e abortamento."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4emyev', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Doença de Graves","Gestação","Metimazol","Teratogenicidade"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4emyev', 'approved', 21)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q23 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-nvm8pm', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Durante uma tireoidectomia total por bócio multinodular volumoso, o cirurgião identifica e preserva as glândulas paratireoides. No entanto, no primeiro dia pós-operatório, a paciente apresenta parestesias periorais e sinal de Chvostek positivo. Qual o mecanismo fisiopatológico mais provável e a conduta imediata?', '[{"id":"a","text":"Hipoparatireoidismo transitório por isquemia ou manipulação das paratireoides; administrar Gluconato de Cálcio endovenoso."},{"id":"b","text":"Tireotoxicose factícia por liberação de hormônios estocados; administrar Propranolol."},{"id":"c","text":"Crise tireotóxica aguda; realizar plasmaférese de urgência."},{"id":"d","text":"Paralisia crônica de pregas vocais; realizar traqueostomia."},{"id":"e","text":"Síndrome de DiGeorge adquirida; realizar transplante de timo."}]', 'a', 
        'O hipoparatireoidismo pós-operatório é a complicação mais comum da tireoidectomia total. Mesmo com a preservação anatômica, a manipulação ou a interrupção da delicada rede vascular das paratireoides (ramos da artéria tireóidea inferior) pode causar isquemia transitória e queda dos níveis de PTH, resultando em hipocalcemia sintomática (parestesias, sinais de Chvostek/Trousseau). O tratamento imediato é a reposição de cálcio venoso e oral.', '{"a":"Correta. Complicação pós-cirúrgica clássica e manejo agudo.","b":"Incorreta. A liberação de hormônios causaria sintomas de hipertireoidismo, não hipocalcemia.","c":"Incorreta. Quadro totalmente diferente da hipocalcemia pós-operatória.","d":"Incorreta. Lesão de nervo recorrente causa disfonia, não parestesia.","e":"Incorreta. DiGeorge é uma síndrome congênita de deleção cromossômica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nvm8pm', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Paratireoide","Hipocalcemia","Tireoidectomia","Complicações"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-nvm8pm', 'approved', 22)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q24 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9gflv2', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 50 anos apresenta um nódulo tireoidiano Bethesda IV (Suspeito para Neoplasia Folicular). Sabendo que o diagnóstico diferencial entre adenoma folicular e carcinoma folicular não pode ser feito pela citologia, qual o critério histopatológico definitivo encontrado apenas no Carcinoma Folicular?', '[{"id":"a","text":"Invasão capsular ou invasão vascular na análise da peça cirúrgica."},{"id":"b","text":"Presença de núcleos em vidro fosco ou fendas nucleares."},{"id":"c","text":"Atipia celular acentuada e alta taxa mitótica."},{"id":"d","text":"Células de Hürthle ocupando mais de 50% da lâmina."},{"id":"e","text":"Calcificações psamomatosas no estroma tumoral."}]', 'a', 
        'O Carcinoma Folicular de Tireoide exige, por definição, a demonstração de invasão da cápsula do nódulo pelo tumor ou a presença de invasão de vasos sanguíneos pericapsulares. Como a PAAF aspira apenas células isoladas (e não a cápsula inteira), ela não consegue diferenciar o adenoma do carcinoma, sendo necessária a tireoidectomia parcial ou total para o diagnóstico definitivo.', '{"a":"Correta. Diferencial patológico padrão viga-mestra.","b":"Incorreta. Achados típicos do Carcinoma Papilífero, não do Folicular.","c":"Incorreta. Atipias são comuns em ambos os tumores foliculares e não definem malignidade per se.","d":"Incorreta. Nódulos de células de Hürthle são uma variante, mas seguem o mesmo critério de invasão para malignidade.","e":"Incorreta. Corpos psamomatosos são típicos do Carcinoma Papilífero."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9gflv2', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Folicular","Bethesda IV","Patologia","Cirurgia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9gflv2', 'approved', 23)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q25 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9m8ar3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente feminina de 45 anos, com quadro de depressão, constipação severa, ganho de peso e pele seca. TSH = 52 mUI/L (VR: 0,4-4,5) e T4 Livre = 0,4 ng/dL (VR: 0,8-1,8). Além da reposição de Levotiroxina, qual anticorpo deve ser solicitado para confirmar a etiologia mais provável desta condição?', '[{"id":"a","text":"Anticorpo Anti-tireoperoxidase (Anti-TPO)."},{"id":"b","text":"Anticorpo Antirreceptor de TSH (TRAb)."},{"id":"c","text":"Anticorpo Antigliadina."},{"id":"d","text":"Anticorpo Antimusculo Liso."},{"id":"e","text":"Anticorpo Anti-tireoglobulina isolado."}]', 'a', 
        'O quadro de hipotireoidismo primário franco (TSH elevado com T4 livre baixo) em mulheres na meia-idade é, na maioria esmagadora dos casos, decorrente da Tireoidite de Hashimoto (tireoidite linfocítica crônica). O Anti-TPO é o marcador sorológico mais sensível e específico para esta condição autoimune, estando positivo em mais de 90-95% dos pacientes.', '{"a":"Correta. Marcador clássico da Tireoidite de Hashimoto.","b":"Incorreta. TRAb é marcador de Doença de Graves (hipertireoidismo).","c":"Incorreta. Relacionado à Doença Celíaca.","d":"Incorreta. Relacionado à Hepatite Autoimune.","e":"Incorreta. O anti-TG pode estar positivo, mas é menos sensível e específico que o anti-TPO para Hashimoto."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '9m8ar3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo","Hashimoto","Anti-TPO","Autoimunidade"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9m8ar3', 'approved', 24)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q26 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-o50xdi', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente idoso (75 anos), com história de fibrilação atrial crônica, desenvolve hipertireoidismo severo após o uso de Amiodarona (Tireotoxicose Induzida por Amiodarona - TIA). O Doppler cervical revela ausência de fluxo sanguíneo na tireoide (hipovascularidade). Qual o tipo de TIA provável e o tratamento de escolha?', '[{"id":"a","text":"TIA Tipo 2 (tireoidite destrutiva); uso de corticosteroides (Prednisona)."},{"id":"b","text":"TIA Tipo 1 (produção excessiva de hormônio); uso de Metimazol em altas doses."},{"id":"c","text":"Efeito Wolff-Chaikoff; suspender a medicação apenas."},{"id":"d","text":"Fenômeno Jod-Basedow agudo; realizar iodo radioativo imediato."},{"id":"e","text":"TIA Tipo Mista; combinar iodo e cirurgia de urgência."}]', 'a', 
        'A TIA Tipo 2 ocorre pela toxicidade direta da Amiodarona aos tireócitos, causando uma inflamação destrutiva e liberação de hormônios pré-formados (similar a uma tireoidite subaguda). Caracteriza-se por bócio ausente e Doppler com fluxo reduzido. Por ser um processo inflamatório, o tratamento eficaz é a corticoterapia sistêmica. Diferencia-se do Tipo 1 (que ocorre em glândulas já alteradas e tem fluxo aumentado), que responde melhor a antitireoidianos.', '{"a":"Correta. Diagnóstico e tratamento da TIA Tipo 2.","b":"Incorreta. TIA Tipo 1 teria fluxo aumentado no Doppler.","c":"Incorreta. Wolff-Chaikoff é o bloqueio da tireoide por excesso de iodo (hipotireoidismo), não hipertireoidismo.","d":"Incorreta. Jod-Basedow é o Tipo 1, mas o tratamento inicial é clínico.","e":"Incorreta. Conduta desnecessariamente agressiva para o Tipo 2 isolado."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'o50xdi', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Amiodarona","Efeitos Colaterais","Doppler","Tireotoxicose"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-o50xdi', 'approved', 25)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q27 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-bn6vjr', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma mulher de 62 anos apresenta nódulo tireoidiano de 2,2 cm, sólido e hipoecoico. TSH sérico é de 0,1 mUI/L (suprimido). Qual o próximo passo obrigatório na investigação diagnóstica desta paciente?', '[{"id":"a","text":"Cintilografia de tireoide (captação e mapeamento) para verificar se o nódulo é ''quente'' ou ''frio''."},{"id":"b","text":"Realizar PAAF imediatamente, independente do TSH."},{"id":"c","text":"Dosagem de Calcitonina sérica."},{"id":"d","text":"Iniciar Levotiroxina para suprimir o nódulo."},{"id":"e","text":"Realizar Tomografia Cervical com contraste iodado."}]', 'a', 
        'Em pacientes com nódulo tireoidiano e TSH suprimido, a conduta inicial é a cintilografia. Nódulos ''quentes'' (hipercaptadores) são raramente malignos e a PAAF deve ser evitada iniciais nestes casos, pois a citologia pode ser inconclusiva. Se o nódulo for ''frio'' (não captador), procede-se à investigação com PAAF se os critérios ultrassonográficos forem preenchidos.', '{"a":"Correta. Algoritmo padrão de nódulo com TSH baixo.","b":"Incorreta. PAAF em nódulo tóxico (quente) pode gerar resultados falso-positivos/indeterminados.","c":"Incorreta. Calcitonina não é recomendada de rotina no rastreio inicial de todos os nódulos.","d":"Incorreta. A reposição pioraria o hipertireoidismo subclínico/clínico já existente.","e":"Incorreta. O contraste iodado interferiria em diagnósticos e tratamentos futuros da tireoide."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'bn6vjr', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Nódulo de Tireoide","TSH","Cintilografia","Algoritmo"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-bn6vjr', 'approved', 26)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q28 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-sam92i', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente de 40 anos, com quadro de dor súbita e intensa na região anterior do pescoço que irradia para a mandíbula e ouvidos, associada a febre mal-estar. No exame físico: tireoide extremamente dolorosa ao toque. TSH = 0,05 mUI/L e Velocidade de Hemossedimentação (VHS) = 90 mm/h. Qual o diagnóstico e o provável agente etiológico prévio?', '[{"id":"a","text":"Tireoidite Subaguda de Quervain (granulomatosa); infecção viral prévia (ex: IVAS)."},{"id":"b","text":"Tireoidite Piógena Aguda; Staphylococcus aureus."},{"id":"c","text":"Tireoidite de Hashimoto; autoimunidade crônica."},{"id":"d","text":"Tireoidite de Riedel; infiltração fibrosa idiopática."},{"id":"e","text":"Bócio Multinodular Tóxico; mutação no receptor de TSH."}]', 'a', 
        'A Tireoidite de Quervain é caracterizada por dor tireoidiana severa e marcadores inflamatórios sistêmicos elevados (VHS muito alto). É tipicamente precedida por uma infecção viral das vias aéreas superiores. Evolui com uma fase de tireotoxicose inicial (por destruição folicular), seguida de hipotireoidismo transitório e recuperação funcional.', '{"a":"Correta. Quadro clínico e auditivo clássico de ''dor na tireoide''.","b":"Incorreta. A aguda supurativa é rara, causa leucocitose com desvio e sinais infecciosos localizados graves (abscesso).","c":"Incorreta. Hashimoto costuma ser indolor.","d":"Incorreta. Riedel causa bócio ''lenhoso'' e endurecido, raramente doloroso agudamente.","e":"Incorreta. Bócio multinodular não cursa com dor aguda e VHS de 90."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'sam92i', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoidite Subaguda","Quervain","Dor Cervical","Inflamação"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-sam92i', 'approved', 27)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q29 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-n1dkds', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Sinal de Pemberton (distensão das veias do pescoço e face avermelhada ao elevar os braços) é indicativo de:', '[{"id":"a","text":"Bócio mergulhante (extratorácico) causando compressão das estruturas do estreito superior do tórax."},{"id":"b","text":"Hipoalbuminemia severa."},{"id":"c","text":"Paralisia bilateral de nervo laringeo recorrente."},{"id":"d","text":"Insuficiência cardíaca esquerda descompensada."},{"id":"e","text":"Tireoidite linfocítica subaguda em fase de remissão."}]', 'a', 
        'O sinal de Pemberton é uma manobra diagnóstica para bócio intratorácico (mergulhante). Quando o paciente eleva os braços, o bócio ''mergulha'' mais profundamente no estreito superior, comprimindo a veia cava superior ou estruturas venosas adjacentes, gerando pletora facial e turgência jugular.', '{"a":"Correta. Semiologia clássica do bócio endotorácico.","b":"Incorreta. Causaria edema, mas não o sinal de Pemberton postural.","c":"Incorreta. Causa estridor e insuficiência respiratória obstrutiva aguda.","d":"Incorreta. A turgência jugular é fixa e não depende da elevação dos membros superiores desta forma.","e":"Incorreta. Sem relação anatômica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'n1dkds', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bócio","Semiologia","Sinal de Pemberton","Endocrinologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-n1dkds', 'approved', 28)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q30 (Part 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4jpgd3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em um paciente com Carcinoma de Tireoide bem diferenciado (Papilífero ou Folicular), qual o critério laboratorial de cura definitiva após a tireoidectomia total e ablação com Radioiodo?', '[{"id":"a","text":"Níveis de Tireoglobulina (TG) indetectáveis sob estímulo de TSH e ultrassonografia cervical negativa."},{"id":"b","text":"TSH permanentemente suprimido abaixo de 0,01 mUI/L."},{"id":"c","text":"Anticorpo Anti-tireoglobulina (Anti-TG) em níveis extremamente altos."},{"id":"d","text":"Idade superior a 45 anos na época do diagnóstico."},{"id":"e","text":"Níveis de Calcitonina indetectáveis."}]', 'a', 
        'A Tireoglobulina é produzida exclusivamente por tecido tireoidiano (normal ou neoplásico funcional). Após a retirada completa da glândula e ablação do remanescente com iodo, a presença de qualquer nível de TG indica persistência ou recorrência de doença. A cura é definida pela TG indetectável associada a exames de imagem (USG) limpos.', '{"a":"Correta. Marcador tumoral ideal para seguimento pós-tratamento radical.","b":"Incorreta. A supressão do TSH é parte do tratamento, não critério de cura clínica.","c":"Incorreta. O anti-TG deve estar baixo ou ausente, pois sua presença invalida a dosagem de TG por interferência metodológica.","d":"Incorreta. A idade é fator prognóstico no TNM, não critério de cura laboratorial.","e":"Incorreta. Calcitonina é marcador do carcinoma medular, não do diferenciado."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4jpgd3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Câncer de Tireoide","Tireoglobulina","Seguimento","Oncologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4jpgd3', 'approved', 29)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q31 (Part 2)
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
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-g1rqn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal indicação de cirurgia de urgência em um bócio multinodular não-tóxico é:', '[{"id":"a","text":"Instalação de sinais de insuficiência respiratória obstrutiva aguda por compressão traqueal."},{"id":"b","text":"Ganho de 2 kg de peso no último mês."},{"id":"c","text":"Desejo do paciente de remover o nódulo antes de uma viagem."},{"id":"d","text":"Aumento leve da Tireoglobulina isolado."},{"id":"e","text":"Presença de rouquidão antiga estável."}]', 'a', 
        'Bócios volumosos ou intratorácicos podem crescer de forma a desviar ou comprimir a traqueia (traqueomalácia), reduzindo o lúmen respiratório. A ocorrência de estridor ou dispneia de decúbito configura indicação absoluta e urgente para descompressão cirúrgica.', '{"a":"Correta. Única urgência real dentre as opções.","b":"Incorreta. Inespecífico.","c":"Incorreta. Motivação eletiva.","d":"Incorreta. TG não é marcador de urgência.","e":"Incorreta. Rouquidão estável deve ser investigada para câncer, mas não é urgência imediata."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'g1rqn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bócio","Urgência","Compressão Traqueal","Manejo"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-g1rqn', 'approved', 60)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q62 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-rbxtkp', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No hipotireoidismo agudo severo (Coma Mixedematoso), além da reposição hormonal, qual suporte hematológico ou metabólico deve ser avaliado devido à diminuição do estímulo da eritropoiese e lentidão medular?', '[{"id":"a","text":"Avaliação de Anemia Normocítica (pela falta de hormônio tireoidiano) e Hipoglicemia."},{"id":"b","text":"Tratamento de Poliglobulia severa."},{"id":"c","text":"Reposição de Ferro endovenoso profilático em todos os casos."},{"id":"d","text":"Uso de anticoagulantes para tratar anemia falciforme associada."},{"id":"e","text":"Transfusão de granulócitos."}]', 'a', 
        'Hormônios tireoidianos são necessários para a eritropoiese adequada e para o metabolismo da glicose. O coma mixedematoso frequentemente cursa com anemia e hipoglicemia, que devem ser corrigidas juntamente com a hipotermia e o hipotireoidismo severo.', '{"a":"Correta. Suporte metabólico/hematológico no coma.","b":"Incorreta. Mixedema causa anemia, não poliglobulia.","c":"Incorreta. Deve-se diagnosticar a causa da anemia antes; a causa hormonal resolve com L-T4.","d":"Incorreta. Não existe essa associação patogênica direta.","e":"Incorreta. Despropositado."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'rbxtkp', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Coma Mixedematoso","Hematologia","Anemia","Metabolismo"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-rbxtkp', 'approved', 61)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q63 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-qf9yba', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 48 anos com Doença de Graves apresenta agranulocitose (neutrófilos < 500/mm³) após 20 dias de uso de Metimazol. Qual a conduta correta?', '[{"id":"a","text":"Suspender o Metimazol permanentemente, internar o paciente para vigilância de sepse e contraindicar o uso de Propiltiomacil."},{"id":"b","text":"Reduzir a dose pela metade e repetir o hemograma."},{"id":"c","text":"Trocar por Propiltiomacil em dose dobrada."},{"id":"d","text":"Manter a medicação e associar fator estimulador de colônias de granulócitos (G-CSF) ambulatorialmente."},{"id":"e","text":"Suspender apenas se houver febre persistente por mais de 10 dias."}]', 'a', 
        'A agranulocitose é o efeito colateral mais temido e grave das tionamidas (Metimazol/PTU). Ocorre por mecanismo imune e geralmente é cross-reactive (se ocorreu com um, pode ocorrer com o outro). A suspensão deve ser definitiva e absoluta; o tratamento agora deve ser focado em iodo radioativo ou cirurgia após estabilização.', '{"a":"Correta. Condutda padrão de segurança absoluta.","b":"Incorreta. Risco de óbito por sepse neutropênica.","c":"Incorreta. Prática perigosa devido à reatividade cruzada.","d":"Incorreta. O fármaco deve ser retirado imediatamente da circulação.","e":"Incorreta. A presença de agranulocitose laboratorial já exige interrupção."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'qf9yba', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Agranulocitose","Metimazol","Segurança Farmacológica","Hematologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-qf9yba', 'approved', 62)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q64 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-khnscu', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A maioria dos guias recomenda que a PAAF de tireoide não seja realizada em nódulos menores que:', '[{"id":"a","text":"1,0 cm, a menos que existam características ecográficas de alta suspeição ou fatores de risco (ex: história familiar ou radiação)."},{"id":"b","text":"0,5 cm em qualquer circunstância."},{"id":"c","text":"3,0 cm, devido ao baixo risco de metástases."},{"id":"d","text":"Qualquer tamanho; PAAF deve ser feita em todos os nódulos detectáveis."},{"id":"e","text":"Apenas se o nódulo for palpável no exame físico."}]', 'a', 
        'O diagnóstico de microcarcinomas papilíferos (< 1cm) frequentemente não altera o prognóstico ou a conduta (muitos podem ser apenas observados). Diretrizes da ATA e da SBEM sugerem o corte de 1 cm para indicação de PAAF na maioria dos nódulos, visando evitar sobrediagnóstico e sobretratamento.', '{"a":"Correta. Regra geral baseada em evidência e custo-efetividade.","b":"Incorreta. Nódulos < 1cm geralmente são seguidos e não puncionados.","c":"Incorreta. Nódulos entre 1 e 3 cm devem ser investigados.","d":"Incorreta. Geraria excesso de procedimentos desnecessários.","e":"Incorreta. Muitos nódulos não palpáveis são detectados pelo USG e exigem PAAF."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'khnscu', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PAAF","Diretrizes","Nódulo de Tireoide","Microcarcinoma"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-khnscu', 'approved', 63)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q65 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-zdsbfk', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Na vigência do ''Fenômeno de Jod-Basedow'', o hipertireoidismo é desencadeado por qual fator?', '[{"id":"a","text":"Pelo excesso de oferta de iodo em uma glândula que já possui autonomia funcional (ex: bócio multinodular ou adenoma autônomo)."},{"id":"b","text":"Pela destruição autoimune aguda dos folículos."},{"id":"c","text":"Pela falta absoluta de selênio."},{"id":"d","text":"Por estresse psicológico extremo."},{"id":"e","text":"Por picada de insetos em áreas endêmicas."}]', 'a', 
        'O Jod-Basedow ocorre quando um aporte súbito de iodo (contraste radiological, amiodarona ou suplementos) ''alimenta'' zonas da tireoide que não estão sob controle do TSH (nódulos autônomos), resultando na síntese e liberação excessiva de hormônios. Diferencia-se do Wolff-Chaikoff que é o oposto (bloqueio por excesso).', '{"a":"Correta. Fisiopatologia da tireotoxicose induzida por iodo.","b":"Incorreta. Descreve tireoidites.","c":"Incorreta. Selênio atua na conversão periférica e proteção oxidativa, não no Jod-Basedow.","d":"Incorreta. O fator é químico (iodo).","e":"Incorreta. Sem relação."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'zdsbfk', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Jod-Basedow","Iodo","Hipertireoidismo","Fisiologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-zdsbfk', 'approved', 64)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q66 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-1dz2ji', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal vantagem da realização da PAAF guiada por ultrassonografia em comparação à técnica manual (palpatória)?', '[{"id":"a","text":"Aumenta a acurácia diagnóstica ao garantir que o material foi coletado da área sólida de maior suspeição e reduz a taxa de amostras inadequadas."},{"id":"b","text":"Elimina a dor do procedimento."},{"id":"c","text":"Permite que qualquer pessoa realize o exame sem treinamento."},{"id":"d","text":"Substitui a necessidade de biópsia cirúrgica em todos os casos de Bethesda IV."},{"id":"e","text":"Nenhuma; a técnica manual é superior pela sensibilidade tátil."}]', 'a', 
        'A USG permite visualizar a ponta da agulha dentro do nódulo, focando em componentes sólidos e suspeitos de nódulos mistos, além de permitir o acesso a nódulos profundos ou não palpáveis. Reduz significativamente a taxa de material insuficiente.', '{"a":"Correta. Fundamento da prática radiológica/endocrinológica moderna.","b":"Incorreta. A agulha ainda penetra os tecidos, gerando desconforto similar.","c":"Incorreta. Exige treinamento em ultrassonografia e punção.","d":"Incorreta. Bethesda IV continua exigindo cirurgia/molecular.","e":"Incorreta. A manual tem taxas de erro e insuficiência muito maiores."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '1dz2ji', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PAAF","Ultrassonografia","Diagnóstico","Tireoide"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-1dz2ji', 'approved', 65)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q67 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-782vx9', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma paciente de 34 anos apresenta TSH = 0,02 mUI/L e T4 livre = 1,4 ng/dL (normal). Refere bócio volumoso diagnosticado há 5 anos. Ela apresenta hipertireoidismo:', '[{"id":"a","text":"Subclínico."},{"id":"b","text":"Central."},{"id":"c","text":"Factício."},{"id":"d","text":"Franco."},{"id":"e","text":"Terciário."}]', 'a', 
        'Define-se hipertireoidismo subclínico pela presença de TSH suprimido (abaixo do limite inferior da referência) associado a níveis normais de hormônios tireoidianos livres (T4 e T3). É comum em bócio multinodular antigo por autonomia de alguns nódulos.', '{"a":"Correta. Definição bioquímica laboratorial.","b":"Incorreta. Central teria TSH baixo com T4 livre também baixo.","c":"Incorreta. Factício resultaria no mesmo perfil, mas a história de bócio volumoso sugere causa endógena.","d":"Incorreta. Franco exigiria T4 ou T3 livres elevados.","e":"Incorreta. Terciário refere-se à falha hipotalâmica (hipotireoidismo)."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '782vx9', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipertireoidismo Subclínico","TSH","Laboratório","Endocrinologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-782vx9', 'approved', 66)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q68 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-m7n33q', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A deficiência de iodo, embora rara em áreas com sal iodado, continua sendo a causa mais comum de bócio no mundo. Qual o mecanismo de formação do bócio nesta situação?', '[{"id":"a","text":"Aumento mantido do TSH em resposta aos níveis baixos de T4, levando à hiperplasia e hipertrofia dos tireócitos."},{"id":"b","text":"Acúmulo de gordura intraglandular."},{"id":"c","text":"Infiltração por macrófagos gigantes."},{"id":"d","text":"Hipercalcemia mimetizando bócio."},{"id":"e","text":"Infeção por parasitas que consomem iodo no duodeno."}]', 'a', 
        'Com pouco iodo, a tireoide produz menos T4. A hipófise detecta isso e aumenta o TSH para tentar estimular a glândula. O TSH crônico atua como fator de crescimento, causando o aumento de volume glandular (bócio) para otimizar a extração do pouco iodo disponível no sangue.', '{"a":"Correta. Mecanismo fisiológico adaptativo/patológico básico.","b":"Incorreta. É hiperplasia de células foliculares, não gordura.","c":"Incorreta. Padrão de tireoidites, não de bócio carencial.","d":"Incorreta. Hipotira não causa hipercalcemia.","e":"Incorreta. Totalmente sem fundamento."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'm7n33q', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bócio Endêmico","Iodo","TSH","Fisiologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-m7n33q', 'approved', 67)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q69 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-hzrsef', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual dos seguintes tumores de tireoide não se origina das células foliculares?', '[{"id":"a","text":"Carcinoma Medular."},{"id":"b","text":"Carcinoma Papilífero."},{"id":"c","text":"Carcinoma Folicular."},{"id":"d","text":"Adenoma Folicular."},{"id":"e","text":"Carcinoma de Células de Hürthle."}]', 'a', 
        'O Carcinoma Medular de Tireoide (CMT) origina-se das células C (ou parafoliculares), que produzem calcitonia. Todos os outros citados derivam do epitélio folicular tireoidiano.', '{"a":"Correta. Origem citológica distinta (Células C).","b":"Incorreta. Célula folicular.","c":"Incorreta. Célula folicular.","d":"Incorreta. Célula folicular.","e":"Incorreta. Célula folicular (variante oncocítica)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hzrsef', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Câncer de Tireoide","Carcinoma Medular","Células C","Oncologia"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-hzrsef', 'approved', 68)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q70 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-r7cvn0', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um achado de macroglossia em um recém-nascido, associado a choro rouco, hérnia umbilical e icterícia neonatal prolongada, é sugestivo de:', '[{"id":"a","text":"Hipotireoidismo Congênito."},{"id":"b","text":"Hipertrofia de piloro."},{"id":"c","text":"Fibrose Cística."},{"id":"d","text":"Encefalite Viral."},{"id":"e","text":"Infecção por Citomegalovírus."}]', 'a', 
        'Essas são as manifestações clássicas do hipotireoidismo congênito severo (cretinismo) em neonatos. A macroglossia ocorre pelo acúmulo de glicosaminoglicanos (mixedema) na língua.', '{"a":"Correta. Clínica pediátrica viga-mestra.","b":"Incorreta. Causa vômitos em jato.","c":"Incorreta. Causa íleo meconial.","d":"Incorreta. Causa convulsões e febre.","e":"Incorreta. Causa microcefalia e calcificações cerebrais."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'r7cvn0', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Congênito","Semiologia Pediátrica","Pediatria","Saúde Infantil"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-r7cvn0', 'approved', 69)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q71 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-2nzrau', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A dosagem de anticorpos contra o receptor de TSH (TRAb) é útil em qual situação clínica?', '[{"id":"a","text":"No diagnóstico da Doença de Graves e na avaliação do risco de hipertireoidismo neonatal em gestantes com Graves."},{"id":"b","text":"Para diferenciar câncer papilífero de folicular."},{"id":"c","text":"Somente após a retirada total da tireoide em casos de bócio amiloide."},{"id":"d","text":"Para monitorar o uso de Amiodarona."},{"id":"e","text":"Para rastrear depressão em adolescentes."}]', 'a', 
        'O TRAb é o anticorpo estimulador patogênico da Doença de Graves. Sua dosagem confirma o diagnóstico etiológico do hipertireoidismo. Em gestantes, níveis muito elevados de TRAb (IgG que atravessa a placenta) indicam risco de o feto nascer com tireotoxicose neonatal transitória.', '{"a":"Correta. Indicação clínica principal do marcador.","b":"Incorreta. Sem papel no câncer Diferenciado.","c":"Incorreta. Sem relação.","d":"Incorreta. Amiodarona monitora-se com TSH/L-T4/T3.","e":"Incorreta. Sem nexo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '2nzrau', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TRAb","Graves","Gestação","Hipertireoidismo Neonatal"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-2nzrau', 'approved', 70)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q72 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-3pyrdl', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual dos seguintes medicamentos não interfere na absorção de Levotiroxina (L-T4) se tomados simultaneamente?', '[{"id":"a","text":"Vitamina C (em doses normais)."},{"id":"b","text":"Sulfato Ferroso."},{"id":"c","text":"Carbonato de Cálcio."},{"id":"d","text":"Inibidores de Bomba de Prótons (Omeprazol)."},{"id":"e","text":"Colestiramina."}]', 'a', 
        'A Vitamina C na verdade cria um ambiente ácido que pode ajudar na absorção da L-T4. Ferro, Cálcio, Omeprazol (que reduz a acidez gástrica) e resinas de troca (Colestiramina) prejudicam significativamente a absorção da medicação, exigindo intervalo de pelo menos 4 horas.', '{"a":"Correta. Não interfere negativamente; pode até favorecer.","b":"Incorreta. Grande interferente gástrico.","c":"Incorreta. Grande interferente gástrico.","d":"Incorreta. A hipocloridria reduz a solubilização do comprimido de L-T4.","e":"Incorreta. Sequestrante de ácidos biliares que prende o hormônio no lúmen intestinal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '3pyrdl', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Interação Medicamentosa","Levotiroxina","Absorção","Hipotireoidismo"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-3pyrdl', 'approved', 71)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q73 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ol3aey', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em pacientes com Carcinoma Medular de Tireoide hereditário (NEM 2), qual a conduta profilática recomendada para crianças que portam mutações de alto risco no proto-oncogene RET?', '[{"id":"a","text":"Tireoidectomia total profilática (muitas vezes antes dos 5 anos ou até no primeiro ano de vida, dependendo do codon mutado)."},{"id":"b","text":"Apenas observação semestral com ultrassonografia."},{"id":"c","text":"Uso de iodo radioativo preventivo."},{"id":"d","text":"Dieta pobre em cálcio."},{"id":"e","text":"Realizar apenas biópsias anuais de pele."}]', 'a', 
        'Devido à penetrância quase completa do Carcinoma Medular na NEM 2 e ao seu comportamento agressivo em crianças, a tireoidectomia profilática é o padrão de cuidado. O momento exato da cirurgia é guiado pelo risco específico associado à mutação do gene RET identificada no rastreio genético familiar.', '{"a":"Correta. Conduta preventiva viga-mestra na oncogenética.","b":"Incorreta. Risco de metástases precoces é inaceitável.","c":"Incorreta. O carcinoma medular não capta iodo radioativo.","d":"Incorreta. Sem efeito no câncer.","e":"Incorreta. Sem relação com a tireoide."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'ol3aey', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["RET","Carcinoma Medular","Tireoidectomia Profilática","NEM 2"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ol3aey', 'approved', 72)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q74 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8xdbc3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A cintilografia com Sestamibi (MIBI) é frequentemente utilizada em qual contexto de doença tireoidiana/paratireoidiana?', '[{"id":"a","text":"Localização de glândulas paratireoides hiperfuncionantes (adenomas de paratireoide)."},{"id":"b","text":"Avaliação de bócio lingual apenas."},{"id":"c","text":"Tratamento de câncer anaplásico."},{"id":"d","text":"Mapeamento de linfonodos axilares."},{"id":"e","text":"Rastreio de feocromocitoma."}]', 'a', 
        'O MIBI é captado tanto pela tireoide quanto pelas paratireoides, mas o wash-out (lavagem) é mais lento nas paratireoides hiperativas. Assim, imagens tardias de cintilografia com MIBI permitem localizar adenomas de paratireoide em pacientes com hiperparatireoidismo primário.', '{"a":"Correta. Principal uso desta técnica de imagem.","b":"Incorreta. Iodo ou Tecnécio são melhores.","c":"Incorreta. Não é terapia.","d":"Incorreta. Linfoscintilografia usa outros radiotraçadores.","e":"Incorreta. Usa-se MIBG para feocromocitoma."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8xdbc3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Sestamibi","Paratireoide","Hiperparatireoidismo","Imagem"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8xdbc3', 'approved', 73)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q75 (Part 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9qsqwp', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O hormônio T3 (triiodotironina) é aproximadamente quantas vezes mais potente que o T4 (tiroxina) no receptor nuclear?', '[{"id":"a","text":"3 a 4 vezes."},{"id":"b","text":"100 vezes."},{"id":"c","text":"Igual potência."},{"id":"d","text":"Meia potência do T4."},{"id":"e","text":"O T3 não tem potência; é inativo."}]', 'a', 
        'O T4 é considerado um pro-hormônio. A maior parte das ações biológicas ocorre via T3, que possui uma afinidade pelo receptor nuclear tireoidiano cerca de 3 a 4 vezes maior que a do T4 e age de forma muito mais rápida. Por isso a conversão periférica por deiodinases é tão crucial.', '{"a":"Correta. Fundamento da fisiologia tireoidiana.","b":"Incorreta. Excesso sugerido.","c":"Incorreta. T3 é muito mais ativo.","d":"Incorreta. Contradição biológica.","e":"Incorreta. O T3 reverso que é inativo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '9qsqwp', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Fisiologia","T3","T4","Receptores"],"batch":3}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9qsqwp', 'approved', 74)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q76 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-1zxy3s', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um homem de 65 anos com história de Doença de Graves tratada com Radioiodo (I-131) há 10 anos, atualmente em reposição de Levotiroxina, apresenta-se com fadiga e fraqueza. TSH = 0,05 mUI/L e T4 Livre = 1,2 ng/dL. Ele revela estar tomando altas doses de Biotina (Vitamina B7) para fortalecimento capilar. Como a Biotina interfere nos ensaios laboratoriais de tireoide baseados em estreptavidina-biotina?', '[{"id":"a","text":"Provoca um falso-positivo para hipertireoidismo (TSH falsamente baixo e hormônios livres falsamente elevados)."},{"id":"b","text":"Provoca um falso-positivo para hipotireoidismo (TSH elevado e T4 baixo)."},{"id":"c","text":"Inativa o hormônio T4 livre no sangue periférico."},{"id":"d","text":"Aumenta a absorção intestinal da Levotiroxina."},{"id":"e","text":"Nenhuma das anteriores; a biotina não interfere em exames hormonais de rotina."}]', 'a', 
        'A biotina em altas doses interfere competitivamente em imunoensaios que utilizam o sistema biotina-estreptavidina. Em ensaios ''sanduíche'' (como o TSH), ela gera um resultado falsamente baixo. Em ensaios competitivos (como T4 e T3 livres), ela gera um resultado falsamente elevado. Isso mimetiza laboratorialmente um quadro de hipertireoidismo em um paciente que pode estar eutireoidiano.', '{"a":"Correta. Mecanismo de interferência laboratorial clássico e frequente.","b":"Incorreta. Causaria o contrário.","c":"Incorreta. A interferência é ''in vitro'' (no ensaio), não ''in vivo''.","d":"Incorreta. Não afeta a absorção.","e":"Incorreta. É um aviso regulatório importante do FDA e sociedades de endocrinologia."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '1zxy3s', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Biotina","Interferência Laboratorial","TSH","Diagnóstico"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-1zxy3s', 'approved', 75)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q77 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-dpfih7', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'De acordo com as diretrizes da American Thyroid Association (ATA 2015), qual o alvo ideal de TSH para o seguimento de longo prazo em um paciente com câncer diferenciado de tireoide de BAIXO RISCO que apresenta resposta excelente ao tratamento inicial (TG indetectável e USG limpo)?', '[{"id":"a","text":"TSH entre 0,5 e 2,0 mUI/L (faixa de referência normal baixo)."},{"id":"b","text":"TSH permanentemente suprimido < 0,1 mUI/L."},{"id":"c","text":"TSH suprimido entre 0,1 e 0,5 mUI/L."},{"id":"d","text":"TSH entre 5,0 e 10,0 mUI/L."},{"id":"e","text":"Não há alvo, deve-se apenas monitorar a tireoglobulina."}]', 'a', 
        'Para pacientes de baixo risco com resposta excelente ao tratamento, o risco de recorrência é muito baixo (< 1%). Manter a supressão do TSH (que pode causar arritmias e osteoporose em idosos) não traz benefícios oncológicos superiores. O alvo deve ser normalizado para a faixa de referência (0,5 a 2,0 mUI/L).', '{"a":"Correta. Recomendação atual para reduzir efeitos colaterais da tiroxina em pacientes de baixo risco.","b":"Incorreta. Reservado para pacientes de alto risco ou com doença persistente estrutural.","c":"Incorreta. Alvo para pacientes de risco intermediário ou baixo risco com resposta inconclusiva.","d":"Incorreta. Hipotireoidismo subclínico indesejado.","e":"Incorreta. O TSH deve ser guiado por metas baseadas em risco."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'dpfih7', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["ATA 2015","Câncer de Tireoide","Supressão de TSH","Seguimento"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-dpfih7', 'approved', 76)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q78 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ygdvn0', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Paralisia Periódica Hipocalêmica Tireotóxica'' é uma complicação rara do hipertireoidismo, mais frequente em homens jovens de ascendência asiática ou latina. Qual o evento fisiopatológico que deflagra a fraqueza muscular aguda nestes pacientes?', '[{"id":"a","text":"Entrada maciça de potássio para o meio intracelular induzida pelo excesso de catecolaminas e hormônio tireoidiano, mediada pela bomba Na+/K+-ATPase."},{"id":"b","text":"Destruição autoimune da placa motora."},{"id":"c","text":"Perda urinária excessiva de potássio."},{"id":"d","text":"Dano direto do iodo às fibras musculares estriadas."},{"id":"e","text":"Insuficiência renal aguda isquêmica."}]', 'a', 
        'O estado tireotóxico aumenta a atividade e sensibilidade da bomba Na+/K+-ATPase. Gatilhos como refeições ricas em carboidratos (via insulina) ou estresse físico (catecolaminas) causam um influxo abrupto de potássio para dentro das células musculares, resultando em hipocalemia extracelular severa e paralisia arrefléxica temporária.', '{"a":"Correta. Mecanismo de deslocamento (''shift'') intracelular de potássio.","b":"Incorreta. Descreve Miastenia Gravis, que também pode associar-se ao Graves, mas a fisiopatologia é diferente.","c":"Incorreta. O potássio corporal total é normal, está apenas mal distribuído.","d":"Incorreta. O iodo não ataca o músculo diretamente.","e":"Incorreta. Sem relação."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'ygdvn0', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Paralisia Periódica","Hipocalemia","Hipertireoidismo","Fisiopatologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ygdvn0', 'approved', 77)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q79 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-r12l3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No diagnóstico do hipotireoidismo subclínico, após detectar um TSH elevado (> 4,5 e < 10) com T4 livre normal, qual a recomendação para confirmar o diagnóstico e evitar tratamentos transitórios desnecessários?', '[{"id":"a","text":"Repetir o TSH e o T4 livre após 3 a 6 meses de observação clínica."},{"id":"b","text":"Iniciar tratamento imediato em todos os pacientes acima de 65 anos."},{"id":"c","text":"Realizar cintilografia de urgência."},{"id":"d","text":"Dosar IGF-1 e Prolactina."},{"id":"e","text":"Realizar biópsia core da glândula tireoide."}]', 'a', 
        'O TSH é um hormônio pulsátil e pode ter elevações transitórias por estresse, doenças recentes ou erros de laboratório. O diagnóstico de hipotireoidismo subclínico exige a persistência da alteração laboratorial em exames repetidos com intervalo de meses, a menos que o TSH seja muito elevado (> 10) ou existam sintomas severos.', '{"a":"Correta. Prática recomendada para evitar o sobrediagnóstico.","b":"Incorreta. Idosos (> 65-70 anos) têm faixas de TSH fisiologicamente maiores; deve-se ter cautela em tratá-los no subclínico leve.","c":"Incorreta. Sem indicação no hipotireoidismo.","d":"Incorreta. Sem relação diagnóstica.","e":"Incorreta. Procedimento invasivo sem nexo diagnóstico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'r12l3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Subclínico","Diagnóstico","Laboratório","Follow-up"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-r12l3', 'approved', 78)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q80 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-1xczu2', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma Médio-celular ''Variante de Células de Hürthle'' é atualmente classificado como um subtipo independente pelo WHO. Em relação ao Carcinoma Folicular de Tireoide clássico, o Carcinoma de Células de Hürthle (CCH) caracteriza-se por:', '[{"id":"a","text":"Maior taxa de metástases linfonodais e menor captação de Radioiodo (I-131)."},{"id":"b","text":"Ser puramente benigno em 100% dos casos."},{"id":"c","text":"Originar-se das células C parafoliculares."},{"id":"d","text":"Responder agressivamente à quimioterapia convencional baseada em platina."},{"id":"e","text":"Nunca causar invasão vascular periférica."}]', 'a', 
        'O Carcinoma de Células de Hürthle (Oncocítico) é mais agressivo que o folicular clássico, apresentando maior tendência à disseminação linfática (além da hematogênica) e frequentemente é não-avante (pobre captação de iodo), dificultando o tratamento com radioiodo e aumentando a importância de cirurgia radical inicial.', '{"a":"Correta. Características biológicas específicas do tumor oncocítico.","b":"Incorreta. A forma benigna é o Adenoma de Células de Hürthle; a maligna existe e é invasiva.","c":"Incorreta. Origina-se das células foliculares (variante rica em mitocôndrias).","d":"Incorreta. Pouco responsivo a quimioterapia.","e":"Incorreta. Invasão vascular é, junto com a capsular, o critério de malignidade."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '1xczu2', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Células de Hürthle","Oncologia","Diagnóstico","Patologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-1xczu2', 'approved', 79)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q81 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-enrqtt', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A dosagem de Calcitonina sérica é recomendada prioritariamente em qual destas situações Clínicas?', '[{"id":"a","text":"Em familiares de primeiro grau de pacientes com Carcinoma Medular de Tireoide e no rastreio pré-operatório de nódulos Bethesda V/VI em alguns centros."},{"id":"b","text":"No seguimento de todos os casos de hipotireoidismo primário."},{"id":"c","text":"Para diferenciar bócio multinodular de bócio difuso tóxico."},{"id":"d","text":"Sempre que o TSH estiver acima de 10 mUI/L."},{"id":"e","text":"Como marcador de absorção de cálcio no osso."}]', 'a', 
        'A Calcitonina é o marcador tumoral sensível do Carcinoma Medular de Tireoide (CMT). É utilizada no rastreio genético (associado ao RET) de familiares e em alguns algoritmos para avaliar nódulos suspeitos antes da cirurgia, pois níveis elevados indicam a presença de CMT que exige técnica cirúrgica específica (esvaziamento central).', '{"a":"Correta. Principal uso clínico oncológico.","b":"Incorreta. Hashimoto não produz calcitonina em excesso.","c":"Incorreta. Sem relação com bócio e iodo.","d":"Incorreta. Não substitui o T4 livre.","e":"Incorreta. Embora a fisiologia envolva o cálcio, ela não é marcador clínico de densitometria ou metabolismo ósseo de rotina."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'enrqtt', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Calcitonina","CMT","Oncologia","Rastreio"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-enrqtt', 'approved', 80)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q82 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ufa3mt', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 40 anos com síndrome nefrótica em atividade severa pode apresentar quais alterações nos exames de funções tireoidianas, mesmo sendo clinicamente eutireoidiano?', '[{"id":"a","text":"T4 Total baixo devido à perda urinária massiva de Proteína Transportadora de Tiroxina (TBG), mas TSH e T4 livre normais."},{"id":"b","text":"Falso-positivo para hipertireoidismo severo."},{"id":"c","text":"Aumento compensatório de anticorpos anti-TPO."},{"id":"d","text":"TSH permanentemente elevado simulando insuficiência hipofisária."},{"id":"e","text":"Calcificações tireoidianas bilaterais."}]', 'a', 
        'Na síndrome nefrótica, a proteinúria maciça inclui a perda de TBG (globulina ligadora de tiroxina). Como o T4 Total mede o hormônio ligado (que é 99,9%), sua concentração sérica cairá drasticamente. No entanto, a fração metabólica ativa (T4 Livre) permanece regulada pelo eixo hipotálamo-hipofisário, mantendo o eutireoidismo real.', '{"a":"Correta. Fisiopatologia da perda proteica urinária afetando a tireoide.","b":"Incorreta. O T4 livre não sobe nesta condição.","c":"Incorreta. Sem relação.","d":"Incorreta. O TSH seria o oposto se houvesse hipotireoidismo.","e":"Incorreta. Sem base clínica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ufa3mt', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TBG","Síndrome Nefrótica","T4 Total","Clínica Médica"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ufa3mt', 'approved', 81)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q83 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-z9x7l5', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal complicação metabólica a longo prazo do hipertireoidismo NÃO tratado ou da supressão excessiva de TSH (iatrogênica) em mulheres pós-menopausa?', '[{"id":"a","text":"Aumento do remodelamento ósseo com perda de massa óssea (Osteoporose)."},{"id":"b","text":"Diabetes Mellitus tipo 1 fulminante."},{"id":"c","text":"Obesidade mórbida de padrão central."},{"id":"d","text":"Hipocalcemia crônica por esgotamento."},{"id":"e","text":"Síndrome de Cushing tireoidiana."}]', 'a', 
        'O excesso de hormônio tireoidiano estimula a atividade dos osteoclastos, acelerando o ciclo de remodelamento ósseo de tal forma que a reabsorção supera a formação. Isso leva à desmineralização óssea progressiva e osteoporose, aumentando significativamente o risco de fraturas por fragilidade.', '{"a":"Correta. Complicação endócrina crônica fundamental.","b":"Incorreta. O hipertireoidismo altera a tolerância à glicose, mas não causa DM1 autoimune por si só.","c":"Incorreta. Ocorre perda de peso dramática no hipertireoidismo.","d":"Incorreta. Na verdade, pode haver uma tendência à hipercalcemia leve devido à reabsorção óssea.","e":"Incorreta. Terminologia inexistente."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'z9x7l5', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Osteoporose","Hipertireoidismo","TSH","Menopausa"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-z9x7l5', 'approved', 82)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q84 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-mhuog3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente de 25 anos apresenta quadro clínico de nervosismo, perda ponderal e tremores finos de mãos. TSH = 0,01 mUI/L, T4 livre = 4,2 ng/dL, captação de iodo de 24h = 45%. Cintilografia mostra ''captação homogênea e difusa''. Qual o diagnóstico mais provável e a causa dos sintomas oculares frequentes?', '[{"id":"a","text":"Doença de Graves; autoimunidade com anticorpos estimuladores."},{"id":"b","text":"Bócio multinodular tóxico por mutação genética."},{"id":"c","text":"Tireoidite silente pós-parto."},{"id":"d","text":"Dano por iodo exógeno (Jod-Basedow)."},{"id":"e","text":"Adenoma hipofisário produtor de TSH."}]', 'a', 
        'A tríade de hipertireoidismo laboratorial, bócio difuso e captação de iodo aumentada em toda a glândula é clássica da Doença de Graves. Os sintomas extra-orbitários (proptose) são devidos aos linfócitos T que infiltram os tecidos orbitários e atacam receptores comuns ao TSH na gordura e músculo ocular.', '{"a":"Correta. Diagnóstico e fisiopatologia típicos.","b":"Incorreta. A captação seria heterogênea (nódulos ''quentes'' e ''frios'').","c":"Incorreta. A captação de iodo seria muito baixa (< 2%) numa tireoidite.","d":"Incorreta. Geralmente associada a nódulos pré-existentes.","e":"Incorreta. O TSH estaria elevado ou inapropriadamente normal, não suprimido."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'mhuog3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Graves","Cintilografia","Hipertireoidismo","Autoimunidade"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-mhuog3', 'approved', 83)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q85 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-lcpsjj', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A fase inicial do coma mixedematoso exige tratamento agressivo. Qual a ordem prioritária de tratamento?', '[{"id":"a","text":"Suporte ventilatório, hidratação aquecida, glicocorticoide endovenoso e reposição de hormônio tireoidiano (venoso se disponível)."},{"id":"b","text":"Iodo radioativo imediato seguido de cirurgia."},{"id":"c","text":"Apenas observação para evitar taquicardia induzida."},{"id":"d","text":"Betabloqueadores em doses altas para controle da pressão severa."},{"id":"e","text":"Uso de gelo local em tronco para reduzir o metabolismo celular."}]', 'a', 
        'O coma mixedematoso é uma emergência crítica. O tratamento envolve: 1) Suporte de funções vitais (respiração/pressão); 2) Aquecimento passivo/gradual; 3) Glicocorticoide (preventivo para insuficiência adrenal concomitante); 4) L-T4 (pode ser associada com L-T3 em alguns protocolos), preferencialmente EV para garantir biodisponibilidade no paciente em choque.', '{"a":"Correta. Protocolo de emergência endócrina padrão.","b":"Incorreta. Totalmente contraindicado.","c":"Incorreta. Risco de morte é de 30 a 60% se não tratado.","d":"Incorreta. Agrava a bradicardia severa do mixedema.","e":"Incorreta. Paciente já está hipotérmico; deve ser aquecido."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'lcpsjj', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Coma Mixedematoso","Emergência","L-T4","Hidrocortisona"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-lcpsjj', 'approved', 84)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q86 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-nzp5vn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual hormônio da tireoide é capaz de cruzar a placenta em quantidades clinicamente significativas e é fundamental para o desenvolvimento cerebral fetal nas primeiras 12 semanas de vida (antes da tireoide fetal ser funcional)?', '[{"id":"a","text":"T4 (Tiroxina)."},{"id":"b","text":"TSH."},{"id":"c","text":"T3 Reverso."},{"id":"d","text":"Tiroglobulina."},{"id":"e","text":"Nenhum; o feto produz seus próprios hormônios desde o primeiro dia de concepção."}]', 'a', 
        'Nas primeiras 10 a 12 semanas, a tireoide fetal ainda não está formada. O desenvolvimento cerebral do feto depende exclusivamente da tiroxina materna (T4) que cruza a placenta. Por isso, a manutenção do eutireoidismo materno no 1º trimestre é tão vital.', '{"a":"Correta. Papel biológico crucial na gestação.","b":"Incorreta. TSH não atravessa a placenta.","c":"Incorreta. É inativo e não tem papel pro-hormoneal fetal.","d":"Incorreta. É uma proteína grande que não cruza a barreira placentária.","e":"Incorreta. A tireoide fetal só começa a concentrar iodo e produzir hormônios por volta da 12ª semana."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nzp5vn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Gravidez","Desenvolvimento Fetal","T4","Embriologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-nzp5vn', 'approved', 85)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q87 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-1s9dy3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoidite Após-Parto'' é uma forma de tireoidite autoimune. Qual a sua história natural clássica em relação à função tireoidiana?', '[{"id":"a","text":"Tri-fásica: Fase inicial de tireotoxicose (1-4 meses), seguida de fase de hipotireoidismo e recuperação total na maioria dos casos."},{"id":"b","text":"Hipotireoidismo permanente desde o primeiro dia."},{"id":"c","text":"Apenas aumento rápido do bócio sem alteração laboratorial."},{"id":"d","text":"Hipertireoidismo severo incurável."},{"id":"e","text":"Não tem fase hormonal; causa apenas febre puerperal."}]', 'a', 
        'Similar à tireoidite silenciosa, a tireoidite pós-parto decorre do rebote imunológico após a gestação. Há uma fase de tireotoxicose leve (por destruição linfocitária dos folículos), seguida de uma fase de hipotireoidismo à medida que o hormônio estocado acaba. Cerca de 80% das mulheres recuperam o eutireoidismo após o término do processo inflamatório.', '{"a":"Correta. Evolução clínica característica.","b":"Incorreta. Pode tornar-se permanente em uma minoria dos casos, mas não é a regra inicial.","c":"Incorreta. Gera alterações hormonais transitórias importantes.","d":"Incorreta. É transitório e autolimitado.","e":"Incorreta. Causa sintomas endocrinológicos reais."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '1s9dy3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoidite Pós-Parto","Autoimunidade","Tri-fásica","Gestação"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-1s9dy3', 'approved', 86)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q88 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-w2wk48', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente com nódulo tireoidiano de 1,5 cm e citologia ''Bethesda II'' deve ser acompanhado de que forma?', '[{"id":"a","text":"Ultrassonografia cervical seriada a cada 6-12 meses para avaliar crescimento significativo ou novas atipias."},{"id":"b","text":"Cirurgia total imediata por medo de falso-negativo."},{"id":"c","text":"Iodo Radioativo para secar o nódulo."},{"id":"d","text":"Não precisa de acompanhamento, pois é benigno."},{"id":"e","text":"Realizar TC de tórax anualmente."}]', 'a', 
        'O diagnóstico de Bethesda II (Benigno) possui acurácia de cerca de 95-97%. No entanto, devido à possibilidade de falso-negativo amostral na PAAF, recomenda-se o seguimento ultrassonográfico para garantir a estabilidade do nódulo ao longo do tempo.', '{"a":"Correta. Protocolo de monitoramento ambulatorial padrão.","b":"Incorreta. Desperdício cirúrgico e iatrogenia.","c":"Incorreta. Iodo não trata nódulos frios benignos.","d":"Incorreta. A estabilidade deve ser provada após o primeiro exame.","e":"Incorreta. Exposição desnecessária à radiação."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'w2wk48', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bethesda II","Acompanhamento","Nódulo de Tireoide","USG"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-w2wk48', 'approved', 87)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q89 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-m8b4q9', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O hormônio TSH é produzido em qual região específica da glândula hipófise?', '[{"id":"a","text":"Adenohipófise (Hipófise Anterior) pelas células tireotróficas."},{"id":"b","text":"Neurohipófise (Hipófise Posterior)."},{"id":"c","text":"Zona Glomerulosa."},{"id":"d","text":"Suprarrenal."},{"id":"e","text":"Tireóide (auto-regulação)."}]', 'a', 
        'O TSH (Hormônio Estimulador da Tireoide) é sintetizado e secretado pelos tireotrofos localizados no lobo anterior da hipófise, sob o controle positivo do TRH hipotalâmico e controle negativo do T4 e T3 livres.', '{"a":"Correta. Anatomofisiologia básica.","b":"Incorreta. Produz apenas ADH e Ocitocina (armazenamento).","c":"Incorreta. Parte da glândula adrenal.","d":"Incorreta. Local de produção de cortisol/aldosterona.","e":"Incorreta. A tireoide recebe o estímulo do TSH, não o produz."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'm8b4q9', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TSH","Hipófise","Endocrinologia","Sistema Endócrino"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-m8b4q9', 'approved', 88)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q90 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-bfi9ji', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Na vigência de um ''Bócio Multinodular Tóxico'' (Doença de Plummer), qual o tratamento definitivo mais indicado para pacientes que desejam evitar cirurgia?', '[{"id":"a","text":"Iodo Radioativo (I-131)."},{"id":"b","text":"Uso perpétuo de Metimazol."},{"id":"c","text":"Uso de Propranolol isolado."},{"id":"d","text":"Apenas controle da dieta sem iodo."},{"id":"e","text":"Radioterapia externa."}]', 'a', 
        'Diferente da Doença de Graves, o bócio multinodular tóxico não entra em remissão com drogas antitireoidianas. Portanto, as opções definitivas são iodo radioativo ou cirurgia. Para quem quer evitar o centro cirúrgico, o Iodo-131 é altamente eficaz na destruição do excesso de tecido glandular autônomo e redução do volume do bócio.', '{"a":"Correta. Opção não-cirúrgica definitiva.","b":"Incorreta. Antitireoidianos são usados apenas para controle clínico temporário até a terapia definitiva.","c":"Incorreta. Não trata o excesso de produção hormonal na tireoide.","d":"Incorreta. Ineficaz.","e":"Incorreta. Não tem papel no bócio benigno."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'bfi9ji', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Doença de Plummer","Iodo-131","Tratamento Definitivo","Bócio Tóxico"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-bfi9ji', 'approved', 89)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q91 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ke7b40', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual o achado semiológico à palpação cervical de um nódulo tireoidiano que mais sugere malignidade agressiva (como o câncer anaplásico ou invasão local do papilífero)?', '[{"id":"a","text":"Nódulo pétreo (endurecido), indolor e fixo aos planos profundos (não móvel à deglutição)."},{"id":"b","text":"Nódulo de consistência elástica e móvel."},{"id":"c","text":"Bócio difuso indolor."},{"id":"d","text":"Nódulo que desaparece com a pressão."},{"id":"e","text":"Tireoide extremamente dolorosa ao toque agudo."}]', 'a', 
        'A malignidade infiltrativa que atravessa a cápsula tireoidiana (invasão extratireoidiana) torna a glândula fixa às estruturas vizinhas (músculos, traqueia). A consistência pétrea ou lenhosa é um sinal clássico de neoplasia agressiva.', '{"a":"Correta. Sinal semiológico de alerta no câncer invasivo.","b":"Incorreta. Sugere benignidade/nódulos benignos.","c":"Incorreta. Perfil de Graves.","d":"Incorreta. Inexistente.","e":"Incorreta. Perfil de tireoidite subaguda."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ke7b40', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Semiologia","Câncer de Tireoide","Sinais de Alerta","Exame Físico"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ke7b40', 'approved', 90)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q92 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-tqcley', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Síndrome Poliglandular Autoimune tipo 1'' (SPA 1 ou APECED) difere da SPA 2 por apresentar tipicamente qual dessas manifestações precoces?', '[{"id":"a","text":"Candidíase mucocutânea crônica e Hipoparatireoidismo primário."},{"id":"b","text":"Somente Hipotireoidismo primário."},{"id":"c","text":"Diabetes tipo 2 induzido por dieta."},{"id":"d","text":"Orbitopatia severa bilateral."},{"id":"e","text":"Insuficiência renal terminal."}]', 'a', 
        'A SPA Tipo 1 é caracterizada pela tríade: Candidíase mucocutânea, Hipoparatireoidismo autoimune e Insuficiência Adrenal (esta última surgindo mais tarde). O hipotireoidismo é menos frequente na tipo 1 do que na tipo 2.', '{"a":"Correta. Diagnóstico diferencial das SPA genéticas.","b":"Incorreta. Hipotira é onipresente mas não define a SPA1 isoladamente.","c":"Incorreta. SPA é autoimune por definição.","d":"Incorreta. Graves é da SPA 2.","e":"Incorreta. Sem relação causal primária."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'tqcley', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["SPA Tipo 1","Hipoparatireoidismo","Autoimunidade","Pediatria"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-tqcley', 'approved', 91)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q93 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ote9u9', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ingestão do edulcorante Aspartame ou produtos com Soja pode interferir de qual forma no tratamento do hipotireoidismo?', '[{"id":"a","text":"A soja interfere no transporte intestinal e na absorção da Levotiroxina, geralmente exigindo doses maiores do fármaco."},{"id":"b","text":"Ambos curam o hipotireoidismo por estimularem a tireoide residual."},{"id":"c","text":"São fármacos precursores dos hormônios T3."},{"id":"d","text":"Não causam nenhum efeito em pacientes hipotireoidianos."},{"id":"e","text":"Podem causar hipertireoidismo agudo iatrogênico."}]', 'a', 
        'A fibra de soja (e alguns compostos nela presentes) pode se ligar à levotiroxina no trato gastrointestinal, reduzindo sua absorção sistêmica. Pacientes com dietas ricas em soja podem precisar de ajustes de dose (geralmente elevação) de L-T4.', '{"a":"Correta. Interação nutricional conhecida e relevante.","b":"Incorreta. Não curam a doença.","c":"Incorreta. Sem nexo bioquímico.","d":"Incorreta. O efeito na absorção é documentado.","e":"Incorreta. Seria impossível."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ote9u9', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Levotiroxina","Interação Alimentar","Soja","Nutrição"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ote9u9', 'approved', 92)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q94 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-a4fda6', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Paciente feminina, de 30 anos, com história prévia de câncer de mama tratado com radioterapia axilar/supraclavicular aos 20 anos, desenvolve nódulo tireoidiano de 0,8 cm. Qual a conduta correta em relação à PAAF neste caso?', '[{"id":"a","text":"Realizar PAAF, pois a radiação cervical prévia é um fator de risco maior para câncer de tireoide, reduzindo o limiar de tamanho para investigação."},{"id":"b","text":"Apenas observar, pois o nódulo é menor que 1 cm."},{"id":"c","text":"Iodo Radioativo profilático."},{"id":"d","text":"Aguardar o nódulo atingir 4 cm."},{"id":"e","text":"Realizar tireoidectomia total sem biópsia."}]', 'a', 
        'História de exposição à radiação ionizante (RTX terapêutica ou acidentes nucleares) antes dos 18-20 anos é o principal fator de risco para Carcinoma Papilífero. Nódulos que seriam apenas observados em pacientes sem riscos (> 1cm) devem ser puncionados em pacientes de alto risco se apresentarem atipias USG.', '{"a":"Correta. Fator de risco que altera a sensibilidade do rastreio clínico.","b":"Incorreta. Ignora o risco radiogênico do paciente.","c":"Incorreta. Iodo não se usa profilaticamente em nódulos.","d":"Incorreta. Perigoso atraso diagnóstico.","e":"Incorreta. Excesso terapêutico; deve-se ter diagnóstico citológico antes."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'a4fda6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Radioterapia","Rastreio","Nódulo de Tireoide","Fatores de Risco"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-a4fda6', 'approved', 93)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q95 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-fmjw4i', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Síndrome de Jervell e Lange-Nielsen'' pode estar associada a distúrbios da tireoide em quais aspectos sindrômicos (diferencial com Pendred)?', '[{"id":"a","text":"Na verdade, esta síndrome causa surdez e QT-longo (risco de morte súbita), mas não bócio de rotina, sendo crucial o diagnóstico diferencial com a Síndrome de Pendred."},{"id":"b","text":"Causa hipotireoidismo e cegueira."},{"id":"c","text":"É a principal causa de Graves juvenil."},{"id":"d","text":"Causa fibrose da glândula de Riedel."},{"id":"e","text":"Não tem nenhuma relação com o pescoço."}]', 'a', 
        'Ambas as síndromes (Pendred e Jervell) causam surdez neurossensorial. No entanto, Pendred cursa com bócio, enquanto Jervell e Lange-Nielsen cursa com alterações cardíacas graves (prolongamento do intervalo QT e síncope/morte súbita por arritmias ventritulares).', '{"a":"Correta. Diagnóstico diferencial importante em pediatria e genética.","b":"Incorreta. Sem relação com cegueira.","c":"Incorreta. Graves é poligênica autoimune.","d":"Incorreta. Riedel é IgG4.","e":"Incorreta. O diagnóstico muitas vezes é pensado pelo otorrinolaringologista antes do endócrino."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'fmjw4i', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["QT-Longo","Pendred","Surdez","Diagnóstico Diferencial"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-fmjw4i', 'approved', 94)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q96 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ynnsk2', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual marcador laboratorial deve ser utilizado para monitorar o tratamento do carcinoma de tireoide em pacientes que portam anticorpos anti-tireoglobulina (Anti-TG) persistentes?', '[{"id":"a","text":"Dosagem de Tireoglobulina por técnica de Espectrometria de Massas (LC-MS/MS) ou monitoramento seriado dos títulos do próprio anticorpo Anti-TG."},{"id":"b","text":"TSH isolado."},{"id":"c","text":"Anticorpo Anti-TPO."},{"id":"d","text":"Somente Raio-X de tórax anualmente."},{"id":"e","text":"O câncer não pode ser monitorado nestes casos."}]', 'a', 
        'A presença de Anti-TG invalida a dosagem de Tireoglobulina (TG) feita por imunoensaio (causando falso-baixos perigosos). Atualmente, a espectrometria de massas contorna essa interferência. Alternativamente, a queda ou desaparecimento dos títulos de Anti-TG ao longo do tempo após a cirurgia é um marcador indireto de ''cura'' ou resposta excelente.', '{"a":"Correta. Refino técnico da oncologia de tireoide moderna.","b":"Incorreta. TSH não monitora massa tumoral residual.","c":"Incorreta. Sem correlação oncológica.","d":"Incorreta. Pouco sensível.","e":"Incorreta. Pode e deve, mas exige técnica especial."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'ynnsk2', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Anti-TG","Tireoglobulina","Seguimento Oncológico","Espectrometria de Massa"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ynnsk2', 'approved', 95)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q97 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-wjvh7', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No tratamento cirúrgico do câncer de tireoide, o termo ''Esvaziamento Cervical Central'' (Nível VI) refere-se à retirada dos linfonodos localizados em qual região?', '[{"id":"a","text":"Entre as carótidas, inferiormente ao osso hioide e superiormente ao pulmão (incisura esternal)."},{"id":"b","text":"Na cadeia yugular profunda lateral externa."},{"id":"c","text":"Atrás da glândula parótida."},{"id":"d","text":"Submandibulares bilaterais."},{"id":"e","text":"Supraclaviculares esquerdos apenas."}]', 'a', 
        'O compartimento central (nível VI) engloba os linfonodos pré-traqueais, paratraqueais e pré-laríngeos (Delphian). É o local primeiro de drenagem linfática da tireoide e alvo frequente de metástases do carcinoma papilífero.', '{"a":"Correta. Anatomia cirúrgica crucial no tratamento oncológico.","b":"Incorreta. Refere-se aos compartimentos laterais (níveis II a IV).","c":"Incorreta. Sem relação com câncer de tireoide habitual.","d":"Incorreta. Níveis I e II.","e":"Incorreta. Virchow."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'wjvh7', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Esvaziamento Cervical","Câncer de Tireoide","Anatomia","Cirurgia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-wjvh7', 'approved', 96)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q98 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-wr0fir', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ocorrência de bócio indolor e hipotireoidismo agudo severo em uma região com ingestão excessiva de algas ricas em iodo decorre de qual fenômeno?', '[{"id":"a","text":"Efeito Wolff-Chaikoff prolongado (bloqueio da organificação do iodo induzido pelo excesso)."},{"id":"b","text":"Jod-Basedow agudo."},{"id":"c","text":"Contaminação por bócio amiloide."},{"id":"d","text":"Mimetismo molecular com a alga."},{"id":"e","text":"Atrofia da glândula tireóide por falta de uso."}]', 'a', 
        'O mecanismo de defesa contra o excesso de iodo é o bloqueio temporário da síntese hormonal (Wolff-Chaikoff). Em pessoas normais, a glândula ''escapa'' desse efeito em poucos dias. No entanto, em pacientes com falha no escape (como pacientes com Hashimoto), o excesso de iodo induz hipotireoidismo permanente enquanto durar a carga.', '{"a":"Correta. Paradoxo do excesso de iodo causando hipotireoidismo.","b":"Incorreta. Seria hipertireoidismo.","c":"Incorreta. Inespecífico.","d":"Incorreta. Sem base fisiopatológica.","e":"Incorreta. Pelo contrário, a glândula pode crescer tentando processar o excesso."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'wr0fir', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Wolff-Chaikoff","Iodo","Hipotireoidismo","Fisiologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-wr0fir', 'approved', 97)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q99 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-z4fxz2', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O Carcinoma de Tireoide Bem Diferenciado possui excelente prognóstico (sobrevida de 10 anos > 95%). Qual dessas variantes histológicas do Carcinoma Papilífero, entretanto, está associada a um comportamento clínico mais agressivo e resistente ao iodo?', '[{"id":"a","text":"Variante de Células Altas (Tall-cell variant) e variante Hobnail."},{"id":"b","text":"Variante Folicular Encapsulada."},{"id":"c","text":"Microcarcinoma incidental."},{"id":"d","text":"Variante Sólida de baixo grau."},{"id":"e","text":"Tireoidite nodular associada."}]', 'a', 
        'Embora o papilífero clássico seja indolente, a variante de células altas (tall-cell) possui maiores taxas de invasão extratireoidiana, metástases a distância e é frequentemente menos responsiva ao radioiodo, exigindo maior vigilância oncológica.', '{"a":"Correta. Tipos histológicos de pior prognóstico no câncer bem diferenciado.","b":"Incorreta. Atualmente muitos casos são reclassificados como NIFTP (neoplasia não-invasiva com baixo potencial de malignidade).","c":"Incorreta. Extremamente benigno.","d":"Incorreta. O prognóstico varia mas não se compara à agressividade da Tall-cell clássica.","e":"Incorreta. Não é variante de câncer."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'z4fxz2', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Variante Células Altas","Prognóstico","Carcinoma Papilífero","Oncologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-z4fxz2', 'approved', 98)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q100 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-vtjdtp', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente apresentando Doença de Graves e Orbitopatia ativa possui uma bócio volumoso. Foi indicada terapia definitiva com Iodo-131. Para evitar o agravamento da orbitopatia após o radioiodo, qual a conduta profilática mandatória?', '[{"id":"a","text":"Utilizar Corticosteroides orais (Prednisona) por 1 a 3 meses começando no dia da aplicação do iodo."},{"id":"b","text":"Manter Metimazol em altas doses após o iodo."},{"id":"c","text":"Antibióticos oculares tópicos."},{"id":"d","text":"Não há profilaxia; o radioiodo cura a orbitopatia."},{"id":"e","text":"Cirurgia plástica palpebral preparatória."}]', 'a', 
        'O tratamento com Radioiodo libera antígenos tireoidianos que podem exacerbar a resposta autoimune inflamatória retro-orbitária. A corticoterapia profilática neutraliza esse efeito e protege o paciente de um agravamento da exoftalmia pós-dose terapêutica.', '{"a":"Correta. Orientação vital para preservação da visão no paciente com Graves.","b":"Incorreta. O Iodo-131 tornaria o metimazol desnecessário a longo prazo.","c":"Incorreta. A inflamação é estéril autoimune.","d":"Incorreta. O iodo costuma piorar ou não afetar a orbitopatia agressiva.","e":"Incorreta. Desnecessária nesta fase."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'vtjdtp', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Radioiodo","Orbitopatia","Corticosteroides","Prevenção"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-vtjdtp', 'approved', 99)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q101 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-nwmd01', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um homem de 72 anos com fibrilação atrial e bócio multinodular antigo desenvolve hipertireoidismo clínico severo (TSH < 0,01 mUI/L e T4L = 3,8 ng/dL). Ele está em uso de Amiodarona há 4 meses para controle de arritmia. O Doppler tireoidiano mostra vascularização global aumentada e bócio heterogêneo. Qual tipo de Tireotoxicose Induzida por Amiodarona (TIA) é este e qual o tratamento inicial recomendado?', '[{"id":"a","text":"TIA Tipo 1; uso de Metimazol em altas doses associado a Perclorato de Potássio (se disponível)."},{"id":"b","text":"TIA Tipo 2; apenas observação expectante."},{"id":"c","text":"Efeito Jod-Basedow fisiológico; suspender a Amiodarona e aguardar 3 dias."},{"id":"d","text":"Fenômeno Wolff-Chaikoff paradoxal; dose de ataque de Iodo-131."},{"id":"e","text":"Tireoidite de Hashimoto ativada; Levotiroxina em dose alta."}]', 'a', 
        'A TIA Tipo 1 ocorre em glândulas previamente alteradas (bócio multinodular ou Graves latente) pelo excesso de iodo contido na Amiodarona (fenômeno Jod-Basedow). A vascularização aumentada ao Doppler é o marcador diferencial viga-mestra em relação ao Tipo 2 (destrutiva por inflamação). O tratamento exige o bloqueio da síntese hormonal com tionamidas potentes; o perclorato de potássio ajuda ao inibir competitivamente o transportador de iodo (NIS).', '{"a":"Correta. Diagnóstico e conduta farmacológica baseada em evidência.","b":"Incorreta. Tipo 2 tem vascularização reduzida e responde a corticoides.","c":"Incorreta. Suspender a Amiodarona demora semanas/meses para fazer efeito devido à sua meia-vida longa.","d":"Incorreta. O Wolff-Chaikoff causa hipotireoidismo, não tireotoxicose.","e":"Incorreta. Hashimoto causa o oposto (hipotireoidismo)."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'nwmd01', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Amiodarona","TIA Tipo 1","Arritmia","Jod-Basedow"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-nwmd01', 'approved', 100)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q102 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-715c1s', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal causa de Hipotireoidismo Terciário (Central) decorre de qual falha glandular?', '[{"id":"a","text":"Disfunção no Hipotálamo, reduzindo a secreção do Hormônio Liberador de Tirotrofina (TRH)."},{"id":"b","text":"Disfunção na glândula tireóide per se."},{"id":"c","text":"Disfunção na adenohipófise (Hipófise anterior)."},{"id":"d","text":"Incapacidade do rim de processar a albumina transportadora."},{"id":"e","text":"Absorção intestinal reduzida de iodo marinho."}]', 'a', 
        'O eixo tireoidiano é hierárquico: Hipotálamo (TRH) -> Hipófise (TSH) -> Tireoide (T4/T3). Falha primária é na tireoide, secundária na hipófise e terciária no hipotálamo. Ambas as causas ''acima'' da tireoide resultam em hipotireoidismo central laboratorialmente similar (TSH baixo/normal e T4 livre baixo).', '{"a":"Correta. Anatomofisiologia da regulação central.","b":"Incorreta. Causa hipotireoidismo primário.","c":"Incorreta. Causa hipotireoidismo secundário.","d":"Incorreta. Sem relação.","e":"Incorreta. Sem nexo anatômico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '715c1s', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Eixo Tireoide","TRH","Hipotireoidismo Terciário","Endocrinologia"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-715c1s', 'approved', 101)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q103 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-hwd3xo', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No contexto da Doença de Graves, o termo ''Dermopatia de Graves'' (ou Mixedema Pré-Tibial) é caracterizado clinicamente por:', '[{"id":"a","text":"Espessamento cutâneo indolor, endurecido e hiperpigmentado nas pernas (região pré-tibial), com aspecto de ''casca de laranja''."},{"id":"b","text":"Pele fina e atrófica com múltiplas varizes."},{"id":"c","text":"Úlceras de pressão bilaterais mal cheirosas."},{"id":"d","text":"Erupção acneiforme granulomatosa facial isolada."},{"id":"e","text":"Necrose tecidual por excesso de calcificação venosa."}]', 'a', 
        'Assim como na orbitopatia, a dermopatia de Graves ocorre pela infiltração de glicosaminoglicanos (como ácido hialurônico) na derme reticular, mediada pela ativação de fibroblastos por anticorpos anti-receptor de TSH. É uma manifestação extratireoidiana que ocorre em menos de 5% dos pacientes, geralmente associada a formas graves de orbitopatia.', '{"a":"Correta. Semiologia e patogênese clássica da dermopatia.","b":"Incorreta. A pele no Graves costuma ser aveludada e quente, mas o mixedema é espesso.","c":"Incorreta. Relacionado a diabetes/insuficiência vascular crônica.","d":"Incorreta. Não existe a ''acne de Graves''.","e":"Incorreta. Calcifilaxia é relacionada a uremia e hiperparatiroidismo terciário."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hwd3xo', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Mixedema Pré-Tibial","Graves","Manifestações Extratireoidianas","Endocrinologia"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-hwd3xo', 'approved', 102)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q104 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-pp56zt', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual dos seguintes exames laboratoriais é o indicador mais precoce de recidiva tumoral no Carcinoma Papilífero de Tireoide após tireoidectomia total, ANTES mesmo da Tireoglobulina (TG) subir significativamente em alguns casos?', '[{"id":"a","text":"Elevação progressiva dos títulos séricos do Anticorpo Anti-tireoglobulina (Anti-TG)."},{"id":"b","text":"Aumento do TSH acima de 50 mUI/L."},{"id":"c","text":"Aumento maciço da Calcitonina."},{"id":"d","text":"Redução do Cálcio iônico no sangue periférico."},{"id":"e","text":"Leucocitose persistente com desvio à esquerda."}]', 'a', 
        'Em pacientes submetidos a tratamento radical, o desaparecimento do anti-TG é esperado em até 1-2 anos. Um aumento nos títulos desse anticorpo, ou sua falha em diminuir, funciona como um ''marcador substituto'' (surrogate marker) de doença persistente ou recorrente, agindo como um sinal de alerta imunológico antes que a massa tumoral produza TG detectável por ensaios comuns.', '{"a":"Correta. Fato clínico sofisticado no manejo do follow-up oncológico.","b":"Incorreta. O TSH responde à dose de levotiroxina, não ao tumor.","c":"Incorreta. Somente no carcinoma medular.","d":"Incorreta. Relacionado a paratireoide.","e":"Incorreta. Sinal inflamatório/infeccioso agudo e inespecífico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'pp56zt', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Anti-TG","Tireoglobulina","Seguimento Oncológico","Recorrência"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-pp56zt', 'approved', 103)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q105 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-abqd7v', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Nódulo tireoidiano descoberto em crianças (< 18 anos) ou adolescentes exige especial atenção clínica porque:', '[{"id":"a","text":"A taxa de câncer em nódulos infantis é significativamente maior (cerca de 20-30%) do que a encontrada na população adulta (5-10%)."},{"id":"b","text":"Crianças não podem ser anestesiadas para biópsias."},{"id":"c","text":"O iodo é proibido para menores de idade."},{"id":"d","text":"A cirurgia impossibilita o crescimento ósseo craniofacial."},{"id":"e","text":"Somente as crianças desenvolvem carcinoma anaplásico."}]', 'a', 
        'Embora os nódulos sejam menos prevalentes em pediatria, a probabilidade de um nódulo identificado ser maligno é muito superior à de um adulto. Além disso, carcinomas papilíferos pediátricos tendem a ser mais extensos e com metástases linfonodais precoces, exigindo conduta diagnóstica rigorosa.', '{"a":"Correta. Diferença epidemiológica basilar para decisão clínica.","b":"Incorreta. A PAAF em crianças pode até ser feita sob sedação leve.","c":"Incorreta. O iodo é essencial; o iodo radioativo curativo também pode ser usado em casos oncológicos selecionados.","d":"Incorreta. A tireoidectomia não afeta o bipedismo se houver reposição adequada de levotiroxina.","e":"Incorreta. CAT é tumor de idosos; o papilífero domina a pediatria."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'abqd7v', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Pediatria","Nódulo de Tireoide","Epidemiologia","Oncologia Infantil"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-abqd7v', 'approved', 104)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q106 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9exz5', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'No tratamento da Doença de Graves, o uso do Iodo-131 está FORMALMENTE contraindicado em qual destes cenários?', '[{"id":"a","text":"Gestação confirmada e amamentação (lactação)."},{"id":"b","text":"Paciente masculino idoso com fibrilação atrial."},{"id":"c","text":"Pessoas que vivem no litoral."},{"id":"d","text":"Diabetes Mellitus tipo 2 insulino-dependente."},{"id":"e","text":"Asma brônquica em uso de corticoides."}]', 'a', 
        'O iodo radioativo atravessa a placenta (destruindo a tireoide fetal após as 12 semanas) e é secretado no leite materno. Por questões de radioproteção fetal e infantil, a gestação e a amamentação são contraindicações absolutas à terapia radiometabólica.', '{"a":"Correta. Regra de ouro da radioproteção médica.","b":"Incorreta. Justamente é uma ótima indicação para tratar a FA por hipertireoidismo.","c":"Incorreta. Sem relação epidemiológica.","d":"Incorreta. Não interfere com a ação da insulina de forma impeditiva.","e":"Incorreta. Sem relação limitante."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '9exz5', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Gestação","Iodo-131","Contraindicações","Saúde da Mulher"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9exz5', 'approved', 105)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q107 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-gvw8m8', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Uma paciente de 38 anos submetida à PAAF de um nódulo suspeito. O laudo revela: ''Presença de células fusiformes em arranjos trabeculares, com imunohistoquímica positiva para CEA e Calcitonina, e negativa para Tireoglobulina''. Qual o diagnóstico provável?', '[{"id":"a","text":"Carcinoma Medular de Tireoide (CMT)."},{"id":"b","text":"Carcinoma Papilífero de Tireoide clássico."},{"id":"c","text":"Carcinoma Linfocitário de Hashimoto."},{"id":"d","text":"Tireoidite Subaguda de Quervain."},{"id":"e","text":"Paraganglioma cervical isolado."}]', 'a', 
        'A presença de calcitonina e CEA positiva associada à ausência de tireoglobulina (que define a linhagem das células foliculares) é o padrão ouro na imunohistoquímica para o Carcinoma Medular, originado nas células C.', '{"a":"Correta. Perfil imunológico definidor da linhagem oncológica Medular.","b":"Incorreta. Seria positivo para Tireoglobulina.","c":"Incorreta. Hashimoto não é carcinoma histológico e seria positivo para marcadores foliculares se malignizasse.","d":"Incorreta. Quadro clínico inflamatório granulomatoso.","e":"Incorreta. Imunofenótipo diferente (positivo para S100 e cromogranina mas não CEA/calcitonina tireoidiana)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'gvw8m8', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["CEA","Calcitonina","Carcinoma Medular","Imunohistoquímica"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-gvw8m8', 'approved', 106)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q108 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-3e0js2', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A manifestação neurológica precoce do hipotireoidismo severo, caracterizada por lentificação motora e cognitiva, diminuição da agilidade e redução da velocidade de relaxamento dos reflexos osteotendinosos (reflexo aquileu), é conhecida como:', '[{"id":"a","text":"Bradipsiquismo e Bradicinesia reflexa (Pseudo-miometria ou Sinal de Woltman)."},{"id":"b","text":"Afasia de Broca aguda."},{"id":"c","text":"Síndrome de Guillain-Barré iatrogênica."},{"id":"d","text":"Epilepsia focal benigna."},{"id":"e","text":"Ataxia Cerebelar reversível por iodo profundo."}]', 'a', 
        'O sinal de Woltman é o atraso no relaxamento dos reflexos profundos (fase de volta lenta), clássico no hipotireoidismo devido à lentificação da maquinaria enzimática de re-captação de cálcio no retículo sarcoplasmático do músculo.', '{"a":"Correta. Semiologia neurológica do mixedema sistêmico.","b":"Incorreta. AVC/Lesão frontal.","c":"Incorreta. Paralisia motora ascendente arreflexa; no hipotireoidismo o reflexo está presente, porém lento.","d":"Incorreta. Sem relação patogênica.","e":"Incorreta. O iodo não causa ataxia desta forma metabólica pura."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '3e0js2', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Woltman","Semiologia","Reflexos Osteotendinosos","Hipotireoidismo"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-3e0js2', 'approved', 107)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q109 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-6wjb1l', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Quais destas situações pode causar um TSH falsamente baixo (simulando hipertireoidismo) em pacientes com doenças sistêmicas agudas, como sepse ou trauma severo?', '[{"id":"a","text":"O uso de Dopamina intravenosa ou altas doses de Glicocorticoides sistêmicos."},{"id":"b","text":"Reposição agressiva de cloreto de sódio."},{"id":"c","text":"Consumo de chá de alecrim excesivo."},{"id":"d","text":"Administração de heparina para prevenção de TEP."},{"id":"e","text":"Realização de compressões torácicas no RCP profundo."}]', 'a', 
        'Ambas as drogas inibem a secreção hipofisária de TSH. Dopamina (e agonistas dopaminérgicos) e corticoides (em doses farmacológicas) suprimem o eixo central, podendo gerar resultados laborais de TSH baixo que não refletem hipertireoidismo real, mas sim um componente da ''Síndrome do Eutireoideo Doente'' agravada por medicações.', '{"a":"Correta. Interação farmacológica hipofisária importante em terapia intensiva.","b":"Incorreta. Não altera o eixo hormonal diretamente.","c":"Incorreta. Inexpressivo.","d":"Incorreta. A heparina pode aumentar o T4 livre por deslocamento na circundação, mas não suprime o TSH pelo mecanismo dopaminérgico.","e":"Incorreta. Sem correlação hormonal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '6wjb1l', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Dopamina","Corticoides","TSH","Interações em UTI"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-6wjb1l', 'approved', 108)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q110 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-a19qkh', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O principal nutriente utilizado pela tireoperoxidase (TPO) para realizar a oxidação e organificação do iodo na síntese de hormônios tireoidianos é o:', '[{"id":"a","text":"Peróxido de Hidrogênio (H2O2) produzido pela enzima DUOX2."},{"id":"b","text":"Magnésio quelado."},{"id":"c","text":"Nitrogênio atmosférico."},{"id":"d","text":"Cálcio iônico livre."},{"id":"e","text":"Cobalto hexavalente."}]', 'a', 
        'A síntese hormonal exige uma reação de oxidação do iodo (I- para I0). Esse processo é feito pela TPO e depende obrigatoriamente da geração local de peróxido de hidrogênio (que serve como co-fator oxidante) proveniente do sistema de NADPH-oxidases na membrana apical do tireócito (DUOXs).', '{"a":"Correta. Fisiologia e bioquímica da síntese de tiroxina.","b":"Incorreta. Embora o magnésio seja co-fator de muitas quinases, não é o motor da TPO.","c":"Incorreta. Totalmente inerte no processo.","d":"Incorreta. Sem papel motor primário na síntese folicular.","e":"Incorreta. Inesistente na biologia tireoidiana humana normal."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'a19qkh', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["H2O2","TPO","Síntese Hormonal","Fisiologia"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-a19qkh', 'approved', 109)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q111 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-daelcs', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 60 anos, sem história prévia de doença tireoidiana, apresenta bócio de crescimento súbito em menos de 1 mês, associado a sintomas depressivos, suores noturnos e perda ponderal não intencional de 10 kg. Ao exame físico, bócio endurecido e fixo. TSH normal. Qual suspeita não-carcinomatosa (não epitelial) deve ser investigada?', '[{"id":"a","text":"Linfoma de Tireoide (mais comum em portadores de Hashimoto prévio)."},{"id":"b","text":"Amiloidose tireoidiana secundária a Doença de Crohn."},{"id":"c","text":"Tireotoxicose por ingestão de carne moída com tireoide (Hamburger toxicosis)."},{"id":"d","text":"Acromegalia com bócio de crescimento tardio."},{"id":"e","text":"Bócio multinodular não-tóxico comum."}]', 'a', 
        'O linfoma de tireoide deve ser suspeitado em casos de bócio de crescimento ''explosivo''. Embora mais comum no contexto de Tireoidite de Hashimoto crônica, o quadro de ''linfadenopatia glândular'' agressiva associado a sintomas constitucionais (B-symptoms) é sugestivo desta neoplasia de linhagem branca.', '{"a":"Correta. Neoplasia rara de crescimento rápido que exige biópsia core ou cirurgia.","b":"Incorreta. Amiloidose causa bócio crônico estável, geralmente indolor e sem sintomas B.","c":"Incorreta. Causa sintomas de hipertireoidismo sem bócio duradouro.","d":"Incorreta. Crescimento de bócio na acromegalia é lento (anos).","e":"Incorreta. Não apresenta crescimento tão abrupto e sintomas constitucionais."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'daelcs', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Linfoma","Bócio de Crescimento Rápido","Hematologia","Diagnóstico Diferencial"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-daelcs', 'approved', 110)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q112 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ffuypn', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A realização de Pesquisa de Corpo Inteiro (PCI) com Iodo-131 em pacientes diagnosticados com Câncer de Tireoide exige que o TSH esteja elevado (> 30 mUI/L) para maximizar a captação do radiotraçador. Qual a vantagem do uso de TSH humano Recombinante (rhTSH) em comparação à suspensão da Levotiroxina por 3-4 semanas?', '[{"id":"a","text":"Evita os sintomas incapacitantes do hipotireoidismo agudo severo no paciente."},{"id":"b","text":"O rhTSH é muito mais barato."},{"id":"c","text":"O rhTSH cura o câncer sozinho."},{"id":"d","text":"Permite que o paciente consuma iodo livremente antes do exame."},{"id":"e","text":"Reduz o risco de radiação ambiental."}]', 'a', 
        'A suspensão da T4 causa extrema fadiga, letargia e bradipsiquismo no paciente oncológico. O rhTSH (Thyrogen) permite estimular o tecido tireoidiano residual sem a necessidade de causar o estado de hipotireoidismo clínico, mantendo a qualidade de vida durante o processo de investigação.', '{"a":"Correta. Indicação fundamental para redução de morbidade no tratamento oncológico.","b":"Incorreta. O rhTSH é uma medicação de alto custo.","c":"Incorreta. Não tem efeito terapêutico tumoral direto isolado.","d":"Incorreta. A dieta pobre em iodo continua obrigatória em ambos os protocolos.","e":"Incorreta. Inexpressivo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ffuypn', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["rhTSH","PCI","Radioiodo","Qualidade de Vida"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ffuypn', 'approved', 111)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q113 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-usr5tp', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual variante do câncer de tireoide possui o pior prognóstico e apresenta-se como uma massa cervical invasiva massiva, frequentemente levando à asfixia ou compressão esofágica severa em pacientes idosos?', '[{"id":"a","text":"Carcinoma Anaplásico de Tireoide."},{"id":"b","text":"Microcarcinoma Papilífero."},{"id":"c","text":"Carcinoma Folicular de Baixo Grau."},{"id":"d","text":"Nódulo Coloide Tóxico."},{"id":"e","text":"Doença de Graves."}]', 'a', 
        'O Carcinoma Anaplásico (CAT) é virtualmente 100% fatal se não diagnosticado em estágios microscópicos (o que é raro). Caracteriza-se por uma agressividade biológica extrema, com tempo de duplicação celular muito rápido, resultando em sobrevida média de 6 meses após o diagnóstico.', '{"a":"Correta. Tumor sólido mais agressivo do ser humano.","b":"Incorreta. Excelente prognóstico.","c":"Incorreta. Bom prognóstico.","d":"Incorreta. Condição benigna hiperfuncional.","e":"Incorreta. Doença autoimune benigna do ponto de vista oncológico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'usr5tp', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Anaplásico","Emergência Oncológica","Idoso","Prognóstico"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-usr5tp', 'approved', 112)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q114 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-6ln9k5', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A dosagem de anticorpos contra tireoglobulina (Anti-TG) é mandatória na avaliação de qual destes parâmetros?', '[{"id":"a","text":"Sempre antes de interpretar a Tireoglobulina sérica, para evitar resultados falsamente indetectáveis por interferência laboratorial."},{"id":"b","text":"Para diagnosticar especificamente a insuficiência adrenal."},{"id":"c","text":"Somente em pacientes com asma alérgica."},{"id":"d","text":"No diagnóstico de infarto agudo do miocárdio de parede anterior."},{"id":"e","text":"Para monitorar o nível de PTH sérico."}]', 'a', 
        'O Anti-TG é um anticorpo que se liga à tireoglobulina circulante, interferindo negativamente na maioria dos ensaios de sanduíche luminométricos/fluorométricos de rotina. Sem saber se o Anti-TG está presente, um valor de TG de zero pode ser apenas uma interferência laboratorial (''gancho'' hook effect ou neutralização de anticorpos de detecção), colocando em risco o seguimento oncológico.', '{"a":"Correta. Regra de ouro da bioquímica clínica no câncer de tireoide.","b":"Incorreta. Sem relação.","c":"Incorreta. Sem relação.","d":"Incorreta. Marcadores de IAM são Troponinas/CKMB.","e":"Incorreta. Sem relação."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '6ln9k5', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Anti-TG","Tireoglobulina","Interferência","Laboratório"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-6ln9k5', 'approved', 113)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q115 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-q4aq10', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O principal sintoma sistêmico da ''Tempestade Tireotóxica'' (Crise Tireotóxica) que ajuda no diagnóstico diferencial clínico em pacientes com suspeita de sepse associada é:', '[{"id":"a","text":"Hipertermia extrema (febre > 40°C-41°C) associada a disfunção de órgãos e agitação psicomotora severa desproporcional."},{"id":"b","text":"Hipotensão severa e bradicardia."},{"id":"c","text":"Hiporexia persistente profunda."},{"id":"d","text":"Desejo de comer doces em excesso (binge eating)."},{"id":"e","text":"Somente pele pálida e fria."}]', 'a', 
        'A crise tireotóxica manifesta-se por um colapso autonômico e metabólico. A temperatura corporal sobe excessivamente, acompanhada de disfunção do sistema nervoso central (delirium, coma), taquicardia severa ou fibrilação atrial e disfunção gastrointestinal. O diagnóstico clínico é feito pelo score de Burch-Wartofsky.', '{"a":"Correta. Tríade cardinal diagnóstica na emergência.","b":"Incorreta. Ocorre Hipertensão sistólica e Taquicardia severa.","c":"Incorreta. Pacientes costumam ter hiperfagia com perda de peso, embora na crise possam ter diarreia e vômitos.","d":"Incorreta. Comum no hipotireoidismo pela lentidão metabólica se houver retenção hídrica, mas não define a crise aguda.","e":"Incorreta. A pele está quente e úmida (sudorese profusa)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'q4aq10', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tempestade Tireotóxica","Diagnóstico Clínico","Emergência","Hipertermia"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-q4aq10', 'approved', 114)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q116 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-you0ua', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual grupo de pacientes possui a maior prevalência de hipotireoidismo subclínico severo (TSH > 10)?', '[{"id":"a","text":"Mulheres acima dos 60 anos."},{"id":"b","text":"Homens adolescentes com excesso de peso corporal."},{"id":"c","text":"Atletas de elite de natação."},{"id":"d","text":"Crianças em fase escolar primária."},{"id":"e","text":"Gestantes no terceiro trimestre isoladamente."}]', 'a', 
        'A incidência de doenças autoimunes tireoidianas (Hashimoto) e falência pélvica/glandular aumenta progressivamente com a idade, afetando até 15-20% das mulheres na pós-menopausa tardia.', '{"a":"Correta. Dados epidemiológicos consistentes.","b":"Incorreta. Sem correlação causal desta magnitude.","c":"Incorreta. Exercício não é fator de risco causal para doenças tireoidianas permanentes.","d":"Incorreta. É raro e geralmente congênito ou precoce quando presente.","e":"Incorreta. A gestação exige mais hormônio, mas o subclínico severo é mais raro que no envelhecimento populacional."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'you0ua', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Epidemiologia","Hipotireoidismo","Idoso","Saúde da Mulher"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-you0ua', 'approved', 115)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q117 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-csf6va', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em pacientes com hipotireoidismo primário, qual a frequência correta de ajuste e coleta de TSH após alteração da dose de Levotiroxina de 25 mcg?', '[{"id":"a","text":"Coletar em 6 a 8 semanas após a mudança."},{"id":"b","text":"Coletar imediatamente no dia seguinte."},{"id":"c","text":"Somente após 1 ano de uso contínuo."},{"id":"d","text":"Semanalmente até estabilizar."},{"id":"e","text":"Não é necessário coletar TSH mais que uma vez por vida se a dose inicial for correta."}]', 'a', 
        'A meia-vida da levotiroxina sérica é de aproximadamente 7 dias. Para que o eixo hipófise-tireoide atinja um novo ''estado de equilíbrio'' (steady state), são necessárias cerca de 5 meias-vidas, justificando a espera de 6 a 8 semanas para monitorar o impacto real da mudança posológica no nível de TSH.', '{"a":"Correta. Fisiologia do tempo de resposta do eixo hormonal.","b":"Incorreta. Inexpressivo.","c":"Incorreta. Atraso irracional e perigoso para controle de sintomas.","d":"Incorreta. Desnecessariamente frequente e variável.","e":"Incorreta. Monitoramento anual/semestral é o padrão ouro vitalício."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'csf6va', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["T4 Livre","Meia-vida","Ajuste de Dose","Hipotireoidismo"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-csf6va', 'approved', 116)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q118 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-z4a12n', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual sinal físico é observado em pacientes com hipotireoidismo severo devido ao acúmulo de glicosaminoglicanos que não deixam marca de compressão no tecido subcutâneo das pernas?', '[{"id":"a","text":"Edema duro (Mixedema) sem cacifo."},{"id":"b","text":"Edema mole com cacifo positivo (++++) - Sinal de Godet."},{"id":"c","text":"Cianose de extremidades (dedo azul)."},{"id":"d","text":"Equimoses espontâneas dolorosas."},{"id":"e","text":"Pustuloses bilaterais."}]', 'a', 
        'A infiltração mixedematosa da derme atrai água mas, por ser uma matriz proteoglicana gelatinosa, não se desloca sob pressão digital (manobra de Godet), configurando o clássico ''edema sem cacifo'' do mixedema.', '{"a":"Correta. Semiologia diferencial crítica para distinguir o edema do mixedema.","b":"Incorreta. Típico de Insuficiência Cardíaca, Renal ou Hepática.","c":"Incorreta. Relacionado a choque ou fenômeno de Raynaud.","d":"Incorreta. Alterações de coagulação ou fragilidade vascular capilar.","e":"Incorreta. Lesões dermatológicas inflamatórias granulomatosas não relacionadas prioritariamente ao status hormonal puramente."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'z4a12n', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Mixedema","Sinal de Godet","Semiologia","Hipotireoidismo"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-z4a12n', 'approved', 117)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q119 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-bnl119', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal limitação da biópsia por PAAF em nódulos maiores que 4 cm (nódulos gigantes), mesmo quando o resultado é Bethesda II (Benigno), é o risco de:', '[{"id":"a","text":"Resultados falso-negativos aumentados devido à falha amostral geográfica no interior da grande lesão."},{"id":"b","text":"Infarto hemorrágico fatal do nódulo puncionado."},{"id":"c","text":"Disseminação celular oncológica pelo trajeto da agulha (seeding)."},{"id":"d","text":"Crescimento acelerado após a lesão térmica da agulha."},{"id":"e","text":"Perfuração traqueal inadvertently."}]', 'a', 
        'Em nódulos muito volumosos, a agulha coleta células de uma fração mínima da massa. Aumenta-se o risco de não puncionar focos microscópicos de malignidade em tecidos adjacentes no mesmo nódulo. Por isso, nódulos > 4 cm frequentemente são encaminhados à cirurgia pela compressão e pelo risco residual diagnóstico.', '{"a":"Correta. Limitação diagnóstica técnica baseada no volume nodular.","b":"Incorreta. Hematomas são comuns e autolimitados.","c":"Incorreta. Risco virtualmente inexistente na tireoide (diferente de próstata ou fígado).","d":"Incorreta. Irreal.","e":"Incorreta. Pouco provável com orientação ultrassonográfica adequada."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'bnl119', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Nódulo de Tireoide","PAAF","Falso-Negativo","Volume"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-bnl119', 'approved', 118)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q120 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-hlecad', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual anticorpo está relacionado à etiologia do hipertireoidismo no contexto da Doença de Graves, sendo capaz de se ligar ao receptor de TSH e mimetizar a ação do próprio hormônio hipofisário?', '[{"id":"a","text":"Anticorpo Antirreceptor de TSH (TRAb)."},{"id":"b","text":"Anticorpo Anti-tireoglobulina (Anti-TG)."},{"id":"c","text":"Anticorpo Anti-tireoperoxidase (Anti-TPO)."},{"id":"d","text":"Antacorpo Antinuclear (FAN)."},{"id":"e","text":"Anticorpo Anti-ilhota (ICA)."}]', 'a', 
        'O TRAb (TSH receptor antibody) possui frações estimuladoras (TSI) que desencadeiam a sobreprodução hormonal autônoma da glândula na Doença de Graves.', '{"a":"Correta. Patogênese molecular central do Graves.","b":"Incorreta. Marcador de Hashimoto ou monitoramento oncológico.","c":"Incorreta. Marcador de doença autoimune destrutiva (Hashimoto).","d":"Incorreta. Marcador inespecífico para doenças do tecido conjuntivo (lúpus, etc).","e":"Incorreta. Relacionado ao Diabetes Mellitus tipo 1."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'hlecad', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TRAb","Graves","Anticorpos","Endocrinologia"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-hlecad', 'approved', 119)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q121 (Part 5)
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
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-mey1ob', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Como se deve proceder o tratamento em uma gestante com diagnóstico de Doença de Graves que necessita de medicação no primeiro trimestre da gravidez?', '[{"id":"a","text":"Prescrever Propiltiomacil (PTU) no primeiro trimestre e, idealmente, trocar para Metimazol após a 16ª semana (organogênese completa)."},{"id":"b","text":"Usar apenas Metimazol 60mg em todo o tratamento gestacional inicial."},{"id":"c","text":"Prescrever Iodo-131 curativo para a mãe."},{"id":"d","text":"Suspender todas as medicações e aguardar o nascimento."},{"id":"e","text":"Induzir o parto prematuro no terceiro mês."}]', 'a', 
        'O Metimazol é evitado no 1º trimestre pelo risco de embriopatia (aplasia cutis e fístulas esofágicas/coanais). O PTU é a droga de escolha inicial na gestação, mas seu uso crônico após o 1º trimestre carrega maior risco de hepatotoxicidade materna severa, justificando a troca após a fase crítica do desenvolvimento fetal se o controle clínico permitir.', '{"a":"Correta. Conduta e transição farmacológica padrão-ouro na gestação de alto risco.","b":"Incorreta. Alto risco de malformações congênitas nos primeiros meses.","c":"Incorreta. Proibido absoluto (atravessa a placenta).","d":"Incorreta. Risco de tempestade tireotóxica materna e abortamento.","e":"Incorreta. Inexequível e criminoso na maioria dos cenários."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'mey1ob', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["PTU","Metimazol","Gestação","Embriopatia"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-mey1ob', 'approved', 210)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q212 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-qgh52i', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Orbitopatia de Graves'' (Exoftalmia) pode paradoxalmente piorar ou surgir agudamente após qual intervenção terapêutica para o hipertireoidismo?', '[{"id":"a","text":"Tratamento com Iodo Radioativo (Iodo-131) isolado sem profilaxia com corticoides."},{"id":"b","text":"Tireoidectomia total aberta."},{"id":"c","text":"Uso de Metimazol em gotas."},{"id":"d","text":"Ingestão excessiva de salmão na dieta."},{"id":"e","text":"Início de levotiroxina de 25 mcg."}]', 'a', 
        'A destruição massiva da glândula pelo radioiodo libera antígenos tireoidianos que retroalimentam a autoimunidade orbital. Pacientes tabagistas ou com orbitopatia preexistente moderada/grave devem receber prednisona oral profilática durante o tratamento radiometabólico para mitigar este risco.', '{"a":"Correta. Efeito adverso clássico e prevenível da radioiodoterapia.","b":"Incorreta. Geralmente a cirurgia estabiliza os anticorpos e raramente piora o olho de forma tão dramática quanto o iodo.","c":"Incorreta. Tionamidas não pioram a orbitopatia.","d":"Incorreta. Sem relação biológica orbital específica.","e":"Incorreta. Sem nexo patogênico orbital.","f":"Nota: O tabagismo é o principal fator de risco modificável para piora da orbitopatia."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'qgh52i', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Orbitopatia","Iodo-131","Corticosteroides","Piora Clínica"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-qgh52i', 'approved', 211)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q213 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ieevum', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal alteração da motilidade gastrointestinal encontrada em portadores de Hipertireoidismo severo?', '[{"id":"a","text":"Aumento progressivo da frequência das evacuações e hipermotilidade gástrica (podendo ocorrer diarreia), decorrente do excesso de hormônio ativando o sistema nervoso entérico."},{"id":"b","text":"Constipação intestinal severa com risco de volvo."},{"id":"c","text":"Cessação absoluta de produção de saliva por 24 horas."},{"id":"d","text":"Aumento maciço do apetite com vômitos explosivos em jato sempre."},{"id":"e","text":"Nenhuma das anteriores; o hipertiroidismo não afeta a digestão."}]', 'a', 
        'Os hormônios tireoidianos aceleram o trânsito intestinal. Pacientes frequentemente queixam-se de aumento do número de evacuações (às vezes 5 a 10 vezes ao dia), o que contribui para a perda de peso marcante e desidratação secundária do hipertireoidismo.', '{"a":"Correta. Fisiologia sistêmica da tireotoxisose no trato gastrointestinal.","b":"Incorreta. Marca clássica do hipotireoidismo.","c":"Incorreta. Inexpressivo.","d":"Incorreta. O apetite está aumentado (hiperfagia), mas vômitos em jato sugerem causas neurológicas (HIC).","e":"Incorreta. Afeta drasticamente a motilidade visceral."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ieevum', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipermotilidade","Diarreia","Tireotoxicose","Fisiologia"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ieevum', 'approved', 212)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q214 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-fj9c09', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Batten disease'' ou outras doenças de depósito lipofuscínico podem simular hipotireoidismo congênito através de qual depósito físico na glândula?', '[{"id":"a","text":"Depósito de lipofuscina e material ceróide nos folículos, gerando o quadro raríssimo de ''Tireoide Preta'' (Black Thyroid) visível à cirurgia."},{"id":"b","text":"Acúmulo de alumínio em vez de iodo."},{"id":"c","text":"Somente depósito de areia cervical."},{"id":"d","text":"Invasão de glóbulos brancos mutantes."},{"id":"e","text":"Acúmulo de colágeno tipo IV em vez de tiroglobulina."}]', 'a', 
        'A ''Tireoide Preta'' é uma curiosidade anátomo-patológica. Embora mais comum secundariamente ao uso crônico de Minociclina (tratamento de acne), doenças de depósito genéticas agressivas podem tingir o parênquima glandular de pigmento, prejudicando a síntese hormonal por acúmulo intracelular massivo.', '{"a":"Correta. Raridade histopatológica e curiosidade cirúrgica em tireoide.","b":"Incorreta. O alumínio não apresenta esse comportamento biológico tireoidiano.","c":"Incorreta. Absurdo técnico.","d":"Incorreta. Sem correlação com pigmentação preta e falha folicular desta forma seletiva.","e":"Incorreta. Sem base fisiopatológica."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'fj9c09', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Black Thyroid","Minociclina","Depósito","Anatomo-patológico"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-fj9c09', 'approved', 213)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q215 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-7jbakj', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Sinal de Pemberton'' é realizado pedindo-se ao paciente para elevar os braços acima da cabeça por 30 a 60 segundos. Qual o objetivo semiológico desta manobra?', '[{"id":"a","text":"Detectar compressão da veia cava superior por bócio mergulhante volumoso (surgindo congestão facial, pletora e estridor respiratório positivo)."},{"id":"b","text":"Medir a força muscular do tríceps."},{"id":"c","text":"Verificar se o paciente possui hérnia de disco cervical."},{"id":"d","text":"Diagnosticar câncer de pulmão metastático profundo."},{"id":"e","text":"Somente como exercício de alongamento pré-cirúrgico."}]', 'a', 
        'Em bócios intratorácicos, a elevação dos braços estreita o orifício torácico superior (deslocando a glândula para baixo e para dentro). Isso causa um efeito de ''rolha'', impedindo o retorno venoso jugular e pletora facial (manobra de Pemberton positiva), indicando necessidade cirúrgica imediata por risco compressivo.', '{"a":"Correta. Semiologia clássica e definidora para tratamento cirúrgico de grandes bócios.","b":"Incorreta. Inexpressivo.","c":"Incorreta. Manobras de Spurling e outras avaliam radiculopatias.","d":"Incorreta. Tumor de Pancoast pode causar congestão similar, mas o Pemberton é manobra física para nódulos cervico-torácicos móveis.","e":"Incorreta. Inexistente tecnicamente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '7jbakj', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Pemberton","Bócio Mergulhante","Semiologia","Compressão Vascular"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-7jbakj', 'approved', 214)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q216 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-mwtm1m', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Um paciente de 45 anos com histórico de PAAF Bethesda II (Benigno) em lobo esquerdo retorna com nódulo sólido crescendo de 2 cm para 4 cm em 1 ano. Qual a conduta recomendada?', '[{"id":"a","text":"Repetir a PAAF (risco de falso-negativo inicial ou crescimento que exige nova amostragem)."},{"id":"b","text":"Suspender todo o acompanhamento médico."},{"id":"c","text":"Indicar transplante de tireoide de urgência."},{"id":"d","text":"Iodo-131 baseado apenas no tamanho."},{"id":"e","text":"Uso de levotiroxina em dose massiva para ''secar'' o nódulo."}]', 'a', 
        'Embora a PAAF seja excelente, existe um risco residual de falso-negativo (especialmente em nódulos grandes onde a agulha pode ter perdido a lesão principal). O crescimento documentado (> 20% em dois diâmetros ou > 50% de volume) é indicação absoluta de re-punção para garantir a benignidade.', '{"a":"Correta. Conduta prudente diante de mudança no comportamento biológico de um nódulo.","b":"Incorreta. Atrai alto risco de diagnóstico oncológico tardio.","c":"Incorreta. Não existe transplante de tireoide como cirurgia de rotina clínica oncológica.","d":"Incorreta. Radioiodo trata função, não crescimento de massa sólida benigna eutireoidiana de forma eficaz inicial.","e":"Incorreta. A terapia de supressão de TSH para tratar nódulos benignos é pouco eficaz e causa riscos cardíacos no idoso."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'mwtm1m', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Nódulo de Tireoide","Seguimento","Bethesda II","Crescimento"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-mwtm1m', 'approved', 215)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q217 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-310q16', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O hormônio Tri-iodotironina (T3) pode ser prescrito na formulação Liotironina. Qual a principal indicação atual de uso desta medicação fora de protocolos de pesquisa?', '[{"id":"a","text":"Associação com Levotiroxina (L-T4) em pacientes que persistem sintomáticos apesar de TSH normalizado, ou preparo rápido para cirurgias oncológicas selecionadas."},{"id":"b","text":"Emagrecimento estético rápido em modelos de passarela."},{"id":"c","text":"Tratamento de unha encravada grave."},{"id":"d","text":"Injeção muscular profunda para hipertrofia de bíceps."},{"id":"e","text":"Substituição completa do T4 em 100% dos hipotireoidismos comuns."}]', 'a', 
        'Apesar de polêmica, a terapia combinada (T4+T3) pode ser utilizada em pacientes que não se sentem bem apenas com T4, visando mimetizar os níveis fisiológicos teciduais. No entanto, o T3 tem meia-vida curta e exige múltiplas doses diárias, podendo gerar picos cardíacos se não manejado adequadamente.', '{"a":"Correta. Prática refinada de ajuste fino hormonal em endocrinologia.","b":"Incorreta. Uso antiético e perigoso para a saúde cardiovascular.","c":"Incorreta. Absurdo técnico.","d":"Incorreta. Inexpressivo.","e":"Incorreta. T4 é a base; o T3 é sempre adjuvante em casos muito específicos."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '310q16', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Liotironina","T3","Combo T4+T3","Tratamento"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-310q16', 'approved', 216)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q218 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ji4y9e', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Glândula de Zuckerkandl'' refere-se a qual estrutura anatômica intimamente ligada ao lobo tireoidiano posterior?', '[{"id":"a","text":"Processo piramidal da linha média tireoidiana."},{"id":"b","text":"Uma extensão posterior (corno) do parênquima tireoidiano que serve de marco anatômico para localizar o nervo laríngeo recorrente."},{"id":"c","text":"Pâncreas ectópico dentro da glândula tireóide."},{"id":"d","text":"Ducto salivar acessório do pescoço inferior."},{"id":"e","text":"Resíduo de glóbulos bracos do timo."}]', 'b', 
        'O tubérculo ou glândula de Zuckerkandl é um marco cirúrgico crucial. Sua dissecação lateral expõe a entrada do nervo recorrente na cartilagem cricoide, sendo fundamental para evitar a paralisia de corda vocal no intraoperatório.', '{"a":"Incorreta. Processo de Lalouette é a pirâmide anterior central superior.","b":"Correta. Anatomia cirúrgica avançada viga-mestra na tireoidectomia.","c":"Incorreta. Inexistente nestes termos.","d":"Incorreta. Sem relação com a tireoide desta forma primária.","e":"Incorreta. Inexpressivo."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'ji4y9e', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Zuckerkandl","Nervo Recorrente","Marco Anatômico","Anatomia"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ji4y9e', 'approved', 217)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q219 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-fgae7s', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual complicação dermatológica agrava-se progressivamente em pacientes hipotiroideos tratados inadequadamente, caracterizando-se por hiperpigmentação de dobras (Acantose Nigricans) secundária a que outra resistência hormonal comumente associada?', '[{"id":"a","text":"Resistência à Insulina (frequentemente coexistem hipotireoidismo e síndrome metabólica ou SOP)."},{"id":"b","text":"Falta de iodo tópico na pele."},{"id":"c","text":"Destruição do melanócito periférico."},{"id":"d","text":"Uso de xampus anticaspa massivos."},{"id":"e","text":"Gordura em excesso nas pálpebras superiores apenas."}]', 'a', 
        'Embora o hipotireoidismo não cause acantose nigricans diretamente, ele desacelera o metabolismo e predispõe à obesidade e resistência à insulina. O estado hiperinsulinêmico atua em receptores de fator de crescimento (IGF-1) na pele, gerando o espessamento aveludado e escuro do pescoço e axilas.', '{"a":"Correta. Correlação metabólica sistêmica importante em endocrinologia do dia-a-dia.","b":"Incorreta. Iodo tópico não interfere desta forma na pigmentação de acantose.","c":"Incorreta. Geraria vitiligo.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Insuificiente para explicar o quadro sistêmico metabólico de dobras."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'fgae7s', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Acantose Nigricans","Insulina","Metabolismo","Hipotireoidismo"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-fgae7s', 'approved', 218)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q220 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-sj3qwj', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal característica das ''Células C'' (parafoliculares) é a sua origem embriológica diversa das células foliculares. De onde elas provêm?', '[{"id":"a","text":"Do Corpo Ultimobranquial (crista neural do 4º e 5º arcos branquiais)."},{"id":"b","text":"Diretamente da medula óssea no nascimento."},{"id":"c","text":"Do tecido pulmonar fetal que migra para o pescoço."},{"id":"d","text":"Pequenos fragmentos do timo residual."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'Enquanto as células foliculares (T4) vêm do primórdio tireoidiano na língua, as células C (Calcitonina) derivam do sistema APUD/Cristal Neural, via corpo ultimobranquial. Essa dualidade explica por que tumores medulares (células C) e papilíferos/foliculares (células foliculares) têm comportamentos biológicos e marcadores tumorais tão distintos.', '{"a":"Correta. Embriologia específica e viga-mestra na diferenciação celular tireoidiana.","b":"Incorreta. Inexistente.","c":"Incorreta. Inexistente.","d":"Incorreta. O timo contribui para outras estruturas cervicais inferiores, mas as células C têm origem branquial neural específica.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'sj3qwj', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Células C","Corpo Ultimobranquial","Embriologia","Calcitonina"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-sj3qwj', 'approved', 219)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q221 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-i2utja', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O uso de doses elevadas de Glicocorticoides (como Hidrocortisona) em pacientes com Graves severo atua no eixo tireoidiano através de:', '[{"id":"a","text":"Inibição da deiodinase tipo 1 (bloqueando a conversão de T4 para T3 ativo na periferia) e supressão da secreção de TSH agudamente."},{"id":"b","text":"Aumento da sensibilidade da glândula ao iodo."},{"id":"c","text":"Destruição do fígado doente."},{"id":"d","text":"Ativação direta do receptor de TSH para produzir mais hormônio."},{"id":"e","text":"Nenhuma das anteriores; corticoides aumentam os hormônios tireoidianos."}]', 'a', 
        'Corticoides são adjuvantes fundamentais na tempestade tireotóxica pois rapidamente ''baixam'' o T3 circulante (fração ativa) ao inibir a conversão periférica, além de diminuir o componente inflamatório autoimune da doença de Graves.', '{"a":"Correta. Farmacodinâmica endócrina fundamental em situações de crise.","b":"Incorreta. Sem relação.","c":"Incorreta. Absurdo técnico clínico.","d":"Incorreta. Pioraria a tireotoxicose.","e":"Incorreta. Eles têm efeito ''tirreostático'' temporário indireto periférico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'i2utja', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Glicocorticoides","T3","Conversão Periférica","Tempestade Tireotóxica"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-i2utja', 'approved', 220)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q222 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ls8697', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal limitação da cintilografia de tireoide no diagnóstico de nódulos é o fato de que a maioria dos nódulos frios (hipocaptantes) é benigna. Qual a porcentagem aproximada de nódulos frios que realmente se mostram malignos após a PAAF?', '[{"id":"a","text":"Cerca de 10 a 20%."},{"id":"b","text":"Em 100% dos casos; nódulo frio é câncer."},{"id":"c","text":"Somente em crianças que vivem no litoral."},{"id":"d","text":"Menos de 0,1%."},{"id":"e","text":"Nodulo frio nunca é câncer; somente os quentes."}]', 'a', 
        'Embora o câncer de tireoide quase sempre seja ''frio'', a recíproca não é verdadeira. 80-90% dos nódulos frios são adenomas benignos, cistos ou nódulos coloide. Por isso, a cintilografia serve para EXCLUIR câncer (seu valor é maior em identificar nódulos quentes, que raramente são câncer).', '{"a":"Correta. Estatística diagnóstica viga-mestra em medicina nuclear e tireoide.","b":"Incorreta. Overdiagnosis severo e perigoso.","c":"Incorreta. Inexistente.","d":"Incorreta. Subestima o risco real oncológico significativamente.","e":"Incorreta. Nódulos quentes podem ocasionalmente ser câncer (Marine-Lenhart), mas é raro."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ls8697', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Nódulo Frio","Cintilografia","Risco de Malignidade","Estatística"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ls8697', 'approved', 221)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q223 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-k0nzpo', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual anticorpo tireoidiano é mais frequentemente positivo na população geral (cerca de 10-15%), podendo estar presente mesmo em pessoas com função tireoidiana perfeitamente normal e sem sintomas?', '[{"id":"a","text":"Anti-TPO (Tireoperoxidase)."},{"id":"b","text":"Anti-SCL 70 pálido."},{"id":"c","text":"Antígeno prostático específico elevado."},{"id":"d","text":"Anti-centrômero cervical inferior."},{"id":"e","text":"Somente Anticorpo Anti-Halteres."}]', 'a', 
        'O Anti-TPO é um marcador de vulnerabilidade autoimune. Sua presença isolada não fecha diagnóstico de doença, mas indica maior chance de hipotireoidismo futuro, especialmente se o TSH já estiver na faixa superior da normalidade. É o ''pé no acelerador'' para fiscalização contínua do eixo tireoidiano.', '{"a":"Correta. Epidemiologia imunológica da tireoide.","b":"Incorreta. Esclerodermia.","c":"Incorreta. Próstata.","d":"Incorreta. Esclerodermia limitada.","e":"Incorreta. Termo inventado e inexistente tecnicamente nesta forma."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'k0nzpo', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Anti-TPO","Epidemiologia","Autoimunidade","Laboratório"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-k0nzpo', 'approved', 222)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q224 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-7xp97o', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoide Lingual'' cursa com sintomas compressivos e disfagia. Além da ressecção ou rádio-iodo em casos selecionados, qual a preocupação fundamental do cirurgião antes de intervir sobre esta glândula ectópica?', '[{"id":"a","text":"Confirmar a presença ou ausência de uma glândula tireóide cervical normal, pois se a lingual for a única tecido tireoidiano funcional, o paciente necessitará de reposição permanente de L-T4 após a retirada."},{"id":"b","text":"Ver se o paciente fala inglês fluente."},{"id":"c","text":"Medir a quantidade de açúcar no café do paciente."},{"id":"d","text":"Verificar se o iodo queima a língua agudamente."},{"id":"e","text":"Avaliar o pH da saliva por 30 dias contínuos."}]', 'a', 
        'Muitas vezes a ectopia lingual é a única glândula do indivíduo. Removê-la ou destruí-la com iodo radioativo sem este conhecimento prévio condena o paciente ao hipotireoidismo iatrogênico se não for planejado. O USG cervical e a cintilografia são diagnósticos fundamentais pré-operatórios.', '{"a":"Correta. Conduta cirúrgica e diagnóstica ética fundamentada na anatomia funcional.","b":"Incorreta. Inexpressivo.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Sem nexo científico primário desta ferramenta.","e":"Incorreta. Inexpressivo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '7xp97o', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoide Lingual","Cirurgia","Hipotireoidismo Iatrogênico","Ectopia"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-7xp97o', 'approved', 223)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q225 (Part 9)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-gk4lbr', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Anticorpos contra ''Tireoperoxidase'' (Anti-TPO) e ''Tireoglobulina'' (Anti-TG) no contexto de uma gestante não conferem risco de hipotireoidismo ao feto de forma direta (diferente do TRAb), mas estão estatisticamente associados a:', '[{"id":"a","text":"Maior taxa de abortos espontâneos recorrentes de primeiro trimestre e parto prematuro."},{"id":"b","text":"Nascimento de bebês gigantes (Gigantismo Fetal)."},{"id":"c","text":"Aumente maciço do iodo na urina fetal profunda."},{"id":"d","text":"Melhora cognitiva absurda do recém-nascido."},{"id":"e","text":"Somente mudança na cor dos olhos do recém-nascido."}]', 'a', 
        'Embora o mecanismo exato ainda seja debatido (se é um marcador de disfunção imune sistêmica ou ação direta decidual), a presença desses anticorpos em gestantes eutireoidianas duplica o risco de perda gestacional precoce, justificando o monitoramento e, em casos de TSH > 2,5 mUI/l, a consideração de reposição de levotiroxina profilática.', '{"a":"Correta. Repercussão sistêmica da autoimunidade tireoidiana na saúde reprodutiva.","b":"Incorreta. Relacionado a diabetes gestacional descontrolado.","c":"Incorreta. Inespecífico.","d":"Incorreta. Inexiste essa correlação benéfica estatisticamente.","e":"Incorreta. Absurdo biológico genético."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'gk4lbr', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Abortamento","Autoimunidade","Gestação","Anti-TPO"],"batch":9}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-gk4lbr', 'approved', 224)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q226 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4hjjng', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O ''Efeito Gancho'' (Hook Effect) em ensaios imunométricos de Tireoglobulina (TG) pode levar a qual erro diagnóstico catastrófico no seguimento do câncer diferenciado de tireoide?', '[{"id":"a","text":"Níveis de TG falsamente baixos ou ''normais'' em pacientes com carga tumoral massiva (metástases volumosas), devido à saturação de todos os anticorpos de captura e detecção pelo excesso de antígeno."},{"id":"b","text":"O iodo queima a agulha de coleta."},{"id":"c","text":"Nenhum; a TG é imune a interferências físicas."},{"id":"d","text":"Apenas o bócio cervical antigo inflama espontaneamente."},{"id":"e","text":"Níveis astronômicos de TG em um paciente sem tireoide."}]', 'a', 
        'O efeito gancho ocorre quando o excesso de antígeno (TG) impede a formação do complexo ''sanduíche'' (anticorpo-antígeno-anticorpo) necessário para a leitura do sinal. Em vez de formar pontes, a TG satura individualmente os anticorpos. O laboratório deve realizar diluições da amostra para revelar o valor real, que pode estar em dezenas de milhares de ng/mL, mas aparecer como ''indetectável'' na primeira leitura.', '{"a":"Correta. Armadilha laboratorial crítica no manejo de metástases oncológicas.","b":"Incorreta. Fantasioso.","c":"Incorreta. Quase todos os ensaios ''sanduíche'' são vulneráveis ao efeito gancho se os níveis forem extremos.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Seria o valor real, não o erro do ''gancho'' (que subestima)."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '4hjjng', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hook Effect","Tireoglobulina","Erro Laboratorial","Oncologia"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4hjjng', 'approved', 225)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q227 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-y164mq', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A conduta atual recomendada para um paciente de 82 anos, assintomático, apresentando Hipotireoidismo Subclínico leve (TSH = 7,8 mUI/L e T4 livre normal) é:', '[{"id":"a","text":"Seguimento clínico e laboratorial (Watchful waiting), pois em pacientes muito idosos (> 80 anos), níveis discretamente elevados de TSH podem ser fisiológicos do envelhecimento e não conferem maior risco cardiovascular ou cognitivo."},{"id":"b","text":"Aumento imediato da dose de Levotiroxina para 150 mcg."},{"id":"c","text":"Iodo Radioativo preventivo."},{"id":"d","text":"Cirurgia de urgência para bócio invisível."},{"id":"e","text":"Tratamento agressivo se o paciente for triatleta."}]', 'a', 
        'Estudos robustos (como o TRUST trial) mostram que tratar o hipotireoidismo subclínico em idosos acima de 65-80 anos com TSH < 10 mUI/L não traz benefícios clínicos claros e pode aumentar o risco de fibrilação atrial e fraturas ósseas por iatrogenia (hipertireoidismo exógeno subclínico). A observação é a conduta preferencial, a menos que existam sintomas severos ou o TSH ultrapasse 10 persistentemente.', '{"a":"Correta. Evolução baseada em evidência no manejo geriátrico endocrinológico moderna.","b":"Incorreta. Risco cardíaco severo nesta faixa etária.","c":"Incorreta. Sem base clínica.","d":"Incorreta. Absurdo cirúrgico.","e":"Incorreta. Mesmo atletas idosos se beneficiam da prudência nestes níveis de TSH."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'y164mq', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipotireoidismo Subclínico","Idoso","TRUST Trial","TSH"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-y164mq', 'approved', 226)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q228 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-vuubq0', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoidite Relacionada a IgG4'' é uma entidade distinta que pode ser parte de uma doença sistêmica. Qual a principal característica histológica que a diferencia da Tireoidite de Hashimoto comum?', '[{"id":"a","text":"Presença de infiltrado linfoplasmocitário denso com densidade elevada de plasmócitos IgG4-positivos (> 20 por campo) e fibrose estoriforme."},{"id":"b","text":"Destruição total da tireoide por vírus da gripe."},{"id":"c","text":"Somente bócio tóxico antigo profundo."},{"id":"d","text":"Inundação de iodo nos vasos basais do pescoço."},{"id":"e","text":"Nenhuma; ambas são iguais sob o microscópio."}]', 'a', 
        'A doença relacionada a IgG4 pode acometer pâncreas, órbita e tireoide. Na tireoide, apresenta-se como uma massa endurecida de crescimento rápido, assemelhando-se clinicamente à Tireoidite de Riedel ou câncer anaplásico, mas responde espetacularmente à corticoterapia sistêmica.', '{"a":"Correta. Histopatologia e imunofenotipagem específica da doença de depósitos.","b":"Incorreta. Infecções virais causam tireoidite subaguda (Quervain), não IgG4-dependente.","c":"Incorreta. Sem relação oncológica funcional primária.","d":"Incorreta. Sem nexo anatômico básico.","e":"Incorreta. O perfil de plasmócitos IgG4 é o marcador diferencial."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'vuubq0', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["IgG4","Tireoidite","Corticosteroides","Diagnóstico Diferencial"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-vuubq0', 'approved', 227)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q229 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-yrkajv', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O hormônio Tri-iodotironina (T3) atua no núcleo das células ligando-se prioritariamente a quais receptores moleculares?', '[{"id":"a","text":"Receptores Nucleares do Hormônio Tireoidiano (TR-alfa e TR-beta)."},{"id":"b","text":"Receptores de insulina na membrana basal."},{"id":"c","text":"Canais de cálcio dependentes de voltagem."},{"id":"d","text":"Receptores de glicose hepática."},{"id":"e","text":"Nervos pélvicos profundos."}]', 'a', 
        'O mecanismo de ação do T3 é genômico. Ele entra na célula (via transportadores MCT8) e no núcleo, onde se liga aos TRs (alfa ou beta). Isso promove a regulação da transcrição de genes alvo no DNA, alterando a síntese proteica celular sistêmica conforme a demanda metabólica.', '{"a":"Correta. Biologia molecular clássica da ação hormonal.","b":"Incorreta. Insulina atua na membrana plasmática via tirosina-quinase.","c":"Incorreta. Mecanismo de sinalização elétrica e muscular rala.","d":"Incorreta. GLUTs transportam glicose mas não são o alvo hormonal do T3.","e":"Incorreta. Absurdo técnico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'yrkajv', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["T3","MCT8","Receptores Nucleares","Fisiologia Molecular"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-yrkajv', 'approved', 228)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q230 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9dw236', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal intervenção recomendada por consenso ético para familiares de primeiro grau de um paciente recém-diagnosticado com Carcinoma Medular de Tireoide (CMT) hereditário (NEM 2A ou 2B)?', '[{"id":"a","text":"Rastreamento genético para mutações no proto-oncogene RET."},{"id":"b","text":"Iodo Radioativo profilático em todos os familiares imediatamente."},{"id":"c","text":"Trocar o sal da cozinha da família por sal iodado massivo de mineração."},{"id":"d","text":"Cortar a garganta de todos preventivamente sem exames (tireoidectomia cega)."},{"id":"e","text":"Apenas vigilância psicológica por 30 anos."}]', 'a', 
        'O CMT hereditário tem padrão autossômico dominante. O risco de um filho ser portador da mutação é de 50%. A identificação precoce do RET permite realizar tireoidectomia profilática (muitas vezes na infância), que é a única forma de cura definitiva para o CMT antes do seu surgimento clínico invasivo.', '{"a":"Correta. Conduta de triagem genética viga-mestra na oncologia endocrinológica.","b":"Incorreta. O Medular não capta iodo e a radiação é inútil preventivamente neste contexto.","c":"Incorreta. Sem nexo preventivo oncológico RET-dependente.","d":"Incorreta. Conduta antiética e criminosa; a cirurgia exige confirmação da mutação.","e":"Incorreta. O tumor é agressivo e a espera diagnóstica custa a vida do paciente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9dw236', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["RET","Triagem Genética","CMT","Ética Médica"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9dw236', 'approved', 229)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q231 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-j8d8za', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O ''Carcinoma de Células de Hürthle'' (Oncocítico) foi re-classificado pela Organização Mundial da Saúde (WHO) na sua 5ª edição como uma entidade distinta. Comparado ao Carcinoma Folicular clássico, qual a principal característica do comportamento biológico das metástases de Células de Hürthle?', '[{"id":"a","text":"Menor taxa de captação de Iodo Radioativo (I-131) nas metástases, tornando o tratamento radiometabólico frequentemente ineficaz."},{"id":"b","text":"Sempre cura com apenas 10 mcg de iodo na dieta."},{"id":"c","text":"Evolução lenta e benigna inevitável."},{"id":"d","text":"Aumento repentino da voz do paciente para tons agudos."},{"id":"e","text":"Somente metástases linfáticas pálidas."}]', 'a', 
        'Os tumores de células de Hürthle são conhecidos por serem ''iodorresistentes''. Devido à abundância de mitocôndrias e perda do transportador NIS, eles não captam adequadamente o iodo-131 em cerca de 60-80% dos casos de metástases, exigindo abordagens oncológicas alternativas como TKIs ou cirurgia de resgate.', '{"a":"Correta. Diferencial clínico oncológico fundamental para o prognóstico e manejo terapêutico.","b":"Incorreta. Inexpressivo.","c":"Incorreta. Pelo contrário; tendem a ser mais agressivos que o folicular clássico.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Apresentam disseminação hematogênica frequente (pulmão/osso) igual ao folicular."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'j8d8za', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Células de Hürthle","Oncocítico","Iodo-131","Resistência"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-j8d8za', 'approved', 230)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q232 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-8ek3ri', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Hipertensão Sistólica Isolada'' observada no hipertireoidismo é decorrente de:', '[{"id":"a","text":"Aumento do volume ejetado (inotropismo) e diminuição da resistência vascular periférica sistêmica."},{"id":"b","text":"Aumento da resistência renal profunda massiva."},{"id":"c","text":"Falta de sangue nas pernas."},{"id":"d","text":"Depósito de cálcio nas válvulas do coração agudamente."},{"id":"e","text":"Aumento da viscosidade do sangue por excesso de T4."}]', 'a', 
        'O hormônio tireoidiano em excesso dilata os vasos (via NO local) e estimula a força de contração cardíaca. A pressão máxima (sistólica) sobe pelo choque volumétrico, mas a mínima (diastólica) cai pela vasodilatação, resultando na clássica pressão de pulso ''em martelo d''água''.', '{"a":"Correta. Fisiologia cardiovascular da tireotoxicose.","b":"Incorreta. Ocorre vasodilatação renal com aumento da TFG no hipertira.","c":"Incorreta. Sem nexo.","d":"Incorreta. Calcificações são crônicas e não explicam a hipertensão aguda tireoidiana.","e":"Incorreta. Sem base fisiológica clínica comprovada deste teor."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8ek3ri', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipertensão Sistólica","Fisiologia Cardiovascular","Hemodinâmica"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-8ek3ri', 'approved', 231)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q233 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ushoe3', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual fármaco é utilizado para reduzir a pletora facial e o bócio volumoso no preparo pré-operatório de pacientes com Graves severo, visando endurecer a glândula e diminuir o sangramento intraoperatório?', '[{"id":"a","text":"Solução de Lugol (Iodo inorgânico saturado)."},{"id":"b","text":"Insulina glargina."},{"id":"c","text":"Ácido acetilsalicílico massivo."},{"id":"d","text":"Vitamina B12 injetável."},{"id":"e","text":"Hidroclorotiazida pálida."}]', 'a', 
        'O Lugol diminui a vascularização glandular ao induzir vasoconstrição e involução do parênquima em processos imunes ativos (Efeito Wolff-Chaikoff prolongado). Isso torna a glândula menos ''fauve'' (friável) e facilita a hemostasia durante a cirurgia.', '{"a":"Correta. Indicações clássicas da ''lugolização'' pré-cirúrgica.","b":"Incorreta. Sem nexo na tireoide do Graves.","c":"Incorreta. Pioraria o sangramento cirúrgico por antiagregação plaquetária.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Diurético sem ação na vascularização tireoidiana específica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ushoe3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Lugol","Preparação Cirúrgica","Hemorragia","Graves"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ushoe3', 'approved', 232)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q234 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-4tynbe', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A principal indicação clínica para o uso de Inibidores de Tirosina Quinase de múltiplos alvos (Ex: Lenvatinibe) no câncer de tireoide é:', '[{"id":"a","text":"Metástases de Carcinoma Diferenciado de Tireoide (Papilífero ou Folicular) Progressivo e Refratário ao Iodo Radioativo (I-131)."},{"id":"b","text":"Tratamento de nódulos benignos (cistos coloide)."},{"id":"c","text":"Hipotireoidismo leve de Hashimoto."},{"id":"d","text":"Cura de orbitopatia de Graves aguda."},{"id":"e","text":"Prevenção de câncer de mama pálido profundo."}]', 'a', 
        'Quando as metástases do câncer diferenciado perdem a capacidade de captar iodo (não funcionantes na PCI), o radioiodo torna-se inútil. Nesses casos de progressão comprovada, os TKIs lentificam a progressão oncológica ao inibir vias de sinalização de angiogênese e proliferação (como VEGFR).', '{"a":"Correta. Onco-endocrinologia moderna viga-mestra no manejo de casos avançados.","b":"Incorreta. TKIs têm toxicidade severa; nunca devem ser usados em patologias benignas comuns.","c":"Incorreta. Absurdo clínico farmacológico.","d":"Incorreta. Orbitopatia usa-se corticoides, rituximabe ou teprotumumabe.","e":"Incorreta. Inexpressivo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4tynbe', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Lenvatinibe","Iodorresistência","TKIs","Oncologia"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-4tynbe', 'approved', 233)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q235 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-7m3uw', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'O surgimento de ''Tireoidite Silenciosa'' (indolor) é observado frequentemente em qual período de vida da mulher?', '[{"id":"a","text":"No Pós-Parto (Tireoidite Pós-Parto), geralmente entre 3 a 12 meses após o nascimento."},{"id":"b","text":"Apenas durante a amamentação do primeiro dia."},{"id":"c","text":"Apenas em mulheres virgens de 20 anos."},{"id":"d","text":"Somente na menopausa tardia (acima dos 90 anos)."},{"id":"e","text":"Exclusivamente em quem usa sutiã apertado."}]', 'a', 
        'O rebote imunitário após o período de imunossupressão gestacional pode desencadear uma tireoidite autoimune destrutiva indolor (silenciosa). Caracteriza-se por uma fase de hipertireoidismo transitória inicial seguida de hipotireoidismo, na maioria dos casos autolimitada.', '{"a":"Correta. Epidemiologia clássica e contextualizada do puerpério endocrinológico.","b":"Incorreta. Janela temporal muito precoce.","c":"Incorreta. Sem nexo clínico primário.","d":"Incorreta. Epidemiologia inexata.","e":"Incorreta. Absurdo anticlínico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '7m3uw', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tireoidite Pós-Parto","Puerpério","Autoimunidade","Hormônios"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-7m3uw', 'approved', 234)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q236 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-ehptv', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ingestão calórica insuficiente (jejum prolongado) ou doenças sistêmicas graves (sepse) levam à ''Síndrome do Eutireoideo Doente''. Qual a primeira e mais precoce alteração laboratorial observada?', '[{"id":"a","text":"Queda do T3 Livre e aumento do T3 Reverso (rT3)."},{"id":"b","text":"Aumento maciço do TSH acima de 100."},{"id":"c","text":"Destruição do T4 Total pelo fígado tumorizado."},{"id":"d","text":"Cura da asma alérgica pálida."},{"id":"e","text":"Sudorese de extremidades massiva."}]', 'a', 
        'A inibição da deiodinase tipo 1 (D1) e ativação da tipo 3 (D3) periférica reduzem o metabolismo basal como mecanismo de economia energética. O TSH frequentemente permanece normal ou discretamente baixo, o que diferencia a SES de um hipotireoidismo central agudo.', '{"a":"Correta. Bioquímica clínica refinada do metabolismo tireoidiano em pacientes graves.","b":"Incorreta. Ocorre no hipotireoidismo primário severo (Hashimoto).","c":"Incorreta. O T4 livre demora mais tempo a cair e frequentemente se mantém normal na fase precoce da SES.","d":"Incorreta. Inexpressivo.","e":"Incorreta. No cansaço e doença sistêmica graves, o tônus adrenérgico pode estar alterado mas não define o status laboratorial tireoidiano."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ehptv', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Eutireoideo Doente","T3 Reverso","Metabolismo","UTI"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-ehptv', 'approved', 235)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q237 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-2cv8ct', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A ''Tireoide Preta'' (Black Thyroid) é uma condição raramente vista por cirurgiões ao operar a sela túrcica cervical profunda. Qual a causa iatrogênica mais comum para tal coloração?', '[{"id":"a","text":"Uso crônico de Minociclina (tratamento de acne)."},{"id":"b","text":"Ingestão excessiva de carvão ativado."},{"id":"c","text":"Depósito de nanoplásticos na garganta profunda."},{"id":"d","text":"Uso de xarope de guaco escuro massivo."},{"id":"e","text":"Nenhuma das anteriores; a tireoide preta nunca existe fora das ficções."}]', 'a', 
        'A Minociclina é oxidada pela tireoperoxidase (TPO) na glândula, gerando o depósito de um pigmento melanocítico-like (lipofuscina) que tinge o lobo de cor preta ou marrom escuro intenso. Embora visualmente impressionante, a função glandular costuma ser perfeitamente normal na maioria dos pacientes.', '{"a":"Correta. Curiosidade iatrogênica e farmacológica clínica frequente em provas de elite.","b":"Incorreta. Carvão ativado atua apenas no trato gastrointestinal.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Inexpressivo.","e":"Incorreta. Existe e é descrita em inúmeros relatos de caso e peças de museu patológico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '2cv8ct', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Black Thyroid","Minociclina","Efeitos Colaterais","Patologia"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-2cv8ct', 'approved', 236)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q238 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-t63j7v', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Em pacientes com Hipertireoidismo severo, a ocorrência de Hipercalcemia (Cálcio sérico elevado) é explicada por qual mecanismo ósseo?', '[{"id":"a","text":"Aumento do turnover ósseo global com ativação direta da reabsorção mediada via ativação excessiva de osteoclastos pelo T3."},{"id":"b","text":"Absorção massiva de pedras de rim pelo intestino central."},{"id":"c","text":"Cura súbita de paratireoidismo primário antigo."},{"id":"d","text":"Ingestão excessiva de água sanitária pálida profunda."},{"id":"e","text":"Não há risco maior de hipercalcemia nestes pacientes."}]', 'a', 
        'O excesso de hormônio tireoidiano estimula diretamente a reabsorção óssea, liberando cálcio e fósforo na circulação. Se a taxa de filtração renal não acompanhar esta sobrecarga, o cálcio sérico sobe (hipercalcemia da tireotoxicose), que é corrigido ao restabelecer o eutireoidismo.', '{"a":"Correta. Bioquímica e metabolismo mineral endocrinológico viga-mestra.","b":"Incorreta. Fantasioso e anticlínico.","c":"Incorreta. Pelo contrário; a hipercalcemia suprime fisiologicamente o PTH nativo.","d":"Incorreta. Absurdo clínico perigoso e sem nexo.","e":"Incorreta. Ocorre em cerca de 15% dos casos de hipertireoidismo grave se não tratados."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 't63j7v', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Hipercalcemia","Metabolismo Ósseo","Osteoclastos","Tireotoxicose"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-t63j7v', 'approved', 237)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q239 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-9dv0zv', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'A maior complicação da realização de Iodo-131 em pacientes portadoras de ''Bócio Multinodular Tóxico'' volumoso e com queixa de disfagia é:', '[{"id":"a","text":"Piora transitória do volume glandular por tireoidite actínica aguda, podendo agravar a obstrução traqueal/esofágica nos primeiros dias pós-tratamento."},{"id":"b","text":"Crescimento imediato de pelos na garganta em 100% das vezes."},{"id":"c","text":"Transformação instantânea em leucemia aguda profunda em 48h."},{"id":"d","text":"Cura total da miopia se o paciente for viciado em iodo."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A radiação inflama o tecido tireoidiano residual (edema actínico). Em bócios já compressivos e volumosos, o inchaço agudo pós-radioiodo pode levar a estridor respiratório, exigindo por vezes corticoterapia de urgência no período de irradiação imediata.', '{"a":"Correta. Complicação radioterápica clínica massiva e prevenível.","b":"Incorreta. Fantasia técnica inexistente.","c":"Incorreta. O risco de neoplasias secundárias rádio-induzidas é real no seguimento de décadas, mas não em 48 horas.","d":"Incorreta. Absurdo técnico clínico.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9dv0zv', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Iodo-131","Tireoidite Actínica","Bócio Multinodular","Complicações"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-9dv0zv', 'approved', 238)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q240 (Part 10)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TIR-61gzak', 'medicina', 'clinica-medica', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', 'fa6919ef-d143-474f-838b-0b0f39b52f0d', '0e8afdbd-831a-409b-a6d9-3676c56426d0', '0e8afdbd-831a-409b-a6d9-3676c56426d0',
        'Qual a principal causa de Hipotireoidismo primário em regiões do mundo onde o governo não provê a iodação obrigatória do sal de cozinha?', '[{"id":"a","text":"Bócio Endêmico por deficiência grave de Iodo."},{"id":"b","text":"Excesso de consumo de brócolis massivo (goitrogênicos) em 100% da população."},{"id":"c","text":"Mutação do gene da Insulina glargina pálida profunda."},{"id":"d","text":"Uso de sapatos apertados que bloqueiam a circulação venosa cervical."},{"id":"e","text":"Nenhuma das anteriores; a deficiência de iodo nunca causa hipotireoidismo."}]', 'a', 
        'O iodo é o combustível único da tireoide. Sem ele, a glândula aumenta de tamanho para tentar captar qualquer traço do nutriente (bócio) e falha em produzir hormônio. Embora no Brasil (país com sal iodado) a causa líder seja Hashimoto (autoimune), a deficiência de iodo continua a principal causa global.', '{"a":"Correta. Geografia médica e saúde pública viga-mestra em endocrinologia global.","b":"Incorreta. Goitrogênicos alimentares só causam bócio clínico em cenários de deficiência de iodo concomitante e consumo astronômico.","c":"Incorreta. Absurdo técnico sem nexo biológico tireoidiano de síntese folicular.","d":"Incorreta. Absurdo clínico anatômico.","e":"Incorreta. É a causa clássica e histórica definidora de bócio e cretinismo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '61gzak', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Iodo","Saúde Pública","Bócio Endêmico","Global Health"],"batch":10}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('f90b96f6-66b4-47e6-a80f-e0cc70c17f71', 'FGV-TIR-61gzak', 'approved', 239)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TIR Q241 (Part 10)
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