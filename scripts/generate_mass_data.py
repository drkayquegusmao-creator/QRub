
import os
import json
import random
import subprocess

# Configurações de Especialidades para o Lote Massivo
SPECIALTIES = [
    {"id": "clinica-medica", "name": "Clínica Médica", "subs": ["cardiologia", "pneumologia", "nefrologia", "gastrenterologia", "hematologia"]},
    {"id": "cirurgia-geral", "name": "Cirurgia Geral", "subs": ["trauma", "urologia", "vascular", "digestiva"]},
    {"id": "pediatria", "name": "Pediatria", "subs": ["neonatologia", "puericultura", "infecto-ped"]},
    {"id": "ginecologia-obstetricia", "name": "Ginecologia e Obstetrícia", "subs": ["obstetricia", "ginecologia", "mastologia"]},
    {"id": "medicina-preventiva-social", "name": "Medicina Preventiva", "subs": ["sus", "epidemiologia", "etica"]}
]

def generate_mass_batch(count_per_specialty=100):
    all_questions = []
    
    for spec in SPECIALTIES:
        for i in range(count_per_specialty):
            sub = random.choice(spec["subs"])
            q_id = f"QRUB-MASS-{spec['id'].upper()}-{i:04d}"
            
            # Template de questão seguindo as diretrizes clínicas QRub
            question = {
                "id": q_id,
                "course_id": "medicina",
                "specialty_id": spec["id"],
                "subspecialty_id": sub,
                "subject_id": f"tema-{random.randint(1,10)}",
                "difficulty": random.choice(["Fácil", "Médio", "Difícil"]),
                "enunciado": f"Questão clínica de {spec['name']} ({sub}). Paciente apresenta sinais vitais estáveis: PA: 120/82 mmHg. T: 36,6 °C. FC: 74 bpm. Relata sintomas progressivos há 3 dias.",
                "case_study": {
                    "history": "História clínica detalhada respeitando a semântica médica...",
                    "physical_exam": "Exame físico completo com SV decimais.",
                    "lab_results": "Exames em unidades g/dL e /mm³."
                },
                "options": [
                    {"id": "a", "text": "Conduta correta baseada em diretriz oficial ativa."},
                    {"id": "b", "text": "Distrator clínico plausível 1."},
                    {"id": "c", "text": "Distrator clínico plausível 2."},
                    {"id": "d", "text": "Distrator clínico plausível 3."},
                    {"id": "e", "text": "Distrator clínico plausível 4."}
                ],
                "correct_option_id": "a",
                "explanation": f"Explicação baseada na diretriz de {spec['name']}. O manejo correto envolve a conduta farmacológica de primeira linha.",
                "metadata": {
                    "origem": "Gerador Massivo QRub",
                    "data_geracao": "2026-02-01"
                }
            }
            all_questions.push(question) if hasattr(all_questions, 'push') else all_questions.append(question)
            
    return all_questions

if __name__ == "__main__":
    # Gerar o arquivo JSON para ser consumido pelo populate_supabase.py
    batch = generate_mass_batch(100) # Gerando as primeiras 500 (100 por área base)
    with open('mass_batch_questions.json', 'w') as f:
        json.dump(batch, f)
    print(f"✅ Geradas {len(batch)} questões para o lote massivo.")
