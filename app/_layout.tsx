import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GameProvider } from "../context/GameContext";
import { ThemeProvider } from "../context/ThemeContext";
import "../utils/i18n"; 
import "./global.css";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
      <Provider store={store}>
        <GameProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </GameProvider>
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
