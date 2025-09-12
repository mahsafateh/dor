import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../context/ThemeContext';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
import { loadSoundSettings, saveSoundSettings } from '../utils/storage';

interface SoundSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  effectsEnabled: boolean;
}

export default function SettingsScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  
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
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    soundEnabled: true,
    musicEnabled: true,
    effectsEnabled: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await loadSoundSettings();
      if (settings) {
        setSoundSettings(settings);
      }
    } catch (error) {
      console.warn('Failed to load sound settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: SoundSettings) => {
    try {
      await saveSoundSettings(newSettings);
      setSoundSettings(newSettings);
    } catch (error) {
      console.warn('Failed to save sound settings:', error);
      Alert.alert(getTranslation('error'), 'Failed to save settings');
    }
  };

  const handleSoundToggle = (key: keyof SoundSettings) => {
    const newSettings = {
      ...soundSettings,
      [key]: !soundSettings[key],
    };
    saveSettings(newSettings);
  };

  const handleResetSettings = () => {
    Alert.alert(
      getTranslation('resetSettings'),
      getTranslation('resetSettingsConfirm'),
      [
        { text: getTranslation('cancel'), style: 'cancel' },
        {
          text: getTranslation('confirm'),
          style: 'destructive',
          onPress: () => {
            const defaultSettings: SoundSettings = {
              soundEnabled: true,
              musicEnabled: true,
              effectsEnabled: true,
            };
            saveSettings(defaultSettings);
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <Text style={{ color: theme.colors.text }}>{getTranslation('loading')}</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryLight]}
        className="pt-16 pb-6 px-6"
      >
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.textOnPrimary} />
          </TouchableOpacity>
          <Text
            className="text-2xl font-bold flex-1 text-center"
            style={{ color: theme.colors.textOnPrimary }}
          >
            {getTranslation('settings')}
          </Text>
          <View className="w-10" />
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Sound Settings Section */}
        <View className="mb-8">
          <Text
            className="text-xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            {getTranslation('soundSettings')}
          </Text>
          
          <View
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: theme.colors.surface }}
          >
            {/* Master Sound Toggle */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: theme.colors.primary + '20' }}
                >
                  <Ionicons
                    name={soundSettings.soundEnabled ? 'volume-high' : 'volume-mute'}
                    size={20}
                    color={theme.colors.primary}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold"
                    style={{ color: theme.colors.text }}
                  >
                    {getTranslation('masterSound')}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {getTranslation('masterSoundDescription')}
                  </Text>
                </View>
              </View>
              <Switch
                value={soundSettings.soundEnabled}
                onValueChange={() => handleSoundToggle('soundEnabled')}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary + '40',
                }}
                thumbColor={soundSettings.soundEnabled ? theme.colors.primary : theme.colors.textTertiary}
              />
            </View>

            {/* Music Toggle */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center flex-1">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: theme.colors.info + '20' }}
                >
                  <Ionicons
                    name={soundSettings.musicEnabled ? 'musical-notes' : 'musical-notes-outline'}
                    size={20}
                    color={theme.colors.info}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold"
                    style={{ color: theme.colors.text }}
                  >
                    {getTranslation('backgroundMusic')}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {getTranslation('backgroundMusicDescription')}
                  </Text>
                </View>
              </View>
              <Switch
                value={soundSettings.musicEnabled && soundSettings.soundEnabled}
                onValueChange={() => handleSoundToggle('musicEnabled')}
                disabled={!soundSettings.soundEnabled}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.info + '40',
                }}
                thumbColor={soundSettings.musicEnabled && soundSettings.soundEnabled ? theme.colors.info : theme.colors.textTertiary}
              />
            </View>

            {/* Sound Effects Toggle */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: theme.colors.success + '20' }}
                >
                  <Ionicons
                    name={soundSettings.effectsEnabled ? 'flash' : 'flash-outline'}
                    size={20}
                    color={theme.colors.success}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold"
                    style={{ color: theme.colors.text }}
                  >
                    {getTranslation('soundEffects')}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {getTranslation('soundEffectsDescription')}
                  </Text>
                </View>
              </View>
              <Switch
                value={soundSettings.effectsEnabled && soundSettings.soundEnabled}
                onValueChange={() => handleSoundToggle('effectsEnabled')}
                disabled={!soundSettings.soundEnabled}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.success + '40',
                }}
                thumbColor={soundSettings.effectsEnabled && soundSettings.soundEnabled ? theme.colors.success : theme.colors.textTertiary}
              />
            </View>
          </View>
        </View>

        {/* Other Settings Section */}
        <View className="mb-8">
          <Text
            className="text-xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            {getTranslation('otherSettings')}
          </Text>
          
          <View
            className="rounded-xl p-4"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <TouchableOpacity
              className="flex-row items-center justify-between py-2"
              onPress={handleResetSettings}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center flex-1">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: theme.colors.warning + '20' }}
                >
                  <Ionicons
                    name="refresh"
                    size={20}
                    color={theme.colors.warning}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-base font-semibold"
                    style={{ color: theme.colors.text }}
                  >
                    {getTranslation('resetSettings')}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {getTranslation('resetSettingsDescription')}
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.textTertiary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Back Button */}
        <PrimaryButton
          title={getTranslation('back')}
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </Screen>
  );
}
