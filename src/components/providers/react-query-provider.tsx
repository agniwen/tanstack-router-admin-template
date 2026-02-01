import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/lib/react-query';

interface ReactQueryProviderProps extends PropsWithChildren {
}

/**
 * React Query 配置提供者
 * 管理全局的数据请求、缓存和状态
 */
export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
