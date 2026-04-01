
import json
import uuid
import sys

package_id = "44BB9F70-13D0-42E0-808E-8DED933CEA6A"

def generate_sql_batch(questions, start_idx):
    values = []
    for i, q in enumerate(questions):
        try:
            q_json = json.dumps(q, ensure_ascii=False).replace("'", "''")
            order = start_idx + i
            uid = str(uuid.uuid4())
            values.append(f"('{uid}', '{package_id}', '{q_json}', 'draft', {order})")
        except Exception as e:
            print(f"Error processing question {i}: {e}")
            continue
    
    if not values:
        return ""
    return "INSERT INTO package_questions (id, package_id, question_json, status, order_index) VALUES " + ", ".join(values) + ";"

try:
    with open('consolidated_tb.json', 'r', encoding='utf-8', errors='ignore') as f:
        all_q = json.load(f)
except Exception as e:
    print(f"Failed to load JSON with utf-8: {e}")
    sys.exit(1)

batch_size = 50
for i in range(0, len(all_q), batch_size):
    batch = all_q[i:i+batch_size]
    sql = generate_sql_batch(batch, i)
    if sql:
        with open(f'tmp_insert_tb_{i//batch_size}.sql', 'w', encoding='utf-8') as f:
            f.write(sql)

print(f"Generated batches from {len(all_q)} questions.")
