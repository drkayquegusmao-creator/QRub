import json
import collections
import random

def analyze_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    print(f"Total entries: {len(questions)}")
    
    valid_questions = []
    for i, q in enumerate(questions):
        if 'enunciado' not in q:
            print(f"Entry {i} missing 'enunciado': {list(q.keys())}")
            continue
        valid_questions.append(q)
    
    print(f"Valid questions: {len(valid_questions)}")
    
    # Check for duplicate enunciados
    enunciados = [q['enunciado'] for q in valid_questions]
    dupes = [item for item, count in collections.Counter(enunciados).items() if count > 1]
    print(f"Duplicate enunciados: {len(dupes)}")
    for d in dupes:
        count = enunciados.count(d)
        print(f"  - '{d[:50]}...' repeated {count} times")

    # Check answer distribution
    answers = [q['answer'] for q in valid_questions]
    print(f"Answer distribution: {collections.Counter(answers)}")
    
    # Check for long streaks
    streaks = []
    current_streak = 1
    for i in range(1, len(answers)):
        if answers[i] == answers[i-1]:
            current_streak += 1
        else:
            if current_streak >= 3:
                streaks.append((answers[i-1], current_streak, i - current_streak))
            current_streak = 1
    if current_streak >= 3:
        streaks.append((answers[-1], current_streak, len(answers) - current_streak))
    
    print(f"Streaks of 3 or more: {len(streaks)}")
    for streak in streaks:
        print(f"Streak of '{streak[0]}' length {streak[1]} starting at index {streak[2]}")

if __name__ == "__main__":
    analyze_questions(r'c:\Users\kayqu\Desktop\Qrub1\QRub\derrame_pleural_total.json')
