
import sys
import json
import re

def clean_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    # Remove control characters except newline and tab
    content = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f]', '', content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    for arg in sys.argv[1:]:
        clean_json(arg)
