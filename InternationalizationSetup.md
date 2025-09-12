# Internationalization Setup Guide

## 📦 Required Dependencies

First, install the required i18n packages:

```bash
npm install i18next react-i18next
# or
yarn add i18next react-i18next
```

## 🚀 Quick Integration Steps

### 1. Initialize i18n System

Add this import to your main `_layout.tsx` file:

```typescript
// In app/_layout.tsx, add at the top:
import '../utils/i18n'; // Initialize i18n
```

### 2. Package.json Dependencies

Add these to your `package.json` dependencies:

```json
{
  "dependencies": {
    "i18next": "^23.7.6",
    "react-i18next": "^13.5.0"
  }
}
```

### 3. Alternative: Use Standalone Internationalized Dashboard

If you prefer to use the complete standalone dashboard with built-in i18n:

```typescript
// Import the standalone component
import InternationalizedDashboard from '../components/InternationalizedDashboard';

// Use instead of the regular dashboard
export default function Dashboard() {
  return <InternationalizedDashboard />;
}
```

## 🌍 Features Included

### ✅ **Complete i18n System**
- **English (en)** - Default language
- **Persian (fa)** - RTL support with I18nManager
- **Swedish (sv)** - Additional European language

### ✅ **RTL Support**
- Automatic RTL layout for Persian
- Flipped UI elements (icons, animations, text alignment)
- System restart prompt for RTL changes

### ✅ **Translation Coverage**
- Dashboard titles and headers
- Navigation menu items
- Button labels and actions
- Stats card titles
- Team-related terms
- Common UI elements (close, back, next, etc.)

### ✅ **Language Switching**
- Header language toggle button
- Cycles through: EN → FA → SV → EN
- Instant language updates
- Preserved app state during language changes

### ✅ **Dark Mode Compatible**
- All translations work in both light and dark themes
- Theme-aware language switcher styling

## 🔧 File Structure

```
├── locales/
│   ├── en.json     # English translations
│   ├── fa.json     # Persian translations (RTL)
│   └── sv.json     # Swedish translations
├── utils/
│   └── i18n.ts     # i18n configuration
├── components/
│   └── InternationalizedDashboard.tsx  # Complete i18n dashboard
└── app/
    └── dashboard.tsx  # Updated main dashboard
```

## 📝 Adding New Translations

### 1. Add to Translation Files

```json
// In locales/en.json
{
  "newKey": "New English Text"
}

// In locales/fa.json  
{
  "newKey": "متن فارسی جدید"
}

// In locales/sv.json
{
  "newKey": "Ny svensk text"
}
```

### 2. Use in Components

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('newKey')}</Text>
  );
}
```

## 🔄 Language Change Handling

```typescript
import { changeLanguage } from '../utils/i18n';

// Change language programmatically
await changeLanguage('fa'); // Switch to Persian

// Get current language
import i18n from '../utils/i18n';
const currentLang = i18n.language; // 'en', 'fa', or 'sv'
```

## 🎯 Key Components

### 1. **LanguageSwitcher Component**
- Displays available languages with flags
- Handles language switching
- Can be used in any screen

### 2. **RTL-Aware Layouts**
- Automatic layout direction based on language
- Proper text alignment and icon positioning
- Responsive to I18nManager changes

### 3. **Translation Hooks**
- `useTranslation()` - Main translation hook
- `t('key')` - Translate function
- `i18n.language` - Current language code

## 🚨 Important Notes

### RTL Language Support
- Persian requires app restart for full RTL support
- Uses React Native's `I18nManager`
- Shows alert to user when restart is needed

### Performance
- Translations are loaded synchronously
- No lazy loading to avoid loading states
- Small bundle size impact (~15KB for all languages)

### Testing
- Test all languages before production
- Verify RTL layout on both iOS and Android
- Check text overflow with longer translations

## 🎮 Integration with Your Game

The i18n system is fully integrated with:
- **Redux state** - Team names and scores
- **Navigation** - All screen titles and buttons  
- **Game flow** - Setup, gameplay, and results
- **User preferences** - Language choice persistence

## 📱 Usage Examples

### Basic Translation
```typescript
const { t } = useTranslation();
return <Text>{t('welcome')}</Text>; // "Welcome back! 🎮"
```

### With Variables
```typescript
const teamScore = 150;
return <Text>{teamScore} {t('points')}</Text>; // "150 points" / "150 امتیاز"
```

### Language Detection
```typescript
import { isCurrentLanguageRTL } from '../utils/i18n';
const isRTL = isCurrentLanguageRTL(); // true for Persian
```

The internationalization system is now fully integrated and ready to use! 🌍✨
