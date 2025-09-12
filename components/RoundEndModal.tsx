import React from 'react';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../context/ThemeContext';
import PrimaryButton from './PrimaryButton';
import { getFontStyle } from '../utils/fonts';

interface RoundEndModalProps {
  visible: boolean;
  currentRound: number;
  totalRounds: number;
  onContinue: () => void;
}

export default function RoundEndModal({ 
  visible, 
  currentRound, 
  totalRounds, 
  onContinue 
}: RoundEndModalProps) {
  const theme = useAppTheme();
  
  // Safe translation hook with fallback
  let t: any;
  try {
    const translation = useTranslation();
    t = translation.t;
  } catch (error) {
    console.warn('Translation hook error:', error);
    t = (key: string) => key; // Fallback to key itself
  }
  
  const getTranslation = (key: string, fallback: string = key): string => {
    try {
      return t ? t(key) : fallback;
    } catch (error) {
      console.warn('Translation error:', error);
      return fallback;
    }
  };

  const isLastRound = currentRound >= totalRounds;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="rgba(0, 0, 0, 0.8)" 
        translucent={Platform.OS === 'android'} 
      />
      <SafeAreaView 
        style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}
      >
        <View className="flex-1 justify-center px-6">
          <View
            className="rounded-2xl p-8 items-center"
            style={{ backgroundColor: theme.colors.surface }}
          >
            {/* Icon */}
            <View
              className="w-20 h-20 rounded-full items-center justify-center mb-6"
              style={{ backgroundColor: theme.colors.primary + '20' }}
            >
              <Ionicons 
                name={isLastRound ? "trophy" : "time"} 
                size={40} 
                color={theme.colors.primary} 
              />
            </View>

            {/* Title */}
            <Text
              className="text-center mb-2"
              style={[{ color: theme.colors.text }, getFontStyle('h2')]}
            >
              {isLastRound 
                ? getTranslation('gameEnded', 'Game Ended!')
                : getTranslation('roundEnded', 'Round Ended!')
              }
            </Text>

            {/* Subtitle */}
            <Text
              className="text-center mb-6"
              style={[{ color: theme.colors.textSecondary }, getFontStyle('bodyLarge')]}
            >
              {isLastRound
                ? getTranslation('gameCompleteMessage', 'The game is complete!')
                : getTranslation('roundCompleteMessage', `Round ${currentRound} is complete!`)
              }
            </Text>

            {/* Round info */}
            <View
              className="rounded-xl p-4 mb-6 w-full"
              style={{ backgroundColor: theme.colors.background }}
            >
              <Text
                className="text-center"
                style={[{ color: theme.colors.text }, getFontStyle('body')]}
              >
                {isLastRound
                  ? getTranslation('finalRound', 'Final Round')
                  : getTranslation('roundXofY', `Round ${currentRound} of ${totalRounds}`).replace('{currentRound}', currentRound.toString()).replace('{totalRounds}', totalRounds.toString())
                }
              </Text>
            </View>

            {/* Continue Button */}
            <PrimaryButton
              title={isLastRound 
                ? getTranslation('viewResults', 'View Results')
                : getTranslation('continueToNextRound', 'Continue to Next Round')
              }
              onPress={onContinue}
              backgroundColor={theme.colors.primary}
              textColor={theme.colors.textOnPrimary}
              style={{ width: '100%' }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
