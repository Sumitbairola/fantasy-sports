"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  deleteTeam,
  registerTeam,
  resetCurrentTeam,
} from "@/store/slices/teamSlice";
import { TeamCard } from "@/components/shared/team-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useMatches } from "@/hooks/useMatches";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TeamPreviewDialog } from "@/components/shared/team-preview";
import { useToast } from "@/hooks/use-toast";

export default function MyTeamsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const matchId = params.matchId as string;

  const { data: matches, isLoading: matchesLoading } = useMatches();
  const allTeams = useSelector((state: RootState) => state.team.teams);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);
  const [previewTeamId, setPreviewTeamId] = useState<string | null>(null);
  const [selectedTeamsForRegister, setSelectedTeamsForRegister] = useState<
    string[]
  >([]);

  const teams = allTeams.filter((team) => team.matchId === matchId);

  const matchesArray = Array.isArray(matches) ? matches : [];
  const currentMatch = matchesArray.find((m) => m.id === Number(matchId));

  const handleCreateTeam = () => {
    dispatch(resetCurrentTeam());
    router.push(`/teams/${matchId}/pick-players`);
  };

  const handleEditTeam = (teamId: string) => {
    router.push(`/teams/${matchId}/pick-players?edit=${teamId}`);
  };

  const handlePreview = (teamId: string) => {
    setPreviewTeamId(teamId);
  };

  const handleDeleteClick = (teamId: string) => {
    setTeamToDelete(teamId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (teamToDelete) {
      dispatch(deleteTeam(teamToDelete));
      toast({
        title: "Team deleted",
        description: "Your team has been successfully deleted",
      });
      setTeamToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleRegisterTeams = () => {
    if (selectedTeamsForRegister.length === 0) {
      toast({
        title: "No team selected",
        description: "Please select at least one team to register",
        variant: "destructive",
      });
      return;
    }

    selectedTeamsForRegister.forEach((teamId) => {
      dispatch(registerTeam(teamId));
    });

    toast({
      title: "Registration successful!",
      description: `${
        selectedTeamsForRegister.length
      } team(s) registered for ₹${49 * selectedTeamsForRegister.length}`,
    });

    setSelectedTeamsForRegister([]);
  };

  const toggleTeamSelection = (teamId: string) => {
    setSelectedTeamsForRegister((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const previewTeam = teams.find((t) => t.id === previewTeamId);

  if (matchesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-900 to-purple-900">
      {/* Header */}
      <div className="bg-indigo-900 px-4 md:px-8 lg:px-12 pt-12 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <button onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-white font-bold text-lg md:text-xl">Contest</h1>
          </div>

          {/* Match Info */}
          {currentMatch && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-white font-bold text-sm md:text-base">
                  {currentMatch.t1_short_name} VS {currentMatch.t2_short_name}
                </h2>
                <p className="text-pink-400 font-semibold text-xs md:text-sm">
                  02h 11m Left
                </p>
              </div>
            </div>
          )}

          {/* Teams Section Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm md:text-base">
              Select a team to register
            </h3>
            <button className="text-pink-400 text-xs md:text-sm font-medium">
              Contest Rules
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-t-3xl px-4 md:px-8 lg:px-12 py-6 min-h-[calc(100vh-15rem)] pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {teams.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 mb-4 font-medium">
                  No teams created yet
                </p>
                <p className="text-gray-400 text-sm mb-6">
                  Create your first team to join the contest
                </p>
                <Button
                  onClick={handleCreateTeam}
                  className="bg-linear-to-r from-pink-500 to-red-500 text-white px-8"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Team
                </Button>
              </div>
            ) : (
              teams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  onEdit={handleEditTeam}
                  onPreview={handlePreview}
                  onDelete={handleDeleteClick}
                  isSelected={selectedTeamsForRegister.includes(team.id)}
                  onToggleSelection={toggleTeamSelection}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {teams.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 space-y-3 z-20">
          <p className="text-center text-xs text-gray-500">
            Registration closes in{" "}
            <span className="text-pink-500 font-semibold">02h 11m Left</span>
          </p>
          <div className="flex items-center space-x-3 max-w-7xl mx-auto">
            <Button
              onClick={handleCreateTeam}
              variant="outline"
              className="flex-1 border-2 border-pink-500 text-pink-500 hover:bg-pink-50 font-semibold"
            >
              Create Team
            </Button>
            <Button
              onClick={handleRegisterTeams}
              disabled={selectedTeamsForRegister.length === 0}
              className="flex-1 bg-linear-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 font-semibold disabled:opacity-50"
            >
              Register{" "}
              {selectedTeamsForRegister.length > 0 &&
                `(${selectedTeamsForRegister.length})`}{" "}
              with ₹{49 * (selectedTeamsForRegister.length || 1)}
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this team? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Team Preview Dialog */}
      <TeamPreviewDialog
        team={previewTeam || null}
        open={!!previewTeamId}
        onOpenChange={() => setPreviewTeamId(null)}
      />
    </div>
  );
}
