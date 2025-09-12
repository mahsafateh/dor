import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import { StatsCardProps } from '../types/dashboard';

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  onPress 
}) => {
  const theme = useAppTheme();
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-1 p-4 mx-1 mb-3 rounded-xl border"
      style={{ 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      activeOpacity={0.7}
      testID={`stats-card-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <View className="flex-row items-center justify-between mb-2">
        <View 
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: color + '20' }}
          testID="stats-card-icon-container"
        >
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text 
          className="text-2xl font-bold" 
          style={{ color: theme.colors.text }}
          testID="stats-card-value"
        >
          {value}
        </Text>
      </View>
      <Text 
        className="text-sm font-medium" 
        style={{ color: theme.colors.textTertiary }}
        testID="stats-card-title"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
