import { Ionicons } from '@expo/vector-icons';

export interface StatsCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress?: () => void;
}

export interface TeamRankingCardProps {
  teamName: string;
  players: string[];
  score: number;
  color: string;
  rank: number;
  onPress?: () => void;
}

export interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

export interface MenuItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: string;
  color: string;
}
