import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend'

const loadPath = `/LocalizationAdmin/api/Resources?ResourceSet={{ns}}&LocaleId={{lng}}&ResourceMode=ResDb`;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    fallbackLng: 'en',
    debug: false,
    ns: ["mops.web.cms"],
    defaultNS: "mops.web.cms",
    detection: {
      order: ['queryString']
    },
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath
    },
    react: {
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      wait: true,
      useSuspense: false
    },
  });

export { i18n };
