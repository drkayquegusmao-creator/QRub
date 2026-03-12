import json
import collections
import random
import os

def process_questions(input_path, package_id):
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 1. Fix keys and validate
    clean_questions = []
    for i, q in enumerate(data):
        # Fix keys
        if 'enunciated' in q and 'enunciado' not in q:
            q['enunciado'] = q.pop('enunciated')
        
        if 'enunciado' not in q or 'options' not in q or 'answer' not in q:
            print(f"Skipping invalid question at index {i}")
            continue
        clean_questions.append(q)
    
    print(f"Processing {len(clean_questions)} valid questions.")

    # 2. Randomize options within each question
    for q in clean_questions:
        options_dict = q['options']
        original_answer_key = q['answer'].lower()
        
        # Get actual option texts
        option_entries = []
        for key in ['a', 'b', 'c', 'd', 'e']:
            if key in options_dict:
                option_entries.append({
                    'original_key': key,
                    'text': options_dict[key],
                    'rationale': q.get('option_rationales', {}).get(key, "Incorreta.")
                })
        
        # Shuffle
        random.shuffle(option_entries)
        
        # Rebuild q
        new_options = {}
        new_rationales = {}
        new_answer = None
        
        for i, entry in enumerate(option_entries):
            new_key = chr(ord('a') + i)
            new_options[new_key] = entry['text']
            new_rationales[new_key] = entry['rationale']
            if entry['original_key'] == original_answer_key:
                new_answer = new_key
        
        q['options'] = new_options
        q['option_rationales'] = new_rationales
        q['answer'] = new_answer

    # 3. Shuffle questions list
    random.shuffle(clean_questions)

    # 4. Break streaks (max 2 consecutive same answers)
    for i in range(2, len(clean_questions)):
        if clean_questions[i]['answer'] == clean_questions[i-1]['answer'] == clean_questions[i-2]['answer']:
            # Find a question later in the list with a different answer
            for j in range(i + 1, len(clean_questions)):
                if clean_questions[j]['answer'] != clean_questions[i]['answer']:
                    # Swap
                    clean_questions[i], clean_questions[j] = clean_questions[j], clean_questions[i]
                    break
    
    # Verification of streaks
    final_answers = [q['answer'] for q in clean_questions]
    print(f"Final answer distribution: {collections.Counter(final_answers)}")
    
    streaks = 0
    for i in range(2, len(final_answers)):
        if final_answers[i] == final_answers[i-1] == final_answers[i-2]:
            streaks += 1
    print(f"Streaks of 3+: {streaks}")

    # 5. Export to JSON
    output_json = input_path.replace('.json', '_randomized.json')
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(clean_questions, f, indent=4, ensure_ascii=False)
    print(f"Saved randomized JSON to {output_json}")

    # 6. Export to SQL files
    batch_size = 50
    for i in range(0, len(clean_questions), batch_size):
        batch = clean_questions[i : i + batch_size]
        sql_file = f"pleural_final_insert_{i//batch_size}.sql"
        with open(sql_file, 'w', encoding='utf-8') as f:
            for idx, q in enumerate(batch):
                order_index = i + idx
                # Escape single quotes in JSON string
                q_json = json.dumps(q, ensure_ascii=False).replace("'", "''")
                f.write(f"INSERT INTO package_questions (package_id, question_json, order_index, status) VALUES ('{package_id}', '{q_json}', {order_index}, 'draft');\n")
        print(f"Generated {sql_file}")

if __name__ == "__main__":
    process_questions(r'c:\Users\kayqu\Desktop\Qrub1\QRub\derrame_pleural_total.json', '75b2c082-f706-4e24-aaa2-7ff578f23d66')
