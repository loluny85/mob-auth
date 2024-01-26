export type ThemeKey = 'default' | 'en' | 'fr' | 'ar';

export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  headerBackground: string;
  bodyBackground: string;
  titleFontSize: number
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
    titleFontSize: 32
  },
  en: {
    primaryColor: 'blue',
    secondaryColor: 'white',
    headerBackground: 'bg-blue-500',
    bodyBackground: `from-blue-500`,
    titleFontSize: 32
  },
  fr: {
    primaryColor: 'rose',
    secondaryColor: 'white',
    headerBackground: 'bg-rose-500',
    bodyBackground: `from-rose-500`,
    titleFontSize: 24
  },
  ar: {
    primaryColor: 'green',
    secondaryColor: 'white',
    headerBackground: 'bg-green-500',
    bodyBackground: `from-green-500`,
    titleFontSize: 20
  },
};

export default themes;