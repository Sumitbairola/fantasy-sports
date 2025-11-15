'use client';

import { PlayerRole } from '@/types';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface RoleFilterProps {
  onFilterChange: (role: PlayerRole | 'all') => void;
  selectedRole: PlayerRole | 'all';
}

export function RoleFilter({ onFilterChange, selectedRole }: RoleFilterProps) {
  const { currentTeam } = useSelector((state: RootState) => state.team);

  // Calculate role counts dynamically
  const getRoleCounts = () => {
    return currentTeam.players.reduce(
      (acc, player) => {
        const role = player.role;
        if (role === 'Wicket-Keeper') acc.wk++;
        else if (role === 'Batsman') acc.bat++;
        else if (role === 'All-Rounder') acc.ar++;
        else if (role === 'Bowler') acc.bowl++;
        return acc;
      },
      { wk: 0, bat: 0, ar: 0, bowl: 0 }
    );
  };

  const counts = getRoleCounts();

  const roles: Array<{ value: PlayerRole; label: string; count: number }> = [
    { value: 'Wicket-Keeper', label: 'WK', count: counts.wk },
    { value: 'Batsman', label: 'Batsman', count: counts.bat },
    { value: 'All-Rounder', label: 'AR', count: counts.ar },
    { value: 'Bowler', label: 'Bowler', count: counts.bowl },
  ];

  return (
    <div className="flex items-center overflow-x-auto pb-2">
      {roles.map((role) => (
        <button
          key={role.value}
          onClick={() => onFilterChange(role.value)}
          className={cn(
            'px-4 py-2 text-sm font-medium whitespace-nowrap transition-all shrink-0',
            selectedRole === role.value
              ? 'text-pink-500 border-b-2 border-pink-500'
              : 'text-gray-500 border-b-2 border-transparent'
          )}
        >
          {role.label} ({role.count})
        </button>
      ))}
    </div>
  );
}
