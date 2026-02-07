-- Rank Elite Schema

-- 1. Seasons
create table if not exists public.rank_seasons (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    start_date timestamptz not null,
    end_date timestamptz not null,
    status text check (status in ('ACTIVE', 'FINISHED', 'UPCOMING')) default 'UPCOMING',
    created_at timestamptz default now()
);

-- 2. Leagues
create table if not exists public.rank_leagues (
    id uuid default gen_random_uuid() primary key,
    name text not null unique, -- BRONZE, PRATA, OURO, PLATINA, DIAMANTE, ELITE
    min_points integer not null,
    max_points integer, -- NULL for ELITE (infinite)
    difficulty_profile jsonb default '{}'::jsonb, -- Config for question difficulty
    multipliers jsonb default '{"xp": 1.0, "points": 1.0}'::jsonb,
    is_active boolean default true,
    created_at timestamptz default now()
);

-- 3. Profiles (Seasonal)
create table if not exists public.rank_profiles (
    user_id uuid references auth.users(id) on delete cascade primary key,
    current_league_id uuid references public.rank_leagues(id),
    season_points integer default 0,
    lifetime_points integer default 0,
    streak_days integer default 0,
    last_play_at timestamptz,
    rank_elite_admin boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 4. XP Profiles (Permanent)
create table if not exists public.rank_xp_profiles (
    user_id uuid references auth.users(id) on delete cascade primary key,
    xp_total integer default 0,
    level_current integer default 1,
    last_xp_gain_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 5. Matches
create table if not exists public.rank_matches (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    season_id uuid references public.rank_seasons(id) not null,
    league_id uuid references public.rank_leagues(id) not null,
    mode text not null, -- RAPIDA, DIARIA, ARENA
    status text check (status in ('IN_PROGRESS', 'FINISHED', 'ABORTED')) default 'IN_PROGRESS',
    correct_count integer default 0,
    wrong_count integer default 0,
    total_points integer default 0,
    total_xp integer default 0,
    total_questions integer default 0,
    finished_at timestamptz,
    created_at timestamptz default now()
);

-- 6. Mission Templates
create table if not exists public.rank_mission_templates (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    description text,
    goal integer not null,
    reward jsonb not null, -- { type: 'XP' | 'POINTS', value: 100 }
    frequency text check (frequency in ('DAILY', 'WEEKLY')) default 'WEEKLY',
    is_active boolean default true,
    created_at timestamptz default now()
);

-- 7. User Missions
create table if not exists public.rank_user_missions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    template_id uuid references public.rank_mission_templates(id) not null,
    season_id uuid references public.rank_seasons(id) not null,
    progress integer default 0,
    goal integer not null,
    status text check (status in ('IN_PROGRESS', 'COMPLETED', 'CLAIMED')) default 'IN_PROGRESS',
    claimed_at timestamptz,
    created_at timestamptz default now(),
    unique(user_id, template_id, season_id)
);

-- 8. Rewards Catalog
create table if not exists public.rank_rewards (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    type text check (type in ('visual', 'functional')) not null,
    config jsonb not null, -- { assetUrl: '...', cssClass: '...' }
    unlock_condition jsonb not null, -- { type: 'LEVEL' | 'LEAGUE', value: 10 }
    is_active boolean default true,
    created_at timestamptz default now()
);

-- 9. User Rewards
create table if not exists public.rank_user_rewards (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    reward_id uuid references public.rank_rewards(id) not null,
    is_equipped boolean default false,
    unlocked_at timestamptz default now(),
    unique(user_id, reward_id)
);

-- RLS Policies
alter table public.rank_seasons enable row level security;
alter table public.rank_leagues enable row level security;
alter table public.rank_profiles enable row level security;
alter table public.rank_xp_profiles enable row level security;
alter table public.rank_matches enable row level security;
alter table public.rank_mission_templates enable row level security;
alter table public.rank_user_missions enable row level security;
alter table public.rank_rewards enable row level security;
alter table public.rank_user_rewards enable row level security;

-- Public Read Policies
create policy "Public read seasons" on public.rank_seasons for select using (true);
create policy "Public read leagues" on public.rank_leagues for select using (true);
create policy "Public read mission templates" on public.rank_mission_templates for select using (true);
create policy "Public read rewards" on public.rank_rewards for select using (true);

-- User Policies
create policy "Users can read own profile" on public.rank_profiles for select using (auth.uid() = user_id);
create policy "Users can update own profile" on public.rank_profiles for update using (auth.uid() = user_id);
create policy "Users can insert own profile" on public.rank_profiles for insert with check (auth.uid() = user_id);

create policy "Users can read own xp profile" on public.rank_xp_profiles for select using (auth.uid() = user_id);
create policy "Users can update own xp profile" on public.rank_xp_profiles for update using (auth.uid() = user_id);
create policy "Users can insert own xp profile" on public.rank_xp_profiles for insert with check (auth.uid() = user_id);

create policy "Users can read own matches" on public.rank_matches for select using (auth.uid() = user_id);
create policy "Users can insert own matches" on public.rank_matches for insert with check (auth.uid() = user_id);
create policy "Users can update own matches" on public.rank_matches for update using (auth.uid() = user_id);

create policy "Users can read own missions" on public.rank_user_missions for select using (auth.uid() = user_id);
create policy "Users can update own missions" on public.rank_user_missions for update using (auth.uid() = user_id);
create policy "Users can insert own missions" on public.rank_user_missions for insert with check (auth.uid() = user_id);

create policy "Users can read own rewards" on public.rank_user_rewards for select using (auth.uid() = user_id);
create policy "Users can update own rewards" on public.rank_user_rewards for update using (auth.uid() = user_id);
create policy "Users can insert own rewards" on public.rank_user_rewards for insert with check (auth.uid() = user_id);

-- Admin Policies (Simplified Check for now, in prod utilize auth.jwt())
create policy "Admins can manage seasons" on public.rank_seasons for all using (
  exists (select 1 from public.rank_profiles where user_id = auth.uid() and rank_elite_admin = true)
);

-- Seed Initial Data (Leagues)
insert into public.rank_leagues (name, min_points, max_points) values
('BRONZE', 0, 1000),
('PRATA', 1001, 2500),
('OURO', 2501, 5000),
('PLATINA', 5001, 10000),
('DIAMANTE', 10001, 25000),
('ELITE', 25001, null)
on conflict (name) do nothing;

-- Seed Initial Data (Season 1)
insert into public.rank_seasons (name, start_date, end_date, status) values
('Season 1: Genesis', now(), now() + interval '30 days', 'ACTIVE')
-- Only insert if no active season exists
where not exists (select 1 from public.rank_seasons where status = 'ACTIVE');
