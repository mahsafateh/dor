import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useGame } from "../context/GameContext";
import { theme } from "../utils/theme";

export default function ResultsScreen() {
  const router = useRouter();
  const { scoreByTeam } = useGame();
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
      <Button mode="contained" className="mt-4" onPress={() => router.replace("/setup")}> 
        Play Again
      </Button>
    </View>
  );
}


