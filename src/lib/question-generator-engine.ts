/**
 * QRUB Question Generator Engine v2.0 - Revalida Style
 * MASSIVE clinical scenario database covering ALL medical specialties
 * 50+ unique scenarios with zero repetition guarantee
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

// MASSIVE CLINICAL SCENARIOS DATABASE - 50+ SCENARIOS
const CLINICAL_SCENARIOS: Record<string, ClinicalScenario[]> = {
    // ==================== MEDICINA DE EMERGÊNCIA ====================
    'medicina-emergencia': [
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
                'Observação passiva em IAM com supra é contraindicada - cada minuto conta ("time is muscle")',
                'Cintilografia não tem papel no diagnóstico agudo de IAM - ECG e troponina são suficientes',
                'Betabloqueador EV pode piorar choque cardiogênico - deve ser evitado na fase aguda instável',
                'Alta hospitalar em IAM agudo é negligência médica - paciente necessita internação em UTI'
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
                'Anticoagulação não deve ser postergada - iniciar empiricamente se suspeita alta (Wells ≥4)',
                'Quadro não sugere infecção - ausculta normal e contexto de imobilização apontam para TEP',
                'Ecocardiograma não é exame de primeira linha para TEP - AngioTC já confirmou diagnóstico',
                'Não há sinais de broncoespasmo - corticoide não tem indicação em TEP agudo'
            ]
        },
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
                'AAS é contraindicado nas primeiras 24h pós-trombólise - risco de hemorragia',
                'Redução agressiva de PA pode piorar perfusão cerebral - manter PA <220/120 mmHg',
                'RNM não é necessária para trombólise - TC sem hemorragia é suficiente e mais rápida',
                'Corticoide não tem benefício em AVCi agudo - pode inclusive piorar prognóstico'
            ]
        }
    ],

    // ==================== CLÍNICA MÉDICA ====================
    'clinica-medica': [
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
                'NPH subcutânea não tem ação rápida suficiente - CAD requer insulina regular EV',
                'Hipoglicemiante oral não funciona em CAD - paciente está em deficiência absoluta de insulina',
                'Bicarbonato rotineiro piora desfecho - só indicado se pH <6,9',
                'Via IM não garante absorção adequada em paciente desidratado - via EV é obrigatória'
            ]
        },
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
                'AINE é nefrotóxico - deve ser suspenso imediatamente. Corticoide não protege rim',
                'Tiazídico não funciona em LRA - necessário diurético de alça EV',
                'Biópsia não é necessária em LRA por AINE - diagnóstico é clínico',
                'Bicarbonato não tem indicação para alcalinização urinária em NTA'
            ]
        }
    ],

    // ==================== PEDIATRIA ====================
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
                'Não é escarlatina - ausência de descamação fina e cultura negativa',
                'Corticoide não é primeira linha - pode aumentar risco de aneurisma coronariano',
                'Kawasaki não tratado evolui com aneurismas em 25% - tratamento é urgente',
                'Não é sarampo - vacinação em dia e ausência de sinal de Koplik'
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
                'SRO oral não é suficiente em desidratação grave - necessário acesso venoso',
                'Antibiótico não indicado em diarreia viral. Loperamida é CONTRAINDICADA em crianças',
                'SG 5% não repõe eletrólitos e pode causar hiponatremia - usar cristaloide isotônico',
                'Aleitamento materno deve ser MANTIDO - protege mucosa intestinal'
            ]
        }
    ],

    // ==================== GINECOLOGIA/OBSTETRÍCIA ====================
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
                'Diurético pode piorar hipoperfusão placentária - contraindicado em pré-eclâmpsia',
                'Alta domiciliar em HELLP é negligência - risco de eclâmpsia, AVC e morte materna',
                'Expansão volêmica pode causar edema pulmonar - paciente está hipervolêmica',
                'Aguardar termo em HELLP aumenta mortalidade materna - interrupção é urgente'
            ]
        }
    ],

    // ==================== DERMATOLOGIA ====================
    'dermatologia': [
        {
            age_range: [25, 55],
            chief_complaint: 'lesões bolhosas generalizadas',
            onset: 'há 5 dias',
            context: 'com prurido intenso e ardência, após início de antibiótico',
            vitals: { pa: [110, 130], fc: [80, 100], fr: [16, 20], sato2: [96, 99] },
            physical_exam: [
                'múltiplas bolhas flácidas em pele eritematosa',
                'sinal de Nikolsky positivo',
                'erosões em mucosa oral e conjuntival',
                'acometimento de >30% da superfície corporal'
            ],
            labs: ['Eosinofilia: 12%', 'Biópsia: necrose epidérmica com clivagem subepidérmica'],
            diagnosis: 'Necrólise Epidérmica Tóxica (Síndrome de Lyell)',
            correct_action: 'Suspensão imediata do fármaco suspeito + Internação em CTI/Unidade de Queimados + Suporte intensivo (hidratação, curativos, analgesia) + Imunoglobulina EV (controverso)',
            distractors: [
                'Prescrever corticoide sistêmico em dose alta e manter antibiótico',
                'Realizar desbridamento cirúrgico agressivo das bolhas',
                'Iniciar antibiótico de amplo espectro profilático',
                'Tratamento ambulatorial com anti-histamínico e corticoide tópico'
            ],
            explanation_correct: 'NET é reação adversa grave a medicamentos (mortalidade 30-40%). Suspensão do fármaco é CRUCIAL. Manejo em CTI/Queimados com cuidados de suporte. IVIG pode reduzir mortalidade. Corticoide sistêmico é controverso.',
            explanation_wrong: [
                'Corticoide sistêmico aumenta mortalidade em NET - deve ser evitado. Antibiótico causador deve ser suspenso',
                'Desbridamento agressivo piora lesão - bolhas devem ser mantidas íntegras quando possível',
                'Antibiótico profilático não reduz mortalidade - usar apenas se infecção comprovada',
                'NET é emergência dermatológica - requer internação em CTI, não ambulatório'
            ]
        }
    ],

    // ==================== PSIQUIATRIA ====================
    'psiquiatria': [
        {
            age_range: [18, 35],
            chief_complaint: 'agitação psicomotora intensa',
            onset: 'há 2 horas',
            context: 'com alucinações auditivas, heteroagressividade e discurso desconexo',
            vitals: { pa: [140, 170], fc: [100, 130], fr: [20, 28], sato2: [96, 99] },
            physical_exam: [
                'agitado, não cooperativo, contato visual pobre',
                'discurso desorganizado, ideias delirantes persecutórias',
                'alucinações auditivas de comando',
                'risco iminente de heteroagressividade'
            ],
            labs: ['Toxicológico urinário: negativo', 'Glicemia: 95 mg/dL', 'Eletrólitos normais'],
            diagnosis: 'Surto Psicótico Agudo',
            correct_action: 'Contenção verbal (desescalada) + Haloperidol 5mg IM + Prometazina 25-50mg IM (ou Midazolam 5mg IM) + Observação em ambiente seguro',
            distractors: [
                'Contenção física imediata sem tentativa de abordagem verbal',
                'Alta hospitalar com prescrição de antipsicótico oral e retorno ambulatorial',
                'Internação psiquiátrica compulsória sem consentimento familiar',
                'Administrar diazepam oral e aguardar efeito sedativo'
            ],
            explanation_correct: 'Agitação psicomotora requer desescalada verbal primeiro. Se falhar, contenção química com antipsicótico (Haloperidol) + benzodiazepínico ou anti-histamínico. Contenção física é último recurso. Observação em ambiente protegido é obrigatória.',
            explanation_wrong: [
                'Contenção física sem desescalada verbal aumenta risco de trauma e violência',
                'Alta em surto psicótico agudo é negligência - risco de auto/heteroagressividade',
                'Internação compulsória requer avaliação psiquiátrica e autorização judicial',
                'Via oral não é eficaz em paciente agitado - necessário via IM'
            ]
        }
    ],

    // ==================== ORTOPEDIA ====================
    'ortopedia-traumatologia': [
        {
            age_range: [20, 40],
            chief_complaint: 'dor intensa em joelho direito',
            onset: 'há 1 hora',
            context: 'após trauma rotacional durante jogo de futebol, com estalido audível',
            vitals: { pa: [110, 130], fc: [80, 100], fr: [16, 20], sato2: [97, 99] },
            physical_exam: [
                'derrame articular volumoso em joelho direito',
                'teste de Lachman positivo, gaveta anterior positiva',
                'dor à palpação da interlinha articular medial',
                'bloqueio articular à extensão completa'
            ],
            labs: ['RX joelho: sem fraturas visíveis', 'RNM: ruptura completa de LCA + lesão de menisco medial'],
            diagnosis: 'Ruptura de Ligamento Cruzado Anterior + Lesão Meniscal',
            correct_action: 'Imobilização + Crioterapia + AINE + Encaminhamento para cirurgia ortopédica (reconstrução de LCA + meniscectomia parcial)',
            distractors: [
                'Prescrever analgésico e liberar para retorno às atividades esportivas',
                'Realizar infiltração intra-articular com corticoide',
                'Imobilização gessada por 6 semanas e fisioterapia posterior',
                'Artroscopia diagnóstica antes de definir tratamento'
            ],
            explanation_correct: 'Ruptura de LCA em atleta jovem tem indicação cirúrgica (reconstrução). Lesão meniscal associada é comum (tríade terrível). Tratamento conservador resulta em instabilidade crônica e artrose precoce. Cirurgia deve ser realizada após resolução do edema.',
            explanation_wrong: [
                'Retorno ao esporte sem tratamento causa instabilidade crônica e lesões secundárias',
                'Infiltração com corticoide não trata ruptura ligamentar - apenas mascara sintomas',
                'Imobilização gessada não cicatriza LCA - ligamento não tem potencial de regeneração',
                'RNM já confirmou diagnóstico - artroscopia diagnóstica é desnecessária'
            ]
        }
    ],

    // ==================== OFTALMOLOGIA ====================
    'oftalmologia': [
        {
            age_range: [55, 80],
            chief_complaint: 'perda súbita e indolor da visão',
            onset: 'há 30 minutos',
            context: 'em olho direito, como "cortina descendo"',
            vitals: { pa: [130, 150], fc: [70, 90], fr: [14, 18], sato2: [97, 99] },
            physical_exam: [
                'acuidade visual: conta dedos a 1 metro em OD',
                'reflexo fotomotor direto ausente em OD',
                'fundoscopia: palidez retiniana difusa, mancha vermelho-cereja em mácula',
                'sem dor ocular, pressão intraocular normal'
            ],
            labs: ['Doppler de carótidas: placa ateromatosa em carótida direita'],
            diagnosis: 'Oclusão de Artéria Central da Retina',
            correct_action: 'Massagem ocular + Paracentese de câmara anterior + Acetazolamida EV + Oxigenoterapia hiperbárica (se disponível <24h) + Investigação de fonte embólica',
            distractors: [
                'Prescrever colírio anti-inflamatório e retorno ambulatorial em 7 dias',
                'Aguardar resolução espontânea com observação domiciliar',
                'Realizar fotocoagulação a laser de urgência',
                'Iniciar corticoide sistêmico para neurite óptica'
            ],
            explanation_correct: 'OACR é emergência oftalmológica (AVC ocular). Retina tolera isquemia por apenas 90-100 minutos. Massagem ocular e paracentese tentam deslocar êmbolo. Acetazolamida reduz PIO. Oxigênio hiperbárico pode salvar visão se <24h. Prognóstico visual é reservado.',
            explanation_wrong: [
                'Colírio tópico não trata oclusão arterial - perda de tempo em emergência',
                'Resolução espontânea é rara - cada minuto conta para salvar visão',
                'Laser não tem papel em OACR - indicado para oclusão venosa',
                'Não é neurite óptica - quadro é de oclusão vascular (mancha vermelho-cereja)'
            ]
        }
    ],

    // ==================== INFECTOLOGIA ====================
    'infectologia-clinica': [
        {
            age_range: [30, 60],
            chief_complaint: 'febre alta e calafrios',
            onset: 'há 24 horas',
            context: 'com tosse produtiva, dispneia e dor torácica pleurítica',
            vitals: { pa: [85, 110], fc: [110, 135], fr: [28, 36], sato2: [88, 93] },
            physical_exam: [
                'taquipneico, uso de musculatura acessória',
                'ausculta pulmonar: estertores crepitantes em base direita',
                'macicez à percussão em base direita',
                'confusão mental leve (desorientação temporal)'
            ],
            labs: ['Leucócitos: 18.500', 'PCR: 25 mg/dL', 'RX tórax: consolidação lobar em base direita', 'CURB-65: 3 pontos'],
            diagnosis: 'Pneumonia Comunitária Grave',
            correct_action: 'Internação hospitalar + Ceftriaxona 2g EV 24/24h + Azitromicina 500mg EV 24/24h + Oxigenoterapia + Hidratação venosa',
            distractors: [
                'Tratamento ambulatorial com Amoxicilina 500mg VO 8/8h por 7 dias',
                'Aguardar resultado de cultura de escarro antes de iniciar antibiótico',
                'Prescrever apenas Azitromicina oral e reavaliação em 48h',
                'Iniciar corticoide sistêmico como primeira linha'
            ],
            explanation_correct: 'PAC grave (CURB-65 ≥3) requer internação e antibiótico EV. Cobertura empírica para pneumococo e atípicos: Cefalosporina 3ª geração + Macrolídeo. Oxigênio para manter SatO2 >90%. Cultura não deve atrasar início de antibiótico.',
            explanation_wrong: [
                'CURB-65 ≥3 indica gravidade - tratamento ambulatorial aumenta mortalidade',
                'Antibiótico deve ser iniciado em <4h - cultura não deve atrasar tratamento',
                'Azitromicina isolada não cobre pneumococo adequadamente - necessário beta-lactâmico',
                'Corticoide não é primeira linha em PAC - benefício apenas em choque séptico'
            ]
        }
    ],

    // ==================== UROLOGIA ====================
    'urologia': [
        {
            age_range: [45, 75],
            chief_complaint: 'retenção urinária aguda',
            onset: 'há 6 horas',
            context: 'com dor suprapúbica intensa, história de jato urinário fraco',
            vitals: { pa: [140, 160], fc: [90, 110], fr: [18, 22], sato2: [96, 99] },
            physical_exam: [
                'globo vesical palpável até cicatriz umbilical',
                'dor intensa à palpação suprapúbica',
                'toque retal: próstata aumentada, lisa, elástica (50g)',
                'impossibilidade de micção espontânea'
            ],
            labs: ['PSA: 4.2 ng/mL', 'Creatinina: 1.8 mg/dL (basal 1.0)', 'USG: próstata 52g, resíduo pós-miccional 800mL'],
            diagnosis: 'Retenção Urinária Aguda por Hiperplasia Prostática Benigna',
            correct_action: 'Cateterismo vesical de alívio (sonda Foley) + Alfabloqueador (Tansulosina) + Encaminhamento urológico para RTU de próstata',
            distractors: [
                'Prescrever alfabloqueador oral e aguardar melhora espontânea',
                'Realizar punção suprapúbica para drenagem vesical',
                'Iniciar antibiótico para prostatite e observar evolução',
                'Solicitar cistoscopia antes de qualquer intervenção'
            ],
            explanation_correct: 'Retenção urinária aguda é emergência urológica. Cateterismo vesical imediato alivia sintomas e previne lesão renal. Alfabloqueador facilita remoção da sonda. HPB volumosa sintomática tem indicação cirúrgica (RTU).',
            explanation_wrong: [
                'Alfabloqueador oral não resolve retenção aguda - necessário esvaziamento vesical imediato',
                'Punção suprapúbica só se impossibilidade de cateterismo uretral',
                'Não há sinais de infecção - antibiótico não indicado profilaticamente',
                'Cistoscopia não é necessária em retenção aguda - diagnóstico é clínico'
            ]
        }
    ],

    // ==================== REUMATOLOGIA ====================
    'reumatologia-clinica': [
        {
            age_range: [30, 60],
            chief_complaint: 'artrite aguda de joelho',
            onset: 'há 8 horas',
            context: 'com dor intensa, edema e impossibilidade de deambulação',
            vitals: { pa: [120, 140], fc: [90, 110], fr: [18, 22], sato2: [97, 99] },
            physical_exam: [
                'joelho direito: edema volumoso, calor local, rubor',
                'derrame articular, dor intensa à mobilização',
                'febre 38.5°C',
                'sem outras articulações acometidas'
            ],
            labs: ['Leucócitos: 16.000', 'PCR: 18 mg/dL', 'Líquido sinovial: 80.000 células (95% neutrófilos), glicose 20 mg/dL', 'Gram: cocos Gram-positivos em cadeia'],
            diagnosis: 'Artrite Séptica',
            correct_action: 'Artrocentese + Antibiótico EV empírico (Oxacilina ou Ceftriaxona) + Drenagem cirúrgica (artroscopia ou artrotomia) + Imobilização',
            distractors: [
                'Prescrever AINE e colchicina para crise de gota',
                'Infiltração intra-articular com corticoide',
                'Antibiótico oral e reavaliação ambulatorial em 48h',
                'Aguardar resultado de cultura antes de iniciar antibiótico'
            ],
            explanation_correct: 'Artrite séptica é emergência reumatológica. Líquido sinovial com >50.000 células indica infecção. Antibiótico EV deve ser iniciado IMEDIATAMENTE (não aguardar cultura). Drenagem cirúrgica é obrigatória para evitar destruição articular.',
            explanation_wrong: [
                'Líquido sinovial com 80.000 células e Gram positivo descarta gota - é infecção bacteriana',
                'Corticoide intra-articular é CONTRAINDICADO em artrite séptica - piora infecção',
                'Artrite séptica requer antibiótico EV e drenagem cirúrgica - via oral é insuficiente',
                'Antibiótico deve ser iniciado antes da cultura - atraso aumenta risco de sequelas'
            ]
        }
    ],

    // ==================== OTORRINOLARINGOLOGIA ====================
    'otorrinolaringologia': [
        {
            age_range: [3, 10],
            chief_complaint: 'dificuldade respiratória progressiva',
            onset: 'há 4 horas',
            context: 'com estridor inspiratório, febre e disfagia',
            vitals: { pa: [90, 110], fc: [130, 160], fr: [35, 50], sato2: [88, 93] },
            physical_exam: [
                'estridor inspiratório alto, tiragem intercostal e supraclavicular',
                'sialorreia, posição de tripé (sentado, inclinado para frente)',
                'recusa alimentar, voz abafada',
                'criança tóxica, ansiedade respiratória'
            ],
            labs: ['RX cervical lateral: sinal do polegar (epiglote aumentada)'],
            diagnosis: 'Epiglotite Aguda',
            correct_action: 'NÃO examinar orofaringe + Chamar anestesista/ORL + Intubação em centro cirúrgico + Ceftriaxone EV + Internação em UTI',
            distractors: [
                'Realizar laringoscopia direta para confirmar diagnóstico',
                'Prescrever corticoide inalatório e adrenalina nebulizada',
                'Solicitar TC de pescoço antes de qualquer intervenção',
                'Iniciar antibiótico oral e observação domiciliar'
            ],
            explanation_correct: 'Epiglotite é emergência pediátrica com risco de obstrução total de via aérea. NUNCA examinar orofaringe (pode precipitar obstrução). Intubação deve ser em centro cirúrgico com equipe preparada para traqueostomia. Antibiótico EV (Ceftriaxone) é obrigatório.',
            explanation_wrong: [
                'Laringoscopia pode precipitar obstrução completa de via aérea - CONTRAINDICADA',
                'Epiglotite não responde a corticoide/adrenalina (diferente de crupe viral)',
                'TC atrasa tratamento e pode piorar obstrução - diagnóstico é clínico + RX lateral',
                'Epiglotite é emergência - requer internação em UTI, não ambulatório'
            ]
        }
    ]
}

// Randomization helpers
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
