import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../utils/theme';

// Enhanced team display component that uses the new graceful team colors
// This component demonstrates how to properly implement WCAG AA compliant team colors
// with the enhanced theme system

interface Player {
  id: string;
  name: string;
  team: number;
}

interface TeamMemberProps {
  player: Player;
  isActive?: boolean;
  onPress?: (player: Player) => void;
}

const TeamMember: React.FC<TeamMemberProps> = ({ player, isActive, onPress }) => {
  const theme = useAppTheme();
  const teamColor = theme.colors.teams[(player.team - 1) % theme.colors.teams.length];
  
  return (
    <TouchableOpacity
      onPress={() => onPress?.(player)}
      className="flex-row items-center p-3 mb-2 rounded-lg border-l-4"
      style={{
        backgroundColor: isActive ? teamColor + '20' : theme.colors.surface,
        borderLeftColor: teamColor,
        borderWidth: isActive ? 2 : 1,
        borderColor: isActive ? teamColor : theme.colors.border,
      }}
      activeOpacity={0.7}
    >
      <View
        className="w-8 h-8 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: teamColor }}
      >
        <Text 
          className="text-sm font-bold"
          style={{ color: theme.colors.textOnPrimary }}
        >
          {player.team}
        </Text>
      </View>
      
      <View className="flex-1">
        <Text
          className="text-base font-semibold"
          style={{ color: theme.colors.text }}
        >
          {player.name}
        </Text>
        <Text
          className="text-sm"
          style={{ color: theme.colors.textTertiary }}
        >
          Team {player.team}
        </Text>
      </View>
      
      {isActive && (
        <View
          className="w-6 h-6 rounded-full items-center justify-center"
          style={{ backgroundColor: teamColor }}
        >
          <Ionicons name="play" size={12} color={theme.colors.textOnPrimary} />
        </View>
      )}
    </TouchableOpacity>
  );
};

interface TeamScoreboardProps {
  scores: Record<number, number>;
  players: Player[];
  currentTeam?: number;
}

const TeamScoreboard: React.FC<TeamScoreboardProps> = ({ 
  scores, 
  players, 
  currentTeam 
}) => {
  const theme = useAppTheme();
  
  // Group players by team
  const teamGroups = players.reduce((groups, player) => {
    const team = player.team;
    if (!groups[team]) {
      groups[team] = [];
    }
    groups[team].push(player);
    return groups;
  }, {} as Record<number, Player[]>);
  
  // Sort teams by score (highest first)
  const sortedTeams = Object.keys(teamGroups)
    .map(teamNum => parseInt(teamNum))
    .sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
  
  return (
    <View className="p-4">
      <Text
        className="text-xl font-bold mb-4 text-center"
        style={{ color: theme.colors.primary }}
      >
        Team Scores
      </Text>
      
      {sortedTeams.map((teamNum, index) => {
        const teamPlayers = teamGroups[teamNum];
        const teamScore = scores[teamNum] || 0;
        const teamColor = theme.colors.teams[(teamNum - 1) % theme.colors.teams.length];
        const isCurrentTeam = teamNum === currentTeam;
        const isLeading = index === 0 && teamScore > 0;
        
        return (
          <View
            key={teamNum}
            className="mb-4 p-4 rounded-xl border-2"
            style={{
              backgroundColor: isCurrentTeam ? teamColor + '15' : theme.colors.surface,
              borderColor: isCurrentTeam ? teamColor : theme.colors.border,
              shadowColor: teamColor,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isCurrentTeam ? 0.2 : 0.1,
              shadowRadius: 4,
              elevation: isCurrentTeam ? 4 : 2,
            }}
          >
            {/* Team Header */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                {isLeading && (
                  <View
                    className="w-8 h-8 rounded-full items-center justify-center mr-2"
                    style={{ backgroundColor: theme.colors.warning }}
                  >
                    <Ionicons name="trophy" size={16} color={theme.colors.textOnPrimary} />
                  </View>
                )}
                <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{ backgroundColor: teamColor }}
                >
                  <Text
                    className="text-lg font-bold"
                    style={{ color: theme.colors.textOnPrimary }}
                  >
                    {teamNum}
                  </Text>
                </View>
                <View className="ml-3">
                  <Text
                    className="text-lg font-semibold"
                    style={{ color: theme.colors.text }}
                  >
                    Team {teamNum}
                  </Text>
                  <Text
                    className="text-sm"
                    style={{ color: theme.colors.textTertiary }}
                  >
                    {teamPlayers.length} {teamPlayers.length === 1 ? 'player' : 'players'}
                  </Text>
                </View>
              </View>
              
              <View className="items-end">
                <Text
                  className="text-2xl font-bold"
                  style={{ color: teamColor }}
                >
                  {teamScore}
                </Text>
                <Text
                  className="text-sm"
                  style={{ color: theme.colors.textTertiary }}
                >
                  points
                </Text>
              </View>
            </View>
            
            {/* Team Members */}
            <View className="mt-2">
              {teamPlayers.map((player) => (
                <View
                  key={player.id}
                  className="flex-row items-center py-1"
                >
                  <View
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: teamColor }}
                  />
                  <Text
                    className="text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {player.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
};

interface ColorPalettePreviewProps {
  title?: string;
}

// Component to preview all the graceful team colors
const ColorPalettePreview: React.FC<ColorPalettePreviewProps> = ({ 
  title = "Team Color Palette" 
}) => {
  const theme = useAppTheme();
  
  const teamNames = [
    "Purple Thunder",
    "Coral Crush", 
    "Teal Titans",
    "Sky Blazers",
    "Mint Mavericks",
    "Golden Guardians",
    "Pink Panthers",
    "Royal Raiders"
  ];
  
  return (
    <View className="p-4">
      <Text
        className="text-lg font-semibold mb-4 text-center"
        style={{ color: theme.colors.text }}
      >
        {title}
      </Text>
      
      <View className="flex-row flex-wrap justify-center gap-3">
        {theme.colors.teams.map((color, index) => (
          <View
            key={index}
            className="items-center"
          >
            <View
              className="w-12 h-12 rounded-full items-center justify-center mb-2"
              style={{ 
                backgroundColor: color,
                shadowColor: color,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Text
                className="text-sm font-bold"
                style={{ color: theme.colors.textOnPrimary }}
              >
                {index + 1}
              </Text>
            </View>
            <Text
              className="text-xs text-center max-w-16"
              style={{ color: theme.colors.textTertiary }}
              numberOfLines={2}
            >
              {teamNames[index]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// Export all components
export { TeamMember, TeamScoreboard, ColorPalettePreview };
export type { Player, TeamMemberProps, TeamScoreboardProps, ColorPalettePreviewProps };
