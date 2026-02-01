import type { supportedLngs } from './i18n';
import type resources from './resources';

// 支持的语言类型
export type SupportedLanguage = (typeof supportedLngs)[number];

// 资源类型
export type Resources = typeof resources;

// 声明 i18next 模块扩展，提供类型安全
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: Resources['zh-CN']
  }
}
