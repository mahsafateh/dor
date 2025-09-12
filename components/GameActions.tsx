import React from "react";
import { View } from "react-native";
import PrimaryButton from "./PrimaryButton";

interface GameActionsProps {
  onPass: () => void;
  onDone: () => void;
}

export default function GameActions({ onPass, onDone }: GameActionsProps) {
  return (
    <View className="flex-row justify-around w-full" style={{ gap: 20, marginTop: 20 }}>
      <PrimaryButton 
        title="Pass -5s" 
        onPress={onPass} 
        backgroundColor="#E53935" 
        style={{ flex: 1 }} 
      />
      <PrimaryButton 
        title="Done +1" 
        onPress={onDone} 
        backgroundColor="#43A047" 
        style={{ flex: 1 }} 
      />
    </View>
  );
}
