# Sistema Inteligente de Editais - QRub

## Goal
Build a complete "Sistema Inteligente de Editais" module in QRub with DB, admin UI, public page, question import and anti-whitepage protection.

## Tasks

- [x] Task 1: DB migration — Create editais, edital_eventos, edital_links, logs_admin tables with RLS → Verify: tables visible in Supabase
- [x] Task 2: Lib layer — src/lib/editais.ts with CRUD + extraction helpers → Verify: no TS errors
- [x] Task 3: Public page — /dashboard/editais/page.tsx (list) + /dashboard/editais/[slug]/page.tsx (detail) → Verify: renders without crash
- [x] Task 4: Admin page — /admin/editais/page.tsx (CRUD dashboard) → Verify: renders
- [x] Task 5: Question import modal — src/components/edital-import-questoes.tsx → Verify: renders
- [x] Task 6: Anti-whitepage — error boundaries + skeletons everywhere → Verify: no crashes
- [x] Task 7: Wire up navigation in admin layout → Verify: link works
- [x] Task 8: Browser test → Verify: end to end smoke test passes

## Done When
- [ ] Admin can create/publish an edital
- [ ] Users can view edital list and detail page
- [ ] No white screens under any path
