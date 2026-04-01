
import json
import os
import glob

tb_mapping = {
    "course_id": "medicina",
    "area_id": "clinica-medica",
    "specialty_id": "infectologia",
    "subspecialty_id": "d6782401-1302-41a0-9a23-c879ededd6b8",
    "subject_id": "7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0",
    "tema_id": "7ca3adb8-3f7b-4a33-a4ae-edfa0417faf0"
}

tireoide_mapping = {
    "course_id": "medicina",
    "area_id": "clinica-medica",
    "specialty_id": "endocrinologia",
    "subspecialty_id": "fa6919ef-d143-474f-838b-0b0f39b52f0d",
    "subject_id": "0e8afdbd-831a-409b-a6d9-3676c56426d0",
    "tema_id": "0e8afdbd-831a-409b-a6d9-3676c56426d0"
}

def update_files(pattern, mapping):
    files = glob.glob(pattern)
    print(f"Found {len(files)} files for pattern: {pattern}")
    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, list):
                print(f"Skipping {file_path}: not a list")
                continue
            
            for item in data:
                item.update(mapping)
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"Updated: {file_path}")
        except Exception as e:
            print(f"Error updating {file_path}: {e}")

# Update Tuberculose files
update_files("batch_fgv_tuberculose_part*.json", tb_mapping)

# Update Tireoide files
update_files("batch_fgv_tireoide_part*.json", tireoide_mapping)

print("Batch update complete!")
