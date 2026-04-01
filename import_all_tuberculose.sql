DO $$
DECLARE
    p_id UUID := '44BB9F70-13D0-42E0-808E-8DED933CEA6A';
BEGIN
    -- Q1 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-hljbmv', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente masculino, 42 anos, natural de Pernambuco e residente em São Paulo há 10 anos, trabalhador da construção civil, procura a Unidade Básica de Saúde com queixa de tosse produtiva com expectoração amarelada e ocasionalmente hemoptoica há cerca de 2 meses. Relata também febre vespertina não aferida, sudorese noturna que o obriga a trocar a roupa de cama e perda ponderal de 8 kg no período (peso habitual de 75 kg). É tabagista (20 maços-ano) e etilista social. Ao exame físico: emagrecido, eupneico (FR: 18 irpm), afebril no momento, FC: 88 bpm, PA: 110/70 mmHg. Ausculta pulmonar revela estertores creptantes em ápice direito e redução do murmúrio vesicular na mesma região. Sem outras alterações dignas de nota. O médico solicita radiografia de tórax, que demonstra infiltrado reticulonodular com área de cavitação de 2 cm no lobo superior direito. Com base no quadro clínico e radiológico apresentado, a conduta inicial mais adequada para a investigação diagnóstica é:', '[{"id":"a","text":"Solicitar teste rápido molecular para tuberculose (TRM-TB) e cultura para micobactérias em amostra de escarro."},{"id":"b","text":"Iniciar esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) imediatamente devido à alta suspeição clínica."},{"id":"c","text":"Solicitar tomografia de tórax de alta resolução para melhor caracterização da lesão cavitária."},{"id":"d","text":"Realizar broncoscopia com lavado broncoalveolar para pesquisa de fungos e micobactérias."},{"id":"e","text":"Prescrever amoxicilina com clavulanato por 10 dias e reavaliar o paciente após o término do tratamento."}]', 'a', 
        'A apresentação clínica de tosse produtiva e hemoptise crônica, associada a sintomas constitucionais (febre vespertina, sudorese noturna e perda de peso) em um paciente com achados radiológicos sugestivos (infiltrado e cavitação em ápice pulmonar), torna a tuberculose pulmonar o principal diagnóstico diferencial. De acordo com o Manual de Recomendações para o Controle da Tuberculose no Brasil, em adultos e adolescentes com suspeita de TB pulmonar, a conduta diagnóstica inicial de escolha é a realização do Teste Rápido Molecular (TRM-TB), que detecta o DNA do Complexo M. tuberculosis e a resistência à rifampicina em poucas horas. A cultura para micobactérias também deve ser solicitada em conjunto para todos os casos suspeitos, pois é o padrão-ouro e permite a realização do teste de sensibilidade a outras drogas.', '{"a":"Correta. O TRM-TB é o método preferencial para o diagnóstico inicial devido à sua alta sensibilidade e rapidez, devendo ser complementado pela cultura.","b":"Incorreta. O tratamento nunca deve ser iniciado sem a tentativa de confirmação bacteriológica, a menos que o estado clínico seja crítico, o que não é o caso.","c":"Incorreta. Embora a TC ajude, a prioridade absoluta em um sintomático respiratório é a confirmação microbiológica da TB.","d":"Incorreta. A broncoscopia é um exame invasivo reservado para casos onde o escarro é negativo ou o paciente não consegue expectorar.","e":"Incorreta. Tratar como pneumonia bacteriana comum retardaria o diagnóstico de uma doença infectocontagiosa grave com alta suspeição clínica."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'hljbmv', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Tuberculose Pulmonar","Diagnóstico","TRM-TB","Saúde Pública"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-hljbmv', 'approved', 0)
    ON CONFLICT DO NOTHING;

    -- Q2 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-dzy4w9', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Uma paciente de 34 anos, técnica de enfermagem em um hospital universitário, apresenta-se com história de tosse seca há 3 semanas, associada a dor pleurítica à direita e febre baixa intermitente (37,8°C). Nega perda de peso importante ou sudorese noturna. Relata contato recente (há 6 meses) com paciente bacilífero em sua unidade de trabalho, sem uso adequado de equipamento de proteção individual na ocasião. Ao exame físico, apresenta diminuição global do murmúrio vesicular em base direita, com macicez à percussão na mesma região. Radiografia de tórax revela derrame pleural à direita ocupando cerca de um terço do hemitórax. Foi realizada toracentese diagnóstica que demonstrou líquido pleural exsudativo, com predomínio de linfócitos (85%), glicose de 70 mg/dL e níveis de Adenosina Deaminase (ADA) de 62 U/L. A pesquisa de BAAR e o TRM-TB no líquido pleural foram negativos. Qual o diagnóstico mais provável para esta paciente e a conduta recomendada?', '[{"id":"a","text":"Tuberculose pleural; iniciar tratamento com esquema RIPE com base no quadro clínico-laboratorial."},{"id":"b","text":"Derrame pleural paraneumônico; iniciar antibioticoterapia de amplo espectro."},{"id":"c","text":"Neoplasia pleural (Mesotelioma); realizar biópsia pleural por agulha ou pleuroscopia."},{"id":"d","text":"Lúpus Eritematoso Sistêmico; pesquisar anticorpos antinucleares (FAN) e células LE no líquido."},{"id":"e","text":"Empiema pleural tuberculoso; realizar drenagem torácica imediata em selo d''água."}]', 'a', 
        'A tuberculose pleural é a forma mais comum de tuberculose extrapulmonar em indivíduos jovens e imunocompetentes. No diagnóstico, o derrame pleural é caracteristicamente um exsudato linfocítico. O nível de ADA (Adenosina Deaminase) elevado (geralmente > 40 U/L) possui alto valor preditivo positivo em regiões com alta prevalência de TB. Embora a sensibilidade da baciloscopia e do TRM-TB no líquido pleural seja baixa (< 10%), o conjunto de quadro clínico (febre, dor pleurítica, contato prévio), líquido exsudativo linfocítico e ADA elevado autorizam o diagnóstico e o início do tratamento, mesmo sem a confirmação de biópsia em primeira instância no contexto brasileiro.', '{"a":"Correta. A tríade clínico-epidemiológica e o nível elevado de ADA no exsudato linfocítico são clássicos da TB pleural.","b":"Incorreta. O quadro é insidioso e o líquido não possui características de exsudato neutrofílico típico de pneumonia.","c":"Incorreta. Embora possível, o ADA elevado e a história epidemiológica tornam a TB muito mais provável em uma paciente jovem.","d":"Incorreta. O derrame lúpico costuma apresentar ADA mais baixo e outros sintomas sistêmicos ausentes aqui.","e":"Incorreta. O derrame da TB pleural clássica é reacional e não um empiema (que conteria pus e alta carga bacteriana), não exigindo drenagem de rotina."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'dzy4w9', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Tuberculose Pleural","ADA","Líquido Pleural","Diagnóstico"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-dzy4w9', 'approved', 1)
    ON CONFLICT DO NOTHING;

    -- Q3 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-vekpoj', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Homem de 28 anos, portador de HIV (último CD4: 120 células/mm³, carga viral indetectável), em uso regular de TARV há 2 anos, apresenta quadro de cefaleia holocraniana progressiva, vômitos em jato e febre há 10 dias. Há 2 dias, a família relata confusão mental e somolência. Ao exame físico: Glasgow 12, rigidez de nuca presente, sinal de Brudzinski positivo. Sem déficits motores focais. Fundo de olho demonstra borramento de papila bilateral. Realizada tomografia de crânio que demonstrou discreto realce meníngeo basal, sem lesões expansivas ou efeito de massa. A análise do líquido cefalorraquidiano (LCR) revela: 250 células/mm³ (80% linfócitos), proteínas de 180 mg/dL, glicose de 22 mg/dL (glicemia plasmática: 98 mg/dL) e coloração de tinta da China negativa. O TRM-TB no líquor detectou M. tuberculosis sem resistência à rifampicina. Além do início imediato do esquema RIPE, qual medida terapêutica adicional é fundamental para reduzir a mortalidade e as sequelas neurológicas deste paciente?', '[{"id":"a","text":"Adição de dexametasona ao esquema terapêutico por 4 a 8 semanas."},{"id":"b","text":"Mudança da Pirazinamida por Levofloxacino devido à melhor penetração no SNC."},{"id":"c","text":"Drenagem liquórica externa imediata para controle da hipertensão intracraniana."},{"id":"d","text":"Suspensão temporária da TARV para evitar a síndrome inflamatória de reconstituição imune (IRIS)."},{"id":"e","text":"Adição de Anfotericina B lipossomal até o resultado da cultura para fungos."}]', 'a', 
        'A meningoencefalite tuberculosa é a forma mais grave de TB, especialmente em pacientes com imunossupressão avançada. O uso de corticosteroides (dexametasona ou prednisolona) como terapia adjuvante é mandatório e comprovadamente reduz a mortalidade e melhora o prognóstico neurológico, ao modular a resposta inflamatória no espaço subaracnoideo e diminuir o edema cerebral. O início deve ser concomitante ao RIPE.', '{"a":"Correta. O corticosteroide é a única terapia adjuvante com evidência sólida de redução de mortalidade na TB meníngea.","b":"Incorreta. A Pirazinamida penetra bem no LCR e faz parte do esquema padrão de 1ª linha; o Levofloxacino é droga de 2ª linha.","c":"Incorreta. A drenagem é reservada para casos de hidrocefalia obstrutiva evidente, não sendo a ''medida fundamental'' geral de primeira linha descrita.","d":"Incorreta. Em pacientes já em TARV, ela deve ser mantida. Se não estivessem, a introdução seria postergada por 8 semanas, mas nunca suspensa.","e":"Incorreta. O TRM-TB já confirmou a causa; o líquor linfocítico com glicose baixa e proteína alta é típico de TB, não justificando Anfotericina após confirmação de TB."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'vekpoj', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Tuberculose Clínica","HIV/AIDS","Neurologia","Corticoterapia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-vekpoj', 'approved', 2)
    ON CONFLICT DO NOTHING;

    -- Q4 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-itq58e', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 55 anos, diabético e ex-tabagista, está em tratamento para tuberculose pulmonar sensível há 45 dias com o esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol). Durante consulta de acompanhamento, refere que há uma semana vem notando ''visão embaçada'' e dificuldade para distinguir cores, especialmente o vermelho e o verde. Nega cefaleia ou dor à movimentação ocular. Ao exame oftalmológico, observa-se redução da acuidade visual bilateral e discromatopsia. O fundo de olho é normal nesta fase inicial. Qual fármaco do esquema terapêutico é o provável responsável por este efeito adverso e qual a conduta imediata recomendada?', '[{"id":"a","text":"Etambutol; suspender o fármaco e encaminhar para avaliação especializada."},{"id":"b","text":"Isoniazida; administrar Piridoxina (Vitamina B6) em altas doses."},{"id":"c","text":"Rifampicina; orientar que a alteração é transitória e não exige suspensão."},{"id":"d","text":"Pirazinamida; dosar níveis de ácido úrico no sangue."},{"id":"e","text":"Estreptomicina; realizar audiometria prioritária."}]', 'a', 
        'O Etambutol pode causar neurite óptica retrobulbar, que se manifesta clinicamente como redução da acuidade visual, alterações no campo visual (escotomas centrais) e perda da percepção de cores (verde-vermelho). É um efeito adverso dose-dependente e, por ser frequentemente reversível se detectado precocemente, a suspensão imediata da droga é a medida mais importante. Pacientes acima de 55 anos ou com disfunção renal têm maior risco.', '{"a":"Correta. A toxicidade ocular (neurite óptica) é o efeito colateral clássico do Etambutol.","b":"Incorreta. A Isoniazida causa neuropatia periférica (dormência), não distúrbios de visão colorida.","c":"Incorreta. A Rifampicina pode deixar lágrimas/urina laranjas, mas não causa perda de visão ou discromatopsia.","d":"Incorreta. A Pirazinamida causa hiperuricemia e hepatotoxicidade, sem relação com a visão.","e":"Incorreta. A Estreptomicina é ototóxica (audição/equilíbrio) e não faz parte do esquema RIPE padrão inicial (é usada em casos especiais)."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'itq58e', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Farmacologia","Efeitos Adversos","Etambutol","Oftalmologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-itq58e', 'approved', 3)
    ON CONFLICT DO NOTHING;

    -- Q5 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ss9fua', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente feminina, 29 anos, grávida (2ª gestação, 14 semanas), sem comorbidades conhecidas, apresenta tosse produtiva e febre baixa há 4 semanas. A investigação microbiológica por TRM-TB em escarro confirmou M. tuberculosis sensível à rifampicina. Sobre o tratamento da tuberculose ativa durante a gestação no Brasil, assinale a orientação correta:', '[{"id":"a","text":"O esquema RIPE deve ser iniciado normalmente, pois a Rifampicina, Isoniazida e Etambutol são seguros, e a Pirazinamida é recomendada pelo Ministério da Saúde brasileiro na gestação."},{"id":"b","text":"O tratamento deve ser adiado para o segundo trimestre para evitar teratogenicidade dos fármacos."},{"id":"c","text":"A Pirazinamida deve ser excluída do esquema, mantendo-se apenas Rifampicina, Isoniazida e Etambutol por 9 meses."},{"id":"d","text":"A Isoniazida deve ser evitada devido ao risco de malformações no tubo neural do feto."},{"id":"e","text":"Além do esquema RIPE, a estreptomicina deve ser adicionada para garantir a cura da gestante e prevenir a TB congênita."}]', 'a', 
        'No Brasil, o Ministério da Saúde recomenda o tratamento padrão com o esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) para gestantes com tuberculose. Estudos e a vasta experiência clínica nacional demonstram segurança e eficácia, não havendo evidências de teratogenicidade significativa com essas drogas nas doses habituais. A Piridoxina (B6) é recomendada adicionalmente para prevenir neuropatia por Isoniazida na gestante.', '{"a":"Correta. O Brasil utiliza o esquema RIPE padrão em gestantes, tratando-as da mesma forma que não gestantes.","b":"Incorreta. A TB não tratada é muito mais perigosa para a mãe e para o feto do que os fármacos.","c":"Incorreta. Esta era uma recomendação antiga ou utilizada em outros países; no Brasil, a Pirazinamida é mantida.","d":"Incorreta. A Isoniazida é segura na gestação; as malformações de tubo neural dependem de ácido fólico, não de Isoniazida.","e":"Incorreta. A estreptomicina é estritamente contraindicada na gestação devido à toxicidade para o VIII par craniano fetal (surdez)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ss9fua', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Gestação","Terapêutica","Saúde da Mulher","Infectologia Clínica"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-ss9fua', 'approved', 4)
    ON CONFLICT DO NOTHING;

    -- Q6 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-3y9ju', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Homem de 50 anos, alcoólatra crônico, em tratamento para tuberculose pulmonar há 20 dias, é levado à emergência por familiares com quadro de desorientação, náuseas intensas e icterícia evidente. Os exames laboratoriais revelam: AST (TGO) 520 U/L (VR: até 40), ALT (TGP) 480 U/L (VR: até 40), Bilirrubina Total 6,8 mg/dL (com direta de 5,1 mg/dL) e INR de 1,4. Ao ser diagnosticada a hepatotoxicidade grave induzida por fármacos antituberculose, qual a conduta imediata mais adequada quanto ao tratamento da TB?', '[{"id":"a","text":"Suspender imediatamente todos os fármacos do esquema RIPE."},{"id":"b","text":"Suspender apenas a Pirazinamida e a Isoniazida, mantendo Rifampicina e Etambutol."},{"id":"c","text":"Manter o tratamento e prescrever silimarina e complexo B para proteção hepática."},{"id":"d","text":"Suspender a Rifampicina e a Pirazinamida, mantendo Isoniazida e Etambutol por ser um esquema menos hepatotóxico."},{"id":"e","text":"Reduzir a dose de todos os fármacos para 50% até a normalização das enzimas."}]', 'a', 
        'A conduta na hepatotoxicidade induzida pelo tratamento da TB (definida como elevação de transaminases > 3x o valor de referência se sintomático, ou > 5x se assintomático, ou icterícia) é a suspensão imediata de todos os fármacos potencialmente hepatotóxicos (Rifampicina, Isoniazida e Pirazinamida). Após a normalização dos exames laboratoriais e melhora clínica, os fármacos devem ser reintroduzidos sequencialmente para identificar o causador.', '{"a":"Correta. A suspensão total é a regra de ouro para evitar falência hepática fulminante em caso de toxicidade medicamentosa evidente (icterícia e elevação > 10x das enzimas).","b":"Incorreta. A Rifampicina também é hepatotóxica e deve ser suspensa na fase aguda.","c":"Incorreta. O uso de ''protetores hepáticos'' não substitui a necessidade vital de interromper a agressão tóxica.","d":"Incorreta. A Isoniazida é um dos principais causadores de lesão hepática grave.","e":"Incorreta. A redução de dose não resolve a toxicidade idiossincrática ou metabólica e pode induzir resistência bacteriana."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '3y9ju', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Hepatotoxicidade","Segurança do Paciente","Efeitos Adversos","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-3y9ju', 'approved', 5)
    ON CONFLICT DO NOTHING;

    -- Q7 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-pu61xn', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um homem de 38 anos, em situação de rua, foi diagnosticado com tuberculose pulmonar há 4 meses. Ele iniciou o esquema RIPE, mas abandonou o tratamento após 30 dias por sentir-se melhor. Retorna agora com tosse produtiva intensa, febre alta e emagrecimento importante. O TRM-TB realizado no retorno demonstrou presença de M. tuberculosis com detecção de resistência à rifampicina. Este quadro caracteriza-se como um provável caso de:', '[{"id":"a","text":"Tuberculose Multirresistente (TB-MDR) ou Resistente à Rifampicina (TB-RR)."},{"id":"b","text":"Tuberculose Sensível com recidiva precoce por falha imunológica."},{"id":"c","text":"Tuberculose Extensivamente Resistente (TB-XDR)."},{"id":"d","text":"Tuberculose Monorresistente apenas à Isoniazida."},{"id":"e","text":"Pneumonia de hipersensibilidade por exposição tardia a micobactérias."}]', 'a', 
        'A resistência à rifampicina (TB-RR), detectada isoladamente ou em associação à resistência a outra droga (como a isoniazida, configurando TB-MDR), exige a mudança imediata para esquemas especiais (geralmente contendo bedaquilina, linezolida e fluoroquinolonas). O abandono e o tratamento irregular são os principais fatores de risco para a seleção de cepas resistentes.', '{"a":"Correta. O TRM-TB identifica especificamente a resistência à rifampicina, definindo o caso como TB-RR, manejado como MDR no Brasil.","b":"Incorreta. A detecção de resistência genotípica pelo TRM invalida o diagnóstico de TB sensível.","c":"Incorreta. A TB-XDR exige resistência à rifampicina, isoniazida, uma fluoroquinolona e mais uma droga do Grupo A.","d":"Incorreta. O teste especificamente apontou resistência à rifampicina.","e":"Incorreta. Trata-se de uma doença infecciosa confirmada, não um quadro imunológico/alérgico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'pu61xn', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Resistência Bacteriana","TB-MDR","Epidemiologia","Saúde Pública"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-pu61xn', 'approved', 6)
    ON CONFLICT DO NOTHING;

    -- Q8 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ua73oz', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Durante uma investigação de contatos de um paciente com Tuberculose Pulmonar bacilífera (baciloscopia ++), o filho do paciente, de 7 anos, é avaliado. Ele está assintomático, tem radiografia de tórax normal e exame físico sem alterações. Realizou-se a Prova Tuberculínica (PPD), que resultou em 12 mm. O cartão vacinal mostra cicatriz de BCG ao nascimento. Qual a interpretação e a conduta preconizada pelo Ministério da Saúde para esta criança?', '[{"id":"a","text":"Infecção Latente por Tuberculose (ILTB); iniciar tratamento preventivo com Isoniazida ou Rifampicina."},{"id":"b","text":"Tuberculose Ativa com apresentação paucibacilar; iniciar esquema RIPE infantil."},{"id":"c","text":"Imunização prévia por BCG apenas; não requer conduta adicional além da vigilância clínica."},{"id":"d","text":"Tuberculose Larvada; solicitar tomografia de tórax para identificar linfonodomegalias hilares."},{"id":"e","text":"Falso-positivo por exposição a micobactérias não tuberculosas; repetir o PPD em 3 meses."}]', 'a', 
        'Em crianças contatos de bacilíferos, um PPD ≥ 5 mm (independente do status da vacina BCG anterior, se aplicada há mais de 2 anos) com exame clínico e radiológico normal define o diagnóstico de Infecção Latente por Tuberculose (ILTB). A conduta correta é o tratamento preventivo da tuberculose (TPTB) para evitar a progressão para doença ativa, sendo a Rifampicina por 4 meses ou a Isoniazida por 6 a 9 meses as opções terapêuticas preferenciais.', '{"a":"Correta. Contato próximo, assintomático, RX normal e PPD reagente é o cenário clássico para tratamento de ILTB.","b":"Incorreta. Para diagnosticar doença ativa seria necessário sintoma ou alteração radiológica.","c":"Incorreta. O valor de 12 mm em contato de bacilífero é valorizado como infecção, não apenas resposta vacinal.","d":"Incorreta. O termo clínico correto é ILTB e a conduta é profilaxia, não exames invasivos em criança assintomática com RX normal.","e":"Incorreta. No Brasil, país de alta carga, o PPD reagente em contatos deve ser sempre atribuído à infecção pelo M. tuberculosis."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'ua73oz', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["ILTB","Pediatria","Controle de Contatos","PPD"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-ua73oz', 'approved', 7)
    ON CONFLICT DO NOTHING;

    -- Q9 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ar2632', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 19 anos, do sexo masculino, procura atendimento por aumento de volume indolor em região cervical lateral direita há 3 semanas. Relata que o nódulo é de consistência endurecida, pouco móvel e não apresenta sinais inflamatórios (dor, calor ou rubor). Nega febre, mas refere perda de peso não intencional de 3 kg e astenia. Não há história de contato conhecido com tuberculose. Realizou ultrassonografia cervical que revelou conglomerado de linfonodos com áreas centrais hipoecoicas sugestivas de necrose. A biópsia excisional do linfonodo demonstrou inflamação granulomatosa crônica com necrose de caseificação. A baciloscopia do material foi negativa. Qual o provável diagnóstico e o principal sítio de acometimento da tuberculose extrapulmonar neste caso?', '[{"id":"a","text":"Tuberculose Ganglionar; é a forma extrapulmonar mais comum em imunocompetentes e HIV negativos no Brasil."},{"id":"b","text":"Linfoma de Hodgkin; a necrose de caseificação é um achado patognomônico de doenças linfoproliferativas."},{"id":"c","text":"Sarcoidose; a presença de necrose caseosa afasta o diagnóstico de Tuberculose."},{"id":"d","text":"Artrite Reumatóide com nódulo necrobiótico cervical."},{"id":"e","text":"Câncer de Tireoide metastático; o granuloma é uma reação do hospedeiro ao tumor."}]', 'a', 
        'A tuberculose ganglionar cervical (também conhecida historicamente como escrófula) é a forma mais frequente de tuberculose extrapulmonar em crianças e adultos jovens imunocompetentes. A patologia característica é o granuloma com necrose de caseificação (caseosa). A baciloscopia do material biopsiado costuma ser negativa devido à natureza paucibacilar da lenha, mas o achado histopatológico em contexto clínico sugestivo é altamente diagnóstico no Brasil.', '{"a":"Correta. A descrição clínica e o granuloma caseoso em linfonodo definem a TB ganglionar.","b":"Incorreta. O linfoma não apresenta necrose caseosa (que é típica de micobactérias ou fungos).","c":"Incorreta. Na sarcoidose, os granulomas são tipicamente ''não caseificantes''.","d":"Incorreta. Nódulos reumatoides têm histologia diferente e acometem outras regiões.","e":"Incorreta. O granuloma caseoso não é uma característica de metástase de tumor de tireoide."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ar2632', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Tuberculose Extrapulmonar","Patologia","Linfadenopatia","Escrófula"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-ar2632', 'approved', 8)
    ON CONFLICT DO NOTHING;

    -- Q10 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-2hhr8m', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um presidiário de 45 anos apresenta tosse crônica e cansaço. Ele realiza o Teste Rápido Molecular (TRM-TB), que indica: ''M. tuberculosis detectado: ALTO'' e ''Resistência à Rifampicina: NÃO DETECTADA''. O médico assistente solicita também uma cultura para micobactérias com teste de sensibilidade (TS). Por que a cultura é necessária se o teste molecular já descartou resistência à rifampicina e confirmou o diagnóstico?', '[{"id":"a","text":"Para detectar resistência a outros fármacos (como a Isoniazida), realizar vigilância de cepas circulantes e testar sensibilidade em caso de falha terapêutica."},{"id":"b","text":"Porque o TRM-TB possui baixa sensibilidade para confirmar a cura após o tratamento."},{"id":"c","text":"Para diferenciar o M. tuberculosis das micobactérias atípicas (não tuberculosas)."},{"id":"d","text":"Para verificar se o paciente é portador de fungos associados em ''cavidade'' pulmonar de TB prévia."},{"id":"e","text":"A cultura não é mais necessária segundo os protocolos atuais se o TRM-TB for positivo em ''ALTO'' nível."}]', 'a', 
        'Embora o TRM-TB seja excelente para o diagnóstico rápido e detecção de resistência à rifampicina, ele não detecta resistência a outras drogas essenciais, como a Isoniazida (configurando monorresistência ou resistência MDR se associada). A cultura continua sendo o padrão-ouro e é fundamental para a vigilância epidemiológica, controle de cura e ajuste de esquemas em casos complexos ou recidivas.', '{"a":"Correta. A cultura complementa o molecular permitindo o teste de sensibilidade (TS) completo para todas as drogas do esquema.","b":"Incorreta. O TRM-TB detecta DNA de bactérias mortas, logo não serve para controle de cura, mas isso não justifica o pedido no diagnóstico inicial.","c":"Incorreta. O TRM-TB é específico para o complexo M. tuberculosis.","d":"Incorreta. Cultura de micobactérias é em meio específico (Löwenstein-Jensen), não serve para fungos.","e":"Incorreta. O protocolo brasileiro recomenda cultura e TS para todos os casos confirmados no diagnóstico."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '2hhr8m', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Microbiologia","Diagnóstico","Epidemiologia","Saúde Pública"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-2hhr8m', 'approved', 9)
    ON CONFLICT DO NOTHING;

    -- Q11 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-bfuus3', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Uma enfermeira de 26 anos participa da busca ativa de sintomáticos respiratórios em uma comunidade. Ela questiona qual o critério para considerar um indivíduo como ''sintomático respiratório'' na população geral para fins de investigação de tuberculose pulmonar. De acordo com as normas técnicas brasileiras, deve-se investigar a TB em:', '[{"id":"a","text":"Toda pessoa com tosse por tempo igual ou superior a 3 semanas."},{"id":"b","text":"Qualquer pessoa com febre vespertina, independente da presença de tosse."},{"id":"c","text":"Apenas indivíduos em situação de rua com tosse há mais de 10 dias."},{"id":"d","text":"Pessoas vivendo com HIV com qualquer tempo de tosse, mas moradores de área urbana apenas se tossirem há mais de 4 semanas."},{"id":"e","text":"Indivíduos que apresentem expectoração purulenta, independente do tempo de tosse."}]', 'a', 
        'Para a população geral no Brasil, o conceito de sintomático respiratório é definido pela presença de tosse por 3 semanas ou mais. No entanto, para populações em maior risco (situação de rua, privados de liberdade, indígenas e imunossuprimidos), esse período de corte é reduzido para qualquer tempo de tosse ou conforme a avaliação clínica inicial.', '{"a":"Correta. Este é o critério epidemiológico clássico adotado pelo Ministério da Saúde para triagem na população geral.","b":"Incorreta. A febre é sintoma, mas a ''tosse'' é o marco definidor do sintomático respiratório na triagem de massa.","c":"Incorreta. Para pessoas em situação de rua, qualquer tempo de tosse já justifica a investigação.","d":"Incorreta. PVHIV também devem ser investigados com qualquer tempo de tosse.","e":"Incorreta. A característica da secreção (purulenta ou hialina) não altera o critério cronológico da triagem."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'bfuus3', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Epidemiologia","Saúde Coletiva","Atenção Básica","Protocolo"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-bfuus3', 'approved', 10)
    ON CONFLICT DO NOTHING;

    -- Q12 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ldg4wb', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 62 anos, com insuficiência renal crônica em hemodiálise e histórico de transplante renal prévio (em uso de tacrolimus e micofenolato), apresenta-se com febre de origem indeterminada, sudorese e perda de peso. Radiografia de tórax mostra padrão micronodular ''em grão de milheto'' distribuído difusamente em ambos os pulmões. Foi realizada biópsia de medula óssea que revelou granulomas caseosos. O diagnóstico é Tuberculose Miliar. Qual a fisiopatologia principal desta forma clínica e qual o risco iminente que deve ser investigado neste paciente?', '[{"id":"a","text":"Disseminação hematogênica do bacilo atingindo múltiplos órgãos; deve-se realizar punção lombar mandatória para excluir TB meníngea associada."},{"id":"b","text":"Aspiração maciça de bacilos das vias aéreas superiores; risco de insuficiência respiratória aguda hipoxêmica."},{"id":"c","text":"Reativação de foco de Simon em ápice pleural; risco de pneumotórax hipertensivo."},{"id":"d","text":"Fístula broncoesofágica por linfonodo roto; risco de mediastinite necrotizante."},{"id":"e","text":"Contaminação por micobactérias do banho de diálise; risco de sepse bacteriana secundária."}]', 'a', 
        'A tuberculose militar resulta da disseminação hematogênica (via sangue) do M. tuberculosis, levando à formação de pequenos granulomas em múltiplos órgãos (pulmões, fígado, baço, medula óssea, cérebro). É comum em pacientes com imunossupressão grave. Devido à alta frequência de acometimento concomitante do sistema nervoso central (até 30% dos casos de TB militar), a investigação do LCR é obrigatória mesmo na ausência de sintomas meníngeos clássicos.', '{"a":"Correta. A disseminação é hematogênica e a associação com meningite exige punção lombar preventiva no manejo hospitalar.","b":"Incorreta. A via não é aspiração, e o padrão radiológico é sistêmico, não loco-regional pulmonar agudo comum.","c":"Incorreta. Os focos de Simon são apicais e causam TB pulmonar cavitária clássica, não militar.","d":"Incorreta. Esta é uma complicação anatômica rara, não relacionada à patogênese da TB militar.","e":"Incorreta. A micobactéria da TB não se espalha pelo banho de diálise (seria via inalatória prévia em imunossuprimido)."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'ldg4wb', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Tuberculose Miliar","Imunossuprimido","Meningoencefalite","Diagnóstico"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-ldg4wb', 'approved', 11)
    ON CONFLICT DO NOTHING;

    -- Q13 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-nlw6sa', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente em tratamento de tuberculose pulmonar há 3 meses apresenta persistência de baciloscopia (BAAR) de escarro positiva (++). Ele refere estar tomando os medicamentos corretamente. Esse cenário define um quadro de ''falha terapêutica''. Segundo o Ministério da Saúde, além da falha clínica ou microbiológica no 4º mês, quais as duas principais causas de falha que devem ser descartadas?', '[{"id":"a","text":"Resistência primária/adquirida aos fármacos e má adesão ao tratamento (não supervisionado)."},{"id":"b","text":"Interação medicamentosa com anti-hipertensivos e tabagismo ativo."},{"id":"c","text":"Subtipo de micobactéria bovis (TB bovina) e uso de corticosteroides associados."},{"id":"d","text":"Idade avançada do paciente e co-infecção por vírus da Hepatite C."},{"id":"e","text":"Deficiência de vitamina D e baixa ingestão proteica."}]', 'a', 
        'A falha terapêutica na TB é caracterizada pela persistência de positividade no escarro no final do 4º mês de tratamento. As causas fundamentais a serem investigadas são a resistência bacteriana (que deve ser confirmada por teste de sensibilidade) e a falta de adesão ao tratamento, que é a causa mais comum de insucesso no Brasil. Por isso, o Tratamento Diretamente Observado (TDO) é preconizado para garantir a eficácia.', '{"a":"Correta. São os pilares do insucesso terapêutico: ou o remédio não funciona contra a cepa, ou o paciente não o toma.","b":"Incorreta. Interações com anti-hipertensivos são raras e não causam ''falha'' por si sós.","c":"Incorreta. M. bovis é sensível ao esquema, exceto à pirazinamida, mas não é causa comum de falha em massa.","d":"Incorreta. Embora compliquem, não justificam a baciloscopia positiva persistente se o tratamento for adequado.","e":"Incorreta. São fatores de risco para adoecer, mas não para falha se as drogas forem tomadas contra bacilo sensível."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nlw6sa', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Manejo Clínico","Resistência","ADESÃO","TDO"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-nlw6sa', 'approved', 12)
    ON CONFLICT DO NOTHING;

    -- Q14 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ss287d', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um jovem de 21 anos, sem sintomas, vai realizar exame admissional para uma empresa e o PPD solicitado resulta em 15 mm. Ele é vacinado com BCG em dose única ao nascer e não tem histórico de contato com tuberculose. RX de tórax normal. Ele está preocupado com o resultado. Qual a melhor explicação e conduta?', '[{"id":"a","text":"Ele possui Infecção Latente e deve ser apenas acompanhado periodicamente com RX, sem necessidade de tratamento preventivo por não ser grupo de risco."},{"id":"b","text":"Possui Tuberculose latente confirmada e deve iniciar Rifampicina imediata."},{"id":"c","text":"É um falso-positivo devido à BCG, deve-se ignorar o resultado e liberar para o trabalho."},{"id":"d","text":"Ele deve realizar o teste IGRA (Interferon-Gamma Release Assay) para descartar reação cruzada com a BCG."},{"id":"e","text":"O PPD reagente indica que ele está protegido contra formas graves de Tuberculose por toda a vida."}]', 'a', 
        'Em indivíduos imunocompetentes sem contatos conhecidos e sem comorbidades de risco, um PPD reagente (mesmo > 10 mm) isolado num exame de rotina indica apenas que houve contato prévio com o bacilo (infecção). Nestes casos, o risco de progressão para doença ativa é baixo e não há indicação formal de tratamento preventivo de ILTB segundo o protocolo do Ministério da Saúde brasileiro, priorizando-se o tratamento para contatos próximos e grupos de risco definidos.', '{"a":"Correta. Não há benefício comprovado em tratar ILTB em indivíduos saudáveis sem história de contato recente/risco elevado.","b":"Incorreta. Nem toda ILTB exige tratamento medicamentoso; depende da estratificação de risco.","c":"Incorreta. Aos 21 anos, o efeito da BCG no PPD é desprezível; o resultado provavelmente indica infecção real, mas de baixo risco.","d":"Incorreta. O IGRA ajudaria se houvesse dúvida clínica real, mas para fins admissionais o manejo é expectante.","e":"Incorreta. O PPD reagente não é sinal de imunidade protetora, mas de memória imunológica à infecção."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ss287d', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["PPD","ILTB","Saúde Ocupacional","Epidemiologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-ss287d', 'approved', 13)
    ON CONFLICT DO NOTHING;

    -- Q15 (Batch 1)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-xsho4k', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente masculino, 35 anos, inicia tratamento para TB pulmonar cavitária. O médico prescreve o esquema RIPE em dose fixa combinada (4 comprimidos em 1). Sobre a Rifampicina, fármaco central do esquema, qual das seguintes orientações sobre interações medicamentosas é a mais relevante?', '[{"id":"a","text":"Ela é um potente indutor das enzimas do citocromo P450, podendo reduzir drasticamente os níveis séricos de anticoncepcionais, warfarina e antirretrovirais (como Dolutegravir)."},{"id":"b","text":"Ela inibe a excreção renal de lítio, podendo causar intoxicação grave."},{"id":"c","text":"Deve ser evitada com alimentos gordurosos pois sua absorção é inibida por eles."},{"id":"d","text":"Causa quelagem de ferro, devendo ser tomada distante de sulfato ferroso."},{"id":"e","text":"Aumenta o efeito da insulina, predispondo o paciente diabético a crises de hipoglicemia."}]', 'a', 
        'A Rifampicina é um dos indutores enzimáticos mais potentes conhecidos na farmacologia clínica. Ao induzir o citocromo P450 (CYP3A4), ela acelera o metabolismo de inúmeros fármacos, exigindo ajustes de dose frequentes (como dobrar a dose de dolutegravir para 50mg 12/12h ou mudar métodos contraceptivos hormonais para barreira ou DIU).', '{"a":"Correta. Esta interação é crítica no manejo de pacientes com comorbidades e HIV.","b":"Incorreta. Não há interação relevante descrita com o lítio neste mecanismo.","c":"Incorreta. Ela deve ser tomada preferencialmente em jejum, mas a interação com gordura não é o ponto central da farmacodinâmica relevante perguntada.","d":"Incorreta. Esta é uma característica das tetraciclinas e quinolonas.","e":"Incorreta. Frequentemente ocorre o oposto; o controle glicêmico pode ser dificultado pela alteração metabólica hepática."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'xsho4k', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Farmacologia","Interação Medicamentosa","Rifampicina","HIV"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-xsho4k', 'approved', 14)
    ON CONFLICT DO NOTHING;

    -- Q16 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-42fssz', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 48 anos, soropositivo para o HIV há 5 anos, em uso irregular de Terapia Antirretroviral (TARV), procura o serviço de urgência com história de febre intermitente, tosse seca e cansaço aos esforços habituais há 3 semanas. Relata também aumento progressivo de volume em região axilar esquerda. Ao exame físico: descorado (2+/4+), febril (38,2°C), presença de linfonodomegalia axilar de 3 cm, indolor e aderida a planos profundos. Ausculta pulmonar com estertores esparsos. Radiografia de tórax evidencia infiltrado intersticial difuso e linfonodomegalia hilar bilateral. Realizada biópsia de linfonodo axilar cujo exame histopatológico revelou granulomas mal formados, com raros linfócitos e abundantes bacilos álcool-ácido resistentes (BAAR) na coloração de Ziehl-Neelsen. Sobre a apresentação da tuberculose em pacientes com imunodepressão grave (CD4 < 200 células/mm³), como no caso descrito, é correto afirmar:', '[{"id":"a","text":"A apresentação costuma ser atípica, com maior frequência de formas extrapulmonares, disseminadas e exames histopatológicos com granulomas paucibacilares e bem definidos."},{"id":"b","text":"A radiografia de tórax frequentemente apresenta cavitações apicais típicas, semelhantes às encontradas em pacientes imunocompetentes."},{"id":"c","text":"O quadro clínico tende a ser mais grave, com maior probabilidade de anergia aos testes cutâneos (PPD negativo) e achados radiológicos atípicos, como infiltrados em bases pulmonares e linfonodomegalias hilares."},{"id":"d","text":"O tratamento para este paciente deve ser iniciado apenas com Rifampicina e Etambutol para evitar a síndrome inflamatória de reconstituição imune (IRIS)."},{"id":"e","text":"A presença de abundantes BAAR no linfonodo é um achado inesperado e sugere erro laboratorial, dado o caráter paucibacilar da TB ganglionar."}]', 'c', 
        'Em pacientes com infecção avançada pelo HIV e contagem baixa de linfócitos T-CD4, a imunidade celular está severamente comprometida. Isso altera a apresentação da tuberculose: 1) A formação de granulomas é deficiente (granulomas ''frouxos'' ou mal formados); 2) Há maior carga bacilar nas lesões (multibacilaridade paradoxal em tecidos); 3) A radiografia frequentemente não mostra cavitações (que dependem da resposta inflamatória do hospedeiro) e apresenta infiltrados intersticiais ou em campos médios/inferiores; 4) A disseminação hematogênica e o acometimento extrapulmonar são a regra. A anergia ao PPD é comum devido à falta de células para reagir ao antígeno.', '{"a":"Incorreta. Embora a forma seja disseminada, os granulomas em imunodeprimidos são tipicamente mal definidos e ricos em bacilos (multibacilares).","b":"Incorreta. Cavitações são raras na imunodepressão grave pois exigem uma resposta imune exuberante para ocorrer a necrose e expulsão do caseum para a via aérea.","c":"Correta. Resume precisamente a fisiopatologia da interação TB-HIV em estágios avançados.","d":"Incorreta. O tratamento é o esquema RIPE padrão; o tempo de início da TARV é que deve ser manejado para evitar IRIS.","e":"Incorreta. Como explicado, a falta de controle imunológico permite a proliferação desenfreada dos bacilos no tecido, tornando a lesão multibacilar."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '42fssz', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB-HIV","Imunoproficiência","Fisiopatologia","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-42fssz', 'approved', 15)
    ON CONFLICT DO NOTHING;

    -- Q17 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-40kq6y', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um homem de 30 anos, natural da Bolívia e residente em regime de coabitação com outros 10 imigrantes em um dormitório no centro de São Paulo, apresenta febre vespertina e tosse produtiva há 6 semanas. O Teste Rápido Molecular (TRM-TB) detectou M. tuberculosis com resistência à rifampicina. De acordo com os protocolos vigentes para o tratamento da Tuberculose Resistente à Rifampicina (TB-RR) ou Multirresistente (TB-MDR) no Brasil, qual o esquema terapêutico inicial de escolha, desde que não haja contraindicações?', '[{"id":"a","text":"Esquema contendo Bedaquilina, Levofloxacino, Linezolida e Clofazimina por 6 a 9 meses (esquema curto oral)."},{"id":"b","text":"Esquema RIPE estendido por 12 meses com adição de Estreptomicina nos primeiros 2 meses."},{"id":"c","text":"Substituição da Rifampicina pela Rifabutina, mantendo os demais fármacos do esquema primário."},{"id":"d","text":"Tratamento com esquema contendo Amicacina injetável diária por 6 meses associada a Etambutol e Pirazinamida."},{"id":"e","text":"Uso isolado de Levofloxacino e Etionamida até a realização do teste de sensibilidade genotípico completo."}]', 'a', 
        'Recentemente, o Brasil e a OMS passaram a priorizar esquemas totalmente orais e mais curtos para TB-MDR/RR. O esquema padrão atual para casos sem resistência prévia documentada a fluoroquinolonas envolve o uso de Bedaquilina, Levofloxacino, Linezolida e Clofazimina. Este esquema substituiu os antigos protocolos que exigiam drogas injetáveis (como Amicacina/Estreptomicina), apresentando maior adesão e menores taxas de efeitos colaterais graves (como ototoxicidade e nefrotoxicidade).', '{"a":"Correta. É o esquema oral ''all-oral'' preconizado atualmente para resistência à rifampicina.","b":"Incorreta. Se há resistência à rifampicina (viga mestra do RIPE), o esquema primário perde sua eficácia fundamental.","c":"Incorreta. Há resistência cruzada quase total entre Rifampicina e Rifabutina; esta última é usada para evitar interações (ex: HIV), não para tratar resistência.","d":"Incorreta. Drogas injetáveis (aminoglicosídeos) caíram para segunda linha devido à toxicidade.","e":"Incorreta. O tratamento de resistência nunca deve ser feito com apenas duas drogas por risco de ampliação da resistência."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '40kq6y', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB-MDR","Resistência à Rifampicina","Terapêutica Atualizada","Bolívia/Imigração"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-40kq6y', 'approved', 16)
    ON CONFLICT DO NOTHING;

    -- Q18 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-mxhrvi', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 25 anos, sem comorbidades, é diagnosticada com Tuberculose Peritoneal após investigação de ascite de início insidioso, associada a perda de peso e febre. Foi submetida a laparoscopia que demonstrou múltiplos ''implantes granulares'' esbranquiçados em peritônio parietal e visceral. A análise do líquido ascítico revelou exsudato linfocítico com ADA de 50 U/L. Durante o tratamento com o esquema RIPE, a paciente informa que deseja engravidar ou se há risco de falha do seu método contraceptivo atual (anticoncepcional oral combinado). Qual a orientação correta a ser fornecida pelo médico?', '[{"id":"a","text":"A Rifampicina acelera o metabolismo dos hormônios anticoncepcionais, reduzindo sua eficácia; deve-se recomendar o uso de métodos de barreira (camisinha) ou DIU durante o tratamento."},{"id":"b","text":"A Isoniazida inibe a absorção intestinal de estrogênios; recomenda-se dobrar a dose do anticoncepcional."},{"id":"c","text":"O esquema RIPE não interfere na eficácia dos anticoncepcionais orais."},{"id":"d","text":"A tuberculose peritoneal causa infertilidade definitiva por salpingite associada, tornando a anticoncepção desnecessária."},{"id":"e","text":"A Pirazinamida aumenta o risco de trombose em usuárias de anticoncepcionais, contraindicando o uso de ambos simultaneamente."}]', 'a', 
        'A Rifampicina é um potente indutor das enzimas do sistema citocromo P450 no fígado (especialmente CYP3A4). Isso aumenta a taxa de degradação da maioria dos esteroides contraceptivos (estrógenos e progestágenos), levando a níveis subestimados no sangue e risco real de gravidez indesejada. A orientação clássica no tratamento da TB é a substituição por métodos não hormonais ou de barreira.', '{"a":"Correta. É uma das interações medicamentosas mais importantes no manejo prático da tuberculose em mulheres no menacme.","b":"Incorreta. O mecanismo da Isoniazida não é esse e ''dobrar a dose'' não é uma conduta validada e segura.","c":"Incorreta. A interação é real e clinicamente significativa.","d":"Incorreta. Embora a TB possa atingir as trompas (salpingite tuberculosa), a infertilidade não é garantidamente definitiva e não justifica suspender a proteção.","e":"Incorreta. Não há essa associação direta de risco trombótico sinérgico descrita para a Pirazinamida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'mxhrvi', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Farmacologia","Saúde da Mulher","Interações","Rifampicina"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-mxhrvi', 'approved', 17)
    ON CONFLICT DO NOTHING;

    -- Q19 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-frkv2t', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Em uma maternidade pública, uma puérpera é diagnosticada com Tuberculose Pulmonar bacilífera logo após o parto. Ela está muito preocupada com o bem-estar do seu recém-nascido (RN). Sobre o aleitamento materno e a prevenção da Tuberculose no RN neste cenário, qual a recomendação correta do Ministério da Saúde?', '[{"id":"a","text":"A amamentação deve ser mantida (com uso de máscara cirúrgica pela mãe), mas a vacinação com BCG no RN deve ser adiada e iniciada a quimioprofilaxia primária com Isoniazida ou Rifampicina por 3 meses."},{"id":"b","text":"A amamentação está estritamente contraindicada até que a mãe complete 2 meses de tratamento e tenha baciloscopia negativa."},{"id":"c","text":"O RN deve ser vacinado com BCG imediatamente ao nascer e afastado do contato com a mãe por 15 dias."},{"id":"d","text":"A mãe deve amamentar sem restrições, pois os anticorpos passados pelo leite protegem o bebê contra a TB."},{"id":"e","text":"Deve-se realizar o TRM-TB no mecônio do bebê para diagnosticar TB congênita antes de qualquer medida."}]', 'a', 
        'Em filhos de mães bacilíferas ao parto: 1) Não se vacina com BCG ao nascer (para não interferir com o PPD/IGRA posterior); 2) Inicia-se quimioprofilaxia primária (Isoniazida ou Rifampicina) por 3 meses; 3) Após 3 meses, realiza-se o PPD/IGRA. Se negativo, suspende-se a droga e vacina-se com BCG. Se positivo, mantém-se a droga por mais 3 meses (totalizando 6) e não vacina com BCG. O aleitamento é mantido com máscara e cuidados de higiene.', '{"a":"Correta. Reflete o protocolo nacional de proteção ao RN exposto.","b":"Incorreta. A amamentação é incentivada devido aos benefícios nutricionais e imunológicos, com o uso de máscara pela mãe.","c":"Incorreta. A vacinação precoce com BCG atrapalharia o seguimento diagnóstico posterior da criança e a proteção da quimioprofilaxia é superior no curto prazo.","d":"Incorreta. O leite não transmite anticorpos protetores contra a TB (que exige imunidade celular), mas a proximidade física transmite o bacilo por via aérea.","e":"Incorreta. Investigação no mecônio não faz parte do rastreio de TB no RN exposto pós-parto."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'frkv2t', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Pediatria","Maternidade","BCG","Profilaxia Primária"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-frkv2t', 'approved', 18)
    ON CONFLICT DO NOTHING;

    -- Q20 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-mkag7h', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 40 anos, com história de alcoolismo pesado, está no 2º mês de tratamento para tuberculose e apresenta quadro de fraqueza muscular nas pernas, ''queimação'' e formigamento nos pés. Refere que a sensação começou de forma insidiosa e é pior à noite. Ao exame físico, nota-se diminuição da sensibilidade vibratória e dolorosa em botas (membros inferiores). Qual o diagnóstico mais provável e a medida terapêutica para manejo desse efeito colateral?', '[{"id":"a","text":"Neuropatia periférica induzida pela Isoniazida; administrar Piridoxina (Vitamina B6)."},{"id":"b","text":"Hepatotoxicidade oculta; solicitar dosagem de magnésio e potássio."},{"id":"c","text":"Síndrome de Guillain-Barré parainfecciosa; realizar punção lombar."},{"id":"d","text":"Mielotoxicidade pela Rifampicina; solicitar hemograma urgente."},{"id":"e","text":"Insuficiência venosa crônica; prescrever meias de compressão."}]', 'a', 
        'A Isoniazida interfere no metabolismo da Piridoxina (Vitamina B6), o que pode levar a um quadro de neuropatia periférica sensitiva, especialmente em grupos de risco (alcoólatras, diabéticos, gestantes, idosos e desnutridos). A suplementação profilática ou terapêutica com B6 é a conduta de escolha.', '{"a":"Correta. A neuropatia por isoniazida é um efeito colateral clássico e evitável com a reposição de B6.","b":"Incorreta. Distúrbios eletrolíticos podem causar cãibras, mas o padrão ''em botas'' e a queimação são neuropáticos.","c":"Incorreta. O Guillain-Barré é uma polirradiculoneuropatia aguda ascendente, predominantemente motora, diferente deste quadro crônico sensitivo.","d":"Incorreta. A Rifampicina causa anemia hemolítica ou plaquetopenia, não sintomas sensitivos periféricos.","e":"Incorreta. A insuficiência venosa causa edema e peso nas pernas, sem déficits sensitivos objetivos em botas."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'mkag7h', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Efeitos Adversos","Isoniazida","Vitamina B6","Sistema Nervoso"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-mkag7h', 'approved', 19)
    ON CONFLICT DO NOTHING;

    -- Q21 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-8avfva', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um homem de 52 anos apresenta-se com artralgia intensa, acompanhada de edema e calor em primeira articulação metatarsofajângica (podagra) à direita. O paciente está no primeiro mês de tratamento para tuberculose. Qual fármaco do esquema RIPE está mais associado a este quadro clínico e por qual mecanismo?', '[{"id":"a","text":"Pirazinamida; por reduzir a excreção renal de ácido úrico, levando à hiperuricemia."},{"id":"b","text":"Etambutol; por induzir a produção endógena de cristais de pirofosfato de cálcio."},{"id":"c","text":"Isoniazida; por causar vasculite de pequenos vasos (pseudo-gota)."},{"id":"d","text":"Rifampicina; pela ativação direta de macrófagos sinoviais."},{"id":"e","text":"Estreptomicina; por toxicidade direta na cartilagem articular."}]', 'a', 
        'A Pirazinamida inibe competitivamente a excreção tubular de ácido úrico, o que frequentemente causa hiperuricemia assintomática durante o tratamento. Em pacientes susceptíveis, pode desencadear crises agudas de gota (artrite gotosa). Se as dores forem leves e suportáveis, mantém-se a medicação com uso de analgésicos/anti-inflamatórios. Se a crise for grave ou persistente, a droga pode precisar de suspensão ou ajuste.', '{"a":"Correta. A gota induzida pela pirazinamida é um efeito secundário metabólico bem conhecido.","b":"Incorreta. O Etambutol atinge o nervo óptico, não o metabolismo de cristais.","c":"Incorreta. A isoniazida não causa esse tipo de reação inflamatória articular.","d":"Incorreta. A Rifampicina não interfere fisiologicamente na sinóvia desta forma.","e":"Incorreta. A estreptomicina atinge o sistema auditivo e renal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '8avfva', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Reumatologia","Efeitos Adversos","Pirazinamida","Gota"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-8avfva', 'approved', 20)
    ON CONFLICT DO NOTHING;

    -- Q22 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-8wa0fm', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 65 anos, institucionalizada em asilo, apresenta quadro de confusão mental aguda e queda do estado geral. A investigação inicial com RX de tórax demonstrou opacidade em lobo inferior direito, inicialmente tratada como pneumonia bacteriana típica sem melhora após 7 dias de levofloxacino. Foi realizado TRM-TB em escarro induzido, que foi positivo. Sobre a tuberculose no idoso, é correto afirmar:', '[{"id":"a","text":"A apresentação clínica costuma ser insidiosa, podendo simular outras doenças crônicas ou demenciais, e os achados radiológicos frequentemente localizam-se em campos pulmonares médios e inferiores (típico de reativação no idoso)."},{"id":"b","text":"O diagnóstico é facilitado pela presença constante de febre alta e sudorese noturna exuberante."},{"id":"c","text":"A prova tuberculínica (PPD) é invariavelmente positiva devido ao efeito ''booster'' da vacinação na infância."},{"id":"d","text":"O tratamento deve ser feito com doses reduzidas (meia dose) de Rifampicina em todos os pacientes acima de 60 anos."},{"id":"e","text":"A forma miliar é proibitiva nesta faixa etária devido à involução tímica."}]', 'a', 
        'Idosos frequentemente apresentam sintomas inespecíficos para TB (astenia, anorexia, confusão mental) em vez da tríade clássica de tosse/febre/sudorese. Radiologicamente, a reativação da infecção latente no idoso pode assumir padrões ''não cavitários'' e localizar-se em regiões inferiores do pulmão, o que muitas vezes leva ao diagnóstico errôneo de pneumonia bacteriana aspirativa ou comunitária comum.', '{"a":"Correta. O idoso é um grupo com ''máscara clínica'' para TB, exigindo alta suspeição.","b":"Incorreta. Sintomas constitucionais clássicos podem estar ausentes ou atenuados.","c":"Incorreta. A anergia cutânea é frequente no idoso pela imunossenescência.","d":"Incorreta. O tratamento segue as doses padrão baseadas no peso; apenas se monitora mais rigorosamente a hepatotoxicidade.","e":"Incorreta. A forma miliar pode ocorrer em qualquer idade, especialmente em indivíduos com imunidade celular reduzida como o idoso."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '8wa0fm', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Geriatria","Infectologia","Diagnóstico Diferencial"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-8wa0fm', 'approved', 21)
    ON CONFLICT DO NOTHING;

    -- Q23 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-cvid6z', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual a principal justificativa epidemiológica para o uso do ''Tratamento Diretamente Observado'' (TDO) na estratégia de controle da tuberculose no sistema de saúde brasileiro?', '[{"id":"a","text":"Garantir a adesão do paciente ao tratamento, visando alcançar a cura e interromper a cadeia de transmissão na comunidade, além de evitar o surgimento de cepas resistentes."},{"id":"b","text":"Reduzir o custo do tratamento, ao permitir o fracionamento das doses na unidade de saúde."},{"id":"c","text":"Evitar que o paciente compartilhe seus medicamentos com seus contatos intradomiciliares."},{"id":"d","text":"Permitir a realização de exames de sangue diários para monitorar a função hepática durante a tomada da dose."},{"id":"e","text":"O TDO é apenas obrigatório para pacientes com diagnóstico de Tuberculose Multirresistente."}]', 'a', 
        'O TDO é a base da estratégia DOTS (Directly Observed Treatment Short-course) recomendada pela OMS. O objetivo é assegurar que o paciente tome a medicação corretamente, pois o uso irregular é o maior vilão do controle da TB no mundo: causa falha de cura, mantém a transmissibilidade e favorece a seleção natural de bacilos resistentes às drogas disponíveis.', '{"a":"Correta. O TDO é uma medida de saúde pública e não apenas um cuidado individual.","b":"Incorreta. O TDO pode até ser mais caro logisticamente (exige profissional), mas o custo da ''não cura'' e da multirresistência é infinitamente maior.","c":"Incorreta. O objetivo não é o controle de ''estoque'', mas a garantia da ingestão pelo paciente índice.","d":"Incorreta. Não se faz controle laboratorial diário no TDO.","e":"Incorreta. O TDO é recomendado para TODOS os casos de tuberculose, sensível ou resistente, na atenção primária."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'cvid6z', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Saúde Pública","TDO","Estratégia de Controle","Adesão"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-cvid6z', 'approved', 22)
    ON CONFLICT DO NOTHING;

    -- Q24 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-7cfs06', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 44 anos está tratando Tuberculose em esquema RIPE. Ele conta ao médico que seu suor, suas lágrimas e sua urina estão apresentando uma coloração ''laranja-avermelhada'' há alguns dias. De acordo com o conhecimento farmacológico, qual fármaco causa essa alteração e qual a orientação correta?', '[{"id":"a","text":"Rifampicina; orientar que é um efeito inofensivo esperado da eliminação da droga e não exige suspensão."},{"id":"b","text":"Isoniazida; suspender o tratamento por risco de hemólise intravascular aguda."},{"id":"c","text":"Pirazinamida; solicitar exames de função renal pois indica acúmulo de metabólitos."},{"id":"d","text":"Etambutol; indica toxicidade ocular iminente e exige consulta com oftalmologista."},{"id":"e","text":"Não é um efeito esperado; investigar sangramento oculto em vias urinárias e glândulas lacrimais."}]', 'a', 
        'A Rifampicina e seus metabólitos possuem uma coloração natural avermelhada. Por ser eliminada por diversas secreções corporais (urina, suor, lágrimas, saliva), é comum que o paciente note essa alteração. É fundamental avisar o paciente no início do tratamento para evitar pânico ou interrupção do uso.', '{"a":"Correta. Orientação clássica de educação em saúde no tratamento da TB.","b":"Incorreta. A Isoniazida não causa alteração de cor de fluidos.","c":"Incorreta. Não há relação com falha renal ou metabólitos coloridos da pirazinamida.","d":"Incorreta. A toxicidade ocular do etambutol não se manifesta por lágrimas coloridas.","e":"Incorreta. É um efeito fisiológico esperado da droga."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '7cfs06', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Farmacocinética","Rifampicina","Educação em Saúde"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-7cfs06', 'approved', 23)
    ON CONFLICT DO NOTHING;

    -- Q25 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-k6q3dp', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 37 anos, portador de insuficiência renal crônica (clearance de creatinina de 20 mL/min/1,73m²), inicia tratamento para TB. Sobre o ajuste de dose do esquema convencional para pacientes com disfunção renal severa, qual a recomendação atual?', '[{"id":"a","text":"Manter Rifampicina e Isoniazida em doses normais (eliminação predominantemente hepática) e aumentar o intervalo de administração da Pirazinamida e do Etambutol (ex: 3 vezes por semana)."},{"id":"b","text":"Reduzir a dose de todos os fármacos em 50% de forma proporcional."},{"id":"c","text":"Suspender o Etambutol e substituí-lo por Estreptomicina."},{"id":"d","text":"Não são necessários ajustes pois as micobactérias possuem metabolismo independente da filtração glomerular."},{"id":"e","text":"Indicar apenas Rifampicina e Isoniazida por 12 meses."}]', 'a', 
        'Rifampicina e Isoniazida são metabolizadas e excretadas principalmente pelo fígado e bile, não exigindo ajuste em renais crônicos. Já o Etambutol e a Pirazinamida (ou seus metabólitos ativos) dependem da excreção renal; em pacientes com ClCr < 30 mL/min, a recomendação brasileira é de ajustar o intervalo para 3 vezes por semana (em vez de diário), visando evitar toxicidade acumulada.', '{"a":"Correta. Reflete o manejo técnico do paciente renal na TB.","b":"Incorreta. A redução proporcional não considera a via de eliminação distinta de cada droga.","c":"Incorreta. A Estreptomicina é nefrotóxica e estritamente contraindicada ou usada com extremo cautela em renais crônicos.","d":"Incorreta. Os ajustes são cruciais para a segurança do hospedeiro, não pelo efeito na bactéria.","e":"Incorreta. O esquema seria insuficiente para garantir a cura e evitar resistência sem as outras drogas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'k6q3dp', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Nefrologia","Farmacologia Aplicada","Insuficiência Renal"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-k6q3dp', 'approved', 24)
    ON CONFLICT DO NOTHING;

    -- Q26 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-wypo2p', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Homem de 41 anos, sabidamente portador de HIV (CD4: 350 células/mm³), descobre tuberculose e inicia o esquema RIPE. Ele já utiliza TARV com o esquema Tenofovir, Lamivudina e Dolutegravir (TDF/3TC/DTG). Devido à potente indução enzimática da Rifampicina sobre o Dolutegravir, qual o ajuste laboratorial e medicamentoso obrigatório neste paciente?', '[{"id":"a","text":"Aumentar a dose do Dolutegravir para 50 mg de 12 em 12 horas."},{"id":"b","text":"Substituir o Dolutegravir por Efavirenz (600 mg ao dia)."},{"id":"c","text":"Substituir a Rifampicina pela Rifabutina, mantendo o Dolutegravir 50 mg uma vez ao dia."},{"id":"d","text":"Apenas monitorar a carga viral do HIV mensalmente; não são necessários ajustes iniciais."},{"id":"e","text":"Suspender a TARV durante a fase de ataque da tuberculose (primeiros 2 meses)."}]', 'a', 
        'A Rifampicina induz o metabolismo do Dolutegravir (um inibidor de integrase), reduzindo significativamente seu nível terapêutico. Para compensar essa indução em pacientes usando Rifampicina, a dose do DTG deve ser dobrada (50 mg BID - 12/12h). A opção de trocar por Rifabutina (C) também existe, mas exige que o serviço tenha o medicamento disponível (que é mais caro e menos acessível que o ajuste de dose do DTG no SUS).', '{"a":"Correta. É a conduta operacional padrão no protocolo de co-infecção TB-HIV no Brasil de 2024.","b":"Incorreta. O Dolutegravir é superior ao Efavirenz em eficácia e menos tóxico; o ajuste de dose permite mantê-lo.","c":"Incorreta. Embora a Rifabutina tenha menos interação, o ajuste do DTG é a conduta primária mais comum no sistema público pelo custo.","d":"Incorreta. O paciente sofreria falha virológica do HIV rapidamente sem o ajuste.","e":"Incorreta. A suspensão da TARV em quem já a utiliza aumenta a mortalidade e o risco de doenças oportunistas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'wypo2p', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB-HIV","Infectologia","Farmacodinâmica","Dolutegravir"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-wypo2p', 'approved', 25)
    ON CONFLICT DO NOTHING;

    -- Q27 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-f5hnva', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Sobre o manejo da Infecção Latente por Tuberculose (ILTB) em pacientes que iniciarão uso de drogas imunobiológicas (como Anti-TNF, ex: Infliximabe), qual a conduta correta no Brasil?', '[{"id":"a","text":"Realizar PPD ou IGRA para todos; se PPD ≥ 5 mm (ou IGRA positivo), deve-se iniciar o tratamento preventivo da TB (TPTB) e aguardar, preferencialmente, pelo menos 1 mês de tratamento antes de iniciar o biológico."},{"id":"b","text":"O tratamento preventivo só deve ser iniciado se o PPD for superior a 15 mm, devido ao baixo risco dos Anti-TNF."},{"id":"c","text":"Se o paciente for vacinado com BCG, o PPD deve ser ignorado e o tratamento preventivo iniciado para todos os pacientes independente do teste."},{"id":"d","text":"Biológicos não exigem triagem para TB pois agem apenas na inflamação articular/intestinal."},{"id":"e","text":"O tratamento da ILTB nesses pacientes deve ser feito obrigatoriamente com o esquema RIPE completo por 6 meses."}]', 'a', 
        'Os inibidores de TNF-alfa bloqueiam uma citocina crucial para a manutenção do granuloma que ''aprisiona'' o bacilo da TB. O início dessas drogas em portadores de ILTB causa reativação explosiva, frequentemente com formas disseminadas. A triagem com PPD (ponto de corte 5 mm) ou IGRA é obrigatória, e o TPTB deve idealmente ser iniciado 1 mês antes da primeira dose do biológico.', '{"a":"Correta. É o protocolo de segurança para uso de imunobiológicos.","b":"Incorreta. O risco com Anti-TNF é altíssimo; o corte de 5 mm visa não perder casos de infecção silenciosa.","c":"Incorreta. O protocolo prevê a realização do teste; o tratamento ''cego'' não é preconizado.","d":"Incorreta. Como explicado, o TNF é essencial para conter o M. tuberculosis.","e":"Incorreta. O tratamento de infecção LATENTE é feito com monoterapia (Isoniazida) ou Rifampicina, não com RIPE."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'f5hnva', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["ILTB","Imunobiológicos","SEGURANÇA","Protocolo"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-f5hnva', 'approved', 26)
    ON CONFLICT DO NOTHING;

    -- Q28 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-4khpyb', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose Osteoarticular (Mal de Pott) atinge frequentemente a coluna vertebral. Qual o mecanismo de dor e a deformidade clássica esperada no exame físico deste paciente?', '[{"id":"a","text":"Dor nas costas insidiosa e deformidade em gibosidade (cifose angular) por colapso dos corpos vertebrais anteriores."},{"id":"b","text":"Dor súbita e escoliose severa por espasmo da musculatura paravertebral."},{"id":"c","text":"Pseudoartrose cervical e pescoço rígido por fusão atlanto-axial."},{"id":"d","text":"Lombalgia puramente mecânica sem alterações na inspeção estática."},{"id":"e","text":"Hiperlordose lombar compensatória por fraqueza dos glúteos."}]', 'a', 
        'O Mal de Pott é a tuberculose vertebral. O bacilo causa necrose caseosa e destruição do tecido ósseo, geralmente começando na parte anterior do corpo vertebral e se espalhando para o disco intervertebral. O colapso da porção anterior das vértebras leva à deformidade em cifose angular, chamada de ''giba'', que é o marco visual da doença avançada ou sequelar.', '{"a":"Correta. A gibosidade é o achado clássico do Mal de Pott.","b":"Incorreta. A instalação é tipicamente lenta (meses), não súbita.","c":"Incorreta. A TB vertebral atinge mais frequentemente a transição toracolombar, não a região cervical alta.","d":"Incorreta. Em fases avançadas, a deformidade é evidente.","e":"Incorreta. Como há colapso vertebral anterior, a deformidade é em flexão (cifose), não em extensão (lordose)."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '4khpyb', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Tuberculose Óssea","Mal de Pott","Ortopedia","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-4khpyb', 'approved', 27)
    ON CONFLICT DO NOTHING;

    -- Q29 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-je2ncy', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 46 anos, diagnosticado com tuberculose pulmonar há 2 meses, apresenta melhora total da tosse e da febre. Ele está muito feliz com o resultado e pergunta se já pode parar de tomar os remédios. Qual a justificativa científica correta para completar os 6 meses de tratamento?', '[{"id":"a","text":"O bacilo da TB possui diferentes populações metabólicas; os remédios matam rapidamente os bacilos em replicação ativa (fase de ataque), mas os bacilos ''persistentes'' ou dormentes exigem tempo prolongado (fase de manutenção) para serem eliminados e evitar recidivas."},{"id":"b","text":"É necessário esse tempo para que o corpo crie anticorpos (IgG) protetores contra novas infecções."},{"id":"c","text":"A medicação precisa se acumular no tecido gorduroso para ter efeito residual por 5 anos."},{"id":"d","text":"Se parar agora, ele desenvolverá alergia grave aos fármacos caso precise usá-los novamente no futuro."},{"id":"e","text":"Os 6 meses são um critério administrativo da OMS para facilitar a contagem de estatísticas de cura."}]', 'a', 
        'O M. tuberculosis cresce em diferentes nichos e velocidades. A fase de ataque (2 meses) elimina os bacilos de crescimento rápido (reduzindo a carga bacilar e a transmissibilidade). No entanto, existem populações de bacilos em ''semidormência'' (crescimento lento ou intermitente) dentro dos granulomas ou macrófagos. Somente a fase de manutenção prolongada consegue erradicar esses ''persisters'', garantindo a cura esterilizante e prevenindo que a doença retorne após o fim do tratamento (recidiva).', '{"a":"Correta. Explica a fundamentação biológica do tempo de tratamento.","b":"Incorreta. A proteção contra a TB não é mediada por anticorpos circulantes (imunidade humoral).","c":"Incorreta. O fármaco não funciona por acúmulo em gordura, mas por ação bactericida/bacteriostática direta nas populações bacilares.","d":"Incorreta. O risco principal não é a alergia, mas a falha de cura e a resistência.","e":"Incorreta. Os 6 meses foram definidos por rigorosos estudos clínicos (estudos de Madras, etc.) para minimizar recidivas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'je2ncy', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Fisiopatologia","Manejo Clínico","Aderência","Microbiologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-je2ncy', 'approved', 28)
    ON CONFLICT DO NOTHING;

    -- Q30 (Batch 2)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-tl54o4', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual a conduta recomendada para um profissional de saúde que apresenta um PPD inicial negativo ao ser admitido em um hospital de referência para tuberculose, mas que após 1 ano de trabalho apresenta conversão para PPD positivo (12 mm)? O profissional está totalmente assintomático e tem RX de tórax normal.', '[{"id":"a","text":"Realizar diagnóstico de Infecção Latente por Tuberculose (conversão tuberculínica recente) e iniciar tratamento preventivo da TB (TPTB)."},{"id":"b","text":"Apenas afastar o profissional do contato com pacientes até que o PPD negative."},{"id":"c","text":"Internação imediata para isolamento respiratório em quarto com pressão negativa."},{"id":"d","text":"Repetir o PPD em 15 dias; se mantiver 12 mm, realizar broncoscopia."},{"id":"e","text":"Considerar portador de TB-MDR e iniciar esquema especial com bedaquilina."}]', 'a', 
        'A ''conversão tuberculínica'' (um PPD que era negativo e passa a ser positivo, com incremento de pelo menos 10 mm em relação ao teste anterior num intervalo de até 2 anos) indica uma infecção RECENTE. Em profissionais de saúde, isso implica um altíssimo risco de progressão para doença ativa no curto prazo. Como os sintomas e o RX são negativos, o diagnóstico é ILTB e o tratamento preventivo é mandatório para proteção do trabalhador.', '{"a":"Correta. Conversão em profissional exposto é indicação formal de TPTB.","b":"Incorreta. O PPD raramente negativa; o afastamento não trata a infecção já estabelecida.","c":"Incorreta. Ele não tem doença ativa (é assintomático com RX normal) e não transmite o bacilo.","d":"Incorreta. Não há sentido em repetir em 15 dias e a broncoscopia é desnecessária em assintomático com RX normal.","e":"Incorreta. Não se assume resistência sem evidência genotípica ou falha de tratamento prévio."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'tl54o4', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Vigilância Ocupacional","ILTB","Infectologia","PPD"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-tl54o4', 'approved', 29)
    ON CONFLICT DO NOTHING;

    -- Q31 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-u0c1t4', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um homem de 33 anos, com diagnóstico de Tuberculose Pulmonar bacilífera, iniciou o esquema RIPE há 10 dias. Ele retorna à Unidade Básica de Saúde queixando-se de náuseas leves e anorexia matinal, mas nega vômitos, icterícia ou dor abdominal. Ao exame físico: anictérico, eupneico e sem visceromegalias. Foram solicitados exames admissionais que mostram: TGO = 85 U/L (VR: < 40), TGP = 90 U/L (VR: < 40) e Bilirrubinas Totais = 0,9 mg/dL. Qual a conduta mais adequada perante este quadro de possível hepatotoxicidade inicial?', '[{"id":"a","text":"Manter o esquema RIPE inalterado, realizar orientações dietéticas e repetir os exames de função hepática em 15 dias para monitoramento."},{"id":"b","text":"Suspender imediatamente a Rifampicina e a Isoniazida e iniciar esquema alternativo com Etambutol e Estreptomicina."},{"id":"c","text":"Internar o paciente para biópsia hepática imediata devido ao risco de insuficiência hepática fulminante."},{"id":"d","text":"Apenas suspender a Pirazinamida, por ser o fármaco mais hepatotóxico das quatro drogas."},{"id":"e","text":"Dobrar a dose de Isoniazida para acelerar a cura e reduzir o tempo de exposição hepática."}]', 'a', 
        'A elevação assintomática das transaminases (até 3 ou 5 vezes o valor de referência, dependendo da presença ou não de sintomas) é comum no início do esquema RIPE e não exige a suspensão dos fármacos. Como o paciente tem elevação leve (cerca de 2 vezes o VR) e sintomas gastrointestinais muito discretos (sem icterícia ou dor), a conduta correta é a observação clínica próxima e repetição dos exames em duas semanas. A suspensão só é mandatória se: 1) Transaminases > 3x VR com sintomas; 2) Transaminases > 5x VR mesmo assintomático ou 3) Icterícia clínica.', '{"a":"Correta. Reflete o critério de segurança para manutenção do tratamento primário.","b":"Incorreta. A suspensão precoce sem critérios laboratoriais/clínicos suficientes prejudica o tratamento da TB.","c":"Incorreta. Não há sinais de gravidez ou insuficiência hepática que justifiquem medida invasiva.","d":"Incorreta. Embora a Pirazinamida seja hepatotóxica, não se retira apenas uma droga do esquema fixo (4 em 1) sem necessidade absoluta.","e":"Incorreta. Dobrar a dose aumentaria drasticamente o risco de necrose hepática por metabólitos da isoniazida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'u0c1t4', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Hepatotoxicidade","Efeitos Adversos","Manejo Clínico","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-u0c1t4', 'approved', 30)
    ON CONFLICT DO NOTHING;

    -- Q32 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-p5llbb', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Sobre o diagnóstico da Tuberculose Pleural, analise as afirmativas abaixo e assinale a alternativa que contém a sequência correta de verdadeiro (V) ou falso (F):

( ) O líquido pleural na TB é tipicamente um exsudato, com predominância de polimorfonucleares na fase crônica.
( ) A dosagem de Adenosina Deaminase (ADA) possui alto valor preditivo negativo; se < 40 U/L, a chance de ser TB pleural é muito baixa.
( ) A biópsia pleural por agulha (ex: agulha de Cope) tem maior sensibilidade diagnóstica que a baciloscopia direta do líquido pleural.
( ) A presença de células mesoteliais em grande quantidade (> 5%) no líquido pleural reforça o diagnóstico de tuberculose.', '[{"id":"a","text":"V, V, F, F"},{"id":"b","text":"F, V, V, F"},{"id":"c","text":"F, F, V, V"},{"id":"d","text":"V, F, V, F"},{"id":"e","text":"F, V, F, V"}]', 'b', 
        'Análise das sentenças: 1) Falso: O líquido é exsudato, mas a predominância é linfocítica (não polimorfonuclear); 2) Verdadeiro: O ADA é excelente para exclusão (VPN alto); 3) Verdadeiro: A biópsia pleural pleural atinge 70-80% de sensibilidade (vê granulomas/caseum), enquanto a baciloscopia do líquido é raramente positiva (< 5-10%); 4) Falso: A tuberculose pleural causa uma reação fibrinosa que ''bloqueia'' o mesotélio, sendo característica a escassez ou ausência de células mesoteliais.', '{"a":"Incorreta. Falha no perfil celular e na biópsia.","b":"Correta. Sequência exata baseada nos critérios de Light e histopatologia da TB.","c":"Incorreta. Falha no ADA e na biópsia.","d":"Incorreta. Falha generalizada em imunoliquidologia.","e":"Incorreta. Falha na correlação biópsia x mesotélio."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'p5llbb', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB Pleural","Líquido Pleural","ADA","Biópsia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-p5llbb', 'approved', 31)
    ON CONFLICT DO NOTHING;

    -- Q33 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-v59aj0', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 19 anos, hígido, realiza exame admissional e apresenta PPD de 18 mm. O RX de tórax é normal e o paciente é completamente assintomático. Informa que foi vacinado com BCG ao nascer (possui cicatriz). De acordo com as normas de 2024 do Ministério da Saúde, qual a abordagem correta para este caso?', '[{"id":"a","text":"Diagnosticar Infecção Latente por Tuberculose (ILTB) e indicar Tratamento Preventivo (TPTB) com Rifampicina (4 meses) ou Isoniazida (6-9 meses)."},{"id":"b","text":"Considerar PPD falso-positivo pela vacinação com BCG na infância e liberar para o trabalho sem intervenção."},{"id":"c","text":"Realizar teste de escarro induzido para confirmar baciloscopia positiva oculta."},{"id":"d","text":"Indicar repetição da vacina BCG para reforçar a imunidade, já que o PPD está alto."},{"id":"e","text":"Solicitar tomografia de tórax de alta resolução; se normal, descartar qualquer infecção."}]', 'a', 
        'Um PPD ≥ 5 mm (ou ≥ 10 mm em alguns contextos, mas no Brasil adota-se o corte de 5 mm para contatos e grupos de risco) em indivíduo assintomático com RX normal define Infecção Latente. A cicatriz de BCG feita ao nascer não justifica um PPD de 18 mm aos 19 anos (o efeito da vacina no teste costuma desaparecer nos primeiros anos de vida). Por ser jovem e ter teste claramente positivo, há benefício em tratar a ILTB para reduzir o risco de adoecimento futuro.', '{"a":"Correta. Conduta preventiva padrão para ILTB.","b":"Incorreta. Atribuir um PPD de 18 mm apenas à BCG neonatal é um erro comum que negligencia a infecção real.","c":"Incorreta. Se o RX é normal e o paciente é assintomático, não há indicação de pesquisa de bacilo em escarro (não é doença ativa).","d":"Incorreta. Não se faz reforço de BCG em adultos, muito menos com PPD positivo.","e":"Incorreta. A TC é desnecessária se o RX for de boa qualidade e normal, pois o diagnóstico latente é imunobiológico, não de imagem."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'v59aj0', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["ILTB","BCG","Epidemiologia","Saúde Ocupacional"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-v59aj0', 'approved', 32)
    ON CONFLICT DO NOTHING;

    -- Q34 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-719vjl', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente em tratamento para Tuberculose Pulmonar apresenta, subitamente, piora da acuidade visual bilateral, informando que as cores parecem ''desbotadas'' (especialmente o verde e o vermelho). Ao exame oftalmológico, nota-se neurite óptica retrobulbar. Qual droga do esquema RIPE deve ser suspensa imediatamente e qual a conduta para este efeito adverso?', '[{"id":"a","text":"Etambutol; suspender a droga definitivamente."},{"id":"b","text":"Isoniazida; suspender e substituir por Rifabutina."},{"id":"c","text":"Rifampicina; manter a droga e usar colírio de corticoide."},{"id":"d","text":"Pirazinamida; ajustar a dose para o peso ideal."},{"id":"e","text":"O quadro não está relacionado às drogas da TB; investigar glaucoma agudo."}]', 'a', 
        'A neurite óptica (com alteração na percepção de cores e perda de campo visual central) é o efeito colateral mais grave e característico do Etambutol. Frequentemente é dose-dependente e ocorre mais em pacientes com falha renal. Uma vez diagnosticada a toxicidade ocular, o fármaco deve ser suspenso de forma definitiva para evitar a cegueira irreversível.', '{"a":"Correta. Reconhecimento imediato do efeito tóxico clássico do Etambutol.","b":"Incorreta. A Isoniazida causa neuropatia periférica e psicose, raramente neurite óptica isolada.","c":"Incorreta. A Rifampicina não atinge o nervo óptico desta maneira.","d":"Incorreta. A Pirazinamida atinge o fígado e o metabolismo do ácido úrico.","e":"Incorreta. É um efeito adverso medicamentoso bem documentado no tratamento da TB."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '719vjl', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Etambutol","Toxicidade Ocular","Farmacovigilância"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-719vjl', 'approved', 33)
    ON CONFLICT DO NOTHING;

    -- Q35 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-2816rg', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Durante uma investigação de surto de Tuberculose em uma prisão, um detento apresenta tosse há 2 semanas. Realizado Teste Rápido Molecular (TRM-TB) que resultou: ''Detectado M. tuberculosis - Baixa Carga - Resistência à Rifampicina Detectada''. O serviço de saúde local decide realizar a cultura e o Teste de Sensibilidade Genotípico por Sonda (LPA) para investigar resistência de segunda linha. O LPA demonstrou resistência adicional ao Levofloxacino e Moxifloxacino. Qual a classificação correta desta cepa de tuberculose?', '[{"id":"a","text":"Tuberculose com resistência estendida (Pre-XDR)."},{"id":"b","text":"Tuberculose Multirresistente (TB-MDR)."},{"id":"c","text":"Tuberculose Extremamente Resistente (XDR-TB)."},{"id":"d","text":"Tuberculose com resistência monodroga (TB-MR)."},{"id":"e","text":"Tuberculose sensível atípica."}]', 'a', 
        'Definições da OMS/Ministério da Saúde: 1) TB-RR: Resistente apenas à rifampicina; 2) TB-MDR: Resistente a Rifampicina E Isoniazida; 3) Pre-XDR: Resistente a Rifampicina E a qualquer Fluoroquinolona (Levofloxacino/Moxifloxacino); 4) XDR: Resistente a Rifampicina, Fluoroquinolonas E pelo menos uma droga de grupo A (Bedaquilina ou Linezolida). No caso, a resistência à Rifampicina + Fluoroquinolona caracteriza a Pre-XDR.', '{"a":"Correta. Reflete a nova nomenclatura para cepas com resistência a quinolonas.","b":"Incorreta. TB-MDR é a base para as outras resistências, mas o termo Pre-XDR é mais específico para este caso.","c":"Incorreta. Para ser XDR, precisaria de resistência a Bedaquilina ou Linezolida.","d":"Incorreta. Houve resistência a pelo menos duas classes (Rifa + Quinolona).","e":"Incorreta. Não existe este termo para resistências detectadas."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '2816rg', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Resistência Bacteriana","Pre-XDR","Infectologia","Sistema Prisional"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-2816rg', 'approved', 34)
    ON CONFLICT DO NOTHING;

    -- Q36 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-vyrvg7', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente portador de Hepatite C crônica com cirrose Child-Pugh B é diagnosticado com Tuberculose Pulmonar. Perante o alto risco de falência hepática com o esquema RIPE convencional, qual a recomendação de esquema terapêutico alternativo com menor carga hepatotóxica?', '[{"id":"a","text":"Esquema sem Pirazinamida: Rifampicina + Isoniazida + Etambutol por 9 meses."},{"id":"b","text":"Esquema com substituição de todas as drogas por Estreptomicina e Amicacina."},{"id":"c","text":"Tratamento apenas com Levofloxacino por 18 meses."},{"id":"d","text":"Manter o RIPE e associar Silimarina para proteção hepatocitária."},{"id":"e","text":"Aguardar o tratamento da Hepatite C antes de iniciar o da Tuberculose."}]', 'a', 
        'A Pirazinamida é a droga mais hepatotóxica do esquema RIPE e a primeira a ser retirada em hepatopatas graves. O esquema 2 RIE / 7 RI (9 meses de duração total) é a alternativa preferencial para cirróticos Child B ou C, pois exclui a pirazinamida mas mantém a Rifampicina e Isoniazida, garantindo alta taxa de cura.', '{"a":"Correta. Manejo de hepatopatas graves na TB.","b":"Incorreta. Esquemas puramente injetáveis são tóxicos e menos eficazes que o RIE.","c":"Incorreta. Monoterapia com quinolona gera resistência rápida.","d":"Incorreta. A Silimarina não anula a toxicidade direta da pirazinamida no parênquima cirrótico.","e":"Incorreta. A tuberculose é uma doença aguda e infectocontagiosa que exige tratamento imediato."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'vyrvg7', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Cirrose","Hepatotoxicidade","Esquemas Especiais","Child-Pugh"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-vyrvg7', 'approved', 35)
    ON CONFLICT DO NOTHING;

    -- Q37 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-2ke2ho', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um escolar de 8 anos apresenta emagrecimento, febre diária não aferida há 1 mês e tosse seca persistente. O contato intradomiciliar é o tio, que trata TB pulmonar bacilífera. O RX de tórax da criança mostra ''alargamento do mediastino por linfonodomegalia hilar direita''. O PPD é de 12 mm. De acordo com o sistema de escore para diagnóstico de TB na infância (Ministério da Saúde), qual a pontuação aproximada e a conduta sugerida?', '[{"id":"a","text":"40 pontos ou mais (Diagnóstico muito provável); iniciar tratamento com esquema RIPE (doses pediátricas)."},{"id":"b","text":"10 pontos (Diagnóstico pouco provável); realizar broncoscopia para biópsia."},{"id":"c","text":"25 pontos (Diagnóstico possível); colher 3 amostras de escarro induzido para confirmar."},{"id":"d","text":"0 pontos; o tio é que deve ser investigado, não a criança."},{"id":"e","text":"30 pontos (Diagnóstico provável); realizar TC de crânio antes de tratar."}]', 'a', 
        'O sistema de escore considera: 1) Quadro clínico (febre/tosse/perda de peso) = 15 pontos; 2) RX de tórax com linfonodomegalia (imagem sugestiva) = 15 pontos; 3) Contato com adulto bacilífero = 10 pontos; 4) PPD positivo = 10 a 15 pontos. No caso, a criança soma > 40 pontos. Pelo protocolo, em crianças com > 40 pontos, o diagnóstico é MUITO PROVÁVEL e o tratamento pode ser iniciado sem necessidade de confirmação bacteriológica (difícil na infância).', '{"a":"Correta. Aplicação prática do escore de diagnóstico infantil.","b":"Incorreta. Subestima gravemente os achados clínicos e epidemiológicos.","c":"Incorreta. Embora o escarro possa ser colhido, não se deve retardar o tratamento com esta pontuação.","d":"Incorreta. A criança é sintomática e tem critérios claros de infecção/doença.","e":"Incorreta. A TC de crânio não tem indicação clínica neste quadro puramente pulmonar/mediastinal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '2ke2ho', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB Infantil","Escore de Diagnóstico","Pediatria","Saúde da Família"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-2ke2ho', 'approved', 36)
    ON CONFLICT DO NOTHING;

    -- Q38 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-oho5cz', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Sobre a Tuberculose Miliar, assinale a alternativa que descreve corretamente o padrão radiológico típico e o mecanismo fisiopatológico principal.', '[{"id":"a","text":"Micronódulos difusos (1-3 mm) distribuídos uniformemente em ambos os pulmões; reflexo de disseminação hematogênica massiva do bacilo."},{"id":"b","text":"Grandes cavitações em ápices pulmonares; reflexo de hipersensibilidade tardia exuberante."},{"id":"c","text":"Consolidação lobar com broncograma aéreo; reflexo de disseminação broncogênica."},{"id":"d","text":"Derrame pleural bilateral e massivo; reflexo de insuficiência cardíaca direita associada à TB."},{"id":"e","text":"Fibrose pulmonar extensa em campos médios; reflexo de cura espontânea sem tratamento."}]', 'a', 
        'A TB miliar recebe esse nome pela semelhança das lesões com sementes de milho (millet). Ocorre quando um foco caseoso se rompe para dentro de um vaso sanguíneo, espalhando milhões de bacilos pela circulação sistêmica. O resultado são milhões de pequenos granulomas (micronódulos) que se depositam nos pulmões e outros órgãos (fígado, baço, medula óssea). É uma forma grave e potencialmente fatal.', '{"a":"Correta. Definição clássica radiológica e patogênica da forma miliar.","b":"Incorreta. Cavitações são típicas da forma pós-primária localizada.","c":"Incorreta. Padrão de consolidação é de pneumonia comum; a TB pode causar, mas não é o padrão ''miliar''.","d":"Incorreta. Embora o derrame possa ocorrer, os micronódulos são o achado definidor.","e":"Incorreta. A TB miliar não cura espontaneamente; evolui para óbito se não tratada."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'oho5cz', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB Miliar","Radiologia","Fisiopatologia","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-oho5cz', 'approved', 37)
    ON CONFLICT DO NOTHING;

    -- Q39 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-kg2tvd', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 42 anos apresenta quadro clínico de tosse crônica e hemoptise. O teste rápido molecular (TRM-TB) detecta M. tuberculosis sensível à rifampicina. No entanto, após 3 meses de tratamento com o esquema RIPE e boa adesão (TDO), o paciente mantém febre diária e a baciloscopia de escarro continua persistentemente positiva (2+). Qual a melhor conduta perante a suspeita de falência terapêutica?', '[{"id":"a","text":"Encaminhar para centro de referência, solicitar cultura com teste de sensibilidade genotípico/fenotípico e iniciar esquema especial para TB multirresistente."},{"id":"b","text":"Apenas repetir o esquema RIPE do zero, pois ele deve ter cuspido os remédios."},{"id":"c","text":"Aumentar a duração do tratamento para 12 meses, mantendo as mesmas drogas."},{"id":"d","text":"Indicar lobectomia pulmonar para retirada do foco persistente."},{"id":"e","text":"Trocar apenas a Rifampicina por Rifabutina."}]', 'a', 
        'A manutenção da positividade da baciloscopia no 3º ou 4º mês de tratamento adequado define FALÊNCIA TERAPÊUTICA. Isso geralmente indica que o bacilo é resistente às drogas do esquema primário ou que há um problema imunológico/absortivo severo. A conduta é a investigação de resistência em rede de referência e mudança para esquemas robustos para resistência (ex: TB-MDR).', '{"a":"Correta. Protocolo de manejo de falha ao esquema primário.","b":"Incorreta. Repetir o mesmo esquema que já falhou é promover mais resistência.","c":"Incorreta. Se o bacilo é resistente, o tempo de exposição não resolverá a infecção.","d":"Incorreta. A cirurgia é reservada para sequelas ou complicações localizadas, não para tratamento de falha primária sem antes ajustar as drogas.","e":"Incorreta. Trocar uma droga por outra da mesma classe não resolve a multirresistência."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'kg2tvd', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Falência Terapêutica","Resistência","Manejo Clínico"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-kg2tvd', 'approved', 38)
    ON CONFLICT DO NOTHING;

    -- Q40 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-6ji6nd', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um homem de 35 anos apresenta Tuberculose Ganglionar cervical (escrofulose). Foi iniciada medicação e, após 15 dias, os linfonodos que eram endurecidos tornaram-se flutuantes e drenaram espontaneamente material caseoso. O paciente desesperado procura o médico achando que a doença piorou. Qual a explicação e conduta correta?', '[{"id":"a","text":"Trata-se da evolução natural da TB ganglionar (coliquação); deve-se manter o esquema RIPE e realizar curativos locais."},{"id":"b","text":"Isso indica resistência bacteriana; trocar o tratamento para o esquema de resistência."},{"id":"c","text":"O paciente desenvolveu uma superinfecção bacteriana por Staphylococcus; adicionar Vancomicina venosa."},{"id":"d","text":"É uma reação alérgica à Pirazinamida; suspender todas as drogas."},{"id":"e","text":"Indicação cirúrgica imediata de esvaziamento cervical radical."}]', 'a', 
        'A TB ganglionar cursa com inflamação que pode evoluir para a necrose de liquefação (coliquação). O linfonodo ''amolece'' e pode drenar por fístulas na pele (escrofulodermia). Isso não significa obrigatoriamente falha do tratamento, mas sim o processo de expulsão do material necrótico. O tratamento medicamentoso deve continuar exatamente como está.', '{"a":"Correta. Evolução clínica clássica da forma ganglionar.","b":"Incorreta. A drenagem de caseum é um fenómeno físico do granuloma, não sinal de resistência biológica.","c":"Incorreta. Embora a infecção secundária possa ocorrer, a saída de material amarelado/esbranquiçado sem odor fétido ou inflamação aguda severa sugere caseum da TB.","d":"Incorreta. Não há padrão de hipersensibilidade cutânea sugerido.","e":"Incorreta. A cirurgia radical não é o tratamento primário para linfonodos tuberculosos coliquados."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '6ji6nd', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB Ganglionar","Escrofulose","Caseum","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-6ji6nd', 'approved', 39)
    ON CONFLICT DO NOTHING;

    -- Q41 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-wf7r13', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual o achado tomográfico clássico que sugere a presença de disseminação broncogênica da tuberculose em um pulmão previamente cavitado?', '[{"id":"a","text":"Padrão de ''árvore em brotamento'' (tree-in-bud)."},{"id":"b","text":"Vidro fosco difuso e homogêneo."},{"id":"c","text":"Placas pleurais calcificadas."},{"id":"d","text":"Padrão de ''pavimentação maluca'' (crazy paving)."},{"id":"e","text":"Sinal do ''halo invertido''."}]', 'a', 
        'O sinal de ''árvore em brotamento'' na Tomografia de Alta Resolução representa o preenchimento de bronquíolos terminais por material mucoide, pus ou inflamação. Na TB, quando uma caverna drena seu conteúdo rico em bacilos para os brônquios, esse material ''escorre'' e entope os bronquíolos distais, criando esse aspecto de pequenos ramos com brotos na ponta, indicativo de atividade de doença e disseminação local.', '{"a":"Correta. Sinal radiológico clássico de disseminação broncogênica.","b":"Incorreta. Vidro fosco é inespecífico e sugere edema ou inflamação alveolar leve.","c":"Incorreta. Placas pleurais sugerem exposição ao asbesto.","d":"Incorreta. Pavimentação maluca sugere proteinose alveolar ou certas pneumonias virais (ex: COVID-19).","e":"Incorreta. Halo invertido é mais associado à pneumonia em organização ou paracoccidioidomicose."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'wf7r13', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Tomografia","Árvore em Brotamento","Radiologia","Pneumologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-wf7r13', 'approved', 40)
    ON CONFLICT DO NOTHING;

    -- Q42 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-j96xuh', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Sobre o manejo da Tuberculose no Sistema Prisional brasileiro, é fundamental o rastreio sistemático de sintomas. Qual o critério de ''sintomático respiratório'' adotado especificamente para as populações privadas de liberdade e por que é diferente da população geral?', '[{"id":"a","text":"Presença de tosse por qualquer tempo (independentemente da duração); devido ao alto risco de transmissão em ambientes confinados."},{"id":"b","text":"Tosse por mais de 3 semanas; conforme padrão da OMS para países tropicais."},{"id":"c","text":"Tosse acompanhada obrigatoriamente de febre > 39°C."},{"id":"d","text":"Apenas aqueles que apresentam hemoptise franca."},{"id":"e","text":"Não há rastreio de tosse, apenas realização de RX de tórax anual para todos."}]', 'a', 
        'Em populações de alto risco e confinamento (como prisioneiros e moradores de rua), o critério de ''3 semanas de tosse'' é considerado muito tardio. Para evitar surtos massivos, qualquer pessoa que relate tosse (por qualquer tempo) deve ser considerada suspeita e investigada com TRM-TB ou baciloscopia imediatamente.', '{"a":"Correta. Estratégia de busca ativa agressiva em grupos vulneráveis.","b":"Incorreta. Este é o critério para a população geral sem fatores de risco conhecidos.","c":"Incorreta. A febre não é necessária para iniciar a investigação.","d":"Incorreta. Hemoptise é sinal tardio; o objetivo é pegar casos precoces.","e":"Incorreta. O rastreio clínico é a base do programa de controle prisional."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'j96xuh', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Saúde Prisional","Sintomático Respiratório","Vigilância","Epidemiologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-j96xuh', 'approved', 41)
    ON CONFLICT DO NOTHING;

    -- Q43 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-dmamwj', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 25 anos, em tratamento para TB pulmonar há 1 mês, desenvolve quadro de icterícia (3+/4+), dor em hipocôndrio direito e vômitos persistentes. Transaminases: TGO = 550 U/L, TGP = 610 U/L. De acordo com o protocolo do Ministério da Saúde para hepatotoxicidade grave, qual a conduta imediata em relação ao esquema RIPE?', '[{"id":"a","text":"Suspender todas as drogas (R-I-P-E) imediatamente e aguardar a normalização dos sintomas e das enzimas (até queda < 2x VR) antes de reintroduzir."},{"id":"b","text":"Suspender apenas a Pirazinamida e manter as demais."},{"id":"c","text":"Trocar por esquema injetável com Estreptomicina e Gentamicina imediatamente."},{"id":"d","text":"Reduzir as doses pela metade até o paciente melhorar da cor amarelada."},{"id":"e","text":"Manter o tratamento e prescrever corticoide sistêmico para reduzir a inflamação hepática."}]', 'a', 
        'Icterícia e transaminases > 10x o valor de referência (ou > 5x com sintomas) configuram hepatite medicamentosa grave. A primeira medida é interromper TODO o tratamento (STOP RIPE). Após a melhora clínica e laboratorial evidente, as drogas serão reintroduzidas uma a uma, em ordem específica (Geralmente R -> I -> P ou esquemas alternativos se a toxicidade persistir).', '{"a":"Correta. Regra de ouro na segurança do tratamento da TB.","b":"Incorreta. Na vigência de icterícia, não se arrisca manter nenhuma droga hepatotóxica (R e I também são).","c":"Incorreta. Não se inicia tratamento de resistência no meio de uma hepatite medicamentosa aguda sem necessidade absoluta.","d":"Incorreta. Subdose mantém a agressão hepática e gera resistência bacteriana.","e":"Incorreta. Corticoides não tratam a causa (as drogas) e podem mascarar a gravidade da lesão."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'dmamwj', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Hepatotoxicidade","Icterícia","Manejo de Crise","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-dmamwj', 'approved', 42)
    ON CONFLICT DO NOTHING;

    -- Q44 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-qlalw2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 50 anos, ex-tabagista, trata TB há 4 meses e apresenta imagem cavitária residual estável em lobo superior direito. Ele queixa-se de episódios recorrentes de hemoptise leve. A tomografia mostra uma ''massa arredondada móvel conforme decúbito'' dentro da antiga cavidade da TB, com o sinal do ''crescente aéreo'' (Monod sign). Qual o diagnóstico provável?', '[{"id":"a","text":"Aspergiloma (Bola fúngica)."},{"id":"b","text":"Reativação da Tuberculose."},{"id":"c","text":"Abscesso pulmonar piogênico."},{"id":"d","text":"Carcinoma broncogênico escamoso."},{"id":"e","text":"Infarto pulmonar por TEP."}]', 'a', 
        'Cavidades antigas da tuberculose são locais ideais para a colonização por fungos do gênero Aspergillus. O fungo cresce formando uma massa de hifas e debris (bola fúngica) que fica solta dentro da cavidade. O sinal característico é o crescente de ar ao redor da massa arredondada. Clinicamente, a hemoptise recorrente é o sintoma cardinal, causada pela erosão mecânica dos vasos da parede da cavidade pela massa fúngica.', '{"a":"Correta. Complicação cavitária clássica da TB sequelar.","b":"Incorreta. Reativação causaria novos infiltrados e sintomas sistêmicos (febre/sudorese).","c":"Incorreta. Abscesso causa nível hidroaéreo e febre alta.","d":"Incorreta. Câncer de pulmão pode cavitar, mas a ''bola móvel'' é muito típica do fungo.","e":"Incorreta. TEP não costuma se manifestar como massa móvel intracavitária."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'qlalw2', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Aspergiloma","Sequela de TB","Radiologia","Pneumologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-qlalw2', 'approved', 43)
    ON CONFLICT DO NOTHING;

    -- Q45 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-xn4yth', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Sobre a Tuberculose Genitourinária, qual o achado clássico no exame de urina (EAS/Tipo 1) que levanta a suspeita diagnóstica mesmo antes da cultura?', '[{"id":"a","text":"Piúria estéril (presença de leucócitos na urina com cultura bacteriana convencional negativa)."},{"id":"b","text":"Hematúria macroscópica com cilindros hemáticos."},{"id":"c","text":"Glicosúria maciça sem hiperglicemia."},{"id":"d","text":"Cristais de oxalato de cálcio em grande quantidade."},{"id":"e","text":"Proteinúria nefrótica (> 3,5 g/dia)."}]', 'a', 
        'A presença sistemática de leucócitos na urina (pus) em um paciente com sintomas urinários crônicos (polaciúria, disúria), mas cujas culturas de urina para bactérias comuns (como E. coli) são sempre negativas, é chamada de ''piúria estéril''. Isso sugere que o agente causador é um germe que não cresce em meios comuns, sendo o M. tuberculosis a principal hipótese clínica a ser investigada com culturas em meio de Lowenstein-Jensen.', '{"a":"Correta. Signo clássico de TB urinária.","b":"Incorreta. Sugere glomerulonefrite, não infecção por micobactéria.","c":"Incorreta. Sugere síndrome de Fanconi ou diabetes, sem relação com TB.","d":"Incorreta. Associado a cálculos renais (litíase).","e":"Incorreta. Padrão de doença glomerular primária."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'xn4yth', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB Genitourinária","Piúria Estéril","Urologia","Nefrologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-xn4yth', 'approved', 44)
    ON CONFLICT DO NOTHING;

    -- Q46 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-n2tarc', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual a duração padrão do tratamento para Tuberculose do Sistema Nervoso Central (Meningoencefalite) e da Tuberculose Osteoarticular no Brasil?', '[{"id":"a","text":"12 meses; com uso associado de corticoide nos primeiros meses de tratamento da meningite."},{"id":"b","text":"6 meses; igual ao tratamento da forma pulmonar."},{"id":"c","text":"18 meses; devido à baixa penetração das drogas na barreira hematoencefálica."},{"id":"d","text":"24 meses; conforme protocolo de TB multirresistente."},{"id":"e","text":"9 meses; sem necessidade de corticoides."}]', 'a', 
        'Diferente da forma pulmonar (6 meses), as formas osteoarticular e de SNC exigem um tratamento prolongado de 12 meses (2 meses de RIPE + 10 meses de RI). Na meningite tuberculosa, o uso de corticoides (prednisona ou dexametasona) nas primeiras 4 a 8 semanas é fundamental para reduzir a resposta inflamatória no espaço subaracnóideo, prevenindo sequelas como hidrocefalia e vasculites cerebrais.', '{"a":"Correta. Duração e adjuvância preconizadas para formas graves/extrapulmonares selecionadas.","b":"Incorreta. 6 meses é tempo insuficiente para estas localizações específicas.","c":"Incorreta. 18 meses é excessivo para o esquema sensível.","d":"Incorreta. 24 meses não é o padrão para casos sensíveis.","e":"Incorreta. O corticoide é viga mestra na meningite TB para melhorar o prognóstico neurológico."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'n2tarc', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Meningite TB","Terapêutica","Corticosteroides","Neurologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-n2tarc', 'approved', 45)
    ON CONFLICT DO NOTHING;

    -- Q47 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-15hkv6', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Sobre a imunologia da Tuberculose, o Teste de Liberação de Interferon-gama (IGRA) tem se tornado mais comum. Qual a principal vantagem do IGRA em relação ao teste cutâneo de PPD?', '[{"id":"a","text":"O IGRA não apresenta falso-positivo em pessoas vacinadas com BCG, pois utiliza antígenos específicos (ESAT-6 e CFP-10) que não estão presentes na cepa da vacina."},{"id":"b","text":"O IGRA é um teste de baixo custo que pode ser feito em qualquer farmácia."},{"id":"c","text":"O IGRA consegue diferenciar com clareza se a doença é latente ou se é ativa."},{"id":"d","text":"O IGRA não exige coleta de sangue, sendo feito através da saliva."},{"id":"e","text":"O IGRA é positivo apenas em pacientes com imunodepressão grave (HIV/AIDS)."}]', 'a', 
        'O IGRA é um teste ''in vitro'' que mede a resposta das células T ao M. tuberculosis. Ao contrário do PPD, que usa um ''pool'' de proteínas (PPD - Purified Protein Derivative) comuns a muitas micobactérias e à vacina BCG, o IGRA usa apenas proteínas específicas do bacilo selvagem. Portanto, um IGRA positivo indica infecção real, sem a interferência diagnóstica da vacinação prévia, o que é muito útil em países com alta cobertura vacinal como o Brasil.', '{"a":"Correta. Versa sobre a especificidade superior do IGRA.","b":"Incorreta. O IGRA é um teste caro e exige laboratório especializado com tecnologia de ensaio ELISA.","c":"Incorreta. Nem o PPD nem o IGRA conseguem diferenciar infecção latente de doença ativa; ambos indicam apenas que o corpo ''conhece'' o bacilo.","d":"Incorreta. O IGRA é feito em sangue total colhido por venopunção.","e":"Incorreta. O IGRA, assim como o PPD, pode ter sensibilidade reduzida em imunodeprimidos graves pela falta de resposta das células T."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '15hkv6', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["IGRA","PPD","Diagnóstico Imunológico","BCG"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-15hkv6', 'approved', 46)
    ON CONFLICT DO NOTHING;

    -- Q48 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        '', '[{"id":"a","text":"A presença de S. aureus não exclui a possibilidade de coinfecção com TB, especialmente em pacientes vulneráveis; deve-se considerar a realização de TRM-TB e biópsia das lesões se o quadro não regredir com antibióticos comuns."},{"id":"b","text":"Estafilococos e M. tuberculosis não coexistem no mesmo paciente devido à competição por substratos."},{"id":"c","text":"Toda lesão cavitária no pulmão é obrigatoriamente TB até que se prove o contrário."},{"id":"d","text":"O TRM-TB não deve ser feito em quem tem diagnóstico de bacteremia estafilocócica por risco de resultados falso-positivos por ''reação cruzada de capsídeos''."},{"id":"e","text":"A cavitação de êmbolos sépticos é patognomônica de tuberculose miliar."}]', 'a', 
        'O raciocínio clínico deve estar aberto a coinfecções ou diagnósticos diferenciais. Embora o foco agora seja a endocardite/êmbolos sépticos por S. aureus, a Tuberculose é endêmica e pode coexistir. O erro comum é parar a investigação ao encontrar o primeiro patógeno, negligenciando a TB em grupos de altíssimo risco (como usuários de drogas).', '{"a":"Correta. Demonstra prudência diagnóstica e consciência epidemiológica.","b":"Incorreta. Não existe tal exclusão biológica competitiva.","c":"Incorreta. Muitas doenças causam cavitação: fungos, câncer, abscessos piogênicos, êmbolos sépticos, granulomatose de Wegener, etc.","d":"Incorreta. O TRM-TB é baseado em PCR (DNA), não tem reação cruzada com bactérias Gram-positivas como S. aureus.","e":"Incorreta. TB miliar tipicamente NÃO causa macro-cavitações, mas sim micronódulos compactos."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Diagnóstico Diferencial","Êmbolos Sépticos","Co-infecção"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-', 'approved', 47)
    ON CONFLICT DO NOTHING;

    -- Q49 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-nuq4qk', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual a principal causa de resistência a múltiplas drogas (TB-MDR) no contexto do sistema de saúde?', '[{"id":"a","text":"Uso irregular da medicação pelo paciente ou prescrição inadequada de doses/tempos pelos profissionais (tratamento inadequado)."},{"id":"b","text":"Mutação espontânea do bacilo causada pela poluição atmosférica."},{"id":"c","text":"Transmissão exclusiva por animais domésticos infectados."},{"id":"d","text":"Falta de vacinação com BCG em adultos."},{"id":"e","text":"Ingestão excessiva de laticínios não pasteurizados."}]', 'a', 
        'A resistência é um fenômeno de seleção natural induzido pelo homem. Quando o paciente toma o remédio de forma intermitente (alguns dias sim, outros não), os níveis da droga no sangue caem abaixo da dose letal. Isso mata os bacilos sensíveis, mas permite que os bacilos com mutações naturais de resistência sobrevivam e se proliferem, tornando o tratamento convencional ineficaz.', '{"a":"Correta. A falha de adesão é o motor da crise de multirresistência global.","b":"Incorreta. Poluição não tem relação genética com a mutação do M. tuberculosis.","c":"Incorreta. A TB humana (por M. tuberculosis) é transmitida de pessoa para pessoa por via aérea.","d":"Incorreta. A BCG previne formas graves na infância, mas não tem relação direta com a prevenção de resistência de cepas em adultos.","e":"Incorreta. Isso descreve a transmissão da TB bovina (M. bovis), que é rara e não é a causa da crise de MDR."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'nuq4qk', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Resistência","Antropogenia","Saúde Pública","Adesão"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-nuq4qk', 'approved', 48)
    ON CONFLICT DO NOTHING;

    -- Q50 (Batch 3)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-7tzrus', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'No contexto da pandemia de HIV, a Tuberculose tornou-se a principal causa de óbito evitável. Sobre o ''rastreio da TB em indivíduos vivendo com HIV'', qual a ferramenta recomendada para diagnóstico em pacientes gravemente doentes e internados, mesmo que não consigam produzir escarro?', '[{"id":"a","text":"Teste de antígeno lipoarabinomanana na urina (LF-LAM)."},{"id":"b","text":"Baciloscopia de secreção lacrimar."},{"id":"c","text":"Níveis de proteína C reativa ultrassensível."},{"id":"d","text":"Biópsia de medula óssea para todos os pacientes com HIV."},{"id":"e","text":"Aguardar a produção espontânea de escarro, independente do tempo."}]', 'a', 
        'O LF-LAM é um teste rápido feito na URINA que detecta um componente da parede celular do bacilo da TB (o lipoarabinomanano). Ele é indicado especificamente para pacientes com HIV avançado (CD4 < 200 ou muito doentes), pois nestes casos a carga bacilar é alta e o bacilo ''vaza'' para a urina. É uma ferramenta vital para diagnóstico rápido à beira do leito em pacientes que não conseguem fornecer amostras respiratórias.', '{"a":"Correta. Tecnologia inovadora incorporada para redução da mortalidade TB-HIV.","b":"Incorreta. Não existe baciloscopia de lágrima como método diagnóstico padronizado.","c":"Incorreta. A PCR é inespecífica e indica inflamação, não confirmando TB.","d":"Incorreta. Seria uma medida invasiva desproporcional como rastreio inicial msm em HIV.","e":"Incorreta. Retardar o diagnóstico em TB-HIV é fatal; deve-se usar métodos alternativos (induções, urina, biópsias de linfonodos) imediatamente."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '7tzrus', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["LF-LAM","TB-HIV","Diagnóstico Rápido","Tecnologia em Saúde"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-7tzrus', 'approved', 49)
    ON CONFLICT DO NOTHING;

    -- Q51 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-miuykp', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 38 anos, em tratamento regular para tuberculose pulmonar há 3 meses (término da fase de ataque), apresenta melhora clínica significativa e baciloscopias negativas no 1º e 2º meses. No entanto, o exame do 3º mês resultou em: ''Baciloscopia de Escarro: Positiva (1+)''. O paciente nega tosse ou febre. Qual o fenômeno imunológico que pode explicar este achado em um paciente que vinha em melhora progressiva?', '[{"id":"a","text":"Eliminação de bacilos mortos (bacilos persistentes não viáveis), o que não caracteriza necessariamente falência do tratamento."},{"id":"b","text":"Resistência secundária adquirida à Pirazinamida puramente motivada pelo estresse metabólico."},{"id":"c","text":"Erro laboratorial mandatório, pois é impossível ter baciloscopia positiva após 2 negativas."},{"id":"d","text":"Aparecimento de uma nova caverna pulmonar causada pelo ''efeito paradoxal'' das vitaminas do complexo B."},{"id":"e","text":"Infecção por micobactéria não tuberculosa (MNT) oportunista pela cura da TB primária."}]', 'a', 
        'Em alguns pacientes, conforme as cavidades pulmonares ''limpam'' e se consolidam, pode haver a expulsão ocasional de restos celulares e bacilos mortos (ou fragmentos de DNA) que são detectados pela baciloscopia (coloração de Ziehl-Neelsen) ou TRM-TB. Se o paciente está clinicamente bem e as culturas forem negativas, esse achado isolado não deve ser interpretado como falha. No entanto, exige monitoramento rigoroso e repetição do exame.', '{"a":"Correta. Fenômeno de ''clareamento'' cavitário.","b":"Incorreta. A resistência secundária não se manifesta clinicamente como ''melhora total''.","c":"Incorreta. Embora o erro possa ocorrer, há uma base biológica para este achado.","d":"Incorreta. Não existe tal efeito paradoxal descrito com vitaminas.","e":"Incorreta. MNTs não ''substituem'' a TB desta forma e não seriam a primeira hipótese."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'miuykp', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Fisiopatologia","Monitoramento","Baciloscopia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-miuykp', 'approved', 50)
    ON CONFLICT DO NOTHING;

    -- Q52 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ra50i6', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose Pericárdica é uma das formas mais graves de tuberculose extrapulmonar. Qual a complicação crônica mais temida desta condição e qual medicamento, se usado precocemente, pode reduzir sua incidência?', '[{"id":"a","text":"Pericardite Constritiva; uso de Prednisona (corticosteroides)."},{"id":"b","text":"Tamponamento cardíaco agudo; uso de Digoxina."},{"id":"c","text":"Infarto agudo do miocárdio; uso de Aspirina."},{"id":"d","text":"Prolapso de valva mitral; uso de Penicilina benzatina."},{"id":"e","text":"Fibrilação atrial paroxística; uso de Varfarina."}]', 'a', 
        'A inflamação crônica causada pelo M. tuberculosis no pericárdio leva à deposição de fibrina, espessamento e posterior calcificação das camadas pericárdicas. Isso resulta em pericardite constritiva (o ''coração em couraça''), que impede o enchimento diastólico. O uso de corticoides (Prednisona) associado ao esquema RIPE ajuda a modular a resposta inflamatória e reduzir a formação de cicatrizes fibróticas, diminuindo o risco de constrição.', '{"a":"Correta. Complicação e prevenção clássica na TB cardíaca.","b":"Incorreta. O tamponamento é uma complicação aguda (efusiva), não crônica (fibrosa).","c":"Incorreta. A TB não atinge as coronárias desta maneira direta.","d":"Incorreta. Isso descreve sequelas de febre reumática.","e":"Incorreta. Arritmias podem ocorrer, mas a constrição é a sequela estrutural viga mestra da doença."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ra50i6', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB Pericárdica","Cardiologia","Corticosteroides","Prevenção"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-ra50i6', 'approved', 51)
    ON CONFLICT DO NOTHING;

    -- Q53 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-5zngsm', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Uma enfermeira de 28 anos, gestante (18 semanas), foi exposta a um paciente com tuberculose pulmonar bacilífera. Ela nunca teve TB e sua PPD de admissão (há 1 ano) era 0 mm. Realizado novo PPD agora que resultou 15 mm. RX de tórax normal e assintomática. Qual a melhor conduta para a gestante?', '[{"id":"a","text":"Iniciar o Tratamento Preventivo da TB (TPTB) com Isoniazida ou Rifampicina imediatamente; a gestação NÃO é contraindicação para o tratamento de infecção latente."},{"id":"b","text":"Aguardar o término da gestação e do aleitamento para tratar a ILTB."},{"id":"c","text":"Interromper a gestação por risco de teratogenicidade dos fármacos da TB."},{"id":"d","text":"Indicar apenas vitamina B6 (Piridoxina) sem os antibióticos, pois o corpo grávido se protege sozinho."},{"id":"e","text":"Realizar abortamento terapêutico imediato, pois a mãe transmitirá a TB latente via placenta."}]', 'a', 
        'Gestantes têm o mesmo risco de adoecimento por TB que a população geral e, se adoecerem, a doença pode ser grave para o feto (baixo peso, prematuridade). A conversão tuberculínica recente indica infecção aguda. As drogas usadas no TPTB (Isoniazida e Rifampicina) são seguras na gestação. Portanto, o tratamento deve ser iniciado com suplementação obrigatória de Piridoxina (B6) para prevenir neuropatia na mãe e no feto.', '{"a":"Correta. Protocolo de ILTB em Gestantes atualizado.","b":"Incorreta. O adiamento aumenta o risco de a gestante adoecer durante o período de maior vulnerabilidade (puerpério).","c":"Incorreta. As drogas de primeira linha são categoria B/C e amplamente usadas com segurança.","d":"Incorreta. A vitamina previne efeitos colaterais, mas não trata o bacilo.","e":"Incorreta. A TB latente não ultrapassa a placenta e não existe indicação de interrupção de gravidez por TB."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '5zngsm', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Gestação","ILTB","Infectologia","Saúde da Mulher"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-5zngsm', 'approved', 52)
    ON CONFLICT DO NOTHING;

    -- Q54 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-3i7tdv', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente está tratando TB há 15 dias e apresenta prurido generalizado e manchas vermelhas (exantema morbiliforme) sem febre ou sinais de gravidade (sinal de Nikolsky negativo). Qual o manejo escalonado correto sugerido pelo Ministério da Saúde para reações cutâneas leves/moderadas?', '[{"id":"a","text":"Suspender todas as drogas até a regressão do exantema e, após, reintroduzir uma a uma começando pela Rifampicina (fármaco com menor chance de causar alergia grave)."},{"id":"b","text":"Manter o tratamento e prescrever apenas hidratante corporal."},{"id":"c","text":"Suspender apenas a Isoniazida e manter o restante do tratamento por 1 ano."},{"id":"d","text":"Trocar por Estreptomicina injetável para o resto da vida."},{"id":"e","text":"Internar o paciente e realizar plasmaférese de urgência."}]', 'a', 
        'Em casos de farmacodermia leve a moderada, o protocolo é: 1) Suspender todas as drogas (R-I-P-E); 2) Aguardar o desaparecimento das lesões; 3) Reintroduzir as drogas sequencialmente para identificar o culpado: Rifampicina (3-7 dias de teste), Isoniazida (3-7 dias), Etambutol (3-7 dias) e, por último, a Pirazinamida (frequente culpada por alergias). Se a reação for grave (ex: Stevens-Johnson), as drogas não devem ser reintroduzidas.', '{"a":"Correta. Protocolo de reintrodução sequencial padrão.","b":"Incorreta. Se houver alergia sistêmica, manter a droga pode levar à anafilaxia ou reações bolhosas graves.","c":"Incorreta. Não se retira uma droga sem saber se ela é a causa.","d":"Incorreta. A conduta é desproporcional e a estreptomicina também pode causar alergia.","e":"Incorreta. Medidas de suporte são suficientes para casos leves após suspensão da droga."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '3i7tdv', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Farmacodermia","Alergia","Manejo","Enfermagem"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-3i7tdv', 'approved', 53)
    ON CONFLICT DO NOTHING;

    -- Q55 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-o9qak9', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose de Orofaringe e Laringe é considerada uma das formas mais contagiosas da doença. Qual o sintoma cardinal da tuberculose laríngea que deve alertar o clínico para o diagnóstico em um paciente com tosse crônica?', '[{"id":"a","text":"Disfonia (rouquidão) progressiva e dolorosa."},{"id":"b","text":"Perda total da audição bilateral súbita."},{"id":"c","text":"Aumentos de volume das glândulas parótidas (Sialonose)."},{"id":"d","text":"Gengivorragia maciça espontânea."},{"id":"e","text":"Odinofagia profunda que impede a deglutição de sólidos apenas."}]', 'a', 
        'A TB laríngea é quase sempre secundária à TB pulmonar (os bacilos expectorados ''banham'' as cordas vocais). O sintoma mais comum é a rouquidão (disfonia) e a dor ao falar/deglutir (odinofagia laríngea). Devido à alta carga bacilar e à aerolização pela fala, esses pacientes são extremamente bacilíferos, exigindo isolamento respiratório rigoroso.', '{"a":"Correta. Sintoma guia para TB de vias aéreas superiores.","b":"Incorreta. Associado a otite média por TB ou ototoxicidade de drogas.","c":"Incorreta. Sialonose é comum em parotidite viral ou sarcoidose.","d":"Incorreta. A gengivite por TB é rara e não se manifesta tipicamente por hemorragia maciça isolada.","e":"Incorreta. A dor costuma ser tanto para sólidos quanto para líquidos e a disfonia é o marco principal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'o9qak9', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Otorrinolaringologia","Disfonia","Contagiosidade","Higiene"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-o9qak9', 'approved', 54)
    ON CONFLICT DO NOTHING;

    -- Q56 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-733e2h', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um detento de 45 anos iniciou tratamento para TB com esquema RIPE. Após 3 meses, ele é transferido para o regime semiaberto e deixa de comparecer ao posto de saúde. Por quanto tempo de interrupção contínua um paciente deve ser considerado como tendo ''abandonado'' o tratamento no programa de controle da tuberculose?', '[{"id":"a","text":"30 dias ou mais após a data prevista para o retorno."},{"id":"b","text":"7 dias corridos após a falta à consulta."},{"id":"c","text":"6 meses, correspondendo a um curso completo."},{"id":"d","text":"Apenas se ele formalizar por escrito que não quer mais tomar os remédios."},{"id":"e","text":"24 horas de atraso na dose do Tratamento Diretamente Observado (TDO)."}]', 'a', 
        'Definição de Abandono (Ministério da Saúde): Considera-se abandono o caso em que o paciente, após iniciar o tratamento, deixa de comparecer à unidade de saúde (ou de receber a medicação no TDO) por 30 dias consecutivos ou mais. O abandono é um dos maiores desafios para a cura do paciente e para a saúde coletiva (risco de resistência).', '{"a":"Correta. Definição epidemiológica operacional.","b":"Incorreta. 7 dias é considerado falta; busca ativa deve ser iniciada, mas ainda não é ''abandono'' oficial no sistema.","c":"Incorreta. Seria tempo demais para esperar antes de tomar uma medida de vigilância.","d":"Incorreta. A maioria dos abandonos é silenciosa e sem justificativa formal.","e":"Incorreta. Seria impossível gerir o programa com um critério de 24h para abandono."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '733e2h', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Vigilância","Abandono","Fluxo","Gestão"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-733e2h', 'approved', 55)
    ON CONFLICT DO NOTHING;

    -- Q57 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-oois8q', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose Miliar pode evoluir com Síndrome do Desconforto Respiratório Agudo (SDRA) e falência de múltiplos órgãos. Qual o exame complementar que frequentemente demonstra a gravidade da disseminação hematogênica na medula óssea desses pacientes?', '[{"id":"a","text":"Mielograma ou Biópsia de medula óssea, evidenciando granulomas caseosos."},{"id":"b","text":"Dosagem de Vitamina B12 sérica."},{"id":"c","text":"Conteúdo de ferritina no líquor."},{"id":"d","text":"Avaliação de fragilidade osmótica eritrocitária."},{"id":"e","text":"Cintilografia óssea com tecnécio."}]', 'a', 
        'A TB miliar atinge órgãos ricos em filtros reticuloendoteliais, sendo a medula óssea um dos principais alvos. A biópsia de medula é extremamente útil em casos de febre de origem indeterminada, podendo demonstrar os granulomas típicos (caséolo) e permitir o isolamento do bacilo antes mesmo dos exames de escarro (que podem ser negativos na forma puramente hematogênica).', '{"a":"Correta. Método diagnóstico para TB disseminada.","b":"Incorreta. A B12 avalia anemias carenciais, sem relação específica diagnóstica com a TB.","c":"Incorreta. A ferritina é marcador inflamatório sérico e não faz parte do rastreio de TB no líquor.","d":"Incorreta. Usado na investigação de esferocitose hereditária.","e":"Incorreta. A cintilografia detecta áreas de hipermetabolismo ósseo, mas não diferencia TB de metástases ou infecções piogênicas."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'oois8q', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB Miliar","Medula Óssea","Hematologia","Biópsia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-oois8q', 'approved', 56)
    ON CONFLICT DO NOTHING;

    -- Q58 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-nawa1f', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 58 anos, morador de área rural, apresenta febre, perda de peso e o RX de tórax com cavitação em ápice pulmonar. Ele relata o costume de ''pastar'' ou mastigar gravetos e capim. Além de Tuberculose, qual o principal diagnóstico diferencial desta síndrome cavitária, considerando a exposição e a localização geográfica?', '[{"id":"a","text":"Paracoccidioidomicose (Micose Sul-Americana)."},{"id":"b","text":"Asbestos pulmonar pela poeira da estrada."},{"id":"c","text":"Histoplasmose epidêmica (doença das cavernas)."},{"id":"d","text":"Sarcoidose estádio IV."},{"id":"e","text":"Silicose aguda por moagem de grãos."}]', 'a', 
        'A Paracoccidioidomicose (PCM) é frequentemente confundida com a Tuberculose. Ambas atingem o parênquima pulmonar com infiltrados e cavitações, causam sintomas constitucionais (febre/emagrecimento) e linfonodomegalias. O hábito de mastigar vegetais (onde o fungo reside no solo) é um dado epidemiológico clássico. O diagnóstico diferencial é fundamental, pois o tratamento da PCM envolve sulfonamidas ou derivados imidazólicos (ex: Itraconazol), enquanto o da TB envolve antibióticos específicos.', '{"a":"Correta. Principal diagnóstico diferencial micológico da TB no Brasil.","b":"Incorreta. Causa fibrose em bases, sem síndrome febril aguda/subaguda típica.","c":"Incorreta. Associada a fezes de morcegos em cavernas/galinheiros.","d":"Incorreta. Doença granulomatosa sistêmica idiopática; menos provável com histórico rural e hábito mastigatório.","e":"Incorreta. Exposição à sílica envolve mineração ou jateamento de areia."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'nawa1f', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["PCM","Diagnóstico Diferencial","Infectologia","Brasil"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-nawa1f', 'approved', 57)
    ON CONFLICT DO NOTHING;

    -- Q59 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-5b9mkh', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual a orientação correta quanto ao tempo de isolamento respiratório (precaução para aerossóis) para um paciente com Tuberculose Pulmonar sensível que está sob tratamento adequado com o esquema RIPE e apresenta boa adesão?', '[{"id":"a","text":"Geralmente 15 dias após o início do tratamento efetivo, desde que haja melhora clínica, pois a carga bacilar na via aérea cai drasticamente neste período."},{"id":"b","text":"Até que o tratamento complete 6 meses."},{"id":"c","text":"O isolamento não é necessário em nenhum momento, apenas o uso de máscara cirúrgica pelo médico."},{"id":"d","text":"Até que o PPD (teste cutâneo) negative."},{"id":"e","text":"Vitalício para contato com crianças e idosos."}]', 'a', 
        'Após 14 a 15 dias de tratamento correto com Rifampicina (altamente bactericida), a maioria dos pacientes com TB sensível deixa de ser infectante, pois os bacilos remanescentes na via aérea estão inviabilizados para transmissão. No entanto, se houver suspeita de resistência ou o paciente estiver em ambiente hospitalar crítico, o isolamento deve ser mantido até a negativação definitiva das baciloscopias.', '{"a":"Correta. Critério operacional de desisolamento ambulatorial/hospitalar.","b":"Incorreta. Seria inviável manter o isolamento por 6 meses para todos os pacientes.","c":"Incorreta. A transmissibilidade no início (fase pré-tratamento) é real e perigosa.","d":"Incorreta. O PPD raramente negativa e não serve para monitorar transmissibilidade ou cura.","e":"Incorreta. O contagio cessa com o tratamento resolutivo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '5b9mkh', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Biossegurança","Isolamento","Transmissibilidade","Epidemiologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-5b9mkh', 'approved', 58)
    ON CONFLICT DO NOTHING;

    -- Q60 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-ldxp8x', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 40 anos, com TB pulmonar, apresenta quadro de tonturas, náuseas e dificuldades na marcha (desequilíbrio). Ao exame físico, nota-se nistagmo horizontal e alteração no teste de Romberg. Qual fármaco, tipicamente usado em esquemas de segunda linha ou retratamento, é o principal suspeito deste efeito ototóxico vestibular?', '[{"id":"a","text":"Estreptomicina (ou outros aminoglicosídeos)."},{"id":"b","text":"Levofloxacino."},{"id":"c","text":"Bedaquilina."},{"id":"d","text":"Linezolida."},{"id":"e","text":"Clofazimina."}]', 'a', 
        'A Estreptomicina é um aminoglicosídeo injetável que tem como principal toxicidade a lesão do VIII par craniano (nervo vestibulococlear). Pode causar tanto perda auditiva (toxicidade coclear) quanto tontura/vertigem (toxicidade vestibular). O idoso e o renal crônico são mais susceptíveis. Por isso, as drogas injetáveis foram retiradas da primeira linha de tratamento.', '{"a":"Correta. Efeito adverso clássico do grupo dos aminoglicosídeos.","b":"Incorreta. Causa rotura de tendões e distúrbios do SNC (insônia/tremores), não ototoxicidade direta.","c":"Incorreta. Aumenta o intervalo QT no ECG.","d":"Incorreta. Causa neurite óptica e plaquetopenia periférica.","e":"Incorreta. Causa pigmentação acastanhada da pele."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'ldxp8x', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Ototoxicidade","Estreptomicina","Efeitos Adversos","Auditivo"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-ldxp8x', 'approved', 59)
    ON CONFLICT DO NOTHING;

    -- Q61 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-171klm', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Como deve ser feita a investigação de contatos intradomiciliares de um caso índice de Tuberculose Pulmonar Bacilífera?', '[{"id":"a","text":"Todos os contatos (independentemente da presença de sintomas) devem ser avaliados com anamnese, RX de tórax e teste de infecção latente (PPD ou IGRA)."},{"id":"b","text":"Apenas os contatos que estiverem tossindo sangue devem ser avaliados."},{"id":"c","text":"Somente crianças menores de 5 anos devem ser investigadas."},{"id":"d","text":"Deve-se tratar preventivamente todos os contatos com o esquema RIPE antes mesmo de fazer exames."},{"id":"e","text":"Os contatos só precisam se afastar do paciente por 15 dias, sem necessidade de exames."}]', 'a', 
        'O controle de contatos visa: 1) Identificar casos de TB doença escondidos (busca ativa); 2) Identificar infecção latente (ILTB) para tratamento preventivo. Portanto, a avaliação deve ser universal no domicílio do paciente índice bacilífero.', '{"a":"Correta. Norma de vigilância epidemiológica fundamental.","b":"Incorreta. Muitos casos de TB ativa têm tosse seca ou sintomas vagos.","c":"Incorreta. Adultos, idosos e imunodeprimidos do domicílio também têm alto risco.","d":"Incorreta. Tratamento (esquema RIPE) exige diagnóstico de doença; a prevenção (monoterapia) exige exclusão de doença.","e":"Incorreta. A conduta é passiva e ignora o risco de infecção já estabelecida no grupo."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '171klm', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Vigilância","Contatos","Saúde da Família","Fluxo"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-171klm', 'approved', 60)
    ON CONFLICT DO NOTHING;

    -- Q62 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-9jepmj', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Recentemente, o Ministério da Saúde do Brasil recomenda a Rifapentina (associada à Isoniazida - esquema 3HP) como uma opção para o tratamento preventivo da Tuberculose (TPTB). Qual a principal vantagem logística do esquema 3HP em comparação à Isoniazida isolada (6 ou 9 meses)?', '[{"id":"a","text":"Duração muito menor (apenas 12 doses semanais em 3 meses) e maior taxa de adesão."},{"id":"b","text":"Custo 100 vezes menor em farmácias populares."},{"id":"c","text":"Pode ser administrada via inalatória através de nebulização."},{"id":"d","text":"Elimina a necessidade de suplementação com Vitamina B6."},{"id":"e","text":"Causa coloração verde na urina, facilitando o controle visual do médico."}]', 'a', 
        'O esquema 3HP (3 meses de Rifapentina + Isoniazida semanal) revolucionou o tratamento da ILTB. Por ser curto e exigir apenas uma tomada semanal, a adesão é muito superior aos esquemas de 6 a 9 meses de doses diárias de Isoniazida. É a escolha preferencial para contatos e pessoas vivendo com HIV com boa contagem de CD4.', '{"a":"Correta. Benefício logístico e terapêutico moderno.","b":"Incorreta. A Rifapentina é, na verdade, uma droga mais cara por dose unitária, mas compensa pela redução de danos e aumento da cura latente.","c":"Incorreta. A via é puramente oral.","d":"Incorreta. A Isoniazida continua presente, exigindo B6 se houver fatores de risco.","e":"Incorreta. A Rifapentina, como a Rifampicina, colore os fluidos de vermelho/laranja, não verde."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9jepmj', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["ILTB","3HP","Adesão","Novas Tecnologias"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-9jepmj', 'approved', 61)
    ON CONFLICT DO NOTHING;

    -- Q63 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-9ghxxy', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 48 anos com história de silicose ocupacional (ex-minerador) procura o ambulatório por febre, perda ponderal e RX com novos infiltrados cavitários. Por que a Tuberculose é tão frequente em pacientes com Silicose (Síndrome de Silicotuberculose)?', '[{"id":"a","text":"A sílica ingerida pelos macrófagos alveolares causa sua necrose e impede a contenção adequada do M. tuberculosis."},{"id":"b","text":"O bacilo da TB se alimenta quimicamente do dióxido de silício presente nos pulmões."},{"id":"c","text":"A vacina BCG é neutralizada pelas partículas de areia no interstício pulmonar."},{"id":"d","text":"Pacientes com silicose costumam ter alergia severa à Isoniazida."},{"id":"e","text":"Não há relação estatística entre as duas condições; é apenas uma coincidência epidemiológica."}]', 'a', 
        'A sílica é citotóxica para os macrófagos alveolares. O macrófago é a célula viga mestra da defesa contra o bacilo de Koch. Quando os macrófagos estão ''ocupados'' ou destruídos pelo processamento da sílica, a imunidade local pulmonar fica devastada, permitindo que qualquer bacilo inalado ou latente se prolifere descontroladamente. Pacientes silicoticos têm risco dezenas de vezes maior de desenvolver TB que a população geral.', '{"a":"Correta. Explicação fisiopatológica clássica da pneumoconiose e infecção.","b":"Incorreta. O bacilo é quimio-heterotrófico e se alimenta de substâncias orgânicas do hospedeiro.","c":"Incorreta. A BCG é uma vacina neonatal e sua ação imune é sistêmica/celular, não física neutralizável por poeira.","d":"Incorreta. Não existe tal associação farmacológica fixa.","e":"Incorreta. A associação é fortíssima e descrita em todos os manuais de medicina do trabalho."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '9ghxxy', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Silicose","Pneumoconiose","Saúde Ocupacional","Imunologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-9ghxxy', 'approved', 62)
    ON CONFLICT DO NOTHING;

    -- Q64 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-x8nu8s', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose Urogenital pode causar uma complicação radiológica característica chamada de ''rim mastigado'' (masticated kidney) ou ''autonefrectomia''. O que isso representa?', '[{"id":"a","text":"Um rim destruído por calcificações e retrações cicatriciais extensas, tornando-se não funcional."},{"id":"b","text":"Um rim com múltiplos tumores malignos síncronos causados pela TB."},{"id":"c","text":"Uma infestação do sistema coletor por larvas de insetos atraídas pelo pus da TB."},{"id":"d","text":"Um rim transplantado que sofre rejeição hiperaguda pela TB latente do doador."},{"id":"e","text":"A presença de cálculos de struvita gigantes ocupando todo o parênquima."}]', 'a', 
        'A TB causa inflamação destrutiva crônica (necrose de caseificação) que atinge os cálices, a pelve e o parênquima renal. Com a evolução e a tentativa de cura por fibrose e calcificação, o rim se retrai e se torna um bloco de cálcio e tecido cicatricial sem função excretora (autonefrectomia). Na radiologia/TC, as imagens dessas áreas de destruição irregular lembram um órgão ''mastigado''.', '{"a":"Correta. Achado de imagem patognomônico de TB renal tardia.","b":"Incorreta. A TB não é oncogênica desta forma.","c":"Incorreta. Absurdo biológico.","d":"Incorreta. Não tem relação direta com o termo ''rim mastigado''.","e":"Incorreta. Cáclulos de estruvita sugerem infecção por Proteus e não TB."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'x8nu8s', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["TB Renal","Radiologia","Autonefrectomia","Urologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-x8nu8s', 'approved', 63)
    ON CONFLICT DO NOTHING;

    -- Q65 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-v4ow5w', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 41 anos está no 5º mês de tratamento (fase de manutenção) para TB pulmonar. Ele relata ao médico que parou de sentir o gosto e o cheiro dos alimentos e que tem sentido tremores leves nas mãos. Qual o manejo correto desse possível efeito colateral neurológico central?', '[{"id":"a","text":"Investigar toxicidade pela Isoniazida; administrar Piridoxina (B6) e, se não houver melhora, considerar suspensão da droga."},{"id":"b","text":"Suspender a Rifampicina imediatamente pois causa ''anosmia química''."},{"id":"c","text":"Diagnosticar COVID-19 e colocar em quarentena forçada."},{"id":"d","text":"Não são efeitos esperados das drogas da TB; investigar tumor de tronco cerebral."},{"id":"e","text":"Orientar que o cheiro forte da Pirazinamida causa saturação olfativa passageira."}]', 'a', 
        'Embora a neuropatia periférica seja mais comum, a Isoniazida pode causar efeitos no SNC (tremores, irritabilidade, convulsões, distúrbios da memória e, mais raramente, distúrbios sensitivos centrais). A base do manejo é a reposição de Vitamina B6, que ajuda a ''estabilizar'' o metabolismo neuronal afetado pela droga.', '{"a":"Correta. Associação clássica da toxicidade central da isoniazida.","b":"Incorreta. Rifampicina não tem esse perfil de neurotoxicidade.","c":"Incorreta. Embora COVID cause anosmia, os tremores e o contexto do tratamento de TB tornam a farmacotoxicologia a primeira hipótese.","d":"Incorreta. São efeitos descritos na bula e na literatura sobre a droga.","e":"Incorreta. Não existe esta saturação mecânica descrita clinicamente para a pirazinamida."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'v4ow5w', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Efeitos Adversos","Isoniazida","SNC","B6"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-v4ow5w', 'approved', 64)
    ON CONFLICT DO NOTHING;

    -- Q66 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-sct27l', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Em pacientes com Tuberculose Ocular, qual a manifestação mais frequente observada no exame de fundo de olho?', '[{"id":"a","text":"Coroidite tuberculosa (presença de tubérculos de coroide, infiltrados branco-amarelados)."},{"id":"b","text":"Descolamento de retina exsudativo maciço."},{"id":"c","text":"Oclusão de artéria central da retina."},{"id":"d","text":"Cristais de colesterol na fóvea (Mancha de Cherry-red)."},{"id":"e","text":"Hemorragia vítrea em ''chama de vela''."}]', 'a', 
        'A TB disseminada pode atingir a coroide (a camada vascular do olho). Os ''tubérculos de coroide'' são granulomas visíveis ao oftalmoscópio como pequenas placas amareladas e elevadas. Sua presença é um forte indicativo de disseminação hematogênica (TB biliar ou miliar).', '{"a":"Correta. Marco diagnóstico da TB ocular.","b":"Incorreta. Pode ocorrer em formas severas, mas não é a mais ''frequente''.","c":"Incorreta. Característico de fenômenos embólicos agudos.","d":"Incorreta. Mancha de Cherry-red é associada a doenças metabólicas ou oclusão arterial.","e":"Incorreta. Hemorragia em chama de vela é comum em retinopatia hipertensiva ou diabética."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'sct27l', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Coroidite","Oftalmologia","Tubérculo de Coroide","Miliar"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-sct27l', 'approved', 65)
    ON CONFLICT DO NOTHING;

    -- Q67 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-rlycl1', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual o principal critério para a interrupção do isolamento hospitalar de um paciente com Tuberculose em sistema de pressão negativa e filtros HEPA?', '[{"id":"a","text":"Melhora clínica clara do paciente e pelo menos duas (idealmente três) baciloscopias de escarro negativas, coletadas em dias diferentes, sob tratamento adequado."},{"id":"b","text":"O tratamento completar 48 horas."},{"id":"c","text":"O paciente prometer que usará máscara cirúrgica no corredor."},{"id":"d","text":"O teste de PPD (feito na alta) ser negativo."},{"id":"e","text":"A família solicitar a alta por motivos religiosos."}]', 'a', 
        'Diferente do isolamento domiciliar (onde 15 dias de tratamento costumam bastar para o desisolamento operacional), o ambiente hospitalar exige critérios mais rígidos por conter outros pacientes vulneráveis. A demonstração de negativas em série (baciloscopia negativa) é o padrão-ouro de segurança para suspender a precaução para aerossóis.', '{"a":"Correta. Protocolo de segurança hospitalar.","b":"Incorreta. 48h é tempo insuficiente para assepsia da via aérea.","c":"Incorreta. Comprometimento verbal não tem valor biológico de segurança.","d":"Incorreta. PPD não serve para alta ou desisolamento.","e":"Incorreta. Motivos sociais ou religiosos não suplantam o risco de infecção hospitalar massiva."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'rlycl1', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Biossegurança","Isolamento","Infectologia","Gestão Hospitalar"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-rlycl1', 'approved', 66)
    ON CONFLICT DO NOTHING;

    -- Q68 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-t9pm05', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 32 anos apresenta infertilidade primária há 2 anos. Antecedente pessoal de ''frialdade abdmoninal'' e ascite leve na adolescência tratada como ''problemas de estômago''. Histerossalpingografia atual revela trompas obstruídas e com aspecto de ''contas de rosário'' ou ''trompas em cachimbo''. Qual a principal hipótese diagnóstica?', '[{"id":"a","text":"Salpingite Tuberculosa (TB Genital feminina)."},{"id":"b","text":"Endometriose profunda severa."},{"id":"c","text":"Síndrome dos Ovários Policísticos (SOP)."},{"id":"d","text":"Infecção por Clamídia aguda."},{"id":"e","text":"Síndrome de Asherman pós-curetagem."}]', 'a', 
        'A TB genital é uma causa silenciosa e frequente de infertilidade em áreas endêmicas. O bacilo atinge as trompas (salpingite) via hematogênica, causando destruição da mucosa e áreas de estenose e dilatação (contas de rosário). Frequentemente é sequela de uma TB peritoneal ocorrida anos antes. O diagnóstico exige biópsia de endométrio ou cultura de fluxo menstrual.', '{"a":"Correta. Causa de esterilidade tubária clássica.","b":"Incorreta. Endometriose causa aderências, mas o padrão de ''rosário'' nas trompas é muito sugestivo de TB ou DIPA crônica.","c":"Incorreta. SOP é uma desordem anovulatória, não anatômica tubária.","d":"Incorreta. A clamídia causa obstrução, mas raramente com este histórico de doença sistêmica pregressa.","e":"Incorreta. Asherman ocorre após traumas uterinos (leves), não atingindo as trompas desta maneira."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 't9pm05', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Infertilidade","Sinal do Rosário","Ginecologia","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-t9pm05', 'approved', 67)
    ON CONFLICT DO NOTHING;

    -- Q69 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-1h1cdx', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose Mamária é uma apresentação rara. Qual o diagnóstico diferencial mais importante na prática clínica, especialmente em mulheres com mais de 40 anos?', '[{"id":"a","text":"Câncer de Mama."},{"id":"b","text":"Prolactinoma."},{"id":"c","text":"Ectasia ductal."},{"id":"d","text":"Mastite puerperal comum."},{"id":"e","text":"Lipoma intramamário."}]', 'a', 
        'A TB mamária se manifesta como um nódulo endurecido, às vezes com retração da pele ou fístulas que drenam material purulento/caseoso. Por ser um nódulo fixo e de crescimento progressivo, simula perfeitamente um carcinoma mamário. A biópsia é obrigatória para diferenciar as duas entidades.', '{"a":"Correta. Principal ''grande simulador'' no tecido mamário.","b":"Incorreta. Prolactinoma causa galactorreia bilateral, sem nódulos mamários inflamatórios.","c":"Incorreta. Ectasia ductal causa descarga papilar, sem formação de fístulas caseosas sistêmicas.","d":"Incorreta. Ocorre no período da amamentação e é uma infecção por Gram-positivos aguda.","e":"Incorreta. Lipoma é macio, móvel e indolor."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', '1h1cdx', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Mastologia","Oncologia","Diagnóstico Diferencial","Nódulos"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-1h1cdx', 'approved', 68)
    ON CONFLICT DO NOTHING;

    -- Q70 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-gmaf0a', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Em pacientes com Tuberculose e uso de Dolutegravir (DTG) para HIV, dobramos a dose do DTG para 50 mg 12/12h. Quando o paciente termina o tratamento da TB e para de usar a Rifampicina, por quanto tempo ainda se deve manter a dose dobrada do Dolutegravir?', '[{"id":"a","text":"Duas semanas após a última dose de Rifampicina, pois a indução enzimática demora este tempo para dissipar."},{"id":"b","text":"Pode voltar para a dose normal no dia seguinte."},{"id":"c","text":"Deve-se manter a dose dobrada pelo resto da vida."},{"id":"d","text":"Pelo menos por 6 meses para garantir que não haja ''efeito rebote''."},{"id":"e","text":"Até que a carga viral do HIV negative novamente."}]', 'a', 
        'A indução enzimática do citocromo P450 pela Rifampicina é potente e persistente. Mesmo após a interrupção da droga, as enzimas hepáticas ''induzidas'' permanecem ativas por cerca de 10 a 14 dias até serem degradadas naturalmente. Portanto, para manter níveis seguros de Dolutegravir, mantém-se a dose dobrada por 2 semanas após o fim do esquema RIPE.', '{"a":"Correta. Orientação farmacocinética de precisão para TB-HIV.","b":"Incorreta. Se baixar no dia seguinte, o DTG será degradado rapidamente pelas enzimas remanescentes.","c":"Incorreta. Desnecessário e aumenta o risco de efeitos colaterais do DTG.","d":"Incorreta. Tempo excessivamente longo.","e":"Incorreta. O critério é baseado na meia-vida das enzimas citocromais, não na carga viral diretamente."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'gmaf0a', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Interações","Dolutegravir","Rifampicina","Farmacologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-gmaf0a', 'approved', 69)
    ON CONFLICT DO NOTHING;

    -- Q71 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-k1n96h', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual a principal complicação metabólica da Tuberculose Adrenal (Doença de Addison por TB)?', '[{"id":"a","text":"Insuficiência adrenal primária (hipocortisolismo e hipoaldosteronismo), causando hiponatremia, hipercalemia e hipotensão."},{"id":"b","text":"Síndrome de Cushing por hipercortisolismo reacional."},{"id":"c","text":"Diabetes Insipidus central."},{"id":"d","text":"Hipertireoidismo severo."},{"id":"e","text":"Hipercalcemia hipocalciúrica familiar."}]', 'a', 
        'O M. tuberculosis pode destruir progressivamente o córtex das glândulas adrenais. A falta de aldosterona leva à perda de sódio (hiponatremia) e retenção de potássio (hipercalemia), enquanto a falta de cortisol causa hipotensão refratária e hipoglicemia. É uma emergência endócrina se não diagnosticada a tempo.', '{"a":"Correta. Fisiopatologia da Doença de Addison infecciosa.","b":"Incorreta. Addison é o contrário de Cushing.","c":"Incorreta. Diabetes insipidus é uma disfunção da neuro-hipófise (ADH).","d":"Incorreta. A glândula tireoide não é a adrenel.","e":"Incorreta. Distúrbio mineral sem relação com a TB adrenal."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'k1n96h', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Endocrinologia","Addison","Adrenal","Infectologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-k1n96h', 'approved', 70)
    ON CONFLICT DO NOTHING;

    -- Q72 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-k7ad5k', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'No exame PPD, o que deve ser medido pelo profissional de saúde no dia da leitura (48-72h após aplicação)?', '[{"id":"a","text":"O diâmetro maior da INDURAÇÃO (endurecimento palpável) em milímetros."},{"id":"b","text":"O diâmetro do ERITEMA (área avermelhada)."},{"id":"c","text":"A profundidade da ferida em centímetros."},{"id":"d","text":"Apenas se há dor ou não ao toque."},{"id":"e","text":"A quantidade de pus que drenar do local."}]', 'a', 
        'A leitura do PPD é baseada na hipersensibilidade tardia (reação de tipo IV), que se manifesta por um endurecimento (induração) da derme. O eritema (vermelhidão) pode ocorrer por irritação local e não deve ser medido, pois superestima o resultado do teste. A medição deve ser feita transversalmente ao eixo do braço.', '{"a":"Correta. Técnica correta de leitura do teste tuberculínico.","b":"Incorreta. Eritema não indica imunidade celular.","c":"Incorreta. Não se mede profundidade nem em centímetros.","d":"Incorreta. Subjetivo e sem valor diagnóstico.","e":"Incorreta. O PPD bem aplicado não causa ''drenagem de pus''."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'k7ad5k', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["PPD","Técnica","Semiologia","Diagnóstico"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-k7ad5k', 'approved', 71)
    ON CONFLICT DO NOTHING;

    -- Q73 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-xk6g2a', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose de Intestino Delgado pode simular perfeitamente qual doença inflamatória intestinal crônica, tanto nos exames de imagem quanto na colonoscopia?', '[{"id":"a","text":"Doença de Crohn."},{"id":"b","text":"Retocolite Ulcerativa (RCU)."},{"id":"c","text":"Doença Celíaca."},{"id":"d","text":"Síndrome do Intestino Irritável."},{"id":"e","text":"Diverticulite aguda."}]', 'a', 
        'A TB intestinal e a Doença de Crohn são o grande desafio diagnóstico da gastroenterologia. Ambas causam úlceras longitudinais, estenoses, granulomas (embora na TB o granuloma seja caseoso) e atingem preferencialmente a região ileocecal. O diagnóstico diferencial muitas vezes exige teste terapêutico ou PCR nas biópsias intestinais.', '{"a":"Correta. Principal diagnóstico diferencial cirúrgico/gastro: Crohn x TB.","b":"Incorreta. A RCU atinge apenas o cólon e de forma contínua e superficial.","c":"Incorreta. A Doença Celíaca é uma enteropatia imune ao glúten com atrofia vilosa, sem cavernas ou fístulas infecciosas.","d":"Incorreta. A SII é funcional e não causa lesões orgânicas como fístulas e úlceras.","e":"Incorreta. Diverticulite atinge mais o cólon esquerdo e é uma complicação aguda de divertículos pré-existentes."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'xk6g2a', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Doença de Crohn","TB Intestinal","Gastroenterologia","Diferencial"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-xk6g2a', 'approved', 72)
    ON CONFLICT DO NOTHING;

    -- Q74 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-m3l35u', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente portador de Hepatite B crônica inicia tratamento para TB. Qual o risco principal durante a fase de ataque do tratamento da TB neste paciente?', '[{"id":"a","text":"Agravamento da hepatite medicamentosa pelas drogas do esquema RIPE e possível reativação do vírus da Hepatite B pela inflamação sistêmica."},{"id":"b","text":"Desenvolvimento imediato de câncer renal compensatório."},{"id":"c","text":"Cura espontânea da Hepatite B pela ação da Rifampicina."},{"id":"d","text":"Infertilidade permanente masculina."},{"id":"e","text":"Perda do paladar pelas próximas 5 décadas."}]', 'a', 
        'Pacientes com doenças hepáticas pré-existentes (Hepatite B, C, cirrose, alcoólatras) têm reserva funcional hepática reduzida. O uso de três drogas potencialmente hepatotóxicas (R, I, P) aumenta muito a chance de uma Hepatite Medicamentosa severa. Por isso, esses pacientes exigem exames de bioquímica hepática quinzenais ou mensais durante todo o tratamento.', '{"a":"Correta. Risco clínico real e fundamentado.","b":"Incorreta. Não há tal associação carcinogênica.","c":"Incorreta. A Rifampicina não tem efeito antiviral sobre o HBV.","d":"Incorreta. Não existe tal associação testicular.","e":"Incorreta. Absurdo clínico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'm3l35u', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Hepatites Virais","Toxicidade","Segurança","Monitoramento"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-m3l35u', 'approved', 73)
    ON CONFLICT DO NOTHING;

    -- Q75 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-o2v7lb', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A vacina BCG deve ser aplicada preferencialmente em que local do corpo e qual a via de administração correta?', '[{"id":"a","text":"No braço direito, na altura da inserção do músculo deltoide; via intradérmica."},{"id":"b","text":"Na nádega (quadrante superior externo); via intramuscular profunda."},{"id":"c","text":"Na face anterior da coxa; via subcutânea."},{"id":"d","text":"Na planta do pé; via tópica."},{"id":"e","text":"No topo da cabeça; via epicutânea."}]', 'a', 
        'A aplicação da BCG é rigorosa: via intradérmica no braço direito. Esse local foi padronizado mundialmente para facilitar a identificação da cicatriz vacinal em inquéritos epidemiológicos. A via intradérmica é essencial para a correta formação da pápula e posterior pústula/ulceração/cicatriz típica.', '{"a":"Correta. Técnica padrão do Programa Nacional de Imunizações (PNI).","b":"Incorreta. Via intramuscular causaria abcessos profundos e falha na resposta imune típica.","c":"Incorreta. Via subcutânea é usada para outras vacinas (ex: Sarampo), mas não para BCG.","d":"Incorreta. Inviável.","e":"Incorreta. Absurdo técnico."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'o2v7lb', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["BCG","Imunização","Técnica","Saúde Pública"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-o2v7lb', 'approved', 74)
    ON CONFLICT DO NOTHING;

    -- Q76 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        '', '[{"id":"a","text":"Mycobacterium bovis."},{"id":"b","text":"Mycobacterium africanum."},{"id":"c","text":"Mycobacterium leprae."},{"id":"d","text":"Mycobacterium avium."},{"id":"e","text":"Mycobacterium kansasii."}]', 'a', 
        'O M. bovis é o agente da tuberculose bovina. Pode infectar humanos através da ingestão de produtos lácteos contaminados (transmissão digestiva), causando frequentemente tuberculose ganglionar ou intestinal. É um dos membros do complexo que causa a doença TB em humanos, embora a esmagadora maioria dos casos mundiais seja por M. tuberculosis (transmissão aérea).', '{"a":"Correta. Agente zoonótico clássico.","b":"Incorreta. Presente em regiões da África, transmissão aérea similar ao M. tuberculosis.","c":"Incorreta. Agente da Hanseníase.","d":"Incorreta. Micobactéria não tuberculosa (MNT), ambiental.","e":"Incorreta. Outra MNT ambiental importante."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', '', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Zoologenia","M. bovis","Higiene Alimentar","Epidemiologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-', 'approved', 75)
    ON CONFLICT DO NOTHING;

    -- Q77 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-e9dcjm', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente idoso (82 anos) com diagnostico de Tuberculose é também diabético e hipertenso. Ele está em uso de Glibenclamida, Enalapril e Hidroclorotiazida. Durante o tratamento da TB com o esquema RIPE, o médico observa que o controle glicêmico do paciente piorou muito (hemoglobina glicada subiu). Qual a explicação farmacológica para este fato?', '[{"id":"a","text":"A Rifampicina induz o metabolismo da Glibenclamida no fígado, reduzindo sua eficácia hipoglicemiante."},{"id":"b","text":"A Isoniazida estimula a produção de insulina, causando hiperglicemia rebote."},{"id":"c","text":"O Etambutol bloqueia os receptores de insulina nos tecidos periféricos."},{"id":"d","text":"A Pirazinamida converte o açúcar do sangue em ácido úrico, elevando ambos."},{"id":"e","text":"Não há interação; o paciente deve estar comendo mais doces por causa do tratamento."}]', 'a', 
        'Assim como o Dolutegravir e os Anticoncepcionais, as sulfonilureias (Glibenclamida, Gliclazida) são metabolizadas pelo citocromo P450. A potente indução pela Rifampicina acelera a ''destruição'' do remédio do diabetes, deixando o paciente desprotegido e hiperglicêmico. Pode ser necessário trocar para insulina ou ajustar as doses orais sensivelmente.', '{"a":"Correta. Interação medicamentosa clássica no paciente polipatológico.","b":"Incorreta. Isoniazida não tem este efeito.","c":"Incorreta. Sem fundamento fisiopatológico.","d":"Incorreta. Não existe tal via bioquímica.","e":"Incorreta. Negligenciada a farmacotoxicologia evidente."}', 
        'media', 'active', 'APROVADA', 'gerada_qrub', 'e9dcjm', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["Diabetes","Interações","Rifampicina","Farmacologia"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-e9dcjm', 'approved', 76)
    ON CONFLICT DO NOTHING;

    -- Q78 (Batch 4)
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TB-opaky5', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose Miliar em crianças menores de 2 anos é uma emergência pediátrica. Qual a principal medida de saúde pública no Brasil que comprovadamente reduziu as taxas de mortalidade por esta forma e pela meningite tuberculosa nesta faixa etária?', '[{"id":"a","text":"Vacinação universal com BCG ao nascer."},{"id":"b","text":"Uso de máscaras cirúrgicas em todas as creches."},{"id":"c","text":"Distribuição gratuita de leite em pó fortificado com Ferro."},{"id":"d","text":"Proibição da entrada de adultos em berçários."},{"id":"e","text":"Testagem de PPD em todas as grávidas no pré-natal."}]', 'a', 
        'A vacina BCG não previne a infecção pulmonar comum no adulto, mas é extremamente eficaz (80-90%) em prevenir as formas de disseminação hematogênica precoce na criança (forma miliar e meningite). É por isso que ela é aplicada obrigatoriamente logo após o nascimento.', '{"a":"Correta. Principal impacto epidemiológico da vacina BCG.","b":"Incorreta. Medida inviável e sem evidência específica para TB infantil msm em creches.","c":"Incorreta. Nutrição ajuda, mas a vacina é o fator imunológico direto.","d":"Incorreta. Inviável.","e":"Incorreta. A testagem de grávidas não substitui a vacinação direta da criança."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'opaky5', '{"package_id":"44BB9F70-13D0-42E0-808E-8DED933CEA6A","tags":["BCG","Pediatria","Prevenção","Saúde Pública"]}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    VALUES (p_id, 'FGV-TB-opaky5', 'approved', 77)
    ON CONFLICT DO NOTHING;

END $$;