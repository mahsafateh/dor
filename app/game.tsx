import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import PrimaryButton from "../components/PrimaryButton";
import { useAppDispatch, useAppSelector } from "../store";
import { incrementScore, nextPlayer, nextRound, resetGame, setWord } from "../store/slices/gameSlice";
import { Sounds } from "../utils/sound";
import { gradientColors, theme } from "../utils/theme";
import { useResponsive } from "../utils/useResponsive";
import { getAllWordsForCategory, getShuffled } from "../utils/words";

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
      <View style={{ flex: 1, paddingTop: 48, paddingHorizontal: 16 }}>
        <View className="flex-row justify-end">
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
        <Text variant="titleLarge" className="text-center text-white">
          Round {currentRound} / {rounds}
        </Text>
        <Text variant="displaySmall" className="text-center mt-2" style={{ color: theme.colors.accentYellow }}>
          {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
        </Text>

        <PlayersCircle players={playersOnCircle} currentIndex={currentPlayerIndex} />

        <View className="mt-6 items-center">
          <Text
            variant="headlineMedium"
            style={{ backgroundColor: theme.colors.accentYellow, color: "#000", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}
          >
            {currentWord ?? "..."}
          </Text>
        </View>

        <View className="flex-row justify-around mt-6">
          <PrimaryButton title="Pass -5s" onPress={onPass} backgroundColor="#E53935" />
          <PrimaryButton title="Done +1" onPress={onDone} backgroundColor="#43A047" />
        </View>
      </View>
    </LinearGradient>
  );
}

function PlayersCircle({ players, currentIndex }: { players: { id: string; name: string; team: 1 | 2 }[]; currentIndex: number }) {
  const { circleRadius, playerBadge } = useResponsive();
  const radius = circleRadius;
  const center = { x: radius + 12, y: radius + 12 };
  return (
    <View className="items-center mt-6">
      <View style={{ width: radius * 2 + 24, height: radius * 2 + 24, borderRadius: 9999, borderWidth: 2, borderColor: "rgba(255,255,255,0.6)" }}> 
        {players.map((p, idx) => {
          const angle = (2 * Math.PI * idx) / Math.max(1, players.length);
          const x = center.x + radius * Math.cos(angle) - playerBadge.width / 2;
          const y = center.y + radius * Math.sin(angle) - playerBadge.height / 2;
          const isCurrent = idx === currentIndex;
          return (
            <View
              key={p.id}
              style={{ position: "absolute", left: x, top: y, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: isCurrent ? 2 : 0, borderColor: p.team === 1 ? theme.colors.primary : theme.colors.accentOrange, backgroundColor: "rgba(255,255,255,0.85)", width: playerBadge.width, height: playerBadge.height, alignItems: "center", justifyContent: "center" }}
            >
              <Text>{p.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}


