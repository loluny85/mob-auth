import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en/translation.json';
import translationFR from '../locales/fr/translation.json';
import translationAR from '../locales/ar/translation.json';
import errorEN from '../locales/en/error.json';
import errorFR from '../locales/fr/error.json';
import errorAR from '../locales/ar/error.json';

const resources = {
  en: {
    translation: {...translationEN, ...errorEN } // English translations
  },
  fr: {
    translation: {...translationFR, ...errorFR } // French translations
  },
  ar: {
    translation: {...translationAR, ...errorAR } // Arabic translations
  },
};

// Initialize i18n with React integration and set up configuration.
i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Set the default language to English.
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
