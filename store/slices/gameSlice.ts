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
  team: 1 | 2;
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
  scoreByTeam: { 1: number; 2: number };
  timeUsedByTeamMs: { 1: number; 2: number };
}

const initialState: GameState = {
  playerCount: 6,
  players: [],
  rounds: 3,
  timePerRoundSeconds: 60,
  category: null,
  currentRound: 1,
  currentPlayerIndex: 0,
  currentWord: null,
  scoreByTeam: { 1: 0, 2: 0 },
  timeUsedByTeamMs: { 1: 0, 2: 0 },
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
    incrementScore(state, action: PayloadAction<1 | 2>) {
      state.scoreByTeam[action.payload] += 1;
    },
    addTimeUsed(state, action: PayloadAction<{ team: 1 | 2; ms: number }>) {
      state.timeUsedByTeamMs[action.payload.team] += action.payload.ms;
    },
    nextPlayer(state) {
      const len = Math.max(1, state.players.length);
      state.currentPlayerIndex = (state.currentPlayerIndex + 1) % len;
    },
    nextRound(state) {
      state.currentRound += 1;
      state.currentPlayerIndex = 0;
    },
    resetGame() {
      return initialState;
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
} = gameSlice.actions;

export default gameSlice.reducer;


