import { Audio } from "expo-av";

async function playSoundAsync(source: number | string, volume = 1) {
  const { sound } = await Audio.Sound.createAsync(
    typeof source === "number" ? source : { uri: source },
    { shouldPlay: true, volume }
  );
  try {
    await sound.playAsync();
  } finally {
    // unload after playback
    sound.unloadAsync();
  }
}

export const Sounds = {
  tick: async () => playSoundAsync("https://assets.mixkit.co/active_storage/sfx/2561/2561-preview.mp3", 0.4),
  pass: async () => playSoundAsync("https://assets.mixkit.co/active_storage/sfx/2553/2553-preview.mp3", 0.6),
  success: async () => playSoundAsync("https://assets.mixkit.co/active_storage/sfx/2011/2011-preview.mp3", 0.6),
  roundEnd: async () => playSoundAsync("https://assets.mixkit.co/active_storage/sfx/2876/2876-preview.mp3", 0.7),
  winner: async () => playSoundAsync("https://assets.mixkit.co/active_storage/sfx/276/276-preview.mp3", 0.7),
};


