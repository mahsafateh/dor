import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../context/ThemeContext';
import { getFontStyle } from '../utils/fonts';
const HowToPlayScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useAppTheme();
  const router = useRouter();

  const gameRules = [
    {
      step: '1',
      title: t('howToPlay.step1.title'),
      description: t('howToPlay.step1.description'),
      icon: 'people',
    },
    {
      step: '2',
      title: t('howToPlay.step2.title'),
      description: t('howToPlay.step2.description'),
      icon: 'eye',
    },
    {
      step: '3',
      title: t('howToPlay.step3.title'),
      description: t('howToPlay.step3.description'),
      icon: 'chatbubble',
    },
    {
      step: '4',
      title: t('howToPlay.step4.title'),
      description: t('howToPlay.step4.description'),
      icon: 'timer',
    },
    {
      step: '5',
      title: t('howToPlay.step5.title'),
      description: t('howToPlay.step5.description'),
      icon: 'arrow-forward',
    },
    {
      step: '6',
      title: t('howToPlay.step6.title'),
      description: t('howToPlay.step6.description'),
      icon: 'swap-horizontal',
    },
    {
      step: '7',
      title: t('howToPlay.step7.title'),
      description: t('howToPlay.step7.description'),
      icon: 'trophy',
    },
  ];

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={require('../assets/images/howtoplay.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent={Platform.OS === 'android'} 
      />
      <SafeAreaView 
        style={{ 
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}
      >
          {/* Header */}
          <View 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
          >
            <TouchableOpacity
              onPress={handleGoBack}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <Text
              style={[
                getFontStyle('h3'),
                {
                  color: '#FFFFFF',
                  textAlign: 'center',
                  flex: 1,
                  marginLeft: 16,
                }
              ]}
            >
              {t('howToPlayTitle')}
            </Text>
            
            <View style={{ width: 40 }} />
          </View>

          {/* Content */}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingTop: 8,
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            {gameRules.map((rule, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: 10,
                  borderRadius: 16,
                  padding: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: Platform.OS === 'android' ? 8 : 0,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: theme.colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.textOnPrimary,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}
                    >
                      {rule.step}
                    </Text>
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Ionicons
                        name={rule.icon as any}
                        size={24}
                        color={theme.colors.primary}
                        style={{ marginRight: 8 }}
                      />
                      <Text
                        style={[
                          getFontStyle('h6'),
                          {
                            color: theme.colors.text,
                            flex: 1,
                          }
                        ]}
                      >
                        {rule.title}
                      </Text>
                    </View>
                    
                    <Text
                      style={[
                        getFontStyle('body'),
                        {
                          color: theme.colors.textSecondary,
                        }
                      ]}
                    >
                      {rule.description}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            {/* Fun Tips Section */}
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 16,
                padding: 16,
                marginTop: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
                elevation: Platform.OS === 'android' ? 8 : 0,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name="bulb" size={24} color={theme.colors.accentYellow || theme.colors.warning} />
                <Text
                  style={[
                    getFontStyle('h6'),
                    {
                      color: theme.colors.text,
                      marginLeft: 12,
                    }
                  ]}
                >
                  {t('proTips')}
                </Text>
              </View>
              
              <Text
                style={[
                  getFontStyle('body'),
                  {
                    color: theme.colors.textSecondary,
                  }
                ]}
              >
                {t('proTipsContent')}
              </Text>
            </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HowToPlayScreen;
