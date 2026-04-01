DO $$
DECLARE
    p_id UUID := 'f90b96f6-66b4-47e6-a80f-e0cc70c17f71';
BEGIN
    -- Q1
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-t1r2o3', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Uma mulher de 32 anos apresenta-se com palpitações, intolerância ao calor, perda de peso de 6 kg em 2 meses e proptose ocular bilateral. Ao exame físico, apresenta bócio difuso e indolor, com sopro audível à ausculta da glândula. Frequentemente, esses pacientes podem apresentar uma dermopatia característica. Qual o diagnóstico mais provável e qual o anticorpo patognomônico associado?', '[{"id":"a","text":"Doença de Hashimoto; Anti-TPO."},{"id":"b","text":"Doença de Graves; TRAB (Anticorpo antirreceptor de TSH)."},{"id":"c","text":"Tiroidite de Quervain; Anti-Tireoglobulina."},{"id":"d","text":"Adenoma Tóxico; Nenhum anticorpo."},{"id":"e","text":"Carcinoma Papilífero; Calcitonina."}]', 'b', 'A tríade de bócio difuso (com hipervascularização - sopro), oftalmopatia (proptose) e tireotoxicose é clássica da Doença de Graves. O TRAB é o anticorpo estimulante que se liga ao receptor de TSH, mimetizando sua ação e causando hipertiroidismo.', '{"a":"Hashimoto causa hipotiroidismo primário.","b":"Correta. Identifica a patologia autoimune de hipertiroidismo e seu marcador laboratorial.","c":"Tiroidite subaguda (Quervain) causa dor cervical intensa e febre.","d":"Adenoma tóxico é um nódulo único hiperfuncional (Doença de Plummer), sem oftalmopatia.","e":"Calcitonina é marcador de carcinoma medular, não papilífero."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_t1r2o3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Graves","TRAB","Hipertiroidismo"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-t1r2o3', 'approved', 0
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-t1r2o3');

    -- Q2
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-h4s5o6', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Paciente de 50 anos com queixa de fadiga, constipação e lentidão de raciocínio. TSH de 12 mUI/L (VR: 0.4 - 4.5) e T4 livre de 0.6 ng/dL (VR: 0.8 - 1.8). Iniciada reposição com Levotiroxina 50 mcg/dia. Após quanto tempo deve ser solicitada a primeira reavaliação laboratorial do TSH para ajuste de dose?', '[{"id":"a","text":"7 dias."},{"id":"b","text":"15 dias."},{"id":"c","text":"6 a 8 semanas."},{"id":"d","text":"6 meses."},{"id":"e","text":"1 ano."}]', 'c', 'A meia-vida da levotiroxina é longa (cerca de 7 dias). O equilíbrio do eixo hipotálamo-hipófise-tireoide após alteração de dose leva tempo, sendo o intervalo de 6 a 8 semanas o padrão-ouro para monitoramento inicial e ajustes.', '{"a":"Período muito curto; o TSH ainda não terá estabilizado.","b":"Insuficiente para refletir o estado de equilíbrio.","c":"Correta. Aborda o manejo farmacocinético da levotiroxina.","d":"Muito tempo; o paciente pode permanecer em hipotiroidismo ou entrar em iatrogenia.","e":"N/A."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_h4s5o6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Levotiroxina","Monitoramento","Hipotiroidismo"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-h4s5o6', 'approved', 1
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-h4s5o6');

    -- Q3
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-n7u8d9', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Um nódulo tireoidiano de 1.5 cm é submetido à Punção Aspirativa por Agulha Fina (PAAF). O resultado citopatológico é classificado como Bethesda IV (Neoplasia Folicular ou Suspeito de Neoplasia Folicular). De acordo com o consenso atual, qual a conduta inicial recomendada?', '[{"id":"a","text":"Apenas observação ultrassonográfica a cada 6 meses."},{"id":"b","text":"Tratamento com iodo radioativo."},{"id":"c","text":"Cirurgia (Lobectomia ou Tireoidectomia total), dado que a PAAF não diferencia adenoma folicular de carcinoma folicular."},{"id":"d","text":"Repetir a PAAF imediatamente."},{"id":"e","text":"Iniciar levotiroxina em dose supressiva."}]', 'c', 'A classificação Bethesda IV representa um desafio diagnóstico, pois a diferenciação entre benigno (adenoma) e maligno (carcinoma folicular) exige a análise da cápsula e invasão vascular, o que só é possível na peça histológica cirúrgica. Por isso, a indicação é cirúrgica.', '{"a":"Risco de malignidade em Bethesda IV é de 15-30%, impedindo a observação pura.","b":"O iodo é adjuvante no pós-operatório de câncer, não diagnóstico.","c":"Correta. Aborda a limitação citológica do sistema Bethesda.","d":"Repetir a PAAF raramente muda a classificação de um nódulo folicular.","e":"A supressão do TSH não é mais recomendada para reduzir nódulos."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_n7u8d9', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Bethesda","Nódulo de Tireoide","PAAF"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-n7u8d9', 'approved', 2
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-n7u8d9');

    -- Q4
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-c1r2m3', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'O Carcinoma Medular de Tireoide (CMT) deriva de quais células e qual o principal marcador tumoral utilizado no seu acompanhamento?', '[{"id":"a","text":"Células foliculares; Tireoglobulina."},{"id":"b","text":"Células parafoliculares (Células C); Calcitonina."},{"id":"c","text":"Células de Hürthle; Anti-TPO."},{"id":"d","text":"Linfócitos; LDH."},{"id":"e","text":"Células foliculares; TSH."}]', 'b', 'O CMT é um tumor neuroendócrino das células C, produtoras de calcitonia. O antígeno carcinoembrionário (CEA) também pode estar elevado.', '{"a":"A tireoglobulina é marcador para tumores diferenciados (papilífero e folicular).","b":"Correta. Identifica a origem embriológica e o marcador específico do CMT.","c":"N/A.","d":"Refere-se a linfoma.","e":"TSH é hormônio hipofisário."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_c1r2m3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Carcinoma Medular","Calcitonina","Marcadores Tumorais"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-c1r2m3', 'approved', 3
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-c1r2m3');

    -- Q5
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-s4t5o6', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Uma gestante no primeiro trimestre apresenta TSH de 0.1 mUI/L e T4 livre normal alto. Ela é assintomática e não tem bócio. Qual a conduta correta e a justificativa fisiológica?', '[{"id":"a","text":"Iniciar Propiltiouracil imediatamente para tratar Graves gestacional."},{"id":"b","text":"Apenas observar (Hipertiroidismo Gestacional Transitório); o aumento do hCG mimetiza a ação do TSH na tireoide."},{"id":"c","text":"Realizar cintilografia de tireoide imediatamente."},{"id":"d","text":"Interromper a gestação por risco de tempestade tireoidiana."},{"id":"e","text":"Iniciar levotiroxina, pois o TSH está baixo."}]', 'b', 'No 1º trimestre, os níveis de hCG (gonadotrofina coriônica humana) atingem o pico. Como o hCG compartilha a subunidade alfa com o TSH e tem semelhança na subunidade beta, ele estimula fracamente o receptor de TSH, causando queda fisiológica do TSH.', '{"a":"Sem sintomas ou anticorpos positivos, é iatrogenia tratar.","b":"Correta. Identifica a alteração fisiológica hormonal da gravidez.","c":"Cintilografia com iodo radioativo é contraindicada na gestação.","d":"N/A.","e":"Levotiroxina baixaria ainda mais o TSH."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_s4t5o6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Gestação","hCG","TSH"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-s4t5o6', 'approved', 4
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-s4t5o6');

    -- Q6
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-t7o8x9', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Sobre o tratamento da Tempestade Tireoidiana (Crise Tireotóxica), qual medicação deve ser administrada 1 hora APÓS o início das drogas antitiroidianas (como o PTU) e por que?', '[{"id":"a","text":"Betabloqueadores; para evitar bradicardia."},{"id":"b","text":"Solução de Iodo (Lugol); para bloquear a liberação de hormônios pré-formados (Efeito Wolff-Chaikoff), evitando que o iodo seja usado como substrato para nova síntese se dado antes do bloqueio enzimático."},{"id":"c","text":"Corticoides; para tratar insuficiência adrenal associada."},{"id":"d","text":"Aspirina; para reduzir a febre alta."},{"id":"e","text":"Plasmferese; conduta de primeira linha."}]', 'b', 'O iodo inorgânico (Lugol) inibe agudamente a liberação de T3/T4. No entanto, se administrado antes das tionamidas (PTU/Metimazol), ele pode ser captado pela glândula e servir de substrato para síntese excessiva, agravando o quadro. Por isso, aguarda-se o bloqueio da síntese pela tionamida.', '{"a":"Betabloqueadores são dados imediatamente para controle adrenérgico.","b":"Correta. Aborda a sequência terapêutica rigorosa da emergência endocrinológica.","c":"Corticoides ajudam a inibir a conversão periférica de T4 em T3, mas o tempo do Lugol é o detalhe técnico crítico.","d":"Aspirina é contraindicada na tempestade tireoidiana pois desloca o T4 das proteínas carreadoras, aumentando a fração livre.","e":"Plasmferese é medida heróica em casos refratários."}',
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_t7o8x9', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Tempestade Tireoidiana","Efeito Wolff-Chaikoff","Emergência"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-t7o8x9', 'approved', 5
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-t7o8x9');

    -- Q7
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-m1y2o3', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'O Mixedema (edema sem cacifo em região pré-tibial) é uma manifestação clássica de qual patologia?', '[{"id":"a","text":"Insuficiência Cardíaca Direita."},{"id":"b","text":"Hipotiroidismo grave; decorrente do acúmulo de glicosaminoglicanos na derme."},{"id":"c","text":"Síndrome Nefrótica."},{"id":"d","text":"Insuficiência Hepática."},{"id":"e","text":"Reação alérgica aguda."}]', 'b', 'O termo ''mixedema'' refere-se ao depósito de mucopolissacarídeos na pele, típico do hipotiroidismo descompensado. Nota: O mixedema pré-tibial específico também pode ocorrer na Doença de Graves (dermopatia infiltrativa).', '{"a":"Causa edema com cacifo.","b":"Correta. Identifica a base fisiopatológica do edema do hipotiroidismo.","c":"Causa edema generalizado (anasarca) com cacifo.","d":"N/A.","e":"Causa angioedema."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_m1y2o3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Mixedema","Fisiopatologia","Pele"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-m1y2o3', 'approved', 6
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-m1y2o3');

    -- Q8
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-p4l5u6', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Qual a principal causa de hipotiroidismo em áreas iodo-suficientes (como o Brasil urbano)?', '[{"id":"a","text":"Carência nutricional de iodo."},{"id":"b","text":"Tiroidite de Hashimoto (Autoimune)."},{"id":"c","text":"Uso excessivo de lítio."},{"id":"d","text":"Radioterapia cervical prévia."},{"id":"e","text":"Pós-operatório de bócio colmoide."}]', 'b', 'Em locais onde o sal é iodado, a causa mais comum de hipotiroidismo é a destruição linfocítica crônica mediada por autoanticorpos (Hashimoto).', '{"a":"Causa importante em países subdesenvolvidos ou regiões isoladas.","b":"Correta. Define a epidemiologia principal da especialidade.","c":"Causa hipotiroidismo medicamentoso, mas é menos frequente na população geral.","d":"Causa iatrogênica importante em sobreviventes de câncer.","e":"N/A."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_p4l5u6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Epidemiologia","Hashimoto","Hipotiroidismo"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-p4l5u6', 'approved', 7
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-p4l5u6');

    -- Q9
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-a7r8t9', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Um paciente com diagnóstico de tiroidite subaguda de Quervain (pós-viral) apresenta-se na fase inicial. Qual o padrão esperado na Cintilografia de Tireoide com Iodo-131?', '[{"id":"a","text":"Captação difusa e aumentada."},{"id":"b","text":"Captação extremamente baixa ou zero (glândula ''branca''), apesar dos níveis altos de T3/T4 no sangue."},{"id":"c","text":"Nódulo ''quente'' único."},{"id":"d","text":"Múltiplas áreas de captação aumentada (Bócio multinodular)."},{"id":"e","text":"Captação normal."}]', 'b', 'Nas tiroidites, a glândula está inflamada e ''vaza'' o hormônio pré-formado para a circulação. No entanto, as células foliculares estão danificadas e não conseguem captar iodo novo, resultando em captação baixa (ao contrário do Graves, onde a síntese está aumentada e a captação é alta).', '{"a":"Padrao de Graves.","b":"Correta. Diferencia tiroidite de hipertiroidismo verdadeiro pela cintilografia.","c":"Padrao de adenoma tóxico.","d":"Padrao de doença de Plummer.","e":"N/A."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_a7r8t9', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Quervain","Cintilografia","Tiroidite"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-a7r8t9', 'approved', 8
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-a7r8t9');

    -- Q10
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-k1m2o3', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'O uso de Amiodarona (antiarrítmico rico em iodo) pode induzir tanto hipo quanto hipertiroidismo. Como é chamado o fenômeno de hipertiroidismo induzido pelo excesso de iodo como substrato?', '[{"id":"a","text":"Fenômeno de Jod-Basedow."},{"id":"b","text":"Efeito Wolff-Chaikoff."},{"id":"c","text":"Síndrome de Refetoff."},{"id":"d","text":"Doença de Cushing."},{"id":"e","text":"Síndrome de Schmidt."}]', 'a', 'Jod-Basedow é a indução de hipertiroidismo pelo iodo. Wolff-Chaikoff é o bloqueio da glândula pelo excesso de iodo (podendo causar hipo).', '{"a":"Correta. Identifica o epônimo específico para iodo-indução de tirotoxicose.","b":"Efeito oposto (bloqueio).","c":"Refetoff é a resistência ao hormônio tireoidiano.","d":"Relacionado ao cortisol.","e":"Síndrome poliglandular autoimune tipo 2."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_k1m2o3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Amiodarona","Jod-Basedow","Farmacologia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-k1m2o3', 'approved', 9
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-k1m2o3');

    -- Q11
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-n4o5d6', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Qual dos seguintes achados ultrassonográficos em um nódulo tireoidiano mais sugere MALIGNIDADE?', '[{"id":"a","text":"Nódulo isoecoico e puramente cístico."},{"id":"b","text":"Nódulo mais alto do que largo, hipoecoico e com microcalcificações."},{"id":"c","text":"Nódulo de contornos regulares e halo hipoecoico periférico completo."},{"id":"d","text":"Presença de artefato em cauda de cometa."},{"id":"e","text":"Ausência de vascularização ao Doppler central."}]', 'b', 'Microcalcificações (corpos psamomatosos), contornos irregulares, textura hipoecoica e formato ''taller than wide'' (mais alto que largo) são marcadores de alto risco no sistema TI-RADS.', '{"a":"Cistos puros são virtualmente sempre benignos.","b":"Correta. Identifica os sinais radiológicos de alarme para câncer de tireoide.","c":"Halo completo sugere benignidade (adenoma).","d":"Sugerem coloide denso (benigno).","e":"Vascularização central aumentada (Doppler tipo III) preocupa mais."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_n4o5d6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["TI-RADS","Ultrassonografia","Malignidade"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-n4o5d6', 'approved', 10
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-n4o5d6');

    -- Q12
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-r7u8t9', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Um paciente operado por Carcinoma Papilífero de Tireoide (T3 N1 M0) realizou ablação com Iodo-131. No seguimento, o TSH está suprimido, mas a Tireoglobulina sérica começa a subir progressivamente. O que isso indica?', '[{"id":"a","text":"Sucesso da terapia; a tireoglobulina sobe quando o tumor morre."},{"id":"b","text":"Recorrência ou persistência de tecido tireoidiano (provavelmente tumoral)."},{"id":"c","text":"Necessidade de reduzir a dose de levotiroxina."},{"id":"d","text":"Desenvolvimento de anticorpos anti-TPO."},{"id":"e","text":"Normalidade pós-cirúrgica."}]', 'b', 'A tireoglobulina é produzida apenas por células tireoidianas (normais ou neoplásicas diferenciadas). Após tireoidectomia total e ablação, ela deve ser indetectável. Sua elevação é marcador de recidiva local ou metástases.', '{"a":"Errado; ela deve cair.","b":"Correta. Define o papel da tireoglobulina como marcador de seguimento oncológico.","c":"N/A.","d":"N/A.","e":"N/A."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_r7u8t9', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Seguimento","Tireoglobulina","Oncologia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-r7u8t9', 'approved', 11
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-r7u8t9');

    -- Q13
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-h1i2p3', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Qual a conduta para um paciente com TSH de 7.5 mUI/L e T4 livre normal (VR TSH: 0.4-4.5) - Hipotiroidismo Subclínico - se ele tiver 75 anos e for assintomático?', '[{"id":"a","text":"Iniciar levotiroxina imediatamente na dose de 1.6 mcg/kg/dia."},{"id":"b","text":"Apenas observar e repetir em 6 meses; em idosos > 65-70 anos, o alvo do TSH é mais flexível e o tratamento do subclínico leve pode não trazer benefícios e causar arritmias."},{"id":"c","text":"Internação em UTI por risco de coma mixedematoso."},{"id":"d","text":"Realizar tireoidectomia profilática."},{"id":"e","text":"Solicitar RNM de Sela Túrcica."}]', 'b', 'No hipotiroidismo subclínico, tratamos obrigatoriamente se TSH > 10. Para níveis entre 4.5 e 10, tratamos se: gestantes, desejo de engravidar, anticorpos positivos ou sintomas exuberantes. No idoso frágil, o limiar para tratar é maior para evitar taquiarritmias e osteoporose iatrogênica.', '{"a":"Dose de reposição total é perigosa no idoso coronariopata.","b":"Correta. Aborda as nuances de tratamento baseadas em idade e evidência.","c":"Condição de TSH extremamente alto e disfunção multissistêmica.","d":"N/A.","e":"Indicado se hipotiroidismo secundário (central)."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_h1i2p3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Subclínico","Geriatria","TSH"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-h1i2p3', 'approved', 12
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-h1i2p3');

    -- Q14
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-c4a5l6', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'A principal complicação aguda pós-operatória da tireoidectomia total que gera parestesias em extremidades e sinal de Chvostek positivo é:', '[{"id":"a","text":"Paralisia de nervo laríngeo recorrente."},{"id":"b","text":"Hipocalcemia por hipoparatiroidismo definitivo ou transitório (lesão/isquemia das paratireoides)."},{"id":"c","text":"Crise tireotóxica induzida pela manipulação da glândula."},{"id":"d","text":"Hematoma sufocante de cervical."},{"id":"e","text":"Hipotiroidismo agudo."}]', 'b', 'O sinal de Chvostek (contração palpebral ao percutir o nervo facial) e Trousseau (espasmo carpal ao insuflar manguito) indicam hipocalcemia, decorrente do mau funcionamento das paratireoides pós-operatório.', '{"a":"Causaria rouquidão ou insuficiência respiratória (se bilateral).","b":"Correta. Identifica a complicação metabólica cirúrgica mais frequente.","c":"Possível, mas não causa parestesias e Chvostek.","d":"Causa abaulamento cervical e asfixia.","e":"Leva semanas para manifestar."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_c4a5l6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Pós-operatório","Paratireoides","Hipocalcemia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-c4a5l6', 'approved', 13
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-c4a5l6');

    -- Q15
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-l7u8g9', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'O ''Nódulo de Hotchkiss'' (nódulo tireoidiano que na verdade é um linfonodo delfiano ocupado) é sinal de:', '[{"id":"a","text":"Cura de Hashimoto."},{"id":"b","text":"Possível metástase de carcinoma papilífero."},{"id":"c","text":"Nódulo coloide benigno."},{"id":"d","text":"Tiroidite de De Quervain."},{"id":"e","text":"Normalidade em crianças."}]', 'b', 'O linfonodo pré-laríngeo (Delfiano) quando palpável e aumentado no contexto de nódulo tireoidiano sugere disseminação linfática de neoplasia maligna.', '{"a":"N/A.","b":"Correta. Aborda a semiologia linfonodal oncológica da região cervical.","c":"N/A.","d":"N/A.","e":"N/A."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_l7u8g9', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Linfonodo Delfiano","Oncologia","Semiologia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-l7u8g9', 'approved', 14
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-l7u8g9');

    -- Q16
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-i1o2d3', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Em pacientes com hipertiroidismo submetidos a tratamento com Iodo Radioativo (I-131), qual a complicação tardia MAIS comum e esperada?', '[{"id":"a","text":"Câncer de estômago induzido pela radiação."},{"id":"b","text":"Hipotiroidismo definitivo, exigindo reposição vitalícia de levotiroxina."},{"id":"c","text":"Anemia aplástica."},{"id":"d","text":"Fibrose pulmonar."},{"id":"e","text":"Perda permanente do paladar."}]', 'b', 'O objetivo do iodo radioativo é destruir o tecido hiperfuncionante. Na grande maioria dos casos de Graves, a glândula acaba sendo destruída o suficiente para evoluir para hipotiroidismo, o que é mais fácil de manejar com hormônio oral do que o hipertiroidismo.', '{"a":"Não há evidência de aumento significativo de outros cânceres.","b":"Correta. Define o prognóstico natural da terapia ablativa.","c":"N/A.","d":"N/A.","e":"Transitório."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_i1o2d3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Radioiodoterapia","Prognóstico","Hipotiroidismo"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-i1o2d3', 'approved', 15
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-i1o2d3');

    -- Q17
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-h4a5s6', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'A ''Face em Lua Cheia'' e a ''Giba de Búfalo'' são achados do Cushing, mas a presença de bócio e exoftalmia simultânea em um paciente com hipercortisolismo sugere:', '[{"id":"a","text":"Uso de prednisona pura."},{"id":"b","text":"Associação de Doença de Graves e Síndrome de Cushing (Síndromes Poliglandulares)."},{"id":"c","text":"Reação adversa ao Metimazol."},{"id":"d","text":"Acromegalia."},{"id":"e","text":"Normalidade."}]', 'b', 'Embora raro, doenças autoimunes endócrinas podem coexistir, exigindo tratamento simultâneo das duas glândulas.', '{"a":"N/A.","b":"Correta. Estimula o raciocínio clínico de associação de endocrinopatias.","c":"N/A.","d":"Causa bócio, mas não exoftalmia nem as estrias violáceas do Cushing.","e":"N/A."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_h4a5s6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Diagnóstico Diferencial","Associações","Graves"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-h4a5s6', 'approved', 16
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-h4a5s6');

    -- Q18
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-l1v2o3', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Um paciente com TSH muito baixo e T4 livre normal, mas com T3 livre elevado, apresenta:', '[{"id":"a","text":"Hipotiroidismo terciário."},{"id":"b","text":"T3-toxicose."},{"id":"c","text":"Resistência hipofisária ao TSH."},{"id":"d","text":"Consumo de algas marinhas apenas."},{"id":"e","text":"Tiroidite de Riedel."}]', 'b', 'A T3-toxicose é uma forma de hipertiroidismo precoce ou específica (comum no bócio multinodular ou adenoma) onde apenas o T3 está elevado.', '{"a":"Hipotálamo - TSH estaria baixo com T4 baixo.","b":"Correta. Define uma variante laboratorial comum da tireotoxicose.","c":"N/A.","d":"Pode causar Basedow, mas geralmente sobe T4 também.","e":"Fibrose da glândula, causa hipotiroidismo obstrutivo."}',
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_l1v2o3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["T3-toxicose","Laboratório","Hipertiroidismo"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-l1v2o3', 'approved', 17
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-l1v2o3');

    -- Q19
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-r4i5e6', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'A Tiroidite de Riedel caracteriza-se por:', '[{"id":"a","text":"Dor intensa e pus na glândula."},{"id":"b","text":"Glândula extremamente endurecida (''tireoide de ferro'') por fibrose invasiva que pode comprimir a traqueia e assemelhar-se a câncer anaplásico."},{"id":"c","text":"Aumento súbito após gripe."},{"id":"d","text":"Nódulos puramente líquidos."},{"id":"e","text":"Cura espontânea em 1 semana."}]', 'b', 'Riedel é uma doença rara, possivelmente relacionada à IgG4, onde o parênquima é substituído por tecido fibroso denso que ultrapassa os limites da cápsula glândular.', '{"a":"Tiroidite supurativa aguda (bacteriana).","b":"Correta. Define as características físicas e clínicas da tiroidite fibrosante.","c":"Tiroidite de Quervain.","d":"N/A.","e":"É progressiva e crônica."}',
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_r4i5e6', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Riedel","Fibrose","Diagnóstico Diferencial"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-r4i5e6', 'approved', 18
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-r4i5e6');

    -- Q20
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-END-p1e2r3', 'medicina', 'clinica-medica', 'endocrinologia', 'endocrinologia', 'tireoide', 'tireoide',
        'Qual a primeira linha de tratamento farmacológico para a Doença de Graves em pacientes NÃO gestantes no Brasil?', '[{"id":"a","text":"Propiltiouracil (PTU)."},{"id":"b","text":"Metimazol (Tapazol)."},{"id":"c","text":"Lítio."},{"id":"d","text":"Levotiroxina em dose alta."},{"id":"e","text":"Dexametasona."}]', 'b', 'O Metimazol é preferível por ter menor hepatotoxicidade em relação ao PTU e posologia mais simples (dose única diária). O PTU é reservado para gestantes no 1º trimestre ou tempestade tireoidiana (pois inibe a conversão periférica de T4 em T3).', '{"a":"Segunda linha devido ao risco de hepatite fulminante, exceto na gestação precoce.","b":"Correta. Define a droga de escolha no manejo ambulatorial do hipertiroidismo.","c":"Pode causar bócio, não trata Graves.","d":"Contraindicado.","e":"Usado apenas como adjuvante em casos graves."}',
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'tireoide_p1e2r3', '{"package_id":"f90b96f6-66b4-47e6-a80f-e0cc70c17f71","tags":["Metimazol","Graves","Terapêutica"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-END-p1e2r3', 'approved', 19
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-END-p1e2r3');

END $$;