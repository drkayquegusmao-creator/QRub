DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
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
    
END c:UserskayquDesktopQrub1QRub;