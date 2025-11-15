'use client';

import { useTeamBuilder } from '@/hooks/useTeamBuilder';
import { cn } from '@/lib/utils';

export function TeamStats() {
  const { currentTeam, getRoleCount, getCreditsLeft } = useTeamBuilder();
  const roleCount = getRoleCount();
  const creditsLeft = getCreditsLeft();
  const selectedCount = currentTeam.players.length;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-4">
      {/* Player Count Circles */}
      <div className="flex items-center justify-center space-x-1 mb-4">
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-6 h-6 rounded-full border-2 transition-all',
              index < selectedCount
                ? 'bg-pink-500 border-pink-500'
                : 'bg-gray-200 border-gray-300'
            )}
          />
        ))}
      </div>

      {/* Credits and Players Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-right">
          <p className="text-xs text-gray-500">Max 7 players from a team</p>
          <p className="text-lg font-bold">
            {selectedCount} <span className="text-sm font-normal text-gray-500">Players</span>
          </p>
        </div>
        <div className="text-left">
          <p className="text-lg font-bold text-pink-500">
            {creditsLeft} <span className="text-sm font-normal text-gray-500">Credits Left</span>
          </p>
        </div>
      </div>

      {/* Role Selection Guide */}
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-xs font-semibold mb-2">
          Select {Math.max(0, 3 - roleCount.batsman)}-{Math.max(0, 7 - roleCount.batsman)} Batsman
        </p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <p className="text-gray-500">Wicket Keeper</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Points</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Credits</p>
          </div>
        </div>
      </div>

      {/* Role Count Summary */}
      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-xs text-gray-500">WK</p>
          <p className="font-bold">{roleCount.wicketKeeper}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">BAT</p>
          <p className="font-bold">{roleCount.batsman}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">AR</p>
          <p className="font-bold">{roleCount.allRounder}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">BOWL</p>
          <p className="font-bold">{roleCount.bowler}</p>
        </div>
      </div>
    </div>
  );
}
