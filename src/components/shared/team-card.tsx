"use client";

import { Team } from "@/types";
import Image from "next/image";
import { Share2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
  onEdit?: (teamId: string) => void;
  onDelete?: (teamId: string) => void;
  onPreview?: (teamId: string) => void;
  isSelected?: boolean;
  onToggleSelection?: (teamId: string) => void;
}

export function TeamCard({
  team,
  onEdit,
  onDelete,
  onPreview,
  isSelected,
  onToggleSelection,
}: TeamCardProps) {
  const getRoleCount = () => {
    return team.players.reduce(
      (acc, player) => {
        const role = player.role.toLowerCase().replace("-", "");
        if (role === "batsman") acc.BAT++;
        else if (role === "bowler") acc.BOWL++;
        else if (role === "allrounder") acc.AR++;
        else if (role === "wicketkeeper") acc.WK++;
        return acc;
      },
      { WK: 0, BAT: 0, AR: 0, BOWL: 0 }
    );
  };

  const roleCount = getRoleCount();
  const captainPlayer = team.players.find((p) => p.id === team.captain?.id);
  const viceCaptainPlayer = team.players.find(
    (p) => p.id === team.viceCaptain?.id
  );

  return (
    <div
      className={cn(
        `bg-white rounded-xl p-4 shadow-sm border transition-all`,
        isSelected ? "border-pink-500 ring-2 ring-pink-200" : "border-gray-100"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded accent-pink-500 cursor-pointer"
            checked={isSelected}
            onChange={() => onToggleSelection?.(team.id)}
          />
          <div>
            <h3 className="font-semibold text-sm">
              {team.name}{" "}
              {team.contestsJoined > 0 && (
                <span className="text-xs">
                  ({team.contestsJoined} Contest
                  {team.contestsJoined > 1 ? "s" : ""} Joined)
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            title="Share team"
          >
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onEdit?.(team.id)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            title="Edit team"
          >
            <Pencil className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onDelete?.(team.id)}
            className="p-1.5 hover:bg-red-100 rounded-full transition-colors"
            title="Delete team"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>

      {/* Captain and Vice Captain */}
      <div className="flex items-center space-x-4 mb-4">
        {captainPlayer && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={captainPlayer.team_logo || "/placeholder-player.png"}
                alt={captainPlayer.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold">
                {captainPlayer.short_name}
              </p>
              <p className="text-[10px] text-green-500">Captain</p>
            </div>
          </div>
        )}

        {viceCaptainPlayer && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src={viceCaptainPlayer.team_logo || "/placeholder-player.png"}
                alt={viceCaptainPlayer.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold">
                {viceCaptainPlayer.short_name}
              </p>
              <p className="text-[10px] text-green-500">Vice Captain</p>
            </div>
          </div>
        )}
      </div>

      {/* Role Distribution */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs">
          <div className="text-center">
            <p className="text-gray-500 text-[10px]">WK</p>
            <p className="font-semibold">{roleCount.WK}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-[10px]">BAT</p>
            <p className="font-semibold">{roleCount.BAT}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-[10px]">AR</p>
            <p className="font-semibold">{roleCount.AR}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-[10px]">BOWL</p>
            <p className="font-semibold">{roleCount.BOWL}</p>
          </div>
        </div>

        <Button
          onClick={() => onPreview?.(team.id)}
          className="bg-linear-to-r from-pink-500 to-red-500 text-white text-xs px-4 py-1.5 h-auto rounded-md hover:from-pink-600 hover:to-red-600"
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
