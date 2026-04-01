DO $$
DECLARE
    p_id UUID := '375f7808-3a7d-4ece-a932-da0ab8360a23';
BEGIN
    -- Q1
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-hq33pp', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um homem de 48 anos, etilista pesado (consumo de > 80g de etanol/dia por 20 anos), procura a emergência com queixa de icterícia súbita, febre baixa e dor em hipocôndrio direito há 10 dias. Ao exame físico: descorado 1+/4+, icterício 3+/4+, presença de aranhas vasculares no tórax e flapping presente. Abdome globoso, com ascite moderada e fígado palpável a 4 cm do rebordo costal direito, doloroso. Exames laboratoriais: Hemoglobina 10,2 g/dL, Leucócitos 22.000/mm³ (com desvio à esquerda), Plaquetas 110.000/mm³, AST (TGO) 280 U/L, ALT (TGP) 92 U/L, Bilirrubina Total 14 mg/dL (Direta 11), RNI 2,2 e Creatinina 1,4 mg/dL. Com base no Índice de Função Discriminante de Maddrey (DF) e no quadro clínico, qual a conduta terapêutica mais indicada?', '[{"id":"a","text":"Iniciar antibioticoterapia empírica com Ceftriaxona visando profilaxia de PBE."},{"id":"b","text":"Prescrever Prednisolona 40 mg/dia por 28 dias, caso não haja contraindicações como infecção ativa ou sangramento digestivo."},{"id":"c","text":"Indicar transplante hepático de urgência imediata (prioridade zero)."},{"id":"d","text":"Iniciar Pentoxifilina isolada como primeira escolha para redução da mortalidade."},{"id":"e","text":"Apenas suporte nutricional e abstinência alcoólica, visto que o Maddrey é baixo."}]', 'b', 
        'O paciente apresenta um quadro clássico de Hepatite Alcoólica Aguda Ggrave. O cálculo do Índice de Maddrey (4,6 x [TP do paciente - TP controle] + Bilirrubina Total) neste caso supera 32 (considerando o RNI de 2,2, o prolongamento do TP é significativo). Para pacientes com Maddrey > 32 ou encefalopatia (flapping), o tratamento de escolha para reduzir a mortalidade a curto prazo é o corticoide (Prednisolona). A Pentoxifilina é reservada para casos onde o corticoide é contraindicado.', '{"a":"A antibioticoterapia é adjuvante se houver suspeita de infecção, mas o tratamento específico da inflamação grave é o corticoide.","b":"Correta. Identifica o limiar de gravidade (Maddrey) e a droga padrão-ouro (Prednisolona).","c":"O transplante na hepatite alcoólica aguda é controverso e exige critérios de seleção muito rigorosos (ex: protocolo de Lille), não sendo a conduta inicial de emergência.","d":"A Pentoxifilina mostrou inferioridade ou falta de benefício adicional em relação ao corticoide no estudo STOPAH.","e":"O suporte e abstinência são fundamentais, mas a gravidade exige farmacoterapia específica."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 'hq33pp', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite Alcoólica","Maddrey","Prednisolona"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-hq33pp', 'approved', 83
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-hq33pp');

    -- Q2
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-dw60hp', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Uma paciente de 35 anos, sexo feminino, é encaminhada ao gastroenterologista devido a fadiga progressiva e prurido discreto. Exames laboratoriais revelam: Elevação de transaminases (5x o limite superior), Bilirrubinas normais e Gamaglobulina de 2,4 g/dL (Normal até 1,5). A sorologia para hepatites virais é negativa. O FAN (Fator Antinúcleo) é reagente 1:640 com padrão pontilhado e o Anticorpo Anti-Músculo Liso (ASML) é reagente 1:160. A biópsia hepática demonstra ''hepatite de interface'' com infiltrado plasmocitário exuberante e formação de rosetas de hepatócitos. Qual é o diagnóstico mais provável e o tratamento inicial recomendado?', '[{"id":"a","text":"Colangite Biliar Primária; Ácido Ursodesoxicólico."},{"id":"b","text":"Hepatite Autoimune Tipo 1; Prednisona associada ou não à Azatioprina."},{"id":"c","text":"Doença de Wilson; Quelante de cobre."},{"id":"d","text":"Esteato-hepatite Não Alcoólica; Mudança de estilo de vida."},{"id":"e","text":"Hepatite Medicamentosa; Suspensão de fármacos."}]', 'b', 
        'O quadro de mulher jovem com hipergamaglobulinemia, FAN e Anti-Músculo Liso positivos, e histologia mostrando hepatite de interface com plasmócitos é patognomônico de Hepatite Autoimune Tipo 1. O tratamento baseia-se na imunossupressão para induzir remissão e prevenir a progressão para cirrose.', '{"a":"A CBP apresenta Anti-mitocôndria positivo e padrão de agressão ductal, não de interface.","b":"Correta. Define o diagnóstico sorológico/histológico e a terapia de primeira linha.","c":"Wilson cursa com ceruloplasmina baixa e anéis de Kayser-Fleischer, sem marcadores autoimunes clássicos.","d":"NASH não costuma apresentar títulos tão altos de FAN ou hepatite de interface plasmocitária.","e":"Embora a DILI possa mimetizar a autoimune, o quadro é muito típico da doença idiopática crônica."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'dw60hp', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite Autoimune","FAN","ASML"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-dw60hp', 'approved', 84
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-dw60hp');

    -- Q3
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-n6dv24', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um paciente de 55 anos, portador de cirrose por Hepatite C (Child-Pugh B), realiza ultrassonografia de rastreamento semestral que evidencia nódulo hepático sólido de 1,8 cm em segmento VI. Para a confirmação diagnóstica de Carcinoma Hepatocelular (CHC) neste paciente, segundo as diretrizes da AASLD e EASL, qual a conduta diagnóstica de escolha?', '[{"id":"a","text":"Realizar Biópsia Hepática percutânea do nódulo imediatamente."},{"id":"b","text":"Solicitar Alfafetoproteína; se > 20 ng/mL, o diagnóstico está confirmado."},{"id":"c","text":"Realizar Tomografia Computadorizada (TC) ou Ressonância Magnética (RM) com contraste dinâmico, observando realce arterial precoce seguido de lavagem (washout) na fase portal/tardia."},{"id":"d","text":"Repetir a Ultrassonografia em 3 meses para avaliar estabilidade do nódulo."},{"id":"e","text":"Indicar Hepatectomia parcial diagnóstica."}]', 'c', 
        'No fígados cirróticos, o diagnóstico de CHC em nódulos > 1 cm pode ser feito exclusivamente por métodos de imagem dinâmicos (TC ou RM). O padrão típico é o ''enhancement'' arterial intenso (devido à vascularização pela artéria hepática) e o ''washout'' (clareamento do contraste) nas fases tardias. Isso evita a biópsia, que possui risco de sangramento e disseminação tumoral pelo trajeto da agulha (seeding).', '{"a":"A biópsia é reservada para casos onde a imagem é inconclusiva em dois métodos diferentes ou o fígado não é cirrótico.","b":"A alfafetoproteína é um marcador de rastreio/prognóstico, mas não confirma o diagnóstico isoladamente.","c":"Correta. Identifica o padrão radiológico vascular que define a neoplasia maligna primária mais comum do fígado.","d":"Esperar 3 meses em um nódulo de 1,8 cm pode fazer o paciente perder a janela de tratamento curativo.","e":"Conduta invasiva desnecessária antes do estadiamento radiológico."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'n6dv24', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["CHC","Radiologia","Guidelines"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-n6dv24', 'approved', 85
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-n6dv24');

    -- Q4
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-hv0pix', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um jovem de 22 anos é trazido ao hospital com quadro de icterícia intensa, dor abdominal e distúrbio de comportamento (irritabilidade e tremores de extremidades). Ao exame, apresenta anel acastanhado na periferia da córnea bilateralmente. Os exames revelam anemia hemolítica com Teste de Coombs Direto negativo e Falência Hepática Aguda. Qual a principal suspeita clínica e qual exame laboratorial ajudaria a confirmar este erro inato do metabolismo?', '[{"id":"a","text":"Hepatite A Fulminante; Anti-HAV IgM."},{"id":"b","text":"Doença de Wilson; Dosagem de Ceruloplasmina sérica e Cobre urinário de 24h."},{"id":"c","text":"Hemocromatose Hereditária; Saturação de Transferrina."},{"id":"d","text":"Deficiência de Alfa-1-Antitripsina; Fenotipagem Pi."},{"id":"e","text":"Porfiria Cutânea Tarda; Porfirinas urinárias."}]', 'b', 
        'A combinação de hepatopatia (aguda ou crônica), distúrbios neuropsiquiátricos e o Anel de Kayser-Fleischer (depósito de cobre na membrana de Descemet) é clássica da Doença de Wilson. A anemia hemolítica Coombs-negativo ocorre por toxicidade direta do cobre livre nas hemácias. O diagnóstico baseia-se na redução da ceruloplasmina e aumento da excreção urinária de cobre.', '{"a":"A hepatite A não causa anéis corneanos nem tremores extrapiramidais precoces.","b":"Correta. Identifica a patologia metabólica do cobre e os exames diagnósticos padrão.","c":"A hemocromatose costuma manifestar-se mais tarde (4ª-5ª década) e cursa com hiperpigmentação cutânea (''diabetes bronzeado''), não anéis corneanos.","d":"Causa doença hepática e enfisema, sem as manifestações oftalmológicas citadas.","e":"Doença cutânea fotossensível."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'hv0pix', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Wilson","Metabolismo","Neurologia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-hv0pix', 'approved', 86
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-hv0pix');

    -- Q5
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-9pzhzg', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'A infecção crônica pelo vírus da Hepatite C (HCV) está associada a diversas manifestações extra-hepáticas de natureza imunológica. Qual das seguintes condições dermatológicas e reumatológicas possui a associação mais forte e documentada com a viremia ativa pelo HCV, muitas vezes regredindo após o tratamento com antivirais de ação direta (DAAs)?', '[{"id":"a","text":"Lúpus Eritematoso Sistêmico."},{"id":"b","text":"Crioglobulinemia Mista Essencial e Líquen Plano."},{"id":"c","text":"Esclerodermia Sistêmica."},{"id":"d","text":"Psoríase Vulgar."},{"id":"e","text":"Dermatite Herpetiforme."}]', 'b', 
        'O HCV é um vírus linfotrópico que induz a proliferação de clones de linfócitos B, gerando crioglobulinas (imunoglobulinas que precipitam no frio). Isso causa vasculite de pequenos vasos. O Líquen Plano (oral ou cutâneo) também tem associação epidemiológica fortíssima com o HCV. Outras associações incluem Porfiria Cutânea Tarda e Glomerulonefrite Membranoproliferativa.', '{"a":"Não há relação causal direta estabelecida com o HCV.","b":"Correta. Lista as duas patologias imunomediadas clássicas da esfera extra-hepática da Hepatite C.","c":"Doença do colágeno sem nexo viral específico.","d":"Doença autoimune cutânea independente.","e":"Associada à Doença Celíaca."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', '9pzhzg', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite C","Extra-hepática","Crioglobulinemia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-9pzhzg', 'approved', 87
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-9pzhzg');

    -- Q6
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-4qb9dg', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um paciente de 40 anos, dentista, apresenta cansaço e mal-estar. Suas sorologias revelam: HBsAg reagente, HBeAg não reagente, Anti-HBe reagente, Anti-HBc Total reagente e Anti-HBc IgM não reagente. O DNA do HBV (Carga Viral) é de 850.000 UI/mL e a Alanina Aminotransferase (ALT) está em 120 U/L (2,5x o normal). A elastografia hepática (Fibroscan) mostra F2 (fibrose moderada). Como se classifica este estágio da infecção e qual a conduta recomendada?', '[{"id":"a","text":"Portador Inativo; Apenas observação anual."},{"id":"b","text":"Hepatite Crônica B, HBeAg negativo; Iniciar tratamento com Tenofovir ou Entecavir."},{"id":"c","text":"Hepatite B Aguda; Aguardar clareamento espontâneo."},{"id":"d","text":"Paciente imune por infecção prévia; Nenhuma conduta."},{"id":"e","text":"Imunotolerante; Alta ambulatorial."}]', 'b', 
        'Trata-se de uma Hepatite Crônica B (HBsAg > 6 meses, Anti-HBc IgM neg). O HBeAg negativo com carga viral alta (> 2.000) e ALT elevada (ou evidência de fibrose >= F2) indica uma variante do vírus (''mutante do pré-core'') que não produz HBeAg, mas é altamente replicativa e inflamatória. Este paciente tem indicação formal de tratamento para evitar progressão para cirrose e CHC.', '{"a":"O portador inativo teria carga viral baixa (< 2.000) e enzimas normais.","b":"Correta. Classifica o estágio de Replicação com HBeAg negativo e prescreve o antiviral correto.","c":"O Anti-HBc IgM negativo exclui fase aguda recente.","d":"O HBsAg positivo indica infecção ativa, não cura.","e":"O imunotolerante teria HBeAg positivo, ALT normal e carga viral altíssima (> milhões)."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', '4qb9dg', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite B","Mutante Pré-core","Tenofovir"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-4qb9dg', 'approved', 88
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-4qb9dg');

    -- Q7
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-fb1rg3', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Na avaliação laboratorial de um paciente com suspeita de Hepatite B, observa-se o seguinte padrão: HBsAg não reagente e Anti-HBs não reagente. No entanto, o Anti-HBc Total é REAGENTE. Este achado isolado do Anti-HBc, conhecido como ''janela imunológica'' ou ''core isolado'', pode representar as seguintes situações, EXCETO:', '[{"id":"a","text":"Fase de ''janela'' na hepatite B aguda (entre o desaparecimento do HBsAg e o surgimento do Anti-HBs)."},{"id":"b","text":"Infecção crônica com níveis de HBsAg abaixo do limite de detecção (infecção oculta)."},{"id":"c","text":"Recuperação de infecção passada com perda do Anti-HBs ao longo dos anos."},{"id":"d","text":"Falso-positivo do teste laboratoriais."},{"id":"e","text":"Sucesso da vacinação contra hepatite B há menos de 1 ano."}]', 'e', 
        'A vacina contra Hepatite B utiliza apenas o antígeno de superfície recombinante (HBsAg). Portanto, um indivíduo vacinado deve ser Anti-HBs reagente e Anti-HBc NÃO reagente. O Anti-HBc (anticorpo contra o core/cerne do vírus) só fica positivo se o paciente teve contato real com o vírus íntegro (infecção natural), nunca pela vacina.', '{"a":"Correto como possibilidade diagnóstica clínica.","b":"Correto como possibilidade diagnóstica clínica.","c":"Correto como possibilidade diagnóstica clínica.","d":"Correto como possibilidade diagnóstica clínica.","e":"Falsa. A vacina não positiva o Anti-HBc."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'fb1rg3', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite B","Sorologia","Vacina"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-fb1rg3', 'approved', 89
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-fb1rg3');

    -- Q8
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-zg767l', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um homem de 50 anos, obeso e diabético, é avaliado por elevação leve de Alanina Aminotransferase (ALT) e Aspartato Aminotransferase (AST) em exames de rotina (ambas 1,5x o normal). A ultrassonografia mostra hiperecogenicidade difusa do parênquima hepático (''fígado brilhante''). O Fibroscan indica rigidez de 9,5 kPa (F3 - fibrose avançada). Qual é a nomenclatura atual recomendada para esta condição e qual a intervenção mais eficaz para reverter o dano hepático comprovado?', '[{"id":"a","text":"Esteato-hepatite Alcoólica; Abstinência rigorosa."},{"id":"b","text":"Metabolic Dysfunction-Associated Steatotic Liver Disease (MASLD); Perda de peso sustentada (> 7-10% do peso corporal) e controle rigoroso das comorbidades metabólicas."},{"id":"c","text":"Glicogenose Tipo 1; Dieta rica em amido de milho."},{"id":"d","text":"Insuficiência Cardíaca Direita; Uso de diuréticos de alça."},{"id":"e","text":"Hepatite C oculta; Biópsia hepática imediata."}]', 'b', 
        'Antigamente chamada de NAFLD (Doença Gordurosa Hepática Não Alcoólica), a nova nomenclatura internacional é MASLD, enfatizando a disfunção metabólica associada (DM, Obesidade, Dislipidemia). Em pacientes com fibrose avançada (F3), a perda ponderal significativa é a única medida com evidência sólida de reversão da fibrose e redução do risco de evolução para cirrose e hepatocarcinoma.', '{"a":"A ausência de histórico de etilismo e a presença de síndrome metabólica orientam para causa não-alcoólica.","b":"Correta. Atualiza a nomenclatura e define o pilar do tratamento.","c":"Doença pediátrica com hipoglicemia severa.","d":"Daria estase mas o contexto metabólico é soberano aqui.","e":"A sorologia viral costuma vir antes da elastografia no protocolo de investigação."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'zg767l', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["MASLD","Esteatose","Metabolismo"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-zg767l', 'approved', 90
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-zg767l');

    -- Q9
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-wp09pu', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um paciente com Hepatite C Crônica Genótipo 1, cirrose Child-Pugh A, é iniciado em tratamento com o esquema pangenotípico Sofosbuvir + Velpatasvir. Durante o tratamento, qual medicação comumente utilizada para dispepsia deve ser EVITADA ou usada com extremo cuidado devido à redução significativa da absorção do Velpatasvir por alteração do pH gástrico?', '[{"id":"a","text":"Metoclopramida."},{"id":"b","text":"Inibidores da Bomba de Prótons (como Omeprazol)."},{"id":"c","text":"Simeticona."},{"id":"d","text":"Escopolamina."},{"id":"e","text":"Ondansetrona."}]', 'b', 
        'O Velpatasvir necessita de um ambiente ácido para sua dissolução e absorção no trato gastrointestinal. O uso de IBP reduz drasticamente a concentração plasmática do antiviral, o que pode levar ao fracasso terapêutico e à resistência viral. Se o uso de antiácidos for indispensável, recomenda-se o uso de antagonistas H2 (em doses baixas) ou antiácidos comuns respeitando janelas de horário rígidas.', '{"a":"Procinético sem interferência no pH.","b":"Correta. Alerta para uma interação medicamentosa grave no manejo da Hepatite C moderna.","c":"Antiflatulento inerte.","d":"Antiespasmódico sem impacto no pH gástrico.","e":"Antiemético central/periférico sem impacto no pH."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'wp09pu', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite C","DAAs","Interação Medicamentosa"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-wp09pu', 'approved', 91
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-wp09pu');

    -- Q10
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-t505s3', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Sobre o manejo da Hepatite B na Gestação, qual a estratégia indicada para gestantes com carga viral (HBV-DNA) muito elevada (> 200.000 UI/mL) no terceiro trimestre, visando reduzir o risco de transmissão vertical, mesmo que o recém-nascido receba vacina e imunoglobulina (HBIg)?', '[{"id":"a","text":"Indicar apenas parto cesáreo eletivo."},{"id":"b","text":"Desaconselhar o aleitamento materno."},{"id":"c","text":"Iniciar profilaxia antiviral com Tenofovir a partir da 28ª-32ª semana de gestação."},{"id":"d","text":"Realizar troca plasmática na mãe antes do parto."},{"id":"e","text":"Não há indicação de antiviral durante a gestação pelo risco de teratogenia."}]', 'c', 
        'Embora a vacina + HBIg ao nascer protejam a maioria dos bebês, gestantes com viremia muito alta ainda transmitem o vírus em cerca de 10% dos casos por microtransfusões placentárias. O Tenofovir (TDF) é seguro na gestação e reduz a carga viral materna a níveis mínimos no momento do parto, eliminando praticamente o risco de infecção crônica no neonato.', '{"a":"A via de parto não influencia a transmissão vertical da Hepatite B.","b":"O aleitamento é permitido se o bebê recebeu a imunoprofilaxia adequada.","c":"Correta. Define o protocolo de redução de transmissão vertical em alta carga viral.","d":"Inexistente na prática clínica.","e":"O Tenofovir é categoria B e amplamente validado para uso gestacional."}', 
        'dificil', 'active', 'APROVADA', 'gerada_qrub', 't505s3', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite B","Gestação","Tenofovir"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-t505s3', 'approved', 92
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-t505s3');

    -- Q11
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-kmyqm9', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um homem de 58 anos apresenta cirrose compensada por álcool. No rastreamento, detecta-se lesão nodular de 3,5 cm em lobo direito. O estadiamento por imagem confirma tratar-se de Carcinoma Hepatocelular (CHC) único, sem invasão vascular ou metástases. O paciente é Child-Pugh A e não possui hipertensão portal (Gradiente de pressão venosa hepática < 10 mmHg). Segundo o algoritmo BCLC (Barcelona Clinic Liver Cancer), qual a conduta preferencial?', '[{"id":"a","text":"Transplante Hepático."},{"id":"b","text":"Ressecção Cirúrgica (Hepatectomia)."},{"id":"c","text":"Quimioembolização Arterial (TACE)."},{"id":"d","text":"Ablação por radiofrequência apenas."},{"id":"e","text":"Sorafebe (Quimioterapia sistêmica)."}]', 'b', 
        'Para pacientes BCLC 0 ou A (estágio precoce) com função hepática preservada (Child A) e SEM hipertensão portal clinicamente significativa, a ressecção cirúrgica é a primeira opção, oferecendo as melhores taxas de sobrevida. O transplante é reservado para aqueles com função hepática mais comprometida ou hipertensão portal que inviabilize a hepatectomia segura (risco de falência pós-operatória).', '{"a":"Indicado se houvesse hipertensão portal ou função Child B/C dentro dos critérios de Milão.","b":"Correta. Aplica o critério de seleção cirúrgica do consenso BCLC.","c":"Reservada para estágio intermediário (múltiplos nódulos).","d":"Opção para nódulos muito pequenos (< 2-3 cm) em pacientes sem condições cirúrgicas.","e":"Tratamento para doença avançada (BCLC C)."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'kmyqm9', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["BCLC","CHC","Cirurgia"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-kmyqm9', 'approved', 93
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-kmyqm9');

    -- Q12
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-yh32eo', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Qual variante da Hepatite Viral é conhecida por estar associada a uma taxa de letalidade desproporcionalmente alta (até 20%) quando ocorre em mulheres durante o terceiro trimestre de GESTAÇÃO?', '[{"id":"a","text":"Hepatite A."},{"id":"b","text":"Hepatite B."},{"id":"c","text":"Hepatite C."},{"id":"d","text":"Hepatite E."},{"id":"e","text":"Hepatite D."}]', 'd', 
        'A Hepatite E (HEV), particularmente o genótipo 1 comum na Ásia e África, causa formas fulminantes graves especificamente em gestantes. O mecanismo não é totalmente esclarecido, mas envolve alterações imunológicas e hormonais da gravidez. No Brasil, o genótipo 3 é o mais comum, associado a suínos, e raramente causa essa gravidade em gestantes.', '{"a":"Hepatite A em gestantes não tem essa letalidade específica.","b":"O risco na B é de cronificação do bebê, não de morte materna fulminante seletiva.","c":"Evolução crônica insidiosa.","d":"Correta. Fato epidemiológico e clínico clássico da Hepatite E.","e":"Exige co-infecção por B e causa gravidade em qualquer paciente, sem predileção exclusiva por gestantes."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'yh32eo', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite E","Gestação","Fulminante"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-yh32eo', 'approved', 94
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-yh32eo');

    -- Q13
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-d6l23j', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um paciente de 62 anos com cirrose por álcool e Hepatite C apresenta ascite de difícil controle. Ao realizar biópsia de um nódulo hepático sugestivo de Carcinoma Hepatocelular (CHC), o anatomopatológico revela células malignas com padrão trabecular. Para fins de transplante hepático, quais são os ''Critérios de Milão'', que definem o limite de carga tumoral para garantir uma baixa taxa de recorrência pós-transplante?', '[{"id":"a","text":"Nódulo único de até 5 cm ou até 3 nódulos de até 3 cm cada."},{"id":"b","text":"Nódulo único de até 10 cm."},{"id":"c","text":"Presença de invasão da veia porta, independente do tamanho."},{"id":"d","text":"Nódulos apenas no lobo esquerdo."},{"id":"e","text":"Ausência de alfafetoproteína."}]', 'a', 
        'Os Critérios de Milão são o padrão internacional para selecionar candidatos cirróticos com CHC para transplante. Seguir esses limites (1 lesão <= 5cm OU 3 lesões <= 3cm cada) garante uma sobrevida de 70% em 5 anos, comparável a transplantados por causas benignas. Qualquer sinal de invasão macrovascular ou metástase extra-hepática contraindica o transplante.', '{"a":"Correta. Define numericamente os limites de indicação curativa pelo transplante.","b":"Extrapola o limite de segurança de recorrência.","c":"A invasão vascular é contraindicação absoluta.","d":"A localização não é o critério definidor, mas sim o volume tumoral total.","e":"Marcador acessório."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'd6l23j', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Milão","CHC","Transplante"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-d6l23j', 'approved', 95
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-d6l23j');

    -- Q14
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-3zhxt9', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'A Colangite Biliar Primária (CBP) é uma doença autoimune dos ductos biliares interlobulares. Qual é o marcador sorológico altamente específico (presente em > 95% dos casos) utilizado para o seu diagnóstico e qual a vitamina lipossolúvel que mais precocemente se torna deficiente devido à colestase crônica?', '[{"id":"a","text":"Anti-DNA; Vitamina C."},{"id":"b","text":"Anti-Mitocôndria (AMA); Vitamina A."},{"id":"c","text":"Anti-LKM1; Vitamina K."},{"id":"d","text":"p-ANCA; Vitamina B12."},{"id":"e","text":"Anti-Ilhota; Vitamina D."}]', 'b', 
        'O anticorpo anti-mitocôndria (AMA) dirigido contra o complexo piruvato desidrogenase é a marca da CBP. Como a doença causa colestase crônica (diminuição de sais biliares no intestino), há má-absorção de gorduras e vitaminas lipossolúveis (A, D, E, K). Das lipossolúveis, a Vitamina A e D são as mais comumente afetadas precocemente, levando a xeroftalmia (A) e osteopenia (D).', '{"a":"Anti-DNA é do Lúpus e Vitamina C é hidrossolúvel.","b":"Correta. Associa o marcador sorológico e a fisiopatologia da má-absorção por colestase.","c":"Anti-LKM1 é da Hepatite Autoimune Tipo 2. A Vitamina K também cai, mas a deficiência clínica de A costuma ser detectada em testes de adaptação ao escuro precocemente.","d":"p-ANCA associa-se à Colangite Esclerosante Primária (CEP).","e":"Anti-ilhota é do Diabetes Tipo 1."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', '3zhxt9', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["CBP","AMA","Colestase"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-3zhxt9', 'approved', 96
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-3zhxt9');

    -- Q15
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-851id7', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um paciente de 45 anos com Hepatite B Crônica e cirrose Child-Pugh B apresenta hemorragia digestiva alta varicosa. Após estabilização e tratamento endoscópico, ele recebe alta com Propranolol e ligadura elástica programada. Na avaliação ambulatorial, o médico nota que o paciente tem carga viral de 50.000 UI/mL, apesar de transaminases quase normais. Além do manejo da pressão portal, qual a recomendação em relação ao uso de antivirais (Tenofovir/Entecavir) para este paciente?', '[{"id":"a","text":"Não iniciar antiviral, pois a ALT está normal."},{"id":"b","text":"Tratar imediatamente com antiviral para o resto da vida, pois todo cirrótico com Hepatite B e DNA detectável deve ser tratado, independente da ALT."},{"id":"c","text":"Solicitar biópsia hepática para decidir tratamento."},{"id":"d","text":"Tratar apenas se a carga viral subir acima de 1 milhão."},{"id":"e","text":"Aguardar o paciente descompensar para Child C."}]', 'b', 
        'A diretriz atual (PCDT e internacionais) é clara: pacientes cirróticos (especialmente os descompensados ou com risco de descompensação) portadores de Hepatite B devem receber tratamento antiviral contínuo se houver QUALQUER nível detectável de DNA do HBV no sangue, independentemente do nível de transaminases. O objetivo é suprimir a replicação viral para estabilizar a função hepática e reduzir o risco de hepatocarcinoma.', '{"a":"Conduta perigosa; o cirrótico já tem dano estrutural, não podemos esperar a ALT subir.","b":"Correta. Define o critério absoluto de tratamento antiviral no cirrótico B positivo.","c":"Contraindicada em cirróticos pelo risco de sangramento e falta de utilidade (o diagnóstico de cirrose já está dado).","d":"A carga viral de corte (> 2.000 ou > 20.000) aplica-se a não cirróticos.","e":"O tratamento visa justamente evitar a evolução para estágios terminais."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', '851id7', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite B","Cirrose","Tenofovir"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-851id7', 'approved', 97
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-851id7');

    -- Q16
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-xdd2t3', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Qual a conduta profilática obrigatória para todos os contatos sexuais e domiciliares de um paciente diagnosticado com Hepatite A Aguda que ainda não possuem imunidade comprovada?', '[{"id":"a","text":"Isolamento hospitalar por 30 dias."},{"id":"b","text":"Administração de vacina contra Hepatite A em dose única (se < 40 anos) ou imunoglobulina (se indicado/disponível) idealmente em até 14 dias após a exposição."},{"id":"c","text":"Iniciar Ribavirina profilática."},{"id":"d","text":"Fazer bochechos com álcool em gel."},{"id":"e","text":"Nenhuma, pois a Hepatite A não é contagiosa após os sintomas."}]', 'b', 
        'A Hepatite A é altamente contagiosa via fecal-oral. A profilaxia pós-exposição é eficaz se realizada precocemente (dentro de 2 semanas do contato). Em indivíduos saudáveis de 1 a 40 anos, a vacina é a escolha. Para menores de 1 ano, maiores de 40 anos ou imunossuprimidos, a imunoglobulina é preferível se disponível, embora a vacina também possa ser usada.', '{"a":"Desnecessário; a transmissão cai drasticamente após o início da icterícia.","b":"Correta. Define a janela e o método de bloqueio epidemiológico da doença do surto.","c":"Ribavirina é para Hepatite C ou formas graves de E, não profilaxia da A.","d":"Inútil.","e":"O período de maior transmissibilidade ocorre nas 2 semanas ANTES da icterícia, mas contatos domiciliares presumem exposição contínua recente."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'xdd2t3', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hepatite A","Profilaxia","Saúde Pública"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-xdd2t3', 'approved', 98
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-xdd2t3');

    -- Q17
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-b8zj0d', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Sobre a Síndrome de Budd-Chiari, que consiste na obstrução do fluxo de saída venoso hepático (veias supra-hepáticas ou veia cava inferior), qual o achado ultrassonográfico clássico no Lobo Caudado que ocorre devido à sua drenagem venosa independente diretamente para a veia cava?', '[{"id":"a","text":"Atrofia severa do lobo caudado."},{"id":"b","text":"Hipertrofia compensatória do lobo caudado."},{"id":"c","text":"Calcificação em ''casca de ovo''."},{"id":"d","text":"Presença de múltiplos cistos."},{"id":"e","text":"Ausência congênita do lobo caudado."}]', 'b', 
        'O lobo caudado (segmento I) possui drenagem venosa própria que entra diretamente na veia cava inferior, sem passar pelas 3 veias supra-hepáticas principais. Na Síndrome de Budd-Chiari (trombose das supra-hepáticas), o resto do fígado fica congestionado e atrofia, enquanto o lobo caudado hipertrofia para compensar, sendo um sinal radiológico muito sugestivo desta síndrome.', '{"a":"O lobo caudado é o único que NÃO atrofia no início.","b":"Correta. Explica a anatomia vascular peculiar do segmento I na patologia obstrutiva venosa.","c":"Sinal de cisto hidático ou granuloma antigo.","d":"Sinal de doença policística.","e":"Variação anatômica rara sem relação com Budd-Chiari."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'b8zj0d', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Budd-Chiari","Lobo Caudado","Anatomia Path"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-b8zj0d', 'approved', 99
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-b8zj0d');

    -- Q18
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-xqm40c', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'A ''Hemorocromatose Hereditária'' é uma doença de sobrecarga de ferro causada mais frequentemente pela mutação C282Y no gene HFE. Além da cirrose e do diabetes (''diabetes bronzeado''), qual manifestação articular costuma ser uma queixa precoce característica, afetando tipicamente a 2ª e 3ª articulações metacarpofalângicas?', '[{"id":"a","text":"Artrite Reumatóide-like com desvio ulnar."},{"id":"b","text":"Artropatia da Hemocromatose (pseudogota por depósito de pirofosfato de cálcio), com dor e edema nas metacarpofalângicas."},{"id":"c","text":"Artrite Infecciosa por Staphylococcus."},{"id":"d","text":"Gota úrica tofácea."},{"id":"e","text":"Osteoartrose nodular de Heberden."}]', 'b', 
        'A artropatia é uma das manifestações mais precoces e debilitantes da hemocromatose. O depósito de ferro favorece o depósito de cristais de pirofosfato de cálcio (condrocalcinose/pseudogota). O acometimento da 2ª e 3ª metacarpofalângicas (o sinal do ''aperto de mão doloroso'') é muito sugestivo de sobrecarga de ferro.', '{"a":"A AR poupa as metacarpofalângicas isoladamente dessa forma e cursa com erosões ósseas diferentes.","b":"Correta. Identifica a manifestação articular clássica e precocemente presente na história natural da doença.","c":"Processo agudo monoarticular piogênico.","d":"A gota atinge tipicamente o hálux.","e":"Atinge interfalângicas distais."}', 
        'moderado', 'active', 'APROVADA', 'gerada_qrub', 'xqm40c', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Hemocromatose","Artropatia","HFE"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-xqm40c', 'approved', 100
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-xqm40c');

    -- Q19
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-ickgk4', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Um paciente de 30 anos apresenta icterícia flutuante que piora durante períodos de estresse, jejum prolongado ou atividade física intensa. Bilirrubina Total de 2,8 mg/dL (Indireta 2,5) e Bilirrubina Direta 0,3 mg/dL. As transaminases, enzimas canaliculares e hemograma são rigorosamente normais. Qual o diagnóstico mais provável para este quadro benigno e qual o mecanismo fisiopatológico envolvido?', '[{"id":"a","text":"Síndrome de Crigler-Najjar Tipo I; Ausência total de enzima conjugadora."},{"id":"b","text":"Síndrome de Gilbert; Redução da atividade da enzima UGT1A1 (glicuroniltransferase)."},{"id":"c","text":"Síndrome de Dubin-Johnson; Defeito na excreção biliar de bilirrubina conjugada."},{"id":"d","text":"Hepatite Viral Crônica."},{"id":"e","text":"Esferocitose Hereditária; Fragilidade osmótica aumentada."}]', 'b', 
        'A Síndrome de Gilbert é a causa mais comum de hiperbilirrubinemia indireta isolada e benigna. Decorre de uma mutação no promotor do gene UGT1A1 que reduz a capacidade de conjugação do fígado em situações de estresse metabólico. Não exige tratamento nem causa dano hepático.', '{"a":"Crigler-Najjar I é uma doença gravíssima neonatal com bilirrubinas > 20.","b":"Correta. Define a causa mais comum de icterícia isolada e o defeito molecular subjacente.","c":"Dubin-Johnson cursa com aumento de bilirrubina DIRETA.","d":"Hepatites elevam transaminases e bilirrubina direta.","e":"Causaria hemólise (anemia e reticulocitose), que não estão presentes aqui."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'ickgk4', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Gilbert","Bilirrubinas","Benigno"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-ickgk4', 'approved', 101
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-ickgk4');

    -- Q20
    INSERT INTO questao_base (
        id, course_id, area_id, specialty_id, subspecialty_id, subject_id, tema_id,
        enunciado, options, correct_option_id, explanation, alternative_explanations,
        difficulty, status, status_validacao, fonte, hash, metadata
    ) VALUES (
        'FGV-HEP-p6c88f', 'medicina', 'clinica-medica', 'gastroenterologia', 'gastroenterologia', 'doenca-hepatica', 'doenca-hepatica',
        'Na vigência de uma Hepatite Aguda grave com risco de insuficiência hepática, qual parâmetro laboratorial é o indicador mais precoce e sensível de perda da função de síntese do hepatócito, devido à meia-vida curta dos fatores de coagulação que o compõem?', '[{"id":"a","text":"Albumina sérica."},{"id":"b","text":"Atividade de Protrombina (TAP / RNI)."},{"id":"c","text":"Colesterol Total."},{"id":"d","text":"Bilirrubina Indireta."},{"id":"e","text":"Plaquetas."}]', 'b', 
        'O Fator VII de coagulação tem a meia-vida mais curta de todas as proteínas de síntese hepática (cerca de 4 a 6 horas). Por isso, o prolongamento do Tempo de Protrombina (TAP/RNI) é o sinal mais precoce de que o fígado parou de produzir proteínas adequadamente. A albumina, por ter meia-vida de 20 dias, só cai em doenças crônicas ou estados inflamatórios prolongados.', '{"a":"Marcador de cronicidade ou desnutrição, não de falência aguda hiper-recente.","b":"Correta. Identifica o marcador de síntese dinâmica de curta duração.","c":"Cai na cirrose avançada, não na injúria aguda isoladamente.","d":"Reflete excreção e metabolismo, não síntese proteica direta.","e":"Reflete hipertensão portal (sequestro no baço) ou toxicidade medular."}', 
        'facil', 'active', 'APROVADA', 'gerada_qrub', 'p6c88f', '{"package_id":"375f7808-3a7d-4ece-a932-da0ab8360a23","tags":["Síntese Hepática","Fisiologia","TAP"],"source":"qrub_generator_v2"}'
    ) ON CONFLICT (id) DO UPDATE SET status_validacao = 'APROVADA', metadata = EXCLUDED.metadata;

    INSERT INTO package_questions (package_id, question_id, status, order_index)
    SELECT p_id, 'FGV-HEP-p6c88f', 'approved', 102
    WHERE NOT EXISTS (SELECT 1 FROM package_questions WHERE package_id = p_id AND question_id = 'FGV-HEP-p6c88f');

END $$;