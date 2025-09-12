import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  highScores: "dor/highScores",
  lastGame: "dor/lastGame",
  soundSettings: "dor/soundSettings",
};

export interface HighScores {
  team1: number;
  team2: number;
  lastUpdated: number;
}

export async function saveHighScores(scores: HighScores) {
  await AsyncStorage.setItem(KEYS.highScores, JSON.stringify(scores));
}

export async function loadHighScores(): Promise<HighScores | null> {
  const raw = await AsyncStorage.getItem(KEYS.highScores);
  return raw ? (JSON.parse(raw) as HighScores) : null;
}

export async function saveLastGame<T>(data: T) {
  await AsyncStorage.setItem(KEYS.lastGame, JSON.stringify(data));
}

export async function loadLastGame<T>(): Promise<T | null> {
  const raw = await AsyncStorage.getItem(KEYS.lastGame);
  return raw ? (JSON.parse(raw) as T) : null;
}

export interface SoundSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  effectsEnabled: boolean;
}

export async function saveSoundSettings(settings: SoundSettings) {
  await AsyncStorage.setItem(KEYS.soundSettings, JSON.stringify(settings));
}

export async function loadSoundSettings(): Promise<SoundSettings | null> {
  const raw = await AsyncStorage.getItem(KEYS.soundSettings);
  return raw ? (JSON.parse(raw) as SoundSettings) : null;
}


