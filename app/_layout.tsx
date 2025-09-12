import { Stack } from "expo-router";
import { MD3LightTheme, MD3DarkTheme, PaperProvider, configureFonts } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import "./global.css";
import { useFonts } from "expo-font";
import { Text as RNText, StatusBar } from "react-native";
import { GameProvider } from "../context/GameContext";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  if (!loaded) return null;

  // Set default font for all React Native Text components
  (RNText as any).defaultProps = (RNText as any).defaultProps || {};
  (RNText as any).defaultProps.style = [{ fontFamily: "Quicksand-Regular" }, (RNText as any).defaultProps.style];

  const fonts = configureFonts({
    config: {
      fontFamily: "Quicksand-Regular",
      fontWeight: "400",
    },
  });

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent fonts={fonts} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

// Separate component that uses the theme context
const AppContent: React.FC<{ fonts: any }> = ({ fonts }) => {
  const { theme, isDark } = useTheme();

  const paperTheme = {
    ...(isDark ? MD3DarkTheme : MD3LightTheme),
    colors: {
      ...(isDark ? MD3DarkTheme.colors : MD3LightTheme.colors),
      // Override with our custom theme colors
      primary: theme.colors.primary,
      onPrimary: theme.colors.textOnPrimary,
      surface: theme.colors.surface,
      onSurface: theme.colors.text,
      background: theme.colors.background,
      onBackground: theme.colors.text,
      outline: theme.colors.border,
      surfaceVariant: theme.colors.surfaceVariant,
      onSurfaceVariant: theme.colors.textTertiary,
    },
    fonts,
  };

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <PaperProvider theme={paperTheme}>
        <Provider store={store}>
          <GameProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </GameProvider>
        </Provider>
      </PaperProvider>
    </>
  );
};
