import React from "react";
import { ImageBackground, ImageSourcePropType, Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  imageSource: ImageSourcePropType;
  selected?: boolean;
  onPress?: () => void;
};

export default function CategoryCard({ title, imageSource, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{ flexBasis: "48%", aspectRatio: 1, borderRadius: 16, overflow: "hidden" }}
    >
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14, textAlign: "center", fontFamily: "Quicksand-Bold" }}>{title}</Text>
        </View>
        {selected ? (
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderColor: "#6A0DAD",
              borderWidth: 3,
              borderRadius: 16,
            }}
          />
        ) : null}
      </ImageBackground>
    </Pressable>
  );
}

import { StyleSheet } from "react-native";


