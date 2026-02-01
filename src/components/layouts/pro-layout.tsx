import type { PropsWithChildren } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { ProLayout as AntdProLayout } from '@ant-design/pro-components';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { Avatar, Dropdown } from 'antd';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { sidebarCollapsedAtom } from '~/atom/app';
import { LanguageSwitcher } from '~/components/features/language-switcher';
import { defaultProLayoutProps } from '~/const/pro-layout';

export function ProLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useAtom(sidebarCollapsedAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className='auth-layout h-screen'>
      <AntdProLayout
        {...defaultProLayoutProps}
        location={location}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className='min-h-screen'
        waterMarkProps={{ content: ['Admin'] }}
        formatMessage={message => t(message.id)}
        menuItemRender={(item, dom) => {
          return <Link to={item.path || '/'}>{dom}</Link>;
        }}
        actionsRender={() => [
          <LanguageSwitcher key='language' variant='header' />,
        ]}
        avatarProps={{
          icon: <Avatar />,
          title: 'admin',
          children: 'admin',
          render(_, dom) {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: t('auth.logout'),
                      async onClick() {
                        navigate({
                          to: '/login',
                        });
                      },
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
      >
        {children}
      </AntdProLayout>
    </div>
  );
}
