import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity, ViewStyle } from "react-native";

type Props = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  style?: ViewStyle;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled,
  backgroundColor = "#6A0DAD",
  textColor = "#FFFFFF",
  className,
  style,
}: Props) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.7}
      className={`rounded-2xl items-center justify-center ${disabled ? "opacity-50" : ""} ${className ?? ""}`}
      style={[{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor }, style]}
      onPress={disabled ? undefined : onPress}
    >
      <Text style={{ color: textColor, fontWeight: "600" }}>{title}</Text>
    </TouchableOpacity>
  );
}


