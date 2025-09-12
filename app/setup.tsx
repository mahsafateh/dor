import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { HelperText, Text } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "@/store";
import { setPlayerCount } from "@/store/slices/gameSlice";
import { theme } from "@/utils/theme";

const options = [ 4, 6, 8, 10];

export default function SetupScreen() {
  const router = useRouter();
  const playerCount = useAppSelector((s) => s.game.playerCount);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState<number>(playerCount);
  const valid = useMemo(() => count % 2 === 0 && count >= 2, [count]);

  return (
    <Screen center>
      <Text variant="headlineLarge" style={{ color: theme.colors.primary }} className="text-center mb-4">
        How many players?
      </Text>
      <View className="flex-row flex-wrap justify-center gap-3">
        {options.map((n) => (
          <PrimaryButton
            key={n}
            title={String(n)}
            onPress={() => setCount(n)}
            backgroundColor={n === count ? theme.colors.primary : "transparent"}
            textColor={n === count ? "#fff" : theme.colors.primary}
            style={{ borderWidth: 1, borderColor: theme.colors.primary, minWidth: 64 }}
          />
        ))}
      </View>
      <HelperText type={valid ? "info" : "error"} className="text-center mt-2">
        {valid ? "Choose number of players." : "Must be even and ≥ 2."}
      </HelperText>
      <PrimaryButton
        className="mt-6"
        backgroundColor={theme.colors.accentOrange}
        disabled={!valid}
        title="Next"
        onPress={() => {
          dispatch(setPlayerCount(count));
          router.push("/players");
        }}
      />
    </Screen>
  );
}


