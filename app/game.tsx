import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Animated } from "react-native";
import { Text } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/store";
import { incrementScore, nextPlayer, nextRound, resetGame, setWord } from "@/store/slices/gameSlice";
import { Sounds } from "@/utils/sound";
import { gradientColors, theme } from "@/utils/theme";
import { useResponsive } from "@/utils/useResponsive";
import { getAllWordsForCategory, getShuffled } from "@/utils/words";

export default function GameScreen() {
  const players = useAppSelector((s) => s.game.players);
  const category = useAppSelector((s) => s.game.category);
  const timePerRoundSeconds = useAppSelector((s) => s.game.timePerRoundSeconds);
  const currentPlayerIndex = useAppSelector((s) => s.game.currentPlayerIndex);
  const currentRound = useAppSelector((s) => s.game.currentRound);
  const rounds = useAppSelector((s) => s.game.rounds);
  const dispatch = useAppDispatch();
  const getCurrentTeam = () => (players[currentPlayerIndex]?.team ?? 1);
  const [timeLeft, setTimeLeft] = useState<number>(timePerRoundSeconds);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof globalThis.setInterval> | null>(null);
  const lastTickBeep = useRef<number>(timePerRoundSeconds);

  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    const ws = getShuffled(getAllWordsForCategory(category ?? "mixedCategory"));
    setAvailableWords(ws);
  }, [category]);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = globalThis.setInterval(() => {
        setTimeLeft((t) => Math.max(0, t - 1));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) globalThis.clearInterval(intervalRef.current as unknown as number);
      intervalRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      Sounds.roundEnd();
      // next player, next round logic simplified: go to results if last round
      if (currentRound >= rounds) {
        router.replace("/results");
      } else {
        dispatch(nextRound());
        setTimeLeft(timePerRoundSeconds);
      }
    } else if (timeLeft > 0 && timeLeft % 10 === 0 && timeLeft !== lastTickBeep.current) {
      lastTickBeep.current = timeLeft;
      Sounds.tick();
    }
  }, [timeLeft]);

  const [currentWord, setCurrentWord] = useState<string | null>(null);
  useEffect(() => {
    if (!currentWord && availableWords.length > 0) {
      const [w, ...rest] = availableWords;
      setAvailableWords(rest);
      setCurrentWord(w);
      dispatch(setWord(w));
    }
  }, [availableWords, currentWord]);

  const playersOnCircle = useMemo(() => players, [players]);

  const onPass = () => {
    setTimeLeft((t) => Math.max(0, t - 5));
    Sounds.pass();
    // new word
    const [w, ...rest] = availableWords;
    setAvailableWords(rest);
    setCurrentWord(w ?? null);
    dispatch(setWord(w ?? null));
  };

  const onDone = async () => {
    dispatch(incrementScore(getCurrentTeam()));
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Sounds.success();
    // next word
    const [w, ...rest] = availableWords;
    setAvailableWords(rest);
    setCurrentWord(w ?? null);
    dispatch(setWord(w ?? null));
    // next player
    dispatch(nextPlayer());
  };

  return (
    <LinearGradient colors={gradientColors.game} style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingTop: 48, paddingHorizontal: 16, justifyContent: 'center' }}>
        <View style={{ position: 'absolute', top: 48, right: 16, zIndex: 10 }}>
          <PrimaryButton
            title="Reset"
            onPress={() => {
              dispatch(resetGame());
              router.replace("/setup");
            }}
            backgroundColor="transparent"
            textColor="#fff"
            style={{ borderWidth: 1, borderColor: "#ffffff44" }}
          />
        </View>
        
        <View style={{ alignItems: 'center', gap: 16 }}>
          <Text variant="titleLarge" className="text-center text-white" style={{ fontFamily: 'Quicksand-Bold' }}>
            Round {currentRound} / {rounds}
          </Text>
          <Text variant="displaySmall" className="text-center" style={{ color: theme.colors.accentYellow, fontFamily: 'Quicksand-Bold' }}>
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
          </Text>

          <PlayersCircle players={playersOnCircle} currentIndex={currentPlayerIndex} currentWord={currentWord} />

          <View className="flex-row justify-around w-full" style={{ gap: 20, marginTop: 20 }}>
            <PrimaryButton title="Pass -5s" onPress={onPass} backgroundColor="#E53935" style={{ flex: 1 }} />
            <PrimaryButton title="Done +1" onPress={onDone} backgroundColor="#43A047" style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

function PlayersCircle({ 
  players, 
  currentIndex, 
  currentWord 
}: { 
  players: { id: string; name: string; team: 1 | 2 }[]; 
  currentIndex: number;
  currentWord: string | null;
}) {
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
                    borderColor: p.team === 1 ? theme.colors.primary : theme.colors.accentOrange,
                    backgroundColor: isCurrent 
                      ? p.team === 1 
                        ? theme.colors.primary
                        : theme.colors.accentOrange
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


