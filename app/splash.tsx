import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import { gradientColors, theme } from "../utils/theme";

export default function SplashScreen() {
  return (
    <LinearGradient colors={gradientColors.splash} style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center p-6">
        <Text variant="displayLarge" style={{ color: theme.colors.primary, fontWeight: "800" }}>
          Dor Game
        </Text>
        <Text variant="titleMedium" className="text-white mt-2">
          Catch Phrase Fun!
        </Text>
        <Link href="/setup" asChild>
          <PrimaryButton
            title="Start New Game"
            className="mt-6"
            backgroundColor={theme.colors.primary}
            textColor={theme.colors.accentOrange}
          />
        </Link>
      </View>
    </LinearGradient>
  );
}


