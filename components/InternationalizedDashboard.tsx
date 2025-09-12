import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  useColorScheme,
  Modal,
  Animated,
  TextStyle,
  I18nManager,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

// ==================== I18N SETUP ====================

// Translation Resources
const resources = {
  en: {
    translation: {
      // Dashboard
      welcome: "Welcome back! 🎮",
      dashboardTitle: "Game Dashboard",
      gameOverview: "Game Overview",
      teamRankings: "Team Rankings",
      quickActions: "Quick Actions",
      menu: "Menu",
      
      // Stats Cards
      currentRound: "Current Round",
      totalPlayers: "Total Players",
      activeTeams: "Active Teams",
      highScore: "High Score",
      totalGames: "Total Games",
      winsToday: "Wins Today",
      scoreAverage: "Score Average",
      
      // Actions
      newGame: "New Game",
      continueGame: "Continue",
      playAgain: "Play Again",
      resetGame: "Reset Game",
      manageTeams: "Manage Teams",
      viewResults: "View Results",
      enterGameHub: "Enter Game Hub",
      quickStart: "Quick Start",
      
      // Navigation
      dashboard: "Dashboard",
      teams: "Teams",
      results: "Results",
      game: "Game",
      setup: "Setup",
      category: "Category",
      settings: "Settings",
      leaderboard: "Leaderboard",
      statistics: "Statistics",
      
      // Team related
      team: "Team",
      points: "points",
      players: "players",
      player: "player",
      rank: "Rank",
      
      // Language switcher
      language: "Language",
      english: "English",
      persian: "فارسی",
      swedish: "Svenska",
      
      // Common
      close: "Close",
      back: "Back",
      next: "Next",
      cancel: "Cancel",
      confirm: "Confirm",
      loading: "Loading...",
      error: "Error",
      success: "Success",
    }
  },
  fa: {
    translation: {
      // Dashboard
      welcome: "خوش آمدید! 🎮",
      dashboardTitle: "پنل بازی",
      gameOverview: "نمای کلی بازی",
      teamRankings: "رنکینگ تیم‌ها",
      quickActions: "عملیات سریع",
      menu: "منو",
      
      // Stats Cards
      currentRound: "دور فعلی",
      totalPlayers: "تعداد بازیکنان",
      activeTeams: "تیم‌های فعال",
      highScore: "بهترین امتیاز",
      totalGames: "تعداد بازی‌ها",
      winsToday: "برد امروز",
      scoreAverage: "میانگین امتیاز",
      
      // Actions
      newGame: "بازی جدید",
      continueGame: "ادامه",
      playAgain: "بازی مجدد",
      resetGame: "بازنشانی بازی",
      manageTeams: "مدیریت تیم‌ها",
      viewResults: "مشاهده نتایج",
      enterGameHub: "ورود به مرکز بازی",
      quickStart: "شروع سریع",
      
      // Navigation
      dashboard: "پنل اصلی",
      teams: "تیم‌ها",
      results: "نتایج",
      game: "بازی",
      setup: "تنظیمات",
      category: "دسته‌بندی",
      settings: "تنظیمات",
      leaderboard: "جدول امتیازات",
      statistics: "آمار",
      
      // Team related
      team: "تیم",
      points: "امتیاز",
      players: "بازیکنان",
      player: "بازیکن",
      rank: "رتبه",
      
      // Language switcher
      language: "زبان",
      english: "English",
      persian: "فارسی",
      swedish: "Svenska",
      
      // Common
      close: "بستن",
      back: "بازگشت",
      next: "بعدی",
      cancel: "انصراف",
      confirm: "تأیید",
      loading: "در حال بارگیری...",
      error: "خطا",
      success: "موفقیت",
    }
  },
  sv: {
    translation: {
      // Dashboard
      welcome: "Välkommen tillbaka! 🎮",
      dashboardTitle: "Spel Dashboard",
      gameOverview: "Spelöversikt",
      teamRankings: "Lag Rankningar",
      quickActions: "Snabbåtgärder",
      menu: "Meny",
      
      // Stats Cards
      currentRound: "Nuvarande Runda",
      totalPlayers: "Totala Spelare",
      activeTeams: "Aktiva Lag",
      highScore: "Högsta Poäng",
      totalGames: "Totala Spel",
      winsToday: "Vinster Idag",
      scoreAverage: "Poänggenomsnitt",
      
      // Actions
      newGame: "Nytt Spel",
      continueGame: "Fortsätt",
      playAgain: "Spela Igen",
      resetGame: "Återställ Spel",
      manageTeams: "Hantera Lag",
      viewResults: "Visa Resultat",
      enterGameHub: "Gå in i Spelhub",
      quickStart: "Snabbstart",
      
      // Navigation
      dashboard: "Dashboard",
      teams: "Lag",
      results: "Resultat",
      game: "Spel",
      setup: "Inställningar",
      category: "Kategori",
      settings: "Inställningar",
      leaderboard: "Topplistor",
      statistics: "Statistik",
      
      // Team related
      team: "Lag",
      points: "poäng",
      players: "spelare",
      player: "spelare",
      rank: "Rang",
      
      // Language switcher
      language: "Språk",
      english: "English",
      persian: "فارسی",
      swedish: "Svenska",
      
      // Common
      close: "Stäng",
      back: "Tillbaka",
      next: "Nästa",
      cancel: "Avbryt",
      confirm: "Bekräfta",
      loading: "Laddar...",
      error: "Fel",
      success: "Framgång",
    }
  }
};

// Initialize i18n
const initializeI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // Default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      }
    });

  // Handle RTL for Persian
  const handleLanguageChange = (language: string) => {
    const isRTL = language === 'fa';
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTL);
    
    if (I18nManager.isRTL !== isRTL) {
      Alert.alert(
        'Restart Required',
        'Please restart the app to apply language changes.',
        [{ text: 'OK' }]
      );
    }
  };

  // Listen for language changes
  i18n.on('languageChanged', handleLanguageChange);

  return i18n;
};

// Initialize i18n
initializeI18n();

// ==================== THEME SYSTEM ====================

interface ThemeColors {
  // Primary Purple Palette
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryAccent: string;
  primarySubtle: string;
  
  // Semantic Colors
  success: string;
  successLight: string;
  error: string;
  errorLight: string;
  warning: string;
  warningLight: string;
  info: string;
  infoLight: string;
  
  // Neutral Colors
  background: string;
  surface: string;
  surfaceVariant: string;
  surfaceContainer: string;
  
  // Text Colors
  onBackground: string;
  onSurface: string;
  onSurfaceVariant: string;
  onPrimary: string;
  
  // Interactive Elements
  interactive: string;
  interactivePressed: string;
  border: string;
  borderVariant: string;
  
  // Team Colors (graceful variants)
  teams: string[];
}

interface Theme {
  colors: ThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: { fontSize: number; fontWeight: TextStyle['fontWeight']; lineHeight: number };
    h2: { fontSize: number; fontWeight: TextStyle['fontWeight']; lineHeight: number };
    h3: { fontSize: number; fontWeight: TextStyle['fontWeight']; lineHeight: number };
    body: { fontSize: number; fontWeight: TextStyle['fontWeight']; lineHeight: number };
    caption: { fontSize: number; fontWeight: TextStyle['fontWeight']; lineHeight: number };
  };
  shadows: {
    sm: object;
    md: object;
    lg: object;
  };
}

// Light Theme
const lightTheme: Theme = {
  colors: {
    // Primary Purple Palette - WCAG AA Compliant
    primary: '#6A1B9A', // Deep Purple (Primary)
    primaryLight: '#BA68C8', // Medium Purple (Accents)
    primaryDark: '#4A148C', // Darker Purple (Headers)
    primaryAccent: '#E1BEE7', // Light Purple (Subtle backgrounds)
    primarySubtle: '#F3E5F5', // Very Light Purple (Card backgrounds)
    
    // Semantic Colors - WCAG AA Compliant
    success: '#4CAF50', // Green
    successLight: '#C8E6C9',
    error: '#F44336', // Red
    errorLight: '#FFCDD2',
    warning: '#FF9800', // Orange
    warningLight: '#FFE0B2',
    info: '#2196F3', // Blue
    infoLight: '#BBDEFB',
    
    // Neutral Colors
    background: '#FFFFFF', // Pure white
    surface: '#F8F9FA', // Very light gray
    surfaceVariant: '#F5F5F5', // Light gray backgrounds
    surfaceContainer: '#FAFAFA', // Container backgrounds
    
    // Text Colors - WCAG AA Contrast Ratios
    onBackground: '#212121', // Dark gray (contrast 9.8:1)
    onSurface: '#333333', // Medium dark gray (contrast 7.0:1)
    onSurfaceVariant: '#666666', // Medium gray (contrast 4.6:1)
    onPrimary: '#FFFFFF', // White on purple
    
    // Interactive Elements
    interactive: '#2196F3', // Blue for interactive elements
    interactivePressed: '#1976D2', // Darker blue for pressed state
    border: '#E0E0E0', // Light border
    borderVariant: '#BDBDBD', // Medium border
    
    // Team Colors - Graceful and Harmonious
    teams: [
      '#6A1B9A', // Purple Thunder
      '#FF6B35', // Coral Crush
      '#4ECDC4', // Teal Titans
      '#45B7D1', // Sky Blazers
      '#96CEB4', // Mint Mavericks
      '#FECA57', // Golden Guardians
      '#FF9FF3', // Pink Panthers
      '#54A0FF', // Royal Raiders
    ],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: '700' as TextStyle['fontWeight'], lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '600' as TextStyle['fontWeight'], lineHeight: 32 },
    h3: { fontSize: 18, fontWeight: '600' as TextStyle['fontWeight'], lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400' as TextStyle['fontWeight'], lineHeight: 24 },
    caption: { fontSize: 14, fontWeight: '400' as TextStyle['fontWeight'], lineHeight: 20 },
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Dark Theme
const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    
    // Adapted for dark mode
    primary: '#BA68C8', // Lighter purple for dark backgrounds
    primaryLight: '#CE93D8', // Even lighter purple
    primaryDark: '#8E24AA', // Medium purple
    primaryAccent: '#4A148C', // Dark purple for subtle elements
    primarySubtle: '#2D1B3D', // Very dark purple
    
    // Dark backgrounds
    background: '#121212', // Material Design dark background
    surface: '#1E1E1E', // Dark surface
    surfaceVariant: '#2D2D2D', // Medium dark surface
    surfaceContainer: '#242424', // Container dark background
    
    // Dark text colors - WCAG AA Compliant
    onBackground: '#FFFFFF', // White text
    onSurface: '#E0E0E0', // Light gray text
    onSurfaceVariant: '#B0B0B0', // Medium light gray text
    onPrimary: '#000000', // Black on light purple
    
    // Dark interactive elements
    interactive: '#64B5F6', // Lighter blue for dark mode
    interactivePressed: '#42A5F5', // Pressed state
    border: '#404040', // Dark border
    borderVariant: '#606060', // Medium dark border
  },
};

// Hook to get current theme
const useInternationalTheme = (): Theme => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

// ==================== LANGUAGE SWITCHER COMPONENT ====================

interface LanguageSwitcherProps {
  onLanguageChange?: (language: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation();
  const theme = useInternationalTheme();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const languages = [
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'fa', name: t('persian'), flag: '🇮🇷' },
    { code: 'sv', name: t('swedish'), flag: '🇸🇪' },
  ];

  const handleLanguageChange = async (langCode: string) => {
    try {
      await i18n.changeLanguage(langCode);
      setCurrentLang(langCode);
      onLanguageChange?.(langCode);
    } catch (error) {
      console.error('Language change failed:', error);
    }
  };

  return (
    <View style={styles.languageSwitcher}>
      <Text style={[styles.languageLabel, { color: theme.colors.onSurfaceVariant }]}>
        {t('language')}
      </Text>
      <View style={styles.languageButtons}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              {
                backgroundColor: currentLang === lang.code ? theme.colors.primary : 'transparent',
                borderColor: theme.colors.border,
              }
            ]}
            onPress={() => handleLanguageChange(lang.code)}
          >
            <Text style={styles.languageFlag}>{lang.flag}</Text>
            <Text
              style={[
                styles.languageName,
                {
                  color: currentLang === lang.code ? theme.colors.onPrimary : theme.colors.onSurface,
                }
              ]}
            >
              {lang.code.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// ==================== DASHBOARD COMPONENTS ====================

interface DashboardCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  onPress?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color, onPress }) => {
  const theme = useInternationalTheme();
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.card,
        { 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          ...theme.shadows.md 
        }
      ]}
      activeOpacity={0.7}
    >
      <View style={[styles.cardHeader, I18nManager.isRTL && styles.cardHeaderRTL]}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon as any} size={24} color={color} />
        </View>
        <Text style={[styles.cardValue, { color: theme.colors.onSurface }]}>{value}</Text>
      </View>
      <Text style={[styles.cardTitle, { color: theme.colors.onSurfaceVariant }]}>{title}</Text>
    </TouchableOpacity>
  );
};

interface TeamCardProps {
  teamName: string;
  score: number;
  color: string;
  rank: number;
  playerNames: string[];
  onPress?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ teamName, score, color, rank, playerNames, onPress }) => {
  const theme = useInternationalTheme();
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.teamCard,
        { 
          backgroundColor: theme.colors.surface,
          borderLeftColor: I18nManager.isRTL ? 'transparent' : color,
          borderRightColor: I18nManager.isRTL ? color : 'transparent',
          borderLeftWidth: I18nManager.isRTL ? 0 : 4,
          borderRightWidth: I18nManager.isRTL ? 4 : 0,
          ...theme.shadows.sm 
        }
      ]}
      activeOpacity={0.7}
    >
      <View style={[styles.teamCardContent, I18nManager.isRTL && styles.teamCardContentRTL]}>
        <View style={styles.teamRank}>
          <Text style={[styles.rankText, { color: theme.colors.onSurfaceVariant }]}>#{rank}</Text>
        </View>
        <View style={[styles.teamInfo, I18nManager.isRTL && styles.teamInfoRTL]}>
          <Text style={[styles.teamName, { color: theme.colors.onSurface }]}>{teamName}</Text>
          <Text style={[styles.teamPlayers, { color: theme.colors.onSurfaceVariant }]}>
            {playerNames.join(", ")}
          </Text>
          <Text style={[styles.teamScore, { color: color }]}>{score} {t('points')}</Text>
        </View>
        <Ionicons 
          name={I18nManager.isRTL ? "chevron-back" : "chevron-forward"} 
          size={20} 
          color={theme.colors.onSurfaceVariant} 
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
  const theme = useInternationalTheme();
  const { t } = useTranslation();
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
    { icon: 'home', label: t('dashboard'), color: theme.colors.primary },
    { icon: 'people', label: t('teams'), color: theme.colors.info },
    { icon: 'trophy', label: t('leaderboard'), color: theme.colors.warning },
    { icon: 'game-controller', label: t('game'), color: theme.colors.success },
    { icon: 'bar-chart', label: t('statistics'), color: theme.colors.interactive },
    { icon: 'settings', label: t('settings'), color: theme.colors.onSurfaceVariant },
  ];
  
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.modalOverlay, I18nManager.isRTL && styles.modalOverlayRTL]}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Animated.View 
          style={[
            styles.drawer,
            I18nManager.isRTL && styles.drawerRTL,
            { 
              backgroundColor: theme.colors.surface,
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          <View style={[styles.drawerHeader, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.drawerTitle, { color: theme.colors.onPrimary }]}>{t('menu')}</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.onPrimary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.drawerContent}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.drawerItem, { borderBottomColor: theme.colors.border }]}
                onPress={onClose}
              >
                <View style={[styles.drawerIconContainer, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text style={[styles.drawerItemText, { color: theme.colors.onSurface }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
            
            {/* Language Switcher in Drawer */}
            <View style={styles.drawerLanguageSwitcher}>
              <LanguageSwitcher />
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ==================== MAIN DASHBOARD SCREEN ====================

const InternationalizedDashboard: React.FC = () => {
  const theme = useInternationalTheme();
  const { t } = useTranslation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get('window');
  
  // Sample data with translations
  const dashboardStats = [
    { title: t('currentRound'), value: '2/3', icon: 'play-circle', color: theme.colors.primary },
    { title: t('totalPlayers'), value: '8', icon: 'people', color: theme.colors.info },
    { title: t('activeTeams'), value: '4', icon: 'trophy', color: theme.colors.success },
    { title: t('highScore'), value: '245', icon: 'star', color: theme.colors.warning },
  ];
  
  const teams = [
    { 
      teamName: `${t('team')} 1`, 
      score: 245, 
      color: theme.colors.teams[0], 
      rank: 1,
      playerNames: ['Alice', 'Bob']
    },
    { 
      teamName: `${t('team')} 2`, 
      score: 230, 
      color: theme.colors.teams[1], 
      rank: 2,
      playerNames: ['Charlie', 'Diana']
    },
    { 
      teamName: `${t('team')} 3`, 
      score: 215, 
      color: theme.colors.teams[2], 
      rank: 3,
      playerNames: ['Eve', 'Frank']
    },
    { 
      teamName: `${t('team')} 4`, 
      score: 200, 
      color: theme.colors.teams[3], 
      rank: 4,
      playerNames: ['Grace', 'Henry']
    },
  ];
  
  const cardWidth = (width - theme.spacing.md * 3) / 2;
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background} 
      />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface, ...theme.shadows.sm }]}>
        <TouchableOpacity 
          onPress={() => setDrawerVisible(true)} 
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        
        <View style={[styles.headerCenter, I18nManager.isRTL && styles.headerCenterRTL]}>
          <Text style={[styles.headerTitle, theme.typography.h2, { color: theme.colors.primary }]}>
            {t('dashboardTitle')}
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            {t('welcome')}
          </Text>
        </View>
        
        <View style={styles.headerRight}>
          {/* Theme Indicator */}
          <View style={[styles.themeIndicator, { backgroundColor: theme.colors.primaryAccent }]}>
            <Ionicons 
              name={colorScheme === 'dark' ? 'moon' : 'sunny'} 
              size={16} 
              color={theme.colors.primary} 
            />
          </View>
          
          {/* Compact Language Switcher */}
          <TouchableOpacity 
            style={[styles.languageToggle, { backgroundColor: theme.colors.primaryAccent }]}
            onPress={() => {
              const currentLang = i18n.language;
              const nextLang = currentLang === 'en' ? 'fa' : currentLang === 'fa' ? 'sv' : 'en';
              i18n.changeLanguage(nextLang);
            }}
          >
            <Text style={[styles.languageToggleText, { color: theme.colors.primary }]}>
              {i18n.language.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.typography.h3, { color: theme.colors.onBackground }]}>
            {t('gameOverview')}
          </Text>
          <View style={[styles.statsGrid, I18nManager.isRTL && styles.statsGridRTL]}>
            {dashboardStats.map((stat, index) => (
              <View key={index} style={{ width: cardWidth }}>
                <DashboardCard {...stat} />
              </View>
            ))}
          </View>
        </View>
        
        {/* Teams Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.typography.h3, { color: theme.colors.onBackground }]}>
            {t('teamRankings')}
          </Text>
          {teams.map((team, index) => (
            <TeamCard key={index} {...team} />
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={[styles.sectionTitle, theme.typography.h3, { color: theme.colors.onBackground }]}>
            {t('quickActions')}
          </Text>
          <View style={[styles.actionButtons, I18nManager.isRTL && styles.actionButtonsRTL]}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={24} color={theme.colors.onPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}>
                {t('newGame')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.info }]}
              activeOpacity={0.8}
            >
              <Ionicons name="people" size={24} color={theme.colors.onPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}>
                {t('manageTeams')}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.actionButtons, I18nManager.isRTL && styles.actionButtonsRTL]}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.success }]}
              activeOpacity={0.8}
            >
              <Ionicons name="play" size={24} color={theme.colors.onPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}>
                {t('continueGame')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.warning }]}
              activeOpacity={0.8}
            >
              <Ionicons name="bar-chart" size={24} color={theme.colors.onPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}>
                {t('viewResults')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Drawer Menu */}
      <DrawerMenu visible={drawerVisible} onClose={() => setDrawerVisible(false)} />
    </SafeAreaView>
  );
};

// ==================== STYLES ====================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  menuButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },
  headerCenterRTL: {
    marginLeft: 0,
    marginRight: 12,
  },
  headerTitle: {
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageToggle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageToggleText: {
    fontSize: 10,
    fontWeight: '600',
  },
  
  // Language Switcher
  languageSwitcher: {
    padding: 16,
    alignItems: 'center',
  },
  languageLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 4,
  },
  languageFlag: {
    fontSize: 16,
  },
  languageName: {
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Content Styles
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  lastSection: {
    paddingBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statsGridRTL: {
    flexDirection: 'row-reverse',
  },
  
  // Card Styles
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardHeaderRTL: {
    flexDirection: 'row-reverse',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Team Card Styles
  teamCard: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  teamCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  teamCardContentRTL: {
    flexDirection: 'row-reverse',
  },
  teamRank: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 16,
    fontWeight: '600',
  },
  teamInfo: {
    flex: 1,
    marginLeft: 12,
  },
  teamInfoRTL: {
    marginLeft: 0,
    marginRight: 12,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  teamPlayers: {
    fontSize: 12,
    marginBottom: 2,
  },
  teamScore: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  actionButtonsRTL: {
    flexDirection: 'row-reverse',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Drawer Styles
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalOverlayRTL: {
    flexDirection: 'row-reverse',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: 280,
    backgroundColor: '#fff',
  },
  drawerRTL: {
    position: 'absolute',
    right: 0,
    height: '100%',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  drawerContent: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  drawerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  drawerItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  drawerLanguageSwitcher: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 16,
  },
});

export default InternationalizedDashboard;

// ==================== EXPORT FOR REUSE ====================
export { initializeI18n, useInternationalTheme, LanguageSwitcher };
export type { Theme, ThemeColors };
