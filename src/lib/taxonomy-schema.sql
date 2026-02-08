
-- ============================================
-- TAXONOMY SYSTEM
-- ============================================

-- 1. Taxonomy Table
CREATE TABLE IF NOT EXISTS public.taxonomia (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL, -- e.g. 'clinica-medica', 'cardiologia', 'iam'
    name TEXT NOT NULL, -- e.g. 'Clínica Médica'
    parent_id UUID REFERENCES public.taxonomia(id) ON DELETE SET NULL,
    level TEXT NOT NULL CHECK (level IN ('course', 'specialty', 'subspecialty', 'subject')),
    active BOOLEAN DEFAULT TRUE,
    "order" INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint to ensure slugs are unique per level (optional, but good for sanity)
    -- Actually slugs should probably be globally unique to avoid confusion, 
    -- or at least unique per parent. Let's stick to simple unique constraint on slug for now 
    -- as the current system relies on globally unique strings for IDs often.
    -- However, different specialties might have a sub called 'geral'.
    -- So unique constraint should be (slug, level, parent_id) or just allow duplicates 
    -- if the code handles path matching.
    -- Given the legacy data uses string IDs that look globally unique (e.g. 'clinica-medica'),
    -- but 'geral' repeats. 
    -- 'geral' is a problem. 'cardiologia' -> 'geral', 'endocrino' -> 'geral'.
    -- So slug is NOT globally unique.
    
    UNIQUE(slug, parent_id) 
);

-- Indicies
CREATE INDEX IF NOT EXISTS idx_taxonomia_parent ON public.taxonomia(parent_id);
CREATE INDEX IF NOT EXISTS idx_taxonomia_slug ON public.taxonomia(slug);
CREATE INDEX IF NOT EXISTS idx_taxonomia_level ON public.taxonomia(level);

-- 2. Audit Log
CREATE TABLE IF NOT EXISTS public.taxonomy_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES public.users(id),
    action TEXT NOT NULL, -- 'MOVE', 'MERGE', 'UPDATE', 'CREATE'
    target_id UUID,
    details JSONB NOT NULL, -- { from: ..., to: ..., corrupted_count: ... }
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE public.taxonomia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.taxonomy_audit_log ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read taxonomy" ON public.taxonomia FOR SELECT USING (true);
CREATE POLICY "Master write taxonomy" ON public.taxonomia FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'MASTER')
);

CREATE POLICY "Master read audit" ON public.taxonomy_audit_log FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'MASTER')
);
CREATE POLICY "Master insert audit" ON public.taxonomy_audit_log FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'MASTER')
);
