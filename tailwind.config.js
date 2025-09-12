/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Purple Palette
        primary: '#6A1B9A',
        primaryLight: '#BA68C8',
        primaryDark: '#4A148C',
        primaryAccent: '#E1BEE7',
        primarySubtle: '#F3E5F5',
        
        // Legacy accent colors
        secondary: '#A78BFA',
        orange: '#FF9500',
        yellow: '#FFD700',
        pink: '#FF69B4',
        
        // Semantic colors
        success: '#4CAF50',
        successLight: '#C8E6C9',
        error: '#F44336',
        errorLight: '#FFCDD2',
        warning: '#FF9800',
        warningLight: '#FFE0B2',
        info: '#2196F3',
        infoLight: '#BBDEFB',
        
        // Neutral colors
        surface: '#F8F9FA',
        surfaceVariant: '#F5F5F5',
        surfaceContainer: '#FAFAFA',
        
        // Text colors
        textSecondary: '#333333',
        textTertiary: '#666666',
        
        // Interactive colors
        interactive: '#2196F3',
        interactivePressed: '#1976D2',
        
        // Team colors
        team1: '#6A1B9A', // Purple Thunder
        team2: '#FF6B35', // Coral Crush
        team3: '#4ECDC4', // Teal Titans
        team4: '#45B7D1', // Sky Blazers
        team5: '#96CEB4', // Mint Mavericks
        team6: '#FECA57', // Golden Guardians
        team7: '#FF9FF3', // Pink Panthers
        team8: '#54A0FF', // Royal Raiders
      },
      spacing: {
        '70': '280px', // For drawer width
      },
    },
  },
  plugins: [],
  presets: [require("nativewind/preset")],
}

