-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- SISTEMA DE NIVELAMENTO, REVISÃO ESPAÇADA E CALENDÁRIO - QRUB
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Este schema define toda a estrutura de dados necessária para o sistema
-- de estudos automático e individualizado do QRub.
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 1. TABELA DE ASSUNTOS
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Representa a menor unidade de estudo.
-- Pode ser: tema, ou (área + subárea + tema)
-- Exemplo: Clínica Médica → Cardiologia → Insuficiência Cardíaca
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS assuntos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    
    -- Referência ao MEDICAL_HIERARCHY
    specialty_id VARCHAR(50) NOT NULL,
    subspecialty_id VARCHAR(50),
    tema VARCHAR(255),
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assuntos_specialty ON assuntos(specialty_id);
CREATE INDEX IF NOT EXISTS idx_assuntos_subspecialty ON assuntos(subspecialty_id);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 2. TABELA DE PROGRESSO POR ASSUNTO
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Armazena o progresso individual de cada usuário em cada assunto.
-- ESTADOS POSSÍVEIS:
--   - NAO_NIVELADO: Assunto nunca foi iniciado
--   - NIVELADO: Nivelamento concluído, aguardando primeira revisão
--   - AGUARDANDO_REVISAO: Revisão agendada para o futuro
--   - REVISAO_VENCIDA: Revisão atrasada
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS assunto_progresso (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assunto_id UUID NOT NULL REFERENCES assuntos(id) ON DELETE CASCADE,
    
    -- Estado atual do assunto
    estado VARCHAR(50) CHECK (estado IN ('NAO_NIVELADO', 'NIVELADO', 'AGUARDANDO_REVISAO', 'REVISAO_VENCIDA')) DEFAULT 'NAO_NIVELADO',
    
    -- Nível atual (0-10)
    nivel_atual DECIMAL(3, 1) DEFAULT 0,
    ultima_nota DECIMAL(3, 1),
    
    -- Estatísticas acumuladas
    total_questoes_respondidas INT DEFAULT 0,
    total_acertos INT DEFAULT 0,
    
    -- Controle de revisão espaçada
    data_ultima_sessao TIMESTAMP WITH TIME ZONE,
    data_proxima_revisao TIMESTAMP WITH TIME ZONE,
    intervalo_dias INT DEFAULT 7,
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Garantir um único registro por usuário + assunto
    UNIQUE(user_id, assunto_id)
);

CREATE INDEX IF NOT EXISTS idx_progresso_user ON assunto_progresso(user_id);
CREATE INDEX IF NOT EXISTS idx_progresso_estado ON assunto_progresso(estado);
CREATE INDEX IF NOT EXISTS idx_progresso_proxima_revisao ON assunto_progresso(data_proxima_revisao);
CREATE INDEX IF NOT EXISTS idx_progresso_user_estado ON assunto_progresso(user_id, estado);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 3. TABELA DE SESSÕES
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Representa uma sessão de estudo (NIVELAMENTO ou REVISÃO).
-- Toda sessão possui EXATAMENTE 10 questões.
-- TIPOS:
--   - NIVELAMENTO: Primeiro contato com o assunto (10 questões)
--   - REVISAO: Revisão espaçada (10 questões)
-- STATUS:
--   - EM_ANDAMENTO: Sessão iniciada mas não finalizada
--   - FINALIZADA: Sessão concluída
--   - CANCELADA: Sessão cancelada pelo usuário
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS sessoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assunto_id UUID NOT NULL REFERENCES assuntos(id) ON DELETE CASCADE,
    
    -- Tipo de sessão
    tipo VARCHAR(50) CHECK (tipo IN ('NIVELAMENTO', 'REVISAO')) NOT NULL,
    
    -- Status da sessão
    status VARCHAR(50) CHECK (status IN ('EM_ANDAMENTO', 'FINALIZADA', 'CANCELADA')) DEFAULT 'EM_ANDAMENTO',
    
    -- Resultados (calculados ao finalizar)
    total_questoes INT DEFAULT 10,
    total_acertos INT DEFAULT 0,
    nota DECIMAL(3, 1), -- Nota de 0 a 10
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    finalized_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_sessoes_user ON sessoes(user_id);
CREATE INDEX IF NOT EXISTS idx_sessoes_assunto ON sessoes(assunto_id);
CREATE INDEX IF NOT EXISTS idx_sessoes_status ON sessoes(status);
CREATE INDEX IF NOT EXISTS idx_sessoes_tipo ON sessoes(tipo);
CREATE INDEX IF NOT EXISTS idx_sessoes_user_status ON sessoes(user_id, status);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 4. TABELA DE ITENS DA SESSÃO
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Armazena cada questão individual de uma sessão.
-- Toda sessão possui exatamente 10 itens (ordem 1-10).
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS sessao_itens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sessao_id UUID NOT NULL REFERENCES sessoes(id) ON DELETE CASCADE,
    questao_id UUID NOT NULL REFERENCES questao_base(id) ON DELETE CASCADE,
    
    -- Ordem da questão na sessão (1-10)
    ordem INT NOT NULL CHECK (ordem >= 1 AND ordem <= 10),
    
    -- Resposta do usuário
    resposta_usuario CHAR(1), -- 'a', 'b', 'c', 'd', 'e'
    esta_correta BOOLEAN,
    tempo_resposta_segundos INT,
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Garantir ordem única por sessão
    UNIQUE(sessao_id, ordem)
);

CREATE INDEX IF NOT EXISTS idx_sessao_itens_sessao ON sessao_itens(sessao_id);
CREATE INDEX IF NOT EXISTS idx_sessao_itens_questao ON sessao_itens(questao_id);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 5. TABELA DE USO DE QUESTÕES POR USUÁRIO
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- REGRA ANTI-REPETIÇÃO:
-- Uma questão NÃO pode ser repetida para o mesmo usuário
-- dentro do mesmo assunto.
-- 
-- Esta tabela rastreia todas as questões já usadas por cada usuário
-- em cada assunto, garantindo que não haja repetição.
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS questao_uso_usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assunto_id UUID NOT NULL REFERENCES assuntos(id) ON DELETE CASCADE,
    questao_id UUID NOT NULL REFERENCES questao_base(id) ON DELETE CASCADE,
    
    -- Controle de uso
    foi_usada BOOLEAN DEFAULT TRUE,
    foi_acertada BOOLEAN,
    data_uso TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sessao_id UUID REFERENCES sessoes(id),
    
    -- Garantir que cada questão seja usada apenas uma vez por usuário + assunto
    UNIQUE(user_id, assunto_id, questao_id)
);

CREATE INDEX IF NOT EXISTS idx_uso_user_assunto ON questao_uso_usuario(user_id, assunto_id);
CREATE INDEX IF NOT EXISTS idx_uso_questao ON questao_uso_usuario(questao_id);
CREATE INDEX IF NOT EXISTS idx_uso_data ON questao_uso_usuario(data_uso);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 6. TABELA DE AGENDA DE REVISÕES
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- O CALENDÁRIO É GERADO AUTOMATICAMENTE.
-- Para cada assunto, existe NO MÁXIMO UMA revisão futura agendada.
-- A data é recalculada a cada sessão.
-- 
-- ESTADOS:
--   - PENDENTE: Revisão agendada, aguardando execução
--   - CONCLUIDA: Revisão realizada
--   - ATRASADA: data_programada < hoje E status = PENDENTE
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE TABLE IF NOT EXISTS agenda_revisoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    assunto_id UUID NOT NULL REFERENCES assuntos(id) ON DELETE CASCADE,
    
    -- Data programada para revisão
    data_programada DATE NOT NULL,
    
    -- Status da agenda
    status VARCHAR(50) CHECK (status IN ('PENDENTE', 'CONCLUIDA', 'ATRASADA')) DEFAULT 'PENDENTE',
    
    -- Referência à sessão quando concluída
    sessao_id UUID REFERENCES sessoes(id),
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Garantir apenas uma agenda por usuário + assunto + data
    UNIQUE(user_id, assunto_id, data_programada)
);

CREATE INDEX IF NOT EXISTS idx_agenda_user ON agenda_revisoes(user_id);
CREATE INDEX IF NOT EXISTS idx_agenda_data ON agenda_revisoes(data_programada);
CREATE INDEX IF NOT EXISTS idx_agenda_status ON agenda_revisoes(status);
CREATE INDEX IF NOT EXISTS idx_agenda_user_data ON agenda_revisoes(user_id, data_programada);
CREATE INDEX IF NOT EXISTS idx_agenda_user_status ON agenda_revisoes(user_id, status);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 7. FUNÇÃO AUXILIAR: ATUALIZAR STATUS DE REVISÕES ATRASADAS
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Esta função deve ser executada diariamente (via cron ou trigger)
-- para marcar revisões vencidas como ATRASADAS.
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE OR REPLACE FUNCTION atualizar_revisoes_atrasadas()
RETURNS void AS $$
BEGIN
    UPDATE agenda_revisoes
    SET status = 'ATRASADA'
    WHERE data_programada < CURRENT_DATE
      AND status = 'PENDENTE';
END;
$$ LANGUAGE plpgsql;

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 8. FUNÇÃO AUXILIAR: CALCULAR INTERVALO DE REVISÃO
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- REGRA FIXA DE CÁLCULO DA REVISÃO ESPAÇADA:
--   - NOTA 0–3  → revisar em 3 dias
--   - NOTA 4–5  → revisar em 7 dias
--   - NOTA 6–7  → revisar em 14 dias
--   - NOTA 8–9  → revisar em 30 dias
--   - NOTA 10   → revisar em 45 dias
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE OR REPLACE FUNCTION calcular_intervalo_revisao(nota DECIMAL)
RETURNS INT AS $$
BEGIN
    IF nota >= 10 THEN
        RETURN 45;
    ELSIF nota >= 8 THEN
        RETURN 30;
    ELSIF nota >= 6 THEN
        RETURN 14;
    ELSIF nota >= 4 THEN
        RETURN 7;
    ELSE
        RETURN 3;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- 9. ROW LEVEL SECURITY (RLS)
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- Garantir que usuários só acessem seus próprios dados.
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Habilitar RLS em todas as tabelas
ALTER TABLE assunto_progresso ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessao_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE questao_uso_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE agenda_revisoes ENABLE ROW LEVEL SECURITY;

-- Políticas para assunto_progresso
CREATE POLICY "Usuários podem ver apenas seu próprio progresso"
    ON assunto_progresso FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio progresso"
    ON assunto_progresso FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seu próprio progresso"
    ON assunto_progresso FOR UPDATE
    USING (auth.uid() = user_id);

-- Políticas para sessoes
CREATE POLICY "Usuários podem ver apenas suas próprias sessões"
    ON sessoes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias sessões"
    ON sessoes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias sessões"
    ON sessoes FOR UPDATE
    USING (auth.uid() = user_id);

-- Políticas para sessao_itens
CREATE POLICY "Usuários podem ver itens de suas próprias sessões"
    ON sessao_itens FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM sessoes
        WHERE sessoes.id = sessao_itens.sessao_id
        AND sessoes.user_id = auth.uid()
    ));

CREATE POLICY "Usuários podem inserir itens em suas próprias sessões"
    ON sessao_itens FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM sessoes
        WHERE sessoes.id = sessao_itens.sessao_id
        AND sessoes.user_id = auth.uid()
    ));

-- Políticas para questao_uso_usuario
CREATE POLICY "Usuários podem ver apenas seu próprio uso de questões"
    ON questao_uso_usuario FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir seu próprio uso de questões"
    ON questao_uso_usuario FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Políticas para agenda_revisoes
CREATE POLICY "Usuários podem ver apenas sua própria agenda"
    ON agenda_revisoes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir em sua própria agenda"
    ON agenda_revisoes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar sua própria agenda"
    ON agenda_revisoes FOR UPDATE
    USING (auth.uid() = user_id);

-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- FIM DO SCHEMA
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
