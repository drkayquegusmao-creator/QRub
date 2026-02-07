# Rank Elite Module

## Overview
The Rank Elite module is a self-contained competitive game mode for QRub. It features a separate progression system (Leagues), permanent player growth (XP/Levels), and a functional rewards system.

## Components
- **RankEliteModule (`index.tsx`)**: Main entry point. Handles view switching (Lobby, Match, Result, Rewards, Admin) and initialization.
- **Lobby (`lobby.tsx`)**: Main dashboard. Shows player stats, league progress, top rankings, and weekly missions.
- **ArenaMatch (`arena-match.tsx`)**: The gameplay engine. Fetches approved questions, handles scoring, and tracks session duration.
- **MatchResult (`match-result.tsx`)**: Summary screen showing points, XP, and accuracy after a match.
- **AdminDashboard (`admin-dashboard.tsx`)**: Internal tool for managing seasons and content.
- **RewardsView (`rewards-view.tsx`)**: Player customization screen for equipping unlocked items.

## State Management (`use-rank-elite.ts`)
Uses Zustand for state. Key actions:
- `init(userId)`: Fetches or creates Profile, XP Profile, League info, and Missions.
- `startMatch(mode)`: Creates a match record in DB.
- `finishMatch(matchId, stats)`: 
  - Updates match status.
  - Updates User Profile (Season Points -> League Calculation).
  - Updates XP Profile (Total XP -> Level Calculation).
  - **Passive Integration**: Inserts incorrect answers into `error_notebook`.
  - **Missions**: Increments progress for active missions.
- `claimMission(missionId)`: Grants rewards and marks mission as claimed.

## Database Schema (Supabase)
- `rank_seasons`: Manages active seasons.
- `rank_leagues`: Definitions for Bronze, Silver, Gold, etc.
- `rank_profiles`: User season data (Points, League).
- `rank_xp_profiles`: User permanent data (XP, Level).
- `rank_matches`: Game history.
- `rank_user_missions`: User specific mission progress.
- `rank_user_rewards`: Unlocked/Equipped rewards.
- `error_notebook`: (Passive Integration) Where errors are logged.

## How to Test
1. **Initialize**: Open the module. It should auto-create a profile if none exists.
2. **Play Match**: Click "Jogar Agora". Answer questions.
3. **Verify Results**: Finish match. Check "Resultado" screen.
4. **Check DB**:
   - `rank_profiles` should have increased `season_points`.
   - `rank_xp_profiles` should have increased `xp_total`.
   - `error_notebook` should have entries for wrong answers.
   - `rank_user_missions` should have incremented `progress` by 1.
5. **Admin**: If your user role is `MASTER`, you will see the "Admin Rank Elite" button.

## Future Improvements
- Implement "Arena Semanal" specific timer/logic.
- Add backend cron jobs for weekly league resets.
- Expand Reward Catalog with 3D assets.
