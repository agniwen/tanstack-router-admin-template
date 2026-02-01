import type { PropsWithChildren } from 'react';
import { Provider as JotaiProvider } from 'jotai';

interface JotaiStoreProvider extends PropsWithChildren {
}

/**
 * Jotai 状态管理提供者
 * 管理全局状态（主题、侧边栏等）
 */
export function JotaiStoreProvider({ children }: JotaiStoreProvider) {
  return (
    <JotaiProvider>
      {children}
    </JotaiProvider>
  );
}
