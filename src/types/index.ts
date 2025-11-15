export interface Match {
  id: number;
  match_name: string;
  event_name: string;
  match_type: string;
  match_date: string;
  match_status: string;
  t1_name: string;
  t2_name: string;
  t1_short_name: string;
  t2_short_name: string;
  t1_image: string;
  t2_image: string;
  team_a_id: number;
  team_b_id: number;
}

export interface Player {
  id: number;
  player_id: string;
  name: string;
  short_name: string;
  team_name: string;
  team_short_name: string;
  team_logo: string;
  team_id: number;
  role: PlayerRole;
  event_total_points: number;
  event_player_credit: number;
  country: string;
  is_playing: boolean;
  isSelected?: boolean;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
}

export type PlayerRole = 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';

export interface Team {
  id: string;
  matchId: string;
  name: string;
  players: Player[];
  captain?: Player;
  viceCaptain?: Player;
  totalCredits: number;
  createdAt: string;
  contestsJoined: number;
}

export interface TeamConstraints {
  totalPlayers: 11;
  maxCredits: 100;
  maxPlayersPerTeam: 7;
  roles: {
    batsman: { min: 3; max: 7 };
    bowler: { min: 3; max: 7 };
    allRounder: { min: 0; max: 4 };
    wicketKeeper: { min: 1; max: 5 };
  };
}

export interface RoleCount {
  batsman: number;
  bowler: number;
  allRounder: number;
  wicketKeeper: number;
}

export interface PlayerFilters {
  role?: string | 'ALL';
  team?: string | 'ALL';
  searchTerm?: string;
}
