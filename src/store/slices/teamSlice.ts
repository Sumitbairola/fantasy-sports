import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, Team } from '@/types';
import { TEAM_CONSTRAINTS } from '@/lib/constants';

interface TeamState {
  teams: Team[];
  currentTeam: {
    players: Player[];
    captain: Player | null;
    viceCaptain: Player | null;
  };
  availablePlayers: Player[];
  editingTeamId: string | null;
}

const initialState: TeamState = {
  teams: [],
  currentTeam: {
    players: [],
    captain: null,
    viceCaptain: null,
  },
  availablePlayers: [],
  editingTeamId: null,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setAvailablePlayers: (state, action: PayloadAction<Player[]>) => {
      state.availablePlayers = action.payload;
    },
    togglePlayer: (state, action: PayloadAction<Player>) => {
      const player = action.payload;
      const existingIndex = state.currentTeam.players.findIndex(p => p.id === player.id);

      if (existingIndex !== -1) {
        state.currentTeam.players.splice(existingIndex, 1);
      } else {
        if (state.currentTeam.players.length < TEAM_CONSTRAINTS.totalPlayers) {
          state.currentTeam.players.push(player);
        }
      }
    },
    setCaptain: (state, action: PayloadAction<Player>) => {
      state.currentTeam.captain = action.payload;
    },
    setViceCaptain: (state, action: PayloadAction<Player>) => {
      state.currentTeam.viceCaptain = action.payload;
    },
    saveTeam: (state, action: PayloadAction<Team>) => {
      if (state.editingTeamId) {
        // Update existing team
        const index = state.teams.findIndex(t => t.id === state.editingTeamId);
        if (index !== -1) {
          state.teams[index] = { ...action.payload, id: state.editingTeamId };
        }
        state.editingTeamId = null;
      } else {
        // Add new team
        state.teams.push(action.payload);
      }
      state.currentTeam = {
        players: [],
        captain: null,
        viceCaptain: null,
      };
    },
    deleteTeam: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter(team => team.id !== action.payload);
    },
    registerTeam: (state, action: PayloadAction<string>) => {
      const team = state.teams.find(t => t.id === action.payload);
      if (team) {
        team.contestsJoined = (team.contestsJoined || 0) + 1;
      }
    },
    resetCurrentTeam: (state) => {
      state.currentTeam = {
        players: [],
        captain: null,
        viceCaptain: null,
      };
      state.editingTeamId = null;
    },
    loadTeamForEdit: (state, action: PayloadAction<string>) => {
      const team = state.teams.find(t => t.id === action.payload);
      if (team) {
        state.currentTeam = {
          players: [...team.players],
          captain: team.captain || null,
          viceCaptain: team.viceCaptain || null,
        };
        state.editingTeamId = action.payload;
      }
    },
  },
});

export const {
  setAvailablePlayers,
  togglePlayer,
  setCaptain,
  setViceCaptain,
  saveTeam,
  deleteTeam,
  registerTeam,
  resetCurrentTeam,
  loadTeamForEdit,
} = teamSlice.actions;

export default teamSlice.reducer;
