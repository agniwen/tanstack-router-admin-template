import type { PropsWithChildren } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';

interface UrlStateProviderProps extends PropsWithChildren {
}

/**
 * URL 状态管理提供者（nuqs）
 * 用于在 URL 查询参数中同步状态
 */
export function UrlStateProvider({ children }: UrlStateProviderProps) {
  return (
    <NuqsAdapter>
      {children}
    </NuqsAdapter>
  );
}
