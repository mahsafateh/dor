import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useGame } from "@/context/GameContext";
import { theme } from "@/utils/theme";
import PrimaryButton from "../components/PrimaryButton";

export default function ResultsScreen() {
  const router = useRouter();
  const { scoreByTeam, dispatch } = useGame();
  const winner = scoreByTeam[1] === scoreByTeam[2] ? undefined : scoreByTeam[1] > scoreByTeam[2] ? 1 : 2;

  return (
    <View className="flex-1 justify-center p-6 gap-3">
      <Text variant="displaySmall" style={{ color: theme.colors.primary }} className="text-center">
        Game Over!
      </Text>
      <Card>
        <Card.Content>
          <Text>Team 1: {scoreByTeam[1]}</Text>
          <Text>Team 2: {scoreByTeam[2]}</Text>
        </Card.Content>
      </Card>
      <Text variant="titleMedium" className="text-center mt-2">
        {winner ? `Winner: Team ${winner}!` : "It's a tie!"}
      </Text>
      <PrimaryButton
        className="mt-4"
        title="Play Again"
        onPress={() => router.replace("/setup")}
        backgroundColor={theme.colors.primary}
        textColor="#fff"
      />
      <PrimaryButton
        className="mt-2"
        title="Reset Game"
        onPress={() => {
          dispatch({ type: "RESET_GAME" });
          router.replace("/setup");
        }}
        backgroundColor="transparent"
        textColor={theme.colors.primary}
        style={{ borderWidth: 1, borderColor: theme.colors.primary }}
      />
    </View>
  );
}


