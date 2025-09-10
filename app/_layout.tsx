import { Stack } from "expo-router";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "../store";
import { theme } from "../utils/theme";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={{ ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...theme.colors } }}>
        <Provider store={store}>
          <Stack screenOptions={{ headerShown: false }} />
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
