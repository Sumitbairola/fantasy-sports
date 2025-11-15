import React, { useState, useMemo } from "react";
import { Player, PlayerFilters } from "@/types";
import { PLAYER_ROLES } from "@/lib/constants";
import { PlayerCard } from "@/components/shared/player-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PlayerSelectorProps {
  players: Player[];
  selectedPlayerIds: number[];
  onSelectPlayer: (player: Player) => void;
  onRemovePlayer: (playerId: number) => void;
  canAddPlayer: (player: Player) => { canAdd: boolean; reason?: string };
  teamCountByTeam: Record<string, number>;
}

export const PlayerSelector: React.FC<PlayerSelectorProps> = ({
  players,
  selectedPlayerIds,
  onSelectPlayer,
  onRemovePlayer,
  canAddPlayer,
  teamCountByTeam,
}) => {
  const [filters, setFilters] = useState<PlayerFilters>({
    role: "ALL",
    team: "ALL",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const teams = useMemo(() => {
    const unique = new Set(players.map((p) => p.team_short_name));
    return Array.from(unique);
  }, [players]);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesRole =
        filters.role === "ALL" || player.role === filters.role;
      const matchesTeam =
        filters.team === "ALL" || player.team_short_name === filters.team;
      const matchesSearch =
        !searchTerm ||
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.short_name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesRole && matchesTeam && matchesSearch;
    });
  }, [players, filters, searchTerm]);

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {/* Search Input */}
        <div className="relative col-span-1 md:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Role Filter */}
        <Select
          value={filters.role || "ALL"}
          onValueChange={(value) =>
            setFilters({ ...filters, role: value as any })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            {Object.entries(PLAYER_ROLES).map(([role, label]) => (
              <SelectItem key={role} value={role}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Team Filter */}
      <Select
        value={filters.team || "ALL"}
        onValueChange={(value) => setFilters({ ...filters, team: value })}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Teams</SelectItem>
          {teams.map((team) => (
            <SelectItem key={team} value={team}>
              {team}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredPlayers.length} of {players.length} players
      </p>

      {/* Player Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPlayers.map((player) => {
          const isSelected = selectedPlayerIds.includes(player.id);
          const { canAdd, reason } = canAddPlayer(player);

          return (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={isSelected}
              onToggle={
                isSelected
                  ? () => onRemovePlayer(player.id)
                  : () => onSelectPlayer(player)
              }
              disabled={!isSelected && !canAdd}
            />
          );
        })}
      </div>

      {filteredPlayers.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No players match your filters</p>
        </Card>
      )}
    </div>
  );
};
