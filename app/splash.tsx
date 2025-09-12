import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { View, Text, Animated } from "react-native";
import { MaterialIcons, Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import PrimaryButton from "../components/PrimaryButton";

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
  return (
    <LinearGradient 
      colors={['#1a0a2e', '#16213e', '#2d1b69', '#6a1b9a']} 
      style={{ flex: 1 }}
    >
      {/* Floating background elements */}
      <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {/* Floating geometric shapes */}
        <FloatingIcon style={{ position: 'absolute', top: 100, left: 30 }} delay={0}>
          <View style={{ width: 8, height: 20, backgroundColor: '#FFD700', borderRadius: 2, transform: [{ rotate: '45deg' }] }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', top: 150, right: 50 }} delay={500}>
          <View style={{ width: 12, height: 12, backgroundColor: '#00CED1', borderRadius: 2, transform: [{ rotate: '30deg' }] }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', top: 200, left: 70 }} delay={1000}>
          <View style={{ width: 6, height: 15, backgroundColor: '#FF69B4', borderRadius: 1, transform: [{ rotate: '-20deg' }] }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', top: 300, right: 30 }} delay={1500}>
          <View style={{ width: 10, height: 10, backgroundColor: '#32CD32', borderRadius: 5 }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', bottom: 400, left: 40 }} delay={2000}>
          <View style={{ width: 8, height: 18, backgroundColor: '#FF8C00', borderRadius: 2, transform: [{ rotate: '60deg' }] }} />
        </FloatingIcon>
        <FloatingIcon style={{ position: 'absolute', bottom: 350, right: 60 }} delay={2500}>
          <View style={{ width: 14, height: 6, backgroundColor: '#9370DB', borderRadius: 3, transform: [{ rotate: '-45deg' }] }} />
        </FloatingIcon>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        {/* Header title */}
        <Text style={{ 
          fontSize: 24, 
          fontWeight: '600', 
          color: '#FFFFFF', 
          marginBottom: 20,
          fontFamily: "Quicksand-SemiBold",
          textAlign: 'center'
        }}>
          Word Whirl
        </Text>

        {/* Main title */}
        <Text style={{ 
          fontSize: 36, 
          fontWeight: 'bold', 
          color: '#FFFFFF', 
          textAlign: 'center',
          marginBottom: 12,
          fontFamily: "Quicksand-Bold",
          lineHeight: 42
        }}>
          Guess the Word-{'\n'}No cheating!
        </Text>

        {/* Subtitle */}
        <Text style={{ 
          fontSize: 16, 
          color: '#E0E0E0', 
          textAlign: 'center',
          marginBottom: 40,
          fontFamily: "Quicksand-Regular",
          paddingHorizontal: 20,
          lineHeight: 20
        }}>
          A fast-paced word guessing game where{'\n'}creativity and quick thinking win!
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
            borderColor: 'rgba(255, 105, 180, 0.3)',
            borderStyle: 'dashed'
          }} />
          <View style={{
            position: 'absolute',
            width: 140,
            height: 140,
            borderRadius: 70,
            borderWidth: 2,
            borderColor: 'rgba(106, 13, 173, 0.4)',
            borderStyle: 'dashed'
          }} />
          <View style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'rgba(255, 215, 0, 0.3)',
            borderStyle: 'dashed'
          }} />

          {/* Floating icons around the vortex */}
          <FloatingIcon style={{ position: 'absolute', top: -10, left: 50 }}>
            <Ionicons name="bulb" size={24} color="#FFD700" />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', top: 20, right: 10 }} delay={300}>
            <MaterialIcons name="chat-bubble" size={22} color="#00CED1" />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', right: -5, top: 80 }} delay={600}>
            <AntDesign name="question" size={20} color="#FF69B4" />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', bottom: 20, right: 20 }} delay={900}>
            <FontAwesome5 name="trophy" size={18} color="#32CD32" />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', bottom: -5, left: 60 }} delay={1200}>
            <MaterialIcons name="timer" size={22} color="#FF8C00" />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', left: 10, top: 60 }} delay={1500}>
            <Ionicons name="chatbubbles" size={20} color="#9370DB" />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', left: 80, bottom: 40 }} delay={1800}>
            <AntDesign name="questioncircle" size={18} color="#FF1493" />
          </FloatingIcon>
          <FloatingIcon style={{ position: 'absolute', right: 80, bottom: 60 }} delay={2100}>
            <MaterialIcons name="lightbulb-outline" size={20} color="#FFD700" />
          </FloatingIcon>
        </View>

        {/* Buttons */}
        <View className="w-full max-w-sm">
          <Link href="/dashboard" asChild>
            <PrimaryButton
              title="🎮 Game Dashboard"
              className="mb-4"
              backgroundColor="#FF69B4"
              textColor="#FFFFFF"
              style={{ 
                paddingVertical: 16, 
                borderRadius: 25,
                shadowColor: "#FF69B4",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8
              }}
            />
          </Link>

          <Link href="/players" asChild>
            <PrimaryButton
              title="👥 Play"
              className="mb-4"
              backgroundColor="#00CED1"
              textColor="#FFFFFF"
              style={{ 
                paddingVertical: 16, 
                borderRadius: 25,
                shadowColor: "#00CED1",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8
              }}
            />
          </Link>

          <PrimaryButton
            title="❓ How to Play!?"
            className="mb-4"
            backgroundColor="#FFD700"
            textColor="#6A1B9A"
            style={{ 
              paddingVertical: 16, 
              borderRadius: 25,
              shadowColor: "#FFD700",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}


