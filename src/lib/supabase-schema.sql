-- ============================================
-- QRub - Supabase Database Schema
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- https://supabase.com/dashboard/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'ALUNO' CHECK (role IN ('MASTER', 'ALUNO', 'VISITANTE')),
    plan_level TEXT NOT NULL DEFAULT 'FREE' CHECK (plan_level IN ('FREE', 'PREMIUM', 'INSANO')),
    profile_completed BOOLEAN DEFAULT FALSE,
    phone TEXT,
    institution TEXT,
    graduation_year TEXT,
    specialty_of_interest TEXT,
    streak INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- QUESTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.questions (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL,
    specialty_id TEXT NOT NULL,
    subspecialty_id TEXT NOT NULL,
    subject_id TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Fácil', 'Médio', 'Difícil', 'Alta', 'Média')),
    enunciado TEXT NOT NULL,
    case_study JSONB,
    options JSONB NOT NULL,
    correct_option_id TEXT NOT NULL,
    explanation TEXT NOT NULL,
    alternative_explanations JSONB,
    severe_error_alert TEXT,
    "references" TEXT,
    image_url TEXT,
    revision_link TEXT,
    hash TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- USER RESPONSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    question_id TEXT REFERENCES public.questions(id) ON DELETE CASCADE,
    specialty_id TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PAYMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.payments (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    plan TEXT NOT NULL CHECK (plan IN ('PREMIUM', 'INSANO')),
    amount DECIMAL(10, 2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ERROR NOTEBOOK TABLE (SRS System)
-- ============================================
CREATE TABLE IF NOT EXISTS public.error_notebook (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    question_id TEXT REFERENCES public.questions(id) ON DELETE CASCADE,
    specialty_id TEXT NOT NULL,
    review_count INTEGER DEFAULT 0,
    next_review_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, question_id)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_questions_specialty ON public.questions(specialty_id);
CREATE INDEX IF NOT EXISTS idx_questions_subject ON public.questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_user_responses_user ON public.user_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_responses_question ON public.user_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_payments_user ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_error_notebook_user ON public.error_notebook(user_id);
CREATE INDEX IF NOT EXISTS idx_error_notebook_next_review ON public.error_notebook(next_review_date);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_notebook ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Everyone can read questions
CREATE POLICY "Questions are viewable by everyone" ON public.questions
    FOR SELECT USING (true);

-- Only MASTER users can insert/update/delete questions
CREATE POLICY "Only MASTER can modify questions" ON public.questions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'MASTER'
        )
    );

-- Users can manage their own responses
CREATE POLICY "Users can manage own responses" ON public.user_responses
    FOR ALL USING (auth.uid() = user_id);

-- Users can view their own payments
CREATE POLICY "Users can view own payments" ON public.payments
    FOR SELECT USING (auth.uid() = user_id);

-- Users can manage their own error notebook
CREATE POLICY "Users can manage own error notebook" ON public.error_notebook
    FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON public.questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_error_notebook_updated_at BEFORE UPDATE ON public.error_notebook
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role, plan_level, profile_completed)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        'ALUNO',
        'FREE',
        FALSE
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on auth.users insert
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- MASTER ADMIN SETUP
-- ============================================
-- Após criar um usuário master via Supabase Auth,
-- execute este comando para promovê-lo a MASTER:
-- UPDATE public.users SET role = 'MASTER', plan_level = 'INSANO', profile_completed = TRUE
-- WHERE email = 'kayquegusmao@gmail.com';

-- ============================================
-- SAMPLE DATA (OPCIONAL)
-- ============================================
-- Inserir questões de exemplo
INSERT INTO public.questions (id, course_id, specialty_id, subspecialty_id, subject_id, difficulty, enunciado, options, correct_option_id, explanation)
VALUES 
(
    'QRUB-MED-GO-001',
    'medicina',
    'ginecologia-obstetricia',
    'obstetricia-alto-risco',
    'pre-eclampsia',
    'Alta',
    'Primigesta, 32 semanas, refere cefaleia persistente e turvação visual. Antecedente de HAS crônica. PA 170/115 mmHg, edema de membros inferiores (3+/4+), reflexos exaltados. Proteinúria de 24h: 5g. Plaquetas: 90.000/mm³. Creatinina: 1.2 mg/dL.',
    '[
        {"id": "a", "text": "Aguardar 37 semanas for interrupção da gestação."},
        {"id": "b", "text": "Iniciar Sulfato de Magnésio e planejar interrupção após estabilização."},
        {"id": "c", "text": "Administrar apenas Hidralazina e dar alta para pré-natal de alto risco."},
        {"id": "d", "text": "Realizar cesariana imediata sem necessidade de magnésio."},
        {"id": "e", "text": "Iniciar apenas corticoterapia para maturação pulmonar e reavaliar em 1 semana."}
    ]'::jsonb,
    'b',
    'Paciente apresenta critérios de gravidade (PA > 160/110, plaquetopenia, iminência de eclâmpsia). A conduta imediata é a prevenção de crises convulsivas com Sulfato de Magnésio.'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- GRANTS
-- ============================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- ============================================
-- STRUCTURAL GENERATOR COLUMNS
-- ============================================
ALTER TABLE public.questions 
ADD COLUMN IF NOT EXISTS area_id TEXT,
ADD COLUMN IF NOT EXISTS tema_id TEXT,
ADD COLUMN IF NOT EXISTS comando TEXT,
ADD COLUMN IF NOT EXISTS por_que_nao_as_outras JSONB,
ADD COLUMN IF NOT EXISTS erros_graves TEXT[],
ADD COLUMN IF NOT EXISTS fonte TEXT DEFAULT 'importada',
ADD COLUMN IF NOT EXISTS status_validacao TEXT DEFAULT 'PENDENTE',
ADD COLUMN IF NOT EXISTS tag_transversal TEXT[],
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'normal';

ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS subarea_id TEXT;

-- ============================================
-- SYSTEM SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES public.users(id)
);

ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can read system settings" ON public.system_settings
    FOR SELECT USING (true);

CREATE POLICY "Only MASTER can update settings" ON public.system_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'MASTER'
        )
    );

INSERT INTO public.system_settings (key, value)
VALUES ('maintenance_mode', '{"active": false, "message": "Manutenção programada"}'::jsonb)
ON CONFLICT (key) DO NOTHING;
