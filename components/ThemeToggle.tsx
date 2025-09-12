import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primaryAccent,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      activeOpacity={0.7}
      testID="theme-toggle-button"
    >
      <Ionicons
        name={isDark ? 'sunny' : 'moon'}
        size={20}
        color={theme.colors.primary}
      />
    </TouchableOpacity>
  );
};

export const ThemeSelector: React.FC = () => {
  const { themeMode, setThemeMode, theme } = useTheme();

  const options = [
    { value: 'light', label: 'Light', icon: 'sunny' },
    { value: 'dark', label: 'Dark', icon: 'moon' },
    { value: 'system', label: 'System', icon: 'phone-portrait' },
  ] as const;

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => setThemeMode(option.value)}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: themeMode === option.value 
              ? theme.colors.primary 
              : 'transparent',
          }}
          activeOpacity={0.7}
          testID={`theme-option-${option.value}`}
        >
          <Ionicons
            name={option.icon}
            size={16}
            color={themeMode === option.value 
              ? theme.colors.textOnPrimary 
              : theme.colors.text}
            style={{ marginRight: 6 }}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: themeMode === option.value 
                ? theme.colors.textOnPrimary 
                : theme.colors.text,
              fontFamily: 'Quicksand-Medium',
            }}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
