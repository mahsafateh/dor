import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../utils/theme';
import { useAppSelector } from '../store';
import { StatsCardProps } from '../types/dashboard';

interface TeamRanking {
  teamName: string;
  players: string[];
  score: number;
  color: string;
  rank: number;
}

export const useDashboardData = () => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  
  // Get current game state from Redux
  const players = useAppSelector((s) => s.game.players);
  const scoreByTeam = useAppSelector((s) => s.game.scoreByTeam);
  const currentRound = useAppSelector((s) => s.game.currentRound);
  const rounds = useAppSelector((s) => s.game.rounds);
  
  // Generate dashboard stats based on actual game data
  const dashboardStats: StatsCardProps[] = [
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
  
  const teamRankings: TeamRanking[] = Object.entries(scoreByTeam)
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
  
  return {
    dashboardStats,
    teamRankings,
    hasTeams: teamRankings.length > 0,
  };
};
