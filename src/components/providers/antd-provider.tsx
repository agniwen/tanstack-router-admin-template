import type { PropsWithChildren } from 'react';
import { ProConfigProvider } from '@ant-design/pro-components';
import { theme as antdTheme, App, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import { useTranslation } from 'react-i18next';
import { darkTheme, lightTheme } from '~/const/theme';
import { useTheme } from '~/hooks/use-theme';

interface AntdProviderProps extends PropsWithChildren {
}

// Ant Design locale 映射
const localeMap = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

/**
 * Ant Design 和 Pro Components 配置提供者
 * 管理：
 * - Ant Design 主题和国际化
 * - Pro Components 主题和国际化
 * - App 静态方法（message、notification 等）
 */
export function AntdProvider({ children }: AntdProviderProps) {
  const { isDark } = useTheme();
  const { i18n } = useTranslation();

  // 获取当前语言的 Ant Design locale
  const currentLocale = localeMap[i18n.language as keyof typeof localeMap] || zhCN;

  return (
    <ConfigProvider
      locale={currentLocale}
      theme={{
        ...(isDark ? darkTheme : lightTheme),
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <ProConfigProvider dark={isDark}>
        <App>
          {children}
        </App>
      </ProConfigProvider>
    </ConfigProvider>
  );
}
