import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { View, ImageSourcePropType, FlatList } from "react-native";
import { Text } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import Screen from "../components/Screen";
import { useAppDispatch, useAppSelector } from "@/store";
import { CategoryKey, setCategory } from "@/store/slices/gameSlice";
import { theme } from "@/utils/theme";
import { categories } from "@/utils/words";
import CategoryCard from "../components/CategoryCard";

const categoryImages: Record<CategoryKey, ImageSourcePropType> = {
  fruitAndVegetables: require("../assets/images/fruitandvegetable.png"),
  landmark: require("../assets/images/landmarks.png"),
  animal: require("../assets/images/animals.png"),
  cityAndCountry: require("../assets/images/citycountry.png"),
  movieAndSerial: require("../assets/images/movie.png"),
  foodAndCuisine: require("../assets/images/food.png"),
  sport: require("../assets/images/sports.png"),
  things: require("../assets/images/things.png"),
  profession: require("../assets/images/professoins.png"),
  mixedCategory: require("../assets/images/mixed.png"),
};

export default function CategoryScreen() {
  const router = useRouter();
  const category = useAppSelector((s) => s.game.category);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<CategoryKey>(category ?? "mixedCategory");

  const data = useMemo(() => Object.keys(categories) as CategoryKey[], []);

  return (
    <Screen>
      <Text variant="headlineLarge" style={{ color: theme.colors.primary }} className="text-center mb-4">
        Choose Category
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <CategoryCard
            title={categories[item]}
            imageSource={categoryImages[item]}
            selected={item === value}
            onPress={() => setValue(item)}
          />
        )}
      />
      <PrimaryButton
        className="mt-2"
        title="Next"
        onPress={() => {
          dispatch(setCategory(value));
          router.push("/time");
        }}
      />
    </Screen>
  );
}


