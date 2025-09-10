import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "../store";
import { setRounds } from "../store/slices/gameSlice";
import { theme } from "../utils/theme";

export default function RoundsScreen() {
  const router = useRouter();
  const rounds = useAppSelector((s) => s.game.rounds);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number>(rounds);

  return (
    <Screen center>
      <Text variant="headlineLarge" style={{ color: theme.colors.primary }} className="text-center mb-4">
        Number of Rounds
      </Text>
      <View className="flex-row justify-center gap-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <PrimaryButton
            key={n}
            title={String(n)}
            onPress={() => setValue(n)}
            backgroundColor={n === value ? theme.colors.primary : "transparent"}
            textColor={n === value ? "#fff" : theme.colors.primary}
            style={{ borderWidth: 1, borderColor: theme.colors.primary, minWidth: 56 }}
          />
        ))}
      </View>
      <PrimaryButton
        className="mt-6"
        title="Next"
        onPress={() => {
          dispatch(setRounds(value));
          router.push("/category");
        }}
      />
    </Screen>
  );
}


