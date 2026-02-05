# Task: Deploy and Sync Cloud (Vercel & Supabase)

## 🎯 Goal
Finalize the deployment of QRUB to Vercel and ensure Supabase synchronization is fully functional, including the latest UI components for the SRS system.

## 📋 Context
- **Project:** QRUB (Medical Exam Prep)
- **Status:** Backend integration mostly done (75%), UI in progress (Sprint 2).
- **Recent Changes:** Uncommitted changes in `dashboard-diario-v2.tsx`, `sessao-modal.tsx`, and a new `calendar-view.tsx`.
- **Target Platforms:** Vercel (Frontend/API), Supabase (Database/Auth).

## 🛠️ Task Breakdown

### Phase 1: Local Cleanup & Commit
- [ ] Review uncommitted changes in `src/components/dashboard-diario-v2.tsx`.
- [ ] Review uncommitted changes in `src/components/sessao-modal.tsx`.
- [ ] Add and review new file `src/components/calendar-view.tsx`.
- [ ] Fix any immediate lint or build errors locally.
- [ ] Commit changes with descriptive message.

### Phase 2: Supabase Preparation
- [ ] Verify if `src/lib/schema-srs.sql` has been applied to the target Supabase project.
- [ ] Check `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
- [ ] Run `api/srs-migration` to ensure schema consistency if possible locally (or instructions for manual SQL editor).

### Phase 3: Vercel Deployment
- [ ] Run `npm run build` locally to ensure production readiness.
- [ ] Push code to GitHub `main` branch.
- [ ] Configure Vercel Project settings (Regions: `gru1` as per `vercel.json`).
- [ ] Set up Environment Variables in Vercel Dashboard.
- [ ] Trigger/Monitor Deployment.

### Phase 4: Final Validation
- [ ] Test Auth flow on production URL.
- [ ] Test Question loading from Supabase.
- [ ] Verify SRS Sync (subject progress).

## 🚀 Priority
Immediate commit and push to synchronize environments.

## ⚠️ Notes
- Ensure `isSupabaseConfigured()` is returning true in production.
- Check for any hardcoded localhost URLs in API calls.
