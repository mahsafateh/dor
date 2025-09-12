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
  
  // Helper function to get players by team
  const getPlayersByTeam = (team: number) => {
    return players.filter(player => player.team === team);
  };

  // Get team color function
  const getTeamColor = (teamNumber: number) => {
    const teamColors = [
      theme.colors.primary,      // Team 1 - Purple
      theme.colors.accentOrange, // Team 2 - Orange
      theme.colors.accentYellow, // Team 3 - Yellow
      '#E91E63',                 // Team 4 - Pink
      '#4CAF50',                 // Team 5 - Green
      '#2196F3',                 // Team 6 - Blue
      '#FF5722',                 // Team 7 - Deep Orange
      '#9C27B0',                 // Team 8 - Purple variant
    ];
    return teamColors[(teamNumber - 1) % teamColors.length];
  };

  // Get all teams sorted by score (highest first)
  const sortedTeams = Object.entries(scoreByTeam)
    .map(([teamNum, score]) => ({
      team: parseInt(teamNum),
      score: score,
      players: getPlayersByTeam(parseInt(teamNum)),
      names: getPlayersByTeam(parseInt(teamNum)).map(p => p.name).join(", ")
    }))
    .sort((a, b) => b.score - a.score);

  // Find winners (teams with highest score)
  const highestScore = sortedTeams.length > 0 ? sortedTeams[0].score : 0;
  const winners = sortedTeams.filter(team => team.score === highestScore);
  const isDecisiveWin = winners.length === 1;

  return (
    <View className="flex-1 justify-center p-6 gap-3">
      <Text variant="displaySmall" style={{ color: theme.colors.primary }} className="text-center">
        Game Over!
      </Text>
      
      {/* Display all teams */}
      <Card>
        <Card.Content>
          <Text variant="titleLarge" style={{ marginBottom: 16, textAlign: 'center' }}>
            Final Scores
          </Text>
          {sortedTeams.map((team, index) => (
            <View 
              key={team.team} 
              style={{ 
                marginBottom: 12,
                padding: 12,
                borderRadius: 8,
                backgroundColor: index === 0 && isDecisiveWin ? `${getTeamColor(team.team)}20` : 'transparent',
                borderWidth: index === 0 && isDecisiveWin ? 2 : 1,
                borderColor: getTeamColor(team.team)
              }}
            >
              <Text variant="titleMedium" style={{ color: getTeamColor(team.team), fontWeight: 'bold' }}>
                Team {team.team}: {team.score} points
              </Text>
              <Text variant="bodyMedium" style={{ marginTop: 4, color: '#666' }}>
                {team.names}
              </Text>
            </View>
          ))}
        </Card.Content>
      </Card>
      
      {/* Winner announcement */}
      <Text variant="titleMedium" className="text-center mt-2" style={{ fontWeight: 'bold' }}>
        {isDecisiveWin 
          ? `🏆 Winner: ${winners[0].names}! 🏆`
          : `🤝 It's a ${winners.length}-way tie! 🤝`
        }
      </Text>
      
      <PrimaryButton
        className="mt-4"
        title="Dashboard"
        onPress={() => router.replace("/dashboard")}
        backgroundColor={theme.colors.primary}
        textColor="#fff"
      />
      <PrimaryButton
        className="mt-2"
        title="Play Again"
        onPress={() => router.replace("/setup")}
        backgroundColor={theme.colors.success}
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


