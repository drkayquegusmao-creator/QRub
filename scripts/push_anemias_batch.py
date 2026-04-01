
import json
import uuid
import requests
import os

def load_env(filepath):
    env_vars = {}
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    k, v = line.strip().split('=', 1)
                    env_vars[k] = v.strip('"')
    return env_vars

def push_lot_to_supabase(questions_data, package_id):
    env = load_env('.env.local')
    url = env.get('NEXT_PUBLIC_SUPABASE_URL')
    key = env.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    for q in questions_data:
        q_id = str(uuid.uuid4())
        payload = {
            "id": q_id,
            "course_id": "medicina",
            "specialty_id": "clinica-medica",
            "subspecialty_id": "hematologia",
            "subject_id": q.get('subject', 'anemias').lower().replace(' ', '-'),
            "difficulty": q.get('difficulty', 'moderada'),
            "enunciado": q.get('enunciado'),
            "options": q.get('options'),
            "correct_option_id": q.get('answer'),
            "explanation": q.get('rationale'),
            "alternative_explanations": q.get('option_rationales'),
            "status": "published",
            "metadata": {"batch": package_id, "style": "FGV"}
        }
        
        # Insert question
        resp = requests.post(f"{url}/rest/v1/questao_base", headers=headers, json=payload)
        if resp.status_code not in [200, 201]:
            print(f"Error inserting question: {resp.text}")
            continue
            
        # Link to package
        link_payload = {"package_id": package_id, "question_id": q_id}
        requests.post(f"{url}/rest/v1/package_questions", headers=headers, json=link_payload)

    print(f"Successfully processed {len(questions_data)} questions.")

if __name__ == "__main__":
    package_id = "45f9f5ee-fb49-4cdd-bd08-a147c6cbcaf9"
    questions = [
        # 1
        {
            "enunciado": "Um homem de 58 anos, portador de insuficiência renal crônica estágio 4 (ritmo de filtração glomerular estimado de 22 mL/min/1.73m²), queixa-se de cansaço progressivo e dispneia leve aos grandes esforços. O hemograma demonstra: Hemoglobina 9,4 g/dL; VCM 88 fL; Reticulócitos 0,5%. O perfil de ferro mostra: Ferro sérico 40 mcg/dL; Ferritina 180 ng/mL; Saturação de transferrina 22%. Sobre o manejo terapêutico inicial desta anemia, deve-se considerar:",
            "options": {
                "a": "Iniciar eritropoetina recombinante imediatamente para atingir alvo de Hb > 13 g/dL.",
                "b": "Suplementar ferro para manter a saturação de transferrina > 30% e ferritina > 200 ng/mL antes de iniciar estimulantes da eritropoese.",
                "c": "Realizar transfusão de concentrado de hemácias profilaticamente.",
                "d": "Investigar deficiência de B12, já que a uremia bloqueia sua absorção.",
                "e": "Suspender medicamentos anti-hipertensivos, que podem agravar a hipóxia medular."
            },
            "answer": "b",
            "rationale": "Na anemia da Doença Renal Crônica (DRC), a deficiência de eritropoetina é o fator principal, mas a reposição de ferro é o passo preliminar ou concomitante essencial. As diretrizes (KDIGO) recomendam otimizar os estoques de ferro (SAT > 30% e Ferritina > 200 para pacientes em diálise ou > 30% e > 100 para não-dialíticos) antes ou durante o uso de agentes estimuladores da eritropoese (ESA), para garantir substrato para a síntese de hemoglobina.",
            "option_rationales": {
                "a": "Incorreta. Alvos de Hb > 13 em DRC aumentam o risco cardiovascular (estudo CREATE/CHOIR).",
                "b": "Correta. Estocar ferro é pré-requisito para boa resposta à eritropoetina.",
                "c": "Incorreta. Transfusão é evitada em pré-transplantados devido ao risco de sensibilização HLA.",
                "d": "Incorreta. A anemia da DRC é tipicamente normocítica.",
                "e": "Incorreta. Não é conduta para tratamento de anemia."
            },
            "difficulty": "moderada",
            "subject": "Anemias"
        },
        # 2
        {
            "enunciado": "Uma paciente de 22 anos, previamente saudável, apresenta quadro de coriza, febre baixa e dor de garganta há 5 dias. Hoje, comparece à consulta com icterícia e urina escura. Refere que sua mãe tem diagnóstico de 'doença do sangue'. Ao exame físico: palidez e esplenomegalia de 2 cm abaixo do rebordo costal. O hemograma mostra: Hb 10,1 g/dL; Reticulócitos 9%; VCM 85 fL; CHCM 37,2%. No sangue periférico são observadas hemácias pequenas, esféricas e hipercoradas. Qual o tratamento curativo para as crises hemolíticas recorrentes nesta patologia?",
            "options": {
                "a": "Esplenectomia.",
                "b": "Transplante de Medula Óssea alogênico.",
                "c": "Eculizumabe mensal.",
                "d": "Suplementação de piridoxina (Vitamina B6).",
                "e": "Terapia genética para síntese de anquirina."
            },
            "answer": "a",
            "rationale": "A Esferocitose Hereditária é causada por defeitos em proteínas da membrana (anquirina/espectrina). As hemácias esféricas são sequestradas e destruídas pelos macrófagos no baço. A esplenectomia não cura o defeito de membrana, mas cessa a destruição periférica, normalizando os níveis de hemoglobina e prevenindo cálculos biliares de repetição (hemólise crônica).",
            "option_rationales": {
                "a": "Correta. É o tratamento clássico para formas graves/sintomáticas.",
                "b": "Incorreta. TMO não é indicado em desordens de membrana benignas.",
                "c": "Incorreta. Eculizumabe é para HPN.",
                "d": "Incorreta. B6 não tem papel aqui.",
                "e": "Incorreta. Ainda em fase experimental, não é conduta clínica padrão."
            },
            "difficulty": "moderada",
            "subject": "Anemias"
        }
    ]
    
    push_lot_to_supabase(questions, package_id)
