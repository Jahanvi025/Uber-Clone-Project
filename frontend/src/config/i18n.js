import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          language: "Language"
        }
      },
      hi: {
        translation: {
          welcome: "स्वागत है",
          language: "भाषा"
        }
      },
      de: {
        translation: {
          welcome: "Willkommen",
          language: "Sprache"
        }
      },
      fr: {
        translation: {
          welcome: "Bienvenue",
          language: "Langue"
        }
      },
      es: {
        translation: {
          welcome: "Bienvenido",
          language: "Idioma"
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
