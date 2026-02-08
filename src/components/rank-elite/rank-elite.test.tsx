import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RankEliteModule } from './index';

// 1. Mock the Stores
// We need to mock useRankElite and useAuth because the component uses them directly.

jest.mock('@/store/use-rank-elite', () => {
    // Determine the actual store implementation or a simple mock
    return {
        useRankElite: jest.fn(),
        MatchMode: jest.fn()
    };
});

jest.mock('@/store/use-auth', () => ({
    useAuth: jest.fn()
}));

// Import the mocked hooks to change their implementation per test
import { useRankElite } from '@/store/use-rank-elite';
import { useAuth } from '@/store/use-auth';

describe('RankEliteModule', () => {
    const mockOnClose = jest.fn();

    // Default Mock Data
    const mockUser = {
        id: 'user-123',
        name: 'Test Recruit',
        role: 'USER'
    };

    const mockProfile = {
        user_id: 'user-123',
        current_league_id: 'league-bronze',
        season_points: 1500,
        rank_elite_admin: false
    };

    const mockXPProfile = {
        user_id: 'user-123',
        xp_total: 5000,
        level_current: 10
    };

    const mockLeagues = [
        { id: 'league-bronze', name: 'BRONZE', min_points: 0, max_points: 1000 },
        { id: 'league-silver', name: 'PRATA', min_points: 1001, max_points: 2500 }
    ];

    const mockMissions = [
        {
            id: 'mission-1',
            name: 'Daily Grinder',
            description: 'Win 3 rapid matches',
            progress: 3,
            goal: 3,
            status: 'COMPLETED',
            reward: { points: 100, xp: 50 }
        }
    ];

    // Actions
    const mockInit = jest.fn();
    const mockStartMatch = jest.fn().mockResolvedValue('match-123');
    const mockClaimMission = jest.fn();
    const mockEquipReward = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        // Setup Default Mock returns
        (useAuth as unknown as jest.Mock).mockReturnValue({ user: mockUser });

        (useRankElite as unknown as jest.Mock).mockReturnValue({
            init: mockInit,
            activeSeason: { id: 'season-1', name: 'Season 1: Genesis' },
            profile: mockProfile,
            xpProfile: mockXPProfile,
            leagues: mockLeagues,
            missions: mockMissions,
            rewards: [],
            isAdmin: false,
            isLoading: false,
            error: null,
            equipReward: mockEquipReward,
            startMatch: mockStartMatch,
            claimMission: mockClaimMission
        });
    });

    // TEST 1: Rendering
    test('renders Rank Elite Lobby correctly', () => {
        render(<RankEliteModule onClose={mockOnClose} />);

        // Check Header
        expect(screen.getByText('Rank Elite')).toBeInTheDocument();
        expect(screen.getByText('Season 1: Genesis')).toBeInTheDocument();

        // Check Profile Info
        expect(screen.getByText('Test Recruit')).toBeInTheDocument();
        expect(screen.getByText('Nível 10')).toBeInTheDocument();

        // Check League (Bronze is current league logic in component? No, mockProfile says bronze is current, but has 1500 pts? Let's check logic.)
        // Component logic finds league by ID.
        // mockProfile.current_league_id = 'league-bronze' -> Name is BRONZE.
        expect(screen.getByText('BRONZE')).toBeInTheDocument();
        expect(screen.getByText('1500 PONTOS DA SEASON')).toBeInTheDocument();
    });

    // TEST 2: Start Match
    test('calls startMatch when "Jogar Agora" is clicked', async () => {
        render(<RankEliteModule onClose={mockOnClose} />);

        // The "Jogar Agora" button text
        const playButton = screen.getByText('Jogar Agora');
        fireEvent.click(playButton);

        await waitFor(() => {
            expect(mockStartMatch).toHaveBeenCalledWith('user-123', 'RAPIDA');
        });
    });

    // TEST 3: Claim Mission
    test('calls claimMission when "RESGATAR" is clicked on a completed mission', async () => {
        render(<RankEliteModule onClose={mockOnClose} />);

        // Find the mission and the Claim button
        expect(screen.getByText('Daily Grinder')).toBeInTheDocument();
        const claimButton = screen.getByText('RESGATAR');

        fireEvent.click(claimButton);

        await waitFor(() => {
            expect(mockClaimMission).toHaveBeenCalledWith('mission-1');
        });
    });

    // TEST 4: Navigation to Rewards
    test('navigates to Rewards View when clicked', () => {
        render(<RankEliteModule onClose={mockOnClose} />);

        const rewardsButton = screen.getByText(/Recompensas & Nível/i);
        fireEvent.click(rewardsButton);

        // Check if Rewards View content is visible (e.g. "Linha do Tempo de Recompensas")
        // We need to check implementation of RewardsView or assume it renders unique text
        // In `rewards-view.tsx`: has text "Linha do Tempo de Recompensas"
        expect(screen.getByText(/Linha do Tempo de Recompensas/i)).toBeInTheDocument();
    });

    // TEST 5: Admin Button (Visibility)
    test('does not show Admin button for regular user', () => {
        render(<RankEliteModule onClose={mockOnClose} />);
        const adminButton = screen.queryByText(/Admin Rank Elite/i);
        expect(adminButton).not.toBeInTheDocument();
    });

    test('shows Admin button for admin user', () => {
        (useRankElite as unknown as jest.Mock).mockReturnValue({
            ...(useRankElite as unknown as jest.Mock)(), // Use current mock return
            isAdmin: true      // Override
        });

        render(<RankEliteModule onClose={mockOnClose} />);

        const adminButton = screen.getByText(/Admin Rank Elite/i);
        expect(adminButton).toBeInTheDocument();
    });

    // TEST 6: Close Event
    test('calls onClose when X button is clicked', () => {
        render(<RankEliteModule onClose={mockOnClose} />);

        const closeButton = screen.getByLabelText('Fechar');
        fireEvent.click(closeButton);

        expect(mockOnClose).toHaveBeenCalled();
    });
});
