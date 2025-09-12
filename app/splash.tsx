import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { View, Text, Animated } from "react-native";
import { MaterialIcons, Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../components/PrimaryButton";
import { useAppTheme } from "../context/ThemeContext";
import { getFontStyle } from "../utils/fonts";

const FloatingIcon = ({ children, style, delay = 0 }: { children: React.ReactNode; style: any; delay?: number }) => {
  const animatedValue = new Animated.Value(0);
  
  React.useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 3000 + delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 3000 + delay,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <Animated.View style={[style, { transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
};

export default function SplashScreen() {
  const { t } = useTranslation();
  const theme = useAppTheme();

  return (
    <LinearGradient 
      colors={[theme.colors.primaryDark, theme.colors.primary, theme.colors.primaryLight]} 
      style={{ flex: 1 }}
    >
      {/* Floating background elements */}
      <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {/* Floating geometric shapes */}
        <FloatingIcon style={{ position: 'absolute', top: 100, left: 30 }} delay={0}>
          <View style={{ width: 8, height: 20, backgroundColor: theme.colors.accentYellow, borderRadius: 2, transform: [{ rotate: '45deg' }] }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', top: 150, right: 50 }} delay={500}>
          <View style={{ width: 12, height: 12, backgroundColor: theme.colors.info, borderRadius: 2, transform: [{ rotate: '30deg' }] }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', top: 200, left: 70 }} delay={1000}>
          <View style={{ width: 6, height: 15, backgroundColor: theme.colors.accentPink, borderRadius: 1, transform: [{ rotate: '-20deg' }] }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', top: 300, right: 30 }} delay={1500}>
          <View style={{ width: 10, height: 10, backgroundColor: theme.colors.success, borderRadius: 5 }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', bottom: 400, left: 40 }} delay={2000}>
          <View style={{ width: 8, height: 18, backgroundColor: theme.colors.accentOrange, borderRadius: 2, transform: [{ rotate: '60deg' }] }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', bottom: 350, right: 60 }} delay={2500}>
          <View style={{ width: 14, height: 6, backgroundColor: theme.colors.interactive, borderRadius: 3, transform: [{ rotate: '-45deg' }] }} />
        </FloatingIcon>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        {/* Header title */}
        <Text style={[
          getFontStyle('h4'),
          { 
            color: theme.colors.textOnPrimary, 
            marginBottom: 20,
            textAlign: 'center'
          }
        ]}>
          {t('splash.gameTitle')}
        </Text>

        {/* Main title */}
        <Text style={[
          getFontStyle('h1'),
          { 
            color: theme.colors.textOnPrimary, 
            textAlign: 'center',
            marginBottom: 12,
          }
        ]}>
          {t('splash.mainTitle')}
        </Text>

        {/* Subtitle */}
        <Text style={[
          getFontStyle('body'),
          { 
            color: theme.colors.textOnPrimary, 
            textAlign: 'center',
            marginBottom: 40,
            paddingHorizontal: 20,
            opacity: 0.9
          }
        ]}>
          {t('splash.subtitle')}
        </Text>

        {/* Central swirling graphic with icons */}
        <View style={{ 
          width: 200, 
          height: 200, 
          marginBottom: 60,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Central spiral effect */}
          <View style={{
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: 90,
            borderWidth: 3,
            borderColor: theme.colors.accentPink + '40',
            borderStyle: 'dashed'
          }} />
          <View style={{
            position: 'absolute',
            width: 140,
            height: 140,
            borderRadius: 70,
            borderWidth: 2,
            borderColor: theme.colors.primaryAccent + '60',
            borderStyle: 'dashed'
          }} />
          <View style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: theme.colors.accentYellow + '40',
            borderStyle: 'dashed'
          }} />

          {/* Floating icons around the vortex */}
          <FloatingIcon style={{ position: 'absolute', top: -10, left: 50 }}>
            <Ionicons name="bulb" size={24} color={theme.colors.accentYellow} />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', top: 20, right: 10 }} delay={300}>
            <MaterialIcons name="chat-bubble" size={22} color={theme.colors.info} />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', right: -5, top: 80 }} delay={600}>
            <AntDesign name="question" size={20} color={theme.colors.accentPink} />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', bottom: 20, right: 20 }} delay={900}>
            <FontAwesome5 name="trophy" size={18} color={theme.colors.success} />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', bottom: -5, left: 60 }} delay={1200}>
            <MaterialIcons name="timer" size={22} color={theme.colors.accentOrange} />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', left: 10, top: 60 }} delay={1500}>
            <Ionicons name="chatbubbles" size={20} color={theme.colors.primaryLight} />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', left: 80, bottom: 40 }} delay={1800}>
            <AntDesign name="questioncircle" size={18} color={theme.colors.interactive} />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', right: 80, bottom: 60 }} delay={2100}>
            <MaterialIcons name="lightbulb-outline" size={20} color={theme.colors.warning} />
          </FloatingIcon>
        </View>

        {/* Buttons */}
        <View className="w-full max-w-sm">
          <Link href="/dashboard" asChild>
            <PrimaryButton
              title={t('splash.gameDashboard')}
              className="mb-4"
              backgroundColor={theme.colors.accentPink}
              textColor={theme.colors.textOnPrimary}
              style={{ 
                paddingVertical: 16, 
                borderRadius: 25,
                shadowColor: theme.colors.accentPink,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8
              }}
            />
          </Link>

          <Link href="/players" asChild>
            <PrimaryButton
              title={t('splash.play')}
              className="mb-4"
              backgroundColor={theme.colors.info}
              textColor={theme.colors.textOnPrimary}
              style={{ 
                paddingVertical: 16, 
                borderRadius: 25,
                shadowColor: theme.colors.info,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8
              }}
            />
          </Link>

          <Link href="/howtoplay" asChild>
            <PrimaryButton
              title={t('splash.howToPlay')}
              className="mb-4"
              backgroundColor={theme.colors.accentYellow}
              textColor={theme.colors.primary}
              style={{ 
                paddingVertical: 16, 
                borderRadius: 25,
                shadowColor: theme.colors.accentYellow,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8
              }}
            />
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}


