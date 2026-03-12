
import json
import os

package_id = '75b2c082-f706-4e24-aaa2-7ff578f23d66'
input_file = r'c:\Users\kayqu\Desktop\Qrub1\QRub\derrame_pleural_total.json'
output_dir = r'c:\Users\kayqu\Desktop\Qrub1\QRub'

with open(input_file, 'r', encoding='utf-8') as f:
    questions = json.load(f)

for i in range(0, len(questions), 50):
    batch = questions[i:i+50]
    values = []
    for idx, q in enumerate(batch):
        q_json = json.dumps(q, ensure_ascii=False).replace("'", "''")
        values.append(f"('{package_id}', '{q_json}'::jsonb, {i + idx}, 'draft')")
    
    sql = f"INSERT INTO package_questions (package_id, question_json, order_index, status) VALUES {', '.join(values)};"
    with open(os.path.join(output_dir, f'pleural_insert_{i//50}.sql'), 'w', encoding='utf-8') as f_sql:
        f_sql.write(sql)
print(f'Done! Created {len(questions)//50} files.')
