import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "@/utils/theme";
import { getFontStyle } from "../utils/fonts";

interface GameHeaderProps {
  currentRound: number;
  totalRounds: number;
  timeLeft: number;
}

export default function GameHeader({ currentRound, totalRounds, timeLeft }: GameHeaderProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View style={{ alignItems: 'center', gap: 16 }}>
      <Text variant="titleLarge" className="text-center text-white" style={getFontStyle('h4')}>
        Round {currentRound} / {totalRounds}
      </Text>
      <Text variant="displaySmall" className="text-center" style={[{ color: theme.colors.accentYellow }, getFontStyle('h1')]}>
        {formatTime(timeLeft)}
      </Text>
    </View>
  );
}
