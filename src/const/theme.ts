import type { ThemeConfig } from 'antd';

// Ant Design 亮色主题配置
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorBgBase: '#ffffff',
    colorTextBase: '#000000',
    borderRadius: 8,
    fontSize: 14,
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      siderBg: '#ffffff',
      bodyBg: '#f5f5f5',
    },
    Menu: {
      itemBg: 'transparent',
      subMenuItemBg: 'transparent',
    },
  },
};

// Ant Design 暗色主题配置
export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorBgBase: '#141414',
    colorTextBase: '#ffffff',
    borderRadius: 8,
    fontSize: 14,
  },
  components: {
    Layout: {
      headerBg: '#1f1f1f',
      siderBg: '#1f1f1f',
      bodyBg: '#0a0a0a',
    },
    Menu: {
      itemBg: 'transparent',
      subMenuItemBg: 'transparent',
      darkItemBg: 'transparent',
      darkSubMenuItemBg: 'transparent',
    },
  },
};
