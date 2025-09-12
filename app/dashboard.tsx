import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  Modal,
  Animated,
  I18nManager,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import PrimaryButton from '../components/PrimaryButton';
import { useAppTheme, gradientColors } from '../utils/theme';
import { useAppSelector } from '../store';
import { changeLanguage, getAvailableLanguages } from '../utils/i18n';

// ==================== DASHBOARD COMPONENTS ====================

interface StatsCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, onPress }) => {
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
    >
      <View className="flex-row items-center justify-between mb-2">
        <View 
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: color + '20' }}
        >
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text 
          className="text-2xl font-bold" 
          style={{ color: theme.colors.text }}
        >
          {value}
        </Text>
      </View>
      <Text 
        className="text-sm font-medium" 
        style={{ color: theme.colors.textTertiary }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface TeamRankingCardProps {
  teamName: string;
  players: string[];
  score: number;
  color: string;
  rank: number;
  onPress?: () => void;
}

const TeamRankingCard: React.FC<TeamRankingCardProps> = ({ 
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
    >
      <View className="flex-row items-center">
        <View className="w-8 items-center">
          <Text 
            className="text-base font-semibold"
            style={{ color: theme.colors.textSecondary }}
          >
            #{rank}
          </Text>
        </View>
        
        <View className="flex-1 ml-3">
          <Text 
            className="text-lg font-semibold mb-1"
            style={{ color: theme.colors.text }}
          >
            {teamName}
          </Text>
          <Text 
            className="text-sm"
            style={{ color: theme.colors.textTertiary }}
          >
            {players.join(", ")}
          </Text>
          <Text 
            className="text-base font-semibold mt-1"
            style={{ color: color }}
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

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const router = useRouter();
  const slideDirection = I18nManager.isRTL ? 300 : -300;
  const [slideAnim] = useState(new Animated.Value(slideDirection));
  
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : slideDirection,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, slideDirection]);
  
  const menuItems = [
    { 
      icon: 'home' as keyof typeof Ionicons.glyphMap, 
      label: t('dashboard'), 
      route: '/dashboard',
      color: theme.colors.primary 
    },
    { 
      icon: 'people' as keyof typeof Ionicons.glyphMap, 
      label: t('teams'), 
      route: '/players',
      color: theme.colors.info 
    },
    { 
      icon: 'trophy' as keyof typeof Ionicons.glyphMap, 
      label: t('results'), 
      route: '/results',
      color: theme.colors.warning 
    },
    { 
      icon: 'game-controller' as keyof typeof Ionicons.glyphMap, 
      label: t('newGame'), 
      route: '/setup',
      color: theme.colors.success 
    },
    { 
      icon: 'bar-chart' as keyof typeof Ionicons.glyphMap, 
      label: t('category'), 
      route: '/category',
      color: theme.colors.interactive 
    },
    { 
      icon: 'settings' as keyof typeof Ionicons.glyphMap, 
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
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 flex-row">
        <TouchableOpacity 
          className="flex-1" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onPress={onClose} 
        />
        <Animated.View 
          className="w-70"
          style={{ 
            backgroundColor: theme.colors.surface,
            transform: [{ translateX: slideAnim }]
          }}
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryLight]}
            className="flex-row items-center justify-between px-5 py-5"
            style={{ paddingTop: 60 }}
          >
            <Text 
              className="text-xl font-semibold"
              style={{ color: theme.colors.textOnPrimary }}
            >
              {t('menu')}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.textOnPrimary} />
            </TouchableOpacity>
          </LinearGradient>
          
          <ScrollView className="flex-1">
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                className="flex-row items-center p-4 border-b"
                style={{ borderBottomColor: theme.colors.border }}
                onPress={() => handleNavigation(item.route)}
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
        </Animated.View>
      </View>
    </Modal>
  );
};

// ==================== MAIN DASHBOARD SCREEN ====================

export default function DashboardScreen() {
  const { t, i18n } = useTranslation();
  const theme = useAppTheme();
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { width } = Dimensions.get('window');
  
  // Get current game state from Redux
  const players = useAppSelector((s) => s.game.players);
  const scoreByTeam = useAppSelector((s) => s.game.scoreByTeam);
  const currentRound = useAppSelector((s) => s.game.currentRound);
  const rounds = useAppSelector((s) => s.game.rounds);
  
  // Generate dashboard stats based on actual game data
  const dashboardStats = [
    { 
      title: t('currentRound'), 
      value: `${currentRound}/${rounds}`, 
      icon: 'play-circle' as keyof typeof Ionicons.glyphMap, 
      color: theme.colors.primary 
    },
    { 
      title: t('totalPlayers'), 
      value: String(players.length), 
      icon: 'people' as keyof typeof Ionicons.glyphMap, 
      color: theme.colors.info 
    },
    { 
      title: t('activeTeams'), 
      value: String(Object.keys(scoreByTeam).length), 
      icon: 'trophy' as keyof typeof Ionicons.glyphMap, 
      color: theme.colors.success 
    },
    { 
      title: t('highScore'), 
      value: String(Math.max(...Object.values(scoreByTeam), 0)), 
      icon: 'star' as keyof typeof Ionicons.glyphMap, 
      color: theme.colors.warning 
    },
  ];
  
  // Generate team rankings from actual game data
  const getPlayersByTeam = (team: number) => {
    return players.filter(player => player.team === team);
  };
  
  const teamRankings = Object.entries(scoreByTeam)
    .map(([teamNum, score]) => ({
      teamName: `${t('team')} ${teamNum}`,
      players: getPlayersByTeam(parseInt(teamNum)).map(p => p.name),
      score: score,
      color: theme.colors.teams[(parseInt(teamNum) - 1) % theme.colors.teams.length],
      rank: 0, // Will be set after sorting
    }))
    .sort((a, b) => b.score - a.score)
    .map((team, index) => ({
      ...team,
      rank: index + 1,
    }));
  
  return (
    <SafeAreaView 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background }}
    >
      <StatusBar backgroundColor={theme.colors.background} />
      
      {/* Header */}
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
          onPress={() => setDrawerVisible(true)} 
          className="p-2 -ml-2"
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
            onPress={() => {
              const currentLang = i18n.language;
              const nextLang = currentLang === 'en' ? 'fa' : currentLang === 'fa' ? 'sv' : 'en';
              changeLanguage(nextLang);
            }}
          >
            <Text 
              className="text-xs font-bold"
              style={{ color: theme.colors.primary }}
            >
              {i18n.language.toUpperCase()}
            </Text>
          </TouchableOpacity>
          
          {/* Theme Indicator */}
          <View 
            className="w-8 h-8 rounded-full items-center justify-center"
            style={{ backgroundColor: theme.colors.primaryAccent }}
          >
            <Ionicons 
              name="game-controller" 
              size={16} 
              color={theme.colors.primary} 
            />
          </View>
        </View>
      </View>
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View className="px-4 pt-6">
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
        {teamRankings.length > 0 && (
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
                leftIconSource={undefined}
              />
            </View>
            <View className="flex-1">
              <PrimaryButton
                title={t('continueGame')}
                onPress={() => router.push('/game')}
                backgroundColor={theme.colors.info}
                textColor={theme.colors.textOnPrimary}
                leftIconSource={undefined}
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
                leftIconSource={undefined}
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
                leftIconSource={undefined}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      
      {/* Drawer Menu */}
      <DrawerMenu visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </SafeAreaView>
  );
}
