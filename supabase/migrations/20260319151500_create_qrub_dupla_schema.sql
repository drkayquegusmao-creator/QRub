-- Migration: create_qrub_dupla_module

-- 1. duo_sessions
CREATE TABLE public.duo_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    module_name TEXT DEFAULT 'QRub Dupla',
    host_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    guest_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'waiting', -- waiting, paired, ready_check, configuring, content_ready, in_progress, paused, finished, cancelled, expired
    study_mode TEXT,
    question_source_type TEXT,
    filters_json JSONB,
    question_ids_json JSONB,
    current_question_index INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    host_ready BOOLEAN DEFAULT false,
    guest_ready BOOLEAN DEFAULT false,
    allow_video BOOLEAN DEFAULT true,
    allow_audio BOOLEAN DEFAULT true,
    allow_chat BOOLEAN DEFAULT true,
    sync_version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    expires_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 2. duo_session_participants
CREATE TABLE public.duo_session_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.duo_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('host', 'guest')),
    display_name TEXT,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    left_at TIMESTAMP WITH TIME ZONE,
    is_online BOOLEAN DEFAULT true,
    is_ready BOOLEAN DEFAULT false,
    mic_enabled BOOLEAN DEFAULT false,
    cam_enabled BOOLEAN DEFAULT false,
    connection_status TEXT DEFAULT 'online',
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    reconnect_count INTEGER DEFAULT 0,
    UNIQUE(session_id, user_id)
);

-- 3. duo_session_answers
CREATE TABLE public.duo_session_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.duo_sessions(id) ON DELETE CASCADE,
    question_id UUID, 
    question_index INTEGER NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    selected_alternative TEXT,
    is_correct BOOLEAN,
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    response_time_ms INTEGER,
    revision_flag BOOLEAN DEFAULT false,
    sent_to_error_notebook BOOLEAN DEFAULT false,
    UNIQUE(session_id, question_index, user_id)
);

-- 4. duo_session_messages
CREATE TABLE public.duo_session_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.duo_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    question_index INTEGER,
    message_text TEXT NOT NULL,
    message_type TEXT DEFAULT 'text', -- text, system, alert, event
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 5. duo_session_events
CREATE TABLE public.duo_session_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.duo_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    payload_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- 6. duo_session_results
CREATE TABLE public.duo_session_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.duo_sessions(id) ON DELETE CASCADE,
    host_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    guest_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    host_score INTEGER DEFAULT 0,
    guest_score INTEGER DEFAULT 0,
    agreement_rate NUMERIC,
    divergent_questions_count INTEGER DEFAULT 0,
    same_answer_count INTEGER DEFAULT 0,
    duration_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- RLS Enable and Policies
ALTER TABLE public.duo_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duo_session_results ENABLE ROW LEVEL SECURITY;

-- Simple RLS for MVP (can be restricted later)
CREATE POLICY "Users can access their own sessions." ON public.duo_sessions 
FOR ALL USING (auth.uid() = host_user_id OR auth.uid() = guest_user_id OR status = 'waiting');

CREATE POLICY "Users can access participants." ON public.duo_session_participants 
FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can access answers of their session." ON public.duo_session_answers 
FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can access session messages." ON public.duo_session_messages
FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can access session events." ON public.duo_session_events
FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can access session results." ON public.duo_session_results
FOR ALL USING (auth.uid() IS NOT NULL);

-- Functions
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_duo_sessions
BEFORE UPDATE ON public.duo_sessions
FOR EACH ROW EXECUTE PROCEDURE set_updated_at();
