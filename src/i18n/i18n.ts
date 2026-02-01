import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

export const supportedLngs = ['zh-CN', 'en-US'] as const;

export const fallbackLng = 'zh-CN';

export const languageNames: Record<string, string> = {
  'zh-CN': '简体中文',
  'en-US': 'English',
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    supportedLngs,
    // 将非标准语言代码映射到支持的语言
    load: 'currentOnly',
    // 语言检测配置
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      // 将检测到的语言代码转换为支持的格式
      convertDetectedLanguage: (lng: string) => {
        // zh, zh-Hans, zh-Hans-CN 等都映射到 zh-CN
        if (lng.startsWith('zh'))
          return 'zh-CN';
        // en, en-GB, en-US 等都映射到 en-US
        if (lng.startsWith('en'))
          return 'en-US';
        return lng;
      },
    },

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
    debug: import.meta.env.DEV,
  });

export default i18n;
