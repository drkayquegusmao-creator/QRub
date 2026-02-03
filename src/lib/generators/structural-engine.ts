
import { Question } from '../data-mock'
import { MEDICAL_LIBRARY, StructuralTheme } from './medical-library'

export function generateStructuralQuestion(
    area: { id: string, nome: string },
    subarea: { id: string, nome: string },
    tema: { id: string, nome: string }
): Question {
    const themeData = MEDICAL_LIBRARY[tema.id]

    // Fallback scenario if theme not found
    const scenario = themeData?.scenarios[Math.floor(Math.random() * themeData.scenarios.length)] || {
        enunciado_template: `Questão estrutural sobre ${tema.nome}. Paciente apresenta quadro clínico clássico.`,
        diagnostico: tema.nome,
        conduta_correta: `Conduta baseada no protocolo de ${tema.nome}.`,
        distratores: [
            { texto: "Conduta incorreta 1", motivo: "Erro clínico 1" },
            { texto: "Conduta incorreta 2", motivo: "Erro clínico 2" },
            { texto: "Conduta incorreta 3", motivo: "Erro clínico 3" }
        ],
        erros_graves: ["Falha no manejo de " + tema.nome],
        dificuldade: "moderada" as const
    }

    const alternatives = [
        { id: 'a', text: scenario.conduta_correta },
        { id: 'b', text: scenario.distratores[0].texto },
        { id: 'c', text: scenario.distratores[1].texto },
        { id: 'd', text: scenario.distratores[2].texto }
    ].sort(() => Math.random() - 0.5)

    const correctLetter = alternatives.find(a => a.text === scenario.conduta_correta)?.id || 'a'

    const question: Question = {
        id: `QRUB-EST-${tema.id}-${Math.floor(Math.random() * 1000)}`,
        course_id: 'medicina',
        area_id: area.id,
        subarea_id: subarea.id,
        tema_id: tema.id,
        specialty_id: area.id,
        subspecialty_id: subarea.id,
        subject_id: tema.id,
        difficulty: scenario.dificuldade,
        enunciado: scenario.enunciado_template,
        comando: "Qual a conduta mais adequada?",
        options: alternatives,
        correct_option_id: correctLetter,
        explanation: `Justificativa: O diagnóstico é ${scenario.diagnostico}. ${scenario.conduta_correta}`,
        por_que_nao_as_outras: scenario.distratores.map((d, i) => ({
            letra: ['B', 'C', 'D'][i] || '?', // This is just for the schema, logic uses the alternatives
            motivo: d.motivo
        })),
        erros_graves: scenario.erros_graves,
        fonte: 'estrutural',
        status_validacao: 'PENDENTE',
        tag_transversal: [],
        created_at: new Date().toISOString()
    }

    return question
}
