import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "@/utils/theme";
import { useResponsive } from "@/utils/useResponsive";

interface PlayersCircleProps {
  players: { id: string; name: string; team: number }[];
  currentIndex: number;
  currentWord: string | null;
  getTeamColor: (teamNumber: number) => string;
}

export default function PlayersCircle({ 
  players, 
  currentIndex, 
  currentWord,
  getTeamColor 
}: PlayersCircleProps) {
  const { circleRadius, playerBadge } = useResponsive();
  const radius = circleRadius;
  const center = { x: radius + 12, y: radius + 12 };
  const rotationAnim = useRef(new Animated.Value(0)).current;

  // Calculate rotation to put current player at top
  const targetRotation = currentIndex * (360 / players.length);
  
  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: -targetRotation, // Negative for counter-clockwise
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, targetRotation, rotationAnim]);

  return (
    <View className="items-center">
      <View style={{ width: radius * 2 + 24, height: radius * 2 + 24, position: 'relative' }}>
        {/* Pointer pointing to current player at top */}
        <LinearGradient
          colors={[theme.colors.accentYellow, theme.colors.accentOrange]}
          style={{
            position: 'absolute',
            top: -15,
            left: center.x - 8,
            width: 16,
            height: 16,
            transform: [{ rotate: '45deg' }],
            zIndex: 10,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 4,
          }}
        />
        
        {/* Fancy circle border with gradient */}
        <LinearGradient
          colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.8)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ 
            width: radius * 2 + 24, 
            height: radius * 2 + 24, 
            borderRadius: 9999,
            padding: 3,
          }}
        >
          <LinearGradient
            colors={['rgba(106, 13, 173, 0.2)', 'rgba(255, 105, 180, 0.3)', 'rgba(255, 215, 0, 0.2)']}
            style={{
              flex: 1,
              borderRadius: 9999,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 6,
            }}
          />
        </LinearGradient>
        
        {/* Animated players container */}
        <Animated.View
          style={{
            position: 'absolute',
            width: radius * 2 + 24,
            height: radius * 2 + 24,
            transform: [{ rotate: rotationAnim.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            }) }]
          }}
        >
          {players.map((p, idx) => {
            const angle = (2 * Math.PI * idx) / Math.max(1, players.length) - Math.PI / 2; // Start from top
            const x = center.x + radius * Math.cos(angle) - playerBadge.width / 2;
            const y = center.y + radius * Math.sin(angle) - playerBadge.height / 2;
            const isCurrent = idx === currentIndex;
            return (
              <Animated.View
                key={p.id}
                style={{ 
                  position: "absolute", 
                  left: x, 
                  top: y, 
                  width: playerBadge.width, 
                  height: playerBadge.height, 
                  transform: [{ rotate: rotationAnim.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '-360deg'] // Counter-rotate to keep text upright
                  }) }]
                }}
              >
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                    borderWidth: isCurrent ? 2 : 1,
                    borderColor: getTeamColor(p.team),
                    backgroundColor: isCurrent 
                      ? getTeamColor(p.team)
                      : '#ffffff',
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOpacity: isCurrent ? 0.4 : 0.1,
                    shadowRadius: isCurrent ? 6 : 2,
                    shadowOffset: { width: 0, height: isCurrent ? 3 : 1 },
                    elevation: isCurrent ? 6 : 2,
                  }}
                >
                  <Text style={{ 
                    fontSize: 12, 
                    fontWeight: isCurrent ? '700' : '500',
                    fontFamily: 'Quicksand-Bold',
                    color: isCurrent ? '#ffffff' : '#333'
                  }}>
                    {p.name}
                  </Text>
                </View>
              </Animated.View>
            );
          })}
        </Animated.View>
        
        {/* Word in center */}
        <View
          style={{
            position: 'absolute',
            left: center.x - 70,
            top: center.y - 25,
            width: 140,
            height: 50,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.accentYellow,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
            borderWidth: 2,
            borderColor: '#fff',
          }}
        >
          <Text style={{ 
            fontSize: 18, 
            fontWeight: '700', 
            color: '#000',
            fontFamily: 'Quicksand-Bold',
          }}>
            {currentWord ?? "..."}
          </Text>
        </View>
      </View>
    </View>
  );
}
