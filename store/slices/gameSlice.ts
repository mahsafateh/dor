import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CategoryKey =
  | 'fruitAndVegetables'
  | 'landmark'
  | 'animal'
  | 'cityAndCountry'
  | 'movieAndSerial'
  | 'foodAndCuisine'
  | 'sport'
  | 'things'
  | 'profession'
  | 'mixedCategory';

export interface Player {
  id: string;
  name: string;
  team: number;
}

export interface GameState {
  playerCount: number;
  players: Player[];
  rounds: number;
  timePerRoundSeconds: number;
  category: CategoryKey | null;
  currentRound: number;
  currentPlayerIndex: number;
  currentWord: string | null;
  scoreByTeam: Record<number, number>;
  timeUsedByTeamMs: Record<number, number>;
  isPaused: boolean;
  pausedTimeLeft: number | null;
  showRoundEndModal: boolean;
  failedPlayerIndex: number | null; // Player who failed to pass their turn
}

const initialState: GameState = {
  playerCount: 4,
  players: [],
  rounds: 3,
  timePerRoundSeconds: 60,
  category: null,
  currentRound: 1,
  currentPlayerIndex: 0,
  currentWord: null,
  scoreByTeam: {},
  timeUsedByTeamMs: {},
  isPaused: false,
  pausedTimeLeft: null,
  showRoundEndModal: false,
  failedPlayerIndex: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerCount(state, action: PayloadAction<number>) {
      state.playerCount = action.payload;
    },
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
      state.currentPlayerIndex = 0;
      // Initialize team scores and time tracking for all teams
      const teamCount = Math.ceil(action.payload.length / 2);
      state.scoreByTeam = {};
      state.timeUsedByTeamMs = {};
      for (let i = 1; i <= teamCount; i++) {
        state.scoreByTeam[i] = 0;
        state.timeUsedByTeamMs[i] = 0;
      }
    },
    setRounds(state, action: PayloadAction<number>) {
      state.rounds = action.payload;
    },
    setCategory(state, action: PayloadAction<CategoryKey>) {
      state.category = action.payload;
    },
    setTime(state, action: PayloadAction<number>) {
      state.timePerRoundSeconds = action.payload;
    },
    setWord(state, action: PayloadAction<string | null>) {
      state.currentWord = action.payload;
    },
    incrementScore(state, action: PayloadAction<number>) {
      if (state.scoreByTeam[action.payload] !== undefined) {
        state.scoreByTeam[action.payload] += 1;
      }
    },
    addTimeUsed(state, action: PayloadAction<{ team: number; ms: number }>) {
      if (state.timeUsedByTeamMs[action.payload.team] !== undefined) {
        state.timeUsedByTeamMs[action.payload.team] += action.payload.ms;
      }
    },
    nextPlayer(state) {
      const len = Math.max(1, state.players.length);
      state.currentPlayerIndex = (state.currentPlayerIndex + 1) % len;
    },
    nextRound(state) {
      state.currentRound += 1;
      // If there's a failed player, they continue their turn in the next round
      if (state.failedPlayerIndex !== null) {
        // Keep the same player who failed
        state.currentPlayerIndex = state.failedPlayerIndex;
        state.failedPlayerIndex = null; // Reset failed player after applying punishment
      } else {
        state.currentPlayerIndex = 0;
      }
    },
    resetGame() {
      return initialState;
    },
    pauseGame(state, action: PayloadAction<number>) {
      state.isPaused = true;
      state.pausedTimeLeft = action.payload;
    },
    resumeGame(state) {
      state.isPaused = false;
      state.pausedTimeLeft = null;
    },
    showRoundEndModal(state) {
      state.showRoundEndModal = true;
      state.isPaused = true;
    },
    hideRoundEndModal(state) {
      state.showRoundEndModal = false;
    },
    setFailedPlayer(state, action: PayloadAction<number>) {
      state.failedPlayerIndex = action.payload;
    },
    timerEnded(state) {
      // Mark the current player as failed and show round end modal
      state.failedPlayerIndex = state.currentPlayerIndex;
      state.showRoundEndModal = true;
      state.isPaused = true;
    },
  },
});

export const {
  setPlayerCount,
  setPlayers,
  setRounds,
  setCategory,
  setTime,
  setWord,
  incrementScore,
  addTimeUsed,
  nextPlayer,
  nextRound,
  resetGame,
  pauseGame,
  resumeGame,
  showRoundEndModal,
  hideRoundEndModal,
  setFailedPlayer,
  timerEnded,
} = gameSlice.actions;

export default gameSlice.reducer;


