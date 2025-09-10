import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { HelperText, Text, TextInput } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "../store";
import { setPlayers } from "../store/slices/gameSlice";
import { theme } from "../utils/theme";

export default function PlayerNamesScreen() {
  const router = useRouter();
  const playerCount = useAppSelector((s) => s.game.playerCount);
  const dispatch = useAppDispatch();
  const [names, setNames] = useState<string[]>(Array.from({ length: playerCount }, () => ""));

  const allFilled = names.every((n) => n.trim().length > 0);
  const unique = new Set(names.map((n) => n.trim().toLowerCase())).size === names.length;

  const players = useMemo(
    () =>
      names.map((name, idx) => ({
        id: `${idx + 1}`,
        name,
        team: ((idx + 1) % 2 === 1 ? 1 : 2) as 1 | 2,
      })),
    [names]
  );

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      <Text variant="headlineLarge" style={{ color: theme.colors.primary }} className="text-center mb-2">
        Enter Player Names
      </Text>
      {names.map((_, idx) => {
        const team = (idx + 1) % 2 === 1 ? 1 : 2;
        return (
          <View key={idx} className="my-1.5">
            <TextInput
              label={`Player ${idx + 1} (Team ${team})`}
              value={names[idx]}
              onChangeText={(t) => setNames((prev) => prev.map((v, i) => (i === idx ? t : v)))}
              mode="outlined"
              outlineColor={team === 1 ? theme.colors.primary : theme.colors.accentOrange}
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


