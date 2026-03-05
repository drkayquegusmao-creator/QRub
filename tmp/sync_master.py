
import os
from supabase import create_client, Client
import json
import uuid

# Config
url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

supabase: Client = create_client(url, key)

def slugify(text: str) -> str:
    import unicodedata
    import re
    text = unicodedata.normalize('NFD', text).encode('ascii', 'ignore').decode('utf-8').lower()
    text = re.sub(r'[^\w\s-]', '', text).strip().replace(' ', '-')
    text = re.sub(r'[-]+', '-', text)
    return text

def find_node_slug(name, level, taxonomy_nodes):
    if not name: return None
    name_lower = name.lower().strip()
    
    # Try exact name match
    for node in taxonomy_nodes:
        if node['level'] == level and (node['name'].lower() == name_lower or node['slug'].lower() == name_lower):
            return node['slug']
            
    # Synonym search (Manual mapping for common ones)
    synonyms = {
        "tep": "tromboembolismo-pulmonar-tep",
        "tromboembolismo pulmonar": "tromboembolismo-pulmonar-tep",
        "dpoc": "dpoc",
        "has": "hipertensao-arterial-sistemica",
        "hipertensao": "hipertensao-arterial-sistemica",
        "dm": "diabetes-mellitus",
        "diabetes": "diabetes-mellitus",
        "ic": "insuficiencia-cardiaca",
        "ira": "injuria-renal-aguda",
        "drc": "doenca-renal-cronica"
    }
    
    if name_lower in synonyms:
        slug = synonyms[name_lower]
        # Verify if this slug exists in taxonomy at any level
        for node in taxonomy_nodes:
            if node['slug'] == slug:
                return slug
                
    return slugify(name)

def main():
    print("Iniciando Deploy de questões dos pacotes para o Banco Master...")
    
    # 1. Load taxonomy
    res = supabase.table("taxonomia").select("slug, name, level").eq("active", True).execute()
    tax_nodes = res.data
    
    # 2. Find pending questions
    # We join with question_packages to get taxonomy_path and bank_id
    res = supabase.table("package_questions")\
        .select("id, question_json, hash_logico, package_id, question_packages(taxonomy_path, bank_id, difficulty)")\
        .is_("question_id", "null")\
        .execute()
    
    pending = res.data
    print(f"Encontradas {len(pending)} questões pendentes.")
    
    if not pending:
        return

    published_count = 0
    
    for pq in pending:
        try:
            pkg_info = pq.get('question_packages', {})
            path = pkg_info.get('taxonomy_path', '')
            parts = [p.strip() for p in path.split('>') if p.strip()]
            
            # Resolve taxonomy
            specialty_slug = find_node_slug(parts[1] if len(parts) > 1 else None, 'specialty', tax_nodes)
            subspecialty_slug = find_node_slug(parts[2] if len(parts) > 2 else None, 'subspecialty', tax_nodes)
            subject_slug = find_node_slug(parts[3] if len(parts) > 3 else None, 'subject', tax_nodes)
            if not subject_slug: subject_slug = subspecialty_slug
            
            qj = pq['question_json']
            if isinstance(qj, str):
                qj = json.loads(qj)
                
            enunciado = qj.get('enunciado') or qj.get('stem') or qj.get('pergunta', '')
            answer = str(qj.get('answer') or qj.get('gabarito') or qj.get('resposta', '')).lower().strip()
            rationale = qj.get('rationale') or qj.get('justificativa', '')
            
            raw_opts = qj.get('options') or qj.get('alternativas', {})
            options_array = []
            for k in ['a', 'b', 'c', 'd', 'e']:
                if k in raw_opts and raw_opts[k]:
                    options_array.append({"id": k, "text": raw_opts[k]})
            
            question_id = str(uuid.uuid4())
            
            # Insert into questao_base
            insert_data = {
                "id": question_id,
                "enunciado": enunciado,
                "options": options_array,
                "correct_option_id": answer,
                "explanation": rationale,
                "difficulty": qj.get('difficulty') or pkg_info.get('difficulty') or 'media',
                "hash": pq.get('hash_logico'),
                "status": 'active',
                "status_validacao": 'APROVADA',
                "fonte": 'importada',
                "course_id": 'medicina',
                "specialty_id": specialty_slug,
                "subspecialty_id": subspecialty_slug,
                "subject_id": subject_slug,
                "area_id": specialty_slug,
                "subarea_id": subspecialty_slug,
                "tema_id": subject_slug,
                "metadata": {
                    "tags": qj.get('tags', []),
                    "package_id": pq['package_id'],
                    "source_package_question_id": pq['id']
                }
            }
            
            res_ins = supabase.table("questao_base").upsert(insert_data).execute()
            
            # Update package_questions
            supabase.table("package_questions")\
                .update({"status": "approved", "question_id": question_id})\
                .eq("id", pq['id'])\
                .execute()
            
            published_count += 1
            if published_count % 50 == 0:
                print(f"Publicadas {published_count} questões...")
                
        except Exception as e:
            print(f"Erro na questão {pq['id']}: {e}")

    print(f"Sucesso! {published_count} questões migradas para o Banco Master.")

if __name__ == "__main__":
    main()
