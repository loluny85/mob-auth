// config/themes.ts

export type ThemeKey = 'default' | 'en' | 'fr' | 'ar';

export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  headerBackground: string;
  bodyBackground: string;
  titleFontSize: string
};

type TThemesType = {
  [key in ThemeKey]: Theme;
};

// Themes object containing styles for different themes.
const themes: TThemesType = {
  default: {
    primaryColor: 'blue',
    secondaryColor: 'white',
    headerBackground: 'bg-blue-500',
    bodyBackground: `from-blue-500`,
    titleFontSize: 'text-2xl'
  },
  en: {
    primaryColor: 'blue',
    secondaryColor: 'white',
    headerBackground: 'bg-blue-500',
    bodyBackground: `from-blue-500`,
    titleFontSize: 'text-2xl'
  },
  fr: {
    primaryColor: 'rose',
    secondaryColor: 'white',
    headerBackground: 'bg-rose-500',
    bodyBackground: `from-rose-500`,
    titleFontSize: 'text-3xl'
  },
  ar: {
    primaryColor: 'green',
    secondaryColor: 'white',
    headerBackground: 'bg-green-500',
    bodyBackground: `from-green-500`,
    titleFontSize: 'text-xl'
  },
};

export default themes;