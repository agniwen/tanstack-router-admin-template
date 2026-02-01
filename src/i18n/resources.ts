import enUS from './locales/en-US.json';
import zhCN from './locales/zh-CN.json';

// 定义资源类型
const resources = {
  'zh-CN': {
    translation: zhCN,
  },
  'en-US': {
    translation: enUS,
  },
} as const;

export default resources;
