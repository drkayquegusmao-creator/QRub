DO $$
DECLARE
    p_id UUID := '44bb9f70-13d0-42e0-808e-8ded933cea6a';
BEGIN
    -- Q1
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-q1w2e3', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um homem de 35 anos, portador de HIV (em uso irregular de TARV), apresenta tosse produtiva há 3 semanas, febre vespertina e emagrecimento de 5 kg. Realizou o Teste Rápido Molecular para Tuberculose (TRM-TB/GeneXpert) que detectou Mycobacterium tuberculosis, porém com resistência à Rifampicina. Qual a conduta imediata mais adequada segundo as recomendações do Ministério da Saúde do Brasil?', '[{"id":"a","text":"Iniciar o esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) por 6 meses."},{"id":"b","text":"Solicitar cultura com teste de sensibilidade (TS) e iniciar esquema para TB resistente (ex: Bedaquilina, Delamanida) conforme protocolo de referência."},{"id":"c","text":"Aguardar o resultado da baciloscopia (BAAR) antes de qualquer intervenção."},{"id":"d","text":"Iniciar apenas Isoniazida e Etambutol por 12 meses."},{"id":"e","text":"Repetir o TRM-TB em outro laboratório para confirmação da resistência."}]', 'b', 'O TRM-TB (GeneXpert) é a ferramenta de escolha para diagnóstico rápido. Quando detectada resistência à Rifampicina, o paciente deve ser classificado como TB-RR (Tuberculose Resistente à Rifampicina) e encaminhado imediatamente para unidade de referência para início de esquema especial, sendo mandatória a realização de cultura e teste de sensibilidade completo para guiar a terapia.', '{"a":"A Rifampicina não pode ser usada se houver resistência detectada; isso levaria ao fracasso terapêutico.","b":"Correta. Define o manejo correto da resistência primária detectada pelo GeneXpert.","c":"Não se deve atrasar o tratamento; o GeneXpert já confirmou a doença e a resistência.","d":"Esquema insuficiente e fora dos protocolos atuais para resistência.","e":"O TRM-TB tem alta especificidade para detecção de mutações do gene rpoB; o resultado deve ser aceito e o tratamento adequado iniciado."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_q1w2e3', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB-RR","GeneXpert","HIV/TB"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-q1w2e3', 'approved', 0
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-q1w2e3');

    -- Q2
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-r4t5y6', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente de 45 anos, etilista crônico, em tratamento para Tuberculose pulmonar há 2 meses (Fase de Manutenção). Há 1 semana, passou a apresentar dor abdominal em hipocôndrio direito, náuseas e icterícia (2+/4+). Exames laboratoriais revelam AST (TGO) 400 U/L e ALT (TGP) 350 U/L (valores de referência < 40 U/L). Sobre a hepatotoxicidade induzida pelas drogas do esquema RIPE, qual droga é a principal suspeita nesse cenário e qual a conduta em relação ao tratamento?', '[{"id":"a","text":"Etambutol; manter tratamento e apenas observar."},{"id":"b","text":"Pirazinamida; suspender todas as drogas e reintroduzir sequencialmente após normalização das enzimas."},{"id":"c","text":"Isoniazida; suspender apenas a Isoniazida e manter as demais."},{"id":"d","text":"Rifampicina; trocar por Estreptomicina imediatamente."},{"id":"e","text":"Pirazinamida; reduzir a dose pela metade e monitorar semanalmente."}]', 'b', 'Tanto Pirazinamida, Isoniazida quanto Rifampicina são hepatotóxicas, sendo a Pirazinamida frequentemente a mais agressiva. Em caso de elevação de transaminases > 3x o limite superior do normal com sintomas, ou > 5x sem sintomas, a conduta é suspender todo o esquema RIPE. Após a melhora clínica e laboratorial (AST/ALT < 2x normal), as drogas devem ser reintroduzidas uma a uma, geralmente na ordem: R + E, seguido por I e, por último, P.', '{"a":"O Etambutol é a droga menos hepatotóxica do esquema.","b":"Correta. Define a droga mais tóxica e o protocolo de manejo de efeitos colaterais graves.","c":"Protocolo brasileiro exige suspensão total temporária de todas as drogas do RIPE.","d":"A Rifampicina causa mais icterícia (colestase) do que necrose hepatocelular, mas a conduta é suspensiva.","e":"Não se fraciona doses em caso de hepatite medicamentosa; a suspensão deve ser total."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_r4t5y6', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Hepatotoxicidade","Efeitos Colaterais","RIPE"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-r4t5y6', 'approved', 1
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-r4t5y6');

    -- Q3
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-u7i8o9', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Uma criança de 4 anos é trazida para consulta pois o avô, que mora na mesma casa, acaba de ser diagnosticado com Tuberculose bacilífera (BAAR 3+). A criança é assintomática, apresenta cicatriz de BCG e seu exame físico é normal. O teste tuberculínico (PPD) foi realizado e revelou uma induração de 12 mm. O Raio-X de tórax é normal. Qual a conduta adequada para esta criança?', '[{"id":"a","text":"Iniciar tratamento para Tuberculose doença com esquema RIPE infantil."},{"id":"b","text":"Tratar Infecção Latente por Tuberculose (ILTB) com Isoniazida por 6 a 9 meses (ou Rifampicina por 4 meses)."},{"id":"c","text":"Apenas observar e repetir o PPD em 8 semanas."},{"id":"d","text":"Revacinar com BCG imediatamente."},{"id":"e","text":"Solicitar Tomografia de Tórax para excluir linfonodomegalias hilares."}]', 'b', 'Crianças contatos de casos bacilíferos com PPD >= 5mm e exames de imagem e clínicos normais têm diagnóstico de Infecção Latente (ILTB). O tratamento preventivo está indicado para reduzir o risco de progressão para formas graves da doença (como a meningogrifose ou miliar), sendo a Isoniazida a droga padrão no Brasil.', '{"a":"Sem sintomas ou alteração radiológica, não há critério para tratamento de doença ativa.","b":"Correta. Aborda a conduta em contatos pediátricos e profilaxia secundária.","c":"O PPD positivo já indica infecção; o atraso no tratamento da ILTB em crianças é perigoso.","d":"A BCG não é revacinada; ela protege contra formas graves, mas não impede a infecção.","e":"O RX normal em criança assintomática é suficiente para afastar doença ativa no rastreio de contato."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tbc_u7i8o9', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["ILTB","Pediatria","Controle de Contatos"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-u7i8o9', 'approved', 2
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-u7i8o9');

    -- Q4
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-a1s2d3', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual a principal alteração oftalmológica associada ao uso do Etambutol no tratamento da Tuberculose e como deve ser feito o monitoramento?', '[{"id":"a","text":"Catarata precoce; mapeamento de retina anual."},{"id":"b","text":"Neurite óptica retrobulbar (alteração da acuidade e visão de cores); avaliação oftalmológica basal e mensal."},{"id":"c","text":"Glaucoma de ângulo fechado; medida da pressão intraocular diária."},{"id":"d","text":"Descolamento de retina; evitar atividades físicas."},{"id":"e","text":"Xeroftalmia severa; uso de colírios lubrificantes."}]', 'b', 'O Etambutol pode causar neurite óptica tóxica, manifestada por redução da acuidade visual e discromatopsia (especialmente para o espectro verde-vermelho). É mais comum em doses altas ou em pacientes com insuficiência renal. O paciente deve ser alertado sobre os sintomas e avaliado se houver queixas.', '{"a":"O Etambutol não causa catarata.","b":"Correta. Identifica o efeito colateral ocular específico e o monitoramento clínico.","c":"Não causa glaucoma.","d":"Não há relação com descolamento de retina.","e":"N/A."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tbc_a1s2d3', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Etambutol","Efeitos Colaterais","Oftalmologia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-a1s2d3', 'approved', 3
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-a1s2d3');

    -- Q5
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-f4g5h6', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente de 28 anos, diagnósticado com TB pulmonar, inicia o esquema RIPE. Ele também é epiléptico e faz uso de Fenitoína e Fenobarbital. Após 15 dias de tratamento da TB, ele apresenta crises convulsivas generalizadas recorrentes. Qual a explicação farmacológica para este descontrole das crises?', '[{"id":"a","text":"A Isoniazida inibe o metabolismo da Fenitoína, causando intoxicação."},{"id":"b","text":"A Rifampicina é um potente indutor das enzimas do citocromo P450, reduzindo os níveis séricos dos anticonvulsivantes."},{"id":"c","text":"O Etambutol compete pelos receptores GABA no sistema nervoso central."},{"id":"d","text":"A Pirazinamida causa hipocalcemia, reduzindo o limiar convulsivo."},{"id":"e","text":"A Tuberculose meningea deve ser a causa, independentemente das medicações."}]', 'b', 'A Rifampicina é um indutor enzimático clássico. Ela aumenta o metabolismo de diversas drogas, incluindo anticonvulsivantes (Fenitoína, Fenobarbital), anticoagulantes orais, antirretrovirais e anticoncepcionais, exigindo ajuste de dose dessas medicações ou troca de métodos terapêuticos.', '{"a":"A Isoniazida pode inibir certas enzimas, mas o efeito predominante da Rifampicina como indutor costuma reduzir o nível das drogas citadas.","b":"Correta. Aborda a interação medicamentosa clássica de indução enzimática no tratamento da TB.","c":"N/A.","d":"A Pirazinamida causa hiperuricemia (gota), não hipocalcemia.","e":"Embora possível, a indução enzimática pela Rifampicina é a causa farmacológica direta para o desajuste do nível terapêutico das drogas que o paciente já usava."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_f4g5h6', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Rifampicina","Interações Medicamentosas","Convulsão"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-f4g5h6', 'approved', 4
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-f4g5h6');

    -- Q6
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-j7k8l9', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente em tratamento para TB osteoarticular. Qual deve ser o tempo total de tratamento segundo as diretrizes brasileiras?', '[{"id":"a","text":"6 meses (esquema padrão RIPE)."},{"id":"b","text":"12 meses (2 meses de RIPE + 10 meses de RI)."},{"id":"c","text":"18 meses com Estreptomicina associada."},{"id":"d","text":"24 meses com uso obrigatório de corticoides."},{"id":"e","text":"9 meses, sendo os 3 últimos apenas com Pirazinamida."}]', 'b', 'No Brasil, o tratamento da Tuberculose dura 6 meses para a maioria das formas (pulmonar e extrapulmonar). No entanto, para as formas do Sistema Nervoso Central (meningoencefalite) e formas Osteoarticulares, o tempo é estendido para 12 meses (2 meses de RIPE seguido de 10 meses de RI).', '{"a":"Tempo insuficiente para as formas ósseas.","b":"Correta. Define a exceção temporal do tratamento para formas extrapulmonares específicas.","c":"Estreptomicina não é mais usada de rotina no esquema de primeira linha.","d":"Tempo excessivo.","e":"Esquema incorreto."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tbc_j7k8l9', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Tempo de Tratamento","TB Osteoarticular","Variações de Esquema"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-j7k8l9', 'approved', 5
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-j7k8l9');

    -- Q7
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-z1x2c3', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente apresentando derrame pleural unilateral à direita, com exsudato linfocítico, níveis de glicose baixos e ADA (Adenosina deaminase) de 75 U/L. Qual a principal hipótese diagnóstica e qual o exame padrão-ouro para confirmação?', '[{"id":"a","text":"Parapneumônico; cultura do líquido pleural."},{"id":"b","text":"Tuberculose Pleural; biópsia de pleura com fragmento para cultura e histopatológico (granuloma com necrose caseosa)."},{"id":"c","text":"Neoplasia (mesotelioma); citologia oncótica."},{"id":"d","text":"Lúpus; pesquisa de células LE no líquido."},{"id":"e","text":"Insuficiência cardíaca; ecocardiograma."}]', 'b', 'ADA elevado (> 40 U/L) em líquido pleural exsudativo com predomínio de linfócitos sugere fortemente TB Pleural em áreas endêmicas. A baciloscopia do líquido é raramente positiva (paucibacilar). O diagnóstico definitivo é feito pela biópsia de pleura (padrão-ouro), que mostra granulomas e/ou crescimento do bacilo na cultura do tecido.', '{"a":"O derrame parapneumônico cursa com predomínio de polimorfonucleares (neutrófilos).","b":"Correta. Identifica a semiologia do líquido pleural e o método confirmatório.","c":"A ADA estaria baixa e a citopatologia seria a chave.","d":"N/A.","e":"IC causa transudato bilateral com ADA baixo."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_z1x2c3', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Pleural","Líquido Pleural","ADA"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-z1x2c3', 'approved', 6
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-z1x2c3');

    -- Q8
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-v4b5n6', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Sobre a vacina BCG (Bacilo Calmette-Guérin), é correto afirmar:', '[{"id":"a","text":"Evita a infecção pelo bacilo da TB em 100% dos casos."},{"id":"b","text":"Protege prioritariamente crianças contra as formas graves da doença, como a TB Miliar e Meníngea."},{"id":"c","text":"Deve ser aplicada em adultos saudáveis que viajam para o exterior."},{"id":"d","text":"É uma vacina de vírus vivos atenuados."},{"id":"e","text":"A ausência de cicatriz vacinal após 6 meses exige obrigatoriamente a revacinação."}]', 'b', 'A vacina BCG é composta por bactérias vivas atenuadas (Mycobacterium bovis). Sua principal função é prevenir a disseminação hematogênica do bacilo logo após a primoinfecção em crianças, protegendo contra as formas disseminadas (miliar) e neurológicas.', '{"a":"A proteção contra infecção é variável e incompleta.","b":"Correta. Aborda a indicação real e o benefício epidemiológico da BCG.","c":"Não há indicação de rotina para adultos, exceto contatos de hanseníase em certas normas.","d":"É de bactérias vivas, não vírus.","e":"A norma atual do Ministério da Saúde descontinuou a revacinação de crianças sem cicatriz vacinal."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tbc_v4b5n6', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["BCG","Imunização","Saúde Pública"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-v4b5n6', 'approved', 7
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-v4b5n6');

    -- Q9
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-m7n8b9', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual o regime de tratamento recomendado para pacientes com TB pulmonar que também possuem doença hepática crônica estável (Child-Pugh A)?', '[{"id":"a","text":"Substituir Rifampicina por Amicacina."},{"id":"b","text":"Esquema RIPE padrão, com monitoramento rigoroso das enzimas hepáticas (quinzenal)."},{"id":"c","text":"Usar apenas Etambutol e Levofloxacino por 18 meses."},{"id":"d","text":"Tratamento cirúrgico da lesão pulmonar para evitar drogas."},{"id":"e","text":"Iniciar Estreptomicina isoladamente."}]', 'b', 'Em casos de hepatopatia compensada, o esquema RIPE (Rifampicina, Isoniazida, Pirazinamida e Etambutol) pode ser tentado sob vigilância estreita. Caso haja piora ou se a hepatopatia for avançada (Child B ou C), o esquema deve ser modificado para regimes menos hepatotóxicos (ex: RE + Levofloxacino).', '{"a":"Não é a primeira conduta em hepatopatias leves.","b":"Correta. Define o manejo da TB em populações especiais (hepatopatas).","c":"Este é um esquema de reserva para hepatopatia grave.","d":"N/A.","e":"Ineficaz isoladamente."}',
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'tbc_m7n8b9', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Hepatopatia","Estratégia Terapêutica","Monitoramento"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-m7n8b9', 'approved', 8
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-m7n8b9');

    -- Q10
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-q1w2e3_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Um paciente em uso de RIPE queixa-se de dores articulares nas mãos e pés, além de ''crise de gota''. Qual droga do esquema é a causadora desse sintoma e qual o mecanismo?', '[{"id":"a","text":"Rifampicina; aumento da produção de ácido úrico."},{"id":"b","text":"Pirazinamida; inibição da secreção renal de ácido úrico."},{"id":"c","text":"Isoniazida; destruição de cristais articulares."},{"id":"d","text":"Etambutol; causa artrite autoimune."},{"id":"e","text":"Pirazinamida; causa vasculite de pequenos vasos."}]', 'b', 'A Pirazinamida e seus metabólitos competem com o ácido úrico pelos transportadores de secreção no túbulo renal, levando à hiperuricemia. Muitos pacientes apresentam artralgias leves, mas crises de gota franca podem ocorrer, exigindo manejo com anti-inflamatórios ou, raramente, suspensão da droga.', '{"a":"Rifampicina não altera ácido úrico.","b":"Correta. Identifica o efeito colateral osteoarticular específico e o mecanismo fisiopatológico.","c":"N/A.","d":"O Etambutol pode causar hiperuricemia secundária, mas o efeito é muito mais pronunciado com a Pirazinamida.","e":"Não causa vasculite."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_q1w2e3_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Pirazinamida","Hiperuricemia","Gota"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-q1w2e3_2', 'approved', 9
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-q1w2e3_2');

    -- Q11
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-r4t5y6_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Paciente com diagnóstico de TB pulmonar BAAR positivo iniciou tratamento há 4 meses. Ele retorna com tosse recorrente e nova baciloscopia positiva. Qual a definição epidemiológica prioritária e o primeiro passo no manejo?', '[{"id":"a","text":"Abandono; reiniciar o tratamento do zero."},{"id":"b","text":"Falência; solicitar Teste de Sensibilidade (TS) e avaliar resistência."},{"id":"c","text":"Cura; dar alta."},{"id":"d","text":"Recidiva; trocar Etambutol por Cirpofloxacino."},{"id":"e","text":"Suspeita de erro laboratorial; não fazer nada."}]', 'b', 'A falência ao tratamento é definida pela persistência ou reaparecimento de positividade na baciloscopia ou cultura no 4º mês ou após, na presença de adesão adequada. Isso exige investigação imediata de resistência (Teste de Sensibilidade) e troca do regime terapêutico para esquemas de segunda linha.', '{"a":"Abandono é quando o paciente para de tomar por > 30 dias.","b":"Correta. Define o conceito de falência terapêutica e a necessidade de TS.","c":"Claramente não houve cura.","d":"Recidiva ocorre após a alta por cura; aqui o paciente ainda está em curso de tratamento.","e":"N/A."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_r4t5y6_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Falência","Gestão do Tratamento","Resistência"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-r4t5y6_2', 'approved', 10
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-r4t5y6_2');

    -- Q12
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-u7i8o9_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Para evitar a neuropatia periférica induzida pela Isoniazida, qual suplementação vitamínica deve ser oferecida a pacientes de risco (grávidas, idosos, desnutridos)?', '[{"id":"a","text":"Vitamina B12."},{"id":"b","text":"Vitamina B6 (Piridoxina)."},{"id":"c","text":"Vitamina C."},{"id":"d","text":"Vitamina D."},{"id":"e","text":"Vitamina A."}]', 'b', 'A Isoniazida interfere no metabolismo da Piridoxina (B6), levando à sua deficiência. Isso pode causar polineuropatia sensitiva periférica. A suplementação com B6 (40-50mg/dia) previne essa complicação nos grupos de risco.', '{"a":"A deficiência de B12 causa anemia megaloblástica e degeneração combinada da medula.","b":"Correta. Identifica a profilaxia de efeito adverso neurológico no tratamento da TB.","c":"N/A.","d":"N/A.","e":"N/A."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tbc_u7i8o9_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Isoniazida","Vitamina B6","Neurotoxicidade"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-u7i8o9_2', 'approved', 11
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-u7i8o9_2');

    -- Q13
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-a1s2d3_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose Miliar caracteriza-se radiologicamente por:', '[{"id":"a","text":"Cavitação única no lobo superior."},{"id":"b","text":"Infiltrado micronodular difuso bilateral (aspecto de grãos de milho)."},{"id":"c","text":"Alargamento do mediastino apenas."},{"id":"d","text":"Consolidação lobar com broncograma aéreo."},{"id":"e","text":"Derrame pleural maciço bilateral."}]', 'b', 'A forma miliar é resultado da disseminação hematogênica do bacilo. O aspecto radiológico é clássico: pequenos nódulos (1-3mm) distribuídos uniformemente em ambos os pulmões.', '{"a":"Comum na TB pós-primária (secundária).","b":"Correta. Define o padrão radiológico da forma disseminada.","c":"Sugere TB primária linfonodal.","d":"Padrão de pneumonia bacteriana típica.","e":"Incomum na forma militar pura."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tbc_a1s2d3_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Miliar","Radiologia","Disseminação"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-a1s2d3_2', 'approved', 12
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-a1s2d3_2');

    -- Q14
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-f4g5h6_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A ''Síndrome de Reconstituição Imune'' (IRIS) na coinfecção TB-HIV é caracterizada por:', '[{"id":"a","text":"Agravamento paradoxal dos sintomas da TB logo após o início da TARV, devido à recuperação da imunidade celular."},{"id":"b","text":"Morte súbita do paciente por choque anafilático à Rifampicina."},{"id":"c","text":"Cura espontânea da TB sem necessidade de RIPE."},{"id":"d","text":"Recuperação dos linfócitos CD4 para níveis acima de 1000 de forma súbita."},{"id":"e","text":"Desaparecimento das cavitações pulmonares em 24 horas."}]', 'a', 'A IRIS ocorre quando o sistema imune recuperado pela TARV passa a responder vigorosamente aos antígenos do Mycobacterium tuberculosis que já estavam presentes. Isso gera uma resposta inflamatória intensa, com piora clínica, febre e linfonodomegalias, mesmo com o tratamento da TB funcionando.', '{"a":"Correta. Define o fenômeno imunológico complexo da coinfecção.","b":"Não é um fenômeno alérgico.","c":"A TB nunca cura espontaneamente de forma confiável.","d":"A subida do CD4 é gradual, o que muda é a função e resposta periférica.","e":"Impossível fisiologicamente."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_f4g5h6_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["IRIS","TB-HIV","Imunologia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-f4g5h6_2', 'approved', 13
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-f4g5h6_2');

    -- Q15
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-j7k8l9_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual a principal limitação do Teste Tuberculínico (PPD) em pacientes portadores de HIV avançado?', '[{"id":"a","text":"Alto custo de realização."},{"id":"b","text":"Anergia cutânea (falsos-negativos) devido à depleção de linfócitos T CD4+."},{"id":"c","text":"Risco de transmissão da TB pelo teste."},{"id":"d","text":"Necessidade de incubação por 30 dias."},{"id":"e","text":"Interferência obrigatória com o uso de antirretrovirais."}]', 'b', 'O PPD depende de uma resposta de hipersensibilidade tardia (Tipo IV) mediada por linfócitos T. Em pacientes com imunodeficiência severa (geralmente CD4 < 200), o corpo não consegue montar a resposta inflamatória local, resultando em leitura zero mesmo que o paciente esteja infectado (anergia).', '{"a":"O custo é baixo.","b":"Correta. Aborda a falha diagnóstica imunológica no paciente imunodeprimido.","c":"O PPD usa derivados proteicos purificados, não o bacilo vivo.","d":"A leitura é em 48-72h.","e":"N/A."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_j7k8l9_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["PPD","Anergia","HIV"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-j7k8l9_2', 'approved', 14
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-j7k8l9_2');

    -- Q16
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-z1x2c3_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'O IGRA (Interferon-Gamma Release Assay) é um exame de sangue para diagnóstico de infecção latente. Qual sua principal vantagem sobre o PPD?', '[{"id":"a","text":"Detecta TB ativa em 100% dos casos."},{"id":"b","text":"Não sofre interferência da vacinação prévia com BCG."},{"id":"c","text":"É muito mais barato que o PPD."},{"id":"d","text":"Dispensa a necessidade de coleta de sangue."},{"id":"e","text":"Pode ser lido a olho nu pelo próprio paciente."}]', 'b', 'O IGRA utiliza antígenos específicos do complexo M. tuberculosis que não estão presentes na cepa vacinal da BCG. Logo, evita o falso-positivo que o PPD pode apresentar em indivíduos vacinados.', '{"a":"Nenhum teste de imunidade celular diferencia com segurança TB ativa de latente.","b":"Correta. Identifica o benefício técnico do IGRA no rastreio da ILTB.","c":"É significativamente mais caro.","d":"É um teste in vitro (sangue).","e":"Exige processamento em laboratório especializado."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_z1x2c3_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["IGRA","BCG","ILTB"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-z1x2c3_2', 'approved', 15
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-z1x2c3_2');

    -- Q17
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-v4b5n6_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual achado é mais sugestivo de Tuberculose Ganglionar periférica?', '[{"id":"a","text":"Gânglios pétreos e aderidos a planos profundos em cadeia axilar."},{"id":"b","text":"Linfonodomegalia cervical subaguda, indolor, com tendência à coalescência e fistulização (escrófula)."},{"id":"c","text":"Gânglio sentinela de Virchow positivo."},{"id":"d","text":"Adenopatia inguinal supurativa após relação sexual."},{"id":"e","text":"Gânglios epitrocleares bilaterais."}]', 'b', 'A TB Ganglionar (forma extrapulmonar mais comum em HIV negativos) manifesta-se tipicamente na cadeia cervical. Os linfonodos aumentam, tornam-se aderidos entre si (coalescência) e podem drenar material caseoso através da pele (fístula), quadro conhecido como escrofulodermia.', '{"a":"Sugere malignidade (metástases).","b":"Correta. Descreve a semiologia clássica da ''escrófula'' tuberculosa.","c":"Sugere câncer gástrico.","d":"Sugere Linfogranuloma venéreo ou cancro mole.","e":"Sugere sífilis secundária ou sarcoidose."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tbc_v4b5n6_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Ganglionar","Escrófula","Semiologia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-v4b5n6_2', 'approved', 16
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-v4b5n6_2');

    -- Q18
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-m7n8b9_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Em pacientes gestantes diagnosticadas com TB, qual a conduta em relação ao tratamento e amamentação?', '[{"id":"a","text":"Aborto terapêutico; as drogas são altamente teratogênicas."},{"id":"b","text":"Manter o esquema RIPE padrão; amamentação permitida (usar máscara se a mãe for bacilífera)."},{"id":"c","text":"Apenas Etambutol até o parto."},{"id":"d","text":"Suspender tratamento no primeiro trimestre e tratar apenas no pós-parto."},{"id":"e","text":"Tratar a mãe e realizar BCG no recém-nascido no primeiro dia, independentemente do contato."}]', 'b', 'A Tuberculose é mais perigosa para o feto do que as drogas do esquema básico. O RIPE é seguro na gestação. A amamentação deve ser estimulada; se a mãe ainda for contagiosa, deve usar máscara cirúrgica ao amamentar e manter higiene rigorosa. O RN deve receber quimioprofilaxia primária e não ser vacinado com BCG até que se afaste infecção.', '{"a":"TB não é indicação de aborto.","b":"Correta. Define o manejo seguro na gestante e lactante.","c":"Esquema ineficaz.","d":"Risco de morte materna e fetal por progressão da doença.","e":"O RN de mãe bacilífera não deve receber BCG de imediato; primeiro faz-se quimioprofilaxia."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_m7n8b9_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Gestação","Lactação","RIPE"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-m7n8b9_2', 'approved', 17
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-m7n8b9_2');

    -- Q19
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-q7r92m_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'Qual exame é mandatório para todos os pacientes com diagnóstico de Tuberculose ativa no momento do diagnóstico inicial?', '[{"id":"a","text":"Tomografia de crânio."},{"id":"b","text":"Sorologia para HIV."},{"id":"c","text":"Colonoscopia."},{"id":"d","text":"Ecografia abdominal."},{"id":"e","text":"Teste ergométrico."}]', 'b', 'A coinfecção TB-HIV é muito frequente e altera drasticamente o prognóstico e o manejo do paciente. Por isso, a testagem para HIV é recomendada universalmente para todos os casos novos de tuberculose.', '{"a":"Apenas se houver sintomas neurológicos.","b":"Correta. Identifica a recomendação de saúde pública para coinfecção.","c":"N/A.","d":"Apenas se suspeita de TB abdominal.","e":"N/A."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tbc_q7r92m_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["Triagem","HIV/TB","Epidemiologia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-q7r92m_2', 'approved', 18
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-q7r92m_2');

    -- Q20
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-TBC-k8m10p_2', 'medicina', 'clinica-medica', 'infectologia', 'infectologia', 'tuberculose', 'tuberculose',
        'A Tuberculose de laringe é considerada:', '[{"id":"a","text":"Uma forma paucibacilar de baixo contágio."},{"id":"b","text":"Uma das formas mais contagiosas da doença, frequentemente associada à TB pulmonar avançada."},{"id":"c","text":"Exclusiva de pacientes pediátricos."},{"id":"d","text":"Indicação de isolamento hospitalar por 6 meses."},{"id":"e","text":"Tratada apenas com cirurgia de cordas vocais."}]', 'b', 'A TB laríngea é altamente infectante devido à grande carga bacilar e à facilidade de aerolização pelo contato vocal. Geralmente secundária à eliminação de escarro bacilífero dos pulmões.', '{"a":"Pelo contrário, é altamente contagiosa.","b":"Correta. Reconhece o potencial de infectividade da forma laríngea.","c":"Ocorre em adultos.","d":"Isolamento segue os mesmos critérios da TB pulmonar (geralmente 15 dias após início de RIPE eficaz).","e":"Tratamento é medicamentoso (RIPE)."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tbc_k8m10p_2', '{"package_id":"44bb9f70-13d0-42e0-808e-8ded933cea6a","tags":["TB Laríngea","Infectividade","Transmissão"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-TBC-k8m10p_2', 'approved', 19
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-TBC-k8m10p_2');

END $$;