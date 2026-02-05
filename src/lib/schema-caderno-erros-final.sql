-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- MÓDULO: CADERNO DE ERROS (ERRO ATIVO E INTEGRADO) - QRUB FINAL
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- 1. TIPOS E ENUMS
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_erro_v2') THEN
        CREATE TYPE status_erro_v2 AS ENUM ('ativo', 'em_revisao', 'resolvido');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_erro_clinico') THEN
        CREATE TYPE tipo_erro_clinico AS ENUM ('conhecimento', 'interpretaçao', 'conduta', 'distraçao');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nivel_gravidade') THEN
        CREATE TYPE nivel_gravidade AS ENUM ('leve', 'moderado', 'crítico');
    END IF;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Tabela Principal (Versão Final)
CREATE TABLE IF NOT EXISTS caderno_erros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    questao_id UUID NOT NULL, -- Referência flexível
    
    -- Metadados de Organização
    specialty_id VARCHAR(50) NOT NULL,
    subspecialty_id VARCHAR(50),
    tema VARCHAR(255),
    assunto_id UUID REFERENCES assuntos(id),
    
    -- Classificação do Erro
    tipo_de_erro tipo_erro_clinico DEFAULT 'conhecimento',
    alternativa_marcada CHAR(1),
    alternativa_correta CHAR(1),
    justificativa_oficial TEXT,
    
    -- Controle de Repetição e Gravidade
    contador_de_repeticao INT DEFAULT 1,
    nivel_de_gravidade nivel_gravidade DEFAULT 'moderado',
    
    -- Estado e Cronologia
    status status_erro_v2 DEFAULT 'ativo',
    data_primeiro_erro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data_ultimo_erro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    proxima_revisao TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unicidade: Uma questão por usuário no caderno
    UNIQUE(user_id, questao_id)
);

-- 3. Índices para Performance
CREATE INDEX IF NOT EXISTS idx_caderno_erros_user_v2 ON caderno_erros(user_id);
CREATE INDEX IF NOT EXISTS idx_caderno_erros_status_v2 ON caderno_erros(status);
CREATE INDEX IF NOT EXISTS idx_caderno_erros_gravidade ON caderno_erros(nivel_de_gravidade);
CREATE INDEX IF NOT EXISTS idx_caderno_erros_revisao ON caderno_erros(proxima_revisao);

-- 4. RLS Policies
ALTER TABLE caderno_erros ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can only see their own errors" ON caderno_erros;
CREATE POLICY "Users can only see their own errors"
    ON caderno_erros FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System inserts errors" ON caderno_erros;
CREATE POLICY "System inserts errors"
    ON caderno_erros FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "System updates errors" ON caderno_erros;
CREATE POLICY "System updates errors"
    ON caderno_erros FOR UPDATE
    USING (auth.uid() = user_id);

-- 5. Função para Calcular Próxima Revisão do Erro
CREATE OR REPLACE FUNCTION calcular_data_revisao_erro(gravidade nivel_gravidade, repeticao INT)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
    -- Erro Crítico ou repetido: 24-48h (vou usar 1 dia)
    IF gravidade = 'crítico' OR repeticao > 1 THEN
        RETURN NOW() + INTERVAL '1 day';
    -- Erro Moderado: 7 dias
    ELSIF gravidade = 'moderado' THEN
        RETURN NOW() + INTERVAL '7 days';
    -- Erro Leve: 3 dias
    ELSE
        RETURN NOW() + INTERVAL '3 days';
    END IF;
END;
$$ LANGUAGE plpgsql;
