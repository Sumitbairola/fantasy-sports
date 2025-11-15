'use client';

import { Match } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface MatchListProps {
  matches: Match[];
}

export function MatchList({ matches }: MatchListProps) {
  const router = useRouter();

  const handleMatchClick = (match: Match) => {
    router.push(`/teams/${match.id}/pick-players`);
  };

  if (!matches || !Array.isArray(matches) || matches.length === 0) {
    return (
      <div className="col-span-full text-center py-8">
        <p className="text-gray-500">No matches available</p>
      </div>
    );
  }

  return (
    <>
      {matches.map((match, index) => (
        <div
          key={match.id}
          onClick={() => handleMatchClick(match)}
          className={cn(
            'rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 shadow-md',
            index % 3 === 0 && 'bg-linear-to-br from-purple-100 to-pink-100',
            index % 3 === 1 && 'bg-linear-to-br from-orange-100 to-red-100',
            index % 3 === 2 && 'bg-linear-to-br from-yellow-100 to-orange-100'
          )}
        >
          <div className="text-center mb-4">
            <p className="text-xs text-gray-600 font-medium">{match.match_type} - {match.event_name}</p>
          </div>

          <div className="flex items-center justify-between">
            {/* Team 1 */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="w-16 h-16 rounded-full bg-white p-2 shadow-sm">
                <Image
                  src={match.t1_image}
                  alt={match.t1_name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-bold text-sm text-center">{match.t1_short_name}</p>
            </div>

            {/* VS */}
            <div className="px-4">
              <p className="font-bold text-lg text-gray-600">vs</p>
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="w-16 h-16 rounded-full bg-white p-2 shadow-sm">
                <Image
                  src={match.t2_image}
                  alt={match.t2_name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-bold text-sm text-center">{match.t2_short_name}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
