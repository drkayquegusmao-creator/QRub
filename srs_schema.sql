-- FASE 1: Tabela Core do Sistema de Revisão Espaçada (SRS)
CREATE TABLE IF NOT EXISTS public.concurso_user_srs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    questao_id UUID NOT NULL,
    disciplina_id TEXT, -- Ou UUID dependendo da taxonomia
    subtema_id TEXT,
    peso INTEGER DEFAULT 1 CHECK (peso IN (1, 2, 3)), -- 1: Fácil, 2: Médio, 3: Difícil
    status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'em_revisao', 'em_risco')),
    intervalo_dias FLOAT DEFAULT 0,
    proxima_revisao TIMESTAMPTZ DEFAULT now(),
    facilidade FLOAT DEFAULT 2.5,
    repeticoes INTEGER DEFAULT 0,
    forca_memoria FLOAT DEFAULT 50 CHECK (forca_memoria >= 0 AND forca_memoria <= 100),
    sequencia_acertos INTEGER DEFAULT 0,
    sequencia_erros INTEGER DEFAULT 0,
    historico JSONB DEFAULT '[]'::jsonb, -- Array de resps passadas
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, questao_id)
);

-- Índices de Performance Críticos para a Fábrica da Sessão (Fase 2)
CREATE INDEX idx_concurso_srs_user_status ON public.concurso_user_srs(user_id, status);
CREATE INDEX idx_concurso_srs_user_data ON public.concurso_user_srs(user_id, proxima_revisao);
CREATE INDEX idx_concurso_srs_risco ON public.concurso_user_srs(user_id) WHERE status = 'em_risco';

-- (Opcional) Trigger para auto-update do updated_at
CREATE OR REPLACE FUNCTION update_srs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_srs_updated_at ON public.concurso_user_srs;
CREATE TRIGGER trigger_srs_updated_at
BEFORE UPDATE ON public.concurso_user_srs
FOR EACH ROW
EXECUTE FUNCTION update_srs_updated_at();

-- FASE 2: Função Supabase RPC (Algoritmo de Priorização "Fábrica de Sessão")
-- Esta função retorna até 10 quests cruzando a prioridade SRS, rodando no servidor DB
CREATE OR REPLACE FUNCTION build_srs_session(p_user_id UUID, p_disciplina_id TEXT DEFAULT NULL, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
    srs_id UUID,
    questao_id UUID,
    status TEXT,
    forca_memoria FLOAT,
    dias_atraso FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id, s.questao_id, s.status, s.forca_memoria,
        EXTRACT(EPOCH FROM (now() - s.proxima_revisao))/86400 AS dias_atraso
    FROM public.concurso_user_srs s
    WHERE s.user_id = p_user_id
      AND (p_disciplina_id IS NULL OR s.disciplina_id = p_disciplina_id)
      AND s.proxima_revisao <= now()
    ORDER BY 
        -- Prioridade 1: Risco / Atrasada pesada
        CASE WHEN s.status = 'em_risco' THEN 0 ELSE 1 END ASC,
        (EXTRACT(EPOCH FROM (now() - s.proxima_revisao))/86400) DESC, -- dias atrasados
        s.forca_memoria ASC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
