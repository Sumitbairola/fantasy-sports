'use client';

import { Player } from '@/types';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onToggle: (player: Player) => void;
  disabled?: boolean;
}

export function PlayerCard({ player, isSelected, onToggle, disabled }: PlayerCardProps) {
  return (
    <div
      onClick={() => !disabled && onToggle(player)}
      className={cn(
        'flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all bg-white',
        isSelected && 'ring-2 ring-pink-500',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {/* Player Info */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
          <Image
            src={player.team_logo || '/placeholder-player.png'}
            alt={player.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{player.short_name}</p>
                    <p className="text-xs text-gray-500">{player.team_short_name} - {player.role === 'All-Rounder' ? 'AR' : player.role === 'Wicket-Keeper' ? 'WK' : player.role === 'Batsman' ? 'Bat' : 'Bowl'}</p>
        </div>
      </div>

      {/* Stats - Points */}
      <div className="w-16 text-center shrink-0">
        <p className="text-sm font-semibold">{player.event_total_points}</p>
      </div>

      {/* Stats - Credits */}
      <div className="w-16 text-center shrink-0">
        <p className="text-sm font-semibold">{player.event_player_credit}</p>
      </div>

      {/* Selection Checkbox */}
      <div className="w-10 flex justify-center shrink-0">
        <div
          className={cn(
            'w-6 h-6 rounded border-2 flex items-center justify-center transition-all',
            isSelected ? 'bg-pink-500 border-pink-500' : 'border-gray-300'
          )}
        >
          {isSelected && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
    </div>
  );
}
