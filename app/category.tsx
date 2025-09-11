import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "@/store";
import { CategoryKey, setCategory } from "@/store/slices/gameSlice";
import { theme } from "@/utils/theme";
import { categories } from "@/utils/words";

export default function CategoryScreen() {
  const router = useRouter();
  const category = useAppSelector((s) => s.game.category);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<CategoryKey>(category ?? "mixedCategory");

  return (
    <Screen center>
      <Text variant="headlineLarge" style={{ color: theme.colors.primary }} className="text-center mb-4">
        Choose Category
      </Text>
      <View className="gap-2">
        {Object.keys(categories).map((key) => {
          const k = key as CategoryKey;
          return (
            <PrimaryButton
              key={key}
              title={categories[k]}
              onPress={() => setValue(k)}
              backgroundColor={k === value ? theme.colors.primary : "transparent"}
              textColor={k === value ? "#fff" : theme.colors.primary}
              style={{ borderWidth: 1, borderColor: theme.colors.primary }}
            />
          );
        })}
      </View>
      <PrimaryButton
        className="mt-6"
        title="Next"
        onPress={() => {
          dispatch(setCategory(value));
          router.push("/time");
        }}
      />
    </Screen>
  );
}


