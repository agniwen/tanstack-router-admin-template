// i18n 配置导出
export { fallbackLng, default as i18n, languageNames, supportedLngs } from './i18n';

// 导出类型
export type { SupportedLanguage } from './types.ts';

// 重新导出 react-i18next 常用 API
export { I18nextProvider, Trans, useTranslation } from 'react-i18next';
