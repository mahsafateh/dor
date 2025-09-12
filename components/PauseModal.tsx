import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Switch,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../context/ThemeContext';
import PrimaryButton from './PrimaryButton';
import { loadSoundSettings, saveSoundSettings } from '../utils/storage';

interface SoundSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  effectsEnabled: boolean;
}

interface PauseModalProps {
  visible: boolean;
  onClose: () => void;
  onResume: () => void;
}

export default function PauseModal({ visible, onClose, onResume }: PauseModalProps) {
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

  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    soundEnabled: true,
    musicEnabled: true,
    effectsEnabled: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      loadSettings();
    }
  }, [visible]);

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

  const handleResume = () => {
    onResume();
    onClose();
  };

  if (loading) {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <View className="flex-1 justify-center items-center">
            <Text style={{ color: theme.colors.text }}>{getTranslation('loading')}</Text>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        <View className="flex-1 justify-center px-6">
          <View
            className="rounded-2xl p-6"
            style={{ backgroundColor: theme.colors.surface }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text
                className="text-2xl font-bold"
                style={{ color: theme.colors.text }}
              >
                {getTranslation('gamePaused')}
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: theme.colors.border }}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-96">
              {/* Sound Settings Section */}
              <View className="mb-6">
                <Text
                  className="text-lg font-bold mb-4"
                  style={{ color: theme.colors.text }}
                >
                  {getTranslation('soundSettings')}
                </Text>
                
                <View
                  className="rounded-xl p-4"
                  style={{ backgroundColor: theme.colors.background }}
                >
                  {/* Master Sound Toggle */}
                  <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center flex-1">
                      <View
                        className="w-8 h-8 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: theme.colors.primary + '20' }}
                      >
                        <Ionicons
                          name={soundSettings.soundEnabled ? 'volume-high' : 'volume-mute'}
                          size={16}
                          color={theme.colors.primary}
                        />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-sm font-semibold"
                          style={{ color: theme.colors.text }}
                        >
                          {getTranslation('masterSound')}
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
                        className="w-8 h-8 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: theme.colors.info + '20' }}
                      >
                        <Ionicons
                          name={soundSettings.musicEnabled ? 'musical-notes' : 'musical-notes-outline'}
                          size={16}
                          color={theme.colors.info}
                        />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-sm font-semibold"
                          style={{ color: theme.colors.text }}
                        >
                          {getTranslation('backgroundMusic')}
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
                        className="w-8 h-8 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: theme.colors.success + '20' }}
                      >
                        <Ionicons
                          name={soundSettings.effectsEnabled ? 'flash' : 'flash-outline'}
                          size={16}
                          color={theme.colors.success}
                        />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-sm font-semibold"
                          style={{ color: theme.colors.text }}
                        >
                          {getTranslation('soundEffects')}
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
            </ScrollView>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <View className="flex-1">
                <PrimaryButton
                  title={getTranslation('resumeGame')}
                  onPress={handleResume}
                  backgroundColor={theme.colors.success}
                  textColor={theme.colors.textOnPrimary}
                />
              </View>
              <View className="flex-1">
                <PrimaryButton
                  title={getTranslation('close')}
                  onPress={onClose}
                  backgroundColor="transparent"
                  textColor={theme.colors.text}
                  style={{ borderWidth: 1, borderColor: theme.colors.border }}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
