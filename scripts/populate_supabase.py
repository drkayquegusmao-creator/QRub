
import os
import json
import subprocess

def load_env_manual(filepath):
    """Lê manualment o .env.local"""
    env_vars = {}
    if not os.path.exists(filepath):
        return env_vars
    with open(filepath, 'r') as f:
        for line in f:
            if line.startswith('#') or not '=' in line:
                continue
            key, value = line.strip().split('=', 1)
            # Remover aspas se existirem
            value = value.strip('"').strip("'")
            env_vars[key] = value
    return env_vars

def push_questions(questions_list, supabase_url, supabase_key):
    """Insere questões via CURL"""
    url = f"{supabase_url}/rest/v1/questions"
    
    with open('temp_questions.json', 'w') as f:
        json.dump(questions_list, f)
    
    cmd = [
        "curl", "-X", "POST", url,
        "-H", f"apikey: {supabase_key}",
        "-H", f"Authorization: Bearer {supabase_key}",
        "-H", "Content-Type: application/json",
        "-H", "Prefer: resolution=merge-duplicates",
        "--data", "@temp_questions.json"
    ]
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Sucesso: {len(questions_list)} questões processadas.")
        else:
            print(f"❌ Erro Curl: {result.stderr}")
    finally:
        if os.path.exists('temp_questions.json'):
            os.remove('temp_questions.json')

if __name__ == "__main__":
    import sys
    env = load_env_manual('.env.local')
    url = env.get('NEXT_PUBLIC_SUPABASE_URL')
    key = env.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    
    if not url or not key:
        print("❌ Erro: URL ou KEY do Supabase não encontradas no .env.local")
        exit(1)

    filename = sys.argv[1] if len(sys.argv) > 1 else 'questions_batch.json'
    
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            data = json.load(f)
            push_questions(data, url, key)
    else:
        print(f"Arquivo {filename} não encontrado.")
