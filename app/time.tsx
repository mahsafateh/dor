import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "../store";
import { setTime } from "../store/slices/gameSlice";
import { theme } from "../utils/theme";

export default function TimeScreen() {
  const router = useRouter();
  const timePerRoundSeconds = useAppSelector((s) => s.game.timePerRoundSeconds);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number>(timePerRoundSeconds);

  return (
    <Screen center>
      <Text variant="headlineLarge" style={{ color: theme.colors.primary }} className="text-center mb-4">
        Game Time per Round
      </Text>
      <View className="flex-row justify-center gap-3">
        {[60, 120, 180].map((n) => (
          <PrimaryButton
            key={n}
            title={`${Math.floor(n / 60)} min`}
            onPress={() => setValue(n)}
            backgroundColor={n === value ? theme.colors.primary : "transparent"}
            textColor={n === value ? "#fff" : theme.colors.primary}
            style={{ borderWidth: 1, borderColor: theme.colors.primary }}
          />
        ))}
      </View>
      <PrimaryButton
        className="mt-6"
        backgroundColor={theme.colors.accentYellow}
        title="Start Game"
        onPress={() => {
          dispatch(setTime(value));
          router.push("/game");
        }}
      />
    </Screen>
  );
}


