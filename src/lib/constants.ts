import { TeamConstraints } from '@/types';

export const TEAM_CONSTRAINTS: TeamConstraints = {
  totalPlayers: 11,
  maxCredits: 100,
  maxPlayersPerTeam: 7,
  roles: {
    batsman: { min: 3, max: 7 },
    bowler: { min: 3, max: 7 },
    allRounder: { min: 0, max: 4 },
    wicketKeeper: { min: 1, max: 5 },
  },
};

export const API_ENDPOINTS = {
  matches: process.env.NEXT_PUBLIC_MATCHES_API || '',
  players: process.env.NEXT_PUBLIC_PLAYERS_API || '',
};

export const ROLE_COLORS: Record<string, string> = {
  Batsman: 'bg-blue-500',
  Bowler: 'bg-red-500',
  'All-Rounder': 'bg-green-500',
  'Wicket-Keeper': 'bg-yellow-500',
};

export const PLAYER_ROLES: Record<string, string> = {
  'Batsman': 'Batsman',
  'Bowler': 'Bowler',
  'All-Rounder': 'All-Rounder',
  'Wicket-Keeper': 'Wicket-Keeper',
};

export const TABS = [
  { id: 'all', label: 'All' },
  { id: 'joined', label: 'Joined' },
];

export const MATCH_TABS = [
  { id: 'matches', label: 'Matches' },
  { id: 'live', label: 'Live' },
  { id: 'completed', label: 'Completed' },
];
