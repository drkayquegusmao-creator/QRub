
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
    

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (1, 'Boost de XP Pequeno (Lvl 1)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (2, 'Boost de XP Pequeno (Lvl 2)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (3, 'Título "Aprendiz"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (4, 'Boost de XP Pequeno (Lvl 4)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (5, '50/50 (Lvl 5)', 'FUNCIONAL', 'Elimine duas alternativas erradas.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (6, 'Título "Estudioso"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (7, 'Boost de XP Pequeno (Lvl 7)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (8, 'Boost de XP Pequeno (Lvl 8)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (9, 'Título "Dedicado"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (10, 'Tempo Extra (Lvl 10)', 'FUNCIONAL', 'Adicione 30 segundos ao timer.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (11, 'Boost de XP Pequeno (Lvl 11)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (12, 'Título "Explorador"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (13, 'Boost de XP Pequeno (Lvl 13)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (14, 'Boost de XP Pequeno (Lvl 14)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (15, 'Proteção de Streak (Lvl 15)', 'FUNCIONAL', 'Evita que seu streak quebre por um dia.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (16, 'Boost de XP Pequeno (Lvl 16)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (17, 'Boost de XP Pequeno (Lvl 17)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (18, 'Título "Estrategista"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (19, 'Boost de XP Pequeno (Lvl 19)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (20, 'Dobro de XP (Lvl 20)', 'FUNCIONAL', 'Ganhe XP em dobro na próxima partida.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (21, 'Título "Mestre"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (22, 'Boost de XP Pequeno (Lvl 22)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (23, 'Boost de XP Pequeno (Lvl 23)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (24, 'Título "Grão-Mestre"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (25, 'Pula Questão (Lvl 25)', 'FUNCIONAL', 'Pule uma questão difícil sem perder pontos.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (26, 'Boost de XP Pequeno (Lvl 26)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (27, 'Título "Lenda"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (28, 'Boost de XP Pequeno (Lvl 28)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (29, 'Boost de XP Pequeno (Lvl 29)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (30, '50/50 (Lvl 30)', 'FUNCIONAL', 'Elimine duas alternativas erradas.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (31, 'Boost de XP Pequeno (Lvl 31)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (32, 'Boost de XP Pequeno (Lvl 32)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (33, 'Título "Sábio"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (34, 'Boost de XP Pequeno (Lvl 34)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (35, 'Tempo Extra (Lvl 35)', 'FUNCIONAL', 'Adicione 30 segundos ao timer.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (36, 'Título "O Escolhido"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (37, 'Boost de XP Pequeno (Lvl 37)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (38, 'Boost de XP Pequeno (Lvl 38)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (39, 'Título "Titã"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (40, 'Proteção de Streak (Lvl 40)', 'FUNCIONAL', 'Evita que seu streak quebre por um dia.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (41, 'Boost de XP Pequeno (Lvl 41)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (42, 'Título "Divindade"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (43, 'Boost de XP Pequeno (Lvl 43)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (44, 'Boost de XP Pequeno (Lvl 44)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (45, 'Dobro de XP (Lvl 45)', 'FUNCIONAL', 'Ganhe XP em dobro na próxima partida.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (46, 'Boost de XP Pequeno (Lvl 46)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (47, 'Boost de XP Pequeno (Lvl 47)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (48, 'Título "Aprendiz"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (49, 'Boost de XP Pequeno (Lvl 49)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (50, 'Pula Questão (Lvl 50)', 'FUNCIONAL', 'Pule uma questão difícil sem perder pontos.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (51, 'Título "Estudioso"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (52, 'Boost de XP Pequeno (Lvl 52)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (53, 'Boost de XP Pequeno (Lvl 53)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (54, 'Título "Dedicado"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (55, '50/50 (Lvl 55)', 'FUNCIONAL', 'Elimine duas alternativas erradas.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (56, 'Boost de XP Pequeno (Lvl 56)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (57, 'Título "Explorador"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (58, 'Boost de XP Pequeno (Lvl 58)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (59, 'Boost de XP Pequeno (Lvl 59)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (60, 'Tempo Extra (Lvl 60)', 'FUNCIONAL', 'Adicione 30 segundos ao timer.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (61, 'Boost de XP Pequeno (Lvl 61)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (62, 'Boost de XP Pequeno (Lvl 62)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (63, 'Título "Estrategista"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (64, 'Boost de XP Pequeno (Lvl 64)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (65, 'Proteção de Streak (Lvl 65)', 'FUNCIONAL', 'Evita que seu streak quebre por um dia.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (66, 'Título "Mestre"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (67, 'Boost de XP Pequeno (Lvl 67)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (68, 'Boost de XP Pequeno (Lvl 68)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (69, 'Título "Grão-Mestre"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (70, 'Dobro de XP (Lvl 70)', 'FUNCIONAL', 'Ganhe XP em dobro na próxima partida.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (71, 'Boost de XP Pequeno (Lvl 71)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (72, 'Título "Lenda"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (73, 'Boost de XP Pequeno (Lvl 73)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (74, 'Boost de XP Pequeno (Lvl 74)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (75, 'Pula Questão (Lvl 75)', 'FUNCIONAL', 'Pule uma questão difícil sem perder pontos.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (76, 'Boost de XP Pequeno (Lvl 76)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (77, 'Boost de XP Pequeno (Lvl 77)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (78, 'Título "Sábio"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (79, 'Boost de XP Pequeno (Lvl 79)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (80, '50/50 (Lvl 80)', 'FUNCIONAL', 'Elimine duas alternativas erradas.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (81, 'Título "O Escolhido"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (82, 'Boost de XP Pequeno (Lvl 82)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (83, 'Boost de XP Pequeno (Lvl 83)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (84, 'Título "Titã"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (85, 'Tempo Extra (Lvl 85)', 'FUNCIONAL', 'Adicione 30 segundos ao timer.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (86, 'Boost de XP Pequeno (Lvl 86)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (87, 'Título "Divindade"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (88, 'Boost de XP Pequeno (Lvl 88)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (89, 'Boost de XP Pequeno (Lvl 89)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (90, 'Proteção de Streak (Lvl 90)', 'FUNCIONAL', 'Evita que seu streak quebre por um dia.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (91, 'Boost de XP Pequeno (Lvl 91)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (92, 'Boost de XP Pequeno (Lvl 92)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (93, 'Título "Aprendiz"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (94, 'Boost de XP Pequeno (Lvl 94)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (95, 'Dobro de XP (Lvl 95)', 'FUNCIONAL', 'Ganhe XP em dobro na próxima partida.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (96, 'Título "Estudioso"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (97, 'Boost de XP Pequeno (Lvl 97)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (98, 'Boost de XP Pequeno (Lvl 98)', 'FUNCIONAL', 'Um pequeno empurrão no seu progresso.', '{"xp_bonus": 50}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (99, 'Título "Dedicado"', 'TITULO', 'Exiba este título no seu perfil.', '{}')
        ON CONFLICT DO NOTHING;
        

        INSERT INTO rank_rewards (level_required, name, type, description, config)
        VALUES (100, 'Pula Questão (Lvl 100)', 'FUNCIONAL', 'Pule uma questão difícil sem perder pontos.', '{"consumable": true, "quantity": 1}')
        ON CONFLICT DO NOTHING;
        
