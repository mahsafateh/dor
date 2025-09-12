import { Platform } from 'react-native';

/**
 * Platform-specific styling utilities for better Android/iOS compatibility
 */

export const platformUtils = {
  /**
   * Get elevation for Android, shadow for iOS
   */
  getShadow: (elevation: number) => {
    if (Platform.OS === 'android') {
      return { elevation };
    }
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.1,
      shadowRadius: elevation / 2,
    };
  },

  /**
   * Get platform-specific status bar height
   */
  getStatusBarHeight: () => {
    return Platform.OS === 'android' ? 24 : 0; // Default Android status bar height
  },

  /**
   * Get platform-specific safe area padding
   */
  getSafeAreaPadding: (statusBarHeight?: number) => {
    return {
      paddingTop: Platform.OS === 'android' ? (statusBarHeight || 24) : 0,
    };
  },

  /**
   * Get platform-specific border radius
   */
  getBorderRadius: (radius: number) => {
    return Platform.OS === 'android' ? Math.max(radius, 4) : radius;
  },

  /**
   * Get platform-specific font weight
   */
  getFontWeight: (weight: string) => {
    if (Platform.OS === 'android') {
      // Android font weight mapping
      const weightMap: { [key: string]: string } = {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': 'normal',
        '500': '500',
        '600': '600',
        '700': 'bold',
        '800': '800',
        '900': '900',
        'normal': 'normal',
        'bold': 'bold',
      };
      return weightMap[weight] || 'normal';
    }
    return weight;
  },
};

export default platformUtils;
