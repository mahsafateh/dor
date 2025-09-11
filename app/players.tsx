import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "@/store";
import { setPlayers } from "@/store/slices/gameSlice";
import { theme } from "@/utils/theme";

export default function PlayerNamesScreen() {
  const router = useRouter();
  const playerCount = useAppSelector((s) => s.game.playerCount);
  const dispatch = useAppDispatch();
  const [names, setNames] = useState<string[]>(Array.from({ length: playerCount }, () => ""));

  const allFilled = names.every((n) => n.trim().length > 0);
  const unique = new Set(names.map((n) => n.trim().toLowerCase())).size === names.length;

  const players = useMemo(
    () =>
      names.map((name, idx) => {
        const teamCount = Math.ceil(names.length / 2);
        const team = (idx % teamCount) + 1; // Cycle through teams
        return {
          id: `${idx + 1}`,
          name,
          team,
        };
      }),
    [names]
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      <Text variant="headlineLarge" style={{ color: theme.colors.primary }} className="text-center mb-2">
        Enter Player Names
      </Text>
      {names.map((_, idx) => {
        const teamCount = Math.ceil(names.length / 2);
        const team = (idx % teamCount) + 1; // Cycle through teams
        // Cycle through colors for different teams
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
        const teamColor = teamColors[(team - 1) % teamColors.length];
        
        return (
          <View key={idx} className="my-1.5">
            <TextInput
              label={`Player ${idx + 1} (Team ${team})`}
              value={names[idx]}
              onChangeText={(t) => setNames((prev) => prev.map((v, i) => (i === idx ? t : v)))}
              mode="outlined"
              outlineColor={teamColor}
            />
          </View>
        );
      })}
      <HelperText type={allFilled ? (unique ? "info" : "error") : "error"}>
        {allFilled ? (unique ? "All names look good." : "Names should be unique.") : "Please fill all names."}
      </HelperText>
      <PrimaryButton
        title="Next"
        disabled={!allFilled}
        onPress={() => {
          dispatch(setPlayers(players));
          router.push("/rounds");
        }}
      />
      </ScrollView>
    </Screen>
  );
}


