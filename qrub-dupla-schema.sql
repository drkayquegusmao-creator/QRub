-- qrub-dupla-schema.sql
-- Módulo QRub Dupla MVP

-- Habilitar a extensão "uuid-ossp" se não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. duo_sessions
CREATE TABLE public.duo_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(20) UNIQUE NOT NULL,
    module_name VARCHAR(100) DEFAULT 'QRub Dupla',
    host_user_id UUID NOT NULL REFERENCES auth.users(id),
    guest_user_id UUID REFERENCES auth.users(id),
    status VARCHAR(50) NOT NULL DEFAULT 'waiting', -- waiting, paired, ready_check, configuring, content_ready, in_progress, paused, finished, cancelled, expired
    study_mode VARCHAR(50),
    question_source_type VARCHAR(50),
    filters_json JSONB,
    question_ids_json JSONB,
    current_question_index INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    host_ready BOOLEAN DEFAULT false,
    guest_ready BOOLEAN DEFAULT false,
    allow_video BOOLEAN DEFAULT false,
    allow_audio BOOLEAN DEFAULT false,
    allow_chat BOOLEAN DEFAULT true,
    sync_version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    expires_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Ativar realtime para envio de states
ALTER PUBLICATION supabase_realtime ADD TABLE public.duo_sessions;

-- 2. duo_session_participants
CREATE TABLE public.duo_session_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.duo_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    role VARCHAR(20) NOT NULL, -- 'host' | 'guest'
    display_name VARCHAR(255),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    left_at TIMESTAMP WITH TIME ZONE,
    is_online BOOLEAN DEFAULT true,
    is_ready BOOLEAN DEFAULT false,
    mic_enabled BOOLEAN DEFAULT false,
    cam_enabled BOOLEAN DEFAULT false,
    connection_status VARCHAR(50) DEFAULT 'connected',
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    reconnect_count INTEGER DEFAULT 0,
    UNIQUE(session_id, user_id)
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.duo_session_participants;

-- 3. duo_session_answers
CREATE TABLE public.duo_session_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.duo_sessions(id) ON DELETE CASCADE,
    question_id UUID NOT NULL, -- Referência solta para questao_base/etc para evitar acoplamento forte
    question_index INTEGER NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    selected_alternative VARCHAR(5),
    is_correct BOOLEAN,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    response_time_ms BIGINT,
    revision_flag BOOLEAN DEFAULT false,
    sent_to_error_notebook BOOLEAN DEFAULT false,
    UNIQUE(session_id, user_id, question_index)
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.duo_session_answers;

-- 4. duo_session_messages
CREATE TABLE public.duo_session_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.duo_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id), -- Nullable for system messages
    question_index INTEGER,
    message_text TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text', -- 'text', 'system', 'warning', 'event'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER PUBLICATION supabase_realtime ADD TABLE public.duo_session_messages;

-- 5. duo_session_events
CREATE TABLE public.duo_session_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.duo_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id),
    event_type VARCHAR(100) NOT NULL,
    payload_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. duo_session_results
CREATE TABLE public.duo_session_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.duo_sessions(id) ON DELETE CASCADE UNIQUE,
    host_user_id UUID NOT NULL REFERENCES auth.users(id),
    guest_user_id UUID NOT NULL REFERENCES auth.users(id),
    host_score INTEGER DEFAULT 0,
    guest_score INTEGER DEFAULT 0,
    agreement_rate NUMERIC(5,2) DEFAULT 0.00,
    divergent_questions_count INTEGER DEFAULT 0,
    same_answer_count INTEGER DEFAULT 0,
    duration_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- RLS (Padrão: Todos os participantes da sessão podem ler/escrever na própria sessão)
ALTER TABLE public.duo_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_results ENABLE ROW LEVEL SECURITY;

-- Políticas temporárias amplas para MVP (deve ser refinado depois)
CREATE POLICY "Allow all authenticated users to read sessions" ON public.duo_sessions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow participant updates on session" ON public.duo_sessions FOR UPDATE TO authenticated USING (host_user_id = auth.uid() OR guest_user_id = auth.uid());
CREATE POLICY "Allow insert sessions" ON public.duo_sessions FOR INSERT TO authenticated WITH CHECK (true);

-- Functions para automatizar updated_at e sync_version
CREATE OR REPLACE FUNCTION update_duo_session_mod_time()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    NEW.sync_version = OLD.sync_version + 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_duo_session
    BEFORE UPDATE ON public.duo_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_duo_session_mod_time();
