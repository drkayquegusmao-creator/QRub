-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- MÓDULO: CADERNO DE ERROS (RECUPERAÇÃO ATIVA)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- 1. ENUM para Status de Erros
DO $$ BEGIN
    CREATE TYPE status_erro AS ENUM ('ATIVO', 'RECUPERACAO', 'CONSOLIDADO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Atualizar CHECK constraint da tabela de sessões para aceitar 'CADERNO_DE_ERROS'
ALTER TABLE sessoes DROP CONSTRAINT IF EXISTS sessoes_tipo_check;
ALTER TABLE sessoes ADD CONSTRAINT sessoes_tipo_check CHECK (tipo IN ('NIVELAMENTO', 'REVISAO', 'CADERNO_DE_ERROS'));

-- 2. Tabela Principal
CREATE TABLE IF NOT EXISTS caderno_erros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    questao_id UUID NOT NULL REFERENCES questao_base(id) ON DELETE CASCADE,
    
    -- Metadados de Organização
    assunto_id UUID NOT NULL REFERENCES assuntos(id),
    specialty_id VARCHAR(50) NOT NULL,
    
    -- Estado do Erro
    status status_erro DEFAULT 'ATIVO',
    numero_erros INT DEFAULT 1,
    ultima_tentativa TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Regra de Unicidade: Uma questão só aparece uma vez por usuário no caderno
    UNIQUE(user_id, questao_id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_caderno_erros_user ON caderno_erros(user_id);
CREATE INDEX IF NOT EXISTS idx_caderno_erros_status ON caderno_erros(status);
CREATE INDEX IF NOT EXISTS idx_caderno_erros_specialty ON caderno_erros(specialty_id);

-- 3. RLS Policies
ALTER TABLE caderno_erros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem apenas seus próprios erros"
    ON caderno_erros FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Sistema insere erros (via trigger/api)"
    ON caderno_erros FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Sistema atualiza erros"
    ON caderno_erros FOR UPDATE
    USING (auth.uid() = user_id);

-- 4. Funções e Triggers para Automação

CREATE OR REPLACE FUNCTION processar_erro_automatizado()
RETURNS TRIGGER AS $$
BEGIN
    -- Caso 1: Usuário ERROU (esta_correta = false)
    IF NEW.esta_correta = FALSE AND NEW.resposta_usuario IS NOT NULL THEN
        INSERT INTO caderno_erros (user_id, questao_id, assunto_id, specialty_id, status, numero_erros, ultima_tentativa)
        SELECT 
            s.user_id,
            NEW.questao_id,
            s.assunto_id,
            q.specialty_id,
            'ATIVO'::status_erro,
            1,
            NOW()
        FROM sessoes s
        JOIN questao_base q ON q.id = NEW.questao_id
        WHERE s.id = NEW.sessao_id
        ON CONFLICT (user_id, questao_id) 
        DO UPDATE SET
            status = 'ATIVO'::status_erro, -- Errou de novo? Volta pra ativo imediatamente.
            numero_erros = caderno_erros.numero_erros + 1,
            ultima_tentativa = NOW(),
            updated_at = NOW();
    END IF;
    
    -- Caso 2: Usuário ACERTOU (esta_correta = true)
    IF NEW.esta_correta = TRUE AND NEW.resposta_usuario IS NOT NULL THEN
        -- Se a questão existe no caderno, promover o status (Recuperação Progressiva)
        UPDATE caderno_erros
        SET status = CASE 
                WHEN status = 'ATIVO' THEN 'RECUPERACAO'::status_erro
                WHEN status = 'RECUPERACAO' THEN 'CONSOLIDADO'::status_erro
                ELSE status
            END,
            ultima_tentativa = NOW(),
            updated_at = NOW()
        WHERE user_id = (SELECT user_id FROM sessoes WHERE id = NEW.sessao_id)
          AND questao_id = NEW.questao_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para disparar a função sempre que um item de sessão for atualizado (respondido)
DROP TRIGGER IF EXISTS trg_atualizar_caderno_erros ON sessao_itens;

CREATE TRIGGER trg_atualizar_caderno_erros
AFTER UPDATE ON sessao_itens
FOR EACH ROW
EXECUTE FUNCTION processar_erro_automatizado();
