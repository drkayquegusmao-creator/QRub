-- ========================================================
-- QRUB EMERGENCY FIX: TABLES FOR USER STATS & PREFERENCES
-- ========================================================
-- Execute este script no SQL Editor do seu projeto Supabase 
-- para resolver o erro de "Tela em Branco" e Tabelas Faltantes.

-- 1. Tabela de Preferências do Usuário
CREATE TABLE IF NOT EXISTS public.user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    questions_font TEXT DEFAULT 'default' CHECK (questions_font IN ('default', 'arial', 'times')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Habilitar RLS para Preferências
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Políticas para Preferências
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can manage own preferences') THEN
        CREATE POLICY "Users can manage own preferences" ON public.user_preferences
            FOR ALL USING (auth.uid() = user_id);
    END IF;
END $$;

-- 2. Tabela de Estatísticas do Usuário
CREATE TABLE IF NOT EXISTS public.user_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    total_questoes INTEGER DEFAULT 0,
    total_acertos INTEGER DEFAULT 0,
    media_geral NUMERIC DEFAULT 0,
    nivel_usuario TEXT DEFAULT 'Iniciante',
    ultima_frase_exibida TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para Estatísticas
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Políticas para Estatísticas
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policy WHERE polname = 'Users can manage own stats') THEN
        CREATE POLICY "Users can manage own stats" ON public.user_stats
            FOR ALL USING (auth.uid() = user_id);
    END IF;
END $$;

-- 3. Função e Trigger para updated_at (se não existirem)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_stats_updated_at') THEN
        CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON public.user_stats
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- 4. Garantir Permissões
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
