"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setCaptain, setViceCaptain, saveTeam } from "@/store/slices/teamSlice";
import { CaptainCard } from "@/components/features/captain-selector/captain-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useMatches } from "@/hooks/useMatches";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";
import { TeamPreviewDialog } from "@/components/shared/team-preview";

export default function CaptainSelectionPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const matchId = params.matchId as string;
  const [showPreview, setShowPreview] = useState(false);

  const { data: matches } = useMatches();
  const { currentTeam, editingTeamId } = useSelector(
    (state: RootState) => state.team
  );

  const matchesArray = Array.isArray(matches) ? matches : [];
  const currentMatch = matchesArray.find((m) => m.id === Number(matchId));
  const captain = currentTeam.captain;
  const viceCaptain = currentTeam.viceCaptain;

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

  const handleSelectCaptain = (player: any) => {
    if (viceCaptain?.id === player.id) {
      toast({
        title: "Invalid selection",
        description: "Captain and Vice Captain cannot be the same player",
        variant: "destructive",
      });
      return;
    }
    dispatch(setCaptain(player));
  };

  const handleSelectViceCaptain = (player: any) => {
    if (captain?.id === player.id) {
      toast({
        title: "Invalid selection",
        description: "Captain and Vice Captain cannot be the same player",
        variant: "destructive",
      });
      return;
    }
    dispatch(setViceCaptain(player));
  };

  const handleSaveTeam = () => {
    if (!captain || !viceCaptain) {
      toast({
        title: "Incomplete selection",
        description: "Please select both Captain and Vice Captain",
        variant: "destructive",
      });
      return;
    }

    const team = {
      id: editingTeamId || `team-${Date.now()}`,
      matchId,
      name: `Team ${new Date().getTime().toString().slice(-4)}`,
      players: currentTeam.players,
      captain,
      viceCaptain,
      totalCredits: currentTeam.players.reduce(
        (sum, p) => sum + p.event_player_credit,
        0
      ),
      createdAt: new Date().toISOString(),
      contestsJoined: 0,
    };

    dispatch(saveTeam(team));

    toast({
      title: editingTeamId ? "Team updated!" : "Team saved!",
      description: editingTeamId
        ? "Your team has been updated successfully"
        : "Your team has been created successfully",
    });

    router.push(`/teams/${matchId}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-900 to-purple-900 pb-24">
      {/* Header */}
      <div className="bg-indigo-900 px-4 md:px-8 lg:px-12 pt-12 pb-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <button onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-white font-bold text-lg">
              Select Captain and Vice Captain
            </h1>
          </div>

          {currentMatch && (
            <div className="flex items-center justify-center space-x-8 mb-4">
              {/* Team 1 */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-white p-3 mx-auto mb-2">
                  <Image
                    src={currentMatch.t1_image}
                    alt={currentMatch.t1_short_name}
                    width={52}
                    height={52}
                    className="w-full h-full object-contain"
                  />
                </div>
                {team1Count > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {team1Count}
                    </span>
                  </div>
                )}
                <p className="text-white text-xs font-medium text-center">
                  {currentMatch.t1_short_name}
                </p>
              </div>

              {/* Team 2 */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-white p-3 mx-auto mb-2">
                  <Image
                    src={currentMatch.t2_image}
                    alt={currentMatch.t2_short_name}
                    width={52}
                    height={52}
                    className="w-full h-full object-contain"
                  />
                </div>
                {team2Count > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {team2Count}
                    </span>
                  </div>
                )}
                <p className="text-white text-xs font-medium text-center">
                  {currentMatch.t2_short_name}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-t-3xl px-4 md:px-8 lg:px-12 py-6 min-h-[calc(100vh-15rem)] pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">Captain</span> gets 2x points and{" "}
              <span className="font-semibold">Vice Captain</span> gets 1.5x
              points
            </p>
          </div>

          {/* Players List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {currentTeam.players.map((player) => (
              <CaptainCard
                key={player.id}
                player={player}
                isCaptain={captain?.id === player.id}
                isViceCaptain={viceCaptain?.id === player.id}
                onSelectCaptain={handleSelectCaptain}
                onSelectViceCaptain={handleSelectViceCaptain}
              />
            ))}
          </div>
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
              onClick={() => setShowPreview(true)}
              disabled={currentTeam.players.length === 0}
            >
              Team Preview
            </Button>
            <Button
              onClick={handleSaveTeam}
              disabled={!captain || !viceCaptain}
              className="flex-1 bg-linear-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 disabled:opacity-50 font-semibold"
            >
              Save Team
            </Button>
          </div>
        </div>
      </div>

      {/* Team Preview Dialog */}
      <TeamPreviewDialog
        team={currentTeam.players.length > 0 ? {
          id: 'preview',
          name: 'Current Team',
          matchId: matchId,
          players: currentTeam.players,
          captain: currentTeam.captain || undefined,
          viceCaptain: currentTeam.viceCaptain || undefined,
          totalCredits: currentTeam.players.reduce((sum, p) => sum + p.event_player_credit, 0),
          contestsJoined: 0,
          createdAt: new Date().toISOString(),
        } : null}
        open={showPreview}
        onOpenChange={setShowPreview}
      />
    </div>
  );
}
