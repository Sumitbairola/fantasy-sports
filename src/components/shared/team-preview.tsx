import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Team } from "@/types";

interface TeamPreviewDialogProps {
  team: Team | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeamPreviewDialog({
  team,
  open,
  onOpenChange,
}: TeamPreviewDialogProps) {
  if (!team) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Team Preview</DialogTitle>
          <DialogDescription>
            View your team composition, captain selections, and player
            statistics
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Team Name */}
          <div className="text-center">
            <h3 className="text-lg font-bold">
              {team.name}{" "}
              {team.contestsJoined > 0 && (
                <span className="text-xs">
                  ({team.contestsJoined} Contest
                  {team.contestsJoined > 1 ? "s" : ""} Joined)
                </span>
              )}
            </h3>
          </div>

          {/* Captain & Vice Captain */}
          <div className="flex justify-center space-x-8 py-4 bg-gray-50 rounded-lg">
            {team.captain && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-r from-yellow-400 to-orange-500 p-1 mx-auto mb-2">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-2xl font-bold">C</span>
                  </div>
                </div>
                <p className="font-semibold text-sm">
                  {team.captain.short_name}
                </p>
                <p className="text-xs text-gray-500">Captain (2x)</p>
              </div>
            )}
            {team.viceCaptain && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-r from-gray-400 to-gray-600 p-1 mx-auto mb-2">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-2xl font-bold">VC</span>
                  </div>
                </div>
                <p className="font-semibold text-sm">
                  {team.viceCaptain.short_name}
                </p>
                <p className="text-xs text-gray-500">Vice Captain (1.5x)</p>
              </div>
            )}
          </div>

          {/* Players List */}
          <div>
            <h4 className="font-semibold mb-3">
              Players ({team.players.length})
            </h4>
            <div className="space-y-2">
              {team.players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={player.team_logo}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {player.short_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {player.team_short_name} - {player.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {player.event_player_credit} Cr
                    </p>
                    <p className="text-xs text-gray-500">
                      {player.event_total_points} pts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-4 gap-4 py-4 border-t">
            <div className="text-center">
              <p className="text-xs text-gray-500">WK</p>
              <p className="text-lg font-bold">
                {team.players.filter((p) => p.role === "Wicket-Keeper").length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">BAT</p>
              <p className="text-lg font-bold">
                {team.players.filter((p) => p.role === "Batsman").length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">AR</p>
              <p className="text-lg font-bold">
                {team.players.filter((p) => p.role === "All-Rounder").length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">BOWL</p>
              <p className="text-lg font-bold">
                {team.players.filter((p) => p.role === "Bowler").length}
              </p>
            </div>
          </div>

          {/* Total Credits */}
          <div className="text-center py-3 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Credits Used</p>
            <p className="text-2xl font-bold text-green-600">
              {team.totalCredits.toFixed(1)}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
