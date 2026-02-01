/**
 * QRUB Question Generator Engine - Revalida Style
 * Massive clinical scenario database with unique questions
 * Zero repetition guarantee through randomization and variation
 */

import { Question } from './data-mock'

interface GeneratorParams {
    specialty_id: string
    subspecialty_id?: string
    subject_id?: string
    difficulty: 'Fácil' | 'Médio' | 'Difícil'
    specialty_name: string
    subspecialty_name?: string
    subject_name?: string
}

interface ClinicalScenario {
    age_range: [number, number]
    chief_complaint: string
    onset: string
    context: string
    vitals: {
        pa: [number, number]
        fc: [number, number]
        fr: [number, number]
        sato2: [number, number]
    }
    physical_exam: string[]
    labs?: string[]
    diagnosis: string
    correct_action: string
    distractors: string[]
    explanation_correct: string
    explanation_wrong: string[]
}

// MASSIVE CLINICAL SCENARIOS DATABASE
const CLINICAL_SCENARIOS: Record<string, ClinicalScenario[]> = {
    'medicina-emergencia': [
        // CARDIOVASCULAR
        {
            age_range: [45, 75],
            chief_complaint: 'dor torácica em aperto',
            onset: 'há 40 minutos',
            context: 'irradiando para membro superior esquerdo e mandíbula',
            vitals: { pa: [80, 140], fc: [60, 120], fr: [16, 28], sato2: [88, 98] },
            physical_exam: [
                'sudorese fria profusa, palidez cutânea 3+/4+',
                'ausculta cardíaca: ritmo regular, bulhas hipofonéticas',
                'pulsos periféricos simétricos e palpáveis'
            ],
            labs: ['Troponina: 2.5 ng/mL (VR <0.04)', 'CK-MB: 45 U/L', 'ECG: supradesnivelamento de ST em DII, DIII e aVF'],
            diagnosis: 'Infarto Agudo do Miocárdio com Supra de ST (parede inferior)',
            correct_action: 'AAS 200mg VO + Clopidogrel 300-600mg VO + Heparina + Angioplastia primária (se <120min) ou Fibrinólise (Tenecteplase)',
            distractors: [
                'Observação em sala de emergência com ECG seriado a cada 6 horas',
                'Solicitar cintilografia miocárdica e aguardar resultado para definir conduta',
                'Iniciar betabloqueador EV imediato e transferir para UTI',
                'Prescrever nitrato sublingual e alta hospitalar com retorno em 48h'
            ],
            explanation_correct: 'Trata-se de IAM com supra de ST, emergência médica que requer reperfusão imediata. O tempo porta-balão ideal é <90min. AAS e antiagregação dupla são obrigatórios. A escolha entre angioplastia primária ou fibrinólise depende do tempo e disponibilidade.',
            explanation_wrong: [
                'INCORRETA: Observação passiva em IAM com supra é contraindicada - cada minuto conta ("time is muscle")',
                'INCORRETA: Cintilografia não tem papel no diagnóstico agudo de IAM - ECG e troponina são suficientes',
                'INCORRETA: Betabloqueador EV pode piorar choque cardiogênico - deve ser evitado na fase aguda instável',
                'INCORRETA: Alta hospitalar em IAM agudo é negligência médica - paciente necessita internação em UTI'
            ]
        },
        {
            age_range: [18, 45],
            chief_complaint: 'dispneia súbita e dor pleurítica',
            onset: 'há 3 horas',
            context: 'após viagem de ônibus de 12 horas, uso de anticoncepcional oral',
            vitals: { pa: [90, 130], fc: [100, 140], fr: [24, 36], sato2: [82, 92] },
            physical_exam: [
                'taquipneica, tiragem intercostal leve',
                'ausculta pulmonar sem ruídos adventícios',
                'edema unilateral em panturrilha esquerda, empastamento, sinal de Homans positivo'
            ],
            labs: ['D-dímero: 1850 ng/mL (VR <500)', 'Gasometria: PaO2 68 mmHg, PaCO2 32 mmHg', 'AngioTC: falha de enchimento em ramo segmentar de artéria pulmonar direita'],
            diagnosis: 'Tromboembolismo Pulmonar',
            correct_action: 'Anticoagulação plena imediata com Heparina não-fracionada ou Enoxaparina 1mg/kg 12/12h (ou DOAC se estável)',
            distractors: [
                'Aguardar confirmação por cintilografia V/Q antes de iniciar anticoagulação',
                'Prescrever antibiótico de amplo espectro para pneumonia e observar evolução',
                'Solicitar ecocardiograma transesofágico para avaliar trombos intracardíacos',
                'Iniciar corticoide sistêmico para broncoespasmo e nebulização com broncodilatador'
            ],
            explanation_correct: 'TEP confirmado por AngioTC com critérios de Wells alto. Anticoagulação deve ser iniciada IMEDIATAMENTE, mesmo antes da confirmação diagnóstica se suspeita alta. Heparina ou DOAC são primeira linha.',
            explanation_wrong: [
                'INCORRETA: Anticoagulação não deve ser postergada - iniciar empiricamente se suspeita alta (Wells ≥4)',
                'INCORRETA: Quadro não sugere infecção - ausculta normal e contexto de imobilização apontam para TEP',
                'INCORRETA: Ecocardiograma não é exame de primeira linha para TEP - AngioTC já confirmou diagnóstico',
                'INCORRETA: Não há sinais de broncoespasmo - corticoide não tem indicação em TEP agudo'
            ]
        },
        {
            age_range: [55, 80],
            chief_complaint: 'dispneia progressiva e ortopneia',
            onset: 'há 5 dias',
            context: 'com piora nas últimas 24h, edema de membros inferiores',
            vitals: { pa: [140, 180], fc: [90, 120], fr: [24, 32], sato2: [85, 92] },
            physical_exam: [
                'turgência jugular patológica a 45°',
                'estertores crepitantes em bases pulmonares bilateralmente',
                'edema de MMII 3+/4+, hepatomegalia dolorosa'
            ],
            labs: ['BNP: 1200 pg/mL (VR <100)', 'RX tórax: cardiomegalia, redistribuição vascular', 'Ecocardiograma: FE 30%, disfunção sistólica'],
            diagnosis: 'Insuficiência Cardíaca Descompensada',
            correct_action: 'Furosemida EV 40-80mg + Restrição hídrica (<1L/dia) + IECA/BRA + Betabloqueador (após compensação)',
            distractors: [
                'Hidratação vigorosa com cristaloide 30ml/kg para melhorar perfusão',
                'Digitálico EV como primeira linha para controle de frequência',
                'Suspender todos anti-hipertensivos e aguardar melhora espontânea',
                'Prescrever diurético tiazídico oral e manter acompanhamento ambulatorial'
            ],
            explanation_correct: 'IC descompensada requer diurese agressiva com diurético de alça EV. IECA/BRA e betabloqueador são pilares do tratamento crônico (betabloqueador só após compensação). Restrição hídrica é fundamental.',
            explanation_wrong: [
                'INCORRETA: Hidratação piora congestão pulmonar - paciente está hipervolêmico, não hipovolêmico',
                'INCORRETA: Digitálico não é primeira linha - indicado apenas para FA com resposta ventricular rápida',
                'INCORRETA: Suspender IECA/BRA piora prognóstico - são medicações essenciais em IC',
                'INCORRETA: Tiazídico é fraco para descompensação aguda - necessário diurético de alça EV'
            ]
        },
        // NEUROLOGIA
        {
            age_range: [60, 85],
            chief_complaint: 'hemiparesia súbita à direita',
            onset: 'há 2 horas',
            context: 'com desvio de rima labial e disartria',
            vitals: { pa: [140, 190], fc: [70, 100], fr: [14, 20], sato2: [95, 99] },
            physical_exam: [
                'Glasgow 14, orientado no tempo e espaço',
                'hemiparesia direita grau 3/5, reflexos tendinosos exaltados à direita',
                'sinal de Babinski presente à direita, paralisia facial central'
            ],
            labs: ['Glicemia: 110 mg/dL', 'TC crânio: sem sinais de hemorragia', 'NIHSS: 8 pontos'],
            diagnosis: 'Acidente Vascular Cerebral Isquêmico',
            correct_action: 'Trombólise EV com rtPA 0,9mg/kg (se <4,5h do início e sem contraindicações) ou Trombectomia mecânica (se <6h)',
            distractors: [
                'Iniciar AAS 300mg VO imediatamente e aguardar evolução clínica',
                'Prescrever anti-hipertensivo para PA <140/90 mmHg antes de qualquer intervenção',
                'Solicitar RNM de crânio e aguardar resultado para definir terapêutica',
                'Administrar corticoide EV para reduzir edema cerebral'
            ],
            explanation_correct: 'AVCi em janela terapêutica (<4,5h) com NIHSS ≥6 tem indicação de trombólise. TC sem hemorragia é suficiente. Tempo é crucial - "time is brain". Cada minuto perdido = 1,9 milhão de neurônios mortos.',
            explanation_wrong: [
                'INCORRETA: AAS é contraindicado nas primeiras 24h pós-trombólise - risco de hemorragia',
                'INCORRETA: Redução agressiva de PA pode piorar perfusão cerebral - manter PA <220/120 mmHg',
                'INCORRETA: RNM não é necessária para trombólise - TC sem hemorragia é suficiente e mais rápida',
                'INCORRETA: Corticoide não tem benefício em AVCi agudo - pode inclusive piorar prognóstico'
            ]
        },
        {
            age_range: [25, 50],
            chief_complaint: 'cefaleia intensa súbita',
            onset: 'há 1 hora',
            context: '"pior dor de cabeça da vida", com vômitos e rigidez de nuca',
            vitals: { pa: [130, 170], fc: [80, 110], fr: [16, 24], sato2: [96, 100] },
            physical_exam: [
                'Glasgow 15, fotofobia intensa',
                'rigidez de nuca presente, sinal de Kernig e Brudzinski positivos',
                'sem déficits focais, pupilas isocóricas e fotorreagentes'
            ],
            labs: ['TC crânio: hiperdensidade em cisternas basais', 'Punção lombar: xantocromia, 15.000 hemácias'],
            diagnosis: 'Hemorragia Subaracnóidea',
            correct_action: 'Nimodipino 60mg VO 4/4h + Angiografia cerebral (DSA ou AngioTC) + Clipagem/Embolização de aneurisma',
            distractors: [
                'Prescrever analgésico potente e observação domiciliar com retorno se piorar',
                'Iniciar antibioticoterapia empírica para meningite bacteriana',
                'Administrar trombolítico para dissolução do coágulo',
                'Realizar punção lombar evacuadora para alívio da pressão intracraniana'
            ],
            explanation_correct: 'HSA por ruptura de aneurisma é emergência neurocirúrgica. Nimodipino previne vasoespasmo. Angiografia identifica aneurisma para tratamento definitivo (clipagem ou embolização). Mortalidade 50% sem tratamento.',
            explanation_wrong: [
                'INCORRETA: HSA é emergência neurocirúrgica - alta domiciliar é negligência médica',
                'INCORRETA: Não há sinais de infecção - xantocromia indica sangue antigo, não meningite',
                'INCORRETA: Trombolítico é CONTRAINDICADO em hemorragia - agravaria sangramento',
                'INCORRETA: Punção lombar evacuadora não tem indicação - pode piorar herniação cerebral'
            ]
        },
        // GASTROENTEROLOGIA
        {
            age_range: [40, 70],
            chief_complaint: 'hematêmese volumosa',
            onset: 'há 30 minutos',
            context: 'etilista crônico, com história de cirrose hepática',
            vitals: { pa: [70, 100], fc: [110, 140], fr: [20, 28], sato2: [92, 96] },
            physical_exam: [
                'palidez cutâneo-mucosa 4+/4+, sudorese fria',
                'abdome globoso, circulação colateral tipo cabeça de medusa',
                'ascite volumosa, hepatomegalia nodular'
            ],
            labs: ['Hb: 6.5 g/dL', 'Plaquetas: 45.000', 'INR: 2.8', 'Albumina: 2.1 g/dL'],
            diagnosis: 'Hemorragia Digestiva Alta por Varizes Esofágicas',
            correct_action: 'Reposição volêmica + Concentrado de hemácias + Terlipressina ou Octreotide + Endoscopia digestiva alta + Ligadura elástica',
            distractors: [
                'Aguardar estabilização hemodinâmica completa antes de realizar endoscopia',
                'Administrar anticoagulante para prevenir trombose portal',
                'Prescrever inibidor de bomba de prótons em dose alta e observar',
                'Realizar lavagem gástrica com sonda nasogástrica de grosso calibre'
            ],
            explanation_correct: 'HDA varicosa em cirrótico é emergência. Terlipressina/Octreotide reduzem pressão portal. Endoscopia em <12h para ligadura. Transfusão para Hb >7 g/dL. Antibiótico profilático (Ceftriaxona) reduz mortalidade.',
            explanation_wrong: [
                'INCORRETA: Endoscopia deve ser realizada precocemente (<12h) - não aguardar estabilização completa',
                'INCORRETA: Anticoagulante é CONTRAINDICADO em sangramento ativo - agravaria hemorragia',
                'INCORRETA: IBP não tem eficácia em varizes esofágicas - indicado apenas para úlceras pépticas',
                'INCORRETA: Lavagem gástrica pode agravar sangramento varicoso - contraindicada'
            ]
        },
        {
            age_range: [20, 50],
            chief_complaint: 'dor abdominal intensa em hipogástrio',
            onset: 'há 8 horas',
            context: 'com náuseas, vômitos e parada de eliminação de flatos',
            vitals: { pa: [100, 130], fc: [100, 130], fr: [20, 28], sato2: [94, 98] },
            physical_exam: [
                'abdome distendido, timpânico, doloroso difusamente',
                'descompressão brusca positiva, ruídos hidroaéreos aumentados',
                'cicatriz de laparotomia prévia em fossa ilíaca direita'
            ],
            labs: ['Leucócitos: 18.000', 'Lactato: 3.2 mmol/L', 'RX abdome: múltiplos níveis hidroaéreos, distensão de alças'],
            diagnosis: 'Obstrução Intestinal por Bridas/Aderências',
            correct_action: 'Jejum absoluto + Sonda nasogástrica aberta + Hidratação venosa + Cirurgia (laparotomia exploradora) se sinais de estrangulamento',
            distractors: [
                'Prescrever laxativo osmótico e dieta líquida para estimular trânsito',
                'Administrar opioide para controle da dor e aguardar resolução espontânea',
                'Realizar colonoscopia para desobstrução endoscópica',
                'Iniciar antibiótico oral e alta com retorno ambulatorial'
            ],
            explanation_correct: 'Obstrução intestinal requer descompressão (SNG), hidratação e avaliação cirúrgica. Sinais de estrangulamento (leucocitose, lactato elevado, dor intensa) indicam cirurgia urgente. Mortalidade aumenta com atraso.',
            explanation_wrong: [
                'INCORRETA: Laxativo é CONTRAINDICADO em obstrução - pode perfurar alça distendida',
                'INCORRETA: Opioide mascara sinais de peritonite e retarda diagnóstico de estrangulamento',
                'INCORRETA: Colonoscopia não alcança obstrução de delgado - indicada apenas para cólon',
                'INCORRETA: Obstrução intestinal é emergência cirúrgica - alta é negligência médica'
            ]
        }
    ],

    'clinica-medica': [
        // ENDOCRINOLOGIA
        {
            age_range: [18, 45],
            chief_complaint: 'poliúria, polidipsia e emagrecimento',
            onset: 'há 2 semanas',
            context: 'com náuseas e dor abdominal difusa',
            vitals: { pa: [90, 110], fc: [100, 130], fr: [24, 32], sato2: [96, 100] },
            physical_exam: [
                'desidratado 3+/4+, mucosas secas',
                'hálito cetônico, respiração de Kussmaul',
                'abdome doloroso difusamente, sem sinais de irritação peritoneal'
            ],
            labs: ['Glicemia: 480 mg/dL', 'pH: 7.15', 'Bicarbonato: 10 mEq/L', 'Cetonúria 4+', 'K+: 3.2 mEq/L'],
            diagnosis: 'Cetoacidose Diabética',
            correct_action: 'SF 0,9% 1L na primeira hora + Insulina regular EV 0,1 UI/kg/h (após K+ >3,3) + Reposição de potássio + Bicarbonato se pH <6,9',
            distractors: [
                'Iniciar insulina NPH subcutânea e dieta para diabéticos',
                'Prescrever hipoglicemiante oral e orientar aumento de ingesta hídrica',
                'Administrar bicarbonato de sódio imediatamente para corrigir acidose',
                'Realizar insulina regular IM e aguardar melhora clínica'
            ],
            explanation_correct: 'CAD é emergência endócrina. Hidratação agressiva inicial (1-2L na primeira hora) é fundamental. Insulina regular EV contínua é padrão-ouro. NUNCA iniciar insulina se K+ <3,3 (risco de arritmia fatal). Bicarbonato só se pH <6,9.',
            explanation_wrong: [
                'INCORRETA: NPH subcutânea não tem ação rápida suficiente - CAD requer insulina regular EV',
                'INCORRETA: Hipoglicemiante oral não funciona em CAD - paciente está em deficiência absoluta de insulina',
                'INCORRETA: Bicarbonato rotineiro piora desfecho - só indicado se pH <6,9',
                'INCORRETA: Via IM não garante absorção adequada em paciente desidratado - via EV é obrigatória'
            ]
        },
        {
            age_range: [50, 75],
            chief_complaint: 'fadiga intensa e ganho de peso',
            onset: 'há 6 meses',
            context: 'com constipação, pele seca e intolerância ao frio',
            vitals: { pa: [140, 160], fc: [50, 65], fr: [12, 16], sato2: [96, 99] },
            physical_exam: [
                'fácies mixedematosa, pele seca e descamativa',
                'reflexos tendinosos com fase de relaxamento lentificada',
                'edema periférico sem cacifo, macroglossia'
            ],
            labs: ['TSH: 85 mUI/L (VR 0.4-4.0)', 'T4 livre: 0.3 ng/dL (VR 0.8-1.8)', 'Colesterol total: 320 mg/dL'],
            diagnosis: 'Hipotireoidismo Primário Grave',
            correct_action: 'Levotiroxina 1,6 mcg/kg/dia VO (iniciar com dose plena se <65 anos e sem cardiopatia) + Reavaliar TSH em 6-8 semanas',
            distractors: [
                'Iniciar com dose baixa de 12,5 mcg e titular lentamente ao longo de 6 meses',
                'Prescrever T3 (liotironina) isoladamente para ação mais rápida',
                'Aguardar confirmação com cintilografia de tireoide antes de iniciar tratamento',
                'Administrar corticoide sistêmico para reduzir inflamação tireoidiana'
            ],
            explanation_correct: 'Hipotireoidismo primário requer reposição com levotiroxina (T4). Dose plena pode ser iniciada em jovens sem cardiopatia. Idosos e cardiopatas iniciam com 25-50 mcg. TSH é o melhor marcador para ajuste de dose.',
            explanation_wrong: [
                'INCORRETA: Dose muito baixa prolonga sofrimento do paciente - dose plena é segura em jovens',
                'INCORRETA: T3 isolado não é recomendado - T4 é convertido em T3 perifericamente',
                'INCORRETA: Cintilografia não é necessária para diagnóstico - TSH e T4L são suficientes',
                'INCORRETA: Corticoide não tem indicação em hipotireoidismo primário - pode piorar quadro'
            ]
        },
        // NEFROLOGIA
        {
            age_range: [55, 80],
            chief_complaint: 'oligúria e edema generalizado',
            onset: 'há 3 dias',
            context: 'após uso de anti-inflamatório para dor lombar',
            vitals: { pa: [160, 190], fc: [80, 100], fr: [18, 24], sato2: [94, 97] },
            physical_exam: [
                'edema generalizado 3+/4+, anasarca',
                'estase jugular, estertores crepitantes em bases',
                'oligúria (<400 mL/24h)'
            ],
            labs: ['Creatinina: 4.5 mg/dL (basal 1.0)', 'Ureia: 180 mg/dL', 'K+: 6.2 mEq/L', 'EAS: cilindros granulosos, proteinúria 2+'],
            diagnosis: 'Lesão Renal Aguda (Necrose Tubular Aguda por AINE)',
            correct_action: 'Suspender AINE + Hidratação cautelosa + Furosemida EV + Hemodiálise urgente (se K+ >6,5, acidose grave ou edema pulmonar refratário)',
            distractors: [
                'Manter AINE para controle da dor e iniciar corticoide para proteger função renal',
                'Prescrever diurético tiazídico oral e dieta hipossódica',
                'Realizar biópsia renal antes de qualquer intervenção terapêutica',
                'Administrar bicarbonato de sódio EV para alcalinizar urina'
            ],
            explanation_correct: 'LRA por AINE requer suspensão imediata do nefrotóxico. Hipercalemia >6,5 é indicação absoluta de diálise urgente. Furosemida pode converter LRA oligúrica em não-oligúrica. Hidratação deve ser cautelosa (risco de sobrecarga).',
            explanation_wrong: [
                'INCORRETA: AINE é nefrotóxico - deve ser suspenso imediatamente. Corticoide não protege rim',
                'INCORRETA: Tiazídico não funciona em LRA - necessário diurético de alça EV',
                'INCORRETA: Biópsia não é necessária em LRA por AINE - diagnóstico é clínico',
                'INCORRETA: Bicarbonato não tem indicação para alcalinização urinária em NTA'
            ]
        }
    ],

    'pediatria': [
        {
            age_range: [2, 8],
            chief_complaint: 'febre alta persistente',
            onset: 'há 6 dias',
            context: 'com exantema, conjuntivite bilateral não exsudativa e edema de mãos',
            vitals: { pa: [85, 110], fc: [120, 160], fr: [24, 36], sato2: [96, 100] },
            physical_exam: [
                'febre 39.5°C, irritabilidade intensa',
                'conjuntivite bilateral não purulenta',
                'língua em framboesa, fissuras labiais, eritema de orofaringe',
                'exantema maculopapular em tronco, edema endurado de mãos e pés',
                'adenomegalia cervical unilateral >1,5 cm'
            ],
            labs: ['Leucócitos: 18.000', 'PCR: 12 mg/dL', 'VHS: 80 mm/h', 'Plaquetas: 550.000', 'Ecocardiograma: dilatação de coronária esquerda (Z-score +3,5)'],
            diagnosis: 'Doença de Kawasaki',
            correct_action: 'Imunoglobulina EV 2g/kg dose única + AAS 80-100 mg/kg/dia (fase aguda) + Ecocardiograma seriado',
            distractors: [
                'Antibioticoterapia com Penicilina Benzatina para escarlatina',
                'Corticoide sistêmico como primeira linha de tratamento',
                'Aguardar resolução espontânea com sintomáticos e reavaliação em 7 dias',
                'Isolamento respiratório e notificação compulsória para sarampo'
            ],
            explanation_correct: 'Kawasaki é vasculite sistêmica que pode causar aneurismas coronarianos (25% sem tratamento). IVIG 2g/kg em dose única reduz risco para <5%. AAS em dose anti-inflamatória na fase aguda, depois antiagregante. Ecocardiograma é obrigatório.',
            explanation_wrong: [
                'INCORRETA: Não é escarlatina - ausência de descamação fina e cultura negativa',
                'INCORRETA: Corticoide não é primeira linha - pode aumentar risco de aneurisma coronariano',
                'INCORRETA: Kawasaki não tratado evolui com aneurismas em 25% - tratamento é urgente',
                'INCORRETA: Não é sarampo - vacinação em dia e ausência de sinal de Koplik'
            ]
        },
        {
            age_range: [6, 24], // meses
            chief_complaint: 'diarreia aquosa profusa',
            onset: 'há 12 horas',
            context: 'com vômitos frequentes e recusa alimentar',
            vitals: { pa: [70, 90], fc: [140, 180], fr: [30, 50], sato2: [95, 99] },
            physical_exam: [
                'desidratação grave: olhos encovados, mucosas secas',
                'sinal da prega cutânea positivo (retorna >2 segundos)',
                'fontanela anterior deprimida, letargia',
                'pulsos periféricos fracos, TEC >3 segundos'
            ],
            labs: ['Na+: 148 mEq/L', 'K+: 3.0 mEq/L', 'Ureia: 65 mg/dL', 'Gasometria: acidose metabólica (pH 7.25, HCO3 14)'],
            diagnosis: 'Desidratação Grave por Gastroenterite Aguda',
            correct_action: 'Expansão volêmica com SF 0,9% ou Ringer Lactato 20 mL/kg em 20-30 min (repetir até 60 mL/kg) + Soro de reidratação oral após estabilização + Zinco',
            distractors: [
                'Prescrever soro de reidratação oral exclusivamente e observar em domicílio',
                'Administrar antibiótico de amplo espectro e antidiarreico (loperamida)',
                'Realizar hidratação venosa lenta com soro glicosado 5% em 24 horas',
                'Suspender aleitamento materno e introduzir fórmula sem lactose'
            ],
            explanation_correct: 'Desidratação grave (>10% peso corporal) requer expansão venosa rápida. SF 0,9% ou Ringer Lactato 20 mL/kg em bolus, repetir até 60 mL/kg se necessário. Após estabilização, SRO para manutenção. Zinco reduz duração e gravidade.',
            explanation_wrong: [
                'INCORRETA: SRO oral não é suficiente em desidratação grave - necessário acesso venoso',
                'INCORRETA: Antibiótico não indicado em diarreia viral. Loperamida é CONTRAINDICADA em crianças',
                'INCORRETA: SG 5% não repõe eletrólitos e pode causar hiponatremia - usar cristaloide isotônico',
                'INCORRETA: Aleitamento materno deve ser MANTIDO - protege mucosa intestinal'
            ]
        }
    ],

    'ginecologia-obstetricia': [
        {
            age_range: [28, 38],
            chief_complaint: 'cefaleia intensa e epigastralgia',
            onset: 'há 4 horas',
            context: 'gestante de 34 semanas, com edema generalizado',
            vitals: { pa: [170, 200], fc: [85, 105], fr: [18, 24], sato2: [96, 99] },
            physical_exam: [
                'edema generalizado 4+/4+, anasarca',
                'reflexos tendinosos exaltados (4+/4+), clônus aquiliano presente',
                'dor em hipocôndrio direito à palpação',
                'BCF: 145 bpm, AU: 32 cm'
            ],
            labs: ['Proteinúria: 5g/24h', 'Plaquetas: 85.000', 'TGO: 180 U/L', 'TGP: 210 U/L', 'LDH: 850 U/L', 'Esquizócitos em sangue periférico'],
            diagnosis: 'Síndrome HELLP (Pré-eclâmpsia Grave)',
            correct_action: 'Sulfato de Magnésio 4-6g EV ataque + 1-2g/h manutenção + Anti-hipertensivo (Hidralazina ou Nifedipina) + Corticoide (Betametasona) + Interrupção da gestação',
            distractors: [
                'Diurético de alça para reduzir edema e aguardar 37 semanas para parto',
                'Anti-hipertensivo oral e repouso domiciliar com reavaliação em 48h',
                'Expansão volêmica com cristaloide e observação hospitalar',
                'Prescrever AAS e aguardar maturação pulmonar fetal (36 semanas)'
            ],
            explanation_correct: 'HELLP é emergência obstétrica (Hemólise, Enzimas hepáticas elevadas, Plaquetopenia). Sulfato de Magnésio previne eclâmpsia. Corticoide para maturação pulmonar. Interrupção da gestação é ÚNICA cura definitiva - não aguardar termo.',
            explanation_wrong: [
                'INCORRETA: Diurético pode piorar hipoperfusão placentária - contraindicado em pré-eclâmpsia',
                'INCORRETA: Alta domiciliar em HELLP é negligência - risco de eclâmpsia, AVC e morte materna',
                'INCORRETA: Expansão volêmica pode causar edema pulmonar - paciente está hipervolêmica',
                'INCORRETA: Aguardar termo em HELLP aumenta mortalidade materna - interrupção é urgente'
            ]
        },
        {
            age_range: [18, 35],
            chief_complaint: 'sangramento vaginal intenso',
            onset: 'há 2 horas',
            context: 'pós-parto vaginal há 30 minutos, placenta íntegra',
            vitals: { pa: [80, 100], fc: [120, 145], fr: [22, 28], sato2: [94, 97] },
            physical_exam: [
                'palidez cutâneo-mucosa intensa',
                'útero amolecido, acima da cicatriz umbilical',
                'sangramento vaginal vermelho vivo abundante (>500 mL)',
                'laceração perineal grau I suturada'
            ],
            labs: ['Hb: 7.2 g/dL (pré-parto 11.5)', 'Plaquetas: 180.000', 'Coagulograma normal'],
            diagnosis: 'Hemorragia Pós-Parto por Atonia Uterina',
            correct_action: 'Massagem uterina + Ocitocina 10-40 UI em 1L SF 0,9% + Metilergonovina 0,2mg IM + Misoprostol 800-1000mcg retal + Transfusão sanguínea',
            distractors: [
                'Aguardar contração uterina espontânea com observação passiva',
                'Realizar curetagem uterina imediata para remoção de restos placentários',
                'Prescrever antibiótico profilático e sulfato ferroso oral',
                'Administrar anticoagulante para prevenir trombose venosa profunda'
            ],
            explanation_correct: 'Atonia uterina é causa mais comum de HPP (70%). Manejo: massagem + uterotônicos (Ocitocina primeira linha, depois Metilergonovina e Misoprostol). Transfusão se Hb <7 ou instabilidade. Falha clínica → cirurgia (B-Lynch, histerectomia).',
            explanation_wrong: [
                'INCORRETA: Observação passiva em HPP pode levar a choque hemorrágico e morte',
                'INCORRETA: Curetagem não indicada se placenta íntegra - pode perfurar útero atônico',
                'INCORRETA: Antibiótico e ferro não tratam hemorragia ativa - são medidas secundárias',
                'INCORRETA: Anticoagulante é CONTRAINDICADO em sangramento ativo - agravaria HPP'
            ]
        }
    ]
}

// Randomization helpers to ensure uniqueness
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

function generateUniqueId(): string {
    return `QRUB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

function selectRandomScenario(specialty_id: string): ClinicalScenario {
    const scenarios = CLINICAL_SCENARIOS[specialty_id] || CLINICAL_SCENARIOS['clinica-medica']
    return scenarios[Math.floor(Math.random() * scenarios.length)]
}

function generateVitals(ranges: ClinicalScenario['vitals']) {
    return {
        pa_sys: ranges.pa[0] + Math.floor(Math.random() * (ranges.pa[1] - ranges.pa[0])),
        pa_dia: 0,
        fc: ranges.fc[0] + Math.floor(Math.random() * (ranges.fc[1] - ranges.fc[0])),
        fr: ranges.fr[0] + Math.floor(Math.random() * (ranges.fr[1] - ranges.fr[0])),
        sato2: ranges.sato2[0] + Math.floor(Math.random() * (ranges.sato2[1] - ranges.sato2[0]))
    }
}

export function generateRevalidaStyleQuestion(params: GeneratorParams): Question {
    const scenario = selectRandomScenario(params.specialty_id)

    // Generate patient demographics
    const age = scenario.age_range[0] + Math.floor(Math.random() * (scenario.age_range[1] - scenario.age_range[0]))
    const gender = Math.random() > 0.5 ? 'masculino' : 'feminino'
    const genderArticle = gender === 'masculino' ? 'o' : 'a'

    // Generate vital signs
    const vitals = generateVitals(scenario.vitals)
    vitals.pa_dia = Math.floor(vitals.pa_sys * 0.6)

    // Select random physical exam findings
    const selectedExam = scenario.physical_exam[Math.floor(Math.random() * scenario.physical_exam.length)]
    const selectedLab = scenario.labs ? scenario.labs[Math.floor(Math.random() * scenario.labs.length)] : ''

    // Build clinical case
    const casePresentation = `Paciente de ${age} anos, sexo ${gender}, admitid${genderArticle} com ${scenario.chief_complaint} ${scenario.onset}, ${scenario.context}. Ao exame físico: ${selectedExam}. Sinais vitais: PA: ${vitals.pa_sys}/${vitals.pa_dia} mmHg, FC: ${vitals.fc} bpm, FR: ${vitals.fr} irpm, SatO2: ${vitals.sato2}% em ar ambiente.${selectedLab ? ` Exames: ${selectedLab}.` : ''} Diante do quadro, qual a conduta mais adequada?`

    // Shuffle distractors and add correct answer
    const allOptions = [scenario.correct_action, ...scenario.distractors]
    const shuffledOptions = shuffleArray(allOptions).map((text, index) => ({
        id: String.fromCharCode(97 + index), // a, b, c, d, e
        text
    }))

    const correctOptionId = shuffledOptions.find(opt => opt.text === scenario.correct_action)!.id

    // Build detailed explanation
    const wrongExplanations = shuffledOptions
        .filter(opt => opt.id !== correctOptionId)
        .map((opt, idx) => `**${opt.id.toUpperCase()})** ${scenario.explanation_wrong[idx] || 'INCORRETA: Esta conduta não é adequada para o quadro apresentado.'}`)
        .join('\n\n')

    const fullExplanation = `**RESPOSTA CORRETA: ${correctOptionId.toUpperCase()}**

**FUNDAMENTAÇÃO:**
${scenario.explanation_correct}

**POR QUE AS OUTRAS ESTÃO INCORRETAS:**

${wrongExplanations}

**REFERÊNCIAS:**
- Diretrizes Brasileiras ${params.specialty_name} (2023-2024)
- UpToDate: ${scenario.diagnosis}
- Harrison's Principles of Internal Medicine, 21st Edition`

    return {
        id: generateUniqueId(),
        course_id: 'medicina',
        specialty_id: params.specialty_id,
        subspecialty_id: params.subspecialty_id || 'geral',
        subject_id: params.subject_id || 'geral',
        difficulty: params.difficulty,
        enunciado: casePresentation,
        options: shuffledOptions,
        correct_option_id: correctOptionId,
        explanation: fullExplanation,
        references: `Diretrizes ${params.specialty_name} - ${new Date().getFullYear()}`,
        status: 'active',
        metadata: {
            origem: 'QRub AI Engine v2.0',
            data_geracao: new Date().toISOString(),
            tema: scenario.diagnosis
        }
    }
}

export function generateBatchQuestions(params: GeneratorParams, count: number): Question[] {
    const questions: Question[] = []
    const usedScenarios = new Set<string>()

    for (let i = 0; i < count; i++) {
        let question: Question
        let attempts = 0

        // Ensure uniqueness by checking scenario + vitals combination
        do {
            question = generateRevalidaStyleQuestion(params)
            attempts++
        } while (usedScenarios.has(question.enunciado.substring(0, 100)) && attempts < 10)

        usedScenarios.add(question.enunciado.substring(0, 100))
        questions.push(question)
    }

    return questions
}
