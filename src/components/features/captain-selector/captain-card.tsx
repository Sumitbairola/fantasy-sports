'use client';

import { Player } from '@/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CaptainCardProps {
  player: Player;
  isCaptain: boolean;
  isViceCaptain: boolean;
  onSelectCaptain: (player: Player) => void;
  onSelectViceCaptain: (player: Player) => void;
}

export function CaptainCard({
  player,
  isCaptain,
  isViceCaptain,
  onSelectCaptain,
  onSelectViceCaptain,
}: CaptainCardProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
      {/* Player Info */}
      <div className="flex items-center space-x-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
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
          <p className="text-xs text-gray-500">{player.team_short_name} - {player.role}</p>
        </div>
      </div>

      {/* Captain Selection */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onSelectCaptain(player)}
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all',
            isCaptain
              ? 'bg-linear-to-r from-pink-500 to-red-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          C
        </button>
        <button
          onClick={() => onSelectViceCaptain(player)}
          className={cn(
            'px-3 py-2 rounded-full font-medium text-xs transition-all',
            isViceCaptain
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          VC
        </button>
      </div>
    </div>
  );
}
