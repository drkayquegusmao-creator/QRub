DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-hljbmv', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente masculino, 42 anos, natural de Pernambuco e residente em São Paulo há 10 anos, trabalhador da construção civil, procura a Unidade Básica de Saúde com queixa de tosse produtiva com expectoração amarelada e ocasionalmente hemoptoica há cerca de 2 meses. Relata também febre vespertina não aferida, sudorese noturna que o obriga a trocar a roupa de cama e perda ponderal de 8 kg no período (peso habitual de 75 kg). É tabagista (20 maços-ano) e etilista social. Ao exame físico: emagrecido, eupneico (FR: 18 irpm), afebril no momento, FC: 88 bpm, PA: 110/70 mmHg. Ausculta pulmonar revela estertores creptantes em ápice direito e redução do murmúrio vesicular na mesma região. Sem outras alterações dignas de nota. O médico solicita radiografia de tórax, que demonstra infiltrado reticulonodular com área de cavitação de 2 cm no lobo superior direito. Com base no quadro clínico e radiológico apresentado, a conduta inicial mais adequada para a investigação diagnóstica é:', '[{"id":"a","text":"Solicitar teste rápido molecular para tuberculose (TRM-TB) e cultura para micobactérias em amostra de escarro."},{"id":"b","text":"Iniciar esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) imediatamente devido à alta suspeição clínica."},{"id":"c","text":"Solicitar tomografia de tórax de alta resolução para melhor caracterização da lesão cavitária."},{"id":"d","text":"Realizar broncoscopia com lavado broncoalveolar para pesquisa de fungos e micobactérias."},{"id":"e","text":"Prescrever amoxicilina com clavulanato por 10 dias e reavaliar o paciente após o término do tratamento."}]', 'a', 
        'A apresentação clínica de tosse produtiva e hemoptise crônica, associada a sintomas constitucionais (febre vespertina, sudorese noturna e perda de peso) em um paciente com achados radiológicos sugestivos (infiltrado e cavitação em ápice pulmonar), torna a tuberculose pulmonar o principal diagnóstico diferencial. De acordo com o Manual de Recomendações para o Controle da Tuberculose no Brasil, em adultos e adolescentes com suspeita de TB pulmonar, a conduta diagnóstica inicial de escolha é a realização do Teste Rápido Molecular (TRM-TB), que detecta o DNA do Complexo M. tuberculosis e a resistência à rifampicina em poucas horas. A cultura para micobactérias também deve ser solicitada em conjunto para todos os casos suspeitos, pois é o padrão-ouro e permite a realização do teste de sensibilidade a outras drogas.', '{"a":"Correta. O TRM-TB é o método preferencial para o diagnóstico inicial devido à sua alta sensibilidade e rapidez, devendo ser complementado pela cultura.","b":"Incorreta. O tratamento nunca deve ser iniciado sem a tentativa de confirmação bacteriológica, a menos que o estado clínico seja crítico, o que não é o caso.","c":"Incorreta. Embora a TC ajude, a prioridade absoluta em um sintomático respiratório é a confirmação microbiológica da TB.","d":"Incorreta. A broncoscopia é um exame invasivo reservado para casos onde o escarro é negativo ou o paciente não consegue expectorar.","e":"Incorreta. Tratar como pneumonia bacteriana comum retardaria o diagnóstico de uma doença infectocontagiosa grave com alta suspeição clínica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hljbmv', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tuberculose Pulmonar","Diagnóstico","TRM-TB","Saúde Pública"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-hljbmv', 'approved', 0)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q2 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-dzy4w9', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Uma paciente de 34 anos, técnica de enfermagem em um hospital universitário, apresenta-se com história de tosse seca há 3 semanas, associada a dor pleurítica à direita e febre baixa intermitente (37,8°C). Nega perda de peso importante ou sudorese noturna. Relata contato recente (há 6 meses) com paciente bacilífero em sua unidade de trabalho, sem uso adequado de equipamento de proteção individual na ocasião. Ao exame físico, apresenta diminuição global do murmúrio vesicular em base direita, com macicez à percussão na mesma região. Radiografia de tórax revela derrame pleural à direita ocupando cerca de um terço do hemitórax. Foi realizada toracentese diagnóstica que demonstrou líquido pleural exsudativo, com predomínio de linfócitos (85%), glicose de 70 mg/dL e níveis de Adenosina Deaminase (ADA) de 62 U/L. A pesquisa de BAAR e o TRM-TB no líquido pleural foram negativos. Qual o diagnóstico mais provável para esta paciente e a conduta recomendada?', '[{"id":"a","text":"Tuberculose pleural; iniciar tratamento com esquema RIPE com base no quadro clínico-laboratorial."},{"id":"b","text":"Derrame pleural paraneumônico; iniciar antibioticoterapia de amplo espectro."},{"id":"c","text":"Neoplasia pleural (Mesotelioma); realizar biópsia pleural por agulha ou pleuroscopia."},{"id":"d","text":"Lúpus Eritematoso Sistêmico; pesquisar anticorpos antinucleares (FAN) e células LE no líquido."},{"id":"e","text":"Empiema pleural tuberculoso; realizar drenagem torácica imediata em selo d''água."}]', 'a', 
        'A tuberculose pleural é a forma mais comum de tuberculose extrapulmonar em indivíduos jovens e imunocompetentes. No diagnóstico, o derrame pleural é caracteristicamente um exsudato linfocítico. O nível de ADA (Adenosina Deaminase) elevado (geralmente > 40 U/L) possui alto valor preditivo positivo em regiões com alta prevalência de TB. Embora a sensibilidade da baciloscopia e do TRM-TB no líquido pleural seja baixa (< 10%), o conjunto de quadro clínico (febre, dor pleurítica, contato prévio), líquido exsudativo linfocítico e ADA elevado autorizam o diagnóstico e o início do tratamento, mesmo sem a confirmação de biópsia em primeira instância no contexto brasileiro.', '{"a":"Correta. A tríade clínico-epidemiológica e o nível elevado de ADA no exsudato linfocítico são clássicos da TB pleural.","b":"Incorreta. O quadro é insidioso e o líquido não possui características de exsudato neutrofílico típico de pneumonia.","c":"Incorreta. Embora possível, o ADA elevado e a história epidemiológica tornam a TB muito mais provável em uma paciente jovem.","d":"Incorreta. O derrame lúpico costuma apresentar ADA mais baixo e outros sintomas sistêmicos ausentes aqui.","e":"Incorreta. O derrame da TB pleural clássica é reacional e não um empiema (que conteria pus e alta carga bacteriana), não exigindo drenagem de rotina."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'dzy4w9', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tuberculose Pleural","ADA","Líquido Pleural","Diagnóstico"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-dzy4w9', 'approved', 1)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q3 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-vekpoj', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Homem de 28 anos, portador de HIV (último CD4: 120 células/mm³, carga viral indetectável), em uso regular de TARV há 2 anos, apresenta quadro de cefaleia holocraniana progressiva, vômitos em jato e febre há 10 dias. Há 2 dias, a família relata confusão mental e somolência. Ao exame físico: Glasgow 12, rigidez de nuca presente, sinal de Brudzinski positivo. Sem déficits motores focais. Fundo de olho demonstra borramento de papila bilateral. Realizada tomografia de crânio que demonstrou discreto realce meníngeo basal, sem lesões expansivas ou efeito de massa. A análise do líquido cefalorraquidiano (LCR) revela: 250 células/mm³ (80% linfócitos), proteínas de 180 mg/dL, glicose de 22 mg/dL (glicemia plasmática: 98 mg/dL) e coloração de tinta da China negativa. O TRM-TB no líquor detectou M. tuberculosis sem resistência à rifampicina. Além do início imediato do esquema RIPE, qual medida terapêutica adicional é fundamental para reduzir a mortalidade e as sequelas neurológicas deste paciente?', '[{"id":"a","text":"Adição de dexametasona ao esquema terapêutico por 4 a 8 semanas."},{"id":"b","text":"Mudança da Pirazinamida por Levofloxacino devido à melhor penetração no SNC."},{"id":"c","text":"Drenagem liquórica externa imediata para controle da hipertensão intracraniana."},{"id":"d","text":"Suspensão temporária da TARV para evitar a síndrome inflamatória de reconstituição imune (IRIS)."},{"id":"e","text":"Adição de Anfotericina B lipossomal até o resultado da cultura para fungos."}]', 'a', 
        'A meningoencefalite tuberculosa é a forma mais grave de TB, especialmente em pacientes com imunossupressão avançada. O uso de corticosteroides (dexametasona ou prednisolona) como terapia adjuvante é mandatório e comprovadamente reduz a mortalidade e melhora o prognóstico neurológico, ao modular a resposta inflamatória no espaço subaracnoideo e diminuir o edema cerebral. O início deve ser concomitante ao RIPE.', '{"a":"Correta. O corticosteroide é a única terapia adjuvante com evidência sólida de redução de mortalidade na TB meníngea.","b":"Incorreta. A Pirazinamida penetra bem no LCR e faz parte do esquema padrão de 1ª linha; o Levofloxacino é droga de 2ª linha.","c":"Incorreta. A drenagem é reservada para casos de hidrocefalia obstrutiva evidente, não sendo a ''medida fundamental'' geral de primeira linha descrita.","d":"Incorreta. Em pacientes já em TARV, ela deve ser mantida. Se não estivessem, a introdução seria postergada por 8 semanas, mas nunca suspensa.","e":"Incorreta. O TRM-TB já confirmou a causa; o líquor linfocítico com glicose baixa e proteína alta é típico de TB, não justificando Anfotericina após confirmação de TB."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'vekpoj', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tuberculose Clínica","HIV/AIDS","Neurologia","Corticoterapia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-vekpoj', 'approved', 2)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q4 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-itq58e', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 55 anos, diabético e ex-tabagista, está em tratamento para tuberculose pulmonar sensível há 45 dias com o esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol). Durante consulta de acompanhamento, refere que há uma semana vem notando ''visão embaçada'' e dificuldade para distinguir cores, especialmente o vermelho e o verde. Nega cefaleia ou dor à movimentação ocular. Ao exame oftalmológico, observa-se redução da acuidade visual bilateral e discromatopsia. O fundo de olho é normal nesta fase inicial. Qual fármaco do esquema terapêutico é o provável responsável por este efeito adverso e qual a conduta imediata recomendada?', '[{"id":"a","text":"Etambutol; suspender o fármaco e encaminhar para avaliação especializada."},{"id":"b","text":"Isoniazida; administrar Piridoxina (Vitamina B6) em altas doses."},{"id":"c","text":"Rifampicina; orientar que a alteração é transitória e não exige suspensão."},{"id":"d","text":"Pirazinamida; dosar níveis de ácido úrico no sangue."},{"id":"e","text":"Estreptomicina; realizar audiometria prioritária."}]', 'a', 
        'O Etambutol pode causar neurite óptica retrobulbar, que se manifesta clinicamente como redução da acuidade visual, alterações no campo visual (escotomas centrais) e perda da percepção de cores (verde-vermelho). É um efeito adverso dose-dependente e, por ser frequentemente reversível se detectado precocemente, a suspensão imediata da droga é a medida mais importante. Pacientes acima de 55 anos ou com disfunção renal têm maior risco.', '{"a":"Correta. A toxicidade ocular (neurite óptica) é o efeito colateral clássico do Etambutol.","b":"Incorreta. A Isoniazida causa neuropatia periférica (dormência), não distúrbios de visão colorida.","c":"Incorreta. A Rifampicina pode deixar lágrimas/urina laranjas, mas não causa perda de visão ou discromatopsia.","d":"Incorreta. A Pirazinamida causa hiperuricemia e hepatotoxicidade, sem relação com a visão.","e":"Incorreta. A Estreptomicina é ototóxica (audição/equilíbrio) e não faz parte do esquema RIPE padrão inicial (é usada em casos especiais)."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'itq58e', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Farmacologia","Efeitos Adversos","Etambutol","Oftalmologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-itq58e', 'approved', 3)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q5 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ss9fua', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente feminina, 29 anos, grávida (2ª gestação, 14 semanas), sem comorbidades conhecidas, apresenta tosse produtiva e febre baixa há 4 semanas. A investigação microbiológica por TRM-TB em escarro confirmou M. tuberculosis sensível à rifampicina. Sobre o tratamento da tuberculose ativa durante a gestação no Brasil, assinale a orientação correta:', '[{"id":"a","text":"O esquema RIPE deve ser iniciado normalmente, pois a Rifampicina, Isoniazida e Etambutol são seguros, e a Pirazinamida é recomendada pelo Ministério da Saúde brasileiro na gestação."},{"id":"b","text":"O tratamento deve ser adiado para o segundo trimestre para evitar teratogenicidade dos fármacos."},{"id":"c","text":"A Pirazinamida deve ser excluída do esquema, mantendo-se apenas Rifampicina, Isoniazida e Etambutol por 9 meses."},{"id":"d","text":"A Isoniazida deve ser evitada devido ao risco de malformações no tubo neural do feto."},{"id":"e","text":"Além do esquema RIPE, a estreptomicina deve ser adicionada para garantir a cura da gestante e prevenir a TB congênita."}]', 'a', 
        'No Brasil, o Ministério da Saúde recomenda o tratamento padrão com o esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) para gestantes com tuberculose. Estudos e a vasta experiência clínica nacional demonstram segurança e eficácia, não havendo evidências de teratogenicidade significativa com essas drogas nas doses habituais. A Piridoxina (B6) é recomendada adicionalmente para prevenir neuropatia por Isoniazida na gestante.', '{"a":"Correta. O Brasil utiliza o esquema RIPE padrão em gestantes, tratando-as da mesma forma que não gestantes.","b":"Incorreta. A TB não tratada é muito mais perigosa para a mãe e para o feto do que os fármacos.","c":"Incorreta. Esta era uma recomendação antiga ou utilizada em outros países; no Brasil, a Pirazinamida é mantida.","d":"Incorreta. A Isoniazida é segura na gestação; as malformações de tubo neural dependem de ácido fólico, não de Isoniazida.","e":"Incorreta. A estreptomicina é estritamente contraindicada na gestação devido à toxicidade para o VIII par craniano fetal (surdez)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ss9fua', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Gestação","Terapêutica","Saúde da Mulher","Infectologia Clínica"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ss9fua', 'approved', 4)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q6 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-3y9ju', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Homem de 50 anos, alcoólatra crônico, em tratamento para tuberculose pulmonar há 20 dias, é levado à emergência por familiares com quadro de desorientação, náuseas intensas e icterícia evidente. Os exames laboratoriais revelam: AST (TGO) 520 U/L (VR: até 40), ALT (TGP) 480 U/L (VR: até 40), Bilirrubina Total 6,8 mg/dL (com direta de 5,1 mg/dL) e INR de 1,4. Ao ser diagnosticada a hepatotoxicidade grave induzida por fármacos antituberculose, qual a conduta imediata mais adequada quanto ao tratamento da TB?', '[{"id":"a","text":"Suspender imediatamente todos os fármacos do esquema RIPE."},{"id":"b","text":"Suspender apenas a Pirazinamida e a Isoniazida, mantendo Rifampicina e Etambutol."},{"id":"c","text":"Manter o tratamento e prescrever silimarina e complexo B para proteção hepática."},{"id":"d","text":"Suspender a Rifampicina e a Pirazinamida, mantendo Isoniazida e Etambutol por ser um esquema menos hepatotóxico."},{"id":"e","text":"Reduzir a dose de todos os fármacos para 50% até a normalização das enzimas."}]', 'a', 
        'A conduta na hepatotoxicidade induzida pelo tratamento da TB (definida como elevação de transaminases > 3x o valor de referência se sintomático, ou > 5x se assintomático, ou icterícia) é a suspensão imediata de todos os fármacos potencialmente hepatotóxicos (Rifampicina, Isoniazida e Pirazinamida). Após a normalização dos exames laboratoriais e melhora clínica, os fármacos devem ser reintroduzidos sequencialmente para identificar o causador.', '{"a":"Correta. A suspensão total é a regra de ouro para evitar falência hepática fulminante em caso de toxicidade medicamentosa evidente (icterícia e elevação > 10x das enzimas).","b":"Incorreta. A Rifampicina também é hepatotóxica e deve ser suspensa na fase aguda.","c":"Incorreta. O uso de ''protetores hepáticos'' não substitui a necessidade vital de interromper a agressão tóxica.","d":"Incorreta. A Isoniazida é um dos principais causadores de lesão hepática grave.","e":"Incorreta. A redução de dose não resolve a toxicidade idiossincrática ou metabólica e pode induzir resistência bacteriana."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '3y9ju', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Hepatotoxicidade","Segurança do Paciente","Efeitos Adversos","Infectologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-3y9ju', 'approved', 5)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q7 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-pu61xn', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um homem de 38 anos, em situação de rua, foi diagnosticado com tuberculose pulmonar há 4 meses. Ele iniciou o esquema RIPE, mas abandonou o tratamento após 30 dias por sentir-se melhor. Retorna agora com tosse produtiva intensa, febre alta e emagrecimento importante. O TRM-TB realizado no retorno demonstrou presença de M. tuberculosis com detecção de resistência à rifampicina. Este quadro caracteriza-se como um provável caso de:', '[{"id":"a","text":"Tuberculose Multirresistente (TB-MDR) ou Resistente à Rifampicina (TB-RR)."},{"id":"b","text":"Tuberculose Sensível com recidiva precoce por falha imunológica."},{"id":"c","text":"Tuberculose Extensivamente Resistente (TB-XDR)."},{"id":"d","text":"Tuberculose Monorresistente apenas à Isoniazida."},{"id":"e","text":"Pneumonia de hipersensibilidade por exposição tardia a micobactérias."}]', 'a', 
        'A resistência à rifampicina (TB-RR), detectada isoladamente ou em associação à resistência a outra droga (como a isoniazida, configurando TB-MDR), exige a mudança imediata para esquemas especiais (geralmente contendo bedaquilina, linezolida e fluoroquinolonas). O abandono e o tratamento irregular são os principais fatores de risco para a seleção de cepas resistentes.', '{"a":"Correta. O TRM-TB identifica especificamente a resistência à rifampicina, definindo o caso como TB-RR, manejado como MDR no Brasil.","b":"Incorreta. A detecção de resistência genotípica pelo TRM invalida o diagnóstico de TB sensível.","c":"Incorreta. A TB-XDR exige resistência à rifampicina, isoniazida, uma fluoroquinolona e mais uma droga do Grupo A.","d":"Incorreta. O teste especificamente apontou resistência à rifampicina.","e":"Incorreta. Trata-se de uma doença infecciosa confirmada, não um quadro imunológico/alérgico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'pu61xn', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Resistência Bacteriana","TB-MDR","Epidemiologia","Saúde Pública"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-pu61xn', 'approved', 6)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q8 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ua73oz', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Durante uma investigação de contatos de um paciente com Tuberculose Pulmonar bacilífera (baciloscopia ++), o filho do paciente, de 7 anos, é avaliado. Ele está assintomático, tem radiografia de tórax normal e exame físico sem alterações. Realizou-se a Prova Tuberculínica (PPD), que resultou em 12 mm. O cartão vacinal mostra cicatriz de BCG ao nascimento. Qual a interpretação e a conduta preconizada pelo Ministério da Saúde para esta criança?', '[{"id":"a","text":"Infecção Latente por Tuberculose (ILTB); iniciar tratamento preventivo com Isoniazida ou Rifampicina."},{"id":"b","text":"Tuberculose Ativa com apresentação paucibacilar; iniciar esquema RIPE infantil."},{"id":"c","text":"Imunização prévia por BCG apenas; não requer conduta adicional além da vigilância clínica."},{"id":"d","text":"Tuberculose Larvada; solicitar tomografia de tórax para identificar linfonodomegalias hilares."},{"id":"e","text":"Falso-positivo por exposição a micobactérias não tuberculosas; repetir o PPD em 3 meses."}]', 'a', 
        'Em crianças contatos de bacilíferos, um PPD ≥ 5 mm (independente do status da vacina BCG anterior, se aplicada há mais de 2 anos) com exame clínico e radiológico normal define o diagnóstico de Infecção Latente por Tuberculose (ILTB). A conduta correta é o tratamento preventivo da tuberculose (TPTB) para evitar a progressão para doença ativa, sendo a Rifampicina por 4 meses ou a Isoniazida por 6 a 9 meses as opções terapêuticas preferenciais.', '{"a":"Correta. Contato próximo, assintomático, RX normal e PPD reagente é o cenário clássico para tratamento de ILTB.","b":"Incorreta. Para diagnosticar doença ativa seria necessário sintoma ou alteração radiológica.","c":"Incorreta. O valor de 12 mm em contato de bacilífero é valorizado como infecção, não apenas resposta vacinal.","d":"Incorreta. O termo clínico correto é ILTB e a conduta é profilaxia, não exames invasivos em criança assintomática com RX normal.","e":"Incorreta. No Brasil, país de alta carga, o PPD reagente em contatos deve ser sempre atribuído à infecção pelo M. tuberculosis."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'ua73oz', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["ILTB","Pediatria","Controle de Contatos","PPD"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ua73oz', 'approved', 7)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q9 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ar2632', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 19 anos, do sexo masculino, procura atendimento por aumento de volume indolor em região cervical lateral direita há 3 semanas. Relata que o nódulo é de consistência endurecida, pouco móvel e não apresenta sinais inflamatórios (dor, calor ou rubor). Nega febre, mas refere perda de peso não intencional de 3 kg e astenia. Não há história de contato conhecido com tuberculose. Realizou ultrassonografia cervical que revelou conglomerado de linfonodos com áreas centrais hipoecoicas sugestivas de necrose. A biópsia excisional do linfonodo demonstrou inflamação granulomatosa crônica com necrose de caseificação. A baciloscopia do material foi negativa. Qual o provável diagnóstico e o principal sítio de acometimento da tuberculose extrapulmonar neste caso?', '[{"id":"a","text":"Tuberculose Ganglionar; é a forma extrapulmonar mais comum em imunocompetentes e HIV negativos no Brasil."},{"id":"b","text":"Linfoma de Hodgkin; a necrose de caseificação é um achado patognomônico de doenças linfoproliferativas."},{"id":"c","text":"Sarcoidose; a presença de necrose caseosa afasta o diagnóstico de Tuberculose."},{"id":"d","text":"Artrite Reumatóide com nódulo necrobiótico cervical."},{"id":"e","text":"Câncer de Tireoide metastático; o granuloma é uma reação do hospedeiro ao tumor."}]', 'a', 
        'A tuberculose ganglionar cervical (também conhecida historicamente como escrófula) é a forma mais frequente de tuberculose extrapulmonar em crianças e adultos jovens imunocompetentes. A patologia característica é o granuloma com necrose de caseificação (caseosa). A baciloscopia do material biopsiado costuma ser negativa devido à natureza paucibacilar da lenha, mas o achado histopatológico em contexto clínico sugestivo é altamente diagnóstico no Brasil.', '{"a":"Correta. A descrição clínica e o granuloma caseoso em linfonodo definem a TB ganglionar.","b":"Incorreta. O linfoma não apresenta necrose caseosa (que é típica de micobactérias ou fungos).","c":"Incorreta. Na sarcoidose, os granulomas são tipicamente ''não caseificantes''.","d":"Incorreta. Nódulos reumatoides têm histologia diferente e acometem outras regiões.","e":"Incorreta. O granuloma caseoso não é uma característica de metástase de tumor de tireoide."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ar2632', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tuberculose Extrapulmonar","Patologia","Linfadenopatia","Escrófula"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ar2632', 'approved', 8)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q10 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-2hhr8m', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um presidiário de 45 anos apresenta tosse crônica e cansaço. Ele realiza o Teste Rápido Molecular (TRM-TB), que indica: ''M. tuberculosis detectado: ALTO'' e ''Resistência à Rifampicina: NÃO DETECTADA''. O médico assistente solicita também uma cultura para micobactérias com teste de sensibilidade (TS). Por que a cultura é necessária se o teste molecular já descartou resistência à rifampicina e confirmou o diagnóstico?', '[{"id":"a","text":"Para detectar resistência a outros fármacos (como a Isoniazida), realizar vigilância de cepas circulantes e testar sensibilidade em caso de falha terapêutica."},{"id":"b","text":"Porque o TRM-TB possui baixa sensibilidade para confirmar a cura após o tratamento."},{"id":"c","text":"Para diferenciar o M. tuberculosis das micobactérias atípicas (não tuberculosas)."},{"id":"d","text":"Para verificar se o paciente é portador de fungos associados em ''cavidade'' pulmonar de TB prévia."},{"id":"e","text":"A cultura não é mais necessária segundo os protocolos atuais se o TRM-TB for positivo em ''ALTO'' nível."}]', 'a', 
        'Embora o TRM-TB seja excelente para o diagnóstico rápido e detecção de resistência à rifampicina, ele não detecta resistência a outras drogas essenciais, como a Isoniazida (configurando monorresistência ou resistência MDR se associada). A cultura continua sendo o padrão-ouro e é fundamental para a vigilância epidemiológica, controle de cura e ajuste de esquemas em casos complexos ou recidivas.', '{"a":"Correta. A cultura complementa o molecular permitindo o teste de sensibilidade (TS) completo para todas as drogas do esquema.","b":"Incorreta. O TRM-TB detecta DNA de bactérias mortas, logo não serve para controle de cura, mas isso não justifica o pedido no diagnóstico inicial.","c":"Incorreta. O TRM-TB é específico para o complexo M. tuberculosis.","d":"Incorreta. Cultura de micobactérias é em meio específico (Löwenstein-Jensen), não serve para fungos.","e":"Incorreta. O protocolo brasileiro recomenda cultura e TS para todos os casos confirmados no diagnóstico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '2hhr8m', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Microbiologia","Diagnóstico","Epidemiologia","Saúde Pública"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-2hhr8m', 'approved', 9)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q11 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-bfuus3', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Uma enfermeira de 26 anos participa da busca ativa de sintomáticos respiratórios em uma comunidade. Ela questiona qual o critério para considerar um indivíduo como ''sintomático respiratório'' na população geral para fins de investigação de tuberculose pulmonar. De acordo com as normas técnicas brasileiras, deve-se investigar a TB em:', '[{"id":"a","text":"Toda pessoa com tosse por tempo igual ou superior a 3 semanas."},{"id":"b","text":"Qualquer pessoa com febre vespertina, independente da presença de tosse."},{"id":"c","text":"Apenas indivíduos em situação de rua com tosse há mais de 10 dias."},{"id":"d","text":"Pessoas vivendo com HIV com qualquer tempo de tosse, mas moradores de área urbana apenas se tossirem há mais de 4 semanas."},{"id":"e","text":"Indivíduos que apresentem expectoração purulenta, independente do tempo de tosse."}]', 'a', 
        'Para a população geral no Brasil, o conceito de sintomático respiratório é definido pela presença de tosse por 3 semanas ou mais. No entanto, para populações em maior risco (situação de rua, privados de liberdade, indígenas e imunossuprimidos), esse período de corte é reduzido para qualquer tempo de tosse ou conforme a avaliação clínica inicial.', '{"a":"Correta. Este é o critério epidemiológico clássico adotado pelo Ministério da Saúde para triagem na população geral.","b":"Incorreta. A febre é sintoma, mas a ''tosse'' é o marco definidor do sintomático respiratório na triagem de massa.","c":"Incorreta. Para pessoas em situação de rua, qualquer tempo de tosse já justifica a investigação.","d":"Incorreta. PVHIV também devem ser investigados com qualquer tempo de tosse.","e":"Incorreta. A característica da secreção (purulenta ou hialina) não altera o critério cronológico da triagem."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'bfuus3', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Epidemiologia","Saúde Coletiva","Atenção Básica","Protocolo"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-bfuus3', 'approved', 10)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q12 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ldg4wb', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 62 anos, com insuficiência renal crônica em hemodiálise e histórico de transplante renal prévio (em uso de tacrolimus e micofenolato), apresenta-se com febre de origem indeterminada, sudorese e perda de peso. Radiografia de tórax mostra padrão micronodular ''em grão de milheto'' distribuído difusamente em ambos os pulmões. Foi realizada biópsia de medula óssea que revelou granulomas caseosos. O diagnóstico é Tuberculose Miliar. Qual a fisiopatologia principal desta forma clínica e qual o risco iminente que deve ser investigado neste paciente?', '[{"id":"a","text":"Disseminação hematogênica do bacilo atingindo múltiplos órgãos; deve-se realizar punção lombar mandatória para excluir TB meníngea associada."},{"id":"b","text":"Aspiração maciça de bacilos das vias aéreas superiores; risco de insuficiência respiratória aguda hipoxêmica."},{"id":"c","text":"Reativação de foco de Simon em ápice pleural; risco de pneumotórax hipertensivo."},{"id":"d","text":"Fístula broncoesofágica por linfonodo roto; risco de mediastinite necrotizante."},{"id":"e","text":"Contaminação por micobactérias do banho de diálise; risco de sepse bacteriana secundária."}]', 'a', 
        'A tuberculose militar resulta da disseminação hematogênica (via sangue) do M. tuberculosis, levando à formação de pequenos granulomas em múltiplos órgãos (pulmões, fígado, baço, medula óssea, cérebro). É comum em pacientes com imunossupressão grave. Devido à alta frequência de acometimento concomitante do sistema nervoso central (até 30% dos casos de TB militar), a investigação do LCR é obrigatória mesmo na ausência de sintomas meníngeos clássicos.', '{"a":"Correta. A disseminação é hematogênica e a associação com meningite exige punção lombar preventiva no manejo hospitalar.","b":"Incorreta. A via não é aspiração, e o padrão radiológico é sistêmico, não loco-regional pulmonar agudo comum.","c":"Incorreta. Os focos de Simon são apicais e causam TB pulmonar cavitária clássica, não militar.","d":"Incorreta. Esta é uma complicação anatômica rara, não relacionada à patogênese da TB militar.","e":"Incorreta. A micobactéria da TB não se espalha pelo banho de diálise (seria via inalatória prévia em imunossuprimido)."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'ldg4wb', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tuberculose Miliar","Imunossuprimido","Meningoencefalite","Diagnóstico"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ldg4wb', 'approved', 11)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q13 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-nlw6sa', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente em tratamento de tuberculose pulmonar há 3 meses apresenta persistência de baciloscopia (BAAR) de escarro positiva (++). Ele refere estar tomando os medicamentos corretamente. Esse cenário define um quadro de ''falha terapêutica''. Segundo o Ministério da Saúde, além da falha clínica ou microbiológica no 4º mês, quais as duas principais causas de falha que devem ser descartadas?', '[{"id":"a","text":"Resistência primária/adquirida aos fármacos e má adesão ao tratamento (não supervisionado)."},{"id":"b","text":"Interação medicamentosa com anti-hipertensivos e tabagismo ativo."},{"id":"c","text":"Subtipo de micobactéria bovis (TB bovina) e uso de corticosteroides associados."},{"id":"d","text":"Idade avançada do paciente e co-infecção por vírus da Hepatite C."},{"id":"e","text":"Deficiência de vitamina D e baixa ingestão proteica."}]', 'a', 
        'A falha terapêutica na TB é caracterizada pela persistência de positividade no escarro no final do 4º mês de tratamento. As causas fundamentais a serem investigadas são a resistência bacteriana (que deve ser confirmada por teste de sensibilidade) e a falta de adesão ao tratamento, que é a causa mais comum de insucesso no Brasil. Por isso, o Tratamento Diretamente Observado (TDO) é preconizado para garantir a eficácia.', '{"a":"Correta. São os pilares do insucesso terapêutico: ou o remédio não funciona contra a cepa, ou o paciente não o toma.","b":"Incorreta. Interações com anti-hipertensivos são raras e não causam ''falha'' por si sós.","c":"Incorreta. M. bovis é sensível ao esquema, exceto à pirazinamida, mas não é causa comum de falha em massa.","d":"Incorreta. Embora compliquem, não justificam a baciloscopia positiva persistente se o tratamento for adequado.","e":"Incorreta. São fatores de risco para adoecer, mas não para falha se as drogas forem tomadas contra bacilo sensível."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nlw6sa', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Manejo Clínico","Resistência","ADESÃO","TDO"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-nlw6sa', 'approved', 12)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q14 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ss287d', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um jovem de 21 anos, sem sintomas, vai realizar exame admissional para uma empresa e o PPD solicitado resulta em 15 mm. Ele é vacinado com BCG em dose única ao nascer e não tem histórico de contato com tuberculose. RX de tórax normal. Ele está preocupado com o resultado. Qual a melhor explicação e conduta?', '[{"id":"a","text":"Ele possui Infecção Latente e deve ser apenas acompanhado periodicamente com RX, sem necessidade de tratamento preventivo por não ser grupo de risco."},{"id":"b","text":"Possui Tuberculose latente confirmada e deve iniciar Rifampicina imediata."},{"id":"c","text":"É um falso-positivo devido à BCG, deve-se ignorar o resultado e liberar para o trabalho."},{"id":"d","text":"Ele deve realizar o teste IGRA (Interferon-Gamma Release Assay) para descartar reação cruzada com a BCG."},{"id":"e","text":"O PPD reagente indica que ele está protegido contra formas graves de Tuberculose por toda a vida."}]', 'a', 
        'Em indivíduos imunocompetentes sem contatos conhecidos e sem comorbidades de risco, um PPD reagente (mesmo > 10 mm) isolado num exame de rotina indica apenas que houve contato prévio com o bacilo (infecção). Nestes casos, o risco de progressão para doença ativa é baixo e não há indicação formal de tratamento preventivo de ILTB segundo o protocolo do Ministério da Saúde brasileiro, priorizando-se o tratamento para contatos próximos e grupos de risco definidos.', '{"a":"Correta. Não há benefício comprovado em tratar ILTB em indivíduos saudáveis sem história de contato recente/risco elevado.","b":"Incorreta. Nem toda ILTB exige tratamento medicamentoso; depende da estratificação de risco.","c":"Incorreta. Aos 21 anos, o efeito da BCG no PPD é desprezível; o resultado provavelmente indica infecção real, mas de baixo risco.","d":"Incorreta. O IGRA ajudaria se houvesse dúvida clínica real, mas para fins admissionais o manejo é expectante.","e":"Incorreta. O PPD reagente não é sinal de imunidade protetora, mas de memória imunológica à infecção."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ss287d', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["PPD","ILTB","Saúde Ocupacional","Epidemiologia"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-ss287d', 'approved', 13)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q15 (Part 1)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-xsho4k', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente masculino, 35 anos, inicia tratamento para TB pulmonar cavitária. O médico prescreve o esquema RIPE em dose fixa combinada (4 comprimidos em 1). Sobre a Rifampicina, fármaco central do esquema, qual das seguintes orientações sobre interações medicamentosas é a mais relevante?', '[{"id":"a","text":"Ela é um potente indutor das enzimas do citocromo P450, podendo reduzir drasticamente os níveis séricos de anticoncepcionais, warfarina e antirretrovirais (como Dolutegravir)."},{"id":"b","text":"Ela inibe a excreção renal de lítio, podendo causar intoxicação grave."},{"id":"c","text":"Deve ser evitada com alimentos gordurosos pois sua absorção é inibida por eles."},{"id":"d","text":"Causa quelagem de ferro, devendo ser tomada distante de sulfato ferroso."},{"id":"e","text":"Aumenta o efeito da insulina, predispondo o paciente diabético a crises de hipoglicemia."}]', 'a', 
        'A Rifampicina é um dos indutores enzimáticos mais potentes conhecidos na farmacologia clínica. Ao induzir o citocromo P450 (CYP3A4), ela acelera o metabolismo de inúmeros fármacos, exigindo ajustes de dose frequentes (como dobrar a dose de dolutegravir para 50mg 12/12h ou mudar métodos contraceptivos hormonais para barreira ou DIU).', '{"a":"Correta. Esta interação é crítica no manejo de pacientes com comorbidades e HIV.","b":"Incorreta. Não há interação relevante descrita com o lítio neste mecanismo.","c":"Incorreta. Ela deve ser tomada preferencialmente em jejum, mas a interação com gordura não é o ponto central da farmacodinâmica relevante perguntada.","d":"Incorreta. Esta é uma característica das tetraciclinas e quinolonas.","e":"Incorreta. Frequentemente ocorre o oposto; o controle glicêmico pode ser dificultado pela alteração metabólica hepática."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'xsho4k', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Farmacologia","Interação Medicamentosa","Rifampicina","HIV"],"batch":1}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-xsho4k', 'approved', 14)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q16 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-42fssz', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 48 anos, soropositivo para o HIV há 5 anos, em uso irregular de Terapia Antirretroviral (TARV), procura o serviço de urgência com história de febre intermitente, tosse seca e cansaço aos esforços habituais há 3 semanas. Relata também aumento progressivo de volume em região axilar esquerda. Ao exame físico: descorado (2+/4+), febril (38,2°C), presença de linfonodomegalia axilar de 3 cm, indolor e aderida a planos profundos. Ausculta pulmonar com estertores esparsos. Radiografia de tórax evidencia infiltrado intersticial difuso e linfonodomegalia hilar bilateral. Realizada biópsia de linfonodo axilar cujo exame histopatológico revelou granulomas mal formados, com raros linfócitos e abundantes bacilos álcool-ácido resistentes (BAAR) na coloração de Ziehl-Neelsen. Sobre a apresentação da tuberculose em pacientes com imunodepressão grave (CD4 < 200 células/mm³), como no caso descrito, é correto afirmar:', '[{"id":"a","text":"A apresentação costuma ser atípica, com maior frequência de formas extrapulmonares, disseminadas e exames histopatológicos com granulomas paucibacilares e bem definidos."},{"id":"b","text":"A radiografia de tórax frequentemente apresenta cavitações apicais típicas, semelhantes às encontradas em pacientes imunocompetentes."},{"id":"c","text":"O quadro clínico tende a ser mais grave, com maior probabilidade de anergia aos testes cutâneos (PPD negativo) e achados radiológicos atípicos, como infiltrados em bases pulmonares e linfonodomegalias hilares."},{"id":"d","text":"O tratamento para este paciente deve ser iniciado apenas com Rifampicina e Etambutol para evitar a síndrome inflamatória de reconstituição imune (IRIS)."},{"id":"e","text":"A presença de abundantes BAAR no linfonodo é um achado inesperado e sugere erro laboratorial, dado o caráter paucibacilar da TB ganglionar."}]', 'c', 
        'Em pacientes com infecção avançada pelo HIV e contagem baixa de linfócitos T-CD4, a imunidade celular está severamente comprometida. Isso altera a apresentação da tuberculose: 1) A formação de granulomas é deficiente (granulomas ''frouxos'' ou mal formados); 2) Há maior carga bacilar nas lesões (multibacilaridade paradoxal em tecidos); 3) A radiografia frequentemente não mostra cavitações (que dependem da resposta inflamatória do hospedeiro) e apresenta infiltrados intersticiais ou em campos médios/inferiores; 4) A disseminação hematogênica e o acometimento extrapulmonar são a regra. A anergia ao PPD é comum devido à falta de células para reagir ao antígeno.', '{"a":"Incorreta. Embora a forma seja disseminada, os granulomas em imunodeprimidos são tipicamente mal definidos e ricos em bacilos (multibacilares).","b":"Incorreta. Cavitações são raras na imunodepressão grave pois exigem uma resposta imune exuberante para ocorrer a necrose e expulsão do caseum para a via aérea.","c":"Correta. Resume precisamente a fisiopatologia da interação TB-HIV em estágios avançados.","d":"Incorreta. O tratamento é o esquema RIPE padrão; o tempo de início da TARV é que deve ser manejado para evitar IRIS.","e":"Incorreta. Como explicado, a falta de controle imunológico permite a proliferação desenfreada dos bacilos no tecido, tornando a lesão multibacilar."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '42fssz', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB-HIV","Imunoproficiência","Fisiopatologia","Infectologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-42fssz', 'approved', 15)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q17 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-40kq6y', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um homem de 30 anos, natural da Bolívia e residente em regime de coabitação com outros 10 imigrantes em um dormitório no centro de São Paulo, apresenta febre vespertina e tosse produtiva há 6 semanas. O Teste Rápido Molecular (TRM-TB) detectou M. tuberculosis com resistência à rifampicina. De acordo com os protocolos vigentes para o tratamento da Tuberculose Resistente à Rifampicina (TB-RR) ou Multirresistente (TB-MDR) no Brasil, qual o esquema terapêutico inicial de escolha, desde que não haja contraindicações?', '[{"id":"a","text":"Esquema contendo Bedaquilina, Levofloxacino, Linezolida e Clofazimina por 6 a 9 meses (esquema curto oral)."},{"id":"b","text":"Esquema RIPE estendido por 12 meses com adição de Estreptomicina nos primeiros 2 meses."},{"id":"c","text":"Substituição da Rifampicina pela Rifabutina, mantendo os demais fármacos do esquema primário."},{"id":"d","text":"Tratamento com esquema contendo Amicacina injetável diária por 6 meses associada a Etambutol e Pirazinamida."},{"id":"e","text":"Uso isolado de Levofloxacino e Etionamida até a realização do teste de sensibilidade genotípico completo."}]', 'a', 
        'Recentemente, o Brasil e a OMS passaram a priorizar esquemas totalmente orais e mais curtos para TB-MDR/RR. O esquema padrão atual para casos sem resistência prévia documentada a fluoroquinolonas envolve o uso de Bedaquilina, Levofloxacino, Linezolida e Clofazimina. Este esquema substituiu os antigos protocolos que exigiam drogas injetáveis (como Amicacina/Estreptomicina), apresentando maior adesão e menores taxas de efeitos colaterais graves (como ototoxicidade e nefrotoxicidade).', '{"a":"Correta. É o esquema oral ''all-oral'' preconizado atualmente para resistência à rifampicina.","b":"Incorreta. Se há resistência à rifampicina (viga mestra do RIPE), o esquema primário perde sua eficácia fundamental.","c":"Incorreta. Há resistência cruzada quase total entre Rifampicina e Rifabutina; esta última é usada para evitar interações (ex: HIV), não para tratar resistência.","d":"Incorreta. Drogas injetáveis (aminoglicosídeos) caíram para segunda linha devido à toxicidade.","e":"Incorreta. O tratamento de resistência nunca deve ser feito com apenas duas drogas por risco de ampliação da resistência."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '40kq6y', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB-MDR","Resistência à Rifampicina","Terapêutica Atualizada","Bolívia/Imigração"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-40kq6y', 'approved', 16)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q18 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-mxhrvi', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 25 anos, sem comorbidades, é diagnosticada com Tuberculose Peritoneal após investigação de ascite de início insidioso, associada a perda de peso e febre. Foi submetida a laparoscopia que demonstrou múltiplos ''implantes granulares'' esbranquiçados em peritônio parietal e visceral. A análise do líquido ascítico revelou exsudato linfocítico com ADA de 50 U/L. Durante o tratamento com o esquema RIPE, a paciente informa que deseja engravidar ou se há risco de falha do seu método contraceptivo atual (anticoncepcional oral combinado). Qual a orientação correta a ser fornecida pelo médico?', '[{"id":"a","text":"A Rifampicina acelera o metabolismo dos hormônios anticoncepcionais, reduzindo sua eficácia; deve-se recomendar o uso de métodos de barreira (camisinha) ou DIU durante o tratamento."},{"id":"b","text":"A Isoniazida inibe a absorção intestinal de estrogênios; recomenda-se dobrar a dose do anticoncepcional."},{"id":"c","text":"O esquema RIPE não interfere na eficácia dos anticoncepcionais orais."},{"id":"d","text":"A tuberculose peritoneal causa infertilidade definitiva por salpingite associada, tornando a anticoncepção desnecessária."},{"id":"e","text":"A Pirazinamida aumenta o risco de trombose em usuárias de anticoncepcionais, contraindicando o uso de ambos simultaneamente."}]', 'a', 
        'A Rifampicina é um potente indutor das enzimas do sistema citocromo P450 no fígado (especialmente CYP3A4). Isso aumenta a taxa de degradação da maioria dos esteroides contraceptivos (estrógenos e progestágenos), levando a níveis subestimados no sangue e risco real de gravidez indesejada. A orientação clássica no tratamento da TB é a substituição por métodos não hormonais ou de barreira.', '{"a":"Correta. É uma das interações medicamentosas mais importantes no manejo prático da tuberculose em mulheres no menacme.","b":"Incorreta. O mecanismo da Isoniazida não é esse e ''dobrar a dose'' não é uma conduta validada e segura.","c":"Incorreta. A interação é real e clinicamente significativa.","d":"Incorreta. Embora a TB possa atingir as trompas (salpingite tuberculosa), a infertilidade não é garantidamente definitiva e não justifica suspender a proteção.","e":"Incorreta. Não há essa associação direta de risco trombótico sinérgico descrita para a Pirazinamida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'mxhrvi', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Farmacologia","Saúde da Mulher","Interações","Rifampicina"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-mxhrvi', 'approved', 17)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q19 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-frkv2t', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Em uma maternidade pública, uma puérpera é diagnosticada com Tuberculose Pulmonar bacilífera logo após o parto. Ela está muito preocupada com o bem-estar do seu recém-nascido (RN). Sobre o aleitamento materno e a prevenção da Tuberculose no RN neste cenário, qual a recomendação correta do Ministério da Saúde?', '[{"id":"a","text":"A amamentação deve ser mantida (com uso de máscara cirúrgica pela mãe), mas a vacinação com BCG no RN deve ser adiada e iniciada a quimioprofilaxia primária com Isoniazida ou Rifampicina por 3 meses."},{"id":"b","text":"A amamentação está estritamente contraindicada até que a mãe complete 2 meses de tratamento e tenha baciloscopia negativa."},{"id":"c","text":"O RN deve ser vacinado com BCG imediatamente ao nascer e afastado do contato com a mãe por 15 dias."},{"id":"d","text":"A mãe deve amamentar sem restrições, pois os anticorpos passados pelo leite protegem o bebê contra a TB."},{"id":"e","text":"Deve-se realizar o TRM-TB no mecônio do bebê para diagnosticar TB congênita antes de qualquer medida."}]', 'a', 
        'Em filhos de mães bacilíferas ao parto: 1) Não se vacina com BCG ao nascer (para não interferir com o PPD/IGRA posterior); 2) Inicia-se quimioprofilaxia primária (Isoniazida ou Rifampicina) por 3 meses; 3) Após 3 meses, realiza-se o PPD/IGRA. Se negativo, suspende-se a droga e vacina-se com BCG. Se positivo, mantém-se a droga por mais 3 meses (totalizando 6) e não vacina com BCG. O aleitamento é mantido com máscara e cuidados de higiene.', '{"a":"Correta. Reflete o protocolo nacional de proteção ao RN exposto.","b":"Incorreta. A amamentação é incentivada devido aos benefícios nutricionais e imunológicos, com o uso de máscara pela mãe.","c":"Incorreta. A vacinação precoce com BCG atrapalharia o seguimento diagnóstico posterior da criança e a proteção da quimioprofilaxia é superior no curto prazo.","d":"Incorreta. O leite não transmite anticorpos protetores contra a TB (que exige imunidade celular), mas a proximidade física transmite o bacilo por via aérea.","e":"Incorreta. Investigação no mecônio não faz parte do rastreio de TB no RN exposto pós-parto."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'frkv2t', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Pediatria","Maternidade","BCG","Profilaxia Primária"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-frkv2t', 'approved', 18)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q20 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-mkag7h', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 40 anos, com história de alcoolismo pesado, está no 2º mês de tratamento para tuberculose e apresenta quadro de fraqueza muscular nas pernas, ''queimação'' e formigamento nos pés. Refere que a sensação começou de forma insidiosa e é pior à noite. Ao exame físico, nota-se diminuição da sensibilidade vibratória e dolorosa em botas (membros inferiores). Qual o diagnóstico mais provável e a medida terapêutica para manejo desse efeito colateral?', '[{"id":"a","text":"Neuropatia periférica induzida pela Isoniazida; administrar Piridoxina (Vitamina B6)."},{"id":"b","text":"Hepatotoxicidade oculta; solicitar dosagem de magnésio e potássio."},{"id":"c","text":"Síndrome de Guillain-Barré parainfecciosa; realizar punção lombar."},{"id":"d","text":"Mielotoxicidade pela Rifampicina; solicitar hemograma urgente."},{"id":"e","text":"Insuficiência venosa crônica; prescrever meias de compressão."}]', 'a', 
        'A Isoniazida interfere no metabolismo da Piridoxina (Vitamina B6), o que pode levar a um quadro de neuropatia periférica sensitiva, especialmente em grupos de risco (alcoólatras, diabéticos, gestantes, idosos e desnutridos). A suplementação profilática ou terapêutica com B6 é a conduta de escolha.', '{"a":"Correta. A neuropatia por isoniazida é um efeito colateral clássico e evitável com a reposição de B6.","b":"Incorreta. Distúrbios eletrolíticos podem causar cãibras, mas o padrão ''em botas'' e a queimação são neuropáticos.","c":"Incorreta. O Guillain-Barré é uma polirradiculoneuropatia aguda ascendente, predominantemente motora, diferente deste quadro crônico sensitivo.","d":"Incorreta. A Rifampicina causa anemia hemolítica ou plaquetopenia, não sintomas sensitivos periféricos.","e":"Incorreta. A insuficiência venosa causa edema e peso nas pernas, sem déficits sensitivos objetivos em botas."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'mkag7h', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Efeitos Adversos","Isoniazida","Vitamina B6","Sistema Nervoso"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-mkag7h', 'approved', 19)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q21 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-8avfva', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um homem de 52 anos apresenta-se com artralgia intensa, acompanhada de edema e calor em primeira articulação metatarsofajângica (podagra) à direita. O paciente está no primeiro mês de tratamento para tuberculose. Qual fármaco do esquema RIPE está mais associado a este quadro clínico e por qual mecanismo?', '[{"id":"a","text":"Pirazinamida; por reduzir a excreção renal de ácido úrico, levando à hiperuricemia."},{"id":"b","text":"Etambutol; por induzir a produção endógena de cristais de pirofosfato de cálcio."},{"id":"c","text":"Isoniazida; por causar vasculite de pequenos vasos (pseudo-gota)."},{"id":"d","text":"Rifampicina; pela ativação direta de macrófagos sinoviais."},{"id":"e","text":"Estreptomicina; por toxicidade direta na cartilagem articular."}]', 'a', 
        'A Pirazinamida inibe competitivamente a excreção tubular de ácido úrico, o que frequentemente causa hiperuricemia assintomática durante o tratamento. Em pacientes susceptíveis, pode desencadear crises agudas de gota (artrite gotosa). Se as dores forem leves e suportáveis, mantém-se a medicação com uso de analgésicos/anti-inflamatórios. Se a crise for grave ou persistente, a droga pode precisar de suspensão ou ajuste.', '{"a":"Correta. A gota induzida pela pirazinamida é um efeito secundário metabólico bem conhecido.","b":"Incorreta. O Etambutol atinge o nervo óptico, não o metabolismo de cristais.","c":"Incorreta. A isoniazida não causa esse tipo de reação inflamatória articular.","d":"Incorreta. A Rifampicina não interfere fisiologicamente na sinóvia desta forma.","e":"Incorreta. A estreptomicina atinge o sistema auditivo e renal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8avfva', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Reumatologia","Efeitos Adversos","Pirazinamida","Gota"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-8avfva', 'approved', 20)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q22 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-8wa0fm', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 65 anos, institucionalizada em asilo, apresenta quadro de confusão mental aguda e queda do estado geral. A investigação inicial com RX de tórax demonstrou opacidade em lobo inferior direito, inicialmente tratada como pneumonia bacteriana típica sem melhora após 7 dias de levofloxacino. Foi realizado TRM-TB em escarro induzido, que foi positivo. Sobre a tuberculose no idoso, é correto afirmar:', '[{"id":"a","text":"A apresentação clínica costuma ser insidiosa, podendo simular outras doenças crônicas ou demenciais, e os achados radiológicos frequentemente localizam-se em campos pulmonares médios e inferiores (típico de reativação no idoso)."},{"id":"b","text":"O diagnóstico é facilitado pela presença constante de febre alta e sudorese noturna exuberante."},{"id":"c","text":"A prova tuberculínica (PPD) é invariavelmente positiva devido ao efeito ''booster'' da vacinação na infância."},{"id":"d","text":"O tratamento deve ser feito com doses reduzidas (meia dose) de Rifampicina em todos os pacientes acima de 60 anos."},{"id":"e","text":"A forma miliar é proibitiva nesta faixa etária devido à involução tímica."}]', 'a', 
        'Idosos frequentemente apresentam sintomas inespecíficos para TB (astenia, anorexia, confusão mental) em vez da tríade clássica de tosse/febre/sudorese. Radiologicamente, a reativação da infecção latente no idoso pode assumir padrões ''não cavitários'' e localizar-se em regiões inferiores do pulmão, o que muitas vezes leva ao diagnóstico errôneo de pneumonia bacteriana aspirativa ou comunitária comum.', '{"a":"Correta. O idoso é um grupo com ''máscara clínica'' para TB, exigindo alta suspeição.","b":"Incorreta. Sintomas constitucionais clássicos podem estar ausentes ou atenuados.","c":"Incorreta. A anergia cutânea é frequente no idoso pela imunossenescência.","d":"Incorreta. O tratamento segue as doses padrão baseadas no peso; apenas se monitora mais rigorosamente a hepatotoxicidade.","e":"Incorreta. A forma miliar pode ocorrer em qualquer idade, especialmente em indivíduos com imunidade celular reduzida como o idoso."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '8wa0fm', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Geriatria","Infectologia","Diagnóstico Diferencial"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-8wa0fm', 'approved', 21)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q23 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-cvid6z', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a principal justificativa epidemiológica para o uso do ''Tratamento Diretamente Observado'' (TDO) na estratégia de controle da tuberculose no sistema de saúde brasileiro?', '[{"id":"a","text":"Garantir a adesão do paciente ao tratamento, visando alcançar a cura e interromper a cadeia de transmissão na comunidade, além de evitar o surgimento de cepas resistentes."},{"id":"b","text":"Reduzir o custo do tratamento, ao permitir o fracionamento das doses na unidade de saúde."},{"id":"c","text":"Evitar que o paciente compartilhe seus medicamentos com seus contatos intradomiciliares."},{"id":"d","text":"Permitir a realização de exames de sangue diários para monitorar a função hepática durante a tomada da dose."},{"id":"e","text":"O TDO é apenas obrigatório para pacientes com diagnóstico de Tuberculose Multirresistente."}]', 'a', 
        'O TDO é a base da estratégia DOTS (Directly Observed Treatment Short-course) recomendada pela OMS. O objetivo é assegurar que o paciente tome a medicação corretamente, pois o uso irregular é o maior vilão do controle da TB no mundo: causa falha de cura, mantém a transmissibilidade e favorece a seleção natural de bacilos resistentes às drogas disponíveis.', '{"a":"Correta. O TDO é uma medida de saúde pública e não apenas um cuidado individual.","b":"Incorreta. O TDO pode até ser mais caro logisticamente (exige profissional), mas o custo da ''não cura'' e da multirresistência é infinitamente maior.","c":"Incorreta. O objetivo não é o controle de ''estoque'', mas a garantia da ingestão pelo paciente índice.","d":"Incorreta. Não se faz controle laboratorial diário no TDO.","e":"Incorreta. O TDO é recomendado para TODOS os casos de tuberculose, sensível ou resistente, na atenção primária."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'cvid6z', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Saúde Pública","TDO","Estratégia de Controle","Adesão"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-cvid6z', 'approved', 22)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q24 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-7cfs06', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 44 anos está tratando Tuberculose em esquema RIPE. Ele conta ao médico que seu suor, suas lágrimas e sua urina estão apresentando uma coloração ''laranja-avermelhada'' há alguns dias. De acordo com o conhecimento farmacológico, qual fármaco causa essa alteração e qual a orientação correta?', '[{"id":"a","text":"Rifampicina; orientar que é um efeito inofensivo esperado da eliminação da droga e não exige suspensão."},{"id":"b","text":"Isoniazida; suspender o tratamento por risco de hemólise intravascular aguda."},{"id":"c","text":"Pirazinamida; solicitar exames de função renal pois indica acúmulo de metabólitos."},{"id":"d","text":"Etambutol; indica toxicidade ocular iminente e exige consulta com oftalmologista."},{"id":"e","text":"Não é um efeito esperado; investigar sangramento oculto em vias urinárias e glândulas lacrimais."}]', 'a', 
        'A Rifampicina e seus metabólitos possuem uma coloração natural avermelhada. Por ser eliminada por diversas secreções corporais (urina, suor, lágrimas, saliva), é comum que o paciente note essa alteração. É fundamental avisar o paciente no início do tratamento para evitar pânico ou interrupção do uso.', '{"a":"Correta. Orientação clássica de educação em saúde no tratamento da TB.","b":"Incorreta. A Isoniazida não causa alteração de cor de fluidos.","c":"Incorreta. Não há relação com falha renal ou metabólitos coloridos da pirazinamida.","d":"Incorreta. A toxicidade ocular do etambutol não se manifesta por lágrimas coloridas.","e":"Incorreta. É um efeito fisiológico esperado da droga."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '7cfs06', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Farmacocinética","Rifampicina","Educação em Saúde"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-7cfs06', 'approved', 23)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q25 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-k6q3dp', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Paciente de 37 anos, portador de insuficiência renal crônica (clearance de creatinina de 20 mL/min/1,73m²), inicia tratamento para TB. Sobre o ajuste de dose do esquema convencional para pacientes com disfunção renal severa, qual a recomendação atual?', '[{"id":"a","text":"Manter Rifampicina e Isoniazida em doses normais (eliminação predominantemente hepática) e aumentar o intervalo de administração da Pirazinamida e do Etambutol (ex: 3 vezes por semana)."},{"id":"b","text":"Reduzir a dose de todos os fármacos em 50% de forma proporcional."},{"id":"c","text":"Suspender o Etambutol e substituí-lo por Estreptomicina."},{"id":"d","text":"Não são necessários ajustes pois as micobactérias possuem metabolismo independente da filtração glomerular."},{"id":"e","text":"Indicar apenas Rifampicina e Isoniazida por 12 meses."}]', 'a', 
        'Rifampicina e Isoniazida são metabolizadas e excretadas principalmente pelo fígado e bile, não exigindo ajuste em renais crônicos. Já o Etambutol e a Pirazinamida (ou seus metabólitos ativos) dependem da excreção renal; em pacientes com ClCr < 30 mL/min, a recomendação brasileira é de ajustar o intervalo para 3 vezes por semana (em vez de diário), visando evitar toxicidade acumulada.', '{"a":"Correta. Reflete o manejo técnico do paciente renal na TB.","b":"Incorreta. A redução proporcional não considera a via de eliminação distinta de cada droga.","c":"Incorreta. A Estreptomicina é nefrotóxica e estritamente contraindicada ou usada com extremo cautela em renais crônicos.","d":"Incorreta. Os ajustes são cruciais para a segurança do hospedeiro, não pelo efeito na bactéria.","e":"Incorreta. O esquema seria insuficiente para garantir a cura e evitar resistência sem as outras drogas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'k6q3dp', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Nefrologia","Farmacologia Aplicada","Insuficiência Renal"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-k6q3dp', 'approved', 24)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q26 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-wypo2p', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Homem de 41 anos, sabidamente portador de HIV (CD4: 350 células/mm³), descobre tuberculose e inicia o esquema RIPE. Ele já utiliza TARV com o esquema Tenofovir, Lamivudina e Dolutegravir (TDF/3TC/DTG). Devido à potente indução enzimática da Rifampicina sobre o Dolutegravir, qual o ajuste laboratorial e medicamentoso obrigatório neste paciente?', '[{"id":"a","text":"Aumentar a dose do Dolutegravir para 50 mg de 12 em 12 horas."},{"id":"b","text":"Substituir o Dolutegravir por Efavirenz (600 mg ao dia)."},{"id":"c","text":"Substituir a Rifampicina pela Rifabutina, mantendo o Dolutegravir 50 mg uma vez ao dia."},{"id":"d","text":"Apenas monitorar a carga viral do HIV mensalmente; não são necessários ajustes iniciais."},{"id":"e","text":"Suspender a TARV durante a fase de ataque da tuberculose (primeiros 2 meses)."}]', 'a', 
        'A Rifampicina induz o metabolismo do Dolutegravir (um inibidor de integrase), reduzindo significativamente seu nível terapêutico. Para compensar essa indução em pacientes usando Rifampicina, a dose do DTG deve ser dobrada (50 mg BID - 12/12h). A opção de trocar por Rifabutina (C) também existe, mas exige que o serviço tenha o medicamento disponível (que é mais caro e menos acessível que o ajuste de dose do DTG no SUS).', '{"a":"Correta. É a conduta operacional padrão no protocolo de co-infecção TB-HIV no Brasil de 2024.","b":"Incorreta. O Dolutegravir é superior ao Efavirenz em eficácia e menos tóxico; o ajuste de dose permite mantê-lo.","c":"Incorreta. Embora a Rifabutina tenha menos interação, o ajuste do DTG é a conduta primária mais comum no sistema público pelo custo.","d":"Incorreta. O paciente sofreria falha virológica do HIV rapidamente sem o ajuste.","e":"Incorreta. A suspensão da TARV em quem já a utiliza aumenta a mortalidade e o risco de doenças oportunistas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'wypo2p', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB-HIV","Infectologia","Farmacodinâmica","Dolutegravir"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-wypo2p', 'approved', 25)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q27 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-f5hnva', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Sobre o manejo da Infecção Latente por Tuberculose (ILTB) em pacientes que iniciarão uso de drogas imunobiológicas (como Anti-TNF, ex: Infliximabe), qual a conduta correta no Brasil?', '[{"id":"a","text":"Realizar PPD ou IGRA para todos; se PPD ≥ 5 mm (ou IGRA positivo), deve-se iniciar o tratamento preventivo da TB (TPTB) e aguardar, preferencialmente, pelo menos 1 mês de tratamento antes de iniciar o biológico."},{"id":"b","text":"O tratamento preventivo só deve ser iniciado se o PPD for superior a 15 mm, devido ao baixo risco dos Anti-TNF."},{"id":"c","text":"Se o paciente for vacinado com BCG, o PPD deve ser ignorado e o tratamento preventivo iniciado para todos os pacientes independente do teste."},{"id":"d","text":"Biológicos não exigem triagem para TB pois agem apenas na inflamação articular/intestinal."},{"id":"e","text":"O tratamento da ILTB nesses pacientes deve ser feito obrigatoriamente com o esquema RIPE completo por 6 meses."}]', 'a', 
        'Os inibidores de TNF-alfa bloqueiam uma citocina crucial para a manutenção do granuloma que ''aprisiona'' o bacilo da TB. O início dessas drogas em portadores de ILTB causa reativação explosiva, frequentemente com formas disseminadas. A triagem com PPD (ponto de corte 5 mm) ou IGRA é obrigatória, e o TPTB deve idealmente ser iniciado 1 mês antes da primeira dose do biológico.', '{"a":"Correta. É o protocolo de segurança para uso de imunobiológicos.","b":"Incorreta. O risco com Anti-TNF é altíssimo; o corte de 5 mm visa não perder casos de infecção silenciosa.","c":"Incorreta. O protocolo prevê a realização do teste; o tratamento ''cego'' não é preconizado.","d":"Incorreta. Como explicado, o TNF é essencial para conter o M. tuberculosis.","e":"Incorreta. O tratamento de infecção LATENTE é feito com monoterapia (Isoniazida) ou Rifampicina, não com RIPE."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'f5hnva', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["ILTB","Imunobiológicos","SEGURANÇA","Protocolo"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-f5hnva', 'approved', 26)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q28 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-4khpyb', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'A Tuberculose Osteoarticular (Mal de Pott) atinge frequentemente a coluna vertebral. Qual o mecanismo de dor e a deformidade clássica esperada no exame físico deste paciente?', '[{"id":"a","text":"Dor nas costas insidiosa e deformidade em gibosidade (cifose angular) por colapso dos corpos vertebrais anteriores."},{"id":"b","text":"Dor súbita e escoliose severa por espasmo da musculatura paravertebral."},{"id":"c","text":"Pseudoartrose cervical e pescoço rígido por fusão atlanto-axial."},{"id":"d","text":"Lombalgia puramente mecânica sem alterações na inspeção estática."},{"id":"e","text":"Hiperlordose lombar compensatória por fraqueza dos glúteos."}]', 'a', 
        'O Mal de Pott é a tuberculose vertebral. O bacilo causa necrose caseosa e destruição do tecido ósseo, geralmente começando na parte anterior do corpo vertebral e se espalhando para o disco intervertebral. O colapso da porção anterior das vértebras leva à deformidade em cifose angular, chamada de ''giba'', que é o marco visual da doença avançada ou sequelar.', '{"a":"Correta. A gibosidade é o achado clássico do Mal de Pott.","b":"Incorreta. A instalação é tipicamente lenta (meses), não súbita.","c":"Incorreta. A TB vertebral atinge mais frequentemente a transição toracolombar, não a região cervical alta.","d":"Incorreta. Em fases avançadas, a deformidade é evidente.","e":"Incorreta. Como há colapso vertebral anterior, a deformidade é em flexão (cifose), não em extensão (lordose)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4khpyb', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tuberculose Óssea","Mal de Pott","Ortopedia","Infectologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-4khpyb', 'approved', 27)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q29 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-je2ncy', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Um paciente de 46 anos, diagnosticado com tuberculose pulmonar há 2 meses, apresenta melhora total da tosse e da febre. Ele está muito feliz com o resultado e pergunta se já pode parar de tomar os remédios. Qual a justificativa científica correta para completar os 6 meses de tratamento?', '[{"id":"a","text":"O bacilo da TB possui diferentes populações metabólicas; os remédios matam rapidamente os bacilos em replicação ativa (fase de ataque), mas os bacilos ''persistentes'' ou dormentes exigem tempo prolongado (fase de manutenção) para serem eliminados e evitar recidivas."},{"id":"b","text":"É necessário esse tempo para que o corpo crie anticorpos (IgG) protetores contra novas infecções."},{"id":"c","text":"A medicação precisa se acumular no tecido gorduroso para ter efeito residual por 5 anos."},{"id":"d","text":"Se parar agora, ele desenvolverá alergia grave aos fármacos caso precise usá-los novamente no futuro."},{"id":"e","text":"Os 6 meses são um critério administrativo da OMS para facilitar a contagem de estatísticas de cura."}]', 'a', 
        'O M. tuberculosis cresce em diferentes nichos e velocidades. A fase de ataque (2 meses) elimina os bacilos de crescimento rápido (reduzindo a carga bacilar e a transmissibilidade). No entanto, existem populações de bacilos em ''semidormência'' (crescimento lento ou intermitente) dentro dos granulomas ou macrófagos. Somente a fase de manutenção prolongada consegue erradicar esses ''persisters'', garantindo a cura esterilizante e prevenindo que a doença retorne após o fim do tratamento (recidiva).', '{"a":"Correta. Explica a fundamentação biológica do tempo de tratamento.","b":"Incorreta. A proteção contra a TB não é mediada por anticorpos circulantes (imunidade humoral).","c":"Incorreta. O fármaco não funciona por acúmulo em gordura, mas por ação bactericida/bacteriostática direta nas populações bacilares.","d":"Incorreta. O risco principal não é a alergia, mas a falha de cura e a resistência.","e":"Incorreta. Os 6 meses foram definidos por rigorosos estudos clínicos (estudos de Madras, etc.) para minimizar recidivas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'je2ncy', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Fisiopatologia","Manejo Clínico","Aderência","Microbiologia"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-je2ncy', 'approved', 28)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q30 (Part 2)
    
INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-tl54o4', 'medicina', 'clinica-medica', 'd6782401-1302-41a0-9a23-c879ededd6b8', 'd6782401-1302-41a0-9a23-c879ededd6b8', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0', '7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0',
        'Qual a conduta recomendada para um profissional de saúde que apresenta um PPD inicial negativo ao ser admitido em um hospital de referência para tuberculose, mas que após 1 ano de trabalho apresenta conversão para PPD positivo (12 mm)? O profissional está totalmente assintomático e tem RX de tórax normal.', '[{"id":"a","text":"Realizar diagnóstico de Infecção Latente por Tuberculose (conversão tuberculínica recente) e iniciar tratamento preventivo da TB (TPTB)."},{"id":"b","text":"Apenas afastar o profissional do contato com pacientes até que o PPD negative."},{"id":"c","text":"Internação imediata para isolamento respiratório em quarto com pressão negativa."},{"id":"d","text":"Repetir o PPD em 15 dias; se mantiver 12 mm, realizar broncoscopia."},{"id":"e","text":"Considerar portador de TB-MDR e iniciar esquema especial com bedaquilina."}]', 'a', 
        'A ''conversão tuberculínica'' (um PPD que era negativo e passa a ser positivo, com incremento de pelo menos 10 mm em relação ao teste anterior num intervalo de até 2 anos) indica uma infecção RECENTE. Em profissionais de saúde, isso implica um altíssimo risco de progressão para doença ativa no curto prazo. Como os sintomas e o RX são negativos, o diagnóstico é ILTB e o tratamento preventivo é mandatório para proteção do trabalhador.', '{"a":"Correta. Conversão em profissional exposto é indicação formal de TPTB.","b":"Incorreta. O PPD raramente negativa; o afastamento não trata a infecção já estabelecida.","c":"Incorreta. Ele não tem doença ativa (é assintomático com RX normal) e não transmite o bacilo.","d":"Incorreta. Não há sentido em repetir em 15 dias e a broncoscopia é desnecessária em assintomático com RX normal.","e":"Incorreta. Não se assume resistência sem evidência genotípica ou falha de tratamento prévio."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'tl54o4', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Vigilância Ocupacional","ILTB","Infectologia","PPD"],"batch":2}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata, 
        specialty_id = EXCLUDED.specialty_id, subspecialty_id = EXCLUDED.subspecialty_id, 
        subject_id = EXCLUDED.subject_id, tema_id = EXCLUDED.tema_id;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES ('44bb9f70-13d0-42e0-808e-8ded933cea6a', 'FGV-TB-tl54o4', 'approved', 29)
    ON CONFLICT (package_id, question_id) DO UPDATE SET status = 'approved';

    -- TB Q31 (Part 3)
    
END c:UserskayquDesktopQrub1QRub;