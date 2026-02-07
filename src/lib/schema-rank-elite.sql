-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- MÓDULO RANK ELITE (QRUB) - SCHEMA ISOLADO
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- 1. TEMPORADAS (SEASONS)
CREATE TABLE IF NOT EXISTS rank_seasons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) CHECK (status IN ('ACTIVE', 'FINISHED')) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ESTATÍSTICAS E LIGAS DO USUÁRIO
CREATE TABLE IF NOT EXISTS rank_user_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    season_id UUID NOT NULL REFERENCES rank_seasons(id) ON DELETE CASCADE,
    
    -- Progressão
    points INT DEFAULT 0,
    league VARCHAR(20) CHECK (league IN ('BRONZE', 'PRATA', 'OURO', 'PLATINA', 'DIAMANTE', 'ELITE')) DEFAULT 'BRONZE',
    
    -- Performance Metrics
    matches_played INT DEFAULT 0,
    matches_won INT DEFAULT 0,
    streak INT DEFAULT 0,
    max_streak INT DEFAULT 0,
    max_points_match INT DEFAULT 0,
    
    -- Status da Zona (Calculado dinamicamente ou snapshot)
    zone_status VARCHAR(20) CHECK (zone_status IN ('SAFE', 'PROMOTION', 'DANGER')) DEFAULT 'SAFE',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, season_id)
);

-- 3. PARTIDAS (MATCHES)
CREATE TABLE IF NOT EXISTS rank_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    season_id UUID NOT NULL REFERENCES rank_seasons(id) ON DELETE CASCADE,
    
    mode VARCHAR(20) CHECK (mode IN ('RAPIDA', 'DIARIA', 'ARENA')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('PENDING', 'COMPLETED', 'ABANDONED')) DEFAULT 'PENDING',
    
    total_questions INT DEFAULT 10,
    correct_answers INT DEFAULT 0,
    score_gained INT DEFAULT 0,
    duration_seconds INT DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ITENS DA PARTIDA (HISTÓRICO DE RESPOSTAS NO RANK)
CREATE TABLE IF NOT EXISTS rank_match_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID NOT NULL REFERENCES rank_matches(id) ON DELETE CASCADE,
    questao_id UUID NOT NULL REFERENCES questao_base(id) ON DELETE CASCADE,
    
    ordem INT NOT NULL,
    resposta_usuario CHAR(1),
    esta_correta BOOLEAN,
    tempo_resposta_segundos INT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. BADGES (CONQUISTAS)
CREATE TABLE IF NOT EXISTS rank_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_slug VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, badge_slug)
);

-- 6. MISSÕES SEMANAIS
CREATE TABLE IF NOT EXISTS rank_missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    season_id UUID NOT NULL REFERENCES rank_seasons(id) ON DELETE CASCADE,
    
    title VARCHAR(255) NOT NULL,
    description TEXT,
    goal INT NOT NULL,
    progress INT DEFAULT 0,
    reward_points INT DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('PENDING', 'COMPLETED')) DEFAULT 'PENDING',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- 7. BUFFS (BÔNUS TEMPORÁRIOS)
CREATE TABLE IF NOT EXISTS rank_buffs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    buff_type VARCHAR(100) NOT NULL, -- e.g., 'FOCO_CLINICO', 'ANTI_ERRO', 'STREAK_BONUS'
    target_specialty_id VARCHAR(50), -- null se global
    multiplier DECIMAL(3, 2) DEFAULT 1.05,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. ÍNDICES
CREATE INDEX IF NOT EXISTS idx_rank_stats_user ON rank_user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_rank_stats_points ON rank_user_stats(points DESC);
CREATE INDEX IF NOT EXISTS idx_rank_matches_user ON rank_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_rank_missions_user ON rank_missions(user_id);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- RLS (ROW LEVEL SECURITY)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTER TABLE rank_user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE rank_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE rank_match_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE rank_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE rank_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rank_buffs ENABLE ROW LEVEL SECURITY;

-- rank_user_stats
CREATE POLICY "Users can view all rank stats for leaderboard" ON rank_user_stats FOR SELECT USING (true);
CREATE POLICY "Users can insert their own rank stats" ON rank_user_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own rank stats" ON rank_user_stats FOR UPDATE USING (auth.uid() = user_id);

-- rank_matches
CREATE POLICY "Users can view their own matches" ON rank_matches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can start their own matches" ON rank_matches FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own matches" ON rank_matches FOR UPDATE USING (auth.uid() = user_id);

-- rank_match_items
CREATE POLICY "Users can view their own match items" ON rank_match_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM rank_matches WHERE rank_matches.id = rank_match_items.match_id AND rank_matches.user_id = auth.uid())
);
CREATE POLICY "Users can record their match items" ON rank_match_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM rank_matches WHERE rank_matches.id = rank_match_items.match_id AND rank_matches.user_id = auth.uid())
);
CREATE POLICY "Users can update their match items" ON rank_match_items FOR UPDATE USING (
    EXISTS (SELECT 1 FROM rank_matches WHERE rank_matches.id = rank_match_items.match_id AND rank_matches.user_id = auth.uid())
);

-- common policies for others
CREATE POLICY "Users can view their own badges" ON rank_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own badges" ON rank_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own missions" ON rank_missions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own missions" ON rank_missions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own buffs" ON rank_buffs FOR SELECT USING (auth.uid() = user_id);

-- Inicializar Primeira Season se não existir
INSERT INTO rank_seasons (name, status) VALUES ('Season 1: Origem', 'ACTIVE') ON CONFLICT DO NOTHING;
