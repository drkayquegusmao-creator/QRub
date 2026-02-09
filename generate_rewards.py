
import uuid
import json

def generate_sql():
    sql = []
    
    # Tables
    sql.append("""
    -- 1. REWARDS TABLE
    CREATE TABLE IF NOT EXISTS rank_rewards (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        level_required INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL CHECK (type IN ('MOLDURA', 'TITULO', 'AVATAR', 'ITEM', 'THEME', 'FUNCIONAL')),
        description TEXT,
        config JSONB DEFAULT '{}'::jsonb,
        icon_slug VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- 1.1 Ensure columns exist (Migration)
    ALTER TABLE rank_rewards ADD COLUMN IF NOT EXISTS level_required INT;
    ALTER TABLE rank_rewards ADD COLUMN IF NOT EXISTS description TEXT;
    ALTER TABLE rank_rewards ADD COLUMN IF NOT EXISTS icon_slug VARCHAR(100);


    -- 2. USER REWARDS TABLE
    CREATE TABLE IF NOT EXISTS rank_user_rewards (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        reward_id UUID NOT NULL REFERENCES rank_rewards(id) ON DELETE CASCADE,
        is_equipped BOOLEAN DEFAULT FALSE,
        obtained_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, reward_id)
    );

    -- 3. RLS
    ALTER TABLE rank_rewards ENABLE ROW LEVEL SECURITY;
    ALTER TABLE rank_user_rewards ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Public read rewards" ON rank_rewards FOR SELECT USING (true);
    CREATE POLICY "Users view own rewards" ON rank_user_rewards FOR SELECT USING (auth.uid() = user_id);
    CREATE POLICY "Users update own rewards" ON rank_user_rewards FOR UPDATE USING (auth.uid() = user_id);
    
    -- 4. RPC for Unique Rank Questions (User-specific)
    CREATE OR REPLACE FUNCTION get_user_rank_questions(
      p_user_id uuid,
      p_limit int DEFAULT 10
    )
    RETURNS SETOF public.questao_base
    AS $$
    BEGIN
      RETURN QUERY
      SELECT q.*
      FROM public.questao_base q
      WHERE q.status_validacao = 'APROVADA'
      AND q.id NOT IN (
        SELECT rmi.questao_id
        FROM public.rank_match_items rmi
        JOIN public.rank_matches rm ON rmi.match_id = rm.id
        WHERE rm.user_id = p_user_id
      )
      ORDER BY random()
      LIMIT p_limit;
    END;
    $$ LANGUAGE plpgsql;
    """)

    # Generate Rewards
    rewards = []
    
    # Titles
    titles = [
        "Iniciante", "Aprendiz", "Estudioso", "Dedicado", "Explorador", 
        "Analista", "Estrategista", "Mestre", "Grão-Mestre", "Lenda",
        "Imparável", "Sábio", "O Escolhido", "Titã", "Divindade"
    ]
    
    # Functional Items
    items = [
        {"name": "Pula Questão", "desc": "Pule uma questão difícil sem perder pontos."},
        {"name": "50/50", "desc": "Elimine duas alternativas erradas."},
        {"name": "Tempo Extra", "desc": "Adicione 30 segundos ao timer."},
        {"name": "Proteção de Streak", "desc": "Evita que seu streak quebre por um dia."},
        {"name": "Dobro de XP", "desc": "Ganhe XP em dobro na próxima partida."}
    ]

    for level in range(1, 101):
        # Every 5 levels: Functional Item
        if level % 5 == 0:
            item = items[(level // 5) % len(items)]
            rewards.append({
                "level": level,
                "name": f"{item['name']} (Lvl {level})",
                "type": "FUNCIONAL",
                "desc": item['desc'],
                "config": {"consumable": True, "quantity": 1}
            })
        
        # Every 10 levels: Frame (Moldura)
        elif level % 10 == 0:
            material = ["Bronze", "Prata", "Ouro", "Platina", "Diamante", "Rubi", "Safira", "Esmeralda", "Obsidian", "Cosmic"][(level // 10) - 1]
            rewards.append({
                "level": level,
                "name": f"Moldura {material}",
                "type": "MOLDURA",
                "desc": f"Moldura exclusiva de {material}.",
                "config": {"color": "gold", "effect": "shine"}
            })

        # Every 3 levels (except multiples of 5/10): Title
        elif level % 3 == 0:
            title_idx = (level // 3) % len(titles)
            rewards.append({
                "level": level,
                "name": f'Título "{titles[title_idx]}"',
                "type": "TITULO",
                "desc": "Exiba este título no seu perfil.",
                "config": {}
            })
            
        # Others: XP Boost or Minor cosmetic
        else:
             rewards.append({
                "level": level,
                "name": f"Boost de XP Pequeno (Lvl {level})",
                "type": "FUNCIONAL",
                "desc": "Um pequeno empurrão no seu progresso.",
                "config": {"xp_bonus": 50}
            })

    # Generate Insert Statements
    for r in rewards:
        config_json = json.dumps(r['config']).replace("'", "''")
        sql.append(f"""
        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES ({r['level']}, '{r['name']}', '{r['type']}', '{r['desc']}', '{config_json}')
        ON CONFLICT DO NOTHING;
        """)

    return "\n".join(sql)

if __name__ == "__main__":
    print(generate_sql())
