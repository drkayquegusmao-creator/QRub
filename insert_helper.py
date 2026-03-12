import os

# Files to process
sql_files = [
    r'c:\Users\kayqu\Desktop\Qrub1\QRub\pleural_final_insert_0.sql',
    r'c:\Users\kayqu\Desktop\Qrub1\QRub\pleural_final_insert_1.sql',
    r'c:\Users\kayqu\Desktop\Qrub1\QRub\pleural_final_insert_2.sql',
    r'c:\Users\kayqu\Desktop\Qrub1\QRub\pleural_final_insert_3.sql'
]

project_id = 'czguyzdbvqfyjsfwcpnh'

def get_sql_batches(file_path, batch_size=10):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]
    
    for i in range(0, len(lines), batch_size):
        yield "\n".join(lines[i:i+batch_size])

# Note: This script just prints the commands for me to run or helps me see the batches.
# Actually, I will just manually execute the 4 files since they are only 50 lines each.
# Most SQL execution tools handle 50 inserts easily.

if __name__ == "__main__":
    for f in sql_files:
        print(f"File: {f}")
        with open(f, 'r', encoding='utf-8') as content:
            # I can't call MCP from here, so I'll just use this to verify read
            pass
