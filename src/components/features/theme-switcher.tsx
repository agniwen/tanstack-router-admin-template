import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Monitor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '~/hooks/use-theme';

interface ThemeSwitcherProps {
  /**
   * 按钮样式变体
   * - 'default': 登录页等场景使用的圆形按钮
   * - 'header': ProLayout 头部使用的扁平样式
   */
  variant?: 'default' | 'header'
}

export function ThemeSwitcher({ variant = 'default' }: ThemeSwitcherProps) {
  const { themeMode, changeTheme } = useTheme();
  const { t } = useTranslation();

  const themeOptions = [
    {
      key: 'light',
      label: t('theme.light'),
      icon: <SunOutlined />,
    },
    {
      key: 'dark',
      label: t('theme.dark'),
      icon: <MoonOutlined />,
    },
    {
      key: 'auto',
      label: t('theme.auto'),
      icon: <Monitor className='h-3.5 w-3.5' />,
    },
  ] as const;

  const currentIcon = themeOptions.find(opt => opt.key === themeMode)?.icon;

  if (variant === 'header') {
    return (
      <Dropdown
        menu={{
          selectedKeys: [themeMode],
          items: themeOptions.map(option => ({
            key: option.key,
            label: option.label,
            icon: option.icon,
            onClick: () => changeTheme(option.key),
          })),
        }}
        placement='bottomRight'
      >
        <span className='flex h-11 cursor-pointer items-center justify-center px-4 py-0'>
          {currentIcon}
        </span>
      </Dropdown>
    );
  }

  return (
    <Dropdown
      menu={{
        selectedKeys: [themeMode],
        items: themeOptions.map(option => ({
          key: option.key,
          label: option.label,
          icon: option.icon,
          onClick: () => changeTheme(option.key),
        })),
      }}
      placement='bottomRight'
    >
      <div className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800'>
        <div className='text-gray-600 dark:text-gray-300'>
          {currentIcon}
        </div>
      </div>
    </Dropdown>
  );
}
