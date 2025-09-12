import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import GameHeader from "../components/GameHeader";
import GameActions from "../components/GameActions";
import PlayersCircle from "../components/PlayersCircle";
import { useAppDispatch, useAppSelector } from "@/store";
import { incrementScore, nextPlayer, resetGame } from "@/store/slices/gameSlice";
import { Sounds } from "@/utils/sound";
import { gradientColors, theme } from "@/utils/theme";
import { useGameTimer } from "@/utils/useGameTimer";
import { useGameWords } from "@/utils/useGameWords";

export default function GameScreen() {
  const players = useAppSelector((s) => s.game.players);
  const currentPlayerIndex = useAppSelector((s) => s.game.currentPlayerIndex);
  const currentRound = useAppSelector((s) => s.game.currentRound);
  const rounds = useAppSelector((s) => s.game.rounds);
  const dispatch = useAppDispatch();
  
  // Custom hooks for game logic
  const { timeLeft, decreaseTime } = useGameTimer();
  const { currentWord, getNextWord } = useGameWords();

  const getCurrentTeam = () => (players[currentPlayerIndex]?.team ?? 1);

  const getTeamColor = (teamNumber: number) => {
    const teamColors = [
      theme.colors.primary,      // Team 1 - Purple
      theme.colors.accentOrange, // Team 2 - Orange
      theme.colors.accentYellow, // Team 3 - Yellow
      '#E91E63',                 // Team 4 - Pink
      '#4CAF50',                 // Team 5 - Green
      '#2196F3',                 // Team 6 - Blue
      '#FF5722',                 // Team 7 - Deep Orange
      '#9C27B0',                 // Team 8 - Purple variant
    ];
    return teamColors[(teamNumber - 1) % teamColors.length];
  };

  const playersOnCircle = useMemo(() => players, [players]);

  const onPass = () => {
    decreaseTime(5);
    Sounds.pass();
    getNextWord();
  };

  const onDone = async () => {
    dispatch(incrementScore(getCurrentTeam()));
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Sounds.success();
    getNextWord();
    
    // next player
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (nextPlayerIndex === 0) {
      // Player turn resets back to first player
      Sounds.tick();
    }
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
          <GameHeader 
            currentRound={currentRound} 
            totalRounds={rounds} 
            timeLeft={timeLeft} 
          />

          <PlayersCircle 
            players={playersOnCircle} 
            currentIndex={currentPlayerIndex} 
            currentWord={currentWord} 
            getTeamColor={getTeamColor} 
          />

          <GameActions onPass={onPass} onDone={onDone} />
        </View>
      </View>
    </LinearGradient>
  );
}
