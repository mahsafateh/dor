import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../context/ThemeContext';
import { TeamRankingCardProps } from '../types/dashboard';

export const TeamRankingCard: React.FC<TeamRankingCardProps> = ({ 
  teamName, 
  players, 
  score, 
  color, 
  rank, 
  onPress 
}) => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="mx-4 mb-3 p-4 rounded-lg border-l-4"
      style={{ 
        backgroundColor: theme.colors.surface,
        borderLeftColor: color,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
      activeOpacity={0.7}
      testID={`team-ranking-card-${rank}`}
    >
      <View className="flex-row items-center">
        <View className="w-8 items-center">
          <Text 
            className="text-base font-semibold"
            style={{ color: theme.colors.textSecondary }}
            testID="team-rank"
          >
            #{rank}
          </Text>
        </View>
        
        <View className="flex-1 ml-3">
          <Text 
            className="text-lg font-semibold mb-1"
            style={{ color: theme.colors.text }}
            testID="team-name"
          >
            {teamName}
          </Text>
          <Text 
            className="text-sm"
            style={{ color: theme.colors.textTertiary }}
            testID="team-players"
          >
            {players.join(", ")}
          </Text>
          <Text 
            className="text-base font-semibold mt-1"
            style={{ color: color }}
            testID="team-score"
          >
            {score} {t('points')}
          </Text>
        </View>
        
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color={theme.colors.textTertiary} 
        />
      </View>
    </TouchableOpacity>
  );
};
