import React, { createContext, useContext, useMemo, useReducer } from "react";

export type CategoryKey =
  | "fruitAndVegetables"
  | "landmark"
  | "animal"
  | "cityAndCountry"
  | "movieAndSerial"
  | "foodAndCuisine"
  | "sport"
  | "things"
  | "profession"
  | "mixedCategory";

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
  usedWords: Record<CategoryKey, Set<string>>;
  scoreByTeam: { 1: number; 2: number };
  timeUsedByTeamMs: { 1: number; 2: number };
}

type Action =
  | { type: "SET_PLAYER_COUNT"; payload: number }
  | { type: "SET_PLAYERS"; payload: Player[] }
  | { type: "SET_ROUNDS"; payload: number }
  | { type: "SET_CATEGORY"; payload: CategoryKey }
  | { type: "SET_TIME"; payload: number }
  | { type: "SET_WORD"; payload: string | null }
  | { type: "MARK_WORD_USED"; payload: { category: CategoryKey; word: string } }
  | { type: "INCREMENT_SCORE"; payload: 1 | 2 }
  | { type: "ADD_TIME_USED"; payload: { team: 1 | 2; ms: number } }
  | { type: "NEXT_PLAYER" }
  | { type: "NEXT_ROUND" }
  | { type: "RESET_GAME" };

const initialState: GameState = {
  playerCount: 6,
  players: [],
  rounds: 3,
  timePerRoundSeconds: 60,
  category: null,
  currentRound: 1,
  currentPlayerIndex: 0,
  currentWord: null,
  usedWords: {
    fruitAndVegetables: new Set<string>(),
    landmark: new Set<string>(),
    animal: new Set<string>(),
    cityAndCountry: new Set<string>(),
    movieAndSerial: new Set<string>(),
    foodAndCuisine: new Set<string>(),
    sport: new Set<string>(),
    things: new Set<string>(),
    profession: new Set<string>(),
    mixedCategory: new Set<string>(),
  },
  scoreByTeam: { 1: 0, 2: 0 },
  timeUsedByTeamMs: { 1: 0, 2: 0 },
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SET_PLAYER_COUNT":
      return { ...state, playerCount: action.payload };
    case "SET_PLAYERS":
      return { ...state, players: action.payload, currentPlayerIndex: 0 };
    case "SET_ROUNDS":
      return { ...state, rounds: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_TIME":
      return { ...state, timePerRoundSeconds: action.payload };
    case "SET_WORD":
      return { ...state, currentWord: action.payload };
    case "MARK_WORD_USED": {
      const { category, word } = action.payload;
      const updated = new Set(state.usedWords[category]);
      updated.add(word);
      return { ...state, usedWords: { ...state.usedWords, [category]: updated } };
    }
    case "INCREMENT_SCORE":
      return {
        ...state,
        scoreByTeam: { ...state.scoreByTeam, [action.payload]: state.scoreByTeam[action.payload] + 1 },
      } as GameState;
    case "ADD_TIME_USED":
      return {
        ...state,
        timeUsedByTeamMs: {
          ...state.timeUsedByTeamMs,
          [action.payload.team]: state.timeUsedByTeamMs[action.payload.team] + action.payload.ms,
        },
      } as GameState;
    case "NEXT_PLAYER": {
      const next = (state.currentPlayerIndex + 1) % Math.max(1, state.players.length);
      return { ...state, currentPlayerIndex: next };
    }
    case "NEXT_ROUND":
      return { ...state, currentRound: state.currentRound + 1, currentPlayerIndex: 0 };
    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
}

interface GameContextValue extends GameState {
  dispatch: React.Dispatch<Action>;
  getCurrentTeam: () => 1 | 2;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      dispatch,
      getCurrentTeam: () => (state.players[state.currentPlayerIndex]?.team ?? 1),
    }),
    [state]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}


