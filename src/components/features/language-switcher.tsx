import { GlobalOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useLanguage } from '~/hooks/use-language';

interface LanguageSwitcherProps {
  /**
   * 按钮样式变体
   * - 'default': 登录页等场景使用的圆形按钮
   * - 'header': ProLayout 头部使用的扁平样式
   */
  variant?: 'default' | 'header'
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  if (variant === 'header') {
    return (
      <Dropdown
        menu={{
          selectedKeys: [currentLanguage],
          items: languages.map(lang => ({
            key: lang.code,
            label: lang.name,
            onClick: () => changeLanguage(lang.code),
          })),
        }}
        placement='bottomRight'
      >
        <span className='flex h-11 cursor-pointer items-center justify-center px-4 py-0'>
          <GlobalOutlined />
        </span>
      </Dropdown>
    );
  }

  return (
    <Dropdown
      menu={{
        selectedKeys: [currentLanguage],
        items: languages.map(lang => ({
          key: lang.code,
          label: lang.name,
          onClick: () => changeLanguage(lang.code),
        })),
      }}
      placement='bottomRight'
    >
      <div className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800'>
        <GlobalOutlined className='text-gray-600 dark:text-gray-300' />
      </div>
    </Dropdown>
  );
}
