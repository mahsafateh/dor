import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/PrimaryButton';
import { StatsCard } from '../components/StatsCard';
import { TeamRankingCard } from '../components/TeamRankingCard';
import { DrawerMenu } from '../components/DrawerMenu';
import { useAppTheme } from '../context/ThemeContext';
import { useDashboardData } from '../hooks/useDashboardData';
import { changeLanguage } from '../utils/i18n';
import { ThemeToggle } from '../components/ThemeToggle';

// ==================== DASHBOARD HEADER COMPONENT ====================

const DashboardHeader: React.FC<{ 
  onMenuPress: () => void; 
  onLanguageChange: () => void; 
  currentLanguage: string; 
}> = ({ onMenuPress, onLanguageChange, currentLanguage }) => {
  const { t } = useTranslation();
  const theme = useAppTheme();

  return (
    <View 
      className="flex-row items-center px-4 py-3 border-b"
      style={{ 
        backgroundColor: theme.colors.surface,
        borderBottomColor: theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <TouchableOpacity 
        onPress={onMenuPress} 
        className="p-2 -ml-2"
        testID="header-menu-button"
      >
        <Ionicons name="menu" size={24} color={theme.colors.text} />
      </TouchableOpacity>
      
      <View className="flex-1 ml-3">
        <Text 
          className="text-2xl font-bold"
          style={{ color: theme.colors.primary }}
        >
          {t('dashboardTitle')}
        </Text>
        <Text 
          className="text-sm mt-1"
          style={{ color: theme.colors.textTertiary }}
        >
          {t('welcome')}
        </Text>
      </View>
      
      <View className="flex-row items-center gap-2">
        {/* Language Switcher */}
        <TouchableOpacity 
          className="w-8 h-8 rounded-full items-center justify-center"
          style={{ backgroundColor: theme.colors.primaryAccent }}
          onPress={onLanguageChange}
          testID="language-switcher"
        >
          <Text 
            className="text-xs font-bold"
            style={{ color: theme.colors.primary }}
          >
            {currentLanguage.toUpperCase()}
          </Text>
        </TouchableOpacity>
        
        {/* Theme Toggle */}
        <ThemeToggle />
      </View>
    </View>
  );
};

// ==================== MAIN DASHBOARD SCREEN ====================

export default function DashboardScreen() {
  const { t, i18n } = useTranslation();
  const theme = useAppTheme();
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { width } = Dimensions.get('window');
  
  // Get dashboard data from custom hook
  const { dashboardStats, teamRankings, hasTeams } = useDashboardData();
  
  // Handle language switching
  const handleLanguageChange = () => {
    const currentLang = i18n.language;
    const nextLang = currentLang === 'en' ? 'fa' : currentLang === 'fa' ? 'sv' : 'en';
    changeLanguage(nextLang);
  };
  
  return (
    <SafeAreaView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <StatusBar backgroundColor={theme.colors.background} />
      
      {/* Header */}
      <DashboardHeader
        onMenuPress={() => setDrawerVisible(true)}
        onLanguageChange={handleLanguageChange}
        currentLanguage={i18n.language}
      />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        testID="dashboard-scroll-view"
      >
        {/* Stats Cards */}
        <View className="px-6 pt-6">
          <Text 
            className="text-lg font-semibold mb-4"
            style={{ color: theme.colors.text }}
          >
            {t('gameOverview')}
          </Text>
          <View className="flex-row flex-wrap -mx-1">
            {dashboardStats.map((stat, index) => (
              <View 
                key={index} 
                style={{ width: (width - 40) / 2 }}
              >
                <StatsCard {...stat} />
              </View>
            ))}
          </View>
        </View>
        
        {/* Team Rankings */}
        {hasTeams && (
          <View className="pt-6">
            <Text 
              className="text-lg font-semibold mb-4 px-4"
              style={{ color: theme.colors.text }}
            >
              {t('teamRankings')}
            </Text>
            {teamRankings.map((team, index) => (
              <TeamRankingCard key={index} {...team} />
            ))}
          </View>
        )}
        
        {/* Quick Actions */}
        <View className="px-4 pt-6 pb-8">
          <Text 
            className="text-lg font-semibold mb-4"
            style={{ color: theme.colors.text }}
          >
            {t('quickActions')}
          </Text>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <PrimaryButton
                title={t('newGame')}
                onPress={() => router.push('/setup')}
                backgroundColor={theme.colors.primary}
                textColor={theme.colors.textOnPrimary}
              />
            </View>
            <View className="flex-1">
              <PrimaryButton
                title={t('continueGame')}
                onPress={() => router.push('/game')}
                backgroundColor={theme.colors.info}
                textColor={theme.colors.textOnPrimary}
              />
            </View>
          </View>
          
          <View className="flex-row gap-4 mt-4">
            <View className="flex-1">
              <PrimaryButton
                title={t('teams')}
                onPress={() => router.push('/players')}
                backgroundColor="transparent"
                textColor={theme.colors.primary}
                style={{ 
                  borderWidth: 1, 
                  borderColor: theme.colors.primary 
                }}
              />
            </View>
            <View className="flex-1">
              <PrimaryButton
                title={t('results')}
                onPress={() => router.push('/results')}
                backgroundColor="transparent"
                textColor={theme.colors.success}
                style={{ 
                  borderWidth: 1, 
                  borderColor: theme.colors.success 
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Drawer Menu */}
      <DrawerMenu 
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)} 
      />
    </SafeAreaView>
  );
}
