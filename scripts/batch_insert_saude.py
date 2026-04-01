
import os
import json
import uuid
import subprocess

def load_env_manual(filepath):
    env_vars = {}
    if not os.path.exists(filepath):
        return env_vars
    with open(filepath, 'r') as f:
        for line in f:
            if line.startswith('#') or not '=' in line:
                continue
            key, value = line.strip().split('=', 1)
            value = value.strip('"').strip("'")
            env_vars[key] = value
    return env_vars

def insert_batch(json_filepath, package_id):
    env = load_env_manual('.env.local')
    url = env.get('NEXT_PUBLIC_SUPABASE_URL')
    key = env.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    
    with open(json_filepath, 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    inserted_ids = []
    
    for q in questions:
        q_id = str(uuid.uuid4())
        # Mapping to questao_base schema
        data = {
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
            "metadata": {"batch": "45f9f5ee-fb49-4cdd-bd08-a147c6cbcaf9", "style": "FGV"}
        }
        
        # Insert Question
        cmd_q = [
            "curl", "-X", "POST", f"{url}/rest/v1/questao_base",
            "-H", f"apikey: {key}",
            "-H", f"Authorization: Bearer {key}",
            "-H", "Content-Type: application/json",
            "-H", "Prefer: resolution=merge-duplicates",
            "--data", json.dumps(data)
        ]
        subprocess.run(cmd_q, capture_output=True)
        
        # Link to Package
        link_data = {
            "package_id": package_id,
            "question_id": q_id
        }
        cmd_l = [
            "curl", "-X", "POST", f"{url}/rest/v1/package_questions",
            "-H", f"apikey: {key}",
            "-H", f"Authorization: Bearer {key}",
            "-H", "Content-Type: application/json",
            "--data", json.dumps(link_data)
        ]
        subprocess.run(cmd_l, capture_output=True)
        inserted_ids.append(q_id)
        
    print(f"✅ Sucesso: {len(inserted_ids)} questões inseridas e vinculadas ao pacote {package_id}.")

if __name__ == "__main__":
    import sys
    batch_file = sys.argv[1]
    package_uuid = "45f9f5ee-fb49-4cdd-bd08-a147c6cbcaf9"
    insert_batch(batch_file, package_uuid)
