import type { ThemeMode } from '~/atom/theme';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { getResolvedTheme, themeModeAtom } from '~/atom/theme';

export function useTheme() {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);

  // 应用主题到 DOM
  const applyTheme = (mode: ThemeMode) => {
    const resolvedTheme = getResolvedTheme(mode);
    const root = window.document.documentElement;

    // 移除所有主题类
    root.classList.remove('light', 'dark');

    // 添加新主题类
    root.classList.add(resolvedTheme);

    // 同时更新 data-theme 属性（某些组件可能需要）
    root.setAttribute('data-theme', resolvedTheme);
  };

  // 监听系统主题变化（当模式为 auto 时）
  useEffect(() => {
    applyTheme(themeMode);

    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = () => {
        applyTheme(themeMode);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  const changeTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const resolvedTheme = getResolvedTheme(themeMode);

  return {
    themeMode,
    resolvedTheme,
    changeTheme,
    isDark: resolvedTheme === 'dark',
  };
}
