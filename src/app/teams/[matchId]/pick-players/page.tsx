"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { usePlayers } from "@/hooks/usePlayers";
import { useTeamBuilder } from "@/hooks/useTeamBuilder";
import { togglePlayer, setAvailablePlayers } from "@/store/slices/teamSlice";
import { loadTeamForEdit, resetCurrentTeam } from "@/store/slices/teamSlice";
import { PlayerCard } from "@/components/shared/player-card";
import { RoleFilter } from "@/components/shared/role-filter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { PlayerRole } from "@/types";
import { useMatches } from "@/hooks/useMatches";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { TeamPreviewDialog } from "@/components/shared/team-preview";

export default function PickPlayersPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const matchId = params.matchId as string;
  const editTeamId = searchParams.get("edit");

  const [selectedRole, setSelectedRole] = useState<PlayerRole | "all">("all");
  const [selectedTeam, setSelectedTeam] = useState<string | "all">("all");

  const { data: players, isLoading } = usePlayers(matchId);
  const { data: matches } = useMatches();
  const {
    currentTeam,
    canAddPlayer,
    isTeamValid,
    getCreditsLeft,
    getRoleCount,
  } = useTeamBuilder();

  const [showPreview, setShowPreview] = useState(false);

  const matchesArray = Array.isArray(matches) ? matches : [];
  const currentMatch = matchesArray.find((m) => m.id === Number(matchId));

  useEffect(() => {
    if (players) {
      dispatch(setAvailablePlayers(players));
    }
  }, [players, dispatch]);

  useEffect(() => {
    if (editTeamId) {
      dispatch(loadTeamForEdit(editTeamId));
    } else {
      dispatch(resetCurrentTeam());
    }
  }, [editTeamId, dispatch]);

  // Calculate team counts
  const team1Count = useMemo(() => {
    if (!currentMatch) return 0;
    return currentTeam.players.filter(
      (p) => p.team_short_name === currentMatch.t1_short_name
    ).length;
  }, [currentTeam.players, currentMatch]);

  const team2Count = useMemo(() => {
    if (!currentMatch) return 0;
    return currentTeam.players.filter(
      (p) => p.team_short_name === currentMatch.t2_short_name
    ).length;
  }, [currentTeam.players, currentMatch]);

  const handleTogglePlayer = (player: any) => {
    const isSelected = currentTeam.players.some((p) => p.id === player.id);

    if (!isSelected) {
      const validation = canAddPlayer(player);
      if (!validation.canAdd) {
        toast({
          title: "Cannot add player",
          description: validation.reason,
          variant: "destructive",
        });
        return;
      }
    }

    dispatch(togglePlayer(player));
  };

  const handleSaveTeam = () => {
    const roleCount = getRoleCount();

    // Check if team has 11 players
    if (currentTeam.players.length !== 11) {
      toast({
        title: "Invalid team",
        description: `Please select exactly 11 players. Currently selected: ${currentTeam.players.length}`,
        variant: "destructive",
      });
      return;
    }

    // Check wicket keeper requirement
    if (roleCount.wicketKeeper < 1) {
      toast({
        title: "Invalid team",
        description: "At least 1 Wicket Keeper is required to proceed",
        variant: "destructive",
      });
      return;
    }

    // Check batsman requirement
    if (roleCount.batsman < 3) {
      toast({
        title: "Invalid team",
        description: "Minimum 3 Batsmen are required",
        variant: "destructive",
      });
      return;
    }

    // Check bowler requirement
    if (roleCount.bowler < 3) {
      toast({
        title: "Invalid team",
        description: "Minimum 3 Bowlers are required",
        variant: "destructive",
      });
      return;
    }

    // Check role distribution limits
    if (roleCount.wicketKeeper > 5) {
      toast({
        title: "Invalid team",
        description: "Maximum 5 Wicket Keepers allowed",
        variant: "destructive",
      });
      return;
    }

    if (roleCount.batsman > 7) {
      toast({
        title: "Invalid team",
        description: "Maximum 7 Batsmen allowed",
        variant: "destructive",
      });
      return;
    }

    if (roleCount.allRounder > 4) {
      toast({
        title: "Invalid team",
        description: "Maximum 4 All Rounders allowed",
        variant: "destructive",
      });
      return;
    }

    if (roleCount.bowler > 7) {
      toast({
        title: "Invalid team",
        description: "Maximum 7 Bowlers allowed",
        variant: "destructive",
      });
      return;
    }

    // Final validation check
    const isValid = isTeamValid();
    if (!isValid) {
      toast({
        title: "Invalid team",
        description: `Invalid role distribution. WK: ${roleCount.wicketKeeper} (1-5), BAT: ${roleCount.batsman} (3-7), AR: ${roleCount.allRounder} (0-4), BOWL: ${roleCount.bowler} (3-7)`,
        variant: "destructive",
      });
      return;
    }

    router.push(`/teams/${matchId}/captain`);
  };

  const filteredPlayers =
    players?.filter((player) => {
      const roleMatch = selectedRole === "all" || player.role === selectedRole;
      const teamMatch =
        selectedTeam === "all" || player.team_short_name === selectedTeam;
      return roleMatch && teamMatch;
    }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const roleCount = getRoleCount();

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-900 to-purple-900 pb-24">
      {/* Header */}
      <div className="bg-indigo-900 px-4 md:px-8 lg:px-12 pt-12 pb-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <button onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-white font-bold text-lg">Select Players</h1>
          </div>

          {currentMatch && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                {/* Team 1 */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-white p-2">
                    <Image
                      src={currentMatch.t1_image}
                      alt={currentMatch.t1_short_name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {team1Count > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {team1Count}
                      </span>
                    </div>
                  )}
                  <p className="text-white text-xs text-center mt-1 font-medium">
                    {currentMatch.t1_short_name}
                  </p>
                </div>

                {/* Team 2 */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-white p-2">
                    <Image
                      src={currentMatch.t2_image}
                      alt={currentMatch.t2_short_name}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {team2Count > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {team2Count}
                      </span>
                    </div>
                  )}
                  <p className="text-white text-xs text-center mt-1 font-medium">
                    {currentMatch.t2_short_name}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="text-right">
                <p className="text-white/70 text-xs mb-2">
                  Max 7 players from a team
                </p>
                <div className="flex items-center justify-end space-x-6">
                  <div className="text-center">
                    <p className="text-white font-bold text-2xl">
                      {currentTeam.players.length}
                      <span className="text-white/70 text-sm">/11</span>
                    </p>
                    <p className="text-white/70 text-xs">Players</p>
                  </div>
                  <div className="text-center">
                    <p className="text-pink-400 font-bold text-2xl">
                      {getCreditsLeft().toFixed(1)}
                    </p>
                    <p className="text-white/70 text-xs">Credits Left</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="flex items-center justify-center space-x-1 mb-4">
            {Array.from({ length: 11 }).map((_, index) => {
              const isSelected = index < currentTeam.players.length;
              const isLast = index === currentTeam.players.length - 1;

              return (
                <div
                  key={index}
                  className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                    isSelected
                      ? "bg-pink-500 border-pink-300"
                      : "bg-transparent border-white/30"
                  }`}
                >
                  {isLast && isSelected && (
                    <span className="text-white text-xs font-bold">
                      {currentTeam.players.length}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Team Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setSelectedTeam("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedTeam === "all"
                  ? "bg-white text-indigo-900"
                  : "bg-white/10 text-white"
              }`}
            >
              All
            </button>
            {currentMatch && (
              <>
                <button
                  onClick={() => setSelectedTeam(currentMatch.t1_short_name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedTeam === currentMatch.t1_short_name
                      ? "bg-white text-indigo-900"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {currentMatch.t1_short_name}
                </button>
                <button
                  onClick={() => setSelectedTeam(currentMatch.t2_short_name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    selectedTeam === currentMatch.t2_short_name
                      ? "bg-white text-indigo-900"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {currentMatch.t2_short_name}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-t-3xl px-4 md:px-8 lg:px-12 py-6 min-h-[calc(100vh-15rem)] pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Role Filter */}
          <div className="mb-4">
            <RoleFilter
              selectedRole={selectedRole}
              onFilterChange={setSelectedRole}
            />
          </div>

          {/* Column Headers */}
          <div className="flex items-center justify-between mb-2 px-3">
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">
                {selectedRole === "Wicket-Keeper"
                  ? "Wicket Keeper"
                  : selectedRole === "all"
                  ? "All Players"
                  : selectedRole}
              </p>
            </div>
            <div className="w-16 text-center">
              <p className="text-xs text-gray-500 font-medium">Points</p>
            </div>
            <div className="w-16 text-center">
              <p className="text-xs text-gray-500 font-medium">Credits</p>
            </div>
            <div className="w-10"></div>
          </div>

          {/* Players List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {filteredPlayers.map((player) => {
              const isSelected = currentTeam.players.some(
                (p) => p.id === player.id
              );
              const validation = canAddPlayer(player);

              return (
                <PlayerCard
                  key={player.id}
                  player={player}
                  isSelected={isSelected}
                  onToggle={handleTogglePlayer}
                  disabled={!isSelected && !validation.canAdd}
                />
              );
            })}
          </div>

          {filteredPlayers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No players available</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs text-gray-500 mb-3">
            Registration closes in{" "}
            <span className="text-pink-500 font-semibold">02h 11m Left</span>
          </p>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="flex-1 border-2 border-pink-500 text-pink-500 hover:bg-pink-50 font-semibold"
              disabled={currentTeam.players.length === 0}
              onClick={() => setShowPreview(true)}
            >
              Team Preview
            </Button>
            <Button
              onClick={handleSaveTeam}
              disabled={currentTeam.players.length !== 11}
              className="flex-1 bg-linear-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 disabled:opacity-50 font-semibold"
            >
              Save Team
            </Button>
          </div>
        </div>
      </div>
      <TeamPreviewDialog
        team={
          currentTeam.players.length > 0
            ? {
                id: "preview",
                name: "Current Team",
                matchId: matchId,
                players: currentTeam.players,
                captain: currentTeam.captain || undefined,
                viceCaptain: currentTeam.viceCaptain || undefined,
                totalCredits: 100 - getCreditsLeft(),
                contestsJoined: 0,
                createdAt: new Date().toISOString(),
              }
            : null
        }
        open={showPreview}
        onOpenChange={setShowPreview}
      />
    </div>
  );
}
