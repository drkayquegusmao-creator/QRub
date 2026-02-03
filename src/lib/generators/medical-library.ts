
export interface StructuralTheme {
    id: string; // ex: "CM-CARD-IAM"
    name: string;
    scenarios: {
        enunciado_template: string;
        diagnostico: string;
        conduta_correta: string;
        distratores: { texto: string; motivo: string }[];
        erros_graves: string[];
        dificuldade: 'moderada' | 'dificil';
    }[];
}

export const MEDICAL_LIBRARY: Record<string, StructuralTheme> = {
    "CM-CARD-IAM": {
        id: "CM-CARD-IAM",
        name: "Síndrome Coronariana Aguda (IAM)",
        scenarios: [
            {
                enunciado_template: "Paciente de 62 anos, sexo masculino, hipertenso e tabagista, chega à emergência com dor precordial em aperto iniciada há 2 horas, irradiada para membro superior esquerdo, acompanhada de sudorese profusa. Ao ECG: supra-desnivelamento do segmento ST em parede anterior.",
                diagnostico: "IAM com supra de ST anterior",
                conduta_correta: "Encaminhar imediatamente para angioplastia primária (estratégia de reperfusão preferencial).",
                distratores: [
                    { texto: "Realizar apenas ECG seriado e aguardar enzimas cardíacas.", motivo: "Atraso inaceitável na reperfusão de IAM com supra." },
                    { texto: "Prescrever analgesia com morfina e liberar para acompanhamento ambulatorial.", motivo: "Subestimar gravidade de evento isquêmico agudo." },
                    { texto: "Iniciar apenas AAS e encaminhar para teste ergométrico.", motivo: "Teste ergométrico é contraindicado na fase aguda do IAM." }
                ],
                erros_graves: ["Atraso fatal na reperfusão miocárdica", "Falha no reconhecimento de emergência cardiológica"],
                dificuldade: "moderada"
            }
        ]
    },
    "PED-NEO-SEPSE": {
        id: "PED-NEO-SEPSE",
        name: "Sepse Neonatal",
        scenarios: [
            {
                enunciado_template: "Recém-nascido com 12 horas de vida apresenta gemência, palidez cutânea e episódios de apneia. Mãe teve ruptura prolongada de membranas (24h) e não realizou profilaxia para GBS.",
                diagnostico: "Sepse Neonatal Precoce",
                conduta_correta: "Coletar hemoculturas e iniciar imediatamente antibioticoterapia empírica (Ampicilina + Gentamicina).",
                distratores: [
                    { texto: "Aguardar resultado de culturas para iniciar antibiótico.", motivo: "Sepse neonatal evolui rápido para choque e óbito." },
                    { texto: "Iniciar apenas fototerapia e observar por 6 horas.", motivo: "Ignora sinais de infecção sistêmica grave." },
                    { texto: "Realizar apenas radiografia de tórax e manter em observação.", motivo: "Insuficiente para tratamento de sepse presumida." }
                ],
                erros_graves: ["Risco de choque séptico e óbito por atraso terapêutico"],
                dificuldade: "moderada"
            }
        ]
    }
};
