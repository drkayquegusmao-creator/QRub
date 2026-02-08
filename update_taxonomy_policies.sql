
-- Update policies to include ADMIN role for taxonomy management
DROP POLICY IF EXISTS "Master write taxonomy" ON public.taxonomia;
CREATE POLICY "Admin write taxonomy" ON public.taxonomia FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('MASTER', 'ADMIN'))
);

DROP POLICY IF EXISTS "Master read audit" ON public.taxonomy_audit_log;
CREATE POLICY "Admin read audit" ON public.taxonomy_audit_log FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('MASTER', 'ADMIN'))
);

DROP POLICY IF EXISTS "Master insert audit" ON public.taxonomy_audit_log;
CREATE POLICY "Admin insert audit" ON public.taxonomy_audit_log FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('MASTER', 'ADMIN'))
);
