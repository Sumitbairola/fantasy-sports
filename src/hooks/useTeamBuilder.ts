import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Player, RoleCount } from '@/types';
import { TEAM_CONSTRAINTS } from '@/lib/constants';

export const useTeamBuilder = () => {
  const { currentTeam } = useSelector((state: RootState) => state.team);

  const getRoleCount = (): RoleCount => {
    return currentTeam.players.reduce(
      (acc, player) => {
        const role = player.role.toLowerCase().replace('-', '');
        if (role === 'batsman') acc.batsman++;
        else if (role === 'bowler') acc.bowler++;
        else if (role === 'allrounder') acc.allRounder++;
        else if (role === 'wicketkeeper') acc.wicketKeeper++;
        return acc;
      },
      { batsman: 0, bowler: 0, allRounder: 0, wicketKeeper: 0 }
    );
  };

  const getTotalCreditsUsed = (): number => {
    return currentTeam.players.reduce((sum, player) => sum + player.event_player_credit, 0);
  };

  const getCreditsLeft = (): number => {
    return TEAM_CONSTRAINTS.maxCredits - getTotalCreditsUsed();
  };

  const getTeamCount = (teamName: string): number => {
    return currentTeam.players.filter(p => p.team_short_name === teamName).length;
  };

  const canAddPlayer = (player: Player): { canAdd: boolean; reason?: string } => {
    if (currentTeam.players.length >= TEAM_CONSTRAINTS.totalPlayers) {
      return { canAdd: false, reason: 'Team is full' };
    }

    if (getTotalCreditsUsed() + player.event_player_credit > TEAM_CONSTRAINTS.maxCredits) {
      return { canAdd: false, reason: 'Not enough credits' };
    }

    if (getTeamCount(player.team_short_name) >= TEAM_CONSTRAINTS.maxPlayersPerTeam) {
      return { canAdd: false, reason: `Max ${TEAM_CONSTRAINTS.maxPlayersPerTeam} players from one team` };
    }

    const roleCount = getRoleCount();
    const role = player.role.toLowerCase().replace('-', '');
    
    if (role === 'batsman' && roleCount.batsman >= TEAM_CONSTRAINTS.roles.batsman.max) {
      return { canAdd: false, reason: 'Max batsmen reached' };
    }
    if (role === 'bowler' && roleCount.bowler >= TEAM_CONSTRAINTS.roles.bowler.max) {
      return { canAdd: false, reason: 'Max bowlers reached' };
    }
    if (role === 'allrounder' && roleCount.allRounder >= TEAM_CONSTRAINTS.roles.allRounder.max) {
      return { canAdd: false, reason: 'Max all-rounders reached' };
    }
    if (role === 'wicketkeeper' && roleCount.wicketKeeper >= TEAM_CONSTRAINTS.roles.wicketKeeper.max) {
      return { canAdd: false, reason: 'Max wicket-keepers reached' };
    }

    return { canAdd: true };
  };

  const isTeamValid = (): boolean => {
    if (currentTeam.players.length !== TEAM_CONSTRAINTS.totalPlayers) return false;

    const roleCount = getRoleCount();
    const constraints = TEAM_CONSTRAINTS.roles;

    return (
      roleCount.batsman >= constraints.batsman.min &&
      roleCount.batsman <= constraints.batsman.max &&
      roleCount.bowler >= constraints.bowler.min &&
      roleCount.bowler <= constraints.bowler.max &&
      roleCount.allRounder >= constraints.allRounder.min &&
      roleCount.allRounder <= constraints.allRounder.max &&
      roleCount.wicketKeeper >= constraints.wicketKeeper.min &&
      roleCount.wicketKeeper <= constraints.wicketKeeper.max
    );
  };

  return {
    currentTeam,
    getRoleCount,
    getTotalCreditsUsed,
    getCreditsLeft,
    getTeamCount,
    canAddPlayer,
    isTeamValid,
  };
};
