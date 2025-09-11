import { Stack } from "expo-router";
import { MD3LightTheme, PaperProvider, configureFonts } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "../store";
import { theme } from "../utils/theme";
import "./global.css";
import { useFonts } from "expo-font";
import { Text as RNText } from "react-native";

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
      <PaperProvider theme={{ ...MD3LightTheme, colors: { ...MD3LightTheme.colors, ...theme.colors }, fonts }}>
        <Provider store={store}>
          <Stack screenOptions={{ headerShown: false }} />
        </Provider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
