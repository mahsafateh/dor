import { TextStyle } from 'react-native';

// Font family
export const fontFamily = {
  light: 'Quicksand-Light',
  regular: 'Quicksand-Regular',
  medium: 'Quicksand-Medium',
  semiBold: 'Quicksand-SemiBold',
  bold: 'Quicksand-Bold',
} as const;

export const fontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
} as const;

export const lineHeights = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 28,
  xl: 32,
  '2xl': 36,
  '3xl': 42,
  '4xl': 48,
  '5xl': 60,
  '6xl': 72,
} as const;

export const typography = {
  // Headers
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes['5xl'],
    lineHeight: lineHeights['5xl'],
    fontWeight: fontWeights.bold,
  } as TextStyle,
  
  h2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights['4xl'],
    fontWeight: fontWeights.bold,
  } as TextStyle,
  
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights['3xl'],
    fontWeight: fontWeights.semiBold,
  } as TextStyle,
  
  h4: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights['2xl'],
    fontWeight: fontWeights.semiBold,
  } as TextStyle,
  
  h5: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    fontWeight: fontWeights.medium,
  } as TextStyle,
  
  h6: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.medium,
  } as TextStyle,
  
  // Body text
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontWeight: fontWeights.regular,
  } as TextStyle,
  
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.regular,
  } as TextStyle,
  
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.regular,
  } as TextStyle,
  
  // Captions and labels
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.regular,
  } as TextStyle,
  
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.medium,
  } as TextStyle,
  
  // Button text
  button: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontWeight: fontWeights.semiBold,
  } as TextStyle,
  
  buttonLarge: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.semiBold,
  } as TextStyle,
  
  buttonSmall: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.medium,
  } as TextStyle,
  
  // Special text styles
  overline: {
    fontFamily: fontFamily.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.medium,
    textTransform: 'uppercase' as const,
    letterSpacing: 1.2,
  } as TextStyle,
  
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    fontWeight: fontWeights.regular,
    opacity: 0.8,
  } as TextStyle,
  
  // Display text
  display: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes['6xl'],
    lineHeight: lineHeights['6xl'],
    fontWeight: fontWeights.bold,
  } as TextStyle,
} as const;


// Helper function to get font style by variant
export const getFontStyle = (variant: keyof typeof typography): TextStyle => {
  return typography[variant];
};

// Helper function to create custom font style
export const createFontStyle = (
  family: keyof typeof fontFamily,
  size: keyof typeof fontSizes,
  weight?: keyof typeof fontWeights
): TextStyle => ({
  fontFamily: fontFamily[family],
  fontSize: fontSizes[size],
  lineHeight: lineHeights[size],
  fontWeight: weight ? fontWeights[weight] : fontWeights[family],
});

export default {
  fontFamily,
  fontWeights,
  fontSizes,
  lineHeights,
  typography,
  getFontStyle,
  createFontStyle,
};
