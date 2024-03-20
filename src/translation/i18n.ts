import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Russian from './translation/ru.json';
import English from './translation/en.json';

const resources = {
  en: English,
  ru: Russian
};

i18n
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: resources,
  });

export default i18n;
