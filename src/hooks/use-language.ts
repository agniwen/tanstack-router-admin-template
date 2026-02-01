import type { SupportedLanguage } from '~/i18n/types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { languageNames, supportedLngs } from '~/i18n/i18n';

interface LanguageOption {
  code: SupportedLanguage
  name: string
}

/**
 * 语言切换 Hook
 * 提供语言切换和获取语言列表的功能
 */
export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as SupportedLanguage;

  const changeLanguage = useCallback(
    (lng: SupportedLanguage) => {
      return i18n.changeLanguage(lng);
    },
    [i18n],
  );

  const languages: LanguageOption[] = supportedLngs.map(lng => ({
    code: lng,
    name: languageNames[lng] || lng,
  }));

  return {
    currentLanguage,
    changeLanguage,
    languages,
  };
}
