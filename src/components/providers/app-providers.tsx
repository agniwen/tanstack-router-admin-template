import type { PropsWithChildren } from 'react';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { AntdProvider } from './antd-provider';
import { JotaiStoreProvider } from './jotai-store-provider';
import { NiceModalProvider } from './nice-modal-provider';
import { ReactQueryProvider } from './react-query-provider';
import { UrlStateProvider } from './url-state-provider';

interface AppProvidersProps extends PropsWithChildren {
}

/**
 * 应用程序所有 Provider 的组合
 * 按照正确的嵌套顺序组织所有配置提供者
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReactQueryProvider>
      <UrlStateProvider>
        <JotaiStoreProvider>
          <AntdProvider>
            <NiceModalProvider>
              {children}
            </NiceModalProvider>
          </AntdProvider>
        </JotaiStoreProvider>
      </UrlStateProvider>
      {import.meta.env.DEV
        && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              {
                name: 'Tanstack Query',
                render: <ReactQueryDevtoolsPanel />,
              },
            ]}
          />
        )}
    </ReactQueryProvider>
  );
}
