import { createAudioPlayer } from "expo-audio";

async function playSoundAsync(source: number | string, volume = 1) {
  try {
    const audioSource = typeof source === "number" ? source : { uri: source };
    const player = createAudioPlayer(audioSource);
    
    // Set volume
    player.volume = volume;
    
    // Play the audio
    await player.play();
    
    // Wait for audio to finish before removing player
    // This prevents cutting off the sound
    setTimeout(() => {
      player.remove();
    }, 2000); // 3 seconds should be enough for most sound effects
    
  } catch (error) {
    console.warn("Audio playback failed:", error);
  }
}

export const Sounds = {
  tick: async () => playSoundAsync(require("../assets/sounds/tick.mp3"), 0.2),
  pass: async () => playSoundAsync(require("../assets/sounds/pass-new.mp3"), 0.5),
  success: async () => playSoundAsync(require("../assets/sounds/pass-option3.mp3"), 0.6),
  roundEnd: async () => playSoundAsync(require("../assets/sounds/round-end.mp3"), 0.7),
  winner: async () => playSoundAsync(require("../assets/sounds/winner.mp3"), 0.7),
};


