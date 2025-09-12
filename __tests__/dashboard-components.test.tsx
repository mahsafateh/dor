import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StatsCard } from '../components/StatsCard';
import { TeamRankingCard } from '../components/TeamRankingCard';
import { DrawerMenu } from '../components/DrawerMenu';

// Mock dependencies
jest.mock('../utils/theme', () => ({
  useAppTheme: () => ({
    colors: {
      surface: '#ffffff',
      border: '#e0e0e0',
      text: '#000000',
      textTertiary: '#666666',
      textSecondary: '#333333',
      primary: '#6A0DAD',
      primaryAccent: '#f0f0f0',
      textOnPrimary: '#ffffff',
      primaryLight: '#8A2BE2',
      info: '#2196F3',
      warning: '#FF9800',
      success: '#4CAF50',
      interactive: '#9C27B0',
    }
  })
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Dashboard Components', () => {
  describe('StatsCard', () => {
    it('renders correctly', () => {
      const { getByText, getByTestId } = render(
        <StatsCard
          title="Test Title"
          value="42"
          icon="play-circle"
          color="#6A0DAD"
        />
      );

      expect(getByText('Test Title')).toBeTruthy();
      expect(getByText('42')).toBeTruthy();
      expect(getByTestId('stats-card-test-title')).toBeTruthy();
      expect(getByTestId('stats-card-value')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByTestId } = render(
        <StatsCard
          title="Test Title"
          value="42"
          icon="play-circle"
          color="#6A0DAD"
          onPress={onPress}
        />
      );

      fireEvent.press(getByTestId('stats-card-test-title'));
      expect(onPress).toHaveBeenCalled();
    });
  });

  describe('TeamRankingCard', () => {
    it('renders team information correctly', () => {
      const { getByText, getByTestId } = render(
        <TeamRankingCard
          teamName="Team Alpha"
          players={["Player 1", "Player 2"]}
          score={100}
          color="#FF5722"
          rank={1}
        />
      );

      expect(getByText('Team Alpha')).toBeTruthy();
      expect(getByText('Player 1, Player 2')).toBeTruthy();
      expect(getByText('100 points')).toBeTruthy();
      expect(getByText('#1')).toBeTruthy();
      expect(getByTestId('team-ranking-card-1')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByTestId } = render(
        <TeamRankingCard
          teamName="Team Alpha"
          players={["Player 1"]}
          score={50}
          color="#FF5722"
          rank={2}
          onPress={onPress}
        />
      );

      fireEvent.press(getByTestId('team-ranking-card-2'));
      expect(onPress).toHaveBeenCalled();
    });
  });

  describe('DrawerMenu', () => {
    it('renders when visible', () => {
      const { getByTestId } = render(
        <DrawerMenu
          visible={true}
          onClose={jest.fn()}
        />
      );

      expect(getByTestId('drawer-menu-modal')).toBeTruthy();
      expect(getByTestId('drawer-menu-content')).toBeTruthy();
    });

    it('calls onClose when overlay is pressed', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <DrawerMenu
          visible={true}
          onClose={onClose}
        />
      );

      fireEvent.press(getByTestId('drawer-menu-overlay'));
      expect(onClose).toHaveBeenCalled();
    });

    it('calls onClose when close button is pressed', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <DrawerMenu
          visible={true}
          onClose={onClose}
        />
      );

      fireEvent.press(getByTestId('drawer-menu-close-button'));
      expect(onClose).toHaveBeenCalled();
    });
  });
});
