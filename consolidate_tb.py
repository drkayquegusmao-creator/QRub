
import json
import glob
import os

tb_questions = []
# Sort part files correctly
files = sorted(glob.glob('batch_fgv_tuberculose_part*.json'), key=lambda x: int(x.split('part')[1].split('.')[0]))

for f in files:
    try:
        with open(f, 'r', encoding='utf-8') as jf:
            data = json.load(jf)
            if isinstance(data, list):
                tb_questions.extend(data)
            else:
                tb_questions.append(data)
    except Exception as e:
        print(f"Error reading {f}: {e}")

with open('consolidated_tb.json', 'w', encoding='utf-8') as out:
    json.dump(tb_questions, out, indent=2, ensure_ascii=False)

print(f"Consolidated {len(tb_questions)} questions into consolidated_tb.json")
