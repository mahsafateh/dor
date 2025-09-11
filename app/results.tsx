import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetGame } from "@/store/slices/gameSlice";
import { theme } from "@/utils/theme";
import PrimaryButton from "../components/PrimaryButton";

export default function ResultsScreen() {
  const router = useRouter();
  const scoreByTeam = useAppSelector((s) => s.game.scoreByTeam);
  const players = useAppSelector((s) => s.game.players);
  const dispatch = useAppDispatch();
  const winner = scoreByTeam[1] === scoreByTeam[2] ? undefined : scoreByTeam[1] > scoreByTeam[2] ? 1 : 2;

  // Helper function to get players by team
  const getPlayersByTeam = (team: 1 | 2) => {
    return players.filter(player => player.team === team);
  };

  // Get team member names
  const team1Players = getPlayersByTeam(1);
  const team2Players = getPlayersByTeam(2);
  const team1Names = team1Players.map(p => p.name).join(", ");
  const team2Names = team2Players.map(p => p.name).join(", ");

  return (
    <View className="flex-1 justify-center p-6 gap-3">
      <Text variant="displaySmall" style={{ color: theme.colors.primary }} className="text-center">
        Game Over!
      </Text>
      <Card>
        <Card.Content>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>
            {team1Names}: {scoreByTeam[1]} points
          </Text>
          <Text variant="titleMedium">
            {team2Names}: {scoreByTeam[2]} points
          </Text>
        </Card.Content>
      </Card>
      <Text variant="titleMedium" className="text-center mt-2">
        {winner ? `Winner: ${winner === 1 ? team1Names : team2Names}!` : "It's a tie!"}
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
          dispatch(resetGame());
          router.replace("/setup");
        }}
        backgroundColor="transparent"
        textColor={theme.colors.primary}
        style={{ borderWidth: 1, borderColor: theme.colors.primary }}
      />
    </View>
  );
}


