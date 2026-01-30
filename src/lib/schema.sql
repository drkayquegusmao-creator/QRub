-- Tabela de Usuários (Alunos e Masters)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('MASTER', 'ALUNO', 'VISITANTE')) DEFAULT 'ALUNO',
    plan_level VARCHAR(50) CHECK (plan_level IN ('FREE', 'PREMIUM', 'INSANO')) DEFAULT 'FREE',
    phone VARCHAR(20),
    institution VARCHAR(255),
    graduation_year VARCHAR(10),
    profile_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Configurações do Sistema (Single Row ou Key-Value)
CREATE TABLE system_settings (
    key VARCHAR(50) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Exemplo de chaves: 'prices', 'pix_config', 'coupons'

-- Tabela Base de Questões (O Core do Dr. QRub)
CREATE TABLE questao_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hash VARCHAR(64) UNIQUE NOT NULL, -- Hash SHA-256 do enunciado para evitar duplicação
    course_id VARCHAR(50) NOT NULL, -- ex: 'medicina'
    specialty_id VARCHAR(50) NOT NULL, -- ex: 'clinica-medica'
    subspecialty_id VARCHAR(50), -- ex: 'endocrinologia'
    subject_id VARCHAR(50), -- ex: 'cetoacidose'
    difficulty VARCHAR(20) CHECK (difficulty IN ('Fácil', 'Médio', 'Difícil', 'Alta', 'Média')),
    
    enunciado TEXT NOT NULL,
    case_study JSONB, -- Estrutura { history, physical_exam, lab_results }
    
    options JSONB NOT NULL, -- Array de objetos { id: 'a', text: '...' }
    correct_option_id CHAR(1) NOT NULL,
    
    explanation TEXT NOT NULL, -- Justificativa da correta
    alternative_explanations JSONB, -- Objeto { a: '...', b: '...' } com justificativa das erradas
    
    severe_error_alert TEXT, -- Alerta de erro grave (conduta fatal)
    
    references TEXT,
    image_url TEXT,
    revision_link TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source_agent_version VARCHAR(50) -- Versão do Agente que gerou (ex: 'v1.0')
);

-- Tabela de Vendas e Transações
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    plan_id VARCHAR(50) NOT NULL, -- 'PREMIUM' ou 'INSANO'
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')) DEFAULT 'PENDING',
    proof_url TEXT, -- URL do comprovante PIX
    coupon_code VARCHAR(50), -- Cupom utilizado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE
);

-- Índices para performance
CREATE INDEX idx_questoes_specialty ON questao_base(specialty_id);
CREATE INDEX idx_sales_user ON sales(user_id);
CREATE INDEX idx_sales_status ON sales(status);
