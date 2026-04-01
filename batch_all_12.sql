DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
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
    
END c:UserskayquDesktopQrub1QRub;