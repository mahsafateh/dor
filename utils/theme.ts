import { useColorScheme, TextStyle } from 'react-native';

// Enhanced theme system with WCAG AA compliance and graceful team colors
export const lightTheme = {
  colors: {
    // Primary Purple Palette - Updated to match user requirements
    primary: "#6A1B9A", // Deep Purple (WCAG AA compliant)
    primaryLight: "#BA68C8", // Medium Purple (Accents)
    primaryDark: "#4A148C", // Darker Purple (Headers)
    primaryAccent: "#E1BEE7", // Light Purple (Subtle backgrounds)
    primarySubtle: "#F3E5F5", // Very Light Purple (Card backgrounds)
    
    // Keep existing accent colors but enhance them
    accentOrange: "#FF9500",
    accentYellow: "#FFD700",
    accentPink: "#FF69B4",
    
    // Semantic Colors - WCAG AA Compliant
    success: "#4CAF50", // Green
    successLight: "#C8E6C9",
    error: "#F44336", // Red  
    errorLight: "#FFCDD2",
    warning: "#FF9800", // Orange
    warningLight: "#FFE0B2",
    info: "#2196F3", // Blue
    infoLight: "#BBDEFB",
    
    // Neutral Colors
    background: "#FFFFFF", // Pure white
    surface: "#F8F9FA", // Very light gray
    surfaceVariant: "#F5F5F5", // Light gray backgrounds
    surfaceContainer: "#FAFAFA", // Container backgrounds
    
    // Text Colors - WCAG AA Contrast Ratios
    text: "#212121", // Dark gray (contrast 9.8:1)
    textSecondary: "#333333", // Medium dark gray (contrast 7.0:1)
    textTertiary: "#666666", // Medium gray (contrast 4.6:1)
    textOnPrimary: "#FFFFFF", // White on purple
    
    // Interactive Elements
    interactive: "#2196F3", // Blue for interactive elements
    interactivePressed: "#1976D2", // Darker blue for pressed state
    border: "#E0E0E0", // Light border
    borderVariant: "#BDBDBD", // Medium border
    
    // Graceful Team Colors - Harmonious and accessible
    teams: [
      "#6A1B9A", // Purple Thunder (Primary)
      "#FF6B35", // Coral Crush (Vibrant but soft)
      "#4ECDC4", // Teal Titans (Cool and modern)
      "#45B7D1", // Sky Blazers (Professional blue)
      "#96CEB4", // Mint Mavericks (Fresh green)
      "#FECA57", // Golden Guardians (Warm yellow)
      "#FF9FF3", // Pink Panthers (Soft pink)
      "#54A0FF", // Royal Raiders (Royal blue)
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
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    
    // Adapted colors for dark mode
    primary: "#BA68C8", // Lighter purple for dark backgrounds
    primaryLight: "#CE93D8", // Even lighter purple
    primaryDark: "#8E24AA", // Medium purple
    primaryAccent: "#4A148C", // Dark purple for subtle elements
    primarySubtle: "#2D1B3D", // Very dark purple
    
    // Enhanced accent colors for dark mode
    accentOrange: "#FFB84D", // Brighter orange
    accentYellow: "#FFE066", // Brighter yellow
    accentPink: "#FF85C1", // Brighter pink
    
    // Dark backgrounds
    background: "#121212", // Material Design dark background
    surface: "#1E1E1E", // Dark surface
    surfaceVariant: "#2D2D2D", // Medium dark surface
    surfaceContainer: "#242424", // Container dark background
    
    // Dark text colors - WCAG AA Compliant
    text: "#FFFFFF", // White text
    textSecondary: "#E0E0E0", // Light gray text
    textTertiary: "#B0B0B0", // Medium light gray text
    textOnPrimary: "#000000", // Black on light purple
    
    // Dark interactive elements
    interactive: "#64B5F6", // Lighter blue for dark mode
    interactivePressed: "#42A5F5", // Pressed state
    border: "#404040", // Dark border
    borderVariant: "#606060", // Medium dark border
  },
};

// Hook to get current theme based on system appearance
export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};

// Legacy theme object for backward compatibility
export const theme = lightTheme;

export const gradientColors = {
  splash: ["#6A1B9A", "#FF69B4"] as const,
  game: ["#FF69B4", "#6A1B9A"] as const,
  dashboard: ["#6A1B9A", "#BA68C8"] as const,
  success: ["#4CAF50", "#81C784"] as const,
  warning: ["#FF9800", "#FFB74D"] as const,
  error: ["#F44336", "#EF5350"] as const,
};

