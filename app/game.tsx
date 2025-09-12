import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../components/PrimaryButton";
import GameHeader from "../components/GameHeader";
import GameActions from "../components/GameActions";
import PlayersCircle from "../components/PlayersCircle";
import PauseModal from "../components/PauseModal";
import { useAppDispatch, useAppSelector } from "@/store";
import { incrementScore, nextPlayer, resetGame, pauseGame, resumeGame } from "@/store/slices/gameSlice";
import { Sounds } from "@/utils/sound";
import { gradientColors } from "@/utils/theme";
import { useAppTheme } from "@/context/ThemeContext";
import { useGameTimer } from "@/utils/useGameTimer";
import { useGameWords } from "@/utils/useGameWords";

export default function GameScreen() {
  const theme = useAppTheme();
  const players = useAppSelector((s) => s.game.players);
  const currentPlayerIndex = useAppSelector((s) => s.game.currentPlayerIndex);
  const currentRound = useAppSelector((s) => s.game.currentRound);
  const rounds = useAppSelector((s) => s.game.rounds);
  const isPaused = useAppSelector((s) => s.game.isPaused);
  const dispatch = useAppDispatch();
  const [showPauseModal, setShowPauseModal] = useState(false);
  
  // Custom hooks for game logic
  const { timeLeft, decreaseTime } = useGameTimer();
  const { currentWord, getNextWord } = useGameWords();

  const getCurrentTeam = () => (players[currentPlayerIndex]?.team ?? 1);

  const getTeamColor = (teamNumber: number) => {
    return theme.colors.teams[(teamNumber - 1) % theme.colors.teams.length];
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

  const handlePause = () => {
    dispatch(pauseGame(timeLeft));
    setShowPauseModal(true);
  };

  const handleResume = () => {
    dispatch(resumeGame());
    setShowPauseModal(false);
  };

  const handleClosePauseModal = () => {
    setShowPauseModal(false);
  };

  return (
    <LinearGradient colors={[theme.colors.primary, theme.colors.primaryLight]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header with buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 16, paddingVertical: 12 }}>
          <PrimaryButton
            title="Settings"
            onPress={handlePause}
            backgroundColor="transparent"
            textColor={theme.colors.textOnPrimary}
            style={{ borderWidth: 1, borderColor: theme.colors.textOnPrimary + '44', flex: 1, marginHorizontal: 8 }}
          />
          <PrimaryButton
            title="Reset"
            onPress={() => {
              dispatch(resetGame());
              router.replace("/dashboard");
            }}
            backgroundColor="transparent"
            textColor={theme.colors.textOnPrimary}
            style={{ borderWidth: 1, borderColor: theme.colors.textOnPrimary + '44', flex: 1, marginHorizontal: 8 }}
          />
        </View>
        
        <View style={{ flex: 1, paddingHorizontal: 16, justifyContent: 'center' }}>
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
      </SafeAreaView>
      
      {/* Pause Modal */}
      <PauseModal
        visible={showPauseModal}
        onClose={handleClosePauseModal}
        onResume={handleResume}
      />
    </LinearGradient>
  );
}
