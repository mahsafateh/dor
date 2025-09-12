import React, { useMemo } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  text: string;
};

export default function BubblyWord({ text }: Props) {
  const { width } = useWindowDimensions();
  const maxContentWidth = Math.min(width - 32, 380);
  const letters = useMemo(() => text.split("").filter((c) => c.trim().length > 0), [text]);

  const bubbleSize = letters.length <= 6 ? 56 : 48;
  const getRandomOffset = () => (Math.random() - 0.5) * 8;
  const getRandomRotation = () => (Math.random() - 0.5) * 15;
  const getRandomScale = () => 0.9 + Math.random() * 0.2;

  return (
    <View
      style={{
        width: maxContentWidth,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {letters.map((ch, idx) => {
          const randomOffset = getRandomOffset();
          const randomRotation = getRandomRotation();
          const randomScale = getRandomScale();
          const size = bubbleSize * randomScale;
          
          return (
            <View
              key={`${ch}-${idx}`}
              style={{
                width: size,
                height: size,
                borderRadius: 9999,
                shadowColor: "#000",
                shadowOpacity: 0.35,
                shadowRadius: 12,
                shadowOffset: { width: randomOffset * 0.8, height: 6 + Math.abs(randomOffset) },
                elevation: 8,
                transform: [
                  { translateX: randomOffset },
                  { translateY: randomOffset * 0.5 },
                  { rotate: `${randomRotation}deg` },
                ],
              }}
            >
              <LinearGradient
                colors={['#CCB1B8', '#B9A5C2', '#8E95A3']}
                start={{ x: 0.2, y: 0.2 }}
                end={{ x: 0.8, y: 0.8 }}
                style={{
                  width: size,
                  height: size,
                  borderRadius: 9999,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.08)",
                }}
              >
                {/* Inner highlight */}
                <View
                  style={{
                    position: "absolute",
                    top: size * 0.15,
                    left: size * 0.2,
                    width: size * 0.3,
                    height: size * 0.15,
                    borderRadius: 9999,
                    backgroundColor: "rgba(255, 255, 255, 0.61)",
                  }}
                />
                <Text style={{ 
                  fontFamily: "Quicksand-Bold", 
                  fontSize: Math.max(16, 22 * randomScale),
                  color: "#2a2a2a",
                  textShadowColor: "rgba(44, 38, 38, 0.91)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 1,
                }}>
                  {ch.toUpperCase()}
                </Text>
              </LinearGradient>
            </View>
          );
        })}
      </View>
    </View>
  );
}


