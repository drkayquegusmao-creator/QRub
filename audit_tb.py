
import json
import glob

files = sorted(glob.glob('batch_fgv_tuberculose_part*.json'), key=lambda x: int(x.split('part')[1].split('.')[0]))
total = 0
with open('counts_tb.txt', 'w', encoding='utf-8') as out:
    for f in files:
        try:
            with open(f, 'r', encoding='utf-8') as jf:
                data = json.load(jf)
                count = len(data) if isinstance(data, list) else 1
                out.write(f"{f}: {count} questions\n")
                total += count
        except Exception as e:
            out.write(f"{f}: ERROR {e}\n")
    out.write(f"TOTAL: {total}\n")
