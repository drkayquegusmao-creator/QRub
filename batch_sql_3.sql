DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
-- TB Q91 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-qfrghd', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O tabagismo ativo é um fator de risco independente para o tratamento da Tuberculose (TB). Qual a principal repercussão observada em pacientes fumantes durante a terapia antituberculose?', '[{"id":"a","text":"Maiores taxas de falha terapêutica, atraso na conversão da cultura de escarro e maior risco de recidiva pós-tratamento."},{"id":"b","text":"Cura súbita de enfisema pálido profundo pálida."},{"id":"c","text":"Somente excesso de açúcar na sela túrcica pálida massiva."},{"id":"d","text":"Proteção contra TB Miliar profunda pálida profunda."},{"id":"e","text":"Nenhuma influência clínica na evolução da TB ativa."}]', 'a', 
        'O cigarro compromete a motilidade ciliar e os macrófagos alveolares, facilitando a sobrevivência do bacilo. Além disso, fumantes possuem menor adesão ao tratamento e maior dano pulmonar residual, tornando a esterilização dos reservatórios bacilares mais lenta e ineficaz pálida profunda pálida pálida pálida profunda pálida.', '{"a":"Correta. Fator de risco social e biológico viga-mestra na evolução oncológica pulmonar.","b":"Incorreta. Tabagismo é o motor causal do enfisema.","c":"Incorreta. Inexpressivo pálida profunda.","d":"Incorreta. Pelo contrário; aumenta o risco de formas graves pálida pálida.","e":"Incorreta. Afeta drasticamente o prognóstico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'qfrghd', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tabagismo","Recidiva","Falha Terapêutica","Fatores de Risco"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-qfrghd', 'approved', 90)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q92 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-l38ox', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Janela Imunológica'' (ou Período de Conversão) do teste tuberculínico (PPD) é o tempo necessário para que o organismo desenvolva hipersensibilidade tardia após a infecção inicial. Qual a duração desse intervalo?', '[{"id":"a","text":"3 a 8 semanas (podendo chegar a 12 semanas em alguns estudos)."},{"id":"b","text":"Exatos 10 minutos após o contato pálido profundo."},{"id":"c","text":"Apenas após 10 anos de exposição isolada profunda."},{"id":"d","text":"Somente bócio tóxico antigo profundo pálido profundo pálida."},{"id":"e","text":"Nenhuma das anteriores; o PPD já nasce positivo."}]', 'a', 
        'Em contatos de casos índice, um PPD inicialmente negativo não exclui infecção recente. Recomenda-se repetir o exame após 8 semanas para captar a conversão imunitária. Esse período define a necessidade ou não de iniciar o tratamento da ILTB em contatos vulneráveis sela túrcica cervical profunda pálida profunda.', '{"a":"Correta. Cinética imunológica do PPD viga-mestra na triagem de contatos.","b":"Incorreta. Termo técnico sem base biológica imunitária T-CD4.","c":"Incorreta. Excesso temporal injustificado pálida pálida.","d":"Incorreta. Confusão anatômica tireoidiana.","e":"Incorreta. Exige tempo de processamento imune residual celular."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'l38ox', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["PPD","Janela Imunológica","Triagem","Imunologia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-l38ox', 'approved', 91)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q93 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-r0n4xp', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a principal alteração dos eletrólitos no sangue observada em pacientes com Tuberculose Miliar severa, frequentemente associada à Síndrome de Secreção Inapropriada de ADH (SIADH)?', '[{"id":"a","text":"Hiponatremia (Sódio sérico baixo) com osmolaridade plasmática reduzida."},{"id":"b","text":"Hipercalcemia astronômica pálida profunda pálida."},{"id":"c","text":"Aumento do ferro na sela túrcica central profunda."},{"id":"d","text":"Cura súbita de potássio baixo pálido profundo pálida."},{"id":"e","text":"Urina de cor azul pálido profundo massiva profunda pálida."}]', 'a', 
        'A inflamação sistêmica e pulmonar da TB estimula a neuro-hipófise a liberar ADH em excesso para o status volêmico. Isso retém água pura, ''diluindo'' o sódio circulante. A hiponatremia é um marcador de gravidade e desfecho ruim na TB Miliar se não for manejada adequadamente.', '{"a":"Correta. Repercussão hidroeletrolítica clássica da TB disseminada profunda.","b":"Incorreta. TB pode causar hipercalcemia (por produção de vitamina D pelo granuloma), mas a hiponatremia via SIADH é a correlação eletrólitica sistemática em formas de sela.","c":"Incorreta. Absurdo técnico.","d":"Incorreta. Inexpressivo sela túrcica profunda.","e":"Incorreta. Inespecífico farmacológico (Rifampicina é laranja)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'r0n4xp', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["SIADH","Hiponatremia","TB Miliar","Eletrólitos"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-r0n4xp', 'approved', 92)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q94 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-1cf0mw', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 30 anos com Tuberculose Pleural desenvolve um derrame assepticamente ''gelatinoso'' e espesso. A análise do líquido revela Colesterol elevado (> 45 mg/dL) e LDH > 500 U/L. Qual a denominação correta para esse quadro inflamatório crônico?', '[{"id":"a","text":"Empiema Tuberculoso Crônico."},{"id":"b","text":"Derrame pleural por falta de sal pálido profundo."},{"id":"c","text":"Somente bócio tóxico antigo profundo pálido profundo pálida."},{"id":"d","text":"Cura súbita de asma pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'Diferente do derrame pleural tuberculoso simples (exudato claro), o empiema ocorre por ruptura de uma cavidade pulmonar subpleural, liberando focos caseosos massivos no espaço pleural. É uma condição de difícil tratamento que exige drenagem prolongada ou toracostomia por sela túrcica profunda pálida profunda pálida.', '{"a":"Correta. Evolução cirúrgica e patológica grave e complexa da TB pulmonar.","b":"Incorreta. Absurdo bioquímico pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda.","d":"Incorreta. Inexistente nestes termos.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '1cf0mw', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Empiema","Pleura","LDH","Colesterol"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-1cf0mw', 'approved', 93)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q95 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-53nqzq', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Síndrome de Erasmus'' descreve a ocorrência de qual associação patológica clássica em medicina do trabalho?', '[{"id":"a","text":"Associação entre Silicose (exposição à poeira de sílica) e Tuberculose Pulmonar (Siclotuberculose)."},{"id":"b","text":"Uso de calçados de couro massivo pálido profundo."},{"id":"c","text":"Amor excessivo pelo iodo pálido profundo pálida profunda."},{"id":"d","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda."},{"id":"e","text":"Aumento do desejo sexual pálido profundo pálida profunda pálida."}]', 'a', 
        'A sílica é citotóxica para os macrófagos pulmonares, comprometendo a imunidade local. Trabalhadores expostos à sílica têm até 30 vezes mais chances de desenvolver TB. A Síndrome de Erasmus também pode englobar casos de Esclerodermia associados à silicose, mas a marca registrada em pneumologia é a coinfecção bacilar agressiva sela túrcica profunda pálida profunda.', '{"a":"Correta. Patologia ocupacional clássica e definidora de riscos infecciosos crônicos.","b":"Incorreta. Inexpressivo sela túrcica pálida aguda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda.","d":"Incorreta. Inexistente.","e":"Incorreta. Fantasioso pálido profundo pálida profunda pálida profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '53nqzq', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Erasmus","Silicose","Pneumoconiose","Ocupacional"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-53nqzq', 'approved', 94)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q96 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-b61bgy', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Otite Média Tuberculosa'' é uma forma rara de TB extrapulmonar. Qual a sua característica diagnóstica semiológica mais provável no exame físico?', '[{"id":"a","text":"Otorreia crônica indolor com múltiplas perfurações timpânicas em um mesmo ouvido (aspecto cribiforme)."},{"id":"b","text":"Crescimento de dentes no tímpano pálido profundo pálida profunda."},{"id":"c","text":"Cura súbita de miopia pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Somente urina de cor azul pálida profunda massiva profunda pálida profunda."},{"id":"e","text":"Aumento da audição térmica pálida profunda massiva profunda."}]', 'a', 
        'A TB de orelha média ocorre por via tubária ou hematogênica. A necrose caseosa ''fura'' o tímpano em vários pontos, gerando uma secreção purulenta persistente que não responde a antibióticos comuns. Deve ser suspeitada em quadros de otite rebelde crônica profunda pálida profunda.', '{"a":"Correta. Semiologia otorrinolaringológica diagnóstica rara e fundamental em TB extrapulmonar.","b":"Incorreta. Absurdo anatômico pálida profunda pálida profunda.","c":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo sela túrcica profunda pálida aguda.","e":"Incorreta."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'b61bgy', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Otite Tuberculosa","Tímpano","Perfuração","Semiologia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-b61bgy', 'approved', 95)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q97 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-p2s68e', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a justificativa para a suplementação obrigatória de ''Piridoxina'' (Vitamina B6) em pacientes que utilizam Isoniazida nos grupos de risco (gestantes, etilistas, diabéticos)?', '[{"id":"a","text":"Prevenir a Neuropatia Periférica, pois a Isoniazida compete com a piridoxina e inibe sua função de coenzima na síntese de neurotransmissores."},{"id":"b","text":"Ajudar o iodo a queimar a língua pálida profunda pálida profunda pálida."},{"id":"c","text":"Somente para deixar o sangue de cor amarela pálida profunda pálida profunda."},{"id":"d","text":"Cura súbita de asma pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima; B6 e Isoniazida são antagonistas letais."}]', 'a', 
        'A isoniazida forma complexos hidralazínicos com o piridoxal-fosfato (forma ativa da B6), gerando sua depleção seletiva. Isso causa dor e parestesias nos pés e mãos (em bota e luva). A dose profilática de 25-50mg/dia de B6 é salvadora de função neurológica nestes subgrupos sela túrcica profunda pálida profunda.', '{"a":"Correta. Farmacodinâmica e suporte profilático nutricional viga-mestra no tratamento de TB.","b":"Incorreta. Absurdo bioquímico pálido profundo pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Deve-se administrar juntas pálida pálida profunda."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'p2s68e', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Piridoxina","Isoniazida","Neuropatia","Nutrição"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-p2s68e', 'approved', 96)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q98 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-kwofmz', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A espécie ''Mycobacterium bovis'', causadora de tuberculose zoonótica (gado), apresenta qual resistência medicamentosa intrínseca característica?', '[{"id":"a","text":"Resistência intrínseca à Pirazinamida."},{"id":"b","text":"Resistência massiva à Rifampicina de cor negra pálida profunda."},{"id":"c","text":"Cura súbita por uso de sal marinho massivo pálido profundo."},{"id":"d","text":"Apenas resistência ao mel de abelha selvagem profunda pálida."},{"id":"e","text":"Nenhuma das anteriores; M. bovis é sensível a tudo do RIPE."}]', 'a', 
        'Quase todas as cepas de M. bovis carecem da enzima pirazinamidase, que ativa a droga dentro do bacilo. Portanto, o tratamento clínico de TB-bovis é geralmente realizado apenas com RIE (Rifampicina, Isoniazida e Etambutol), estendendo-se por 9 meses sela túrcica profunda pálida profunda pálida profunda.', '{"a":"Correta. Microbiologia infecciosa e diferenciação terapêutica de espécie viga-mestra.","b":"Incorreta. Inespecífico pálida profunda pálida profunda.","c":"Incorreta. Fantasia técnica anticlínica pálida pálida profunda pálida profunda.","d":"Incorreta. Absurdo clínico pálido profundo pálida pálida pálida profunda.","e":"Incorreta. A marca microbiológica é a resistência à PZA."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'kwofmz', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["M. bovis","Pirazinamida","Resistência Intrínseca","Zoonose"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-kwofmz', 'approved', 97)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q99 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-9zx2w3', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A utilização de medicamentos ''Anti-TNF'' (como Infliximabe ou Etanercepte) exige o rastreamento rigoroso de Tuberculose Latente antes do início, porque esses fármacos:', '[{"id":"a","text":"Desestruturam o granuloma (bloqueando o TNF-alfa), liberando os bacilos quiescentes e causando Tuberculose Miliar ou Disseminada catastrófica."},{"id":"b","text":"Fazem o iodo queima o estômago pálido profundo pálida profunda."},{"id":"c","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda."},{"id":"d","text":"Somente bócio tóxico antigo profundo pálido profundo pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O TNF-alfa é a ''cola'' que mantém os macrófagos unidos no granuloma caseoso. Ao retirar essa citocina, a ''capa'' imunitária do baco se rompe, levando o paciente à sepse tuberculosa em poucos dias se houver ILTB não tratada sela túrcica profunda pálida profunda pálida pálida pálida.', '{"a":"Correta. Farmacologia biológica contemporânea e segurança infecciosa viga-mestra em reumatologia.","b":"Incorreta. Inexpressivo sela túrcica pálida profunda.","c":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda.","d":"Incorreta. Confusão anatômica tireoidiana.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9zx2w3', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Anti-TNF","Granuloma","ILTB","Infliximabe"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-9zx2w3', 'approved', 98)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q100 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-f2q25m', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A Tuberculose é considerada uma Doença Ocupacional para profissionais de saúde. Qual a recomendação de rastreamento para funcionários de unidades de internação de doenças infecciosas no Brasil?', '[{"id":"a","text":"Teste de PPD ou IGRA anual em profissionais com teste negativo anterior, ou imediato após acidente de exposição massiva (excesso de aerossol sem proteção)."},{"id":"b","text":"RX de tórax diário pálido profundo pálida profunda pálida profunda."},{"id":"c","text":"Uso de iodo na pele 10 vezes ao dia pálido profundo massivo."},{"id":"d","text":"Cortar a garganta preventiva mente pálida profunda massiva profunda pálida."},{"id":"e","text":"Nenhuma conduta é necessária pálida profunda pálida profunda."}]', 'a', 
        'A vigilância ocupacional visa detectar a ''conversão telessérica'' (viragem tuberculínica) que indica infecção recente no ambiente de trabalho. Profissionais que convertem o PPD de < 5 para > 10 mm no período de 1 ano devem ser avaliados para tratamento de ILTB sela túrcica profunda pálida pálida pálida profunda.', '{"a":"Correta. Medicina do trabalho e biossegurança em serviços de saúde oficial.","b":"Incorreta. Excesso de radiação e baixa sensibilidade para formas latentes pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda.","d":"Incorreta. Atrocidade técnico-cirúrgica anticlínica pálida profunda.","e":"Incorreta. Absurdo epidemiológico e ocupacional."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'f2q25m', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Ocupacional","PPD","Profissional de Saúde","Biossegurança"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-f2q25m', 'approved', 99)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q101 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-4dwztl', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O ''Diabetes Mellitus'' descontrolado dificulta o tratamento da Tuberculose (TB) através de qual mecanismo atípico observado no trato gastrointestinal?', '[{"id":"a","text":"Redução da absorção intestinal das drogas antituberculosas (especialmente Rifampicina) secundária à gastroparesia diabética e neuropatia autonômica."},{"id":"b","text":"O açúcar mata o bacilo em 100% das vezes pálido profundo pálida profunda."},{"id":"c","text":"Formação de cristais de iodo gástricos massivos pálidos profundos pálida profunda."},{"id":"d","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda."},{"id":"e","text":"Aumento da inteligência do bacilo pela glicose alta profunda massiva."}]', 'a', 
        'O esvaziamento gástrico lento do diabético altera a janela de biodisponibilidade das medicação do esquema RIPE. Isso pode levar a concentrações séricas subterapêuticas, favorecendo a falha do tratamento ou o surgimento de resistência bacteriana sela túrcica profunda pálida profunda pálida profunda pálida pálida.', '{"a":"Correta. Interação metabólica-digestiva complexa e muito importante em pacientes crônicos.","b":"Incorreta. O açúcar (glicose alta) favorece a proliferação bacilar pálida profunda.","c":"Incorreta. Absurdo bioquímico sela túrcica pálida profunda.","d":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Bacilos não possuem inteligência sistêmica sela túrcica profunda pálida pálida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4dwztl', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Diabetes","Gastroparesia","Absorção","Efeitos Combinados"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-4dwztl', 'approved', 100)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q102 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-a4mj54', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tuberculose Gástrica'' é uma raridade diagnóstica. Qual o seu quadro endoscópico clássico que mimetiza tumores gástricos malignos?', '[{"id":"a","text":"Úlceras gástricas de bordas irregulares ou infiltração difusa da parede (mimetizando linite plástica ou linfoma)."},{"id":"b","text":"Crescimento de pelos dentro do estômago pálido profundo pálida profunda."},{"id":"c","text":"Transformação do estômago em iodo puro pálido profundo massivo profundo."},{"id":"d","text":"Cura súbita de gastrite erosiva pálida profunda pálida profunda pálida pálida."},{"id":"e","text":"Somente excesso de açúcar na saliva pálida profunda pálida profunda pálida profunda."}]', 'a', 
        'O estômago é ácido e inóspito ao bacilo, tornando a TB gástrica primária raríssima. Clinicamente, os granulomas e a fibrose espessam a parede gástrica, confundindo-se visualmente e radiologicamente com adenocarcinoma em estágios avançados pálida profunda pálida profunda pálida pálida pálida.', '{"a":"Correta. Diagnóstico diferencial gastroenterológico-oncológico e infeccioso raro viga-mestra.","b":"Incorreta. Absurdo anatômico biológico pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda.","d":"Incorreta. TB gástrica causa lesão severa pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Inexpressivo pálida profunda pálida profunda sela túrcica profunda."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'a4mj54', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Gástrica","Endoscopia","Linite Plástica","Oncologia"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-a4mj54', 'approved', 101)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q103 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-cz3py8', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'As ''Calcificações Adrenais'' observadas na Tomografia Computadorizada (TC) de abdome sugerem qual diagnóstico infeccioso prévio em pacientes com insuficiência adrenal periférica?', '[{"id":"a","text":"Tuberculose Adrenal (frequentemente seqüela de disseminação hematogênica crônica)."},{"id":"b","text":"Cura súbita de pedra nos rins pálida profunda pálida profunda pálida profunda pálida."},{"id":"c","text":"Apenas excesso de iodo marinho massivo profundo pálido profundo pálida."},{"id":"d","text":"Câncer de próstata massivo pálido profundo pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A necrose caseosa adrenal pelo bacilo de Koch frequentemente evolui para calcificações densas e distróficas. Diferente de tumores, essas calcificações tendem a manter o formato ''V'' ou ''Y'' da glândula mas sem realce radiológico ativo sela túrcica profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Radiologia e fisiopatologia endócrina crônica ouro de infecções sistêmicas.","b":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda.","d":"Incorreta. Sem relação anatômica biológica sela túrcica pálida profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'cz3py8', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Adrenal","Calcificação","TC","Hipotireoidismo"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-cz3py8', 'approved', 102)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q104 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-x4x8st', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tuberculose em Populações em Situação de Rua'' exige qual estratégia de saúde pública para garantir o sucesso do tratamento?', '[{"id":"a","text":"Tratamento Diretamente Observado (TDO) com suporte social (alimentação e moradia provisória) para aumentar a adesão."},{"id":"b","text":"Apenas dar os comprimidos e esperar a cura isoladamente pálida profunda."},{"id":"c","text":"Proteger o paciente com iodo na pele 20 vezes ao dia pálido profundo massivo pálida."},{"id":"d","text":"Iodoterapia rádio-ativa massiva profunda pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma conduta é eficaz nestas pessoas sela túrcica profunda pálida profunda."}]', 'a', 
        'A vulnerabilidade social é o maior impeditivo da cura da TB. O TDO garante que a dose seja tomada, enquanto o apoio social resolve as barreiras físicas que impedem o paciente de completar os 6 meses de terapia, reduzindo o risco de multidroga-resistência comunitária pálida profunda pálida profunda pálida pálida pálida profunda.', '{"a":"Correta. Saúde pública e estratégia de controle de doenças transmissíveis oficial.","b":"Incorreta. Abandono do tratamento é quase certo nestas condições sem suporte sela túrcica profunda.","c":"Incorreta. Absurdo profilático pálido profundo pálida profunda pálida profunda.","d":"Incorreta. Absurdo terapêutico sela túrcica pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta. São populações prioritárias para intervenção sela túrcica profunda pálida pálida pálida profunda."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'x4x8st', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Situação de Rua","TDO","Vulnerabilidade","Adesão"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-x4x8st', 'approved', 103)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q105 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-u6u81w', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a interação medicamentosa clássica entre a ''Rifampicina'' e a ''Varfarina'' (anticoagulante)?', '[{"id":"a","text":"A Rifampicina reduz dramaticamente o nível sérico e o efeito da Varfarina, exigindo aumento significativo da dose do anticoagulante para manter o INR na faixa terapêutica."},{"id":"b","text":"O anticoagulante mata o bacilo em 100% das vezes pálido profundo pálida profunda."},{"id":"c","text":"Aumenta o risco de sangramento explosivo cerebral massivo profundo pálido."},{"id":"d","text":"Somente troca de iodo por mel massivo profundo pálido profundo pálida profunda pálida."},{"id":"e","text":"Não existe interação nenhuma entre essas drogas pálida profunda pálida profunda pálida."}]', 'a', 
        'Através da indução potente de enzimas hepáticas (CYP2C9 e 3A4), a rifampicina acelera a eliminação da varfarina. Ignorar essa interação pode levar a eventos trombóticos fatais em pacientes com próteses valvares ou FA sela túrcica profunda pálida profunda pálida pálida pálida pálida.', '{"a":"Correta. Farmacologia e segurança do paciente viga-mestra em tratamento multidisciplinar.","b":"Incorreta. Absurdo bioquímico pálido profundo pálida profunda pálida profunda.","c":"Incorreta. Pelo contrário; reduz o efeito (risco de coágulo, não sangue) pálida profunda pálida.","d":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda.","e":"Incorreta. É uma das interações mais potentes e perigosas da medicina sela túrcica profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'u6u81w', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Rifampicina","Varfarina","INR","Interação Medicamentosa"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-u6u81w', 'approved', 104)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q106 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ij69v6', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O uso de ''Isoniazida'' associado à ''Fenitoína'' (anticonvulsivante) pode resultar em qual complicação neurológica?', '[{"id":"a","text":"Toxicidade por Fenitoína (Nistagmo, ataxia e sonolência), pois a Isoniazida inibe o metabolismo hepático da fenitoína, elevando seus níveis séricos para a faixa tóxica."},{"id":"b","text":"Cura súbita de epilepsia antiga pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Transformação do cérebro em osso pálido profundo massivo profundo pálida profunda pálida."},{"id":"d","text":"Apenas queda de pelos faciais pálidos profundos pálida profunda pálida profunda pálida pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A isoniazida é um inibidor enzimático (diferente da rifampicina que é indutora). Ela ''trava'' a eliminação da fenitoína. Pacientes em tratamento de TB e epilepsia devem ter os níveis de anticonvulsivante monitorados rigorosamente para evitar intoxicação iatrogênica sela túrcica profunda pálida pálida pálida profunda pálida profunda.', '{"a":"Correta. Interação farmacológica infecciosa e neurológica viga-mestra diagnóstica profunda pálida.","b":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexistente sela túrcica pálida profunda pálida profunda pálida profunda pálida pálida.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ij69v6', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Isoniazida","Fenitoína","Toxicidade","Neuro"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ij69v6', 'approved', 105)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q107 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-kcqiig', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Pirazinamida'' pode precipitar crises de Gota Aguda em pacientes predispostos. Qual o mecanismo bioquímico responsável por esse efeito adverso?', '[{"id":"a","text":"Inibição da secreção renal de ácido úrico, levando à hiperuricemia."},{"id":"b","text":"O iodo transforma o osso em açúcar pálido profundo massivo profundo pálida profunda."},{"id":"c","text":"Produção de cristais de iodo nas articulações pálidas profundas pálida profunda pálida."},{"id":"d","text":"Cura súbita de reumatismo antigo pálido profundo pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A PZA e seu metabólito (ácido pirazinoico) competem com o ácido úrico pelos transportadores nos túbulos renais. Isso eleva os níveis de ácido úrico no sangue. O tratamento da crise de gota não exige suspender a PZA na maioria dos casos; apenas o uso de colchicina ou AINES acompanhados sela túrcica profunda pálida pálida pálida profunda pálida pálida.', '{"a":"Correta. Bioquímica renal e reumatológica fundamentada em farmacologia da TB sela túrcica profunda.","b":"Incorreta. Absurdo técnico biológico pálida profunda pálida profunda pálida profunda pálida pálida.","c":"Incorreta. São cristais de urato monossódico pálida profunda pálida profunda.","d":"Incorreta. Pelo contrário; agrava a inflamação articular preexistente pálida profunda pálida pálida.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'kcqiig', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Pirazinamida","Gota","Ácido Úrico","Efeitos Colaterais"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-kcqiig', 'approved', 106)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q108 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-jutsae', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a principal causa de mortalidade precoce (nos primeiros 30 dias de tratamento) em pacientes com a forma Miliar de Tuberculose?', '[{"id":"a","text":"Insuficiência Respiratória (SDRA) ou Meningite Tuberculosa grave não diagnosticada com hipertensão intracraniana."},{"id":"b","text":"Câncer de estômago por uso de Rifampicina pálida profunda pálida profunda pálida profunda."},{"id":"c","text":"Falta de açúcar no sangue pálido profundo massivo pálido profundo pálida profunda pálida pálida."},{"id":"d","text":"Cura súbita de asma pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A TB Miliar é uma emergência infecciosa. A tempestade de granulomas hematogênicos pode causar uma falência pulmonar aguda (ARDS) ou acometer precocemente o sistema nervoso central sela túrcica profunda pálida profunda pálida profunda pálida pálida pálida profunda.', '{"a":"Correta. Evolução clínica catastrófica final do bócio bacilar disseminado agudo profunda pálida.","b":"Incorreta. Rifampicina não é carcinogênica gástrica desta forma curta sela túrcica pálida aguda.","c":"Incorreta. Absurdo biológico pálido profundo pálida profunda pálida profunda pálida pálida.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda sela túrcica profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'jutsae', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Miliar","Mortalidade","SDRA","Meningite"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-jutsae', 'approved', 107)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q109 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-mz6fff', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Reação Paradoxal'' (fenômeno IRIS-like em não-HIV) durante o tratamento da Tuberculose é caracterizada por:', '[{"id":"a","text":"Piora transitória das lesões existentes (ex: aumento de linfonodos ou novas sombras ao RX) APÓS o início do tratamento correto, decorrente da restauração da resposta imune contra os antígenos bacilares liberados."},{"id":"b","text":"O bacilo transformar-se em mel massivo profundo pálido profundo pálida profunda pálida."},{"id":"c","text":"Cura absoluta de câncer de próstata pálido profundo pálida profunda pálida pálida profunda."},{"id":"d","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O médico deve estar alerta: uma ''piora'' nas primeiras semanas de tratamento não significa obrigatoriamente resistência ou falha. Se o TDO é garantido e a microbiologia era sensível, a reação paradoxal é a principal suspeita, tratando-se com suporte e, às vezes, corticoides sem suspender o esquema RIPE sela túrcica profunda pálida profunda pálida profunda pálida pálida.', '{"a":"Correta. Resposta imunitária complexa diagnóstica refinada em infectologia clínica profunda.","b":"Incorreta. Fantasia técnica biológica pálida profunda pálida profunda.","c":"Incorreta. Sem relação pálida profunda pálida profunda pálida profunda pálida profunda pálida pálida.","d":"Incorreta. Inexistente sela túrcica pálida profunda pálida aguda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'mz6fff', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Reação Paradoxal","IRIS","Resposta Imune","Prognóstico"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-mz6fff', 'approved', 108)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q110 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-xw73ta', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre o rastreamento de Tuberculose (TB) na ''População Privada de Liberdade'' (PPL), qual a estratégia diagnóstica de maior rendimento recomendada pelas diretrizes nacionais, dado o alto risco de transmissão em ambientes confinados?', '[{"id":"a","text":"Rastreamento sistemático anual com Radiografia de Tórax (RX) e busca ativa de sintomáticos respiratórios para teste molecular rápido (GeneXpert)."},{"id":"b","text":"Apenas medir a força dos braços dos presos pálidos profundos pálida."},{"id":"c","text":"Somente uso de iodo urinário pálido profundo massivo profundo pálida."},{"id":"d","text":"Cortar a garganta preventiva mente pálida profunda massiva profunda pálida."},{"id":"e","text":"Nenhuma; o PPD isolado é o único exame eficaz pálida profunda pálida."}]', 'a', 
        'Em prisões, a prevalência de TB é dezenas de vezes maior que na população geral. O RX detecta precocemente lesões sugestivas em assintomáticos, enquanto o GeneXpert garante o diagnóstico microbiológico e a detecção de resistência à rifampicina no primeiro dia sela túrcica profunda pálida profunda pálida pálida profunda.', '{"a":"Correta. Saúde pública e estratégia de controle institucional oficial viga-mestra.","b":"Incorreta. Absurdo anticlínico pálida profunda pálida pálida profunda.","c":"Incorreta. Absurdo bioquímico sela túrcica pálida profunda pálida profunda.","d":"Incorreta. Atrocidade técnico-cirúrgica pálida profunda pálida profunda pálida.","e":"Incorreta. PPD em ambientes de alta transmissão tem baixo valor preditivo para doença ativa pálida pálida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'xw73ta', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Prisões","Saúde Pública","GeneXpert","Radiografia"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-xw73ta', 'approved', 109)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q111 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-z4zl4c', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Trombocitopenia'' (queda de plaquetas) grave observada raramente durante o tratamento da Tuberculose é mais frequentemente associada ao uso de qual fármaco do esquema RIPE?', '[{"id":"a","text":"Rifampicina (mecanismo imuno-mediado por anticorpos antiplaquetários induzidos pela droga)."},{"id":"b","text":"Falta de açúcar pálido profundo massivo pálido profundo pálida profunda."},{"id":"c","text":"Uso de dose de 1mcg de iodo isoladamente pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda pálida profunda pálida."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida pálida profunda pálida."}]', 'a', 
        'A rifampicina pode agir como um hapteno, desencadeando a destruição plaquetária periférica. É uma complicação rara mas potencialmente fatal se causar sangramentos. A suspensão definitiva da droga é mandatória se houver queda significativa e sintomática das plaquetas sela túrcica profunda pálida profunda pálida profunda pálida pálida profunda pálida profunda.', '{"a":"Correta. Reação adversa hematológica grave e clássica confirmada laboratorialmente profunda.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Confusão anatômica tireoidiana."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'z4zl4c', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Plaquetas","Rifampicina","Púrpura","Efeitos Colaterais"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-z4zl4c', 'approved', 110)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q112 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-zefj0f', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Como deve ser realizado o ajuste posológico dos medicamentos Pirazinamida e Etambutol em pacientes com ''Insuficiência Renal Crônica'' grave (Clearance de Creatinina < 30 mL/min)?', '[{"id":"a","text":"Reduzir a frequência de administração para 3 vezes por semana (segunda, quarta e sexta), visando evitar a toxicidade cumulativa por falha na excreção renal."},{"id":"b","text":"Dobrar a dose todos os dias pálido profundo massivo profundo pálida profunda."},{"id":"c","text":"Suspender o iodo marinho massivo profundo pálido profundo pálida profunda pálida profunda."},{"id":"d","text":"Trocar o iodo por mel massivo profundo pálido profundo pálida profunda pálida pálida profundo."},{"id":"e","text":"Nenhum ajuste é necessário pálida profunda pálida profunda pálida profunda pálida profunda."}]', 'a', 
        'Diferente da Rifampicina e Isoniazida (que são essencialmente metabolizadas pelo fígado), a PZA e o Etambutol acumulam em pacientes renais. Administrar a dose plena 3x/semana mantém os níveis de pico bactericidas sem atingir o teto de toxicidade sistêmica sela túrcica profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.', '{"a":"Correta. Manejo de nefrologia infecciosa viga-mestra em pacientes complexos profunda pálida.","b":"Incorreta. Iatrogenia renal imediata pálida profunda pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Levaria à neuropatia óptica e hiperuricemia severa pálida pálida profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'zefj0f', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Insuficiência Renal","Dosagem","Pirazinamida","Etambutol"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-zefj0f', 'approved', 111)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q113 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-b18vix', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Pelagra'' (Dermatite, Diarreia e Demência) pode ocorrer como um efeito adverso do uso de Isoniazida. Qual a vitamina cuja síntese ou metabolismo é afetado pela droga para gerar esse quadro?', '[{"id":"a","text":"Vitamina B3 (Niacina)."},{"id":"b","text":"Vitamina B12 massiva pálida profunda massiva profunda pálida profunda."},{"id":"c","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda pálida."},{"id":"d","text":"Substituição do açúcar por iodo pálido profundo pálida profunda pálida profunda pálida pálida."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida pálida profunda pálida."}]', 'a', 
        'A Isoniazida inibe a conversão do triptofano em niacina (B3). Em pacientes já desnutridos ou etilistas, essa inibição pode precipitar a tríade da pelagra (as ''3 Ds''). O tratamento consiste na suplementação de niacina além da piridoxina (B6) sela túrcica profunda pálida pálida pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Farmacodinâmica nutricional e toxicidade medicamentosa viga-mestra de casos oncológicos profundos pálida profunda pálida.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda.","e":"Incorreta. Confusão anatômica pálida profunda pálida profunda."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'b18vix', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Pelagra","Isoniazida","Niacina","Efeitos Colaterais"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-b18vix', 'approved', 112)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q114 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-8s8b8o', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Escrofulodermia'' é uma forma de tuberculose cutânea que ocorre por:', '[{"id":"a","text":"Extensão direta de um foco infeccioso subjacente (geralmente linfonodal ou ósseo) para a pele, gerando abscessos frios e fístulas crônicas."},{"id":"b","text":"Uso de iodo na pele 30 vezes ao dia pálido profundo massivo profundo pálida profunda."},{"id":"c","text":"Inundação de açúcar na sela túrcica pálida massiva profunda pálida profunda."},{"id":"d","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida pálida profunda."},{"id":"e","text":"Picada de insetos portadores de bacilos pálidos profundos pálida profunda pálida profunda."}]', 'a', 
        'A escrofulodermia é a ''TB por contiguidade''. É muito comum no pescoço (linfadenite cervical) ou tórax. Clinicamente, vemos massas amolecidas (abscessos frios) que se rompem na pele e drenam material caseoso perolado profundo pálido profundo pálida profunda pálida profunda pálida.', '{"a":"Correta. Dermatologia infecciosa e anatomia patológica clássica em TB extrapolmonar.","b":"Incorreta. Absurdo profilático pálido profundo pálida profunda pálida profunda pálida profunda pálida pálida pálida profunda.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda sela túrcica pálida profunda.","d":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta. TB não é doença vetorial sela túrcica profunda pálida pálida pálida profunda."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8s8b8o', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Escrofulodermia","Pele","Linfonodo","Fístula"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-8s8b8o', 'approved', 113)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q115 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-60g0o1', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O ''Tuberculoma Cerebral'' apresenta-se frequentemente à Tomografia Computadorizada (TC) de crânio com qual aspecto de imagem característico?', '[{"id":"a","text":"Lesões sólidas ou císticas com realce anelar (em anel) após contraste, frequentemente associadas a edema perilesional discreto."},{"id":"b","text":"Crescimento de dentes no cérebro pálido profundo pálida profunda pálida profunda pálida pálida."},{"id":"c","text":"Somente excesso de açúcar na sela túrcica pálida profunda pálida profunda pálida."},{"id":"d","text":"Cura súbita de miopia pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Os tuberculomas são massas granulomatosas que podem mimetizar abscessos piogênicos ou toxoplasmose em pacientes imunocomprometidos. O centro pode sofrer necrose caseosa (fase líquida), gerando o padrão em ''anel'' pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida pálida profunda sela túrcica.', '{"a":"Correta. Radiologia diagnóstica em neuroinfectologia viga-mestra de casos oncológicos profundos.","b":"Incorreta. Absurdo anatômico pálida profunda pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda sela túrcica pálida profunda pálida profunda pálida.","d":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '60g0o1', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tuberculoma","TC Crânio","Neurotuberculose","Realce Anelar"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-60g0o1', 'approved', 114)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q116 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-9uvzh7', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O ''Eritema Nodoso'' observado na Tuberculose representa qual fenômeno biológico de resposta ao bacilo?', '[{"id":"a","text":"Reação de hipersensibilidade mediada por imunocomplexos (paniculite septal), sem presença do bacilo na lesão cutânea em si."},{"id":"b","text":"Colonização da pele por bacilos mutantes negros profundos pálidos profundos pálida profunda."},{"id":"c","text":"Uso de iodo urinário pálido profundo massivo profundo pálida profunda pálida profunda."},{"id":"d","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida pálida."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'O eritema nodoso é uma ''tuberculide''. É uma resposta imune exuberante ao antígeno circulante. Encontramos nódulos eritematosos e dolorosos nas canelas (face anterior da perna), sendo um marcador de boa imunidade celular no hospedeiro sela túrcica profunda pálida profunda pálida pálida pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Imunodermatologia e viga-mestra na diferenciação de formas clínicas de TB pálida profunda pálida pálida pálida pálida.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '9uvzh7', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Eritema Nodoso","Paniculite","Hipersensibilidade","Tuberculide"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-9uvzh7', 'approved', 115)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q117 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-kp0hw6', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Linfadenite Tuberculosa'' (Escrófula) infantil deve ser diagnosticada através de qual procedimento em caso de recidiva ou dúvida diagnóstica severa?', '[{"id":"a","text":"Biópsia por excisão do linfonodo para análise histopatológica (visualização de granuloma granulartomas caseosos) e cultura microbiológica profunda."},{"id":"b","text":"Apenas medir o tamanho das unhas da criança pálida profunda pálida profunda."},{"id":"c","text":"Somente o uso de mel massivo profundo pálido profundo pálida."},{"id":"d","text":"Cura súbita de asma pálida profunda pálida profunda pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A PAAF tem baixa sensibilidade na linfadenite pelo pouco material aspirado. A retirada do linfonodo inteiro permite ao patologista ver a arquitetura do granuloma e ao infectologista realizar o diagnóstico diferencial com micobactérias não-tuberculosas (MNT) ou linfomas sela túrcica profunda pálida profunda pálida pálida pálida profunda pálida profunda pálida profunda pálida.', '{"a":"Correta. Patologia diagnóstica e conduta cirúrgica viga-mestra em pediatria infecciosa profunda pálida.","b":"Incorreta. Absurdo anticlínico pálida profunda pálida pálida pálida pálida.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'kp0hw6', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Linfadenite","Biópsia","Linfonodo","Caseificação"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-kp0hw6', 'approved', 116)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q118 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-vl0jqk', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A principal causa de ''Constrição Pericárdica'' (Pericardite Constritiva) em países em desenvolvimento continua sendo a Tuberculose. Qual o tratamento definitivo em casos de insuficiência cardíaca refratária?', '[{"id":"a","text":"Pericardiectomia cirúrgica (remoção do pericárdio espessado e calcificado)."},{"id":"b","text":"Apenas iodo marinho massivo no coração pálido profundo pálida profunda."},{"id":"c","text":"Uso de dose de 1mcg de mercúrio isoladamente pálida profunda pálida profunda."},{"id":"d","text":"Cura súbita de daltonismo pálido profundo pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima; pericardite nunca cura."}]', 'a', 
        'A fibrose da TB impede o enchimento diastólico do coração. Medicamentos isolados não conseguem reverter a ''casca'' de cálcio e colágeno que envolve o órgão. A cirurgia de desbridamento é a única forma de restaurar a função hemodinâmica plena pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda sela túrcica profunda.', '{"a":"Correta. Conduta cirúrgica cardiovascular e viga-mestra na sequela de TB sistêmica profunda pálida profunda pálida.","b":"Incorreta. Inexpressivo sela túrcica pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Absurdo técnico clínico pálida profunda pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda pálida.","e":"Incorreta. É operável e potencialmente curável sob o ponto de vista mecânico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'vl0jqk', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Pericardite","Constrição","Pericardiectomia","Insuficiência Cardíaca"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-vl0jqk', 'approved', 117)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q119 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-da7jpo', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tuberculose Disseminada'' (Miliar) cursa frequentemente com Hepatoesplenomegalia. Qual o achado histológico clássico observado na biópsia hepática nesses pacientes?', '[{"id":"a","text":"Granulomas epitelioides com necrose de caseificação."},{"id":"b","text":"Transformação do fígado em osso pálido profundo massivo profundo pálida profunda pálida profunda pálida."},{"id":"c","text":"Cura súbita de icterícia pálida profunda pálida profunda pálida profunda pálida."},{"id":"d","text":"Aumento maciço da produção de mel hepático pálido profundo."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'O fígado é um dos órgãos mais ricamente atingidos na disseminação linfo-hematogênica inicial pálida pálida pálida pálida pálida profunda. A presença do granuloma caseoso confirma a natureza da doença sistêmica sela túrcica profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Patologia hepática infecciosa ouro de infecções sistêmicas bacilares profunda pálida profunda.","b":"Incorreta. Inexistente sela túrcica pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Absurdo bioquímico pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'da7jpo', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Fígado","Biópsia","Granuloma","Miliar"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-da7jpo', 'approved', 118)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q120 (Part 7)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-8t1oas', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A presença de ''Queilose Angular'' (feridas nos cantos da boca) e glossite (língua inchada e vermelha) em um paciente tratando Tuberculose pode ser um sinal clínico precoce de carência de qual vitamina suplementada rotineiramente nestes casos?', '[{"id":"a","text":"Vitamina B6 (Piridoxina)."},{"id":"b","text":"Vitamina B12 pálida profunda massiva profunda pálida profunda pálida pálida."},{"id":"c","text":"Antidoce de iodo urinário pálido profundo massivo profundo pálida profunda pálida."},{"id":"d","text":"Apenas reposição de mel pálido profundo pálida profunda pálida profunda pálida profunda."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Esses sinais mucocutâneos fazem parte da síndrome de deficiência do complexo B induzida pela isoniazida. A piridoxina é fundamental para a integridade dos epitélios e sua carência manifesta-se antes mesmo dos sintomas neurológicos severos em alguns pacientes pálida profunda pálida profunda pálida profunda pálida profunda pálida profunda pálida pálida profunda.', '{"a":"Correta. Semiologia nutricional e farmacológica ouro em infectologia clínica profunda pálida profunda.","b":"Incorreta. Deficiência de B12 cursa com anemia macrocítica e neuropatia funicular, mas não é o foco terapêutico do esquema RIPE isoladamente pálida profunda.","c":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida profunda.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8t1oas', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Piridoxina","Queilose","Efeitos Colaterais","Nutrição"],"batch":7}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-8t1oas', 'approved', 119)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
END c:UserskayquDesktopQrub1QRub;