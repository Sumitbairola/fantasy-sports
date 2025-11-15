import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match } from '@/types';

interface MatchState {
  matches: Match[];
  selectedMatch: Match | null;
  activeTab: string;
}

const initialState: MatchState = {
  matches: [],
  selectedMatch: null,
  activeTab: 'all',
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
    },
    setSelectedMatch: (state, action: PayloadAction<Match>) => {
      state.selectedMatch = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setMatches, setSelectedMatch, setActiveTab } = matchSlice.actions;
export default matchSlice.reducer;
