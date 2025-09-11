import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity, ViewStyle, Image, ImageSourcePropType, View } from "react-native";

type Props = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  style?: ViewStyle;
  leftIconSource?: ImageSourcePropType;
  leftIconSize?: number;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled,
  backgroundColor = "#6A0DAD",
  textColor = "#FFFFFF",
  className,
  style,
  leftIconSource,
  leftIconSize = 20,
}: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.7}
      className={`rounded-2xl items-center justify-center ${disabled ? "opacity-50" : ""} ${className ?? ""}`}
      style={[{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor }, style]}
      onPress={disabled ? undefined : onPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {leftIconSource ? (
          <Image source={leftIconSource} style={{ width: leftIconSize, height: leftIconSize, borderRadius: 6 }} />
        ) : null}
        <Text style={{ color: textColor, fontWeight: "600", fontFamily: "Quicksand-SemiBold" }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}


