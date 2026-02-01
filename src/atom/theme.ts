import { atomWithStorage } from 'jotai/utils';

export type ThemeMode = 'light' | 'dark' | 'auto';

// 主题模式 atom，持久化到 localStorage
export const themeModeAtom = atomWithStorage<ThemeMode>('theme-mode', JSON.parse(localStorage.getItem('theme-mode') || '"light"') as ThemeMode ?? 'light');

// 获取实际应用的主题（处理 auto 模式）
export function getResolvedTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'auto') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return mode;
}
