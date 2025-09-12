import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { View, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import { theme } from "@/utils/theme";
import BubblyWord from "../components/BubblyWord";

export default function SplashScreen() {
  return (
    <ImageBackground 
      source={require("../assets/images/bg.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
      blurRadius={1}
    >
      <LinearGradient 
        colors={['rgba(106, 13, 173, 0.18)', 'rgba(255, 105, 180, 0.18)']} 
        style={{ flex: 1 }}
      >
        <View className="flex-1 items-center justify-center p-2">
          <BubblyWord text="DOR" />
          <BubblyWord text="Catch" />
          <BubblyWord text="Word" />
          <Text variant="titleMedium" className="text-white mt-2" style={{ fontFamily: "Quicksand-Bold" }}>
            Catch Phrase Fun!
          </Text>
          <Link href="/dashboard" asChild>
            <PrimaryButton
              title="Enter Game Hub"
              className="mt-6"
              backgroundColor={theme.colors.primary}
              textColor={theme.colors.accentOrange}
            />
          </Link>
          <Link href="/setup" asChild>
            <PrimaryButton
              title="Quick Start"
              className="mt-3"
              backgroundColor="transparent"
              textColor="#fff"
              style={{ borderWidth: 1, borderColor: "#ffffff44" }}
            />
          </Link>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}


