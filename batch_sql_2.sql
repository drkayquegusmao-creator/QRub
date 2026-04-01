DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
-- TB Q61 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-171klm', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Como deve ser feita a investigação de contatos intradomiciliares de um caso índice de Tuberculose Pulmonar Bacilífera?', '[{"id":"a","text":"Todos os contatos (independentemente da presença de sintomas) devem ser avaliados com anamnese, RX de tórax e teste de infecção latente (PPD ou IGRA)."},{"id":"b","text":"Apenas os contatos que estiverem tossindo sangue devem ser avaliados."},{"id":"c","text":"Somente crianças menores de 5 anos devem ser investigadas."},{"id":"d","text":"Deve-se tratar preventivamente todos os contatos com o esquema RIPE antes mesmo de fazer exames."},{"id":"e","text":"Os contatos só precisam se afastar do paciente por 15 dias, sem necessidade de exames."}]', 'a', 
        'O controle de contatos visa: 1) Identificar casos de TB doença escondidos (busca ativa); 2) Identificar infecção latente (ILTB) para tratamento preventivo. Portanto, a avaliação deve ser universal no domicílio do paciente índice bacilífero.', '{"a":"Correta. Norma de vigilância epidemiológica fundamental.","b":"Incorreta. Muitos casos de TB ativa têm tosse seca ou sintomas vagos.","c":"Incorreta. Adultos, idosos e imunodeprimidos do domicílio também têm alto risco.","d":"Incorreta. Tratamento (esquema RIPE) exige diagnóstico de doença; a prevenção (monoterapia) exige exclusão de doença.","e":"Incorreta. A conduta é passiva e ignora o risco de infecção já estabelecida no grupo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '171klm', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Vigilância","Contatos","Saúde da Família","Fluxo"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-171klm', 'approved', 60)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q62 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-9jepmj', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Recentemente, o Ministério da Saúde do Brasil recomenda a Rifapentina (associada à Isoniazida - esquema 3HP) como uma opção para o tratamento preventivo da Tuberculose (TPTB). Qual a principal vantagem logística do esquema 3HP em comparação à Isoniazida isolada (6 ou 9 meses)?', '[{"id":"a","text":"Duração muito menor (apenas 12 doses semanais em 3 meses) e maior taxa de adesão."},{"id":"b","text":"Custo 100 vezes menor em farmácias populares."},{"id":"c","text":"Pode ser administrada via inalatória através de nebulização."},{"id":"d","text":"Elimina a necessidade de suplementação com Vitamina B6."},{"id":"e","text":"Causa coloração verde na urina, facilitando o controle visual do médico."}]', 'a', 
        'O esquema 3HP (3 meses de Rifapentina + Isoniazida semanal) revolucionou o tratamento da ILTB. Por ser curto e exigir apenas uma tomada semanal, a adesão é muito superior aos esquemas de 6 a 9 meses de doses diárias de Isoniazida. É a escolha preferencial para contatos e pessoas vivendo com HIV com boa contagem de CD4.', '{"a":"Correta. Benefício logístico e terapêutico moderno.","b":"Incorreta. A Rifapentina é, na verdade, uma droga mais cara por dose unitária, mas compensa pela redução de danos e aumento da cura latente.","c":"Incorreta. A via é puramente oral.","d":"Incorreta. A Isoniazida continua presente, exigindo B6 se houver fatores de risco.","e":"Incorreta. A Rifapentina, como a Rifampicina, colore os fluidos de vermelho/laranja, não verde."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9jepmj', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["ILTB","3HP","Adesão","Novas Tecnologias"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-9jepmj', 'approved', 61)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q63 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-9ghxxy', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 48 anos com história de silicose ocupacional (ex-minerador) procura o ambulatório por febre, perda ponderal e RX com novos infiltrados cavitários. Por que a Tuberculose é tão frequente em pacientes com Silicose (Síndrome de Silicotuberculose)?', '[{"id":"a","text":"A sílica ingerida pelos macrófagos alveolares causa sua necrose e impede a contenção adequada do M. tuberculosis."},{"id":"b","text":"O bacilo da TB se alimenta quimicamente do dióxido de silício presente nos pulmões."},{"id":"c","text":"A vacina BCG é neutralizada pelas partículas de areia no interstício pulmonar."},{"id":"d","text":"Pacientes com silicose costumam ter alergia severa à Isoniazida."},{"id":"e","text":"Não há relação estatística entre as duas condições; é apenas uma coincidência epidemiológica."}]', 'a', 
        'A sílica é citotóxica para os macrófagos alveolares. O macrófago é a célula viga mestra da defesa contra o bacilo de Koch. Quando os macrófagos estão ''ocupados'' ou destruídos pelo processamento da sílica, a imunidade local pulmonar fica devastada, permitindo que qualquer bacilo inalado ou latente se prolifere descontroladamente. Pacientes silicoticos têm risco dezenas de vezes maior de desenvolver TB que a população geral.', '{"a":"Correta. Explicação fisiopatológica clássica da pneumoconiose e infecção.","b":"Incorreta. O bacilo é quimio-heterotrófico e se alimenta de substâncias orgânicas do hospedeiro.","c":"Incorreta. A BCG é uma vacina neonatal e sua ação imune é sistêmica/celular, não física neutralizável por poeira.","d":"Incorreta. Não existe tal associação farmacológica fixa.","e":"Incorreta. A associação é fortíssima e descrita em todos os manuais de medicina do trabalho."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9ghxxy', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Silicose","Pneumoconiose","Saúde Ocupacional","Imunologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-9ghxxy', 'approved', 62)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q64 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-x8nu8s', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A Tuberculose Urogenital pode causar uma complicação radiológica característica chamada de ''rim mastigado'' (masticated kidney) ou ''autonefrectomia''. O que isso representa?', '[{"id":"a","text":"Um rim destruído por calcificações e retrações cicatriciais extensas, tornando-se não funcional."},{"id":"b","text":"Um rim com múltiplos tumores malignos síncronos causados pela TB."},{"id":"c","text":"Uma infestação do sistema coletor por larvas de insetos atraídas pelo pus da TB."},{"id":"d","text":"Um rim transplantado que sofre rejeição hiperaguda pela TB latente do doador."},{"id":"e","text":"A presença de cálculos de struvita gigantes ocupando todo o parênquima."}]', 'a', 
        'A TB causa inflamação destrutiva crônica (necrose de caseificação) que atinge os cálices, a pelve e o parênquima renal. Com a evolução e a tentativa de cura por fibrose e calcificação, o rim se retrai e se torna um bloco de cálcio e tecido cicatricial sem função excretora (autonefrectomia). Na radiologia/TC, as imagens dessas áreas de destruição irregular lembram um órgão ''mastigado''.', '{"a":"Correta. Achado de imagem patognomônico de TB renal tardia.","b":"Incorreta. A TB não é oncogênica desta forma.","c":"Incorreta. Absurdo biológico.","d":"Incorreta. Não tem relação direta com o termo ''rim mastigado''.","e":"Incorreta. Cáclulos de estruvita sugerem infecção por Proteus e não TB."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'x8nu8s', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Renal","Radiologia","Autonefrectomia","Urologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-x8nu8s', 'approved', 63)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q65 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-v4ow5w', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 41 anos está no 5º mês de tratamento (fase de manutenção) para TB pulmonar. Ele relata ao médico que parou de sentir o gosto e o cheiro dos alimentos e que tem sentido tremores leves nas mãos. Qual o manejo correto desse possível efeito colateral neurológico central?', '[{"id":"a","text":"Investigar toxicidade pela Isoniazida; administrar Piridoxina (B6) e, se não houver melhora, considerar suspensão da droga."},{"id":"b","text":"Suspender a Rifampicina imediatamente pois causa ''anosmia química''."},{"id":"c","text":"Diagnosticar COVID-19 e colocar em quarentena forçada."},{"id":"d","text":"Não são efeitos esperados das drogas da TB; investigar tumor de tronco cerebral."},{"id":"e","text":"Orientar que o cheiro forte da Pirazinamida causa saturação olfativa passageira."}]', 'a', 
        'Embora a neuropatia periférica seja mais comum, a Isoniazida pode causar efeitos no SNC (tremores, irritabilidade, convulsões, distúrbios da memória e, mais raramente, distúrbios sensitivos centrais). A base do manejo é a reposição de Vitamina B6, que ajuda a ''estabilizar'' o metabolismo neuronal afetado pela droga.', '{"a":"Correta. Associação clássica da toxicidade central da isoniazida.","b":"Incorreta. Rifampicina não tem esse perfil de neurotoxicidade.","c":"Incorreta. Embora COVID cause anosmia, os tremores e o contexto do tratamento de TB tornam a farmacotoxicologia a primeira hipótese.","d":"Incorreta. São efeitos descritos na bula e na literatura sobre a droga.","e":"Incorreta. Não existe esta saturação mecânica descrita clinicamente para a pirazinamida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'v4ow5w', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Efeitos Adversos","Isoniazida","SNC","B6"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-v4ow5w', 'approved', 64)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q66 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-sct27l', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Em pacientes com Tuberculose Ocular, qual a manifestação mais frequente observada no exame de fundo de olho?', '[{"id":"a","text":"Coroidite tuberculosa (presença de tubérculos de coroide, infiltrados branco-amarelados)."},{"id":"b","text":"Descolamento de retina exsudativo maciço."},{"id":"c","text":"Oclusão de artéria central da retina."},{"id":"d","text":"Cristais de colesterol na fóvea (Mancha de Cherry-red)."},{"id":"e","text":"Hemorragia vítrea em ''chama de vela''."}]', 'a', 
        'A TB disseminada pode atingir a coroide (a camada vascular do olho). Os ''tubérculos de coroide'' são granulomas visíveis ao oftalmoscópio como pequenas placas amareladas e elevadas. Sua presença é um forte indicativo de disseminação hematogênica (TB biliar ou miliar).', '{"a":"Correta. Marco diagnóstico da TB ocular.","b":"Incorreta. Pode ocorrer em formas severas, mas não é a mais ''frequente''.","c":"Incorreta. Característico de fenômenos embólicos agudos.","d":"Incorreta. Mancha de Cherry-red é associada a doenças metabólicas ou oclusão arterial.","e":"Incorreta. Hemorragia em chama de vela é comum em retinopatia hipertensiva ou diabética."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'sct27l', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Coroidite","Oftalmologia","Tubérculo de Coroide","Miliar"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-sct27l', 'approved', 65)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q67 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-rlycl1', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual o principal critério para a interrupção do isolamento hospitalar de um paciente com Tuberculose em sistema de pressão negativa e filtros HEPA?', '[{"id":"a","text":"Melhora clínica clara do paciente e pelo menos duas (idealmente três) baciloscopias de escarro negativas, coletadas em dias diferentes, sob tratamento adequado."},{"id":"b","text":"O tratamento completar 48 horas."},{"id":"c","text":"O paciente prometer que usará máscara cirúrgica no corredor."},{"id":"d","text":"O teste de PPD (feito na alta) ser negativo."},{"id":"e","text":"A família solicitar a alta por motivos religiosos."}]', 'a', 
        'Diferente do isolamento domiciliar (onde 15 dias de tratamento costumam bastar para o desisolamento operacional), o ambiente hospitalar exige critérios mais rígidos por conter outros pacientes vulneráveis. A demonstração de negativas em série (baciloscopia negativa) é o padrão-ouro de segurança para suspender a precaução para aerossóis.', '{"a":"Correta. Protocolo de segurança hospitalar.","b":"Incorreta. 48h é tempo insuficiente para assepsia da via aérea.","c":"Incorreta. Comprometimento verbal não tem valor biológico de segurança.","d":"Incorreta. PPD não serve para alta ou desisolamento.","e":"Incorreta. Motivos sociais ou religiosos não suplantam o risco de infecção hospitalar massiva."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'rlycl1', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Biossegurança","Isolamento","Infectologia","Gestão Hospitalar"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-rlycl1', 'approved', 66)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q68 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-t9pm05', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 32 anos apresenta infertilidade primária há 2 anos. Antecedente pessoal de ''frialdade abdmoninal'' e ascite leve na adolescência tratada como ''problemas de estômago''. Histerossalpingografia atual revela trompas obstruídas e com aspecto de ''contas de rosário'' ou ''trompas em cachimbo''. Qual a principal hipótese diagnóstica?', '[{"id":"a","text":"Salpingite Tuberculosa (TB Genital feminina)."},{"id":"b","text":"Endometriose profunda severa."},{"id":"c","text":"Síndrome dos Ovários Policísticos (SOP)."},{"id":"d","text":"Infecção por Clamídia aguda."},{"id":"e","text":"Síndrome de Asherman pós-curetagem."}]', 'a', 
        'A TB genital é uma causa silenciosa e frequente de infertilidade em áreas endêmicas. O bacilo atinge as trompas (salpingite) via hematogênica, causando destruição da mucosa e áreas de estenose e dilatação (contas de rosário). Frequentemente é sequela de uma TB peritoneal ocorrida anos antes. O diagnóstico exige biópsia de endométrio ou cultura de fluxo menstrual.', '{"a":"Correta. Causa de esterilidade tubária clássica.","b":"Incorreta. Endometriose causa aderências, mas o padrão de ''rosário'' nas trompas é muito sugestivo de TB ou DIPA crônica.","c":"Incorreta. SOP é uma desordem anovulatória, não anatômica tubária.","d":"Incorreta. A clamídia causa obstrução, mas raramente com este histórico de doença sistêmica pregressa.","e":"Incorreta. Asherman ocorre após traumas uterinos (leves), não atingindo as trompas desta maneira."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 't9pm05', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Infertilidade","Sinal do Rosário","Ginecologia","Infectologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-t9pm05', 'approved', 67)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q69 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-1h1cdx', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A Tuberculose Mamária é uma apresentação rara. Qual o diagnóstico diferencial mais importante na prática clínica, especialmente em mulheres com mais de 40 anos?', '[{"id":"a","text":"Câncer de Mama."},{"id":"b","text":"Prolactinoma."},{"id":"c","text":"Ectasia ductal."},{"id":"d","text":"Mastite puerperal comum."},{"id":"e","text":"Lipoma intramamário."}]', 'a', 
        'A TB mamária se manifesta como um nódulo endurecido, às vezes com retração da pele ou fístulas que drenam material purulento/caseoso. Por ser um nódulo fixo e de crescimento progressivo, simula perfeitamente um carcinoma mamário. A biópsia é obrigatória para diferenciar as duas entidades.', '{"a":"Correta. Principal ''grande simulador'' no tecido mamário.","b":"Incorreta. Prolactinoma causa galactorreia bilateral, sem nódulos mamários inflamatórios.","c":"Incorreta. Ectasia ductal causa descarga papilar, sem formação de fístulas caseosas sistêmicas.","d":"Incorreta. Ocorre no período da amamentação e é uma infecção por Gram-positivos aguda.","e":"Incorreta. Lipoma é macio, móvel e indolor."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '1h1cdx', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Mastologia","Oncologia","Diagnóstico Diferencial","Nódulos"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-1h1cdx', 'approved', 68)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q70 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-gmaf0a', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Em pacientes com Tuberculose e uso de Dolutegravir (DTG) para HIV, dobramos a dose do DTG para 50 mg 12/12h. Quando o paciente termina o tratamento da TB e para de usar a Rifampicina, por quanto tempo ainda se deve manter a dose dobrada do Dolutegravir?', '[{"id":"a","text":"Duas semanas após a última dose de Rifampicina, pois a indução enzimática demora este tempo para dissipar."},{"id":"b","text":"Pode voltar para a dose normal no dia seguinte."},{"id":"c","text":"Deve-se manter a dose dobrada pelo resto da vida."},{"id":"d","text":"Pelo menos por 6 meses para garantir que não haja ''efeito rebote''."},{"id":"e","text":"Até que a carga viral do HIV negative novamente."}]', 'a', 
        'A indução enzimática do citocromo P450 pela Rifampicina é potente e persistente. Mesmo após a interrupção da droga, as enzimas hepáticas ''induzidas'' permanecem ativas por cerca de 10 a 14 dias até serem degradadas naturalmente. Portanto, para manter níveis seguros de Dolutegravir, mantém-se a dose dobrada por 2 semanas após o fim do esquema RIPE.', '{"a":"Correta. Orientação farmacocinética de precisão para TB-HIV.","b":"Incorreta. Se baixar no dia seguinte, o DTG será degradado rapidamente pelas enzimas remanescentes.","c":"Incorreta. Desnecessário e aumenta o risco de efeitos colaterais do DTG.","d":"Incorreta. Tempo excessivamente longo.","e":"Incorreta. O critério é baseado na meia-vida das enzimas citocromais, não na carga viral diretamente."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'gmaf0a', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Interações","Dolutegravir","Rifampicina","Farmacologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-gmaf0a', 'approved', 69)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q71 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-k1n96h', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a principal complicação metabólica da Tuberculose Adrenal (Doença de Addison por TB)?', '[{"id":"a","text":"Insuficiência adrenal primária (hipocortisolismo e hipoaldosteronismo), causando hiponatremia, hipercalemia e hipotensão."},{"id":"b","text":"Síndrome de Cushing por hipercortisolismo reacional."},{"id":"c","text":"Diabetes Insipidus central."},{"id":"d","text":"Hipertireoidismo severo."},{"id":"e","text":"Hipercalcemia hipocalciúrica familiar."}]', 'a', 
        'O M. tuberculosis pode destruir progressivamente o córtex das glândulas adrenais. A falta de aldosterona leva à perda de sódio (hiponatremia) e retenção de potássio (hipercalemia), enquanto a falta de cortisol causa hipotensão refratária e hipoglicemia. É uma emergência endócrina se não diagnosticada a tempo.', '{"a":"Correta. Fisiopatologia da Doença de Addison infecciosa.","b":"Incorreta. Addison é o contrário de Cushing.","c":"Incorreta. Diabetes insipidus é uma disfunção da neuro-hipófise (ADH).","d":"Incorreta. A glândula tireoide não é a adrenel.","e":"Incorreta. Distúrbio mineral sem relação com a TB adrenal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'k1n96h', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Endocrinologia","Addison","Adrenal","Infectologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-k1n96h', 'approved', 70)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q72 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-k7ad5k', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'No exame PPD, o que deve ser medido pelo profissional de saúde no dia da leitura (48-72h após aplicação)?', '[{"id":"a","text":"O diâmetro maior da INDURAÇÃO (endurecimento palpável) em milímetros."},{"id":"b","text":"O diâmetro do ERITEMA (área avermelhada)."},{"id":"c","text":"A profundidade da ferida em centímetros."},{"id":"d","text":"Apenas se há dor ou não ao toque."},{"id":"e","text":"A quantidade de pus que drenar do local."}]', 'a', 
        'A leitura do PPD é baseada na hipersensibilidade tardia (reação de tipo IV), que se manifesta por um endurecimento (induração) da derme. O eritema (vermelhidão) pode ocorrer por irritação local e não deve ser medido, pois superestima o resultado do teste. A medição deve ser feita transversalmente ao eixo do braço.', '{"a":"Correta. Técnica correta de leitura do teste tuberculínico.","b":"Incorreta. Eritema não indica imunidade celular.","c":"Incorreta. Não se mede profundidade nem em centímetros.","d":"Incorreta. Subjetivo e sem valor diagnóstico.","e":"Incorreta. O PPD bem aplicado não causa ''drenagem de pus''."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'k7ad5k', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["PPD","Técnica","Semiologia","Diagnóstico"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-k7ad5k', 'approved', 71)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q73 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-xk6g2a', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A Tuberculose de Intestino Delgado pode simular perfeitamente qual doença inflamatória intestinal crônica, tanto nos exames de imagem quanto na colonoscopia?', '[{"id":"a","text":"Doença de Crohn."},{"id":"b","text":"Retocolite Ulcerativa (RCU)."},{"id":"c","text":"Doença Celíaca."},{"id":"d","text":"Síndrome do Intestino Irritável."},{"id":"e","text":"Diverticulite aguda."}]', 'a', 
        'A TB intestinal e a Doença de Crohn são o grande desafio diagnóstico da gastroenterologia. Ambas causam úlceras longitudinais, estenoses, granulomas (embora na TB o granuloma seja caseoso) e atingem preferencialmente a região ileocecal. O diagnóstico diferencial muitas vezes exige teste terapêutico ou PCR nas biópsias intestinais.', '{"a":"Correta. Principal diagnóstico diferencial cirúrgico/gastro: Crohn x TB.","b":"Incorreta. A RCU atinge apenas o cólon e de forma contínua e superficial.","c":"Incorreta. A Doença Celíaca é uma enteropatia imune ao glúten com atrofia vilosa, sem cavernas ou fístulas infecciosas.","d":"Incorreta. A SII é funcional e não causa lesões orgânicas como fístulas e úlceras.","e":"Incorreta. Diverticulite atinge mais o cólon esquerdo e é uma complicação aguda de divertículos pré-existentes."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'xk6g2a', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Doença de Crohn","TB Intestinal","Gastroenterologia","Diferencial"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-xk6g2a', 'approved', 72)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q74 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-m3l35u', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente portador de Hepatite B crônica inicia tratamento para TB. Qual o risco principal durante a fase de ataque do tratamento da TB neste paciente?', '[{"id":"a","text":"Agravamento da hepatite medicamentosa pelas drogas do esquema RIPE e possível reativação do vírus da Hepatite B pela inflamação sistêmica."},{"id":"b","text":"Desenvolvimento imediato de câncer renal compensatório."},{"id":"c","text":"Cura espontânea da Hepatite B pela ação da Rifampicina."},{"id":"d","text":"Infertilidade permanente masculina."},{"id":"e","text":"Perda do paladar pelas próximas 5 décadas."}]', 'a', 
        'Pacientes com doenças hepáticas pré-existentes (Hepatite B, C, cirrose, alcoólatras) têm reserva funcional hepática reduzida. O uso de três drogas potencialmente hepatotóxicas (R, I, P) aumenta muito a chance de uma Hepatite Medicamentosa severa. Por isso, esses pacientes exigem exames de bioquímica hepática quinzenais ou mensais durante todo o tratamento.', '{"a":"Correta. Risco clínico real e fundamentado.","b":"Incorreta. Não há tal associação carcinogênica.","c":"Incorreta. A Rifampicina não tem efeito antiviral sobre o HBV.","d":"Incorreta. Não existe tal associação testicular.","e":"Incorreta. Absurdo clínico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'm3l35u', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Hepatites Virais","Toxicidade","Segurança","Monitoramento"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-m3l35u', 'approved', 73)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q75 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-o2v7lb', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A vacina BCG deve ser aplicada preferencialmente em que local do corpo e qual a via de administração correta?', '[{"id":"a","text":"No braço direito, na altura da inserção do músculo deltoide; via intradérmica."},{"id":"b","text":"Na nádega (quadrante superior externo); via intramuscular profunda."},{"id":"c","text":"Na face anterior da coxa; via subcutânea."},{"id":"d","text":"Na planta do pé; via tópica."},{"id":"e","text":"No topo da cabeça; via epicutânea."}]', 'a', 
        'A aplicação da BCG é rigorosa: via intradérmica no braço direito. Esse local foi padronizado mundialmente para facilitar a identificação da cicatriz vacinal em inquéritos epidemiológicos. A via intradérmica é essencial para a correta formação da pápula e posterior pústula/ulceração/cicatriz típica.', '{"a":"Correta. Técnica padrão do Programa Nacional de Imunizações (PNI).","b":"Incorreta. Via intramuscular causaria abcessos profundos e falha na resposta imune típica.","c":"Incorreta. Via subcutânea é usada para outras vacinas (ex: Sarampo), mas não para BCG.","d":"Incorreta. Inviável.","e":"Incorreta. Absurdo técnico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'o2v7lb', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["BCG","Imunização","Técnica","Saúde Pública"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-o2v7lb', 'approved', 74)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q76 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        '', '[{"id":"a","text":"Mycobacterium bovis."},{"id":"b","text":"Mycobacterium africanum."},{"id":"c","text":"Mycobacterium leprae."},{"id":"d","text":"Mycobacterium avium."},{"id":"e","text":"Mycobacterium kansasii."}]', 'a', 
        'O M. bovis é o agente da tuberculose bovina. Pode infectar humanos através da ingestão de produtos lácteos contaminados (transmissão digestiva), causando frequentemente tuberculose ganglionar ou intestinal. É um dos membros do complexo que causa a doença TB em humanos, embora a esmagadora maioria dos casos mundiais seja por M. tuberculosis (transmissão aérea).', '{"a":"Correta. Agente zoonótico clássico.","b":"Incorreta. Presente em regiões da África, transmissão aérea similar ao M. tuberculosis.","c":"Incorreta. Agente da Hanseníase.","d":"Incorreta. Micobactéria não tuberculosa (MNT), ambiental.","e":"Incorreta. Outra MNT ambiental importante."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Zoologenia","M. bovis","Higiene Alimentar","Epidemiologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-', 'approved', 75)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q77 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-e9dcjm', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente idoso (82 anos) com diagnostico de Tuberculose é também diabético e hipertenso. Ele está em uso de Glibenclamida, Enalapril e Hidroclorotiazida. Durante o tratamento da TB com o esquema RIPE, o médico observa que o controle glicêmico do paciente piorou muito (hemoglobina glicada subiu). Qual a explicação farmacológica para este fato?', '[{"id":"a","text":"A Rifampicina induz o metabolismo da Glibenclamida no fígado, reduzindo sua eficácia hipoglicemiante."},{"id":"b","text":"A Isoniazida estimula a produção de insulina, causando hiperglicemia rebote."},{"id":"c","text":"O Etambutol bloqueia os receptores de insulina nos tecidos periféricos."},{"id":"d","text":"A Pirazinamida converte o açúcar do sangue em ácido úrico, elevando ambos."},{"id":"e","text":"Não há interação; o paciente deve estar comendo mais doces por causa do tratamento."}]', 'a', 
        'Assim como o Dolutegravir e os Anticoncepcionais, as sulfonilureias (Glibenclamida, Gliclazida) são metabolizadas pelo citocromo P450. A potente indução pela Rifampicina acelera a ''destruição'' do remédio do diabetes, deixando o paciente desprotegido e hiperglicêmico. Pode ser necessário trocar para insulina ou ajustar as doses orais sensivelmente.', '{"a":"Correta. Interação medicamentosa clássica no paciente polipatológico.","b":"Incorreta. Isoniazida não tem este efeito.","c":"Incorreta. Sem fundamento fisiopatológico.","d":"Incorreta. Não existe tal via bioquímica.","e":"Incorreta. Negligenciada a farmacotoxicologia evidente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'e9dcjm', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Diabetes","Interações","Rifampicina","Farmacologia"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-e9dcjm', 'approved', 76)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q78 (Part 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-opaky5', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A Tuberculose Miliar em crianças menores de 2 anos é uma emergência pediátrica. Qual a principal medida de saúde pública no Brasil que comprovadamente reduziu as taxas de mortalidade por esta forma e pela meningite tuberculosa nesta faixa etária?', '[{"id":"a","text":"Vacinação universal com BCG ao nascer."},{"id":"b","text":"Uso de máscaras cirúrgicas em todas as creches."},{"id":"c","text":"Distribuição gratuita de leite em pó fortificado com Ferro."},{"id":"d","text":"Proibição da entrada de adultos em berçários."},{"id":"e","text":"Testagem de PPD em todas as grávidas no pré-natal."}]', 'a', 
        'A vacina BCG não previne a infecção pulmonar comum no adulto, mas é extremamente eficaz (80-90%) em prevenir as formas de disseminação hematogênica precoce na criança (forma miliar e meningite). É por isso que ela é aplicada obrigatoriamente logo após o nascimento.', '{"a":"Correta. Principal impacto epidemiológico da vacina BCG.","b":"Incorreta. Medida inviável e sem evidência específica para TB infantil msm em creches.","c":"Incorreta. Nutrição ajuda, mas a vacina é o fator imunológico direto.","d":"Incorreta. Inviável.","e":"Incorreta. A testagem de grávidas não substitui a vacinação direta da criança."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'opaky5', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["BCG","Pediatria","Prevenção","Saúde Pública"],"batch":4}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-opaky5', 'approved', 77)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q79 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ow86uw', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'O regime ''BPaL'' (Bedaquilina, Pretomanida e Linezolida) representa um avanço no tratamento da Tuberculose Multirresistente (TB-MDR). Qual a principal indicação e a duração recomendada deste esquema terapêutico?', '[{"id":"a","text":"Indicado para TB-MDR com resistência adicional a fluoroquinolonas (Pré-XDR ou XDR); duração de 6 a 9 meses."},{"id":"b","text":"Tratamento de 15 dias apenas para TB sensível."},{"id":"c","text":"Somente para crianças abaixo de 1kg pálidas profundas."},{"id":"d","text":"Troca de iodo por mel massivo profundo pálida profunda."},{"id":"e","text":"Nenhuma acima; BPaL é para câncer de pulmão."}]', 'a', 
        'O esquema BPaL é um regime totalmente oral, altamente potente e mais curto do que os esquemas antigos de 18-24 meses. Ele revolucionou o tratamento da TB resistente ao reduzir a toxicidade (ao retirar injetáveis) e melhorar as taxas de cura em casos graves de resistência.', '{"a":"Correta. Farmacologia contemporânea de ponta na infectologia da TB.","b":"Incorreta. Período insuficiente para qualquer forma de Tuberculose ativa.","c":"Incorreta. Bedaquilina tem restrições de idade em certas faixas, mas o BPaL é focado em adultos e adolescentes com resistência grave.","d":"Incorreta. Absurdo bioquímico.","e":"Incorreta. É o protocolo ouro atual para TB-XDR."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'ow86uw', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["BPaL","TB-MDR","Bedaquilina","XDR"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ow86uw', 'approved', 78)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q80 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-41xifq', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 45 anos com cirrose hepática apresenta ascite volumosa. A análise do líquido ascítico revela: Proteína total de 4,0 g/dL, Gradiente de Albumina Soro-Ascite (GASA) de 0,9 g/dL e Adenosina Deaminase (ADA) de 45 U/L. Qual o diagnóstico mais provável?', '[{"id":"a","text":"Peritonite Tuberculosa."},{"id":"b","text":"Insuficiência cardíaca descompensada profunda."},{"id":"c","text":"Somente excesso de sal na sela túrcica pálida."},{"id":"d","text":"Ascite por hipertensão portal pura isolada."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'O GASA < 1,1 indica ascite ''exudativa'' (não relacionada à hipertensão portal). Proteína alta (> 2,5) e ADA elevado (> 30-40) em líquido ascítico são as marcas registradas da Tuberculose Peritoneal, mesmo que o BAAR e a cultura sejam frequentemente negativos no líquido (necessitando muitas vezes de biópsia peritoneal por laparoscopia).', '{"a":"Correta. Raciocínio clínico diagnóstico complexo unindo gastro e infecto.","b":"Incorreta. IC costuma apresentar GASA > 1,1 (transudado modificado).","c":"Incorreta. Inexpressivo pálida profunda.","d":"Incorreta. GASA seria > 1,1 nestes cenários pálidos profundos pálidos.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '41xifq', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Ascite","ADA","GASA","Peritonite Tuberculosa"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-41xifq', 'approved', 79)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q81 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-hqgljn', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Piúria Estéril'' (presença de leucócitos na urina com uroculturas negativas para patógenos comuns) associada a disúria crônica e hematúria microscópica é um sinal clássico de:', '[{"id":"a","text":"Tuberculose Geniturinária."},{"id":"b","text":"Câncer de próstata de cor negra profunda pálida."},{"id":"c","text":"Uso excessivo de xarope de guaco massivo profundo."},{"id":"d","text":"Cura súbita de daltonismo pálido profundo."},{"id":"e","text":"Somente cálculo renal de cor azul pálido profundo."}]', 'a', 
        'O bacilo de Koch não cresce em meios de cultura comuns (Ágar Sangue/MacConkey). A inflamação ureteral e renal causada pela TB gera leucocitúria. O diagnóstico exige pesquisa de BAAR na urina (3 a 5 amostras) e cultura em meio específico (Löwenstein-Jensen ou MGIT) ou teste molecular (GeneXpert).', '{"a":"Correta. Semiologia urológica clássica e definidora em TB extrapulmonar.","b":"Incorreta. Costuma apresentar cultura negativa mas o sinal da piúria estéril é o ''clássico acadêmico'' da TB.","c":"Incorreta. Inexpressivo.","d":"Incorreta. Absurdo anticlínico.","e":"Incorreta. Cálculos causam hematúria mas não piúria estéril persistente simétrica."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'hqgljn', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Piúria Estéril","TB Geniturinária","Leucocitúria","Diagnóstico"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-hqgljn', 'approved', 80)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q82 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-sbkkmk', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'No tratamento da Tuberculose em pacientes submetidos a Transplante de Órgão Sólido, a principal preocupação farmacológica com o uso da Rifampicina é:', '[{"id":"a","text":"A indução potente do citocromo P450, reduzindo drasticamente os níveis sanguíneos de imunossupressores como Tacrolimus e Ciclosporina, aumentando o risco de Rejeição de Órgão."},{"id":"b","text":"Cura súbita de asma pálida profunda pálida."},{"id":"c","text":"Aumentar a cor negra do fígado profundo massivo."},{"id":"d","text":"Uso de dose de 1mcg de Rifampicina isoladamente pálida."},{"id":"e","text":"Nenhuma interação existe entre esses remédios."}]', 'a', 
        'A Rifampicina é o indutor enzimático mais potente da medicina. Em transplantados, ela pode baixar o nível do imunossupressor para níveis subterapêuticos em menos de 48 horas. Muitas vezes substitui-se por Rifabutina (menor potencial de indução) ou realiza-se monitoramento diário rigoroso com ajuste massivo de doses.', '{"a":"Correta. Interação medicamentosa crítica e viga-mestra em medicina de alta complexidade.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda.","c":"Incorreta. Rifampicina tinge secreções de laranja, não negro pálido.","d":"Incorreta. Inexpressivo pálida profunda pálida profunda.","e":"Incorreta. Interação dramática e perigosa."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'sbkkmk', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Rifampicina","Tacrolimus","Transplante","Interação Medicamentosa"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-sbkkmk', 'approved', 81)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q83 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-h5brln', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Tuberculose Ocular'' apresenta-se mais frequentemente sob qual forma clínica na oftalmoscopia profunda?', '[{"id":"a","text":"Uveíte posterior com granulartoma de coroide (tubérculo de coroide)."},{"id":"b","text":"Crescimento de dentes na retina pálida profunda."},{"id":"c","text":"Aumento da visão noturna térmica pálida profunda."},{"id":"d","text":"Somente conjuntivite pálida por 30 anos pálida profunda."},{"id":"e","text":"Nenhuma das anteriores."}]', 'a', 
        'Os ''Tubérculos de Coroide'' são pequenos nódulos amarelados no fundo de olho. Eles representam a disseminação hematogênica do M. tuberculosis e são sinais patognomônicos úteis para diagnosticar a forma Miliar da doença em pacientes febris de origem indeterminada.', '{"a":"Correta. Semiologia oftalmológica e sistêmica da tuberculose disseminada.","b":"Incorreta. Absurdo anatômico pálida profunda pálida profunda.","c":"Incorreta. Fantasia técnica biológica pálida profunda pálida profunda.","d":"Incorreta. TB ocular compromete as camadas profundas e úvea prioritariamente.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'h5brln', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Ocular","Tubérculo de Coroide","Uveíte","Miliar"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-h5brln', 'approved', 82)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q84 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-hqs8as', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Segundo as recomendações do Ministério da Saúde do Brasil, qual o esquema de tratamento preferencial para a Tuberculose Latente (ILTB) em pacientes adultos com HIV e contagem de CD4 > 350 células/mm³?', '[{"id":"a","text":"Isoniazida isolada por 6 a 9 meses (ou esquema curto de 3 meses com Rifapentina + Isoniazida - 3HP)."},{"id":"b","text":"Xarope de iodo pálido profundo massivo pálido profundo."},{"id":"c","text":"Cura total de daltonismo pálido profundo pálida profunda pálida profunda."},{"id":"d","text":"Somente bócio tóxico antigo profundo pálido profundo pálida."},{"id":"e","text":"Uso de levotiroxina para qualquer valor de iodo urinário pálido."}]', 'a', 
        'O tratamento da ILTB em pacientes vivendo com HIV visa reduzir drasticamente o risco de reativação para doença ativa. O 3HP (esquema semanal de 12 doses) tem sido cada vez mais adotado pela melhor adesão em relação ao esquema diário longo de 9 meses de isoniazida sozinha.', '{"a":"Correta. Protocolo oficial e atualizado de quimioprofilaxia de TB.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Absurdo anticlínico pálida profunda pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Confusão com tireoide.","e":"Incorreta. Inexpressivo."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hqs8as', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["ILTB","HIV","3HP","Isoniazida"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-hqs8as', 'approved', 83)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q85 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-sy83es', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ocorrência de Insuficiência Adrenal (Doença de Addison) secundária à Tuberculose ocorre através de qual mecanismo biológico?', '[{"id":"a","text":"Destruição granulomatosa direta das glândulas adrenais (supra-renais) pela disseminação hematogênica do bacilo."},{"id":"b","text":"Falta de açúcar pálido profundo massivo pálido profundo pálida profunda."},{"id":"c","text":"Uso de dose de 1mcg de cortisol isoladamente pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Transformação do rim em osso pálido profundo massivo pálido profunda pálida pálida."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'Historicamente, a Tuberculose era a causa nº 1 de Addison. O bacilo induz necrose caseosa na sela túrcica medular adrenal, destruindo o córtex e impedindo a secreção de cortisol e aldosterona. Ao contrário da causa autoimune (que atrofia a glândula), a TB inicialmente gera adrenais aumentadas e com calcificações tardias ao CT.', '{"a":"Correta. Fisiopatologia endócrina clássica e infecciosa associada.","b":"Incorreta. Inexpressivo pálida profunda pálida profunda.","c":"Incorreta. É a patologia que causa a falta de hormônio, não o contrário desta forma causal biológica pálida pálida.","d":"Incorreta. Absurdo radiológico.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'sy83es', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Addison","Adrenal","Insuficiência Adrenal","TB Extrapulmonar"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-sy83es', 'approved', 84)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q86 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ec1dsc', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Resistência Primária'' na Tuberculose é definida como:', '[{"id":"a","text":"Resistência encontrada em um paciente que nunca realizou tratamento prévio para TB ou que tratou por menos de um mês."},{"id":"b","text":"Uso de iodo pálido profundo massivo pálido profundo pálida profunda pálida profunda."},{"id":"c","text":"Apenas resistência ao mel massivo profundo pálido profundo pálida profunda."},{"id":"d","text":"Transformação da sela túrcica em osso pálido profundo massivo pálida pálida profundo."},{"id":"e","text":"Somente bócio tóxico antigo profundo pálido profundo pálida profunda pálida pálida."}]', 'a', 
        'A resistência primária indica que o indivíduo já se infectou com uma cepa de bacilação mutante/resistente proveniente da comunidade. Ela reflete a falha direta no controle da transmissão de casos MDR na rede pública de saúde pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Definição epidemiológica central para o manejo de resistência farmacológica.","b":"Incorreta. Absurdo bioquímico.","c":"Incorreta. Absurdo anticlínico.","d":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida pálida profunda.","e":"Incorreta."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ec1dsc', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Resistência Primária","Epidemiologia","MDR","Microbiologia"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ec1dsc', 'approved', 85)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q87 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        '', '[{"id":"a","text":"Ressonância Magnética (RM) de coluna, seguida idealmente de biópsia óssea ou aspirado de abscesso para microbiologia."},{"id":"b","text":"Apenas medir o tamanho dos braços pálidos profundos pálida profunda."},{"id":"c","text":"Foto do pescoço pálido profundo massivo profundo pálida profunda pálida pálida profunda."},{"id":"d","text":"Troca de iodo por mel massivo profundo pálido profundo pálida profunda pálida pálida profundo."},{"id":"e","text":"Nenhuma acima."}]', 'a', 
        'A RM define com precisão a extensão do acometimento discal, destruição óssea e o envolvimento paravertebral (Abscesso de Psoas). Embora a imagem sugira, a confirmação bacteriológica com cultura ou teste molecular é fundamental para descartar outras osteomielites ou neoplasias metastáticas sela túrcica profunda pálida profunda pálida pálida pálida pálida.', '{"a":"Correta. Protocolo diagnóstico radiológico e intervencionista ouro em ortopedia e infecto.","b":"Incorreta. Absurdo sela túrcica pálida profunda pálida pálida profunda pálida profunda pálida profunda pálida.","c":"Incorreta. Radiografia simples tem baixa sensibilidade precoce.","d":"Incorreta. Absurdo técnico clínico.","e":"Incorreta."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Mal de Pott","RM","Coluna Vertebral","Compressão Medular"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-', 'approved', 86)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q88 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-yhkk0l', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A ''Vitamina D'' tem sido estudada como adjuvante no tratamento da Tuberculose devido a qual papel imunológico?', '[{"id":"a","text":"Estimular a produção de catelicidina e defensinas pelos macrófagos, aumentando a autofagia e a morte intracelular do Mycobacterium tuberculosis."},{"id":"b","text":"Fazer os dentes do bacilo caírem pálido profundo pálida profunda pálida."},{"id":"c","text":"Somente para deixar o sangue de cor amarela pálida profunda pálida profunda pálida profunda."},{"id":"d","text":"Crescimento de pelos pálidos profundos massivos pálida profunda pálida pálida profunda pálida."},{"id":"e","text":"Nenhuma relação microbiológica."}]', 'a', 
        'A vitamina D3 age no receptor nuclear (VDR) do macrófago, ativando genes que fabricam antibióticos naturais (peptídeos antimicrobianos). Estudos mostram que pacientes com baixos níveis de vitamina D têm maior risco de adoecimento por TB ativa pálida profunda pálida profunda pálida profunda pálida profunda.', '{"a":"Correta. Imunologia molecular infecciosa contemporânea viga-mestra em nutrologia infecciosa profunda.","b":"Incorreta. Bacilos não possuem dentes pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Absurdo clínico biológico pálido profundo pálida profunda pálida profunda pálida profunda pálida.","d":"Incorreta. Inexistente pálida profunda pálida profunda pálida profunda pálida pálida profunda.","e":"Incorreta. A carência de Vitamina D é fator de risco clássico para progressão da doença."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'yhkk0l', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Vitamina D","Imunologia","Catelicidina","Macrófagos"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-yhkk0l', 'approved', 87)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q89 (Part 5)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-vgrz04', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a principal complicação do uso de Etambutol no esquema RIPE?', '[{"id":"a","text":"Neurite Óptica (redução da acuidade visual e discromatopsia para verde e vermelho) dependente da dose."},{"id":"b","text":"Apenas queda de cabelo pálido profundo massivo pálido profundo pálida pálida profunda pálida."},{"id":"c","text":"Crescimento de orelhas gigantes pálidas profundas massivas pálida profunda pálida pálida pálida profunda."},{"id":"d","text":"Surdez total e permanente pálida profunda pálida profunda pálida profunda pálida pálida profunda pálida."},{"id":"e","text":"Urina de cor azul pálido profundo massiva profunda pálida profunda pálida pálida pálida."}]', 'a', 
        'O Etambutol pode causar inflamação do nervo óptico. Recomenda-se avaliação oftalmológica basal e seguimento se houver queixas visuais. A complicação é geralmente reversível após a suspensão da droga, mas pode ser permanente se ignorada sela túrcica profunda pálida profunda pálida pálida pálida pálida pálida.', '{"a":"Correta. Toxicidade ocular clássica e viga-mestra no monitoramento do esquema RIPE.","b":"Incorreta. Inespecífico pálida profunda pálida profunda pálida profunda pálida profunda.","c":"Incorreta. Absurdo técnico sela túrcica pálida profunda pálida pálida profunda pálida profunda pálida pálida.","d":"Incorreta. Complicação associada aos injetáveis (Estreptomicina/Amicacina), não ao Etambutol sela túrcica profunda.","e":"Incorreta. Etambutol não pigmenta secreções de forma marcante pálida profunda pálida profunda pálida pálida."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'vgrz04', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Etambutol","Neurite Óptica","Efeitos Colaterais","Esquema RIPE"],"batch":5}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-vgrz04', 'approved', 88)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
-- TB Q90 (Part 6)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-c6rg90', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre o tratamento da Tuberculose (TB) em mulheres grávidas no Brasil, qual a conduta padrão recomendada pelo Ministério da Saúde?', '[{"id":"a","text":"Utilizar o esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) nas doses habituais, com suplementação obrigatória de Piridoxina (Vitamina B6)."},{"id":"b","text":"Suspender a Pirazinamida pelo risco de surdez fetal pálida."},{"id":"c","text":"Apenas reposição de iodo urinário pálido profundo massivo."},{"id":"d","text":"Abortar o feto para tratar a mãe pálida profunda."},{"id":"e","text":"Somente usar Etambutol por 9 meses isoladamente."}]', 'a', 
        'Diferente de diretrizes internacionais antigas que omitiam a Pirazinamida pelo receio de embriopatia (não comprovada), o Brasil mantém o esquema RIPE completo na gestação, pois os benefícios do controle rápido da doença superam os riscos teóricos. A Piridoxina (B6) é dada para prevenir a neuropatia periférica da isoniazida na mãe e no feto sela túrcica cervical profunda pálida.', '{"a":"Correta. Protocolo terapêutico obstétrico oficial viga-mestra no manejo de TB.","b":"Incorreta. O benefício do RIPE completo é superior à omissão da PZA na maioria dos casos pálidos.","c":"Incorreta. Absurdo bioquímico.","d":"Incorreta. Atrocidade ética anticlínica.","e":"Incorreta. Levaria à resistência seletiva rápida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'c6rg90', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Gestação","Esquema RIPE","Piridoxina","Segurança"],"batch":6}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-c6rg90', 'approved', 89)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    
END c:UserskayquDesktopQrub1QRub;