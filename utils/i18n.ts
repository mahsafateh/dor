import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager, Alert } from 'react-native';

// Import translation files
import en from '../locales/en.json';
import fa from '../locales/fa.json';
import sv from '../locales/sv.json';

// Language resources
const resources = {
  en: { translation: en },
  fa: { translation: fa },
  sv: { translation: sv },
};

// Initialize i18n configuration
const initializeI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'fa', // Default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // React Native already escapes by default
      },
      react: {
        useSuspense: false, // Disable suspense for React Native
      },
      compatibilityJSON: 'v4', // Use version 4 of i18next JSON format
    });

  // Handle RTL layout for Persian
  const handleLanguageChange = (language: string) => {
    const isRTL = language === 'fa';
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(isRTL);
    
    // Alert user if restart is needed for RTL changes
    if (I18nManager.isRTL !== isRTL) {
      setTimeout(() => {
        Alert.alert(
          'Language Changed',
          'Please restart the app to fully apply the language changes.',
          [{ text: 'OK' }]
        );
      }, 500);
    }
  };

  // Listen for language changes
  i18n.on('languageChanged', handleLanguageChange);

  return i18n;
};

// Get available languages
export const getAvailableLanguages = () => [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', isRTL: false },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', isRTL: true },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', isRTL: false },
];

// Change language helper
export const changeLanguage = async (languageCode: string) => {
  try {
    await i18n.changeLanguage(languageCode);
    return true;
  } catch (error) {
    console.error('Failed to change language:', error);
    return false;
  }
};

// Get current language info
export const getCurrentLanguageInfo = () => {
  const currentLang = i18n.language;
  return getAvailableLanguages().find(lang => lang.code === currentLang) || getAvailableLanguages()[0];
};

// Check if current language is RTL
export const isCurrentLanguageRTL = () => {
  return getCurrentLanguageInfo().isRTL;
};

// Initialize on import
initializeI18n();

export default i18n;
