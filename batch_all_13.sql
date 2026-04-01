DO c:UserskayquDesktopQrub1QRub
DECLARE
    current_q_id TEXT;
BEGIN
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
    
END c:UserskayquDesktopQrub1QRub;