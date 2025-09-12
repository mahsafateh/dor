import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../utils/theme';
import { DrawerMenuProps, MenuItem } from '../types/dashboard';

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const router = useRouter();
  const slideDirection = I18nManager.isRTL ? 280 : -280;
  const [slideAnim] = useState(new Animated.Value(slideDirection));
  
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : slideDirection,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, slideDirection]);
  
  const menuItems: MenuItem[] = [
    { 
      icon: 'home', 
      label: t('dashboard'), 
      route: '/dashboard',
      color: theme.colors.primary 
    },
    { 
      icon: 'people', 
      label: t('teams'), 
      route: '/players',
      color: theme.colors.info 
    },
    { 
      icon: 'trophy', 
      label: t('results'), 
      route: '/results',
      color: theme.colors.warning 
    },
    { 
      icon: 'game-controller', 
      label: t('newGame'), 
      route: '/setup',
      color: theme.colors.success 
    },
    { 
      icon: 'bar-chart', 
      label: t('category'), 
      route: '/category',
      color: theme.colors.interactive 
    },
    { 
      icon: 'settings', 
      label: t('settings'), 
      route: '/time',
      color: theme.colors.textTertiary 
    },
  ];
  
  const handleNavigation = (route: string) => {
    onClose();
    setTimeout(() => {
      router.push(route as any);
    }, 300);
  };
  
  return (
    <Modal 
      visible={visible} 
      transparent 
      animationType="fade"
      testID="drawer-menu-modal"
    >
      <View className="flex-1 flex-row" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Animated.View 
          style={{ 
            width: 280,
            backgroundColor: theme.colors.surface,
            transform: [{ translateX: slideAnim }],
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 10,
          }}
          testID="drawer-menu-content"
        >
          <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryLight]}
              style={{ paddingBottom: 16, paddingHorizontal: 16, paddingTop: 16 }}
            >
              <View className="flex-row items-center justify-between">
                <Text 
                  className="text-xl font-bold flex-1"
                  style={{ color: theme.colors.textOnPrimary }}
                  testID="drawer-menu-title"
                >
                  {t('menu')}
                </Text>
                <TouchableOpacity 
                  onPress={onClose}
                  testID="drawer-menu-close-button"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={22} color={theme.colors.textOnPrimary} />
                </TouchableOpacity>
              </View>
            </LinearGradient>
            
            <ScrollView className="flex-1">
              {menuItems.map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  className="flex-row items-center p-4 border-b"
                  style={{ borderBottomColor: theme.colors.border }}
                  onPress={() => handleNavigation(item.route)}
                  testID={`drawer-menu-item-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                  activeOpacity={0.7}
                >
                  <View 
                    className="w-9 h-9 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: item.color + '20' }}
                  >
                    <Ionicons name={item.icon} size={18} color={item.color} />
                  </View>
                  <Text 
                    className="text-base font-medium"
                    style={{ color: theme.colors.text }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
        <TouchableOpacity 
          className="flex-1" 
          onPress={onClose}
          testID="drawer-menu-overlay"
          activeOpacity={1}
        />
      </View>
    </Modal>
  );
};
