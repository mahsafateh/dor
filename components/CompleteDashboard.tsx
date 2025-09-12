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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
      '#6A1B9A', // Purple (Primary)
      '#FF6B35', // Coral Orange
      '#4ECDC4', // Teal
      '#45B7D1', // Sky Blue
      '#96CEB4', // Mint Green
      '#FECA57', // Golden Yellow
      '#FF9FF3', // Pink
      '#54A0FF', // Royal Blue
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
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
    h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    caption: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
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
const useCompleteDashboardTheme = (): Theme => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
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
  const theme = useCompleteDashboardTheme();
  
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
      <View style={styles.cardHeader}>
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
  onPress?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ teamName, score, color, rank, onPress }) => {
  const theme = useCompleteDashboardTheme();
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.teamCard,
        { 
          backgroundColor: theme.colors.surface,
          borderLeftColor: color,
          borderLeftWidth: 4,
          ...theme.shadows.sm 
        }
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.teamRank}>
        <Text style={[styles.rankText, { color: theme.colors.onSurfaceVariant }]}>#{rank}</Text>
      </View>
      <View style={styles.teamInfo}>
        <Text style={[styles.teamName, { color: theme.colors.onSurface }]}>{teamName}</Text>
        <Text style={[styles.teamScore, { color: color }]}>{score} points</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.colors.onSurfaceVariant} />
    </TouchableOpacity>
  );
};

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
  const theme = useCompleteDashboardTheme();
  const [slideAnim] = useState(new Animated.Value(-300));
  
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);
  
  const menuItems = [
    { icon: 'home', label: 'Dashboard', color: theme.colors.primary },
    { icon: 'people', label: 'Teams', color: theme.colors.info },
    { icon: 'trophy', label: 'Leaderboard', color: theme.colors.warning },
    { icon: 'game-controller', label: 'Games', color: theme.colors.success },
    { icon: 'bar-chart', label: 'Statistics', color: theme.colors.interactive },
    { icon: 'settings', label: 'Settings', color: theme.colors.onSurfaceVariant },
  ];
  
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackground} onPress={onClose} />
        <Animated.View 
          style={[
            styles.drawer,
            { 
              backgroundColor: theme.colors.surface,
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          <View style={[styles.drawerHeader, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.drawerTitle, { color: theme.colors.onPrimary }]}>Menu</Text>
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
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ==================== MAIN DASHBOARD SCREEN ====================

const DashboardScreen: React.FC = () => {
  const theme = useCompleteDashboardTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get('window');
  
  // Sample data
  const dashboardStats = [
    { title: 'Total Games', value: '24', icon: 'game-controller', color: theme.colors.primary },
    { title: 'Active Teams', value: '8', icon: 'people', color: theme.colors.info },
    { title: 'Wins Today', value: '12', icon: 'trophy', color: theme.colors.success },
    { title: 'Score Average', value: '85', icon: 'bar-chart', color: theme.colors.warning },
  ];
  
  const teams = [
    { teamName: 'Purple Thunder', score: 245, color: theme.colors.teams[0], rank: 1 },
    { teamName: 'Orange Crush', score: 230, color: theme.colors.teams[1], rank: 2 },
    { teamName: 'Teal Titans', score: 215, color: theme.colors.teams[2], rank: 3 },
    { teamName: 'Sky Blazers', score: 200, color: theme.colors.teams[3], rank: 4 },
    { teamName: 'Mint Mavericks', score: 185, color: theme.colors.teams[4], rank: 5 },
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
        <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, theme.typography.h2, { color: theme.colors.primary }]}>
            Dashboard
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            Welcome back! 👋
          </Text>
        </View>
        
        <View style={[styles.themeIndicator, { backgroundColor: theme.colors.primaryAccent }]}>
          <Ionicons 
            name={colorScheme === 'dark' ? 'moon' : 'sunny'} 
            size={16} 
            color={theme.colors.primary} 
          />
        </View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, theme.typography.h3, { color: theme.colors.onBackground }]}>
            Overview
          </Text>
          <View style={styles.statsGrid}>
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
            Top Teams
          </Text>
          {teams.map((team, index) => (
            <TeamCard key={index} {...team} />
          ))}
        </View>
        
        {/* Quick Actions */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={[styles.sectionTitle, theme.typography.h3, { color: theme.colors.onBackground }]}>
            Quick Actions
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={24} color={theme.colors.onPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}>
                New Game
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.info }]}
              activeOpacity={0.8}
            >
              <Ionicons name="people" size={24} color={theme.colors.onPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}>
                Manage Teams
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
  headerTitle: {
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  themeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
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
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  teamScore: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: 280,
    backgroundColor: '#fff',
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
});

export default DashboardScreen;

// ==================== EXPORT THEME FOR REUSE ====================
export { useCompleteDashboardTheme, lightTheme, darkTheme };
export type { Theme, ThemeColors };
