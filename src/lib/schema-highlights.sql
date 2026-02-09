-- Create highlights table
CREATE TABLE IF NOT EXISTS public.highlights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL, -- Generic reference to question ID (could be UUID from questao_base)
    field TEXT NOT NULL, -- 'enunciado', 'comando', 'justificativa', etc.
    start_index INTEGER NOT NULL,
    end_index INTEGER NOT NULL,
    color TEXT NOT NULL, -- 'yellow', 'purple', 'green', 'blue', 'pink'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    -- Constraints
    CONSTRAINT valid_range CHECK (start_index >= 0 AND end_index > start_index)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_highlights_user_question ON public.highlights(user_id, question_id);
CREATE INDEX IF NOT EXISTS idx_highlights_lookup ON public.highlights(user_id, question_id, field);

-- RLS Policies
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own highlights"
    ON public.highlights FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own highlights"
    ON public.highlights FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own highlights"
    ON public.highlights FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own highlights"
    ON public.highlights FOR DELETE
    USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_highlights_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_highlights_updated_at ON public.highlights;
CREATE TRIGGER trigger_highlights_updated_at
    BEFORE UPDATE ON public.highlights
    FOR EACH ROW
    EXECUTE FUNCTION update_highlights_updated_at();
